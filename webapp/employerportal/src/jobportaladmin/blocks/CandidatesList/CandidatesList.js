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
import './CandidatesList.css';

class CandidatesList extends Component{ 

	constructor(props){
		super(props);
		
		this.state={
			dataArry            : 	[],
			skillsArry          : 	[], 	
			candidateSelector   : 	{},
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
		
		var {mapAction}  = this.props;
		//mapAction.filterCandidatesApplied(this.state.candidateSelector)	
		
	}
	
	getData(){
		var tableData = this.props.candidateList.map((a, i)=>{
			console.log(a)
		var addressDetails = a.address.map((l,i)=>{
			return "<ul className='nopadding'><li><b>"+l.addressType.addressType+ " Address</b>: "+l.address+"</li></ul>"
		})
		var academicsData = a.academics.map((c,i)=>{
			return "<ul className='nopadding'><li>"+c.qualificationlevel_id.qualificationLevel+" "+c.qualification_id.qualification+", "+(c.university_id.university)+" " + c.collegeSchool+" "+c.state+" " +c.country+"</li></ul>"
		})
		var workExperience = a.workExperience.map((c,i)=>{
			return "<ul className='nopadding'><li>"+c.lastDegn+" "+c.company_id.companyName+" "+c.city+ ", "+c.state+" " + c.country+ "</li></ul>"
		})
        return{
            name 	: a.basicInfo.firstName + " "+a.basicInfo.lastName,
            gender  : a.basicInfo.gender,
            contactDetails:"<b>Email : </b>"+a.contact.emailId+"<br><b>Mobile No. : </b>"+a.contact.mobile,
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

			<div className="container-fluid  candidateList col-lg-12">
										{

											this.props.candidateList
											? 	
											this.props.candidateList.map((elem,index)=>{
												console.log(elem)
												var primarySkills   = [];
												var secondarySkills = [];
												if (elem.skills) {
													elem.skills.map((skill,ind)=>{
														if (skill.skillType == "primary") { primarySkills.push(skill) }
					 									if (skill.skillType == "secondary") { secondarySkills.push(skill) }
													})
												}

												return(
														<div className="col-lg-6 " key={index}>
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
																										<a href={"/candidate-profile/"+elem._id}> {elem.basicInfo.firstName} </a>
																									<span className="candidateIdNumber"></span>
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
																										<div className="postName">{elem.workExperience[elem.workExperience.length-1] ? elem.workExperience[elem.workExperience.length-1].lastDegn : null}</div> 
																										<div className="postName">{elem.workExperience[elem.workExperience.length-1] ? elem.workExperience[elem.workExperience.length-1].department : null} </div>
																										<div className="postName">{elem.totalExperience ? elem.totalExperience +" years" : "Fresher" }</div>
																										<div className="postName">{elem.address[elem.address.length-1] ? elem.address[elem.address.length-1].district + ", "+elem.address[elem.address.length-1].state : null} </div>
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
																							{elem.currentCTC ? elem.currentCTC : null} LPA
																						</div>
																						
																					</div>
																					<div className="col-lg-4 salaryBlock ">
																						<div className="row expectSalaryBlockHeading">
																							Expected CTC
																						</div>
																						<div className="row expectSalaryBlockSubHeading">
																							{elem.expectedCTC ? elem.expectedCTC : null} LPA
																						</div>
																						
																					</div>
																					<div className="col-lg-4 salaryBlock2 ">
																						<div className="row expectSalaryBlockHeading">
																							Notice Period
																						</div>
																						<div className="row expectSalaryBlockSubHeading">
																							{elem.noticePeriod ? elem.noticePeriod : null}
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



		);
	}
}

const mapStateToProps = (state)=>{
    return {
        candidateSelector   		: state.candidateSelector,
        candidateList 		: state.candidateList 
    }
}
const mapDispatchToProps = (dispatch) => ({
  mapAction :  bindActionCreators(mapActionCreator, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps) (CandidatesList);