import React, { Component }                       from 'react';
import { connect }                                from 'react-redux';
import { withRouter }                             from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';

// Section: 1 - SystemSecurity ***********************************
import Login                from './candidateprofile/systemSecurity/Login.js';
import ConfirmOtp           from './candidateprofile/systemSecurity/ConfirmOtp.js';
import ForgotPassword       from './candidateprofile/systemSecurity/ForgotPassword.js';
import ResetPassword        from './candidateprofile/systemSecurity/ResetPassword.js';
import SignUp               from './candidateprofile/systemSecurity/SignUp.js';
import ResetPasswordFirstLogin from './candidateprofile/systemSecurity/ResetPasswordFirstLogin.js';
import Header               from './candidateprofile/common/header/Header.js'; 
import Footer               from './candidateprofile/common/footer/Footer.js';
import Leftsidebar          from './candidateprofile/common/leftSidebar/Leftsidebar.js';
import CoreLayout           from './coreadmin/CoreLayout/CoreLayout.js';

//import CompanyProfile       from './candidateprofile/Profile/CompanyProfile/CompanyProfile.js';
import CandidateProfile            from './candidateprofile/Profile/CandidateProfile.js';


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

        axios.get("/api/entitymaster/get/one/"+company_Id)
        .then((company)=>{
            axios.get("/api/contract/get/one/entity/" + company_Id)
            .then((contract) => {
                if(contract.data.length>0){
                    var contractDetails = contract.data[0];
                    if(company.data[0].profileStatus === "New" || contractDetails.status !== "Approved"){
                        this.setState({
                            sidebar:false
                        })
                    }
                }else{
                this.setState({
                    sidebar:false
                })
            }
                   

              })
            .catch((error) => {})      
        })
        .catch((error)=>{})
         const user_ID = localStorage.getItem("user_ID");

         axios.get('/api/personmaster/get/details/' + user_ID)
          .then((res) => {
            console.log("res empProfileStatus",res)
            if(res.data[0].profileStatus && res.data[0].profileStatus === "New" )
            {
              this.setState({
                empProfileStatus : false
              })
            }
            
          })
          .catch((err) => {
          })

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
        const roles = localStorage.getItem("roles");
        var roleArr = [];
        roleArr.push(roles);
        if (this.state.loggedIn) {
            return (
            <Router>
                <div className="hold-transition skin-blue fixed sidebar-mini">
                    <div className="content-wrapper">
                        <div className="wrapper">
                            <Header />
                            <div className="">
                                <div className="row">
                                    {   
                                        (roles.indexOf("vendoradmin")>-1) ?
                                            this.state.sidebar && this.state.empProfileStatus?
                                                <Leftsidebar/>
                                            :
                                            null
                                        :
                                        <Leftsidebar/>
                                    }
                                    <div className="container-fluid main-container">
                                        <div className="row">
                                            <div className="dashboardWrapper" >
                                                <div className="backColor col-lg-12 col-md-12 col-sm-12 col-xs-12" >
                                                  {/*  <CoreLayout />*/}
                                                    <Switch >
                                                        
                                                        <Route path="/"                                            component={CandidateProfile} exact />
                                                        <Route path="/profile"                                   component={CandidateProfile} exact />  
                                                        
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
                            <Route path="/reset-password/:user_ID" exact strict component={ResetPasswordFirstLogin}  />
                        </Switch>
                    </Router>
                </div>
            );
        }
    }
}

 
export default Layout;