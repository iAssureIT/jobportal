import React, {Component} from 'react';
import './JobPostProfile.css';

import Axios  from 'axios';
import Swal   from 'sweetalert2';
import Moment from "moment";

export default class JobPostProfile extends Component{
	constructor(props){
		super(props);

		this.state = {
						jobTitle 			: 	"",
						industry_id 		: 	"",
						functionalarea_id 	: 	"",
						subfunctionalarea_id: 	"",
						jobrole_id 			: 	"",
						gender              : 	"Male Only",
						workFromHome 		: 	false,
						jobtype_id 			: 	"",
						jobtime_id 			: 	"",
						jobcategory_id 		: 	"",
						positions           :   "",
						jobDesc 			: 	"",
						lastDateOfAppl 		: 	"",
						contactPersonName 	: 	"",
						contactPersonEmail 	: 	"",
						contactPersonPhone 	: 	"",
						
						address        		:   "",
						area 				:   "",
			        	cityVillage 		: 	"",
			       	 	district 			: 	"",
			        	states 				: 	"",
			        	stateCode 			: 	"",
			        	country 			: 	"",
			        	countryCode 		: 	"",
			        	pincode 			: 	"",
						
						minSalary 			: 	"",
						minSalPeriod 		: 	"",
						maxSalary 			: 	"",
						maxSalPeriod		: 	"",
						
						minEducation 		: 	"",
						minExperience 		: 	"",
						
						primarySkillTags 	:  	[],
						minPrimExp	 		: 	"",
						
						secondarySkillTags 	:  	[],
						minSecExp	 		: 	"",
						
						otherSkillTags      :   [],
						minOtherExp	 		: 	"",
						
						preferredSkillTags  :   [],
		}

	}	

	componentDidMount(){
		var job_id = this.props.match.params.job_id;
		var primarySkillTags = [];
        var secondarySkillTags = [];
        var otherSkillTags = [];
        var preferredSkillTags = [];

		Axios.get("/api/jobs/get/one/"+job_id)
		.then(response=>{

		console.log(response.data)
			response.data.requiredSkills.primarySkills.map((skill,ind)=>{
				primarySkillTags.push({ id : skill.skill_id._id, text : skill.skill_id.skill })
            })
            response.data.requiredSkills.secondarySkills.map((skill,ind)=>{
				secondarySkillTags.push({ id : skill.skill_id._id, text : skill.skill_id.skill })
            })
            response.data.requiredSkills.otherSkills.map((skill,ind)=>{
				otherSkillTags.push({ id : skill.skill_id._id, text : skill.skill_id.skill })
            })
            response.data.requiredSkills.preferredSkills.map((skill,ind)=>{
				preferredSkillTags.push({ id : skill.skill_id._id, text : skill.skill_id.skill })
            })
			this.setState({
					job_id				: 	job_id,
					jobTitle 			: 	response.data.jobBasicInfo.jobTitle,
					employerName 		: 	response.data.company_id.companyName,
					employerLogo 		: 	response.data.company_id.companyLogo[0] ? response.data.company_id.companyLogo[0] : null,
					industry_id 		: 	response.data.jobBasicInfo.industry_id._id,
					industry 			: 	response.data.jobBasicInfo.industry_id.industry,
					functionalarea_id 	: 	response.data.jobBasicInfo.functionalarea_id._id,
					functionalArea 		: 	response.data.jobBasicInfo.functionalarea_id.functionalArea,
					subfunctionalarea_id: 	response.data.jobBasicInfo.subfunctionalarea_id._id,
					subFunctionalArea 	: 	response.data.jobBasicInfo.functionalarea_id._id,
					jobrole_id 			: 	response.data.jobBasicInfo.jobrole_id._id,
					jobRole 			: 	response.data.jobBasicInfo.jobrole_id.jobRole,
					gender 				: 	response.data.jobBasicInfo.gender,
					workFromHome 		: 	response.data.workFromHome,
					jobtype_id 			: 	response.data.jobBasicInfo.jobtype_id._id,
					jobType 			: 	response.data.jobBasicInfo.jobtype_id.jobType,
					jobtime_id 			: 	response.data.jobBasicInfo.jobtime_id._id,
					jobTime 			: 	response.data.jobBasicInfo.jobtime_id.jobTime,
					jobcategory_id 		: 	response.data.jobBasicInfo.jobcategory_id._id,
					jobCategory 		: 	response.data.jobBasicInfo.jobcategory_id.jobCategory,
					positions           :   response.data.jobBasicInfo.positions,
					jobDesc 			: 	response.data.jobBasicInfo.jobDesc,
					lastDateOfAppl      : 	response.data.jobBasicInfo.lastDateOfAppl ? Moment(response.data.jobBasicInfo.lastDateOfAppl).format("YYYY-MM-DD"):"",
					contactPersonName 	: 	response.data.jobBasicInfo.contactPersonName,
					contactPersonEmail 	: 	response.data.jobBasicInfo.contactPersonEmail,
					contactPersonPhone 	: 	response.data.jobBasicInfo.contactPersonPhone,
					
					address        		:   response.data.location.address,
					area 				: 	response.data.location.area,
					cityVillage 		: 	response.data.location.cityVillage,
					district 			: 	response.data.location.district,
					states 				: 	response.data.location.states,
					stateCode 			: 	response.data.location.stateCode,
					country 			: 	response.data.location.country,
					countryCode 		: 	response.data.location.countryCode,
					pincode 			: 	response.data.location.pincode,
					
					minSalary 			: 	response.data.ctcOffered.minSalary,
					minSalPeriod 		: 	response.data.ctcOffered.minSalPeriod,
					maxSalary 			: 	response.data.ctcOffered.maxSalary,
					maxSalPeriod		: 	response.data.ctcOffered.maxSalPeriod,
					
					minEducation 		: 	response.data.eligibility.minEducation,
					minExperience 		: 	response.data.eligibility.minExperience,
					
					primarySkillTags 	: 	primarySkillTags,
					minPrimExp 			: 	response.data.requiredSkills.minPrimExp,
					
					secondarySkillTags 	: 	secondarySkillTags,
					minSecExp 	        : 	response.data.requiredSkills.minSecExp,
					
					otherSkillTags 	    : 	otherSkillTags,
					minOtherExp 		: 	response.data.requiredSkills.minOtherExp,
					
					preferredSkillTags  :   preferredSkillTags,
                })
			})
        .catch(error=>{	Swal.fire("Some Error Occured during data fetch",error.message,'error'); })
		   	
	}	
	
	render(){
		console.log(this.state.primarySkillTags)
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
													<img src={this.state.employerLogo} className="companyProfileLogo"  alt="not found"/>
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
														{this.state.employerName}
													</div>
													<div className="locationinfo">
														{this.state.address}
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
																<span className="eduSubtitle"> Minimum Overall Experience </span><br/>
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
																			{
																				this.state.primarySkillTags.map((skill,index)=>{
																					return (
																							<div>{skill.text}</div>
																							
																						)
																				})
																			}
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
																				{
																					this.state.secondarySkillTags.map((skill,index)=>{
																						return (
																								<div>{skill.text}</div>
																								
																							)
																					})
																				}
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
																				{
																					this.state.otherSkillTags.map((skill,index)=>{
																						return (
																								<div>{skill.text}</div>
																								
																							)
																					})
																				}
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
																				{
																					this.state.preferredSkillTags.map((skill,index)=>{
																						return (
																								<div>{skill.text}</div>
																								
																							)
																					})
																				}
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
										{this.state.industry}
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
										<i className="fa fa-inr"></i> {this.state.minSalary} {this.state.minSalPeriod} To &nbsp;<i className="fa fa-inr"></i> {this.state.maxSalary} {this.state.maxSalPeriod}
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
										{this.state.jobRole}
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
