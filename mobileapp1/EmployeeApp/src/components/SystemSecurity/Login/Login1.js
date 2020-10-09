import React, {Component} from 'react';
import {
  ScrollView,
  Text,
  View,
  BackHandler,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Image, TextInput,
  Platform,
  Alert,
  AsyncStorage
} from 'react-native';
import { KeyboardAwareScrollView }  from 'react-native-keyboard-aware-scroll-view';
import RootLogin                    from './RootLogin.js';
import styles                       from './styles.js';
import { colors, sizes,projectName }            from '../../../config/styles.js';
import HeaderBar                    from '../../../layouts/Header/Header.js';

const window = Dimensions.get('window');

export default class Login1 extends Component {
  render() {
    const { navigate } = this.props.navigation;
    const { navigation } = this.props;
    return (
      <React.Fragment>
        { projectName === "pipito" ?
          <ImageBackground source={{}}  style={styles.container} resizeMode="cover" >
            <View  style={{  alignItems: 'center',}}>
              <Image
              style={{ marginTop: 10,}}
                source={require('../../../images/loginpipito.png')} 
              />
              <Image
                style={{ width: "40%",height: 60,marginTop: 10}}
                source={require('../../../images/pipito.png')}
              />
            </View>
            <RootLogin navigation={navigate} />
          </ImageBackground>
        :
        <ImageBackground source={{}}  style={styles.container} resizeMode="cover" >
        <View style={styles.overlay} />
          <View  style={{ flex:1, alignItems: 'center',}}>
            <Image
              style={{ width: "30%",height: 100,marginTop: 30}}
              source={require('../../../images/logoapp.png')}
            />
            <Image
             style={{ marginTop: 30,}}
              source={require('../../../images/cabby.png')} 
            />
          </View>
          <View style={{paddingHorizontal:20,paddingVertical:20}}>
            <View style={{paddingVertical:20,backgroundColor:'#fff',marginTop:15, borderBottomWidth: 0,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 1,borderRadius:10}}>
              <RootLogin navigation={navigate} />
            </View>
          </View>
        </ImageBackground>

        }
      </React.Fragment>
      // <React.Fragment>
      //   <ImageBackground source={{}}  style={styles.container} resizeMode="cover" >
      //   <View style={styles.overlay} />
      //     <View  style={{ flex:1, alignItems: 'center',}}>
      //       <Image
      //         style={{ width: "30%",height: 100,marginTop: 30}}
      //         source={require('../../../images/logoapp.png')}
      //       />
      //       <Image
      //        style={{ marginTop: 30,}}
      //         source={require('../../../images/cabby.png')} 
      //       />
      //     </View>
      //     <View style={{paddingHorizontal:20,paddingVertical:20}}>
      //       <View style={{paddingVertical:20,backgroundColor:'#fff',marginTop:15, borderBottomWidth: 0,
      //         shadowColor: '#000',
      //         shadowOffset: { width: 0, height: 2 },
      //         shadowOpacity: 0.8,
      //         shadowRadius: 2,
      //         elevation: 1,borderRadius:10}}>
      //         <RootLogin navigation={navigate} />
      //       </View>
      //     </View>
      //   </ImageBackground>
      // </React.Fragment>
      
    );
  }
}

