import React, {Component}   from 'react';
import './JobPosting.css'; 
import $ from 'jquery';
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome';
import Axios 				from 'axios';
import Swal 				from 'sweetalert2';
import { Multiselect } 		from 'multiselect-react-dropdown';
import CKEditor 			from '@ckeditor/ckeditor5-react';
import ClassicEditor 		from '@ckeditor/ckeditor5-build-classic';
import PhoneInput 			from 'react-phone-input-2';
import Moment 				from "moment";
import ReactTags from 'react-tag-autocomplete'

import PlacesAutocomplete, {
  		geocodeByAddress,
  		getLatLng
} from "react-places-autocomplete";

import 'react-tagsinput/react-tagsinput.css';

import 'react-phone-input-2/lib/style.css';

export default class JobPosting extends Component{
	
	constructor(props){
		super(props);

		this.state = {
			company_id 				: localStorage.getItem("company_Id"),
			jobTitle 				: "",
			addressLine1 			: "",
			addressLine2 			: "",
			country 				: "",
			state 					: "",
			district 				: "",
			city 					: "",
			area 					: "",
			pincode 				: "",
			stateCode				: "",
			countryCode 			: "",
			stateArray 				: [],
			districtArray 			: [],
			pincodeExists 			: true,

			industry_id				: localStorage.getItem("industry_id"),
			functionalArea 			: "",
			/*functionalAreaId 		: "",*/
			subFunctionalArea 		: "",
			/*subFunctionalAreaId 	: "",*/
			role 					: "",
			gender             		: "Male Only",
			workFromHome 			: false,
			contactPersonName 		: "",
			contactPersonEmail		: "",
			contactPersonPhone		: "",
			jobType 				: "",
			jobTypeArray			: [],
			jobTime 				: "",
			jobTimeArray 			: [],
			jobCategory 			: "",
			jobCategoryArray 		: [],
			lastDateOfAppl 			: "",
			minSalary 				: "",
			minSalPeriod 			: "",
			maxSalary 				: "",
			maxSalPeriod			: "",
			jobDesc 				: "",
			minEducation 			: "",
			minExperience 			: "",
			priSkillsArray 			: [],
			primarySkills 			: [],
			minPrimExp	    		: "",
			secondarySkills 		: [], 
			secSkillsArray 			: [],
			minSecExp				: "", 
			otherSkillsArray 		: [],
			otherSkills 			: [],
			minOtherExp				: "", 
			preferSkillsArray 		: [],
			minExpRequiredPre		: "",
			industryList			: [],
			functionalArealist 		: [],
			subFunctionalAreaList	: [],
			priSkillsArraylist 		: [],
			secSkillsArraylist 		: [],
			otherSkillsArraylist	: [],
			preferSkillsArraylist	: [],
			tags                    : [],
			submitBtnText 			: "SUBMIT",		      
			tags: [
		        { id: 1, name: "Apples" },
		        { id: 2, name: "Pears" }
		      ],
		    suggestions: [
		        { id: 3, name: "Bananas" },
		        { id: 4, name: "Mangos" },
		        { id: 5, name: "Lemons" },
		        { id: 6, name: "Apricots" }
		      ]
		}

		 this.reactTags = React.createRef()



		this.style 	=  	{
					      	chips 					: 	{
					        								color: "white"
					      								},
					      	
					      	searchBox 				: 	{
					        								border: "1px solid #D3950A",
					      								},
					      	
					      	multiselectContainer	: 	{
					      									backgroundColor: "#242931",
					        								color: "white",
					      								}
				 		};
	 		
	}
	
	componentDidMount(){
		this.getStates();
		if(this.props.match.params.job_id){
			let job_id = this.props.match.params.job_id;
			Axios.get("/api/jobposting/get/one/"+job_id)
			.then(response=>{
				console.log("response.data : ", response.data);
				this.setState({
					job_id				: job_id,
					jobTitle 			: response.data.jobsData.jobBasicInfo.jobTitle,
					functionalArea 		: response.data.jobsData.jobBasicInfo.functionalArea,
					subFunctionalArea 	: response.data.jobsData.jobBasicInfo.subFunctionalArea,
					role 				: response.data.jobsData.jobBasicInfo.role,
					gender 				: response.data.jobsData.jobBasicInfo.gender,
					workFromHome 		: response.data.jobsData.jobBasicInfo.workFromHome,
					jobType 			: response.data.jobsData.jobBasicInfo.jobType,
					contactPersonName 	: response.data.jobsData.jobBasicInfo.contactPersonName,
					contactPersonEmail 	: response.data.jobsData.jobBasicInfo.contactPersonEmail,
					contactPersonPhone 	: response.data.jobsData.jobBasicInfo.contactPersonPhone,
					jobTime 			: response.data.jobsData.jobBasicInfo.jobTime,
					jobCategory 		: response.data.jobsData.jobBasicInfo.jobCategory,
					lastDateOfAppl      : response.data.jobsData.jobBasicInfo.lastDateOfAppl?Moment(response.data.jobsData.jobBasicInfo.lastDateOfAppl).format("YYYY-MM-DD"):"",
					minSalary 			: response.data.jobsData.ctcOffered.minSalary,
					minSalPeriod 		: response.data.jobsData.ctcOffered.minSalPeriod,
					maxSalary 			: response.data.jobsData.ctcOffered.maxSalary,
					maxSalPeriod		: response.data.jobsData.ctcOffered.maxSalPeriod,
					jobDesc 			: response.data.jobsData.jobBasicInfo.jobDesc,
					minEducation 		: response.data.jobsData.eligibility.minEducation,
					minExperience 		: response.data.jobsData.eligibility.minExperience,
					minPrimExp 			: response.data.jobsData.requiredSkills.minPrimExp,
					minSecExp 			: response.data.jobsData.requiredSkills.minSecExp,
					minOtherExp 		: response.data.jobsData.requiredSkills.minOtherExp,
					submitBtnText 		: "UPDATE",
				})
				
				if(response.data.jobsData.jobBasicInfo.workFromHome === true){
					document.getElementById("workFromHome").checked = true;
				}else{
					document.getElementById("workFromHome").checked = false;
				}
			})
			
			.catch(error=>	{
								Swal.fire("Some error occured while updating job data", error.message, "error");
							})
		}
		
		Axios.get("/api/functionalareamaster/get/list")
			.then(response=> 	{
									console.log("getfunctionalAreaData response.data = ", response.data);
									this.setState({functionalArealist : response.data
								});
									console.log("functionalArea", this.state.functionalArealist);
								})
			.catch(error=>	{
								Swal.fire("Error while getting List data", error.message, 'error');
							})

		Axios.get("/api/subfunctionalareamaster/get/list")
			.then(response=>	{
									console.log("getsubFunctionalAreaData response.data = ", response.data);
									this.setState({subFunctionalAreaList : response.data
								});
									console.log("subFunctionalArea", this.state.subFunctionalAreaList);
								})
			.catch(error=>	{
								Swal.fire("Error while getting List data", error.message,'error');
							})
		
		Axios.get("/api/jobtypemaster/get/list")
			.then(response=> 	{
									console.log("getfunctionalAreaData response.data = ", response.data);
									this.setState({jobTypeArray : response.data
								});
									console.log("jobTypeArray", this.state.jobTypeArray);
								})
			.catch(error=>	{
								Swal.fire("Error while getting List data",error.message,'error');
							})

		Axios.get("/api/JobTimeMaster/get/list")
			.then(response=> 	{
									console.log("getfunctionalAreaData response.data = ", response.data);
									this.setState({jobTimeArray : response.data
								});
									console.log("jobTimeArray", this.state.jobTimeArray);
								})
			.catch(error=>	{
								Swal.fire("Error while getting List data",error.message,'error');
							})	

		Axios.get("/api/jobcategorymaster/get/list")
			.then(response=> 	{
									console.log("getfunctionalAreaData response.data = ", response.data);
									this.setState({jobCategoryArray : response.data
								});
									console.log("jobCategoryArray", this.state.jobCategoryArray);
								})
			.catch(error=>	{
								Swal.fire("Error while getting List data",error.message,'error');
							})	
		
		Axios.get("/api/skillmaster/get/list")
			.then(response=> {
				console.log("getfunctionalAreaData response.data = ", response.data);
				this.setState({priSkillsArraylist : response.data});
				console.log("priSkill", this.state.priSkillsArraylist);
				this.state.priSkillsArraylist!=null && this.state.priSkillsArraylist.length > 0 
				?
					this.state.priSkillsArraylist.forEach((elem, index)=>{
						
						this.state.priSkillsArray.push(elem.skill);
					})
				:
					this.state.priSkillsArray.push("select");
			})
			.catch(error=>{
				Swal.fire("Error while getting priSkillsArraylist List data", error.message,'error');
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
		/*if(this.state.jobLocationCity.length<=0){
			document.getElementById("jobLocationError").innerHTML=  
			"Enter job location";  
			status=false; 
		}else{
			document.getElementById("jobLocationError").innerHTML=  
			""; 
			status = true;
		}*/
		if(this.state.role.length<=0){
			document.getElementById("roleError").innerHTML=  
			"Enter role";  
			status=false; 
		}else{
			document.getElementById("roleError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.contactPersonName.length<=0){
			document.getElementById("contactPersonNameError").innerHTML=  
			"Enter contact person name";  
			status = false; 
		}else{
			document.getElementById("contactPersonNameError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.contactPersonEmail.length<=0){
			document.getElementById("contactPersonEmailError").innerHTML=  
			"Enter email id";  
			status = false; 
		}else{
			document.getElementById("contactPersonEmailError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.contactPersonPhone.length<=0){
			document.getElementById("contactPersonPhoneError").innerHTML=  
			"Enter phone number";  
			status = false; 
		}else{
			document.getElementById("contactPersonPhoneError").innerHTML=  
			""; 
			status = true;
		}
		 return status;
	}
	getStates() {
		Axios.get("http://locations2.iassureit.com/api/states/get/list/IN")
			.then((response) => {
				this.setState({
					stateArray: response.data
				})
				document.getElementById('Statedata').val(this.state.states);
			})
			.catch((error) => {
			})
	}
	handleChange  = (event)=>{
		var name  = event.currentTarget.name;
		var value = event.currentTarget.value;
		this.setState({ [name] : value});
	}

	setGender(event){
		event.preventDefault();
		var id    = event.currentTarget.id;
		this.setState({
						gender:id,
					 })
	}
	
	handleSubmit = (event)=>{
		event.preventDefault();
		if(this.validateForm()){	
		var formValues = {
			company_id 			: 	this.state.company_id,
			jobTitle 			: 	this.state.jobTitle,
			address 			:   this.state.addressLine1,
			area 				:   this.state.area,
        	city 				: 	this.state.city,
       	 	district 			: 	this.state.district,
        	state 				: 	this.state.state,
        	country 			: 	this.state.country,
        	pincode 			: 	this.state.pincode,
        	stateCode 			: 	this.state.stateCode,
        	countryCode 		: 	this.state.countryCode,
			industry_id 		:  	this.state.industry_id,
			functionalarea_id 	: 	this.state.functionalArea,
			subfunctionalarea_id: 	this.state.subFunctionalArea,
			role 				: 	this.state.role,
			gender      	   	: 	this.state.gender,
			workFromHome 		: 	this.state.workFromHome,
			jobtype_id 			: 	this.state.jobType,
			jobtime_id 			: 	this.state.jobTime,
			jobcategory_id 		:   this.state.jobCategory,
			positions 			: 	this.state.addJobNumOfPosi,
			jobDesc 			: 	this.state.jobDesc,
			lastDateOfAppl 		: 	this.state.lastDateOfAppl,
			
			contactPersonName 	: 	this.state.contactPersonName,
			contactPersonEmail 	: 	this.state.contactPersonEmail,
			contactPersonPhone  :   this.state.contactPersonPhone,

			minSalary 			: 	this.state.minSalary,
			minSalPeriod 		: 	this.state.minSalPeriod,
			maxSalary 			: 	this.state.maxSalary,
			maxSalPeriod 		: 	this.state.maxSalPeriod,
			
			minEducation 		: 	this.state.minEducation,
			minExperience 		: 	this.state.minExperience,

			primarySkills 		: 	this.state.primarySkills,
			minPrimExp	 		: 	this.state.minPrimExp,
			secondarySkills 	: 	this.state.secondarySkills,
			minSecExp	 		: 	this.state.minSecExp,
			otherSkills 		: 	this.state.otherSkills,
			minOtherExp	 		: 	this.state.minOtherExp,
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
		Axios.post("/api/jobposting/post",formValues)
			.then(response=> {
				console.log("Inside axios",response.data);
				if(response.data.message==="Job details Inserted Successfully"){
					console.log("response.data = ",response.data);
					let job_id = response.data.jobsData._id;

					Swal.fire("Congrats","Your Data is Submitted Successfully","success");
					this.setState({
									jobTitle 			: "",
									functionalArea 		: "",
									subFunctionalArea 	: "",
									role 				: "",
									gender              : "Male Only",
									workFromHome 		: false,
									contactPersonName 	: "",
									contactPersonEmail 	: "",
									contactPersonPhone 	: "",
									jobType 			: "",
									jobTime 			: "",
									jobCategory 		: "",
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
			.catch(error=>{
				console.log(error);
				Swal.fire("Submit Error!",error.message,'error');
			})
		}

	updateData(formValues){
		Axios.patch("/api/JobPosting/update", formValues)
		.then(response=>{
			console.log("formValues :", formValues);
			if(response.data.message==="Job details updated Successfully!"){
				console.log("response.data : ", response.data);
				Swal.fire("Congrats!", "your profile updated successfully!", "success");
				this.props.history.push("/job-profile/" + this.state.job_id);
			}
		})
		.catch(error=>{
			console.log(error);
	    	Swal.fire("Update Error!", error.message, 'error');
		})
	}

	onEditorChange(evt) {
        this.setState( {
            jobDesc: evt.editor.getData()
        } );
    }

    setWorkFromHome(event) {
         this.setState({workFromHome: event.target.checked});
	}	

   
	keyPressNumber = (e) => {
		if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 189]) !== -1 ||
			// Allow: Ctrl+A, Command+A
			(e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
			(e.keyCode === 86 && (e.ctrlKey === true || e.metaKey === true)) ||
			(e.keyCode === 67 && (e.ctrlKey === true || e.metaKey === true)) ||
			// Allow: home, end, left, right, down, up
			(e.keyCode >= 35 && e.keyCode <= 40) || e.keyCode === 189 || e.keyCode === 32) {
			// let it happen, don't do anything
			return;
		}
		// Ensure that it is a number and stop the keypress
		if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 58)) && (e.keyCode < 96 || e.keyCode > 105 || e.keyCode === 190 || e.keyCode === 46)) {
			e.preventDefault();
		}
	}
	camelCase(str) {
		return str
			.toLowerCase()
			.split(' ')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	}
	handleChangeState(event) {
	    var designation = document.getElementById("states");
    	var stateCode = designation.options[designation.selectedIndex].getAttribute("statecode");
		this.setState({
			[event.target.name]: event.target.value,
			stateCode : stateCode
		});
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

      console.log('state==>',state)

      this.setState({
        area : area,
        city : city,
        district : district,
        states: state,
        country:country,
        pincode: pincode,
        stateCode:stateCode,
        countryCode:countryCode
      })

       
    })
     
      .catch(error => console.error('Error', error));

      geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.setState({'latLng': latLng}))
      .catch(error => console.error('Error', error));
     
      this.setState({ addressLine1 : address});
  	};	
  	onDelete (i) {
	    const tags = this.state.tags.slice(0)
	    tags.splice(i, 1)
	    this.setState({ tags })
	}
	 
	onAddition (tag) {
	    const tags = [].concat(this.state.tags, tag)
	    this.setState({ tags })
	}
	
	render(){	
	const searchOptions = {
      // types: ['(cities)'],
      componentRestrictions: {country: "in"}
    }		
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
											<div className="row">
												<label htmlFor="jobTitle" className="addjobformLable col-lg-12"> Job Title
													<div href="#" data-tip data-for='jobTitleTooltip' className="pull-right"> <i title="Please enter designation name of your profile" className="fa fa-question-circle"></i> </div>
													<span className="asterisk"> &#42; </span>
												</label>
											</div>
											<div className="input-group">
												<span className="input-group-addon addJobFormField"><i className="fa fa-briefcase"></i> </span> 
												<input type="text" className="form-control addJobFormField" name="jobTitle" id="jobTitle" value={this.state.jobTitle} onChange={this.handleChange}/>
											</div>
											<span id="jobTitleError" className="errorMsgJobPost"></span>
										</div>
										<div className="col-lg-6">
											<div className="row row-no-gutters">
												<div className="col-lg-12">
													<label htmlFor="jobLocation" className="addjobformLable"> Job Location <span className="asterisk">&#42;</span> </label>
													<div className="input-group">
														<span className="input-group-addon addJobFormField"><FontAwesomeIcon className="locationIcon" icon={['fas', 'map-marker-alt']} /></span> 
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
				                                                className: 'location-search-input col-lg-12 form-control errorinputText',
				                                                id:"addressLine1",
				                                                name:"addressLine1"
				                                              })}
				                                            />
				                                            <div className={this.state.addressLine1 ? "autocomplete-dropdown-container SearchListContainer" : ""}>
				                                              {loading && <div>Loading...</div>}
				                                              {suggestions.map(suggestion => {
				                                                const className = suggestion.active
				                                                  ? 'suggestion-item--active'
				                                                  : 'suggestion-item';
				                                                // inline style for demonstration purpose
				                                                const style = suggestion.active
				                                                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
				                                                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
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
													<span id="jobLocationError" className="errorMsgJobPost"></span>
												</div>	
											</div>
										</div>
									</div>
								</div>

								<div className="col-lg-12 addJobFieldRow text-left">
									<div className="row">
										<div className="col-lg-3">
											<label htmlFor="functionalArea" className="addjobformLable"> State <span className="asterisk">&#42;</span> </label>
											<div className="input-group"> 
												<select className="form-control addJobFormField"  id="states"
												ref="states" value={this.state.states} name="states" onChange={this.handleChangeState.bind(this)} >
												<option hidden>-- Select --</option>
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
												<span id="functionalAreaError" className="errorMsgJobPost"></span>
											</div>	
										</div>	
										
										<div className="col-lg-3">
											<div className="row">
												<label className="addjobformLable col-lg-12"> City
													<span className="asterisk">&#42;</span>
												</label>
											</div>	
											<div className="input-group"> 
												<input type="text" className="form-control addJobFormField addJobState" value={this.state.city} ref="city" name="city" onChange={this.handleChange}/>
											</div>
										</div>
										<div className="col-lg-3">
											<div className="row">
												<label className="addjobformLable col-lg-12"> District
													<span className="asterisk">&#42;</span>
												</label>
											</div>
											<div className="input-group"> 
												<input type="text" className="form-control addJobFormField addJobState" value={this.state.district} ref="district" name="district" onChange={this.handleChange}/>
											</div>
										</div>
										<div className="col-lg-3">
											<div className="row">
												<label className="addjobformLable col-lg-12"> Pincode
													<span className="asterisk">&#42;</span>
												</label>
											</div>
											<div className="input-group"> 
												<input type="text" className="form-control addJobFormField addJobState" value={this.state.pincode} ref="pincode" name="pincode" onChange={this.keyPressNumber.bind(this)}/>
											</div>
										</div>
									</div>
								</div>
								
								<div className="form-group col-lg-12 addJobFieldRow text-left">
									<div className="row">
										<div className="col-lg-6">
											<label htmlFor="functionalArea" className="addjobformLable"> Functional Area <span className="asterisk">&#42;</span> </label>
											<div className="input-group">
												<span className="input-group-addon addJobFormField"><i className="fa fa-briefcase"></i></span> 
												<select className="form-control addJobFormField" name="functionalArea" id="functionalArea" value={this.state.functionalArea} onChange={this.handleChange}>
												<option hidden> -- Select -- </option>
											    	{
														this.state.functionalArealist!=null && this.state.functionalArealist.length > 0 
														?
															this.state.functionalArealist.map((elem,index)=>{
																return(
																	<option value={elem._id} key={index}> {elem.functionalArea} </option>
																);
															})
														:
															<option> -- Select -- </option>
													}		   
												</select>
												<span id="functionalAreaError" className="errorMsgJobPost"></span>
											</div>	
										</div>			
										<div className="col-lg-6">
											<label htmlFor="subFunctionalArea" className="addjobformLable"> Sub Functional Area <span className="asterisk">&#42;</span> </label>
											<div className="input-group">
												<span className="input-group-addon addJobFormField"><FontAwesomeIcon icon={['fas', 'briefcase']} /></span> 
												<select className="form-control addJobFormField" name="subFunctionalArea" id="subFunctionalArea" value={this.state.subFunctionalArea} onChange={this.handleChange}>
											    <option hidden> -- Select -- </option>	
											    	{
														this.state.subFunctionalAreaList!=null && this.state.subFunctionalAreaList.length > 0 
														?
															this.state.subFunctionalAreaList.map((elem,index)=>{
																return(
																	<option value={elem._id} key={index}> {elem.subfunctionalArea} </option>
																);
															})
														:
															<option> -- Select -- </option>
													}		   
												</select>
											</div>
										</div>
									</div>
								</div>
								<div className="form-group col-lg-12 text-left">
									<div className="row">
										<div className="col-lg-6">
											<div className="row">
												<label htmlFor="Role" className="addjobformLable col-lg-12"> Role 
													<div href="#" data-tip data-for='jobTitleTooltip' className="pull-right">
														<i title="Please enter your project role" className="fa fa-question-circle"></i>
													</div>
													<span className="asterisk">&#42;</span>
												</label>
											</div>
											<div className="input-group">
												<span className="input-group-addon addJobFormField"><FontAwesomeIcon icon={['fas', 'briefcase']} /></span> 
												<input type="text" className="form-control addJobFormField" name="role" id="role" value={this.state.role} onChange={this.handleChange}/>
											</div>
											<span id="roleError" className="errorMsgJobPost"></span>
										</div>
										<div className="col-lg-6">
											<label htmlFor="gender" className="addJobGenderTitle"> Who Can Apply <span className="asterisk">&#42;</span></label>
											<div className="input-group addJobGenderFeildWrapper">
												<div className={this.state.gender==="Male Only"? "addJobGenderField col-lg-4 addJobGenderActive" : "addJobGenderField col-lg-4" }  id="Male Only" name="gender" value="Male Only" onClick={this.setGender.bind(this)}>
													<div className="row">
														Male Only
													</div>
												</div>
												<div className={this.state.gender==="Female Only"? "addJobGenderField col-lg-4 addJobGenderActive" : "addJobGenderField col-lg-4" } id="Female Only" name="gender" value="Female Only" onClick={this.setGender.bind(this)}>
													<div className="row">
														Female Only
													</div>
												</div>
												<div className={this.state.gender==="Both (Male & Female)"? "addJobGenderField col-lg-4 addJobGenderActive" : "addJobGenderField col-lg-4" } id="Both (Male & Female)" name="gender" value="Both (Male & Female)"  onClick={this.setGender.bind(this)}>
													<div className="row">
														Both (Male & Female)
													</div>
												</div>			
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-3 text-left">
									<label className="containerWfh">Work From Home
                                        <input type="checkbox" name="workFromHome" id="workFromHome" value={this.state.workFromHome} onChange={this.setWorkFromHome.bind(this)} />
                                        <span className="checkmark2"></span>
                            		</label>
								</div>
								<div className="col-lg-12 addJobFieldRow text-left">
									<div className="row">
										<div className="col-lg-4">
											<label htmlFor="jobType" className="addjobformLable"> Job Type </label>
											<div className="input-group col-lg-12">
												<span className="input-group-addon addJobFormField"><i className="fa fa-briefcase"></i> </span> 
												<select name="jobType" className="form-control addJobFormField" id="jobType" value={this.state.jobType} onChange={this.handleChange}>
											    	<option hidden> -- Select -- </option>
											    	{
														this.state.jobTypeArray!=null && this.state.jobTypeArray.length > 0 
														?
															this.state.jobTypeArray.map((elem,index)=>{
																return(
																	
																	<option key={index} value={elem._id}> {elem.jobType} </option>
																);
															})
														:
															<option> --Select-- </option>
													}	
												</select>
											</div>
										</div>
										<div className="col-lg-4">
											<label htmlFor="jobTime" className="addjobformLable"> Job Time </label>
											<div className="input-group">
												<span className="input-group-addon addJobFormField"><FontAwesomeIcon icon={['fas', 'business-time']} /></span> 
												<select name="jobTime" className="form-control addJobFormField" id="jobTime" value={this.state.jobTime} onChange={this.handleChange}>
											    	<option hidden> -- Select -- </option>	
											    	{
														this.state.jobTimeArray!=null && this.state.jobTimeArray.length > 0 
														?
															this.state.jobTimeArray.map((elem,index)=>{
																return(
																	<option value={elem._id} key={index}> {elem.jobTime} </option>
																);
															})
														:
															<option> -- Select -- </option>
													}
												</select>
											</div>
										</div>
										<div className="col-lg-4">
											<label htmlFor="jobCategory" className="addjobformLable"> Job Category </label>
											<div className="input-group">
												<span className="input-group-addon addJobFormField"><i className="fa fa-list-alt"></i></span> 
												<select name="jobCategory" className="form-control addJobFormField" id="jobCategory" value={this.state.jobCategory} onChange={this.handleChange}>
											    	<option hidden> -- Select -- </option>	
											    	{
														this.state.jobCategoryArray!=null && this.state.jobCategoryArray.length > 0 
														?
															this.state.jobCategoryArray.map((elem,index)=>{
																return(
																	<option value={elem._id} key={index}> {elem.jobCategory} </option>
																);
															})
														:
															<option> -- Select -- </option>
													}		   
												</select>
											</div>
										</div>
									</div>
								</div>

								<div className="col-lg-12 addJobFieldRow text-left">
									<div className="row">
										<div className="col-lg-4">
											<div className="row">
												<label htmlFor="addJobNumOfPosi" className="addjobformLable col-lg-12"> No. Of Positions </label>
											</div>
											<div className="input-group">
												<span className="input-group-addon addJobFormField"><i className="fa fa-users"></i></span> 
												<input type="text" className="form-control addJobFormField" name="addJobNumOfPosi" id="addJobNumOfPosi" value={this.state.addJobNumOfPosi} onChange={this.handleChange}/>
											</div>
										</div>
										<div className="col-lg-4 democlass">
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
														<span className="input-group-addon addJobFormField"> <i className="fa fa-rupee addJobrupee"></i> </span> 
														<input type="text" className="form-control addJobFormField" name="minSalary" id="minSalary" value={this.state.minSalary} onChange={this.handleChange}/>
													</div>
												</div>
												<div className="col-lg-4">
													<label htmlFor="minSalPeriod" className="addjobformLable"> &nbsp; </label>
													<select className="form-control addJobFormField minSalaryDropdown" name="minSalPeriod" id="minSalPeriod" value={this.state.minSalPeriod} onChange={this.handleChange}>
														<option hidden> -- Select -- </option>
														<option> Per Month </option>
														<option> Per Year  </option>
												    </select>
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
													<select className="form-control addJobFormField maxSalaryDropdown" name="maxSalPeriod" id="maxSalPeriod" value={this.state.maxSalPeriod} onChange={this.handleChange}>
														<option hidden> -- Select -- </option>
														<option> Per Month </option>
														<option> Per Year  </option>
												    </select>
												</div>
											</div>
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
												<span className="input-group-addon addJobFormField"> <i className="fa fa-graduation-cap"></i> </span> 
												<input type="text" className="form-control addJobFormField" name="minEducation" id="minEducation" value={this.state.minEducation} onChange={this.handleChange}/>
											</div>
										</div>
										<div className="col-lg-6">
											<label htmlFor="minExperience" className="addjobformLable"> Minimum Overall Experience </label>
											<div className="input-group">
												<span className="input-group-addon addJobFormField"> <i className="fa fa-history"></i> </span> 
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
												<span className="input-group-addon addJobFormField"> <i className='fa fa-cog'></i> </span> 
													
											        <ReactTags
											        ref={this.reactTags}
											        tags={this.state.tags}
											        suggestions={this.state.suggestions}
											        onDelete={this.onDelete.bind(this)}
											        onAddition={this.onAddition.bind(this)} />
											</div>
										</div>
										<div className="col-lg-4">
											<label htmlFor="minPrimExp" className="addjobformLable"> Min. Experience Req. </label>
											<div className="input-group">
												<span className="input-group-addon addJobFormField"> <i className="fa fa-bar-chart"></i> </span> 
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
												<span className="input-group-addon addJobFormField"> <i className='fa fa-cog'></i> </span> 
												
											</div>
										</div>
										<div className="col-lg-4">
											<label htmlFor="minSecExp" className="addjobformLable"> Min. Experience Req. </label>
											<div className="input-group">
												<span className="input-group-addon addJobFormField"> <i className="fa fa-bar-chart"></i> </span> 
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
												<span className="input-group-addon addJobFormField"> <i className='fa fa-cog'></i> </span> 
											</div>
										</div>
										<div className="col-lg-4">
											<label htmlFor="minOtherExp" className="addjobformLable"> Min. Experience Req. </label>
											<div className="input-group">
												<span className="input-group-addon addJobFormField"> <i className="fa fa-bar-chart"></i> </span> 
												<input type="text" className="form-control addJobFormField" name="minOtherExp" id="minOtherExp" value={this.state.minOtherExp} onChange={this.handleChange}/>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-12 addJobFieldRow text-left">
									<label htmlFor="notMandateSkills" className="addjobformLable"> Preferred Skills but not mandatory </label>
									<div className="input-group col-lg-12">
										<span className="input-group-addon addJobFormField"> <i className='fa fa-cog'></i> </span> 
									</div>
								</div>
								
								<div className="col-lg-12 addJobFieldRow">
									<div className="addJobFormHr col-lg-12">
									</div>
								</div>
								
								<div className="addJobMainHead col-lg-12">
									<i className="fa fa-info"></i> 
									<span className="labelLeftPadding"> Contact Info </span>
								</div>
								<div className="col-lg-12 addJobFieldRow text-left">
									<div className="row">
										<div className="col-lg-4">
											<label htmlFor="contactPersonName" className="addjobformLable"> Contact Person <span className="asterisk">&#42;</span> </label>
											<div className="input-group">
												<span className="input-group-addon addJobFormField"><i className="fa fa-user"></i></span> 
												<input type="text" className="form-control addJobFormField" name="contactPersonName" id="contactPersonName" value={this.state.contactPersonName} onChange={this.handleChange}/>
											</div>
											<span id="contactPersonNameError" className="errorMsgJobPost"></span>
										</div>
										<div className="col-lg-4">
											<label htmlFor="contactPersonEmail" className="addjobformLable"> Email <span className="asterisk">&#42;</span> </label>
											<div className="input-group">
												<span className="input-group-addon addJobFormField"><i className="fa fa-envelope-o"></i></span> 
												<input type="text" className="form-control addJobFormField" name="contactPersonEmail" id="contactPersonEmail" value={this.state.contactPersonEmail} onChange={this.handleChange}/>
											</div>
											<span id="contactPersonEmailError" className="errorMsgJobPost"></span>
										</div>
										<div className="col-lg-4">
											<label htmlFor="contactPersonPhone" className="addjobformLable"> Phone Number <span className="asterisk">&#42;</span> </label>
											<PhoneInput
												className = "input-group-addon addJobFormField form-control" 
												country   = {'in'}
												id 		  = "contactPersonPhone"
												value 	  = {this.state.contactPersonPhone}
												onChange  = {contactPersonPhone => this.setState({ contactPersonPhone })}
											/>
											<span id="contactPersonPhoneError" className="errorMsgJobPost"></span>
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
								      	<div> 
                    						<CKEditor
									          editor={ ClassicEditor }
									          data={ this.state.jobDesc }
									          id="jobDesc"
									          onInit={ editor => {

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