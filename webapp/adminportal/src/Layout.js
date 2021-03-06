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
import ChangePassword               from './coreadmin/systemSecurity/ChangePassword.js';

import Dashboard            from './jobportaladmin/Dashboard/Dashboard.js';

import JobPosting           from './jobportaladmin/blocks/JobPosting/JobPosting.js';
import JobPostProfile       from './jobportaladmin/blocks/JobPostProfile/JobPostProfile.js';
import CandidateProfile     from './jobportaladmin/blocks/CandidateProfile/CandidateProfile.js';

import JoblistPage          from './jobportaladmin/pages/JoblistPage/JoblistPage.js';

import AppliedCandidatelistPage    from './jobportaladmin/pages/AppliedCandidatelistPage/AppliedCandidatelistPage.js';

import JobListView          from './jobportaladmin/blocks/Joblist/Joblist.js';
import FilewiseJobList      from './jobportaladmin/pages/FilewiseJobList/FilewiseJobList.js';
import CandidatelistPage    from './jobportaladmin/pages/CandidatelistPage/CandidatelistPage.js';

import Header               from './coreadmin/common/header/Header.js'; 
import Footer               from './coreadmin/common/footer/Footer.js';
import Leftsidebar          from './coreadmin/common/leftSidebar/Leftsidebar.js';
import EmployeeProfile      from './coreadmin/EmployeeProfile/EmployeeProfile.js';
import CompanyProfile       from './coreadmin/CompanyProfile/CompanyProfile.js';
import CompanyProfileView   from './coreadmin/CompanyProfile/CompanyProfileView.js';

// =============  Master =======================
import AddressType          from "./jobportaladmin/Master/AddressType/AddressType.js"
import Industry             from "./jobportaladmin/Master/Industry/Industry.js"
import SubIndustry          from "./jobportaladmin/Master/SubIndustry/SubIndustry.js"
import FunctionalArea       from "./jobportaladmin/Master/FunctionalArea/FunctionalArea.js"
import JobCategory          from "./jobportaladmin/Master/JobCategory/JobCategory.js"
import JobType              from "./jobportaladmin/Master/JobType/JobType.js"
import QualificationLevel   from "./jobportaladmin/Master/QualificationLevel/QualificationLevel.js"
import Language             from "./jobportaladmin/Master/Language/Language.js"
import University           from "./jobportaladmin/Master/University/University.js"
import College              from "./jobportaladmin/Master/College/College.js"

import MasterData           from "./jobportaladmin/Master/MasterData.js";

import Module               from "./jobportaladmin/Master/Module/Module.js"
import Facility             from "./jobportaladmin/Master/Facility/Facility.js"

import CoreLayout           from './coreadmin/CoreLayout/CoreLayout.js';
import GlobalMaster         from "./coreadmin/companysetting/Components/GlobalMasters.js";

// =============  Candidate =======================
import CandidateMainPage        from "./jobportaladmin/blocks/CandidateMainPage/CandidateMainPage.jsx";
import CandidateBasicInfo       from "./jobportaladmin/pages/ProfileCreation/CandidateBasicInfo.js";
import CandidateAddress         from "./jobportaladmin/pages/ProfileCreation/CandidateAddress.js";
import CandidateAcademics       from "./jobportaladmin/pages/ProfileCreation/CandidateAcademics.js";
import CandidateExperience      from "./jobportaladmin/pages/ProfileCreation/CandidateExperience.js";
import CandidateCertification   from "./jobportaladmin/pages/ProfileCreation/CandidateCertification.js";

// =============  Package master =======================
import PackageMaster        from "./coreadmin/PackageMaster/PackageMaster.js";

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

                                                        <Route path="/post-job" exact strict component={JobPosting} />
                                                        <Route path="/post-job/:job_id" exact strict component={JobPosting} />
                                                        <Route path="/job-profile/:job_id" exact strict component={JobPostProfile} />
                                                        <Route path="/job-profile" exact strict component={JobPostProfile} />
                                                        <Route path="/job/list" exact strict component={JoblistPage} /> 
                                                        <Route path="/applied-candidate-list/:job_id"    component={AppliedCandidatelistPage} />
                                                        <Route path="/candidate-profile/:candidate_id"  component={CandidateProfile} />

                                                        <Route path="/candidate/list" exact strict component={CandidatelistPage} />
                                                        <Route path="/candidate/basic-info" exact strict component={CandidateBasicInfo} />
                                                        <Route path="/candidate/basic-info/:candidate_id" exact strict component={CandidateBasicInfo} />
                                                        
                                                        <Route path="/candidate/address/:candidate_id" exact strict component={CandidateAddress} />
                                                        <Route path="/candidate/address" exact strict component={CandidateAddress} />
                                                        <Route path="/candidate/academics/:candidate_id" exact strict component={CandidateAcademics} />
                                                        <Route path="/candidate/academics" exact strict component={CandidateAcademics} />
                                                
                                                        <Route path="/candidate/experience/:candidate_id" exact strict component={CandidateExperience} />
                                                        <Route path="/candidate/experience" exact strict component={CandidateExperience} />
                                                        <Route path="/candidate/certification/:candidate_id" exact strict component={CandidateCertification} />
                                                        <Route path="/candidate/certification" exact strict component={CandidateCertification} />


                                                        <Route path="/package-master" exact strict component={PackageMaster} />
                                                        <Route path="/package-master/:package_id" exact strict component={PackageMaster} />


                                                       
                                                        <Route path="/joblist" exact strict component={JobListView} />
                                                        <Route path="/filewise/jobs" exact strict component={FilewiseJobList} />
                
                                                        <Route path="/change-password" exact strict component={ChangePassword} />


                                                        <Route path="/address-type" exact strict component={AddressType} />
                                                        <Route path="/address-type/:fieldID" exact strict component={AddressType} />
                                                        <Route path="/industry" exact strict component={Industry} />
                                                        <Route path="/industry/:fieldID" exact strict component={Industry} />
                                                        
                                                        <Route path="/subindustry" exact strict component={SubIndustry} />
                                                        <Route path="/subindustry/:fieldID" exact strict component={SubIndustry} />
                                                        
                                                        <Route path="/functional-area" exact strict component={FunctionalArea} />
                                                        <Route path="/functional-area/:fieldID" exact strict component={FunctionalArea} />
                                                        <Route path="/job-category" exact strict component={JobCategory} />
                                                        <Route path="/job-category/:fieldID" exact strict component={JobCategory} />
                                                        <Route path="/job-type" exact strict component={JobType} />
                                                        <Route path="/job-type/:fieldID" exact strict component={JobType} />
                                                        <Route path="/qualification-level" exact strict component={QualificationLevel} />
                                                        <Route path="/qualification-level/:fieldID" exact strict component={QualificationLevel} />
                                                        <Route path="/university" exact strict component={University} />
                                                        <Route path="/university/:fieldID" exact strict component={University} />
                                                        
                                                        <Route path="/colleges" exact strict component={College} />
                                                        <Route path="/colleges/:fieldID" exact strict component={College} />
                                                        
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
                            <Route path="/forgot-password" exact strict component={ForgotPassword} />
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