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
export default class ListofBookings extends ValidationComponent {
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

    getMapRegion = () => ({
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        latitudeDelta: 0.0043,
        longitudeDelta: 0.0034
      });

    render() {
        const { navigation } = this.props;
        return (
          <React.Fragment>
            <View style={{alignItems:"center"}}>
              <Image
                source={require('../../../../images/hondacity.png') }
                style={{height:200,width:300}}
                imageStyle={{  }}
              />
              <Text style={{fontSize:30,paddingVertical:10,color:"#333"}}> Honda City</Text>
            </View>
                <View style={{}}>
                    <View style={styles.mainHeader}>
                        <Text style={styles.mainHeaderText}>Pune-Mumbai-Trip</Text>
                    </View>
                    <View style={styles.hrLine}></View>
                    <View style={styles.viewBox}>
                        <Text style={styles.subHeaderText}>Out Station | 2 Day | Round Trip</Text>
                        <View style={{flexDirection:"row"}}>
                            <View style={{}}>
                                <Icon size={22} name='calendar' type='material-community' color='#333' iconStyle={{paddingVertical:5}} />
                                <Icon size={24} name='calendar' type='material-community' color='#333' iconStyle={{paddingVertical:5}}/>
                            </View>
                            <View style={{}}>
                                <Text style={styles.smallText}> Start</Text>
                                <Text style={styles.smallText}> Return</Text>
                            </View>
                            <View style={{}}>
                                <Text style={styles.smallText}>  :   Sat 23 Nov 20, 06:00 AM</Text>
                                <Text style={styles.smallText}>  :   Sat 23 Nov 20, 06:00 AM</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:"row",paddingVertical:5}}>
                            <Icon size={24} name='car' type='material-community' color='#333' />
                            <Text style={{fontSize:18}}> Honda City CIVIC | MH-14-HQ-7352</Text>
                        </View>
                    </View>

                    <View style={styles.viewBox}>
                        <Text style={styles.subHeaderText}>Client Info</Text>
                        <View style={{flexDirection:"row"}}>
                            <View style={{}}>
                                <Icon size={24} name='user' type='font-awesome' color='#333' iconStyle={{paddingVertical:5}}/>
                                <Icon size={24} name='phone' type='material-community' color='#333' iconStyle={{paddingVertical:5}}/>
                                <Icon size={24} name='map-marker' type='material-community' color='#333' iconStyle={{paddingVertical:5,marginBottom:35}}/>
                                <Icon size={24} name='map-marker' type='material-community' color='#333'iconStyle={{paddingVertical:5}} />
                            </View>
                            <View style={{}}>
                                    <Text style={styles.smallText}> Name</Text>
                                    <Text style={styles.smallText}> Mobile</Text>
                                    <Text style={[styles.smallText,{marginBottom:35}]}> Pick Up</Text>
                                    <Text style={styles.smallText}> Destination</Text>
                            </View>
                            <View style={{}}>
                                <Text style={styles.smallText}>  :   Mr. John Doe</Text>
                                <Text style={styles.smallText}>  :   +91 98223 26361</Text>
                                <Text style={styles.smallText}>  :   Amanora Chambers,</Text>
                                <Text style={styles.smallText}>      Magarpatta, Pune.</Text>
                                <Text style={styles.smallText}>  :   Lokhandwala, Andheri,</Text>
                                <Text style={styles.smallText}>      West Mumbai.</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.viewBox}>
                        {/*<MapView
                                                    ref={map => this.map = map}
                                                    region = {this.getMapRegion()}
                                                    style={[{height:300,width:300}]}
                                                    provider={PROVIDER_GOOGLE}
                                                  >
                                                    <MapView.Marker
                                                        coordinate={this.state.coordinate}
                                                      />
                                                    
                                                  </MapView>*/}
                        <Location />
                    </View>
                    
                </View>    
            </React.Fragment>
        );

    }
}
