import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    View,
    Dimensions,ImageBackground,
    TouchableOpacity, FlatList,Image,TouchableHighlight,
} from 'react-native';
import axios                          from "axios";
import { Header, Icon, Card, Button } from 'react-native-elements';
import styles                         from './styles.js';
import ValidationComponent            from "react-native-form-validator";
import moment                         from 'moment';
import HeaderBar                      from '../../../../layouts/Header/Header.js';
import  MapView, 
        { PROVIDER_GOOGLE, 
          Polyline, 
          Marker, 
          AnimatedRegion, 
          Animated 
        } from 'react-native-maps';
import { Dropdown }                 from 'react-native-material-dropdown';
import { colors, sizes }            from '../../../../config/styles.js';
import Location                     from '../Location/Location.js';
import Dialog                       from "react-native-dialog";
import Modal                                  from "react-native-modal";
import OTPInputView from '@twotalltotems/react-native-otp-input';

// import BookingsTabView from '../BookingsTabView/BookingsTabView.js'
export default class GetOTP extends ValidationComponent {
    constructor(props) {
        super(props);
        this.state = {
          latitude: 18.5182404,
          longitude: 73.9368982,
          coordinate:new AnimatedRegion({
            latitude: 18.5182404,
            longitude: 73.9368982,
            latitudeDelta: 0.04864195044303443*4,
            longitudeDelta: 0.040142817690068*4
          }),
          routeCoordinates:[],
          distanceTravelled: 0,
          prevLatLng: {},
          reasonOfReject:"",
          odometerReading:"",
          openOTPModal:false
        };

    }
    componentDidMount() {

    }


    render() {
        const { navigation } = this.props;
        return (
            <React.Fragment>
              <Text style={styles.subHeaderText}>Reached Pick Up Location</Text>
              <View style={{padding:15}}>
                    <Button
                      onPress={() => this.setState({ openOTPModal: true  })}
                      titleStyle={styles.buttonText}
                      title="Get OTP"
                      buttonStyle={styles.buttonStyle}
                      color="#ff5c5c"
                      style={styles.button}
                    />
              </View>
              <Modal isVisible={this.state.openOTPModal}
                onBackdropPress={() => this.setState({ openOTPModal: false })}
                coverScreen={true}
                hideModalContentWhileAnimating={true}
                style={{ paddingHorizontal: '5%', zIndex: 999 }}
                animationOutTiming={500}>
                <View style={{backgroundColor:"#fff",borderRadius:10,borderRadius:10}}>
                  <View style={{height:100,backgroundColor:colors.button,borderTopLeftRadius:10,borderTopRightRadius:10,alignItems:"center",justifyContent:"center"}}>
                    <Text style={{color:"#fff",fontSize:25}}>Enter OTP</Text>
                  </View>  
                  <OTPInputView
                    style={{width: '80%', height: 100,alignSelf:"center"}}
                    pinCount={4}
                    placeholderTextColor={'#333'}
                    // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                    // onCodeChanged = {code => { this.setState({code})}}
                    autoFocusOnLoad
                    codeInputFieldStyle={styles.underlineStyleBase}
                    codeInputHighlightStyle={styles.underlineStyleHighLighted}
                    onCodeFilled = {(code => {
                        console.log(`Code is ${code}, you are good to go!`)
                    })}
                  />
                  <View style={{padding:15}}>
                    <Button
                      onPress={() => this.setState({ openOTPModal: false  })}
                      titleStyle={styles.buttonText}
                      title="Submit"
                      buttonStyle={styles.buttonStyle}
                      color="#ff5c5c"
                      style={styles.button}
                    />
              </View>
                </View>
                  
              </Modal>           
            </React.Fragment>
        );

    }
}
