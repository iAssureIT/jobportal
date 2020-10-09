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
                      Preferences
                    </div>
                  </li>
                 {/* <li className="sidebarMenuText">
                     <a href="/org-settings/basic-details"title="Organization Settings" >
                       <i className="fa fa-building addCircle" />
                       Organization Settings
                     </a>
                   </li>*/}
                  {/*<li className="sidebarMenuText">
                    <a href="/companysetting"title="Organization Setting" >
                      <i className="fa fa-building addCircle" />
                      Organization Setting
                    </a>
                  </li>
                  <li className="sidebarMenuText">
                    <a href="/umlistofusers"  title="User Management">
                       <i className="glyphicon fa fa-users greenColor"></i> 
                         User Management
                    </a>
                  </li>
                  */}
                  <li className=" sidebarMenuText adminMenuItem menuItem" >
                    <a href="/umlistofusers" title="Corporate Profile">
                      <i className="glyphicon fa fa-users greenColor"></i>
                      <span className="iconTitle">User Management</span>
                    </a>
                   </li> 
                    <li className=" sidebarMenuText adminMenuItem menuItem" >
                    <a href="/company-profile" title="Corporate Profile">
                      <i className="fa fa-street-view addCircle"></i>
                      <span className="iconTitle">Vendor Profile</span>
                    </a>
                  </li>
                  <li className=" sidebarMenuText adminMenuItem menuItem" >
                    <a href="/contract-view" title="Contract Details">
                      <i className="fa fa-handshake-o darkGreenColor"></i>
                      <span className="iconTitle">Contract Details</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </aside>
        </div>
      </Router>
    );
  }
}
