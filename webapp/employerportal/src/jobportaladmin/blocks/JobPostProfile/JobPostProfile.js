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

		Axios.get("/api/skillmaster/get/list")
            .then(skillmaster => {
                /*var primarySkillSuggestions =  [];
                response.data.map((elem,index)=>{
                    primarySkillSuggestions.push({id:elem._id,text:elem.skill})
                })
                this.setState({
                    primarySkillSuggestions   : primarySkillSuggestions,
                });*/
  
		Axios.get("/api/jobs/get/one/"+job_id)
		.then(response=>{
           	//console.log("response.skillmaster = ",skillmaster);
			//console.log("response.data = ",response.data);
			skillmaster.data.map((skill,index)=>{
                response.data.jobsData[0].requiredSkills.primarySkills.map((data,ind)=>{
                    if (skill._id == data.skill_id) {
                        primarySkillTags.push({ id : skill._id, text : skill.skill })
                    }
                })
            })
            
            skillmaster.data.map((skill,index)=>{
                response.data.jobsData[0].requiredSkills.secondarySkills.map((data,ind)=>{
                    if (skill._id == data.skill_id) {
                        secondarySkillTags.push({ id : skill._id, text : skill.skill })
                    }
                })
            })

            skillmaster.data.map((skill,index)=>{
                response.data.jobsData[0].requiredSkills.otherSkills.map((data,ind)=>{
                    if (skill._id == data.skill_id) {
                        otherSkillTags.push({ id : skill._id, text : skill.skill })
                    }
                })
            })

            skillmaster.data.map((skill,index)=>{
                response.data.jobsData[0].requiredSkills.preferredSkills.map((data,ind)=>{
                    if (skill._id == data.skill_id) {
                        preferredSkillTags.push({ id : skill._id, text : skill.skill })
                    }
                })
            })
				
				this.setState({
					job_id				: 	job_id,
					jobTitle 			: 	response.data.jobsData[0].jobBasicInfo.jobTitle,
					employerName 		: 	response.data.jobsData[0].employer[0].companyName,
					employerLogo 		: 	response.data.jobsData[0].employer[0].companyLogo[0] ? response.data.jobsData[0].employer[0].companyLogo[0] : null,
					industry_id 		: 	response.data.jobsData[0].jobBasicInfo.industry_id,
					industry 			: 	response.data.jobsData[0].industry[0].industry,
					functionalarea_id 	: 	response.data.jobsData[0].jobBasicInfo.functionalarea_id,
					functionalArea 		: 	response.data.jobsData[0].functionalArea[0].functionalArea,
					subfunctionalarea_id: 	response.data.jobsData[0].jobBasicInfo.subfunctionalarea_id,
					subFunctionalArea 	: 	response.data.jobsData[0].subFunctionalArea[0].subFunctionalArea,
					jobrole_id 			: 	response.data.jobsData[0].jobBasicInfo.jobrole_id,
					jobRole 			: 	response.data.jobsData[0].jobRole[0].jobRole,
					gender 				: 	response.data.jobsData[0].jobBasicInfo.gender,
					workFromHome 		: 	response.data.jobsData[0].jobBasicInfo.workFromHome,
					jobtype_id 			: 	response.data.jobsData[0].jobBasicInfo.jobtype_id,
					jobType 			: 	response.data.jobsData[0].jobType[0].jobType,
					jobtime_id 			: 	response.data.jobsData[0].jobBasicInfo.jobtime_id,
					jobTime 			: 	response.data.jobsData[0].jobTime[0].jobTime,
					jobcategory_id 		: 	response.data.jobsData[0].jobBasicInfo.jobcategory_id,
					jobCategory 		: 	response.data.jobsData[0].jobCategory[0].jobCategory,
					positions           :   response.data.jobsData[0].jobBasicInfo.positions,
					jobDesc 			: 	response.data.jobsData[0].jobBasicInfo.jobDesc,
					lastDateOfAppl      : 	response.data.jobsData[0].jobBasicInfo.lastDateOfAppl ? Moment(response.data.jobsData[0].jobBasicInfo.lastDateOfAppl).format("YYYY-MM-DD"):"",
					contactPersonName 	: 	response.data.jobsData[0].jobBasicInfo.contactPersonName,
					contactPersonEmail 	: 	response.data.jobsData[0].jobBasicInfo.contactPersonEmail,
					contactPersonPhone 	: 	response.data.jobsData[0].jobBasicInfo.contactPersonPhone,
					
					address        		:   response.data.jobsData[0].location.address,
					area 				: 	response.data.jobsData[0].location.area,
					cityVillage 		: 	response.data.jobsData[0].location.cityVillage,
					district 			: 	response.data.jobsData[0].location.district,
					states 				: 	response.data.jobsData[0].location.states,
					stateCode 			: 	response.data.jobsData[0].location.stateCode,
					country 			: 	response.data.jobsData[0].location.country,
					countryCode 		: 	response.data.jobsData[0].location.countryCode,
					pincode 			: 	response.data.jobsData[0].location.pincode,
					
					minSalary 			: 	response.data.jobsData[0].ctcOffered.minSalary,
					minSalPeriod 		: 	response.data.jobsData[0].ctcOffered.minSalPeriod,
					maxSalary 			: 	response.data.jobsData[0].ctcOffered.maxSalary,
					maxSalPeriod		: 	response.data.jobsData[0].ctcOffered.maxSalPeriod,
					
					minEducation 		: 	response.data.jobsData[0].eligibility.minEducation,
					minExperience 		: 	response.data.jobsData[0].eligibility.minExperience,
					
					primarySkillTags 	: 	primarySkillTags,
					minPrimExp 			: 	response.data.jobsData[0].requiredSkills.minPrimExp,
					
					secondarySkillTags 	: 	secondarySkillTags,
					minSecExp 	        : 	response.data.jobsData[0].requiredSkills.minSecExp,
					
					otherSkillTags 	    : 	otherSkillTags,
					minOtherExp 		: 	response.data.jobsData[0].requiredSkills.minOtherExp,
					
					preferredSkillTags  :   preferredSkillTags,
                })
               
			})
			.catch(error=>	{
								Swal.fire("Some Error Occured during data fetch",error.message,'error');
							})
		
			})
            .catch(error => {
                				Swal.fire("Error while getting List data", error.message, 'error');
           					})
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
														<b>{this.state.employerName}</b>
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
																							<div>{skill.text }</div>
																							
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
																								<div>{skill.text }</div>
																								
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
																								<div>{skill.text }</div>
																								
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
																								<div>{skill.text }</div>
																								
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
