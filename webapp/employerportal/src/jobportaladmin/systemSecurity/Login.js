import React, { Component } from 'react';
import { BrowserRouter, Route, Switch,Link,location } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginForm.css';
import $ from 'jquery';
import axios from 'axios';
import jQuery from 'jquery';
import 'jquery-validation';
import Swal from 'sweetalert2';
import { connect }        from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../common/actions/index';

class Login extends Component {

  constructor() {
    super();
    this.state = {
      showPassword: false,
      btnLoading: false,
      loggedIn: false,
      loginusername: "",
      password: "",
      auth: {
        email: '',
        pwd: '',
      },
      messageData: {
        "type": "",
      }
    }
  }

  showPassword=()=>{
    var passwordToggle = document.getElementById("password");
    if (passwordToggle.type === "password") {
        passwordToggle.type = "text";
        this.setState({showPassword:true});
      } else {
        passwordToggle.type = "password";
        this.setState({showPassword:false});
      }
  }


  validateForm=()=>{
    var status = true;
    // var tempEmail = this.state.email.trim(); // value of field with whitespace trimmed off
 var emailFilter = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
       var tempEmail = this.state.loginusername.trim(); 
       var illegalChars = /[\(\)\<\>\,\;\:\\\"\[\]]/;
        var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{5})[-. ]?([0-9]{5})$/;

     if(this.state.loginusername.match(phoneno)){
      document.getElementById("loginusernameError").innerHTML=
      ""; 
      status = true;
    }else{
      document.getElementById("loginusernameError").innerHTML=  
      "Please enter valid phone number";  
      status=false; 
    }
    
    if(this.state.password.length<=0){
      document.getElementById("passwordError").innerHTML=  
      "Please enter Password";  
      status=false; 
    }
    else{
      document.getElementById("passwordError").innerHTML=  
      ""; 
      status = true;
    }

    return status;
  } 
  componentDidMount() {
    
  }
  handleChange(event){
      var fieldValue=event.currentTarget.value;
      // console.log("fieldValue",fieldValue);
       var fieldKey=event.currentTarget.name;
       console.log("fieldKey",fieldKey);
      this.setState({
        [fieldKey]:fieldValue
      });    
  }

  changeMobile(event) {
    this.setState({
      loginusername: event
    },() => {
      console.log(this.state.loginusername)
    })
  }
  userlogin(event) {
      event.preventDefault();
      
      var auth = {
        mobNumber: (this.state.loginusername).replace("-", ""),
        password: this.refs.loginpassword.value,
        role: "employer"
      }
      console.log(auth)
      var status =  this.validateForm();

      if (status) {
      
        this.setState({ btnLoading: true });
        axios.post('/api/auth/post/login/mobile', auth)
          .then((response) => {
            console.log("response login",response);
            if (response.data.message == "Login Auth Successful") { 
              var  userDetails = {
                  loggedIn    : true, 
                  username    : response.data.username,
                  firstName   : response.data.userDetails.firstName, 
                  lastName    : response.data.userDetails.lastName, 
                  email       : response.data.userDetails.email, 
                  phone       : response.data.userDetails.phone, 
                  company_id  : response.data.userDetails.company_id,
                  companyID   : response.data.userDetails.companyID,
                  companyName : response.data.userDetails.companyName, 
                  branch_id   : response.data.userDetails.branch_id,
                  branchCode  : response.data.userDetails.branchCode,
                  city        : response.data.userDetails.city,
                  stateName   : response.data.userDetails.stateName,
                  stateCode   : response.data.userDetails.stateCode,
                  country     : response.data.userDetails.country,
                  countryCode : response.data.userDetails.countryCode,
                  user_id     : response.data.userDetails.user_id,
                  roles       : response.data.userDetails.roles,
                  token       : response.data.userDetails.token 
                }
              if (userDetails.company_id) {
                axios.get('/api/entitymaster/getEntity/'+userDetails.company_id)
                  .then((resp) => {
                    console.log("resp login",resp);
                      if (resp.data === null) {
                        Swal.fire('', "Please contact admin", '');
                      }else{
                        this.setState({ btnLoading: false });
                         
                          userDetails.industry_id   = resp.data.industry_id
                          //loginTime : response.data.userDetails.loginTime, 

                          localStorage.setItem('userDetails', JSON.stringify(userDetails));

                          var {mapAction} = this.props;
                          mapAction.setUserDetails(userDetails);
                          
                          if (userDetails.company_id != "" && userDetails.company_id) {
                            axios.get("/api/packagesubscription/subscription-details/"+response.data.userDetails.company_id)
                            .then((pack)=>{
                                if (pack.data) {
                                  window.location.href='/'
                                }else{
                                  window.location.href='/subscribe-package'
                                }
                            })
                            .catch((error)=>{
                                  console.log('error', error);
                            }) 
                          }else{
                            window.location.href='/'
                          }
                      }
                      
                    })
                  .catch((error) => {});
                }else{
                  localStorage.setItem('userDetails', JSON.stringify(userDetails));

                  var {mapAction} = this.props;
                  mapAction.setUserDetails(userDetails);
                  window.location.href= '/corporate/basic-details'
                }
              
              }

              else if (response.data.message === "USER_BLOCK") {

                Swal.fire({
                  title       : ' ',
                  html        : "Your account is not active<br />Please contact Admin",
                  text        : '',
                });
                
              } else if (response.data.message === "NOT_REGISTER") {
                Swal.fire({
                  title       : ' ',
                  html        : "This mobile number is not registered<br />Please try again",
                  text        : '',
                });
               
              } else if (response.data.message === "INVALID_PASSWORD") {
                Swal.fire({
                  title       : ' ',
                  html        : "You have entered wrong password<br />Please try again",
                  text        : '',
                });
                
              } else if (response.data.message === "USER_UNVERIFIED") {
                Swal.fire({
                  title       : ' ',
                  html        : "You have not verified your account<br />Please verify your account",
                  text        : '',
                })
                  .then((value) => {
                    var formValues = { mobileNo : (this.state.loginusername).replace("-", "") }
                  
                    axios.patch('/api/auth/patch/setsendmobileotpusingMobile', formValues)
                      .then((response) => {
                      /*var sendData = {
                        "event"     : "Event3", //Event Name
                        "toUser_id"  : response.data.ID, //To user_id(ref:users)
                        "toUserRole"  : "candidate",
                        "variables" : {
                          "UserName": response.data.firstName,
                          "OTP"     : response.data.OTP,
                        }
                      }
                      axios.post('/api/masternotifications/post/sendNotification', sendData)
                      .then((notificationres) => {})
                      .catch((error) => { console.log('notification error: ', error) })*/

                        Swal.fire({
                                      title       : ' ',
                                      html        : "We send you a Verification Code to your registered mobile number<br />Please verify your account",
                                      text        : '',
                                  });
                        this.props.history.push("/confirm-otp/" + response.data.ID);
                      })
                      .catch((error) => {
                        Swal.fire('', "Failed to sent OTP", '');
                      })
                  });
              }
            
          })
          .catch((error) => {
            console.log("error", error);
            Swal({
              text: "Please enter valid Email ID and Password"
            })
            this.setState({ btnLoading: false });
            // document.getElementById("logInBtn").value = 'Sign In';
            // if (localStorage !== null) {
            // }
          });

      }
  }
    
  showSignPass() {
    $('.showPwd').toggleClass('showPwd1');
    $('.hidePwd').toggleClass('hidePwd1');
    return $('#loginpassword').attr('type', 'text');
  }
  hideSignPass() {
    $('.showPwd').toggleClass('showPwd1');
    $('.hidePwd').toggleClass('hidePwd1');
    return $('#loginpassword').attr('type', 'password');
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
  render() {
    return (
      <div className="loginFormOuter col-lg-12">
            <div className="img1Login">
                <img src="/images/Sign_In/1.png" alt="img1Login" className="img1oginInner"/>
            </div>

             <div className="img2Login">
                <img src="/images/Sign_In/2.png" alt="img2Login" className="img2loginInner"/>
            </div>

             <div className="img3Login">
                <img src="/images/Sign_In/3.png" alt="img3Login" className="img3loginInner"/>
            </div>

             <div className="img4Login">
                <img src="/images/Sign_In/4.png" alt="img4Login" className="img4loginInner"/>
            </div>

             <div className="img5Login">
                <img src="/images/Sign_In/5.png" alt="img5Login" className="img5loginInner"/>
            </div>

             <div className="img6Login">
                <img src="/images/Sign_In/6.png" alt="img6Login" className="img6loginInner"/>
            </div>

            <div className="loginFormInner col-lg-4 col-lg-offset-4">
              <form>

                <div className="signInTitle col-lg-12">Sign In
                </div>
                
                {/*<div className="loginSocialMedia">
                  <div className="loginSocialMediaInner">
                    <div className="loginLinkedIn"><i className="fa fa-linkedin"></i></div>
                    <div className="loginGoogle"><i className="fa fa-google"></i></div>
                  </div>    
                </div>
                */}

               {/* <div className="loginOr col-lg-12">
                  <hr className="loginHr"/>
                  <div className="loginOrText">or
                  </div>
                  <hr className="loginHr"/>
                </div>*/}
                    
                    <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1">
                        <div className="loginSignUp1" >
                        Don't have an Account ?
                           <a className="loginSignUp" href="/empsignuppage"><u> Sign Up</u></a>
                        </div>
                    </div>

                    <div className="col-lg-10 col-lg-offset-1 form-group loginFormGroup" >
                      {/*<div className="input-group">
                        <span className="input-group-addon loginInputIcon1"><i className="fa fa-mobile"></i></span>
                        <input type="tel" id="loginusername" name="loginusername" placeholder="Email Id" value={this.state.loginusername} ref="loginusername" onChange={this.handleChange.bind(this)} className="form-control loginInputBox"/>
                      </div>*/}
                      <PhoneInput
                        country={'in'}
                        value={this.state.loginusername}
                        name="loginusername"
                        inputProps={{
                          name: 'loginusername',
                          required: true
                        }}
                        onChange={this.changeMobile.bind(this)}
                      />
                      <span id="loginusernameError" className="errorMsg"></span>
                    </div>

                    <div className="col-lg-10 col-lg-offset-1 form-group" >
                      <div className="input-group">
                        <span className="input-group-addon loginInputIcon2"><i className="fa fa-lock"></i></span>
                        <input type="password" id="password" name="password" placeholder="Password" value={this.state.password} ref="loginpassword" onChange={this.handleChange.bind(this)} className="form-control loginInputBox"/>
                        <span className="input-group-addon loginInputIcon3">
                        <i className={this.state.showPassword ? "fa fa-eye-slash" : "fa fa-eye"} 
                         onClick={this.showPassword.bind(this)} value={this.state.showPassword}></i></span>
                      </div>
                      <span id="passwordError" className="errorMsg"></span>
                    </div>

                    <div className="col-lg-10 col-lg-offset-1 buttonWrapper">
                      <div className="col-lg-6">
                       <div className="row">
                          <a className="loginForgotPassword" href="/forgot-password"><u>Forgot Password?</u></a>
                        </div>
                      </div>  
                     <button className="btn col-lg-6 buttonSignIn" onClick={this.userlogin.bind(this)}>Sign In</button>
                    </div>

              </form>
            </div>
          </div>
    );
  }
}

const mapStateToProps = (state)=>{
  return {
    userDetails   : state.userDetails
  }
};

const mapDispatchToProps = (dispatch) => ({
  mapAction :  bindActionCreators(mapActionCreator, dispatch)
}) 
export default connect(mapStateToProps, mapDispatchToProps)(Login);

