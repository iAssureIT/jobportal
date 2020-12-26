import React, {Component} from 'react';

import './Manipur.css';
import '../global.css';


export default class Manipur extends Component{
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
					<div className="pherzawl classHover"> 
						<img src="/Maps/Manipur/Pherzawl.png"  alt="Pherzawl" onMouseOver={e => (e.currentTarget.src = "/Maps/Manipur/Pherzawl_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Manipur/Pherzawl.png")}/>
						<span className="pherzawlText mapTextLabel text-capitalize">Pherzawl</span>
						<span className="pherzawlNumber mapCountLabel text-center">{this.search('pherzawl')}</span>
					</div>
					<div className="churachandpur classHover"> 
						<img src="/Maps/Manipur/Churachandpur.png" alt="Churachandpur"  onMouseOver={e => (e.currentTarget.src = "/Maps/Manipur/Churachandpur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Manipur/Churachandpur.png")}/>
						<span className="churachandpurText mapTextLabel text-capitalize">Churachandpur</span>
						<span className="churachandpurNumber mapCountLabel text-center">{this.search('churachandpur')}</span>
					</div>
					<div className="chandel classHover"> 
						<img src="/Maps/Manipur/Chandel.png"  alt="Chandel"  onMouseOver={e => (e.currentTarget.src = "/Maps/Manipur/Chandel_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Manipur/Chandel.png")}/>
						<span className="chandelText mapTextLabel text-capitalize">Chandel</span>
						<span className="chandelNumber mapCountLabel text-center">{this.search('chandel')}</span>
					</div>
					<div className="tengnoupal classHover"> 
						<img src="/Maps/Manipur/Tengnoupal.png" alt="Tengnoupal"  onMouseOver={e => (e.currentTarget.src = "/Maps/Manipur/Tengnoupal_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Manipur/Tengnoupal.png")}/>
						<span className="tengnoupalText mapTextLabel text-capitalize">Tengnoupal</span>
						<span className="tengnoupalNumber mapCountLabel text-center">{this.search('tengnoupal')}</span>
					</div>
					<div className="kakching classHover"> 
						<img src="/Maps/Manipur/Kakching.png" alt="Kakching"  onMouseOver={e => (e.currentTarget.src = "/Maps/Manipur/Kakching_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Manipur/Kakching.png")}/>
						<span className="kakchingText mapTextLabel text-capitalize">Kakching</span>
						<span className="kakchingNumber mapCountLabel text-center">{this.search('kakching')}</span>
					</div>
					<div className="bishnupur classHover"> 
						<img src="/Maps/Manipur/Bishnupur.png" alt="Bishnupur"  onMouseOver={e => (e.currentTarget.src = "/Maps/Manipur/Bishnupur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Manipur/Bishnupur.png")}/>
						<span className="bishnupurText mapTextLabel text-capitalize">Bishnupur</span>
						<span className="bishnupurNumber mapCountLabel text-center">{this.search('bishnupur')}</span>
					</div>
					<div className="noney classHover"> 
						<img src="/Maps/Manipur/Noney.png" alt="Noney"  onMouseOver={e => (e.currentTarget.src = "/Maps/Manipur/Noney_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Manipur/Noney.png")}/>
						<span className="noneyText mapTextLabel text-capitalize">Noney</span>
						<span className="noneyNumber mapCountLabel text-center">{this.search('noney')}</span>
					</div>
					<div className="tamenglong classHover"> 
						<img src="/Maps/Manipur/Tamenglong.png" alt="Tamenglong"  onMouseOver={e => (e.currentTarget.src = "/Maps/Manipur/Tamenglong_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Manipur/Tamenglong.png")}/>
						<span className="tamenglongText mapTextLabel text-capitalize">Tamenglong</span>
						<span className="tamenglongNumber mapCountLabel text-center">{this.search('tamenglong')}</span>
					</div>
					<div className="senapati classHover"> 
						<img src="/Maps/Manipur/Senapati.png" alt="Senapati"  onMouseOver={e => (e.currentTarget.src = "/Maps/Manipur/Senapati_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Manipur/Senapati.png")}/>
						<span className="senapatiText mapTextLabel text-capitalize">Senapati</span>
						<span className="senapatiNumber mapCountLabel text-center">{this.search('senapati')}</span>
					</div>
					<div className="ukhrul classHover"> 
						<img src="/Maps/Manipur/Ukhrul.png" alt="Ukhrul"  onMouseOver={e => (e.currentTarget.src = "/Maps/Manipur/Ukhrul_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Manipur/Ukhrul.png")}/>
						<span className="ukhrulText mapTextLabel text-capitalize">Ukhrul</span>
						<span className="ukhrulNumber mapCountLabel text-center">{this.search('ukhrul')}</span>
					</div>
					<div className="kangpokpi classHover"> 
						<img src="/Maps/Manipur/Kangpokpi.png" alt="Kangpokpi"  onMouseOver={e => (e.currentTarget.src = "/Maps/Manipur/Kangpokpi_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Manipur/Kangpokpi.png")}/>
						<span className="kangpokpiText mapTextLabel text-capitalize">Kangpokpi</span>
						<span className="kangpokpiNumber mapCountLabel text-center">{this.search('kangpokpi')}</span>
					</div>
					<div className="porompat classHover"> 
						<img src="/Maps/Manipur/Porompat.png"  alt="Porompat"  onMouseOver={e => (e.currentTarget.src = "/Maps/Manipur/Porompat_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Manipur/Porompat.png")}/>
						<span className="porompatText mapTextLabel text-capitalize">Porompat</span>
						<span className="porompatNumber mapCountLabel text-center">{this.search('porompat')}</span>
					</div>
					<div className="imphalWest classHover"> 
						<img src="/Maps/Manipur/Imphal_West.png"  alt="Imphal_West"  onMouseOver={e => (e.currentTarget.src = "/Maps/Manipur/Imphal_West_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Manipur/Imphal_West.png")}/>
						<span className="imphalWestText mapTextLabel text-capitalize">Imphal_West</span>
						<span className="imphalWestNumber mapCountLabel text-center">{this.search('imphalWest')}</span>
					</div>
				</div>
			</div>
		);
	}
}