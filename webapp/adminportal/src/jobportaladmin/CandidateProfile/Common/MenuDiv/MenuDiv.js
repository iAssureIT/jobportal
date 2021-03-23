import React, { Component } 		from 'react';
import './MenuDiv.css';

export default class MenuDiv extends Component {
	constructor(props){
    super(props);
	     
  	}

    render(){
      return(
           <div className="nav-center OnboardingTabs OnboardingTabs2 col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12">
              <div className="row">
                  <ul className="nav nav-pills vendorpills col-lg-12 col-md-12  col-sm-12 col-xs-12">
                    <li className="active col-lg-3 col-md-3 col-sm-12 col-xs-12 pdcls pdclsOne btn1 NOpadding-left">
                      <a href="/candidate/basic-info" className="basic-info-pillss pills">
                        
                        Basic Info
                      </a>
                      <div className="triangleone triangleones" id="triangle-right"></div>
                    </li>
                    <li className="col-lg-2 col-md-3 col-sm-12 col-xs-12 transactionTab pdcls pdclsOne btn2 disabled">
                      <div className="triangletwo" id="triangle-right1"></div>
                      <a href="/candidate/address/:candidateID" className="basic-info-pillss backcolor">
                        
                        Address
                      </a>
                      <div className="trianglethree forActive" id="triangle-right"></div>
                    </li>
                    <li className="col-lg-2 col-md-3 col-sm-12 col-xs-12 transactionTab pdcls pdclsOne btn2 disabled">
                      <div className="triangletwo" id="triangle-right1"></div>
                      <a  href="/candidate/academics/:candidateID" className="basic-info-pillss backcolor">
                        
                        Academics
                      </a>
                      <div className="trianglethree forActive" id="triangle-right"></div>
                    </li>
                    <li className="col-lg-2 col-md-3 col-sm-12 col-xs-12 transactionTab pdcls pdclsOne btn2 disabled">
                      <div className="triangletwo" id="triangle-right1"></div>
                      <a  href="/candidate/certification/:candidateID" className="basic-info-pillss backcolor">
                        
                        Skills
                      </a>
                      <div className="trianglethree forActive" id="triangle-right"></div>
                    </li>
                    <li className="col-lg-3 col-md-3 col-sm-12 col-xs-12 transactionTab noRightPadding pdcls btn4 disabled">
                      <div className="trianglesix" id="triangle-right2"></div>
                      <a  href="/candidate/experience/:candidateID" className="basic-info-pillss backcolor">
                        
                        Experience 
                      </a>
                    </li>
                  </ul>
              </div>
          </div>
      );
    
      
       
    }
}

