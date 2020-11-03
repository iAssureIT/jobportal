import React, {Component} from 'react';

import './Delhi.css';
import '../global.css';


export default class Delhi extends Component{

	render(){
		return(
			<div className="bodyWrapper">
				<div className="stateWrapper">
					<div className="dwa"> 
						<img src="/Maps/Delhi/Dwarka.png" className="dwarka" alt="Dwarka" onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Dwarka_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Dwarka.png")}/>
					</div>
					<div className="new"> 
						<img src="/Maps/Delhi/NEW_Delhi.png" className="newDelhi" alt="NEW_Delhi" onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/NEW_Delhi_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/NEW_Delhi.png")}/>
					</div>
					<div className="san"> 
						<img src="/Maps/Delhi/Saket.png" className="saket" alt="Saket" onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Saket_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Saket.png")}/>
					</div>
					<div className="def"> 
						<img src="/Maps/Delhi/Defence_Colony.png" className="defenceColony" alt="Defence_Colony" onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Defence_Colony_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Defence_Colony.png")}/>
					</div>
					<div className="pre"> 
						<img src="/Maps/Delhi/Preet_Vihar.png" className="preetVihar" alt="Preet_Vihar" onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Preet_Vihar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Preet_Vihar.png")}/>
					</div>
					<div className="sha"> 
						<img src="/Maps/Delhi/Shahdara.png" className="shahdara" alt="Shahdara" onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Shahdara_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Shahdara.png")}/>
					</div>
					<div className="cen"> 
						<img src="/Maps/Delhi/Central_Daryaganj.png" className="centralDaryaganj" alt="Central_Daryaganj" onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Central_Daryaganj_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Central_Daryaganj.png")}/>
					</div>
					<div className="raj"> 
						<img src="/Maps/Delhi/Rajouri_Garden.png" className="rajouriGarden" alt="Rajouri_Garden" onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Rajouri_Garden_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Rajouri_Garden.png")}/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Delhi/Kanjhwala.png" className="kanjhwala" alt="Kanjhwala" onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Kanjhwala_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Kanjhwala.png")}/>
					</div>
					<div className="nor"> 
						<img src="/Maps/Delhi/North_Narela.png" className="northNarela" alt="North_Narela" onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/North_Narela_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/North_Narela.png")}/>
					</div>
					<div className="nor"> 
						<img src="/Maps/Delhi/North_East_Seelampur.png" className="northEastSeelampur" alt="North_East_Seelampur" onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/North_East_Seelampur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/North_East_Seelampur.png")}/>
					</div>
					
				</div>
			</div>
		);
	}
}