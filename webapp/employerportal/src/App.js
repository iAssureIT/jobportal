// import React from 'react';
// import './coreadmin/css/root.css';
// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './lib/router.js';
// import Layout from './Layout.js';
// import axios from 'axios';

// axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

// axios.defaults.headers.post['Content-Type'] = 'application/json';

// function App() {
//   return (
//     <div>
//       <Layout />
//     </div>
//   ); 
// }

// export default App;

import React,{useEffect,useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './coreadmin/css/root.css';
import Layout from './Layout.js';
import './lib/router.js';
import axios from 'axios';
import $ from 'jquery';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import ReactDependentScript from "react-dependent-script";
import './jobportaladmin/Common/FontAwesomeIcons'; 

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
console.log("axios.defaults.baseURL",axios.defaults.baseURL);
axios.defaults.headers.post['Content-Type'] = 'application/json'; 


export const App = () => {
	const [initMap,setInitMap]=useState(false)
	const [googleAPIKey,setGoogleAPIKey]=useState()
	useEffect(() => {
	 	axios.get("/api/projectSettings/get/GOOGLE",)
	    .then((response) => {
	      	setGoogleAPIKey(response.data.googleapikey)
	        window.initMap = setInitMap(true);
	    })
	    .catch((error) =>{
	        console.log(error)
	    })
	}, []);
  return (
    <div>
    	{
		/*initMap ?
  		<ReactDependentScript
	      scripts={[
	        "https://maps.googleapis.com/maps/api/js?key="+googleAPIKey+"&libraries=places&callback=initMap"
	      ]}
	    >*/
	      <Layout />
	    /*</ReactDependentScript>
  		:
  		null*/
      }
    </div>
    
    );  
}

