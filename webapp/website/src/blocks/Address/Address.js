import React,{Component}    from 'react';
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome';
import Moment               from 'moment';
import { withRouter }	 	from 'react-router-dom';
import Axios 			 	from 'axios';
import Swal 			 	from 'sweetalert2';
import '../BasicInfoForm/BasicInfoForm.css';
import './Address.css';


class Address extends Component{
	constructor(props){
		super(props);

		this.state={
			addressArry        :[],
			addressType        : "",
			addressID          : this.props.match.params.addressID,
			candidateID        : this.props.match.params.candidateID,
			houseNumber        : "",
			address            : "",
			area               : "",
			city               : "",
			district   		   : "",	
			state              : "",
			country	           : "",
			pincode            : "",
			inputAddressType   : [],
			buttonText         : "Save",
			
		}
	}
	componentDidMount(){
		this.getData();

		Axios.get("/api/addresstypemaster/get/list")
			.then(response => {
				this.setState({inputAddressType : response.data});
			})
			.catch(error=>{
				Swal.fire("Error while getting List data",error.message,'error');
			})

		if(this.props.match.params.addressID){
			this.edit()
		}
	}
	getData(){
		
		Axios.get("/api/candidatemaster/get/one/"+this.state.candidateID)
		.then(response=>{
			 	this.setState({
			 		addressArry: response.data[0].address

				 })
			 })
			 .catch(error=>{
			 	Swal.fire("Submit Error!",error.message,'error');
			 })
	}
	//========== User Define Function Start ================
	edit(){
		var candidateID = this.state.candidateID;
		var addressID   = this.state.addressID;
		if (addressID) {
			var idDate ={
				candidateID : this.state.candidateID,
				addressID : this.state.addressID,
			}
			Axios.post("/api/candidatemaster/post/getOneCandidateAddress",idDate)
			.then(response=>{
				var editData =response.data;

			 	this.setState({
			 		addressType :editData[0].address[0].addressType,
			 		houseNumber :editData[0].address[0].houseNumber,
			 		address     :editData[0].address[0].address,
			 		area :editData[0].address[0].area,
			 		city :editData[0].address[0].cityVillage,
			 		district :editData[0].address[0].district,
			 		state :editData[0].address[0].state,
			 		country :editData[0].address[0].country,
			 		pincode :editData[0].address[0].pincode,
			 		buttonText:"Update"
			 	})
			 	
			 })
			 .catch(error=>{
			 	Swal.fire("Submit Error!",error.message,'error');
			 })
		}
	}
	deleteDate(event){
		
		var data_id =  event.currentTarget.id;

		Swal.fire({
		title : 'Are you sure? you want to delete this Address details!!!',
		text : 'You will not be able to recover this Address details',
		icon : 'warning',
		showCancelButton : true,
		confirmButtonText : 'Yes, delete it!',
		cancelButtonColor : 'No, keep it',
		confirmButtonColor : '#d33',
	
	  }).then((result) =>{
		if(result.value){
			if(data_id){
				Axios.delete("/api/candidatemaster/deleteAddress/"+this.state.candidateID+"/delete/"+data_id)
				.then(response =>{
						if(response.data.deleted===true){
						Swal.fire(
									'Deleted!',
									'Address details has been deleted successfully!',
									'success'
							);
					}
			})
				.catch(error=>{
					
					Swal.fire(
								"Some problem occured deleting Address details!",
								error.message,
								'error'
						)
				})
			}
				
				}else if (result.dismiss === Swal.DismissReason.cancel){
					
					Swal.fire(
						'Cancelled',
						'Your Address details is safe :)',
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
		this.props.history.push("/basic-info");
	}
	handleSave(event){
		event.preventDefault();
		var status =  this.validateForm();
			var formValues = {	
								candidateID   : this.state.candidateID,
								addressID   : this.state.addressID,
								address       :   
								{
									addressType   : this.state.addressType,
									houseNumber   : this.state.houseNumber,
									address       : this.state.address,
									area          : this.state.area,
									cityVillage   : this.state.city,
									district      : this.state.district,
									state         : this.state.state,
									country       : this.state.country,
									pincode       : this.state.pincode
								}
								
							}
		if(this.props.match.params.addressID){
			this.updateData(formValues);
		}else{
			this.insetData(formValues);
		}
		this.getData();
	}
	updateData(formValues){
		var status =  this.validateForm();
		if(status==true){
					Axios.patch("/api/candidatemaster/patch/updateOneCandidateAddress",formValues)
				 .then(response=>{

									Swal.fire("Congrats","Your Address details update Successfully","success");
										this.setState({
														addressType        : [],
														houseNumber        : "",
														address            : "",
														area               : "",
														city               : "",
														district   		   : "",	
														state              : "",
														country	           : "",
														pincode            : "",
														buttonText         : "Save",
													})	
							this.props.history.push("/address/"+this.state.candidateID);
					})
					.catch(error =>{
						console.log(error);
						Swal.fire("Submit Error!",error.message,'error');
					});
				}

			
		}
		
	insetData(formValues){
		var status =  this.validateForm();
			if(status==true){
					Axios.patch("/api/candidatemaster/patch/addCandidateAddress",formValues)
				 .then(response=>{

									Swal.fire("Congrats","Your Address details is insert Successfully","success");
										this.setState({
														addressType        : [],
														houseNumber        : "",
														address            : "",
														area               : "",
														city               : "",
														district   		   : "",	
														state              : "",
														country	           : "",
														pincode            : "",
														buttonText         : "Save"
													})	
					})
					.catch(error =>{
						console.log(error);
						Swal.fire("Submit Error!",error.message,'error');
					});
				}

			
		}
	
	handleSubmit(event){
		event.preventDefault();
    	this.props.history.push("/contact/"+this.state.candidateID);
	}
	//========== User Define Function End ==================

	//========== Validation Start ==================
	 validateForm=()=>{
		var status = true;
	
		if(this.state.houseNumber.length<=0){
			document.getElementById("houseNumberError").innerHTML=  
			"Please enter your House Number";  
			status=false; 
		}else{
			document.getElementById("houseNumberError").innerHTML=  
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
		if(this.state.district.length<=0){
			document.getElementById("districtError").innerHTML=  
			"Please enter your District";  
			status=false; 
		}else{
			document.getElementById("districtError").innerHTML=  
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
		if(this.state.pincode.length<=0){
			document.getElementById("pincodeError").innerHTML=  
			"Please enter your Pincode";  
			status=false; 
		}else{
			document.getElementById("pincodeError").innerHTML=  
			""; 
			status = true;
		}
	
		
		 return status;
	}

	//========== Validation End ==================

	render(){
		return(
				<div className="mainFormWrapper col-lg-12">
					<div className="row">
						<form>

							<div className="row formWrapper">

								<div className="col-lg-4">
									<label htmlFor="addressType" className="nameTitleForm">Address Type<sup className="nameTitleFormStar">*</sup></label>
									<div className="input-group ">
										<span className="input-group-addon inputBoxIcon inputBoxIcon1"><i className="fa fa-map-marker"></i></span> 
										<select className="form-control inputBox" id="addressType" value={this.state.addressType} name="addressType" onChange={this.handleChange.bind(this)}>
										  	<option > ---- select ---- </option>
										  	{
										  		this.state.inputAddressType!=null && this.state.inputAddressType.length>0
										  		?	
										  			this.state.inputAddressType.map((elem,index)=>{
										  				return(
										  					<option value={elem._id} key={index}>{elem.addressType}</option>
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

								<div className="col-lg-8">
									<label htmlFor="houseNumber" className="nameTitleForm">House/Building Number<sup className="nameTitleFormStar">*</sup></label>
									<div className="input-group ">
										<span className="input-group-addon inputBoxIcon inputBoxIcon1"><i className="fa fa-map-marker"></i></span> 
										<input type="text" name="houseNumber" id="houseNumber" className="form-control inputBox " value={this.state.houseNumber} onChange={this.handleChange.bind(this)} />
									</div> 
									<span id="houseNumberError" className="errorMsg"></span>
								</div>

								<div className="col-lg-4">
									<label htmlFor="houseNumber" className="nameTitleForm nameTitleFormAge"></label>
									<div className="input-group showFeild2">
										{this.state.houseNumber}	
									</div> 
								</div>

							</div>

							<div className="row formWrapper">

								

								<div className="col-lg-8">
									<label htmlFor="address" className="nameTitleForm">Address</label>
									<div className="input-group ">
										<span className="input-group-addon inputBoxIcon"><i className="fa fa-map-marker"></i></span> 
										<input type="text" name="address" id="address" className="form-control inputBox " value={this.state.address} onChange={this.handleChange.bind(this)} />
									</div> 
								</div>

								<div className="col-lg-4">
									<label htmlFor="address" className="nameTitleForm nameTitleFormAge"></label>
									<div className="input-group showFeild2">
										{this.state.address}	
									</div> 
								</div>

							</div>

							<div className="row formWrapper">

								<div className="col-lg-4">
									<label htmlFor="area" className="nameTitleForm">Area/Suburb</label>
									<div className="input-group ">
										<span className="input-group-addon inputBoxIcon"><FontAwesomeIcon icon="map-marked-alt" /></span> 
										<input type="text" name="area" id="area" className="form-control inputBox" value={this.state.area} onChange={this.handleChange.bind(this)} />
									</div> 
								</div>

								<div className="col-lg-4">
									<label htmlFor="city" className="nameTitleForm">City/Village<sup className="nameTitleFormStar">*</sup></label>
									<div className="input-group ">
										<span className="input-group-addon inputBoxIcon"><i className="fa fa-map-marker"></i> </span> 
										<input type="text" name="city" id="city" className="form-control inputBox" value={this.state.city} onChange={this.handleChange.bind(this)} />
									</div> 
									<span id="cityError" className="errorMsg"></span>
								</div>

								<div className="col-lg-4">
									<label htmlFor="district" className="nameTitleForm">District<sup className="nameTitleFormStar">*</sup></label>
									<div className="input-group ">
										<span className="input-group-addon inputBoxIcon"><i className="fa fa-map"></i> </span> 
										<input type="text" name="district" id="district" className="form-control inputBox" value={this.state.district} onChange={this.handleChange.bind(this)} />
									</div> 
									<span id="districtError" className="errorMsg"></span>
								</div>

							</div>

							<div className="row formWrapper">

								<div className="col-lg-4">
									<label htmlFor="state" className="nameTitleForm">State<sup className="nameTitleFormStar">*</sup></label>
									<div className="input-group ">
										<span className="input-group-addon inputBoxIcon"><i className="fa fa-map"></i> </span> 
										<input type="text" name="state" id="state" className="form-control inputBox" value={this.state.state} onChange={this.handleChange.bind(this)} />
									</div> 
									<span id="stateError" className="errorMsg"></span>
								</div>

								<div className="col-lg-4">
									<label htmlFor="country" className="nameTitleForm">Country<sup className="nameTitleFormStar">*</sup></label>
									<div className="input-group ">
										<span className="input-group-addon inputBoxIcon"><i className="fa fa-flag"></i> </span> 
										<input type="text" name="country" id="country" className="form-control inputBox" value={this.state.country} onChange={this.handleChange.bind(this)} />
									</div> 
									<span id="countryError" className="errorMsg"></span>
								</div>

								<div className="col-lg-4">
									<label htmlFor="pincode" className="nameTitleForm">Pincode<sup className="nameTitleFormStar">*</sup></label>
									<div className="input-group ">
										<span className="input-group-addon inputBoxIcon"><FontAwesomeIcon icon="map-marked-alt" /> </span> 
										<input type="number" name="pincode" id="pincode" className="form-control inputBox" value={this.state.pincode} onChange={this.handleChange.bind(this)} />
									</div> 
									<span id="pincodeError" className="errorMsg"></span>
								</div>

							</div>
							<div>
								<button className="buttonBack pull-right" onClick={this.handleSave.bind(this)}> {this.state.buttonText}</button>
							</div>
							<div className=" AddressWrapper col-lg-12" >
								<div className="row">
								{
								this.state.addressArry.length > 0
								?
								this.state.addressArry.map((elem,index)=>{
									return(
									
										<div className="col-lg-6 AddressOuterWrapper"  key={index}>
											<div className="col-lg-12 AddressInnerWrapper">
												<div className="row">
													<div className="col-lg-1 AddressBoxLeftIcon">
														<FontAwesomeIcon icon="map-marker-alt" />
													</div>
													<div className="col-lg-10">
														<div className="AddressBoxHead">
															Address details
														</div>
														<div className="AddressBoxText">
															{elem.addressType}
														</div>
														<div className="AddressBoxText">
															{elem.address}
														</div>
														<div className="AddressBoxText">
															{elem.area}
														</div>
														<div className="AddressBoxText">
															{elem.houseNumber}
														</div>
														<div className="AddressBoxText">
															{elem.district}
														</div>
														<div className="AddressBoxText">
															{elem.state}
														</div>
														<div className="AddressBoxText">
															{elem.country}
														</div>
														<div className="AddressBoxText">
															{elem.pincode}
														</div>
													</div>
													<div className="col-lg-1 AddressBoxRightIcon hoverEdit ">
														<div className="row">
															<FontAwesomeIcon icon="ellipsis-h" />
														
																<div className="rightIconHideWrapper" >
																<a id={elem._id} href={"/address/"+this.state.candidateID+"/edit/"+elem._id}>
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

						
							
							
							<button className="buttonBack pull-left " onClick={this.handleBack.bind(this)}> <i className="fa fa-angle-left"> - Back</i></button>
							
							<button className="buttonNext pull-right" onClick={this.handleSubmit.bind(this)}>Next - <i className="fa fa-angle-right "></i></button>
						</form>
					</div>
				</div>
			);
	}
}

export default withRouter(Address);