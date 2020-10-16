import React,{Component}                              from 'react';
import { render }                                     from 'react-dom';
import $                                              from "jquery";
import axios from 'axios';
import { BrowserRouter, Route, Switch,Link,location } from 'react-router-dom';
import { withRouter }           from 'react-router-dom';

import Rightsidebar from '../rightSidebar/Rightsidebar.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'; 
import './Header.css';


class Header2 extends Component{

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      showNotification: false,
      inAppNotifications:[],
      contractDetails:[],
      notifCount:0,
      cogs : true, 
      empProfileStatus : true, 

      token : ""

    }
  }

  componentDidMount(){
    if ( !$('body').hasClass('adminLte')) {
      var adminLte = document.createElement("script");
      adminLte.type="text/javascript";
      adminLte.src = "/js/adminLte.js";
      $("body").append(adminLte);

    }
    $("html,body").scrollTop(0);

    const Token = localStorage.getItem("token");
    const user_ID = localStorage.getItem("user_ID");
    this.setState({
      user_ID : user_ID
    });
    const email = localStorage.getItem("emailId");
    const fullname = localStorage.getItem("fullName");
    axios.get('/api/users/get/' + user_ID)
      .then((res) => {
        this.setState({
          email: res.data.email,
          profileImage: res.data.image,
          fullname: res.data.firstname+' '+res.data.lastname,
          companyID : res.data.companyID,
          companyName : res.data.companyName,
          role : res.data.role,
          token : Token
        },()=>{
          localStorage.setItem("companyName",this.state.companyName);
          localStorage.setItem("companyID",this.state.companyID);
          localStorage.setItem("roles",this.state.role)
           axios.get("/api/entitymaster/getCompany/"+res.data.companyID)
            .then((response) => {
              this.setState({
                companyImage:response.data.companyLogo[0]
              })
                localStorage.setItem("company_Id",response.data._id);
            })
            .catch((error) => {
            })
         
        });
    })
    .catch((err) => {
    })
    var company_Id = localStorage.getItem("company_Id");
    var contractID ="";

    axios.get("/api/contract/get/one/entity/" + company_Id)
    .then((response) => {
        if(response.data.length>0){
            var contractDetails = response.data[0];
             axios.get("/api/entitymaster/get/one/"+company_Id)
            .then((response)=>{
                if(response.data[0].profileStatus === "New" || contractDetails.status !== "Approved"){
                    this.setState({
                        cogs:false
                    })
                   $("body").addClass("sidebar-mini sidebar-collapse");
                }
            })
            .catch((error)=>{})
        }else{
            this.setState({
                cogs:false
            })
        }
    })
    .catch((error) => {})
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

    axios.get('/api/notifications/get/list/Unread/'+user_ID)
    .then(notifications => {
        this.setState({ 
          inAppNotifications: notifications.data,
          notifCount: notifications.data.length
        })
    })
    .catch(error => {
    })
      var id = localStorage.getItem("user_ID");
      axios.get("/api/personmaster/getUserByUserId/"+id)
      .then((res) => {
          if(res.data && res.data.data[0]){
            localStorage.setItem("manager_Id",res.data.data[0]._id);
          }
      })
      .catch((error) => {
        console.log('personmaster error=>',error)
      })
    }

    componentWillReceiveProps(nextProps){
        const user_ID = localStorage.getItem("user_ID");
        axios.get('/api/notifications/get/list/Unread/'+user_ID)
        .then(notifications => {
            this.setState({ inAppNotifications: notifications.data,notifCount: notifications.data.length })
            })
        .catch(error => {
        })
    }
    componentWillUnmount(){
        $("script[src='/js/adminLte.js']").remove();
        $("link[href='/css/dashboard.css']").remove();
    }

    openNav() {
        document.getElementById("mySidenav").style.width = "250px";
    }

    closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }

    toggleLeftNav(event) {
        event.preventDefault()
        $('#sidebar').toggleClass('active')
        $('#headerid').toggleClass('headereffect');
        $('#dashbordid').toggleClass('dashboardeffect')
        var sideBar = $("#sidebar").hasClass("active")
        localStorage.setItem('sideBar', sideBar);

    }

    toggleNav(event) {
        event.preventDefault()
        var currentWidth = document.getElementById("mySidenav").style.width;
        if (currentWidth == "230px") {
          document.getElementById("mySidenav").style.width = "0";
        } else {
          document.getElementById("mySidenav").style.width = "230px";
        }
    }

    logout() {
      var id = this.state.email;
        var data={};
        data.email = id;
        data.user_ID =this.state.user_ID;
        data.token = this.state.token;
        console.log("emailId",data);
        axios.patch('/api/auth/patch/logout',data)
        .then((res)=>{
          console.log("response",res);
          // this.props.history.push("/ViewAllNotification");
        })
        .catch((err)=>{
          console.log(err)
        })
        $("script[src='/js/adminLte.js']").remove();
        $("link[href='/css/dashboard.css']").remove();
        var token = localStorage.removeItem("token");

        if (token !== null) {
          this.setState({
            loggedIn: false
          }, () => {
            localStorage.removeItem("emailId")
            localStorage.removeItem("center_ID")
            localStorage.removeItem("centerName")
            localStorage.removeItem("fullName")
          }) 
        }
        
    }
    LogoutSectionHover(event) {
        $(".colorboxbefore").toggleClass("colorbox");
        $('.showme').toggle();
    }

    bellNotification(event) {
        $('.bellnotification').toggle();
        const user_ID = localStorage.getItem("user_ID");
        axios.get('/api/notifications/get/list/Unread/'+user_ID)
        .then(notifications => {
        // console.log('notifications: ',notifications)
        this.setState({ inAppNotifications: notifications.data,notifCount: notifications.data.length })
        })
        .catch(error => {
        })
    }
    viewAll(id,event){
        // $('.bellnotification').toggle();
        axios.put('/api/notifications/put/'+id)
        .then((res)=>{
          this.props.history.push("/ViewAllNotification");
        })
        .catch((err)=>{
          console.log(err)
        })
    }
    showDropdown(event)
    {
        $("#showhide").addClass("showhim");
        $("#showhidearrow").addClass("showhim");
    }
    hideDropdown(event)
    {
        $("#showhide").removeClass("showhim");
        $("#showhidearrow").removeClass("showhim");
    }

  render(){

    return(
      <div className="">
        <header className="main-header newMain-header">
          <a href="javascript:void(0)" className="logo logoOne">
            <span className="logo-mini">
              <img src={ this.state.companyImage ? this.state.companyImage : "/images/noImagePreview.png"} className="shortlogo strong"/>
            </span>
            <span className="logo-lg">
                <label  className="headerImage">{localStorage.getItem("companyName")}</label>
            </span>
          </a>
          <nav className="navbar navbar-static-top" role="navigation">
            <div className="col-lg-3 col-md-4 col-sm-4 col-xs-4 padd0">
              <a href="javascript:void(0)" className="sidebar-toggle marginTop11 marginLeft12" data-toggle="push-menu" role="button">
                  <span className="sr-only">
                    Toggle navigation
                  </span>
              </a>
            </div>
            <div className="col-lg-6 col-md-8 col-sm-8 col-xs-8 padd0 pull-right">
            {
              this.state.cogs && this.state.empProfileStatus?
                  <div onClick={this.toggleNav.bind(this)} className="col-lg-1 col-md-1 col-sm-1 col-xs-1 pull-right nopadding textAlignCenter onHoverEffect hover">
                    { localStorage.getItem("roles").indexOf("corporateadmin")>-1  ?
                    <i className="fa fa-cogs headicon "></i>
                    :
                    null
                    }
                  </div>
                :
                null
            }
              <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 pull-right padd0">
                <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 pull-right">
                  <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 bell_Icon dropdown">
                    <i className="fa fa-bell btn dropdown-toggle" data-toggle="dropdown" aria-hidden="true"></i>
                    <span className="badge bg-warning">{this.state.notifCount}</span>
                    <div className="col-lg-12 col-md-12 dropdown-menu bellnotification">
                      <p>You have {this.state.notifCount} notifications</p>
                      <div className="profiledetails">
                        {this.state.inAppNotifications && this.state.inAppNotifications.length > 0 ?
                            this.state.inAppNotifications.map((data, index) => {
                              return (
                                <div className="msgborderbtm" key={index} id={data._id} onClick={this.viewAll.bind(this,data._id)}>
                                <div dangerouslySetInnerHTML={{ __html: data.notifBody }} />
                                </div>
                              )
                            })
                           
                          :
                          null
                        }
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-9 col-md-7 col-sm-9 col-xs-12  hover logoutAct pull-right">
                    <div className="row hover" onClick={this.LogoutSectionHover.bind(this)}>
                      <span className="col-lg-12 col-md-12 col-sm-12 col-xs-12 colorboxbefore hoverText onHoverEffect ">
                        <span className="col-lg-11 nopadding ">
                          <img src={this.state.profileImage ? this.state.profileImage : "/images/person.png"} className="userIcon"/>
                          <label className="mailtext">&nbsp;&nbsp;&nbsp;{this.state.fullname ? this.state.fullname: ""}</label>
                        </span>
                        <span className="textAlignCenter" style={{"marginTop": "4px"}}>
                        </span>
                      </span>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 user-footer showme NOpadding">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding " >
                        
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  headerImageContainer padd0 ">
                          <p className="pull-right fntC1" style={{"cursor":"pointer"}} title="Close"  onClick={this.LogoutSectionHover.bind(this)}>X</p><br/>
                            <div className=" marLeft "  style={{"backgroundImage":`url(`+ (this.state.profileImage ? this.state.profileImage : "/images/person.png")+`)`, "height": "40%", "backgroundSize":"41% 100%","backgroundRepeat": "no-repeat"}}></div>
                          <div className="col-lg-12 col-md-6 col-sm-12 col-xs-12 marTop pull-right  padd0 ">
                            <h5 className="nomargin dropmailtext">
                              {this.state.fullname ? this.state.fullname :  ""}
                            </h5>
                            <h6 className=" dropmailtext"> {this.state.email ? this.state.email : ""}</h6>
                            <h6 className=" dropmailtext"> {this.state.companyName ? this.state.companyName + "( " + this.state.companyID+ " )": ""}</h6>
                          </div>
                        </div>
                        <div className="btnDiv col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <span className="">
                            {/*<a className="profileTitle btnpadd" href={"/profile/"+localStorage.getItem('user_ID')}>*/}
                            <a className="profileTitle btnpadd" href={"/my-profile"}>
                              <button type="button" className="profilebtn">Profile</button>
                            </a>
                          </span> &nbsp;
                          <span className="pull-right">
                            <a className="profileTitle btnpadd" href="/login">
                              <button type="button" className="logoutbtn" onClick={this.logout.bind(this)}>Sign Out</button>
                            </a>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
        <div id="mySidenav" className="sidenav">
          <Rightsidebar />
        </div>
      </div>
    );
  }
}
export default withRouter(Header2);
/*
href={"/Profile/"+ Meteor.userId()}*/