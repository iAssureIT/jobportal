import React, { Component }  from 'react';
import { FontAwesomeIcon }   from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import axios                 from 'axios';
import PhoneInput           from 'react-phone-input-2';
import { connect }           from 'react-redux';
import { bindActionCreators }   from 'redux';
import  * as mapActionCreator   from '../common/actions/index';
import "./SelectCompany.css";

class SignUp extends Component {
constructor() {
    super();
    this.state = {
        checkTC: false,
        showPassword1         : false,
        showPassword2         : false,
        firstName             : "",
        lastName              : "",
        password              : "",
        confirmPassword       : "",
        email          : "",
        mobile          : "",
        value                 : '',
    }	
}	
componentDidMount(){
  console.log(this.props)
}
handleChange(event){
    event.preventDefault();
    var value = event.currentTarget.value;
    var name  = event.currentTarget.name;

    this.setState({
        [name]:value,
    })
}
changeMobile(event) {
    console.log(event)
    this.setState({
      mobile: event
    }, () => {
      console.log(this.state.mobile)
      
    })
}
setWorkFromHome(event) {
        this.setState({
            checkTC: event.target.checked
        });
         console.log("tc==",this.state.checkTC);
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
    var status = false;
    var regName = /^[a-zA-Z]+$/;
    var first_name=this.state.firstName;
    var last_name=this.state.lastName;
    var tempEmail = this.state.email.trim(); // value of field with whitespace trimmed off
    var emailFilter = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var illegalChars = /[\(\)\<\>\,\;\:\\\"\[\]]/;
    var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{5})[-. ]?([0-9]{5})$/;
    var statusFN=false;
    var statusLN=false;
    var statusEmail=false;
    var statusPhone=false;
    var statusPwd=false;
    var statusCPwd=false;
    var statusPwd2=false;
    var statusCTC=false;

    if(first_name.length<=0)  {
 
      document.getElementById("firstNameError").innerHTML=  
      "Please enter valid Name!";  
      statusFN=false; 
    }
  
    else if(!regName.test(first_name)){
      document.getElementById("firstNameError").innerHTML=  
      "Please enter valid name,......";  
      statusFN=false; 
      console.log("firstname",this.state.firstName);
    }
    else{
      document.getElementById("firstNameError").innerHTML=  
       ""; 
      statusFN = true;
      
    }

    if(last_name.length<=0)  {
      document.getElementById("lastNameError").innerHTML=  
      "Please enter valid Name";  
      statusLN=false; 
    }
    else if(!regName.test(last_name)){
      document.getElementById("lastNameError").innerHTML=  
      "Please enter valid name.....";  
      statusLN=false; 
    }
    else{
      document.getElementById("lastNameError").innerHTML=  
       ""; 
      statusLN = true;

    }

    if(this.state.email.length<=0){
      document.getElementById("emailError").innerHTML=  
      "Please enter your Email";  
      statusEmail=false; 
    }else if (
      !emailFilter.test(tempEmail)) { //test email for illegal characters
          document.getElementById('emailError').innerHTML = "Please enter a valid email address.";
      } else{
      document.getElementById("emailError").innerHTML=
      ""; 
      statusEmail = true;
    }

    if(this.state.mobile.match(phoneno)){
      console.log("mobile",this.state.mobile);
       document.getElementById("mobileError").innerHTML=
      ""; 
      statusPhone = true;
      
    }else{
      document.getElementById("mobileError").innerHTML=  
      "Please enter valid Mobile Number";  
      statusPhone=false; 
    }

     if(this.state.password.length <=0) {
       document.getElementById("passwordError").innerHTML=  
          ""; 
      document.getElementById("passwordError").innerHTML=  
          "Please enter Password";  
          statusPwd=false; 
    } 
     if (this.state.password.length<8) {
      document.getElementById("passwordError").innerHTML=  
                "Please enter atleast 8 characters";  
                statusPwd=false; 
    } else {
       document.getElementById("passwordError").innerHTML=  
          ""; 
          statusPwd = true;
     
    }
        if(this.state.confirmPassword.length<=0){
          document.getElementById("confirmPasswordError").innerHTML=  
          ""; 
          document.getElementById("confirmPasswordError").innerHTML=  
          "Please enter Confirm Password";  
          statusCPwd=false; 
        }

         if(this.state.confirmPassword.length<8){
          document.getElementById("confirmPasswordError").innerHTML=  
          "Please enter atleast 8 characters";  
          statusCPwd=false; 
        }
        else{
          document.getElementById("confirmPasswordError").innerHTML=  
          ""; 
          statusCPwd = true;
        }

        if ((this.state.password) != (this.state.confirmPassword)){
          document.getElementById("passwordError").innerHTML=  
          "Passwords do not match";  
          document.getElementById("confirmPasswordError").innerHTML=  
          "Passwords do not match"; 
          statusPwd2=false; 
        }
        else{
           document.getElementById("passwordError").innerHTML=  
          "";  
          document.getElementById("confirmPasswordError").innerHTML=  
          ""; 

          statusPwd2=true;
        }

        if(this.state.checkTC == true){
          statusCTC= true;
        }
        if (this.state.checkTC == false) {
          Swal.fire('', "Please accept Term and Conditions", '');
          statusCTC =false;
        }
      
        console.log("all......",statusFN,statusLN,statusEmail,statusPhone,statusPwd,statusCPwd,statusPwd2,statusCTC);

        if(statusFN==true && statusLN==true && 
          statusEmail==true && statusPhone ==true && 
          statusPwd==true && statusCPwd==true && 
          statusCTC==true){
         
          status= true;
        }
        else{
          status=false;
        }
        console.log("End.....",status);
        return status;
        
        } 
        signUp(event){
            event.preventDefault();
            var status =  this.validateForm();
            console.log(status);
            var {mapAction} = this.props;
            console.log(this.props.selectedCompanyDetails)
            var selectedCompanyDetails = this.props.selectedCompanyDetails

        if(status == true){
           //this.props.hideComponent("showHide3") 
            var auth = {
                username    : "MOBILE",
                firstname   : this.state.firstName, 
                lastname    : this.state.lastName,
                mobNumber   : (this.state.mobile).replace("-", ""),
                email       : this.state.email,
                pwd         : this.state.password,
                company_id  : selectedCompanyDetails.company_id != "" ? selectedCompanyDetails.company_id : null,
                companyID   : selectedCompanyDetails.companyID != "" ? selectedCompanyDetails.companyID : null,
                companyName : selectedCompanyDetails.companyName,
                branch_id   : selectedCompanyDetails.branch_id == "" ? 0 : selectedCompanyDetails.branch_id,
                branchCode  : selectedCompanyDetails.branchCode == "" ? 0 : selectedCompanyDetails.branchCode,
                workLocation: selectedCompanyDetails.city,
                city        : selectedCompanyDetails.city, 
                stateName   : selectedCompanyDetails.stateName,
                stateCode   : selectedCompanyDetails.stateCode,
                country     : selectedCompanyDetails.country,
                countryCode : selectedCompanyDetails.countryCode,
                role        : selectedCompanyDetails.role,
                status      : selectedCompanyDetails.status,        
                
            }
            console.log("auth",auth) 
            axios.post('/api/auth/post/signup/user/otp', auth)
            .then((response) => {
              if(response.data.message == 'USER_CREATED'){
                mapAction.setUserID(response.data.ID) 

                mapAction.setUserCredentials({ username : (this.state.mobile).replace("-", ""), password: this.state.password })
                
                Swal.fire({
                        title       : ' ',
                        html        : 'Great, Information submitted successfully &<br />OTP is sent to your registered Email',
                        text        : '', 
                      })
                
                localStorage.setItem('previousUrl' ,'signup');
                if(this.state.branchCode == ""){
                    
                }else{
                  var contactData = { 
                  'entityID'              : selectedCompanyDetails.company_id,
                  'contactDetails'        : {
                    "branchCode" : selectedCompanyDetails.branchCode,
                    "branchName" : selectedCompanyDetails.companyName,
                    "locationType" : selectedCompanyDetails.locationType,
                    "firstName" : this.state.firstName,
                    "lastName" : this.state.lastName,
                    "phone" : (this.state.mobile).replace("-", ""),
                    "email" : this.state.email,
                    "createUser" : true,
                    "role" : selectedCompanyDetails.role,
                    "userID" : response.data.ID
                  }
                }
                axios.patch('/api/entitymaster/patch/addContact' ,contactData)
                .then((response) => {
                    if(response.data.duplicated)
                    {
                      Swal.fire('', "Contact already exists", '');

                    }else{
                        this.props.hideComponent("showHide3")
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
                
                /*axios.post('/api/masternotifications/post/sendNotification', sendData)
                  .then((notificationres) => {})
                  .catch((error) => { console.log('notification error: ', error) })
                
                var sendData2 = {
                  "event": "Event2", //Event Name
                  "toUser_id": response.data.ID, //To user_id(ref:users)
                  "variables": {
                    'UserName': this.state.firstName + ' ' + this.state.lastName,
                    'EmployerName': this.state.companyName,
                    'EmployerID': this.state.employerID,
                    'EmployerEmailID': this.state.email,
                    'EmployerContactNumber': (this.state.mobile).replace("-", "")
                  }
                }
                axios.post('/api/masternotifications/post/sendNotification', sendData2)
                  .then((notificationres) => {})
                  .catch((error) => { console.log('notification error: ', error) })  
                */
                
                //this.props.history.push("/confirm-otp/" + response.data.ID);
                
              }else{
                Swal.fire("",response.data.message, "");
              } 
            })
            .catch((error) => {
              
            }) 
        }

    }        
render() {
    //console.log(this.props.selectedCompanyDetails)
    return (
            <form className="signUpBoxFormWrapper">

             <div className="img1EmpSignUp">
                <img src="/images/Sign_In/1.png" alt="img1EmpSignUp" className="img1oginInner"/>
            </div>

           <div className="img2EmpSignUp">
              <img src="/images/Sign_In/2.png" alt="img2EmpSignUp" className="img2EmpSignUpInner"/>
          </div>

           <div className="img3EmpSignUp">
              <img src="/images/Sign_In/3.png" alt="img3EmpSignUp" className="img3EmpSignUpInner"/>
          </div>

           <div className="img4EmpSignUp">
              <img src="/images/Sign_In/4.png" alt="img4EmpSignUp" className="img4EmpSignUpInner"/>
          </div>

           <div className="img5EmpSignUp">
              <img src="/images/Sign_In/5.png" alt="img5EmpSignUp" className="img5EmpSignUpInner"/>
          </div>

           <div className="img6EmpSignUp">
              <img src="/images/Sign_In/6.png" alt="img6EmpSignUp" className="img6EmpSignUpInner"/>
          </div>
                <div className="signUpBoxTitle">Sign Up</div> 
                <div className=" signUpBoxForm">
                    <div className="col-lg-5 col-lg-offset-1 form-group">

                        <div className="input-group ">
                            <span className="input-group-addon registrationInputIcon">
                                <i className="fa fa-user-circle"></i> 
                            </span> 
                            <input type="text" name="firstName" id="firstName" 
                             className="form-control inputBox" placeholder="First Name"
                             value={this.state.firstName}
                             onChange={this.handleChange.bind(this)}/>
                        </div> 
                        <span id="firstNameError" className="errorMsg"></span>
                    </div>
                    <div className="col-lg-5  form-group">
                        <div className="input-group ">

                            <span className="input-group-addon registrationInputIcon">
                                <i className="fa fa-user-circle"></i> 
                            </span>

                            <input type="text" name="lastName" id="lastName" 
                             className="form-control inputBox" placeholder="Last Name"
                             value={this.state.lastName}
                             onChange={this.handleChange.bind(this)}/>
                        </div> 
                        <span id="lastNameError" className="errorMsg"></span>
                    </div>
                </div>
                <div className=" signUpBoxForm">
                    <div className="col-lg-10 col-lg-offset-1 form-group">
                        <div className="input-group ">

                            <span className="input-group-addon registrationInputIcon">
                                <i className="fa fa-envelope-o"></i> 
                            </span> 
                            <input type="text" name="email" id="email" 
                             className="form-control inputBox inputBox1" placeholder="Email"
                             value={this.state.email}
                             onChange={this.handleChange.bind(this)}/>
                        </div> 
                        <span id="emailError" className="errorMsg"></span>
                    </div>
                </div>

                <div className="signUpBoxForm">
                    <div className="col-lg-10 col-lg-offset-1 form-group">
                        
                            <PhoneInput 
                              country   = {'in'}
                              id        ="mobile" 
                              className ="input-group-addon form-control inputBox" 
                              value     ={this.state.mobile} 
                              onChange={this.changeMobile.bind(this)}
                              //onChange  = {mobile => this.setState({ mobile })}
                             />
                        
                        <span id="mobileError" className="errorMsg"></span>
                    </div>
                </div>

                <div className=" signUpBoxForm">
                    <div className="col-lg-10 col-lg-offset-1 form-group">
                        <div className="input-group ">

                            <span className="input-group-addon registrationInputIcon"><i className="fa fa-lock"></i></span>

                            <input type="password" name="password" id="password" 
                             className="form-control inputBox" placeholder="Password"
                             value={this.state.password}
                             onChange={this.handleChange.bind(this)}/>
                             <span className="input-group-addon loginInputIcon3" onClick={this.showPassword1.bind(this)}>
                                  <i className={this.state.showPassword1 ? "fa fa-eye-slash" : "fa fa-eye"} 
                                      value={this.state.showPassword1}></i></span>
                        </div> 
                        <span id="passwordError" className="errorMsg"></span>
                    </div>

                  </div>
                  
                  <div className="signUpBoxForm">  
                    <div className="col-lg-10 col-lg-offset-1 form-group">
                        <div className="input-group ">

                            <span className="input-group-addon registrationInputIcon"><i className="fa fa-lock"></i></span>

                            <input type="password" name="confirmPassword" id="confirmPassword" 
                             className="form-control inputBox" placeholder="Confirm Password"
                             value={this.state.confirmPassword}
                             onChange={this.handleChange.bind(this)}/>
                             <span className="input-group-addon loginInputIcon3" onClick={this.showPassword2.bind(this)}>
                                   <i className={this.state.showPassword2 ? "fa fa-eye-slash" : "fa fa-eye"} 
                                    value={this.state.showPassword2}></i></span>
                        </div> 
                        <span id="confirmPasswordError" className="errorMsg"></span>
                    </div>
                </div>
                <div className=" signUpBoxForm">
                    <div className="col-lg-10 col-lg-offset-1">

                        <div className="col-lg-6">
                          <div className="row">
                            <label htmlFor="checkTC" className="agreeTC container">
                            
                              <input type="checkbox" name="checkTC" className="checkmark3" id="checkTC" value={this.state.checkTC} onChange={this.setWorkFromHome.bind(this)} />
                            
                               <div className="textTC"> I agree to the <br/>Terms & Conditions</div>
                            </label>
                          </div>
                        </div>

                        <button className="buttonNext col-lg-5 pull-right" onClick={this.signUp.bind(this)}>
                            Sign Up
                        </button>
                    </div>
                </div>
            </form>
     
    );
}

}
const mapStateToProps = (state)=>{ 
    return {
        selectedCompanyDetails  : state.selectedCompanyDetails
    }
}
const mapDispatchToProps = (dispatch) => ({
  mapAction :  bindActionCreators(mapActionCreator, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps) (SignUp);


