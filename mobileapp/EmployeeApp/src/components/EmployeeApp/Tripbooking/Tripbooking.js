import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  View, Button, AsyncStorage,
  TouchableOpacity, TextInput, Image,
} from 'react-native';
import axios from "axios";
import { colors, projectName } from '../../../config/styles.js';
import { Header, Card, Icon } from 'react-native-elements';
import styles from './style.js';
import ValidationComponent from "react-native-form-validator";

import { connect } from 'react-redux';
import Carshow from '../Carshow/carshow.js'
import Geolocation from 'react-native-geolocation-service';
import HeaderBar from '../../../layouts/EmployeeHeader/Header.js';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import { TextField } from "react-native-material-textfield";
import Modal from "react-native-modal";
import Textarea from 'react-native-textarea';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
var addstopArray=[];

class Tripbooking extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      showDiv: false,
      toggleButtonValue: "Round Trip",
      bookingType: "Local",
      pickupDate: moment(new Date).format("YYYY-MM-DD"),
      returnDate: moment(new Date).format("YYYY-MM-DD"),
      fromTime: "",
      from: "",
      to: "",
      toTime: "",
      purposeOfTravel: "",
      instructions: "",
      valueOfTab: "",
      stopArr: [],
      addstopArray: [],
      packageTypeVal: [],
      vehicleData: [],
      empHomeAddr: "",
      empWorkAddr: "",
      radioButtonValue: "Home",
      address: "",
      selectedVehicle: "",
      specialInstruction: "",
      fromLatLng: [],
      toLatLng: [],
      stopLatLng: [],
      tripArray: [],
      vehicleCategoryId: "",
      fromArea: "",
      fromCity: "",
      fromState: "",
      fromCountry: "",
      fromPincode: "",
      toArea: "",
      toCity: "",
      toState: "",
      toCountry: "",
      toPincode: "",
      stopArea: "",
      stopCity: "",
      stopState: "",
      stopCountry: "",
      stopPincode: "",
      otheremp: "",
      employeedata: "",
    }
  }
  validInput = () => {
    const {
      fromaddress,
      toaddress,
      stopsaddress,
    } = this.state;
    let valid = true;
    this.validate({
      fromaddress: {
        required: true,
        letters: true,
      },
      toaddress: {
        required: true,
        letters: true,
      },
      stopsaddress: {
        required: true,
        letters: true,
      },
    });

    if (this.isFieldInError("fromaddress")) {
      this.setState({ fromaddressError : this.getErrorsInField("fromaddress")});
      valid = false;
    } else {
      this.setState({ fromaddressError: "" });
      valid = true;
    }
    if (this.isFieldInError("toaddress")) {
      this.setState({ toaddressError : this.getErrorsInField("toaddress")});
      valid = false;
    } else {
      this.setState({ toaddressError: "" });
      valid = true;
    }
    if (this.isFieldInError("stopaddress")) {
      this.setState({ stopaddressError: this.getErrorsInField("stopaddress") });
      valid = false;
    } else {
      this.setState({ stopaddressError: "" });
      valid = true;
    }
    return ((!this.isFieldInError("fromaddress")) && (!this.isFieldInError("toaddress")) && (!this.isFieldInError("stopaddress")));
  };

  validInputField = (stateName, stateErr) => {
    const {
      fromaddress,
      toaddress,
      stopsaddress,
    } = this.state;
    let valid = true;

    this.validate({
      [stateName]: {
        required: true,
      },
    });

    if (this.isFieldInError(stateName)) {
      let validinptError = this.getErrorsInField(stateName);
      this.setState({ validinptError });
      valid = false;
    } else {
      this.setState({ [stateErr]: "" });
    }

    return valid;
  };

  componentDidMount() {
    AsyncStorage.multiGet(['token', 'user_id'])
      .then((data) => {
        user_id = data[1][1]
        this.setState({ user_id: user_id })
        this.gettripdetails();
      });

    this.getCarData();
  }
  gettripdetails() {
    axios.get('/api/users/get/' + this.state.user_id)
      .then((response) => {
        const fullName = response.data.firstname + " " + response.data.lastname;
        const mobile = response.data.mobile;
        const emailid = response.data.email;
        this.setState({ fullName: fullName, mobile: mobile })
        
        axios.get("/api/personmaster/get/emailID/" + emailid)
          .then((response) => {
            // departmentId : response.data.data[0].departmentId,
            // console.log("response.data ==>> ",response.data.data[0])
            // console.log("response.data company_Id ==>> ",response.data.data[0].company_Id)
            this.setState({
              company_Id:response.data.data[0].company_Id,
            })
            if (response.data.data[0].bookingApprovalRequired == 'Yes') {
              var managerID1 = response.data.data[0].approvingAuthorityId1;
              var managerID2 = response.data.data[0].approvingAuthorityId2;
              var managerID3 = response.data.data[0].approvingAuthorityId3;
              
              
              axios.get("/api/personmaster/get/UserID/" + managerID1)
                .then((response) => {
                  this.setState({
                    managerId1: response.data.data[0]._id,
                    approvalRequired: 'Yes'
                  })
                })
                .catch((error) => {
                  console.log('error: ', error)
                })
              axios.get("/api/personmaster/get/UserID/" + managerID2)
                .then((response) => {
                  this.setState({
                    managerId2: response.data.data[0]._id,
                  })
                })
                .catch((error) => {
                  console.log('error: ', error)
                })
              axios.get("/api/personmaster/get/UserID/" + managerID3)
                .then((response) => {
                  this.setState({
                    managerId3: response.data.data[0]._id,
                  })
                })
                .catch((error) => {
                  console.log('error: ', error)
                })
            }
            // console.log("_id  ", response.data.data[0]._id);
            // console.log("employeeId==>>>  ", response.data.data[0].employeeId);
            this.setState({ employeeId: response.data.data[0].employeeId, employee_id: response.data.data[0]._id,departmentId : response.data.data[0].departmentId, })
          })

          .catch((error) => {
            console.log("error", error);
          })
      })
      .catch((error) => { })
  }
  addlocation() {
    // this.props.navigation.navigate("Carshow");
  }
  onSelect(index, value) {
    this.setState({
      value: value
    })
  }
  deleteStop(index) {
    var addstopArray = [];
    addstopArray.splice(index, 1);
    var array = {
      addstopArray: addstopArray
    }
    this.setState({
      addstopArray: addstopArray,
    })
  }
  other = () => {
    this.setState({ otheremp: true })
  }
  closeok = () => {
    // console.log("otheremp in close==>",otheremp);
    this.setState({ otheremp: false })
  }
  onSelect(index, value) {
    this.setState({
      value: value
    })
  }
  
  getCarData() {
    var today = moment().format("YYYY-MM-DD");
    console.log("Todays date==>",today);
    axios.get('/api/contract/get/packageData/' + today)
      .then((response) => {
        console.log("response.data in contract==>>",response.data[0].packages[0].packageId  )
        this.setState({
          contractId : response.data[0]._id,
          packageId: response.data[0].packages[0].packageId,
          estimatedCost: 5000
        })
        axios.get('/api/packagemaster/get/one/' + response.data[0].packages[0].packageId)
          .then((res) => {
            console.log("packagemaster date==>",res.data.packageTypeId);
            this.setState({
              packageTypeId: res.data.packageTypeId,
            })
          })
      })
      .catch((error) => {
        console.log('error: ', error)
      })
  }
  addStop() {
    if(this.validInput()){
    addstopArray.push({ "address": this.state.stopsaddress,
      "country"   : this.state.stopscountry,
      "state"     : this.state.stopsstate,
      "district"  : this.state.stopscity,
      "city"      : this.state.stopscity,
      "area"      : this.state.stopsarea,
      "pincode"   : this.state.stopsPincode,
      "latitude"  : this.state.stopslatlong? this.state.stopslatlong.lat  : null,
      "longitude" : this.state.stopslatlong?this.state.stopslatlong.lng  : null
    });
    this.setState({
      addstopArray: addstopArray,
      stops: "",
    })
  }
  }
  employeedata() {
    // this.setState({ otheremp: false })
    axios.get("/api/personmaster/get/UserID/" + this.state.employeeId)
      .then((response) => {
        // console.log("pserson master", response.data.data[0].firstName + ' ' + response.data.data[0].lastName);
        this.setState({
          userID: response.data.data[0]._id,
          mobile: response.data.data[0].contactNo,
          fullName: response.data.data[0].firstName + ' ' + response.data.data[0].lastName,
          
        })
        // this.closeok();
      })
      .catch((error) => {
      })
  }
  handleSubmit = () => {
    var formValues = {
      "packageTypeId": this.state.packageTypeId,
      "packageId": this.state.packageId,
      "from": {
        "address": this.state.fromaddress,
        "country": this.state.fromcountry,
        "state": this.state.fromstate,
        "district": this.state.fromcity,
        "city": this.state.fromcity,
        "area": this.state.fromarea,
        "pincode": this.state.fromPincode,
        "latitude": this.state.fromlatlong.lat,
        "longitude": this.state.fromlatlong.lng,
        "formattedaddress": this.state.formatted_address
      },
      "to": {
        "address": this.state.toaddress,
        "country": this.state.tocountry,
        "state": this.state.tostate,
        "district": this.state.tocity,
        "city": this.state.tocity,
        "area": this.state.toarea,
        "pincode": this.state.toPincode,
        "latitude": this.state.tolatlong.lat,
        "longitude": this.state.tolatlong.lng,
        "formattedaddress": this.state.toformatted_address
      },
      "vehicleCategoryId": this.props.vehicleCategoryId,
      "employeeId": this.state.employee_id,
      "contractId": this.state.contractId,
      "departmentId": this.state.departmentId,
      "corporateId": this.state.company_Id,
      "managerId1": this.state.managerId1,
      "managerId2": this.state.managerId2,
      "managerId3": this.state.managerId3,
      "pickupDate": moment(this.state.pickupDate),
      "pickupTime": moment(this.state.pickupTime),
      "returnDate": moment(this.state.returnDate),
      "returnTime": moment(this.state.returnTime),
      "specialInstruction": this.state.specialInstruction,
      "purposeOfTravelled": this.state.purposeOfTravel,
      "estimatedCost": this.state.estimatedCost,
      "reasonForSelectingVehicle": "this.state.reasonForSelectingVehicle",
      "createdBy": this.state.user_id,
      "approvalRequired": this.state.approvalRequired,
      "intermediateStops": this.state.addstopArray,
      "status": {
        "value": "New",
        "statusBy": this.state.user_id,
        "allocatedTo" : this.state.managerId1,
        "statusAt": moment(new Date),
      }
    }
    console.log('formValues in before result==>>', formValues)
    axios.post('/api/bookingmaster/post', formValues)
      .then((response) => {
            // ============================ Notification =======================
            axios.get('/api/users/get/' + this.state.user_id)
            .then((userData) => {
              
              var sendDataToUser = {
                "templateName": "Trip Booking",
                "toUserId": userData.data._id,
                "variables": {
                  "EmployeeName"        : userData.data.fullName,
                  "TripPick-upLocation" : response.data.data.from.formattedaddress,
                  "TripDropLocation"    : response.data.data.to.formattedaddress,
                  "TripFromDate&Time"   : moment(response.data.data.pickupDate).format('DD-MMM-YY') + moment(response.data.data.pickupTime).format('LT'),
                  "TripToDate&Time"     : moment(response.data.data.returnDate).format('DD-MMM-YY') + moment(response.data.data.returnTime).format('LT'),
                }
              }
              var sendDataToAdmin = {
                "templateName": "Trip Booking For Admin",
                "toUserId": "SuperAdmin",
                "variables": {
                  "EmployeeName"        : userData.data.fullName,
                  "TripPick-upLocation" : response.data.data.from.formattedaddress,
                  "TripDropLocation"    : response.data.data.to.formattedaddress,
                  "TripFromDate&Time"   : moment(response.data.data.pickupDate).format('DD-MMM-YY') + moment(response.data.data.pickupTime).format('LT'),
                  "TripToDate&Time"     : moment(response.data.data.returnDate).format('DD-MMM-YY') + moment(response.data.data.returnTime).format('LT'),
                }
              }
              // var sendDataToCoporate = {
              //   "templateName": "Trip Booking For Corporate Admin",
              //   "toUserId": "Corporate Admin",
              //   "variables": {
              //     "EmployeeName"        : userData.data.fullName,
              //     "TripPick-upLocation" : response.data.data.from.area,
              //     "TripDropLocation"    : response.data.data.to.area,
              //     "TripFromDate&Time"   : moment(response.data.data.pickupDate).format('DD-MMM-YY') + moment(response.data.data.pickupTime).format('LT'),
              //     "TripToDate&Time"     : moment(response.data.data.returnDate).format('DD-MMM-YY') + moment(response.data.data.returnTime).format('LT'),
              //   }
              // }
              
              axios.post('/api/masternotifications/post/sendNotification', sendDataToUser)
                  .then((res) => {
                    console.log('sendDataToUser in result==>>>', res.data)
                    const bookingId = response.data.bookingId;
                    this.props.navigation.navigate("BookingReceiptView", { bookingId: bookingId, employeeId: this.state.employeeId, fullName: this.state.fullName, mobile: this.state.mobile });
                  })
                  .catch((error) => { })

                  axios.post('/api/masternotifications/post/sendNotification', sendDataToAdmin)
                  .then((res) => {
                    // console.log('sendDataToAdmin in result==>>>', res.data)
                    const bookingId = response.data.bookingId;
                    this.props.navigation.navigate("BookingReceiptView", { bookingId: bookingId, employeeId: this.state.employeeId, fullName: this.state.fullName, mobile: this.state.mobile });
                  })
                  .catch((error) => { })
              
  
            })
  
        
      })
      .catch((error) => { console.log('error: ', error) })
  }
  render() {
    const { navigation } = this.props;
    // const hideDatePicker = () => {
    //   setDatePickerVisibility(false);
    // };
    return (
      <React.Fragment>
        <View style={styles.overlay} />
        <HeaderBar navigation={navigation} showBackBtn={true} />
        <ScrollView keyboardDismissMode="none" keyboardShouldPersistTaps="handled">
          <View style={styles.headpageimg}>
            <Text style={styles.carname}> Trip Booking </Text>
          </View>
          <Card containerStyle={[styles.sliderView]}>
            <View style={styles.other}>
              <View style={styles.otheremp}>
                <Text style={styles.bookingtxt}>
                  Booking For
                    </Text>
              </View>
              <View style={styles.otherempbtn}>
                <TouchableOpacity onPress={() => { this.other() }} >
                  <Text style={styles.txtotherbtn}>
                    Other
                        </Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.bookingempname}>
              Mr {this.state.fullName} (EmpId : {this.state.employeeId})
                </Text>
            <View style={[styles.formInputView]}>
              <GooglePlacesAutocomplete
                placeholder='Pick-Up Location'
                minLength={2} // minimum length of text to search
                autoFocus={false}
                returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                listViewDisplayed={false}    // true/false/undefined
                fetchDetails={true}
                
                onChangeText={(this.state.from)}
                value={this.state.from}
                enablePoweredByContainer={false}

                renderDescription={row => row.description} // custom description render
                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                  for (var i = 0; i < details.address_components.length; i++) {
                    for (var b = 0; b < details.address_components[i].types.length; b++) {
                      switch (details.address_components[i].types[b]) {
                        case 'sublocality_level_2':
                          var address = details.address_components[i].long_name;
                          break;
                        case 'sublocality_level_1':
                          var area = details.address_components[i].long_name;
                          break;
                        case 'locality':
                          var city = details.address_components[i].long_name;
                          break;
                        case 'administrative_area_level_1':
                          var state = details.address_components[i].long_name;
                          break;
                        case 'country':
                          var country = details.address_components[i].long_name;
                          break;
                        case 'postal_code':
                          var pincode = details.address_components[i].long_name;
                          break;
                      }
                    }
                  }
                  const latlong = details.geometry.location
                  this.setState({
                    fromaddress: details.formatted_address,
                     fromarea: area, fromcity: city,
                      fromstate: state, fromcountry: country, fromPincode: pincode, fromlatlong: latlong,
                      formatted_address:details.formatted_address,
                  })
                }}
                getDefaultValue={() => ''}
                query={{
                  key: 'AIzaSyCrzFPcpBm_YD5DfBl9zJ2KwOjiRpOQ1lE',
                }}
                styles={{
                  textInputContainer: {
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderTopWidth: 0,
                    borderBottomWidth: 0,

                  },
                  textInput: {
                    marginTop: 10,
                  },
                  
                }}
              />
            </View>
            <View style={[styles.formInputView, styles.marginBottom20]}>
              <GooglePlacesAutocomplete
                placeholder='Drop Location'
                minLength={2} // minimum length of text to search
                // autoFocus={false}
                returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                listViewDisplayed={false}    // true/false/undefined
                fetchDetails={true}
                onChangeText={(this.state.to)}
                value={this.state.to}
                enablePoweredByContainer={false}
                renderDescription={row => row.description} // custom description render
                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                  const latlong = details.geometry.location
                  for (var i = 0; i < details.address_components.length; i++) {
                    for (var b = 0; b < details.address_components[i].types.length; b++) {
                      switch (details.address_components[i].types[b]) {
                        case 'sublocality_level_2':
                          var address = details.address_components[i].long_name;
                          break;
                        case 'sublocality_level_1':
                          var area = details.address_components[i].long_name;
                          break;
                        case 'locality':
                          var city = details.address_components[i].long_name;
                          break;
                        case 'administrative_area_level_1':
                          var state = details.address_components[i].long_name;
                          break;
                        case 'country':
                          var country = details.address_components[i].long_name;
                          break;
                        case 'postal_code':
                          var pincode = details.address_components[i].long_name;
                          break;
                      }
                    }
                  }
                  
                  this.setState({
                      toaddress: details.formatted_address, toarea: area, tocity: city,
                      tostate: state, tocountry: country, tolatlong: latlong,
                      toPincode: pincode,toformatted_address:details.formatted_address
                  })
                }}
                getDefaultValue={() => ''}
                query={{
                  key: 'AIzaSyCrzFPcpBm_YD5DfBl9zJ2KwOjiRpOQ1lE',
                }}
                styles={{
                  textInputContainer: {
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderTopWidth: 0,
                    borderBottomWidth: 0,

                  },
                  textInput: {
                    marginTop: 10,
                  },
                }}
              />
            </View>
            <View style={{ flex: 1, flexDirection: 'row', position: "relative", }}>
              <View style={styles.borderdate}>
                <TouchableOpacity onPress={() => this.setState({ isDatePickerVisibleStart: true, isDatePickerVisibleEnd: false })} >
                  {
                    this.state.pickupDate !== "" ?
                      <View style={styles.datetimeText} value={this.state.pickupDate}>
                        <Text style={styles.monthText}>
                          <Text style={styles.dateText} >
                            {this.state.pickupDate !== "" ? moment(this.state.pickupDate).format('DD') : ""} 
                             </Text>{this.state.pickupDate !== "" ? moment(this.state.pickupDate).format('MMM') : ""} , 
                             <Text style={styles.dayText}>
                             {this.state.pickupDate !== "" ? moment(this.state.pickupDate).format('ddd') : ""}
                          </Text>
                        </Text>
                      </View>
                      :
                      <View style={styles.selectdate} >
                        <Text style={styles.startselect}>Select Start Date</Text>
                      </View>
                  }
                </TouchableOpacity>
                {
                  this.state.pickupTime == "" ?
                    this.state.pickupDate == "" ?
                      null
                      :
                      <View >
                        <TouchableOpacity onPress={() => this.setState({ isTimePickerVisibleStart: true, isTimePickerVisibleEnd: false })}>
                          <Text style={styles.selecttime}> Please Select Time </Text>
                        </TouchableOpacity>

                      </View>
                    :
                    <View value={this.state.pickupTime}>
                      <TouchableOpacity onPress={() => this.setState({ isTimePickerVisibleStart: true, isTimePickerVisibleEnd: false })}>
                        <Text style={styles.timeText}> Time: {this.state.pickupTime !== "" ? moment(this.state.pickupTime).format('LT') : ""} </Text>
                      </TouchableOpacity>
                    </View>

                }

              </View>
              <View style={styles.midcircle}>
              </View>
              <View style={styles.borderdate}>
                <View>
                  <TouchableOpacity onPress={() => this.setState({ isDatePickerVisibleEnd: true, isDatePickerVisibleStart: false })}>
                    {this.state.returnDate !== "" ?
                      <View style={styles.datetimeText} value={this.state.returnDate} >
                        {/* <Text style={styles.dateText}>{this.state.returnDate !== "" ? moment(this.state.returnDate).format('DD') : ""}</Text> */}
                        <Text style={styles.monthText}>
                        
                          <Text style={styles.dateText}>{this.state.returnDate !== "" ? moment(this.state.returnDate).format('DD') : ""}</Text>
                          <Text style={styles.monthText}> {this.state.returnDate !== "" ? moment(this.state.returnDate).format('MMM') : ""}, </Text>
                          <Text style={styles.dayText}>{this.state.returnDate !== "" ? moment(this.state.returnDate).format('ddd') : ""} </Text>
                        </Text>
                      </View>
                      :
                      <View style={styles.selectdate} >
                        <Text style={styles.startselect}>Select End Date</Text>
                      </View>
                    }
                  </TouchableOpacity>
                </View>
                {
                  this.state.returnTime == "" ?
                    this.state.returnDate == "" ?
                      null
                      :
                      <View >
                        <TouchableOpacity onPress={() => this.setState({ isTimePickerVisibleEnd: true, isTimePickerVisibleStart: false })}>
                          <Text style={styles.selecttime}> Please Select Time </Text>
                        </TouchableOpacity>

                      </View>
                    :
                    <View value={this.state.returnTime}>
                      <TouchableOpacity onPress={() => this.setState({ isTimePickerVisibleStart: false, isTimePickerVisibleEnd: true })}>
                        <Text style={styles.timeText}> Time: {this.state.returnTime !== "" ? moment(this.state.returnTime).format('LT') : ""} </Text>
                      </TouchableOpacity>
                    </View>
                }
              </View>
            </View>
            <View style={[styles.addlocation]}>
              <View style={[styles.addloc]}>
                <View style={[styles.formInputView]}>
                  <GooglePlacesAutocomplete
                    placeholder='Add Stops'
                    minLength={2}
                    returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                    keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                    listViewDisplayed={false}    // true/false/undefined
                    fetchDetails={true}
                    
                    onChangeText  = {(stopsaddress) => { this.setState({ stopsaddress }, () => { this.validInputField('stopsaddress', 'stopsaddressError'); }) }}
                    value={this.state.stops}
                    enablePoweredByContainer={false}
                    renderDescription={row => row.description} // custom description render
                    onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                      const latlong = details.geometry.location
                      for (var i = 0; i < details.address_components.length; i++) {
                        for (var b = 0; b < details.address_components[i].types.length; b++) {
                          switch (details.address_components[i].types[b]) {
                            case 'sublocality_level_2':
                              var address = details.address_components[i].long_name;
                              break;
                            case 'sublocality_level_1':
                              var area = details.address_components[i].long_name;
                              break;
                            case 'locality':
                              var city = details.address_components[i].long_name;
                              break;
                            case 'administrative_area_level_1':
                              var state = details.address_components[i].long_name;
                              break;
                            case 'country':
                              var country = details.address_components[i].long_name;
                              break;
                            case 'postal_code':
                              var pincode = details.address_components[i].long_name;
                              break;
                          }
                        }
                      }
                      console.log("address==>",details.formatted_address);
                      this.setState({
                        stopsaddress: details.formatted_address,stopsarea: area, stopscity: city, stopsstate: state, stopscountry: country, stopslatlong: latlong, stopsPincode: pincode
                      })

                    }}
                    getDefaultValue={() => ''}
                    query={{
                      key: 'AIzaSyCrzFPcpBm_YD5DfBl9zJ2KwOjiRpOQ1lE',
                    }}
                    styles={{
                      textInputContainer: {
                        backgroundColor: 'rgba(0,0,0,0)',
                        borderTopWidth: 0,
                        borderBottomWidth: 0,
                      },
                      textInput: {
                        marginTop: 10,
                      },
                    }}
                  />
                </View>
              </View>
              <View style={[styles.addlocbtn]}>
                <TouchableOpacity onPress={() => { this.addStop() }} >
                  <View style={styles.addbtnshow} >
                    <Text style={styles.txtaddbtn}>
                      Add
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* <View style={[styles.addloc]}> */}
              {
                
                this.state.addstopArray && this.state.addstopArray.length > 0 ?
                  this.state.addstopArray.map((data, index) => {
                    return (
                      <View key={index}>
                        <View style={[styles.addlocation]}>
                          <View style={[styles.addloc]}>
                            <View style={[styles.inputWrapper]}>
                              <View style={styles.inputTextWrapper}>  
                                <TextField
                                  label="Add Location"
                                  lineWidth={1}
                                  numberOfLines = {1}
                                  inputContainerPadding={0}
                                  value={data.address}
                                  labelHeight={15}
                                  containerStyle={styles.textContainer}
                                  inputContainerStyle={styles.textInputContainer}
                                  titleTextStyle={styles.viewmore}
                                  style={styles.textStyle}
                                  labelTextStyle={styles.textLabel}
                                />
                              </View>
                            </View>
                          </View>
                          <View style={[styles.addlocbtn]}>
                            <TouchableOpacity style={[styles.closebtn]} onPress={this.deleteStop.bind(this)} >
                              <Icon size={28} name='close' type='AntDesign' color='#333'  />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    )
                  })
                  :
                  null
              }
            {/* </View> */}
            <View style={[styles.formInputView, styles.marginBottom20]}>
              <View style={styles.inputTextWrapper}>
                <TextField
                  label="Purpose of Travel"
                  onChangeText={(purposeOfTravel) => { this.setState({ purposeOfTravel }) }}
                  lineWidth={1}
                  tintColor={colors.button}
                  inputContainerPadding={0}
                  labelHeight={15}
                  baseColor={'#666'}
                  textColor={'#333'}
                  value={this.state.purposeOfTravel}
                  containerStyle={styles.textContainer}
                  inputContainerStyle={styles.textInputContainer}
                  titleTextStyle={styles.textTitle}
                  style={styles.textStyle}
                  labelTextStyle={styles.textLabel}
                  keyboardType="default"
                />
              </View>
            </View>
            <Textarea
              containerStyle={styles.textareaContainer}
              style={styles.textarea}
              onChangeText={(specialInstruction) => { this.setState({ specialInstruction }) }}
              defaultValue={this.state.text}
              maxLength={120}
              value={this.state.specialInstruction}
              placeholder={'Special Instructions'}
              placeholderTextColor={'#c7c7c7'}
            />
            <View style={[styles.carshows]}>
              <View style={styles.carouseldata}>
              <View style={styles.otheremp}>
                <Text style={styles.selectcartxt}>
                  Select a car
                    </Text>
              </View>
                <Carshow />
              </View>

            </View>
            <TouchableOpacity onPress={() => { this.handleSubmit() }} >
              <View style={styles.showcarbtn} >
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <View style={styles.btnimg}>
                    <Image
                      source={require('../../../images/5.png')}
                    />
                  </View>
                  <View style={{ flex: 1, }}>
                    <Text style={styles.selectPlan}>
                      Book Trip
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </Card>
        </ScrollView>
        <Modal isVisible={this.state.otheremp}
          onBackdropPress={() => this.setState({ otheremp: false })}
          coverScreen={true}
          hideModalContentWhileAnimating={true}
          style={{ paddingHorizontal: '5%', zIndex: 999 }}
          animationOutTiming={500}>
          <View style={{ backgroundColor: "#fff", alignItems: 'center', borderRadius: 20, paddingVertical: 30, paddingHorizontal: 10 }}>
            <View style={{ width: '100%', marginTop: 15, paddingHorizontal: '10%' }}>
              <View>
                <View style={[styles.formInputView, styles.marginBottom20]}>
                  <View style={styles.inputTextWrapper}>
                    <TextField
                      label="Employee Id"
                      onChangeText={(employeeId) => { this.setState({ employeeId }) }}
                      value={this.state.employeeId}
                      onFocus={() => { this.employeedata() }}
                      onBlur={() => { this.employeedata() }}
                      lineWidth={1}
                      tintColor={colors.button}
                      inputContainerPadding={0}
                      labelHeight={15}
                      baseColor={'#666'}
                      textColor={'#333'}
                      containerStyle={styles.textContainer}
                      inputContainerStyle={styles.textInputContainer}
                      titleTextStyle={styles.textTitle}
                      style={styles.textStyle}
                      labelTextStyle={styles.textLabel}
                      keyboardType="default"
                    />
                  </View>
                </View>
                <View style={styles.employeename}>
                  <Text style={styles.dayText}>{this.state.fullName}</Text>
                </View>
                <TouchableOpacity onPress={() => this.closeok()} >
                  <View style={styles.okshowcarbtn} >
                    <View style={{ flex: 1, flexDirection: "row" }}>
                      <View style={styles.btnimg}>
                        <Image
                          source={require('../../../images/5.png')}
                        />
                      </View>
                      <View style={{ flex: 1, }}>
                        <Text style={styles.selectPlan}>
                          OK
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <DateTimePickerModal
          isDarkModeEnabled	= {false}
          // onCancel={hideDatePicker}
          isVisible={this.state.isDatePickerVisibleStart}
          mode="date"
          minimumDate={new Date()}
          onConfirm={(date) => this.setState({ "pickupDate": date, "isDatePickerVisibleStart": false })}
        />
        <DateTimePickerModal
          isVisible={this.state.isTimePickerVisibleStart}
          mode="time"
          onConfirm={(pickupTime) => this.setState({ "pickupTime": pickupTime, "isTimePickerVisibleStart": false })}
        />
        <DateTimePickerModal
          isVisible={this.state.isDatePickerVisibleEnd}
          mode="date"
          // onCancel={hideDatePicker}
          minimumDate={this.state.pickupDate}
          onConfirm={(date) => this.setState({ "returnDate": date, "isDatePickerVisibleEnd": false })}
        />
        <DateTimePickerModal
          isVisible={this.state.isTimePickerVisibleEnd}
          mode="time"
          onConfirm={(pickupTime) => this.setState({ "returnTime": pickupTime, "isTimePickerVisibleEnd": false })}
        />

      </React.Fragment>
    );

  }
}


const mapStateToProps = (state) => {
  return {
    selectedVehicle: state.selectedVehicle,
    vehicleCategoryId: state.vehicleCategoryId,

  }
};

const mapDispatchToProps = (dispatch) => {
  return {

  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Tripbooking);
