import React, {Component} from 'react';

import './LeftSideFilters.css';

export default class LeftSideFilters extends Component{

  constructor(props){
    super(props);
    console.log("I am in Constructor!");

    this.state = {
      allIndustries  : "",
      inputIndustry : ['It','Finance','mechanical'],

      allSectors  : "",
      inputSector : ['Sector-1','Sector-2','Sector-3'],

      allRoles  : "",
      inputRole : ['Role-1','Role-2','Role-3'],

       allExperiences  : "",
      inputExperience : ['Experience-1','Experience-2','Experience-3'],
        
    };
  }

  
  render(){
    
   
    return(
      <section className="LeftSideFiltersWrapper col-lg-2">
      	
		
		 	    <div className="form-group col-lg-12">
            	<div className="input-group col-lg-12">
           			<div className="row">
           				 <select className="form-control LeftSideFiltersInputBox LeftSideFiltersDrop" id="allIndustries" name="allIndustries">
                			<option className="LeftSideFiltersDrop"> All Industries</option>
                      {
                        this.state.inputIndustry.length ? 
                        this.state.inputIndustry.map((elem,index)=>{
                          return(<option>{elem}</option>)
                        }):
                         null
                      }
 
                   
           				 </select>    
            		 </div>                  
            	</div>
        	</div> 
		


	
		 	    <div className="form-group col-lg-12">
            	<div className="input-group col-lg-12">
           			<div className="row">
           				 <select className="form-control LeftSideFiltersInputBox LeftSideFiltersDrop" id="allSectors" name="allSectors">
                			<option className="LeftSideFiltersDrop"> All Sectors</option>
              			   {
                        this.state.inputSector.length ? 
                        this.state.inputSector.map((elem,index)=>{
                          return(<option>{elem}</option>)
                        }):
                         null
                      }

           				 </select>    
            		 </div>                  
            	</div>
        	</div> 
		

		
		 	    <div className="form-group col-lg-12">
            	<div className="input-group col-lg-12">
           			<div className="row">
           				 <select className="form-control LeftSideFiltersInputBox LeftSideFiltersDrop" id="allRoles" name="allRoles">
                			<option className="LeftSideFiltersDrop"> All Roles</option>
              			    {
                        this.state.inputRole.length ? 
                        this.state.inputRole.map((elem,index)=>{
                          return(<option>{elem}</option>)
                        }):
                         null
                      }
                    
           				 </select>    
            		 </div>                  
            	</div>
        	</div> 
		


		
		 	    <div className="form-group col-lg-12">
            	<div className="input-group col-lg-12">
           			<div className="row">
           				 <select className="form-control LeftSideFiltersInputBox LeftSideFiltersDrop" id="allExperiences" name="allExperiences">
                			<option className="LeftSideFiltersDrop"> All Experience Level</option>
              			    {
                        this.state.inputExperience.length ? 
                        this.state.inputExperience.map((elem,index)=>{
                          return(<option>{elem}</option>)
                        }):
                         null
                      }
                    
           				 </select>    
            		 </div>                  
            	</div>
        	</div> 
		
      		

      </section>
    );
  }


}