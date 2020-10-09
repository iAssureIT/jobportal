import React,{Component} from 'react';
import { render } from 'react-dom';
import moment                   from 'moment';
import axios                    from 'axios';

import Statistics from './StatisticsBox/Statistics.js'
import PieChart from './Charts/PieChart.js'
import BarChart from './Charts/BarChart.js'
import Report from './Reports/Report.js'

export default class Dashboard extends Component{
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
                                        statusBy        : localStorage.getItem("user_ID"),
                                        statusAt        : new Date(),
                                    }
                    var formValues ={
                      booking_id:booking_id,
                      status:status,
                      userId:localStorage.getItem("user_ID")
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
	           		faIcon="fa-building"
	           		firstField={{"Field":"Total Corporate","method":"get","path":"/api/entitymaster/get/count/corporate"}} 
	           		secondField={{"Field":"Total Employees","method":"get","path":"/api/entitymaster/countContacts/corporate"}}
				      />
	           	<Statistics 
                display={true}
	           		bgColor="bg-red"
	           		faIcon="fa-handshake-o"
	           		firstField={{"Field":"Total Vendor","method":"get","path":"/api/entitymaster/get/count/vendor"}}
	           		secondField={{"Field":"Total Cars","method":"get","path":"/api/vehiclemaster/get/count"}}
	           	/>
	           	<Statistics
                display={true}
	           		bgColor="bg-green"
	           		faIcon="fa-car"
	           		firstField={{"Field":"YTD Booking","method":"get","path":"/api/bookingmaster/get/countDateRangeBookings/"+this.state.yearStart+"/"+this.state.yearEnd}}
	           		secondField={{"Field":"MTD Booking","method":"get","path":"/api/bookingmaster/get/countDateRangeBookings/"+this.state.monthStart+"/"+this.state.monthEnd}}
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
           		<PieChart
                display={true}
           			boxColor="box-success"
           			title="Car Category-wise Booking"
                api={{"method":"get","path":"/api/bookingmaster/get/categorywiseBooking/"+this.state.yearStart+"/"+this.state.yearEnd}} />
           		<PieChart
                display={true}
           			boxColor="box-default"
           			title="Corporate-wise Booking" 
                api={{"method":"get","path":"/api/bookingmaster/get/corporatewiseBooking/"+this.state.yearStart+"/"+this.state.yearEnd}} />
           	</div>
           	<div className="row">
           		<BarChart
                display={true}
           			boxColor="box-warning"
           			title="Month-wise Booking"
                api={{"method":"get","path":"/api/bookingmaster/get/monthwiseBooking/"+this.state.yearStart+"/"+this.state.yearEnd}} />
           		<Report
                display={true}
                tableHeading={["Booking Number","Location","Date"]}
           			boxColor="box-primary"
           			title="Ready To Bill"
                api={{"method":"get","path":"/api/bookingmaster/get/latestReadyToBillBookings"}}
                redirectlink="/billing-management" />
           	</div>
           </section>
        </div>
   );
  }
}




