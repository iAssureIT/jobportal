import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Alert, Image, TouchableHighlight, TextInput
} from 'react-native';
import { connect } from 'react-redux';
import axios from "axios";
import { Header, Icon, Card, Button } from 'react-native-elements';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import styles from './style.js';
import HeaderBar from '../../../layouts/EmployeeHeader/Header.js';
import ValidationComponent from "react-native-form-validator";
import Modal from "react-native-modal";
import Textarea from 'react-native-textarea';


const { width, height } = Dimensions.get("window");
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp(percentage) {
    const value = (percentage * viewportWidth) / 140;
    return Math.round(value);
}
const slideWidth = wp(90);
const itemHorizontalMargin = wp(8);
export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 1;

class Carshow extends ValidationComponent {
    constructor(props) {
        super(props);
        this.state = {
            carmodelbook: '',
            purposeofcar: '',
            selectedindex: '',
            selectedVehicle: '',
            imgarr: [
                { source: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?cs=srgb&dl=car-vehicle-automobile-range-rover-116675.jpg&fm=jpg", title: "PREMIUM", capacity: "4 + 1" },
                { source: "https://images.pexels.com/photos/1381816/pexels-photo-1381816.jpeg?cs=srgb&dl=white-and-black-mini-cooper-1381816.jpg&fm=jpg", title: "MINI", capacity: "3 + 1 " },
                { source: "https://images.pexels.com/photos/898336/pexels-photo-898336.jpeg?cs=srgb&dl=blue-bmw-4-series-898336.jpg&fm=jpg", title: "SEDAN", capacity: "3 + 1 " },
                { source: "https://images.pexels.com/photos/1035108/pexels-photo-1035108.jpeg?cs=srgb&dl=photography-of-blue-wagon-audi-1035108.jpg&fm=jpg", title: "SUV", capacity: "3 + 1" },

            ],
        }
    }
    componentDidMount() {
        this.getVehicle();
    }
    carreceipt(item,id,index) {
        if (item == "SUV" || item == "Premium" || item == "Luxury") {
            this.setState({ carmodel: true });
        }
        var vehicleCategoryId = id;
        var selectedindex = index;
        console.log("selectedindex==",selectedindex);
        this.setState({
             selectedVehicle: item ,
             selectedindex:selectedindex,
             purposeofcar : this.state.purposeofcar,
             vehicleCategoryId:vehicleCategoryId 
            });
        this.props.vehicals(item,id)  
    }
    getVehicle() {
        axios.get("/api/categorymaster/get/list")
            .then((response) => {
                this.setState({
                    vehicleDetails: response.data
                })
            })
            .catch((error) => {
            })
    }

    _renderItemWithParallax = ({ item, index }) => {
        
        return (
            <ScrollView>
            <Card key={index}
            containerStyle={[(
                this.state.selectedindex === index ?
                    styles.sliderViews
                :
                    styles.sliderView
                )]}
            //  containerStyle={[styles.sliderView]}
              >
                <TouchableOpacity onPress={() => { this.carreceipt(item.category,id=item._id,index) }} value={this.state.carmodelbook} >
                    <View style={styles.carouselpage}>
                        <View style={styles.carouselpageTitle}>
                            <Text style={styles.carnametxt}> {item.category}</Text>
                        </View>
                        {/* <View style={styles.seat}>
                            <Text style={styles.seatcapacity}>{item.capacity}</Text>
                        </View> */}
                    </View>
                    <View style={styles.img}>
                        {
                            item ?
                                <Image
                                    style={{ width: "100%", height: 100, }}
                                    source={({ uri: item.iconUrl })}
                                />
                                :
                                <Image
                                    style={{ width: "100%", height: 100, }}
                                    source={require('../../../images/creta.png')}
                                />
                        }
                    </View>
                </TouchableOpacity>
            </Card>
                    
        </ScrollView>
        );
    }
    render() {
        const { navigation } = this.props;
        return (
            <React.Fragment>
                <Carousel
                    ref={c => this._slider1Ref = c}
                    data={this.state.vehicleDetails}
                    renderItem={this._renderItemWithParallax}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    firstItem={2}
                    inactiveDotColor = {this.state.selectedVehicle}
                    inactiveSlideScale={100}
                    inactiveSlideOpacity={0.9}
                    loop={true}
                />  
                <Modal isVisible={this.state.carmodel}
                    onBackdropPress={() => this.setState({ carmodel: false })}
                    coverScreen={true}
                    hideModalContentWhileAnimating={true}
                    style={{ paddingHorizontal: '5%', zIndex: 999 }}
                    animationOutTiming={500}>
                    <View style={{ backgroundColor: "#fff", alignItems: 'center', borderRadius: 20, paddingVertical: 30, paddingHorizontal: 10 }}>
                        <Text style={styles.txtnote}>
                            You are selecting a car type which is not allowed for your role. But if you want to book this, please specify.
                        </Text>
                        <Textarea
                            containerStyle={styles.textareaContainer}
                            style={styles.textarea}
                            onChangeText = {(purposeofcar) => {this.setState({ purposeofcar })}}
                            defaultValue={this.state.text}
                            maxLength={120}
                            value = {this.state.purposeofcar}
                            placeholder={'Specify the Purpose'}
                            placeholderTextColor={'#c7c7c7'}
                        />
                        <View style={{ width: '100%', marginTop: 15, paddingHorizontal: '10%' }}>
                            <Button
                                onPress={() => this.setState({ carmodel: false,purposeofcar:this.state.purposeofcar })}
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
        selectedVehicle: state.selectedVehicle ,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        vehicals: (selectedVehicle,vehicleCategoryId) => dispatch({
            selectedVehicle: selectedVehicle ,
            vehicleCategoryId: vehicleCategoryId ,
            type : "SELECTED_VEHICLE",
        }),
    }
};

export default connect (mapStateToProps, mapDispatchToProps)(Carshow);
