import React,{useState}                       from 'react';
import { Dimensions,Text }                    from 'react-native';
import { TabView, SceneMap, TabBar }          from 'react-native-tab-view';
import NewBooking                             from './NewBookings.js' 
import ConfirmBookings                        from './ConfirmBookings' 
import Reject                                 from './Rejected' 
import CancelBookings                         from './CancelBookings' 
import { colors, projectName }                from '../../../config/styles.js';
import { Icon  }                              from 'react-native-elements';
import styles                                 from './style.js';
 
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
    { key: 'first',   title: 'New'},
    { key: 'second',  title: 'Approved' },
    { key: 'third',   title: 'Rejected' },
    { key: 'fourth',  title: 'Cancelled' },
  ]);
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

 
  // const renderScene = SceneMap({
  //   first: NewBookings,
  //   second: ConfirmBooking,
  //   third: CancelBooking,
  // });

  const getTabBarIcon = (props) => {
    const {route, focused} = props;
    // button : projectName === "pipito" ? '#510f99' : '#376bff',
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