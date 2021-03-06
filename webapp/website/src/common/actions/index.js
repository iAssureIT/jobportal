import axios from 'axios';
import Swal         from 'sweetalert2';

const userDetails = JSON.parse(localStorage.getItem("userDetails"));
if (userDetails) {
  const token = userDetails.token;

  axios.defaults.headers.common['Authorization'] = 'Bearer '+ token; 
}


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
      viewMode 		: viewMode
});
export const setListMode = (listView )=> ({
      type        : 'SET_LIST_MODE',
      listView    : listView
});
export const setMapView = (mapView )=> ({
      type 				: 'SET_MAP_VIEW',
      mapView 			: mapView
});
export const setFilterSelector = (selector )=> ({
      type 				: 'SET_FILTER_SELECTOR',
      selector 			: selector
});
export const showLoader = (showLoader )=> ({
      type 				: 'SHOW_LOADER',
      showLoader 		: showLoader
});
export const getMapData = (mapJobs )=> ({
      type 				: 'GET_MAP_DATA',
      mapJobs 			: mapJobs
});

export const getJobCount = (jobCount )=> ({
      type 				: 'GET_JOBCOUNT',
      jobCount 			: jobCount
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
      jobList 		: jobList
});
export const appendJobList = (jobList )=> ({  
      type           : 'APPEND_JOB_LIST',
      jobList        : jobList
});
export const setJobWishlistFilterSelector = (jobWishlistSelector )=> ({
      type        : 'SET_WISHLIST_FILTER_SELECTOR',
      jobWishlistSelector      : jobWishlistSelector
});
export const setJobWishlist = (jobWishlist )=> ({
      type 				: 'GET_JOB_WISHLIST',
      jobWishlist : jobWishlist
});
export const setAppliedJobFilterSelector = (appliedJobSelector )=> ({
      type        : 'SET_APPLIEDJOB_FILTER_SELECTOR',
      appliedJobSelector      : appliedJobSelector
});
export const setAppliedJoblist = (appliedJoblist )=> ({
      type 				: 'GET_APPLIED_JOBLIST',
      appliedJoblist 	: appliedJoblist
});
export function filterMapData(selector) {
  	return dispatch =>{
  		//console.log(selector)
  		dispatch(setFilterSelector(selector));
	  	return axios.post("/api/jobs/mapwise-jobs",selector)
	    .then((response)=>{
	    	//console.log(selector)
	    	//console.log("resp",response.data)
	        dispatch(getMapData(response.data));
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
export function filterJobList(selector) {
  	return dispatch =>{
  		dispatch(showLoader(true));
  		dispatch(setFilterSelector(selector));
	  	return axios.post("/api/jobs/list",selector)
	    .then((response)=>{
	     	dispatch(showLoader(false));
	        dispatch(getJobList(response.data));
	    })
	    .catch((error)=>{
	          console.log('error', error);
	    }) 
  	}  
}
export function getJobWishlist(jobWishlistSelector) {
  	return dispatch =>{
  		//var formValue={"candidate_id":candidate_id}
      dispatch(showLoader(true));
      dispatch(setJobWishlistFilterSelector(jobWishlistSelector));
      
	  	return axios.post("/api/wishlist/candidateWishlist",jobWishlistSelector)
	    .then((response)=>{
	     	  dispatch(showLoader(false));
	        dispatch(setJobWishlist(response.data ));
	    })
	    .catch((error)=>{
	          if(error.message === "Request failed with status code 401"){
              var userDetails =  localStorage.removeItem("userDetails");
              localStorage.clear();

              Swal.fire({title  : ' ',
                        html    : "Your session is expired! You need to login again. "+"<br>"+" Click OK to go to Login Page",
                        text    :  "" })
                  .then(okay => {
                    if (okay) { 
                      var userDetails = {
                          loggedIn    : false,
                          username  :"",  
                          firstName   : "", 
                          lastName    : "", 
                          email     : "",
                          phone     : "", 
                          user_id     : "",
                          roles     : [],
                          token     : "", 
                          gender    : "", 
                          profilePicture : "",
                          candidate_id: "",
                          profileCompletion : 0
                          }
                          dispatch(setUserDetails(userDetails));
                          document.getElementById("loginbtndiv").click();
                          }
                        });
          }else{
            Swal.fire('', " Error!", '');
          }
	    }) 
  	}  
}
export function getAppliedJoblist(appliedJobSelector) { 
  	return dispatch =>{
  		//var formValue={"candidate_id":candidate_id}
  		//console.log(appliedJobSelector)
      dispatch(showLoader(true));
      dispatch(setAppliedJobFilterSelector(appliedJobSelector));

	  	return axios.post("/api/applyJob/get/appliedJobList",appliedJobSelector)
	    .then((response)=>{
          dispatch(showLoader(false));
	        dispatch(setAppliedJoblist(response.data ));
	    })
	    .catch((error)=>{
	          if(error.message === "Request failed with status code 401"){
              var userDetails =  localStorage.removeItem("userDetails");
              localStorage.clear();

              Swal.fire({title  : ' ',
                        html    : "Your session is expired! You need to login again. "+"<br>"+" Click OK to go to Login Page",
                        text    :  "" })
                  .then(okay => {
                    if (okay) { 
                      var userDetails = {
                          loggedIn    : false,
                          username  :"",  
                          firstName   : "", 
                          lastName    : "", 
                          email     : "",
                          phone     : "", 
                          user_id     : "",
                          roles     : [],
                          token     : "", 
                          gender    : "", 
                          profilePicture : "",
                          candidate_id: "",
                          profileCompletion : 0
                          }
                          dispatch(setUserDetails(userDetails));
                          document.getElementById("loginbtndiv").click();
                          }
                        });
          }else{
            Swal.fire('', " Error!", '');
          }
	    }) 
  	}  
}