import React, { Component } from 'react';
import {
    Text,View,AsyncStorage,
    TouchableOpacity, FlatList,
} from 'react-native';
import axios from "axios";
import { Header, Icon, Card, Button } from 'react-native-elements';
import styles from './style.js';
import moment from 'moment';
import {NavigationActions,StackActions} from 'react-navigation';
import ValidationComponent from "react-native-form-validator";
import { withNavigation }                   from 'react-navigation';
class NewBookings extends ValidationComponent {

    navigateScreen=(route)=>{
        const navigateAction = StackActions.push({
        routeName: route,
        params: {},
        action: NavigationActions.navigate({ routeName: route }),
    });
    this.props.navigation.dispatch(navigateAction);
    }
    constructor(props) {
        super(props);
        this.state = {
            imgarr: [
                { source: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?cs=srgb&dl=car-vehicle-automobile-range-rover-116675.jpg&fm=jpg", title: "Honda city", capacity: "4 + 1",rs: '14' },
                { source: "https://images.pexels.com/photos/1381816/pexels-photo-1381816.jpeg?cs=srgb&dl=white-and-black-mini-cooper-1381816.jpg&fm=jpg", title: "Hyundai Elantra", capacity: "3 + 1 ",rs: '16' },
                { source: "https://images.pexels.com/photos/898336/pexels-photo-898336.jpeg?cs=srgb&dl=blue-bmw-4-series-898336.jpg&fm=jpg", title: "Skoda Rapid", capacity: "3 + 1 ",rs: '14' },
                { source: "https://images.pexels.com/photos/1035108/pexels-photo-1035108.jpeg?cs=srgb&dl=photography-of-blue-wagon-audi-1035108.jpg&fm=jpg", title: "Hyundai Xcent", capacity: "3 + 1",rs: '12' },
            ],
        }
    }
    componentDidMount() {
        let bookingdata = "";
        AsyncStorage.multiGet(['token', 'user_id'])
        .then((data) => {
            user_id = data[1][1],
            bookingdata ={
                userId : user_id,
                status : "New"
            }
            axios.post('/api/bookingmaster/get/bookingList',bookingdata)
                .then((response)=>{
                    console.log("response.data==>>>",response.data[0].managerId1);
                    this.setState({
                        tripdetailswithstatus : response.data
                    })
                })
                .catch((error)=>{console.log('error: ',error)})
        });
        
    }
   
    bookingdetails(booking_Id){
        console.log("booking_Id==>",booking_Id);
        this.props.navigation.navigate("BookingStatusView",{booking_Id:booking_Id,status:"New"});
    }
    _renderlistofcars = ({ item, index }) => {
        return (
            <Card key={index} containerStyle={[styles.sliderView]}>
                <TouchableOpacity  onPress={()=>{this.bookingdetails({booking_Id:item._id})}} >
                    <View style={{ flex: 1,flexDirection: 'row', paddingHorizontal: 2, paddingVertical: 2 }}>
                    <View style={{ flex: 0.2, paddingHorizontal: 5, paddingVertical: 5,borderRightWidth : 1,borderStyle: "dotted" }}>
                        <View>
                            <Text style={{ color: '#510f99', fontFamily: "Montserrat-SemiBold",textAlign:"center" }}> {moment(item.pickupDate).format('DD')}  </Text>
                            <Text style={{ color: '#999', fontFamily: "Montserrat-SemiBold",textAlign:"center" }}>  {moment(item.pickupDate).format('MMM')}  </Text>
                            <Text style={{ color: '#999', fontFamily: "Montserrat-SemiBold",textAlign:"center" }}> {moment(item.pickupDate).format('YYYY')}  </Text>
                        </View>
                    </View>
                    <View style={{ flex: 0.6, paddingHorizontal: 5, paddingVertical: 5 ,borderRightWidth: 1, borderStyle: 'dotted', borderRightColor: '#333'}}>
                        <View style={{  marginBottom: 0 }}>
                            
                            <Text style={{ fontFamily: 'Montserrat-SemiBold', color: '#666', fontSize: 13 }}>From: {item.from.address} </Text>
                            <Text style={{ fontFamily: 'Montserrat-SemiBold', color: '#666', fontSize: 13 }}>To: {item.to.address}</Text>
                            <Text style={{ fontFamily: "Montserrat-SemiBold", color: '#666', fontSize: 13}}>Return: {moment(item.returnDate).format('DD MMM YY')}  </Text>
                            {/* <Text style={{ fontFamily: "Montserrat-SemiBold", color: '#666', fontSize: 13}}>Car: White, Honda City,  MH-12-AB-1234  </Text>
                            <Text style={{ fontFamily: "Montserrat-SemiBold", color: '#666', fontSize: 13}}>Driver: Mahesh Shinde (+91-939382919)x  </Text> */}
                            {/* <Text style={{ color: '#333', fontFamily: "Montserrat-SemiBold" }}>Car: White, Honda City,  MH-12-AB-1234  </Text>
                            <Text style={{ color: '#333', fontFamily: "Montserrat-SemiBold" }}>Driver: Mahesh Shinde (+91-939382919)  </Text> */}
                        </View>
                        
                    </View>
                    <View style={{ flex: 0.2, paddingHorizontal: 5, paddingVertical: 5 }}>
                        <Text style={{ fontFamily: 'Montserrat-SemiBold', color: '#666', fontSize: 12 }}>Booking ID: {item.bookingId}</Text>
                        {/* <Text style={{ fontFamily: 'Montserrat-SemiBold', color: '#666', fontSize: 12 }}></Text> */}
                        <Text style={{ fontFamily: 'Montserrat-SemiBold', color: '#666', fontSize: 12 }}>New</Text>
                    </View>
                    </View>
                </TouchableOpacity>
            </Card>
        );
    }

    render() {
        const { navigation } = this.props;
        return (
            <React.Fragment>
                <View style={{ flex: 1, borderWidth: 0, padding: 0, }}>
                {
                    this.state.tripdetailswithstatus == "" ?
                    <View style={{ flex: 0.3, paddingHorizontal: 5, paddingVertical: 5 }}>
                        <Text style={{ fontFamily: 'Montserrat-SemiBold',textAlign:"center", color: '#666', fontSize: 20 }}>No trips to show</Text>
                    </View>
                :
                    <FlatList
                        data={this.state.tripdetailswithstatus}
                        showsVerticalScrollIndicator={false}
                        renderItem={this._renderlistofcars}
                    />
                }
                </View>
            </React.Fragment>
        );

    }
}
export default withNavigation(NewBookings);