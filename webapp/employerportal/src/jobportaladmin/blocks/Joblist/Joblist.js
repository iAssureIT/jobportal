import React, {Component} 		from 'react';
import Axios 			  		from 'axios';
import Swal  					from 'sweetalert2';
import Moment 					from "moment";
import { FontAwesomeIcon } 		from '@fortawesome/react-fontawesome';
import { connect }        		from 'react-redux';
import { bindActionCreators } 	from 'redux';
import  * as mapActionCreator 	from '../../common/actions/index';

class JobListView extends Component{
	constructor(props){
	super(props);
	this.state={
		jobList : [],
	}
}	

componentDidMount(){
	/*var selector=this.props.selector;
	selector.countryCode = "IN"; 

	this.setState({ selector: selector })

	var {mapAction} = this.props;
	mapAction.filterJobList(selector);*/
}

deleteJob = (event)=>{
	event.preventDefault();
	const job_id = event.currentTarget.id;

	Swal.fire({
		title 				: 'Are you sure? you want to delete this job!!!',
		text 				: 'You will not be able to recover this job',
		icon 				: 'warning',
		showCancelButton 	: true,
		confirmButtonText 	: 'Yes, delete it!',
		cancelButtonText 	: 'No, keep it',
		confirmButtonColor 	: '#f5a721',
	
	}).then((result) =>{
		if(result.value){
			if(job_id){
				Axios.delete("/api/jobs/delete/"+job_id)
				.then(response =>{
					if(response.data.message==="Job details deleted Successfully!"){
						var {mapAction} = this.props;
						mapAction.filterJobList(this.state.selector);

						Swal.fire(
									'Deleted!',
									'Job has been deleted successfully!',
									'success'
							);
					}
				})
				.catch(error=>{
					Swal.fire(
								"Some problem occured deleting job!",
								error.message,
								'error'
						)
				})
			}
				
				}else if (result.dismiss === Swal.DismissReason.cancel){
					Swal.fire(
						'Cancelled',
						'Your job is safe :)',
						'error'
					)
				}
			})
		}

	render(){
		
		return(
			<section className="jobListWrapper">
				<div className="col-lg-12 EmployeeListWrapperMain">
					{/*<div className="col-lg-4 col-lg-offset-8">
						<div className="input-group searchMainTab">
							<input type="text" name="jobTitle" id="jobTitle" className="form-control jobListSearchTab" placeholder="Search by Job Title..." onChange={this.search}/>
							<span className="input-group-addon searchTabAddOn"><i className="fa fa-search"></i> </span> 
						</div> 
					</div>*/} 
						{
							this.props.jobList
							?
								this.props.jobList.map((elem,index1)=>{
									console.log(elem)
									var applicantsCount = this.props.applicantsCountList.filter((appl, ind)=>{
										if (appl._id == elem._id) {
											return appl.candidatesApplied;
										}else{
											return 0
										}
										
									})
									return(
										<div className="col-lg-12" key={index1}>
											<div className="jobListContainer">
												<div className="col-lg-12">
													<div className="col-lg-11 jobListLeftContent">
														<div className="row">
															<div className="iconsBar">
																{/*<FontAwesomeIcon className="restRoomIcon" icon={['fas', 'restroom']} />*/}
																
																<ul>
																	{/*{
																		elem.jobBasicInfo.gender=="Male Only"?
																		<li><i className="fa fa-male"></i></li>
																		:
																		<li><i className="fa fa-female"></i></li>
																	}	
																	<li><i className="fa fa-sun-o sunIcon"></i></li>
																	<li><i className="fa fa-clock-o clockIcon"></i></li>*/}

																{
																	elem.jobBasicInfo.gender=="Male Only"?
																	<li><i className="fa fa-male" title="Only male candidates can apply"></i></li>
																	: elem.jobBasicInfo.gender=="Female Only"?
																	<li><i className="fa fa-female" title="Only female candidates can apply"></i></li> : <li><i className="fa fa-male" title="male & female candidates both can apply"></i><i className="fa fa-female bothIcon" title="male & female candidates both can apply"></i></li>
																}
																{	
																	elem.jobBasicInfo.jobshift_id ? elem.jobBasicInfo.jobshift_id.jobShift=="Day shift"?
																	<li><i className="fa fa-sun-o" title="Day shift"></i></li>
																	: elem.jobBasicInfo.jobshift_id.jobShift=="Night shift"?
																	<li><i className="fa fa-moon-o" title="Night shift"></i></li> : <li><i className="fa fa-repeat" title="Rotational shift"></i></li> 
																	:
																	<li><i className="fa fa-sun-o" title="Day shift"></i></li>
																}	
																{	
																	elem.jobBasicInfo.jobtime_id.jobTime=="Full time"?
																	<li><i className="fa fa-clock-o" title="Full time"></i></li>
																	: elem.jobBasicInfo.jobtime_id.jobTime=="Part time"?
																	<li><i className="fa fa-hourglass-start" title="Part time"></i></li> : <li><i className="fa fa-hourglass-o" title="None"></i></li> 
																}	
																</ul>
																<div className="infoLog"> {Moment(elem.createdAt).startOf('seconds').fromNow()}  </div>
															</div>
														</div>
														<div className="jobListDesignation">
															{elem.jobBasicInfo.jobTitle}
														</div>
														<div className="jobListCompanyName">
															{elem.company_id.companyName}
														</div>
														<div> 
															<i className="fa fa-calendar jobListExperience"></i> &nbsp; Exp: {elem.eligibility.minExperience}
														</div>
														<div> 
															<i className="fa fa-rupee jobListCtcSal"></i> &nbsp; <i className="fa fa-inr"></i> {elem.ctcOffered.minSalary} {elem.ctcOffered.minSalPeriod} - <i className="fa fa-inr"></i> {elem.ctcOffered.maxSalary} {elem.ctcOffered.maxSalPeriod}
														</div>
														<div>
															<i className="fa fa-map-marker jobListLocation"></i> &nbsp; {elem.location.address}
														</div>
														<div> 
															<i className="fa fa-users jobListNumPositions"></i> &nbsp; No. of positions : {elem.jobBasicInfo.positions}
														</div>
														<div className="joblistNoCount"> 
															<i className="fa fa-check-circle jobListNumapply"></i> &nbsp; <a href={"/applied-candidate-list/" + elem._id}> No. of applicants : {applicantsCount.length > 0 ? applicantsCount[0].candidatesApplied :  0}</a> 
														</div>
													</div>
													<div className="col-lg-1 jobListRightContent">
														<div className="row">
															<div className="col-lg-12">
																<div className="listEditBtn">
																	<a title = "Edit Profile" href={"/post-job/" + elem._id}><i className="fa fa-edit"></i></a>
																</div>
																<div className="listViewBtn">	
																	<a title = "View Profile" href={"/job-profile/" + elem._id}><i className="fa fa-eye"></i></a>
																</div>
																<div className="listDelBtn">	
																	<i title = "Delete Profile" className="fa fa-trash" onClick={this.deleteJob} id = {elem._id}></i>
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
        user_ID     : state.user_ID,  	candidate_id   : state.candidate_id,
        selector    : state.selector,   jobList     : state.jobList,
        applicantsCountList : state.applicantsCountList
    }
}
const mapDispatchToProps = (dispatch) => ({
  mapAction :  bindActionCreators(mapActionCreator, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(JobListView)
															
