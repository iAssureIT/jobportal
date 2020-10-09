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
// import TimeAgo from 'timeago-react';

import swal                 from 'sweetalert';
import 'bootstrap/js/tab.js';

class ApprovedBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookingData: [],
            id:"",
            empID:"",
            tripArray:[],
            category  :"",
            brand:"",
            model:"",
            capacity:"",
            bookingCount:"",
            bookingNumber:"",
            showData:"",
            status:"Select Status",
            showDetails:false
            // managerId:""
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleChangehandleStatusChange = this.handleStatusChange.bind(this);
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
        var userId = localStorage.getItem("user_ID");
        axios.get("/api/users/get/email/"+userId)
        .then((response) => {
             axios.get("/api/personmaster/get/emailID/"+response.data)
            .then((res) => {
                var managerId = res.data.data[0]._id
                this.setState({managerId:managerId})
                axios.get("/api/bookingmaster/get/allBooking/"+managerId)
                .then((response) => {

                    this.setState({'bookingData':response.data,showDetails : true })
                    document.getElementById(response.data[0]._id).classList.add("selectedEmployee ")
                    console.log("response.data[0]._id",response.data[0]._id)
                })
                .catch((error) =>{
                    console.log('err: ',error)
                })

                axios.get("/api/bookingmaster/get/count/approvalReqBooking/"+this.state.managerId)
                .then((response) => {
                    this.setState({'bookingCount':response.data[0].count})
                })
                .catch((error) =>{

                })
            })
            .catch((error) => {
            }) 
                      
        })
        .catch((error) => {
        })
        
    }

    handleStatusChange(event) {
        const target = event.target;
        this.setState({
            status: event.target.value,
            bookingNumber:"",
            id:""
        },()=>{
                this.getBookingData(this.state.status)
            });
    }
    
    getBookingData(status){
            var formvalue={
                status: "Manager Approved",
                managerId:this.state.managerId
            }
         axios.post("/api/bookingmaster/get/allBookingForManager",formvalue)
            .then((response) => {
                this.setState({'bookingData':response.data})
            })
            .catch((error) =>{
                console.log("ERROR : ", error); 
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
        var data = $(event.currentTarget).attr('id');
        var empId = $(event.currentTarget).attr('name');
        var bookingNum = $(event.currentTarget).attr('Number');
        var cost = $(event.currentTarget).attr('cost');
        var date = $(event.currentTarget).attr('dateAttr');
        this.setState({ id: data,
                        empID:empId, 
                        bookingNumber:bookingNum , 
                        estimatedCost:cost,
                        bookingDate:moment(date).format('DD/MM/YYYY') });

        $('.commonSup').show()
        $('.selected').removeClass('selectedEmployee');
        $(event.currentTarget).addClass('selectedEmployee');

        axios.get('/api/bookingmaster/get/booking/'+data)
            .then((response) => {
                axios.get("/api/vehiclemaster/get/one/"+response.data.data[0].vehicleID)
                    .then((res) => {
                        this.setState({
                          category  :res.data.category,
                          brand:res.data.brand,
                          model:res.data.model,
                          capacity:res.data.capacity
                        })
                    })
                    .catch((error) => {
                    })
                var array = {
                  from    : response.data.data[0].from.address,
                  pickupDate : response.data.data[0].pickupDate,
                  pickupTime : response.data.data[0].pickupTime,
                  returnDate : response.data.data[0].returnDate,
                  to         : response.data.data[0].to.address,
                  returnTime : response.data.data[0].returnTime,
                  bookingType : response.data.data[0].tripType,
                  purposeOfTravel: response.data.data[0].purposeOfTravel,
                  instructions  :response.data.data[0].specialInstruction,
                  selectedVehicle  :this.state.category,
                  stopArr : response.data.data[0].intermediateStops,
                  brand:this.state.brand,
                  model:this.state.model,
                  capacity:this.state.capacity,
                }
                this.setState({'tripArray':array,status:response.data.data[0].statusValue ,showDetails:true})
            })
            .catch((error) =>{

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
                                    <h4 className="weighttitle col-lg-11 col-md-11 col-xs-11 col-sm-11 NOpadding-right"><span className="">Approving Booking</span></h4>
                                </div>
                                <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 ">
                                    <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 frmMargin">
                                        <h5 className="col-lg-6 col-md-6 col-sm-11 col-xs-12">Total Records :&nbsp;&nbsp;<b>{this.state.bookingCount}</b></h5>
                                        <h5 className="col-lg-6 col-md-6 col-sm-11 col-xs-12">Filtered Records :&nbsp;&nbsp;<b>{this.state.bookingData.length}</b></h5>
                                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 NOpadding  input-group inputBox-main">
                                            <select onChange={this.handleStatusChange.bind(this)} value={this.state.status} id="status" ref="status" name="status" className="form-control selectStyle">
                                                <option value="Select Status" disabled>Select Status</option>
                                                <option value="All">All</option>
                                                <option value="New">New</option>
                                                <option value="Manager Approved">Approved</option>
                                                <option value="Manager Rejected">Rejected</option>
                                                <option value="Cancelled By User">Cancelled By User</option>
                                            </select>
                                        </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 borderBottomSO"></div>
                                    </div>
                                </div>
                               
                                {this.state.bookingData && this.state.bookingData.length > 0 ?
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 scrollbar" id="style-2">
                                    {console.log("this.state.bookingData",this.state.bookingData)}
                                        <div className="borderlist12">
                                            {
                                                this.state.bookingData.map((data, index) => {
                                                    return (
                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 empContainer cursorStyle selected activeEmployee" key={index} onClick={this.ShowForm.bind(this)} Number={data.bookingId} dateAttr={data.createdAt} cost={data.estimatedCost} name={data.employeeId} id={data._id}>
                                                            <div className="col-lg-3 col-md-2 col-sm-2 col-xs-2 leftBox dateContainer">
                                                                <img className="childImg" src={data.person[0] ? data.person[0].profilePhoto : "/images/userIcon.jpg"}/>
                                                            </div>
                                                            <div className="col-lg-9 col-md-10 col-sm-10 col-xs-10 leftBox listprofileEmployee nopadding">
                                                                <div className="col-lg-7 col-md-10 tripDetail nopadding">
                                                                    <label className="titleTrip centerAlign col-lg-12">Booking Number: {data.bookingId}</label>
                                                                    <label className=" tripType col-lg-12">{data.person[0].firstName+' '+data.person[0].lastName+'(Emp ID: '+data.person[0].employeeId+')'}</label>
                                                                    <label className=" tripType col-lg-12">{data.person[0].contactNo}</label>
                                                                    <label className=" tripType col-lg-12">{data.from.area} To {data.to.city}</label>
                                                                    <label className=" tripType font10 col-lg-12">{moment(data.pickupDate).format('LL')} To {moment(data.returnDate).format('LL')}</label>
                                                                  
                                                                </div>
                                                                <div className="col-lg-5 borderStyle nopadding">
                                                                    <div className="col-lg-10 nopadding">
                                                                    {/*<TimeAgo className="tripType col-lg-12"
                                                                      datetime={data.createdAt} 
                                                                      locale='vi'
                                                                    />*/}
                                                                    <label className=" titleTrip col-lg-12">Est. Cost {data.estimatedCost}</label>
                                                                    <label className=" tripType col-lg-12">{data.category[0].category}</label>
                                                                    <span className={data.statusValue == 'New'? "statusOfNewTrip pull-right" : data.statusValue == 'Manager Approved' ? "statusOfApprovedTrip pull-right": "statusOfTrip pull-right"}>{data.statusValue}</span>
                                                                    </div>
                                                                    <div className="addedDivBM leftBox col-lg-2 nopadding">
                                                                        <img className="" src="/images/leftArrow.png"/>
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
                                { 
                                this.state.showDetails ?
                                    <div>
                                    {
                                    this.state.id && this.state.bookingData && this.state.bookingData.length > 0 ?
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 pickupType nopadding commonSup" id={this.state.id}>
                                       <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                                        <h5 className="titleprofileBooking">Booking Details</h5>
                                       </div>
                                       <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                           <span className="col-lg-4 col-md-6 col-sm-12 col-xs-12 nopadding">
                                               <b> Booking Number : {this.state.bookingNumber} </b>
                                           </span>
                                           <span className="col-lg-4 col-md-6 col-sm-12 col-xs-12 nopadding pull-right">
                                               <b> Booking Date : {this.state.bookingDate} </b>
                                           </span>
                                       </div>
                                       <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                                       <EmployeeDetails personID={this.state.empID} />                   
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
                                    </div>
                                    :
                                    null
                                    }
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
export default ApprovedBooking;
