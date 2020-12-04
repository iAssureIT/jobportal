import React,{Component} 	from 'react';
import Moment               from 'moment';
import { withRouter }	 	from 'react-router-dom';
import Axios 			 	from 'axios';
import Swal 			 	from 'sweetalert2';
import PhoneInput 			from 'react-phone-input-2';
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome';
import '../BasicInfoForm/BasicInfoForm.css';
import './Contact.css';

import 'react-phone-input-2/lib/style.css';


class Contact extends Component{
	constructor(props){
		super(props);

		this.state={
			mobile        : "",
			alternate     : "",
			email         : "",
			candidateID   : this.props.match.params.candidateID,
		}
	}
	componentDidMount(){
	Axios.get("/api/candidatemaster/get/one/"+this.state.candidateID)
		.then(response=>{
			 	this.setState({
			 		
					mobile         : response.data[0].contact.mobile?response.data[0].contact.mobile:"",
					alternate      : response.data[0].contact.altMobile?response.data[0].contact.altMobile:"",
					email          : response.data[0].contact.emailId?response.data[0].contact.emailId:"",

			 	})
			 })
			 .catch(error=>{
			 	Swal.fire("Submit Error!",error.message,'error');
			 })

}

	//========== User Define Function Start ================


	handleChange(event){
		var value = event.currentTarget.value;
		var name  = event.currentTarget.name;

		
		this.setState({
			[name]:value,
		})
	}
	handleBack(event){
		event.preventDefault();
		this.props.history.push("/address/"+this.state.candidateID);
	}
	handleSubmit(event){
		event.preventDefault();

		var status =  this.validateForm();
			var formValues = {
								candidateID : this.state.candidateID,
								mobile      : this.state.mobile,
								altMobile   : this.state.alternate,
								emailId     : this.state.email,
							}
		
		if(status==true){
				Axios.patch("/api/candidatemaster/patch/updateCandidateContact",formValues)
			 .then(response=>{

						Swal.fire("Congrats","Your Profile is update Successfully","success");
							this.setState({

											mobile        : "",
											alternate     : "",
											email         : "",
										})


						this.props.history.push("/academics/"+this.state.candidateID);
							
							
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
									<sup className="nameTitleFormStar">*</sup>
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
									 className="form-control inputBox" value={this.state.email} 
									 onChange={this.handleChange.bind(this)} />
								</div> 
								<span id="emailError" className="errorMsg"></span>
							</div>

						</div>

						<button className="buttonBack pull-left" onClick={this.handleBack.bind(this)}>
						 	<FontAwesomeIcon className="backArrow" icon="arrow-left" /> 
							Back
						 </button>
						
						<button className="buttonNext pull-right" onClick={this.handleSubmit.bind(this)}>
							Next 
							<FontAwesomeIcon className="nextArrow" icon="arrow-right" />
						</button>
					</form>
				</div>
			);
	}
}

export default withRouter(Contact);