import React, {Component, Suspense} from 'react';

const India = React.lazy(() => import('../India/India.js'));
//const Maharashtra = React.lazy(() => import('../Maharashtra/Maharashtra.js'));

console.log("location",window.location)

const MapView = () => {

	      switch(window.location.pathname) {
	        case "/":   return <India />;

	        case "/state/MH":   const Maharashtra = React.lazy(() => import('../Maharashtra/Maharashtra.js'))
	        	                return <Maharashtra/> ;

	        case "/state/JK":   const JammuKashmir = React.lazy(() => import('../JammuKashmirLadakh/JammuKashmirLadakh.js'))
	        	                return <JammuKashmir/> ;

	        case "/state/LA":   const Ladakh = React.lazy(() => import('../Ladakh/Ladakh.js'))
	        	                return <Ladakh/> ;

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