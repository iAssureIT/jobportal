import React,{Component} 	from 'react';
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome';
import Moment               from 'moment';
import { withRouter }	 	from 'react-router-dom';
import Axios 			 	from 'axios';
import Swal 			 	from 'sweetalert2';
import _ 					from 'underscore';
import CKEditor 					from '@ckeditor/ckeditor5-react';
import ClassicEditor 				from '@ckeditor/ckeditor5-build-classic';
import '../BasicInfoForm/BasicInfoForm.css';


class Experience extends Component{
	constructor(props){
		super(props);

		this.state={
			experienceArry                : [],
			industry 				      : "",
            industry_id             	  : "",
            industrylist            	  : [],
            company 				      : "",
            company_id             	      : "",
            companylist            	      : [],
            selectedCompany 			  : [],	
            stateArray 				      : [],		
            city 						  : [],	
			companyName                   : "",
			candidate_id                  : this.props.match.params.candidate_id,
			workExperienceID              : this.props.match.params.workExperienceID,
			companyCountry                : "",
			countryCode 				  : "IN",
			companyCity                   : "",
			lastDesignation               : "",
			lastDeartment   		      : "",
			currentCTC                    : "",
			fromDate	                  : "",	
			toDate                        : "",
			currentlyWorkingHere 	      : "",	
			companyState                  : "",
			responsibilities              : "",
			reportingManager              : "",
			reportingManagerDesignation   : "",
			expectedCTC                   : "",
			noticePeriod                  : "",
			buttonText                    : "Save",
			expYears                      : 0,
			expMonths                     : 0,
			relevantExperience 			  : "",
			totalExperience	 			  : ""
		}
		this.camelCase = this.camelCase.bind(this)
		this.handleChangeState = this.handleChangeState.bind(this);
	}
	componentDidMount(){
		this.getData();
		Axios.get("/api/industrymaster/get/list")
            .then(response => {
                    this.setState({ industrylist : response.data });
            })
            .catch(error => {
                Swal.fire("Error while getting List data", error.message, 'error');
            })
        Axios.get("/api/entitymaster/get/corporate")
            .then(response => {
                    this.setState({ companylist : response.data });
            })
            .catch(error => {
                Swal.fire("Error while getting List data", error.message, 'error');
            })   
        Axios.get("http://locations2.iassureit.com/api/states/get/list/IN")
			.then((response) => {
				this.setState({
					stateArray: response.data
				})
				
			})
			.catch((error) => {
			})
			     
		if(this.props.match.params.workExperienceID){
			this.edit()
		}
	}
	onChangeIndustry(event){
        const {name,value} = event.target;
        this.setState({ [name]:value });  
        
        var industry_id;
        if (document.querySelector('#industry option[value="' + value + '"]')) {
           industry_id = document.querySelector('#industry option[value="' + value + '"]').getAttribute("data-value")
        }else{industry_id = "" }

        this.setState({industry_id :industry_id },()=>{
            console.log(this.state)
        });  
    }	
    
    onChangeCompany(event){
        const {name,value} = event.target;
        this.setState({ [name]:value });  
        
        var company_id;
        if (document.querySelector('#company option[value="' + value + '"]')) {
           company_id = document.querySelector('#company option[value="' + value + '"]').getAttribute("data-value")
        }else{company_id = "" }

         
        var selectedCompany = this.state.companylist.filter((val)=>{
        	if (val._id ==company_id) {
        		return val;
        	}
        })
        console.log(selectedCompany)
        if (selectedCompany[0]) {
        	var city = _.uniq(selectedCompany[0].locations, 'district')
        
        	this.setState({company_id :company_id, selectedCompany : selectedCompany, city: city, });

        }else{
        	this.setState({company_id :company_id, company : value });

        }
        
    }	
	//========== User Define Function Start ================
	edit(){
		var candidate_id = this.state.candidate_id;
		var workExperienceID   = this.state.workExperienceID;
		if (workExperienceID) {
			var idDate ={
				candidate_id : this.state.candidate_id,
				workExperienceID : this.state.workExperienceID,
			}
			Axios.post("/api/candidatemaster/post/getOneCandidateExperience",idDate)
			.then(response=>{
				var editData =response.data;
				
			 	this.setState({
			 		industry_id 				: editData[0].workExperience[0].industry_id,
			 		industry 				  	: editData[0].workExperience[0].industry_id.industry,
			 		company_id 					: editData[0].workExperience[0].company_id,
			 		company 					: editData[0].workExperience[0].company_id.companyName,
			 		countryCode 				: editData[0].workExperience[0].countryCode,
			 		companyCountry              : editData[0].workExperience[0].country,
			 		stateCode 					: editData[0].workExperience[0].stateCode,
			 		companyCity                 : editData[0].workExperience[0].district,
			 		companyState                : editData[0].workExperience[0].state,
			 		lastDesignation             : editData[0].workExperience[0].lastDegn,
			 		lastDeartment               : editData[0].workExperience[0].department,
			 		relevantExperience          : editData[0].workExperience[0].relevantExperience,
			 		responsibilities            : editData[0].workExperience[0].responsibilities,
			 		reportingManager            : editData[0].workExperience[0].reportingManager,
			 		reportingManagerDesignation : editData[0].workExperience[0].reportingManagerDegn,
			 		fromDate                    : Moment(editData[0].workExperience[0].fromDate).format("YYYY-MM"),
			 		toDate                      : Moment(editData[0].workExperience[0].toDate).format("YYYY-MM"),
			 		currentlyWorkingHere 		: editData[0].workExperience[0].currentlyWorkingHere,	
			 		currentCTC                  : editData[0].currentCTC,
			 		expectedCTC                 : editData[0].expectedCTC,
			 		noticePeriod                : editData[0].noticePeriod,
			 		totalExperience             : editData[0].totalExperience,
			 		buttonText                  : "Update"
			 	})
			 	
			 })
			 .catch(error=>{
			 	Swal.fire("Submit Error!",error.message,'error');
			 })
		}
	}
	getData(){

		Axios.get("/api/candidatemaster/get/one/"+this.state.candidate_id)
		.then(response=>{
			 	this.setState({
			 		experienceArry: response.data.workExperience
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
				Axios.delete("/api/candidatemaster/deleteExperience/"+this.state.candidate_id+"/delete/"+data_id)
				.then(response =>{
						if(response.data.deleted===true){
						Swal.fire(
									'Deleted!',
									'Experience Details has been deleted successfully!',
									'success'
							);
						this.getData();
						this.props.history.push("/experience/"+this.state.candidate_id);
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
	 
	}
	
	handleSave(event){
		event.preventDefault();
		var status =  this.validateForm();
		if(status==true){
		var formValues = {
								candidate_id       	: this.state.candidate_id,
								experienceID       	: this.state.workExperienceID,
								experience:{
									industry_id 				  : this.state.industry_id,	
									industry 				  	  : this.state.industry,	
									company_id 				      : this.state.company_id,
									company 				      : this.state.company,
									countryCode 				  : this.state.countryCode,	
									country                       : this.state.companyCountry,
									stateCode 					  : this.state.stateCode,
									state                         : this.state.companyState,		
									district                      : this.state.companyCity,
									lastDegn                      : this.state.lastDesignation,
									department                    : this.state.lastDeartment,
									fromDate                      : this.state.fromDate,
									toDate                        : this.state.toDate,
									currentlyWorkingHere 		  : this.state.currentlyWorkingHere,	
									responsibilities              : this.state.responsibilities,
									reportingManager              : this.state.reportingManager,
									reportingManagerDegn          : this.state.reportingManagerDesignation,
									relevantExperience  	      : this.state.relevantExperience,
								},
								totalExperience  	  : this.state.totalExperience,	
								currentCTC            : this.state.currentCTC,
								expectedCTC           : this.state.expectedCTC,
								noticePeriod          : this.state.noticePeriod,
							}
					}

		if(this.props.match.params.workExperienceID){
			this.updateData(formValues,event);
		}else{
			this.insetData(formValues,event);
		}
	}
	updateData(formValues,event){
		var status =  this.validateForm();
		if(status==true){
			Axios.patch("/api/candidatemaster/patch/updateOneCandidateExperience",formValues)
				 .then(response=>{
				 	this.getData();
					Swal.fire("Congrats","Your Experience Details is update Successfully","success");
						this.setState({
									industry_id 				  : "",	
									industry 				  	  : "",	
									company_id 				      : "",
									company 					  : "",
									companyName                   : "",
									companyCountry                : "",
									companyCity                   : "",
									lastDesignation               : "",
									lastDeartment   		      : "",
									currentCTC                    : "",
									fromDate	                  : "",	
									companyState	              : "",	
									expectedCTC	                  : "",	
									toDate                        : "",
									currentlyWorkingHere 		  : false,	
									responsibilities              : "",
									reportingManager              : "",
									reportingManagerDesignation   : "",
									noticePeriod                  : "",
									relevantExperience   		  : "",
									totalExperience	    		  : "",
									buttonText                    : "Save"
								})
					this.props.history.push("/experience/"+this.state.candidate_id);
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
			 	this.getData();
					Swal.fire("Congrats","Your experience details is inserted Successfully","success");
						this.setState({
										industry_id 				  : "",	
										industry 				  	  : "",	
										company_id 				      : "",
										company 					  : "",
										companyName                   : "",
										companyCountry                : "",
										companyCity                   : "",
										lastDesignation               : "",
										lastDeartment   		      : "",
										currentCTC                    : "",
										fromDate	                  : "",	
										expectedCTC	                  : "",	
										companyState	              : "",	
										toDate                        : "",
										currentlyWorkingHere 		  : "",	
										responsibilities              : "",
										reportingManager              : "",
										reportingManagerDesignation   : "",
										noticePeriod                  : "",
										relevantExperience   		  : "",
										totalExperience	    		  : "",
										buttonText                    : "Save"
									})	
				})
				.catch(error =>{
					Swal.fire("Submit Error!",error.message,'error');
				});
			}
	}
	handleChange(event){
		var value = event.currentTarget.value;
		var name  = event.currentTarget.name;

		
		this.setState({
			[name]:value,
		})

		if(name==="fromDate"||name==="toDate"){
			this.calExperience(value);
		}
	}
	handleChangeCity(event){
		var value = event.currentTarget.value;
		var name  = event.currentTarget.name;
		
		if (document.querySelector('#companyCity option[value="' + value + '"]')) {
			this.setState({
				[name]  		: value,
				"companyState" 		: document.querySelector('#companyCity option[value="' + value + '"]').getAttribute("data-state"),
				"stateCode" 	: document.querySelector('#companyCity option[value="' + value + '"]').getAttribute("data-stateCode"),
				"companyCountry"   	: document.querySelector('#companyCity option[value="' + value + '"]').getAttribute("data-country"),
				"countryCode" 	: document.querySelector('#companyCity option[value="' + value + '"]').getAttribute("data-countryCode")
			})
		}else{
			this.setState({ [name]  		: value })
		}
	}
	camelCase(str) {
		return str
			.toLowerCase()
			.split(' ')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	}
	calExperience(value){
		
		var toDate 		= this.state.toDate == "" ?  Moment(new Date()) : Moment(this.state.toDate);
		var fromDate 	= this.state.fromDate == "" ?  Moment(new Date()) : Moment(this.state.fromDate);
		

		var exp     = Moment.duration(toDate.diff(fromDate));
		var Years   = exp.years();
		var Months  = exp.months();
		var weeks   = exp.weeks();
		

		this.setState({
			expYears : Years,
			expMonths: Months,
		})
	}

	handleBack(event){
			event.preventDefault();
			this.props.history.push("/certification/"+this.state.candidate_id);
		}
	handelSubmit(event){
		event.preventDefault();
		this.props.history.push("/profile/"+this.state.candidate_id);
			
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
	handleChangeCheckbox(event){
		event.preventDefault();
		// this.setState({ currentlyWorkingHere : " !this.state.currentlyWorkingHere" })
		var id  = event.currentTarget.id;
		var currentlyWorkingHere = this.state.currentlyWorkingHere
		if (id=="Yes") {
			console.log(Moment(new Date()).format("YYYY-MM"))
			this.setState({ 
				toDate : Moment(new Date()).format("YYYY-MM"),
				currentlyWorkingHere: "Yes"
				})
			
		}else{
			this.setState({ toDate : "" ,currentlyWorkingHere: "No"})
		}
	}
	//========== User Define Function End ==================
	//========== Validation Start ==================
	validateForm=()=>{
		var status = true;
		
		if(this.state.industry.length<=0 ){
			document.getElementById("industryError").innerHTML=  
			"Please enter industry";  
			status=false; 
		}else{
			document.getElementById("industryError").innerHTML=""; 
			status = true;
		}
		if(this.state.company.length<=0 || this.state.company_id.length<=0){
			document.getElementById("companyNameError").innerHTML=  
			"Please enter company name";  
			status=false; 
		}else{
			document.getElementById("companyNameError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.companyState.length<=0){
			document.getElementById("stateError").innerHTML=  
			"Please enter state";  
			status=false; 
		}else{
			document.getElementById("stateError").innerHTML=  
			""; 
			status = true;
		}
		
		if(this.state.companyCountry.length<=0){
			document.getElementById("companyCountryError").innerHTML=  
			"Please enter country";  
			status=false; 
		}else{
			document.getElementById("companyCountryError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.companyCity.length<=0){
			document.getElementById("companyCityError").innerHTML=  
			"Please enter city";  
			status=false; 
		}else{
			document.getElementById("companyCityError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.lastDesignation.length<=0){
			document.getElementById("lastDesignationError").innerHTML=  
			"Please enter your last designation";  
			status=false; 
		}else{
			document.getElementById("lastDesignationError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.lastDeartment.length<=0){
			document.getElementById("lastDeartmentError").innerHTML=  
			"Please enter your last deartment";  
			status=false; 
		}else{
			document.getElementById("lastDeartmentError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.currentCTC.length<=0){
			document.getElementById("currentCTCError").innerHTML=  
			"Please enter your last salary";  
			status=false; 
		}else{
			document.getElementById("currentCTCError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.expectedCTC.length<=0){
			document.getElementById("expectedCTCError").innerHTML=  
			"Please enter your last salary";  
			status=false; 
		}else{
			document.getElementById("expectedCTCError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.fromDate.length<=0){
			document.getElementById("fromDateError").innerHTML=  
			"Please enter date";  
			status=false; 
		}else{
			document.getElementById("fromDateError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.toDate.length<=0){
			document.getElementById("toDateError").innerHTML=  
			"Please enter date";  
			status=false; 
		}else{
			document.getElementById("toDateError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.noticePeriod.length<=0){
			document.getElementById("noticePeriodError").innerHTML=  
			"Please enter date";  
			status=false; 
		}else{
			document.getElementById("noticePeriodError").innerHTML=  
			""; 
			status = true;
		}
	
		if(this.state.reportingManager.length<=0){
			document.getElementById("reportingManagerError").innerHTML=  
			"Please enter your reporting manager";  
			status=false; 
		}else{
			document.getElementById("reportingManagerError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.reportingManagerDesignation.length<=0){
			document.getElementById("reportingManagerDesignationError").innerHTML=  
			"Please enter your reporting manager designation";  
			status=false; 
		}else{
			document.getElementById("reportingManagerDesignationError").innerHTML=  
			""; 
			status = true;
		}

		if(this.state.totalExperience.length<=0){
			document.getElementById("totalExperienceError").innerHTML=  
			"Please enter your total experience";  
			status=false; 
		}else{
			document.getElementById("totalExperienceError").innerHTML=  
			""; 
			status = true;
		}
		if(this.state.relevantExperience.length<=0){
			document.getElementById("relevantExperienceError").innerHTML=  
			"Please enter your relevant experience";  
			status=false; 
		}else{
			document.getElementById("relevantExperienceError").innerHTML=  
			""; 
			status = true;
		}

		if(this.state.relevantExperience.length<=0 && this.state.totalExperience.length<=0 
			&& this.state.reportingManagerDesignation.length<=0 && this.state.reportingManager.length<=0
			&& this.state.noticePeriod.length<=0 && this.state.toDate.length<=0 &&  this.state.fromDate.length<=0 
			&& this.state.expectedCTC.length<=0 && this.state.currentCTC.length<=0 && this.state.lastDeartment.length<=0
			&& this.state.lastDesignation.length<=0 && this.state.companyCity.length<=0 && this.state.companyCountry.length<=0
			&& this.state.companyState.length<=0 && this.state.industry.length<=0  && this.state.company.length<=0
			&& this.state.company_id.length<=0){
			status=false; 
		}
		return status;
	}

	//========== Validation End ==================
	render(){
		
		return(
				<div className="col-lg-12">
					<form>
					<div className="row formWrapper">
							<div className="col-lg-6">
								<label htmlFor="industry" className="nameTitleForm"> Industry <span className="nameTitleFormStar">&#42;</span> </label>
								<div className="input-group">
									<span className="input-group-addon inputBoxIcon"><i className="fa fa-briefcase"></i></span> 
										<input type="text" list="industry" className="form-control inputBox" refs="industry" 
                                         name="industry" id="selectIndustry" maxLength="100" value={this.state.industry} data-value={this.state.industry_id}
										onChange={this.onChangeIndustry.bind(this)} />
										<datalist name="industry" id="industry" className="industrylist" >
										    {this.state.industrylist.map((item, key) =>
										        <option key={key} value={item.industry} data-value={item._id}/>
										    )}
										</datalist>
								</div>
                                <span id="industryError" className="errorMsg"></span>
							</div>

							<div className="col-lg-6">
								<label htmlFor="companyName" className="nameTitleForm">
									Company
									<sup className="nameTitleFormStar">*</sup>
								</label>
								<div className="input-group">
									<span className="input-group-addon inputBoxIcon"><i className="fa fa-briefcase"></i></span> 
										<input type="text" list="company" className="form-control inputBox" refs="industry" 
                                         name="company" id="selectCompany" maxLength="100" value={this.state.company} data-value={this.state.company_id}
										onChange={this.onChangeCompany.bind(this)} />
										<datalist name="company" id="company" className="companylist" >
										    { this.state.companylist.map((item, key) =>
										        <option key={key} value={item.companyName} data-value={item._id}/>
										    )}
										</datalist>
								</div> 
								<span id="companyNameError" className="errorMsg"></span>
							</div>
						</div>	

						<div className="row formWrapper">
							<div className="col-lg-4">
								<label htmlFor="companyCity" className="nameTitleForm">
									 City
									<sup className="nameTitleFormStar">*</sup>
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon">
										<FontAwesomeIcon icon="city" />
									</span> 
									<input type="text" list="companyCity" className="form-control inputBox" refs="industry" 
                                         name="companyCity" id="selectCompanyCity" maxLength="100" value={this.state.companyCity}
										onChange={this.handleChangeCity.bind(this)} />
										<datalist name="companyCity" id="companyCity" className="companyCity" >
										    { this.state.city.map((elem, key) =>
										        <option key={key} value={elem.district} data-stateCode = {elem.stateCode} data-state={elem.state} data-countryCode = {elem.countryCode} data-country = {elem.country}/>
										    )}
										</datalist>
									{/*<select required className="form-control inputBox selectOption" 
									  id="companyCity" value={this.state.companyCity}
									  name="companyCity" placeholder="-- Select --" onChange={this.handleChangeCity.bind(this)}>
									  	<option > -- Select -- </option>
									  	{
									  		this.state.city.length>0
									  		?	
									  			this.state.city.map((elem,index)=>{
									  				return(
									  					<option value={elem.district} key={index} 
									  					data-stateCode = {elem.stateCode} data-state={elem.state} data-countryCode = {elem.countryCode} data-country = {elem.country} >
									  						{elem.district}
									  					</option>
									  				);
									  			})
									  			
									  		:
									  			null
									  	}
									</select>*/}
									
								</div> 
								<span id="companyCityError" className="errorMsg"></span>
							</div>

							<div className="col-lg-4">
								<label htmlFor="companyState" className="nameTitleForm">
									 State
									<sup className="nameTitleFormStar">*</sup>
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon">
										<i className="fa fa-map"></i>
								    </span> 
									
									<select id="states" className="form-control inputBox selectOption"
										ref="companyState" value={this.state.companyState} name="companyState" onChange={this.handleChangeState} >
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
								<label htmlFor="companyCountry" className="nameTitleForm">
									 Country
								    <sup className="nameTitleFormStar">*</sup>
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon">
										<i className="fa fa-flag"></i>
									</span> 
									<input type="text" name="companyCountry" id="companyCountry" 
									 className="form-control inputBox " value={this.state.companyCountry}
									 onChange={this.handleChange.bind(this)} />
								</div> 
								<span id="companyCountryError" className="errorMsg"></span>
							</div>
						</div>

						<div className="row formWrapper">
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
									 onChange={this.handleChange.bind(this)} />
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
									 onChange={this.handleChange.bind(this)} />
								</div> 
								<span id="lastDeartmentError" className="errorMsg"></span>
							</div>
						</div>
						<div className="row formWrapper">
							<div className="col-lg-4">
								<label htmlFor="lastDeartment" className="nameTitleForm">
									Total Experience
									<sup className="nameTitleFormStar">*</sup>
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon"><i className="fa fa-briefcase"></i></span> 
									<input type="number" name="totalExperience" id="totalExperience"
									 className="form-control inputBox" value={this.state.totalExperience} 
									 onChange={this.handleChange.bind(this)} />
								</div> 
								<span id="totalExperienceError" className="errorMsg"></span>
							</div>
							<div className="col-lg-4">
								<label htmlFor="lastDeartment" className="nameTitleForm">
									Relevant Experience
									<sup className="nameTitleFormStar">*</sup>
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon"><i className="fa fa-briefcase"></i></span> 
									<input type="number" name="relevantExperience" id="relevantExperience"
									 className="form-control inputBox" value={this.state.relevantExperience} 
									 onChange={this.handleChange.bind(this)} />
								</div> 
								<span id="relevantExperienceError" className="errorMsg"></span>
							</div>
							
						</div>
						<div className="row formWrapper">
							<div className="col-lg-3 ">
							<label htmlFor="currentlyWorkingHere" className="nameTitleForm ">
									Currently Working here
								</label>
								{/*<div className="customCheckBox">
									<label  className="">
										<input type="checkbox" name="currentlyWorkingHere" id="currentlyWorkingHere"
										value={this.state.currentlyWorkingHere}  onChange={ this.handleChangeCheckbox.bind(this) } checked={this.state.currentlyWorkingHere} />
										<span className="checkmark"></span>
									</label>
								</div>*/}
								<div className="input-group genderFeildWrapper genderFeildWrapper2">
									<div className={this.state.currentlyWorkingHere==="Yes"
														? 
														"genderFeild col-lg-6 genderFeildActive" 
														: 
														"genderFeild col-lg-6" }  
											 id="Yes" name="currentlyWorkingHere" 
											 onClick={this.handleChangeCheckbox.bind(this)}>

											<div className="row" >
												Yes
											</div>
									</div>
									<div className={this.state.currentlyWorkingHere==="No"
									                ? "genderFeild col-lg-6 genderFeildActive" 
									                : "genderFeild col-lg-6" } 
									     id="No" name="currentlyWorkingHere" 
									     onClick={this.handleChangeCheckbox.bind(this)}>

										<div className="row">
											No
										</div>
									</div>
								</div>
								
							</div>
							<div className="col-lg-3 experienceBoxWidth">
								<label htmlFor="fromDate" className="nameTitleForm">
									Working From
									<sup className="nameTitleFormStar">*</sup>
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon">
										<i className="fa fa-calendar"></i> 
									</span> 
									<input type="month" name="fromDate" id="fromDate" 
									 className="form-control inputBox date" 
									 value={this.state.fromDate} 
									 onChange={this.handleChange.bind(this)} />
								</div> 
								<span id="fromDateError" className="errorMsg"></span>
							</div>

							<div className="col-lg-3 experienceBoxWidth">
								<label htmlFor="toDate" className="nameTitleForm">
									Worked Till
									<sup className="nameTitleFormStar">*</sup>
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon">
										<i className="fa fa-calendar"></i> 
									</span> 
									<input type="month" name="toDate" id="toDate" 
									 className="form-control inputBox date" 
									 value={this.state.toDate} min={Moment(this.state.fromDate).format("YYYY-MM")}
									 onChange={this.handleChange.bind(this)} />
								</div> 
								<span id="toDateError" className="errorMsg"></span>
							</div>

							<div className="col-lg-3">
								<label htmlFor="fromDate" className="nameTitleForm">
									Experience
								</label>
								<div className="input-group showFeild2" name="exp" id="exp"  >
									{this.state.expYears + "  Years, " + 
									 this.state.expMonths + " months"}	
								</div> 
							</div>

						</div>
						<div className="row formWrapper">
							<div className="col-lg-12">
								<label htmlFor="responsibilities" className="nameTitleForm">
									Responsibilities
								</label>
								<div>
									<CKEditor
								        editor  	= 	{ClassicEditor}
								        data 		= 	{this.state.responsibilities}
								        id 			= 	"responsibilities"
								        onInit		=	{ editor =>	{}}
								        onChange 	=	{(event, editor) => {this.setState({ responsibilities: editor.getData() });} }
								        onBlur		=	{ editor 	=> 	{} }
								        onFocus		=	{ editor 	=> {} }
							        />	
								</div>
							</div>
						</div>	
						<div className="row formWrapper">	
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
									 onChange={this.handleChange.bind(this)} />
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
									 onChange={this.handleChange.bind(this)} />
								</div> 
								<span id="reportingManagerDesignationError" className="errorMsg"></span>
							</div>

						</div>
						<div className="row formWrapper">
							<div className="col-lg-4">
								<label htmlFor="currentCTC" className="nameTitleForm">
									Current CTC (Annual in INR)
									<sup className="nameTitleFormStar">*</sup>
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon">
										<FontAwesomeIcon icon="rupee-sign" /> 
									</span> 
									<input type="number" name="currentCTC" id="currentCTC" 
									 className="form-control inputBox" value={this.state.currentCTC}
									 onChange={this.handleChange.bind(this)} />
								</div> 
								<span id="currentCTCError" className="errorMsg"></span>
							</div>

							<div className="col-lg-4">
								<label htmlFor="expectedCTC" className="nameTitleForm">
									Expected CTC (Annual in INR)
									<sup className="nameTitleFormStar">*</sup>
								</label>
								<div className="input-group ">
									<span className="input-group-addon inputBoxIcon">
										<FontAwesomeIcon icon="rupee-sign" /> 
									</span> 
									<input type="number" name="expectedCTC" id="expectedCTC" 
									 className="form-control inputBox" value={this.state.expectedCTC} 
									 onChange={this.handleChange.bind(this)} />
								</div> 
								<span id="expectedCTCError" className="errorMsg"></span>
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
									 onChange={this.handleChange.bind(this)} />
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
									console.log(elem)
									return(
										<div className="col-lg-6 AddressOuterWrapper"  key={index}>
											<div className="col-lg-12 addWrapper">
												<div className="row">
													<div className="col-lg-4 addLeftWrapper">
														<div className="addLogoDiv">
															<FontAwesomeIcon icon="user-clock" /> 
														</div>
														<div className="addLogoTextDiv" key={index}>
															{elem.company_id.companyName}
														</div>
													</div> 
													<div className="col-lg-8 addRightWrapper">
														<div className="row">
														<div className="addRightText ">	
															<div className="AddressBoxText" key={index}>
																{elem.company_id.companyName}
															</div>
															<div className="AddressBoxText" key={index}>
																{elem.industry_id.industry}
															</div>
															<div className="AddressBoxText">
															{elem.district +" "+elem.country}
															</div>
															<div className="AddressBoxText">
																{elem.lastDegn}
															</div>
															<div className="AddressBoxText">
																{elem.department}
															</div>
															<div className="AddressBoxText">
																{elem.totalExperience}
															</div>
															
															
															
														</div>
														<div className="col-lg-12">
								                            <div className="addRightbtn">
								                                <a id={elem._id} href={"/experience/"+this.state.candidate_id+"/edit/"+elem._id}>
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
						
						<button className="buttonNext pull-right" onClick={this.handelSubmit.bind(this)}>
							Next 
							<FontAwesomeIcon className="nextArrow" icon="arrow-right" />
						</button>
					</form>
				</div>
			);
	}
}

export default withRouter(Experience);