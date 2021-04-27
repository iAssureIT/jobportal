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
        candidateData             : false,
        supplierData           : false,
        corporateData          : false,
        contractmanagement     : false,
        masterData             : false,
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
    let {dashboard,candidateData,supplierData,corporateData,contractmanagement,masterData, billingData} = this.state.menuValues;

    return(
      <aside className="main-sidebar control-sidebar sidebarWrapper scrollBox">
        <section className="sidebar noPadLR sidebar-menu-wrapper">
          <ul className="sidebar-menu" data-widget="tree">

            <li className="singleTreeview" onClick={this.clickDashboard.bind(this)}>
              <a href="/dashboard"  title="Dashboard" onClick={()=>this.openMenu("dashboard")}>
                <i className="fa fa-dashboard" aria-hidden="true"></i>
                <span className="sidebarMenuTitle">Dashboard</span>
              </a>
            </li>
            
            <li className="treeview" >
              <a href="JavaScript:void(0);" onClick={()=>this.openMenu("corporateData")} title="Job Master">
                <i className="fa fa-users" aria-hidden="true"></i>
                <span className="smsidenames sidebarMenuTitle"> Jobs </span>
                <span className="pull-right-container">
                  <i className={"fa pull-right menu-icon-toggle "+(corporateData?this.openIcon:this.closeIcon)} />
                </span>
              </a>
              <ul className="treeview-menu" >                    
                <li className="noPadLR"> 
                  <a href="/job/list" data-id="/job/list" title="Job List" onClick={this.activeMenu.bind(this)}>
                    <i className="fa fa-circle-o dashr" />All Jobs
                  </a> 
                </li>
                <li className="noPadLR"> 
                  <a href="/filewise/employers" data-id="/filewise/jobs" title="Filewise List" onClick={this.activeMenu.bind(this)}>
                    <i className="fa fa-circle-o dashr" />Filewise Jobs
                  </a> 
                </li>   
              </ul>
            </li>
            <li className="treeview" >
              <a href="JavaScript:void(0);" onClick={()=>this.openMenu("contractmanagement")} title="Reports">
                <i className="fa fa-database" aria-hidden="true"></i>
                <span className="smsidenames sidebarMenuTitle">Reporting System</span>
                <span className="pull-right-container">
                  <i className={"fa pull-right menu-icon-toggle "+(contractmanagement?this.openIcon:this.closeIcon)} />
                </span>
              </a>
              <ul className="treeview-menu" >
                <li className="noPadLR"> 
                  <a href="/user-report" data-id="/user-report" onClick={this.activeMenu.bind(this)} title="User Report">
                    <i className="fa fa-circle-o dashr" /> Report
                  </a> 
                </li>        
              </ul>
            </li>
            <li className="treeview" >
              <a href="JavaScript:void(0);" onClick={()=>this.openMenu("corporateData")} title="corporate Master">
                <i className="fa fa-users" aria-hidden="true"></i>
                <span className="smsidenames sidebarMenuTitle"> Employers </span>
                <span className="pull-right-container">
                  <i className={"fa pull-right menu-icon-toggle "+(corporateData?this.openIcon:this.closeIcon)} />
                </span>
              </a>
              <ul className="treeview-menu" >                    
                <li className="noPadLR"> 
                  <a href="/corporate/list" data-id="/corporate/list" title="Employer List" onClick={this.activeMenu.bind(this)}>
                    <i className="fa fa-circle-o dashr" />Employer Master
                  </a> 
                </li>
                <li className="noPadLR"> 
                  <a href="/filewise/employers" data-id="/filewise/employers" title="Filewise List" onClick={this.activeMenu.bind(this)}>
                    <i className="fa fa-circle-o dashr" />Filewise Employers
                  </a> 
                </li>   
              </ul>
            </li>
             <li className="treeview" >
                <a href="JavaScript:void(0);" onClick={()=>this.openMenu("corporateData")} title="corporate Master">
                  <i className="fa fa-users" aria-hidden="true"></i>
                  <span className="smsidenames sidebarMenuTitle"> Package master </span>
                  <span className="pull-right-container">
                    <i className={"fa pull-right menu-icon-toggle "+(corporateData?this.openIcon:this.closeIcon)} />
                  </span>
                </a>
                <ul className="treeview-menu" >                    
                  <li className="noPadLR"> 
                    <a href="/package-master" data-id="/package-master" title="Vendor List" onClick={this.activeMenu.bind(this)}>
                      <i className="fa fa-circle-o dashr" />Package Master
                    </a> 
                  </li> 
                    
                </ul>
              </li>
            <li className="treeview" >
              <a href="JavaScript:void(0);" onClick={()=>this.openMenu("candidateData")} title="Vendor Master">
                <i className="fa fa-book" aria-hidden="true"></i>
                <span className="smsidenames sidebarMenuTitle"> Candidates </span>
                <span className="pull-right-container">
                  <i className={"fa pull-right menu-icon-toggle "+(candidateData?this.openIcon:this.closeIcon)} />
                </span>
              </a>
             
              <ul className="treeview-menu" >                    
                <li className="noPadLR"> 
                  <a href="/candidate/list" data-id="/candidate/list" title="Vendor List" onClick={this.activeMenu.bind(this)}>
                    <i className="fa fa-circle-o dashr" />Candidate Master
                  </a> 
                </li> 
                  
              </ul>
            </li>
            <li className="singleTreeview" onClick={this.clickDashboard.bind(this)}>
              <a href="/project-master-data" title="Master Data" onClick={()=>this.openMenu("dashboard")}>
                <i className="fa fa-th-large" aria-hidden="true"></i>
                <span className="sidebarMenuTitle">Master Data</span>
              </a>
            </li>
          </ul>
        </section>
      </aside>
    );
  }
}
