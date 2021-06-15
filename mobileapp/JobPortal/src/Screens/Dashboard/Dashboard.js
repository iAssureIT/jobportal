import React, { useState,useEffect }from 'react';
import {ScrollView,View,Text,FlatList, TouchableOpacity,Keyboard}       from 'react-native';
import { Header, Button, 
        Icon, SearchBar,Image}           from "react-native-elements";
import SideMenu                     from 'react-native-side-menu';
import AsyncStorage                 from '@react-native-async-storage/async-storage';
import axios                        from "axios";
import Highlighter                  from 'react-native-highlight-words';
import { useIsFocused }             from "@react-navigation/native";
import {Menu}                       from '../../ScreenComponents/Menu/Menu.js';
import HeaderBar2                   from '../../ScreenComponents/HeaderBar2/HeaderBar2.js';
import Notification                 from '../../ScreenComponents/Notification/Notification.js'
import { connect,useDispatch,useSelector }      from 'react-redux';
import styles                       from '../../AppDesigns/currentApp/styles/ScreenStyles/Dashboardstyles.js';
import {colors}                     from '../../AppDesigns/currentApp/styles/styles.js';
import Loading                      from '../../ScreenComponents/Loading/Loading.js';
// import { useNavigation }           from '@react-navigation/native';
// 
import {withCustomerToaster}        from '../../redux/AppState.js';

// import { getWishList } 		          from '../../redux/wishDetails/actions';


import { SET_SEARCH_CALL,SET_SEARCH_TEXT,SET_SUGGETION_LIST,SET_SERACH_LIST} 	        from '../../redux/globalSearch/types';



export const Dashboard = withCustomerToaster((props)=>{
 
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  // const navigation = useNavigation();
  const {setToast,navigation} = props; 
  // 
  const [isOpen,setOpen]= useState(false);

  const [user_id,setUserId]= useState('');
  
  const [token,setToken]= useState('');


  const menu = <Menu navigate={navigation.navigate} isOpen={isOpen}/>;

    return (
      <React.Fragment>
       
         <HeaderBar2 
            navigation={navigation}
            toggle={setOpen} 
            openControlPanel={()=>_drawer.open()}
          /> 

          <Text style={{textAlign:"center",marginTop:"20%",fontSize:40,color:'#f5a721',fontFamily:"Montserrat-SemiBold",}}> Dashboard is in under construction</Text>
          <View style={{padding:"25%",}}>
            <Image
              style={{ width: 200, height: 200, marginBottom: 15 }}
              source={require('../../AppDesigns/currentApp/images/comingSoon.jpeg')}
            />
          </View>
         
      </React.Fragment>
    );  
})