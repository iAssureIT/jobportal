import React, { Component }                       from 'react';
import { connect }                                from 'react-redux';
import { withRouter }                             from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';


// Section: 1 - SystemSecurity ******************************************************
import Login                from './coreadmin/systemSecurity/Login.js';
import ConfirmOtp           from './coreadmin/systemSecurity/ConfirmOtp.js';
import ForgotPassword       from './coreadmin/systemSecurity/ForgotPassword.js';
import ResetPassword        from './coreadmin/systemSecurity/ResetPassword.js';
import SignUp               from './coreadmin/systemSecurity/SignUp.js';

import Dashboard            from './jobportaladmin/Dashboard/Dashboard.js'

import Header               from './coreadmin/common/header/Header.js'; 
import Footer               from './coreadmin/common/footer/Footer.js';
import Leftsidebar          from './coreadmin/common/leftSidebar/Leftsidebar.js';
import EmployeeProfile      from './coreadmin/EmployeeProfile/EmployeeProfile.js';
import CompanyProfile       from './coreadmin/CompanyProfile/CompanyProfile.js';
import CompanyProfileView   from './coreadmin/CompanyProfile/CompanyProfileView.js';
// ============ Contract Management =========================== 

import Industry             from "./jobportaladmin/Master/Industry/Industry.js"
import FunctionalArea       from "./jobportaladmin/Master/FunctionalArea/FunctionalArea.js"
import JobCategory       from "./jobportaladmin/Master/JobCategory/JobCategory.js"
import Module             from "./jobportaladmin/Master/Module/Module.js"
import Facility       from "./jobportaladmin/Master/Facility/Facility.js"

import CoreLayout           from './coreadmin/CoreLayout/CoreLayout.js';

// =============  Master =======================
import MasterData                               from "./jobportaladmin/MasterData/MasterData.js";
import GlobalMaster         from "./coreadmin/companysetting/Components/GlobalMasters.js";

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
                                                    <CoreLayout />
                                                    <Switch >
                                                        <Route path="/" component={Dashboard} exact />
                                                        <Route path="/dashboard" component={Dashboard} exact />
                                                        <Route path="/employee-profile/:emp_ID" exact strict component={EmployeeProfile} />
                                                        <Route path="/org-profile" exact strict component={CompanyProfile} />
                                                        <Route path="/company-profile/:comp_ID" exact strict component={CompanyProfileView} />

                                                        
                                                        <Route path="/industry" exact strict component={Industry} />
                                                        <Route path="/industry/:fieldID" exact strict component={Industry} />
                                                        <Route path="/functional-area" exact strict component={FunctionalArea} />
                                                        <Route path="/functional-area/:fieldID" exact strict component={FunctionalArea} />
                                                        <Route path="/job-category" exact strict component={JobCategory} />
                                                        <Route path="/job-category/:fieldID" exact strict component={JobCategory} />
                                                        
                                                        {/*<Route path="/technicalMaster/tax-name" exact strict component={TaxName} />*/}
                                                        <Route path="/technicalMaster/tax-name"  render={(props)=><GlobalMaster {...props}/> } exact />
                                                        {/*<Route path="/technicalMaster/tax-name/:fieldID" exact strict component={TaxName} />*/}
                                                        <Route path="/technicalMaster/tax-name/:fieldID" render={(props)=><GlobalMaster {...props}/>} exact />
                                                        
                                                        {/* Master Data*/}
                                                        <Route path="/project-master-data"                          render={(props)=><MasterData {...props}/> } exact />
                                                        <Route path="/project-master-data/:editId"                  render={(props)=><MasterData {...props}/> } exact />
                                                        <Route path="/project-master-data/oneField/:oneFieldEditId" render={(props)=><MasterData {...props}/> } exact />
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