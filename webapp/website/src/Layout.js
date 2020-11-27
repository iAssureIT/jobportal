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
import JobList              from './blocks/jobList/JobList.js'
import JobWishlist          from './blocks/jobWishlist/JobWishlist.js'

import CandidateProfile     from './blocks/ProfilePage/CandidateProfile.js';
import CandidateBasicInfo   from './pages/ProfileCreation/CandidateBasicInfo.js';
import CandidateAddress     from './pages/ProfileCreation/CandidateAddress.js';
import CandidateContact     from './pages/ProfileCreation/CandidateContact.js';
import CandidateAcademics   from './pages/ProfileCreation/CandidateAcademics.js';
import CandidateCertification     from './pages/ProfileCreation/CandidateCertification.js';
import CandidateExperience  from './pages/ProfileCreation/CandidateExperience.js';
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

import Homepage from './blocks/Homepage/Homepage.js'

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
                    console.log(this.state.stateArray)
                    let stateLink = this.state.stateArray.find(element => element.stateName == decodeURIComponent(lastpara[1]) );
                    
                    if (stateLink ) {
                        this.setState({ showMapHeader: true })
                        this.props.mapAction.setMapSelectedState(decodeURIComponent(lastpara[1]));
                    }  
                })
            })
            .catch((error) => {
            })
        

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
                       
                                <div className="container-fluid main-container">
                                    <div className="row">
                                        <div className="dashboardWrapper" >
                                            <div className="backColor col-lg-12 col-md-12 col-sm-12 col-xs-12" >
                                                <div className="row">
                                              {/*  <CoreLayout />*/}
                                        <Switch >
                                            <Route exact path="/functional-area"        component={PageFunctionWise}  />
                                            <Route exact path="/subfunctional-area"        component={SubPageFunctionWise}  />

                                            <Route exact path="/"        component={Homepage}  />

                                            <Route exact path="/basic-info"        component={CandidateBasicInfo}  />
                                            <Route exact path="/address/:candidateID"           component={CandidateAddress}  />
                                            <Route exact path="/contact/:candidateID"           component={CandidateContact}  />
                                            <Route exact path="/academics/:candidateID"         component={CandidateAcademics}  />
                                            <Route exact path="/certification/:candidateID"     component={CandidateCertification}  />
                                            <Route exact path="/experience/:candidateID"        component={CandidateExperience}  />
                                            <Route exact path="/profile/:candidateID"           component={CandidateProfile}  />
                                            <Route exact path="/search-jobs"                    component={JobList}  />  
                                            <Route exact path="/wishlist"                    component={JobWishlist}  />  
                                            
                                            
                                            {/*<Route exact path="/Andaman And Nicobar Islands"        component={AndamanAndNicobar }  />
                                            */}
                                            <Route exact path="/Andhra Pradesh"        component={AndhraPradesh }  />
                                            <Route exact path="/Arunachal Pradesh"        component={ArunachalPradesh }  />
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
                                            <Route exact path="/Himachal Pradesh"        component={HimachalPradesh }  />
                                            <Route exact path="/Jammu And Kashmir"        component={JammuKashmirLadakh }  />
                                            <Route exact path="/Jharkhand"        component={Jharkhand }  />
                                            <Route exact path="/Karnataka"        component={Karnataka }  />
                                            <Route exact path="/Kerala"        component={Kerala }  />
                                            {/*<Route exact path="/Lakshadweep"        component={Lakshadweep }  />*/}
                                            <Route exact path="/Madhya Pradesh"        component={MadhyaPradesh }  />
                                            <Route exact path="/Maharashtra"        component={Maharashtra }  />                                                    
                                            <Route exact path="/Manipur"        component={Manipur }  />
                                            <Route exact path="/Meghalaya"        component={Meghalaya }  />
                                            <Route exact path="/Mizoram"        component={Mizoram }  />
                                            <Route exact path="/Nagaland"        component={Nagaland }  />
                                            <Route exact path="/Odisha"        component={Orissa }  />

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

                { this.state.showMapHeader ? <MapHeader/> : null }
                    
                
                    <Router >
                        <Switch >

                            <Route exact path="/"        component={Homepage}  />
                            {/*<Route exact path="/Andaman And Nicobar Islands"        component={AndamanAndNicobar }  />
                            */}
                            <Route exact path="/Andhra Pradesh"        component={AndhraPradesh }  />
                            <Route exact path="/Arunachal Pradesh"        component={ArunachalPradesh }  />
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
                            <Route exact path="/Himachal Pradesh"        component={HimachalPradesh }  />
                            <Route exact path="/Jammu And Kashmir"        component={JammuKashmirLadakh }  />
                            <Route exact path="/Jharkhand"        component={Jharkhand }  />
                            <Route exact path="/Karnataka"        component={Karnataka }  />
                            <Route exact path="/Kerala"        component={Kerala }  />
                            {/*<Route exact path="/Lakshadweep"        component={Lakshadweep }  />*/}
                            <Route exact path="/Madhya Pradesh"        component={MadhyaPradesh }  />
                            <Route exact path="/Maharashtra"        component={Maharashtra }  />                                                    
                            <Route exact path="/Manipur"        component={Manipur }  />
                            <Route exact path="/Meghalaya"        component={Meghalaya }  />
                            <Route exact path="/Mizoram"        component={Mizoram }  />
                            <Route exact path="/Nagaland"        component={Nagaland }  />
                            <Route exact path="/Odisha"        component={Orissa }  />


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
        selectedState  : state.selectedState
    }
}
const mapDispachToProps = (dispatch) => ({
    mapAction :  bindActionCreators(mapActionCreator, dispatch)
    //return bindActionCreators({ setMapSelectedStateFun : setMapSelectedState }, dispatch);  
})  
export default connect(mapStateToProps, mapDispachToProps) (Layout);