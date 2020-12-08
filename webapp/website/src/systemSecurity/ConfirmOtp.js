import React, { Component } from 'react';
import swal from 'sweetalert';
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
      showMessage: false
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
    var formValues = {
      "user_ID": this.props.userID,
      "emailOTP": parseInt(this.refs.emailotp.value),
      "status": "Active"
    }
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
    
      axios.get('/api/auth/get/activate/usingID/' + this.props.userID + '/' + this.refs.emailotp.value)
        .then((response) => {

          if (response.data.message == 'SUCCESS') {
            swal('OTP Verified Successfully.');
            var url = localStorage.getItem('previousUrl');
            if (url == 'forgotpassword') {
              localStorage.removeItem("previousUrl");
              //this.props.history.push('/reset-pwd/' + this.props.userID);
              var {mapAction} = this.props;
              mapAction.setUserID(this.props.userID);
              mapAction.setSelectedModal("resetpass");
              
            } else {
              localStorage.removeItem("previousUrl");
              
              //================================

                axios.post('/api/candidatemaster/post', candidatemaster)
                .then((response) => {

                  console.log('in result Res data==>>>', response.data);
                  //this.props.history.push('/login');
                  var {mapAction} = this.props;
                  mapAction.setSelectedModal("login");
                })
                .catch((error) => {})
              
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
  inputEffect(event) {
    event.preventDefault();
    if ($(event.target).val() != "") {
      $(event.target).addClass("has-content");
    } else {
      $(event.target).removeClass("has-content");
    }
  }
  resendOtp(event) {
    document.getElementById("resendOtpBtn").innerHTML = 'Please wait...';
    const userid = this.props.userID;
    var formValues = {
      "emailSubject": "Email Verification",
      "emailContent": "As part of our registration process, we screen every new profile to ensure its credibility by validating email provided by user. While screening the profile, we verify that details put in by user are correct and genuine.",
    }
    axios.patch('/api/auth/patch/setsendemailotpusingID/' + userid, formValues)
      .then((response) => {
        document.getElementById("resendOtpBtn").innerHTML = 'Resend OTP';
        swal("OTP send to your registered email ID.");
      })
      .catch((error) => {
        swal(" Failed to resent OTP");
        document.getElementById("resendOtpBtn").innerHTML = 'Resend OTP';
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
      <section className="container-fluid confirmOTPWrapper">
                <div className="confirmOTP col-lg-6 col-lg-offset-3">
                  <form>
                    <div className="confirmOTPTitle col-lg-12">Confirm OTP
                    </div>

                    <hr className="confirmOTPHr"/>

                    <div className="confirmOTPSentence col-lg-12">
                         We have sent you an OTP to your registered email address.
                        Please enter your OTP below

                    </div>

                    <div className="col-lg-12 form-group" >
                        <div className="input-group">
                            <span className="input-group-addon confirmOTPInputIcon1"><i className="fa fa-envelope"></i></span>
                            <input type="text" id="otp" name="otp" ref="emailotp" placeholder="Enter your OTP" value={this.state.OTP} onChange={this.handleChange.bind(this)} className="form-control confirmOTPInputBox"/>
                        </div>
                    </div>


                    <div className="col-lg-12 confirmOTPLinks">
                        Found your Password? &nbsp;
                        <a className="confirmOTPSignIn" href="#"><u>Sign In</u></a>
                    </div>
                    
                    
                     
                    <div className="col-lg-12 buttonWrapper">
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
const mapStateToProps = (state)=>{
    return {
        selectedModal  : state.selectedModal,
        userID         : state.userID
    }
}
const mapDispatchToProps = (dispatch) => ({
  mapAction :  bindActionCreators(mapActionCreator, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps) (ConfirmOtp);