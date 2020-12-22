import React, {Component} from 'react';
import Axios 				from 'axios';
import Swal 				from 'sweetalert2';

import './Punjab.css';
import '../global.css';


export default class Punjab extends Component{
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
		console.log("Punjab................................");
		return(
			<div className="bodyWrapper">
				<div className="stateWrapper">
					<div className="fazilka classHover"> 
						<img src="/Maps/Punjab/Fazilka.png" alt="Fazilka" onMouseOver={e => (e.currentTarget.src = "/Maps/Punjab/Fazilka_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Punjab/Fazilka.png")}/>
						<span className="fazilkaText mapTextLabel text-capitalize">Fazilka</span>
						<span className="fazilkaNumber mapCountLabel text-center">{this.search('fazilka')}</span>
					</div>

					<div className="sri_muktsar_sahib classHover"> 
						<img src="/Maps/Punjab/Sri_Muktsar_Sahib.png" alt="Sri_Muktsar_Sahib" onMouseOver={e => (e.currentTarget.src = "/Maps/Punjab/Sri_Muktsar_Sahib_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Punjab/Sri_Muktsar_Sahib.png")}/>
						<span className="sri_muktsar_sahibText mapTextLabel text-capitalize">Sri_Muktsar_Sahib</span>
						<span className="sri_muktsar_sahibNumber mapCountLabel text-center">{this.search('sri_muktsar_sahib')}</span>
					</div>

					<div className="bathinda classHover"> 
						<img src="/Maps/Punjab/Bathinda.png" alt="Bathinda" onMouseOver={e => (e.currentTarget.src = "/Maps/Punjab/Bathinda_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Punjab/Bathinda.png")}/>
						<span className="bathindaText mapTextLabel text-capitalize">Bathinda</span>
						<span className="bathindaNumber mapCountLabel text-center">{this.search('bathinda')}</span>
					</div>

					<div className="faridkot classHover"> 
						<img src="/Maps/Punjab/Faridkot.png" alt="Faridkot" onMouseOver={e => (e.currentTarget.src = "/Maps/Punjab/Faridkot_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Punjab/Faridkot.png")}/>
						<span className="faridkotText mapTextLabel text-capitalize">Faridkot</span>
						<span className="faridkotNumber mapCountLabel text-center">{this.search('faridkot')}</span>
					</div>

					<div className="ferozepur classHover"> 
						<img src="/Maps/Punjab/Ferozepur.png" alt="Ferozepur" onMouseOver={e => (e.currentTarget.src = "/Maps/Punjab/Ferozepur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Punjab/Ferozepur.png")}/>
						<span className="ferozepurText mapTextLabel text-capitalize">Ferozepur</span>
						<span className="ferozepurNumber mapCountLabel text-center">{this.search('ferozepur')}</span>
					</div>

					<div className="tarn_taran classHover"> 
						<img src="/Maps/Punjab/Tarn_Taran.png" alt="Tarn_Taran" onMouseOver={e => (e.currentTarget.src = "/Maps/Punjab/Tarn_Taran_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Punjab/Tarn_Taran.png")}/>
						<span className="tarn_taranText mapTextLabel text-capitalize">Tarn_Taran</span>
						<span className="tarn_taranNumber mapCountLabel text-center">{this.search('tarn_taran')}</span>
					</div>

					<div className="amritsar classHover"> 
						<img src="/Maps/Punjab/Amritsar.png" alt="Amritsar" onMouseOver={e => (e.currentTarget.src = "/Maps/Punjab/Amritsar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Punjab/Amritsar.png")}/>
						<span className="amritsarText mapTextLabel text-capitalize">Amritsar</span>
						<span className="amritsarNumber mapCountLabel text-center">{this.search('amritsar')}</span>
					</div>

					<div className="gurdaspur classHover"> 
						<img src="/Maps/Punjab/Gurdaspur.png" alt="Gurdaspur" onMouseOver={e => (e.currentTarget.src = "/Maps/Punjab/Gurdaspur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Punjab/Gurdaspur.png")}/>
						<span className="gurdaspurText mapTextLabel text-capitalize">Gurdaspur</span>
						<span className="gurdaspurNumber mapCountLabel text-center">{this.search('gurdaspur')}</span>
					</div>

					<div className="pathankot classHover"> 
						<img src="/Maps/Punjab/Pathankot.png" alt="Pathankot" onMouseOver={e => (e.currentTarget.src = "/Maps/Punjab/Pathankot_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Punjab/Pathankot.png")}/>
						<span className="pathankotText mapTextLabel text-capitalize">Pathankot</span>
						<span className="pathankotNumber mapCountLabel text-center">{this.search('pathankot')}</span>
					</div>

					<div className="hoshiarpur classHover"> 
						<img src="/Maps/Punjab/Hoshiarpur.png" alt="Hoshiarpur" onMouseOver={e => (e.currentTarget.src = "/Maps/Punjab/Hoshiarpur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Punjab/Hoshiarpur.png")}/>
						<span className="hoshiarpurText mapTextLabel text-capitalize">Hoshiarpur</span>
						<span className="hoshiarpurNumber mapCountLabel text-center">{this.search('hoshiarpur')}</span>
					</div>

					<div className="kapurthala classHover"> 
						<img src="/Maps/Punjab/Kapurthala.png" alt="Kapurthala" onMouseOver={e => (e.currentTarget.src = "/Maps/Punjab/Kapurthala_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Punjab/Kapurthala.png")}/>
						<span className="kapurthalaText mapTextLabel text-capitalize">Kapurthala</span>
						<span className="kapurthalaNumber mapCountLabel text-center">{this.search('kapurthala')}</span>
					</div>

					<div className="jalandhar classHover"> 
						<img src="/Maps/Punjab/Jalandhar.png" alt="Jalandhar" onMouseOver={e => (e.currentTarget.src = "/Maps/Punjab/Jalandhar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Punjab/Jalandhar.png")}/>
						<span className="jalandharText mapTextLabel text-capitalize">Jalandhar</span>
						<span className="jalandharNumber mapCountLabel text-center">{this.search('jalandhar')}</span>
					</div>

					<div className="singh_nagar classHover"> 
						<img src="/Maps/Punjab/Singh_Nagar.png" alt="Singh_Nagar" onMouseOver={e => (e.currentTarget.src = "/Maps/Punjab/Singh_Nagar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Punjab/Singh_Nagar.png")}/>
						<span className="singh_nagarText mapTextLabel text-capitalize">Singh Nagar</span>
						<span className="singh_nagarNumber mapCountLabel text-center">{this.search('singh nagar')}</span>
					</div>

					<div className="rupnagar classHover"> 
						<img src="/Maps/Punjab/Rupnagar.png" alt="Rupnagar" onMouseOver={e => (e.currentTarget.src = "/Maps/Punjab/Rupnagar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Punjab/Rupnagar.png")}/>
						<span className="rupnagarText mapTextLabel text-capitalize">Rupnagar</span>
						<span className="rupnagarNumber mapCountLabel text-center">{this.search('rupnagar')}</span>
					</div>

					<div className="a_Kapurthala classHover"> 
						<img src="/Maps/Punjab/a_Kapurthala.png" alt="a_Kapurthala" onMouseOver={e => (e.currentTarget.src = "/Maps/Punjab/a_Kapurthala_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Punjab/a_Kapurthala.png")}/>
						<span className="a_KapurthalaText mapTextLabel text-capitalize">Kapurthala</span>
						<span className="a_KapurthalaNumber mapCountLabel text-center">{this.search('kapurthala')}</span>
					</div>
					
					<div className="moga classHover"> 
						<img src="/Maps/Punjab/Moga.png" alt="Moga" onMouseOver={e => (e.currentTarget.src = "/Maps/Punjab/Moga_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Punjab/Moga.png")}/>
						<span className="mogaText mapTextLabel text-capitalize">Moga</span>
						<span className="mogaNumber mapCountLabel text-center">{this.search('moga')}</span>
					</div>

					<div className="ludhiana classHover"> 
						<img src="/Maps/Punjab/Ludhiana.png" alt="Ludhiana" onMouseOver={e => (e.currentTarget.src = "/Maps/Punjab/Ludhiana_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Punjab/Ludhiana.png")}/>
						<span className="ludhianaText mapTextLabel text-capitalize">Ludhiana</span>
						<span className="ludhianaNumber mapCountLabel text-center">{this.search('ludhiana')}</span>
					</div>

					<div className="barnala classHover"> 
						<img src="/Maps/Punjab/Barnala.png" alt="Barnala" onMouseOver={e => (e.currentTarget.src = "/Maps/Punjab/Barnala_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Punjab/Barnala.png")}/>
						<span className="barnalaText mapTextLabel text-capitalize">Barnala</span>
						<span className="barnalaNumber mapCountLabel text-center">{this.search('barnala')}</span>
					</div>

					<div className="mansa classHover"> 
						<img src="/Maps/Punjab/Mansa.png" alt="Mansa" onMouseOver={e => (e.currentTarget.src = "/Maps/Punjab/Mansa_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Punjab/Mansa.png")}/>
						<span className="mansaText mapTextLabel text-capitalize">Mansa</span>
						<span className="mansaNumber mapCountLabel text-center">{this.search('mansa')}</span>
					</div>

					<div className="sangrur classHover"> 
						<img src="/Maps/Punjab/Sangrur.png" alt="Sangrur" onMouseOver={e => (e.currentTarget.src = "/Maps/Punjab/Sangrur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Punjab/Sangrur.png")}/>
						<span className="sangrurText mapTextLabel text-capitalize">Sangrur</span>
						<span className="sangrurNumber mapCountLabel text-center">{this.search('sangrur')}</span>
					</div>

					<div className="fatehgarh_sahib classHover"> 
						<img src="/Maps/Punjab/Fatehgarh_Sahib.png" alt="Fatehgarh_Sahib" onMouseOver={e => (e.currentTarget.src = "/Maps/Punjab/Fatehgarh_Sahib_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Punjab/Fatehgarh_Sahib.png")}/>
						<span className="fatehgarh_sahibText mapTextLabel text-capitalize">Fatehgarh Sahib</span>
						<span className="fatehgarh_sahibNumber mapCountLabel text-center">{this.search('fatehgarh sahib')}</span>
					</div>

					<div className="patiala classHover"> 
						<img src="/Maps/Punjab/Patiala.png" alt="Patiala" onMouseOver={e => (e.currentTarget.src = "/Maps/Punjab/Patiala_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Punjab/Patiala.png")}/>
						<span className="patialaText mapTextLabel text-capitalize">Patiala</span>
						<span className="patialaNumber mapCountLabel text-center">{this.search('patiala')}</span>
					</div>

					<div className="mohali classHover"> 
						<img src="/Maps/Punjab/Mohali.png" alt="Mohali" onMouseOver={e => (e.currentTarget.src = "/Maps/Punjab/Mohali_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Punjab/Mohali.png")}/>
						<span className="mohaliText mapTextLabel text-capitalize">Mohali</span>
						<span className="mohaliNumber mapCountLabel text-center">{this.search('mohali')}</span>
					</div>

					
				</div>
			</div>
		);
	}
}