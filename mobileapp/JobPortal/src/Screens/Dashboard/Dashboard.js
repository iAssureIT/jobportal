import React, { useState,useEffect }from 'react';
import {ScrollView,View,Text,FlatList, TouchableOpacity,Keyboard}       from 'react-native';
import { Header, Button, 
        Icon, SearchBar }           from "react-native-elements";
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

// 
import {withCustomerToaster}        from '../../redux/AppState.js';

import { getList } 		              from '../../redux/productList/actions';
import { getWishList } 		          from '../../redux/wishDetails/actions';

import { SET_SEARCH_CALL,SET_SEARCH_TEXT,SET_SUGGETION_LIST,SET_SERACH_LIST} 	        from '../../redux/globalSearch/types';
import { getSearchResult } 	        from '../../redux/globalSearch/actions';


export const Dashboard = withCustomerToaster((props)=>{
 
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const {setToast,navigation} = props; 
  // 
  const [isOpen,setOpen]= useState(false);
  const [categories,setCategories]= useState([]);
  const [searchProductsDetails,setSearchProductsDetails]= useState([]);
  const [countData,setCountData]= useState([]);
  const [user_id,setUserId]= useState('');
  const [limit,setLimit]= useState(6);
  const [token,setToken]= useState('');

  const store = useSelector(store => ({
    productList     : store.productList,
    wishList        : store.wishDetails.wishList,
    globalSearch    : store.globalSearch,
  }));

  const {productList,wishList,globalSearch} = store;
  useEffect(() => {
    dispatch({type : SET_SUGGETION_LIST, payload  : []});
    dispatch({type : SET_SEARCH_TEXT,    payload  : ''});
    dispatch({type : SET_SERACH_LIST,    payload  : []});
    dispatch({type:SET_SEARCH_CALL,payload:false});
    getData();
  },[props,isFocused]);

  const getData=async()=>{
      var data = await AsyncStorage.multiGet(['user_id', 'token']);
      setUserId(data[0][1]);
      setToken(data[1][1]);
      dispatch(getList('featured',data[0][1],limit));
      dispatch(getList('exclusive',data[0][1],limit));
      dispatch(getList('discounted',data[0][1],limit));
      if(data[0][1]){
        countfun(data[0][1]);
        dispatch(getWishList(data[0][1]));
      }
      searchProducts();
  }

  const countfun=(user_id)=>{
    axios.get("/api/Carts/get/count/" + user_id)
    .then((response) => {
      setCountData(response.data);
    })
    .catch((error) => { 
      navigation.navigate('App')
      setToast({text: 'Something went wrong.', color: 'red'});
    })
  }

  const searchProducts=()=>{
    axios.get("/api/products/get/searchproducts/" + props.searchText)
      .then((response) => {
        setSearchProductsDetails([])
      })
      .catch((error) => {
        navigation.navigate('App')
        setToast({text: 'Something went wrong.', color: 'red'});
      })
  }



  const menu = <Menu navigate={navigation.navigate} isOpen={isOpen}/>;

    return (
      <React.Fragment>
       
         <HeaderBar2 
            navigation={navigation}
            toggle={setOpen} 
            openControlPanel={()=>_drawer.open()}
          /> 

         
      </React.Fragment>
    );  
})