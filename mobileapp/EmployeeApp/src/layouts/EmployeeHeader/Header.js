import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image
} from "react-native";
import { Header, Icon  }                     from 'react-native-elements';
import MaterialCommunityIcons                from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationActions, StackActions, }  from 'react-navigation'
import { DrawerActions }                     from 'react-navigation-drawer';
import styles                                from "./styles.js";
import {colors,projectName}                  from '../../config/styles.js';
export default class HeaderBar extends React.Component{


constructor(props) {
    super(props);
    this.state={
      'uid':"",
      'token':"",
      "fullName":""
    }
}
render() {
  return (
      <Header
        placement="center"
        leftComponent={
          this.props.showBackBtn
          ?
          projectName === "pipito" ?
                null
              :
              <Image
                  source={require('../../images/AppLogo.png')} 
                />
            :
          false
        }
        centerComponent={
          
            projectName === "pipito" ?
          <Image
              source={require('../../images/pipitowhite.png')} 
              onPress={()=>this.props.navigation.navigate('Carlist')}
            />
            :
          <Image
              source={require('../../images/cabby.png')} 
              onPress={()=>this.props.navigation.navigate('Carlist')}
            />
        
        }

        rightComponent={
          <View style={{flexDirection:"row"}}>
            <TouchableOpacity style={{width:40}}>
              <Icon size={28} name='bell' type='material-community' color='#fff' />
            </TouchableOpacity>
            <TouchableOpacity style={{width:40}} onPress={()=> this.props.navigation.toggleDrawer()}>
              <Icon size={28} name='menu' type='Feather' color='#fff' />
            </TouchableOpacity>
          </View> 
        }
        containerStyle={styles.container}
      />
    );
  }
}


