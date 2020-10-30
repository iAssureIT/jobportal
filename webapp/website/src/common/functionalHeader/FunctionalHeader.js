import React, {Component} from 'react';

import './FunctionalHeader.css';

export default class FunctionalHeader extends Component{
  
  render(){
    
   
    return(
      <section className="FunctionalHeaderWrapper col-lg-12">
      	
		      <div className="iconHeader col-lg-1">
		      		<img src="/images/1.png" alt="icon" />
		      </div>

		      <div className="breadCrumbHeader col-lg-2">
					<ul className="breadCrumbInner">
					  <li className="breadCrumbInnerli"><a href="#">India</a></li>
					  <li className="breadCrumbInnerli"><a href="#">Maharashtra</a></li> 
					  <li className="breadCrumbInnerLI">Pune</li>
					</ul>
		      </div>

		      <div className="FunctionWiseTitle col-lg-5">
		     		Functionwise Jobs
		      </div>


		      <div className="rightFunctionHeader col-lg-4">
		      	<div className="row">
		     		<div className="rightFunctionHeader1 col-lg-9">
		     			<div className="rightFunctionHeader1 col-lg-11 pull-right">
			     			<div className="rightFunctionHeader1CityJobs">
								<div className="cityNameHeader">Pune Jobs
								</div>	

								<div className="cityJobsHeader">10,680
								</div>			     		
			     		
			     			 </div>
			     		</div>
		     		</div>

		     		<div className="rightFunctionHeader2 col-lg-3">
		     			
		     				<div className="headerMenu2">
					     		<div className="headerMenu11">
					     			<img src="/images/List_View.png" alt="icon" />
					     		</div>
					     	</div>

				     		<div className="headerMenu2">
			     				<div className="headerMenu1">
					     			<img src="/images/Grid_View.png" alt="icon" />
					     		</div>
					     		<div className="headerMenu1">
					     			<img src="/images/List_View.png" alt="icon" />
					     		</div>
				     		</div>
				     	
			   		</div>
			   	</div>	

		      </div>

		

      </section>
    );
  }


}