import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../header/Header.css';
import LoginForm from '../../systemSecurity/Login.js';
import SignUp from '../../systemSecurity/SignUp.js';
import ForgotPassword from '../../systemSecurity/ForgotPassword.js';
import ConfirmOtp from '../../systemSecurity/ConfirmOtp.js';
import ResetPass from '../../systemSecurity/ResetPassword.js'
import {connect}            from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../common/actions/index';


class Header extends Component{
  constructor(props){
    super(props);
    this.state={
      showLoginModal    : false,
      asideDisplay      : "-600px",
      userMenu          : "none",
     
      //selector            : {},
    }
    this.handleOpenModal  = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
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
      mapAction.jobCount(this.props.selector);

      if (window.location.pathname.split("/")[1] == "state" ) {
        var stateName = "";
          //selector.stateCode = window.location.pathname.split("/")[2] 
          switch(window.location.pathname.split("/")[2]) {
        case "AP": stateName = "Andhra Pradesh"
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


    render(){
    console.log(window.location.pathname.split("/"))
    const selectedState = this.props.selectedState;
    //console.log(this.props.selector)
    if (this.props.userDetails.loggedIn) {    
      return(
        <nav className="navbar FunctionalHeaderWrapper container-fluid">
        <div className="iconHeader col-lg-1">
            <a href="/"><img src="/images/1.png" alt="icon" /></a>
        </div>

        {
          window.location.pathname.split("/")[1] == "state" ? 
          <div className="breadCrumbHeader col-lg-2">
          <ul className="breadCrumbInner">
              <li className="breadCrumbInnerli"><a href="/">India</a></li>
              <li className= {window.location.pathname.split("/")[3] ? "breadCrumbInnerli" : "breadCrumbInnerli selectedState"}>
              <a href={"/state/"+window.location.pathname.split("/")[2]}>{selectedState}</a>
              </li>  
              { window.location.pathname.split("/")[3] ? 
              <li className="breadCrumbInnerli selectedState">
              <a href={"/state/"+window.location.pathname.split("/")[2]+"/"+window.location.pathname.split("/")[3] }>{window.location.pathname.split("/")[3] }</a>
              </li>  : null }  
          </ul>
          </div>
          : <div className="breadCrumbHeader col-lg-2"></div>
        }

              <div className="FunctionWiseTitle col-lg-5">
               
              </div>

          <div className="rightFunctionHeader col-lg-4">
            <div className="row">
            <div className="rightFunctionHeader1 col-lg-7">
              <div className="row">
              <div className="rightFunctionHeader1 col-lg-12 pull-right">
                <div className="rightFunctionHeader1CityJobs">

                {
                 window.location.pathname.split("/")[0] == "" && window.location.pathname.split("/")[1] != "state"  ?
                  <div className="cityNameHeader">{"India"}
                  </div> 
                 : null 
                }
                {
                 window.location.pathname.split("/")[1] == "state" && !window.location.pathname.split("/")[3] ?
                  <div className="cityNameHeader">{selectedState && selectedState != "" ? selectedState : "India"}
                  </div> 
                 : null 
                }
                {
                 window.location.pathname.split("/")[1] == "state" && window.location.pathname.split("/")[3] ?
                  <div className="cityNameHeader">{window.location.pathname.split("/")[3]}
                  </div> 
                 : null 
                }  

                <div className="cityJobsHeader">{this.props.jobCount[0] ? this.props.jobCount[0].jobCount : 0}
                </div>              
              
                </div>
              </div>
              </div>
            </div>

            <div className="rightFunctionHeader2 col-lg-5">
              <div className="row">

                 <div className="headerMenu2 col-lg-4">
                  <div className="headerMenu11" >
                    <FontAwesomeIcon icon={['fas', 'bell']} />
                  </div>
                </div>
                
                <div className="headerMenu2 col-lg-4">
                  <div className="headerMenu11" onClick={this.userMenuToggle.bind(this)}>
                    <FontAwesomeIcon icon={['fas', 'user']} />
                  </div>
                </div>

                <div className="headerMenu2 col-lg-4">
                <div className="headerMenu1" onClick={this.asideBar.bind(this)}>
                    <img src="/images/List_View.png" alt="icon" />
                  </div>
                </div>
              </div>


              <div className="functionalbarsToggel" id="functionalbarsToggel" style={{top:this.state.asideDisplay}}>

                <div className="functionalbarsCross col-lg-12">
                  <span className="functionalnotificationMessegeCross" id="closeAsidebarButton" onClick={this.asideBar.bind(this)}> X </span>
                </div>

                <div className="functionalbarsItem col-lg-12">
                  <a href="/search-jobs" style={{color:"#fff"}}>
                  <span className="functionalnotificationMessegeText">Jobs </span></a>
                </div>
                <div className="functionalbarsItem col-lg-12">
                  <span className="functionalnotificationMessegeText">Companies</span>
                </div>
                <div className="functionalbarsItem col-lg-12">
                  
                  <span className="functionalnotificationMessegeText">Recruiters</span>
                  
                </div>
                <div className="functionalbarsItem col-lg-12">
                  
                  <span className="functionalnotificationMessegeText">About Us</span>
                  
                </div>

                <div className="functionalbarsItem col-lg-12">
                  
                  <span className="functionalnotificationMessegeText">Contact Us</span>
                  
                </div>
                
               

              </div>

              <div className="modal" id="loginModal" role="dialog" tabIndex="-1">
                <div className="modal-dialog  modal-lg">
                  <div className="modal-body">
                      <button type="button" className="close" id="closeModalButton" data-dismiss="modal">&times;</button>
                      <section className="OTPSentWrapper row">
                            {this.props.selectedModal == "login" ? <LoginForm/> : null }
                            {this.props.selectedModal == "signup" ? <SignUp/> : null }
                            {this.props.selectedModal == "forgotpassword" ? <ForgotPassword/> : null }
                            {this.props.selectedModal == "confirmotp" ? <ConfirmOtp/> : null }
                            {this.props.selectedModal == "resetpass" ? <ResetPass/> : null }
                      </section>
                  </div>
                </div>
              </div>

               <div className="barsToggel pull-right" id="barsToggel" style={{display:this.state.userMenu}}>
                     
                      <a href="/basic-info"><div className="notificationMessege col-lg-12">
                        <span className="notificationMessegeText">Complete Your Profile</span>
                      </div></a>
                      <a href="/applied-jobs"><div className="notificationMessege col-lg-12">
                        <FontAwesomeIcon icon="briefcase" />
                        <span className="notificationMessegeText">Applied Jobs</span>
                      </div></a>
                      <a href={"/profile/"+this.props.userDetails.candidate_id}><div className="notificationMessege col-lg-12">
                        <span className="notificationMessegeText">View Profiles</span>
                      </div></a>
                     {/* <div className="notificationMessege col-lg-12">
                        <FontAwesomeIcon icon="search" />
                        <span className="notificationMessegeText">Services</span>
                      </div>
                      <div className="notificationMessege col-lg-12">
                        <span className="notificationMessegeText">About Us</span>
                      </div>
                      <div className="notificationMessege col-lg-12">
                        <span className="notificationMessegeText">Contact Us</span>
                      </div>*/}
                      <div className="notificationMessege col-lg-12 ">
                          <span className="signOutButton" onClick={this.logout.bind(this)}>Sign Out</span>
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
        <div className="iconHeader col-lg-1">
            <a href="/"><img src="/images/1.png" alt="icon" /></a>
        </div>
        {
          window.location.pathname.split("/")[1] == "state" ? 
          <div className="breadCrumbHeader col-lg-2">
          <ul className="breadCrumbInner">
              <li className="breadCrumbInnerli"><a href="/">India</a></li>
              <li className= {window.location.pathname.split("/")[3] ? "breadCrumbInnerli" : "breadCrumbInnerli selectedState"}>
              <a href={"/state/"+window.location.pathname.split("/")[2]}>{selectedState}</a>
              </li>  
              { window.location.pathname.split("/")[3] ? 
              <li className="breadCrumbInnerli selectedState">
              <a href={"/state/"+window.location.pathname.split("/")[2]+"/"+window.location.pathname.split("/")[3] }>{window.location.pathname.split("/")[3] }</a>
              </li>  : null }  
          </ul>
          </div>
          : <div className="breadCrumbHeader col-lg-2"></div>
        }
        

              <div className="FunctionWiseTitle col-lg-5">
               
              </div>

          <div className="rightFunctionHeader col-lg-4">
            <div className="row">
            <div className="rightFunctionHeader1 col-lg-7">
              <div className="row">
              <div className="rightFunctionHeader1 col-lg-12 pull-right">
                <div className="rightFunctionHeader1CityJobs">
                <div className="cityNameHeader">{selectedState && selectedState != "" ? selectedState : "India"}
                </div>  

                <div className="cityJobsHeader">{this.props.jobCount[0] ? this.props.jobCount[0].jobCount : 0}
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
               <div className="headerMenu2 col-lg-4" id="loginbtndiv" data-toggle="modal" data-target="#loginModal">
                  <div className="headerMenu11">
                    <FontAwesomeIcon icon={['fas', 'user']} />
                  </div>
                </div>
                <div className="headerMenu2 col-lg-4">
                <div className="headerMenu1" onClick={this.asideBar.bind(this)}>
                    <img src="/images/List_View.png" alt="icon" />
                  </div>
                </div>
              </div>


              <div className="functionalbarsToggel" id="functionalbarsToggel" style={{top:this.state.asideDisplay}}>

                <div className="functionalbarsCross col-lg-12">
                  
                  <span className="functionalnotificationMessegeCross" id="closeAsidebarButton" onClick={this.asideBar.bind(this)}> X </span>
                </div>


                <div className="functionalbarsItem col-lg-12">
                  
                  <span className="functionalnotificationMessegeText">Jobs </span>
                </div>
                <div className="functionalbarsItem col-lg-12">
                  
                  <span className="functionalnotificationMessegeText">Companies</span>
                
                </div>
                <div className="functionalbarsItem col-lg-12">
                  
                  <span className="functionalnotificationMessegeText">Recruiters</span>
                  
                </div>
                <div className="functionalbarsItem col-lg-12">
                  
                  <span className="functionalnotificationMessegeText">About Us</span>
                  
                </div>

                <div className="functionalbarsItem col-lg-12">
                  
                  <span className="functionalnotificationMessegeText">Contact Us</span>
                  
                </div>
                
                

              </div>

              <div className="modal" id="loginModal" role="dialog" tabIndex="-1">
                <div className="modal-dialog  modal-lg">
                  <div className="modal-body">
                      <button type="button" className="close" id="closeModalButton" data-dismiss="modal">&times;</button>
                      <section className="OTPSentWrapper row">
                            {this.props.selectedModal == "login" ? <LoginForm/> : null }
                            {this.props.selectedModal == "signup" ? <SignUp/> : null }
                            {this.props.selectedModal == "forgotpassword" ? <ForgotPassword/> : null }
                            {this.props.selectedModal == "confirmotp" ? <ConfirmOtp/> : null }
                            {this.props.selectedModal == "resetpass" ? <ResetPass/> : null }
                      </section>
                  </div>
                </div>
              </div>

               <div className="barsToggel pull-right" id="barsToggel" style={{display:this.state.userMenu}}>
                     
                      <div className="notificationMessege col-lg-12">
                        <FontAwesomeIcon icon="search" />
                        <span className="notificationMessegeText">Employer Settings</span>
                      </div>
                      <a href="/job-list"><div className="notificationMessege col-lg-12">
                        <FontAwesomeIcon icon="briefcase" />
                        <span className="notificationMessegeText">Posted Jobs</span>
                      </div></a>
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
export default connect(mapStateToProps,mapDispatchToProps) (Header);