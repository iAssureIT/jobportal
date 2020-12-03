import React, {Component} from 'react';

import Axios from  'axios';
import Swal  from  'sweetalert2';

import "./ApplyJoblist.css";

export default class ApplyJoblist extends Component{
	constructor(props){
	super(props);
	this.state={
		jobList  		: [],
		isToggle 		: true,
		appliedItems 	: [],
	}
}

componetDidMount(){
	
}
	
	render(){
		return(
			<section className="jobListWrapper">
				<div className="col-lg-9 JobListWrapperMain">
					<div className="col-lg-4 col-lg-offset-8">
						<div className="input-group searchMainTab">
							<input type="text" name="search" id="search" className="form-control jobListSearchTab" placeholder="Search by Job Title..." onChange={this.search}/>
							<span className="input-group-addon searchTabAddOn"><i className="fa fa-search"></i> </span> 
						</div> 
					</div> 
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
																<div className="jobProfileVerticleIcons">
																	<ul>
																		<li><i className="fa fa-check" onClick={this.applyJob}></i></li>
																		<li><i onClick={wishlist => this.handleclick(elem._id)} className={this.state.isToggle ? 'fa fa-heart-o':'fa fa-heart'}></i></li>
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