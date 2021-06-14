import React,{useState} from 'react';
import {
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Icon }             from "react-native-elements";
import axios                from "axios";
import commonStyles         from '../../../AppDesigns/currentApp/styles/CommonStyles.js';
import styles               from '../../../AppDesigns/currentApp/styles/ScreenStyles/SystemSecurityStyles.js';
import { colors }           from '../../../AppDesigns/currentApp/styles/styles.js';
import {FormInput}          from '../../../ScreenComponents/FormInput/FormInput';
import {FormButton}         from '../../../ScreenComponents/FormButton/FormButton';
import {FormPhoneInput}         from '../../../ScreenComponents/PhoneInput/FormPhoneInput';
import * as Yup             from 'yup';
import {useDispatch}        from 'react-redux';
import {emailValidator}     from '../../../config/validators.js';
import {Formik}             from 'formik';
import {withCustomerToaster} from '../../../redux/AppState.js';
import {setUserDetails}     from '../../../redux/user/actions';
import AsyncStorage         from '@react-native-async-storage/async-storage';

  const window = Dimensions.get('window');
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const LoginSchema = Yup.object().shape({
    mobileNo: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
              .required('MobileNo is required')
              .typeError("That doesn't look like a phone number")
              .max(10),    
              // .positive("A phone number can't start with a minus")
              // .integer("A phone number can't include a decimal point")
            
     password: Yup.string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  });

  export const RootLogIn = withCustomerToaster((props)=>{
    console.log("RootLogIn props",props)
    const [btnLoading, setLoading] = useState(false);
    const {setToast,navigation} = props; //setToast function bhetta
    const dispatch = useDispatch();
    // 
      return (
        <React.Fragment>
          <Formik
            onSubmit={(data) => {
              console.log("data52",data);
              setLoading(true);
              let {username, password} = data;
              var loginValues = {
                mobNumber  : username,
                password  : password,
                role      : "candidate"
              };
              console.log("loginValues",loginValues)
             
              axios
                .post('/api/auth/post/login/mobile',loginValues)
                .then((response) => {
                  console.log("res55",response);
                  if(response.data.message === "Login Auth Successful"){
                    axios.defaults.headers.common['Authorization'] = 'Bearer '+response.data.token;
                    console.log("response.data.token",response.data.token)
                    setLoading(false);
                   AsyncStorage.multiSet([
                        ['user_id', response.data.ID],
                        ['token', response.data.token],
                      ]);
                     
                      // dispatch(
                      //   setUserDetails({
                      //     loggedIn    : true,
                      //     username: response.data.username,
                      //     firstName: response.data.userDetails.firstName,
                      //     lastName: response.data.userDetails.lastName,
                      //     email: response.data.userDetails.email,
                      //     phone: response.data.userDetails.phone,
                      //     pincode: response.data.userDetails.pincode,
                      //     user_id: response.data.userDetails.user_id,
                      //     roles: response.data.userDetails.roles,
                      //     token: response.data.userDetails.token,
                      //   }),
                      // );
                      navigation.navigate('Dashboard')
                    
                  }else if(response.data.message === 'INVALID_PASSWORD'){
                    setToast({text: "Please enter correct password", color: colors.warning});
                    setLoading(false);
                  }else if(response.data.message === 'NOT_REGISTER'){
                    setToast({text: "This username is not registered.", color: colors.warning});
                    setLoading(false);
                  }else if(response.data.message === 'USER_BLOCK'){
                    setToast({text: "Please contact to admin", color: colors.warning});
                    setLoading(false);
                  }else if(response.data.message === 'USER_UNVERIFIED'){
                    setToast({text: "Your verification is still pending.", color: colors.warning});
                    // var sendData = {
                    //   "event": "2",
                    //   "toUser_id": res.data.userDetails.user_id,
                    //   "toUserRole":"user",
                    //     "variables": {
                    //       "Username" : response.data.userDetails.firstName,
                    //       "OTP" : response.data.userDetails.otpEmail,
                    //     }
                    //   }
                      // axios.post('/api/masternotifications/post/sendNotification', sendData)
                      // .then((res) => {
                      //   console.log('sendDataToUser in result==>>>', response.data)
                      // })
                      // .catch((error) => { console.log('notification error: ',error)})
                  }
                })
                .catch((error) => {
                  console.log("error",error);
                  setLoading(false);
                  setToast({text: 'Something went wrong.', color: 'red'});
                });
            }}
            // validationSchema={LoginSchema}
            initialValues={{
              username: '',
              password: '',
            }}>
            {(formProps) => (
              <FormBody
                btnLoading={btnLoading}
                navigation={navigation}
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
      navigation,
    } = props;
    const [openModal, setModal] = useState(false);
    const [showPassword, togglePassword] = useState(false);
    const [image, setImage] = useState({profile_photo: '', image: ''});
    const [value, setValue] = useState("");
    const [loading,setLoading] = useState("");
    
  return (
      <ImageBackground source={require("../../../AppDesigns/currentApp/images/34.png")} style={commonStyles.container} resizeMode="cover" >
      <View style={{paddingHorizontal:20}}>
          <View style={styles.boxOpacity}>
            <View style={styles.syslogo}>
                <Image
                resizeMode="contain"
                source={require("../../../AppDesigns/currentApp/images/1.png")}
                style={styles.syslogoimg}
                />
            </View>
            <View style={styles.textTitleWrapper}><Text style={commonStyles.headerText}>Sign In</Text></View>
            <View style={{flexDirection:'row',alignSelf:'center',}}>
            <View style={{borderWidth:1,borderColor:'#f5a721',padding:10,marginRight:8,borderRadius:5}}>
              <Icon name="linkedin" type="font-awesome" size={20} color="#fff" />
            </View>
            <View style={{borderWidth:1,borderColor:'#f5a721',padding:10,marginLeft:8,borderRadius:5}}>
              <Icon name="google" type='font-awesome' size={20} color="#fff" />
            </View>
          </View>
          <View style={{flexDirection:'row',marginVertical:20,paddingHorizontal:10}}>
            <View style={{borderTopWidth:0.5,borderColor:"#f5a721",flex:0.45,marginTop:10}}></View>
            <View style={{flex:0.25,}}>
              <Text style={{fontSize:16,color:'#fff',textAlign:"center"}}>OR</Text>
            </View>
            <View style={{borderTopWidth:0.5,borderColor:"#f5a721",flex:0.45,marginTop:10}}></View>
          </View>
            <View style={commonStyles.formWrapper}>
            <FormPhoneInput
              labelName       = "Mobile No"
              placeholder     = "Mobile No"
              onChangeText    = {handleChange('username')}
              
              required        = {true}
              name            = "username"
              errors          = {errors}
              touched         = {touched}
              iconName        = {'phone'}
              iconType        = {'material-community'}
              autoCapitalize  = "none"
              keyboardType    = "numeric"
              style           = {{fontFamily: 'Montserrat-Regular',fontSize:15,color:'#fff',marginTop:10,marginLeft:5}}
            />
            <FormInput
              labelName       = "Password"
              placeholder     = "Password"
              onChangeText    = {handleChange('password')}
              errors          = {errors}
              name            = "password"
              required        = {true}
              touched         = {touched}
              iconName        = {'lock'}
              iconType        = {'material-community'}
              rightIcon       = {
                <TouchableOpacity
                  style={{paddingHorizontal: '5%'}}
                  onPress={() => togglePassword(!showPassword)}>
                  {showPassword ? (
                    <Icon name="eye-with-line" color="#bbb" type="entypo" size={18} />
                  ) : (
                    <Icon name="eye" type="entypo" color="#bbb" size={18} />
                  )}
                </TouchableOpacity>
              }
              secureTextEntry={!showPassword}
            />

            <View
            style={[
              {
                flexDirection   : 'row',
                alignItems      : 'flex-end',
                justifyContent  : 'flex-end',
                marginTop       : '1%',
                marginBottom    : 15,
                paddingHorizontal:10,
              },
            ]}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}>
              <View style={{flexDirection:'row'}}>
              <Text style={commonStyles.linkTextt}>Forgot Password</Text>
              <Icon name="angle-double-right" type="font-awesome" size={22} color="#aaa" style={{}} />
              </View>
            </TouchableOpacity>
          </View>

            <FormButton
              title       = {'Login'}
              onPress     = {handleSubmit}
              background  = {true}
              loading     = {btnLoading}
              iconRight
              icon={
                    <Icon
                      name="angle-double-right"
                      type="font-awesome"
                      size={22}
                      color="#FFF"
                      style={commonStyles.BNIcon}  

                    />
                  }
              buttonStyle={{borderWidth:1,borderColor:"#f5a721",fontFamily: 'Montserrat-Regular',fontSize:15,backgroundColor:"#f5a721"}}
            />

            <View
            style={[
              {
                flexDirection   : 'row',
                alignItems      : 'center',
                justifyContent  : 'center',
                marginTop       : '3%',
                marginBottom    : 25,
              },
            ]}>
            <TouchableOpacity
             onPress={() => navigation.navigate('Signup')}>
              <View style={{flexDirection:'row'}}>
              <Text style={commonStyles.linkTextt}>Sign Up</Text>
              <Icon name="angle-double-right" type="font-awesome" size={22} color="#aaa" style={{}} />
              </View>
            </TouchableOpacity>
          </View>
           
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};