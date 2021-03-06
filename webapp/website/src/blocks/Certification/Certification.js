import React,{Component}   from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Multiselect }     from 'multiselect-react-dropdown';
import Axios 			   from 'axios';
import Swal 			   from 'sweetalert2';
import $ from 'jquery';
import axios from 'axios';
import { connect }        	from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../common/actions/index';
import { withRouter }	   from 'react-router-dom';
import Moment              from 'moment';
import IAssureTable 	   from '../../coreadmin/IAssureTable/IAssureTable.jsx';	
import '../BasicInfoForm/BasicInfoForm.css';
import './Certification.css';

class Certification extends Component{
	constructor(props){ 
		super(props);

		this.state={
			basicInfo 		 	 : [],
			certificationArry    : [],
			candidate_id         : this.props.match.params.candidate_id,
			certificationID      : this.props.match.params.certificationID,
			certificationName    : "",
			issuedBy             : "",
			certifiedOn          : "",
			validity             : "",
			grade   		     : "",
			experience   		 : "",
			selectArry   		 : [],
			certificationToggel  : false,
			rating               : "",
			buttonText           : "Save",
			skillsArrya          : [],
			skills               : "",
            skills_id            : "",
            skillslist           : [],
            isPrimary            : true,
            primarySkills        :"",
            secondarySkills      :"",
            profileCompletion  	 : 0,
            tableHeading 	    : 	{
						            	skill 		: "Skill",
						            	skillType 	: "Type",
						            	rating 		: "Rating",
						            	experience 	: "Experience",
						            	actions     : 'Action',
	          					 	},
			tableObjects 	    : 	{
				paginationApply : false,
	          	searchApply     : false,
	          	//editUrl         : '/' + this.props.entity + "/statutory-details/" + this.props.match.params.entityID,
	          	deleteMethod    : 'delete',
        	  	apiLink         : '/api/candidatemaster/deleteSkill/' + this.props.match.params.candidate_id,
	          	downloadApply   : false
	      	},
	      	"startRange"        : 0,
            "limitRange"       	: 10,
            "IdToDelete" 		: "",	
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
		const userDetails = JSON.parse(localStorage.getItem("userDetails"));
	    const token = userDetails.token;
	    Axios.defaults.headers.common['Authorization'] = 'Bearer '+ token;

		this.getData();
		var {mapAction} = this.props;
		

		Axios.post("/api/skillmaster/get/list", {"startRange":0,"limitRange":10000})
			.then(response => {
				this.setState({skillslist : response.data});
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
			                var userDetails = {
			                    loggedIn    : false,
			                    username  :"",  
			                    firstName   : "", 
			                    lastName    : "", 
			                    email     : "",
			                    phone     : "", 
			                    user_id     : "",
			                    roles     : [],
			                    token     : "", 
			                    gender    : "", 
			                    profilePicture : "",
			                    candidate_id: "",
			                    profileCompletion : 0
			                    }
			                    mapAction.setUserDetails(userDetails);
			                    document.getElementById("loginbtndiv").click();
			                    }
			                  });
		            }else{	
		            	Swal.fire('', "Error while getting List data", '');
		            }
			})
		
		if(this.props.match.params.certificationID){
			this.edit()
		}			
	}

	//========== User Define Function Start ================
	 handleSwitch (){
  			this.setState({
  				isPrimary: !this.state.isPrimary
  			});
    }
	onChangeSkills(event){
        const {name,value} = event.target;
       
        this.setState({ [name]:value });  
        
        var skills_id;
        if (document.querySelector('#skills option[value="' + value + '"]')) {
            skills_id = document.querySelector('#skills option[value="' + value + '"]').getAttribute("data-value")
        }else{ skills_id = "" }

        this.setState({ skills_id : skills_id });  
    } 
	
	getData(){
		var {mapAction} = this.props;
		Axios.get("/api/candidatemaster/get/one/"+this.state.candidate_id)
		.then(response=>{
				this.setState({
						basicInfo : response.data.basicInfo,
						certificationArry : response.data.certifications,
						profileCompletion 	: response.data.profileCompletion
			 	})
			 	var userDetails = this.props.userDetails;
				userDetails.profileCompletion = response.data.profileCompletion;

				mapAction.setUserDetails(userDetails);
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
			                var userDetails = {
			                    loggedIn    : false,
			                    username  :"",  
			                    firstName   : "", 
			                    lastName    : "", 
			                    email     : "",
			                    phone     : "", 
			                    user_id     : "",
			                    roles     : [],
			                    token     : "", 
			                    gender    : "", 
			                    profilePicture : "",
			                    candidate_id: "",
			                    profileCompletion : 0
			                    }
			                    mapAction.setUserDetails(userDetails);
			                    document.getElementById("loginbtndiv").click();
			                    }
			                  });
	            }else{
	            	Swal.fire('', " Error!", '');
	            }
			 	
			 })
		var formValues = {candidate_id : this.state.candidate_id}		 
		Axios.post("/api/candidatemaster/get/getCandidateSkills", formValues)
		.then(response=>{
			 	var id = response.data._id;
			 	var diff = [];		
			 	var tableData = response.data.skills.map((a, i)=>{
			 	diff.push(a.skill_id._id) 		
                return {
                    _id         : a._id,
                    skill 		: a.skill_id.skill,
	            	skillType 	: a.skillType,
	            	rating 		: a.rating,
	            	experience 	: a.experience,
                }
            	})
			 	var skillslist = [];
			 	
            	skillslist = this.state.skillslist.filter(function(val) {
				  return diff.indexOf(val._id) == -1;
				});
            	this.setState({
	                tableData : tableData,
	                skillslist: skillslist
	            });
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
			                var userDetails = {
			                    loggedIn    : false,
			                    username  :"",  
			                    firstName   : "", 
			                    lastName    : "", 
			                    email     : "",
			                    phone     : "", 
			                    user_id     : "",
			                    roles     : [],
			                    token     : "", 
			                    gender    : "", 
			                    profilePicture : "",
			                    candidate_id: "",
			                    profileCompletion : 0
			                    }
			                    mapAction.setUserDetails(userDetails);
			                    document.getElementById("loginbtndiv").click();
			                    }
			                  });
	            }else{
	            	Swal.fire('', " Error!", '');
	            }
			})		 
	}
	deleteEntity(event){
		event.preventDefault();
		this.setState({IdToDelete: event.currentTarget.getAttribute('data-id')})
		$('#deleteEntityModal').show();
    }
    confirmDelete(event){
    	event.preventDefault();
    	var {mapAction} = this.props;
    	var candidate_id = this.props.match.params.candidate_id;
    	var skill_id = this.state.IdToDelete;
    	var profileCompletion = this.state.profileCompletion
 
			if (this.state.tableData.length==1) {
				profileCompletion = profileCompletion - 20;
			}else{
				profileCompletion = this.state.profileCompletion
			}

    	axios.delete('/api/candidatemaster/deleteSkill/' + candidate_id + "/" + skill_id+"/")
            .then((response)=>{

            	var userDetails = this.props.userDetails;
				userDetails.profileCompletion = profileCompletion;

				mapAction.setUserDetails(userDetails);

           		if (response.data) {
					this.setState({
						'openForm': false,
						'skill_id': "",
						
					});
					//this.props.history.push('/' + this.state.pathname + '/statutory-details/' + entityID);
					//this.statutoryDetails();
					this.getData();

           			Swal.fire(
           				'',
	                    "Statutory deleted successfully.",
	                    ''
	                    // text : (this.state.entityType === "appCompany" ? "Organizational Settings" :this.state.entityType) +" is deleted successfully.",
					  );
					  $(".swal-text").css("text-transform", "capitalize");
           		}	else{
           			Swal.fire(
           				'',
	                    "Sorry,Failed to delete.",
	                    ''
	                  );
           		}
           		$('#deleteEntityModal').hide();
            })
            .catch((error)=>{
            	if(error.message === "Request failed with status code 401"){
			        var userDetails =  localStorage.removeItem("userDetails");
			        localStorage.clear();

			        Swal.fire({title  : ' ',
			                  html    : "Your session is expired! You need to login again. "+"<br>"+" Click OK to go to Login Page",
			                  text    :  "" })
			            .then(okay => {
			              if (okay) { 
			                var userDetails = {
			                    loggedIn    : false,
			                    username  :"",  
			                    firstName   : "", 
			                    lastName    : "", 
			                    email     : "",
			                    phone     : "", 
			                    user_id     : "",
			                    roles     : [],
			                    token     : "", 
			                    gender    : "", 
			                    profilePicture : "",
			                    candidate_id: "",
			                    profileCompletion : 0
			                    }
			                    mapAction.setUserDetails(userDetails);
			                    document.getElementById("loginbtndiv").click();
			                    }
			                  });
	            }else{
	            	Swal.fire('', " Error!", '');
	            }
            })
    }
    closeModal(event){
    	event.preventDefault();
    	$('#deleteEntityModal').hide(); 
    }
	edit(){
			var {mapAction} = this.props;
			var candidate_id = this.state.candidate_id;
			var certificationID   = this.state.certificationID;
			if (certificationID) {
				this.setState({
					certificationToggel:!this.state.certificationToggel
				})
				var idData = {
					candidate_id : this.state.candidate_id,
					certificationID : this.state.certificationID,
				}
				Axios.post("/api/candidatemaster/post/getOneCandidateCertification",idData)
				.then(response=>{
					var editData =response.data;
				 	this.setState({
				 		certificationName          :editData.certifications[0].certName,
				 		issuedBy                   :editData.certifications[0].issuedBy,
				 		certifiedOn                :Moment(editData.certifications[0].certifiedOn).format("YYYY-MM-DD"),
				 		validity                   :editData.certifications[0].validTill ? Moment(editData.certifications[0].validTill).format("YYYY-MM-DD") : null,
				 		rating                     :editData.certifications[0].rating,
				 		grade                      :editData.certifications[0].gradePercent,
				 		buttonText                 :"Update"
				 	})
				 	this.getData();
				 	
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
				                var userDetails = {
				                    loggedIn    : false,
				                    username  :"",  
				                    firstName   : "", 
				                    lastName    : "", 
				                    email     : "",
				                    phone     : "", 
				                    user_id     : "",
				                    roles     : [],
				                    token     : "", 
				                    gender    : "", 
				                    profilePicture : "",
				                    candidate_id: "",
				                    profileCompletion : 0
				                    }
				                    mapAction.setUserDetails(userDetails);
				                    document.getElementById("loginbtndiv").click();
				                    }
				                  });
				        }else{
				        	Swal.fire('', " Error!", '');
				        }
				 	
				 })
			}
		
	}
	deleteCertification(event){
		event.preventDefault();
		var {mapAction} = this.props;
		var data_id =  event.currentTarget.id;
		
		Swal.fire({
		title 				: ' ',
		html				: 'Are you sure<br />you want to delete this certification details?',
		text 				: '',
		icon 				: 'warning',
		showCloseButton		: true,
		showCancelButton 	: true,
		confirmButtonText 	: 'YES',
		cancelButtonText 	: 'NO',
		confirmButtonColor 	: '#d33',
		reverseButtons		: true
	
	  }).then((result) =>{
		if(result.value){
			if(data_id){
					Axios.delete("/api/candidatemaster/deleteCertification/"+this.state.candidate_id+"/delete/"+data_id)
					.then(response =>{
							if(response.data.deleted===true){

							Swal.fire(
										'',
										"Certification details has been deleted successfully!",
										''
								);
							this.getData();
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
				                var userDetails = {
				                    loggedIn    : false,
				                    username  :"",  
				                    firstName   : "", 
				                    lastName    : "", 
				                    email     : "",
				                    phone     : "", 
				                    user_id     : "",
				                    roles     : [],
				                    token     : "", 
				                    gender    : "", 
				                    profilePicture : "",
				                    candidate_id: "",
				                    profileCompletion : 0
				                    }
				                    mapAction.setUserDetails(userDetails);
				                    document.getElementById("loginbtndiv").click();
				                    }
				                  });
				        }else{
				        	Swal.fire(
									'',
									"Some problem occured while deleting certification details!",
									''
							)
				        }
				})
			}
					
		}else if (result.dismiss === Swal.DismissReason.cancel){
				/*Swal.fire(
					'Cancelled',
					'Your certification details is safe :)',
					'error'
				)*/
			}
		})
		  
		
		
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
		this.setState({
			certificationToggel:!this.state.certificationToggel
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
		// this.changeBlock(event);
		if(this.state.certificationToggel===false){
			event.preventDefault();
			var profileCompletion = this.state.profileCompletion

			if (!this.state.tableData.length) {
				profileCompletion = profileCompletion + 20;
			}else{
				profileCompletion = this.state.profileCompletion
			}
			if(this.state.isPrimary===true){
				
				var formValues = {
					                candidate_id              : this.state.candidate_id,
					                skill: {
					                	skill                 : this.state.skills,
					                	skillType 			  : "primary",	
										rating                : this.state.rating,
										skill_id              : this.state.skills_id,
										experience            : this.state.experience
					                },	
					                profileCompletion 		  : profileCompletion				                
							}
							this.insetData(formValues,event);
			}else{
				var formValues = {
					                candidate_id              : this.state.candidate_id,
					                skill: {
					                	skill                 : this.state.skills,
					                	skillType 			  : "secondary",	
										rating                : this.state.rating,
										skill_id              : this.state.skills_id,
										experience            : this.state.experience
					                },		
					                profileCompletion         : profileCompletion	
							}
							this.insetData(formValues,event);
			}

		}else{
			event.preventDefault();
			var formValues = {
					                candidate_id               : this.state.candidate_id,
					                certificationID            : this.state.certificationID,
					              
					                	certName               : this.state.certificationName,
										issuedBy               : this.state.issuedBy,
										certifiedOn            : this.state.certifiedOn,
										validTill              : this.state.validity,
										gradePercent           : this.state.grade,	
					                
					                	
							}	
				
		 if(this.props.match.params.certificationID )
				 {
				 	this.updateData(formValues);
				 }else{
					this.insetData(formValues);
				}
		}
			 
	
	}
	updateData(formValues){
		var {mapAction} = this.props;
		var status =  this.validateForm();
		if(status==true){
				Axios.patch("/api/candidatemaster/patch/updateOneCandidateCertification",formValues)
				 .then(response=>{

									Swal.fire('', "Your Certification Details is update Successfully", '');
										this.setState({
													certificationName  : "",
													issuedBy           : "",
													certifiedOn        : "",
													validity           : "",
													grade   		   : "",
													buttonText         : "Save",
													certificationToggel : true,

												})
										this.getData();

							this.props.history.push("/certification/"+this.state.candidate_id);
							
					})
					.catch(error =>{
						if(error.message === "Request failed with status code 401"){
				        var userDetails =  localStorage.removeItem("userDetails");
				        localStorage.clear();

				        Swal.fire({title  : ' ',
				                  html    : "Your session is expired! You need to login again. "+"<br>"+" Click OK to go to Login Page",
				                  text    :  "" })
				            .then(okay => {
				              if (okay) { 
				                var userDetails = {
				                    loggedIn    : false,
				                    username  :"",  
				                    firstName   : "", 
				                    lastName    : "", 
				                    email     : "",
				                    phone     : "", 
				                    user_id     : "",
				                    roles     : [],
				                    token     : "", 
				                    gender    : "", 
				                    profilePicture : "",
				                    candidate_id: "",
				                    profileCompletion : 0
				                    }
				                    mapAction.setUserDetails(userDetails);
				                    document.getElementById("loginbtndiv").click();
				                    }
				                  });
				            }else{
				            	Swal.fire('', " Error!", '');
				            }
					});
				}

		}
	insetData(formValues,event){
		var status =  this.validateForm();
		var {mapAction} = this.props;

		if (status==true) {
			
		if(this.state.certificationToggel===false){
				Axios.patch("/api/candidatemaster/patch/addCandidateSkill",formValues)
				 .then(response=>{

				 		var userDetails = this.props.userDetails;
						userDetails.profileCompletion = formValues.profileCompletion;

						mapAction.setUserDetails(userDetails);

						Swal.fire('', "Your skill and rating is inserted Successfully", '');
							this.setState({
											skills             : [],
											rating             : "",
											experience         : "",
											isPrimary		   : true,
											buttonText         : "Save"
										})
						this.getData();	
					})
					.catch(error =>{
						if(error.message === "Request failed with status code 401"){
				        var userDetails =  localStorage.removeItem("userDetails");
				        localStorage.clear();

				        Swal.fire({title  : ' ',
				                  html    : "Your session is expired! You need to login again. "+"<br>"+" Click OK to go to Login Page",
				                  text    :  "" })
				            .then(okay => {
				              if (okay) { 
				                var userDetails = {
				                    loggedIn    : false,
				                    username  :"",  
				                    firstName   : "", 
				                    lastName    : "", 
				                    email     : "",
				                    phone     : "", 
				                    user_id     : "",
				                    roles     : [],
				                    token     : "", 
				                    gender    : "", 
				                    profilePicture : "",
				                    candidate_id: "",
				                    profileCompletion : 0
				                    }
				                    mapAction.setUserDetails(userDetails);
				                    document.getElementById("loginbtndiv").click();
				                    }
				                  });
				            }else{
				            	Swal.fire('', " Error!", '');
				            }
					});
		}else{

			Axios.patch("/api/candidatemaster/patch/addCandidateCertification",formValues)
			 .then(response=>{

					Swal.fire('' ,"Your Certification Details is insert Successfully", '');
						this.setState({
										certificationName  : "",
										issuedBy           : "",
										certifiedOn        : "",
										validity           : "",
										grade   		   : "",
										buttonText         : "Save"
									})
					this.getData();		
				})
				.catch(error =>{
					if(error.message === "Request failed with status code 401"){
				        var userDetails =  localStorage.removeItem("userDetails");
				        localStorage.clear();

				        Swal.fire({title  : ' ',
				                  html    : "Your session is expired! You need to login again. "+"<br>"+" Click OK to go to Login Page",
				                  text    :  "" })
				            .then(okay => {
				              if (okay) { 
				                var userDetails = {
				                    loggedIn    : false,
				                    username  :"",  
				                    firstName   : "", 
				                    lastName    : "", 
				                    email     : "",
				                    phone     : "", 
				                    user_id     : "",
				                    roles     : [],
				                    token     : "", 
				                    gender    : "", 
				                    profilePicture : "",
				                    candidate_id: "",
				                    profileCompletion : 0
				                    }
				                    mapAction.setUserDetails(userDetails);
				                    document.getElementById("loginbtndiv").click();
				                    }
				                  });
				    }else{
				    	Swal.fire('', " Error!", '');
				    }
					
				});
			}
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
	 	var regName = /[a-zA-Z_]+$/;
	 	//this.state.skills

	 	if(this.state.certificationToggel===false){
			if(this.state.rating.length<=0){
				document.getElementById("ratingError").innerHTML=  
				"Please enter your rating";  
				status=false; 
			}else{
				document.getElementById("ratingError").innerHTML=  
				""; 

			}
			if(this.state.experience.length<=0){
				document.getElementById("experienceError").innerHTML=  
				"Please enter your Experience";  
				status=false; 
			}else{
				document.getElementById("experienceError").innerHTML=  
				""; 
			}
			if(this.state.experience.length<=0 && this.state.rating.length<=0 && this.state.skills.length<=0 ){
				status=false;
			}
			if(typeof this.state.skills !== "undefined"){
	           if(!this.state.skills.match(regName)){
	              status = false;
	              document.getElementById("skillsError").innerHTML = "Please enter a valid Skills Level";
	           }else{
	           		document.getElementById("skillsError").innerHTML = "";
	           }       
	        }
	 	}else{
			if(typeof this.state.certificationName !== "undefined"){
	           if(!this.state.certificationName.match(regName)){
	              status = false;
	              document.getElementById("certificationNameError").innerHTML = "Please enter a valid Certification Name";
	           }else{
	           		document.getElementById("certificationNameError").innerHTML = "";
	           }       
	        }
	        if(typeof this.state.issuedBy !== "undefined"){
	           if(!this.state.issuedBy.match(regName)){
	              status = false;
	              document.getElementById("issuedByError").innerHTML = "Please enter a valid Issued By";
	           }else{
	           		document.getElementById("issuedByError").innerHTML = "";
	           }       
	        }
			if(this.state.certifiedOn.length<=0){
				document.getElementById("certifiedOnError").innerHTML=  
				"Please enter your Certified On";  
				status=false; 
			}else{
				document.getElementById("certifiedOnError").innerHTML=  
				""; 
			}
			

	 	}

		return status;
	}

	//========== Validation End ==================
	render(){
		
		return(
				<div className="col-12 pageWrapper candidateProfileSteps ">
					<form className="col-12  mainForm">
						<div className="row ">
							<div className="col-12">
								<div className="row formWrapper justify-content-center">
									<div className="col-lg-4 col-sm-6 col-8">
										<div className="input-group genderFeildWrapper">

											<div className ={ this.state.certificationToggel===false
															 ? "genderFeild col-6 genderFeildActive"
															 : "genderFeild col-6"}  
												 id="toggleSkills" name="certificationToggel" 
												 value="toggleSkills" onClick={this.changeBlock.bind(this)}
											> Skills</div>
											<div className={this.state.certificationToggel === true
															? "genderFeild col-6 genderFeildActive"
															: "genderFeild col-6"} 
												id="toogleCertificate" name="certificationToggel" 
												value="toogleCertificate" onClick={this.changeBlock.bind(this)}
											> Certification	</div>
											
										</div>
									</div>
								</div>
							</div>
						</div>

						{
							this.state.certificationToggel===false
							?
								<div className="row ">
									<div className="col-12">
										<div className="row formWrapper">
											
											<div className="col-xl-2 col-lg-3 col-sm-6 col-12">
												
												<label htmlFor="skills" className="nameTitleForm">
													Type 
													<sup className="nameTitleFormStar">*</sup>
												</label>
												<div className="input-group genderFeildWrapper skillsGenderWrapper text-center">
													<div className ={ this.state.isPrimary===true
															 ? "genderFeild col-6 genderFeildActive"
															 : "genderFeild col-6"}  
														 id="togglePrimary" name="primaryToggel" 
														 value="togglePrimary" onClick={this.handleSwitch.bind(this)}>
														<div className=" skillPillsPadding">
															Primary
														</div>
													</div>
													<div className={this.state.isPrimary === false
																	? "genderFeild col-6 genderFeildActive"
																	: "genderFeild col-6"} 
														id="toogleSecondary" name="primaryToggel" 
														value="toogleSecondary" onClick={this.handleSwitch.bind(this)}>
														<div className=" skillPillsPadding">
															Secondary
														</div>
													</div>
												</div>
											</div>
											<div className="col-xl-4 col-lg-5 col-sm-6 xs-margin">
												<label htmlFor="skills" className="nameTitleForm">
													Skill 
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

											<div className="col-xl-3 col-lg-4 col-sm-6 xs-margin sm-margin">
												<label htmlFor="rating" className="nameTitleForm">How do you rate yourself  <sup className="nameTitleFormStar">*</sup></label>
												<div className="input-group ">
													<span className={this.state.rating=== "1"||this.state.rating=== "2"||this.state.rating=== "3"||this.state.rating=== "4"||this.state.rating=== "5"? "fa fa-star rating stars":"fa fa-star-o rating"} id="1" name="rating" value="1" onClick={this.starClick.bind(this)}></span>
													<span className={this.state.rating === "2"||this.state.rating=== "3"||this.state.rating=== "4"||this.state.rating=== "5"? "fa fa-star rating stars":"fa fa-star-o rating"} id="2" name="rating" value="2" onClick={this.starClick.bind(this)}></span>
													<span className={this.state.rating === "3"||this.state.rating=== "4"||this.state.rating=== "5"? "fa fa-star rating stars":"fa fa-star-o rating"} id="3" name="rating" value="3" onClick={this.starClick.bind(this)}></span>
													<span className={this.state.rating === "4" ||this.state.rating=== "5"? "fa fa-star rating stars":"fa fa-star-o rating"} id="4" name="rating" value="4" onClick={this.starClick.bind(this)}></span>
													<span className={this.state.rating === "5" ? "fa fa-star rating stars":"fa fa-star-o rating"} id="5" name="rating" value="5" onClick={this.starClick.bind(this)}></span>
												</div> 
												<span id="ratingError" className="errorMsg"></span>
											</div>
											<div className="col-xl-3 col-lg-3 col-sm-6 xs-margin sm-margin lg-margin">
												<label htmlFor="experience" className="nameTitleForm">Experience in Years<sup className="nameTitleFormStar">*</sup></label>
												<div className="input-group ">
													<span className="input-group-addon inputBoxIcon"><FontAwesomeIcon icon="chalkboard-teacher" /></span> 
													<input type="number" name="experience" id="experience" className="form-control inputBox " value={this.state.experience} onChange={this.handleChange.bind(this)} />
												</div> 
												<span id="experienceError" className="errorMsg"></span>
											</div>
										</div>
									</div>
								</div>
							:
							<div >
							<div className="row ">
								<div className="col-12">
									<div className="row formWrapper">

										<div className="col-lg-4 col-sm-6">
											<label htmlFor="certificationName" className="nameTitleForm">Certification Name<sup className="nameTitleFormStar">*</sup></label>
											<div className="input-group ">
												<span className="input-group-addon inputBoxIcon"><FontAwesomeIcon icon="chalkboard-teacher" /></span> 
												<input type="text" name="certificationName" id="certificationName" className="form-control inputBox " value={this.state.certificationName} onChange={this.handleChange.bind(this)} />
											</div> 
											<span id="certificationNameError" className="errorMsg"></span>
										</div>

										<div className="col-lg-4 col-sm-6 xs-margin ">
											<label htmlFor="issuedBy" className="nameTitleForm">Issued By<sup className="nameTitleFormStar">*</sup></label>
											<div className="input-group ">
												<span className="input-group-addon inputBoxIcon"><i className="fa fa-user-circle"></i></span> 
												<input type="text" name="issuedBy" id="issuedBy" className="form-control inputBox " value={this.state.issuedBy} onChange={this.handleChange.bind(this)} />
											</div> 
											<span id="issuedByError" className="errorMsg"></span>
										</div>

										<div className="col-lg-4 col-sm-6 xs-margin sm-margin">
											<label htmlFor="certifiedOn" className="nameTitleForm">Certified ON<sup className="nameTitleFormStar">*</sup></label>
											<div className="input-group ">
												<span className="input-group-addon inputBoxIcon">
													<FontAwesomeIcon icon="chalkboard-teacher" />
												</span> 
												<input type="Date" name="certifiedOn" id="certifiedOn"
												 className="form-control inputBox date" 
												 value={this.state.certifiedOn} onChange={this.handleChange.bind(this)} />
												 <div className="dateLine"></div>
											</div> 
											<span id="certifiedOnError" className="errorMsg"></span>
										</div>
										<div className="col-lg-4 col-sm-6 xs-margin xl-margin">
											<label htmlFor="validity" className="nameTitleForm">Valid Till</label>
											<div className="input-group ">
												<span className="input-group-addon inputBoxIcon"><i className="fa fa-calendar"></i> </span> 
												<input type="date" name="validity" id="validity" 
												 className="form-control inputBox date" value={this.state.validity} 
												 onChange={this.handleChange.bind(this)} />
												 <div className="dateLine"></div>
											</div> 
										</div>

										<div className="col-lg-4 col-sm-6 xs-margin xl-margin ">
											<label htmlFor="grade" className="nameTitleForm">Grade / Percentage  </label>
											<div className="input-group ">
												<span className="input-group-addon inputBoxIcon"><FontAwesomeIcon icon="file-alt" /></span> 
												<input type="text" name="grade" id="grade" className="form-control inputBox" value={this.state.grade} onChange={this.handleChange.bind(this)} />
											</div> 
										</div>
									</div>
								</div>
							</div>
						</div>

						}
						<div className="row">
							<div className="col-12">
								<button className="buttonBack pull-right"
								  onClick={this.handleSave.bind(this)}> 
								  {this.state.buttonText}
								 </button>
							</div>
						</div>
						
						{
							this.state.certificationToggel===true
							?
							<div className=" AddressWrapper" >
								 <div className="row">
									{
									!this.state.certificationID
									?
									this.state.certificationArry.length > 0
									?
									this.state.certificationArry.map((elem,index)=>{

										return(
										
											<div className="col-xl-4 col-lg-6 col-12" key={index}>
												<div className="col-lg-12 certifiedWrapper text-center">
													<div className="row">
														<div className="col-lg-12 certificateTitleWrapperd ">
															<div className="row">
																<div className="certificateTitle col-12">
																	Certificate
																</div>
															</div>
														</div>
														<div className="certificateLogoWrppaer col-12">
															<img className="certificateLogo" src="/images/56.png" alt="certificateLogo"/>
														</div>
														<div className="certificateText col-12">
															This certificate is proudly presented to
														</div>
														<div className="certificateNameText1 col-12">
															{this.state.basicInfo.firstName + " " + this.state.basicInfo.lastName }
														</div>
														<div className="certificateText col-12">
															for
														</div>
														<div className="certificateNameText1 col-12">
															{elem.certName}
														</div>
														<div className="col-12 certificateFooter">
															<div className="row ">
																<div className=" col-5  IssueDate">
																	<div className="certificateNameText2">{Moment(elem.certifiedOn).format("YYYY-MM-DD")} </div>
																	<div className="certificateText2">date</div>
																</div>
																<div className="col-2  ">
																	<div className="row">
																		<img className="certificateLogo2" src="/images/57.png" alt="certificateLogo"/>
																	</div>
																</div>
																<div className="col-5 IssueDate">
																	<div className="certificateNameText2">{elem.issuedBy}</div>
																	<div className="certificateText2">Issued By</div>
																</div>
															</div>
														</div>
														<div className="AddressBoxRightIcon  pull-right">
															<div className="">
														
																<div className="rightIconHideWrapper" >
																
																	<div className="rightIconHide" title="Edit"  >
																		<a id={elem._id} href={"/certification/"+this.state.candidate_id+"/edit/"+elem._id} >
																			<FontAwesomeIcon icon="pencil-alt" /> 
																		</a>
																	</div>
																	
																	<div className="rightIconHide rightIconHideDel" title="Edit" id={elem._id} onClick={this.deleteCertification.bind(this)}>
																		<FontAwesomeIcon icon="trash-alt" title="Delete" /> 
																	
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
											<div className="col-lg-12">
												<hr className="basicInfoHr"/>
												<div className="noData">Certification Record Not Found</div>
											</div>
										:
											null
										}
									</div>
							</div>
							:
							<div className="col-lg-12 iAssureTable1">
								<div className="row">
										<IAssureTable 
                                            tableHeading={this.state.tableHeading}
                                            //twoLevelHeader={this.state.twoLevelHeader} 
                                            dataCount={this.state.dataCount}
                                            tableData={this.state.tableData}
                                            getData={this.getData.bind(this)}
                                            tableObjects={this.state.tableObjects}
                                        />
									</div>
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
const mapStateToProps = (state)=>{
    return {
        userDetails    : state.userDetails 
    }
}
const mapDispatchToProps = (dispatch) => ({
  mapAction :  bindActionCreators(mapActionCreator, dispatch)
}) 

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Certification));

