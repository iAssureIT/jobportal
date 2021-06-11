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
import './HomepageMedia.css';

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
      if (this.props.match.params.industryName == "all" && this.props.match.params.functionalArea == "all" && this.props.match.params.subfunctionalArea == "all") {
        mapAction.setViewMode("mapView");
        mapAction.setListMode(0);
        mapAction.filterMapData(selector);
      }
      else if(this.props.match.params.industryName != "all" && this.props.match.params.functionalArea != "all" && this.props.match.params.subfunctionalArea == "all"){
        //console.log("elessdsds1")
        var tempArray3 = [];
        tempArray3.push({"industry" : this.props.match.params.industryName, "id": this.props.match.params.industry_id })
        selector.industry_id = tempArray3;
        
        selector.startLimit     = this.state.startLimit;
        selector.initialLimit   = this.state.initialLimit;
        selector.showMoreLimit  = this.state.showMoreLimit;
        mapAction.setListMode(0);
        mapAction.setViewMode("functionalView");
        mapAction.filterSubfunctionalData(selector);
      }
      else if(this.props.match.params.industryName == "all" && this.props.match.params.functionalArea != "all" && this.props.match.params.subfunctionalArea == "all"){
        console.log("elessdsds1")        
        selector.startLimit     = this.state.startLimit;
        selector.initialLimit   = this.state.initialLimit;
        selector.showMoreLimit  = this.state.showMoreLimit;
        mapAction.setListMode(0);
        mapAction.setViewMode("functionalView");
        mapAction.filterSubfunctionalData(selector);
      }
      else if (this.props.match.params.industryName == "all" && this.props.match.params.functionalArea == "all") {
        mapAction.setViewMode("functionalView");
        mapAction.setListMode(0);
        mapAction.filterFunctionalData(selector);
      }
      else if (this.props.match.params.industryName == "all" && this.props.match.params.subfunctionalArea == "all") {
        console.log("elessdsds2")
        mapAction.setViewMode("functionalView");
        mapAction.setListMode(0);
        mapAction.filterFunctionalData(selector);
      }
      else if(this.props.match.params.industryName != "all" && this.props.match.params.subfunctionalArea == "all"){
        var tempArray3 = [];
        tempArray3.push({"industry" : this.props.match.params.industryName, "id": this.props.match.params.industry_id })
        selector.industry_id = tempArray3;
        
        selector.startLimit     = this.state.startLimit;
        selector.initialLimit   = this.state.initialLimit;
        selector.showMoreLimit  = this.state.showMoreLimit;
        mapAction.setListMode(1);
        mapAction.setViewMode("industrialView");
        mapAction.filterJobList(selector);
      }
      else if(this.props.match.params.industryName != "all" && this.props.match.params.functionalArea != "all" && this.props.match.params.subfunctionalArea != "all"){
        var tempArray3 = [];
        tempArray3.push({"industry" : this.props.match.params.industryName, "id": this.props.match.params.industry_id })
        selector.industry_id = tempArray3;
        

        console.log(this.props.match.params.industry_id)

        selector.startLimit     = this.state.startLimit;
        selector.initialLimit   = this.state.initialLimit;
        selector.showMoreLimit  = this.state.showMoreLimit;
        mapAction.setListMode(1);
        mapAction.setViewMode("functionalView");
        mapAction.filterJobList(selector);
      }
      else{
        
        selector.startLimit     = this.state.startLimit;
        selector.initialLimit   = this.state.initialLimit;
        selector.showMoreLimit  = this.state.showMoreLimit;

        mapAction.setListMode(1);
        mapAction.setViewMode("functionalView");
        mapAction.filterJobList(selector);
      }
    }
    
    mapAction.jobCount(selector)
    
    
  }
  leftDrawerInfo(event){

    if(this.state.leftDrawerDisplay==="none"){
  
      this.setState({
      leftDrawerDisplay  : "block",
      arrowToggle: true
      
      })
    }
    else{
      this.setState({
      leftDrawerDisplay  : "none",
      arrowToggle:false
      })
    }
  }
  changeViewMode(viewMode){
    
    var {mapAction} = this.props;
    mapAction.setViewMode(viewMode);

    var selector = this.props.selector;
    selector.countryCode = "IN"; 
    console.log(viewMode)
    if (viewMode=="mapView") {      
      mapAction.setListMode(0);
      mapAction.filterMapData(selector);
    }
    if (viewMode=="functionalView") {
      if (this.props.match.path=="/") {
        mapAction.setListMode(0);
        mapAction.filterFunctionalData(this.props.selector);
      }else{
        if (this.props.match.params.subfunctionalArea != "all") {
          mapAction.setListMode(1);
          if (this.props.match.path != "/") {
            var selector = this.props.selector;
            delete selector.functionalArea_id;
            delete selector.subfunctionalArea_id;
            console.log(selector)
            this.props.history.push("/country/"+this.props.match.params.countryCode+"/state/"+this.props.match.params.stateCode+"/city/"+this.props.match.params.district+"/industry/"+this.props.match.params.industryName+"/"+this.props.match.params.industry_id+"/function/all/0/subfunction/all/0");
          }
          mapAction.filterJobList(selector);

        }else{
          var selector = this.props.selector;
          delete selector.functionalArea_id;
          delete selector.subfunctionalArea_id;
          mapAction.setListMode(0);
          mapAction.filterFunctionalData(selector);
        }
      }      
    }
    if (viewMode=="subfunctionalView") {
      mapAction.setListMode(0);
      mapAction.filterSubfunctionalData(this.props.selector);
    }
    if (viewMode=="industrialView") {
      //
      if (this.props.match.path != "/") {
        var selector = this.props.selector;
        delete selector.functionalArea_id;
        delete selector.subfunctionalArea_id;
        console.log(selector)
        this.props.history.push("/country/"+this.props.match.params.countryCode+"/state/"+this.props.match.params.stateCode+"/city/"+this.props.match.params.district+"/industry/"+this.props.match.params.industryName+"/"+this.props.match.params.industry_id+"/function/all/0/subfunction/all/0");
      }
      if (this.props.match.path == "/" || this.props.match.params.industryName=="all") {
        mapAction.setListMode(0);
        mapAction.filterIndustrialData(selector);
      }else{
        if (this.props.match.path != "/") {
          var selector = this.props.selector;
          delete selector.functionalArea_id;
          delete selector.subfunctionalArea_id;
          console.log(selector)
          this.props.history.push("/country/"+this.props.match.params.countryCode+"/state/"+this.props.match.params.stateCode+"/city/"+this.props.match.params.district+"/industry/"+this.props.match.params.industryName+"/"+this.props.match.params.industry_id+"/function/all/0/subfunction/all/0");
        }
        if (this.props.match.params.industryName != "all") {
          mapAction.setListMode(1);
        }
        
        mapAction.filterJobList(selector);
      }
    }
    
    mapAction.jobCount(selector);
  }
  render() {
    console.log("props viewmode",this.props.listView)
    //console.log(this.props.match)
    var mapactiveDivClass="viewDiv"
    var funactiveDivClass="viewDiv" 
    var indactiveDivClass="viewDiv"

    if (this.props.viewMode == "mapView") {
      mapactiveDivClass="viewDiv active"
      funactiveDivClass="viewDiv" 
      indactiveDivClass="viewDiv"
    }
    else if (this.props.viewMode == "functionalView") {
      mapactiveDivClass="viewDiv"
      funactiveDivClass="viewDiv active" 
      indactiveDivClass="viewDiv"
    }
    else if (this.props.viewMode == "industrialView") {
      mapactiveDivClass="viewDiv"
      funactiveDivClass="viewDiv"
      indactiveDivClass="viewDiv active"
    }

    
    //console.log("activeDivClass",mapactiveDivClass)
    //console.log("funactiveDivClass",funactiveDivClass)
    //console.log("indactiveDivClass",indactiveDivClass)
    return (
        
        <div className="ViewBodyWrapper1">
            
              
                <div className="filterDiv col-12 ">
                  <div className="row">
                    <div className=" col-1 col-sm-1 col-md-2 col-lg-1 col-xl-1">
                   
                      <div className="filterButton col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12  " onClick={this.leftDrawerInfo.bind(this)}>
                        <div className="row"> 
                          <i className="col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 fa fa-filter filtersIcon" ></i>
                          <i className={this.state.arrowToggle ? "col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 fa fa-arrow-left arrowIcon" : "col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 fa fa-arrow-right arrowIcon"} 
                                        value={this.state.arrowToggle}></i>     
                          <div className="row d-none d-md-block col-md-6 col-lg-6 col-xl-6">&nbsp;Filter </div>      
                        </div>
                     </div>
                    </div>
                  </div>
                </div>
              
              
                <div className="floatLeft col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">
                     <div className="row">  
                        <div className="floatLeft viewWrapper col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
                          <div className="row">
                           
                                <div className="floatLeft col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <div className="row">
                                    <div className="floatLeft col-4 col-sm-4 col-md-4 col-lg-12 col-xl-12">
                                      <div className={mapactiveDivClass} onClick={this.changeViewMode.bind(this,"mapView")}  data-toggle="pill" href="#mapwise">
                                       
                                          Map  View
                                        
                                      </div>
                                    </div>
                                    <div className="floatLeft col-4 col-sm-4 col-md-4 col-lg-12 col-xl-12">
                                      <div className={funactiveDivClass } 
                                        onClick={this.changeViewMode.bind(this, "functionalView")} data-toggle="pill" href="#functionwise">  
                                       Functional  View
                                      </div>
                                    </div>
                                    <div className="floatLeft col-4 col-sm-4 col-md-4 col-lg-12 col-xl-12">
                                      <div className={indactiveDivClass} 
                                        onClick={this.changeViewMode.bind(this,  "industrialView" ) } data-toggle="pill" href="#industrywise">
                                       Industrial View
                                      </div>
                                    </div>
                                  </div>
                                </div>
                          </div>
                        </div>
                     
                      
                        <div className="floatLeft filtersWrapper col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8" style={{display:this.state.leftDrawerDisplay}}> 
                            <LeftSideFilters /> 
                        </div>
                     </div>  
                </div>

         

                <div className="floatLeft col-12 col-sm-12 col-md-12 col-lg-9 col-xl-9">
                  <div className="row">
                      <div className="tab-content col-12">
                        
                            <div id="mapwise" className= {this.props.viewMode == "mapView" ? "tab-pane fade in active show overFlow col-12" : "tab-pane fade" }>
                              <MapComponent pathname={this.props.match}/> 
                            </div>

                            <div id="functionwise" className= {
                                    this.props.match.params.industryName == "all" && (this.props.viewMode == "functionalView")  
                                    ? "tab-pane fade in active show" :
                                    this.props.match.params.industryName != "all" && this.props.match.params.functionalArea != "all" && (this.props.viewMode == "functionalView" ) 

                                    ? "tab-pane fade in active show"  : "tab-pane fade in" } >
                              
                              { this.props.showLoader ?  
                                  this.props.viewMode == "functionalView" &&  this.props.listView == 0  ? <Loader type="placeholderloader"  />  : 
                                  this.props.listView == 1 ? <Loader type="joblistloader"  />  : <FunctionalComponent pathname={this.props.match}/>
                                :  <FunctionalComponent pathname={this.props.match}/> }
                            </div>

                            <div id="industrywise" className={
                              this.props.match.params.industryName != "all" && this.props.match.params.functionalArea == "all" && (this.props.viewMode == "industrialView") 
                              ? "tab-pane fade in active show" : "tab-pane fade" }>
                                      
                                      { this.props.showLoader ? 
                                        this.props.viewMode == "industrialView" &&  this.props.listView == 0 ? <Loader type="placeholderloader"  />  : 
                                        this.props.listView ? <Loader type="joblistloader"  />  : <IndustrialComponent pathname={this.props.match}/>
                                        : <IndustrialComponent pathname={this.props.match}/> }

                            </div>
                       
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
        viewMode          : state.viewMode,
        listView          : state.listView
    }
}
const mapDispatchToProps = (dispatch) => ({
  mapAction :  bindActionCreators(mapActionCreator, dispatch)
}) 

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomePage));

