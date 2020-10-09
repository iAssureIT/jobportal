import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    View,AsyncStorage,
    Dimensions,ImageBackground,
    TouchableOpacity, FlatList,Image,TouchableHighlight,
} from 'react-native';
import axios from "axios";
import moment from 'moment';
import { Header, Icon, Card, Button } from 'react-native-elements';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import styles from './style.js';
import ValidationComponent from "react-native-form-validator";
// import BookingsTabView from '../BookingsTabView/BookingsTabView.js'
import { withNavigation }                   from 'react-navigation';
class CancelBookings extends ValidationComponent {
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
            this.setState({user_id : user_id})
            bookingdata ={
                userId : user_id,
                status : "Cancel By User"
            }
            axios.post('/api/bookingmaster/get/bookingList',bookingdata)
                .then((response)=>{
                    this.setState({
                        tripdetailswithstatus : response.data
                    })
                })
                .catch((error)=>{console.log('error: ',error)})
                   
        });
        
    }
    componentWillReceiveProps(nextprops) {
        bookingdata ={
            userId : this.state.user_id,
            status : "Cancel By User"
        }
        axios.post('/api/bookingmaster/get/bookingList',bookingdata)
            .then((response)=>{
                // console.log("response.data",response.data);
                this.setState({
                    tripdetailswithstatus : response.data
                })
            })
            .catch((error)=>{console.log('error: ',error)})
    }
    bookingdetails(booking_Id){
        console.log("booking_Id==>",booking_Id);
        this.props.navigation.navigate("BookingStatusView",{booking_Id:booking_Id});
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
                        </View>
                        
                    </View>
                    <View style={{ flex: 0.2, paddingHorizontal: 5, paddingVertical: 5 }}>
                        <Text style={{ fontFamily: 'Montserrat-SemiBold', color: '#666', fontSize: 12 }}>Booking ID: {item.bookingId}</Text>
                        <Text style={{ fontFamily: 'Montserrat-SemiBold', color: '#666', fontSize: 12 }}>{item.statusValue}</Text>
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
export default withNavigation(CancelBookings);