import React, { Component }  from 'react';
import { FontAwesomeIcon }   from '@fortawesome/react-fontawesome';
import "./SelectCompany.css";

class SelectCompany extends Component {
constructor() {
    super();
    this.state = {
        companyName     :"",
        companyBranch   :"",
        companyState    :"",
        companyCountry  :"",
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
handleSubmit(event){
    event.preventDefault();
    this.props.history.push("/empsignuppage/");
}
render() {
    return (
            <form className="signUpBoxFormWrapper">
                <div className="signUpBoxTitle">Select Company</div>
                <div className="row signUpBoxForm">
                    <div className="col-lg-10 col-lg-offset-1">
                        <div className="input-group ">
                            <input type="text" name="companyName" id="companyName" 
                             className="form-control inputBox" placeholder="Start typing your Company & Select"
                             value={this.state.companyName}
                             onChange={this.handleChange.bind(this)}/>
                        </div> 
                        <span id="companyNameError" className="errorMsg"></span>
                    </div>
                </div>
                <div className="row signUpBoxForm">
                    <div className="col-lg-10 col-lg-offset-1">
                        <div className="input-group ">
                            <input type="text" name="companyBranch" id="companyBranch" 
                             className="form-control inputBox" placeholder="Company Branch"
                             value={this.state.companyBranch}
                             onChange={this.handleChange.bind(this)}/>
                        </div> 
                        <span id="companyBranchError" className="errorMsg"></span>
                    </div>
                </div>
                <div className="row signUpBoxForm">
                    <div className="col-lg-10 col-lg-offset-1">
                        <div className="input-group ">
                            <input type="text" name="companyState" id="companyState" 
                             className="form-control inputBox" placeholder="Company State"
                             value={this.state.companyState}
                             onChange={this.handleChange.bind(this)}/>
                        </div> 
                        <span id="companyStateError" className="errorMsg"></span>
                    </div>
                </div>
                <div className="row signUpBoxForm">
                    <div className="col-lg-10 col-lg-offset-1">
                        <div className="input-group ">
                            <input type="text" name="companyCountry" id="companyCountry" 
                             className="form-control inputBox" placeholder="Company Country"
                             value={this.state.companyCountry}
                             onChange={this.handleChange.bind(this)}/>
                        </div> 
                        <span id="companyCountryError" className="errorMsg"></span>
                    </div>
                </div>
                <div className="row signUpBoxForm">
                    <div className="col-lg-10 col-lg-offset-1">
                        <button className="buttonNext pull-right" onClick={this.handleSubmit.bind(this)}>
                            Next 
                            <FontAwesomeIcon className="nextArrow" icon="angle-double-right" />
                        </button>
                    </div>
                </div>
            </form>
     
    );
}

}
export default SelectCompany;