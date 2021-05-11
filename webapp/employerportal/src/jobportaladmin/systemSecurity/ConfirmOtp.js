import React, { Component } from 'react';
import Swal from 'sweetalert2';
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
    var user_id = this.props.match.params.userID;
    console.log('user_id==',user_id)  

    axios.get('/api/users/get/'+user_id)
    .then((response) => {
      console.log('userInfo==',response.data)

      this.setState({
              'firstName'       : response.data.firstname,
              'lastName'        : response.data.lastname,
              'mobile'          : response.data.mobile,
              'emailId'         : response.data.email,
              "user_id"         : user_id,
              "createdBy"       : user_id
             })
    })
    .catch((error) => {
    })

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
            Swal.fire('', "OTP Verified Successfully", '');
            
            
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
            Swal.fire('', "Please enter valid OTP", '');
          }
        })
        .catch((error) => {
          Swal.fire(error.response.data.message);
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

        Swal.fire('', "We send you a Verification Code to your registered email. Please verify your account", '');
       /* mapAction.setUserID(response.data.ID);*/
        //mapAction.setSelectedModal("login");
      })
      .catch((error) => {
        Swal.fire('', "Failed to sent OTP", '');
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
      <section className="col-lg-12 confirmOTPWrapper">

              <div className="img1LoginFP">
                  <img src="/images/Sign_In/1.png" alt="img1Login" className="img1oginInnerFP"/>
              </div>

               <div className="img2LoginFP">
                  <img src="/images/Sign_In/2.png" alt="img2Login" className="img2loginInnerFP"/>
              </div>

               <div className="img3LoginFP">
                  <img src="/images/Sign_In/3.png" alt="img3Login" className="img3loginInnerFP"/>
              </div>

               <div className="img4LoginFP">
                  <img src="/images/Sign_In/4.png" alt="img4Login" className="img4loginInnerFP"/>
              </div>

               <div className="img5LoginFP">
                  <img src="/images/Sign_In/5.png" alt="img5Login" className="img5loginInnerFP"/>
              </div>

               <div className="img6LoginFP">
                  <img src="/images/Sign_In/6.png" alt="img6Login" className="img6loginInnerFP"/>
              </div>
              
                <div className="confirmOTP col-lg-4 col-lg-offset-4">
                  <form>
                    <div className="confirmOTPTitle col-lg-12">Please enter OTP sent you on your Phone or Email
                    </div>

                  

                   
                    <div className="col-lg-8 col-lg-offset-2">

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

                  
                    
                     
                    <div className="col-lg-10 col-lg-offset-1 buttonWrapper">
                      <div className="row">
                        <div className="col-lg-6">
                            <button className="btn col-lg-12 buttonConfirmOTP" onClick={this.resendOtp.bind(this)}>Resend OTP</button>
                        </div>

                        <div className="col-lg-6">
                            <button className="btn col-lg-12 buttonConfirmOTP" onClick={this.confirmOTP.bind(this)}>Confirm OTP</button>
                        </div>
                      </div>
                            
                    </div>
                  </form> 

                </div>
         </section>

      
    );
  }
}
export default ConfirmOtp;