import React,{Component} 	  from 'react';
import Axios 			 	  from 'axios';
import Swal 			 	  from 'sweetalert2';
import Moment                 from 'moment';
import { Route, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } 	  from '@fortawesome/react-fontawesome';
import { connect }        	  from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../Common/actions/index';
import $                      from 'jquery';
import IAssureTable 		  from '../../../coreadmin/IAssureTable/IAssureTable.jsx';
import './Candidatelist.css';

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
		console.log("this.props",this.props)
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
    edit(event) {
		event.preventDefault();
		var id = event.target.id;

		this.props.history.push("/candidate/basic-info/"+id); 
	}
	delete(event){
		event.preventDefault();
		var candidate_id = event.target.getAttribute('id')
		var user_id = event.target.getAttribute('data-userid')

		console.log(candidate_id)
		console.log(user_id)
		
		Swal.fire({
			title : 'Are you sure, do you want to delete this candidate ?',
			text : 'You will not be able to recover this Address details',
			icon : 'warning',
			showCancelButton : true,
			confirmButtonText : 'Delete',
			cancelButtonColor : 'Cancel',
			confirmButtonColor : '#d33',
	
	  	}).then((result) =>{
			if(result.value){
				Axios.delete("/api/candidatemaster/delete/"+candidate_id)
				.then(response =>{
						if(response.data.deleted===true){
							Axios.delete("/api/users/delete/"+user_id)
							.then(response =>{
								if (response.data.message=="USER_DELETED") {

									var {mapAction} = this.props;
      								mapAction.filterCandidates(this.props.candidateSelector);
      								Swal.fire(
										'Deleted!',
										'Candidate details has been deleted successfully!',
										'success'
									);

								}else{

								}
								
							})

							
							
						}
				})
				.catch(error=>{
					
					Swal.fire(
								"Some problem occured deleting candidate details!",
								error.message,
								'error'
						)
				})
			}
		})

	}
	render(){
		
		return(

			<div className="container-fluid  candidateList col-lg-12">
										{

											this.props.candidateList.length > 0
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
																									<div className="col-lg-8 nopadding">	<a href={"/candidate-profile/"+elem._id}> {elem.basicInfo.firstName +" ("+ elem.candidateID +")"} </a>
																									<span className="candidateIdNumber"></span></div>
																									<div className="col-lg-4 NOpadding-left text-right"><span>
																									<i className="fa fa-pencil" title="Edit" id={elem._id} onClick={this.edit.bind(this)}></i>
																									&nbsp;<i className={"fa fa-trash redFont " + elem._id} id={elem._id} data-userid = {elem.user_id}  onClick={this.delete.bind(this)}></i></span></div>
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
																				<div className="col-lg-12">
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
																				<div className="col-lg-12">
																					<div className="skillsHeading">	
																						Secondary skills
																					</div>
																					{   secondarySkills.length > 0	?
																					<div className=" skillsSubHeadingWrapper">	
																						{
																							secondarySkills.map((elem,index)=>{
																								console.log(elem)
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
											<h3 style={{marginTop:"100px"}}>No Candidates available</h3>
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

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(CandidatesList));