import React, { Component } from 'react';
//import India from '../../maps/India/India.js';
import MapComponent from '../../maps/MapComponent/MapComponent.js';
import FunctionalComponent from '../../blocks/FunctionalComponent/FunctionalComponent.js';
import IndustrialComponent from '../../blocks/IndustrialComponent/IndustrialComponent.js';

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
      leftDrawerDisplay     : "-610px",
      arrowToggle           : false,
      //selector              : {},
      mapwiseJobs           : [],
      functonalAreaJobs     : [],
      subfunctonalAreaJobs  : [],
      startLimit            : 0,
      initialLimit          : 25,
      showMoreLimit         : 25,   
    }
  } 
  componentDidMount(){ 
    
    console.log("this.props.viewMode",this.props.viewMode);

    var {mapAction} = this.props;
    var selector = this.props.selector;

    if (this.props.userDetails.loggedIn) {
      var appliedJobSelector  = this.props.appliedJobSelector;
      appliedJobSelector.candidate_id = this.props.userDetails.candidate_id;
      mapAction.getAppliedJoblist(appliedJobSelector);


      var jobWishlistSelector = this.props.jobWishlistSelector;
      jobWishlistSelector.candidate_id = this.props.userDetails.candidate_id;

      mapAction.getJobWishlist(jobWishlistSelector);
    } 
    
    
    selector.countryCode = "IN"; 
    
    //========== HomePage =============// 
    if(this.props.match.path=="/"){
      mapAction.filterMapData(selector);
    } 
    
    if(this.props.match.path=="/country/:countryCode/state/:stateCode/city/:district/industry/:industryName/:industry_id/function/:functionalArea/:functionalArea_id/subfunction/:subfunctionalArea/:subfunctionalArea_id"){
      
      selector.stateCode = this.props.match.params.stateCode 
      selector.district  = this.props.match.params.district

      if (this.props.match.params.functionalArea != "all") {
        var tempArray = [];
        tempArray.push({"functionalArea" : this.props.match.params.functionalArea, "id": this.props.match.params.functionalArea_id })
        selector.functionalArea_id = tempArray; 
      }
      if (this.props.match.params.subfunctionalArea != "all") {
        var tempArray2 = [];
        tempArray2.push({"subfunctionalArea" : this.props.match.params.subfunctionalArea, "id": this.props.match.params.subfunctionalArea_id })
        selector.subfunctionalArea_id = tempArray2;
      }
      
      if (this.props.match.params.industryName == "all" && this.props.match.params.functionalArea == "all") {
        mapAction.setViewMode("functionalView");
        mapAction.filterFunctionalData(selector);
      }else if(this.props.match.params.industryName == "all" && this.props.match.params.subfunctionalArea == "all"){
        
        mapAction.setViewMode("functionalView");
        mapAction.filterSubfunctionalData(selector);
      }else if(this.props.match.params.industryName != "all" && this.props.match.params.subfunctionalArea == "all"){
        var tempArray3 = [];
        tempArray3.push({"industry" : this.props.match.params.industryName, "id": this.props.match.params.industry_id })
        selector.industry_id = tempArray3;
        
        console.log("this.props.match.params.industry_id")

        selector.startLimit     = this.state.startLimit;
        selector.initialLimit   = this.state.initialLimit;
        selector.showMoreLimit  = this.state.showMoreLimit;

        mapAction.setViewMode("listView");
        mapAction.filterJobList(selector);
      }else if(this.props.match.params.industryName != "all" && this.props.match.params.functionalArea != "all" && this.props.match.params.subfunctionalArea != "all"){
        var tempArray3 = [];
        tempArray3.push({"industry" : this.props.match.params.industryName, "id": this.props.match.params.industry_id })
        selector.industry_id = tempArray3;
        

        console.log(this.props.match.params.industry_id)

        selector.startLimit     = this.state.startLimit;
        selector.initialLimit   = this.state.initialLimit;
        selector.showMoreLimit  = this.state.showMoreLimit;

        mapAction.setViewMode("listView");
        mapAction.filterJobList(selector);
      }
      else{
        
        selector.startLimit     = this.state.startLimit;
        selector.initialLimit   = this.state.initialLimit;
        selector.showMoreLimit  = this.state.showMoreLimit;

        mapAction.setViewMode("listView");
        mapAction.filterJobList(selector);
      }
      
      
    }
    /*if(this.props.match.path=="/country/:countryCode/state/:stateCode/city/:district/function/:functionalArea/:functionalArea_id/subfunction/:subfunctionalArea/:subfunctionalArea_id"){
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
    }*/
    mapAction.jobCount(selector)
    //selector.stateCode = stateCode; 
   
    
  }
  leftDrawerInfo(event){

    if(this.state.leftDrawerDisplay==="-380%"){
  
      this.setState({
      leftDrawerDisplay  : "0%",
      arrowToggle: true
      
      })
    }
    else{
      this.setState({
      leftDrawerDisplay  : "-380%",
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
      
      /*if (this.props.match.path=="/functional/:functionalArea/:functionalArea_id" ) {
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
      }*/

      mapAction.filterMapData(selector);
    }
    if (viewMode=="functionalView") {
      mapAction.filterFunctionalData(this.props.selector);
    }
    if (viewMode=="subfunctionalView") {
      mapAction.filterSubfunctionalData(this.props.selector);
    }
    if (viewMode=="industrialView") {
      if (this.props.match.path != "/") {
        var selector = this.props.selector;
        delete selector.functionalArea_id;
        delete selector.subfunctionalArea_id;
        console.log(selector)
        this.props.history.push("/country/"+this.props.match.params.countryCode+"/state/"+this.props.match.params.stateCode+"/city/"+this.props.match.params.district+"/industry/"+this.props.match.params.industryName+"/"+this.props.match.params.industry_id+"/function/all/0/subfunction/all/0");
      }
      if (this.props.match.path == "/" || this.props.match.params.industryName=="all") {
        //console.log("in if")
        mapAction.filterIndustrialData(selector);
      }else{

        mapAction.filterJobList(selector);
      }
    }
    if (viewMode=="listView") {

      mapAction.filterJobList(this.props.selector);
    }
    mapAction.jobCount(selector);
  }
  render() {
    //console.log(this.props.viewMode) 
    //console.log(this.props.match.params) 
    return (
      <div className="ViewBodyWrapper1 container-fluid">
        

        <div className="filterDiv col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">

          <div className="row">  
            <div className="filterButton col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1" onClick={this.leftDrawerInfo.bind(this)}>
              <div className="row"> 
                <i className="fa fa-filter filtersIcon" ></i>
                <i className={this.state.arrowToggle ? "fa fa-arrow-left arrowIcon" : "fa fa-arrow-right arrowIcon"} 
                              value={this.state.arrowToggle}></i>

                &nbsp; Filters              
              </div>
           </div>
          </div>
        </div>
        
          <div className=" col-lg-3">
            
                <div className="viewWrapper col-lg-4">
                  <div className='row'>
                    <ul className="nav nav-pills">
                      <li className={this.props.viewMode == "mapView" ? "viewDiv active" : "viewDiv"} onClick={this.changeViewMode.bind(this,"mapView")}>
                        <a data-toggle="pill" href="#mapwise" > Map <br/> View</a> 
                      </li>

                      <li className={
                        this.props.match.params.industryName == "all" && (this.props.viewMode == "functionalView" || this.props.viewMode == "listView") 
                        ? "viewDiv active" : 
                        this.props.match.params.industryName != "all" && this.props.match.params.functionalArea != "all" && (this.props.viewMode == "functionalView" || this.props.viewMode == "listView") 
                        ? "viewDiv active" : "viewDiv" } 
                        onClick={this.changeViewMode.bind(this,this.props.match.path == "/" ? "functionalView" : this.props.match.params.subfunctionalArea == "all" ? "functionalView" : "listView")}>  
                        <a data-toggle="pill" href="#functionwise">Functional <br/> View</a>
                      </li>

                      <li className={
                        this.props.match.params.industryName != "all" && this.props.match.params.functionalArea == "all" && (this.props.viewMode == "industrialView" || this.props.viewMode == "listView") 
                        ? "viewDiv active" : "viewDiv"} 
                        onClick={this.changeViewMode.bind(this, this.props.match.path == "/" ? "industrialView" : this.props.match.params.industryName == "all" ? "industrialView" : "listView") }>
                        <a data-toggle="pill" href="#industrywise">Industrial <br/> View</a>
                      </li>

                    </ul>
                  </div>  
                </div>

                <div className="filterWrapper col-lg-8" style={{left:this.state.leftDrawerDisplay}}>
                    <LeftSideFilters />
                </div>
           
          </div>

          <div className="col-lg-9">
            <div className="tab-content">
              <div id="mapwise" className= {this.props.viewMode == "mapView" ? "tab-pane fade in active show" : "tab-pane fade" }>
                <MapComponent pathname={this.props.match}/> 
              </div>

              <div id="functionwise" className= {
                      this.props.match.params.industryName == "all" && (this.props.viewMode == "functionalView" || this.props.viewMode == "listView")  
                      ? "tab-pane fade in active" :
                      //this.props.match.params.industryName != "all" && this.props.match.params.functionalArea_id != "all" && this.props.match.params.subfunctionalArea_id != "all" && (this.props.viewMode == "functionalView" || this.props.viewMode == "listView") 
                      //? "tab-pane fade in active" :
                      this.props.match.params.industryName != "all" && this.props.match.params.functionalArea != "all" && (this.props.viewMode == "functionalView" || this.props.viewMode == "listView") 

                      ? "tab-pane fade in active"  : "tab-pane fade in" } >
                
                { this.props.showLoader ?  
                    this.props.viewMode == "functionalView" ? <Loader type="placeholderloader"  />  : 
                    this.props.viewMode == "listView" ? <Loader type="joblistloader"  />  : <FunctionalComponent pathname={this.props.match}/>
                  :  <FunctionalComponent pathname={this.props.match}/> }
              </div>

              <div id="industrywise" className={
                //this.props.match.params.industryName != "all" && this.props.match.params.functionalArea != "all" && (this.props.viewMode == "industrialView" || this.props.viewMode == "listView") 
                //? "tab-pane fade in active" :
                this.props.match.params.industryName != "all" && this.props.match.params.functionalArea == "all" && (this.props.viewMode == "functionalView" || this.props.viewMode == "listView") 
                ? "tab-pane fade in active" : "tab-pane fade" }>
              
              { this.props.showLoader ? 
                this.props.viewMode == "industrialView" ? <Loader type="placeholderloader"  />  : 
                this.props.viewMode == "listView" ? <Loader type="joblistloader"  />  : <IndustrialComponent pathname={this.props.match}/>
                : <IndustrialComponent pathname={this.props.match}/> }

              </div>
            </div>
          </div>
       
      </div>
    );
  }
}
const mapStateToProps = (state)=>{

    return {
        userDetails       : state.userDetails,
        selector          : state.selector,
        appliedJobSelector  : state.appliedJobSelector,
        jobWishlistSelector : state.jobWishlistSelector,
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