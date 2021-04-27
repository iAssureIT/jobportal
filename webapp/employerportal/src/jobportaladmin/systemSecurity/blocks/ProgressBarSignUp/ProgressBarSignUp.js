import React, { Component } from 'react';
import "./ProgressBarSignUp.css";

class ProgressBarSignUp extends Component {
constructor() {
    super();
    this.state = {
        location        : window.location.pathname,
    }	
}	
render() {
    return (
		<div className="ProgressBarSignUpWrapper">
			<div className="row progressBar">
                <div className="step col-lg-4">
                    <a href="/selectcompanypage">
                        <div className={this.state.location===("/selectcompanypage")
                                        ||this.state.location===("/empsignuppage")
                                        ||this.state.location===("/select-package-page")
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
                    <a href="/empsignuppage">
                    <div className={this.state.location===("/empsignuppage")||this.state.location===("/select-package-page")
                                    ?
                                        "bullet active"
                                    :
                                        "bullet"
                                    }>
                        2
                    </div>
                    </a>
                </div>
                <div className="step col-lg-4">
                    <a href="/select-package-page">
                        <div className={this.state.location===("/select-package-page")?"bullet active":"bullet"}>
                            3
                        </div>
                    </a>
                </div>
			</div>
		</div>
    );
}

}
export default ProgressBarSignUp;