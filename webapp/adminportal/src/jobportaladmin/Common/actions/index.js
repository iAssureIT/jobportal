import axios from 'axios';

export const fetchRolewiseAccess = rolewiseAccessToModule => ({
  type                    : 'FETCH_ROLEWISE_ACCESS',
  rolewiseAccessToModule  : rolewiseAccessToModule
});

export const fetchAccessToFacility = accessToFacility => ({
  type: 'FETCH_ACCESS_FACILITY',
  accessToFacility: accessToFacility
});

export const setUserDetails = (userDetails )=> ({
      type            : 'SET_USER_DETAILS',
      userDetails     : userDetails
});

export const setFilterSelector = (selector )=> ({
      type          : 'SET_FILTER_SELECTOR',
      selector      : selector
});

export const setCandidateFilterSelector = (candidateSelector )=> ({
      type                    : 'SET_CANDIDATE_FILTER_SELECTOR',
      candidateSelector       : candidateSelector
});

export const getJobList = (jobList )=> ({ 
      type          : 'GET_JOB_LIST',
      jobList       : jobList
});

export const getApplicantsCountList = (applicantsCountList )=> ({ 
      type                    : 'GET_APPLICANTS_COUNT',
      applicantsCountList     : applicantsCountList
});

export const getCandidateList = (candidateList )=> ({ 
      type           : 'GET_CANDIDATE_LIST',
      candidateList  : candidateList
});
export const getAppliedCandidateList = (appliedCandidateList )=> ({ 
      type                    : 'GET_APPLIED_CANDIDATE_LIST',
      appliedCandidateList    : appliedCandidateList
});
export function getRoleWiseAccessToModule(moduleName) {

  return dispatch =>{

  var roles = localStorage.getItem('roles');
  roles = roles.split(',');
      var formValues = {
        roles   : roles,
        module  : moduleName
      }
      return axios.post("/api/accessmaster/getRolewiseAccessToModule",formValues)
        .then((response)=>{
         
            dispatch(fetchRolewiseAccess(response.data));
        })
        .catch((error)=>{
              console.log('error', error);
        })
    
  }  
}

export function getAccessToFacility(moduleName, facilityName) {

  return dispatch =>{

  var roles = localStorage.getItem('roles');
  roles = roles.split(',');
      var formValues = {
        roles         : roles,
        module        : moduleName,
        facility      : facilityName
      }
      return axios.post("/api/accessmaster/getAccessToFacilityOfModule",formValues)
        .then((response)=>{
          
            dispatch(fetchAccessToFacility(response.data));
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

export function applicantsCountList() {
    return dispatch =>{
      return axios.post("/api/applyJob/get/applicantsCountList")
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