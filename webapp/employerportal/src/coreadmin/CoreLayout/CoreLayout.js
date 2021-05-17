import React, { Component } from 'react';
import { connect }        from 'react-redux';
import { withRouter }       from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

// import Header from '../common/header/Header.js'
// import ViewAllNotification from '../common/header/ViewAllNotifications.js'
// import Footer from '../common/footer/Footer.js'
// import ViewTemplates    from '../NotificationManagement/ViewTemplates.jsx';
// import EventMapping     from '../NotificationManagement/EventMapping.js';
// import NotificationVariableList from '../NotificationManagement/NotificationVariableList.js';
// import EventToken from '../NotificationManagement/EventToken.js';

//============ Entity Master ======================
import BasicInfo from '../Master/EntityMaster/Onboarding/basicInfo/BasicInfo.jsx';
import LocationDetails from '../Master/EntityMaster/Onboarding/locationDetails/LocationDetails.jsx';
import ContactDetails from '../Master/EntityMaster/Onboarding/contactDetails/ContactDetails.jsx';

//============= Corporate Master ====================
import CorporateBasicInfo from '../Master/CorporateMaster/CorporateBasicInfo.js';
import CorporateLocationDetails from '../Master/CorporateMaster/CorporateLocationDetails.js';
import CorporateContactDetails from '../Master/CorporateMaster/CorporateContactDetails.js';
import CorporateStatutoryDetails from '../Master/CorporateMaster/CorporateStatutoryDetails.js';

import CompanyProfile       from '../CompanyProfile/CompanyProfile.js';
import CompanyProfileView       from '../CompanyProfile/CompanyProfileView.js';


class CoreLayout extends Component {
    render() {

        return (
            <Switch > 
                

                { /* Corporate Master */}
                <Route path="/org-profile" exact strict component={CompanyProfile} />
                <Route path="/company-profile/:comp_ID" exact strict component={CompanyProfileView} />
                <Route path="/corporate/basic-details" exact strict component={CorporateBasicInfo} />
                <Route path="/corporate/basic-details/:entityID" exact strict component={CorporateBasicInfo} />
                <Route path="/corporate/location-details" exact strict component={CorporateLocationDetails} />
                <Route path="/corporate/location-details/:entityID/:locationID" exact strict component={CorporateLocationDetails} />
                <Route path="/corporate/location-details/:entityID" exact strict component={CorporateLocationDetails} />
                <Route path="/corporate/contact-details" exact strict component={CorporateContactDetails} />
                <Route path="/corporate/contact-details/:entityID" exact strict component={CorporateContactDetails} />
                <Route path="/corporate/contact-details/:entityID/:contactID" exact strict component={CorporateContactDetails} />
                <Route path="/corporate/statutory-details" exact strict component={CorporateStatutoryDetails} />
                <Route path="/corporate/statutory-details/:entityID/:statutoryID" exact strict component={CorporateStatutoryDetails} />
                <Route path="/corporate/statutory-details/:entityID" exact strict component={CorporateStatutoryDetails} />
                
                
                
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

