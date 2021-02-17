import React, { Component } from 'react';
import $ from "jquery";
import jQuery from 'jquery';
import 'jquery-validation';
import PhoneInput from 'react-phone-input-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/modal.js';
import 'bootstrap/js/tab.js';
import 'font-awesome/css/font-awesome.min.css';
import './SignUp.css';
import swal from 'sweetalert';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import _          from 'underscore';
import 'react-phone-input-2/lib/style.css';

class SignUp extends Component {

  constructor() {
    super();
    this.state = {
      value                 : '',
      checkUserExists       : 0,
      loggedIn              : false,
      showPassword1         : false,
      showPassword2         : false,
      employerID            : "",
      employer_id           : "",
      employerName          : "",
      company               : "",
      company_id            : "",
      companylist           : [],
      city                  : [], 
      selectedCompany       : [],
      stateArray            : [],
      companyState          : "",
      companyCountry        : "",
      countryCode           : "IN",
      companyCity           : "",
      formerrors            : {
        firstNameV          : "",
        lastNameV           : "",
        mobileV             : "",
        emailIDV            : "",
      },
      employerArray         : [],
      firstName             : "",
      lastName              : "",
      password              : "",
      confirmPassword       : "",
      emailAddress          : "",
      mobileNumber          : "",
      value                 : '',
      suggestions           : []
    }
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillMount() {

  }
  componentDidMount() {
    
    $(".checkUserExistsError").hide();
    //==============
    axios.get("/api/entitymaster/get/corporate")
        .then(response => {
                this.setState({ companylist : response.data });
        })
        .catch(error => {
            swal.fire("Error while getting List data", error.message, 'error');
        }) 
    axios.get("http://locations2.iassureit.com/api/states/get/list/IN")
      .then((response) => {
        this.setState({
          stateArray: response.data
        })
        
      })
      .catch((error) => {
      })    
  }
  camelCase(str) {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  showPassword1=(event)=>{
    event.preventDefault();
    var passwordToggle1 = document.getElementById("password");
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
    var passwordToggle2 = document.getElementById("confirmPassword");
    if (passwordToggle2.type === "password") {
        passwordToggle2.type = "text";
        this.setState({showPassword2:true});
      } else {
        passwordToggle2.type = "password";
        this.setState({showPassword2:false});
      }
  }
  validateForm=()=>{
    var status = true;
    var regName = /^[a-zA-Z]+$/;
    var employer =this.state.value;
    var firstName=this.state.firstName;
    var lastName=this.state.lastName;
    var tempEmail = this.state.emailAddress.trim(); // value of field with whitespace trimmed off
    var emailFilter =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var illegalChars = /[\(\)\<\>\,\;\:\\\"\[\]]/;
    var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{5})[-. ]?([0-9]{5})$/;


    if(this.state.employer<=0)  {
      document.getElementById("employerError").innerHTML=  
      "Please enter employer  valid Name";  
      status=false; 
    }
  
    else if(!regName.test(employer)){
      document.getElementById("employerError").innerHTML=  
      "Please enter employer valid name,......";  
      status=false; 
    }
    else{
      
      status = true;
    }

    
    if(this.state.firstName<=0)  {
      document.getElementById("firstNameError").innerHTML=  
      "Please enter valid Name";  
      status=false; 
    }
  
    else if(!regName.test(firstName)){
      document.getElementById("firstNameError").innerHTML=  
      "Please enter valid name,......";  
      status=false; 
    }
    else{
      
      status = true;
    }

    if(this.state.lastName<=0)  {
      document.getElementById("lastNameError").innerHTML=  
      "Please enter valid Name";  
      status=false; 
    }
    else if(!regName.test(lastName)){
      document.getElementById("lastNameError").innerHTML=  
      "Please enter valid name.....";  
      status=false; 
    }
    else{
      document.getElementById("lastNameError").innerHTML=  
       " "; 
      status = true;
    }

    if(this.state.emailAddress.length<=0){
      document.getElementById("emailAddressError").innerHTML=  
      "Please enter your Email";  
      status=false; 
    }else if (
      !emailFilter.test(tempEmail)) { //test email for illegal characters
          document.getElementById('emailAddressError').innerHTML = "Please enter a valid email address.";
      } else if (this.state.emailAddress.match(illegalChars)) {
          document.getElementById('emailAddressError').innerHTML = "Email contains invalid characters.";
      }else{
      document.getElementById("emailAddressError").innerHTML=
      ""; 
      status = true;
    }

    if(this.state.mobileNumber.match(phoneno)){
      document.getElementById("mobileNumberError").innerHTML=  
      ""; 
      status = true;
      
    }else{
      document.getElementById("mobileNumberError").innerHTML=  
      "Please enter valid Mobile Number";  
      status=false; 
    }

    if(this.state.password.length<=0){
      document.getElementById("passwordError").innerHTML=  
      "Please enter Password";  
      status=false; 
    }

    if(this.state.password.length<8){
      document.getElementById("passwordError").innerHTML=  
      "Please enter atleast 8 characters";  
      status=false; 
    }
    else{
      document.getElementById("passwordError").innerHTML=  
      ""; 
      status = true;
    }

    if(this.state.confirmPassword.length<=0){
      document.getElementById("confirmPasswordError").innerHTML=  
      "Please enter Confirm Password";  
      status=false; 
    }

    if(this.state.confirmPassword.length<8){
      document.getElementById("confirmPasswordError").innerHTML=  
      "Please enter atleast 8 characters";  
      status=false; 
    }
    else{
      document.getElementById("confirmPasswordError").innerHTML=  
      ""; 
      status = true;
    }

    if ((this.state.password) != (this.state.confirmPassword)){
      document.getElementById("passwordError").innerHTML=  
      "Passwords do not match";  
      document.getElementById("confirmPasswordError").innerHTML=  
      "Passwords do not match"; 
      status=false; 
    }

    return status;
  } 
  usersignup(event) {
    event.preventDefault();
    var status =  this.validateForm();
   
     if(status == true){

      var auth = {
        username    : "EMAIL",
        firstname   : this.state.firstName, 
        lastname    : this.state.lastName,
        mobNumber   : (this.state.mobileNumber).replace("-", ""),
        email       : this.state.emailAddress,
        pwd         : this.state.password,
        company_id  : this.state.employer_id != "" ? this.state.employer_id : null,
        companyID   : this.state.employerID != "" ? this.state.employerID : null,
        companyName : this.state.employerName,
        role        : 'employer',
        status      : 'unverified',        

      }

      
    console.log('auth sign=======',auth) 

      axios.post('/api/auth/post/signup/user/otp', auth)
        .then((response) => {
          console.log("signup res===",response.data)
          if(response.data.message == 'USER_CREATED'){
            swal('Great, Information submitted successfully and OTP is sent to your registered Email.');
            localStorage.setItem('previousUrl' ,'signup');

            var sendData = {
              "event"     : "Event1", //Event Name
              "toUser_id"  : response.data.ID, //To user_id(ref:users)
              "toUserRole"  : "employer",
              "variables" : {
                "UserName": this.state.firstName,
                "OTP"     : response.data.OTP,
              }
            }
            // console.log('sendData in result==>>>', sendData)
            
            axios.post('/api/masternotifications/post/sendNotification', sendData)
              .then((notificationres) => {})
              .catch((error) => { console.log('notification error: ', error) })

            var sendData2 = {
              "event": "Event2", //Event Name
              "toUser_id": response.data.ID, //To user_id(ref:users)
              "variables": {
                'UserName': this.state.firstName + ' ' + this.state.lastName,
                'EmployerName': this.state.employerName,
                'EmployerID': this.state.employerID,
                'EmployerEmailID': this.state.emailAddress,
                'EmployerContactNumber': (this.state.mobileNumber).replace("-", "")
              }
            }
            axios.post('/api/masternotifications/post/sendNotification', sendData2)
              .then((notificationres) => {})
              .catch((error) => { console.log('notification error: ', error) })  


            this.props.history.push("/confirm-otp/" + response.data.ID);
          }else{
            swal(response.data.message);
          } 
        })
        .catch((error) => {
          
        }) 
    }
   
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

  checkUserExists(event) {
    if (event.target.value != '') {
      axios.get('/get/checkUserExists/' + event.target.value)
        .then((response) => {

          if (response.data.length > 0) {
            $(".checkUserExistsError").show();
            $('.button3').attr('disabled', 'disabled');
            this.setState({ checkUserExists: 1 })

          } else {
            $(".checkUserExistsError").hide();
            $('.button3').removeAttr('disabled');
            this.setState({ checkUserExists: 0 })
          }
        })
        .catch(function (error) {
        })
    } else {
      $(".checkUserExistsError").hide();
    }
  }

  handleChange(event) {
    // var dropDown = this.refs.dropDown.value;
    // console.log("dropDown",dropDown);
    this.setState({
      [event.target.name]: event.target.value
    });
    
  }
    changeMobile(event) {
    this.setState({
      mobileNumber: event
    }, () => {
      if (this.state.mobileNumber) {
        this.setState({
          companyPhoneAvailable: this.state.companyPhone === "+" || this.state.companyPhone.length<15 ? false : true
        },()=>{
        })
      }
    })
  }
  acceptcondition(event) {
    var conditionaccept = event.target.value;
    if (conditionaccept == "acceptedconditions") {
      $(".acceptinput").removeAttr('disabled');
    } else {
      $(".acceptinput").addAttr('disabled');
    }
  }

  showModal() {
    $(".modalbg").css("display", "block");
  }
  hideModal() {
    $(".modalbg").css("display", "none");
  }
  
  showSignPass() {
    $('.showPwd').toggleClass('showPwd1');
    $('.hidePwd').toggleClass('hidePwd1');
    return $('.inputTextPass').attr('type', 'text');
  }
  hideSignPass() {
    $('.showPwd').toggleClass('showPwd1');
    $('.hidePwd').toggleClass('hidePwd1');
    return $('.inputTextPass').attr('type', 'password');
  }
  proceed() {

  }
  onChangeCompany(event){
        const {name,value} = event.target;
        this.setState({ [name]:value });  
        
        var company_id;
        if (document.querySelector('#company option[value="' + value + '"]')) {
           company_id = document.querySelector('#company option[value="' + value + '"]').getAttribute("data-value")
        }else{company_id = "" }

         
        var selectedCompany = this.state.companylist.filter((val)=>{
          if (val._id ==company_id) {
            return val;
          }
        })
        console.log(selectedCompany)
        if (selectedCompany[0]) {
          var city = _.uniq(selectedCompany[0].locations, 'district')
        
          this.setState({company_id :company_id, selectedCompany : selectedCompany, city: city, });

        }else{
          this.setState({company_id :company_id, company : value });

        }
        
    } 
    handleChangeCity(event){
      var value = event.currentTarget.value;
      var name  = event.currentTarget.name;
      
      if (document.querySelector('#companyCity option[value="' + value + '"]')) {
        this.setState({
          [name]      : value,
          "companyState"    : document.querySelector('#companyCity option[value="' + value + '"]').getAttribute("data-state"),
          "stateCode"   : document.querySelector('#companyCity option[value="' + value + '"]').getAttribute("data-stateCode"),
          "companyCountry"    : document.querySelector('#companyCity option[value="' + value + '"]').getAttribute("data-country"),
          "countryCode"   : document.querySelector('#companyCity option[value="' + value + '"]').getAttribute("data-countryCode")
        })
      }else{
        this.setState({ [name]      : value })
      }
    }
  render() {
    
    return (
      
      <section className="container-fluid registrationFormWrapper">
          <div className="registrationForm col-lg-6 col-lg-offset-3">
            <form>
              <div className="signUpTitle col-lg-12">Sign Up</div>

              <div className="row">
                <hr className="registrationHr"/>
              </div>
             
              <div className="row">
                <div className="col-lg-12 form-group" >
                  <div className="input-group autocomplete">
                    <span className="input-group-addon registrationInputIcon"><i className="fa fa-briefcase"></i></span>
                    <input type="text" list="company" className="form-control inputBox" refs="industry" 
                    name="company" id="selectCompany" maxLength="100" value={this.state.company} data-value={this.state.company_id}
                    onChange={this.onChangeCompany.bind(this)} />
                    <datalist name="company" id="company" className="companylist" >
                        { this.state.companylist.map((item, key) =>
                            <option key={key} value={item.companyName} data-value={item._id}/>
                        )}
                    </datalist>
                  </div>
                  <span id="employerError" className="errorMsg"></span>
                </div>
              </div>  
              <div className="row">
              <div className="col-lg-4 form-group">
                {/*<label htmlFor="companyCity" className="nameTitleForm">
                   City
                  <sup className="nameTitleFormStar">*</sup>
                </label>*/}
                <div className="input-group ">
                  <span className="input-group-addon registrationInputIcon"><i className="fa fa-map-marker"></i></span> 
                  <input type="text" list="companyCity" className="form-control registrationInputBox" refs="industry" 
                    name="companyCity" id="selectCompanyCity" maxLength="100" value={this.state.companyCity}
                    onChange={this.handleChangeCity.bind(this)} />
                    <datalist name="companyCity" id="companyCity" className="companyCity" >
                        { this.state.city.map((elem, key) =>
                            <option key={key} value={elem.district} data-stateCode = {elem.stateCode} data-state={elem.state} data-countryCode = {elem.countryCode} data-country = {elem.country}/>
                        )}
                    </datalist>                  
                </div> 
                <span id="companyCityError" className="errorMsg"></span>
              </div>

              <div className="col-lg-4">
                {/*<label htmlFor="companyState" className="nameTitleForm">
                   State
                  <sup className="nameTitleFormStar">*</sup>
                </label>*/}
                <div className="input-group ">
                  <span className="input-group-addon registrationInputIcon"><i className="fa fa-map-marker"></i></span>  
                  
                  <select id="states" className="form-control registrationInputBox selectOption"
                    ref="companyState" value={this.state.companyState} name="companyState" onChange={this.handleChangeState} >
                    <option selected={true}>-- Select --</option>
                    {
                      this.state.stateArray && this.state.stateArray.length > 0 ?
                        this.state.stateArray.map((stateData, index) => {
                          return (
                            <option key={index} statecode={stateData.stateCode}>{this.camelCase(stateData.stateName)}</option>
                          );
                        }
                        ) : ''
                    }
                  </select>
                </div> 
                <span id="stateError" className="errorMsg"></span>
              </div>
              <div className="col-lg-4">
                {/*<label htmlFor="companyCountry" className="nameTitleForm">
                   Country
                    <sup className="nameTitleFormStar">*</sup>
                </label>*/}
                <div className="input-group ">
                  <span className="input-group-addon registrationInputIcon"><i className="fa fa-map-marker"></i></span> 
                  <input type="text" name="companyCountry" id="companyCountry" 
                   className="form-control registrationInputBox " value={this.state.companyCountry}
                   onChange={this.handleChange.bind(this)} />
                </div> 
                <span id="companyCountryError" className="errorMsg"></span>
              </div>
            </div>
              <div className="row">
                <div className="col-lg-6 form-group" >
                    <div className="input-group">
                        <span className="input-group-addon registrationInputIcon"><i className="fa fa-user"></i></span>
                        <input type="text" id="firstName" name="firstName" placeholder="First Name" value={this.state.firstName} onChange={this.handleChange.bind(this)} className="form-control registrationInputBox"/>
                    </div>
                     <span id="firstNameError" className="errorMsg"></span>
                </div>

                <div className="col-lg-6 form-group" >
                    <div className="input-group">
                        <span className="input-group-addon registrationInputIcon"><i className="fa fa-user"></i></span>
                        <input type="text" id="lastName" name="lastName" placeholder="Last Name" value={this.state.lastName} onChange={this.handleChange.bind(this)} className="form-control registrationInputBox"/>
                    </div>
                     <span id="lastNameError" className="errorMsg"></span>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6 form-group" >
                    <div className="input-group">
                        <span className="input-group-addon registrationInputIcon1"><i className="fa fa-envelope"></i></span>
                        <input type="email" id="emailAddress" name="emailAddress" placeholder="Email Address" value={this.state.emailAddress} onChange={this.handleChange.bind(this)} className="form-control registrationInputBox"/>
                    </div>
                     <span id="emailAddressError" className="errorMsg"></span>
                </div>

                <div className="col-lg-6 form-group" >
                  <PhoneInput 
                    country   = {'in'}
                    id        ="mobileNumber" 
                    className ="input-group-addon form-control inputBox" 
                    value     ={this.state.mobileNumber} 
                    onChange  = {mobileNumber => this.setState({ mobileNumber })}
                  />
                  <span id="mobileNumberError" className="errorMsg"></span>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6 form-group">
                  <div className="input-group">
                      <span className="input-group-addon registrationInputIcon"><i className="fa fa-lock"></i></span>
                      <input type="password" id="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange.bind(this)} className="form-control registrationInputBox"/>
                        <span className="input-group-addon loginInputIcon3" onClick={this.showPassword1.bind(this)}>
                          <i className={this.state.showPassword1 ? "fa fa-eye-slash" : "fa fa-eye"} value={this.state.showPassword1}></i>
                        </span>
                  </div>
                  <span id="passwordError" className="errorMsg"></span>
                </div>

                <div className="col-lg-6 form-group ">
                    <div className="input-group">
                      <span className="input-group-addon registrationInputIcon"><i className="fa fa-lock"></i></span>
                      <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.handleChange.bind(this)} className="form-control registrationInputBox"/>
                      <span className="input-group-addon loginInputIcon3" onClick={this.showPassword2.bind(this)}>
                         <i className={this.state.showPassword2 ? "fa fa-eye-slash" : "fa fa-eye"} value={this.state.showPassword2}></i>
                      </span>
                    </div>
                     <span id="confirmPasswordError" className="errorMsg"></span>
                </div>
              </div>
            <div className="col-lg-6 col-lg-offset-3 buttonWrapper">
              <button className="btn col-lg-12 buttonSignUp" onClick={this.usersignup.bind(this)}>Sign Up</button>
            </div>

            <div className="col-lg-12 registrationLinks">
              <a className="alreadyAccount" href="/login"><u>Already have an Account?Sign In</u></a>
            </div>

          </form>
        </div>
      </section>
    );
  }
}
export default SignUp;
