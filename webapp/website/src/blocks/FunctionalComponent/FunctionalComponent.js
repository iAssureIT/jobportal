import React, {Component, Suspense} from 'react';

const FunctionalAreaJobs = React.lazy(() => import('../FunctionalAreawiseJobs/FunctionalAreawiseJobs.js'));

const FunctionalArea = (pathname) => {
    //console.log(pathname.pathname.pathname)
    //console.log(pathname.pathname.pathname.url)
        switch(pathname.pathname.pathname.url) {
            case "/":   return <FunctionalAreaJobs />;
            case "/state/"+pathname.pathname.pathname.params.stateCode :   return <FunctionalAreaJobs />;
            case "/state/"+pathname.pathname.pathname.params.stateCode+"/"+pathname.pathname.pathname.params.district :   return <FunctionalAreaJobs />;

            case "/state/"+pathname.pathname.pathname.params.stateCode+"/"+pathname.pathname.pathname.params.district + "/"+pathname.pathname.pathname.params.functionalArea:
                            const SubFunctionalAreawiseJobs = React.lazy(() => import('../SubFunctionalAreawiseJobs/SubFunctionalAreawiseJobs.js'))
                                return <SubFunctionalAreawiseJobs/>

            case "/state/"+pathname.pathname.pathname.params.stateCode+"/"+pathname.pathname.pathname.params.district + "/"+pathname.pathname.pathname.params.functionalArea+"/"+pathname.pathname.pathname.params.subfunctionalArea:
                            const JobList = React.lazy(() => import('../jobList/JobList.js'))
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