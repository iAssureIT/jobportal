import React, {Component, Suspense} from 'react';

const India = React.lazy(() => import('../India/India.js'));

console.log(window.location.pathname)


const MapView = () => {
	
	      switch(window.location.pathname) {
	        case "/":   return <India />;
	        //case "MH":   return <Maharashtra />;
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