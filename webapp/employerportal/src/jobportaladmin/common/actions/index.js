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

export const setAppliedCandidateFilterSelector = (appliedCandidateSelector )=> ({
      type                    : 'SET_APPLIED_CANDIDATE_FILTER_SELECTOR',
      appliedCandidateSelector: appliedCandidateSelector
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
export const showLoader = (showLoader )=> ({
      type        : 'SHOW_LOADER',
      showLoader    : showLoader
});
export const getFunctionalData = (functionalJobs )=> ({
      type        : 'GET_FUNCTIONAL_DATA',
      functionalJobs  : functionalJobs
});
export const getSubfunctionalData = (subfunctionalJobs )=> ({
      type        : 'GET_SUBFUNCTIONAL_DATA',
      subfunctionalJobs : subfunctionalJobs
});
export const getIndustrialData = (industrialJobs )=> ({
      type        : 'GET_INDUSTRIAL_DATA',
      industrialJobs  : industrialJobs
});
export const setAppliedJoblist = (appliedJoblist )=> ({
      type        : 'GET_APPLIED_JOBLIST',
      appliedJoblist  : appliedJoblist
});
export const setJobWishlist = (jobWishlist )=> ({
      type        : 'GET_JOB_WISHLIST',
      jobWishlist     : jobWishlist
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
export function filterCandidatesApplied(appliedCandidateSelector) {
    return dispatch =>{ 
      dispatch(setAppliedCandidateFilterSelector(appliedCandidateSelector));
      return axios.post("/api/applyJob/get/candidatesAppliedToJob",appliedCandidateSelector)
      .then((response)=>{
          dispatch(getAppliedCandidateList(response.data));
      })
      .catch((error)=>{
            console.log('error', error);
      }) 
    }  
}
export function filterCandidates(candidateSelector) {
    return dispatch =>{ 
      dispatch(setCandidateFilterSelector(candidateSelector));
      return axios.post("/api/applyJob/get/candidatesAppliedToJob",candidateSelector)
      .then((response)=>{
          dispatch(getCandidateList(response.data));
      })
      .catch((error)=>{
            console.log('error', error);
      }) 
    }  
}

export function filterFunctionalData(selector) { 
    return dispatch =>{
      
      dispatch(showLoader(true));
      dispatch(setFilterSelector(selector));
      return axios.post("/api/jobs/functional-jobs",selector)
      .then((response)=>{
        dispatch(showLoader(false));
          dispatch(getFunctionalData(response.data));
      })
      .catch((error)=>{
            console.log('error', error);
      }) 
    }  
}
export function filterSubfunctionalData(selector) {
    return dispatch =>{
      dispatch(showLoader(true));
      dispatch(setFilterSelector(selector));
      //console.log(selector)
      return axios.post("/api/jobs/subfunctional-jobs",selector)
      .then((response)=>{
        dispatch(showLoader(false));
          dispatch(getSubfunctionalData(response.data));
      })
      .catch((error)=>{
            console.log('error', error);
      }) 
    }  
}
export function filterIndustrialData(selector) {
    return dispatch =>{
      dispatch(showLoader(true));
      dispatch(setFilterSelector(selector));
      return axios.post("/api/jobs/industrial-jobs",selector)
      .then((response)=>{
          dispatch(showLoader(false));
          dispatch(getIndustrialData(response.data));
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
      return axios.post("/api/applyJob/get/appliedJobList",formValue)
      .then((response)=>{
          dispatch(setAppliedJoblist(response.data ));
      })
      .catch((error)=>{
            console.log('error', error);
      }) 
    }  
}