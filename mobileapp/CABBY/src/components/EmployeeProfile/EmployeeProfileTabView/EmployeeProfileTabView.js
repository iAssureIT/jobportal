import React,{useState}                       from 'react';
import { View, StyleSheet, Dimensions,Text }  from 'react-native';
import { TabView, SceneMap, TabBar }          from 'react-native-tab-view';
import BasicInfo                              from '../BasicInfo/BasicInfo.js' 
import EmployeeDocuments                      from '../EmployeeDocuments/EmployeeDocuments.js' 
import EmployeeAddress                        from '../EmployeeAddress/EmployeeAddress.js' 
import { Header, Icon  }                      from 'react-native-elements';
import { connect }                  from 'react-redux';
import styles from './styles.js';


const BasicInfoRoute = () => (
  <BasicInfo/>
);
 
const EmployeeDocumentsRoute = () => (
  <EmployeeDocuments />
);

const EmployeeAddressRoute = () => (
  <EmployeeAddress />
);
 
const initialLayout = { width: Dimensions.get('window').width };
 
function EmployeeProfileTabView() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Basic Info'},
    { key: 'second', title: 'Address' },
    { key: 'third', title: 'Documents' },
  ]);
 
  const renderScene = SceneMap({
    first: BasicInfoRoute,
    second: EmployeeAddressRoute,
    third: EmployeeDocumentsRoute,
  });

  const getTabBarIcon = (props) => {
    const {route, focused} = props;
    let iconColor = focused ? '#376bff': "#c2c3c8";
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
      indicatorStyle={{ backgroundColor: '#ff0' }}
      style={styles.tabviews}
      activeColor="#6d578b"
      inactiveColor="#c2c3c8"
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
    DocumentsTab    : state.DocumentsTab,
  }
};

const mapDispatchToProps = (dispatch)=>{
  return {
      driverDetails : (userId) => dispatch({type:"DRIVER_DETAILS",
                            userId : userId,
      })
  }
};
export default connect(mapStateToProps)(EmployeeProfileTabView);
