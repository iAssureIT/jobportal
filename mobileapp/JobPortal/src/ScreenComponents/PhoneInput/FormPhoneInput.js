 
import React, {useState,useRef} from 'react';
import {StyleSheet,Text,View,TouchableOpacity} from 'react-native';
import {Input, Button, Icon} from 'react-native-elements';
import PhoneInput from "react-native-phone-number-input";

export const FormPhoneInput = props => {
  const {errors, touched, name} = props;
  const phoneInput        = useRef(null);
  const [valid, setValid] = useState(false);
  const [value, setValue] = useState('');
  return (
      <View style={{marginHorizontal:10,marginVertical:5}}>
        <Text style={{fontFamily:'Montserrat-Regular', fontSize: 14,paddingVertical:2}}>
            <Text style={{fontFamily:"Montserrat-Regular",color:'#fff',fontSize: 13,}}>{props.labelName}</Text>{' '}
            <Text style={{color: 'red', fontSize: 12}}>
            {props.required && '*'}
            </Text>
        </Text>
        <PhoneInput
        
            leftIcon={props.iconName ?<Icon name={props.iconName} size={20} color="white" type={props.iconType} /> : null}
            {...props}
            inputContainerStyle= {styles.containerStyle}
            containerStyle={{height:100}}
            leftIconContainerStyle={styles.leftIconContainerStyle}
            errorStyle={{ color: 'red' ,margin:0}}
            inputStyle={{textAlignVertical: "top",height:45}}

            // placeholderTextColor={'#bbb'}
            ref={phoneInput}
            // placeholderTextColor={styles.placeholderTextColor}
            defaultValue={""}
            flagButtonStyle={{width:"17%",height:45}}
            defaultCode="IN"
            layout="first"
            // withDarkTheme
            // withShadow
            countryPickerButtonStyle={styles.countryPickerButtonStyle}
            autoFocus
            codeTextStyle={styles.codetext}
            containerStyle= {styles.containerStyle}
            textContainerStyle={styles.textContainerStyle}
            textInputStyle={styles.textInputStyle}
            inputStyle={{textAlignVertical: "top",color:'#fff',}}
            onChangeFormattedText={(text) => {
                console.log("text",text);
                setValue(text)
                const checkValid = phoneInput.current?.isValidNumber(text);
                console.log("checkValid",checkValid);
                setValid(checkValid)
              }}
              {...props}

        />   
        <Text style={{fontSize:12,marginTop:2,color:"#f00"}}>{value ? !valid && "Enter a valid mobile number" :touched[name] && errors[name] ? errors[name] : ''}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
 containerStyle:{
    borderWidth:0.5,
    borderRadius:5,
    width:"100%",
    // height:45,
    borderColor:"#f5a721",
    backgroundColor:"#242933", color:'#fff'
  },
  textInputStyle:{
    height:43,
    paddingTop:15,
    // backgroundColor:"#242933",
    color:'#fff',
  },
  textContainerStyle:{
    height:43,
    // padding:0,
    // paddingTop:15,
    backgroundColor:"#242933", color:'#fff'
  },
   leftIconContainerStyle:{
    borderRightWidth:0.5,
    borderColor:"#f5a721",
    paddingLeft:5,
    paddingRight:15,
    marginVertical:0
  },
  codetext:{
    color:'#bbb',
    // marginRight:5,
    borderBottomWidth:0.5,
    height:43,
    paddingTop:10,
    color:"#bbb",
    // backgroundColor:'#f0f'
  },
  placeholderTextColor:{
    color:'#bbb'
  },
  countryPickerButtonStyle:{
    borderRightWidth:0.5,
    borderColor:"#f5a721",
    // paddingRight:3,
    // paddingLeft:10
    // width:52,
    // height:45,
  }
});