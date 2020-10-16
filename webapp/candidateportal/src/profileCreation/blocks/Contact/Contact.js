import React,{Component} from 'react';

import '../BasicInfoForm/BasicInfoForm.css';
import './Contact.css';

class Contact extends Component{
	constructor(props){
		super(props);

		this.state={
			mobile        : "",
			alternate     : "",
			email         : "",
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
								mobile      : this.state.mobile,
								alternate   : this.state.alternate,
								email       : this.state.email,
							}
		console.log(formValues);
		
		this.setState({
			mobile        : "",
			alternate     : "",
			email         : "",
		})
	}
	//========== User Define Function End ==================
	//========== Validation Start ==================
	 validateForm=()=>{
		var status = true;
		var tempEmail = this.state.email.trim(); // value of field with whitespace trimmed off
    	var emailFilter = /^[^@]+@[^@.]+\.[^@]*\w\w$/;
    	var illegalChars = /[\(\)\<\>\,\;\:\\\"\[\]]/;
    	var phoneno = /^\d{10}$/;

		if(this.state.email.length<=0){
			document.getElementById("emailError").innerHTML=  
			"Please enter your Email";  
			status=false; 
		}else if (
			!emailFilter.test(tempEmail)) { //test email for illegal characters
	        document.getElementById('emailError').innerHTML = "Please enter a valid email address.";
	    } else if (this.state.email.match(illegalChars)) {
	        document.getElementById('emailError').innerHTML = "Email contains invalid characters.";
	    }else{
			document.getElementById("emailError").innerHTML=
			""; 
			status = true;
		}
		if(this.state.mobile.match(phoneno)){
			document.getElementById("mobileError").innerHTML=  
			""; 
			status = true;
			
		}else{
			document.getElementById("mobileError").innerHTML=  
			"Please enter your 10 Digit Mobile Number";  
			status=false; 
		}
		if(this.state.alternate.match(phoneno)){
			document.getElementById("alternateError").innerHTML=  
			""; 
			status = true;
			
		}else{
			document.getElementById("alternateError").innerHTML=  
			"Please enter your 10 Digit Alternate Mobile Number";  
			status=false; 
		}

		
		 return status;
	}

	//========== Validation End ==================
	render(){
		return(
				<div className="col-lg-12 ">
					<form>

						<div className="row formWrapper contactWrapper">

							<div className="col-lg-4">
								<label htmlFor="mobile" className="nameTitleForm">Mobile Number<sup className="nameTitleFormStar">*</sup></label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon"><i className="fa fa-mobile"></i> </span> 
									<input type="text" name="mobile" id="mobile" className="form-control inputBox" value={this.state.mobile} onChange={this.handelChange.bind(this)} />
								</div> 
								<span id="mobileError" className="errorMsg"></span>
							</div>

							<div className="col-lg-4">
								<label htmlFor="alternate" className="nameTitleForm">Alternate Mobile Number<sup className="nameTitleFormStar">*</sup></label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon"><i className="fa fa-mobile"></i> </span> 
									<input type="text" name="alternate" id="alternate" className="form-control inputBox" value={this.state.alternate} onChange={this.handelChange.bind(this)} />
								</div> 
								<span id="alternateError" className="errorMsg"></span>
							</div>

							<div className="col-lg-4">
								<label htmlFor="email" className="nameTitleForm">Personal Mail ID<sup className="nameTitleFormStar">*</sup></label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon"><i className="fa fa-envelope-o"></i> </span> 
									<input type="email" name="email" id="email" className="form-control inputBox" value={this.state.email} onChange={this.handelChange.bind(this)} />
								</div> 
								<span id="emailError" className="errorMsg"></span>
							</div>

						</div>

						<button className="buttonBack pull-left" onClick={this.handelSubmit.bind(this)}> <i className="fa fa-angle-left"> - Back</i></button>
						<button className="buttonNext pull-right" onClick={this.handelSubmit.bind(this)}>Next - <i className="fa fa-angle-right "></i></button>
					</form>
				</div>
			);
	}
}

export default Contact;