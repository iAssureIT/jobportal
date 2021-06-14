
import React,{useState,useEffect,useRef} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Dimensions,
  StyleSheet,
  TextInput,ImageBackground
} from 'react-native';
import { Dropdown }                 from 'react-native-material-dropdown-v2';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { TextField }                from 'react-native-material-textfield';
import { Button, Icon}              from "react-native-elements";
import HeaderBar2                   from '../../ScreenComponents/HeaderBar2/HeaderBar2.js';
import styles                       from '../../AppDesigns/currentApp/styles/ScreenStyles/BasicInfostyles.js';
import { colors, sizes }            from '../../AppDesigns/currentApp/styles/styles.js';
import Loading                      from '../../ScreenComponents/Loading/Loading.js';
import {FormPhoneInput}             from '../../ScreenComponents/PhoneInput/FormPhoneInput';
import axios                        from "axios";
import Modal                        from "react-native-modal";
import AsyncStorage                 from '@react-native-async-storage/async-storage';
import {setToast, 
        withCustomerToaster}        from '../../redux/AppState.js';
import {FormInput}                  from '../../ScreenComponents/FormInput/FormInput';
import Dialog                              from 'react-native-dialog';
import ImagePicker                         from 'react-native-image-crop-picker';
import { connect,
        useDispatch,
        useSelector }               from 'react-redux';
import * as Yup                     from 'yup';
import {emailValidator,
        specialCharacterValidator,
        mobileValidator}            from '../../config/validators.js';
// import SideMenu                     from 'react-native-side-menu';
// import {Menu}                       from '../../ScreenComponents/Menu/Menu.js';
import {Formik}                     from 'formik';
import {FormButton}                 from '../../ScreenComponents/FormButton/FormButton';
import PhoneInput                   from "react-native-phone-number-input";
import SwitchSelector               from "react-native-switch-selector";
import DatePicker from 'react-native-datepicker';
import StepIndicator from 'react-native-step-indicator';
import * as Progress from 'react-native-progress';

  const window = Dimensions.get('window');
  const LoginSchema = Yup.object().shape({
    contactperson: Yup.string()
    .required('This field is required')
    .test(
      'special character test',
      'This field cannot contain only special characters or numbers',
      specialCharacterValidator,
    ),
    fromaddress: Yup.string()
    .required('This field is required'),
   
    fromarea: Yup.string()
    .required('This field is required'),
   
    fromstate: Yup.string()
    .required('This field is required'),
   
    fromcountry: Yup.string()
    .required('This field is required')
  });

   const stepIndicatorStyles = {
      stepIndicatorSize                 : 25,
      currentStepIndicatorSize          : 30,
      separatorStrokeWidth              : 1,
      currentStepStrokeWidth            : 3,
      stepStrokeCurrentColor            : colors.theme,
      stepStrokeWidth                   : 2,
      stepStrokeFinishedColor           : colors.theme,
      stepStrokeUnFinishedColor         : colors.theme,
      separatorFinishedColor            : colors.theme,
      separatorUnFinishedColor          : colors.theme,
      stepIndicatorFinishedColor        : colors.theme,
      stepIndicatorUnFinishedColor      : '#1F262D',
      stepIndicatorCurrentColor         : colors.theme,
      stepIndicatorLabelFontSize        : 11,
      currentStepIndicatorLabelFontSize : 13,
      stepIndicatorLabelCurrentColor    : "#fff",
      stepIndicatorLabelFinishedColor   : '#ffffff',
      stepIndicatorLabelUnFinishedColor : '#aaaaaa',
      labelColor                        : '#999999',
      labelSize                         : 10,
      currentStepLabelColor             : colors.theme,

    }
  

export const Address = withCustomerToaster((props)=>{
    const [btnLoading, setLoading] = useState(false);
    const [setOpen]= useState(false);
    const {setToast,navigation,route} = props; //setToast function bhetta
    const dispatch = useDispatch();

    // const [profilePhoto, setProfilePhoto] = useState(store.userDetails.profilePhoto);
    const [openModal, setModal] = useState(false);

    
    const [googleapikey,setGoogleAPIKey] = useState('');
    const store = useSelector(store => ({
      userDetails : store.userDetails
    }));

    const {userDetails}= store;
    // const {delivery}=route.params;  
    // console.log("store",store);

    const options = [
      { label: "01:00", value: "1", testID: "switch-one", accessibilityLabel: "switch-one" },
      { label: "01:30", value: "1.5", testID: "switch-one-thirty", accessibilityLabel: "switch-one-thirty" },
      { label: "02:00", value: "2", testID: "switch-two", accessibilityLabel: "switch-two" }
    ]

   
    useEffect(() => {
      var type = 'GOOGLE';
      axios.get('/api/projectsettings/get/'+type)
      .then((response) => {
        setGoogleAPIKey(response.data.googleapikey)
      })
      .catch((error) => {});
    },[props]);

      return (
        <React.Fragment>
          <Formik
            onSubmit={(data) => {
              console.log("data",data);
              const {fromaddress,contactperson,fromarea,fromPincode,fromcity,fromstate,fromcountry,fromlatlong,mobileNumber,addresstype}=data;
              var formValues = {
                "user_ID"       : userDetails.user_id,
                "name"          : contactperson,
                "addressLine1"  : fromaddress,
                "addressLine2"  : fromarea,
                "pincode"       : fromPincode,
                // "district"      : modaldistrict,
                "city"          : fromcity,
                "state"         : fromstate,
                "country"       : fromcountry,
                "latitude"      : fromlatlong.lat,
                "longitude"     : fromlatlong.lng,
                "mobileNumber"  : mobileNumber,
                "addType"       : addresstype,
              }
              console.log("formValues",formValues);
              axios.patch('/api/ecommusers/patch/address', formValues)
              .then((response) => {
                navigation.navigate('AddressDefaultComp',{"delivery":delivery});
              })
              .catch((error) => {
                console.log('error', error)
              });
            }}
            validationSchema={LoginSchema}
            initialValues={{
              inputFocusColor     : colors.textLight,
              isOpen              : false,
              starCount           : 2.5,
              mobileNumber        : userDetails.mobile,
              countryCode         : userDetails.countryCode,
              pincodenotexist     : '',
              contactperson       : userDetails.fullName,
              addresstype         : 'Home',
              addsaved            : false,
              validpincodeaddress : false,
              pincodeExists       : false,
              fromaddress         : "",
              fromarea            : '',
              fromPincode         : '',
              fromlatlong         : '',
              fromcity            : '',
              fromstate           : '',
              fromcountry         : '' 
            }}>
            {(formProps) => (
              <FormBody
                btnLoading      = {btnLoading}
                navigation      = {navigation}
                setToast        = {setToast}
                googleapikey    = {googleapikey}
                {...formProps}
              />
            )}
          </Formik>
        </React.Fragment>
      );
    });

    const FormBody = (props) => {
      const {
        handleChange,
        handleSubmit,
        errors,
        touched,
        btnLoading,
        setFieldValue,
        currentPosition,
        labels,
        navigation,
        values,
        setToast,
        googleapikey
      } = props;
      const [openModal, setModal] = useState(false);
      const [showPassword, togglePassword] = useState(false);
      const [image, setImage] = useState({profile_photo: '', image: ''});
      const [value, setValue] = useState("");
      const [formattedValue, setFormattedValue] = useState("");
      const [valid, setValid] = useState(false);
      const [showMessage, setShowMessage] = useState(false);
      const phoneInput = useRef(null);
      // var mobileNumber = values.mobileNumber.split(" ");
      // if(mobileNumber && mobileNumber.length >0){
      //   var countryCode = mobileNumber[0].trim('+');
      //   var number      = mobileNumber[1];
      // }
      var ShippingType = [{ value: 'Home', }, { value: 'Office', }, { value: 'Relative', }, { value: 'Friend', }];
      // console.log("values",values);
      const pincodeexistsornot=(pincode,formatted_address,area,city,state,country,latlong)=>{
        axios.get("/api/allowablepincode/checkpincode/" + pincode)
          .then((response) => {
            if (response) {
                setFieldValue('fromaddress',formatted_address);
                setFieldValue('fromarea',area);
                setFieldValue('fromcity',city);
                setFieldValue('fromstate',state);
                setFieldValue('fromcountry',country);
                setFieldValue('fromPincode',pincode);
                setFieldValue('fromlatlong',latlong);
                setFieldValue('formatted_address',formatted_address);
            }
          });
      }

      // const menu = <Menu navigate={navigation.navigate} isOpen={isOpen}/>
  
    return (
      <React.Fragment>
        <HeaderBar2
          goBack={navigation.goBack}
          headerTitle={'Address'}
          navigate={navigation.navigate}
          // toggle={setOpen} 
          // openControlPanel={()=>_drawer.open()}
        />

        <View style={styles.addsuperparent}>
          <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" >
            <View style={{backgroundColor:'#1F262D',paddingVertical:16,}}>
                <StepIndicator
                customStyles={stepIndicatorStyles}
                // currentPosition={currentPage}
                // onPress={onStepPress}
                // renderStepIndicator={renderStepIndicator}
                labels={[
                  'BasicInfo',
                  'Address',
                  'Academics',
                  'Skills & Communication',
                  'Work Experience',
                ]}
              />
            </View>
            <View style={{backgroundColor:'#1F262D',paddingHorizontal:10}}>
              <Progress.Bar 
                progress={0.3} 
                width={340} 
                color={"#f5a721"}
                height={15}
                />
            </View>

            <View style={styles.formWrapper}>
              <View style={{ marginTop: 15,}}>
              <View>
                <FormInput
                  labelName       = "Fist Name"
                  placeholder     = "Fist Name"
                  // onChangeText    = {handleChange('contactperson')}
                  required        = {true}
                  name            = "contactperson"
                  errors          = {errors}
                  touched         = {touched}
                  iconName        = {'user-circle-o'}
                  iconType        = {'font-awesome'}
                  autoCapitalize  = "none"
                  // value           = {values.contactperson}
                />

              </View>
                <FormPhoneInput
                labelName       = "Mobile Number"
                placeholder     = "Mobile Number"
                onChangeText    = {handleChange('username')}
                required        = {true}
                name            = "username"
                errors          = {errors}
                touched         = {touched}
                iconName        = {'phone'}
                iconType        = {'material-community'}
                autoCapitalize  = "none"
                keyboardType    = "numeric"
                // leftIcon        = {<Icon name="phone" size={20} color="#fff" style={commonStyle.IconLeft} />}
                style           = {{fontFamily: 'Montserrat-Regular',fontSize:15,color:'#fff',marginTop:10,marginLeft:5}}
              />
               <FormPhoneInput
                labelName       = "Alternate Mobile Number"
                placeholder     = "Alternate Mobile Number"
                onChangeText    = {handleChange('username')}
                required        = {true}
                name            = "username"
                errors          = {errors}
                touched         = {touched}
                iconName        = {'phone'}
                iconType        = {'material-community'}
                autoCapitalize  = "none"
                keyboardType    = "numeric"
                // leftIcon        = {<Icon name="phone" size={20} color="#fff" style={commonStyle.IconLeft} />}
                style           = {{fontFamily: 'Montserrat-Regular',fontSize:15,color:'#fff',marginTop:10,marginLeft:5}}
              />

              <View style={{paddingHorizontal:10,flexDirection:"row"}}>
                <View style={{flex:0.5}}>
                  <Text style={{fontFamily:'Montserrat-Regular', fontSize: 12}}>
                    <Text style={{color:'#fff'}}>Date of Birth</Text>{' '}
                    <Text style={{color: 'red', fontSize: 12}}>
                    *
                    </Text>
                  </Text>
                  <DatePicker 
                    mode                  = "date"
                    placeholder           = "YYYY-MM-DD"
                    format                = "YYYY-MM-DD"
                    confirmBtnText        = "Confirm"
                    cancelBtnText         = "Cancel"
                    style                 = {{backgroundColor:'#242933',borderWidth :0.5,borderColor : '#f5a721',fontFamily: 'Montserrat-SemiBold',borderRadius:5}}
                    customStyles          = {{ dateInput : { borderWidth : 0,fontFamily: 'Montserrat-SemiBold'}}}
                    // date               /   = {this.state.expectedDate}
                    // onDateChange          = {(expectedDate) => {this.setState({expectedDate: expectedDate})}}
                  />
                </View>
                <View style={{flex:0.5}}>
                  <Text style={{fontFamily:'Montserrat-Regular', fontSize: 12,color:"#fff"}}>Age</Text>
                  <Text style={{fontFamily:'Montserrat-Regular', fontSize: 12,color:"#fff",marginTop:10}}>28 Years,10 months</Text>
                </View>
              </View>
             
             <View style={{paddingHorizontal:10,paddingVertical:20}}>
                <Text style={{fontFamily:'Montserrat-Regular', fontSize: 12}}>
                  <Text style={{color:'#fff'}}>Gender</Text>{' '}
                  <Text style={{color: 'red', fontSize: 12}}>
                  *
                  </Text>
                </Text>
                <SwitchSelector
                  initial={0}
                  // onPress={value => this.setState({ gender: value })}
                  textColor={colors.white} //'#7a44cf'
                  selectedColor={colors.white}
                  buttonColor={colors.theme}
                  borderColor={colors.theme}
                  backgroundColor={colors.inputBackground}
                  // style={{borderWidth:.5}}
                  hasPadding
                  options={[
                    { label: "Male", value: "m", }, //images.feminino = require('./path_to/assets/img/feminino.png')
                    { label: "Female", value: "f", }, //images.masculino = require('./path_to/assets/img/masculino.png')
                    { label: "Transgender", value: "t", }
                  ]}
                  testID="gender-switch-selector"
                  accessibilityLabel="gender-switch-selector"
                />
              </View>

             <View style={{paddingHorizontal:10,paddingVertical:20}}>
                <Text style={{fontFamily:'Montserrat-Regular', fontSize: 12}}>
                  <Text style={{color:'#fff'}}>Do You Have Passport?</Text>{' '}
                  <Text style={{color: 'red', fontSize: 12}}>
                  *
                  </Text>
                </Text>
                <SwitchSelector
                  initial={0}
                  // onPress={value => this.setState({ gender: value })}
                  textColor={colors.white} //'#7a44cf'
                  selectedColor={colors.white}
                  buttonColor={colors.theme}
                  borderColor={colors.theme}
                  backgroundColor={colors.inputBackground}
                  // style={{borderWidth:.5}}
                  hasPadding
                  options={[
                    { label: "YES", value: "y", }, //images.feminino = require('./path_to/assets/img/feminino.png')
                    { label: "NO", value: "n", }, //images.masculino = require('./path_to/assets/img/masculino.png')
                    
                  ]}
                  testID="gender-switch-selector"
                  accessibilityLabel="gender-switch-selector"
                />
              </View>

             <View style={{paddingHorizontal:10,paddingVertical:20}}>
                <Text style={{fontFamily:'Montserrat-Regular', fontSize: 12}}>
                  <Text style={{color:'#fff'}}>Do You Have Visa?</Text>{' '}
                  <Text style={{color: 'red', fontSize: 12}}>
                  *
                  </Text>
                </Text>
                <SwitchSelector
                  initial={0}
                  // onPress={value => this.setState({ gender: value })}
                  textColor={colors.white} //'#7a44cf'
                  selectedColor={colors.white}
                  buttonColor={colors.theme}
                  borderColor={colors.theme}
                  backgroundColor={colors.inputBackground}
                  // style={{borderWidth:.5}}
                  hasPadding
                  options={[
                    { label: "YES", value: "y", }, //images.feminino = require('./path_to/assets/img/feminino.png')
                    { label: "NO", value: "n", }, //images.masculino = require('./path_to/assets/img/masculino.png')
                    
                  ]}
                  testID="gender-switch-selector"
                  accessibilityLabel="gender-switch-selector"
                />
              </View>
              <View style={{flexDirection:"row"}}>
                <View style={[styles.formInputView, styles.marginBottom20],{flex:0.5,paddingHorizontal:15}}>
                  <Text style={{fontFamily:'Montserrat-Regular', fontSize: 12}}>
                    <Text style={{color:'#fff'}}>Marital Status</Text>{' '}
                    <Text style={{color: 'red', fontSize: 12}}>
                    *
                    </Text>
                  </Text>
                  <Dropdown
                    // label               = 'Marital Status'
                    rippleOpacity       = {0.54}
                    shadeOpacity        = {0.12}
                    containerStyle      = {styles.ddContainer}
                    dropdownOffset      = {{ top: 0, left: 0 }}
                    itemTextStyle       = {styles.ddItemText}
                    inputContainerStyle = {styles.ddInputContainer}
                    labelHeight         = {10}
                    tintColor           = {colors.button}
                    labelFontSize       = {sizes.label}
                    fontSize            = {15}
                    baseColor           = {'#666'} 
                    textColor           = {'#333'}
                    labelTextStyle      = {styles.ddLabelText}
                    style               = {styles.ddStyle}
                    animationDuration   = {225}
                    data                = {ShippingType}
                    // value               = {values.addresstype}
                    // onChangeText={(addresstype) => { this.setState({ addresstype }) }}
                    // onChangeText={handleChange('addresstype')}
                  />
                 </View> 
                 <View style={[styles.formInputView, styles.marginBottom20],{flex:0.5,paddingHorizontal:15}}>
                  <Text style={{fontFamily:'Montserrat-Regular', fontSize: 12}}>
                    <Text style={{color:'#fff'}}>Nationality</Text>{' '}
                    <Text style={{color: 'red', fontSize: 12}}>
                    *
                    </Text>
                  </Text>
                  <Dropdown
                    // label               = 'Marital Status'
                    containerStyle      = {styles.ddContainer}
                    dropdownOffset      = {{ top: 0, left: 0 }}
                    itemTextStyle       = {styles.ddItemText}
                    inputContainerStyle = {styles.ddInputContainer}
                    labelHeight         = {10}
                    tintColor           = {colors.button}
                    labelFontSize       = {sizes.label}
                    fontSize            = {15}
                    baseColor           = {'#666'} 
                    textColor           = {'#333'}
                    labelTextStyle      = {styles.ddLabelText}
                    style               = {styles.ddStyle}
                    data                = {ShippingType}
                    // value               = {values.addresstype}
                    // onChangeText={(addresstype) => { this.setState({ addresstype }) }}
                    // onChangeText={handleChange('addresstype')}
                  />
                 </View> 

                </View>
                <View style={[styles.formInputView, styles.marginBottom20],{flex:0.5,paddingVertical:15,paddingHorizontal:15}}>
                  <Text style={{fontFamily:'Montserrat-Regular', fontSize: 12}}>
                      <Text style={{color:'#fff'}}>Languages Spoken</Text>{' '}
                      <Text style={{color: 'red', fontSize: 12}}>
                      *
                      </Text>
                    </Text>
                  <Dropdown
                    // label               = 'Marital Status'
                    placeholder         = "-Select your language-"
                    // containerStyle      = {styles.ddContainer}
                    dropdownOffset      = {{ top: 0, left: 0 }}
                    // itemTextStyle       = {styles.ddItemText}
                    // inputContainerStyle = {styles.ddInputContainer}
                    labelHeight         = {10}
                    tintColor           = {colors.button}
                    labelFontSize       = {sizes.label}
                    fontSize            = {15}
                    baseColor           = {'#666'} 
                    textColor           = {'#333'}
                    // labelTextStyle      = {styles.ddLabelText}
                    style               = {styles.ddStyle}
                    data                = {ShippingType}
                    value               = {values.addresstype}
                    // onChangeText={(addresstype) => { this.setState({ addresstype }) }}
                    onChangeText={handleChange('addresstype')}
                  />
                  <View style={{flexDirection:'row',marginTop:20}}>
                    <View style={{flex:.5}}>
                      <FormInput
                        labelName       = "Aadhar Card No."
                        placeholder     = "Aadhar Card No."
                        // onChangeText    = {handleChange('contactperson')}
                        required        = {true}
                        name            = "contactperson"
                        errors          = {errors}
                        touched         = {touched}
                        iconName        = {'user-circle-o'}
                        iconType        = {'font-awesome'}
                        autoCapitalize  = "none"
                        // value           = {values.contactperson}
                      />
                    </View>
                    <View style={{flex:.5}}>
                      <FormInput
                        labelName       = "Pan Card No."
                        placeholder     = "Pan Card No."
                        // onChangeText    = {handleChange('contactperson')}
                        required        = {true}
                        name            = "contactperson"
                        errors          = {errors}
                        touched         = {touched}
                        iconName        = {'user-circle-o'}
                        iconType        = {'font-awesome'}
                        autoCapitalize  = "none"
                        // value           = {values.contactperson}
                      />
                    </View>
                  </View>
                   <View style={styles.MainContainer}>
                     <TextInput
                        style={styles.TextInputStyleClass}
                        underlineColorAndroid="transparent"
                        placeholder={"Type Something in Text Area."}
                        placeholderTextColor={"#9E9E9E"}
                        numberOfLines={10}
                        multiline={true}
                      />

                    </View>
                 </View> 
                 {/*<CKEditor
                    content={values.description}
                    onChange={value => {
                      setFieldValue('description', value);
                    }}
                  />*/}
                  <FormButton
                    title       = {'NEXT'}
                    onPress     = {handleSubmit}
                    background  = {true}
                    loading     = {btnLoading}
                  />
              </View>
            </View>
          </ScrollView>
          {/* <Footer /> */}
        </View>
      </React.Fragment>
    );
  }

  const styles1 = StyleSheet.create({
    containerStyle:{
       borderWidth:1,
       borderRadius:5,
       width:"100%",
       borderColor:"#ccc",
       backgroundColor:"#fff"
     },
     textInputStyle:{
         height:50,
         paddingTop:15,
         backgroundColor:"#fff"
     },
     textContainerStyle:{
       height:50,
       padding:0,
       backgroundColor:"#fff"
     },
   });

