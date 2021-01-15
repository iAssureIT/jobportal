import React, {Component} from 'react';
import Axios 				from 'axios';
import Swal 				from 'sweetalert2';

import './Rajasthan.css';
import '../global.css';


export default class Rajasthan extends Component{
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
		console.log("Rajasthan...............................");
		return(
			<div className="bodyWrapper">
				<div className="stateWrapper">

					<div className="jaisalmer classHover"> 
						<img src="/Maps/Rajasthan/Jaisalmer.png" alt="Jaisalmer" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Jaisalmer_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Jaisalmer.png")}/>
						<span className="jaisalmerText mapTextLabel text-capitalize">Jaisalmer</span>
						<span className="jaisalmerNumber mapCountLabel text-center">{this.search('jaisalmer')}</span>
					</div>

					<div className="jodhpur classHover"> 
						<img src="/Maps/Rajasthan/Jodhpur.png" alt="Jodhpur" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Jodhpur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Jodhpur.png")}/>
						<span className="jodhpurText mapTextLabel text-capitalize">Jodhpur</span>
						<span className="jodhpurNumber mapCountLabel text-center">{this.search('jodhpur')}</span>
					</div>

					<div className="nagaur classHover"> 
						<img src="/Maps/Rajasthan/Nagaur.png" alt="Nagaur" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Nagaur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Nagaur.png")}/>
						<span className="nagaurText mapTextLabel text-capitalize">Nagaur</span>
						<span className="nagaurNumber mapCountLabel text-center">{this.search('nagaur')}</span>
					</div>

					<div className="Jaipur classHover"> 
						<img src="/Maps/Rajasthan/Jaipur.png" alt="Jaipur" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Jaipur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Jaipur.png")}/>
						<span className="JaipurText mapTextLabel text-capitalize">Jaipur</span>
						<span className="JaipurNumber mapCountLabel text-center">{this.search('jaipur')}</span>
					</div>

					<div className="dausa classHover"> 
						<img src="/Maps/Rajasthan/Dausa.png" alt="Dausa" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Dausa_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Dausa.png")}/>
						<span className="dausaText mapTextLabel text-capitalize">Dausa</span>
						<span className="dausaNumber mapCountLabel text-center">{this.search('dausa')}</span>
					</div>

					<div className="karauli classHover"> 
						<img src="/Maps/Rajasthan/Karauli.png" alt="Karauli" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Karauli_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Karauli.png")}/>
						<span className="karauliText mapTextLabel text-capitalize">Karauli</span>
						<span className="karauliNumber mapCountLabel text-center">{this.search('karauli')}</span>
					</div>

					<div className="dholpur classHover"> 
						<img src="/Maps/Rajasthan/Dholpur.png" alt="Dholpur" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Dholpur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Dholpur.png")}/>
						<span className="dholpurText mapTextLabel text-capitalize">Dholpur</span>
						<span className="dholpurNumber mapCountLabel text-center">{this.search('dholpur')}</span>
					</div>

					<div className="bikaner classHover"> 
						<img src="/Maps/Rajasthan/Bikaner.png" alt="Bikaner" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Bikaner_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Bikaner.png")}/>
						<span className="bikanerText mapTextLabel text-capitalize">Bikaner</span>
						<span className="bikanerNumber mapCountLabel text-center">{this.search('bikaner')}</span>
					</div>

					<div className="sri_ganganagar classHover"> 
						<img src="/Maps/Rajasthan/Sri_Ganganagar.png" alt="Sri_Ganganagar" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Sri_Ganganagar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Sri_Ganganagar.png")}/>
						<span className="sri_ganganagarText mapTextLabel text-capitalize">Sri Ganganagar</span>
						<span className="bikanerNumber mapCountLabel text-center">{this.search('sri ganganagar')}</span>
					</div>

					<div className="hanumangarh classHover"> 
						<img src="/Maps/Rajasthan/Hanumangarh.png" alt="Hanumangarh" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Hanumangarh_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Hanumangarh.png")}/>
						<span className="hanumangarhText mapTextLabel text-capitalize">Hanumangarh</span>
						<span className="hanumangarhNumber mapCountLabel text-center">{this.search('hanumangarh')}</span>
					</div>

					<div className="churu classHover"> 
						<img src="/Maps/Rajasthan/Churu.png" alt="Churu" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Churu_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Churu.png")}/>
						<span className="churuText mapTextLabel text-capitalize">Churu</span>
						<span className="churuNumber mapCountLabel text-center">{this.search('churu')}</span>
					</div>

					<div className="jhunjhunun classHover"> 
						<img src="/Maps/Rajasthan/Jhunjhunun.png" alt="Jhunjhunun" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Jhunjhunun_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Jhunjhunun.png")}/>
						<span className="jhunjhununText mapTextLabel text-capitalize">Jhunjhunun</span>
						<span className="jhunjhununNumber mapCountLabel text-center">{this.search('jhunjhunun')}</span>
					</div>

					<div className="sikar classHover"> 
						<img src="/Maps/Rajasthan/Sikar.png" alt="Sikar" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Sikar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Sikar.png")}/>
						<span className="sikarText mapTextLabel text-capitalize">Sikar</span>
						<span className="sikarNumber mapCountLabel text-center">{this.search('sikar')}</span>
					</div>

					<div className="alwar classHover"> 
						<img src="/Maps/Rajasthan/Alwar.png" alt="Alwar" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Alwar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Alwar.png")}/>
						<span className="alwarText mapTextLabel text-capitalize">Alwar</span>
						<span className="alwarNumber mapCountLabel text-center">{this.search('alwar')}</span>
					</div>

					<div className="bharatpur classHover"> 
						<img src="/Maps/Rajasthan/Bharatpur.png" alt="Bharatpur" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Bharatpur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Bharatpur.png")}/>
						<span className="bharatpurText mapTextLabel text-capitalize">Bharatpur</span>
						<span className="bharatpurNumber mapCountLabel text-center">{this.search('bharatpur')}</span>
					</div>

					<div className="barmer classHover"> 
						<img src="/Maps/Rajasthan/Barmer.png" alt="Barmer" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Barmer_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Barmer.png")}/>
						<span className="barmerText mapTextLabel text-capitalize">Barmer</span>
						<span className="barmerNumber mapCountLabel text-center">{this.search('barmer')}</span>
					</div>

					<div className="jalore classHover"> 
						<img src="/Maps/Rajasthan/Jalore.png" alt="Jalore" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Jalore_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Jalore.png")}/>
						<span className="jaloreText mapTextLabel text-capitalize">Jalore</span>
						<span className="jaloreNumber mapCountLabel text-center">{this.search('jalore')}</span>
					</div>

					<div className="pali classHover"> 
						<img src="/Maps/Rajasthan/Pali.png" alt="Pali" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Pali_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Pali.png")}/>
						<span className="paliText mapTextLabel text-capitalize">Pali</span>
						<span className="paliNumber mapCountLabel text-center">{this.search('pali')}</span>
					</div>

					<div className="ajmer classHover"> 
						<img src="/Maps/Rajasthan/Ajmer.png" alt="Ajmer" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Ajmer_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Ajmer.png")}/>
						<span className="ajmerText mapTextLabel text-capitalize">Ajmer</span>
						<span className="ajmerNumber mapCountLabel text-center">{this.search('ajmer')}</span>
					</div>

					<div className="tonk classHover"> 
						<img src="/Maps/Rajasthan/Tonk.png" alt="Tonk" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Tonk_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Tonk.png")}/>
						<span className="tonkText mapTextLabel text-capitalize">Tonk</span>
						<span className="tonkNumber mapCountLabel text-center">{this.search('tonk')}</span>
					</div>

					<div className="sawai_madhopur classHover"> 
						<img src="/Maps/Rajasthan/Sawai_Madhopur.png" alt="Sawai_Madhopur" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Sawai_Madhopur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Sawai_Madhopur.png")}/>
						<span className="sawai_madhopurText mapTextLabel text-capitalize">Sawai Madhopur</span>
						<span className="sawai_madhopurNumber mapCountLabel text-center">{this.search('sawai madhopur')}</span>
					</div>

					<div className="sirohi classHover"> 
						<img src="/Maps/Rajasthan/Sirohi.png" alt="Sirohi" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Sirohi_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Sirohi.png")}/>
						<span className="sirohiText mapTextLabel text-capitalize">Sirohi</span>
						<span className="sirohiNumber mapCountLabel text-center">{this.search('sirohi')}</span>
					</div>

					<div className="rajsamand classHover"> 
						<img src="/Maps/Rajasthan/Rajsamand.png" alt="Rajsamand" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Rajsamand_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Rajsamand.png")}/>
						<span className="rajsamandText mapTextLabel text-capitalize">Rajsamand</span>
						<span className="rajsamandNumber mapCountLabel text-center">{this.search('rajsamand')}</span>
					</div>

					<div className="bhilwara classHover"> 
						<img src="/Maps/Rajasthan/Bhilwara.png" alt="Bhilwara" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Bhilwara_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Bhilwara.png")}/>
						<span className="bhilwaraText mapTextLabel text-capitalize">Bhilwara</span>
						<span className="bhilwaraNumber mapCountLabel text-center">{this.search('bhilwara')}</span>
					</div>

					<div className="bundi classHover"> 
						<img src="/Maps/Rajasthan/Bundi.png" alt="Bundi" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Bundi_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Bundi.png")}/>
						<span className="bundiText mapTextLabel text-capitalize">Bundi</span>
						<span className="bundiNumber mapCountLabel text-center">{this.search('bundi')}</span>
					</div>

					<div className="kota classHover"> 
						<img src="/Maps/Rajasthan/Kota.png" alt="Kota" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Kota_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Kota.png")}/>
						<span className="kotaText mapTextLabel text-capitalize">Kota</span>
						<span className="kotaNumber mapCountLabel text-center">{this.search('kota')}</span>
					</div>

					<div className="baran classHover"> 
						<img src="/Maps/Rajasthan/Baran.png" alt="Baran" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Baran_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Baran.png")}/>
						<span className="baranText mapTextLabel text-capitalize">Baran</span>
						<span className="baranNumber mapCountLabel text-center">{this.search('baran')}</span>
					</div>

					<div className="jhalawar classHover"> 
						<img src="/Maps/Rajasthan/Jhalwar.png" alt="Jhalawar" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Jhalwar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Jhalwar.png")}/>
						<span className="jhalawarText mapTextLabel text-capitalize">Jhalawar</span>
						<span className="jhalawarNumber mapCountLabel text-center">{this.search('jhalawar')}</span>
					</div>

					<div className="udaipur classHover"> 
						<img src="/Maps/Rajasthan/Udaipur.png" alt="Udaipur" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Udaipur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Udaipur.png")}/>
						<span className="udaipurText mapTextLabel text-capitalize">Udaipur</span>
						<span className="udaipurNumber mapCountLabel text-center">{this.search('udaipur')}</span>
					</div>

					<div className="chittorgarh classHover"> 
						<img src="/Maps/Rajasthan/Chittorgarh.png" alt="Chittorgarh" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Chittorgarh_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Chittorgarh.png")}/>
						<span className="chittorgarhText mapTextLabel text-capitalize">Chittorgarh</span>
						<span className="chittorgarhNumber mapCountLabel text-center">{this.search('chittorgarh')}</span>
					</div>

					<div className="dungarpur classHover"> 
						<img src="/Maps/Rajasthan/Dungarpur.png" alt="Dungarpur" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Dungarpur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Dungarpur.png")}/>
						<span className="dungarpurText mapTextLabel text-capitalize">Dungarpur</span>
						<span className="dungarpurNumber mapCountLabel text-center">{this.search('dungarpur')}</span>
					</div>

					<div className="dungarpur classHover"> 
						<img src="/Maps/Rajasthan/Dungarpur.png" alt="Dungarpur" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Dungarpur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Dungarpur.png")}/>
						<span className="dungarpurText mapTextLabel text-capitalize">Dungarpur</span>
						<span className="dungarpurNumber mapCountLabel text-center">{this.search('dungarpur')}</span>
					</div>

					<div className="Pratapgarh classHover"> 
						<img src="/Maps/Rajasthan/Pratapgarh.png" alt="Pratapgarh" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Pratapgarh_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Pratapgarh.png")}/>
						<span className="PratapgarhText mapTextLabel text-capitalize">Pratapgarh</span>
						<span className="PratapgarhNumber mapCountLabel text-center">{this.search('pratapgarh')}</span>
					</div>

					<div className="banswara classHover"> 
						<img src="/Maps/Rajasthan/Banswara.png" alt="Banswara" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Banswara_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Banswara.png")}/>
						<span className="banswaraText mapTextLabel text-capitalize">Banswara</span>
						<span className="banswaraNumber mapCountLabel text-center">{this.search('banswara')}</span>
					</div>

				</div>
			</div>
		);
	}
}