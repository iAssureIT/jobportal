import React, { Component }  from 'react';
import { FontAwesomeIcon }   from '@fortawesome/react-fontawesome';
import swal                  from 'sweetalert';
import axios                 from 'axios';
import { connect }           from 'react-redux';
import { bindActionCreators }   from 'redux';
import  * as mapActionCreator   from '../common/actions/index';
import "./SelectCompany.css";

class SignUp extends Component {
constructor() {
    super();
    this.state = {
        showPassword1         : false,
        showPassword2         : false,
        firstName             : "",
        lastName              : "",
        password              : "",
        confirmPassword       : "",
        emailAddress          : "",
        mobileNumber          : "",
        value                 : '',
    }	
}	
handleChange(event){
    event.preventDefault();
    var value = event.currentTarget.value;
    var name  = event.currentTarget.name;

    this.setState({
        [name]:value,
    })
}
validateForm=()=>{
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
    var firstName=this.state.firstName;
    var lastName=this.state.lastName;
    var tempEmail = this.state.emailAddress.trim(); // value of field with whitespace trimmed off
    var emailFilter =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var illegalChars = /[\(\)\<\>\,\;\:\\\"\[\]]/;
    var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{5})[-. ]?([0-9]{5})$/;
    
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
    signUp(event){
        event.preventDefault();
        var status =  this.validateForm();
        var {mapAction} = this.props;
        console.log(this.props.selectedCompanyDetails)
        var selectedCompanyDetails = this.props.selectedCompanyDetails

        if(status == true){
            var auth = {
                username    : "EMAIL",
                firstname   : this.state.firstName, 
                lastname    : this.state.lastName,
                mobNumber   : (this.state.mobileNumber).replace("-", ""),
                email       : this.state.emailAddress,
                pwd         : this.state.password,
                company_id  : selectedCompanyDetails.company_id != "" ? selectedCompanyDetails.company_id : null,
                //companyID   : this.state.companyID != "" ? this.state.companyID : null,
                // companyName : this.state.companyName,
                // branchCode  : this.state.branchCode == "" ? 0 : this.state.branchCode,
                // role        : 'employer',
                // status      : 'unverified',        
                // city        : this.state.branch,
                // stateName   : this.state.stateName,
                // stateCode   : this.state.companyState,
                // country     : this.state.companyCountry,
                // countryCode : this.state.countryCode,
            }
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
render() {
    console.log(this.props.selectedCompanyDetails)
    return (
            <form className="signUpBoxFormWrapper">
                <div className="signUpBoxTitle">Sign Up</div> 
                <div className="row signUpBoxForm">
                    <div className="col-lg-5 col-lg-offset-1">
                        <div className="input-group ">
                            <input type="text" name="firstName" id="firstName" 
                             className="form-control inputBox" placeholder="First Name"
                             value={this.state.firstName}
                             onChange={this.handleChange.bind(this)}/>
                        </div> 
                        <span id="firstNameError" className="errorMsg"></span>
                    </div>
                    <div className="col-lg-5 ">
                        <div className="input-group ">
                            <input type="text" name="lastName" id="lastName" 
                             className="form-control inputBox" placeholder="Last Name"
                             value={this.state.lastName}
                             onChange={this.handleChange.bind(this)}/>
                        </div> 
                        <span id="lastNameError" className="errorMsg"></span>
                    </div>
                </div>
                <div className="row signUpBoxForm">
                    <div className="col-lg-10 col-lg-offset-1">
                        <div className="input-group ">
                            <input type="text" name="email" id="email" 
                             className="form-control inputBox" placeholder="Email"
                             value={this.state.email}
                             onChange={this.handleChange.bind(this)}/>
                        </div> 
                        <span id="emailAddressError" className="errorMsg"></span>
                    </div>
                </div>
                <div className="row signUpBoxForm">
                    <div className="col-lg-10 col-lg-offset-1">
                        <div className="input-group ">
                            <input type="text" name="mobile" id="mobile" 
                             className="form-control inputBox" placeholder="Mobile Number"
                             value={this.state.mobile}
                             onChange={this.handleChange.bind(this)}/>
                        </div> 
                        <span id="mobileNumberError" className="errorMsg"></span>
                    </div>
                </div>
                <div className="row signUpBoxForm">
                    <div className="col-lg-5 col-lg-offset-1">
                        <div className="input-group ">
                            <input type="text" name="password" id="password" 
                             className="form-control inputBox" placeholder="Password"
                             value={this.state.password}
                             onChange={this.handleChange.bind(this)}/>
                        </div> 
                        <span id="passwordError" className="errorMsg"></span>
                    </div>
                    <div className="col-lg-5">
                        <div className="input-group ">
                            <input type="text" name="confirmPassword" id="confirmPassword" 
                             className="form-control inputBox" placeholder="Confirm Password"
                             value={this.state.confirmPassword}
                             onChange={this.handleChange.bind(this)}/>
                        </div> 
                        <span id="confirmPasswordError" className="errorMsg"></span>
                    </div>
                </div>
                <div className="row signUpBoxForm">
                    <div className="col-lg-10 col-lg-offset-1">
                        <button className="buttonNext pull-right" onClick={this.signUp.bind(this)}>
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


