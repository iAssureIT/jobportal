import React,{Component} from 'react';
import { FontAwesomeIcon }      from '@fortawesome/react-fontawesome';
import $ from 'jquery';
import axios from 'axios';
import jQuery from 'jquery';
import 'jquery-validation';
import Swal           from 'sweetalert2';
import { connect }        from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../actions/index';
import ResetPassword from '../../systemSecurity/ResetPassword.js'
import './Header.css';

class Header extends Component{
  constructor(props){
    super(props);
    this.state={
      profileDisplay  : "none",
      asideDisplay  : "none",
      notificationDisplay  : "none",
      userDetails: {},
      company_id  : this.props.userDetails.company_id
    }
  }
  componentDidMount() {

    console.log('userDetails',this.props.userDetails,this.state.company_id)
    this.setState({userDetails : JSON.parse(localStorage.getItem("userDetails"))})
    
    var {mapAction} = this.props;
    mapAction.getSubscriptionDetails(this.props.userDetails.company_id)

    var selectedCompanyDetails = {
                                      company_id  : this.props.userDetails.company_id != "" ? this.props.userDetails.company_id : null,
                                      companyID   : this.props.userDetails.companyID != "" ? this.props.userDetails.companyID : null,
                                      companyName : this.props.userDetails.companyName,
                                      branch_id   : this.props.userDetails.branch_id,
                                      branchCode  : this.props.userDetails.branchCode == "" ? 0 : this.props.userDetails.branchCode,
                                      //locationType: this.state.locationType, 
                                      //role        : 'employer',
                                      //status      : 'unverified',        
                                      city        : this.props.userDetails.city,  
                                      stateName   : this.props.userDetails.stateName,
                                      stateCode   : this.props.userDetails.stateCode,
                                      country     : this.props.userDetails.country,
                                      countryCode : this.props.userDetails.countryCode,
                                  }
    mapAction.selectedCompanyDetails(selectedCompanyDetails)
                                  

  }
  profileInfo(event){

    if(this.state.profileDisplay==="none"){
  
      this.setState({
      profileDisplay  : "block",
      asideDisplay  : "none",
      notificationDisplay  : "none",
      })
    }
    else{
      this.setState({
      profileDisplay  : "none",
      })
    }
  }
  asideBar(event){

    if(this.state.asideDisplay==="none"){
  
      this.setState({
      asideDisplay  : "block",
      profileDisplay  : "none",
      notificationDisplay  : "none",
      })
    }
    else{
      this.setState({
      asideDisplay  : "none",
      })
    }
  }
  modalPopUp(event){
    Swal.fire("", "Complete Your Employer Details", "")
  }
  notificationBar(event){

    if(this.state.notificationDisplay==="none"){
  
      this.setState({
      notificationDisplay  : "block",
      profileDisplay  : "none",
      asideDisplay  : "none",
      })
    }
    else{
      this.setState({
      notificationDisplay  : "none",
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
  render(){
    
    var hascompany_Id = localStorage.getItem("company_Id");
  
    return(

        <div className="headerWrapper col-lg-12">
          <div className="row">
            <div className="headerLogoWrapper col-lg-8">
              <a href="/"><img src="/images/1.png" alt="ijobs logo"/></a>
            </div>
            <div className="headerMenuWrapper col-lg-4">
              <div className="row"> 
                <div className="headerJobWrapper" >
                  <div  style={{display: this.state.company_id ? "block":"none"}}>
                    <a href="/post-job"><div className="headerJob">
                      <i className="fa fa-user"></i>Post Job 
                    </div></a>
                  </div>
                </div>
                <div className="headerBellWrapper ">
                  <i className="fa fa-bell-o " onClick={this.notificationBar.bind(this)}></i>
                  <div className="headerBellbadge">1</div>
                  <div className="notificationBox" id="notificationBox" style={{display:this.state.notificationDisplay}}>
                    <div className="notificationCount col-lg-12">
                      15 Notification
                    </div>
                    <div className="notificationMessege col-lg-12">
                      <FontAwesomeIcon icon="envelope" />
                      <span className="notificationMessegeText">4 New Messages</span>
                      <span className="MessagesTime pull-right">2 Mins</span>
                    </div>
                    <div className="notificationMessege col-lg-12">
                      <FontAwesomeIcon icon="users" />
                      <span className="notificationMessegeText">8 job Request</span>
                      <span className="MessagesTime pull-right">2 Hours</span>
                    </div>
                    <div className="notificationMessege col-lg-12">
                      <FontAwesomeIcon icon="file-alt" />
                      <span className="notificationMessegeText">3 New Reports</span>
                      <span className="MessagesTime pull-right">2 Days</span>
                    </div>
                    <div className="notificationCount col-lg-12">
                      See All Notifications
                    </div>
                  </div>
                </div>
                <div className="headerProfileWrapper ">
                  <div className="headerProfileInfo">
                    <span className="headerProfileName">
                      Hello, {this.state.userDetails.firstName }
                    </span>
                    <img className="headerProfileImg" src='/images/profilelogo.jpeg' alt="logo" onClick={this.profileInfo.bind(this)} />
                    <i className="fa fa-caret-down profileDownArrow" onClick={this.profileInfo.bind(this)}></i>
                  </div>
                  <div className="signOutToggel" id="signOutToggel" style={{display:this.state.profileDisplay}}>
                    <div className="signOutToggelProfileImg">
                      <img src='/images/profilelogo.jpeg' alt="logo"  />
                    </div>
                    <div className="signOutToggelProfileName">
                       Hello, {this.state.userDetails.firstName }
                    </div>

                    
                    <a href={"/change-pwd/"+this.props.userDetails.user_id}><div className="changePassword col-lg-12">
                        <span>Reset Password</span>
                      </div></a>

                    <div className="signOutToggelButtons">
                      <div className="col-lg-5 pull-left">
                        <div className="row">
                          <a href={"/company-profile/"+this.props.userDetails.company_id} className="whitelink"><div className="signOutButton">Profile</div></a>
                        </div>
                      </div>
                      
                      <div className="col-lg-5 pull-right">
                        <div className="row">
                          <div className="signOutButton" onClick={this.logout.bind(this)}>Sign Out</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="headerToggelWrapper ">
                  <div className="headerToggel" onClick={this.asideBar.bind(this)}>
                    <FontAwesomeIcon icon="align-right" />
                  </div>
                </div>
                <div className="barsToggel pull-right" id="barsToggel" style={{display:this.state.asideDisplay}}>
                  
                  <a href={hascompany_Id ? "/corporate/basic-details/"+hascompany_Id : "/corporate/basic-details"}>
                  <div className="notificationMessege col-lg-12" >
                    <i className="fa fa-cog" aria-hidden="true"></i>
                    <span className="notificationMessegeText">Employer Settings</span>
                  </div></a>
                  <a href= "/subscribe-package">
                  <div className="notificationMessege col-lg-12" >
                    <i className="fa fa-credit-card" aria-hidden="true"></i>
                    <span className="notificationMessegeText">Package Subscription</span>
                  </div></a>
                  <a href={this.state.company_id?"/job-list":"/corporate/basic-details"}>
                    <div className="notificationMessege col-lg-12" onClick={!this.state.company_id  ? this.modalPopUp.bind(this) : null}>
                      <FontAwesomeIcon icon="briefcase" />
                      <span className="notificationMessegeText">Posted Jobs</span>
                    </div>
                  </a>
                  <a href={this.state.company_id?"/candidate-list":"/corporate/basic-details"}>
                    <div className="notificationMessege col-lg-12" onClick={!this.state.company_id ? this.modalPopUp.bind(this) : null}>
                      <FontAwesomeIcon icon="users" />
                      <span className="notificationMessegeText">Search Candidates</span>
                    </div>
                  </a>
                </div>
                
              </div>

            </div>
          </div>
        </div>



      );
  }
}

const mapStateToProps = (state)=>{
    return {
        selectedModal  : state.selectedModal,
        userDetails    : state.userDetails, subscriptionDetails   : state.subscriptionDetails 
    }
}
const mapDispatchToProps = (dispatch) => ({
  mapAction :  bindActionCreators(mapActionCreator, dispatch)
}) 

export default connect(mapStateToProps, mapDispatchToProps)(Header);
