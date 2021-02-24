import React, {Component, Suspense} from 'react';

const FunctionalAreaJobs = React.lazy(() => import('../FunctionalAreawiseJobs/FunctionalAreawiseJobs.js'));

const FunctionalArea = (pathname) => {
    //console.log(pathname.pathname.pathname)
     //console.log("/country/"+pathname.pathname.pathname.params.countryCode+"/state/"+pathname.pathname.pathname.params.stateCode+"/city/"+pathname.pathname.pathname.params.district+"/function/"+pathname.pathname.pathname.params.functionalArea+"/"+pathname.pathname.pathname.params.functionalArea_id)
    if (pathname.pathname.pathname.url == "/") {
        //console.log("in if")
        var Comp =  <FunctionalAreaJobs />; 
        return Comp  
    }
    else if (pathname.pathname.pathname.url == "/country/"+pathname.pathname.pathname.params.countryCode+"/state/"+pathname.pathname.pathname.params.stateCode+"/city/"+pathname.pathname.pathname.params.district+"/industry/"+pathname.pathname.pathname.params.industryName+"/"+pathname.pathname.pathname.params.industry_id+"/function/"+pathname.pathname.pathname.params.functionalArea+"/"+pathname.pathname.pathname.params.functionalArea_id+"/subfunction/"+pathname.pathname.pathname.params.subfunctionalArea+"/"+pathname.pathname.pathname.params.subfunctionalArea_id) {
        
        if (pathname.pathname.pathname.params.functionalArea == "all") {
            var Comp =  <FunctionalAreaJobs />; 
        }
        else if(pathname.pathname.pathname.params.subfunctionalArea == "all"){
           var Comp =  React.lazy(() => import('../SubFunctionalAreawiseJobs/SubFunctionalAreawiseJobs.js')) 
           Comp = <Comp/> 
        }else {
            var Comp =  React.lazy(() => import('../jobList/JobList.js')) 
            Comp = <Comp/> 
        }
        //console.log("in else if")
        return Comp
    }
    
    else{
        var Comp = ( <h1>No map match11</h1>)
        return Comp
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