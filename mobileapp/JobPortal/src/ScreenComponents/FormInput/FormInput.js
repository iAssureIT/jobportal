import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Input, Button, Icon} from 'react-native-elements';
import {
  Text,
  
} from 'react-native';
export const FormInput = props => {
  const {errors, touched, name} = props;
  return (
    <Input
      placeholderTextColor={'#bbb'}
      inputStyle={{fontSize: 12}}
      errorMessage={touched[name] && errors[name] ? errors[name] : ''}
      label={
        <Text style={{fontFamily:'Montserrat-Regular', fontSize: 12,}}>
          <Text style={{fontFamily:"Montserrat-Regular",color:'#fff',fontSize: 12,}}>{props.labelName}</Text>{' '}
          <Text style={{color: 'red', fontSize: 12}}>
            {props.required && '*'}
          </Text>
        </Text>
      }
      leftIcon={props.iconName ?<Icon name={props.iconName} size={20} color="white" type={props.iconType} /> : null}
      {...props}
      inputContainerStyle= {styles.containerStyle}
      leftIconContainerStyle={styles.leftIconContainerStyle}
      errorStyle={{ color: 'red' ,margin:0}}
      inputStyle={{textAlignVertical: "top",color:'#fff',fontSize:12}}
      containerStyle={{height:100}}
    />
  );
};

const styles = StyleSheet.create({
  containerStyle:{
   borderBottomWidth:.5,
   borderWidth:.5,
    borderRadius:5,
    width:"100%",
    height:43,
    borderColor:"#f5a721",
    backgroundColor:"#242933",
    color:'#fff',
    
  },
  leftIconContainerStyle:{
    borderRightWidth:0.5,
    borderColor:"#f5a721",
    color:'#fff',
    paddingLeft:15,
    paddingRight:15,
    margin:0
  }
  
});