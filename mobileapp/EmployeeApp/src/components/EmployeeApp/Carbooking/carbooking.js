import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  Image, Button, TextInput,
} from 'react-native';
import axios from "axios";
import { Header, Card, } from 'react-native-elements';
import { Fumi } from 'react-native-textinput-effects';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import styles from './style.js';
import { colors, projectName } from '../../../config/styles.js';
import { TextField } from "react-native-material-textfield";
import HeaderBar from '../../../layouts/EmployeeHeader/Header.js';
import ValidationComponent from "react-native-form-validator";
// import { RadioButton } from 'react-native-paper';
// import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'


export default class Carbooking extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      employeedata: "",
      selfemp: "",
      otheremp: "",

    }
  }
  componentDidMount() {
    AsyncStorage.multiGet(['token', 'user_id'])
      .then((data) => {
         user_id = data[1][1]
          axios.get('/api/users/get/'+user_id)
            .then((response) => {
              console.log("response.data",response.data);
              this.setState({empdata : response.data,mobile:response.data.mobile})
              const emailid = response.data.email;
              axios.get("/api/personmaster/get/emailID/" + emailid)
              .then((response) => {
                console.log("response.data.data[0].employeeid ",response.data.data[0].employeeId)
                this.setState({employeeId : response.data.data[0].employeeId,})
              })
              .catch((error) => {
                console.log("error",error);
              })
            })
          .catch((error) => {})
      });
  }

  onSelect(index, value) {
    this.setState({
      value: value
    })
  }
  employeedata() {
    axios.get("/api/personmaster/get/UserID/" + this.state.employeeId)
      .then((response) => {
        this.setState({
          userID: response.data.data[0]._id,
          empName: response.data.data[0].firstName + ' ' + response.data.data[0].lastName,
        })
      })
      .catch((error) => {
      })
  }

  showmecars() {
    this.props.navigation.navigate("Tripbooking", { empdata: this.state.empdata,employeeId:this.state.employeeId,mobile:this.state.mobile });
  }

  render() {
    const { navigation } = this.props;
    return (
      <React.Fragment>
        <View style={styles.overlay} />
        <HeaderBar navigation={navigation} showBackBtn={true} headerName={"Car Booking"} />
        <ScrollView >
          <View style={styles.headpageimg}>
            <Text style={styles.carname}> Trip Booking </Text>
          </View>
          <Card containerStyle={[styles.sliderView]}>
            <View >
              <RadioGroup style={styles.radiobtn}
                size={24}
                thickness={2}
                color='#bbb'
                selectedIndex={0}
                activeColor={projectName === "pipito" ? "#510f99" : "#283593"}
                onSelect={(index, value) => this.onSelect(index, value)}>
                <RadioButton value={'self'}   >
                  <Text>Self</Text>
                </RadioButton>
                <RadioButton value={'other'}>
                  <Text>Other</Text>
                </RadioButton>
              </RadioGroup>
              {
                this.state.value === "other" ?
                  <View >
                    <View style={[styles.formInputView,styles.marginBottom20]}>
                    <View style={styles.inputTextWrapper}>
                      <TextField
                        label                 ="Employee Id"
                        onChangeText          ={(employeeId) => { this.setState({ employeeId }) }}
                        value                 ={this.state.employeeId}
                        onFocus               ={() => { this.employeedata() }}
                        onBlur                ={()  => { this.employeedata() }}
                        lineWidth             = {1}
                        tintColor             = {colors.button}
                        inputContainerPadding = {0}
                        labelHeight           = {15}
                        baseColor             = {'#666'}
                        textColor             = {'#333'}
                        containerStyle        = {styles.textContainer}
                        inputContainerStyle   = {styles.textInputContainer}
                        titleTextStyle        = {styles.textTitle}
                        style                 = {styles.textStyle}
                        labelTextStyle        = {styles.textLabel}
                        keyboardType          = "default"
                      />
                    </View>
                  </View> 
                  <View style={styles.employeename}>
                    {
                      this.state.empName != "" ?
                        <Text style={styles.dayText}>{this.state.empName}</Text>
                        :
                        <Text style={styles.dayText}>User Not found</Text>
                    }
                  </View>
                    {
                      this.state.empName ?
                        <TouchableOpacity onPress={this.showmecars() } >
                          <View style={styles.showcarbtn} >
                            <View style={{ flex: 1, flexDirection: "row" }}>
                              <View style={styles.btnimg}>
                                <Image
                                  source={require('../../../images/5.png')}
                                />
                              </View>
                              <View style={{ flex: 1, }}>
                                <Text style={styles.selectPlan}>
                                  Next
                                  </Text>
                              </View>
                            </View>
                          </View>
                        </TouchableOpacity>
                        :
                        <View style={styles.nonactivecarbtn} >
                          <View style={{ flex: 1, flexDirection: "row" }}>
                            <View style={styles.btnimg}>
                              <Image
                                source={require('../../../images/5.png')}
                              />
                            </View>
                            <View style={{ flex: 1, }}>
                              <Text style={styles.selectPlan}>
                                Next
                              </Text>
                            </View>
                          </View>
                        </View>
                    }
                  </View>
                  :
                  null
              }
              {
                this.state.value === "other" ?
                  null
                  :
                  <TouchableOpacity onPress={() => { this.showmecars() }} >
                    <View style={styles.showcarbtn} >
                      <View style={{ flex: 1, flexDirection: "row" }}>
                        <View style={styles.btnimg}>
                          <Image
                            source={require('../../../images/5.png')}
                          />
                        </View>
                        <View style={{ flex: 1, }}>
                          <Text style={styles.selectPlan}>
                            Next
                        </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
              }
            </View>
          </Card>
        </ScrollView>
      </React.Fragment>
    );

  }
}

// EmployeeProfileEdit.defaultProps = {
//   messages: {
//     en: {
//       numbers: 'This field must be a number.',
//       email: 'Enter a valid email address',
//       required: 'This field is required.',
//       letters: 'It should only contain letters.',
//       mobileNo: 'Enter a valid mobile number.',
//       lettersOrEmpty: 'It should only contain letters.',
//       minlength: 'Length should be greater than 5',
//     }
//   },

//   rules: {
//     numbers: /^(([0-9]*)|(([0-9]*)\.([0-9]*)))$/,
//     email: /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$|^$/,
//     required: /\S+/,
//     letters: /^[a-zA-Z ]+$/,
//     lettersOrEmpty: /^[a-zA-Z ]+$|^$/,
//     // mobileNo: /^\d{5}([- ]*)\d{6}$|^(\+91?)?[0]?(91)?[789]\d{9}$|^$/,
//     mobileNo: /^(\+91\s)?[0-9]{3}\-[0-9]{3}\-[0-9]{4}$/,
//     minlength(length, value) {
//       if (length === void (0)) {
//         throw 'ERROR: It is not a valid length, checkout your minlength settings.';
//       } else if (value.length > length) {
//         return true;
//       }
//       return false;
//     },
//   },
// }
