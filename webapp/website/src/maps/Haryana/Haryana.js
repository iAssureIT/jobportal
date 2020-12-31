import React, {Component} from 'react';
import Axios 				from 'axios';
import Swal 				from 'sweetalert2';

import './Haryana.css';
import '../global.css';


export default class Haryana extends Component{
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
		console.log("Haryana...............................");
		return(
			<div className="bodyWrapper">
				<div className="stateWrapper">
					<div className="sirsa classHover"> 
						<img src="/Maps/Haryana/SIRSA.png" alt="Sirsa" onMouseOver={e => (e.currentTarget.src = "/Maps/Haryana/SIRSA_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Haryana/SIRSA.png")}/>
						<span className="sirsaText mapTextLabel text-capitalize">Sirsa</span>
						<span className="sirsaNumber mapCountLabel text-center">{this.search('sirsa')}</span>
					</div>

					<div className="fatehabad classHover"> 
						<img src="/Maps/Haryana/FATEHABAD.png" alt="fatehabad" onMouseOver={e => (e.currentTarget.src = "/Maps/Haryana/FATEHABAD_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Haryana/FATEHABAD.png")}/>
						<span className="fatehabadText mapTextLabel text-capitalize">Fatehabad</span>
						<span className="fatehabadNumber mapCountLabel text-center">{this.search('fatehabad')}</span>
					</div>

					<div className="jind classHover"> 
						<img src="/Maps/Haryana/JIND.png" alt="jind" onMouseOver={e => (e.currentTarget.src = "/Maps/Haryana/JIND_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Haryana/JIND.png")}/>
						<span className="jindText mapTextLabel text-capitalize">Jind</span>
						<span className="jindNumber mapCountLabel text-center">{this.search('jind')}</span>
					</div>

					<div className="kaithal classHover"> 
						<img src="/Maps/Haryana/KAITHAL.png" alt="kaithal" onMouseOver={e => (e.currentTarget.src = "/Maps/Haryana/KAITHAL_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Haryana/KAITHAL.png")}/>
						<span className="kaithalText mapTextLabel text-capitalize">Kaithal</span>
						<span className="kaithalNumber mapCountLabel text-center">{this.search('kaithal')}</span>
					</div>

					<div className="kurukshetra classHover"> 
						<img src="/Maps/Haryana/KURUKSHETRA.png" alt="kurukshetra" onMouseOver={e => (e.currentTarget.src = "/Maps/Haryana/KURUKSHETRA_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Haryana/KURUKSHETRA.png")}/>
						<span className="kurukshetraText mapTextLabel text-capitalize">Kurukshetra</span>
						<span className="kurukshetraNumber mapCountLabel text-center">{this.search('kurukshetra')}</span>
					</div>

					<div className="ambala classHover"> 
						<img src="/Maps/Haryana/AMBALA.png" alt="ambala" onMouseOver={e => (e.currentTarget.src = "/Maps/Haryana/AMBALA_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Haryana/AMBALA.png")}/>
						<span className="ambalaText mapTextLabel text-capitalize">Ambala</span>
						<span className="ambalaNumber mapCountLabel text-center">{this.search('ambala')}</span>
					</div>

					<div className="panchkula classHover"> 
						<img src="/Maps/Haryana/PANCHKULA.png" alt="panchkula" onMouseOver={e => (e.currentTarget.src = "/Maps/Haryana/PANCHKULA_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Haryana/PANCHKULA.png")}/>
						<span className="panchkulaText mapTextLabel text-capitalize">Panchkula</span>
						<span className="panchkulaNumber mapCountLabel text-center">{this.search('panchkula')}</span>
					</div>

					<div className="yamunanagar classHover"> 
						<img src="/Maps/Haryana/YAMUNA.png" alt="yamunanagar" onMouseOver={e => (e.currentTarget.src = "/Maps/Haryana/YAMUNA_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Haryana/YAMUNA.png")}/>
						<span className="yamunanagarText mapTextLabel text-capitalize">Yamunanagar</span>
						<span className="yamunanagarNumber mapCountLabel text-center">{this.search('yamunanagar')}</span>
					</div>
					
					<div className="karnal classHover"> 
						<img src="/Maps/Haryana/KARNAL.png" alt="karnal" onMouseOver={e => (e.currentTarget.src = "/Maps/Haryana/KARNAL_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Haryana/KARNAL.png")}/>
						<span className="karnalText mapTextLabel text-capitalize">Karnal</span>
						<span className="karnalNumber mapCountLabel text-center">{this.search('karnal')}</span>
					</div>

					<div className="panipat classHover"> 
						<img src="/Maps/Haryana/PANIPAT.png" alt="panipat" onMouseOver={e => (e.currentTarget.src = "/Maps/Haryana/PANIPAT_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Haryana/PANIPAT.png")}/>
						<span className="panipatText mapTextLabel text-capitalize">Panipat</span>
						<span className="panipatNumber mapCountLabel text-center">{this.search('panipat')}</span>
					</div>

					<div className="sonipat classHover"> 
						<img src="/Maps/Haryana/SONIPAT.png" alt="sonipat" onMouseOver={e => (e.currentTarget.src = "/Maps/Haryana/SONIPAT_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Haryana/SONIPAT.png")}/>
						<span className="sonipatText mapTextLabel text-capitalize">Sonipat</span>
						<span className="sonipatNumber mapCountLabel text-center">{this.search('sonipat')}</span>
					</div>

					<div className="rohtak classHover"> 
						<img src="/Maps/Haryana/ROHTAK.png" alt="rohtak" onMouseOver={e => (e.currentTarget.src = "/Maps/Haryana/ROHTAK_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Haryana/ROHTAK.png")}/>
						<span className="rohtakText mapTextLabel text-capitalize">Rohtak</span>
						<span className="rohtakNumber mapCountLabel text-center">{this.search('rohtak')}</span>
					</div>

					<div className="bhiwani classHover"> 
						<img src="/Maps/Haryana/BHIWANI.png" alt="bhiwani" onMouseOver={e => (e.currentTarget.src = "/Maps/Haryana/BHIWANI_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Haryana/BHIWANI.png")}/>
						<span className="bhiwaniText mapTextLabel text-capitalize">Bhiwani</span>
						<span className="bhiwaniNumber mapCountLabel text-center">{this.search('bhiwani')}</span>
					</div>

					<div className="hisar classHover"> 
						<img src="/Maps/Haryana/HISAR.png" alt="hisar" onMouseOver={e => (e.currentTarget.src = "/Maps/Haryana/HISAR_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Haryana/HISAR.png")}/>
						<span className="hisarText mapTextLabel text-capitalize">Hisar</span>
						<span className="hisarNumber mapCountLabel text-center">{this.search('hisar')}</span>
					</div>

					<div className="mahendragarh classHover"> 
						<img src="/Maps/Haryana/MAHENDRAGARH.png" alt="mahendragarh" onMouseOver={e => (e.currentTarget.src = "/Maps/Haryana/MAHENDRAGARH_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Haryana/MAHENDRAGARH.png")}/>
						<span className="mahendragarhText mapTextLabel text-capitalize">Mahendragarh</span>
						<span className="mahendragarhNumber mapCountLabel text-center">{this.search('mahendragarh')}</span>
					</div>

				    <div className="rewari classHover"> 
						<img src="/Maps/Haryana/REWARI.png" alt="rewari" onMouseOver={e => (e.currentTarget.src = "/Maps/Haryana/REWARI_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Haryana/REWARI.png")}/>
						<span className="rewariText mapTextLabel text-capitalize">Rewari</span>
						<span className="rewariNumber mapCountLabel text-center">{this.search('rewari')}</span>
					</div>

					<div className="jhajjar classHover"> 
						<img src="/Maps/Haryana/JHAJJAR.png" alt="jhajjar" onMouseOver={e => (e.currentTarget.src = "/Maps/Haryana/JHAJJAR_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Haryana/JHAJJAR.png")}/>
						<span className="jhajjarText mapTextLabel text-capitalize">Jhajjar</span>
						<span className="jhajjarNumber mapCountLabel text-center">{this.search('jhajjar')}</span>
					</div>

					<div className="gurgaon classHover"> 
						<img src="/Maps/Haryana/GURGAON.png" alt="gurgaon" onMouseOver={e => (e.currentTarget.src = "/Maps/Haryana/GURGAON_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Haryana/GURGAON.png")}/>
						<span className="gurgaonText mapTextLabel text-capitalize">Gurgaon</span>
						<span className="gurgaonNumber mapCountLabel text-center">{this.search('gurgaon')}</span>
					</div>

					<div className="mewat classHover"> 
						<img src="/Maps/Haryana/MEWAT.png" alt="mewat" onMouseOver={e => (e.currentTarget.src = "/Maps/Haryana/MEWAT_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Haryana/MEWAT.png")}/>
						<span className="mewatText mapTextLabel text-capitalize">Mewat</span>
						<span className="mewatNumber mapCountLabel text-center">{this.search('mewat')}</span>
					</div>

					<div className="faridabad classHover"> 
						<img src="/Maps/Haryana/FARIDABAD.png" alt="faridabad" onMouseOver={e => (e.currentTarget.src = "/Maps/Haryana/FARIDABAD_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Haryana/FARIDABAD.png")}/>
						<span className="faridabadText mapTextLabel text-capitalize">Faridabad</span>
						<span className="faridabadNumber mapCountLabel text-center">{this.search('faridabad')}</span>
					</div>

					<div className="palwal classHover"> 
						<img src="/Maps/Haryana/PALWAL.png" alt="palwal" onMouseOver={e => (e.currentTarget.src = "/Maps/Haryana/PALWAL_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Haryana/PALWAL.png")}/>
						<span className="palwalText mapTextLabel text-capitalize">Palwal</span>
						<span className="palwalNumber mapCountLabel text-center">{this.search('palwal')}</span>
					</div>


				</div>
			</div>
		);
	}
}