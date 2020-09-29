import React, { Component } from 'react';
import $                    from 'jquery';
import axios                from 'axios';
import _                    from 'underscore';
import moment               from 'moment';
import swal                 from 'sweetalert';

import 'bootstrap/js/tab.js';
import 'react-phone-input-2/lib/style.css';
import '../View/Viewcontract.css';

class ShowContract extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "pathname"                  : this.props.match.params.entity,
            "selectedCorporate"         : {},
            "selectedCorporateLocation" : {},
            "entityStatutory"         : {},
            "companyStatutory"         : {},
            "selectedVendor"            : {},
            "selectedVendorLocation"    : {},
            "contractDetails"           : [],
            "packagesByCity"            : [],
        };
    }
    /*======= componentDidMount() =======*/
    componentDidMount() {
        const user_ID = localStorage.getItem("user_ID")  
        this.getContract();
        this.getCityNames();
        this.setState({
            contractID   : this.props.match.params.contractID,
            user_ID      : user_ID,
        }, ()=>{
            this.getUserData();
        })
        window.scrollTo(0, 0);
    }
    /*======= componentWillUnmount() =======*/
    componentWillUnmount() {
        $("script[src='/js/adminLte.js']").remove();
        $("link[href='/css/dashboard.css']").remove();
    }
    /*======= groupArrayOfObjects() =======*/
    groupArrayOfObjects(list, key) {
      return list.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    };
    /*======= getUserData() =======*/
    getUserData(){
        if(this.state.user_ID){
            axios.get("/api/users/get/" + this.state.user_ID)
                .then((response) => {
                    var userData = response.data;
                    this.setState({
                       loginUserData : userData
                    }, ()=>{                        
                        var userRole = this.state.loginUserData.role;
                        this.setState({
                            userRole : userRole
                        }, ()=>{
                            console.log("role", this.state.userRole);
                        });                       
                                                                                   
                    })                    
                })
                .catch((error) => {
                    console.log("Error getUserData() = ",error);
                })
        }
    }
    /*======= findUnique() =======*/
    findUnique(arr, predicate) {
          var found = {};
          arr.forEach(d => {
            found[predicate(d)] = d;
          });
          return Object.keys(found).map(key => found[key]); 
    }
    /*======= getCityNames() =======*/
    getCityNames(){
        axios.get("/api/citynamemaster/get/list")
        .then((response)=>{
          this.setState({
            cityNameArray : response.data
          })
        })
        .catch((error)=>{
          console.log("Error getCityNames() = ", error);
        })
    }
    /*======= getEntityUsersData() =======*/
    getEntityUsersData(companyID, entityType){
        if(entityType.toLowerCase() === "vendor"){
            var formValues = {
                companyID : companyID,
                role      : "vendoradmin"
            }
            axios.post("/api/users/get/list",formValues)
            .then((response)=>{
              // console.log("vendor user list = ",response.data);
              this.setState({
                userArray   : response.data,
                toUserRole  : "vendoradmin"
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
              // console.log("corporate user list = ",response.data);
              this.setState({
                userArray   : response.data,
                toUserRole  : "corporateadmin"
              })
            })
            .catch((error)=>{
              console.log("Error getEntityUsersData() = ", error);
            })
        }

    }
    /*======= getContract() =======*/
    getContract() {
        axios.get("/api/contract/get/joincontract/" + this.props.match.params.contractID)
            .then((response) => {
                console.log("contract details = ",response.data);
                console.log("contract details object = ",response.data[0]);
                var contractDetails = response.data[0];
                contractDetails.packages = response.data[0].packages.sort((a, b) => (a.packageType > b.packageType) ? 1 : (a.packageType === b.packageType) ? ((a.categoryCreatedAt > b.categoryCreatedAt) ? 1 : -1) : -1 );
                var entityLocation = response.data[0].entity.locations.filter((a, i) => response.data[0].entityLocationId.includes(a._id));
                console.log("entityLocation = ", entityLocation);
                contractDetails.entity.location = entityLocation[0];

                var companyLocation = response.data[0].company.locations.filter((a, i) => response.data[0].companyLocationId.includes(a._id));
                console.log("companyLocation = ", companyLocation);
                contractDetails.company.location = companyLocation[0];
                this.image(contractDetails.entity.companyLogo[0]); 

                this.setState({
                    contractDetails: contractDetails
                }, ()=>{   
                    console.log("state contractDetails => ",this.state.contractDetails);   
                    var stateVar = this.state.contractDetails.company.location.state;
                    var stateCode = this.state.contractDetails.company.location.stateCode;
                    if(this.state.contractDetails.company && this.state.contractDetails.company.statutoryDetails && this.state.contractDetails.company.statutoryDetails.length > 0){
                        var statutoryInfo = this.state.contractDetails.company.statutoryDetails.filter((elem)=>{return elem.state===stateVar || elem.stateCode === stateCode});
                        if(statutoryInfo && statutoryInfo.length > 0){
                            this.setState({companyStatutory:statutoryInfo[0]})
                        }
                    }  

                    var entitystateVar = this.state.contractDetails.entity.location.state;
                    var entitystateCode = this.state.contractDetails.entity.location.stateCode;
                    if(this.state.contractDetails.entity && this.state.contractDetails.entity.statutoryDetails && this.state.contractDetails.entity.statutoryDetails.length > 0){
                        var statutoryInfo = this.state.contractDetails.entity.statutoryDetails.filter((elem)=>{return elem.state===entitystateVar || elem.stateCode === entitystateCode});
                        if(statutoryInfo && statutoryInfo.length > 0){
                            this.setState({entityStatutory:statutoryInfo[0]})
                        }
                    }  
                    this.getEntityUsersData(this.state.contractDetails.entity.companyID, this.state.contractDetails.entityType);                              
                    /* code is refered from : https://codeburst.io/javascript-array-distinct-5edc93501dc4 */
                    const listOfCityClasses = [];
                    const map = new Map();
                    for (const item of this.state.contractDetails.packages) {
                        if(!map.has(item.cityClassId)){
                            map.set(item.cityClassId, true);
                            listOfCityClasses.push({
                                cityClassId   : item.cityClassId,
                                cityClass     : item.cityClass
                            });
                        }
                    }
                    console.log("contractDetails == > ", this.state.contractDetails);
                    /* code is refered from : https://stackoverflow.com/questions/14696326/break-array-of-objects-into-separate-arrays-based-on-a-property */
                    const listOfpackageTypes = [...new Set(this.state.contractDetails.packages.map(it => it.packageType))].sort(); 
                    var packagesByCity = this.groupArrayOfObjects(this.state.contractDetails.packages,"cityClass");

                    this.setState({
                        listOfCityClasses   : listOfCityClasses.sort((a, b) => (a.cityClass > b.cityClass) ? 1 : -1),
                        listOfpackageTypes  : listOfpackageTypes,
                        packagesByCity      : packagesByCity
                    },()=>{});

                    if(this.state.contractDetails.status.toLowerCase() !== "new" && this.state.contractDetails.status.toLowerCase() !== "edited") {
                       var statuslog = this.state.contractDetails.statusLog;
                       if(statuslog.length > 1 && statuslog.length < 3){
                            var latestStatusLog = statuslog.slice(Math.max(statuslog.length - 2, 0));
                            console.log("latestStatusLog= ",latestStatusLog);
                            for (var i = 0; i < latestStatusLog.length; i++) {
                                if(latestStatusLog[i].status === "Party-1 Signed"){
                                    console.log("in if....");
                                    this.setState({
                                        party1status        : "Party-1 Signed",
                                        party1statusAt      : latestStatusLog[i].statusAt,
                                        party1userData      : latestStatusLog[i].statusBy ? latestStatusLog[i].statusBy : "",
                                    }, ()=>{})
                                }
                                if(latestStatusLog[i].status === "Party-2 Signed"){
                                    this.setState({
                                        party2status        : "Party-2 Signed",
                                        party2statusAt      : latestStatusLog[i].statusAt,
                                        party2userData      : latestStatusLog[i].statusBy ? latestStatusLog[i].statusBy : "",
                                    }, ()=>{})
                                }
                            }
                        }else if(statuslog.length > 2){
                            var latestStatusLog = statuslog.slice(Math.max(statuslog.length - 3, 0));
                            console.log("latestStatusLog= ",latestStatusLog);
                            for (var i = 0; i < latestStatusLog.length; i++) {
                                if(latestStatusLog[i].status === "Party-1 Signed"){
                                    console.log("in if....");
                                    this.setState({
                                        party1status        : "Party-1 Signed",
                                        party1statusAt      : latestStatusLog[i].statusAt,
                                        party1userData      : latestStatusLog[i].statusBy ? latestStatusLog[i].statusBy : "",
                                    }, ()=>{})
                                }
                                if(latestStatusLog[i].status === "Party-2 Signed"){
                                    this.setState({
                                        party2status        : "Party-2 Signed",
                                        party2statusAt      : latestStatusLog[i].statusAt,
                                        party2userData      : latestStatusLog[i].statusBy ? latestStatusLog[i].statusBy : "",
                                    }, ()=>{})
                                }
                            }
                        }else if(statuslog.length === 1){                            
                            if(statuslog[0].status === "Party-1 Signed"){
                                this.setState({
                                    party1status        : "Party-1 Signed",
                                    party1statusAt      : statuslog[0].statusAt,
                                    party1userData      : statuslog[0].statusBy ? statuslog[0].statusBy : "",
                                }, ()=>{})
                            }
                            if(statuslog[0].status === "Party-2 Signed"){
                                this.setState({
                                    party2status        : "Party-2 Signed",
                                    party2statusAt      : statuslog[0].statusAt,
                                    party2userData      : statuslog[0].statusBy ? statuslog[0].statusBy : "",
                                }, ()=>{})
                            }
                        }               
                    }
                })                
            })
            .catch((error) => {
                console.log("Error getContract() = ",error);
            })
    }
    /*======= download() =======*/
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
        $('.button1').hide();
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
        $('.button1').show();
        $('.main-footer').show();
        $(".box-header").show();
    }
    /*======= openNav() =======*/
    openNav() {
        document.getElementById("mySidenav").style.width = "250px";
    }
    /*======= closeNav() =======*/
    closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }
    /*======= back() =======*/
    back(event) {
        event.preventDefault();
        var contractID = this.props.match.params.contractID;
        this.props.history.push("/contract-list");
    }
    /*======= addMySignature() =======*/
    addMySignature(event){
        event.preventDefault();
        if(this.state.user_ID){
            axios.get("/api/personmaster/get/details/" + this.state.user_ID)
                .then((response) => { 
                    console.log("response = ",response.data);
                    var userData = response.data[0];
                    console.log("userdata var = ",userData);
                    this.setState({
                       userData : userData
                    }, ()=>{ 
                        console.log("userData state = ",this.state.userData);
                        if(this.state.userRole){
                            if(this.state.userRole.includes("admin")){
                                var status = "Party-1 Signed";
                                console.log("status = ",status);
                            }else if((this.state.userRole.includes("vendoradmin")) || (this.state.userRole.includes("corporateadmin"))){
                                var status = "Party-2 Signed";
                                console.log("status = ",status);
                            }
                            if (this.state.userData) {
                                var formValues = {
                                    contractID     : this.state.contractID,
                                    status         : status,
                                    userid         : this.state.user_ID,
                                    username       : (this.state.userData.firstName ? this.state.userData.firstName + " " : "")+
                                                     (this.state.userData.middleName ? this.state.userData.middelName + " " : "")+
                                                     (this.state.userData.lastName ? this.state.userData.lastName : ""),
                                    empid          : this.state.userData.employeeId ? this.state.userData.employeeId : "",
                                    companyId      : this.state.userData.companyID ? this.state.userData.companyID : "",
                                    company        : this.state.userData.companyName ? this.state.userData.companyName : "",
                                    address        : this.state.userData.workLocation ? this.state.userData.workLocation : "",
                                    department     : this.state.userData.department.length > 0 ? this.state.userData.department[0].department : "",
                                    designation    : this.state.userData.designation.length > 0 ? this.state.userData.designation[0].designation : "",
                                }
                            }                            
                            console.log("FormValues = ", formValues);
                            axios.patch("/api/contract/patch/contractsign", formValues)
                                .then((response) => {
                                    if(response.data.updated){
                                        this.getContract();
                                        var sendData = {
                                          "event"           : "Event32", 
                                          "toUser_id"       : this.state.userArray ? this.state.userArray._id : "", // ref: users
                                          "toUserRole"      : this.state.toUserRole,
                                          "variables"       : {
                                                "companyName"    : this.state.userData.companyName,
                                                "signedAuthority": (this.state.userData.firstName ? this.state.userData.firstName + " " : "")+
                                                                   (this.state.userData.middleName ? this.state.userData.middelName + " " : "")+
                                                                   (this.state.userData.lastName ? this.state.userData.lastName : ""),
                                                "signedDate"     : moment(new Date()).format("Do MMMM YYYY"),
                                            }
                                        }
                                        console.log('sendDataToUser => ', sendData)
                                        axios.post('/api/masternotifications/post/sendNotification', sendData)
                                        .then((res) => {
                                            console.log('sendDataToUser in result => ', res.data)
                                        })
                                        .catch((error) => { 
                                            console.log('Notification Error => ',error)
                                        })
                                        swal("Done!", "Contract Signed Successfully...");
                                    }else{
                                        swal("Sorry...!", "Failed to Sign Contract...");
                                    }             
                                })
                                .catch((error) => {
                                    console.log("Error addSign() = ",error);
                                })  
                        }                                                            
                    })                    
                })
                .catch((error) => {
                    console.log("Error getUserData() = ",error);
                })
        }        
    }
    /*======= image(url) =======*/
    image(url) {}
    /*======= render() =======*/
    render() {
        console.log("contract company = ", this.state.contractDetails.company);
        console.log("contract entity = ", this.state.contractDetails.entity);

        return (
            <div className="">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <section className="content">
                            <div className="pageContent col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="box-header with-border col-lg-12 col-md-12 col-xs-10 col-sm-10 NOpadding-right">
                                    <h4 className="weighttitle col-lg-11 col-md-11 col-xs-11 col-sm-11 NOpadding-right">Contract Management</h4>
                                    <i id="printButton" onClick={this.download.bind(this)} className="fa fa-download pull-right downloadicon" data-toggle="tooltip" title="Save as PDF"></i>
                                </div>
                                {this.props.match.params.contractID ? null : <div className="error textAlignCenter col-lg-12 col-md-12 col-sm-12 col-xs-12"> It is dummy view of Contract Management.</div>}
                                <div className="box-header col-lg-12 col-md-12 col-xs-10 col-sm-10 NOpadding-right"></div>
                                <section className="Content">
                                    <div className="row">
                                        <div id="viewcontract" className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                    <img id="logoSrc" src="/images/logo.png" className="headerlogo col-lg-6 col-md-6 col-sm-6 col-xs-6" />
                                                    <h5 className="col-lg-6 col-md-6 col-sm-6 col-xs-6 headersubtitle pull-right">{this.state.contractDetails.entityType === "corporate" ? "Corporate" : "Vendor"} Car Rental Service</h5>
                                                </div>
                                                <div className="headerupperborder col-lg-12 col-md-12 col-sm-12 col-xs-12"></div>
                                                <div className="greyheaderdiv col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                    {this.state.contractDetails.entityType === "corporate" ? "Corporate" : "Vendor"} Car Rental Service Contract
                                                </div>
                                                <div className="headerbottomborder col-lg-12 col-md-12 col-sm-12 col-xs-12"></div>
                                                {this.state.contractDetails.company && this.state.contractDetails.entity ?
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 contracttext">
                                                        <p style={{"textAlign" : "justify"}}>
                                                            This <b> {this.state.contractDetails.entityType === "corporate" ? "Corporate" : "Vendor"} Car Rental Service Contract </b> is made and entered into this <b>
                                                            {moment(this.state.contractDetails.createdAt).format("Do MMMM YYYY")}</b>,
                                                            by and between <b>{this.state.contractDetails.company.companyName}</b><span className="entityName">{" - ( " + this.state.contractDetails.company.entityType + " ) "}</span> 
                                                            with an address of &nbsp;
                                                            {(this.state.contractDetails.company.location) 
                                                                ?
                                                                <span>
                                                                    <span  className="locType">{(this.state.contractDetails.company.location.locationType) + " - "}</span><i style={{"fontSize" : "13px"}}>
                                                                    {this.state.contractDetails.company.location.addressLine2 ? this.state.contractDetails.company.location.addressLine2 + ", " : ""}
                                                                    {this.state.contractDetails.company.location.addressLine1 ? this.state.contractDetails.company.location.addressLine1 + ", " : ""} 
                                                                    {this.state.contractDetails.company.location.area ? this.state.contractDetails.company.location.area + ", " : ""} 
                                                                    {this.state.contractDetails.company.location.city ? this.state.contractDetails.company.location.city + ", " : ""} 
                                                                    {this.state.contractDetails.company.location.district ? this.state.contractDetails.company.location.district + ", " : ""} 
                                                                    {this.state.contractDetails.company.location.state ? this.state.contractDetails.company.location.state + ", " : ""} 
                                                                    {this.state.contractDetails.company.location.country ? this.state.contractDetails.company.location.country : ""}</i> 
                                                                </span>
                                                            :
                                                                null
                                                            }
                                                            and &nbsp;
                                                            <b>{this.state.contractDetails.entity.companyName}</b>
                                                            <span className="entityName">{" - ( " + this.state.contractDetails.entity.entityType + " ) "}</span> 
                                                            with an address of &nbsp;
                                                            {(this.state.contractDetails.entity.location)
                                                                ? 
                                                                <span>                                                            
                                                                    <span className="locType">{ this.state.contractDetails.entity.location.locationType + " - " }</span><i style={{"fontSize" : "13px"}}>
                                                                    { (this.state.contractDetails.entity.location.addressLine2 ? this.state.contractDetails.entity.location.addressLine2 + ", " : "") 
                                                                    + (this.state.contractDetails.entity.location.addressLine1 ? this.state.contractDetails.entity.location.addressLine1 + ", " : "")
                                                                    + (this.state.contractDetails.entity.location.area ? this.state.contractDetails.entity.location.area + ", " : "") 
                                                                    + (this.state.contractDetails.entity.location.city ? this.state.contractDetails.entity.location.city + ", " : "") 
                                                                    + (this.state.contractDetails.entity.location.district ? this.state.contractDetails.entity.location.district + ", " : "")
                                                                    + (this.state.contractDetails.entity.location.state ? this.state.contractDetails.entity.location.state + ", " : "") 
                                                                    + (this.state.contractDetails.entity.location.country ? this.state.contractDetails.entity.location.country : "")+(".")
                                                                    }</i>
                                                                </span>
                                                            :
                                                                null
                                                            }
                                                        </p>
                                                        <p>
                                                            Contract duration would be {this.state.contractDetails.contractDuration} months. This contract will be effective from <b>{moment(this.state.contractDetails.contractDate).format("Do MMMM YYYY")}</b> to <b>{moment(this.state.contractDetails.effectiveUpto).format("Do MMMM YYYY")}</b>.
                                                        </p>
                                                    </div>
                                                    :
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 contracttext">
                                                        <p>
                                                            This Corporate Car Rental Service Contract is entered into 
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
                                                    this.state.contractDetails.company 
                                                    ?
                                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                            <div className="companyinfo col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{"textAlign": "center"}}>COMPANY INFORMATION</div>
                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-margin">
                                                                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12 detailBoxImg" style={{"padding" : "5px"}}>
                                                                    <img src={this.state.contractDetails.company.companyLogo && this.state.contractDetails.company.companyLogo.length > 0? this.state.contractDetails.company.companyLogo : "/images/noImagePreview.png"} className=""></img>
                                                                </div>
                                                                <div className="col-lg-10 col-md-10 col-sm-10 col-xs-12">
                                                                    <h5 className="detailtitle">{this.state.contractDetails.company.companyName}</h5>
                                                                    <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">                                                                       
                                                                        <li><i className="fa fa-user-circle-o listIcon"></i> {this.state.contractDetails.company.groupName ? this.state.contractDetails.company.groupName : <span className="notAvailablemsg"> Not Available </span>}</li>
                                                                        <li><i className="fa fa-globe globe-ico listIcon"></i> {this.state.contractDetails.company.website ? this.state.contractDetails.company.website : <span className="notAvailablemsg"> Not Available </span>}</li>
                                                                        <li><i className="fa fa-envelope listIcon"></i> {this.state.contractDetails.company.companyEmail ? this.state.contractDetails.company.companyEmail : <span className="notAvailablemsg"> Not Available </span>}</li>
                                                                        <li><span className="listItem">CIN : </span>{this.state.contractDetails.company.CIN ? this.state.contractDetails.company.CIN : <span className="notAvailablemsg"> Not Available </span>}</li>
                                                                        <li><span className="listItem">TAN : </span>{this.state.contractDetails.company.TAN ? this.state.contractDetails.company.TAN : <span className="notAvailablemsg"> Not Available </span>}</li>
                                                                        <li><span className="listItem">PAN : </span>{(this.state.companyStatutory && this.state.companyStatutory.PAN) ? this.state.companyStatutory.PAN : <span className="notAvailablemsg"> Not Available </span>}</li>
                                                                        <li><span className="listItem">GSTIN : </span>{(this.state.companyStatutory && this.state.companyStatutory.GSTIN) ? this.state.companyStatutory.GSTIN : <span className="notAvailablemsg"> Not Available </span>}</li>
                                                                        {this.state.contractDetails.company.location
                                                                        ?
                                                                            <li  style={{"textAlign" : "justify"}}><i className="fa fa-map-marker address-ico listIcon"></i> 
                                                                                <span className="locType">{this.state.contractDetails.company.location.locationType + " - "}</span>
                                                                                {this.state.contractDetails.company.location.addressLine2 ? this.state.contractDetails.company.location.addressLine2 + ", " : ""} 
                                                                                {this.state.contractDetails.company.location.addressLine1 ? this.state.contractDetails.company.location.addressLine1 + ", " : ""}
                                                                                {this.state.contractDetails.company.location.area ? this.state.contractDetails.company.location.area + ", " : ""} 
                                                                                {this.state.contractDetails.company.location.city ? this.state.contractDetails.company.location.city + ", " : ""}
                                                                                {this.state.contractDetails.company.location.district ? this.state.contractDetails.company.location.district + ", " : ""} 
                                                                                {this.state.contractDetails.company.location.state ? this.state.contractDetails.company.location.state + ", " : ""} 
                                                                                {this.state.contractDetails.company.location.country ? this.state.contractDetails.company.location.country : ""}
                                                                                {this.state.contractDetails.company.location.pincode ? " - " + this.state.contractDetails.company.location.pincode : ""}.
                                                                            </li>    
                                                                        :
                                                                            null  
                                                                        }                                                                         
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    :
                                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                            <div className="companyinfo col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{"textAlign": "center"}}>COMPANY INFORMATION</div>
                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-margin">
                                                                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12 viewBoxImg" style={{ "backgroundImage": `url(/images/logonotfound.jpg)` }}></div>
                                                                <div className="col-lg-10 col-md-10 col-sm-10 col-xs-12">
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
                                                    this.state.contractDetails.entity 
                                                    ?
                                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                            <div className="entityinfo col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{"textAlign": "center"}}>{this.state.contractDetails.entityType} INFORMATION</div>
                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-margin">
                                                                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12 detailBoxImg">
                                                                    <img src={this.state.contractDetails.entity.companyLogo && this.state.contractDetails.entity.companyLogo.length > 0? this.state.contractDetails.entity.companyLogo : "/images/noImagePreview.png"} className=""></img>
                                                                </div>
                                                                <div className="col-lg-10 col-md-10 col-sm-10 col-xs-12">
                                                                    <h5 className="detailtitle">{this.state.contractDetails.entity.companyName}</h5>
                                                                    <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                        <li><i className="fa fa-user-circle-o listIcon"></i> {this.state.contractDetails.entity.groupName ? this.state.contractDetails.entity.groupName : <span className="notAvailablemsg"> Not Available </span>}</li>
                                                                        <li><i className="fa fa-globe globe-ico listIcon"></i> {this.state.contractDetails.entity.website ? this.state.contractDetails.entity.website : <span className="notAvailablemsg"> Not Available </span>}</li>
                                                                        <li><i className="fa fa-envelope listIcon"></i> {this.state.contractDetails.entity.companyEmail ? this.state.contractDetails.entity.companyEmail : <span className="notAvailablemsg"> Not Available </span>}</li>
                                                                        <li><span className="listItem">CIN : </span>{this.state.contractDetails.entity.CIN ? this.state.contractDetails.entity.CIN : <span className="notAvailablemsg"> Not Available </span>}</li>
                                                                        <li><span className="listItem">TAN : </span>{this.state.contractDetails.entity.TAN ? this.state.contractDetails.entity.TAN : <span className="notAvailablemsg"> Not Available </span>}</li>
                                                                        <li><span className="listItem">PAN : </span>{(this.state.entityStatutory && this.state.entityStatutory.PAN) ? this.state.entityStatutory.PAN : <span className="notAvailablemsg"> Not Available </span>}</li>
                                                                        <li><span className="listItem">GSTIN : </span>{(this.state.entityStatutory && this.state.entityStatutory.GSTIN) ? this.state.entityStatutory.GSTIN : <span className="notAvailablemsg"> Not Available </span>}</li>
                                                                        {this.state.contractDetails.entity.location 
                                                                        ?
                                                                            <li style={{"textAlign" : "justify"}}><i className="fa fa-map-marker address-ico listIcon"></i> 
                                                                                <span className="locType">{this.state.contractDetails.entity.location.locationType +" - "}</span>
                                                                                {this.state.contractDetails.entity.location.addressLine2 ? this.state.contractDetails.entity.location.addressLine2 + ", " : ""}
                                                                                {this.state.contractDetails.entity.location.addressLine1 ? this.state.contractDetails.entity.location.addressLine1 + ", " : ""}
                                                                                {this.state.contractDetails.entity.location.area ? this.state.contractDetails.entity.location.area + ", " : ""} 
                                                                                {this.state.contractDetails.entity.location.city ? this.state.contractDetails.entity.location.city + ", " : ""}
                                                                                {this.state.contractDetails.entity.location.district ? this.state.contractDetails.entity.location.district + ", " : ""} 
                                                                                {this.state.contractDetails.entity.location.state ? this.state.contractDetails.entity.location.state + ", " : ""} 
                                                                                {this.state.contractDetails.entity.location.country ? this.state.contractDetails.entity.location.country : ""}
                                                                                {this.state.contractDetails.entity.location.pincode ? " - " + this.state.contractDetails.entity.location.pincode : ""}.
                                                                            </li>                                                                    
                                                                            
                                                                        :
                                                                            null
                                                                        }
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    :
                                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                            <div className="entityinfo col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{"textAlign": "center"}}>CONTRACT COMPANY INFORMATION</div>
                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-margin">
                                                                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12 detailBoxImg" style={{ "backgroundImage": `url("/images/logonotfound.jpg")` }}></div>
                                                                <div className="col-lg-10 col-md-10 col-sm-10 col-xs-12">
                                                                <h5 className="detailtitle">Contract Company Name</h5>
                                                                    <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                        <li><i className="fa fa-user-o "></i> &nbsp; Group Name</li>
                                                                        <li><i className="fa fa-globe"></i> &nbsp; www.abc.com</li>
                                                                        <li><i className="fa fa-envelope "></i> &nbsp; abc@gmail.com</li>
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
                                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding marbtm30">
                                                                    
                                                                    {this.state.listOfCityClasses.map((d, i, array) => {
                                                                        return (
                                                                            <div key={i} className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{"marginBottom" : "5px"}}> 
                                                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 package-title-div NOpadding">
                                                                                    <h6 className="cityClass-title"> {d.cityClass + " City Packages"} </h6>
                                                                                </div>   
                                                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                                    {this.state.cityNameArray && this.state.cityNameArray.length > 0
                                                                                    ?
                                                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-sm-12 cityNames">
                                                                                        <span className="cityTitle">Cities ( </span>
                                                                                        {this.state.cityNameArray.map((citydata, index, array) => {
                                                                                            if(d.cityClassId === citydata.cityTypeId){                                                                          
                                                                                                return (
                                                                                                    <span key={index}>{citydata.cityName ? citydata.cityName + " | " : ""}</span>                                                                                                                                                                                             
                                                                                                    
                                                                                                );
                                                                                            }
                                                                                        })}
                                                                                        <span className="cityTitle"> ) </span>
                                                                                    </div>
                                                                                    : 
                                                                                        null
                                                                                    }
                                                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-sm-12 NOpadding">
                                                                                        <table className="table packagesTable">
                                                                                            <thead className="">                                                                                               
                                                                                                <tr>
                                                                                                    {/*<th>City Class</th>*/}                                                                                        
                                                                                                    <th>Package Type</th>                                                                                        
                                                                                                    <th>Car Category</th>                                                                                      
                                                                                                    <th>Package Name</th>                                                                                       
                                                                                                    <th>Min Kms / Day</th>                                                                                       
                                                                                                    <th>Min Hrs / Day</th>                                                                                       
                                                                                                    <th>Fixed Charges</th>                                                                                       
                                                                                                    <th>Extra Charges / Kms</th>                                                                                        
                                                                                                    <th>Extra Charges / Hr</th>                                                                                        
                                                                                                    <th>Driver Allowance / Day</th>                                                                                        
                                                                                                    <th>Night Halt / Night</th>                                                                                        
                                                                                                    <th>Night Charges</th>                                                                                        
                                                                                                    <th>Early Morning Charges</th>                                                                                        
                                                                                                </tr>
                                                                                            </thead>
                                                                                            <tbody className="packageList">
                                                                                                {this.state.contractDetails.packages.map((data, index, array) => {
                                                                                                    if(d.cityClass === data.cityClass){                                                                                             
                                                                                                    return (                                                                                                        
                                                                                                        <tr key={index}>
                                                                                                            {/*<td>{data.cityClass}</td>*/}
                                                                                                            <td>{data.packageType}</td>
                                                                                                            <td>{data.carCategory}</td>
                                                                                                            <td>{data.packageName}</td>
                                                                                                            <td>{data.maxKm}</td>
                                                                                                            <td>{data.maxHours}</td>
                                                                                                            <td>{data.fixCharges}</td>
                                                                                                            <td>{data.extraKms}</td>
                                                                                                            <td>{data.extraHr}</td>
                                                                                                            <td>{data.driverAllowance}</td>
                                                                                                            <td>{data.nightHalt}</td>
                                                                                                            <td>{data.nightCharges}</td>
                                                                                                            <td>{data.morningCharges}</td>
                                                                                                        </tr>
                                                                                                    );
                                                                                                 }
                                                                                                })}
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </div>
                                                                                </div>
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
                                                    this.state.contractDetails.conditions 
                                                    ?
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
                                                        <div className="signdetails col-lg-12 col-md-12 col-sm-12 col-xs-12">                                                                
                                                            <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12 NOpadding" style={{"textAlign" : (this.state.party1status === "Party-1 Signed") ? "" : "center"}}>
                                                                <h5 className="signtitle" style={{"marginBottom" : (this.state.party1status === "Party-1 Signed") ? "30px" : ""}}>Company Signature</h5>
                                                            </div>
                                                        </div>
                                                        {this.state.party1status && this.state.party1userData
                                                        ?
                                                            <div className="signdetails  col-lg-8 col-md-8 col-sm-8 col-xs-8">                                                                
                                                                <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">                                                                       
                                                                    <li className="authority-name">{this.state.party1userData.username ? this.state.party1userData.username : ""}</li>
                                                                    <li className="designation">{(this.state.party1userData && this.state.party1userData.designation) ? "( " + this.state.party1userData.designation + " )" : ""}</li>
                                                                    <li className="empid">Employee ID : {this.state.party1userData.empid ? this.state.party1userData.empid : ""}</li>
                                                                    <li className="comapnyName">{this.state.party1userData.company ? this.state.party1userData.company : ""}</li>
                                                                    <li><span className="signDate">Sign Date </span><span className="signdate">{this.state.party1statusAt ?  " : " + moment(new Date(this.state.party1statusAt)).format("DD MMM YYYY") : ""}</span></li>
                                                                    <li><span className="location">Location</span><span className="loc">{" : " + (this.state.party1userData.address ? this.state.party1userData.address : "")}</span></li>
                                                                </ul>
                                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 signborder"></div>
                                                            </div>
                                                        :
                                                                            
                                                            this.state.contractDetails.company 
                                                            ?
                                                                this.state.userRole 
                                                                ?
                                                                    this.state.userRole.includes("admin")
                                                                    ?                                                                        
                                                                        <div className="signdetails col-lg-8 col-md-8 col-sm-8 col-xs-12">                                                                
                                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding"  style={{"textAlign" : "center"}}>
                                                                                <button className="button2 btn margBtm40 center-block" onClick={this.addMySignature.bind(this)}><i className="fa fa-signature" aria-hidden="true"></i>&nbsp;Add My Signature</button>
                                                                            </div> 
                                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 signborder"></div>
                                                                            </div>
                                                                        </div>
                                                                    :
                                                                        null
                                                                :
                                                                    null
                                                            :
                                                                null
                                                        }
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 ">
                                                        <div className="signdetails col-lg-12 col-md-12 col-sm-12 col-xs-12  pull-right">                                                                
                                                            <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12 NOpadding pull-right" style={{"textAlign" : (this.state.party2status === "Party-2 Signed") ? "" : "center"}}>
                                                                <h5 className="signtitle" style={{"marginBottom" : (this.state.party2status === "Party-2 Signed") ? "30px" : ""}}>{this.state.contractDetails.entityType} Signature</h5> 
                                                            </div>
                                                        </div>
                                                        {this.state.party2status === "Party-2 Signed"
                                                        ?
                                                            <div className="signdetails col-lg-8 col-md-8 col-sm-8 col-xs-12  pull-right">                                                              
                                                                <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">                                                                       
                                                                    <li className="authority-name">{this.state.party2userData.username ? this.state.party2userData.username : ""}</li>
                                                                    <li className="designation">{(this.state.party2userData && this.state.party2userData.designation) ? "( " + this.state.party2userData.designation + " )" : ""}</li>
                                                                    <li className="empid">Employee ID : {this.state.party2userData.empid ? this.state.party2userData.empid : ""}</li>
                                                                    <li className="comapnyName">{this.state.party2userData.company ? this.state.party2userData.company : ""}</li>
                                                                    <li><span className="signDate">Sign Date</span><span className="signdate">{this.state.party2statusAt ?  " : " + moment(new Date(this.state.party2statusAt)).format("DD MMM YYYY") : ""}</span></li>
                                                                    <li><span className="location">Location</span><span className="loc">{" : " + (this.state.party2userData.address ? this.state.party2userData.address : "")}</span></li>
                                                                </ul>
                                                                 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 signborder NOpadding pull-right"></div>
                                                            </div>
                                                        :
                                                            this.state.contractDetails.entity 
                                                            ?   
                                                                this.state.userRole 
                                                                ?
                                                                    this.state.userRole.includes("vendoradmin") || this.state.userRole.includes("corporateadmin") || this.state.userRole.includes("manager")
                                                                    ?
                                                                        <div className="signdetails col-lg-8 col-md-8 col-sm-8 col-xs-12  pull-right">                                                                
                                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding" style={{"textAlign" : "center"}}>
                                                                                <button className="button2 btn margBtm40 center-block"  onClick={this.addMySignature.bind(this)}><i className="far fa-signature" aria-hidden="true"></i>&nbsp;Add My Signature</button>
                                                                            </div>
                                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 signborder NOpadding pull-right"></div>                                                                            
                                                                        </div>
                                                                    :
                                                                        null
                                                                :
                                                                    null
                                                            :
                                                                null
                                                        }
                                                    </div>
                                                </div>
                                                <div className="footerbottomborder col-lg-12 col-md-12 col-sm-12 col-xs-12"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <button className="button2 btn margBtm40" onClick={this.back.bind(this)}><i className="fa fa-angle-double-left" aria-hidden="true"></i>&nbsp;Back</button>
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
export default ShowContract;