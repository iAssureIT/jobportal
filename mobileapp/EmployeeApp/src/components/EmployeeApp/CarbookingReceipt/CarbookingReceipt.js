import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Alert, Image, Button
} from 'react-native';
import Modal from "react-native-modal";
import axios from "axios";
import Tooltip from 'rn-tooltip';
import { Header, Icon, Card } from 'react-native-elements';
import styles from './styles.js';
import HeaderBar from '../../../layouts/Header/Header.js';
import ValidationComponent from "react-native-form-validator";
export default class CarbookingReceipt extends ValidationComponent {
    constructor(props) {
        super(props);
        this.state = {
            bookedtrip : '',
        }
    }
    componentDidMount() {
            
    }

    render() {
        const { navigation } = this.props;
        return (
            <React.Fragment>
                <View style={styles.overlay} />
                <HeaderBar navigation={navigation} showBackBtn={true} headerName={"Booking Receipt"} />
                <ScrollView >
                    <View style={styles.carouselpage}>
                        <ScrollView style={styles.carouselhead} >
                            <Card containerStyle={[styles.sliderView]}>
                                <View style={styles.seat}>
                                    <Text style={styles.Bookingdate}> Booking Date: 1 Jan 20 </Text>
                                </View>
                                <View style={styles.emp}>
                                    <Text style={styles.Empdetailtitile}>Employee Details </Text>
                                </View>
                                <View style={styles.empdetials}>
                                    <View style={styles.empdets}>
                                        <Text style={styles.empdetails}>Employee ID  </Text>
                                        <Text style={styles.empdetails}>Name  </Text>
                                        <Text style={styles.empdetails}>Mobile  </Text>
                                    </View>
                                    <View style={styles.empdets}>
                                        <Text style={styles.empdetailsdata}> : 662775742 </Text>
                                        <Text style={styles.empdetailsdata}> : Mr. John Doe </Text>
                                        <Text style={styles.empdetailsdata}> : +91 98223 26361 </Text>
                                    </View>
                                </View>
                                <View style={styles.emp}>
                                    <Text style={styles.Empdetailtitile}>Trip Details </Text>
                                </View>
                                <View style={styles.empdetials}>
                                    <View style={styles.tripdets}>
                                        <Text style={styles.emptrip}>From Location  </Text>
                                        <Text style={styles.emptrip}>To Location  </Text>
                                        <Text style={styles.emptrip}>From Date Time  </Text>
                                        <Text style={styles.emptrip}>To Date Time  </Text>
                                    </View>
                                    <View style={styles.tripdetsdata}>
                                        <Tooltip width={200} height={100} withOverlay = {true}  backgroundColor = {"#9151f0"} tooltipText="address" popover={<Text style={{ color: "#fff", }}> Amanora Chambers, Magarpatta, Pune.</Text>}>
                                            <Text numberOfLines = {1} style={styles.emptripdata}> : Amanora Chambers, Magarpatta, Pune. </Text>
                                        </Tooltip>
                                        
                                        <Tooltip width={200} height={100} withOverlay = {true} backgroundColor = {"#9151f0"} tooltipText="address" popover={<Text style={{ color: "#fff", }}> Lokhandwala, Andheri West Mumbai.</Text>}>
                                            <Text numberOfLines = {1} style={styles.emptripdata}> : Lokhandwala, Andheri West Mumbai. </Text>
                                        </Tooltip>
                                        
                                        <Tooltip width={200} height={100} withOverlay = {true} backgroundColor = {"#9151f0"} tooltipText="address" popover={<Text style={{ color: "#fff", }}> Fri 03 Jan 20, 10:00 AM</Text>}>
                                            <Text numberOfLines = {1} style={styles.emptripdata}> : Fri 03 Jan 20, 10:00 AM </Text>
                                        </Tooltip>
                                        
                                        <Tooltip width={200} height={100} withOverlay = {true} backgroundColor = {"#9151f0"} tooltipText="address" popover={<Text style={{ color: "#fff", }}> Sun 05 Jan 20, 11:00 PM</Text>}>
                                            <Text numberOfLines = {1} style={styles.emptripdata}> : Sun 05 Jan 20, 11:00 PM </Text>
                                        </Tooltip>
                                    </View>
                                </View>
                                <View style={styles.emp}>
                                    <Text style={styles.Empdetailtitile}>Car Details </Text>
                                </View>
                                <View style={styles.cardetails}>

                                    <Text style={styles.empidsdata}>Sedan  |</Text>
                                    <Text style={styles.empidsdata}>4+1 | </Text>
                                    <Text style={styles.empidsdata}>AC </Text>
                                </View>
                                <View style={styles.emp}>
                                    <Text style={styles.Empdetailtitile}>Estimated Cost </Text>
                                </View>
                                <View style={styles.Estcost}>
                                    <View style={styles.Estcost}>
                                        <View style={styles.empest}>
                                            {/* <Text style={styles.empids}>Rate  </Text>
                                            <Text style={styles.empids}>Est. Distance  </Text> */}
                                            <Text style={styles.empids}>Est. Cost  </Text>
                                        </View>
                                        <View style={styles.empestdata}>
                                            {/* <Text style={styles.empidsdata}> : 14/KM </Text>
                                            <Text style={styles.empidsdata}> : 500 KM </Text> */}
                                            <Text style={styles.empidsdata}> : Rs. 7000/-</Text>
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
                                <TouchableOpacity onPress={() => { this.props.navigation.navigate('Carbooking') }} >
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
                                </TouchableOpacity> 
                            </Card>
                        </ ScrollView >
                    </View>
                </ScrollView>
                <Modal isVisible={this.state.bookedtrip}
                    onBackdropPress={() => this.setState({ bookedtrip: false })}
                    coverScreen={true}
                    hideModalContentWhileAnimating={true}
                    style={{ paddingHorizontal: '5%', zIndex: 999 }}
                    animationOutTiming={500}>
                    <View style={{ backgroundColor: "#fff", alignItems: 'center', borderRadius: 20, paddingVertical: 30, paddingHorizontal: 10 }}>
                        <View style={{ justifyContent: 'center', backgroundColor: "#34be34", width: 60, height: 60, borderRadius: 30, overflow: 'hidden' }}>
                            <Icon size={30} name='check' type='fontAwesome5' color='#fff' style={{}} />
                        </View>
                        <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 16, textAlign: 'center', justifyContent: 'center', marginTop: 20 }}>
                            Your booking is submitted. After Manager approval, system will send you car & driver details.
                        </Text>
                        <View style={{ width: '100%', marginTop: 15, paddingHorizontal: '10%' }}>
                            <Button
                            // onPress={this.showmecars()}
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
