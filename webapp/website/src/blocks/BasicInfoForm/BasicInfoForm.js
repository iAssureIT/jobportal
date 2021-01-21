import React,{Component}            from 'react';
import { FontAwesomeIcon }          from '@fortawesome/react-fontawesome';
import Moment                       from 'moment';
import { withRouter }	 	        from 'react-router-dom';
import Axios 			 	        from 'axios';
import Swal 			 	        from 'sweetalert2';
import S3FileUpload                 from 'react-s3';
import { WithContext as ReactTags } from 'react-tag-input';
import {connect}                    from 'react-redux';
import { bindActionCreators }       from 'redux';
import  * as mapActionCreator       from '../../common/actions/index';
import './BasicInfoForm.css';


class BasicInfoForm extends Component{
	constructor(props){
		super(props);
		this.state={
			firstName                 : "",
			middleName                : "",
			candidate_id              : this.props.userDetails.candidate_id,
			lastName                  : "",
			dob                       : "",
			profilePhoto              : "",
			profileImageUrl           : "",
			gender                    : "male",
			anniversaryDate           : "",	
			maritalStatus             : "",
			nationality               : "",
			panCardNo                 : "",
			adhaarCardNo              : "",
			selectedValue             : [],
			ageYears	              : 0,	
			ageMonths	              : 0,	
			ageDays	       	          : 0,
			age                       : "",
			inputMaritalStatus        : ["Single",,"Married", "Separated","Divorced","Widowed"],
			inputNationality          : ["Indian","American"],
			languagesTags	          : [],
			languagesSuggestions	  : [],
			inputLanguages	          : [],

			imageUploaded             : true,
			profilePicture            : "",

		}
		
	}
	componentDidMount(){
		Axios.get("/api/languagemaster/get/list")
		.then(response => {
			var languagesSuggestions     =  [];
                response.data.map((elem,index)=>{
                    languagesSuggestions.push({id:elem._id,text:elem.language})
                })
                this.setState({
                    languagesSuggestions   : languagesSuggestions
                });
		})
		.catch(error=>{
			Swal.fire("Error while getting List data",error.message,'error');
		})

		Axios.get("/api/candidatemaster/get/one/"+this.state.candidate_id)
		.then(response=>{
			 console.log("response.data",response.data);

			 	var languagesTags = [];
			 	if (response.data.languagesKnown) {
			 		response.data.languagesKnown.map((data,ind)=>{
                    	languagesTags.push({ id : data.id, text : data.language_id.language })
                	})
			 	}
			 	
			 	this.calAge(response.data.basicInfo.dob);
			 	this.setState({
			 		firstName         : response.data.basicInfo.firstName?response.data.basicInfo.firstName:"",
					middleName        : response.data.basicInfo.middleName?response.data.basicInfo.middleName:"",
					lastName          : response.data.basicInfo.lastName?response.data.basicInfo.lastName:"",
					dob               : response.data.basicInfo.dob?Moment(response.data.basicInfo.dob).format("YYYY-MM-DD"):"",
					gender            : response.data.basicInfo.gender?response.data.basicInfo.gender:"",
					anniversaryDate   : response.data.basicInfo.anniversaryDate?Moment(response.data.basicInfo.anniversaryDate).format("YYYY-MM-DD"):"",
					maritalStatus     : response.data.basicInfo.maritalStatus?response.data.basicInfo.maritalStatus:"",
					nationality       : response.data.basicInfo.nationality?response.data.basicInfo.nationality:"",
					panCardNo         : response.data.panCard?response.data.panCard:"",
					adhaarCardNo      : response.data.aadhaarCard?response.data.aadhaarCard:"",
					profilePicture    : response.data.profilePicture?response.data.profilePicture:"",
					languagesTags 	  : languagesTags	
			 	})
			 })
			 .catch(error=>{
			 	Swal.fire("Submit Error!",error.message,'error');
			 })
}

	//========== User Define Function Start ================
	selectImage(event){
		event.preventDefault();
		var profilePicture = [];
		if (event.currentTarget.files ) {
		const imgFile = event.currentTarget.value;
		const files   = event.currentTarget.files;
		// imgValue      = imgFile.split(".");
		// if(imgValue[1] !== 'jpg'){
		// 	this.setState({

		// 	})
		// }

		const imgUrl =  URL.createObjectURL(event.target.files[0]);
		
		this.setState({
			profileImageUrl : imgUrl
		})
		var file = event.currentTarget.files[0];
		if (file) {
          var fileName = file.name;
          var fileSize = file.size;
          var ext = fileName.split('.').pop();
          if (ext === "jpg" || ext === "png" || ext === "jpeg" || ext === "JPG" || ext === "PNG" || ext === "JPEG") {
            if(fileSize > 1048576){
              Swal.fire("Allowed file size is 1MB");
            }else{
              if (file) {
                var objTitle = { fileInfo: file }
                profilePicture.push(objTitle);
              } else {
                Swal.fire("Images not uploaded");
              }//file
            }
          } else {
            Swal.fire("Allowed images formats are (jpg,png,jpeg)");
            this.setState({
              gotProfileImage:false
            })
          }//file types
        }
         if (event.currentTarget.files) {
        this.setState({
          gotProfileImage:true
        })
        main().then(formValues => {
         
   		console.log(formValues)
          this.setState({
            profilePicture   : formValues[0].profilePicture,
            imageUploaded : false
          })
        });

        async function main() {
          var formValues = [];
        
            var config = await getConfig();
            var s3url = await s3upload(profilePicture[0].fileInfo, config, this);
            const formValue = {
              "profilePicture": s3url,
              "status": "New"
            };
            formValues.push(formValue);

          
          return Promise.resolve(formValues);
        }
    
    	function s3upload(image, configuration) {
          return new Promise(function (resolve, reject) {
            S3FileUpload
              .uploadFile(image, configuration)
              .then((Data) => {

                resolve(Data.location);
              })
              .catch((error) => {
              })
          })
        }
        function getConfig() {
          return new Promise(function (resolve, reject) {
            Axios.post('/api/projectsettings/getS3Details/S3')
              .then((response) => {
                const config = {
                  bucketName: response.data.bucket,
                  dirName: process.env.REACT_APP_ENVIRONMENT,
                  region: response.data.region,
                  accessKeyId: response.data.key,
                  secretAccessKey: response.data.secret,
                }
                resolve(config);
              })
              .catch(function (error) {
              })

          })
        }
    }
    }
		
	}

	delImgPreview(event){
		this.setState({
			profileImageUrl:""
		})
	}

	handleChange(event){
		event.preventDefault();
		var value = event.currentTarget.value;
		var name  = event.currentTarget.name;

		
		this.setState({
			[name]:value,
		})
		if(name==="dob"){
			this.calAge(value);
		}
	}
	calAge(dob){
		var currentDate = Moment(new Date());
			var age     = Moment.duration(currentDate.diff(dob));
			var Years   = age.years();
			var Months  = age.months();
			var weeks   = age.weeks();
			

			this.setState({
				ageYears : Years,
				ageMonths: Months,
				ageWeeks : weeks,
			})
	}

	setGender(event){
		event.preventDefault();

		var value = event.currentTarget.value;
		var id  = event.currentTarget.id;
		this.setState({
			gender:id,
		})
	}
	onLanguageAddition (tag) {
        if (tag.id == tag.text) {
            tag.id = "" 
        }
    	this.setState(state => ({ languagesTags: [...state.languagesTags, tag] }));
  	}

    onLanguageClick(index) {
        console.log('The tag at index ' + index + ' was clicked');
    }

    onLanguageDrag(tag, currPos, newPos) {
        const languagesTags = [...this.state.languagesTags];
        const newTags = languagesTags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ languagesTags: newTags });
    }

    onLanguageDelete (i) {
        const { languagesTags } = this.state;
        this.setState({
          languagesTags: languagesTags.filter((tag, index) => index !== i),
        });
    }
	handleSubmit(event){
		event.preventDefault();
		var status =  this.validateForm();
			var formValues = {

								firstName          : this.state.firstName,
								candidate_id       : this.state.candidate_id,
								middleName         : this.state.middleName,
								lastName           : this.state.lastName,
								dob                : this.state.dob,
								gender             : this.state.gender,
								anniversaryDate    : this.state.anniversaryDate,	
								maritalStatus      : this.state.maritalStatus,
								nationality        : this.state.nationality,
								panCard            : this.state.panCardNo,
								aadhaarCard        : this.state.adhaarCardNo,
								languagesTags	   : this.state.languagesTags,
								profilePicture	   : this.state.profilePicture,
								
							}
							console.log(formValues);
			if(status==true){
				Axios.patch("/api/candidatemaster/patch/updateCandidateBasicInfo",formValues)
			 .then(response=>{

						Swal.fire("Congrats","Your Basic details is insert Successfully","success");
							this.setState({
											firstName          : "",
											middleName         : "",
											lastName           : "",
											dob                : "",
											gender             : "male",
											anniversaryDate    : "",	
											maritalStatus      : "",
											languages          : [],
											nationality        : "",
											panCardNo          : "",
											adhaarCardNo       : "",
											ageYears	       : 0,	
											ageMonths	       : 0,	
											ageDays	       	   : 0,
											profilePicture     : ""
										})

						this.props.history.push("/address/"+this.state.candidate_id);
							
							
				})
				.catch(error =>{
					Swal.fire("Submit Error!",error.message,'error');
				});
			}
		
	}
	
	//========== User Define Function End ==================

	//========== Validation Start ==================
	 validateForm=()=>{
		var status = true;
		
		if(this.state.firstName.length<=0){
			document.getElementById("firstNameError").innerHTML=  
			"Please enter your first name";  
			status=false; 
		}
		 else{
			document.getElementById("firstNameError").innerHTML=
			""; 
			status = true;
		}
		if(this.state.dob.length<=0){
			document.getElementById("dobError").innerHTML=  
			"Please enter your Date Of Birth";  
			status=false; 
		}else{
			document.getElementById("dobError").innerHTML=  
			""; 
			status = true;
		}
	

		
		 return status;
	}

	//========== Validation End ==================

	render(){
		const KeyCodes = {
		  comma: 188,
		  enter: 13,
		};

		const delimiters = [KeyCodes.comma, KeyCodes.enter];
		return(

				<div className="col-lg-12 pageWrapper">
					<form className="mainForm">

						<div className="row formWrapper">

							<div className="col-lg-4">
								<label htmlFor="firstName" className="nameTitleForm">
								 	First Name
								    <sup className="nameTitleFormStar">*</sup>
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon">
										<i className="fa fa-user-circle"></i> 
									</span> 
									<input type="text" name="firstName" id="firstName" 
									 className="form-control inputBox" value={this.state.firstName} 
									 onChange={this.handleChange.bind(this)} />
								</div> 
								<span id="firstNameError" className="errorMsg"></span>
							</div>

							<div className="col-lg-4">
								<label htmlFor="middleName" className="nameTitleForm">
									Middle Name
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon">
										<i className="fa fa-user-circle"></i> 
									</span> 
									<input type="text" name="middleName" id="middleName" 
									 className="form-control inputBox" value={this.state.middleName} 
									 onChange={this.handleChange.bind(this)} />
								</div> 
								
							</div>

							<div className="col-lg-4">
								<label htmlFor="lastName" className="nameTitleForm">
									Last Name
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon">
										<i className="fa fa-user-circle"></i> 
									</span> 
									<input type="text" name="lastName" id="lastName" 
									 className="form-control inputBox" value={this.state.lastName}
									 onChange={this.handleChange.bind(this)} />
								</div> 
							</div>

						</div>

						<div className="row formWrapper">

							<div className="col-lg-4">
								<label htmlFor="dob" className="nameTitleForm">
									Date Of Birth
									<sup className="nameTitleFormStar">*</sup>
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon">
										<i className="fa fa-birthday-cake"></i>
									</span> 
									<input type="date" name="dob" id="dob" 
									 className="form-control inputBox unstyled date" 
									 value={this.state.dob} 
									 onChange={this.handleChange.bind(this)} />
								</div> 
								<span id="dobError" className="errorMsg"></span>
							</div>

							<div className="col-lg-4">
								<label htmlFor="age" className="nameTitleForm nameTitleFormAge">
									Age
								</label>
								<div className="input-group showFeild">
									{this.state.ageYears + "  Years, " + this.state.ageMonths +
									  " months, " + " And " + this.state.ageDays + " Days Old"}	
								</div> 
							</div>

							<div className="col-lg-4">
								<label htmlFor="gender" className="nameTitleForm nameTitleFormAge">
									Gender
								</label>
								<div className="input-group genderFeildWrapper">
									<div className={this.state.gender==="male"
													? 
													"genderFeild col-lg-4 genderFeildActive" 
													: 
													"genderFeild col-lg-4" }  
										 id="male" name="gender" 
										 onClick={this.setGender.bind(this)}>

										<div className="row" >
											Male
										</div>
									</div>
									<div className={this.state.gender==="female"
									                ? "genderFeild col-lg-4 genderFeildActive" 
									                : "genderFeild col-lg-4" } 
									     id="female" name="gender" 
									     onClick={this.setGender.bind(this)}>

										<div className="row">
											Female
										</div>
									</div>
									<div className={this.state.gender==="transgender"
									                ? "genderFeild col-lg-4 genderFeildActive" 
									                : "genderFeild col-lg-4" } 
									     id="transgender" name="gender" 
									     onClick={this.setGender.bind(this)}>

										<div className="row">
											Transgender
										</div>
									</div>		
									
								</div>
							</div>

						</div>

						<div className="row formWrapper multiselectZ">

							<div className="col-lg-4">
								<label htmlFor="maritalStatus" className="nameTitleForm">
									Marital Status
									<sup className="nameTitleFormStar">*</sup>
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon inputBoxIcon1">
										<FontAwesomeIcon icon="ring" />
									</span> 
									<select required className="form-control inputBox selectOption" 
									  id="maritalStatus" value={this.state.maritalStatus}
									  name="maritalStatus" placeholder="-- Select --" onChange={this.handleChange.bind(this)}>
									  	<option > -- Select -- </option>
									  	{
									  		this.state.inputMaritalStatus.length>0
									  		?	
									  			this.state.inputMaritalStatus.map((elem,index)=>{
									  				return(
									  					<option value={elem._id} key={index}>
									  						{elem}
									  					</option>
									  				);
									  			})
									  			
									  		:
									  			null
									  	}
									</select>

								</div>
							</div>

							<div className="col-lg-4">
								<label htmlFor="anniversaryDate" className="nameTitleForm">
									Anniversary Date
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon inputBoxIcon2 calender">
										<i className="fa fa-calendar-o"></i>
									</span> 
									<input type="date" name="anniversaryDate" id="anniversaryDate" 
									className="form-control inputBox date" value={this.state.anniversaryDate}
									onChange={this.handleChange.bind(this)} />
								</div> 
							</div>

							<div className="col-lg-4">
								<label htmlFor="languages" className="nameTitleForm">
									Languages Spoken
									<sup className="nameTitleFormStar">*</sup>
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon inputBoxIcon2">
										<i className="fa fa-comment-o"></i>
									</span> 
									<ReactTags
							        //ref={this.reactTags}
							        tags={this.state.languagesTags}
							        suggestions={this.state.languagesSuggestions}
							        delimiters={delimiters}
							        handleDelete={this.onLanguageDelete.bind(this)}
							        handleAddition={this.onLanguageAddition.bind(this)}
							        handleDrag={this.onLanguageDrag.bind(this)}
									handleTagClick={this.onLanguageClick.bind(this)} />
								</div>
							</div>

						</div>

						<div className="row formWrapper">

							<div className="col-lg-4">
								<label htmlFor = "nationality" className = "nameTitleForm" > 
									Nationality 
									<sup className = "nameTitleFormStar"> * </sup>
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon">
										<i className="fa fa-flag-o"></i>
									</span> 
									<select className="form-control inputBox" id = "nationality" 
									 value ={this.state.nationality} name="nationality" 
									 onChange={this.handleChange.bind(this)}>
									  	<option disabled > -- Select -- </option>
									  	{
									  		this.state.inputNationality.length>0
									  		?	
									  			this.state.inputNationality.map((elem,index)=>{
									  				return(
									  					<option value={elem._id} key={index}>
									  					 	{elem}
									  					</option>
									  				);
									  			})
									  			
									  		:
									  			null
									  	}
									</select>
								</div>
							</div>

							<div className="col-lg-4">
								<label htmlFor="panCardNo" className="nameTitleForm">
									Pan Card No.
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon">
										<i className="fa fa-id-card-o"></i> 
									</span> 
									<input type="text" name="panCardNo" id="panCardNo" 
									 className="form-control inputBox" value={this.state.panCardNo} 
									 onChange={this.handleChange.bind(this)} />
								</div> 
							</div>

							<div className="col-lg-4">
								<label htmlFor="adhaarCardNo" className="nameTitleForm">
									Aadhaar Card No.
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon">
										<i className="fa fa-id-card-o"></i> 
									</span> 
									<input type="text" name="adhaarCardNo" id="adhaarCardNo" 
									className="form-control inputBox" value={this.state.adhaarCardNo} 
									onChange={this.handleChange.bind(this)} />
								</div> 
							</div>

						</div>

						<div className="row formWrapper">
							<div className="col-lg-4 ">
								<label htmlFor="profilePicture" className="nameTitleForm">
									Profile Picture
								</label>
								<div className="input-group ">
									{
										this.state.profileImageUrl!== ""
										?	
											<div>
												<i className="fa fa-times delImgIcon" 
												   onClick={this.delImgPreview.bind(this)}>
												</i>
												<img src={this.state.profileImageUrl} alt="profileImage" 
												className="col-lg-12 profileImage"/>
											</div>
										:
											<div>

												<input type="file" className="inputImage" 
												 name="profilePicture"
												 onChange={this.selectImage.bind(this)}
												/>
											</div>
									}
									
								</div>
							</div>
						</div>

						<button className="buttonNext pull-right" onClick={this.handleSubmit.bind(this)}>
							Next 
							<FontAwesomeIcon className="nextArrow" icon="arrow-right" />
						</button>
						
					</form>
					
				</div>
			);
	}
}

const mapStateToProps = (state)=>{
    return {
        userDetails  : state.userDetails,
    }
}
const mapDispatchToProps = (dispatch) => ({
  mapAction :  bindActionCreators(mapActionCreator, dispatch)
}) 
export default connect(mapStateToProps,mapDispatchToProps) (withRouter(BasicInfoForm));
