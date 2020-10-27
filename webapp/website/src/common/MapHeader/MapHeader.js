import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../FunctionalHeader/FunctionalHeader.css';


export default class FunctionalHeader extends Component{
	constructor(props){
		super(props);
		this.state={
			
			asideDisplay  : "none",
			
		}
	}
  	asideBar(event){

		if(this.state.asideDisplay==="none"){
	
			this.setState({
			asideDisplay  : "block",
			})
		}
		else{
			this.setState({
			asideDisplay  : "none",
			})
		}
	}
  	render(){
    
   
    return(
      <nav className="navbar FunctionalHeaderWrapper container-fluid">
  			<div className="iconHeader col-lg-1">
		      	<img src="images/1.png" alt="icon" />
		    </div>

		    <div className="breadCrumbHeader col-lg-2">
				<ul className="breadCrumbInner">
				  <li className="breadCrumbInnerli"><a href="#">India</a></li>
				  <li className="breadCrumbInnerli"><a href="#">Maharashtra</a></li> 
				  <li className="breadCrumbInnerLI">Pune</li>
				</ul>
		    </div>

	      	<div className="FunctionWiseTitle col-lg-5">
	     		
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
		     			
		     				<div className="headerMenu2 ">
		     					<div className="headerMenu1" onClick={this.asideBar.bind(this)}>
					     			<img src="images/List_View.png" alt="icon" />
					     		</div>
					     	</div>

					     	<div className="barsToggel pull-right" id="barsToggel" style={{display:this.state.asideDisplay}}>
								
								<div className="notificationMessege col-lg-12">
									<FontAwesomeIcon icon="search" />
									<span className="notificationMessegeText">Companies</span>
								
								</div>
								<div className="notificationMessege col-lg-12">
									<FontAwesomeIcon icon="users" />
									<span className="notificationMessegeText">Recruiters</span>
									
								</div>
								<div className="notificationMessege col-lg-12">
									<FontAwesomeIcon icon="file-alt" />
									<span className="notificationMessegeText">About Us</span>
									
								</div>

								<div className="notificationMessege col-lg-12">
									<FontAwesomeIcon icon="file-alt" />
									<span className="notificationMessegeText">Contact Us</span>
									
								</div>
								<div className="notificationMessege col-lg-12">
									<a href="login" className="whitelink"><FontAwesomeIcon icon="sign-out-alt" />
									<span className="notificationMessegeText">Sign In</span>
									</a>
								</div>
						</div>
			   		</div>
			   	</div>	

		      
</div>
	
	</nav>
    );
  }


}