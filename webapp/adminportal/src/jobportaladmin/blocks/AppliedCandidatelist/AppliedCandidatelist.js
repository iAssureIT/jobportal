import React,{Component} 	  from 'react';
import Axios 			 	  from 'axios';
import { withRouter }	 	    from 'react-router-dom';
import Swal 			 	  from 'sweetalert2';
import Moment                 from 'moment';
import { FontAwesomeIcon } 	  from '@fortawesome/react-fontawesome';
import { connect }        	  from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../Common/actions/index';
import $                      from 'jquery';
import IAssureTable 		  from '../../../coreadmin/IAssureTable/IAssureTable.jsx';
import './AppliedCandidatelist.css';

class AppliedCandidatelist extends Component{ 
	constructor(props){
		super(props);
		
		this.state={
			dataArry            : 	[],
			skillsArry          : 	[],
			jobInfo 		    : 	[], 	
			appliedCandidateSelector   : 	{ "job_id" :  this.props.job_id },
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
		console.log(",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,",this.props);
		var {mapAction}  = this.props;
		mapAction.filterCandidatesApplied(this.state.appliedCandidateSelector)	
		
		// get single job information by job_id
		Axios.get("/api/jobs/get/one/"+this.props.job_id)
		.then(response=>{
			this.setState({jobInfo : response.data})
		})
		.catch(err=>{

		})

		  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
        const token = userDetails.token;
        Axios.defaults.headers.common['Authorization'] = 'Bearer '+ token;
	}
	
	getData(){
		var tableData = this.props.appliedCandidateList.map((a, i)=>{
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

    redirectTo(job_id, url, parameter){
		console.log(url)
		console.log(parameter)

		var {mapAction}  = this.props;

		var appliedCandidateSelector = {};

		if (this.props.match.path== "/applied-candidate-list/:job_id") {
			appliedCandidateSelector.job_id = job_id
			mapAction.filterCandidatesApplied(appliedCandidateSelector)
		}
		else if (url== "state") {
			appliedCandidateSelector.job_id = job_id
			appliedCandidateSelector.stateCode = parameter
			mapAction.filterCandidatesApplied(appliedCandidateSelector)
		}
		else if (url== "district") {
			appliedCandidateSelector.job_id = job_id
			appliedCandidateSelector.district = parameter
			mapAction.filterCandidatesApplied(appliedCandidateSelector)
		}	
		else if (url== "gender") {
			appliedCandidateSelector.job_id = job_id
			appliedCandidateSelector.gender = parameter
			mapAction.filterCandidatesApplied(appliedCandidateSelector)
		}
		else if (url== "experience") {
			appliedCandidateSelector.job_id = job_id
			appliedCandidateSelector.experience = parameter
			mapAction.filterCandidatesApplied(appliedCandidateSelector)
		}
		this.props.history.push("/applied-candidate-list/"+job_id+"/"+url+"/"+parameter)
	}
	deleteJob = (event)=>{
	event.preventDefault();
	const job_id = this.state.job_id;

	if(job_id){
        Axios.delete("/api/jobs/delete/"+job_id)
        .then(response =>{
          if(response.data.message==="Job details deleted Successfully!"){
            this.props.history.push('job-list')
            /*this.changeStatus();*/
          }
        })
        .catch(error=>{
        	if(error.message === "Request failed with status code 401"){
	          var userDetails =  localStorage.removeItem("userDetails");
	          localStorage.clear();
	          Swal.fire({title  : ' ',
	                    html    : "Your session is expired! You need to login again. "+"<br>"+" Click OK to go to Login Page",
	                    text    :  "" })
	              .then(okay => {
	                if (okay) {
	                  window.location.href = "/login";
	                }
	              });
	        }else{
                Swal.fire("", "Error!", "");
            }
        })
      }

	}
	render(){
		console.log("/////////////",this.props.jobInfo)
		return(	
				<div className="candidateListWrapperMain">
					<div className="col-lg-12 candidateListWrapper">
						{
								<div className="col-lg-8">
							<div className="jobListContainer">
								{this.props.jobInfo ?
								<div className="col-lg-12">
									
									<div className="col-lg-11 jobListLeftContent">
										<div className="row">
											<div className="leftSideMainBox col-lg-12">
												<div className="col-lg-6 leftSideBox">
													<div className="iconsBar">
														{/*<FontAwesomeIcon className="restRoomIcon" icon={['fas', 'restroom']} />*/}
														<ul>
															{
																this.props.jobInfo.jobBasicInfo.gender=="Male Only"?
																<li><i className="fa fa-male" title="Only male candidates can apply"></i></li>
																: this.props.jobInfo.jobBasicInfo.gender=="Female Only"?
																<li><i className="fa fa-female" title="Only female candidates can apply"></i></li> 
																: <li><i className="fa fa-male" title="male & female candidates both can apply"></i><i className="fa fa-female bothIcon" title="male & female candidates both can apply"></i></li>
															}
															{	 
																this.props.jobInfo.jobBasicInfo.jobshift_id ? 
																this.props.jobInfo.jobBasicInfo.jobshift_id.jobShift=="Day Shift" ?
																<li><i className="fa fa-sun-o" title="Day Shift"></i></li>
																: this.props.jobInfo.jobBasicInfo.jobshift_id.jobShift=="Night Shift"?
																<li><i className="fa fa-moon-o" title="Night Shift"></i></li> 
																: <li><i className="fa fa-repeat" title="Rotational shift"></i></li> 
																:
																<li><i className="fa fa-sun-o" title="Day Shift"></i></li>	
															}	
															{	
																this.props.jobInfo.jobBasicInfo.jobtime_id.jobTime=="Full Time"?
																<li><i className="fa fa-clock-o" title="Full Time"></i></li>
																: this.props.jobInfo.jobBasicInfo.jobtime_id.jobTime=="Part Time" ? <li><i className="fa fa-hourglass-start" title="Part Time"></i></li>
																: this.props.jobInfo.jobBasicInfo.jobtime_id.jobTime=="Hourly Basis"? 
																<li><i className="fa fa-hourglass-o" title="Hourly Basis"></i></li> 
																: <li><i className="fa fa-hourglass-o" title="Hourly Basis"></i></li> 
															}	
														</ul>
													</div>	
													<div className="infoLog"> {Moment(this.props.jobInfo.createdAt).startOf('seconds').fromNow()}  </div>
													<div className="jobListDesignation col-lg-12 row">
														<a className="link" href={"/job-profile/" +  this.props.jobInfo._id}>{this.props.jobInfo.jobBasicInfo.jobTitle + " (" +this.props.jobInfo.jobID+ ")"} </a>
													</div>
													<div className="jobListCompanyTitle col-lg-12 row">
														{this.props.jobInfo.company_id ? this.props.jobInfo.company_id.companyName : ""}
													</div>
													<div className="jobListExperienceTitle col-lg-12 row"> 
														<i className="fa fa-calendar jobListExperience"></i> &nbsp; Exp&nbsp;:&nbsp;{this.props.jobInfo.eligibility.minExperience} years
													</div>
													<div className="jobListCtcSalTitle col-lg-12 row"> 
														<i className="fa fa-rupee jobListCtcSal"></i> &nbsp; <i className="fa fa-inr"></i> {this.props.jobInfo.ctcOffered.minSalary} {this.props.jobInfo.ctcOffered.minSalPeriod}&nbsp;&nbsp;-&nbsp;&nbsp;<i className="fa fa-inr"></i> {this.props.jobInfo.ctcOffered.maxSalary} {this.props.jobInfo.ctcOffered.maxSalPeriod}
													</div>
													<div className="joblistLocationInfo col-lg-12 row">
														<i className="fa fa-map-marker jobListLocation"></i> &nbsp; {this.props.jobInfo.location.address + " " + this.props.jobInfo.location.district + ", " + this.props.jobInfo.location.state + ", " +this.props.jobInfo.location.country}
													</div>
													<div className="jobListNumPositionsTitle col-lg-12 row"> 
														<i className="fa fa-users jobListNumPositions"></i> &nbsp; No. of positions : {this.props.jobInfo.jobBasicInfo.positions}
													</div>
												</div>
												<div className="col-lg-6 rightSideBox">
													<div className="joblistNoCount col-lg-12"> 
														&nbsp; <a href={"/applied-candidate-list/" + this.props.jobInfo._id}> Candidates Applied : {	this.props.jobInfo.applicantStatistics.total ? this.props.jobInfo.applicantStatistics.total  :  0}</a> 
													</div> 
													<div className="tierOneRow col-lg-12 "> 
														<div className="col-lg-4 react1 row" onClick={this.redirectTo.bind(this,this.props.jobInfo._id, 'district',this.props.jobInfo.location.district)}>{this.props.jobInfo.location.district}<br /><span className="multiCount">{this.props.jobInfo.applicantStatistics.district}</span></div>
														<div className="col-lg-4 react2 row" onClick={this.redirectTo.bind(this,this.props.jobInfo._id, 'state',this.props.jobInfo.location.stateCode)}>Rest of {this.props.jobInfo.location.state}<br /><span className="multiCount">{this.props.jobInfo.applicantStatistics.state ? ( this.props.jobInfo.applicantStatistics.state - this.props.jobInfo.applicantStatistics.district ) : 0 } </span></div>
														<div className="col-lg-4 react3 row" onClick={this.redirectTo.bind(this,this.props.jobInfo._id, 'country',this.props.jobInfo.location.countryCode)}>Rest of {this.props.jobInfo.location.country}<br /><span className="multiCount">{this.props.jobInfo.applicantStatistics.country ? ( this.props.jobInfo.applicantStatistics.country - this.props.jobInfo.applicantStatistics.state ) : 0}</span></div> 
													</div>
													<div className="tierOneRow col-lg-12 "> 
														<div className="col-lg-4 react1 row" onClick={this.redirectTo.bind(this,this.props.jobInfo._id, 'gender','male')}>Male<br /><span className="multiCount"></span>{this.props.jobInfo.applicantStatistics.male  ? this.props.jobInfo.applicantStatistics.male : 0}</div>
														<div className="col-lg-4 react2 row" onClick={this.redirectTo.bind(this,this.props.jobInfo._id, 'gender','female')}>Female<br /><span className="multiCount">{this.props.jobInfo.applicantStatistics.female  ? this.props.jobInfo.applicantStatistics.female : 0 }</span></div>
														<div className="col-lg-4 react3 row" onClick={this.redirectTo.bind(this,this.props.jobInfo._id, 'gender','transgender')}>Other<br /><span className="multiCount"> {this.props.jobInfo.applicantStatistics.other  ? this.props.jobInfo.applicantStatistics.other : 0 }</span></div> 
													</div>
													<div className="tierOneRow col-lg-12 "> 
														<div className="col-lg-4 react1 row" onClick={this.redirectTo.bind(this,this.props.jobInfo._id, 'experience','0to2')}>Exp&nbsp;:&nbsp;0 To 2<br /><span className="multiCount">{this.props.jobInfo.applicantStatistics.exp0to2  ? this.props.jobInfo.applicantStatistics.exp0to2 : 0}</span></div>
														<div className="col-lg-4 react2 row" onClick={this.redirectTo.bind(this,this.props.jobInfo._id, 'experience','2to6')}>Exp&nbsp;:&nbsp;2 To 6<br /><span className="multiCount">{this.props.jobInfo.applicantStatistics.exp2to6 ? this.props.jobInfo.applicantStatistics.exp2to6 : 0}</span></div>
														<div className="col-lg-4 react3 row" onClick={this.redirectTo.bind(this,this.props.jobInfo._id, 'experience','6to10')}>Exp&nbsp;:&nbsp;6 To 10<br /><span className="multiCount">{this.props.jobInfo.applicantStatistics.exp6to10 ? this.props.jobInfo.applicantStatistics.exp6to10 : 0}</span></div> 
													</div> 
												</div>
											</div>
										</div>			
									</div>
									<div className="col-lg-1 jobListRightContent">
										<div className="row">
											<div className="col-lg-12">
												{/*<div className="input-group jobStatusToggleWrapper">
													<div className = {this.state.isActive ? "genderFeild genderFeildVerti genderFeildActive" : "genderFeild genderFeildVerti" }
													 id={elem._id} name="primaryToggel" data-toggle="modal" data-target="#inactiveModal" data-dismiss="modal" onClick={() => {this.setState({job_id:elem._id})}} id = {elem._id}
													 value="togglePrimary" title="Inactive"
													 //onClick={this.handleSwitch.bind(this)} 
													 >
													</div>
													<div className = {!this.state.isActive ? "genderFeild genderFeildVerti genderFeildInActive" : "genderFeild genderFeildVerti" }
													 id={elem._id} name="primaryToggel" data-toggle="modal" data-target="#inactiveModal" data-dismiss="modal" onClick={() => {this.setState({job_id:elem._id})}} id = {elem._id}
													 value="togglePrimary" title="Inactive">
														
													</div>
												</div>	*/}
												<div className="listEditBtn">
													<a title = "Edit" href={"/post-job/" + this.props.jobInfo._id}><i className="fa fa-edit"></i></a>
												</div>	
												<div className="listViewBtn">	
													<a title = "View" href={"/job-profile/" + this.props.jobInfo._id}><i className="fa fa-eye"></i></a>
												</div>
												
												<div className="listDelBtn">	
													<i title = "Delete" className="fa fa-trash" data-toggle="modal" data-target="#delModal" data-dismiss="modal" onClick={() => {this.setState({job_id:this.props.jobInfo._id})}} id = {this.props.jobInfo._id}></i>
												</div>

												
											</div>
										</div>
									</div>
									
								</div>
								: null }	
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

											this.props.appliedCandidateList
											? 	
											this.props.appliedCandidateList.map((elem,index)=>{
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
																										<div className="postName">{elem.candidate_id.address[elem.candidate_id.address.length-1] ? elem.candidate_id.address[elem.candidate_id.address.length-1].district + ", "+elem.candidate_id.address[elem.candidate_id.address.length-1].state : null} </div>
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
        appliedCandidateSelector   		: state.appliedCandidateSelector,
        appliedCandidateList 		: state.appliedCandidateList 
    }
}
const mapDispatchToProps = (dispatch) => ({
  mapAction :  bindActionCreators(mapActionCreator, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(AppliedCandidatelist));
