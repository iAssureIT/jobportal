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
import HeaderBar                      from '../../../layouts/Header/Header.js';
import  MapView, 
        { PROVIDER_GOOGLE, 
          Polyline, 
          Marker, 
          AnimatedRegion, 
          Animated 
        } from 'react-native-maps';
import { Dropdown }                 from 'react-native-material-dropdown';
import { colors, sizes }            from '../../../config/styles.js';
import TripDetails                  from './TripDetails/TripDetails.js';
import AcceptRejectBooking          from './AcceptRejectBooking/AcceptRejectBooking.js'
import StartTrip                    from './StartTrip/StartTrip.js'
import GetOTP                       from './GetOTP/GetOTP.js'
import EndTrip                      from './EndTrip/EndTrip.js'
import EndTripDetails               from './EndTripDetails/EndTripDetails.js'
import CompletedLocation            from './CompletedLocation/CompletedLocation.js'

export default class ListofBookings extends Component {
    render() {
        const { navigation } = this.props;
        return (
            <React.Fragment>
                <View style={styles.overlay} ></View>
                <HeaderBar navigation={navigation} showBackBtn={true} headerName={"My Profile"}/>
                  <ScrollView>
                    <View style={styles.pageView}>
                      <View style={styles.modalView}>
                        <TripDetails />
                        <AcceptRejectBooking />  
                        <StartTrip />
                        <GetOTP />
                        <EndTrip />
                        <EndTripDetails />
                        <CompletedLocation />
                      </View>
                    </View>    
                  </ScrollView>
            </React.Fragment>
        );

    }
}
