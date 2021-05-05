import React, { Component } from 'react';
import swal from 'sweetalert';
import $ from "jquery";
import jQuery from 'jquery';
import axios from 'axios';
import './ConfirmOtp.css';

class ConfirmOtp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMessage: false
    }
  }
  componentDidMount() {
    
    //==================================
    // var user_id = this.props.match.params.userID;
    // console.log('user_id==',user_id)  

    // axios.get('/api/users/get/'+user_id)
    // .then((response) => {
    //   console.log('userInfo==',response.data)

    //   this.setState({
    //           'firstName'       : response.data.firstname,
    //           'lastName'        : response.data.lastname,
    //           'mobile'          : response.data.mobile,
    //           'emailId'         : response.data.email,
    //           "user_id"         : user_id,
    //           "createdBy"       : user_id
    //          })
    // })
    // .catch((error) => {
    // })

  }

 movetoNext(current, nextFieldID) {
if (current.value.length >= current.maxLength) {
document.getElementById(nextFieldID).focus();
}
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
  validateForm=()=>{
    var status = true;
    if(this.refs.emailotp1.value.length<=0 && this.refs.emailotp2.value.length<=0 && this.refs.emailotp3.value.length<=0 && this.refs.emailotp4.value.length<=0){
      document.getElementById("otpError").innerHTML=  
      "Please enter OTP";  
      status=false; 
    }
    else{
      document.getElementById("otpError").innerHTML=  
      ""; 
      status = true;
    }
    return status;
  }
  confirmOTP(event) {
    event.preventDefault();
    var url = this.props.match.params;
    var formValues = {
      "user_ID": this.props.match.params.userID,
      "emailOTP": this.refs.emailotp1.value + this.refs.emailotp2.value + this.refs.emailotp3.value + this.refs.emailotp4.value,
      "status": "Active"
    }
    //========person master===============
    console.log(formValues)
      var candidatemaster   = {
        'firstName'       : this.state.firstName,
        'lastName'        : this.state.lastName,
        'mobile'          : this.state.mobile,
        'emailId'         : this.state.emailId,
        "user_id"         : this.state.user_id,
        "createdBy"       : this.state.createdBy
      }
    
      //====================================
      var status =  this.validateForm();
      if (status) {
      var url = localStorage.getItem('previousUrl');
      var userStatus =  url == 'signup' ? 'blocked' : 'active';
      var checkData = { "user_id": this.props.match.params.userID, 
                        "emailotp"  : this.refs.emailotp1.value + this.refs.emailotp2.value + this.refs.emailotp3.value + this.refs.emailotp4.value, 
                        "status" : userStatus }
      axios.post('/api/auth/checkemailotp/usingID',checkData) 
      .then((response) => {


          if (response.data.message == 'SUCCESS') { 
            swal('OTP Verified Successfully.');
            
            
            if (url == 'forgotpassword') {
              localStorage.removeItem("previousUrl");
              this.props.history.push('/reset-pwd/' + this.props.match.params.userID);
            } else {
              localStorage.removeItem("previousUrl");
              this.props.history.push('/login');
              //================================

                /*axios.post('/api/candidatemaster/post', candidatemaster)
                .then((response) => {

                  console.log('in result Res data==>>>', response.data);
                  this.props.history.push('/login');
                })
                .catch((error) => {})*/
              
            //================================
            }
          } else {
            swal('Please enter valid OTP.');
          }
        })
        .catch((error) => {
          swal(error.response.data.message);
        })
      }

  }
  inputEffect(event) {
    event.preventDefault();
    if ($(event.target).val() != "") {
      $(event.target).addClass("has-content");
    } else {
      $(event.target).removeClass("has-content");
    }
  }
  resendOtp(event) {
     event.preventDefault();
     console.log(".....................................");
    const userid = this.props.match.params.userID;
    var formValues = { userid : userid }
    var {mapAction} = this.props;
    console.log(formValues);
    axios.patch('/api/auth/patch/setotpusingID', formValues)
      .then((response) => {
      var sendData = {
        "event"      : "Event3", //Event Name
        "toUser_id"  :  response.data.ID, //To user_id(ref:users)
        "toUserRole" : "employer",
        "variables"  : {
          "UserName" : response.data.firstName,
          "OTP"      : response.data.OTP,
        }
      }
      axios.post('/api/masternotifications/post/sendNotification', sendData)
      .then((notificationres) => {})
      .catch((error) => { console.log('notification error: ', error) })

        swal("We send you a Verification Code to your registered email. Please verify your account.");
       /* mapAction.setUserID(response.data.ID);*/
        //mapAction.setSelectedModal("login");
      })
      .catch((error) => {
        swal(" Failed to sent OTP");
      })
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

    var resendOtpWrap = "resendOtpWrap resendOtpWrapcss";
    var mobileEmail = 'Mobile Number';
    var resendOtp = "";

    return (
            <form className="signUpBoxFormWrapper">
                <div className="signUpBoxTitle col-lg-10 col-lg-offset-1">Please enter OTP sent you on your Phone or Email</div>
                

                  

                   
                    <div className="signUpBoxForm signUpBoxOtpForm col-lg-6 col-lg-offset-3">

                        <div className="otpBox  form-group" >
                            <div className="input-group ">
                               
                                <input type="text" id="otp1" maxlength="1" onkeyup="movetoNext(this, 'otp2')" name="otp" ref="emailotp1" placeholder="_" value={this.state.OTP} onChange={this.handleChange.bind(this)} className="form-control roundCorner confirmOTPInputBox"/>
                            </div>
                           
                        </div>


                        <div className="otpBox form-group" >
                            <div className="input-group ">
                               
                                <input type="text" id="otp2" onkeyup="movetoNext(this, 'otp3')"  maxlength="1" name="otp" ref="emailotp2" placeholder="_" value={this.state.OTP} onChange={this.handleChange.bind(this)} className="form-control roundCorner confirmOTPInputBox"/>
                            </div>
                           
                        </div>
                        <div className="otpBox form-group" >
                            <div className="input-group ">
                               
                                <input type="text" id="otp3" onkeyup="movetoNext(this, 'otp4')" maxlength="1" name="otp" ref="emailotp3" placeholder="_" value={this.state.OTP} onChange={this.handleChange.bind(this)} className="form-control roundCorner confirmOTPInputBox"/>
                            </div>
                           
                        </div>

                        <div className="otpBox form-group" >
                            <div className="input-group ">
                               
                                <input type="text" id="otp4" maxlength="1" name="otp" ref="emailotp4" placeholder="_" value={this.state.OTP} onChange={this.handleChange.bind(this)} className="form-control roundCorner confirmOTPInputBox"/>
                            </div>
                           
                        </div>
                      <span id="otpError" className="errorMsg"></span>
                     </div>  

                  
                    
                     
                    <div className="col-lg-8 col-lg-offset-2 buttonOtpWrapper">
                       <button className="buttonNext col-lg-5 pull-left" onClick={this.resendOtp.bind(this)}>Resend OTP</button>
                       <button className="buttonNext col-lg-5 pull-right" onClick={this.confirmOTP.bind(this)}>Confirm OTP</button>
                    </div>
                  </form> 


      
    );
  }
}
export default ConfirmOtp;