import React, {Component} 	  from 'react';
import Axios 			  	  from  'axios';
import Swal  			  	  from  'sweetalert2';
import Moment 				  from "moment";
import { connect }        	  from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../common/actions/index';
import UploadVideoModal 	  from '../UploadVideoModal/UploadVideoModal.js';
/*import Pagination from "react-js-pagination";*/
import "./JobList.css";
import '../../App.css';
require("bootstrap/less/bootstrap.less");

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
		startLimit 		: this.props.selector.startLimit,
	}

}

componentDidMount(){
	 
}

showMore(){

	var selector 		  	= this.props.selector;

	selector.startLimit   	= this.props.selector.startLimit === 0 
	? this.props.selector.startLimit + this.props.selector.initialLimit  
	: this.props.selector.startLimit + this.props.selector.showMoreLimit

	console.log(selector)
  	
  	var {mapAction} = this.props;
    mapAction.filterJobList(selector);
}

handlePageChange(pageNumber) {
	//console.log(`active page is ${pageNumber}`);
	this.setState({activePage: pageNumber});
	
	var activePage = pageNumber;

	var selector=this.props.selector;
  	
  	selector.startLimit   = (activePage-1) * 5;
  	selector.endLimit     = activePage * 5;
  	selector.activePage   = pageNumber;

  	var {mapAction} = this.props;
    mapAction.filterJobList(selector);

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
							/*Swal.fire(
									'Removed!',
									'Job is removed from wishlist',
									'success'
							);*/
				}else{
					/*Swal.fire(
									'Added!',
									'Job is added to wishlist',
									'success'
							);*/
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

applyJob = (jobid, company_id, total,  male, female, other, district, jobDistrict, state, stateCode, country,countryCode, exp0to2, exp2to6, exp6to10 )=>{
	console.log("jobid :", male, female, other);
	
	if (this.props.userDetails.loggedIn) {
	var formValues = { 
						candidate_id   		: this.props.userDetails.candidate_id,
						job_id         		: jobid,
					    entity_id    		: company_id,
					    status        	  	: "Applied",
					    total 				: total,
					    male 				: male,
					    female 				: female,
					    other				: other,
					    district 			: district,
					    jobDistrict 		: jobDistrict,
					    state 				: state,
					    jobstateCode 		: stateCode,
					    country 			: country,
					    jobcountryCode 		: countryCode,
					    exp0to2 			: exp0to2,
					    exp2to6 			: exp2to6,
					    exp6to10 			: exp6to10
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

					mapAction.filterJobList(this.props.selector);

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
					
				}
			})

	}else{
		document.getElementById("loginbtndiv").click();
	}
}

removeApplication = (job_id, total, male, female, other, district, jobDistrict, state, stateCode, country,countryCode, exp0to2, exp2to6, exp6to10) => {
	console.log("jobid :", male, female, other);
	
	if (this.props.userDetails.loggedIn) {
		var formValues = { 
			candidate_id   		: this.props.userDetails.candidate_id,
			job_id         		: job_id,
			total 				: total,
			male 				: male,
		    female 				: female,
		    other				: other,
		    district 			: district,
			jobDistrict 		: jobDistrict,
		    state 				: state,
		    jobstateCode 		: stateCode,
		    country 			: country,
		    jobcountryCode 		: countryCode,
		    exp0to2 			: exp0to2,
		    exp2to6 			: exp2to6,
		    exp6to10 			: exp6to10
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
					mapAction.filterJobList(this.props.selector);
					
					var appliedJobSelector  = this.props.appliedJobSelector;
				    appliedJobSelector.candidate_id = this.props.userDetails.candidate_id;
				    
					mapAction.getAppliedJoblist(appliedJobSelector);

					if(response.data.deleted){

						Swal.fire(
									'Removed!',
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
		//console.log(this.props.selector)
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
								//console.log("elem.applicantStatistics",elem.applicantStatistics)	
								var x = this.props.jobWishlist && this.props.jobWishlist.length > 0 ?
								this.props.jobWishlist[0].wishlistItems.filter((wishlistitem) => wishlistitem.job_id._id == elem._id) : [];
				                
				                if (x && x.length > 0) {
				                  var wishClass = '';
				                  var tooltipMsg = 'Remove from wishlist';
				                } else {
				                  var wishClass = '-o';
				                  var tooltipMsg = 'Add to wishlist';
				                }

				                var y = this.props.appliedJoblist && this.props.appliedJoblist.length > 0 ?
								this.props.appliedJoblist.filter((applieditem) => applieditem.job_id._id == elem._id) : [];
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
																	<li><i className="fa fa-female" title="Only female candidates can apply"></i></li>
																	 : <li><i className="fa fa-male" title="male & female candidates both can apply"></i>
																	 <i className="fa fa-female bothIcon" title="male & female candidates both can apply"></i></li>
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
														<a href={"/job-profile/"+elem._id} className="link">{elem.jobBasicInfo.jobTitle + "("+elem.jobID +")"}</a>
													</div>
													<div className="jobListCompanyName">
														<b>{elem.company_id ? elem.company_id.companyName : "Anonymous"}</b>
													</div>
													<div> 
														<i className="fa fa-calendar jobListExperience"></i> &nbsp; Exp: {elem.eligibility.minExperience}
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

													<div class="modal fade" id="wishlistModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
													    <div class="modal-dialog delModalMain">
													      <div class="modal-content delModalContent">
													        <div class="modal-header delHeader">
													          <button type="button" class="close delCloseBtn" data-dismiss="modal" aria-label="Close">
													            <span aria-hidden="true">&times;</span>
													          </button>
													        </div>
													        <div class="modal-body delModalBody">
													          <div class="delBodyText">
													            Job is added to the wishlist
													          </div> 
													        </div>
													      </div>
													    </div>
													</div>

													<div class="modal fade" id="appliedJobModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
													    <div class="modal-dialog delModalMain">
													      <div class="modal-content delModalContent">
													        <div class="modal-header delHeader">
													          <button type="button" class="close delCloseBtn" data-dismiss="modal" aria-label="Close">
													            <span aria-hidden="true">&times;</span>
													          </button>
													        </div>
													        <div class="modal-body delModalBody">
													          <div class="delBodyText">
													            Are you sure <br />
													            you want to apply for this job?
													          </div>
													          <div className="col-lg-12 delMainBtnDiv">
													              <button type="button" class="btn btn-default delModalBtnOne col-lg-3" data-dismiss="modal">NO</button> 
													              <button type="button" class="btn btn-default delModalBtnTwo col-lg-3" data-dismiss="modal" onClick={this.deleteJob} id = {elem._id}>YES</button>
													          </div> 
													        </div>
													      </div>
													    </div>
													</div>

												</div>
												<div className="col-lg-1 jobListRightContent">
													<div className="row">
														<div className="col-lg-offset-2 col-lg-12">
															<div className="jobListVerticleIcons">
																<ul>
																	<li><i title={appliedtooltipMsg} className={"fa fa-check-square" + appliedClass}  data-toggle="modal" data-target="#appliedJobModal" data-dismiss="modal"
																	onClick={appliedClass == '-o' ? 
																	applyJob => this.applyJob(elem._id, elem.company_id._id, elem.applicantStatistics.total, elem.applicantStatistics.male, 
																								elem.applicantStatistics.female, elem.applicantStatistics.other, 
																								elem.applicantStatistics.district, elem.location.district,
																								elem.applicantStatistics.state, elem.location.stateCode,
																								elem.applicantStatistics.country, elem.location.countryCode,
																								elem.applicantStatistics.exp0to2,  elem.applicantStatistics.exp2to6, 
																								elem.applicantStatistics.exp6to10) 
																	: removeApplication => this.removeApplication(elem._id, elem.applicantStatistics.total, elem.applicantStatistics.male, 
																								elem.applicantStatistics.female, elem.applicantStatistics.other, 
																								elem.applicantStatistics.district, elem.location.district,
																								elem.applicantStatistics.state, elem.location.stateCode,
																								elem.applicantStatistics.country, elem.location.countryCode,
																								elem.applicantStatistics.exp0to2,  elem.applicantStatistics.exp2to6, 
																								elem.applicantStatistics.exp6to10 ) } ></i></li>
																	<li><i title={tooltipMsg} onClick={wishlist => this.handleclick(elem._id)} className={"fa fa-heart" + wishClass} data-toggle="modal" data-target="#wishlistModal" data-dismiss="modal"></i></li>
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
							<h3 style={{margin:"100px"}}>No Jobs Found</h3>
						}

						{/*<div className="col-lg-12">
					        <Pagination
					          activePage={this.state.activePage}
					          itemsCountPerPage={5}
					          totalItemsCount={this.props.jobCount[0] ? this.props.jobCount[0].jobCount : 0}
					          pageRangeDisplayed={5}
					          onChange={this.handlePageChange.bind(this)}
					        />
					    </div>*/}


						<div className="col-lg-12">
					       	{
								this.props.jobCount ? 
								(this.props.selector.startLimit + this.props.selector.showMoreLimit) >= this.props.jobCount ? null :
								<button className="btn buttonYellow" style={{float:"right", margin:"20px 0"}} onClick={this.showMore.bind(this)}>Show {this.props.selector.showMoreLimit} More</button>
					        
					        	: 
					        	<button className="btn buttonYellow" style={{float:"right", margin:"20px 0"}} onClick={this.showMore.bind(this)}> Show More </button>
					        
							}
					    </div>


					</div>
				</div>
			</section>
		);
	}
}

const mapStateToProps = (state)=>{
    return {
    	userDetails 	: state.userDetails,	selector        	: state.selector, 	
    	jobList 		: state.jobList,		jobCount  			: state.jobCount,
    	jobWishlist 	: state.jobWishlist, 	jobWishlistSelector : state.jobWishlistSelector,
    	appliedJoblist  : state.appliedJoblist, appliedJobSelector 	: state.appliedJobSelector
    }
}
const mapDispatchToProps = (dispatch) => ({
  mapAction :  bindActionCreators(mapActionCreator, dispatch)
}) 
export default connect(mapStateToProps, mapDispatchToProps) (Joblist);