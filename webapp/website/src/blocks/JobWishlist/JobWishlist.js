import React, {Component} from 'react';
import Axios from  'axios';
import Swal  from  'sweetalert2';
import Moment 					from "moment";
import { connect }        from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../common/actions/index';
import "./JobWishlist.css";

class JobWishlist extends Component{
	constructor(props){
	super(props);
	this.state={
		jobList:[],
		isToggle:true,
		jobIdArray:[]
	}
}

componetDidMount(){
	const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  	const token = userDetails.token;
  	Axios.defaults.headers.common['Authorization'] = 'Bearer '+ token;
}

handleclick = (jobid)=>{
	var {mapAction} = this.props;
	this.setState({isToggle:!this.state.isToggle})
	if (this.props.userDetails.loggedIn) {
		var formValues = {
			candidate_id: this.props.userDetails.candidate_id,
			job_id  	: jobid,
			createdBy   : this.props.userDetails.user_id
		}
		Axios.post("/api/wishlist/post",formValues)
			.then(response =>{
				var {mapAction} = this.props;
				var jobWishlistSelector = this.props.jobWishlistSelector;
			    jobWishlistSelector.candidate_id = this.props.userDetails.candidate_id;
			    mapAction.getJobWishlist(jobWishlistSelector);

				console.log("wishlist response=", response.data);
				if(response.data.message==="Job is removed from wishlist"){
							Swal.fire(
									'',
									'Job is removed from wishlist',
									''
							);
				}else{
					Swal.fire(
									'',
									'Job is added to wishlist',
									''
							);
				}
			})
			.catch(error=>{
				if(error.message === "Request failed with status code 401"){
			        var userDetails =  localStorage.removeItem("userDetails");
			        localStorage.clear();

			        Swal.fire({title  : ' ',
			                  html    : "Your session is expired! You need to login again. "+"<br>"+" Click OK to go to Login Page",
			                  text    :  "" })
			            .then(okay => {
			              if (okay) { 
			                var userDetails = {
			                    loggedIn    : false,
			                    username  :"",  
			                    firstName   : "", 
			                    lastName    : "", 
			                    email     : "",
			                    phone     : "", 
			                    user_id     : "",
			                    roles     : [],
			                    token     : "", 
			                    gender    : "", 
			                    profilePicture : "",
			                    candidate_id: "",
			                    profileCompletion : 0
			                    }
			                    mapAction.setUserDetails(userDetails);
			                    document.getElementById("loginbtndiv").click();
			                    }
			                  });
			    }else{
			    	Swal.fire(
								'',
								"Some problem occured!",
								'')
			    }
				console.log(error);
			})	
	}else{
		document.getElementById("loginbtndiv").click();
	}
}

applyJob = (jobid, company_id)=>{
	var {mapAction} = this.props;	
	console.log("jobid :", jobid);
	
	if (this.props.userDetails.loggedIn) {
		if (this.props.userDetails.profileCompletion == 100) {
			var formValues = { 
								candidate_id   		: this.props.userDetails.candidate_id,
								job_id         		: jobid,
							    entity_id    		: company_id,
							    status        	  	: "Applied"
			}
			console.log(formValues)
			Swal.fire({
				title 				: ' ',
				html				: 'Are you sure<br />you want to apply for this job?',
				text 				: '',
				icon 				: 'success',
				showCloseButton		: true,
				showCancelButton 	: true,
				confirmButtonText 	: 'YES',
				cancelButtonText 	: 'NO',
				confirmButtonColor  : '#f5a721',
			
			}).then((result) =>{
				console.log("result", result.value)
				if(result.value){
					Axios.post("/api/applyJob/post", formValues)
						.then(response =>{
							
							var {mapAction} = this.props; 
							var appliedJobSelector  = this.props.appliedJobSelector;
						    appliedJobSelector.candidate_id = this.props.userDetails.candidate_id;
						    
							mapAction.getAppliedJoblist(appliedJobSelector);

							if(response.data.message==="You have applied to job"){

								Swal.fire(
											'',
											'You have applied job successfully!',
											''
									);
							}
						})
						.catch(error=>{
							if(error.message === "Request failed with status code 401"){
						        var userDetails =  localStorage.removeItem("userDetails");
						        localStorage.clear();

						        Swal.fire({title  : ' ',
						                  html    : "Your session is expired! You need to login again. "+"<br>"+" Click OK to go to Login Page",
						                  text    :  "" })
						            .then(okay => {
						              if (okay) { 
						                var userDetails = {
						                    loggedIn    : false,
						                    username  :"",  
						                    firstName   : "", 
						                    lastName    : "", 
						                    email     : "",
						                    phone     : "", 
						                    user_id     : "",
						                    roles     : [],
						                    token     : "", 
						                    gender    : "", 
						                    profilePicture : "",
						                    candidate_id: "",
						                    profileCompletion : 0
						                    }
						                    mapAction.setUserDetails(userDetails);
						                    document.getElementById("loginbtndiv").click();
						                    }
						                  });
						    }else{
						    	Swal.fire(
										'',
										"Some problem occured while applying job!",
										''
								)
						    }
						})
					
						}else if (result.dismiss === Swal.DismissReason.cancel){
							// Swal.fire(
							// 	'Cancelled',
							// 	'Not added to applied joblist',
							// 	'error'
							// )
						}
					})
		}
		else{
			Swal.fire(
						'',
						'Please complete your profile',
						''
				).then((result) =>{
				console.log("result", result.value)
				if(result.value){
					this.props.history.push("/basic-info")
				}
			})
		}
	

	}else{
		document.getElementById("loginbtndiv").click();
	}
}

removeApplication = (job_id) => {
	var {mapAction} = this.props;	
	if (this.props.userDetails.loggedIn) {
		var formValues = { 
			candidate_id   		: this.props.userDetails.candidate_id,
			job_id         		: job_id
		}
		Swal.fire({
		title 				: ' ',
		html				: 'Are you sure<br />do you want to remove this job application?',
		text 				: '',
		icon 				: 'success',
		showCloseButton		: true,
		showCancelButton 	: true,
		confirmButtonText 	: 'YES',
		cancelButtonText 	: 'NO',
		confirmButtonColor  : '#db3700',
	
		}).then((result) =>{
			if(result.value){

				Axios.post("/api/applyJob/removeApplication", formValues)
				.then(response =>{
					
					var {mapAction} = this.props;
					var appliedJobSelector  = this.props.appliedJobSelector;
				    appliedJobSelector.candidate_id = this.props.userDetails.candidate_id;
				    
					mapAction.getAppliedJoblist(appliedJobSelector);

					if(response.data.deleted){

						Swal.fire(
									'',
									'You have removed job application!',
									''
							);
					}
				})
				.catch(error=>{
					if(error.message === "Request failed with status code 401"){
				        var userDetails =  localStorage.removeItem("userDetails");
				        localStorage.clear();

				        Swal.fire({title  : ' ',
				                  html    : "Your session is expired! You need to login again. "+"<br>"+" Click OK to go to Login Page",
				                  text    :  "" })
				            .then(okay => {
				              if (okay) { 
				                var userDetails = {
				                    loggedIn    : false,
				                    username  :"",  
				                    firstName   : "", 
				                    lastName    : "", 
				                    email     : "",
				                    phone     : "", 
				                    user_id     : "",
				                    roles     : [],
				                    token     : "", 
				                    gender    : "", 
				                    profilePicture : "",
				                    candidate_id: "",
				                    profileCompletion : 0
				                    }
				                    mapAction.setUserDetails(userDetails);
				                    document.getElementById("loginbtndiv").click();
				                    }
				                  });
				    }else{
				    	Swal.fire(
								'',
								"Some problem occured while removing job application!",
								''
						)
				    }
					
				})
			}

		})
	}else{
		document.getElementById("loginbtndiv").click();
	}
}	
	

	render(){
		return(
			<section className="jobListWrapper">
				<div className="col-12 JobListWrapperMain">
					{/*<div className="col-lg-4 col-lg-offset-8">
							<div className="input-group searchMainTab">
								<input type="text" name="jobTitle" id="jobTitle" className="form-control jobListSearchTab" placeholder="Search by Job Title..." onChange={this.search}/>
								<span className="input-group-addon searchTabAddOn"><i className="fa fa-search"></i> </span> 
							</div> 
						</div> */}
						<div className="row">
						{
							this.props.jobWishlist[0]
							?
								this.props.jobWishlist[0].wishlistItems.map((elem,index)=>{
									console.log(elem.job_id)
									
									//console.log(elem)
									
									var y = this.props.appliedJoblist && this.props.appliedJoblist.length > 0 && elem.job_id ?
									this.props.appliedJoblist.filter((applieditem) => applieditem.job_id._id == elem.job_id._id) : [];
					                //console.log(this.props.appliedJoblist)
					                //console.log(elem._id)
					                if (y && y.length > 0) {
					                  var appliedClass = '';
					                  var appliedtooltipMsg = 'Remove from applied job';
					                } else {
					                  var appliedClass = '-o';
					                  var appliedtooltipMsg = 'Apply Job';
					                }
					               	
									return(
										<div className="col-sm-6">
									 	{ elem.job_id ?
										<div className="col-12">
											<div className="row appliedJobListContainer">
												<div className="col-12">
													<div className="row">
														<div className="col-12">
															<div className="row">
																<div className="col-xl-10 col-10 jobListLeftContent">
																	<div className="row">
																		<div className="col-12">
																			<div className="col-12 iconsBar">
																				<ul>	
																					{
																					elem.job_id.jobBasicInfo.gender=="Male Only"?
																					<li><i className="fa fa-male" title="Only male candidates can apply"></i></li>
																					: elem.job_id.jobBasicInfo.gender=="Female Only"?
																					<li><i className="fa fa-female" title="Only female candidates can apply"></i></li> 
																					: <li><i className="fa fa-male" title="male & female candidates both can apply"></i><i className="fa fa-female bothIcon" title="male & female candidates both can apply"></i></li>
																					}
																					{	 
																						elem.job_id.jobBasicInfo.jobshift_id ? 
																						elem.job_id.jobBasicInfo.jobshift_id.jobShift=="Day Shift" ?
																						<li><i className="fa fa-sun-o" title="Day Shift"></i></li>
																						: elem.job_id.jobBasicInfo.jobshift_id.jobShift=="Night Shift"?
																						<li><i className="fa fa-moon-o" title="Night Shift"></i></li> 
																						: <li><i className="fa fa-repeat" title="Rotational shift"></i></li> 
																						:
																						<li><i className="fa fa-sun-o" title="Day Shift"></i></li>
																						
																					}	
																					{	
																						elem.job_id.jobBasicInfo.jobtime_id.jobTime=="Full Time"?
																						<li><i className="fa fa-clock-o" title="Full Time"></i></li>
																						: elem.job_id.jobBasicInfo.jobtime_id.jobTime=="Part Time" ? <li><i className="fa fa-hourglass-start" title="Part Time"></i></li>
																						: elem.job_id.jobBasicInfo.jobtime_id.jobTime=="Hourly Basis"? 
																						<li><i className="fa fa-hourglass-o" title="Hourly Basis"></i></li> 
																						: <li><i className="fa fa-hourglass-o" title="Hourly Basis"></i></li> 
																					}
																					<li><div className="infoLog"> {Moment(elem.createdAt).startOf('seconds').fromNow()} </div></li>
																				</ul>
																			
																			</div>
																		</div>
																	</div>
																	<div className="row">
																		<div className="col-12">
																			<div className="col-12 jobListDesignation">
																				{elem.job_id.jobBasicInfo.jobTitle}
																			</div>
																		</div>
																	</div>
																	<div className="row">
																		<div className="col-12">
																			<div className="col-12 jobListCompanyName">
																				<b>{elem.job_id ? elem.job_id.company_id.companyName : "Anonymous"}</b>
																			</div>
																		</div>
																	</div>
																	<div className="row appliedListSubFont">
																		<div className="col-12"> 
																			<div className="col-12"> 
																				<i className="fa fa-calendar jobListExperience"></i> &nbsp;&nbsp;Exp&nbsp;:&nbsp;{elem.job_id.eligibility.minExperience} Years
																			</div>
																			<div className="col-12"> 
																				<i className="fa fa-rupee jobListMonSal"></i> &nbsp; <i className="fa fa-inr"></i> {elem.job_id.ctcOffered.minSalary} - <i className="fa fa-inr"></i> {elem.job_id.ctcOffered.maxSalary} a month
																			</div>
																			<div className="col-12 joblistLocationInfo">
																				<i className="fa fa-map-marker jobListLocation"></i> &nbsp; {elem.job_id.location.address + " "+ elem.job_id.location.district + ", "+elem.job_id.location.state+", "+elem.job_id.location.country}
																			</div>
																			<div className="col-12"> 
																				<i className="fa fa-users jobListNumPositions"></i> &nbsp; No of position : {elem.job_id.jobBasicInfo.positions}
																			</div>
																		</div>
																	</div>
																
																</div>
																<div className="col-xl-2 col-2 jobListRightContent">
																	
																			<div className="jobProfileVerticleIcons">
																				<ul>
																					<li><i title={appliedtooltipMsg} className={"fa fa-check-square" + appliedClass}  onClick={appliedClass == '-o' ? applyJob => this.applyJob(elem.job_id._id, elem.company_id) : removeApplication => this.removeApplication(elem.job_id._id) } ></i></li>
																					<li ><i title="Remove from wishlist" onClick={wishlist => this.handleclick(elem.job_id._id)} className={"fa fa-heart"}></i></li>
																					{/*<li><i className="fa fa-youtube-play"></i></li>*/}
																				</ul>
																			</div>
																	
																</div>
															</div>	
														</div>
													</div>
												</div>
											</div>
										</div>
										: null
										}
										</div>	
									);
									
									
								})
							:
								null
						}
						</div>
				</div>
			</section>
		);
	}
}
const mapStateToProps = (state)=>{
    return {
    	userDetails 	: state.userDetails, 	appliedJobSelector : state.appliedJobSelector,		
    	jobList 		: state.jobList,		jobCount  	: state.jobCount, 
    	jobWishlist 	: state.jobWishlist, 	jobWishlistSelector : state.jobWishlistSelector,
    	appliedJoblist  : state.appliedJoblist
    }
}
const mapDispatchToProps = (dispatch) => ({
  mapAction :  bindActionCreators(mapActionCreator, dispatch)
}) 
export default connect(mapStateToProps, mapDispatchToProps) (JobWishlist);
