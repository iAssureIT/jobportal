import React, {Component, Suspense} from 'react';

const India = React.lazy(() => import('../India/India.js'));

const MapView = (pathname) => {
    
	      switch(pathname.pathname.pathname.url) {
             
            //case pathname.pathname.pathname.url : return <India />;
	        case "/":   return <India />;

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/all/city/"+pathname.pathname.pathname.params.district+"/industry/"+pathname.pathname.pathname.params.industryName+"/"+pathname.pathname.pathname.params.industry_id+"/function/"+pathname.pathname.pathname.params.functionalArea+"/"+pathname.pathname.pathname.params.functionalArea_id+"/subfunction/"+pathname.pathname.pathname.params.subfunctionalArea+"/"+pathname.pathname.pathname.params.subfunctionalArea_id :  
                    return <India />;

	        // case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/MH/city/all/function/all/0/subfunction/all/0":   const Maharashtra = React.lazy(() => import('../Maharashtra/Maharashtra.js'))
	        // 	                return <Maharashtra/> ;
	        case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/MH/city/"+pathname.pathname.pathname.params.district+"/industry/"+pathname.pathname.pathname.params.industryName+"/"+pathname.pathname.pathname.params.industry_id+"/function/"+pathname.pathname.pathname.params.functionalArea+"/"+pathname.pathname.pathname.params.functionalArea_id+"/subfunction/"+pathname.pathname.pathname.params.subfunctionalArea+"/"+pathname.pathname.pathname.params.subfunctionalArea_id :  
                     const Maharashtra = React.lazy(() => import('../Maharashtra/Maharashtra.js'))
                                return <Maharashtra/> ; 	                
            
            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/JK/city/"+pathname.pathname.pathname.params.district+"/industry/"+pathname.pathname.pathname.params.industryName+"/"+pathname.pathname.pathname.params.industry_id+"/function/"+pathname.pathname.pathname.params.functionalArea+"/"+pathname.pathname.pathname.params.functionalArea_id+"/subfunction/"+pathname.pathname.pathname.params.subfunctionalArea+"/"+pathname.pathname.pathname.params.subfunctionalArea_id :  
                    const JammuKashmir = React.lazy(() => import('../JammuKashmirLadakh/JammuKashmirLadakh.js'))
	        	                return <JammuKashmir/> ;

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/LA/city/"+pathname.pathname.pathname.params.district+"/industry/"+pathname.pathname.pathname.params.industryName+"/"+pathname.pathname.pathname.params.industry_id+"/function/"+pathname.pathname.pathname.params.functionalArea+"/"+pathname.pathname.pathname.params.functionalArea_id+"/subfunction/"+pathname.pathname.pathname.params.subfunctionalArea+"/"+pathname.pathname.pathname.params.subfunctionalArea_id :  
                    const Ladakh = React.lazy(() => import('../Ladakh/Ladakh.js'))
	        	                return <Ladakh/> ;

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/PB/city/"+pathname.pathname.pathname.params.district+"/industry/"+pathname.pathname.pathname.params.industryName+"/"+pathname.pathname.pathname.params.industry_id+"/function/"+pathname.pathname.pathname.params.functionalArea+"/"+pathname.pathname.pathname.params.functionalArea_id+"/subfunction/"+pathname.pathname.pathname.params.subfunctionalArea+"/"+pathname.pathname.pathname.params.subfunctionalArea_id :  
                    const Punjab = React.lazy(() => import('../Punjab/Punjab.js'))
                                return <Punjab/> ;

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/HP/city/"+pathname.pathname.pathname.params.district+"/industry/"+pathname.pathname.pathname.params.industryName+"/"+pathname.pathname.pathname.params.industry_id+"/function/"+pathname.pathname.pathname.params.functionalArea+"/"+pathname.pathname.pathname.params.functionalArea_id+"/subfunction/"+pathname.pathname.pathname.params.subfunctionalArea+"/"+pathname.pathname.pathname.params.subfunctionalArea_id :  
                    const HimachalPradesh = React.lazy(() => import('../HimachalPradesh/HimachalPradesh.js'))
                                return <HimachalPradesh/> ;

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/UK/city/"+pathname.pathname.pathname.params.district+"/industry/"+pathname.pathname.pathname.params.industryName+"/"+pathname.pathname.pathname.params.industry_id+"/function/"+pathname.pathname.pathname.params.functionalArea+"/"+pathname.pathname.pathname.params.functionalArea_id+"/subfunction/"+pathname.pathname.pathname.params.subfunctionalArea+"/"+pathname.pathname.pathname.params.subfunctionalArea_id :  
                    const Uttarakhand = React.lazy(() => import('../Uttarakhand/Uttarakhand.js'))
                                return <Uttarakhand/> ;

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/RJ/city/"+pathname.pathname.pathname.params.district+"/industry/"+pathname.pathname.pathname.params.industryName+"/"+pathname.pathname.pathname.params.industry_id+"/function/"+pathname.pathname.pathname.params.functionalArea+"/"+pathname.pathname.pathname.params.functionalArea_id+"/subfunction/"+pathname.pathname.pathname.params.subfunctionalArea+"/"+pathname.pathname.pathname.params.subfunctionalArea_id :  
                    const Rajasthan = React.lazy(() => import('../Rajasthan/Rajasthan.js'))
                                return <Rajasthan/> ; 

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/HR/city/"+pathname.pathname.pathname.params.district+"/industry/"+pathname.pathname.pathname.params.industryName+"/"+pathname.pathname.pathname.params.industry_id+"/function/"+pathname.pathname.pathname.params.functionalArea+"/"+pathname.pathname.pathname.params.functionalArea_id+"/subfunction/"+pathname.pathname.pathname.params.subfunctionalArea+"/"+pathname.pathname.pathname.params.subfunctionalArea_id :  
                    const Haryana = React.lazy(() => import('../Haryana/Haryana.js'))
                                return <Haryana/> ;

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/GJ/city/"+pathname.pathname.pathname.params.district+"/industry/"+pathname.pathname.pathname.params.industryName+"/"+pathname.pathname.pathname.params.industry_id+"/function/"+pathname.pathname.pathname.params.functionalArea+"/"+pathname.pathname.pathname.params.functionalArea_id+"/subfunction/"+pathname.pathname.pathname.params.subfunctionalArea+"/"+pathname.pathname.pathname.params.subfunctionalArea_id :  
                    const Gujarat = React.lazy(() => import('../Gujarat/Gujarat.js'))
                                return <Gujarat/> ; 

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/MP/city/"+pathname.pathname.pathname.params.district+"/industry/"+pathname.pathname.pathname.params.industryName+"/"+pathname.pathname.pathname.params.industry_id+"/function/"+pathname.pathname.pathname.params.functionalArea+"/"+pathname.pathname.pathname.params.functionalArea_id+"/subfunction/"+pathname.pathname.pathname.params.subfunctionalArea+"/"+pathname.pathname.pathname.params.subfunctionalArea_id :  
                    const MadhyaPradesh = React.lazy(() => import('../MadhyaPradesh/MadhyaPradesh.js'))
                                return <MadhyaPradesh/> ; 

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/KA/city/"+pathname.pathname.pathname.params.district+"/industry/"+pathname.pathname.pathname.params.industryName+"/"+pathname.pathname.pathname.params.industry_id+"/function/"+pathname.pathname.pathname.params.functionalArea+"/"+pathname.pathname.pathname.params.functionalArea_id+"/subfunction/"+pathname.pathname.pathname.params.subfunctionalArea+"/"+pathname.pathname.pathname.params.subfunctionalArea_id :  
                    const Karnataka = React.lazy(() => import('../Karnataka/Karnataka.js'))
                                return <Karnataka/> ;  

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/TN/city/"+pathname.pathname.pathname.params.district+"/industry/"+pathname.pathname.pathname.params.industryName+"/"+pathname.pathname.pathname.params.industry_id+"/function/"+pathname.pathname.pathname.params.functionalArea+"/"+pathname.pathname.pathname.params.functionalArea_id+"/subfunction/"+pathname.pathname.pathname.params.subfunctionalArea+"/"+pathname.pathname.pathname.params.subfunctionalArea_id :  
                    const TamilNadu = React.lazy(() => import('../TamilNadu/TamilNadu.js'))
                                return <TamilNadu/> ;  

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/AP/city/"+pathname.pathname.pathname.params.district+"/industry/"+pathname.pathname.pathname.params.industryName+"/"+pathname.pathname.pathname.params.industry_id+"/function/"+pathname.pathname.pathname.params.functionalArea+"/"+pathname.pathname.pathname.params.functionalArea_id+"/subfunction/"+pathname.pathname.pathname.params.subfunctionalArea+"/"+pathname.pathname.pathname.params.subfunctionalArea_id :  
                    const AndhraPradesh = React.lazy(() => import('../AndhraPradesh/AndhraPradesh.js'))
                                return <AndhraPradesh/> ; 

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/TS/city/"+pathname.pathname.pathname.params.district+"/industry/"+pathname.pathname.pathname.params.industryName+"/"+pathname.pathname.pathname.params.industry_id+"/function/"+pathname.pathname.pathname.params.functionalArea+"/"+pathname.pathname.pathname.params.functionalArea_id+"/subfunction/"+pathname.pathname.pathname.params.subfunctionalArea+"/"+pathname.pathname.pathname.params.subfunctionalArea_id :  
                    const Telangana = React.lazy(() => import('../Telangana/Telangana.js'))
                                return <Telangana/> ;  

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/OD/city/"+pathname.pathname.pathname.params.district+"/industry/"+pathname.pathname.pathname.params.industryName+"/"+pathname.pathname.pathname.params.industry_id+"/function/"+pathname.pathname.pathname.params.functionalArea+"/"+pathname.pathname.pathname.params.functionalArea_id+"/subfunction/"+pathname.pathname.pathname.params.subfunctionalArea+"/"+pathname.pathname.pathname.params.subfunctionalArea_id :  
                    const Orissa = React.lazy(() => import('../Orissa/Orissa.js'))
                                return <Orissa/> ;  

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/CG/city/"+pathname.pathname.pathname.params.district+"/industry/"+pathname.pathname.pathname.params.industryName+"/"+pathname.pathname.pathname.params.industry_id+"/function/"+pathname.pathname.pathname.params.functionalArea+"/"+pathname.pathname.pathname.params.functionalArea_id+"/subfunction/"+pathname.pathname.pathname.params.subfunctionalArea+"/"+pathname.pathname.pathname.params.subfunctionalArea_id :  
                    const Chhattisgarh = React.lazy(() => import('../Chhattisgarh/Chhattisgarh.js'))
                                return <Chhattisgarh/> ;  

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/UP/city/"+pathname.pathname.pathname.params.district+"/industry/"+pathname.pathname.pathname.params.industryName+"/"+pathname.pathname.pathname.params.industry_id+"/function/"+pathname.pathname.pathname.params.functionalArea+"/"+pathname.pathname.pathname.params.functionalArea_id+"/subfunction/"+pathname.pathname.pathname.params.subfunctionalArea+"/"+pathname.pathname.pathname.params.subfunctionalArea_id :  
                    const UttarPradesh = React.lazy(() => import('../UttarPradesh/UttarPradesh.js'))
                                return <UttarPradesh/> ; 

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/WB/city/"+pathname.pathname.pathname.params.district+"/industry/"+pathname.pathname.pathname.params.industryName+"/"+pathname.pathname.pathname.params.industry_id+"/function/"+pathname.pathname.pathname.params.functionalArea+"/"+pathname.pathname.pathname.params.functionalArea_id+"/subfunction/"+pathname.pathname.pathname.params.subfunctionalArea+"/"+pathname.pathname.pathname.params.subfunctionalArea_id :  
                    const WestBengal = React.lazy(() => import('../WestBengal/WestBengal.js'))
                                return <WestBengal/> ; 

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/BR/city/"+pathname.pathname.pathname.params.district+"/industry/"+pathname.pathname.pathname.params.industryName+"/"+pathname.pathname.pathname.params.industry_id+"/function/"+pathname.pathname.pathname.params.functionalArea+"/"+pathname.pathname.pathname.params.functionalArea_id+"/subfunction/"+pathname.pathname.pathname.params.subfunctionalArea+"/"+pathname.pathname.pathname.params.subfunctionalArea_id :  
                    const Bihar = React.lazy(() => import('../Bihar/Bihar.js'))
                                return <Bihar/> ;

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/JH/city/"+pathname.pathname.pathname.params.district+"/industry/"+pathname.pathname.pathname.params.industryName+"/"+pathname.pathname.pathname.params.industry_id+"/function/"+pathname.pathname.pathname.params.functionalArea+"/"+pathname.pathname.pathname.params.functionalArea_id+"/subfunction/"+pathname.pathname.pathname.params.subfunctionalArea+"/"+pathname.pathname.pathname.params.subfunctionalArea_id :  
                    const Jharkhand = React.lazy(() => import('../Jharkhand/Jharkhand.js'))
                                return <Jharkhand/> ;

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/SK/city/"+pathname.pathname.pathname.params.district+"/industry/"+pathname.pathname.pathname.params.industryName+"/"+pathname.pathname.pathname.params.industry_id+"/function/"+pathname.pathname.pathname.params.functionalArea+"/"+pathname.pathname.pathname.params.functionalArea_id+"/subfunction/"+pathname.pathname.pathname.params.subfunctionalArea+"/"+pathname.pathname.pathname.params.subfunctionalArea_id :  
                    const Sikkim = React.lazy(() => import('../Sikkim/Sikkim.js'))
                                return <Sikkim/> ;

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/AS/city/"+pathname.pathname.pathname.params.district+"/industry/"+pathname.pathname.pathname.params.industryName+"/"+pathname.pathname.pathname.params.industry_id+"/function/"+pathname.pathname.pathname.params.functionalArea+"/"+pathname.pathname.pathname.params.functionalArea_id+"/subfunction/"+pathname.pathname.pathname.params.subfunctionalArea+"/"+pathname.pathname.pathname.params.subfunctionalArea_id :  
                    const Assam = React.lazy(() => import('../Assam/Assam.js'))
                                return <Assam/> ;

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/ML/city/"+pathname.pathname.pathname.params.district+"/industry/"+pathname.pathname.pathname.params.industryName+"/"+pathname.pathname.pathname.params.industry_id+"/function/"+pathname.pathname.pathname.params.functionalArea+"/"+pathname.pathname.pathname.params.functionalArea_id+"/subfunction/"+pathname.pathname.pathname.params.subfunctionalArea+"/"+pathname.pathname.pathname.params.subfunctionalArea_id :  
                    const Meghalaya = React.lazy(() => import('../Meghalaya/Meghalaya.js'))
                                return <Meghalaya/> ;

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/AR/city/"+pathname.pathname.pathname.params.district+"/industry/"+pathname.pathname.pathname.params.industryName+"/"+pathname.pathname.pathname.params.industry_id+"/function/"+pathname.pathname.pathname.params.functionalArea+"/"+pathname.pathname.pathname.params.functionalArea_id+"/subfunction/"+pathname.pathname.pathname.params.subfunctionalArea+"/"+pathname.pathname.pathname.params.subfunctionalArea_id :  
                    const ArunachalPradesh = React.lazy(() => import('../ArunachalPradesh/ArunachalPradesh.js'))
                                return <ArunachalPradesh/> ;

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/NL/city/"+pathname.pathname.pathname.params.district+"/industry/"+pathname.pathname.pathname.params.industryName+"/"+pathname.pathname.pathname.params.industry_id+"/function/"+pathname.pathname.pathname.params.functionalArea+"/"+pathname.pathname.pathname.params.functionalArea_id+"/subfunction/"+pathname.pathname.pathname.params.subfunctionalArea+"/"+pathname.pathname.pathname.params.subfunctionalArea_id :  
                    const Nagaland = React.lazy(() => import('../Nagaland/Nagaland.js'))
                                return <Nagaland/> ;

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/MN/city/"+pathname.pathname.pathname.params.district+"/industry/"+pathname.pathname.pathname.params.industryName+"/"+pathname.pathname.pathname.params.industry_id+"/function/"+pathname.pathname.pathname.params.functionalArea+"/"+pathname.pathname.pathname.params.functionalArea_id+"/subfunction/"+pathname.pathname.pathname.params.subfunctionalArea+"/"+pathname.pathname.pathname.params.subfunctionalArea_id :  
                    const Manipur = React.lazy(() => import('../Manipur/Manipur.js'))
                                return <Manipur/> ;

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/MZ/city/"+pathname.pathname.pathname.params.district+"/industry/"+pathname.pathname.pathname.params.industryName+"/"+pathname.pathname.pathname.params.industry_id+"/function/"+pathname.pathname.pathname.params.functionalArea+"/"+pathname.pathname.pathname.params.functionalArea_id+"/subfunction/"+pathname.pathname.pathname.params.subfunctionalArea+"/"+pathname.pathname.pathname.params.subfunctionalArea_id :  
                    const Mizoram = React.lazy(() => import('../Mizoram/Mizoram.js'))
                                return <Mizoram/> ;

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/TR/city/"+pathname.pathname.pathname.params.district+"/industry/"+pathname.pathname.pathname.params.industryName+"/"+pathname.pathname.pathname.params.industry_id+"/function/"+pathname.pathname.pathname.params.functionalArea+"/"+pathname.pathname.pathname.params.functionalArea_id+"/subfunction/"+pathname.pathname.pathname.params.subfunctionalArea+"/"+pathname.pathname.pathname.params.subfunctionalArea_id :  
                    const Tripura = React.lazy(() => import('../Tripura/Tripura.js'))
                                return <Tripura/> ;

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/KL/city/"+pathname.pathname.pathname.params.district+"/industry/"+pathname.pathname.pathname.params.industryName+"/"+pathname.pathname.pathname.params.industry_id+"/function/"+pathname.pathname.pathname.params.functionalArea+"/"+pathname.pathname.pathname.params.functionalArea_id+"/subfunction/"+pathname.pathname.pathname.params.subfunctionalArea+"/"+pathname.pathname.pathname.params.subfunctionalArea_id :  
                    const Kerala = React.lazy(() => import('../Kerala/Kerala.js'))
                                return <Kerala/> ;

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/GA/city/"+pathname.pathname.pathname.params.district+"/industry/"+pathname.pathname.pathname.params.industryName+"/"+pathname.pathname.pathname.params.industry_id+"/function/"+pathname.pathname.pathname.params.functionalArea+"/"+pathname.pathname.pathname.params.functionalArea_id+"/subfunction/"+pathname.pathname.pathname.params.subfunctionalArea+"/"+pathname.pathname.pathname.params.subfunctionalArea_id :  
                    const Goa = React.lazy(() => import('../Goa/Goa.js'))
                                return <Goa/> ;

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/DL/city/"+pathname.pathname.pathname.params.district+"/industry/"+pathname.pathname.pathname.params.industryName+"/"+pathname.pathname.pathname.params.industry_id+"/function/"+pathname.pathname.pathname.params.functionalArea+"/"+pathname.pathname.pathname.params.functionalArea_id+"/subfunction/"+pathname.pathname.pathname.params.subfunctionalArea+"/"+pathname.pathname.pathname.params.subfunctionalArea_id :  
                    const Delhi = React.lazy(() => import('../Delhi/Delhi.js'))
                                return <Delhi/> ;

           /* case "/state/CH":   const Chandigarh = React.lazy(() => import('../Chandigarh/Chandigarh.js'))
                                return <Chandigarh/> ;

            case "/state/AN":   const Assam = React.lazy(() => import('../Assam/Assam.js'))
                                return <Assam/> ;

            case "/state/LD":   const Assam = React.lazy(() => import('../Assam/Assam.js'))
                                return <Assam/> ;

                  */



	        default:      return <h1>No map match</h1>
	      }
	    }
const MapComponent = (pathname) =>(
	<div>
		<Suspense fallback={<div>Loading...</div>}>
	        <MapView pathname ={pathname}/>
	    </Suspense>
	</div>
)
 
export default MapComponent;