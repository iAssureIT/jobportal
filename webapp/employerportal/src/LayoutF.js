import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

// Section: 1 - SystemSecurity ******************************************************
import Login from './projectAdmin/systemSecurity/Login.js';
import ConfirmOtp from './projectAdmin/systemSecurity/ConfirmOtp.js';
import ForgotPassword from './projectAdmin/systemSecurity/ForgotPassword.js';
import ResetPassword from './projectAdmin/systemSecurity/ResetPassword.js';
import SignUp from './projectAdmin/systemSecurity/SignUp.js';


import Header from './projectAdmin/Common/header/Header.js'; 
import Footer from './coreadmin/common/footer/Footer.js';

// ============ Contract Management =========================== 
import Contract                                 from "./projectAdmin/ContractManagement/Contract/Contract.js";
import Package                                  from "./projectAdmin/ContractManagement/Package/Package.js";
import Condition                                from "./projectAdmin/ContractManagement/Condition/Condition.js";
import Viewcontract                             from './projectAdmin/ContractManagement/View/Viewcontract.js';
import List                                     from './projectAdmin/ContractManagement/List/List.js';
import Leftsidebar                              from './projectAdmin/Common/leftSidebar/Leftsidebar.js';
// // // import Rightsidebar                             from './projectAdmin/Common/rightSidebar/Rightsidebar.js';
import Dashboard                                from './projectAdmin/Common/dashboard/Dashboard.js';
import EmployeeProfile                          from './projectAdmin/Profile/EmployeeProfile/EmployeeProfile.js';
import CompanyProfile                           from './projectAdmin/Profile/CompanyProfile/CompanyProfile.js';

// ============ Contract Management =========================== 

import BookingMaster from "./projectAdmin/Bookings/BookingMaster.js"
import BookingDetails from "./projectAdmin/Bookings/BookingDetails.js"
import BookingConfirmation from "./projectAdmin/Bookings/BookingConfirmation.js"
import AdminBookingList from "./projectAdmin/Bookings/AdminBookingList.js"
import AllBookings from "./projectAdmin/Bookings/AllBookings.js"
import TripDetailList from "./projectAdmin/Bookings/TripDetailList.js"
import ApprovedBookings from "./projectAdmin/Bookings/ApprovedBookings.js"
import RejectedBookings from "./projectAdmin/Bookings/RejectedBookings.js"


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


import CoreLayout from './coreadmin/CoreLayout/CoreLayout.js';



class Layout extends Component  {

    constructor(props) {
        super();
        this.state = {
            loggedIn: false,
        }
    }

    componentDidMount() {
        const token = localStorage.getItem("token");
        if (token != null && token != "undefined") {
            this.setState({
                loggedIn: true
            })
        } else { }

    }

    logout() {
        var token = localStorage.removeItem("token");
        if (token != null && token != "undefined") {
            this.setState({
                loggedIn: false
            })
        }
    }

    render() {
        if (this.state.loggedIn) {
            return (
            <Router>
                <div className="App container-fluid" >
                    <div className="row" >
                        <div id="headerid" className="headerbackgroundcolor" >
                            <div className="" >
                                <Header />
                            </div> 
                        </div>
                        <div id="dashbordid" className="col-lg-10 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12 NOpadding" >
                            <div className="" >
                                <div className=" mainContentBottom NOpadding" >
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding mainContentBackground" >
                                        <CoreLayout />
                                        <Switch >
                                            {/* ContractManagement */}
                                            <Route path="/contract-management"                         exact strict component={Contract}  />
                                            <Route path="/contract-management/:contractID"             exact strict component={Contract}  />
                                            <Route path="/package-details/:contractID"                 exact strict component={Package}  />
                                            <Route path="/package-details/:contractID/:packageID"      exact strict component={Package}  />
                                            <Route path="/condition/:contractID"                       exact strict component={Condition}  />
                                            <Route path="/condition/:contractID/:packageID"            exact strict component={Condition}  />
                                            <Route path="/viewcontract/:contractID"                    exact strict component={Viewcontract}  />
                                            <Route path="/contract-view"                               exact strict component={Viewcontract}  />
                                            <Route path="/contract-list"                               exact strict component={List}  />
                                            <Route path="/"                                            component={Dashboard} exact />
                                            <Route path="/dashboard"                                   component={Dashboard} exact />  
                                            <Route path="/company-profile"                             component={CompanyProfile} exact />
                                            <Route path="/my-profile"                                  component={EmployeeProfile} exact />
                                            <Route path="/approved-bookings"                           exact strict component={ApprovedBookings} />
                                            <Route path="/rejected-bookings"                           exact strict component={RejectedBookings} />
                                            <Route path="/new-bookings"                                exact strict component={TripDetailList} />
                                            <Route path="/booking"                                     exact strict component={BookingMaster} />
                                            <Route path="/booking/:bookingId"                          exact strict component={BookingMaster} />
                                            <Route path="/booking-details"                             exact strict component={BookingDetails} />
                                            <Route path="/BookingList"                                 exact strict component={AdminBookingList} />
                                            <Route path="/all-bookings"                                exact strict component={AllBookings} />


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
                                        </Switch>
                                    </div>
                                </div>
                            </div>
                            <div className="footerCSS col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding" >
                                <Footer />
                            </div>
                        </div>
                        <div className="leftsidebarbackgroundcolor" >
                            <div className="row" >
                                <Leftsidebar />
                            </div>
                        </div>
                    </div>
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
                        </Switch>
                    </Router>
                </div>
            );
        }
    }
}

 
export default Layout;