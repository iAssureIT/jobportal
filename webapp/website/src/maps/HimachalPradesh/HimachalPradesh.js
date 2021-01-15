import React, {Component} from 'react';

import './HimachalPradesh.css';
import '../global.css';


export default class HimachalPradesh extends Component{

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
					<div className="kangra classHover"> 
						<img src="/Maps/Himachal_Pradesh/Kangra.png"  alt="Kangra" onMouseOver={e => (e.currentTarget.src = "/Maps/Himachal_Pradesh/Kangra_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Himachal_Pradesh/Kangra.png")}/>
						<span className="kangraText mapTextLabel text-capitalize">Kangra</span>
						<span className="kangraNumber mapCountLabel text-center">{this.search('kangra')}</span>

					</div>
					<div className="chamba"> 
						<img src="/Maps/Himachal_Pradesh/Chamba.png" alt="Chamba" onMouseOver={e => (e.currentTarget.src = "/Maps/Himachal_Pradesh/Chamba_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Himachal_Pradesh/Chamba.png")}/>
						<span className="chambaText mapTextLabel text-capitalize">Chamba</span>
						<span className="chambaNumber mapCountLabel text-center">{this.search('chamba')}</span>
					</div>
					<div className="keylong classHover"> 
						<img src="/Maps/Himachal_Pradesh/Keylong.png" alt="Keylong" onMouseOver={e => (e.currentTarget.src = "/Maps/Himachal_Pradesh/Keylong_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Himachal_Pradesh/Keylong.png")}/>
						<span className="keylongText mapTextLabel text-capitalize">Keylong</span>
						<span className="keylongNumber mapCountLabel text-center">{this.search('keylong')}</span>
					</div>
					<div className="kullu classHover"> 
						<img src="/Maps/Himachal_Pradesh/Kullu.png" alt="Kullu" onMouseOver={e => (e.currentTarget.src = "/Maps/Himachal_Pradesh/Kullu_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Himachal_Pradesh/Kullu.png")}/>
						<span className="kulluText mapTextLabel text-capitalize">Kullu</span>
						<span className="kulluNumber mapCountLabel text-center">{this.search('kullu')}</span>
					</div>
					<div className="mandi classHover"> 
						<img src="/Maps/Himachal_Pradesh/Mandi.png" alt="Mandi" onMouseOver={e => (e.currentTarget.src = "/Maps/Himachal_Pradesh/Mandi_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Himachal_Pradesh/Mandi.png")}/>
						<span className="mandiText mapTextLabel text-capitalize">Mandi</span>
						<span className="mandiNumber mapCountLabel text-center">{this.search('mandi')}</span>
					</div>
					<div className="Hamirpur classHover"> 
						<img src="/Maps/Himachal_Pradesh/Hamirpur.png" alt="Hamirpur" onMouseOver={e => (e.currentTarget.src = "/Maps/Himachal_Pradesh/Hamirpur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Himachal_Pradesh/Hamirpur.png")}/>
						<span className="HamirpurText mapTextLabel text-capitalize">Hamirpur</span>
						<span className="HamirpurNumber mapCountLabel text-center">{this.search('hamirpur')}</span>
					</div>
					<div className="una classHover"> 
						<img src="/Maps/Himachal_Pradesh/UNA.png" alt="UNA" onMouseOver={e => (e.currentTarget.src = "/Maps/Himachal_Pradesh/UNA_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Himachal_Pradesh/UNA.png")}/>
						<span className="unaText mapTextLabel text-capitalize">Una</span>
						<span className="unaNumber mapCountLabel text-center">{this.search('una')}</span>
					</div>
					<div className="Bilaspur classHover"> 
						<img src="/Maps/Himachal_Pradesh/Bilaspur.png" alt="Bilaspur" onMouseOver={e => (e.currentTarget.src = "/Maps/Himachal_Pradesh/Bilaspur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Himachal_Pradesh/Bilaspur.png")}/>
						<span className="BilaspurText mapTextLabel text-capitalize">Bilaspur</span>
						<span className="BilaspurNumber mapCountLabel text-center">{this.search('bilaspur')}</span>
					</div>
					<div className="solan classHover"> 
						<img src="/Maps/Himachal_Pradesh/Solan.png" alt="Solan" onMouseOver={e => (e.currentTarget.src = "/Maps/Himachal_Pradesh/Solan_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Himachal_Pradesh/Solan.png")}/>
						<span className="solanText mapTextLabel text-capitalize">Solan</span>
						<span className="solanNumber mapCountLabel text-center">{this.search('solan')}</span>
					</div>
					<div className="shimla classHover"> 
						<img src="/Maps/Himachal_Pradesh/Shimla.png" alt="Shimla" onMouseOver={e => (e.currentTarget.src = "/Maps/Himachal_Pradesh/Shimla_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Himachal_Pradesh/Shimla.png")}/>
						<span className="shimlaText mapTextLabel text-capitalize">Shimla</span>
						<span className="shimlaNumber mapCountLabel text-center">{this.search('shimla')}</span>
					</div>
					<div className="kinnaur classHover"> 
						<img src="/Maps/Himachal_Pradesh/Kinnaur.png" alt="Kinnaur" onMouseOver={e => (e.currentTarget.src = "/Maps/Himachal_Pradesh/Kinnaur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Himachal_Pradesh/Kinnaur.png")}/>
						<span className="kinnaurText mapTextLabel text-capitalize">Kinnaur</span>
						<span className="kinnaurNumber mapCountLabel text-center">{this.search('kinnaur')}</span>
					</div>
					<div className="sirmaur classHover"> 
						<img src="/Maps/Himachal_Pradesh/Sirmaur.png"  alt="Sirmaur" onMouseOver={e => (e.currentTarget.src = "/Maps/Himachal_Pradesh/Sirmaur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Himachal_Pradesh/Sirmaur.png")}/>
						<span className="sirmaurText mapTextLabel text-capitalize">Sirmaur</span>
						<span className="sirmaurNumber mapCountLabel text-center">{this.search('sirmaur')}</span>
					</div>

				</div>
			</div>
		);
	}
}