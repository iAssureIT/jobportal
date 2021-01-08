import React, {Component} from 'react';
import Axios 				from 'axios';
import Swal 				from 'sweetalert2';

import './Sikkim.css';
import '../global.css';


export default class Sikkim extends Component{
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
		console.log("Sikkim...............................");
		return(
			<div className="bodyWrapper">
				<div className="stateWrapper">

					<div className="north_sikkim classHover"> 
						<img src="/Maps/Sikkim/North_Sikkim.png" alt="North_Sikkim" onMouseOver={e => (e.currentTarget.src = "/Maps/Sikkim/North_Sikkim_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Sikkim/North_Sikkim.png")}/>
						<span className="north_sikkimText mapTextLabel text-capitalize">North Sikkim</span>
						<span className="north_sikkimNumber mapCountLabel text-center">{this.search('north sikkim')}</span>
					</div>

					<div className="west_sikkim classHover"> 
						<img src="/Maps/Sikkim/West_Sikkim.png" alt="West_Sikkim" onMouseOver={e => (e.currentTarget.src = "/Maps/Sikkim/West_Sikkim_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Sikkim/West_Sikkim.png")}/>
						<span className="west_sikkimText mapTextLabel text-capitalize">West Sikkim</span>
						<span className="west_sikkimNumber mapCountLabel text-center">{this.search('west sikkim')}</span>
					</div>


					<div className="east_sikkim classHover"> 
						<img src="/Maps/Sikkim/East_Sikkim.png" alt="East_Sikkim" onMouseOver={e => (e.currentTarget.src = "/Maps/Sikkim/East_Sikkim_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Sikkim/East_Sikkim.png")}/>
						<span className="east_sikkimText mapTextLabel text-capitalize">East Sikkim</span>
						<span className="east_sikkimNumber mapCountLabel text-center">{this.search('east sikkim')}</span>
					</div>

					<div className="south_sikkim classHover"> 
						<img src="/Maps/Sikkim/South_Sikkim.png" alt="South_Sikkim" onMouseOver={e => (e.currentTarget.src = "/Maps/Sikkim/South_Sikkim_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Sikkim/South_Sikkim.png")}/>
						<span className="south_sikkimText mapTextLabel text-capitalize">South Sikkim</span>
						<span className="south_sikkimNumber mapCountLabel text-center">{this.search('south sikkim')}</span>
					</div>




				</div>
			</div>
		);
	}
}