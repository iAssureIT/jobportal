import React, { Component } from 'react';
//import India from '../../maps/India/India.js';
import MapComponent from '../../maps/MapComponent/MapComponent.js';
import FunctionalComponent from '../../blocks/FunctionalComponent/FunctionalComponent.js';

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
    
    var {mapAction} = this.props;
    var selector = this.props.selector;
    
    selector.countryCode = "IN"; 
    console.log("path",this.props.match)
    //if (window.location.pathname.split("/")[1] == "state" ) {
    //========== HomePage =============// 
    if(this.props.match.path=="/"){
      mapAction.filterMapData(selector);
    } 
    if(this.props.match.path=="/country/:countryCode/state/:stateCode/city/:district/function/:functionalArea/:functionalArea_id"){
      
      selector.stateCode = this.props.match.params.stateCode 
      selector.district  = this.props.match.params.district

      var tempArray = [];
      tempArray.push({"functionalArea" : this.props.match.params.functionalArea, "id": this.props.match.params.functionalArea_id })
      selector.functionalArea_id = tempArray; 

      mapAction.filterSubfunctionalData(selector);
      mapAction.setViewMode("functionalView");
    }
    if(this.props.match.path=="/country/:countryCode/state/:stateCode/city/:district/function/:functionalArea/:functionalArea_id/subfunction/:subfunctionalArea/:subfunctionalArea_id"){
      selector.stateCode = this.props.match.params.stateCode 
      selector.district  = this.props.match.params.district
        
      var tempArray = [];
      tempArray.push({"functionalArea" : this.props.match.params.functionalArea, "id": this.props.match.params.functionalArea_id })
      selector.functionalArea_id = tempArray; 

      var tempArray2 = [];
      tempArray2.push({"subfunctionalArea" : this.props.match.params.subfunctionalArea, "id": this.props.match.params.subfunctionalArea_id })
      selector.subfunctionalArea_id = tempArray2;

      mapAction.filterJobList(selector);
      mapAction.setViewMode("functionalView");
    } 

    //============== StateWise ==========//
    if(this.props.match.path=="/state/:stateCode"){

      selector.stateCode = this.props.match.params.stateCode 
      mapAction.filterMapData(selector);
      mapAction.setViewMode("mapView");
    }  
    if(this.props.match.path=="/state/:stateCode/functional/:functionalArea/:functionalArea_id"){

      selector.stateCode = this.props.match.params.stateCode 
      var tempArray = [];
      tempArray.push({"functionalArea" : this.props.match.params.functionalArea, "id": this.props.match.params.functionalArea_id })
      selector.functionalArea_id = tempArray; 

      mapAction.filterSubfunctionalData(selector);
      mapAction.setViewMode("functionalView");
    } 
    if(this.props.match.path=="/state/:stateCode/subfunctional/:functionalArea/:functionalArea_id/:subfunctionalArea/:subfunctionalArea_id"){

      selector.stateCode = this.props.match.params.stateCode 
      var tempArray = [];
      tempArray.push({"functionalArea" : this.props.match.params.functionalArea, "id": this.props.match.params.functionalArea_id })
      selector.functionalArea_id = tempArray; 
      
      var tempArray2 = [];
      tempArray2.push({"subfunctionalArea" : this.props.match.params.subfunctionalArea, "id": this.props.match.params.subfunctionalArea_id })
      selector.subfunctionalArea_id = tempArray2; 
      
      mapAction.filterJobList(selector);
      mapAction.setViewMode("functionalView");
    }


    //============== DistrictWise ==========//
    
    if (this.props.match.path=="/state/:stateCode/:district" ) {
      selector.stateCode = this.props.match.params.stateCode
      selector.district  = this.props.match.params.district
      mapAction.filterFunctionalData(selector);
      mapAction.setViewMode("functionalView");
    }  
    if (this.props.match.path=="/state/:stateCode/:district/functional/:functionalArea/:functionalArea_id" ) {
      selector.stateCode = this.props.match.params.stateCode
      selector.district  = this.props.match.params.district
      var tempArray = [];
      tempArray.push({"functionalArea" : this.props.match.params.functionalArea, "id": this.props.match.params.functionalArea_id })
      selector.functionalArea_id = tempArray; 

      mapAction.filterSubfunctionalData(selector);
      mapAction.setViewMode("functionalView");
    }
    if (this.props.match.path=="/state/:stateCode/:district/subfunctional/:functionalArea/:functionalArea_id/:subfunctionalArea/:subfunctionalArea_id" ) {
      selector.stateCode = this.props.match.params.stateCode
      selector.district  = this.props.match.params.district

      var tempArray = [];
      tempArray.push({"functionalArea" : this.props.match.params.functionalArea, "id": this.props.match.params.functionalArea_id })
      selector.functionalArea_id = tempArray; 

      var tempArray2 = [];
      tempArray2.push({"subfunctionalArea" : this.props.match.params.subfunctionalArea, "id": this.props.match.params.subfunctionalArea_id })
      selector.subfunctionalArea_id = tempArray2; 
      
      mapAction.filterJobList(selector);
      mapAction.setViewMode("functionalView");
    }
    mapAction.jobCount(selector)
    //selector.stateCode = stateCode; 
   
    
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

    var selector = this.props.selector;
    selector.countryCode = "IN"; 
    
    
    if (viewMode=="mapView") {
      
      if (this.props.match.path=="/functional/:functionalArea/:functionalArea_id" ) {
        delete selector.functionalArea_id;
        this.props.history.push("/");
      }
      if (this.props.match.path=="/subfunctional/:functionalArea/:functionalArea_id/:subfunctionalArea/:subfunctionalArea_id" ) {
        delete selector.functionalArea_id;
        delete selector.subfunctionalArea_id;
        this.props.history.push("/");
      }
      if (this.props.match.path=="/state/:stateCode/functional/:functionalArea/:functionalArea_id" ) {
        delete selector.functionalArea_id;
        this.props.history.push("/state/"+this.props.match.params.stateCode);
      }
      if (this.props.match.path=="/state/:stateCode/subfunctional/:functionalArea/:functionalArea_id/:subfunctionalArea/:subfunctionalArea_id" ) {
        
        delete selector.functionalArea_id;
        delete selector.subfunctionalArea_id;
        this.props.history.push("/state/"+this.props.match.params.stateCode);
      }

      if (this.props.match.path=="/state/:stateCode/:district" ) {
        delete selector.functionalArea_id;
        delete selector.subfunctionalArea_id;
        this.props.history.push("/state/"+this.props.match.params.stateCode);
      }
      if (this.props.match.path=="/state/:stateCode/:district/functional/:functionalArea/:functionalArea_id" ) {
        delete selector.functionalArea_id;
        delete selector.subfunctionalArea_id;
        this.props.history.push("/state/"+this.props.match.params.stateCode);
      }
      if (this.props.match.path=="/state/:stateCode/:district/subfunctional/:functionalArea/:functionalArea_id/:subfunctionalArea/:subfunctionalArea_id" ) {
        delete selector.functionalArea_id;
        delete selector.subfunctionalArea_id;
        this.props.history.push("/state/"+this.props.match.params.stateCode);
      }
      mapAction.filterMapData(selector);
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
    mapAction.jobCount(selector);
  }
  render() {
    console.log(this.props.selector)
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
                      <li className={this.props.viewMode == "mapView" ? "viewDiv active" : "viewDiv"} onClick={this.changeViewMode.bind(this,"mapView")}>
                        <a data-toggle="pill" href="#mapwise" > Map <br/> View</a> 
                      </li>

                      <li className={this.props.viewMode == "functionalView" ? "viewDiv active" : "viewDiv"} onClick={this.changeViewMode.bind(this,"functionalView")}>  
                        <a data-toggle="pill" href="#functionwise">Functional <br/> View</a>
                      </li>

                      <li className={this.props.viewMode == "industrialView" ? "viewDiv active" : "viewDiv"} onClick={this.changeViewMode.bind(this,"industrialView")}>
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
              <div id="mapwise" className= {this.props.viewMode == "mapView" ? "tab-pane fade in active" : "tab-pane fade" }>
                <MapComponent pathname={this.props.match}/> 
              </div>

              <div id="functionwise" className= {this.props.viewMode == "functionalView" ? "tab-pane fade in active" : "tab-pane fade" } >
                { this.props.showLoader ? <Loader type="placeholderloader"  /> :
                <FunctionalComponent pathname={this.props.match}/> }
              </div>

              <div id="industrywise" className={this.props.viewMode == "industrialView" ? "tab-pane fade in active" : "tab-pane fade" }>
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
        showLoader        : state.showLoader,
        viewMode          : state.viewMode
    }
}
const mapDispatchToProps = (dispatch) => ({
  mapAction :  bindActionCreators(mapActionCreator, dispatch)
}) 

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomePage));