import React  from 'react';
import {StyleSheet}       from 'react-native';
import {Button}     from 'react-native-elements';
import { colors }         from '../../AppDesigns/currentApp/styles/styles.js';
export const FormButton = props => {
  const {title,background,...rest} = props;
  return (
    <Button
      title           = {title}
      containerStyle  = {styles.containerStyle}  
      buttonStyle     = {background ? styles.buttonStyle : styles.buttonStyle1}
      titleStyle      = {background ? styles.titleStyle : styles.titleStyle1}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  containerStyle:{
    width:'100%',
    alignSelf:"center",
    marginVertical:15,
    paddingHorizontal:10
  },
  buttonStyle:{
    backgroundColor:colors.theme,
    // borderRadius:100,
  },
   buttonStyle1:{
    backgroundColor:colors.white,
    // borderRadius:100,
    borderWidth:1,
    borderColor:colors.theme,
    color:colors.theme,
  },
  titleStyle:{
    color:colors.white
  },
  titleStyle1:{
    color:colors.theme
  }
  
});