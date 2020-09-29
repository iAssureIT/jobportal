import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    View, TextInput, AsyncStorage,
    Alert, Button, TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import axios from "axios";
import Modal from "react-native-modal";
import Tooltip from 'rn-tooltip';
import { Header, Icon, Card } from 'react-native-elements';
// import styles from './styles.js';
import styles from './approvalstyle.js';
import HeaderBar from '../../../layouts/Header/Header.js';
import ValidationComponent from "react-native-form-validator";
class CarStatusDriver extends ValidationComponent {
    constructor(props) {
        super(props);
        this.state = {
            remark: "",
            approve: "",
            rejected: "",
            Approved : "",
            Rejectedmodal : "",
            

        }
    }
    componentDidMount() {
        axios.get('/api/bookingmaster/get/bookingData/' + this.props.bookingid.bookingid)
            .then((response) => {
                const bookingdetails = response.data.data[0]
                console.log('response ==>', bookingdetails);
                this.setState({
                    bookingId: this.props.bookingid.bookingid,
                    bookingdetails: bookingdetails,
                })
            })
            .catch((error) => { console.log('error: ', error) })
    }
    componentWillReceiveProps(nextprops) {
        axios.get('/api/bookingmaster/get/bookingData/' + nextprops.bookingid.bookingid)
            .then((response) => {
                const bookingdetails = response.data.data[0]
                console.log('response ==>', bookingdetails);
                this.setState({
                    bookingId: nextprops.bookingid.bookingid,
                    bookingdetails: bookingdetails,
                })
            })
            .catch((error) => { console.log('error: ', error) })
    }
    ApproveBooking() {
        var formvalues = {
            bookingID: this.state.bookingId,
            status: {
                value: "Manager Accepted",
                statusBy: this.state.user_id,
                remark: this.state.remark,
                statusAt: new Date(),
            },
        }
        console.log("response in formvalues===>", formvalues)
        axios.patch("/api/bookingmaster/patch/status", formvalues)
            .then((response) => {
                console.log("response in approval===>", response.data)
                this.setState({ Approved : true });
            })
            .catch((error) =>{})

    }
    RejectBooking() {
        var formvalues = {
            bookingID: this.state.bookingId,
            status: {
                value: "Manager Rejected",
                statusBy: this.state.user_id,
                remark: this.state.remark,
                statusAt: new Date(),
            },
        }
        axios.patch("/api/bookingmaster/patch/status", formvalues)
            .then((response) => {
                console.log("response in Rejected===>", response.data)
                this.setState({ Rejectedmodal : true });
                // this.setState({
                //     hasApproved: 'true',
                //     status: status,
                // })
            })
            .catch((error) => { })

    }
    handleSlideChange = (index) => {
        this.setState({ 'activeIndex': index });
    }
    render() {
        const { navigation } = this.props;
        return (
            <React.Fragment>
                <ScrollView style={styles.carouselhead} >
                    <Card containerStyle={[styles.sliderView]}>
                        <View style={styles.policy}>
                            <Text style={styles.parking}>
                                Toll & Parking Charges Separate
                                visit our <Text style={styles.policydetails}>Cancelation Policy</Text>
                            </Text>
                        </View>
                        <View style={styles.writehere}>
                            <TextInput style={styles.input}
                                underlineColorAndroid="transparent"
                                placeholder="Write Here"
                                onChangeText={this.handleEmail} />
                        </View>
                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <View style={{ flex: 0.5, paddingRight: 35 }}>
                                <TouchableOpacity onPress={() => { this.RejectBooking() }} value={this.state.rejected}>
                                    <View style={styles.rejectshowcarbtn}>
                                        <View style={styles.rejectbtnimg}>
                                        </View>
                                        <View style={{ flex: 1, }}>
                                            <Text style={styles.rejectbtntxt}>
                                                Reject
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 0.5, paddingLeft: 45 }}>
                                <TouchableOpacity onPress={() => { this.ApproveBooking() }} >
                                    <View style={styles.approveshowcarbtn}>
                                        <View style={{ flex: 1, flexDirection: "row" }}>
                                            <View style={styles.approvebtnimg}>
                                            </View>
                                            <View style={{ flex: 1, }}>
                                                <Text style={styles.approvebtntxt}>
                                                    Approve
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Card>
                </ScrollView>
                <Modal isVisible={this.state.Approved}
                    onBackdropPress={() => this.setState({ Approved: false })}
                    coverScreen={true}
                    hideModalContentWhileAnimating={true}
                    style={{ paddingHorizontal: '5%', zIndex: 999 }}
                    animationOutTiming={500}>
                    <View style={{ backgroundColor: "#fff", alignItems: 'center', borderRadius: 20, paddingVertical: 30, paddingHorizontal: 10 }}>
                        <View style={{ justifyContent: 'center', backgroundColor: "#34be34", width: 60, height: 60, borderRadius: 30, overflow: 'hidden' }}>
                            <Icon size={30} name='check' type='fontAwesome5' color='#fff' style={{}} />
                        </View>
                        <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 16, textAlign: 'center', justifyContent: 'center', marginTop: 20 }}>
                            Trip is Approved by Manager.
                        </Text>
                        <View style={{ width: '100%', marginTop: 15, paddingHorizontal: '10%' }}>
                            <Button
                            onPress={() => this.setState({ Approved: false })}
                            titleStyle={styles.buttonText}
                            title="OK"
                            buttonStyle={styles.buttonSignUp}
                            containerStyle={styles.buttonContainer}
                            />
                        </View>
                    </View>
                </Modal>
                
                <Modal isVisible={this.state.Rejectedmodal}
                    onBackdropPress={() => this.setState({ Rejectedmodal: false })}
                    coverScreen={true}
                    hideModalContentWhileAnimating={true}
                    style={{ paddingHorizontal: '5%', zIndex: 999 }}
                    animationOutTiming={500}>
                    <View style={{ backgroundColor: "#fff", alignItems: 'center', borderRadius: 20, paddingVertical: 30, paddingHorizontal: 10 }}>
                        <View style={{ justifyContent: 'center', backgroundColor: "#34be34", width: 60, height: 60, borderRadius: 30, overflow: 'hidden' }}>
                            <Icon size={30} name='check' type='fontAwesome5' color='#fff' style={{}} />
                        </View>
                        <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 16, textAlign: 'center', justifyContent: 'center', marginTop: 20 }}>
                            Trip is Rejected by Manager.
                        </Text>
                        <View style={{ width: '100%', marginTop: 15, paddingHorizontal: '10%' }}>
                            <Button
                            onPress={() => this.setState({ Rejectedmodal: false })}
                            titleStyle={styles.buttonText}
                            title="OK"
                            buttonStyle={styles.buttonSignUp}
                            containerStyle={styles.buttonContainer}
                            />
                        </View>
                    </View>
                </Modal>
            </React.Fragment>
        );

    }
}


const mapStateToProps = (state) => {
    return {
        bookingid: state.bookingid,
    }
};
export default connect(mapStateToProps)(CarStatusDriver);