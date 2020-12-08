import React, {Component} from 'react';

import './andhraPradesh.css';
import '../global.css';


export default class AndhraPradesh extends Component{

	render(){
		return(
			<div className="bodyWrapper">
				<div className="stateWrapper">
					<div className="kur classHover"> 
						<img src="/Maps/Andhra_Pradesh/Kurnool.png" className="kurnool" alt="Kurnool" onMouseOver={e => (e.currentTarget.src = "/Maps/Nagaland/Kurnooln_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Nagaland/Kurnool.png")}/>
					</div>
					<div className="ana classHover"> 
						<img src="/Maps/Andhra_Pradesh/Anantapur.png" className="anantapur" alt="Anantapur" onMouseOver={e => (e.currentTarget.src = "/Maps/Nagaland/Anantapur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Nagaland/Anantapur.png")}/>
					</div>
					<div className="ysr classHover"> 
						<img src="/Maps/Andhra_Pradesh/Y.S.R.png" className="ysr" alt="Y.S.R" onMouseOver={e => (e.currentTarget.src = "/Maps/Nagaland/Y.S.R_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Nagaland/Y.S.R.png")}/>
					</div>
					<div className="chi classHover"> 
						<img src="/Maps/Andhra_Pradesh/Chittoor.png" className="chittoor" alt="Chittoor" onMouseOver={e => (e.currentTarget.src = "/Maps/Nagaland/Chittoor_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Nagaland/Chittoor.png")}/>
					</div>
					<div className="nel classHover"> 
						<img src="/Maps/Andhra_Pradesh/Nellore.png" className="nellore" alt="Nellore" onMouseOver={e => (e.currentTarget.src = "/Maps/Nagaland/Nellore_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Nagaland/Nellore.png")}/>
					</div>
					<div className="pra classHover"> 
						<img src="/Maps/Andhra_Pradesh/Prakasam.png" className="prakasam" alt="Prakasam" onMouseOver={e => (e.currentTarget.src = "/Maps/Nagaland/Prakasam_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Nagaland/Prakasam.png")}/>
					</div>
					<div className="gun classHover"> 
						<img src="/Maps/Andhra_Pradesh/Guntur.png" className="guntur" alt="Guntur" onMouseOver={e => (e.currentTarget.src = "/Maps/Nagaland/Guntur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Nagaland/Guntur.png")}/>
					</div>
					<div className="kri classHover"> 
						<img src="/Maps/Andhra_Pradesh/Krishna.png" className="krishna" alt="Krishna" onMouseOver={e => (e.currentTarget.src = "/Maps/Nagaland/Krishna_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Nagaland/Krishna.png")}/>
					</div>
					<div className="wes classHover"> 
						<img src="/Maps/Andhra_Pradesh/West_Godawari.png" className="westGodawari" alt="West_Godawari" onMouseOver={e => (e.currentTarget.src = "/Maps/Nagaland/West_Godawari_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Nagaland/West_Godawari.png")}/>
					</div>
					<div className="eas classHover"> 
						<img src="/Maps/Andhra_Pradesh/East_Godawari.png" className="eastGodawari" alt="East_Godawari" onMouseOver={e => (e.currentTarget.src = "/Maps/Nagaland/East_Godawari_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Nagaland/East_Godawari.png")}/>
					</div>
					<div className="vis classHover"> 
						<img src="/Maps/Andhra_Pradesh/Vishakhapatnam.png" className="vishakhapatnam" alt="Vishakhapatnam" onMouseOver={e => (e.currentTarget.src = "/Maps/Nagaland/Vishakhapatnam_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Nagaland/Vishakhapatnam.png")}/>
					</div>
					<div className="viz classHover"> 
						<img src="/Maps/Andhra_Pradesh/Vizianagaram.png" className="vizianagaram" alt="Vizianagaram" onMouseOver={e => (e.currentTarget.src = "/Maps/Nagaland/Vizianagaram_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Nagaland/Vizianagaram.png")}/>
					</div>
					<div className="sri classHover"> 
						<img src="/Maps/Andhra_Pradesh/Srikakulam.png" className="srikakulam" alt="Srikakulam" onMouseOver={e => (e.currentTarget.src = "/Maps/Nagaland/Srikakulam_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Nagaland/Srikakulam.png")}/>
					</div>
					
				</div>
			</div>
		);
	}
}