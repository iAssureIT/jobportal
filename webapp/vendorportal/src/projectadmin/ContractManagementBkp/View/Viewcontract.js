import React, { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';
import _ from 'underscore';
import moment from 'moment';
import swal                   from 'sweetalert';

import 'bootstrap/js/tab.js';
import 'react-phone-input-2/lib/style.css';
import './Viewcontract.css';
class Viewcontract extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "pathname": this.props.match.params.entitymastertity,
            "selectedCorporate": {},
            "selectedCorporateLocation": {},
            "contractID": "",
            "vendorID": "",
            "selectedVendor": {},
            "selectedVendorLocation": {},
            "contractDetails": [],
            "attributeArray": [
                {
                    name: 'Extra Hrs',
                    field: 'extraHours',
                    type: 'number',
                    max: 24
                },
                {
                    name: 'Extra Km',
                    field: 'extraKM',
                    type: 'number',
                    max: 1000
                },
                {
                    name: 'Grace Hrs',
                    field: 'graceHours',
                    type: 'number',
                    max: 24
                },
                {
                    name: 'Grace KM',
                    field: 'graceKM',
                    type: 'number',
                    max: 1000
                },
                {
                    name: 'Driver Allowance',
                    field: 'driverAllowance',
                    type: 'number',
                    max: 10000
                },
                {
                    name: 'Night Charges (Local)',
                    field: 'nightChargesLocal',
                    type: 'number',
                    max: 1000,
                    val: 0
                },
                {
                    name: 'Night Charges (Outstation)',
                    field: 'nightChargesOutstation',
                    type: 'number',
                    max: 1000,
                    val: 0
                },
                {
                    name: 'Night Charges Day',
                    field: 'nightChargesDay',
                    type: 'text',
                    // max  : 10000000
                },
                {
                    name: 'Early Morning Charges',
                    field: 'earlyMorningCharges',
                    type: 'number',
                    max: 10000
                }],
       };
console.log('this.props.match.params.entitymastertity',this.props.match.params.entitymastentity);
    }
    componentDidMount() {
        var vendorID ="";
        var userId =  localStorage.getItem("user_ID");

        axios.get("/api/entitymaster/get/vendor")

            .then((response) => {
                this.setState({
                    entityList   : response.data
                },()=>{
                    console.log("entityList",this.state.entityList);
                    for(var i=0; i<this.state.entityList.length; i++)
                    {
                        for(var j=0;j<this.state.entityList[i].contactPersons.length;j++)
                        {

                            if(this.state.entityList[i].contactPersons[j].userID == userId )
                            {
                                vendorID = this.state.entityList[i]._id
                                break;
                            }
                        }
                    }
                    console.log("vendorID",vendorID);
                    this.setState({
                        vendorID :vendorID
                    },()=>{
                      console.log("vendorID",this.state.vendorID);

                    })

                })

            })
            .catch((error) => {
            })

        this.getContract();
        this.setState({
            contractID: this.props.match.params.contractID
        })

      
        window.scrollTo(0, 0);
    }
    componentWillUnmount() {
        $("script[src='/js/adminLte.js']").remove();
        $("link[href='/css/dashboard.css']").remove();
    }
    componentWillReceiveProps(nextProps) {

    }
    getContract() {

        var contractID ="";

        
        axios.get("/api/contract/get/list")
            .then((response) => {
               
                this.setState({
                    contractDetails: response.data
                },()=>{
                    var vendorID =localStorage.getItem("company_Id")
                    console.log("contractDetails",this.state.contractDetails,"vendorID",vendorID);
                    for(var k=0; k<this.state.contractDetails.length; k++)
                    {
                        if(this.state.contractDetails[k].entityId === vendorID )
                        {
                            contractID = this.state.contractDetails[k]._id
                            this.setState({
                                contractID :contractID
                            },()=>{
                                console.log("contractID",this.state.contractID);
                               axios.get("/api/contract/get/joincontract/" + this.state.contractID)
                                .then((response) => {
                                    console.log("response",response.data);
                                    var contractDetails = response.data[0];
                                    var entityLocation = response.data[0].entity.locations.filter((a, i) => response.data[0].entityLocationId.includes(a._id));
                                    contractDetails.entity.location = entityLocation;

                                    var companyLocation = response.data[0].company.companyLocationsInfo.filter((a, i) => a._id == contractDetails.companyLocationId);
                                    contractDetails.company.location = companyLocation[0];

                                    this.image(contractDetails.entity.companyLogo[0]);

                                    this.setState({
                                        contractDetails: contractDetails
                                    },()=>{
                                        console.log("contractDetails",this.state.contractDetails);
                                    })
                                })
                                .catch((error) => {

                                })

                            })
                        }
                            break;
                        
                    }
                })
            })
            .catch((error) => {

            })
    }
    download(event) {
        event.preventDefault();
        $('#headerid').hide();


        $('#sidebar').toggleClass('active');
        $('#headerid').toggleClass('headereffect');
        $('#dashbordid').toggleClass('dashboardeffect')
        var sideBar = $("#sidebar").hasClass("active")
        localStorage.setItem('sideBar', sideBar);
        $('#sidebar').hide();
        $('#widgets').hide();
        $('#printButton').hide();
        $('.button2').hide();
        $('.main-footer').hide();
        $(".box-header").hide();
        // document.getElementById("viewcontract").scale(2, 2);

        window.print();

        $('#headerid').show();
        $('#sidebar').toggleClass('active')
        $('#headerid').toggleClass('headereffect');
        $('#dashbordid').toggleClass('dashboardeffect')
        var sideBar = $("#sidebar").hasClass("active")
        localStorage.setItem('sideBar', sideBar);
        $('#sidebar').show();
        $('#widgets').show();
        $('#printButton').show();
        $('.button2').show();
        $('.main-footer').show();
        $(".box-header").show();
    }
    openNav() {
        document.getElementById("mySidenav").style.width = "250px";
    }

    closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }
   
    image(url) {
           }
    changeStatus(event){
        event.preventDefault();
        var contractID = this.state.contractDetails._id;
        console.log("contractID",contractID)
        var formValues={
            contractID : contractID,
            status   : "Approved by Vendor"
        }
        console.log("formValues",formValues);
        axios.patch("/api/contract/patch/corporateapprovalstatus",formValues)
            .then((response)=>{
            
              this.setState({
                  entityInfo : response.data,
              },()=>{
                if(this.state.entityInfo.updated == true)
                {
                    swal("Contract Approved");
                    window.location.reload();
                }
                else{
                    swal("Something went wrong");
                }
                
              });
        })
        .catch((error)=>{
            console.log("error",error);
        })

    }

    render() {
        console.log('this.state.contractDetails',this.state.contractDetails);
        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="row">
                    <div className="">
                        <section className="content">
                            <div className="pageContent col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="box-header with-border col-lg-12 col-md-12 col-xs-10 col-sm-10 NOpadding-right">
                                    
                                    <i id="printButton" onClick={this.download.bind(this)} className="fa fa-download pull-right downloadicon"></i>
                                </div>
                                
                                <div className="box-header col-lg-12 col-md-12 col-xs-10 col-sm-10 NOpadding-right"></div>
                                <section className="Content">
                                    <div className="row">
                                        <div id="viewcontract" className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                    <img id="logoSrc" src="/images/logo.png" className="headerlogo col-lg-6 col-md-6 col-sm-6 col-xs-6" />
                                                    <h5 className="col-lg-6 col-md-6 col-sm-6 col-xs-6 headersubtitle pull-right">Vendor Car Rental Service</h5>
                                                </div>
                                                <div className="headerupperborder col-lg-12 col-md-12 col-sm-12 col-xs-12"></div>
                                                <div className="greyheaderdiv col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                    Vendor Car Rental Service Contract
                                                </div>
                                                <div className="headerbottomborder col-lg-12 col-md-12 col-sm-12 col-xs-12"></div>
                                                {this.state.contractDetails.company && this.state.contractDetails.entity ?
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 contracttext">
                                                        {console.log("this.state.contractDetails.entity.companyName",this.state.contractDetails.entity.companyName)}
                                                        <p>
                                                            This Vendor Car Rental Service Contract is entered into {moment(this.state.contractDetails.createdAt).format("DD MMM YYYY")},
                                                            by and between <b>{this.state.contractDetails.company.companyName}</b>, with an address of&nbsp;
                                                            {this.state.contractDetails.company.location.locationType}, {this.state.contractDetails.company.location.addressLine1} {this.state.contractDetails.company.location.addressLine2} {this.state.contractDetails.company.location.area} {this.state.contractDetails.company.location.city} {this.state.contractDetails.company.location.district} {this.state.contractDetails.company.location.state} {this.state.selectedCorporateLocation.country} and&nbsp;
                                                            <b>{this.state.contractDetails.entity.companyName}</b>, {this.state.contractDetails.entity.location && this.state.contractDetails.entity.location.length > 1 ? "with multiple address as listed below." : "with an adress of " + this.state.contractDetails.entity.location[0].locationType + ", " + this.state.contractDetails.entity.location[0].addressLine1 + " " + this.state.contractDetails.entity.location[0].addressLine2 + " " + this.state.contractDetails.entity.location[0].area + " " + this.state.contractDetails.entity.location[0].city + " " + this.state.contractDetails.entity.location[0].district + " " + this.state.contractDetails.entity.location[0].state + " " + this.state.contractDetails.entity.location[0].country + "."}
                                                        </p>
                                                        <p>
                                                            Contact duration would be {this.state.contractDetails.contractDuration} months. This contract will be effective from {moment(this.state.contractDetails.contractDate).format("DD MMM YYYY")} to {moment(this.state.contractDetails.effectiveUpto).format("DD MMM YYYY")}.
                                                        </p>
                                                    </div>
                                                    :
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 contracttext">
                                                        <p>
                                                            This Vendor Car Rental Service Contract is entered into {moment(this.state.contractDetails.createdAt).format("DD MMM YYYY")},
                                                            by and between <b>*Admin Company Name*</b>, with an address of&nbsp;
                                                            *Address Details* and&nbsp;
                                                            <b>*Contract Company Name*</b>, with an adress of  *Contract Address Details*.
                                                        </p>
                                                        <p>
                                                            Contact duration would be *Contract Duration* months. This contract will be effective from *Contract Date* to *Effective Upto*.
                                                        </p>
                                                    </div>
                                                }
                                                {
                                                    this.state.contractDetails.company ?
                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                            <div className="companyinfo col-lg-12 col-md-12 col-sm-12 col-xs-12">COMPANY INFORMATION</div>
                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-margin">
                                                                <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12">
                                                                    <h5 className="detailtitle">{this.state.contractDetails.company.companyName}</h5>
                                                                    <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                        <li><i className="fa fa-globe"></i> {this.state.contractDetails.company.companywebsite}</li>
                                                                        <li><i className="fa fa-envelope "></i> {this.state.contractDetails.company.companyEmail}</li>
                                                                        <li>GST: {this.state.contractDetails.company.location.GST}</li>
                                                                        <li>PAN: {this.state.contractDetails.company.location.PAN}</li>
                                                                    </ul>
                                                                </div>
                                                                <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 viewBoxImg" style={{ "backgroundImage": `url(` + (this.state.contractDetails.company.companyLogo ? this.state.contractDetails.company.companyLogo : "/images/logonotfound.jpg") + `)` }}></div>
                                                            </div>
                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 marbtm30">
                                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                    <h5 className="detailtitle">Location Detail</h5>
                                                                    <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                        <li> {this.state.contractDetails.company.location.locationType}</li>
                                                                        <li> {this.state.contractDetails.company.location.addressLine1}</li>
                                                                        <li> {this.state.contractDetails.company.location.addressLine2}</li>
                                                                        <li> {this.state.contractDetails.company.location.area} {this.state.contractDetails.company.location.city}</li>
                                                                        <li> {this.state.contractDetails.company.location.district} {this.state.contractDetails.company.location.state} {this.state.contractDetails.company.location.country} - {this.state.contractDetails.company.location.pincode}</li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        :
                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                            <div className="companyinfo col-lg-12 col-md-12 col-sm-12 col-xs-12">COMPANY INFORMATION</div>
                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-margin">
                                                                <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12">
                                                                    <h5 className="detailtitle">Admin Company Name</h5>
                                                                    <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                        <li><i className="fa fa-globe"></i> www.abc.com</li>
                                                                        <li><i className="fa fa-envelope "></i> abc@gmail.com</li>
                                                                        <li>GST: 29ABCDE1234F1Z5</li>
                                                                        <li>PAN: ABCDE1234E</li>
                                                                    </ul>
                                                                </div>
                                                                <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 viewBoxImg" style={{ "backgroundImage": `url(/images/logo.png)` }}></div>
                                                            </div>
                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 marbtm30">
                                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                    <h5 className="detailtitle">Location Detail</h5>
                                                                    <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                        <li> Location Type</li>
                                                                        <li> Address Line1</li>
                                                                        <li> Address Line2</li>
                                                                        <li> Area City</li>
                                                                        <li> District State Country - Pincode</li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                }

                                                {
                                                    this.state.contractDetails.entity ?
                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                            <div className="entityinfo col-lg-12 col-md-12 col-sm-12 col-xs-12">{this.state.contractDetails.entityType} INFORMATION</div>
                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-margin">
                                                                <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12">
                                                                    <h5 className="detailtitle">{this.state.contractDetails.entity.companyName}</h5>
                                                                    <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                        <li><i className="fa fa-user-o "></i> {this.state.contractDetails.entity.groupName}</li>
                                                                        <li><i className="fa fa-globe"></i> {this.state.contractDetails.entity.website}</li>
                                                                        <li><i className="fa fa-envelope "></i> {this.state.contractDetails.entity.companyEmail}</li>
                                                                        <li>CIN: {this.state.contractDetails.entity.CIN}</li>
                                                                        <li>TAN: {this.state.contractDetails.entity.TAN}</li>
                                                                    </ul>
                                                                </div>
                                                                <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 detailBoxImg" style={{ "backgroundImage": `url(` + (this.state.contractDetails.entity.companyLogo ? this.state.contractDetails.entity.companyLogo : "/images/logonotfound.jpg") + `)` }}></div>
                                                            </div>
                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 marbtm30">
                                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                    <h5 className="detailtitle">Location Detail</h5>
                                                                    {
                                                                        this.state.contractDetails.entity && this.state.contractDetails.entity.location ?
                                                                            this.state.contractDetails.entity.location.map((data, i) => {
                                                                                return (
                                                                                    <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                                        <li>{this.state.contractDetails.entity.location.length > 1 ? (i + 1)+")" : ""} {data.locationType}</li>
                                                                                        <li> {data.addressLine1}</li>
                                                                                        <li> {data.addressLine2}</li>
                                                                                        <li> {data.area} {data.city}</li>
                                                                                        <li> {data.district} {data.state} {data.country} - {data.pincode}</li>
                                                                                    </ul>
                                                                                );
                                                                            })
                                                                            :
                                                                            null
                                                                    }

                                                                </div>
                                                            </div>
                                                        </div>
                                                        :
                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                            <div className="entityinfo col-lg-12 col-md-12 col-sm-12 col-xs-12">CONTRACT COMPANY INFORMATION</div>
                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-margin">
                                                                <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12">
                                                                <h5 className="detailtitle">Contract Company Name</h5>
                                                                    <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                    <li><i className="fa fa-user-o "></i> Group Name</li>
                                                                        <li><i className="fa fa-globe"></i> www.abc.com</li>
                                                                        <li><i className="fa fa-envelope "></i> abc@gmail.com</li>
                                                                        <li>CIN: L12345MH2019PTC123456</li>
                                                                        <li>TAN: NGPO02911G</li>
                                                                    </ul>
                                                                </div>
                                                                <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 detailBoxImg" style={{ "backgroundImage": `url("/images/logonotfound.jpg")` }}></div>
                                                            </div>
                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 marbtm30">
                                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                    <h5 className="detailtitle">Location Detail</h5>
                                                                    <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                        <li> Location Type</li>
                                                                        <li> Address Line1</li>
                                                                        <li> Address Line2</li>
                                                                        <li> Area City</li>
                                                                        <li> District State Country - Pincode</li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                }
                                                {
                                                    this.state.contractDetails.packages && this.state.contractDetails.packages.length > 0 ?
                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                            <div className="packageinfo col-lg-12 col-md-12 col-sm-12 col-xs-12">PACKAGE DETAILS</div>

                                                            {this.state.contractDetails.packages.map((data, index) => {
                                                                return (
                                                                    <div key={index} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 detailBox marbtm30" key={index}>
                                                                        <div className=" col-lg-1 col-md-1 col-sm-1 col-xs-1">
                                                                            <i className="fa fa-database " aria-hidden="true"></i>
                                                                        </div>
                                                                        <ul className="col-lg-5 col-md-5 col-sm-5 col-xs-5 palfclr">
                                                                            <li><b>Package :</b> {data.packageName}</li>
                                                                            <li>Max Hours : {data.MaxHrs}</li>
                                                                            <li>Max KM : {data.MaxKm}</li>
                                                                            <li>Fix Charges : {data.fixCharges}</li>
                                                                        </ul>
                                                                        <ul className="col-lg-5 col-md-5 col-sm-10 col-xs-10 palfclr">
                                                                            <li>Night Charges (From Time) : {data.nightChargesFromTime}</li>
                                                                            <li>Night Charges (To Time) : {data.nightChargesToTime}</li>
                                                                            <li>Early Morning Charges (From Time) : {data.earlyMorningChargesFromTime}</li>
                                                                            <li>Early Morning Charges (To Time) : {data.earlyMorningChargesToTime}</li>
                                                                        </ul>
                                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-sm-12">
                                                                            <table className="table ">
                                                                                <thead className="">
                                                                                    <tr>
                                                                                        <th></th>
                                                                                        {
                                                                                            data.extras && data.extras.length > 0 ?
                                                                                                data.extras.map((a, i) => {
                                                                                                    return (
                                                                                                        <th key={i} className="textAlignRight">{a.category}</th>
                                                                                                    );
                                                                                                })
                                                                                                :
                                                                                                null
                                                                                        }
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody className="packageList">
                                                                                    {this.state.attributeArray && this.state.attributeArray.length > 0 ?
                                                                                        this.state.attributeArray.map((updata, index) => {
                                                                                            return (
                                                                                                <tr key={index}>
                                                                                                    <td>{updata.name}</td>
                                                                                                    {
                                                                                                        data.extras && data.extras.length > 0 ?
                                                                                                            data.extras.map((datas, i) => {
                                                                                                                return (
                                                                                                                    Object.entries(datas).map(([key, value], j) => {
                                                                                                                        if (updata.field === key) {
                                                                                                                            return (
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
                                                            })}

                                                        </div>
                                                        :
                                                        <div className="textAlign">Packages will be shown here.</div>
                                                }
                                                {
                                                    this.state.contractDetails.conditions ?
                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                            <div className="terminfo col-lg-12 col-md-12 col-sm-12 col-xs-12">TERMS AND CONDITIONS</div>
                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 marbtm30 termDiv">
                                                                <div dangerouslySetInnerHTML={{ '__html': this.state.contractDetails.conditions }}></div>
                                                            </div>
                                                        </div>
                                                        :
                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                            <div className="terminfo col-lg-12 col-md-12 col-sm-12 col-xs-12">TERMS AND CONDITIONS</div>
                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 marbtm30 termDiv">
                                                                <div>Terms of service are the legal agreements between a service provider and a person who wants to use that service. The person must agree to abide by the terms of service in order to use the offered service. Terms of service can also be merely a disclaimer, especially regarding the use of websites.</div>
                                                            </div>
                                                        </div>
                                                }
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 ">
                                                        <h5 className="signtitle">Company Signature</h5>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 ">
                                                        <h5 className="signtitle pull-right">{this.state.contractDetails.entityType} Signature</h5>
                                                    </div>
                                                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 signborder"></div>
                                                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 signborder pull-right"></div>
                                                </div>
                                                <div className="footerbottomborder col-lg-12 col-md-12 col-sm-12 col-xs-12"></div>
                                            </div>
                                        </div>
                                       
                                         {
                                            this.state.contractDetails.status == "New" ?
                                            <div className="marginTop15 col-lg-11 col-md-12 col-sm-12 col-xs-12">
                                                <button  className=" col-lg-2 pull-right btn btn-success"onClick={this.changeStatus.bind(this)}>    
                                                    <span className="">Approve Contract</span>
                                                </button>
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
export default Viewcontract;