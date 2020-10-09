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
import styles                                                   from './styles.js';
import HeaderBar                                                from '../../layouts/Header/Header.js';
import { Header, Icon, Button  }                                from 'react-native-elements';
import UploadPic                                                from './UploadPic/UploadPic.js';
import EmployeeAddress                                          from './EmployeeAddress/EmployeeAddress.js';
import { TextField }                                            from 'react-native-material-textfield';
import {colors,sizes}                                           from '../../config/styles.js';
import FromLocation                                             from '../FromLocation/FromLocation.js'
import Geolocation                                              from 'react-native-geolocation-service';
import AsyncStorage                                             from '@react-native-community/async-storage';
import Loading                                                  from '../../layouts/Loading/Loading.js';
import { KeyboardAwareScrollView }                              from 'react-native-keyboard-aware-scroll-view';
import { TabView, SceneMap }                                    from 'react-native-tab-view';
import EmployeeProfileTabView                                   from './EmployeeProfileTabView/EmployeeProfileTabView.js'
import { connect }                                              from 'react-redux';

class EmployeeProfileView extends React.Component {
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
  }


  render(){
      const { navigation } = this.props;
      const { navigate } = this.props.navigation;

      return(
        <React.Fragment>
          <HeaderBar navigation={navigation} showBackBtn={true} headerName={"My Profile"}/>  
          <ImageBackground source={{}}  style={styles.container} resizeMode="cover" >
            <EmployeeProfileTabView navigation={navigation}/>  
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
      driverDetails : (userId) => dispatch({type:"DRIVER_DETAILS",
                            userId : userId,
      })
  }
};
export default connect(mapStateToProps,mapDispatchToProps)(EmployeeProfileView);