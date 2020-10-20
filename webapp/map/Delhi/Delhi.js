import React, {Component} from 'react';

import './Delhi.css';
import '../global.css';


export default class Delhi extends Component{

	render(){
		return(
			<div className="bodyWrapper">
				<div className="stateWrapper">
					<div className="dwa"> 
						<img src="/Maps/Delhi/Dwarka.png" className="dwarka" alt="Dwarka"/>
					</div>
					<div className="new"> 
						<img src="/Maps/Delhi/NEW_Delhi.png" className="newDelhi" alt="NEW_Delhi"/>
					</div>
					<div className="san"> 
						<img src="/Maps/Delhi/Saket.png" className="saket" alt="Saket"/>
					</div>
					<div className="def"> 
						<img src="/Maps/Delhi/Defence_Colony.png" className="defenceColony" alt="Defence_Colony"/>
					</div>
					<div className="pre"> 
						<img src="/Maps/Delhi/Preet_Vihar.png" className="preetVihar" alt="Preet_Vihar"/>
					</div>
					<div className="sha"> 
						<img src="/Maps/Delhi/Shahdara.png" className="shahdara" alt="Shahdara"/>
					</div>
					<div className="cen"> 
						<img src="/Maps/Delhi/Central_Daryaganj.png" className="centralDaryaganj" alt="Central_Daryaganj"/>
					</div>
					<div className="raj"> 
						<img src="/Maps/Delhi/Rajouri_Garden.png" className="rajouriGarden" alt="Rajouri_Garden"/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Delhi/Kanjhwala.png" className="kanjhwala" alt="Kanjhwala"/>
					</div>
					<div className="nor"> 
						<img src="/Maps/Delhi/North_Narela.png" className="northNarela" alt="North_Narela"/>
					</div>
					<div className="nor"> 
						<img src="/Maps/Delhi/North_East_Seelampur.png" className="northEastSeelampur" alt="North_East_Seelampur"/>
					</div>
					
				</div>
			</div>
		);
	}
}