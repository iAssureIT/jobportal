import React,{Component} 	from 'react';
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome';
import Moment               from 'moment';
import { withRouter }	 	from 'react-router-dom';
import Axios 			 	from 'axios';
import Swal 			 	from 'sweetalert2';

import '../BasicInfoForm/BasicInfoForm.css';


class Academics extends Component{
	constructor(props){
		super(props);

		this.state={
			experienceArry                : [],
			companyName                   : "",
			candidateID                   : this.props.match.params.candidateID,
			workExperienceID              : this.props.match.params.workExperienceID,
			companyCountry                : "",
			companyCity                   : "",
			lastDesignation               : "",
			lastDeartment   		      : "",
			lastSalary                    : "",
			formDate	                  : "",	
			toDate                        : "",
			companyState                  : "",
			responsibilities              : "",
			reportingManager              : "",
			reportingManagerDesignation   : "",
			expectedSalary                : "",
			noticePeriod                  : "",
			buttonText                    : "Save",

			expYears                      : 0,
			expMonths                     : 0,
		}
	}
	componentDidMount(){
		this.getData();
		if(this.props.match.params.workExperienceID){
			this.edit()
		}
	}
	//========== User Define Function Start ================
	edit(){
		var candidateID = this.state.candidateID;
		var workExperienceID   = this.state.workExperienceID;
		if (workExperienceID) {
			var idDate ={
				candidateID : this.state.candidateID,
				workExperienceID : this.state.workExperienceID,
			}
			Axios.post("/api/candidatemaster/post/getOneCandidateExperience",idDate)
			.then(response=>{
				var editData =response.data;

			 	this.setState({
			 		companyName                    :editData[0].workExperience[0].companyName,
			 		companyCountry                 :editData[0].workExperience[0].country,
			 		companyCity                    :editData[0].workExperience[0].city,
			 		companyState                   :editData[0].workExperience[0].state,
			 		lastDesignation                :editData[0].workExperience[0].lastDegn,
			 		lastDeartment                  :editData[0].workExperience[0].department,
			 		lastSalary                     :editData[0].workExperience[0].lastSalary,
			 		expectedSalary                 :editData[0].workExperience[0].expectedSalary,
			 		responsibilities               :editData[0].workExperience[0].responsibilities,
			 		reportingManager               :editData[0].workExperience[0].reportingManager,
			 		noticePeriod                   :editData[0].workExperience[0].noticePeriod,
			 		reportingManagerDesignation    :editData[0].workExperience[0].reportingManagerDegn,
			 		formDate                       :Moment(editData[0].workExperience[0].fromDate).format("YYYY-MM-DD"),
			 		toDate                         :Moment(editData[0].workExperience[0].toDate).format("YYYY-MM-DD"),
			 		buttonText                     :"Update"
			 	})
			 	
			 })
			 .catch(error=>{
			 	Swal.fire("Submit Error!",error.message,'error');
			 })
		}
	}
	getData(){
		Axios.get("/api/candidatemaster/get/one/"+this.state.candidateID)
		.then(response=>{
			 	this.setState({
			 		experienceArry: response.data[0].workExperience

				 })
			 })
			 .catch(error=>{
			 	Swal.fire("Submit Error!",error.message,'error');
			 })
	}
	deleteDate(event){
		event.preventDefault();
		var data_id =  event.currentTarget.id;

		Swal.fire({
		title : 'Are you sure? you want to delete this Experience Details!!!',
		text : 'You will not be able to recover this Experience Details',
		icon : 'warning',
		showCancelButton : true,
		confirmButtonText : 'Yes, delete it!',
		cancelButtonColor : 'No, keep it',
		confirmButtonColor : '#d33',
	
	  }).then((result) =>{
		if(result.value){
			if(data_id){
				Axios.delete("/api/candidatemaster/deleteExperience/"+this.state.candidateID+"/delete/"+data_id)
				.then(response =>{
						if(response.data.deleted===true){
						Swal.fire(
									'Deleted!',
									'Experience Details has been deleted successfully!',
									'success'
							);
						this.props.history.push("/experience/"+this.state.candidateID);
					}
			})
				.catch(error=>{
					
					Swal.fire(
								"Some problem occured deleting Experience Details!",
								error.message,
								'error'
						)
				})
			}
				
				}else if (result.dismiss === Swal.DismissReason.cancel){
					
					Swal.fire(
						'Cancelled',
						'Your Experience details is safe :)',
						'error'
					)
				}
			})
	  this.getData();
	}
	
	handleSave(event){
		var status =  this.validateForm();
		
		
		var formValues = {
								candidateID        : this.state.candidateID,
								experienceID       : this.state.workExperienceID,
								experience:{
									companyName                   : this.state.companyName,
									country                       : this.state.companyCountry,
									city                          : this.state.companyCity,
									state                         : this.state.companyState,
									lastDegn                      : this.state.lastDesignation,
									department                    : this.state.lastDeartment,
									lastSalary                    : this.state.lastSalary,
									expectedSalary                : this.state.expectedSalary,
									noticePeriod                  : this.state.noticePeriod,
									fromDate                      : this.state.formDate,
									toDate                        : this.state.toDate,
									responsibilities              : this.state.responsibilities,
									reportingManager              : this.state.reportingManager,
									reportingManagerDegn          : this.state.reportingManagerDesignation
								}
								
							}
							
		if(this.props.match.params.workExperienceID){
			this.updateData(formValues,event);
		}else{
			this.insetData(formValues,event);
		}
		this.getData();
	}
	updateData(formValues,event){
		var status =  this.validateForm();
		if(status==true){
					Axios.patch("/api/candidatemaster/patch/updateOneCandidateExperience",formValues)
				 .then(response=>{

									Swal.fire("Congrats","Your Experience Details is update Successfully","success");
										this.setState({
													companyName                   : "",
													companyCountry                : "",
													companyCity                   : "",
													lastDesignation               : "",
													lastDeartment   		      : "",
													lastSalary                    : "",
													formDate	                  : "",	
													companyState	              : "",	
													expectedSalary	              : "",	
													toDate                        : "",
													responsibilities              : "",
													reportingManager              : "",
													reportingManagerDesignation   : "",
													noticePeriod                  : "",
													buttonText                    : "Save"
												})
							
							this.props.history.push("/experience/"+this.state.candidateID);
					})
					.catch(error =>{
						Swal.fire("Submit Error!",error.message,'error');
					});
				}

			
		}
	insetData(formValues,event){
		var status =  this.validateForm();
		if(status==true){
			Axios.patch("/api/candidatemaster/patch/addCandidateExperience",formValues)
			 .then(response=>{
					Swal.fire("Congrats","Your Experience Details is insert Successfully","success");
						this.setState({
										companyName                   : "",
										companyCountry                : "",
										companyCity                   : "",
										lastDesignation               : "",
										lastDeartment   		      : "",
										lastSalary                    : "",
										formDate	                  : "",	
										expectedSalary	              : "",	
										companyState	              : "",	
										toDate                        : "",
										responsibilities              : "",
										reportingManager              : "",
										reportingManagerDesignation   : "",
										noticePeriod                  : "",
										buttonText                    : "Save"
									})	
				})
				.catch(error =>{
					Swal.fire("Submit Error!",error.message,'error');
				});
			}
	}
	handelChange(event){
		var value = event.currentTarget.value;
		var name  = event.currentTarget.name;

		
		this.setState({
			[name]:value,
		})
	

	}

	handleBack(event){
			event.preventDefault();
			this.props.history.push("/certification/"+this.state.candidateID);
		}
	handelSubmit(event){
		event.preventDefault();
			this.props.history.push("/profile/"+this.state.candidateID);
			
	}
	//========== User Define Function End ==================
		//========== Validation Start ==================
	 validateForm=()=>{
		var status = true;
	
		if(this.state.companyName.length<=0){
			document.getElementById("companyNameError").innerHTML=  
			"Please enter your Company Name";  
			status=false; 
		}else{
			document.getElementById("companyNameError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.companyState.length<=0){
			document.getElementById("stateError").innerHTML=  
			"Please enter your Company State";  
			status=false; 
		}else{
			document.getElementById("stateError").innerHTML=  
			""; 
			status = true;
		}
		
		if(this.state.companyCountry.length<=0){
			document.getElementById("companyCountryError").innerHTML=  
			"Please enter your Company Country";  
			status=false; 
		}else{
			document.getElementById("companyCountryError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.companyCity.length<=0){
			document.getElementById("companyCityError").innerHTML=  
			"Please enter your Company City";  
			status=false; 
		}else{
			document.getElementById("companyCityError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.lastDesignation.length<=0){
			document.getElementById("lastDesignationError").innerHTML=  
			"Please enter your Last Designation";  
			status=false; 
		}else{
			document.getElementById("lastDesignationError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.lastDeartment.length<=0){
			document.getElementById("lastDeartmentError").innerHTML=  
			"Please enter your Last Deartment";  
			status=false; 
		}else{
			document.getElementById("lastDeartmentError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.lastSalary.length<=0){
			document.getElementById("lastSalaryError").innerHTML=  
			"Please enter your Last Salary";  
			status=false; 
		}else{
			document.getElementById("lastSalaryError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.expectedSalary.length<=0){
			document.getElementById("expectedSalaryError").innerHTML=  
			"Please enter your Last Salary";  
			status=false; 
		}else{
			document.getElementById("expectedSalaryError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.formDate.length<=0){
			document.getElementById("formDateError").innerHTML=  
			"Please enter your Form Date";  
			status=false; 
		}else{
			document.getElementById("formDateError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.toDate.length<=0){
			document.getElementById("toDateError").innerHTML=  
			"Please enter your To Date";  
			status=false; 
		}else{
			document.getElementById("toDateError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.toDate.length<=0){
			document.getElementById("toDateError").innerHTML=  
			"Please enter your To Date";  
			status=false; 
		}else{
			document.getElementById("toDateError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.noticePeriod.length<=0){
			document.getElementById("noticePeriodError").innerHTML=  
			"Please enter your To Date";  
			status=false; 
		}else{
			document.getElementById("noticePeriodError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.responsibilities.length<=0){
			document.getElementById("responsibilitiesError").innerHTML=  
			"Please enter your Responsibilities";  
			status=false; 
		}else{
			document.getElementById("responsibilitiesError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.reportingManager.length<=0){
			document.getElementById("reportingManagerError").innerHTML=  
			"Please enter your Reporting Manager";  
			status=false; 
		}else{
			document.getElementById("reportingManagerError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.reportingManagerDesignation.length<=0){
			document.getElementById("reportingManagerDesignationError").innerHTML=  
			"Please enter your Reporting Manager Designation";  
			status=false; 
		}else{
			document.getElementById("reportingManagerDesignationError").innerHTML=  
			""; 
			status = true;
		}
		
	
		
		 return status;
	}

	//========== Validation End ==================
	render(){
		return(
				<div className="col-lg-12">
					<form>
					<div className="row formWrapper">

							<div className="col-lg-4">
								<label htmlFor="companyName" className="nameTitleForm">
									Company Name
									<sup className="nameTitleFormStar">*</sup>
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon">
										<FontAwesomeIcon icon="warehouse" />
									</span> 
									<input type="text" name="companyName" id="companyName" 
									 className="form-control inputBox " value={this.state.companyName}
									 onChange={this.handelChange.bind(this)} />
								</div> 
								<span id="companyNameError" className="errorMsg"></span>
							</div>

							<div className="col-lg-4">
								<label htmlFor="companyCity" className="nameTitleForm">
									Company City
									<sup className="nameTitleFormStar">*</sup>
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon">
										<FontAwesomeIcon icon="city" />
									</span> 
									<input type="text" name="companyCity" id="companyCity" 
									 className="form-control inputBox " value={this.state.companyCity} 
									 onChange={this.handelChange.bind(this)} />
								</div> 
								<span id="companyCityError" className="errorMsg"></span>
							</div>

							<div className="col-lg-4">
								<label htmlFor="companyState" className="nameTitleForm">
									Company State
									<sup className="nameTitleFormStar">*</sup>
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon">
										<i className="fa fa-map"></i>
								    </span> 
									<input type="text" name="companyState" id="companyState" 
									 className="form-control inputBox" value={this.state.companyState} 
									 onChange={this.handelChange.bind(this)} />
								</div> 
								<span id="stateError" className="errorMsg"></span>
							</div>

						</div>

						<div className="row formWrapper">
							
							<div className="col-lg-4">
								<label htmlFor="companyCountry" className="nameTitleForm">
									Company Country
								    <sup className="nameTitleFormStar">*</sup>
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon">
										<i className="fa fa-flag"></i>
									</span> 
									<input type="text" name="companyCountry" id="companyCountry" 
									 className="form-control inputBox " value={this.state.companyCountry}
									 onChange={this.handelChange.bind(this)} />
								</div> 
								<span id="companyCountryError" className="errorMsg"></span>
							</div>

							<div className="col-lg-4">
								<label htmlFor="lastDesignation" className="nameTitleForm">
									Last Designation
									<sup className="nameTitleFormStar">*</sup>
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon">
										<FontAwesomeIcon icon="id-card-alt" />
								    </span> 
									<input type="text" name="lastDesignation" id="lastDesignation" 
									 className="form-control inputBox" value={this.state.lastDesignation} 
									 onChange={this.handelChange.bind(this)} />
								</div> 
								<span id="lastDesignationError" className="errorMsg"></span>
							</div>

							<div className="col-lg-4">
								<label htmlFor="lastDeartment" className="nameTitleForm">
									Last Department
									<sup className="nameTitleFormStar">*</sup>
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon">
										<FontAwesomeIcon icon="network-wired" /> 
									</span> 
									<input type="text" name="lastDeartment" id="lastDeartment"
									 className="form-control inputBox" value={this.state.lastDeartment} 
									 onChange={this.handelChange.bind(this)} />
								</div> 
								<span id="lastDeartmentError" className="errorMsg"></span>
							</div>

							

						</div>
						<div className="row formWrapper">

							<div className="col-lg-4">
								<label htmlFor="formDate" className="nameTitleForm">
									Form Date
									<sup className="nameTitleFormStar">*</sup>
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon">
										<i className="fa fa-calendar"></i> 
									</span> 
									<input type="date" name="formDate" id="formDate" 
									 className="form-control inputBox date" 
									 value={this.state.formDate} 
									 onChange={this.handelChange.bind(this)} />
								</div> 
								<span id="formDateError" className="errorMsg"></span>
							</div>

							<div className="col-lg-4">
								<label htmlFor="toDate" className="nameTitleForm">
									To Date
									<sup className="nameTitleFormStar">*</sup>
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon">
										<i className="fa fa-calendar"></i> 
									</span> 
									<input type="date" name="toDate" id="toDate" 
									 className="form-control inputBox date" 
									 value={this.state.toDate}
									 onChange={this.handelChange.bind(this)} />
								</div> 
								<span id="toDateError" className="errorMsg"></span>
							</div>

							<div className="col-lg-4">
							<label htmlFor=""></label>
								<div className="input-group showFeild2" name="exp" id="exp"  >
									{this.state.expYears + "  Years, " + 
									 this.state.expMonths + " months"}	
								</div> 
							</div>

						</div>
						<div className="row formWrapper">

							<div className="col-lg-4">
								<label htmlFor="responsibilities" className="nameTitleForm">
									Responsibilities
									<sup className="nameTitleFormStar">*</sup>
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon">
										<FontAwesomeIcon icon="file-alt" />
									</span> 
									<input type="text" name="responsibilities" id="responsibilities"
									 className="form-control inputBox" value={this.state.responsibilities} 
									 onChange={this.handelChange.bind(this)} />
								</div> 
								<span id="responsibilitiesError" className="errorMsg"></span>
							</div>

							<div className="col-lg-4">
								<label htmlFor="reportingManager" className="nameTitleForm">
									Reporting Manager
									<sup className="nameTitleFormStar">*</sup>
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon">
										<i className="fa fa-user-circle"></i>
									</span> 
									<input type="text" name="reportingManager" id="reportingManager" 
									 className="form-control inputBox" value={this.state.reportingManager} 
									 onChange={this.handelChange.bind(this)} />
								</div> 
								<span id="reportingManagerError" className="errorMsg"></span>
							</div>

							<div className="col-lg-4">
								<label htmlFor="reportingManagerDesignation" className="nameTitleForm">
									Reporting Manager Designation
									<sup className="nameTitleFormStar">*</sup>
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon">
										<FontAwesomeIcon icon="id-card-alt" /> 
									</span> 
									<input type="text" name="reportingManagerDesignation" 
									 id="reportingManagerDesignation" className="form-control inputBox" 
									 value={this.state.reportingManagerDesignation} 
									 onChange={this.handelChange.bind(this)} />
								</div> 
								<span id="reportingManagerDesignationError" className="errorMsg"></span>
							</div>

						</div>
						<div className="row formWrapper">
							<div className="col-lg-4">
								<label htmlFor="lastSalary" className="nameTitleForm">
									Last Salary Drawn in INR
									<sup className="nameTitleFormStar">*</sup>
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon">
										<FontAwesomeIcon icon="rupee-sign" /> 
									</span> 
									<input type="text" name="lastSalary" id="lastSalary" 
									 className="form-control inputBox" value={this.state.lastSalary}
									 onChange={this.handelChange.bind(this)} />
								</div> 
								<span id="lastSalaryError" className="errorMsg"></span>
							</div>

							<div className="col-lg-4">
								<label htmlFor="expectedSalary" className="nameTitleForm">
									Expected Salary Drawn in INR
									<sup className="nameTitleFormStar">*</sup>
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon">
										<FontAwesomeIcon icon="rupee-sign" /> 
									</span> 
									<input type="text" name="expectedSalary" id="expectedSalary" 
									 className="form-control inputBox" value={this.state.expectedSalary} 
									 onChange={this.handelChange.bind(this)} />
								</div> 
								<span id="expectedSalaryError" className="errorMsg"></span>
							</div>

							<div className="col-lg-4">
								<label htmlFor="noticePeriod" className="nameTitleForm">
									Notice Period
									<sup className="nameTitleFormStar">*</sup>
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon">
										<FontAwesomeIcon icon="hourglass-start" /> 
									</span> 
									<input type="text" name="noticePeriod" id="noticePeriod" 
									 className="form-control inputBox" value={this.state.noticePeriod}
									 onChange={this.handelChange.bind(this)} />
								</div> 
								<span id="noticePeriodError" className="errorMsg"></span>
							</div>

						</div>
						<div>
							<button className="buttonBack pull-right" onClick={this.handleSave.bind(this)}> 
								{this.state.buttonText}
							</button>
						</div>
						<div className=" AddressWrapper col-lg-12" >
							<div className="row">
								{
								this.state.experienceArry.length > 0
								?
								this.state.experienceArry.map((elem,index)=>{
									return(
									
										<div className="col-lg-6 AddressOuterWrapper" key={index}>
											<div className="col-lg-12 AddressInnerWrapper">
												<div className="row">
													<div className="col-lg-1 AddressBoxLeftIcon">
														<FontAwesomeIcon icon="map-marker-alt" />
													</div>
													<div className="col-lg-10">
														<div className="AddressBoxHead">
															Work Experience
														</div>
														<div className="AddressBoxText">
															{elem.companyName}
														</div>
														<div className="AddressBoxText">
															{elem.country}
														</div>
														<div className="AddressBoxText">
															{elem.city}
														</div>
														<div className="AddressBoxText">
															{elem.lastDegn}
														</div>
														<div className="AddressBoxText">
															{elem.department}
														</div>
														<div className="AddressBoxText">
															{elem.lastSalary}
														</div>
														<div className="AddressBoxText">
															{elem.fromDate}
														</div>
														<div className="AddressBoxText">
															{elem.toDate}
														</div>
														<div className="AddressBoxText">
															{elem.responsibilities}
														</div>
														<div className="AddressBoxText">
															{elem.reportingManager}
														</div>
														<div className="AddressBoxText">
															{elem.reportingManagerDegn}
														</div>
													</div>
													<div className="col-lg-1 AddressBoxRightIcon hoverEdit ">
														<div className="row">
															<FontAwesomeIcon icon="ellipsis-h" />
														
																<div className="rightIconHideWrapper" >
																<a id={elem._id} 
																   href={"/experience/"+this.state.candidateID+"/edit/"+elem._id}>
																	<div className="rightIconHide"   >
																		<FontAwesomeIcon icon="pencil-alt" /> 
																		<span className="rightIconHideRexr" >Edit</span>
																	</div>
																	</a>
																	<div className="rightIconHide">
																		<FontAwesomeIcon icon="trash-alt" /> 
																		<span className="rightIconHideRexr" id={elem._id} 
																		 onClick={this.deleteDate.bind(this)}>Delete</span>
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
					
						<button className="buttonBack pull-left" onClick={this.handleBack.bind(this)}> 
							<i className="fa fa-angle-left"> - Back</i>
						</button>
						
						<button className="buttonNext pull-right" onClick={this.handelSubmit.bind(this)}>
							Next - <i className="fa fa-angle-right "></i>
						</button>
					</form>
				</div>
			);
	}
}

export default withRouter(Academics);