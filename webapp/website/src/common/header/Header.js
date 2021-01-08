import React,{Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Header.css';
import {connect}            from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../common/actions/index';

class Header extends Component{
  constructor(props){
    super(props);
    this.state={
      profileDisplay        : "none",
      asideDisplay          : "-600px",
      notificationDisplay   : "none",
    }
  }
  componentDidMount() {
    
  }
  profileInfo(event){

    if(this.state.profileDisplay==="none"){
  
      this.setState({
      profileDisplay  : "block",
      })
    }
    else{
      this.setState({
      profileDisplay  : "none",
      })
    }
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
  notificationBar(event){

    if(this.state.notificationDisplay==="none"){
  
      this.setState({
      notificationDisplay  : "block",
      })
    }
    else{
      this.setState({
      notificationDisplay  : "none",
      })
    }
  }
  logout() {
        localStorage.removeItem("userDetails")
      
        window.location.href = "/";
        //this.props.history.push("/")
  }
  render(){
    return(
        <div className="headerWrapper col-lg-12">
          <div className="row">
            <div className="headerLogoWrapper col-lg-8">
              <a href="/"><img src="/images/1.png" alt="ijobs logo"/></a>
            </div>
            <div className="headerMenuWrapper col-lg-4">
              <div className="row"> 
                <div className="headerJobWrapper">
                  
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
                      Hello, {this.props.userDetails.firstName }
                    </span>
                    <img className="headerProfileImg" src='/images/40.png' alt="logo" onClick={this.profileInfo.bind(this)} />
                    <i className="fa fa-caret-down profileDownArrow" onClick={this.profileInfo.bind(this)}></i>
                  </div>
                  <div className="signOutToggel" id="signOutToggel" style={{display:this.state.profileDisplay}}>
                    <div className="signOutToggelProfileImg">
                      <img src='/images/40.png' alt="logo"  />
                    </div>
                    <div className="signOutToggelProfileName">
                      Hello, {this.props.userDetails.firstName }
                    </div>
                    <div className="signOutToggelButtons">
                      <div className="col-lg-5 pull-left">
                        <div className="row">
                          <a href={"/profile/"+this.props.userDetails.candidate_id} className="whitelink linkA"><div className="signOutButton">Profile</div></a>
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
                <div className="functionalbarsToggel" id="barsToggel" style={{top:this.state.asideDisplay}}>

              <div className="functionalbarsCross col-lg-12">
              
              <span className="notificationMessegeCross" onClick={this.asideBar.bind(this)}> X </span>
            </div>


            <div className="functionalbarsItem col-lg-12">
              <a href="search-jobs" className="aLink"><span className="notificationMessegeText">Jobs </span></a>
            </div>
            <div className="functionalbarsItem col-lg-12">
              <a href="/basic-info" className="aLink"><span className="notificationMessegeText">candidate </span></a>
            </div>
            <div className="functionalbarsItem col-lg-12">
              
              <span className="notificationMessegeText">Companies</span>
            
            </div>
            <div className="functionalbarsItem col-lg-12">
              
              <span className="notificationMessegeText">Recruiters</span>
              
            </div>
            <div className="functionalbarsItem col-lg-12">
              
              <span className="notificationMessegeText">About Us</span>
              
            </div>

            <div className="functionalbarsItem col-lg-12">
              
              <span className="notificationMessegeText">Contact Us</span>
              
            </div>
          

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
        userDetails  : state.userDetails,
    }
}
const mapDispatchToProps = (dispatch) => ({
  mapAction :  bindActionCreators(mapActionCreator, dispatch)
}) 
export default connect(mapStateToProps,mapDispatchToProps) (Header);