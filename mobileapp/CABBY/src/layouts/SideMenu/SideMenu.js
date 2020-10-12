import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ImageBackground,
  // AsyncStorage,
  Image,
  Platform,
  Dimensions
} from 'react-native';

import { 
	NavigationActions,
	StackActions, 
	withNavigationFocus 
} from 'react-navigation';

import { DrawerActions }    from 'react-navigation-drawer';
import { Icon } 			from 'react-native-elements';
import styles 				from './styles.js';
import {colors} 			from '../../config/styles.js';
import AsyncStorage         from '@react-native-community/async-storage';
import axios                from 'axios';

const window = Dimensions.get('window');


export default class SideMenu extends React.Component {



  constructor(props){
    super(props);
    this.state={
      uid:"",
      token:'',
      fullName:"",
      firstName      : "",
      lastName       : "",
      mobileNumber   : "",
      email          : "",
      imgPath        : "",
      // Version : REACT_APP_VERSION,
    };
  }	

  
  componentDidMount(){
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
    	this.getUserData();
    })
  }
  componentWillUnmount () {
    this.focusListener.remove()
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    this.getUserData();
  }

  getUserData(){
  	 AsyncStorage.getItem('user_id')
    .then((userId)=>{
      axios.get('/api/users/get/'+userId)
      .then((user)=>{
        this.setState({
          firstName      : user.data.firstname,
          lastName       : user.data.lastname,
          mobileNumber   : user.data.mobile,
          email          : user.data.email,
          imgPath      	 : user.data.image,
          user_id        : userId,  
        })
      })
      .catch((error)=>{
        console.log("error=>",error)
      })
    })
  }

  logout=()=>{
      AsyncStorage.removeItem('user_id');
      AsyncStorage.removeItem('token');
      this.props.navigation.closeDrawer();
      this.props.navigation.navigate('Login');
  };


  render(){
  	// this._retrieveData();
	  	return(
	      	<ScrollView contentContainerStyle={[styles.container]} scrollsToTop={false}>
		        <View style={{flexDirection:"row",height:150,margin:20,paddingTop:50,borderBottomWidth:1}}>
		        	{this.state.imgPath === "" ?	
			        	<ImageBackground
			            	style={[styles.logoImage]}
			            	source={require('../../images/user.jpg') }
			            	imageStyle={{ borderRadius: 100 }}
			     		/>
			     		:
			     		<ImageBackground
			            	style={[styles.logoImage]}
			            	source={{uri: this.state.imgPath}}
			            	imageStyle={{ borderRadius: 100 }}
			     		/>
			     	}	
		     		<View style={{marginLeft:20}}>
		     			<Text style={{fontSize:25}}>{this.state.firstName}</Text>
		     			<Text>Driver</Text>
		     		</View>	
		        </View>
		        <View style={styles.menuWrapper}>
		        	<TouchableOpacity onPress={()=>this.props.navigation.navigate('BookingTabView')}>

			        	<View style={styles.menu}>
			        		<Icon 
			              size={18} 
			              name='desktop-mac' 
			              type='material-community' 
			              color={colors.primary} 
			              containerStyle={styles.iconContainer}
			            />
			        	<Text style={styles.menuText}>Bookings</Text>
			        	</View>
		        	</TouchableOpacity>
		        	<TouchableOpacity onPress={()=>this.props.navigation.navigate('EmployeeProfile')}>
			        	<View style={styles.menu}>
			        		<Icon 
			              size={18} 
			              name='user' 
			              type='font-awesome' 
			              color={colors.primary} 
			              containerStyle={styles.iconContainer}
			            />
			        	<Text style={styles.menuText}>My Profile</Text>
			        	</View>
		        	</TouchableOpacity>
		        	<TouchableOpacity onPress={()=>this.logout()}>
			        	<View style={styles.menu}>
			        		<Icon 
			              size={18} 
			              name='logout' 
			              type='material-community' 
			              color={colors.primary} 
			              containerStyle={styles.iconContainer}
			            />
			        	<Text style={styles.menuText}>Log Out</Text>
			        	</View>
		        	</TouchableOpacity>
		        	<TouchableOpacity style={{marginLeft:35}}>
			        	<View style={styles.menu}>
			        	<Text style={styles.menuText,{color:"#aaa"}}>Version 3.3 </Text>
			        	</View>
		        	</TouchableOpacity>
		        </View>
	  		</ScrollView>
	  	);
	}

}

