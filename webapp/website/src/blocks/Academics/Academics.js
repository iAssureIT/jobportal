import React,{Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Moment               from 'moment';
import { withRouter }	 	from 'react-router-dom';
import Axios 			 	from 'axios';
import Swal 			 	from 'sweetalert2';
import { Multiselect }      from 'multiselect-react-dropdown';

import '../BasicInfoForm/BasicInfoForm.css';

class Academics extends Component{
	constructor(props){
		super(props);

		this.state={
			qualificationArray  : [],
			qualificationLevel  : "",
			candidateID         : this.props.match.params.candidateID,
			academicsID         : this.props.match.params.academicsID,
			qualification       : "",
			specialization      : "",
			college             : "",
			university   		: "",
			state               : "",
			country	            : "",	
			city                : "",
			grade               : "",
			mode                : "",
			passOutYear         : "",
			admisionYear        : "",
			buttonText          : "Save",
			
			
			DegreeArray               : [],
			classArray                : [],
			inputQualificationLevel   : [],
			inputUniversity   		  : [],
			inputCollege  		  	  : [],
			inputQualification        : [],
			inputMode                 : ["Part Time","Full Time","Work From Home"],
		}
	}
	componentDidMount(){
		this.getData();

			Axios.get("/api/qualificationlevelmaster/get/list")
			.then(response => {
				this.setState({inputQualificationLevel : response.data});
			})
			.catch(error=>{
				Swal.fire("Error while getting List data",error.message,'error');
			})

		Axios.get("/api/qualificationmaster/get/list")
			.then(response => {
				this.setState({
					inputQualification : response.data
				});
			})
			.catch(error=>{
				Swal.fire("Error while getting List data",error.message,'error');
			})	
		Axios.get("/api/universitymaster/get/list")
			.then(response => {
				
				this.setState({inputUniversity : response.data});
			})
			.catch(error=>{
				Swal.fire("Error while getting List data",error.message,'error');
			})	
		Axios.get("/api/collagemaster/get/list")
			.then(response => {
				
				this.setState({inputCollege : response.data});
			})
			.catch(error=>{
				Swal.fire("Error while getting List data",error.message,'error');
			})	

			if(this.props.match.params.academicsID){
			this.edit()

			}
		}

	//========== User Define Function Start ================
	getData(){
		Axios.get("/api/candidatemaster/get/one/"+this.state.candidateID)
		.then(response=>{
			
			 	this.setState({
						qualificationArray:response.data[0].academics,
						DegreeArray       :response.data[0].qualification,
						classArray        :response.data[0].qualificationlevel
			 	})
			 	
			 })
			 .catch(error=>{
			 	Swal.fire("Submit Error!",error.message,'error');
			 })
	}
	edit(){
		var candidateID = this.state.candidateID;
		var academicsID   = this.state.academicsID;
		if (academicsID) {
			var idData ={
				candidateID : this.state.candidateID,
				academicsID : this.state.academicsID,
			}
			Axios.post("/api/candidatemaster/post/getOneCandidateAcademics",idData)
			.then(response=>{
				var editData =response.data;
				
			 	this.setState({
			 		qualificationLevel  :editData[0].academics[0].qualificationLevel,
			 		qualification       :editData[0].academics[0].qualification,
			 		specialization      :editData[0].academics[0].specialization,
			 		college             :editData[0].academics[0].collegeSchool,
			 		university          :editData[0].academics[0].universityBoard,
			 		state               :editData[0].academics[0].state,
			 		city                :editData[0].academics[0].cityVillage,
			 		country             :editData[0].academics[0].country,
			 		grade               :editData[0].academics[0].grade,
			 		mode                :editData[0].academics[0].mode,
			 		passOutYear         :editData[0].academics[0].passOutYear,
			 		admisionYear        :editData[0].academics[0].admisionYear,
			 		buttonText          :"Update"
			 	})
			 	
			 })
			 .catch(error=>{
			 	Swal.fire("Submit Error!",error.message,'error');
			 })
		}
	}
	deleteDate(event){
		event.preventDefault();
		var data_id =  event.currentTarget.id;

		Swal.fire({
		title : 'Are you sure? you want to delete this Academics details!!!',
		text : 'You will not be able to recover this Academics details',
		icon : 'warning',
		showCancelButton : true,
		confirmButtonText : 'Yes, delete it!',
		cancelButtonColor : 'No, keep it',
		confirmButtonColor : '#d33',
	
	  }).then((result) =>{
		if(result.value){
			if(data_id){
				Axios.delete("/api/candidatemaster/deleteAcademics/"+this.state.candidateID+"/delete/"+data_id)
				.then(response =>{
						if(response.data.deleted===true){
						Swal.fire(
									'Deleted!',
									'Academics details has been deleted successfully!',
									'success'
							);
					}
			})
				.catch(error=>{
					
					Swal.fire(
								"Some problem occured deleting Academics details!",
								error.message,
								'error'
						)
				})
			}
				
				}else if (result.dismiss === Swal.DismissReason.cancel){
					
					Swal.fire(
						'Cancelled',
						'Your Academics details is safe :)',
						'error'
					)
				}
			})
	  this.getData();
	}

	handleChange(event){
		var value = event.currentTarget.value;
		var name  = event.currentTarget.name;

		
		this.setState({
			[name]:value,
		})
	}
	handleBack(event){
		event.preventDefault();
		this.props.history.push("/contact/"+this.state.candidateID);
	}
	
	handleSave(event){
		event.preventDefault();
		var status =  this.validateForm();
		
			var formValues = {
								candidateID   : this.state.candidateID,
								academicsID   : this.state.academicsID,
								academics:{
									qualificationLevel   : this.state.qualificationLevel,
									qualification        : this.state.qualification,
									specialization       : this.state.specialization,
									collegeSchool        : this.state.college,
									universityBoard      : this.state.university,
									state                : this.state.state,
									country              : this.state.country,
									cityVillage          : this.state.city,
									grade                : this.state.grade,
									mode                 : this.state.mode,
									passOutYear          : this.state.passOutYear,
									admisionYear         : this.state.admisionYear
								}
							}
		if(this.props.match.params.academicsID){
			this.updateData(formValues,event);
		}else{
			this.insetData(formValues,event);
		}
		this.getData();
	}
	updateData(formValues,event){
		var status =  this.validateForm();
		if(status==true){
					Axios.patch("/api/candidatemaster/patch/updateOneCandidateAcademics",formValues)
				 .then(response=>{
							Swal.fire("Congrats","Your Academics details update Successfully","success");
								this.setState({
											
												qualificationLevel  : "",
												qualification       : "",
												specialization      : "",
												college             : "",
												university   		: "",
												state               : "",
												country	            : "",	
												city                : "",
												grade               : "",
												mode                : "",
												passOutYear         : "",
												admisionYear        : "",
												buttonText         : "Save"
											
										})
							this.props.history.push("/academics/"+this.state.candidateID);
					})
					.catch(error =>{
						Swal.fire("Submit Error!",error.message,'error');
					});
				}

			
		}
	insetData(formValues,event){

		var status =  this.validateForm();
		if(status==true){
				Axios.patch("/api/candidatemaster/patch/addCandidateAcademics",formValues)
			 .then(response=>{
						
					Swal.fire("Congrats","Your Academics details insert Successfully","success");
						this.setState({
										
											qualificationLevel  : "",
											qualification       : "",
											specialization      : "",
											college             : "",
											university   		: "",
											state               : "",
											country	            : "",	
											city                : "",
											grade               : "",
											mode                : "",
											passOutYear         : "",
											admisionYear        : "",
											buttonText         : "Save"
										
									})
							
				})
				.catch(error =>{
					Swal.fire("Submit Error!",error.message,'error');
				});
			}
	}
	handleSubmit(event){
		event.preventDefault();
			this.props.history.push("/certification/"+this.state.candidateID);
	}
	//========== User Define Function End ==================
		//========== Validation Start ==================
	 validateForm=()=>{
		var status = true;
	
		if(this.state.grade.length<=0){
			document.getElementById("gradeError").innerHTML=  
			"Please enter your Grade";  
			status=false; 
		}else{
			document.getElementById("gradeError").innerHTML=  
			""; 
			status = true;
		}
		
		if(this.state.passOutYear.length<=0){
			document.getElementById("passOutYearError").innerHTML=  
			"Please enter your Pass Out Year";  
			status=false; 
		}else{
			document.getElementById("passOutYearError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.university.length<=0){
			document.getElementById("universityError").innerHTML=  
			"Please enter your University";  
			status=false; 
		}else{
			document.getElementById("universityError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.college.length<=0){
			document.getElementById("collegeError").innerHTML=  
			"Please enter your College";  
			status=false; 
		}else{
			document.getElementById("collegeError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.city.length<=0){
			document.getElementById("cityError").innerHTML=  
			"Please enter your City";  
			status=false; 
		}else{
			document.getElementById("cityError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.state.length<=0){
			document.getElementById("stateError").innerHTML=  
			"Please enter your State";  
			status=false; 
		}else{
			document.getElementById("stateError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.country.length<=0){
			document.getElementById("countryError").innerHTML=  
			"Please enter your Country";  
			status=false; 
		}else{
			document.getElementById("countryError").innerHTML=  
			""; 
			status = true;
		}
		
	
		
		 return status;
	}

	//========== Validation End ==================
	render(){
		return(
				<div className="col-lg-12 ">
					<form>

						<div className="row formWrapper">

							<div className="col-lg-4">
								<label htmlFor="qualificationLevel" className="nameTitleForm">
									Qualification Leval
									<sup className="nameTitleFormStar">*</sup>
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon">
										<FontAwesomeIcon icon="file-alt" />
									</span> 
									<select className="form-control inputBox" 
									 id="qualificationLevel" value={this.state.qualificationLevel}
									 name="qualificationLevel" onChange={this.handleChange.bind(this)}>
									  	<option > -- select -- </option>
									  	{
									  		this.state.inputQualificationLevel!=null
									  			 && this.state.inputQualificationLevel.length>0
									  		?	
									  			this.state.inputQualificationLevel.map((elem,index)=>{
									  				return(
									  					<option value={elem._id}  key={index}>
									  						{elem.qualificationLevel}
									  					</option>
									  				);
									  			})
									  			
									  		:
									  			null
									  	}
									</select>
								</div>
							</div>
							<div className="col-lg-4">
								<label htmlFor="qualification" className="nameTitleForm">
									Qualification
									<sup className="nameTitleFormStar">*</sup>
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon">
										<i className="fa fa-graduation-cap"></i>
									</span> 
									<select className="form-control inputBox" 
									 id="qualification" value={this.state.qualification} 
									 name="qualification" onChange={this.handleChange.bind(this)}>
									  	<option > -- select -- </option>
									  	{
									  		this.state.inputQualification!=null 
									  			&& this.state.inputQualification.length>0
									  		?	
									  			this.state.inputQualification.map((elem,index)=>{
									  				return(
									  					<option value={elem._id} key={index}>
									  						{elem.qualification}
									  					</option>
									  				);
									  			})
									  			
									  		:
									  			null
									  	}
									</select>
								</div>
							</div>
							<div className="col-lg-4">
								<label htmlFor="specialization" className="nameTitleForm">
									Specialization
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon">
										<i className="fa fa-graduation-cap"></i>
									</span> 
									<input type="text" name="specialization" id="specialization" 
									 className="form-control inputBox " 
									 value={this.state.specialization} 
									 onChange={this.handleChange.bind(this)} />
								</div> 
							</div>

						</div>

						<div className="row formWrapper">

							<div className="col-lg-4">
								<label htmlFor="grade" className="nameTitleForm">
									Grade/Marks/GPA
									<sup className="nameTitleFormStar">*</sup>
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon">
										<FontAwesomeIcon icon="file-alt" />
									</span> 
									<input type="text" name="grade" id="grade" 
										className="form-control inputBox" 
										value={this.state.grade} 
										onChange={this.handleChange.bind(this)} />
								</div> 
								<span id="gradeError" className="errorMsg"></span>
							</div>

							<div className="col-lg-4">
								<label htmlFor="mode" className="nameTitleForm">
									Mode
									<sup className="nameTitleFormStar">*</sup>
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon">
										<FontAwesomeIcon icon="adjust" />
									</span> 
									<select className="form-control inputBox" id="mode" 
									 value={this.state.mode} name="mode" 
									 onChange={this.handleChange.bind(this)}>
									  	<option > -- select -- </option>
									  	{
									  		this.state.inputMode.length > 0
									  		?	
									  			this.state.inputMode.map((elem,index)=>{
									  				return(
									  					<option value={elem._id} key={index}>
									  						{elem}
									  					</option>
									  				);
									  			})
									  			
									  		:
									  			null
									  	}
									</select>
								</div>
							</div>

							<div className="col-lg-4">
								<label htmlFor="admisionYear" className="nameTitleForm">
									Admission Year
									<sup className="nameTitleFormStar">*</sup>
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon">
										<i className="fa fa-calendar"></i>
									</span> 
									<input type="text" name="admisionYear" id="admisionYear" 
									 className="form-control inputBox" 
									 value={this.state.admisionYear} 
									 onChange={this.handleChange.bind(this)} />
								</div> 
								<span id="admisionYearError" className="errorMsg"></span>
							</div>

						</div>

						<div className="row formWrapper">

							<div className="col-lg-4">
								<label htmlFor="passOutYear" className="nameTitleForm">
									Pass-out-year
									<sup className="nameTitleFormStar">*</sup>
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon">
										<i className="fa fa-calendar"></i>
									</span> 
									<input type="text" name="passOutYear" id="passOutYear" 
									 className="form-control inputBox " 
									 value={this.state.passOutYear} 
									 onChange={this.handleChange.bind(this)} />
								</div> 
								<span id="passOutYearError" className="errorMsg"></span>
							</div>

							<div className="col-lg-4">
								<label htmlFor="college" className="nameTitleForm">
									College/School Name<sup className="nameTitleFormStar">*</sup>
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon">
										<FontAwesomeIcon icon="university" />
									</span> 
									<select className="form-control inputBox" id="college" 
									 value={this.state.college} name="college" 
									 onChange={this.handleChange.bind(this)}>
										  	<option > -- select -- </option>
										  	{
										  		this.state.inputCollege!=null 
										  			&& this.state.inputCollege.length>0
										  		?	
										  			this.state.inputCollege.map((elem,index)=>{
										  				return(
										  					<option value={elem._id} key={index}>
										  						{elem.collage}
										  					</option>
										  				);
										  			})
										  			
										  		:
										  			null
										  	}
										</select>
								</div> 
								<span id="collegeError" className="errorMsg"></span>
							</div>

							<div className="col-lg-4">
								<label htmlFor="university" className="nameTitleForm">
									University/Boards Name
									<sup className="nameTitleFormStar">*</sup>
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon">
										<FontAwesomeIcon icon="university" />
									</span> 
									<select className="form-control inputBox" id="university" value={this.state.university} name="university" onChange={this.handleChange.bind(this)}>
										  	<option > -- select -- </option>
										  	{
										  		this.state.inputUniversity!=null 
										  			&& this.state.inputUniversity.length>0
										  		?	
										  			this.state.inputUniversity.map((elem,index)=>{
										  				return(
										  					<option value={elem._id} key={index}>
										  						{elem.university}
										  					</option>
										  				);
										  			})
										  			
										  		:
										  			null
										  	}
										</select>
								</div> 
								<span id="universityError" className="errorMsg"></span>
							</div>

						</div>

						<div className="row formWrapper">
							<div className="col-lg-4">
								<label htmlFor="city" className="nameTitleForm">
									City
									<sup className="nameTitleFormStar">*</sup>
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon">
										<FontAwesomeIcon icon="city" /> 
									</span> 
									<input type="text" name="city" id="city" 
									 className="form-control inputBox" value={this.state.city} 
									 onChange={this.handleChange.bind(this)} />
								</div>
								<span id="cityError" className="errorMsg"></span>
							</div>

							<div className="col-lg-4">
								<label htmlFor="state" className="nameTitleForm">
									State
									<sup className="nameTitleFormStar">*</sup>
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon">
										<i className="fa fa-map"></i>
									</span> 
									<input type="text" name="state" id="state" 
									 className="form-control inputBox " 
									 value={this.state.state} 
									 onChange={this.handleChange.bind(this)} />
								</div> 
								<span id="stateError" className="errorMsg"></span>
							</div>
							
							<div className="col-lg-4">
								<label htmlFor="country" className="nameTitleForm">
									Country
									<sup className="nameTitleFormStar">*</sup>
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon">
										<i className="fa fa-flag"></i> 
									</span> 
									<input type="text" name="country" id="country" 
									 className="form-control inputBox" 
									 value={this.state.country} 
									 onChange={this.handleChange.bind(this)} />
								</div> 
								<span id="countryError" className="errorMsg"></span>
							</div>
						</div>
						<div>
							<button className="buttonBack pull-right" 
							 onClick={this.handleSave.bind(this)}> 
							 	{this.state.buttonText}
							 </button>
						</div>
						<div className=" AddressWrapper col-lg-12" >
							 <div className="row">
								{
								this.state.qualificationArray.length > 0
								?
								this.state.qualificationArray.map((elem,index)=>{
									return(
										<div className="col-lg-6 AddressOuterWrapper"  key={index}>
											<div className="col-lg-12 addWrapper">
												<div className="row">
													<div className="col-lg-4 addLeftWrapper">
														<div className="addLogoDiv">
															<FontAwesomeIcon icon="graduation-cap" /> 
														</div>

														<div>
															{
																this.state.DegreeArray.map((elem1,index)=>{
																	return(
																		<div className="addLogoTextDiv" key={index}>
																			{elem1.qualification}
																			
																		</div>
																	);
																})
															}
														</div>
															
														
													</div> 
													<div className="col-lg-8 addRightWrapper">
														<div className="row">
														<div className="addRightText ">
															<div>
																{
																	this.state.classArray.map((elem1,index)=>{
																		return(
																			<div className="AddressBoxText" key={index}>
																				{elem1.qualificationLevel}
																				
																			</div>
																		);
																	})
																}
															</div>
															<div className="AddressBoxText">
															{elem.specialization}
															</div>
															<div className="AddressBoxText">
																{elem.grade}
															</div>
															<div className="AddressBoxText">
																{elem.mode}
															</div>
															<div className="AddressBoxText">
																{elem.passOutYear}
															</div>
															<div className="AddressBoxText">
																{elem.admisionYear}
															</div>
															<div>
																{
																	this.state.inputCollege.map((elem1,index)=>{
																		return(
																			<div className="AddressBoxText" key={index}>
																				{elem1.collage}
																				
																			</div>
																		);
																	})
																}
															</div>
															<div>
																{
																	this.state.inputUniversity.map((elem1,index)=>{
																		return(
																			<div className="AddressBoxText" key={index}>
																				{elem1.university}
																				
																			</div>
																		);
																	})
																}
															</div>
															<div className="AddressBoxText">
																{elem.state}
															</div>
															<div className="AddressBoxText">
																{elem.country}
															</div>
															<div className="AddressBoxText">
																{elem.cityVillage}
															</div>
														</div>
														<div className="col-lg-12">
								                            <div className="addRightbtn">
								                                <a id={elem._id} href={"/academics/"+this.state.candidateID+"/edit/"+elem._id}>
								                            	    <div className="editBtn pull-left">Edit</div>
								                            	</a>
								                            	<div className="dltBtn pull-right" id={elem._id} onClick={this.deleteDate.bind(this)}>Delete</div>
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
						 	<FontAwesomeIcon className="backArrow" icon="arrow-left" /> 
							Back
						 </button>
						
						<button className="buttonNext pull-right" onClick={this.handleSubmit.bind(this)}>
							Next 
							<FontAwesomeIcon className="nextArrow" icon="arrow-right" />
						</button>
					</form>
				</div>
			);
	}
}

export default withRouter(Academics);