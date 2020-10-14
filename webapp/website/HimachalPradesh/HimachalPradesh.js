import React, {Component} from 'react';

import './HimachalPradesh.css';
import '../global.css';


export default class HimachalPradesh extends Component{

	render(){
		return(
			<div className="bodyWrapper">
				<div className="stateWrapper">
					<div className="kan"> 
						<img src="/Maps/Himachal_Pradesh/Kangra.png" className="kangra" alt="Kangra"/>
					</div>
					<div className="cha"> 
						<img src="/Maps/Himachal_Pradesh/Chamba.png" className="chamba" alt="Chamba"/>
					</div>
					<div className="key"> 
						<img src="/Maps/Himachal_Pradesh/Keylong.png" className="keylong" alt="Keylong"/>
					</div>
					<div className="kul"> 
						<img src="/Maps/Himachal_Pradesh/Kullu.png" className="kullu" alt="Kullu"/>
					</div>
					<div className="man"> 
						<img src="/Maps/Himachal_Pradesh/Mandi.png" className="mandi" alt="Mandi"/>
					</div>
					<div className="ham"> 
						<img src="/Maps/Himachal_Pradesh/Hamirpur.png" className="hamirpur" alt="Hamirpur"/>
					</div>
					<div className="una"> 
						<img src="/Maps/Himachal_Pradesh/UNA.png" className="una" alt="UNA"/>
					</div>
					<div className="bal"> 
						<img src="/Maps/Himachal_Pradesh/Balspur.png" className="balspur" alt="Balspur"/>
					</div>
					<div className="sol"> 
						<img src="/Maps/Himachal_Pradesh/Solan.png" className="solan" alt="Solan"/>
					</div>
					<div className="shi"> 
						<img src="/Maps/Himachal_Pradesh/Shimla.png" className="shimla" alt="Shimla"/>
					</div>
					<div className="kin"> 
						<img src="/Maps/Himachal_Pradesh/Kinnaur.png" className="kinnaur" alt="Kinnaur"/>
					</div>
					<div className="sir"> 
						<img src="/Maps/Himachal_Pradesh/Sirmaur.png" className="sirmaur" alt="Sirmaur"/>
					</div>

				</div>
			</div>
		);
	}
}