import axios from 'axios';

export const setFilterSelector = (selector )=> ({
      type 				: 'SET_FILTER_SELECTOR',
      selector 			: selector
});

export const getJobList = (jobList )=> ({ 
      type 				: 'GET_JOB_LIST',
      jobList 			: jobList
});

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