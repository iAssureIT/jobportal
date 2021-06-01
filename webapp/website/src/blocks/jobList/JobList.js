import React, {Component} from 'react';
import Axios from  'axios';
import Swal  from  'sweetalert2';
import Moment 					from "moment";
import "./JobList.css";
import '../../App.css';
import { withRouter }     from 'react-router-dom';
import { connect }        from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../common/actions/index';
import UploadVideoModal from '../UploadVideoModal/UploadVideoModal.js';
/*import Pagination from "react-js-pagination";*/
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
	const userDetails = JSON.parse(localStorage.getItem("userDetails"));
	if (userDetails) {
		const token = userDetails.token;
  		Axios.defaults.headers.common['Authorization'] = 'Bearer '+ token;
	}
  	
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

search = (event)=>{
	event.preventDefault();
	const searchTxt = event.currentTarget.value;
	if(searchTxt !== ""){ 
		Axios.get("/api/jobposting/get/searchlist/" + searchTxt)
			.then(response => {
				this.setState({jobList : response.data.jobList });
			})
			.catch(error=>{
				Swal.fire('', "Error while getting List data", '');
			});
	}else{
		this.getJobsData();
	}
}


applyJob = (jobid, company_id, total,  male, female, other, district, jobDistrict, state, stateCode, country,countryCode, exp0to2, exp2to6, exp6to10 )=>{
	var {mapAction} = this.props;	
	console.log("jobid :", jobid);
	
	if (this.props.userDetails.loggedIn) {

		if (this.props.userDetails.profileCompletion == 100) {
			var formValues = { 
						candidate_id   		: this.props.userDetails.candidate_id,
						job_id         		: jobid,
					    entity_id    		: company_id,
					    status        	  	: "Applied",
					    male 				: male,
					    female 				: female,
					    other				: other,
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
				title 				: ' ',
				html 				: 'Are you sure<br />you want to apply for this job?',
				text 				: '',
				showCloseButton		: true,
				showCancelButton 	: true,
				confirmButtonText 	: 'Yes',
				cancelButtonText 	: 'NO',
				confirmButtonColor  : '#f5a721',
				reverseButtons		: true
			
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
		}else{
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
removeApplication = (job_id, male, female, other, state, stateCode, country,countryCode, exp0to2, exp2to6, exp6to10) => {
	var {mapAction} = this.props;	
	if (this.props.userDetails.loggedIn) {
		var formValues = { 
			candidate_id   		: this.props.userDetails.candidate_id,
			job_id         		: job_id,
			male 				: male,
		    female 				: female,
		    other				: other,
		    state 				: state,
		    jobstateCode 		: stateCode,
		    country 			: country,
		    jobcountryCode 		: countryCode,
		    exp0to2 			: exp0to2,
		    exp2to6 			: exp2to6,
		    exp6to10 			: exp6to10
		}
		Swal.fire({
		title 				: '',
		html 				: 'Are you sure<br />do you want to remove this job application?',
		text 				: '',
		icon 				: 'success',
		showCloseButton		: true,
		showCancelButton 	: true,
		confirmButtonText 	: 'Yes',
		cancelButtonText 	: 'NO',
		confirmButtonColor  : '#db3700',
		reverseButtons		: true
	
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
		console.log(this.props.selector)
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
														<a href={"/job-profile/"+elem._id} className="link">{elem.jobBasicInfo.jobTitle}</a>
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
												</div>
												<div className="col-lg-1 jobListRightContent">
													<div className="row">
														<div className="col-lg-offset-2 col-lg-12">
															<div className="jobListVerticleIcons">
																<ul>
																	<li><i title={appliedtooltipMsg} className={"fa fa-check-square" + appliedClass}  
																	onClick={appliedClass == '-o' ? 
																	applyJob => this.applyJob(elem._id, elem.company_id, elem.applicantStatistics.male, 
																								elem.applicantStatistics.female, elem.applicantStatistics.other, 
																								elem.applicantStatistics.state, elem.location.stateCode,
																								elem.applicantStatistics.country, elem.location.countryCode,
																								elem.applicantStatistics.exp0to2,  elem.applicantStatistics.exp2to6, 
																								elem.applicantStatistics.exp6to10) 
																	: removeApplication => this.removeApplication(elem._id, elem.applicantStatistics.male, 
																								elem.applicantStatistics.female, elem.applicantStatistics.other, 
																								elem.applicantStatistics.state, elem.location.stateCode,
																								elem.applicantStatistics.country, elem.location.countryCode,
																								elem.applicantStatistics.exp0to2,  elem.applicantStatistics.exp2to6, 
																								elem.applicantStatistics.exp6to10 ) } ></i></li>
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
export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Joblist));

