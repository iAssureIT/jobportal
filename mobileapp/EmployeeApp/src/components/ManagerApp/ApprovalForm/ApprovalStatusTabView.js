import React,{useState}                       from 'react';
import { View, StyleSheet, Dimensions,Text }  from 'react-native';
import { TabView, SceneMap, TabBar }          from 'react-native-tab-view';
import Empbookinginfo                         from './Empbookinginfo.js' 
import Carbookingdetails                      from './Carbookingdetails.js' 
import CarStatusDriver                        from './CarStatusDriver.js' 
import { Header, Icon  }                      from 'react-native-elements';
import { connect }                            from 'react-redux';
import styles                                 from './styles.js';
import { colors, projectName }                from '../../../config/styles.js';
const BasicInfoRoute = () => (
  <Empbookinginfo />
);
 
const CarbookingdetailsRoute = () => (
  <Carbookingdetails />
);

const StatusDriver = () => (
  <CarStatusDriver />
);
 
const initialLayout = { width: Dimensions.get('window').width };
 
function ApprovalStatusTabView() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Trip Details' },
    { key: 'second', title: 'Car Details'},
    { key: 'third', title: 'Status & Driver' },
    
  ]);
 
  const renderScene = SceneMap({
    first: BasicInfoRoute,
    second:  CarbookingdetailsRoute,
    third:  StatusDriver,
  });

  const getTabBarIcon = (props) => {
    const {route, focused} = props;
    let iconColor = focused ? projectName === "pipito" ? '#510f99' : '#376bff': "#c2c3c8";
    if(route.key === 'first'){
      return <Icon name='car' size={20} color={iconColor} type='font-awesome'/>
    }else if(route.key === 'second'){
      return <Icon name='car' size={20} color={iconColor} type='font-awesome'/>
    }else{
      return <Icon name='id-card' size={20} color={iconColor} type='font-awesome'/>
    }
  }

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor : projectName === "pipito" ? '#510f99' : '#376bff'} }
      style={styles.tabviews}
      renderIcon={ props => getTabBarIcon(props)}
      renderLabel={({ route, focused, color }) => (
        <Text style={{ color:projectName === "pipito" ? '#510f99' : '#376bff',fontSize:12, margin: 8,textAlign:"center", fontFamily: "Montserrat-SemiBold"}}>
          {route.title}
        </Text>
      )}
      pressColor={"#eee"}

    />
  );
  return (
    <TabView
      navigationState  =  {{ index, routes }}
      renderScene      =  {renderScene}
      renderTabBar     =  {renderTabBar}
      onIndexChange    =  {setIndex}
      initialLayout    =  {initialLayout}
      tabBarPosition   = {'bottom'}
    />
  );
}
 

const mapStateToProps = (state)=>{
  return {
    user_id         : state.user_id,
    basicInfoTab    : state.basicInfoTab,
    EmpAddTab       : state.EmpAddTab,
  }
};

export default connect(mapStateToProps)(ApprovalStatusTabView);
