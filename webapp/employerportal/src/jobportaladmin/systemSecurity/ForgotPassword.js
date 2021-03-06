import React, { Component } from 'react';
import $ from 'jquery';
import jQuery from 'jquery';
import 'jquery-validation';
import axios from 'axios';
import Swal from 'sweetalert2';
import './ForgotPassword.css';
import { connect }        from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../common/actions/index';
import PhoneInput from 'react-phone-input-2';


class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
          mobileNumber:"",
            bannerData: {
                title: "MY SHOPPING CART",
                breadcrumb: 'My Shopping Cart',
                backgroungImage: '/images/cartBanner.png',
            },
        }
    }
    componentDidMount(){
      
    }

    validateForm=()=>{
       var status = true;
      // var tempEmail = this.state.loginusername.trim(); // value of field with whitespace trimmed off
     /*  var emailFilter = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
       var tempEmail = this.state.emailAddress; 

       var illegalChars = /[\(\)\<\>\,\;\:\\\"\[\]]/;*/
       var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{5})[-. ]?([0-9]{5})$/;
       var mobile =this.state.mobileNumber;
        console.log("mobile",mobile);
   /*  if(tempEmail <= 0){
      document.getElementById("emailAddressError").innerHTML=  
      "Please enter your Email";  
      status=false; 

        }
       if (
          !emailFilter.test(tempEmail)) { //test email for illegal characters
              document.getElementById('emailAddressError').innerHTML = "Please enter a valid email address.";
            status=false;
          } else{
          document.getElementById("emailAddressError").innerHTML=
          ""; 
          status = true;
        }*/

     if(mobile.match(phoneno)){
      console.log("mobile",this.state.mobileNumber);
       document.getElementById("mobileNumberError").innerHTML=
      ""; 
      status = true;
      
    }else{
      document.getElementById("mobileNumberError").innerHTML=  
      "Please enter valid Mobile Number";  
      status=false; 
    }

        return status;
    } 

    ShowLogin(event){
    event.preventDefault();
    var {mapAction} = this.props;

    mapAction.setSelectedModal("login");
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
    sendLink(event) {
        event.preventDefault();
        var status =  this.validateForm();
        console.log("validateForm status",status);
        if(status){
        
        var mobileNo = this.state.mobileNumber;
        var formValues = {
            mobileNo : mobileNo.replace("-", ""),
          //"emailSubject"  : "Email Verification", 
          //"emailContent"  : "As part of our registration process, we screen every new profile to ensure its credibility by validating email provided by user. While screening the profile, we verify that details put in by user are correct and genuine.",
        }
            
            $('.fullpageloader').show(); 
            axios.patch('/api/auth/patch/setsendmobileotpusingMobile', formValues)
            .then((response)=>{
              
                console.log('forgotpassword res===',response.data)
                if (response.data.message == "OTP_UPDATED") {
                    var sendData = {
                      "event"       : "Event3", //Event Name
                      "toUser_id"   : response.data.ID, //To user_id(ref:users)
                      "toUserRole"  : "employer",
                      "variables"   : {
                        "UserName"  : response.data.firstName,
                        "OTP"       : response.data.OTP,
                      }
                    }
                    /*axios.post('/api/masternotifications/post/sendNotification', sendData)
                    .then((notificationres) => {})
                    .catch((error) => { console.log('notification error: ', error) })
                    */
                    localStorage.setItem('previousUrl' ,'forgotpassword');
                    $('.fullpageloader').hide();

                    Swal.fire('', "OTP send to your registered Phone Number", '');
                    this.props.history.push('/confirm-otp-fp/'+response.data.userID);
                   // var {mapAction} = this.props;
                    //console.log(response.data.userID)
                  /*  mapAction.setUserID(response.data.userID);
                    mapAction.setSelectedModal("confirmotp");
                    localStorage.removeItem("previousUrl");
              this.props.history.push('/reset-pwd/' + this.props.match.params.userID);*/

                } else if(response.data.message == "USER_BLOCK"){
                    console.log("In USER_BLOCK")

                    Swal.fire({
                      title       : ' ',
                      html        : 'Your account is inactive<br />Please contact Admin',
                      text        : '',
                    });

                    this.props.history.push('/login');
                   /* var {mapAction} = this.props;
                    mapAction.setSelectedModal("login");*/
                  }else if(response.data.message == "USER_UNVERIFIED"){
                    console.log("In USER_UNVERIFIED")

                    Swal.fire({
                      title       : ' ',
                      html        : 'You have not verified your account<br />Please verify your account',
                      text        : '',
                    });

                    this.props.history.push('/login');
                    /*var {mapAction} = this.props;
                    mapAction.setSelectedModal("login");*/
                  }else if(response.data.message == "NOT_REGISTER"){
                    console.log("In NOT_REGISTER")

                    Swal.fire({
                      title       : ' ',
                      html        : 'This email is not registered<br />Please do signup',
                      text        : '',
                    });

                    this.props.history.push('/login');
                  /*  var {mapAction} = this.props;
                    mapAction.setSelectedModal("login");*/
                  }

            })
            .catch((error)=>{
                //document.getElementById("sendlink").innerHTML = 'Reset Password';
                Swal.fire('', "This Email ID is not registered", '');
                $('.fullpageloader').hide();
            })
        }
    }
    Closepagealert(event){
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

    ShowLogin(event){
        event.preventDefault();
        var {mapAction} = this.props;

        mapAction.setSelectedModal("login");
    }
    render() {
        return (
            <section className="col-lg-12 forgotPasswordWrapper">

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
                <div className="forgotPassword col-lg-4 col-lg-offset-4">
                  <form>
                    <div className="forgotPasswordTitle col-lg-12">Forgot Password ?
                    </div>

                    
                      <div className="col-lg-10 col-lg-offset-1 form-group" >
                    
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
                           
                          <span id="mobileNumberError" className="errorMsg"></span>
                      </div>
                  
                    {/*  <div className="col-lg-10 col-lg-offset-1 orLine">

                          <hr className="forgotPasswordHr"/>
                          <div className="orCircle"> Or </div>
                          <hr className="forgotPasswordHr"/>
                      </div>*/}
                  {/* <div className="forgotPasswordSentence col-lg-10 col-lg-offset-1">
                        Please enter your registered email address below to receive OTP
                    </div>
*/}
                   {/* <div className="col-lg-10 col-lg-offset-1 form-group" >
                        <div className="input-group">
                            <span className="input-group-addon forgotPasswordInputIcon1"><i className="fa fa-envelope"></i></span>
                            <input type="email" id="emailAddress" name="emailAddress" ref="emailAddress" placeholder="Email Address" value={this.state.emailAddress} onChange={this.handleChange.bind(this)} className="form-control forgotPasswordInputBox"/>
                        </div>
                         <span id="emailAddressError" className="errorMsg"></span>
                    </div>
    */}             
                    <div className="col-lg-10 col-lg-offset-1">
                      <div className="row">
                        <div className="col-lg-6 buttonWrapper">
                            <a href="#" onClick={this.ShowLogin.bind(this)}><u className="loginSignUp" > Login ?</u></a>
                        </div>
                     
                        <div className="col-lg-6 buttonWrapper">
                            <button className="btn col-lg-12 buttonSendOTP" onClick={this.sendLink.bind(this)}>Send OTP</button>
                        </div>
                      </div>
                    </div>
                   {/* <div className="col-lg-12 forgotPasswordLinks">
                        <a className="forgotPasswordSignIn" href="#" onClick={this.ShowLogin.bind(this)}><u>Sign In</u></a>
                      </div>*/}
                  </form>
                </div>
         </section>
        )
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

export default connect(mapStateToProps, mapDispatchToProps) (ForgotPassword);