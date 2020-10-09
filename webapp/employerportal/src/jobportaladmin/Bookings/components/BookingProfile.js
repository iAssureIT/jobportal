import React, { Component }   from 'react';
import $                      from 'jquery';
import axios                  from 'axios';
import {withRouter}       from 'react-router-dom';
import swal                   from 'sweetalert';
import moment                   from 'moment';
import ChangeRequestView      from './ChangeRequestView.js';
import Collapsible from 'react-collapsible';
import Geocode from "react-geocode";

import _                      from 'underscore';
import 'bootstrap/js/tab.js';

class BookingProfile extends Component {
  
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
        status:''
      };
      this.handleChange = this.handleChange.bind(this);
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      id : nextProps.id,
    },()=>{this.getData()})
    
  }
  componentDidMount(){
    console.log('this.props.id: ',this.props.id)
    this.setState({
        id : this.props.id,
      },()=>{this.getData()})
   
  this.getGoogleAPIKey();
  }

  getGoogleAPIKey(){
    axios.get("/api/projectSettings/get/GOOGLE",)
      .then((response) => {
        this.setState({
        googleAPIKey : response.data.googleapikey
      });
      })
      .catch((error) =>{
        swal(error)
      })
  }

  getAddress(latitude,longitude,index){
    Geocode.setApiKey(this.state.googleAPIKey);
    Geocode.setLanguage("en");
    Geocode.setRegion("es");
    Geocode.enableDebug();
    Geocode.fromLatLng(latitude, longitude).then(
    response => {
      this.setState({
        ["address"+index] : response.results[0].formatted_address
      },()=>{
        console.log("address=>",this.state["address"+index])
      })
    },
    error => {
      console.error(error);
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

  getData(){
    axios.get('/api/bookingmaster/get/one/bookingforvendor/'+this.state.id)
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
        status:response.data.status
      })
    })
    .catch((err)=>{console.log('err: ',err)})
  }

  showHistory(event){
    event.preventDefault();
    $('.toggleHistoryWrapper').toggle()
  }


  render() {
        return (  
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
            {this.props.entity === "ChangeRequest" ? null :
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                  <ul className="col-lg-3"><li>Booking ID</li><li> #{this.state.bookingID}</li></ul>
                  <h5 className="col-lg-6 titleBooking">Booking Details</h5>
                  <ul className="col-lg-3"><li>Booking Date</li><li>{moment(this.state.bookingDate).format('LL')}</li></ul>
              </div>
            }
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
                  <li><i className="fa fa-map-marker " aria-hidden="true"></i>&nbsp;&nbsp; Address : {this.state.from.address1}, {this.state.from.address}, {this.state.from.pincode}.</li>
                  <li><i className="fa fa-clock-o " aria-hidden="true"></i>&nbsp;&nbsp;Date & Time : {moment(this.state.fromDate).format('MMMM Do YYYY')} | {this.state.fromTime ? this.state.fromTime : "--:--"}</li>
                </ul> 
                <label className="col-lg-12 outStatioon">Destination</label>
                <ul className="col-lg-12 col-md-5 col-sm-5 col-xs-5 listfontED ">
                  <li><i className="fa fa-map-marker " aria-hidden="true"></i>&nbsp;&nbsp; Address : {this.state.to.address1}, {this.state.to.address}, {this.state.to.pincode}.</li>
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
                  <li>Vehicle : {this.state.VehicleCategory} {this.state.VehicleNumber ? '( '+this.state.VehicleNumber+' | '+this.state.VehicleModel+' | '+this.state.VehicleBrand+' )' : null}</li>
                  <li>Estimated Cost : {this.state.estimatedCost} </li>
                  </ul>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                  <ChangeRequestView bookingId={this.state.id} />                    
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
                            <th className="umDynamicHeader srpadd textAlignCenter"> Odometer Reading </th>
                            <th className="umDynamicHeader srpadd textAlignCenter"> Odometer Proof </th>
                          </tr>
                        </thead>
                        <tbody>
                            {this.state.status.map((log, index) => {
                              return (
                                <tr key={index}>
                                  
                                  <td className="textAlignLeft">{index+1}</td>
                                  <td className="textAlignLeft">
                                    {(log.value === "Started From Garage" || log.value === "Reached Pickup Location" || 
                                    log.value === "Start OTP Verified" || log.value === "Start From Pickup" ||  
                                    log.value === "Intermediate Stop" || log.value === "Reached Destination" ||
                                    log.value === "Reached Drop Location" || log.value === "End OTP Verified" || log.value === "Reached Garage" ) && log.latitude && log.longitude ?
                                      <Collapsible trigger={<a>{log.value}</a>} triggerStyle={{"cursor":"pointer"}} onOpening={()=>this.getAddress(log.latitude, log.longitude,index)}>
                                        <p>{ this.state["address"+index]}</p>                                                           
                                      </Collapsible> 
                                      :
                                      log.value 
                                    }
                                  </td>
                                  <td className="textAlignLeft">{moment(log.statusAt).format('DD/MM/YYYY,HH:mm')}</td>
                                  <td className="textAlignLeft">{log.odometerReading ? log.odometerReading : "NA"}</td>
                                  <td className="">
                                  {
                                    log.proof? 
                                    <img src={log.proof} className="img-responsive proofImage" />
                                    :
                                    "-"
                                  }
                                  </td>
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
              
            </div>
                        
                 
      );
  } 
}
export default withRouter(BookingProfile); 
