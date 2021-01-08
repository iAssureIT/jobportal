import React, {Component}     from 'react';
import Axios 				  from 'axios';
import Swal 				  from 'sweetalert2';
import {Redirect}             from 'react-router-dom';
import { withRouter }         from 'react-router-dom';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../common/actions/index';
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

					<div className="thane classHover"> 
						<img src="/Maps/Maharashtra/Thane.png" alt="Thane" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Thane_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Thane.png")}/>
						<span className="thaneText  mapTextLabel text-capitalize">Thane</span>
						<span className="thaneNumber  mapCountLabel  text-center">{this.search('thane')}</span>
					</div>

					<div className="mumbai classHover"> 
						<img src="/Maps/Maharashtra/Mumbai_City.png" alt="Mumbai_City" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Mumbai_City_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Mumbai_City.png")}/>
						<span className="mumbaiText mapTextLabel text-capitalize">Mumbai City</span>
						<span className="mumbaiNumber mapCountLabel text-center">{this.search('mumbai')}</span>
					</div>

					<div className="raigad classHover"> 
						<img src="/Maps/Maharashtra/Raigad.png" alt="Raigad" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Raigad_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Raigad.png")}/>
						<span className="raigadText  mapTextLabel text-capitalize">Raigad</span>
						<span className="raigadNumber mapCountLabel text-center">{this.search('raigad')}</span>
					</div>

					<div className="ratnagiri classHover"> 
						<img src="/Maps/Maharashtra/Ratnagiri.png" alt="Ratnagiri" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Ratnagiri_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Ratnagiri.png")}/>
						<span className="ratnagiriText mapTextLabel  text-capitalize">ratnagiri</span>
						<span className="ratnagiriNumber mapCountLabel text-center">{this.search('ratnagiri')}</span>
					</div>

					<div className="sindhudurg classHover"> 
						<img src="/Maps/Maharashtra/Sindhudurg.png" alt="Sindhudurg" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Sindhudurg_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Sindhudurg.png")}/>
						<span className="sindhudurgText  mapTextLabel text-capitalize">sindhudurg</span>
						<span className="sindhudurgNumber mapCountLabel text-center">{this.search('sindhudurg')}</span>
					</div>

					<div className="kolhapur classHover"> 
						<img src="/Maps/Maharashtra/Kolhapur.png" alt="Kolhapur" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Kolhapur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Kolhapur.png")}/>
						<span className="kolhapurText  mapTextLabel text-capitalize">kolhapur</span>
						<span className="kolhapurNumber mapCountLabel text-center">{this.search('kolhapur')}</span>
					</div>

					<div className="sangli classHover"> 
						<img src="/Maps/Maharashtra/Sangli.png" alt="Sangli" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Sangli_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Sangli.png")}/>
						<span className="sangliText mapTextLabel  text-capitalize">sangli</span>
						<span className="sangliNumber mapCountLabel text-center">{this.search('sangli')}</span>
					</div>

					<div className="satara classHover"> 
						<img src="/Maps/Maharashtra/Satara.png" alt="Satara" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Satara_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Satara.png")}/>
						<span className="sataraText mapTextLabel text-capitalize">satara</span>
						<span className="sataraNumber mapCountLabel text-center">{this.search('satara')}</span>
					</div>

					<div className="palghar classHover"> 
						<img src="/Maps/Maharashtra/Palghar.png" alt="Palghar" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Palghar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Palghar.png")}/>
						<span className="palgharText  mapTextLabel text-capitalize">palghar</span>
						<span className="palgharNumber  mapCountLabel  text-center">{this.search('palghar')}</span>
					</div>

					<div className="ahmadnagar classHover"> 
						<img src="/Maps/Maharashtra/Ahmadnagar.png" alt="Ahmadnagar" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Ahmadnagar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Ahmadnagar.png")}/>
						<span className="ahmadnagarText  mapTextLabel text-capitalize">ahmadnagar</span>
						<span className="ahmadnagarNumber  mapCountLabel  text-center">{this.search('ahmadnagar')}</span>
					</div>

					<div className="pune classHover"> 
						<img src="/Maps/Maharashtra/Pune.png" alt="Pune" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Pune_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Pune.png")}/>
						<span className="puneText mapTextLabel  text-capitalize">pune</span>
						<span className="puneNumber  mapCountLabel  text-center">{this.search('pune')}</span>
					</div>

					<div className="aurangabadMah classHover"> 
						<img src="/Maps/Maharashtra/Aurangabad.png" alt="Aurangabad" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Aurangabad_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Aurangabad.png")}/>
						<span className="aurangabadMahText mapTextLabel text-capitalize">aurangabad</span>
						<span className="aurangabadMahNumber  mapCountLabel  text-center">{this.search('aurangabad')}</span>
					</div>

					<div className="nashik classHover"> 
						<img src="/Maps/Maharashtra/Nashik.png" alt="Nashik" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Nashik_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Nashik.png")}/>
						<span className="nashikText  mapTextLabel text-capitalize">nashik</span>
						<span className="nashikNumber  mapCountLabel  text-center">{this.search('nashik')}</span>
					</div>

					<div className="dhule classHover"> 
						<img src="/Maps/Maharashtra/Dhule.png" alt="Dhule" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Dhule_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Dhule.png")}/>
						<span className="dhuleText  mapTextLabel text-capitalize">dhule</span>
						<span className="dhuleNumber  mapCountLabel  text-center">{this.search('dhule')}</span>
					</div>

					<div className="nandurbar classHover"> 
						<img src="/Maps/Maharashtra/Nandurbar.png" alt="Nandurbar" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Nandurbar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Nandurbar.png")}/>
						<span className="nandurbarText  mapTextLabel text-capitalize">nandurbar</span>
						<span className="nandurbarNumber  mapCountLabel  text-center">{this.search('nandurbar')}</span>
					</div>

					<div className="jalgaon classHover"> 
						<img src="/Maps/Maharashtra/Jalgaon.png" alt="Jalgaon" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Jalgaon_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Jalgaon.png")}/>
						<span className="jalgaonText  mapTextLabel text-capitalize">jalgaon</span>
						<span className="jalgaonNumber  mapCountLabel  text-center">{this.search('jalgaon')}</span>
					</div>

					<div className="buldhana classHover"> 
						<img src="/Maps/Maharashtra/Buldhana.png" alt="Buldhana" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Buldhana_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Buldhana.png")}/>
						<span className="buldhanaText  mapTextLabel text-capitalize">buldhana</span>
						<span className="buldhanaNumber  mapCountLabel  text-center">{this.search('buldhana')}</span>
					</div>

					<div className="jalna classHover"> 
						<img src="/Maps/Maharashtra/Jalna.png" alt="Jalna" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Jalna_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Jalna.png")}/>
						<span className="jalnaText  mapTextLabel text-capitalize">jalna</span>
						<span className="jalnaNumber  mapCountLabel  text-center">{this.search('jalna')}</span>
					</div>

					<div className="beed classHover"> 
						<img src="/Maps/Maharashtra/Beed.png" alt="Beed" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Beed_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Beed.png")}/>
						<span className="beedText  mapTextLabel text-capitalize">beed</span>
						<span className="beedNumber  mapCountLabel  text-center">{this.search('beed')}</span>
					</div>
					
					<div className="usmanabad classHover"> 
						<img src="/Maps/Maharashtra/Usmanabad.png" alt="Usmanabad" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Usmanabad_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Usmanabad.png")}/>
						<span className="usmanabadText  mapTextLabel text-capitalize">usmanabad</span>
						<span className="usmanabadNumber  mapCountLabel  text-center">{this.search('usmanabad')}</span>
					</div>

					<div className="solapur classHover"> 
						<img src="/Maps/Maharashtra/Solapur.png" alt="Solapur" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Solapur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Solapur.png")}/>
						<span className="solapurText  mapTextLabel text-capitalize">solapur</span>
						<span className="solapurNumber  mapCountLabel  text-center">{this.search('solapur')}</span>
					</div>

					<div className="latur classHover"> 
						<img src="/Maps/Maharashtra/Latur.png" alt="Latur" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Latur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Latur.png")}/>
						<span className="laturText mapTextLabel  text-capitalize">latur</span>
						<span className="laturNumber  mapCountLabel  text-center">{this.search('latur')}</span>
					</div>

					<div className="parbhani classHover"> 
						<img src="/Maps/Maharashtra/Parbhani.png" alt="Parbhani" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Parbhani_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Parbhani.png")}/>
						<span className="parbhaniText mapTextLabel  text-capitalize">parbhani</span>
						<span className="parbhaniNumber  mapCountLabel  text-center">{this.search('parbhani')}</span>
					</div>

					<div className="akola classHover"> 
						<img src="/Maps/Maharashtra/Akola.png" alt="Akola" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Akola_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Akola.png")}/>
						<span className="akolaText mapTextLabel  text-capitalize">akola</span>
						<span className="akolaNumber  mapCountLabel  text-center">{this.search('akola')}</span>
					</div>

					<div className="washim classHover"> 
						<img src="/Maps/Maharashtra/Washim.png" alt="Washim" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Washim_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Washim.png")}/>
						<span className="washimText  mapTextLabel text-capitalize">washim</span>
						<span className="washimNumber  mapCountLabel  text-center">{this.search('washim')}</span>
					</div>

					<div className="hingoli classHover"> 
						<img src="/Maps/Maharashtra/Hingoli.png" alt="Hingoli" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Hingoli_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Hingoli.png")}/>
						<span className="hingoliText  mapTextLabel text-capitalize">hingoli</span>
						<span className="hingoliNumber  mapCountLabel  text-center">{this.search('hingoli')}</span>
					</div>
					
					<div className="nanded classHover"> 
						<img src="/Maps/Maharashtra/Nanded.png" alt="Nanded" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Nanded_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Nanded.png")}/>
						<span className="nandedText  mapTextLabel text-capitalize">nanded</span>
						<span className="nandedNumber  mapCountLabel  text-center">{this.search('nanded')}</span>
					</div>

					<div className="yawatmal classHover"> 
						<img src="/Maps/Maharashtra/Yawatmal.png" alt="Yawatmal" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Yawatmal_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Yawatmal.png")}/>
						<span className="yawatmalText  mapTextLabel text-capitalize">yawatmal</span>
						<span className="yawatmalNumber  mapCountLabel  text-center">{this.search('yawatmal')}</span>
					</div>

					<div className="amrawati classHover"> 
						<img src="/Maps/Maharashtra/Amrawati.png" alt="Amrawati" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Amrawati_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Amrawati.png")}/>
						<span className="amrawatiText  mapTextLabel text-capitalize">amrawati</span>
						<span className="amrawatiNumber  mapCountLabel  text-center">{this.search('amrawati')}</span>
					</div>
					
					<div className="wardha classHover"> 
						<img src="/Maps/Maharashtra/Wardha.png" alt="Wardha" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Wardha_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Wardha.png")}/>
						<span className="wardhaText  mapTextLabel text-capitalize">wardha</span>
						<span className="wardhaNumber  mapCountLabel  text-center">{this.search('wardha')}</span>
					</div>
					
					<div className="nagpur classHover"> 
						<img src="/Maps/Maharashtra/Nagpur.png" alt="Nagpur" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Nagpur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Nagpur.png")}/>
						<span className="nagpurText  mapTextLabel text-capitalize">nagpur</span>
						<span className="nagpurNumber mapCountLabel  text-center">{this.search('nagpur')}</span>
					</div>

					<div className="chandrpur classHover"> 
						<img src="/Maps/Maharashtra/Chandrpur.png" alt="Chandrpur" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Chandrpur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Chandrpur.png")}/>
						<span className="chandrpurText  mapTextLabel text-capitalize">chandrpur</span>
						<span className="chandrpurNumber  mapCountLabel  text-center">{this.search('chandrpur')}</span>
					</div>
					
					<div className="bhandara classHover"> 
						<img src="/Maps/Maharashtra/Bhandara.png" alt="Bhandara" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Bhandara_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Bhandara.png")}/>
						<span className="bhandaraText  mapTextLabel text-capitalize">bhandara</span>
						<span className="bhandaraNumber  mapCountLabel  text-center">{this.search('bhandara')}</span>
					</div>
					
					<div className="gondia classHover"> 
						<img src="/Maps/Maharashtra/Gondia.png" alt="Gondia" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Gondia_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Gondia.png")}/>
						<span className="gondiaText  mapTextLabel text-capitalize">gondia</span>
						<span className="gondiaNumber  mapCountLabel  text-center">{this.search('gondia')}</span>
					</div>
					
					<div className="gadchiroli classHover"> 
						<img src="/Maps/Maharashtra/Gadchiroli.png" alt="Gadchiroli" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Gadchiroli_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Gadchiroli.png")}/>
						<span className="gadchiroliText  mapTextLabel text-capitalize">gadchiroli</span>
						<span className="gadchiroliNumber  mapCountLabel  text-center">{this.search('gadchiroli')}</span>
					</div>

					
				</div>
			</div>
		);
	}
}