import React,{Component} from 'react';
import { render } from 'react-dom';
import moment     from 'moment';
import axios from 'axios';
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

    axios.get("/api/entitymaster/getCompany/"+localStorage.getItem("companyID"))
    .then((response) => {
        localStorage.setItem("company_Id",response.data._id);
    })
    .catch((error) => {
    })

    var id = localStorage.getItem("user_ID");
    axios.get("/api/personmaster/getUserByUserId/"+id)
    .then((res) => {

      console.log('res==>',res)
        if(res.data && res.data.data[0]){
          this.setState({manager : res.data.data[0]._id})
        }
    })
    .catch((error) => {
      console.log('personmaster error=>',error)
    })

    if(localStorage.getItem("manager_Id")){
    this.setState({manager : localStorage.getItem("manager_Id")})
    }

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
            {/*{localStorage.getItem("roles") ? 
              localStorage.getItem("roles").includes('corporateadmin') ?
  	           	<Statistics 
                  display={true}
  	           		bgColor="bg-aqua"
  	           		faIcon="fa-user"
  	           		firstField={{"Field":"Active Employees","method":"get","path":"/api/personmaster/get/employeeCount/Active/"+localStorage.getItem("companyID")}} 
  	           		secondField={{"Field":"Inactive Employees","method":"get","path":"/api/personmaster/get/inactiveemployeeCount/Active/"+localStorage.getItem("companyID")}}
  				      />
                :
                null
              : null
            }
            {localStorage.getItem("roles").includes('manager') ?
              <Statistics 
                display={true}
                bgColor="bg-aqua"
                faIcon="fa-user"
                firstField={{"Field":"Pending Approvals","method":"get","path":"/api/bookingmaster/get/pendingStatusCount/New/"+localStorage.getItem("company_Id")+"/"+this.state.manager}} 
                secondField={{"Field":"Pending CR","method":"get","path":"/api/bookingmaster/get/pendingStatusCount/PR Admin Edited/"+localStorage.getItem("company_Id")+"/"+this.state.manager}}
              />
              :
              <Statistics 
                display={true}
                bgColor="bg-aqua"
                faIcon="fa-user"
                firstField={{"Field":"Pending Approvals","method":"get","path":"/api/bookingmaster/get/EmployeePendingApprovalCount/New/"+localStorage.getItem("company_Id")+'/'+localStorage.getItem("user_ID")}} 
                secondField={{"Field":"Upcoming Trips","method":"get","path":"/api/bookingmaster/get/EmployeeUpcomingTripCount/"+localStorage.getItem("company_Id")+"/"+localStorage.getItem("user_ID")}}
              />
            }
            {localStorage.getItem("roles").includes('corporateadmin') ?
	           	<Statistics 
                display={true}
	           		bgColor="bg-red"
	           		faIcon="fa-tripadvisor"
	           		firstField={{"Field":"Guest Travelled","method":"get","path":"/api/bookingmaster/get/TravelCount/"+this.state.yearStart+"/"+this.state.yearEnd+"/"+localStorage.getItem("company_Id")+"/guest"}}
	           		secondField={{"Field":"Employee Travelled","method":"get","path":"/api/bookingmaster/get/TravelCount/"+this.state.yearStart+"/"+this.state.yearEnd+"/"+localStorage.getItem("company_Id")+"/employee"}}
	           	/>
              :
              null
            }
              {localStorage.getItem("roles").includes('corporateadmin') ?
	           	<Statistics
                display={true}
	           		bgColor="bg-green"
	           		faIcon="fa-car"
	           		firstField={{"Field":"YTD Booking","method":"get","path":"/api/bookingmaster/get/countCorporateDateRangeBookings/"+this.state.yearStart+"/"+this.state.yearEnd+"/"+localStorage.getItem("company_Id")}}
	           		secondField={{"Field":"MTD Booking","method":"get","path":"/api/bookingmaster/get/countCorporateDateRangeBookings/"+this.state.monthStart+"/"+this.state.monthEnd+"/"+localStorage.getItem("company_Id")}}
	           	/>
              :
              <Statistics
                display={true}
                bgColor="bg-green"
                faIcon="fa-car"
                firstField={{"Field":"YTD Booking","method":"get","path":"/api/bookingmaster/get/countUserDateRangeBookings/"+this.state.yearStart+"/"+this.state.yearEnd+"/"+localStorage.getItem("company_Id")+"/"+localStorage.getItem("user_ID")}}
                secondField={{"Field":"MTD Booking","method":"get","path":"/api/bookingmaster/get/countUserDateRangeBookings/"+this.state.monthStart+"/"+this.state.monthEnd+"/"+localStorage.getItem("company_Id")+"/"+localStorage.getItem("user_ID")}}
              />
              }
              {localStorage.getItem("roles").includes('corporateadmin') ?
	           	<Statistics 
                display={true}
	           		bgColor="bg-yellow"
	           		faIcon="fa-file"
	           		firstField={{"Field":"Total Invoice"}}
	           		secondField={{"Field":"Unpaid Invoice"}}
	            />
              :
              <Statistics 
                display={true}
                bgColor="bg-yellow"
                faIcon="fa-file"
                firstField={{"Field":"Approved Bookings","method":"get","path":"/api/bookingmaster/get/countCorporateApprovalDateRangeBookings/"+this.state.yearStart+"/"+this.state.yearEnd+"/"+localStorage.getItem("company_Id")+"/"+localStorage.getItem("user_ID")+"/Manager Approved"}}
                secondField={{"Field":"Rejected Bookings","method":"get","path":"/api/bookingmaster/get/countCorporateApprovalDateRangeBookings/"+this.state.yearStart+"/"+this.state.yearEnd+"/"+localStorage.getItem("company_Id")+"/"+localStorage.getItem("user_ID")+"/Manager Rejected"}}
              />
              }
           	</div>
           	<div className="row">
           		<PieChart
                display={false}
           			boxColor="box-success"
           			title="Car Category-wise Booking"
                api={{"method":"get","path":"/api/bookingmaster/get/getCorporateMonthwiseBooking/"+this.state.yearStart+"/"+this.state.yearEnd+"/"+localStorage.getItem("company_Id")}} />
           		<PieChart
                display={false}
           			boxColor="box-default"
           			title="Corporate-wise Booking" 
                api={{"method":"get","path":"/api/bookingmaster/get/corporatewiseBooking/"+this.state.yearStart+"/"+this.state.yearEnd}} />
           	</div>
           	<div className="row">
            {localStorage.getItem("roles").includes('corporateadmin') ?
           		<BarChart
                display={true}
           			boxColor="box-warning"
           			title="Month-wise Booking"
                api={{"method":"get","path":"/api/bookingmaster/get/getCompanyMonthwiseBooking/"+this.state.yearStart+"/"+this.state.yearEnd+"/"+localStorage.getItem("company_Id")}} />
              :
              <BarChart
                display={true}
                boxColor="box-warning"
                title="Month-wise Booking"
                api={{"method":"get","path":"/api/bookingmaster/get/getUserMonthwiseBooking/"+this.state.yearStart+"/"+this.state.yearEnd+"/"+localStorage.getItem("company_Id")+"/"+localStorage.getItem("user_ID")}} />
            }
            {localStorage.getItem("roles").includes('corporateadmin') ?
                <BarChart
                display={true}
                boxColor="box-danger"
                title="Monthly Booking"
                api={{"method":"get","path":"/api/bookingmaster/get/getCompanyMonthlyBooking/"+this.state.monthStart+"/"+this.state.monthEnd+"/"+localStorage.getItem("company_Id")}} />
           	  :
              <BarChart
                display={true}
                boxColor="box-danger"
                title="Monthly Booking"
                api={{"method":"get","path":"/api/bookingmaster/get/getUserMonthlyBooking/"+this.state.monthStart+"/"+this.state.monthEnd+"/"+localStorage.getItem("company_Id")+"/"+localStorage.getItem("user_ID")}} />
              }
            </div>
            <div className="row">
            {localStorage.getItem("roles").includes('corporateadmin') ?
              <Report
                display={true}
                tableHeading={["Booking Number","Location","Date"]}
                boxColor="box-primary"
                title="Female Employee Bookings For Today"
                api={{"method":"get","path":"/api/bookingmaster/get/EmployeeTravelled_Company/"+localStorage.getItem("company_Id")}}
                redirectlink="/All_FemaleEmployee" />
                :
                <Report
                display={true}
                tableHeading={["Booking Number","Location","Date"]}
                boxColor="box-primary"
                title="Recent Bookings"
                api={{"method":"get","path":"/api/bookingmaster/get/EmployeeRecentBookings/"+localStorage.getItem("company_Id")+"/"+localStorage.getItem("user_ID")}}
                redirectlink="/booking-details" />
            }*/}
            </div>
           </section>
        </div>
   );
  }
}




