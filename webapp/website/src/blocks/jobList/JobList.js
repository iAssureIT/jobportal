import React, {Component} from 'react';
import Axios from  'axios';
import Swal  from  'sweetalert2';
import Moment 					from "moment";
import "./JobList.css";
import '../../App.css';
import { connect }        from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../common/actions/index';
import UploadVideoModal from '../UploadVideoModal/UploadVideoModal.js';
/*import {
  RecordWebcam,
  useRecordWebcam,
  CAMERA_STATUS
} from "react-record-webcam";*/

class Joblist extends Component{
	constructor(props){
	super(props);
	this.state={
		jobList  		: [],
		isToggle 		: true,
		appliedItems 	: [],
	}

}

componentDidMount(){
	
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
				mapAction.getJobWishlist(this.props.userDetails.candidate_id);

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

search = (event)=>{
	event.preventDefault();
	const searchTxt = event.currentTarget.value;
	if(searchTxt !== ""){ 
		Axios.get("/api/jobposting/get/searchlist/" + searchTxt)
			.then(response => {
				this.setState({jobList : response.data.jobList });
			})
			.catch(error=>{
				Swal.fire("Error while getting List data", error.message, 'error');
			});
	}else{
		this.getJobsData();
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
		confirmButtonText 	: 'Yes, Add it!',
		cancelButtonColor 	: 'No, keep it',
		confirmButtonColor  : '#f5a721',
	
	}).then((result) =>{
		console.log("result", result.value)
		if(result.value){
			Axios.post("/api/applyJob/post", formValues)
				.then(response =>{
					
					var {mapAction} = this.props;
					mapAction.getAppliedJoblist(this.props.userDetails.candidate_id);

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
					mapAction.getAppliedJoblist(this.props.userDetails.candidate_id);

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
					<div className="row">
						{/*<div className="col-lg-4 col-lg-offset-8">
							<div className="input-group searchMainTab">
								<input type="text" name="search" id="search" className="form-control jobListSearchTab" placeholder="Search by Job Title..." onChange={this.search}/>
								<span className="input-group-addon searchTabAddOn"><i className="fa fa-search"></i> </span> 
							</div> 
						</div>*/} 
						{
							this.props.jobList 
							?
								this.props.jobList.map((elem,index)=>{
									//console.log(elem._id )
									
								var x = this.props.jobWishlist && this.props.jobWishlist.length > 0 ?
								this.props.jobWishlist.filter((wishlistitem) => wishlistitem.wishlistItems.job_id == elem._id) : [];
				                
				                if (x && x.length > 0) {
				                  var wishClass = '';
				                  var tooltipMsg = 'Remove from wishlist';
				                } else {
				                  var wishClass = '-o';
				                  var tooltipMsg = 'Add to wishlist';
				                }

				                var y = this.props.appliedJoblist && this.props.appliedJoblist.length > 0 ?
								this.props.appliedJoblist.filter((applieditem) => applieditem.job_id == elem._id) : [];
				                console.log(this.props.appliedJoblist)
				                console.log(elem._id)
				                if (y && y.length > 0) {
				                  var appliedClass = '';
				                  var appliedtooltipMsg = 'Remove from applied job';
				                } else {
				                  var appliedClass = '-o';
				                  var appliedtooltipMsg = 'Apply Job';
				                }
								return(
									<div className="col-lg-6">
										<div className="jobListContainer">
											<div className="col-lg-12">
												<div className="col-lg-11 jobListLeftContent">
													<div className="row">
														<div className="iconsBar">
															<ul>	 
																{
																	elem.jobBasicInfo.gender=="Male Only"?
																	<li><i className="fa fa-male" title="Only male candidates can apply"></i></li>
																	: elem.jobBasicInfo.gender=="Female Only"?
																	<li><i className="fa fa-female" title="Only female candidates can apply"></i></li> : <li><i className="fa fa-male" title="male & female candidates both can apply"></i><i className="fa fa-female bothIcon" title="male & female candidates both can apply"></i></li>
																}
																{	
																	elem.jobBasicInfo.jobshift_id ? 
																	elem.jobBasicInfo.jobshift_id.jobShift=="Day Shift" ?
																	<li><i className="fa fa-sun-o" title="Day Shift"></i></li>
																	: elem.jobBasicInfo.jobshift_id.jobShift=="Night Shift"?
																	<li><i className="fa fa-moon-o" title="Night Shift"></i></li> 
																	: <li><i className="fa fa-repeat" title="Rotational shift"></i></li> 
																	:
																	<li><i className="fa fa-sun-o" title="Day Shift"></i></li>
																}	
																{	
																	elem.jobBasicInfo.jobtime_id.jobTime=="Full Time"?
																	<li><i className="fa fa-clock-o" title="Full Time"></i></li>
																	: elem.jobBasicInfo.jobtime_id.jobTime=="Part Time" ? <li><i className="fa fa-hourglass-start" title="Part Time"></i></li>
																	: elem.jobBasicInfo.jobtime_id.jobTime=="Hourly Basis"? 
																	<li><i className="fa fa-hourglass-o" title="Hourly Basis"></i></li> 
																	: <li><i className="fa fa-hourglass-o" title="Hourly Basis"></i></li>
																}	
															</ul>
															<div className="infoLog"> {Moment(elem.createdAt).startOf('seconds').fromNow()}  </div>
														</div>
													</div>
													<div className="jobListDesignation">
														<a href={"/job-profile/"+elem._id} className="link">{elem.jobBasicInfo.jobTitle}</a>
													</div>
													<div className="jobListCompanyName">
														<b>{elem.company_id ? elem.company_id.companyName : "Anonymous"}</b>
													</div>
													<div> 
														<i className="fa fa-calendar jobListExperience"></i> &nbsp; Exp: {elem.eligibility.minExperience} years
													</div>
													<div> 
														<i className="fa fa-rupee jobListMonSal"></i> &nbsp; <i className="fa fa-inr"></i> {elem.ctcOffered.minSalary} - <i className="fa fa-inr"></i> {elem.ctcOffered.maxSalary} a month
													</div>
													<div className="joblistLocationInfo">
														<i className="fa fa-map-marker jobListLocation"></i> &nbsp; {elem.location.address + " "+ elem.location.district + ", "+elem.location.state+", "+elem.location.country}
													</div>
													<div> 
														<i className="fa fa-users jobListNumPositions"></i> &nbsp; No of position : {elem.jobBasicInfo.positions}
													</div>
												</div>
												<div className="col-lg-1 jobListRightContent">
													<div className="row">
														<div className="col-lg-offset-2 col-lg-12">
															<div className="jobListVerticleIcons">
																<ul>
																	
																	<li><i title={appliedtooltipMsg} className={"fa fa-check-square" + appliedClass}  onClick={appliedClass == '-o' ? applyJob => this.applyJob(elem._id, elem.company_id) : removeApplication => this.removeApplication(elem._id) } ></i></li>
																	<li ><i title={tooltipMsg} onClick={wishlist => this.handleclick(elem._id)} className={"fa fa-heart" + wishClass}></i></li>
																	{/*<li><i className="fa fa-youtube-play" id="video" data-toggle="modal" data-target="#videoModal"></i></li>*/}
																</ul>
															</div>
														</div>
													</div>
												</div>

												 <div className="modal" id="videoModal" role="dialog" tabIndex="-1">
									                <div className="modal-dialog  modal-lg">
									                  <div className="modal-body">
									                      <button type="button" className="close" id="videoModalCloseButton" data-dismiss="modal">&times;</button>
									                      <section className="OTPSentWrapper row">
									                           
									                        <UploadVideoModal/>
									                      </section>
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
				</div>
			</section>
		);
	}
}

const mapStateToProps = (state)=>{
    return {
    	userDetails 	: state.userDetails,	selector        : state.selector, 	
    	jobList 		: state.jobList,		jobWishlist 	: state.jobWishlist, 
    	appliedJoblist  : state.appliedJoblist
    }
}
const mapDispatchToProps = (dispatch) => ({
  mapAction :  bindActionCreators(mapActionCreator, dispatch)
}) 
export default connect(mapStateToProps, mapDispatchToProps) (Joblist);