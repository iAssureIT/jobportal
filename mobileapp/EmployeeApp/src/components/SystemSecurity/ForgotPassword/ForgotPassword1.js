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
import styles                       from './styles.js';
import { colors, sizes }            from '../../../config/styles.js';
import RootForgotPassword           from './RootForgotPassword.js';
import HeaderBar                    from '../../../layouts/Header/Header.js';

const window = Dimensions.get('window');

const ForgotPassword1 = () => {
  const { navigate } = this.props.navigation;
    const { navigation } = this.props;
   return (
      <React.Fragment>
        <ImageBackground source={{}}  style={styles.container} resizeMode="cover" >
          <View style={{paddingHorizontal:20,paddingVertical:20}}>
            <View style={styles.forgotpwd}>
              {/* <RootForgotPassword navigation={navigate} /> */}
              <RootForgotPassword navigation={navigate} />
            </View>
          </View>
        </ImageBackground>
      </React.Fragment>
    );
};
export default ForgotPassword1;

