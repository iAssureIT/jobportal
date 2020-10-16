import React,{Component} 	from 'react';
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome';
import Moment               from 'moment';

import '../BasicInfoForm/BasicInfoForm.css';


class Academics extends Component{
	constructor(props){
		super(props);

		this.state={
			companyName                   : "",
			companyCountry                : "",
			companyCity                   : "",
			lastDesignation               : "",
			lastDeartment   		      : "",
			lastSalary                    : "",
			formDate	                  : "",	
			toDate                        : "",
			responsibilities              : "",
			reportingManager              : "",
			reportingManagerDesignation   : "",

			expYears                      : 0,
			expMonths                     : 0,
			
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
								companyName                   : this.state.companyName,
								companyCountry                : this.state.companyCountry,
								companyCity                   : this.state.companyCity,
								lastDesignation               : this.state.lastDesignation,
								lastDeartment                 : this.state.lastDeartment,
								lastSalary                    : this.state.lastSalary,
								formDate                      : this.state.formDate,
								responsibilities              : this.state.responsibilities,
								reportingManager              : this.state.reportingManager,
								reportingManagerDesignation   : this.state.reportingManagerDesignation,
							}
		console.log(formValues);
		
		this.setState({
			companyName                   : "",
			companyCountry                : "",
			companyCity                   : "",
			lastDesignation               : "",
			lastDeartment   		      : "",
			lastSalary                    : "",
			formDate	                  : "",	
			toDate                        : "",
			responsibilities              : "",
			reportingManager              : "",
			reportingManagerDesignation   : "",
	
		})
	}
	//========== User Define Function End ==================
		//========== Validation Start ==================
	 validateForm=()=>{
		var status = true;
	
		if(this.state.companyName.length<=0){
			document.getElementById("companyNameError").innerHTML=  
			"Please enter your Company Name";  
			status=false; 
		}else{
			document.getElementById("companyNameError").innerHTML=  
			""; 
			status = true;
		}
		
		if(this.state.companyCountry.length<=0){
			document.getElementById("companyCountryError").innerHTML=  
			"Please enter your Company Country";  
			status=false; 
		}else{
			document.getElementById("companyCountryError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.companyCity.length<=0){
			document.getElementById("companyCityError").innerHTML=  
			"Please enter your Company City";  
			status=false; 
		}else{
			document.getElementById("companyCityError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.lastDesignation.length<=0){
			document.getElementById("lastDesignationError").innerHTML=  
			"Please enter your Last Designation";  
			status=false; 
		}else{
			document.getElementById("lastDesignationError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.lastDeartment.length<=0){
			document.getElementById("lastDeartmentError").innerHTML=  
			"Please enter your Last Deartment";  
			status=false; 
		}else{
			document.getElementById("lastDeartmentError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.lastSalary.length<=0){
			document.getElementById("lastSalaryError").innerHTML=  
			"Please enter your Last Salary";  
			status=false; 
		}else{
			document.getElementById("lastSalaryError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.formDate.length<=0){
			document.getElementById("formDateError").innerHTML=  
			"Please enter your Form Date";  
			status=false; 
		}else{
			document.getElementById("formDateError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.toDate.length<=0){
			document.getElementById("toDateError").innerHTML=  
			"Please enter your To Date";  
			status=false; 
		}else{
			document.getElementById("toDateError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.responsibilities.length<=0){
			document.getElementById("responsibilitiesError").innerHTML=  
			"Please enter your Responsibilities";  
			status=false; 
		}else{
			document.getElementById("responsibilitiesError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.reportingManager.length<=0){
			document.getElementById("reportingManagerError").innerHTML=  
			"Please enter your Reporting Manager";  
			status=false; 
		}else{
			document.getElementById("reportingManagerError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.reportingManagerDesignation.length<=0){
			document.getElementById("reportingManagerDesignationError").innerHTML=  
			"Please enter your Reporting Manager Designation";  
			status=false; 
		}else{
			document.getElementById("reportingManagerDesignationError").innerHTML=  
			""; 
			status = true;
		}
		
	
		
		 return status;
	}

	//========== Validation End ==================
	render(){
		return(
				<div className="col-lg-12">
					<form>

						

						<div className="row formWrapper">

							<div className="col-lg-4">
								<label htmlFor="companyName" className="nameTitleForm">Company Name<sup className="nameTitleFormStar">*</sup></label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon"><FontAwesomeIcon icon="warehouse" /></span> 
									<input type="text" name="companyName" id="companyName" className="form-control inputBox " value={this.state.companyName} onChange={this.handelChange.bind(this)} />
								</div> 
								<span id="companyNameError" className="errorMsg"></span>
							</div>

							<div className="col-lg-4">
								<label htmlFor="companyCountry" className="nameTitleForm">Company Country<sup className="nameTitleFormStar">*</sup></label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon"><i className="fa fa-flag"></i></span> 
									<input type="text" name="companyCountry" id="companyCountry" className="form-control inputBox " value={this.state.companyCountry} onChange={this.handelChange.bind(this)} />
								</div> 
								<span id="companyCountryError" className="errorMsg"></span>
							</div>

							<div className="col-lg-4">
								<label htmlFor="companyCity" className="nameTitleForm">Company City<sup className="nameTitleFormStar">*</sup></label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon"><FontAwesomeIcon icon="city" /></span> 
									<input type="text" name="companyCity" id="companyCity" className="form-control inputBox " value={this.state.companyCity} onChange={this.handelChange.bind(this)} />
								</div> 
								<span id="companyCityError" className="errorMsg"></span>
							</div>

						</div>

						<div className="row formWrapper">

							<div className="col-lg-4">
								<label htmlFor="lastDesignation" className="nameTitleForm">Last Designation<sup className="nameTitleFormStar">*</sup></label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon"><FontAwesomeIcon icon="id-card-alt" /> </span> 
									<input type="text" name="lastDesignation" id="lastDesignation" className="form-control inputBox" value={this.state.lastDesignation} onChange={this.handelChange.bind(this)} />
								</div> 
								<span id="lastDesignationError" className="errorMsg"></span>
							</div>

							<div className="col-lg-4">
								<label htmlFor="lastDeartment" className="nameTitleForm">Last Deartment<sup className="nameTitleFormStar">*</sup></label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon"><FontAwesomeIcon icon="network-wired" /> </span> 
									<input type="text" name="lastDeartment" id="lastDeartment" className="form-control inputBox" value={this.state.lastDeartment} onChange={this.handelChange.bind(this)} />
								</div> 
								<span id="lastDeartmentError" className="errorMsg"></span>
							</div>

							<div className="col-lg-4">
								<label htmlFor="lastSalary" className="nameTitleForm">Last Salary Drawn in INR<sup className="nameTitleFormStar">*</sup></label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon"><i className="fa fa-file"></i> </span> 
									<input type="text" name="lastSalary" id="lastSalary" className="form-control inputBox" value={this.state.lastSalary} onChange={this.handelChange.bind(this)} />
								</div> 
								<span id="lastSalaryError" className="errorMsg"></span>
							</div>

						</div>
						<div className="row formWrapper">

							<div className="col-lg-4">
								<label htmlFor="formDate" className="nameTitleForm">Form Date<sup className="nameTitleFormStar">*</sup></label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon"><i className="fa fa-calendar"></i> </span> 
									<input type="date" name="formDate" id="formDate" className="form-control inputBox" value={this.state.formDate} onChange={this.handelChange.bind(this)} />
								</div> 
								<span id="formDateError" className="errorMsg"></span>
							</div>

							<div className="col-lg-4">
								<label htmlFor="toDate" className="nameTitleForm">To Date<sup className="nameTitleFormStar">*</sup></label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon"><i className="fa fa-calendar"></i> </span> 
									<input type="date" name="toDate" id="toDate" className="form-control inputBox" value={this.state.toDate} onChange={this.handelChange.bind(this)} />
								</div> 
								<span id="toDateError" className="errorMsg"></span>
							</div>

							<div className="col-lg-4">
							<label htmlFor=""></label>
								<div className="input-group showFeild2" name="exp" id="exp"  >
									{this.state.expYears + "  Years, " + this.state.expMonths + " months"}	
								</div> 
							</div>

						</div>
						<div className="row formWrapper">

							<div className="col-lg-4">
								<label htmlFor="responsibilities" className="nameTitleForm">Responsibilities<sup className="nameTitleFormStar">*</sup></label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon"><FontAwesomeIcon icon="file-alt" /> </span> 
									<input type="text" name="responsibilities" id="responsibilities" className="form-control inputBox" value={this.state.responsibilities} onChange={this.handelChange.bind(this)} />
								</div> 
								<span id="responsibilitiesError" className="errorMsg"></span>
							</div>

							<div className="col-lg-4">
								<label htmlFor="reportingManager" className="nameTitleForm">Reporting Manager<sup className="nameTitleFormStar">*</sup></label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon"><i className="fa fa-user-circle"></i> </span> 
									<input type="text" name="reportingManager" id="reportingManager" className="form-control inputBox" value={this.state.reportingManager} onChange={this.handelChange.bind(this)} />
								</div> 
								<span id="reportingManagerError" className="errorMsg"></span>
							</div>

							<div className="col-lg-4">
								<label htmlFor="reportingManagerDesignation" className="nameTitleForm">Reporting Manager Designation<sup className="nameTitleFormStar">*</sup></label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon"><FontAwesomeIcon icon="id-card-alt" /> </span> 
									<input type="text" name="reportingManagerDesignation" id="reportingManagerDesignation" className="form-control inputBox" value={this.state.reportingManagerDesignation} onChange={this.handelChange.bind(this)} />
								</div> 
								<span id="reportingManagerDesignationError" className="errorMsg"></span>
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