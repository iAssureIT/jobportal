import React, {Component} from 'react';

import './Goa.css';
import '../global.css';


export default class Goa extends Component{

	render(){
		return(
			<div className="bodyWrapper">
				<div className="stateWrapper">
					<div className="per"> 
						<img src="/Maps/Goa/Pernem.png" className="pernem" alt="Pernem"/>
					</div>
					<div className="map"> 
						<img src="/Maps/Goa/Mapusa.png" className="mapusa" alt="Mapusa"/>
					</div>
					<div className="bic"> 
						<img src="/Maps/Goa/Bicholim.png" className="bicholim" alt="Bicholim"/>
					</div>
					<div className="pan"> 
						<img src="/Maps/Goa/Panjim.png" className="panjim" alt="Panjim"/>
					</div>
					
				</div>
			</div>
		);
	}
}