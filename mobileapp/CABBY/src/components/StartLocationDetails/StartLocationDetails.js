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
          Button
        } from 'react-native';

import { NavigationActions,StackActions, withNavigationFocus }  from 'react-navigation';
import { request,check,PERMISSIONS,RESULTS }                    from 'react-native-permissions';
import Geolocation                                              from 'react-native-geolocation-service';
import axios                                                    from 'axios';
import { Dropdown }                                             from 'react-native-material-dropdown';
import styles                               from './styles.js';
import {colors,sizes}                       from '../../config/styles.js';
import Geocoder                             from 'react-native-geocoding';
import moment                               from 'moment';
import FromLocation                         from '../FromLocation/FromLocation.js'
import CurrentTime                          from '../CurrentTime/CurrentTime.js'
import HeaderBar                            from '../../layouts/Header/Header.js';
import { Header, Icon  }                    from 'react-native-elements';
import Dialog                               from "react-native-dialog";
import AsyncStorage                         from '@react-native-community/async-storage';
import LocationRoute                        from '../LocationRoute/LocationRoute.js';
import Loading                              from '../../layouts/Loading/Loading.js';
import MapView, 
        { PROVIDER_GOOGLE, 
          Polyline, 
          Marker, 
          AnimatedRegion, 
          Animated 
        } from 'react-native-maps';
import { connect }                           from 'react-redux';
import {accelerometer, gyroscope, setUpdateIntervalForType, SensorTypes} from "react-native-sensors";
import { range } from 'rxjs';
import { map, filter } from 'rxjs/operators';


const window     = Dimensions.get('window');
const haversine = require('haversine')
var idVar       = 0; 


class StartLocationDetails extends React.Component {
 navigateScreen=(route)=>{
      const navigateAction = NavigationActions.navigate({
      routeName: route,
      params: {},
      action: NavigationActions.navigate({ routeName: route }),
    });
    this.props.navigation.dispatch(navigateAction);
  }


constructor(props) {
  super(props);

    this.state = {
      startDetails      : "",
      openModal         : false,
      routeCoordinates  : [],
      tempRouteCoordinates  : [],
      coordinate:new AnimatedRegion({
        latitude: 18.5182404,
        longitude: 73.9368982,
        latitudeDelta: 0.04864195044303443*4,
        longitudeDelta: 0.040142817690068*4
      }),
      x:0,
      y:0,
      z:0,
    };

   
    AsyncStorage.multiGet(['user_id','token'])
    .then((data)=>{
      console.log("data app",data);
      this.setState({
        user_id : data[0][1],
        token  : data[1][1],
      })
    })
  } //constructor ends



  componentDidMount(){

    this.focusListener = this.props.navigation.addListener('didFocus', () => {

    var routeCoordinates = this.state.routeCoordinates;
    
    routeCoordinates.push(
                        {
                          latitude          : this.props.latitude,
                          longitude         : this.props.longitude,
                          distanceTravelled : 0
                        },
                    );

      this.setState({
          routeCoordinates  : routeCoordinates,
          tracking_id       : this.props.tracking_id, 
          latitude          : this.props.latitude,
          longitude         : this.props.longitude,           
          coordinate        : new AnimatedRegion({
            latitude          : this.props.latitude,
            longitude         : this.props.longitude,  
            latitudeDelta     : 0.04864195044303443*4,
            longitudeDelta    : 0.040142817690068*4
          }),
      },()=>{
         axios
          .get('/api/tracking/get/startDetails/'+this.props.tracking_id)
            .then((startDetails)=>{
              this.setState({startDetails:startDetails.data})
            })
          .catch(error=>{
            console.log("error=>",error)
          })
      }); 

      setUpdateIntervalForType(SensorTypes.accelerometer, 1000);
      const subscription = accelerometer.subscribe(({ x, y, z, timestamp }) =>{
        if (Math.atan2(y, x) >= 0) {
          angle = Math.atan2(y, x) * (180 / Math.PI);
        }
        else {
          angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
        }
        console.log("angle",Math.round(angle));
        console.log("direction",this._direction(Math.round(angle)));
        // if(z > 9){
        //   console.log("Inside z")
        //   if(x > 1 || 1 > 3 || x < -1 || y <-1){
        //     this.watchPosition();
        //     Alert.alert("function call from z > 9");
        //   }
           
        // }else{
        //   if(x > 3 || z > 3 || x < -3 || z <-3){
        //     this.watchPosition();
        //     Alert.alert("function call from y > 9");
        //   }
        // }
      });

      var that=this;      
        idVar =  setInterval(function(){
          that.watchPosition();
        }, 10000);
    })
  }

  _direction = (degree) => {
    if (degree >= 22.5 && degree < 67.5) {
      return 'NE';
    }
    else if (degree >= 67.5 && degree < 112.5) {
      return 'E';
    }
    else if (degree >= 112.5 && degree < 157.5) {
      return 'SE';
    }
    else if (degree >= 157.5 && degree < 202.5) {
      return 'S';
    }
    else if (degree >= 202.5 && degree < 247.5) {
      return 'SW';
    }
    else if (degree >= 247.5 && degree < 292.5) {
      return 'W';
    }
    else if (degree >= 292.5 && degree < 337.5) {
      return 'NW';
    }
    else {
      return 'N';
    }
  };



  componentWillUnmount () { 
    this.focusListener.remove()
  }

  watchPosition(){
    Geolocation.getCurrentPosition(position => {
      const { coordinate, routeCoordinates, tempRouteCoordinates } =   this.state;
      const prevLatLng = routeCoordinates[routeCoordinates.length-1]; 
      const newCoordinate = {
        latitude          : position.coords.latitude,
        longitude         : position.coords.longitude,
        distanceTravelled : this.calcDistance(prevLatLng, position.coords),
      };

      if (Platform.OS === "android") {
        if(this.marker) {
          this.marker._component.animateMarkerToCoordinate(
            newCoordinate,
            500
          );
        }
      }else{
        coordinate.timing(newCoordinate).start();
      }

      if(prevLatLng.longitude === newCoordinate.longitude && prevLatLng.latitude === prevLatLng.latitude){
        console.log("Same coordinate");
      }else{
        console.log("Different cordinate");
        var tempCoordinate = tempRouteCoordinates.concat(newCoordinate);
        if(tempCoordinate.length >= 5){
           console.log("axios call");
           this.setState({routeCoordinates:routeCoordinates.concat(tempCoordinate)});
           var locValues = {
            tracking_id       : this.props.tracking_id,
            routeCoordinates  : tempCoordinate,
          }
          axios
            .patch("/api/tracking/patch/routeCoordinates",locValues)
            .then((locResponse)=>{
              if(locResponse){
                this.setState({
                  tempRouteCoordinates:[],
                })
              }
            })
            .catch((error)=>{
              console.log("error = ",error.message);
            });
        }else{
          this.setState({
            tempRouteCoordinates:tempCoordinate,
          })
        }
      } 

    },
    (error) => {console.log(error.code, error.message)},
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  calcDistance(prevLatLng, newLatLng){
    var distTravelled = haversine(prevLatLng, newLatLng);
    return distTravelled;
  };

  getMapRegion = () => ({
      latitude: this.state.latitude ,
      longitude: this.state.longitude ,
      latitudeDelta: this.state.latitude/1000,
      longitudeDelta: this.state.longitude/1000, 
  });

  handleCancel = () => {
    this.setState({
     openModal      : false,
   });
  };

  openModal(){
    this.setState({
     openModal      : true,
   });
  };


  endTracking(){
    clearInterval(idVar);
    endTrackingValues={
      endDateAndTime : new Date(),
      tracking_id    : this.props.tracking_id,
    }
     axios
      .patch("/api/tracking/patch/endDetails",endTrackingValues)
      .then((locResponse)=>{
        if(locResponse){
            this.props.navigation.navigate('LocationDetails')
        }
      })
      .catch((error)=>{
        console.log("error = ",error.message);
      });
  };


  render(){
    const { navigation } = this.props;
    const { startDetails } =this.state;

      return(
        <React.Fragment>
          <ImageBackground source={{}}  style={styles.container} resizeMode="cover" >
            <HeaderBar navigation={navigation} showBackBtn={true} headerName={"Start Details"}/>  
            {startDetails!=="" &&  startDetails.startLocation? 
              <View style={{height:"90%",alignItems:"center",justifyContent:"center"}}>
                <CurrentTime />
                <View style={{height:60,width:"100%",paddingHorizontal:50}}>
                  <View style={{flexDirection:"row"}}>
                    <View style={{flex:0.85}}>
                        <View style={{flexDirection:"row"}}>
                          <Icon size={25} name='map-marker' type='font-awesome' color='#376bff' />
                          <Text style={{fontSize:20,color:"#376bff",paddingHorizontal:5}}>Started At</Text>
                        </View>  
                      <Text style={{fontSize:18}}>{moment(startDetails.startDateAndTime).format('LTS')+" From Location"}</Text>
                    </View> 
                  </View>
                </View> 
                <View style={{marginBottom:50}}>
                  <FromLocation coordinates={startDetails.startLocation} />
                </View>
                <TouchableOpacity onPress = {this.endTracking.bind(this)} style= {styles.startButton}>
                  <View style={{flex:0.6,alignItems:"flex-end"}}>
                    <Text style={{fontSize:25,color:"#fff",}}>END</Text>
                  </View> 
                  <View style={{flex:0.4}}>
                    <Icon size={40} name='stop-circle' type='font-awesome' color='#fff' />
                  </View>  
                </TouchableOpacity>
              </View> 
            :
            <Loading />
          } 
          </ImageBackground>
          <Dialog.Container visible={this.state.openModal}>
              <Dialog.Button label="Ok" onPress={this.handleCancel} />
            </Dialog.Container>
        </React.Fragment>  
    );
  }
}

const mapStateToProps = (state)=>{
  return {
    user_id       : state.user_id,
    tracking_id   : state.tracking_id,
    longitude     : state.longitude,
    latitude      : state.latitude,
  }
};
export default connect(mapStateToProps)(StartLocationDetails);