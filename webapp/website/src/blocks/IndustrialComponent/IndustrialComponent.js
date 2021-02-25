import React, {Component, Suspense} from 'react';

const IndustrialJobs = React.lazy(() => import('../IndustrywiseJobs/IndustrywiseJobs.js'));

const Industrial = (pathname) => {
    //console.log(pathname.pathname.pathname)
     //console.log("/country/"+pathname.pathname.pathname.params.countryCode+"/state/"+pathname.pathname.pathname.params.stateCode+"/city/"+pathname.pathname.pathname.params.district+"/function/"+pathname.pathname.pathname.params.functionalArea+"/"+pathname.pathname.pathname.params.functionalArea_id)
    if (pathname.pathname.pathname.url == "/") {
        //console.log("in if")
        var Comp =  <IndustrialJobs />; 
        return Comp  
    }
    else if (pathname.pathname.pathname.url == "/country/"+pathname.pathname.pathname.params.countryCode+"/state/"+pathname.pathname.pathname.params.stateCode+"/city/"+pathname.pathname.pathname.params.district+"/industry/"+pathname.pathname.pathname.params.industryName+"/"+pathname.pathname.pathname.params.industry_id+"/function/"+pathname.pathname.pathname.params.functionalArea+"/"+pathname.pathname.pathname.params.functionalArea_id+"/subfunction/"+pathname.pathname.pathname.params.subfunctionalArea+"/"+pathname.pathname.pathname.params.subfunctionalArea_id) {
        
        if (pathname.pathname.pathname.params.industryName != "all") {
            console.log("in all")
            var Comp =  React.lazy(() => import('../jobList/JobList.js')) 
            Comp = <Comp/> 
        }
        else {
            console.log("jsahh")
            var Comp =  IndustrialJobs
            Comp = <Comp/> 
        }
        
        return Comp
    }
    
    else{
        var Comp = ( <h1>No map match11</h1>)
        return Comp
    }
    
    
}
const IndustrialComponent = (pathname) =>(
    <div>
        <Suspense fallback={<div>Loading...</div>}>
            <Industrial pathname={pathname} />
        </Suspense>
    </div>
)
export default IndustrialComponent