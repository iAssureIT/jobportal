import React, { Component } from 'react';
//import India from '../../maps/India/India.js';
import MapComponent from '../../maps/MapComponent/MapComponent.js';
import FunctionalAreawiseJobs from '../../blocks/FunctionalAreawiseJobs/FunctionalAreawiseJobs.js';
import IndustrywiseJobs from '../../blocks/IndustrywiseJobs/IndustrywiseJobs.js';
import LeftSideFilters from '../../blocks/LeftSideFilters/LeftSideFilters.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Axios        from 'axios';
import { withRouter }         from 'react-router-dom';
import { connect }        from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../common/actions/index';
import Loader from '../../common/Loader/Loader.js';
import './Homepage.css';

class HomePage extends Component {

  constructor(props){
    super(props);
    this.state={
      leftDrawerDisplay     : "-350px",
      arrowToggle           : false,
      //selector              : {},
      mapwiseJobs           : [],
      functonalAreaJobs     : [],
      subfunctonalAreaJobs  : [],    
    }
  }
  componentDidMount(){ 
    console.log("location",window.location.pathname)  
    var {mapAction} = this.props;
    var selector = this.props.selector;
    
    selector.countryCode = "IN"; 
    if (window.location.pathname.split("/")[1] == "state" ) {
      selector.stateCode = window.location.pathname.split("/")[2] 
    }    
    //selector.stateCode = stateCode; 

    mapAction.filterMapData(selector);
    mapAction.setMapView("India");
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
  changeViewMode(viewMode){
    var {mapAction} = this.props;
    mapAction.setViewMode(viewMode);
    mapAction.jobCount(this.props.selector);
    
    if (viewMode=="mapView") {
      mapAction.filterMapData(this.props.selector);
    }
    if (viewMode=="functionalView") {
      mapAction.filterFunctionalData(this.props.selector);
    }
    if (viewMode=="subfunctionalView") {
      mapAction.filterSubfunctionalData(this.props.selector);
    }
    if (viewMode=="industrialView") {
      mapAction.filterIndustrialData(this.props.selector);
    }
  }
  render() {
    
    return (
      <div className="ViewBodyWrapper container-fluid">

          <div className="filterDiv col-lg-12">

            <div className="row">
              <div className="filterButton" onClick={this.leftDrawerInfo.bind(this)}>
               
                <i className="fa fa-filter filtersIcon" ></i>
                <i className={this.state.arrowToggle ? "fa fa-arrow-left arrowIcon" : "fa fa-arrow-right arrowIcon"} 
                              value={this.state.arrowToggle}></i>

                &nbsp; Filters              
              </div>
            </div>
          </div>

          <div className=" col-lg-3">
            <div className='row'>
                <div className="viewWrapper col-lg-4">
                  <div className='row'>
                    <ul className="nav nav-pills">
                      <li className="viewDiv active" onClick={this.changeViewMode.bind(this,"mapView")}>
                        <a data-toggle="pill" href="#mapwise" > Map <br/> View</a> 
                      </li>

                      <li className="viewDiv" onClick={this.changeViewMode.bind(this,"functionalView")}>  
                        <a data-toggle="pill" href="#functionwise">Functional <br/> View</a>
                      </li>

                      <li className="viewDiv" onClick={this.changeViewMode.bind(this,"industrialView")}>
                        <a data-toggle="pill" href="#industrywise">Industrial <br/> View</a>
                      </li>

                    </ul>
                  </div>  
                </div>

                <div className="filterWrapper col-lg-8" style={{left:this.state.leftDrawerDisplay}}>
                  
                    <LeftSideFilters />
                 
                </div>
            </div>
          </div>

          <div className="col-lg-9">
            <div className="tab-content">
              <div id="mapwise" className="tab-pane fade in active">
                <MapComponent />
              </div>

              <div id="functionwise" className="tab-pane fade">
                { this.props.showLoader ? <Loader type="placeholderloader"  /> :
                <FunctionalAreawiseJobs functionalJobs={this.props.functionalJobs}/> }
              </div>

              <div id="industrywise" className="tab-pane fade">
              { this.props.showLoader ? <Loader type="placeholderloader"  /> :
                <IndustrywiseJobs industrialJobs={this.props.industrialJobs}/> }
              </div>
            </div>
          </div>
         
      </div>
    );
  }
}
const mapStateToProps = (state)=>{

    return {
        selector          : state.selector,
        mapJobs           : state.mapJobs,
        functionalJobs    : state.functionalJobs,
        subfunctionalJobs : state.subfunctionalJobs,
        industrialJobs    : state.industrialJobs,
        showLoader        : state.showLoader
    }
}
const mapDispatchToProps = (dispatch) => ({
  mapAction :  bindActionCreators(mapActionCreator, dispatch)
}) 

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomePage));