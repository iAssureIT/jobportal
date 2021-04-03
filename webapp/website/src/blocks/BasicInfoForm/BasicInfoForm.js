import React,{Component}            from 'react';
import { FontAwesomeIcon }          from '@fortawesome/react-fontawesome';
import Moment                       from 'moment';
import { withRouter }	 	        from 'react-router-dom';
import Axios 			 	        from 'axios';
import Swal 			 	        from 'sweetalert2';
import S3FileUpload                 from 'react-s3';
import { WithContext as ReactTags } from 'react-tag-input';
import PhoneInput 					from 'react-phone-input-2';
import CKEditor 					from '@ckeditor/ckeditor5-react';
import ClassicEditor 				from '@ckeditor/ckeditor5-build-classic';
import {connect}                    from 'react-redux';
import { bindActionCreators }       from 'redux';
import  * as mapActionCreator       from '../../common/actions/index';
import './BasicInfoForm.css';


class BasicInfoForm extends Component{
	constructor(props){
		super(props);
		this.state={
			candidate_id              : this.props.userDetails.candidate_id,
			firstName                 : "",
			middleName                : "",
			lastName                  : "",
			mobile        			  : "",
			alternate     			  : "",
			email         			  : "",
			dob                       : "",
			profilePhoto              : "",
			profileImageUrl           : "",
			gender                    : "",
			passport                  : "",
			visa                  	  : "",
			country                   : "",	
			countryShow               : false,	
			//anniversaryDate           : "",	
			maritalStatus             : "",
			nationality               : "",
			panCardNo                 : "",
			adhaarCardNo              : "",
			selectedValue             : [],
			// ageYears	              : 0,	
			// ageMonths	          : 0,	
			// ageDays	       	      : 0,
			// age                    : "",
			inputMaritalStatus        : ["Single",,"Married", "Separated","Divorced","Widowed"],
			anniversaryDateShow 	  : false,	
			inputNationality          : ["Indian","American"],
			languagesTags	          : [],
			languagesSuggestions	  : [],
			inputLanguages	          : [],
			imageUploaded             : true,
			profilePicture            : "",
			resumeUrl 				  : "",
			resume 					  : [],
			executiveSummary 		  : ""		
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
			 			console.log(data)
                    	languagesTags.push({ id : data.language_id._id, text : data.language_id.language })
                	})
			 	}
			 	// this.calAge(response.data.basicInfo.dob);
			 	this.setState({
			 		firstName         : response.data.basicInfo.firstName?response.data.basicInfo.firstName:"",
					middleName        : response.data.basicInfo.middleName?response.data.basicInfo.middleName:"",
					lastName          : response.data.basicInfo.lastName?response.data.basicInfo.lastName:"",
					mobile        	  : response.data.contact.mobile?response.data.contact.mobile:"",
					alternate     	  : response.data.contact.altMobile?response.data.contact.altMobile:"",
					email         	  : response.data.contact.emailId?response.data.contact.emailId:"",
					dob               : response.data.basicInfo.dob?Moment(response.data.basicInfo.dob).format("YYYY-MM-DD"):"",
					gender            : response.data.basicInfo.gender?response.data.basicInfo.gender:"",
					country           : response.data.basicInfo.country?response.data.basicInfo.country:"",
					countryShow       : response.data.basicInfo.visa=="Yes"?true:false,
					//anniversaryDate   : response.data.basicInfo.anniversaryDate?Moment(response.data.basicInfo.anniversaryDate).format("YYYY-MM-DD"):"",
					maritalStatus     : response.data.basicInfo.maritalStatus?response.data.basicInfo.maritalStatus:"",
					nationality       : response.data.basicInfo.nationality?response.data.basicInfo.nationality:"",
					passport          : response.data.basicInfo.passport?response.data.basicInfo.passport:"",
					visa              : response.data.basicInfo.visa?response.data.basicInfo.visa:"",
					profilePicture    : response.data.basicInfo.profilePicture?response.data.basicInfo.profilePicture:"",
					profileImageUrl   : response.data.basicInfo.profilePicture?response.data.basicInfo.profilePicture:"",	
					resume     		  : response.data.basicInfo.resume?response.data.basicInfo.resume:"",
					resumeUrl     	  : response.data.basicInfo.resume?response.data.basicInfo.resume:"",
					executiveSummary  : response.data.basicInfo.executiveSummary ? response.data.basicInfo.executiveSummary : "",
					languagesTags 	  : languagesTags,
					// ageYears	              : 0,	
					// ageMonths	              : 0,	
					// ageDays	       	          : 0,
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
	uploadResume(event){
		event.preventDefault();
		var resume = [];
		if (event.currentTarget.files ) {
		
		const resumeUrl =  URL.createObjectURL(event.target.files[0]);
		
		this.setState({
			resumeUrl : resumeUrl
		})
		var file = event.currentTarget.files[0];
		if (file) {
          var fileName = file.name;
          var fileSize = file.size;
          var ext = fileName.split('.').pop();
          if (ext === "pdf" || ext === "docx" || ext === "doc" ) {
            if(fileSize > 1048576){
              Swal.fire("Allowed file size is 1MB");
            }else{
              if (file) {
                var objTitle = { fileInfo: file }
                resume.push(objTitle);
              } else {
                Swal.fire("Resume is not uploaded");
              }//file
            }
          } else {
            Swal.fire("Allowed document format is (doc, docx, pdf)");
            
          }//file types
        }
        if (event.currentTarget.files) {
	        
	        main().then(formValues => {
	         
	   		console.log(formValues)
	          this.setState({
	            resume   : formValues[0].resume,
	          })
	        });

	        async function main() {
	          var formValues = [];
	        
	            var config = await getConfig();
	            var s3url = await s3upload(resume[0].fileInfo, config, this);
	            const formValue = {
	              "resume": s3url,
	              "status": "New"
	            };
	            formValues.push(formValue);

	          return Promise.resolve(formValues);
	        }
	    
	    	function s3upload(resume, configuration) {
	          return new Promise(function (resolve, reject) {
	            S3FileUpload
	              .uploadFile(resume, configuration)
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
		console.log("heelo")
		this.setState({
			profileImageUrl:""
		})
	}
	delResumePreview(event){
		this.setState({
			resumeUrl:""
		})
	}

	handleChange(event){
		event.preventDefault();
		var value = event.currentTarget.value;
		var name  = event.currentTarget.name;

		
		this.setState({
			[name]:value,
		})
		if(name=="country"){
			if(this.state.visa=="Yes"){
				this.setState({
					[name]:value,
				})
			}else{
				this.setState({
					[name]:"",
				})
			}
		}
		// if(name==="dob"){
		// 	this.calAge(value);
		// }
		// if (name=="maritalStatus") {
		// 	if (value=="Married") {
		// 		this.setState({anniversaryDateShow : true})
		// 	}else{
		// 		this.setState({anniversaryDateShow : false})
		// 	}
		// }
	}
	// calAge(dob){
	// 	var currentDate = Moment(new Date());
	// 		var age     = Moment.duration(currentDate.diff(dob));
	// 		var Years   = age.years();
	// 		var Months  = age.months();
	// 		var weeks   = age.weeks();
			

	// 		this.setState({
	// 			ageYears : Years,
	// 			ageMonths: Months,
	// 			ageWeeks : weeks,
	// 		})
	// }
	passport(event){
		event.preventDefault();

		var value = event.currentTarget.value;
		var id  = event.currentTarget.id;
		this.setState({
			passport:id,
		})
	}
	visa(event){
		event.preventDefault();


		var value = event.currentTarget.value;
		var id  = event.currentTarget.id;
		var name  = event.currentTarget.name;
			if (id=="Yes") {
				this.setState({countryShow : true})
			}else{
				this.setState({countryShow : false})
			}
		
		var value = event.currentTarget.value;
		var id  = event.currentTarget.id;

		this.setState({
			visa:id,
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
								mobile      	   : this.state.mobile,
								altMobile          : this.state.alternate,
								emailId            : this.state.email,
								dob                : this.state.dob,
								gender             : this.state.gender,
								country            : this.state.country,	
								//anniversaryDate    : this.state.anniversaryDate,	
								maritalStatus      : this.state.maritalStatus,
								nationality        : this.state.nationality,
								languagesTags	   : this.state.languagesTags,
								profilePicture	   : this.state.profilePicture,
								resumeUrl 		   : this.state.resume,
								executiveSummary   : this.state.executiveSummary,
								passport   		   : this.state.passport,
								visa   		   	   : this.state.visa,
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
											country            : "",	
											countryShow        : false,	
											//anniversaryDate    : "",	
											maritalStatus      : "",
											languages          : [],
											nationality        : "",
											panCardNo          : "",
											adhaarCardNo       : "",
											// ageYears	       : 0,	
											// ageMonths	       : 0,	
											// ageDays	       	   : 0,
											profilePicture     : "",
											profileImageUrl    : "",	
											resume 			   : [],	
											resumeUrl          : "", 
											executiveSummary   : "",
											passport           : "",
											visa               : "",
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
		var regName = /^[a-zA-Z]+$/;
		var firstName=this.state.firstName;
		var middleName=this.state.middleName;
        var lastName=this.state.lastName;
		var tempEmail = this.state.email.trim(); // value of field with whitespace trimmed off
    	var emailFilter = /^[^@]+@[^@.]+\.[^@]*\w\w$/;
    	var illegalChars = /[\(\)\<\>\,\;\:\\\"\[\]]/;
    	var mobileFilter = /^(\+\d{1,3}[- ]?)?\d{12}$/gm;

	    if(this.state.firstName<=0)  {
	      document.getElementById("firstNameError").innerHTML = "Please enter valid Name";  
	      status=false; 
	    }
	  
	    if(!regName.test(firstName)){
	      document.getElementById("firstNameError").innerHTML = "Please enter valid name,......";  
	      status=false; 
	    }
	    else{
	      document.getElementById("firstNameError").innerHTML = ""
	      status = true;
	    }

	    if(this.state.middleName<=0)  {
	      document.getElementById("middleNameError").innerHTML = "Please enter valid Name";  
	      status=false; 
	    }
	  
	    if(!regName.test(middleName)){
	      document.getElementById("middleNameError").innerHTML = "Please enter valid name,......";  
	      status=false; 
	    }
	    else{
	      document.getElementById("middleNameError").innerHTML=  ""
	      status = true;
	    }

	    if(this.state.lastName<=0)  {
	      document.getElementById("lastNameError").innerHTML = "Please enter valid Name";  
	      status=false; 
	    }
	  
	    if(!regName.test(lastName)){
	      document.getElementById("lastNameError").innerHTML = "Please enter valid name,......";  
	      status=false; 
	    }
	    else{
	      document.getElementById("lastNameError").innerHTML = "";
	      status = true;
	    }
		
		if(this.state.dob.length<=0){
			document.getElementById("dobError").innerHTML = "Please enter your Date Of Birth";  
			status=false; 
		}else{
			document.getElementById("dobError").innerHTML = ""; 
			status = true;
		}
		if(this.state.email.length<=0){
			document.getElementById("emailError").innerHTML = "Please enter your Email";  
			status=false; 
		}else if (!emailFilter.test(tempEmail)) { //test email for illegal characters
	        document.getElementById('emailError').innerHTML = "Please enter a valid email address.";
	    } else if (this.state.email.match(illegalChars)) {
	        document.getElementById('emailError').innerHTML = "Email contains invalid characters.";
	    }else{
			document.getElementById("emailError").innerHTML = ""; 
			status = true;
		}
		if(this.state.mobile.length<=0){
			document.getElementById("mobileError").innerHTML = "Please enter your mobile number";  
			status=false; 
		}else if (!mobileFilter.test(this.state.mobile)) { //test email for illegal characters
	        document.getElementById('mobileError').innerHTML = "Please enter a valid mobile number.";
	    }else{
			document.getElementById("mobileError").innerHTML = ""; 
			status = true;
		}

		if(this.state.alternate.length>0){
			
			if (!mobileFilter.test(this.state.alternate)) { //test email for illegal characters
	        	document.getElementById('alternateError').innerHTML = "Please enter a valid alternate mobile number.";
		    }else{
				document.getElementById("alternateError").innerHTML = ""; 
				status = true;
			}
		}

		if(this.state.executiveSummary.length<=0){
			document.getElementById("executiveSummaryError").innerHTML = "Please enter your executive summary";  
			status=false; 
		}
		else{
			document.getElementById("executiveSummaryError").innerHTML = ""; 
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
									Middle Name <sup className="nameTitleFormStar">*</sup>
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon">
										<i className="fa fa-user-circle"></i> 
									</span> 
									<input type="text" name="middleName" id="middleName" 
									 className="form-control inputBox" value={this.state.middleName} 
									 onChange={this.handleChange.bind(this)} />
								</div> 
								<span id="middleNameError" className="errorMsg"></span>
							</div>

							<div className="col-lg-4">
								<label htmlFor="lastName" className="nameTitleForm">
									Last Name <sup className="nameTitleFormStar">*</sup>
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon">
										<i className="fa fa-user-circle"></i> 
									</span> 
									<input type="text" name="lastName" id="lastName" 
									 className="form-control inputBox" value={this.state.lastName}
									 onChange={this.handleChange.bind(this)} />
								</div> 
								<span id="lastNameError" className="errorMsg"></span>
							</div>
						</div>
						<div className="row formWrapper">
							<div className="col-lg-4">
								<label htmlFor="mobile" className="nameTitleForm">
									Mobile Number
									<sup className="nameTitleFormStar">*</sup>
								</label>
								<PhoneInput 
									country   = {'in'}
									id        ="mobile" 
									className ="input-group-addon form-control inputBox" 
									value     ={this.state.mobile} 
									onChange  = {mobile => this.setState({ mobile })}
								 />
							
								<span id="mobileError" className="errorMsg"></span>
							</div>

							<div className="col-lg-4">
								<label htmlFor="alternate" className="nameTitleForm">
									Alternate Mobile Number
								</label>
								<PhoneInput 
									country   = {'in'}
									id        ="alternate" 
									className ="input-group-addon form-control inputBox" 
									value     ={this.state.alternate} 
									onChange  = {alternate => this.setState({ alternate })}
								 />
								
								<span id="alternateError" className="errorMsg"></span>
							</div>

							<div className="col-lg-4">
								<label htmlFor="email" className="nameTitleForm">
									Personal Mail ID
									<sup className="nameTitleFormStar">*</sup>
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon">
										<i className="fa fa-envelope-o"></i> 
									</span> 
									<input type="email" name="email" id="email" 
									 className="form-control email" value={this.state.email} 
									 onChange={this.handleChange.bind(this)} />
								</div> 
								<span id="emailError" className="errorMsg"></span>
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
									 value={this.state.dob} max={Moment(new Date()).format("YYYY-MM-DD")}
									 onChange={this.handleChange.bind(this)} />
									 <div className="dateLine"></div>
								</div> 
								<span id="dobError" className="errorMsg"></span>
							</div>

							<div className="col-lg-4">
								<label htmlFor="maritalStatus" className="nameTitleForm">
									Marital Status
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
								<label htmlFor = "nationality" className = "nameTitleForm" > 
									Nationality 
									<sup className = "nameTitleFormStar"> * </sup>
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon">
										<i className="fa fa-flag-o"></i>
									</span> 
									<select required className="form-control inputBox selectOption" id = "nationality" 
									 value ={this.state.nationality} name="nationality" 
									 onChange={this.handleChange.bind(this)}>
									  	<option  > -- Select -- </option>
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
						</div>

						{// <div className="row formWrapper multiselectZ">

							
						// 	
						// 		this.state.anniversaryDateShow ? 
						// 		<div className="col-lg-4 anniversaryDate">
						// 			<label htmlFor="anniversaryDate" className="nameTitleForm">
						// 				Anniversary Date
						// 			</label>
						// 			<div className="input-group ">
						// 				<span className="input-group-addon inputBoxIcon inputBoxIcon2 calender">
						// 					<i className="fa fa-calendar-o"></i>
						// 				</span> 
						// 				<input type="date" name="anniversaryDate" id="anniversaryDate" 
						// 				className="form-control inputBox date" value={this.state.anniversaryDate}
						// 				onChange={this.handleChange.bind(this)} />
						// 			</div> 
						// 		</div>
						// 		: null
						// 	
						// </div>
						}
						
						<div className="row formWrapper">
							<div className="col-lg-4">
								<label htmlFor="gender" className="nameTitleForm ">
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
							<div className="col-lg-2">
								<label htmlFor="passport" className="nameTitleForm passportFont">
									Do You Have Passport?
								</label>
								<div className="input-group genderFeildWrapper">
									<div className={this.state.passport==="Yes"
														? 
														"genderFeild col-lg-6 genderFeildActive" 
														: 
														"genderFeild col-lg-6" }  
											 id="Yes" name="passport" 
											 onClick={this.passport.bind(this)}>

											<div className="row" >
												Yes
											</div>
									</div>
									<div className={this.state.passport==="No"
									                ? "genderFeild col-lg-6 genderFeildActive" 
									                : "genderFeild col-lg-6" } 
									     id="No" name="passport" 
									     onClick={this.passport.bind(this)}>

										<div className="row">
											No
										</div>
									</div>
								</div>
							</div> 
							<div className="col-lg-2">
								<label htmlFor="visa" className="nameTitleForm passportFont">
									Do You Have Visa?
								</label>
								<div className="input-group genderFeildWrapper">
									<div className={this.state.visa==="Yes"
														? 
														"genderFeild col-lg-6 genderFeildActive" 
														: 
														"genderFeild col-lg-6" }  
											 id="Yes" name="visa" 
											 onClick={this.visa.bind(this)}>

											<div className="row" >
												Yes
											</div>
									</div>
									<div className={this.state.visa==="No"
									                ? "genderFeild col-lg-6 genderFeildActive" 
									                : "genderFeild col-lg-6" } 
									     id="No" name="visa" 
									     onClick={this.visa.bind(this)}>

										<div className="row">
											No
										</div>
									</div>
								</div>
							</div> 
							{
								this.state.countryShow ? 
									<div className="col-lg-4 country">
										<label htmlFor="country" className="nameTitleForm">
											Country
										</label>
										<div className="input-group ">
											<span className="input-group-addon inputBoxIcon">
												<i className="fa fa-flag"></i> 
											</span> 
											<input type="text" name="country" id="country" 
											 className="form-control inputBox" 
											 value={this.state.country} 
											 onChange={this.handleChange.bind(this)} />
										</div> 
									</div>
								:
								null
							}
						</div>
						<div className="row formWrapper">
							<div className="col-lg-12">
								<label htmlFor="languages" className="nameTitleForm">
									Languages Spoken
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
							<div className="col-lg-12">
								<label htmlFor="executiveSummary" className="nameTitleForm">
									Executive Summary <sup className="nameTitleFormStar">*</sup>
								</label>
								<div>
									<CKEditor
								        editor  	= 	{ClassicEditor}
								        data 		= 	{this.state.executiveSummary}
								        id 			= 	"executiveSummary"
								        onInit		=	{ editor =>	{}}
								        onChange 	=	{(event, editor) => {this.setState({ executiveSummary: editor.getData() });} }
								        onBlur		=	{ editor 	=> 	{} }
								        onFocus		=	{ editor 	=> {} }
							        />	
								</div>
								<span id="executiveSummaryError" className="errorMsg"></span>
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
											<div className="profileImageWrapper col-lg-12">
												<div className="row">
													<i className="fa fa-times delImgIcon" 
													   onClick={this.delImgPreview.bind(this)}>
													</i>
													<img src={this.state.profileImageUrl} alt="profileImage" 
													className="profileImage"/>
												</div>
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
							<div className="col-lg-4 ">
								<label htmlFor="profilePicture" className="nameTitleForm">
									Resume 
								</label>
								<div className="input-group ">
									{
										this.state.resumeUrl!== ""
										?	
											<div className="profileImageWrapper col-lg-12">
												<div className="row">
													<i className="fa fa-times delResumeIcon" 
													   onClick={this.delResumePreview.bind(this)}>
													</i>
													<img src={"/images/resumeIcon.png"} alt="profileImage" 
													className="resumeImage"/>
												</div>
											</div>
										:
											<div>

												<input type="file" className="inputImage" 
												 name="resume"
												 onChange={this.uploadResume.bind(this)}
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
