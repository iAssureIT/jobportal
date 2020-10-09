import React, { Component } from 'react';
import {
    ScrollView,Text,View,
    TouchableOpacity,Textarea,Button,Image, TextInput,
} from 'react-native';
import axios from "axios";
import { Header, Icon, Card } from 'react-native-elements';
import styles from './style.js';
import HeaderBar from '../../../layouts/Header/Header.js';
import ValidationComponent from "react-native-form-validator";
import Modal from "react-native-modal";
export default class EmployeeProfileEdit extends ValidationComponent {
    constructor(props) {
        super(props);
        this.state = {
            rejected    : "",
            approve     : "",
        }

    }

    componentDidMount() {

    }
    carreceipt(){

    }

    render() {
        const { navigation } = this.props;
        return (
            <React.Fragment>
                <View style={styles.overlay} />
                <HeaderBar navigation={navigation} showBackBtn={true} headerName={"Booking Status"} />
                <ScrollView >
                    <View style={styles.carouselpage}>
                        <ScrollView style={styles.carouselhead} >
                            {/* <View style={styles.headpageimg}> */}
                                {/* <Image
                                    style={{ width: "100%", height: 200, }}
                                    source={require('../../../images/hondacity.png')}
                                /> */}
                                {/* <Text style={styles.carname}> SEDAN </Text> */}
                            {/* </View> */}
                            <Card containerStyle={[styles.sliderView]}>

                                <View style={styles.img}>

                                </View>
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
                                        {/* <Text style={styles.empdetails}>Mobile  </Text> */}
                                    </View>
                                    <View style={styles.empdets}>
                                        <Text style={styles.empdetailsdata}> : 662775742 </Text>
                                        <Text style={styles.empdetailsdata}> : Mr. John Doe </Text>
                                        {/* <Text style={styles.empdetailsdata}> : +91 98223 26361 </Text> */}
                                    </View>
                                </View>
                                <View style={styles.emp}>
                                    <Text style={styles.Empdetailtitile}>Trip Details </Text>
                                </View>

                                <View style={styles.empdetials}>
                                    <View style={styles.tripdets}>

                                        <Text style={styles.emptrip}>From Location  </Text>
                                        <Text style={styles.emptrip}>To Location  </Text>
                                        <Text style={styles.emptrip}>From Datetime  </Text>
                                        <Text style={styles.emptrip}>To DateTime  </Text>
                                    </View>
                                    <View style={styles.tripdetsdata}>
                                        <Text numberOfLines={1} style={styles.emptripdata}> : Amanora Chambers,{"\n"}Magarpatta, Pune. </Text>
                                        <Text numberOfLines={1} style={styles.emptripdata}> : Lokhandwala, Andheri West Mumbai. </Text>
                                        <Text numberOfLines={1} style={styles.emptripdata}> : Fri 03 Jan 20, 10:00 AM </Text>
                                        <Text numberOfLines={1} style={styles.emptripdata}> : Sun 05 Jan 20, 11:00 PM </Text>
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
                                            <Text style={styles.empids}>Est. Cost  </Text>
                                        </View>
                                        <View style={styles.empestdata}>
                                            <Text style={styles.empidsdata}> : Rs. 7000/-</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.policy}>
                                    <Text style={styles.parking}>
                                        Toll & Parking Charges Separate
                                        visit our 
                                        <Text style={styles.policydetails}> 
                                            Cancelation Policy 
                                        </Text>
                                    </Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: "row" }}>

                                    <View style={{ flex: 0.5, paddingRight : 35}}>
                                        <TouchableOpacity value={this.state.rejected}>
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
                                    <View style={{ flex: 0.5,paddingLeft : 45}}>
                                        <TouchableOpacity value={this.state.approve} >
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
                                <View style={styles.writehere}>
                                <TextInput style = {styles.input}
                                    underlineColorAndroid = "transparent"
                                    placeholder = "Write Here"
                                    onChangeText = {this.handleEmail}/>
                                </View>
                                <TouchableOpacity onPress={() => { this.carreceipt() }} >
                                    <View style={styles.showcarbtn}>
                                        <View style={{ flex: 1, flexDirection: "row" }}>
                                            <View style={styles.btnimg}>
                                                <Image
                                                    source={require('../../../images/5.png')}
                                                />
                                            </View>
                                            <View style={{ flex: 1, }}>
                                                <Text style={styles.btntxt}>
                                                    Submit
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </Card>
                        </ ScrollView >
                    </View>
                </ScrollView>
                <Modal isVisible={this.state.carmodel}
                    onBackdropPress={() => this.setState({ carmodel: false })}
                    coverScreen={true}
                    hideModalContentWhileAnimating={true}
                    style={{ paddingHorizontal: '5%', zIndex: 999 }}
                    animationOutTiming={500}>
                    <View style={{ backgroundColor: "#fff", alignItems: 'center', borderRadius: 20, paddingVertical: 30, paddingHorizontal: 10 }}>
                        <Text style={styles.txtnote}>
                            Thank you approving this trip.
                        </Text>
                        <Textarea
                            containerStyle={styles.textareaContainer}
                            style={styles.textarea}
                            onChangeText={this.onChange}
                            defaultValue={this.state.text}
                            maxLength={120}
                            placeholder={'Specify the Purpose'}
                            placeholderTextColor={'#c7c7c7'}
                        />
                        <View style={{ width: '100%', marginTop: 15, paddingHorizontal: '10%' }}>
                            <Button
                            onPress={() => this.setState({ carmodel: false,  })}
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
