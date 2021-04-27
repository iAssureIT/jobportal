import React, { Component } from 'react';
import "./SelectCompanyPage.css";
import SelectCompany from "../blocks/SelectCompany/SelectCompany.js";
import ProgressBarSignUp from "../blocks/ProgressBarSignUp/ProgressBarSignUp.js";

class SelectCompanyPage extends Component {
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
                    <div className="signUpBoxTitle">Select Company</div>
                </div>
                <div className="row">  
                    <SelectCompany />
                </div>
            </div>
        </section>
    );
}

}
export default SelectCompanyPage;