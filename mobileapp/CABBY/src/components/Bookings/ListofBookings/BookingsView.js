import React from 'react';
import {  StyleSheet,
          ScrollView,
          View,
          Text,
          TouchableOpacity,
          Alert,
          ImageBackground,
          Image,
          Platform,
          Dimensions,
          TextInput
        } from 'react-native';


import  MapView, 
        { PROVIDER_GOOGLE, 
          Polyline, 
          Marker, 
          AnimatedRegion, 
          Animated 
        } from 'react-native-maps';

import { NavigationActions,StackActions, withNavigationFocus }  from 'react-navigation';
import { request,check,PERMISSIONS,RESULTS }                    from 'react-native-permissions';
import axios                                                    from 'axios';
import styles                                                   from './style.js';
import HeaderBar                                                from '../../../layouts/Header/Header.js';
import { Header, Icon, Button  }                                from 'react-native-elements';
import { TextField }                                            from 'react-native-material-textfield';
import {colors,sizes}                                           from '../../../config/styles.js';
import FromLocation                                             from '../../FromLocation/FromLocation.js'
import Geolocation                                              from 'react-native-geolocation-service';
import AsyncStorage                                             from '@react-native-community/async-storage';
import Loading                                                  from '../../../layouts/Loading/Loading.js';
import { KeyboardAwareScrollView }                              from 'react-native-keyboard-aware-scroll-view';
import { TabView, SceneMap }                                    from 'react-native-tab-view';
import BookingsTabView                                          from './BookingsTabView.js'
import { connect }                                              from 'react-redux';

class BookingsView extends React.Component {
constructor(props) {
  super(props);
      this.state = {
      openModal         : false,
      coordinate        : "",
      firstName          : "",
      lastName          : "",
      mobileNumber      : "",
      email             : "",
      userData          : ""
    };
    AsyncStorage.multiGet(['user_id','token'])
    .then((data)=>{
      this.props.bookingList(data[0][1]);
      this.setState({
        user_id : data[0][1],
        token  : data[1][1],
      })
    })
  }


  render(){
      const { navigation }  = this.props;
      const { navigate }    = this.props.navigation;
        return(
        <React.Fragment>
          <HeaderBar navigation={navigation} showBackBtn={false} headerName={"Bookings"}/>  
          <ImageBackground source={{}}  style={styles.container} resizeMode="cover" >
            <BookingsTabView navigation={navigation}/>  
          </ImageBackground>
        </React.Fragment>  
      );
  }

}

const mapStateToProps = (state)=>{
  return {
    user_id         : state.user_id,
    basicInfoTab    : state.basicInfoTab,
    EmpAddTab       : state.EmpAddTab,
    DocumentsTab    : state.DocumentsTab,
  }
};

const mapDispatchToProps = (dispatch)=>{
  return {
      bookingList : (userId) => dispatch({type:"BOOKING_LIST",
                            userId : userId,
      })
  }
};
export default connect(mapStateToProps,mapDispatchToProps)(BookingsView);