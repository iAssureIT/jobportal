import React, {Component, Suspense} from 'react';

const India = React.lazy(() => import('../India/India.js'));

const MapView = () => {

	      switch(window.location.pathname) {
	        case "/":   return <India />;

	        case "/state/MH":   const Maharashtra = React.lazy(() => import('../Maharashtra/Maharashtra.js'))
	        	                return <Maharashtra/> ;
	        	                

	        case "/state/JK":   const JammuKashmir = React.lazy(() => import('../JammuKashmirLadakh/JammuKashmirLadakh.js'))
	        	                return <JammuKashmir/> ;

	        case "/state/LA":   const Ladakh = React.lazy(() => import('../Ladakh/Ladakh.js'))
	        	                return <Ladakh/> ;

            case "/state/PB":   const Punjab = React.lazy(() => import('../Punjab/Punjab.js'))
                                return <Punjab/> ;

            case "/state/HP":   const HimachalPradesh = React.lazy(() => import('../HimachalPradesh/HimachalPradesh.js'))
                                return <HimachalPradesh/> ;

            case "/state/UK":   const Uttarakhand = React.lazy(() => import('../Uttarakhand/Uttarakhand.js'))
                                return <Uttarakhand/> ;

            case "/state/RJ":   const Rajasthan = React.lazy(() => import('../Rajasthan/Rajasthan.js'))
                                return <Rajasthan/> ; 

            case "/state/HR":   const Haryana = React.lazy(() => import('../Haryana/Haryana.js'))
                                return <Haryana/> ;

            case "/state/GJ":   const Gujarat = React.lazy(() => import('../Gujarat/Gujarat.js'))
                                return <Gujarat/> ; 

            case "/state/MP":   const MadhyaPradesh = React.lazy(() => import('../MadhyaPradesh/MadhyaPradesh.js'))
                                return <MadhyaPradesh/> ; 

            case "/state/KA":   const Karnataka = React.lazy(() => import('../Karnataka/Karnataka.js'))
                                return <Karnataka/> ;  

            case "/state/TN":   const TamilNadu = React.lazy(() => import('../TamilNadu/TamilNadu.js'))
                                return <TamilNadu/> ;  

<<<<<<< Updated upstream
            case "/state/AP":   const AndhraPradesh = React.lazy(() => import('../AndhraPradesh/AndhraPradesh.js'))
=======
            case "/state/AD":   const AndhraPradesh = React.lazy(() => import('../AndhraPradesh/AndhraPradesh.js'))
>>>>>>> Stashed changes
                                return <AndhraPradesh/> ; 

            case "/state/TS":   const Telangana = React.lazy(() => import('../Telangana/Telangana.js'))
                                return <Telangana/> ;  

            case "/state/OD":   const Orissa = React.lazy(() => import('../Orissa/Orissa.js'))
                                return <Orissa/> ;  

            case "/state/CG":   const Chhattisgarh = React.lazy(() => import('../Chhattisgarh/Chhattisgarh.js'))
                                return <Chhattisgarh/> ;  

            case "/state/UP":   const UttarPradesh = React.lazy(() => import('../UttarPradesh/UttarPradesh.js'))
                                return <UttarPradesh/> ; 

            case "/state/WB":   const WestBengal = React.lazy(() => import('../WestBengal/WestBengal.js'))
                                return <WestBengal/> ; 

            case "/state/BR":   const Bihar = React.lazy(() => import('../Bihar/Bihar.js'))
                                return <Bihar/> ;

            case "/state/JH":   const Jharkhand = React.lazy(() => import('../Jharkhand/Jharkhand.js'))
                                return <Jharkhand/> ;

            case "/state/SK":   const Sikkim = React.lazy(() => import('../Sikkim/Sikkim.js'))
                                return <Sikkim/> ;

            case "/state/AS":   const Assam = React.lazy(() => import('../Assam/Assam.js'))
                                return <Assam/> ;

            case "/state/ML":   const Meghalaya = React.lazy(() => import('../Meghalaya/Meghalaya.js'))
                                return <Meghalaya/> ;

            case "/state/AR":   const ArunachalPradesh = React.lazy(() => import('../ArunachalPradesh/ArunachalPradesh.js'))
                                return <ArunachalPradesh/> ;

             case "/state/NL":   const Nagaland = React.lazy(() => import('../Nagaland/Nagaland.js'))
                                return <Nagaland/> ;

            case "/state/MN":   const Manipur = React.lazy(() => import('../Manipur/Manipur.js'))
                                return <Manipur/> ;

            case "/state/MZ":   const Mizoram = React.lazy(() => import('../Mizoram/Mizoram.js'))
                                return <Mizoram/> ;

            case "/state/TR":   const Tripura = React.lazy(() => import('../Tripura/Tripura.js'))
                                return <Tripura/> ;

            case "/state/KL":   const Kerala = React.lazy(() => import('../Kerala/Kerala.js'))
                                return <Kerala/> ;

            case "/state/GA":   const Goa = React.lazy(() => import('../Goa/Goa.js'))
                                return <Goa/> ;

            case "/state/DL":   const Delhi = React.lazy(() => import('../Delhi/Delhi.js'))
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
const MapComponent = () =>(
	<div>
		<Suspense fallback={<div>Loading...</div>}>
	        <MapView />
	    </Suspense>
	</div>
)
 
export default MapComponent;