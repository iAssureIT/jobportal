import React,{Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../BasicInfoForm/BasicInfoForm.css';


class Address extends Component{
	constructor(props){
		super(props);

		this.state={
			addressType        : "",
			houseNumber        : "",
			address            : "",
			area               : "",
			city               : "",
			district   		   : "",	
			state              : "",
			country	           : "",
			pincode            : "",
			inputAddressType   : ["Local Address", "Permanat Address"],
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

	handelSubmit(event){
		event.preventDefault();

		var status =  this.validateForm();
			var formValues = {
								addressType   : this.state.addressType,
								houseNumber   : this.state.houseNumber,
								address       : this.state.address,
								area          : this.state.area,
								city          : this.state.city,
								district      : this.state.district,
								state         : this.state.state,
								country       : this.state.country,
								pincode       : this.state.pincode,
							}
		console.log(formValues);
		
		this.setState({
			addressType        : "",
			houseNumber        : "",
			address            : "",
			area               : "",
			city               : "",
			district   		   : "",	
			state              : "",
			country	           : "",
			pincode            : "",
	
		})
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
										<select className="form-control inputBox" id="addressType" value={this.state.addressType} name="addressType" onChange={this.handelChange.bind(this)}>
										  	<option > ---- select ---- </option>
										  	{
										  		this.state.inputAddressType.length>0
										  		?	
										  			this.state.inputAddressType.map((elem,index)=>{
										  				return(
										  					<option>{elem}</option>
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
										<input type="text" name="houseNumber" id="houseNumber" className="form-control inputBox " value={this.state.houseNumber} onChange={this.handelChange.bind(this)} />
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
										<input type="text" name="address" id="address" className="form-control inputBox " value={this.state.address} onChange={this.handelChange.bind(this)} />
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
										<input type="text" name="area" id="area" className="form-control inputBox" value={this.state.area} onChange={this.handelChange.bind(this)} />
									</div> 
								</div>

								<div className="col-lg-4">
									<label htmlFor="city" className="nameTitleForm">City/Village<sup className="nameTitleFormStar">*</sup></label>
									<div className="input-group ">
										<span className="input-group-addon inputBoxIcon"><i className="fa fa-map-marker"></i> </span> 
										<input type="text" name="city" id="city" className="form-control inputBox" value={this.state.city} onChange={this.handelChange.bind(this)} />
									</div> 
									<span id="cityError" className="errorMsg"></span>
								</div>

								<div className="col-lg-4">
									<label htmlFor="district" className="nameTitleForm">District<sup className="nameTitleFormStar">*</sup></label>
									<div className="input-group ">
										<span className="input-group-addon inputBoxIcon"><i className="fa fa-map"></i> </span> 
										<input type="text" name="district" id="district" className="form-control inputBox" value={this.state.district} onChange={this.handelChange.bind(this)} />
									</div> 
									<span id="districtError" className="errorMsg"></span>
								</div>

							</div>

							<div className="row formWrapper">

								<div className="col-lg-4">
									<label htmlFor="state" className="nameTitleForm">State<sup className="nameTitleFormStar">*</sup></label>
									<div className="input-group ">
										<span className="input-group-addon inputBoxIcon"><i className="fa fa-map"></i> </span> 
										<input type="text" name="state" id="state" className="form-control inputBox" value={this.state.state} onChange={this.handelChange.bind(this)} />
									</div> 
									<span id="stateError" className="errorMsg"></span>
								</div>

								<div className="col-lg-4">
									<label htmlFor="country" className="nameTitleForm">Country<sup className="nameTitleFormStar">*</sup></label>
									<div className="input-group ">
										<span className="input-group-addon inputBoxIcon"><i className="fa fa-flag"></i> </span> 
										<input type="text" name="country" id="country" className="form-control inputBox" value={this.state.country} onChange={this.handelChange.bind(this)} />
									</div> 
									<span id="countryError" className="errorMsg"></span>
								</div>

								<div className="col-lg-4">
									<label htmlFor="pincode" className="nameTitleForm">Pincode<sup className="nameTitleFormStar">*</sup></label>
									<div className="input-group ">
										<span className="input-group-addon inputBoxIcon"><FontAwesomeIcon icon="map-marked-alt" /> </span> 
										<input type="text" name="pincode" id="pincode" className="form-control inputBox" value={this.state.pincode} onChange={this.handelChange.bind(this)} />
									</div> 
									<span id="pincodeError" className="errorMsg"></span>
								</div>

							</div>
							<button className="buttonBack pull-left" onClick={this.handelSubmit.bind(this)}> <i className="fa fa-angle-left"> - Back</i></button>
							<button className="buttonNext pull-right" onClick={this.handelSubmit.bind(this)}>Next - <i className="fa fa-angle-right "></i></button>
						</form>
					</div>
				</div>
			);
	}
}

export default Address;