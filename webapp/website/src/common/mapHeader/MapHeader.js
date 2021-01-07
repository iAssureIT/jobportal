import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../functionalHeader/FunctionalHeader.css';
import LoginForm from '../../systemSecurity/Login.js';
import SignUp from '../../systemSecurity/SignUp.js';
import ForgotPassword from '../../systemSecurity/ForgotPassword.js';
import ConfirmOtp from '../../systemSecurity/ConfirmOtp.js';
import ResetPass from '../../systemSecurity/ResetPassword.js'
import {connect}            from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../common/actions/index';


class MapHeader extends Component{
	constructor(props){
		super(props);
		this.state={
			showLoginModal: false,
			asideDisplay  : "-600px",
			
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

		if(this.state.asideDisplay==="-600px"){
	
			this.setState({
			asideDisplay  : "15px",
			})
		}
		else{
			this.setState({
			asideDisplay  : "-600px",
			})
		}
	}
  	render(){
    
    const selectedState = this.props.selectedState;
   	//console.log(this.props.selectedModal);

    return(
    <nav className="navbar FunctionalHeaderWrapper container-fluid">
		<div className="iconHeader col-lg-1">
		  	<img src="images/1.png" alt="icon" />
		</div>

		<div className="breadCrumbHeader col-lg-2">
			{/*<ul className="breadCrumbInner">
			  <li className="breadCrumbInnerli"><a href="/">India</a></li>
			  <li className="breadCrumbInnerli selectedState"><a href={"/"+selectedState}>{selectedState}</a></li> 	
			 
			</ul>*/}
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

		     	<div className="functionalbarsToggel" id="barsToggel" style={{top:this.state.asideDisplay}}>

	     				<div className="functionalbarsCross col-lg-12">
							
							<span className="notificationMessegeCross" id="closeAsidebarButton" onClick={this.asideBar.bind(this)}> X </span>
						</div>


						<div className="functionalbarsItem col-lg-12">
							
							<span className="notificationMessegeText">Jobs </span>
						</div>
						<div className="functionalbarsItem col-lg-12">
							
							<span className="notificationMessegeText">Companies</span>
						
						</div>
						<div className="functionalbarsItem col-lg-12">
							
							<span className="notificationMessegeText">Recruiters</span>
							
						</div>
						<div className="functionalbarsItem col-lg-12">
							
							<span className="notificationMessegeText">About Us</span>
							
						</div>

						<div className="functionalbarsItem col-lg-12">
							
							<span className="notificationMessegeText">Contact Us</span>
							
						</div>
						
						<div className="functionalbarsItem col-lg-12" id="loginbtndiv" data-toggle="modal" data-target="#loginModal">
							<FontAwesomeIcon icon="sign-out-alt" />
							<span className="notificationMessegeText">Sign In</span>
						</div>

					</div>
				<div className="modal" id="loginModal" role="dialog" tabIndex="-1">
				    <div className="modal-dialog  modal-lg">
					    <div className="modal-body">
					      	<button type="button" className="close" id="closeModalButton" data-dismiss="modal">&times;</button>
					        <section className="OTPSentWrapper row">
				                {this.props.selectedModal == "login" ? <LoginForm/> : null }
				                {this.props.selectedModal == "signup" ? <SignUp/> : null }
				                {this.props.selectedModal == "forgotpassword" ? <ForgotPassword/> : null }
				                {this.props.selectedModal == "confirmotp" ? <ConfirmOtp/> : null }
				                {this.props.selectedModal == "resetpass" ? <ResetPass/> : null }
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
        selectedState  : state.selectedState,
        selectedModal  : state.selectedModal
    }
}
const mapDispatchToProps = (dispatch) => ({
	mapAction :  bindActionCreators(mapActionCreator, dispatch)
}) 
export default connect(mapStateToProps,mapDispatchToProps) (MapHeader);