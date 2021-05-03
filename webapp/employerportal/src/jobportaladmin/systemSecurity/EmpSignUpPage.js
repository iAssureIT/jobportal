import React, { Component } from 'react';
import "./SelectCompanyPage.css";
import SignUp from "./SignUp1.js";
import SelectCompany     from "./SelectCompany.js";
import SelectPackage     from "./SelectPackage.js";

class EmpSignUpPage extends Component {
constructor() {
    super();
    this.state = {
      showHide1: true,
      showHide2: false,
      showHide3: false
    };
    this.hideComponent = this.hideComponent.bind(this);
}
 hideComponent(name) {
    console.log(name);
    switch (name) {
      case "showHide1":
        this.setState({ 
                    showHide1: true,
                    showHide2: false,
                    showHide3: false,
                });
        break;
      case "showHide2":
        this.setState({ 
                    showHide2: true ,
                    showHide1: false,
                    showHide3: false,
                });
        break;
      case "showHide3":
        this.setState({ 
                    showHide3: true,
                    showHide2: false,
                    showHide1: false,
                });
        break;
      default:
      case "showHide1":
      this.setState({ 
                    showHide1: true,
                    showHide2: false,
                    showHide3: false,
                });
        break;
    }
  }	

render() {
    const { showHide1, showHide2, showHide3 } = this.state;
    return (
    	<section className="signUpFormMainWrapper">
            <div className={showHide3 ?"col-lg-8 col-lg-offset-2 signUpBoxWrapper signUpBoxWrapper1":"col-lg-4 col-lg-offset-4 signUpBoxWrapper "}>
                <div className="row">
                    <div className="ProgressBarSignUpWrapper">
                        <div className="row progressBar">
                            <div className="step col-lg-4">
                                <a  onClick={() => this.hideComponent("showHide1")}>
                                    <div className={(showHide1) ||(showHide2)||(showHide3)

                                                    ?
                                                        "bullet active"
                                                    :
                                                        "bullet"
                                                    }>
                                        1
                                    </div>
                                </a>
                            </div>
                            <div className="step col-lg-4">
                                <a  onClick={() => this.hideComponent("showHide2")}>
                                <div className={(showHide2)||(showHide3)
                                                ?
                                                    "bullet active"
                                                :
                                                    "bullet"
                                                }>
                                    2
                                </div>
                                </a>
                            </div>
                            <div className="step col-lg-4" >
                                <a onClick={() => this.hideComponent("showHide3")}>
                                    <div className={(showHide3)?"bullet active":"bullet"}>
                                        3
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row"> 
                    {showHide1 && <SelectCompany hideComponent = {this.hideComponent.bind(this)} />}
                </div>
                <div className="row"> 
                    {showHide2 && <SignUp hideComponent = {this.hideComponent.bind(this)} />}
                </div>
                <div className="row"> 
                    {showHide3 && <SelectPackage hideComponent = {this.hideComponent.bind(this)} />}
                </div>
            </div>
        </section>
    );
}

}
export default EmpSignUpPage;