import React, { Component } 		from 'react';
import './MenuDiv.css';

export default class MenuDiv extends Component {
	constructor(props){
    super(props);
       this.state = {
        location    : window.location.pathname,
      }
      console.log(window.location.pathname);
  	}

    render(){
      return(
           <div className="adminBar nav-center OnboardingTabs OnboardingTabs2 col-lg-10 col-lg-offset-1 ">
              <div className="row">
                  <ul className="nav nav-pills vendorpills col-lg-12 ">
                    <li className={this.state.location==("/candidate/basic-info")
                      ?
                      "active col-lg-3  pdcls pdclsOne btn1 NOpadding-left"
                      :
                      "active2 col-lg-3  transactionTab pdcls pdclsOne btn2 "}>

                      <a href="/candidate/basic-info" 
                          className={this.state.location==("/candidate/basic-info")?"basic-info-pillss pills":"basic-info-pillss backcolor"}>
                        
                        Basic Info
                      </a>
                      <div className={this.state.location==("/candidate/basic-info")
                        ?" triangleone triangleones "
                        :"trianglethree forActive"} id="triangle-right"></div>
                    </li>
                    <li className={this.state.location==("/candidate/address/:candidate_id")
                                  ?
                                   "active col-lg-2  transactionTab pdcls pdclsOne btn2 "
                                  :" col-lg-2 transactionTab pdcls pdclsOne btn2 "}>
                        <div className="triangletwo" id="triangle-right1"></div>
                        <a href="/candidate/address/:candidate_id" className={this.state.location==("/candidate/address/:candidate_id")?"basic-info-pillss pills":"active2 basic-info-pillss backcolor"}>
                          
                          Address
                        </a>
                        <div className={this.state.location==("/candidate/address/:candidate_id")
                                        ?
                                        "triangleone triangleones"
                                        :
                                        "trianglethree forActive"} id="triangle-right">
                        </div>
                    </li>
                    <li className={this.state.location==("/candidate/academics/:candidate_id")
                                  ?
                                   "active col-lg-2  transactionTab pdcls pdclsOne btn2 "
                                  :" col-lg-2 transactionTab pdcls pdclsOne btn2 "}>
                        <div className="triangletwo" id="triangle-right1"></div>
                        <a href="/candidate/academics/:candidate_id" className={this.state.location==("/candidate/academics/:candidate_id")?"basic-info-pillss pills":"active2 basic-info-pillss backcolor"}>
                          
                          Academics
                        </a>
                        <div className={this.state.location==("/candidate/academics/:candidate_id")
                                        ?
                                        "triangleone triangleones"
                                        :
                                        "trianglethree forActive"} id="triangle-right">
                        </div>
                    </li>
                    <li className={this.state.location==("/candidate/certification/:candidate_id")
                                  ?
                                   "active col-lg-2  transactionTab pdcls pdclsOne btn2 "
                                  :" col-lg-2 transactionTab pdcls pdclsOne btn2 "}>
                        <div className="triangletwo" id="triangle-right1"></div>
                        <a href="/candidate/certification/:candidate_id" className={this.state.location==("/candidate/certification/:candidate_id")?"basic-info-pillss pills":"active2 basic-info-pillss backcolor"}>
                          
                          Skills
                        </a>
                        <div className={this.state.location==("/candidate/certification/:candidate_id")
                                        ?
                                        "triangleone triangleones"
                                        :
                                        "trianglethree forActive"} id="triangle-right">
                        </div>
                    </li>
                  
                    <li className={this.state.location==("/candidate/experience/:candidate_id")
                                  ?
                                   "active col-lg-3 transactionTab noRightPadding pdcls pdclsOne btn4 "
                                  :" col-lg-3 transactionTab noRightPadding pdcls pdclsOne btn4 "}>
                        <div className="trianglesix" id="triangle-right2"></div>
                        <a href="/candidate/experience/:candidate_id" className={this.state.location==("/candidate/experience/:candidate_id")?"basic-info-pillss pills":"active2 basic-info-pillss backcolor"}>
                          
                          Experience
                        </a>
                        
                    </li>
                    
                  </ul>
              </div>
          </div>
      );
    
      
       
    }
}

