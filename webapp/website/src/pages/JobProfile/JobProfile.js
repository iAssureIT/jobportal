import React, {Component} from 'react';
import './JobProfile.css';

import Axios  from 'axios';
import Swal   from 'sweetalert2';
import Moment from "moment";

export default class JobProfile extends Component{
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
						jobsector_id 		: 	"",
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
					employerName 		: 	response.data.company_id ? response.data.company_id.companyName : "Anonymous",
					employerLogo 		: 	response.data.company_id ? response.data.company_id.companyLogo[0] : null,
					industry_id 		: 	response.data.jobBasicInfo.industry_id ? response.data.jobBasicInfo.industry_id._id : "",
					industry 			: 	response.data.jobBasicInfo.industry_id ? response.data.jobBasicInfo.industry_id.industry : "",
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
					jobsector_id 		: 	response.data.jobBasicInfo.jobsector_id._id,
					jobSector 			: 	response.data.jobBasicInfo.jobsector_id.jobSector,
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
					
					mineducation_id 	: 	response.data.eligibility.mineducation_id._id,
					minEducation 		: 	response.data.eligibility.mineducation_id.qualification,
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
        //.catch(error=>{	Swal.fire("Some Error Occured during data fetch",error.message,'error'); })
		   	
	}	
	
	render(){
		console.log(this.state.primarySkillTags)
		return(
			<div className="col-12">
				<div className="col-12">
					<div className="jobPostProfileWrapper row">
						<div className=" col-sm-9 col-12">
							<div className="row">
								<div className="col-12 leftSideMain">
									<div className="row">
										<div className="col-12 leftHeader">
											<div className="row">
												<div className="col-lg-3 col-4 leftImgContainer">
													<div className="col-lg-12">
														<div className="imgbox col-lg-9">
															<img src={this.state.employerLogo ? this.state.employerLogo : "/images/logonotfound.jpg"} className="companyProfileLogo"  alt="not found"/>
														</div>
													</div>	
												</div>
												<div className="col-lg-9 col-8 imgContent">
													<div className="row">
														<div className="col-12 contentMain">
															<div className="row">
																<div className="contentHead col-12">
																	{this.state.jobTitle}
																</div>
																<div className="subContentHead col-12">
																	{this.state.employerName}
																</div>
																<div className="locationinfo col-12">
																	{this.state.address}
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="col-12 jobProfileMain">
											<div className="row">
												<div className="col-12 contentWrapper1">
													<div className="col-12 profileSubContainer">
														<div className="col-12 profileheading">
															Job Description
														</div>
														<div className="horizontalRightLine diamondBullet"></div>
														<div className="DescriptionContainer col-lg-12">
															<div className="col-12 profileContent">
																<div className="row">
																	<div className="col-12 jobDescContent">
																		<div dangerouslySetInnerHTML = {{ __html : this.state.jobDesc}} />
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div className="col-12 contentWrapper2">
													<div className="col-12 profileSubContainer">
														<div className="col-12 profileheading"> 
															Required Education & Experience
														</div>
														<div className="horizontalRightLine diamondBullet"></div>
														<div className="DescriptionContainer col-12">
															<div className="profileContent row">
																<ul className="col-12">
																	<li><span className="eduSubtitle">
																		Minimum Education Required</span><br/>
																		<span className="eduDuration"> {this.state.minEducation} </span>
																	</li> 
																	<li>
																		<span className="eduSubtitle"> Minimum Overall Experience </span><br/>
																		<span className="eduDuration"> {this.state.minExperience } { Number(this.state.minExperience) > 1 ? "Years" : "Year"}  </span>
																	</li>
																</ul>
															</div>
														</div>
													</div>
												</div>
												<div className="col-12 contentWrapper3">
													<div className="col-12 profileSubContainer">
														<div className="col-12 profileheading"> 
															Expected Skills
														</div>
														<div className="horizontalRightLine diamondBullet"></div>
														<div className="DescriptionContainer col-12">
															<div className="row">
																<div className="col-12">
																	<div className="col-12">
																		<div className="row">
																			<div className="profileContent col-12">
																				<div className="row">
																					<ul className="skillsHeadOne col-lg-7 col-12">
																						<div className="row">
																							<li className="col-12">
																								<span className="skillsTitle">
																									Primary Skills
																								</span>
																							</li>
																							<li className="col-12">
																							<div className="row">
																								<div className="skillsList col-5">
																									{
																										this.state.primarySkillTags.map((skill,index)=>{
																											return (
																													<div>{skill.text}</div>
																													
																												)
																										})
																									}
																								</div>
																								<div className="col-7 profileContent2"> 
																									<div className="row"> 
																										<div className="skillSubtitle col-12">
																											Min. Experience Req.
																										</div>
																										<div className="skillDuration col-12">
																											{this.state.minPrimExp} 
																										</div>
																									</div>
																								</div>
																							</div>
																							</li>
																							
																						</div>
																					</ul>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
																<div className="col-12">
																	<div className="col-12">
																		<div className="row">
																			<div className="profileContent col-12">
																				<div className="row">
																					<ul className="skillsHeadTwo col-lg-7 col-12">
																						<div className="row">
																							<li className="col-12">
																								<span className="skillsTitle">
																									Secondary Skills
																								</span>
																							</li>
																							<li className="col-12">
																								<div className="row">
																									<div className="skillsList col-5">
																										{
																											this.state.secondarySkillTags.map((skill,index)=>{
																												return (
																														<div>{skill.text}</div>
																														
																													)
																											})
																										}
																									</div>
																									<div className="col-7 profileContent2">
																										<div className="row"> 
																											<div className="skillSubtitle col-12">
																												Min. Experience Req.
																											</div>
																											<div className="skillDuration col-12">
																												{this.state.minSecExp}
																											</div>
																										</div>
																									</div>
																								</div>
																							</li>
																							
																						</div>
																					</ul>
																				</div>	
																			</div>
																		</div>		
																	</div>
																</div>
																<div className="col-12">
																	<div className="col-12">
																		<div className="row">
																			<div className="profileContent col-12">
																				<div className="row">
																					<ul className="skillsHeadTwo col-lg-7 col-12">
																						<div className="row">
																							<li className="col-12">
																								<span className="skillsTitle">
																									Other Skills
																								</span>
																							</li>
																							<li className="col-12">
																								<div className="row">
																									<div className="skillsList col-5">
																										{
																											this.state.otherSkillTags.map((skill,index)=>{
																												return (
																														<div >{skill.text}</div>
																														
																													)
																											})
																										}
																									</div>
																									
																									<div className="col-7 profileContent2">
																										<div className="row">
																											<div className="skillSubtitle col-12">
																												Min. Experience Req.
																											</div>
																											<div className="skillDuration col-12">
																												{this.state.minOtherExp}
																											</div>
																										</div>
																									</div>
																								</div>
																							</li>
																							
																						</div>
																					</ul>
																				</div>	
																			</div>
																		</div>		
																	</div>
																</div>
																
																<div className="col-12">
																	<div className="col-12">
																		<div className="row">
																			<div className="profileContent col-12">
																				<div className="row">
																					<ul className="skillsHeadFour col-lg-7 col-12">
																						<div className="row">
																							<li className="col-12">
																								<span className="skillsTitle">
																									Preferred Skills but not mandatory
																								</span>
																							</li>
																							<li className="col-12">
																						
																										<div className="row">
																											<div className="skillsList col-5">
																												{
																													this.state.preferredSkillTags.map((skill,index)=>{
																														return (
																																<div >{skill.text}</div>
																																
																															)
																													})
																												}
																											</div>
																											<div className="col-7 ">
																												<div className="row">

																													<div className="skillSubtitle col-12">
																													</div>
																													<div className="skillDuration col-12"></div>
																												</div>
																											</div>
																										</div>
																									
																							</li>
																							
																						</div>
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
						</div>
						<div className="col-sm-3 col-12">
							<div className="row">
								<div className="col-lg-12 rightSideMain">
									<div className="row">
										<div className="rightSideHeader col-lg-12">
											<div className="col-lg-12">
												<div className="row">
													<img src="/images/6.png" className="mapImg" alt="not found" />
												</div>
											</div>
										</div>
									</div>
									<div className="col-lg-12">
										<div className="row">
										<div className="col-lg-12">
											<div className="rightContentHead col-12">
												Overview
											</div>
											
											<div className="rightSideTitle col-12">
												Industry
											</div>
											<p className="rightSideSub col-12">
												{this.state.industry}
											</p>
											<div className="rightSideTitle col-12">
												Sector
											</div>
											<p className="rightSideSub col-12">
												{this.state.jobSector}
											</p>

											<div className="rightSideTitle col-12" >
												Funtional Area
											</div>
											
											<p className="rightSideSub col-12">
												{this.state.functionalArea}
											</p>
											
											<div className="rightSideTitle col-12">
												Gender
											</div>
											<p className="rightSideSub col-12">
												{this.state.gender}
											</p>
											
											<div className="rightSideTitle col-12">
												Salary
											</div>
											<p className="rightSideSub col-12">
												<i className="fa fa-inr"></i> {this.state.minSalary} {this.state.minSalPeriod} To &nbsp;<i className="fa fa-inr"></i> {this.state.maxSalary} {this.state.maxSalPeriod}
											</p>
											
											<div className="rightSideTitle col-12">
												Job Type
											</div>
											<p className="rightSideSub col-12">
												{this.state.jobType}
											</p>
																				
											<div className="rightSideTitle col-12">
												Role
											</div>
											<p className="rightSideSub col-12">
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
						</div>	
					</div>
				</div>
			</div>
			);
		}
	}
