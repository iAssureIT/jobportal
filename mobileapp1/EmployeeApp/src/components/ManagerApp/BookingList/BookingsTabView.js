import React,{useState}                       from 'react';
import { View, StyleSheet, Dimensions,Text }  from 'react-native';
import { TabView, SceneMap, TabBar }          from 'react-native-tab-view';
import HeaderBar                              from '../../../layouts/Header/Header.js';
import NewBooking                             from './NewBookings.js' 
import ConfirmBookings                        from './ConfirmBookings.js' 
import CancelBookings                         from './CancelBookings.js' 
import Reject                                 from './Rejected.js' 
import { Header, Icon  }                      from 'react-native-elements';
import styles                                 from './style.js';
import { colors, projectName }                from '../../../config/styles.js';
const NewBookings = () => (
  <NewBooking />
);
 
const ConfirmBooking = () => (
  <ConfirmBookings />
);

const Rejected = () => (
  <Reject />
);

const CancelBooking = () => (
  <CancelBookings />
);
 
const initialLayout = { width: Dimensions.get('window').width };
 
export default function BookingsTabView() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'New'},
    { key: 'second', title: 'Approved' },
    { key: 'third', title: 'Rejected' },
    { key: 'fourth', title: 'Cancelled' },
  ]);
 

    // first: NewBookings,
    // second: ConfirmBooking,
    // third: CancelBooking,
    // third: CancelBooking,
    const renderScene = ( props ) => {
      if (props.route.key == 'first' && index == 0){
        return <NewBookings />;
      }
      if (props.route.key == 'second' && index == 1){
        return <ConfirmBooking />;
      }
      
      if (props.route.key == 'third' && index == 2){
        return <Rejected />;
      }
      if (props.route.key == 'fourth' && index == 3){
        return <CancelBooking />;
      }
    };
  


  const getTabBarIcon = (props) => {
    const {route, focused} = props;
    let iconColor = focused ? projectName === "pipito" ? '#510f99' : '#376bff': "#c2c3c8";
    if(route.key === 'first'){
      return <Icon name='car' size={20} color={iconColor} type='font-awesome'/>
    }else if(route.key === 'second'){
      return <Icon name='car' size={20} color={iconColor} type='font-awesome'/>
    }else{
      return <Icon name='car' size={20} color={iconColor} type='font-awesome'/>
    }
  }

  const renderTabBar = props => (
    <TabBar
      {...props}      
      indicatorStyle={{ backgroundColor: projectName === "pipito" ? '#510f99' : '#376bff' }}
      style={styles.tabviews}
      renderIcon={ props => getTabBarIcon(props)}
      renderLabel={({ route, focused, color }) => (
        <Text style={{ color:projectName === "pipito" ? '#510f99' : '#376bff',fontSize:11, margin: 8,textAlign:"center", fontFamily: "Montserrat-SemiBold" }}>
          {route.title}
        </Text>
      )}
      pressColor={"#eee"}
    />
  );
  return (
    <React.Fragment>
      <TabView
        navigationState  =  {{ index, routes }}
        renderScene      =  {renderScene}
        renderTabBar     =  {renderTabBar}
        onIndexChange    =  {setIndex}
        initialLayout    =  {initialLayout}
        tabBarPosition   = {'bottom'}
      />
    </React.Fragment>
  );
}
 
// const styles = StyleSheet.create({
//   scene: {
//     flex: 1,
//   },
// });