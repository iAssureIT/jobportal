import React, { Component }     from 'react';
import CKEditor 	            from "react-ckeditor-component";
import jQuery                   from 'jquery';
import $                        from 'jquery';
import axios                    from 'axios';
import swal                     from 'sweetalert';
import _                        from 'underscore';
import moment                   from 'moment';

import 'bootstrap/js/tab.js';
import 'react-phone-input-2/lib/style.css';

class Condition extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "conditions"    : ""
        };

        this.handleChange       = this.handleChange.bind(this);
        this.onChange           = this.onChange.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.submit             = this.submit.bind(this);
    }
    /*======= componentDidMount() =======*/
    componentDidMount() {
        const user_ID = localStorage.getItem("user_ID");
        this.getCondition();
        this.setState({
            contractID : this.props.match.params.contractID,
            user_ID    : user_ID
        }, () => {
            this.getCondition();
            this.getUserData();
        })
        window.scrollTo(0, 0);
    }    
    /*======= getUserData() =======*/
    getUserData(){
        if(this.state.user_ID){
            axios.get("/api/users/get/" + this.state.user_ID)
                .then((response) => {
                    var userData = response.data;
                    this.setState({
                       userData : userData
                    }, ()=>{ 
                        // console.log("userdata = ",this.state.userData )
                    })                    
                })
                .catch((error) => {
                    console.log("Error getUserData() = ",error);
                })
        }
    }
    /*======= getEntityUsersData() =======*/
    getEntityUsersData(companyID, entityType, entityId){
        if(entityType.toLowerCase() === "vendor"){
            var formValues = {
                companyID : companyID,
                role      : "vendoradmin"
            }
            axios.post("/api/users/get/list",formValues)
            .then((response)=>{
                console.log("vendor user list = ",response.data);
              this.setState({
                userArray       : response.data,
                toUserRole      : "vendoradmin",
              }, ()=>{
                // this.edit();
              })
            })
            .catch((error)=>{
              console.log("Error getEntityUsersData() = ", error);
            })
        }else{
            var formValues = {
                companyID : companyID,
                role      : "corporateadmin"
            }
            axios.post("/api/users/get/list",formValues)
            .then((response)=>{
                console.log("corporate user list = ",response.data);
              this.setState({
                userArray       : response.data,
                toUserRole      : "corporateadmin",
              }, ()=>{
                // this.edit();
              })
            })
            .catch((error)=>{
              console.log("Error getEntityUsersData() = ", error);
            })
        }
    }
    /*======= componentWillUnmount() =======*/
    componentWillUnmount() {
        $("script[src='/js/adminLte.js']").remove();
        $("link[href='/css/dashboard.css']").remove();
    }
    /*======= handleChange() =======*/
    handleChange(event) {
        event.preventDefault();
        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: event.target.value
        });
    }
    /*======= handleOptionChange() =======*/
    handleOptionChange(event) {
        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: event.target.value
        });
    }
    /*======= submit() =======*/
    submit(event) {
        event.preventDefault();

        if (this.state.content) {
            if (this.state.conditions) {
                var formValue = {
                    contractID      : this.props.match.params.contractID,
                    conditions      : this.state.content,
                    status          : "edited",                
                }
            }else{
                var formValue = {
                    contractID      : this.props.match.params.contractID,
                    conditions      : this.state.content,
                }
            }
            console.log("formValues = ",formValue);
            axios.patch("/api/contract/patch/addcondition", formValue)
            .then((response)=>{
                if (this.state.conditions){
                    swal("Done!", "Terms & Conditions Updated Successfully.");
                }else{
                    swal("Done!", "Terms & Conditions Added Successfully.");
                }
                
                this.getCondition();
                this.props.history.push("/viewcontract/"+this.props.match.params.contractID);
                if (this.state.conditions) {
                    if (this.state.entityType.toLowerCase() === "vendor") {
                        var sendData = {
                          "event"           : "Event33", //Your event name
                          "toUser_id"       : this.state.userArray ? this.state.userArray._id : "", // ref: users
                          "toUserRole"      : this.state.toUserRole,
                          "variables"       : {
                                "companyName"    : this.state.userData ? this.state.userData.companyName : "",
                                "signedAuthority": this.state.userData ? this.state.userData.fullName : "",
                                "editOnDate"     : moment(new Date()).format("Do MMMM YYYY"),
                                "changesIn"      : "Contract",
                            }
                        }
                    }else{
                        var sendData = {
                          "event"           : "Event33", //Your event name
                          "toUser_id"       : this.state.userArray ? this.state.userArray._id : "", // ref: users
                          "toUserRole"      : this.state.toUserRole,
                          "variables"       : {
                                "companyName"    : this.state.userData ? this.state.userData.companyName : "",
                                "signedAuthority": this.state.userData ? this.state.userData.fullName : "",
                                "editOnDate"     : moment(new Date()).format("Do MMMM YYYY"),
                                "changesIn"      : "Contract",
                            }
                        }
                    }

                    // console.log('status ==> ', this.state.contractData.status.toLowerCase());
                    console.log('sendData ==> ', sendData);

                    if(this.state.status.toLowerCase() === "approved" || this.state.status.toLowerCase() === "party-2 signed"){
                        console.log('IF ==> ', this.state.status.toLowerCase());
                        axios.post('/api/masternotifications/post/sendNotification', sendData)
                        .then((res) => {
                            console.log("Response Send Notification => ", res.data);
                        })
                        .catch((error) => { 
                            console.log("Error Send Notification => ", error);
                        })
                    }
                }
            })
            .catch((error)=>{
                swal("Sorry...!", "Failed to Add Terms & Conditions.");
            })
        }else{
            this.setState({
                messageError : 'Terms and Conditions are mandatory'
            })
        }
    }
    /*======= componentWillReceiveProps() =======*/
    componentWillReceiveProps(nextProps) {
        // this.edit();
        this.handleChange = this.handleChange.bind(this);
    }
    /*======= edit() =======*/
    edit() {
        window.scrollTo(0, 0);
        var contractID = this.state.contractID;
        if(contractID){
            document.getElementById("submitbtn").innerHTML = "Update";
            axios.get('/api/contract/get/one/' + contractID)
            .then((response) => {
                console.log("Contract = ", response.data);
                this.setState({
                    "contractID"     : this.props.match.params.contractID,
                    "content"        : response.data.conditions,
                    "entityId"       : response.data.entityId,
                    "entityType"     : response.data.entityType,
                    "status"         : response.data.status,
                }, ()=> {
                    this.getEntity(this.state.entityId, this.state.entityType);
                })
            })
            .catch((error) => {
                console.log("Error edit() => ", error);
            })
        } 
    }    
    /*======= getEntity() =======*/
    getEntity(entityId, entityType){
        axios.get("/api/entitymaster/get/one/"+entityId)
            .then((response)=>{
                console.log("entitydata = ",response.data);
              this.setState({
                entityCompanyID : response.data[0].companyID
              }, ()=>{
                console.log("entityType = ",entityType);
                console.log("entityCompanyID = ",this.state.entityCompanyID);
                this.getEntityUsersData(this.state.entityCompanyID, entityType, entityId);
              })
            })
            .catch((error)=>{
              console.log("Error getEntity() = ", error);
            })
    }
    /*======= getCondition() =======*/
    getCondition(){
        axios.get("/api/contract/get/one/"+this.props.match.params.contractID)
        .then((response)=>{
            this.setState({
                conditions : response.data.conditions
            })
        })
        .catch((error)=>{
            console.log("Error getCondition() => ", error);
        })
    }
    /*======= delete() =======*/
    delete(){
        var formValue = {
            contractID      : this.props.match.params.contractID,
            conditions      : "",
        }
        axios.patch("/api/contract/patch/addcondition", formValue)
        .then((response)=>{
            swal("Terms & Conditions are Deleted Successfully.");
            this.setState({
                "content"   : "",
            })
            this.getCondition();
        })
        .catch((error)=>{
            console.log("Error delete() => ", error);
        })
    }
    /*======= onChange() =======*/
    onChange(evt){
        // console.log("name = ",evt.target.name);
        console.log("name = ",evt);
        var newContent = evt.editor.getData();
        this.setState({
          content: newContent
        },()=>{
            if(this.state.content){
                this.setState({
                    messageError : ''
                });
            }else{
                this.setState({
                    messageError : 'Terms and Conditions are mandatory'
                });
            }
        });
    }
    /*======= back() =======*/
    back(event) {
		event.preventDefault();
		var contractID = this.props.match.params.contractID;
		
		this.props.history.push("/package-details/" + contractID);
    }
    /*======= next() =======*/
    next(event) {
		event.preventDefault();
		var contractID = this.props.match.params.contractID;
        if (contractID && this.state.conditions) {
            this.props.history.push("/viewcontract/" + contractID);
        }else{
            swal("Oops!", "Please Add Terms & Conditions.");
        }		
    }
    /*======= render() =======*/
    render() {
        return (
            <div className="">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <section className="content">
                            <div className="pageContent col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
                                    <h4 className="weighttitle col-lg-11 col-md-11 col-xs-11 col-sm-11 NOpadding-right">Contract Management</h4>
                                </div>
                                <div className="nav-center OnboardingTabs col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                    <ul className="nav nav-pills vendorpills col-lg-8 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                        <li className=" col-lg-3 col-md-2 col-sm-12 col-xs-12 transactionTab pdcls pdclsOne btn1 NOpadding-left disabled">
                                            <a href={this.props.match.params.contractID ? "/contract-management/"+this.props.match.params.contractID : "/contract-management"} className="basic-info-pillss pills backcolor">
                                                <i className="fa fa-file" aria-hidden="true"></i> &nbsp;
                                                Contract
                                            </a>
                                            <div className="triangleone " id="triangle-right"></div>
                                        </li>
                                        <li className="col-lg-3 col-md-2 col-sm-12 col-xs-12 transactionTab pdcls pdclsOne btn1 disabled">
                                            <div className="triangletwo" id="triangle-right1"></div>
                                            <a href={this.props.match.params.contractID ? "/package-details/"+this.props.match.params.contractID : "/package-details"} className="basic-info-pillss backcolor">
                                                <i className="fa fa-archive iconMarginLeft" aria-hidden="true"></i> &nbsp;
												Packages
											</a>
                                            <div className="triangleone " id="triangle-right"></div>
                                        </li>
                                        
                                        <li className="active col-lg-3 col-md-2 col-sm-12 col-xs-12 transactionTab pdcls pdclsOne btn1">
                                            <div className="triangletwo" id="triangle-right1"></div>
                                            <a href={this.props.match.params.contractID ? "/condition/"+this.props.match.params.contractID : "/condition"} className="basic-info-pillss pills ">
                                                <i className="fa fa-paste iconMarginLeft" aria-hidden="true"></i>&nbsp;
                                                Conditions
                                            </a>
                                            <div className="triangleone triangleones" id="triangle-right"></div>
                                        </li>
                                        <li className="col-lg-3 col-md-2 col-sm-12 col-xs-12 transactionTab noRightPadding pdcls btn4 disabled">
											<div className="trianglesix" id="triangle-right2"></div>
											<a href={this.props.match.params.contractID  && this.state.conditions ? "/viewcontract/"+this.props.match.params.contractID : "javascript:void(0);"} className="basic-info-pillss backcolor" style={{"cursor" : this.props.match.params.contractID && this.state.conditions ? "pointer"  : "not-allowed"}}>
                                            <i className="fa fa-eye iconMarginLeft" aria-hidden="true"></i> &nbsp;
												View
											</a>
										</li>
                                    </ul>
                                </div>
                                <section className="Content">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-sm-6 locationTabs">
                                                    <h4 className="MasterBudgetTitle"><i className="fa fa-paste" aria-hidden="true"></i> Terms & Conditions</h4>
                                                </div>
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 formHrTag"></div>
                                            </div>
                                            <form id="Condition">
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                                    <div className="col-lg-12 col-md-12 col-sm-12 submitForm">
                                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                                            <br />
                                                        </div>
                                                        <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                            <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12">Terms & Conditions <sup className="astrick">*</sup> <span className="errorMsg">{this.state.messageError ? "( " + this.state.messageError + " )" : ""}</span></label>                                                            
                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                <CKEditor activeClass="p15" id="editor"  className="conditions" content={this.state.content} name="content" events={{"change": this.onChange}}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt">
                                                            {
                                                                this.props.match.params.contractID ? 
                                                                    <button id="submitbtn" className="btn button3 pull-right" onClick={this.submit.bind(this)} >Submit</button>
                                                                :
                                                                null
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <button className="button2 btn" onClick={this.back.bind(this)}><i className="fa fa-angle-double-left" aria-hidden="true"></i>&nbsp;Packages</button>
                                                <button className="button1 pull-right btn" onClick={this.next.bind(this)}>Next&nbsp;<i className="fa fa-angle-double-right" aria-hidden="true"></i></button>
                                            </div>
                                        </div>
                                        {
                                            this.state.conditions ?
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-sm-12 foothd">
                                                        <h4 className="MasterBudgetTitle">Terms & Conditions</h4>
                                                    </div>
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <div className="termDiv col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-6 col-sm-offset-3 col-xs-12 boxul1">
                                                            <div className="liheader1 col-lg-1 col-md-1 col-sm-1 col-xs-1">
                                                                <i className="fa fa-paste" aria-hidden="true"></i>
                                                            </div>
                                                            <ul className="col-lg-10 col-md-10 col-sm-10 col-xs-10 palfclr addrbox">
                                                                <li dangerouslySetInnerHTML={{'__html' : this.state.conditions}}></li>
                                                            </ul>
                                                            <div className="liheader1 dropdown col-lg-1 col-md-1 col-sm-1 col-xs-1">
                                                                <i className="fa fa-ellipsis-h dropbtn" aria-hidden="true"></i>
                                                                <div className="dropdown-content dropdown-contentLocation">
                                                                    <ul className="pdcls ulbtm">
                                                                        <li>
                                                                            {/*<a href={"/condition/"+ this.props.match.params.contractID}><i className="fa fa-pencil penmrleft" aria-hidden="true"></i>&nbsp;&nbsp;Edit</a>*/}
                                                                            <span onClick={this.edit.bind(this)}><i className="fa fa-pencil penmrleft" aria-hidden="true"></i>&nbsp;&nbsp;Edit</span>
                                                                        </li>
                                                                        <li>
                                                                            <span onClick={this.delete.bind(this)} id={this.props.match.params.contractID}><i className="fa fa-trash-o" aria-hidden="true"></i> &nbsp; Delete</span>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            null
                                        }
                                        
                                    </div>
                                </section>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}
export default Condition;