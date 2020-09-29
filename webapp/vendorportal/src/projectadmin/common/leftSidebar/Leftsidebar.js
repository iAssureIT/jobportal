import React,{Component}                              from 'react';
import { render }                                     from 'react-dom';
import $                                              from "jquery";
import { BrowserRouter, Route, Switch,Link  } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'; 
import './Leftsidebar.css';
import './dashboard.css';


export default class AdminDashboard extends Component{

  constructor(props){
    super(props);
    this.state = {
      menuValues : {
        notificationManagement : false,
        RFSReports         : false,
        PRReports          : false,
        userManagement     : false,
        masterData         : false,
        RFSManagement      : false,
        PRManagement       : false,
        KnowledgeCenter    : false,
        supplierManagement : false,
        companySettings    : false
      }
    };
    this.closeIcon   = 'fa-angle-left';
    this.openIcon    = 'fa-angle-down';
    this.activeMenu = this.activeMenu.bind(this)
  }

  componentDidMount(){
    if (!$('body').hasClass('adminLte')) {
      var adminLte = document.createElement("script");
      adminLte.type="text/javascript";
      adminLte.src = "/js/adminLte.js";
      $("body").append(adminLte);
    }
      $("html,body").scrollTop(0);
      var getCurrentUrl = window.location.pathname;
      console.log("getCurrentUrl",getCurrentUrl);

    $(".sidebar-menu .singleTreeview a").filter(function(a, b){
      if($(this).attr('href') === getCurrentUrl){
        // console.log("b",b);
        // console.log($(this).attr('href') === getCurrentUrl);
        $(b).addClass('active');
        // console.log(b);
      }
    })
     $(".sidebar-menu .treeview li a").filter(function(a, b){
      if($(this).attr('href') === getCurrentUrl){
        $(b).addClass('active');
        $($($(b).parent()).parent()).parent().addClass('menu-open');
        ($($(b).parent()).parent()).css("display", "block");
        // $($($($($($($(b).parent()).parent()).children('menu-open')).children("pull-right-container")).children("i"))).addClass("fa-angle-down");
      }
    })
  }
   
  componentWillUnmount(){
      $("script[src='/js/adminLte.js']").remove();
      $("link[href='/css/dashboard.css']").remove();
  }

  activeMenu(event){
    console.log('event.currentTarget',event.currentTarget);
    event.preventDefault();
    var a =event.currentTarget
    var pathname = event.currentTarget.getAttribute("data-id"); 
    console.log('pathname',pathname);
    window.location = pathname
    $(".sidebar-menu .treeview-menu li a").removeClass("active-submenu");
    $(event.currentTarget).addClass("active-submenu");
    // event.currentTarget.href = pathname;
    // var currentEvent =  event.currentTarget
    // var getCurrentUrl = window.location.pathname;
    // localStorage.setItem("getCurrentUrl", pathname);
    // localStorage.setItem("currentEvent",currentEvent);
    // console.log("getCurrentUrl",getCurrentUrl);
    // console.log("currentURL",localStorage.getItem("currentURL"));
  }

  openMenu = (key) => {
    let {menuValues} = this.state;
    Object.keys(menuValues).map((data) => {
      menuValues[data] = (data==key) ? !menuValues[key] :false;
    });
    this.setState({menuValues});
    $('.singleTreeview').removeClass('active')
  }

  eventclk1(event){
    $(event.currentTarget).children(".menuContent").children(".rotate").toggleClass("down");
    var currentEvent =  event.currentTarget
    var getCurrentUrl = window.location.pathname;
    console.log("getCurrentUrl",getCurrentUrl);
    localStorage.setItem("currentURL",getCurrentUrl)
    localStorage.setItem("currentEvent",currentEvent)
    /*
    var x = document.getElementById(targetId);
    var targetId = $(event.currentTarget).children('.activeClass').attr("id");
    var getValue = x.getAttribute('aria-expanded');
    $('.activeClass').removeClass('in');
    $(event.currentTarget).children('.activeClass').addClass('in')
    */
  } 

  clickDashboard(event){
    $('.treeview').not(event.currentTarget).removeClass('menu-open')
    $('.treeview-menu').css({'display':'none'})
    $(event.currentTarget).addClass('active')

  }

  render(){
    let {dashboard,vendorData,notificationManagement,PRReports,supplierManagement,userManagement,masterData,RFSManagement,PRManagement,companySettings,KnowledgeCenter} = this.state.menuValues;

    return(
      <aside className="main-sidebar control-sidebar sidebarWrapper scrollBox">
        <section className="sidebar noPadLR sidebar-menu-wrapper">
          <ul className="sidebar-menu" data-widget="tree">
            {/*<li className="header">MAIN NAVIGATION</li>*/}
                <li className="singleTreeview" onClick={this.clickDashboard.bind(this)}>
                  <a href="/dashboard" onClick={()=>this.openMenu("dashboard")}>
                    <i className="fa fa-th-large" aria-hidden="true"></i>
                    <span className="sidebarMenuTitle">Dashboard</span>
                  </a>
                </li>
                <li className="singleTreeview" onClick={this.clickDashboard.bind(this)}>
                  <a href="/bookingList" onClick={()=>this.openMenu("bookingList")}>
                    <i className="fa fa-ticket" aria-hidden="true"></i>
                    <span className="sidebarMenuTitle">All Bookings</span>
                  </a>
                </li>
                <li className="singleTreeview" onClick={this.clickDashboard.bind(this)}>
                  <a href="/vehicle-list" onClick={()=>this.openMenu("vehicle-list")}>
                    <i className="fa fa-car" aria-hidden="true"></i>
                    <span className="sidebarMenuTitle">My Cab List</span>
                  </a>
                </li>
                <li className="singleTreeview" onClick={this.clickDashboard.bind(this)}>
                  <a href="/driver/lists" onClick={()=>this.openMenu("driver/list")}>
                    <i className="fa fa-users" aria-hidden="true"></i>
                    <span className="sidebarMenuTitle">My Driver List</span>
                  </a>
                </li>
                <li className="singleTreeview" onClick={this.clickDashboard.bind(this)}>
                  <a href="/vehicle-driver-mapping" onClick={()=>this.openMenu("driver/list")}>
                    <i className="fa fa-taxi" aria-hidden="true"></i>
                    <span className="sidebarMenuTitle">Vehicle Driver Mapping</span>
                  </a>
                </li>
              {/*  <li className="treeview" >
                  <a href="JavaScript:void(0);" onClick={()=>this.openMenu("masterData")}>
                    <i className="fa fa-database" aria-hidden="true"></i>
                    <span className="smsidenames sidebarMenuTitle">Reporting System </span>
                    <span className="pull-right-container">
                      <i className={"fa pull-right menu-icon-toggle "+(masterData?this.openIcon:this.closeIcon)} />
                    </span>
                  </a>
                  <ul className="treeview-menu" >                    
                    <li className="noPadLR"> 
                      <a href="/report1" data-id="/report1" onClick={this.activeMenu.bind(this)}>
                        <i className="fa fa-circle-o dashr" />Report 1
                      </a> 
                    </li>  
                    <li className="noPadLR"> 
                      <a href="/report2" data-id="/report2" onClick={this.activeMenu.bind(this)}>
                        <i className="fa fa-circle-o dashr" />Report 2
                      </a> 
                    </li>  
                  </ul>
                </li>*/}
                {/*<li className="treeview" >
                  <a href="JavaScript:void(0);" onClick={()=>this.openMenu("vendorData")}>
                    <i className="fa fa-database" aria-hidden="true"></i>
                    <span className="smsidenames sidebarMenuTitle"> Vendors </span>
                    <span className="pull-right-container">
                      <i className={"fa pull-right menu-icon-toggle "+(vendorData?this.openIcon:this.closeIcon)} />
                    </span>
                  </a>
                  <ul className="treeview-menu" >                    
                    <li className="noPadLR"> 
                      <a href="/vendor/list" data-id="/vendor/list" onClick={this.activeMenu.bind(this)}>
                        <i className="fa fa-circle-o dashr" />Vendor Master
                      </a> 
                    </li>  
                    <li className="noPadLR"> 
                      <a href="/supplier/list" data-id="/supplier/list" onClick={this.activeMenu.bind(this)}>
                        <i className="fa fa-circle-o dashr" />Supplier Master
                      </a> 
                    </li> 
                  </ul>
                </li>*/}
                <li className="singleTreeview" onClick={this.clickDashboard.bind(this)}>
                  <a href="/supplier/list" onClick={()=>this.openMenu("supplier/list")}>
                    <i className="fa fa-car" aria-hidden="true"></i>
                    <span className="sidebarMenuTitle">Supplier Master</span>
                  </a>
                </li>
                <li className="singleTreeview" onClick={this.clickDashboard.bind(this)}>
                  <a href="/my-profile" onClick={()=>this.openMenu("supplier/list")}>
                    <i className="fa fa-car" aria-hidden="true"></i>
                    <span className="sidebarMenuTitle">My Profile</span>
                  </a>
                </li>
                
          </ul>
        </section>
      </aside>
    );
  }
}
