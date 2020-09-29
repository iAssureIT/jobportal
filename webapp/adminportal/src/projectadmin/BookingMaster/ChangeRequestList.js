import React, { Component } from 'react';
import $                    from 'jquery';
import axios                from 'axios';
import _                    from 'underscore';
import moment                   from 'moment';

import BookingProfile        from './BookingProfile.js';
import BookingMaster        from './BookingMaster.js';


import swal                 from 'sweetalert';
import 'bootstrap/js/tab.js';

class ChangeRequestList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookingData: [],
            id:"",
            
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.ShowForm = this.ShowForm.bind(this);
        this.camelCase = this.camelCase.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: event.target.value
        });
    }

    

 componentDidMount() {

        this.getData();
        var createdBy = localStorage.getItem("user_ID")
        axios.get("/api/bookingmaster/get/count/"+createdBy)
        .then((response) => {
            this.setState({'bookingCount':response.data.count})
        })
        .catch((error) =>{
            console.log('error: ',error)
        })
        
    }


    componentWillReceiveProps(nextProps){
      this.getData();
    }

   

    getData(){
      var createdBy = localStorage.getItem("user_ID")

        axios.get("/api/bookingmaster/get/getBookingsByStatus/Change Request")
        .then((response) => {
          if(response.data && response.data.length > 0){
            this.setState({'bookingData':response.data,
                        // showDetails:true,
                        managerId:response.data[0].managerId1,
                        managerID:response.data[0].managerID1,
                        id:response.data[0]._id,
                        bookingNumber:response.data[0].bookingId,
                        empID :response.data[0].employeeId,
                        estimatedCost :response.data[0].estimatedCost,
                        status :response.data[0].statusValue,

                        bookingDate:moment(response.data[0].createdAt).format('DD/MM/YYYY') },()=>{  
                            axios.get('/api/bookingmaster/get/booking/'+this.state.id)
                            .then((response) => {
                                  if(response.data.data[0].purposeOfTravel == "Other"){
                                    var purpose = response.data.data[0].purposeOfTravelOther
                                  }else{
                                    var purpose = response.data.data[0].purposeOfTravel
                                  }
                                var array = {
                                  from    : response.data.data[0].from.address,
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
                                  brand:this.state.brand,
                                  model:this.state.model,
                                  capacity:this.state.capacity,
                                }
                                this.setState({'tripArray':array,status:response.data.data[0].statusValue})
                            })
                            .catch((error) =>{

                            })
                        });
            document.getElementById(response.data[0]._id).classList.add("selectedEmployee")
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
        this.setState({ id: data, empID:empId, bookingNumber:bookingNum , 
            estimatedCost:cost,bookingDate:moment(date).format('DD/MM/YYYY'),
            managerId : manager , status : status,managerID:managerID
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

    
       
    render() {
        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOPadding">
                        <section className="content">
                            <div className="pageContent col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
                                    <h4 className="weighttitle col-lg-5 col-md-11 col-xs-11 col-sm-11 NOpadding-right"><span className="">Change Request List</span></h4>
                                </div>
                               
                                
                                {this.state.bookingData && this.state.bookingData.length > 0 ?
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 scrollbar" id="style-2">
                                        <div className="borderlist12">
                                            {
                                                this.state.bookingData.map((data, index) => {
                                                    
                                                    return (
                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 empContainer cursorStyle selected activeEmployee" key={index} onClick={this.ShowForm.bind(this)} number={data.bookingId} cost={data.estimatedCost} status={data.statusValue} manager={data.approvalRequired == 'Yes' ? data.managerId1 : null} managerID={data.managerID1} name={data.employeeId} dateattr={data.createdAt} id={data._id}>
                                                            <div className="col-lg-3 col-md-2 col-sm-2 col-xs-2 dateContainer">
                                                                <label className="col-lg-12 onlyDay">{moment(data.pickupDate).format('ddd')}</label>
                                                                <label className="col-lg-12 firstDate">{moment(data.pickupDate).format('DD')}</label>
                                                                <label className="col-lg-12 dateWith">{moment(data.pickupDate).format('MMM')} {moment(data.pickupDate).format('YY')}</label>
                                                            </div>
                                                            <div className="col-lg-9 col-md-10 col-sm-10 col-xs-10 listprofileEmployee nopadding">
                                                                <div className="col-lg-10 col-md-10 tripDetail">
                                                                    <label className="titleTrip col-lg-12">Booking Number: {data.bookingId}</label>
                                                                    <label className=" tripType col-lg-12">{data.from.area} To {data.to.city}</label>
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
                                { this.state.id && this.state.bookingData && this.state.bookingData.length > 0 ?
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 pickupType nopadding commonSup" id={this.state.id}>
                                       <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                                        <ul className="col-lg-3"><li>Booking ID</li><li> #{this.state.bookingNumber}</li></ul>
                                        <h5 className="col-lg-6 titleBooking">Booking Details</h5>
                                        <ul className="col-lg-3"><li>Booking Date</li><li>{this.state.bookingDate}</li></ul>
                                        
                                        <div className="dots dropdown1 marginAjt col-lg-12 col-md-6 col-sm-6 col-xs-6">
                                            <i className="fa fa-ellipsis-h dropbtn1 dropbtn2 buttonDrop3" aria-hidden="true"></i>
                                            <div className="dropdown-content1 dropdown2-content2">
                                                <ul className="pdcls ulbtm">
                                                    <li id={this.state.id} className="styleContactActbtn" data-toggle="modal"  data-target="#EditBooking"> 
                                                        <a><i className="fa fa-pencil penmrleft" aria-hidden="true" ></i>&nbsp;&nbsp;<span className="mrflfedit">Edit</span></a>
                                                    </li>
                                                </ul>
                                            </div>
                                          {/*Modal*/}
                                          <div id="EditBooking" className="modal col-lg-12" role="dialog">
                                            <div className="modal-dialog">

                                              <div className="modal-content">
                                                <div className="modal-header">
                                                 <h5 className="modal-title col-md-4 modalTitle_trip">Trip Booking</h5>
                                              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                  <span aria-hidden="true">&times;</span>
                                                </button>
                                                </div>
                                                <div className="modal-body">
                                                  <BookingMaster getData={this.getData.bind(this)} bookingId={this.state.id} />
                                                </div>
                                                <div className="modal-footer">
                                                </div>
                                              </div>
                                               
                                            </div>
                                          </div>
                                          {/*Modal*/}
                                        </div>
                                       </div>
                                       <div className="col-lg-12 borderDiv"></div>

                                      
                                       
                                       <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                                       <BookingProfile id={this.state.id} entity="ChangeRequest" />                   
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
export default ChangeRequestList;