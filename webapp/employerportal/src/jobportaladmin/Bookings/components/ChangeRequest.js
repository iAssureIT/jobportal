import React, { Component }   from 'react';
import $                      from 'jquery';
import axios                  from 'axios';
import {withRouter}       from 'react-router-dom';
import swal                   from 'sweetalert';
import moment                   from 'moment';
import validate               from 'jquery-validation';


import _                      from 'underscore';
import 'bootstrap/js/tab.js';

class ChangeRequest extends Component {
  
  constructor(props) {
      super(props);
    
      this.state = {
        id : '',
        remark:'',
        bookingID:'',
        bookingDate:'',
        empName:'',
        empNumber:'',
        profilePhoto:'',
        intermediateStops:'',
        empID:'',
        managerID:'',
        managerId:'',
        currStatus:'',
        from:'',
        fromDate:'',
        fromTime:'',
        to:'',
        tripType:'',
        toDate:'',
        toTime:'',
        purpose:'',
        VehicleCategory:'',
        VehicleBrand:'',
        VehicleModel:'',
        VehicleNumber:'',
        specialInstruction:'',
        estimatedCost:'',
        vendor:'',
        vendorId:'',
        status:''
      };
      this.handleChange = this.handleChange.bind(this);
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      id : nextProps.id,
    },()=>{this.getData(nextProps.id)})
    
  }
  componentDidMount(){
    this.setState({
        id : this.props.id,
      },()=>{this.getData(this.props.id)})
    $("#ChangeRequestForm").validate({
      rules: {
        remark: {
          required: true,
        }
      }
    });
  }
  
  handleChange(event){
    event.preventDefault();
    const target = event.target;
    const name = target.name;

    this.setState({
      [name]: event.target.value
    });
  }

  getData(id){
    axios.get('/api/bookingmaster/get/one/bookingforvendor/'+id)
    .then((response)=>{
      if(response.data.purposeOfTravel == "Other"){
        var purpose = response.data.purposeOfTravelOther
      }else{
        var purpose = response.data.purposeOfTravel
      }
      this.setState({
        bookingID:response.data.bookingId,
        bookingDate:response.data.createdAt,
        tripType:response.data.tripType,
        empName:response.data.firstName+' '+response.data.lastName,
        empNumber:response.data.contactNo,
        empID:response.data.employeeID,
        profilePhoto:response.data.profilePhoto,
        intermediateStops:response.data.intermediateStops,
        managerID:response.data.managerID,
        managerId:response.data.managerId1,
        currStatus:response.data.statusValue,
        from:response.data.from,
        fromDate:response.data.pickupDate,
        fromTime:response.data.pickupTime,
        to:response.data.to,
        toDate:response.data.returnDate,
        toTime:response.data.returnTime,
        purpose:purpose,
        VehicleCategory:response.data.vehicleCategory,
        VehicleBrand:response.data.vehicleBrand,
        VehicleModel:response.data.vehicleModel,
        VehicleNumber:response.data.vehicleNumber,
        specialInstruction:response.data.specialInstruction,
        estimatedCost:response.data.estimatedCost,
        vendor:response.data.vendor,
        vendorId:response.data.vendorId,
        status:response.data.status
      })
    })
    .catch((err)=>{console.log('err: ',err)})
  }

  showHistory(event){
    event.preventDefault();
    $('.toggleHistoryWrapper').toggle()
  }

  submit(event){
    event.preventDefault();
    var formValues = {
      bookingID: this.state.id,
      status  : {
                    value      : 'Change Request',
                    statusBy   : localStorage.getItem("user_ID"),
                    remark     : this.state.remark,
                    statusAt   : new Date(),
                },
    }
    if($("#ChangeRequestForm").valid()){
      axios.patch('/api/bookingmaster/patch/status',formValues)
      .then((response)=>{
        swal('Change Request Submitted')
        var sendData = {
          "event": "Event12",
          "toUser_id": localStorage.getItem("user_ID"),
          "toUserRole":"employee",
          "company_id": this.state.vendorId,
          "intended_id": this.state.managerId,
          "otherAdminRole":'vendoradmin',
          "variables": {
            "EmployeeName" : this.state.empName,
            "EmployeeID" : this.state.empID,
            "BookingNum":this.state.bookingID,
            "remark": this.state.remark
            }
          }
          console.log('sendDataToUser==>', sendData)
          axios.post('/api/masternotifications/post/sendNotification', sendData)
          .then((res) => {
          console.log('sendDataToUser in result==>>>', res.data)
          })
        this.setState({'remark':''},()=>{this.props.getAllData()})
        // $('#changeRequest').hide();
        // $(".modal-backdrop").remove();
      })
      .catch((err)=>{console.log('err: ',err)})
    }
  }



  render() {
        return (  
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                  <ul className="col-lg-3"><li>Booking ID</li><li> #{this.state.bookingID}</li></ul>
                  <h5 className="col-lg-6 titleBooking">Booking Details</h5>
                  <ul className="col-lg-3"><li>Booking Date</li><li>{moment(this.state.bookingDate).format('LL')}</li></ul>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                <h5 className="titleprofileTD col-lg-8">Employee Details</h5>
                <ul className="col-lg-8 col-md-5 col-sm-5 col-xs-5 listfontED ">
                  <li><i className="fa fa-user-o " aria-hidden="true"></i>&nbsp;&nbsp; Employee ID :<span className="pull-right">{this.state.empID ? this.state.empID : 'Guest'}</span></li>
                  <li><i className="fa fa-envelope " aria-hidden="true"></i>&nbsp;&nbsp;Name :<span className="pull-right">{this.state.empName}</span></li>
                  <li><i className="fa fa-phone " aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Mobile :<span className="pull-right">{this.state.empNumber ? this.state.empNumber : 'NIL'}</span></li>
                  <li><i className="fa fa-user-o " aria-hidden="true"></i>&nbsp;&nbsp; Approving Manager ID :<span className="pull-right">{this.state.managerID ? this.state.managerID : 'NA'}</span></li>
                </ul>
                <div className="col-lg-2 col-md-4 col-sm-4 col-xs-4 profileImage nopadding pull-right">
                  <img src={this.state.profilePhoto ? this.state.profilePhoto : "/images/userIcon.jpg"}/>
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                <h5 className="titleprofileTD col-lg-8">Trip Details</h5>
                <label className="col-lg-12 outStatioon">{this.state.tripType}</label>
                <label className="col-lg-12 outStatioon">Pickup</label>
                <ul className="col-lg-12 col-md-5 col-sm-5 col-xs-5 listfontED ">
                  <li><i className="fa fa-map-marker " aria-hidden="true"></i>&nbsp;&nbsp; Address : {this.state.from.address}.</li>
                  <li><i className="fa fa-clock-o " aria-hidden="true"></i>&nbsp;&nbsp;Date & Time : {moment(this.state.fromDate).format('MMMM Do YYYY')} | {this.state.fromTime ? this.state.fromTime : "--:--"}</li>
                </ul> 
                <label className="col-lg-12 outStatioon">Destination</label>
                <ul className="col-lg-12 col-md-5 col-sm-5 col-xs-5 listfontED ">
                  <li><i className="fa fa-map-marker " aria-hidden="true"></i>&nbsp;&nbsp; Address :  {this.state.to.address}.</li>
                </ul>
                <label className="col-lg-12 outStatioon">Return On</label>
                <ul className="col-lg-12 col-md-5 col-sm-5 col-xs-5 listfontED ">
                  <li><i className="fa fa-clock-o " aria-hidden="true"></i>&nbsp;&nbsp; Date & Time : {moment(this.state.toDate).format('MMMM Do YYYY')}, {this.state.toTime ? this.state.toTime : "--:--"}</li>
                </ul>
                  {this.state.intermediateStops && this.state.intermediateStops.length > 0?
                  <div>
                  <label className="col-lg-12 outStatioon">Stop Details</label>
                  <ul className="col-lg-12 col-md-5 col-sm-5 col-xs-5 listfontED ">
                    <li>
                    {this.state.intermediateStops && 
                      this.state.intermediateStops.length > 0 ?
                        this.state.intermediateStops.map((data,index)=>{
                          return(<div key={index}><i className="fa fa-map-marker" aria-hidden="true"></i>&nbsp;&nbsp; {data.address}</div>)
                        })
                        :
                        
                      'NIL'
                    }
                    </li>
                  </ul>
                  </div>
                  :
                  null

                  }
                  <label className="col-lg-12 outStatioon">Purpose of Travel</label>
                  <ul className="col-lg-12 col-md-5 col-sm-5 col-xs-5 listfontED ">
                    <li><i className="fa fa-comment " aria-hidden="true"></i>&nbsp;&nbsp; {this.state.purpose}</li>
                  </ul>
                  {this.state.specialInstruction ?
                  <div>
                  <label className="col-lg-12 outStatioon">Special Instructions</label>
                  <ul className="col-lg-12 col-md-5 col-sm-5 col-xs-5 listfontED ">
                    <li><i className="fa fa-comment " aria-hidden="true"></i>&nbsp;&nbsp; {this.state.specialInstruction ? this.state.specialInstruction : "NIL"}</li>
                  </ul>
                  </div>
                  :null
                  }
                  </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                  <h5 className="titleprofileTD col-lg-8">Other Details</h5>
                  <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 listfontED ">
                  <li>Vehicle:{this.state.vehicleCategory} {this.state.vehicleNumber ? (this.state.vehicleNumber|this.state.vehicleModel|this.state.vehicleBrand) : null}</li>
                  <li>Estimated Cost:{this.state.estimatedCost} </li>
                  </ul>
                </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                <div className="btn btn-link" onClick={this.showHistory.bind(this)}>Show History</div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 toggleHistoryWrapper nopadding">
                {
                  this.state.status && this.state.status.length > 0 ?
                    <div className="table-responsive topmr40 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <table className="table iAssureITtable-bordered table-striped table-hover">
                        <thead className="tempTableHeader">
                          <tr className="">
                            <th className="umDynamicHeader srpadd textAlignCenter"> Sr No.</th>
                            <th className="umDynamicHeader srpadd textAlignCenter"> Status</th>
                            <th className="umDynamicHeader srpadd textAlignCenter"> Date & Time</th>
                          </tr>
                        </thead>
                        <tbody>
                            {this.state.status.map((log, index) => {
                              return (
                                <tr key={index}>
                                  
                                  <td className="textAlignLeft">{index+1}</td>
                                  <td className="textAlignLeft">{log.value}</td>
                                  <td className="textAlignLeft">{moment(log.statusAt).format("LLLL")}</td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  :
                  <div className="centernote col-lg-12"> No data available </div>
                }
              </div>
              <p className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noteText">Please note, you will not be able to make changes to your booking. In case you still want to make changes, you can send a change request to the admin. Please enter your change request in the below field. You can request for all changes except the Vehicle Category Change! If you want to change the Vehicle Category, you need to cancel this booking and request new booking</p>
              <form id="ChangeRequestForm"  >
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                  <textarea rows="4" cols="60" className="customTextArea" placeholder="Enter details that need to be changed..." value={this.state.remark} name="remark" ref="remark" onChange={this.handleChange.bind(this)} required></textarea> 
                </div>
                <button onClick={this.submit.bind(this)} className="col-lg-2 col-md-2 col-sm-12 col-xs-12 btn button3 acceptTrip pull-right" id="btnCheck" >
                  Submit
                </button>
              </form>
            </div>
                        
                 
      );
  } 
}
export default withRouter(ChangeRequest); 
