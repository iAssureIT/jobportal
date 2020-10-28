import React, {Component} from 'react';

import './JammuKashmirLadakh.css';
import '../global.css';


export default class JammuKashmirLadakh extends Component{

	render(){
		return(
			<div className="bodyWrapper">
				<div className="stateWrapper">
					<div className="kan"> 
						<img src="/Maps/Jammu_Kashmir___Ladakh/Jammu_And_Kashmir.png" className="jammuAndKashmir" alt="Jammu_And_Kashmir" onMouseOver={e => (e.currentTarget.src = "/Maps/Jammu_Kashmir___Ladakh/Jammu_And_Kashmir_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Jammu_Kashmir___Ladakh/Jammu_And_Kashmir.png")}/>
					</div>
					<div className="cha"> 
						<img src="/Maps/Jammu_Kashmir___Ladakh/Ladakh.png" className="ladakhJK" alt="Ladakh" onMouseOver={e => (e.currentTarget.src = "/Maps/Jammu_Kashmir___Ladakh/Ladakh_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Jammu_Kashmir___Ladakh/Ladakh.png")}/>
					</div>
					

				</div>
			</div>
		);
	}
}