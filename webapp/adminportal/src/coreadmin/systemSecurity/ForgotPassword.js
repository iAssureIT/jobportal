import React, { Component } from 'react';
import $ from 'jquery';
import jQuery from 'jquery';
import axios from 'axios';
import swal from 'sweetalert';
import './ForgotPassword.css';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bannerData: {
                title: "MY SHOPPING CART",
                breadcrumb: 'My Shopping Cart',
                backgroungImage: '/images/cartBanner.png',
            },
        }
    }
    componentDidMount(){
      
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
        
        var email = this.refs.emailAddress.value;
        var formValues = {
            email : email,
           // "emailSubject"    : "Email Verification", 
           //"emailContent"  : "As part of our registration process, we screen every new profile to ensure its credibility by validating email provided by user. While screening the profile, we verify that details put in by user are correct and genuine.",
        }
             
            $('.fullpageloader').show();
            axios.patch('/api/auth/patch/setotpusingEmail', formValues)
            .then((response)=>{
              
                console.log('forgotpassword res===',response.data)
                if (response.data.ID) {
                    var sendData = {
                      "event"     : "Event3", //Event Name
                      "toUser_id"  : response.data.ID, //To user_id(ref:users)
                      "toUserRole"  : "employer",
                      "variables" : {
                        "UserName": response.data.firstName,
                        "OTP"     : response.data.OTP,
                      }
                    }
                    axios.post('/api/masternotifications/post/sendNotification', sendData)
                .then((notificationres) => {})
                .catch((error) => { console.log('notification error: ', error) })

                    localStorage.setItem('previousUrl' ,'forgotpassword');
                    $('.fullpageloader').hide();
                    swal("OTP send to your registered email ID.");

                    this.props.history.push('/confirm-otp/'+response.data.ID);
                } else if(response.data.message == "USER_BLOCK"){
                    console.log("In USER_BLOCK")
                    swal({
                      title: "Your account is inactive. Please contact Admin.",
                      text: "Your account is inactive. Please contact Admin."
                    });
                    this.props.history.push('/login');

                  }else if(response.data.message == "USER_UNVERIFIED"){
                    console.log("In USER_UNVERIFIED")
                    swal({
                      text : "You have not verified your account. Please verify your account."
                    });
                    this.props.history.push('/login');

                  }else if(response.data.message == "NOT_REGISTER"){
                    console.log("In NOT_REGISTER")
                    swal({
                      text : "This email is not registered. Please do signup."
                    });
                    this.props.history.push('/login');
                    
                  }

            })
            .catch((error)=>{
                //document.getElementById("sendlink").innerHTML = 'Reset Password';
                swal("This Email ID is not registered");
                $('.fullpageloader').hide();
            })
        
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

   
    render() {
        return (
            <section className="col-lg-4 col-lg-offset-4 col-md-4 col-md-offset-4 col-sm-12 col-xs-12 forgotPasswordWrapper">
                <div className="forgotPassword ">
                  <form>
                    <div className="forgotPasswordTitle col-lg-12"> <h3>Forgot Password</h3>
                    </div>

                    <hr className="forgotPasswordHr"/>

                    <div className="forgotPasswordText col-lg-12">
                        Please enter your registered email address below to receive OTP
                    </div> 
                     <hr className="forgotPasswordHr"/>


                    <div className="col-lg-12 form-group" >
                        <div className="input-group">
                            <span className="input-group-addon forgotPasswordInputIcon1"><i className="fa fa-envelope"></i></span>
                            <input type="email" id="emailAddress" name="emailAddress" ref="emailAddress" placeholder="Email Address" value={this.state.emailAddress} onChange={this.handleChange.bind(this)} className="form-control forgotPasswordInputBox"/>
                        </div>
                    </div>

                    

                    <div className="col-lg-12 buttonWrapper">
                        <button className="btn col-lg-12 sendOTP" onClick={this.sendLink.bind(this)}>Send OTP</button>
                    </div>

                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt10">
                                    <div className="row ">
                                        <a href='/login' className="forgotPasswordSignin col-lg-12">
                                        <u>Sign In</u>
                                        </a>
                                    </div>
                                </div>
                  </form>
                </div>
         </section>
        )
    }
}

export default ForgotPassword;