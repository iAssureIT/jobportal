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

export const getApplicantsCountList = (applicantsCountList )=> ({ 
      type                       : 'GET_APPLICANTS_COUNT',
      applicantsCountList        : applicantsCountList
});
export const getCandidateList = (candidateList )=> ({ 
      type           : 'GET_CANDIDATE_LIST',
      candidateList  : candidateList
});
export const getAppliedCandidateList = (appliedCandidateList )=> ({ 
      type                    : 'GET_APPLIED_CANDIDATE_LIST',
      appliedCandidateList    : appliedCandidateList
});
export function filterJobList(selector) {
  	return dispatch =>{
  		dispatch(setFilterSelector(selector));
	  	return axios.post("/api/jobs/joblist-for-employer",selector)
	    .then((response)=>{
	        dispatch(getJobList(response.data));
	    })
	    .catch((error)=>{
	          console.log('error', error);
	    }) 
  	}  
}
export function applicantsCountList(selector) {
    return dispatch =>{
      return axios.post("/api/applyJob/get/applicantsCountList",selector)
      .then((response)=>{
          dispatch(getApplicantsCountList(response.data));
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
          dispatch(getAppliedCandidateList(response.data));
      })
      .catch((error)=>{
            console.log('error', error);
      }) 
    }  
}