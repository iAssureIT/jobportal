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
          reasonOfReject:"",
          odometerReading:""
        };

    }
    componentDidMount() {

    }


    render() {
        const { navigation } = this.props;
        return (
            <React.Fragment>
                <View style={styles.viewBox}>
                  <Text style={styles.subHeaderText}>Start Trip</Text>
                    <View style={styles.formInputViewDrop,{flexDirection:'row',paddingHorizontal:15}}>
                      <View style={{flex:0.15,justifyContent:"center",borderWidth:1,borderColor:"#f1f1f1",}}>
                         {this.state.odometerReading === "" ?
                          <Icon name="tachometer" type="font-awesome" size={20}  color="#aaa" style={{}}/>
                          :
                          <Icon name="tachometer" type="font-awesome" size={20}  color="#333" style={{}}/>
                        }
                      </View>
                      <Dropdown
                        label=' Odometer Reading'
                        data={[{
                          label:"Health Issue",
                          value: 'Health Issue',
                        }]}
                        onChangeText    ={(odometerReading) => this.setState({ odometerReading })}
                        value           ={this.state.reasonOfReject}
                        dropdownOffset      = {{top:0, left: 0}}
                        itemTextStyle       = {styles.ddItemText}
                        tintColor           = {colors.button}
                        labelFontSize       = {sizes.label}
                        labelTextStyle      = {styles.ddLabelText}
                        labelHeight         = {20}
                        fontSize            = {16}
                        baseColor           = {'#666'}
                        textColor           = {'#333'}
                        containerStyle  = {{borderWidth:1,borderLeftWidth:0,borderColor:"#f1f1f1",flex:0.875}}
                        inputContainerStyle={{ borderBottomColor: 'transparent' }}
                      />
                    </View>
                </View>
                <View style={{height:100,width:100,backgroundColor:"#eee",justifyContent:"center",alignSelf:'center'}}>
                  <Icon name="camera" type="font-awesome" size={40}  color="#aaa" style={{}}/>
                </View>
                <View style={{padding:15}}>
                    <Button
                      onPress={() => this.setState({ openModal: false })}
                      titleStyle={styles.buttonText}
                      title="Start Now"
                      buttonStyle={styles.buttonStyle}
                      color="#ff5c5c"
                      style={styles.button}
                    />
              </View> 
              <View style={{padding:15}}>
                    <Button
                      onPress={() => this.setState({ openModal: false })}
                      titleStyle={styles.buttonText}
                      title="Reached Pick Up Location"
                      buttonStyle={styles.buttonStyle}
                      color="#ff5c5c"
                      style={styles.button}
                    />
              </View>           
            </React.Fragment>
        );

    }
}
