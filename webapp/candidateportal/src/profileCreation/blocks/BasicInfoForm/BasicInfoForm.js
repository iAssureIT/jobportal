import React,{Component}    from 'react';
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome';
import Moment               from 'moment';


import './BasicInfoForm.css';


class BasicInfoForm extends Component{
	constructor(props){
		super(props);

		this.state={
			firstName          : "",
			middleName         : "",
			lastName           : "",
			dob                : "",
			gender             : "male",
			anniversaryDate    : "",	
			maritalStatus      : "",
			languages	       : "",
			nationality        : "",
			panCardNo          : "",
			adhaarCardNo       : "",
			ageYears	       : 0,	
			ageMonths	       : 0,	
			ageWeeks	       : 0,	
			ageDays	       	   : 0,
			inputMaritalStatus : ["Married", "UnMarried"],
			inputLanguages	   : ["English", "Marathi", "Hindi"],
			inputNationality   : ["Indian","American"],
		}
	}

	//========== User Define Function Start ================


	handelChange(event){
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
	handelSubmit(event){
		event.preventDefault();
		var status =  this.validateForm();
			var formValues = {
								firstName         : this.state.firstName,
								middleName        : this.state.middleName,
								lastName          : this.state.lastName,
								dob               : this.state.dob,
								anniversaryDate   : this.state.anniversaryDate,
								maritalStatus     : this.state.maritalStatus,
								languages         : this.state.languages,
								nationality       : this.state.nationality,
								panCardNo         : this.state.panCardNo,
								adhaarCardNo      : this.state.adhaarCardNo,
								gender      	  : this.state.gender,
							}
							console.log(formValues);
			this.setState({
							firstName          : "",
							middleName         : "",
							lastName           : "",
							dob                : "",
							gender             : "male",
							anniversaryDate    : "",	
							maritalStatus      : "",
							languages	       : "",
							nationality        : "",
							panCardNo          : "",
							adhaarCardNo       : "",
							ageYears	       : 0,	
							ageMonths	       : 0,	
							ageWeeks	       : 0,	
							ageDays	       	   : 0,
						})
		
			this.props.history("/address/:candidateID");
		
		
	}
	//========== User Define Function End ==================

	//========== Validation Start ==================
	 validateForm=()=>{
		var status = true;
	
		if(this.state.firstName.length<=0){
			document.getElementById("firstNameError").innerHTML=  
			"Please enter your first name";  
			status=false; 
		}else{
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
								<label htmlFor="firstName" className="nameTitleForm">First Name<sup className="nameTitleFormStar">*</sup></label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon"><i className="fa fa-user-circle"></i> </span> 
									<input type="text" name="firstName" id="firstName" className="form-control inputBox" value={this.state.firstName} onChange={this.handelChange.bind(this)} />
								</div> 
								<span id="firstNameError" className="errorMsg"></span>
							</div>

							<div className="col-lg-4">
								<label htmlFor="middleName" className="nameTitleForm">Middle Name</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon"><i className="fa fa-user-circle"></i> </span> 
									<input type="text" name="middleName" id="middleName" className="form-control inputBox" value={this.state.middleName} onChange={this.handelChange.bind(this)} />
								</div> 
								
							</div>

							<div className="col-lg-4">
								<label htmlFor="lastName" className="nameTitleForm">Last Name</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon"><i className="fa fa-user-circle"></i> </span> 
									<input type="text" name="lastName" id="lastName" className="form-control inputBox" value={this.state.lastName} onChange={this.handelChange.bind(this)} />
								</div> 
							</div>

						</div>

						<div className="row formWrapper">

							<div className="col-lg-4">
								<label htmlFor="dob" className="nameTitleForm">Date Of Birth<sup className="nameTitleFormStar">*</sup></label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon"><i className="fa fa-birthday-cake"></i></span> 
									<input type="date" name="dob" id="dob" className="form-control inputBox unstyled" value={this.state.dob} onChange={this.handelChange.bind(this)} />
								</div> 
								<span id="dobError" className="errorMsg"></span>
							</div>

							<div className="col-lg-4">
								<label htmlFor="age" className="nameTitleForm nameTitleFormAge">Age</label>
								<div className="input-group showFeild">
									{this.state.ageYears + "  Years, " + this.state.ageMonths + " months, " + this.state.ageWeeks + "Weeks " + " And " + this.state.ageDays + " Days Old"}	
								</div> 
							</div>

							<div className="col-lg-4">
								<label htmlFor="gender" className="nameTitleForm nameTitleFormAge">Gender</label>
								<div className="input-group genderFeildWrapper">
									<div className={this.state.gender==="male"? "genderFeild col-lg-4 genderFeildActive" : "genderFeild col-lg-4" }  id="male" name="gender" value="male" onClick={this.setGender.bind(this)}>
										<div className="row" >
											Male
										</div>
									</div>
									<div className={this.state.gender==="female"? "genderFeild col-lg-4 genderFeildActive" : "genderFeild col-lg-4" } id="female" name="gender" value="female" onClick={this.setGender.bind(this)}>
										<div className="row">
											female
										</div>
									</div>
									<div className={this.state.gender==="transgender"? "genderFeild col-lg-4 genderFeildActive" : "genderFeild col-lg-4" } id="transgender" name="gender" value="transgender"  onClick={this.setGender.bind(this)}>
										<div className="row">
											Transgender
										</div>
									</div>		
									
								</div>
							</div>

						</div>

						<div className="row formWrapper">

							<div className="col-lg-4">
								<label htmlFor="maritalStatus" className="nameTitleForm">Marital Status<sup className="nameTitleFormStar">*</sup></label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon inputBoxIcon1"><FontAwesomeIcon icon="ring" /></span> 
									<select required className="form-control inputBox selectOption" id="maritalStatus" value={this.state.maritalStatus} name="maritalStatus" onChange={this.handelChange.bind(this)}>
									  	<option  > ---- select ---- </option>
									  	{
									  		this.state.inputMaritalStatus.length>0
									  		?	
									  			this.state.inputMaritalStatus.map((elem,index)=>{
									  				return(
									  					<option>{elem}</option>
									  				);
									  			})
									  			
									  		:
									  			null
									  	}
									</select>

								</div>
							</div>

							<div className="col-lg-4">
								<label htmlFor="anniversaryDate" className="nameTitleForm">Anniversary Date</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon inputBoxIcon2"><i className="fa fa-calendar-o"></i></span> 
									<input type="date" name="anniversaryDate" id="anniversaryDate" className="form-control inputBox " value={this.state.anniversaryDate} onChange={this.handelChange.bind(this)} />
								</div> 
							</div>

							<div className="col-lg-4">
								<label htmlFor="languages" className="nameTitleForm">Languages<sup className="nameTitleFormStar">*</sup></label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon inputBoxIcon2"><i className="fa fa-comment-o"></i></span> 
									<select className="form-control inputBox" id="languages" value={this.state.languages} name="languages" onChange={this.handelChange.bind(this)}>
									  	<option  > - Select Your Languages - </option>
									  	{
									  		this.state.inputLanguages.length>0
									  		?	
									  			this.state.inputLanguages.map((elem,index)=>{
									  				return(
									  					<option>{elem}</option>
									  				);
									  			})
									  			
									  		:
									  			null
									  	}
									</select>
								</div>
							</div>

						</div>

						<div className="row formWrapper">

							<div className="col-lg-4">
								<label htmlFor = "nationality" className = "nameTitleForm" > Nationality <sup className = "nameTitleFormStar"> * </sup></label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon"><i className="fa fa-flag-o"></i></span> 
									<select className="form-control inputBox" id = "nationality" value ={this.state.nationality} name="nationality" onChange={this.handelChange.bind(this)}>
									  	<option > ---- select ---- </option>
									  	{
									  		this.state.inputNationality.length>0
									  		?	
									  			this.state.inputNationality.map((elem,index)=>{
									  				return(
									  					<option>{elem}</option>
									  				);
									  			})
									  			
									  		:
									  			null
									  	}
									</select>
								</div>
							</div>

							<div className="col-lg-4">
								<label htmlFor="panCardNo" className="nameTitleForm">Pan Card No.</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon"><i className="fa fa-id-card-o"></i> </span> 
									<input type="text" name="panCardNo" id="panCardNo" className="form-control inputBox" value={this.state.panCardNo} onChange={this.handelChange.bind(this)} />
								</div> 
							</div>

							<div className="col-lg-4">
								<label htmlFor="adhaarCardNo" className="nameTitleForm">Aadhaar Card No.</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon"><i className="fa fa-id-card-o"></i> </span> 
									<input type="text" name="adhaarCardNo" id="adhaarCardNo" className="form-control inputBox" value={this.state.adhaarCardNo} onChange={this.handelChange.bind(this)} />
								</div> 
							</div>

						</div>

						<button className="buttonNext pull-right" onClick={this.handelSubmit.bind(this)}>Next</button>
					</form>
				</div>
			);
	}
}

export default BasicInfoForm;