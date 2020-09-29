import React, { Component } from 'react';
import $ from 'jquery';
import jQuery from 'jquery';
import axios from 'axios';
import swal from 'sweetalert';
import _ from 'underscore';
import 'bootstrap/js/tab.js';
import 'react-phone-input-2/lib/style.css';
import moment from 'moment';
import { stat } from 'fs';
import './EntityMapping.css'
// import socketIOClient from "socket.io-client";
// const io = require('socket.io-client')

// const socket = io.connect(process.env.REACT_APP_BASE_URL)

class EntityMapping extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "pathname"                  : this.props.match.params.entity,
            "selectedCorporate"         : {},
            "selectedCorporateLocation" : {},
            "selectedVendor"            : [],
            "mappingArray"             : [],
            "endpoint"                  : "http://localhost:3066"
        };

        this.handleChange = this.handleChange.bind(this);
        this.getCorpLocation = this.getCorpLocation.bind(this);
        this.submit = this.submit.bind(this);
    }
    componentDidMount() {
        // ============= Socket Programming ===============
        // const { endpoint } = this.state;
        // const socket = socketIOClient(endpoint);
        // socket.on("FromAPI", data => this.setState({ response: data }));


        this.getCorporate();
        this.getVendor();
        this.getContract();
        this.setState({
            mappingID: this.props.match.params.mappingID
        }, () => {
            this.edit();
        })
        window.scrollTo(0, 0);
        $.validator.addMethod("regxcorporate", function (value, element, arg) {
            return arg !== value;
        }, "Please select the corporate");
        $.validator.addMethod("regxcorporateLocation", function (value, element, arg) {
            return arg !== value;
        }, "Please select the corporate location");

        jQuery.validator.setDefaults({
            debug: true,
            success: "valid"
        });
        $("#EntityMapping").validate({
            rules: {
                corporate: {
                    required: true,
                    regxcorporate: "--Select Corporate--"
                },
                corporateLocation: {
                    required: true,
                    regxcorporateLocation: "--Select Corporate Location--"
                },
            },
            errorPlacement: function (error, element) {
                if (element.attr("name") === "corporate") {
                    error.insertAfter("#corporate");
                }
                if (element.attr("name") === "corporateLocation") {
                    error.insertAfter("#corporateLocation");
                }
            }
        });
    }
    componentWillUnmount() {
        $("script[src='/js/adminLte.js']").remove();
        $("link[href='/css/dashboard.css']").remove();
    }
    
    handlePercentChange(event) {
        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: event.target.value
        },()=>{

        });
    }
    submit(event) {
        event.preventDefault();
        if ($('#EntityMapping').valid() && this.state.selectedVendor.length > 0) {
            var selectedVendor =  this.state.selectedVendor;
            for(var i=0; i<selectedVendor.length; i++){
                selectedVendor[i].assignedPercent = this.state["assignedPercent-"+selectedVendor[i].vendorID] ? this.state["assignedPercent-"+selectedVendor[i].vendorID] : 0
            }
            var formValues = {
                "mappingID"                  : this.props.match.params.mappingID,
                "corporateId"                 : this.state.corporate,
                "corporateLocationId"         : this.state.corporateLocation,
                "vendor"                    : selectedVendor,
            }
            var y = 0;
            selectedVendor.forEach((num) => {y = y+Math.round(num.assignedPercent); return y;});
            if(y > 100){
                swal("Total Percent for selected vendor should be 100")
            }else{
                if(this.props.match.params.mappingID) {
                    axios.patch('/api/entitymapping/patch', formValues)
                    .then((response) => {
                        // this.setState({
                        //     "corporate"                   : "",
                        //     "corporateLocation"           : "",
                        //     "vendor"                      : "",
                        //     "selectedVendor"              : [],
                        // })
                        // this.props.history.push("/viewmapping/"+this.props.match.params.mappingID);
                        swal("Corporate and Vendor mapped successfully.");
                        document.getElementById("submitbtn").innerHTML = "Submit";
                    })
                    .catch((error) => {

                    })
                }else{
                    axios.post('/api/entitymapping/post', formValues)
                    .then((response) => {
                        if(response.data.duplicate === true){
                            swal("Mapping already exist for selected corporate and its location.");
                        }else{
                            this.setState({
                                "corporateId"                 : "",
                                "corporateLocationId"         : "",
                                "vendor"                    : "",
                                "selectedVendor"              : [],
                            })
                            this.props.history.push("/viewmapping/"+response.data.mappingID);
                            swal("Corporate and Vendor mapped successfully.");
                        }
                    })
                    .catch((error) => {

                    })
                }
            }
        } else {
            $(event.target).parent().parent().find('.inputText.error:first').focus();
            this.setState({
                checkBoxError : "Please select atleast one vendor."
            })
        }

    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.match.params.mappingID){
            this.edit();
        }
        this.handleChange = this.handleChange.bind(this);
    }
    edit() {
        var mappingID = this.state.mappingID;
        if (mappingID) {
            axios.get('/api/entitymapping/get/one/' + mappingID)
            .then((response) => {
                this.getCorpLocation(response.data.corporateId, response.data.corporateLocationId);

                document.getElementById("submitbtn").innerHTML = "Update";
                this.setState({
                    "mappingID"                  : this.props.match.params.mappingID,
                    "corporate"                   : response.data.corporateId,
                    "corporateLocation"           : response.data.corporateLocationId,
                    "selectedVendor"                      : response.data.vendor,
                })
                for(var i=0; i<response.data.vendor.length; i++){
                    this.setState({
                        [response.data.vendor[i].vendorID] : true,
                        ["assignedPercent-"+response.data.vendor[i].vendorID] :response.data.vendor[i].assignedPercent
                    })
                }
            })
            .catch((error) => {
            })
        }
    }
    handleChange(event) {
        event.preventDefault();
        const target = event.target;
        const name = target.name;
        var value = event.target.value;
        this.setState({
            [name]: event.target.value
        },()=>{
            if(this.state[name] ===  this.state.corporate){
                this.getCorpLocation(value, '');
                this.setState({
                    corporateLocation : ''
                })
            }else if(this.state[name] === this.state.corporateLocation && this.state.corporate){
                this.getCorpLocation(this.state.corporate, this.state.corporateLocation)
            }
        });
    }
    getCorporate(){
        axios.get('/api/entitymaster/get/corporate')
		.then((response) => {
			this.setState({
				corporateArray: response.data
			})
		})
		.catch((error) => {
			
		})
    }
    getCorpLocation(corporateId, locationId){
        axios.get('/api/entitymaster/get/one/'+corporateId)
        .then((response)=>{
            this.setState({
                selectedCorporate:  response.data,
                corporateLocationArray: response.data.locations
            },()=>{
                if(this.state.corporateLocationArray && this.state.corporateLocationArray.length > 0){
                    var selectedCorporateLocation = this.state.corporateLocationArray.filter((a)=> a._id === locationId);
                    this.setState({
                        selectedCorporateLocation : selectedCorporateLocation[0]
                    })
                }else{
                    this.setState({
                        selectedCorporateLocation : []
                    })
                }
            })
        })
        .catch((error)=>{

        })
    }
    getVendor(){
        axios.get('/api/entitymaster/get/vendor')
		.then((response) => {
            var assignedPercent = (100/response.data.length).toFixed(2);
            for(var i=0; i<response.data.length; i++){
                this.setState({
                    ["assignedPercent-"+response.data[i]._id] : assignedPercent
                })
            }
			this.setState({
				vendorArray: response.data
			})
		})
		.catch((error) => {
			
		})
    }
    getContract(){
        axios.get("/api/entitymapping/get/joinentitieslist")
        .then((response)=>{
            console.log('mappingArray', response.data);
            this.setState({
                mappingArray : response.data
            })
        })
        .catch((error)=>{

        })
    }
    delete(event){
        var mappingID = event.target.id;
        axios.delete("/api/entitymapping/delete/"+mappingID)
        .then((response)=>{
            this.getContract();
            this.props.history.push("/entity-mapping");
            this.setState({
                "corporate"                 : "--Select Corporate--",
                "corporateLocation"         : "",
                "vendor"                    : "",
                "vendorLocation"            : "",
                "selectedCorporate"         : {},
                "selectedCorporateLocation" : {},
                "selectedVendor"            : {},
                "selectedVendorLocation"    : {}
            })
            document.getElementById("submitbtn").innerHTML = "Submit";
            swal("Data deleted successfully.")
        })
        .catch((error)=>{

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
    selectVendor(event){
        var check = event.target.checked;
        var id = event.target.id;
        var value = event.target.value;
        var selectedVendor = this.state.selectedVendor;
        this.setState({
            [event.target.name] : this.state[event.target.name] ? false : true
        },()=>{
            if(check === true){
                selectedVendor.push({
                    vendorID          : id,
                    // "assignedPercent" : this.state["assignedPercent-"+id] ? this.state["assignedPercent-"+id] : 0
                });
            }else{
                var index = selectedVendor.findIndex(x => x.packageID === id);
                selectedVendor.splice(index, 1);
            }
            this.setState({
                selectedVendor : selectedVendor,
                checkBoxError : this.state.selectedVendor.length > 0 ? "" : "Please select atleast one vendor."
            })
        })
    }
    render() {
        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <section className="content">
                            <div className="pageContent col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
                                    <h4 className="weighttitle col-lg-11 col-md-11 col-xs-11 col-sm-11 NOpadding-right">Map Corporate and Vendor</h4>
                                </div>
                                <div className="nav-center OnboardingTabs col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                    <ul className="nav nav-pills vendorpills col-lg-6 col-lg-offset-3 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                        <li className="active col-lg-6 col-md-6 col-sm-12 col-xs-12 transactionTab pdcls pdclsOne btn1 NOpadding-left disabled">
                                            <a href="/entity-mapping" className="basic-info-pillss pills backcolor">
                                                <i className="fa fa-file" aria-hidden="true"></i> &nbsp;
                                                Contract
                                            </a>
                                            <div className="trianglethree triangleones forActive" id="triangle-right"></div>
                                        </li>
                                        <li className="col-lg-6 col-md-6 col-sm-12 col-xs-12 transactionTab noRightPadding pdcls btn4 disabled">
											<div className="trianglesix" id="triangle-right2"></div>
											<a href="/viewmapping" className="basic-info-pillss backcolor">
                                            <i className="fa fa-eye iconMarginLeft" aria-hidden="true"></i> &nbsp;
												View
											</a>
										</li>
                                    </ul>
                                </div>
                                <section className="Content">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <form id="EntityMapping">
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                                    <div className="col-lg-12 col-md-12 col-sm-12 submitForm">
                                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                                            <br />
                                                        </div>
                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  NOpadding">
                                                                <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                    <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12" >
                                                                        <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Corporate <sup className="astrick">*</sup></label>
                                                                        <select id="corporate" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.corporate} ref="corporate" name="corporate" onChange={this.handleChange.bind(this)}>
                                                                            <option>--Select Corporate--</option>
                                                                            {
                                                                                this.state.corporateArray && this.state.corporateArray.length > 0 ?
                                                                                    this.state.corporateArray.map((data, i)=>{
                                                                                        return(
                                                                                            <option key={i} value={data._id}>{data.companyName}</option>
                                                                                        );
                                                                                    })
                                                                                :
                                                                                null
                                                                            }
                                                                        </select>
                                                                    </div>
                                                                    <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12" >
                                                                        <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Corporate Location <sup className="astrick">*</sup></label>
                                                                        <select id="corporateLocation" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.corporateLocation} ref="corporateLocation" name="corporateLocation" onChange={this.handleChange.bind(this)}>
                                                                            <option>--Select Corporate Location--</option>
                                                                            {
                                                                                this.state.corporateLocationArray && this.state.corporateLocationArray.length > 0 ?
                                                                                    this.state.corporateLocationArray.map((data, i)=>{
                                                                                        return(
                                                                                            <option key={i} value={data._id}>{((data.locationType).match(/\b(\w)/g)).join('')} - {data.area} {data.city}, {data.stateCode} - {(data.countryCode)}  </option>
                                                                                        );
                                                                                    })
                                                                                :
                                                                                null
                                                                            }
                                                                        </select>
                                                                    </div>
                                                                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12" >
                                                                        <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Vendor <sup className="astrick">*</sup></label>
                                                                        {
                                                                                this.state.vendorArray && this.state.vendorArray.length > 0 ?
                                                                                    this.state.vendorArray.map((data, i)=>{
                                                                                        
                                                                                        return(
                                                                                            <div key={i} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding" style={{'marginBottom':'10px'}}>
                                                                                                <label className="entitycheckLabel col-lg-1 col-md-1 col-sm-1 col-xs-1">
                                                                                                    <input  type="checkbox" id={data._id} 
                                                                                                            value={data._id} 
                                                                                                            name={data._id} 
                                                                                                            checked={this.state[data._id] ? true : false}
                                                                                                            onChange={this.selectVendor.bind(this)} />

                                                                                                    <span className="checkmarks" id={"vendor-"+data._id} ></span>
                                                                                                </label>
                                                                                                <span className="col-lg-7 col-md-7 col-sm-7 col-xs-7 NOpadding wordBreak">{data.companyName}</span>
                                                                                                <span className="form-control col-lg-3 col-md-3 col-sm-3 col-xs-3 inputText" style={{ 'background': '#ccc', 'padding': '0px', 'width':'auto', 'height': '27px' }}>
                                                                                                    <input  className="form-control col-lg-9 col-md-9 col-sm-9 col-xs-9" 
                                                                                                            type="number"
                                                                                                            max="100"
                                                                                                            title="Percentage must be less than or equal to 100"
                                                                                                            style={{"width" : "80px", "height": "25px"}}   
                                                                                                            ref={"assignedPercent-"+data._id}
                                                                                                            name={"assignedPercent-"+data._id} 
                                                                                                            value={this.state["assignedPercent-"+data._id]} 
                                                                                                            onKeyDown={(event)=>(event.target.value > 100 ? (((event.which ? event.which : event.keyCode) !== 8) ? (event.preventDefault(), true) : false) : true)}
                                                                                                            onChange={this.handlePercentChange.bind(this)} /> 
                                                                                                    <span className="col-lg-3 col-md-3 col-sm-3 col-xs-3 percentspan">%</span>
                                                                                                </span> 
                                                                                            </div>
                                                                                        );
                                                                                    })
                                                                                :
                                                                                null
                                                                            }
                                                                            <label className="error">{this.state.checkBoxError}</label>
                                                                    </div>
                                                                    
                                                                </div>
                                                                <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                                    {
                                                                        this.state.selectedCorporate.companyName ? 
                                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 detailBox marbtm30">
                                                                                <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 detailBoxImg" style={{"backgroundImage":`url(`+this.state.selectedCorporate.companyLogo +`)`}}></div>
                                                                                <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12">
                                                                                    <h5 className="detailtitle">{this.state.selectedCorporate.companyName}</h5>
                                                                                    <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                                        <li><i className="fa fa-user-o "></i> {this.state.selectedCorporate.groupName}</li>
                                                                                        <li><i className="fa fa-globe"></i> {this.state.selectedCorporate.website}</li>
                                                                                        <li><i className="fa fa-envelope "></i> {this.state.selectedCorporate.companyEmail}</li>
                                                                                        <li>CIN: {this.state.selectedCorporate.CIN}</li>
                                                                                        <li>TAN: {this.state.selectedCorporate.TAN}</li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                        :
                                                                        null
                                                                    }
                                                                    {
                                                                        this.state.selectedCorporateLocation && this.state.selectedCorporateLocation.locationType ? 
                                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 detailBox">
                                                                                <div className="col-lg-1 col-md-1 col-sm-12 col-xs-12 mapIconMargin">
                                                                                    <i className="fa fa-map-marker addressIcon"></i>
                                                                                </div>
                                                                                <div className="col-lg-6 col-md-1 col-sm-12 col-xs-12">
                                                                                    <h4>Location Details</h4>
                                                                                </div>
                                                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                                    <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                                        <li> {this.state.selectedCorporateLocation.locationType}</li>
                                                                                        <li> {this.state.selectedCorporateLocation.addressLine1}</li>
                                                                                        <li> {this.state.selectedCorporateLocation.addressLine2}</li>
                                                                                        <li> {this.state.selectedCorporateLocation.area} {this.state.selectedCorporateLocation.city}</li>
                                                                                        <li> {this.state.selectedCorporateLocation.district} {this.state.selectedCorporateLocation.state} {this.state.selectedCorporateLocation.country}</li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                        :
                                                                        null
                                                                    }
                                                                    </div>
                                                                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                                    {
                                                                        this.state.selectedVendor.companyName ? 
                                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 detailBox marbtm30">
                                                                                <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 detailBoxImg" style={{"backgroundImage":`url(`+this.state.selectedVendor.companyLogo+`)`}}></div>
                                                                                <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12">
                                                                                    <h5 className="detailtitle">{this.state.selectedVendor.companyName}</h5>
                                                                                    <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                                        <li><i className="fa fa-user-o "></i> {this.state.selectedVendor.groupName}</li>
                                                                                        <li><i className="fa fa-globe"></i> {this.state.selectedVendor.website}</li>
                                                                                        <li><i className="fa fa-envelope "></i> {this.state.selectedVendor.companyEmail}</li>
                                                                                        <li>CIN: {this.state.selectedVendor.CIN}</li>
                                                                                        <li>TAN: {this.state.selectedVendor.TAN}</li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                        :
                                                                        null
                                                                    }
                                                                    {
                                                                        this.state.selectedVendorLocation && this.state.selectedVendorLocation.locationType ? 
                                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 detailBox">
                                                                                <div className="col-lg-1 col-md-1 col-sm-12 col-xs-12 mapIconMargin">
                                                                                    <i className="fa fa-map-marker addressIcon"></i>
                                                                                </div>
                                                                                <div className="col-lg-6 col-md-1 col-sm-12 col-xs-12">
                                                                                    <h4>Location Details</h4>
                                                                                </div>
                                                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                                    <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                                        <li> {this.state.selectedVendorLocation.locationType}</li>
                                                                                        <li> {this.state.selectedVendorLocation.addressLine1}</li>
                                                                                        <li> {this.state.selectedVendorLocation.addressLine2}</li>
                                                                                        <li> {this.state.selectedVendorLocation.area} {this.state.selectedVendorLocation.city}</li>
                                                                                        <li> {this.state.selectedVendorLocation.district} {this.state.selectedVendorLocation.state} {this.state.selectedVendorLocation.country}</li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
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
										{this.state.mappingArray && this.state.mappingArray.length > 0 ?
											<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
												<div className="col-lg-12 col-md-12 col-sm-12 col-sm-12 foothd">
													<h4 className="MasterBudgetTitle col-lg-12">Contract Details</h4>
												</div>
												<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
													{this.state.mappingArray && this.state.mappingArray.length > 0 ?
														this.state.mappingArray.map((data, index) => {
															return (
																<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12" key={index}>
                                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 boxul1">
    																	<div className="contractIcon col-lg-1 col-md-1 col-sm-1 col-xs-1">
    																		<i className="fa fa-handshake-o " aria-hidden="true"></i>
    																	</div>
                                                                        {
                                                                            data.corporate ? 
                                                                            <ul className="col-lg-10 col-md-10 col-sm-10 col-xs-10 palfclr addrbox">
                                                                                <li><b>Corporate :</b> {data.corporate.companyName}</li>
                                                                                <li>{data.corporate.website}</li>
                                                                                <li>{data.corporate.companyEmail}</li>
                                                                                <br />
                                                                                <li><b>Vendor(s) :</b></li>
                                                                                {
                                                                                    data.vendor && data.vendor.length > 0?
                                                                                        data.vendor.map((a, i)=>{
                                                                                            return(
                                                                                                <li>{a.companyName} </li>
                                                                                            );
                                                                                        })
                                                                                    :
                                                                                    null
                                                                                }
                                                                                
                                                                            </ul>
                                                                            :
                                                                            <ul className="col-lg-10 col-md-10 col-sm-10 col-xs-10 palfclr addrbox"></ul>
                                                                        }
                                                                        
    																	<div className="dotsContainer dropdown col-lg-1 col-md-1 col-sm-1 col-xs-1">
    																		<i className="fa fa-ellipsis-h dropbtn" aria-hidden="true"></i>
    																		<div className="dropdown-content dropdown-contractLocation">
    																			<ul className="pdcls ulbtm">
    																				<li name={index}>
    																					<a href={"/entity-mapping/"+data._id}><i className="fa fa-pencil penmrleft" aria-hidden="true"></i>&nbsp;&nbsp;Edit</a>
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
export default EntityMapping;