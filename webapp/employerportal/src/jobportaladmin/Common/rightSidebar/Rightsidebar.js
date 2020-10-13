import React,{Component}                      from 'react';
import {BrowserRouter as Router, Route,Link } from 'react-router-dom';
import $                                      from "jquery";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './Rightsidebar.css';

export default class Rightsidebar extends Component{
  
  constructor(props) {
   super(props);
    this.state = {}
  }
  eventclk1(event){
    $(event.currentTarget).children(".menuContent").children(".rotate").toggleClass("down");
    var currentEvent =  event.currentTarget
    var getCurrentUrl = window.location.pathname;
    console.log("getCurrentUrl",getCurrentUrl);
    localStorage.setItem("currentURL",getCurrentUrl)
    localStorage.setItem("currentEvent",currentEvent)
    /*var x = document.getElementById(targetId);
    var targetId = $(event.currentTarget).children('.activeClass').attr("id");
    var getValue = x.getAttribute('aria-expanded');
    $('.activeClass').removeClass('in');
    $(event.currentTarget).children('.activeClass').addClass('in')*/
  }
 
  render(){
    return(
      <Router>
        <div>
          <aside className="leftsidebar">
            <div className="wrapper">
              <nav id="sidebar1">       
                <ul className="list-unstyled components">
                  <li className="active">
                    <div className="rightsideHeading ">
                      Admin Activities
                    </div>
                  </li>
                  <li className=" sidebarMenuText adminMenuItem menuItem" >
                  <a href="/all-bookings" title="All Bookings">
                    <i className="fa fa-ticket addCircle"></i>
                    <span className="iconTitle">All Bookings</span>
                  </a>
                 </li>
                 
                  <li className="sidebarMenuText adminMenuItem menuItem" onClick={this.eventclk1.bind(this)}>
                  <a href="#Corporate" data-toggle="collapse" aria-expanded="false" className="menuContent" title="Master Data">
                    <i className="fa fa-address-book aquaColor" />
                    <span className="iconTitle">Master Data</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <i className="leftarrow rotate fa fa-angle-left "  id="Master Data"></i> 
                  </a>
                  <ul className="collapse list-unstyled activeClass" id="Corporate">
                   
                   {/* <li>
                      <a href="/employee/lists" title="Employee ">
                       <i className="fa fa-circle-o" />
                       <span className="sidebarMenuSubText">Employee </span>
                     </a>
                    </li>
                    <li>
                      <a href="/guest/lists" title="Guest ">
                       <i className="fa fa-circle-o" />
                       <span className="sidebarMenuSubText">Guest </span>
                     </a>
                    </li>*/}
                     <li>
                      <a href="/designation" title="Designations">
                        <i className="fa fa-circle-o" /> 
                        <span className="sidebarMenuSubText">Designations</span>
                      </a>
                    </li>  
                    <li>
                      <a href="/department" title="Departments">
                        <i className="fa fa-circle-o" /> 
                        <span className="sidebarMenuSubText">Departments</span>
                      </a>
                    </li>
                    <li>
                      <a href="/vehicleEmpMapping" title="Departments">
                        <i className="fa fa-circle-o" /> 
                        <span className="sidebarMenuSubText">Vehicle Mapping</span>
                      </a>
                    </li>
                  </ul>
                </li>
                  
{/*
                  <li className="sidebarMenuText">
                      <a href="/module" title="Module Master">
                        <i className="fa fa-th-large aquaColor"></i>  
                        <span className="sidebarMenuSubText">Module Master</span>
                      </a>
                  </li>
                  <li>
                      <a href="/facility" title="Facility Master">
                        <i className="fa fa-briefcase darkGreenColor"></i>
                        <span className="sidebarMenuSubText">Facility Master</span>
                      </a>
                  </li>*/}
                  
                </ul>
              </nav>
            </div>
          </aside>
        </div>
      </Router>
    );
  }
}
