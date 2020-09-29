import React, { Component } from 'react';
import $ from 'jquery';
import jQuery from 'jquery';
import axios from 'axios';
import swal from 'sweetalert';
import _ from 'underscore';
import 'bootstrap/js/tab.js';
import 'react-phone-input-2/lib/style.css';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/modal.js';
class Package extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "pathname"                  : this.props.match.params.entity,
            "openForm"                  : false,
            "selectedCorporate"         : {},
            "selectedCorporateLocation" : {},
            "selectedVendor"            : {},
            "selectedVendorLocation"    : {},
            "packageArray"              : [],
            "selectedPackages"          : [],
            "packageList"               : [],
            "attributeArray"            : [
                {
                    name : 'Extra Hrs',
                    field: 'extraHours',
                    type : 'number',
                    max  : 24,
                    val  : 0
                }, 
                {
                    name : 'Extra Km',
                    field: 'extraKM',
                    type : 'number',
                    max  : 1000,
                    val  : 0
                }, 
                {
                    name : 'Grace Hrs',
                    field: 'graceHours',
                    type : 'number',
                    max  : 24,
                    val  : 0
                }, 
                {
                    name : 'Grace KM',
                    field: 'graceKM',
                    type : 'number',
                    max  : 1000,
                    val  : 0
                },
                {
                    name : 'Driver Allowance',
                    field: 'driverAllowance',
                    type : 'number',
                    max  : 10000,
                    val  : 0
                }, 
                {
                    name : 'Night Charges (Local)',
                    field: 'nightChargesLocal',
                    type : 'number',
                    max  : 1000,
                    val  : 0
                }, 
                {
                    name : 'Night Charges (Outstation)',
                    field: 'nightChargesOutstation',
                    type : 'number',
                    max  : 1000,
                    val  : 0
                }, 
                // {
                //     name : 'Night Charges (From Time)',
                //     field: 'nightChargesFromTime',
                //     type : 'time',
                //     max  : 24,
                //     val  : '00:00'
                // }, 
                // {
                //     name : 'Night Charges (To Time)',
                //     field: 'nightChargesToTime',
                //     type : 'time',
                //     max  : 24,
                //     val  : '00:00'
                // }, 
                {
                    name : 'Night Charges Day',
                    field: 'nightChargesDay',
                    type : 'text',
                    val  : 'NA'
                    // max  : 10000000
                }, 
                {
                    name : 'Early Morning Charges',
                    field: 'earlyMorningCharges',
                    type : 'number',
                    max  : 10000,
                    val  : 0
                }, 
                // {
                //     name : 'Early Morning Charges (From Time)',
                //     field: 'earlyMorningChargesFromTime',
                //     type : 'time',
                //     max  : 24,
                //     val  : '00:00'
                // }, 
                // {
                //     name : 'Early Morning Charges (To Time)',
                //     field: 'earlyMorningChargesToTime',
                //     type : 'time',
                //     max  : 24,
                //     val  : '00:00'
                // }
            ],
            "endpoint"                  : "http://localhost:3066"
        };

        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    componentDidMount() {
        this.getPackages();
        this.getCategory();
        this.getPackageDetails();
        this.setState({
            contractID: this.props.match.params.contractID
        }, () => {
            this.edit();
        })
        window.scrollTo(0, 0);
        
        
    }
    validation(){
        jQuery.validator.setDefaults({
            debug: true,
            success: "valid"
        });
        $("#PackageManagement").validate({
            rules: {
                nightChargesFromTime: {
                    required: true,
                },
                nightChargesToTime: {
                    required: true,
                },
                earlyMorningChargesFromTime: {
                    required: true,
                },
                earlyMorningChargesToTime: {
                    required: true,
                },
            },
            errorPlacement: function (error, element) {
                if (element.attr("name") === "nightChargesFromTime") {
                    error.insertAfter("#nightChargesFromTime");
                }
                if (element.attr("name") === "nightChargesToTime") {
                    error.insertAfter("#nightChargesToTime");
                }
                if (element.attr("name") === "earlyMorningChargesFromTime") {
                    error.insertAfter("#earlyMorningChargesFromTime");
                }
                if (element.attr("name") === "earlyMorningChargesToTime") {
                    error.insertAfter("#earlyMorningChargesToTime");
                }
            }
        });
    }
    componentWillUnmount() {
        $("script[src='/js/adminLte.js']").remove();
        $("link[href='/css/dashboard.css']").remove();
    }
    handleChange(event) {
        event.preventDefault();
        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: event.target.value
        },()=>{
            console.log(this.state[name])
        });
    }
    componentWillReceiveProps(nextProps) {
        var contractID = nextProps.match.params.contractID;
        var packageID  = nextProps.match.params.packageID;
        if (contractID && packageID) {
            this.edit();
        }
        this.handleChange = this.handleChange.bind(this);
    }
    edit() {
        var contractID = this.props.match.params.contractID;
        var packageID  = this.props.match.params.packageID;
        if (contractID && packageID) {
            this.setState({
                "openForm"          : true,
            })
            axios.get('/api/contract/get/one/' + contractID)
            .then((response) => {
                document.getElementById("submitbtn").innerHTML = "Update";
                var packageDetail = (response.data.packages.filter((a, i)=>a._id === packageID))[0];
                this.state.packageArray.map((a, i)=>{
                    document.getElementById('package-'+a._id).classList.add("packagedisabled")
                    return (
                        document.getElementById(a._id).disabled= true
                        );
                })
                var pac = this.state.packageArray.filter((b, i)=>b._id === packageDetail.packageId);
                this.setState({
                    
                    ["package-"+packageDetail.packageId] : true,
                    selectedPackages    : [{
                        packageID       : packageDetail.packageId,
                        packageName     : packageDetail.packageName,
                        maxHours        : packageDetail.MaxHrs,
                        maxKm           : packageDetail.MaxKm,
                    }],
                    nightChargesFromTime        : packageDetail.nightChargesFromTime,
                    nightChargesToTime          : packageDetail.nightChargesToTime,
                    earlyMorningChargesFromTime : packageDetail.earlyMorningChargesFromTime,
                    earlyMorningChargesToTime   : packageDetail.earlyMorningChargesToTime,
                })
                
                packageDetail.extras.map((data, j)=>{
                    var categoryId = data.categoryId;
                    Object.entries(data).map(([key, value], i) => {
                        this.setState({
                            [key+"|"+categoryId] : value
                        })
                    })
                })
            })
            .catch((error) => {
            })
        }
    }
    getPackages(){
        axios.get("/api/packagemaster/get/list")
        .then((response)=>{
            for(var i = 0; i<response.data.length; i++){
                this.setState({
                    ["fixCharges-"+response.data[i]._id] : response.data[i].fixCharges
                })
            }
            this.setState({
                "packageArray" : response.data
            })
        })
        .catch((error)=>{

        })
    }
    getCategory(){
        axios.get("/api/categorymaster/get/list")
        .then((res)=>{
            this.setState({
                "categoryArray" : res.data
            })
        })
        .catch((error)=>{

        })
    }
    submit(event) {
        event.preventDefault();
        var extraDetail = [];
        var attributeArray = this.state.attributeArray;
        var categoryArray = this.state.categoryArray;
        for(var k=0; k<categoryArray.length; k++){
            extraDetail.push({
                category                    : categoryArray[k].category,
                categoryId                  : categoryArray[k]._id,
            });
            for(var j=0; j<attributeArray.length; j++){
                if(attributeArray[j].type === 'number'){
                    extraDetail[k][attributeArray[j].field]   = this.state[attributeArray[j].field+"|"+categoryArray[k]._id] ? this.state[attributeArray[j].field+"|"+categoryArray[k]._id] : 0;
                }else if(attributeArray[j].type === 'text'){
                    extraDetail[k][attributeArray[j].field]   = this.state[attributeArray[j].field+"|"+categoryArray[k]._id] ? this.state[attributeArray[j].field+"|"+categoryArray[k]._id] : 'NA';
                }else if(attributeArray[j].type === 'time'){
                    extraDetail[k][attributeArray[j].field]   = this.state[attributeArray[j].field+"|"+categoryArray[k]._id] ? this.state[attributeArray[j].field+"|"+categoryArray[k]._id] : '00:00 00';
                }
                
            }
        }
        var selectedPackages = this.state.selectedPackages;
        var packages = [];
        for(var i=0; i<selectedPackages.length; i++){
            packages.push({
                packageId                   : selectedPackages[i].packageID,
                packageName                 : selectedPackages[i].packageName,
                MaxHrs                      : selectedPackages[i].maxHours,
                MaxKm                       : selectedPackages[i].maxKm,
                nightChargesFromTime        : this.state.nightChargesFromTime ? this.state.nightChargesFromTime : '00:00 00',
                nightChargesToTime          : this.state.nightChargesToTime ? this.state.nightChargesToTime : '00:00 00',
                earlyMorningChargesFromTime : this.state.earlyMorningChargesFromTime ? this.state.earlyMorningChargesFromTime : '00:00 00',
                earlyMorningChargesToTime   : this.state.earlyMorningChargesToTime ? this.state.earlyMorningChargesToTime : '00:00 00',
                fixCharges                  : this.state["fixCharges-"+selectedPackages[i].packageID] ? this.state["fixCharges-"+selectedPackages[i].packageID] : document.getElementById("fixCharges-"+selectedPackages[i].packageID).getAttribute("data-value") 
            })
            packages[i].extras = extraDetail;
        }
        var formValues = {
            contractID : this.props.match.params.contractID,
            packageID  : this.props.match.params.packageID,
            packages   : packages
        }
        console.log($("#PackageManagement").valid());
        if($("#PackageManagement").valid()){
            if(this.props.match.params.packageID){
                axios.patch("/api/contract/patch/updatepackage", formValues)
                .then((response)=>{
                    document.getElementById("submitbtn").innerHTML = "Submit";
                    this.setState({
                        "openForm"          : false,
                    })
                    swal("Package details updated successfully.");
                    this.getPackages();
                    this.getPackageDetails();
                    this.fieldBlank();
                    this.props.history.push("/package-details/"+this.props.match.params.contractID);
                })
                .catch((error)=>{

                })
            }else{
                if(this.state.selectedPackages.length > 0){
                    axios.patch("/api/contract/patch/addpackage", formValues)
                    .then((response)=>{
                        this.setState({
                            "openForm"          : false,
                            "nightChargesFromTime" : "",
                            "nightChargesToTime" : "",
                            "earlyMorningChargesFromTime" : "",
                            "earlyMorningChargesToTime" : "",
                        })
                        swal("Package details added successfully.");
                        this.getPackages();
                        this.getPackageDetails();
                        this.fieldBlank();
                    })
                    .catch((error)=>{

                    })
                }else{
                    this.setState({
                        checkBoxError : "Please select atleast one package."
                    })
                }
            }
        }else{
            $('select.error:first').focus();
            $('input.error:first').focus();
        }

    }
    selectedPackages(event){
        var check = event.target.checked;
        var id = event.target.id;
        var value = event.target.value;
        var selectedPackages = this.state.selectedPackages;
        this.setState({
            [event.target.name] : this.state[event.target.name] ? false : true
        },()=>{
            if(check === true){
                selectedPackages.push({
                    packageID       : id,
                    packageName     : value.split("|")[0],
                    maxHours        : value.split("|")[1],
                    maxKm           : value.split("|")[2],
                });
            }else{
                var index = selectedPackages.findIndex(x => x.packageID === id);
                selectedPackages.splice(index, 1);
            }
            this.setState({
                checkBoxError : this.state.selectedPackages.length > 0 ? "" : "Please select at least one package."
            })
        })
    }
    getPackageDetails(){
        axios.get("/api/contract/get/one/"+this.props.match.params.contractID)
        .then((response)=>{
            var packageIds = [];
            for(var i=0; i<response.data.packages.length; i++){
                packageIds.push(response.data.packages[i].packageId);
            }
            this.setState({
                packageIds  : packageIds,
                packageList : response.data.packages
            })
        })
        .catch((error)=>{

        })
    }
    fieldBlank(){
        this.setState({
            "openForm"          : false,
            "selectedPackages"  : [],
            "nightChargesFromTime" : "",
            "nightChargesToTime" : "",
            "earlyMorningChargesFromTime" : "",
            "earlyMorningChargesToTime" : "",
        })
        for(var i=0; i<this.state.attributeArray.length; i++){
            for(var j=0; j<this.state.categoryArray.length; j++){
                this.setState({
                    [this.state.attributeArray[i].field+"|"+this.state.categoryArray[j]._id] : ""
                })
            }
        }
        for(var k=0; k<this.state.packageArray.length; k++){
            this.setState({
                ["package-"+this.state.packageArray[k]._id] : ""
            })
        }
    }
    delete(event){
        var contractID = this.props.match.params.contractID;
        var packageID = event.target.id;
        axios.delete("/api/contract/deletepackageincontract/"+contractID+"/"+packageID)
        .then((response)=>{
            swal("Package deleted successfully.")
            this.getPackageDetails();
            this.fieldBlank();
            this.props.history.push("/package-details/"+this.props.match.params.contractID);
        })
        .catch((error)=>{

        })
    }
    back(event) {
        event.preventDefault();
		var contractID = this.props.match.params.contractID;

		if (this.state.selectedPackages.length > 0 || this.state.nightChargesFromTime || this.state.nightChargesToTime || this.state.earlyMorningChargesFromTime || this.state.earlyMorningChargesToTime) {
			swal({
				// title: 'abc',
				text: "It seems that you are trying to add a package. Click 'Cancel' to continue adding package. Click 'Ok' to go to next page. But you may lose values if already entered in the package form.",
				buttons: {
					cancel: {
						text: "Cancel",
						value: false,
						visible: true,
						className: "CancelButtonSwal"
					},
					confirm: {
						text: "OK",
						value: true,
						visible: true,
						className: "OkButtonSwal",
						closeModal: true
					}
				},
			})
			.then((value) => {
				if(value){
					if(contractID){
                        this.props.history.push("/contract-management/"+contractID);
                    }else{
                        this.props.history.push("/contract-management");
                    }
				}else{
					this.props.history.push("/package-details/" + contractID);
				}
			})
			$(".OkButtonSwal").parents('.swal-button-container').addClass('postionSwalRight');
			$(".CancelButtonSwal").parents('.swal-button-container').addClass('postionSwalLeft');

		} else {
			if(contractID){
				this.props.history.push("/contract-management/"+contractID);
			}else{
				this.props.history.push("/contract-management");
			}
		}
    }
    async next(event) {
		event.preventDefault();
        var contractID = this.props.match.params.contractID;
        function packageLength(){
            return new Promise(function(resolve, reject){
            axios.get('/api/contract/get/one/' + contractID)
            .then((response) => {
                resolve(response.data.packages.length);
            })
            .catch((error) => {})
            })
        }
        var packageLength = await packageLength();
        console.log('packageLength', packageLength);
        if(packageLength > 0){
            if (this.state.selectedPackages.length > 0 || this.state.nightChargesFromTime || this.state.nightChargesToTime || this.state.earlyMorningChargesFromTime || this.state.earlyMorningChargesToTime) {
                swal({
                    // title: 'abc',
                    text: "It seems that you are trying to add a package. Click 'Cancel' to continue adding package. Click 'Ok' to go to next page. But you may lose values if already entered in the package form.",
                    buttons: {
                        cancel: {
                            text: "Cancel",
                            value: false,
                            visible: true,
                            className: "CancelButtonSwal"
                        },
                        confirm: {
                            text: "OK",
                            value: true,
                            visible: true,
                            className: "OkButtonSwal",
                            closeModal: true
                        }
                    },
                })
                    .then((value) => {
                        if(value){
                            this.props.history.push("/condition/" + contractID);
                        }else{
                            this.props.history.push("/package-details/" + contractID);
                        }
                    })
                $(".OkButtonSwal").parents('.swal-button-container').addClass('postionSwalRight');
                $(".CancelButtonSwal").parents('.swal-button-container').addClass('postionSwalLeft');
    
            } else {
                this.props.history.push("/condition/" + contractID);
            }
        }else{
            swal("Please add package details first.");
        }
    }
    openForm() {
		this.setState({
			openForm: this.state.openForm === false ? true : false
		},()=>{
            if(this.state.openForm === true){
                this.validation();
            }
            
        })
	}
    render() {
        return (
            <div className="">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <section className="content">
                            <div className="pageContent col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
                                    <h4 className="weighttitle col-lg-11 col-md-11 col-xs-11 col-sm-11 NOpadding-right">Contract Management</h4>
                                </div>
                                <div className="nav-center OnboardingTabs col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                    <ul className="nav nav-pills vendorpills col-lg-8 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                        <li className=" col-lg-3 col-md-2 col-sm-12 col-xs-12 transactionTab pdcls pdclsOne btn1 NOpadding-left  disabled">
                                            <a href={this.props.match.params.contractID ? "/contract-management/"+this.props.match.params.contractID : "/contract-management"} className="basic-info-pillss pills backcolor">
                                                <i className="fa fa-file" aria-hidden="true"></i> &nbsp;
                                                Contract
                                            </a>
                                            <div className="triangleone " id="triangle-right"></div>
                                        </li>
                                        <li className="active col-lg-3 col-md-2 col-sm-12 col-xs-12 transactionTab pdcls pdclsOne btn2 ">
											<div className="triangletwo" id="triangle-right1"></div>
											<a href={this.props.match.params.contractID ? "/package-details/"+this.props.match.params.contractID : "/package-details"} className="basic-info-pillss backcolor">
												<i className="fa fa-archive iconMarginLeft" aria-hidden="true"></i> &nbsp;
												Packages
											</a>
											<div className="trianglethree triangleones forActive" id="triangle-right"></div>
										</li>
                                        
                                        <li className=" col-lg-3 col-md-2 col-sm-12 col-xs-12 transactionTab pdcls pdclsOne btn1 disabled">
                                            <div className="triangletwo" id="triangle-right1"></div>
                                            <a href={this.props.match.params.contractID ? "/condition/"+this.props.match.params.contractID : "/condition"} className="basic-info-pillss pills backcolor">
                                                <i className="fa fa-paste iconMarginLeft" aria-hidden="true"></i> &nbsp;
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
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-sm-6 locationTabs">
                                                    <h4 className="MasterBudgetTitle"><i className="fa fa-database" aria-hidden="true"></i> Package Details</h4>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-sm-6 locationTabs">
                                                    <div className="button4  pull-right" onClick={this.openForm.bind(this)}>
                                                        {   this.state.openForm === true ?
                                                            <i className="fa fa-minus" aria-hidden="true"></i>
                                                            :
                                                            <i className="fa fa-plus" aria-hidden="true"></i>

                                                        }&nbsp;Add Packages
                                                    </div>
                                                </div>
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 formHrTag"></div>
                                            </div>
                                            {
                                                this.state.openForm === true ?
                                                <form id="PackageManagement">
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                                    <div className="col-lg-12 col-md-12 col-sm-12 submitForm">
                                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                                            <br />
                                                        </div>
                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  NOpadding">
                                                                <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{"paddingBottom" : "10px"}}>
                                                                        <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Select Packages <sup className="astrick">*</sup></label>
                                                                    </div>
                                                                    {
                                                                        this.state.packageArray && this.state.packageArray.length > 0?
                                                                            this.state.packageArray.map((data, i)=>{
                                                                                return(
                                                                                    <div key={i} className="col-lg-4 col-md-4 col-sm-12 col-xs-12 packages">
                                                                                        <label className="checkLabel">
                                                                                            <input  type="checkbox" id={data._id} 
                                                                                                    value={data.packageName+"|"+data.maxHours+"|"+data.maxKm} 
                                                                                                    name={"package-"+data._id} 
                                                                                                    checked={this.state["package-"+data._id] ? true : false}
                                                                                                    onChange={this.selectedPackages.bind(this)} />

                                                                                            <span className="checkmark" id={"package-"+data._id} ></span>
                                                                                        </label>
                                                                                        <span>{data.packageName}</span> &nbsp;
                                                                                        <input  className="pull-right form-control hello" 
                                                                                                type="number"
                                                                                                style={{"width" : "60px", "height": "25px"}}   
                                                                                                id={"fixCharges-"+data._id}
                                                                                                ref={"fixCharges-"+data._id}
                                                                                                name={"fixCharges-"+data._id} 
                                                                                                data-value={data.fixCharges}
                                                                                                value={this.state["fixCharges-"+data._id]} 
                                                                                                onKeyDown={(event)=>(event.target.value > 10000 ? (((event.which ? event.which : event.keyCode) !== 8) ? (event.preventDefault(), true) : false) : true)}
                                                                                                onChange={this.handleChange.bind(this)} /> 
                                                                                        
                                                                                    </div>
                                                                                )
                                                                            })
                                                                        :
                                                                        null
                                                                    }
                                                                    
                                                                </div>
                                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                    <label className="error">{this.state.checkBoxError}</label>
                                                                </div>
                                                                
                                                                <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                    <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12" >
                                                                        <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Night Charges (From Time) <sup className="astrick">*</sup></label>
                                                                        <input className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12 inputText" type="time" ref="nightChargesFromTime" name="nightChargesFromTime" id="nightChargesFromTime" value={this.state.nightChargesFromTime} onChange={this.handleChange} />
                                                                    </div>
                                                                    <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12" >
                                                                        <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Night Charges (To Time) <sup className="astrick">*</sup></label>
                                                                        <input min={this.state.nightChargesFromTime} className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12 inputText" type="time" ref="nightChargesToTime" name="nightChargesToTime" id="nightChargesToTime" value={this.state.nightChargesToTime} onChange={this.handleChange} />
                                                                    </div>
                                                                    <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12" >
                                                                        <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Early Morning Charges (From Time) <sup className="astrick">*</sup></label>
                                                                        <input className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12 inputText" type="time" ref="earlyMorningChargesFromTime" name="earlyMorningChargesFromTime" id="earlyMorningChargesFromTime" value={this.state.earlyMorningChargesFromTime} onChange={this.handleChange} />
                                                                    </div>
                                                                    <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12" >
                                                                        <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Early Morning Charges (To Time) <sup className="astrick">*</sup></label>
                                                                        <input min={this.state.earlyMorningChargesFromTime} className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12 inputText" type="time" ref="earlyMorningChargesToTime" name="earlyMorningChargesToTime" id="earlyMorningChargesToTime" value={this.state.earlyMorningChargesToTime} onChange={this.handleChange} />
                                                                    </div>
                                                                </div>
                                                                <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                <table className="table textAlignLeft">
                                                                    <thead>
                                                                        <tr>
                                                                            <th></th>
                                                                            {
                                                                                this.state.categoryArray && this.state.categoryArray.length > 0 ?
                                                                                    this.state.categoryArray.map((data, i)=>{
                                                                                        return(
                                                                                            <th key={i}>{data.category}</th>
                                                                                        );
                                                                                    })
                                                                                :
                                                                                null
                                                                            }
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {   this.state.attributeArray && this.state.attributeArray.length > 0 ?
                                                                            this.state.attributeArray.map((updata, index)=>{
                                                                                return(
                                                                                    <tr key={index}>
                                                                                        <td>{updata.name}</td>
                                                                                        {
                                                                                            this.state.categoryArray && this.state.categoryArray.length > 0 ?
                                                                                                this.state.categoryArray.map((data, i)=>{
                                                                                                    return(
                                                                                                        <td key={i}>
                                                                                                            <input  type={updata.type} 
                                                                                                                    value={this.state[updata.field+"|"+data._id]} 
                                                                                                                    name={updata.field+"|"+data._id} 
                                                                                                                    onChange={this.handleChange}
                                                                                                                    onKeyDown={updata.max ? ((event)=>(event.target.value > updata.max ? (((event.which ? event.which : event.keyCode) !== 8) ? (event.preventDefault(), true) : false) : true)): ()=>{}}
                                                                                                                    max={updata.max}
                                                                                                                    min={0}
                                                                                                                    placeholder={updata.val}
                                                                                                                    className="form-control" style={{"width" : "90px", "height": "25px", "display": "inline-block"}} />
                                                                                                        </td>
                                                                                                    );
                                                                                                })
                                                                                            :
                                                                                            null
                                                                                        }
                                                                                    </tr>
                                                                                );
                                                                            })
                                                                            :
                                                                            null
                                                                        }
                                                                        
                                                                    </tbody>
                                                                </table>
                                                                </div>
                                                            </div>
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
                                            </form>
                                                :
                                                null
                                            }
                                            
                                        </div>
                                        
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margBttm25">
                                                <button className="button2 btn" onClick={this.back.bind(this)}><i className="fa fa-angle-double-left" aria-hidden="true"></i>&nbsp;Contract</button>
                                                <button className="button1 pull-right btn" onClick={this.next.bind(this)}>Next&nbsp;<i className="fa fa-angle-double-right" aria-hidden="true"></i></button>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
										{this.state.packageList && this.state.packageList.length > 0 ?
											<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
												{/* <div className="col-lg-12 col-md-12 col-sm-12 col-sm-12 foothd">
													<h4 className="MasterBudgetTitle">Packages</h4>
												</div> */}
												<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
													{this.state.packageList && this.state.packageList.length > 0 ?
														this.state.packageList.map((data, index) => {
															return (
																<div key={index} className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-12 boxul1" key={index}>
																	<div className="liheader1 col-lg-1 col-md-1 col-sm-1 col-xs-1">
																		<i className="fa fa-database " aria-hidden="true"></i>
																	</div>
                                                                    <ul className="col-lg-5 col-md-5 col-sm-10 col-xs-10 palfclr addrbox">
																		<li><b>Package :</b> {data.packageName}</li>
																		<li>Max Hours : {data.MaxHrs}</li>
																		<li>Max KM : {data.MaxKm}</li>
																		<li>Fix Charges : {data.fixCharges}</li>
																	</ul>
                                                                    <ul className="col-lg-5 col-md-5 col-sm-10 col-xs-10 palfclr addrbox">
																		<li>Night Charges (From Time) : {data.nightChargesFromTime}</li>
																		<li>Night Charges (To Time) : {data.nightChargesToTime}</li>
																		<li>Early Morning Charges (From Time) : {data.earlyMorningChargesFromTime}</li>
																		<li>Early Morning Charges (To Time) : {data.earlyMorningChargesToTime}</li>
																	</ul>
																	<div className="liheader1 dropdown col-lg-1 col-md-1 col-sm-1 col-xs-1">
																		<i className="fa fa-ellipsis-h dropbtn" aria-hidden="true"></i>
																		<div className="dropdown-content dropdown-contractLocation">
																			<ul className="pdcls ulbtm">
																				<li name={index}>
																					<a href={"/package-details/"+this.props.match.params.contractID+"/"+data._id}><i className="fa fa-pencil penmrleft" aria-hidden="true"></i>&nbsp;&nbsp;Edit</a>
																				</li>
																				<li name={index}>
																					<span data-toggle="modal" data-target={"#showDeleteModal-"+data._id}><i className="fa fa-trash-o" aria-hidden="true"></i> &nbsp; Delete</span>
																				</li>
																			</ul>
																		</div>
																	</div>
                                                                    <div className="modal" id={"showDeleteModal-" +data._id} role="dialog">
                                                                        <div className=" adminModal adminModal-dialog col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                            <div className="modal-content adminModal-content col-lg-4 col-lg-offset-4 col-md-6 col-md-offset-3 col-sm-10 col-sm-offset-1 col-xs-12 noPadding">
                                                                                <div className="modal-header adminModal-header col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                                    <div className="adminCloseCircleDiv pull-right  col-lg-1 col-lg-offset-11 col-md-1 col-md-offset-11 col-sm-1 col-sm-offset-11 col-xs-12 NOpadding-left NOpadding-right">
                                                                                        <button type="button" className="adminCloseButton" data-dismiss="modal" data-target={"#showDeleteModal-" + (data._id).replace(/[^a-zA-Z]/g, "")}>&times;</button>
                                                                                    </div>

                                                                                </div>
                                                                                <div className="modal-body adminModal-body col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                                    <h4 className="blackLightFont textAlignCenter examDeleteFont col-lg-12 col-md-12 col-sm-12 col-xs-12">Are you sure you want to delete?</h4>
                                                                                </div>

                                                                                <div className="modal-footer adminModal-footer col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                                                        <button type="button" className="btn adminCancel-btn col-lg-7 col-lg-offset-1 col-md-4 col-md-offset-1 col-sm-8 col-sm-offset-1 col-xs-10 col-xs-offset-1" data-dismiss="modal">CANCEL</button>
                                                                                    </div>
                                                                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                                                        <button onClick={this.delete.bind(this)} id={data._id} type="button" className="btn examDelete-btn col-lg-7 col-lg-offset-5 col-md-7 col-md-offset-5 col-sm-8 col-sm-offset-3 col-xs-10 col-xs-offset-1" data-dismiss="modal">DELETE</button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-sm-12">
                                                                        <table className="table ">
                                                                            <thead className="">
                                                                                <tr>
                                                                                    <th></th>
                                                                                    {
                                                                                        data.extras && data.extras.length > 0 ?
                                                                                            data.extras.map((a, i)=>{
                                                                                                return(
                                                                                                    <th key={i} className="textAlignRight">{a.category}</th>
                                                                                                );
                                                                                            })
                                                                                        :
                                                                                        null
                                                                                    }
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody className="packageList">
                                                                            {   this.state.attributeArray && this.state.attributeArray.length > 0 ?
                                                                                this.state.attributeArray.map((updata, index)=>{
                                                                                    return(
                                                                                        <tr key={index}>
                                                                                            <td>{updata.name}</td>
                                                                                            {
                                                                                                data.extras && data.extras.length > 0 ?
                                                                                                data.extras.map((datas, i)=>{
                                                                                                    return(
                                                                                                        Object.entries(datas).map(([key, value], j)=>{
                                                                                                            if(updata.field === key){
                                                                                                                return(
                                                                                                                    <td key={j} className="textAlignRight">{datas[updata.field]}</td>
                                                                                                                );
                                                                                                            }
                                                                                                        })
                                                                                                    );
                                                                                                })
                                                                                                :
                                                                                                null
                                                                                            }
                                                                                        </tr>
                                                                                    );
                                                                                })
                                                                                :
                                                                                null
                                                                            }
                                                                            </tbody>
                                                                        </table>
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
export default Package;