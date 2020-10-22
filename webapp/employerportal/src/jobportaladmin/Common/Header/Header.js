import React,{Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Header.css';

class Header extends Component{
  render(){
    return(
        <div className="headerWrapper col-lg-12">
          <div className="row">
            <div className="headerLogoWrapper col-lg-7">
              <img src="/images/1.png" alt="ijobs logo"/>
            </div>
            <div className="headerMenuWrapper col-lg-5">
              <div className="row"> 
                <div className="headerJobWrapper">
                  <div className="headerJob">
                    <i className="fa fa-user"></i>Post Job 
                  </div>
                </div>
                <div className="headerBellWrapper ">
                  <i className="fa fa-bell-o "></i>
                  <div className="headerBellbadge">1</div>
                </div>
                <div className="headerProfileWrapper ">
                  <span className="headerProfileName">
                    Hello, John doe
                  </span>
                  <img className="headerProfileImg" src='/images/profilelogo.jpeg' alt="logo" />
                  <i className="fa fa-caret-down profileDownArrow"></i>
                </div>
                <div className="headerToggelWrapper ">
                  <div className="headerToggel">
                    <FontAwesomeIcon icon="align-right" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      );
  }
}

export default Header;