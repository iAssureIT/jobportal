import React,{Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Moment               from 'moment';
import { withRouter }	 	from 'react-router-dom';
import Axios 			 	from 'axios';
import Swal 			 	from 'sweetalert2';
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
			
			candidate_id        : this.props.match.params.candidate_id,
			academicsID         : this.props.match.params.academicsID,
			academics  			: [],
			qualificationLevel  : "",
            qualificationlevel_id    : "",
            qualificationLevellist   : [],
			qualification       : "",
            qualification_id    : "",
            qualificationlist   : [],
			specialization      : "",
			college             : "",
			university   		: "",
			university_id    	: "",
            universitylist   	: [],	
            addressLine1 	    : "",
			area                : "",
			city                : "",
			district   		    : "",	
			states              : "",
			stateCode		    : "",
			country	            : "",
			countryCode 	    : "",
			pincode             : "",
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
				this.setState({qualificationLevellist : response.data});
			})
			.catch(error=>{
				Swal.fire("Error while getting List data",error.message,'error');
			})

		Axios.get("/api/qualificationmaster/get/list")
			.then(response => {
				this.setState({
					qualificationlist : response.data
				});
			})
			.catch(error=>{
				Swal.fire("Error while getting List data",error.message,'error');
			})	
		Axios.get("/api/universitymaster/get/list")
			.then(response => {
				
				this.setState({universitylist : response.data});
			})
			.catch(error=>{
				Swal.fire("Error while getting List data",error.message,'error');
			})	
		Axios.post("/api/collagemaster/get/list")
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
		Axios.get("/api/candidatemaster/get/one/"+this.state.candidate_id)
		.then(response=>{
			
			 	this.setState({
						academics  				: response.data.academics
			 	})
			 	
			 })
			 .catch(error=>{
			 	Swal.fire("Fetch Error!",error.message,'error');
			 })
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
				console.log(response.data)
				
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
			 		district 				: editData.academics[0].district,
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
			 	Swal.fire("edit Error!",error.message,'error');
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
				Axios.delete("/api/candidatemaster/deleteAcademics/"+this.state.candidate_id+"/delete/"+data_id)
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
		this.props.history.push("/contact/"+this.state.candidate_id);
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
        district   : district,
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
							        district   			 : this.state.district,
							        states     			 : this.state.states,
							        country    			 : this.state.country,
							        pincode    			 : this.state.pincode,
							        stateCode  			 : this.state.stateCode,
							        countryCode 		 : this.state.countryCode,
									grade                : this.state.grade,
									mode                 : this.state.mode,
									passOutYear          : this.state.passOutYear,
									admisionYear         : this.state.admisionYear
								}
							}
		console.log(formValues)						
		if(this.props.match.params.academicsID){
			this.updateData(formValues,event);
		}else{
			this.insetData(formValues,event);
		}
		
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
					Swal.fire("Submit Error!",error.message,'error');
				});
			}
	}
	handleSubmit(event){
		event.preventDefault();
			this.props.history.push("/certification/"+this.state.candidate_id);
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
		if(this.state.states.length<=0){
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
									Qualification Leval
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
						</div>

						<div className="row formWrapper">
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
						</div>	
						<div className="row formWrapper">	
							<div className="col-lg-6">
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
							<div className="col-lg-6">
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
                                            				"autocomplete-dropdown-container SearchListContainer inputSearch" 
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
								<label htmlFor="district" className="nameTitleForm">
									District
									<sup className="nameTitleFormStar">*</sup>
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon">
										<FontAwesomeIcon icon="city" /> 
									</span> 
									<input type="text" name="district" id="district" 
									 className="form-control inputBox" value={this.state.district} 
									 onChange={this.handleChange.bind(this)} />
								</div>
								<span id="districtError" className="errorMsg"></span>
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
									<input type="text" name="states" id="states" 
									 className="form-control inputBox " 
									 value={this.state.states} 
									 onChange={this.handleChange.bind(this)} />
								</div> 
								<span id="stateError" className="errorMsg"></span>
							</div>
						</div>	
						<div className="row formWrapper">	
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
								this.state.academics.length > 0
								?
								this.state.academics.map((elem,index)=>{
									
									console.log(elem);

									return(
										<div className="col-lg-6 AddressOuterWrapper"  key={index}>
											<div className="col-lg-12 addWrapper">
												<div className="row">
													<div className="col-lg-4 addLeftWrapper">
														<div className="addLogoDiv">
															<FontAwesomeIcon icon="graduation-cap" /> 
														</div>
														<div>
														<div className="">
														<div className="addLogoTextDiv" key={index}>
															{elem.qualificationlevel_id.qualificationLevel}<br/>
														</div>
														</div>
														
														<div className="addLogoTextDiv" key={index}>
															{elem.qualification_id.qualification}
														</div>
														</div>
															
														
													</div> 
													<div className="col-lg-8 addRightWrapper">
														<div className="row">
														<div className="addRightText ">
															
															<div className="AddressBoxText">
															{elem.specialization}
															</div>
															<div className="AddressBoxText" key={index}>
																{elem.collegeSchool}
															</div>
															<div className="AddressBoxText">
															{}
															</div>
															{/*<div className="AddressBoxText">
																{elem.admisionYear} - {elem.passOutYear}
															</div>
															
															<div className="AddressBoxText">
																{elem.grade}
															</div>
															
															<div className="AddressBoxText">
																{elem.state}
															</div>
															<div className="AddressBoxText">
																{elem.country}
															</div>
															<div className="AddressBoxText">
																{elem.cityVillage}
															</div>*/}
														</div>
														<div className="col-lg-12">
								                            <div className="addRightbtn">
								                                <a id={elem._id} href={"/academics/"+this.state.candidate_id+"/edit/"+elem._id}>
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