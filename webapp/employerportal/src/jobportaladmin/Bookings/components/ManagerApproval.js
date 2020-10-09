import React, { Component }   from 'react';
import $                      from 'jquery';
import axios                  from 'axios';
import {withRouter}       from 'react-router-dom';
import swal                   from 'sweetalert';
import moment                   from 'moment';

import _                      from 'underscore';
import 'bootstrap/js/tab.js';
class ManagerApproval extends Component {
  
  constructor(props) {
      super(props);
    
      this.state = {
        id : '',
        remark:'',
        remarkVal:'',
        loggedIn:false,
        showEditForm:false,
        managerData:[]
      };
      this.handleChange = this.handleChange.bind(this);
      this.ApproveBooking = this.ApproveBooking.bind(this);
      this.RejectBooking = this.RejectBooking.bind(this);
  }

  componentDidMount(){
    this.setState({
        id : this.props.personID,
        bookingId: this.props.bookingId,
        status: this.props.status,
      },()=>{
    
    axios.get('/api/bookingmaster/get/getManagerBookingStatus/'+this.state.bookingId)
    .then((res)=>{
      this.setState({managerData:res.data.reverse()})
    })
    .catch((err)=>{console.log(err)})

    axios.get('/api/bookingmaster/get/booking/'+this.state.bookingId)
     .then((response)=>{
      this.setState({
          approvalRequired : response.data.data[0].approvalRequired
        })
      if(response.data.data[0].approver1exist == 'Yes'){
        this.setState({
          approverexist:'Yes',
        })
        axios.get("/api/personmaster/get/one/"+response.data.data[0].managerId1)
          .then((response)=>{
            this.setState({
                managerNumber : response.data.contactNo,
                managerName: response.data.firstName+' '+response.data.lastName,
                approverID : response.data.employeeId
            })
          })
          .catch((error)=>{
            console.log('error: ',error)
          })   
      }else{
        this.setState({
          approverexist:'No',
          approverID : response.data.data[0].managerID1,
          approvalRequired : response.data.data[0].approvalRequired
        })
      }
     })
     .catch((err)=>{
      console.log(err)
     })
  })

    var userId = localStorage.getItem("user_ID");
        axios.get("/api/users/get/email/"+userId)
        .then((response) => {
             axios.get("/api/personmaster/get/emailID/"+response.data)
            .then((res) => {
                var managerId = res.data.data[0]._id;
                if(managerId == this.state.id){
                  this.setState({loggedIn:true})
                }
              
            })
            .catch((error) => {
            }) 
                      
        })
        .catch((error) => {
        })
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      id : nextProps.personID,
      status: nextProps.status,
      bookingId:nextProps.bookingId,
      showEditForm:false
    },()=>{

     axios.get('/api/bookingmaster/get/getManagerBookingStatus/'+this.state.bookingId)
    .then((res)=>{
      this.setState({managerData:res.data.reverse()})
    })
    .catch((err)=>{console.log(err)})

    //  axios.get('/api/bookingmaster/get/matchStatus/'+nextProps.bookingId)
    // .then((response) => {
    //   if(response.data.data[0]){
    //     if(response.data.data[0].status.value == 'Manager Approved' || response.data.data[0].status.value == 'Edited Manager Approved'){
    //       var status = 'Approved'
    //     }else{
    //       var status = 'Rejected'
    //     }
    //     this.setState({
    //       approvedOn:response.data.data[0].status.statusAt,
    //       remarkVal:response.data.data[0].status.remark,
    //       status:status
    //     })

    //       axios.get("/api/personmaster/get/one/"+response.data.data[0].status.statusBy)
    //         .then((response)=>{
    //           this.setState({
    //               number : response.data.contactNo,
    //               empName: response.data.firstName+' '+response.data.lastName,
    //           })
    //         })
    //         .catch((error)=>{
    //           console.log('error: ',error)
    //         })            
    //   } 
    // })
    // .catch((error) =>{
    //   console.log('error: ',error)
    // })

     axios.get('/api/bookingmaster/get/booking/'+this.state.bookingId)
     .then((response)=>{
      // console.log('response.data.data[0].approvalRequired: ',response.data)
       this.setState({
          approvalRequired : response.data.data[0].approvalRequired
        })
      if(response.data.data[0].approver1exist == 'Yes'){
        this.setState({
          approverexist:'Yes',
        })
        axios.get("/api/personmaster/get/one/"+response.data.data[0].managerId1)
          .then((response)=>{
            this.setState({
                managerNumber : response.data.contactNo,
                managerName: response.data.firstName+' '+response.data.lastName,
                approverID : response.data.employeeId
            })
          })
          .catch((error)=>{
            console.log('error: ',error)
          })   
      }else{
        this.setState({
          approverexist:'No',
          approverID : response.data.data[0].managerID1,
          approvalRequired : response.data.data[0].approvalRequired
        })
      }
     })
     .catch((err)=>{
      console.log(err)
     })
    })

     var userId = localStorage.getItem("user_ID");
        axios.get("/api/users/get/email/"+userId)
        .then((response) => {
             axios.get("/api/personmaster/get/emailID/"+response.data)
            .then((res) => {
                var managerId = res.data.data[0]._id
                if(managerId == this.state.id){
                  this.setState({loggedIn:true})
                }
               
            })
            .catch((error) => {
            }) 
                      
        })
        .catch((error) => {
        })
  }
  
  handleChange(event){
    event.preventDefault();
    const target = event.target;
    const name = target.name;

    this.setState({
      [name]: event.target.value
    });
  }

  ApproveBooking(status,event){
    if(this.state.status === 'New' || this.state.status === 'Manager Rejected'){
      var statusVar = "Manager "+status
    }else if(this.state.status === 'Edited'){
      var statusVar = "Edited Manager "+status
    }else if(this.state.status === 'PR Admin Edited'){
      var statusVar = "PR Manager "+status
    }else{
      var statusVar = "Manager "+status
    }
    var formvalues={
      bookingID: this.state.bookingId,
      status  : {
                    value      : statusVar,
                    statusBy   : this.state.id,
                    remark     : this.state.remark,
                    statusAt   : new Date(),
                },
    }
    axios.patch("/api/bookingmaster/patch/status",formvalues)
    .then((response) => {
      this.setState({remark:""})
        swal("Booking Approved");
        axios.get('/api/bookingmaster/get/manager/'+this.state.bookingId+'/Manager Approved')
        .then((result)=>{
          var sendData = {
          "event": "Event10",
          "toUser_id": result.data.employeeID,
          "toUserRole":"employee",
          "company_id": result.data.corporateId,
          "otherAdminRole":'corporateadmin',
          "variables": {
            "EmployeeName" : result.data.firstName +' '+result.data.lastName,
            "EmployeeID" : result.data.employeeId,
            "managerName" : result.data.managerDetails.firstName +' '+result.data.managerDetails.lastName,
            "managerID" : result.data.managerDetails.employeeId,
            "managerNumber":result.data.managerDetails.contactNo,
            "BookingNum":result.data.bookingId,
            }
          }
          console.log('sendDataToUser==>', sendData)
          axios.post('/api/masternotifications/post/sendNotification', sendData)
          .then((res) => {
          console.log('sendDataToUser in result==>>>', res.data)
          })
          .catch((error) => { console.log('notification error: ',error)})
          this.setState({
            hasApproved:'true',
            // status:status
          })
          console.log('this.state.status==>',this.state.status)
          if(this.state.status === 'New' || this.state.status === 'Manager Rejected'|| this.state.status === 'Manager Approved'|| this.state.status === 'Edited' || this.state.status === 'Edited Manager Approved'|| this.state.status === 'Edited Manager Rejected' || this.state.status === 'Allocated To Vendor'){
            var city = result.data.fromCity
            var district = result.data.fromDistrict
            console.log('city=>',city,district)
            axios.get('/api/bookingmaster/get/AllocateToVendor/'+result.data.booking_id+'/'+city+'/'+district+'/'+localStorage.getItem("user_ID"))
            .then((response)=>{
              var vendor_id = response.data;
              axios.get('/api/bookingmaster/get/vendor/'+result.data.booking_id)
                .then((res)=>{
                    var sendData = {
                        "event": "Event13",
                        "toUser_id": res.data.employeeID,
                        "toUserRole":"employee",
                        "company_id": vendor_id,
                        "otherAdminRole":'vendoradmin',
                        "variables": {
                          "VendorName" : res.data.vendorDetails.profile.fullName,
                          "companyName" : res.data.vendorDetails.profile.companyName,
                          "contactNo":res.data.vendorDetails.profile.mobile,
                          "EmployeeName" : res.data.firstName +' '+res.data.lastName,
                          "EmployeeID" : res.data.employeeId,
                          "BookingID":res.data.bookingId,
                          "Pickup":res.data.from,
                          "Drop":res.data.to,
                          "PickupDate":moment(res.data.pickupDate).format('DD/MM/YYYY'),
                          "ReturnDate":moment(result.data.returnDate).format('DD/MM/YYYY'),
                        }
                    }
                    console.log('sendDataToUser==>', sendData)
                    axios.post('/api/masternotifications/post/sendNotification', sendData)
                    .then((res) => {
                    console.log('sendDataToUser in result==>>>', res.data)
                    
                    })
                    .catch((error) => { console.log('notification error: ',error)
                      
                    })
                  
                })
                .catch((error)=>{console.log(error)})
            })
            .catch((error) => { console.log('allocation error: ',error)})
          }
          // axios.get('/api/bookingmaster/get/matchStatus/'+this.state.bookingId)
          // .then((response) => {
          //   if(response.data.data[0]){
          //     this.setState({
          //       approvedOn:response.data.data[0].status[0].statusAt,
          //       remark:response.data.data[0].status[0].remark,
          //     })
          //     var statusBy = response.data.data[0].status[0].statusBy
          //     axios.get("/api/personmaster/get/one/"+statusBy)
          //     .then((response)=>{
          //       this.setState({
          //           number : response.data.contactNo,
          //           empName: response.data.firstName+' '+response.data.lastName,
          //       })
          //     })
          //     .catch((error)=>{
          //       console.log('error: ',error)
          //     }) 

          //   } 
          // })
          // .catch((error) =>{
          //   console.log('error: ',error)
          // })

           this.props.getData();
          // this.props.history.push('/new-bookings');
          // window.location.reload();
        })
        .catch((error) =>{
          console.log(error)
        })
        
        
    })
    .catch((error) =>{

    })
    
      

  }

  updateStatus(formvalues,status){
    axios.patch("/api/bookingmaster/patch/status",formvalues)
    .then((response) => {
      this.setState({remark:""})
        swal("Booking Rejected");
        axios.get('/api/bookingmaster/get/manager/'+this.state.bookingId+'/Manager Rejected')
        .then((result)=>{
          var sendData = {
          "event": "Event11",
          "toUser_id": result.data.employeeID,
          "toUserRole":"employee",
          "company_id": result.data.corporateId,
          "otherAdminRole":'corporateadmin',
          "variables": {
            "EmployeeName" : result.data.firstName +' '+result.data.lastName,
            "EmployeeID" : result.data.employeeId,
            "managerName" : result.data.managerDetails.firstName +' '+result.data.managerDetails.lastName,
            "managerID" : result.data.managerDetails.employeeId,
            "managerNumber":result.data.managerDetails.contactNo,
            "BookingNum":result.data.bookingId,
            }
          }
          console.log('sendDataToUser==>', sendData)
          axios.post('/api/masternotifications/post/sendNotification', sendData)
          .then((res) => {
          console.log('sendDataToUser in result==>>>', res.data)
          })
          .catch((error) => { console.log('notification error: ',error)})
          this.setState({
            hasApproved:'true',
            status:status
          })
          // this.props.history.push('/new-bookings');
          this.props.getData();
        })
        .catch((error) =>{
          console.log(error)
        })
    })
    .catch((error) =>{
      console.log('error: ',error)
    })
  }

  RejectBooking(status,event){
    if(this.state.status === 'New'){
      var statusVar = "Manager "+status
    }else if(this.state.status === 'Edited'){
      var statusVar = "Edited Manager "+status
    }else if(this.state.status === 'PR Admin Edited'){
      var statusVar = "PR Manager "+status
    }else{
      var statusVar = "Manager "+status
    }
    var formvalues={
      bookingID: this.state.bookingId,
      status  : {
                    value      :statusVar,
                    statusBy   : this.state.id,
                    remark     : this.state.remark,
                    statusAt   : new Date(),
                },
    }

    console.log('this.state.status: ',this.state.status)

    if(this.state.status === 'New' || this.state.status === 'Edited'){
      this.updateStatus(formvalues,status)
    }else{

      axios.get('/api/bookingmaster/get/booking/'+this.state.bookingId)
      .then((response)=>{
        var driverInfo = response.data.data[0].status.filter((elem)=>{return elem.value==="Trip Allocated To Driver"});
        var vendorInfo = response.data.data[0].status.filter((elem)=>{return elem.value==="Allocated To Vendor"})
        if( driverInfo && driverInfo.length > 0){
          var driver = driverInfo[driverInfo.length-1].allocatedToDriver;
          var vendor_id = driverInfo[driverInfo.length-1].statusBy;
          axios.patch("/api/bookingmaster/patch/status",formvalues)
        .then((response) => {
          this.setState({remark:""})
            swal("Booking Rejected");
            axios.get('/api/bookingmaster/get/manager/'+this.state.bookingId+'/Manager Rejected')
            .then((result)=>{
              var sendData = {
              "event": "Event11",
              "toUser_id": vendor_id,
              "toUserRole":"vendoradmin",
              "company_id": result.data.corporateId,
              "otherAdminRole":'corporateadmin',
              "variables": {
                "EmployeeName" : result.data.firstName +' '+result.data.lastName,
                "EmployeeID" : result.data.employeeId,
                "managerName" : result.data.managerDetails.firstName +' '+result.data.managerDetails.lastName,
                "managerID" : result.data.managerDetails.employeeId,
                "managerNumber":result.data.managerDetails.contactNo,
                "BookingNum":result.data.bookingId,
                }
              }
              console.log('sendDataToUser==>', sendData)
              axios.post('/api/masternotifications/post/sendNotification', sendData)
              .then((res) => {
              console.log('sendDataToUser in result==>>>', res.data)
              })
              .catch((error) => { console.log('notification error: ',error)})
              this.setState({
                hasApproved:'true',
                status:status
              })
              this.props.getData();
            })
            .catch((error) =>{
              console.log(error)
            })
        })
        .catch((error) =>{
          console.log('error: ',error)
        })
        }else if( vendorInfo && vendorInfo.length > 0){
          axios.patch("/api/bookingmaster/patch/status",formvalues)
          .then((response) => {
            this.setState({remark:""})
            swal("Booking Rejected");
            this.props.getData();
          })
          .catch((error) =>{
            console.log('error: ',error)
          })
        }else{this.updateStatus(formvalues,status)}
        
      })
      .catch((err)=>{
        console.log('error: ',err)
      })
    }
    
   
  }

  editStatus(event){
    event.preventDefault();
    this.setState({showEditForm:true})
  }

  render() {
    var getCurrentUrl = window.location.pathname;
        return (  
            <div>
                <div className="">  
                { getCurrentUrl == '/booking-details' && this.state.status != 'Cancelled By User' ?
                  this.state.approvalRequired === 'Yes' && this.state.id === undefined ?
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <h5 className="titleprofileTD col-lg-8">Manager Approval</h5>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                    <h5>APPROVAL REQUEST SENT TO THE MANAGER ID {this.state.approverID}</h5>
                    <p>Note: Please ask your manager to register to the system for approving the booking</p>
                    </div>
                  </div>
                  :
                  this.state.id ?

                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <h5 className="titleprofileTD col-lg-8">Manager Approval</h5>
                    {this.state.managerData && this.state.managerData.length > 0 ?
                      this.state.managerData.map((data,index)=>{
                        return(
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" key={index}>
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding ">
                                <div className="col-lg-2 col-md-12 col-sm-12 col-xs-12 approvedImg">
                                    <img src={data.status == 'Manager Approved' || data.status == 'Edited Manager Approved' ?'/images/Approved.png':'/images/Rejected.png'}/>
                                </div>
                                <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12 nopadding">
                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 approvedImg">
                                  <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 listfontED ">
                                    <li>Status Updated On</li>
                                    <li>{moment(data.date).format('MMMM Do YYYY, HH:mm')}</li>
                                  </ul> 
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 approvedImg">
                                  <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 listfontED ">
                                    <li>{data.manager.firstName} {data.manager.lastName} (EmpID:{data.manager.employeeId})</li>
                                    <li>{data.manager.contactNo ?  data.manager.contactNo : null} </li> 
                                  </ul> 
                                </div>
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 showRemark ">Remark: {data.remark ? data.remark : 'NIL'}</div>
                            </div>
                          )
                      })

                      :
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  ">
                      
                      {this.state.approverexist == 'Yes' && this.state.approvalRequired === 'Yes'?
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                        <h5>APPROVAL REQUEST SENT TO THE MANAGER</h5>
                        <ul className="nopadding">
                          <li>{this.state.managerName+' ('+this.state.approverID+')'}</li>
                          <li>{this.state.managerNumber}</li>
                        </ul>
                      </div>
                      :
                      null
                      }
                      {this.state.approverexist == 'No' && this.state.approvalRequired === 'Yes'?
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                        <h5>APPROVAL REQUEST SENT TO THE MANAGER ID {this.state.approverID}</h5>
                        <p>Note: Please ask your manager to register to the system for approving the booking</p>
                        </div>
                        :
                     null
                      }
                    </div>
                  }
                  </div>
                :
                 null
                  :
                  null
                }
                {getCurrentUrl == '/booking-details' && this.state.status != 'Cancelled By User' && this.state.approvalRequired === 'No' ?
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  ">
                      <h5>NO APPROVAL REQUIRED FOR THIS BOOKING</h5>
                    </div>
                  :
                  null
                }
                {
                  (getCurrentUrl !== '/booking-details') && this.state.id ?

                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 boxshade">             
                    {
                      this.state.showEditForm == false?
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                        <h5 className="titleprofileTD col-lg-8">Manager Approval</h5>
                        
                        {this.state.managerData && this.state.managerData.length > 0 && this.state.loggedIn  ?
                            <div>
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <i className="fa fa-pencil fa-lg penmrleft pull-right col-lg-1 col-md-1 col-sm-1 col-xs-1" title="Edit" style={{'color':'red'}} aria-hidden="true" onClick={this.editStatus.bind(this)}></i>
                              </div>
                            </div>
                          :
                          null
                        }
                         {this.state.managerData && this.state.managerData.length > 0 ? 
                          this.state.managerData.map((data,index)=>{
                            return(
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" key={index}>
                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding ">
                                    <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 approvedImg">
                                        <img src={data.status == 'Manager Approved' || data.status == 'Edited Manager Approved' ?'/images/Approved.png':'/images/Rejected.png'}/>
                                    </div>
                                    <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12 nopadding">
                                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 approvedImg">
                                      <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 listfontED ">
                                        <li>Status Updated On</li>
                                        <li>{moment(data.date).format('MMMM Do YYYY, HH:mm')}</li>
                                        <li>Remark: {data.remark ? data.remark : 'NIL'}</li>
                                      </ul> 
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 approvedImg">
                                      <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 listfontED ">
                                        <li>{data.manager ? data.manager.firstName : ""} {data.manager ? data.manager.lastName : ""} (EmpID:{data.manager ? data.manager.employeeId : ""})</li>
                                        <li>{data.manager && data.manager.contactNo ? data.manager.contactNo : null}</li>
                                      </ul> 
                                    </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 showRemark ">Remark: {data.remark ? data.remark : 'NIL'}</div>
                                </div>
                              )
                          })

                          :
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                <textarea rows="4" cols="60" className="customTextArea" placeholder="Add your remark here" value={this.state.remark} name="remark" ref="remark" onChange={this.handleChange.bind(this)}></textarea> 
                              </div>
                              <button onClick={this.ApproveBooking.bind(this,'Approved')} className="col-lg-4 col-md-2 col-sm-12 col-xs-12 btn button3 acceptTrip" id="btnCheck" >
                                Approve This Trip
                              </button>
                              <button onClick={this.RejectBooking.bind(this,'Rejected')} className="col-lg-4 col-lg-offset-1 col-md-2 col-sm-12 col-xs-12 btn button3 rejectTrip" id="btnCheck" >
                                Reject This Trip
                              </button>
                            </div>
                            
                          </div>
                        }
                      </div>
                      :
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                        <h5 className="titleprofileTD col-lg-8">Manager Approval</h5>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                            <textarea rows="4" cols="60" className="customTextArea" placeholder="Add your remark here" value={this.state.remark} name="remark" ref="remark" onChange={this.handleChange.bind(this)}></textarea> 
                          </div>
                          <button onClick={this.ApproveBooking.bind(this,'Approved')} className="col-lg-4 col-md-2 col-sm-12 col-xs-12 btn button3 acceptTrip" id="btnCheck" >
                            Approve This Trip
                          </button>
                          <button onClick={this.RejectBooking.bind(this,'Rejected')} className="col-lg-4 col-lg-offset-1 col-md-2 col-sm-12 col-xs-12 btn button3 rejectTrip" id="btnCheck" >
                            Reject This Trip
                          </button>
                        </div>
                        
                      </div>
                    }
                  </div>
                  :
                  null
                }
               </div>
           </div>
      );
  } 
}
export default withRouter(ManagerApproval); 
