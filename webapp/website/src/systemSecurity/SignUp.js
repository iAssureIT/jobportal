import React, { Component } from 'react';
import $ from "jquery";
import jQuery from 'jquery';
import 'jquery-validation';
import PhoneInput from 'react-phone-input-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/modal.js';
import 'bootstrap/js/tab.js';
import 'font-awesome/css/font-awesome.min.css';
import './SignUp.css';
import swal from 'sweetalert';
import axios from 'axios';
import { connect }        from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter }   from 'react-router-dom';
import  * as mapActionCreator from '../common/actions/index';
import 'react-phone-input-2/lib/style.css';


class SignUp extends Component {

	constructor() {
		super();
		this.state = {
			checkUserExists: 0,
			loggedIn: false,
      showPassword1: false,
      showPassword2: false,
			employerID : "",
			formerrors: {
				firstNameV: "",
				lastNameV: "",
				mobileV: "",
				emailIDV: "",
        "mobileNumberAvailable" : true, 
			},
			employerArray : [],
			vendor_Id : "",
			currentCompany :"",
	      	firstName  : "",
	      	lastName   : "",
	      	password   : "",
	      	confirmPassword   : "",
	      	emailAddress      : "",
	      	mobileNumber      : "",
		}
		this.handleChange = this.handleChange.bind(this);
	}
	componentWillMount() {

	}

  changeMobile(event) {
    this.setState({
      mobileNumber: event
    }, () => {
      if (this.state.mobileNumber) {
        this.setState({
      mobileNumberAvailable: this.state.mobileNumber === "+" || this.state.mobileNumber.length<15 ? true : false
        },()=>{
        })
      }
    })
  }
	componentDidMount() {
		
		$(".checkUserExistsError").hide();
		//==============
		axios.get('/api/entitymaster/get/employer')
		.then((response) => {
			console.log('entitymaster==',response.data)

			this.setState({
		        	employerArray : response.data
		        })
		})
		.catch((error) => {
		})
	}

  showPassword1=(event)=>{
    event.preventDefault();
    var passwordToggle1 = document.getElementById("password");
    if (passwordToggle1.type === "password") {
        passwordToggle1.type = "text";
        this.setState({showPassword1:true});
      } else {
        passwordToggle1.type = "password";
        this.setState({showPassword1:false});
      }
  }

  showPassword2=(event)=>{
    event.preventDefault();
    var passwordToggle2 = document.getElementById("confirmPassword");
    if (passwordToggle2.type === "password") {
        passwordToggle2.type = "text";
        this.setState({showPassword2:true});
      } else {
        passwordToggle2.type = "password";
        this.setState({showPassword2:false});
      }
  }
	validateForm=()=>{
    var status = true;
    var regName = /^[a-zA-Z]+$/;
    var firstName=this.state.firstName;
    var lastName=this.state.lastName;
    var tempEmail = this.state.emailAddress.trim(); // value of field with whitespace trimmed off
    var emailFilter = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var illegalChars = /[\(\)\<\>\,\;\:\\\"\[\]]/;
    var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{5})[-. ]?([0-9]{5})$/;

    if(this.state.firstName<=0)  {
      document.getElementById("firstNameError").innerHTML=  
      "Please enter valid Name";  
      status=false; 
    }
  
    else if(!regName.test(firstName)){
      document.getElementById("firstNameError").innerHTML=  
      "Please enter valid name,......";  
      status=false; 
    }
    else{
      
      status = true;
    }

    if(this.state.lastName<=0)  {
      document.getElementById("lastNameError").innerHTML=  
      "Please enter valid Name";  
      status=false; 
    }
    else if(!regName.test(lastName)){
      document.getElementById("lastNameError").innerHTML=  
      "Please enter valid name.....";  
      status=false; 
    }
    else{
      document.getElementById("lastNameError").innerHTML=  
       " ."; 
      status = true;
    }

    if(this.state.emailAddress.length<=0){
      document.getElementById("emailAddressError").innerHTML=  
      "Please enter your Email";  
      status=false; 
    }else if (
      !emailFilter.test(tempEmail)) { //test email for illegal characters
          document.getElementById('emailAddressError').innerHTML = "Please enter a valid email address.";
      } else{
      document.getElementById("emailAddressError").innerHTML=
      " ."; 
      status = true;
    }

    if(this.state.mobileNumber.match(phoneno)){
      
      status = true;
      
    }else{
      document.getElementById("mobileNumberError").innerHTML=  
      "Please enter valid Mobile Number";  
      status=false; 
    }

    if(this.state.password.length<=0){
      document.getElementById("passwordError").innerHTML=  
      "Please enter Password";  
      status=false; 
    }

    if(this.state.password.length<8){
      document.getElementById("passwordError").innerHTML=  
      "Please enter atleast 8 characters";  
      status=false; 
    }
    else{
      document.getElementById("passwordError").innerHTML=  
      " ."; 
      status = true;
    }

    if(this.state.confirmPassword.length<=0){
      document.getElementById("confirmPasswordError").innerHTML=  
      "Please enter Confirm Password";  
      status=false; 
    }

    if(this.state.confirmPassword.length<8){
      document.getElementById("confirmPasswordError").innerHTML=  
      "Please enter atleast 8 characters";  
      status=false; 
    }
    else{
      document.getElementById("confirmPasswordError").innerHTML=  
      " ."; 
      status = true;
    }

    if ((this.state.password) != (this.state.confirmPassword)){
      document.getElementById("passwordError").innerHTML=  
      "Passwords do not match";  
      document.getElementById("confirmPasswordError").innerHTML=  
      "Passwords do not match"; 
      status=false; 
    }

    return status;
  } 
	usersignup(event) {
		event.preventDefault();
		var status =  this.validateForm();

	    if(status == true){
			var auth = {
				username 		: "EMAIL",
				firstname		: this.state.firstName,
				lastname		: this.state.lastName,
				mobNumber		: (this.state.mobileNumber).replace("-", ""),
				email			: this.state.emailAddress,
				pwd				: this.state.password,
				companyID		: this.state.employerID,
				companyName	: this.state.employerName,
				role			: 'candidate',
				status			: 'unverified',
				"emailSubject"	: "Email Verification", 
				"emailContent"  : "As part of our registration process, we screen every new profile to ensure its credibility by validating email provided by user. While screening the profile, we verify that details put in by user are correct and genuine.",
			}

			
		  console.log('auth sign=======',auth)

			axios.post('/api/auth/post/signup/user/otp', auth)
				.then((response) => {
					console.log("signup res===",response.data)
					if(response.data.message == 'USER_CREATED'){
						swal('Great, Information submitted successfully and OTP is sent to your registered Email.');
						localStorage.setItem('previousUrl' ,'signup');

            var {mapAction} = this.props;
            mapAction.setUserID(response.data.ID);
            //mapAction.setSelectedModal("confirmotp");
            var sendData = {
              "event"     : "Event1", //Event Name
              "toUser_id"  : response.data.ID, //To user_id(ref:users)
              "toUserRole"  : "candidate",
              "variables" : {
                "UserName": this.state.firstName,
                "OTP"     : response.data.OTP,
              }
            }
            // console.log('sendData in result==>>>', sendData)
            
            axios.post('/api/masternotifications/post/sendNotification', sendData)
              .then((notificationres) => {})
              .catch((error) => { console.log('notification error: ', error) })


						this.props.history.push("/confirm-otp/" + response.data.ID);
					}else{
						swal(response.data.message);
					}	
				})
				.catch((error) => {
					
				})
		}

	}
	Closepagealert(event) {
		event.preventDefault();
		$(".toast-error").html('');
		$(".toast-success").html('');
		$(".toast-info").html('');
		$(".toast-warning").html('');
		$(".toast-error").removeClass('toast');
		$(".toast-success").removeClass('toast');
		$(".toast-info").removeClass('toast');
		$(".toast-warning").removeClass('toast');
	}

	checkUserExists(event) {
		if (event.target.value != '') {
			axios.get('/get/checkUserExists/' + event.target.value)
				.then((response) => {

					if (response.data.length > 0) {
						$(".checkUserExistsError").show();
						$('.button3').attr('disabled', 'disabled');
						this.setState({ checkUserExists: 1 })

					} else {
						$(".checkUserExistsError").hide();
						$('.button3').removeAttr('disabled');
						this.setState({ checkUserExists: 0 })
					}
				})
				.catch(function (error) {
				})
		} else {
			$(".checkUserExistsError").hide();
		}
	}

	handleChange(event) {
		// var dropDown = this.refs.dropDown.value;
		// console.log("dropDown",dropDown);
		this.setState({
			[event.target.name]: event.target.value
		});
		
	}
	handleChange1(event){
		var comId = event.target.value
		console.log('comId==',comId)
		axios.get('/api/entitymaster/getCompany/'+comId)
		.then((response) => {
			console.log('employerName==',response.data)

			this.setState({
		        	employerID : comId,
		        	employerName : response.data.employerName,
		        	vendor_Id : response.data._id,
		        })
		})
		.catch((error) => {
		})
		
	}
	acceptcondition(event) {
		var conditionaccept = event.target.value;
		if (conditionaccept == "acceptedconditions") {
			$(".acceptinput").removeAttr('disabled');
		} else {
			$(".acceptinput").addAttr('disabled');
		}
	}

	showModal() {
		$(".modalbg").css("display", "block");
	}
	hideModal() {
		$(".modalbg").css("display", "none");
	}
	
	showSignPass() {
		$('.showPwd').toggleClass('showPwd1');
		$('.hidePwd').toggleClass('hidePwd1');
		return $('.inputTextPass').attr('type', 'text');
	}
	hideSignPass() {
		$('.showPwd').toggleClass('showPwd1');
		$('.hidePwd').toggleClass('hidePwd1');
		return $('.inputTextPass').attr('type', 'password');
	}
	proceed() {

	}
  ShowLogin(event){
      event.preventDefault();
      var {mapAction} = this.props;

      mapAction.setSelectedModal("login");
  }
	render() {
		return (
			<section className="container-fluid registrationFormWrapper">
                <div className="registrationForm col-lg-8 col-lg-offset-2">
                  <form>

                    <div className="signUpTitle col-lg-12">Sign Up
                    </div>

                    <div className="row">
                      <hr className="registrationHr"/>
                    </div>
                   
                    {/*<div className="form-group col-lg-12">
                        <div className="input-group">
                        <span className="input-group-addon registrationInputIcon1"><i className="fa fa-envelope"></i></span>
                        <select className="form-control col-lg-12 registrationInputBox registrationCompany" id="currentCompany" name="currentCompany" value={this.state.currentCompany} onChange={this.handleChange1.bind(this)}>
                        <option className="registrationInputBox">Enter your Company </option>
                            {
                        this.state.employerArray.length ? 
                        this.state.employerArray.map((elem,index)=>{
                          return(<option value={elem._id}>{elem.companyName}</option>)
                        }):
                         null
                      }
                         </select>                      
                        </div>
                    </div>*/}

                    <div className="row">
                    <div className="col-lg-6 form-group" >
                        <div className="input-group">
                            <span className="input-group-addon registrationInputIcon"><i className="fa fa-user"></i></span>
                            <input type="text" id="firstName" name="firstName" placeholder="First Name" value={this.state.firstName} onChange={this.handleChange.bind(this)} className="form-control registrationInputBox"/>
                        </div>
                         <span id="firstNameError" className="errorMsg"></span>
                    </div>

                    <div className="col-lg-6 form-group" >
                        <div className="input-group">
                            <span className="input-group-addon registrationInputIcon"><i className="fa fa-user"></i></span>
                            <input type="text" id="lastName" name="lastName" placeholder="Last Name" value={this.state.lastName} onChange={this.handleChange.bind(this)} className="form-control registrationInputBox"/>
                        </div>
                         <span id="lastNameError" className="errorMsg"></span>
                    </div>
                    </div>

                   <div className="row">
                    <div className="col-lg-6 form-group" >
                        <div className="input-group">
                            <span className="input-group-addon registrationInputIcon1"><i className="fa fa-envelope"></i></span>
                            <input type="email" id="emailAddress" name="emailAddress" placeholder="Email Address" value={this.state.emailAddress} onChange={this.handleChange.bind(this)} className="form-control registrationInputBox"/>
                        </div>
                         <span id="emailAddressError" className="errorMsg"></span>
                    </div>

                    <div className="col-lg-6 form-group" >
                       
                         <PhoneInput
                                  country={'in'}
                                  value={this.state.mobileNumber}
                                  name="companyPhone"
                                  inputProps={{
                                    name: 'mobileNumber',
                                    required: true
                                  }}
                                  onChange={this.changeMobile.bind(this)}
                                />
                         
                        
                    </div>
                    </div>  

                    <div className="row">
                     <div className="col-lg-6 form-group" >
                        <div className="input-group">
                            <span className="input-group-addon registrationInputIcon"><i className="fa fa-lock"></i></span>
                            <input type="password" id="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange.bind(this)} className="form-control registrationInputBox"/>
                            <span className="input-group-addon loginInputIcon3" onClick={this.showPassword1.bind(this)}>
                              <i className={this.state.showPassword1 ? "fa fa-eye-slash" : "fa fa-eye"} 
                                  value={this.state.showPassword1}></i></span>
                        </div>
                         <span id="passwordError" className="errorMsg"></span>
                    </div>

                    <div className="col-lg-6 form-group" >
                        <div className="input-group">
                            <span className="input-group-addon registrationInputIcon"><i className="fa fa-lock"></i></span>
                            <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.handleChange.bind(this)} className="form-control registrationInputBox"/>
                            <span className="input-group-addon loginInputIcon3" onClick={this.showPassword2.bind(this)}>
                               <i className={this.state.showPassword2 ? "fa fa-eye-slash" : "fa fa-eye"} 
                                value={this.state.showPassword2}></i></span>
                        </div>
                         <span id="confirmPasswordError" className="errorMsg"></span>
                    </div>
                    </div>


                    <div className="col-lg-6 col-lg-offset-3 buttonWrapper">
                   <button className="btn col-lg-12 buttonSignUp" onClick={this.usersignup.bind(this)}>Sign Up</button>
                  </div>

                  <div className="col-lg-12 registrationLinks" >
                    <a className="alreadyAccount" href="#" onClick={this.ShowLogin.bind(this)}><u>Already have an Account?Sign In</u></a>
                  </div>

                </form>
              </div>
         </section>
		);
	}
}
const mapStateToProps = (state)=>{
    return {
        selectedModal  : state.selectedModal
    }
}
const mapDispatchToProps = (dispatch) => ({
  mapAction :  bindActionCreators(mapActionCreator, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps) (SignUp);
