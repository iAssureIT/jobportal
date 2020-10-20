import React, {Component} from 'react';

import './Meghalaya.css';
import '../global.css';


export default class Meghalaya extends Component{

	render(){
		return(
			<div className="bodyWrapper">
				<div className="stateWrapper">
					<div className="kas"> 
						<img src="/Maps/Meghalaya/South_West_Garo_Hills.png" className="southWestGaroHills" alt="South_West_Garo_Hills" onMouseOver={e => (e.currentTarget.src = "/Maps/Meghalaya/South_West_Garo_Hills_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Meghalaya/South_West_Garo_Hills.png")}/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Meghalaya/West_Garo_Hills.png" className="westGaroHills" alt="West_Garo_Hills"  onMouseOver={e => (e.currentTarget.src = "/Maps/Meghalaya/West_Garo_Hills_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Meghalaya/West_Garo_Hills.png")}/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Meghalaya/South_Garo_Hills.png" className="southGaroHills" alt="South_Garo_Hills"  onMouseOver={e => (e.currentTarget.src = "/Maps/Meghalaya/South_Garo_Hills_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Meghalaya/South_Garo_Hills.png")}/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Meghalaya/East_Garo_Hills.png" className="eastGaroHills" alt="East_Garo_Hills"  onMouseOver={e => (e.currentTarget.src = "/Maps/Meghalaya/East_Garo_Hills_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Meghalaya/East_Garo_Hills.png")}/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Meghalaya/North_Garo_Hills.png" className="northGaroHills" alt="North_Garo_Hills"  onMouseOver={e => (e.currentTarget.src = "/Maps/Meghalaya/North_Garo_Hills_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Meghalaya/North_Garo_Hills.png")}/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Meghalaya/West_Khasi_Hills.png" className="westKhasiHills" alt="West_Khasi_Hills"  onMouseOver={e => (e.currentTarget.src = "/Maps/Meghalaya/West_Khasi_Hills_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Meghalaya/West_Khasi_Hills.png")}/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Meghalaya/South_West_Khasi_Hills.png" className="southWestKhasiHills" alt="South_West_Khasi_Hills"  onMouseOver={e => (e.currentTarget.src = "/Maps/Meghalaya/South_West_Khasi_Hills_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Meghalaya/South_West_Khasi_Hills.png")}/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Meghalaya/East_Khasi_Hills.png" className="eastKhasiHills" alt="East_Khasi_Hills"  onMouseOver={e => (e.currentTarget.src = "/Maps/Meghalaya/East_Khasi_Hills_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Meghalaya/East_Khasi_Hills.png")}/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Meghalaya/Ri_Bhol.png" className="riBhol" alt="Ri_Bhol"  onMouseOver={e => (e.currentTarget.src = "/Maps/Meghalaya/Ri_Bhol_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Meghalaya/Ri_Bhol.png")}/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Meghalaya/West_Jaintia_Hills.png" className="westJaintiaHills" alt="West_Jaintia_Hills"  onMouseOver={e => (e.currentTarget.src = "/Maps/Meghalaya/West_Jaintia_Hills_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Meghalaya/West_Jaintia_Hills.png")}/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Meghalaya/East_Jaintia_Hills.png" className="eastJaintiaHills" alt="East_Jaintia_Hills"  onMouseOver={e => (e.currentTarget.src = "/Maps/Meghalaya/East_Jaintia_Hills_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Meghalaya/East_Jaintia_Hills.png")}/>
					</div>
					
				</div>
			</div>
		);
	}
}