import axios from 'axios';
import Swal         from 'sweetalert2';

const userDetails = JSON.parse(localStorage.getItem("userDetails"));
const token = userDetails.token;

axios.defaults.headers.common['Authorization'] = 'Bearer '+ token;
 
export const selectedCompanyDetails = (selectedCompanyDetails )=> ({
      type                      : 'SELECTED_COMPANY_DETAILS',
      selectedCompanyDetails    : selectedCompanyDetails
});
export const setUserID = (user_id )=> ({
      type        : 'SET_USERID',
      user_id      : user_id
});
export const setUserCredentials = (userCredentials )=> ({
      type                : 'SET_USER_CREDENTIALS',
      userCredentials     : userCredentials
});

export const setUserDetails = (userDetails )=> ({ 
      type 				   : 'SET_USER_DETAILS',
      userDetails 	 : userDetails
});
export const changeStatusMode = (statusMode )=> ({
      type           : 'CHANGE_STATUS_MODE',
      statusMode     : statusMode
});
export const setFilterSelector = (selector )=> ({
      type 				   : 'SET_FILTER_SELECTOR',
      selector 			 : selector
});
export const setCandidateFilterSelector = (candidateSelector )=> ({
      type                      : 'SET_CANDIDATE_FILTER_SELECTOR',
      candidateSelector         : candidateSelector
});

export const setAppliedCandidateFilterSelector = (appliedCandidateSelector )=> ({
      type                      : 'SET_APPLIED_CANDIDATE_FILTER_SELECTOR',
      appliedCandidateSelector  : appliedCandidateSelector
});
export const getJobList = (jobList )=> ({  
      type 				   : 'GET_JOB_LIST',
      jobList 			 : jobList
});
export const appendJobList = (jobList )=> ({  
      type           : 'APPEND_JOB_LIST',
      jobList        : jobList
});
export const getTotalApplicantsCountList = (totalApplicantsCountList )=> ({ 
      type                       : 'GET_TOTAL_APPLICANTS_COUNT',
      totalApplicantsCountList   : totalApplicantsCountList
});
export const getCountryApplicantsCountList = (countryApplicantsCountList )=> ({ 
      type                       : 'GET_COUNTRY_APPLICANTS_COUNT',
      countryApplicantsCountList : countryApplicantsCountList
});
export const getStateApplicantsCountList = (stateApplicantsCountList )=> ({ 
      type                       : 'GET_STATE_APPLICANTS_COUNT',
      stateApplicantsCountList   : stateApplicantsCountList
});
export const getDistrictApplicantsCountList = (districtApplicantsCountList )=> ({ 
      type                       : 'GET_DISTRICT_APPLICANTS_COUNT',
      districtApplicantsCountList: districtApplicantsCountList
});
export const getMaleApplicantsCountList = (maleApplicantsCountList )=> ({ 
      type                       : 'GET_MALE_APPLICANTS_COUNT',
      maleApplicantsCountList    : maleApplicantsCountList
});
export const getFemaleApplicantsCountList = (femaleApplicantsCountList )=> ({ 
      type                       : 'GET_FEMALE_APPLICANTS_COUNT',
      femaleApplicantsCountList  : femaleApplicantsCountList
});
export const getOtherApplicantsCountList = (otherApplicantsCountList )=> ({ 
      type                       : 'GET_OTHER_APPLICANTS_COUNT',
      otherApplicantsCountList   : otherApplicantsCountList
});
export const getExp02ApplicantsCountList = (exp02ApplicantsCountList )=> ({ 
      type                       : 'GET_EXP02_APPLICANTS_COUNT',
      exp02ApplicantsCountList   : exp02ApplicantsCountList
});
export const getExp26ApplicantsCountList = (exp26ApplicantsCountList )=> ({ 
      type                       : 'GET_EXP26_APPLICANTS_COUNT',
      exp26ApplicantsCountList   : exp26ApplicantsCountList
});
export const getExp610ApplicantsCountList = (exp610ApplicantsCountList )=> ({ 
      type                       : 'GET_EXP610_APPLICANTS_COUNT',
      exp610ApplicantsCountList  : exp610ApplicantsCountList
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
export const getJobCount = (jobCount )=> ({
      type        : 'GET_JOBCOUNT',
      jobCount      : jobCount
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
	  	return axios.post("/api/jobs/joblist-for-employer",selector)
	    .then((response)=>{
          dispatch(showLoader(false));
          if (selector.startLimit == 0) {
            dispatch(getJobList(response.data));
          }else{
            dispatch(appendJobList(response.data));
          }
	    })
	    .catch((error)=>{
	          console.log('error', error);
            if(error.message === "Request failed with status code 401"){
              var userDetails =  localStorage.removeItem("userDetails");
              localStorage.clear();
              Swal({  
                  title : "Your Session is expired.",                
                  text: "You need to login again. Click OK to go to Login Page",
                  // confirmButtonColor: "#f00",
                  // icon:"error"
                })
              .then(okay => {
                if (okay) {
                  window.location.href = "/login";
                }
              });
            }
	    }) 
  	}  
} 
export function totalApplicantsCountList(selector) {
    return dispatch =>{
      return axios.post("/api/applyJob/get/totalApplicantsCountList",selector)
      .then((response)=>{
          dispatch(getTotalApplicantsCountList(response.data));
      })
      .catch((error)=>{
            console.log('error', error);
      }) 
    }  
}

export function countryApplicantsCountList(selector) {
    return dispatch =>{
      return axios.post("/api/applyJob/get/countryApplicantsCountList",selector)
      .then((response)=>{
          dispatch(getCountryApplicantsCountList(response.data));
      })
      .catch((error)=>{
            console.log('error', error);
      }) 
    }  
}

export function stateApplicantsCountList(selector) {
    return dispatch =>{
      return axios.post("/api/applyJob/get/stateApplicantsCountList",selector)
      .then((response)=>{
          dispatch(getStateApplicantsCountList(response.data));
      })
      .catch((error)=>{
            console.log('error', error);
      }) 
    }  
}

export function districtApplicantsCountList(selector) {
    return dispatch =>{
      return axios.post("/api/applyJob/get/districtApplicantsCountList",selector)
      .then((response)=>{
          dispatch(getDistrictApplicantsCountList(response.data));
      })
      .catch((error)=>{
            console.log('error', error);
      }) 
    }  
}
export function maleApplicantsCountList(selector) {
    return dispatch =>{
      return axios.post("/api/applyJob/get/maleApplicantsCountList",selector)
      .then((response)=>{
          dispatch(getMaleApplicantsCountList(response.data));
      })
      .catch((error)=>{
            console.log('error', error);
      }) 
    }  
}
export function femaleApplicantsCountList(selector) {
    return dispatch =>{
      return axios.post("/api/applyJob/get/femaleApplicantsCountList",selector)
      .then((response)=>{
          dispatch(getFemaleApplicantsCountList(response.data));
      })
      .catch((error)=>{
            console.log('error', error);
      }) 
    }  
}

export function otherApplicantsCountList(selector) {
    return dispatch =>{
      return axios.post("/api/applyJob/get/otherApplicantsCountList",selector)
      .then((response)=>{
          dispatch(getOtherApplicantsCountList(response.data));
      })
      .catch((error)=>{
            console.log('error', error);
      }) 
    }  
}
export function exp02ApplicantsCountList(selector) {
    return dispatch =>{
      return axios.post("/api/applyJob/get/expApplicantsCountList",selector)
      .then((response)=>{
          dispatch(getExp02ApplicantsCountList(response.data));
      })
      .catch((error)=>{
            console.log('error', error);
      }) 
    }  
}
export function exp26ApplicantsCountList(selector) {
    return dispatch =>{
      return axios.post("/api/applyJob/get/expApplicantsCountList",selector)
      .then((response)=>{
          dispatch(getExp26ApplicantsCountList(response.data));
      })
      .catch((error)=>{
            console.log('error', error);
      }) 
    }  
}
export function exp610ApplicantsCountList(selector) {
    return dispatch =>{
      return axios.post("/api/applyJob/get/expApplicantsCountList",selector)
      .then((response)=>{
          dispatch(getExp610ApplicantsCountList(response.data));
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
            console.log('error', error);
      }) 
    }  
}
export function filterCandidates(candidateSelector) {
  console.log("candidateSelector",candidateSelector)
    return dispatch =>{ 
      dispatch(showLoader(true));
      dispatch(setCandidateFilterSelector(candidateSelector));
      return axios.post("/api/candidatemaster/get/list",candidateSelector)
      .then((response)=>{
          dispatch(showLoader(false));
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