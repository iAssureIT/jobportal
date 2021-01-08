import React,{Component} 	  from 'react';
import Axios 			 	  from 'axios';
import Swal 			 	  from 'sweetalert2';
import Moment                 from 'moment';
import { FontAwesomeIcon } 	  from '@fortawesome/react-fontawesome';
import { connect }        	  from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../common/actions/index';
import $                      from 'jquery';
import IAssureTable 		  from '../../../coreadmin/IAssureTable/IAssureTable.jsx';
import './Candidatelist.css';

class Candidatelist extends Component{ 
	constructor(props){
		super(props);
		
		this.state={
			dataArry            : 	[],
			skillsArry          : 	[],
			jobInfo 		    : 	[], 	
			candidateSelector   : 	{ "jobID" :  this.props.jobID },
			view 			    : 	'Grid',
			RecordsTable 	    : 	[],
			tableHeading 	    : 	{
						            	name 	: "Name",
						            	gender 	: "Gender",
						            	contactDetails: "Contact Details",
						            	address: "Address",
						            	academics: "Academics",
						            	workExperience : "Work Experience"
	          					 	},
			tableObjects 	    : 	{
										paginationApply     : 	false,
										searchApply     	: 	false,
										//editUrl          	: 	'/'+this.props.entity+'/basic-details',
										//deleteMethod    	: 	'delete',
										apiLink         	: 	'/api/entitymaster/',
										downloadApply   	: 	true
	      							},
			startRange        	: 	0,
			limitRange          : 	100000,

      	  /*candidate_id        : 	this.props.match.params.candidate_id,*/
			dataArry            : 	[],
			skillsArry          : 	[],
 		}
	}
	
	
	componentDidMount(){
		console.log(this.props);
		var {mapAction}  = this.props;
		mapAction.filterCandidatesApplied(this.state.candidateSelector)	
		
		// get single job information by jobID
		Axios.get("/api/jobs/get/one/"+this.props.jobID)
		.then(response=>{
			this.setState({jobInfo : response.data.jobsData})
		})
		.catch(err=>{

		})

		/*Axios.get("/api/candidatemaster/get/one/"+this.state.candidate_id)
		.then(response=>{
			 
			 	this.setState({

			 		dataArry     :response.data,
			 		skillsArry   :response.data[0].skillCertification
			 	})
			 })
			 .catch(error=>{
			 	Swal.fire("Submit Error!",error.message,'error');
			 })*/
	}
	
	getData(){
		var tableData = this.props.candidateList.map((a, i)=>{
			console.log(a)
		var addressDetails = a.candidate[0].address.map((l,i)=>{
			return "<ul class='nopadding'><li><b>"+a.addressType[0].addressType+ " Address</b>: "+l.address+"</li></ul>"
		})
		var academicsData = a.candidate[0].academics.map((c,i)=>{
			return "<ul class='nopadding'><li>"+a.qualificationlevel[0].qualificationLevel+" "+a.qualification[0].qualification+", "+(a.universityBoard[0].university)+" " + a.collegeSchool[0].collage+" "+c.state+" " +c.country+"</li></ul>"
		})
		var workExperience = a.candidate[0].workExperience.map((c,i)=>{
			return "<ul class='nopadding'><li>"+c.lastDegn+" "+c.companyName+" "+c.city+ ", "+c.state+" " + c.country+ "</li></ul>"
		})
        return{
            name 	: a.candidate[0].basicInfo.firstName + " "+a.candidate[0].basicInfo.lastName,
            gender  : a.candidate[0].basicInfo.gender,
            contactDetails:"<b>Email : </b>"+a.candidate[0].contact.emailId+"<br><b>Mobile No. : </b>"+a.candidate[0].contact.mobile,
            address :addressDetails && addressDetails.length > 0 ? addressDetails : "No Address Added Yet",
            academics:academicsData && academicsData.length > 0 ? academicsData : "No Academics Added Yet",
            workExperience : workExperience && workExperience.length > 0 ? workExperience : "No Experiences Added Yet", 
            _id:a._id
        }
      	})
		this.setState({RecordsTable:tableData,initial: 'All'})
	}
	
	showView(value,event){
		$('.viewBtn').removeClass('gridBtnActive');
        $(event.target).addClass('gridBtnActive');
    	this.setState({
    		view : value
    	})
    }
	
	render(){
		return(	
				<div className="candidateListWrapperMain">
					<div className="col-lg-12 candidateListWrapper">
						{
							<div className="col-lg-8">
								<div className="JobInfoContainer">
									<div className="col-lg-12">
										<div className="col-lg-11 jobDescBlock">
											<div className="joblistDesignation">
												{this.state.jobInfo[0] ? this.state.jobInfo[0].jobBasicInfo.jobTitle : null}
											</div>
											<div className="joblistCompanyName">
												{this.state.jobInfo[0] ? this.state.jobInfo[0].employer[0].companyName : null}
											</div>
											<div> 
												<i className="fa fa-calendar joblistExperience"></i> &nbsp; Exp: {this.state.jobInfo[0] ? this.state.jobInfo[0].eligibility.minExperience : null}
											</div>
											<div> 
												<i className="fa fa-rupee joblistCtcSal"></i> &nbsp; <i className="fa fa-inr"></i> {this.state.jobInfo[0] ? this.state.jobInfo[0].ctcOffered.minSalary : null} {this.state.jobInfo[0] ? this.state.jobInfo[0].ctcOffered.minSalPeriod : null} - <i className="fa fa-inr"></i> {this.state.jobInfo[0] ? this.state.jobInfo[0].ctcOffered.maxSalary : null} {this.state.jobInfo[0] ? this.state.jobInfo[0].ctcOffered.maxSalPeriod : null}
											</div>
											<div>
												<i className="fa fa-map-marker joblistLocation"></i> &nbsp; {this.state.jobInfo[0] ? this.state.jobInfo[0].location.address : null}
											</div>
											<div>
												<i className="fa fa-users joblistNumPositions"></i> &nbsp; No. of positions : {this.state.jobInfo[0] ? this.state.jobInfo[0].jobBasicInfo.positions : null}
											</div>	
										</div>
									</div>	
								</div>
							</div>
						}	
					</div>
					
					<div className="col-lg-12 downloadCount">
						Candidates applied to job  : 
						<i class="fa fa-th-list fa-lg btn pull-right listViewIcon viewBtn" title="List view" name="view" ref="view" value={this.state.view} onClick={this.showView.bind(this,'List')} onChange={this.handleChange} aria-hidden="true"></i>
						<i class="fa fa-th fa-lg btn pull-right gridBtnActive gridViewIcon viewBtn" title="Grid view" name="view" ref="view" value={this.state.view} onClick={this.showView.bind(this,'Grid')} onChange={this.handleChange} aria-hidden="true"></i>
					</div>

					{this.state.view === 'List' ?
					
								 	<div className="col-lg-12"> 
			 							<IAssureTable
                                                tableHeading	=	{this.state.tableHeading}
						                       	dataCount		=	{this.state.entityCount}
						                       	tableData		=	{this.state.RecordsTable}
						                       	tableObjects	=	{this.state.tableObjects}
						                       	getData			=	{this.getData.bind(this)}
						                       	id 				=	{"id"}
						                       	tableName 		=	{this.state.entityType}
                                        />
			                       	</div>
									:
									<div className="col-lg-12">
										
									</div>
								}
								
								{ this.state.view === 'Grid' ?
									
									<div className="container-fluid  candidateList col-lg-12">
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
																			<img src="/images/43.png" alt="candidateName"/>
																		</div>
																	</div>
																	<div className="col-lg-7 displayInfoCandidate">
																		<div className="row">
																			<div className="displayCandidateName">
																				{/*{elem.candidate[0].basicInfo.firstName}*/}
																				<a href={"/candidate-profile/"}> Mishel </a>
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
																					<div className="postName">{/*{elem.candidate[0].workExperience[index] ? elem.candidate[0].workExperience[index].lastDegn : null}*/} Project Manager</div> 
																					<div className="postName">{/*{elem.candidate[0].workExperience[index] ? elem.candidate[0].workExperience[index].department : null}*/} IT Industry</div>
																					<div className="postName">10 Year Exp.</div>
																					<div className="postName">{/*{elem.candidate[0].workExperience[index] ? elem.candidate[0].workExperience[index].city : null}*/} Pune</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
															<div className="col-lg-12 candidateSkillsBlocks">
																<div className="">
																	<div className="skillsHeading">	
																		Primary skills
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
																										{/*{elem.primarySkills[index]}*/}
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
																		Secondary skills
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
														<div className="row profileExlIcon">
															<i className="fa fa-file-excel-o" title="Download as excel file" aria-hidden="true"></i>
														</div>
													</div>	
												</div>
												<div className="row">
													<div className="col-lg-12 salaryBlockWrapper">
														<div className="salaryBlockHeading">
															Current Offers : &nbsp;<span className="salrayBlockSubHeading"> 2 View</span>
														</div>
														<div className="expectSalaryBlock">
															<div className="row">
																<div className="col-lg-4 salaryBlock ">
																	<div className="row expectSalaryBlockHeading">
																		Current CTC
																	</div>
																	<div className="row expectSalaryBlockSubHeading">
																		{/*{elem.candidate[0].workExperience[index] ? elem.candidate[0].workExperience[index].lastSalary : null}*/} Rs 10 Lakhs
																	</div>
																	
																</div>
																<div className="col-lg-4 salaryBlock ">
																	<div className="row expectSalaryBlockHeading">
																		Expected CTC
																	</div>
																	<div className="row expectSalaryBlockSubHeading">
																		{/*{elem.candidate[0].workExperience[index] ? elem.candidate[0].workExperience[index].expectedSalary : null}*/} Rs 12 Lakhs
																	</div>
																	
																</div>
																<div className="col-lg-4 salaryBlock2 ">
																	<div className="row expectSalaryBlockHeading">
																		Notice Period
																	</div>
																	<div className="row expectSalaryBlockSubHeading">
																		{/*{elem.candidate[0].workExperience[index] ? elem.candidate[0].workExperience[index].noticePeriod : null}*/} 3 Months
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
									    	</div>	
										</div>
							    	</div>
										{

											this.props.candidateList
											? 	
											this.props.candidateList.map((elem,index)=>{
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
																										<a href={"/candidate-profile/"}> {elem.candidate[0].basicInfo.firstName} </a>
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
																										<div className="postName">{elem.candidate[0].workExperience[index] ? elem.candidate[0].workExperience[index].lastDegn : null}</div> 
																										<div className="postName">{elem.candidate[0].workExperience[index] ? elem.candidate[0].workExperience[index].department : null} </div>
																										<div className="postName"></div>
																										<div className="postName">{elem.candidate[0].workExperience[index] ? elem.candidate[0].workExperience[index].city : null} </div>
																									</div>
																								</div>
																							</div>
																						</div>
																					</div>
																				</div>
																				<div className="col-lg-12 candidateSkillsBlocks">
																					<div className="">
																						<div className="skillsHeading">	
																							Primary skills
																						</div>
																						<div className=" marginForSkillHeading">
																							<div className=" skillsSubHeadingWrapper">	
																								{
																									this.state.skillsArry.length > 0
																									?
																									this.state.skillsArry.map((elem,index)=>{
																										return(
																												<div className="col-lg-6" key={index}>
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
																							Secondary skills
																						</div>
																						<div className=" skillsSubHeadingWrapper">	
																							{
																								this.state.skillsArry.length > 0
																								?
																								this.state.skillsArry.map((elem,index)=>{
																									return(
																											<div className="col-lg-6" key={index}>
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
																			<div className="row profileExlIcon">
																				<i className="fa fa-file-excel-o" title="Download as excel file" aria-hidden="true"></i>
																			</div>
																		</div>	
																	</div>
																	<div className="row">
																		<div className="col-lg-12 salaryBlockWrapper">
																			<div className="salaryBlockHeading">
																				Current Offers :<span className="salrayBlockSubHeading"> 2 View</span>
																			</div>
																			<div className="expectSalaryBlock">
																				<div className="row">
																					<div className="col-lg-4 salaryBlock ">
																						<div className="row expectSalaryBlockHeading">
																							Current CTC
																						</div>
																						<div className="row expectSalaryBlockSubHeading">
																							{/*{elem.candidate[0].workExperience[index] ? elem.candidate[0].workExperience[index].lastSalary : null}*/} Rs 10 Lakhs
																						</div>
																						
																					</div>
																					<div className="col-lg-4 salaryBlock ">
																						<div className="row expectSalaryBlockHeading">
																							Expected CTC
																						</div>
																						<div className="row expectSalaryBlockSubHeading">
																							{/*{elem.candidate[0].workExperience[index] ? elem.candidate[0].workExperience[index].expectedSalary : null}*/} Rs 12 Lakhs
																						</div>
																						
																					</div>
																					<div className="col-lg-4 salaryBlock2 ">
																						<div className="row expectSalaryBlockHeading">
																							Notice Period
																						</div>
																						<div className="row expectSalaryBlockSubHeading">
																							{/*{elem.candidate[0].workExperience[index] ? elem.candidate[0].workExperience[index].noticePeriod : null}*/} 3 Months
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
									:
									null
					}				
			);
				</div>
		);
	}
}

const mapStateToProps = (state)=>{
    return {
        candidateSelector   : state.candidateSelector,
        candidateList 		: state.candidateList 
    }
}
const mapDispatchToProps = (dispatch) => ({
  mapAction :  bindActionCreators(mapActionCreator, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps) (Candidatelist);
