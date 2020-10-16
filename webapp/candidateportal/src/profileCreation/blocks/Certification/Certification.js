import React,{Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../BasicInfoForm/BasicInfoForm.css';
import './Certification.css';

class Certification extends Component{
	constructor(props){
		super(props);

		this.state={
			certificationName  : "",
			issuedBy           : "",
			certifiedOn        : "",
			validity           : "",
			grade   		   : "",
			certificationToggel: "toggleSkills",
			skills             : "",
			description        : "",
			rating             : "",
			display            : "block",
		}
	}

	//========== User Define Function Start ================


	handelChange(event){
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
	handelSubmit(event){
		event.preventDefault();
		var status =  this.validateForm();
			 this.changeBlock(event);
			if(!this.state.certificationToggel==="toggleSkills" ){
				var formValues = {
								certificationName   : this.state.certificationName,
								issuedBy            : this.state.issuedBy,
								certifiedOn         : this.state.certifiedOn,
								validity            : this.state.validity,
								grade               : this.state.grade,
	
								
							}
							console.log(formValues);
							this.setState({
											certificationName  : "",
											issuedBy           : "",
											certifiedOn        : "",
											validity           : "",
											grade   		   : "",
										})
			}else{
				var formValues = {
								skills              : this.state.skills,
								description         : this.state.description,
								rating              : this.state.rating,
							}
							console.log(formValues);
							this.setState({
											skills             : "",
											description        : "",
											rating             : "",
									
										})
			}
		

		
	}
	//========== User Define Function End ==================
	//========== Validation Start ==================
	 validateForm=()=>{
	 	var status = true;

		if(this.state.skills.length<=0){
			document.getElementById("skillsError").innerHTML=  
			"Please enter your skills";  
			status=false; 
		}else{
			document.getElementById("skillsError").innerHTML=  
			""; 
			status = true;
		}

		if(this.state.rating.length<=0){
			document.getElementById("ratingError").innerHTML=  
			"Please enter your rating";  
			status=false; 
		}else{
			document.getElementById("ratingError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.certificationName.length<=0){
			document.getElementById("certificationNameError").innerHTML=  
			"Please enter your Certification Name";  
			status=false; 
		}else{
			document.getElementById("certificationNameError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.issuedBy.length<=0){
			document.getElementById("issuedByError").innerHTML=  
			"Please enter your Issued By";  
			status=false; 
		}else{
			document.getElementById("issuedByError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.certifiedOn.length<=0){
			document.getElementById("certifiedOnError").innerHTML=  
			"Please enter your Certified On";  
			status=false; 
		}else{
			document.getElementById("certifiedOnError").innerHTML=  
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

									<div className="col-lg-8">
										<label htmlFor="skills" className="nameTitleForm">Skills<sup className="nameTitleFormStar">*</sup></label>
										<div className="input-group ">
											<span className="input-group-addon inputBoxIcon"><FontAwesomeIcon icon="chalkboard-teacher" /> </span> 
											<input type="text"placeholder="Enter Skill Name or Certification Name" name="skills" id="skills" className="form-control inputBox" value={this.state.skills} onChange={this.handelChange.bind(this)} />
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
										<label htmlFor="description" className="nameTitleForm">Description</label>
										<div className="input-group col-lg-12">
											<textarea type="text" name="description" id="description" className="form-control inputBox textareaFix" rows="5"  value={this.state.description} onChange={this.handelChange.bind(this)} />
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
										<input type="text" name="certificationName" id="certificationName" className="form-control inputBox " value={this.state.certificationName} onChange={this.handelChange.bind(this)} />
									</div> 
									<span id="certificationNameError" className="errorMsg"></span>
								</div>

								<div className="col-lg-4">
									<label htmlFor="issuedBy" className="nameTitleForm">Issued By<sup className="nameTitleFormStar">*</sup></label>
									<div className="input-group ">
										<span className="input-group-addon inputBoxIcon"><i className="fa fa-user-circle"></i></span> 
										<input type="text" name="issuedBy" id="issuedBy" className="form-control inputBox " value={this.state.issuedBy} onChange={this.handelChange.bind(this)} />
									</div> 
									<span id="issuedByError" className="errorMsg"></span>
								</div>

								<div className="col-lg-4">
									<label htmlFor="certifiedOn" className="nameTitleForm">Certified ON<sup className="nameTitleFormStar">*</sup></label>
									<div className="input-group ">
										<span className="input-group-addon inputBoxIcon"><FontAwesomeIcon icon="chalkboard-teacher" /></span> 
										<input type="text" name="certifiedOn" id="certifiedOn" className="form-control inputBox " value={this.state.certifiedOn} onChange={this.handelChange.bind(this)} />
									</div> 
									<span id="certifiedOnError" className="errorMsg"></span>
								</div>

							</div>

							<div className="row formWrapper">

								<div className="col-lg-4">
									<label htmlFor="validity" className="nameTitleForm">Valid Till<sup className="nameTitleFormStar">*</sup></label>
									<div className="input-group ">
										<span className="input-group-addon inputBoxIcon"><i className="fa fa-calendar"></i> </span> 
										<input type="date" name="validity" id="validity" className="form-control inputBox" value={this.state.validity} onChange={this.handelChange.bind(this)} />
									</div> 
								</div>

								<div className="col-lg-4">
									<label htmlFor="grade" className="nameTitleForm">Grade / Percentage  <sup className="nameTitleFormStar">*</sup></label>
									<div className="input-group ">
										<span className="input-group-addon inputBoxIcon"><FontAwesomeIcon icon="file-alt" /></span> 
										<input type="text" name="grade" id="grade" className="form-control inputBox" value={this.state.grade} onChange={this.handelChange.bind(this)} />
									</div> 
								</div>

							</div>
						</div>
						}

						<button className="buttonBack pull-left" onClick={this.handelSubmit.bind(this)}> <i className="fa fa-angle-left"> - Back</i></button>
						<button className="buttonNext pull-right" onClick={this.handelSubmit.bind(this)}>Next - <i className="fa fa-angle-right "></i></button>
					</form>
				</div>
			);
	}
}

export default Certification;