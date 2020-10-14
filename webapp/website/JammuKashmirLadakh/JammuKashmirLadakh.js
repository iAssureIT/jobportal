import React, {Component} from 'react';

import './JammuKashmirLadakh.css';
import '../global.css';


export default class JammuKashmirLadakh extends Component{

	render(){
		return(
			<div className="bodyWrapper">
				<div className="stateWrapper">
					<div className="kan"> 
						<img src="/Maps/Jammu_Kashmir___Ladakh/Jammu_And_Kashmir.png" className="jammuAndKashmir" alt="Jammu_And_Kashmir"/>
					</div>
					<div className="cha"> 
						<img src="/Maps/Jammu_Kashmir___Ladakh/Ladakh.png" className="ladakh" alt="Ladakh"/>
					</div>
					

				</div>
			</div>
		);
	}
}