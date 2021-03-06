const initialState = {
	rolewiseAccessToModule 		: false,
	accessToFacility 			: false,
	
	userDetails 				: localStorage.getItem("userDetails") ?
		{
		loggedIn  	: true,		
		username	:JSON.parse(localStorage.getItem("userDetails")).username , 
		firstName 	: JSON.parse(localStorage.getItem("userDetails")).firstName , 
		lastName  	: JSON.parse(localStorage.getItem("userDetails")).lastName , 
		email 		: JSON.parse(localStorage.getItem("userDetails")).email,
		phone 		: JSON.parse(localStorage.getItem("userDetails")).phone, 
		/*companyID 	: JSON.parse(localStorage.getItem("userDetails")).companyID,
		company_id 	: JSON.parse(localStorage.getItem("userDetails")).companyID,*/
		user_id   	: JSON.parse(localStorage.getItem("userDetails")).user_id,
		roles 		: JSON.parse(localStorage.getItem("userDetails")).roles,
		token 		: JSON.parse(localStorage.getItem("userDetails")).token, 
		candidate_id : JSON.parse(localStorage.getItem("userDetails")).candidate_id,
		gender 	    : JSON.parse(localStorage.getItem("userDetails")).gender,
		profilePicture : JSON.parse(localStorage.getItem("userDetails")).profilePicture,		
		profileCompletion : JSON.parse(localStorage.getItem("userDetails")).profileCompletion
		}
		: {
		loggedIn  	: false,
		username	:"",	
		firstName 	: "", 
		lastName  	: "", 
		email 		: "",
		phone 		: "", 
		/*companyID 	: "",
		company_id 	: "",*/
		user_id   	: "",
		roles 		: [],
		token 		: "", 
		gender 		: "",	
		profilePicture : "",
		candidate_id: "",
		profileCompletion : 0
	},
	selectedCountry				: "India",
	selectedState 				: "",
	selectedDistrict 			: "",
	selectedModal 				: "login",
	userID 						: "",
	viewMode 					: "mapView",
	listView 					: 0,
	selector 					: {},
	mapJobs 					: [],
	jobCount 					: 0,
	showLoader 					: false,
	functionalJobs 				: [],
	subfunctionalJobs 			: [],
	industrialJobs 				: [],
	jobList 					: [],
	jobWishlist 				: [],
	appliedJoblist 				: [],
	appliedJobSelector 			: {},
	jobWishlistSelector 		: {}	
}

const reducer = (state = initialState,action) => {
const newState = {...state};
	if(action.type === "FETCH_ROLEWISE_ACCESS"){
		newState.rolewiseAccessToModule 	= action.rolewiseAccessToModule;
	}
	if(action.type === "FETCH_ACCESS_FACILITY"){
		newState.accessToFacility 	= action.accessToFacility;
	}
	if(action.type === "SET_USER_DETAILS"){
		newState.userDetails 	= action.userDetails;
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
	
	if (action.type === "SHOW_LOADER") {
		newState.showLoader = action.showLoader;
	}
	if(action.type === "SET_VIEW_MODE"){
		newState.viewMode 	= action.viewMode;
	}
	if(action.type === "SET_LIST_MODE"){
		newState.listView 	= action.listView;
	}
	
	if(action.type === "SET_FILTER_SELECTOR"){
		newState.selector 	= action.selector;
	}
	if(action.type === "GET_MAP_DATA"){
		newState.mapJobs = action.mapJobs;
	}
	
	if(action.type === "GET_JOBCOUNT"){
		newState.jobCount = action.jobCount;
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
	if(action.type === "APPEND_JOB_LIST"){
		newState.jobList = state.jobList.concat(action.jobList) ;
	}
	if(action.type === "GET_JOB_WISHLIST"){
		newState.jobWishlist = action.jobWishlist;
	}
	if(action.type === "SET_APPLIEDJOB_FILTER_SELECTOR"){
		newState.appliedJobSelector = action.appliedJobSelector;
	}
	if(action.type === "SET_WISHLIST_FILTER_SELECTOR"){
		newState.jobWishlistSelector = action.jobWishlistSelector;
	}
	if(action.type === "GET_APPLIED_JOBLIST"){
		newState.appliedJoblist = action.appliedJoblist;
	}
	
	
	
return newState;
}

export default reducer;

