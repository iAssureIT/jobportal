import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../functionalHeader/FunctionalHeader.css';
import LoginForm from '../../systemSecurity/Login.js';
import {connect}            from 'react-redux';
import { bindActionCreators } from 'redux';

class MapHeader extends Component{
	constructor(props){
		super(props);
		this.state={
			showModal: false,
			asideDisplay  : "none",
			
		}
		this.handleOpenModal = this.handleOpenModal.bind(this);
    	this.handleCloseModal = this.handleCloseModal.bind(this);
	}
	handleOpenModal () {
	    this.setState({ showModal: true });
	  }
	  
	handleCloseModal () {
	    this.setState({ showModal: false });
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
    
    const selectedState = this.props.selectedState;
   	console.log(selectedState);

    return(
      	<nav className="navbar FunctionalHeaderWrapper container-fluid">
  			<div className="iconHeader col-lg-1">
		      	<img src="images/1.png" alt="icon" />
		    </div>

		    <div className="breadCrumbHeader col-lg-2">
				<ul className="breadCrumbInner">
				  <li className="breadCrumbInnerli"><a href="/">India</a></li>
				  <li className="breadCrumbInnerli selectedState"><a href={"/"+selectedState}>{selectedState}</a></li> 	
				  {/*<li className="breadCrumbInnerLI selectedDistrict">Pune</li>*/}
				</ul>
		    </div>

	      	<div className="FunctionWiseTitle col-lg-5">
	     		 
	      	</div>

	    <div className="rightFunctionHeader col-lg-4">
	      	<div className="row">
	     		<div className="rightFunctionHeader1 col-lg-9">
	     			<div className="rightFunctionHeader1 col-lg-11 pull-right">
		     			<div className="rightFunctionHeader1CityJobs">
							<div className="cityNameHeader">{selectedState && selectedState != "" ? selectedState : "India"}
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
							<FontAwesomeIcon icon="search" />
							<span className="notificationMessegeText">Services</span>
						</div>
						<div className="notificationMessege col-lg-12">
							<FontAwesomeIcon icon="file-alt" />
							<span className="notificationMessegeText">About Us</span>
						</div>
						<div className="notificationMessege col-lg-12">
							<FontAwesomeIcon icon="file-alt" />
							<span className="notificationMessegeText">Contact Us</span>
						</div>
						<div className="notificationMessege col-lg-12" data-toggle="modal" data-target="#loginModal">
							<FontAwesomeIcon icon="sign-out-alt" />
							<span className="notificationMessegeText">Sign In</span>
						</div>

					</div>
					<div className="modal fade" id="loginModal" role="dialog">
					    <div className="modal-dialog  modal-lg">
						   
						    <div className="modal-body">
						      	<button type="button" className="close" data-dismiss="modal">&times;</button>
						        <section className="OTPSentWrapper row">
					                <LoginForm/>
					        	</section>
						    </div>
						
						  </div>
					</div>
		   		</div>
		   	</div>
		</div>
	
	</nav>
    );
  }
}

const mapStateToProps = (state)=>{
    return {
        selectedState  : state.selectedState
    }
}
// const mapDispachToProps = (dispatch) =>{
//     return bindActionCreators({ setMapSelectedStateFun : setMapSelectedState }, dispatch);  
// } 
export default connect(mapStateToProps) (MapHeader);