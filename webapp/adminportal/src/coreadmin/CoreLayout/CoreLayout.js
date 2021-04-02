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
import CreateTemplateNew from '../NotificationManagement/CreateTemplateNew.js';
import NotificationTemplate from '../NotificationManagement/NotificationTemplate.js';

//============ Entity Master ======================
import BasicInfo from '../Master/EntityMaster/Onboarding/basicInfo/BasicInfo.jsx';
import StatutoryDetails from '../Master/EntityMaster/Onboarding/basicInfo/StatutoryDetails.js';
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
import CorporateStatutoryDetails from '../Master/CorporateMaster/CorporateStatutoryDetails.js';
import CorporateLocationDetails from '../Master/CorporateMaster/CorporateLocationDetails.js';
import CorporateContactDetails from '../Master/CorporateMaster/CorporateContactDetails.js';
import CorporateListOfEntities from '../Master/CorporateMaster/CorporateListOfEntities.js';

import FilewiseEntityList from '../Master/FilewiseEntity/FilewiseEntityList.js';


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
import OrganizationalStatutoryDetails from "../OrganizationalSettings/OrganizationalStatutoryDetails.js";

// ============= One Field Component ==================


import PersonMaster from "../Master/PersonMaster/PersonMaster.js"

import PersonList from "../Master/PersonMaster/PersonList.js"
import Module from "../Master/Module/Module.js"
import Facility from "../Master/Facility/Facility.js"
// import ExpenseTypeMaster from "../Master/ExpenseTypeMaster/ExpenseTypeMaster.js"



// ========================== access-management ====================
import AccessManagement from "../AccessManagement/AccessManagement.js"

//=============== Not found ================
import Notfound from "../Notfound/Notfound.js"

//=============== Broadcast System ================
import BroadcastSystem from "../BroadcastSystem/BroadcastSystem.js";

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
                <Route path="/CreateTemplate" component={CreateTemplateNew} exact />

                
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
                { /* Corporate Master */}
                
                <Route path="/corporate/basic-details" exact strict component={CorporateBasicInfo} />
                <Route path="/corporate/basic-details/:entityID" exact strict component={CorporateBasicInfo} />
                <Route path="/corporate/statutory-details" exact strict component={CorporateStatutoryDetails} />
                <Route path="/corporate/location-details" exact strict component={CorporateLocationDetails} />
                <Route path="/corporate/statutory-details/:entityID/:statutoryID" exact strict component={CorporateStatutoryDetails} />
                <Route path="/corporate/location-details/:entityID/:locationID" exact strict component={CorporateLocationDetails} />
                <Route path="/corporate/statutory-details/:entityID" exact strict component={CorporateStatutoryDetails} />
                <Route path="/corporate/location-details/:entityID" exact strict component={CorporateLocationDetails} />
                <Route path="/corporate/contact-details" exact strict component={CorporateContactDetails} />
                <Route path="/corporate/contact-details/:entityID" exact strict component={CorporateContactDetails} />
                <Route path="/corporate/contact-details/:entityID/:contactID" exact strict component={CorporateContactDetails} />
                <Route path="/corporate/list" exact strict component={CorporateListOfEntities} />
                <Route path="/filewise/employers" exact strict component={FilewiseEntityList} />
                

                
                 { /* Orgnizational Setting */}
                <Route path="/appCompany/basic-details" exact strict component={OrgnizationalBasicInfo} />
                <Route path="/appCompany/basic-details/:entityID" exact strict component={OrgnizationalBasicInfo} />
                <Route path="/appCompany/statutory-details" exact strict component={OrganizationalStatutoryDetails} />
                <Route path="/appCompany/location-details" exact strict component={OrganizationalLocationDetails} />
                <Route path="/appCompany/statutory-details/:entityID" exact strict component={OrganizationalStatutoryDetails} />
                <Route path="/appCompany/location-details/:entityID" exact strict component={OrganizationalLocationDetails} />
                {/*<Route path="/appCompany/location-details/:fieldID" exact strict component={OrganizationalLocationDetails} />*/}
                <Route path="/appCompany/statutory-details/:entityID/:locationID" exact strict component={OrganizationalStatutoryDetails} />
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
                
                <Route path="/:type/master/:fieldID" exact strict component={PersonMaster} />
                <Route path="/:type/master" exact strict component={PersonMaster} />
                <Route path="/:type/users/:fieldID" exact strict component={PersonMaster} />

                <Route path="/:type/lists" component={PersonList} />
                
                <Route path="/:entity/master/:fieldID" exact strict component={PersonMaster} />
                <Route path="/:entity/master" exact strict component={PersonMaster} />
                <Route path="/:entity/lists" component={PersonList} />
                
                { /* Booking Master */}
                {/* <Route path="/All_Bookings" exact strict component={AllBookings} /> */}
                
                
                {/* access-management */}
                <Route path="/access-management" exact strict component={AccessManagement} />


                {/* <Route path="*" component={Notfound} /> */}

                {/* Broadcast-System */}
                <Route path="/broadcast-system" exact strict component={BroadcastSystem} />
                
            </Switch>
        );
    }
}




const mapStateToProps = (state)=>{
    return {
      userDetails   : state.userDetails,
    }
  };
  
  
  const mapDispatchToProps = (dispatch)=>{
    return {
    }
  };
  
  
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CoreLayout));

