import React, { Component } from 'react';
import {
    Text, View, Image, AsyncStorage,
    TouchableOpacity, FlatList,
} from 'react-native';
import axios from "axios";
import { Header, Icon, Card, Button } from 'react-native-elements';
import styles from './style.js';
import moment from 'moment';
import { NavigationActions, StackActions } from 'react-navigation';
import ValidationComponent from "react-native-form-validator";
import { withNavigation } from 'react-navigation';
import TimeAgo from 'react-native-timeago';

class NewBookings extends ValidationComponent {
    navigateScreen = (route) => {
        const navigateAction = StackActions.push({
            routeName: route,
            params: {},
            action: NavigationActions.navigate({ routeName: route }),
        });
        this.props.navigation.dispatch(navigateAction);
    }
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        AsyncStorage.multiGet(['token', 'user_id'])
            .then((data) => {
                user_id = data[1][1],
                    axios.get('/api/users/get/' + user_id)
                        .then((response) => {
                            const emailid = response.data.email;
                            axios.get("/api/personmaster/get/emailID/" + emailid)
                                .then((response) => {
                                    const managerId = response.data.data[0]._id
                                    // axios.get("/api/bookingmaster/get/allBooking/" + mangerId)
                                    //     .then((response) => {
                                    //         this.setState({ tripdetailswithstatus: response.data })
                                    //     })
                                    //     .catch((error) => { })

                                    let bookingdata ={
                                                managerId : managerId,
                                                status : "New"
                                            }
                                            console.log("response.bookingdata",bookingdata);
                                            axios.post('/api/bookingmaster/get/allBookingForManager',bookingdata)
                                                .then((response)=>{
                                                    console.log("response.allBookingForManager",response.data);
                                                    this.setState({
                                                        tripdetailswithstatus : response.data
                                                    })
                                                })
                                                .catch((error)=>{console.log('error: ',error)})

                                })
                                .catch((error) => { console.log("error", error); })
                        })
                        .catch((error) => { })
            });

    }
    bookingdetails(bookingid) {
        console.log("bookingid==>", bookingid);
        this.props.navigation.navigate("ApprovalForm", { bookingid: bookingid });
    }
    _renderlistofcars = ({ item, index }) => {
        const timestamp = item.createdAt;
        return (
            <Card key={index} containerStyle={[styles.sliderView]}>
                <TouchableOpacity onPress={() => { this.bookingdetails({ bookingid: item._id }) }} >
                    <View style={styles.carprice}>
                        <Text style={styles.itemprice}><TimeAgo time={timestamp} hideAgo={true} /> Ago</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 2, paddingVertical: 2 }}>
                        <View style={{ flex: 0.2, paddingHorizontal: 5, paddingVertical: 5, borderRightWidth: 1, borderStyle: "dotted" }}>
                            <View style={{ height: 50, }}>
                                <Image
                                    source={require('../../../images/user.jpg')}
                                    style={[styles.logoImage]}
                                    imageStyle={{ borderRadius: 100 }}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 0.6, paddingHorizontal: 5, paddingVertical: 5, borderRightWidth: 1, borderStyle: 'dotted', borderRightColor: '#333' }}>
                            <View style={{ marginBottom: 0 }}>
                                <Text style={{ fontFamily: 'Montserrat-SemiBold', color: '#666', fontSize: 13 }}>Booking ID: {item.bookingId} </Text>
                                <Text style={{ fontFamily: 'Montserrat-SemiBold', color: '#666', fontSize: 13 }}>{item.person[0].firstName} {item.person[0].lastName}({item.person[0].employeeId})</Text>
                                <Text style={{ fontFamily: "Montserrat-SemiBold", color: '#666', fontSize: 13 }}>{item.from.city} to {item.to.city}   </Text>
                                <Text style={{ fontFamily: "Montserrat-SemiBold", color: '#666', fontSize: 13 }}>{moment(item.pickupDate).format('DD MMM YY')} to {moment(item.returnDate).format('DD MMM YY')}  </Text>
                            </View>

                        </View>
                        <View style={{ flex: 0.3, paddingHorizontal: 5, paddingVertical: 5 }}>
                            <Text style={{ fontFamily: 'Montserrat-SemiBold', color: '#666', fontSize: 12 }}>Estimated Cost</Text>
                            <Text style={{ fontFamily: 'Montserrat-SemiBold', color: '#666', fontSize: 12 }}>Rs {item.estimatedCost}</Text>
                            <Text style={{ fontFamily: 'Montserrat-SemiBold', color: '#666', fontSize: 12 }}>Premium Car</Text>
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
                <View style={{ flex: 1, borderWidth: 0, padding: 0, }}>
                    {
                        this.state.tripdetailswithstatus == "" ?
                            <View style={{ flex: 0.3, paddingHorizontal: 5, paddingVertical: 5 }}>
                                <Text style={{ fontFamily: 'Montserrat-SemiBold', textAlign: "center", color: '#666', fontSize: 20 }}>No Bookings found</Text>
                            </View>
                            :
                            <FlatList
                                data={this.state.tripdetailswithstatus}
                                showsVerticalScrollIndicator={false}
                                renderItem={this._renderlistofcars}
                            />
                    }

                </View>
            </React.Fragment>
        );

    }
}
export default withNavigation(NewBookings);


// import React, { Component } from 'react';
// import {
//     ScrollView,
//     Text,
//     View,
//     Dimensions,ImageBackground,
//     TouchableOpacity, FlatList,Image,TouchableHighlight,
// } from 'react-native';
// import axios from "axios";
// import moment from 'moment';
// import { Header, Icon, Card, Button } from 'react-native-elements';
// import Carousel, { Pagination } from 'react-native-snap-carousel';
// import styles from './style.js';
// import ValidationComponent from "react-native-form-validator";
// // import BookingsTabView from '../BookingsTabView/BookingsTabView.js'
// import { withNavigation }                   from 'react-navigation';
// class ConfirmBookings extends ValidationComponent {
//     constructor(props) {
//         super(props);
//         this.state = {
//             imgarr: [
//                 { source: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?cs=srgb&dl=car-vehicle-automobile-range-rover-116675.jpg&fm=jpg", title: "Honda city", capacity: "4 + 1",rs: '14' },
//                 { source: "https://images.pexels.com/photos/1381816/pexels-photo-1381816.jpeg?cs=srgb&dl=white-and-black-mini-cooper-1381816.jpg&fm=jpg", title: "Hyundai Elantra", capacity: "3 + 1 ",rs: '16' },
//                 { source: "https://images.pexels.com/photos/898336/pexels-photo-898336.jpeg?cs=srgb&dl=blue-bmw-4-series-898336.jpg&fm=jpg", title: "Skoda Rapid", capacity: "3 + 1 ",rs: '14' },
//                 { source: "https://images.pexels.com/photos/1035108/pexels-photo-1035108.jpeg?cs=srgb&dl=photography-of-blue-wagon-audi-1035108.jpg&fm=jpg", title: "Hyundai Xcent", capacity: "3 + 1",rs: '12' },
//             ],
//         }

//     }
//     componentDidMount() {

//     }
//     bookingdetails(){
//         this.props.navigation.navigate("ApprovalForm");
//     }
//     _renderlistofcars = ({ item, index }) => {
//         return (
//             <Card key={index} containerStyle={[styles.sliderView]}>
//                 <View style={styles.daysago}>
//                     {/* <View style={styles.bookingdetails}>
//                         <Text style={styles.itemdetails}>Booking Details</Text>
//                     </View> */}
//                     <View style={styles.carprice}>
//                         <Text style={styles.itemprice}>{item.rs} Days Ago</Text>
//                     </View>
//                 </View>
//                 <TouchableOpacity  onPress={()=>{this.bookingdetails()}} >
//                     <View style={styles.carsbookings}>
//                         <Icon name='user' size={16}  type='font-awesome'/>
//                         <Text style={styles.itemtitlename}>Omkar Ronghe <Text style={styles.datetime}>(EmpId: 8888)</Text> </Text>
//                     </View>
//                     <View style={styles.carsbookings}>
//                         <Icon name='access-time' size={16}  type='MaterialIcons'/>
//                         <Text style={styles.datetime}>{moment(this.state.pickupDate).format('ddd')}, <Text style={styles.date}>{moment(new Date).format("DD-MM-YY")},</Text> { moment(this.state.pickupTime).format('LT') } </Text>
//                     </View>
//                     <View style={styles.carsbookings}>
//                         <Icon name='location-on' size={16}  type='MaterialIcons'/>
//                         <Text style={styles.picklocation}>Amanora Chambers,Magarpatta, Pune. </Text>
//                     </View>
//                     <View style={styles.carsbookings}>
//                         <Icon name='location-on' size={16}  type='MaterialIcons'/>
//                         <Text style={styles.picklocation}>Lokhandwala, Andheri West Mumbai. </Text>
//                     </View>
//                 </TouchableOpacity>
//             </Card>
//         );
//     }

//     render() {
//         const { navigation } = this.props;
//         return (
//             <React.Fragment>
//                 {/* <HeaderBar navigation={navigation} showBackBtn={true} headerName={"Confirm Bookings"} /> */}
//                 <View style={{ flex: 1, borderWidth: 0, padding: 0, }}>
//                     <FlatList
//                         data={this.state.imgarr}
//                         showsVerticalScrollIndicator={false}
//                         renderItem={this._renderlistofcars}      
//                     />

//                 </View>
//             </React.Fragment>
//         );

//     }
// }
// export default withNavigation(ConfirmBookings);