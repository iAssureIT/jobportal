import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

// Section: 1 - SystemSecurity ******************************************************
import Login from './coreadmin/systemSecurity/Login.js';
import ConfirmOtp from './coreadmin/systemSecurity/ConfirmOtp.js';
import ForgotPassword from './coreadmin/systemSecurity/ForgotPassword.js';
import ResetPassword from './coreadmin/systemSecurity/ResetPassword.js';
import SignUp from './coreadmin/systemSecurity/SignUp.js';


import Header from './coreadmin/common/header/Header.js'; 
import Footer from './coreadmin/common/footer/Footer.js';
import Leftsidebar from './coreadmin/common/leftSidebar/Leftsidebar.js';

// ============ Contract Management =========================== 

import Contract                                 from "./projectadmin/ContractManagement/Contract/Contract.js";
import Package                                  from "./projectadmin/ContractManagement/Package/Package.js";
import Condition                                from "./projectadmin/ContractManagement/Condition/Condition.js";
import Viewcontract                             from './projectadmin/ContractManagement/View/Viewcontract.js';
import List                                     from './projectadmin/ContractManagement/List/List.js';

// ============ EntityMapping =========================== 
import EntityMapping                            from "./projectadmin/EntityMapping/Contract/EntityMapping.js";
import EntityMappingView                        from './projectadmin/EntityMapping/View/EntityMappingView.js';
import EntityMappingList                        from './projectadmin/EntityMapping/List/EntityMappingList.js';
import VehicleCategory                          from './projectadmin/VehicleCategory/VehicleCategory.js';
import DesignationMapping                       from "./projectadmin/DesignationMapping/DesignationMapping.js"
import ListOfVehicles                           from './projectadmin/VehicleMaster/listOfVehicles/components/ListOfVehicles.jsx';
// ============= One Field Component ==================
import FuleType                                 from "./projectadmin/FuleType/FuleType.js"
import DriverMaster                             from "./projectadmin/DriverMaster/DriverMaster.js"
import Brand                                    from "./projectadmin/Brand/Brand.js"
import DocumentEntityMaster                     from "./projectadmin/DocumentRequiredfor/DocumentEntityMaster.js";
import DocumentListMaster                        from "./projectadmin/DocumentRequiredfor/DocumentListMaster.js"
import ExpenseTypeMaster                        from "./projectadmin/ExpenseTypeMaster/ExpenseTypeMaster.js"
import Category                                 from './projectadmin/Category/Category.jsx';
import Model                                    from "./projectadmin/Model/Model.js"
import PackageType                              from "./projectadmin/PackageType/PackageType.js"
import PurposeOfTravel                          from "./projectadmin/PurposeOfTravel/PurposeOfTravel.js"
import TaxName                                  from "./projectadmin/TaxName/TaxName.js"
import TaxRate                                  from "./projectadmin/TaxRate/TaxRate.js"



// ============= Vehicle Master =======================
import VehicleMaster                            from "./projectadmin/VehicleMaster/VehicleMaster.js"

// ============= Booking Master =======================
import AllBookings                              from "./projectadmin/BookingMaster/AllBookings.js"
import VehicleBrandBulkUpload                   from "./projectadmin/Brand/VehicleBrandBulkUpload.js"
import VehicleModelBulkUpload                   from "./projectadmin/Model/VehicleModelBulkUpload.js"
import SupplierBasicInfo                        from './projectadmin/SupplierMaster/SupplierBasicInfo.js';
import SupplierLocationDetails                  from './projectadmin/SupplierMaster/SupplierLocationDetails.js';
import SupplierContactDetails                   from './projectadmin/SupplierMaster/SupplierContactDetails.js';

import CoreLayout                               from './coreadmin/CoreLayout/CoreLayout.js';
class Layout extends Component  {

    constructor(props) {
        super();
        this.state = {
            loggedIn: false,
        }
    }

    componentDidMount() {
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
        if (this.state.loggedIn) {
            return (
            <Router>
                <div className="hold-transition skin-blue fixed sidebar-mini">
                    <div className="content-wrapper">
                        <div className="wrapper">
                            <Header />
                            <div className="">
                                <div className="row">
                                    <Leftsidebar/>
                                    <div className="container-fluid main-container">
                                        <div className="row">
                                            <div className="dashboardWrapper" >
                                                <div className="backColor col-lg-12 col-md-12 col-sm-12 col-xs-12" >
                                                    <Switch >
                                                        {/* ContractManagement */}
                                                        <Route path="/contract-management"                         exact strict component={Contract}  />
                                                        <Route path="/contract-management/:contractID"             exact strict component={Contract}  />
                                                        <Route path="/package-details"                 exact strict component={Package}  />
                                                        <Route path="/package-details/:contractID"                 exact strict component={Package}  />
                                                        <Route path="/package-details/:contractID/:packageID"      exact strict component={Package}  />
                                                        <Route path="/condition"                       exact strict component={Condition}  />
                                                        <Route path="/condition/:contractID"                       exact strict component={Condition}  />
                                                        <Route path="/condition/:contractID/:packageID"            exact strict component={Condition}  />
                                                        <Route path="/viewcontract"                    exact strict component={Viewcontract}  />
                                                        <Route path="/viewcontract/:contractID"                    exact strict component={Viewcontract}  />
                                                        <Route path="/contract-list"                               exact strict component={List}  />  

                                                        <Route path="/vehiclebrand" exact strict component={VehicleBrandBulkUpload} />
                                                         <Route path="/vehiclemodel" exact strict component={VehicleModelBulkUpload} />
                                                        {/* EntityMapping */}
                                                        <Route path="/entity-mapping"                         exact strict component={EntityMapping}  />
                                                        <Route path="/entity-mapping/:mappingID"                         exact strict component={EntityMapping}  />
                                                        <Route path="/viewmapping/:mappingID"                    exact strict component={EntityMappingView}  />
                                                        <Route path="/viewmapping"                    exact strict component={EntityMappingView}  />
                                                        <Route path="/mapping-list"                               exact strict component={EntityMappingList}  />  
                                                        <Route path="/expenseType" exact strict component={ExpenseTypeMaster} />
                                                        { /* Booking Master */}
                                                        <Route path="/:entity/category" exact strict component={Category} />
                                                        <Route path="/:entity/category/:entityID" exact strict component={Category} />
                                                        <Route path="/category" exact strict component={Category} />
                                                        <Route path="/category/:fieldID" exact strict component={Category} />
                                                        <Route path="/vehicleCategory" exact strict component={VehicleCategory} />
                                                        <Route path="/vehicleCategory/:fieldID" exact strict component={VehicleCategory} />

                                                        <Route path="/driver/master/:fieldID" exact strict component={DriverMaster} />
                                                        <Route path="/driver/master" exact strict component={DriverMaster} />
                                                        <Route path="/All_Bookings" exact strict component={AllBookings} />
                                                        <Route path="/model/:fieldID" exact strict component={Model} />
                                                        <Route path="/model" exact strict component={Model} />
                                                        <Route path="/package-type" exact strict component={PackageType} />
                                                        <Route path="/package-type/:fieldID" exact strict component={PackageType} />
                                                        
                                                        <Route path="/tax-name" exact strict component={TaxName} />
                                                        <Route path="/tax-name/:fieldID" exact strict component={TaxName} />
                                                        
                                                        <Route path="/tax-rate" exact strict component={TaxRate} />

                                                        <Route path="/tax-rate/:preferenceID" exact strict component={TaxRate} />


                                                        {/* Vehicle Master */}
                                                        <Route path="/documententitymaster" exact strict component={DocumentEntityMaster} />
                                                        <Route path="/documententitymaster/:fieldID" exact strict component={DocumentEntityMaster} />
                                                        <Route path="/documentlistmaster" exact strict component={DocumentListMaster} />
                                                        <Route path="/documentlistmaster/:fieldID" exact strict component={DocumentListMaster} />


                                                        <Route path="/brand" exact strict component={Brand} />
                                                        <Route path="/brand/:fieldID" exact strict component={Brand} />
                                                        <Route path="/fuel-type" exact strict component={FuleType} />
                                                        <Route path="/fuel-type/:fieldID" exact strict component={FuleType} />
                                                        <Route path="/designation-mapping" exact strict component={DesignationMapping} />
                                                        <Route path="/purposeOfTravel" exact strict component={PurposeOfTravel} />
                                                        <Route path="/purposeOfTravel/:fieldID" exact strict component={PurposeOfTravel} />
                                                        {/* Vehicle Master */}
                                                        <Route path="/vehicle-master" exact strict component={VehicleMaster} />
                                                        <Route path="/vehicle-master/:vehicleID" exact strict component={VehicleMaster} />
                                                        <Route path="/vehicle-list" exact strict component={ListOfVehicles} />
                                                        <Route path="/supplier/basic-details" exact strict component={SupplierBasicInfo} />
                                                        <Route path="/supplier/basic-details/:entityID" exact strict component={SupplierBasicInfo} />
                                                        <Route path="/supplier/location-details/:entityID" exact strict component={SupplierLocationDetails} />
                                                        <Route path="/supplier/location-details" exact strict component={SupplierLocationDetails} />
                                                        <Route path="/supplier/location-details/:entityID/:locationID" exact strict component={SupplierLocationDetails} />
                                                        <Route path="/supplier/contact-details/:entityID" exact strict component={SupplierContactDetails} />
                                                        <Route path="/supplier/contact-details" exact strict component={SupplierContactDetails} />
                                                        <Route path="/supplier/contact-details/:entityID/:contactID" exact strict component={SupplierContactDetails} />
                                                        <Route path="/vehicleCategory" exact strict component={VehicleCategory} />
                                                        <Route path="/vehicleCategory/:fieldID" exact strict component={VehicleCategory} />
                                                    </Switch>
                                                    <CoreLayout />
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
                        </Switch>
                    </Router>
                </div>
            );
        }
    }
}

 
export default Layout;