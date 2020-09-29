import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,Button,TextInput,
} from 'react-native';
import axios from "axios";
import styles from './style.js';
import { colors, } from '../../../config/styles';
import HeaderBar from '../../../layouts/EmployeeHeader/Header.js';
import ValidationComponent from "react-native-form-validator";
import Textarea from 'react-native-textarea';
// import Geolocation from '@react-native-community/geolocation';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
// var {GooglePlacesAutocomplete} = require('react-native-google-places-autocomplete');
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default class Tripbooking extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      pickuploc: "",
      droploc: "",
      startdate: "",
      enddate: "",
      roundtrip: "",
      oneway: "",
      starttime: "",
      endtime: "",
      purpose: "",
      specialinstruction : "",
    }
  }
  componentDidMount() {
    // console.log("this.state.pickuploc =",this.state.pickuploc)
  }
 
  onSelect(index, value){
    this.setState({
      value: value
    })
  }
  
   
  render() {
    return (
      <React.Fragment>
              <Text style={styles.bookingtxt}>
                Booking For
              </Text>
                <Text style={styles.bookingempname}>
                  Mr Ashish Naik (EmpId : 123456)
                </Text>
              <RadioGroup style={styles.radiobtnlocation}
                  size={24}
                  thickness={2}
                  color='#bbb'
                  selectedIndex={0}
                  activeColor = '#3869F6'
                  onSelect = {(index, value) => this.onSelect(index, value)}>
                    <RadioButton value={'Home'}   >
                      <Text>Home</Text>
                    </RadioButton>
                    <RadioButton value={'office'}>
                      <Text>Office</Text>
                    </RadioButton>
                    <RadioButton value={'other'}>
                      <Text>Other</Text>
                    </RadioButton>
              </RadioGroup>
             
            
      </React.Fragment>
    );

  }
}