import React,{useState}                       from 'react';
import { View, StyleSheet, Dimensions,Text }  from 'react-native';
import { TabView, SceneMap, TabBar }          from 'react-native-tab-view';
import HeaderBar                              from '../../../layouts/Header/Header.js';
import { Header, Icon  }                      from 'react-native-elements';
import { withNavigation }                     from 'react-navigation';
import styles                                 from './style.js';
import NewBookings                            from '../ListofBookings/NewBookings.js' 
import CompletedBookings                      from '../ListofBookings/CompletedBookings.js' 
import RejectedBookings                       from '../ListofBookings/RejectedBookings.js' 
import { NavigationActions,StackActions, withNavigationFocus }  from 'react-navigation';

// const NewBooking = () => (
//   <NewBookings status={"New"} />
// );
 
// const CompletedBooking = () => (
//   <CompletedBookings status={"Completed"}/>
// );

// const RejectedBooking = () => (
//   <RejectedBookings status={"Rejected"} />
// );
 
const initialLayout = { width: Dimensions.get('window').width };
 
export default function BookingsTabView() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'New'},
    { key: 'second', title: 'Completed' },
    { key: 'third', title: 'Rejected' },
  ]);
 
  // const renderScene = SceneMap({
  //   first: NewBooking,
  //   second: CompletedBooking,
  //   third: RejectedBooking,
  // });
  const renderScene = ( props ) => {
    console.log("route.key",props.route.key);
    console.log("index",index);
    if (props.route.key == 'first' && index == 0){ 
      return <NewBookings />;
    }
    if (props.route.key == 'second' && index == 1){
      return <CompletedBookings />;
    }
    if (props.route.key == 'third' && index == 2){
      return <RejectedBookings />;
    }
  };
  const getTabBarIcon = (props) => {
    const {route,focused} = props;
    let iconColor = focused ? '#376bff': "#c2c3c8";
    if(route.key === 'first'){
      return <Icon name='list' size={20} color={iconColor} type='font-awesome'/>
    }else if(route.key === 'second'){
      return <Icon name='list' size={20} color={iconColor} type='font-awesome'/>
    }else{
      return <Icon name='list' size={20} color={iconColor} type='font-awesome'/>
    }
  };

  const renderTabBar = props => (
    <TabBar
      {...props}      
      indicatorStyle={{ backgroundColor: '#333' }}
      style={styles.tabviews}
      renderIcon={ props => getTabBarIcon(props)}
      renderLabel={({ route, focused, color }) => (
        <Text style={{ color:"#333", margin: 8 }}>
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