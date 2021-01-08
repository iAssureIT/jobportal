import React, {Component} from 'react';

import './Ladakh.css';
import '../global.css';


export default class Ladakh extends Component{


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
					<div className="Ladakh classHover"> 
						<img src="/Maps/Jammu_Kashmir___Ladakh/Ladakh.png" alt="Ladakh" onMouseOver={e => (e.currentTarget.src = "/Maps/Jammu_Kashmir___Ladakh/Ladakh_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Jammu_Kashmir___Ladakh/Ladakh.png")}/>
						<span className="LadakhText mapTextLabel text-capitalize">Ladakh</span> 
						<span className="LadakhNumber mapCountLabel text-center">{this.search('ladakh')}</span>
					</div>

					

				</div>
			</div>
		);
	}
}