import { createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from '@react-navigation/native';

import Signature from '../components/EmployeeApp/Signature/Signature.js'
import Tripbooking from '../components/EmployeeApp/Tripbooking/Tripbooking.js'
import Carbooking from '../components/EmployeeApp/Carbooking/carbooking.js'
import Carshow from '../components/EmployeeApp/Carshow/carshow.js'
import Mytrips from '../components/EmployeeApp/Mytrips/Mytrips.js'
import MytripsView from '../components/EmployeeApp/Mytrips/MytripsView.js'
// import CarbookingReceipt from '../components/EmployeeApp/CarbookingReceipt/CarbookingReceipt.js'
// import Carbookingpermission from '../components/EmployeeApp/Carbookingpermission/Carbookingpermission.js'
import BookingStatusView from '../components/EmployeeApp/Carbookingpermission/BookingStatusView.js'
import BookingReceiptView from '../components/EmployeeApp/CarbookingReceipt/BookingReceiptView.js';

// import ApprovalForm from '../components/ManagerApp/ApprovalForm/ApprovalStatusView.js';
import ApprovalForm from '../components/ManagerApp/ApprovalForm/ApprovalStatusView.js';
import BookingView from '../components/ManagerApp/BookingList/BookingView';

import EmployeeProfile from '../components/EmployeeApp/EmployeeProfile/EmployeeProfileView.js';
import AuthLoadingScreen from '../layouts/AuthLoading/AuthLoadingScreen.js';
import SideMenu from '../layouts/SideMenu/SideMenu.js';
import Login from '../components/SystemSecurity/Login/Login1.js';
import ForgotPassword from '../components/SystemSecurity/ForgotPassword/ForgotPassword1.js';
import ResetPassword from '../components/SystemSecurity/ResetPassword/ResetPassword1.js';
import Signup from '../components/SystemSecurity/Signup/Signup1.js';
import OTPVerification from '../components/SystemSecurity/OTPVerification/OTPVerification.js';
import ForgotPasswordOTP from '../components/SystemSecurity/ForgotPasswordOTP/ForgotPasswordOTP1.js';

const HomeStack = createStackNavigator({


  // Carbooking: {
  //   screen: Carbooking,
  //   navigationOptions: {
  //     headerShown: false
  //   }
  // },
  Tripbooking: {
    screen: Tripbooking,
    navigationOptions: {
      headerShown: false
    }
  },


  Carshow: {
    screen: Carshow,
    navigationOptions: {
      header: null
    }
  },
  BookingReceiptView: {
    screen: BookingReceiptView,
    navigationOptions: {
      header: null
    }
  },
  Mytrips: {
    screen: Mytrips,
    navigationOptions: {
      header: null
    }
  },
  MytripsView: {
    screen: MytripsView,
    navigationOptions: {
      header: null
    }
  },
  // Carbookingpermission: {
  //   screen: Carbookingpermission,
  //   navigationOptions: {
  //     header: null
  //   }
  // },
  BookingStatusView: {
    screen: BookingStatusView,
    navigationOptions: {
      headerShown: false
    }
  },
  Signature: {
    screen: Signature,
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
  BookingView: {
    screen: BookingView,
    navigationOptions: {
      headerShown: false
    }
  },
  ApprovalForm: {
    screen: ApprovalForm,
    navigationOptions: {
      headerShown: false
    }
  },
  // ListofBookings: {
  //   screen: ListofBookings,
  //   navigationOptions: {
  //     headerShown: false
  //   }
  // },
  // ApprovalForm: {
  //   screen: ApprovalForm,
  //   navigationOptions: {
  //     headerShown: false
  //   }
  // },

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
  Home: {
    screen: HomeStack
  }
}, {
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