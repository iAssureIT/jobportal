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
import ValidationComponent from "react-native-form-validator";
import Textarea from 'react-native-textarea';
export default class datetime extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      startdate: "",
      enddate: "",
      starttime: "",
      endtime: "",
    }
  }
  componentDidMount() {
    // debugger
   
  }
  onSelect(index, value){
    this.setState({
      value: value
    })
  }
  
  
  showmecars() {
    this.props.navigation.navigate("Carshow");
  }
  
   
  render() {
    const { navigation } = this.props;
    return (
      <React.Fragment>
        <View style={{ flex: 1, flexDirection: 'row', position: "relative", }}>
              <View style={styles.borderdate}>
                
                <TouchableOpacity onPress={() => this.setState({ isDatePickerVisibleStart: true,isDatePickerVisibleEnd: false})} >
                    {
                      this.state.startdate !== "" ?
                      <View style={styles.datetimeText} value={this.state.startdate}>
                        <Text style={styles.dateText} >{this.state.startdate !== "" ? moment(this.state.startdate).format('DD') : ""}</Text>
                        <Text style={styles.monthText}>{this.state.startdate !== "" ? moment(this.state.startdate).format('MMM') : ""},
                            <Text style={styles.dayText}>{this.state.startdate !== "" ? moment(this.state.startdate).format('ddd') : ""} </Text>
                        </Text>
                      </View>
                      :
                      <View style={styles.selectdate} >
                        <Text style={styles.startselect}>Select Start Date</Text>

                      </View>
                    }
                </TouchableOpacity>
                {
                  this.state.starttime == "" ?
                    this.state.startdate == "" ?
                      null
                      :
                      <View >
                        <TouchableOpacity onPress={() => this.setState({ isTimePickerVisibleStart: true, isTimePickerVisibleEnd: false })}>
                          <Text style={styles.selecttime}> Please Select Time </Text>
                        </TouchableOpacity>

                      </View>
                    :
                    <View value={this.state.starttime}>
                      <TouchableOpacity onPress={() => this.setState({ isTimePickerVisibleStart: true, isTimePickerVisibleEnd: false })}>
                        <Text style={styles.timeText}> Time: {this.state.starttime !== "" ? moment(this.state.starttime).format('LT') : ""} </Text>
                      </TouchableOpacity>
                    </View>

                }

              </View>
              <View style={styles.midcircle}>
              </View>
              <View style={styles.borderdate}>
                <View>
                  <TouchableOpacity onPress={() => this.setState({ isDatePickerVisibleEnd: true,isDatePickerVisibleStart: false})}>
                  {this.state.enddate !== "" ?
                    <View style={styles.datetimeText} value={this.state.enddate} >
                      <Text style={styles.dateText}>{this.state.enddate !== "" ? moment(this.state.enddate).format('DD') : ""}</Text>
                      <Text style={styles.monthText}>{this.state.enddate !== "" ? moment(this.state.enddate).format('MMM') : ""},
                          <Text style={styles.dayText}>{this.state.enddate !== "" ? moment(this.state.enddate).format('ddd') : ""} </Text>
                      </Text>
                    </View>
                    :
                    <View style={styles.selectdate} >
                      <Text style={styles.startselect}>Select End Date</Text>
                    </View>
                  }
                  </TouchableOpacity>
                </View>

                {
                  this.state.endtime == "" ?
                    this.state.enddate == "" ?
                      null
                      :
                      <View >
                        <TouchableOpacity onPress={() => this.setState({ isTimePickerVisibleEnd: true, isTimePickerVisibleStart: false })}>
                          <Text style={styles.selecttime}> Please Select Time </Text>
                        </TouchableOpacity>

                      </View>
                    :
                      <View value={this.state.endtime}>
                        <TouchableOpacity onPress={() => this.setState({ isTimePickerVisibleStart: true, isTimePickerVisibleEnd: false })}>
                          <Text style={styles.timeText}> Time: {this.state.endtime !== "" ? moment(this.state.endtime).format('LT') : ""} </Text>
                        </TouchableOpacity>
                      </View>
                }
              </View>
            </View>
           
          <DateTimePickerModal
            isVisible={this.state.isDatePickerVisibleStart}
            mode="date"
            onConfirm={(date) => this.setState({ "startdate": date, "isDatePickerVisibleStart": false })}
            // onCancel={this.hideDatePicker}
          />
          <DateTimePickerModal
            isVisible={this.state.isTimePickerVisibleStart}
            mode="time"
            onConfirm={(starttime) => this.setState({ "starttime": starttime, "isTimePickerVisibleStart": false })}
            // onCancel={this.hideDatePicker}
          />
          <DateTimePickerModal
            isVisible={this.state.isDatePickerVisibleEnd}
            mode="date"
            onConfirm={(date) => this.setState({ "enddate": date, "isDatePickerVisibleEnd": false })}
            // onCancel={this.hideDatePicker}
          />
          <DateTimePickerModal
            isVisible={this.state.isTimePickerVisibleEnd}
            mode="time"
            onConfirm={(starttime) => this.setState({ "endtime": starttime, "isTimePickerVisibleEnd": false })}
            // onCancel={this.hideDatePicker}
          />
      </React.Fragment>
    );

  }
}
