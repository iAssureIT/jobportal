import React, { Component } from 'react';
import { ScrollView, Text, View, TouchableOpacity,AsyncStorage } from 'react-native';
import axios from "axios";
import { Header, Icon, Card } from 'react-native-elements';
import styles from './styles.js';
import ValidationComponent from "react-native-form-validator";
import { connect } from 'react-redux';
class Carbookingdetails extends ValidationComponent {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        console.log("this.status IN EMP", this.props.status);
        AsyncStorage.multiGet(['token', 'user_id'])
        .then((data) => {
            user_id = data[1][1],
            this.setState({user_id : user_id})
        });
        axios.get('/api/bookingmaster/get/bookingData/' + this.props.booking_Id.booking_Id)
            .then((response) => {
                const bookingdetails = response.data.data[0]

                console.log('response bookingdetails==>', bookingdetails.vehicleCategoryId);
                axios.get('/api/categorymaster/get/one/' + bookingdetails.vehicleCategoryId)
                    .then((vehicaledets) => {
                        const vehicledetails = vehicaledets.data
                        console.log('vehicaledets ==>', vehicledetails);
                        this.setState({
                            vehicledetails: vehicledetails,
                        })
                    })
                    .catch((error) => { console.log('error: ', error) })
                this.setState({
                    bookingdetails: bookingdetails,
                    bookingId : this.props.booking_Id.booking_Id
                })
            })
            .catch((error) => { console.log('error: ', error) })
    }
    componentWillReceiveProps(nextprops) {
        console.log("this.status IN EMP", nextprops.status);
        axios.get('/api/bookingmaster/get/bookingData/' + nextprops.booking_Id.booking_Id)
            .then((response) => {
                const bookingdetails = response.data.data[0]

                console.log('response bookingdetails==>', bookingdetails.vehicleCategoryId);
                axios.get('/api/categorymaster/get/one/' + bookingdetails.vehicleCategoryId)
                    .then((vehicaledets) => {
                        const vehicledetails = vehicaledets.data
                        console.log('vehicaledets ==>', vehicledetails);
                        this.setState({
                            vehicledetails: vehicledetails,
                            bookingId : nextprops.booking_Id.booking_Id
                        })
                    })
                    .catch((error) => { console.log('error: ', error) })
                this.setState({
                    bookingdetails: bookingdetails,
                })
            })
            .catch((error) => { console.log('error: ', error) })
    }
    handleSlideChange = (index) => {
        this.setState({ 'activeIndex': index });
    }
    cancelbyuser() {
        var formvalues = {
            bookingID: this.state.bookingId,
            status: {
                value: "Cancel By User",
                statusBy: this.state.user_id,
                remark: this.state.remark,
                statusAt: new Date(),
            },
        }
        console.log("response in formvalues===>", formvalues)
        axios.patch("/api/bookingmaster/patch/status", formvalues)
            .then((response) => {
                console.log("response in Cancel===>", response.data)
            })
            .catch((error) =>{})

    }

    render() {
        const { navigation } = this.props;
        return (
            <React.Fragment>
                <ScrollView >
                    <View style={styles.carouselpage}>
                        <Card containerStyle={[styles.sliderView]}>
                            {/* <View style={styles.emp}>
                                <Text style={styles.Empdetailtitile}>Car Details </Text>
                            </View> */}
                            <View style={styles.emptitles}>
                                <View style={styles.empdetstitle}>
                                    <Text style={styles.Empdetailtitile}>Car Details </Text>
                                </View>
                                {
                                    this.props.status === "New" ?
                                        <View style={styles.empdatadets}>
                                            <TouchableOpacity onPress={()=>{this.cancelbyuser()}}>
                                                <View style={styles.showcarbtn}>
                                                    <Text style={styles.selectPlan}>
                                                        Cancel Trip
                                                </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        :
                                        null
                                }
                            </View>
                            <View style={styles.cardetails}>
                                <Text style={styles.empidsdata}>{this.state.vehicledetails ? this.state.vehicledetails.category : null}  |</Text>
                                {/* <Text style={styles.empidsdata}>4+1 | </Text> */}
                                <Text style={styles.empidsdata}>AC </Text>
                            </View>
                            <View style={styles.emp}>
                                <Text style={styles.Empdetailtitile}>Driver Details </Text>
                            </View>
                            {
                                this.state.bookingdetails && this.state.bookingdetails.statusValue != "New" ?

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

                                    <View style={styles.emp}>
                                        <Text style={styles.Driverdata}>No Driver Details Available Yet </Text>
                                    </View>

                            }

                            <View style={styles.emp}>
                                <Text style={styles.Empdetailtitile}>Estimated Cost </Text>
                            </View>
                            <View style={styles.Estcostnpolicy}>
                                <View style={styles.Estcost}>
                                    <View style={styles.empest}>
                                        <Text style={styles.empids}>Est. Cost  </Text>
                                    </View>
                                    <View style={styles.empestdata}>
                                        <Text style={styles.empidsdata}> : Rs. {this.state.bookingdetails && this.state.bookingdetails.estimatedCost}/-</Text>
                                    </View>
                                </View>

                                <View style={styles.policy}>
                                    <Text style={styles.parking}>
                                        Toll & Parking Charges Separate
                                        visit our
                                        <Text style={styles.policydetails}> Cancellation Policy </Text>
                                    </Text>
                                </View>
                            </View>
                        </Card>
                    </View>
                </ScrollView>
            </React.Fragment>
        );

    }
}

const mapStateToProps = (state) => {
    return {
        booking_Id: state.booking_Id,
        status: state.status,
    }
};
export default connect(mapStateToProps)(Carbookingdetails);