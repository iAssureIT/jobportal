import React, { Component }                       from 'react';
import { connect }                                from 'react-redux';
import { withRouter }                             from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';


// Section: 1 - SystemSecurity ******************************************************
import Login from './jobportaladmin/systemSecurity/Login.js';
import ConfirmOtp from './jobportaladmin/systemSecurity/ConfirmOtp.js';
import ForgotPassword from './jobportaladmin/systemSecurity/ForgotPassword.js';
import ResetPassword from './jobportaladmin/systemSecurity/ResetPassword.js';
//import ResetPasswordFirstLogin from './coreadmin/systemSecurity/ResetPasswordFirstLogin.js';
import SignUp from './jobportaladmin/systemSecurity/SignUp.js';

/*import Footer                                   from './coreadmin/common/footer/Footer.js';*/
import Leftsidebar                              from './jobportaladmin/common/leftSidebar/Leftsidebar.js';
import Dashboard                                from './jobportaladmin/Dashboard/Dashboard.js'
import Header                                   from './jobportaladmin/common/header/Header.js'; 
import Footer                                   from './jobportaladmin/common/footer/Footer.js';
/*import Leftsidebar                              from './jobportaladmin/common/LeftSidebar/Leftsidebar.js';*/
import FunctionalHeader                         from './jobportaladmin/common/functionalHeader/FunctionalHeader.js'; 

import JobPosting                               from './jobportaladmin/blocks/JobPosting/JobPosting.js'; 
import JobPostProfile                           from './jobportaladmin/blocks/JobPostProfile/JobPostProfile.js'; 

import EmployeeJoblistPage                      from './jobportaladmin/pages/EmployeeJoblistPage/EmployeeJoblistPage.js';

import axios                from 'axios';
import CoreLayout           from './coreadmin/CoreLayout/CoreLayout.js';

class Layout extends Component  {

    constructor(props) {
        super();
        this.state = {
            loggedIn: false,
            sidebar: true,
            empProfileStatus: true,
            contractDetails:"",
            profileStatus:""
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

       // let stateLink = this.state.stateArray.find(o => o.stateName === decodeURIComponent(lastpara[1])); 
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
                    <div className="" style={{paddingTop:0}}>
                        <div className="wrapper">
                            <Header />
                            <div className="">
                                <div className="row">
                                    {   
                                        /*(roles.indexOf("corporateadmin")>-1) ?
                                            this.state.sidebar && this.state.empProfileStatus?
                                                <Leftsidebar/>
                                            :
                                            null
                                        :
                                        ( this.state.empProfileStatus ? <Leftsidebar/> : null) */
                                       /* <Leftsidebar/>*/
                                    }

                                    <div className="container-fluid main-container">
                                        <div className="row">
                                            <div className="dashboardWrapper" >
                                                <div className="backColor col-lg-12 col-md-12 col-sm-12 col-xs-12" >
                                                    <CoreLayout />
                                                   {/* <Leftsidebar/>*/}
                                                    <Switch >
                                                        <Route path="/" component={Dashboard} exact />
                                                        <Route path="/post-job/" component={JobPosting} exact />
                                                        <Route path="/post-job/:job_id" component={JobPosting} exact />
                                                        <Route path="/job-profile/:job_id" component={JobPostProfile} exact />
                                                        <Route path="/job-list" component={EmployeeJoblistPage} exact />
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
                    <CoreLayout />
                        <Switch >
                            <Route path="/" exact strict component={Login} />
                            <Route path="/login" exact strict component={Login} />
                            <Route path="/signup" exact strict component={SignUp} />
                            <Route path="/forgotpassword" exact strict component={ForgotPassword} />
                            <Route path="/reset-pwd/:user_ID" exact strict component={ResetPassword} />
                            <Route path="/confirm-otp/:userID" exact strict component={ConfirmOtp} />
                            {/*<Route path="/reset-password/:user_ID" exact strict component={ResetPasswordFirstLogin}  />*/}
                        </Switch>
                    </Router>
                </div>
            );
        } 
    }
}

 
export default Layout;