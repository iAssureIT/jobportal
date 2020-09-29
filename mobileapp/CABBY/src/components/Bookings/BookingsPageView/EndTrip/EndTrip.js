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
import Location                     from '../Location/Location.js'
// import BookingsTabView from '../BookingsTabView/BookingsTabView.js'
export default class AcceptRejectBooking extends ValidationComponent {
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
          reasonOfReject:""
        };

    }
    componentDidMount() {

    }


    render() {
        const { navigation } = this.props;
        return (
            <React.Fragment>
                <View style={{paddingHorizontal:15}}>
                    <Button
                      onPress={() => this.setState({ openModal: false })}
                      titleStyle={styles.buttonText}
                      title="Halt"
                      buttonStyle={styles.buttonStyle}
                      color="#ff5c5c"
                      style={styles.button}
                    />
              </View>        
            </React.Fragment>
        );

    }
}
