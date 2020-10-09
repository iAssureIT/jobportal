import React, { Component } from 'react';
import { ScrollView, Text, View, } from 'react-native';
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
        console.log("this.booking_Id IN EMP", this.props.booking_Id.booking_Id);
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
                })
            })
            .catch((error) => { console.log('error: ', error) })
    }
    handleSlideChange = (index) => {
        this.setState({ 'activeIndex': index });
    }

    render() {
        const { navigation } = this.props;
        return (
            <React.Fragment>
                <ScrollView >
                    <View style={styles.carouselpage}>
                        <Card containerStyle={[styles.sliderView]}>
                            <View style={styles.emp}>
                                <Text style={styles.Empdetailtitile}>Car Details </Text>
                            </View>
                            <View style={styles.cardetails}>
                                <Text style={styles.empidsdata}>{this.state.vehicledetails ? this.state.vehicledetails.category : null}  |</Text>
                                {/* <Text style={styles.empidsdata}>4+1 | </Text> */}
                                <Text style={styles.empidsdata}>AC </Text>
                            </View>
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
    }
};
export default connect(mapStateToProps)(Carbookingdetails);