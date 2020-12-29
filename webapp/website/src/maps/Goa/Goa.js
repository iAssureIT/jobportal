import React, {Component} from 'react';

import './Goa.css';
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
				<div className="stateWrapper">
					<div className="pernem classHover"> 
						<img src="/Maps/Goa/Pernem.png"  alt="Pernem" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Goa/Pernem_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Goa/Pernem.png")}/>
						<span className="pernemText mapTextLabel text-capitalize">Pernem</span>
						<span className="pernemNumber mapCountLabel text-center">{this.search('pernem')}</span>
					</div>
					<div className="mapusa classHover"> 
						<img src="/Maps/Goa/Mapusa.png"  alt="Mapusa" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Goa/Mapusa_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Goa/Mapusa.png")}/>
						<span className="mapusaText mapTextLabel text-capitalize">Mapusa</span>
						<span className="mapusaNumber mapCountLabel text-center">{this.search('mapusa')}</span>
					</div>
					<div className="bicholim classHover"> 
						<img src="/Maps/Goa/Bicholim.png"  alt="Bicholim"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Goa/Bicholim_.png")}
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Goa/Bicholim.png")}/>
						<span className="bicholimText mapTextLabel text-capitalize">Bicholim</span>
						<span className="bicholimNumber mapCountLabel text-center">{this.search('bicholim')}</span>
					</div>
					<div className="satari classHover"> 
						<img src="/Maps/Goa/Satari.png"  alt="Satari"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Goa/Satari_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Goa/Satari.png")}/>
						<span className="satariText mapTextLabel text-capitalize">Satari</span>
						<span className="satariNumber mapCountLabel text-center">{this.search('satari')}</span>
					</div>
					<div className="ponda classHover"> 
						<img src="/Maps/Goa/Ponda.png"  alt="Ponda"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Goa/Ponda_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Goa/Ponda.png")}/>
						<span className="pondaText mapTextLabel text-capitalize">Ponda</span>
						<span className="pondaNumber mapCountLabel text-center">{this.search('ponda')}</span>
					</div>
					<div className="panjim classHover"> 
						<img src="/Maps/Goa/Panjim.png"  alt="Panjim" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Goa/Panjim_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Goa/Panjim.png")}/>
						<span className="panjimText mapTextLabel text-capitalize">Panjim</span>
						<span className="panjimNumber mapCountLabel text-center">{this.search('panjim')}</span>
					</div>
					<div className="sanguem classHover"> 
						<img src="/Maps/Goa/Sanguem.png"  alt="Sanguem"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Goa/Sanguem_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Goa/Sanguem.png")}/>
						<span className="sanguemText mapTextLabel text-capitalize">Sanguem</span>
						<span className="sanguemNumber mapCountLabel text-center">{this.search('sanguem')}</span>
					</div>
					<div className="quepem classHover"> 
						<img src="/Maps/Goa/Quepem.png"  alt="Quepem"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Goa/Quepem_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Goa/Quepem.png")}/>
						<span className="quepemText mapTextLabel text-capitalize">Quepem</span>
						<span className="quepemNumber mapCountLabel text-center">{this.search('quepem')}</span>
					</div>
					<div className="canacona classHover"> 
						<img src="/Maps/Goa/Canacona.png"  alt="Canacona"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Goa/Canacona_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Goa/Canacona.png")}/>
						<span className="canaconaText mapTextLabel text-capitalize">Canacona</span>
						<span className="canaconaNumber mapCountLabel text-center">{this.search('canacona')}</span>
					</div>
					<div className="salcette classHover"> 
						<img src="/Maps/Goa/Salcette.png"  alt="Salcette"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Goa/Salcette_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Goa/Salcette.png")}/>
						<span className="salcetteText mapTextLabel text-capitalize">Salcette</span>
						<span className="salcetteNumber mapCountLabel text-center">{this.search('salcette')}</span>
					</div>
					
				</div>
			</div>
		);
	}
}