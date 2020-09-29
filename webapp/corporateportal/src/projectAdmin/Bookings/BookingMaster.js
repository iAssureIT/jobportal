import React, { Component }     from 'react';
import $                        from 'jquery';
import jQuery                   from 'jquery';
import axios                    from 'axios';
import swal                     from 'sweetalert';
import TimePicker               from 'rc-time-picker';
// import DateTime from 'react-datetime';
import moment                   from 'moment';
import _                        from 'underscore';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import EmployeeDetails        from './components/EmployeeDetails.js';
import TripDetails            from './components/TripDetails.js';
import CarDetails             from './components/CarDetails.js';
import AddGuest             from './components/AddGuest.js';
import EstimatedCost          from './components/EstimatedCost.js';

import BulkUpload from "../../coreadmin/Master/BulkUpload/BulkUpload.js";


import "./BookingMaster.css";
import 'bootstrap/js/tab.js';
const format = "HH:mm";


class BookingMaster extends Component {
     
    constructor(props) {
        super(props);
        this.state = {
            showDiv                 :false,
            showAddStop             :false,
            showList             :false,
            otherPurpose             :false,
            homeAdd             :true, 
            gmapsLoaded: false,
            gmapsLoaded1: false,
            showInstuction: false,
            showPackages: false,
            contractData  : [],
            contractId  : "",
            toggleButtonValue       :"Round Trip",
            pickupDate              :moment(new Date).format("YYYY-MM-DD"),
            returnDate              : moment().add(1,'days').format("YYYY-MM-DD"),
            noOfdays                :"",
            fromTime                :moment(),
            from                    :"",
            to                      : "",
            toTime                  :moment(),
            purposeOfTravel         : "",
            purposeOfTravelOther         : "",
            instructions            :"",
            valueOfTab              :"",
            stopArr                 :[],
            packageTypeVal          :[],
            vehicleData             :[],
            userID                  : '' ,
            empId            : "",
            employeeName            : "",
            empHomeAddr             : "",
            bookingType             : "Outstation",
            showbookingForOther     :false,
            isBookingForOther       :false,
            empWorkAddr             : "",
            radioButtonValue        : "Home",
            address                 : "",
            selectedVehicle         : "",
            fromLatLng              : [],
            toLatLng                : [],
            stopLatLng              : [],
            tripArray               : [],
            vehicleCategoryId       : "",
            fromArea                : "",
            fromCity                : "",
            fromDistrict                : "",
            fromState               : "",
            fromCountry             : "",
            fromPincode             : "",
            address1             : "",
            toaddress1             : "",
            toArea                  : "",
            toCity                  : "",
            toDistrict                  : "",
            toState                 : "",
            toCountry               : "",
            toPincode               : "",
            stopAddress1                  : "",
            stopArea                  : "",
            stopCity                  : "",
            stopState                 : "",
            stopCountry               : "",
            stopPincode               : "",
            selfData               : "",
            reasonForSelectingVehicle               : "",
            showreasonForSelectingVehicle:false,
            packageTypeId:"",
            packageId:"",
            approvalRequired:'No',
            estimatedCost:"",
            bookingFor:'self',
            empName:"",
            empNumber:"",
            query: '',
            otherEmployeeresults: [],
            purposeArray: [],
            fileDetails: [],
            failedRecordsTable: [],
            failedRecordsCount:0,
            goodRecordsTable:[],
            goodDataCount:0,
            empCategory:"",
            package:"",
            // managerId:"",
            // employeeId:"",
            // corporateId:""
            goodRecordsHeading: {
              bookingId    : "Booking Id",
              tripType: "Trip Type",
              from: "From",
              to: "To",
              pickupDate: "Pickup Date",
              pickupTime: "Pickup Time",
              returnDate: "Return Date",
              returnTime: "Return Time",   
              vehicleCategory : "Vehicle Category",
              employeeId: "Employee ID",
              managerID1: "Manager1 ID",
              managerID2: "Manager2 ID",
              managerID3: "Manager3 ID",
              approvalRequired: "Approval Required",
              specialInstruction : "Special Instruction",
              purposeOfTravel : "Purpose of Travel",
            },
            failedtableHeading: {
              tripType: "Trip Type",
              from: "From",
              to: "To",
              pickupDate: "Pickup Date",
              pickupTime: "Pickup Time",
              returnDate: "Return Date",
              returnTime: "Return Time",   
              vehicleCategory : "Vehicle Category",
              employeeId: "Employee ID",
              managerID1: "Manager1 ID",
              managerID2: "Manager2 ID",
              managerID3: "Manager3 ID",
              approvalRequired: "Approval Required",
              specialInstruction : "Special Instruction",
              purposeOfTravel : "Purpose of Travel",
              failedRemark: "Failed Data Remark"
            }

        };
      // $('#Outstation').addClass( 'btn-primary' );
      this._handleFocus = this._handleFocus.bind(this);
      this._handleFocusOut = this._handleFocusOut.bind(this);
    }

    initMap = () => {
      this.setState({
        gmapsLoaded: true,
      })
    }

    initMap1 = () => {
      this.setState({
        gmapsLoaded1: true,
      })
    }

    componentWillUnmount(){}

    // getGoogleAPIKey(){
    //     axios.get("/api/projectSettings/get/GOOGLE",)
    //     .then((response) => {
    //         this.setState({
    //             googleAPIKey : response.data.googleapikey
    //         },()=>{
    //           this.callFirstInitFunc(this.state.googleAPIKey);
    //           this.callSecondInitFunc(this.state.googleAPIKey);
    //         });
    //     })
    //     .catch((error) =>{
    //         swal(error)
    //     })
    // }

    // callFirstInitFunc(googleAPIKey){
    //   window.initMap = this.initMap
    //   const gmapScriptEl = document.createElement(`script`)
    //   gmapScriptEl.src = `https://maps.googleapis.com/maps/api/js?key=`+googleAPIKey+`&libraries=places&callback=initMap`
    //   document.querySelector(`body`).insertAdjacentElement(`beforeend`, gmapScriptEl)
    // }

    // callSecondInitFunc(googleAPIKey){
    //   window.initMap1 = this.initMap1
    //   const gmapScriptEl1 = document.createElement(`script`)
    //   gmapScriptEl1.src = `https://maps.googleapis.com/maps/api/js?key=`+googleAPIKey+`&libraries=places&callback=initMap1`
    //   document.querySelector(`body`).insertAdjacentElement(`beforeend`, gmapScriptEl1)
    // }

    componentDidMount() {
      // this.getGoogleAPIKey();
      this.setState({
        booking_id: this.props.match.params.bookingId
      }, () => {
        this.editForm();
      })

    
      $('#Outstation').addClass( 'btn-primary' );
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd;
        }
        if(mm<10){
            mm='0'+mm;
        }
        var today = yyyy+'-'+mm+'-'+dd;
        
        this.setState({
          returnDate : moment(today).add(1,'days').format("YYYY-MM-DD"),
          noOfdays  : parseInt(this.noOfdays(this.state.pickupDate, moment(today).add(1,'days').format("YYYY-MM-DD")))+1,
          bookingType:"Outstation"
        });

    
       var id = localStorage.getItem("user_ID");
       axios.get("/api/users/get/email/"+id)
      .then((response) => {
          axios.get("/api/personmaster/get/emailID/"+response.data)
            .then((res) => {
              console.log('res.data login user data==>',res.data)
                if(res.data && res.data.data[0]){
                  this.setState({
                      bookingType : 'Outstation',
                      employeeUserId : id,
                      userID : res.data.data[0]._id,
                      selfData: res.data.data[0].firstName+' '+res.data.data[0].lastName+' (EmpID : '+res.data.data[0].employeeId+')',
                      employeeName: res.data.data[0].firstName+' '+res.data.data[0].lastName,
                      departmentId : res.data.data[0].departmentId,
                      empId : res.data.data[0].employeeId,
                      corporateId : res.data.data[0].company_Id,
                      empCategory : res.data.data[0].empCategory,
                  }) 
                    var managerID1 = res.data.data[0].approvingAuthorityId1;
                    var managerID2 = res.data.data[0].approvingAuthorityId2;
                    var managerID3 = res.data.data[0].approvingAuthorityId3;
                    this.setState({
                      managerID1 : managerID1,
                      managerID2 : managerID2,
                      managerID3 : managerID3,
                    })
                   this.getManagerData(managerID1,managerID2,managerID3)
                  // if(res.data.data[0].bookingApprovalRequired == 'Yes'){
                  //   this.setState({
                  //     approver1exist :'No',
                  //     approver2exist :'No',
                  //     approver2exist :'No',
                  //     approvalRequired: 'Yes',
                  //   })
                  // }
                var UserData = res.data.data[0].address[0];
                var addr = "";
                if(UserData){
                  console.log('===if=====')
                  addr = UserData.addressLine2+', '+ UserData.addressLine1
                  this.setState({
                        from        : addr,
                        fromArea    : UserData.area,
                        fromCity    : UserData.city,
                        fromDistrict    : UserData.district,
                        fromState   : UserData.state,
                        fromCountry : UserData.country,
                        fromPincode : UserData.pincode,
                  })
                 geocodeByAddress(addr)
                .then(results => getLatLng(results[0]))
                .then(latLng => this.setState({'fromLatLng': latLng}))
                .catch(error => console.error('Error', error));
                  
                  var array = {
                    returnDate : this.state.returnDate,
                    from    : addr,
                    fromAddress1    : this.state.address1,
                    fromPincode    : this.state.fromPincode,
                    toAddress1    : this.state.toaddress1,
                    toPincode    : this.state.toPincode,
                    pickupDate : this.state.pickupDate,
                    pickupTime : moment(this.state.fromTime).format('HH:mm'),
                    to         : this.state.to,
                    returnTime : moment(this.state.toTime).format('HH:mm'),
                    bookingType : 'Outstation',
                    purposeOfTravel: this.state.purposeOfTravel,
                    purposeOfTravelOther: this.state.purposeOfTravelOther,
                    instructions  :this.state.instructions,
                    selectedVehicle  :this.state.selectedVehicle,
                    reasonForSelectingVehicle  :this.state.reasonForSelectingVehicle,
                    stopArr : this.state.stopArr
                  }
                    this.setState({
                        tripArray   : array,
                    })   
                 }else{
                  console.log('===else=====')
                  this.setState({ homeAdd : false,radioButtonValue : 'Office'})
                  var res = res.data.data[0].workLocation
                  this.getOfficeAddr(res)
                 }


                }else{
                swal('No employee details available of you. Please fill your profile. Or contact admin')
            }

            })
            .catch((error) => {
              console.log('error: ',error)
            })  
          })
          .catch((error) => {
            console.log('fetching user data error: ',error)
          })   
      
        
        window.scrollTo(0, 0);
        $.validator.addMethod("regxPincode", function (value, element, regexpr) {
            return regexpr.test(value);
        }, "Please enter valid Pincode");
        jQuery.validator.setDefaults({
          debug: true,
          success: "valid"
        });
        $("#BasicInfo").validate({
          rules: {
         
            from: {
              required: true
            },
            fromTime: {
              required: true
            },
            fromDistrict: {
              required: true
            },
            toTime: {
              required: true
            },
            to: {
              required: true
            },
            pickupDate: {
              required: true
            },
            returnDate: {
              required: true
            },
            purposeOfTravel:{
              required: true
            },
            purposeOfTravelOther:{
              required: true
            },
           fromPincode:{
              required: true,
              regxPincode:/^[1-9][0-9]{5}$/
            },
            toPincode:{
              required: true,
              regxPincode:/^[1-9][0-9]{5}$/
            },
            reasonForSelectingVehicle:{
              required: true
            }
           
            // contactNumber: {
            //   required: true,
            // },
            // email: {
            //   required: true,
            //   regxEmail :/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$|^$)/,
            // },
          },
          errorPlacement: function (error, element) {
            if (element.attr("name") == "from") {
              error.insertAfter("#from");
            }
            if (element.attr("name") == "fromPincode") {
              error.insertAfter("#fromPincode");
            }
            if (element.attr("name") == "fromDistrict") {
              error.insertAfter("#fromDistrict");
            }
            if (element.attr("name") == "to") {
              error.insertAfter("#to");
             }
             if (element.attr("name") == "toPincode") {
              error.insertAfter("#toPincode");
             }
            if (element.attr("name") == "pickupDate") {
              error.insertAfter("#pickupDate");
            }
            if (element.attr("name") == "returnDate") {
              error.insertAfter("#ReturnDate");
            }
            if (element.attr("name") == "purposeOfTravel") {
              error.insertAfter("#purposeOfTravel");
            }
            if (element.attr("name") == "purposeOfTravelOther") {
              error.insertAfter("#purposeOfTravelOther");
            }
            if (element.attr("name") == "fromTime") {
              error.insertAfter("#fromTime");
            }
            if (element.attr("name") == "toTime") {
              error.insertAfter("#toTime");
            }
            if (element.attr("name") == "reasonForSelectingVehicle") {
              error.insertAfter("#reasonForSelectingVehicle");
            }
          }
        });
        this.getVehicle();
        this.getPackageType();
        this.getVehicleData();
        this.getBtnValue();
        this.getPurpuseOfTravel();
        // this.getCarData();

    }

    componentWillReceiveProps(nextProps){
      // this.getGoogleAPIKey();
      var id = localStorage.getItem("user_ID");
          axios.get("/api/personmaster/getUserByUserId/"+id)
            .then((res) => {
                if(res.data && res.data.data[0]){
                  this.setState({
                      bookingType : 'Outstation',
                      employeeUserId : id,
                      userID : res.data.data[0]._id,
                      selfData: res.data.data[0].firstName+' '+res.data.data[0].lastName+' (EmpID : '+res.data.data[0].employeeId+')',
                      employeeName: res.data.data[0].firstName+' '+res.data.data[0].lastName,
                      departmentId : res.data.data[0].departmentId,
                      empId : res.data.data[0].employeeId,
                      corporateId : res.data.data[0].company_Id,
                      empCategory : res.data.data[0].empCategory,
                  }) 
                var UserData = res.data.data[0].address[0];
                var addr = "";
                if(UserData){
                addr = UserData.addressLine2+', '+ UserData.addressLine1
                 geocodeByAddress(addr)
                .then(results => getLatLng(results[0]))
                .then(latLng => this.setState({'fromLatLng': latLng}))
                .catch(error => console.error('Error', error));
                  this.setState({
                        from        : addr,
                        fromArea    : UserData.area,
                        fromCity    : UserData.city,
                        fromDistrict    : UserData.district,
                        fromState   : UserData.state,
                        fromCountry : UserData.country,
                        fromPincode : UserData.pincode,
                  })
                  var array = {
                    returnDate : this.state.returnDate,
                    from    : addr,
                    fromAddress1    : this.state.address1,
                    fromPincode    : this.state.fromPincode,
                    toAddress1    : this.state.toaddress1,
                    toPincode    : this.state.toPincode,
                    pickupDate : this.state.pickupDate,
                    pickupTime : moment(this.state.fromTime).format('HH:mm'),
                    to         : this.state.to,
                    returnTime : moment(this.state.toTime).format('HH:mm'),
                    bookingType : 'Outstation',
                    purposeOfTravel: this.state.purposeOfTravel,
                    purposeOfTravelOther: this.state.purposeOfTravelOther,
                    instructions  :this.state.instructions,
                    selectedVehicle  :this.state.selectedVehicle,
                    reasonForSelectingVehicle  :this.state.reasonForSelectingVehicle,
                    stopArr : this.state.stopArr
                  }
                    this.setState({
                        tripArray   : array,
                    })   
                 }else{
                  this.setState({ homeAdd : false,radioButtonValue : 'Office'})
                  var res = res.data.data[0].workLocation
                  this.getOfficeAddr(res)
                 }
                  
                  var managerID1 = res.data.data[0].approvingAuthorityId1;
                  var managerID2 = res.data.data[0].approvingAuthorityId2;
                  var managerID3 = res.data.data[0].approvingAuthorityId3;
                  this.setState({
                    managerID1 : managerID1,
                    managerID2 : managerID2,
                    managerID3 : managerID3,
                  })
                 this.getManagerData(managerID1,managerID2,managerID3)

                // if(res.data.data[0].bookingApprovalRequired == 'Yes'){
                //   this.setState({
                //     approver1exist :'No',
                //     approver2exist :'No',
                //     approver2exist :'No',
                //     approvalRequired: 'Yes',
                //   })
                // }

                }else{
                swal('No employee details available of you. Please fill your profile. Or contact admin')
            }

            })
            .catch((error) => {
              console.log('error: ',error)
            })   
      this.editForm();
      this.getVehicle();
      this.getPackageType();
      this.getVehicleData();
      this.getBtnValue();
      // this.getCarData();
      this.getPurpuseOfTravel();
    }

    getPurpuseOfTravel(){
      axios.get("/api/purposeoftravelmaster/get/alllist")
      .then((response) => {
        this.setState({
            purposeArray: response.data
        })
      })
      .catch((error) => {

      })
    }

    getManagerData(managerID1,managerID2,managerID3){
      axios.get("/api/personmaster/get/UserID/"+managerID1+"/"+this.state.corporateId)
        .then((response) => {
          if(response.data && response.data.data[0]){
            this.setState({
                managerId1 : response.data.data[0]._id,
                manager1ID: response.data.data[0].employeeId,
                manager1Contact: response.data.data[0].contactNo,
                manager1Name : response.data.data[0].firstName +' '+response.data.data[0].lastName,
                approver1exist:'Yes'
            }) 
          }           
        })
        .catch((error) => {
          console.log('error: ',error)
        })
        // axios.get("/api/personmaster/get/UserID/"+managerID2+"/"+this.state.corporateId)
        axios.get("/api/personmaster/get/UserID/"+managerID2+"/"+this.state.corporateId)
        .then((response) => {
          if(response.data && response.data.data[0]){
            this.setState({
              approver2exist : 'Yes',
              managerId2 : response.data.data[0]._id,
              manager2ID : response.data.data[0].employeeId,
              manager2Contact: response.data.data[0].contactNo,
              manager2Name : response.data.data[0].firstName +' '+response.data.data[0].lastName,
            }) 
          }           
        })
        .catch((error) => {
          console.log('error: ',error)
        })
        // axios.get("/api/personmaster/get/UserID/"+managerID3+"/"+this.state.corporateId)
        axios.get("/api/personmaster/get/UserID/"+managerID3+"/"+this.state.corporateId)
        .then((response) => {
          if(response.data && response.data.data[0]){
            this.setState({
              approver3exist : 'Yes',
              managerId3 : response.data.data[0]._id,
              manager3ID : response.data.data[0].employeeId,
              manager3Contact: response.data.data[0].contactNo,
              manager3Name : response.data.data[0].firstName +' '+response.data.data[0].lastName,
            })  
          }          
        })
        .catch((error) => {
          console.log('error: ',error)
        })
    }

    getGeoAddress(address){
      axios.get("/api/projectSettings/get/GOOGLE",)
        .then((response) => {
            this.setState({
                googleAPIKey : response.data.googleapikey
            },()=>{
              var url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key='+this.state.googleAPIKey

              axios.get(url)
              .then(response=>{
                console.log('response.data.results[0].address_components=>',response.data.results[0].address_components)
                for (var i = 0; i < response.data.results[0].address_components.length; i++) {
                  for (var b = 0; b < response.data.results[0].address_components[i].types.length; b++) {
                      switch (response.data.results[0].address_components[i].types[b]) {
                          case 'sublocality_level_1':
                              var area = response.data.results[0].address_components[i].long_name;
                              break;
                          case 'sublocality_level_2':
                              var area = response.data.results[0].address_components[i].long_name;
                              break;
                          case 'locality':
                              var city = response.data.results[0].address_components[i].long_name;
                              break;
                          case 'administrative_area_level_1':
                              var state = response.data.results[0].address_components[i].long_name;
                              break;
                          case 'administrative_area_level_2':
                              var district = response.data.results[0].address_components[i].long_name;
                              break;
                          case 'country':
                             var country = response.data.results[0].address_components[i].long_name;
                              break;
                          case 'postal_code':
                             var pincode = response.data.results[0].address_components[i].long_name;
                              break;
                      }
                  }
                }
                 var lat = response.data.results[0].geometry.location.latitude
                 var lng = response.data.results[0].geometry.location.longitude
                  this.setState({
                    fromArea : area,
                    fromCity : city,
                    fromDistrict : district,
                    fromState: state,
                    fromCountry:country,
                    fromPincode: pincode,
                    fromLatLng : response.data.results[0].geometry.location
                  },()=>{
                    var array = {
                      returnDate : this.state.returnDate,
                      from    : address,
                      fromAddress1    : this.state.address1,
                      fromPincode    : this.state.fromPincode,
                      toAddress1    : this.state.toaddress1,
                      toPincode    : this.state.toPincode,
                      pickupDate : this.state.pickupDate,
                      pickupTime : moment(this.state.fromTime).format('HH:mm'),
                      to         : this.state.to,
                      returnTime : moment(this.state.toTime).format('HH:mm'),
                      bookingType : this.state.bookingType,
                      purposeOfTravel: this.state.purposeOfTravel,
                      purposeOfTravelOther: this.state.purposeOfTravelOther,
                      instructions  :this.state.instructions,
                      selectedVehicle  :this.state.selectedVehicle,
                      reasonForSelectingVehicle  :this.state.reasonForSelectingVehicle,
                      stopArr : this.state.stopArr,
                    }
                    this.setState({
                        from : address,
                        tripArray : array
                    })
                  })
                  
              })
              .catch(error=>{
                console.log("error",error)
              })
            });
        })
        .catch((error) =>{
            swal(error)
        })
      
    }

    getOfficeAddr(addr){
      this.setState({
          fromArea : "",
          fromCity : "",
          fromDistrict : "",
          fromState: "",
          fromCountry:"",
          fromPincode: ""
        })
      
      var res = addr
      console.log('==========================================')
      console.log('res=>',res)
      this.getGeoAddress(res)
      
    }


    editForm(){
      // this.getGoogleAPIKey();
      if (this.state.booking_id){
        axios.get('/api/bookingmaster/get/booking/'+this.state.booking_id)
        .then((response)=>{
          if(response.data.data[0].purposeOfTravel == 'Other'){
            this.setState({
              otherPurpose : true
            })
          }
          
          var pickupTime = moment(response.data.data[0].pickupTime,"HH:mm")._d
          var returnTime = moment(response.data.data[0].returnTime,"HH:mm")._d
          this.setState({
          packageTypeId         : response.data.data[0].packageTypeId,
          packageId               : response.data.data[0].packageId,
          package               : response.data.data[0].package,
          contractId              : response.data.data[0].contractId,
          bookingType             : response.data.data[0].tripType,
          radioButtonValue             : response.data.data[0].pickupFrom,
          from                    : response.data.data[0].from.address,
          address        : response.data.data[0].from.address,
          address1        : response.data.data[0].from.address1,
          fromArea           : response.data.data[0].from.area,
          fromCity           : response.data.data[0].from.city,
          fromDistrict           : response.data.data[0].from.district,
          fromState          : response.data.data[0].from.state,
          fromCountry        : response.data.data[0].from.country,
          fromPincode        : response.data.data[0].from.pincode, 
          fromLatLng     : {lat:response.data.data[0].from.latitude,lng:response.data.data[0].from.longitude},
          to                      : response.data.data[0].to.address,
          address        : response.data.data[0].to.address,
          toaddress1        : response.data.data[0].to.address1,
          toArea           : response.data.data[0].to.area,
          toCity           : response.data.data[0].to.city,
          toDistrict           : response.data.data[0].to.district,
          toState          : response.data.data[0].to.toState,
          toCountry        : response.data.data[0].to.country,
          toPincode        : response.data.data[0].to.pincode,
          toLatLng       : {lat:response.data.data[0].to.latitude,lng:response.data.data[0].to.longitude},
          pickupDate              : moment(response.data.data[0].pickupDate).format('YYYY-MM-DD'),
          fromTime              : moment(pickupTime),
          returnDate              : moment(response.data.data[0].returnDate).format('YYYY-MM-DD'),
          toTime              : moment(returnTime),
          stopArr       : response.data.data[0].intermediateStops,
          user_ID              : response.data.data[0].employeeId,
          employeeUserId              : response.data.data[0].employeeUserId,
          empId              : response.data.data[0].empId,
          employeeName              : response.data.data[0].employeeName,
          departmentId              : response.data.data[0].departmentId,
          corporateId             : response.data.data[0].corporateId,
          managerId1               : response.data.data[0].managerId1,
          managerId2               : response.data.data[0].managerId2,
          managerId3               : response.data.data[0].managerId3,
          managerID1               : response.data.data[0].managerID1,
          managerID2               : response.data.data[0].managerID2,
          managerID3               : response.data.data[0].managerID3,
          approvalRequired        : response.data.data[0].approvalRequired,
          approver1exist        : response.data.data[0].approver1exist,
          approver2exist        : response.data.data[0].approver2exist,
          approver3exist        : response.data.data[0].approver3exist,
          estimatedCost           : response.data.data[0].estimatedCost,
          purposeOfTravel         : response.data.data[0].purposeOfTravel,
          purposeOfTravelOther         : response.data.data[0].purposeOfTravelOther,
          instructions      :response.data.data[0].specialInstruction,
          selectedVehicle         :response.data.data[0].selectedVehicle,
          vehicleCategoryId       : response.data.data[0].vehicleCategoryId,
          vehicleID               : response.data.data[0].vehicleID,
          browser               : response.data.data[0].browser,
          showPackages    : true
          },()=>{
            var array = {
            returnDate : this.state.returnDate,
            from    : this.state.from,
            fromAddress1    : this.state.address1,
            fromPincode    : this.state.fromPincode,
            toAddress1    : this.state.toaddress1,
            toPincode    : this.state.toPincode,
            pickupDate : this.state.pickupDate,
            pickupTime : moment(this.state.fromTime).format('HH:mm'),
            returnDate : this.state.returnDate,
            to         : this.state.to,
            returnTime : moment(this.state.toTime).format('HH:mm'),
            bookingType : this.state.bookingType ,
            purposeOfTravel: this.state.purposeOfTravel,
            purposeOfTravelOther: this.state.purposeOfTravelOther,
            instructions  :this.state.instructions ,
            selectedVehicle  :this.state.selectedVehicle ,
            reasonForSelectingVehicle  :this.state.reasonForSelectingVehicle ,
            stopArr : this.state.stopArr    }
            this.setState({tripArray:array,noOfdays  : parseInt(this.noOfdays(this.state.pickupDate, this.state.returnDate))+1,})
          })
          this.getPackageData(response.data.data[0].vehicleCategoryId)
           var classVar = '.'+response.data.data[0].vehicleCategoryId
      
           $(classVar).addClass("itemSelected");

          axios.get('/api/categorymaster/get/one/'+response.data.data[0].vehicleCategoryId)
          .then((res)=>{
            this.setState({selectedVehicle:res.data.category},()=>{
              var array = {
              returnDate : this.state.returnDate,
              from    : this.state.from,
              fromAddress1    : this.state.address1,
              fromPincode    : this.state.fromPincode,
              toAddress1    : this.state.toaddress1,
              toPincode    : this.state.toPincode,
              pickupDate : this.state.pickupDate,
              pickupTime : moment(this.state.fromTime).format('HH:mm'),
              to         : this.state.to,
              returnTime : moment(this.state.toTime).format('HH:mm'),
              bookingType : this.state.bookingType ,
              purposeOfTravel: this.state.purposeOfTravel,
              purposeOfTravelOther: this.state.purposeOfTravelOther,
              instructions  :this.state.instructions ,
              selectedVehicle  :this.state.selectedVehicle ,
              reasonForSelectingVehicle  :this.state.reasonForSelectingVehicle ,
              stopArr : this.state.stopArr    }
              this.setState({tripArray:array})
            })
          })
          .catch((error)=>{})
        })
        .catch((error)=>{
          console.log("ERROR ", error)
        })
      }
    }

    noOfdays(date1,date2){
        // console.log(date1,date2);
        var date1 = new Date(date1); 
        var date2 = new Date(date2); 
        // To calculate the time difference of two dates 
        var Difference_In_Time = date2.getTime() - date1.getTime(); 
        // To calculate the no. of days between two dates 
        return Difference_In_Time / (1000 * 3600 * 24); 
    }

    nextDate(event){
      event.preventDefault();
      var selectedDate1 = $("input#returnDate").val();
      var selectedDate = selectedDate1.replace(/-/g, '\/');

      var newDate1 = new Date(selectedDate);
      var newDate2 = new Date(newDate1.getTime() + (24*60*60*1000) );
      var newDate3 = new Date(newDate2);
      var dd = newDate3.getDate();
      var mm = newDate3.getMonth()+1; //January is 0!
      var yyyy = newDate3.getFullYear();
      if(dd<10){
          dd='0'+dd;
      }
      if(mm<10){
          mm='0'+mm;
      }
      var newDate3 = yyyy+'-'+mm+'-'+dd;
      var array = {
          returnDate : newDate3,
          from    : this.state.from,
          fromAddress1    : this.state.address1,
          fromPincode    : this.state.fromPincode,
          toAddress1    : this.state.toaddress1,
          toPincode    : this.state.toPincode,
          pickupDate : this.state.pickupDate,
          pickupTime : moment(this.state.fromTime).format('HH:mm'),
          to         : this.state.to,
          returnTime : moment(this.state.toTime).format('HH:mm'),
          bookingType : this.state.bookingType,
          purposeOfTravel: this.state.purposeOfTravel,
          purposeOfTravelOther: this.state.purposeOfTravelOther,
          instructions  :this.state.instructions,
          selectedVehicle  :this.state.selectedVehicle,
          reasonForSelectingVehicle  :this.state.reasonForSelectingVehicle,
          stopArr : this.state.stopArr,
        }
      this.setState({
          returnDate : newDate3,
          noOfdays  : parseInt(this.noOfdays(this.state.pickupDate, newDate3))+1,
          tripArray  : array
      },()=>{
        if(this.state.noOfdays > 1){
          this.setState({bookingType : "Outstation"})
        }else{
          this.setState({bookingType : "Local"})
        }
      });
    }

    previousDate(event){
      event.preventDefault();
      var selectedDate1 = $("input#returnDate").val();
      var selectedDate = selectedDate1.replace(/-/g, '\/');
      var newDate1 = new Date(selectedDate);
      var newDate2 = new Date(newDate1.getTime() - (24*60*60*1000) );
      // Session.set('newDate', newDate2);
      var newDate3 = new Date(newDate2);
      var dd = newDate3.getDate();
      var mm = newDate3.getMonth()+1; //January is 0!
      var yyyy = newDate3.getFullYear();
      if(dd<10){
          dd='0'+dd;
      }
      if(mm<10){
          mm='0'+mm;
      }
      var newDate3 = yyyy+'-'+mm+'-'+dd;

      var varDate = new Date(newDate3).setHours(0,0,0,0); 
      var fromDate = new Date(this.state.pickupDate).setHours(0,0,0,0);

      var array = {
        returnDate : newDate3,
        from    : this.state.from,
        fromAddress1    : this.state.address1,
          fromPincode    : this.state.fromPincode,
          toAddress1    : this.state.toaddress1,
          toPincode    : this.state.toPincode,
        pickupDate : this.state.pickupDate,
        pickupTime : moment(this.state.fromTime).format('HH:mm'),
        returnDate : this.state.returnDate,
        to         : this.state.to,
        returnTime : moment(this.state.toTime).format('HH:mm'),
        bookingType : this.state.bookingType,
        purposeOfTravel: this.state.purposeOfTravel,
        purposeOfTravelOther: this.state.purposeOfTravelOther,
        instructions  :this.state.instructions,
        selectedVehicle  :this.state.selectedVehicle,
        reasonForSelectingVehicle  :this.state.reasonForSelectingVehicle,
        stopArr : this.state.stopArr,
        // brand:this.state.brand,
        // model:this.state.model,
        // capacity:this.state.capacity,
      }

      if(varDate < fromDate) {
        swal('Please enter future date')
        this.setState({
          returnDate : this.state.pickupDate,
          noOfdays  : parseInt(this.noOfdays(this.state.pickupDate, this.state.pickupDate))+1,
          tripArray  : array
        },()=>{
          if(this.state.noOfdays > 1){
            this.setState({bookingType : "Outstation"})
          }else{
            this.setState({bookingType : "Local"})
          }
        })
      }else{
        this.setState({
          returnDate : newDate3,
          noOfdays  : parseInt(this.noOfdays(this.state.pickupDate, newDate3))+1,
          tripArray  : array
        },()=>{
          if(this.state.noOfdays > 1){
            this.setState({bookingType : "Outstation"})
          }else{
          this.setState({bookingType : "Local"})
        }
        });
      }
      
    }
  fromnextDate(event){
        event.preventDefault();
        var selectedDate1 = $("input#pickupDate").val();
        var selectedDate = selectedDate1.replace(/-/g, '\/');

        var newDate1 = new Date(selectedDate);
        var newDate2 = new Date(newDate1.getTime() + (24*60*60*1000) );
        var newDate3 = new Date(newDate2);
        var dd = newDate3.getDate();
        var mm = newDate3.getMonth()+1; //January is 0!
        var yyyy = newDate3.getFullYear();
        if(dd<10){
            dd='0'+dd;
        }
        if(mm<10){
            mm='0'+mm;
        }
        var newDate3 = yyyy+'-'+mm+'-'+dd;
        var array = {
            pickupDate : newDate3,
            from    : this.state.from,
            fromAddress1    : this.state.address1,
          fromPincode    : this.state.fromPincode,
          toAddress1    : this.state.toaddress1,
          toPincode    : this.state.toPincode,
            pickupTime : moment(this.state.fromTime).format('HH:mm'),
            returnDate : this.state.returnDate,
            to         : this.state.to,
            returnTime : moment(this.state.toTime).format('HH:mm'),
            bookingType : this.state.bookingType,
            purposeOfTravel: this.state.purposeOfTravel,
            purposeOfTravelOther: this.state.purposeOfTravelOther,
            instructions  :this.state.instructions,
            selectedVehicle  :this.state.selectedVehicle,
            reasonForSelectingVehicle  :this.state.reasonForSelectingVehicle,
            stopArr : this.state.stopArr,
            // brand:this.state.brand,
            // model:this.state.model,
            // capacity:this.state.capacity,
          }
        this.setState({
            pickupDate : newDate3,
            returnDate : newDate3,
            noOfdays  : parseInt(this.noOfdays(newDate3, newDate3))+1,
            tripArray  : array
        },()=>{
          if(this.state.noOfdays > 1){
            this.setState({bookingType : "Outstation"})
          }else{
          this.setState({bookingType : "Local"})
        }
        });
      }

      frompreviousDate(event){
        event.preventDefault();
        var selectedDate1 = $("input#pickupDate").val();
        var selectedDate = selectedDate1.replace(/-/g, '\/');
        var newDate1 = new Date(selectedDate);
        var newDate2 = new Date(newDate1.getTime() - (24*60*60*1000) );
        // Session.set('newDate', newDate2);
        var newDate3 = new Date(newDate2);
        var dd = newDate3.getDate();
        var mm = newDate3.getMonth()+1; //January is 0!
        var yyyy = newDate3.getFullYear();
        if(dd<10){
            dd='0'+dd;
        }
        if(mm<10){
            mm='0'+mm;
        }
        var newDate3 = yyyy+'-'+mm+'-'+dd;

        var varDate = new Date(newDate3).setHours(0,0,0,0); 
        var curDate = new Date().setHours(0,0,0,0);

        var array = {
          pickupDate : newDate3,
          from    : this.state.from,
          fromAddress1    : this.state.address1,
          fromPincode    : this.state.fromPincode,
          toAddress1    : this.state.toaddress1,
          toPincode    : this.state.toPincode,
          pickupTime : moment(this.state.fromTime).format('HH:mm'),
          returnDate : this.state.returnDate,
          to         : this.state.to,
          returnTime : moment(this.state.toTime).format('HH:mm'),
          bookingType : this.state.bookingType,
          purposeOfTravel: this.state.purposeOfTravel,
          purposeOfTravelOther: this.state.purposeOfTravelOther,
          instructions  :this.state.instructions,
          selectedVehicle  :this.state.selectedVehicle,
          reasonForSelectingVehicle  :this.state.reasonForSelectingVehicle,
          stopArr : this.state.stopArr,
          // brand:this.state.brand,
          // model:this.state.model,
          // capacity:this.state.capacity,
        }

        if(varDate < curDate) {
          swal('Please enter future date')
          this.setState({
            pickupDate : moment().format("YYYY-MM-DD"),
            returnDate : moment().format("YYYY-MM-DD"),
            noOfdays  : parseInt(this.noOfdays(this.state.pickupDate, moment().format("YYYY-MM-DD")))+1,
            tripArray  : array
          },()=>{
            if(this.state.noOfdays > 1){
              this.setState({bookingType : "Outstation"})
            }else{
          this.setState({bookingType : "Local"})
        }
          })
        }else{
          this.setState({
            pickupDate : newDate3,
            returnDate : newDate3,
            noOfdays  : parseInt(this.noOfdays(this.state.pickupDate, newDate3))+1,
            tripArray  : array
          },()=>{
            if(this.state.noOfdays > 1){
              this.setState({bookingType : "Outstation"})
            }else{
          this.setState({bookingType : "Local"})
        }
          });
        }
        
      }

    dateHandleChange(event){
      event.preventDefault();
      var varDate = new Date(event.target.value).setHours(0,0,0,0); 
      var fromDate = new Date(this.state.pickupDate).setHours(0,0,0,0);

      if(varDate < fromDate) {
        swal('Please enter future date')
        this.setState({
          returnDate : this.state.pickupDate,
          noOfdays  : parseInt(this.noOfdays(this.state.pickupDate, this.state.pickupDate))+1,
        },()=>{
          if(this.state.noOfdays > 1){
            this.setState({bookingType : "Outstation"})
          }else{
          this.setState({bookingType : "Local"})
        }
        })
      }else{
        this.setState({
          returnDate : event.target.value,
          noOfdays  : parseInt(this.noOfdays(this.state.pickupDate, event.target.value))+1,
        },()=>{
          if(this.state.noOfdays > 1){
            this.setState({bookingType : "Outstation"})
          }else{
          this.setState({bookingType : "Local"})
        }
        })
      }
    }

    handleChange(event){
        event.preventDefault();
        const target = event.target;
        const name = target.name;

        $("[type='date']").keypress(function (evt) {
            evt.preventDefault();
        })

        if(name == 'pickupDate'){
          this.setState({
            returnDate : event.target.value,
          })
        }

        
        this.setState({
          [name]: event.target.value
        },()=>{
          if(this.state.purposeOfTravel === 'Other'){
            this.setState({
              otherPurpose : true
            })
          }
          if(name == 'toTime' && (this.state.pickupDate === this.state.returnDate)){
            var now = new Date();
            var nowTime = new Date((now.getMonth()+1) + "/" + now.getDate() + "/" + now.getFullYear() + " " + this.state.fromTime);
            var userTime = new Date((now.getMonth()+1) + "/" + now.getDate() + "/" + now.getFullYear() + " " + this.state.toTime);
            if (nowTime.getTime() > userTime.getTime()) {
                swal("Please select future time") ;
                this.setState({
                  toTime:""
                })
            }
          }

          if(name == 'fromTime' && (this.state.pickupDate === moment(new Date).format("YYYY-MM-DD"))){
            var now = new Date();
            var d = new Date(),
             h = d.getHours(),
             m = d.getMinutes();
            if (h < 10) h = '0' + h;
            if (m < 10) m = '0' + m;
            var curTime= h + ':' + m
            var nowTime = new Date((now.getMonth()+1) + "/" + now.getDate() + "/" + now.getFullYear() + " " + curTime);
            var userTime = new Date((now.getMonth()+1) + "/" + now.getDate() + "/" + now.getFullYear() + " " + this.state.fromTime);
            if (nowTime.getTime() > userTime.getTime()) {
                swal("Please select future time") ;
                this.setState({
                  fromTime:curTime
                })
            }
          }

          if(name == "pickupDate" && this.state.returnDate != ""){
            var fromdate = new Date(this.state.pickupDate).setHours(0,0,0,0);
            var toDate = new Date(this.state.returnDate).setHours(0,0,0,0);
            if (fromdate > toDate) {
                swal("Please select future date") ;
                this.setState({
                  pickupDate:this.state.returnDate
                })
            }
          }
          var array = {
            from    : this.state.from,
            fromAddress1    : this.state.address1,
          fromPincode    : this.state.fromPincode,
          toAddress1    : this.state.toaddress1,
          toPincode    : this.state.toPincode,
            pickupDate : this.state.pickupDate,
            pickupTime : moment(this.state.fromTime).format('HH:mm'),
            returnDate : this.state.returnDate,
            to         : this.state.to,
            returnTime : moment(this.state.toTime).format('HH:mm'),
            bookingType : this.state.bookingType,
            purposeOfTravel: this.state.purposeOfTravel,
            purposeOfTravelOther: this.state.purposeOfTravelOther,
            instructions  :this.state.instructions,
            selectedVehicle  :this.state.selectedVehicle,
            reasonForSelectingVehicle  :this.state.reasonForSelectingVehicle,
            stopArr : this.state.stopArr,
            // brand:this.state.brand,
            // model:this.state.model,
            // capacity:this.state.capacity,
          }

          this.setState({
            tripArray : array,
            noOfdays  : parseInt(this.noOfdays(this.state.pickupDate, this.state.returnDate))+1,
          },()=>{
            if(this.state.noOfdays > 1){
              this.setState({bookingType : "Outstation"})
            }else{
          this.setState({bookingType : "Local"})
        }
          })
        });
        
    }

    

    handleChangePlaces = address => {
      var array = {
          returnDate : this.state.returnDate,
          from    : address,
          fromAddress1    : this.state.address1,
          fromPincode    : this.state.fromPincode,
          toAddress1    : this.state.toaddress1,
          toPincode    : this.state.toPincode,
          pickupDate : this.state.pickupDate,
          pickupTime : moment(this.state.fromTime).format('HH:mm'),
          to         : this.state.to,
          returnTime : moment(this.state.toTime).format('HH:mm'),
          bookingType : this.state.bookingType,
          purposeOfTravel: this.state.purposeOfTravel,
          purposeOfTravelOther: this.state.purposeOfTravelOther,
          instructions  :this.state.instructions,
          selectedVehicle  :this.state.selectedVehicle,
          reasonForSelectingVehicle  :this.state.reasonForSelectingVehicle,
          stopArr : this.state.stopArr,
          // brand:this.state.brand,
          // model:this.state.model,
          // capacity:this.state.capacity,
        }
    this.setState({ from : address, tripArray : array });
  };

  handleChangeToPlaces = to => {
    // this.getGoogleAPIKey()

    var array = {
          returnDate : this.state.returnDate,
          from    : this.state.from,
          fromAddress1    : this.state.address1,
          fromPincode    : this.state.fromPincode,
          toAddress1    : this.state.toaddress1,
          toPincode    : this.state.toPincode,
          pickupDate : this.state.pickupDate,
          pickupTime : moment(this.state.fromTime).format('HH:mm'),
          to         : to,
          returnTime : moment(this.state.toTime).format('HH:mm'),
          bookingType : this.state.bookingType,
          purposeOfTravel: this.state.purposeOfTravel,
          purposeOfTravelOther: this.state.purposeOfTravelOther,
          instructions  :this.state.instructions,
          selectedVehicle  :this.state.selectedVehicle,
          reasonForSelectingVehicle  :this.state.reasonForSelectingVehicle,
          stopArr : this.state.stopArr,
          // brand:this.state.brand,
          // model:this.state.model,
          // capacity:this.state.capacity,
        }
    this.setState({ to : to , tripArray : array });
  };

  handleChangeStopPlaces = stops => {
    var array = {
          returnDate : this.state.returnDate,
          from    : this.state.from,
          fromAddress1    : this.state.address1,
          fromPincode    : this.state.fromPincode,
          toAddress1    : this.state.toaddress1,
          toPincode    : this.state.toPincode,
          pickupDate : this.state.pickupDate,
          pickupTime : moment(this.state.fromTime).format('HH:mm'),
          stops         : stops,
          returnTime : moment(this.state.toTime).format('HH:mm'),
          bookingType : this.state.bookingType,
          purposeOfTravel: this.state.purposeOfTravel,
          purposeOfTravelOther: this.state.purposeOfTravelOther,
          instructions  :this.state.instructions,
          selectedVehicle  :this.state.selectedVehicle,
          reasonForSelectingVehicle  :this.state.reasonForSelectingVehicle,
          stopArr : this.state.stopArr,
          // brand:this.state.brand,
          // model:this.state.model,
          // capacity:this.state.capacity,
        }
    this.setState({ stops : stops , tripArray : array });
  };
 
  handleSelect = address => {

    geocodeByAddress(address)
     .then((results) =>{ 

      for (var i = 0; i < results[0].address_components.length; i++) {
          for (var b = 0; b < results[0].address_components[i].types.length; b++) {
              switch (results[0].address_components[i].types[b]) {
                  case 'sublocality_level_1':
                      var area = results[0].address_components[i].long_name;
                      break;
                  case 'sublocality_level_2':
                      var area = results[0].address_components[i].long_name;
                      break;
                  case 'locality':
                      var city = results[0].address_components[i].long_name;
                      break;
                  case 'administrative_area_level_2':
                      var district = results[0].address_components[i].long_name;
                      break;
                  case 'administrative_area_level_1':
                      var state = results[0].address_components[i].long_name;
                      break;
                  case 'country':
                     var country = results[0].address_components[i].long_name;
                      break;
                  case 'postal_code':
                     var pincode = results[0].address_components[i].long_name;
                      break;
              }
          }
      }

      this.setState({
        fromArea : area,
        fromCity : city,
        fromDistrict : district,
        fromState: state,
        fromCountry:country,
        fromPincode: pincode
      })

        })
     
      .catch(error => console.error('Error', error));

      geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.setState({'fromLatLng': latLng}))
      .catch(error => console.error('Error', error));
      var array = {
          returnDate : this.state.returnDate,
          from    : address,
          fromAddress1    : this.state.address1,
          fromPincode    : this.state.fromPincode,
          toAddress1    : this.state.toaddress1,
          toPincode    : this.state.toPincode,
          pickupDate : this.state.pickupDate,
          pickupTime : moment(this.state.fromTime).format('HH:mm'),
          to         : this.state.to,
          returnTime : moment(this.state.toTime).format('HH:mm'),
          bookingType : this.state.bookingType,
          purposeOfTravel: this.state.purposeOfTravel,
          purposeOfTravelOther: this.state.purposeOfTravelOther,
          instructions  :this.state.instructions,
          selectedVehicle  :this.state.selectedVehicle,
          reasonForSelectingVehicle  :this.state.reasonForSelectingVehicle,
          stopArr : this.state.stopArr,
          // brand:this.state.brand,
          // model:this.state.model,
          // capacity:this.state.capacity,
        }
      this.setState({ from : address , tripArray : array });
  };

  handleSelectToAddr = to => {
    geocodeByAddress(to)
      .then((results) =>{ 

      for (var i = 0; i < results[0].address_components.length; i++) {
          for (var b = 0; b < results[0].address_components[i].types.length; b++) {
              switch (results[0].address_components[i].types[b]) {
                  case 'sublocality_level_1':
                      var area = results[0].address_components[i].long_name;
                      break;
                  case 'sublocality_level_2':
                      var area = results[0].address_components[i].long_name;
                      break;
                  case 'locality':
                      var city = results[0].address_components[i].long_name;
                      break;
                  case 'administrative_area_level_2':
                      var district = results[0].address_components[i].long_name;
                      break;
                  case 'administrative_area_level_1':
                      var state = results[0].address_components[i].long_name;
                      break;
                  case 'country':
                     var country = results[0].address_components[i].long_name;
                      break;
                  case 'postal_code':
                     var pincode = results[0].address_components[i].long_name;
                      break;
              }
          }
      }
      this.setState({
        toArea : area,
        toCity : city,
        toDistrict : district,
        toState: state,
        toCountry:country,
        toPincode: pincode
      })
       
        })
      .catch(error => console.error('Error', error));

      geocodeByAddress(to)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.setState({'toLatLng': latLng}))
      .catch(error => console.error('Error', error));
      var array = {
          returnDate : this.state.returnDate,
          from    : this.state.from,
          fromAddress1    : this.state.address1,
          fromPincode    : this.state.fromPincode,
          toAddress1    : this.state.toAddress1,
          toPincode    : this.state.toPincode,
          fromAddress1    : this.state.address1,
          fromPincode    : this.state.fromPincode,
          toAddress1    : this.state.toaddress1,
          toPincode    : this.state.toPincode,
          pickupDate : this.state.pickupDate,
          pickupTime : moment(this.state.fromTime).format('HH:mm'),
          to         : to,
          returnTime : moment(this.state.toTime).format('HH:mm'),
          bookingType : this.state.bookingType,
          purposeOfTravel: this.state.purposeOfTravel,
          purposeOfTravelOther: this.state.purposeOfTravelOther,
          instructions  :this.state.instructions,
          selectedVehicle  :this.state.selectedVehicle,
          reasonForSelectingVehicle  :this.state.reasonForSelectingVehicle,
          stopArr : this.state.stopArr,
          // brand:this.state.brand,
          // model:this.state.model,
          // capacity:this.state.capacity,
        }
      this.setState({ to : to , tripArray : array });
  };

  handleSelectStopAddr = stops => {

      geocodeByAddress(stops)
      .then((results) =>{ 

      for (var i = 0; i < results[0].address_components.length; i++) {
          for (var b = 0; b < results[0].address_components[i].types.length; b++) {
              switch (results[0].address_components[i].types[b]) {
                  case 'sublocality_level_1':
                      var area = results[0].address_components[i].long_name;
                      break;
                  case 'sublocality_level_2':
                      var area = results[0].address_components[i].long_name;
                      break;
                  case 'locality':
                      var city = results[0].address_components[i].long_name;
                      break;
                  case 'administrative_area_level_1':
                      var state = results[0].address_components[i].long_name;
                      break;
                  case 'country':
                     var country = results[0].address_components[i].long_name;
                      break;
                  case 'postal_code':
                     var pincode = results[0].address_components[i].long_name;
                      break;
              }
          }
      }

      this.setState({
        stopArea : area,
        stopCity : city,
        stopState: state,
        stopCountry:country,
        stopPincode: pincode,
        // stops : stops
      })
       
        })
      .catch(error => console.error('Error', error));

      geocodeByAddress(stops)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.setState({'stopLatLng': latLng}))
      .catch(error => console.error('Error', error));
      var stopArr = this.state.stopArr;
      if(stops != "")
        {
            if(stops != undefined)
            {
                // stopArr.push(this.state.stops);
                stopArr.push({
                  address        : stops,
                  area           : this.state.stopArea,
                  city           : this.state.stopCity,
                  state          : this.state.stopState,
                  country        : this.state.stopCountry,
                  pincode        : this.state.stopPincode, 
                  latitude       : this.state.stopLatLng.lat,
                  longitude      : this.state.stopLatLng.lng,
                });
            }

            var array = {
              returnDate : this.state.returnDate,
              from    : this.state.from,
              fromAddress1    : this.state.address1,
              fromPincode    : this.state.fromPincode,
              toAddress1    : this.state.toaddress1,
              toPincode    : this.state.toPincode,
              pickupDate : this.state.pickupDate,
              pickupTime : moment(this.state.fromTime).format('HH:mm'),
              to         : this.state.to,
              returnTime : moment(this.state.toTime).format('HH:mm'),
              bookingType : this.state.bookingType,
              purposeOfTravel: this.state.purposeOfTravel,
              purposeOfTravelOther: this.state.purposeOfTravelOther,
              instructions  :this.state.instructions,
              selectedVehicle  :this.state.selectedVehicle,
              reasonForSelectingVehicle  :this.state.reasonForSelectingVehicle,
              stopArr : stopArr,
          //     brand:this.state.brand,
          // model:this.state.model,
          // capacity:this.state.capacity,
            }
            this.setState({
                stopArr : stopArr,
                stops   : "",
                display : true,
                stopArea   : "",
                stopCity   : "",
                stopState  : "",
                stopCountry: "",
                stopPincode: "",
                stopLatLng : [],
                tripArray:array,
                showAddStop : false
            })
        }
      
  };


  getStops = stops =>{
    var stopArr = this.state.stopArr;
      if(stops != "")
        {
            if(stops != undefined)
            {
                // stopArr.push(this.state.stops);
                stopArr.push({
                  address        : this.state.stops,
                });
            }

            var array = {
              returnDate : this.state.returnDate,
              from    : this.state.from,
              fromAddress1    : this.state.address1,
              fromPincode    : this.state.fromPincode,
              toAddress1    : this.state.toaddress1,
              toPincode    : this.state.toPincode,
              pickupDate : this.state.pickupDate,
              pickupTime : moment(this.state.fromTime).format('HH:mm'),
              to         : this.state.to,
              returnTime : moment(this.state.toTime).format('HH:mm'),
              bookingType : this.state.bookingType,
              purposeOfTravel: this.state.purposeOfTravel,
              purposeOfTravelOther: this.state.purposeOfTravelOther,
              instructions  :this.state.instructions,
              selectedVehicle  :this.state.selectedVehicle,
              reasonForSelectingVehicle  :this.state.reasonForSelectingVehicle,
              stopArr : stopArr,
          //     brand:this.state.brand,
          // model:this.state.model,
          // capacity:this.state.capacity,
            }
            this.setState({
                stopArr : stopArr,
                stops   : "",
                display : true,
                tripArray:array,
                showAddStop : false
            })
        }
  }

    
    _handleFocus(text) {
        console.log('Focused with text: ' + text);
    }
 
    _handleFocusOut(text) {
        console.log('Left editor with text: ' + text);
        
    }

    getPackageData(id){
      var company_id = this.state.corporateId
      var bookingType = this.state.bookingType
      var packageTypeId = this.state.packageTypeId
      var city = this.state.fromCity
      var district = this.state.fromDistrict
      var vehicleCategoryId = id
      var formvalues = {
        company_id : company_id,
        bookingType : bookingType,
        packageTypeId : packageTypeId,
        city : city,
        district : district,
        vehicleCategoryId : vehicleCategoryId
      }
      console.log('formvalues==>',formvalues)
      axios.post('/api/contract/get/packageData',formvalues)
        .then((response) => {
          console.log('package data===>: ',response)
          console.log('package data2===>: ',response.data)
          if(response.data && response.data.length > 0){
            console.log('response.data 0==>',response.data[0])
            console.log('response.data 2==>',response.data[2])
            if(response.data[0] && response.data[0].length > 0){
             this.setState({
              contractData  : response.data[0],
              contractId  : response.data[1],
              showPackages  : true
             }) 
            }

            if(response.data[2] && response.data[2].length > 0){
             this.setState({
              contractData  : response.data[2],
              contractId  : response.data[3],
              showPackages  : true
             }) 
            }
          
          
          }else{
            swal('No package for this city class and vehicle found! Please contact Admin.')
          }
        })
        .catch((error) => {
          console.log('error: ',error)
        }) 

    }

    getCarData(val,id,event){
      var classVar = '.'+id
      
      $('.item').removeClass('itemSelected');
       $(classVar).addClass("itemSelected");
      var data = val;
      var array = {
          returnDate : this.state.returnDate,
          from    : this.state.from,
          fromAddress1    : this.state.address1,
          fromPincode    : this.state.fromPincode,
          toAddress1    : this.state.toaddress1,
          toPincode    : this.state.toPincode,
          pickupDate : this.state.pickupDate,
          pickupTime : moment(this.state.fromTime).format('HH:mm'),
          to         : this.state.to,
          returnTime : moment(this.state.toTime).format('HH:mm'),
          bookingType : this.state.bookingType,
          purposeOfTravel: this.state.purposeOfTravel,
          purposeOfTravelOther: this.state.purposeOfTravelOther,
          instructions  :this.state.instructions,
          reasonForSelectingVehicle  :this.state.reasonForSelectingVehicle,
          selectedVehicle  :data,
          // brand:brand,
          // model:model,
          // capacity:capacity,
          stopArr : this.state.stopArr
      }

      this.setState({
        showreasonForSelectingVehicle : false,
        approvalRequired:'No',
        totalParameterValue : 0,
        contractData  : [],
        contractId  : "",
        showPackages  : true,
        package: "",
        packageId  : "",
        estimatedCost : "",
      })

      this.getPackageData(id)

        var vehicleData = {
          empCategory : this.state.empCategory,
          vehicleCategory : id,
          company:localStorage.getItem("companyID")
        }
        axios.post('/api/VehicleEmployeeMapping/getVehicleData',vehicleData) 
        .then((response)=>{
          if(response.data.length == 0){
            swal("This vehicle category is not allowed to you. However, you can book the car, but it will go for manager approval.Please enter the reason for selecting this category")
            this.setState({
              showreasonForSelectingVehicle : true,
              approvalRequired:"Yes",
            })
            // this.getManagerData(this.state.managerID1)
          }
        })
        .catch((err)=>{
          swal("Vehicle category and employee category mapping not done yet "+err)
        })


      this.setState({
        selectedVehicle : data,
        vehicleCategoryId: id,
        // vehicleID : id,``
        tripArray : array,
      })

       this.checkApprovalrequired()

    }

 
   checkApprovalrequired(){
    
      axios.get("/api/personmaster/getUserByUserId/"+this.state.employeeUserId)
      .then((response)=>{
        console.log('response.data.data[0]=>',response.data.data[0])
          if(response.data.data[0].bookingApprovalRequired == 'Yes'){
            var fromDate = this.state.pickupDate
            var yyyy = moment(fromDate).format("YYYY");
            var monthNum = moment(fromDate).format("MM");
            var currentMonth = yyyy+"-"+monthNum;
            var monthDateStart = new Date(moment(currentMonth).month("YYYY-MM"));//Find out first day of month with currentMonth
            var monthDateEnd = new Date(moment(currentMonth).add(1,"M"));

            var totalValues = parseFloat(response.data.data[0].preApprovedAmount)+parseFloat(response.data.data[0].preApprovedRides)+parseFloat(response.data.data[0].preApprovedKilometer)
            console.log('totalValues=>',totalValues)
            if(totalValues > 0){
              if(parseFloat(response.data.data[0].preApprovedAmount) > 0){
                console.log('amt')
                var preApprovedParameter = 'preApprovedAmount'
                var preApprovedParameterValue = response.data.data[0].preApprovedAmount
                
              }else if(parseFloat(response.data.data[0].preApprovedRides) > 0){
                console.log('rides')
                var preApprovedParameter = 'preApprovedRides'
                var preApprovedParameterValue = response.data.data[0].preApprovedRides
               
              }else if(parseFloat(response.data.data[0].preApprovedKilometer) > 0){
                console.log('km')
                var preApprovedParameter = 'preApprovedKilometer'
                var preApprovedParameterValue = response.data.data[0].preApprovedKilometer
                
              }
              var formvalues = {
                start : monthDateStart,
                end: monthDateEnd,
                parameter : preApprovedParameter,
                user: this.state.userID
              }
              console.log('compare parameter formvalues=>',formvalues)
              this.comparePreapprovedValues(preApprovedParameterValue,formvalues)
            }else{
              this.setState({
                approvalRequired: 'Yes',
              })
            }
            // 
          }
          if(this.state.showreasonForSelectingVehicle === true){
            this.setState({
              approvalRequired: 'Yes',
            })
          }
      })
      .catch((err)=>{
        console.log(err)
      })
  }

  comparePreapprovedValues(preApprovedParameterValue,formvalues){
    axios.post('/api/bookingmaster/getparameterdata',formvalues)
      .then((response)=>{
        console.log('=====================')
        console.log('res parameter====>',response)
        console.log('preApprovedParameterValue====>',preApprovedParameterValue)
        console.log('res parameter====>',response.data ,response.data.length)
        console.log('this.state.totalParameterValue=>',this.state.totalParameterValue)
        if(response.data && response.data.length > 0){
          console.log(parseFloat(preApprovedParameterValue) < parseFloat(response.data[0]))
          console.log(parseFloat(preApprovedParameterValue) +'<'+ parseFloat(response.data[0]))
          if(parseFloat(preApprovedParameterValue) <= parseFloat(response.data[0])){
            this.setState({
              approvalRequired: 'Yes',
            })
          }
        }
        console.log('=========END============')
      })
      .catch((error)=>{
        console.log(error)
      })
  }
    
    getData(event){
    event.preventDefault();
      if ($('#BasicInfo').valid()) {
         
          var userID = localStorage.getItem("user_ID");
          if(this.state.approvalRequired == 'Yes'){
            var statusValue = 'New'
          }else{
            var statusValue = 'Manager Approved'
          }
          var formValues={
            packageTypeId           : this.state.packageTypeId,
            packageId               : this.state.packageId,
            package                 : this.state.package,
            contractId              : this.state.contractId,
            tripType                : this.state.bookingType,
            pickupFrom              : this.state.radioButtonValue,
            from                    : {
                                        address1        : this.state.address1,
                                        address        : this.state.from,
                                        area           : this.state.fromArea,
                                        city           : this.state.fromCity,
                                        district           : this.state.fromDistrict,
                                        state          : this.state.fromState,
                                        country        : this.state.fromCountry,
                                        pincode        : this.state.fromPincode, 
                                        latitude       : this.state.fromLatLng ? this.state.fromLatLng.lat : "",
                                        longitude      : this.state.fromLatLng ? this.state.fromLatLng.lng : "",
                                      },
            to                      : {
                                        address1        : this.state.toaddress1,
                                        address        : this.state.to,
                                        area           : this.state.toArea,
                                        city           : this.state.toCity,
                                        district           : this.state.toDistrict,
                                        state          : this.state.toState,
                                        country        : this.state.toCountry,
                                        pincode        : this.state.toPincode,
                                        latitude       : this.state.toLatLng ? this.state.toLatLng.lat : "",
                                        longitude      : this.state.toLatLng ? this.state.toLatLng.lng : "",
                                      },
            pickupDate              : this.state.pickupDate,
            pickupTime              : moment(this.state.fromTime).format('HH:mm'),
            returnDate              : this.state.returnDate,
            returnTime              : moment(this.state.toTime).format('HH:mm'),
            intermediateStops       : this.state.stopArr,
            employeeId              : this.state.userID,
            employeeUserId              : this.state.employeeUserId,
            empId              : this.state.empId,
            employeeName              : this.state.employeeName,
            departmentId              : this.state.departmentId,
            corporateId             : this.state.corporateId,
            managerId1               : this.state.managerId1,
            managerId2               : this.state.managerId2,
            managerId3               : this.state.managerId3,
            managerID1               : this.state.managerID1,
            managerID2               : this.state.managerID2,
            managerID3               : this.state.managerID3,
            approvalRequired        : this.state.approvalRequired,
            approver1exist        : this.state.approver1exist,
            approver2exist        : this.state.approver2exist,
            approver3exist        : this.state.approver3exist,
            estimatedCost           : this.state.estimatedCost,
            status                  : {
                                    value           : "New",
                                    statusBy        : userID,
                                    allocatedTo     : this.state.managerId1,
                                    statusAt        : new Date(),
                                },
            statusValue             : statusValue,
            createdBy               : localStorage.getItem("user_ID"),
            purposeOfTravel         : this.state.purposeOfTravel,
            purposeOfTravelOther    : this.state.purposeOfTravelOther,
            specialInstruction      :this.state.instructions,
            selectedVehicle         :this.state.selectedVehicle,
            vehicleCategoryId       : this.state.vehicleCategoryId,
            vehicleID               : this.state.vehicleID,
            browser               : 'Web',
            reasonForSelectingVehicle : this.state.reasonForSelectingVehicle
        }

          console.log('formValues: ',formValues)
          
          axios.post('/api/bookingmaster/post' , formValues)
          .then((response)=>{
                axios.get("/api/personmaster/get/ID/"+this.state.userID)
                .then((userData) => {

                  var sendData = {
                  "event": "Event9",
                  "toUser_id": this.state.employeeUserId,
                  "toUserRole":"employee",
                  "company_id": this.state.corporateId,
                  "intendedUser_id": this.state.managerId1,
                  "intendedUserRole":'manager',
                  "otherAdminRole":"corporateadmin",
                  "variables": {
                    "EmployeeName" : userData.data.data[0].firstName +' '+userData.data.data[0].lastName,
                    "managerName" : this.state.manager1Name,
                    "manager2Name" : this.state.manager2Name,
                    "manager3Name" : this.state.manager3Name,
                    "EmployeeID" : userData.data.data[0].employeeId,
                    "managerID" : this.state.managerID1,
                    "manager2ID" : this.state.managerID2,
                    "manager3ID" : this.state.managerID3,
                    "pickUpLocation" : this.state.from,
                    "dropLocation" : this.state.to,
                    "FromDateTime" : moment(this.state.pickupDate).format('DD-MMM-YY') +' '+ moment(this.state.fromTime).format('LT'),
                    "ToDateTime" : moment(this.state.returnDate).format('DD-MMM-YY') +' '+ moment(this.state.toTime).format('LT'),
                    }
                  }
                  console.log('sendDataToUser==>', sendData)
                  axios.post('/api/masternotifications/post/sendNotification', sendData)
                  .then((res) => {
                  console.log('sendDataToUser in result==>>>', res.data)
                  })
                  .catch((error) => { console.log('notification error: ',error)})

                  //Dynamic Allocate To Vendor//
                  if(statusValue === 'Manager Approved'){
                    var city = response.data.data.from.city
                    var district = response.data.data.from.district
                    axios.get('/api/bookingmaster/get/AllocateToVendor/'+response.data.bookingId+'/'+city+'/'+district+'/'+localStorage.getItem("user_ID"))
                    .then((vendorRes)=>{
                      console.log('AllocateToVendor=>',vendorRes)
                      if(vendorRes && vendorRes.data != ""){
                          console.log('inside vendorRes')
                          var vendor_id = vendorRes.data;
                          axios.get('/api/bookingmaster/get/vendor/'+response.data.bookingId)
                          .then((result)=>{
                              var sendData = {
                                  "event": "Event13",
                                  "toUser_id": result.data.employeeID,
                                  "toUserRole":"employee",
                                  "company_id": vendor_id,
                                  "otherAdminRole":'vendoradmin',
                                  "variables": {
                                    "VendorName" : result.data.vendorDetails.profile.fullName,
                                    "companyName" : result.data.vendorDetails.profile.companyName,
                                    "contactNo":result.data.vendorDetails.profile.mobile,
                                    "EmployeeName" : result.data.firstName +' '+result.data.lastName,
                                    "EmployeeID" : result.data.employeeId,
                                    "BookingID":result.data.bookingId,
                                    "Pickup":result.data.from,
                                    "Drop":result.data.to,
                                    "PickupDate":moment(result.data.pickupDate).format('DD/MM/YYYY'),
                                    "ReturnDate":moment(result.data.returnDate).format('DD/MM/YYYY'),
                                  }
                              }
                              console.log('sendDataToUser==>', sendData)
                              axios.post('/api/masternotifications/post/sendNotification', sendData)
                              .then((res) => {
                                console.log('sendDataToUser in result==>>>', res.data)
                              })
                              .catch((error) => { console.log('notification error: ',error)})
                              this.setState({
                                returnDate : "",
                                from    : this.state.from,
                                pickupDate : this.state.pickupDate,
                                pickupTime : "",
                                returnDate : this.state.returnDate,
                                noOfdays  : parseInt(this.noOfdays(this.state.pickupDate, this.state.returnDate))+1,
                                to         : "",
                                returnTime : "",
                                bookingType : "Outstation",
                                showbookingForOther:false,
                                isBookingForOther:false,
                                otherPurpose:false,
                                purposeOfTravel: "",
                                purposeOfTravelOther: "",
                                instructions  :"",
                                selectedVehicle  :"",
                                stopArr : [],
                                stops:"",
                                fromArea                : "",
                                address1                : "",
                                fromCity                : "",
                                fromDistrict                : "",
                                fromState               : "",
                                fromCountry             : "",
                                fromPincode             : "",
                                fromLatLng              : [],
                                toLatLng                : [],
                                stopLatLng              : [],
                                toaddress1                  : "",
                                toArea                  : "",
                                toCity                  : "",
                                toDistrict                  : "",
                                toState                 : "",
                                toCountry               : "",
                                toPincode               : "",
                                stopArea                  : "",
                                stopCity                  : "",
                                stopState                 : "",
                                stopCountry               : "",
                                stopPincode               : "",
                                reasonForSelectingVehicle:"",
                                vehicleID:"",
                                contractId:"",
                                packageTypeId:"",
                                packageId:"",
                                package:"",
                                managerId1:"",
                                managerId2:"",
                                managerId3:"",
                                managerID1:"",
                                managerID2:"",
                                managerID3:"",
                                manager1Name:"",
                                manager2Name:"",
                                manager3Name:"",
                                manager1Contact: "",
                                manager2Contact: "",
                                manager3Contact: "",
                                manager1ID:"",
                                manager2ID:"",
                                manager3ID:"",
                                approvalRequired:"",
                                approver1exist:"",
                                approver2exist:"",
                                approver3exist:"",
                                employeeId:"",
                                employeeUserId:"",
                                empId:"",
                                employeeName:"",
                                departmentId:"",
                                corporateId:"",
                                radioButtonValue:"Home"
                              })
                            var stopArr  = [];
                            this.props.history.push('/booking-details');

                      })
                      .catch((error)=>{console.log(error)})
                    
                      }else{
                        console.log('else vendorRes')
                       this.setState({
                          returnDate : "",
                          from    : this.state.from,
                          pickupDate : this.state.pickupDate,
                          pickupTime : "",
                          returnDate : this.state.returnDate,
                          noOfdays  : parseInt(this.noOfdays(this.state.pickupDate, this.state.returnDate))+1,
                          to         : "",
                          returnTime : "",
                          bookingType : "Outstation",
                          showbookingForOther:false,
                          isBookingForOther:false,
                          otherPurpose:false,
                          purposeOfTravel: "",
                          purposeOfTravelOther: "",
                          instructions  :"",
                          selectedVehicle  :"",
                          stopArr : [],
                          stops:"",
                          fromArea                : "",
                          address1                : "",
                          fromCity                : "",
                          fromDistrict                : "",
                          fromState               : "",
                          fromCountry             : "",
                          fromPincode             : "",
                          fromLatLng              : [],
                          toLatLng                : [],
                          stopLatLng              : [],
                          toaddress1                  : "",
                          toArea                  : "",
                          toCity                  : "",
                          toDistrict                  : "",
                          toState                 : "",
                          toCountry               : "",
                          toPincode               : "",
                          stopArea                  : "",
                          stopCity                  : "",
                          stopState                 : "",
                          stopCountry               : "",
                          stopPincode               : "",
                          reasonForSelectingVehicle:"",
                          vehicleID:"",
                          contractId:"",
                          packageTypeId:"",
                          packageId:"",
                          package:"",
                          managerId1:"",
                          managerId2:"",
                          managerId3:"",
                          managerID1:"",
                          managerID2:"",
                          managerID3:"",
                          manager1Name:"",
                          manager2Name:"",
                          manager3Name:"",
                          manager1Contact: "",
                          manager2Contact: "",
                          manager3Contact: "",
                          manager1ID:"",
                          manager2ID:"",
                          manager3ID:"",
                          approvalRequired:"",
                          approver1exist:"",
                          approver2exist:"",
                          approver3exist:"",
                          employeeId:"",
                          employeeUserId:"",
                          empId:"",
                          employeeName:"",
                          departmentId:"",
                          corporateId:"",
                          radioButtonValue:"Home"
                        })
                            var stopArr  = [];
                      this.props.history.push('/booking-details');
                    }
                    })
                    .catch((error)=>{

                    })
                    this.props.history.push('/booking-details');
                    
                  }else{
                    axios.get("/api/personmaster/get/ID/"+this.state.userID)
                    .then((userData) => {

                      var sendData = {
                      "event": "Event9",
                      "company_id": this.state.corporateId,
                      "intendedUser_id": this.state.managerId1,
                      "intendedUserRole":'manager',
                      "variables": {
                        "EmployeeName" : userData.data.data[0].firstName +' '+userData.data.data[0].lastName,
                        "managerName" : this.state.manager1Name,
                        "manager2Name" : this.state.manager2Name,
                        "manager3Name" : this.state.manager3Name,
                        "EmployeeID" : userData.data.data[0].employeeId,
                        "managerID" : this.state.managerID1,
                        "manager2ID" : this.state.managerID2,
                        "manager3ID" : this.state.managerID3,
                        "pickUpLocation" : this.state.from,
                        "dropLocation" : this.state.to,
                        "FromDateTime" : moment(this.state.pickupDate).format('DD-MMM-YY') +' '+ moment(this.state.fromTime).format('LT'),
                        "ToDateTime" : moment(this.state.returnDate).format('DD-MMM-YY') +' '+ moment(this.state.toTime).format('LT'),
                        }
                      }
                      console.log('sendDataToUser==>', sendData)
                      axios.post('/api/masternotifications/post/sendNotification', sendData)
                      .then((res) => {
                      console.log('sendDataToUser in result==>>>', res.data)
                      })
                      .catch((error) => { console.log('notification error: ',error)})
                      })
                    .catch((error)=>{

                    })
                    this.setState({
                      returnDate : "",
                      from    : this.state.from,
                      pickupDate : this.state.pickupDate,
                      pickupTime : "",
                      returnDate : this.state.returnDate,
                      noOfdays  : parseInt(this.noOfdays(this.state.pickupDate, this.state.returnDate))+1,
                      to         : "",
                      returnTime : "",
                      bookingType : "Outstation",
                      showbookingForOther:false,
                      isBookingForOther:false,
                      otherPurpose:false,
                      purposeOfTravel: "",
                      purposeOfTravelOther: "",
                      instructions  :"",
                      selectedVehicle  :"",
                      stopArr : [],
                      stops:"",
                      fromArea                : "",
                      address1                : "",
                      fromCity                : "",
                      fromDistrict                : "",
                      fromState               : "",
                      fromCountry             : "",
                      fromPincode             : "",
                      fromLatLng              : [],
                      toLatLng                : [],
                      stopLatLng              : [],
                      toaddress1                  : "",
                      toArea                  : "",
                      toCity                  : "",
                      toDistrict                  : "",
                      toState                 : "",
                      toCountry               : "",
                      toPincode               : "",
                      stopArea                  : "",
                      stopCity                  : "",
                      stopState                 : "",
                      stopCountry               : "",
                      stopPincode               : "",
                      reasonForSelectingVehicle:"",
                      vehicleID:"",
                      contractId:"",
                      packageTypeId:"",
                      package:"",
                      packageId:"",
                      managerId1:"",
                      managerId2:"",
                      managerId3:"",
                      managerID1:"",
                      managerID2:"",
                      managerID3:"",
                      manager1Name:"",
                      manager2Name:"",
                      manager3Name:"",
                      manager1Contact: "",
                      manager2Contact: "",
                      manager3Contact: "",
                      manager1ID:"",
                      manager2ID:"",
                      manager3ID:"",
                      approvalRequired:"",
                      approver1exist:"",
                      approver2exist:"",
                      approver3exist:"",
                      employeeId:"",
                      employeeUserId:"",
                      empId:"",
                      employeeName:"",
                      departmentId:"",
                      corporateId:"",
                      radioButtonValue:"Home"
                    })
                        var stopArr  = [];
                  this.props.history.push('/booking-details'); 
                  }
                  
                })
                .catch((err)=>{console.log('user error: ',err)})
            
            this.getPackageType()    
          })
          .catch((error)=>{console.log('error: ',error)
            swal(error)})
      }else {
        $(event.target).parent().parent().parent().find('.errorinputText .error:first').focus();
      }

    }

  updateData(event){
    event.preventDefault();
      if ($('#BasicInfo').valid()) {
        if(this.state.approvalRequired == 'Yes'){
            var statusValue = 'Edited'
          }else{
            var statusValue = 'Edited Manager Approved'
          }
        var userID = localStorage.getItem("user_ID")
        var formValues={
            bookingID               : this.state.booking_id,
            packageTypeId           : this.state.packageTypeId,
            packageId               : this.state.packageId,
            package                 : this.state.package,
            contractId              : this.state.contractId,
            tripType                : this.state.bookingType,
            pickupFrom              : this.state.radioButtonValue,
            from                    : {
                                        address1        : this.state.address1,
                                        address        : this.state.from,
                                        area           : this.state.fromArea,
                                        city           : this.state.fromCity,
                                        district           : this.state.fromDistrict,
                                        state          : this.state.fromState,
                                        country        : this.state.fromCountry,
                                        pincode        : this.state.fromPincode, 
                                        latitude       : this.state.fromLatLng ? this.state.fromLatLng.lat : "",
                                        longitude      : this.state.fromLatLng ? this.state.fromLatLng.lng : "",
                                      },
            to                      : {
                                        address1        : this.state.toaddress1,
                                        address        : this.state.to,
                                        area           : this.state.toArea,
                                        city           : this.state.toCity,
                                        district           : this.state.toDistrict,
                                        state          : this.state.toState,
                                        country        : this.state.toCountry,
                                        pincode        : this.state.toPincode,
                                        latitude       : this.state.toLatLng ? this.state.toLatLng.lat : "",
                                        longitude      : this.state.toLatLng ? this.state.toLatLng.lng : "",
                                      },
            pickupDate              : this.state.pickupDate,
            pickupTime              : moment(this.state.fromTime).format('HH:mm'),
            returnDate              : this.state.returnDate,
            returnTime              : moment(this.state.toTime).format('HH:mm'),
            intermediateStops       : this.state.stopArr,
            employeeId              : this.state.userID,
            employeeUserId              : this.state.employeeUserId,
            empId              : this.state.empId,
            employeeName              : this.state.employeeName,
            departmentId              : this.state.departmentId,
            corporateId             : this.state.corporateId,
            managerId1               : this.state.managerId1,
            managerId2               : this.state.managerId2,
            managerId3               : this.state.managerId3,
            managerID1               : this.state.managerID1,
            managerID2               : this.state.managerID2,
            managerID3               : this.state.managerID3,
            approvalRequired         : this.state.approvalRequired,
            approver1exist         : this.state.approver1exist,
            approver2exist         : this.state.approver2exist,
            approver3exist         : this.state.approver3exist,
            estimatedCost           : this.state.estimatedCost,
            purposeOfTravel         : this.state.purposeOfTravel,
            purposeOfTravelOther    : this.state.purposeOfTravelOther,
            specialInstruction      :this.state.instructions,
            selectedVehicle         :this.state.selectedVehicle,
            vehicleCategoryId       : this.state.vehicleCategoryId,
            vehicleID               : this.state.vehicleID,
            browser               : 'Web',
            reasonForSelectingVehicle : this.state.reasonForSelectingVehicle,
            status                  : {
                                    value           : statusValue,
                                    statusBy        : userID,
                                    allocatedTo     : this.state.managerId1,
                                    statusAt        : new Date(),
                                },
            statusValue             : statusValue,
            updatedBy               : localStorage.getItem("user_ID")
        }
          axios.patch('/api/bookingmaster/patch' , formValues)
          .then((response)=>{
             this.setState({
                from    : this.state.from,
                pickupDate : this.state.pickupDate,
                pickupTime : "",
                returnDate : this.state.returnDate,
                noOfdays  : parseInt(this.noOfdays(this.state.pickupDate, this.state.returnDate))+1,
                to         : "",
                returnTime : "",
                bookingType : "Outstation",
                showbookingForOther:false,
                isBookingForOther:false,
                otherPurpose:false,
                purposeOfTravel: "",
                purposeOfTravelOther: "",
                instructions  :"",
                selectedVehicle  :"",
                stopArr : [],
                stops:"",
                address1                : "",
                fromArea                : "",
                fromCity                : "",
                fromDistrict                : "",
                fromState               : "",
                fromCountry             : "",
                fromPincode             : "",
                fromLatLng              : [],
                toLatLng                : [],
                stopLatLng              : [],
                toaddress1                  : "",
                toArea                  : "",
                toCity                  : "",
                toState                 : "",
                toCountry               : "",
                toPincode               : "",
                stopArea                  : "",
                stopCity                  : "",
                stopState                 : "",
                stopCountry               : "",
                stopPincode               : "",
                vehicleID:"",
                reasonForSelectingVehicle:"",
                packageTypeId:"",
                packageId:"",
                package:"",
                managerId1:"",
                managerId2:"",
                managerId3:"",
                managerID1:"",
                managerID2:"",
                managerID3:"",
                manager1Name:"",
                manager2Name:"",
                manager3Name:"",
                manager1ID:"",
                manager2ID:"",
                manager3ID:"",
                manager1Contact: "",
                manager2Contact: "",
                manager3Contact: "",
                approvalRequired:"",
                approver1exist:"",
                approver2exist:"",
                approver3exist:"",
                employeeId:"",
                employeeUserId:"",
                empId:"",
                employeeName:"",
                corporateId:"",
                radioButtonValue:"Home"
              })
             var stopArr  = [];
             this.props.history.push('/booking-details'); 
          })
          .catch((error)=>{console.log('error: ',error)})
      }    }

    

    getSelectedOption(val,event) {
      if(val == 'Others'){
        this.setState({fromPincode:"",fromCity:"",fromDistrict:"" })
      }
        var array = {
                  returnDate : this.state.returnDate,
                  from    : this.state.from,
                  fromAddress1    : this.state.address1,
                  fromPincode    : this.state.fromPincode,
                  toAddress1    : this.state.toaddress1,
                  toPincode    : this.state.toPincode,
                  pickupDate : this.state.pickupDate,
                  pickupTime : moment(this.state.fromTime).format('HH:mm'),
                  to         : this.state.to,
                  returnTime : moment(this.state.toTime).format('HH:mm'),
                  bookingType : this.state.bookingType,
                  purposeOfTravel: this.state.purposeOfTravel,
                  purposeOfTravelOther: this.state.purposeOfTravelOther,
                  instructions  :this.state.instructions,
                  selectedVehicle  :this.state.selectedVehicle,
                  reasonForSelectingVehicle  :this.state.reasonForSelectingVehicle,
                  stopArr : this.state.stopArr,
                }
        this.setState({
          radioButtonValue : val,
          tripArray :array
        })
        axios.get("/api/personmaster/get/ID/"+this.state.userID)
        .then((response) => {
            var UserData = response.data.data[0].address[0];
            var addr = "";
            if(UserData){
            addr = UserData.addressLine2+', '+ UserData.addressLine1
             geocodeByAddress(addr)
            .then(results => getLatLng(results[0]))
            .then(latLng => this.setState({'fromLatLng': latLng}))
            .catch(error => console.error('Error', error));
            }else{
                  this.setState({ homeAdd : false})
                  // var res = response.data.data[0].workLocation
                  // this.getOfficeAddr(res)
                 }
            if(val == 'Home'){
                var array = {
                  returnDate : this.state.returnDate,
                  from    : addr,
                  fromAddress1    : this.state.address1,
                  fromPincode    : this.state.fromPincode,
                  toAddress1    : this.state.toaddress1,
                  toPincode    : this.state.toPincode,
                  pickupDate : this.state.pickupDate,
                  pickupTime : moment(this.state.fromTime).format('HH:mm'),
                  to         : this.state.to,
                  returnTime : moment(this.state.toTime).format('HH:mm'),
                  bookingType : this.state.bookingType,
                  purposeOfTravel: this.state.purposeOfTravel,
                  purposeOfTravelOther: this.state.purposeOfTravelOther,
                  instructions  :this.state.instructions,
                  selectedVehicle  :this.state.selectedVehicle,
                  reasonForSelectingVehicle  :this.state.reasonForSelectingVehicle,
                  stopArr : this.state.stopArr,
                }
                this.setState({
                    from : addr,
                    fromArea    : UserData ? UserData.area:"",
                    fromCity    : UserData ? UserData.city:"",
                    fromDistrict    : UserData ? UserData.district:"",
                    fromState   : UserData ? UserData.state:"",
                    fromCountry : UserData ? UserData.country:"",
                    fromPincode : UserData ? UserData.pincode:"",
                    tripArray : array,
                })   
            }else if(val == 'Office'){

              var res = response.data.data[0].workLocation
              this.getOfficeAddr(res)
            }else{
                var array = {
                  returnDate : this.state.returnDate,
                  from    : "",
                  fromAddress1    : "",
                  fromPincode    : "",
                  toAddress1    : this.state.toaddress1,
                  toPincode    : this.state.toPincode,
                  pickupDate : this.state.pickupDate,
                  pickupTime : moment(this.state.fromTime).format('HH:mm'),
                  to         : this.state.to,
                  returnTime : moment(this.state.toTime).format('HH:mm'),
                  bookingType : this.state.bookingType,
                  purposeOfTravel: this.state.purposeOfTravel,
                  purposeOfTravelOther: this.state.purposeOfTravelOther,
                  instructions  :this.state.instructions,
                  selectedVehicle  :this.state.selectedVehicle,
                  reasonForSelectingVehicle  :this.state.reasonForSelectingVehicle,
                  stopArr : this.state.stopArr,
                }
                this.setState({
                    from : "",
                    tripArray : array
                })  
            }
                       
        })
        .catch((error) => {
        })
    }

    getBtnValue(val,id,event){
        var array = {
          returnDate : this.state.returnDate,
          from    : this.state.from,
          fromAddress1    : this.state.address1,
          fromPincode    : this.state.fromPincode,
          toAddress1    : this.state.toaddress1,
          toPincode    : this.state.toPincode,
          pickupDate : this.state.pickupDate,
          pickupTime : moment(this.state.fromTime).format('HH:mm'),
          to         : this.state.to,
          returnTime : moment(this.state.toTime).format('HH:mm'),
          bookingType : val,
          purposeOfTravel: this.state.purposeOfTravel,
          purposeOfTravelOther: this.state.purposeOfTravelOther,
          instructions  :this.state.instructions,
          selectedVehicle  :this.state.selectedVehicle,
          reasonForSelectingVehicle  :this.state.reasonForSelectingVehicle,
          stopArr : this.state.stopArr,
        }
        this.setState({
            bookingType : val,
            packageTypeId : id,
            tripArray : array
        })
    }

    getVehicle(){
    axios.get("/api/vehiclemaster/get/list")
        .then((response) => {
            this.setState({
                vehicleDetails : response.data
            })
            var vehicleDetails = _.uniq(this.state.vehicleDetails);
        })
        .catch((error) => {
        })
    }

    getSelectedTrip(val,event) {
        this.setState({
          toggleButtonValue : val
        })
    }

    fromTime(value) {
        var array = {
          returnDate : this.state.returnDate,
          from    : this.state.from,
          fromAddress1    : this.state.address1,
          fromPincode    : this.state.fromPincode,
          toAddress1    : this.state.toaddress1,
          toPincode    : this.state.toPincode,
          pickupDate : this.state.pickupDate,
          pickupTime : moment(value).format('HH:mm'),
          to         : this.state.to,
          returnTime : moment(this.state.toTime).format('HH:mm'),
          bookingType : this.state.bookingType,
          purposeOfTravel: this.state.purposeOfTravel,
          purposeOfTravelOther: this.state.purposeOfTravelOther,
          instructions  :this.state.instructions,
          selectedVehicle  :this.state.selectedVehicle,
          reasonForSelectingVehicle  :this.state.reasonForSelectingVehicle,
          stopArr : this.state.stopArr,
        }
        this.setState({
          fromTime: value,
          tripArray:array
        },()=>{

          if(this.state.pickupDate === moment(new Date).format("YYYY-MM-DD")){
            var now = new Date();
            var d = new Date(),
             h = d.getHours(),
             m = d.getMinutes();
            if (h < 10) h = '0' + h;
            if (m < 10) m = '0' + m;
            var curTime= h + ':' + m
            var nowTime = new Date((now.getMonth()+1) + "/" + now.getDate() + "/" + now.getFullYear() + " " + curTime);
            var userTime = new Date((now.getMonth()+1) + "/" + now.getDate() + "/" + now.getFullYear() + " " + moment(this.state.fromTime).format('HH:mm'));
            if (nowTime.getTime() > userTime.getTime()) {
                swal("Please select future time") ;
                this.setState({
                  fromTime:""
                })
            }
          }
        })
    }

    toTime(value) {
      var array = {
          returnDate : this.state.returnDate,
          from    : this.state.from,
          fromAddress1    : this.state.address1,
          fromPincode    : this.state.fromPincode,
          toAddress1    : this.state.toaddress1,
          toPincode    : this.state.toPincode,
          pickupDate : this.state.pickupDate,
          pickupTime : moment(this.state.fromTime).format('HH:mm'),
          to         : this.state.to,
          returnTime : moment(value).format('HH:mm'),
          bookingType : this.state.bookingType,
          purposeOfTravel: this.state.purposeOfTravel,
          purposeOfTravelOther: this.state.purposeOfTravelOther,
          instructions  :this.state.instructions,
          selectedVehicle  :this.state.selectedVehicle,
          reasonForSelectingVehicle  :this.state.reasonForSelectingVehicle,
          stopArr : this.state.stopArr,
        }
        this.setState({
          toTime: value,
          tripArray:array
        },()=>{
          if(this.state.pickupDate === this.state.returnDate){
            var now = new Date();
            var nowTime = new Date((now.getMonth()+1) + "/" + now.getDate() + "/" + now.getFullYear() + " " + moment(this.state.fromTime).format('HH:mm'));
            var userTime = new Date((now.getMonth()+1) + "/" + now.getDate() + "/" + now.getFullYear() + " " + moment(this.state.toTime).format('HH:mm'));
            if (nowTime.getTime() > userTime.getTime()) {
                swal("Please select future time") ;
                this.setState({
                  toTime:""
                })
            }
          }

        })
    }

    deleteStop(event){
        var stopArr = this.state.stopArr;
        const indexToDelete = event.target.getAttribute("idIndex");

        var index = parseInt(indexToDelete)

        if (index > -1) {
            stopArr.splice(index, 1);
        }

        // let newArray = stopArr.filter( (item, index) => {
        //   console.log(index,parseInt(indexToDelete))
        //      if(index !== parseInt(indexToDelete)){
        //       console.log('item: ',item)
        //           return item;
        //      }
        // });


        var array = {
          returnDate : this.state.returnDate,
          from    : this.state.from,
          fromAddress1    : this.state.address1,
          fromPincode    : this.state.fromPincode,
          toAddress1    : this.state.toaddress1,
          toPincode    : this.state.toPincode,
          pickupDate : this.state.pickupDate,
          pickupTime : moment(this.state.fromTime).format('HH:mm'),
          to         : this.state.to,
          returnTime : moment(this.state.toTime).format('HH:mm'),
          bookingType : this.state.bookingType,
          purposeOfTravel: this.state.purposeOfTravel,
          purposeOfTravelOther: this.state.purposeOfTravelOther,
          instructions  :this.state.instructions,
          selectedVehicle  :this.state.selectedVehicle,
          reasonForSelectingVehicle  :this.state.reasonForSelectingVehicle,
          stopArr : stopArr,
        }
        this.setState({
            stopArr: stopArr,
            tripArray:array
        })
    }

    getPackageType(){
      axios.get("/api/packagetypemaster/get/list")
        .then((response) => {
          if(response && response.data && response.data.length > 0){
            var packageData = response.data.find(e=> (e.packageType).trim().toLowerCase() === 'outstation')
            this.setState({packageTypeId : packageData._id})
          }

            this.setState({
                packageTypeVal : response.data
            })            
        })
        .catch((error) => {
        })  
    }

    getVehicleData(){
        axios.get("/api/categorymaster/get/list")
        .then((response) => {
            this.setState({
                vehicleData : response.data
            })            
        })
        .catch((error) => {
        }) 
    }

    getCheckedValue(value,event){
      // var value = $('#switchUser').prop('checked')
      // if(value == false){
      //   this.setState({'bookingFor':'other'})
      // }else{
        if(value == 'other'){
          this.setState({
            showbookingForOther:true,
            isBookingForOther:true
          })
        }else{
          this.setState({
            showbookingForOther:false,
            isBookingForOther:false,
            empNumber:"",
            empName:"",
            empDetail:""
          })
        }
        this.setState({'bookingFor':value})
        var id = localStorage.getItem("user_ID");
        // axios.get("/api/users/get/email/"+id)
        //     .then((response) => {
        //        axios.get("/api/personmaster/get/emailID/"+response.data)
        //       .then((response) => {
        //         if(response.data.data[0]){
        //             this.setState({
        //                 employeeUserId : id,
        //                 userID : response.data.data[0]._id,
        //                 departmentId : response.data.data[0].departmentId,
        //                 corporateId : response.data.data[0].company_Id,
        //             })  
        //         }else{
        //           swal({
        //                 title: "Add User",
        //                 text: "This emailID doesn't exist in Employee Master. Please register this emailID in Employee Master",
        //               });
        //         }          
        //       })
        //       .catch((error) => {
        //       }) 
                          
        //     })
        //     .catch((error) => {
        //     }) 
      // }      
    }

    getSelfData(event){
      this.setState({
        showbookingForOther:false,
        isBookingForOther:false,
        // homeAdd:false,
        empNumber:"",
        empName:"",
        bookingFor:'self',
        empDetail:"",
        managerId1:null,
          managerId2:null,
          managerId3:null,
          manager1Name:"",
          manager2Name:"",
          manager3Name:"",
          manager1Contact: "",
            manager2Contact: "",
            manager3Contact: "",
          manager1ID:"",
          manager2ID:"",
          manager3ID:"",
          managerID1:"",
          managerID2:"",
          managerID3:"",
          approvalRequired:"",
          approver1exist:"",
          approver2exist:"",
          approver3exist:"",
          employeeUserId:null,
      })
        var id = localStorage.getItem("user_ID");
        axios.get("/api/users/get/email/"+id)
            .then((response) => {
               axios.get("/api/personmaster/get/emailID/"+response.data)
              .then((response) => {
                if(response.data.data[0]){
                    this.setState({
                        employeeUserId : id,
                      selfData: response.data.data[0].firstName+' '+response.data.data[0].lastName+' (EmpID : '+response.data.data[0].employeeId+')',
                      employeeName: response.data.data[0].firstName+' '+response.data.data[0].lastName,
                        empId : response.data.data[0].employeeId,
                        user_ID : response.data.data[0]._id,
                        userID : response.data.data[0]._id,
                        departmentId : response.data.data[0].departmentId,
                        corporateId : response.data.data[0].company_Id,
                        empCategory : response.data.data[0].empCategory,
                    })  

                  if(this.state.radioButtonValue == 'Home'){
                    var UserData = response.data.data[0].address[0];
                    var addr = "";
                    if(UserData){
                       addr = UserData.addressLine2+', '+ UserData.addressLine1
                       geocodeByAddress(addr)
                      .then(results => getLatLng(results[0]))
                      .then(latLng => this.setState({'fromLatLng': latLng}))
                      .catch(error => console.error('Error', error));
                    }else{
                      this.setState({ homeAdd : false,radioButtonValue : 'Office'})
                      var res = response.data.data[0].workLocation
                      this.getOfficeAddr(res)
                     }
                        var array = {
                          returnDate : this.state.returnDate,
                          from    : addr,
                          fromAddress1    : this.state.address1,
                          fromPincode    : this.state.fromPincode,
                          toAddress1    : this.state.toaddress1,
                          toPincode    : this.state.toPincode,
                          pickupDate : this.state.pickupDate,
                          pickupTime : moment(this.state.fromTime).format('HH:mm'),
                          to         : this.state.to,
                          returnTime : moment(this.state.toTime).format('HH:mm'),
                          bookingType : this.state.bookingType,
                          purposeOfTravel: this.state.purposeOfTravel,
                          purposeOfTravelOther: this.state.purposeOfTravelOther,
                          instructions  :this.state.instructions,
                          selectedVehicle  :this.state.selectedVehicle,
                          reasonForSelectingVehicle  :this.state.reasonForSelectingVehicle,
                          stopArr : this.state.stopArr
                        }
                          this.setState({
                              from        : addr,
                              tripArray   : array,
                              fromArea    : UserData ? UserData.area: "",
                              fromCity    : UserData ? UserData.city: "",
                              fromDistrict    : UserData ? UserData.district: "",
                              fromState   : UserData ? UserData.state: "",
                              fromCountry : UserData ? UserData.country: "",
                              fromPincode : UserData ? UserData.pincode: "",
                              homeAdd     : UserData ? true : false
                          })  

                      
                  }else if(this.state.radioButtonValue == 'Office'){
                   var res = response.data.data[0].workLocation
                  this.getOfficeAddr(res)
                  }
                }else{
                  swal({
                        title: "Add User",
                        text: "This emailID doesn't exist in Employee Master. Please register this emailID in Employee Master",
                      });
                }  
                        var managerID1 = response.data.data[0].approvingAuthorityId1;
                        var managerID2 = response.data.data[0].approvingAuthorityId2;
                        var managerID3 = response.data.data[0].approvingAuthorityId3;
                        this.setState({
                              managerID1 : managerID1,
                              managerID2 : managerID2,
                              managerID3 : managerID3,
                            })
                        this.getManagerData(managerID1,managerID2,managerID3)
                      // if(response.data.data[0].bookingApprovalRequired == 'Yes'){
                      //   this.setState({
                      //         approver1exist :'No',
                      //         approver2exist :'No',
                      //         approver3exist :'No',
                      //         approvalRequired: 'Yes',
                      //       })
                      // }        
              })
              .catch((error) => {
              }) 
                          
            })
            .catch((error) => {
            }) 
      // }      
    }

    

    empNumHandleChange(event){
      event.preventDefault();
     
        this.setState({
          empDetail: $(event.target).attr('data')
        });

        this.setState({
          managerId1:null,
          managerId2:null,
          managerId3:null,
          manager1Name:"",
          manager2Name:"",
          manager3Name:"",
          manager1Contact: "",
            manager2Contact: "",
            manager3Contact: "",
          manager1ID:"",
          manager2ID:"",
          manager3ID:"",
          managerID1:"",
          managerID2:"",
          managerID3:"",
          empCategory:"",
          approvalRequired:"",
          approver1exist:"",
          approver2exist:"",
          approver3exist:"",
          employeeUserId:null,
          // corporateId:null,
          showList:false,
          homeAdd:true,
          showbookingForOther:false,
          isBookingForOther:true,
        })

        var type = $(event.target).attr('type');
        var email = $(event.target).attr('email');
        if(type === "guest"){
          axios.get('/api/personmaster/get/guest/'+email+'/'+this.state.corporateId)
          .then((result)=>{
            this.setState({
              userID : result.data.data[0]._id,
              user_ID : result.data.data[0]._id,
              corporateId : result.data.data[0].company_Id,
              empCategory : result.data.data[0].empCategory,
              empName: result.data.data[0].firstName+' '+result.data.data[0].lastName,
            }) 
            if(this.state.radioButtonValue == 'Office'){
              var res = result.data.data[0].workLocation;
              this.getOfficeAddr(res)
            }
            var id = localStorage.getItem("user_ID");
            axios.get("/api/personmaster/getUserByUserId/"+id)
            .then((res) => {
                if(res.data && res.data.data[0]){
                    this.setState({
                        employeeUserId : id,
                        selfData: res.data.data[0].firstName+' '+res.data.data[0].lastName+' (EmpID : '+res.data.data[0].employeeId+')',
                        employeeName: res.data.data[0].firstName+' '+res.data.data[0].lastName,
                        empId : res.data.data[0].employeeId,

                    })   
                    var managerID1 = res.data.data[0].approvingAuthorityId1;
                    var managerID2 = res.data.data[0].approvingAuthorityId2;
                    var managerID3 = res.data.data[0].approvingAuthorityId3;
                    this.setState({
                      managerID1 : managerID1,
                      managerID2 : managerID2,
                      managerID3 : managerID3,
                    })
                    this.getManagerData(managerID1,managerID2,managerID3)
                  // if(res.data.data[0].bookingApprovalRequired == 'Yes'){
                  //   this.setState({
                  //     approver1exist :'No',
                  //     approver2exist :'No',
                  //     approver2exist :'No',
                  //     approvalRequired: 'Yes',
                  //   })
                  // }

                }else{
                swal('No employee details available of you. Please fill your profile. Or contact admin')
            }

            })
            .catch((error) => {
              console.log('error: ',error)
            })   
          })
          .catch((error)=>{
            console.log('Guest Data Error: ',error)
          })
        }else{
        
        axios.get("/api/personmaster/get/UserID/"+$(event.target).attr('id')+"/"+this.state.corporateId)
        .then((response) => {
            this.setState({
              userID : response.data.data[0]._id,
              user_ID : response.data.data[0]._id,
              departmentId : response.data.data[0].departmentId,
              corporateId : response.data.data[0].company_Id,
              empCategory : response.data.data[0].empCategory,
              empName: response.data.data[0].firstName+' '+response.data.data[0].lastName,
              }) 

              axios.get("/api/users/get/id/"+response.data.data[0].email)
              .then((res)=>{
                this.setState({employeeUserId:res.data})
              })
              .catch((err)=>{console.log(err)})

            if(this.state.radioButtonValue == 'Home'){
              var UserData = response.data.data[0].address[0];
              var addr = "";
              if(UserData){
                var addr = UserData.addressLine2+', '+ UserData.addressLine1
                 geocodeByAddress(addr)
                .then(results => getLatLng(results[0]))
                .then(latLng => this.setState({'fromLatLng': latLng}))
                .catch(error => console.error('Error', error));
              }
                  var array = {
                    returnDate : this.state.returnDate,
                    from    : addr,
                    fromAddress1    : this.state.address1,
                    fromPincode    : this.state.fromPincode,
                    toAddress1    : this.state.toaddress1,
                    toPincode    : this.state.toPincode,
                    pickupDate : this.state.pickupDate,
                    pickupTime : moment(this.state.fromTime).format('HH:mm'),
                    to         : this.state.to,
                    returnTime : moment(this.state.toTime).format('HH:mm'),
                    bookingType : this.state.bookingType,
                    purposeOfTravel: this.state.purposeOfTravel,
                    purposeOfTravelOther: this.state.purposeOfTravelOther,
                    instructions  :this.state.instructions,
                    selectedVehicle  :this.state.selectedVehicle,
                    reasonForSelectingVehicle  :this.state.reasonForSelectingVehicle,
                    stopArr : this.state.stopArr
                  }
                    this.setState({
                        from        : addr,
                        tripArray   : array,
                        fromArea    : UserData ? UserData.area: "",
                        fromCity    : UserData ? UserData.city: "",
                        fromDistrict    : UserData ? UserData.district: "",
                        fromState   : UserData ? UserData.state: "",
                        fromCountry : UserData ? UserData.country: "",
                        fromPincode : UserData ? UserData.pincode: "",
                        homeAdd     : UserData ? true : false
                    })  
                
            }else if(this.state.radioButtonValue == 'Office'){
              var res = response.data.data[0].workLocation
              this.getOfficeAddr(res)
            }
              var managerID1 = response.data.data[0].approvingAuthorityId1;
              var managerID2 = response.data.data[0].approvingAuthorityId2;
              var managerID3 = response.data.data[0].approvingAuthorityId3;
              this.setState({
                    managerID1 : managerID1,
                    managerID2 : managerID2,
                    managerID3 : managerID3,
                  })
              this.getManagerData(managerID1,managerID2,managerID3)
            //  if(response.data.data[0].bookingApprovalRequired == 'Yes'){
            //   this.setState({
            //         approver1exist :'No',
            //         approver2exist :'No',
            //         approver3exist :'No',
            //         approvalRequired: 'Yes',
            //       })
            // }
            
        })
        .catch((error) => {
        }) 
      }
    }

 

  getInfo = (value) => {
    console.log('this.state.corporateId: ',this.state.corporateId)
    axios.get("/api/personmaster/searchPersonByIDName/"+this.state.corporateId+"/"+value)
      .then(({ data }) => {
        this.setState({
          otherEmployeeresults: data
        })
      })
      .catch((error) => {
        console.log('error: ',error)
      }) 
  }

  handleInputChange = () => {
    this.setState({
      query: this.search.value,
      showList: true
    }, () => {
          this.getInfo(this.state.query)
    })
  }

  hideList(event){
    // event.preventDefault();
    alert('outside')
    this.value =""
    this.setState({
      showList:false,
      showbookingForOther:false,
      isBookingForOther:false
    })
  }
    hideEmpInput(event){
      if(this.state.empNumber){
        this.setState({
          bookingFor:'other',
          empNumber:"",
          empName:"",
          showbookingForOther:false,
          isBookingForOther:false
        })
      }else{
        this.setState({
          bookingFor:'self',
          empNumber:"",
          empName:"",
          showbookingForOther:false,
          isBookingForOther:false,
        })
        var value = $('#switchUser').prop('checked',false) 
        var id = localStorage.getItem("user_ID");
        axios.get("/api/users/get/email/"+id)
            .then((response) => {
               axios.get("/api/personmaster/get/emailID/"+response.data)
              .then((response) => {
                if(response.data.data[0]){
                    this.setState({
                        employeeUserId:id,
                      selfData: response.data.data[0].firstName+' '+response.data.data[0].lastName+' (EmpID : '+response.data.data[0].employeeId+')',
                      employeeName: response.data.data[0].firstName+' '+response.data.data[0].lastName,
                      empId : response.data.data[0].employeeId,
                        userID : response.data.data[0]._id,
                        departmentId : response.data.data[0].departmentId,
                        corporateId : response.data.data[0].company_Id,
                        empCategory : response.data.data[0].empCategory,
                    })  
                }else{
                  swal({
                        title: "Add User",
                        text: "This emailID doesn't exist in Employee Master. Please register this emailID in Employee Master",
                      });
                }          
              })
              .catch((error) => {
              }) 
                          
            })
            .catch((error) => {
            }) 
      }
    }

    showAddStop(event){
      event.preventDefault();
      this.setState({
        showAddStop : true
      })
    }

    showInstuction(event){
      event.preventDefault();
      if(this.state.showInstuction == true){
        this.setState({
          showInstuction : false
        })
      }else{
       this.setState({
          showInstuction : true
        }) 
      }
      
    }

    getFileDetails(fileName) {

    axios
      .get("/api/bookingmaster/get/filedetails/" + fileName)
      .then((response) => {
        $('.fullpageloader').hide();
        if (response) {
          console.log('========bulk data==========',response.data)
          var tableData = [];
          this.setState({
            fileDetails: response.data,
            failedRecordsCount: response.data.failedRecords.length,
            goodDataCount: response.data.goodrecords.length
          });
             tableData = response.data.goodrecords.map((a, i) => {
              return {
                bookingId                   : a.bookingId ? a.bookingId : '-',
                tripType                    : a.tripType ? a.tripType : '-',
                pickupFrom                  : a.pickupFrom ? a.pickupFrom : '-',
                from                        : a.from ? a.from.address : '-',
                to                          : a.to ? a.to.address : '-',
                pickupDate                  : a.pickupDate ? moment(a.pickupDate).format('DD/MM/YYYY') : '-',
                pickupTime                  : a.pickupTime ? a.pickupTime : '-',
                returnDate                  : a.returnDate ? moment(a.returnDate).format('DD/MM/YYYY') : '-',
                returnTime                  : a.returnTime ? a.returnTime : '-',   
                vehicleCategory             : a.vehicleCategory ? a.vehicleCategory : '-',
                employeeId                  : a.person[0] ? a.person[0].employeeId : '-',
                managerID1                  : a.managerID1 ? a.managerID1 : '-',
                managerID2                  : a.managerID2 ? a.managerID2 : '-',
                managerID3                  : a.managerID3 ? a.managerID3 : '-',
                approvalRequired            : a.approvalRequired ? a.approvalRequired : '-',
                specialInstruction          : a.specialInstruction ? a.specialInstruction : '-',
                purposeOfTravel             : a.purposeOfTravel ? a.purposeOfTravel : '-',
              }
            })

            var failedRecordsTable = response.data.failedRecords.map((a, i) => {
              return {
                tripType                    : a.tripType ? a.tripType : '-',
                pickupFrom                  : a.pickupFrom ? a.pickupFrom : '-',
                from                        : a.fromaddress ? a.fromaddress : '-',
                to                          : a.toaddress ? a.toaddress : '-',
                pickupDate                  : a.pickupDate ? moment(a.pickupDate).format('DD/MM/YYYY') : '-',
                pickupTime                  : a.pickupTime ? a.pickupTime : '-',
                returnDate                  : a.returnDate ? moment(a.returnDate).format('DD/MM/YYYY') : '-',
                returnTime                  : a.returnTime ? a.returnTime : '-',   
                vehicleCategory             : a.vehicleCategory ? a.vehicleCategory : '-',
                employeeId                  : a.employeeID ? a.employeeID : '-',
                managerID1                  : a.ManagerID1 ? a.ManagerID1 : '-',
                managerID2                  : a.ManagerID2 ? a.ManagerID2 : '-',
                managerID3                  : a.ManagerID3 ? a.ManagerID3 : '-',
                approvalRequired            : a.approvalRequired ? a.approvalRequired : '-',
                specialInstruction          : a.specialInstruction ? a.specialInstruction : '-',
                purposeOfTravel             : a.purposeOfTravel ? a.purposeOfTravel : '-',
                failedRemark                : a.failedRemark ? a.failedRemark : '-'
              }
            })

          this.setState({
            goodRecordsTable: tableData,
            failedRecordsTable: failedRecordsTable
          })
        }
      })
      .catch((error) => {
        console.log('error', error);
      })
  }

  handlePackageChange(event){
    // event.preventDefault();
    var packageTypeId = $(event.target).attr('datapackagetype')
    var packageID = $(event.target).attr('datapackage')
    var cost = $(event.target).attr('datacost')
    var id = $(event.target).attr('id')
    console.log('<==package==>')
    console.log('package=>',packageID,cost,id,packageTypeId)
     
    this.setState({
      package: event.target.value,
      packageId  : packageID,
      estimatedCost : cost,
      packageTypeId : packageTypeId,
    });
  }

  renderElement(){
     if(this.state.approvalRequired === 'Yes' && this.state.approver1exist === 'Yes'){
      return (<p>APPROVING AUTHORITY DETAILS FOR THIS BOOKING ARE 
        <ul className="nopadding">
          <li>Name: {this.state.manager1Name}</li>
          <li>EmpID: {this.state.managerID1}</li>
          <li>Contact: {this.state.manager1Contact ? this.state.manager1Contact : 'NA'}</li>
        </ul>
      </p>)
     }else if(this.state.approvalRequired === 'Yes' && this.state.approver1exist === 'No'){
      return(<span>
         <p>APPROVING AUTHORITY ID FOR THIS BOOKING IS {this.state.managerID1}</p>
        <p>Note: Please ask your manager to register to the system for approving the booking</p>
      </span>)
     }else{
      return(<p>NO APPROVAL REQUIRED FOR THIS BOOKING</p>)
     }
  }


    render() {
      const searchOptions = {componentRestrictions: {country: "in"}}
      const onError = (status, clearSuggestions) => {
        console.log('Google Maps API returned error with status: ', status)
        clearSuggestions()
      }

        return (
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOPadding">
                <section className="content">
                  <div className="pageContent col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
                      <h4 className="weighttitle col-lg-9 col-md-6 col-xs-6 col-sm-6 NOpadding-right">Trip Booking</h4>
                      <ul className="nav tabNav nav-pills col-lg-3 col-md-3 col-sm-12 col-xs-12">
                        <li className="active col-lg-5 col-md-5 col-xs-5 col-sm-5 NOpadding text-center nav_tab_style"><a data-toggle="pill" href="#manual">Manual</a></li>
                        <li className="col-lg-6 col-md-6 col-xs-6 col-sm-6 NOpadding nav_tab_style text-center"><a data-toggle="pill" href="#bulkBooking">Bulk Upload</a></li>
                      </ul>
                    </div>
                    <section className="Content" >
                      <div className="row tab-content">
                      <div id="manual" className="tab-pane fade in active col-lg-12 col-md-12 col-sm-12 col-xs-12 bookingMasterContainer nopadding">
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 bookingForm">
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  nopadding">
                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                  {this.state.packageTypeVal && 
                                      this.state.packageTypeVal.length > 0 ?
                                        this.state.packageTypeVal.map((data, index) => {
                                          if(this.state.packageTypeVal.length == 2){
                                            var classElm = "col-lg-6 col-md-6 col-sm-6 col-xs-6"
                                          }else{
                                            var classElm = "col-lg-4 col-md-4 col-sm-4 col-xs-4"
                                          }
                                          return (
                                            <div key={index} className={"bookingTypeDiv nopadding "+classElm}><button className={this.state.bookingType ? (this.state.bookingType).trim().toLowerCase() == (data.packageType).trim().toLowerCase() || this.state.bookingType == undefined ? "btn btn-primary col-md-12 col-sm-12 nav_tab_style btnValue" : "btn btn-default col-md-12 col-sm-12 btnValue nav_tab_style" : null} value={data.packageType} onClick={this.getBtnValue.bind(this,data.packageType,data._id)}>
                                            <i className=
                                                  {data.packageType && (data.packageType).trim().toLowerCase() == 'outstation'?"fa fa-car"
                                                      :(data.packageType).trim().toLowerCase() == 'local'?"fa fa-map-marker"
                                                      :"fa fa-plane"} aria-hidden="true"></i>&nbsp;{data.packageType}</button></div>
                                          )
                                        })
                                        :
                                        
                                      null
                                    }
                                  </div>
                                  {/*<div className="btn-group btn-group-toggle col-lg-12 col-xs-12 col-sm-12" data-toggle="buttons">
                                    <div className="col-lg-6 col-xs-6 col-sm-6 nopadding"><button name="Outstation" ref="Outstation" id="Outstation" className={this.state.bookingType == "Outstation" || this.state.bookingType == undefined ? "btn btn-primary col-lg-12 nav_tab_style btnValue" : "btn btn-default col-lg-12 btnValue nav_tab_style"} value="Outstation" onClick={this.getBtnValue.bind(this,"Outstation")}>
                                        <i className="fa fa-car" aria-hidden="true"></i>&nbsp;Outstation</button></div>
                                      <div className="col-lg-6 col-xs-6 col-sm-6 nopadding"><button className={this.state.bookingType == "Local" ? "btn btn-primary col-lg-12 btnValue nav_tab_style" : "btn btn-default col-lg-12 btnValue nav_tab_style"} value="Local" onClick={this.getBtnValue.bind(this,"Local")}>
                                        <i className="fa fa-map-marker" aria-hidden="true"></i>&nbsp;Local</button></div>
                                  </div>*/}

                                  <div className="tab-content col-lg-12 col-xs-12 col-sm-12">
                                    <div id="home" className="tab-pane fade in active">
                                      <form className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding" id="BasicInfo">
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mgnBottom nopadding">
                                          <div className="col-lg-8 col-md-7 col-sm-12 col-xs-12 nopadding"><h5><b>{this.state.empDetail ? this.state.empDetail : this.state.selfData}</b></h5></div>
                                          {this.state.isBookingForOther ?
                                            <div className="col-lg-4 col-md-5 col-sm-12 col-xs-12 nopadding pull-right">
                                              {this.state.empDetail ? <div className="btn btn-link col-lg-4 col-md-4 col-sm-12 col-xs-12" style={{'color':'red'}} onClick={this.getCheckedValue.bind(this,"other")}>Change</div>: <div className="col-lg-4"></div>}
                                              <div className="btn btn-link col-lg-8 col-md-8 col-sm-12 col-xs-12 btnPadding_align" onClick={this.getSelfData.bind(this)}>Book For Self</div>
                                            </div>
                                            :
                                            <div className="btn btn-link col-lg-4 pull-right btnPadding_align" name="options" id="other"  value="other" onClick={this.getCheckedValue.bind(this,"other")} >Book For Other</div>
                                          }

                                          {this.state.showbookingForOther ?
                                             <div className="nopadding col-lg-12 col-xs-12 col-sm-12 form_margin input-group mgnBottom">
                                             <div className="input-group">
                                             <input
                                                className="form-control errorinputText"
                                                placeholder="Search by Name or ID..."
                                                ref={input => this.search = input}
                                                onChange={this.handleInputChange}
                                              />
                                               <div className="input-group-addon inputIcon plusIconBooking" data-toggle="modal"  data-target="#addGuest" title="Add Guest" ><i className="fa fa-plus "></i></div>
                                              </div>
                                              {this.state.showList ?
                                              <ul className="col-lg-12 col-md-12 searchlistView">
                                              {this.state.otherEmployeeresults && this.state.otherEmployeeresults.length > 0 ?
                                                this.state.otherEmployeeresults.map((r,i) => (
                                                  <li key={i} className="listStyle" data={r.firstName+' '+(r.middleName? r.middleName:"")+' '+r.lastName+' '+(r.employeeId?'(EmpID : '+r.employeeId+')':"")} onClick={this.empNumHandleChange.bind(this)} email={r.email} type={r.type} id={r.employeeId}>
                                                    {r.firstName+' '+(r.middleName?r.middleName:"")+' '+r.lastName+(r.employeeId?'(EmpID : '+r.employeeId+')':"")}
                                                  </li>
                                                ))
                                                :
                                                <div className="col-lg-12 col-md-12">NO DATA FOUND</div>
                                              }
                                              </ul>
                                              :
                                              null
                                              }
                                             </div>
                                            :
                                            null
                                          }
                                          </div>
                                        {/*Modal*/}
                                        <div id="addGuest" className="modal in" aria-hidden="false" role="dialog">
                                          <div className="modal-dialog">

                                            <div className="modal-content">
                                              <div className="modal-header">
                                                <h5 className="modal-title col-md-4">Add Guest</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                  </button>
                                              </div>
                                              <div className="modal-body col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <AddGuest />
                                            </div>
                                              <div className="modal-footer">
                                              </div>
                                            </div>
                                             
                                          </div>
                                        </div>
                                        {/*End Modal*/}
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mgnBottomPer nopadding">
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                                          <label className="labelform col-lg-3"><b>Picking From</b><span className="asterix">*</span></label>
                                          
                                          <div className="btn-group btn-group-toggle col-lg-8 col-xs-12 col-sm-12 nopadding" data-toggle="buttons">
                                             {this.state.homeAdd ?
                                             <label className={this.state.radioButtonValue == "Home" ? "btn toggleButton bookingToggleButton col-lg-3 col-xs-12 col-sm-12 btn-secondary active nav_tab_style" : "btn toggleButton bookingToggleButton col-lg-3 btn-secondary nav_tab_style"} value="Home" onClick={this.getSelectedOption.bind(this,"Home")}  >
                                                <input type="radio"
                                                 name="options" 
                                                 id="Home"
                                                 value="Home"
                                                 autoComplete="off"
                                                 checked={this.state.radioButtonValue == "Home" ? "checked" : "unchecked" }
                                                 /> Home
                                              </label>
                                              :
                                              null
                                              }
                                              <label className={this.state.radioButtonValue == "Office" ? "btn toggleButton bookingToggleButton col-lg-3 col-xs-12 col-sm-12 btn-secondary active nav_tab_style" : "btn toggleButton bookingToggleButton col-lg-3 btn-secondary nav_tab_style"} value="Office" onClick={this.getSelectedOption.bind(this,"Office")}>
                                                <input type="radio" name="options" id="Office"  value="Office" autoComplete="off" checked={this.state.radioButtonValue == "Office" ? "checked" : "unchecked" }  /> Office
                                              </label>
                                              <label className={this.state.radioButtonValue == "Others" ? "btn toggleButton bookingToggleButton col-lg-3 col-xs-12 col-sm-12 noRightMargin btn-secondary active nav_tab_style" : "btn toggleButton bookingToggleButton noRightMargin col-lg-3 btn-secondary nav_tab_style"} value="Others" onClick={this.getSelectedOption.bind(this,"Others")}>
                                                <input type="radio" name="options" id="Others" autoComplete="off" checked={this.state.radioButtonValue == "Others" ? "checked" : "unchecked" }  /> Others
                                              </label>
                                            </div>
                                          </div>
                                         
                                          <div className="form_margin col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                                              {this.state.radioButtonValue == "Others" ?
                                              <div className="col-lg-8 col-md-8 col-sm-12 nopadding"> 
                                                <PlacesAutocomplete
                                                  value={this.state.from}
                                                  onChange={this.handleChangePlaces}
                                                  onSelect={this.handleSelect}
                                                   searchOptions={searchOptions}
                                                >
                                                  {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                                    <div className="input-group">
                                                    <div className="input-group-addon inputIcon"><i className="fa fa-map-marker "></i></div>
                                                      <input
                                                        {...getInputProps({
                                                          placeholder: 'Search Places ...',
                                                          className: 'location-search-input col-md-12 col-xs-12 form-control',
                                                        })}
                                                      />
                                                      <div className="autocomplete-dropdown-container">
                                                        {loading && <div>Google API has some trouble loading. Please type the address.</div>}
                                                        {suggestions.map(suggestion => {
                                                          const className = suggestion.active
                                                            ? 'suggestion-item--active'
                                                            : 'suggestion-item';
                                                          // inline style for demonstration purpose
                                                          const style = suggestion.active
                                                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                          return (
                                                            <div
                                                              {...getSuggestionItemProps(suggestion, {
                                                                className,
                                                                style,
                                                              })}
                                                            >
                                                              <span>{suggestion.description}</span>
                                                            </div>
                                                          );
                                                        })}
                                                      </div>
                                                    </div>
                                                  )}
                                                </PlacesAutocomplete>
                                              </div>
                                              :
                                              <div className="col-lg-8 col-md-8 col-sm-12 nopadding" >
                                                  
                                                  <div className="input-group inputBox-main nameParts col-md-12 col-xs-12" id="from">
                                                     <div className="input-group-addon inputIcon"><i className="fa fa-map-marker"></i></div>
                                                      <input type="text" value={this.state.from ? this.state.from : "No Address Found"} disabled placeholder="Pickup Location" name="from" ref="from" className="form-control"  onChange={this.handleChange.bind(this)}/>
                                                  </div>
                                              </div>
                                              }
                                              <div className="col-lg-4 noRightPadding">
                                                <div className="input-group inputBox-main nameParts col-md-12 col-xs-12">
                                                  <div className="input-group-addon inputIcon"><i className="fa fa-home "></i></div>
                                                  <input type="text" value={this.state.address1} placeholder="Flat/Block No." name="address1" id="address1" ref="address1" className="form-control" onChange={this.handleChange.bind(this)}/>
                                                </div>
                                              </div>
                                          </div> 
                                          <div className="form_margin col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                                             
                                              <div className="col-lg-4 noLeftPadding">
                                                <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">City</label>
                                                <div className="input-group inputBox-main nameParts col-md-12 col-xs-12">
                                                  <div className="input-group-addon inputIcon"><i className="fa fa-building "></i></div>
                                                  <input type="text" value={this.state.fromCity} placeholder="City" name="fromCity" id="fromCity" ref="fromCity" className="form-control" onChange={this.handleChange.bind(this)}/>
                                                </div>
                                              </div>
                                              <div className="col-lg-4 noLeftPadding">
                                                <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">District</label>
                                                <div className="input-group inputBox-main nameParts col-md-12 col-xs-12">
                                                  <div className="input-group-addon inputIcon"><i className="fa fa-building "></i></div>
                                                  <input type="text" value={this.state.fromDistrict} placeholder="District" name="fromDistrict" id="fromDistrict" ref="fromDistrict" className="form-control" onChange={this.handleChange.bind(this)}/>
                                                </div>
                                              </div>
                                              <div className="col-lg-4 nopadding">
                                                <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Pincode<span className="asterix">*</span></label>
                                                <div className="input-group inputBox-main nameParts col-md-12 col-xs-12">
                                                  <div className="input-group-addon inputIcon"><i className="fa fa-map-marker"></i></div>
                                                  <input type="number" value={this.state.fromPincode} placeholder="Enter pincode" name="fromPincode" id="fromPincode" ref="fromPincode" min="6" className="form-control errorinputText" onChange={this.handleChange.bind(this)} required/>
                                                </div>
                                              </div>
                                          </div>
                                          </div>
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mgnBottomPer nopadding">
                                          <div className="form_margin col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                                              <div className="col-lg-8 col-md-8 col-sm-12 nopadding" >
                                                  <label className="labelform"><b>Destination</b><span className="asterix">*</span></label>
                                                  <div className="input-group inputBox-main nameParts col-lg-12" id="to">
                                                      {/*<div className="input-group-addon inputIcon"><i className="fa fa-map-marker "></i></div>*/}
                                                      {/*<input type="text" value={this.state.to} placeholder="Where To" name="to" ref="to" className="form-control" onChange={this.handleChange.bind(this)}/>*/}
                                                      <PlacesAutocomplete
                                                      value={this.state.to}
                                                      onChange={this.handleChangeToPlaces}
                                                      onSelect={this.handleSelectToAddr}
                                                      searchOptions={searchOptions}
                                                      onError={onError}
                                                      googleCallbackName="initMap1"
                                                    >
                                                      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                                        <div className="input-group">
                                                        <div className="input-group-addon inputIcon"><i className="fa fa-map-marker "></i></div>
                                                          <input
                                                            {...getInputProps({
                                                              placeholder: 'Search Drop Location ...',
                                                              id:"to",
                                                              className: 'location-search-input col-lg-12 col-md-12 col-sm-12 form-control',
                                                            })}
                                                          />
                                                          <div className="autocomplete-dropdown-container">
                                                            {loading && <div>Google API has some trouble loading. Please type the address.</div>}
                                                            {suggestions.map(suggestion => {
                                                              const className = suggestion.active
                                                                ? 'suggestion-item--active'
                                                                : 'suggestion-item';
                                                              // inline style for demonstration purpose
                                                              const style = suggestion.active
                                                                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                              return (
                                                                <div
                                                                  {...getSuggestionItemProps(suggestion, {
                                                                    className,
                                                                    style,
                                                                  })}
                                                                >
                                                                  <span>{suggestion.description}</span>
                                                                </div>
                                                              );
                                                            })}
                                                          </div>
                                                        </div>
                                                      )}
                                                    </PlacesAutocomplete>
                                                      
                                                  </div>
                                                  
                                              </div>
                                              <div className="col-lg-4 noRightPadding">
                                                  <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Flat/Block No.</label>
                                                  <div className="input-group inputBox-main nameParts col-md-12 col-xs-12">
                                                    <div className="input-group-addon inputIcon"><i className="fa fa-home "></i></div>
                                                    <input type="text" value={this.state.toaddress1} placeholder="Flat/Block No" name="toaddress1" id="toaddress1" ref="toaddress1" className="form-control" onChange={this.handleChange.bind(this)}/>
                                                  </div>
                                                </div>
                                          </div>
                                          <div className="form_margin col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                                             
                                              <div className="col-lg-4 noLeftPadding">
                                                <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">City</label>
                                                <div className="input-group inputBox-main nameParts col-md-12 col-xs-12">
                                                  <div className="input-group-addon inputIcon"><i className="fa fa-building "></i></div>
                                                  <input type="text" value={this.state.toCity} placeholder="City" name="toCity" id="toCity" ref="toCity" className="form-control" onChange={this.handleChange.bind(this)}/>
                                                </div>
                                              </div>
                                              <div className="col-lg-4 noLeftPadding">
                                                <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">District</label>
                                                <div className="input-group inputBox-main nameParts col-md-12 col-xs-12">
                                                  <div className="input-group-addon inputIcon"><i className="fa fa-building "></i></div>
                                                  <input type="text" value={this.state.toDistrict} placeholder="District" name="toDistrict" id="toDistrict" ref="toDistrict" className="form-control" onChange={this.handleChange.bind(this)}/>
                                                </div>
                                              </div>
                                              <div className="col-lg-4 nopadding">
                                                <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Pincode<span className="asterix">*</span></label>
                                                <div className="input-group inputBox-main nameParts col-md-12 col-xs-12">
                                                  <div className="input-group-addon inputIcon"><i className="fa fa-map-marker"></i></div>
                                                  <input type="number" value={this.state.toPincode} placeholder="Enter pincode" name="toPincode" id="toPincode" ref="toPincode" min="6" className="form-control errorinputText" onChange={this.handleChange.bind(this)} required/>
                                                </div>
                                              </div>
                                          </div>
                                          </div>
                                          <div className="form_margin col-lg-12 col-md-12 col-sm-12 col-xs-12 mgnBottom nopadding">
                                              <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Pickup Date & Time<span className="asterix">*</span></label>
                                              <div className="col-lg-6 noLeftPadding " id="pickupDate" >
                                                  
                                                  {/*<div className="input-group inputBox-main nameParts" id="pickupDate">
                                                      <div className="input-group-addon inputIcon"><i className="fa fa-calendar "></i></div>
                                                      <input type="date" value={this.state.pickupDate} min={moment(new Date).format("YYYY-MM-DD")} placeholder="Where To" name="pickupDate" id="pickupDate" ref="pickupDate" className="form-control" onChange={this.handleChange.bind(this)}/>
                                                  </div>*/}
                                                  <div className="input-group-addon HRMSAddon col-lg-2 col-md-2 col-sm-2 col-xs-2" id="frompreviousDate" onClick={this.frompreviousDate.bind(this)}>
                                                    <span className="fa fa-caret-left nextarrow"></span>
                                                  </div>          
                                                  <input type="date" className="todaysdate HRMSAddon col-lg-9 col-md-9 col-sm-8 col-xs-8 errorinputText" value={this.state.pickupDate} min={moment(new Date).format("YYYY-MM-DD")} name="pickupDate" id="pickupDate" ref="pickupDate" onChange={this.handleChange.bind(this)} />

                                                  <div className="input-group-addon HRMSAddon nextAddon col-lg-2 col-md-2 col-sm-2 col-xs-2" id="fromnextDate" onClick={this.fromnextDate.bind(this)}>
                                                    <span className="fa fa-caret-right nextarrow"></span>
                                                  </div>
                                              </div>
                                              <div className="col-lg-6 nopadding" >
                                                  <div className="input-group inputBox-main nameParts" id="fromTime">
                                                      <div className="input-group-addon inputIcon"><i className="fa fa-clock-o"></i></div>
                                                         {/*} <DateTime 
                                                          onChange={this.fromTime.bind(this)}
                                                          value={this.state.fromTime}
                                                          name="fromTime"
                                                          id="fromTime"
                                                          timeFormat={true}
                                                          />*/}
                                                          <TimePicker
                                                          showSecond={false}
                                                          className="col-lg-12 nopadding"
                                                          value={this.state.fromTime}
                                                          // defaultValue = {moment().format("hh:mm")}
                                                          // format="24hrs"
                                                          name="fromTime"
                                                          id="fromTime"
                                                          placeholder="Time"
                                                          onChange={this.fromTime.bind(this)}
                                                          // use12Hours
                                                          inputReadOnly
                                                          hideDisabledOptions
                                                          />
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="form_margin col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                                              <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Expected Return Date & Time<span className="asterix">*</span></label>
                                              <div className="col-lg-6 noLeftPadding" id="ReturnDate">
                                                  
                                                      <div className="input-group-addon HRMSAddon col-lg-2 col-md-2 col-sm-2 col-xs-2" id="previousDate" onClick={this.previousDate.bind(this)}>
                                                        <span className="fa fa-caret-left nextarrow"></span>
                                                      </div>          
                                                      <input type="date" className="todaysdate HRMSAddon col-lg-9 col-md-9 col-sm-8 col-xs-8 errorinputText" min={moment(new Date).format("YYYY-MM-DD")} name="returnDate" id="returnDate" value={this.state.returnDate} onChange={this.dateHandleChange.bind(this)} />

                                                      <div className="input-group-addon HRMSAddon nextAddon col-lg-2 col-md-2 col-sm-2 col-xs-2" id="nextDate" onClick={this.nextDate.bind(this)}>
                                                        <span className="fa fa-caret-right nextarrow"></span>
                                                      </div>
                                                 
                                              </div>
                                              
                                             <div className="col-lg-6 nopadding" >
                                                  <div className="input-group inputBox-main nameParts" id="toTime">
                                                      <div className="input-group-addon inputIcon"><i className="fa fa-clock-o"></i></div>
                                                        {/*} <DateTime 
                                                          onChange={this.toTime.bind(this)}
                                                          value={this.state.toTime}
                                                          name="toTime"
                                                          id="toTime"
                                                          />*/}
                                                         <TimePicker
                                                          showSecond={false}
                                                          className="col-lg-12 nopadding"
                                                          value={this.state.toTime}
                                                          // format={format}
                                                          placeholder="Time"
                                                          name="toTime"
                                                          id="toTime"
                                                          onChange={this.toTime.bind(this)}
                                                          // use12Hours
                                                          inputReadOnly
                                                          />
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="form_margin col-lg-12 col-md-12 col-sm-12 col-xs-12 mgnBottom nopadding">
                                            <div className="col-lg-3 nopadding" >
                                            <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">No of Days</label>
                                            <div className="input-group inputBox-main nameParts col-md-12 col-xs-12">
                                              <div className="input-group-addon inputIcon"><i className="fa fa-calendar"></i></div>
                                              <input type="number" value={this.state.noOfdays} className="form-control" disabled/>
                                            </div>
                                            </div>
                                            <div className="col-lg-9 col-sm-12 col-xs-12">
                                                <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Purpose of Travel<span className="asterix">*</span></label>
                                                <div className="input-group inputBox-main nameParts col-md-12 col-xs-12">
                                                <div className="input-group-addon inputIcon"><i className="fa fa-users"></i></div>
                                                <select value={this.state.purposeOfTravel} name="purposeOfTravel" ref="purposeOfTravel" id="purposeOfTravel" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12 errorinputText" onChange={this.handleChange.bind(this)}>
                                                <option value="" disabled>Select Purpose</option>
                                                {this.state.purposeArray && this.state.purposeArray.length > 0 ?
                                                  this.state.purposeArray.map((data,index)=>{
                                                    return(
                                                      <option key={index} value={data.purposeType}>{data.purposeType}</option>
                                                    )
                                                  })
                                                  :
                                                  <option value="" disabled>NO DATA FOUND</option>
                                                  
                                                }
                                                <option value="Other">Other</option>
                                                </select>
                                                </div>
                                                {this.state.otherPurpose ?
                                                <input type="text" value={this.state.purposeOfTravelOther} name="purposeOfTravelOther" ref="purposeOfTravelOther" id="purposeOfTravelOther" placeholder="Enter purpose of travel" className="form-control form_margin col-lg-12 col-md-12 col-sm-12 col-xs-12" onChange={this.handleChange.bind(this)} />
                                                :
                                                null
                                                }
                                            </div>
                                          </div>
                                          <div className="form_margin col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                                              <div className="col-lg-12 nopadding" >
                                                 <div className="col-lg-6 col-md-6 nopadding addStopDivStyle" onClick={this.showAddStop.bind(this)}> <i className="fa fa-plus-circle addStopbtn" aria-hidden="true"></i><label className="labelform">Add Stops</label> </div>
                                                  <div className="btn btn-link col-lg-4 pull-right nopadding" onClick={this.showInstuction.bind(this)}>
                                                    Special instructions here
                                                  </div>
                                                  {this.state.showAddStop ?
                                                  <div className=" col-lg-12 input-group inputBox-main nameParts" id="stops">
                                                      {/*<div className="input-group-addon inputIcon"><i className="fa fa-map-marker "></i></div>*/}
                                                      <PlacesAutocomplete
                                                      value={this.state.stops}
                                                      onChange={this.handleChangeStopPlaces}
                                                      onSelect={this.handleSelectStopAddr}
                                                      searchOptions={searchOptions}
                                                    >
                                                      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                                        <div>
                                                          <input
                                                            {...getInputProps({
                                                              placeholder: 'Search Stop Location ...',
                                                              id:"stops",
                                                              className: 'location-search-input col-lg-12 form-control',
                                                            })}
                                                          />
                                                          <div className="autocomplete-dropdown-container">
                                                            {loading && <div>Google API has some trouble loading. Please type the address.</div>}
                                                            {suggestions.map(suggestion => {
                                                              const className = suggestion.active
                                                                ? 'suggestion-item--active'
                                                                : 'suggestion-item';
                                                              // inline style for demonstration purpose
                                                              const style = suggestion.active
                                                                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                              return (
                                                                <div
                                                                  {...getSuggestionItemProps(suggestion, {
                                                                    className,
                                                                    style,
                                                                  })}
                                                                >
                                                                  <span>{suggestion.description}</span>
                                                                </div>
                                                              );
                                                            })}
                                                          </div>
                                                        </div>
                                                      )}
                                                    </PlacesAutocomplete>
                                                  </div>
                                                  :
                                                  null
                                                  }
                                              </div>
                                          </div>
                                         {
                                          this.state.stopArr && this.state.stopArr!="" ?
                                              this.state.stopArr.length > 0 ?
                                                this.state.stopArr.map((data, index) => {
                                                  return (
                                                    <div className=" col-lg-12 row customInputInline " key={index}>
                                                      <div className=" col-lg-10 borderBottomBM nopadding">
                                                      <label className="col-lg-12 col-md-12">{data.address}</label>
                                                      </div>
                                                      <i className="fa fa-times crossButton" aria-hidden="true" title="Delete Stop" idIndex={index} onClick={this.deleteStop.bind(this)}></i>
                                                    </div>
                                                  )
                                                })
                                                :
                                                <div >

                                                </div>
                                              :
                                              null
                                            }
                                            {this.state.showInstuction ?
                                            <div className="form_margin nopadding col-lg-12 col-md-12 col-sm-12 col-xs-12  ">
                                                  <textarea rows="4" className="customTextArea col-lg-12 col-md-12 col-sm-12 col-xs-12" name="instructions" value={this.state.instructions} ref="instructions" onChange={this.handleChange.bind(this)} placeholder="Special Instructions here"></textarea> 
                                            </div>
                                            :
                                            null
                                           }
                                            <div className="form_margin col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                                             
                                             {this.state.vehicleData && this.state.vehicleData.length > 0 ?
                                                this.state.vehicleData.length > 5 ? 
                                                <OwlCarousel
                                                  className="owl-theme"
                                                  loop ={true}
                                                  // center = {true}
                                                  items={6}
                                                  dots = {false}
                                                  margin={10}
                                                  nav = {true}
                                                 >
                                                      {this.state.vehicleData.map((data,ind)=>{
                                                          return(
                                                                <div key={ind} className={"item itemStyle "+data._id} id={'item-'+data._id} onClick={this.getCarData.bind(this,data.category,data._id)}>
                                                                    {data.iconUrl ? <img src={data.iconUrl}/> : <img src="/images/car.png"/>}
                                                                    <p style={{'text-align':'center'}}>{data.category}</p>
                                                                </div>
                                                            )
                                                      })
                                                     }
                                                   </OwlCarousel>
                                                 :
                                                this.state.vehicleData.map((data,ind)=>{
                                                    return(
                                                        <button className={"col-lg-2 innerCarContainer item itemStyle "+data._id} id={'item-'+data._id} key={ind} onClick={this.getCarData.bind(this,data.category,data._id)}>
                                                            <span className="premiumHead col-md-12">{data.category}</span>
                                                            {data.iconUrl ? <img src={data.iconUrl}/> : <img src="/images/car.png"/>}
                                                        </button>  
                                                    )
                                                })
                                                :
                                                <div>NO VEHICLE CATEGORY ADDED YET. PLEASE CONTACT ADMIN</div>

                                             }   
                                             </div>     
                                            {this.state.showreasonForSelectingVehicle == true ? 
                                              <div className="form_margin col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding" id="reasonForSelectingVehicle">
                                               <textarea rows="4" className="customTextArea errorinputText col-lg-12 col-md-12 col-sm-12 col-xs-12" name="reasonForSelectingVehicle" value={this.state.reasonForSelectingVehicle} ref="reasonForSelectingVehicle" id="reasonForSelectingVehicle" onChange={this.handleChange.bind(this)} placeholder="Reason for selecting this vehicle here" required></textarea> 
                                              </div>
                                              :
                                              null
                                            }
                                                                               
                                          
                                          {this.state.showPackages ?
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding packageBox">
                                          <label className="col-md-12 col-sm-12 packageLabel">Please Select Package</label>
                                          {this.state.contractData && this.state.contractData.length > 0 ?

                                            this.state.contractData.map((data,index)=>{
                                              return(
                                                <div key={index} className="form-check col-lg-4 col-md-4 col-sm-4 col-xs-6">
                                                     <label className="form-check-label">
                                                     <a href="#" data-tip data-for={data._id+'-Tooltip'} className="pull-right">
                                                     <i title=
                                                     {"MaxHours:"+data.maxHours+", maxKm:"+data.maxKm+", extraHr:"+data.extraHr+", extraKms:"+data.extraKms+", fixCharges:"+data.fixCharges+", driverAllowance:"+data.driverAllowance+", nightCharges:"+data.nightCharges+", morningCharges:"+data.morningCharges} 
                                                      className="fa fa-question-circle"></i> </a>
                                                         <input type="radio" 
                                                         className="form-check-input" 
                                                         ref="package" 
                                                         name="package" 
                                                         id={data._id} 
                                                         datapackage={data.packageID} 
                                                         datapackagetype={data.packageTypeId} 
                                                         datacost={data.fixCharges} 
                                                         value={data._id} 
                                                         onChange={this.handlePackageChange.bind(this)} 
                                                         checked={this.state.package === data._id}
                                                        />&nbsp;{data.packageName}
                                                     </label>
                                                 </div>
                                              )
                                            })
                                            :
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">No Packages Found</div>
                                          }
                                          </div>
                                          :
                                          null
                                          }
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 hideBtn nopadding mt40">
                                            <button className="col-lg-4 col-md-2 col-sm-12 col-xs-12 btn bookButton pull-right" id="btnCheck" onClick={this.getData.bind(this)} >
                                              Submit
                                            </button>
                                          </div>
                                      </form>
                                    </div>

                                  </div>
                              </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pickupType bookingDiv showBookingDetails nopadding" >
                             <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                             {this.state.userID ?
                             <EmployeeDetails personID={ this.state.booking_id ? this.state.user_ID :this.state.userID} managerID={this.state.managerID1} approvalRequired={this.state.approvalRequired} />                   
                              :
                              <p className="sample">PLEASE FILL YOUR PROFILE FIRST. CLICK <a href="/my-profile">My Profile</a> TO GOTO PROFILE PAGE</p>
                              }
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding" >
                              <TripDetails personID={this.state.userID} tripData={this.state.tripArray} />                    
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding" >
                              <CarDetails personID={this.state.userID} tripData={this.state.tripArray}/>                    
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                              <EstimatedCost personID={this.state.userID} cost={this.state.estimatedCost} />                    
                            </div>

                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 btnMargin">

                              {this.state.booking_id && this.state.from && this.state.to && this.state.toTime && this.state.purposeOfTravel && this.state.selectedVehicle && this.state.fromTime && this.state.pickupDate && this.state.returnDate && this.state.fromPincode && this.state.toPincode ?
                              <button className="col-lg-4 col-md-2 col-sm-12 col-xs-12 btn bookButton pull-right" id="btnCheck" onClick={this.updateData.bind(this)} >
                                Update
                              </button>
                              :
                                this.state.userID && this.state.from && this.state.to && this.state.toTime && this.state.purposeOfTravel && this.state.selectedVehicle && this.state.fromTime && this.state.pickupDate && this.state.returnDate && this.state.fromPincode && this.state.toPincode && this.state.package ?
                                <div>
                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    {this.renderElement()}
                                  </div>
                                  <button className="col-lg-4 col-md-2 col-sm-12 col-xs-12 btn bookButton pull-right" id="btnCheck" onClick={this.getData.bind(this)} >
                                    Book Now
                                  </button>
                                </div>
                                :
                                null
                              }
                            </div>
                          </div>
                      </div>
                      <div id="bulkBooking" className="tab-pane fade in col-lg-12 col-md-12 col-sm-12 col-xs-12 mt">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 outerForm">
                            <BulkUpload url="/api/bookingmaster/bulkUploadBooking"
                                data={{"createdBy": localStorage.getItem("user_ID"), "corporateId": this.state.corporateId }}
                                fileurl="https://fivebees.s3.ap-south-1.amazonaws.com/prod/master/Booking.xlsx"
                                getFileDetails={this.getFileDetails.bind(this)}
                                fileDetails={this.state.fileDetails}
                                goodRecordsHeading={this.state.goodRecordsHeading}
                                failedtableHeading={this.state.failedtableHeading}
                                failedRecordsTable={this.state.failedRecordsTable}
                                failedRecordsCount={this.state.failedRecordsCount}
                                goodRecordsTable={this.state.goodRecordsTable}
                                goodDataCount={this.state.goodDataCount}
                            />
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
export default BookingMaster;

