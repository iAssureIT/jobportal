import React, {Component} from 'react';

import './Tripura.css';
import '../global.css';


export default class Goa extends Component{
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
				<div className="stateWrapper ">
					<div className="northTripura classHover"> 
						<img src="/Maps/Tripura/North_Tripura.png"  alt="North_Tripura" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tripura/North_Tripura_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tripura/North_Tripura.png")}/>
						<span className="northTripuraText mapTextLabel text-capitalize">North_Tripura</span>
						<span className="northTripuraNumber mapCountLabel text-center">{this.search('northTripura')}</span>
					</div>
					<div className="unakoti classHover"> 
						<img src="/Maps/Tripura/Unakoti.png"  alt="Unakoti" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tripura/Unakoti_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tripura/Unakoti.png")}/>
						<span className="unakotiText mapTextLabel text-capitalize">Unakoti</span>
						<span className="unakotiNumber mapCountLabel text-center">{this.search('unakoti')}</span>
					</div>
					<div className="dhalai classHover"> 
						<img src="/Maps/Tripura/Dhalai.png"  alt="Dhalai" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tripura/Dhalai_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tripura/Dhalai.png")}/>
						<span className="dhalaiText mapTextLabel text-capitalize">Dhalai</span>
						<span className="dhalaiNumber mapCountLabel text-center">{this.search('dhalai')}</span>
					</div>
					<div className="khowai classHover"> 
						<img src="/Maps/Tripura/Khowai.png"  alt="Khowai" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tripura/Khowai_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tripura/Khowai.png")}/>
						<span className="khowaiText mapTextLabel text-capitalize">Khowai</span>
						<span className="khowaiNumber mapCountLabel text-center">{this.search('khowai')}</span>
					</div>
					<div className="westTripura classHover"> 
						<img src="/Maps/Tripura/West_Tripura.png"  alt="West_Tripura" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tripura/West_Tripura_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tripura/West_Tripura.png")}/>
						<span className="westTripuraText mapTextLabel text-capitalize">West_Tripura</span>
						<span className="westTripuraNumber mapCountLabel text-center">{this.search('westTripura')}</span>
					</div>
					<div className="gomati classHover"> 
						<img src="/Maps/Tripura/Gomati.png"  alt="Gomati" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tripura/Gomati_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tripura/Gomati.png")}/>
						<span className="gomatiText mapTextLabel text-capitalize">Gomati</span>
						<span className="gomatiNumber mapCountLabel text-center">{this.search('gomati')}</span>
					</div>
					<div className="sepahijala classHover"> 
						<img src="/Maps/Tripura/Sepahijala.png"  alt="Sepahijala" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tripura/Sepahijala_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tripura/Sepahijala.png")}/>
						<span className="sepahijalaText mapTextLabel text-capitalize">Sepahijala</span>
						<span className="sepahijalaNumber mapCountLabel text-center">{this.search('sepahijala')}</span>
					</div>
					<div className="southTripura classHover"> 
						<img src="/Maps/Tripura/South_Tripura.png"  alt="South_Tripura" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tripura/South_Tripura_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tripura/South_Tripura.png")}/>
						<span className="southTripuraText mapTextLabel text-capitalize">South_Tripura</span>
						<span className="southTripuraNumber mapCountLabel text-center">{this.search('southTripura')}</span>
					</div>
					
				</div>
				
			</div>
		);
	}
}