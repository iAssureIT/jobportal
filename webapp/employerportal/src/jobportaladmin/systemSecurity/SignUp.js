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
      
      companyName           : "",
      company               : "",
      company_id            : "",
      companyID             : "",
      companylist           : [],
      branchArray           : [],
      city                  : [], 
      stateArray            : [],
      companyState          : "",
      companyCountry        : "",
      countryCode           : "IN",
      branch                : "",
      branchCode            : "",
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
    axios.get("/api/states/get/list/IN")
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
    var regName = /^[a-zA-Z]/;
    var employer =this.state.companyName;
    var firstName=this.state.firstName;
    var lastName=this.state.lastName;
    var tempEmail = this.state.emailAddress.trim(); // value of field with whitespace trimmed off
    var emailFilter =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var illegalChars = /[\(\)\<\>\,\;\:\\\"\[\]]/;
    var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{5})[-. ]?([0-9]{5})$/;

    if(this.state.companyName<=0)  {
      document.getElementById("employerError").innerHTML=  
      "Please enter valid employer name";  
      status=false; 
    }
    
    else if(!regName.test(employer)){
      document.getElementById("employerError").innerHTML=  
      "Please enter valid employer name";  
      status=false; 
    }
    else{
      document.getElementById("employerError").innerHTML="";
      status = true;
    }

    if (this.state.branch == "") {
      document.getElementById("branchError").innerHTML=  
      "Please enter valid location";  
      status=false; 
    }else{
      document.getElementById("branchError").innerHTML=  "";
      status = true;
    }

    
    if (this.state.companyState == "") {
      document.getElementById("stateError").innerHTML=  
      "Please select State";  
      status=false; 
    }else{
      document.getElementById("stateError").innerHTML=  "";
      status = true;
    }

    if (this.state.companyCountry == "") {
      document.getElementById("companyCountryError").innerHTML=  
      "Please enter country";  
      status=false; 
    }else{
      document.getElementById("companyCountryError").innerHTML=  "";
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
      document.getElementById("firstNameError").innerHTML= "";
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
    console.log('auth sign=======',this.state) 
    
     if(status == true){

      var auth = {
        username    : "EMAIL",
        firstname   : this.state.firstName, 
        lastname    : this.state.lastName,
        mobNumber   : (this.state.mobileNumber).replace("-", ""),
        email       : this.state.emailAddress,
        pwd         : this.state.password,
        company_id  : this.state.company_id != "" ? this.state.company_id : null,
        companyID   : this.state.companyID != "" ? this.state.companyID : null,
        companyName : this.state.companyName,
        branchCode  : this.state.branchCode == "" ? 0 : this.state.branchCode,
        role        : 'employer',
        status      : 'unverified',        
        city        : this.state.branch,
        stateName   : this.state.stateName,
        stateCode   : this.state.companyState,
        country     : this.state.companyCountry,
        countryCode : this.state.countryCode,
      }

      
      
    console.log('auth sign=======',auth) 
    
      axios.post('/api/auth/post/signup/user/otp', auth)
        .then((response) => {
          if(response.data.message == 'USER_CREATED'){
            swal('Great, Information submitted successfully and OTP is sent to your registered Email.');
            localStorage.setItem('previousUrl' ,'signup');
            if(this.state.branchCode == ""){
                
            }else{
              var contactData = {
              'entityID'              : this.state.company_id,
              'contactDetails'        : {
                "branchCode" : this.state.branchCode,
                "branchName" : this.state.branch,
                "locationType" : this.state.locationType,
                "firstName" : this.state.firstName,
                "lastName" : this.state.lastName,
                "phone" : (this.state.mobileNumber).replace("-", ""),
                "email" : this.state.emailAddress,
                "createUser" : true,
                "role" : "employer",
                "userID" : response.data.ID
              }
            }
            axios.patch('/api/entitymaster/patch/addContact' ,contactData)
            .then((response) => {
                if(response.data.duplicated)
                {
                  swal({
                    title : "Contact already exists.",
                  });

                }
            })
            .catch((error) => {
            
            })
            }
            
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
                'EmployerName': this.state.companyName,
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


  setWorkFromHome(event) {
        this.setState({
            workFromHome: event.target.checked
        });
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
        
        var company_id, companyID; 
        if (document.querySelector('#companyName option[value="' + value + '"]')) {
          company_id = document.querySelector('#companyName option[value="' + value + '"]').getAttribute("data-value")
          companyID = document.querySelector('#companyName option[value="' + value + '"]').getAttribute("data-id")
        }else{company_id = ""; companyID = "" }

         
        var selectedCompany = this.state.companylist.filter((val)=>{
          if (val._id ==company_id) {
            return val;
          }
        })
        console.log(selectedCompany)

        if (selectedCompany[0]) {

          this.setState({ branchArray : selectedCompany[0].locations })

          var city = _.uniq(selectedCompany[0].locations, 'district')
        
          this.setState({company_id :company_id, companyID: companyID, companyName : selectedCompany[0].companyName, city: city, });

        }else{ 
          this.setState({company_id :company_id, companyID: companyID, companyName : value });

        }
        
    } 
    handleChangeBranch(event){
      var value = event.currentTarget.value;
      var name  = event.currentTarget.name;
      if (document.querySelector('#branch option[value="' + value + '"]')) {
        console.log(document.querySelector('#branch option[value="' + value + '"]').getAttribute("data-country"))
      
        var locationname = document.querySelector('#branch option[value="' + value + '"]').getAttribute("branch_location");
        var locationId = document.querySelector('#branch option[value="' + value + '"]').getAttribute("branch_location_id");
        var locationType = document.querySelector('#branch option[value="' + value + '"]').getAttribute("data_locationType");
        
        this.setState({
          [name]      : value,
          "branchCode" : document.querySelector('#branch option[value="' + value + '"]').getAttribute("data-branchcode"),
          "companyState" : document.querySelector('#branch option[value="' + value + '"]').getAttribute("data-statecode"),
          "companyCountry" : document.querySelector('#branch option[value="' + value + '"]').getAttribute("data-country"),
          "countryCode" : document.querySelector('#branch option[value="' + value + '"]').getAttribute("data-countrycode"),
          "workLocation" : locationname,
          "workLocationId" :locationId,
          "locationType" :locationType
        })
      }else{
        this.setState({ [name]      : value })
      }
    }
    handleChangeState(event){
      var value = event.currentTarget.value;
      var name  = event.currentTarget.name;
        this.setState({
          [name]      : value,
          "stateName" : event.currentTarget.getAttribute("state")
        });
    }
  render() {
    return (
      
      <section className="col-lg-12 registrationFormWrapper">
         <div className="img1LoginSU">
              <img src="/images/Sign_In/1.png" alt="img1Login" className="img1oginInnerSU"/>
          </div>

           <div className="img2LoginSU">
              <img src="/images/Sign_In/2.png" alt="img2Login" className="img2loginInnerSU"/>
          </div>

           <div className="img3LoginSU">
              <img src="/images/Sign_In/3.png" alt="img3Login" className="img3loginInnerSU"/>
          </div>

           <div className="img4LoginSU">
              <img src="/images/Sign_In/4.png" alt="img4Login" className="img4loginInnerSU"/>
          </div>

           <div className="img5LoginSU">
              <img src="/images/Sign_In/5.png" alt="img5Login" className="img5loginInnerSU"/>
          </div>

           <div className="img6LoginSU">
              <img src="/images/Sign_In/6.png" alt="img6Login" className="img6loginInnerSU"/>
          </div>
          <div className="registrationForm col-lg-4 col-lg-offset-4">
            <form>
              <div className="signUpTitle col-lg-12">Sign Up</div>

             {/* <div className="row">
                <hr className="registrationHr"/>
              </div>*/}
             
              
                <div className="col-lg-10 col-lg-offset-1 form-group" >
                  <div className="input-group autocomplete">
                    <span className="input-group-addon registrationInputIcon"><i className="fa fa-briefcase"></i></span>
                    <input type="text" list="companyName" className="form-control inputBox" refs="industry" placeholder="Company Name"
                    name="companyName" id="selectCompany" maxLength="100" value={this.state.companyName} data-value={this.state.company_id}
                    onChange={this.onChangeCompany.bind(this)} />
                    <datalist name="companyName" id="companyName" className="companylist" >
                        { this.state.companylist.map((item, key) =>
                            <option key={key} value={item.companyName} data-value={item._id} data-id={item.companyID}/>
                        )}
                    </datalist>
                  </div>
                  <span id="employerError" className="errorMsg"></span>
                </div>
              
            
              <div className="col-lg-10 col-lg-offset-1 form-group">
                {/*<label htmlFor="branch" className="nameTitleForm">
                   City
                  <sup className="nameTitleFormStar">*</sup>
                </label>*/}
                <div className="input-group ">
                  <span className="input-group-addon registrationInputIcon"><i className="fa fa-map-marker"></i></span> 
                  <input type="text" list="branch" className="form-control registrationInputBox" value={this.state.branch}  placeholder="Branch" ref="branch" name="branch"
                   id="selectCompanyCity" maxLength="100" value={this.state.branch}
                    onChange={this.handleChangeBranch.bind(this)} />
                    <datalist name="branch" id="branch" className="branch" >
                        { this.state.branchArray.map((elem, key) =>
                            <option key={key} branch_location_id={elem._id} branch_location={(elem.addressLine2 ? elem.addressLine2 : "") +" "+(elem.addressLine1)} 
                            value={((elem.locationType).match(/\b(\w)/g)).join('')+ "-"+ elem.area + elem.city + ","+ elem.stateCode+ "-"+ elem.countryCode} 
                            data-branchcode ={elem.branchCode} data_locationType={elem.locationType}  
                            data-statecode={elem.stateCode} data-state={elem.state} 
                            data-country={elem.country} data-countrycode={elem.countryCode} />
                        )}
                    </datalist>                  
                </div> 
                <span id="branchError" className="errorMsg"></span>
              </div>

              <div className="col-lg-10 col-lg-offset-1 form-group">
                
                <div className="input-group ">
                  <span className="input-group-addon registrationInputIcon"><i className="fa fa-map-marker"></i></span>  
                  
                  <select id="states" className="form-control registrationInputBox selectOption"
                    ref="companyState" value={this.state.companyState} name="companyState" onChange={this.handleChangeState.bind(this)} >
                    <option selected={true}>-- Select State --</option>
                    {
                      this.state.stateArray && this.state.stateArray.length > 0 ?
                        this.state.stateArray.map((stateData, index) => {
                          return (
                            <option key={index} statecode={stateData.stateCode} state={this.camelCase(stateData.stateName)} value={stateData.stateCode}>{this.camelCase(stateData.stateName)}</option>
                          );
                        }
                        ) : ''
                    }
                  </select> 
                </div> 
                <span id="stateError" className="errorMsg"></span>
              </div>
              <div className="col-lg-10 col-lg-offset-1 form-group">
                {/*<label htmlFor="companyCountry" className="nameTitleForm">
                   Country
                    <sup className="nameTitleFormStar">*</sup>
                </label>*/}
                <div className="input-group ">
                  <span className="input-group-addon registrationInputIcon"><i className="fa fa-map-marker"></i></span> 
                  <input type="text" name="companyCountry" id="companyCountry" placeholder="Country"
                   className="form-control registrationInputBox " value={this.state.companyCountry}
                   onChange={this.handleChange.bind(this)} />
                </div> 
                <span id="companyCountryError" className="errorMsg"></span>
              </div>
            
              
                <div className="col-lg-10 col-lg-offset-1 form-group" >
                    <div className="input-group">
                        <span className="input-group-addon registrationInputIcon"><i className="fa fa-user"></i></span>
                        <input type="text" id="firstName" name="firstName" placeholder="First Name" value={this.state.firstName} onChange={this.handleChange.bind(this)} className="form-control registrationInputBox"/>
                    </div>
                     <span id="firstNameError" className="errorMsg"></span>
                </div>

                <div className="col-lg-10 col-lg-offset-1 form-group" >
                    <div className="input-group">
                        <span className="input-group-addon registrationInputIcon"><i className="fa fa-user"></i></span>
                        <input type="text" id="lastName" name="lastName" placeholder="Last Name" value={this.state.lastName} onChange={this.handleChange.bind(this)} className="form-control registrationInputBox"/>
                    </div>
                     <span id="lastNameError" className="errorMsg"></span>
                </div>
            
                <div className="col-lg-10 col-lg-offset-1 form-group" >
                    <div className="input-group">
                        <span className="input-group-addon registrationInputIcon1"><i className="fa fa-envelope"></i></span>
                        <input type="email" id="emailAddress" name="emailAddress" placeholder="Email Address" value={this.state.emailAddress} onChange={this.handleChange.bind(this)} className="form-control registrationInputBox"/>
                    </div>
                     <span id="emailAddressError" className="errorMsg"></span>
                </div>

                <div className="col-lg-10 col-lg-offset-1 form-group" >
                  <PhoneInput 
                    country   = {'in'}
                    id        ="mobileNumber" 
                    className ="input-group-addon form-control inputBox" 
                    value     ={this.state.mobileNumber} 
                    onChange  = {mobileNumber => this.setState({ mobileNumber })}
                  />
                  <span id="mobileNumberError" className="errorMsg"></span>
                </div>
              
                <div className="col-lg-10 col-lg-offset-1 form-group">
                  <div className="input-group">
                      <span className="input-group-addon registrationInputIcon"><i className="fa fa-lock"></i></span>
                      <input type="password" id="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange.bind(this)} className="form-control registrationInputBox"/>
                        <span className="input-group-addon loginInputIcon3" onClick={this.showPassword1.bind(this)}>
                          <i className={this.state.showPassword1 ? "fa fa-eye-slash" : "fa fa-eye"} value={this.state.showPassword1}></i>
                        </span>
                  </div>
                  <span id="passwordError" className="errorMsg"></span>
                </div>

                <div className="col-lg-10 col-lg-offset-1 form-group ">
                    <div className="input-group">
                      <span className="input-group-addon registrationInputIcon"><i className="fa fa-lock"></i></span>
                      <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.handleChange.bind(this)} className="form-control registrationInputBox"/>
                      <span className="input-group-addon loginInputIcon3" onClick={this.showPassword2.bind(this)}>
                         <i className={this.state.showPassword2 ? "fa fa-eye-slash" : "fa fa-eye"} value={this.state.showPassword2}></i>
                      </span>
                    </div>
                     <span id="confirmPasswordError" className="errorMsg"></span>
                </div>
            
                <div className="col-lg-10 col-lg-offset-1" >
                      <div className="col-lg-6">
                        <div className="row">
                          <label htmlFor="workFromHome" className="agreeTC">
                          
                            <input type="checkbox" name="workFromHome" className="checkmark2" id="workFromHome" value={this.state.workFromHome} onChange={this.setWorkFromHome.bind(this)} />
                          
                             <div className="textTC"> I agree to the <br/>Terms & Conditions</div>
                          </label>
                        </div>  
                      </div>

                      <div className="col-lg-6  buttonWrapper">
                        <div className="row">
                          <button className="btn col-lg-12 buttonSignUp" onClick={this.usersignup.bind(this)}>Sign Up >></button>
                        </div>
                      </div>
                </div>    

                <div className="col-lg-10 col-lg-offset-1 registrationLinks" >
                  <a className="alreadyAccount col-lg-4 col-lg-offset-6" href="/login"><u>Sign In >></u></a>
                </div>


          </form>
        </div>
      </section>
    );
  }
}
export default SignUp;
