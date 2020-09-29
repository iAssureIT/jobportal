import React, { Component } from 'react';
import $                    from 'jquery';
import jQuery               from 'jquery';
import axios                from 'axios';
import swal                 from 'sweetalert';
import _                    from 'underscore';
import moment               from 'moment';
import CityClassification   from '../CityClassificationTable/CityClassificationTable.js';
import 'bootstrap/js/tab.js';
import 'react-phone-input-2/lib/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/modal.js';
import './Package.css';

class Package extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "pathname"                  : this.props.match.params.entity,
            "openForm"                  : false,
            "packageArray"              : [],
            "packages"                  : [],
            "selectedPackages"          : [],
            "packageList"               : [], 
            "uniquePackageNames"        : [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.timeChange   = this.timeChange.bind(this);
        this.submit       = this.submit.bind(this);
    }
    /*======= componentDidMount() =======*/
    componentDidMount() {
        const user_ID = localStorage.getItem("user_ID");
        if(this.state.packageEntity){
            this.getPackages(this.state.packageEntity);
        } 
        
        this.getPackageDetails();
        this.getEarlyMorningTimings();
        this.getNightTimings();
        this.getContract(this.props.match.params.contractID);

        var contractID = this.props.match.params.contractID;
        this.setState({
            contractID : this.props.match.params.contractID,
            user_ID    : user_ID
        }, () => {
            this.edit();
            this.getUserData();
        })
        window.scrollTo(0, 0);       
    }
    /*======= validation() =======*/
    validation(){
        jQuery.validator.setDefaults({
            debug   : true,
            success : "valid"
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
            },
        });
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
    /*======= componentWillUnmount() =======*/
    componentWillUnmount() {
        $("script[src='/js/adminLte.js']").remove();
        $("link[href='/css/dashboard.css']").remove();
    }
    /*======= handleChange() =======*/
    handleChange(event) {
        event.preventDefault();
        var index = 0;
        var name  = event.target.name;

        if(name.search("-") > -1){
            var nameArr = name.split("-");
            name        = nameArr[0];
            index       = nameArr[1];
        }

        var selectedPackages = this.state.selectedPackages; 
        var pkgObj           = selectedPackages[index];
        pkgObj[name]         = event.target.value;

        this.setState({
            selectedPackages : selectedPackages,  
        },()=>{
            this.state.selectedPackages.map((a, i)=>{
                if(document.getElementById(a.packageNameId + "-" + a.carCategoryId)){                
                    return (
                        document.getElementById(a.packageNameId + "-" + a.carCategoryId).checked= true
                    );
                }
            }) 
        });
    }
    /*======= timeChange() =======*/
    timeChange(event){
        event.preventDefault();
        const name = event.target.name;

        this.setState({
            [name]: event.target.value
        }, () => {
            this.validation();
            if(this.state.selectedPackages.length >0){
                this.state.selectedPackages.map((a, i)=>{
                    if(document.getElementById(a.packageNameId + "-" + a.carCategoryId)){                
                        return (
                            document.getElementById(a.packageNameId + "-" + a.carCategoryId).checked= true
                        );
                    }
                })
            }
        })        
    }
    /*======= edit() =======*/
    edit() {
        var contractID = this.props.match.params.contractID;
        var packageID  = this.props.match.params.packageID;

        if (contractID && this.state.packages.length>0) {
            this.setState({
                "openForm"   : true,
            })

            axios.get('/api/contract/get/one/' + contractID)
            .then((response) => {
                // console.log("edit() Response = ",response.data.packages);
                document.getElementById("submitbtn").innerHTML = "Update";

                var packageDetail    = response.data.packages;
                var selectedPackages = this.state.selectedPackages;

                this.setState({              
                    selectedPackages    : packageDetail,
                }, ()=>{ 
                    if(this.state.selectedPackages.length >0){
                        this.findUnique(this.state.selectedPackages, d => (d.packageNameId + "-" + d.carCategoryId)).map((a, i)=>{                                            
                            if(document.getElementById(a.packageNameId + "-" + a.carCategoryId)){ 
                                return (                                    
                                    document.getElementById(a.packageNameId + "-" + a.carCategoryId).checked= true                                     
                                );
                            }
                        }, ()=>{/*console.log("edit() selected Packages",this.state.selectedPackages );*/})
                    }                        
                }) 
            })
            .catch((error) => {
                console.log("edit() error : ",error);
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
    /*======= getPackages() =======*/
    getPackages(packageEntity){
        axios.get("/api/packagemaster/get/grouped/list/"+packageEntity)
        .then((response)=>{
            var packagesData = response.data;
            // console.log("getPackages() packageData = ",packagesData);

            if(packagesData && packagesData.length >0){
                for (var i = 0; i < packagesData.length; i++) {
                    var packageCategory = packagesData[i].packagesData

                    for (var j = 0; j < packageCategory.length; j++) {
                        const newPack = packageCategory[j].packages;
                        var result    = this.findUnique(newPack, d => d.packageName);
                        packageCategory[j].packages = result.sort((a, b) => (a.packageName > b.packageName) ? 1 : -1);
                    }                    
                }                
            }
            this.setState({
                "packageArray" : packagesData
            }, ()=>{
                console.log("packageArray = ", this.state.packageArray);
            })
        })
        .catch((error)=>{
            console.log("getPackages() error : ",error);
        })
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
                    this.edit();
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
                this.edit();
              })
            })
            .catch((error)=>{
              console.log("Error getEntityUsersData() = ", error);
            })
        }
    }
    /*======= getEntity() =======*/
    getEntity(entityId, entityType){
        axios.get("/api/entitymaster/get/one/"+entityId)
            .then((response)=>{
                this.setState({
                    entityCompanyID : response.data[0].companyID
                }, ()=>{
                    this.getEntityUsersData(this.state.entityCompanyID, entityType, entityId);
                })
            })
            .catch((error)=>{
                console.log("Error getEntity() = ", error);
            })
    }
    /*======= getContract() =======*/
    getContract(contractID){
        axios.get("/api/contract/get/one/"+contractID)
        .then((response)=>{
            this.setState({
                "contractData"  : response.data
            }, ()=>{
                this.getEntity(this.state.contractData.entityId, this.state.contractData.entityType);
                // console.log("Contract Data = ", this.state.contractData);
                if(this.state.contractData.entityType.toLowerCase() === "corporate"){
                    this.setState({
                        packageEntity : "CorporatePackage"
                    }, ()=>{
                        this.getPackages(this.state.packageEntity);
                    })
                }else{
                    this.setState({
                        packageEntity : "VendorPackage"
                    }, ()=>{
                        this.getPackages(this.state.packageEntity);
                    })
                }
                if(this.state.contractData){
                    var packageData = this.state.contractData.packages;

                    this.setState({
                        packages                    : packageData,
                        earlyMorningChargesFromTime : this.state.contractData.earlyMorningChargesFromTime ? this.state.contractData.earlyMorningChargesFromTime : this.state.earlyMorningChargesFromTime,
                        earlyMorningChargesToTime   : this.state.contractData.earlyMorningChargesToTime ? this.state.contractData.earlyMorningChargesToTime : this.state.earlyMorningChargesToTime,
                        nightChargesFromTime        : this.state.contractData.nightChargesFromTime ? this.state.contractData.nightChargesFromTime : this.state.nightChargesFromTime,
                        nightChargesToTime          : this.state.contractData.nightChargesToTime ? this.state.contractData.nightChargesToTime : this.state.nightChargesToTime,
                    }, ()=>{
                        if(this.state.packages.length >0){
                            this.edit();
                        }                        
                    })
                }
            })
        })
        .catch((error)=>{
            console.log("getContract() error : ",error);
        })
    }
    /*======= getSelectedPackages() =======*/
    getSelectedPackages(packageNameID, packageTypeID, packageEntity, categoryId){

        console.log("packageNameID = ",packageNameID);
        var formValues = {
            packageNameID : packageNameID,
            packageTypeID : packageTypeID,
            packageEntity : packageEntity,
            categoryId    : categoryId
        }
        axios.post("/api/packagemaster/get/list/selected/",formValues)
        .then((response)=>{
            console.log("Response getSelectedPackage = ", response.data);
            var selectedPackages = this.state.selectedPackages;

            if(response.data.length >0){
                for (var i = 0; i < response.data.length; i++) {
                    var selectedPackages = this.state.selectedPackages;

                    selectedPackages.push({
                            packageID           : response.data[i]._id,
                            packageName         : response.data[i].packageName.packageName,
                            packageNameId       : response.data[i].packageNameId,
                            packageType         : response.data[i].packageType.packageType,
                            packageTypeId       : response.data[i].packageTypeId,
                            cityClass           : response.data[i].cityType.cityType,
                            cityClassId         : response.data[i].cityTypeId,
                            carCategory         : response.data[i].carCategory.category,
                            carCategoryId       : response.data[i].categoryId,
                            categoryCreatedAt   : response.data[i].carCategory.createdAt,
                            packageEntity       : response.data[i].packageEntity,
                            maxHours            : response.data[i].minHours,
                            maxKm               : response.data[i].minKm,
                            extraHr             : response.data[i].extraHrCharges,
                            extraKms            : response.data[i].extraKmsCharges,
                            fixCharges          : response.data[i].fixCharges,
                            way                 : response.data[i].way,
                            driverAllowance     : response.data[i].driverAllow,
                            nightHalt           : response.data[i].nightHalt,
                            nightCharges        : response.data[i].nightCharges,
                            morningCharges      : response.data[i].morningCharges,
                    });

                    this.setState({
                        selectedPackages : selectedPackages,
                        checkBoxError    : ""
                    }, ()=>{
                        this.state.selectedPackages.map((a, i)=>{
                            if(document.getElementById(a.packageNameId+"-"+a.carCategoryId)){                         
                                return (
                                    document.getElementById(a.packageNameId+"-"+a.carCategoryId).checked= true
                                );
                            }
                        }, ()=>{ /*console.log("selectedPackages = ",this.state.selectedPackages)*/ })
                    })
                }
            }
        })
        .catch((error)=>{
            console.log("getSinglePackage() error : ",error);
        })
    }
    /*======= submit() =======*/
    submit(event) {
        event.preventDefault(); 
        var selectedPackages = this.state.selectedPackages;
        var packages         = [];

        if(selectedPackages && selectedPackages.length > 0){
            for(var i=0; i<selectedPackages.length; i++){ 
                packages.push({
                    packageID           : selectedPackages[i].packageID,
                    packageName         : selectedPackages[i].packageName,
                    packageNameId       : selectedPackages[i].packageNameId,
                    packageType         : selectedPackages[i].packageType,
                    packageTypeId       : selectedPackages[i].packageTypeId,
                    cityClass           : selectedPackages[i].cityClass,
                    cityClassId         : selectedPackages[i].cityClassId,
                    carCategory         : selectedPackages[i].carCategory,
                    carCategoryId       : selectedPackages[i].carCategoryId,
                    categoryCreatedAt   : selectedPackages[i].categoryCreatedAt,
                    packageEntity       : selectedPackages[i].packageEntity,
                    maxHours            : selectedPackages[i].maxHours,
                    maxKm               : selectedPackages[i].maxKm,
                    extraHr             : selectedPackages[i].extraHr,
                    extraKms            : selectedPackages[i].extraKms,
                    fixCharges          : selectedPackages[i].fixCharges,
                    way                 : selectedPackages[i].way,
                    driverAllowance     : selectedPackages[i].driverAllowance,
                    nightHalt           : selectedPackages[i].nightHalt,
                    nightCharges        : selectedPackages[i].nightCharges,
                    morningCharges      : selectedPackages[i].morningCharges,
                })            
            }

            var formValues = {
                contractID                  : this.props.match.params.contractID,
                packageID                   : this.props.match.params.packageID,
                packages                    : packages,
                earlyMorningChargesFromTime : this.state.earlyMorningChargesFromTime,
                earlyMorningChargesToTime   : this.state.earlyMorningChargesToTime,
                nightChargesFromTime        : this.state.nightChargesFromTime,
                nightChargesToTime          : this.state.nightChargesToTime,
            }

            console.log("Valid = ",($("#PackageManagement").valid()));
            var contractID = this.props.match.params.contractID;

            if($("#PackageManagement").valid()){
                if(contractID && this.state.packages.length > 0){
                    console.log("Update formValues = ", formValues);

                    axios.patch("/api/contract/patch/updatepackage", formValues)
                    .then((response)=>{
                        if(response.data.updated){
                            this.props.history.push("/condition/"+this.props.match.params.contractID);
                            swal("Done!", "Package Details Updated Successfully.");

                            if (this.state.contractData.entityType.toLowerCase() === "vendor") {
                                var sendData = {
                                  "event"           : "Event33", 
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
                                  "event"           : "Event33", 
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

                            console.log('Notification sendData ==> ', sendData);

                            if(this.state.contractData.status.toLowerCase() === "approved" || this.state.contractData.status.toLowerCase() === "party-2 signed"){
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
                        swal("Sorry...!", "Something Went Wrong, Failed to Update Packages.");
                        console.log("Update Error => ",error);
                    })
                }else{
                    if(contractID && this.state.selectedPackages.length > 0){
                        console.log("Submit formValues = ", formValues);

                        axios.patch("/api/contract/patch/addpackage", formValues)
                        .then((response)=>{
                            console.log("Submit Response = ", response);

                            if(response.data.updated){
                                this.props.history.push("/condition/" + this.props.match.params.contractID);
                                swal("Done!", "Package details added successfully.");
                            }
                        })
                        .catch((error)=>{
                            swal("Sorry...!", "Something Went Wrong, Failed to submit Packages.");
                            console.log("Submit Error => ",error);
                        });
                    }else{
                        this.setState({
                            checkBoxError : "Please select at least one package."
                        });
                    }
                }
            }else{
                this.setState({
                    checkBoxError : "Please select at least one package."
                }, ()=>{
                    $('#error').focus();
                });
            }
        }
    }
    
    /*======= selectedPackages() =======*/
    selectedPackages(event){
        // event.preventDefault();
        var check     = event.target.checked;
        var name      = event.target.name;
        var id        = event.target.id;
        var value     = event.target.value;

        console.log("check = ",check);
        console.log("id = ",id);

        var packageTypeId    = value.split("|")[1];
        var packageNameId    = id.split("-")[0];
        var categoryId       = id.split("-")[1];

        this.setState({
            [event.target.name] : this.state[event.target.name]
        },()=>{           
            if(check === true){
                this.getSelectedPackages(packageNameId, packageTypeId, this.state.packageEntity, categoryId);                   
            }else{
                var selectedPackages = this.state.selectedPackages;
                if (selectedPackages && selectedPackages.length > 0) {
                    console.log("splice elements => ",selectedPackages.filter(x => x.packageNameId === packageNameId && x.packageTypeId === packageTypeId && x.packageEntity === this.state.packageEntity && x.carCategoryId === categoryId));
                    selectedPackages.filter(x => x.packageNameId === packageNameId && x.packageTypeId === packageTypeId && x.packageEntity === this.state.packageEntity && x.carCategoryId === categoryId).forEach(x => selectedPackages.splice(selectedPackages.indexOf(x), 1));
                    // for (var i = selectedPackages.length - 1; i >= 0; --i) {
                    //     // console.log("index = ", selectedPackages.findIndex(x => x.packageNameId === id && x.packageTypeId === packageTypeId && x.packageEntity === this.state.packageEntity))
                    //     var index = selectedPackages.findIndex(x => x.packageNameId === packageNameId && x.packageTypeId === packageTypeId && x.packageEntity === this.state.packageEntity && x.carCategoryId === categoryId);
                    //     if(index < 0){
                    //         console.log("Wrong array index");
                    //     }else{                                         
                    //         selectedPackages.splice(index, 1);                                              
                    //     }  
                    // }
                    this.setState({
                        selectedPackages : selectedPackages,
                    },()=>{
                        this.state.selectedPackages.map((a, i)=>{              
                            if(document.getElementById(a.packageNameId+"-"+a.carCategoryId)){
                                return (
                                    document.getElementById(a.packageNameId+"-"+a.carCategoryId).checked= true
                                );
                            }
                        })
                    })
                }else{
                    this.setState({
                        checkBoxError : "Please select at least one package."
                    })
                }
            }
            // console.log("packages length = ",this.state.selectedPackages.length)
            // this.setState({
            //     checkBoxError : this.state.selectedPackages.length > 0 ? "" : "Please select at least one package."
            // }) 
        })
    }
    /*======= getEarlyMorningTimings() =======*/
    getEarlyMorningTimings(){
        axios.get("/api/earlymorningtimingsmaster/get")
        .then((response)=>{            
            this.setState({
                earlyMorningChargesFromTime  : response.data[0].earlyMorningChargesFromTime,
                earlyMorningChargesToTime    : response.data[0].earlyMorningChargesToTime
            })
        })
        .catch((error)=>{
            console.log("getEarlyMorningTimings() error : ",error);
        })
    }
    /*======= getNightTimings() =======*/
    getNightTimings(){
        axios.get("/api/nighttimingsmaster/get")
        .then((response)=>{        
            this.setState({
                nightChargesFromTime  : response.data[0].nightChargesFromTime,
                nightChargesToTime    : response.data[0].nightChargesToTime
            })
        })
        .catch((error)=>{ /*console.log("getNightTimings() error : ",error);*/ })
    }
    /*======= getPackageDetails() =======*/
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
        .catch((error)=>{ /*console.log("getPackageDetails() error : ",error);*/  })
    } 
    /*======= packageLength() =======*/   
    packageLength(contractID){
        return new Promise(function(resolve, reject){
            axios.get('/api/contract/get/one/'+contractID)
            .then((response) => {
                resolve(response.data.packages.length);
            })
            .catch((error) => {
                console.log('Error packageLength() => ', error);
            })
        })
    }
    /*======= back() =======*/
    async back(event) {
        event.preventDefault();
		var contractID    = this.props.match.params.contractID;
        var packageLength = await this.packageLength(contractID);

        if(packageLength > 0){
    		if (this.state.selectedPackages.length > 0 || this.state.nightChargesFromTime || this.state.nightChargesToTime || this.state.earlyMorningChargesFromTime || this.state.earlyMorningChargesToTime) {
    			swal({
    				title   : 'Alert!',
    				text    : "It seems that you are trying to add a package details. Click 'Cancel' to continue adding package details. Click 'Ok' to go to previous page. But you may lose data if already entered in the form.",
    				buttons : {
    					cancel : {
    						text      : "Cancel",
    						value     : false,
    						visible   : true,
    						className : "CancelButtonSwal"
    					},
    					confirm : {
    						text       : "OK",
    						value      : true,
    						visible    : true,
    						className  : "OkButtonSwal",
    						closeModal : true
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
                        if(this.state.selectedPackages && this.state.selectedPackages.length > 0){
                            this.state.selectedPackages.map((a, i)=>{                      
                                if(document.getElementById(a.packageNameId + "-" + a.carCategoryId)){
                                    return (
                                        document.getElementById(a.packageNameId + "-" + a.carCategoryId).checked= true
                                    );
                                }
                            }, ()=>{
                                this.props.history.push("/package-details/" + contractID);
                            }) 
                        }else{
                            this.props.history.push("/package-details/" + contractID);
                        }
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
        }else{
            swal("Oops!", "Please add Package Details first.");
        }
    }
    /*======= next() =======*/
    async next(event) {
		event.preventDefault();
        var contractID    = this.props.match.params.contractID;
        var packageLength = await this.packageLength(contractID);
        console.log('packageLength', packageLength);

        if(packageLength > 0){
            if (this.state.selectedPackages.length > 0 || this.state.nightChargesFromTime || this.state.nightChargesToTime || this.state.earlyMorningChargesFromTime || this.state.earlyMorningChargesToTime) {
                swal({
                    title  : 'Alert!',
                    text   : "It seems that you are trying to add a package details. Click 'Cancel' to continue adding package details. Click 'Ok' to go to next page. But you may lose data if already entered in the form.",
                    buttons: {
                        cancel : {
                            text        : "Cancel",
                            value       : false,
                            visible     : true,
                            className   : "CancelButtonSwal"
                        },
                        confirm : {
                            text        : "OK",
                            value       : true,
                            visible     : true,
                            className   : "OkButtonSwal",
                            closeModal  : true
                        }
                    },
                })
                .then((value) => {
                    if(value){
                        this.props.history.push("/condition/" + contractID);
                    }else{
                        if(this.state.selectedPackages && this.state.selectedPackages.length > 0){
                            this.state.selectedPackages.map((a, i)=>{                      
                                if(document.getElementById(a.packageNameId + "-" + a.carCategoryId)){
                                    return (
                                        document.getElementById(a.packageNameId + "-" + a.carCategoryId).checked= true
                                    );
                                }
                            }, ()=>{
                                this.props.history.push("/package-details/" + contractID);
                            }) 
                        }else{
                            this.props.history.push("/package-details/" + contractID);
                        }                        
                    }
                })
                $(".OkButtonSwal").parents('.swal-button-container').addClass('postionSwalRight');
                $(".CancelButtonSwal").parents('.swal-button-container').addClass('postionSwalLeft');
    
            } else {
                this.props.history.push("/condition/" + contractID);
            }
        }else{
            swal("Oops!", "Please add Package Details first.");
        }
    }
    /*======= openForm() =======*/
    openForm() {
		this.setState({
			openForm: this.state.openForm === false ? true : false
		},()=>{
            if(this.state.openForm === true){
                this.validation();
                if(this.state.selectedPackages && this.state.selectedPackages.length > 0){
                    this.state.selectedPackages.map((a, i)=>{                      
                        if(document.getElementById(a.packageNameId + "-" + a.carCategoryId)){
                            return (
                                document.getElementById(a.packageNameId + "-" + a.carCategoryId).checked= true
                            );
                        }
                    }, ()=>{
                    }) 
                }
            }            
        })
	}
    /*======= render() =======*/
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
                                        <li className=" col-lg-3 col-md-2 col-sm-12 col-xs-12 transactionTab pdcls pdclsOne btn1 NOpadding-left disabled">
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
                                            <a href={this.props.match.params.contractID && this.state.selectedPackages.length > 0 ? "/condition/"+this.props.match.params.contractID : "javascript:void(0);"} className="basic-info-pillss pills backcolor" style={{"cursor" : this.props.match.params.contractID && this.state.selectedPackages.length > 0 ? "pointer"  : "not-allowed"}}>
                                                <i className="fa fa-paste iconMarginLeft" aria-hidden="true"></i> &nbsp;
                                                Conditions
                                            </a>
                                            <div className="triangleone " id="triangle-right"></div>
                                        </li>
                                        <li className="col-lg-3 col-md-2 col-sm-12 col-xs-12 transactionTab noRightPadding pdcls btn4 disabled">
											<div className="trianglesix" id="triangle-right2"></div>
											<a href={this.props.match.params.contractID && this.state.selectedPackages.length > 0 ? "/viewcontract/"+this.props.match.params.contractID : "javascript:void(0);"} className="basic-info-pillss backcolor" style={{"cursor" : this.props.match.params.contractID && this.state.selectedPackages.length > 0 ? "pointer"  : "not-allowed"}}>
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
                                                                <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding" style={{"marginBottom" : "20px"}}>
                                                                    <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12" >
                                                                        <label className="timeLabel col-lg-12 col-md-12 col-sm-12 col-xs-12">Night Charges (From Time) <sup className="astrick">*</sup></label>
                                                                        <input className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12 inputText" type="time" ref="nightChargesFromTime" name="nightChargesFromTime" id="nightChargesFromTime" value={this.state.nightChargesFromTime} onChange={this.timeChange.bind(this)} />
                                                                    </div>
                                                                    <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12" >
                                                                        <label className="timeLabel col-lg-12 col-md-12 col-sm-12 col-xs-12">Night Charges (To Time) <sup className="astrick">*</sup></label>
                                                                        <input className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12 inputText" type="time" ref="nightChargesToTime" name="nightChargesToTime" id="nightChargesToTime" value={this.state.nightChargesToTime} onChange={this.timeChange.bind(this)} />
                                                                    </div>
                                                                    <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12" >
                                                                        <label className="timeLabel col-lg-12 col-md-12 col-sm-12 col-xs-12">Early Morning Charges (From Time) <sup className="astrick">*</sup></label>
                                                                        <input className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12 inputText" type="time" ref="earlyMorningChargesFromTime" name="earlyMorningChargesFromTime" id="earlyMorningChargesFromTime" value={this.state.earlyMorningChargesFromTime} onChange={this.timeChange.bind(this)} />
                                                                    </div>
                                                                    <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12" >
                                                                        <label className="timeLabel col-lg-12 col-md-12 col-sm-12 col-xs-12">Early Morning Charges (To Time) <sup className="astrick">*</sup></label>
                                                                        <input className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12 inputText" type="time" ref="earlyMorningChargesToTime" name="earlyMorningChargesToTime" id="earlyMorningChargesToTime" value={this.state.earlyMorningChargesToTime} onChange={this.timeChange.bind(this)} />
                                                                    </div>
                                                                </div>
                                                                <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding" style={{"marginBottom" : "20px"}}>
                                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{"paddingBottom" : "10px"}}>
                                                                        <label className="labelform labelTitle col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                            Select {this.state.contractData.entityType ? this.state.contractData.entityType : ""} Packages <sup className="astrick">*</sup> 
                                                                            <span id="error" className="errorMsg">{this.state.checkBoxError ? "( " + this.state.checkBoxError + " )" : ""}</span>
                                                                        </label>
                                                                    </div>
                                                                    {  
                                                                        this.state.packageArray && this.state.packageArray.length > 0
                                                                        ?
                                                                            this.state.packageArray.map((typedata, i)=>{                                                                                
                                                                                return(                                                                                                                                                                        
                                                                                    <div key={i} className="col-lg-12 col-md-12 col-sm-12 col-xs-12"> 
                                                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 package-title-div NOpadding">
                                                                                            <h6 className="package-title">{typedata._id}</h6>
                                                                                        </div>
                                                                                        {  typedata.packagesData && typedata.packagesData.length > 0
                                                                                        ?
                                                                                                typedata.packagesData.map((categorydata, j)=>{  
                                                                                                    // {console.log("package = ", data._id)}                                                             
                                                                                                    return(
                                                                                                        <div key={j} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding"> 
                                                                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 category-title-div NOpadding">
                                                                                                                <h6 className="category-title">{categorydata._id.carCategory}</h6>
                                                                                                            </div>
                                                                                                            {categorydata.packages && categorydata.packages.length > 0
                                                                                                            ?
                                                                                                                categorydata.packages.map((data, k)=>{  
                                                                                                                    // {console.log("package = ", data._id)}                                                             
                                                                                                                    return(                                                                                                                                                                        
                                                                                                                        <div key={k} className="col-lg-4 col-md-4 col-sm-12 col-xs-12 packages">
                                                                                                                            <label className="checkLabel">
                                                                                                                                <input type="checkbox" 
                                                                                                                                    id       = {data.packageNameId + "-" + data.categoryId} 
                                                                                                                                    name     = {"package-"+data.packageNameId + "-" + data.categoryId}  
                                                                                                                                    value    = {data.packageName+"|"+data.packageTypeId + "|" + data.categoryId}
                                                                                                                                    checked  = {this.state["package-"+data._packageNameId + "-" + data.categoryId] ? true : false}
                                                                                                                                    onChange = {this.selectedPackages.bind(this)}                                                                                                                    
                                                                                                                                />
                                                                                                                                <span className="checkmark" id={"package-"+data.packageNameId + "-" + data.categoryId} ></span>                                                                                                                                
                                                                                                                            </label>
                                                                                                                            <span>{data.packageName}</span>                                                                                         
                                                                                                                        </div>
                                                                                                                    ) 
                                                                                                                })
                                                                                                            :
                                                                                                                null
                                                                                                            }
                                                                                                        </div>
                                                                                                    )
                                                                                               })
                                                                                        :
                                                                                            null
                                                                                        }                                                                                        
                                                                                    </div>
                                                                                )
                                                                            })
                                                                        :
                                                                        null
                                                                    }                                                                    
                                                                </div>        
                                                                <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                    <CityClassification />
                                                                </div> 
                                                                <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{"paddingBottom" : "10px"}}>
                                                                        <label className="labelform labelTitle col-lg-12 col-md-12 col-sm-12 col-xs-12">Selected Packages <sup className="astrick">*</sup></label>
                                                                    </div>
                                                                    <table className="table packageTbl textAlignLeft pkgTable" style={{"overflowX":"auto", "display": "block", "whiteSpace": "nowrap"}}>
                                                                        <thead>
                                                                            <tr>
                                                                                <th><div className="colWidth">City Class</div></th>
                                                                                <th><div className="colWidth">Car Category</div></th>
                                                                                <th><div className="colWidth">Package Type</div></th>
                                                                                <th><div className="colWidth">Package Name</div></th>
                                                                                <th><div className="colWidth">Min Km / Day</div></th>
                                                                                <th><div className="colWidth">Min Hrs / Day</div></th>
                                                                                <th><div className="colWidth">Fixed Rate</div></th>
                                                                                <th><div className="colWidth">Extra Km Charges</div></th>
                                                                                <th><div className="colWidth">Extra Hr Charges</div></th>
                                                                                <th><div className="colWidth">Driver Allowance / Day</div></th>
                                                                                <th><div className="colWidth">Night Halt / Night</div></th>
                                                                                <th><div className="colWidth">Night Charges / Night</div></th>
                                                                                <th><div className="colWidth">Early Morning Charges / Morning</div></th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {   this.state.selectedPackages && this.state.selectedPackages.length>0
                                                                                ?
                                                                                this.state.selectedPackages.map((data, index)=>{
                                                                                    return(
                                                                                        <tr key={index}> 
                                                                                            <td><div className="colWidth">{data.cityClass}</div></td>
                                                                                            <td><div className="colWidth">{data.carCategory}</div></td>
                                                                                            <td><div>{data.packageType}</div> <div>{(data.way == 0) ? null : data.way}</div></td>
                                                                                            <td><div className="colWidth">{data.packageName}</div></td>
                                                                                            <td>
                                                                                                <input type="number" name={"maxKm-"+index} className="form-control table-text" 
                                                                                                    value     = {data.maxKm}
                                                                                                    onChange  = {this.handleChange}
                                                                                                    required
                                                                                                    />
                                                                                            </td>
                                                                                            <td>
                                                                                                <input type="number" name={"maxHours-"+index} className="form-control table-text" 
                                                                                                    value     = {data.maxHours}
                                                                                                    onChange  = {this.handleChange}
                                                                                                    required
                                                                                                    />
                                                                                            </td>
                                                                                            <td>
                                                                                                <input type="number" name={"fixCharges-"+index} className="form-control table-text"
                                                                                                    value     = {data.fixCharges} 
                                                                                                    onChange  = {this.handleChange}
                                                                                                    required
                                                                                                    />
                                                                                            </td>  
                                                                                            <td>
                                                                                                <input type="number" name={"extraKms-"+index} className="form-control table-text"
                                                                                                    value     = {data.extraKms}
                                                                                                    onChange  = {this.handleChange}
                                                                                                    required
                                                                                                    />
                                                                                            </td>
                                                                                            <td>
                                                                                                <input type="number" name={"extraHr-"+index} className="form-control table-text"
                                                                                                    value     = {data.extraHr} 
                                                                                                    onChange  = {this.handleChange}
                                                                                                    required
                                                                                                />
                                                                                            </td>
                                                                                            <td>
                                                                                                <input type="number" name={"driverAllowance-"+index} className="form-control table-text"
                                                                                                    value     = {data.driverAllowance}
                                                                                                    onChange  = {this.handleChange}
                                                                                                    required
                                                                                                    />
                                                                                            </td>
                                                                                            <td>
                                                                                                <input type="number" name={"nightHalt-"+index} className="form-control table-text"
                                                                                                    value     = {data.nightHalt}
                                                                                                    onChange  = {this.handleChange}
                                                                                                    required
                                                                                                />
                                                                                            </td>
                                                                                            <td>
                                                                                                <input type="number" name={"nightCharges-"+index} className="form-control table-text"  
                                                                                                    value     = {data.nightCharges} 
                                                                                                    onChange  = {this.handleChange}
                                                                                                    required
                                                                                                />
                                                                                            </td>
                                                                                            <td>
                                                                                                <input type="number" name={"morningCharges-"+index} className="form-control table-text"
                                                                                                    value     = {data.morningCharges}
                                                                                                    onChange  = {this.handleChange}
                                                                                                    required
                                                                                                />
                                                                                            </td>                                                                                                
                                                                                        </tr>
                                                                                    );
                                                                                })
                                                                                :
                                                                                <tr>
                                                                                    <td colSpan="13" className="noData">
                                                                                        <h6>No Selected Packages...</h6>
                                                                                    </td>
                                                                                </tr>
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