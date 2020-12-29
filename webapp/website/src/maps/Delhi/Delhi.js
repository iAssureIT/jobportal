import React, {Component} from 'react';

import './Delhi.css';
import '../global.css';


export default class Delhi extends Component{
constructor(props){
		super(props);

	}
	componentDidMount(){
		
	}
	search(nameKey){
		return 10;
	}
	onStateClick = (stateName) => {
		
	}
	render(){
		return(
			<div className="bodyWrapper">
				<div className="stateWrapper">
					<div className="dwarka classHover"> 
						<img src="/Maps/Delhi/Dwarka.png"  alt="Dwarka" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Delhi/Dwarka_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Delhi/Dwarka.png")}/>
						<span className="dwarkaText mapTextLabel text-capitalize">Dwarka</span>
						<span className="dwarkaNumber mapCountLabel text-center">{this.search('dwarka')}</span>
					</div>
					<div className="newDelhi classHover"> 
						<img src="/Maps/Delhi/NEW_Delhi.png" alt="NEW_Delhi" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Delhi/NEW_Delhi_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Delhi/NEW_Delhi.png")}/>
						<span className="newDelhiText mapTextLabel text-capitalize">NEW_Delhi</span>
						<span className="newDelhiNumber mapCountLabel text-center">{this.search('newDelhi')}</span>
					</div>
					<div className="saket classHover"> 
						<img src="/Maps/Delhi/Saket.png" alt="Saket"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Delhi/Saket_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Delhi/Saket.png")}/>
						<span className="saketText mapTextLabel text-capitalize">Saket</span>
						<span className="saketNumber mapCountLabel text-center">{this.search('saket')}</span>
					</div>
					<div className="defenceColony classHover"> 
						<img src="/Maps/Delhi/Defence_Colony.png" alt="Defence_Colony"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Delhi/Defence_Colony_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Delhi/Defence_Colony.png")}/>
						<span className="defenceColonyText mapTextLabel text-capitalize">Defence_Colony</span>
						<span className="defenceColonyNumber mapCountLabel text-center">{this.search('defenceColony')}</span>
					</div>
					<div className="preetVihar classHover"> 
						<img src="/Maps/Delhi/Preet_Vihar.png" alt="Preet_Vihar" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Delhi/Preet_Vihar_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Delhi/Preet_Vihar.png")}/>
						<span className="preetViharText mapTextLabel text-capitalize">Preet_Vihar</span>
						<span className="preetViharNumber mapCountLabel text-center">{this.search('preetVihar')}</span>
					</div>
					<div className="shahdara classHover"> 
						<img src="/Maps/Delhi/Shahdara.png" alt="Shahdara"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Delhi/Shahdara_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Delhi/Shahdara.png")}/>
						<span className="shahdaraText mapTextLabel text-capitalize">Shahdara</span>
						<span className="shahdaraNumber mapCountLabel text-center">{this.search('shahdara')}</span>
					</div>
					<div className="centralDaryaganj classHover"> 
						<img src="/Maps/Delhi/Central_Daryaganj.png" alt="Central_Daryaganj"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Delhi/Central_Daryaganj_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Delhi/Central_Daryaganj.png")}/>
						<span className="centralDaryaganjText mapTextLabel text-capitalize">Central_Daryaganj</span>
						<span className="centralDaryaganjNumber mapCountLabel text-center">{this.search('centralDaryaganj')}</span>
					</div>
					<div className="rajouriGarden classHover"> 
						<img src="/Maps/Delhi/Rajouri_Garden.png" alt="Rajouri_Garden"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Delhi/Rajouri_Garden_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Delhi/Rajouri_Garden.png")}/>
						<span className="rajouriGardenText mapTextLabel text-capitalize">Rajouri_Garden</span>
						<span className="rajouriGardenNumber mapCountLabel text-center">{this.search('rajouriGarden')}</span>
					</div>
					<div className="kanjhwala classHover"> 
						<img src="/Maps/Delhi/Kanjhwala.png" alt="Kanjhwala"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Delhi/Kanjhwala_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Delhi/Kanjhwala.png")}/>
						<span className="kanjhwalaText mapTextLabel text-capitalize">Kanjhwala</span>
						<span className="kanjhwalaNumber mapCountLabel text-center">{this.search('kanjhwala')}</span>
					</div>
					<div className="northNarela classHover"> 
						<img src="/Maps/Delhi/North_Narela.png" alt="North_Narela"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Delhi/North_Narela_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Delhi/North_Narela.png")}/>
						<span className="northNarelaText mapTextLabel text-capitalize">North_Narela</span>
						<span className="northNarelaNumber mapCountLabel text-center">{this.search('northNarela')}</span>
					</div>
					<div className="northEastSeelampur classHover"> 
						<img src="/Maps/Delhi/North_East_Seelampur.png"  alt="North_East_Seelampur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Delhi/North_East_Seelampur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Delhi/North_East_Seelampur.png")}/>
						<span className="northEastSeelampurText mapTextLabel text-capitalize">North_East_Seelampur</span>
						<span className="northEastSeelampurNumber mapCountLabel text-center">{this.search('northEastSeelampur')}</span>
					</div>
					
				</div>
			</div>
		);
	}
}