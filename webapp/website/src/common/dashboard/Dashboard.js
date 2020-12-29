import React,{Component} from 'react';
import { render } from 'react-dom';
import moment     from 'moment';
import axios      from 'axios';
import {connect}            from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../common/actions/index';

import Statistics from './StatisticsBox/Statistics.js'
import PieChart from './Charts/PieChart.js'
import BarChart from './Charts/BarChart.js'
import Report from './Reports/Report.js'
import ProgressBlock from './ProgressBlock/ProgressBlock.js'

class Dashboard extends Component{
	constructor(props) {
	   super(props);
	    this.state = {
	      monthStart:"",
	      monthEnd:"",
	      yearStart:"",
	      yearEnd:""
	    }
	}

  cancelAllPastBookings(){
      
      axios.patch('/api/bookingmaster/allPastBookings')
      .then((res) => {
        var bookingData = res.data;
        if(bookingData && bookingData.length > 0){
            for(var i=0 ; i<bookingData.length ; i++){
                var mPickupDate = moment(moment(bookingData[i].pickupDate).format('YYYY-MM-DD') + " " + bookingData[i].pickupTime);
                var reqDateTime = mPickupDate._d;
                var isafter = moment().isAfter(reqDateTime);
                if(isafter){
                    var booking_id = bookingData[i]._id;
                    var status = {
                                        value           : 'Cancelled',
                                        statusBy        : this.props.userDetails.user_id,
                                        statusAt        : new Date(),
                                    }
                    var formValues ={
                      booking_id:booking_id,
                      status:status,
                      userId:this.props.userDetails.user_id
                    }
                    axios.patch('/api/bookingmaster/updateCancelStatus',formValues)
                    .then((response) => {
                    })
                    .catch((error) =>{
                        console.log(error)
                    })
                }
            }//i
        }
      })
      .catch((error) =>{
          console.log(error)
      })
    }

	   
	componentDidMount(){

    this.cancelAllPastBookings()

    var yyyy = moment().format("YYYY");
    var monthNum = moment().format("MM");
    var currentMonth = yyyy+"-"+monthNum;

    var monthDateStart = new Date(moment(currentMonth).month("YYYY-MM"));//Find out first day of month with currentMonth
    var monthDateEnd = new Date(moment(currentMonth).add(1,"M"));
    this.setState({
      monthStart:monthDateStart,
      monthEnd:monthDateEnd
    });

    
    var currentYear = moment().format('YYYY');
    var yearDateStart = new Date("1/1/" + currentYear);
    var yearDateEnd = new Date (yearDateStart.getFullYear(), 11, 31);

    this.setState({
      yearStart : yearDateStart,
      yearEnd: yearDateEnd
    })
	}

  render(){
    return(
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOPadding">
           <section className="content">
           	<div className="row">
	           	<Statistics 
                display={true}
	           		bgColor="bg-aqua"
	           		faIcon="fa-info"
	           		firstField={{"Field":"Total Booking","method":"get","path":"/api/bookingmaster/get/countbookingListForVendor/"+this.state.monthStart+"/"+this.state.monthEnd+"/"+this.props.userDetails.user_id}} 
	           		secondField={{"Field":"Total City","method":"get","path":"/api/VendorAllocation/get/getCompanyCount/"+localStorage.getItem("company_Id")}}
				      />
	           	<Statistics 
                display={true}
	           		bgColor="bg-red"
	           		faIcon="fa-book"
	           		firstField={{"Field":"Cancelled Trip","method":"get","path":"/api/bookingmaster/get/getCancelledbookingCountForVendor/"+this.state.monthStart+"/"+this.state.monthEnd+"/"+localStorage.getItem("company_Id")}}
	           		secondField={{"Field":"Accepted Trip","method":"get","path":"/api/bookingmaster/get/getAcceptedbookingCountForVendor/"+this.state.monthStart+"/"+this.state.monthEnd+"/"+localStorage.getItem("company_Id")}}
	           	/>
	           	<Statistics
                display={true}
	           		bgColor="bg-green"
	           		faIcon="fa-car"
	           		firstField={{"Field":"Total Cars","method":"get","path":"/api/vehiclemaster/countCompanyVehicles/"+localStorage.getItem("company_Id")}}
	           		secondField={{"Field":"Total Drivers","method":"get","path":"/api/personmaster/get/companyDriverCount/"+localStorage.getItem("company_Id")}}
	           	/>
	           	<Statistics 
                display={true}
	           		bgColor="bg-yellow"
	           		faIcon="fa-file"
	           		firstField={{"Field":"Total Invoice"}}
	           		secondField={{"Field":"Unpaid Invoice"}}
	            />
           	</div>
            <div className="row">
              <ProgressBlock 
                display={true}
                bgColor="bg-yellow"
                faIcon="fa-user"
                Field={{"FieldName":"Driver Unassigned","method":"get","path":"/api/bookingmaster/get/getDriverUnassigned/"+localStorage.getItem("company_Id")}}
              />
              <ProgressBlock 
                display={true}
                bgColor="bg-green"
                faIcon="fa-hourglass-half"
                Field={{"FieldName":"Delayed Arrival","method":"get","path":"/api/bookingmaster/get/getCurrentTripEvent/arrived/"+localStorage.getItem("company_Id")}}
              />
              <ProgressBlock 
                display={true}
                bgColor="bg-red"
                faIcon="fa-hourglass-start"
                Field={{"FieldName":"Delayed Dispatch","method":"get","path":"/api/bookingmaster/get/getCurrentTripEvent/dispatch/"+localStorage.getItem("company_Id")}}
              />
              <ProgressBlock 
                display={true}
                bgColor="bg-aqua"
                faIcon="fa-car"
                Field={{"FieldName":"Pending Start Trip","method":"get","path":"/api/bookingmaster/get/getPendingTrip/start/"+localStorage.getItem("company_Id")}}
              />
              <ProgressBlock 
                display={true}
                bgColor="bg-orange"
                faIcon="fa-ticket"
                Field={{"FieldName":"Pending End Trip","method":"get","path":"/api/bookingmaster/get/getPendingTrip/end/"+localStorage.getItem("company_Id")}}
              />
              <ProgressBlock 
                display={true}
                bgColor="bg-purple"
                faIcon="fa-close"
                Field={{"FieldName":"Pending Close Duty","method":"get","path":"/api/bookingmaster/get/getPendingTrip/close/"+localStorage.getItem("company_Id")}}
              />
            </div>
           	<div className="row">
           		<PieChart
                display={true}
           			boxColor="box-success"
           			title="Car Category-wise Booking"
                api={{"method":"get","path":"/api/bookingmaster/get/categorywiseBookingForVendor/"+this.state.yearStart+"/"+this.state.yearEnd+"/"+localStorage.getItem("company_Id")}} />
           		<PieChart
                display={true}
           			boxColor="box-default"
           			title="Corporate-wise Booking" 
                api={{"method":"get","path":"/api/bookingmaster/get/corporatewiseBookingForvendor/"+this.state.yearStart+"/"+this.state.yearEnd+"/"+localStorage.getItem("company_Id")}} />
           	</div>
           	<div className="row">
           		<BarChart
                display={false}
           			boxColor="box-warning"
           			title="Month-wise Booking"
                api={{"method":"get","path":"/api/bookingmaster/get/getCompanyMonthwiseBooking/"+this.state.yearStart+"/"+this.state.yearEnd+"/"+localStorage.getItem("company_Id")}} />
                <BarChart
                display={false}
                boxColor="box-success"
                title="Monthly Booking"
                api={{"method":"get","path":"/api/bookingmaster/get/getCompanyMonthlyBooking/"+this.state.monthStart+"/"+this.state.monthEnd+"/"+localStorage.getItem("company_Id")}} />
           	</div>
            <div className="row">
              <Report
                display={true}
                tableHeading={["Booking Number","Location","Date"]}
                boxColor="box-primary"
                title="Latest Bookings"
                api={{"method":"get","path":"/api/bookingmaster/get/LatestbookingListForVendor/"+this.state.monthStart+"/"+this.state.monthEnd+"/"+localStorage.getItem("company_Id")}}
                redirectlink="/bookingList" />
                 <Report
                display={true}
                tableHeading={["Booking Number","Location","Date"]}
                boxColor="box-danger"
                title="Driver Rejected Bookings"
                api={{"method":"get","path":"/api/bookingmaster/get/RejectedByDriverBookings/"+this.state.monthStart+"/"+this.state.monthEnd+"/"+localStorage.getItem("company_Id")}}
                redirectlink="/bookingList" />
            </div>
           </section>
        </div>
   );
  }
}

const mapStateToProps = (state)=>{
    return {
        userDetails  : state.userDetails,
    }
}
const mapDispatchToProps = (dispatch) => ({
  mapAction :  bindActionCreators(mapActionCreator, dispatch)
}) 
export default connect(mapStateToProps,mapDispatchToProps) (ProgressBar)


