import React, { Component } from 'react';
import "./SelectCompanyPage.css";
import SignUp from "../blocks/SignUp/SignUp.js";
import ProgressBarSignUp from "../blocks/ProgressBarSignUp/ProgressBarSignUp.js";

class EmpSignUpPage extends Component {
constructor() {
    super();
    this.state = {

    }	
}	
render() {
    return (
    	<section className="signUpFormMainWrapper">
            <div className="col-lg-4 col-lg-offset-4 signUpBoxWrapper">
                <div className="row">
                    <ProgressBarSignUp/>
                </div>
                <div className="row">   
                    <div className="signUpBoxTitle">Sign Up</div>
                </div>
                <div className="row">  
                    <SignUp />
                </div>
            </div>
        </section>
    );
}

}
export default EmpSignUpPage;