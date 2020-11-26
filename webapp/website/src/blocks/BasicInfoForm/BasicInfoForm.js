import React,{Component}    from 'react';
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome';
import Moment               from 'moment';
import { withRouter }	 	from 'react-router-dom';
import Axios 			 	from 'axios';
import Swal 			 	from 'sweetalert2';
import { Multiselect }      from 'multiselect-react-dropdown';


import './BasicInfoForm.css';


class BasicInfoForm extends Component{
	constructor(props){
		super(props);
		this.state={
			firstName          : "",
			middleName         : "",
			candidateID        : localStorage.getItem("candidateID"),
			lastName           : "",
			dob                : "",
			profilePhoto       : "",
			profileImageUrl    : "",
			gender             : "male",
			anniversaryDate    : "",	
			maritalStatus      : "",
			nationality        : "",
			panCardNo          : "",
			adhaarCardNo       : "",
			selectedValue      : [],
			ageYears	       : 0,	
			ageMonths	       : 0,	
			ageDays	       	   : 0,
			age                :"",
			inputMaritalStatus : ["Single",,"Married", "Separated","Divorced","Widowed"],
			inputNationality   : ["Indian","American"],
			languages	       : [],
			inputLanguages	   : [],
		}
		 this.style =  {
					      chips: {
					         backgroundColor: "#D3950A"
					      },
					      searchBox: {
					        border: "1px solid #D3950A",
					        borderTopLeftRadius: "0px",
					        borderBottomLeftRadius: "0px",
					        height:"34px",
					        overflow:"auto"
					      },
					      multiselectContainer: {
					      	backgroundColor: "#242931",
					        color: "white",
					        zIndex:"5!important"
					      }, 
					      inputField: {
						     fontSize:"13.5px",
						     marginLeft:"5px",
						     zIndex:"5!important",

						  },
						  option: {
						   	backgroundColor: "#242933",
						   	zIndex:"5!important",
						   	color: "white",
						   	paddingTop:"5px",
						   	paddingBottom:"5px",

						  },
						  optionContainer:{
						  	backgroundColor: "#242933",
						  	border: "1px solid #D3950A",
						  	zIndex:"5!important",
						  	height: "100px"
						  }
						};
	}
	componentDidMount(){

		Axios.get("/api/candidatemaster/get/one/"+this.state.candidateID)
		.then(response=>{
			 
			 	this.setState({
			 		firstName         : response.data[0].basicInfo.firstName?response.data[0].basicInfo.firstName:"",
					middleName        : response.data[0].basicInfo.middleName?response.data[0].basicInfo.middleName:"",
					lastName          : response.data[0].basicInfo.lastName?response.data[0].basicInfo.lastName:"",
					dob               : response.data[0].basicInfo.dob?Moment(response.data[0].basicInfo.dob).format("YYYY-MM-DD"):"",
					gender            : response.data[0].basicInfo.gender?response.data[0].basicInfo.gender:"",
					anniversaryDate   : response.data[0].basicInfo.anniversaryDate?Moment(response.data[0].basicInfo.anniversaryDate).format("YYYY-MM-DD"):"",
					maritalStatus     : response.data[0].basicInfo.maritalStatus?response.data[0].basicInfo.maritalStatus:"",
					nationality       : response.data[0].basicInfo.nationality?response.data[0].basicInfo.nationality:"",
					panCardNo         : response.data[0].panCard?response.data[0].panCard:"",
					adhaarCardNo      : response.data[0].aadhaarCard?response.data[0].aadhaarCard:"",
		
					age               : response.data[0].basicInfo.age?response.data[0].basicInfo.age:"",
					

				
			 	})
			 })
			 .catch(error=>{
			 	Swal.fire("Submit Error!",error.message,'error');
			 })

		Axios.get("/api/languagemaster/get/list")
		.then(response => {
			this.setState({inputLanguages : response.data});
			console.log("response.data",response.data);
			this.state.inputLanguages!=null && this.state.inputLanguages.length > 0 
			?
				this.state.inputLanguages.map((elem,index)=>{
					
					this.state.languages.push(elem.language);
					
					
				})
			:
				this.state.languages.push("select");
		})
		.catch(error=>{
			Swal.fire("Error while getting List data",error.message,'error');
		})

			
}

	//========== User Define Function Start ================
	selectImage(event){
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
				ageWeeks: weeks,
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
	handleSubmit(event){
		event.preventDefault();
		var status =  this.validateForm();
			var formValues = {

								firstName          : this.state.firstName,
								candidateID        : this.state.candidateID,
								middleName         : this.state.middleName,
								lastName           : this.state.lastName,
								dob                : this.state.dob,
								gender             : this.state.gender,
								anniversaryDate    : this.state.anniversaryDate,	
								maritalStatus      : this.state.maritalStatus,
								nationality        : this.state.nationality,
								panCard            : this.state.panCardNo,
								aadhaarCard        : this.state.adhaarCardNo,
								languagesKnown	   : this.state.selectedValue,
								age	   			   : this.state.age,
								
							}
							console.log(formValues);
			if(status==true){
				Axios.patch("/api/candidatemaster/patch/updateCandidateBasicInfo",formValues)
			 .then(response=>{
						 
								
						 	console.log(response.data);
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
												})


								this.props.history.push("/address/"+this.state.candidateID);
							
							
				})
				.catch(error =>{
					console.log(error);
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
									<Multiselect  name="languages" id="languages" 
									 className="form-control " value={this.state.languages} 
									 onChange={this.handleChange.bind(this)}
									 options={this.state.languages}
									 isObject={false}
									 style={this.style}
									 closeIcon="cancel"
									 showCheckbox={false}
									 />
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
									  	<option disabled> -- Select -- </option>
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
						</button>
						
					</form>
					
				</div>
			);
	}
}

export default withRouter(BasicInfoForm);