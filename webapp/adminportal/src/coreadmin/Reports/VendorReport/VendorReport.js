import React, { Component }     from 'react';
import $                        from 'jquery';
import jQuery                   from 'jquery';
import axios                    from 'axios';
import swal                     from 'sweetalert';
import moment                   from 'moment';
import _                        from 'underscore';
import IAssureTable             from "../../IAssureTable/IAssureTable.jsx";

import 'bootstrap/js/tab.js';


class VendorReport extends Component {
     
    constructor(props) {
        super(props);
        this.state = {
          dateTab   : 'Daily',
          status    : "New",
          bookingStatus    : "",
          selector:{},
          reset:false,
          gmapsLoaded: false,
          company:"",
          search:"",
          stateName:"",
          city:"",
          date:"",
          vendor_name:"",
          todayDate     : '--',
          newDateOne    : '',
          weekdays      : '--',
          monthlyState  : '--',
          fromdate      : '',
          todate        : '',
          booking_id        : '',
          companyArray:[],
          stateArrayList:[],
          cityArrayList:[],
          statusArrayList:[],
          currentYear  : moment().format('YYYY'),
          tableHeading:{
            ComapnyName:"Vendor Name & ID ",
            state:"State",
            city:"City",
            status:"Status",
            registeredOn:"Registered On",
            employeeCount:"Drivers",
            cars:"Cars",
            bookingCount:"Allocated Bookings",
            completed:"Completed",
            rejected:"Rejected",
            completed:"Completed",
            cancelled:"Cancelled",
            kmTravelled:"Km Travelled",
            totalBill:"Total Earning",

          },
          RecordsCount:'',
          RecordsTable:[],
          RecordsTableforWeek:[],
          RecordsTableforMonth:[],
          RecordsTableforYear:[],
          RecordsTableforCustom:[],
          tableObjects : {
            paginationApply : true,
            searchApply     : false,
            downloadApply   : true
          }
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
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

        this.getStates()
        this.getCompany()
        var entity = localStorage.getItem("company_Id")
        this.setState({
          entityid : 1
        })
    }

  handleChange(event) {
    const target = event.target;
    const name = target.name;

    this.setState({
        [name]: event.target.value
    });   
  }

  handleDateChange(event) {
    const target = event.target;
    const name = target.name;

    this.onSelectedItemsChange("date",event.target.value)

    this.setState({
        date: event.target.value
    });   
  }

  handleCityChange(event) {
    const target = event.target;
    const name = target.name;

    this.onSelectedItemsChange(name,event.target.value)

    this.setState({
        [name]: event.target.value
    },()=>{
      if(name === 'stateName'){
        this.getCity(this.state.stateName)
      }
    });   
  }

  getCity(state){
    var array = this.state.stateArrayList
    var cityData = array.filter((elem)=>{return elem.state === state});
    if(cityData && cityData.length > 0){
      this.setState({cityArrayList:cityData[0].city})
    }
  }

  
  onSelectedItemsChange(filterType, selecteditems){
    var selector=this.state.selector;
    
    if(filterType === 'company'){
        selector.company  = selecteditems; 
    }
    if(filterType === 'stateName'){
      selector.stateName  = selecteditems; 
    }
    if(filterType === 'city'){
      selector.city  = selecteditems; 
    }
    if(filterType === 'bookingStatus'){
        selector.status  = selecteditems; 
    }
    
    this.setState({ selector: selector },()=>{
      this.getBookingData(this.state.selector);
    })
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
    },()=>{
      if(Object.keys(this.state.selector).length == 0){this.getData()}else{this.getBookingData(this.state.selector)}
    });
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
    },()=>{
        if(Object.keys(this.state.selector).length == 0){this.getData()}else{this.getBookingData(this.state.selector)}
    });
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
    },()=>{
        if(Object.keys(this.state.selector).length == 0){this.getData()}else{this.getBookingData(this.state.selector)}
    });
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
    },()=>{
        if(Object.keys(this.state.selector).length == 0){this.getData()}else{this.getBookingData(this.state.selector)}
    });
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
    },()=>{
        if(Object.keys(this.state.selector).length == 0){this.getData()}else{this.getBookingData(this.state.selector)}
    });
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
    },()=>{
        if(Object.keys(this.state.selector).length == 0){this.getData()}else{this.getBookingData(this.state.selector)}
    });
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
          todate:Fromdate
      },()=>{
        if(this.state.search){
          this.searchData()
        }else{
          if(Object.keys(this.state.selector).length == 0){this.getData()}else{this.getBookingData(this.state.selector)}
        }
      });
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
      },()=>{
        if(this.state.search){
          this.searchData()
        }else{
          if(Object.keys(this.state.selector).length == 0){this.getData()}else{this.getBookingData(this.state.selector)}
        }
      });
     }else{
      swal('From date should be less than To date')
      this.setState({
        todate:this.state.fromdate
      },()=>{
        if(this.state.search){
          this.searchData()
        }else{
          if(Object.keys(this.state.selector).length == 0){this.getData()}else{this.getBookingData(this.state.selector)}
        }
      })
     }
      
    }


  nextYear(event){
    event.preventDefault();
    var currentYear = this.state.currentYear;
    var newYear = moment(currentYear).add(1,'years').format('YYYY');
    this.setState({currentYear: newYear},()=>{
      if(Object.keys(this.state.selector).length == 0){this.getData()}else{this.getBookingData(this.state.selector)}
    })
  }

  previousYear(event){
    event.preventDefault();
    var currentYear = this.state.currentYear;
    var newYear = moment(currentYear).subtract(1,'years').format('YYYY');
    this.setState({currentYear: newYear},()=>{
      if(Object.keys(this.state.selector).length == 0){this.getData()}else{this.getBookingData(this.state.selector)}
    })
  }

  changeTab(value,event){
      this.setState({dateTab:value},()=>{
        if(Object.keys(this.state.selector).length == 0){this.getData()}else{this.getBookingData(this.state.selector)}
      })
  }

  getBookingData(selector){
    var formValues ={
            startDate   : "",
            endDate     : "",
            entityType  : 'vendor',
            selector
        }
        var dateTab = this.state.dateTab;
        if(dateTab === "Daily"){
            var todayDateSelected = this.state.todayDate;
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
        axios.post('/api/reports/get/vendorReportsfilter',formValues)
      .then((response) => {
        var tableData = response.data.map((a, i)=>{
          function onlyUnique(value, index, self) { 
                return self.indexOf(value) === index;
            }

            var states = a.states.filter( onlyUnique );
            var cities = a.cities.filter( onlyUnique );

            return{
                ComapnyName:a.company,
                state:states && states.length > 0 ?states:'NA',
                city:cities && cities.length > 0 ?cities:'NA',
                status:a.status,
                registeredOn:a.registered,
                employeeCount:a.contactCount ,
                cars:a.carCount ,
                bookingCount:a.totalBookings ,
                completed:a.completedBookingCount,
                rejected:a.rejectedBookings,
                cancelled:a.cancelledBookings,
                kmTravelled:a.kmTravelled,
                totalBill:a.totalAmount,
            }
        })
          this.setState({RecordsTable:tableData})
      })
      .catch((error) =>{
          console.log("ERROR : ", error); 
      })
  }

  getStates(){
    axios.get('/api/reports/getCompany/vendor')
    .then((response)=>{
      this.setState({stateArrayList:response.data})
    })
    .catch((error) =>{
          console.log("ERROR : ", error); 
      })
  }
  getCompany(){
     axios.get('/api/entitymaster/get/vendor')
      .then((response) => {
        this.setState({
          companyArray: response.data
        })
      }).catch(function (error) {
      });
  }

  resetFilter(event) {
    event.preventDefault();
    this.setState({
      'company': '',
      'stateName' : '',
      'city':'',
      'selector' : {},
    })

    this.getData()
  }


  getData(event){ 

      var companyArray = [];
        var stateArrayList = [];
        var cityArrayList = [];
        var statusArray = [];
        var formValues ={
            startDate   : "",
            endDate     : "",
            entityType : "vendor",

        }
        var dateTab = this.state.dateTab;
        if(dateTab === "Daily"){
            var todayDateSelected = this.state.todayDate;
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
        axios.post('/api/reports/get/getVendorBookingList',formValues)
      .then((response) => {
        var tableData = response.data.map((a, i)=>{
          function onlyUnique(value, index, self) { 
                return self.indexOf(value) === index;
            }

            var states = a.states.filter( onlyUnique );
            var cities = a.cities.filter( onlyUnique );

            return{
              ComapnyName:a.company,
              state:states && states.length > 0 ?states:'NA',
              city:cities && cities.length > 0 ?cities:'NA',
              status:a.status,
              registeredOn:a.registered,
              employeeCount:a.contactCount ,
              cars:a.carCount ,
              bookingCount:a.totalBookings ,
              completed:a.completedBookingCount,
              rejected:a.rejectedBookings,
              cancelled:a.cancelledBookings,
              kmTravelled:a.kmTravelled,
              totalBill:a.totalAmount,
        }
      })
          this.setState({RecordsTable:tableData})
      })
      .catch((error) =>{
          console.log("ERROR : ", error); 
      })
    }

  getEntity() {
    var entity = localStorage.getItem("company_Id")
    this.setState({
      entityid : entity
    })

    axios.get('/api/entitymaster/get/' +entity)
      .then((response) => {
        this.setState({
          entityArray: response.data,
        })
      })
      .catch((error) => {

      })
  }

  render() {
    return (
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOPadding">
        <section className="content">   
          <div className="pageContent col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding">
              <h4 className="weighttitle col-lg-5 col-md-11 col-xs-11 col-sm-11">Vendor Report</h4>
            </div>
            <section className="Content">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                     <div className="reportWrapper col-lg-12 nopadding">
                          <div className="nav-center col-lg-10 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12">
                               <ul className="nav nav-pills nav_pills">
                                    <li className="active col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                        <a href="#Daily" data-toggle="tab" className="TabName" value="Daily" onClick={this.changeTab.bind(this,'Daily')}>
                                          Daily
                                        </a>
                                    </li>
                                    <li className="col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                        <a href="#Weekly" data-toggle="tab" className="TabName" value="Weekly" onClick={this.changeTab.bind(this,'Weekly')}>
                                          Weekly
                                        </a>
                                    </li>
                                    <li className="col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                        <a href="#Monthly" data-toggle="tab" className="TabName" value="Monthly" onClick={this.changeTab.bind(this,'Monthly')} >
                                          Monthly
                                        </a>
                                    </li>
                                    <li className="col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                        <a href="#Yearly" data-toggle="tab" className="TabName" value="Yearly" onClick={this.changeTab.bind(this,'Yearly')}>
                                          Yearly
                                        </a>
                                    </li>
                                     <li className="col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                        <a href="#Custom" data-toggle="tab" className="TabName" value="Custom" onClick={this.changeTab.bind(this,'Custom')}>
                                          Date Range
                                        </a>
                                    </li>
                  
                               </ul>
                          </div>
                          <div className="tab-content col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <div className="tab-pane active" id="Daily">
                                <div className="marginStyle col-lg-12 nopadding">
                                  <div className="col-lg-7 col-lg-offset-4 col-md-6 col-sm-12 col-xs-12 searchBoxBugt margintopReport">
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
                              <div className="tab-pane" id="Weekly">
                                <div className="marginStyle col-lg-12 nopadding">
                                  <div className="col-lg-7 col-lg-offset-4 col-md-6 col-sm-12 col-xs-12 searchBoxBugt margintopReport">
                                    <div className="input-group-addon  col-lg-2 col-md-2 col-sm-2 col-xs-2" id="previousDate" onClick={this.previousWeek.bind(this)}>
                                      <span className="fa fa-caret-left nextarrow"></span>
                                    </div>
                                    
                                    <input type="week" className="todaysdate col-lg-4 col-md-4 col-sm-8 col-xs-8"  name="weekdays" id="weekpicker" value={this.state.weekdays} />
                                    
                                    <div className="input-group-addon  nextAddon col-lg-2 col-md-2 col-sm-2 col-xs-2" id="nextDate" onClick={this.nextWeek.bind(this)}>
                                      <span className="fa fa-caret-right nextarrow"></span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="tab-pane" id="Monthly">
                                <div className="marginStyle col-lg-12 nopadding">
                                <div className="col-lg-7 col-lg-offset-4 col-md-6 col-sm-12 col-xs-12  searchBoxBugt  margintopReport">
                                  <div className="input-group-addon  col-lg-2 col-md-2 col-sm-2 col-xs-2" id="previousDate" onClick={this.previousMonth.bind(this)}>
                                    <span className="fa fa-caret-left nextarrow"></span>
                                  </div>
                                  
                                  <input type="month" className="todaysdate col-lg-3 col-md-3 col-sm-8 col-xs-8 nopadding" name="monthlyValue" id="monthlyValue" value={this.state.monthlyState} />
                                  
                                  <div className="input-group-addon  nextAddon col-lg-2 col-md-2 col-sm-2 col-xs-2" id="nextDate" onClick={this.nextMonth.bind(this)}>
                                    <span className="fa fa-caret-right nextarrow"></span>
                                  </div>
                                </div>
                                </div>
                              </div>
                              <div className="tab-pane" id="Yearly">
                                <div className="marginStyle col-lg-12 nopadding">
                                  <div className="form-group HRMSform-head-group searchBoxBugt   col-lg-2 col-lg-offset-5">
                                      <div className="input-group yearlySalesInput">
                                        <div className="input-group-addon " id="previousYear" onClick={this.previousYear.bind(this)}>
                                          <span className="fa fa-caret-left nextarrow"></span>
                                        </div>
                                        <input type="text" className="form-control yearlyValue" name="currentYear" id="currentYear" value={this.state.currentYear}/>
                                        <div className="input-group-addon  nextAddon" id="nextYear" onClick={this.nextYear.bind(this)}>
                                          <span className="fa fa-caret-right nextarrow"></span>
                                        </div>
                                      </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="tab-pane" id="Custom">
                                  <div className="marginStyle col-lg-12 nopadding">
                                    <div className="col-lg-6 col-lg-offset-3 col-md-6 col-sm-12 col-xs-12  searchBoxBugt margintopReport">
                                      <label className="col-lg-5 col-md-6 col-sm-12 col-xs-12">From
                                        <input className="form-control" type="date" name="fromdate" id="fromdate" value={this.state.fromdate} onChange={this.fromdates.bind(this)}/>
                                      </label>
                                      <label className="col-lg-5 col-md-6 col-sm-12 col-xs-12">To
                                        <input className="form-control" type="date" name="todate" id="todate" value={this.state.todate} onChange={this.todates.bind(this)}/>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                          </div>
                         <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 ">                  
                  <div className="col-lg-2 col-md-12 col-sm-12 col-xs-12 nopadding">
                          <button type="button" className="reset selheight" onClick={this.resetFilter.bind(this)}>RESET FILTERS</button>
                        </div>                 
                  <div className="form-margin col-lg-3 col-md-6 col-sm-12 col-xs-12 driver employee" >
                    <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Company</label>
                    <select id="company" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.company} ref="company" name="company" onChange={this.handleCityChange.bind(this)}>
                      <option value="" disabled>Select Company</option>
                      {
                        this.state.companyArray && this.state.companyArray.length > 0 ?
                          this.state.companyArray.map((data, i) => {
                            return (
                              <option key={i} value={data._id}>{data.companyName}</option>
                            );
                          })
                          :
                          null
                      }
                    </select>
                  </div>
                  <div className="form-margin col-lg-3 col-md-6 col-sm-12 col-xs-12 driver employee" >
                    <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">State</label>
                    <select id="stateName" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.stateName} ref="stateName" name="stateName" onChange={this.handleCityChange.bind(this)}>
                      <option value="" disabled>Select State</option>
                      {
                        this.state.stateArrayList && this.state.stateArrayList.length > 0 ?
                          this.state.stateArrayList.map((data, i) => {
                            return (
                              <option key={i} >{data.state}</option>
                            );
                          })
                          :
                          null
                      }
                    </select>
                  </div>
                  <div className="form-margin col-lg-3 col-md-6 col-sm-12 col-xs-12 driver employee" >
                    <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">City</label>
                    <select id="city" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.city} ref="city" name="city" onChange={this.handleCityChange.bind(this)}>
                      <option value="" disabled>Select City</option>
                      {
                        this.state.cityArrayList && this.state.cityArrayList.length > 0 ?
                          this.state.cityArrayList.map((data, i) => {
                            return (
                              <option key={i} value={data}>{data}</option>
                            );
                          })
                          :
                          null
                      }
                    </select>
                  </div>
                </div>
                      <div className="tab-content col-lg-12 col-md-12 col-sm-12 col-xs-12 NOPadding">
                          <div id="menu1" className="tab-pane fade in active">
                              <div className="mt10">
                                  <IAssureTable
                                      tableHeading={this.state.tableHeading}
                                      twoLevelHeader={this.state.twoLevelHeader}
                                      id={this.state.entityid}
                                      dataCount={this.state.RecordsCount}
                                      tableData={this.state.RecordsTable}
                                      tableObjects={this.state.tableObjects}
                                      tableName="Vendor_Report"
                                      getData={this.getData.bind(this)}
                                      />
                              </div>
                          </div>
                      </div>
                    </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    );
  }
}
export default VendorReport;

