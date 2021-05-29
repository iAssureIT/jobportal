import React,{useState,useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Icon, Avatar }         from 'react-native-elements';
import axios                    from "axios";
import AsyncStorage             from '@react-native-async-storage/async-storage';
import styles                   from '../../AppDesigns/currentApp/styles/ScreenComponentStyles/MenuStyles.js';
import {withCustomerToaster}     from '../../redux/AppState.js';

export const Menu = (props)=>{
  console.log("PROPS",props);
  const {navigation}=props;
  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName]   = useState('');
  const [user_id,setUserId]      = useState('');
  ;
  useEffect(() => {
    console.log("useEffect");
    getData()
  },[props]);

  const getData=()=>{
    AsyncStorage.getItem('user_id')
    .then((userId)=>{
      if(userId){
        axios
        .get('/api/users/get/'+userId)
        .then((user)=>{
          setFirstName(user.data.firstname);
          setLastName(user.data.lastname);
          setUserId(userId);
        })
        .catch((error)=>{
          console.log("error=>",error)
        })
      } 
    })
  }

  const logout=()=>{
    AsyncStorage.removeItem('user_id');
    AsyncStorage.removeItem('token');
    navigation.navigate('Auth');
  };
  
  return (
    <ScrollView contentContainerStyle={[styles.container]} scrollsToTop={false}>
      <ImageBackground source={require("../../AppDesigns/currentApp/images/34.png")} style={styles.container} resizeMode="cover" >
        <View style={{flexDirection:"row",height:100,margin:20,paddingTop:30,}}>
        <Avatar
        style={{borderWidth:1, borderColor:"#999",borderRadius:18}}
            overlayContainerStyle={{}}
            width={90}
            height={90}
            rounded
            source={require('../../AppDesigns/currentApp/images/user.jpg')}                 
          />
        </View>
        <View style={{paddingHorizontal:25,marginTop:20}}>
          <Text style={{fontSize:18,color: "#aaa",fontFamily:"Montserrat-Regular",}}>Hi, {firstName ? firstName : "User"}</Text>
          <Text style={{fontSize:15,color: "#aaa",fontFamily:"Montserrat-Regular",}}>garima.billore@iassureit.com</Text>
        </View>	
      <View style={styles.menuWrapper}>
        <TouchableOpacity onPress={()=> navigation.navigate('AccountDashboard')}>
          <View style={styles.menu}>
            <Icon 
              size={18} 
              name='user-circle-o' 
              type='font-awesome' 
              color='#aaa' 
              containerStyle={styles.iconContainer}
            />
            <Text style={styles.menuText}>
              Complete your Profile
            </Text>
          </View>
        </TouchableOpacity>
          <TouchableOpacity onPress={()=> navigation.navigate('AddressDefaultComp',{"delivery":false})} >
          <View style={styles.menu}>
            <Icon 
              size={18} 
              name='address-book-o' 
              type='font-awesome' 
              color='#aaa' 
              containerStyle={styles.iconContainer}
            />
            <Text style={styles.menuText}>
              Applied Jobs 
            </Text>
          </View>
        </TouchableOpacity>
         <TouchableOpacity onPress={()=> navigation.navigate('SupportSystem')}>
          <View style={styles.menu} >
            <Icon 
              size={18} 
              name='bookmark-o' 
              type='font-awesome' 
              color='#aaa' 
              containerStyle={styles.iconContainer}
            />
            <Text style={styles.menuText}>
             Wishlist Jobs
            </Text>
          </View>
        </TouchableOpacity>
         <TouchableOpacity onPress={()=> navigation.navigate('SupportSystem')}>
          <View style={styles.menu} >
            <Icon 
              size={18} 
              name='bookmark-o' 
              type='font-awesome' 
              color='#aaa' 
              containerStyle={styles.iconContainer}
            />
            <Text style={styles.menuText}>
              Help & Support
            </Text>
          </View>
        </TouchableOpacity> 
          <TouchableOpacity onPress={()=> navigation.navigate('MyOrder')}>
          <View style={styles.menu}>
            <Icon 
              size={18} 
              name='briefcase' 
              type='entypo' 
              color='#aaa' 
              containerStyle={styles.iconContainer}
            />
            <Text style={styles.menuText}>
              Change Password
            </Text>
          </View>
        </TouchableOpacity>
         <TouchableOpacity onPress={()=>logout()}>
          <View style={styles.menu}>
            <Icon 
              size={18} 
              name='power' 
              type='material-community' 
              color='#aaa' 
              containerStyle={styles.iconContainer}
            />
            <Text style={styles.menuText}>
              Logout
            </Text>
          </View>
        </TouchableOpacity>
       
       
        {/*{user_id ?
        <TouchableOpacity onPress={()=>logout()}>
          <View style={styles.menu}>
            <Icon 
              size={18} 
              name='power' 
              type='material-community' 
              color='#aaa' 
              containerStyle={styles.iconContainer}
            />
            <Text style={styles.menuText}>
              Logout
            </Text>
          </View>
        </TouchableOpacity>
        :
        <TouchableOpacity onPress={()=>logout()}>
          <View style={styles.menu}>
            <Icon 
              size={18} 
              name='login' 
              type='material-community' 
              color='#aaa' 
              containerStyle={styles.iconContainer}
            />
            <Text style={styles.menuText}>
              Login
            </Text>
          </View>
        </TouchableOpacity>}*/}
      </View>
      </ImageBackground>
  </ScrollView>
  );
}
