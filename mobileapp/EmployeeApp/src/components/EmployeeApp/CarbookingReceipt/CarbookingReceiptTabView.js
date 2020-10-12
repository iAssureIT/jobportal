import React,{useState}                       from 'react';
import { View, StyleSheet, Dimensions,Text }  from 'react-native';
import { TabView, SceneMap, TabBar }          from 'react-native-tab-view';
import BasicInfo                              from './BasicInfo.js' 
import {colors,projectName}                   from '../../../config/styles.js';
// import EmployeeDocuments                      from '../EmployeeDocuments/EmployeeDocuments.js' 
import Carbookingdetails                        from './Carbookingdetails.js' 
import { Header, Icon  }                      from 'react-native-elements';
import { connect }                  from 'react-redux';
import styles from './styles.js';


const BasicInfoRoute = () => (
  <BasicInfo/>
);
 
const CarbookingdetailsRoute = () => (
  <Carbookingdetails />
);
 
const initialLayout = { width: Dimensions.get('window').width };
 
function CarbookingReceiptTabView() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Employee Details'},
    { key: 'second', title: 'Car Details' },
    // { key: 'third', title: 'Documents' },
  ]);
 
  const renderScene = SceneMap({
    first: BasicInfoRoute,
    second: CarbookingdetailsRoute,
    // third: EmployeeDocumentsRoute,
  });

  const getTabBarIcon = (props) => {
    const {route, focused} = props;
    let iconColor = focused ? projectName === "pipito" ? '#510f99' : '#376bff': "#c2c3c8";
    if(route.key === 'first'){
      return <Icon name='user' size={20} color={iconColor} type='font-awesome'/>
    }else if(route.key === 'second'){
      return <Icon name='address-book' size={20} color={iconColor} type='font-awesome'/>
    }else{
      return <Icon name='id-card' size={20} color={iconColor} type='font-awesome'/>
    }
  }

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor : projectName === "pipito" ? '#510f99' : '#376bff'} }
      // indicatorStyle={{backgroundColor : '#283593'} }
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
    // DocumentsTab    : state.DocumentsTab,
  }
};

export default connect(mapStateToProps)(CarbookingReceiptTabView);
