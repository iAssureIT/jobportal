import React, {Component} from 'react';
import Axios from  'axios';
import Swal  from  'sweetalert2';
import Moment 					from "moment";
import { connect }        from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../common/actions/index';
import "./AppliedJoblist.css";

class AppliedJoblist extends Component{
	constructor(props){
	super(props);
	this.state={
		jobList  		: [],
		isToggle 		: true,
		appliedItems 	: [],
	}
}

componetDidMount(){
	const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  	const token = userDetails.token;
  	Axios.defaults.headers.common['Authorization'] = 'Bearer '+ token;
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
		html				: 'Are you sure<br />you want to remove this job application?',
		icon 				: 'success',
		showCloseButton		: true,
		showCancelButton 	: true,
		confirmButtonText 	: 'YES',
		cancelButtonText 	: 'NO',
		confirmButtonColor  : '#db3700',
		reverseButtons		: true
	
		}).then((result) =>{
			if(result.value){

				Axios.post("/api/applyJob/removeApplication", formValues)
				.then(response =>{
					
					var appliedJobSelector  = this.props.appliedJobSelector;
				    appliedJobSelector.candidate_id = this.props.userDetails.candidate_id;
				    mapAction.getAppliedJoblist(appliedJobSelector);
					//mapAction.getAppliedJoblist(this.props.userDetails.candidate_id);

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
								'')
			            }
						
				})
			}

		})
	}else{
		document.getElementById("loginbtndiv").click();
	}
}	
wishlistJob = (jobid)=>{
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
				
				var jobWishlistSelector = this.props.jobWishlistSelector;
			    jobWishlistSelector.candidate_id = this.props.userDetails.candidate_id;
			    mapAction.getJobWishlist(jobWishlistSelector);
				//mapAction.getJobWishlist(this.props.userDetails.candidate_id);

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
						"Error!",
						'')
	            }
				console.log(error);
			})	
	}else{
		document.getElementById("loginbtndiv").click();
	}
}
	render(){
		return(
			<section className="jobListWrapper">
				<div className="col-lg-12 JobListWrapperMain">
					<div className="col-lg-4 col-lg-offset-8">
						{/*<div className="input-group searchMainTab">
							<input type="text" name="search" id="search" className="form-control jobListSearchTab" placeholder="Search by Job Title..." onChange={this.search}/>
							<span className="input-group-addon searchTabAddOn"><i className="fa fa-search"></i> </span> 
						</div> */}
					</div> 
						{
							this.props.appliedJoblist.length > 0
							?
								this.props.appliedJoblist.map((elem,index)=>{

									var x = this.props.jobWishlist && this.props.jobWishlist.length > 0 ?
									this.props.jobWishlist[0].wishlistItems.filter((wishlistitem) => wishlistitem.job_id._id == elem.job_id._id) : [];
					                
					                if (x && x.length > 0) {
					                  var wishClass = '';
					                  var tooltipMsg = 'Remove from wishlist';
					                } else {
					                  var wishClass = '-o';
					                  var tooltipMsg = 'Add to wishlist';
					                }
									return(
										<div>
									 	{ elem.job_id ?
										<div className="col-lg-6">
											<div className="appliedJobListContainer">
												<div className="col-lg-12">
													<div className="col-lg-11 jobListLeftContent">
														<div className="row">
															<div className="iconsBar">
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
																</ul>
																<div className="infoLog"> {Moment(elem.createdAt).startOf('seconds').fromNow()} </div>
															</div>
														</div>
														<div className="jobListDesignation">
															{elem.job_id.jobBasicInfo.jobTitle}
														</div>
														<div className="jobListCompanyName">
															{/*<b>{elem.company_id ? elem.company_id.companyName : null}</b>*/}
															{elem.company_id ? elem.company_id.companyName : "Anonymous"}
														</div>
														<div> 
															<i className="fa fa-calendar jobListExperience"></i> &nbsp; Exp: {elem.job_id.eligibility.minExperience}
														</div>
														<div> 
															<i className="fa fa-rupee jobListMonSal"></i> &nbsp; <i className="fa fa-inr"></i> {elem.job_id.ctcOffered.minSalary} - <i className="fa fa-inr"></i> {elem.job_id.ctcOffered.maxSalary} a month
														</div>
														<div className="joblistLocationInfo">
															<i className="fa fa-map-marker jobListLocation"></i> &nbsp; {elem.job_id.location.address + " "+ elem.job_id.location.district + ", "+elem.job_id.location.state+", "+elem.job_id.location.country}
														</div>
														<div> 
															<i className="fa fa-users jobListNumPositions"></i> &nbsp; No of position : {elem.job_id.jobBasicInfo.positions}
														</div>
													</div>
													<div className="col-lg-1 jobListRightContent">
														<div className="row">
															<div className="col-lg-12">
																<div className="jobProfileVerticleIcons">
																	<ul>
																		{/*<li><i className="fa fa-check" onClick={this.applyJob}></i></li>*/}
																		<li><i title="Remove from applied job" className={"fa fa-check-square"}  onClick={ removeApplication => this.removeApplication(elem.job_id._id) } ></i></li>
																		<li ><i title={tooltipMsg} onClick={wishlist => this.wishlistJob(elem.job_id._id)} className={"fa fa-heart" + wishClass}></i></li>
																	
																		{/*<li><i onClick={wishlist => this.wishlistJob(elem._id)} className={this.state.isToggle ? 'fa fa-heart-o':'fa fa-heart'}></i></li>
																		<li><i className="fa fa-youtube-play"></i></li>*/}
																	</ul>
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
export default connect(mapStateToProps, mapDispatchToProps) (AppliedJoblist);