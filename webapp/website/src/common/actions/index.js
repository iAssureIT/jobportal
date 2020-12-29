import axios from 'axios';

export const setMapSelectedState = (selectedState )=> ({
      type 				: 'SET_MAP_STATE',
      selectedState 	: selectedState
});

export const setSelectedModal = (selectedModal )=> ({
      type 				: 'SET_MODAL',
      selectedModal 	: selectedModal
});
export const setUserID = (userID )=> ({
      type 				: 'SET_USERID',
      userID 			: userID
});
export const setUserDetails = (userDetails )=> ({
      type 				: 'SET_USER_DETAILS',
      userDetails 		: userDetails
});
export const setViewMode = (viewMode )=> ({
      type 				: 'SET_VIEW_MODE',
      viewMode 			: viewMode
});
export const setFilterSelector = (selector )=> ({
      type 				: 'SET_FILTER_SELECTOR',
      selector 			: selector
});
export const getMapData = (mapJobs )=> ({
      type 				: 'GET_MAP_DATA',
      mapJobs 			: mapJobs
});
export const getFunctionalData = (functionalJobs )=> ({
      type 				: 'GET_FUNCTIONAL_DATA',
      functionalJobs 	: functionalJobs
});
export const getSubfunctionalData = (subfunctionalJobs )=> ({
      type 				: 'GET_SUBFUNCTIONAL_DATA',
      subfunctionalJobs : subfunctionalJobs
});
export const getIndustrialData = (industrialJobs )=> ({
      type 				: 'GET_INDUSTRIAL_DATA',
      industrialJobs 	: industrialJobs
});
export const getJobList = (jobList )=> ({
      type 				: 'GET_JOB_LIST',
      jobList 			: jobList
});
export const setJobWishlist = (jobWishlist )=> ({
      type 				: 'GET_JOB_WISHLIST',
      jobWishlist 		: jobWishlist
});
export const setAppliedJoblist = (appliedJoblist )=> ({
      type 				: 'GET_APPLIED_JOBLIST',
      appliedJoblist 	: appliedJoblist
});
export function filterMapData(selector) {
  	return dispatch =>{
  		dispatch(setFilterSelector(selector));
	  	return axios.post("/api/jobs/mapwise-jobs",selector)
	    .then((response)=>{
	     
	        dispatch(getMapData(response.data));
	    })
	    .catch((error)=>{
	          console.log('error', error);
	    }) 
  	}  
}
export function filterFunctionalData(selector) {
  	return dispatch =>{
  		dispatch(setFilterSelector(selector));
	  	return axios.post("/api/jobs/functional-jobs",selector)
	    .then((response)=>{
	     
	        dispatch(getFunctionalData(response.data));
	    })
	    .catch((error)=>{
	          console.log('error', error);
	    }) 
  	}  
}
export function filterSubfunctionalData(selector) {
  	return dispatch =>{
  		dispatch(setFilterSelector(selector));
	  	return axios.post("/api/jobs/subfunctional-jobs",selector)
	    .then((response)=>{
	     
	        dispatch(getSubfunctionalData(response.data));
	    })
	    .catch((error)=>{
	          console.log('error', error);
	    }) 
  	}  
}
export function filterIndustrialData(selector) {
  	return dispatch =>{
  		dispatch(setFilterSelector(selector));
	  	return axios.post("/api/jobs/industrial-jobs",selector)
	    .then((response)=>{
	     
	        dispatch(getIndustrialData(response.data));
	    })
	    .catch((error)=>{
	          console.log('error', error);
	    }) 
  	}  
}
export function filterJobList(selector) {
  	return dispatch =>{
  		dispatch(setFilterSelector(selector));
	  	return axios.post("/api/jobs/list",selector)
	    .then((response)=>{
	     
	        dispatch(getJobList(response.data));
	    })
	    .catch((error)=>{
	          console.log('error', error);
	    }) 
  	}  
}
export function getJobWishlist(candidate_id) {
  	return dispatch =>{
  		var formValue={"candidate_id":candidate_id}
	  	return axios.post("/api/wishlist/candidateWishlist",formValue)
	    .then((response)=>{
	     	
	        dispatch(setJobWishlist(response.data ));
	    })
	    .catch((error)=>{
	          console.log('error', error);
	    }) 
  	}  
}
export function getAppliedJoblist(candidate_id) {
  	return dispatch =>{
  		var formValue={"candidate_id":candidate_id}
  		console.log(formValue)
	  	return axios.post("/api/applyJob/get/candidateAppliedJobList",formValue)
	    .then((response)=>{
	        dispatch(setAppliedJoblist(response.data ));
	    })
	    .catch((error)=>{
	          console.log('error', error);
	    }) 
  	}  
}