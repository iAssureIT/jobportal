import React, { Component }                       from 'react';
import { connect }                                from 'react-redux';
import { withRouter }                             from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';

// Section: 1 - SystemSecurity ***********************************
import Login                from './systemSecurity/Login.js';
import ConfirmOtp           from './systemSecurity/ConfirmOtp.js';
import ForgotPassword       from './systemSecurity/ForgotPassword.js';
import ResetPassword        from './systemSecurity/ResetPassword.js';
import SignUp               from './systemSecurity/SignUp.js';
import ResetPasswordFirstLogin from './systemSecurity/ResetPasswordFirstLogin.js';
import Header               from './common/header/Header.js'; 
import FunctionalHeader     from './common/FunctionalHeader/FunctionalHeader.js'; 
import MapHeader            from './common/MapHeader/MapHeader.js'; 
import Footer               from './common/footer/Footer.js';
import Leftsidebar          from './common/leftSidebar/Leftsidebar.js';
import CoreLayout           from './coreadmin/CoreLayout/CoreLayout.js';

import PageFunctionWise    from './FunctionalAreawiseJobs/PageFunctionWise.js';
import SubPageFunctionWise from './FunctionalAreawiseJobs/SubPageFunctionWise.js';

import CandidateProfile     from './profileCreation/blocks/ProfilePage/CandidateProfile.js';
import CandidateBasicInfo   from './profileCreation/CandidateBasicInfo.js';
import CandidateAddress     from './profileCreation/CandidateAddress.js';
import CandidateContact     from './profileCreation/CandidateContact.js';
import CandidateAcademics   from './profileCreation/CandidateAcademics.js';
import CandidateCertification     from './profileCreation/CandidateCertification.js';
import CandidateExperience  from './profileCreation/CandidateExperience.js';
//import CandidateProfile     from './blocks/CandidateProfile/CandidateProfile.js';
//import CandidateList     from './blocks/CandidateList/CandidateList.js';
import India from './maps/India/India.js';
import Maharashtra from './maps/Maharashtra/Maharashtra.js';
import AndhraPradesh from './maps/AndhraPradesh/AndhraPradesh.js';
import ArunachalPradesh from './maps/ArunachalPradesh/ArunachalPradesh.js';
import Bihar from './maps/Bihar/Bihar.js';
import Chhattisgarh from './maps/Chhattisgarh/Chhattisgarh.js';
import Delhi from './maps/Delhi/Delhi.js';
import Goa from './maps/Goa/Goa.js';
import Gujarat from './maps/Gujarat/Gujarat.js';
import HimachalPradesh from './maps/HimachalPradesh/HimachalPradesh.js';
import JammuKashmirLadakh from './maps/JammuKashmirLadakh/JammuKashmirLadakh.js';
import Jharkhand from './maps/Jharkhand/Jharkhand.js';
import Karnataka from './maps/Karnataka/Karnataka.js';
import Kerala from './maps/Kerala/Kerala.js';
import MadhyaPradesh from './maps/MadhyaPradesh/MadhyaPradesh.js';
import Manipur from './maps/Manipur/Manipur.js';
import Meghalaya from './maps/Meghalaya/Meghalaya.js';
import Mizoram from './maps/Mizoram/Mizoram.js';
import Nagaland from './maps/Nagaland/Nagaland.js';
import Orissa from './maps/Orissa/Orissa.js';

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
       const token = localStorage.getItem("token");
          if (token !== null && token !=="undefined") {
              this.setState({
                  loggedIn: true
              })
          } else { }
    }

    logout() {
        var token = localStorage.removeItem("token");
        if (token !== null && token !=="undefined") {
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
                    <div className="wrapper">
                        <Header />
                        <div className="">
                            <div className="row">
                                <div className="container-fluid main-container">
                                    <div className="row">
                                        <div className="dashboardWrapper" >
                                            <div className="backColor col-lg-12 col-md-12 col-sm-12 col-xs-12" >
                                              {/*  <CoreLayout />*/}
                                                <Switch >
                                                    <Route exact path="/functional-area"        component={PageFunctionWise}  />
                                                    <Route exact path="/subfunctional-area"        component={SubPageFunctionWise}  />

                                                    <Route exact path="/"        component={India}  />

                                                    <Route exact path="/basic-info"        component={CandidateBasicInfo}  />
                                                    <Route exact path="/address/:candidateID"           component={CandidateAddress}  />
                                                    <Route exact path="/contact/:candidateID"           component={CandidateContact}  />
                                                    <Route exact path="/academics/:candidateID"         component={CandidateAcademics}  />
                                                    <Route exact path="/certification/:candidateID"     component={CandidateCertification}  />
                                                    <Route exact path="/experience/:candidateID"        component={CandidateExperience}  />
                                                    <Route exact path="/profile"           component={CandidateProfile}  />
                                                    {/*<Route exact path="/list"              component={CandidateList}  />  
                                                    */}
                                                     <Route exact path="/maharashtra"        component={Maharashtra }  />
                                                     <Route exact path="/andhraPradesh"        component={AndhraPradesh }  />
                                                     <Route exact path="/arunachalPradesh"        component={ArunachalPradesh }  />
                                                     <Route exact path="/bihar"        component={Bihar }  />
                                                     <Route exact path="/chhattisgarh"        component={Chhattisgarh }  />
                                                     <Route exact path="/delhi"        component={Delhi }  />
                                                     <Route exact path="/goa"        component={Goa }  />
                                                     <Route exact path="/gujarat"        component={Gujarat }  />
                                                     <Route exact path="/himachalPradesh"        component={HimachalPradesh }  />
                                                     <Route exact path="/kashmir"        component={JammuKashmirLadakh }  />
                                                     <Route exact path="/jharkhand"        component={Jharkhand }  />
                                                     <Route exact path="/karnataka"        component={Karnataka }  />
                                                     <Route exact path="/kerala"        component={Kerala }  />
                                                     <Route exact path="/madhyaPradesh"        component={MadhyaPradesh }  />
                                                     <Route exact path="/manipur"        component={Manipur }  />
                                                     <Route exact path="/meghalaya"        component={Meghalaya }  />
                                                     <Route exact path="/mizoram"        component={Mizoram }  />
                                                     <Route exact path="/nagaland"        component={Nagaland }  />
                                                     <Route exact path="/orissa"        component={Orissa }  />

                                                </Switch>
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
                <div className="wrapper PageFunctionWiseWrapper">

                {/*<MapHeader/>*/}
                    <Router >
                        <Switch >

                            <Route exact path="/"        component={India}  />
                             <Route exact path="/maharashtra"        component={Maharashtra }  />
                             <Route exact path="/andhrapradesh"        component={AndhraPradesh }  />
                             <Route exact path="/arunachalpradesh"        component={ArunachalPradesh }  />
                             <Route exact path="/bihar"        component={Bihar }  />
                             <Route exact path="/chhattisgarh"        component={Chhattisgarh }  />
                             <Route exact path="/delhi"        component={Delhi }  />
                             <Route exact path="/goa"        component={Goa }  />
                             <Route exact path="/gujarat"        component={Gujarat }  />
                             <Route exact path="/himachalPradesh"        component={HimachalPradesh }  />
                             <Route exact path="/kashmir"        component={JammuKashmirLadakh }  />
                             <Route exact path="/jharkhand"        component={Jharkhand }  />
                             <Route exact path="/karnataka"        component={Karnataka }  />
                             <Route exact path="/kerala"        component={Kerala }  />
                             <Route exact path="/madhyapradesh"        component={MadhyaPradesh }  />
                             <Route exact path="/manipur"        component={Manipur }  />
                             <Route exact path="/meghalaya"        component={Meghalaya }  />
                             <Route exact path="/mizoram"        component={Mizoram }  />
                             <Route exact path="/nagaland"        component={Nagaland }  />
                             <Route exact path="/orissa"        component={Orissa }  />


                            <Route path="/login" exact strict component={Login} />
                            <Route path="/signup" exact strict component={SignUp} />
                            <Route path="/forgot-password" exact strict component={ForgotPassword} />
                            <Route path="/reset-pwd/:user_ID" exact strict component={ResetPassword} />
                            <Route path="/confirm-otp/:userID" exact strict component={ConfirmOtp} />
                            <Route path="/reset-password/:user_ID" exact strict component={ResetPasswordFirstLogin}  />
                            <Route exact path="/functional-area"        component={PageFunctionWise}  />
                            <Route exact path="/subfunctional-area"        component={SubPageFunctionWise}  />
                        </Switch>
                    </Router>
                </div>
            );
        }
    }
}

 
export default Layout;