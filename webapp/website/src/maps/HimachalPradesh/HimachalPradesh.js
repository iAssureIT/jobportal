import React, {Component} from 'react';

import './HimachalPradesh.css';
import '../global.css';


export default class HimachalPradesh extends Component{

	render(){
		return(
			<div className="bodyWrapper">
				<div className="stateWrapper">
					<div className="kan"> 
						<img src="/Maps/Himachal_Pradesh/Kangra.png" className="kangra" alt="Kangra" onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Kangra_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Kangra.png")}/>
					</div>
					<div className="cha"> 
						<img src="/Maps/Himachal_Pradesh/Chamba.png" className="chamba" alt="Chamba" onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Chamba_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Chamba.png")}/>
					</div>
					<div className="key"> 
						<img src="/Maps/Himachal_Pradesh/Keylong.png" className="keylong" alt="Keylong" onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Keylong_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Keylong.png")}/>
					</div>
					<div className="kul"> 
						<img src="/Maps/Himachal_Pradesh/Kullu.png" className="kullu" alt="Kullu" onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Kullu_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Kullu.png")}/>
					</div>
					<div className="man"> 
						<img src="/Maps/Himachal_Pradesh/Mandi.png" className="mandi" alt="Mandi" onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Mandi_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Mandi.png")}/>
					</div>
					<div className="ham"> 
						<img src="/Maps/Himachal_Pradesh/Hamirpur.png" className="hamirpur" alt="Hamirpur" onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Hamirpur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Hamirpur.png")}/>
					</div>
					<div className="una"> 
						<img src="/Maps/Himachal_Pradesh/UNA.png" className="una" alt="UNA" onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/UNA_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/UNA.png")}/>
					</div>
					<div className="bal"> 
						<img src="/Maps/Himachal_Pradesh/Balspur.png" className="balspur" alt="Balspur" onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Balspur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Balspur.png")}/>
					</div>
					<div className="sol"> 
						<img src="/Maps/Himachal_Pradesh/Solan.png" className="solan" alt="Solan" onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Solan_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Solan.png")}/>
					</div>
					<div className="shi"> 
						<img src="/Maps/Himachal_Pradesh/Shimla.png" className="shimla" alt="Shimla" onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Shimla_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Shimla.png")}/>
					</div>
					<div className="kin"> 
						<img src="/Maps/Himachal_Pradesh/Kinnaur.png" className="kinnaur" alt="Kinnaur" onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Kinnaur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Kinnaur.png")}/>
					</div>
					<div className="sir"> 
						<img src="/Maps/Himachal_Pradesh/Sirmaur.png" className="sirmaur" alt="Sirmaur" onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Sirmaur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Sirmaur.png")}/>
					</div>

				</div>
			</div>
		);
	}
}