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
      user_id           :this.props.userDetails.user_id
     
      //selector            : {},
    }
    this.handleOpenModal  = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

 sendOTP(event) {

       console.log(this.props.userDetails.user_id);

        var formValues = {
           userid : this.state.user_id,

        }
            console.log(formValues+"mmllllllllllllllllllllll");

            $('.fullpageloader').show();
            axios.patch('/api/auth/patch/setotpusingID', formValues)
            .then((response)=>{
              
                console.log('sendOTP res===',response.data)
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
      console.log(this.props)
    //console.log(window.location.pathname.split("/"))
    // console.log(window.location.pathname.split("/")[6])
    const selectedState = this.props.selectedState;
    
    if (this.props.userDetails.loggedIn) {    
      return(
        <nav className="navbar FunctionalHeaderWrapper container-fluid">
            <div className="col-lg-1">
              <div className="iconHeader">
                <a href="/">
                  <img src="/images/1.png" alt="icon" />
                </a>
              </div>
            </div>

            {window.location.pathname.split("/")[3] == "state" ? (
              <div className="breadCrumbHeader col-lg-3">
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
              <div className="breadCrumbHeader col-lg-3"></div>
            )}

            <div className="FunctionWiseTitle col-lg-4"></div>

            <div className="rightFunctionHeader col-lg-4">
              <div className="row">
                <div className="rightFunctionHeader1 col-lg-7">
                  <div className="row">
                    <div className="rightFunctionHeader1 col-lg-12 pull-right">
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

                <div className="rightFunctionHeader2 col-lg-5">
                  <div className="row">
                    <div className="headerMenu2 col-lg-4">
                      <div className="headerMenu1">
                        <FontAwesomeIcon icon={["fas", "bell"]} />
                      </div>
                    </div>

                    <div className="headerMenu2 col-lg-4">
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

                    <div className="headerMenu2 col-lg-4">
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
                    <div className="functionalbarsCross col-lg-12">
                      <span
                        className="functionalnotificationMessegeCross"
                        id="closeAsidebarButton"
                        onClick={this.asideBar.bind(this)}
                      >
                        {" "}
                        X{" "}
                      </span>
                    </div>
                    <div className="functionalbarsItem col-lg-12">
                      <a href="/search-jobs" style={{ color: "#fff" }}>
                        <span className="functionalnotificationMessegeText">Jobs </span>
                      </a>
                    </div>
                    <div className="functionalbarsItem col-lg-12">
                      <span className="functionalnotificationMessegeText">Companies</span>
                    </div>
                    <div className="functionalbarsItem col-lg-12">
                      <span className="functionalnotificationMessegeText">
                        Recruiters
                      </span>
                    </div>
                    <div className="functionalbarsItem col-lg-12">
                      <span className="functionalnotificationMessegeText">About Us</span>
                    </div>

                    <div className="functionalbarsItem col-lg-12">
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
                    className="headerMenu2 col-lg-4"
                    id="loginbtndiv"
                    data-toggle="modal"
                    data-target="#loginModal"
                    style={{ display: "none" }}
                  >
                    <div className="headerMenu11">
                      <FontAwesomeIcon icon={["fas", "user"]} />
                    </div>
                  </div>
                  <div
                    className="modal col-lg-12"
                    id="loginModal"
                    role="dialog"
                    tabIndex="-1"
                  >
                    <div className="row">
                      <div className="modal-dialog  modal-lg ">
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
                            {this.props.selectedModal == "login" ? <LoginForm /> : null}
                          </section>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="barsToggel pull-right"
                    id="barsToggel"
                    style={{ display: this.state.userMenu }}
                  >
                    <div className="menuProfile col-lg-12">
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
                        <div className="menuProfileName col-lg-12">
                          {this.props.userDetails.firstName} &nbsp;
                          {this.props.userDetails.lastName}
                        </div>
                      </a>

                      <div className="menuProfileEmail col-lg-12">
                        {this.props.userDetails.email}
                      </div>
                    </div>

                    <a href="/basic-info">
                      <div className="notificationMessege col-lg-12">
                        <i className="fa fa-user-o"></i>
                        <span className="notificationMessegeText">
                          Complete Your Profile (
                          {this.props.userDetails.profileCompletion}%)
                        </span>
                      </div>
                    </a>
                    <a href="/applied-jobs">
                      <div className="notificationMessege col-lg-12">
                        <i className="fa fa-briefcase"></i>
                        <span className="notificationMessegeText">Applied Jobs</span>
                      </div>
                    </a>
                    <a href="/wishlist">
                      <div className="notificationMessege col-lg-12">
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
                      className="notificationMessege col-lg-12"
                      id="changepassworddiv"
                      data-toggle="modal"
                      data-target="#resetPasswordModal"
                    >
                      <i className="fa fa-key"></i>
                      <span className="notificationMessegeText">Change Password</span>
                    </div>

                    <div className="menuProfileSignOut col-lg-12 ">
                      <a href={"/profile/" + this.props.userDetails.candidate_id}>
                        <span className="myProfileButton col-lg-6">My Profile</span>
                      </a>
                      <span
                        className="signOutButton col-lg-6"
                        onClick={this.logout.bind(this)}
                      >
                        Sign Out
                      </span>
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
            <div className="col-lg-1">
              <div className="iconHeader">
                <a href="/">
                  <img src="/images/1.png" alt="icon" />
                </a>
              </div>
            </div>
            {window.location.pathname.split("/")[3] == "state" ? (
              <div className="breadCrumbHeader col-lg-3">
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
              <div className="breadCrumbHeader col-lg-3"></div>
            )}

            <div className="FunctionWiseTitle col-lg-4"></div>

            <div className="rightFunctionHeader col-lg-4">
              <div className="row">
                <div className="rightFunctionHeader1 col-lg-7">
                  <div className="row">
                    <div className="rightFunctionHeader1 col-lg-12 pull-right">
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

                <div className="rightFunctionHeader2 col-lg-5">
                  <div className="row">
                    <div className="headerMenu2 col-lg-4">
                      {/*<div className="headerMenu11" >
                              <FontAwesomeIcon icon={['fas', 'bell']} />
                            </div>*/}
                    </div>
                    <div
                      className="headerMenu2 col-lg-4"
                      id="loginbtndiv"
                      data-toggle="modal"
                      data-target="#loginModal"
                    >
                      <div className="headerMenu11">
                        <FontAwesomeIcon icon={["fas", "user"]} />
                      </div>
                    </div>
                    <div className="headerMenu2 col-lg-4">
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
                    <div className="functionalbarsCross col-lg-12">
                      <span
                        className="functionalnotificationMessegeCross"
                        id="closeAsidebarButton"
                        onClick={this.asideBar.bind(this)}
                      >
                        {" "}
                        X{" "}
                      </span>
                    </div>

                    <div className="functionalbarsItem col-lg-12">
                      <span className="functionalnotificationMessegeText">Jobs </span>
                    </div>
                    <div className="functionalbarsItem col-lg-12">
                      <span className="functionalnotificationMessegeText">Companies</span>
                    </div>
                    <div className="functionalbarsItem col-lg-12">
                      <span className="functionalnotificationMessegeText">
                        Recruiters
                      </span>
                    </div>
                    <div className="functionalbarsItem col-lg-12">
                      <span className="functionalnotificationMessegeText">About Us</span>
                    </div>

                    <div className="functionalbarsItem col-lg-12">
                      <span className="functionalnotificationMessegeText">
                        Contact Us
                      </span>
                    </div>
                  </div>

                  <div
                    className="modal col-lg-12"
                    id="loginModal"
                    role="dialog"
                    tabIndex="-1"
                  >
                    <div className="row">
                      <div className="modal-dialog  modal-lg ">
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

                  <div
                    className="barsToggel pull-right"
                    id="barsToggel"
                    style={{ display: this.state.userMenu }}
                  >
                    <div className="notificationMessege col-lg-12">
                      <FontAwesomeIcon icon="search" />
                      <span className="notificationMessegeText">Employer Settings</span>
                    </div>
                    <a href="/job-list">
                      <div className="notificationMessege col-lg-12">
                        <FontAwesomeIcon icon="briefcase" />
                        <span className="notificationMessegeText">Posted Jobs</span>
                      </div>
                    </a>
                    <div className="notificationMessege col-lg-12">
                      <FontAwesomeIcon icon="users" />
                      <span className="notificationMessegeText">Recruiters</span>
                    </div>
                    <div className="notificationMessege col-lg-12">
                      <FontAwesomeIcon icon="search" />
                      <span className="notificationMessegeText">Services</span>
                    </div>
                    <div className="notificationMessege col-lg-12">
                      <span className="notificationMessegeText">About Us</span>
                    </div>
                    <div className="notificationMessege col-lg-12">
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
  //console.log(state)
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

