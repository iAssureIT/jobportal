import React, { Component }     from 'react';
import $                        from 'jquery';
import jQuery                   from 'jquery';
import axios                    from 'axios';
import moment                   from 'moment';

import IAssureTable             from "./IAssureTable.js";
import BookingProfile           from './components/BookingProfile.js';

import "./BookingMaster.css";
import 'bootstrap/js/tab.js';


class AllFemaleEmployeeListofTheDay extends Component {
     
    constructor(props) {
        super(props);
        this.state = {
        	booking_id:"",
          tableHeading:{
            BookingID:"Booking Number",
            Company:"Company",
            EmpDetails:"Employee Details",
            Status:"Status",
            BookingDateTime:"Booking Date & Time",
            Date:"Travel Date",
            Destination:"Destination Details",
            driver:"Driver Details",
            vehicle:"Vehicle Details",

          },
          RecordsCount:'',
          RecordsTable:[],
          tableObjects : {
          paginationApply : false,
          searchApply     : false
      }
        };
        this.showUserDetails = this.showUserDetails.bind(this);

    }


    componentDidMount() {
      window.showUserDetails = this.showUserDetails;
        this.getData();
    }

    componentWillReceiveProps(nextProps){
      window.showUserDetails = this.showUserDetails;
        this.getData();
    }

    showUserDetails(id){
      // var id = "#showProfile-"+id
      this.setState({booking_id:id},()=>{
        $('showProfile').show()
      })
    }

  getData(){ 
    
    axios.get('/api/bookingmaster/get/EmployeeTravelled_Company/'+ localStorage.getItem("company_Id"))
      .then((response) => {
        var tableData = response.data.map((a, i)=>{
          var driverDetails = a.driverDetails;
          var status = "";
          if(a.statusValue == "New" || a.statusValue == "Edited" || a.statusValue == "Allocated To Vendor" || a.statusValue == "Trip Allocated To Driver" || a.statusValue == "Running" || a.statusValue == "Started From Garage" || a.statusValue == "Ready To Bill" || a.statusValue == "Start From Pickup" || a.statusValue == "Intermediate Stop" || a.statusValue == "Change Request"){
           status = '<span class="label label-info">'+a.statusValue+'</span>'
          }else if(a.statusValue == "Manager Approved" || a.statusValue == "Edited Manager Approved" || a.statusValue == "Driver Accepted" || a.statusValue == "Reached Pickup Location" || a.statusValue == "Start OTP Verified" || a.statusValue == "Reached Destination" || a.statusValue == "End OTP Verified" || a.statusValue == "Reached Drop Location" || a.statusValue == "Reached Garage" || a.statusValue == "Expense Submitted"){
            status = '<span class="label label-success">'+a.statusValue+'</span>'
          }else if(a.statusValue == "Manager Rejected" || a.statusValue == "Edited Manager Rejected" || a.statusValue == "Driver Rejected"){
            status = '<span class="label label-danger">'+a.statusValue+'</span>'
          }else if(a.statusValue == "Driver Changed By Vendor" || a.statusValue == "Cancelled By Vendor" || a.statusValue == "Cancelled By User"){
            status = '<span class="label label-warning">'+a.statusValue+'</span>'
          }else{
            status = '<span class="label label-info">'+a.statusValue+'</span>'
          }

        return{
              BookingID:'<div class="label label-primary btn btn-link" onclick=window.showUserDetails("' +a._id +'") data-toggle="modal" data-target="#showProfile" title="Show Booking Details">'+a.bookingId+'</div>',
              Company:"<a  title='View company profile'  target='_blank' href='/company-profile/"+(a.corporateId)+"'>"+a.companyName +" (" +a.companyID+")"+"</a>",
              EmpDetails:"<b>Name :</b> "+"<a  title='View profile' target='_blank' href='/employee-profile/"+(a.employeeId)+"'>"+a.name+"</a>" + " <br><b>Emp ID :</b> " + (a.contact? a.contact :"- NA -" ),
              Status:status,
              BookingDateTime:moment(a.createdAt).format('DD/MM/YYYY,hh:mm'),
              Date:moment(a.pickupDate).format('DD/MM/YYYY'),
              Destination:"<b>From : </b> "+a.from.address1+', '+a.from.address+', '+a.from.pincode+'<br> <b>To : </b> '+a.to.address1+', '+a.to.address+', '+a.to.pincode,
              driver:driverDetails.firstName!=="" ? "<div>"+driverDetails.firstName+" "+driverDetails.middleName+" "+driverDetails.lastName+"<p>"+driverDetails.contactNo+"</p></div>" : "NA",
              vehicle:a.vehicleCategory!=="" ? "<div>"+a.vehicleCategory+" | "+a.vehicleBrand+" | "+a.vehiclecolor+" | "+a.vehicleNumber+"</div>" : "NA"
        }
      })
          this.setState({RecordsTable:tableData})
      })
      .catch((error) =>{
          console.log("ERROR : ", error); 
      })
    }

  
  render() {
    return (
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOPadding">
        <section className="content">   
          <div className="pageContent col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
              <h4 className="weighttitle col-lg-5 col-md-11 col-xs-11 col-sm-11">Today's Female Employee Booking List</h4>
            </div>
            <section className="Content">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 ">                  
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
                  <IAssureTable
                      tableHeading={this.state.tableHeading}
                      dataCount={this.state.RecordsCount}
                      tableData={this.state.RecordsTable}
                      tableObjects={this.state.tableObjects}
                      getData={this.getData.bind(this)}
                      />

                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    );
  }
}
export default AllFemaleEmployeeListofTheDay;

