const initialState = {
	rolewiseAccessToModule 		: false,
	accessToFacility 			: false,
	user_ID 					: localStorage.getItem("user_ID"),
	candidate_id 				: localStorage.getItem("candidate_id"),
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
		industry_id : JSON.parse(localStorage.getItem("userDetails")).industry_id
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
		industry_id : ""
	},
	selector 					: {},
	showLoader 					: false,
	jobList 					: [],
	jobCount 					: 0,
	candidateSelector 			: {},
	appliedCandidateSelector 	: {},
	candidateList 				: [],
	appliedCandidateList 		: [],
	totalApplicantsCountList 	: [],
	countryApplicantsCountList 	: [],
	stateApplicantsCountList	: [],
	districtApplicantsCountList	: [],	
	maleApplicantsCountList		: [],
	femaleApplicantsCountList	: [],
	otherApplicantsCountList 	: [],
	exp02ApplicantsCountList 	: [],
	exp26ApplicantsCountList 	: [],
	exp610ApplicantsCountList 	: [],
}

const reducer = (state = initialState, action) => {
	const newState = {...state}; 
	//Create Global userDetails Variable
	if(action.type === "SET_GLOBAL_USER"){
		newState.userDetails 	= action.userDetails;
	}

	if(action.type === "FETCH_ROLEWISE_ACCESS"){
		newState.rolewiseAccessToModule 	= action.rolewiseAccessToModule;
	}
	if(action.type === "FETCH_ACCESS_FACILITY"){
		newState.accessToFacility 	= action.accessToFacility;
	}
	if(action.type === "SET_USER_DETAILS"){
		newState.userDetails 	= action.userDetails;
	}
	if (action.type === "SHOW_LOADER") {
		newState.showLoader = action.showLoader;
	}
	if(action.type === "GET_JOBCOUNT"){
		newState.jobCount = action.jobCount;
	}
	if(action.type === "SET_FILTER_SELECTOR"){
		newState.selector 	= action.selector;
	}
	if(action.type === "SET_CANDIDATE_FILTER_SELECTOR"){
		newState.candidateSelector 	= action.candidateSelector;
	}
	if(action.type === "SET_APPLIED_CANDIDATE_FILTER_SELECTOR"){
		newState.appliedCandidateSelector 	= action.appliedCandidateSelector;
	}
	if(action.type === "GET_JOB_LIST"){
		newState.jobList = action.jobList ;
	}
	if(action.type === "APPEND_JOB_LIST"){
		newState.jobList = state.jobList.concat(action.jobList) ;
	}
	if(action.type === "GET_TOTAL_APPLICANTS_COUNT"){
		newState.totalApplicantsCountList = action.totalApplicantsCountList;
	}
	if(action.type === "GET_COUNTRY_APPLICANTS_COUNT"){
		newState.countryApplicantsCountList = action.countryApplicantsCountList;
	}
	if(action.type === "GET_STATE_APPLICANTS_COUNT"){
		newState.stateApplicantsCountList = action.stateApplicantsCountList;
	}
	if(action.type === "GET_DISTRICT_APPLICANTS_COUNT"){
		newState.districtApplicantsCountList = action.districtApplicantsCountList;
	}
	if(action.type === "GET_MALE_APPLICANTS_COUNT"){
		newState.maleApplicantsCountList = action.maleApplicantsCountList;
	}
	if(action.type === "GET_FEMALE_APPLICANTS_COUNT"){
		newState.femaleApplicantsCountList = action.femaleApplicantsCountList;
	}
	if(action.type === "GET_OTHER_APPLICANTS_COUNT"){
		newState.otherApplicantsCountList = action.otherApplicantsCountList;
	}
	if(action.type === "GET_EXP02_APPLICANTS_COUNT"){
		newState.exp02ApplicantsCountList = action.exp02ApplicantsCountList;
	}
	if(action.type === "GET_EXP26_APPLICANTS_COUNT"){
		newState.exp26ApplicantsCountList = action.exp26ApplicantsCountList;
	}
	if(action.type === "GET_EXP610_APPLICANTS_COUNT"){
		newState.exp610ApplicantsCountList = action.exp610ApplicantsCountList;
	}
	if(action.type === "GET_CANDIDATE_LIST"){
		newState.candidateList = action.candidateList;
	}
	if(action.type === "GET_APPLIED_CANDIDATE_LIST"){
		newState.appliedCandidateList = action.appliedCandidateList;
	}
	return newState;
}

export default reducer;