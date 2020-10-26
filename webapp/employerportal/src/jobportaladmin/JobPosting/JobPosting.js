import React, {Component}   from 'react';
import './JobPosting.css';

import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome';
import Axios 				from 'axios';
import Swal 				from 'sweetalert2';
import { Multiselect } 		from 'multiselect-react-dropdown';
import CKEditor 			from '@ckeditor/ckeditor5-react';
import ClassicEditor 		from '@ckeditor/ckeditor5-build-classic';

import PropTypes from 'prop-types';


export default class JobPosting extends Component{
	
	constructor(props){
		super(props);

		this.state = {
			jobTitle 			: "",
			jobLocationCity 	: "",
			jobLocationCountry 	: "",
			/*industryId			: "",*/
			functionalArea 		: "",
			subFunctionalArea 	: "",
			/*functionalAreaId 	: "",*/
			/*subFunctionalAreaId : "",*/
			role 				: "",
			gender             : "Male",
			workFromHome 		: "",
			contactPerson 		: "",
			email 				: "",
			phone 				: "",
			jobType 			: "",
			jobTypeArray		: [],
			jobTime 			: "",
			lastDateOfAppl 		: "",
			streetAddress		: "",
			pincode 			: "",
			minSalary 			: "",
			minSalPeriod 		: "",
			maxSalary 			: "",
			maxSalPeriod		: "",
			jobDesc 			: "",
			minEducation 		: "",
			minExperience 		: "",
			priSkillsArray 		: [],
			minPrimExp	    	: "", 
			secSkillsArray 		: [],
			minSecExp			: "", 
			otherSkillsArray 	: [],
			minExpRequiredOther	: "", 
			preferSkillsArray 	: [],
			minExpRequiredPre	: "",
			industryList		: [],
			functionalArealist 	: [],
			subFunctionalAreaList:[],
			priSkillsArraylist 	: [],
			secSkillsArraylist 	: [],
			otherSkillsArraylist: [],
			minOtherExp   		: "",
			preferSkillsArraylist: [],
			jobTypeArray		: [],
			submitBtnText 		: "SUBMIT",		      
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
		if(this.props.match.params.job_id){
			let job_id = this.props.match.params.job_id;
			Axios.get("http://localhost:3009/get/one/" + job_id)
			.then(response=>{
				console.log("response.data : ", response.data);
				this.setState({
					job_id			: job_id,
					jobTitle 		: response.data.jobsData.jobBasicInfo.jobTitle,
					jobLocationCity : response.data.jobsData.jobBasicInfo.jobLocationCity,
					country 		: response.data.jobsData.jobBasicInfo.country,
					functionalArea 	: response.data.jobsData.jobBasicInfo.functionalArea,
					subFunctionalArea: response.data.jobsData.jobBasicInfo.subFunctionalArea,
					role 			: response.data.jobsData.jobBasicInfo.role,
					gender 			: response.data.jobsData.jobBasicInfo.gender,
					workFromHome 	: response.data.jobsData.workFromHome,
					jobType 		: response.data.jobsData.jobType,
					contactPerson 	: response.data.jobsData.contactPerson,
					email 			: response.data.jobsData.email,
					phone 			: response.data.jobsData.phone,
					jobTime 		: response.data.jobsData.jobTime,
					lastDateOfAppl 	: response.data.jobsData.lastDateOfAppl,
					streetAddress	: response.data.jobsData.streetAddress,
					pincode 		: response.data.jobsData.pincode,
					minSalary 		: response.data.jobsData.ctcOffered.minSalary,
					minSalPeriod 	: response.data.jobsData.ctcOffered.minSalPeriod,
					maxSalary 		: response.data.jobsData.ctcOffered.maxSalary,
					maxSalPeriod	: response.data.jobsData.ctcOffered.maxSalPeriod,
					jobDesc 		: response.data.jobsData.jobBasicInfo.jobDesc,
					minEducation 	: response.data.jobsData.eligibility.minEducation,
					minExperience 	: response.data.jobsData.eligibility.minExperience,
					minPrimExp 		: response.data.jobsData.requiredSkills.minPrimExp,
					minSecExp 		: response.data.jobsData.requiredSkills.minSecExp,
					minOtherExp 	: response.data.jobsData.requiredSkills.minOtherExp,
					submitBtnText 	: "UPDATE",
				})
			})
			.catch(error=>{
				Swal.fire("Some error occured while updating job data", error.message, "error");
			})
		}
		
		Axios.get("http://qaapi-jobportal.iassureit.in/api/functionalareamaster/get/list")
			.then(response => {
				console.log("getfunctionalAreaData response.data = ",response.data);
				this.setState({functionalArealist : response.data});
				console.log("functionalArea",this.state.functionalArealist);
			})
			.catch(error=>{
				Swal.fire("Error while getting List data",error.message,'error');
			})

		Axios.get("http://qaapi-jobportal.iassureit.in/api/subfunctionalareamaster/get/list")
			.then(response => {
				console.log("getsubFunctionalAreaData response.data = ",response.data);
				this.setState({subFunctionalAreaList : response.data});
				console.log("subFunctionalArea",this.state.subFunctionalAreaList);
			})
			.catch(error=>{
				Swal.fire("Error while getting List data",error.message,'error');
			})
		
		Axios.get("http://qaapi-jobportal.iassureit.in/api/jobtypemaster/get/list")
			.then(response => {
				console.log("getfunctionalAreaData response.data = ",response.data);
				this.setState({jobTypeArray : response.data});
				console.log("jobTypeArray",this.state.jobTypeArray);
			})
			.catch(error=>{
				Swal.fire("Error while getting List data",error.message,'error');
			})	
		
		Axios.get("http://qaapi-jobportal.iassureit.in/api/skillmaster/get/list")
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
			
		Axios.get("http://qaapi-jobportal.iassureit.in/api/skillmaster/get/list")
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
		
		Axios.get("http://qaapi-jobportal.iassureit.in/api/skillmaster/get/list")
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
		
		Axios.get("http://qaapi-jobportal.iassureit.in/api/skillmaster/get/list")
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

	validateForm=()=>{
		var status = true;	
		if(this.state.jobTitle.length<=0){
			document.getElementById("jobTitleError").innerHTML=  
			"Enter job title";  
			status = false; 
		}else{
			document.getElementById("jobTitleError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.jobLocationCity.length<=0){
			document.getElementById("jobLocationError").innerHTML=  
			"Enter job location";  
			status=false; 
		}else{
			document.getElementById("jobLocationError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.role.length<=0){
			document.getElementById("roleError").innerHTML=  
			"Enter role";  
			status=false; 
		}else{
			document.getElementById("roleError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.contactPerson.length<=0){
			document.getElementById("contactPersonError").innerHTML=  
			"Enter contact person name";  
			status = false; 
		}else{
			document.getElementById("contactPersonError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.email.length<=0){
			document.getElementById("emailError").innerHTML=  
			"Enter email id";  
			status = false; 
		}else{
			document.getElementById("emailError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.phone.length<=0){
			document.getElementById("phoneError").innerHTML=  
			"Enter phone number";  
			status = false; 
		}else{
			document.getElementById("phoneError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.pincode.length<=0){
			document.getElementById("pincodeError").innerHTML=  
			"Enter pincode";  
			status = false; 
		}else{
			document.getElementById("pincodeError").innerHTML=  
			""; 
			status = true;
		}
       /* if (this.state.country.length<=0) {
        	document.getElementById("countryError").innerHTML=
        	"Select country"; 
            //If the "Please Select" option is selected display error.
            alert("Please select an country option!");
            status = false;
        }else{
			document.getElementById("countryError").innerHTML=  
			""; 
			status = true;
		}*/
		/*if (this.state.functionalArea.length<=0) {
        	document.getElementById("functionalAreaError").innerHTML=
        	"Please select functional area"; 
            //If the "Please Select" option is selected display error.
            alert("Please select an functional area option!");
            status = false;
        }else{
			document.getElementById("countryError").innerHTML=  
			""; 
			status = true;
		}*/
		 return status;
	}
	
	handleChange = (event)=>{
		var name = event.currentTarget.name;
		var value = event.currentTarget.value;
		this.setState({ [name] : value});
	}

	setGender(event){
		event.preventDefault();

		var value = event.currentTarget.value;
		var id  = event.currentTarget.id;
		this.setState({
			gender:id,
		})
	}
	
	handleSubmit = (event)=>{
		event.preventDefault();
		if(this.validateForm()){	
		var formValues = {
			jobTitle 			: this.state.jobTitle,
			jobLocationCity		: this.state.jobLocationCity,
			jobLocationCountry 	: this.state.jobLocationCountry,
			functionalArea 		: this.state.functionalArea,
			subFunctionalArea 	: this.state.subFunctionalArea,
			role 				: this.state.role,
			gender      	   	: this.state.gender,
			workFromHome 		: this.state.workFromHome,
			contactPerson 		: this.state.contactPerson,
			email 				: this.state.email,
			phone 				: this.state.phone,
			jobType 			: this.state.jobType,
			jobTime 			: this.state.jobTime,
			lastDateOfAppl 		: this.state.lastDateOfAppl,
			minSalary 			: this.state.minSalary,
			minSalPeriod 		: this.state.minSalPeriod,
			maxSalary 			: this.state.maxSalary,
			maxSalPeriod 		: this.state.maxSalPeriod,
			jobDesc 			: this.state.jobDesc,
			minEducation 		: this.state.minEducation,
			minExperience 		: this.state.minExperience,
			minPrimExp	 		: this.state.minPrimExp,
			minSecExp	 		: this.state.minSecExp,
			minOtherExp	 		: this.state.minOtherExp,
		};
			console.log("formValues :", formValues);
			
			if(this.props.match.params.job_id){
				formValues.job_id = this.state.job_id;
				this.updateData(formValues);
			}
			else{
				this.insertData(formValues);
			}
		}
	}	
		
	insertData(formValues){
		Axios.post("http://localhost:3009/post",formValues)
			.then(response => {
				console.log("Inside axios",response.data);
				if(response.data.message==="Job details Inserted Successfully"){
					console.log("response.data = ",response.data);
					let job_id = response.data.jobsData._id;

					Swal.fire("Congrats","Your Data is Submitted Successfully","success");
					this.setState({
									jobTitle 			: "",
									jobLocationCity 	: "",
									jobLocationCountry 	: "",
									functionalArea 		: "",
									subFunctionalArea 	: "",
									role 				: "",
									gender              : "Male",
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
									minPrimExp 	 		: "",
									minSecExp 	 		: "",
									minOtherExp			: ""
								  });
					this.props.history.push("/job-profile/"+job_id);
				}
			})
			.catch(error =>{
				console.log(error);
				Swal.fire("Submit Error!",error.message,'error');
			})
		}

	updateData(formValues){
		Axios.put("http://localhost:3009/update", formValues)
		.then(response=>{
			console.log("formValues :", formValues);
			if(response.data.message==="Job details updated Successfully!"){
				console.log("response.data : ", response.data);
				Swal.fire("Congrats!", "your profile updated successfully!", "success");
				this.props.history.push("/job-profile/" + this.state.job_id);
			}
		})
		.catch(error =>{
			console.log(error);
	    	Swal.fire("Update Error!", error.message, 'error');
		})
	}

	onEditorChange( evt ) {
        this.setState( {
            jobDesc: evt.editor.getData()
        } );
    }				
	
	render(){
		 
		 /*const { funAreaArray, jobTypeArray, jobTimeArray, countryArray, minSalArray, maxSalArray,  secSkillsArray, otherSkillsArray, preferSkillsArray } = this.state;*/
				
		return(
			<div className="pageWrapper addJobBackgroundColor container-fluid">
				<div className="row">
					<div className="col-lg-10 col-lg-offset-1 addJobForm pageWrapperBorder borderColor">
						<div className="col-lg-10 col-lg-offset-1 mainFormSection">
							<div className="addJobFormHeading col-lg-12">
								Post A Job
								<div className="addJobFormHr col-lg-12">
								</div>
							</div>
							<div className="addJobMainHead col-lg-12">
								<i className="fa fa-info"></i> 
								<span className="labelLeftPadding"> Basic Info </span>
							</div>
							<form id="addJob">
								<div className="col-lg-12 addJobFieldRow text-left">
									<div className="row">
										<div className="col-lg-6">
											<label htmlFor="jobTitle" className="addjobformLable"> Job title <span className="asterisk">&#42;</span> </label>
											<div className="input-group">
												<span className="input-group-addon addJobFormField"><i className="fa fa-briefcase"></i> </span> 
												<input type="text" className="form-control addJobFormField" name="jobTitle" id="jobTitle" value={this.state.jobTitle} onChange={this.handleChange}/>
											</div>
											<span id="jobTitleError" className="errorMsg"></span>
										</div>
										<div className="col-lg-6">
											<div className="row row-no-gutters">
												<div className="col-lg-8">
													<label htmlFor="jobLocation" className="addjobformLable"> Job Location <span className="asterisk">&#42;</span> </label>
													<div className="input-group">
														<span className="input-group-addon addJobFormField"><FontAwesomeIcon className="locationIcon" icon={['fas', 'map-marker-alt']} /></span> 
														<input type="text" className="form-control addJobFormField" name="jobLocationCity" id="jobLocationCity" value={this.state.jobLocationCity} onChange={this.handleChange}/>
													</div>
													<span id="jobLocationError" className="errorMsg"></span>
												</div>
												<div className="col-lg-4">
													<label htmlFor="country" className="addjobformLable"> Country <span className="asterisk">&#42;</span> </label>
													<select className="country form-control addJobFormField" name="country" id="country" value={this.state.country} onChange={this.handleChange}>
												     	<option hidden> --select-- </option>
												    	<option> India 	  </option>
												    	<option> USA 		  </option>
												    	<option> UK 		  </option>
												    	<option> Sweeden 	  </option>
												    	<option> Germany 	  </option>
												    </select>
												    <span id="countryError" className="errorMsg"></span>
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
											<label htmlFor="functionalArea" className="addjobformLable"> Fuctional Area <span className="asterisk">&#42;</span> </label>
											<div className="input-group">
												<span className="input-group-addon addJobFormField"><i className="fa fa-briefcase"></i></span> 
												<select className="form-control addJobFormField" name="functionalArea" id="functionalArea" value={this.state.functionalArea} onChange={this.handleChange}>
											    	{
														this.state.functionalArealist!=null && this.state.functionalArealist.length > 0 
														?
															this.state.functionalArealist.map((elem,index)=>{
																return(
																	<option value={elem._id}> {elem.functionalArea} </option>
																);
															})
														:
															<option> --select-- </option>
													}		   
												</select>
												<span id="functionalAreaError" className="errorMsg"></span>
											</div>	
										</div>			
										<div className="col-lg-6">
											<label htmlFor="subFunctionalArea" className="addjobformLable"> Sub Functional Area <span className="asterisk">&#42;</span> </label>
											<div className="input-group">
												<span className="input-group-addon addJobFormField"><FontAwesomeIcon icon={['fas', 'briefcase']} /></span> 
												<select className="form-control addJobFormField" name="subFunctionalArea" id="subFunctionalArea" value={this.state.subFunctionalArea} onChange={this.handleChange}>
											    	{
														this.state.subFunctionalAreaList!=null && this.state.subFunctionalAreaList.length > 0 
														?
															this.state.subFunctionalAreaList.map((elem,index)=>{
																return(
																	<option value={elem._id}> {elem.subFunctionalArea} </option>
																);
															})
														:
															<option> --select-- </option>
													}		   
												</select>
											</div>
										</div>
									</div>
								</div>
								<div className="form-group col-lg-12 text-left">
									<div className="row">
										<div className="col-lg-6">
											<label htmlFor="Role" className="addjobformLable"> Role <span className="asterisk">&#42;</span> </label>
											<div className="input-group">
												<span className="input-group-addon addJobFormField"><FontAwesomeIcon icon={['fas', 'briefcase']} /></span> 
												<input type="text" className="form-control addJobFormField" name="role" id="role" value={this.state.role} onChange={this.handleChange}/>
											</div>
											<span id="roleError" className="errorMsg"></span>
										</div>
										<div className="col-lg-4">
											<label htmlFor="gender" className="nameTitleForm nameTitleFormAge"> Gender <span className="asterisk">&#42;</span></label>
											<div className="input-group genderFeildWrapper">
												<div className={this.state.gender==="Male"? "genderFeild col-lg-4 genderFeildActive" : "genderFeild col-lg-4" }  id="Male" name="gender" value="Male" onClick={this.setGender.bind(this)}>
													<div className="row" >
														Male
													</div>
												</div>
												<div className={this.state.gender==="Female"? "genderFeild col-lg-4 genderFeildActive" : "genderFeild col-lg-4" } id="Female" name="gender" value="Female" onClick={this.setGender.bind(this)}>
													<div className="row">
														Female
													</div>
												</div>
												<div className={this.state.gender==="Any"? "genderFeild col-lg-4 genderFeildActive" : "genderFeild col-lg-4" } id="Any" name="gender" value="Any"  onClick={this.setGender.bind(this)}>
													<div className="row">
														Any
													</div>
												</div>			
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-3 text-left">
									<label className="containerWfh">Work From Home
                                        <input type="checkbox" name="workFromHome" id="workFromHome" value={this.state.workFromHome} onChange={this.handleChange} />
                                        <span className="checkmark2"></span>
                            		</label>
								</div>
								<div className="col-lg-12 addJobFieldRow text-left">
									<div className="row">
										<div className="col-lg-4">
											<label htmlFor="contactPerson" className="addjobformLable"> Contact Person <span className="asterisk">&#42;</span> </label>
											<div className="input-group">
												<span className="input-group-addon addJobFormField"><i className="fa fa-user"></i></span> 
												<input type="text" className="form-control addJobFormField" name="contactPerson" id="contactPerson" value={this.state.contactPerson} onChange={this.handleChange}/>
											</div>
											<span id="contactPersonError" className="errorMsg"></span>
										</div>
										<div className="col-lg-4">
											<label htmlFor="email" className="addjobformLable"> Email <span className="asterisk">&#42;</span> </label>
											<div className="input-group">
												<span className="input-group-addon addJobFormField"><i className="fa fa-envelope-o"></i></span> 
												<input type="text" className="form-control addJobFormField" name="email" id="email" value={this.state.email} onChange={this.handleChange}/>
											</div>
											<span id="emailError" className="errorMsg"></span>
										</div>
										<div className="col-lg-4">
											<label htmlFor="phone" className="addjobformLable"> Phone Number <span className="asterisk">&#42;</span> </label>
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
											    	<option hidden> --select-- </option>
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
																	
																	<option> {elem.jobType} </option>
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
											    	<option hidden> --select-- </option>
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
												<span className="input-group-addon addJobFormField"><i className="fa fa-calendar"></i></span> 
												<input type="date" className="form-control addJobFormField" name="lastDateOfAppl" id="lastDateOfAppl" value={this.state.lastDateOfAppl} onChange={this.handleChange}/>
											</div>
										</div>
									</div>
								</div>

								<div className="col-lg-12 addJobFieldRow">
									<div className="addJobFormHr col-lg-12">
									</div>
								</div>	
								
								<div className="addJobSubHead col-lg-12">
									<i className="fa fa-rupee salaryIcon"></i>
									<span className="labelLeftPadding"> Salary </span>
								</div>
								<div className="col-lg-12 addJobFieldRow text-left">
									<div className="row">
										<div className="col-lg-6">
											<div className="row row-no-gutters">
												<div className="col-lg-8">
													<label htmlFor="minSalary" className="addjobformLable"> Minimum Salary <i className="fa fa-rupee"></i> </label>
													<div className="input-group">
														<span className="input-group-addon addJobFormField"><i className="fa fa-rupee addJobrupee"></i> </span> 
														<input type="text" className="form-control addJobFormField" name="minSalary" id="minSalary" value={this.state.minSalary} onChange={this.handleChange}/>
													</div>
												</div>
												<div className="col-lg-4">
													<label htmlFor="minSalPeriod" className="addjobformLable"> &nbsp; </label>
													<select className="form-control addJobFormField" name="minSalPeriod" id="minSalPeriod" value={this.state.minSalPeriod} onChange={this.handleChange}>
												      <option hidden> --select-- </option>
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
													<label htmlFor="maxSalary" className="addjobformLable"> Maximum Salary <i className="fa fa-rupee"></i> </label>
													<div className="input-group">
														<span className="input-group-addon addJobFormField"><i className="fa fa-rupee addJobrupee"></i> </span> 
														<input type="text" className="form-control addJobFormField" name="maxSalary" id="maxSalary" value={this.state.maxSalary} onChange={this.handleChange}/>
													</div>
												</div>
												<div className="col-lg-4">
													<label htmlFor="maxSalPeriod" className="addjobformLable"> &nbsp; </label>
													<select className="form-control addJobFormField" name="maxSalPeriod" id="maxSalPeriod" value={this.state.maxSalPeriod} onChange={this.handleChange}>
												      <option hidden> --select-- </option>
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
									<div className="addJobFormHr col-lg-12">
									</div>
								</div>
								
								<div className="addJobSubHead col-lg-12">
									<i className="fa fa-briefcase"></i>
									<span className="labelLeftPadding"> Job Description </span>
								</div>
								<div className="description text-left col-lg-12">
									<div className="form-group">
								      <label htmlFor="jobDesc" className="addjobformLable jobDesc"> Describe the responsibilities of this job, required work experience, skills, or education. </label>
								      	<div rows="20" id="jobDesc"> 
                    						<CKEditor
									          editor={ ClassicEditor }
									          data=""
									          onInit={ editor => {
									            // You can store the "editor" and use when it is needed.
									            console.log( 'Editor is ready to use!', editor );
									          } }
									          onChange={ ( event, editor ) => {
									          	 this.setState( {
										            jobDesc: editor.getData()
										        } );
									          } }
									          onBlur={ editor => {
									            console.log( 'Blur.', editor );
									          } }
									          onFocus={ editor => {
									            console.log( 'Focus.', editor );
									          } }
									        />	
									    </div> 
								    </div>
								</div>
								
								<div className="col-lg-12 addJobFieldRow">
									<div className="addJobFormHr col-lg-12">
									</div>
								</div>
								
								<div className="col-lg-12 addJobSubHead">
									<i className="fa fa-book"></i>
									<span className="labelLeftPadding"> Required Education & Experience </span>
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
									<div className="addJobFormHr col-lg-12">
									</div>
								</div>
								
								<div className="col-lg-12 addJobSubHead">
									<i className='fa fa-cog'></i> 
									<span className="labelLeftPadding"> Expected Skills </span>
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
											<label htmlFor="minPrimExp" className="addjobformLable"> Min. Experience Req. </label>
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
											<label htmlFor="minSecExp" className="addjobformLable"> Min. Experience Req. </label>
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
											<label htmlFor="minOtherExp" className="addjobformLable"> Min. Experience Req. </label>
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
									<button className="btn addJobFormField addJobPreviewBtn"> PREVIEW </button>
									<button className="btn buttonYellow addJobSubmitBtn"  onClick={this.handleSubmit}> {this.state.submitBtnText} </button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}


}