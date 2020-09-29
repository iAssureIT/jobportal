import React, { Component }                       from 'react';
import { connect }                                from 'react-redux';
import { withRouter }                             from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';


// Section: 1 - SystemSecurity ******************************************************
import Login from './projectAdmin/systemSecurity/Login.js';
import ConfirmOtp from './projectAdmin/systemSecurity/ConfirmOtp.js';
import ForgotPassword from './projectAdmin/systemSecurity/ForgotPassword.js';
import ResetPassword from './projectAdmin/systemSecurity/ResetPassword.js';
import ResetPasswordFirstLogin from './projectAdmin/systemSecurity/ResetPasswordFirstLogin.js';
import SignUp from './projectAdmin/systemSecurity/SignUp.js';


import Footer                                   from './coreadmin/common/footer/Footer.js';
import EmployeeMaster                             from "./coreadmin/Master/EmployeeMaster/EmployeeMaster.js"
import Leftsidebar                              from './projectAdmin/Common/leftSidebar/Leftsidebar.js';
import Dashboard                                from './projectAdmin/Dashboard/Dashboard.js'
 import Header                                   from './projectAdmin/Common/header/Header.js'; 
// import Leftsidebar                              from './projectAdmin/Common/leftSidebar/Leftsidebar.js';

// ============ Contract Management ==========f================= 
import Contract                                 from "./projectAdmin/ContractManagement/Contract/Contract.js";
import Package                                  from "./projectAdmin/ContractManagement/Package/Package.js";
import Condition                                from "./projectAdmin/ContractManagement/Condition/Condition.js";
import Viewcontract                             from './projectAdmin/ContractManagement/View/Viewcontract.js';
import NoContract                               from './projectAdmin/ContractManagement/View/NoContract.js';
import List                                     from './projectAdmin/ContractManagement/List/List.js';
// // // import Rightsidebar                             from './projectAdmin/Common/rightSidebar/Rightsidebar.js';
import EmployeeProfile                          from './projectAdmin/Profile/EmployeeProfile/EmployeeProfile.js';
import CompanyProfile                           from './projectAdmin/Profile/CompanyProfile/CompanyProfile.js';
import CompanyProfileView                       from './projectAdmin/Profile/CompanyProfile/CompanyProfileView.js';

// ============ Contract Management =========================== 

import BookingMaster from "./projectAdmin/Bookings/BookingMaster.js"
import BookingDetails from "./projectAdmin/Bookings/BookingDetails.js"
import BookingConfirmation from "./projectAdmin/Bookings/BookingConfirmation.js"
import AdminBookingList from "./projectAdmin/Bookings/AdminBookingList.js"
import AllBookings from "./projectAdmin/Bookings/AllBookings.js"
import TripDetailList from "./projectAdmin/Bookings/TripDetailList.js"
import CRApprovedBookings from "./projectAdmin/Bookings/CRApprovedBookings.js"
import CRAdminApprovedBookings from "./projectAdmin/Bookings/CRAdminApprovedBookings.js"
import ApprovedBookings from "./projectAdmin/Bookings/ApprovedBookings.js"
import RejectedBookings from "./projectAdmin/Bookings/RejectedBookings.js"
import AllFemaleEmployeeListofTheDay from "./projectAdmin/Bookings/AllFemaleEmployeeListofTheDay.js"


// ============ EntityMapping =========================== 
import EntityMapping                            from "./projectAdmin/EntityMapping/Contract/EntityMapping.js";
import EntityMappingView                        from './projectAdmin/EntityMapping/View/EntityMappingView.js';
import EntityMappingList                        from './projectAdmin/EntityMapping/List/EntityMappingList.js';
import VehicleCategory                          from './projectAdmin/VehicleCategory/VehicleCategory.js';
import DesignationMapping                       from "./projectAdmin/DesignationMapping/DesignationMapping.js"
import ListOfVehicles                           from './projectAdmin/VehicleMaster/listOfVehicles/components/ListOfVehicles.jsx';

//============= Supplier Master ====================
import SupplierBasicInfo from './projectAdmin/SupplierMaster/SupplierBasicInfo.js';
import SupplierLocationDetails from './projectAdmin/SupplierMaster/SupplierLocationDetails.js';
import SupplierContactDetails from './projectAdmin/SupplierMaster/SupplierContactDetails.js';
// ============= One Field Component ==================
import FuleType                                 from "./projectAdmin/FuleType/FuleType.js"
import DriverMaster                             from "./projectAdmin/DriverMaster/DriverMaster.js"
import Brand                                    from "./projectAdmin/Brand/Brand.js"
import ExpenseTypeMaster                        from "./projectAdmin/ExpenseTypeMaster/ExpenseTypeMaster.js"
import Category                                 from './projectAdmin/Category/Category.jsx';
// ============= Vehicle Master =======================
import VehicleMaster                            from "./projectAdmin/VehicleMaster/VehicleMaster.js"

import axios                from 'axios';
import CoreLayout from './coreadmin/CoreLayout/CoreLayout.js';

import DepartmentBulkUpload from "./projectAdmin/Master/Department/DepartmentBulkUpload.js"
//import DesignationBulkUpload from "../projectAdmin/Master/Designation/DesignationBulkUpload.js"
import DepartmentList    from "./projectAdmin/Master/Department/DepartmentList.js"
import Department from "./projectAdmin/Master/Department/Department.js"
import VehicleEmployeeMapping from "./coreadmin/Master/VehicleEmployeeMapping/VehicleEmployeeMapping.js"
import LiveTracking         from './projectAdmin/LiveTracking/LiveTracking.js';


class Layout extends Component  {

    constructor(props) {
        super();
        this.state = {
            loggedIn: false,
            sidebar: true,
            empProfileStatus: true,
            contractDetails:"",
            profileStatus:""
        }
    }

    componentDidMount() {
      var company_Id = localStorage.getItem("company_Id");
      var user_id = localStorage.getItem("user_ID");

      var contractID ="";
      axios.get("/api/contract/get/one/entity/" + company_Id)
      .then((response) => {
          if(response.data.length>0){
              var contractDetails = response.data[0];
               axios.get("/api/entitymaster/get/one/"+company_Id)
              .then((response)=>{
                  if(response.data[0].profileStatus === "New" || contractDetails.status !== "Approved"){
                      this.setState({
                          sidebar:false
                      })
                  }
              })
              .catch((error)=>{})
          }else{
              this.setState({
                  sidebar:false
              })
          }
      })
      .catch((error) => {})

      axios.get('/api/personmaster/get/details/' + user_id)
      .then((res) => {
        console.log("res empProfileStatus",res)
        if(res.data[0].profileStatus && res.data[0].profileStatus === "New" )
        {
          this.setState({
            empProfileStatus : false
          })
        }
        
      })
      .catch((err) => {
      })

       

      const token = localStorage.getItem("token");
      if (token !== null && token !== "undefined") {
          this.setState({
              loggedIn: true
          })
      } else { }

    }

    logout() {
        var token = localStorage.removeItem("token");
        if (token !== null && token !== "undefined") {
            this.setState({
                loggedIn: false
            })
        }
    }

    render() {
        const roles = localStorage.getItem("roles");
        var roleArr = [];
        roleArr.push(roles);
        console.log("this.state.sidebar ",this.state.sidebar );
        if (this.state.loggedIn) {
            return (
            <Router>
                <div className="hold-transition skin-blue fixed sidebar-mini">
                    <div className="content-wrapper">
                        <div className="wrapper">
                            <Header />
                            <div className="">
                                <div className="row">
                                    {   
                                        (roles.indexOf("corporateadmin")>-1) ?
                                            this.state.sidebar && this.state.empProfileStatus?
                                                <Leftsidebar/>
                                            :
                                            null
                                        :
                                        ( this.state.empProfileStatus ? <Leftsidebar/> : null)
                                    }

                                    <div className="container-fluid main-container">
                                        <div className="row">
                                            <div className="dashboardWrapper" >
                                                <div className="backColor col-lg-12 col-md-12 col-sm-12 col-xs-12" >
                                                    <CoreLayout />
                                                    <Switch >
                                                        <Route path="/" component={Dashboard} exact />
                                                        <Route path="/dashboard" component={Dashboard} exact />

                                                        <Route path="/contract-management"                         exact strict component={Contract}  />
                                                        <Route path="/contract-management/:contractID"             exact strict component={Contract}  />
                                                        <Route path="/package-details/:contractID"                 exact strict component={Package}  />
                                                        <Route path="/package-details/:contractID/:packageID"      exact strict component={Package}  />
                                                        <Route path="/condition/:contractID"                       exact strict component={Condition}  />
                                                        <Route path="/condition/:contractID/:packageID"            exact strict component={Condition}  />
                                                        <Route path="/viewcontract/:contractID"                    exact strict component={Viewcontract}  />
                                                        <Route path="/contract-view"                               exact strict component={Viewcontract}  />
                                                        <Route path="/no-contract"                                 exact strict component={NoContract}  />
                                                        <Route path="/contract-list"                               exact strict component={List}  />
                                                        <Route path="/company-profile"                             exact strict component={CompanyProfile} />
                                                        <Route path="/company-profile/:comp_ID"                    exact strict component={CompanyProfileView} />
                                                        <Route path="/my-profile"                                  component={EmployeeProfile} exact />                                                        <Route path="/approved-bookings"                           exact strict component={ApprovedBookings} />
                                                        <Route path="/my-profile/:fieldID"                         component={EmployeeMaster} exact />                                                        <Route path="/approved-bookings"                           exact strict component={ApprovedBookings} />
                                                        <Route path="/employee/users/:fieldID"                         component={EmployeeMaster} exact />                                                        <Route path="/approved-bookings"                           exact strict component={ApprovedBookings} />
                                                        <Route path="/driver/users/:fieldID"                         component={EmployeeMaster} exact />                                                        <Route path="/approved-bookings"                           exact strict component={ApprovedBookings} />
                                                        <Route path="/rejected-bookings"                           exact strict component={RejectedBookings} />
                                                        <Route path="/new-bookings"                                exact strict component={TripDetailList} />
                                                        <Route path="/CR-bookings"                                exact strict component={CRApprovedBookings} />
                                                        <Route path="/CR_Bookings_Admin"                                exact strict component={CRAdminApprovedBookings} />
                                                        <Route path="/booking"                                     exact strict component={BookingMaster} />
                                                        <Route path="/booking/:bookingId"                          exact strict component={BookingMaster} />
                                                        <Route path="/booking-details"                             exact strict component={BookingDetails} />
                                                        <Route path="/BookingList"                                 exact strict component={AdminBookingList} />
                                                        <Route path="/all-bookings"                                exact strict component={AllBookings} />
                                                        <Route path="/All_FemaleEmployee"                          exact strict component={AllFemaleEmployeeListofTheDay} />
                                                        <Route path="/tracking/:booking_id" exact strict component={LiveTracking} />
                                                        <Route path="/department"                                  exact strict component={Department} />
                                                        <Route path="/department/:fieldID"                         exact strict component={Department} />

                                                        <Route path="/brand" exact strict component={Brand} />
                                                        <Route path="/fuel-type" exact strict component={FuleType} />
                                                        <Route path="/fuel-type/:fieldID" exact strict component={FuleType} />
                                                        <Route path="/designation-mapping" exact strict component={DesignationMapping} />
                                                        {/* EntityMapping */}
                                                        <Route path="/entity-mapping"                         exact strict component={EntityMapping}  />
                                                        <Route path="/entity-mapping/:mappingID"                         exact strict component={EntityMapping}  />
                                                        <Route path="/viewmapping/:mappingID"                    exact strict component={EntityMappingView}  />
                                                        <Route path="/viewmapping"                    exact strict component={EntityMappingView}  />
                                                        <Route path="/mapping-list"                               exact strict component={EntityMappingList}  />  
                                                        <Route path="/expenseType" exact strict component={ExpenseTypeMaster} />

                                                        <Route path="/driver/master/:fieldID" exact strict component={DriverMaster} />
                                                        <Route path="/driver/master" exact strict component={DriverMaster} />
                                                        { /* Booking Master */}
                                                        <Route path="/supplier/basic-details" exact strict component={SupplierBasicInfo} />
                                                        <Route path="/supplier/basic-details/:entityID" exact strict component={SupplierBasicInfo} />
                                                        <Route path="/supplier/location-details/:entityID" exact strict component={SupplierLocationDetails} />
                                                        <Route path="/supplier/location-details" exact strict component={SupplierLocationDetails} />
                                                        <Route path="/supplier/location-details/:entityID/:locationID" exact strict component={SupplierLocationDetails} />
                                                        <Route path="/supplier/contact-details/:entityID" exact strict component={SupplierContactDetails} />
                                                        <Route path="/supplier/contact-details" exact strict component={SupplierContactDetails} />
                                                        <Route path="/supplier/contact-details/:entityID/:contactID" exact strict component={SupplierContactDetails} />

                                                        
                                                        <Route path="/:entity/category" exact strict component={Category} />
                                                        <Route path="/:entity/category/:entityID" exact strict component={Category} />
                                                        <Route path="/category" exact strict component={Category} />
                                                        <Route path="/category/:fieldID" exact strict component={Category} />
                                                        <Route path="/vehicleCategory" exact strict component={VehicleCategory} />
                                                        <Route path="/vehicleCategory/:fieldID" exact strict component={VehicleCategory} />
                                                        {/* Vehicle Master */}
                                                        <Route path="/vehicle-master" exact strict component={VehicleMaster} />
                                                        <Route path="/vehicle-master/:vehicleID" exact strict component={VehicleMaster} />
                                                        <Route path="/vehicle-list" exact strict component={ListOfVehicles} />
                                                        <Route path="/vehicleEmpMapping" exact strict component={VehicleEmployeeMapping} />
                                                    </Switch>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <Footer />
                </div>
            </Router>
            );
        } else {
            return (
                <div>
                    <Router >
                        <Switch >
                            <Route path="/" exact strict component={Login} />
                            <Route path="/login" exact strict component={Login} />
                            <Route path="/signup" exact strict component={SignUp} />
                            <Route path="/forgotpassword" exact strict component={ForgotPassword} />
                            <Route path="/reset-pwd/:user_ID" exact strict component={ResetPassword} />
                            <Route path="/confirm-otp/:userID" exact strict component={ConfirmOtp} />
                            <Route path="/reset-password/:user_ID" exact strict component={ResetPasswordFirstLogin}  />
                        </Switch>
                    </Router>
                </div>
            );
        }
    }
}

 
export default Layout;