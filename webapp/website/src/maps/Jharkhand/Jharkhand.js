import React, {Component} from 'react';

import './Jharkhand.css';
import '../global.css';


export default class Jharkhand extends Component{
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
					<div className="garhwa"> 
						<img src="/Maps/Jharkhand/Garhwa.png"  alt="Garhwa" onMouseOver={e => (e.currentTarget.src = "/Maps/Jharkhand/Garhwa_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Jharkhand/Garhwa.png")}/>
						<span className="garhwaText mapTextLabel text-capitalize">Garhwa</span>
						<span className="garhwaNumber mapCountLabel text-center">{this.search('garhwa')}</span>
					</div>
					<div className="palamu"> 
						<img src="/Maps/Jharkhand/Palamu.png" alt="Palamu" onMouseOver={e => (e.currentTarget.src = "/Maps/Jharkhand/Palamu_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Jharkhand/Palamu.png")}/>
						<span className="palamuText mapTextLabel text-capitalize">Palamu</span>
						<span className="palamuNumber mapCountLabel text-center">{this.search('palamu')}</span>
					</div>
					<div className="chatra classHover"> 
						<img src="/Maps/Jharkhand/Chatra.png" alt="Chatra" onMouseOver={e => (e.currentTarget.src = "/Maps/Jharkhand/Chatra_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Jharkhand/Chatra.png")}/>
						<span className="chatraText mapTextLabel text-capitalize">Chatra</span>
						<span className="chatraNumber mapCountLabel text-center">{this.search('chatra')}</span>
					</div>
					<div className="hazaribag classHover"> 
						<img src="/Maps/Jharkhand/Hazaribag.png"  alt="Hazaribag" onMouseOver={e => (e.currentTarget.src = "/Maps/Jharkhand/Hazaribag_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Jharkhand/Hazaribag.png")}/>
						<span className="hazaribagText mapTextLabel text-capitalize">Hazaribag</span>
						<span className="hazaribagNumber mapCountLabel text-center">{this.search('hazaribag')}</span>
					</div>
					<div className="koderma classHover"> 
						<img src="/Maps/Jharkhand/Koderma.png" alt="Koderma" onMouseOver={e => (e.currentTarget.src = "/Maps/Jharkhand/Koderma_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Jharkhand/Koderma.png")}/>
						<span className="kodermaText mapTextLabel text-capitalize">Koderma</span>
						<span className="kodermaNumber mapCountLabel text-center">{this.search('koderma')}</span>
					</div>
					<div className="giridin classHover"> 
						<img src="/Maps/Jharkhand/Giridin.png"  alt="Giridin" onMouseOver={e => (e.currentTarget.src = "/Maps/Jharkhand/Giridin_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Jharkhand/Giridin.png")}/>
						<span className="giridinText mapTextLabel text-capitalize">Giridin</span>
						<span className="giridinNumber mapCountLabel text-center">{this.search('giridin')}</span>
					</div>
					<div className="deoghar classHover"> 
						<img src="/Maps/Jharkhand/Deoghar.png"  alt="Deoghar" onMouseOver={e => (e.currentTarget.src = "/Maps/Jharkhand/Deoghar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Jharkhand/Deoghar.png")}/>
						<span className="deogharText mapTextLabel text-capitalize">Deoghar</span>
						<span className="deogharNumber mapCountLabel text-center">{this.search('deoghar')}</span>
					</div>
					<div className="dumka classHover"> 
						<img src="/Maps/Jharkhand/Dumka.png"  alt="Dumka" onMouseOver={e => (e.currentTarget.src = "/Maps/Jharkhand/Dumka_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Jharkhand/Dumka.png")}/>
						<span className="dumkaText mapTextLabel text-capitalize">Dumka</span>
						<span className="dumkaNumber mapCountLabel text-center">{this.search('dumka')}</span>
					</div>
					<div className="godda classHover"> 
						<img src="/Maps/Jharkhand/Godda.png"  alt="Godda" onMouseOver={e => (e.currentTarget.src = "/Maps/Jharkhand/Godda_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Jharkhand/Godda.png")}/>
						<span className="goddaText mapTextLabel text-capitalize">Godda</span>
						<span className="goddaNumber mapCountLabel text-center">{this.search('godda')}</span>
					</div>
					<div className="pakur classHover"> 
						<img src="/Maps/Jharkhand/Pakur.png"  alt="Pakur" onMouseOver={e => (e.currentTarget.src = "/Maps/Jharkhand/Pakur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Jharkhand/Pakur.png")}/>
						<span className="pakurText mapTextLabel text-capitalize">Pakur</span>
						<span className="pakurNumber mapCountLabel text-center">{this.search('pakur')}</span>
					</div>
					<div className="sahibganj classHover"> 
						<img src="/Maps/Jharkhand/Sahibganj.png"  alt="Sahibganj" onMouseOver={e => (e.currentTarget.src = "/Maps/Jharkhand/Sahibganj_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Jharkhand/Sahibganj.png")}/>
						<span className="sahibganjText mapTextLabel text-capitalize">Sahibganj</span>
						<span className="sahibganjNumber mapCountLabel text-center">{this.search('sahibganj')}</span>
					</div>
					<div className="jamtara classHover"> 
						<img src="/Maps/Jharkhand/Jamtara.png"  alt="Jamtara" onMouseOver={e => (e.currentTarget.src = "/Maps/Jharkhand/Jamtara_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Jharkhand/Jamtara.png")}/>
						<span className="jamtaraText mapTextLabel text-capitalize">Jamtara</span>
						<span className="jamtaraNumber mapCountLabel text-center">{this.search('jamtara')}</span>
					</div>
					<div className="dhanbad classHover"> 
						<img src="/Maps/Jharkhand/Dhanbad.png"  alt="Dhanbad" onMouseOver={e => (e.currentTarget.src = "/Maps/Jharkhand/Dhanbad_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Jharkhand/Dhanbad.png")}/>
						<span className="dhanbadText mapTextLabel text-capitalize">Dhanbad</span>
						<span className="dhanbadNumber mapCountLabel text-center">{this.search('dhanbad')}</span>
					</div>
					<div className="bokaro classHover"> 
						<img src="/Maps/Jharkhand/Bokaro.png"  alt="Bokaro" onMouseOver={e => (e.currentTarget.src = "/Maps/Jharkhand/Bokaro_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Jharkhand/Bokaro.png")}/>
						<span className="bokaroText mapTextLabel text-capitalize">Bokaro</span>
						<span className="bokaroNumber mapCountLabel text-center">{this.search('bokaro')}</span>
					</div>
					<div className="ramgarh classHover"> 
						<img src="/Maps/Jharkhand/Ramgarh.png"  alt="Ramgarh" onMouseOver={e => (e.currentTarget.src = "/Maps/Jharkhand/Ramgarh_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Jharkhand/Ramgarh.png")}/>
						<span className="ramgarhText mapTextLabel text-capitalize">Ramgarh</span>
						<span className="ramgarhNumber mapCountLabel text-center">{this.search('ramgarh')}</span>
					</div>
					<div className="ranchi classHover"> 
						<img src="/Maps/Jharkhand/Ranchi.png"  alt="Ranchi" onMouseOver={e => (e.currentTarget.src = "/Maps/Jharkhand/Ranchi_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Jharkhand/Ranchi.png")}/>
						<span className="ranchiText mapTextLabel text-capitalize">Ranchi</span>
						<span className="ranchiNumber mapCountLabel text-center">{this.search('ranchi')}</span>
					</div>
					<div className="saraikelaKharsawan classHover"> 
						<img src="/Maps/Jharkhand/Saraikela_Kharsawan.png"  alt="Saraikela_Kharsawan" onMouseOver={e => (e.currentTarget.src = "/Maps/Jharkhand/Saraikela_Kharsawan_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Jharkhand/Saraikela_Kharsawan.png")}/>
						<span className="saraikelaKharsawanText mapTextLabel text-capitalize">Saraikela_Kharsawan</span>
						<span className="saraikelaKharsawanNumber mapCountLabel text-center">{this.search('saraikelaKharsawan')}</span>
					</div>
					<div className="eastSinghbhum classHover"> 
						<img src="/Maps/Jharkhand/East_Singhbhum.png"  alt="East_Singhbhum" onMouseOver={e => (e.currentTarget.src = "/Maps/Jharkhand/East_Singhbhum_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Jharkhand/East_Singhbhum.png")}/>
						<span className="eastSinghbhumText mapTextLabel text-capitalize">East_Singhbhum</span>
						<span className="eastSinghbhumNumber mapCountLabel text-center">{this.search('eastSinghbhum')}</span>
					</div>
					<div className="westSinghbhum classHover"> 
						<img src="/Maps/Jharkhand/West_Singhbhum.png" alt="West_Singhbhum" onMouseOver={e => (e.currentTarget.src = "/Maps/Jharkhand/West_Singhbhum_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Jharkhand/West_Singhbhum.png")}/>
						<span className="westSinghbhumText mapTextLabel text-capitalize">West_Singhbhum</span>
						<span className="westSinghbhumNumber mapCountLabel text-center">{this.search('westSinghbhum')}</span>
					</div>
					<div className="simdega classHover"> 
						<img src="/Maps/Jharkhand/Simdega.png"  alt="Simdega" onMouseOver={e => (e.currentTarget.src = "/Maps/Jharkhand/Simdega_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Jharkhand/Simdega.png")}/>
						<span className="simdegaText mapTextLabel text-capitalize">Simdega</span>
						<span className="simdegaNumber mapCountLabel text-center">{this.search('simdega')}</span>
					</div>
					<div className="khunti classHover"> 
						<img src="/Maps/Jharkhand/Khunti.png"  alt="Khunti" onMouseOver={e => (e.currentTarget.src = "/Maps/Jharkhand/Khunti_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Jharkhand/Khunti.png")}/>
						<span className="khuntiText mapTextLabel text-capitalize">Khunti</span>
						<span className="khuntiNumber mapCountLabel text-center">{this.search('khunti')}</span>
					</div>
					<div className="gumla classHover"> 
						<img src="/Maps/Jharkhand/Gumla.png"  alt="Gumla" onMouseOver={e => (e.currentTarget.src = "/Maps/Jharkhand/Gumla_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Jharkhand/Gumla.png")}/>
						<span className="gumlaText mapTextLabel text-capitalize">Gumla</span>
						<span className="gumlaNumber mapCountLabel text-center">{this.search('gumla')}</span>
					</div>
					<div className="lohardaga classHover"> 
						<img src="/Maps/Jharkhand/Lohardaga.png" alt="Lohardaga" onMouseOver={e => (e.currentTarget.src = "/Maps/Jharkhand/Lohardaga_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Jharkhand/Lohardaga.png")}/>
						<span className="lohardagaText mapTextLabel text-capitalize">Lohardaga</span>
						<span className="lohardagaNumber mapCountLabel text-center">{this.search('lohardaga')}</span>
					</div>
					<div className="latehar classHover"> 
						<img src="/Maps/Jharkhand/Latehar.png"  alt="Latehar" onMouseOver={e => (e.currentTarget.src = "/Maps/Jharkhand/Latehar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Jharkhand/Latehar.png")}/>
						<span className="lateharText mapTextLabel text-capitalize">Latehar</span>
						<span className="lateharNumber mapCountLabel text-center">{this.search('latehar')}</span>
					</div>
					

				</div>
			</div>
		);
	}
}