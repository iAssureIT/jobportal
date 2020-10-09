import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    View,
    Alert, Image, TouchableHighlight
} from 'react-native';
import axios from "axios";
import Tooltip from 'rn-tooltip';
import { Header, Icon,Card  } from 'react-native-elements';
import styles from './styles.js';
import HeaderBar from '../../../layouts/Header/Header.js';
import ValidationComponent from "react-native-form-validator";
export default class Carbookingpermission extends ValidationComponent {
    constructor(props) {
        super(props);
        this.state = {
           
        }
    }
    componentDidMount() {

    }
    handleSlideChange = (index) => {
        this.setState({ 'activeIndex': index });
    }
   
    render() {
        const { navigation } = this.props;
        return (
            <React.Fragment>
                {/* <HeaderBar navigation={navigation} showBackBtn={true} headerName={"Booking Status"} /> */}
                <View style={styles.overlay} />
                <HeaderBar navigation={navigation} showBackBtn={true} headerName={"Booking Status"} />
                
                <ScrollView >
                    <View style={styles.carouselpage}>
                    <ScrollView style={styles.carouselhead} >
                    <View style={styles.headpageimg}>
                    {/* <Image
                        style={{ width: "100%", height: 200, }}
                        source={require('../../../images/hondacity.png')}
                    /> */}
                    {/* <Text style={styles.carname}> SEDAN </Text> */}
                    </View>
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
                    {/* <Text style={styles.tripdetils}>Round Trip </Text> */}

                    <View style={styles.empdetials}>
                        <View style={styles.tripdets}>
                            <Text style={styles.emptrip}>From Location  </Text>
                            <Text style={styles.emptrip}>To Location  </Text>
                            <Text style={styles.emptrip}>From Datetime  </Text>
                            <Text style={styles.emptrip}>To DateTime  </Text>
                        </View>
                        <View style={styles.tripdetsdata}>
                            <Tooltip width={200} height={100} withOverlay = {true}  backgroundColor = {"#9151f0"} tooltipText="address" popover={<Text style={{ color: "#fff", }}> Amanora Chambers, Magarpatta, Pune.</Text>}>
                                <Text numberOfLines = {1} style={styles.emptripdata}> : Amanora Chambers,Magarpatta, Pune. </Text>
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
                    <View style={styles.Estcostnpolicy}>
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

                        <View style={styles.policy}>
                            <Text style={styles.parking}>
                                Toll & Parking Charges Separate
                                visit our 
                                <Text style={styles.policydetails}> Cancellation Policy </Text> 
                            </Text>
                        </View>
                    </View>
                    <View style={styles.emp}>
                        <Text style={styles.Empdetailtitile}>Manager Approval </Text>
                    </View>
                    <View style={styles.managerapproval}>
                        <View style={styles.status}>
                        {/* <Image
                            style={{ width: "100%", height: 110, }}
                            source={require('../../../images/approvedimg.png')}
                        />
                         <Text style={styles.empapp}>Approved</Text> */}
                        <Image
                            style={{ width: "70%", height: 80, marginTop : 20}}
                            source={require('../../../images/hourglass6.png')}
                        />
                        <Text style={styles.empapp}>Pending...</Text>
                        {/* <Image
                            style={{ width: "100%", height: 120, }}
                            source={require('../../../images/rejectedimg.png')}
                        /> */}
                        </View>
                        <View style={styles.appdate}>
                            <Text style={styles.empapp}> Approved On </Text>
                            <Text style={styles.empappdata}> 1/1/2020 3:30 PM </Text>
                            <Text style={styles.empapp}> Robert Forest</Text>
                            <Text style={styles.empappdata}> +91 99223 45678</Text>
                        </View>
                    </View>
                    {/* <View style={styles.emp}>
                        <Text style={styles.Empdetailtitile}>Deiver Detils </Text>
                    </View>
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
                    </View> */}
                    
                </Card>
            </ ScrollView >
                    </View>

                </ScrollView>
            </React.Fragment>
        );

    }
}
