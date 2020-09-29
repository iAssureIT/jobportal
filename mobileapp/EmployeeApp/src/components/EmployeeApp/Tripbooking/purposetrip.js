import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,Button,TextInput,
} from 'react-native';
import axios from "axios";
import { Header, Card, } from 'react-native-elements';
import { Fumi } from 'react-native-textinput-effects';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import styles from './style.js';
import { colors, } from '../../../config/styles';
import HeaderBar from '../../../layouts/EmployeeHeader/Header.js';
import ValidationComponent from "react-native-form-validator";
import Textarea from 'react-native-textarea';
import { withNavigation }                   from 'react-navigation';
class purposetrip extends ValidationComponent {
    
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
  
  
  showmecars() {
    this.props.navigation.navigate("Carshow");
  }
  
   
  render() {
      const { navigation } = this.props;
    return (
      <React.Fragment>
       
             <View style={[styles.purposeninstruction,styles.marginTop20]}>
              <TextInput
                style={styles.purposebooking}
                onChangeText = {this.handlepurpose}
                placeholder = "Purpose of Trip"
              />
            </View>
            <View style={styles.instruction}>
               <Textarea
                containerStyle={styles.textareaContainer}
                style={styles.textarea}
                onChangeText={this.onChange}
                defaultValue={this.state.text}
                maxLength={120}
                placeholder={'Special Instruction'}
                placeholderTextColor={'#c7c7c7'}
              />
            </View> 

             
              <TouchableOpacity  onPress={()=>{this.showmecars()}} >
                <View style={styles.showcarbtn} >
                    <View style={{ flex: 1, flexDirection: "row" }}>
                      <View style={styles.btnimg}>
                        <Image
                          source={require('../../../images/5.png')}
                        />
                      </View>
                      <View style={{ flex: 1, }}>
                        <Text style={styles.selectPlan}>
                          Select Car
                        </Text>
                      </View>
                    </View>
                </View>
              </TouchableOpacity>
           
      </React.Fragment>
    );

  }
}
export default withNavigation(purposetrip);