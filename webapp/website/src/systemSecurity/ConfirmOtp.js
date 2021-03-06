import React, { Component } from 'react';
import Swal           from 'sweetalert2';
import $ from "jquery";
import jQuery from 'jquery';
import axios from 'axios';
import './ConfirmOtp.css';
import { connect }        from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter }   from 'react-router-dom';
import  * as mapActionCreator from '../common/actions/index';

class ConfirmOtp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMessage: false,
      //user_id        :"607e7716e5a1da0fa91c6d48",
      user_id        :this.props.userID,
      email          :this.props.userDetails.email
    }
  }
  componentDidMount() {
    
    //==================================
    var user_id = this.props.userID;
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
  
  handleChange(event){
      var fieldValue=event.currentTarget.value;
      // console.log("fieldValue",fieldValue);
       var fieldKey=event.currentTarget.name;
       console.log("fieldKey",fieldKey);
      this.setState({
        [fieldKey]:fieldValue
      });
  }
  confirmOTP(event) {
    event.preventDefault();
    var url = this.props;
    var {mapAction} = this.props;
    
    //========person master===============

      var candidatemaster   = {
        'firstName'       : this.state.firstName,
        'lastName'        : this.state.lastName,
        'mobile'          : this.state.mobile,
        'emailId'         : this.state.emailId,
        "user_id"         : this.state.user_id,
        "createdBy"       : this.state.createdBy
      }
    console.log("candidatemaster",candidatemaster)
    
      //====================================

      var checkData = { "user_id": this.props.userID, 
                        "mobileotp"  : this.refs.emailotp1.value + this.refs.emailotp2.value + this.refs.emailotp3.value + this.refs.emailotp4.value, 
                        "status" : "active" }
      
      console.log(checkData)  
                      
      // checkmobileotp/usingID  
      axios.post('/api/auth/checkmobileotp/usingID',checkData)
        .then((response) => {

          if (response.data.message == 'SUCCESS') {
            Swal.fire('', 'OTP Verified Successfully.', '');
             mapAction.setSelectedModal("login");
             
            if (response.data.passwordreset === true) {
              //this.props.history.push('/reset-pwd/' + this.props.userID);
              mapAction.setUserID(this.props.userID);
              mapAction.setSelectedModal("resetpassword");
              
            } else {
             
              
              //================================

                axios.post('/api/candidatemaster/post', candidatemaster)
                .then((response) => {

                  console.log('in result Res data==>>>', response.data);
                  //this.props.history.push('/login');
                  
                  mapAction.setSelectedModal("login");
                })
                .catch((error) => {})
              
            //================================
            }
          } else {
            Swal.fire('', 'Please enter valid OTP.', '');
          }
        })
        .catch((error) => {
          Swal.fire(error.response.data.message);
        })
    

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
   
    const userid = this.props.userID;
    var formValues = { userid : userid }
    var {mapAction} = this.props;
    console.log(formValues);
    axios.patch('/api/auth/patch/setotpusingID', formValues)
      .then((response) => {
      var sendData = {
        "event"      : "Event3", //Event Name
        "toUser_id"  :  response.data.ID, //To user_id(ref:users)
        "toUserRole" : "candidate",
        "variables"  : {
          "UserName" : response.data.firstName,
          "OTP"      : response.data.OTP,
        }
      }
      axios.post('/api/masternotifications/post/sendNotification', sendData)
      .then((notificationres) => {})
      .catch((error) => { console.log('notification error: ', error) })

        Swal.fire('', "We send you a Verification Code to your registered email. Please verify your account.", '');
        mapAction.setUserID(response.data.ID);
        mapAction.setSelectedModal("confirmotp");
      })
      .catch((error) => {
        Swal.fire('', "Failed to sent OTP", '');
      })  
  }
 /*resendOtp(event){

  console.log("in resend");
  var {mapAction} = this.props;
                   
  mapAction.setSelectedModal("forgotpassword");
}
*/
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
      <section className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 confirmOTPWrapper">
          <div className="img1LoginFP">
              <img src="/images/Sign_In/1.png" alt="img1Login" className="img1oginInnerFP img-fluid"/>
          </div>

           <div className="img2LoginFP">
              <img src="/images/Sign_In/2.png" alt="img2Login" className="img2loginInnerFP img-fluid"/>
          </div>

           <div className="img3LoginFP">
              <img src="/images/Sign_In/3.png" alt="img3Login" className="img3loginInnerFP img-fluid"/>
          </div>

           <div className="img4LoginFP">
              <img src="/images/Sign_In/4.png" alt="img4Login" className="img4loginInnerFP img-fluid"/>
          </div>

           <div className="img5LoginFP">
              <img src="/images/Sign_In/5.png" alt="img5Login" className="img5loginInnerFP img-fluid"/>
          </div>

           <div className="img6LoginFP">
              <img src="/images/Sign_In/6.png" alt="img6Login" className="img6loginInnerFP img-fluid"/>
          </div>
                <div className="confirmOTP col-8 offset-2 col-sm-4 offset-sm-4 col-md-4 offset-md-4 col-lg-4 offset-lg-4 col-xl-4 offset-xl-4">
                  <form>
                    <div className="confirmOTPTitle col-10 offset-1 col-sm-10 offset-sm-1 col-md-10 offset-md-1 col-lg-10 offset-lg-1 col-xl-10 offset-xl-1">Please enter OTP sent you on your Phone
                    </div>

                  {/*  <hr className="confirmOTPHr"/>

                    <div className="confirmOTPSentence col-lg-10 col-lg-offset-1">
                        Please enter OTP sent you on your email

                    </div>*/}

                       <div className="col-10 offset-1 col-sm-10 offset-sm-1 col-md-10 offset-md-1 col-lg-10 offset-lg-1 col-xl-10 offset-xl-1 otpBoxZindex">
                        <div className="otpBox form-group">
                            <div className="input-group">
                                <input type="text" id="otp" maxlength="1" name="otp" ref="emailotp1" placeholder="_" value={this.state.OTP} onChange={this.handleChange.bind(this)} className="form-control roundCorner confirmOTPInputBox"/>
                            </div>
                        </div>
                        <div className="otpBox form-group">
                            <div className="input-group">
                                <input type="text" id="otp" maxlength="1" name="otp" ref="emailotp2" placeholder="_" value={this.state.OTP} onChange={this.handleChange.bind(this)} className="form-control roundCorner confirmOTPInputBox"/>
                            </div>
                        </div>
                        <div className="otpBox form-group">
                            <div className="input-group">
                                <input type="text" id="otp" maxlength="1" name="otp" ref="emailotp3" placeholder="_" value={this.state.OTP} onChange={this.handleChange.bind(this)} className="form-control roundCorner confirmOTPInputBox"/>
                            </div>
                        </div>
                        <div className="otpBox form-group">
                            <div className="input-group">
                                <input type="text" id="otp" maxlength="1" name="otp" ref="emailotp4" placeholder="_" value={this.state.OTP} onChange={this.handleChange.bind(this)} className="form-control roundCorner confirmOTPInputBox"/>
                            </div>
                        </div>
                      <span id="otpError" className="errorMsg"></span>
                     </div>  



                  {/* <div className="col-lg-10 col-lg-offset-1 confirmOTPLinks">
                        Found your Password? &nbsp;
                        <a className="confirmOTPSignIn" href="#"><u>Sign In</u></a>
                    </div>
                    */}
                    
                     
                    <div className="col-10 offset-1 col-sm-10 offset-sm-1 col-md-10 offset-md-1 col-lg-10 offset-lg-1 col-xl-10 offset-xl-1 buttonWrapper">
                      <div className="row">
                        <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <button className="btn col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 buttonConfirmOTP" onClick={this.resendOtp.bind(this)}>Resend OTP</button>
                        </div>

                        <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <button className="btn col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 buttonConfirmOTP" onClick={this.confirmOTP.bind(this)}>Confirm OTP</button>
                        </div>
                      </div>
                            
                    </div>
                  </form> 

                </div>
         </section>

      
    );
  }
}
const mapStateToProps = (state)=>{ 
    return {
        selectedModal  : state.selectedModal,
        userID         : state.userID,
        userDetails    : state.userDetails
    }
}
const mapDispatchToProps = (dispatch) => ({
  mapAction :  bindActionCreators(mapActionCreator, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps) (ConfirmOtp);

