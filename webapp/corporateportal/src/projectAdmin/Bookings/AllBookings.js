import React, { Component }     from 'react';
import $                        from 'jquery';
import jQuery                   from 'jquery';
import axios                    from 'axios';
import swal                     from 'sweetalert';
import moment                   from 'moment';
import _                        from 'underscore';
import IAssureTable             from "./IAssureTable.js";
import BookingProfile           from './components/BookingProfile.js';
import BookingCity              from './components/BookingCity.js';
import CompanyList              from './components/CompanyList.js';

import "./BookingMaster.css";
import 'bootstrap/js/tab.js';

let vendor = ""

class AllBookings extends Component {
     
    constructor(props) {
        super(props);
        this.state = {
          dateTab   : 'Daily',
          status    : "New",
          bookingStatus    : "",
          selector:{},
          reset:false,
          gmapsLoaded: false,
          showSearchData: false,
          company_id:"",
          company:"",
          search:"",
          originatingCity:"",
          destinationCity:"",
          date:"",
          vendor_name:"",
          todayDate     : '--',
          newDateOne    : '',
          weekdays      : '--',
          monthlyState  : '--',
          fromdate      : '',
          todate        : '',
          booking_id        : '',
          currentYear  : moment().format('YYYY'),
          tableHeading:{
            BookingID:"Booking Number",
            Company:"Company",
            EmpIDName:"Employee Name & ID",
            Status:"Status",
            // BookingDateTime:"Booking Date & Time",
            Date:"Travel Date & Time",
            Destination:"Destination Details",
            vendor:"Vendor Details",
            action:"Action"

          },
          RecordsCount:'',
          RecordsTable:[],
          RecordsTableforWeek:[],
          RecordsTableforMonth:[],
          RecordsTableforYear:[],
          RecordsTableforCustom:[],
          tableObjects : {
          paginationApply : false,
          searchApply     : false
      }
        };
        this.handleChange = this.handleChange.bind(this);
        this.showUserDetails = this.showUserDetails.bind(this);
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


    componentDidMount() {
    this.cancelAllPastBookings();
      window.showUserDetails = this.showUserDetails;
      var company_ID = localStorage.getItem("companyID");
      axios.get('/api/entitymaster/getCompany/'+company_ID)
      .then((response)=>{
        this.setState({company_id:response.data._id},()=>{
          this.getData();
        })
      })
      .catch((err)=>{console.log(err)})
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


    }

    // componentWillReceiveProps(nextProps){
     
    //  this.getData()
      
    // }
   handleChange(event) {
        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: event.target.value
        },()=>{
          if(this.state.search){this.searchData()}else{
          if(Object.keys(this.state.selector).length == 0){this.getData()}else{this.getBookingData(this.state.selector)}
          }
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

        this.onSelectedItemsChange([name],event.target.value)

        this.setState({
            [name]: event.target.value
        });   
    }

    handleSearchChange(event) {
        const target = event.target;
        const name = target.name;

        this.setState({
            search: event.target.value
        },()=>{
        this.searchData()
        });   
    }

    searchData(){
      this.setState({showSearchData:true})
      var formValues ={
            str : this.state.search,
            company_id :this.state.company_id
            }
        axios.post('/api/bookingmaster/get/getcorporateSearchBookings',formValues)
      .then((response) => {
        var tableData = response.data.map((a, i)=>{
          var status = "";
          if(a.statusValue == "New" || a.statusValue == "Edited" || a.statusValue == "Allocated To Vendor" || a.statusValue == "Trip Allocated To Driver" || a.statusValue == "Running" || a.statusValue == "Started From Garage" || a.statusValue == "Ready To Bill" || a.statusValue == "Start From Pickup" || a.statusValue == "Intermediate Stop" || a.statusValue == "Change Request"){
           status = '<span class="label label-info">'+a.statusValue+'</span>'
          }else if(a.statusValue == "Manager Approved" ||a.statusValue == "PR Manager Approved" || a.statusValue == "Edited Manager Approved" || a.statusValue == "Driver Accepted" || a.statusValue == "Reached Pickup Location" || a.statusValue == "Start OTP Verified" || a.statusValue == "Reached Destination" || a.statusValue == "End OTP Verified" || a.statusValue == "Reached Drop Location" || a.statusValue == "Reached Garage" || a.statusValue == "Expense Submitted"){
            status = '<span class="label label-success">'+a.statusValue+'</span>'
          }else if(a.statusValue == "Manager Rejected" ||a.statusValue == "PR Manager Rejected" || a.statusValue == "Edited Manager Rejected" || a.statusValue == "Driver Rejected"){
            status = '<span class="label label-danger">'+a.statusValue+'</span>'
          }else if(a.statusValue == "Driver Changed By Vendor" || a.statusValue == "Cancelled By Vendor" || a.statusValue == "Cancelled By User"|| a.statusValue == "Cancelled"){
            status = '<span class="label label-warning">'+a.statusValue+'</span>'
          }else{
            status = '<span class="label label-info">'+a.statusValue+'</span>'
          }

        return{
              BookingID:'<div class="label label-primary btn btn-link" onclick=window.showUserDetails("' +a._id +'") data-toggle="modal" data-target="#showProfile" title="Show Booking Details">'+a.bookingId+'</div><br><div><i '+(a.person[0].gender == "Male" ? 'class="fa fa-male fa-lg faMale faGender"' : 'class="fa fa-female faFemale fa-lg faGender"')+' aria-hidden="true"></i></div>',
              Company:"<a  title='View company profile'  target='_blank' href='/company-profile/"+(a.corporateId)+"'>"+a.company[0].companyName +" (" +a.company[0].companyID+")"+"</a>",
              EmpIDName:"<b>Name :</b> "+"<a  title='View profile' target='_blank' href='/employee-profile/"+(a.employeeId)+"'>"+a.person[0].firstName + " " + a.person[0].lastName+"</a>" + " <br><b>Emp ID :</b> " + (a.person[0].employeeId? a.person[0].employeeId :"- NA -" )+'<br><b>Category : </b>'+a.person[0].empCategory+'<br><b>Priority : </b>'+(a.person[0].empPriority == "1" ? "★" : a.person[0].empPriority == "2" ? "★ ★" : "★ ★ ★"),
              Status:status,
              statusValue:a.statusValue,
              BookingDateTime:moment(a.createdAt).format('DD/MM/YYYY,HH:mm'),
              Date:moment(a.pickupDate).format('DD/MM/YYYY')+' , '+a.pickupTime,
              Destination:"<b>From : </b> "+a.from.address1+', '+a.from.address+', '+a.from.pincode+'<br> <b>To : </b> '+a.to.address1+', '+a.to.address+', '+a.to.pincode,
              fromCity:a.from.city,
              fromlat:a.from.latitude,
              fromlng:a.from.longitude,
              vendor:a.vendor[0] ? a.vendor[0].companyName : 'NA',
              vendor_id:a.vendor[0] ? a.vendor[0]._id : '',
              id:a._id,
              token:'D'
        }
      })
        var finalData = tableData.sort(function(x, y){
            return moment(x.Date) - moment(y.Date);
        })

          this.setState({searchRecordsTable:finalData})
      })
      .catch((error) =>{
          console.log("ERROR : ", error); 
      })
    }

    handleChangeStatus(event) {
        const target = event.target;
        const name = target.name;

        this.setState({
            bookingStatus: event.target.value,
        });   
    }

    selectFilter(event){
      $(".bookingfilterWrapper").toggle();
    }

    resetFilter(event) {
      event.preventDefault();
      this.setState({
        originatingCity:"",
        destinationCity:"",
        date:"",
        search:"",
        vendor_name:"",
        reset:true,
        selector:{}
      },()=>{
        this.getData()
      })
    }

    onSelectedItemsChange(filterType, selecteditems){
      var selector=this.state.selector;
      this.setState({
        reset:false
      });
      
      if(filterType === 'originatingCity'){
        selector.originatingCity  = selecteditems; 
      }
      if(filterType === 'destinationCity'){
        selector.destinationCity  = selecteditems; 
      }
      if(filterType === 'date'){
        selector.date  = selecteditems; 
        var todayDateSelected = selecteditems;
        var startDate = moment(todayDateSelected).startOf('day'); // set to 12:00 am today
        var endDate = moment(todayDateSelected).endOf('day'); // set to 23:59 pm today
        selector.from    = new Date(startDate);
        selector.to      = new Date(endDate);
      }
      if(filterType === 'vendor_name'){
          selector.vendor_name  = selecteditems; 
      }

      
      this.setState({ selector: selector },()=>{
        this.getBookingData(this.state.selector);
      })
    }

    showUserDetails(id){
      // var id = "#showProfile-"+id
      this.setState({booking_id:id},()=>{
        $('showProfile').show()
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
        if(this.state.search){this.searchData()}else{
        if(Object.keys(this.state.selector).length == 0){this.getData()}else{this.getBookingData(this.state.selector)}
        }
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
        if(this.state.search){
          this.searchData()
        }else{
          if(Object.keys(this.state.selector).length == 0){this.getData()}else{this.getBookingData(this.state.selector)}
        }
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
        if(this.state.search){
          this.searchData()
        }else{
          if(Object.keys(this.state.selector).length == 0){this.getData()}else{this.getBookingData(this.state.selector)}
        }
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
        if(this.state.search){
          this.searchData()
        }else{
          if(Object.keys(this.state.selector).length == 0){this.getData()}else{this.getBookingData(this.state.selector)}
        }
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
        if(this.state.search){
          this.searchData()
        }else{
          if(Object.keys(this.state.selector).length == 0){this.getData()}else{this.getBookingData(this.state.selector)}
        }
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
        if(this.state.search){
          this.searchData()
        }else{
          if(Object.keys(this.state.selector).length == 0){this.getData()}else{this.getBookingData(this.state.selector)}
        }
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
      swal('From date should not be less than To date')
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
        if(this.state.search){
          this.searchData()
        }else{
          if(Object.keys(this.state.selector).length == 0){this.getData()}else{this.getBookingData(this.state.selector)}
        }
    })

  }
  
  previousYear(event){
    event.preventDefault();
    var currentYear = this.state.currentYear;
    var newYear = moment(currentYear).subtract(1,'years').format('YYYY');
    this.setState({currentYear: newYear},()=>{
        if(this.state.search){
          this.searchData()
        }else{
          if(Object.keys(this.state.selector).length == 0){this.getData()}else{this.getBookingData(this.state.selector)}
        }
    })

  }

  getStatusData(event){
       var status = $(event.currentTarget).attr('data-status') 
       this.setState({
        status : status
       },()=>{
        if(this.state.search){
          this.searchData()
        }else{
          if(Object.keys(this.state.selector).length == 0){this.getData()}else{this.getBookingData(this.state.selector)}
        }

       }) 
    }

    changeTab(value,event){
      this.setState({dateTab:value},()=>{
        if(this.state.search){
          this.searchData()
        }else{
          if(Object.keys(this.state.selector).length == 0){this.getData()}else{this.getBookingData(this.state.selector)}
        }
      })
    }

  getBookingData(selector){
    var formValues ={
            company_id: this.state.company_id,
            startDate   : "",
            endDate     : "",
            status    : ['Vendor Rejected','Manager Approved','Edited Manager Approved','Change Request','PR Admin Edited','Driver Rejected','Vendor Accepted'],
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
        var status =this.state.status;
        
        if(status === "New"){
            formValues.status = ['Vendor Rejected','Manager Approved','Edited Manager Approved','Change Request','PR Admin Edited','Driver Rejected','PR Manager Approved','PR Manager Rejected'];
            formValues.tab = "New"
        }else if(status === "Allocated"){
            formValues.status = ['Trip Allocated To Driver','Driver Accepted','Allocated To Vendor','Vendor Accepted'];
            formValues.tab = "Allocated"
        }else if(status === "Running"){
            formValues.status = ['Started From Garage','Reached Pickup Location','Start From Pickup','Intermediate Stop','Reached Destination', 'Reached Drop Location','Reached Garage','Expense Submitted'];
            formValues.tab = "Running"
        }else if(status === "Unpaid"){
            formValues.status = ['Ready To Bill','Bill Generated','Unpaid','Trip Completed']
            formValues.tab = "Unpaid"
        }else if(status === "Paid"){
            formValues.status = ["Paid"]
            formValues.tab = "Paid"
        }else if(status === "PendingManagerApproval"){
            formValues.status = ['New','Edited']
            formValues.tab = "PendingManagerApproval"
        }else if(status === "Cancelled"){
            formValues.status = ['Cancelled By Vendor','Cancelled By User','Manager Rejected','Edited Manager Rejected','Cancelled','Vendor Rejected','Driver Rejected']
            formValues.tab = "Cancelled"
        }
        axios.post('/api/bookingmaster/get/corporateBookingfilter',formValues)
      .then((response) => {
        var tableData = response.data.map((a, i)=>{
          var status = "";
          if(a.statusValue == "New" || a.statusValue == "Edited" || a.statusValue == "Allocated To Vendor" || a.statusValue == "Trip Allocated To Driver" || a.statusValue == "Running" || a.statusValue == "Started From Garage" || a.statusValue == "Ready To Bill" || a.statusValue == "Start From Pickup" || a.statusValue == "Intermediate Stop" || a.statusValue == "Change Request"){
           status = '<span class="label label-info">'+a.statusValue+'</span>'
          }else if(a.statusValue == "Manager Approved" ||a.statusValue == "PR Manager Approved" || a.statusValue == "Edited Manager Approved" || a.statusValue == "Driver Accepted" || a.statusValue == "Reached Pickup Location" || a.statusValue == "Start OTP Verified" || a.statusValue == "Reached Destination" || a.statusValue == "End OTP Verified" || a.statusValue == "Reached Drop Location" || a.statusValue == "Reached Garage" || a.statusValue == "Expense Submitted"){
            status = '<span class="label label-success">'+a.statusValue+'</span>'
          }else if(a.statusValue == "Manager Rejected" ||a.statusValue == "PR Manager Rejected" || a.statusValue == "Edited Manager Rejected" || a.statusValue == "Driver Rejected"){
            status = '<span class="label label-danger">'+a.statusValue+'</span>'
          }else if(a.statusValue == "Driver Changed By Vendor" || a.statusValue == "Cancelled By Vendor" || a.statusValue == "Cancelled By User"|| a.statusValue == "Cancelled"){
            status = '<span class="label label-warning">'+a.statusValue+'</span>'
          }else{
            status = '<span class="label label-info">'+a.statusValue+'</span>'
          }

        return{
              BookingID:'<div class="label label-primary btn btn-link" onclick=window.showUserDetails("' +a._id +'") data-toggle="modal" data-target="#showProfile" title="Show Booking Details">'+a.bookingId+'</div><br><div><i '+(a.person[0].gender == "Male" ? 'class="fa fa-male fa-lg faMale faGender"' : 'class="fa fa-female fa-lg faFemale faGender"')+' aria-hidden="true"></i></div>',
              Company:"<a  title='View company profile'  target='_blank' href='/company-profile/"+(a.corporateId)+"'>"+a.company[0].companyName +" (" +a.company[0].companyID+")"+"</a>",
              EmpIDName:"<b>Name :</b> "+"<a  title='View profile' target='_blank' href='/employee-profile/"+(a.employeeId)+"'>"+a.person[0].firstName + " " + a.person[0].lastName+"</a>" + " <br><b>Emp ID :</b> " + (a.person[0].employeeId? a.person[0].employeeId :"- NA -" )+'<br><b>Category : </b>'+a.person[0].empCategory+'<br><b>Priority : </b>'+(a.person[0].empPriority == "1" ? "★" : a.person[0].empPriority == "2" ? "★ ★" : "★ ★ ★"),
              Status:status,
              statusValue:a.statusValue,
              BookingDateTime:moment(a.createdAt).format('DD/MM/YYYY,HH:mm'),
              Date:moment(a.pickupDate).format('DD/MM/YYYY')+' , '+a.pickupTime,
              Destination:"<b>From : </b> "+a.from.address1+', '+a.from.address+', '+a.from.pincode+'<br> <b>To : </b> '+a.to.address1+', '+a.to.address+', '+a.to.pincode,
              fromCity:a.from.city,
              fromlat:a.from.latitude,
              fromlng:a.from.longitude,
              vendor:a.vendor[0] ? a.vendor[0].companyName : 'NA',
              vendor_id:a.vendor[0] ? a.vendor[0]._id : '',
              id:a._id,
              token:'D'
        }
      })
        var finalData = tableData.sort(function(x, y){
            return moment(x.Date) - moment(y.Date);
        })

          this.setState({RecordsTable:finalData})
      })
      .catch((error) =>{
          console.log("ERROR : ", error); 
      })
  }


  getData(event){ 

    this.setState({reset:false})
        var formValues ={
          company_id: this.state.company_id,
            startDate   : "",
            endDate     : "",
            status    : ['Vendor Rejected','Manager Approved','Edited Manager Approved','Change Request','PR Admin Edited','Driver Rejected','Vendor Accepted']
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
        var status = this.state.status;
        
        if(status === "New"){
            formValues.status = ['Vendor Rejected','Manager Approved','Edited Manager Approved','Change Request','PR Admin Edited','Driver Rejected','PR Manager Approved','PR Manager Rejected'];
            formValues.tab = "New"
        }else if(status === "Allocated"){
            formValues.status = ['Trip Allocated To Driver','Driver Accepted','Allocated To Vendor','Vendor Accepted'];
            formValues.tab = "Allocated"
        }else if(status === "Running"){
            formValues.status = ['Started From Garage','Reached Pickup Location','Start From Pickup','Intermediate Stop','Reached Destination', 'Reached Drop Location','Reached Garage','Expense Submitted'];
            formValues.tab = "Running"
        }else if(status === "Unpaid"){
            formValues.status = ['Ready To Bill','Bill Generated','Unpaid','Trip Completed']
            formValues.tab = "Unpaid"
        }else if(status === "Paid"){
            formValues.status = ["Paid"]
            formValues.tab = "Paid"
        }else if(status === "PendingManagerApproval"){
            formValues.status = ['New','Edited']
            formValues.tab = "PendingManagerApproval"
        }else if(status === "Cancelled"){
            formValues.status = ['Cancelled By Vendor','Cancelled By User','Manager Rejected','Edited Manager Rejected','Cancelled',"Vendor Rejected","Driver Rejected"]
            formValues.tab = "Cancelled"
        }
        console.log('formValues==>',formValues)
        axios.post('/api/bookingmaster/get/getcorporateBookingList',formValues)
      .then((response) => {
        var tableData = response.data.map((a, i)=>{
          var status = "";
          if(a.statusValue == "New" || a.statusValue == "Edited" || a.statusValue == "Allocated To Vendor" || a.statusValue == "Trip Allocated To Driver" || a.statusValue == "Running" || a.statusValue == "Started From Garage" || a.statusValue == "Ready To Bill" || a.statusValue == "Start From Pickup" || a.statusValue == "Intermediate Stop" || a.statusValue == "Change Request"){
           status = '<span class="label label-info">'+a.statusValue+'</span>'
          }else if(a.statusValue == "Manager Approved" ||a.statusValue == "PR Manager Approved" || a.statusValue == "Edited Manager Approved" || a.statusValue == "Driver Accepted" || a.statusValue == "Reached Pickup Location" || a.statusValue == "Start OTP Verified" || a.statusValue == "Reached Destination" || a.statusValue == "End OTP Verified" || a.statusValue == "Reached Drop Location" || a.statusValue == "Reached Garage" || a.statusValue == "Expense Submitted"){
            status = '<span class="label label-success">'+a.statusValue+'</span>'
          }else if(a.statusValue == "Manager Rejected" ||a.statusValue == "PR Manager Rejected" || a.statusValue == "Edited Manager Rejected" || a.statusValue == "Driver Rejected"){
            status = '<span class="label label-danger">'+a.statusValue+'</span>'
          }else if(a.statusValue == "Driver Changed By Vendor" || a.statusValue == "Cancelled By Vendor" || a.statusValue == "Cancelled By User"|| a.statusValue == "Cancelled"){
            status = '<span class="label label-warning">'+a.statusValue+'</span>'
          }else{
            status = '<span class="label label-info">'+a.statusValue+'</span>'
          }

        return{
              BookingID:'<div class="label label-primary btn btn-link" onclick=window.showUserDetails("' +a._id +'") data-toggle="modal" data-target="#showProfile" title="Show Booking Details">'+a.bookingId+'</div><br><div><i '+(a.person[0].gender == "Male" ? 'class="fa fa-male faMale fa-lg faGender"' : 'class="fa fa-female faFemale fa-lg faGender"')+' aria-hidden="true"></i></div>',
              Company:"<a  title='View company profile'  target='_blank' href='/company-profile/"+(a.corporateId)+"'>"+a.company[0].companyName +" (" +a.company[0].companyID+")"+"</a>",
              EmpIDName:"<b>Name :</b> "+"<a  title='View profile' target='_blank' href='/employee-profile/"+(a.employeeId)+"'>"+a.person[0].firstName + " " + a.person[0].lastName+"</a>" + " <br><b>Emp ID :</b> " + (a.person[0].employeeId? a.person[0].employeeId :"- NA -" )+'<br><b>Category : </b>'+a.person[0].empCategory+'<br><b>Priority : </b>'+(a.person[0].empPriority == "1" ? "★" : a.person[0].empPriority == "2" ? "★ ★" : "★ ★ ★"),
              Status:status,
              statusValue:a.statusValue,
              BookingDateTime:moment(a.createdAt).format('DD/MM/YYYY,HH:mm'),
              Date:moment(a.pickupDate).format('DD/MM/YYYY')+' , '+a.pickupTime,
              Destination:"<b>From : </b> "+a.from.address1+', '+a.from.address+', '+a.from.pincode+'<br> <b>To : </b> '+a.to.address1+', '+a.to.address+', '+a.to.pincode,
              fromCity:a.from.city,
              fromlat:a.from.latitude,
              fromlng:a.from.longitude,
              // vendor:a.vendor[0] ? a.vendor[0].companyName : 'NA',
              vendor:a.vendor[0] ? "<a  title='View company profile'  target='_blank' href='/company-profile/"+(a.vendor[0]._id)+"'>"+a.vendor[0].companyName +" (" +a.vendor[0].companyID+")"+"</a>" : 'NA',
              vendor_id:a.vendor[0] ? a.vendor[0]._id : '',
              id:a._id,
              token:'D'
        }
      })
        var finalData = tableData.sort(function(x, y){
            return moment(x.Date) - moment(y.Date);
        })

          this.setState({RecordsTable:finalData})
      })
      .catch((error) =>{
          console.log("ERROR : ", error); 
      })
    }

  
    getCity(data){
      this.setState(data)
    }

    getCompanyData(data){
      this.setState(data)
    }

    showData(){
      if(Object.keys(this.state.selector).length == 0){
        console.log('1')
        this.getData()
      }else{
        console.log('2')
        this.getBookingData(this.state.selector)
      }
    }

    showAll(event){
      event.preventDefault();
      this.setState({showSearchData:false,search:""})
      this.showData()
    }


  render() {
    return (
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOPadding">
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
        <section className="content">   
          <div className="pageContent col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
              <h4 className="weighttitle col-lg-5 col-md-11 col-xs-11 col-sm-11">All Booking List</h4>
            </div>
            <section className="Content">
              <div className="row">


                <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 ">                  
                  <div className="col-lg-2 col-md-12 col-sm-12 col-xs-12 nopadding rowPadding">
                    <button type="button" className=" selectFilterBtn reset" onClick={this.selectFilter.bind(this)}>
                      <i className="fa fa-filter"></i>&nbsp;&nbsp;<b> SELECT FILTER</b>
                    </button>
                  </div>
                  <div className="col-lg-8 col-md-8 col-xs-12 col-sm-12 ">
                    <input type="text" name="search" value={this.state.search} onInput={this.handleSearchChange.bind(this)} className="form-control searchStyle searchBox" placeholder="Search Employee By Name or Booking No.."/>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bookingfilterWrapper rowPadding">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mgnBottom">
                  <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 nopadding">
                    <button type="button" className="reset selheight" onClick={this.resetFilter.bind(this)}>RESET FILTERS</button>
                  </div>
                  
                  <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                    <BookingCity label="Originating City" statename="originatingCity" reset={this.state.reset} onSelectedItemsChange={this.onSelectedItemsChange.bind(this)} getCity={this.getCity.bind(this)} />
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                    <BookingCity label="Destination City" statename="destinationCity" reset={this.state.reset} onSelectedItemsChange={this.onSelectedItemsChange.bind(this)} getCity={this.getCity.bind(this)} />
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                    <CompanyList label="Vendor" statename="vendor_name" entity="vendor" reset={this.state.reset} onSelectedItemsChange={this.onSelectedItemsChange.bind(this)} getCompanyData={this.getCompanyData.bind(this)} />
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 nopadding"></div>
                  
                  <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                    <label className="labelform col-lg-12 col-md-12 col-xs-12 col-sm-12">Travel Date</label>
                    <input type="date" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-control" name="date" id="date" ref="date" value={this.state.date} onChange={this.handleDateChange.bind(this)}/>
                  </div>
                </div>
                </div>
                {this.state.showSearchData === true ?
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <button className="btn btn-info ovalBtn col-lg-2 col-md-2 col-sm-2 col-xs-2 pull-right" onClick={this.showAll.bind(this)}>Go Back</button>
                    </div>
                    <IAssureTable
                      tableHeading={this.state.tableHeading}
                      twoLevelHeader={this.state.twoLevelHeader}
                      dataCount={this.state.searchRecordsCount}
                      tableData={this.state.searchRecordsTable}
                      tableObjects={this.state.tableObjects}
                      getData={this.searchData.bind(this)}
                      />
                  </div>
                  :
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
                                              <input type="date" className="todaysdate col-lg-4 col-md-4 col-sm-8 col-xs-8" name="todayDate" id="todayDate" onChange={this.handleChange.bind(this)} value={this.state.todayDate}/>

                                              <div className="input-group-addon nextAddon col-lg-2 col-md-2 col-sm-2 col-xs-2" id="nextDate" onClick={this.nextDate.bind(this)}>
                                                <span className="fa fa-caret-right nextarrow"></span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="tab-pane" id="Weekly">
                                          <div className="marginStyle col-lg-12 nopadding">
                                            <div className="col-lg-7 col-lg-offset-4 col-md-6 col-sm-12 col-xs-12 searchBoxBugt margintopReport">
                                              <div className="input-group-addon HRMSAddon col-lg-2 col-md-2 col-sm-2 col-xs-2" id="previousDate" onClick={this.previousWeek.bind(this)}>
                                                <span className="fa fa-caret-left nextarrow"></span>
                                              </div>
                                              
                                              <input type="week" className="todaysdate col-lg-4 col-md-4 col-sm-8 col-xs-8"  name="weekdays" id="weekpicker" onChange={this.handleChange.bind(this)} value={this.state.weekdays} />
                                              
                                              <div className="input-group-addon HRMSAddon nextAddon col-lg-2 col-md-2 col-sm-2 col-xs-2" id="nextDate" onClick={this.nextWeek.bind(this)}>
                                                <span className="fa fa-caret-right nextarrow"></span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="tab-pane" id="Monthly">
                                          <div className="marginStyle col-lg-12 nopadding">
                                          <div className="col-lg-7 col-lg-offset-4 col-md-6 col-sm-12 col-xs-12  searchBoxBugt  margintopReport">
                                            <div className="input-group-addon HRMSAddon col-lg-2 col-md-2 col-sm-2 col-xs-2" id="previousDate" onClick={this.previousMonth.bind(this)}>
                                              <span className="fa fa-caret-left nextarrow"></span>
                                            </div>
                                            
                                            <input type="month" className="todaysdate col-lg-3 col-md-3 col-sm-8 col-xs-8 nopadding" name="monthlyValue" id="monthlyValue" onChange={this.handleChange.bind(this)} value={this.state.monthlyState} />
                                            
                                            <div className="input-group-addon HRMSAddon nextAddon col-lg-2 col-md-2 col-sm-2 col-xs-2" id="nextDate" onClick={this.nextMonth.bind(this)}>
                                              <span className="fa fa-caret-right nextarrow"></span>
                                            </div>
                                          </div>
                                          </div>
                                        </div>
                                        <div className="tab-pane" id="Yearly">
                                          <div className="marginStyle col-lg-12 nopadding">
                                            <div className="form-group HRMSform-head-group col-lg-2 col-lg-offset-5">
                                                <div className="input-group yearlySalesInput">
                                                  <div className="input-group-addon HRMSAddon" id="previousYear" onClick={this.previousYear.bind(this)}>
                                                    <span className="fa fa-caret-left nextarrow"></span>
                                                  </div>
                                                  <input type="text" className="form-control yearlyValue" name="currentYear" id="currentYear" onChange={this.handleChange.bind(this)} value={this.state.currentYear}/>
                                                  <div className="input-group-addon HRMSAddon nextAddon" id="nextYear" onClick={this.nextYear.bind(this)}>
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
                                                <input className="form-control" type="date" name="fromDate" id="fromdate" onChange={this.fromdates.bind(this)}/>
                                              </label>
                                              <label className="col-lg-5 col-md-6 col-sm-12 col-xs-12">To
                                                <input className="form-control" type="date" name="toDate" id="todate" onChange={this.todates.bind(this)}/>
                                              </label>
                                            </div>
                                          </div>
                                        </div>
                                    </div>

                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                  <ul className="nav nav-tabs">
                                      <li className="active" onClick={this.getStatusData.bind(this)} data-status="New" ><a data-toggle="tab" href="#menu1">New Bookings </a></li>
                                      <li onClick={this.getStatusData.bind(this)} data-status="Allocated"><a data-toggle="tab" href="#menu3">Allocated</a></li>
                                      <li onClick={this.getStatusData.bind(this)} data-status="Running"  ><a data-toggle="tab" href="#menu4">Running</a></li>
                                      <li onClick={this.getStatusData.bind(this)} data-status="Unpaid"><a data-toggle="tab" href="#menu5">Unpaid</a></li>
                                      <li onClick={this.getStatusData.bind(this)} data-status="Paid"><a data-toggle="tab" href="#menu6">Paid</a></li>
                                      <li onClick={this.getStatusData.bind(this)} data-status="PendingManagerApproval"><a data-toggle="tab" href="#menu7">Pending Manager Approval</a></li>
                                      <li onClick={this.getStatusData.bind(this)} data-status="Cancelled"><a data-toggle="tab" href="#menu8">Cancelled</a></li>
                                  </ul>                    
                              </div>
                              <div className="tab-content col-lg-12 col-md-12 col-sm-12 col-xs-12 NOPadding">
                                  <div id="menu1" className="tab-pane fade in active">
                                      <div className="mt10">
                                          <IAssureTable
                                              tableHeading={this.state.tableHeading}
                                              twoLevelHeader={this.state.twoLevelHeader}
                                              dataCount={this.state.RecordsCount}
                                              tableData={this.state.RecordsTable}
                                              tableObjects={this.state.tableObjects}
                                              getData={this.getData.bind(this)}
                                              />
                                      </div>
                                  </div>
                              </div>

                     </div>
                </div>
              }
              </div>
            </section>
          </div>
        </section>
      </div>
    );
  }
}
export default AllBookings;

