import React,{Component} 	  from 'react';
import Axios 			 	  from 'axios';
import Swal 			 	  from 'sweetalert2';
import Moment                 from 'moment';
import { FontAwesomeIcon } 	  from '@fortawesome/react-fontawesome';
import { connect }        	  from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../Common/actions/index';
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
			this.setState({jobInfo : response.data})
		})
		.catch(err=>{

		})
	}
	
	getData(){
		var tableData = this.props.candidateList.map((a, i)=>{
			console.log(a)
		var addressDetails = a.candidate_id.address.map((l,i)=>{
			return "<ul class='nopadding'><li><b>"+l.addressType.addressType+ " Address</b>: "+l.address+"</li></ul>"
		})
		var academicsData = a.candidate_id.academics.map((c,i)=>{
			return "<ul class='nopadding'><li>"+c.qualificationlevel_id.qualificationLevel+" "+c.qualification_id.qualification+", "+(c.university_id.university)+" " + c.collegeSchool+" "+c.state+" " +c.country+"</li></ul>"
		})
		var workExperience = a.candidate_id.workExperience.map((c,i)=>{
			return "<ul class='nopadding'><li>"+c.lastDegn+" "+c.company_id.companyName+" "+c.city+ ", "+c.state+" " + c.country+ "</li></ul>"
		})
        return{
            name 	: a.candidate_id.basicInfo.firstName + " "+a.candidate_id.basicInfo.lastName,
            gender  : a.candidate_id.basicInfo.gender,
            contactDetails:"<b>Email : </b>"+a.candidate_id.contact.emailId+"<br><b>Mobile No. : </b>"+a.candidate_id.contact.mobile,
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
		console.log(this.state.jobInfo)
		return(	
				<div className="candidateListWrapperMain">
					<div className="col-lg-12 candidateListWrapper">
						{
							<div className="col-lg-8">
								<div className="JobInfoContainer">
									<div className="col-lg-12">
										<div className="col-lg-11 jobDescBlock">
											<div className="joblistDesignation">
												{this.state.jobInfo.jobBasicInfo ? this.state.jobInfo.jobBasicInfo.jobTitle : null}
											</div>
											<div className="joblistCompanyName">
												{this.state.jobInfo.company_id ? this.state.jobInfo.company_id.companyName : null}
											</div>
											<div> 
												<i className="fa fa-calendar joblistExperience"></i> &nbsp; Exp: {this.state.jobInfo.eligibility ? this.state.jobInfo.eligibility.minExperience : null}
											</div>
											<div> 
												<i className="fa fa-rupee joblistCtcSal"></i> &nbsp; <i className="fa fa-inr"></i> {this.state.jobInfo.ctcOffered ? this.state.jobInfo.ctcOffered.minSalary : null} {this.state.jobInfo.ctcOffered ? this.state.jobInfo.ctcOffered.minSalPeriod : null} - <i className="fa fa-inr"></i> {this.state.jobInfo.ctcOffered ? this.state.jobInfo.ctcOffered.maxSalary : null} {this.state.jobInfo.ctcOffered ? this.state.jobInfo.ctcOffered.maxSalPeriod : null}
											</div>
											<div>
												<i className="fa fa-map-marker joblistLocation"></i> &nbsp; {this.state.jobInfo.location ? this.state.jobInfo.location.address : null}
											</div>
											<div>
												<i className="fa fa-users joblistNumPositions"></i> &nbsp; No. of positions : {this.state.jobInfo.jobBasicInfo ? this.state.jobInfo.jobBasicInfo.positions : null}
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
						                       	tableName 		=	{"Candidates"}
                                        />
			                       	</div>
									:
									<div className="col-lg-12">
										
									</div>
								}
								
								{ this.state.view === 'Grid' ?
									
									<div className="container-fluid  candidateList col-lg-12">
										{

											this.props.candidateList
											? 	
											this.props.candidateList.map((elem,index)=>{
												var primarySkills   = [];
												var secondarySkills = [];
												if (elem.candidate_id.skills) {
													elem.candidate_id.skills.map((skill,ind)=>{
														if (skill.skillType == "primary") { primarySkills.push(skill) }
					 									if (skill.skillType == "secondary") { secondarySkills.push(skill) }
													})
												}

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
																										<a href={"/candidate-profile/"+elem.candidate_id}> {elem.candidate_id.basicInfo.firstName} </a>
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
																										<div className="postName">{elem.candidate_id.workExperience[elem.candidate_id.workExperience.length-1] ? elem.candidate_id.workExperience[elem.candidate_id.workExperience.length-1].lastDegn : null}</div> 
																										<div className="postName">{elem.candidate_id.workExperience[elem.candidate_id.workExperience.length-1] ? elem.candidate_id.workExperience[elem.candidate_id.workExperience.length-1].department : null} </div>
																										<div className="postName">{ elem.candidate_id.totalExperience ? elem.candidate_id.totalExperience +" years" : "Fresher" }</div>
																										<div className="postName">{elem.candidate_id.workExperience[elem.candidate_id.workExperience.length-1] ? elem.candidate_id.workExperience[elem.candidate_id.workExperience.length-1].district : null} </div>
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

																					{ primarySkills.length > 0 ?	
																					<div className=" marginForSkillHeading">
																						<div className=" skillsSubHeadingWrapper">	
																							{
																								primarySkills.map((elem,index)=>{
																									return(
																											<div className="col-lg-6" key={index}>
																												<div className="row skillsSubHeading">
																													<i className="fa fa-square rotate45 listRoatate45" ></i>
																														{elem.skill_id.skill}
																												</div>
																											</div>
																										);
																								})
																							}																							
																						</div>
																					</div>
																					: <div className="skillsSubHeading">No primary skills added</div>
																					}
																				</div>
																				<div className="skillsHeadingBlock">
																					<div className="skillsHeading">	
																						Secondary skills
																					</div>
																					{   secondarySkills.length > 0	?
																					<div className=" skillsSubHeadingWrapper">	
																						{
																							secondarySkills.map((elem,index)=>{
																								return(
																										<div className="col-lg-6" key={index}>
																											<div className="row skillsSubHeading">
																												<i className="fa fa-square rotate45 listRoatate45" ></i>
																													{elem.secondarySkills[index]}
																											</div>
																										</div>
																									);
																							})
																							
																						}
																					</div>: <div className="skillsSubHeading">No secondary skills added</div>
																					}
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
																							{elem.candidate_id.currentCTC ? elem.candidate_id.currentCTC : null} LPA
																						</div>
																						
																					</div>
																					<div className="col-lg-4 salaryBlock ">
																						<div className="row expectSalaryBlockHeading">
																							Expected CTC
																						</div>
																						<div className="row expectSalaryBlockSubHeading">
																							{elem.candidate_id.expectedCTC ? elem.candidate_id.expectedCTC : null} LPA
																						</div>
																						
																					</div>
																					<div className="col-lg-4 salaryBlock2 ">
																						<div className="row expectSalaryBlockHeading">
																							Notice Period
																						</div>
																						<div className="row expectSalaryBlockSubHeading">
																							{elem.candidate_id.noticePeriod ? elem.candidate_id.noticePeriod : null}
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
