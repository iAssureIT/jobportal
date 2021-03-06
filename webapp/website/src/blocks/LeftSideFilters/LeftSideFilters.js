import React, {Component} from 'react';
import { Multiselect }    from 'multiselect-react-dropdown';
import Axios        from 'axios';
import Swal         from 'sweetalert2';

import './LeftSideFilters.css';
import { connect }        from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter }   from 'react-router-dom';

import  * as mapActionCreator from '../../common/actions/index.js';


class LeftSideFilters extends Component{

  constructor(props){
    super(props);
    
    this.state = {

      allIndustries         : [],
      allFunctionalAreas    : [],
      allSectors            : [],
      allRoles              : [],
      allJobTypes           : [],
      allJobTime            : [],
      allJobShift           : [],
      allSkills             : [],
      allQualifications     : [],
      inputRole             : [],

      allExperiences        : "",
      inputExperience       : [ {"experience": "0-1 year",  "minvalue": 0, "maxvalue": 1 },
                                {"experience": "1-3 years", "minvalue": 1, "maxvalue": 3 },
                                {"experience": "3-5 year",  "minvalue": 3, "maxvalue": 5 },
                                {"experience": "5-7 years", "minvalue": 5, "maxvalue": 7 },
                                {"experience": "7-10 years", "minvalue": 7, "maxvalue": 10 },
                                {"experience": "10-12 years", "minvalue": 10, "maxvalue": 12 }, 
                                {"experience": "12-15 years", "minvalue": 12, "maxvalue": 15 }   
                              ],
        
      industry              : [],
      functionalArea        : [],
      role                  : '-',
      experience            : '-',
      selector              : {},
      
    };

    this.style =  {
                chips: {
                  backgroundColor: "#D3950A",
                  overflow:"hidden!important",
                  whiteSpcae:"none!important",
                },
                searchBox: {
                  border: "1px solid #4b5666",
                  color:"#fff!important",
                  
                },
                multiselectContainer: {
                  backgroundColor: "#242931",
                  color: "#fff!important",
                  zIndex:"5!important",
                  
                }, 
                inputField: {
                 fontSize:"13.5px",
                 marginLeft:"5px",
                 zIndex:"5!important",
                 color: "#fff!important",
                },
                option: {
                  backgroundColor: "#242933",
                  zIndex:"5!important",
                  color: "#fff!important",
                  width:"auto!important",
                },
                optionContainer:{
                  border: "1px solid #4b5666",
                  zIndex:"5!important",
                  width:"auto!important",
                },

                showCheckbox: {
                   backgroundColor: "#D3950A!important",
                },

                multiselectContainer: {
                  color: "#fff!important",
                },

                placeholder:{
                  color : "#fff!important",
                }

            };
  }

  

 componentDidMount(){
  let allIndustries       = [];
  let allFunctionalAreas  = [];
  let allSectors          = [];
  let allJobTypes         = [];
  let allJobTime          = [];
  let allJobShift         = [];
  let allRoles            = []; 
  let allSkills           = [];
  let allQualifications   = [];

      var {mapAction} = this.props;
      // const userDetails = JSON.parse(localStorage.getItem("userDetails"));
      // const token = userDetails.token;
      // Axios.defaults.headers.common['Authorization'] = 'Bearer '+ token;

      Axios.get("/api/industrymaster/get/list")
      .then(response => {
        
          response.data.map((elem,index)=>{
            allIndustries.push({industry:elem.industry,id:elem._id})             
          })
          this.setState({allIndustries:allIndustries})
            
      })
      .catch(error=>{
              Swal.fire('', "Error while getting industries list", ''); 
      })


      Axios.get("/api/functionalareamaster/get/list")
      .then(response => {
          response.data.map((elem,index)=>{
            
            allFunctionalAreas.push({functionalArea:elem.functionalArea,id:elem._id})
            
          })
          this.setState({allFunctionalAreas:allFunctionalAreas})
      })
      .catch(error=>{
        Swal.fire('', "Error while getting functional areas", '');
      })

      Axios.get("/api/jobsectormaster/get/list" )
      .then(response => {
        response.data.map((elem,index)=>{
            
            allSectors.push({jobSector : elem.jobSector, id: elem._id});
        })
        this.setState({allSectors:allSectors})
      })
      .catch(error=>{
        Swal.fire('', "Error while getting job sectors", '');
      })

      Axios.get("/api/jobtypemaster/get/list")
      .then(response => {
        response.data.map((elem,index)=>{
            
            allJobTypes.push({jobType : elem.jobType, id: elem._id});
        })
        this.setState({allJobTypes:allJobTypes})
      })
      .catch(error=>{
        Swal.fire('', "Error while getting job type", '');
      })
      
      Axios.get("/api/jobtimemaster/get/list")
      .then(response => {
        response.data.map((elem,index)=>{
            
            allJobTime.push({jobTime : elem.jobTime, id: elem._id});
        })
        this.setState({allJobTime:allJobTime})
      })
      .catch(error=>{
        Swal.fire('', "Error while getting job time", '');
      })

      Axios.get("/api/jobshiftmaster/get/list")
      .then(response => {
        response.data.map((elem,index)=>{
            
            allJobShift.push({jobShift : elem.jobShift, id: elem._id});
        })
        this.setState({allJobShift:allJobShift})
      })
      .catch(error=>{
        Swal.fire('', "Error while getting job shift", '');
      })

      Axios.get("/api/jobrolemaster/get/list")
      .then(response => {
        response.data.map((elem,index)=>{
            
            allRoles.push({jobRole : elem.jobRole, id: elem._id});
        })
        this.setState({allRoles:allRoles})
      })
      .catch(error=>{
        Swal.fire('', "Error while getting job roles", '');
      })

      Axios.get("/api/skillmaster/get/list")
      .then(response => {
        response.data.map((elem,index)=>{
            allSkills.push({skill : elem.skill, id: elem._id});
        })
        this.setState({allSkills:allSkills})
      })
      .catch(error=>{
        Swal.fire('', "Error while getting skill", '');
      })
      
      Axios.get("/api/qualificationmaster/get/list")
      .then(response => {
        response.data.map((elem,index)=>{
            allQualifications.push({qualification : elem.qualification, id: elem._id});
        })
        this.setState({allQualifications:allQualifications})
      })
      .catch(error=>{
        Swal.fire('', "Error while getting skill", '');
      })
      
  }
  onSelect(selectedList, selectedItem) {
    console.log(selectedList)
    //console.log(selectedItem)
  }
   
  onRemove(selectedList, removedItem) {
     console.log(selectedList)
  }

  onSelectedItemsChange(filterType, selecteditems){
    var selector=this.state.selector;
    
    var {mapAction} = this.props;
    console.log(selecteditems)
    //selector.countryCode = "IN"; 
    
    //selector.stateCode = selecteditems.currentTarget.value; 
    // if (this.props.match.path=="/") {
    //   selector.stateCode = this.props.match.params.stateCode
    // }
    if (this.props.match.path=="/country/:countryCode/state/:stateCode/city/:district/industry/:industryName/:industry_id/function/:functionalArea/:functionalArea_id/subfunction/:subfunctionalArea/:subfunctionalArea_id") {
      
      selector.stateCode = this.props.match.params.stateCode
      selector.district = this.props.match.params.district
      if (this.props.match.params.functionalArea != "all") {
        var tempArray = [];
        tempArray.push({"functionalArea" : this.props.match.params.functionalArea, "id": this.props.match.params.functionalArea_id })
        selector.functionalArea_id = tempArray; 
      }
      if (this.props.match.params.subfunctionalArea != "all") {
        var tempArray = [];
        tempArray.push({"subfunctionalArea" : this.props.match.params.subfunctionalArea, "id": this.props.match.params.subfunctionalArea_id })
        selector.subfunctionalArea_id = tempArray;  
      }
      if (this.props.match.params.industryName != "all") {
        var tempArray = [];
        tempArray.push({"industry" : this.props.match.params.industry, "id": this.props.match.params.industry_id })
        selector.industry_id = tempArray
      }
    }
    //console.log(selector)
    if (filterType === 'industry') {
      if (selecteditems.length > 0) {
        selector.industry_id = selecteditems;
      }else{
        delete selector.industry_id;
      }
    }

    if (filterType === 'functionalArea') {
      if (selecteditems.length > 0) {
        selector.functionalArea_id = selecteditems;
      }else{
        delete selector.functionalArea_id
      }
    }
    if (filterType === 'jobSector') {
      if (selecteditems.length > 0) {
        selector.jobSector_id = selecteditems;
      }else{
        delete selector.jobSector_id
      }
    }
    if (filterType === 'jobType') {
      if (selecteditems.length > 0) {
        selector.jobType_id = selecteditems;
      }else{
        delete selector.jobType_id
      }
    }
    if (filterType === 'jobTime') {
      if (selecteditems.length > 0) {
        selector.jobTime_id = selecteditems;
      }else{
        delete selector.jobTime_id
      }
    }
    if (filterType === 'jobShift') {
      if (selecteditems.length > 0) {
        selector.jobShift_id = selecteditems;
      }else{
        delete selector.jobShift_id
      }
    }
    if (filterType === 'jobRole') {
      if (selecteditems.length > 0) {
        selector.jobRole_id = selecteditems;
      }else{
        delete selector.jobRole_id
      }
    }
    if (filterType === 'skill') {
      if (selecteditems.length > 0) {
        selector.skill_id = selecteditems;
      }else{
        delete selector.skill_id
      }
    }
    if (filterType === 'qualification') {
      if (selecteditems.length > 0) {
        selector.qualification_id = selecteditems;
      }else{
        delete selector.qualification_id
      }
    }
    if (filterType === "experience") {
      var flattened = [], minValue, maxValue;
      selecteditems.forEach(function (v) {
        flattened.push(v.minvalue)
        flattened.push(v.maxvalue)
      });
      minValue = Math.min.apply(null, flattened);
      maxValue = Math.max.apply(null, flattened);

      //console.log('min: ' + minValue, ' max: ' + maxValue);

      selector.minExp = minValue
      selector.maxExp = maxValue
    }
    
    selector.startLimit     = 0;
    selector.initialLimit   = 25;
    selector.showMoreLimit  = 25;
    
    this.setState({ selector: selector },()=>{
      console.log(this.state.selector)
        mapAction.jobCount(this.state.selector);
      if (this.props.viewMode=="mapView" ) {
        mapAction.filterMapData(selector);
      }
      // if (this.props.viewMode=="mapView" && this.props.match.path == "/country/:countryCode/state/:stateCode/city/:district/industry/:industryName/:industry_id/function/:functionalArea/:functionalArea_id/subfunction/:subfunctionalArea/:subfunctionalArea_id") {
        
      //   if (this.props.match.params.functionalArea == "all") {
      //     selector.
      //   }
      //   mapAction.filterMapData(selector);
      // }
      if (this.props.viewMode=="functionalView" && this.props.match.path == '/' ) {
        mapAction.filterFunctionalData(this.state.selector);
      }
      if (this.props.viewMode=="functionalView" && this.props.match.params.functionalArea == "all"
        && this.props.match.path == "/country/:countryCode/state/:stateCode/city/:district/industry/:industryName/:industry_id/function/:functionalArea/:functionalArea_id/subfunction/:subfunctionalArea/:subfunctionalArea_id" ) {
        mapAction.filterFunctionalData(this.state.selector);
      }
      // if (this.props.viewMode=="functionalView" && this.props.match.params.functionalArea == "all") {
      //   mapAction.filterFunctionalData(this.state.selector);
      // }
      // if (this.props.viewMode=="functionalView" && this.props.match.params.functionalArea != "all") {
      //   mapAction.filterSubfunctionalData(this.state.selector);
      // }
      
      if (this.props.viewMode=="functionalView" && 
        this.props.match.path == "/country/:countryCode/state/:stateCode/city/:district/industry/:industryName/:industry_id/function/:functionalArea/:functionalArea_id/subfunction/:subfunctionalArea/:subfunctionalArea_id"
        && this.props.match.params.functionalArea != "all" && !this.props.listView) {
        mapAction.filterSubfunctionalData(this.state.selector);
      }
      if (this.props.viewMode=="industrialView") {
        mapAction.filterIndustrialData(this.state.selector);
      }
      if (this.props.listView) {
        console.log(this.state.selector)
        mapAction.filterJobList(this.state.selector);
      }
    })
    
  }

  render(){
    
    //console.log(this.state.allIndustries)
    //console.log(this.state.inputExperience)

    return(
      <section className="LeftSideFiltersWrapper">
      
        <div className="row">


                <div className="form-group col-4 col-sm-4 col-md-4 col-lg-12 col-xl-12">
                  <div className=''>
                    <div className="input-group ">
                      
                         <Multiselect className="form-control LeftSideFiltersInputBox LeftSideFiltersDrop"
                          id="allSectors" name="allSectors" placeholder="Sector"
                            options={this.state.allSectors}
                            displayValue="jobSector"
                            onSelect={this.onSelectedItemsChange.bind(this,'jobSector')} // Function will trigger on select event
                            onRemove={this.onSelectedItemsChange.bind(this,'jobSector')}
                              //showCheckbox={true}
                            style={this.style}
                         />    
                                       
                    </div>
                  </div>
                </div> 
                <div className="form-group col-4 col-sm-4 col-md-4 col-lg-12 col-xl-12">
                  <div className=''>
                    <div className="input-group">
                      
                         <Multiselect className="form-control LeftSideFiltersInputBox LeftSideFiltersDrop"
                          id="allJobTypes" name="allJobTypes" placeholder="Types"
                            options={this.state.allJobTypes}
                            displayValue="jobType"
                            onSelect={this.onSelectedItemsChange.bind(this,'jobType')} // Function will trigger on select event
                            onRemove={this.onSelectedItemsChange.bind(this,'jobType')}
                              //showCheckbox={true}
                              style={this.style}
                         />    
                                       
                    </div>
                  </div>
                </div> 
                <div className="form-group col-4 col-sm-4 col-md-4 col-lg-12 col-xl-12">
                  <div className=''>
                    <div className="input-group ">
                      
                         <Multiselect className="form-control LeftSideFiltersInputBox LeftSideFiltersDrop"
                          id="allJobTime" name="allJobTime" placeholder="Time"
                            options={this.state.allJobTime}
                            displayValue="jobTime"
                            onSelect={this.onSelectedItemsChange.bind(this,'jobTime')} // Function will trigger on select event
                            onRemove={this.onSelectedItemsChange.bind(this,'jobTime')}
                              //showCheckbox={true}
                              style={this.style}
                         />    
                                       
                    </div>
                  </div>
                </div>
                <div className="form-group col-4 col-sm-4 col-md-4 col-lg-12 col-xl-12">
                  <div className=''>
                    <div className="input-group ">
                      
                         <Multiselect className="form-control LeftSideFiltersInputBox LeftSideFiltersDrop"
                          id="allJobShift" name="allJobShift" placeholder="Shift"
                            options={this.state.allJobShift}
                            displayValue="jobShift"
                            onSelect={this.onSelectedItemsChange.bind(this,'jobShift')} // Function will trigger on select event
                            onRemove={this.onSelectedItemsChange.bind(this,'jobShift')}
                              //showCheckbox={true}
                              style={this.style}
                         />    
                                       
                    </div>
                  </div>
                </div>
                <div className="form-group col-4 col-sm-4 col-md-4 col-lg-12 col-xl-12">
                  <div className=''>
                    <div className="input-group">
                      
                         <Multiselect className="form-control LeftSideFiltersInputBox LeftSideFiltersDrop"
                          id="allRoles" name="allRoles" placeholder="Roles"
                            options={this.state.allRoles}
                            displayValue="jobRole"
                            onSelect={this.onSelectedItemsChange.bind(this,'jobRole')} // Function will trigger on select event
                            onRemove={this.onSelectedItemsChange.bind(this,'jobRole')}
                              //showCheckbox={true}
                              style={this.style}
                         />    
                                       
                    </div>
                  </div>
                </div> 
                <div className="form-group col-4 col-sm-4 col-md-4 col-lg-12 col-xl-12">
                    <div className=''>
                      <div className="input-group ">
                        
                           <Multiselect className="form-control LeftSideFiltersInputBox LeftSideFiltersDrop"
                            id="allSkills" name="allSkills" placeholder="Skills"
                              options={this.state.allSkills}
                              displayValue="skill"
                              onSelect={this.onSelectedItemsChange.bind(this,'skill')} // Function will trigger on select event
                              onRemove={this.onSelectedItemsChange.bind(this,'skill')}
                                //showCheckbox={true}
                                style={this.style}
                           />    
                                         
                      </div>
                    </div>
                </div>    
                <div className="form-group col-4 col-sm-4 col-md-4 col-lg-12 col-xl-12">
                    <div className=''>
                      <div className="input-group ">
                        
                           <Multiselect className="form-control LeftSideFiltersInputBox LeftSideFiltersDrop"
                            id="allQualifications" name="allQualifications" placeholder="Qualification"
                              options={this.state.allQualifications}
                              displayValue="qualification"
                              onSelect={this.onSelectedItemsChange.bind(this,'qualification')} // Function will trigger on select event
                              onRemove={this.onSelectedItemsChange.bind(this,'qualification')}
                                //showCheckbox={true}
                                style={this.style}
                           />    
                                         
                      </div>
                    </div>
                </div>
                <div className="form-group col-4 col-sm-4 col-md-4 col-lg-12 col-xl-12">
                  <div className="">
                    <div className="input-group ">
                      
                         <Multiselect className="form-control LeftSideFiltersInputBox LeftSideFiltersDrop"
                          id="allExperiences" name="aallExperiences" placeholder="Experience"
                          
                            options={this.state.inputExperience}
                            displayValue="experience" 
                            onSelect={this.onSelectedItemsChange.bind(this,'experience')} // Function will trigger on select event
                            onRemove={this.onSelectedItemsChange.bind(this,'experience')}

                              //showCheckbox={true}
                              style={this.style}
                         />    
                                     
                    </div>
                  </div>
                </div> 
          </div>
        
       </section>
    );
  }

}


const mapStateToProps = (state)=>{
    return {
            selector    : state.selector,
            viewMode    : state.viewMode, listView: state.listView
    }
}
const mapDispatchToProps = (dispatch) => ({
    mapAction :  bindActionCreators(mapActionCreator, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(LeftSideFilters));