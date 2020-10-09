import React,{Component}                              from 'react';
import { render }                                     from 'react-dom';
import $                                              from "jquery";
import { BrowserRouter, Route, Switch,Link  } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'; 
import './Leftsidebar.css';


export default class AdminDashboard extends Component{

  constructor(props){
    super(props);
    this.state = {
      menuValues : {
        vendorData             : false,
        supplierData           : false,
        corporateData          : false,
        contractmanagement     : false,
        masterData             : false
      }
    };
    this.closeIcon   = 'fa-angle-left';
    this.openIcon    = 'fa-angle-down';
    this.activeMenu = this.activeMenu.bind(this)
  }

  componentDidMount(){
      var roles = localStorage.getItem("roles");

     $(".menuItem").hide();

     if(roles.indexOf('corporateadmin') > -1)
     {
      $(".adminMenuItem").show();
     }
      
     if(roles.indexOf('manager') > -1){
        $(".managerMenuItem").show();
     }

     if(roles.indexOf('employee') > -1){
       $(".employeeMenuItem").show();
     }
   
    if (!$('body').hasClass('adminLte')) {
      var adminLte = document.createElement("script");
      adminLte.type="text/javascript";
      adminLte.src = "/js/adminLte.js";
      $("body").append(adminLte);
    }

      $("html,body").scrollTop(0);
      var getCurrentUrl = window.location.pathname;
      // console.log("getCurrentUrl",getCurrentUrl);

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
    // console.log('event.currentTarget',event.currentTarget);
    event.preventDefault();
    var a =event.currentTarget
    var pathname = event.currentTarget.getAttribute("data-id"); 
    // console.log('pathname',pathname);
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
    // console.log("getCurrentUrl",getCurrentUrl);
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
    let {dashboard,vendorData,supplierData,corporateData,contractmanagement,masterData} = this.state.menuValues;

    return(
      <aside className="main-sidebar control-sidebar scrollBox">
        <section className="sidebar noPadLR sidebar-menu-wrapper">
          <ul className="sidebar-menu" data-widget="tree">
            <li className="singleTreeview" onClick={this.clickDashboard.bind(this)}>
                <a href="/dashboard"  title="Dashboard" onClick={()=>this.openMenu("dashboard")}>
                  <i className="fa fa-dashboard" aria-hidden="true"></i>
                  <span className="sidebarMenuTitle">Dashboard</span>
                </a>
              </li>
                <li className=" sidebarMenuText separator employeeMenuItem managerMenuItem adminMenuItem menuItem" >
                    <span className="">Employee Section</span>
                </li>
                 <li className="singleTreeview employeeMenuItem menuItem" onClick={this.clickDashboard.bind(this)}>
                  <a href="/booking"  title="Trip Booking" onClick={()=>this.openMenu("Trip Booking")}>
                    <i className="fa fa-ticket" aria-hidden="true"></i>
                    <span className="sidebarMenuTitle">Trip Booking</span>
                  </a>
                </li>

                <li className=" sidebarMenuText employeeMenuItem menuItem" >
                  <a href="/booking-details" title="Booking List">
                    <i className="fa fa-file"></i>
                    <span className="iconTitle">Booking List </span>
                  </a>
                </li>
                <li className=" sidebarMenuText employeeMenuItem menuItem" >
                  <a href="/my-profile" title="My Profile">
                    <i className="fa fa-user"></i>
                    <span className="iconTitle">My Profile</span>
                  </a>
                </li>
             
                <li className=" sidebarMenuText separator managerMenuItem menuItem" >
                    <span className="">Manager Section</span>
                </li>
              
                <li className=" sidebarMenuText managerMenuItem menuItem" >
                  <a href="/new-bookings" title="New Bookings">
                    <i className="fa fa-ticket"></i>
                    <span className="iconTitle">New Bookings</span>
                  </a>
                </li>
                <li className=" sidebarMenuText managerMenuItem menuItem" >
                  <a href="/approved-bookings" title="Approved Bookings">
                    <i className="fa fa-check-square-o"></i>
                    <span className="iconTitle">Approved Bookings</span>
                  </a>
                </li>
                <li className=" sidebarMenuText managerMenuItem menuItem" >
                  <a href="/rejected-bookings" title="Rejected Bookings">
                    <i className="fa fa-bars"></i>
                    <span className="iconTitle">Rejected Bookings</span>
                  </a>
                </li>
                <li className=" sidebarMenuText managerMenuItem menuItem" >
                  <a href="/CR-bookings" title="Rejected Bookings">
                    <i className="fa fa-bars"></i>
                    <span className="iconTitle">Change Request</span>
                  </a>
                </li>
             {/*   <li className=" sidebarMenuText managerMenuItem menuItem" >
                  <a href="/department-report" title="Department Report">
                    <i className="fa fa-file"></i>
                    <span className="iconTitle">Department Report</span>
                  </a>
                </li>*/}
                 <li className=" sidebarMenuText separator adminMenuItem menuItem" >
                    <span className="">Admin Section</span>
                </li>
                <li className="singleTreeview employeeMenuItem adminMenuItem menuItem" onClick={this.clickDashboard.bind(this)}>
                  <a href="/guest/lists"  title="Add Guest" onClick={()=>this.openMenu("Add Guest")}>
                    <i className="fa fa-user" aria-hidden="true"></i>
                    <span className="sidebarMenuTitle">Add Guest</span>
                  </a>
                </li>
                <li className="singleTreeview adminMenuItem menuItem" onClick={this.clickDashboard.bind(this)}>
                  <a href="/employee/lists"  title="Add Employee" onClick={()=>this.openMenu("Add Employee")}>
                    <i className="fa fa-user" aria-hidden="true"></i>
                    <span className="sidebarMenuTitle">Add Employee</span>
                  </a>
                </li>
                <li className="singleTreeview adminMenuItem menuItem" onClick={this.clickDashboard.bind(this)}>
                  <a href="/CR_Bookings_Admin"  title="Add Employee" onClick={()=>this.openMenu("Add Employee")}>
                    <i className="fa fa-user" aria-hidden="true"></i>
                    <span className="sidebarMenuTitle">Change Request</span>
                  </a>
                </li>
           
          </ul>
        </section>
      </aside>
    );
  }
}
