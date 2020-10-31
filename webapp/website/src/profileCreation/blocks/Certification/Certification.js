import React,{Component}   from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Multiselect }     from 'multiselect-react-dropdown';
import Axios 			   from 'axios';
import Swal 			   from 'sweetalert2';
import { withRouter }	   from 'react-router-dom';
import Moment              from 'moment';

import '../BasicInfoForm/BasicInfoForm.css';
import './Certification.css';

class Certification extends Component{
	constructor(props){
		super(props);

		this.state={
			certificationArry    : [],
			candidateID          : this.props.match.params.candidateID,
			skillCertificationID : this.props.match.params.skillCertificationID,
			certificationName    : "",
			issuedBy             : "",
			certifiedOn          : "",
			validity             : "",
			grade   		     : "",
			selectArry   		 : [],
			certificationToggel  : "toggleSkills",
			description          : "",
			rating               : "",
			buttonText           : "Save",
			primarySkillsArrya   :[],
			primarySkills        :[],
			secondarySkills      :[],
			otherSkills          :[],

			inputSecondarySkills : [],
			inputPrimarySkills 	 : [],
			inputOtherSkills 	 : [],
		}

		 this.style =  {
					      chips: {
					        backgroundColor: "#D3950A"
					      },
					      searchBox: {
					        border: "1px solid #D3950A",
					      	borderTopLeftRadius: "0px",
					        borderBottomLeftRadius: "0px"
					      },
					      multiselectContainer: {
					      	backgroundColor: "#242931",
					        color: "white",
					        zIndex:"5!important"
					      }, 
					      inputField: { 
							      fontSize:"13.5px",
							     marginLeft:"5px",
							     zIndex:"5!important"
						  },
						  option: {
						  backgroundColor: "#242933",
						  zIndex:"5!important"
						  },
						  optionContainer:{
						  	border: "1px solid #D3950A",
						  	zIndex:"5!important"
						  }
						};
	}
	componentDidMount(){
		this.getData();
		
		Axios.get("/api/skillmaster/get/list")
			.then(response => {
				this.setState({inputPrimarySkills : response.data});
				this.state.inputPrimarySkills!=null && this.state.inputPrimarySkills.length > 0 
				?
					this.state.inputPrimarySkills.map((elem,index)=>{
						
						this.state.primarySkills.push(elem.skill);
						
					})
				:
					this.state.primarySkills.push("select");
			})
			.catch(error=>{
				Swal.fire("Error while getting List data",error.message,'error');
			})

		Axios.get("/api/skillmaster/get/list")
		.then(response => {
			this.setState({inputSecondarySkills : response.data});
			this.state.inputSecondarySkills!=null && this.state.inputSecondarySkills.length > 0 
			?
				this.state.inputSecondarySkills.map((elem,index)=>{
					
					this.state.secondarySkills.push(elem.skill);
					
				})
			:
				this.state.secondarySkills.push("select");
		})
		.catch(error=>{
			Swal.fire("Error while getting List data",error.message,'error');
		})

		Axios.get("/api/skillmaster/get/list")
		.then(response => {
			this.setState({inputOtherSkills : response.data});
			this.state.inputOtherSkills!=null && this.state.inputOtherSkills.length > 0 
			?
				this.state.inputOtherSkills.map((elem,index)=>{
					
					this.state.otherSkills.push(elem.skill);
					
				})
			:
				this.state.otherSkills.push("select");
		})
		.catch(error=>{
			Swal.fire("Error while getting List data",error.message,'error');
		})

		if(this.props.match.params.skillCertificationID){
			this.edit()

			}
			
}

	//========== User Define Function Start ================
	getData(){
		Axios.get("/api/candidatemaster/get/one/"+this.state.candidateID)
		.then(response=>{
			
			 	this.setState({
						certificationArry:response.data[0].skillCertification
			 	})
			 })
			 .catch(error=>{
			 	Swal.fire("Submit Error!",error.message,'error');
			 })
	}
	edit(event){

		var candidateID = this.state.candidateID;
		var skillCertificationID   = this.state.skillCertificationID;
		if (skillCertificationID) {
			var idData ={
				candidateID : this.state.candidateID,
				skillCertificationID : this.state.skillCertificationID,
			}
			Axios.post("/api/candidatemaster/post/getOneCandidateSkill",idData)
			.then(response=>{
				var editData =response.data;
			 	this.setState({
			 		certificationName  :editData[0].skillCertification[0].certName,
			 		primarySkills      :editData[0].skillCertification[0].primarySkills,
			 		secondarySkills    :editData[0].skillCertification[0].secondarySkills,
			 		otherSkills        :editData[0].skillCertification[0].otherSkills,
			 		issuedBy           :editData[0].skillCertification[0].issuedBy,
			 		certifiedOn        :Moment(editData[0].skillCertification[0].certifiedOn).format("YYYY-MM-DD"),
			 		validity           :Moment(editData[0].skillCertification[0].validTill).format("YYYY-MM-DD"),
			 		description        :editData[0].skillCertification[0].skilldesc,
			 		rating             :editData[0].skillCertification[0].rating,
			 		grade              :editData[0].skillCertification[0].gradePercent,
			 		buttonText         :"Update"
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
		title : 'Are you sure? you want to delete this Certification Details!!!',
		text : 'You will not be able to recover this Certification Details',
		icon : 'warning',
		showCancelButton : true,
		confirmButtonText : 'Yes, delete it!',
		cancelButtonColor : 'No, keep it',
		confirmButtonColor : '#d33',
	
	  }).then((result) =>{
		if(result.value){
			if(data_id){
				Axios.delete("/api/candidatemaster/deleteSkill/"+this.state.candidateID+"/delete/"+data_id)
				.then(response =>{
						if(response.data.deleted===true){
						Swal.fire(
									'Deleted!',
									'Certification Details has been deleted successfully!',
									'success'
							);
					}
			})
				.catch(error=>{
					
					Swal.fire(
								"Some problem occured deleting Certification Details!",
								error.message,
								'error'
						)
				})
			}
				
				}else if (result.dismiss === Swal.DismissReason.cancel){
					
					Swal.fire(
						'Cancelled',
						'Your Certification details is safe :)',
						'error'
					)
				}
			})
	  this.getData();
	}

	handleBack(event){
		event.preventDefault();
		this.props.history.push("/academics/"+this.state.candidateID);
	}


	handleChange(event){
		var value = event.currentTarget.value;
		var name  = event.currentTarget.name;

		
		this.setState({
			[name]:value,
		})
	}
	changeBlock(event){
		event.preventDefault();
		var value = event.currentTarget.value;
		var id  = event.currentTarget.id;
		
		this.setState({
			certificationToggel:id,
		})
		
	}
	starClick(event){
		event.preventDefault();
		var value = event.currentTarget.value;
		var id  = event.currentTarget.id;

		var rating=this.state.rating;
		this.setState({
			rating:id,
		})
		console.log(rating);
	}
	handleSave(event){
		var status =  this.validateForm();
			 this.changeBlock(event);
				var formValues = {
					                candidateID   : this.state.candidateID,
					                skillCertificationID   : this.state.skillCertificationID,
						
									certName            : this.state.certificationName,
									issuedBy            : this.state.issuedBy,
									certifiedOn         : this.state.certifiedOn,
									validTill           : this.state.validity,
									gradePercent        : this.state.grade,
									skilldesc           : this.state.description,
									rating              : this.state.rating,
									primarySkills       : this.state.primarySkills,
									secondarySkills     : this.state.secondarySkills,
									otherSkills         : this.state.otherSkills
	
							}	
			console.log(formValues);
		if(this.props.match.params.skillCertificationID){
			this.updateData(formValues,event);
		}else{
			this.insetData(formValues,event);
		}
		this.getData();	
	}
	updateData(formValues,event){
		var status =  this.validateForm();
		
					Axios.patch("/api/candidatemaster/patch/updateOneCandidateSkill",formValues)
				 .then(response=>{

									Swal.fire("Congrats","Your Certification Details is update Successfully","success");
										this.setState({
													certificationName  : "",
													issuedBy           : "",
													certifiedOn        : "",
													validity           : "",
													grade   		   : "",
													description        : "",
													rating             : "",
													primarySkills      :[],
													secondarySkills    :[],
													otherSkills        :[],
													buttonText         : "Save"
												})
							this.props.history.push("/certification/"+this.state.candidateID);
					})
					.catch(error =>{
						console.log(error);
						Swal.fire("Submit Error!",error.message,'error');
					});
				

			
		}
	insetData(formValues,event){
			Axios.patch("/api/candidatemaster/patch/addCandidateSkill",formValues)
			 .then(response=>{
						 
								
						 	console.log(response.data);
								Swal.fire("Congrats","Your Certification Details is insert Successfully","success");
									this.setState({
													certificationName  : "",
													issuedBy           : "",
													certifiedOn        : "",
													validity           : "",
													grade   		   : "",
													description        : "",
													rating             : "",
													primarySkills      :[],
													secondarySkills    :[],
													otherSkills        :[],
													buttonText         : "Save"
												})

	
							
							
							
				})
				.catch(error =>{
					console.log(error);
					Swal.fire("Submit Error!",error.message,'error');
				});
	}
	handleSubmit(event){
		event.preventDefault();

	
		 this.props.history.push("/experience/"+this.state.candidateID);
							
							
			
			
	}
	//========== User Define Function End ==================
	//========== Validation Start ==================
	 validateForm=()=>{
	 	var status = true;

		

		// if(this.state.rating.length<=0){
		// 	document.getElementById("ratingError").innerHTML=  
		// 	"Please enter your rating";  
		// 	status=false; 
		// }else{
		// 	document.getElementById("ratingError").innerHTML=  
		// 	""; 
		// 	status = true;
		// }
		// if(this.state.certificationName.length<=0){
		// 	document.getElementById("certificationNameError").innerHTML=  
		// 	"Please enter your Certification Name";  
		// 	status=false; 
		// }else{
		// 	document.getElementById("certificationNameError").innerHTML=  
		// 	""; 
		// 	status = true;
		// }
		// if(this.state.issuedBy.length<=0){
		// 	document.getElementById("issuedByError").innerHTML=  
		// 	"Please enter your Issued By";  
		// 	status=false; 
		// }else{
		// 	document.getElementById("issuedByError").innerHTML=  
		// 	""; 
		// 	status = true;
		// }
		// if(this.state.certifiedOn.length<=0){
		// 	document.getElementById("certifiedOnError").innerHTML=  
		// 	"Please enter your Certified On";  
		// 	status=false; 
		// }else{
		// 	document.getElementById("certifiedOnError").innerHTML=  
		// 	""; 
		// 	status = true;
		// }


		// return status;
	}

	//========== Validation End ==================
	render(){
		
		return(
				<div className="col-lg-12 ">
					<form>

					
						<div className="row formWrapper">
							<div className="col-lg-4 col-lg-offset-4">
								<div className="input-group genderFeildWrapper">

									<div className ={ this.state.certificationToggel==="toggleSkills"? "genderFeild col-lg-6 genderFeildActive": "genderFeild col-lg-6"}  id="toggleSkills" name="certificationToggel" value="toggleSkills" onClick={this.changeBlock.bind(this)}>
										Enter Skills
									</div>
									<div className={this.state.certificationToggel === "toogleCertificate" ? "genderFeild col-lg-6 genderFeildActive": "genderFeild col-lg-6"} id="toogleCertificate" name="certificationToggel" value="toogleCertificate" onClick={this.changeBlock.bind(this)}>
										Enter Certification	
									</div>
									
								</div>
							</div>
						</div>
						{
							this.state.certificationToggel==="toggleSkills"
							?
								<div >
								<div className="row formWrapper">
									<div className="col-lg-6">
										<label htmlFor="primarySkills" className="nameTitleForm">Primary Skills <sup className="nameTitleFormStar">*</sup></label>
										<div className="input-group ">
											<span className="input-group-addon inputBoxIcon"><FontAwesomeIcon icon="chalkboard-teacher" /> </span> 
											<Multiselect  name="primarySkills" id="primarySkills" className="form-control " value={this.state.primarySkills} onChange={this.handleChange.bind(this)}
												options={this.state.primarySkills}
												isObject={false}
												style={this.style}
												selectionLimit="4"
												
											
											 />
										</div> 
										<span id="skillsError" className="errorMsg"></span>
									</div>
									<div className="col-lg-6">
										<label htmlFor="secondarySkills" className="nameTitleForm">Secondary Skills <sup className="nameTitleFormStar">*</sup></label>
										<div className="input-group ">
											<span className="input-group-addon inputBoxIcon"><FontAwesomeIcon icon="chalkboard-teacher" /> </span> 
											<Multiselect  name="secondarySkills" id="secondarySkills" className="form-control " value={this.state.secondarySkills} onChange={this.handleChange.bind(this)}
												options={this.state.secondarySkills}
												isObject={false}
												style={this.style}
												selectionLimit="4"
											
											
											 />
										</div> 
										<span id="skillsError" className="errorMsg"></span>
									</div>
								</div>
								<div className="row formWrapper">
									<div className="col-lg-6">
										<label htmlFor="otherSkills" className="nameTitleForm">Other Skills <sup className="nameTitleFormStar">*</sup></label>
										<div className="input-group ">
											<span className="input-group-addon inputBoxIcon"><FontAwesomeIcon icon="chalkboard-teacher" /> </span> 
											<Multiselect  name="otherSkills" id="otherSkills" className="form-control otherSkills" value={this.state.otherSkills} onChange={this.handleChange.bind(this)}
												options={this.state.otherSkills}
												isObject={false}
												style={this.style}
												selectionLimit="4"
												
											
											 />
										</div> 
										<span id="skillsError" className="errorMsg"></span>
									</div>
									

									<div className="col-lg-4">
										<label htmlFor="rating" className="nameTitleForm">How do you rate yourself  <sup className="nameTitleFormStar">*</sup></label>
										<div className="input-group ">
											<span className={this.state.rating=== "star1"||this.state.rating=== "star2"||this.state.rating=== "star3"||this.state.rating=== "star4"||this.state.rating=== "star5"? "fa fa-star rating stars":"fa fa-star-o rating"} id="star1" name="rating" value="start1" onClick={this.starClick.bind(this)}></span>
											<span className={this.state.rating === "star2"||this.state.rating=== "star3"||this.state.rating=== "star4"||this.state.rating=== "star5"? "fa fa-star rating stars":"fa fa-star-o rating"} id="star2" name="rating" value="star2" onClick={this.starClick.bind(this)}></span>
											<span className={this.state.rating === "star3"||this.state.rating=== "star4"||this.state.rating=== "star5"? "fa fa-star rating stars":"fa fa-star-o rating"} id="star3" name="rating" value="star3" onClick={this.starClick.bind(this)}></span>
											<span className={this.state.rating === "star4" ||this.state.rating=== "star5"? "fa fa-star rating stars":"fa fa-star-o rating"} id="star4" name="rating" value="star4" onClick={this.starClick.bind(this)}></span>
											<span className={this.state.rating === "star5" ? "fa fa-star rating stars":"fa fa-star-o rating"} id="star5" name="rating" value="star5" onClick={this.starClick.bind(this)}></span>
										</div> 
										<span id="ratingError" className="errorMsg"></span>
									</div>

								</div>
								<div className="row formWrapper">
									<div className="col-lg-12">
										<label htmlFor="description" className="nameTitleForm description">Description</label>
										<div className="input-group col-lg-12">
											<textarea type="text" name="description" id="description" className="form-control inputBox textareaFix" rows="5"  value={this.state.description} onChange={this.handleChange.bind(this)} />
										</div> 
									</div>
								</div>
							</div>
							:
							<div >
						
							<div className="row formWrapper">

								<div className="col-lg-4">
									<label htmlFor="certificationName" className="nameTitleForm">Certification Name<sup className="nameTitleFormStar">*</sup></label>
									<div className="input-group ">
										<span className="input-group-addon inputBoxIcon"><FontAwesomeIcon icon="chalkboard-teacher" /></span> 
										<input type="text" name="certificationName" id="certificationName" className="form-control inputBox " value={this.state.certificationName} onChange={this.handleChange.bind(this)} />
									</div> 
									<span id="certificationNameError" className="errorMsg"></span>
								</div>

								<div className="col-lg-4">
									<label htmlFor="issuedBy" className="nameTitleForm">Issued By<sup className="nameTitleFormStar">*</sup></label>
									<div className="input-group ">
										<span className="input-group-addon inputBoxIcon"><i className="fa fa-user-circle"></i></span> 
										<input type="text" name="issuedBy" id="issuedBy" className="form-control inputBox " value={this.state.issuedBy} onChange={this.handleChange.bind(this)} />
									</div> 
									<span id="issuedByError" className="errorMsg"></span>
								</div>

								<div className="col-lg-4">
									<label htmlFor="certifiedOn" className="nameTitleForm">Certified ON<sup className="nameTitleFormStar">*</sup></label>
									<div className="input-group ">
										<span className="input-group-addon inputBoxIcon"><FontAwesomeIcon icon="chalkboard-teacher" /></span> 
										<input type="Date" name="certifiedOn" id="certifiedOn" className="form-control inputBox " value={this.state.certifiedOn} onChange={this.handleChange.bind(this)} />
									</div> 
									<span id="certifiedOnError" className="errorMsg"></span>
								</div>

							</div>

							<div className="row formWrapper">

								<div className="col-lg-4">
									<label htmlFor="validity" className="nameTitleForm">Valid Till<sup className="nameTitleFormStar">*</sup></label>
									<div className="input-group ">
										<span className="input-group-addon inputBoxIcon"><i className="fa fa-calendar"></i> </span> 
										<input type="date" name="validity" id="validity" className="form-control inputBox" value={this.state.validity} onChange={this.handleChange.bind(this)} />
									</div> 
								</div>

								<div className="col-lg-4">
									<label htmlFor="grade" className="nameTitleForm">Grade / Percentage  <sup className="nameTitleFormStar">*</sup></label>
									<div className="input-group ">
										<span className="input-group-addon inputBoxIcon"><FontAwesomeIcon icon="file-alt" /></span> 
										<input type="text" name="grade" id="grade" className="form-control inputBox" value={this.state.grade} onChange={this.handleChange.bind(this)} />
									</div> 
								</div>

							</div>
						</div>

						}
						<div>
							<button className="buttonBack pull-right" onClick={this.handleSave.bind(this)}> {this.state.buttonText}</button>
						</div>
						
						<div className=" AddressWrapper col-lg-12" >
							 <div className="row">
								{
								this.state.certificationArry.length > 0
								?
								this.state.certificationArry.map((elem,index)=>{
									return(
									
										<div className="col-lg-6 AddressOuterWrapper" key={index}>
											<div className="col-lg-12 AddressInnerWrapper">
												<div className="row">
													<div className="col-lg-1 AddressBoxLeftIcon">
														<FontAwesomeIcon icon="map-marker-alt" />
													</div>
													<div className="col-lg-10">
														<div className="AddressBoxHead">
															Certification Details
														</div>
														<div className="AddressBoxText">
															{elem.primarySkills}
														</div>
														<div className="AddressBoxText">
															{elem.secondarySkills}
														</div>
														<div className="AddressBoxText">
															{elem.otherSkills}
														</div>
														<div className="AddressBoxText">
															{elem.rating}
														</div>
														<div className="AddressBoxText">
															{elem.skilldesc}
														</div>
														<div className="AddressBoxText">
															{elem.certName}
														</div>
														<div className="AddressBoxText">
															{elem.issuedBy}
														</div>
														<div className="AddressBoxText">
															{elem.certifiedOn}
														</div>
														<div className="AddressBoxText">
															{elem.validTill}
														</div>
														<div className="AddressBoxText">
															{elem.gradePercent}
														</div>
												
													</div>
													<div className="col-lg-1 AddressBoxRightIcon hoverEdit ">
														<div className="row">
															<FontAwesomeIcon icon="ellipsis-h" />
														
																<div className="rightIconHideWrapper" >
																<a id={elem._id} href={"/certification/"+this.state.candidateID+"/edit/"+elem._id}>
																	<div className="rightIconHide"   >
																		<FontAwesomeIcon icon="pencil-alt" /> 
																		<span className="rightIconHideRexr" >Edit</span>
																	</div>
																	</a>
																	<div className="rightIconHide">
																		<FontAwesomeIcon icon="trash-alt" /> 
																		<span className="rightIconHideRexr" id={elem._id} onClick={this.deleteDate.bind(this)}>Delete</span>
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

						<button className="buttonBack pull-left" onClick={this.handleBack.bind(this)}> <i className="fa fa-angle-left"> - Back</i></button>
				
						<button className="buttonNext pull-right" onClick={this.handleSubmit.bind(this)}>Next - <i className="fa fa-angle-right "></i></button>
					</form>
				</div>
			);
	}
}

export default withRouter(Certification);