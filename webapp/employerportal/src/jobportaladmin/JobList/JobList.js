import React, {Component} from 'react';
import './JobList.css';

import Axios from  'axios';
import Swal  from  'sweetalert2';

export default class JobList extends Component{
	constructor(props){
	super(props);
	this.state={
		jobList:[]
	}
}	

componentDidMount(){
	this.getJobsData();
}

getJobsData=()=>{
	Axios.get("http://localhost:3009/getJobList")
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

	render(){
		return(
			<section className="JobListWrapper1">
				<div className="col-lg-9 JobListWrapperMain pull-right"> 
						{
							this.state.jobList.length > 0
							?
								this.state.jobList.map((elem,index)=>{
									return(
										<div className="col-lg-6">
											<div className="ListContainer1">
												<div className="col-lg-12">
													<div className="col-lg-11 LeftSideContent1">
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
														<div className="designation">
															{elem.jobBasicInfo.jobTitle}
														</div>
														<div className="companyName">
															<b>iAssure International Technologies Pvt Ltd</b>
														</div>
														<div> 
															<i className="fa fa-calendar experience"></i> &nbsp; Exp: {elem.eligibility.minEducation} To {elem.eligibility.minExperience}
														</div>
														<div> 
															<i className="fa fa-rupee monSal"></i> &nbsp; <i className="fa fa-inr"></i> {elem.ctcOffered.minSalary} - <i className="fa fa-inr"></i> {elem.ctcOffered.maxSalary} a month
														</div>
														<div>
															<i className="fa fa-map-marker jLocation"></i> &nbsp; {elem.jobBasicInfo.jobLocationCity}
														</div>
														<div> 
															<i className="fa fa-users noPositions"></i> &nbsp; No of position : 10
														</div>
													</div>
													<div className="col-lg-1 RightSideContent1">
														<div className="row">
															<div className="col-lg-12">
																<div className="verticleIcons">
																	<ul>
																		<li><i className="fa fa-check"></i></li>
																		<li><i className="fa fa-heart-o"></i></li>
																		<li><i className="fa fa-youtube-play"></i></li>
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




{/*<div className="container-fluid jobListWrapper">
							<div className="row">
								<div className="col-lg-9 mainListContainer pull-right">
									<div className="col-lg-12">
										<div className="row">
											<div className="col-lg-6">
												<div className="col-lg-12 listContainer">
													<div className="col-lg-11 leftSideContent">
														<div className="row">
															<div className="col-lg-12">
																<div className="row">
																	<div className="iconsBar">
																		<ul>	
																			<li><i className="fa fa-male maleIcon"></i></li>
																			<div className="verticalLine"></div>
																			<li><i className="fa fa-female femaleIcon"></i></li>
																			<li><i className="fa fa-sun-o sunIcon"></i></li>
																			<li><i className="fa fa-clock-o clockIcon"></i></li>
																		</ul>
																		<div className="infoLog infoLogFix"> 15 Days Ago </div>
																	</div>
																</div>
																<div className="designation">
																	{elem.jobBasicInfo.jobTitle}
																</div>
																<div className="companyName">
																	<b>iAssure International Technologies Pvt Ltd</b>
																</div>
																<div className="jobListFont"> 
																	<i className="fa fa-calendar experience"></i> &nbsp; Exp: {elem.eligibility.minEducation} To {elem.eligibility.minExperience}
																</div>
																<div className="jobListFont"> 
																	<i className="fa fa-rupee monSal"></i> &nbsp; <i className="fa fa-inr"></i> {elem.ctcOffered.minSalary} - <i className="fa fa-inr"></i> {elem.ctcOffered.maxSalary} a month
																</div>
																<div className="jobListFont">
																	<i className="fa fa-map-marker jLocation"></i> &nbsp; {elem.jobBasicInfo.jobLocationCity}
																</div>
																<div className="jobListFont"> 
																	<i className="fa fa-users noPositions"></i> &nbsp; No of position : 10
																</div>
															</div>
														</div>
													</div>
													<div className="col-lg-1">
														<div className="row">
															<div className="col-lg-12">
																<div className="verticleIcons">
																	<ul>
																		<li><i className="fa fa-check"></i></li>
																		<li><i className="fa fa-heart-o"></i></li>
																		<li><i className="fa fa-youtube-play"></i></li>
																	</ul>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>	
									</div>
								</div>
							</div>
						</div>*/}