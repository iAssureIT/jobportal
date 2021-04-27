import React, { Component }                       from 'react';
import { connect }                                from 'react-redux';
import { withRouter }                             from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';
import  * as mapActionCreator from './common/actions/index';
import { bindActionCreators } from 'redux';
// Section: 1 - SystemSecurity ***********************************
import Login                from './systemSecurity/Login.js';
import ConfirmOtp           from './systemSecurity/ConfirmOtp.js';
import ForgotPassword       from './systemSecurity/ForgotPassword.js';
import ResetPassword        from './systemSecurity/ResetPassword.js';
import SignUp               from './systemSecurity/SignUp.js';
import Header               from './common/header/Header.js'; 
import FunctionalHeader     from './common/functionalHeader/FunctionalHeader.js'; 
import MapHeader            from './common/mapHeader/MapHeader.js'; 
import NewHeader            from './common/NewHeader/NewHeader.js'; 
import Footer               from './common/footer/Footer.js';
import CoreLayout           from './coreadmin/CoreLayout/CoreLayout.js';
import Homepage             from './pages/Homepage/Homepage.js'

import TestProfile          from './blocks/TestProfile/TestProfile.js';

import CandidateProfile        from './blocks/ProfilePage/CandidateProfile.js';
import CandidateList           from './blocks/CandidateList/CandidateList.js';
import CandidateBasicInfo      from './pages/ProfileCreation/CandidateBasicInfo.js';
import CandidateAddress        from './pages/ProfileCreation/CandidateAddress.js';
import CandidateContact        from './pages/ProfileCreation/CandidateContact.js';
import CandidateAcademics      from './pages/ProfileCreation/CandidateAcademics.js';
import CandidateCertification  from './pages/ProfileCreation/CandidateCertification.js';
import CandidateExperience     from './pages/ProfileCreation/CandidateExperience.js';

//import CandidateProfile     from './blocks/CandidateProfile/CandidateProfile.js';
//import CandidateList     from './blocks/CandidateList/CandidateList.js';


import CandidateJobList         from './pages/CandidateJobList/CandidateJobList.js'

import JobProfile               from './pages/JobProfile/JobProfile.js'
import CandidateAppliedJobList  from './pages/CandidateAppliedJobList/CandidateAppliedJobList.js';
import CandidateJobWishlist     from './pages/CandidateJobWishlist/CandidateJobWishlist.js';

class Layout extends Component  {

    constructor(props) {
        super();
        this.state = {
            loggedIn: false,
            sidebar: true,
            empProfileStatus: true,
            stateArray:[],
             
        }
    }

    componentDidMount() {
        var pageUrl = window.location.pathname;
        let lastpara = pageUrl ? pageUrl.split('/') : "";
        
        
        this.setState({ currentUrl: pageUrl })
        axios.get("/api/states/get/list/IN")
            .then((response) => {
                this.setState({
                    stateArray: response.data
                },()=>{
                    let stateLink = this.state.stateArray.find(element => element.stateName == decodeURIComponent(lastpara[1]) );
                    
                    if (stateLink ) {
                        this.props.mapAction.setMapSelectedState(decodeURIComponent(lastpara[1]));
                    }  
                })
            })
            .catch((error) => {
            })
        

        const userDetails = localStorage.getItem("userDetails");
            if (userDetails !== null && userDetails !=="undefined") {
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
        
        if (this.props.userDetails.loggedIn) {    
            return (
            <Router>
                <div className="hold-transition skin-blue fixed sidebar-mini">
                    <div className="wrapper">

                        <Header/>
                       
                                <div className="container-fluid main-container">
                                    <div className="row">
                                        <div className="dashboardWrapper" >
                                            <div className="backColor col-lg-12 col-md-12 col-sm-12 col-xs-12" >
                                                <div className="row">
                                              {/*  <CoreLayout />*/}
                                        <Switch >
                                            <Route path="/login" exact strict component={Login} />
                                            <Route path="/signup" exact strict component={SignUp} />
                                            <Route path="/reset-pwd/:user_ID" exact strict component={ResetPassword} />
                                            
                                            <Route exact path="/"        component={Homepage}  />
                                            <Route exact path="/country/:countryCode/state/:stateCode/city/:district/industry/:industryName/:industry_id/function/:functionalArea/:functionalArea_id/subfunction/:subfunctionalArea/:subfunctionalArea_id"     component={Homepage}  />
                            
                                            <Route exact path="/basic-info"                     component={CandidateBasicInfo}  />
                                            <Route exact path="/address/:candidate_id"           component={CandidateAddress}  />
                                            <Route exact path="/address/:candidate_id/edit/:addressID"        component={CandidateAddress}  />
                                            
                                            <Route exact path="/contact/:candidate_id"           component={CandidateContact}  />
                                            <Route exact path="/academics/:candidate_id"         component={CandidateAcademics}  />
                                            <Route exact path="/certification/:candidate_id"     component={CandidateCertification}  />
                                            <Route exact path="/experience/:candidate_id"        component={CandidateExperience}  />
                                            <Route exact path="/profile/:candidate_id"           component={CandidateProfile}  />
                                            <Route exact path="/candidate-list/:candidate_id"           component={CandidateList}  />


                                            <Route exact path="/search-jobs"                    component={CandidateJobList}  />  
                                            <Route path="/job-profile/:job_id"                  component={JobProfile} exact />
                            
                                            <Route exact path="/applied-jobs"                   component={CandidateAppliedJobList}  />  

                                            <Route exact path="/wishlist"                       component={CandidateJobWishlist}  />  


                                          {/*  <Route exact path="/search-jobs"                    component={JobList}  />  

                                            <Route exact path="/wishlist"                       component={JobWishlist}  />  */}

                                            <Route exact path="/address/:candidate_id/edit/:addressID"                  component={CandidateAddress}  />
                                            <Route exact path="/academics/:candidate_id/edit/:academicsID"              component={CandidateAcademics}  />
                                            <Route exact path="/certification/:candidate_id/edit/:certificationID"      component={CandidateCertification}  />
                                            <Route exact path="/experience/:candidate_id/edit/:workExperienceID"        component={CandidateExperience}  />
                                            <Route exact path="/test-profile"                                           component={TestProfile}  />
                                        </Switch>
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

                 <Header /> 
                    
                
                    <Router >
                        <Switch >

                            <Route exact path="/"        component={Homepage}  />
                            <Route exact path="/country/:countryCode/state/:stateCode/city/:district/industry/:industryName/:industry_id/function/:functionalArea/:functionalArea_id/subfunction/:subfunctionalArea/:subfunctionalArea_id"     component={Homepage}  />
                                   
                            {/*<Route exact path="/country/:countryCode/state/:stateCode"               component={Homepage}  />
                            <Route exact path="/country/:countryCode/state/:stateCode/functional/:functionalArea/:functionalArea_id"               component={Homepage}  />
                            <Route exact path="/country/:countryCode/state/:stateCode/subfunctional/:functionalArea/:functionalArea_id/:subfunctionalArea/:subfunctionalArea_id"               component={Homepage}  />
                            
                            <Route exact path="/country/:countryCode/state/:stateCode/:district"               component={Homepage}  />
                            <Route exact path="/country/:countryCode/state/:stateCode/:district/functional/:functionalArea/:functionalArea_id"     component={Homepage}  />
                            <Route exact path="/country/:countryCode/state/:stateCode/:district/subfunctional/:functionalArea/:functionalArea_id/:subfunctionalArea/:subfunctionalArea_id"     component={Homepage}  />
                            */}

                            <Route exact path="/search-jobs"                    component={CandidateJobList}  />  
                            <Route path="/job-profile/:job_id"                  component={JobProfile} exact />
                                                        

                            <Route path="/login" exact strict component={Login} />
                            <Route path="/signup" exact strict component={SignUp} />
                            <Route path="/forgot-password" exact strict component={ForgotPassword} />
                            <Route path="/reset-pwd/:user_ID" exact strict component={ResetPassword} />
                            <Route path="/confirm-otp/:userID" exact strict component={ConfirmOtp} />
                            
                        </Switch>
                    </Router>
                    <Footer />
                </div>
            );
        }
    }
}
const mapStateToProps = (state)=>{
    return {
        selectedState   : state.selectedState,
        userDetails     : state.userDetails
    }
}
const mapDispatchToProps = (dispatch) => ({
    mapAction :  bindActionCreators(mapActionCreator, dispatch)
    //return bindActionCreators({ setMapSelectedStateFun : setMapSelectedState }, dispatch);  
})  
export default connect(mapStateToProps, mapDispatchToProps) (Layout);