import React, { Component } from 'react';
import $ from 'jquery';
import jQuery from 'jquery';
import Swal           from 'sweetalert2';
import axios from 'axios';
import './ResetPassword.css';
import { connect }        from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter }   from 'react-router-dom';
import  * as mapActionCreator from '../common/actions/index';

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = { 

          oldPassword : '',
          newPassword : "",
          confirmNewPassword : "",
          showPassword1: false,
          showPassword2: false,
          showPassword3: false,
          phone     :this.props.userDetails.phone,
          user_ID      :this.props.userDetails.user_id,
        }
    }
    componentDidMount(){
        const userDetails = JSON.parse(localStorage.getItem("userDetails"));
        const token = userDetails.token;
        axios.defaults.headers.common['Authorization'] = 'Bearer '+ token;
    }

    showPassword1=(event)=>{
    event.preventDefault();
    var passwordToggle1 = document.getElementById("oldPassword");
    if (passwordToggle1.type === "password") {
        passwordToggle1.type = "text";
        this.setState({showPassword1:true});
      } else {
        passwordToggle1.type = "password";
        this.setState({showPassword1:false});
      }
    }


    showPassword2=(event)=>{
    event.preventDefault();
    var passwordToggle2 = document.getElementById("newPassword");
    if (passwordToggle2.type === "password") {
        passwordToggle2.type = "text";
        this.setState({showPassword2:true});
      } else {
        passwordToggle2.type = "password";
        this.setState({showPassword2:false});
      }
    }


    showPassword3=(event)=>{
    event.preventDefault();
    var passwordToggle3 = document.getElementById("confirmNewPassword");
    if (passwordToggle3.type === "password") {
        passwordToggle3.type = "text";
        this.setState({showPassword3:true});
      } else {
        passwordToggle3.type = "password";
        this.setState({showPassword3:false});
      }
    }


    validateForm=()=>{
    var status = true;

    var oldPassword= this.state.oldPassword;
    var newPassword=this.state.newPassword;
    var confirmNewPassword =this.state.confirmNewPassword;

    if((this.state.oldPassword) == null) {
      document.getElementById("oldPasswordError").innerHTML=  
      "Please enter Password";  
      status=false; 
    }

    
    else{
      document.getElementById("oldPasswordError").innerHTML=  
      ""; 
      status = true;
    }

    if(this.state.newPassword == null) {
      document.getElementById("newPasswordError").innerHTML=  
      "Please enter Password";  
      status=false; 
    }

    if(this.state.newPassword.length<8){
      document.getElementById("newPasswordError").innerHTML=  
      "Please enter atleast 8 characters";  
      status=false; 
    }
    else{
      document.getElementById("newPasswordError").innerHTML=  
      ""; 
      status = true;
    }

    if(this.state.confirmNewPassword == null){
      document.getElementById("confirmNewPasswordError").innerHTML=  
      "Please enter Confirm Password";  
      status=false; 
    }

    if(this.state.confirmNewPassword.length<8){
      document.getElementById("confirmNewPasswordError").innerHTML=  
      "Please enter atleast 8 characters";  
      status=false; 
    }
    else{
      document.getElementById("confirmNewPasswordError").innerHTML=  
      ""; 
      status = true;
    }

    if ((this.state.newPassword) != (this.state.confirmNewPassword)){
      document.getElementById("newPasswordError").innerHTML=  
      "Passwords do not match";  
      document.getElementById("confirmNewPasswordError").innerHTML=  
      "Passwords do not match"; 
      status=false; 
    }

    return status;
  } 
    handleChange(event){
        var fieldValue=event.currentTarget.value;
        // console.log("fieldValue",fieldValue);
         var fieldKey=event.currentTarget.name;
        this.setState({
          [fieldKey]:fieldValue
        });
    }

    logout() {
    
        var userDetails = localStorage.removeItem("userDetails");
        //alert()
        if (userDetails !== null && userDetails !== "undefined") {
            this.setState({
                loggedIn: false
            })
        }
        window.location.href = "/";
        //this.props.history.push("/")
  }


    changePassword(event) {
        event.preventDefault();
        var {mapAction} = this.props;
        var status =  this.validateForm();

        if(status == true){
        var user_id = this.state.user_ID;
        var auth = {
          mobNumber : this.props.userDetails.username,
          password : this.state.oldPassword,
          role: "candidate"
        } 
        console.log(auth);
        axios.post('/api/auth/post/login/mobile',auth)
        .then(response => {
          console.log(response);
        if(response.data.message==="Login Auth Successful"){
          if(this.state.oldPassword !=this.state.newPassword)  {
            if(this.state.newPassword === this.state.confirmNewPassword){
              var body = {
                pwd : this.state.newPassword,
                user_id : this.state.user_ID,
                mobileNo : this.props.userDetails.username,
              }

              console.log(body)
              axios.patch('/api/auth/patch/resetpwd', body )
              .then((response)=>{

                
                this.setState({
                  oldPassword:"",
                  newPassword:"",
                  confirmNewPassword:"",
                })

                var token = localStorage.removeItem("token");
                if(token!==null){
                console.log("Header Token = ",token);
                this.setState({
                  loggedIn : false
                },()=>{
                  localStorage.removeItem("userDetails")
                  localStorage.removeItem("emailId")
                  localStorage.removeItem("center_ID")
                  localStorage.removeItem("centerName")
                  localStorage.removeItem("fullName")
                  localStorage.removeItem('role')
                })
                  console.log("token",token);
                  // browserHistory.push("/login"); 

                   Swal.fire('', "Your Password has been changed", '');
                    //this.props.history.push('/login');
                   this.logout();
                  }
              })
              .catch((error)=>{
                if(error.message === "Request failed with status code 401"){
                  var userDetails =  localStorage.removeItem("userDetails");
                  localStorage.clear();

                  Swal.fire({title  : ' ',
                            html    : "Your session is expired! You need to login again. "+"<br>"+" Click OK to go to Login Page",
                            text    :  "" })
                      .then(okay => {
                        if (okay) { 
                          var userDetails = {
                              loggedIn    : false,
                              username  :"",  
                              firstName   : "", 
                              lastName    : "", 
                              email     : "",
                              phone     : "", 
                              user_id     : "",
                              roles     : [],
                              token     : "", 
                              gender    : "", 
                              profilePicture : "",
                              candidate_id: "",
                              profileCompletion : 0
                              }
                              mapAction.setUserDetails(userDetails);
                              document.getElementById("loginbtndiv").click();
                              }
                            });
              }else{
                Swal.fire('', " Error!", '');
              }
              })
            }else{
              Swal.fire("", "Please enter valid new password and confirm password", "");
            }
          }
          else{
              Swal.fire("", "Please enter different new password", "");
          }  
           
          
        }

        else{
          console.log("ERROR in Responce");
          Swal.fire('', "Invalid Old Password","Please Enter correct old password", '');

        }
      })
      .catch(error => {
        if (error.response.status === 401) {
          console.log("ERROR in Responce");
          Swal.fire('', "Invalid Password","Please Enter correct password", '');
          this.setState({invalidpassword:true})
        }
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

    
    showNewPass(){
        $('.showPwd').toggleClass('showPwd1');
        $('.hidePwd').toggleClass('hidePwd1');
        return $('#newPassword').attr('type', 'text');
    }
    hideNewPass(){
        $('.showPwd').toggleClass('showPwd1');
        $('.hidePwd').toggleClass('hidePwd1');
        return $('#newPassword').attr('type', 'password');
    }
    showConfirmPass(){
        $('.showPwd2').toggleClass('showPwd3');
        $('.hidePwd2').toggleClass('hidePwd3');
        return $('#confirmNewPassword').attr('type', 'text');
    }
    hideConfirmPass(){
        $('.showPwd2').toggleClass('showPwd3');
        $('.hidePwd2').toggleClass('hidePwd3');
        return $('#confirmNewPassword').attr('type', 'password');
    }
    render() {
        return (
            <section className="col-lg-12 resetPasswordWrapper">

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
                <div className="resetPassword col-lg-4 col-lg-offset-4">
                  <form>

                    <div className="resetPasswordTitle col-lg-10 col-lg-offset-1">Change Password
                    </div>

                   {/* <hr className="resetPasswordHr"/>*/}

                     <div className="col-lg-10 col-lg-offset-1 form-group" >
                        <div className="input-group">
                            <span className="input-group-addon resetPasswordInputIcon"><i className="fa fa-lock"></i></span>
                            <input type="password" id="oldPassword" name="oldPassword" placeholder="Enter old Password" ref="oldPassword" value={this.state.oldPassword} onChange={this.handleChange.bind(this)} className="form-control resetPasswordInputBox"/>
                             <span className="input-group-addon loginInputIcon3" onClick={this.showPassword1.bind(this)}>
                             <i className={this.state.showPassword1 ? "fa fa-eye-slash" : "fa fa-eye"} 
                             value={this.state.showPassword1}></i></span>
                        </div>
                         <span id="oldPasswordError" className="errorMsg"></span>
                    </div>

                    <div className="col-lg-10 col-lg-offset-1 form-group" >
                        <div className="input-group">
                            <span className="input-group-addon resetPasswordInputIcon"><i className="fa fa-lock"></i></span>
                            <input type="password" id="newPassword" name="newPassword" placeholder="Enter new Password" ref="newPassword" value={this.state.newPassword} onChange={this.handleChange.bind(this)} className="form-control resetPasswordInputBox"/>
                        <span className="input-group-addon loginInputIcon3" onClick={this.showPassword2.bind(this)}>
                             <i className={this.state.showPassword2 ? "fa fa-eye-slash" : "fa fa-eye"} 
                             value={this.state.showPassword2}></i></span></div>
                         <span id="newPasswordError" className="errorMsg"></span>
                    </div>

                    <div className="col-lg-10 col-lg-offset-1 form-group" >
                        <div className="input-group">
                            <span className="input-group-addon resetPasswordInputIcon"><i className="fa fa-lock"></i></span>
                            <input type="password" id="confirmNewPassword" name="confirmNewPassword" placeholder="Confirm new Password" value={this.state.confirmNewPassword} onChange={this.handleChange.bind(this)} className="form-control resetPasswordInputBox"/>
                            <span className="input-group-addon loginInputIcon3" onClick={this.showPassword3.bind(this)}>
                             <i className={this.state.showPassword3 ? "fa fa-eye-slash" : "fa fa-eye"} 
                             value={this.state.showPassword3}></i></span>
                        </div>
                         <span id="confirmNewPasswordError" className="errorMsg"></span>
                    </div>


                    <div className="col-lg-10 col-lg-offset-1 buttonWrapper">
                   <button className="btn col-lg-8 col-lg-offset-4 buttonResetPassword" onClick={this.changePassword.bind(this)}>Change Password</button>
                  </div>

                

                </form>
              </div>
         </section>
        )
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
export default connect(mapStateToProps, mapDispatchToProps) (ChangePassword);