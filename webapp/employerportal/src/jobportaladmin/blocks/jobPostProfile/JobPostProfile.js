import React, {Component} from 'react';
import './JobPostProfile.css';

import Axios  from 'axios';
import Swal   from 'sweetalert2';
import Moment from "moment";

export default class JobPostProfile extends Component{
	constructor(props){
		super(props);

		this.state = {
			jobTitle 			: "",
			jobLocationCity 	: "",
			jobLocationCountry 	: "",
			functionalArea 		: "",
			subFunctionalArea 	: "",
			role 				: "",
			gender              : "Male",
			workFromHome 		: "",
			contactPersonName 	: "",
			contactPersonEmail 	: "",
			contactPersonPhone 	: "",
			jobType 			: "",
			jobTime 			: "",
			lastDateOfAppl 		: "",
			minSalary 			: "",
			minSalPeriod 		: "",
			maxSalary 			: "",
			maxSalPeriod		: "",
			jobDesc 			: "",
			minEducation 		: "",
			minExperience 		: "",
			minPrimExp 	 		: "",
			minSecExp 	 		: "",
			minOtherExp			: ""
			/*priSkillsArray 		: [],
			priSkillsArraylist 		: [], 
			secSkillsArray 			: [],
			secSkillsArraylist 		: [], 
			otherSkillsArray 		: [],
			otherSkillsArraylist	: [], 
			preferSkillsArray 		: [],
			preferSkillsArraylist	: [],*/
		}

	}	

	componentDidMount(){
		var job_id = this.props.match.params.job_id;
		console.log("job_id = ", job_id);

		Axios.get("/api/jobposting/get/one/"+job_id)
			.then(response=>{
               
				console.log("response.data = ",response.data);

				this.setState({
					job_id				: job_id,
					jobTitle 			: response.data.jobsData.jobBasicInfo.jobTitle,
					jobLocationCity 	: response.data.jobsData.jobBasicInfo.jobLocationCity,
					jobLocationCountry 	: response.data.jobsData.jobBasicInfo.jobLocationCountry,
					functionalArea 		: response.data.jobsData.jobBasicInfo.functionalArea,
					subFunctionalArea 	: response.data.jobsData.jobBasicInfo.subFunctionalArea,
					role 				: response.data.jobsData.jobBasicInfo.role,
					gender              : response.data.jobsData.jobBasicInfo.gender,
					workFromHome 		: response.data.jobsData.jobBasicInfo.workFromHome,
					contactPersonName 	: response.data.jobsData.jobBasicInfo.contactPersonName,
					contactPersonEmail 	: response.data.jobsData.jobBasicInfo.contactPersonEmail,
					contactPersonPhone 	: response.data.jobsData.jobBasicInfo.contactPersonPhone,
					jobType 			: response.data.jobsData.jobBasicInfo.jobType,
					jobTime 			: response.data.jobsData.jobBasicInfo.jobTime,
					lastDateOfAppl 		: response.data.jobsData.jobBasicInfo.lastDateOfAppl?Moment(response.data.jobsData.jobBasicInfo.lastDateOfAppl).format("YYYY-MM-DD"):"",
					minSalary 			: response.data.jobsData.ctcOffered.minSalary,
					minSalPeriod 		: response.data.jobsData.ctcOffered.minSalPeriod,
					maxSalary 			: response.data.jobsData.ctcOffered.maxSalary,
					maxSalPeriod		: response.data.jobsData.ctcOffered.maxSalPeriod,
					jobDesc 			: response.data.jobsData.jobBasicInfo.jobDesc,
					minEducation 		: response.data.jobsData.eligibility.minEducation,
					minExperience 		: response.data.jobsData.eligibility.minExperience,
					minPrimExp 	 		: response.data.jobsData.requiredSkills.minPrimExp,
					minSecExp 	 		: response.data.jobsData.requiredSkills.minSecExp,
					minOtherExp			: response.data.jobsData.requiredSkills.minOtherExp,
                })
               
			})
			.catch(error=>	{
								Swal.fire("Some Error Occured during data fetch",error.message,'error');
							})
	}	
	
	render(){
		return(
				<div className="jobPostProfileWrapper container-fluid">
					<div className="col-lg-9">
						<div className="col-lg-12 leftSideMain">
							<div className="row">
								<div className="col-lg-12 leftHeader">
									<div className="row">
										<div className="col-lg-3 leftImgContainer">
											<div className="col-lg-12">
												<div className="imgbox col-lg-9">
													<img src="/images/iAssureIT_Logo.svg" className="companyProfileLogo"  alt="not found"/>
												</div>
											</div>	
										</div>
										<div className="col-lg-9 imgContent">
											<div className="col-lg-12 contentMain">
												<div className="row">
													<div className="contentHead">
														{this.state.jobTitle}
													</div>
													<div className="subContentHead">
														<b>iAssure International Technologies Pvt Ltd</b>
													</div>
													<div className="locationinfo">
														{this.state.jobLocationCity}
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-12 jobProfileMain">
									<div className="row">
										<div className="col-lg-12 contentWrapper1">
											<div className="col-lg-12 profileSubContainer">
												<div className="profileheading">
													Job Description
												</div>
												<div className="horizontalRightLine diamondBullet"></div>
												<div className="DescriptionContainer col-lg-12">
													<div className="profileContent">
														<div className="col-lg-12 jobDescContent">
															<div dangerouslySetInnerHTML = {{ __html : this.state.jobDesc}} />
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="col-lg-12 contentWrapper2">
											<div className="col-lg-12 profileSubContainer">
												<div className="profileheading"> 
													Required Education & Experience
												</div>
												<div className="horizontalRightLine diamondBullet"></div>
												<div className="DescriptionContainer col-lg-12">
													<div className="profileContent">
														<ul className="col-lg-12">
															<li><span className="eduSubtitle">
																Minimum Education Required</span><br/>
																<span className="eduDuration"> {this.state.minEducation} </span>
															</li>
															<li>
																<span className="eduSubtitle">Minimum Overall Experience</span><br/>
																<span className="eduDuration"> {this.state.minExperience} </span>
															</li>
														</ul>
													</div>
												</div>
											</div>
										</div>
										<div className="col-lg-12 contentWrapper3">
											<div className="col-lg-12 profileSubContainer">
												<div className="profileheading"> 
													Expected Skills
												</div>
												<div className="horizontalRightLine diamondBullet"></div>
												<div className="DescriptionContainer col-lg-12">
													<div className="row">
														<div className="profileContent">
															<div className="row">
																<ul className="skillsHeadOne">
																	<div className="row">
																		<li className="col-lg-5">
																			<span className="skillsTitle">
																				Primary Skills
																			</span>
																		</li>
																		<li className="col-lg-7">
																			<span className="skillSubtitle">
																				Min. Experience Req.
																			</span><br/>
																			<span className="skillDuration">
																				{this.state.minPrimExp}
																			</span>
																		</li>
																		<p className="skillsList col-lg-5">
																			Mathematical aptitude<br/>
																			Problem-solving skills<br/>
																			Programming languages<br/>
																		</p>
																	</div>
																</ul>
															</div>
														</div>
													</div>
													<div>
														<div className="row">
															<div className="profileContent">
																<div className="row">
																	<ul className="skillsHeadTwo">
																		<div className="row">
																			<li className="col-lg-5">
																				<span className="skillsTitle">
																					Secondary Skills
																				</span>
																			</li>
																			<li className="col-lg-7">
																				<span className="skillSubtitle">
																					Min. Experience Req.
																				</span><br/>
																				<span className="skillDuration">
																					{this.state.minSecExp}
																				</span>
																			</li>
																			<p className="skillsList col-lg-5">
																				Communication<br/>
																				Teamwork<br/>
																				Multitasking<br/>
																				Attention to detail<br/>
																			</p>
																		</div>
																	</ul>
																</div>	
															</div>
														</div>		
													</div>
													<div>
														<div className="row">
															<div className="profileContent">
																<div className="row">
																	<ul className="skillsHeadThree">
																		<div className="row">
																			<li className="col-lg-5">
																				<span className="skillsTitle">
																					Other Skills
																				</span>
																			</li>
																			<li className="col-lg-7">
																				<span className="skillSubtitle">
																					Min. Experience Req.
																				</span><br/>
																				<span className="skillDuration">
																					{this.state.minOtherExp}
																				</span>
																			</li>
																			<p className="skillsList col-lg-5">
																				Computer programming and coding<br/>
																				Problem-solving<br/>
																				Software Development<br/>
																				Object-oriented design<br/>
																			</p>
																		</div>
																	</ul>
																</div>
															</div>
														</div>
													</div>
													<div>
														<div className="row">
															<div className="profileContent1">
																<div className="row">
																	<ul className="skillsHeadFour">
																		<div className="row">
																			<li className="col-lg-5">
																				<span className="skillsTitle">
																					Preferred Skills but not mandatory
																				</span>
																			</li>
																			<li className="col-lg-7">
																				<span className="skillSubtitle">
																				</span><br/>
																				<span className="skillDuration"></span>
																			</li>
																			<p className="skillsList col-lg-5">
																				Teamwork<br/>
																				Debug your resume<br/>
																				Written and verbal communication<br/>
																			</p>
																		</div>
																	</ul>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										{/*<div className="col-lg-12">
											<div className="col-lg-4 buttonMain pull-right">
												<button className="btn bg-primary btnEdit col-lg-6">
													EDIT 
												</button>
												<button className="btn bg-primary btnSubmit col-lg-6">
													SUBMIT
												</button>
											</div>
										</div>*/}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-3">
						<div className="col-lg-12 rightSideMain">
							<div className="row">
								<div className="rightSideHeader">
									<div className="col-lg-12">
										<div className="row">
											<img src="/images/6.png" className="mapImg" alt="not found" />
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-12">
								<div className="row">
									<div className="rightContentHead">
										Overview
									</div>
									
									<div className="rightSideTitle">
										Industry
									</div>
									<p className="rightSideSub">
										Information & Technology
									</p>
									
									<div className="rightSideTitle">
										Gender
									</div>
									<p className="rightSideSub">
										{this.state.gender}
									</p>
									
									<div className="rightSideTitle">
										Salary
									</div>
									<p className="rightSideSub">
										<i className="fa fa-inr"></i> {this.state.minSalary} {this.state.minSalPeriod} To &nbsp;<i className="fa fa-inr"></i> {this.state.maxSalary} {this.state.maxSalPeriod}{/*(Monthly)*/}
									</p>
									
									<div className="rightSideTitle">
										Job Type
									</div>
									<p className="rightSideSub">
										{this.state.jobType}
									</p>
									
									<div className="rightSideTitle">
										Funtional Area
									</div>
									
									<p className="rightSideSub">
										{this.state.functionalArea}
									</p>
									
									<div className="rightSideTitle">
										Role
									</div>
									<p className="rightSideSub">
										{this.state.role}
									</p>

									<div className="col-lg-12">
										<div className="row">
											<img src="/images/2.png" className="rightSideImg" alt="not found" />
										</div>
									</div>
								</div>
							</div>	
						</div>
					</div>	
				</div>
			);
		}
	}
