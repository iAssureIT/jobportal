import React, {Component}   from 'react';
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome';
import Axios 				from 'axios';
import Swal 				from 'sweetalert2';
import { Multiselect } from 'multiselect-react-dropdown';

import './JobPosting.css';


export default class JobPosting extends Component{
	constructor(props){
		super(props);

		this.state = {
			jobTitle 			: "",
			jobLocation 		: "",
			country 			: "",
			industryId			: "",
			functionalAreaId 	: "",
			subFunctionalAreaId : "",
			role 				: "",
			workFromHome 		: "",
			contactPerson 		: "",
			email 				: "",
			phone 				: "",
			jobType 			: "",
			jobTime 			: "",
			lastDateOfAppl 		: "",
			minSalary 			: "",
			minSalPeriod 		: "",
			maxSalary 			: "",
			maxSalPeriod		: "",
			jobDesc 			: "",
			minEducation 		: "",
			minExperience 		: "",
			priSkillsArray 		: [], 
			secSkillsArray 		: [], 
			otherSkillsArray 	: [], 
			preferSkillsArray 	: [],
			functionalArealist 	: [],
			priSkillsArraylist 	: [],
			secSkillsArraylist 	: [],
			otherSkillsArraylist: [],
			preferSkillsArraylist: [],
			jobTypeArray		: [],
		      
		}

		 this.style =  {
					      chips: {
					        color: "white"
					      },
					      searchBox: {
					        border: "1px solid #D3950A",
					      },
					      multiselectContainer: {
					      	backgroundColor: "#242931",
					        color: "white",
					      }
   			 		    };

			}
	componentDidMount(){
		Axios.get("http://qajobportalapi.iassureit.com/api/functionalareamaster/get/list")
			.then(response => {
				console.log("getfunctionalAreaData response.data = ",response.data);
				this.setState({functionalArealist : response.data});
				console.log("functionalArea",this.state.functionalArealist);
			})
			.catch(error=>{
				Swal.fire("Error while getting List data",error.message,'error');
			})	
		Axios.get("http://qajobportalapi.iassureit.com/api/jobtypemaster/get/list")
			.then(response => {
				console.log("getfunctionalAreaData response.data = ",response.data);
				this.setState({jobTypeArray : response.data});
				console.log("jobTypeArray",this.state.jobTypeArray);
			})
			.catch(error=>{
				Swal.fire("Error while getting List data",error.message,'error');
			})	
		Axios.get("http://qajobportalapi.iassureit.com/api/skillmaster/get/list")
			.then(response => {
				console.log("getfunctionalAreaData response.data = ",response.data);
				this.setState({priSkillsArraylist : response.data});
				console.log("priSkill",this.state.priSkillsArraylist);
				this.state.priSkillsArraylist!=null && this.state.priSkillsArraylist.length > 0 
				?
					this.state.priSkillsArraylist.map((elem,index)=>{
						
						this.state.priSkillsArray.push(elem.skill);
						
					})
				:
					this.state.priSkillsArray.push("select");
			})
			.catch(error=>{
				Swal.fire("Error while getting priSkillsArraylist List data",error.message,'error');
			})
			
		Axios.get("http://qajobportalapi.iassureit.com/api/skillmaster/get/list")
			.then(response => {
				console.log("getfunctionalAreaData response.data = ",response.data);
				this.setState({secSkillsArraylist : response.data});
				console.log("secSkill",this.state.secSkillsArraylist);
				this.state.secSkillsArraylist!=null && this.state.secSkillsArraylist.length > 0 
				?
					this.state.secSkillsArraylist.map((elem,index)=>{
						
						this.state.secSkillsArray.push(elem.skill);
						
					})
				:
					this.state.secSkillsArray.push("select");
			})
			.catch(error=>{
				Swal.fire("Error while getting secSkillsArraylist List data",error.message,'error');
			})
		Axios.get("http://qajobportalapi.iassureit.com/api/skillmaster/get/list")
			.then(response => {
				console.log("getfunctionalAreaData response.data = ",response.data);
				this.setState({otherSkillsArraylist : response.data});
				console.log("otherSkill",this.state.otherSkillsArraylist);
				this.state.otherSkillsArraylist!=null && this.state.otherSkillsArraylist.length > 0 
				?
					this.state.otherSkillsArraylist.map((elem,index)=>{
						
						this.state.otherSkillsArray.push(elem.skill);
						
					})
				:
					this.state.otherSkillsArray.push("select");
			})
			.catch(error=>{
				Swal.fire("Error while getting otherSkillsArraylist List data",error.message,'error');
			})
		Axios.get("http://qajobportalapi.iassureit.com/api/skillmaster/get/list")
			.then(response => {
				console.log("getfunctionalAreaData response.data = ",response.data);
				this.setState({preferSkillsArraylist : response.data});
				console.log("preferSkills",this.state.preferSkillsArraylist);
				this.state.preferSkillsArraylist!=null && this.state.preferSkillsArraylist.length > 0 
				?
					this.state.preferSkillsArraylist.map((elem,index)=>{
						
						this.state.preferSkillsArray.push(elem.skill);
						
					})
				:
					this.state.preferSkillsArray.push("select");
			})
			.catch(error=>{
				Swal.fire("Error while getting preferSkillsArraylist List data",error.message,'error');
			})
				
	}
	handleChange = (event)=>{
		var name = event.currentTarget.name;
		var value = event.currentTarget.value;
		this.setState({ [name] : value});
	}
	
	handleSubmit = (event)=>{
		event.preventDefault();

		var formValues = {
			jobTitle 			: this.state.jobTitle,
			jobLocationCity		: this.state.jobLocation,
			jobLocationCountry 	: this.state.country,
			functionalArea 		: this.state.functionalArea,
			role 				: this.state.role,
			workFromHome 		: this.state.workFromHome,
			contactPerson 		: this.state.contactPerson,
			email 				: this.state.email,
			phone 				: this.state.phone,
			jobType 			: this.state.jobType,
			jobTime 			: this.state.jobTime,
			lastDateOfAppl 		: this.state.lastDateOfAppl,
			minCTC 				: this.state.maxSalary,
			minSalPeriod 		: this.state.minSalPeriod,
			maxCTC 				: this.state.maxSalary,
			maxSalPeriod 		: this.state.maxSalPeriod,
			jobDesc 			: this.state.jobDesc,
			minEducation 		: this.state.minEducation,
			minExperience 		: this.state.minExperience,	
		};
		
		console.log("Inside handleSubmit",formValues);
		Axios.post("/api/jobposting/post",formValues)
				.then(response => {
					console.log("Inside axios",response.data.message);
					if(response.data.message==="Job details Inserted Successfully"){
						console.log("response.data = ",response.data);
						let job_id = response.data._id;

						Swal.fire("Congrats","Your Data is Submitted Successfully","success");
						this.setState({
										jobTitle 		: "",
										jobLocation 	: "",
										country 		: "",
										functionalArea 	: "",
										role 			: "",
										workFromHome 	: "",
										contactPerson 	: "",
										email 			: "",
										phone 			: "",
										jobType 		: "",
										jobTime 		: "",
										lastDateOfAppl 	: "",
										minSalary 		: "",
										minSalPeriod 	: "",
										maxSalary 		: "",
										maxSalPeriod	: "",
										jobDesc 		: "",
										minEducation 	: "",
										minExperience 	: "",
									  });
						this.props.history.push("/job-profile/"+job_id);
					}
				})
				.catch(error =>{
					Swal.fire("Submit Error!",error.message,'error');
				})		
	}
	
	render(){
		 
		 const { /*funAreaArray, jobTypeArray, jobTimeArray, countryArray, minSalArray, maxSalArray,*/  secSkillsArray, otherSkillsArray, preferSkillsArray } = this.state;
				
		return(
			<div className="pageWrapper backgroundColor container-fluid">
				<div className="row">
					<div className="col-lg-10 col-lg-offset-1 pageWrapperBorder borderColor mainForm">
						<div className="row">
							<div className="col-lg-12">
								<div className="row">
									<div className="addJobFormSection">
										<div className="addJobFormHeading">
											Post A Job
										</div>
										<hr className="addJobFormHr"/>
										<div className="addJobMainHead">
											<i className="fa fa-info"></i> 
											<span className="labelLeftPadding">Basic Info</span>
										</div>
										<form id="addJob">
											<div className="col-lg-12 addJobFieldRow text-left">
												<div className="row">
													<div className="col-lg-6">
														<label htmlFor="jobTitle" className="addjobformLable"> Job title </label>
														<div className="input-group">
															<span className="input-group-addon addJobFormField"><i className="fa fa-briefcase"></i> </span> 
															<input type="text" className="form-control addJobFormField" name="jobTitle" id="jobTitle" value={this.state.jobTitle} onChange={this.handleChange}/>
														</div>
														<span id="jobTitleError" className="errorMsg"></span>
													</div>
													<div className="col-lg-6">
														<div className="row row-no-gutters">
															<div className="col-lg-8">
																<label htmlFor="jobLocation" className="addjobformLable"> Job Location </label>
																<div className="input-group">
																	<span className="input-group-addon addJobFormField"><FontAwesomeIcon className="locationIcon" icon={['fas', 'map-marker-alt']} /></span> 
																	<input type="text" className="form-control addJobFormField" name="jobLocation" id="jobLocation" value={this.state.jobLocation} onChange={this.handleChange}/>
																</div>
																<span id="jobLocationError" className="errorMsg"></span>
															</div>
															<div className="col-lg-4">
																<label htmlFor="country" className="addjobformLable"> Country </label>
																<select name="jobTitle" className="country form-control addJobFormField" id="jobTitle" value={this.state.country} onChange={this.handleChange}>
															      <option> --Select-- </option>
															      <option> India 	  </option>
															      <option> USA 		  </option>
															      <option> UK 		  </option>
															      <option> Sweeden 	  </option>
															      <option> Germany 	  </option>
															    </select>
															    {/*<Multiselect 
														            options={countryArray}
														            displayValue="key"
														            singleSelect
														            style={this.style}
													        	/>*/}
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="form-group col-lg-12 addJobFieldRow text-left">
												<div className="row">
													<div className="col-lg-6">
														<label htmlFor="functionalArea" className="addjobformLable"> Fuctional Area </label>
														<div className="input-group">
															<span className="input-group-addon addJobFormField"><i className="fa fa-briefcase"></i></span> 
															<select name="functionalArea" className="form-control addJobFormField" id="functionalArea" value={this.state.functionalArea} onChange={this.handleChange}> {/*value={this.state.country} onChange={this.handleChange}*/}
														    	{/*<option> --Select-- 									</option>
														    	<option> IT 											</option>
														    	<option> Engineering - Mechanical/Automotive/Industrial </option>
														    	<option> Engineering - Environmental/Health/Safety	    </option>
														    	<option> Manufacturing/Engineering/R&D 				    </option>
														    	<option> Analytics/Business Intelligence*/}	
														    	{
																	this.state.functionalArealist!=null && this.state.functionalArealist.length > 0 
																	?
																		this.state.functionalArealist.map((elem,index)=>{
																			return(
																				
																				<option> {elem.functionalArea} </option>
																			);
																		})
																	:
																		<option> select </option>
																}		   
															</select>
															{/*<Multiselect 
													            options={funAreaArray}
													            displayValue="key"
													            singleSelect
													            style={this.style}
													        />*/}
														</div>
													</div>
													<div className="col-lg-6">
														<label htmlFor="Role" className="addjobformLable"> Role </label>
														<div className="input-group">
															<span className="input-group-addon addJobFormField"><FontAwesomeIcon icon={['fas', 'briefcase']} /></span> 
															<input type="text" className="form-control addJobFormField" name="role" id="role" value={this.state.role} onChange={this.handleChange}/>
														</div>
														<span id="roleError" className="errorMsg"></span>
													</div>
												</div>
											</div>
											<div className="col-lg-12 text-left">
												<label className="containerWfh">Work From Home
		                                            <input type="checkbox" name="workFromHome" id="workFromHome" value={this.state.workFromHome} onChange={this.handleChange} />
		                                            <span className="checkmark2"></span>
                                        		</label>
											</div>
											<div className="col-lg-12 addJobFieldRow text-left">
												<div className="row">
													<div className="col-lg-4">
														<label htmlFor="contactPerson" className="addjobformLable"> Contact Person </label>
														<div className="input-group">
															<span className="input-group-addon addJobFormField"><i className="fa fa-user"></i></span> 
															<input type="text" className="form-control addJobFormField" name="contactPerson" id="contactPerson" value={this.state.contactPerson} onChange={this.handleChange}/>
														</div>
														<span id="contactPersonError" className="errorMsg"></span>
													</div>
													<div className="col-lg-4">
														<label htmlFor="email" className="addjobformLable"> Email </label>
														<div className="input-group">
															<span className="input-group-addon addJobFormField"><i className="fa fa-envelope-o"></i></span> 
															<input type="text" className="form-control addJobFormField" name="email" id="email" value={this.state.email} onChange={this.handleChange}/>
														</div>
														<span id="emailError" className="errorMsg"></span>
													</div>
													<div className="col-lg-4">
														<label htmlFor="phone" className="addjobformLable"> Phone Number </label>
														<div className="input-group">
															<span className="input-group-addon addJobFormField"><i className="fa fa-phone"></i> </span> 
															<input type="text" className="form-control addJobFormField" name="phone" id="phone" value={this.state.phone} onChange={this.handleChange}/>
														</div>
														<span id="phoneError" className="errorMsg"></span>
													</div>
												</div>
											</div>
											<div className="col-lg-12 addJobFieldRow text-left">
												<div className="row">
													<div className="col-lg-4">
														<label htmlFor="jobType" className="addjobformLable"> Job Type </label>
														<div className="input-group col-lg-12">
															<span className="input-group-addon addJobFormField"><i className="fa fa-briefcase"></i> </span> 
															<select name="jobType" className="form-control addJobFormField" id="jobType" value={this.state.jobType} onChange={this.handleChange}>
														    	<option> --Select-- </option>
														    	{/*<option> Full Time  </option>
														    	<option> Internship </option>
														    	<option> Contract   </option>
														    	<option> Part-time  </option>
														    	<option> Temporary  </option>*/}
														    	{
																	this.state.jobTypeArray!=null && this.state.jobTypeArray.length > 0 
																	?
																		this.state.jobTypeArray.map((elem,index)=>{
																			return(
																				
																				<option> {elem.functionalArea} </option>
																			);
																		})
																	:
																		<option> select </option>
																}	
															</select>
															{/*<Multiselect 
													            options={jobTypeArray}
													            displayValue="key"
													            singleSelect
													            style={this.style}
													        />*/}
														</div>
													</div>
													<div className="col-lg-4">
														<label htmlFor="jobTime" className="addjobformLable"> Job Time </label>
														<div className="input-group">
															<span className="input-group-addon addJobFormField"><FontAwesomeIcon icon={['fas', 'business-time']} /></span> 
															<select name="jobTime" className="form-control addJobFormField" id="jobTime" value={this.state.jobTime} onChange={this.handleChange}>
														    	<option> --Select-- </option>
														    	<option> 8 to 5     </option>
														    	<option> 9 to 6     </option>
															</select>
															{/*<Multiselect 
													            options={jobTimeArray}
													            displayValue="key"
													            singleSelect
													            style={this.style}
													        />*/} 
														</div>
													</div>
													<div className="col-lg-4">
														<label htmlFor="lastDateOfAppl" className="addjobformLable"> Last Date of Application </label>
														<div className="input-group">
															<span className="input-group-addon addJobFormField"><i className="fa fa-calendar"></i> </span> 
															<input type="date" className="form-control addJobFormField" name="lastDateOfAppl" id="lastDateOfAppl" value={this.state.lastDateOfAppl} onChange={this.handleChange}/>
														</div>
													</div>
												</div>
											</div>
											<div className="col-lg-12 addJobFieldRow">
												<div className="row">
													<hr className="addJobFormHr"/>
												</div>
											</div>
											<div className="addJobSubHead">
												<i className="fa fa-inr"></i> 
												<span className="labelLeftPadding">Salary</span>
											</div>
											<div className="col-lg-12 addJobFieldRow text-left">
												<div className="row">
													<div className="col-lg-6">
														<div className="row row-no-gutters">
															<div className="col-lg-8">
																<label htmlFor="minSalary" className="addjobformLable"> Minimum Salary <i className="fa fa-inr"></i> </label>
																<div className="input-group">
																	<span className="input-group-addon addJobFormField"><i className="fa fa-money"></i> </span> 
																	<input type="text" className="form-control addJobFormField" name="minSalary" id="minSalary" value={this.state.minSalary} onChange={this.handleChange}/>
																</div>
															</div>
															<div className="col-lg-4">
																<label htmlFor="minSalPeriod" className="addjobformLable"> &nbsp; </label>
																<select className="form-control addJobFormField" name="minSalPeriod" id="minSalPeriod" value={this.state.minSalPeriod} onChange={this.handleChange}>
															      <option> --Select-- </option>
															      <option> Per Month  </option>
															      <option> Per Year   </option>
															    </select>
															    {/*<Multiselect 
														            options={minSalArray}
														            displayValue="key"
														            singleSelect
														            style={this.style}
													        	/>*/}
															</div>
														</div>
													</div>
													<div className="col-lg-6">
														<div className="row row-no-gutters">
															<div className="col-lg-8">
																<label htmlFor="maxSalary" className="addjobformLable"> Maximum Salary <i className="fa fa-inr"></i> </label>
																<div className="input-group">
																	<span className="input-group-addon addJobFormField"><i className="fa fa-money"></i> </span> 
																	<input type="text" className="form-control addJobFormField" name="maxSalary" id="maxSalary" value={this.state.maxSalary} onChange={this.handleChange}/>
																</div>
															</div>
															<div className="col-lg-4">
																<label htmlFor="maxSalPeriod" className="addjobformLable"> &nbsp; </label>
																<select className="form-control addJobFormField" name="maxSalPeriod" id="maxSalPeriod" value={this.state.maxSalPeriod} onChange={this.handleChange}>
															      <option> --Select-- </option>
															      <option> Per Month  </option>
															      <option> Per Year   </option>
															    </select>
															    {/*<Multiselect 
														            options={maxSalArray}
														            displayValue="key"
														            singleSelect
														            style={this.style}
													        	/>*/}
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="col-lg-12 addJobFieldRow">
												<div className="row">
													<hr className="addJobFormHr"/>
												</div>
											</div>
											<div className="addJobSubHead">
												<i className="fa fa-briefcase"></i>
												<span className="labelLeftPadding">Job Description</span>
											</div>
											<div className="description text-left">
												<div className="form-group">
											      <label htmlFor="jobDesc" className="addjobformLable jobDesc">Describe the responsibilities of this job, required work experience, skills, or education.</label>
											      <textarea className="form-control addJobFormField" rows="20" name="jobDesc" id="jobDesc" value={this.state.jobDesc} onChange={this.handleChange}></textarea>
											    </div>
											</div>
											<div className="col-lg-12 addJobFieldRow">
												<div className="row">
													<hr className="addJobFormHr"/>
												</div>
											</div>
											<div className="addJobSubHead">
												<i className="fa fa-book"></i>
												<span className="labelLeftPadding">Required Education & Experience</span>
											</div>
											<div className="col-lg-12 addJobFieldRow text-left">
												<div className="row">
													<div className="col-lg-6">
														<label htmlFor="minEducation" className="addjobformLable"> Minimum Education Required </label>
														<div className="input-group">
															<span className="input-group-addon addJobFormField"><i className="fa fa-graduation-cap"></i> </span> 
															<input type="text" className="form-control addJobFormField" name="minEducation" id="minEducation" value={this.state.minEducation} onChange={this.handleChange}/>
														</div>
													</div>
													<div className="col-lg-6">
														<label htmlFor="minExperience" className="addjobformLable"> Minimum Overall Experience </label>
														<div className="input-group">
															<span className="input-group-addon addJobFormField"><i className="fa fa-history"></i> </span> 
															<input type="text" className="form-control addJobFormField" name="minExperience" id="minExperience" value={this.state.minExperience} onChange={this.handleChange}/>
														</div>
													</div>
												</div>
											</div>
											<div className="col-lg-12 addJobFieldRow">
												<div className="row">
													<hr className="addJobFormHr"/>
												</div>
											</div>
											<div className="addJobSubHead">
												<i className='fa fa-cog'></i> 
												<span className="labelLeftPadding">Expected Skills</span>
											</div>
											<div className="col-lg-12 addJobFieldRow text-left">
												<div className="row">
													<div className="col-lg-8">
														<label htmlFor="primSkills" className="addjobformLable"> Primary Skills </label>
														<div className="input-group col-lg-12">
															<span className="input-group-addon addJobFormField"><i className='fa fa-cog'></i> </span> 
																<Multiselect className="form-control addJobFormField" name="primSkills" id="primSkills" value={this.state.primSkills} onChange={this.handleChange}
																  options={this.state.priSkillsArray}
																  isObject={false}
																  style={this.style}
																/>
														</div>
													</div>
													<div className="col-lg-4">
														<label htmlFor="minPrimExp" className="addjobformLable"> Min. Experience Req.</label>
														<div className="input-group">
															<span className="input-group-addon addJobFormField"><i className="fa fa-bar-chart"></i> </span> 
															<input type="text" className="form-control addJobFormField" name="minPrimExp" id="minPrimExp" value={this.state.minPrimExp} onChange={this.handleChange}/>
														</div>
													</div>
												</div>
											</div>
											<div className="col-lg-12 addJobFieldRow text-left">
												<div className="row">
													<div className="col-lg-8">
														<label htmlFor="secSkills" className="addjobformLable"> Secondary Skills </label>
														<div className="input-group col-lg-12">
															<span className="input-group-addon addJobFormField"><i className='fa fa-cog'></i> </span> 
															<Multiselect className="form-control addJobFormField" name="secSkills" id="secSkills" value={this.state.secSkills} onChange={this.handleChange}
																  options={this.state.secSkillsArray}
																  isObject={false}
																  style={this.style}
															/>
														</div>
													</div>
													<div className="col-lg-4">
														<label htmlFor="minSecExp" className="addjobformLable"> Min. Experience Req.</label>
														<div className="input-group">
															<span className="input-group-addon addJobFormField"><i className="fa fa-bar-chart"></i> </span> 
															<input type="text" className="form-control addJobFormField" name="minSecExp" id="minSecExp" value={this.state.minSecExp} onChange={this.handleChange}/>
														</div>
													</div>
												</div>
											</div>
											<div className="col-lg-12 addJobFieldRow text-left">
												<div className="row">
													<div className="col-lg-8">
														<label htmlFor="otherSkills" className="addjobformLable"> Other Skills </label>
														<div className="input-group col-lg-12">
															<span className="input-group-addon addJobFormField"><i className='fa fa-cog'></i> </span> 
															<Multiselect className="form-control addJobFormField" name="otherSkills" id="otherSkills" value={this.state.otherSkills} onChange={this.handleChange}
																  options={this.state.otherSkillsArray}
																  isObject={false}
																  style={this.style}
															/>
														</div>
													</div>
													<div className="col-lg-4">
														<label htmlFor="minOtherExp" className="addjobformLable"> Min. Experience Req.</label>
														<div className="input-group">
															<span className="input-group-addon addJobFormField"><i className="fa fa-bar-chart"></i> </span> 
															<input type="text" className="form-control addJobFormField" name="minOtherExp" id="minOtherExp" value={this.state.minOtherExp} onChange={this.handleChange}/>
														</div>
													</div>
												</div>
											</div>
											<div className="col-lg-12 addJobFieldRow text-left">
												<label htmlFor="notMandateSkills" className="addjobformLable"> Preferred Skills but not mandatory </label>
												<div className="input-group col-lg-12">
													<span className="input-group-addon addJobFormField"><i className='fa fa-cog'></i> </span> 
													<Multiselect name="notMandateSkills" id="notMandateSkills" className="form-control addJobFormField" value={this.state.notMandateSkills} onChange={this.handleChange}
														options={this.state.preferSkillsArray}
														isObject={false}
														style={this.style}
													/>
												</div>
											</div>
											<div className="col-lg-7 col-lg-offset-5 pull-right">
												<button className="btn addJobFormField addJobPreviewBtn" > PREVIEW </button>
												<button className="btn buttonYellow addJobSubmitBtn"  onClick={this.handleSubmit}> SUBMIT </button>
											</div>
										</form>
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