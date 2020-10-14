import React, {Component} from 'react';

import './Nagaland.css';
import '../global.css';


export default class Nagaland extends Component{

	render(){
		return(
			<div className="bodyWrapper">
				<div className="stateWrapper">
					<div className="kas"> 
						<img src="/Maps/Nagaland/Peren.png" className="peren" alt="Peren" onMouseOver={e => (e.currentTarget.src = "/Maps/Nagaland/Peren_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Nagaland/Peren.png")}/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Nagaland/Dimapur.png" className="dimapur" alt="Dimapur"  onMouseOver={e => (e.currentTarget.src = "/Maps/Nagaland/Dimapur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Nagaland/Dimapur.png")}/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Nagaland/Kohima.png" className="kohima" alt="Kohima"  onMouseOver={e => (e.currentTarget.src = "/Maps/Nagaland/Kohima_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Nagaland/Kohima.png")}/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Nagaland/Phek.png" className="phek" alt="Phek"  onMouseOver={e => (e.currentTarget.src = "/Maps/Nagaland/Phek_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Nagaland/Phek.png")}/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Nagaland/Kiphire_Sadar.png" className="kiphireSadar" alt="Kiphire_Sadar"  onMouseOver={e => (e.currentTarget.src = "/Maps/Nagaland/Kiphire_Sadar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Nagaland/Kiphire_Sadar.png")}/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Nagaland/Zunheboto_Sadar.png" className="zunhebotoSadar" alt="Zunheboto_Sadar"  onMouseOver={e => (e.currentTarget.src = "/Maps/Nagaland/Zunheboto_Sadar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Nagaland/Zunheboto_Sadar.png")}/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Nagaland/Wokha_Sadar.png" className="wokhaSadar" alt="Wokha_Sadar"  onMouseOver={e => (e.currentTarget.src = "/Maps/Nagaland/Wokha_Sadar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Nagaland/Wokha_Sadar.png")}/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Nagaland/Tuensang_Sadar.png" className="tuensangSadar" alt="Tuensang_Sadar"  onMouseOver={e => (e.currentTarget.src = "/Maps/Nagaland/Tuensang_Sadar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Nagaland/Tuensang_Sadar.png")}/>
					</div>
					<div className="kas"> 
						<img src="/Maps/Nagaland/Mokochung.png" className="mokochung" alt="Mokochung" onMouseOver={e => (e.currentTarget.src = "/Maps/Nagaland/Mokochung_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Nagaland/Mokochung.png")}/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Nagaland/Longleng.png" className="longleng" alt="Longleng"  onMouseOver={e => (e.currentTarget.src = "/Maps/Nagaland/Longleng_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Nagaland/Longleng.png")}/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Nagaland/Mon.png" className="mon" alt="Mon"  onMouseOver={e => (e.currentTarget.src = "/Maps/Nagaland/Mon_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Nagaland/Mon.png")}/>
					</div>					
				</div>
			</div>
		);
	}
}