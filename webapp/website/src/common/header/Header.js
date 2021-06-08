import React, {Component}   from 'react';
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome';
import $      from 'jquery';
import jQuery from 'jquery';
import axios  from 'axios';
import Swal           from 'sweetalert2';
import '../header/Header.css';
import LoginForm                from '../../systemSecurity/Login.js';
import SignUp                   from '../../systemSecurity/SignUp.js';
import ForgotPassword           from '../../systemSecurity/ForgotPassword.js';
import ConfirmOtp               from '../../systemSecurity/ConfirmOtp.js';
import ResetPassword            from '../../systemSecurity/ResetPassword.js'
import ChangePassword           from '../../systemSecurity/ChangePassword.js'
import {connect}                from 'react-redux';
import { bindActionCreators }   from 'redux';
import  * as mapActionCreator   from '../../common/actions/index';
import { withRouter }     from 'react-router-dom';

class Header extends Component{
  constructor(props){
    super(props);
    this.state={
      showLoginModal    : false,
      asideDisplay      : "-600px",
      userMenu          : "none",
      user_id           :this.props.userDetails.user_id,
      profileCompletion : 0
      //selector            : {},
    }
    this.handleOpenModal  = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }


 sendOTP(event) {

       

        var formValues = {
           userid : this.state.user_id,

        }
         

            $('.fullpageloader').show();
            axios.patch('/api/auth/patch/setotpusingID', formValues)
            .then((response)=>{
              
               
                if (response.data.message == "OTP_UPDATED") {
                    var sendData = {
                      "event"     : "Event1", //Event Name
                      "toUser_id"  : response.data.ID, //To user_id(ref:users)
                      "toUserRole"  : "candidate",
                      "variables" : {
                      "UserName": response.data.firstName,
                      "OTP"     : response.data.OTP,
                      }
                    }
                    axios.post('/api/masternotifications/post/sendNotification', sendData)
                    .then((notificationres) => {})
                    .catch((error) => { console.log('notification error: ', error) })
                     
                   
                    Swal.fire('', "OTP send to your registered email ID.", '');
                    //this.props.history.push('/confirm-otp/'+response.data.ID);optEmail is not defined
                    
                     
                      var {mapAction} = this.props;
                      mapAction.setUserID(response.data.ID);
                      mapAction.setSelectedModal("confirmotp"); 
                      document.getElementById("changepassworddiv").click();

                } 
            })
            .catch((error)=>{
                //document.getElementById("sendlink").innerHTML = 'Reset Password';
                Swal.fire('', "error.....", '');
                $('.fullpageloader').hide();
            })
        
    }

  userMenuToggle(event){

    if(this.state.userMenu==="none"){
  
      this.setState({
      userMenu  : "block",
      })
    }
    else{
      this.setState({
      userMenu  : "none",
      })
    }
  }
  componentDidMount(){
      var {mapAction} = this.props;
      /*var selector = this.props.selector;
      console.log(window.location.pathname.split("/"))
      //console.log(window.location.pathname.split("/")[3])
      if (window.location.pathname.split("/")[0] == "") {
        selector.countryCode = "IN";
      }
      if(window.location.pathname.split("/")[1] == "state" && !window.location.pathname.split("/")[3]){
        selector.stateCode = window.location.pathname.split("/")[2] 
      }
      if(window.location.pathname.split("/")[1] == "state" && !window.location.pathname.split("/")[3]){
        selector.stateCode = window.location.pathname.split("/")[2] 
      }
      if(window.location.pathname.split("/")[1] == "state" && !window.location.pathname.split("/")[3] && window.location.pathname.split("/")[5]){
        selector.stateCode = window.location.pathname.split("/")[2] 
      }
      if (window.location.pathname.split("/")[1] == "state" && window.location.pathname.split("/")[3]) {
        selector.district = window.location.pathname.split("/")[3] 
      }
      if (window.location.pathname.split("/")[1] == "state" && window.location.pathname.split("/")[5]) {
        selector.functionalArea = window.location.pathname.split("/")[5] 
      } 
      //console.log(selector)
      mapAction.jobCount(selector);*/

      if (window.location.pathname.split("/")[3] == "state" ) {
        var stateName = "";
          //selector.stateCode = window.location.pathname.split("/")[2] 
          switch(window.location.pathname.split("/")[4]) {
        case "AD": stateName = "Andhra Pradesh"
          break;
        case "AR": stateName = "Arunachal Pradesh"
          break;
        case "AS": stateName = "Assam"
          break;
        case "BR": stateName = "Bihar"
          break;
        case "CG": stateName = "Chhattisgarh"
          break; 
        case "GA": stateName = "Goa"
          break;     
        case "GJ": stateName = "Gujarat"
          break;     
        case "HR": stateName = "Haryana"
          break;     
        case "HP": stateName = "Himachal Pradesh"
          break;               
        case "JK": stateName = "Jammu and Kashmir"
          break;               
        case "JH": stateName = "Jharkhand"
          break;     
        case "KA": stateName = "Karnataka"
          break;    
        case "KL": stateName = "Kerala"
          break;    
        case "MP": stateName = "Madhya Pradesh"
          break;      
        case "MH": stateName = "Maharashtra"
          break;             
        case "MN": stateName = "Manipur"
          break;         
        case "ML": stateName = "Meghalaya"
          break;                 
        case "MZ": stateName = "Mizoram"
          break;                 
        case "NL": stateName = "Nagaland"
          break;   
        case "OR": stateName = "Orissa"
          break;   
        case "PB": stateName = "Punjab"
          break;   
        case "RJ": stateName = "Rajasthan"
          break; 
        case "SK": stateName = "Sikkim"
          break; 
        case "TN": stateName = "Tamil Nadu"
          break; 
        case "TR": stateName = "Tripura"
          break; 
        case "UK": stateName = "Uttarakhand"
          break; 
        case "UP": stateName = "Uttar Pradesh"
          break; 
        case "UP": stateName = "Uttar Pradesh"
          break; 
        case "WB": stateName = "West Bengal"
          break; 
        case "TN": stateName = "Tamil Nadu"
          break; 
        case "TR": stateName = "Tripura"
          break;  
        case "AN": stateName = "Andaman and Nicobar"
          break;  
        case "CH": stateName = "Chandigarh"
          break;  
        case "DH": stateName = "Dadra and Nagar Haveli"
          break;    
        case "DD": stateName = "Daman and Diu"
          break;    
        case "DL": stateName = "Delhi"
          break;    
        case "LD": stateName = "Lakshadweep"
          break;    
        case "PY": stateName = "Pondicherry"
          break;                          
        default:
         stateName = "India";
      }

      mapAction.setMapSelectedState(stateName);
      } 

      const userDetails = JSON.parse(localStorage.getItem("userDetails"));
      if (userDetails) {
        const token = userDetails.token;
        axios.defaults.headers.common['Authorization'] = 'Bearer '+ token;
        axios.get("/api/candidatemaster/get/one/"+userDetails.candidate_id)
        .then(response=>{
       
          this.setState({
              profileCompletion     : response.data.profileCompletion
          })
          var userDetails = this.props.userDetails;
          userDetails.profileCompletion = response.data.profileCompletion;

          mapAction.setUserDetails(userDetails);
        })
        .catch(error=>{
          if(error.message === "Request failed with status code 401"){
                var userDetails =  localStorage.removeItem("userDetails");
                localStorage.clear();

                Swal.fire({title  : ' ',
                          html    : "Your session is expired! You need to login again. "+"<br>"+" Click OK to go to Login Page",
                          text    :  "" })
                    .then(okay => {
                      if (okay) { 
                        var userDetails = {
                          loggedIn    : false,
                          username  :"",  
                          firstName   : "", 
                          lastName    : "", 
                          email     : "",
                          phone     : "", 
                          user_id     : "",
                          roles     : [],
                          token     : "", 
                          gender    : "", 
                          profilePicture : "",
                          candidate_id: "",
                          profileCompletion : 0
                        }
                      mapAction.setUserDetails(userDetails);
                      document.getElementById("loginbtndiv").click();
                      }
                    });
              }else{
                
                Swal.fire("", "Error while getting data", "");
              }
         })
      }
      


        
    }
  handleOpenModal () {
      this.setState({ showModal: true });
    }
    
  handleCloseModal () {
      this.setState({ showModal: false });
  }
    asideBar(event){

    if(this.state.asideDisplay==="-600px"){
  
      this.setState({
      asideDisplay  : "15px",
      })
    }
    else{
      this.setState({
      asideDisplay  : "-600px",
      })
    }
  }

  logout() {
    
        var userDetails = localStorage.removeItem("userDetails");
        //alert()
        if (userDetails !== null && userDetails !== "undefined") {
            this.setState({
                loggedIn: false
            })
        }
        window.location.href = "/";
        //this.props.history.push("/")
  }

  ShowResetPass(event){
    event.preventDefault();
    var {mapAction} = this.props;

    mapAction.setSelectedModal("resetpassword");
  }
  


    render(){
     
    //console.log(window.location.pathname.split("/"))
    // console.log(window.location.pathname.split("/")[6])
    const selectedState = this.props.selectedState;
    
    if (this.props.userDetails.loggedIn) {    
      return(
        <nav className=" navbar ">
          
            <div className="col-12 FunctionalHeaderWrapper">
              <div className="row">
                  <div className="col-2 col-sm-2 col-md-1 col-lg-1 col-xl-1">
                    <div className="iconHeader">
                      <a href="/">
                        <img src="/images/1.png" alt="icon"  className="iIcon"/>
                      </a>
                    </div>
                  </div>

                  {window.location.pathname.split("/")[3] == "state" ? (
                    <div className="breadCrumbHeader col-3 col-sm-3 col-md-5 col-lg-3 col-xl-3">
                      <ul className="breadCrumbInner">
                        <li className="breadCrumbInnerli">
                          <a href="/">India</a>
                        </li>
                        {window.location.pathname.split("/")[4] != "all" ? (
                          <li
                            className={
                              window.location.pathname.split("/")[3] == "state" &&
                              window.location.pathname.split("/")[6] != "all"
                                ? "breadCrumbInnerli"
                                : "breadCrumbInnerli selectedState"
                            }
                          >
                            <a
                              href={
                                "/country/" +
                                window.location.pathname.split("/")[2] +
                                "/state/" +
                                window.location.pathname.split("/")[4] +
                                "/city/all/industry/" +
                                window.location.pathname.split("/")[8] +
                                "/" +
                                window.location.pathname.split("/")[9] +
                                "/function/" +
                                window.location.pathname.split("/")[11] +
                                "/" +
                                window.location.pathname.split("/")[12] +
                                "/subfunction/" +
                                window.location.pathname.split("/")[14] +
                                "/" +
                                window.location.pathname.split("/")[15]
                              }
                            >
                              {selectedState}
                            </a>
                          </li>
                        ) : null}
                        {window.location.pathname.split("/")[4] != "all" &&
                        window.location.pathname.split("/")[6] != "all" ? (
                          <li className="breadCrumbInnerli selectedState">
                            <a
                              href={
                                "/country/" +
                                window.location.pathname.split("/")[2] +
                                "/state/" +
                                window.location.pathname.split("/")[4] +
                                "/city/" +
                                window.location.pathname.split("/")[6] +
                                "/industry/" +
                                window.location.pathname.split("/")[8] +
                                "/" +
                                window.location.pathname.split("/")[9] +
                                "/function/" +
                                window.location.pathname.split("/")[11] +
                                "/" +
                                window.location.pathname.split("/")[12] +
                                "/subfunction/" +
                                window.location.pathname.split("/")[14] +
                                "/" +
                                window.location.pathname.split("/")[15]
                              }
                            >
                              {window.location.pathname.split("/")[6]}
                            </a>
                          </li>
                        ) : null}
                      </ul>
                    </div>
                  ) : (
                    <div className="breadCrumbHeader col-3  col-sm-3 col-md-5 col-lg-3 col-xl-3"></div>
                  )}

                  <div className="FunctionWiseTitle  d-none d-lg-block  col-lg-4 col-xl-4"></div>

                  <div className="rightFunctionHeader col-7 col-sm-7 col-md-6 col-lg-4 col-xl-4">
                    <div className="row">
                      <div className="rightFunctionHeader1 col-7 col-sm-7 col-md-7 col-lg-7 col-xl-7">
                        <div className="row">
                          <div className="rightFunctionHeader1 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 pull-right">
                            <div className="rightFunctionHeader1CityJobs">
                              {window.location.pathname.split("/")[0] == "" &&
                              window.location.pathname.split("/")[3] != "state" ? (
                                <div className="cityNameHeader">{"India"}</div>
                              ) : null}
                              {window.location.pathname.split("/")[3] == "state" &&
                              window.location.pathname.split("/")[6] == "all" ? (
                                <div className="cityNameHeader">
                                  {selectedState && selectedState != ""
                                    ? selectedState
                                    : "India"}
                                </div>
                              ) : null}
                              {window.location.pathname.split("/")[3] == "state" &&
                              window.location.pathname.split("/")[6] != "all" ? (
                                <div className="cityNameHeader">
                                  {window.location.pathname.split("/")[6]}
                                </div>
                              ) : null}

                              <div className="cityJobsHeader">
                                {this.props.jobCount ? this.props.jobCount : 0}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="rightFunctionHeader2 col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                        <div className="row">
                          <div className="headerMenu2 col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                            <div className="headerMenu1">
                              <FontAwesomeIcon icon={["fas", "bell"]} />
                            </div>
                          </div>

                          <div className="headerMenu2 col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                            <div
                              className="headerMenu11"
                              onClick={this.userMenuToggle.bind(this)}
                            >
                              {this.props.userDetails.profilePicture === undefined ||
                              this.props.userDetails.profilePicture === null ? (
                                <FontAwesomeIcon icon={["fas", "user"]} />
                              ) : this.props.userDetails.profilePicture.length > 0 ? (
                                <img
                                  src={this.props.userDetails.profilePicture}
                                  alt="icon"
                                  className="classIcon"
                                />
                              ) : this.props.userDetails.gender == "female" ? (
                                <img src="/images/f.png" alt="icon" className="classIcon" />
                              ) : this.props.userDetails.gender == "male" ? (
                                <img src="/images/m.png" alt="icon" className="classIcon" />
                              ) : (
                                <FontAwesomeIcon icon={["fas", "user"]} />
                              )}
                            </div>
                          </div>

                          <div className="headerMenu2 col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                            <div className="headerMenu1" onClick={this.asideBar.bind(this)}>
                              <FontAwesomeIcon icon={["fas", "bars"]} />
                            </div>
                          </div>
                        </div>

                        <div
                          className="functionalbarsToggel"
                          id="functionalbarsToggel"
                          style={{ top: this.state.asideDisplay }}
                        >
                          <div className="functionalbarsCross col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <span
                              className="functionalnotificationMessegeCross"
                              id="closeAsidebarButton"
                              onClick={this.asideBar.bind(this)}
                            >
                              {" "}
                              X{" "}
                            </span>
                          </div>
                          <div className="functionalbarsItem col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <a href="/search-jobs" style={{ color: "#fff" }}>
                              <span className="functionalnotificationMessegeText">Jobs </span>
                            </a>
                          </div>
                          <div className="functionalbarsItem col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <span className="functionalnotificationMessegeText">Companies</span>
                          </div>
                          <div className="functionalbarsItem col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <span className="functionalnotificationMessegeText">
                              Recruiters
                            </span>
                          </div>
                          <div className="functionalbarsItem col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <span className="functionalnotificationMessegeText">About Us</span>
                          </div>

                          <div className="functionalbarsItem col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <span className="functionalnotificationMessegeText">
                              Contact Us
                            </span>
                          </div>
                        </div>

                        {/*<div className="modal" id="confirmOTPModal" role="dialog" tabIndex="-1">
                                <div className="modal-dialog  modal-lg">
                                  <div className="modal-body">
                                      <button type="button" className="close" id="closeModalButton" data-dismiss="modal">&times;</button>
                                      <section className="OTPSentWrapper row">
                                            {this.props.selectedModal == "confirmotp" ? <ConfirmOtp/> : null }
                                            {this.props.selectedModal == "changepassword" ? <ChangePassword/> : null }
                                            
                                      </section>
                                  </div>
                                </div>
                              </div>*/}
                        

                        <div
                          className="modal"
                          id="resetPasswordModal"
                          role="dialog"
                          tabIndex="-1"
                        >
                          <div className="modal-dialog  modal-lg">
                            <div className="modal-body">
                              <button
                                type="button"
                                className="close"
                                id="closeModalButton"
                                data-dismiss="modal"
                              >
                                &times;
                              </button>
                              <section className="OTPSentWrapper row">
                                <ChangePassword />
                              </section>
                            </div>
                          </div>
                        </div>

                        <div
                          className="barsToggel pull-right"
                          id="barsToggel"
                          style={{ display: this.state.userMenu }}
                        >
                          <div className="menuProfile col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <div className="menuProfilePicture">
                              {this.props.userDetails.profilePicture === undefined ||
                              this.props.userDetails.profilePicture === null ? (
                                <FontAwesomeIcon icon={["far", "user"]} />
                              ) : this.props.userDetails.profilePicture.length > 0 ? (
                                <img
                                  src={this.props.userDetails.profilePicture}
                                  alt="icon"
                                  className="menuProfilePictureIcon"
                                />
                              ) : this.props.userDetails.gender == "female" ? (
                                <img
                                  src="/images/f.png"
                                  alt="icon"
                                  className="menuProfilePictureIcon"
                                />
                              ) : this.props.userDetails.gender == "male" ? (
                                <img
                                  src="/images/m.png"
                                  alt="icon"
                                  className="menuProfilePictureIcon"
                                />
                              ) : (
                                <FontAwesomeIcon icon={["fas", "user"]} />
                              )}
                            </div>
                            <a href={"/profile/" + this.props.userDetails.candidate_id}>
                              <div className="menuProfileName col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                {this.props.userDetails.firstName} &nbsp;
                                {this.props.userDetails.lastName}
                              </div>
                            </a>

                            <div className="menuProfileEmail col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              {this.props.userDetails.email}
                            </div>
                          </div>

                          <a href="/basic-info">
                            <div className="notificationMessege col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <i className="fa fa-user-o"></i>
                              <span className="notificationMessegeText">
                                Complete Your Profile (
                                {this.props.userDetails.profileCompletion}%)
                              </span>
                            </div>
                          </a>
                          <a href="/applied-jobs">
                            <div className="notificationMessege col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <i className="fa fa-briefcase"></i>
                              <span className="notificationMessegeText">Applied Jobs</span>
                            </div>
                          </a>
                          <a href="/wishlist">
                            <div className="notificationMessege col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                              <i className="fa fa-heart"></i>
                              <span className="notificationMessegeText">Wishlist Jobs</span>
                            </div>
                          </a>
                          {/*<a href={"/profile/"+this.props.userDetails.candidate_id}>

                                      <div className="notificationMessege col-lg-12">
                                      <i class="fa fa-eye"></i>
                                        <span className="notificationMessegeText">View Profiles</span>
                                      </div></a>*/}

                          {/*<a href={"/reset-pwd/"+this.props.userDetails.candidate_id}><div className="notificationMessege col-lg-12">
                                        <span className="notificationMessegeText">Reset Password</span>
                                      </div></a>*/}

                          <div
                            className="notificationMessege col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                            id="changepassworddiv"
                            data-toggle="modal"
                            data-target="#resetPasswordModal"
                          >
                            <i className="fa fa-key"></i>
                            <span className="notificationMessegeText">Change Password</span>
                          </div>

                          <div className="menuProfileSignOut col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                            <a href={"/profile/" + this.props.userDetails.candidate_id}>
                              <span className="myProfileButton col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">My Profile</span>
                            </a>
                            <span
                              className="signOutButton col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6"
                              onClick={this.logout.bind(this)}
                            >
                              Sign Out
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>  
            </div> 
         
        </nav>

        );
    }


    else{
       return(
          <nav className="navbar FunctionalHeaderWrapper container-fluid">
            <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1">
              <div className="iconHeader">
                <a href="/">
                  <img src="/images/1.png" alt="icon"  className="iIcon" />
                </a>
              </div>
            </div>
            {window.location.pathname.split("/")[3] == "state" ? (
              <div className="breadCrumbHeader col-4 col-sm-4 col-md-4 col-lg-3 col-xl-3">
                <ul className="breadCrumbInner">
                  <li className="breadCrumbInnerli">
                    <a href="/">India</a>
                  </li>
                  {window.location.pathname.split("/")[4] != "all" ? (
                    <li
                      className={
                        window.location.pathname.split("/")[3] == "state" &&
                        window.location.pathname.split("/")[6] != "all"
                          ? "breadCrumbInnerli"
                          : "breadCrumbInnerli selectedState"
                      }
                    >
                      <a
                        href={
                          "/country/" +
                          window.location.pathname.split("/")[2] +
                          "/state/" +
                          window.location.pathname.split("/")[4] +
                          "/city/all/industry/" +
                          window.location.pathname.split("/")[8] +
                          "/" +
                          window.location.pathname.split("/")[9] +
                          "/function/" +
                          window.location.pathname.split("/")[11] +
                          "/" +
                          window.location.pathname.split("/")[12] +
                          "/subfunction/" +
                          window.location.pathname.split("/")[14] +
                          "/" +
                          window.location.pathname.split("/")[15]
                        }
                      >
                        {selectedState}
                      </a>
                    </li>
                  ) : null}
                  {window.location.pathname.split("/")[4] != "all" &&
                  window.location.pathname.split("/")[6] != "all" ? (
                    <li className="breadCrumbInnerli selectedState">
                      <a
                        href={
                          "/country/" +
                          window.location.pathname.split("/")[2] +
                          "/state/" +
                          window.location.pathname.split("/")[4] +
                          "/city/" +
                          window.location.pathname.split("/")[6] +
                          "/industry/" +
                          window.location.pathname.split("/")[8] +
                          "/" +
                          window.location.pathname.split("/")[9] +
                          "/function/" +
                          window.location.pathname.split("/")[11] +
                          "/" +
                          window.location.pathname.split("/")[12] +
                          "/subfunction/" +
                          window.location.pathname.split("/")[14] +
                          "/" +
                          window.location.pathname.split("/")[15]
                        }
                      >
                        {window.location.pathname.split("/")[6]}
                      </a>
                    </li>
                  ) : null}
                </ul>
              </div>
            ) : (
              <div className="breadCrumbHeader col-4 col-sm-4 col-md-4 col-lg-3 col-xl-3"></div>
            )}

            <div className="FunctionWiseTitle col-1 col-sm-1 col-md-1 col-lg-4 col-xl-4"></div>

            <div className="rightFunctionHeader col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
              <div className="row">
                <div className="rightFunctionHeader1 col-7 col-sm-7 col-md-7 col-lg-7 col-xl-7">
                  <div className="row">
                    <div className="rightFunctionHeader1 col-12  pull-right">
                      <div className="rightFunctionHeader1CityJobs">
                        {window.location.pathname.split("/")[0] == "" &&
                        window.location.pathname.split("/")[3] != "state" ? (
                          <div className="cityNameHeader">{"India"}</div>
                        ) : null}
                        {window.location.pathname.split("/")[3] == "state" &&
                        window.location.pathname.split("/")[6] == "all" ? (
                          <div className="cityNameHeader">
                            {selectedState && selectedState != ""
                              ? selectedState
                              : "India"}
                          </div>
                        ) : null}
                        {window.location.pathname.split("/")[3] == "state" &&
                        window.location.pathname.split("/")[6] != "all" ? (
                          <div className="cityNameHeader">
                            {window.location.pathname.split("/")[6]}
                          </div>
                        ) : null}

                        <div className="cityJobsHeader">
                          {this.props.jobCount ? this.props.jobCount : 0}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rightFunctionHeader2 col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                  <div className="row">
                    <div className="headerMenu2 col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                      {/*<div className="headerMenu11" >
                              <FontAwesomeIcon icon={['fas', 'bell']} />
                            </div>*/}
                    </div>
                    <div
                      className="headerMenu2 col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4"
                      id="loginbtndiv"
                      data-toggle="modal"
                      data-target="#loginModal"
                    >
                      <div className="headerMenu11">
                        <FontAwesomeIcon icon={["fas", "user"]} />
                      </div>
                    </div>
                    <div className="headerMenu2 col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                      <div className="headerMenu1" onClick={this.asideBar.bind(this)}>
                        <FontAwesomeIcon icon={["fas", "bars"]} />
                      </div>
                    </div>
                  </div>

                  <div
                    className="functionalbarsToggel"
                    id="functionalbarsToggel"
                    style={{ top: this.state.asideDisplay }}
                  >
                    <div className="functionalbarsCross col-12 ">
                      <span
                        className="functionalnotificationMessegeCross"
                        id="closeAsidebarButton"
                        onClick={this.asideBar.bind(this)}
                      >
                        {" "}
                        X{" "}
                      </span>
                    </div>

                    <div className="functionalbarsItem col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <span className="functionalnotificationMessegeText">Jobs </span>
                    </div>
                    <div className="functionalbarsItem col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <span className="functionalnotificationMessegeText">Companies</span>
                    </div>
                    <div className="functionalbarsItem col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <span className="functionalnotificationMessegeText">
                        Recruiters
                      </span>
                    </div>
                    <div className="functionalbarsItem col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <span className="functionalnotificationMessegeText">About Us</span>
                    </div>

                    <div className="functionalbarsItem col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <span className="functionalnotificationMessegeText">
                        Contact Us
                      </span>
                    </div>
                  </div>

                  <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                    aria-hidden="true">
                    <div className="row">
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-body">
                          <button
                            type="button"
                            className="close closebtnmodal"
                            id="closeModalButton"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            &times;
                          </button>
                          <section className="OTPSentWrapper">
                            {this.props.selectedModal == "login" ? <LoginForm /> : null}
                            {this.props.selectedModal == "signup" ? <SignUp /> : null}
                            {this.props.selectedModal == "forgotpassword" ? (
                              <ForgotPassword />
                            ) : null}
                            {this.props.selectedModal == "confirmotp" ? (
                              <ConfirmOtp />
                            ) : null}
                            {this.props.selectedModal == "resetpassword" ? (
                              <ResetPassword />
                            ) : null}
                            {this.props.selectedModal == "changepassword" ? (
                              <ChangePassword />
                            ) : null}
                          </section>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                  {/*<div
                    className="modal fade col-md-12"
                    id="loginModal"
                    role="dialog"
                    tabIndex="-1" aria-hidden="true"
                  >
                    <div className="">
                      <div className="modal-dialog modal-lg">
                      <div class="modal-content">
                        <div className="modal-body">
                          <button
                            type="button"
                            className="close"
                            id="closeModalButton"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            &times;
                          </button>
                          <section className="OTPSentWrapper ">
                            {this.props.selectedModal == "login" ? <LoginForm /> : null}
                            {this.props.selectedModal == "signup" ? <SignUp /> : null}
                            {this.props.selectedModal == "forgotpassword" ? (
                              <ForgotPassword />
                            ) : null}
                            {this.props.selectedModal == "confirmotp" ? (
                              <ConfirmOtp />
                            ) : null}
                            {this.props.selectedModal == "resetpassword" ? (
                              <ResetPassword />
                            ) : null}
                            {this.props.selectedModal == "changepassword" ? (
                              <ChangePassword />
                            ) : null}
                          </section>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>*/}

                  <div
                    className="barsToggel pull-right"
                    id="barsToggel"
                    style={{ display: this.state.userMenu }}
                  >
                    <div className="notificationMessege col-12 ">
                      <FontAwesomeIcon icon="search" />
                      <span className="notificationMessegeText">Employer Settings</span>
                    </div>
                    <a href="/job-list">
                      <div className="notificationMessege col-12 ">
                        <FontAwesomeIcon icon="briefcase" />
                        <span className="notificationMessegeText">Posted Jobs</span>
                      </div>
                    </a>
                    <div className="notificationMessege col-12 ">
                      <FontAwesomeIcon icon="users" />
                      <span className="notificationMessegeText">Recruiters</span>
                    </div>
                    <div className="notificationMessege col-12 ">
                      <FontAwesomeIcon icon="search" />
                      <span className="notificationMessegeText">Services</span>
                    </div>
                    <div className="notificationMessege col-12 ">
                      <span className="notificationMessegeText">About Us</span>
                    </div>
                    <div className="notificationMessege col-12 ">
                      <span className="notificationMessegeText">Contact Us</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>

        );
    }
  }
}

const mapStateToProps = (state)=>{

    return {
        selectedState  : state.selectedState, selectedModal  : state.selectedModal,
        selector       : state.selector,
        jobCount       : state.jobCount,
        userDetails     : state.userDetails
    }
}
const mapDispatchToProps = (dispatch) => ({
  mapAction :  bindActionCreators(mapActionCreator, dispatch)
}) 
export default connect(mapStateToProps,mapDispatchToProps) ((Header) );

