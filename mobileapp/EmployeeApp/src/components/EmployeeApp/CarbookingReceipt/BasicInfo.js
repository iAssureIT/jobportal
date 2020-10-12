import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    View,
} from 'react-native';
import Modal from "react-native-modal";
import axios from "axios";
import Tooltip from 'rn-tooltip';
import moment from 'moment';
import { connect } from 'react-redux';
import { Header, Icon, Card } from 'react-native-elements';
import styles from './styles.js';
import ValidationComponent from "react-native-form-validator";

class BasicInfo extends ValidationComponent {
    constructor(props) {
        super(props);
        this.state = {
            bookedtrip : '',
            bookingdetails : [],
            bookingID : "",
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
                console.log('response ==>', bookingdetails.intermediateStops);
                const bookingdets = bookingdetails.intermediateStops
                let  intermid=[];
                for(var i=0;i<bookingdetails.intermediateStops.length;i++){
                    intermid.push({
                      'address':  bookingdets[i].address,
                      'area':  bookingdets[i].area,
                      'city':  bookingdets[i].city,
                      'country':  bookingdets[i].country,
                    });
                  }
                this.setState({
                    bookingdetails : bookingdetails,
                    intermid:  intermid,
                })
            })
        .catch((error)=>{console.log('error: ',error)})
    }

    render() {
        // this.receiptdata();
        console.log("this.bookingId",this.props.bookingId);
        const { navigation } = this.props;
        return (
            <React.Fragment>
                
                <ScrollView >
                    <View style={styles.carouselpage}>
                        <ScrollView style={styles.carouselhead} >
                            <Card containerStyle={[styles.sliderView]}>
                                <View style={styles.seat}>
                                    <Text style={styles.Bookingdate}> Booking Date: {moment().format('DD-MM-YY')} </Text>
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
                                        <Text style={styles.empdetailsdata}> : {this.props.employeeId} </Text>
                                        <Text style={styles.empdetailsdata}> : Mr. {this.props.fullName} </Text>
                                        <Text style={styles.empdetailsdata}> : +91 {this.props.mobile} </Text>
                                    </View>
                                </View>
                                <View style={styles.emp}>
                                    <Text style={styles.Empdetailtitile}>Trip Details </Text>
                                </View>
                                <View style={styles.emptripdetials}>
                                    <View style={styles.tripdets}>
                                        <Text style={styles.emptrip}>From Location  </Text>
                                        <Text style={styles.emptrip}>To Location  </Text>
                                        <Text style={styles.emptrip}>From Date Time  </Text>
                                        <Text style={styles.emptrip}>To Date Time  </Text>
                                    </View>
                                    
                                    <View style={styles.tripdetsdata}>
                                        <Tooltip width={200} height={100} withOverlay = {true}  backgroundColor = {"#9151f0"} tooltipText="address" popover={<Text style={{ color: "#fff", }}> { this.state.bookingdetails && this.state.bookingdetails.from ? this.state.bookingdetails.from.address : null }</Text>}>
                                            <Text numberOfLines = {1} style={styles.emptripdata}> : { this.state.bookingdetails && this.state.bookingdetails.from ? this.state.bookingdetails.from.address : null }</Text>
                                        </Tooltip>
                                        
                                        <Tooltip width={200} height={100} withOverlay = {true} backgroundColor = {"#9151f0"} tooltipText="address" popover={<Text style={{ color: "#fff", }}> {this.state.bookingdetails && this.state.bookingdetails.to ? this.state.bookingdetails.to.address : null }</Text>}>
                                            <Text numberOfLines = {1} style={styles.emptripdata}> : {this.state.bookingdetails && this.state.bookingdetails.to ? this.state.bookingdetails.to.address : null }</Text>
                                        </Tooltip>
                                        
                                        <Tooltip width={200} height={100} withOverlay = {true} backgroundColor = {"#9151f0"} tooltipText="address" popover={<Text style={{ color: "#fff", }}> </Text>}>
                                            <Text numberOfLines = {1} style={styles.emptripdata}> : {this.state.bookingdetails ?  moment(this.state.bookingdetails.pickupDate).format('DD-MM-YY') : null}   {moment(this.state.bookingdetails.pickupTime).format('LT')} </Text>
                                        </Tooltip>
                                        
                                        <Tooltip width={200} height={100} withOverlay = {true} backgroundColor = {"#9151f0"} tooltipText="address" popover={<Text style={{ color: "#fff", }}> </Text>}>
                                            <Text numberOfLines = {1} style={styles.emptripdata}> : {this.state.bookingdetails ?  moment(this.state.bookingdetails.returnDate).format('DD-MM-YY'): null}  {moment(this.state.bookingdetails.returnTime).format('LT')} </Text>
                                        </Tooltip>
                                    </View>
                                </View>

                                <View style={styles.emp}>
                                    <Text style={styles.Empdetailtitile}>Intermediate Stops </Text>
                                </View>
                                <View style={styles.intermidiate}>
                                    
                                    <View >
                                        
                                            {/* <Text numberOfLines = {1} style={styles.emptripdata}> : { this.state.address} {this.state.city }  </Text> */}
                                        {                        
                                            this.state.intermid && this.state.intermid.length > 0 ?
                                                this.state.intermid.map((data, index) => {
                                                    return (
                                                        <Text numberOfLines = {1} style={styles.emptripdata}> {data.address}{data.city}  </Text> 
                                                    )
                                                })
                                            :
                                            null
                                        }
                                    </View>
                                </View>
                            
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
export default connect(mapStateToProps)(BasicInfo);