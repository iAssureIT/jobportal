import React,{Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Moment               from 'moment';
import { withRouter }	 	from 'react-router-dom';
import Axios 			 	from 'axios';
import Swal 			 	from 'sweetalert2';
import { connect }        	from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../common/actions/index';
import { Multiselect }      from 'multiselect-react-dropdown';
import PlacesAutocomplete, {
  		geocodeByAddress,
  		getLatLng
} from "react-places-autocomplete";
import '../BasicInfoForm/BasicInfoForm.css';

class Academics extends Component{
	constructor(props){
		super(props);

		this.state={
			
			candidate_id               : this.props.match.params.candidate_id,
			academicsID                : this.props.match.params.academicsID,
			academics  			       : [],
			qualificationLevel         : "",
            qualificationlevel_id      : "",
            qualificationLevellist     : [],
			qualification              : "",
            qualification_id           : "",
            qualificationlist   : [],
			specialization      : "",
			college             : "",
			university   		: "",
			university_id    	: "",
            universitylist   	: [],	
            addressLine1 	    : "",
			area                : "",
			city                : "",	
			stateArray 		    : [],
			states              : "",
			stateCode		    : "",
			country	            : "India",
			countryCode 	    : "IN",
			pincode             : "",
			grade               : "",
			mode                : "",
			passOutYear         : "",
			admisionYear        : "",
			buttonText          : "Save",
			profileCompletion  	: 0,
			
			DegreeArray               : [],
			classArray                : [],
			inputQualificationLevel   : [],
			inputUniversity   		  : [],
			inputCollege  		  	  : [],
			inputQualification        : [],
			inputMode                 : ["Part Time","Full Time","Work From Home"],
		}
		this.camelCase = this.camelCase.bind(this)
		this.handleChangeState = this.handleChangeState.bind(this);
	}
	componentDidMount(){
		this.getData();

 		const userDetails = JSON.parse(localStorage.getItem("userDetails"));
        const token = userDetails.token;
        Axios.defaults.headers.common['Authorization'] = 'Bearer '+ token;

		Axios.post("/api/qualificationlevelmaster/get/list", {"startRange":0,"limitRange":10000})
			.then(response => {
				this.setState({qualificationLevellist : response.data});
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
                    Swal.fire("", "Error while getting qualification data", "");
                }
			})

		Axios.post("/api/qualificationmaster/get/list", {"startRange":0,"limitRange":10000})
			.then(response => {
				this.setState({
					qualificationlist : response.data
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
		                  window.location.href = "/login";
		                }
		              });
		        }else{
                    Swal.fire("", "Error while getting qualification data", "");
                }
			})	
		
		Axios.post("/api/universitymaster/get/list", {"startRange":0,"limitRange":10000})
			.then(response => {
				
				this.setState({universitylist : response.data});
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
                    Swal.fire("", "Error while getting university data", "");
                }
			})	
		Axios.post("/api/collagemaster/get/list", {"startRange":0,"limitRange":10000})
			.then(response => {
				
				this.setState({inputCollege : response.data});
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
                    Swal.fire("", "Error while getting collage data", "");
                }
			})	
		Axios.get("/api/states/get/list/IN")
			.then((response) => {
				this.setState({
					stateArray: response.data
				})
			})
			.catch((error) => {
			})		
			if(this.props.match.params.academicsID){
				this.edit()

			}
		}

	//========== User Define Function Start ================
	getData(){
		var {mapAction} = this.props;
		Axios.get("/api/candidatemaster/get/one/"+this.state.candidate_id)
		.then(response=>{
				
			 	this.setState({
						academics  				: response.data.academics,
						profileCompletion 		: response.data.profileCompletion
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
		                  window.location.href = "/login";
		                }
		              });
		        }else{
                    Swal.fire("", "Error while getting data", "");
                }
			 })
	}
	camelCase(str) {
		return str
			.toLowerCase()
			.split(' ')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	}
	handleChangeState(event) {
		const target = event.target;
	    var state = document.getElementById("states");
    	var stateCode = state.options[state.selectedIndex].getAttribute("statecode");
		this.setState({
			[event.target.name]: event.target.value,
			stateCode : stateCode
		});
	}
	edit(){
		var candidate_id = this.state.candidate_id;
		var academicsID   = this.state.academicsID;
		if (academicsID) {
			var idData ={
				candidate_id : this.state.candidate_id,
				academicsID : this.state.academicsID,
			}
			Axios.post("/api/candidatemaster/post/getOneCandidateAcademics",idData)
			.then(response=>{
				var editData =response.data;
				
			 	this.setState({
			 		qualificationlevel_id  	: editData.academics[0].qualificationlevel_id,
			 		qualificationLevel  	: editData.academics[0].qualificationlevel_id.qualificationLevel,	
			 		qualification_id       	: editData.academics[0].qualification_id,
			 		qualification 	  		: editData.academics[0].qualification_id.qualification,	
			 		specialization      	: editData.academics[0].specialization,
			 		university_id          	: editData.academics[0].university_id,
			 		university          	: editData.academics[0].university_id.university,
			 		addressLine1            : editData.academics[0].collegeSchool,
			 		area 					: editData.academics[0].area,
			 		city                	: editData.academics[0].cityVillage,
			 		states               	: editData.academics[0].state,
			 		stateCode              	: editData.academics[0].stateCode,
			 		country             	: editData.academics[0].country,
			 		countryCode             : editData.academics[0].countryCode,
			 		grade               	: editData.academics[0].grade,
			 		mode                	: editData.academics[0].mode,
			 		passOutYear         	: editData.academics[0].passOutYear,
			 		admisionYear        	: editData.academics[0].admisionYear,
			 		buttonText          	: "Update"
			 	})
			 	
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
                    Swal.fire("", "Error while getting data", "");
                }
			 })
		}
	}
	deleteDate(event){
		event.preventDefault();
		var data_id =  event.currentTarget.id;
		var {mapAction} = this.props;

		Swal.fire({
		title 				: ' ',
		html				: 'Are you sure<br />you want to delete this Academics details?',
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

				var profileCompletion = this.state.profileCompletion
				if (this.state.academics.length == 1) {
					profileCompletion = profileCompletion - 20;
				}else{
					profileCompletion = this.state.profileCompletion
				}

				Axios.delete("/api/candidatemaster/deleteAcademics/"+this.state.candidate_id+"/delete/"+data_id+"/"+profileCompletion)
				.then(response =>{
						if(response.data.deleted===true){

						var userDetails = this.props.userDetails;
						userDetails.profileCompletion = profileCompletion;

						mapAction.setUserDetails(userDetails);

						Swal.fire(
									'',
									'Academics details has been deleted successfully!',
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
			                  window.location.href = "/login";
			                }
			              });
			        }else{
	                    Swal.fire("", "Some problem occured deleting academics details", "");
	                }
				})
			}
				
			}else if (result.dismiss === Swal.DismissReason.cancel){
				
				/*Swal.fire(
					'',
					'Your Academics details is safe :)',
					''
				)*/
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
		this.props.history.push("/address/"+this.state.candidate_id);
	}
	onChangeQualificationLevel(event){
        const {name,value} = event.target;
        this.setState({ [name]:value });  
        
        var qualificationlevel_id;
        if (document.querySelector('#qualificationLevel option[value="' + value + '"]')) {
            qualificationlevel_id = document.querySelector('#qualificationLevel option[value="' + value + '"]').getAttribute("data-value")
        }else{ qualificationlevel_id = "" }

        this.setState({ qualificationlevel_id : qualificationlevel_id });  
    }    
    onChangeQualification(event){
        const {name,value} = event.target;
        this.setState({ [name]:value });  
        
        var qualification_id;
        if (document.querySelector('#qualification option[value="' + value + '"]')) {
            qualification_id = document.querySelector('#qualification option[value="' + value + '"]').getAttribute("data-value")
        }else{ qualification_id = "" }

        this.setState({ qualification_id : qualification_id });  
    }
    onChangeUniversity(event){
        const {name,value} = event.target;
        this.setState({ [name]:value });  
        
        var university_id;
        if (document.querySelector('#university option[value="' + value + '"]')) {
            university_id = document.querySelector('#university option[value="' + value + '"]').getAttribute("data-value")
        }else{ university_id = "" }

        this.setState({ university_id : university_id });  
    }
    handleChangePlaces = address => {
	    this.setState({ addressLine1 : address});
	};
	handleSelect = address => {

    geocodeByAddress(address)
     .then((results) =>{ 
      	for (var i = 0; i < results[0].address_components.length; i++) {
          	for (var b = 0; b < results[0].address_components[i].types.length; b++) {
              	switch (results[0].address_components[i].types[b]) {
                  case 'sublocality_level_1':
                      var area = results[0].address_components[i].long_name;
                      break;
                  case 'sublocality_level_2':
                      area = results[0].address_components[i].long_name;
                      break;
                  case 'locality':
                      var city = results[0].address_components[i].long_name;
                      break;
                  case 'administrative_area_level_1':
                      var state = results[0].address_components[i].long_name;
                      var stateCode = results[0].address_components[i].short_name;
                      break;
                  case 'administrative_area_level_2':
                      var district = results[0].address_components[i].long_name;
                      break;
                  case 'country':
                     var country = results[0].address_components[i].long_name;
                     var countryCode = results[0].address_components[i].short_name;
                    break; 
                  case 'postal_code':
                     var pincode = results[0].address_components[i].long_name;
                      break;
                  default :
                  		break;
              }
          	}
      	}

      this.setState({
        area       : area,
        city       : city,
        states     : state,
        country    : country,
        pincode    : pincode,
        stateCode  : stateCode,
        countryCode: countryCode
      })

       
    })
     
      .catch(error => console.error('Error', error));

      geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.setState({'latLng': latLng}))
      .catch(error => console.error('Error', error));
     
      this.setState({ addressLine1 : address});
  	};

	handleSave(event){
		event.preventDefault();
		var status =  this.validateForm();

		if(status===true){
			var profileCompletion = this.state.profileCompletion
			if (!this.state.academics.length) {
				profileCompletion = profileCompletion + 20;
			}else{
				profileCompletion = this.state.profileCompletion
			}
			var formValues = {
								candidate_id   : this.state.candidate_id,
								academicsID   : this.state.academicsID,
								academics:{
									qualificationLevel   : this.state.qualificationLevel,
									qualificationlevel_id: this.state.qualificationlevel_id,
									qualification        : this.state.qualification,
									qualification_id     : this.state.qualification_id,
									specialization       : this.state.specialization,
									university 		     : this.state.university,
									university_id 		 : this.state.university_id,	
									collegeSchool 		 : this.state.addressLine1,
									area       			 : this.state.area,
							        city       			 : this.state.city,
							        states     			 : this.state.states,
							        country    			 : this.state.country,
							        pincode    			 : this.state.pincode,
							        stateCode  			 : this.state.stateCode,
							        countryCode 		 : this.state.countryCode,
									grade                : this.state.grade,
									mode                 : this.state.mode,
									passOutYear          : this.state.passOutYear,
									admisionYear         : this.state.admisionYear
								},
								profileCompletion : profileCompletion
							}
			}					
		if(this.props.match.params.academicsID){
			this.updateData(formValues,event);
		}else{
			this.insetData(formValues,event);
		}
		
	}
	updateData(formValues,event){
		var status =  this.validateForm();
		if(status===true){
			Axios.patch("/api/candidatemaster/patch/updateOneCandidateAcademics",formValues)
				 .then(response=>{
							Swal.fire('' ,"Your Academics details update Successfully", '');
								this.setState({
												qualificationLevel  : "",
												qualification       : "",
												specialization      : "",
												college             : "",
												university   		: "",
												addressLine1        : "",
												states              : "",
												country	            : "",	
												city                : "",
												grade               : "",
												mode                : "",
												passOutYear         : "",
												admisionYear        : "",
												buttonText         : "Save"
										})
							this.props.history.push("/academics/"+this.state.candidate_id);
							window.location.reload(false);
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
				                  window.location.href = "/login";
				                }
				              });
				        }else{
		                    Swal.fire("", "Some problem occured updating academics details", "");
		                }
					});
				}

			
		}
	insetData(formValues,event){
		var status =  this.validateForm();
		var {mapAction} = this.props;

		if(status===true){
				Axios.patch("/api/candidatemaster/patch/addCandidateAcademics",formValues)
			 	.then(response=>{
					var userDetails = this.props.userDetails;
					userDetails.profileCompletion = formValues.profileCompletion;

					mapAction.setUserDetails(userDetails);

					Swal.fire('' ,"Your Academics details insert Successfully", '');
						this.setState({
										
											qualificationLevel  : "",
											qualification       : "",
											specialization      : "",
											addressLine1        : "",
											university   		: "",
											states              : "",
											country	            : "",	
											city                : "",
											grade               : "",
											mode                : "",
											passOutYear         : "",
											admisionYear        : "",
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
			                  window.location.href = "/login";
			                }
			              });
			        }else{
	                    Swal.fire("", "Some problem occured creating academics details", "");
	                }
				});
			}
	}
	handleSubmit(event,formValues){
		event.preventDefault();
			this.props.history.push("/certification/"+this.state.candidate_id);
	}
	//========== User Define Function End ==================
		//========== Validation Start ==================
	validateForm=()=>{
		var status = true;
		var regName = /^[a-zA-Z]+$/;
		var regName2 = /^[a-zA-z]+([\s][a-zA-Z]+)*$/;
		
		if(this.state.mode.length<=0){
			document.getElementById("modeError").innerHTML=  
			"Please enter your qualification";  
			status=false; 
		}else{
			document.getElementById("modeError").innerHTML=""; 
			
		}

		if(this.state.admisionYear.length<=0){
			document.getElementById("admisionYearError").innerHTML=  
			"Please enter your Pass Out Year";  
			status=false; 
		}else{
			document.getElementById("admisionYearError").innerHTML=""; 
			
		}

		if(this.state.passOutYear.length<=0){
			document.getElementById("passOutYearError").innerHTML=  
			"Please enter your Pass Out Year";  
			status=false; 
		}else{
			document.getElementById("passOutYearError").innerHTML=  
			"";
		}
		if(this.state.addressLine1.length<=0){
			document.getElementById("collegeError").innerHTML=  
			"Please enter your College";  
			status=false; 
		}else{
			document.getElementById("collegeError").innerHTML=  
			""; 
		}
	
		if(typeof this.state.qualificationLevel !== "undefined"){
           if(!this.state.qualificationLevel.match(regName2)){
              status = false;
              document.getElementById("qualificationLevelError").innerHTML = "Please enter a valid Qualification Level";
           }else{
           		document.getElementById("qualificationLevelError").innerHTML = "";
           }       
        }
        if(typeof this.state.qualification !== "undefined"){
           if(!this.state.qualification.match(regName2)){
              status = false;
              document.getElementById("qualificationError").innerHTML = "Please enter a valid Qualification";
           }else{
           		document.getElementById("qualificationError").innerHTML = "";
           }       
        }
        if( this.state.specialization.length>0){
           if(!this.state.specialization.match(regName2)){
              status = false;
              document.getElementById("specializationError").innerHTML = "Please enter a valid Specialization";
           }else{
           		document.getElementById("specializationError").innerHTML = "";
           }       
        }
		if(typeof this.state.country !== "undefined"){
           if(!this.state.country.match(regName)){
              status = false;
              document.getElementById("countryError").innerHTML = "Please enter a valid country name";
           }else{
           		document.getElementById("countryError").innerHTML = "";
           }       
        }
        if(typeof this.state.states !== "undefined"){
           if(!this.state.states.match(regName)){
              status = false;
              document.getElementById("stateError").innerHTML = "Please enter a valid state name";
           }else{
           		document.getElementById("stateError").innerHTML = "";
           }       
        }
        if(typeof this.state.city !== "undefined"){
           if(!this.state.city.match(regName)){
              status = false;
              document.getElementById("cityError").innerHTML = "Please enter a valid city name";
           }else{
           		document.getElementById("cityError").innerHTML = "";
           }       
        }
        if(typeof this.state.university !== "undefined"){
           if(!this.state.university.match(regName2)){
              status = false;
              document.getElementById("universityError").innerHTML = "Please enter a valid university name";
           }else{
           		document.getElementById("universityError").innerHTML = "";
           }       
        }
		if(typeof this.state.addressLine1 !== "undefined"){
           /*if(!this.state.addressLine1.match(regName2)){
              status = false;
              document.getElementById("collegeError").innerHTML = "Please enter a valid college name";
           }else{
           		document.getElementById("collegeError").innerHTML = "";
           }*/       
        }
		 return status;
	}

	//========== Validation End ==================
	render(){
		const searchOptions = {
	      // types: ['(cities)'],
	      componentRestrictions: {country: "in"}
	    }
		return(
				<div className="col-lg-12 ">
					<form>

						<div className="row formWrapper">

							<div className="col-lg-4">
								<label htmlFor="qualificationLevel" className="nameTitleForm">
									Qualification Level
									<sup className="nameTitleFormStar">*</sup>
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon">
										<FontAwesomeIcon icon="file-alt" />
									</span> 
									<input type="text" list="qualificationLevel" className="form-control inputBox" refs="qualificationLevel" 
                                     name="qualificationLevel" id="selectqualificationLevel" maxLength="100" value={this.state.qualificationLevel} data-value={this.state.qualificationlevel_id}
									onChange={this.onChangeQualificationLevel.bind(this)} />
									<datalist name="qualificationLevel" id="qualificationLevel" className="qualificationLevellist" >
									    {this.state.qualificationLevellist.map((item, key) =>
									        <option key={key} value={item.qualificationLevel} data-value={item._id}/>
									    )}
									</datalist>
								</div>
								<span id="qualificationLevelError" className="errorMsg"></span>
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
									<input type="text" list="qualification" className="form-control inputBox" refs="qualification" 
                                     name="qualification" id="selectqualification" maxLength="100" value={this.state.qualification} data-value={this.state.qualification_id}
									onChange={this.onChangeQualification.bind(this)} />
									<datalist name="qualification" id="qualification" className="qualificationlist" >
									    {this.state.qualificationlist.map((item, key) =>
									        <option key={key} value={item.qualification} data-value={item._id}/>
									    )}
									</datalist>
								</div>
								<span id="qualificationError" className="errorMsg"></span>
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
								<span id="specializationError" className="errorMsg"></span>
							</div>

						</div>

						<div className="row formWrapper">

							<div className="col-lg-4">
								<label htmlFor="grade" className="nameTitleForm">
									Grade/Marks/GPA
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
								<label htmlFor="admisionYear" className="nameTitleForm">
									Admission Year
									<sup className="nameTitleFormStar">*</sup>
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon">
										<i className="fa fa-calendar"></i>
									</span> 
									<input type="month" name="admisionYear" id="admisionYear" 
									 className="form-control inputBox" 
									 value={this.state.admisionYear} 
									 onChange={this.handleChange.bind(this)} />
									 <div className="dateLine"></div>
								</div> 
								<span id="admisionYearError" className="errorMsg"></span>
							</div>
							<div className="col-lg-4">
								<label htmlFor="passOutYear" className="nameTitleForm">
									Pass-out-Year
									<sup className="nameTitleFormStar">*</sup>
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon">
										<i className="fa fa-calendar"></i>
									</span> 
									<input type="month" name="passOutYear" id="passOutYear" 
									 className="form-control inputBox " 
									 value={this.state.passOutYear} 
									 onChange={this.handleChange.bind(this)} />
									 <div className="dateLine"></div>
								</div> 
								<span id="passOutYearError" className="errorMsg"></span>
							</div>
							
						</div>

						<div className="row formWrapper">	
							<div className="col-lg-4">
								<label htmlFor="university" className="nameTitleForm">
									University/Boards Name
									<sup className="nameTitleFormStar">*</sup>
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon">
										<FontAwesomeIcon icon="university" />
									</span> 
									<input type="text" list="university" className="form-control inputBox" refs="university" 
                                     name="university" id="selectuniversity" maxLength="100" value={this.state.university} data-value={this.state.university_id}
									onChange={this.onChangeUniversity.bind(this)} />
									<datalist name="university" id="university" className="universitylist" >
									    {this.state.universitylist.map((item, key) =>
									        <option key={key} value={item.university} data-value={item._id}/>
									    )}
									</datalist>
								</div> 
								<span id="universityError" className="errorMsg"></span>
							</div>
							<div className="col-lg-4">
								<label htmlFor="college" className="nameTitleForm">
									College/School Name<sup className="nameTitleFormStar">*</sup>
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon">
										<FontAwesomeIcon icon="university" />
									</span> 
									{/*<select className="form-control inputBox" id="college" 
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
									</select>*/}
									<PlacesAutocomplete
                                        value={this.state.addressLine1}
                                        onChange={this.handleChangePlaces}
                                        onSelect={this.handleSelect}
                                        searchOptions={searchOptions}
                                      	>
                                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                          <div>
                                            <input
                                              {...getInputProps({
                                                placeholder: 'Search Address ...',
                                                className: 'location-search-input form-control inputBox',
                                                id:"addressLine1",
                                                name:"addressLine1",
                                              })}
                                            />
                                            <div className={this.state.addressLine1 
                                            				? 
                                            				"autocomplete-dropdown-container SearchListContainer SearchListContainer2 inputSearch" 
                                            				: 
                                            				""}>
                                              {loading && <div>Loading...</div>}
                                              {suggestions.map(suggestion => {
                                                const className = suggestion.active
                                                  ? 'suggestion-item--active'
                                                  : 'suggestion-item';
                                                // inline style for demonstration purpose
                                                const style = suggestion.active
                                                  ? { backgroundColor: '#f5a721', cursor: 'pointer' }
                                                  : { backgroundColor: '#242933', cursor: 'pointer'};
                                                return (
                                                  <div
                                                    {...getSuggestionItemProps(suggestion, {
                                                      className,
                                                      style,
                                                    })}
                                                  >
                                                    <span>{suggestion.description}</span>
                                                  </div>
                                                );
                                              })}
                                            </div>
                                          </div>
                                        )}
                                      </PlacesAutocomplete>
								</div> 
								<span id="collegeError" className="errorMsg"></span>
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
								<span id="modeError" className="errorMsg"></span>
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
									
									<select id="states" className="form-control inputBox selectOption"
										ref="states" value={this.state.states} name="states" onChange={this.handleChangeState} >
										<option selected={true}>-- Select --</option>
										{
											this.state.stateArray && this.state.stateArray.length > 0 ?
												this.state.stateArray.map((stateData, index) => {
													return (
														<option key={index} statecode={stateData.stateCode}>{this.camelCase(stateData.stateName)}</option>
													);
												}
												) : ''
										}
									</select>
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
						<div className="row">
							<div className="col-lg-12">
								<button className="buttonBack pull-right"
								  onClick={this.handleSave.bind(this)}> 
								  {this.state.buttonText}
								 </button>
							</div>
						</div>
						<div className=" AddressWrapper" >
							 <div className="row">
								{
								!this.state.academicsID
								?

								this.state.academics.length > 0
								?
								this.state.academics.map((elem,index)=>{
									return(
										<div className="col-lg-4 AddressOuterWrapper"  key={index}>
											<div className="col-lg-12 addWrapper">
												<div className="row">
													<div className="col-lg-12 addLeftWrapper key={index}">
														<div className="col-lg-1 iconAdd" >
															<FontAwesomeIcon icon="home" /> 
														</div>
														<div className="col-lg-8 titleAdd" >
															{elem.qualificationlevel_id.qualificationLevel}
														</div>
														<div className="col-lg-2 buttonAdd" >
															<div className="row">
																 <a id={elem._id} href={"/academics/"+this.state.candidate_id+"/edit/"+elem._id}>
																 	<span className="editAdd" title="Edit">
																 		<FontAwesomeIcon icon="pencil-alt" />
																 	</span> 
																 </a>
																<span className="deleteAdd" title="Delete" id={elem._id} onClick={this.deleteDate.bind(this)}>
																	<FontAwesomeIcon icon="trash-alt" /> 
																</span>
															</div>
														</div>
													</div> 
												</div> 
												<div className="row">
													<div className="col-lg-12 addRightWrapper">
														
														<div className="addRightText ">
															
															<div className="AddressBoxText">
																{elem.qualification_id.qualification}
															</div>
															<div className="AddressBoxText">
																{elem.specialization}
															</div>
															<div className="AddressBoxText">
																{elem.collegeSchool}
															</div>
															<div className="AddressBoxText">
																{elem.admisionYear} - {elem.passOutYear}
															</div>
															<div className="AddressBoxText">
																{elem.cityVillage+", "+elem.state+", "+elem.country+"."}
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
											<div className="noData">Academics Record Not Found</div>
										</div>
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
const mapStateToProps = (state)=>{
    return {
        userDetails    : state.userDetails 
    }
}
const mapDispatchToProps = (dispatch) => ({
  mapAction :  bindActionCreators(mapActionCreator, dispatch)
}) 

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Academics));

