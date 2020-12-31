import React, {Component} from 'react';
import Axios 				from 'axios';
import Swal 				from 'sweetalert2';

import './Uttarakhand.css';
import '../global.css';


export default class Uttarakhand extends Component{
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
		console.log("Uttarakhand...............................");
		return(
			<div className="bodyWrapper">
				<div className="stateWrapper">

					<div className="uttarkashi classHover"> 
						<img src="/Maps/Uttarakhand/Uttarkashi.png" alt="Uttarkashi" onMouseOver={e => (e.currentTarget.src = "/Maps/Uttarakhand/Uttarkashi_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Uttarakhand/Uttarkashi.png")}/>
						<span className="uttarkashiText mapTextLabel text-capitalize">Uttarkashi</span>
						<span className="uttarkashiNumber mapCountLabel text-center">{this.search('uttarkashi')}</span>
					</div>

					<div className="dehradun classHover"> 
						<img src="/Maps/Uttarakhand/Dehradun.png" alt="Dehradun" onMouseOver={e => (e.currentTarget.src = "/Maps/Uttarakhand/Dehradun_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Uttarakhand/Dehradun.png")}/>
						<span className="dehradunText mapTextLabel text-capitalize">Dehradun</span>
						<span className="dehradunNumber mapCountLabel text-center">{this.search('dehradun')}</span>
					</div>

					<div className="haridwar classHover"> 
						<img src="/Maps/Uttarakhand/Haridwar.png" alt="Haridwar" onMouseOver={e => (e.currentTarget.src = "/Maps/Uttarakhand/Haridwar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Uttarakhand/Haridwar.png")}/>
						<span className="haridwarText mapTextLabel text-capitalize">Haridwar</span>
						<span className="haridwarNumber mapCountLabel text-center">{this.search('haridwar')}</span>
					</div>

					<div className="tehri_garhwal classHover"> 
						<img src="/Maps/Uttarakhand/Tehri_Garhwal.png" alt="Tehri_Garhwal" onMouseOver={e => (e.currentTarget.src = "/Maps/Uttarakhand/Tehri_Garhwal_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Uttarakhand/Tehri_Garhwal.png")}/>
						<span className="tehri_garhwalText mapTextLabel text-capitalize">Tehri Garhwal</span>
						<span className="tehri_garhwalNumber mapCountLabel text-center">{this.search('tehri garhwal')}</span>
					</div>

					<div className="rudraprayag classHover"> 
						<img src="/Maps/Uttarakhand/Rudraprayag.png" alt="Rudraprayag" onMouseOver={e => (e.currentTarget.src = "/Maps/Uttarakhand/Rudraprayag_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Uttarakhand/Rudraprayag.png")}/>
						<span className="rudraprayagText mapTextLabel text-capitalize">Rudra Prayag</span>
						<span className="rudraprayagNumber mapCountLabel text-center">{this.search('rudra prayag')}</span>
					</div>

					<div className="chamoli classHover"> 
						<img src="/Maps/Uttarakhand/Chamoli.png" alt="Chamoli" onMouseOver={e => (e.currentTarget.src = "/Maps/Uttarakhand/Chamoli_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Uttarakhand/Chamoli.png")}/>
						<span className="chamoliText mapTextLabel text-capitalize">Chamoli</span>
						<span className="chamoliNumber mapCountLabel text-center">{this.search('chamoli')}</span>
					</div>

					<div className="pithoragarh classHover"> 
						<img src="/Maps/Uttarakhand/Pithoragarh.png" alt="Pithoragarh" onMouseOver={e => (e.currentTarget.src = "/Maps/Uttarakhand/Pithoragarh_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Uttarakhand/Pithoragarh.png")}/>
						<span className="pithoragarhText mapTextLabel text-capitalize">Pithoragarh</span>
						<span className="pithoragarhNumber mapCountLabel text-center">{this.search('pithoragarh')}</span>
					</div>

					<div className="bageshwar classHover"> 
						<img src="/Maps/Uttarakhand/Bageshwar.png" alt="Bageshwar" onMouseOver={e => (e.currentTarget.src = "/Maps/Uttarakhand/Bageshwar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Uttarakhand/Bageshwar.png")}/>
						<span className="bageshwarText mapTextLabel text-capitalize">Bageshwar</span>
						<span className="bageshwarNumber mapCountLabel text-center">{this.search('bageshwar')}</span>
					</div>


					<div className="pauri_garhwal classHover"> 
						<img src="/Maps/Uttarakhand/Pauri_Garhwal.png" alt="Pauri_Garhwal" onMouseOver={e => (e.currentTarget.src = "/Maps/Uttarakhand/Pauri_Garhwal_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Uttarakhand/Pauri_Garhwal.png")}/>
						<span className="pauri_garhwalText mapTextLabel text-capitalize">Pauri Garhwal</span>
						<span className="pauri_garhwalNumber mapCountLabel text-center">{this.search('pauri garhwal')}</span>
					</div>

					<div className="almora classHover"> 
						<img src="/Maps/Uttarakhand/Almora.png" alt="Almora" onMouseOver={e => (e.currentTarget.src = "/Maps/Uttarakhand/Almora_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Uttarakhand/Almora.png")}/>
						<span className="almoraText mapTextLabel text-capitalize">Almora</span>
						<span className="almoraNumber mapCountLabel text-center">{this.search('almora')}</span>
					</div>

					<div className="nainital classHover"> 
						<img src="/Maps/Uttarakhand/Nainital.png" alt="Nainital" onMouseOver={e => (e.currentTarget.src = "/Maps/Uttarakhand/Nainital_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Uttarakhand/Nainital.png")}/>
						<span className="nainitalText mapTextLabel text-capitalize">Nainital</span>
						<span className="nainitalNumber mapCountLabel text-center">{this.search('nainital')}</span>
					</div>

					<div className="champawat classHover"> 
						<img src="/Maps/Uttarakhand/Champawat.png" alt="Champawat" onMouseOver={e => (e.currentTarget.src = "/Maps/Uttarakhand/Champawat_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Uttarakhand/Champawat.png")}/>
						<span className="champawatText mapTextLabel text-capitalize">Champawat</span>
						<span className="champawatNumber mapCountLabel text-center">{this.search('champawat')}</span>
					</div>

					<div className="udham_singh_nagar classHover"> 
						<img src="/Maps/Uttarakhand/Udham_Singh_Nagar.png" alt="Udham_Singh_Nagar" onMouseOver={e => (e.currentTarget.src = "/Maps/Uttarakhand/Udham_Singh_Nagar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Uttarakhand/Udham_Singh_Nagar.png")}/>
						<span className="udham_singh_nagarText mapTextLabel text-capitalize">Udham Singh Nagar</span>
						<span className="udham_singh_nagarNumber mapCountLabel text-center">{this.search('udham singh nagar')}</span>
					</div>

				</div>
			</div>
		);
	}
}