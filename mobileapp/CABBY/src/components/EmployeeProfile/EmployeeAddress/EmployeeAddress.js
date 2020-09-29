import React, {Component} from 'react';
import {
  ScrollView,
  Text,
  View,
  BackHandler,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Image, TextInput,
  Platform,
  Alert,
} from 'react-native';
import { Button, Icon }             from "react-native-elements";
import CheckBox                     from 'react-native-check-box'
import { KeyboardAwareScrollView }  from 'react-native-keyboard-aware-scroll-view';
import axios                        from "axios";
import styles                       from './styles.js';
import { colors, sizes }            from '../../../config/styles.js';
import HeaderBar                    from '../../../layouts/Header/Header.js';
import { Fumi }                     from 'react-native-textinput-effects';
import FontAwesomeIcon              from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons       from 'react-native-vector-icons/MaterialCommunityIcons';
import UploadPic                    from '../UploadPic/UploadPic.js';
import Dialog                       from "react-native-dialog";
import AsyncStorage                 from '@react-native-community/async-storage';
import ValidationComponent          from "react-native-form-validator";
import Loading                      from '../../../layouts/Loading/Loading.js';
import Geocoder                                                 from 'react-native-geocoding';
import { connect }                  from 'react-redux';
import { Dropdown }                 from 'react-native-material-dropdown';
import Modal                        from "react-native-modal";

const window = Dimensions.get('window');
class EmployeeAddress  extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputFocusColor: colors.textLight,
      addressLine1    : "",
      addressLine2    : "",
      landmark        : "",
      area            : "",
      city            : "",
      country         : "",
      state           : "",
      district        : "",
      pincode         : "", 
      googleApiKey    : "",
      stateArray      : [],
      openModal       : false
    };
  }



  componentDidMount(){
    this.getUserData();
    this.getS3config();
  }


  UNSAFE_componentWillReceiveProps(nextProps){
    this.getUserData();
    this.getS3config();
  }


  getUserData(){
    AsyncStorage.getItem('user_id')
    .then((userId)=>{
        this.setState({
          addressLine1       : this.props.addressLine1,
          addressLine2       : this.props.addressLine2,
          countryCode        : this.props.countryCode,
          country            : this.props.country,
          stateCode          : this.props.stateCode,
          state              : this.props.state,
          area               : this.props.area,
          email              : this.props.email,
          district           : this.props.district,
          pincode            : this.props.pincode,
          city               : this.props.city,
          user_id            : userId 
        })
    })
  }

  getS3config(){
    axios
      .get('/api/projectsettings/get/GOOGLE')
      .then((response)=>{
        this.setState({
          googleApiKey : response.data.key
        })
      })
     .catch((error)=>{
              console.log(error);
        });
  }

  validInput = () => {
    const {
      addressLine1,
      city,
      country,
      state,
      district,
      pincode
    } = this.state;
    let valid = true;
    this.validate({
      addressLine1: {
        required: true,
      },
      district:{
        required:true
      },
      city: {
        required: true,
        letters: true,
      },
      state: {
        required: true,
      },
      country:{
        required:true
      },
      pincode: {
        required: true,
      },
    });

    if (this.isFieldInError("addressLine1")) {
      let addressLine1Error = this.getErrorsInField("addressLine1");
      this.setState({ addressLine1Error });
      valid = false;
    } else {
      this.setState({ addressLine1Error: "" });
      valid = true;
    }
    if (this.isFieldInError("city")) {
      this.setState({ cityError: this.getErrorsInField("city") });
      valid = false;
    } else {
      this.setState({ cityError: "" });
      valid = true;
    }
    if (this.isFieldInError("district")) {
      this.setState({ districtError: this.getErrorsInField("district") });
      valid = false;
    } else {
      this.setState({ districtError: "" });
      valid = true;
    }
    
    if (this.isFieldInError("state")) {
      this.setState({ stateError: this.getErrorsInField("state") });
      valid = false;
    } else {
      this.setState({ stateError: "" });
      valid = true;
    }
    if (this.isFieldInError("country")) {
      this.setState({ countryError: this.getErrorsInField("country") });
      valid = false;
    } else {
      this.setState({ countryError: "" });
      valid = true;
    }
    if (this.isFieldInError("pincode")) {
      this.setState({ pincodeError: this.getErrorsInField("pincode") });
      valid = false;
    } else {
      this.setState({ pincodeError: "" });
      valid = true;
    }
    return ((!this.isFieldInError("addressLine")) && (!this.isFieldInError("area")) && (!this.isFieldInError("city")) && (!this.isFieldInError("state")) && (!this.isFieldInError("pincode")));
  };

  validInputField = (stateName, stateErr) => {
    const {
      addressLine1,
      addressLine2,
      landmark,
      area,
      city,
      country,
      state,
      district,
      pincode
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

    displayValidationError = (errorField) => {
    let error = null;
    if (this.state[errorField]) {
      error = <View style={styles.errorWrapper}>
        <Text style={styles.errorText}>{this.state[errorField][0]}</Text>
      </View>;
    }
    return error;
  }


  handleMobileChange(value) {
    if (value.startsWith && value.startsWith('+')) {
      value = value.substr(3);
    }
    let x = value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    // console.log("x value = ", x);
    let y = x.input ? (!x[2] && !x[3]) ? '+91 ' + x[1] : (!x[3] ? '+91 ' + x[1] + '-' + x[2] : '+91 ' + x[1] + '-' + x[2] + '-' + x[3]) : '';
    this.setState({
      mobileNumber: y,
    });
  }

  handleSubmitAddress(){
   if(this.validInput()){
           // Geocoder.init(this.state.googleApiKey);
    //    var address = this.state.addressLine+", "+this.state.area+", "+ this.state.city+", "+this.state.state+", "+this.state.pincode;
    //    // console.log("address",address)
    //    Geocoder.from(address)
    //     .then(json => {
    //       var location = json.results[0].geometry.location;
    //       console.log("location",location);
          var employeeAddressValues = {
            addressLine1 : this.state.addressLine1,
            addressLine2 : this.state.addressLine2,
            countryCode  : this.state.countryCode.includes("|") ? this.state.countryCode.split("|")[0] : this.state.countryCode,
            country      : this.state.country.includes("|") ? this.state.country.split("|")[1] : this.state.country,
            stateCode    : this.state.stateCode.includes("|") ? this.state.stateCode.split("|")[0] : this.state.stateCode,
            state        : this.state.state.includes("|") ? this.state.state.split("|")[1] : this.state.state,
            area         : this.state.area,
            city         : this.state.city,
            district     : this.state.district,
            pincode      : this.state.pincode,
            userId       : this.state.user_id,
            // latitude    : location.lat,
            // longitude   : location.lng,
          }

          console.log("employeeAddressValues",employeeAddressValues);
          this.props.EmployeeAddress(employeeAddressValues);
          axios.post('/api/personmaster/post/addressInfo', employeeAddressValues)
          .then((response) => {
            if(response.data.updated === true){
              this.setState({openModal:true})
            }
          })
          .catch((error) => {
            console.log("error",error);
          })
        // })
        // .catch((error)=>{
        //   console.log("error",error);
        // }) 
        }
  }

    handlePincode() {
    if (this.state.pincode != '') {
      console.log("this.state.pincode",this.state.pincode);
      axios.get("https://api.postalpincode.in/pincode/" + this.state.pincode)
        .then((response) => {
          console.log("response",response.data)
            if (response.data[0].Status == 'Success') {
              this.setState({ pincodeExists: true })
            } else {
              this.setState({ pincodeExists: false })
            }
        })
        .catch((error) => {
        })
    } else {
      this.setState({ pincodeExists: true })
    }
  }
 
  getStates() {
    var CountryCode = this.state.country.split('|')[0];
    axios.get("http://locations2.iassureit.com/api/states/get/list/" + CountryCode)
      .then((response) => {
        var stateArray = [];
        response.data.map((stateData, index) => {
          var stateObj = {
            label : stateData.stateName,
            value : stateData.stateCode+"|"+stateData.stateName,
          }
          stateArray.push(stateObj);
        })
        this.setState({
          stateArray:stateArray,
          countryCode:CountryCode,
        })
      })
      .catch((error) => {
        console.log("error",error)
      })
  }


  getDistrict() {
    var StateCode = this.state.state.split('|')[0];
    console.log("StateCode",StateCode);
    axios.get("http://locations2.iassureit.com/api/districts/get/list/" + this.state.countryCode + "/" + StateCode)
      .then((response) => {
        console.log("response",response.data);
        var districtArray = [];
        response.data.map((districtData, index) => {
          var districtObj = {
            label : districtData.districtName,
            value : districtData.districtName,
          }
          districtArray.push(districtObj);
        })
        this.setState({
          districtArray:districtArray,
          stateCode:StateCode,
        })
      })
      .catch((error) => {
        console.log("error",error)
      })
  }

  render() {
    const { firstName, lastName, mobileNumber, email } = this.state;
    console.log("this.state.pincodeExists",this.state.pincodeExists);
    return (
      <React.Fragment>
      <ScrollView contentContainerStyle={styles.container} >
          <ImageBackground source={{}}  style={{width: window.width}} resizeMode="cover" >
            <KeyboardAwareScrollView enabled>
              <View style={styles.pageView}>
                <View style={styles.modalView}>
              <View style={[styles.formInputView, styles.marginBottom20]}>
                <Fumi
                  label         = {'Address Line 1'}
                  onChangeText  = {(addressLine1) => { this.setState({ addressLine1 }, () => { this.validInputField('addressLine1', 'addressLine1Error'); }) }}
                  value         = {this.state.addressLine1}
                  keyboardType  = "default"
                  iconClass     = {FontAwesomeIcon}
                  iconName      = {'address-book'}
                  iconColor     = {colors.inputText}
                  iconSize      = {20}
                  iconWidth     = {40}
                  inputPadding  = {16}
                  style         = {{borderWidth:1,borderColor:"#f1f1f1",flex:0}}
                />
                {this.displayValidationError('addressLine1Error')}
              </View>
                <View style={[styles.formInputView, styles.marginBottom20]}>
                <Fumi
                  label         = {'Address Line 2'}
                  onChangeText  = {(addressLine2) => { this.setState({ addressLine2 }, () => { this.validInputField('addressLine2', 'addressLine2Error'); }) }}
                  value         = {this.state.addressLine2}
                  keyboardType  = "default"
                  iconClass     = {FontAwesomeIcon}
                  iconName      = {'address-book'}
                  iconColor     = {colors.inputText}
                  iconSize      = {20}
                  iconWidth     = {40}
                  inputPadding  = {16}
                  style         = {{borderWidth:1,borderColor:"#f1f1f1",flex:0}}
                />
                {this.displayValidationError('addressLine2Error')}
              </View>
              <View style={[styles.formInputView, styles.marginBottom20]}>
                <Fumi
                  label         = {'Area'}
                  onChangeText  = {(area) => { this.setState({ area }, () => { this.validInputField('area', 'areaError'); }) }}
                  value         = {this.state.area}
                  keyboardType  = "default"
                  iconClass     = {FontAwesomeIcon}
                  iconName      = {'address-book'}
                  iconColor     = {colors.inputText}
                  iconSize      = {20}
                  iconWidth     = {40}
                  inputPadding  = {16}
                  style         = {{borderWidth:1,borderColor:"#f1f1f1"}}
                />
                {this.displayValidationError('areaError')}
              </View>

              <View style={[styles.formInputView, styles.marginBottom20]}>
                <Fumi
                  label         = {'City'}
                  onChangeText  = {(city) => { this.setState({ city }, () => { this.validInputField('city', 'cityError'); })}}
                  value         = {this.state.city}
                  keyboardType  = "default"
                  iconClass     = {FontAwesomeIcon}
                  iconName      = {'address-book'}
                  iconColor     = {colors.inputText}
                  iconSize      = {20}
                  iconWidth     = {40}
                  inputPadding  = {16}
                  style         = {{borderWidth:1,borderColor:"#f1f1f1"}}
                />
                {this.displayValidationError('cityError')}
              </View>

              <View style={[styles.marginBottom20,{paddingHorizontal:15}]}>
                 <View style={styles.formInputViewDrop,{flexDirection:'row'}}>
                  <View style={{flex:0.15,justifyContent:"center",borderWidth:1,borderColor:"#f1f1f1",}}>
                     {this.state.country === "" ?
                      <Icon name="address-book" type="font-awesome" size={20}  color="#aaa" style={{}}/>
                      :
                      <Icon name="address-book" type="font-awesome" size={20}  color="#333" style={{}}/>
                    }
                  </View>
                  <Dropdown
                    label='Country'
                    data={[{
                      label:"India",
                      value: 'IN|India',
                    }]}
                    onChangeText    ={(country) => { this.setState({ country }, () => {this.getStates(); this.validInputField('country', 'countryError'); }) }}
                    value           ={this.state.country}
                    dropdownOffset      = {{top:0, left: 0}}
                    itemTextStyle       = {styles.ddItemText}
                    tintColor           = {colors.button}
                    labelFontSize       = {sizes.label}
                    labelTextStyle      = {styles.ddLabelText}
                    labelHeight         = {20}
                    fontSize            = {16}
                    baseColor           = {'#666'}
                    textColor           = {'#333'}
                    containerStyle  = {{borderWidth:1,borderLeftWidth:0,borderColor:"#f1f1f1",flex:0.875,paddingHorizontal:5}}
                    inputContainerStyle={{ borderBottomColor: 'transparent' }}
                  />
                </View>
                {this.displayValidationError('countryError')}
               </View>

              <View style={[styles.marginBottom20,{paddingHorizontal:15}]}>
                 <View style={styles.formInputViewDrop,{flexDirection:'row'}}>
                  <View style={{flex:0.15,justifyContent:"center",borderWidth:1,borderColor:"#f1f1f1",}}>
                     {this.state.state === "" ?
                      <Icon name="address-book" type="font-awesome" size={20}  color="#aaa" style={{}}/>
                      :
                      <Icon name="address-book" type="font-awesome" size={20}  color="#333" style={{}}/>
                    }
                  </View>
                  <Dropdown
                    label='State'
                    data={this.state.stateArray}
                    onChangeText    ={(state) => { this.setState({ state }, () => { this.getDistrict(); this.validInputField('state', 'stateError'); }) }}
                    value           ={this.state.state}
                    dropdownOffset      = {{top:0, left: 0}}
                    itemTextStyle       = {styles.ddItemText}
                    tintColor           = {colors.button}
                    labelFontSize       = {sizes.label}
                    labelTextStyle      = {styles.ddLabelText}
                    labelHeight         = {20}
                    fontSize            = {16}
                    baseColor           = {'#666'}
                    textColor           = {'#333'}
                    containerStyle  = {{borderWidth:1,borderLeftWidth:0,borderColor:"#f1f1f1",flex:0.875,paddingHorizontal:5}}
                    inputContainerStyle={{ borderBottomColor: 'transparent' }}
                  />
                </View>
                {this.displayValidationError('stateError')}
               </View> 
                
              <View style={[styles.marginBottom20,{paddingHorizontal:15}]}>
                 <View style={[styles.formInputViewDrop,{flexDirection:"row"}]}>
                  <View style={{flex:0.15,justifyContent:"center",borderWidth:1,borderColor:"#f1f1f1",}}>
                     {this.state.district === "" ?
                      <Icon name="address-book" type="font-awesome" size={20}  color="#aaa" style={{}}/>
                      :
                      <Icon name="address-book" type="font-awesome" size={20}  color="#333" style={{}}/>
                    }
                  </View>
                  <Dropdown
                    label='District'
                    data={this.state.districtArray}
                    label         = {'District'}
                    onChangeText  = {(district) => { this.setState({ district }, () => { this.validInputField('district', 'districtError'); })}}
                    value               = {this.state.district}
                    dropdownOffset      = {{top:0, left: 0}}
                    itemTextStyle       = {styles.ddItemText}
                    tintColor           = {colors.button}
                    labelFontSize       = {sizes.label}
                    labelTextStyle      = {styles.ddLabelText}
                    labelHeight         = {20}
                    fontSize            = {16}
                    baseColor           = {'#666'}
                    textColor           = {'#333'}
                    containerStyle  = {{borderWidth:1,borderLeftWidth:0,borderColor:"#f1f1f1",flex:0.875,paddingHorizontal:5}}
                    inputContainerStyle={{ borderBottomColor: 'transparent' }}
                  />
                </View>
                {this.displayValidationError('districtError')}
               </View> 

              
              <View style={[styles.formInputView, styles.marginBottom20]}>
                <Fumi
                  label           ={'Pincode'}
                  onChangeText    ={(pincode) => { this.setState({ pincode }, () => {this.handlePincode(), this.validInputField('pincode', 'pincodeError'); }) }}
                  value           ={this.state.pincode.toString()}
                  keyboardType    ="numeric"
                  autoCapitalize  ='none'
                  iconClass       ={FontAwesomeIcon}
                  iconName        ={'address-book'}
                  iconColor       ={colors.inputText}
                  iconSize        ={20}
                  iconWidth       ={40}
                  inputPadding    ={16}
                  style           ={{borderWidth:1,borderColor:"#f1f1f1"}}
                  maxLength = {6}
                />
                {
                  this.state.pincode.length > 3 ?
                   this.state.pincodeExists ?
                    null
                    : 
                    <Text style={{color: "red", fontWeight: "100" }}>This pincode does not exists!</Text> 
                    : null
                }
                {this.displayValidationError('pincodeError')}
              </View>
              {
                this.state.btnLoading
                  ?
                  <Button
                    titleStyle={styles.buttonText}
                    title="Processing"
                    loading
                    buttonStyle={styles.button}
                    containerStyle={styles.buttonContainer}
                  />
                  :
                  <Button
                    // onPress={this.handleSubmit.bind(this)}
                    onPress={this.handleSubmitAddress.bind(this)}
                    titleStyle={styles.buttonText}
                    title="Save & Next"
                    buttonStyle={styles.button}
                    containerStyle={styles.buttonContainer}
                  />
              }
              </View>
              </View>
            </KeyboardAwareScrollView>   
          </ImageBackground>
        </ScrollView>
        <Modal isVisible={this.state.openModal}
          onBackdropPress={() => this.setState({ openModal: false })}
          coverScreen={true}
          hideModalContentWhileAnimating={true}
          style={{ paddingHorizontal: '5%', zIndex: 999 }}
          animationOutTiming={500}>
          <View style={{ backgroundColor: "#fff",borderWidth:1,borderColor:"#eee", alignItems: 'center', borderRadius: 20, paddingVertical: 30, paddingHorizontal: 10 }}>
            <View style={{ justifyContent: 'center', backgroundColor: "#34be34", width: 50, height: 50, borderRadius: 25, overflow: 'hidden' }}>
              <Icon size={28} name='check' type='fontAwesome5' color='#fff' style={{}} />
            </View>
            <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 15, textAlign: 'center',paddingVertical:20 }}>
              Your information updated successfully!
            </Text>
            <View style={{ borderBottomRightRadius: 500, marginTop: 15, flexDirection: 'row' }}>
              <Button
                onPress={() => this.setState({ openModal: false })}
                titleStyle={styles.buttonText}
                title="OK"
                buttonStyle={{ width: '100%', height: 45, alignItems: 'center', justifyContent: 'center', borderRadius: 50 }}
                containerStyle={styles.buttonContainer}
              />
            </View>
          </View>
        </Modal>
      </React.Fragment>
    );

  }
}

EmployeeAddress.defaultProps = {
  messages: {
    en: {
      numbers: 'This field must be a number.',
      email: 'Enter a valid email address',
      required: 'This field is required.',
      letters: 'It should only contain letters.',
      mobileNo: 'Enter a valid mobile number.',
      lettersOrEmpty: 'It should only contain letters.',
      minlength: 'Length should be greater than 5',
    }
  },

  rules: {
    numbers: /^(([0-9]*)|(([0-9]*)\.([0-9]*)))$/,
    email: /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$|^$/,
    required: /\S+/,
    letters: /^[a-zA-Z ]+$/,
    lettersOrEmpty: /^[a-zA-Z ]+$|^$/,
    // mobileNo: /^\d{5}([- ]*)\d{6}$|^(\+91?)?[0]?(91)?[789]\d{9}$|^$/,
    mobileNo: /^(\+91\s)?[0-9]{3}\-[0-9]{3}\-[0-9]{4}$/,
    minlength(length, value) {
      if (length === void (0)) {
        throw 'ERROR: It is not a valid length, checkout your minlength settings.';
      } else if (value.length > length) {
        return true;
      }
      return false;
    },
  },
}
const mapStateToProps = (state)=>{
  return {
    user_id          : state.user_id,
    addressLine1     : state.addressLine1,
    addressLine2     : state.addressLine2,
    countryCode      : state.countryCode,
    country          : state.country,
    stateCode        : state.stateCode,
    state            : state.state,
    area             : state.area,
    city             : state.city,
    district         : state.district,
    pincode          : state.pincode,
  }
};
const mapDispatchToProps = (dispatch)=>{
  return {
      EmployeeAddress  : (employeeAddressValues)=> dispatch({type: "EMPLOYEE_ADDRESS",
                            employeeAddressValues       : employeeAddressValues,
                  }),
  }
};
export default connect(mapStateToProps,mapDispatchToProps)(EmployeeAddress);
