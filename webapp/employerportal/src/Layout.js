import React, { Component }                       from 'react';
import { connect }                                from 'react-redux';
import { withRouter }                             from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';


// Section: 1 - SystemSecurity ******************************************************
import Login from './coreadmin/systemSecurity/Login.js';
import ConfirmOtp from './coreadmin/systemSecurity/ConfirmOtp.js';
import ForgotPassword from './coreadmin/systemSecurity/ForgotPassword.js';
import ResetPassword from './coreadmin/systemSecurity/ResetPassword.js';
//import ResetPasswordFirstLogin from './coreadmin/systemSecurity/ResetPasswordFirstLogin.js';
import SignUp from './coreadmin/systemSecurity/SignUp.js';


/*import Footer                                   from './coreadmin/common/footer/Footer.js';*/
import EmployeeMaster                           from "./coreadmin/Master/EmployeeMaster/EmployeeMaster.js"
import Leftsidebar                              from './jobportaladmin/Common/leftSidebar/Leftsidebar.js';
import Dashboard                                from './jobportaladmin/Dashboard/Dashboard.js'
import Header                                   from './jobportaladmin/Common/Header/Header.js'; 
import Footer                                   from './jobportaladmin/Common/Footer/Footer.js';
/*import Leftsidebar                              from './jobportaladmin/Common/LeftSidebar/Leftsidebar.js';*/
import FunctionalHeader                         from './jobportaladmin/Common/FunctionalHeader/FunctionalHeader.js'; 
import JobPosting                               from './jobportaladmin/JobPosting/JobPosting.js'; 
import JobList                                  from './jobportaladmin/JobList/JobList.js'; 


import axios                from 'axios';
import CoreLayout from './coreadmin/CoreLayout/CoreLayout.js';


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
      var user_id = localStorage.getItem("user_ID");

      var contractID ="";
      axios.get("/api/contract/get/one/entity/" + company_Id)
      .then((response) => {
          if(response.data.length>0){
              var contractDetails = response.data[0];
               axios.get("/api/entitymaster/get/one/"+company_Id)
              .then((response)=>{
                  if(response.data[0].profileStatus === "New" || contractDetails.status !== "Approved"){
                      this.setState({
                          sidebar:false
                      })
                  }
              })
              .catch((error)=>{})
          }else{
              this.setState({
                  sidebar:false
              })
          }
      })
      .catch((error) => {})

      axios.get('/api/personmaster/get/details/' + user_id)
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
        console.log("this.state.sidebar ",this.state.loggedIn );
        if (this.state.loggedIn) {
            return (
            <Router>
                <div className="hold-transition skin-blue fixed sidebar-mini">
                    <div className="content-wrapper" style={{paddingTop:0}}>
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
                                                    <Switch >
                                                        <Route path="/" component={Dashboard} exact />
                                                        <Route path="/dashboard" component={Dashboard} exact />
                                                        <Route path="/post-job" component={JobPosting} exact />
                                                        <Route path="/job-list" component={JobList} exact />
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
                            {/*<Route path="/reset-password/:user_ID" exact strict component={ResetPasswordFirstLogin}  />*/}
                        </Switch>
                    </Router>
                </div>
            );
        }
    }
}

 
export default Layout;