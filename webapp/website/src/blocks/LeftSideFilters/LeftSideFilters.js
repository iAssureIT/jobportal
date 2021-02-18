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
      allRoles              : [],
      inputRole             : [],

      allExperiences        : "",
      inputExperience       : [ {"experience": "0-1 year",  "minvalue": 0, "maxvalue": 1 },
                                {"experience": "1-3 years", "minvalue": 1, "maxvalue": 3 } 
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
  let allRoles            = [] 
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
    var industry_ids = [];
    var functionalArea_ids=[];
    var jobRole_ids=[];
    var {mapAction} = this.props;
    console.log(selecteditems)
    selector.countryCode = "IN"; 
    //selector.stateCode = selecteditems.currentTarget.value; 
    if (this.props.match.path=="/state/:stateCode") {
      selector.stateCode = this.props.match.params.stateCode
    }
    if (this.props.match.path=="/state/:stateCode/:district") {
      selector.district = this.props.match.params.district
    }
    
    if (filterType === 'industry') {
      if (selecteditems.length > 0) {
        selecteditems.map((elem,index)=>{
          industry_ids.push(elem.id);
        })
        selector.industry_id = selecteditems;
      }else{
        delete selector.industry_id;
      }
    }

    if (filterType === 'functionalArea') {
      if (selecteditems.length > 0) {
        selecteditems.map((elem,index)=>{
          functionalArea_ids.push(elem.id);
        })
        selector.functionalArea_id = selecteditems;
      }else{
        delete selector.functionalArea_id
      }
    }
    if (filterType === 'jobRole') {
      if (selecteditems.length > 0) {
        selecteditems.map((elem,index)=>{
          jobRole_ids.push(elem.id);
        })
        selector.jobRole_id = selecteditems;
      }else{
        delete selector.jobRole_id
      }
    }
    if (filterType === "experience") {
      console.log(selecteditems)
    }
    this.setState({ selector: selector },()=>{
        mapAction.jobCount(this.state.selector);
      if (this.props.viewMode=="mapView") {
        mapAction.filterMapData(this.state.selector);
      }
      if (this.props.viewMode=="functionalView") {
        mapAction.filterFunctionalData(this.state.selector);
      }
      if (this.props.viewMode=="subfunctionalView") {
        mapAction.filterSubfunctionalData(this.state.selector);
      }
      if (this.props.viewMode=="industrialView") {
        mapAction.filterIndustrialData(this.state.selector);
      }
    })
    
  }

  render(){
    
    //console.log(this.state.allIndustries)
    //console.log(this.state.inputExperience)

    return(
      <section className="LeftSideFiltersWrapper col-lg-12">
      
      <div className="row">

          <div className="form-group col-lg-12">
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
            viewMode    : state.viewMode
    }
}
const mapDispatchToProps = (dispatch) => ({
    mapAction :  bindActionCreators(mapActionCreator, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(LeftSideFilters));