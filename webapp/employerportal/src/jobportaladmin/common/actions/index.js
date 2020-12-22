import axios from 'axios';

export const setUserDetails = (userDetails )=> ({
      type 				   : 'SET_USER_DETAILS',
      userDetails 	 : userDetails
});
export const setFilterSelector = (selector )=> ({
      type 				   : 'SET_FILTER_SELECTOR',
      selector 			 : selector
});
export const setCandidateFilterSelector = (candidateSelector )=> ({
      type                    : 'SET_CANDIDATE_FILTER_SELECTOR',
      candidateSelector       : candidateSelector
});
export const getJobList = (jobList )=> ({ 
      type 				   : 'GET_JOB_LIST',
      jobList 			 : jobList
});
export const getCandidateList = (candidateList )=> ({ 
      type           : 'GET_CANDIDATE_LIST',
      candidateList  : candidateList
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
export function filterCandidatesApplied(candidateSelector) {
    return dispatch =>{ 
      dispatch(setCandidateFilterSelector(candidateSelector));
      return axios.post("/api/applyJob/get/candidatesAppliedToJob",candidateSelector)
      .then((response)=>{
          console.log(response.data)
          dispatch(getCandidateList(response.data));
      })
      .catch((error)=>{
            console.log('error', error);
      }) 
    }  
}