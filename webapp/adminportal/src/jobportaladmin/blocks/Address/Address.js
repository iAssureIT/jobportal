import React,{Component}    from 'react';
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome';
import Moment               from 'moment';
import { withRouter }	 	from 'react-router-dom';
import Axios 			 	from 'axios';
import Swal 			 	from 'sweetalert2';
import { connect }        	from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../Common/actions/index.js';
import '../BasicInfoForm/BasicInfoForm.css';
import './Address.css';

import PlacesAutocomplete, {
  		geocodeByAddress,
  		getLatLng
} from "react-places-autocomplete";

class Address extends Component{
	constructor(props){
		super(props);

		this.state={
			addressID          : this.props.match.params.addressID,
			candidate_id        : this.props.match.params.candidate_id,
			addressArry        : [],
			addressLine1 	   : "",
			address 	       : "",
			addressType        : "",
			stateCode		   : "",
			countryCode 	   : "IN",
			stateArray 		   : [],
			districtArray 	   : [],
			pincodeExists 	   : true,
			houseNumber        : "",
			area               : "",
			city               : "",
			district   		   : "",	
			states             : "",
			country	           : "India",
			pincode            : "",
			inputAddressType   : [], 
			addressTypeArry    : [],
			buttonText         : "Save",
			profileCompletion  : 0
		}
		this.camelCase = this.camelCase.bind(this)
		this.handleChangeState = this.handleChangeState.bind(this);
	}
	componentDidMount(){
		var {mapAction} = this.props;
		const userDetails = JSON.parse(localStorage.getItem("userDetails"));
        const token = userDetails.token;
        Axios.defaults.headers.common['Authorization'] = 'Bearer '+ token;


		this.getData();
		
		Axios.post("/api/addresstypemaster/get/list", {"startRange":0,"limitRange":10000})
			.then(response => {
				this.setState({inputAddressType : response.data});
			})
			.catch(error=>{
				if(error.message === "Request failed with status code 401"){
		          var userDetails =  localStorage.removeItem("userDetails");
		          localStorage.clear();
		          Swal.fire("","Error while getting address details","error")
		              .then(okay => {
		                if (okay) {
		                  window.location.href = "/login";
		                }
		              });
		        }else{
		            Swal.fire("", "Error while getting address info", "");
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
		if(this.props.match.params.addressID){
			this.edit()
		}
	}

	getData(){
		var {mapAction} = this.props;
		Axios.get("/api/candidatemaster/get/one/"+this.state.candidate_id)
		.then(response=>{
			 	this.setState({
			 		addressArry    : response.data.address,
			 		profileCompletion 	: response.data.profileCompletion
			 		//addressTypeArry: response.data.addressType
				})
			 	var userDetails = this.props.userDetails;
		        userDetails.profileCompletion = response.data.profileCompletion;

		        mapAction.setUserDetails(userDetails);
			 })
			 .catch(error=>{
			 	
                    Swal.fire("", "Error while getting data", "");
                
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
	    var states = document.getElementById("states");
    	var state = states.options[states.selectedIndex].getAttribute("state");
		this.setState({
			[event.target.name]: event.target.value,
			states: state
		});
	}
	//========== User Define Function Start ================
	edit(event){

		var candidate_id = this.state.candidate_id;
		var addressID   = this.state.addressID;
		if (addressID) {

			var idDate ={
				candidate_id : this.state.candidate_id,
				addressID : this.state.addressID,
			}
			Axios.post("/api/candidatemaster/post/getOneCandidateAddress",idDate)
			.then(response=>{

				var editData =response.data;

			 	this.setState({
			 		addressType   :editData[0].address[0].addressType?editData[0].address[0].addressType:"",
			 		houseNumber   :editData[0].address[0].houseNumber?editData[0].address[0].houseNumber:"",
			 		addressLine1  :editData[0].address[0].address?editData[0].address[0].address:"",
			 		area          :editData[0].address[0].area?editData[0].address[0].area:"",
			 		city          :editData[0].address[0].cityVillage?editData[0].address[0].cityVillage:"",
			 		district      :editData[0].address[0].district?editData[0].address[0].district:"",
			 		states        :editData[0].address[0].state?editData[0].address[0].state:"",
			 		country       :editData[0].address[0].country?editData[0].address[0].country:"",
			 		stateCode     :editData[0].address[0].stateCode?editData[0].address[0].stateCode:"",
			 		countryCode   :editData[0].address[0].countryCode?editData[0].address[0].countryCode:"",
			 		pincode       :editData[0].address[0].pincode?editData[0].address[0].pincode:"",
			 		buttonText    :"Update"
			 	})
			 	
			 })
			 .catch(error=>{
			 	
                    Swal.fire("", "Error while getting data", "");
                
			 })
		}
	}
	deleteDate(event){

		var data_id =  event.currentTarget.id;
		var {mapAction} = this.props;

		console.log(this.state.addressArry.length)
		Swal.fire({
		title 				: ' ',
		html				: 'Are you sure<br />you want to delete this address details?',
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
				if (this.state.addressArry.length == 1) {
					profileCompletion = profileCompletion - 20;
				}else{
					profileCompletion = this.state.profileCompletion
				}

				Axios.delete("/api/candidatemaster/deleteAddress/"+this.state.candidate_id+"/delete/"+data_id+"/"+profileCompletion)
				.then(response =>{
						if(response.data.deleted===true){

						var userDetails = this.props.userDetails;
						userDetails.profileCompletion = profileCompletion;

						mapAction.setUserDetails(userDetails);

						Swal.fire(
									'',
									'Address details has been deleted successfully!',
									''
							);
						this.getData();
					}
				})
				.catch(error=>{
					if(error.message === "Request failed with status code 401"){
			          var userDetails =  localStorage.removeItem("userDetails");
			          localStorage.clear();
			          Swal.fire("","Error while delete address details","error")
			              .then(okay => {
			                if (okay) {
			                  window.location.href = "/login";
			                }
			              });
			        }else{
			            Swal.fire("", "Error while delete address details", "");
			        }
				})
			}
				
			}else if (result.dismiss === Swal.DismissReason.cancel){
				
				/*Swal.fire(
					'',
					'Your Address details is safe :)',
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
		this.props.history.push("/candidate/basic-info");
	}
	handleSave(event){
		event.preventDefault();
		var status =  this.validateForm();
			//console.log(this.state.addressArry.length )

			var profileCompletion = this.state.profileCompletion
			if (!this.state.addressArry.length) {
				profileCompletion = profileCompletion + 20;
			}else{
				profileCompletion = this.state.profileCompletion
			}
			var formValues = {	
								candidate_id   : this.state.candidate_id,
								addressID      : this.state.addressID,
								address        :   
								{
									addressType   : this.state.addressType,
									houseNumber   : this.state.houseNumber,
									address       : this.state.addressLine1,
									area          : this.state.area,
									cityVillage   : this.state.city,
									district      : this.state.district,
									state         : this.state.states,
									country       : this.state.country,
									pincode       : this.state.pincode,
									stateCode 	  : this.state.stateCode,
        							countryCode   : this.state.countryCode
								},
								profileCompletion : profileCompletion
				
							}		
							console.log(formValues)			
		if(this.props.match.params.addressID){
			this.updateData(formValues);
		}else{
			this.insetData(formValues);
		}
		this.getData();
	}
	updateData(formValues){
		var status =  this.validateForm();
		var {mapAction} = this.props;
		
		if(status==true){
			
				 Axios.patch("/api/candidatemaster/patch/updateOneCandidateAddress",formValues)
				 .then(response=>{

							Swal.fire('', "Your Address details update Successfully", '');
								this.setState({
												addressType        : "",
												pincodeExists 	   : true,
												houseNumber        : "",
												addressLine1       : "",
												area               : "",
												city               : "",
												district   		   : "",	
												states             : "",
												country	           : "",
												pincode            : "",
												buttonText         : "Save",
											})	
								this.getData();	
									
							   this.props.history.push("/candidate/address/"+this.state.candidate_id);
							   window.location.reload(false);
							   
							
					})
					.catch(error =>{
						if(error.message === "Request failed with status code 401"){
				          var userDetails =  localStorage.removeItem("userDetails");
				          localStorage.clear();
				          Swal.fire("","Error while Update Address details","error")
				              .then(okay => {
				                if (okay) {
				                  window.location.href = "/login";
				                }
				              });
				        }else{
				            Swal.fire("", "Error while Update Address details", "");
				        }
					});
				}

			
		}
		
	insetData(formValues){
		var status =  this.validateForm();
		var {mapAction} = this.props;
			if(status==true){
			Axios.patch("/api/candidatemaster/patch/addCandidateAddress",formValues)
				 .then(response=>{
				 	
				 	var userDetails = this.props.userDetails;
					userDetails.profileCompletion = formValues.profileCompletion;

					mapAction.setUserDetails(userDetails);

					Swal.fire('', "Your Address details is insert Successfully", '');
						this.setState({
										addressType        : "",
										pincodeExists 	   : true,
										houseNumber        : "",
										addressLine1       : "",
										area               : "",
										city               : "",
										district   		   : "",	
										states             : "",
										country	           : "",
										pincode            : "",
										buttonText         : "Save"
									})	
						this.getData();
					})
					.catch(error =>{
						if(error.message === "Request failed with status code 401"){
				          var userDetails =  localStorage.removeItem("userDetails");
				          localStorage.clear();
				          Swal.fire("","Error while insert Address details","error")
				              .then(okay => {
				                if (okay) {
				                  window.location.href = "/login";
				                }
				              });
				        }else{
				            Swal.fire("", "Error while insert Address details", "");
				        }
					});
				}

			
		}
	
	handleSubmit(event){
		event.preventDefault();
    	this.props.history.push("/candidate/academics/"+this.state.candidate_id);
	}
	
	camelCase(str) {
		return str
			.toLowerCase()
			.split(' ')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
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
	//========== User Define Function End ==================

	//========== Validation Start ==================
	 validateForm=()=>{
		var status = true;
		var regPincode = /^[1-9][0-9]{5}$/;
		var regName = /^[a-zA-Z]+$/;


		if(this.state.addressType.length<=0){
			document.getElementById("addressTypeError").innerHTML=  
			"Please select address type";  
			status=false; 
		}else{
			document.getElementById("addressTypeError").innerHTML = ""; 
			status = true;
		}
		if(this.state.addressLine1.length<=0){
			document.getElementById("addressError").innerHTML=  
			"Please enter your address";  
			status=false; 
		}else{
			document.getElementById("addressError").innerHTML = ""; 
			status = true;
		}
		if(this.state.area.length<=0){
			document.getElementById("areaError").innerHTML=  
			"Please enter your address";  
			status=false; 
		}else{
			document.getElementById("areaError").innerHTML = ""; 
			status = true;
		}
		
		if(this.state.pincode.length<=0){
			document.getElementById("pincodeError").innerHTML=  
			"Please enter your pincode";  
			status=false; 
		}else{ 

			if(!regPincode.test(this.state.pincode)){
		      	document.getElementById("pincodeError").innerHTML = "Please enter valid pincode";  
		      	status=false; 
		    }else{
		    	document.getElementById("pincodeError").innerHTML = ""; 
				status = true;
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
           /*if(!this.state.states.match(regName)){
              status = false;
              document.getElementById("statesError").innerHTML = "Please enter a valid state name";
           }else{
           		document.getElementById("statesError").innerHTML = "";
           }  */     
        }
        if(typeof this.state.district !== "undefined"){
           if(!this.state.district.match(regName)){
              status = false;
              document.getElementById("districtError").innerHTML = "Please enter a valid district name";
           }else{
           		document.getElementById("districtError").innerHTML = "";
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
	
		
		return status;
	}

	//========== Validation End ==================

	render(){
	const searchOptions = {
      // types: ['(cities)'],
      componentRestrictions: {country: "in"}
    }	
		return(
				<div className="mainFormWrapper col-lg-12">
					<div className="row">
						<form>

							<div className="row formWrapper">

								<div className="col-lg-4">
									<label htmlFor="addressType" className="nameTitleForm">
										Address Type
										<sup className="nameTitleFormStar">*</sup>
									</label>
									<div className="input-group ">
										<span className="input-group-addon inputBoxIcon inputBoxIcon1">
											<i className="fa fa-map-marker"></i>
										</span> 
										<select className="form-control inputBox" id="addressType" 
										 value={this.state.addressType} name="addressType" 
										 onChange={this.handleChange.bind(this)}>
										  	<option > ---- select ---- </option>
										  	{
										  		this.state.inputAddressType!=null 
										  		&& this.state.inputAddressType.length>0
										  		?	
										  			this.state.inputAddressType.map((elem,index)=>{
										  				return(
										  					<option value={elem._id} key={index}>
										  						{elem.addressType}
										  					</option>
										  				);
										  			})
										  			
										  		:
										  			null
										  	}
										</select>
									</div>
									<span id="addressTypeError" className="errorMsg"></span>
								</div>

							
								<div className="col-lg-4">
									<label htmlFor="houseNumber" className="nameTitleForm">
										House/Building Number
										
									</label>
									<div className="input-group ">
										<span className="input-group-addon inputBoxIcon inputBoxIcon1">
											<i className="fa fa-map-marker"></i>
										</span> 
										<input type="text" name="houseNumber" id="houseNumber" 
										 className="form-control inputBox " 
										 value={this.state.houseNumber} 
										 onChange={this.handleChange.bind(this)} />
									</div> 
									<span id="houseNumberError" className="errorMsg"></span>
								</div>

								<div className="col-lg-4">
									<label htmlFor="address" className="nameTitleForm">Address <sup className="nameTitleFormStar">*</sup></label>
									<div className="input-group ">
										<span className="input-group-addon inputBoxIcon">
											<i className="fa fa-map-marker"></i>
										</span> 
										<PlacesAutocomplete
	                                        value={this.state.addressLine1}
	                                        onChange={this.handleChangePlaces}
	                                        onSelect={this.handleSelect}
	                                        searchOptions={searchOptions}
	                                      	>
	                                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
	                                          <div>
		                                          <div>
		                                            <input
		                                              {...getInputProps({
		                                                placeholder: 'Search Address ...',
		                                                className: 'location-search-input form-control inputBox',
		                                                id:"addressLine1",
		                                                name:"addressLine1",
		                                              })}
		                                            />
		                                            
		                                          </div>
		                                          <div className={this.state.addressLine1 
		                                            				? 
		                                            				"autocomplete-dropdown-container SearchListContainer SearchListContainer1 inputSearch" 
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
									<span id="addressError" className="errorMsg"></span> 
								</div>
							</div>

							<div className="row formWrapper">
								<div className="col-lg-4">
									<label htmlFor="area" className="nameTitleForm">
										Area/Suburb <sup className="nameTitleFormStar">*</sup>
									</label>
									<div className="input-group ">
										<span className="input-group-addon inputBoxIcon">
											<FontAwesomeIcon icon="map-marked-alt" />
										</span> 
										<input type="text" name="area" id="area" 
										 className="form-control inputBox" value={this.state.area} 
										 onChange={this.handleChange.bind(this)} />
									</div> 
									<span id="areaError" className="errorMsg"></span> 
								</div>

								<div className="col-lg-4">
									<label htmlFor="city" className="nameTitleForm">
										City/Village
										<sup className="nameTitleFormStar">*</sup>
									</label>
									<div className="input-group ">
										<span className="input-group-addon inputBoxIcon">
											<i className="fa fa-map-marker"></i> 
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
											<i className="fa fa-map"></i> 
										</span> 
										<input type="text" name="district" id="district" 
										 className="form-control inputBox" value={this.state.district} 
										 onChange={this.handleChange.bind(this)} />
									</div> 
									<span id="districtError" className="errorMsg"></span>
								</div>

							</div>

							<div className="row formWrapper">

								<div className="col-lg-4">
									<label htmlFor="states" className="nameTitleForm">
										State
										<sup className="nameTitleFormStar">*</sup>
									</label>
									<div className="input-group ">
										<span className="input-group-addon inputBoxIcon">
											<i className="fa fa-map"></i> 
										</span>
										<select id="states" className="form-control inputBox selectOption"
										ref="stateCode" value={this.state.states} name="stateCode" onChange={this.handleChangeState} >
										<option selected={true}>-- Select --</option>
										{
											this.state.stateArray && this.state.stateArray.length > 0 ?
												this.state.stateArray.map((stateData, index) => {
													return (
														<option key={index} statecode={stateData.stateCode} state={this.camelCase(stateData.stateName)}>{this.camelCase(stateData.stateName)}</option>
													);
												}
												) : ''
										}
										</select>
										{/*<input type="text" className="form-control inputBox" ref="states" id="states" name="states" value={this.state.states} onChange={this.handleChange.bind(this)}/>
										*/} 			
									</div> 
									<span id="statesError" className="errorMsg"></span>
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

								<div className="col-lg-4">
									<label htmlFor="pincode" className="nameTitleForm">
										Pincode
										<sup className="nameTitleFormStar">*</sup>
									</label>
									<div className="input-group ">
										<span className="input-group-addon inputBoxIcon">
											<FontAwesomeIcon icon="map-marked-alt" /> 
										</span> 
										<input type="text" pattern="[0-9]*" maxlength="6" name="pincode" id="pincode" 
										 className="form-control inputBox" 
										 value={this.state.pincode} max="6"
										 onChange={this.handleChange.bind(this)} />
									</div> 
									<span id="pincodeError" className="errorMsg"></span>
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
							<div className=" AddressWrapper " >
								<div className="row">
								{
									!this.state.addressID
									?
									this.state.addressArry.length > 0
									?
										this.state.addressArry.map((elem,index)=>{
											return(
											
												<div className="col-lg-4 AddressOuterWrapper"  key={index}>
													<div className="">
														<div className="col-lg-12 addWrapper">
															<div className="row">
																<div className="col-lg-12 addLeftWrapper key={index}">
																		<div className="col-lg-1 iconAdd" >
																			<FontAwesomeIcon icon="home" /> 
																		</div>
																		<div className="col-lg-8 titleAdd" >
																			{elem.addressType.addressType} Address
																		</div>
																		<div className="col-lg-2 buttonAdd" >
																			<div className="row">
																				 <a id={elem._id} href={"/candidate/address/"+this.state.candidate_id+"/edit/"+elem._id}>
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
																	<div className="addRightText paddingAddress">
																		{elem.houseNumber +", "+ elem.address+" , "}<br/>
																		{elem.area +" , "+ elem.district+" , "}<br/>
																		{elem.state +" , "+elem.country +" , "+elem.pincode+" ."}
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
											<div className="noData">Address Record Not Found</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Address));

