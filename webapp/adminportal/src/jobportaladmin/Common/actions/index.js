import axios from 'axios';
import Swal         from 'sweetalert2';

const userDetails = JSON.parse(localStorage.getItem("userDetails"));

if (userDetails) {
  const token = userDetails.token;

  axios.defaults.headers.common['Authorization'] = 'Bearer '+ token;
}

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
export const changeStatusMode = (statusMode )=> ({
      type           : 'CHANGE_STATUS_MODE',
      statusMode     : statusMode
});
export const setFilterSelector = (selector )=> ({
      type          : 'SET_FILTER_SELECTOR',
      selector      : selector
});
export const showLoader = (showLoader )=> ({
      type          : 'SHOW_LOADER',
      showLoader    : showLoader
});
export const setCandidateFilterSelector = (candidateSelector )=> ({
      type                    : 'SET_CANDIDATE_FILTER_SELECTOR',
      candidateSelector       : candidateSelector
});
export const setAppliedCandidateFilterSelector = (appliedCandidateSelector )=> ({
      type                    : 'SET_APPLIED_CANDIDATE_FILTER_SELECTOR',
      appliedCandidateSelector: appliedCandidateSelector
});
export const getJobCount = (jobCount )=> ({
      type        : 'GET_JOBCOUNT',
      jobCount      : jobCount
});
export const getJobList = (jobList )=> ({ 
      type          : 'GET_JOB_LIST',
      jobList       : jobList
});
export const appendJobList = (jobList )=> ({  
      type           : 'APPEND_JOB_LIST', 
      jobList        : jobList
});
export const getTotalApplicantsCountList = (totalApplicantsCountList )=> ({ 
      type                        : 'GET_TOTAL_APPLICANTS_COUNT',
      totalApplicantsCountList    : totalApplicantsCountList
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
export function jobCount(selector) {
    return dispatch =>{
      //console.log(selector)
      dispatch(setFilterSelector(selector));
      return axios.post("/api/jobs/job-count",selector)
      .then((response)=>{
       
          dispatch(getJobCount(response.data));
      })
      .catch((error)=>{
            console.log('error', error);
      }) 
    }  
}
export function filterJobList(selector) {
    return dispatch =>{
      dispatch(showLoader(true));
      dispatch(setFilterSelector(selector));
      return axios.post("/api/jobs/list",selector)
      .then((response)=>{
          dispatch(showLoader(false));
          if (selector.startLimit == 0) {
            dispatch(getJobList(response.data));
          }else{
            dispatch(appendJobList(response.data));
          }
      })
      .catch((error)=>{
          if(error.message === "Request failed with status code 401"){
              var userDetails =  localStorage.removeItem("userDetails");
              localStorage.clear();
              Swal.fire("","Error while getting data","error")
                  .then(okay => {
                    if (okay) {
                      window.location.href = "/login";
                    }
                  });
            }else{
              Swal.fire("", "Error while getting job list", "");
            }
      }) 
    }
} 

export function totalApplicantsCountList() {
    return dispatch =>{
      return axios.post("/api/applyJob/get/totalApplicantsCountList")
      .then((response)=>{
          dispatch(getTotalApplicantsCountList(response.data));
      })
      .catch((error)=>{
            console.log('error', error);
      }) 
    }  
}
export function filterCandidatesApplied(appliedCandidateSelector) {
    return dispatch =>{
      dispatch(showLoader(true)); 
      dispatch(setAppliedCandidateFilterSelector(appliedCandidateSelector));
      return axios.post("/api/applyJob/get/candidatesAppliedToJob",appliedCandidateSelector)
      .then((response)=>{
          dispatch(showLoader(false));
          dispatch(getAppliedCandidateList(response.data));
      })
      .catch((error)=>{
            if(error.message === "Request failed with status code 401"){
              var userDetails =  localStorage.removeItem("userDetails");
              localStorage.clear();
              Swal.fire("","Error while getting data","error")
                  .then(okay => {
                    if (okay) {
                      window.location.href = "/login";
                    }
                  });
            }else{
                Swal.fire("", "Error!", "");
            }
      }) 
    }  
}
export function filterCandidates(candidateSelector) {
    return dispatch =>{
      dispatch(showLoader(true)); 
      dispatch(setCandidateFilterSelector(candidateSelector));
      return axios.post("/api/candidatemaster/get/list",candidateSelector)
      .then((response)=>{
          dispatch(showLoader(false));
          dispatch(getCandidateList(response.data));
      })
      .catch((error)=>{
        if(error.message === "Request failed with status code 401"){
          var userDetails =  localStorage.removeItem("userDetails");
          localStorage.clear();
          Swal.fire("","Error while getting data","error")
              .then(okay => {
                if (okay) {
                  window.location.href = "/login";
                }
              });
        }
        else{
            Swal.fire("", "Error!", "");
        }
      }) 
    }  
}