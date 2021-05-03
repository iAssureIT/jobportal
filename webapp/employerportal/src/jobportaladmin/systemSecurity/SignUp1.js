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
        firstName       :"",
        lastName        :"",
        email           :"",
        confirmPassword :"",
        password        :"",
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
                        <span id="emailError" className="errorMsg"></span>
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
                        <span id="mobileError" className="errorMsg"></span>
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
                        <button className="buttonNext pull-right">
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


