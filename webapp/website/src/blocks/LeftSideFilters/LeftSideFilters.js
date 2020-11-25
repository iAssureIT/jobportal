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

      allIndustries  : [],
      inputIndustry  : [],

      allSectors  : [],
      inputSector : [],

      allRoles  : [],
      inputRole : [],

      allExperiences  : "",
      inputExperience : ['Experience-1','Experience-2','Experience-3'],
        
      industry   :  '-',
      Sector     :  '-',
      role       :  '-',
      Experience :  '-',

      selector   :{},

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

  Axios.get("/api/industrymaster/get/list")
      .then(response => {
        console.log("get Industry Data response.data = ",response.data);
        this.setState({inputIndustry : response.data});
        console.log("industry",this.state.inputIndustry);
        this.state.inputIndustry!=null && this.state.inputIndustry.length > 0 
        ?
          this.state.inputIndustry.map((elem,index)=>{
            
            this.state.allIndustries.push(elem.industry);
            
          })
        :
          this.state.allIndustries.push("select");
      })
      .catch(error=>{
        Swal.fire("Error while getting  inputIndustry List data",error.message,'error');
      })


      Axios.get("http://qaapi-jobportal.iassureit.in/api/functionalareamaster/get/list")
      .then(response => {
        console.log("get functionalArea Data response.data = ",response.data);
        this.setState({inputSector : response.data});
        console.log("Sector",this.state.inputSector);
        this.state.inputSector!=null && this.state.inputSector.length > 0 
        ?
          this.state.inputSector.map((elem,index)=>{
            
            this.state.allSectors.push(elem.functionalArea);
            
          })
        :
          this.state.allSectors.push("select");
      })
      .catch(error=>{
        Swal.fire("Error while getting inputSector List data",error.message,'error');
      })

      Axios.get("http://qaapi-jobportal.iassureit.in/api/jobrolemaster/get/list")
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
  
  render(){
    
   
    return(
      <section className="LeftSideFiltersWrapper col-lg-12">
      
      <div className="row">

		 	    <div className="form-group col-lg-12">
            <div className='row'>
            	<div className="input-group filtersColor col-lg-12">
           			
           				 <Multiselect className="form-control LeftSideFiltersInputBox LeftSideFiltersDrop"
                    id="allIndustries" name="allIndustries" placeholder="All Industries"
                		
                      options={this.state.allIndustries}
                        isObject={false}
                        //showCheckbox={true}
                        style={this.style}
           				 />   

          
            	</div>
            </div>  
        	</div> 

          <div className="form-group col-lg-12">
            <div className='row'>
              <div className="input-group FilterDropDown1 col-lg-12">
               
                   <Multiselect className="form-control LeftSideFiltersInputBox LeftSideFiltersDrop"
                    id="allSectors" name="allSectors" placeholder="All Sectors"
                    
                      options={this.state.allSectors}
                        isObject={false}
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