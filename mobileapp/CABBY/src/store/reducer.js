const axios = require('axios');
const initialState = {
	openModal		: false,
	message   		: "",
	messageType 	: "",
	tracking_id 	: "",
	longitude   	: "",
	latitude    	: "",
	user_id    		: "",
	token       	: "",
	firstName      	: "",
	middleName     	: "",
	lastName       	: "",
	DOB           	: "",
	gender         	: "",
	contactNo    : "",
	altContactNo	: "",
	whatsappNo 	    : "",
	email          	: "",
	basicInfoTab    : true,
	EmpAddTab       : false,
	DocumentsTab    : false,
	addressLine1    : "",
	addressLine2    : '',
	country        	: '',
	countryCode		: '',
	state  			: '',
	stateCode 		: '',
	area            : '',
	city            : '',
	district        : '',
	pincode         : '',
	addressLine1    : '',
	addressLine2	: '',
	drivingLicenceNo: '',
	drivingLicenceValidity : '',
	adhaarCardNo    : '',
	licenseProof    : [],
	aadharProof     : [],
	identityProof   : [],
}

const reducer = (state = initialState,action) => {
	const newState = {...state};
	if(action.type === "MODAL"){
		newState.openModal 			= action.openModal;
		newState.messageHead 		= action.messageHead;
		newState.messagesSubHead 	= action.messagesSubHead;
		newState.messageType 		= action.messageType;
	}	
	if(action.type === "SET_USER_ID"){
		newState.user_id 		= action.user_id;
	}
	if(action.type === "TRACKING_ID"){
		newState.tracking_id 		= action.tracking_id;
	}
	if(action.type === "SET_STARTING_COORDINATES"){
		newState.tracking_id 		= action.tracking_id;
		newState.longitude 		    = action.longitude;
		newState.latitude 			= action.latitude;
	}
	if(action.type === "SET_SECURITY_DETAILS"){
		newState.user_id 		= action.user_id;
		newState.token 		    = action.token;
	}
	if(action.type === "BASIC_INFO"){
		newState.firstName      	= action.basicInfoValues.firstName;
		newState.middleName     	= action.basicInfoValues.middleName;
		newState.lastname       	= action.basicInfoValues.lastname;
		newState.dateOfBirth        = action.basicInfoValues.dateOfBirth;
		newState.gender         	= action.basicInfoValues.gender;
		newState.mobNumber      	= action.basicInfoValues.mobNumber;
		newState.altMobileNumber	= action.basicInfoValues.altMobileNumber;
		newState.whatsAppNumber 	= action.basicInfoValues.whatsAppNumber;
		newState.email          	= action.basicInfoValues.email;
	}
	if(action.type === "EMPLOYEE_ADDRESS"){
		newState.addressLine1      	= action.employeeAddressValues.addressLine1;
		newState.addressLine2     	= action.employeeAddressValues.addressLine2;
		newState.countryCode       	= action.employeeAddressValues.countryCode;
		newState.country            = action.employeeAddressValues.country;
		newState.stateCode         	= action.employeeAddressValues.stateCode;
		newState.state      		= action.employeeAddressValues.state;
		newState.area				= action.employeeAddressValues.area;
		newState.city 				= action.employeeAddressValues.city;
		newState.district          	= action.employeeAddressValues.district;
		newState.pincode          	= action.employeeAddressValues.pincode;
	}
	if(action.type === "EMPLOYEE_DOCUMENTS"){
		newState.drivingLicenceNo   	= action.employeeDocumentsValues.licenseNo;
		newState.drivingLicenceValidity = action.employeeDocumentsValues.effectiveTo;
		newState.adhaarCardNo       	= action.employeeDocumentsValues.aadharNo;
		newState.licenseProof       	= action.employeeDocumentsValues.licenseProof;
		newState.aadharProof        	= action.employeeDocumentsValues.aadharProof;
		newState.identityProof      	= action.employeeDocumentsValues.identityProof;
	}
	if(action.type === "DRIVER_DETAILS"){
		axios.get('/api/personmaster/get/details/'+action.userId)
	      .then((response) => {
	      	if(response.data && response.data.length > 0){
	      		console.log("response reducer=>",response.data[0].gender);
		        newState.firstName      		= response.data[0].firstName;
				newState.middleName     		= response.data[0].middleName;
				newState.lastName       		= response.data[0].lastName;
				newState.DOB                	= response.data[0].DOB;
				newState.gender         		= response.data[0].gender;
				newState.contactNo      		= response.data[0].contactNo;
				newState.altContactNo	   		= response.data[0].altContactNo;
				newState.whatsappNo 	    	= response.data[0].whatsappNo;
				newState.email          		= response.data[0].email;
				if(response.data[0].address.length > 0){
					newState.addressLine1      		= response.data[0].address[0].addressLine1;
					newState.addressLine2     		= response.data[0].address[0].addressLine2;
					newState.countryCode       		= response.data[0].address[0].countryCode;
					newState.country            	= response.data[0].address[0].country;
					newState.stateCode         		= response.data[0].address[0].stateCode;
					newState.state      			= response.data[0].address[0].state;
					newState.area					= response.data[0].address[0].area;
					newState.city 					= response.data[0].address[0].city;
					newState.district          		= response.data[0].address[0].district;
					newState.pincode          		= response.data[0].address[0].pincode;
				}
				if(response.data[0].drivingLicense){
					newState.drivingLicenceNo   	= response.data[0].drivingLicense.licenseNo;
					newState.drivingLicenceValidity = response.data[0].drivingLicense.effectiveTo;
					newState.licenseProof    	   	= response.data[0].drivingLicense.licenseProof;
				}

				if(response.data[0].aadhar){
					newState.adhaarCardNo       	= response.data[0].aadhar.aadharNo;
					newState.aadharProof        	= response.data[0].aadhar.aadharProof;
				}
				if(response.data[0].identityProof.length > 0){
					newState.identityProof      	=   response.data[0].identityProof;
				}
	      	}
	      	
	      })
	      .catch((error) => {
	        console.log("error",error);
	      })
	}
	if(action.type === "BOOKING_LIST"){
		axios.get('/api/bookingmaster/get/list')
		.then((bookingList)=>{
			console.log("bookingList",bookingList);
		})
		.catch((error)=>{
			console.log("error=>",error);
		})
	}

	return newState;
}

export default reducer;