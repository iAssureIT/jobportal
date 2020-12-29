import React,{Component} from 'react';
import Axios 			 	from 'axios';
import Swal 			 	from 'sweetalert2';
import Moment               from 'moment';
import { withRouter }	 	from 'react-router-dom';
import './LeftAside.css';
import {connect}            from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../../common/actions/index';

class LeftAside extends Component{
	constructor(props){
		super(props);

		this.state={
			firstName          : "",
			middleName         : "",
			lastName           : "",
			lastDesignation    : "",
			candidate_id       : this.props.userDetails.candidate_id,
			mobile             : "",
			alternate          : "",
			email              : "",	
			houseNumber        : "",
			address            : "",
			area               : "",
			city               : "",
			district           : "",
			state	           : "",
			country	           : "",
			skillsArry	       : [],
			pincode	           : 0,	
		}
	}
	componentDidMount(){

		Axios.get("/api/candidatemaster/get/one/"+this.state.candidate_id)
		.then(response=>{
			 
			 	this.setState({
			 		skillsArry        : response.data[0].skillCertification,
			 		firstName         : response.data[0].basicInfo.firstName?response.data[0].basicInfo.firstName:"",
					middleName        : response.data[0].basicInfo.middleName?response.data[0].basicInfo.middleName:"",
					lastName          : response.data[0].basicInfo.lastName?response.data[0].basicInfo.lastName:"",
					mobile            : response.data[0].contact.mobile?response.data[0].contact.mobile:"",
					alternate         : response.data[0].contact.altMobile?response.data[0].contact.altMobile:"",
					email             : response.data[0].contact.emailId?response.data[0].contact.emailId:"",
					houseNumber       : response.data[0].address[0].houseNumber?response.data[0].address[0].houseNumber:"",
					address           : response.data[0].address[0].address?response.data[0].address[0].address:"",
					area              : response.data[0].address[0].area?response.data[0].address[0].area:"",
					city              : response.data[0].address[0].cityVillage?response.data[0].address[0].cityVillage:"",
					district          : response.data[0].address[0].district?response.data[0].address[0].district:"",
					state             : response.data[0].address[0].state?response.data[0].address[0].state:"",
					country           : response.data[0].address[0].country?response.data[0].address[0].country:"",
					pincode           : response.data[0].address[0].pincode?response.data[0].address[0].pincode:"",
					lastDesignation   : response.data[0].workExperience[0].lastDegn?response.data[0].workExperience[0].lastDegn:"",
					

				
			 	})
			 })
			 .catch(error=>{
			 	Swal.fire("Submit Error!",error.message,'error');
			 })
		}
	render(){
		return(
				<div className="container-fluid col-lg-12 ">
					<div className=" leftAsideWrapper ">
						<div className="">
							<div className="col-lg-8 col-lg-offset-2 candidateProfileImg">
								<div className="candidateImgWrapper row">
									<img src="/images/43.png" alt="Candidate" />
									<div className="candidateName mainText">
										{this.state.firstName+" "+this.state.lastName }
									</div>
									<div className="jobName subText">
										{this.state.lastDesignation}  
									</div>
								</div>
							</div>

							<div className="candidateContactInfo  col-lg-12">
								<div className="row">
									<div className="mainText">
										Contact Info
									</div>
									<div className="subText contactPhone col-lg-12">
										<div className="row">
											<div className="candidatePageIcon1 col-lg-1">
												<div className="row">
												 	<i className="fa fa-mobile  fa-2x"></i>
												 </div>
											</div>

											<div className=" col-lg-10">
												<div className="candidatePageText row">
													{this.state.mobile}
												</div>
											</div>
										</div>
									</div>
									<div className="subText contactPhone col-lg-12">
										<div className="row">
											<div className="candidatePageIcon2 col-lg-1">
												<div className="row">
												 	<i className="fa fa-envelope-o "></i>
												 </div>
											</div>

											<div className=" col-lg-10">
												<div className="candidatePageText row">
													{this.state.email}
												</div>
											</div>
										</div>
									</div>
									<div className="subText contactPhone col-lg-12">
										<div className="row">
											<div className="candidatePageIcon3 col-lg-1">
												<div className="row">
												 	<i className="fa fa-map-marker  "></i>
												 </div>
											</div>

											<div className=" col-lg-10">
												<div className="candidatePageText row">
													{this.state.houseNumber+", "+ this.state.address +", "}<br/>
													{ this.state.area + ", "+ this.state.city+ ", "+ this.state.district +", "}<br/>
													{ this.state.state+", "+this.state.country+", "+this.state.pincode +"."}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="candidateSkillsBlock  col-lg-12">
								<div className="row candidateSkillsTitle">
									<div className="mainText">
										My Skills
									</div>
								</div>
								
								<div className="row candidateSkillsProgess">
									<div className="subHeadingText">
										Primary Skills
									</div>

									<ul className="candidateSkillsUl">
										{

											this.state.skillsArry.length > 0
											?
											this.state.skillsArry.map((elem,index)=>{
												return(
												<li key={index}>
													<div>
														<i className="fa fa-square rotate45" ></i>
															{elem.primarySkills[index]}
													</div>
													<div className="progress candidateprogess">
														<div className="progress-bar candidateprogessBar" role="progressbar" aria-valuenow="70"
														  aria-valuemin="0" aria-valuemax="100" style={{width:"80%"}}>
														    
														 </div>	
														 <span className="progressBarStatus ">80%</span>
													</div>
												</li>
												);
												})
												:
												null
											}
										
									</ul>
								</div>
								<div className="row candidateSkillsProgess">
									<div className="subHeadingText candidateSkillsSubTitle">
										Secondary Skills
									</div>
									<ul className="candidateSkillsUl">
										{

											this.state.skillsArry.length > 0
											?
											this.state.skillsArry.map((elem,index)=>{
												return(
												<li key={index}>
													<div>
														<i className="fa fa-square rotate45" ></i>
															{elem.secondarySkills[index]}
													</div>
													<div className="progress candidateprogess">
														<div className="progress-bar candidateprogessBar" role="progressbar" aria-valuenow="70"
														  aria-valuemin="0" aria-valuemax="100" style={{width:"80%"}}>
														    
														 </div>	
														 <span className="progressBarStatus ">80%</span>
													</div>
												</li>
												);
												})
												:
												null
											}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>

			);
	}
}
const mapStateToProps = (state)=>{
    return {
        userDetails  : state.userDetails,
    }
}
const mapDispatchToProps = (dispatch) => ({
  mapAction :  bindActionCreators(mapActionCreator, dispatch)
}) 
export default connect(mapStateToProps,mapDispatchToProps) (withRouter(LeftAside))
