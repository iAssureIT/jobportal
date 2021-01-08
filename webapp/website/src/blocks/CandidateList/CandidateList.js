import React,{Component} from 'react';
import Axios 			 	from 'axios';
import Swal 			 	from 'sweetalert2';
import Moment               from 'moment';
import { withRouter }	 	from 'react-router-dom';
import './CandidateList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class CandidateList extends Component{
	constructor(props){
		super(props);

		this.state={
			candidate_id       : this.props.match.params.candidate_id,
			dataArry           :[],
			skillsArry         :[],
		}
	}
		componentDidMount(){

		Axios.get("/api/candidatemaster/get/one/"+this.state.candidate_id)
		.then(response=>{
			 
			 	this.setState({

			 		dataArry     :response.data,
			 		skillsArry   :response.data[0].skillCertification
			 	})
			 })
			 .catch(error=>{
			 	Swal.fire("Submit Error!",error.message,'error');
			 })
		}
	render(){
		return(
			<div className="container-fluid  candidateList col-lg-9">
				<div className="row candidateListRow">
				{
					this.state.dataArry.length > 0
						?
						this.state.dataArry.map((elem,index)=>{
							return(
								<div className="col-lg-4 " key={index}>
									<div>
										<div className="col-lg-12 candidateBlockWrapper">
											<div className="row">
												<div className="col-lg-10 candidateInfoBlock">
													<div className="row">
														<div className="col-lg-12 candidateImgBlock">
															<div className="row">
																<div className="col-lg-5 imageOfCandidate">
																	<div className="row">
																		<img src="/images/43.png" alt="candidateName"/>
																	</div>
																</div>
																<div className="col-lg-7 displayInfoCandidate">
																	<div className="row">
																		<div className="displayCandidateName">
																			{elem.basicInfo.firstName}
																			<span className="candidateIdNumber">(1234)</span>
																		</div>
																		<div className=" candidatePosts">
																			<div className=" col-lg-1">
																				<div className="candListIcon candListIcon1">
																					<FontAwesomeIcon icon="chalkboard-teacher" />
																				</div>
																				<div className="candListIcon candListIcon2">
																					<FontAwesomeIcon icon="industry"/>
																				</div>
																				<div className="candListIcon candListIcon3">
																					<FontAwesomeIcon icon="user-clock" />
																				</div>
																				<div className="candListIcon candListIcon4">
																					<FontAwesomeIcon icon="map-marker-alt" />
																				</div>
																			</div>
																			<div className=" Col-lg-11 postNameWrapper">
																				<div className="postName">{elem.workExperience[index].lastDegn}</div>
																				<div className="postName">{elem.workExperience[index].department}</div>
																				<div className="postName">10 Year Exp.</div>
																				<div className="postName">{elem.workExperience[index].city}</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<div className="col-lg-12 candidateSkillsBlocks">
															<div className="">
																<div className="skillsHeading">	
																	Primary skllis
																</div>
																<div className=" marginForSkillHeading">
																	<div className=" skillsSubHeadingWrapper">	
																		{

																			this.state.skillsArry.length > 0
																			?
																			this.state.skillsArry.map((elem,index)=>{
																				return(
																						<div className="col-lg-6 " key={index}>
																							<div className="row skillsSubHeading">
																								<i className="fa fa-square rotate45 listRoatate45" ></i>
																									{elem.primarySkills[index]}
																							</div>
																						</div>
																					);
																			})
																			:
																			null
																		}
																		
																		
																		
																	</div>
																	
																</div>
															</div>
															<div className="skillsHeadingBlock">
																<div className="skillsHeading">	
																	Secondary skllis
																</div>
																<div className=" skillsSubHeadingWrapper">	
																	{

																			this.state.skillsArry.length > 0
																			?
																			this.state.skillsArry.map((elem,index)=>{
																				return(
																						<div className="col-lg-6 " key={index}>
																							<div className="row skillsSubHeading">
																								<i className="fa fa-square rotate45 listRoatate45" ></i>
																									{elem.secondarySkills[index]}
																							</div>
																						</div>
																					);
																			})
																			:
																			null
																		}
																	
																</div>
															</div>
														</div>

													</div>
												</div>
											<div className="col-lg-2 profileSymbolsWrapper">
												<div className="row profileSymbols">
													<img src="/images/44.png" alt="Profile Logo"/>
												</div>
												<div className="row profileSymbols">
													<img src="/images/45.png" alt="Profile Logo"/>
												</div>
												<div className="row profileSymbols">
													<img src="/images/46.png" alt="Profile Logo"/>
												</div>
												<div className="row profileSymbols">
													<img src="/images/47.png" alt="Profile Logo"/>
												</div>
												<div className="row profileSymbols">
													<img src="/images/48.png" alt="Profile Logo"/>
												</div>
											</div>
											
										</div>
										<div className="row">
											<div className="col-lg-12 salaryBlockWrapper">
												<div className="row salaryBlockHeading">
													Current Offers :<span className="salrayBlockSubHeading"> 2 View</span>
												</div>
												<div className="expectSalaryBlock">
													<div className="row">
															<div className="col-lg-4 salaryBlock ">
																<div className="row expectSalaryBlockHeading">
																	Current CTC
																</div>
																<div className="row expectSalaryBlockSubHeading">
																	{elem.workExperience[index].lastSalary}
																</div>
																
															</div>
															<div className="col-lg-4 salaryBlock ">
																<div className="row expectSalaryBlockHeading">
																	Expected CTC
																</div>
																<div className="row expectSalaryBlockSubHeading">
																	{elem.workExperience[index].expectedSalary}
																</div>
																
															</div>
															<div className="col-lg-4 salaryBlock2 ">
																<div className="row expectSalaryBlockHeading">
																	Notice Period
																</div>
																<div className="row expectSalaryBlockSubHeading">
																	{elem.workExperience[index].noticePeriod}
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
						})
						:
						null

				}
					
					
				</div>
				
			</div>
		

			);
	}
}

export default withRouter(CandidateList);