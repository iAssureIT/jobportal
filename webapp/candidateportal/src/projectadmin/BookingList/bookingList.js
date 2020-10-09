import React, { Component } from 'react';
import $                    from 'jquery';
import jQuery               from 'jquery';
import axios                from 'axios';
import moment               from 'moment';
import swal                 from 'sweetalert';
import { withRouter }       from 'react-router-dom';
import IAssureTable         from './IAssureTable.jsx';
import { Link }             from 'react-router-dom';
import { connect }          from 'react-redux';
import BookingProfile           from './BookingProfile.js'
import { CheckBoxSelection, Inject, MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import 'bootstrap/js/tab.js';
import "./bookingList.css"
var apiLink = "";
class BookingList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "user_ID"    : "",
            "editId"     :  '',
            "fieldValue" : "",
            tabtype       : "Daily",
            todayDate     : '--',
            newDateOne    : '',
            weekdays      : '--',
            monthlyState  : '--',
            fromdate      : '',
            todate        : '',
            companyIds    : [],
            searchText   : "",
            currentYear  : moment().format('YYYY'),
            "tableHeading": {
                bookingId              : "Booking ID",
                employeeName           : "Employee Details",
                company                : "Company Details",
                pickupDate             : "Pickup Date",
                pickupTime             : "Pickup Time",
                pickupAddress          : "Pickup Address",
                destinationAddress     : "Destination Address",
                // returnDate             : "Return Date",
                // returnTime             : "Return Time",
                noOfdays               : "No of Days",
                vehicleCategory        : "Vehicle Category",
                car                    : "Car",
                driver                 : "Driver",
                displayStatus          : "Status",
                bookingAction          : 'Action',
            },

            "tableObjects": {
                deleteMethod    : 'delete',
                apiLink         : '/api/vehicledrivermapping/',
                paginationApply : false,
                searchApply     : false,
                downloadApply   : true,
            },
            "startRange": 0,
            "limitRange": 1000000,
            "status"    : "New",
            "dateTab"   : 'Daily',
            "booking_id": '',
        };
        this.showUserDetails = this.showUserDetails.bind(this);
    }

    componentDidMount() {
        window.showUserDetails = this.showUserDetails;
        this.getData();
        this.cancelAllPastBookings();
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd;
        }
        if(mm<10){
            mm='0'+mm;
        }
        var today = yyyy+'-'+mm+'-'+dd;

        this.setState({
          todayDate : today,
        },()=>{this.getData()});

        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)

        this.setState({
          tomorrowDate : moment(tomorrow).format('YYYY-MM-DD')
        },()=>{this.getData()});

        var weeknumber = moment(today).week();
        if(weeknumber<=9){
          weeknumber="0"+weeknumber;
        }
        var yyyy = moment(today).format("YYYY");
        var weekVal = yyyy+"-W"+weeknumber;
        this.setState({
          weekdays:weekVal,
        },()=>{this.getData()});

        var yyyy = moment(today).format("YYYY");
        var monthNum = moment(today).format("MM");
        var currentMonth = yyyy+"-"+monthNum;
        this.setState({
          monthlyState:currentMonth,
        },()=>{this.getData()});

        var fromDt = new Date();
        var toDt = new Date(moment(fromDt).add(1,'d'));

        this.setState({
          fromdate : fromDt,
          toDate: toDt
        },()=>{this.getData()})

        var currentYear = moment().format('YYYY');

        this.setState({
          currentYear : currentYear
        },()=>{this.getData()})
        this.getCompany();
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
                        swal(error)
                    })
                }
            }//i
        }
      })
      .catch((error) =>{
          swal(error)
      })
    }


    noOfdays(date1,date2){
        // console.log(date1,date2);
        var date1 = new Date(date1); 
        var date2 = new Date(date2); 
        // To calculate the time difference of two dates 
        var Difference_In_Time = date2.getTime() - date1.getTime(); 
        // To calculate the no. of days between two dates 
        return Difference_In_Time / (1000 * 3600 * 24); 
    }

    getCompany(){
      axios.get('/api/entitymaster/get/corporate')
        .then((response) => {
          var entityArray = [];
              response.data.map((data, ind) => {
                  entityArray.push({ id: data._id, companyName: data.companyName })
              });
              this.setState({ entityArray: entityArray })
        })
        .catch((error) => {

        })

  }
    getData(event){ 
        var formValues ={
            company_Id  : localStorage.getItem("company_Id"),
            status      : ['Allocated To Vendor','Driver Rejected','Vendor Accepted'],
            startDate   : "",
            endDate     : "",
            companyIds  : [],
            searchText  : this.state.searchText
        }

        var dateTab = this.state.dateTab;
        if(dateTab === "Daily"){
            var todayDateSelected = this.state.todayDate;
            var startDate = moment(todayDateSelected).startOf('day'); // set to 12:00 am today
            var endDate = moment(todayDateSelected).endOf('day'); // set to 23:59 pm today
            formValues.startDate    = new Date(startDate);
            formValues.endDate      = new Date(endDate);
        }else if(dateTab === "NextDay"){
            var todayDateSelected = this.state.tomorrowDate;
            var startDate = moment(todayDateSelected).startOf('day'); // set to 12:00 am today
            var endDate = moment(todayDateSelected).endOf('day'); // set to 23:59 pm today
            formValues.startDate    = new Date(startDate);
            formValues.endDate      = new Date(endDate);
        }else if(dateTab === "Weekly"){
            var weekData = this.state.weekdays;
            var mondayInWeek = moment(weekData).day("Monday").week(weekData).format();
            var mondayInWeekDt = new Date(mondayInWeek);
            var sundayOfWeek = moment(mondayInWeek).add(7,"days").format();
            var sundayOfWeekDt = new Date(sundayOfWeek);
            formValues.startDate = mondayInWeekDt;
            formValues.endDate   = sundayOfWeekDt;
        }else if(dateTab === "Monthly"){
            var selectedMonth = this.state.monthlyState;
            var monthDateStart = new Date(moment(selectedMonth).month("YYYY-MM"));//Find out first day of month with selectedMonth
            var monthDateEnd = new Date(moment(selectedMonth).add(1,"M"));
            formValues.startDate = monthDateStart;
            formValues.endDate   = monthDateEnd;
        }else if(dateTab === "Yearly"){
            var selectedYear = this.state.currentYear;
            var yearDateStart = new Date("1/1/" + selectedYear);
            var yearDateEnd = new Date (yearDateStart.getFullYear(), 11, 31);
            formValues.startDate = yearDateStart;
            formValues.endDate   = yearDateEnd;
        }else if(dateTab === "Custom"){
            var fromDate = this.state.fromdate;
            var todate    = this.state.todate;
            formValues.startDate = new Date(fromDate);
            formValues.endDate   = new Date(todate);
        }
        if(this.state.companyIds.length > 0){
          formValues.companyIds = this.state.companyIds;
        }
        var status = event ? $(event.currentTarget).attr('data-status') : this.state.status;
        this.setState({status})
        
        if(status === "New"){
            formValues.status = ['Allocated To Vendor','Driver Rejected','Vendor Accepted','PR Admin Edited','PR Manager Approved'];
            formValues.tab = "New"
        }else if(status === "Allocated"){
            formValues.status = ['Trip Allocated To Driver','Driver Accepted'];
            formValues.tab = "Allocated"
        }else if(status === "Running"){
            formValues.status = ['Start OTP Verified','Started From Garage','Reached Pickup Location','Start From Pickup','Intermediate Stop','Reached Destination', 'End OTP Verified','Reached Drop Location','Reached Garage','Expense Submitted'];
            formValues.tab = "Running"
        }else if(status === "Completed"){
            formValues.status = ['Trip Completed']
            formValues.tab = "Completed"
        }else if(status === "Unpaid"){
            formValues.status = ['Ready To Bill','Invoice Unpaid','Bill Generated']
            formValues.tab = "Unpaid"
        }else if(status === "Paid"){
            formValues.status = ["Invoice Paid"]
            formValues.tab = "Paid"
        }else if(status === "Cancelled"){
            formValues.status = ['Cancelled By Vendor','Cancelled','Cancelled By User']
            formValues.tab = "Cancelled"
        }else if(status === "Rejected"){
            formValues.status = ['Vendor Rejected']
            formValues.tab = "Rejected"
        }
        // console.log("formValues",formValues);
        axios.post('/api/bookingmaster/post/bookingListForVendor', formValues)
        .then((response) => {
            var tableData = response.data.map((a, i)=>{
                var driverDetails = a.driverDetails;
                return {
                    _id                 : a._id,       
                    bookingId           : '<div class="label label-primary btn btn-link" onclick=window.showUserDetails("' +a._id +'") data-toggle="modal" data-target="#showProfile" title="Show Booking Details">'+a.bookingId+'</div>',
                    employeeName        : "<div class='locationWidth'><a target='_blank' href="+'/employee-profile/'+a.employee_id+">"+(a.employeeName)+"</div></a>"+"<div class='locationWidth'><span>Mobile No : </span>"+(a.employeeMobile)+"</div>",
                    company             : "<div class='locationWidth'><a target='_blank' href="+'/company-profile/'+a.company_id+">"+(a.companyName)+" ( "+(a.companyID)+" ) "+ "</div></a>",
                    pickupDate          : moment(a.pickupDate).format("DD-MMM-YYYY"),
                    pickUpCity          : a.from.district,
                    pickupTime          : a.pickupTime,
                    pickupAddress       : "<div class='locationWidth'>"+ (a.from.address ? a.from.address : " ")+"<p></div>" ,
                    destinationAddress  : "<div class='locationWidth'>"+ (a.to.address ? a.to.address : " ")+"<p></div>" ,
                    returnDate          : moment(a.pickupDate).format("DD-MMM-YYYY"),
                    returnTime          : a.pickupTime,
                    noOfdays            : parseInt(this.noOfdays(a.pickupDate, a.returnDate))+1,
                    vehicleCategory     : a.vehicleCategory,
                    car                 : a.vehicleBrand!==null ?( a.vehicleBrand+" "+a.vehicleModel+"<p>"+a.vehicleNumber+"</p>") : " ",
                    driver              : driverDetails && driverDetails.firstName!=="" ? "<div>"+driverDetails.firstName+" "+(driverDetails.middleName ? driverDetails.middleName : "")+" "+driverDetails.lastName+"<p>"+driverDetails.contactNo+"</p></div>" : " ",
                    displayStatus       : a.statusValue==="Driver Rejected" ?  a.statusValue+"<p>"+a.reamrk+ "</p>" :a.statusValue,
                    statusValue         : a.statusValue,
                    status              : a.status,
                    vehicle_id          : a.vehicle_id,
                    allocatedToVendor   : a.allocatedToVendor,
                }
            },()=>{
                // console.log('new',this.state.tableData);
            });
            this.setState({
              tableData : tableData,
            },()=>{
            });
        })
        .catch((error) => {
            console.log("error = ",error);
        })
    }

    close(event){
        var modal = document.getElementById("AllocateDriver");
        modal.style.display = "none";
        $('.modal-backdrop').remove();
    }

    nextWeek(event){
      event.preventDefault();
      var selectedWeek = $("input#weekpicker").val();
      var newWeekDt = moment(selectedWeek).add(1, 'weeks').format("YYYY-MM-DD");
      var newWeekNumber = moment(newWeekDt).week();
      //Construct the WeekNumber string as '2017-W01'
      if(newWeekNumber <= 9){
        newWeekNumber = '0'+newWeekNumber;
      }
      var yearNum=moment(newWeekDt).format("YYYY");
      var newWeek = yearNum+"-W"+newWeekNumber;
      this.setState({
        weekdays:newWeek,
      },()=>{this.getData()});
    }

    previousWeek(event){
      event.preventDefault();
      var selectedWeek = $("input#weekpicker").val();
      var newWeekDt = moment(selectedWeek).subtract(1, 'weeks').format("YYYY-MM-DD");
      var newWeekNumber = moment(newWeekDt).week();
      //Construct the WeekNumber string as '2017-W01'
      if(newWeekNumber <= 9){
        newWeekNumber = '0'+newWeekNumber;
      }else if(newWeekNumber === 53){
        newWeekNumber = 52;
      }
      var yearNum=moment(newWeekDt).format("YYYY");
      var newWeek = yearNum+"-W"+newWeekNumber;
      this.setState({
          weekdays:newWeek,
      },()=>{this.getData()});
    }

    nextDate(event){
      event.preventDefault();
      var selectedDate1 = $("input#todayDate").val();
      var selectedDate = selectedDate1.replace(/-/g, '\/');

      var newDate1 = new Date(selectedDate);
      var newDate2 = new Date(newDate1.getTime() + (24*60*60*1000) );
      var newDate3 = new Date(newDate2);
      var dd = newDate3.getDate();
      var mm = newDate3.getMonth()+1; //January is 0!
      var yyyy = newDate3.getFullYear();
      if(dd<10){
          dd='0'+dd;
      }
      if(mm<10){
          mm='0'+mm;
      }
      var newDate3 = yyyy+'-'+mm+'-'+dd;

      this.setState({
          todayDate : newDate3,
      },()=>{this.getData()});
    }

    previousDate(event){
      event.preventDefault();
      var selectedDate1 = $("input#todayDate").val();
      var selectedDate = selectedDate1.replace(/-/g, '\/');
      var newDate1 = new Date(selectedDate);
      var newDate2 = new Date(newDate1.getTime() - (24*60*60*1000) );
      // Session.set('newDate', newDate2);
      var newDate3 = new Date(newDate2);
      var dd = newDate3.getDate();
      var mm = newDate3.getMonth()+1; //January is 0!
      var yyyy = newDate3.getFullYear();
      if(dd<10){
          dd='0'+dd;
      }
      if(mm<10){
          mm='0'+mm;
      }
      var newDate3 = yyyy+'-'+mm+'-'+dd;
      this.setState({
        todayDate : newDate3,
      },()=>{this.getData()});
    }

    nextDateTab(event){
      event.preventDefault();
      var selectedDate1 = $("input#tomorrowDate").val();
      var selectedDate = selectedDate1.replace(/-/g, '\/');

      var newDate1 = new Date(selectedDate);
      var newDate2 = new Date(newDate1.getTime() + (24*60*60*1000) );
      var newDate3 = new Date(newDate2);
      var dd = newDate3.getDate();
      var mm = newDate3.getMonth()+1; //January is 0!
      var yyyy = newDate3.getFullYear();
      if(dd<10){
          dd='0'+dd;
      }
      if(mm<10){
          mm='0'+mm;
      }
      var newDate3 = yyyy+'-'+mm+'-'+dd;

      this.setState({
          tomorrowDate : newDate3,
      },()=>{this.getData()});
    }

    previousDateTab(event){
      event.preventDefault();
      var selectedDate1 = $("input#tomorrowDate").val();
      var selectedDate = selectedDate1.replace(/-/g, '\/');
      var newDate1 = new Date(selectedDate);
      var newDate2 = new Date(newDate1.getTime() - (24*60*60*1000) );
      // Session.set('newDate', newDate2);
      var newDate3 = new Date(newDate2);
      var dd = newDate3.getDate();
      var mm = newDate3.getMonth()+1; //January is 0!
      var yyyy = newDate3.getFullYear();
      if(dd<10){
          dd='0'+dd;
      }
      if(mm<10){
          mm='0'+mm;
      }
      var newDate3 = yyyy+'-'+mm+'-'+dd;
      this.setState({
        tomorrowDate : newDate3,
      },()=>{this.getData()});
    }

    nextMonth(event){
      event.preventDefault();
      var selectedMonth = $("input#monthlyValue").val();
      var newMonthDt = moment(selectedMonth).add(1, 'months').format("YYYY-MM-DD");
      var newMonthNumber = moment(newMonthDt).format("MM");
      //Construct the WeekNumber string as 'YYYY-MM'
      var yearNum=moment(newMonthDt).format("YYYY");
      var newMonth = yearNum+"-"+newMonthNumber;
      this.setState({
          monthlyState:newMonth,
      },()=>{this.getData()});
    }

    previousMonth(event){
      event.preventDefault();
      var selectedMonth = $("input#monthlyValue").val();

      var newMonthDt = moment(selectedMonth).subtract(1, 'months').format("YYYY-MM-DD");
      var newMonthNumber = moment(newMonthDt).format("MM");
      //Construct the WeekNumber string as 'YYYY-MM'
      var yearNum=moment(newMonthDt).format("YYYY");
      var newMonth = yearNum+"-"+newMonthNumber;
      this.setState({
          monthlyState:newMonth,
      },()=>{this.getData()});
    }

    fromdates(event){
      var selectedDate1 = $("input#fromdate").val();
      
      var dd = new Date(selectedDate1).getDate();
      var mm = new Date(selectedDate1).getMonth()+1; //January is 0!
      var yyyy = new Date(selectedDate1).getFullYear();
      if(dd<10){
          dd='0'+dd;
      }
      if(mm<10){
          mm='0'+mm;
      }
      var Fromdate = yyyy+'-'+mm+'-'+dd;
      this.setState({
          fromdate:Fromdate,
      },()=>{this.getData()});
    }
    todates(event){
      var selectedDate2 = $("input#todate").val();
      var dd       = new Date(selectedDate2).getDate();
      var mm       = new Date(selectedDate2).getMonth()+1; //January is 0!
      var yyyy     = new Date(selectedDate2).getFullYear();
      if(dd<10){
          dd='0'+dd;
      }
      if(mm<10){
          mm='0'+mm;
      }
      var Todate = yyyy+'-'+mm+'-'+dd;
     var dateCompare =  moment(Todate).isAfter(this.state.fromdate);
     if(dateCompare === true){
      this.setState({
          todate:Todate,
      },()=>{this.getData()});
     }else{
      swal('From date should not be less than To date')
      this.setState({
        todate:this.state.fromdate
      },()=>{this.getData()})
     }
      
    }

  nextYear(event){
    event.preventDefault();
    var currentYear = this.state.currentYear;
    var newYear = moment(currentYear).add(1,'years').format('YYYY');
    this.setState({currentYear: newYear},()=>{this.getData()})

  }
  
  previousYear(event){
    event.preventDefault();
    var currentYear = this.state.currentYear;
    var newYear = moment(currentYear).subtract(1,'years').format('YYYY');
    this.setState({currentYear: newYear},()=>{this.getData()})

  }

  showUserDetails(id){
      // var id = "#showProfile-"+id
      this.setState({booking_id:id},()=>{
        $('showProfile').show()
      })
    }

  
  handleChangeFilter(event){
    this.setState({
      companyIds : event.value,
    },()=>{
      this.getData();
    })
  }

  tableSearch(event) {
    var searchText = event.target.value;
    if (searchText && searchText.length !== 0) {
      this.setState({
        "searchText": searchText,
      }, () => {
        this.getData();
      });
    }else{
      this.setState({
        "searchText": "",
      }, () => {
        this.getData();
      });
    }
  }

  render() {
      const companyfields: object = { text: 'companyName', value: 'id' };
      return (
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOPadding">
              <section className="content">   
                  <div className="pageContent col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
                          <h4 className="weighttitle col-lg-5 col-md-11 col-xs-11 col-sm-11">All Booking List</h4>
                      </div>
                      <section className="Content">
                          <div className="row">
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-margin">
                                <div className="nav-center col-lg-10 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12 NOPadding" style={{height:'150px'}}>
                                     <ul className="nav nav-pills nav_pills">
                                          <li className="active col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                              <a href="#Daily" data-toggle="tab"  className="TabName" onClick={()=>this.setState({dateTab:"Daily"},()=>{this.getData()})}>
                                                Daily
                                              </a>
                                          </li>
                                           <li className="col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                              <a href="#NextDay" data-toggle="tab"  className="TabName" onClick={()=>this.setState({dateTab:"NextDay"},()=>{this.getData()})}>
                                                Next Day
                                              </a>
                                          </li>
                                          <li className="col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                              <a href="#Weekly" data-toggle="tab" className="TabName" onClick={()=>this.setState({dateTab:"Weekly"},()=>{this.getData()})}>
                                                Weekly
                                              </a>
                                          </li>
                                          <li className="col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                              <a href="#Monthly" data-toggle="tab" className="TabName" onClick={()=>this.setState({dateTab:"Monthly"},()=>{this.getData()})}>
                                                Monthly
                                              </a>
                                          </li>
                                          {/*<li className="col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                              <a href="#Yearly" data-toggle="tab" className="TabName" onClick={()=>this.setState({dateTab:"Yearly"},()=>{this.getData()})}>
                                                Yearly
                                              </a>
                                          </li>*/}
                                           <li className="col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                              <a href="#Custom" data-toggle="tab" className="TabName" onClick={()=>this.setState({dateTab:"Custom"},()=>{this.getData()})}>
                                                Date Range
                                              </a>
                                          </li>
                                      </ul>
                                      <div className="tab-content col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div className="tab-pane active" id="Daily">
                                          <div className="marginStyle col-lg-12 nopadding">
                                            <div className="col-lg-8 col-lg-offset-3 col-md-6 col-sm-12 col-xs-12 searchBoxBugt margintopReport">
                                              <div className="input-group-addon col-lg-2 col-md-2 col-sm-2 col-xs-2" id="previousDate" onClick={this.previousDate.bind(this)}>
                                                <span className="fa fa-caret-left nextarrow"></span>
                                              </div>          
                                              <input type="date" className="todaysdate col-lg-4 col-md-4 col-sm-8 col-xs-8" name="todayDate" id="todayDate" value={this.state.todayDate}/>

                                              <div className="input-group-addon nextAddon col-lg-2 col-md-2 col-sm-2 col-xs-2" id="nextDate" onClick={this.nextDate.bind(this)}>
                                                <span className="fa fa-caret-right nextarrow"></span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="tab-pane" id="NextDay">
                                          <div className="marginStyle col-lg-12 nopadding">
                                            <div className="col-lg-8 col-lg-offset-3 col-md-6 col-sm-12 col-xs-12 searchBoxBugt margintopReport">
                                              <div className="input-group-addon col-lg-2 col-md-2 col-sm-2 col-xs-2" id="previousDateTab" onClick={this.previousDateTab.bind(this)}>
                                                <span className="fa fa-caret-left nextarrow"></span>
                                              </div>          
                                              <input type="date" className="todaysdate col-lg-4 col-md-4 col-sm-8 col-xs-8" name="tomorrowDate" id="tomorrowDate" value={this.state.tomorrowDate}/>

                                              <div className="input-group-addon nextAddon col-lg-2 col-md-2 col-sm-2 col-xs-2" id="previousDateTab" onClick={this.nextDateTab.bind(this)}>
                                                <span className="fa fa-caret-right nextarrow"></span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="tab-pane" id="Weekly">
                                          <div className="marginStyle col-lg-12 nopadding">
                                            <div className="col-lg-8 col-lg-offset-3 col-md-6 col-sm-12 col-xs-12 searchBoxBugt margintopReport">
                                              <div className="input-group-addon HRMSAddon col-lg-2 col-md-2 col-sm-2 col-xs-2" id="previousDate" onClick={this.previousWeek.bind(this)}>
                                                <span className="fa fa-caret-left nextarrow"></span>
                                              </div>
                                              
                                              <input type="week" className="todaysdate col-lg-4 col-md-4 col-sm-8 col-xs-8"  name="weekdays" id="weekpicker" value={this.state.weekdays} />
                                              
                                              <div className="input-group-addon HRMSAddon nextAddon col-lg-2 col-md-2 col-sm-2 col-xs-2" id="nextDate" onClick={this.nextWeek.bind(this)}>
                                                <span className="fa fa-caret-right nextarrow"></span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="tab-pane" id="Monthly">
                                          <div className="marginStyle col-lg-12 nopadding">
                                          <div className="col-lg-8 col-lg-offset-3 col-md-6 col-sm-12 col-xs-12  searchBoxBugt  margintopReport">
                                            <div className="input-group-addon HRMSAddon col-lg-2 col-md-2 col-sm-2 col-xs-2" id="previousDate" onClick={this.previousMonth.bind(this)}>
                                              <span className="fa fa-caret-left nextarrow"></span>
                                            </div>
                                            
                                            <input type="month" className="todaysdate col-lg-4 col-md-4 col-sm-8 col-xs-8" name="monthlyValue" id="monthlyValue" value={this.state.monthlyState} />
                                            
                                            <div className="input-group-addon HRMSAddon nextAddon col-lg-2 col-md-2 col-sm-2 col-xs-2" id="nextDate" onClick={this.nextMonth.bind(this)}>
                                              <span className="fa fa-caret-right nextarrow"></span>
                                            </div>
                                          </div>
                                          </div>
                                        </div>
                                        <div className="tab-pane" id="Yearly">
                                          <div className="marginStyle col-lg-12 nopadding">
                                            <div className="form-group HRMSform-head-group col-lg-3 col-lg-offset-3">
                                                <div className="input-group yearlySalesInput">
                                                  <div className="input-group-addon HRMSAddon" id="previousYear" onClick={this.previousYear.bind(this)}>
                                                    <span className="fa fa-caret-left nextarrow"></span>
                                                  </div>
                                                  <input type="text" className="form-control yearlyValue" name="currentYear" id="currentYear" value={this.state.currentYear}/>
                                                  <div className="input-group-addon HRMSAddon nextAddon" id="nextYear" onClick={this.nextYear.bind(this)}>
                                                    <span className="fa fa-caret-right nextarrow"></span>
                                                  </div>
                                                </div>
                                            </div>
                                          </div>
                                        </div>
                                        
                                        <div className="tab-pane" id="Custom">
                                          <div className="marginStyle col-lg-12 nopadding">
                                            <div className="col-lg-6 col-lg-offset-2 col-md-6 col-sm-12 col-xs-12  searchBoxBugt margintopReport">
                                              <label className="col-lg-6 col-md-6 col-sm-12 col-xs-12">From
                                                <input className="form-control" type="date" name="fromDate" id="fromdate" onChange={this.fromdates.bind(this)}/>
                                              </label>
                                              <label className="col-lg-6 col-md-6 col-sm-12 col-xs-12">To
                                                <input className="form-control" type="date" name="toDate" id="todate" onChange={this.todates.bind(this)}/>
                                              </label>
                                            </div>
                                          </div>
                                        </div>
                                    </div>
                                  </div>
                                   
                                  <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
                                      <ul className="nav nav-tabs">
                                          <li className="active" onClick={this.getData.bind(this)} data-status="New" ><a data-toggle="tab" href="#menu1">New Bookings </a></li>
                                          <li onClick={this.getData.bind(this)} data-status="Allocated"><a data-toggle="tab" href="#menu2">Allocated</a></li>
                                          <li onClick={this.getData.bind(this)} data-status="Running"  ><a data-toggle="tab" href="#menu3">Running</a></li>
                                          <li onClick={this.getData.bind(this)} data-status="Completed"  ><a data-toggle="tab" href="#menu4">Completed</a></li>
                                          <li onClick={this.getData.bind(this)} data-status="Unpaid"><a data-toggle="tab" href="#menu5">Unpaid</a></li>
                                          <li onClick={this.getData.bind(this)} data-status="Paid"><a data-toggle="tab" href="#menu6">Paid</a></li>
                                          <li onClick={this.getData.bind(this)} data-status="Cancelled"><a data-toggle="tab" href="#menu7">Cancelled</a></li>
                                          <li onClick={this.getData.bind(this)} data-status="Rejected"><a data-toggle="tab" href="#menu8">Rejected</a></li>
                                      </ul>                    
                                  </div>
                                   <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 pull-right" style={{"marginTop":"8px"}}>
                                      <MultiSelectComponent id="companyChange" 
                                        // ref={(scope) => { this.dropDownListObject = scope; }} 
                                          style={{'borderColor': '#ddd'}}
                                          dataSource={this.state.entityArray}
                                          change={this.handleChangeFilter.bind(this)} mode='mode' 
                                          fields={companyfields} placeholder="Select Company" mode="CheckBox" 
                                          selectAllText="Select All" unSelectAllText="Unselect All" 
                                          showSelectAll={true}>
                                          <Inject services={[CheckBoxSelection]} />
                                      </MultiSelectComponent>
                                  </div>
                                 
                                  <div className="tab-content col-lg-12 col-md-12 col-sm-12 col-xs-12 NOPadding">
                                      <div id="menu1" className="tab-pane fade in active">
                                          <div className="mt10">
                                              <IAssureTable
                                                  tableHeading={this.state.tableHeading}
                                                  twoLevelHeader={this.state.twoLevelHeader}
                                                  dataCount={this.state.dataCount}
                                                  tableName={"Booking List"}
                                                  tableData={this.state.tableData}
                                                  tableObjects={this.state.tableObjects}
                                                  getData={this.getData.bind(this)}
                                                  tableSearch={this.tableSearch.bind(this)}
                                                  id={'bookingList'}
                                                  />
                                          </div>
                                      </div>
                                  </div>

                              </div>
                          </div>
                      </section>
                  </div>
              </section>
              {/*Modal*/}
              <div id="showProfile" className="modal in" aria-hidden="false" role="dialog">
                <div className="modal-dialog">

                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title col-md-4">Booking Profile</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <BookingProfile id={this.state.booking_id}  entity="AllBookings" />
                  </div>
                      <div className="modal-footer">
                      </div>
                    </div>
                     
                  </div>
                </div>
              {/*End Modal*/}
          </div>
      );
  }
}


const mapStateToProps = (state)=>{
  return {
    bookingList        : state.bookingList,
  }
};
const mapDispatchToProps = (dispatch)=>{
  return {
     bookingList  : (bookingList)=>dispatch({type: "BOOKING_LIST", bookingList: bookingList}),
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(BookingList));
