import React, {Component} from 'react';
import Axios 				from 'axios';
import Swal 				from 'sweetalert2';

import './maharashtra.css';
import '../global.css';


export default class Maharashtra extends Component{
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
					<div className="mumbai"> 
						<img src="/Maps/Maharashtra/Mumbai_City.png" alt="Mumbai_City" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Mumbai_City_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Mumbai_City.png")}/>
						<span className="mumbaiText text-capitalize">Mumbai City</span>
						<span className="mumbaiNumber  text-center">{this.search('mumbai')}</span>
					</div>

					<div className="raigad"> 
						<img src="/Maps/Maharashtra/Raigad.png" alt="Raigad" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Raigad_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Raigad.png")}/>
						<span className="raigadText text-capitalize">Raigad</span>
						<span className="raigadNumber  text-center">{this.search('raigad')}</span>
					</div>

					<div className="ratnagiri"> 
						<img src="/Maps/Maharashtra/Ratnagiri.png" alt="Ratnagiri" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Ratnagiri_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Ratnagiri.png")}/>
						<span className="ratnagiriText text-capitalize">ratnagiri</span>
						<span className="ratnagiriNumber  text-center">{this.search('ratnagiri')}</span>
					</div>

					<div className="sindhudurg"> 
						<img src="/Maps/Maharashtra/Sindhudurg.png" alt="Sindhudurg" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Sindhudurg_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Sindhudurg.png")}/>
						<span className="sindhudurgText text-capitalize">sindhudurg</span>
						<span className="sindhudurgNumber  text-center">{this.search('sindhudurg')}</span>
					</div>

					<div className="kolhapur"> 
						<img src="/Maps/Maharashtra/Kolhapur.png" alt="Kolhapur" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Kolhapur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Kolhapur.png")}/>
						<span className="kolhapurText text-capitalize">kolhapur</span>
						<span className="kolhapurNumber  text-center">{this.search('kolhapur')}</span>
					</div>

					<div className="sangli"> 
						<img src="/Maps/Maharashtra/Sangli.png" alt="Sangli" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Sangli_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Sangli.png")}/>
						<span className="sangliText text-capitalize">sangli</span>
						<span className="sangliNumber  text-center">{this.search('sangli')}</span>
					</div>

					<div className="satara"> 
						<img src="/Maps/Maharashtra/Satara.png" alt="Satara" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Satara_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Satara.png")}/>
						<span className="sataraText text-capitalize">satara</span>
						<span className="sataraNumber  text-center">{this.search('satara')}</span>
					</div>

					<div className="palghar"> 
						<img src="/Maps/Maharashtra/Palghar.png" alt="Palghar" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Palghar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Palghar.png")}/>
						<span className="palgharText text-capitalize">palghar</span>
						<span className="palgharNumber  text-center">{this.search('palghar')}</span>
					</div>
					
					<div className="pune"> 
						<img src="/Maps/Maharashtra/Pune.png" alt="Pune" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Pune_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Pune.png")}/>
						<span className="puneText text-capitalize">pune</span>
						<span className="puneNumber  text-center">{this.search('pune')}</span>
					</div>

					<div className="ahmadnagar"> 
						<img src="/Maps/Maharashtra/Ahmadnagar.png" alt="Ahmadnagar" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Ahmadnagar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Ahmadnagar.png")}/>
						<span className="ahmadnagarText text-capitalize">ahmadnagar</span>
						<span className="ahmadnagarNumber  text-center">{this.search('ahmadnagar')}</span>
					</div>

					<div className="aurangabadMah"> 
						<img src="/Maps/Maharashtra/Aurangabad.png" alt="Aurangabad" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Aurangabad_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Aurangabad.png")}/>
						<span className="aurangabadMahText text-capitalize">aurangabad</span>
						<span className="aurangabadMahNumber  text-center">{this.search('aurangabad')}</span>
					</div>

					<div className="nashik"> 
						<img src="/Maps/Maharashtra/Nashik.png" alt="Nashik" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Nashik_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Nashik.png")}/>
						<span className="nashikText text-capitalize">nashik</span>
						<span className="nashikNumber  text-center">{this.search('nashik')}</span>
					</div>

					<div className="dhule"> 
						<img src="/Maps/Maharashtra/Dhule.png" alt="Dhule" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Dhule_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Dhule.png")}/>
						<span className="dhuleText text-capitalize">dhule</span>
						<span className="dhuleNumber  text-center">{this.search('dhule')}</span>
					</div>

					<div className="nandurbar"> 
						<img src="/Maps/Maharashtra/Nandurbar.png" alt="Nandurbar" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Nandurbar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Nandurbar.png")}/>
						<span className="nandurbarText text-capitalize">nandurbar</span>
						<span className="nandurbarNumber  text-center">{this.search('nandurbar')}</span>
					</div>

					<div className="jalgaon"> 
						<img src="/Maps/Maharashtra/Jalgaon.png" alt="Jalgaon" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Jalgaon_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Jalgaon.png")}/>
						<span className="jalgaonText text-capitalize">jalgaon</span>
						<span className="jalgaonNumber  text-center">{this.search('jalgaon')}</span>
					</div>

					<div className="buldhana"> 
						<img src="/Maps/Maharashtra/Buldhana.png" alt="Buldhana" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Buldhana_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Buldhana.png")}/>
						<span className="buldhanaText text-capitalize">buldhana</span>
						<span className="buldhanaNumber  text-center">{this.search('buldhana')}</span>
					</div>

					<div className="jalna"> 
						<img src="/Maps/Maharashtra/Jalna.png" alt="Jalna" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Jalna_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Jalna.png")}/>
						<span className="jalnaText text-capitalize">jalna</span>
						<span className="jalnaNumber  text-center">{this.search('jalna')}</span>
					</div>

					<div className="beed"> 
						<img src="/Maps/Maharashtra/Beed.png" alt="Beed" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Beed_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Beed.png")}/>
						<span className="beedText text-capitalize">beed</span>
						<span className="beedNumber  text-center">{this.search('beed')}</span>
					</div>
					
					<div className="usmanabad"> 
						<img src="/Maps/Maharashtra/Usmanabad.png" alt="Usmanabad" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Usmanabad_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Usmanabad.png")}/>
						<span className="usmanabadText text-capitalize">usmanabad</span>
						<span className="usmanabadNumber  text-center">{this.search('usmanabad')}</span>
					</div>

					<div className="solapur"> 
						<img src="/Maps/Maharashtra/Solapur.png" alt="Solapur" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Solapur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Solapur.png")}/>
						<span className="solapurText text-capitalize">solapur</span>
						<span className="solapurNumber  text-center">{this.search('solapur')}</span>
					</div>

					<div className="latur"> 
						<img src="/Maps/Maharashtra/Latur.png" alt="Latur" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Latur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Latur.png")}/>
						<span className="laturText text-capitalize">latur</span>
						<span className="laturNumber  text-center">{this.search('latur')}</span>
					</div>

					<div className="parbhani"> 
						<img src="/Maps/Maharashtra/Parbhani.png" alt="Parbhani" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Parbhani_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Parbhani.png")}/>
						<span className="parbhaniText text-capitalize">parbhani</span>
						<span className="parbhaniNumber  text-center">{this.search('parbhani')}</span>
					</div>

					<div className="akola"> 
						<img src="/Maps/Maharashtra/Akola.png" alt="Akola" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Akola_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Akola.png")}/>
						<span className="akolaText text-capitalize">akola</span>
						<span className="akolaNumber  text-center">{this.search('akola')}</span>
					</div>

					<div className="washim"> 
						<img src="/Maps/Maharashtra/Washim.png" alt="Washim" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Washim_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Washim.png")}/>
						<span className="washimText text-capitalize">washim</span>
						<span className="washimNumber  text-center">{this.search('washim')}</span>
					</div>

					<div className="hingoli"> 
						<img src="/Maps/Maharashtra/Hingoli.png" alt="Hingoli" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Hingoli_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Hingoli.png")}/>
						<span className="hingoliText text-capitalize">hingoli</span>
						<span className="hingoliNumber  text-center">{this.search('hingoli')}</span>
					</div>
					
					<div className="nanded"> 
						<img src="/Maps/Maharashtra/Nanded.png" alt="Nanded" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Nanded_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Nanded.png")}/>
						<span className="nandedText text-capitalize">nanded</span>
						<span className="nandedNumber  text-center">{this.search('nanded')}</span>
					</div>

					<div className="yawatmal"> 
						<img src="/Maps/Maharashtra/Yawatmal.png" alt="Yawatmal" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Yawatmal_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Yawatmal.png")}/>
						<span className="yawatmalText text-capitalize">yawatmal</span>
						<span className="yawatmalNumber  text-center">{this.search('yawatmal')}</span>
					</div>

					<div className="amrawati"> 
						<img src="/Maps/Maharashtra/Amrawati.png" alt="Amrawati" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Amrawati_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Amrawati.png")}/>
						<span className="amrawatiText text-capitalize">amrawati</span>
						<span className="amrawatiNumber  text-center">{this.search('amrawati')}</span>
					</div>
					
					<div className="wardha"> 
						<img src="/Maps/Maharashtra/Wardha.png" alt="Wardha" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Wardha_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Wardha.png")}/>
						<span className="wardhaText text-capitalize">wardha</span>
						<span className="wardhaNumber  text-center">{this.search('wardha')}</span>
					</div>
					
					<div className="nagpur"> 
						<img src="/Maps/Maharashtra/Nagpur.png" alt="Nagpur" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Nagpur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Nagpur.png")}/>
						<span className="nagpurText text-capitalize">nagpur</span>
						<span className="nagpurNumber  text-center">{this.search('nagpur')}</span>
					</div>

					<div className="chandrpur"> 
						<img src="/Maps/Maharashtra/Chandrpur.png" alt="Chandrpur" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Chandrpur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Chandrpur.png")}/>
						<span className="chandrpurText text-capitalize">chandrpur</span>
						<span className="chandrpurNumber  text-center">{this.search('chandrpur')}</span>
					</div>
					
					<div className="bhandara"> 
						<img src="/Maps/Maharashtra/Bhandara.png" alt="Bhandara" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Bhandara_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Bhandara.png")}/>
						<span className="bhandaraText text-capitalize">bhandara</span>
						<span className="bhandaraNumber  text-center">{this.search('bhandara')}</span>
					</div>
					
					<div className="gondia"> 
						<img src="/Maps/Maharashtra/Gondia.png" alt="Gondia" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Gondia_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Gondia.png")}/>
						<span className="gondiaText text-capitalize">gondia</span>
						<span className="gondiaNumber  text-center">{this.search('gondia')}</span>
					</div>
					
					<div className="gadchiroli"> 
						<img src="/Maps/Maharashtra/Gadchiroli.png" alt="Gadchiroli" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Gadchiroli_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Gadchiroli.png")}/>
						<span className="gadchiroliText text-capitalize">gadchiroli</span>
						<span className="gadchiroliNumber  text-center">{this.search('gadchiroli')}</span>
					</div>
				</div>
			</div>
		);
	}
}