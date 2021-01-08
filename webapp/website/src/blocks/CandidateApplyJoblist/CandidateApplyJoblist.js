import React, { Component } from 'react';

import ApplyJoblist        from '../ApplyJoblist/ApplyJoblist.js';
import LeftSideFilters     from '../LeftSideFilters/LeftSideFilters.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './SubFunctionalpage.css';

export default class CandidateApplyJoblist extends Component {

  constructor(props){
    super(props);
    this.state={
      leftDrawerDisplay  : "-350px",
      arrowToggle: false  
    }
  }

  leftDrawerInfo(event){

    if(this.state.leftDrawerDisplay==="-350px"){
  
      this.setState({
      leftDrawerDisplay  : "0px",
      arrowToggle: true
      
      })
    }
    else{
      this.setState({
      leftDrawerDisplay  : "-350px",
      arrowToggle:false
      })
    }
  }

  render() {
    return (
      <div className="ViewBodyWrapper container-fluid">
        
          <div className="filterDiv col-lg-12">

            <div className="row">
              <div className="filterButton col-lg-1" onClick={this.leftDrawerInfo.bind(this)}>
                <i className="fa fa-filter filtersIcon" ></i>
                <i className={this.state.arrowToggle ? "fa fa-arrow-left arrowIcon" : "fa fa-arrow-right arrowIcon"} 
                              value={this.state.arrowToggle}></i>

                 Filters             
              </div>
            </div>
          </div>

          <div className=" col-lg-3">
            <div className='row'>
                <div className="viewWrapper col-lg-4">
                  <div className='row'>
                    <ul className="nav nav-pills">
                      <li className="viewDiv active"><a data-toggle="pill" href="#"> Map <br/> View</a></li>
                      <li className="viewDiv"><a data-toggle="pill" href="#">Functional <br/> View</a></li>
                      <li className="viewDiv"><a data-toggle="pill" href="#">Industrial <br/> View</a></li>
                    </ul>
                  </div>  
                </div>

                <div className="filterWrapper col-lg-8" style={{left:this.state.leftDrawerDisplay}}>
                  <div className='row'>
                    <LeftSideFilters />
                  </div>
                </div>
            </div>
          </div>

          <div className="col-lg-9">
            <div className="tab-content">
              <div id="mapwise" className="tab-pane fade in active">
                <ApplyJoblist />
              </div>
            </div>
          </div>
         
      </div>
    );
  }
}
