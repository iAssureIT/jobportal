const initialState = {
	rolewiseAccessToModule 		: false,
	accessToFacility 			: false,
	user_ID 					: localStorage.getItem("user_ID"),
	candidateID 				: localStorage.getItem("candidateID"),
	userDetails : {
		firstName : "", 
		lastName  : "", 
		email 		: "", 
		phone 		: "", 
		city 			: "",
		companyID : "",
		locationID: "",
		user_id   : "",
		roles 		: [],
		token 		: "", 
	},
	selector 					: {},
	jobList 					: [],

}

const reducer = (state = initialState, action) => {
	const newState = {...state}; 
	//Create Global userDetails Variable
	if(action.type === "SET_GLOBAL_USER"){
		newState.userDetails 	= action.userDetails;
		console.log("newState.userDetails in store = ",newState.userDetails);
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