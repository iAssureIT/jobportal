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


export default class HeaderBar extends React.Component{

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
    this.state={
      'uid':"",
      'token':"",
      "fullName":""
    }
  }

  componentDidMount(){
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
    })
  }
  componentWillUnmount () {
    this.focusListener.remove()
  }



  render() {
    return (
      <Header
        placement="center"
        leftComponent={
          this.props.showBackBtn
          ?
              <TouchableOpacity onPress={()=> this.props.navigation.dispatch(NavigationActions.back())}>
                {/* <Icon size={28} name='arrow-left' type='feather' color='#fff' /> */}
                <Image
                  source={require('../../images/AppLogo.png')} 
                />
              </TouchableOpacity>
            :
          false
        }
        centerComponent={
          <TouchableOpacity onPress={()=>this.navigateScreen('Home')}>
            {/* <Text style={{fontSize:20,color:"#fff",fontFamily: 'Montserrat-Regular'}}>{this.props.headerName}</Text> */}
            <Image
              source={require('../../images/cabby.png')} 
            />
          </TouchableOpacity>
        }

        rightComponent={
          <View style={{flexDirection:"row"}}>
            <TouchableOpacity style={{width:40}}>
              <Icon size={28} name='bell' type='material-community' color='#fff' />
            </TouchableOpacity>
            <TouchableOpacity style={{width:40}} onPress={()=> this.props.navigation.toggleDrawer()}>
              <Icon size={28} name='menu' type='Feather' color='#fff' />
              {/* <MaterialCommunityIcons name="plus" size={10} color="#fff" /> */}
            </TouchableOpacity>
          </View> 
        }
        containerStyle={styles.container}
      />
    );
  }
}


