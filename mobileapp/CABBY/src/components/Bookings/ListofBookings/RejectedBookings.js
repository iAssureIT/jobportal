import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    View,
    Dimensions,ImageBackground,
    TouchableOpacity, FlatList,Image,TouchableHighlight,
} from 'react-native';
import axios from "axios";
import { Header, Icon, Card, Button } from 'react-native-elements';
import styles from './style.js';
import HeaderBar from '../../../layouts/Header/Header.js';
import ValidationComponent from "react-native-form-validator";
import moment                               from 'moment';
import { withNavigation }                   from 'react-navigation';

class RejectedBookings extends ValidationComponent {
    constructor(props) {
        super(props);
        this.state = {
            imgarr: [
                { source: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?cs=srgb&dl=car-vehicle-automobile-range-rover-116675.jpg&fm=jpg", title: "Honda city", capacity: "4 + 1",rs: '14' },
                { source: "https://images.pexels.com/photos/1381816/pexels-photo-1381816.jpeg?cs=srgb&dl=white-and-black-mini-cooper-1381816.jpg&fm=jpg", title: "Hyundai Elantra", capacity: "3 + 1 ",rs: '16' },
                { source: "https://images.pexels.com/photos/898336/pexels-photo-898336.jpeg?cs=srgb&dl=blue-bmw-4-series-898336.jpg&fm=jpg", title: "Skoda Rapid", capacity: "3 + 1 ",rs: '14' },
                { source: "https://images.pexels.com/photos/1035108/pexels-photo-1035108.jpeg?cs=srgb&dl=photography-of-blue-wagon-audi-1035108.jpg&fm=jpg", title: "Hyundai Xcent", capacity: "3 + 1",rs: '12' },
            ],
            bookingList : []
        }

    }
    componentDidMount() {
        this.getBookingList()
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        console.log("rerender")
        this.getBookingList();
    }


    getBookingList(){
        axios.get('/api/bookingmaster/get/list')
        .then((bookingList)=>{
            console.log("bookingList",bookingList);
            this.setState({
                bookingList :bookingList.data,
            })
        })
        .catch((error)=>{
            console.log("error=>",error);
        })
    }

   _renderlistofcars = ({ item, index }) => {
        return (
            <Card key={index} containerStyle={styles.sliderView}>
                <View style={{flexDirection:'row'}}>
                     <View style={styles.daysago}>
                      <Text style={styles.dateText}>{moment(item.createdAt).format('DD')}</Text>
                      <Text style={styles.dateText}>{moment(item.createdAt).format('MMMM')}</Text>
                      <Text style={styles.dateText}>{moment(item.createdAt).format('YYYY')}</Text>
                    </View>
                     <View style={styles.carsbookings}>
                        <View style={{flexDirection:"row"}}>
                            <View style={{flex:0.65,justifyContent:'flex-start'}}>
                                <Text style={{fontWeight:'bold'}}>{item.from.district+"-"+item.to.district+"-"+item.from.district}</Text>
                            </View> 
                            <View style={{flex:0.35}}>   
                                <Text style={{alignSelf:'flex-end'}}>{moment(item.pickupDate).endOf('day').fromNow()}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <View style={styles.boxhead}>
                                <Text style={styles.itemtitle}>Booking No</Text>
                                <Text style={styles.itemtitle}>Start </Text>
                                <Text style={styles.itemtitle}>Pickup Time </Text>
                                <Text style={styles.itemtitle}>Return </Text>
                            </View>
                            <View style={styles.boxheads}>
                                <Text style={styles.itemtitlename}>: ABC123 </Text>
                                <Text style={styles.itemtitlename}>: {moment(item.pickupDate).format('MMMM Do YYYY')} </Text>
                                <Text style={styles.itemtitlename}>: {moment(item.pickupTime).format('LT')}</Text>
                                <Text style={styles.itemtitlename}>: {moment(item.returnDate).format('MMMM Do YYYY')}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:"row"}}>
                            <Text style={styles.itemtitlename}>2 Day | Round Trip </Text>
                        </View>
                        <View style={{alignSelf:'flex-end',backgroundColor:"#ED3944",paddingHorizontal:10,paddingVertical:2,borderRadius:100}}>
                            <Text style={styles.itemtitlename,{color:"#fff"}}>{item.status[item.status.length-1].value}</Text>
                        </View>     
                    </View>
                    <TouchableOpacity style={[styles.viewBookingTickets,{backgroundColor:"#ED3944"}]} onPress={()=>this.props.navigation.navigate('BookingsPageView')}>
                        <Icon name='chevrons-right' size={20} color={'#fff'} type='feather'/>
                    </TouchableOpacity>
                 </View>   
            </Card>
        );
    }

    render() {
        const { navigation } = this.props;
        return (
            <React.Fragment>
                <View style={{ flex: 1, borderWidth: 0, padding: 0, }}>
                    <FlatList
                        data={this.state.bookingList}
                        showsVerticalScrollIndicator={false}
                        renderItem={this._renderlistofcars}      
                    />
         
                </View>
            </React.Fragment>
        );

    }
}
export default withNavigation(RejectedBookings);
