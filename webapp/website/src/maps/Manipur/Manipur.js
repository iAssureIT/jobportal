import React, {Component} from 'react';

import './Manipur.css';
import '../global.css';


export default class Manipur extends Component{

	render(){
		return(
			<div className="bodyWrapper">
				<div className="stateWrapper">
					<div className="kas"> 
						<img src="/Maps/Manipur/Pherzawl.png" className="pherzawl" alt="Pherzawl" onMouseOver={e => (e.currentTarget.src = "/Maps/Manipur/Pherzawl_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Manipur/Pherzawl.png")}/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Manipur/Churachandpur.png" className="churachandpur" alt="Churachandpur"  onMouseOver={e => (e.currentTarget.src = "/Maps/Manipur/Churachandpur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Manipur/Churachandpur.png")}/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Manipur/Chandel.png" className="chandel" alt="Chandel"  onMouseOver={e => (e.currentTarget.src = "/Maps/Manipur/Chandel_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Manipur/Chandel.png")}/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Manipur/Tengnoupal.png" className="tengnoupal" alt="Tengnoupal"  onMouseOver={e => (e.currentTarget.src = "/Maps/Manipur/Tengnoupal_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Manipur/Tengnoupal.png")}/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Manipur/Kakching.png" className="kakching" alt="Kakching"  onMouseOver={e => (e.currentTarget.src = "/Maps/Manipur/Kakching_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Manipur/Kakching.png")}/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Manipur/Bishnupur.png" className="bishnupur" alt="Bishnupur"  onMouseOver={e => (e.currentTarget.src = "/Maps/Manipur/Bishnupur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Manipur/Bishnupur.png")}/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Manipur/Noney.png" className="noney" alt="Noney"  onMouseOver={e => (e.currentTarget.src = "/Maps/Manipur/Noney_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Manipur/Noney.png")}/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Manipur/Tamenglong.png" className="tamenglong" alt="Tamenglong"  onMouseOver={e => (e.currentTarget.src = "/Maps/Manipur/Tamenglong.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Manipur/Tamenglong_.png")}/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Manipur/Senapati.png" className="senapati" alt="Senapati"  onMouseOver={e => (e.currentTarget.src = "/Maps/Manipur/Senapati_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Manipur/Senapati.png")}/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Manipur/Ukhrul.png" className="ukhrul" alt="Ukhrul"  onMouseOver={e => (e.currentTarget.src = "/Maps/Manipur/Ukhrul_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Manipur/Ukhrul.png")}/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Manipur/Kangpokpi.png" className="kangpokpi" alt="Kangpokpi"  onMouseOver={e => (e.currentTarget.src = "/Maps/Manipur/Kangpokpi_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Manipur/Kangpokpi.png")}/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Manipur/Porompat.png" className="porompat" alt="Porompat"  onMouseOver={e => (e.currentTarget.src = "/Maps/Manipur/Porompat_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Manipur/Porompat.png")}/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Manipur/Imphal_West.png" className="imphalWest" alt="Imphal_West"  onMouseOver={e => (e.currentTarget.src = "/Maps/Manipur/Imphal_West_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Manipur/Imphal_West.png")}/>
					</div>
				</div>
			</div>
		);
	}
}