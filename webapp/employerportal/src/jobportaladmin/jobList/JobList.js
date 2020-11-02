import React, {Component} from 'react';
import './JobList.css';

import Axios from  'axios';
import Swal  from  'sweetalert2';

export default class CompanyJobList extends Component{
	constructor(props){
	super(props);
	this.state={
		jobList : []
	}
}	

componentDidMount(){
	this.getJobsData();
}

getJobsData=()=>{
	Axios.get("api/jobs/getJobList")
	.then(response=>{
		console.log("getJobsData response.data : ", response.data);
		this.setState({
			jobList : response.data.jobList
		});
	})
	.catch(error=>{
		Swal.fire("Error while getting list data", error.message, "error");
	})
}

deleteJob = (event)=>{
	event.preventDefault();
	const job_id = event.currentTarget.id;

	Swal.fire({
		title 				: 'Are you sure? you want to delete this profile!!!',
		text 				: 'You will not be able to recover this profile',
		icon 				: 'warning',
		showCancelButton 	: true,
		confirmButtonText 	: 'Yes, delete it!',
		cancelButtonColor 	: 'No, keep it',
		confirmButtonColor 	: '#d33',
	
	}).then((result) =>{
		if(result.value){
			if(job_id){
				Axios.delete("apijobs/delete/"+job_id)
				.then(response =>{
					console.log()
					if(response.data.message==="Job details deleted Successfully!"){
						this.getJobsData();

						Swal.fire(
									'Deleted!',
									'Job Profile has been deleted successfully!',
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
						'Your job Profile is safe :)',
						'error'
					)
				}
			})
		}

	render(){
		return(
			<section className="jobListWrapper">
				<div className="col-lg-9 JobListWrapperMain pull-right"> 
						{
							this.state.jobList.length > 0
							?
								this.state.jobList.map((elem,index)=>{
									return(
										<div className="col-lg-6">
											<div className="jobListContainer">
												<div className="col-lg-12">
													<div className="col-lg-11 jobListLeftContent">
														<div className="row">
															<div className="iconsBar">
																<ul>	
																	<li><i className="fa fa-male"></i></li>
																	<li><i className="fa fa-sun-o"></i></li>
																	<li><i className="fa fa-clock-o"></i></li>
																</ul>
																<div className="infoLog"> 15 Days Ago </div>
															</div>
														</div>
														<div className="jobListDesignation">
															{elem.jobBasicInfo.jobTitle}
														</div>
														<div className="jobListCompanyName">
															<b>iAssure International Technologies Pvt Ltd</b>
														</div>
														<div> 
															<i className="fa fa-calendar jobListExperience"></i> &nbsp; Exp: {elem.eligibility.minEducation} To {elem.eligibility.minExperience}
														</div>
														<div> 
															<i className="fa fa-rupee jobListMonSal"></i> &nbsp; <i className="fa fa-inr"></i> {elem.ctcOffered.minSalary} - <i className="fa fa-inr"></i> {elem.ctcOffered.maxSalary} a month
														</div>
														<div>
															<i className="fa fa-map-marker jobListLocation"></i> &nbsp; {elem.jobBasicInfo.jobLocationCity}
														</div>
														<div> 
															<i className="fa fa-users jobListNumPositions"></i> &nbsp; No of position : 10
														</div>
													</div>
													<div className="col-lg-1 jobListRightContent">
														<div className="row">
															<div className="col-lg-12">
																<div className="listEditBtn">
																	<a title = "edit Profile" href={"/job-post-form/" + elem._id}><i className="fa fa-edit"></i></a>
																</div>
																<div className="listViewBtn">	
																	<a title = "view Profile" href={"/job-profile/" + elem._id}><i className="fa fa-eye"></i></a>
																</div>
																<div className="listDelBtn">	
																	<i title = "delete Profile" className="fa fa-trash" onClick={this.deleteJob} id = {elem._id}></i>
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
