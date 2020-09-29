import React, { Component } from 'react';
import { connect }        from 'react-redux';
import { withRouter }       from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import Header from '../common/header/Header.js'
import ViewAllNotification from '../common/header/ViewAllNotifications.js'
import Footer from '../common/footer/Footer.js'
import Leftsidebar from '../common/leftSidebar/Leftsidebar.js';
import UMListOfUsers from '../userManagement/UM/UMListOfUsers.js';
import UMListOfUsers2 from '../userManagement/UM/UMListOfUsers2.js';
import DeletedUsers from '../userManagement/UM/DeletedUsers.js';


import EditUserProfile  from '../userManagement/UM/EditUserProfile.js';
import UserProfile      from '../userManagement/UM/UserProfile.js';
import UMRolesList      from '../userManagement/Roles/Roles.js';
import UMRolesEntity    from '../userManagement/Roles/RolesEntity.js';
import GlobalMasters    from '../companysetting/Components/GlobalMasters.js';
import TechnicalMaster  from '../companysetting/Components/TechnicalMasters.js';
import Preferences      from '../companysetting/Components/Preferences.js';
import EventToken from '../NotificationManagement/EventToken.js';
import NotificationTemplate from '../NotificationManagement/NotificationTemplate.js';

//============ Entity Master ======================
import BasicInfo from '../Master/EntityMaster/Onboarding/basicInfo/BasicInfo.jsx';
import LocationDetails from '../Master/EntityMaster/Onboarding/locationDetails/LocationDetails.jsx';
import ContactDetails from '../Master/EntityMaster/Onboarding/contactDetails/ContactDetails.jsx';
import ListOfEntities from '../Master/EntityMaster/listOfEntities/components/ListOfEntities.jsx';
import LocationType from '../Master/LocationType/LocationType.jsx';
import SelectVendor from '../Master/EntityMaster/SelectVendor/SelectVendor.js';
import CityClassification from '../Master/CityClassification/CityClassification.js';
import CityType from '../Master/CityType/CityType.js';


import CompanyPaymentGateway from '../companysetting/Components/CompanyPaymentGateway.js';
//============= Corporate Master ====================
import CorporateBasicInfo from '../Master/CorporateMaster/CorporateBasicInfo.js';
import CorporateLocationDetails from '../Master/CorporateMaster/CorporateLocationDetails.js';
import CorporateContactDetails from '../Master/CorporateMaster/CorporateContactDetails.js';
import CorporateListOfEntities from '../Master/CorporateMaster/CorporateListOfEntities.js';

//============= Vendor Master ====================
import VendorBasicInfo from '../Master/VendorMaster/VendorBasicInfo.js';
import VendorLocationDetails from '../Master/VendorMaster/VendorLocationDetails.js';
import VendorContactDetails from '../Master/VendorMaster/VendorContactDetails.js';
import VendorListOfEntities from '../Master/VendorMaster/VendorListOfEntities.js';
import VendorStatutoryDetails from '../Master/VendorMaster/VendorStatutoryDetails.js';


//============= Supplier Master ====================
/*import SupplierBasicInfo from '../Master/SupplierMaster/SupplierBasicInfo.js';
import SupplierLocationDetails from '../Master/SupplierMaster/SupplierLocationDetails.js';
import SupplierContactDetails from '../Master/SupplierMaster/SupplierContactDetails.js';
*/
// ============ Payment Process =======================
import OrderPage from "../PaymentProcess/OrderPage.js";
import PlanPage from "../PaymentProcess/PlanPage.js";
import InvoicePage from "../PaymentProcess/InvoicePage.js";
import InvoicePageView from "../PaymentProcess/InvoicePageView.js";
import PaymentResponse from "../PaymentProcess/PaymentResponse.js";

// ============ Rate Master ===========================
import PackageMaster from "../PackageMaster/PackageMaster.js";

// ============ Orgnizational Setting ===========================
import OrgnizationalBasicInfo from "../OrganizationalSettings/OrganizationalBasicInfo.js";
import OrganizationalContactDetails from "../OrganizationalSettings/OrganizationalContactDetails.js";
import OrganizationalLocationDetails from "../OrganizationalSettings/OrganizationalLocationDetails.js";

// ============= One Field Component ==================


// import FuleType from "../Master/FuleType/FuleType.js"
// import DriverMaster from "../Master/DriverMaster/DriverMaster.js"
import EmployeeMaster from "../Master/EmployeeMaster/EmployeeMaster.js"
import GuestMaster   from "../Master/GuestMaster/GuestMaster.js"
import PersonMaster from "../Master/PersonMaster/PersonMaster.js"
import EmployeeVehicalMapping from "../Master/EmployeeVehicalMapping/EmployeeVehicalMapping.js"
import PackageMasterBulk from "../Master/BulkUploadPackageMaster/PackageMasterBulk.js"


import PersonList from "../Master/PersonMaster/PersonList.js"
import DepartmentBulkUpload from "../Master/Department/DepartmentBulkUpload.js"
import DesignationBulkUpload from "../Master/Designation/DesignationBulkUpload.js"
import DepartmentList    from "../Master/Department/DepartmentList.js"

import filewisePersonList from "../Master/PersonMaster/FilewisePersonList.js"

import VendorEmpList from "../Master/VendorEmpList/VendorEmpList.js"
import CorporateEmpList from "../Master/CorporateEmpList/CorporateEmpList.js"

import VendorEmployeeMaster from "../Master/VendorEmpList/VendorEmployeeMaster.js"
import CorporateEmployeeMaster from "../Master/CorporateEmpList/CorporateEmployeeMaster.js"

import GuestList from "../Master/GuestMaster/GuestList.js"
import EmployeeList from "../Master/EmployeeMaster/EmployeeList.js"
// import DesignationMapping from "../Master/DesignationMapping/DesignationMapping.js"

//import Model from "../Master/Model/Model.js"
// import Brand from "../Master/Brand/Brand.js"
// import VehicleBrandBulkUpload from "../Master/Brand/VehicleBrandBulkUpload.js"
// import VehicleModelBulkUpload from "../Master/Model/VehicleModelBulkUpload.js"
import Designation from "../Master/Designation/DesignationMaster-GlobalMaster.js"
import Department from "../Master/Department/DepartmentMaster-GlobalMaster.js"
// import PackageType from "../Master/PackageType/PackageType.js"
import Module from "../Master/Module/Module.js"
import Facility from "../Master/Facility/Facility.js"
// import ExpenseTypeMaster from "../Master/ExpenseTypeMaster/ExpenseTypeMaster.js"



// ============= Vehicle Master =======================
// import VehicleMaster from "../Master/VehicleMaster/VehicleMaster.js"

// ============= Booking Master =======================


// ============= Billing Management =======================
// import BillingManagement from "../Master/BillingManagement/BillingManagement.js"
// import GenerateBill from "../Master/BillingManagement/GenerateBill.js"
// import BillingInvoice from "../Master/BillingManagement/BillingInvoice.js"
// import BillView from "../Master/BillingManagement/BillView.js"

/*import ListOfInvoices   from "../../projectadmin/BillingManagement/ListOfInvoices.js"*/
// import InvoiceView      from "../../projectadmin/BillingManagement/InvoiceView.js"
/*import BillingMasters   from "../../projectadmin/BillingMasters/BillingMasters.js"*/

// ========================== access-management ====================
import AccessManagement from "../AccessManagement/AccessManagement.js"

//=============== Not found ================
import Notfound from "../Notfound/Notfound.js"

//=============== Broadcast System ================
import BroadcastSystem from "../BroadcastSystem/BroadcastSystem.js";
import UserReport from "../Reports/UserReport/UserReport.js";
import CorporateReport from "../Reports/CorporateReport/CorporateReport.js";
import VendorReport from "../Reports/VendorReport/VendorReport.js";



class CoreLayout extends Component {
    render() {

        return (
            <Switch >
               
                <Route path="/umlistofusers" component={UMListOfUsers} exact />
                <Route path="/umlistofusers2" component={UMListOfUsers2} exact />
                <Route path="/DeletedUsers" component={DeletedUsers} exact />
                <Route path="/umroleslist" component={UMRolesList}strict exact />
                <Route path="/umroleslist/:fieldID" exact strict component={UMRolesList} />
                <Route path="/umroleslist/oneField/:fieldID" exact strict component={UMRolesList} />
              
                <Route path="/edituserprofile/:id" component={EditUserProfile} exact />
                <Route path="/profile/:id" component={UserProfile} exact />
                <Route path="/global-masters" render={(props)=><GlobalMasters {...props}/> } exact />
                <Route path="/global-masters/:editId" render={(props)=><GlobalMasters {...props}/> } exact />
                <Route path="/technical-master" component={TechnicalMaster} exact />
                <Route path="/preferences" component={Preferences} exact />
                <Route path="/ViewAllNotification" component={ViewAllNotification} exact />
                <Route path="/EventToken" component={EventToken} exact />
                <Route path="/ViewTemplates" component={NotificationTemplate} exact />

                <Route path="/packagemasterBulk" component={PackageMasterBulk} exact />
                <Route path="/employee-vehical-mapping" component={EmployeeVehicalMapping} exact />
                <Route path="/employee-vehical-mapping/:editId" component={EmployeeVehicalMapping} exact />

                <Route path="/technicalMaster/location-type" exact strict component={LocationType} />
                <Route path="/technicalMaster/location-type/:fieldID" exact strict component={LocationType} />

  
                <Route path="/city-classification" exact strict component={CityClassification} />
                <Route path="/city-classification/:fieldID" exact strict component={CityClassification} />
                // <Route path="/city-classification/city-type" exact strict component={CityClassification} />
                <Route path="/city-classification/city-type/:fieldID1" exact strict component={CityClassification} />
                <Route path="/city-type" exact strict component={CityType} />
                <Route path="/city-type/:fieldID" exact strict component={CityType} />


                <Route path="/package-master" exact strict component={PackageMaster} />
                <Route path="/package-master/:packageID" exact strict component={PackageMaster} />
                <Route path="/package-master/package-type" exact strict component={PackageMaster} />
                <Route path="/package-master/package-type/:fieldID" exact strict component={PackageMaster} />
                <Route path="/package-master/category" exact strict component={PackageMaster} />
                <Route path="/package-master/category/:fieldID" exact strict component={PackageMaster} />
                <Route path="/package-master/city-type" exact strict component={PackageMaster} />
                <Route path="/package-master/city-type/:fieldID" exact strict component={PackageMaster} />


                { /* Driver Master */}

                <Route path="/paymentgateway" exact strict component={CompanyPaymentGateway} />
                <Route path="/paymentgateway/:id" exact strict component={CompanyPaymentGateway} />                

                { /* Employee Master */}
    
                <Route path="/employee/master/:fieldID" exact strict component={EmployeeMaster} />
                <Route path="/employee/users/:fieldID" exact strict component={EmployeeMaster} />
                <Route path="/driver/users/:fieldID" exact strict component={EmployeeMaster} />
                <Route path="/employee/master" exact strict component={EmployeeMaster} />
                <Route path="/employee/lists" exact strict component={EmployeeList} />
                
                {/*Corporate and Vendor specific employee*/}
                 <Route path="/corporate/employee/master/:fieldID" exact strict component={CorporateEmployeeMaster} />
                <Route path="/corporate/employee/master" exact strict component={CorporateEmployeeMaster} />
                 <Route path="/vendor/employee/master/:fieldID" exact strict component={VendorEmployeeMaster} />
                <Route path="/vendor/employee/master" exact strict component={VendorEmployeeMaster} />

                <Route path="/vendor/employee/lists" exact strict component={VendorEmpList} />
                <Route path="/corporate/employee/lists" exact strict component={CorporateEmpList} />
               
                { /* Guest Master */}

                <Route path="/corporate/guest/master/:fieldID" exact strict component={GuestMaster} />
                <Route path="/corporate/guest/master" exact strict component={GuestMaster} />
                <Route path="/guest/lists" exact strict component={GuestList} />


                { /* Corporate Master */}
                
                <Route path="/corporate/basic-details" exact strict component={CorporateBasicInfo} />
                <Route path="/corporate/basic-details/:entityID" exact strict component={CorporateBasicInfo} />
                <Route path="/corporate/location-details" exact strict component={CorporateLocationDetails} />
                <Route path="/corporate/location-details/:entityID/:locationID" exact strict component={CorporateLocationDetails} />
                <Route path="/corporate/location-details/:entityID" exact strict component={CorporateLocationDetails} />
                <Route path="/corporate/contact-details" exact strict component={CorporateContactDetails} />
                <Route path="/corporate/contact-details/:entityID" exact strict component={CorporateContactDetails} />
                <Route path="/corporate/contact-details/:entityID/:contactID" exact strict component={CorporateContactDetails} />
                <Route path="/corporate/list" exact strict component={CorporateListOfEntities} />

                { /* Vendor Master */}
                <Route path="/vendor/basic-details" exact strict component={VendorBasicInfo} />
                <Route path="/vendor/basic-details/:entityID" exact strict component={VendorBasicInfo} />
                <Route path="/vendor/location-details/:entityID" exact strict component={VendorLocationDetails} />
                <Route path="/vendor/location-details" exact strict component={VendorLocationDetails} />
                <Route path="/vendor/location-details/:entityID/:locationID" exact strict component={VendorLocationDetails} />
                <Route path="/vendor/contact-details/:entityID" exact strict component={VendorContactDetails} />
                <Route path="/vendor/contact-details" exact strict component={VendorContactDetails} />
                <Route path="/vendor/contact-details/:entityID/:contactID" exact strict component={VendorContactDetails} />
                <Route path="/vendor/list" exact strict component={VendorListOfEntities} /> 
                <Route path="/vendor/statutory-details/:entityID" exact strict component={VendorStatutoryDetails} />
                <Route path="/vendor/statutory-details" exact strict component={VendorStatutoryDetails} />
                <Route path="/vendor/statutory-details/:entityID/:locationID" exact strict component={VendorStatutoryDetails} />

                { /* Supplier Master */}
                <Route path="/supplier" exact strict component={SelectVendor} />
              {/*  <Route path="/supplier/basic-details" exact strict component={SupplierBasicInfo} />
                <Route path="/supplier/basic-details/:entityID" exact strict component={SupplierBasicInfo} />
                <Route path="/supplier/location-details/:entityID" exact strict component={SupplierLocationDetails} />
                <Route path="/supplier/location-details" exact strict component={SupplierLocationDetails} />
                <Route path="/supplier/location-details/:entityID/:locationID" exact strict component={SupplierLocationDetails} />
                <Route path="/supplier/contact-details/:entityID" exact strict component={SupplierContactDetails} />
                <Route path="/supplier/contact-details" exact strict component={SupplierContactDetails} />
                <Route path="/supplier/contact-details/:entityID/:contactID" exact strict component={SupplierContactDetails} />*/}
                {/*  <Route path="/supplier/list" exact strict component={ListOfEntities} /> */}

                 { /* Orgnizational Setting */}
                <Route path="/appCompany/basic-details" exact strict component={OrgnizationalBasicInfo} />
                <Route path="/appCompany/basic-details/:entityID" exact strict component={OrgnizationalBasicInfo} />
                <Route path="/appCompany/location-details" exact strict component={OrganizationalLocationDetails} />
                <Route path="/appCompany/location-details/:entityID" exact strict component={OrganizationalLocationDetails} />
                {/*<Route path="/appCompany/location-details/:fieldID" exact strict component={OrganizationalLocationDetails} />*/}
                <Route path="/appCompany/location-details/:entityID/:locationID" exact strict component={OrganizationalLocationDetails} />
                {/*<Route path="/appCompany/location-details/:entityID/:locationID" exact strict component={OrganizationalLocationDetails} />*/}
               
                { /* Orgnizational Setting */}



                <Route path="/appCompany/contact-details" exact strict component={OrganizationalContactDetails} />
                <Route path="/appCompany/contact-details/:entityID" exact strict component={OrganizationalContactDetails} />
                <Route path="/appCompany/contact-details/:entityID/:contactID" exact strict component={OrganizationalContactDetails} />
                <Route path="/appCompany/list" exact strict component={ListOfEntities} />

               {/* <Route path="/category" exact strict component={Category} />
                <Route path="/category/:entityID" exact strict component={Category} />
                <Route path="/category" exact strict component={Category} />
                <Route path="/category/:fieldID" exact strict component={Category} />*/}
                <Route path="/location-type" exact strict component={LocationType} />
                <Route path="/location-type/:locationTypeID" exact strict component={LocationType} />
                <Route path="/supplier" exact strict component={SelectVendor} />
          {/*      <Route path="/vehicleCategory" exact strict component={VehicleCategory} />
                <Route path="/vehicleCategory/:fieldID" exact strict component={VehicleCategory} />*/}
                <Route path="/location-type" exact strict component={LocationType} />
                <Route path="/location-type/:fieldID" exact strict component={LocationType} />
         {/*       <Route path="/package-type" exact strict component={PackageType} />

                <Route path="/package-type/:fieldID" exact strict component={PackageType} />*/}
                <Route path="/module" exact strict component={Module} />
                <Route path="/module/:fieldID" exact strict component={Module} />

                <Route path="/facility" exact strict component={Facility} />
                <Route path="/facility/:fieldID" exact strict component={Facility} />

                { /* Payment Process */}

                <Route path="/InvoicePage/:order_id" exact strict component={InvoicePage} />
                <Route path="/payment-process" exact strict component={PlanPage} />
                <Route path="/MyOrders" exact strict component={OrderPage} />
                <Route path="/invoicePageView/:order_Id" exact strict component={InvoicePageView} />
                <Route path="/payment-response/:orderId" exact strict component={PaymentResponse} />

                
                
                {/*<Route path="/vehiclebrand" exact strict component={VehicleBrandBulkUpload} />
                <Route path="/vehiclemodel" exact strict component={VehicleModelBulkUpload} />*/}
                {/* <Route path="/brand/:fieldID" exact strict component={Brand} /> */}
                <Route path="/designation" exact strict component={Designation} />
                <Route path="/designation/:fieldID" exact strict component={Designation} />
                <Route path="/Department" exact strict component={Department} />
                <Route path="/Department/:fieldID" exact strict component={Department} />

                

                {/*
                <Route path="/:type/master/:field_id" exact strict component={DepartmentMaster} />
                <Route path="/:type/master" exact strict component={DepartmentMaster} />
                */}
                <Route path="/Departments" exact strict component={DepartmentBulkUpload} />
                <Route path="/Designations" exact strict component={DesignationBulkUpload} />

                <Route path="/:type/master/:fieldID" exact strict component={PersonMaster} />
                <Route path="/:type/master" exact strict component={PersonMaster} />
                <Route path="/:type/users/:fieldID" exact strict component={PersonMaster} />

                <Route path="/:type/lists" component={PersonList} />
                <Route path="/:type/list1" component={DepartmentList} />
                <Route path="/:type/filewiselists" component={filewisePersonList} />

                <Route path="/:entity/master/:fieldID" exact strict component={PersonMaster} />
                <Route path="/:entity/master" exact strict component={PersonMaster} />
                <Route path="/:entity/lists" component={PersonList} />
                <Route path="/Departments" exact strict component={DepartmentBulkUpload} />
                <Route path="/Designations" exact strict component={DesignationBulkUpload} />
                { /* Billing Management */}
                {/*<Route path="/BillingManagement" exact strict component={BillingManagement} />
                <Route path="/GenerateBill" exact strict component={GenerateBill} />
                <Route path="/create-invoice/:id" exact strict component={BillingInvoice} />
                <Route path="/view-bill" exact strict component={BillView} />*/}
                {/*<Route path="/billing-management"       exact strict component={ListOfInvoices} />
                <Route path="/view-invoice"             exact strict component={InvoiceView} />
                <Route path="/view-invoice/:invoiceID"  exact strict component={InvoiceView} />*/}

                { /* Booking Master */}
                {/* <Route path="/All_Bookings" exact strict component={AllBookings} /> */}
                
                <Route path="/:entity/lists" component={DepartmentList} />
                <Route path="/:entity/master/:fieldID" exact strict component={DepartmentBulkUpload} />
                <Route path="/:entity/master" exact strict component={DepartmentBulkUpload} />

                
                { /* ExpenseType Master */}
                

                <Route path="/:entity/master/:fieldID" exact strict component={DepartmentBulkUpload} />
                <Route path="/:entity/master" exact strict component={DepartmentBulkUpload} />
                <Route path="/:entity/lists" component={DepartmentList} />



                { /* Vendor Management */}

                <Route path="/vendor/basic-details" exact strict component={BasicInfo} />
                <Route path="/vendor/basic-details/:vendor_ID" exact strict component={BasicInfo} />
                <Route path="/vendor/location-details/:vendor_ID" exact strict component={LocationDetails} />
                <Route path="/vendor/location-details/:vendor_ID/:location_ID" exact strict component={LocationDetails} />
                <Route path="/vendor/contact-details/:vendor_ID" exact strict component={ContactDetails} />
                <Route path="/vendor/contact-details/:vendor_ID/:contactDetails_ID" exact strict component={ContactDetails} />

                <Route path="/vendor/list" exact strict component={ListOfEntities} />
               {/* <Route path="/vendor/category" exact strict component={Category} />

                <Route path="/vendor/category/:vendorID" exact strict component={Category} />*/}
                <Route path="/vendor/location-type" exact strict component={LocationType} />
                <Route path="/vendor/location-type/:locationTypeID" exact strict component={LocationType} />
                {/* Vehicle Master */}

                {/* <Route path="/designation-mapping" exact strict component={DesignationMapping} /> */}
                {/* Vehicle Master */}
                {/* <Route path="/vehicle-master" exact strict component={VehicleMaster} />
                <Route path="/vehicle-master/:vehicleID" exact strict component={VehicleMaster} /> */}
                {/* <Route path="/vehicle-list" exact strict component={ListOfVehicles} /> */}

                {/* access-management */}
                <Route path="/access-management" exact strict component={AccessManagement} />


                {/* <Route path="*" component={Notfound} /> */}

                {/* Broadcast-System */}
                <Route path="/broadcast-system" exact strict component={BroadcastSystem} />
                <Route path="/user-report" exact strict component={UserReport} />
                <Route path="/corporate-report" exact strict component={CorporateReport} />
                <Route path="/vendor-report" exact strict component={VendorReport} />
                
            </Switch>
        );
    }
}




const mapStateToProps = (state)=>{
    // console.log(" state on Dashboard corporate==> ",state)
    return {
      userDetails   : state.userDetails,
    }
  };
  
  
  const mapDispatchToProps = (dispatch)=>{
    return {
    }
  };
  
  
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CoreLayout));

