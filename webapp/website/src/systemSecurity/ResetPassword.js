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

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {

          newPassword : "",
          confirmNewPassword : "",
          showPassword2: false,
          showPassword3: false,
        }
    }
    componentDidMount(){
       
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

    var newPassword=this.state.newPassword;
    var confirmNewPassword =this.state.confirmNewPassword;

    
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


    resetPassword(event) {
        event.preventDefault();
       
        var status =  this.validateForm();
        if(status == true){
        
        
        console.log(this.state.newPassword)
        if(this.state.newPassword === this.state.confirmNewPassword){
          var body = {
            pwd : this.state.newPassword,
            user_id : this.props.userID,
          }


          axios.patch('/api/auth/patch/change_password_withoutotp/id', body)
          .then((response)=>{

            Swal.fire('', "Your Password has been changed", '');
            this.setState({
              newPassword:"",
              confirmNewPassword:"",
            })
            var {mapAction} = this.props;
            mapAction.setUserID(response.data.ID);
            mapAction.setSelectedModal("login");
            
          })
          .catch((error)=>{
          console.log('error',error)
          })
        }else{
          Swal.fire({
            title       : ' ',
            html        : 'Invalid Password<br />Please Enter valid New password and confirm password',
            text        : ''
          })
        }
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

                    <div className="resetPasswordTitle col-lg-10 col-lg-offset-1">Reset Password
                    </div>

                    <hr className="resetPasswordHr"/>
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
                   <button className="btn col-lg-6 col-lg-offset-3 buttonResetPassword" onClick={this.resetPassword.bind(this)}>Change Password</button>
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
export default connect(mapStateToProps, mapDispatchToProps) (ResetPassword);