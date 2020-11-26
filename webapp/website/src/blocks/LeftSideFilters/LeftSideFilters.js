import React, {Component} from 'react';
import { Multiselect }    from 'multiselect-react-dropdown';
import Axios        from 'axios';
import Swal         from 'sweetalert2';

import './LeftSideFilters.css';

export default class LeftSideFilters extends Component{

  constructor(props){
    super(props);
    console.log("I am in Constructor!");

    this.state = {

      allIndustries         : [],
      inputIndustry         : [],

      allFunctionalAreas    : [],
      inputSector           : [],

      allRoles              : [],
      inputRole             : [],

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
  let allIndustries = [];
  let allFunctionalAreas = [];
  Axios.get("/api/industrymaster/get/list")
      .then(response => {
        console.log("get Industry Data response.data = ",response.data);
        this.setState({inputIndustry : response.data});
        
        this.state.inputIndustry!=null && this.state.inputIndustry.length > 0 
        ?
          this.state.inputIndustry.map((elem,index)=>{
            
            allIndustries.push({industry:elem.industry,id:elem._id})
            this.setState({allIndustries:allIndustries})
            
             
          })
        :
          this.state.allIndustries.push("select");
      })
      .catch(error=>{
        Swal.fire("Error while getting  inputIndustry List data",error.message,'error');
      })


      Axios.get("/api/functionalareamaster/get/list")
      .then(response => {
        console.log("get functionalArea Data response.data = ",response.data);
        this.setState({inputSector : response.data});
        console.log("Sector",this.state.inputSector);
        this.state.inputSector!=null && this.state.inputSector.length > 0 
        ?
          this.state.inputSector.map((elem,index)=>{
            
            allFunctionalAreas.push({functionalArea:elem.functionalArea,id:elem._id})
            this.setState({allFunctionalAreas:allFunctionalAreas})
            
          })
        :
          this.state.allFunctionalAreas.push("select");
      })
      .catch(error=>{
        Swal.fire("Error while getting inputSector List data",error.message,'error');
      })

      Axios.get("/api/jobrolemaster/get/list")
      .then(response => {
        console.log("get Jpb Role Data response.data = ",response.data);
        this.setState({inputRole : response.data});
        console.log("Role",this.state.inputSector);
        this.state.inputRole!=null && this.state.inputRole.length > 0 
        ?
          this.state.inputRole.map((elem,index)=>{
            
            this.state.allRoles.push(elem.jobRole);
            
          })
        :
          this.state.allRoles.push("select");
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
    console.log("filterType",filterType)
    var selector=this.state.selector;
    var industry_ids = [];
    var functionalArea_ids=[];
    selector.countryCode = "IN"; 
    //selector.stateCode = selecteditems.currentTarget.value; 

    
    if (filterType === 'industry') {
      selecteditems.map((elem,index)=>{
        industry_ids.push(elem.id);
      })
      selector.industry_id = selecteditems;
    }

    if (filterType === 'functionalArea') {
      selecteditems.map((elem,index)=>{
        functionalArea_ids.push(elem.id);
      })
      selector.functionalArea_id = selecteditems;
    }

    
    this.setState({ selector: selector });
    console.log("selecteditems",this.state.selector)
    
    this.setState({ selector: selector },()=>{
      this.getFilteredData(this.state.selector);
    })
    /*  
      delete selector.district
      
    
    if(filterType === 'functionalArea'){
      selector.district  = selecteditems.currentTarget.value; 
    }
    */
  }
  getFilteredData(selector){

    Axios.post("/api/jobs/filter", selector)
      .then((response) => {
        // console.log("response>/",response.data,this.state.roles,this.state.getcompanyID)
       
        //   this.setState({
        //     entityList   : response.data,
        //     showDetails  : true,
        //   })
        
      })
      .catch((error) => {
      })
  }
  render(){
    
   
    return(
      <section className="LeftSideFiltersWrapper col-lg-12">
      
      <div className="row">

		 	    <div className="form-group col-lg-12">
            <div className='row'>
            	<div className="input-group filtersColor col-lg-12">
           			
           				 <Multiselect className="form-control LeftSideFiltersInputBox LeftSideFiltersDrop"
                    id="allIndustries" name="allIndustries" placeholder="All Industries"
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
                    id="allFunctionalAreas" name="allFunctionalAreas" placeholder="All Functional Areas"
                    
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
                    id="allRoles" name="allRoles" placeholder="All Roles"
                    
                      options={this.state.allRoles}
                        isObject={false}
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