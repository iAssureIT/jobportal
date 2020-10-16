import React,{Component} from 'react';
import './CandidateList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class CandidateList extends Component{
	render(){
		return(
				<div className="container-fluid  candidateList col-lg-9">
						<div className="row candidateListRow">
							<div className="col-lg-4 ">
								<div>
									<div className="col-lg-12 candidateBlockWrapper">
										<div className="row">
											<div className="col-lg-10 candidateInfoBlock">
												<div className="row">
													<div className="col-lg-12 candidateImgBlock">
														<div className="row">
															<div className="col-lg-5 imageOfCandidate">
																<div className="row">
																	<img src="Images/40.png" alt="candidateName"/>
																</div>
															</div>
															<div className="col-lg-7 displayInfoCandidate">
																<div className="row">
																	<div className="displayCandidateName">
																		Akshay
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
																			<div className="postName">Project Manager</div>
																			<div className="postName">IT Industry</div>
																			<div className="postName">10 Year Exp.</div>
																			<div className="postName">Pune</div>
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
																	<div className="col-lg-6 ">
																		<div className="row skillsSubHeading">
																			<i className="fa fa-square rotate45 listRoatate45" ></i>
																				Mathematical aptitude
																		</div>
																	</div>
																	<div className="col-lg-6">
																		<div className="row skillsSubHeading">
																			<i className="fa fa-square rotate45 listRoatate45" ></i>
																				Problem Solving Skills
																		</div>
																	</div>
																	
																</div>
																<div className=" skillsSubHeadingWrapper">	
																	<div className="col-lg-6 ">
																		<div className="row skillsSubHeading">
																			<i className="fa fa-square rotate45 listRoatate45" ></i>
																				Programing Languages
																		</div>
																	</div>
																	<div className="col-lg-6">
																		<div className="row skillsSubHeading">
																			<i className="fa fa-square rotate45 listRoatate45" ></i>
																				Software Devlopment
																		</div>
																	</div>
																	
																</div>
															</div>
														</div>
														<div className="skillsHeadingBlock">
															<div className="skillsHeading">	
																Secondary skllis
															</div>
															<div className=" skillsSubHeadingWrapper">	
																<div className="col-lg-6 ">
																	<div className="row skillsSubHeading">
																		<i className="fa fa-square rotate45 listRoatate45" ></i>
																			Communication
																	</div>
																</div>
																<div className="col-lg-6">
																	<div className="row skillsSubHeading">
																		<i className="fa fa-square rotate45 listRoatate45" ></i>
																			Teamwork
																	</div>
																</div>
																
															</div>
															<div className=" skillsSubHeadingWrapper">	
																<div className="col-lg-6 ">
																	<div className="row skillsSubHeading">
																		<i className="fa fa-square rotate45 listRoatate45" ></i>
																			Multitasking
																	</div>
																</div>
																<div className="col-lg-6">
																	<div className="row skillsSubHeading">
																		<i className="fa fa-square rotate45 listRoatate45" ></i>
																			Attension to Details
																	</div>
																</div>
																
															</div>
														</div>
													</div>

												</div>
											</div>
											<div className="col-lg-2 profileSymbolsWrapper">
												<div className="row profileSymbols">
													<img src="/Images/44.png" alt="Profile Logo"/>
												</div>
												<div className="row profileSymbols">
													<img src="/Images/45.png" alt="Profile Logo"/>
												</div>
												<div className="row profileSymbols">
													<img src="/Images/46.png" alt="Profile Logo"/>
												</div>
												<div className="row profileSymbols">
													<img src="/Images/47.png" alt="Profile Logo"/>
												</div>
												<div className="row profileSymbols">
													<img src="/Images/48.png" alt="Profile Logo"/>
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
															<div className="col-lg-3 salaryBlock ">
																<div className="row expectSalaryBlockHeading">
																	Current CTC
																</div>
																<div className="row expectSalaryBlockSubHeading">
																	RS 10 Lakhs
																</div>
																
															</div>
															<div className="col-lg-3 salaryBlock ">
																<div className="row expectSalaryBlockHeading">
																	Expected CTC
																</div>
																<div className="row expectSalaryBlockSubHeading">
																	RS 12 Lakhs
																</div>
																
															</div>
															<div className="col-lg-3 salaryBlock ">
																<div className="row expectSalaryBlockHeading">
																	Notice Period
																</div>
																<div className="row expectSalaryBlockSubHeading">
																	3 Months
																</div>
																
															</div>
															<div className="col-lg-3 salaryBlock2 ">
																<div className="row expectSalaryBlockHeading">
																	Joining Date
																</div>
																<div className="row expectSalaryBlockSubHeading">
																	1st Dec 2020
																</div>
																
															</div>
														</div>
													</div>
												</div>
											</div>
									</div>	
								</div>
							</div>

							<div className="col-lg-4 ">
								<div>
									<div className="col-lg-12 candidateBlockWrapper">
										<div className="row">
											<div className="col-lg-10 candidateInfoBlock">
												<div className="row">
													<div className="col-lg-12 candidateImgBlock">
														<div className="row">
															<div className="col-lg-5 imageOfCandidate">
																<div className="row">
																	<img src="Images/41.png" alt="candidateName"/>
																</div>
															</div>
															<div className="col-lg-7 displayInfoCandidate">
																<div className="row">
																	<div className="displayCandidateName">
																		Ajay
																		<span className="candidateIdNumber">(5678)</span>
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
																			<div className="postName">Front-End Engineer</div>
																			<div className="postName">Retail</div>
																			<div className="postName">08 Year Exp.</div>
																			<div className="postName">Pune</div>
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
																	<div className="col-lg-6 ">
																		<div className="row skillsSubHeading">
																			<i className="fa fa-square rotate45 listRoatate45" ></i>
																				Mathematical aptitude
																		</div>
																	</div>
																	<div className="col-lg-6">
																		<div className="row skillsSubHeading">
																			<i className="fa fa-square rotate45 listRoatate45" ></i>
																				Problem Solving Skills
																		</div>
																	</div>
																	
																</div>
																<div className=" skillsSubHeadingWrapper">	
																	<div className="col-lg-6 ">
																		<div className="row skillsSubHeading">
																			<i className="fa fa-square rotate45 listRoatate45" ></i>
																				Programing Languages
																		</div>
																	</div>
																	<div className="col-lg-6">
																		<div className="row skillsSubHeading">
																			<i className="fa fa-square rotate45 listRoatate45" ></i>
																				Software Devlopment
																		</div>
																	</div>
																	
																</div>
															</div>
														</div>
														<div className="skillsHeadingBlock">
															<div className="skillsHeading">	
																Secondary skllis
															</div>
															<div className=" skillsSubHeadingWrapper">	
																<div className="col-lg-6 ">
																	<div className="row skillsSubHeading">
																		<i className="fa fa-square rotate45 listRoatate45" ></i>
																			Communication
																	</div>
																</div>
																<div className="col-lg-6">
																	<div className="row skillsSubHeading">
																		<i className="fa fa-square rotate45 listRoatate45" ></i>
																			Teamwork
																	</div>
																</div>
																
															</div>
															<div className=" skillsSubHeadingWrapper">	
																<div className="col-lg-6 ">
																	<div className="row skillsSubHeading">
																		<i className="fa fa-square rotate45 listRoatate45" ></i>
																			Multitasking
																	</div>
																</div>
																<div className="col-lg-6">
																	<div className="row skillsSubHeading">
																		<i className="fa fa-square rotate45 listRoatate45" ></i>
																			Attension to Details
																	</div>
																</div>
																
															</div>
														</div>
													</div>

												</div>
											</div>
											<div className="col-lg-2 profileSymbolsWrapper">
												<div className="row profileSymbols">
													<img src="/Images/44.png" alt="Profile Logo"/>
												</div>
												<div className="row profileSymbols">
													<img src="/Images/45.png" alt="Profile Logo"/>
												</div>
												<div className="row profileSymbols">
													<img src="/Images/46.png" alt="Profile Logo"/>
												</div>
												<div className="row profileSymbols">
													<img src="/Images/47.png" alt="Profile Logo"/>
												</div>
												<div className="row profileSymbols">
													<img src="/Images/48.png" alt="Profile Logo"/>
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
															<div className="col-lg-3 salaryBlock ">
																<div className="row expectSalaryBlockHeading">
																	Current CTC
																</div>
																<div className="row expectSalaryBlockSubHeading">
																	RS 10 Lakhs
																</div>
																
															</div>
															<div className="col-lg-3 salaryBlock ">
																<div className="row expectSalaryBlockHeading">
																	Expected CTC
																</div>
																<div className="row expectSalaryBlockSubHeading">
																	RS 12 Lakhs
																</div>
																
															</div>
															<div className="col-lg-3 salaryBlock ">
																<div className="row expectSalaryBlockHeading">
																	Notice Period
																</div>
																<div className="row expectSalaryBlockSubHeading">
																	3 Months
																</div>
																
															</div>
															<div className="col-lg-3 salaryBlock2 ">
																<div className="row expectSalaryBlockHeading">
																	Joining Date
																</div>
																<div className="row expectSalaryBlockSubHeading">
																	1st Dec 2020
																</div>
																
															</div>
														</div>
													</div>
												</div>
											</div>
									</div>	
								</div>
							</div>

							<div className="col-lg-4 ">
								<div>
									<div className="col-lg-12 candidateBlockWrapper">
										<div className="row">
											<div className="col-lg-10 candidateInfoBlock">
												<div className="row">
													<div className="col-lg-12 candidateImgBlock">
														<div className="row">
															<div className="col-lg-5 imageOfCandidate">
																<div className="row">
																	<img src="Images/42.png" alt="candidateName"/>
																</div>
															</div>
															<div className="col-lg-7 displayInfoCandidate">
																<div className="row">
																	<div className="displayCandidateName">
																		Pooja
																		<span className="candidateIdNumber">(9101)</span>
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
																			<div className="postName">Back-End Engineer</div>
																			<div className="postName">Helthcare</div>
																			<div className="postName">05 Year Exp.</div>
																			<div className="postName">Pune</div>
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
																	<div className="col-lg-6 ">
																		<div className="row skillsSubHeading">
																			<i className="fa fa-square rotate45 listRoatate45" ></i>
																				Mathematical aptitude
																		</div>
																	</div>
																	<div className="col-lg-6">
																		<div className="row skillsSubHeading">
																			<i className="fa fa-square rotate45 listRoatate45" ></i>
																				Problem Solving Skills
																		</div>
																	</div>
																	
																</div>
																<div className=" skillsSubHeadingWrapper">	
																	<div className="col-lg-6 ">
																		<div className="row skillsSubHeading">
																			<i className="fa fa-square rotate45 listRoatate45" ></i>
																				Programing Languages
																		</div>
																	</div>
																	<div className="col-lg-6">
																		<div className="row skillsSubHeading">
																			<i className="fa fa-square rotate45 listRoatate45" ></i>
																				Software Devlopment
																		</div>
																	</div>
																	
																</div>
															</div>
														</div>
														<div className="skillsHeadingBlock">
															<div className="skillsHeading">	
																Secondary skllis
															</div>
															<div className=" skillsSubHeadingWrapper">	
																<div className="col-lg-6 ">
																	<div className="row skillsSubHeading">
																		<i className="fa fa-square rotate45 listRoatate45" ></i>
																			Communication
																	</div>
																</div>
																<div className="col-lg-6">
																	<div className="row skillsSubHeading">
																		<i className="fa fa-square rotate45 listRoatate45" ></i>
																			Teamwork
																	</div>
																</div>
																
															</div>
															<div className=" skillsSubHeadingWrapper">	
																<div className="col-lg-6 ">
																	<div className="row skillsSubHeading">
																		<i className="fa fa-square rotate45 listRoatate45" ></i>
																			Multitasking
																	</div>
																</div>
																<div className="col-lg-6">
																	<div className="row skillsSubHeading">
																		<i className="fa fa-square rotate45 listRoatate45" ></i>
																			Attension to Details
																	</div>
																</div>
																
															</div>
														</div>
													</div>

												</div>
											</div>
											<div className="col-lg-2 profileSymbolsWrapper">
												<div className="row profileSymbols">
													<img src="/Images/44.png" alt="Profile Logo"/>
												</div>
												<div className="row profileSymbols">
													<img src="/Images/45.png" alt="Profile Logo"/>
												</div>
												<div className="row profileSymbols">
													<img src="/Images/46.png" alt="Profile Logo"/>
												</div>
												<div className="row profileSymbols">
													<img src="/Images/47.png" alt="Profile Logo"/>
												</div>
												<div className="row profileSymbols">
													<img src="/Images/48.png" alt="Profile Logo"/>
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
															<div className="col-lg-3 salaryBlock ">
																<div className="row expectSalaryBlockHeading">
																	Current CTC
																</div>
																<div className="row expectSalaryBlockSubHeading">
																	RS 10 Lakhs
																</div>
																
															</div>
															<div className="col-lg-3 salaryBlock ">
																<div className="row expectSalaryBlockHeading">
																	Expected CTC
																</div>
																<div className="row expectSalaryBlockSubHeading">
																	RS 12 Lakhs
																</div>
																
															</div>
															<div className="col-lg-3 salaryBlock ">
																<div className="row expectSalaryBlockHeading">
																	Notice Period
																</div>
																<div className="row expectSalaryBlockSubHeading">
																	3 Months
																</div>
																
															</div>
															<div className="col-lg-3 salaryBlock2 ">
																<div className="row expectSalaryBlockHeading">
																	Joining Date
																</div>
																<div className="row expectSalaryBlockSubHeading">
																	1st Dec 2020
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

						<div className="row candidateListRow">
							<div className="col-lg-4 ">
								<div>
									<div className="col-lg-12 candidateBlockWrapper">
										<div className="row">
											<div className="col-lg-10 candidateInfoBlock">
												<div className="row">
													<div className="col-lg-12 candidateImgBlock">
														<div className="row">
															<div className="col-lg-5 imageOfCandidate">
																<div className="row">
																	<img src="Images/43.png" alt="candidateName"/>
																</div>
															</div>
															<div className="col-lg-7 displayInfoCandidate">
																<div className="row">
																	<div className="displayCandidateName">
																		Mishel
																		<span className="candidateIdNumber">(1213)</span>
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
																			<div className="postName">Full Stack Engineer</div>
																			<div className="postName">R & D</div>
																			<div className="postName">03 Year Exp.</div>
																			<div className="postName">Pune</div>
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
																	<div className="col-lg-6 ">
																		<div className="row skillsSubHeading">
																			<i className="fa fa-square rotate45 listRoatate45" ></i>
																				Mathematical aptitude
																		</div>
																	</div>
																	<div className="col-lg-6">
																		<div className="row skillsSubHeading">
																			<i className="fa fa-square rotate45 listRoatate45" ></i>
																				Problem Solving Skills
																		</div>
																	</div>
																	
																</div>
																<div className=" skillsSubHeadingWrapper">	
																	<div className="col-lg-6 ">
																		<div className="row skillsSubHeading">
																			<i className="fa fa-square rotate45 listRoatate45" ></i>
																				Programing Languages
																		</div>
																	</div>
																	<div className="col-lg-6">
																		<div className="row skillsSubHeading">
																			<i className="fa fa-square rotate45 listRoatate45" ></i>
																				Software Devlopment
																		</div>
																	</div>
																	
																</div>
															</div>
														</div>
														<div className="skillsHeadingBlock">
															<div className="skillsHeading">	
																Secondary skllis
															</div>
															<div className=" skillsSubHeadingWrapper">	
																<div className="col-lg-6 ">
																	<div className="row skillsSubHeading">
																		<i className="fa fa-square rotate45 listRoatate45" ></i>
																			Communication
																	</div>
																</div>
																<div className="col-lg-6">
																	<div className="row skillsSubHeading">
																		<i className="fa fa-square rotate45 listRoatate45" ></i>
																			Teamwork
																	</div>
																</div>
																
															</div>
															<div className=" skillsSubHeadingWrapper">	
																<div className="col-lg-6 ">
																	<div className="row skillsSubHeading">
																		<i className="fa fa-square rotate45 listRoatate45" ></i>
																			Multitasking
																	</div>
																</div>
																<div className="col-lg-6">
																	<div className="row skillsSubHeading">
																		<i className="fa fa-square rotate45 listRoatate45" ></i>
																			Attension to Details
																	</div>
																</div>
																
															</div>
														</div>
													</div>

												</div>
											</div>
											<div className="col-lg-2 profileSymbolsWrapper">
												<div className="row profileSymbols">
													<img src="/Images/44.png" alt="Profile Logo"/>
												</div>
												<div className="row profileSymbols">
													<img src="/Images/45.png" alt="Profile Logo"/>
												</div>
												<div className="row profileSymbols">
													<img src="/Images/46.png" alt="Profile Logo"/>
												</div>
												<div className="row profileSymbols">
													<img src="/Images/47.png" alt="Profile Logo"/>
												</div>
												<div className="row profileSymbols">
													<img src="/Images/48.png" alt="Profile Logo"/>
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
															<div className="col-lg-3 salaryBlock ">
																<div className="row expectSalaryBlockHeading">
																	Current CTC
																</div>
																<div className="row expectSalaryBlockSubHeading">
																	RS 10 Lakhs
																</div>
																
															</div>
															<div className="col-lg-3 salaryBlock ">
																<div className="row expectSalaryBlockHeading">
																	Expected CTC
																</div>
																<div className="row expectSalaryBlockSubHeading">
																	RS 12 Lakhs
																</div>
																
															</div>
															<div className="col-lg-3 salaryBlock ">
																<div className="row expectSalaryBlockHeading">
																	Notice Period
																</div>
																<div className="row expectSalaryBlockSubHeading">
																	3 Months
																</div>
																
															</div>
															<div className="col-lg-3 salaryBlock2 ">
																<div className="row expectSalaryBlockHeading">
																	Joining Date
																</div>
																<div className="row expectSalaryBlockSubHeading">
																	1st Dec 2020
																</div>
																
															</div>
														</div>
													</div>
												</div>
											</div>
									</div>	
								</div>
							</div>

							<div className="col-lg-4 ">
								<div>
									<div className="col-lg-12 candidateBlockWrapper">
										<div className="row">
											<div className="col-lg-10 candidateInfoBlock">
												<div className="row">
													<div className="col-lg-12 candidateImgBlock">
														<div className="row">
															<div className="col-lg-5 imageOfCandidate">
																<div className="row">
																	<img src="Images/41.png" alt="candidateName"/>
																</div>
															</div>
															<div className="col-lg-7 displayInfoCandidate">
																<div className="row">
																	<div className="displayCandidateName">
																		Ajay
																		<span className="candidateIdNumber">(5678)</span>
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
																			<div className="postName">Front-End Engineer</div>
																			<div className="postName">Retail</div>
																			<div className="postName">08 Year Exp.</div>
																			<div className="postName">Pune</div>
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
																	<div className="col-lg-6 ">
																		<div className="row skillsSubHeading">
																			<i className="fa fa-square rotate45 listRoatate45" ></i>
																				Mathematical aptitude
																		</div>
																	</div>
																	<div className="col-lg-6">
																		<div className="row skillsSubHeading">
																			<i className="fa fa-square rotate45 listRoatate45" ></i>
																				Problem Solving Skills
																		</div>
																	</div>
																	
																</div>
																<div className=" skillsSubHeadingWrapper">	
																	<div className="col-lg-6 ">
																		<div className="row skillsSubHeading">
																			<i className="fa fa-square rotate45 listRoatate45" ></i>
																				Programing Languages
																		</div>
																	</div>
																	<div className="col-lg-6">
																		<div className="row skillsSubHeading">
																			<i className="fa fa-square rotate45 listRoatate45" ></i>
																				Software Devlopment
																		</div>
																	</div>
																	
																</div>
															</div>
														</div>
														<div className="skillsHeadingBlock">
															<div className="skillsHeading">	
																Secondary skllis
															</div>
															<div className=" skillsSubHeadingWrapper">	
																<div className="col-lg-6 ">
																	<div className="row skillsSubHeading">
																		<i className="fa fa-square rotate45 listRoatate45" ></i>
																			Communication
																	</div>
																</div>
																<div className="col-lg-6">
																	<div className="row skillsSubHeading">
																		<i className="fa fa-square rotate45 listRoatate45" ></i>
																			Teamwork
																	</div>
																</div>
																
															</div>
															<div className=" skillsSubHeadingWrapper">	
																<div className="col-lg-6 ">
																	<div className="row skillsSubHeading">
																		<i className="fa fa-square rotate45 listRoatate45" ></i>
																			Multitasking
																	</div>
																</div>
																<div className="col-lg-6">
																	<div className="row skillsSubHeading">
																		<i className="fa fa-square rotate45 listRoatate45" ></i>
																			Attension to Details
																	</div>
																</div>
																
															</div>
														</div>
													</div>

												</div>
											</div>
											<div className="col-lg-2 profileSymbolsWrapper">
												<div className="row profileSymbols">
													<img src="/Images/44.png" alt="Profile Logo"/>
												</div>
												<div className="row profileSymbols">
													<img src="/Images/45.png" alt="Profile Logo"/>
												</div>
												<div className="row profileSymbols">
													<img src="/Images/46.png" alt="Profile Logo"/>
												</div>
												<div className="row profileSymbols">
													<img src="/Images/47.png" alt="Profile Logo"/>
												</div>
												<div className="row profileSymbols">
													<img src="/Images/48.png" alt="Profile Logo"/>
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
															<div className="col-lg-3 salaryBlock ">
																<div className="row expectSalaryBlockHeading">
																	Current CTC
																</div>
																<div className="row expectSalaryBlockSubHeading">
																	RS 10 Lakhs
																</div>
																
															</div>
															<div className="col-lg-3 salaryBlock ">
																<div className="row expectSalaryBlockHeading">
																	Expected CTC
																</div>
																<div className="row expectSalaryBlockSubHeading">
																	RS 12 Lakhs
																</div>
																
															</div>
															<div className="col-lg-3 salaryBlock ">
																<div className="row expectSalaryBlockHeading">
																	Notice Period
																</div>
																<div className="row expectSalaryBlockSubHeading">
																	3 Months
																</div>
																
															</div>
															<div className="col-lg-3 salaryBlock2 ">
																<div className="row expectSalaryBlockHeading">
																	Joining Date
																</div>
																<div className="row expectSalaryBlockSubHeading">
																	1st Dec 2020
																</div>
																
															</div>
														</div>
													</div>
												</div>
											</div>
									</div>	
								</div>
							</div>

							<div className="col-lg-4 ">
								<div>
									<div className="col-lg-12 candidateBlockWrapper">
										<div className="row">
											<div className="col-lg-10 candidateInfoBlock">
												<div className="row">
													<div className="col-lg-12 candidateImgBlock">
														<div className="row">
															<div className="col-lg-5 imageOfCandidate">
																<div className="row">
																	<img src="Images/42.png" alt="candidateName"/>
																</div>
															</div>
															<div className="col-lg-7 displayInfoCandidate">
																<div className="row">
																	<div className="displayCandidateName">
																		Pooja
																		<span className="candidateIdNumber">(9101)</span>
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
																			<div className="postName">Back-End Engineer</div>
																			<div className="postName">Helthcare</div>
																			<div className="postName">05 Year Exp.</div>
																			<div className="postName">Pune</div>
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
																	<div className="col-lg-6 ">
																		<div className="row skillsSubHeading">
																			<i className="fa fa-square rotate45 listRoatate45" ></i>
																				Mathematical aptitude
																		</div>
																	</div>
																	<div className="col-lg-6">
																		<div className="row skillsSubHeading">
																			<i className="fa fa-square rotate45 listRoatate45" ></i>
																				Problem Solving Skills
																		</div>
																	</div>
																	
																</div>
																<div className=" skillsSubHeadingWrapper">	
																	<div className="col-lg-6 ">
																		<div className="row skillsSubHeading">
																			<i className="fa fa-square rotate45 listRoatate45" ></i>
																				Programing Languages
																		</div>
																	</div>
																	<div className="col-lg-6">
																		<div className="row skillsSubHeading">
																			<i className="fa fa-square rotate45 listRoatate45" ></i>
																				Software Devlopment
																		</div>
																	</div>
																	
																</div>
															</div>
														</div>
														<div className="skillsHeadingBlock">
															<div className="skillsHeading">	
																Secondary skllis
															</div>
															<div className=" skillsSubHeadingWrapper">	
																<div className="col-lg-6 ">
																	<div className="row skillsSubHeading">
																		<i className="fa fa-square rotate45 listRoatate45" ></i>
																			Communication
																	</div>
																</div>
																<div className="col-lg-6">
																	<div className="row skillsSubHeading">
																		<i className="fa fa-square rotate45 listRoatate45" ></i>
																			Teamwork
																	</div>
																</div>
																
															</div>
															<div className=" skillsSubHeadingWrapper">	
																<div className="col-lg-6 ">
																	<div className="row skillsSubHeading">
																		<i className="fa fa-square rotate45 listRoatate45" ></i>
																			Multitasking
																	</div>
																</div>
																<div className="col-lg-6">
																	<div className="row skillsSubHeading">
																		<i className="fa fa-square rotate45 listRoatate45" ></i>
																			Attension to Details
																	</div>
																</div>
																
															</div>
														</div>
													</div>

												</div>
											</div>
											<div className="col-lg-2 profileSymbolsWrapper">
												<div className="row profileSymbols">
													<img src="/Images/44.png" alt="Profile Logo"/>
												</div>
												<div className="row profileSymbols">
													<img src="/Images/45.png" alt="Profile Logo"/>
												</div>
												<div className="row profileSymbols">
													<img src="/Images/46.png" alt="Profile Logo"/>
												</div>
												<div className="row profileSymbols">
													<img src="/Images/47.png" alt="Profile Logo"/>
												</div>
												<div className="row profileSymbols">
													<img src="/Images/48.png" alt="Profile Logo"/>
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
															<div className="col-lg-3 salaryBlock ">
																<div className="row expectSalaryBlockHeading">
																	Current CTC
																</div>
																<div className="row expectSalaryBlockSubHeading">
																	RS 10 Lakhs
																</div>
																
															</div>
															<div className="col-lg-3 salaryBlock ">
																<div className="row expectSalaryBlockHeading">
																	Expected CTC
																</div>
																<div className="row expectSalaryBlockSubHeading">
																	RS 12 Lakhs
																</div>
																
															</div>
															<div className="col-lg-3 salaryBlock ">
																<div className="row expectSalaryBlockHeading">
																	Notice Period
																</div>
																<div className="row expectSalaryBlockSubHeading">
																	3 Months
																</div>
																
															</div>
															<div className="col-lg-3 salaryBlock2 ">
																<div className="row expectSalaryBlockHeading">
																	Joining Date
																</div>
																<div className="row expectSalaryBlockSubHeading">
																	1st Dec 2020
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

						<div className="row candidateListRow">
							<div className="col-lg-4 ">
								<div>
									<div className="col-lg-12 candidateBlockWrapper">
										<div className="row">
											<div className="col-lg-10 candidateInfoBlock">
												<div className="row">
													<div className="col-lg-12 candidateImgBlock">
														<div className="row">
															<div className="col-lg-5 imageOfCandidate">
																<div className="row">
																	<img src="Images/43.png" alt="candidateName"/>
																</div>
															</div>
															<div className="col-lg-7 displayInfoCandidate">
																<div className="row">
																	<div className="displayCandidateName">
																		Mishel
																		<span className="candidateIdNumber">(1213)</span>
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
																			<div className="postName">Full Stack Engineer</div>
																			<div className="postName">R & D</div>
																			<div className="postName">03 Year Exp.</div>
																			<div className="postName">Pune</div>
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
																	<div className="col-lg-6 ">
																		<div className="row skillsSubHeading">
																			<i className="fa fa-square rotate45 listRoatate45" ></i>
																				Mathematical aptitude
																		</div>
																	</div>
																	<div className="col-lg-6">
																		<div className="row skillsSubHeading">
																			<i className="fa fa-square rotate45 listRoatate45" ></i>
																				Problem Solving Skills
																		</div>
																	</div>
																	
																</div>
																<div className=" skillsSubHeadingWrapper">	
																	<div className="col-lg-6 ">
																		<div className="row skillsSubHeading">
																			<i className="fa fa-square rotate45 listRoatate45" ></i>
																				Programing Languages
																		</div>
																	</div>
																	<div className="col-lg-6">
																		<div className="row skillsSubHeading">
																			<i className="fa fa-square rotate45 listRoatate45" ></i>
																				Software Devlopment
																		</div>
																	</div>
																	
																</div>
															</div>
														</div>
														<div className="skillsHeadingBlock">
															<div className="skillsHeading">	
																Secondary skllis
															</div>
															<div className=" skillsSubHeadingWrapper">	
																<div className="col-lg-6 ">
																	<div className="row skillsSubHeading">
																		<i className="fa fa-square rotate45 listRoatate45" ></i>
																			Communication
																	</div>
																</div>
																<div className="col-lg-6">
																	<div className="row skillsSubHeading">
																		<i className="fa fa-square rotate45 listRoatate45" ></i>
																			Teamwork
																	</div>
																</div>
																
															</div>
															<div className=" skillsSubHeadingWrapper">	
																<div className="col-lg-6 ">
																	<div className="row skillsSubHeading">
																		<i className="fa fa-square rotate45 listRoatate45" ></i>
																			Multitasking
																	</div>
																</div>
																<div className="col-lg-6">
																	<div className="row skillsSubHeading">
																		<i className="fa fa-square rotate45 listRoatate45" ></i>
																			Attension to Details
																	</div>
																</div>
																
															</div>
														</div>
													</div>

												</div>
											</div>
											<div className="col-lg-2 profileSymbolsWrapper">
												<div className="row profileSymbols">
													<img src="/Images/44.png" alt="Profile Logo"/>
												</div>
												<div className="row profileSymbols">
													<img src="/Images/45.png" alt="Profile Logo"/>
												</div>
												<div className="row profileSymbols">
													<img src="/Images/46.png" alt="Profile Logo"/>
												</div>
												<div className="row profileSymbols">
													<img src="/Images/47.png" alt="Profile Logo"/>
												</div>
												<div className="row profileSymbols">
													<img src="/Images/48.png" alt="Profile Logo"/>
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
															<div className="col-lg-3 salaryBlock ">
																<div className="row expectSalaryBlockHeading">
																	Current CTC
																</div>
																<div className="row expectSalaryBlockSubHeading">
																	RS 10 Lakhs
																</div>
																
															</div>
															<div className="col-lg-3 salaryBlock ">
																<div className="row expectSalaryBlockHeading">
																	Expected CTC
																</div>
																<div className="row expectSalaryBlockSubHeading">
																	RS 12 Lakhs
																</div>
																
															</div>
															<div className="col-lg-3 salaryBlock ">
																<div className="row expectSalaryBlockHeading">
																	Notice Period
																</div>
																<div className="row expectSalaryBlockSubHeading">
																	3 Months
																</div>
																
															</div>
															<div className="col-lg-3 salaryBlock2 ">
																<div className="row expectSalaryBlockHeading">
																	Joining Date
																</div>
																<div className="row expectSalaryBlockSubHeading">
																	1st Dec 2020
																</div>
																
															</div>
														</div>
													</div>
												</div>
											</div>
									</div>	
								</div>
							</div>

							<div className="col-lg-4 ">
								<div>
									<div className="col-lg-12 candidateBlockWrapper">
										<div className="row">
											<div className="col-lg-10 candidateInfoBlock">
												<div className="row">
													<div className="col-lg-12 candidateImgBlock">
														<div className="row">
															<div className="col-lg-5 imageOfCandidate">
																<div className="row">
																	<img src="Images/41.png" alt="candidateName"/>
																</div>
															</div>
															<div className="col-lg-7 displayInfoCandidate">
																<div className="row">
																	<div className="displayCandidateName">
																		Ajay
																		<span className="candidateIdNumber">(5678)</span>
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
																			<div className="postName">Front-End Engineer</div>
																			<div className="postName">Retail</div>
																			<div className="postName">08 Year Exp.</div>
																			<div className="postName">Pune</div>
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
																	<div className="col-lg-6 ">
																		<div className="row skillsSubHeading">
																			<i className="fa fa-square rotate45 listRoatate45" ></i>
																				Mathematical aptitude
																		</div>
																	</div>
																	<div className="col-lg-6">
																		<div className="row skillsSubHeading">
																			<i className="fa fa-square rotate45 listRoatate45" ></i>
																				Problem Solving Skills
																		</div>
																	</div>
																	
																</div>
																<div className=" skillsSubHeadingWrapper">	
																	<div className="col-lg-6 ">
																		<div className="row skillsSubHeading">
																			<i className="fa fa-square rotate45 listRoatate45" ></i>
																				Programing Languages
																		</div>
																	</div>
																	<div className="col-lg-6">
																		<div className="row skillsSubHeading">
																			<i className="fa fa-square rotate45 listRoatate45" ></i>
																				Software Devlopment
																		</div>
																	</div>
																	
																</div>
															</div>
														</div>
														<div className="skillsHeadingBlock">
															<div className="skillsHeading">	
																Secondary skllis
															</div>
															<div className=" skillsSubHeadingWrapper">	
																<div className="col-lg-6 ">
																	<div className="row skillsSubHeading">
																		<i className="fa fa-square rotate45 listRoatate45" ></i>
																			Communication
																	</div>
																</div>
																<div className="col-lg-6">
																	<div className="row skillsSubHeading">
																		<i className="fa fa-square rotate45 listRoatate45" ></i>
																			Teamwork
																	</div>
																</div>
																
															</div>
															<div className=" skillsSubHeadingWrapper">	
																<div className="col-lg-6 ">
																	<div className="row skillsSubHeading">
																		<i className="fa fa-square rotate45 listRoatate45" ></i>
																			Multitasking
																	</div>
																</div>
																<div className="col-lg-6">
																	<div className="row skillsSubHeading">
																		<i className="fa fa-square rotate45 listRoatate45" ></i>
																			Attension to Details
																	</div>
																</div>
																
															</div>
														</div>
													</div>

												</div>
											</div>
											<div className="col-lg-2 profileSymbolsWrapper">
												<div className="row profileSymbols">
													<img src="/Images/44.png" alt="Profile Logo"/>
												</div>
												<div className="row profileSymbols">
													<img src="/Images/45.png" alt="Profile Logo"/>
												</div>
												<div className="row profileSymbols">
													<img src="/Images/46.png" alt="Profile Logo"/>
												</div>
												<div className="row profileSymbols">
													<img src="/Images/47.png" alt="Profile Logo"/>
												</div>
												<div className="row profileSymbols">
													<img src="/Images/48.png" alt="Profile Logo"/>
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
															<div className="col-lg-3 salaryBlock ">
																<div className="row expectSalaryBlockHeading">
																	Current CTC
																</div>
																<div className="row expectSalaryBlockSubHeading">
																	RS 10 Lakhs
																</div>
																
															</div>
															<div className="col-lg-3 salaryBlock ">
																<div className="row expectSalaryBlockHeading">
																	Expected CTC
																</div>
																<div className="row expectSalaryBlockSubHeading">
																	RS 12 Lakhs
																</div>
																
															</div>
															<div className="col-lg-3 salaryBlock ">
																<div className="row expectSalaryBlockHeading">
																	Notice Period
																</div>
																<div className="row expectSalaryBlockSubHeading">
																	3 Months
																</div>
																
															</div>
															<div className="col-lg-3 salaryBlock2 ">
																<div className="row expectSalaryBlockHeading">
																	Joining Date
																</div>
																<div className="row expectSalaryBlockSubHeading">
																	1st Dec 2020
																</div>
																
															</div>
														</div>
													</div>
												</div>
											</div>
									</div>	
								</div>
							</div>

							<div className="col-lg-4 ">
								<div>
									<div className="col-lg-12 candidateBlockWrapper">
										<div className="row">
											<div className="col-lg-10 candidateInfoBlock">
												<div className="row">
													<div className="col-lg-12 candidateImgBlock">
														<div className="row">
															<div className="col-lg-5 imageOfCandidate">
																<div className="row">
																	<img src="Images/42.png" alt="candidateName"/>
																</div>
															</div>
															<div className="col-lg-7 displayInfoCandidate">
																<div className="row">
																	<div className="displayCandidateName">
																		Pooja
																		<span className="candidateIdNumber">(9101)</span>
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
																			<div className="postName">Back-End Engineer</div>
																			<div className="postName">Helthcare</div>
																			<div className="postName">05 Year Exp.</div>
																			<div className="postName">Pune</div>
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
																	<div className="col-lg-6 ">
																		<div className="row skillsSubHeading">
																			<i className="fa fa-square rotate45 listRoatate45" ></i>
																				Mathematical aptitude
																		</div>
																	</div>
																	<div className="col-lg-6">
																		<div className="row skillsSubHeading">
																			<i className="fa fa-square rotate45 listRoatate45" ></i>
																				Problem Solving Skills
																		</div>
																	</div>
																	
																</div>
																<div className=" skillsSubHeadingWrapper">	
																	<div className="col-lg-6 ">
																		<div className="row skillsSubHeading">
																			<i className="fa fa-square rotate45 listRoatate45" ></i>
																				Programing Languages
																		</div>
																	</div>
																	<div className="col-lg-6">
																		<div className="row skillsSubHeading">
																			<i className="fa fa-square rotate45 listRoatate45" ></i>
																				Software Devlopment
																		</div>
																	</div>
																	
																</div>
															</div>
														</div>
														<div className="skillsHeadingBlock">
															<div className="skillsHeading">	
																Secondary skllis
															</div>
															<div className=" skillsSubHeadingWrapper">	
																<div className="col-lg-6 ">
																	<div className="row skillsSubHeading">
																		<i className="fa fa-square rotate45 listRoatate45" ></i>
																			Communication
																	</div>
																</div>
																<div className="col-lg-6">
																	<div className="row skillsSubHeading">
																		<i className="fa fa-square rotate45 listRoatate45" ></i>
																			Teamwork
																	</div>
																</div>
																
															</div>
															<div className=" skillsSubHeadingWrapper">	
																<div className="col-lg-6 ">
																	<div className="row skillsSubHeading">
																		<i className="fa fa-square rotate45 listRoatate45" ></i>
																			Multitasking
																	</div>
																</div>
																<div className="col-lg-6">
																	<div className="row skillsSubHeading">
																		<i className="fa fa-square rotate45 listRoatate45" ></i>
																			Attension to Details
																	</div>
																</div>
																
															</div>
														</div>
													</div>

												</div>
											</div>
											<div className="col-lg-2 profileSymbolsWrapper">
												<div className="row profileSymbols">
													<img src="/Images/44.png" alt="Profile Logo"/>
												</div>
												<div className="row profileSymbols">
													<img src="/Images/45.png" alt="Profile Logo"/>
												</div>
												<div className="row profileSymbols">
													<img src="/Images/46.png" alt="Profile Logo"/>
												</div>
												<div className="row profileSymbols">
													<img src="/Images/47.png" alt="Profile Logo"/>
												</div>
												<div className="row profileSymbols">
													<img src="/Images/48.png" alt="Profile Logo"/>
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
															<div className="col-lg-3 salaryBlock ">
																<div className="row expectSalaryBlockHeading">
																	Current CTC
																</div>
																<div className="row expectSalaryBlockSubHeading">
																	RS 10 Lakhs
																</div>
																
															</div>
															<div className="col-lg-3 salaryBlock ">
																<div className="row expectSalaryBlockHeading">
																	Expected CTC
																</div>
																<div className="row expectSalaryBlockSubHeading">
																	RS 12 Lakhs
																</div>
																
															</div>
															<div className="col-lg-3 salaryBlock ">
																<div className="row expectSalaryBlockHeading">
																	Notice Period
																</div>
																<div className="row expectSalaryBlockSubHeading">
																	3 Months
																</div>
																
															</div>
															<div className="col-lg-3 salaryBlock2 ">
																<div className="row expectSalaryBlockHeading">
																	Joining Date
																</div>
																<div className="row expectSalaryBlockSubHeading">
																	1st Dec 2020
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

export default CandidateList;