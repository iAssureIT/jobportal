import React, {Component, Suspense} from 'react';

const India = React.lazy(() => import('../India/India.js'));

const MapView = (pathname) => {
    
	      switch(pathname.pathname.pathname.url) {
             
            //case pathname.pathname.pathname.url : return <India />;
	        case "/":   return <India />;

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/"+pathname.pathname.pathname.params.stateCode+"/"+pathname.pathname.pathname.params.district :   return <India />;

	        // case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/MH/city/all/function/all/0/subfunction/all/0":   const Maharashtra = React.lazy(() => import('../Maharashtra/Maharashtra.js'))
	        // 	                return <Maharashtra/> ;
	        case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/"+pathname.pathname.pathname.params.stateCode+"/city/"+pathname.pathname.pathname.params.district+"/function/"+pathname.pathname.pathname.params.functionalArea+"/"+pathname.pathname.pathname.params.functionalArea_id+"/subfunction/"+pathname.pathname.pathname.params.subfunctionalArea+"/"+pathname.pathname.pathname.params.subfunctionalArea_id :  
                     const Maharashtra = React.lazy(() => import('../Maharashtra/Maharashtra.js'))
                                return <Maharashtra/> ; 	                

	        case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/JK/city/all/function/all/0/subfunction/all/0":   const JammuKashmir = React.lazy(() => import('../JammuKashmirLadakh/JammuKashmirLadakh.js'))
	        	                return <JammuKashmir/> ;

	        case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/LA/city/all/function/all/0/subfunction/all/0":   const Ladakh = React.lazy(() => import('../Ladakh/Ladakh.js'))
	        	                return <Ladakh/> ;

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/PB/city/all/function/all/0/subfunction/all/0":   const Punjab = React.lazy(() => import('../Punjab/Punjab.js'))
                                return <Punjab/> ;

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/HP/city/all/function/all/0/subfunction/all/0":   const HimachalPradesh = React.lazy(() => import('../HimachalPradesh/HimachalPradesh.js'))
                                return <HimachalPradesh/> ;

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/UK/city/all/function/all/0/subfunction/all/0":   const Uttarakhand = React.lazy(() => import('../Uttarakhand/Uttarakhand.js'))
                                return <Uttarakhand/> ;

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/RJ/city/all/function/all/0/subfunction/all/0":   const Rajasthan = React.lazy(() => import('../Rajasthan/Rajasthan.js'))
                                return <Rajasthan/> ; 

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/HR/city/all/function/all/0/subfunction/all/0":   const Haryana = React.lazy(() => import('../Haryana/Haryana.js'))
                                return <Haryana/> ;

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/GJ/city/all/function/all/0/subfunction/all/0":   const Gujarat = React.lazy(() => import('../Gujarat/Gujarat.js'))
                                return <Gujarat/> ; 

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/MP/city/all/function/all/0/subfunction/all/0":   const MadhyaPradesh = React.lazy(() => import('../MadhyaPradesh/MadhyaPradesh.js'))
                                return <MadhyaPradesh/> ; 

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/KA/city/all/function/all/0/subfunction/all/0":   const Karnataka = React.lazy(() => import('../Karnataka/Karnataka.js'))
                                return <Karnataka/> ;  

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/TN/city/all/function/all/0/subfunction/all/0":   const TamilNadu = React.lazy(() => import('../TamilNadu/TamilNadu.js'))
                                return <TamilNadu/> ;  

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/AD/city/all/function/all/0/subfunction/all/0":   const AndhraPradesh = React.lazy(() => import('../AndhraPradesh/AndhraPradesh.js'))
                                return <AndhraPradesh/> ; 

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/TS/city/all/function/all/0/subfunction/all/0":   const Telangana = React.lazy(() => import('../Telangana/Telangana.js'))
                                return <Telangana/> ;  

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/OD/city/all/function/all/0/subfunction/all/0":   const Orissa = React.lazy(() => import('../Orissa/Orissa.js'))
                                return <Orissa/> ;  

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/CG/city/all/function/all/0/subfunction/all/0":   const Chhattisgarh = React.lazy(() => import('../Chhattisgarh/Chhattisgarh.js'))
                                return <Chhattisgarh/> ;  

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/UP/city/all/function/all/0/subfunction/all/0":   const UttarPradesh = React.lazy(() => import('../UttarPradesh/UttarPradesh.js'))
                                return <UttarPradesh/> ; 

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/WB/city/all/function/all/0/subfunction/all/0":   const WestBengal = React.lazy(() => import('../WestBengal/WestBengal.js'))
                                return <WestBengal/> ; 

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/BR/city/all/function/all/0/subfunction/all/0":   const Bihar = React.lazy(() => import('../Bihar/Bihar.js'))
                                return <Bihar/> ;

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/JH/city/all/function/all/0/subfunction/all/0":   const Jharkhand = React.lazy(() => import('../Jharkhand/Jharkhand.js'))
                                return <Jharkhand/> ;

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/SK/city/all/function/all/0/subfunction/all/0":   const Sikkim = React.lazy(() => import('../Sikkim/Sikkim.js'))
                                return <Sikkim/> ;

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/AS/city/all/function/all/0/subfunction/all/0":   const Assam = React.lazy(() => import('../Assam/Assam.js'))
                                return <Assam/> ;

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/ML/city/all/function/all/0/subfunction/all/0":   const Meghalaya = React.lazy(() => import('../Meghalaya/Meghalaya.js'))
                                return <Meghalaya/> ;

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/AR/city/all/function/all/0/subfunction/all/0":   const ArunachalPradesh = React.lazy(() => import('../ArunachalPradesh/ArunachalPradesh.js'))
                                return <ArunachalPradesh/> ;

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/NL/city/all/function/all/0/subfunction/all/0":   const Nagaland = React.lazy(() => import('../Nagaland/Nagaland.js'))
                                return <Nagaland/> ;

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/MN/city/all/function/all/0/subfunction/all/0":   const Manipur = React.lazy(() => import('../Manipur/Manipur.js'))
                                return <Manipur/> ;

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/MZ/city/all/function/all/0/subfunction/all/0":   const Mizoram = React.lazy(() => import('../Mizoram/Mizoram.js'))
                                return <Mizoram/> ;

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/TR/city/all/function/all/0/subfunction/all/0":   const Tripura = React.lazy(() => import('../Tripura/Tripura.js'))
                                return <Tripura/> ;

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/KL/city/all/function/all/0/subfunction/all/0":   const Kerala = React.lazy(() => import('../Kerala/Kerala.js'))
                                return <Kerala/> ;

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/GA/city/all/function/all/0/subfunction/all/0":   const Goa = React.lazy(() => import('../Goa/Goa.js'))
                                return <Goa/> ;

            case "/country/"+pathname.pathname.pathname.params.countryCode+"/state/DL/city/all/function/all/0/subfunction/all/0":   const Delhi = React.lazy(() => import('../Delhi/Delhi.js'))
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