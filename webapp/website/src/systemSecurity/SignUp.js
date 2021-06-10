import React, { Component } from 'react';
import $ from "jquery";
import jQuery from 'jquery';
import 'jquery-validation';
import PhoneInput from 'react-phone-input-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/modal.js';
import 'bootstrap/js/dist/tab.js';
import 'font-awesome/css/font-awesome.min.css';
import './SignUp.css';
import Swal           from 'sweetalert2';
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
      checkTC: false,
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
    console.log(event)
    this.setState({
      mobileNumber: event
    }, () => {
      console.log(this.state.mobileNumber)
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

  setWorkFromHome(event) {
        this.setState({
            checkTC: event.target.checked
        });
         console.log("tc==",this.state.checkTC);
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
    var status = false;
    var regName = /^[a-zA-Z]+$/;
    var first_name=this.state.firstName;
    var last_name=this.state.lastName;
    var tempEmail = this.state.emailAddress.trim(); // value of field with whitespace trimmed off
    var emailFilter = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var illegalChars = /[\(\)\<\>\,\;\:\\\"\[\]]/;
    var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{5})[-. ]?([0-9]{5})$/;
    var statusFN=false;
    var statusLN=false;
    var statusEmail=false;
    var statusPhone=false;
    var statusPwd=false;
    var statusCPwd=false;
    var statusPwd2=false;
    var statusCTC=false;
/*
    if(first_name.length<=0)  {
 
      document.getElementById("firstNameError").innerHTML=  
      "Please enter valid Name!";  
      statusFN=false; 
    }
  
    else*/ if(!regName.test(first_name)){
      document.getElementById("firstNameError").innerHTML=  
      "Please enter valid name,......";  
      statusFN=false; 
      console.log("firstname",this.state.firstName);
    }
    else{
      document.getElementById("firstNameError").innerHTML=  
       ""; 
      statusFN = true;
      
    }

    if(last_name.length<=0)  {
      document.getElementById("lastNameError").innerHTML=  
      "Please enter valid Name";  
      statusLN=false; 
    }
    else if(!regName.test(last_name)){
      document.getElementById("lastNameError").innerHTML=  
      "Please enter valid name.....";  
      statusLN=false; 
    }
    else{
      document.getElementById("lastNameError").innerHTML=  
       ""; 
      statusLN = true;

    }

    if(this.state.emailAddress.length<=0){
      document.getElementById("emailAddressError").innerHTML=  
      "Please enter your Email";  
      statusEmail=false; 
    }else if (
      !emailFilter.test(tempEmail)) { //test email for illegal characters
          document.getElementById('emailAddressError').innerHTML = "Please enter a valid email address.";
      } else{
      document.getElementById("emailAddressError").innerHTML=
      ""; 
      statusEmail = true;
    }

    if(this.state.mobileNumber.match(phoneno)){
      console.log("mobile",this.state.mobile);
       document.getElementById("mobileNumberError").innerHTML=
      ""; 
      statusPhone = true;
      
    }else{
      document.getElementById("mobileNumberError").innerHTML=  
      "Please enter valid Mobile Number";  
      statusPhone=false; 
    }

     if(this.state.password.length <=0) {
   document.getElementById("passwordError").innerHTML=  
      ""; 
  document.getElementById("passwordError").innerHTML=  
      "Please enter Password";  
      statusPwd=false; 
} 
 if (this.state.password.length<8) {
  document.getElementById("passwordError").innerHTML=  
            "Please enter atleast 8 characters";  
            statusPwd=false; 
} else {
   document.getElementById("passwordError").innerHTML=  
      ""; 
      statusPwd = true;
 
}
    if(this.state.confirmPassword.length<=0){
      document.getElementById("confirmPasswordError").innerHTML=  
      ""; 
      document.getElementById("confirmPasswordError").innerHTML=  
      "Please enter Confirm Password";  
      statusCPwd=false; 
    }

     if(this.state.confirmPassword.length<8){
      document.getElementById("confirmPasswordError").innerHTML=  
      "Please enter atleast 8 characters";  
      statusCPwd=false; 
    }
    else{
      document.getElementById("confirmPasswordError").innerHTML=  
      ""; 
      statusCPwd = true;
    }

            if ((this.state.password) == (this.state.confirmPassword) ){

                if (this.state.password.length>0 && this.state.confirmPassword.length>0){
                    if(this.state.password.length>=8 && this.state.confirmPassword.length>=8){
                        console.log("length",this.state.password.length);
                          document.getElementById("passwordError").innerHTML=  
                        "";  
                        document.getElementById("confirmPasswordError").innerHTML=  
                        ""; 

                        statusPwd2=true;
                      }
                    else if(this.state.password.length<8){
                            document.getElementById("passwordError").innerHTML=  
                        "Please enter atleast 8 characters";  
                      }
                    else if(this.state.confirmPassword.length<8){
                            document.getElementById("passwordError").innerHTML=  
                        "Please enter atleast 8 characters";  
                      }
                    else{
                        document.getElementById("passwordError").innerHTML=  
                        "Please enter correct password........";  
                        document.getElementById("confirmPasswordError").innerHTML=  
                        "Please enter correct password......."; 
                        statusPwd2=false; 
                      }
                }
                else{
                document.getElementById("passwordError").innerHTML=  
                "Please enter  password";  
                document.getElementById("confirmPasswordError").innerHTML=  
                "Please enter confirm password"; 
                statusPwd2=false; 
                 }
        }

        else{
            document.getElementById("passwordError").innerHTML=  
            "Please enter correct password";  
            document.getElementById("confirmPasswordError").innerHTML=  
            "Please enter correct password"; 
            statusPwd2=false; 
        }


    if(this.state.checkTC == true){
      statusCTC= true;
    }
    if (this.state.checkTC == false) {
      Swal.fire('', 'Please accept Term and Conditions', '');
      statusCTC =false;
    }
  
    console.log("all......",statusFN,statusLN,statusEmail,statusPhone,statusPwd,statusCPwd,statusPwd2,statusCTC);

    if(statusFN==true && statusLN==true && 
      statusEmail==true && statusPhone ==true && 
      statusPwd==true && statusCPwd==true && 
      statusCTC==true){
     
      status= true;
    }
    else{
      status=false;
    }
    console.log("End.....",status);
    return status;
    
  } 
	usersignup(event) {
		event.preventDefault();
		var status =  this.validateForm();
     console.log("tc==",status);

	    if(status == true){
			var auth = {
				username 		: "MOBILE",
				firstname		: this.state.firstName,
				lastname		: this.state.lastName, 
				mobNumber		: (this.state.mobileNumber).replace("-", ""),
				email			  : this.state.emailAddress,
				pwd				  : this.state.password,
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
						Swal.fire('', 'Information submitted successfully and OTP is sent to your registered Email', '');
						localStorage.setItem('previousUrl' ,'signup');

            var {mapAction} = this.props;
            mapAction.setUserID(response.data.ID);
            mapAction.setSelectedModal("confirmotp"); 

            var sendData = {
              "event"     : "Event1", //Event Name
              "toUser_id"  : response.data.ID, //To user_id(ref:users)
              "toUserRole"  : "candidate",
              "variables" : {
                "UserName": this.state.firstName, 
                "OTP"     : response.data.OTP,
              }
            }
            /*axios.post('/api/masternotifications/post/sendNotification', sendData)
              .then((notificationres) => {})
              .catch((error) => { console.log('notification error: ', error) })
            */
						//this.props.history.push("/confirm-otp/" + response.data.ID);
					}else{
						Swal.fire('',response.data.message,'');
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
			<section className="registrationFormWrapper col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 offset-xl-3">

          <div className="img1LoginSU">
              <img src="/images/Sign_In/1.png" alt="img1Login" className="img1oginInnerSU img-fluid"/>
          </div>

           <div className="img2LoginSU">
              <img src="/images/Sign_In/2.png" alt="img2Login" className="img2loginInnerSU img-fluid"/>
          </div>

           <div className="img3LoginSU">
              <img src="/images/Sign_In/3.png" alt="img3Login" className="img3loginInnerSU img-fluid"/>
          </div>

           <div className="img4LoginSU">
              <img src="/images/Sign_In/4.png" alt="img4Login" className="img4loginInnerSU img-fluid"/>
          </div>

           <div className="img5LoginSU">
              <img src="/images/Sign_In/5.png" alt="img5Login" className="img5loginInnerSU img-fluid"/>
          </div>

           <div className="img6LoginSU">
              <img src="/images/Sign_In/6.png" alt="img6Login" className="img6loginInnerSU img-fluid"/>
          </div>
                <div className="registrationForm col-8 offset-2 col-sm-8 offset-sm-2 col-md-8 offset-md-2 col-lg-8 offset-lg-2 col-xl-8 offset-xl-2">
                  <form>

                    <div className="signUpTitle col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">Sign Up
                    </div>

                     {/*<div className="row">
                      <hr className="registrationHr"/>
                    </div>
                   
                   <div className="form-group col-lg-12">
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

                  <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 row flName">
                    
                      <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 form-group">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text registrationInputIcon"><i className="fa fa-user"></i></span>
                          </div>
                          <input type="text" id="firstName" name="firstName" placeholder="First Name" value={this.state.firstName} onChange={this.handleChange.bind(this)} className="form-control registrationInputBox"/>
                        </div>
                         <span id="firstNameError" className="errorMsg"></span>
                      </div>

                      <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 form-group">
                        <div className="input-group">
                          <div className="input-group-prepend">
                              <span className="input-group-text registrationInputIcon"><i className="fa fa-user"></i></span>
                          </div>    
                          <input type="text" id="lastName" name="lastName" placeholder="Last Name" value={this.state.lastName} onChange={this.handleChange.bind(this)} className="form-control registrationInputBox"/>
                        </div>
                         <span id="lastNameError" className="errorMsg"></span>
                      </div>
                    
                  </div>

                      <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 form-group">
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <span className="input-group-text registrationInputIcon1"><i className="fa fa-envelope"></i></span>
                              </div>  
                              <input type="email" id="emailAddress" name="emailAddress" placeholder="Email Address" value={this.state.emailAddress} onChange={this.handleChange.bind(this)} className="form-control registrationInputBox"/>
                            </div>
                             <span id="emailAddressError" className="errorMsg"></span>
                        </div>
                      </div>

                      <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 form-group">
                      
                             <PhoneInput
                                      country   = {'in'}
                                      //id        ="mobileNumber" 
                                      value={this.state.mobileNumber}
                                      //name="companyPhone"
                                      //onChange  = {mobileNumber => this.setState({ mobileNumber })}
                                      onChange={this.changeMobile.bind(this)}
                                    />
                             
                            <span id="mobileNumberError" className="errorMsg"></span>
                        </div>
                      </div>

                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                         <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 form-group">
                            <div className="input-group zIndex">
                              <div className="input-group-prepend">
                                <span className="input-group-text registrationInputIcon"><i className="fa fa-lock"></i></span>
                              </div>  
                              <input type="password" id="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange.bind(this)} className="form-control registrationInputBox"/>
                              <div className="input-group-prepend">
                                <span className="input-group-text loginInputIcon3" onClick={this.showPassword1.bind(this)}>
                                  <i className={this.state.showPassword1 ? "fa fa-eye-slash" : "fa fa-eye"} 
                                      value={this.state.showPassword1}></i></span>
                              </div>        
                            </div>
                             <span id="passwordError" className="errorMsg"></span>
                        </div>
                    </div>

                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 form-group" >
                            <div className="input-group zIndex">
                              <div className="input-group-prepend">
                                <span className="input-group-text registrationInputIcon"><i className="fa fa-lock"></i></span>
                              </div>  
                                <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.handleChange.bind(this)} className="form-control registrationInputBox"/>
                                <div className="input-group-prepend">
                                  <span className="input-group-text loginInputIcon3" onClick={this.showPassword2.bind(this)}>
                                     <i className={this.state.showPassword2 ? "fa fa-eye-slash" : "fa fa-eye"} 
                                      value={this.state.showPassword2}></i></span>
                                </div>      
                            </div>
                             <span id="confirmPasswordError" className="errorMsg"></span>
                        </div>
                    </div>
                       
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <div className="row">
                        <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                         
                            <label htmlFor="checkTC" className="agreeTC container">
                            
                              <input type="checkbox" name="checkTC" className="checkmark2" id="checkTC" value={this.state.checkTC} onChange={this.setWorkFromHome.bind(this)} />
                            
                               <div className="textTC"> I agree to the <br/>Terms & Conditions</div>
                            </label>
                         
                        </div>

                        <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 buttonWrapper row">
                          
                            <button className="btn col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 buttonSignUp" onClick={this.usersignup.bind(this)}>Sign Up >></button>
                          
                        </div>
                      </div>
                    </div>    

                  <div className="col-10 offset-1 col-sm-10 offset-sm-1 col-md-10 offset-md-1 col-lg-10 offset-lg-1 col-xl-10 offset-xl-1 registrationLinks" >
                    <a className="alreadyAccount col-4 offset-4 col-sm-4 offset-sm-4 col-md-4 offset-md-4 col-lg-4 offset-lg-4 col-xl-4 offset-xl-4" href="#" onClick={this.ShowLogin.bind(this)}><u>Sign In >></u></a>
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
