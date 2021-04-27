import React, { Component } from 'react';
import "./SelectCompanyPage.css";
import SelectPackage from "../blocks/SelectPackage/SelectPackage.js";
import ProgressBarSignUp from "../blocks/ProgressBarSignUp/ProgressBarSignUp.js";

class SelectPackagePage extends Component {
constructor() {
    super();
    this.state = {

    }	
}	
render() {
    return (
    	<section className="signUpFormMainWrapper">
            <div className="col-lg-8 col-lg-offset-2 signUpBoxWrapper">
                <div className="row">
                    <ProgressBarSignUp/>
                </div>
                <div className="row">   
                    <div className="signUpBoxTitle">Select Package</div>
                </div>
                <div className="row">  
                    <SelectPackage />
                </div>
            </div>
        </section>
    );
}

}
export default SelectPackagePage;