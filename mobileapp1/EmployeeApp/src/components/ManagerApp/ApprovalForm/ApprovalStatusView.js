import React from 'react';
import { 
          View,
          ImageBackground,
        } from 'react-native';
import axios                                                    from 'axios';
import styles                                                   from './styles.js';
import HeaderBar                                                from '../../../layouts/Header/Header.js';
import ApprovalStatusTabView                                    from './ApprovalStatusTabView.js'
import { connect }                                              from 'react-redux';

class ApprovalStatusView extends React.Component {
constructor(props) {
  super(props);
      this.state = {
    };
  }

  componentDidMount() {
        var bookingid = this.props.navigation.getParam('bookingid', 'No Id');
        console.log("bookingid in approval===>",bookingid);
        this.props.bookinginfo(bookingid) 
        
}
  render(){
      const { navigation } = this.props;
      const { navigate } = this.props.navigation;

      return(
        <React.Fragment>
          <View style={styles.overlay} />
          <HeaderBar navigation={navigation} showBackBtn={true} headerName={"Booking Status"}/>  
            <ApprovalStatusTabView navigation={navigation}/>  
        </React.Fragment>  
      );
  }

}





const mapStateToProps = (state) => {
  return {
    // selectedVehicle: state.selectedVehicle,
    // purposeofcar: state.purposeofcar,

  }
};

const mapDispatchToProps = (dispatch)=>{
return {
          bookinginfo : (bookingid) => dispatch({
          bookingid   : bookingid,
          type        : "MANAGER_BOOKING_DETAILS",
      
    })
}
};
export default connect(mapStateToProps,mapDispatchToProps)(ApprovalStatusView);
