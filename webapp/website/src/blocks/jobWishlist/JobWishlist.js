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
	
}
handleclick = (jobid)=>{
	console.log("jobid : ", jobid);
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
									'Removed!',
									'Job is removed from wishlist',
									'success'
							);
				}else{
					Swal.fire(
									'Added!',
									'Job is added to wishlist',
									'success'
							);
				}
			})
			.catch(error=>{
				console.log(error);
			})	
	}else{
		document.getElementById("loginbtndiv").click();
	}
}
applyJob = (jobid, company_id)=>{
	console.log("jobid :", jobid);
	
	if (this.props.userDetails.loggedIn) {
	var formValues = { 
						candidate_id   		: this.props.userDetails.candidate_id,
						job_id         		: jobid,
					    entity_id    		: company_id,
					    status        	  	: "Applied"
	}
	console.log(formValues)
	Swal.fire({
		title 				: 'Are you sure, do you want to apply for this job?',
		icon 				: 'success',
		showCancelButton 	: true,
		confirmButtonText 	: 'Apply',
		cancelButtonColor 	: 'No, keep it',
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
									'Applied!',
									'You have applied job successfully!',
									'success'
							);
					}
				})
				.catch(error=>{
					Swal.fire(
								"Some problem occured while applying job!",
								error.message,
								'error'
						)
				})
			
				}else if (result.dismiss === Swal.DismissReason.cancel){
					// Swal.fire(
					// 	'Cancelled',
					// 	'Not added to applied joblist',
					// 	'error'
					// )
				}
			})

	}else{
		document.getElementById("loginbtndiv").click();
	}
}
removeApplication = (job_id) => {
	console.log(job_id)
	if (this.props.userDetails.loggedIn) {
		var formValues = { 
			candidate_id   		: this.props.userDetails.candidate_id,
			job_id         		: job_id
		}
		Swal.fire({
		title 				: 'Are you sure, do you want to remove this job application?',
		icon 				: 'success',
		showCancelButton 	: true,
		confirmButtonText 	: 'Yes, remove it!',
		cancelButtonColor 	: 'No, keep it',
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
									'Applied!',
									'You have removed job application!',
									'success'
							);
					}
				})
				.catch(error=>{
					Swal.fire(
								"Some problem occured while removing job application!",
								error.message,
								'error'
						)
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
				<div className="col-lg-12 JobListWrapperMain">
					{/*<div className="col-lg-4 col-lg-offset-8">
							<div className="input-group searchMainTab">
								<input type="text" name="jobTitle" id="jobTitle" className="form-control jobListSearchTab" placeholder="Search by Job Title..." onChange={this.search}/>
								<span className="input-group-addon searchTabAddOn"><i className="fa fa-search"></i> </span> 
							</div> 
						</div> */}
						{
							this.props.jobWishlist[0]
							?
								this.props.jobWishlist[0].wishlistItems.map((elem,index)=>{
									//console.log(elem)
									var y = this.props.appliedJoblist && this.props.appliedJoblist.length > 0 ?
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
															<b>iAssure International Technologies Pvt Ltd</b>
														</div>
														<div> 
															<i className="fa fa-calendar jobListExperience"></i> &nbsp; Exp: {elem.job_id.eligibility.minEducation} To {elem.job_id.eligibility.minExperience}
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
export default connect(mapStateToProps, mapDispatchToProps) (JobWishlist);
