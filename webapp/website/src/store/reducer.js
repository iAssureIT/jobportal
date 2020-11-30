const initialState = {
	rolewiseAccessToModule 		: false,
	accessToFacility 			: false,
	selectedCountry				: "India",
	selectedState 				: "",
	selectedDistrict 			: "",
	selectedModal 				: "login",
	userID 						: "",
	viewMode 					: "",
	selector 					: {},
	mapJobs 					: [],
	functionalJobs 				: [],
	subfunctionalJobs 			: [],
	industrialJobs 				: []
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
	if(action.type === "SET_MAP_DATA"){
		newState.mapJobs = action.mapJobs;
	}
	if(action.type === "SET_FUNCTIONAL_DATA"){
		newState.functionalJobs = action.functionalJobs;
	}
	if(action.type === "SET_SUBFUNCTIONAL_DATA"){
		newState.subfunctionalJobs = action.subfunctionalJobs;
	}
	if(action.type === "SET_INDUSTRIAL_DATA"){
		newState.industrialJobs = action.industrialJobs;
	}
	
return newState;
}

export default reducer;

