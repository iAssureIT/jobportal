import { createSwitchNavigator }  from 'react-navigation';
import { createDrawerNavigator }  from 'react-navigation-drawer';
import { createStackNavigator }   from 'react-navigation-stack';
import { createAppContainer }     from '@react-navigation/native';
import Home                       from '../components/Home.js';
import StartLocationDetails       from '../components/StartLocationDetails/StartLocationDetails.js';

import MyTravelHistory            from '../components/MyTravelHistory/MyTravelHistory.js';
import FuelReimbursement          from '../components/FuelReimbursement/FuelReimbursement.js';
import LocationDetails            from '../components/LocationDetails/LocationDetails.js';
import AuthLoadingScreen          from '../layouts/AuthLoading/AuthLoadingScreen.js'; 
import SideMenu                   from '../layouts/SideMenu/SideMenu.js';
import EmployeeProfile            from '../components/EmployeeProfile/EmployeeProfileView.js';
import Login                      from '../components/SystemSecurity/Login/Login1.js';
import ForgotPassword             from '../components/SystemSecurity/ForgotPassword/ForgotPassword1.js';
import ResetPassword              from '../components/SystemSecurity/ResetPassword/ResetPassword1.js';
import Signup                     from '../components/SystemSecurity/Signup/Signup1.js';
import OTPVerification            from '../components/SystemSecurity/OTPVerification/OTPVerification.js';
import ForgotPasswordOTP          from '../components/SystemSecurity/ForgotPasswordOTP/ForgotPasswordOTP1.js';
import BookingTabView             from '../components/Bookings/ListofBookings/BookingsView.js';
import BookingsPageView           from '../components/Bookings/BookingsPageView/BookingsPageView.js';

const HomeStack = createStackNavigator({
  
  BookingTabView: {
    screen: BookingTabView,
    navigationOptions: {
      headerShown: false
    }
  },
  BookingsPageView: {
    screen: BookingsPageView,
    navigationOptions: {
      headerShown: false

    }
  },
  Home: {
    screen: Home,
    navigationOptions: {
      headerShown: false
    }
  },

  EmployeeProfile: {
    screen: EmployeeProfile,
    navigationOptions: {
      headerShown: false
    }
  },

  LocationDetails: {
    screen: LocationDetails,
    navigationOptions: {
      headerShown: false
    }
  },
  StartLocationDetails: {
    screen: StartLocationDetails,
    navigationOptions: {
      headerShown: false
    }
  },
  MyTravelHistory: {
    screen: MyTravelHistory,
    navigationOptions: {
      headerShown: false
    }
  },
  FuelReimbursement: {
    screen: FuelReimbursement,
    navigationOptions: {
      headerShown: false
    }
  },
});


const AuthStack = createStackNavigator({
 
 
  Login: {
    screen: Login,
    navigationOptions: {
      headerShown: false
    }
  },
   ResetPassword: {
    screen: ResetPassword,
    navigationOptions: {
      headerShown: false
    }
  },

  OTPVerification: {
    screen: OTPVerification,
    navigationOptions: {
      headerShown: false
    }
  },
  Login: {
    screen: Login,
    navigationOptions: {
      headerShown: false
    }
  },
  ForgotPassword: {
    screen: ForgotPassword,
    navigationOptions: {
      headerShown: false
    }
  },
  ForgotPasswordOTP: {
    screen: ForgotPasswordOTP,
    navigationOptions: {
      headerShown: false
    }
  },
  Signup: {
    screen: Signup,
    navigationOptions: {
      headerShown: false
    }
  },
  OTPVerification: {
    screen: OTPVerification,
    navigationOptions: {
      headerShown: false
    }
  },
  
});

const drawer = createDrawerNavigator({
	Home : {
		screen: HomeStack
	}
},{
  drawerLockMode: 'locked-closed',
  contentComponent: SideMenu,
  drawerPosition: 'right'
});




// export default HomeStack;
export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: drawer,
    Auth: AuthStack,
  },
  {
    unmountInactiveRoutes: true,
    initialRouteName: 'AuthLoading',
  }
));