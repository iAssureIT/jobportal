const initialState = {
	rolewiseAccessToModule 		: false,
	accessToFacility 			: false,
	selectedCountry				: "India",
	selectedState 				: "",
	selectedDistrict 			: "",
	selectedModal 				: "login",
	userID 						: "",
	viewMode 					: "mapView",
	selector 					: {},
	mapJobs 					: [],
	functionalJobs 				: [],
	subfunctionalJobs 			: [],
	industrialJobs 				: [],
	jobList 					: [],
	jobWishlist 				: []
}

const reducer = (state = initialState,action) => {
const newState = {...state};
	if(action.type === "FETCH_ROLEWISE_ACCESS"){
		newState.rolewiseAccessToModule 	= action.rolewiseAccessToModule;
	}
	if(action.type === "FETCH_ACCESS_FACILITY"){
		newState.accessToFacility 	= action.accessToFacility;
	}
	if(action.type === "SET_MAP_STATE"){
		newState.selectedState 	= action.selectedState;
	}
	if(action.type === "SET_MODAL"){
		newState.selectedModal 	= action.selectedModal;
	}
	if(action.type === "SET_USERID"){
		newState.userID 	= action.userID;
	}
	if(action.type === "SET_VIEW_MODE"){
		newState.viewMode 	= action.viewMode;
	}
	if(action.type === "SET_FILTER_SELECTOR"){
		newState.selector 	= action.selector;
	}
	if(action.type === "GET_MAP_DATA"){
		newState.mapJobs = action.mapJobs;
	}
	if(action.type === "GET_FUNCTIONAL_DATA"){
		newState.functionalJobs = action.functionalJobs;
	}
	if(action.type === "GET_SUBFUNCTIONAL_DATA"){
		newState.subfunctionalJobs = action.subfunctionalJobs;
	}
	if(action.type === "GET_INDUSTRIAL_DATA"){
		newState.industrialJobs = action.industrialJobs;
	}
	if(action.type === "GET_JOB_LIST"){
		newState.jobList = action.jobList;
	}
	if(action.type === "GET_JOB_WISHLIST"){
		newState.jobWishlist = action.jobWishlist;
	}
	
	
return newState;
}

export default reducer;

