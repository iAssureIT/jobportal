import React, {Component} from 'react';

import './Kerala.css';
import '../global.css';


export default class Kerala extends Component{

	render(){
		return(
			<div className="bodyWrapper">
				<div className="stateWrapper">
					<div className="kas"> 
						<img src="/Maps/Kerala/Kasaragod.png" className="kasaragod" alt="Kasaragod" onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Kasaragod_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Kasaragod.png")}/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Kerala/Kannur.png" className="kannur" alt="Kannur"  onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Kannur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Kannur.png")}/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Kerala/Wayand.png" className="wayand" alt="Wayand"  onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Wayand_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Wayand.png")}/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Kerala/Kozhikode.png" className="kozhikode" alt="Kozhikode"  onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Kozhikode_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Kozhikode.png")}/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Kerala/Malappuram.png" className="malappuram" alt="Malappuram"  onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Malappuram_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Malappuram.png")}/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Kerala/Palakkad.png" className="palakkad" alt="Palakkad"  onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Palakkad_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Palakkad.png")}/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Kerala/Thrissur.png" className="thrissur" alt="Thrissur"  onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Thrissur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Thrissur.png")}/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Kerala/Ernakulam.png" className="ernakulam" alt="Ernakulam"  onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Ernakulam_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Ernakulam.png")}/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Kerala/Idukki.png" className="idukki" alt="Idukki"  onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Idukki_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Idukki.png")}/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Kerala/Kottayam.png" className="kottayam" alt="Kottayam"  onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Kottayam_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Kottayam.png")}/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Kerala/Alappuzha.png" className="alappuzha" alt="Alappuzha"  onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Alappuzha_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Alappuzha.png")}/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Kerala/Kollam.png" className="kollam" alt="Kollam"  onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Kollam_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Kollam.png")}/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Kerala/Thiruvanthapuram.png" className="thiruvanthapuram" alt="Thiruvanthapuram"  onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Thiruvanthapuram_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Thiruvanthapuram.png")}/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Kerala/Pathanamthitta.png" className="pathanamthitta" alt="Pathanamthitta"  onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Pathanamthitta_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Pathanamthitta.png")}/>
					</div>
				</div>
			</div>
		);
	}
}