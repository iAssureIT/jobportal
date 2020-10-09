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
            "pathname": this.props.match.params.entity,
            "selectedCorporate": {},
            "selectedCorporateLocation": {},
            "contractID": "",
            "company_Id": "",
            "selectedVendor": {},
            "selectedVendorLocation": {},
            "contractDetails": "",
       };
    }
    componentDidMount() {
        var company_Id ="";
        var userId =  localStorage.getItem("user_ID");
        var company_Id = localStorage.getItem("company_Id");
         this.setState({
            company_Id :company_Id
        })

        this.getPersonDetails(userId);
        this.getContract(company_Id);
        window.scrollTo(0, 0);
    }
    componentWillUnmount() {
        $("script[src='/js/adminLte.js']").remove();
        $("link[href='/css/dashboard.css']").remove();
    }
    componentWillReceiveProps(nextProps) {

    }
     getContract(company_Id) {
       axios.get("/api/contract/get/one/entity/" + company_Id)
            .then((response) => {
                console.log("response",response);
                var contractDetails = response.data[0];
                var entityLocation = response.data[0].entity.locations.filter((a, i) => response.data[0].entityLocationId.includes(a._id));
                contractDetails.entity.location = entityLocation[0];

                var companyLocation = response.data[0].company.locations.filter((a, i) => a._id === contractDetails.companyLocationId);
                contractDetails.company.location = companyLocation[0];
                this.image(contractDetails.entity.companyLogo[0]); 

                this.setState({
                    contractDetails: contractDetails
                }, ()=>{                   
                    //code is refered from  
                    //https://stackoverflow.com/questions/14696326/break-array-of-objects-into-separate-arrays-based-on-a-property                    

                    const listOfCityClasses = [...new Set(this.state.contractDetails.packages.map(it => it.cityClass))].sort(); 
                    const listOfpackageTypes = [...new Set(this.state.contractDetails.packages.map(it => it.packageType))].sort(); 
                    var packagesByCity = this.groupArrayOfObjects(this.state.contractDetails.packages,"cityClass");

                    this.setState({
                        listOfCityClasses   : listOfCityClasses,
                        listOfpackageTypes  : listOfpackageTypes,
                        packagesByCity      : packagesByCity
                    },()=>{
                        // console.log("listOfCityClasses == > ", this.state.listOfCityClasses);
                        // console.log("listOfpackageTypes == > ", this.state.listOfpackageTypes);
                        // console.log("packagesByCity == > ", this.state.packagesByCity);
                    })                    
                })
                
            })
            .catch((error) => {
                console.log("Error getContract() = ",error);
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
    getPersonDetails(userId) {
       axios.get('/api/personmaster/get/details/' + userId)
        .then((response) => {
         this.setState({
            userDetails : response.data[0],
            Department  : response.data[0].department?response.data[0].department[0]:"",
            Designation  : response.data[0].designation?response.data[0].designation[0]:"",
         })
        })
        .catch((error) => {
        })


    }

    groupArrayOfObjects(list, key) {
      return list.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    };
    image(url) {
    }
    changeStatus(event){
        event.preventDefault();
        var contractID = this.state.contractDetails._id;
        var companyName = localStorage.getItem("companyName");

        var formValues={
            contractID : contractID,
            status   : "Approved"
        }
        axios.patch("/api/contract/patch/corporateapprovalstatus",formValues)
            .then((response)=>{
            
              this.setState({
                  entityInfo : response.data,
              },()=>{
                if(this.state.entityInfo.updated == true)
                {
                    swal({
                    text: "Vendor Admin Name :"+this.state.userDetails.firstName +" " +this.state.userDetails.lastName+
                            "\nDesignation, Department :"+this.state.Designation.designation+" , "+this.state.Department.department+
                           " \nCompany Name :"+ this.state.userDetails.companyName+
                            "\nDate:"+moment(new Date()).format('DD MMM YYYY hh:mm') +                                 
                            "\nPlace"+ this.state.userDetails.workLocation ,                                       
                    buttons: {
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
                            var sendData = {
                            "event": "Event4", //Event Name
                            "toUser_id": this.state.userDetails.userId, //To user_id(ref:users)
                            "toUserRole":"vendoradmin",
                            "company_id": this.state.company_id, //company_id(ref:entitymaster)
                            // "otherAdminRole":'admin',
                            "variables": {
                            'EmployeeName': this.state.userDetails.firstName + ' ' + this.state.userDetails.lastName,
                            'CompanyName': companyName,
                            'email': this.state.email
                              }
                            }
                            console.log("sendData",sendData);
                            axios.post('/api/masternotifications/post/sendNotification', sendData)
                              .then((res) => {
                                console.log("res",res);
                              })
                              .catch((error) => { console.log('notification error: ', error) })

                        this.props.history.push("/dashboard");
                         window.location.reload()

                    })
                       
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
        console.log("this.state.contractDetails",this.state.contractDetails);
        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <section className="content">
                            <div className="pageContent col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="box-header with-border col-lg-12 col-md-12 col-xs-10 col-sm-10 NOpadding-right">
                                    
                                    <i id="printButton" onClick={this.download.bind(this)} className="fa fa-download pull-right downloadicon"></i>
                                </div>
                                
                                <div className="box-header col-lg-12 col-md-12 col-xs-10 col-sm-10 NOpadding-right"></div>

                                <section className="Content">
                                    <div className="row">
                                       <div id="statusDiv" className="col-lg-1 col-md-4 col-sm-4 col-xs-4 noPadding pull-right marginTop12 textAlignCenter">{this.state.contractDetails.status == "Approved"?<span className="approvedProfile" title="Contract Approved">Approved </span>:""}</div>

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
                                                        <p>
                                                            This Vendor Car Rental Service Contract is entered into &nbsp; <b>
                                                            {moment(this.state.contractDetails.createdAt).format("Do MMMM YYYY")}</b>,
                                                            by and between <b>{this.state.contractDetails.company.companyName}</b>, 
                                                            with an address if &nbsp;
                                                            {this.state.contractDetails.company.location.locationType + ", "} 
                                                            {this.state.contractDetails.company.location.addressLine2 + ", "}
                                                            {this.state.contractDetails.company.location.addressLine1 + ", "} 
                                                            {this.state.contractDetails.country} and &nbsp;
                                                            <b>{this.state.contractDetails.entity.companyName + ", "}</b> 
                                                            {this.state.contractDetails.entity.location && this.state.contractDetails.entity.location.length > 1 
                                                                ? "with multiple address as listed below." 
                                                                : "with an address of " 
                                                                    + this.state.contractDetails.entity.location.locationType + " - " 
                                                                    + this.state.contractDetails.entity.location.addressLine1 + ", " 
                                                                    + this.state.contractDetails.entity.location.addressLine2 + ", " 
                                                                    + this.state.contractDetails.entity.location.country + "."
                                                            }
                                                        </p>
                                                        <p>
                                                            Contract duration would be {this.state.contractDetails.contractDuration} months. This contract will be effective from {moment(this.state.contractDetails.contractDate).format("Do MMMM YYYY")} to {moment(this.state.contractDetails.effectiveUpto).format("Do MMMM YYYY")}.
                                                        </p>
                                                    </div>
                                                    :
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 contracttext">
                                                        <p>
                                                            This Vendor Car Rental Service Contract is entered into 
                                                            {moment(this.state.contractDetails.createdAt).format("DD MMM YYYY")},
                                                            by and between <b>*Admin Company Name*</b>, with an address of &nbsp;
                                                            *Address Details* and &nbsp;
                                                            <b>*Contract Company Name*</b>, with an adress of  *Contract Address Details*.
                                                        </p>
                                                        <p>
                                                            Contract duration would be *Contract Duration* months. This contract will be effective from *Contract Date* to *Effective Upto*.
                                                        </p>
                                                    </div>
                                                }
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 informationtext">
                                                {
                                                    this.state.contractDetails.company ?
                                                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                            <div className="companyinfo col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{"text-align": "center"}}>COMPANY INFORMATION</div>
                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-margin">
                                                                <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 detailBoxImg">
                                                                    <img src={this.state.contractDetails.company.companyLogo && this.state.contractDetails.company.companyLogo > 0? this.state.contractDetails.company.companyLogo : "/images/noImagePreview.png"} className=""></img>
                                                                </div>
                                                                {/*<div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 viewBoxImg" style={{ "backgroundImage": `url(` + (this.state.contractDetails.company.companyLogo ? this.state.contractDetails.company.companyLogo : "/images/logonotfound.jpg") + `)` }}></div>*/}
                                                                <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12">
                                                                    <h5 className="detailtitle">{this.state.contractDetails.company.companyName}</h5>
                                                                    <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">                                                                       
                                                                        <li><i className="fa fa-user-o "></i> &nbsp; {this.state.contractDetails.company.groupName ? this.state.contractDetails.company.groupName : "Not Available"}</li>
                                                                        <li><i className="fa fa-globe"></i> &nbsp; {this.state.contractDetails.company.website ? this.state.contractDetails.company.website : "Not Available"}</li>
                                                                        <li><i className="fa fa-envelope "></i> &nbsp;{this.state.contractDetails.company.companyEmail ? this.state.contractDetails.company.companyEmail : "Not Available"}</li>
                                                                        <li>GST : {this.state.contractDetails.company.location.GST ? this.state.contractDetails.company.location.GST : "Not Available"}</li>
                                                                        <li>PAN : {this.state.contractDetails.company.location.PAN ? this.state.contractDetails.company.location.PAN : "Not Available"}</li>
                                                                        <li><i className="fa fa-map-marker address-ico"></i> &nbsp;
                                                                            {this.state.contractDetails.company.location.locationType + " - "}
                                                                            {this.state.contractDetails.company.location.addressLine2 ? this.state.contractDetails.company.location.addressLine2 + ", " : ""} 
                                                                            {this.state.contractDetails.company.location.addressLine1 ? this.state.contractDetails.company.location.addressLine1 + ", " : ""}
                                                                            {this.state.contractDetails.company.location.area ? this.state.contractDetails.company.location.area + ", " : ""} 
                                                                            {this.state.contractDetails.company.location.city ? this.state.contractDetails.company.location.city + ", " : ""}
                                                                            {this.state.contractDetails.company.location.district ? this.state.contractDetails.company.location.district + ", " : ""} 
                                                                            {this.state.contractDetails.company.location.state ? this.state.contractDetails.company.location.state + ", " : ""} 
                                                                            {this.state.contractDetails.company.location.country} - 
                                                                            {this.state.contractDetails.company.location.pincode}
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        :
                                                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                            <div className="companyinfo col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{"text-align": "center"}}>COMPANY INFORMATION</div>
                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-margin">
                                                                <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 viewBoxImg" style={{ "backgroundImage": `url(/images/logonotfound.jpg)` }}></div>
                                                                <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12">
                                                                    <h5 className="detailtitle">Admin Company Name</h5>
                                                                    <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">                                                                        
                                                                        <li><i className="fa fa-user-o "></i> &nbsp; Group Name</li>
                                                                        <li><i className="fa fa-globe"></i> &nbsp; www.abc.com</li>
                                                                        <li><i className="fa fa-envelope"></i> &nbsp; abc@gmail.com</li> 
                                                                        <li><i className="fa fa-map-marker address-ico"></i> &nbsp; Not Available</li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                }

                                                {
                                                    this.state.contractDetails.entity ?
                                                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                            <div className="entityinfo col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{"text-align": "center"}}>{this.state.contractDetails.entityType} INFORMATION</div>
                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-margin">
                                                                <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 detailBoxImg">
                                                                    <img src={this.state.contractDetails.entity.companyLogo && this.state.contractDetails.entity.companyLogo > 0? this.state.contractDetails.entity.companyLogo : "/images/noImagePreview.png"} className=""></img>
                                                                </div>
                                                                {/*<div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 detailBoxImg" style={{ "backgroundImage": `url(` + (this.state.contractDetails.entity.companyLogo ? this.state.contractDetails.entity.companyLogo : "/images/logonotfound.jpg") + `)` }}></div>*/}
                                                                <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12">
                                                                    <h5 className="detailtitle">{this.state.contractDetails.entity.companyName}</h5>
                                                                    <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                        <li><i className="fa fa-user-o "></i> {this.state.contractDetails.entity.groupName}</li>
                                                                        <li><i className="fa fa-globe"></i> {this.state.contractDetails.entity.website}</li>
                                                                        <li><i className="fa fa-envelope "></i> {this.state.contractDetails.entity.companyEmail}</li>
                                                                        <li>CIN : {this.state.contractDetails.entity.CIN ? this.state.contractDetails.entity.CIN : "Not Available"}</li>
                                                                        <li>TAN : {this.state.contractDetails.entity.TAN ? this.state.contractDetails.entity.TAN : "Not Available"}</li>
                                                                        {
                                                                        this.state.contractDetails.entity && this.state.contractDetails.entity.location 
                                                                        ?
                                                                            <li><i className="fa fa-map-marker address-ico"></i> &nbsp;
                                                                                {this.state.contractDetails.entity.location.locationType +" - "}
                                                                                {this.state.contractDetails.entity.location.addressLine2 ? this.state.contractDetails.entity.location.addressLine2 + ", " : ""}
                                                                                {this.state.contractDetails.entity.location.addressLine1 ? this.state.contractDetails.entity.location.addressLine1 + ", " : ""}
                                                                                {this.state.contractDetails.entity.location.area ? this.state.contractDetails.entity.location.area + ", " : ""} 
                                                                                {this.state.contractDetails.entity.location.city ? this.state.contractDetails.entity.location.city + ", " : ""}
                                                                                {this.state.contractDetails.entity.location.district ? this.state.contractDetails.entity.location.district + ", " : ""} 
                                                                                {this.state.contractDetails.entity.location.state ? this.state.contractDetails.entity.location.state + ", " : ""} 
                                                                                {this.state.contractDetails.entity.location.country ? this.state.contractDetails.entity.location.country : ""}.
                                                                            </li>
                                                                    
                                                                            
                                                                        :
                                                                            null
                                                                        }
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        :
                                                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                            <div className="entityinfo col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{"text-align": "center"}}>CONTRACT COMPANY INFORMATION</div>
                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-margin">
                                                                <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 detailBoxImg" style={{ "backgroundImage": `url("/images/logonotfound.jpg")` }}></div>
                                                                <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12">
                                                                <h5 className="detailtitle">Contract Company Name</h5>
                                                                    <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                        <li><i className="fa fa-user-o "></i> &nbsp; Group Name</li>
                                                                        <li><i className="fa fa-globe"></i> &nbsp; www.abc.com</li>
                                                                        <li><i className="fa fa-envelope "></i> &nbsp; abc@gmail.com</li>
                                                                        {/*<li>CIN: L12345MH2019PTC123456</li>
                                                                                                                                                <li>TAN: NGPO02911G</li>*/}
                                                                        <li><i className="fa fa-map-marker address-ico"></i> &nbsp; Not Available</li>
                                                                    </ul>
                                                                </div>
                                                            </div>                                                            
                                                        </div>
                                                }
                                                </div>
                                                {
                                                    this.state.contractDetails.packages && this.state.contractDetails.packages.length > 0 ?
                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                            <div className="packageinfo col-lg-12 col-md-12 col-sm-12 col-xs-12">PACKAGE DETAILS</div>
                                                            
                                                            {this.state.listOfCityClasses && this.state.listOfCityClasses.length > 0
                                                                ?
                                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                    
                                                                    {this.state.listOfCityClasses.map((d, i, array) => {
                                                                        return (
                                                                            <div key={i} className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{"border" : "1px solid #ccc", "margin-bottom" : "15px"}}> 
                                                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 package-title-div NOpadding">
                                                                                    <h6 className="cityClass-title"> {d + " City Packages"} </h6>
                                                                                </div>
                                                                                {this.state.contractDetails.packages.map((data, index, array) => {
                                                                                    if(d === data.cityClass){
                                                                                            
                                                                                    return (
                                                                                        <div key={index} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 detailBox marbtm30">
                                                                                            <div className=" col-lg-1 col-md-1 col-sm-1 col-xs-1">
                                                                                                <i className="fa fa-database " aria-hidden="true"></i>
                                                                                            </div>
                                                                                            <ul className="col-lg-3 col-md-3 col-sm-3 col-xs-3 palfclr">
                                                                                                <li><b>Package :</b> {data.packageName}</li>
                                                                                            </ul>
                                                                                            <ul className="col-lg-3 col-md-3 col-sm-3 col-xs-3 palfclr">
                                                                                                <li><b>Max Hours  :</b> {data.maxHours}</li>
                                                                                            </ul>
                                                                                            <ul className="col-lg-2 col-md-2 col-sm-2 col-xs-2 palfclr">
                                                                                                <li><b>Max KM     :</b> {data.maxKm}</li>
                                                                                            </ul>
                                                                                            <ul className="col-lg-3 col-md-3 col-sm-3 col-xs-3 palfclr">
                                                                                                <li><b>Fix Charges   :</b> {data.fixCharges}</li>
                                                                                            </ul>
                                                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-sm-12">
                                                                                                <table className="table ">
                                                                                                    <thead className="">
                                                                                                        <tr>
                                                                                                            <th>City Class</th>                                                                                        
                                                                                                            <th>Car Category</th>                                                                                        
                                                                                                            <th>Package Type</th>                                                                                        
                                                                                                            <th>Extra Kms</th>                                                                                        
                                                                                                            <th>Extra Hrs</th>                                                                                        
                                                                                                            <th>Driver Allowance</th>                                                                                        
                                                                                                            <th>Night Halt</th>                                                                                        
                                                                                                            <th>Night Charges</th>                                                                                        
                                                                                                            <th>Early Morning Charges</th>                                                                                        
                                                                                                        </tr>
                                                                                                    </thead>
                                                                                                    <tbody className="packageList">
                                                                                                        <tr key={index}>
                                                                                                            <td>{data.cityClass}</td>
                                                                                                            <td>{data.carCategory}</td>
                                                                                                            <td>{data.packageType}</td>
                                                                                                            <td>{data.extraKms}</td>
                                                                                                            <td>{data.extraHr}</td>
                                                                                                            <td>{data.driverAllowance}</td>
                                                                                                            <td>{data.nightHalt}</td>
                                                                                                            <td>{data.nightCharges}</td>
                                                                                                            <td>{data.morningCharges}</td>
                                                                                                        </tr>                                                                                    
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </div>
                                                                                        </div>
                                                                                    );
                                                                                }
                                                                            })}
                                                                            </div>
                                                                        )
                                                                        })
                                                                    }                                                          
                                                                </div>
                                                                :
                                                                    null
                                                            }                                                          
                                                            
                                                        </div>
                                                        :
                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 textAlign packageDetails">Packages will be shown here.</div>
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
                                                        {this.state.contractDetails.company 
                                                            ?
                                                                <div className="signdetails">                                                                
                                                                    <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">                                                                       
                                                                        <li className="authority-name">{this.state.contractDetails.company.contactPersons[0].firstName ? this.state.contractDetails.company.contactPersons[0].firstName : "" + " " + this.state.contractDetails.company.contactPersons[0].lastName ? this.state.contractDetails.company.contactPersons[0].lastName : ""}</li>
                                                                        <li className="designation">{this.state.contractDetails.company.contactPersons[0].designationName ? this.state.contractDetails.company.contactPersons[0].designationName : ""}</li>
                                                                        <li className="empid">Employee ID : {this.state.contractDetails.company.contactPersons[0].employeeID ? this.state.contractDetails.company.contactPersons[0].employeeID : ""}</li>
                                                                        <li className="comapnyName">{this.state.contractDetails.company.companyName}</li>
                                                                        <li><span className="signDate">Sign Date</span><span className="signdate">{" : " + moment(this.state.contractDetails.contractDate).format("DD MMM YYYY")}</span></li>
                                                                        <li><span className="location">Location</span><span className="loc">{" : " + this.state.contractDetails.company.location.city + ", " + this.state.contractDetails.company.location.country + "."}</span></li>
                                                                    </ul>
                                                                </div>
                                                            :
                                                                null
                                                        }
                                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 signborder"></div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 ">
                                                        <h5 className="col-lg-12 col-md-12 col-sm-12 col-xs-12 signtitle pull-right right-text">{this.state.contractDetails.entityType} Signature</h5> 
                                                        {this.state.contractDetails.entity 
                                                            ?
                                                                <div className="signdetails col-lg-12 col-md-12 col-sm-12 col-xs-12">                                                                
                                                                    <ul className="col-lg-6 col-md-6 col-sm-6 col-xs-12 NOpadding pull-right">                                                                       
                                                                        <li className="authority-name">
                                                                            <div className="signDiv col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                                {this.state.contractDetails.entity.contactPersons[0].firstName ? this.state.contractDetails.entity.contactPersons[0].firstName : "" + " " 
                                                                                + this.state.contractDetails.entity.contactPersons[0].lastName ? this.state.contractDetails.entity.contactPersons[0].lastName : ""}
                                                                            </div>
                                                                        </li>
                                                                        <li className="designation">{this.state.contractDetails.entity.contactPersons[0].designationName ? this.state.contractDetails.entity.contactPersons[0].designationName : ""}</li>
                                                                        <li className="empid">Employee ID : {this.state.contractDetails.entity.contactPersons[0].employeeID ? this.state.contractDetails.entity.contactPersons[0].employeeID : ""}</li>
                                                                        <li className="comapnyName">{this.state.contractDetails.entity.companyName}</li>
                                                                        <li><span className="signDate">Sign Date</span><span className="signdate">{" : " + moment(this.state.contractDetails.contractDate).format("DD MMM YYYY")}</span></li>
                                                                        <li><span className="location">Location</span><span className="loc">{" : " + this.state.contractDetails.entity.location.city + ", " + this.state.contractDetails.entity.location.country + "."}</span></li>
                                                                    </ul>
                                                                </div>
                                                            :
                                                                null
                                                        }                                                   
                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 signborder pull-right"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="footerbottomborder col-lg-12 col-md-12 col-sm-12 col-xs-12"></div>
                                            </div>
                                        </div>
                                       
                                         {
                                            this.state.contractDetails&&this.state.contractDetails.status !== "Approved" ?
                                            <div className="marginTop15 col-lg-11 col-md-12 col-sm-12 col-xs-12">
                                                <button  className=" col-lg-2 pull-right btn btn-success" onClick={this.changeStatus.bind(this)}>    
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