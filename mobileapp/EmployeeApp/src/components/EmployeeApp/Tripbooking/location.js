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
// import Geolocation from '@react-native-community/geolocation';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
const homePlace = {description: 'Home', geometry: { location: { lat: 19.852230, lng: 75.342580 } }};
const workPlace = {description: 'Work', geometry: { location: { lat: 18.518961, lng: 73.943062 } }};
export default class Tripbooking extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      pickuploc: "Pune",
      droploc: "Mumbai",
    }
  }
  componentDidMount() {
    // debugger
  }
  
  showmecars() {
    this.props.navigation.navigate("Carshow");
  }
  render() {
    console.log("this.state.pickuploc =",this.state.pickuploc)
    return (
      <React.Fragment>
              <View style={[styles.locationbox,styles.overlaylocation]}>
              <GooglePlacesAutocomplete
                        placeholder='Pick-Up Location'
                        minLength={2} // minimum length of text to search
                        autoFocus={false}
                        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                        keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                        listViewDisplayed='auto'    // true/false/undefined
                        fetchDetails={true}
                        onChangeText={(this.state.pickuploc)} 
                        value={this.state.pickuploc}
                        renderDescription={row => row.description} // custom description render
                        TouchableOpacity={(data, details = null) => { // 'details' is provided when fetchDetails = true
                          console.log("data ==>>", data);
                        }}
                        getDefaultValue={() => ''}
                  
                        query={{
                          key: 'AIzaSyCrzFPcpBm_YD5DfBl9zJ2KwOjiRpOQ1lE',
                        }}
                        styles={{
                          textInputContainer: {
                            backgroundColor: 'rgba(0,0,0,0)',
                            borderTopWidth: 0,
                            borderBottomWidth:0,
                            opacity: 1,
                          },
                          textInput: {
                            marginLeft: 0,
                            opacity: 1,
                            marginRight: 0,
                            borderColor : "#bbb",
                            borderWidth : 1,
                            height: 38,
                            color: '#5d5d5d',
                            fontSize: 16
                          },
                          predefinedPlacesDescription: {
                            color: '#1faadb'
                          },
                        }}
                        currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                        currentLocationLabel="Current location"
                        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                        predefinedPlaces={[homePlace, workPlace]}
                />
              </View>
              {/* <View style={styles.locationbox}>
                <GooglePlacesAutocomplete
                        placeholder='Drop Location'
                        minLength={2} // minimum length of text to search
                        autoFocus={false}
                        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                        keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                        listViewDisplayed='auto'    // true/false/undefined
                        fetchDetails={true}
                        onChangeText={(this.state.droploc)} 
                        value={this.state.droploc}
                        renderDescription={row => row.description} // custom description render
                        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                          console.log("data ==>>", data);
                          console.log("details ==>>", details);
                        }}
                        getDefaultValue={() => ''}
                        query={{
                          key: 'AIzaSyCrzFPcpBm_YD5DfBl9zJ2KwOjiRpOQ1lE',
                        }}
                        styles={{
                          textInputContainer: {
                            backgroundColor: 'rgba(0,0,0,0)',
                            borderTopWidth: 0,
                            borderBottomWidth:0
                          },
                          textInput: {
                            marginLeft: 0,
                            marginRight: 0,
                            borderColor : "#bbb",
                            borderWidth : 1,
                            height: 38,
                            color: '#5d5d5d',
                            fontSize: 16
                          },
                          predefinedPlacesDescription: {
                            color: '#1faadb'
                          },
                        }}
                        currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                        currentLocationLabel="Current location"
                        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                        predefinedPlaces={[homePlace, workPlace]}
                />
              </View>  */}
      </React.Fragment>
    );

  }
}
