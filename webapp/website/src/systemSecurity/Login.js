import React, { Component } from 'react';
import { connect }        from 'react-redux';
import { BrowserRouter, Route, Switch,Link,location } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginForm.css';
import $ from 'jquery';
import axios from 'axios';
import jQuery from 'jquery';
import 'jquery-validation';
import swal from 'sweetalert';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../common/actions/index';

class Login extends Component {

  constructor() {
    super();
    this.state = {
      showPassword: false,
      btnLoading: false,
      loggedIn: false,
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
    // var tempEmail = this.state.email.trim(); // value of field with whitespace trimmed off
    //   var emailFilter = /^[^@]+@[^@.]+\.[^@]*\w\w$/;
       var illegalChars = /[\(\)\<\>\,\;\:\\\"\[\]]/;
       var phoneno = /^\d{10}$/;

    if(this.state.loginusername.match(phoneno)){
      document.getElementById("loginusernameError").innerHTML=  
      ""; 
      status = true;
      
    }else{
      document.getElementById("loginusernameError").innerHTML=  
      "Please enter valid email id";  
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
    alert();
    var passwordToggle = document.getElementById("password");
    if (passwordToggle.type === "password") {
        passwordToggle.type = "text";
        this.setState({showPassword:true});
      } else {
        passwordToggle.type = "password";
        this.setState({showPassword:false});
      }
  }
  userlogin(event) {
      event.preventDefault();
      var auth = {
        email: this.refs.loginusername.value,
        password: this.refs.loginpassword.value,
        role: "candidate"
      }
      var status =  this.validateForm();
      if (status) {
      
        this.setState({ btnLoading: true });
        axios.post('/api/auth/post/login', auth)
          .then((response) => {
            console.log("response login",response);
            if (response.data.ID) {
              this.setState({ btnLoading: false });
              var userDetails = {
                firstName: response.data.userDetails.firstname,
                lastName: response.data.userDetails.lastname,
                email: response.data.userDetails.email,
                phone: response.data.userDetails.phone,
                companyID : parseInt(response.data.userDetails.companyID),
                pincode: response.data.userDetails.pincode,
                user_id: response.data.userDetails.user_id,
                roles: response.data.userDetails.roles,
                token: response.data.userDetails.token,
              }

              axios.get('/api/candidatemaster/get/candidateID/'+response.data.userDetails.user_id)
              .then((candidate) => {
              
              localStorage.setItem("candidateID", candidate.data[0] ? candidate.data[0]._id : null);
              localStorage.setItem("token", response.data.token);
              localStorage.setItem("user_ID", response.data.ID);
              localStorage.setItem("roles", response.data.roles);
              //localStorage.setItem("companyID", response.data.userDetails.companyID);
              localStorage.setItem('userDetails', JSON.stringify(userDetails));
              
              this.setState({
                loggedIn: true
              }, () => {
                window.location.href = '/';
              })
              })
              .catch((error) => {
                console.log("error", error);
              });

            } else if (response.data.message === "USER_BLOCK") {
              swal({
                text: "You are blocked by admin. Please contact Admin."
              });
              
            } else if (response.data.message === "NOT_REGISTER") {
              swal({
                text: "This Email ID is not registered. Please try again."
              });
             
            } else if (response.data.message === "INVALID_PASSWORD") {
              swal({
                text: "You have entered wrong password. Please try again."
              });
              
            } else if (response.data.message === "USER_UNVERIFIED") {
              swal({
                text: "You have not verified your account. Please verify your account."
              })
                .then((value) => {
                  var emailText = {
                    "emailSubject": "Email Verification",
                    "emailContent": "As part of our registration process, we screen every new profile to ensure its credibility by validating email provided by user. While screening the profile, we verify that details put in by user are correct and genuine.",
                  }
                  axios.patch('/api/auth/patch/setsendemailotpusingEmail/' + this.refs.loginusername.value, emailText)
                    .then((response) => {
                      swal("We send you a Verification Code to your registered email. Please verify your account.");
                      this.props.history.push("/confirm-otp/" + response.data.userID);
                    })
                    .catch((error) => {
                      swal(" Failed to sent OTP");
                    })
                });
            }
          })
          .catch((error) => {
            console.log("error", error);
            swal({
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

          <div className="loginFormInner col-lg-6 col-lg-offset-3">
            <form>

              <div className="signInTitle col-lg-12">Sign In
              </div>
              
              <div className="loginSocialMedia">
                <div className="loginSocialMediaInner">
                  <div className="loginLinkedIn"><i className="fa fa-linkedin"></i></div>
                  <div className="loginGoogle"><i className="fa fa-google"></i></div>
                </div>    
              </div>
              

              <div className="loginOr col-lg-12">
                <hr className="loginHr"/>
                <div className="loginOrText">or
                </div>
                <hr className="loginHr"/>
              </div>
              

                  <div className="col-lg-12 form-group loginFormGroup" >
                    <div className="input-group">
                      <span className="input-group-addon loginInputIcon1"><i className="fa fa-mobile"></i></span>
                      <input type="tel" id="loginusername" name="loginusername" placeholder="Email Id" value={this.state.loginusername} ref="loginusername" onChange={this.handleChange.bind(this)} className="form-control loginInputBox"/>
                    </div>
                    <span id="loginusernameError" className="errorMsg"></span>
                  </div>

                  <div className="col-lg-12 form-group" >
                    <div className="input-group">
                      <span className="input-group-addon loginInputIcon2"><i className="fa fa-lock"></i></span>
                      <input type="password" id="password" name="password" placeholder="Password" value={this.state.password} ref="loginpassword" onChange={this.handleChange.bind(this)} className="form-control loginInputBox"/>
                      <span className="input-group-addon loginInputIcon3" onClick={this.showPassFun.bind(this)}>
                      <i className={this.state.showPassword ? "fa fa-eye-slash" : "fa fa-eye"} 
                          value={this.state.showPassword}></i></span>
                    </div>
                    <span id="passwordError" className="errorMsg"></span>
                  </div>

                  <div className="col-lg-12 buttonWrapper">
                   <button className="btn col-lg-12 buttonSignIn" onClick={this.userlogin.bind(this)}>Sign In</button>
                  </div>

                  <div className="col-lg-12 loginLinks">
                    <div className="row">
                      <div className="col-lg-6">
                        <a href="#" className="loginSignUp" onClick={this.ShowSignUp.bind(this)}><u>Sign Up?</u></a>
                      </div>
                    
                      <div className="col-lg-6">
                       <a href="#" className="loginForgotPassword" onClick={this.ShowForgotPass.bind(this)}><u>Forgot Password?</u></a>
                      </div>
                    </div>  
                  </div>
            </form>
          </div>
      </div>
      
    );
  }
}

const mapStateToProps = (state)=>{
    return {
        selectedModal  : state.selectedModal
    }
}
const mapDispachToProps = (dispatch) => ({
  mapAction :  bindActionCreators(mapActionCreator, dispatch)
}) 


export default connect(mapStateToProps, mapDispachToProps)(Login);

