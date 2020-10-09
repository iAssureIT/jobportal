import React, { Component } from 'react';
import $                    from 'jquery';
import axios                from 'axios';
import _                    from 'underscore';
import moment                   from 'moment';

import EmployeeDetails        from './components/EmployeeDetails.js';
import TripDetails            from './components/TripDetails.js';
import CarDetails             from './components/CarDetails.js';
import EstimatedCost          from './components/EstimatedCost.js';
import ManagerApproval        from './components/ManagerApproval.js';
import ChangeRequest        from './components/ChangeRequest.js';
import ChangeRequestView        from './components/ChangeRequestView.js';
import IAssureTable             from "./IAssureTable.js";


import swal                 from 'sweetalert';
import 'bootstrap/js/tab.js';

class BookingDetils extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookingData: [],
            id:"",
            empID:"",
            tripArray:[],
            category  :"",
            view : 'Grid',
            // brand:"",
            // model:"",
            // capacity:"",
            filteredStatus:"",
            filteredMonth:'',
            filteredYear:'',
            bookingCount:"",
            bookingNumber:"",
            managerId:"",
            selector:{},
            yearArray:[],
            filteredCount:0,
            tableHeading:{
              BookingID:"Booking Number",
              Company:"Company",
              EmpIDName:"Employee Name & ID",
              Status:"Status",
              BookingDateTime:"Booking Date & Time",
              Date:"Travel Date & Time",
              Destination:"Destination Details",
              estimatedCost:"Estimated Cost",
              // actions:"Actions"

            },
            RecordsCount:'',
            RecordsTable:[],
            tableObjects : {
                paginationApply : false,
                searchApply     : false
            }
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.ShowForm = this.ShowForm.bind(this);
        this.camelCase = this.camelCase.bind(this);
        this.editBooking = this.editBooking.bind(this);
        this.showModal = this.showModal.bind(this);
        this.cancelBooking = this.cancelBooking.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: event.target.value
        });
    }

    handleStatusChange(event) {
        const target = event.target;
        this.setState({
            filteredStatus: event.target.value,
            bookingNumber:"",
            id:""
        },()=>{
                this.getBookingData(this.state.filteredStatus)
            });
    }

 componentDidMount() {
      window.editBooking = this.editBooking;
      window.showModal = this.showModal;
      window.cancelBooking = this.cancelBooking;
        this.getData();
        this.getyear();
        var createdBy = localStorage.getItem("user_ID")
        axios.get("/api/bookingmaster/get/count/"+createdBy)
        .then((response) => {
            this.setState({'bookingCount':response.data.count})
        })
        .catch((error) =>{
            console.log('error: ',error)
        })
        var currentYear = moment().format('YYYY');
        this.setState({filteredYear:currentYear})
        
    }


    componentWillReceiveProps(nextProps){
      this.getData();
      this.getyear();
    }

    getyear(){
      var thisYear = (new Date()).getFullYear();
      var yearArray = [];
      for (var i = 2000; i <= thisYear; i++) {
        yearArray.push({year:i})
      }
      this.setState({yearArray:yearArray})
    }

    selectFilter(event){
      $(".bookingfilterWrapper").toggle();
    }

    resetFilter(event) {
      // event.preventDefault();
      this.setState({
        filteredStatus:'',
        filteredMonth:'',
        filteredYear:moment().format('YYYY'),
        filteredCount:0
      },()=>{
        this.getData()
      })
    }

    onSelectedItemsChange(filterType, selecteditems){
      var selector=this.state.selector;
      this.setState({
          [selecteditems.currentTarget.getAttribute('name')]: selecteditems.currentTarget.value
        });
      
      if(filterType === 'filteredStatus'){
        selector.filteredStatus  = selecteditems.currentTarget.value; 
      }
      if(filterType === 'filteredMonth'){
        selector.filteredMonth  = selecteditems.currentTarget.value; 
        var selectedMonth = this.state.filteredYear+"-"+selecteditems.currentTarget.value;
        var start = new Date(moment(selectedMonth).month("YYYY-MM"));//Find out first day of month with selectedMonth
        var end = new Date(moment(selectedMonth).add(1,"M"));
        selector.monthStart = start;
        selector.monthEnd = end;
      }
      if(filterType === 'filteredYear'){
        selector.filteredYear  = selecteditems.currentTarget.value; 
        if(this.state.filteredMonth == "" || this.state.filteredMonth == 'All'){
          var selectedYear = selecteditems.currentTarget.value;
          var yearDateStart = new Date("1/1/" + selectedYear);
          var yearDateEnd = new Date (yearDateStart.getFullYear(), 11, 31);
          selector.yearStart = yearDateStart;
          selector.yearEnd = yearDateEnd
        }
      }
      
      this.setState({ selector: selector },()=>{
        this.getBookingData(this.state.selector);
      })
    }
  

    getData(){
      var createdBy = localStorage.getItem("user_ID")

        axios.get("/api/bookingmaster/get/getBookingsOfUser/"+createdBy)
        .then((response) => {
            this.setState({'bookingData':response.data,
                // showDetails:true,
                managerId:response.data[0].managerId1,
                managerID:response.data[0].managerID1,
                id:response.data[0]._id,
                bookingNumber:response.data[0].bookingId,
                empID :response.data[0].employeeId,
                estimatedCost :response.data[0].estimatedCost,
                status :response.data[0].statusValue,
                approvalRequired : response.data[0].approvalRequired,
                bookingDate:moment(response.data[0].createdAt).format('DD/MM/YYYY') },()=>{  
                    axios.get('/api/bookingmaster/get/booking/'+this.state.id)
                    .then((response) => {
                        axios.get("/api/categorymaster/get/one/"+response.data.data[0].vehicleCategoryId)
                  .then((res) => {
                    this.setState({
                      category  :res.data.category,
                    },()=>{
                        var array = {
                          from    : response.data.data[0].from.address,
                          fromAddress1    : response.data.data[0].from.address1,
                          fromPincode    : response.data.data[0].from.pincode,
                          toAddress1    : response.data.data[0].to.address1,
                          toPincode    : response.data.data[0].to.pincode,
                          pickupDate : response.data.data[0].pickupDate,
                          pickupTime : response.data.data[0].pickupTime,
                          returnDate : response.data.data[0].returnDate,
                          to         : response.data.data[0].to.address,
                          returnTime : response.data.data[0].returnTime,
                          bookingType : response.data.data[0].tripType,
                          purposeOfTravel: purpose,
                          instructions  :response.data.data[0].specialInstruction,
                          selectedVehicle  :this.state.category,
                          stopArr : response.data.data[0].intermediateStops,
                          reasonForSelectingVehicle  :response.data.data[0].reasonForSelectingVehicle,
                        }

                        this.setState({tripArray:array})
                    })
                })
                .catch((error) => {
                    console.log('error: ',error)
                })
                          if(response.data.data[0].purposeOfTravel == "Other"){
                            var purpose = response.data.data[0].purposeOfTravelOther
                          }else{
                            var purpose = response.data.data[0].purposeOfTravel
                          }
                        var array = {
                          from    : response.data.data[0].from.address,
                          fromAddress1    : response.data.data[0].from.address1,
                          fromPincode    : response.data.data[0].from.pincode,
                          toAddress1    : response.data.data[0].to.address1,
                          toPincode    : response.data.data[0].to.pincode,
                          pickupDate : response.data.data[0].pickupDate,
                          pickupTime : response.data.data[0].pickupTime,
                          returnDate : response.data.data[0].returnDate,
                          to         : response.data.data[0].to.address,
                          returnTime : response.data.data[0].returnTime,
                          bookingType : response.data.data[0].tripType,
                          purposeOfTravel: purpose,
                          instructions  :response.data.data[0].specialInstruction,
                          selectedVehicle  :this.state.category,
                          stopArr : response.data.data[0].intermediateStops,
                          reasonForSelectingVehicle : response.data.data[0].reasonForSelectingVehicle,
                          brand:this.state.brand,
                          model:this.state.model,
                          capacity:this.state.capacity,
                        }
                        this.setState({'tripArray':array,status:response.data.data[0].statusValue})
                    })
                    .catch((error) =>{

                    })
                });
              if(response.data[0] && this.state.view == 'Grid'){
                document.getElementById(response.data[0]._id).classList.add("selectedEmployee")
               }
            //Grid View//
            if(response.data && response.data.length > 0){
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

                
                if(a.statusValue === 'New' || a.statusValue === 'Manager Approved' || a.statusValue === "Cancelled By User" || a.statusValue === 'Manager Rejected' || a.statusValue === 'Edited' || a.statusValue === 'Edited Manager Approved' || a.statusValue === 'Edited Manager Rejected' || a.statusValue === 'Allocated To Vendor'){
                  var action1 = '<button title="Edit" id='+a._id+' class="btn-primary fa fa-pencil" data-index data-id='+a._id+' onClick=window.editBooking()></button>' 
                }else{
                  var action1 = '<button title="Change" data-toggle="modal" data-target="#changeRequest" id='+a._id+' class="btn-primary fa fa-pencil" data-index data-id='+a._id+' onClick=window.showModal()></button>' 
                }
                  var action2 = '<button title="Cancel" id='+a._id+' class="btn-danger fa fa-stop" data-index data-id='+a._id+' onClick=window.cancelBooking()></button>' 

              return{
                BookingID:'<div class="label label-primary">'+a.bookingId+'</div><br><div><i '+(a.person[0].gender == "Male" ? 'class="fa fa-male fa-lg faMale faGender"' : 'class="fa fa-female fa-lg faFemale faGender"')+' aria-hidden="true"></i></div>',
                Company:"<a  title='View company profile'  target='_blank' href='/company-profile/"+(a.corporateId)+"'>"+a.company[0].companyName +" (" +a.company[0].companyID+")"+"</a>",
                EmpIDName:"<a  title='View profile' target='_blank' href='/employee-profile/"+(a.employeeId)+"'>"+a.person[0].firstName + " " + a.person[0].lastName+"</a>" + " <br><b>Emp ID :</b> " + (a.person[0].employeeId? a.person[0].employeeId :"- NA -" )+'<br><b>Category : </b>'+a.person[0].empCategory+'<br><b>Priority : </b>'+(a.person[0].empPriority == "1" ? "★" : a.person[0].empPriority == "2" ? "★ ★" : "★ ★ ★"),
                Status:status,
                statusValue:a.statusValue,
                BookingDateTime:moment(a.createdAt).format('DD/MM/YYYY,HH:mm'),
                Date:moment(a.pickupDate).format('DD/MM/YYYY')+' , '+a.pickupTime,
                Destination:"<b>From : </b> "+a.from.address1+', '+a.from.address+', '+a.from.pincode+'<br> <b>To : </b> '+a.to.address1+', '+a.to.address+', '+a.to.pincode,
                estimatedCost:a.estimatedCost,
                id:a._id,
                actions: '<div class="actionWidth">'+action1+' '+action2+'</div>'
              }
            })
            this.setState({RecordsTable:tableData})
          }
        })
        .catch((error) =>{
            console.log('error: ',error)
        })
    }
    
    
    camelCase(str) {
        return str
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
    
    ShowForm(event) {
        event.preventDefault();
        $("html,body").scrollTop(0);
        var data = $(event.currentTarget).attr('id');
        var empId = $(event.currentTarget).attr('name');
        var bookingNum = $(event.currentTarget).attr('number');
        var cost = $(event.currentTarget).attr('cost');
        var date = $(event.currentTarget).attr('dateattr');
        var manager = $(event.currentTarget).attr('manager');
        var status = $(event.currentTarget).attr('status');
        var managerID = $(event.currentTarget).attr('managerID');
        var approvalRequired = $(event.currentTarget).attr('approvalRequired');
        this.setState({ id: data, empID:empId, bookingNumber:bookingNum , 
            estimatedCost:cost,bookingDate:moment(date).format('DD/MM/YYYY'),
            managerId : manager , status : status,managerID:managerID,approvalRequired:approvalRequired
            });

        $('.commonSup').show()
        $('.selected').removeClass('selectedEmployee');
        $(event.currentTarget).addClass('selectedEmployee');

        axios.get('/api/bookingmaster/get/booking/'+data)
            .then((response) => {
                axios.get("/api/categorymaster/get/one/"+response.data.data[0].vehicleCategoryId)
                    .then((res) => {
                        this.setState({
                          category  :res.data.category,
                          // brand:res.data.brand,
                          // model:res.data.model,
                          // capacity:res.data.capacity
                        })
                    })
                    .catch((error) => {
                        console.log('error: ',error)
                    })
                    if(response.data.data[0].purposeOfTravel == "Other"){
                      var purpose = response.data.data[0].purposeOfTravelOther
                    }else{
                      var purpose = response.data.data[0].purposeOfTravel
                    }
                var array = {
                  from    : response.data.data[0].from.address,
                  fromAddress1    : response.data.data[0].from.address1,
                  fromPincode    : response.data.data[0].from.pincode,
                  toAddress1    : response.data.data[0].to.address1,
                  toPincode    : response.data.data[0].to.pincode,
                  pickupDate : response.data.data[0].pickupDate,
                  pickupTime : response.data.data[0].pickupTime,
                  returnDate : response.data.data[0].returnDate,
                  to         : response.data.data[0].to.address,
                  returnTime : response.data.data[0].returnTime,
                  bookingType : response.data.data[0].tripType,
                  purposeOfTravel: purpose,
                  instructions  :response.data.data[0].specialInstruction,
                  reasonForSelectingVehicle:response.data.data[0].reasonForSelectingVehicle,
                  selectedVehicle  :this.state.category,
                  stopArr : response.data.data[0].intermediateStops,
                  // brand:this.state.brand,
                  // model:this.state.model,
                  // capacity:this.state.capacity,
                }
                this.setState({'tripArray':array,status:response.data.data[0].statusValue})
            })
            .catch((error) =>{
                console.log('error: ',error)
            })

    }

    getBookingData(selector){
        var userId = localStorage.getItem("user_ID")
        selector.userId = userId

        this.setState({RecordsTable:[],bookingData:[]})
       
        axios.post("/api/bookingmaster/get/filter",selector)
        .then((response) => {
          if(response.data && response.data.length > 0){
            this.setState({'bookingData':response.data,'filteredCount':response.data.length,'selector':{}})
             // document.getElementById(response.data[0]._id).classList.add("selectedEmployee")
             if(response.data[0] && this.state.view == 'Grid'){
                $('#'+response.data[0]._id).addClass('selectedEmployee')
                this.setState({
                   managerId:response.data[0].managerId1,
                    id: response.data[0]._id,
                    empID:response.data[0].employeeId, 
                    bookingNumber:response.data[0].bookingId, 
                    estimatedCost:response.data[0].estimatedCost,
                    approvalRequired:response.data[0].approvalRequired,
                    bookingDate:moment(response.data[0].createdAt).format('DD/MM/YYYY')
                },()=>{
                 axios.get('/api/bookingmaster/get/booking/'+response.data[0]._id)
                .then((result) => {
                    axios.get("/api/categorymaster/get/one/"+result.data.data[0].vehicleCategoryId)
                        .then((res) => {
                            this.setState({
                              category  :res.data.category,
                              // brand:res.data.brand,
                              // model:res.data.model,
                              // capacity:res.data.capacity
                            })
                        })
                        .catch((error) => {
                            console.log('error: ',error)
                        })
                    var array = {
                      from    : result.data.data[0].from.address,
                      fromAddress1    : result.data.data[0].from.address1,
                      fromPincode    : result.data.data[0].from.pincode,
                      toAddress1    : result.data.data[0].to.address1,
                      toPincode    : result.data.data[0].to.pincode,
                      pickupDate : result.data.data[0].pickupDate,
                      pickupTime : result.data.data[0].pickupTime,
                      returnDate : result.data.data[0].returnDate,
                      to         : result.data.data[0].to.address,
                      returnTime : result.data.data[0].returnTime,
                      bookingType : result.data.data[0].tripType,
                      purposeOfTravel: result.data.data[0].purposeOfTravel,
                      instructions  :result.data.data[0].specialInstruction,
                      reasonForSelectingVehicle  :result.data.data[0].reasonForSelectingVehicle,
                      selectedVehicle  :this.state.category,
                      stopArr : result.data.data[0].intermediateStops,
                      // brand:this.state.brand,
                      // model:this.state.model,
                      // capacity:this.state.capacity,
                    }
                    this.setState({'tripArray':array,status:result.data.data[0].statusValue})

                })

                })
                .catch((error) =>{
                    console.log('error: ',error)
                })
              }
            //Grid View//
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

                
                if(a.statusValue === 'New' || a.statusValue === 'Manager Approved' || a.statusValue === "Cancelled By User" || a.statusValue === 'Manager Rejected' || a.statusValue === 'Edited' || a.statusValue === 'Edited Manager Approved' || a.statusValue === 'Edited Manager Rejected' || a.statusValue === 'Allocated To Vendor'){
                  var action1 = '<button title="Edit" id='+a._id+' class="btn-primary fa fa-pencil" data-index data-id='+a._id+' onClick=window.editBooking()></button>' 
                }else{
                  var action1 = '<button title="Change" data-toggle="modal" data-target="#changeRequest" id='+a._id+' class="btn-primary fa fa-pencil" data-index data-id='+a._id+' onClick=window.showModal()></button>' 
                }
                  var action2 = '<button title="Cancel" id='+a._id+' class="btn-danger fa fa-stop" data-index data-id='+a._id+' onClick=window.cancelBooking()></button>' 

              return{
                BookingID:'<div class="label label-primary">'+a.bookingId+'</div><br><div><i '+(a.person[0].gender == "Male" ? 'class="fa fa-male fa-lg faMale faGender"' : 'class="fa fa-female fa-lg faFemale faGender"')+' aria-hidden="true"></i></div>',
                Company:"<a  title='View company profile'  target='_blank' href='/company-profile/"+(a.corporateId)+"'>"+a.company[0].companyName +" (" +a.company[0].companyID+")"+"</a>",
                EmpIDName:"<a  title='View profile' target='_blank' href='/employee-profile/"+(a.employeeId)+"'>"+a.person[0].firstName + " " + a.person[0].lastName+"</a>" + " <br><b>Emp ID :</b> " + (a.person[0].employeeId? a.person[0].employeeId :"- NA -" )+'<br><b>Category : </b>'+a.person[0].empCategory+'<br><b>Priority : </b>'+(a.person[0].empPriority == "1" ? "★" : a.person[0].empPriority == "2" ? "★ ★" : "★ ★ ★"),
                Status:status,
                statusValue:a.statusValue,
                BookingDateTime:moment(a.createdAt).format('DD/MM/YYYY,HH:mm'),
                Date:moment(a.pickupDate).format('DD/MM/YYYY')+' , '+a.pickupTime,
                Destination:"<b>From : </b> "+a.from.address1+', '+a.from.address+', '+a.from.pincode+'<br> <b>To : </b> '+a.to.address1+', '+a.to.address+', '+a.to.pincode,
                estimatedCost:a.estimatedCost,
                id:a._id,
                actions: '<div class="actionWidth">'+action1+' '+action2+'</div>'
              }
            })
            this.setState({RecordsTable:tableData})
        }
        })

        .catch((error) =>{
            console.log('error: ',error)
        })
            
       
    }

    showView(value,event){
      this.resetFilter()
    $('.viewBtn').removeClass('btnactive');
        $(event.target).addClass('btnactive');
      this.setState({
        view : value
      },()=>{
        if(Object.keys(this.state.selector).length == 0){this.getData()}else{this.getBookingData(this.state.selector)}
      })
    }

    editBooking(event){
        this.props.history.push('/booking/'+event.currentTarget.getAttribute('data-id'))
    }

    cancelBooking(event){
    var formvalues={
      bookingID: event.currentTarget.getAttribute('data-id'),
      status  : {
                    value      : "Cancelled By User",
                    statusBy   : localStorage.getItem("user_ID"),
                    statusAt   : new Date(),
                },
    }
    axios.get('/api/bookingmaster/get/status/'+event.currentTarget.getAttribute('data-id'))
    .then((res)=>{
        if(res.data.data[0].status[0].value == 'Cancelled By User'){
             swal({
            title: "OOPS",
            text: "Already Cancelled",
          });
        }else{
           swal("Are you sure you want to cancel this booking?", {
              dangerMode: true,
              buttons: true,
            }).then((res)=>{
                if(res == true){
                axios.patch("/api/bookingmaster/patch/status",formvalues)
                .then((response) => {
                    swal({
                            title: "Cancelled",
                            text: "Booking Cancelled",
                          });
                    this.getData();
                    
                })
                .catch((error) =>{
                    console.log('error: ',error)
                })
                }else{}
            });
            // axios.get("/api/bookingmaster/get/allList")
            //     .then((response) => {
            //         this.setState({'bookingData':response.data})
            //     })
            //     .catch((error) =>{
            //         console.log('error: ',error)
            //     }) 
        }
    })
   
    }

    redirectTo(event){
        this.props.history.push("/booking")
    }

    showModal(event){
      // event.preventDefault();
      console.log('clicked')
      $('#changeRequest').show()
      $("html,body").scrollTop(0);
    }

    hideModal(event){
      event.preventDefault();
      $("html,body").scrollTop(0);
      $('#changeRequest').hide()
      $(".modal-backdrop").remove();
    } 
    
    render() {
        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOPadding">
                        <section className="content">
                            <div className="pageContent col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
                                    <h4 className="weighttitle col-lg-5 col-md-11 col-xs-11 col-sm-11 NOpadding-right"><span className="">Booking List</span></h4>
                                    <div className="col-lg-5 col-md-12 col-sm-12 col-xs-12 pull-right">
                                        <span className="col-lg-6 col-lg-offset-5 sentanceCase addButtonList" onClick={this.redirectTo.bind(this)}><i  className="fa fa-plus-circle"></i>&nbsp;&nbsp;Book My Trip 
                                        </span>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 customTab">
                                    <div className="col-lg-2 col-md-2 col-sm-6 col-xs-12 pull-right">
                                      <i className="fa fa-th-list fa-lg btn pull-right viewBtn  "  title="List view" name="view" ref="view" value={this.state.view} onClick={this.showView.bind(this,'List')} onChange={this.handleChange} aria-hidden="true"></i>
                                      <i className="fa fa-th fa-lg btn viewBtn pull-right btnactive " title="Grid view" name="view" ref="view" value={this.state.view} onClick={this.showView.bind(this,'Grid')} onChange={this.handleChange} aria-hidden="true"></i>&nbsp;&nbsp;
                                    </div>
                                  </div>
                                <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 ">

                                <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 ">                  
                                  <div className="col-lg-2 col-md-12 col-sm-12 col-xs-12 nopadding rowPadding">
                                    <button type="button" className=" selectFilterBtn btn reset" onClick={this.selectFilter.bind(this)}>
                                      <i className="fa fa-filter"></i>&nbsp;&nbsp;<b> SELECT FILTER</b>
                                    </button>
                                  </div>
                                  
                                  <h5 className="box-title2 col-lg-2 col-md-11 col-sm-11 col-xs-12 nopadding">Total Records :&nbsp;&nbsp;<b>{this.state.bookingCount}</b></h5>
                                  <h5 className="box-title2 col-lg-2 col-md-11 col-sm-11 col-xs-12 nopadding">Filtered :&nbsp;&nbsp;<b>{this.state.filteredCount}</b></h5>
                                  
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 firstElement bookingfilterWrapper rowPadding">
                                  <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 nopadding">
                                    <button type="button" className="reset selheight" onClick={this.resetFilter.bind(this)}>RESET</button>
                                  </div>
                                  <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                        <select onChange={this.onSelectedItemsChange.bind(this,'filteredStatus')} value={this.state.filteredStatus} id="filteredStatus" ref="filteredStatus" name="filteredStatus" className="form-control">
                                            <option value="" disabled>Select Status</option>
                                            <option value="All">All</option>
                                            <option value="New">New</option>
                                            <option value="Edited">Edited</option>
                                            <option value="Manager Approved">Approved</option>
                                            <option value="Edited Manager Approved">Edited Approved</option>
                                            <option value="Manager Rejected">Rejected</option>
                                            <option value="Edited Manager Rejected">Edited Rejected</option>
                                            <option value="Cancelled By User">Cancelled By User</option>
                                            <option value="Allocated To Vendor">Allocated To Vendor</option>
                                            <option value="Cancelled By Vendor">Cancelled By Vendor</option>
                                            <option value="Change Request">Change Request</option>
                                            <option value="PR Admin Edited">PR Admin Edited</option>
                                            <option value="Cancelled">Cancelled</option>
                                            {/*<option value="Vendor Accepted">Vendor Accepted</option>
                                            <option value="Vendor Rejected">Vendor Rejected</option>
                                            <option value="Vendor Allocated to Driver">Vendor Allocated to Driver</option>
                                            <option value="Driver Accepted">Driver Accepted</option>
                                            <option value="Driver Rejected">Driver Rejected</option>*/}
                                            <option value="Trip Started">Trip Started</option>
                                            <option value="Reached Pickup Location">Reached Pickup Location</option>
                                            {/*<option value="OTP Matched">OTP Matched</option>*/}
                                            <option value="Intermediate Stop">Intermediate Stop</option>
                                            <option value="Reached Destination">Reached Destination</option>
                                            <option value="Reached Drop Location">Reached Drop Location</option>
                                            {/*<option value="Reached Garage">Reached Garage</option>*/}
                                        </select>
                                    </div>
                                    <div  className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                      <select onChange={this.onSelectedItemsChange.bind(this,'filteredMonth')} value={this.state.filteredMonth} id="filteredMonth" ref="filteredMonth" name="filteredMonth" className="form-control">
                                            <option value="" disabled>Select Month</option>
                                            <option value="All">All</option>
                                            <option value="01">Jan</option>
                                            <option value="02">Feb</option>
                                            <option value="03">March</option>
                                            <option value="04">April</option>
                                            <option value="05">May</option>
                                            <option value="06">June</option>
                                            <option value="07">July</option>
                                            <option value="08">Aug</option>
                                            <option value="09">Sept</option>
                                            <option value="10">Oct</option>
                                            <option value="11">Nov</option>
                                            <option value="12">Dec</option>
                                      </select>
                                    </div>
                                    <div  className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                      <select className="form-control"  ref="filteredYear" name="filteredYear" value={this.state.filteredYear} onChange={this.onSelectedItemsChange.bind(this,'filteredYear')}>
                                        <option disabled value="">Select Year</option>
                                        <option value="All">All</option>
                                        {this.state.yearArray && this.state.yearArray.length > 0 ?
                                          this.state.yearArray.map((data,index)=>{
                                            return(
                                            <option key={index}>{data.year}</option>
                                            )
                                          })
                                          :
                                          null
                                        }
                                      </select>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 borderBottomSO"></div>
                                </div>

                                    
                                </div>
                                {this.state.view === 'List' ?
                                  <div className="col-lg-12"> <IAssureTable 
                                    tableHeading={this.state.tableHeading}
                                    dataCount={this.state.entityCount}
                                    tableData={this.state.RecordsTable}
                                    tableObjects={this.state.tableObjects}
                                    getData={this.getData.bind(this)}
                                    tableName={this.state.entityType}
                                    />
                                    </div>
                                 :
                                <div>
                                {this.state.bookingData && this.state.bookingData.length > 0 ?
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 scrollbar" id="style-2">
                                        <div className="borderlist12">
                                            {
                                                this.state.bookingData.map((data, index) => {
                                                    
                                                    return (
                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 empContainer cursorStyle selected activeEmployee" key={index} onClick={this.ShowForm.bind(this)} number={data.bookingId} cost={data.estimatedCost} status={data.statusValue} manager={data.approvalRequired == 'Yes' ? data.managerId1 : null} approvalRequired={data.approvalRequired} managerID={data.managerID1} name={data.employeeId} dateattr={data.createdAt} id={data._id}>
                                                            <div className="col-lg-3 col-md-2 col-sm-2 col-xs-2 dateContainer">
                                                                <label className="col-lg-12 onlyDay">{moment(data.pickupDate).format('ddd')}</label>
                                                                <label className="col-lg-12 firstDate">{moment(data.pickupDate).format('DD')}</label>
                                                                <label className="col-lg-12 dateWith nopadding">{moment(data.pickupDate).format('MMM')} {moment(data.pickupDate).format('YY')}</label>
                                                            </div>
                                                            <div className="col-lg-9 col-md-10 col-sm-10 col-xs-10 listprofileEmployee nopadding">
                                                                <div className="col-lg-10 col-md-10 tripDetail">
                                                                    <label className="titleTrip col-lg-12">Booking Number: {data.bookingId}</label>
                                                                    <label className=" tripType col-lg-12">{data.from.city} To {data.to.city}</label>
                                                                    <label className=" tripType col-lg-12">Pickup At: {data.pickupTime}</label>
                                                                    <span className={data.statusValue == 'New'? "label label-primary pull-right statusStyle" : data.statusValue == 'Manager Approved' ? "label label-success pull-right statusStyle":data.statusValue == 'Manager Rejected' ? "label label-danger pull-right statusStyle":data.statusValue == 'Change Request' ? "label label-warning pull-right statusStyle": "label label-info pull-right statusStyle"}>{data.statusValue}</span>
                                                                  
                                                                </div>
                                                                <div className="col-lg-2 nopadding">
                                                                    <div className="addedDivBM col-lg-12 nopadding">
                                                                        <img src="/images/leftArrow.png"/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            }
                                        </div>
                                    </div>
                                    :
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-align-center">
                                        <h5>No Data Found</h5>
                                    </div>
                                }
                                </div>
                              }
                                {this.state.view === 'Grid' && this.state.id && this.state.bookingData && this.state.bookingData.length > 0 ?
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 pickupType nopadding commonSup" id={this.state.id}>
                                       <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                                        <ul className="col-lg-3"><li>Booking ID</li><li> #{this.state.bookingNumber}</li></ul>
                                        <h5 className="col-lg-6 titleBooking">Booking Details</h5>
                                        <ul className="col-lg-3"><li>Booking Date</li><li> {this.state.bookingDate}</li></ul>
                                        
                                        <div className="dots dropdown1 marginAjt col-lg-6 col-md-6 col-sm-6 col-xs-6 pull-right">
                                            <i className="fa fa-ellipsis-h dropbtn1 dropbtn2 buttonDrop3" aria-hidden="true"></i>
                                            <div className="dropdown-content1 dropdown2-content2">
                                                <ul className="pdcls ulbtm">
                                                  {this.state.status == 'New' || this.state.status == 'Manager Approved' || this.state.status =="Cancelled By User" || this.state.status == 'Manager Rejected' || this.state.status =='Edited' || this.state.status == 'Edited Manager Approved' || this.state.status == 'Edited Manager Rejected' || this.state.status == 'Allocated To Vendor'?
                                                    <li id={this.state.id} className="styleContactActbtn" data-index data-id={this.state.id} onClick={this.editBooking.bind(this)}> 
                                                        <a><i className="fa fa-pencil penmrleft" aria-hidden="true" ></i>&nbsp;&nbsp;<span className="mrflfedit">Edit</span></a>
                                                    </li>
                                                    :
                                                    <li id={this.state.id} className="styleContactActbtn" data-id={this.state.id} onClick={this.showModal.bind(this)} title="Change Request"> 
                                                        <a><i className="fa fa-pencil penmrleft" aria-hidden="true" ></i>&nbsp;Change</a>
                                                    </li>
                                                  }
                                                    <li id={this.state.id} className="styleContactActbtn" data-id={this.state.id} onClick={this.cancelBooking.bind(this)} >
                                                        <a><i className="fa fa-stop" aria-hidden="true" ></i>&nbsp;Cancel</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                       </div>
                                       <div className="col-lg-12 borderDiv"></div>

                                       {/*Modal*/}
                                        <div id="changeRequest" className="modal in" aria-hidden="false" role="dialog">
                                          <div className="modal-dialog">

                                            <div className="modal-content">
                                              <div className="modal-header">
                                              <h5 className="modal-title col-md-4">Change Request</h5>
                                              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.hideModal.bind(this)}>
                                                  <span aria-hidden="true">&times;</span>
                                                </button>
                                              </div>
                                              <div className="modal-body col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                               <ChangeRequest id={this.state.id} getAllData={this.getData.bind(this)} />
                                            </div>
                                                <div className="modal-footer">
                                                </div>
                                              </div>
                                               
                                            </div>
                                          </div>
                                        {/*End Modal*/}
                                       
                                       <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                                       <EmployeeDetails personID={this.state.empID} managerID={this.state.managerID} approvalRequired={this.state.approvalRequired} />                   
                                      </div>
                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding" >
                                        <TripDetails personID={this.state.empID} tripData={this.state.tripArray} />                    
                                      </div>
                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding" >
                                        <CarDetails personID={this.state.empID} tripData={this.state.tripArray}/>                    
                                      </div>
                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                                        <EstimatedCost personID={this.state.empID} cost={this.state.estimatedCost} />                    
                                      </div>
                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                                        <ManagerApproval personID={this.state.managerId} status={this.state.status} bookingId={this.state.id} />                    
                                      </div>
                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                                        <ChangeRequestView bookingId={this.state.id} />                    
                                      </div>
                                    </div>
                                    :
                                    null
                                }
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}
export default BookingDetils;