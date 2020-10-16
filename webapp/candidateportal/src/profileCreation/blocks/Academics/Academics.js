import React,{Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../BasicInfoForm/BasicInfoForm.css';

class Academics extends Component{
	constructor(props){
		super(props);

		this.state={
			qualificationLevel  : "",
			qualification       : "",
			specialization      : "",
			college             : "",
			university   		: "",
			state               : "",
			country	            : "",	
			city                : "",
			grade               : "",
			mode                : "",
			passOutYear         : "",
			
			inputQualificationLevel   : [],
			inputQualification        : [],
			inputMode                 : [],
		}
	}

	//========== User Define Function Start ================


	handelChange(event){
		var value = event.currentTarget.value;
		var name  = event.currentTarget.name;

		
		this.setState({
			[name]:value,
		})
	}

	handelSubmit(event){
		event.preventDefault();
		var status =  this.validateForm();
		
			var formValues = {
								qualificationLevel   : this.state.qualificationLevel,
								qualification        : this.state.qualification,
								specialization       : this.state.specialization,
								college              : this.state.college,
								university           : this.state.university,
								state                : this.state.state,
								country              : this.state.country,
								city                 : this.state.city,
								grade                : this.state.grade,
								mode                 : this.state.mode,
								passOutYear          : this.state.passOutYear,
							}
		console.log(formValues);
		
		this.setState({
			qualificationLevel  : "",
			qualification       : "",
			specialization      : "",
			college             : "",
			university   		: "",
			state               : "",
			country	            : "",	
			city                : "",
			grade               : "",
			mode                : "",
			passOutYear         : "",
	
		})
	}
	//========== User Define Function End ==================
		//========== Validation Start ==================
	 validateForm=()=>{
		var status = true;
	
		if(this.state.grade.length<=0){
			document.getElementById("gradeError").innerHTML=  
			"Please enter your Grade";  
			status=false; 
		}else{
			document.getElementById("gradeError").innerHTML=  
			""; 
			status = true;
		}
		
		if(this.state.passOutYear.length<=0){
			document.getElementById("passOutYearError").innerHTML=  
			"Please enter your Pass Out Year";  
			status=false; 
		}else{
			document.getElementById("passOutYearError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.university.length<=0){
			document.getElementById("universityError").innerHTML=  
			"Please enter your University";  
			status=false; 
		}else{
			document.getElementById("universityError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.college.length<=0){
			document.getElementById("collegeError").innerHTML=  
			"Please enter your College";  
			status=false; 
		}else{
			document.getElementById("collegeError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.city.length<=0){
			document.getElementById("cityError").innerHTML=  
			"Please enter your City";  
			status=false; 
		}else{
			document.getElementById("cityError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.state.length<=0){
			document.getElementById("stateError").innerHTML=  
			"Please enter your State";  
			status=false; 
		}else{
			document.getElementById("stateError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.country.length<=0){
			document.getElementById("countryError").innerHTML=  
			"Please enter your Country";  
			status=false; 
		}else{
			document.getElementById("countryError").innerHTML=  
			""; 
			status = true;
		}
		
	
		
		 return status;
	}

	//========== Validation End ==================
	render(){
		return(
				<div className="col-lg-12 ">
					<form>

						<div className="row formWrapper">

							<div className="col-lg-4">
								<label htmlFor="qualificationLevel" className="nameTitleForm">Qualification Leval<sup className="nameTitleFormStar">*</sup></label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon"><FontAwesomeIcon icon="file-alt" /></span> 
									<select className="form-control inputBox" id="qualificationLevel" value={this.state.qualificationLevel} name="qualificationLevel" onChange={this.handelChange.bind(this)}>
									  	<option > ---- select ---- </option>
									  	{
									  		this.state.inputQualificationLevel.length>0
									  		?	
									  			this.state.inputQualificationLevel.map((elem,index)=>{
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
								<label htmlFor="qualification" className="nameTitleForm">Qualification<sup className="nameTitleFormStar">*</sup></label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon"><i className="fa fa-graduation-cap"></i></span> 
									<select className="form-control inputBox" id="qualification" value={this.state.qualification} name="qualification" onChange={this.handelChange.bind(this)}>
									  	<option > ---- select ---- </option>
									  	{
									  		this.state.inputQualification.length>0
									  		?	
									  			this.state.inputQualification.map((elem,index)=>{
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
								<label htmlFor="specialization" className="nameTitleForm">Specialization</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon"><i className="fa fa-graduation-cap"></i></span> 
									<input type="text" name="specialization" id="specialization" className="form-control inputBox " value={this.state.specialization} onChange={this.handelChange.bind(this)} />
								</div> 
							</div>

						</div>

						<div className="row formWrapper">

							<div className="col-lg-4">
								<label htmlFor="grade" className="nameTitleForm">Grade/Marks/GPA<sup className="nameTitleFormStar">*</sup></label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon"><FontAwesomeIcon icon="file-alt" /></span> 
									<input type="text" name="grade" id="grade" className="form-control inputBox" value={this.state.grade} onChange={this.handelChange.bind(this)} />
								</div> 
								<span id="gradeError" className="errorMsg"></span>
							</div>

							<div className="col-lg-4">
								<label htmlFor="mode" className="nameTitleForm">Mode<sup className="nameTitleFormStar">*</sup></label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon"><FontAwesomeIcon icon="adjust" /></span> 
									<select className="form-control inputBox" id="mode" value={this.state.mode} name="mode" onChange={this.handelChange.bind(this)}>
									  	<option > ---- select ---- </option>
									  	{
									  		this.state.inputMode.length>0
									  		?	
									  			this.state.inputMode.map((elem,index)=>{
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
								<label htmlFor="passOutYear" className="nameTitleForm">Pass-out-year<sup className="nameTitleFormStar">*</sup></label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon"><i className="fa fa-calendar"></i></span> 
									<input type="text" name="passOutYear" id="passOutYear" className="form-control inputBox " value={this.state.passOutYear} onChange={this.handelChange.bind(this)} />
								</div> 
								<span id="passOutYearError" className="errorMsg"></span>
							</div>

						</div>

						<div className="row formWrapper">

							<div className="col-lg-4">
								<label htmlFor="college" className="nameTitleForm">College/School Name<sup className="nameTitleFormStar">*</sup></label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon"><FontAwesomeIcon icon="university" /></span> 
									<input type="text" name="college" id="college" className="form-control inputBox " value={this.state.college} onChange={this.handelChange.bind(this)} />
								</div> 
								<span id="collegeError" className="errorMsg"></span>
							</div>

							<div className="col-lg-4">
								<label htmlFor="university" className="nameTitleForm">University/Boards Name<sup className="nameTitleFormStar">*</sup></label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon"><FontAwesomeIcon icon="university" /></span> 
									<input type="text" name="university" id="university" className="form-control inputBox " value={this.state.university} onChange={this.handelChange.bind(this)} />
								</div> 
								<span id="universityError" className="errorMsg"></span>
							</div>

							<div className="col-lg-4">
								<label htmlFor="state" className="nameTitleForm">State<sup className="nameTitleFormStar">*</sup></label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon"><i className="fa fa-map"></i></span> 
									<input type="text" name="state" id="state" className="form-control inputBox " value={this.state.state} onChange={this.handelChange.bind(this)} />
								</div> 
								<span id="stateError" className="errorMsg"></span>
							</div>

						</div>

						<div className="row formWrapper">

							<div className="col-lg-4">
								<label htmlFor="country" className="nameTitleForm">Country<sup className="nameTitleFormStar">*</sup></label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon"><i className="fa fa-flag"></i> </span> 
									<input type="text" name="country" id="country" className="form-control inputBox" value={this.state.country} onChange={this.handelChange.bind(this)} />
								</div> 
								<span id="countryError" className="errorMsg"></span>
							</div>

							<div className="col-lg-4">
								<label htmlFor="city" className="nameTitleForm">City<sup className="nameTitleFormStar">*</sup></label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon"><FontAwesomeIcon icon="city" /> </span> 
									<input type="text" name="city" id="city" className="form-control inputBox" value={this.state.city} onChange={this.handelChange.bind(this)} />
								</div>
								<span id="cityError" className="errorMsg"></span>
							</div>

						</div>

					
						<button className="buttonBack pull-left" onClick={this.handelSubmit.bind(this)}> <i className="fa fa-angle-left"> - Back</i></button>
						<button className="buttonNext pull-right" onClick={this.handelSubmit.bind(this)}>Next - <i className="fa fa-angle-right "></i></button>
					</form>
				</div>
			);
	}
}

export default Academics;