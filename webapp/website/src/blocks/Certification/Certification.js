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
			candidate_id         : this.props.match.params.candidate_id,
			skillCertificationID : this.props.match.params.skillCertificationID,
			certificationID      : this.props.match.params.certificationID,
			certificationName    : "",
			issuedBy             : "",
			certifiedOn          : "",
			validity             : "",
			grade   		     : "",
			selectArry   		 : [],
			certificationToggel  : "toggleSkills",
			rating               : "",
			buttonText           : "Save",
			skillsArrya          : [],
			skills               : "",
            skills_id            : "",
            skillslist           : [],
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

				this.setState({skillslist : response.data});
				console.log('skillslist', this.state.skillslist);
			})
			.catch(error=>{
				Swal.fire("Error while getting List data",error.message,'error');
			})
			


		if(this.props.match.params.certificationID){
			this.edit()

			}
			
}

	//========== User Define Function Start ================
	onChangeSkills(event){
        const {name,value} = event.target;
        console.log('value',value);
        this.setState({ [name]:value });  
        
        var skills_id;
        if (document.querySelector('#skills option[value="' + value + '"]')) {
            skills_id = document.querySelector('#skills option[value="' + value + '"]').getAttribute("data-value")
        }else{ skills_id = "" }

        this.setState({ skills_id : skills_id });  
    } 
	
	getData(){
		Axios.get("/api/candidatemaster/get/one/"+this.state.candidate_id)
		.then(response=>{
			
			 	this.setState({
						certificationArry:response.data[0].certifications
			 	})
			 })
			 .catch(error=>{
			 	Swal.fire("Submit Error!",error.message,'error');
			 })
	}
	edit(event){
		event.preventDefault();
		if(this.state.certificationToggel==="toogleCertificate"){
			var candidate_id = this.state.candidate_id;
			var certificationID   = this.state.certificationID;
			if (certificationID) {
				var idData ={
					candidate_id : this.state.candidate_id,
					certificationID : this.state.certificationID,
				}
				Axios.post("/api/candidatemaster/post/getOneCandidateCertification",idData)
				.then(response=>{
					var editData =response.data;
				 	this.setState({
				 		certificationName          :editData[0].skillCertification[0].certName,
				 		issuedBy                   :editData[0].skillCertification[0].issuedBy,
				 		certifiedOn                :Moment(editData[0].skillCertification[0].certifiedOn).format("YYYY-MM-DD"),
				 		validity                   :Moment(editData[0].skillCertification[0].validTill).format("YYYY-MM-DD"),
				 		rating                     :editData[0].skillCertification[0].rating,
				 		grade                      :editData[0].skillCertification[0].gradePercent,
				 		buttonText                 :"Update"
				 	})
				 	
				 })
				 .catch(error=>{
				 	Swal.fire("Submit Error!",error.message,'error');
				 })
			}
		}
	}
	deleteDate(event){
		event.preventDefault();
		var data_id =  event.currentTarget.id;
		console.log("data_id",data_id);
		if(this.state.certificationToggel==="toggleSkills"){

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
					Axios.delete("/api/candidatemaster/deleteSkill/"+this.state.candidate_id+"/delete/"+data_id)
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
		  
		}else{
			console.log("you click");
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
					Axios.delete("/api/candidatemaster/deleteCertification/"+this.state.candidate_id+"/delete/"+data_id)
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
		
	}

	handleBack(event){
		event.preventDefault();
		this.props.history.push("/academics/"+this.state.candidate_id);
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
	}
	handleSave(event){
		var status =  this.validateForm();
		this.changeBlock(event);
		if(this.state.certificationToggel==="toggleSkills"){
			var formValues = {
					                candidate_id               : this.state.candidate_id,
					                skillCertificationID       : this.state.skillCertificationID,
					                skills:{
					                	skills                 : this.state.skills,
										rating                 : this.state.rating,
										skills_id              : this.state.skills_id
					                }
					                
							}
							console.log(formValues);
		}else{
			var formValues = {
					                candidate_id               : this.state.candidate_id,
					                certificationID            : this.state.certificationID,
					                certifications:{
					                	certName               : this.state.certificationName,
										issuedBy               : this.state.issuedBy,
										certifiedOn            : this.state.certifiedOn,
										validTill              : this.state.validity,
										gradePercent           : this.state.grade,
					                }
									
									
									
							}	
		}
			 
				
		if(this.props.match.params.skillCertificationID 
			|| this.props.match.params.certificationID )
		{
			this.updateData(formValues,event);
		}else{
			this.insetData(formValues,event);
		}
		this.getData();	
	}
	updateData(formValues,event){
		var status =  this.validateForm();
		if(this.state.certificationToggel==="toggleSkills"){
			Axios.patch("/api/candidatemaster/patch/updateOneCandidateSkill",formValues)
				 .then(response=>{

									Swal.fire("Congrats","Your Certification Details is update Successfully","success");
										this.setState({
													skills             : [],
													buttonText         : "Save",
													rating             : "",
												})
							this.props.history.push("/certification/"+this.state.candidate_id);
					})
					.catch(error =>{
						Swal.fire("Submit Error!",error.message,'error');
					});
				}
				else{
					Axios.patch("/api/candidatemaster/patch/updateOneCandidateCertification",formValues)
				 .then(response=>{

									Swal.fire("Congrats","Your Certification Details is update Successfully","success");
										this.setState({
													certificationName  : "",
													issuedBy           : "",
													certifiedOn        : "",
													validity           : "",
													grade   		   : "",
												
													buttonText         : "Save"
												})
							this.props.history.push("/certification/"+this.state.candidate_id);
					})
					.catch(error =>{
						Swal.fire("Submit Error!",error.message,'error');
					});
				}
				

			
		}
	insetData(formValues,event){
		if(this.state.certificationToggel==="toggleSkills"){
			Axios.patch("/api/candidatemaster/patch/addCandidateSkill",formValues)
			 .then(response=>{

					Swal.fire("Congrats","Your Certification Details is insert Successfully","success");
						this.setState({
										skills             : [],
										rating             : "",
										buttonText         : "Save"
									})
	
				})
				.catch(error =>{
					Swal.fire("Submit Error!",error.message,'error');
				});
			}else{
				Axios.patch("/api/candidatemaster/patch/addCandidateCertification",formValues)
			 .then(response=>{

					Swal.fire("Congrats","Your Certification Details is insert Successfully","success");
						this.setState({
										certificationName  : "",
										issuedBy           : "",
										certifiedOn        : "",
										validity           : "",
										grade   		   : "",
										buttonText         : "Save"
									})
				console.log("formWrapper",formValues);
				})
				.catch(error =>{
					Swal.fire("Submit Error!",error.message,'error');
				});
			}
	}
	handleSubmit(event){
		event.preventDefault();
		 this.props.history.push("/experience/"+this.state.candidate_id);
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

									<div className ={ this.state.certificationToggel==="toggleSkills"
													 ? "genderFeild col-lg-6 genderFeildActive"
													 : "genderFeild col-lg-6"}  
										 id="toggleSkills" name="certificationToggel" 
										 value="toggleSkills" onClick={this.changeBlock.bind(this)}
									>
											Enter Skills
									</div>
									<div className={this.state.certificationToggel === "toogleCertificate" 
													? "genderFeild col-lg-6 genderFeildActive"
													: "genderFeild col-lg-6"} 
										id="toogleCertificate" name="certificationToggel" 
										value="toogleCertificate" onClick={this.changeBlock.bind(this)}
									>
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
									
									<div className="col-lg-1 ">
										{/*<div className="tooltip">Hover over me
										  <span className="tooltiptext">Tooltip text</span>
										</div>*/}
										
										<div className="customCheckBox">
											
										
											<label  className="">
												<input type="checkbox"  />
											    <span class="checkmark"></span>
											</label>
										</div>
										
										    
										
									</div>
									<div className="col-lg-6">
										<label htmlFor="skills" className="nameTitleForm">
											Primary Skills 
											<sup className="nameTitleFormStar">*</sup>
										</label>
										<div className="input-group ">
											<span className="input-group-addon inputBoxIcon">
												<FontAwesomeIcon icon="chalkboard-teacher" /> 
											</span> 
											<input type="text" list="skills" 
											 className="form-control inputBox" 
											 refs="skills" name="skills" 
											 id="selectskills" 
											 maxLength="100" value={this.state.skills} 
											 data-value={this.state.skills_id}
											 onChange={this.onChangeSkills.bind(this)} />
											<datalist name="skills" id="skills" className="skillslist" >
												{this.state.skillslist.map((item, key) =>
												    <option key={key} value={item.skill} data-value={item._id}/>
												)}
											</datalist>
										</div> 
										<span id="skillsError" className="errorMsg"></span>
									</div>

									<div className="col-lg-4">
										<label htmlFor="rating" className="nameTitleForm">How do you rate yourself  <sup className="nameTitleFormStar">*</sup></label>
										<div className="input-group ">
											<span className={this.state.rating=== "star1B"||this.state.rating=== "star2B"||this.state.rating=== "star3B"||this.state.rating=== "star4B"||this.state.rating=== "star5B"? "fa fa-star rating stars":"fa fa-star-o rating"} id="star1B" name="rating" value="star1B" onClick={this.starClick.bind(this)}></span>
											<span className={this.state.rating === "star2B"||this.state.rating=== "star3B"||this.state.rating=== "star4B"||this.state.rating=== "star5B"? "fa fa-star rating stars":"fa fa-star-o rating"} id="star2B" name="rating" value="star2B" onClick={this.starClick.bind(this)}></span>
											<span className={this.state.rating === "star3B"||this.state.rating=== "star4B"||this.state.rating=== "star5B"? "fa fa-star rating stars":"fa fa-star-o rating"} id="star3B" name="rating" value="star3B" onClick={this.starClick.bind(this)}></span>
											<span className={this.state.rating === "star4B" ||this.state.rating=== "star5B"? "fa fa-star rating stars":"fa fa-star-o rating"} id="star4B" name="rating" value="star4B" onClick={this.starClick.bind(this)}></span>
											<span className={this.state.rating === "star5B" ? "fa fa-star rating stars":"fa fa-star-o rating"} id="star5B" name="rating" value="star5B" onClick={this.starClick.bind(this)}></span>
										</div> 
										<span id="ratingError" className="errorMsg"></span>
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
										<input type="Date" name="certifiedOn" id="certifiedOn" className="form-control inputBox date" value={this.state.certifiedOn} onChange={this.handleChange.bind(this)} />
									</div> 
									<span id="certifiedOnError" className="errorMsg"></span>
								</div>

							</div>

							<div className="row formWrapper">

								<div className="col-lg-4">
									<label htmlFor="validity" className="nameTitleForm">Valid Till<sup className="nameTitleFormStar">*</sup></label>
									<div className="input-group ">
										<span className="input-group-addon inputBoxIcon"><i className="fa fa-calendar"></i> </span> 
										<input type="date" name="validity" id="validity" className="form-control inputBox date" value={this.state.validity} onChange={this.handleChange.bind(this)} />
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
						
						{
							this.state.certificationToggel==="toogleCertificate"
							?
							<div className=" AddressWrapper col-lg-12" >
								 <div className="row">
									{
									this.state.certificationArry.length > 0
									?
									this.state.certificationArry.map((elem,index)=>{
										return(
										
											<div className="col-lg-6 " key={index}>
												<div className="col-lg-12 certifiedWrapper">
													<div className="col-lg-12 certificateTitleWrapperd">
														<div className="row">
															<div className="certificateTitle">
																Certificate
															</div>
														</div>
													</div>
													<div className="certificateLogoWrppaer">
														<img className="certificateLogo" src="/images/56.png" alt="certificateLogo"/>
													</div>
													<div className="certificateText">
														This certificate is proudly presented to
													</div>
													<div className="certificateNameText1">
														Digvijay Mohite
													</div>
													<div className="certificateText">
														for
													</div>
													<div className="certificateNameText1">
														{elem.certName}
													</div>
													<div className="col-ld-12 certificateFooter">
														<div className="row">
															<div className="col-lg-4 col-lg-offset-1 IssueDate">
																<div className="certificateNameText2">{Moment(elem.certifiedOn).format("YYYY-MM-DD")} </div>
																<div className="certificateText2">date</div>
															</div>
															<div className="col-lg-2">
																<img className="certificateLogo2" src="/images/57.png" alt="certificateLogo"/>
															</div>
															<div className="col-lg-4 IssueDate">
																<div className="certificateNameText2">{elem.issuedBy}</div>
																<div className="certificateText2">Issued By</div>
															</div>
														</div>
													</div>
													<div className="AddressBoxRightIcon hoverEdit pull-right">
														<div className="row">
															<FontAwesomeIcon icon="ellipsis-h" />
															<div className="rightIconHideWrapper" >
															
																<div className="rightIconHide"   >
																	<a id={elem._id} href={"/certification/"+this.state.candidate_id+"/edit/"+elem._id}>
																		<FontAwesomeIcon icon="pencil-alt" /> 
																		<span className="rightIconHideText" >Edit</span>
																	</a>
																</div>
																
																<div className="rightIconHide">
																	<FontAwesomeIcon icon="trash-alt" /> 
																	<span className="rightIconHideText" i onClick={this.deleteDate.bind(this)}>Delete</span>
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
							:
							<div className="AddressWrapper col-lg-12">
								
							</div>
						}
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

export default withRouter(Certification);