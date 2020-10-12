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
          FlatList,
          RefreshControl
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
import Geolocation                                              from 'react-native-geolocation-service';
import axios                                                    from 'axios';
import HeaderBar                                                from '../../layouts/Header/Header.js';
import styles                                                   from './styles.js';
import {colors,sizes}                                           from '../../config/styles.js';
import Dialog                               from "react-native-dialog";
import LocationRoute                        from '../LocationRoute/LocationRoute.js'
import moment                               from 'moment';
import { Header, Icon  }                    from 'react-native-elements';
import AsyncStorage                         from '@react-native-community/async-storage';
import Loading                              from '../../layouts/Loading/Loading.js';
import { connect }                          from 'react-redux';
import MonthSelectorCalendar                from 'react-native-month-selector';
const window = Dimensions.get('window');
const haversine = require('haversine');


const monthNames  = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const d           = new Date();
const monthNumber = d.getMonth();
    
class MyTravelHistory extends React.Component {
 navigateScreen=(route)=>{
      const navigateAction = NavigationActions.navigate({
      routeName: route,
      params: {},
      action: NavigationActions.navigate({ routeName: route }),
    });
    this.props.navigation.dispatch(navigateAction);
  }


constructor(props) {
  
  var month       = monthNames[monthNumber];   
  var year        = d.getFullYear();   

  super(props);
      this.state  = {
        openModal :false,
        date      : new Date(),
        myHistory :[],
        month     : month,
        year      : year,
        monthNow  : month,
        yearNow  : year,
        monthYear : month+" "+year,
        monthNumber:monthNumber,
    };
  }

  componentDidMount(){ 
       AsyncStorage.multiGet(['user_id','tracking_id'])
      .then((data)=>{
        console.log('user Data in menu==>',data[0][1])         
         userId = data[0][1],
         tracking_id = data[1][1]
          this.setState({
            userId : userId,
            tracking_id : tracking_id
         },()=>{
            axios
            .get('/api/tracking/get/daywiseLocationDetails/'+this.state.userId)
              .then((myHistory)=>{
                console.log("myHistory",myHistory.data);
                  this.setState({
                   myHistory   : myHistory.data
                 });
              })
              .catch(error=>{
                console.log("error=>",error)
              })
         })
      })   
    
  }

  priviousDate(prev){
    var { month, year, monthNumber } = this.state;
    console.log("monthNumber",monthNumber);
    if(monthNumber > 0){
      this.setState({
        month     : monthNames[monthNumber-1],
        monthYear : monthNames[monthNumber-1]+" "+year,
        monthNumber:monthNumber-1,
      })
    }else{
     this.setState({
        month     : monthNames[monthNumber+11],
        year      : year-1,
        monthYear : monthNames[monthNumber+11]+" "+(year-1),
        monthNumber: monthNumber+11,

      })
    }
  }

  nextDate(next){
    var { month, year, monthNumber,monthNow, yearNow } = this.state;
    console.log("yearNow",yearNow);
    console.log("year",year);
    if(monthNumber < 11){
      if(monthNames[monthNumber] !== monthNow || yearNow !== year ){
          this.setState({
          month     : monthNames[monthNumber+1],
          monthYear : monthNames[monthNumber+1]+" "+year,
          monthNumber: monthNumber+1,
        })
      }
      
    }else{
     this.setState({
        month     : monthNames[monthNumber-11],
        year      : year+1,
        monthYear : monthNames[monthNumber-11]+" "+(year+1),
        monthNumber: monthNumber-11,

      })
    }
  }

 handleCancel = () => {
    this.setState({
      openModal      : false,
    });
  };

  msToTime(duration){
    var milliseconds = parseInt((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
  }

   _renderItem = ({item,index}) => (
      <TouchableOpacity style={styles.historyBox} key={index} onPress={()=>{this.getData(item._id)}}>
       <View style={styles.historyBoxLeft}>
          <Text style={styles.dateText}>{moment(item.createdAt).format('DD')}</Text>
          <Text style={styles.dateText}>{moment(item.createdAt).format('MMMM')}</Text>
        </View>
        <View style={styles.historyBoxRight}>
           <View style={styles.historyDetail}>
              <Text style={styles.historyText}>Total Time : </Text>
              <Text style={styles.historyText}>{item.totalTime ? this.msToTime(item.totalTime) : "00:00:00"}</Text>
            </View> 
            <View style={styles.historyDetail}>
              <Text style={styles.historyText}>Total Distance : </Text>
              {item.totalDistanceTravelled ?
                <Text style={styles.historyText}>{item.totalDistanceTravelled}</Text>
                :
                <Text style={styles.historyText}>0 Km</Text>
              }  
            </View> 
        </View>
     </TouchableOpacity>
  );

   onRefresh() {
    this.setState({refresh: true});
    setTimeout(() => {
      this.setState({refresh: false});
    }, 2000);
  }

  getData(locationId){
    this.props.Tracking_id(locationId);
    this.props.navigation.navigate('LocationDetails')
  }

  render(){
    console.log("monthYear",this.state.monthYear);
    const { navigation } = this.props;
    const { myHistory } = this.state;
      return(
          <React.Fragment>
          
           <ImageBackground source={{}}  style={styles.container} resizeMode="cover" >
            <HeaderBar navigation={navigation} showBackBtn={true} headerName={"My Travel History"}/>  
              <View style={{flexDirection:"row",justifyContent:"center",marginTop:30}}>
                <TouchableOpacity style={{alignItems:"center",justifyContent:"flex-start",flex:0.3}} onPress={this.priviousDate.bind(this)}>
                  <Icon size={40} name='chevrons-left' type='feather' color='#333' />
                </TouchableOpacity>
                <View style={{alignItems:"center",justifyContent:"center",flex:0.4}}>
                  <Text>
                    {this.state.monthYear}
                  </Text>               
               </View>
                <TouchableOpacity style={{alignItems:"center",justifyContent:"flex-end",flex:0.3}} onPress={this.nextDate.bind(this)}>
                  <Icon size={40} name='chevrons-right' type='feather' color='#333' />
                </TouchableOpacity>
                
              </View>
              <View>  
                {myHistory!=="" ?
                <View style={styles.myHistory} >
                    <FlatList
                      data={this.state.myHistory}
                      renderItem={this._renderItem}
                      showsVerticalScrollIndicator={false}
                      refreshControl={
                        <RefreshControl
                          refreshing={this.state.refresh}
                          onRefresh={() => this.onRefresh()}
                        />
                      }
                    />
                </View>   
                :
                <Loading />
              }
            </View>
          </ImageBackground>
          <Dialog.Container visible={this.state.openModal}>
              <LocationRoute trackingDetails={this.state.trackingDetails}/>
              <Dialog.Button label="Ok" onPress={this.handleCancel} />
           </Dialog.Container>
        </React.Fragment>  
      );
  }

}

const mapStateToProps = (state)=>{
  return {
    tracking_id             : state.tracking_id,
  }
  
};
const mapDispatchToProps = (dispatch)=>{
  return {
      Tracking_id  : (tracking_id)=> dispatch({type: "TRACKING_ID",
                             tracking_id:tracking_id,
                  }),
  }
};
export default connect(mapStateToProps,mapDispatchToProps)(MyTravelHistory);