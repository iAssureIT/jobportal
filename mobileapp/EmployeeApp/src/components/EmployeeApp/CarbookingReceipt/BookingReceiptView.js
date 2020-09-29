import React from 'react';
import { 
          View,
          ImageBackground,Text,Button,
        } from 'react-native';
import axios                                                    from 'axios';
import styles                                                   from './styles.js';
import HeaderBar                                                from '../../../layouts/Header/Header.js';
import CarbookingReceiptView                                   from './CarbookingReceiptTabView.js'
import { connect }                                              from 'react-redux';
import { Header, Icon, Card } from 'react-native-elements';
import Modal from "react-native-modal";

class BookingReceiptView extends React.Component {
constructor(props) {
  super(props);
      this.state = {
        bookedtrip : '',
    };
  }
  componentDidMount() {
        this.setState({ bookedtrip : true });
        var fullName = this.props.navigation.getParam('fullName', 'No Id');
        var employeeId = this.props.navigation.getParam('employeeId', 'No Id');
        var mobile = this.props.navigation.getParam('mobile', 'No Id');
        var bookingId = this.props.navigation.getParam('bookingId', 'No Id');
        // console.log("mobile in view",mobile);
        console.log("bookingId in receipt view",bookingId);
        console.log("employeeId in receipt view",employeeId);
        this.props.basicinfo(fullName,employeeId,mobile,bookingId,) 
        this.setState({fullName:fullName,employeeId:employeeId,mobile:mobile,bookingId:bookingId})
         
}
// componentWillReceiveProps(nextprops){
    
//         var fullName = nextprops.navigation.getParam('fullName', 'No Id');
//         var employeeId = nextprops.navigation.getParam('employeeId', 'No Id');
//         var mobile = nextprops.navigation.getParam('mobile', 'No Id');
//         var bookingId = nextprops.navigation.getParam('bookingId', 'No Id');
//         console.log("bookingId in receipt view",bookingId);
//         console.log("employeeId in receipt view",employeeId);
//         nextprops.basicinfo(fullName,employeeId,mobile,bookingId,) 
//         this.setState({fullName:fullName,employeeId:employeeId,mobile:mobile,bookingId:bookingId})
         
// }


  render(){
      const { navigation } = this.props;
      const { navigate } = this.props.navigation;

      return(
        <React.Fragment>
          <View style={styles.overlay} />
          <HeaderBar navigation={navigation} showBackBtn={true} headerName={"Booking Receipt"}/>  
            <CarbookingReceiptView  navigation={navigation} />  
            <Modal isVisible={this.state.bookedtrip}
                    onBackdropPress={() => this.setState({ bookedtrip: false })}
                    coverScreen={true}
                    hideModalContentWhileAnimating={true}
                    style={{ paddingHorizontal: '5%', zIndex: 999 }}
                    animationOutTiming={500}>
                    <View style={{ backgroundColor: "#fff", alignItems: 'center', borderRadius: 20, paddingVertical: 30, paddingHorizontal: 10 }}>
                        <View style={{ justifyContent: 'center', backgroundColor: "#34be34", width: 60, height: 60, borderRadius: 30, overflow: 'hidden' }}>
                            <Icon size={30} name='check' type='fontAwesome5' color='#fff' style={{}} />
                        </View>
                        <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 16, textAlign: 'center', justifyContent: 'center', marginTop: 20 }}>
                            Your booking is submitted. After Manager approval, system will send you car & driver details.
                        </Text>
                        <View style={{ width: '100%', marginTop: 15, paddingHorizontal: '10%' }}>
                            <Button
                            onPress={() => this.setState({ bookedtrip: false })}
                            // onPress =()=>{this.seState({key:value})}
                            titleStyle={styles.buttonText}
                            title="OK"
                            buttonStyle={styles.buttonSignUp}
                            containerStyle={styles.buttonContainer}
                            />
                        </View>
                    </View>
                </Modal>
        </React.Fragment>  
      );
  }

}


const mapStateToProps = (state) => {
  return {
    selectedVehicle: state.selectedVehicle,
    // purposeofcar: state.purposeofcar,

  }
};

const mapDispatchToProps = (dispatch)=>{
return {
        basicinfo: (fullName,employeeId,mobile,bookingId) => dispatch({
          fullName: fullName ,
          employeeId: employeeId ,
          mobile: mobile,
          bookingId: bookingId,
          type : "BASIC_INFO_RECEIPT",
      
    })
}
};
export default connect(mapStateToProps,mapDispatchToProps)(BookingReceiptView);