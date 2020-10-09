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
import { Fumi }                     from 'react-native-textinput-effects';
import MaterialCommunityIcons       from 'react-native-vector-icons/MaterialCommunityIcons';

// import BookingsTabView from '../BookingsTabView/BookingsTabView.js'
export default class EndTripDetails extends ValidationComponent {
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
          tripExpenses : [
            {ticletName:"Toll Ticket", price:"195:00", ticketImage:""},
            {ticletName:"Toll Ticket", price:"30:00", ticketImage:""},
            {ticletName:"Toll Ticket", price:"40:00", ticketImage:""},
            {ticletName:"Parking",     price:"100:00", ticketImage:""},
          ]
        };

    }
    componentDidMount() {

    }


    render() {
        const { navigation } = this.props;
        return (
            <React.Fragment>
                <View style={styles.viewBox}>
                  <Text style={styles.subHeaderText}>End Trip Details</Text>
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

                <View style={styles.formInputViewDrop,{flexDirection:'row',paddingHorizontal:15,paddingVertical:15}}>
                  <View style={{flex:0.15,justifyContent:"center",borderWidth:1,borderColor:"#f1f1f1",}}>
                     {this.state.odometerReading === "" ?
                      <Icon name="ticket" type="font-awesome" size={20}  color="#aaa" style={{}}/>
                      :
                      <Icon name="ticket" type="font-awesome" size={20}  color="#333" style={{}}/>
                    }
                  </View>
                  <Dropdown
                    label=' Trip Expenses'
                    data={[{
                      label:"Toll Ticket",
                      value: 'Toll Ticket',
                      label:"Parking",
                      value: 'Parking',
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

                <View style={{flexDirection:'row',paddingVertical:15}}>
                  <View style={[styles.formInputView, styles.marginBottom20,{flex:0.5}]}>
                    <Fumi
                      label           ={'Price'}
                      onChangeText    ={(price) => { this.setState({ price }, () => { this.validInputField('price', 'priceError'); }) }}
                      value           ={this.state.price}
                      keyboardType    ="email-address"
                      autoCapitalize  ='none'
                      iconClass       ={MaterialCommunityIcons}
                      iconName        ={'currency-inr'}
                      iconColor       ={colors.inputText}
                      iconSize        ={20}
                      iconWidth       ={40}
                      inputPadding    ={16}
                      style           ={{borderWidth:1,borderColor:"#f1f1f1"}}
                    />
                  </View>
                  <View style={{flex:0.2,backgroundColor:"#eee",marginHorizontal:10,justifyContent:"center"}}>
                    <Icon name="upload" type="font-awesome" size={20}  color="#aaa" style={{}}/>
                  </View>
                  <View style={{flex:0.3}}>
                    <Button
                      onPress={() => this.setState({ openModal: false })}
                      titleStyle={styles.buttonText}
                      title="Add"
                      buttonStyle={styles.buttonStyle1}
                      color="#ff5c5c"
                      style={styles.button}
                    />
                  </View>  
                </View>

                {
                  this.state.tripExpenses.map((item,index)=>{
                    return(
                      <Card key={index} containerStyle={styles.cardView}>
                        <View style= {{width:"100%",flexDirection:"row",alignItems:'center'}}>
                            <View style={{flex:0.2}}> 
                              <Icon name="ticket" type="font-awesome" size={20}  color="#aaa"/>
                            </View>
                            <Text style={{flex:0.6,alignSelf:"center"}}>{index+1+"."+item.ticletName}</Text>
                            <Icon name="currency-inr" type="material-community" size={20}  color="#aaa"/>
                            <Text style={{flex:0.6,alignSelf:"center"}}>{item.price}</Text>
                            <Image
                              source={require('../../../../images/tollReceipt.jpeg') }
                              style={{width:40,height:40}}
                            />
                        </View>  
                      </Card>
                    )
                  })
                }
                <View style={{padding:15}}>
                  <Button
                    onPress={() => this.setState({ openModal: false })}
                    titleStyle={styles.buttonText}
                    title="Submit Trip Expenses"
                    buttonStyle={styles.buttonStyle}
                    color="#ff5c5c"
                    style={styles.button}
                  />
                </View>           
            </React.Fragment>
        );

    }
}
