import React, { Component } from 'react';
import $ from 'jquery';
import jQuery from 'jquery';
import axios from 'axios';
import swal from 'sweetalert';
import _ from 'underscore';
import 'bootstrap/js/tab.js';
import './Contract.css';
import 'react-phone-input-2/lib/style.css';
import moment from 'moment';
import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-inputs/styles/material.css";
import "@syncfusion/ej2-react-dropdowns/styles/material.css";
import { CheckBoxSelection, Inject, MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
// import socketIOClient from "socket.io-client";
// const io = require('socket.io-client')

// const socket = io.connect(process.env.REACT_APP_BASE_URL)

class ContractManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "pathname": this.props.match.params.entity,
            "selectedCompany": {},
            "selectedCompanyLocation": {},
            "selectedEntity": {},
            "selectedEntityLocation": [],
            "entityLocationArray" : [],
            "contractArray": [],
            "entityType": "vendor",
            "contractDate": moment(new Date()).format("YYYY-MM-DD"),
            "contractDuration": 12,
            "effectiveUpto": (moment(new Date()).add(12, 'M')).subtract(1, "days").format("YYYY-MM-DD"),
            "endpoint": "http://localhost:3066"
        };

        this.handleChange = this.handleChange.bind(this);
        this.getCorpLocation = this.getCorpLocation.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    componentDidMount() {
        // ============= Socket Programming ===============
        // const { endpoint } = this.state;
        // const socket = socketIOClient(endpoint);
        // socket.on("FromAPI", data => this.setState({ response: data }));


        this.getCompany();
        this.getEntity();
        // this.getContract();
        this.setState({
            contractID: this.props.match.params.contractID
        }, () => {
            this.edit();
        })
        window.scrollTo(0, 0);
        $.validator.addMethod("regxcompany", function (value, element, arg) {
            return arg !== value;
        }, "Please select the company");
        $.validator.addMethod("regxcompanyLocation", function (value, element, arg) {
            return arg !== value;
        }, "Please select the company location");
        $.validator.addMethod("regxentityType", function (value, element, arg) {
            return arg !== value;
        }, "Please select the entity type");
        $.validator.addMethod("regxentity", function (value, element, arg) {
            return arg !== value;
        }, "Please select the value");
        $.validator.addMethod("regxentityLocation", function (value, element, arg) {
            return arg !== value;
        }, "Please select the location");

        jQuery.validator.setDefaults({
            debug: true,
            success: "valid"
        });
        $("#ContractManagement").validate({
            rules: {
                company: {
                    required: true,
                    regxcompany: "--Select--"
                },
                companyLocation: {
                    required: true,
                    regxcompanyLocation: "--Select Location--"
                },
                entityType: {
                    required: true,
                    regxentityType: "--Select--"
                },
                entity: {
                    required: true,
                    regxentity: "--Select--"
                },
                entityLocation: {
                    required: true,
                    regxentityLocation: "--Select Location--"
                },
                contractDate: {
                    required: true
                },
                effectiveUpto: {
                    required: true
                },
                contractDuration: {
                    required: true
                }
            },
            errorPlacement: function (error, element) {
                if (element.attr("name") == "company") {
                    error.insertAfter("#company");
                }
                if (element.attr("name") == "companyLocation") {
                    error.insertAfter("#companyLocation");
                }
                if (element.attr("name") == "entityType") {
                    error.insertAfter("#entityType");
                }
                if (element.attr("name") == "entity") {
                    error.insertAfter("#entity");
                }
                if (element.attr("name") == "entityLocation") {
                    error.insertAfter("#entityLocation");
                }
                if (element.attr("name") == "contractDate") {
                    error.insertAfter("#contractDate");
                }
                if (element.attr("name") == "effectiveUpto") {
                    error.insertAfter("#effectiveUpto");
                }
                if (element.attr("name") == "contractDuration") {
                    error.insertAfter("#contractDuration");
                }
            }
        });
    }
    componentWillUnmount() {
        $("script[src='/js/adminLte.js']").remove();
        $("link[href='/css/dashboard.css']").remove();
    }

    handleOptionChange(event) {
        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: event.target.value
        });
    }
    submit(event) {
        event.preventDefault();
        if ($('#ContractManagement').valid()) {
            var formValues = {
                "contractID": this.props.match.params.contractID,
                "contractDate": this.state.contractDate,
                "effectiveUpto": this.state.effectiveUpto,
                "contractDuration": this.state.contractDuration,
                "companyId": this.state.companyId,
                "companyLocationId": this.state.companyLocation,
                "entityType": this.state.entityType,
                "entityId": this.state.entity,
                "entityLocationId": this.state.selectedEntityLocation,
            }
            if (this.props.match.params.contractID) {
                axios.patch('/api/contract/patch', formValues)
                    .then((response) => {
                        this.setState({
                            "contractDate": moment(new Date()).format("YYYY-MM-DD"),
                            "contractDuration": 12,
                            "effectiveUpto": (moment(new Date()).add(12, 'M')).subtract(1, "days").format("YYYY-MM-DD"),
                            "company": "",
                            "companyLocation": "",
                            "entityType": "vendor",
                            "entity": "",
                            "selectedEntityLocation": [],
                        })
                        this.dropDownListObject.value = null;
                        this.props.history.push("/package-details/" + this.props.match.params.contractID);
                        swal("Contract details updated successfully.");
                        document.getElementById("submitbtn").innerHTML = "Submit";
                    })
                    .catch((error) => {

                    })
            } else {
                axios.post('/api/contract/post', formValues)
                    .then((response) => {
                        
                        if(response.data.message === 'DUPLICATE'){
                            swal("Contract between "+this.state.company+" and "+(this.state.selectedEntity.companyName ? this.state.selectedEntity.companyName : this.state.entityType)+" for selected locations already exist.");
                        }else{
                            this.setState({
                                "contractDate": moment(new Date()).format("YYYY-MM-DD"),
                                "contractDuration": 12,
                                "effectiveUpto": (moment(new Date()).add(12, 'M')).subtract(1, "days").format("YYYY-MM-DD"),
                                "companyId": "",
                                "companyLocationId": "",
                                "entityType": "vendor",
                                "entityId": "",
                                "selectedEntityLocation": [],
                            })
                            this.props.history.push("/package-details/" + response.data.contractID);
                            swal("Contract details created successfully.");
                        }
                        
                    })
                    .catch((error) => {

                    })
            }
        } else {
            $(event.target).parent().parent().find('.inputText.error:first').focus();
        }

    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.contractID) {
            this.setState({
                contractID: nextProps.match.params.contractID
            }, () => {
                this.edit();
            })
        }
        this.handleChange = this.handleChange.bind(this);
    }
    edit() {
        var contractID = this.state.contractID;
        if (contractID) {
            axios.get('/api/contract/get/one/' + contractID)
            .then((response) => {
                this.getCompany();
                this.getCorpLocation(response.data.companyId, response.data.companyLocationId)
                this.getEntityAndLocation(response.data.entityId, response.data.entityLocationId);
                this.dropDownListObject.value = response.data.entityLocationId;
                this.getCorpLocation(response.data.companyLocationId);
                document.getElementById("submitbtn").innerHTML = "Update";
                this.setState({
                    "contractID": this.props.match.params.contractID,
                    "contractDate": moment(response.data.contractDate).format("YYYY-MM-DD"),
                    "effectiveUpto": moment(response.data.effectiveUpto).format("YYYY-MM-DD"),
                    "company": response.data.companyId,
                    "companyLocation": response.data.companyLocationId,
                    "entityType": response.data.entityType,
                    "entity": response.data.entityId,
                    "selectedEntityLocation": response.data.entityLocationId,
                    "contractDuration": response.data.contractDuration,
                },()=>{
                    this.getEntity();
                })
                
            })
            .catch((error) => {
            })
        }
        
    }
    getEntityAndLocation(entityId, entityLocationId){
        axios.get('/api/entitymaster/get/one/' + entityId)
            .then((response) => {
                var entityLocArray = response.data[0].locations.map((a, i) => {
                    return ({
                        text: a.city + ", " + a.district + " " + a.stateCode + " - " + a.countryCode,
                        value: a._id
                    });
                })
                this.setState({
                    selectedEntity: response.data[0],
                    entityLocationArray: response.data[0].locations,
                    entityLocArray: entityLocArray,
                },()=>{
                    var selectedEntityLocArray = this.state.entityLocationArray.filter((a)=> entityLocationId.includes(a._id));
                    this.setState({
                        selectedEntityLocArray : selectedEntityLocArray
                    })
                })
            })
            .catch((error) => {

            })
    }
    handleEntity(event) {
        event.preventDefault();
        const target = event.target;
        const name = target.name;
        var value = event.target.value;
        this.setState({
            [name]: event.target.value,
            selectedEntity : {},
            selectedEntityLocation : [],
            selectedEntityLocArray : []
        }, () => {
            this.getEntity();
        })
        this.dropDownListObject.value = null;
    }
    selectEntity(event) {
        event.preventDefault();
        const target = event.target;
        const name = target.name;
        var value = event.target.value;
        this.setState({
            [name]: event.target.value,
            selectedEntityLocation : [],
            selectedEntityLocArray : []
        },()=>{
            this.getEntityLocation(value, '');
            this.setState({
                entityLocation: ''
            })
        })
    }
    handleChange(event) {
        event.preventDefault();
        const target = event.target;
        const name = target.name;
        var value = event.target.value;
        this.setState({
            [name]: event.target.value
        }, () => {
            if (this.state[name] == this.state.company) {
                this.getCorpLocation(value, '');
                this.setState({
                    companyLocation: ''
                })
            } else if (this.state[name] == this.state.companyLocation && this.state.company) {
                this.getCorpLocation(this.state.companyLocation)
            }else if (name == 'contractDate') {
                this.setState({
                    "effectiveUpto": (moment(this.state.contractDate).add(12, 'M')).subtract(1, "days").format("YYYY-MM-DD"),
                    "contractDuration" : 12
                })
            } else if (name == 'contractDuration') {
                this.setState({
                    "effectiveUpto": (moment(new Date()).add(value, 'M')).subtract(1, "days").format("YYYY-MM-DD"),
                })
            } else if (name == 'effectiveUpto') {
                this.setState({
                    "contractDuration": moment(value).diff(moment(this.state.contractDate), 'months', true),
                })
            }
        });
    }
    getCompany() {
        axios.get('/api/companysettings')
            .then((response) => {
                this.setState({
                    companyId : response.data._id,
                    companyDetails: response.data,
                    company: response.data.companyName,
                    companyLocationArray: response.data.companyLocationsInfo
                })
            })
            .catch((error) => {

            })
    }
    getCorpLocation(locationId) {
        this.setState({
            companyLocationArray: this.state.companyDetails.companyLocationsInfo
        }, () => {
            if (this.state.companyLocationArray && this.state.companyLocationArray.length > 0) {
                var selectedCompanyLocation = this.state.companyLocationArray.filter((a) => a._id == locationId);
                this.setState({
                    selectedCompanyLocation: selectedCompanyLocation[0]
                })
            } else {
                this.setState({
                    selectedCompanyLocation: []
                })
            }
        })
    }
    getEntity() {
        axios.get('/api/entitymaster/get/' + this.state.entityType)
            .then((response) => {
                this.setState({
                    entityArray: response.data
                })
            })
            .catch((error) => {

            })
    }
    getEntityLocation(entityId) {
        axios.get('/api/entitymaster/get/one/' + entityId)
            .then((response) => {
                var entityLocArray = response.data[0].locations.map((a, i) => {
                    return ({
                        text: a.city + ", " + a.district + " " + a.stateCode + " - " + a.countryCode,
                        value: a._id
                    });
                })
                this.setState({
                    selectedEntity: response.data[0],
                    entityLocationArray: response.data[0].locations,
                    entityLocArray: entityLocArray,
                })
            })
            .catch((error) => {

            })
    }

    getContract() {
        axios.get("/api/contract/get/joincontractlist")
            .then((response) => {
                this.setState({
                    contractArray: response.data
                })
            })
            .catch((error) => {

            })
    }
    delete(event) {
        var contractID = event.target.id;
        axios.delete("/api/contract/delete/" + contractID)
            .then((response) => {
                this.getContract();
                this.props.history.push("/contract-management");
                this.setState({
                    "contractDate": "",
                    "effectiveUpto": "",
                    "company": "--Select Company--",
                    "companyLocation": "",
                    "entityType": "",
                    "entity": "",
                    "entityLocation": "",
                    "selectedCompany": {},
                    "selectedCompanyLocation": {},
                    "selectedEntity": {},
                    "selectedEntityLocation": []
                })
                swal("Contract deleted successfully.")
            })
            .catch((error) => {

            })
    }
    keyPressNumber = (e) => {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 189]) !== -1 ||
            // Allow: Ctrl+A, Command+A
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
            (e.keyCode === 86 && (e.ctrlKey === true || e.metaKey === true)) ||
            (e.keyCode === 67 && (e.ctrlKey === true || e.metaKey === true)) ||
            // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40) || e.keyCode === 189 || e.keyCode === 32) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 58)) && (e.keyCode < 96 || e.keyCode > 105 || e.keyCode === 190 || e.keyCode === 46)) {
            e.preventDefault();
        }
    }
    handleChangeRoles(event) {
        this.setState({
            selectedEntityLocation: event.value
        }, () => {
            var selectedEntityLocArray =  this.state.entityLocationArray.filter((a)=> (this.state.selectedEntityLocation ? this.state.selectedEntityLocation.includes(a._id) : null));
            this.setState({
                selectedEntityLocArray : selectedEntityLocArray
            })
        })
    }
    multiple(event){
        event.preventDefault();
        // this.setState({
        //     [event.target.name] : event.target.value
        // })
    }
    render() {
        const fields: object = { text: 'text', value: 'value' };
        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <section className="content">
                            <div className="pageContent col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
                                    <h4 className="weighttitle col-lg-11 col-md-11 col-xs-11 col-sm-11 NOpadding-right">Contract Management</h4>
                                </div>
                                <div className="nav-center OnboardingTabs col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                    <ul className="nav nav-pills vendorpills col-lg-8 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                        <li className="active col-lg-3 col-md-2 col-sm-12 col-xs-12 transactionTab pdcls pdclsOne btn1 NOpadding-left disabled">
                                            <a href={this.props.match.params.contractID ? "/contract-management/"+this.props.match.params.contractID : "/contract-management"} className="basic-info-pillss pills backcolor">
                                                <i className="fa fa-file" aria-hidden="true"></i> &nbsp;
                                                Contract
                                            </a>
                                            <div className="trianglethree triangleones forActive" id="triangle-right"></div>
                                        </li>
                                        <li className="col-lg-3 col-md-2 col-sm-12 col-xs-12 transactionTab pdcls pdclsOne btn1 disabled">
                                            <div className="triangletwo" id="triangle-right1"></div>
                                            <a href={this.props.match.params.contractID ? "/package-details/"+this.props.match.params.contractID : "/package-details"} className="basic-info-pillss backcolor">
                                                <i className="fa fa-archive iconMarginLeft" aria-hidden="true"></i> &nbsp;
												Packages
											</a>
                                            <div className="triangleone " id="triangle-right"></div>
                                        </li>

                                        <li className=" col-lg-3 col-md-2 col-sm-12 col-xs-12 transactionTab pdcls pdclsOne btn1 disabled">
                                            <div className="triangletwo" id="triangle-right1"></div>
                                            <a href={this.props.match.params.contractID ? "/condition/"+this.props.match.params.contractID : "/condition"} className="basic-info-pillss pills backcolor">
                                                <i className="fa fa-paste iconMarginLeft" aria-hidden="true"></i>&nbsp;
                                                Conditions
                                            </a>
                                            <div className="triangleone " id="triangle-right"></div>
                                        </li>
                                        <li className="col-lg-3 col-md-2 col-sm-12 col-xs-12 transactionTab noRightPadding pdcls btn4 disabled">
                                            <div className="trianglesix" id="triangle-right2"></div>
                                            <a href={this.props.match.params.contractID ? "/viewcontract/"+this.props.match.params.contractID : "/viewcontract"} className="basic-info-pillss backcolor">
                                                <i className="fa fa-eye iconMarginLeft" aria-hidden="true"></i> &nbsp;
                                                    View
											</a>
                                        </li>
                                    </ul>
                                </div>
                                <section className="Content">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <form id="ContractManagement">
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                                    <div className="col-lg-12 col-md-12 col-sm-12 submitForm">
                                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                                            <br />
                                                        </div>
                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  NOpadding">
                                                                <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                    <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12" >
                                                                        <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Contract Start Date <sup className="astrick">*</sup></label>
                                                                        <input min={moment(new Date()).format("YYYY-MM-DD")} max="2099-12-31" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12 inputText" type="date" ref="contractDate" name="contractDate" id="contractDate" value={this.state.contractDate} onChange={this.handleChange} />
                                                                    </div>
                                                                    <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12" >
                                                                        <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Contract Duration <sup className="astrick">*</sup></label>
                                                                        <span id="contractDuration" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12 inputText" style={{ 'background': '#ccc', 'padding': '0px' }}>
                                                                            <input min="1" max="120" step="1" className="col-lg-6 col-md-6 col-sm-6 col-xs-6 inputText" type="number" ref="contractDuration" name="contractDuration" value={this.state.contractDuration} onChange={this.handleChange} onKeyDown={this.keyPressNumber.bind(this)} style={{ 'height': '32px', 'border': '0px' }} />
                                                                            <span className="col-lg-6 col-md-6 col-sm-6 col-xs-6 monthspan">Months</span>
                                                                        </span>
                                                                    </div>
                                                                    <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12" >
                                                                        <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Contract Valid Upto <sup className="astrick">*</sup></label>
                                                                        <input min={moment(this.state.contractDate).format("YYYY-MM-DD")} max="2099-12-31" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12 inputText" type="date" ref="effectiveUpto" name="effectiveUpto" id="effectiveUpto" value={this.state.effectiveUpto} onChange={this.handleChange} />
                                                                    </div>
                                                                    <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12" >
                                                                        <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Contract With <sup className="astrick">*</sup></label>
                                                                        <select id="entityType" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.entityType} ref="entityType" name="entityType" onChange={this.handleEntity.bind(this)}>
                                                                            <option>--Select--</option>
                                                                            <option value="vendor">Vendor</option>
                                                                            <option value="corporate">Corporate</option>
                                                                        </select>
                                                                    </div>
                                                                    {/* <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12" >
                                                                        <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Contract With <sup className="astrick">*</sup></label>
                                                                        <select multiple id="multiple" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.multiple} ref="multiple" name="multiple" onChange={this.multiple.bind(this)}>
                                                                            <option>--Select--</option>
                                                                            <option value="vendor">Vendor</option>
                                                                            <option value="corporate">Corporate</option>
                                                                        </select>
                                                                    </div> */}
                                                                </div>
                                                                <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                    <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12" >
                                                                        <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Company <sup className="astrick">*</sup></label>
                                                                        <input disabled className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12 inputText" type="text" ref="company" name="company" id="company" value={this.state.company} onChange={this.handleChange} />
                                                                    </div>
                                                                    <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12" >
                                                                        <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Company Location <sup className="astrick">*</sup></label>
                                                                        <select id="companyLocation" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.companyLocation} ref="companyLocation" name="companyLocation" onChange={this.handleChange.bind(this)}>
                                                                            <option>--Select Location--</option>
                                                                            {
                                                                                this.state.companyLocationArray && this.state.companyLocationArray.length > 0 ?
                                                                                    this.state.companyLocationArray.map((data, i) => {
                                                                                        return (
                                                                                            <option key={i} value={data._id}>{((data.locationType).match(/\b(\w)/g)).join('')} - {data.area} {data.city}, {data.stateCode} - {(data.countryCode)}  </option>
                                                                                        );
                                                                                    })
                                                                                    :
                                                                                    null
                                                                            }
                                                                        </select>
                                                                    </div>
                                                                    <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12" >
                                                                        <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 capitalize">{this.state.entityType ? this.state.entityType : "Entity"} <sup className="astrick">*</sup></label>
                                                                        <select id="entity" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.entity} ref="entity" name="entity" onChange={this.selectEntity.bind(this)}>
                                                                            <option>--Select--</option>
                                                                            {
                                                                                this.state.entityArray && this.state.entityArray.length > 0 ?
                                                                                    this.state.entityArray.map((data, i) => {
                                                                                        return (
                                                                                            <option key={i} value={data._id}>{data.companyName}</option>
                                                                                        );
                                                                                    })
                                                                                    :
                                                                                    null
                                                                            }
                                                                        </select>
                                                                    </div>
                                                                    <div className="col-lg-3 col-md-3 col-xs-12 col-sm-12 multiselect">
                                                                        <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 capitalize">{this.state.entityType ? this.state.entityType : "Entity"} Location <sup className="astrick">*</sup></label>
                                                                        <MultiSelectComponent id="categoryChange" ref={(scope) => { this.dropDownListObject = scope; }}
                                                                            dataSource={this.state.entityLocArray}
                                                                            change={this.handleChangeRoles.bind(this)} mode='box'
                                                                            fields={fields} placeholder="Select Location" mode="CheckBox"
                                                                            selectAllText="Select All" unSelectAllText="Unselect All"
                                                                            showSelectAll={true} hideSelectedItem={false} >
                                                                            <Inject services={[CheckBoxSelection]} />
                                                                        </MultiSelectComponent>
                                                                    </div>
                                                                </div>
                                                                <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 ">
                                                                        {
                                                                            this.state.companyDetails ?
                                                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 detailBox marbtm30">
                                                                                    <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 detailBoxImg" style={{ "backgroundImage": `url(` + (this.state.companyDetails.companyLogo ? this.state.companyDetails.companyLogo : "/images/logonotfound.jpg") + `)` }}></div>
                                                                                    <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12">
                                                                                        <h5 className="detailtitle">{this.state.companyDetails.companyName}</h5>
                                                                                        <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                                            <li><i className="fa fa-globe"></i> {this.state.companyDetails.companywebsite}</li>
                                                                                            <li><i className="fa fa-envelope "></i> {this.state.companyDetails.companyEmail}</li>
                                                                                            {/* <li>CIN: {this.state.companyDetails.CIN}</li>
                                                                                        <li>TAN: {this.state.companyDetails.TAN}</li> */}
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                                :
                                                                                null
                                                                        }
                                                                        {
                                                                            this.state.selectedCompanyLocation && this.state.selectedCompanyLocation.locationType ?
                                                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 detailBox marbtm30">
                                                                                    <div className="col-lg-1 col-md-1 col-sm-12 col-xs-12 mapIconMargin">
                                                                                        <i className="fa fa-map-marker addressIcon"></i>
                                                                                    </div>
                                                                                    <div className="col-lg-6 col-md-1 col-sm-12 col-xs-12">
                                                                                        <h4>Location Details</h4>
                                                                                    </div>
                                                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                                        <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                                            <li> {this.state.selectedCompanyLocation.locationType}</li>
                                                                                            <li> {this.state.selectedCompanyLocation.blockName}</li>
                                                                                            <li> {this.state.selectedCompanyLocation.landmark}</li>
                                                                                            <li> {this.state.selectedCompanyLocation.area} {this.state.selectedCompanyLocation.city}</li>
                                                                                            <li> {this.state.selectedCompanyLocation.district} {this.state.selectedCompanyLocation.state} {this.state.selectedCompanyLocation.country} - {this.state.selectedCompanyLocation.pincode}</li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                                :
                                                                                null
                                                                        }
                                                                    </div>
                                                                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                                        {
                                                                            this.state.selectedEntity.companyName ?
                                                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 detailBox marbtm30">
                                                                                    <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 detailBoxImg" style={{ "backgroundImage": `url(` + (this.state.selectedEntity.companyLogo ? this.state.selectedEntity.companyLogo : "/images/logonotfound.jpg") + `)` }}></div>
                                                                                    <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12">
                                                                                        <h5 className="detailtitle">{this.state.selectedEntity.companyName}</h5>
                                                                                        <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                                            <li><i className="fa fa-user-o "></i> {this.state.selectedEntity.groupName}</li>
                                                                                            <li><i className="fa fa-globe"></i> {this.state.selectedEntity.website}</li>
                                                                                            <li><i className="fa fa-envelope "></i> {this.state.selectedEntity.companyEmail}</li>
                                                                                            <li>CIN: {this.state.selectedEntity.CIN}</li>
                                                                                            <li>TAN: {this.state.selectedEntity.TAN}</li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                            :
                                                                            null
                                                                        }
                                                                        {
                                                                            this.state.selectedEntityLocArray && this.state.selectedEntityLocArray.length > 0 ?
                                                                                this.state.selectedEntityLocArray.map((data, i)=>{
                                                                                    return(
                                                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 detailBox marbtm30">
                                                                                                <div className="col-lg-1 col-md-1 col-sm-12 col-xs-12 mapIconMargin">
                                                                                                    <i className="fa fa-map-marker addressIcon"></i>
                                                                                                </div>
                                                                                                <div className="col-lg-6 col-md-1 col-sm-12 col-xs-12">
                                                                                                    <h4>Location Details</h4>
                                                                                                </div>
                                                                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                                                    <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                                                        <li> {data.locationType}</li>
                                                                                                        <li> {data.addressLine1}</li>
                                                                                                        <li> {data.addressLine2}</li>
                                                                                                        <li> {data.area} {data.city}</li>
                                                                                                        <li> {data.district} {data.state} {data.country}</li>
                                                                                                    </ul>
                                                                                                </div>
                                                                                            </div>
                                                                                    );
                                                                                })
                                                                                :
                                                                                null
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt">
                                                            <button id="submitbtn" className="btn button3 pull-right" onClick={this.submit.bind(this)} >Save & Next</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            {this.state.contractArray && this.state.contractArray.length > 0 ?
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-sm-12 foothd">
                                                        <h4 className="MasterBudgetTitle col-lg-12">Contract Details</h4>
                                                    </div>
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        {this.state.contractArray && this.state.contractArray.length > 0 ?
                                                            this.state.contractArray.map((data, index) => {
                                                                return (
                                                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12" key={index}>
                                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 boxul1">
                                                                            <div className="contractIcon col-lg-1 col-md-1 col-sm-1 col-xs-1">
                                                                                <i className="fa fa-handshake-o " aria-hidden="true"></i>
                                                                            </div>
                                                                            <ul className="col-lg-10 col-md-10 col-sm-10 col-xs-10 palfclr addrbox">
                                                                                <li><b>Company :</b> {data.company.companyName}</li>
                                                                                <li>{data.company.website}</li>
                                                                                <li>{data.company.companyEmail}</li>
                                                                                <br />
                                                                                <li><b>Entity :</b> {data.entity.companyName}</li>
                                                                                <li>{data.entity.website}</li>
                                                                                <li>{data.entity.companyEmail}</li>
                                                                            </ul>
                                                                            <div className="dotsContainer dropdown col-lg-1 col-md-1 col-sm-1 col-xs-1">
                                                                                <i className="fa fa-ellipsis-h dropbtn" aria-hidden="true"></i>
                                                                                <div className="dropdown-content dropdown-contractLocation">
                                                                                    <ul className="pdcls ulbtm">
                                                                                        <li name={index}>
                                                                                            <a href={"/contract-management/" + data._id}><i className="fa fa-pencil penmrleft" aria-hidden="true"></i>&nbsp;&nbsp;Edit</a>
                                                                                        </li>
                                                                                        <li name={index}>
                                                                                            <span onClick={this.delete.bind(this)} id={data._id}><i className="fa fa-trash-o" aria-hidden="true"></i> &nbsp; Delete</span>
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })
                                                            :
                                                            <div className="textAlign">Contract will be shown here.</div>
                                                        }
                                                    </div>
                                                </div>
                                                :
                                                null
                                            }
                                        </div>
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
export default ContractManagement;