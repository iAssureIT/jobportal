import React, { Component } from 'react';
import $ from 'jquery';
import jQuery from 'jquery';
import swal from 'sweetalert';
import axios from 'axios';
import './ResetPassword.css';

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bannerData: {
                title: "MY SHOPPING CART",
                breadcrumb: 'My Shopping Cart',
                backgroungImage: '/images/cartBanner.png',
            },
            showMessage : false
        }
    }
    componentDidMount(){
       
    }
    validateForm=()=>{
    var status = true;

    if(this.state.newPassword.length<=0){
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

    if(this.state.confirmNewPassword.length<=0){
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
         console.log("fieldKey",fieldKey);
        this.setState({
          [fieldKey]:fieldValue
        });
    }

    resetPassword(event) {
        event.preventDefault();
        var userID = this.props.match.params.user_ID;
        var formValues = {
            "pwd" : this.refs.newPassword.value
        }
        var status =  this.validateForm();
        if(status){
            $('.fullpageloader').show();
            axios.patch('/api/auth/patch/change_password_withoutotp/id/'+userID, formValues)
            .then((response)=>{
                $('.fullpageloader').hide();
                this.setState({
                    "showMessage" : true,
                })
                swal(response.data.message);
                this.props.history.push('/login');
            })
            .catch((error)=>{
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
        return $('#confirmPassword').attr('type', 'text');
    }
    hideConfirmPass(){
        $('.showPwd2').toggleClass('showPwd3');
        $('.hidePwd2').toggleClass('hidePwd3');
        return $('#confirmPassword').attr('type', 'password');
    }
    render() {
        return (
            <section className="container-fluid resetPasswordWrapper">
                <div className="resetPassword col-lg-4 col-lg-offset-4">
                  <form>

                    <div className="resetPasswordTitle col-lg-12">Reset Password
                    </div>

                    <hr className="resetPasswordHr"/>

                    <div className="col-lg-12 form-group" >
                        <div className="input-group">
                            <span className="input-group-addon resetPasswordInputIcon"><i className="fa fa-lock"></i></span>
                            <input type="password" id="newPassword" name="newPassword" placeholder="Enter new Password" ref="newPassword" value={this.state.newPassword} onChange={this.handleChange.bind(this)} className="form-control resetPasswordInputBox"/>
                        </div>
                         <span id="newPasswordError" className="errorMsg"></span>
                    </div>

                    <div className="col-lg-12 form-group" >
                        <div className="input-group">
                            <span className="input-group-addon resetPasswordInputIcon"><i className="fa fa-lock"></i></span>
                            <input type="password" id="confirmNewPassword" name="confirmNewPassword" placeholder="Confirm new Password" value={this.state.confirmNewPassword} onChange={this.handleChange.bind(this)} className="form-control resetPasswordInputBox"/>
                        </div>
                         <span id="confirmNewPasswordError" className="errorMsg"></span>
                    </div>


                    <div className="col-lg-12 buttonWrapper">
                   <button className="btn col-lg-12 buttonResetPassword" onClick={this.resetPassword.bind(this)}>Reset Password</button>
                  </div>

                

                </form>
              </div>
         </section>
        )
    }
}

export default ResetPassword;