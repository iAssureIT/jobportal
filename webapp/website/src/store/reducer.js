const initialState = {
	rolewiseAccessToModule 		: false,
	accessToFacility 			: false,
	selectedCountry				: "India",
	selectedState 				: "",
	selectedDistrict 			: "",
	selectedModal 				: "login" 
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
return newState;
}

export default reducer;

