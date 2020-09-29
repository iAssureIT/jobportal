import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    View,
    Alert, Image, TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import axios from "axios";
import Tooltip from 'rn-tooltip';
import { Header, Icon, Card } from 'react-native-elements';
import styles from './styles.js';
import HeaderBar from '../../../layouts/Header/Header.js';
import ValidationComponent from "react-native-form-validator";
class CarStatusDriver extends ValidationComponent {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        console.log("this.booking_Id IN EMP", this.props.booking_Id.booking_Id);
        axios.get('/api/bookingmaster/get/bookingData/' + this.props.booking_Id.booking_Id)
            .then((response) => {
                const bookingdetails = response.data.data[0]
                console.log('response ==>', bookingdetails);
                this.setState({
                    bookingdetails: bookingdetails,
                })
            })
            .catch((error) => { console.log('error: ', error) })
    }
    componentWillReceiveProps(nextprops) {
        console.log("this.booking_Id IN EMP", nextprops.booking_Id.booking_Id);
        axios.get('/api/bookingmaster/get/bookingData/' + nextprops.booking_Id.booking_Id)
            .then((response) => {
                const bookingdetails = response.data.data[0]
                console.log('response ==>', bookingdetails);
                this.setState({
                    bookingdetails: bookingdetails,
                })
            })
            .catch((error) => { console.log('error: ', error) })
    }
    handleSlideChange = (index) => {
        this.setState({ 'activeIndex': index });
    }

    render() {

        // var tripinfo = this.state.tripdetailswithstatus.statusValue
        // console.log("tripinfo===>",tripinfo);
        const { navigation } = this.props;
        return (
            <React.Fragment>
                <ScrollView style={styles.carouselhead} >

                    <Card containerStyle={[styles.sliderView]}>
                        <View style={styles.emp}>
                            <Text style={styles.Empdetailtitile}>Manager Approval </Text>
                        </View>
                        <View style={styles.managerapproval}>
                            <View style={styles.status}>
                                {
                                    this.state.bookingdetails && this.state.bookingdetails.statusValue == "New" ?
                                        <View >
                                            <Image
                                                style={{ width: "70%", height: 80, marginTop: 20 }}
                                                source={require('../../../images/hourglass6.png')}
                                            />
                                            <Text style={styles.empapp}>Pending...</Text>
                                        </View >
                                        :
                                        null
                                }
                                {
                                    this.state.bookingdetails && this.state.bookingdetails.statusValue == "Manager Accepted" ?
                                        <View>
                                            <Image
                                                style={{ width: "100%", height: 110, }}
                                                source={require('../../../images/approvedimg.png')}
                                            />
                                            <Text style={styles.empapp}>Approved</Text>
                                        </View>
                                        :
                                        null
                                }

                                {
                                    this.state.bookingdetails && this.state.bookingdetails.statusValue == "Manager Rejected" ?
                                        <View>
                                            <Image
                                                style={{ width: "100%", height: 120, }}
                                                source={require('../../../images/rejectedimg.png')}
                                            />
                                            <Text style={styles.empapp}>Rejected...</Text>
                                        </View>
                                        :
                                        null
                                }
                                {/* <Image
                                        style={{ width: "100%", height: 120, }}
                                        source={require('../../../images/rejectedimg.png')}
                                    />
                                    <Text style={styles.empapp}>Rejected...</Text> */}
                            </View>
                            <View style={styles.appdate}>
                                <Text style={styles.empapp}> Approved On </Text>
                                <Text style={styles.empappdata}> 1/1/2020 3:30 PM </Text>
                                <Text style={styles.empapp}> Robert Forest</Text>
                                <Text style={styles.empappdata}> +91 99223 45678</Text>
                            </View>
                        </View>
                        <View style={styles.emp}>
                            <Text style={styles.Empdetailtitile}>Driver Details </Text>
                        </View>
                        {

                            this.state.bookingdetails && this.state.bookingdetails.statusValue == "New" ?
                                this.state.bookingdetails && this.state.bookingdetails.statusValue == "Manager Accepted" ?

                                    <View style={styles.driverdetails}>
                                        <View style={styles.cardet}>
                                            <Text style={styles.driverdets}>Car Number  </Text>
                                            <Text style={styles.driverdets}>Driver Name</Text>
                                            <Text style={styles.driverdets}>Mobile  </Text>
                                        </View>
                                        <View style={styles.cardetdata}>
                                            <Text style={styles.driverdetsdata}> : MH-14-HQ-7352 </Text>
                                            <Text style={styles.driverdetsdata}> : Sagar Jagtap </Text>
                                            <Text style={styles.driverdetsdata}> : +91 99221 23456</Text>
                                        </View>
                                    </View>

                                    :

                                    <View style={styles.driverdetails}>
                                        <Text style={styles.driverdets}>No Driver Details Available Yet </Text>
                                    </View>
                                :

                                <View style={styles.driverdetails}>
                                    <Text style={styles.driverdets}>Manager Rejected your request </Text>
                                </View>
                        }

                    </Card>

                </ScrollView>
            </React.Fragment>
        );

    }
}


const mapStateToProps = (state) => {
    return {
        booking_Id: state.booking_Id,
    }
};
export default connect(mapStateToProps)(CarStatusDriver);