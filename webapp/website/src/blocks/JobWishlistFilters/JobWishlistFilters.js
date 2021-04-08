import React, {Component} from 'react';
import { Multiselect }    from 'multiselect-react-dropdown';
import Axios        from 'axios';
import Swal         from 'sweetalert2';

import './JobWishlistFilters.css';
import { connect }        from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter }   from 'react-router-dom';

import  * as mapActionCreator from '../../common/actions/index.js';


class JobWishlistFilters extends Component{

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
      appliedJobSelector    : {},
      
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

      Axios.get("/api/industrymaster/get/list")
      .then(response => {
        
          response.data.map((elem,index)=>{
            allIndustries.push({industry:elem.industry,id:elem._id})             
          })
          this.setState({allIndustries:allIndustries})
            
      })
      .catch(error=>{
        Swal.fire("Error while getting  industries",error.message,'error');
      })


      Axios.get("/api/functionalareamaster/get/list")
      .then(response => {
          response.data.map((elem,index)=>{
            
            allFunctionalAreas.push({functionalArea:elem.functionalArea,id:elem._id})
            
          })
          this.setState({allFunctionalAreas:allFunctionalAreas})
      })
      .catch(error=>{
        Swal.fire("Error while getting functional areas",error.message,'error');
      })

      Axios.get("/api/jobsectormaster/get/list")
      .then(response => {
        response.data.map((elem,index)=>{
            
            allSectors.push({jobSector : elem.jobSector, id: elem._id});
        })
        this.setState({allSectors:allSectors})
      })
      .catch(error=>{
        Swal.fire("Error while getting job sectors",error.message,'error');
      })

      Axios.get("/api/jobtypemaster/get/list")
      .then(response => {
        response.data.map((elem,index)=>{
            
            allJobTypes.push({jobType : elem.jobType, id: elem._id});
        })
        this.setState({allJobTypes:allJobTypes})
      })
      .catch(error=>{
        Swal.fire("Error while getting job type",error.message,'error');
      })
      
      Axios.get("/api/jobtimemaster/get/list")
      .then(response => {
        response.data.map((elem,index)=>{
            
            allJobTime.push({jobTime : elem.jobTime, id: elem._id});
        })
        this.setState({allJobTime:allJobTime})
      })
      .catch(error=>{
        Swal.fire("Error while getting job time",error.message,'error');
      })

      Axios.get("/api/jobshiftmaster/get/list")
      .then(response => {
        response.data.map((elem,index)=>{
            
            allJobShift.push({jobShift : elem.jobShift, id: elem._id});
        })
        this.setState({allJobShift:allJobShift})
      })
      .catch(error=>{
        Swal.fire("Error while getting job shift",error.message,'error');
      })

      Axios.get("/api/jobrolemaster/get/list")
      .then(response => {
        response.data.map((elem,index)=>{
            
            allRoles.push({jobRole : elem.jobRole, id: elem._id});
        })
        this.setState({allRoles:allRoles})
      })
      .catch(error=>{
        Swal.fire("Error while getting job roles",error.message,'error');
      })

      Axios.get("/api/skillmaster/get/list")
      .then(response => {
        response.data.map((elem,index)=>{
            allSkills.push({skill : elem.skill, id: elem._id});
        })
        this.setState({allSkills:allSkills})
      })
      .catch(error=>{
        Swal.fire("Error while getting skill",error.message,'error');
      })
      
      Axios.get("/api/qualificationmaster/get/list")
      .then(response => {
        response.data.map((elem,index)=>{
            allQualifications.push({qualification : elem.qualification, id: elem._id});
        })
        this.setState({allQualifications:allQualifications})
      })
      .catch(error=>{
        Swal.fire("Error while getting skill",error.message,'error');
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
    var appliedJobSelector=this.state.appliedJobSelector;
    
    var {mapAction} = this.props;
    console.log(selecteditems)
    appliedJobSelector.countryCode = "IN"; 

    appliedJobSelector.candidate_id = this.props.userDetails.candidate_id;
    

    //appliedJobSelector.stateCode = selecteditems.currentTarget.value; 
    // if (this.props.match.path=="/") {
    //   appliedJobSelector.stateCode = this.props.match.params.stateCode
    // }
    if (this.props.match.path=="/country/:countryCode/state/:stateCode/city/:district/industry/:industryName/:industry_id/function/:functionalArea/:functionalArea_id/subfunction/:subfunctionalArea/:subfunctionalArea_id") {
      
      appliedJobSelector.stateCode = this.props.match.params.stateCode
      appliedJobSelector.district = this.props.match.params.district

    }
    
    if (filterType === 'industry') {
      if (selecteditems.length > 0) {
        appliedJobSelector.industry_id = selecteditems;
      }else{
        delete appliedJobSelector.industry_id;
      }
    }

    if (filterType === 'functionalArea') {
      if (selecteditems.length > 0) {
        appliedJobSelector.functionalArea_id = selecteditems;
      }else{
        delete appliedJobSelector.functionalArea_id
      }
    }
    if (filterType === 'jobSector') {
      if (selecteditems.length > 0) {
        appliedJobSelector.jobSector_id = selecteditems;
      }else{
        delete appliedJobSelector.jobSector_id
      }
    }
    if (filterType === 'jobType') {
      if (selecteditems.length > 0) {
        appliedJobSelector.jobType_id = selecteditems;
      }else{
        delete appliedJobSelector.jobType_id
      }
    }
    if (filterType === 'jobTime') {
      if (selecteditems.length > 0) {
        appliedJobSelector.jobTime_id = selecteditems;
      }else{
        delete appliedJobSelector.jobTime_id
      }
    }
    if (filterType === 'jobShift') {
      if (selecteditems.length > 0) {
        appliedJobSelector.jobShift_id = selecteditems;
      }else{
        delete appliedJobSelector.jobShift_id
      }
    }
    if (filterType === 'jobRole') {
      if (selecteditems.length > 0) {
        appliedJobSelector.jobRole_id = selecteditems;
      }else{
        delete appliedJobSelector.jobRole_id
      }
    }
    if (filterType === 'skill') {
      if (selecteditems.length > 0) {
        appliedJobSelector.skill_id = selecteditems;
      }else{
        delete appliedJobSelector.skill_id
      }
    }
    if (filterType === 'qualification') {
      if (selecteditems.length > 0) {
        appliedJobSelector.qualification_id = selecteditems;
      }else{
        delete appliedJobSelector.qualification_id
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

      appliedJobSelector.minExp = minValue
      appliedJobSelector.maxExp = maxValue
    }
    
    appliedJobSelector.startLimit     = 0;
    appliedJobSelector.initialLimit   = 25;
    appliedJobSelector.showMoreLimit  = 25;
      
    this.setState({ appliedJobSelector: appliedJobSelector },()=>{
        //mapAction.jobCount(this.state.appliedJobSelector);
        mapAction.getAppliedJoblist(appliedJobSelector);

      
    })
    
  }

  render(){
    
    //console.log(this.state.allIndustries)
    //console.log(this.state.inputExperience)

    return(
      <section className="LeftSideFiltersWrapper col-lg-12">
      
      <div className="row">

          {/*<div className="form-group col-lg-12">
            <div className='row'>
              <div className="input-group filtersColor col-lg-12">
                
                   <Multiselect className="form-control LeftSideFiltersInputBox LeftSideFiltersDrop"
                    id="allIndustries" name="allIndustries" placeholder="Industries"
                    //onChange={this.onSelectedItemsChange.bind(this,'industry')}
                    options={this.state.allIndustries}
                    displayValue="industry"
                    onSelect={this.onSelectedItemsChange.bind(this,'industry')} // Function will trigger on select event
                    onRemove={this.onSelectedItemsChange.bind(this,'industry')}
                    style={this.style}
                    
                   />   

          
              </div>
            </div>  
          </div> 

          <div className="form-group col-lg-12">
            <div className='row'>
              <div className="input-group FilterDropDown1 col-lg-12">
               
                   <Multiselect className="form-control LeftSideFiltersInputBox LeftSideFiltersDrop"
                    id="allFunctionalAreas" name="allFunctionalAreas" placeholder="Functional Areas"
                    
                      options={this.state.allFunctionalAreas}
                      displayValue="functionalArea"
                      onSelect={this.onSelectedItemsChange.bind(this,'functionalArea')} // Function will trigger on select event
                      onRemove={this.onSelectedItemsChange.bind(this,'functionalArea')}
                        //showCheckbox={true}
                        style={this.style}
                   />    
                            
              </div>
            </div>
          </div> */}

          <div className="form-group col-lg-12">
            <div className='row'>
              <div className="input-group col-lg-12">
                
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
          <div className="form-group col-lg-12">
            <div className='row'>
              <div className="input-group col-lg-12">
                
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
          <div className="form-group col-lg-12">
            <div className='row'>
              <div className="input-group col-lg-12">
                
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
          <div className="form-group col-lg-12">
            <div className='row'>
              <div className="input-group col-lg-12">
                
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
          <div className="form-group col-lg-12">
            <div className='row'>
              <div className="input-group col-lg-12">
                
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
        <div className="form-group col-lg-12">
            <div className='row'>
              <div className="input-group col-lg-12">
                
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
        
        <div className="form-group col-lg-12">
            <div className='row'>
              <div className="input-group col-lg-12">
                
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
        <div className="form-group col-lg-12">
            <div className="row">
              <div className="input-group col-lg-12">
                
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
      userDetails : state.userDetails,
            viewMode    : state.viewMode
    }
}
const mapDispatchToProps = (dispatch) => ({
    mapAction :  bindActionCreators(mapActionCreator, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(JobWishlistFilters));