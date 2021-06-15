import React, { useEffect }       from 'react';
import {NavigationContainer}      from '@react-navigation/native';
import { createStackNavigator,CardStyleInterpolators,TransitionPresets }   from '@react-navigation/stack';
import { createDrawerNavigator }  from '@react-navigation/drawer';
import { useWindowDimensions } from 'react-native';
// import { createAppContainer }     from 'react-navigation';
import { Animated, Easing }       from 'react-native';
import axios                      from 'axios';
import {AuthLoadingScreen}        from '../ScreenComponents/AuthLoadingScreen/AuthLoadingScreen.js';
import InAppNotification          from '../ScreenComponents/InAppNotification/InAppNotification.js';
import {Menu}                     from '../ScreenComponents/Menu/Menu.js';

/*----SystemSecurity -----*/
import {RootLogIn }               from '../Screens/SystemSecurity/RootLogIn/RootLogIn.js';
import {ForgotPassword}           from '../Screens/SystemSecurity/ForgotPassword/ForgotPassword.js';
import {ResetPassword}            from '../Screens/SystemSecurity/ResetPassword/ResetPassword.js';
import {RootSignUp}               from '../Screens/SystemSecurity/Signup/RootSignUp.js';
import {OTPVerification}          from '../Screens/SystemSecurity/OTPVerification/OTPVerification.js';
import {ForgotPasswordOTP}        from '../Screens/SystemSecurity/ForgotPasswordOTP/ForgotPasswordOTP.js';
import {Dashboard}                from '../Screens/Dashboard/Dashboard.js';
import {BasicInfo}                from '../Screens/CompleteYourProfile/BasicInfo.js';
import {Address}                  from '../Screens/CompleteYourProfile/Address.js';

// import {WishlistComponent}        from'../Screens/WishlistComponent/WishlistComponent.js';
import {SupportSystem}            from '../Screens/Help&Support/SupportSystem.js';

// import ResetPwd                   from'../Screens/AccountDashboard/ResetPwd.js';

const Home = createDrawerNavigator();
console.log("TransitionPresets",TransitionPresets);

const TransitionScreenOptions = {
  ...TransitionPresets.ModalTransition, // This is where the transition happens
};


// const Drawer = createDrawerNavigator();

// function MyDrawer() {
//   const dimensions = useWindowDimensions();

//   const isLargeScreen = dimensions.width >= 768;

//   return (
//     <Drawer.Navigator
//       openByDefault
//       drawerType={isLargeScreen ? 'permanent' : 'back'}
//       drawerStyle={isLargeScreen ? null : { width: '100%' }}
//       overlayColor="transparent"
//       initialRouteName="BasicInfo"
//     >
//      <Drawer.Screen
//         name="Feed"
//         component={Feed}
//         options={{ drawerLabel: 'Home' }}
//       />
//       <Drawer.Screen
//         name="Notifications"
//         component={Notifications}
//         options={{ drawerLabel: 'Updates' }}
//       />
//       <Drawer.Screen
//         name="Profile"
//         component={Profile}
//         options={{ drawerLabel: 'Profile' }}
//       />

//     </Drawer.Navigator>
//   );
// }

export const HomeStack = () => (
  <Home.Navigator 
    headerMode            = "none"
    mode="modal"
    drawerContent   = { (props) => <Menu navigate={navigation.navigate} { ...props } />}
  >
    <Home.Screen name="Address"                     component={Address}  />
    <Home.Screen name="BasicInfo"                   component={BasicInfo} />
    <Home.Screen name="Dashboard"                   component={Dashboard} />
    <Home.Screen name="SupportSystem"               component={SupportSystem} />
    <Home.Screen name="InAppNotification"           component={InAppNotification} />  
  </Home.Navigator>
);


const RegisterRoutes = createStackNavigator();
 export const RegisterStack = () => (
  <RegisterRoutes.Navigator
    headerMode="none"
    initialRouteName={"RootLogIn"}>
    <RegisterRoutes.Screen name={"RootLogIn"}         component={RootLogIn} />
    <RegisterRoutes.Screen name={"ResetPassword"}     component={ResetPassword} />
    <RegisterRoutes.Screen name={"OTPVerification"}   component={OTPVerification} />
    <RegisterRoutes.Screen name={"ForgotPassword"}    component={ForgotPassword} />
    <RegisterRoutes.Screen name={"ForgotPasswordOTP"} component={ForgotPasswordOTP} />
    <RegisterRoutes.Screen name={"Signup"}            component={RootSignUp} />
    {/* <RegisterRoutes.Screen name={"OTPVerification"} component={OTPVerification} /> */}
  </RegisterRoutes.Navigator>
);

const App = createStackNavigator();
const AppStack = () => (
  <App.Navigator headerMode="none" >
    <App.Screen name="Auth" component={RegisterStack} />
      <App.Screen name="App" component={HomeStack} />

      <App.Screen name="Dashboard" component={Dashboard} />
  </App.Navigator>
);

export const AppContainer = () => {
  return (
    <NavigationContainer>
        <AppStack />
    </NavigationContainer>
  );
};  