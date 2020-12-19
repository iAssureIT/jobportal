import React, {Component} from 'react';

import './JammuKashmirLadakh.css';
import '../global.css';


export default class JammuKashmirLadakh extends Component{


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
					<div className="jammuAndKashmir classHover"> 
						<img src="/Maps/Jammu_Kashmir___Ladakh/Jammu_And_Kashmir.png" alt="Jammu_And_Kashmir" onMouseOver={e => (e.currentTarget.src = "/Maps/Jammu_Kashmir___Ladakh/Jammu_And_Kashmir_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Jammu_Kashmir___Ladakh/Jammu_And_Kashmir.png")}/>
						<span className="jammuAndKashmirText mapTextLabel text-capitalize">Jammu And Kashmir</span> <span className="jammuAndKashmirNumber mapCountLabel text-center">{this.search('jammuAndKashmir')}</span>
					</div>

					<div className="ladakh classHover"> 
						<img src="/Maps/Jammu_Kashmir___Ladakh/Ladakh.png"  alt="Ladakh" onMouseOver={e => (e.currentTarget.src = "/Maps/Jammu_Kashmir___Ladakh/Ladakh_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Jammu_Kashmir___Ladakh/Ladakh.png")}/>
						<span className="ladakhText mapTextLabel text-capitalize">Ladakh</span>
						<span className="ladakhNumber mapCountLabel text-center">{this.search('ladakh')}</span>
					</div>
					

				</div>
			</div>
		);
	}
}