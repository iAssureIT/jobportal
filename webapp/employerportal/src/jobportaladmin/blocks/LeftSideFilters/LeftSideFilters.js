import React, {Component} from 'react';
import { Multiselect }    from 'multiselect-react-dropdown';
import Axios        from 'axios';
import Swal         from 'sweetalert2';

import './LeftSideFilters.css';
import { connect }        from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter }   from 'react-router-dom';
import  * as mapActionCreator from '../../common/actions/index';

class LeftSideFilters extends Component{

  constructor(props){
    super(props);
    
    this.state = {

      allIndustries         : [],
      inputIndustry         : [],

      allFunctionalAreas    : [],
      allSubfunctionalAreas : [],

      allJobRoles           : [],

      allExperiences        : "",
      inputExperience       : ['Experience-1','Experience-2','Experience-3'],
        
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
  
  let allFunctionalAreas    = [];
  let allSubfunctionalAreas = [];
  let allJobRoles           = []
    Axios.get("/api/functionalareamaster/get/list")
      .then(response => {
        response.data.map((elem,index)=>{
          allFunctionalAreas.push({ functionalArea : elem.functionalArea, id:elem._id})          
        })
        this.setState({allFunctionalAreas : allFunctionalAreas})
      })
      .catch(error=>{
        Swal.fire("Error while getting functional area",error.message,'error');
      })

      Axios.get("/api/subfunctionalareamaster/get/list")
      .then(response => {
       
          response.data.map((elem,index)=>{
            allSubfunctionalAreas.push({subfunctionalArea:elem.subfunctionalArea,id:elem._id})
          })

          console.log(allSubfunctionalAreas)
          this.setState({allSubfunctionalAreas:allSubfunctionalAreas})      
      })
      .catch(error=>{
        Swal.fire("Error while getting subfunctional area",error.message,'error');
      })

      Axios.get("/api/jobrolemaster/get/list")
      .then(response => {
          
          response.data.map((elem,index)=>{
            allJobRoles.push({jobRole:elem.jobRole,id:elem._id})
          })
          this.setState({allJobRoles:allJobRoles})  
          //this.state.allRoles.push("select");
      })
      .catch(error=>{
        Swal.fire("Error while getting inputRole List data",error.message,'error');
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
    var selector                = this.state.selector;
    var functionalArea_ids      = [];
    var subfunctionalArea_ids   = [];
    var jobRoles_ids            = [];
    var {mapAction}             = this.props;

    selector.countryCode = "IN"; 
    //selector.stateCode = selecteditems.currentTarget.value; 

    
    if (filterType === 'functionalArea') {
      selecteditems.map((elem,index)=>{
        functionalArea_ids.push(elem.id);
      })
      selector.functionalArea_id = selecteditems;
    }
    if (filterType === 'subfunctionalArea') {
      selecteditems.map((elem,index)=>{
        subfunctionalArea_ids.push(elem.id);
      })
      selector.subfunctionalArea_id = selecteditems;
    }
    if (filterType === 'jobRole') {
      selecteditems.map((elem,index)=>{
        jobRoles_ids.push(elem.id);
      })
      selector.jobRoles_id = selecteditems;
    }

    this.setState({ selector: selector },()=>{
      mapAction.filterJobList(this.state.selector)
    })
    
  }

  render(){
    
   
    return(
      <section className="LeftSideFiltersWrapper col-lg-12">
      
      <div className="row">
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
              <div className="input-group filtersColor col-lg-12">
                
                   <Multiselect className="form-control LeftSideFiltersInputBox LeftSideFiltersDrop"
                    id="allSubfunctionalAreas" name="allSubfunctionalAreas" placeholder="Sub functional Area"
                    options={this.state.allSubfunctionalAreas}
                    displayValue="subfunctionalArea"
                    onSelect={this.onSelectedItemsChange.bind(this,'subfunctionalArea')} // Function will trigger on select event
                    onRemove={this.onSelectedItemsChange.bind(this,'subfunctionalArea')}
                    style={this.style}
                    
                   />   

          
              </div>
            </div>  
          </div> 

           <div className="form-group col-lg-12">
            <div className='row'>
              <div className="input-group col-lg-12">
                <Multiselect className="form-control LeftSideFiltersInputBox LeftSideFiltersDrop"
                  id="allJobRoles" name="allJobRoles" placeholder="Job Roles"
                  options={this.state.allJobRoles}
                  displayValue="jobRole"
                  onSelect={this.onSelectedItemsChange.bind(this,'jobRole')} // Function will trigger on select event
                  onRemove={this.onSelectedItemsChange.bind(this,'jobRole')}
                  style={this.style}
                  
                 />     
                                 
              </div>
            </div>
          </div> 
    
        <div className="form-group col-lg-12">
            <div className="row">
              <div className="input-group col-lg-12">
                
                   <Multiselect className="form-control LeftSideFiltersInputBox LeftSideFiltersDrop"
                    id="allExperiences" name="aallExperiences" placeholder="All Experiences"
                    
                      options={this.state.inputExperience}
                        isObject={false}
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
export default connect(mapStateToProps, mapDispatchToProps) (LeftSideFilters);