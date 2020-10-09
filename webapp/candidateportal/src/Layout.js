import React, { Component }                       from 'react';
import { connect }                                from 'react-redux';
import { withRouter }                             from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';

// Section: 1 - SystemSecurity ***********************************
import Login                from './projectadmin/systemSecurity/Login.js';
import ConfirmOtp           from './projectadmin/systemSecurity/ConfirmOtp.js';
import ForgotPassword       from './projectadmin/systemSecurity/ForgotPassword.js';
import ResetPassword        from './projectadmin/systemSecurity/ResetPassword.js';
import SignUp               from './projectadmin/systemSecurity/SignUp.js';
import ResetPasswordFirstLogin from './projectadmin/systemSecurity/ResetPasswordFirstLogin.js';
import Header               from './projectadmin/common/header/Header.js'; 
import Footer               from './projectadmin/common/footer/Footer.js';
import Leftsidebar          from './projectadmin/common/leftSidebar/Leftsidebar.js';
import CoreLayout           from './coreadmin/CoreLayout/CoreLayout.js';

import CompanyProfile       from './projectadmin/Profile/CompanyProfile/CompanyProfile.js';
import EmployeeProfile      from './projectadmin/Profile/EmployeeProfile/EmployeeProfile.js';
import CompanyProfileView   from './projectadmin/Profile/CompanyProfile/CompanyProfileView.js';
import Dashboard            from './projectadmin/common/dashboard/Dashboard.js';


import DriverMaster         from "./projectadmin/DriverMaster/DriverMaster.js"
import DriverList           from "./projectadmin/DriverMaster/DriverList.js"

import VehicleMaster        from "./projectadmin/VehicleMaster/VehicleMaster.js"
import ListOfVehicles       from './projectadmin/VehicleMaster/listOfVehicles/components/ListOfVehicles.jsx';

import VehicleDriverMapping from "./projectadmin/VehicleDriverMapping/VehicleDriverMapping.js"

import BookingList          from "./projectadmin/BookingList/bookingList.js"
import Report1              from "./projectadmin/ReportingSystem/report1.js"
import Report2              from "./projectadmin/ReportingSystem/report2.js"

//===============Supllier Managemnt ====================
import SupplierBasicInfo from './projectadmin/SupplierMaster/SupplierBasicInfo.js';
import SupplierLocationDetails from './projectadmin/SupplierMaster/SupplierLocationDetails.js';
import SupplierContactDetails from './projectadmin/SupplierMaster/SupplierContactDetails.js';
import SupplierListOfEntities from './projectadmin/SupplierMaster/SupplierListOfEntities.js';

//============= Vendor Master ====================
import VendorBasicInfo               from './coreadmin/Master/VendorMaster/VendorBasicInfo.js';
import VendorLocationDetails         from './coreadmin/Master/VendorMaster/VendorLocationDetails.js';
import VendorContactDetails          from './coreadmin/Master/VendorMaster/VendorContactDetails.js';
import VendorListOfEntities          from './coreadmin/Master/VendorMaster/VendorListOfEntities.js';
// import Category                      from './coreadmin/Master/Category/Category.jsx';
// import VehicleCategory               from './coreadmin/Master/VehicleCategory/VehicleCategory.js';
import NoContract                               from './projectadmin/ContractManagement/View/NoContract.js';

import LocationType                  from './coreadmin/Master/LocationType/LocationType.jsx';
import SelectVendor                  from './coreadmin/Master/EntityMaster/SelectVendor/SelectVendor.js';
import EmployeeMaster                from "./coreadmin/Master/VendorEmpList/VendorEmployeeMaster.js"
// ============ Payment Process ======================= 

// ============ Contract Management =========================== 
import Viewcontract         from './projectadmin/ContractManagement/View/Viewcontract.js';

//===============+Live Tracking ===============================
import LiveTracking         from './projectadmin/LiveTracking/LiveTracking.js';


class Layout extends Component  {

    constructor(props) {
        super();
        this.state = {
            loggedIn: false,
            sidebar: true,
            empProfileStatus: true,
        }
    }

    componentDidMount() {
       var company_Id = localStorage.getItem("company_Id");
       var contractID ="";

        axios.get("/api/entitymaster/get/one/"+company_Id)
        .then((company)=>{
            axios.get("/api/contract/get/one/entity/" + company_Id)
            .then((contract) => {
                if(contract.data.length>0){
                    var contractDetails = contract.data[0];
                    if(company.data[0].profileStatus === "New" || contractDetails.status !== "Approved"){
                        this.setState({
                            sidebar:false
                        })
                    }
                }else{
                this.setState({
                    sidebar:false
                })
            }
                   

              })
            .catch((error) => {})      
        })
        .catch((error)=>{})
         const user_ID = localStorage.getItem("user_ID");

         axios.get('/api/personmaster/get/details/' + user_ID)
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
                                        (roles.indexOf("vendoradmin")>-1) ?
                                            this.state.sidebar && this.state.empProfileStatus?
                                                <Leftsidebar/>
                                            :
                                            null
                                        :
                                        <Leftsidebar/>
                                    }
                                    <div className="container-fluid main-container">
                                        <div className="row">
                                            <div className="dashboardWrapper" >
                                                <div className="backColor col-lg-12 col-md-12 col-sm-12 col-xs-12" >
                                                    <CoreLayout />
                                                    <Switch >
                                                        
                                                        <Route path="/company-profile"                 exact strict component={CompanyProfile} exact />
                                                        <Route path="/company-profile/:comp_ID"         exact strict component={CompanyProfileView} />
                                                        <Route path="/my-profile"                       component={EmployeeProfile} exact />
                                                        <Route path="/my-profile/:fieldID"              component={EmployeeMaster} exact /> 
                                                        <Route path="/employee/users/:fieldID"              component={EmployeeMaster} exact /> 
                                                        <Route path="/driver/users/:fieldID"              component={EmployeeMaster} exact /> 
                                                        <Route path="/employee-profile/:emp_ID"         component={EmployeeProfile} exact />
                                                        <Route path="/no-contract"                                 exact strict component={NoContract}  />
                                                        <Route path="/contract-view"                   exact strict component={Viewcontract}  />
                                                        <Route path="/"                                            component={Dashboard} exact />
                                                        <Route path="/dashboard"                                   component={Dashboard} exact />  
                                                        
                                                        <Route path="/vendor/driver/master/:fieldID" exact strict component={DriverMaster} />
                                                        <Route path="/vendor/driver/master" exact strict component={DriverMaster} />
                                                        <Route path="/driver/lists" exact strict component={DriverList} />

                                                        {/* Vehicle Master */}
                                                        <Route path="/vehicle-master"                  exact strict component={VehicleMaster} />
                                                        <Route path="/vehicle-master/:vehicleID"       exact strict component={VehicleMaster} />
                                                        <Route path="/vehicle-list"                    exact strict component={ListOfVehicles} />

                                                        <Route path="/vehicle-driver-mapping"          exact strict component={VehicleDriverMapping} />
                                                        <Route path="/vehicle-driver-mapping/:fieldID" exact strict component={VehicleDriverMapping} />
                                                        <Route path="/report1"                         exact strict component={Report1} />
                                                        <Route path="/report2"                         exact strict component={Report2} />
                                                        <Route path="/bookingList"                     exact strict component={BookingList} />

                                                        { /* Supplier Master */}
                                                        <Route path="/supplier/basic-details" exact strict component={SupplierBasicInfo} />
                                                        <Route path="/supplier/basic-details/:entityID" exact strict component={SupplierBasicInfo} />
                                                        <Route path="/supplier/location-details" exact strict component={SupplierLocationDetails} />
                                                        <Route path="/supplier/location-details/:entityID/:locationID" exact strict component={SupplierLocationDetails} />
                                                        <Route path="/supplier/location-details/:entityID" exact strict component={SupplierLocationDetails} />
                                                        <Route path="/supplier/contact-details" exact strict component={SupplierContactDetails} />
                                                        <Route path="/supplier/contact-details/:entityID" exact strict component={SupplierContactDetails} />
                                                        <Route path="/supplier/contact-details/:entityID/:contactID" exact strict component={SupplierContactDetails} />
                                                        <Route path="/supplier/list" exact strict component={SupplierListOfEntities} />

                                                        { /* Vendor Management */}
                                                       {/* <Route path="/vendor/basic-details" exact strict component={VendorBasicInfo} />
                                                        <Route path="/vendor/basic-details/:entityID" exact strict component={VendorBasicInfo} />
                                                        <Route path="/vendor/location-details" exact strict component={VendorLocationDetails} />
                                                        <Route path="/vendor/location-details/:entityID" exact strict component={VendorLocationDetails} />
                                                        <Route path="/vendor/location-details/:entityID/:location_ID" exact strict component={VendorLocationDetails} />
                                                        <Route path="/vendor/contact-details" exact strict component={VendorContactDetails} />
                                                        <Route path="/vendor/contact-details/:entityID" exact strict component={VendorContactDetails} />
                                                        <Route path="/vendor/contact-details/:entityID/:contactID" exact strict component={VendorContactDetails} />
                                                        <Route path="/vendor/list" exact strict component={VendorListOfEntities} />*/}
                                                        {/*<Route path="/vendor/category" exact strict component={Category} />
                                                        <Route path="/vendor/category/:vendorID" exact strict component={Category} />*/}
                                                        <Route path="/vendor/location-type" exact strict component={LocationType} />
                                                        <Route path="/vendor/location-type/:locationTypeID" exact strict component={LocationType} />
                                                        <Route path="/tracking/:booking_id" exact strict component={LiveTracking} />
                                                        {/* ContractManagement */}
                                                        {/*<Route path="/contract-management"                         exact strict component={Contract}  />
                                                           <Route path="/contract-management/:contractID"             exact strict component={Contract}  />
                                                           <Route path="/package-details/:contractID"                 exact strict component={Package}  />
                                                           <Route path="/package-details/:contractID/:packageID"      exact strict component={Package}  />
                                                           <Route path="/condition/:contractID"                       exact strict component={Condition}  />
                                                           <Route path="/condition/:contractID/:packageID"            exact strict component={Condition}  />
                                                           <Route path="/viewcontract/:contractID"                    exact strict component={Viewcontract}  />
                                                           <Route path="/contract-view"                               exact strict component={Viewcontract}  />
                                                           <Route path="/contract-list"                               exact strict component={List}  />  */}
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