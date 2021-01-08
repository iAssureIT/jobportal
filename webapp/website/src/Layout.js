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
import ResetPasswordFirstLogin from './systemSecurity/ResetPasswordFirstLogin.js';
import Header               from './common/header/Header.js'; 
import FunctionalHeader     from './common/functionalHeader/FunctionalHeader.js'; 
import MapHeader            from './common/mapHeader/MapHeader.js'; 
import Footer               from './common/footer/Footer.js';
import CoreLayout           from './coreadmin/CoreLayout/CoreLayout.js';

import PageFunctionWise     from './pages/PageFunctionalAreawiseJobs/PageFunctionWise.js';
import SubPageFunctionWise  from './pages/PageFunctionalAreawiseJobs/SubPageFunctionWise.js';

import CandidateProfile     from './blocks/ProfilePage/CandidateProfile.js';
import CandidateList        from './blocks/CandidateList/CandidateList.js';
import CandidateBasicInfo   from './pages/ProfileCreation/CandidateBasicInfo.js';
import CandidateAddress     from './pages/ProfileCreation/CandidateAddress.js';
import CandidateContact     from './pages/ProfileCreation/CandidateContact.js';
import CandidateAcademics   from './pages/ProfileCreation/CandidateAcademics.js';
import CandidateCertification  from './pages/ProfileCreation/CandidateCertification.js';
import CandidateExperience  from './pages/ProfileCreation/CandidateExperience.js';

//import CandidateProfile     from './blocks/CandidateProfile/CandidateProfile.js';
//import CandidateList     from './blocks/CandidateList/CandidateList.js';


import CandidateJobList         from './pages/CandidateJobList/CandidateJobList.js'
import CandidateAppliedJobList  from './pages/CandidateAppliedJobList/CandidateAppliedJobList.js';
import CandidateJobWishlist     from './pages/CandidateJobWishlist/CandidateJobWishlist.js';

import India from './maps/India/India.js';
import Maharashtra from './maps/MapComponent/MapComponent.js';
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
import Punjab from './maps/Punjab/Punjab.js';
import Tripura from './maps/Tripura/Tripura.js';
import WestBengal from './maps/WestBengal/WestBengal.js';
import TamilNadu from './maps/TamilNadu/TamilNadu.js';
import Telangana from './maps/Telangana/Telangana.js';
import UttarPradesh from './maps/UttarPradesh/UttarPradesh.js';


import Haryana from './maps/Haryana/Haryana.js';
import Rajasthan from './maps/Rajasthan/Rajasthan.js';
import Uttarakhand from './maps/Uttarakhand/Uttarakhand.js';
import Sikkim from './maps/Sikkim/Sikkim.js';
import Assam from './maps/Assam/Assam.js';
import Ladakh from './maps/Ladakh/Ladakh.js';









import Homepage from './pages/Homepage/Homepage.js'

class Layout extends Component  {

    constructor(props) {
        super();
        this.state = {
            loggedIn: false,
            sidebar: true,
            empProfileStatus: true,
            stateArray:[],
            showMapHeader : false,  
        }
    }

    componentDidMount() {
        var pageUrl = window.location.pathname;
        let lastpara = pageUrl ? pageUrl.split('/') : "";
        
        if (lastpara[1] == '' || lastpara[1] == '/functional-area' || lastpara[1] == '/subfunctional-area') {
            this.setState({ showMapHeader: true })
        }
        this.setState({ currentUrl: pageUrl })
        axios.get("http://locations2.iassureit.com/api/states/get/list/IN")
            .then((response) => {
                this.setState({
                    stateArray: response.data
                },()=>{
                    let stateLink = this.state.stateArray.find(element => element.stateName == decodeURIComponent(lastpara[1]) );
                    
                    if (stateLink ) {
                        this.setState({ showMapHeader: true })
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

                        <Header />
                       
                                <div className="container-fluid main-container">
                                    <div className="row">
                                        <div className="dashboardWrapper" >
                                            <div className="backColor col-lg-12 col-md-12 col-sm-12 col-xs-12" >
                                                <div className="row">
                                              {/*  <CoreLayout />*/}
                                        <Switch >
                                            <Route exact path="/functional-area"                component={PageFunctionWise}  />
                                            <Route exact path="/subfunctional-area"             component={SubPageFunctionWise}  />

                                            <Route exact path="/"                               component={Homepage}  />
                                            <Route exact path="/state/:stateCode"               component={Homepage}  />

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

                                            <Route exact path="/applied-jobs"                   component={CandidateAppliedJobList}  />  

                                            <Route exact path="/wishlist"                       component={CandidateJobWishlist}  />  


                                          {/*  <Route exact path="/search-jobs"                    component={JobList}  />  

                                            <Route exact path="/wishlist"                       component={JobWishlist}  />  */}

                                            <Route exact path="/address/:candidate_id/edit/:addressID"                  component={CandidateAddress}  />
                                            <Route exact path="/academics/:candidate_id/edit/:academicsID"              component={CandidateAcademics}  />
                                            <Route exact path="/certification/:candidate_id/edit/:skillCertificationID" component={CandidateCertification}  />
                                            <Route exact path="/experience/:candidate_id/edit/:workExperienceID"        component={CandidateExperience}  />


                                            
                                            
                                            {/*<Route exact path="/Andaman And Nicobar Islands"        component={AndamanAndNicobar }  />
                                            */}
                                            <Route exact path="/AndhraPradesh"        component={AndhraPradesh }  />
                                            <Route exact path="/ArunachalPradesh"        component={ArunachalPradesh }  />
                                            {/*<Route exact path="/Assam"        component={Assam }  />*/}
                                            <Route exact path="/Bihar"        component={Bihar }  />
                                            {/*<Route exact path="/Chandigarh"        component={Chandigarh }  />*/}
                                            
                                            <Route exact path="/Chhattisgarh"        component={Chhattisgarh }  />
                                            {/*<Route exact path="/Dadra And Nagar Haveli"        component={DadraNagarHaveli }  />
                                            <Route exact path="/Daman And Diu"        component={DamanAndDiu }  />
                                            */}
                                            <Route exact path="/Delhi"        component={Delhi }  />
                                            <Route exact path="/Goa"        component={Goa }  />
                                            <Route exact path="/Gujarat"        component={Gujarat }  />
                                            {/*<Route exact path="/Haryana"        component={Haryana }  />*/}
                                            <Route exact path="/HimachalPradesh"        component={HimachalPradesh }  />
                                            <Route exact path="/Jammu And Kashmir"        component={JammuKashmirLadakh }  />
                                            <Route exact path="/Jharkhand"        component={Jharkhand }  />
                                            <Route exact path="/Karnataka"        component={Karnataka }  />
                                            <Route exact path="/Kerala"        component={Kerala }  />
                                            {/*<Route exact path="/Lakshadweep"        component={Lakshadweep }  />*/}
                                            <Route exact path="/MadhyaPradesh"        component={MadhyaPradesh }  />
                                            <Route exact path="/Maharashtra"        component={Maharashtra }  />                                                    
                                            <Route exact path="/Manipur"        component={Manipur }  />
                                            <Route exact path="/Meghalaya"        component={Meghalaya }  />
                                            <Route exact path="/Mizoram"        component={Mizoram }  />
                                            <Route exact path="/Nagaland"        component={Nagaland }  />
                                            <Route exact path="/Odisha"        component={Orissa }  />
                                            <Route exact path="/Punjab"        component={Punjab }  />

                                            <Route exact path="/Tripura"        component={Tripura }  />
                                            <Route exact path="/WestBengal"        component={WestBengal }  />
                                            <Route exact path="/TamilNadu"        component={TamilNadu }  />
                                            <Route exact path="/Telangana"        component={Telangana }  />
                                            <Route exact path="/UttarPradesh"        component={UttarPradesh }  />






                                            <Route exact path="/Haryana"        component={Haryana }  />
                                            <Route exact path="/Rajasthan"        component={Rajasthan }  />
                                            <Route exact path="/Uttarakhand"        component={Uttarakhand }  />
                                            <Route exact path="/Sikkim"        component={Sikkim}  />
                                            <Route exact path="/Assam"        component={Assam}  />



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

                 <MapHeader/> 
                    
                
                    <Router >
                        <Switch >

                            <Route exact path="/"        component={Homepage}  />
                            <Route exact path="/state/:stateCode"               component={Homepage}  />

                            <Route exact path="/search-jobs"                    component={CandidateJobList}  />  
                            /**/

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