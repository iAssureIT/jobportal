import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
import { Header, Icon, Card } from 'react-native-elements';
import styles from './styles.js';
import axios from "axios";
import { connect } from 'react-redux';
import ValidationComponent from "react-native-form-validator";
class carbookingdetails extends ValidationComponent {
    constructor(props) {
        super(props);
        this.state = {
            bookedtrip : '',
        }
    }
    componentDidMount() {
        // console.log("this.bookingId",this.props.bookingId);
        this.setState({bookingID : this.props.bookingId},()=>{this.receiptdata()})
    }
    componentWillReceiveProps(nextprops){
        this.setState({bookingID : nextprops.bookingId},()=>{
            this.receiptdata()
        })
    }
    receiptdata(){
        axios.get('/api/bookingmaster/get/booking/'+this.state.bookingID)
        .then((response)=>{
                const bookingdetails = response.data.data[0]
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
                    bookingdetails : bookingdetails,
                })
            })
        .catch((error)=>{console.log('error: ',error)})
    }

    render() {
        const { navigation } = this.props;
        return (
            <React.Fragment>
                <ScrollView >
                    <View style={styles.carouselpage}>
                        <ScrollView style={styles.carouselhead} >
                            <Card containerStyle={[styles.sliderView]}>
                                <View style={styles.emp}>
                                    <Text style={styles.Empdetailtitile}>Car Details </Text>
                                </View>
                                <View style={styles.cardetails}>
                                    <Text style={styles.empidsdata}>{this.state.vehicledetails ? this.state.vehicledetails.category : null}  |</Text>
                                    <Text style={styles.empidsdata}>AC </Text>
                                </View>
                                <View style={styles.emp}>
                                    <Text style={styles.Empdetailtitile}>Estimated Cost </Text>
                                </View>
                                <View style={styles.Estcost}>
                                    <View style={styles.Estcost}>
                                        <View style={styles.empest}>
                                            <Text style={styles.empids}>Est. Cost  </Text>
                                        </View>
                                        <View style={styles.empestdata}>
                                            <Text style={styles.empidsdata}> : Rs. { this.state.bookingdetails ? this.state.bookingdetails.estimatedCost : null}/-</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.policy}>
                                    <Text style={styles.parking}>
                                        Toll & Parking Charges Separate
                                        visit our 
                                        <Text style={styles.policydetails}> Cancellation Policy </Text> 
                                    </Text>
                                </View>
                                {/* <TouchableOpacity onPress={()=>this.props.navigation.navigate('Tripbooking')}>
                                    <View style={styles.showcarbtn}>
                                        <View style={{ flex: 1, flexDirection: "row" }}>
                                            <View style={styles.btnimg}>
                                                <Image
                                                    source={require('../../../images/5.png')}
                                                />
                                            </View>
                                            <View style={{ flex: 1, }}>
                                                <Text style={styles.selectPlan}>
                                                    Go Home
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>  */}
                            </Card>
                        </ ScrollView >
                    </View>
                </ScrollView>
            </React.Fragment>
        );

    }
}



const mapStateToProps = (state) => {
    return {
      fullName: state.fullName,
      employeeId: state.employeeId,
      mobile: state.mobile,
      bookingId: state.bookingId,
    }
};
export default connect(mapStateToProps)(carbookingdetails);