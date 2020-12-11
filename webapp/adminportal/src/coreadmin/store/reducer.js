const initialState = {
	rolewiseAccessToModule 		: false,
	accessToFacility 			: false,
	userDetails 				: localStorage.getItem("userDetails") ?
		{
		loggedIn  	: true,		
		firstName 	: JSON.parse(localStorage.getItem("userDetails")).firstName , 
		lastName  	: JSON.parse(localStorage.getItem("userDetails")).lastName , 
		email 		: JSON.parse(localStorage.getItem("userDetails")).email,
		phone 		: JSON.parse(localStorage.getItem("userDetails")).phone, 
		companyID 	: JSON.parse(localStorage.getItem("userDetails")).companyID,
		company_id 	: JSON.parse(localStorage.getItem("userDetails")).company_id,
		user_id   	: JSON.parse(localStorage.getItem("userDetails")).user_id,
		roles 		: JSON.parse(localStorage.getItem("userDetails")).roles,
		token 		: JSON.parse(localStorage.getItem("userDetails")).token, 
		
		}
		: {
		loggedIn  	: false,	
		firstName 	: "", 
		lastName  	: "", 
		email 		: "",
		phone 		: "", 
		companyID 	: "",
		company_id 	: "",
		user_id   	: "",
		roles 		: [],
		token 		: "", 
	},
	selector 					: {},
	jobList 					: [],

}

const reducer = (state = initialState, action) => {
	const newState = {...state}; 
	//Create Global userDetails Variable
	if(action.type === "SET_USER_DETAILS"){
		newState.userDetails 	= action.userDetails;
	}

	if(action.type === "FETCH_ROLEWISE_ACCESS"){
		newState.rolewiseAccessToModule 	= action.rolewiseAccessToModule;
	}
	if(action.type === "FETCH_ACCESS_FACILITY"){
		newState.accessToFacility 	= action.accessToFacility;
	}
	if(action.type === "SET_FILTER_SELECTOR"){
		newState.selector 	= action.selector;
	}
	if(action.type === "GET_JOB_LIST"){
		newState.jobList = action.jobList;
	}
	return newState;
}

export default reducer;