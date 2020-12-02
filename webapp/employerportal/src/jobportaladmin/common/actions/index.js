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
export function filterMapData(selector) {
  	return dispatch =>{
  		dispatch(setFilterSelector(selector));
	  	return axios.post("/api/jobs/mapwise-jobs",selector)
	    .then((response)=>{
	     
	        dispatch(setMapData(response.data));
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
	     
	        dispatch(setFunctionalData(response.data));
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
	     
	        dispatch(setSubfunctionalData(response.data));
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
	     
	        dispatch(setIndustrialData(response.data));
	    })
	    .catch((error)=>{
	          console.log('error', error);
	    }) 
  	}  
}

export const setViewMode = (viewMode )=> ({
      type 				: 'SET_VIEW_MODE',
      viewMode 			: viewMode
});
export const setFilterSelector = (selector )=> ({
      type 				: 'SET_FILTER_SELECTOR',
      selector 			: selector
});
export const setMapData = (mapJobs )=> ({
      type 				: 'SET_MAP_DATA',
      mapJobs 			: mapJobs
});
export const setFunctionalData = (functionalJobs )=> ({
      type 				: 'SET_FUNCTIONAL_DATA',
      functionalJobs 	: functionalJobs
});
export const setSubfunctionalData = (subfunctionalJobs )=> ({
      type 				: 'SET_SUBFUNCTIONAL_DATA',
      subfunctionalJobs : subfunctionalJobs
});
export const setIndustrialData = (industrialJobs )=> ({
      type 				: 'SET_INDUSTRIAL_DATA',
      industrialJobs 	: industrialJobs
});
