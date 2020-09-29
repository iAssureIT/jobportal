import React,{useState}                       from 'react';
import { View, StyleSheet, Dimensions,Text }  from 'react-native';
import { TabView, SceneMap, TabBar }          from 'react-native-tab-view';
import Empbookinginfo                         from './Empbookinginfo.js' 
import {colors,projectName}                   from '../../../config/styles.js';
// import EmployeeDocuments                   from '../EmployeeDocuments/EmployeeDocuments.js' 
import Carbookingdetails                      from './Carbookingdetails.js' 
import CarStatusDriver                        from './CarStatusDriver.js' 
import { Header, Icon  }                      from 'react-native-elements';
import { connect }                            from 'react-redux';
import styles                                 from './styles.js';


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
 
function CarbookingReceiptTabView() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Status & Driver' },
    { key: 'second', title: 'Employee Details'},
    { key: 'third', title: 'Car Details' },
    
  ]);
 
  const renderScene = SceneMap({
    first:  StatusDriver,
    second:  BasicInfoRoute,
    third: CarbookingdetailsRoute,
  });

  const getTabBarIcon = (props) => {
    const {route, focused} = props;
    let iconColor = focused ? '#510f99': "#c2c3c8";
    if(route.key === 'first'){
      return <Icon name='car' size={20} color={iconColor} type='font-awesome'/>
    }else if(route.key === 'second'){
      return <Icon name='address-book' size={20} color={iconColor} type='font-awesome'/>
    }else{
      return <Icon name='id-card' size={20} color={iconColor} type='font-awesome'/>
    }
  }

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor : '#510f99'} }
      style={styles.tabviews}
      renderIcon={ props => getTabBarIcon(props)}
      renderLabel={({ route, focused, color }) => (
        <Text style={{ color:"#333", margin: 8, fontFamily: "Montserrat-SemiBold"}}>
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
    // DocumentsTab    : state.DocumentsTab,
  }
};

export default connect(mapStateToProps)(CarbookingReceiptTabView);
