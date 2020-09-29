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
import DateTimePickerModal          from "react-native-modal-datetime-picker";
import moment                       from 'moment';
import RadioForm, 
      {RadioButton, 
      RadioButtonInput, 
      RadioButtonLabel}             from 'react-native-simple-radio-button';
import { connect }                  from 'react-redux';
import Modal                        from "react-native-modal";

const window = Dimensions.get('window');

class BasicInfo extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputFocusColor         : colors.textLight,
      firstName               : "",
      lastName                : "",
      middleName              : "",
      contactNo               : "",
      whatsappNo              : "",
      altContactNo            : "",
      email                   : "",         
      radio_props             : [
                                  {label: 'Male', value: 0 },
                                  {label: 'Female', value: 1 },
                                  {label: 'Transgender', value: 2 }
                                ],               
      genderIndex             : 0,
      DOB             : new Date(),
      user_id                 : '',
      openModal               : false,
    }
  }

  componentDidMount(){
    this.getUserData();
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    this.getUserData();
  }

  getUserData(){
    AsyncStorage.getItem('user_id')
    .then((userId)=>{
      console.log("this.props.firstName===>",this.props.firstName);
      console.log("this.props.lastName===>",this.props.lastName);
      if(this.props.firstName === undefined && this.props.lastName == undefined){
        axios.get('/api/users/get/'+userId)
        .then((user)=>{
          this.setState({
            firstName      : user.data.firstname,
            lastName       : user.data.lastname,
            contactNo      : user.data.mobile,
            email          : user.data.email,
            user_id        : userId,  
          })
        })
        .catch((error)=>{
        })
      }else{
         if(this.props.gender=== "Male"){
          var genderIndex = 0;
        }else if(this.props.gender === "Female"){
          var genderIndex = 1;
        }else{
          var genderIndex = 2;
        }
        this.setState({
          firstName               : this.props.firstName,
          middleName              : this.props.middleName,
          lastName                : this.props.lastName,
          DOB                     : this.props.DOB,
          genderIndex             : genderIndex,
          contactNo               : this.props.contactNo,
          whatsappNo              : this.props.whatsappNo,
          altContactNo            : this.props.altContactNo,
          email                   : this.props.email,
          user_id                 : userId 
        })
      }
    })
  }

  validInput = () => {
    const {
      firstName,
      middleName,
      lastName,
      mobileNumber,
      altMobileNumber,
      whatsAppNumber,
      email,
      DOB,
      genderIndex
    } = this.state;
    let valid = true;
    this.validate({
      firstName: {
        required: true,
        letters: true,
      },
      middleName: {
        required: true,
        letters: true,
      },
      lastName: {
        required: true,
        letters: true,
      },
       contactNo: {
        required: true,
        minlength: 9,
        maxlength: 10
      },
      altContactNo: {
        minlength: 9,
        maxlength: 10
      },
      whatsappNo: {
        minlength: 9,
        maxlength: 10
      },
      DOB: {
        required: true,
      },
      gender: {
        required: true,
      },
    });

    if (this.isFieldInError("firstName")) {
      this.setState({ firstNameError : this.getErrorsInField("firstName")});
      valid = false;
    } else {
      this.setState({ firstNameError: "" });
      valid = true;
    }
    if (this.isFieldInError("middleName")) {
      this.setState({ middleNameError : this.getErrorsInField("middleName")});
      valid = false;
    } else {
      this.setState({ middleNameError: "" });
      valid = true;
    }
    if (this.isFieldInError("lastName")) {
      this.setState({ lastNameError: this.getErrorsInField("lastName") });
      valid = false;
    } else {
      this.setState({ lastNameError: "" });
      valid = true;
    }
    if (this.isFieldInError("contactNo")) {
      this.setState({contactNoError: this.getErrorsInField("contactNo") });
      valid = false;
    } else {
      this.setState({ contactNoError: "" });
      valid = true;
    }
     if (this.isFieldInError("altContactNo")) {
      this.setState({ altContactNoError: this.getErrorsInField("altContactNo") });
      valid = false;
    } else {
      this.setState({ altContactNoError: "" });
      valid = true;
    }
     if (this.isFieldInError("whatsappNo")) {
      this.setState({ whatsappNoError: this.getErrorsInField("whatsappNo") });
      valid = false;
    } else {
      this.setState({ whatsappNoError: "" });
      valid = true;
    }
    if (this.isFieldInError("email")) {
      this.setState({ emailError: this.getErrorsInField("email") });
      valid = false;
    } else {
      this.setState({ emailError: "" });
      valid = true;
    }
    if (this.isFieldInError("DOB")) {
      this.setState({ DOBError: this.getErrorsInField("DOB") });
      valid = false;
    } else {
      this.setState({ dateOfBirthError: "" });
      valid = true;
    }
    if (this.isFieldInError("genderIndex")) {
      this.setState({ genderIndexError: this.getErrorsInField("genderIndex") });
      valid = false;
    } else {
      this.setState({ genderIndexError: "" });
      valid = true;
    }
    return ((!this.isFieldInError("firstName")) && (!this.isFieldInError("middleName")) && (!this.isFieldInError("lastName")) && (!this.isFieldInError("mobileNumber")) && (!this.isFieldInError("altMobileNumber")) && (!this.isFieldInError("whatsAppNumber")) && (!this.isFieldInError("email")) && (!this.isFieldInError("dateOfBirth")) && (!this.isFieldInError("genderIndex")));
  };

  validInputField = (stateName, stateErr) => {
    const {
      firstName,
      middleName,
      lastName,
      contactNo,
      altContactNo,
      whatsappNo,
      email,
      DOB,
      genderIndex
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


  handleMobileChange(value,state) {
   if (value.startsWith && value.startsWith('+')) {
      value = value.substr(3);
    }
    let x = value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    let y = x.input ? (!x[2] && !x[3]) ? '+91 ' + x[1] : (!x[3] ? '+91 ' + x[1] + '-' + x[2] : '+91 ' + x[1] + '-' + x[2] + '-' + x[3]) : '';
    this.setState({
      [state]: y,
    });
  }

  handleSubmitProfileEdit(){
    if(this.state.genderIndex === 0){
      var gender='Male';
    }else if(this.state.genderIndex === 1){
      var gender='Female';
    }else{
      var gender='Transgender';
    }
    if(this.validInput()){
      var basicInfoValues = {
        firstName       : this.state.firstName,
        middleName      : this.state.middleName,
        lastName        : this.state.lastName,
        DOB             : moment(this.state.DOB).format('L'),
        gender          : gender,
        contactNo       : this.state.contactNo,
        altContactNo    : this.state.altContactNo,
        whatsappNo      : this.state.whatsappNo,
        email           : this.state.email,
        userId          : this.state.user_id,
      } 
      console.log("basicInfoValues",basicInfoValues)
      axios.post('/api/personmaster/post/basicInfo', basicInfoValues)
      .then((response) => {
        if(response.data.updated === true){
          this.setState({openModal:true})
        }
      })
      .catch((error) => {
        console.log("error",error);
      })
      this.props.BasicInfo(basicInfoValues);
    }
    
  }

  showDatePicker(){
    this.setState({
      "isDatePickerVisible" : true
    })
  };
 
  hideDatePicker(){
    this.setState({
      "isDatePickerVisible" : false
    });
  }
 
  handleConfirm(date){
    this.setState({
      "dateOfBirth":date,
      "isDatePickerVisible" : false
    })
  }

  render() {
    const { firstName, lastName, contactNo, email } = this.state;
    console.log("genderIndex",this.state.genderIndex);
    return (
      <React.Fragment>
        <ScrollView contentContainerStyle={styles.container} >
          <ImageBackground source={{}}  style={{width: window.width}} resizeMode="cover" >
          {firstName, contactNo, email ?
            <KeyboardAwareScrollView enabled>
              <View style={styles.pageView}>
                <View style={styles.modalView}>
                   <View style={styles.profileImgView}>
                    <UploadPic />
                  </View>
                  <View style={[styles.formInputView, styles.marginBottom20]}>
                    <Fumi
                      label         = {'First Name'}
                      onChangeText  = {(firstName) => { this.setState({ firstName }, () => { this.validInputField('firstName', 'firstNameError'); }) }}
                      value         = {this.state.firstName}
                      keyboardType  = "default"
                      iconClass     = {FontAwesomeIcon}
                      iconName      = {'user-circle-o'}
                      iconColor     = {colors.inputText}
                      iconSize      = {20}
                      iconWidth     = {40}
                      inputPadding  = {16}
                      style         = {{borderWidth:1,borderColor:"#f1f1f1",flex:0}}
                    />
                    {this.displayValidationError('firstNameError')}
                  </View>  
                  <View style={[styles.formInputView, styles.marginBottom20]}>
                    <Fumi
                      label         = {'Middle Name'}
                      onChangeText  = {(middleName) => { this.setState({ middleName }, () => { this.validInputField('middleName', 'middleNameError'); }) }}
                      value         = {this.state.middleName}
                      keyboardType  = "default"
                      iconClass     = {FontAwesomeIcon}
                      iconName      = {'user-circle-o'}
                      iconColor     = {colors.inputText}
                      iconSize      = {20}
                      iconWidth     = {40}
                      inputPadding  = {16}
                      style         = {{borderWidth:1,borderColor:"#f1f1f1",flex:0}}
                    />
                    {this.displayValidationError('middleNameError')}
                  </View>

                  <View style={[styles.formInputView, styles.marginBottom20]}>
                    <Fumi
                      label         = {'Last Name'}
                      onChangeText  = {(lastName) => { this.setState({ lastName }, () => { this.validInputField('lastName', 'lastNameError'); }) }}
                      value         = {this.state.lastName}
                      keyboardType  = "default"
                      iconClass     = {FontAwesomeIcon}
                      iconName      = {'user-circle-o'}
                      iconColor     = {colors.inputText}
                      iconSize      = {20}
                      iconWidth     = {40}
                      inputPadding  = {16}
                      style         = {{borderWidth:1,borderColor:"#f1f1f1"}}
                    />
                    {this.displayValidationError('lastNameError')}
                  </View>

                  <View style={[styles.formInputView, styles.marginBottom20]}>
                    <Fumi
                      label         = {'Phone Number'}
                      onChangeText  = {(contactNo) => { this.setState({ contactNo }, () => { this.validInputField('contactNo', 'contactNoError'); }), this.handleMobileChange(contactNo,'contactNo') }}
                      value         = {this.state.contactNo}
                      keyboardType  = "numeric"
                      iconClass     = {FontAwesomeIcon}
                      iconName      = {'phone-square'}
                      iconColor     = {colors.inputText}
                      iconSize      = {20}
                      iconWidth     = {40}
                      inputPadding  = {16}
                      style         = {{borderWidth:1,borderColor:"#f1f1f1"}}
                    />
                    {this.displayValidationError('contactNoError')}
                  </View>

                  <View style={[styles.formInputView, styles.marginBottom20]}>
                    <Fumi
                      label         = {'Alternative Phone Number'}
                      onChangeText  = {(altContactNo) => { this.setState({ altContactNo }, () => { this.validInputField('altContactNo', 'altContactNoError'); }), this.handleMobileChange(altContactNo,'altContactNo') }}
                      value         = {this.state.altContactNo}
                      keyboardType  = "numeric"
                      iconClass     = {FontAwesomeIcon}
                      iconName      = {'phone-square'}
                      iconColor     = {colors.inputText}
                      iconSize      = {20}
                      iconWidth     = {40}
                      inputPadding  = {16}
                      style         = {{borderWidth:1,borderColor:"#f1f1f1"}}
                    />
                    {this.displayValidationError('altContactNoError')}
                  </View>

                  <View style={[styles.formInputView, styles.marginBottom20]}>
                    <Fumi
                      label         = {'WhatsApp Number'}
                      onChangeText  = {(whatsappNo) => { this.setState({ whatsappNo }, () => { this.validInputField('whatsappNo', 'whatsappNoError'); }), this.handleMobileChange(whatsappNo,'whatsappNo') }}
                      value         = {this.state.whatsappNo}
                      keyboardType  = "numeric"
                      iconClass     = {FontAwesomeIcon}
                      iconName      = {'whatsapp'}
                      iconColor     = {colors.inputText}
                      iconSize      = {20}
                      iconWidth     = {40}
                      inputPadding  = {16}
                      style         = {{borderWidth:1,borderColor:"#f1f1f1"}}
                    />
                    {this.displayValidationError('whatsappNoError')}
                  </View>

                  <View style={[styles.formInputView, styles.marginBottom20]}>
                    <Fumi
                      label           ={'Email'}
                      onChangeText    ={(email) => { this.setState({ email }, () => { this.validInputField('email', 'emailError'); }) }}
                      value           ={this.state.email}
                      keyboardType    ="email-address"
                      autoCapitalize  ='none'
                      iconClass       ={MaterialCommunityIcons}
                      iconName        ={'email-variant'}
                      iconColor       ={colors.inputText}
                      iconSize        ={20}
                      iconWidth       ={40}
                      inputPadding    ={16}
                      style           ={{borderWidth:1,borderColor:"#f1f1f1"}}
x                    />
                    {this.displayValidationError('emailError')}
                  </View>
                  <TouchableOpacity style={[styles.formInputView, styles.marginBottom20]} onPress={()=>this.setState({isDatePickerVisible:true})}>
                    <Fumi
                      label           ={'Date of Birth'}
                      onChangeText    ={(DOB) => {this.setState({DOB}, () => { this.validInputField('DOB', 'DOBError'); }) }}
                      value           ={this.state.DOB!==""? moment(this.state.DOB).format('L'):""}
                      keyboardType    ="numeric"
                      autoCapitalize  ='none'
                      iconClass       ={MaterialCommunityIcons}
                      iconName        ={'calendar'}
                      iconColor       ={colors.inputText}
                      iconSize        ={20}
                      iconWidth       ={40}
                      inputPadding    ={16}
                      style           ={{borderWidth:1,borderColor:"#f1f1f1"}}
                      editable        ={false}
                    />
                    {this.displayValidationError('DOBError')}
                  </TouchableOpacity>

                  <View style={[styles.formInputView, styles.marginBottom20]}>
                    <Text style={{fontSize:18,marginBottom:20}}>Gender</Text>
                    <RadioForm
                      formHorizontal={true}
                      labelStyle={{paddingHorizontal: 20}}
                      radio_props={this.state.radio_props}
                      initial={this.state.genderIndex}
                      onPress={(genderIndex) => this.setState({genderIndex})}
                      buttonSize={10}
                    />
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
                        onPress={this.handleSubmitProfileEdit.bind(this)}
                        titleStyle={styles.buttonText}
                        title="Save & Next"
                        buttonStyle={styles.button}
                        containerStyle={styles.buttonContainer}
                      />
                  }
                </View>
              </View>
            </KeyboardAwareScrollView>  

              :
              <Loading />
          }   
          </ImageBackground>
         <DateTimePickerModal
            isVisible={this.state.isDatePickerVisible}
            mode="date"
            onConfirm={(date)=>this.setState({"dateOfBirth":date,"isDatePickerVisible":false})}
            onCancel={this.hideDatePicker}
          />
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

BasicInfo.defaultProps = {
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
    firstName        : state.firstName,
    middleName       : state.middleName,
    lastName         : state.lastName,
    DOB              : state.DOB,
    gender           : state.gender,
    contactNo        : state.contactNo,
    altContactNo     : state.altContactNo,
    whatsappNo       : state.whatsappNo,
    email            : state.email,
  }
};
const mapDispatchToProps = (dispatch)=>{
  return {
      BasicInfo  : (basicInfoValues)=> dispatch({type: "BASIC_INFO",
                            basicInfoValues       : basicInfoValues,
                  }),
      
  }
};
export default connect(mapStateToProps,mapDispatchToProps)(BasicInfo);
