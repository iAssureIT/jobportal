import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    View,
    Dimensions,
    TouchableOpacity, FlatList, Image, TouchableHighlight,
} from 'react-native';
import axios from "axios";
import { Header, Icon, Card, Button } from 'react-native-elements';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import styles from './mytripsstyle.js';
// import HeaderBar from '../../../layouts/EmployeeHeader/Header.js';
import HeaderBar from '../../../layouts/Header/Header.js';
import ValidationComponent from "react-native-form-validator";
export default class EmployeeProfileEdit extends ValidationComponent {
    constructor(props) {
        super(props);
        this.state = {
            imgarr: [
                { source: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?cs=srgb&dl=car-vehicle-automobile-range-rover-116675.jpg&fm=jpg", title: "Honda city", capacity: "4 + 1", rs: '14' },
                { source: "https://images.pexels.com/photos/1381816/pexels-photo-1381816.jpeg?cs=srgb&dl=white-and-black-mini-cooper-1381816.jpg&fm=jpg", title: "Hyundai Elantra", capacity: "3 + 1 ", rs: '16' },
                { source: "https://images.pexels.com/photos/898336/pexels-photo-898336.jpeg?cs=srgb&dl=blue-bmw-4-series-898336.jpg&fm=jpg", title: "Skoda Rapid", capacity: "3 + 1 ", rs: '14' },
                { source: "https://images.pexels.com/photos/1035108/pexels-photo-1035108.jpeg?cs=srgb&dl=photography-of-blue-wagon-audi-1035108.jpg&fm=jpg", title: "Hyundai Xcent", capacity: "3 + 1", rs: '12' },
            ],
        }

    }
    componentDidMount() {
        axios.get('/api/bookingmaster/get/list/New')
            .then((response)=>{
                this.setState({
                    tripdetailswithstatus : response.data
                })
            })
        .catch((error)=>{console.log('error: ',error)})
    }
    carreceipt() {
        this.props.navigation.navigate("BookingStatusView");
    }
    _renderlistofcars = ({ item, index }) => {
        return (
            <Card key={index} containerStyle={[styles.sliderView]}>
                <TouchableOpacity  onPress={()=>{this.carreceipt()}} >
                    <View style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 20 }}>
                        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                            <View style={{ flex: 0.7 }}>
                                <Text style={{ fontFamily: 'Montserrat-SemiBold', color: '#666', fontSize: 15 }}>{item.from.address} - {item.to.address}</Text>
                            </View>
                            <View style={{ flex: 0.3, alignItem: 'flex-end' }}>
                                <Text style={{ fontFamily: 'Montserrat-SemiBold', color: '#333', fontSize: 14 }}>ID: {item.employeeId}</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={{ color: '#333', fontFamily: "Montserrat-SemiBold" }}>1 Day - Sedan car  </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <Text style={{ color: '#999', fontFamily: "Montserrat-SemiBold" }}>Fri, 03 Jan 2020 | </Text>
                            </View>
                            <View>
                                <Text style={{ color: '#333', fontFamily: "Montserrat-SemiBold" }}>Pending </Text>
                            </View>
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
                <HeaderBar navigation={navigation} showBackBtn={true} headerName={"My Trips"} />
                <View style={{ flex: 1, borderWidth: 0, padding: 0, }}>
                    <FlatList
                        data={this.state.tripdetailswithstatus}
                        showsVerticalScrollIndicator={false}
                        renderItem={this._renderlistofcars}
                    />
                </View>
            </React.Fragment>
        );

    }
}
