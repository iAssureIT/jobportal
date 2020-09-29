import React, { Component } from 'react';
import { connect }        from 'react-redux';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUp.css';
import $ from 'jquery';
import axios from 'axios';
import jQuery from 'jquery';
import 'jquery-validation';
import swal from 'sweetalert';
import { BrowserRouter, Route, Link } from "react-router-dom";

class Login extends Component {

  constructor() {
    super();
    this.state = {
      loggedIn: false,
      btnLoading: false,
      auth: {
        email: '',
        pwd: '',
      },
      messageData: {
        "type": "",
      }
    }
  }
  componentDidMount() {

    $.validator.addMethod("regxemail", function (value, element, regexpr) {
      return regexpr.test(value);
    }, "Please enter a valid email address.");

    jQuery.validator.setDefaults({
      debug: true,
      success: "valid"
    });
    $("#login").validate({
      rules: {
        loginusername: {
          required: true,
          regxemail : /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
        },
        loginpassword: {
          required: true
        }
      },
      errorPlacement: function (error, element) {
        if (element.attr("name") == "loginusername") {
          error.insertAfter("#loginusername");
        }
        if (element.attr("name") == "loginpassword") {
          error.insertAfter("#loginpassword1");
        }
      }
    });
  }
  // userlogin(event) {
  //   event.preventDefault();
  //   var auth = {
  //     email: this.refs.loginusername.value,
  //     password: this.refs.loginpassword.value,
  //     role: "vendoradmin"
  //   }
  //   if ($("#login").valid()) {
  //     document.getElementById("logInBtn").value = 'Please Wait...';
  //     console.log("auth:==>",auth);
  //     axios.post('/api/auth/post/login', auth)
  //     // axios.post('/api/auth/post/loginwithcompanyid', auth)
  //     .then((response) => {
  //       console.log(response.data)  
  //         if (response.data.ID) {
  //           var  userDetails = {
  //             firstName : response.data.userDetails.firstName, 
  //             lastName  : response.data.userDetails.lastName, 
  //             email     : response.data.userDetails.email, 
  //             phone     : response.data.userDetails.phone, 
  //             city      : response.data.userDetails.city,
  //             companyID : response.data.userDetails.companyID,
  //             locationID: response.data.userDetails.locationID,
  //             user_id   : response.data.userDetails.user_id,
  //             roles     : response.data.userDetails.roles,
  //             token     : response.data.userDetails.token, 
  //             passwordreset: response.data.userDetailspasswordreset,
  //           }
  //           document.getElementById("logInBtn").value = 'Sign In';
  //           localStorage.setItem("token", response.data.token);
  //           localStorage.setItem("user_ID", response.data.ID);
  //           localStorage.setItem("roles", response.data.roles);
  //           localStorage.setItem('userDetails', JSON.stringify(userDetails));
  //           this.setState({
  //             loggedIn: true
  //           })

  //           if(response.data.passwordreset === false  ){
  //             this.props.history.push('/reset-password/'+response.data.ID);
  //           }else{
  //               this.props.history.push('/dashboard')
  //               window.location.reload()
  //           }
  //         }else if(response.data.message == "USER_BLOCK"){
  //           swal({
  //             text : "You are blocked by admin. Please contact Admin."
  //           });
  //         }else if(response.data.message == "NOT_REGISTER"){
  //           swal({
  //             text : "This email is not registered. Please do signup."
  //           });
  //         }else if(response.data.message == "INVALID_PASSWORD"){
  //           swal({
  //             text : "You have entered wrong password. Please try again."
  //           });
  //         }else if(response.data.message == "USER_UNVERIFIED"){
  //           swal({
  //             text : "You have not verified your account. Please verify your account."
  //           })
  //           .then((value)=>{
  //             var emailText = {
  //               "emailSubject"	: "Email Verification", 
  //               "emailContent"  : "As part of our registration process, we screen every new profile to ensure its credibility by validating email provided by user. While screening the profile, we verify that details put in by user are correct and genuine.",
  //             }
  //             axios.patch('/api/auth/patch/setsendemailotpusingEmail/'+this.refs.loginusername.value, emailText)
  //             .then((response)=>{
  //               swal("We send you a Verification Code to your registered email. Please verify your account.");
  //               this.props.history.push("/confirm-otp/" + response.data.userID);
  //             })
  //             .catch((error)=>{
  //               swal(" Failed to sent OTP");
  //             })    
  //           });
  //         }
  //     })
  //     .catch((error) => {
  //       document.getElementById("logInBtn").value = 'Sign In';
  //       if (localStorage !== null) {
  //       }
  //     });
  //   }
  // }
  userlogin(event) {
    event.preventDefault();
    var auth = {
      email: this.refs.loginusername.value,
      password: this.refs.loginpassword.value,
      role: "vendoradmin"
    }
    
    if ($("#login").valid()) {
      document.getElementById("logInBtn").value = 
      this.setState({ btnLoading: true });
      // axios.post('/api/auth/post/login', auth) 
      console.log("Before Post auth:==>",auth);  
      axios.post('/api/auth/post/loginwithcompanyid', auth)
      .then((response) => {
        this.setState({ btnLoading: false });
        console.log("response.data userDetails:==>",response.data);  
         axios.defaults.headers.common['Authorization'] = 'Bearer '+response.data.token;
          if (response.data.ID) {
             var  userDetails = {
              firstName : response.data.userDetails.firstName, 
              lastName  : response.data.userDetails.lastName, 
              email     : response.data.userDetails.email, 
              phone     : response.data.userDetails.phone, 
              city      : response.data.userDetails.city,
              companyID : response.data.userDetails.companyID,
              companyName : response.data.userDetails.companyName,
              locationID: response.data.userDetails.locationID,
              user_id   : response.data.userDetails.user_id,
              roles     : response.data.userDetails.roles,
              passwordreset: response.data.userDetailspasswordreset,
              token     : response.data.userDetails.token, 
              loginTime : response.data.userDetails.loginTime, 
            }
            document.getElementById("logInBtn").value = 'Sign In';
            localStorage.setItem("companyName", response.data.companyName);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user_ID", response.data.ID);
            localStorage.setItem("roles", response.data.roles);
            localStorage.setItem("loginTime", response.data.loginTime);
            localStorage.setItem('userDetails', JSON.stringify(userDetails));
             axios.get("/api/entitymaster/getCompany/"+response.data.userDetails.companyID)
            .then((response) => {
              console.log('company_Id===',response.data)
                localStorage.setItem("company_Id",response.data._id);
            })
            .catch((error) => {
            })
            
            this.setState({
              loggedIn: true
            })
            // console.log("In login data====>>",response.data);
            if(response.data.passwordreset === false  ){
                this.props.history.push('/reset-password/'+response.data.ID);
            }else{
              const roles = localStorage.getItem("roles");
              var company_Id = localStorage.getItem("company_Id");
              var roleArr = [];
              roleArr.push(roles);
              if(roles.indexOf("vendoradmin")>-1)
              {
                axios.get("/api/entitymaster/get/one/"+company_Id)
                .then((response)=>{
                  console.log("response dash",response);
                  this.setState({
                      profileStatus : response.data[0].profileStatus,
                  },()=>{
                     if(this.state.profileStatus== "New"){
                      this.props.history.push("/company-profile")
                      window.location.reload()

                    }else{
                      axios.get("/api/contract/get/one/entity/" + company_Id)
                      .then((response) => {
                        if(response.data.length>0)
                        {
                          console.log("response",response.data);
                          var contractDetails = response.data[0];
                          this.setState({
                              contractDetails: contractDetails
                          },()=>{
                            if(this.state.contractDetails.status !== "Approved"){
                                this.props.history.push("/contract-view")
                                window.location.reload()


                            }else{
                              var user_id = localStorage.getItem("user_ID");
                             axios.get('/api/personmaster/get/details/' + user_id)
                              .then((res) => {
                                console.log("res empProfileStatus",res)
                                if(res.data[0].profileStatus && res.data[0].profileStatus === "New" )
                                {
                                 this.props.history.push("/my-profile")
                                  window.location.reload()

                                }else{
                                this.props.history.push("/dashboard")
                                window.location.reload()
                                }
                                
                              })
                              .catch((err) => {
                              })

                            
                            }
                          })
                        }else{
                           this.props.history.push("/no-contract")
                                window.location.reload()
                        }
                      })
                      .catch((error) => {
                      })
                    }
                  });
                })
                .catch((error)=>{
                })
            }else{
              this.props.history.push("/dashboard")
              window.location.reload()

            }
          }
             
          }else if(response.data.message == "USER_BLOCK"){
            console.log("In USER_BLOCK")
            swal({
              title: "You are blocked by admin. Please contact Admin.",
              text: "You are blocked by admin. Please contact Admin."
            });
          }else if(response.data.message == "NOT_REGISTER"){
            console.log("In NOT_REGISTER")
            swal({
              text : "This email is not registered. Please do signup."
            });
          }else if(response.data.message == "INVALID_PASSWORD"){
            swal({
              text : "You have entered wrong password. Please try again."
            });
          }else if(response.data.message == "USER_UNVERIFIED"){
            swal({
              text : "You have not verified your account. Please verify your account."
            })
            .then((value)=>{
              var emailText = {
                "emailSubject"	: "Email Verification", 
                "emailContent"  : "As part of our registration process, we screen every new profile to ensure its credibility by validating email provided by user. While screening the profile, we verify that details put in by user are correct and genuine.",
              }
              axios.patch('/api/auth/patch/setsendemailotpusingEmail/'+this.refs.loginusername.value, emailText)
              .then((response)=>{
                swal("We send you a Verification Code to your registered email. Please verify your account.");
                this.props.history.push("/confirm-otp/" + response.data.userID);
              })
              .catch((error)=>{
                swal(" Failed to sent OTP");
              })    
            });
          }
      })
      .catch((error) => {
        console.log("error",error);
         if(error.response&&error.response.status===401){
          swal("Invalid Email or Password","Email ID does not exists");
        }else if(error.response&&error.response.status===409){
          swal("Invalid Email or Password","Please Enter a valid password");
        }else{
          swal("Invalid Email or Password","Please try again");
        }
        this.setState({ btnLoading: false });
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
      <div style={{'height': window.innerHeight+'px', 'width': window.innerWidth+'px'}} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 LoginWrapper">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 innloginwrap">
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="col-lg-4 col-lg-offset-7 col-md-4 col-md-offset-7 col-sm-12 col-xs-12 formShadow">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-xs-12">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 innloginwrap">
                <h3>Sign In</h3>
              </div>
              <form id="login" onSubmit={this.userlogin.bind(this)}>
                <div className="form-group textAlignLeft col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding mt25">
                  <label>Email ID</label><label className="astricsign">*</label>
                  <input type="email" className="form-control" onChange={this.handleChange} ref="loginusername" id="loginusername" name="loginusername" placeholder="Email ID" required />
                </div>
                <div className="textAlignLeft col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding mb25">

                  <label>Password</label><label className="astricsign">*</label>
                  <input type="password" className="form-control" ref="loginpassword" name="loginpassword" id="loginpassword" placeholder="Password" required />
                  <div className="showHideSignDiv" id="eye">
                    <i className="fa fa-eye showPwd showEyeupSign" aria-hidden="true" onClick={this.showSignPass.bind(this)}></i>
                    <i className="fa fa-eye-slash hidePwd hideEyeSignup " aria-hidden="true" onClick={this.hideSignPass.bind(this)}></i>
                  </div>
                  <span className="blank" id="loginpassword1" ></span>
                </div>
                {/* <div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-12 col-xs-12 NOpaddingRight">
                  <input id="logInBtn" type="submit" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn loginBtn" value="Sign In" />
                </div> */}
                {
                  this.state.btnLoading
                  ?
                  <div className="col-lg-3 col-lg-offset-4 col-md-10 col-md-offset-1 col-sm-12 col-xs-12 NOpaddingRight ">
                  <div align="center" className="cssload-fond">
                    <div className="cssload-container-general">
                        <div className="cssload-internal"><div className="cssload-ballcolor cssload-ball_1"> </div></div>
                        <div className="cssload-internal"><div className="cssload-ballcolor cssload-ball_2"> </div></div>
                        <div className="cssload-internal"><div className="cssload-ballcolor cssload-ball_3"> </div></div>
                        <div className="cssload-internal"><div className="cssload-ballcolor cssload-ball_4"> </div></div>
                    </div>
                  </div>
                </div>
                  :
                  <div className="col-lg-10 col-lg-offset-1 col-md-6 col-md-offset-3 col-sm-12 col-xs-12 NOpaddingRight">
                  <input id="logInBtn" type="submit" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn loginBtn" value="Sign In" />
                </div>
                }
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt30 mb25">
                  <div className="row">
                    <div className="textAlignLeft col-lg-6 col-md-6 col-sm-12 col-xs-12 mt10">
                      <div className="row loginforgotpass">
                        <a href='/forgotpassword' className="">Forgot Password?</a>
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mt10 textAlignRight">
                      <div className="row loginforgotpass">
                        <a href='/signup' className="">Sign Up</a>
                      </div>
                    </div>

                  </div>
                </div>
                {process.env.REACT_APP_USERID ?
                  <div className="col-lg-12 sampleTable">
                  <div className="table-responsive col-lg-12 col-md-12">
                    <table className="table table-bordered">
                      <thead>
                        <tr style={{"background":"#367EA8","color":"#fff"}}>
                          <th>Email</th>
                          <th>Password</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{process.env.REACT_APP_USERID}</td>
                          <td>{process.env.REACT_APP_PWD}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  </div>
                  :
                  null
                }
              </form>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
export default Login;