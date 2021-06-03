import React, { Component } from 'react';
import { BrowserRouter, Route, Switch,Link,location } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/modal.js';
import './LoginForm.css';
import $ from 'jquery';
import axios from 'axios';
import jQuery from 'jquery'; 
import 'jquery-validation';
import Swal           from 'sweetalert2';
import { connect }        from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../common/actions/index';
window.jQuery = $;
window.$ = $;
global.jQuery = $;

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



  showPassword=(event)=>{
    event.preventDefault();
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
      // var tempEmail = this.state.loginusername.trim(); // value of field with whitespace trimmed off
       var emailFilter = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
       var tempEmail = this.state.loginusername.trim(); 
       var illegalChars = /[\(\)\<\>\,\;\:\\\"\[\]]/;
       var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{5})[-. ]?([0-9]{5})$/;

     /*if(this.state.loginusername.length<=0){
      document.getElementById("loginusernameError").innerHTML=  
      "Please enter your Email";  
      status=false; 
      }else if (
      !emailFilter.test(tempEmail)) { //test email for illegal characters
          document.getElementById('loginusernameError').innerHTML = "Please enter a valid email address.";
      } else{
      document.getElementById("loginusernameError").innerHTML=
      ""; 
      status = true;
    }*/
    if(this.state.loginusername.match(phoneno)){
      
      status = true;
      
    }else{
      document.getElementById("loginusernameError").innerHTML=  
      "Please enter valid Mobile Number";  
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
      var fieldKey=event.currentTarget.name;
      this.setState({
        [fieldKey]:fieldValue
      });    
  }

  showPassFun=(event)=>{
    event.preventDefault();
    var passwordToggle = document.getElementById("password");
    if (passwordToggle.type === "password") {
        passwordToggle.type = "text";
        this.setState({showPassword:true});
      } else {
        passwordToggle.type = "password";
        this.setState({showPassword:false});
      }
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
        role: "candidate"
      }
      console.log(auth)
      var status =  this.validateForm();
      console.log(status)
      var {mapAction} = this.props;
      
      if (status) {
        this.setState({ btnLoading: true });
        axios.post('/api/auth/post/login/mobile', auth)
          .then((response) => {

            console.log("response login",response);
            //console.log("response login username",response.data.username);

            if (response.data.ID) {
              this.setState({ btnLoading: false });
              var userDetails = { 
                loggedIn    : true,
                username: response.data.username,
                firstName: response.data.userDetails.firstName,
                lastName: response.data.userDetails.lastName,
                email: response.data.userDetails.email,
                phone: response.data.userDetails.phone,
                pincode: response.data.userDetails.pincode,
                user_id: response.data.userDetails.user_id,
                roles: response.data.userDetails.roles,
                token: response.data.userDetails.token,
    
              }
              console.log("..........................................",userDetails);

              axios.defaults.headers.common['Authorization'] = 'Bearer '+ response.data.userDetails.token;
              axios.get('/api/candidatemaster/get/candidate_id/'+response.data.userDetails.user_id)
              .then((candidate) => {
              //console.log(candidate)
              userDetails.candidate_id = candidate.data[0] ? candidate.data[0]._id : null;
              userDetails.gender = candidate.data[0] ? candidate.data[0].basicInfo.gender : null;
              userDetails.profilePicture = candidate.data[0] ? candidate.data[0].basicInfo.profilePicture : null;
              userDetails.profileCompletion = candidate.data[0] ? candidate.data[0].profileCompletion : null;

             localStorage.setItem('userDetails', JSON.stringify(userDetails));
               //window.location.href = '/';
                 document.getElementById("closeModalButton").click();
                 document.getElementById("closeAsidebarButton").click();
              
              
             
              mapAction.setUserDetails(userDetails);

              this.setState({
                loggedIn: true
              }, () => {

              })
              })
              .catch((error) => {
                console.log("error", error);
              });

            } else if (response.data.message === "USER_BLOCK") {
              Swal.fire(
                '',
                "Your account is not active, Please contact Admin.",
                ''
              );
              
            } else if (response.data.message === "NOT_REGISTER") {
              Swal.fire(
                '',
                "This mobile number is not registered, Please try again.",
                ''
              );
             
            } else if (response.data.message === "INVALID_PASSWORD") {
              Swal.fire(
                '',
                "You have entered wrong password, Please try again.",
                ''
              );
              
            } else if (response.data.message === "USER_UNVERIFIED") {
              Swal.fire(
                '',
                "You have not verified your account, Please verify your account",
                ''
              )
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
                    .catch((error) => { console.log('notification error: ', error) })
                    */
                      Swal.fire('', "We send you a Verification Code to your registered mobile number. Please verify your account.", '');
                      mapAction.setUserID(response.data.ID);
                      mapAction.setSelectedModal("confirmotp");
                    })
                    .catch((error) => {
                      Swal.fire('', "Failed to sent OTP", '');
                    })
                });
            }
          })
          .catch((error) => {
            console.log("error", error);
            Swal.fire(
              '',
              "Please enter valid Email ID and Password",
              ''
            )
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
  ShowSignUp(event){
    event.preventDefault();
    var {mapAction} = this.props;

    mapAction.setSelectedModal("signup");
  }
  ShowForgotPass(event){
    event.preventDefault();
    var {mapAction} = this.props;

    mapAction.setSelectedModal("forgotpassword");
  }

  ShowResetPass(event){
    event.preventDefault();
    var {mapAction} = this.props;

    mapAction.setSelectedModal("resetpassword");
  }
  
  render() {
    
    return (
        <div className="row">
          <div className="loginFormOuter col-md-12">
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

            <div className="loginFormInner col-md-4 offset-md-4 col-8 offset-2">
              <form autocomplete="off">

                <div className="signInTitle col-lg-12 col-md-12"> Sign In
                </div>
                
               {/* <div className="loginSocialMedia">
                  <div className="loginSocialMediaInner">
                   <div className="loginLinkedIn"><i className="fa fa-linkedin"></i></div>
                    <div className="loginGoogle"><i className="fa fa-google"></i></div>
                  </div>    
                </div>*/}
                

               {/* <div className="loginOr col-lg-12">
                  <hr className="loginHr"/>
                  <div className="loginOrText">or
                  </div>
                  <hr className="loginHr"/>
                </div>*/}
                
                <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1">
                          <div className="loginSignUp1" >
                          Don't have an Account ?
                            <a href="#" onClick={this.ShowSignUp.bind(this)}><u className="loginSignUp" > Sign Up</u></a>
                          </div>
                </div>
                      

                    <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 form-group loginFormGroup" >
                      {/*<div className="input-group" autocomplete="off">
                        <span className="input-group-addon loginInputIcon1"><i className="fa fa-mobile"></i></span>
                        <input type="tel" id="loginusername" name="loginusername" placeholder="Email Id" 
                        value={this.state.loginusername} ref="loginusername"
                         onChange={this.handleChange.bind(this)} className="form-control loginInputBox"/>
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

                    <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 form-group" >
                      <div className="input-group">
                        <span className="input-group-addon loginInputIcon2"><i className="fa fa-lock"></i></span>
                        <input type="password" id="password" name="password" placeholder="Password" value={this.state.password} ref="loginpassword" onChange={this.handleChange.bind(this)} className="form-control loginInputBox"/>
                        <span className="input-group-addon loginInputIcon3" onClick={this.showPassFun.bind(this)}>
                        <i className={this.state.showPassword ? "fa fa-eye-slash" : "fa fa-eye"} 
                            value={this.state.showPassword}></i></span>
                      </div>
                      <span id="passwordError" className="errorMsg"></span>
                    </div>

                    <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 buttonWrapper">
                      <div className="col-lg-6 col-md-6">
                        <div className="row">
                           <a href="#" className="loginForgotPassword" onClick={this.ShowForgotPass.bind(this)}><u>Forgot Password?</u></a>
                        </div>  
                      </div>
                     <button className="btn col-lg-6 col-md-6 buttonSignIn" onClick={this.userlogin.bind(this)}>
                      Sign In
                     </button>
                    </div>

                    <div className="col-lg-12 col-md-12 loginLinks"> 
                      <div className="row">
                        {/*<div className="col-lg-6">
                          <a href="#" className="loginSignUp" onClick={this.ShowSignUp.bind(this)}><u>Sign Up?</u></a>
                        </div>
                   
                        <div className="col-lg-6">
                         <a href="#" className="loginForgotPassword" onClick={this.ShowForgotPass.bind(this)}><u>Forgot Password?</u></a>
                        </div>

                          */}
                      </div>  
                    </div>
              </form>
            </div>
          </div>
        </div>
      
    );
  }
}

const mapStateToProps = (state)=>{
    return {
        selectedModal  : state.selectedModal,
        userDetails    : state.userDetails 
    }
}
const mapDispatchToProps = (dispatch) => ({
  mapAction :  bindActionCreators(mapActionCreator, dispatch)
}) 

export default connect(mapStateToProps, mapDispatchToProps)(Login);