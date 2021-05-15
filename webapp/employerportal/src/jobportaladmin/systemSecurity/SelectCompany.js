import React, { Component }  from 'react';
import { FontAwesomeIcon }   from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import axios                 from 'axios';
import _                     from 'underscore';
import { connect }           from 'react-redux';
import { bindActionCreators }   from 'redux';
import  * as mapActionCreator   from '../common/actions/index';
import "./SelectCompany.css";

class SelectCompany extends Component {
constructor() {
    super();
    this.state = {
        companyName           : "",
        company_id            : "",
        companyID             : "",
        companylist           : [],
        branchArray           : [],
        city                  : [], 
        stateArray            : [],
        companyState          : "",
        companyStateCode      : "",
        companyCountry        : "",
        countryCode           : "IN",
        branch                : "",
        branch_id             : "",  
        branchCode            : "",
    } 
} 
componentDidMount() {
   
    axios.get("/api/entitymaster/get/corporate")
        .then(response => {
                this.setState({ companylist : response.data });
        })
        .catch(error => {
            Swal.fire('', "Error while getting List data", '');
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
    handleChange(event){
        event.preventDefault();
        var value = event.currentTarget.value;
        var name  = event.currentTarget.name;
     
        this.setState({
            [name]:value,
        })
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
          "companyState" : document.querySelector('#branch option[value="' + value + '"]').getAttribute("data-state"),
          "companyStateCode": document.querySelector('#branch option[value="' + value + '"]').getAttribute("data-statecode"),
          "companyCountry" : document.querySelector('#branch option[value="' + value + '"]').getAttribute("data-country"),
          "countryCode" : document.querySelector('#branch option[value="' + value + '"]').getAttribute("data-countrycode"),
          "workLocation" : locationname,
          "branch_id" :locationId,
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
          "companyState" : document.querySelector('#states option[value="' + value + '"]').getAttribute("state")
        });

        //console.log(document.querySelector('#states option[value="' + value + '"]').getAttribute("state"))
    }
    validateForm=()=>{
        var status = true;
        var regName =/^[.@&]?[a-zA-Z0-9 ]+[ !.@&()]?[ a-zA-Z0-9!()]+/;
        var regName1 = /^[a-zA-Z]+$/;
        var employer =this.state.companyName;
        var country= this.state.companyCountry;
        var statusCompany= false;
        var statusBranch= false;
        var statusState=false;
        var statusCountry=false;

        if(this.state.companyName<=0)  {
          document.getElementById("employerError").innerHTML=  
          "Please enter valid employer name";  
          statusCompany=false; 
        }
        
        else if(!regName.test(employer)){
          document.getElementById("employerError").innerHTML=  
          "Please enter valid employer name";  
          statusCompany=false; 
        }
        else{
          document.getElementById("employerError").innerHTML="";
          statusCompany = true;
        }

        if (this.state.branch == "") {
          document.getElementById("branchError").innerHTML=  
          "Please enter valid location";  
          statusBranch=false; 
        }else{
          document.getElementById("branchError").innerHTML=  "";
          statusBranch = true;
        }

        
        if (this.state.companyState == "") {
          document.getElementById("stateError").innerHTML=  
          "Please select State";  
          statusState=false; 
        }else{
          document.getElementById("stateError").innerHTML=  "";
          statusState = true;
        }

        if (this.state.companyCountry == "") {
          document.getElementById("companyCountryError").innerHTML=  
          "Please enter valid country";  
          statusCountry=false; 
        }
         else if(!regName1.test(country)){
         
          document.getElementById("companyCountryError").innerHTML=  
          "Please enter valid Country name";  
          statusCountry=false; 
        }else{
          document.getElementById("companyCountryError").innerHTML=  "";
          statusCountry = true;
        }

        if(statusCompany==true && statusBranch==true &&
            statusState==true && statusCountry==true){
            status=true;
        }
        else{
          status=false;
        }

        return status;
      }
    handleSubmit(event){
        event.preventDefault();
        var status =  this.validateForm();
        var {mapAction} = this.props;
        
        if(status == true){
  
        this.props.hideComponent("showHide2")

        var selectedCompanyDetails = {
            company_id  : this.state.company_id != "" ? this.state.company_id : null,
            companyID   : this.state.companyID != "" ? this.state.companyID : null,
            companyName : this.state.companyName,
            branch_id   : this.state.branch_id,
            branchCode  : this.state.branchCode == "" ? 0 : this.state.branchCode,
            locationType: this.state.locationType, 
            role        : 'employer',
            status      : 'unverified',        
            city        : this.state.branch,
            stateName   : this.state.companyState,
            stateCode   : this.state.companyStateCode,
            country     : this.state.companyCountry,
            countryCode : this.state.countryCode,
        }

        mapAction.selectedCompanyDetails(selectedCompanyDetails)
      }  
    }
render() {
    return (
            <form>
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
            
                <div className="signUpBoxTitle">Select Company</div>
                <div className="signUpBoxForm">
                    <div className="col-lg-10 col-lg-offset-1 form-group">
                        <div className="input-group roundCorner">
                            <span className="input-group-addon registrationInputIcon"><i className="fa fa-briefcase"></i></span>
                            <input type="text" list="companyName" name="companyName" id="companyName" 
                             className="form-control inputBox" placeholder="Start typing your Company & Select"
                             value={this.state.companyName}
                             onChange={this.onChangeCompany.bind(this)}/>
                             <datalist name="companyName" id="companyName" className="companylist" >
                                { this.state.companylist.map((item, key) =>
                                    <option key={key} value={item.companyName} data-value={item._id} data-id={item.companyID}/>
                                )}
                            </datalist>
                        </div> 
                        <span id="employerError" className="errorMsg"></span>
                    </div>
                </div>
                <div className="signUpBoxForm">
                    <div className="col-lg-10 col-lg-offset-1  form-group">
                        <div className="input-group roundCorner">
                            <span className="input-group-addon registrationInputIcon"><i className="fa fa-map-marker"></i></span> 
                            <input type="text" list="branch"  ref="branch" name="branch" 
                             className="form-control inputBox" placeholder="Branch"
                             value={this.state.branch}
                             onChange={this.handleChangeBranch.bind(this)}/>
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
                </div>
                <div className="signUpBoxForm">
                    <div className="col-lg-10 col-lg-offset-1 form-group">
                        <div className="input-group roundCorner">
                            <span className="input-group-addon registrationInputIcon"><i className="fa fa-map-marker"></i></span>  
                  
                            <select id="states" className="form-control registrationInputBox selectOption"
                            ref="companyStateCode" value={this.state.companyStateCode} name="companyStateCode" onChange={this.handleChangeState.bind(this)} >
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
                </div>
                <div className="signUpBoxForm">
                    <div className="col-lg-10 col-lg-offset-1 form-group">
                        <div className="input-group roundCorner">
                            <span className="input-group-addon registrationInputIcon"><i className="fa fa-map-marker"></i></span> 
                  
                            <input type="text" name="companyCountry" id="companyCountry" 
                             className="form-control inputBox" placeholder="Company Country"
                             value={this.state.companyCountry}
                             onChange={this.handleChange.bind(this)}/>
                        </div> 
                        <span id="companyCountryError" className="errorMsg"></span>
                    </div>
                </div>
                <div className="signUpBoxForm">
                    <div className="col-lg-10 col-lg-offset-1">

                      <div className="col-lg-6 registrationLinks1" >
                        <div className="row">
                          <a className="alreadyAccount" href="/login"><u>Sign In >></u></a>
                        </div>
                      </div>

                        <button className="buttonNext col-lg-5 pull-right" onClick={this.handleSubmit.bind(this)}>
                            Next &nbsp;
                            <FontAwesomeIcon className="nextArrow" icon="arrow-right" />
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

export default connect(mapStateToProps, mapDispatchToProps) (SelectCompany);

