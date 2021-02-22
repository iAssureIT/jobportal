import React, {Component, Suspense} from 'react';

const FunctionalAreaJobs = React.lazy(() => import('../FunctionalAreawiseJobs/FunctionalAreawiseJobs.js'));

const FunctionalArea = (pathname) => {
    console.log(pathname.pathname.pathname)
    console.log("/country/"+pathname.pathname.pathname.params.countryCode+"/state/"+pathname.pathname.pathname.params.stateCode+"/city/"+pathname.pathname.pathname.params.district+"/function/"+pathname.pathname.pathname.params.functionalArea+"/"+pathname.pathname.pathname.params.functionalArea_id)
        switch(pathname.pathname.pathname.url) {
            //============== Homepage ==========//
            case "/":   return <FunctionalAreaJobs />;
            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/"+pathname.pathname.pathname.params.stateCode+"/city/"+pathname.pathname.pathname.params.district+"/function/"+pathname.pathname.pathname.params.functionalArea+"/"+pathname.pathname.pathname.params.functionalArea_id:
                            var SubFunctionalAreawiseJobs = React.lazy(() => import('../SubFunctionalAreawiseJobs/SubFunctionalAreawiseJobs.js'))
                                return <SubFunctionalAreawiseJobs/>
            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/"+pathname.pathname.pathname.params.stateCode+"/city/"+pathname.pathname.pathname.params.district+"/function/"+pathname.pathname.pathname.params.functionalArea+"/"+pathname.pathname.pathname.params.functionalArea_id+"/subfunction/"+pathname.pathname.pathname.params.subfunctionalArea+"/"+pathname.pathname.pathname.params.subfunctionalArea_id:
                            var JobList = React.lazy(() => import('../jobList/JobList.js'))
                                return <JobList/> 
                                                    
            case "/subfunctional/"+pathname.pathname.pathname.params.functionalArea+"/"+pathname.pathname.pathname.params.functionalArea_id+"/"+pathname.pathname.pathname.params.subfunctionalArea+"/"+pathname.pathname.pathname.params.subfunctionalArea_id :
                            var JobList = React.lazy(() => import('../jobList/JobList.js'))
                                return <JobList/> 

            //============== StateWise ==========//                    
            case "/state/"+pathname.pathname.pathname.params.stateCode :   return <FunctionalAreaJobs />;
            case "/state/"+pathname.pathname.pathname.params.stateCode+"/functional/"+pathname.pathname.pathname.params.functionalArea+"/"+pathname.pathname.pathname.params.functionalArea_id:
                            var SubFunctionalAreawiseJobs = React.lazy(() => import('../SubFunctionalAreawiseJobs/SubFunctionalAreawiseJobs.js'))
                                return <SubFunctionalAreawiseJobs/>
            case "/state/"+pathname.pathname.pathname.params.stateCode+"/subfunctional/"+pathname.pathname.pathname.params.functionalArea+"/"+pathname.pathname.pathname.params.functionalArea_id+"/"+pathname.pathname.pathname.params.subfunctionalArea+"/"+pathname.pathname.pathname.params.subfunctionalArea_id:
                            var JobList = React.lazy(() => import('../jobList/JobList.js'))
                                return <JobList/>

            //============== DistrictWise ==========//                                        
            case "/state/"+pathname.pathname.pathname.params.stateCode+"/"+pathname.pathname.pathname.params.district :   return <FunctionalAreaJobs />;

            case "/state/"+pathname.pathname.pathname.params.stateCode+"/"+pathname.pathname.pathname.params.district + "/functional/"+pathname.pathname.pathname.params.functionalArea+"/"+pathname.pathname.pathname.params.functionalArea_id:
                            var SubFunctionalAreawiseJobs = React.lazy(() => import('../SubFunctionalAreawiseJobs/SubFunctionalAreawiseJobs.js'))
                                return <SubFunctionalAreawiseJobs/>

            case "/state/"+pathname.pathname.pathname.params.stateCode+"/"+pathname.pathname.pathname.params.district + "/subfunctional/"+pathname.pathname.pathname.params.functionalArea+"/"+pathname.pathname.pathname.params.functionalArea_id+"/"+pathname.pathname.pathname.params.subfunctionalArea+"/"+pathname.pathname.pathname.params.subfunctionalArea_id :
                            var JobList = React.lazy(() => import('../jobList/JobList.js'))
                                return <JobList/>                    
            default:    return <h1>No map match</h1>
        }
}
const FunctionalComponent = (pathname) =>(
    <div>
        <Suspense fallback={<div>Loading...</div>}>
            <FunctionalArea pathname={pathname} />
        </Suspense>
    </div>
)
export default FunctionalComponent