import React, { Component } from 'react';
import $                    from 'jquery';
import jQuery               from 'jquery';
import axios                from 'axios';
import swal                 from 'sweetalert';
import _                    from 'underscore';
import moment               from 'moment';

import { CheckBoxSelection, Inject, MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';

import 'bootstrap/js/tab.js';
import './Contract.css';
import 'react-phone-input-2/lib/style.css';
import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-inputs/styles/material.css";
import "@syncfusion/ej2-react-dropdowns/styles/material.css";

class ContractManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyLocation             : "--Select Location--",
            entityLocation              : "--Select Location--",
            companyLocationArray        : [],
            entityLocationArray         : [],
            selectedEntityStatutory    : [],
            selectedCompanyStatutory    : [],
            selectedCompanyLocation     : {},
            selectedEntity              : {},
            selectedEntityLocation      : [],
            contractArray               : [],
            entityType                  : "vendor",
            // "entity"                    : "--Select--",
            // "entityLocation"            : "--Select Location--",
            contractDate                : moment(new Date()).format("YYYY-MM-DD"),
            contractDuration            : 12,
            effectiveUpto               : (moment(new Date()).add(12, 'M')).subtract(1, "days").format("YYYY-MM-DD"),
        };

        this.handleChange       = this.handleChange.bind(this);
        this.getCorpLocation    = this.getCorpLocation.bind(this);
        this.getEntityLocation  = this.getEntityLocation.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.submit             = this.submit.bind(this);
    }

    /*======= componentDidMount() =======*/
    componentDidMount() {
        this.getCompany();
        this.getEntity();

        const user_ID = localStorage.getItem("user_ID");
        this.setState({
            contractID  : this.props.match.params.contractID,
            user_ID     : user_ID,
        }, () => {
            this.edit();
            this.getUserData();
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
            debug   : true,
            success : "valid"
        });

        $("#ContractManagement").validate({
            rules: {
                company: {
                    required    : true,
                    regxcompany : "--Select--"
                },
                companyLocation: {
                    required            : true,
                    regxcompanyLocation : "--Select Location--"
                },
                entityType: {
                    required        : true,
                    regxentityType  : "--Select--"
                },
                entity: {
                    regxentity  : "--Select--",
                    required    : true
                },
                entityLocation: {
                    regxentityLocation  : "--Select Location--",
                    required            : true
                },
                contractDate: {
                    required : true
                },
                // effectiveUpto: {
                //     required : true
                // },
                contractDuration: {
                    required : true
                },
            },
            errorPlacement: function (error, element) {
                if (element.attr("name") === "company") {
                    error.insertAfter("#company");
                }
                if (element.attr("name") === "companyLocation") {
                    error.insertAfter("#companyLocation");
                }
                if (element.attr("name") === "entityType") {
                    error.insertAfter("#entityType");
                }
                if (element.attr("name") === "entity") {
                    error.insertAfter("#entity");
                }
                if (element.attr("name") === "entityLocation") {
                    error.insertAfter("#entityLocation");
                }
                if (element.attr("name") === "contractDate") {
                    error.insertAfter("#contractDate");
                    $('#contractDate').focus();
                }
                // if (element.attr("name") === "effectiveUpto") {
                //     error.insertAfter("#effectiveUpto");
                // }
                if (element.attr("name") === "contractDuration") {
                    error.insertAfter("#contractDuration");
                }
            }
        });
    }

    /*======= componentWillReceive() ========*/
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

    /*======= componentWillUnmount() ========*/
    componentWillUnmount() {
        $("script[src='/js/adminLte.js']").remove();
        $("link[href='/css/dashboard.css']").remove();
    }

    /*======= getCompany() ========*/
    getCompany() {
        axios.post('/api/entitymaster/get/getAdminCompany')
        .then((response) => {
            // console.log("getCompany Response = ", response.data[0]);
            this.setState({
                companyId            : response.data[0]._id,
                companyDetails       : response.data[0],
                company              : response.data[0].companyName,
                companyLocationArray : response.data[0].locations
            }, ()=>{
                if(this.state.companyLocationArray && this.state.companyLocationArray.length > 0 && this.state.companyLocation === "--Select Location--")
                {
                    for (var i = 0; i < this.state.companyLocationArray.length; i++) {
                        
                        console.log("companyLocation => ", this.state.companyLocation);
                        console.log("companyLocation condition => ", (this.state.companyLocationArray[i].locationType.toLowerCase() === "head office" || this.state.companyLocationArray[i].locationType.toLowerCase() === "headquarter" || this.state.companyLocationArray[i].locationType.toLowerCase() === "headquarters"));
                        if((this.state.companyLocationArray[i].locationType.toLowerCase() === "head office" || this.state.companyLocationArray[i].locationType.toLowerCase() === "headquarter" || this.state.companyLocationArray[i].locationType.toLowerCase() === "headquarters")){
                            this.setState({
                                selectedCompanyLocation : this.state.companyLocationArray[i],
                                companyLocation         : this.state.companyLocationArray[i]._id
                            }, ()=>{
                                console.log("selectedCompanyLocation if = ", this.state.selectedCompanyLocation);
                                console.log("companyLocation if = ", this.state.companyLocation);
                            });
                        }else{
                            this.setState({
                                selectedCompanyLocation : this.state.companyLocationArray[0],
                                companyLocation         : this.state.companyLocationArray[0]._id
                            }, ()=>{
                                console.log("selectedCompanyLocation else = ", this.state.selectedCompanyLocation);
                                console.log("companyLocation else = ", this.state.companyLocation);
                                var stateVar = this.state.selectedCompanyLocation.state;
                                var stateCode = this.state.selectedCompanyLocation.stateCode;
                                if(this.state.companyDetails && this.state.companyDetails.statutoryDetails && this.state.companyDetails.statutoryDetails.length > 0){
                                    var statutoryInfo = this.state.companyDetails.statutoryDetails.filter((elem)=>{return elem.state===stateVar || elem.stateCode === stateCode});
                                    if(statutoryInfo && statutoryInfo.length > 0){
                                        this.setState({selectedCompanyStatutory:statutoryInfo})
                                    }
                                }
                            })
                        }
                    } 
                }
            })
        })
        .catch((error) => {
            console.log("Error getCompany() = ",error);
        })
    }   

    /*======= getEntity() ========*/
    getEntity() {
        axios.get('/api/entitymaster/get/' + this.state.entityType)
            .then((response) => {
                this.setState({
                    entityArray     : response.data,
                })
                console.log("entityArray = ", this.state.entityArray);
            })
            .catch((error) => {
                console.log("Error getEntity() = ",error);
            })
    }

    /*======= selectEntity() ========*/
    selectEntity(event) {
        event.preventDefault();
        const name = event.target.name;
        var value  = event.target.value;

        this.setState({
            [name]                 : event.target.value,
            selectedEntityLocation : [],
            selectedEntityLocArray : []
        },()=>{
            this.getEntityLocation(value);
            this.setState({
                entityLocation: ''
            })
        })
    }

    /*======= getEntityLocation() ========*/
    getEntityLocation(entityId) {
        console.log("entity id : ",entityId)
        axios.get('/api/entitymaster/get/one/' + entityId)
            .then((response) => {
                console.log("selected entity location array = ", response.data[0].locations);
                var entityLocArray = response.data[0].locations.map((a, i) => {
                    return ({
                        text   : a.city + ", " + a.district + " " + a.stateCode + " - " + a.countryCode,
                        value  : a._id
                    });                    
                })
                this.setState({
                    selectedEntity          : response.data[0],
                    entityLocationArray     : response.data[0].locations,
                    entityLocArray          : entityLocArray,
                }, ()=>{
                    console.log("entity location value = ", this.state.entityLocation)
                    if(this.state.entityLocationArray && this.state.entityLocationArray.length > 0 && this.state.entityLocation === "")
                    {
                        console.log("entityLocationArray => ", this.state.entityLocationArray);
                        for (var i = 0; i < this.state.entityLocationArray.length; i++) {
                            if (this.state.entityLocationArray[i].locationType) {
                                if(this.state.entityLocationArray[i].locationType.toLowerCase() === "head office" || this.state.entityLocationArray[i].locationType.toLowerCase() === "headquarter" || this.state.entityLocationArray[i].locationType.toLowerCase() === "headquarters"){
                                    this.setState({
                                        selectedEntityLocation  : this.state.entityLocationArray[i],
                                        entityLocation          : this.state.entityLocationArray[i]._id
                                    }, ()=>{console.log("entityLocation state = ",this.state.entityLocation);})
                                }else{
                                    this.setState({
                                        selectedEntityLocation  : this.state.entityLocationArray[0],
                                        entityLocation          : this.state.entityLocationArray[0]._id
                                    }, ()=>{
                                        console.log("else entityLocation state = ",this.state.entityLocation);
                                        var stateVar = this.state.selectedEntityLocation.state;
                                        var stateCode = this.state.selectedEntityLocation.stateCode;
                                        if(this.state.selectedEntity && this.state.selectedEntity.statutoryDetails && this.state.selectedEntity.statutoryDetails.length > 0){
                                            var statutoryInfo = this.state.selectedEntity.statutoryDetails.filter((elem)=>{return elem.state===stateVar || elem.stateCode === stateCode});
                                            if(statutoryInfo && statutoryInfo.length > 0){
                                                this.setState({selectedEntityStatutory:statutoryInfo})
                                            }
                                        }
                                    })
                                }
                            }
                        } 
                    }else if (this.state.entityLocationArray && this.state.entityLocationArray.length > 0 && (this.state.entityLocation !== "" || "--Select Location--")) {
                        console.log("entityLocationArray => ", this.state.entityLocationArray);
                        var selectedEntityLocation = this.state.entityLocationArray.filter((a) => a._id === this.state.entityLocation);
                        this.setState({
                            selectedEntityLocation: selectedEntityLocation[0]
                        }, ()=>{
                            console.log("selectedEntityLocation = ", this.state.selectedEntityLocation);
                            var stateVar = this.state.selectedEntityLocation.state;
                            var stateCode = this.state.selectedEntityLocation.stateCode;
                            if(this.state.selectedEntity && this.state.selectedEntity.statutoryDetails && this.state.selectedEntity.statutoryDetails.length > 0){
                                var statutoryInfo = this.state.selectedEntity.statutoryDetails.filter((elem)=>{return elem.state===stateVar || elem.stateCode === stateCode});
                                if(statutoryInfo && statutoryInfo.length > 0){
                                    this.setState({selectedEntityStatutory:statutoryInfo})
                                }
                            }
                        })
                    }
                    console.log("selectedEntity = ",this.state.selectedEntity)
                    console.log("entityLocationArray = ",this.state.entityLocationArray)
                })
            })
            .catch((error) => {
                console.log("Error getEntityLocation() = ", error);
            })
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

    /*======= submit() =======*/
    submit(event) {
        event.preventDefault();
        console.log("condition = ",$('#ContractManagement').valid());
        if ($('#ContractManagement').valid()) {
            var formValues = {
                "contractID"        : this.props.match.params.contractID,
                "contractDate"      : this.state.contractDate,
                "effectiveUpto"     : this.state.effectiveUpto,
                "contractDuration"  : this.state.contractDuration,
                "companyId"         : this.state.companyId,
                "companyLocationId" : this.state.companyLocation,
                "entityType"        : this.state.entityType,
                "entityId"          : this.state.entity,
                "entityLocationId"  : this.state.entityLocation,                    
                "status"            : "New",
            }

            console.log("formValues",formValues);

            if (this.props.match.params.contractID) {
                axios.patch('/api/contract/patch', formValues)
                    .then((response) => {
                        console.log("update response = ",response)
                        this.setState({
                            "contractDate"           : moment(new Date()).format("YYYY-MM-DD"),
                            "contractDuration"       : 12,
                            "effectiveUpto"          : (moment(new Date()).add(12, 'M')).subtract(1, "days").format("YYYY-MM-DD"),
                            "company"                : "",
                            "companyLocation"        : "",
                            "entityType"             : "vendor",
                            "entity"                 : "",
                            "selectedEntityLocation" : [],
                            "selectedEntityStatutory" : [],
                            // "selectedCompanyStatutory" : [],
                        });

                        this.props.history.push("/package-details/" + this.props.match.params.contractID);
                        swal("Done!", "Contract Details Updated Successfully.");
                        
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
                        // document.getElementById("submitbtn").innerHTML = "Submit";
                    })
                    .catch((error) => {
                        console.log("Error Contract Patch() => ",error)
                        swal("Sorry...!", "Failed to Update Contract Details.");
                    })
            } else {
                axios.post('/api/contract/post', formValues)
                    .then((response) => {                           
                        if(response.data.message === 'DUPLICATE'){
                            swal("Oops!", "Contract between '" + this.state.company + "' and " + 
                                (this.state.selectedEntity.companyName ? "'" + this.state.selectedEntity.companyName + "'" : this.state.entityType) + 
                                " already exists for time period " + (response.data.contractDate ? "'" + moment(new Date(response.data.contractDate)).format("DD-MM-YYYY") + "'" : "") + 
                                " to " + (response.data.contractDate ? "'" + moment(new Date(response.data.effectiveUpto)).format("DD-MM-YYYY") + "'" : ""));
                        }else{
                            this.setState({
                                "contractDate"           : moment(new Date()).format("YYYY-MM-DD"),
                                "contractDuration"       : 12,
                                "effectiveUpto"          : (moment(new Date()).add(12, 'M')).subtract(1, "days").format("YYYY-MM-DD"),
                                "companyId"              : "",
                                "companyLocation"        : "",
                                "entityType"             : "vendor",
                                "entity"                 : "",
                                "entityLocation"         : "",
                            })

                            this.props.history.push("/package-details/" + response.data.contractID);
                            swal("Done!", "Contract Details Added Successfully.");
                        }                           
                    })
                    .catch((error) => {
                        swal("Sorry...!", "Failed to Add Contract Details.");
                        console.log("Error Contract Post() => ", error);
                    })
            }
        } else {
            $(event.target).parent().parent().find('.inputText.error:first').focus();
            $('select.error:first').focus();
            $('input.error:first').focus();
        }
    }

    /*======= edit() ========*/
    edit() {
        var contractID = this.state.contractID;
        console.log("edit() contractID = ",contractID);

        if (contractID) {
            axios.get('/api/contract/get/one/' + contractID)
            .then((response) => {
                console.log("edit response = ", response.data);
                document.getElementById("submitbtn").innerHTML = "Update";
                
                this.getCompany();                               
                
                // this.getEntityAndLocation(response.data.entityId, response.data.entityLocationId);
                // this.getSelectedEntityLocation(response.data.entityId, response.data.entityLocationId);
                // this.dropDownListObject.value = response.data.entityLocationId;
                
                this.setState({
                    "contractID"            : this.props.match.params.contractID,
                    "contractDuration"      : response.data.contractDuration,
                    "contractDate"          : moment(response.data.contractDate).format("YYYY-MM-DD"),
                    "effectiveUpto"         : moment(response.data.effectiveUpto).format("YYYY-MM-DD"),
                    // "company"               : response.data.companyId,
                    "companyLocation"       : response.data.companyLocationId,
                    "entityType"            : response.data.entityType,
                    "entity"                : response.data.entityId,
                    "entityLocation"        : response.data.entityLocationId,
                    "status"                : response.data.status,
                },()=>{ 
                    this.getEntity(); 
                    this.getEntityLocation(this.state.entity);
                    this.getSelectedEntityLocation(this.state.entityLocation); 
                    this.getCorpLocation(this.state.companyLocation);                 
                    this.getSingleEntity(this.state.entity, this.state.entityType);

                    console.log("this.state.entityLocation = ",this.state.entityLocation);
                    console.log("this.state.companyLocation = ",this.state.companyLocation);
                    console.log("status = ",this.state.status);
                    
                    // this.getSelectedEntityLocation(this.state.entityLocation);
                })               
            })
            .catch((error) => {
                console.log("Error edit() = ", error);
            })
        }       
    }

    /*======= getSingleEntity() =======*/
    getSingleEntity(entityId, entityType){
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

    /*======= handleEntity() ========*/
    handleEntity(event) {
        event.preventDefault();
        const name   = event.target.name;
        var value    = event.target.value;

        this.setState({
            [name]                 : event.target.value,
            entity                 : "--Select--",
            entityLocation         : "--Select Location--",
            selectedEntity         : {},
            selectedEntityLocation : [],
            selectedEntityLocArray : [],
            "selectedEntityStatutory" : [],
        }, () => {
            this.getEntity();
        })
        // this.dropDownListObject.value = null;
    }
    
    /*======= handleChange() ========*/
    handleChange(event) {
        event.preventDefault();
        const name = event.target.name;
        var value  = event.target.value;

        console.log("event Value = ", event.target.value)
        console.log("event Value = ", event.target.name)

        this.setState({
            [name]: event.target.value
        }, () => {
            if (this.state[name] === this.state.companyLocation && this.state.company) {
                this.getCorpLocation(this.state.companyLocation)
            } else if (this.state[name] === this.state.entity) {
                this.getSelectedEntityLocation(value, '');
                this.setState({
                    entityLocation : ''
                })
            } else if (this.state[name] === this.state.entityLocation && this.state.entity) {
                this.getSelectedEntityLocation(this.state.entityLocation)
            } else if (name === 'contractDate' && this.state.contractDuration !== "") {
                var contractDuration = this.state.contractDuration;
                console.log("contractDuration = ", this.state.contractDuration);
                this.setState({
                    "effectiveUpto"    : (moment(value).add(contractDuration, 'M')).subtract(1, "days").format("YYYY-MM-DD"),
                    "contractDuration" : contractDuration
                })
            } else if (name === 'contractDuration' && this.state.contractDate) {
                if(value === ""){
                    this.setState({
                        "effectiveUpto" : "",
                    })                    
                }else{
                    this.setState({
                        "effectiveUpto" : (moment(new Date(this.state.contractDate)).add(value, 'M')).subtract(1, "days").format("YYYY-MM-DD"),
                    })                    
                }
            } else if (name === 'effectiveUpto' && this.state.contractDuration !== "") {
                var contractDuration = this.state.contractDuration;
                this.setState({
                    "contractDate" : (moment(new Date(value)).subtract(contractDuration, 'M')).add(1, "days").format("YYYY-MM-DD"),
                    // "contractDuration": moment(value).diff(moment(this.state.contractDate), 'months', true),
                });
            }
        });
    }

    /*======= getCorpLocation() ========*/
    getCorpLocation(locationId) {
        this.setState({
            selectedCompanyStatutory:[],
            companyLocationArray: this.state.companyDetails.locations
        }, () => {
            if (this.state.companyLocationArray && this.state.companyLocationArray.length > 0) {
                var selectedCompanyLocation = this.state.companyLocationArray.filter((a) => a._id === locationId);
                if (selectedCompanyLocation && selectedCompanyLocation.length > 0) {
                    this.setState({
                        selectedCompanyLocation : selectedCompanyLocation[0]
                    }, ()=>{
                        var stateVar = this.state.selectedCompanyLocation.state;
                        var stateCode = this.state.selectedCompanyLocation.stateCode;
                        if(this.state.companyDetails && this.state.companyDetails.statutoryDetails && this.state.companyDetails.statutoryDetails.length > 0){
                            var statutoryInfo = this.state.companyDetails.statutoryDetails.filter((elem)=>{return elem.state===stateVar || elem.stateCode === stateCode});
                            if(statutoryInfo && statutoryInfo.length > 0){
                                this.setState({selectedCompanyStatutory:statutoryInfo})
                            }
                        }
                    })
                }else{
                    this.setState({
                        companyLocation         : "--Select Location--",
                        selectedCompanyLocation : []
                    }, ()=>{
                        console.log("companyLocation => ", this.state.companyLocation);
                        this.getCompany();
                    })
                }
            } else {
                this.setState({
                    selectedCompanyLocation : []
                })
            }
        })
    }

    /*======= getSelectedEntityLocation() ========*/
    getSelectedEntityLocation(locationId) {
        console.log("In getSelectedEntityLocation = ", locationId);
        console.log("entityLocationArray = ", (this.state.entityLocationArray));
        console.log("entityLocationArray length = ", (this.state.entityLocationArray.length));
        console.log("In getSelectedEntityLocation condition = ", (this.state.entityLocationArray && this.state.entityLocationArray.length > 0));
        
        if (this.state.entityLocationArray && this.state.entityLocationArray.length > 0) {
            var selectedEntityLocation = this.state.entityLocationArray.filter((a) => a._id === locationId);
            this.setState({
                selectedEntityStatutory:[],
                selectedEntityLocation: selectedEntityLocation[0]
            }, ()=>{
                console.log("selectedEntityLocation = ", this.state.selectedEntityLocation);
                var stateVar = this.state.selectedEntityLocation.state;
                var stateCode = this.state.selectedEntityLocation.stateCode;
                if(this.state.selectedEntity && this.state.selectedEntity.statutoryDetails && this.state.selectedEntity.statutoryDetails.length > 0){
                    var statutoryInfo = this.state.selectedEntity.statutoryDetails.filter((elem)=>{return elem.state===stateVar || elem.stateCode === stateCode});
                    if(statutoryInfo && statutoryInfo.length > 0){
                        this.setState({selectedEntityStatutory:statutoryInfo})
                    }
                }
            })
        } else {
            this.setState({
                selectedEntityLocation: []
            })
        }        
    }

    /*======= handleOptionChange() ========*/
    handleOptionChange(event) {
        const target = event.target;
        const name   = target.name;

        this.setState({
            [name]: event.target.value
        });
    }

    /*======= getEntityAndLocation() ========*/
    getEntityAndLocation(entityId, entityLocationId){
        axios.get('/api/entitymaster/get/one/' + entityId)
            .then((response) => {
                var entityLocArray = response.data[0].locations.map((a, i) => {
                    return ({
                        text  : a.city + ", " + a.district + " " + a.stateCode + " - " + a.countryCode,
                        value : a._id
                    });
                })
                this.setState({
                    selectedEntity      : response.data[0],
                    entityLocationArray : response.data[0].locations,
                    entityLocArray      : entityLocArray,
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
    
    /*======= handleChangeRoles() ========*/
    handleChangeRoles(event) {
        this.setState({
            selectedEntityLocation: event.value
            // selectedEntityLocation: event.target.value
        }, () => {
            var selectedEntityLocArray =  this.state.entityLocationArray.filter((a)=> (this.state.selectedEntityLocation ? this.state.selectedEntityLocation.includes(a._id) : null));
            this.setState({
                selectedEntityLocArray : selectedEntityLocArray
            })
            console.log("selectedEntityLocation = ", this.state.selectedEntityLocation);
        })
    }

    /*======= keyPressNumber() ========*/
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

    /*======= render() ========*/
    render() {
        const fields: object = { text: 'text', value: 'value' };
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
                                        <li className="active col-lg-3 col-md-2 col-sm-12 col-xs-12 transactionTab pdcls pdclsOne btn1 NOpadding-left">
                                            <a href={this.props.match.params.contractID ? "/contract-management/"+this.props.match.params.contractID : ""} className="basic-info-pillss pills backcolor">
                                                <i className="fa fa-file" aria-hidden="true"></i> &nbsp;
                                                Contract
                                            </a>
                                            <div className="trianglethree triangleones forActive" id="triangle-right"></div>
                                        </li>
                                        <li className="col-lg-3 col-md-2 col-sm-12 col-xs-12 transactionTab pdcls pdclsOne btn1 disabled" style={{"cursor" : this.props.match.params.contractID ? "pointer"  : "not-allowed"}}>
                                            <div className="triangletwo" id="triangle-right1"></div>
                                            <a href={this.props.match.params.contractID ? "/package-details/"+this.props.match.params.contractID : "javascript:void(0);"} className="basic-info-pillss backcolor" style={{"cursor" : this.props.match.params.contractID ? "pointer"  : "not-allowed"}}>
                                                <i className="fa fa-archive iconMarginLeft" aria-hidden="true"></i> &nbsp;
                                                Packages
                                            </a>
                                            <div className="triangleone " id="triangle-right"></div>
                                        </li>

                                        <li className=" col-lg-3 col-md-2 col-sm-12 col-xs-12 transactionTab pdcls pdclsOne btn1 disabled">
                                            <div className="triangletwo" id="triangle-right1"></div>
                                            <a href={this.props.match.params.contractID ? "/condition/"+this.props.match.params.contractID : "javascript:void(0);"} className="basic-info-pillss pills backcolor" style={{"cursor" : this.props.match.params.contractID ? "pointer"  : "not-allowed"}}>
                                                <i className="fa fa-paste iconMarginLeft" aria-hidden="true"></i>&nbsp;
                                                Conditions
                                            </a>
                                            <div className="triangleone " id="triangle-right"></div>
                                        </li>
                                        <li className="col-lg-3 col-md-2 col-sm-12 col-xs-12 transactionTab noRightPadding pdcls btn4 disabled">
                                            <div className="trianglesix" id="triangle-right2"></div>
                                            <a href={this.props.match.params.contractID ? "/viewcontract/"+this.props.match.params.contractID : "javascript:void(0);"} className="basic-info-pillss backcolor" style={{"cursor" : this.props.match.params.contractID ? "pointer"  : "not-allowed"}}>
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
                                                    <h4 className="MasterBudgetTitle"><i className="fa fa-file" aria-hidden="true"></i> Contract Details</h4>
                                                </div>
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 formHrTag"></div>
                                            </div>
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
                                                                        <input max="2099-12-31" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12 inputText" type="date" ref="contractDate" name="contractDate" id="contractDate" value={this.state.contractDate} onChange={this.handleChange} />
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
                                                                            <option selected={true} disabled={true}>--Select--</option>
                                                                            <option value="vendor">Vendor</option>
                                                                            <option value="corporate">Corporate</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                    <div className="form-margin col-lg-6 col-md-6 col-sm-6 col-xs-6 NOpadding right-border">                                                                        
                                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                            <h5 className="weighttitle party-title">Company Details</h5>
                                                                        </div>
                                                                        <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12" >
                                                                                <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Company <sup className="astrick">*</sup></label>
                                                                                <input disabled className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12 inputText" type="text" ref="company" name="company" id="company" value={this.state.company} onChange={this.handleChange} />
                                                                            </div>
                                                                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12" >
                                                                                <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Company Location <sup className="astrick">*</sup></label>
                                                                                <select id="companyLocation" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.companyLocation} ref="companyLocation" name="companyLocation" onChange={this.handleChange.bind(this)}>
                                                                                    <option selected={true} disabled={true}>--Select Location--</option>
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
                                                                        </div>
                                                                        <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                                                            {this.state.companyDetails 
                                                                                ?
                                                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 detailBox marbtm30">
                                                                                        <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 detailBoxImg">
                                                                                            <img src={this.state.companyDetails.companyLogo && this.state.companyDetails.companyLogo.length > 0?this.state.companyDetails.companyLogo : "/images/noImagePreview.png"} className=""></img>
                                                                                        </div>
                                                                                        <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12">
                                                                                            <h5 className="detailtitle">{this.state.companyDetails.companyName}</h5>
                                                                                            <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                                                <li><i className="fa fa-user-circle-o listIcon"></i>   {this.state.companyDetails.groupName ? this.state.companyDetails.groupName : <span className="notAvailablemsg"> Not Available </span>}</li>
                                                                                                <li><i className="fa fa-globe globe-ico listIcon"></i> {this.state.companyDetails.website ? this.state.companyDetails.website : <span className="notAvailablemsg"> Not Available </span>}</li>
                                                                                                <li><i className="fa fa-envelope listIcon"></i> {this.state.companyDetails.companyEmail ? this.state.companyDetails.companyEmail : <span className="notAvailablemsg"> Not Available </span>}</li>
                                                                                                <li><span className="listItem">CIN : </span>{this.state.companyDetails.CIN ? this.state.companyDetails.CIN : <span className="notAvailablemsg"> Not Available </span>}</li>
                                                                                                <li><span className="listItem">TAN : </span>{this.state.companyDetails.TAN ? this.state.companyDetails.TAN : <span className="notAvailablemsg"> Not Available </span>}</li>
                                                                                                {this.state.selectedCompanyStatutory && this.state.selectedCompanyStatutory.length > 0
                                                                                                    ?
                                                                                                        <li><span className="listItem">PAN : </span>{this.state.selectedCompanyStatutory[0].PAN ? this.state.selectedCompanyStatutory[0].PAN : <span className="notAvailablemsg"> Not Available </span>}</li> 
                                                                                                    :
                                                                                                        null
                                                                                                }
                                                                                                {this.state.selectedCompanyStatutory && this.state.selectedCompanyStatutory.length > 0
                                                                                                    ?
                                                                                                        <li><span className="listItem">GSTIN : </span>{this.state.selectedCompanyStatutory[0].GSTIN ? this.state.selectedCompanyStatutory[0].GSTIN : <span className="notAvailablemsg"> Not Available </span>}</li> 
                                                                                                    :
                                                                                                        null
                                                                                                }
                                                                                                {this.state.selectedCompanyLocation && this.state.selectedCompanyLocation.locationType 
                                                                                                    ?
                                                                                                    <li><i className="fa fa-map-marker address-ico listIcon"></i> &nbsp;
                                                                                                        {this.state.selectedCompanyLocation.locationType + " - "}
                                                                                                        {this.state.selectedCompanyLocation.addressLine2 ? this.state.selectedCompanyLocation.addressLine2 + ", " : ""} 
                                                                                                        {this.state.selectedCompanyLocation.addressLine1 ? this.state.selectedCompanyLocation.addressLine1 + ", " : ""}
                                                                                                        {this.state.selectedCompanyLocation.area ? this.state.selectedCompanyLocation.area + ", " : ""} 
                                                                                                        {this.state.selectedCompanyLocation.city ? this.state.selectedCompanyLocation.city + ", " : ""}
                                                                                                        {this.state.selectedCompanyLocation.district ? this.state.selectedCompanyLocation.district + ", " : ""} 
                                                                                                        {this.state.selectedCompanyLocation.state ? this.state.selectedCompanyLocation.state + ", " : ""} 
                                                                                                        {this.state.selectedCompanyLocation.country ? this.state.selectedCompanyLocation.country : ""}
                                                                                                        {this.state.selectedCompanyLocation.pincode ? " - " + this.state.selectedCompanyLocation.pincode : ""}
                                                                                                    </li>
                                                                                                    :
                                                                                                    null
                                                                                                }
                                                                                            </ul>
                                                                                        </div>
                                                                                    </div>
                                                                                :
                                                                                    null                                                                           
                                                                            }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-margin col-lg-6 col-md-6 col-sm-6 col-xs-6 NOpadding">                                                                       
                                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                            <h5 className="weighttitle party-title">Vendor / Corporate Details</h5>
                                                                        </div>
                                                                        <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12" >
                                                                                <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 capitalize">{this.state.entityType ? this.state.entityType : "Entity"} <sup className="astrick">*</sup></label>
                                                                                
                                                                                <select id="entity" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.entity} ref="entity" name="entity" onChange={this.selectEntity.bind(this)}>
                                                                                    <option selected={true} disabled={true}>--Select--</option>
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
                                                                            <div className="col-lg-6 col-md-6 col-xs-12 col-sm-12 multiselect">
                                                                                <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 capitalize">{this.state.entityType ? this.state.entityType : "Entity"} Location <sup className="astrick">*</sup></label>
                                                                                <select id="entityLocation" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.entityLocation} ref="entityLocation" name="entityLocation" onChange={this.handleChange.bind(this)}>
                                                                                    <option selected={true} disabled={true}>--Select Location--</option>
                                                                                    {
                                                                                        this.state.entityLocationArray && this.state.entityLocationArray.length > 0 ?
                                                                                            this.state.entityLocationArray.map((data, i) => {
                                                                                                return (
                                                                                                    <option key={i} value={data._id}>{((data.locationType).match(/\b(\w)/g)).join('')} - {data.area} {data.city}, {data.stateCode} - {(data.countryCode)}  </option>
                                                                                                );
                                                                                            })
                                                                                            :
                                                                                            null
                                                                                    }
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                            {
                                                                                this.state.selectedEntity.companyName ?
                                                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 detailBox marbtm30">
                                                                                        <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 detailBoxImg">
                                                                                            <img src={this.state.selectedEntity.companyLogo && this.state.selectedEntity.companyLogo.length > 0?this.state.selectedEntity.companyLogo : "/images/noImagePreview.png"} className=""></img>
                                                                                        </div>
                                                                                        <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12">
                                                                                            <h5 className="detailtitle">{this.state.selectedEntity.companyName}</h5>
                                                                                            <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                                                <li><i className="fa fa-user-circle-o listIcon"></i>   {this.state.selectedEntity.groupName ? this.state.selectedEntity.groupName : <span className="notAvailablemsg"> Not Available </span>} </li>
                                                                                                <li><i className="fa fa-globe globe-ico listIcon"></i>     {this.state.selectedEntity.website ? this.state.selectedEntity.website : <span className="notAvailablemsg"> Not Available </span>} </li>
                                                                                                <li><i className="fa fa-envelope listIcon"></i> {this.state.selectedEntity.companyEmail ? this.state.selectedEntity.companyEmail : <span className="notAvailablemsg"> Not Available </span>} </li>
                                                                                                <li><span className="listItem">CIN : </span>{this.state.selectedEntity.CIN ? this.state.selectedEntity.CIN : <span className="notAvailablemsg"> Not Available </span>}</li>
                                                                                                <li><span className="listItem">TAN : </span>{this.state.selectedEntity.TAN ? this.state.selectedEntity.TAN : <span className="notAvailablemsg"> Not Available </span>}</li>
                                                                                                {this.state.selectedEntityStatutory && this.state.selectedEntityStatutory.length > 0
                                                                                                    ?
                                                                                                        <li><span className="listItem">PAN : </span>{this.state.selectedEntityStatutory[0].PAN ? this.state.selectedEntityStatutory[0].PAN : <span className="notAvailablemsg"> Not Available </span>}</li> 
                                                                                                    :
                                                                                                        null
                                                                                                }
                                                                                                {this.state.selectedEntityStatutory && this.state.selectedEntityStatutory.length > 0
                                                                                                    ?
                                                                                                        <li><span className="listItem">GSTIN : </span>{this.state.selectedEntityStatutory[0].GSTIN ? this.state.selectedEntityStatutory[0].GSTIN : <span className="notAvailablemsg"> Not Available </span>}</li> 
                                                                                                    :
                                                                                                        null
                                                                                                }
                                                                                                {this.state.selectedEntityLocation && this.state.selectedEntityLocation.locationType 
                                                                                                    ?
                                                                                                    <li><i className="fa fa-map-marker address-ico listIcon"></i> &nbsp;
                                                                                                        {this.state.selectedEntityLocation.locationType + " - "}
                                                                                                        {this.state.selectedEntityLocation.addressLine2 ? this.state.selectedEntityLocation.addressLine2 + ", " : ""} 
                                                                                                        {this.state.selectedEntityLocation.addressLine1 ? this.state.selectedEntityLocation.addressLine1 + ", " : ""}
                                                                                                        {this.state.selectedEntityLocation.area ? this.state.selectedEntityLocation.area + ", " : ""} 
                                                                                                        {this.state.selectedEntityLocation.city ? this.state.selectedEntityLocation.city + ", " : ""}
                                                                                                        {this.state.selectedEntityLocation.district ? this.state.selectedEntityLocation.district + ", " : ""} 
                                                                                                        {this.state.selectedEntityLocation.state ? this.state.selectedEntityLocation.state + ", " : ""} 
                                                                                                        {this.state.selectedEntityLocation.country ? this.state.selectedEntityLocation.country : ""}  
                                                                                                        {this.state.selectedEntityLocation.pincode ? " - "+this.state.selectedEntityLocation.pincode : ""}
                                                                                                    </li>
                                                                                                    :
                                                                                                    null
                                                                                                }
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