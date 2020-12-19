import React, {Component} from 'react';

import './MadhyaPradesh.css';
import '../global.css';


export default class MadhyaPradesh extends Component{
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
				<div className="stateWrapper" style={{width:"90%"}}>
					<div className="alirajpur classHover" > 
						<img src="/Maps/Madhya_Pradesh/Alirajpur.png" alt="Alirajpur" onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Alirajpur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Alirajpur.png")}/>
						<span className="alirajpurText mapTextLabel text-capitalize">alirajpur</span>
						<span className="alirajpurNumber mapCountLabel text-center">{this.search('alirajpur')}</span>
					</div>
					<div  className="jhabua classHover"> 
						<img src="/Maps/Madhya_Pradesh/Jhabua.png" alt="Jhabua"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Jhabua_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Jhabua.png")}/>
						<span className="jhabuaText  mapTextLabel text-capitalize">jhabua</span>
						<span className="jhabuaNumber mapCountLabel   text-center">{this.search('jhabua')}</span>
					</div>
					<div  className="ratlam classHover"> 
						<img src="/Maps/Madhya_Pradesh/Ratlam.png" alt="Ratlam"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Ratlam_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Ratlam.png")}/>
						<span className="ratlamText  mapTextLabel text-capitalize">ratlam</span>
						<span className="ratlamNumber  mapCountLabel  text-center">{this.search('ratlam')}</span>
					</div>
					<div  className="mandsaur classHover"> 
						<img src="/Maps/Madhya_Pradesh/Mandsaur.png" alt="Mandsaur"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Mandsaur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Mandsaur.png")}/>
						<span className="mandsaurText  mapTextLabel text-capitalize">mandsaur</span>
						<span className="mandsaurNumber  mapCountLabel  text-center">{this.search('mandsaur')}</span>
					</div>
					<div className="neemuch classHover"> 
						<img src="/Maps/Madhya_Pradesh/Neemuch.png" alt="Neemuch"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Neemuch_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Neemuch.png")}/>
						<span className="neemuchText  mapTextLabel text-capitalize">neemuch</span>
						<span className="neemuchNumber mapCountLabel   text-center">{this.search('neemuch')}</span>
					</div>
					<div className="barwani classHover"> 
						<img src="/Maps/Madhya_Pradesh/Barwani.png" alt="Barwani"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Barwani_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Barwani.png")}/>
						<span className="barwaniText  mapTextLabel text-capitalize">barwani</span>
						<span className="barwaniNumber  mapCountLabel  text-center">{this.search('barwani')}</span>
					</div>
					<div className="khargone classHover"> 
						<img src="/Maps/Madhya_Pradesh/Khargone.png" alt="Khargone"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Khargone_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Khargone.png")}/>
						<span className="khargoneText mapTextLabel  text-capitalize">khargone</span>
						<span className="khargoneNumber  mapCountLabel  text-center">{this.search('khargone')}</span>
					</div>
					<div className="burhanpur classHover"> 
						<img src="/Maps/Madhya_Pradesh/Burhanpur.png" alt="Burhanpur"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Burhanpur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Burhanpur.png")}/>
						<span className="burhanpurText mapTextLabel  text-capitalize">burhanpur</span>
						<span className="burhanpurNumber  mapCountLabel  text-center">{this.search('burhanpur')}</span>
					</div>
					<div className="khandwa classHover"> 
						<img src="/Maps/Madhya_Pradesh/Khandwa.png" alt="Khandwa"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Khandwa_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Khandwa.png")}/>
						<span className="khandwaText  mapTextLabel text-capitalize">khandwa</span>
						<span className="khandwaNumber mapCountLabel   text-center">{this.search('khandwa')}</span>
					</div>
					<div className="harda classHover"> 
						<img src="/Maps/Madhya_Pradesh/Harda.png" alt="Harda"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Harda_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Harda.png")}/>
						<span className="hardaText  mapTextLabel text-capitalize">harda</span>
						<span className="hardaNumber  mapCountLabel  text-center">{this.search('harda')}</span>
					</div>
					<div className="betul classHover"> 
						<img src="/Maps/Madhya_Pradesh/Betul.png" alt="Betul"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Betul_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Betul.png")}/>
						<span className="betulText  mapTextLabel text-capitalize">betul</span>
						<span className="betulNumber  mapCountLabel  text-center">{this.search('betul')}</span>
					</div>
					<div className="chhindwara classHover"> 
						<img src="/Maps/Madhya_Pradesh/Chhindwara.png" alt="Chhindwara"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Chhindwara_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Chhindwara.png")}/>
						<span className="chhindwaraText  mapTextLabel  text-capitalize">chhindwara</span>
						<span className="chhindwaraNumber mapCountLabel   text-center">{this.search('chhindwara')}</span>
					</div>
					<div className="seoni classHover"> 
						<img src="/Maps/Madhya_Pradesh/Seoni.png" className="" alt="Seoni"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Seoni_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Seoni.png")}/>
						<span className="seoniText mapTextLabel text-capitalize">seoni</span>
						<span className="seoniNumber  mapCountLabel  text-center">{this.search('seoni')}</span>
					</div>
					<div className="balaghat classHover"> 
						<img src="/Maps/Madhya_Pradesh/Balaghat.png" alt="Balaghat"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Balaghat_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Balaghat.png")}/>
						<span className="balaghatText mapTextLabel  text-capitalize">balaghat</span>
						<span className="balaghatNumber mapCountLabel   text-center">{this.search('balaghat')}</span>
					</div>
					<div className="mandla classHover"> 
						<img src="/Maps/Madhya_Pradesh/Mandla.png" alt="Mandla" onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Mandla_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Mandla.png")}/>
						<span className="mandlaText mapTextLabel text-capitalize">mandla</span>
						<span className="mandlaNumber  mapCountLabel  text-center">{this.search('mandla')}</span>
					</div>
					<div className="dindori classHover"> 
						<img src="/Maps/Madhya_Pradesh/Dindori.png" alt="Dindori"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Dindori_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Dindori.png")}/>
						<span className="dindoriText  mapTextLabel text-capitalize">dindori</span>
						<span className="dindoriNumber  mapCountLabel  text-center">{this.search('dindori')}</span>
					</div>
					<div className="annupur classHover"> 
						<img src="/Maps/Madhya_Pradesh/Annupur.png" alt="Annupur"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Annupur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Annupur.png")}/>
						<span className="annupurText  mapTextLabel text-capitalize">annupur</span>
						<span className="annupurNumber  mapCountLabel  text-center">{this.search('annupur')}</span>
					</div>
					<div className="shahdol classHover"> 
						<img src="/Maps/Madhya_Pradesh/Shahdol.png" alt="Shahdol"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Shahdol_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Shahdol.png")}/>
						<span className="shahdolText  mapTextLabel text-capitalize">shahdol</span>
						<span className="shahdolNumber  mapCountLabel  text-center">{this.search('shahdol')}</span>
					</div>
					<div className="sidhi classHover"> 
						<img src="/Maps/Madhya_Pradesh/Sidhi.png" alt="Sidhi"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Sidhi_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Sidhi.png")}/>
						<span className="sidhiText mapTextLabel  text-capitalize">sidhi</span>
						<span className="sidhiNumber  mapCountLabel  text-center">{this.search('sidhi')}</span>
					</div>
					<div className="singrauli classHover"> 
						<img src="/Maps/Madhya_Pradesh/Singrauli.png" alt="Singrauli"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Singrauli_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Singrauli.png")}/>
						<span className="singrauliText  mapTextLabel text-capitalize">singrauli</span>
						<span className="singrauliNumber  mapCountLabel  text-center">{this.search('singrauli')}</span>
					</div>
					<div className="rewa classHover"> 
						<img src="/Maps/Madhya_Pradesh/Rewa.png" alt="Rewa"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Rewa_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Rewa.png")}/>
						<span className="rewaText mapTextLabel  text-capitalize">rewa</span>
						<span className="rewaNumber  mapCountLabel  text-center">{this.search('rewa')}</span>
					</div>
					<div className="satna classHover"> 
						<img src="/Maps/Madhya_Pradesh/Satna.png" alt="Satna"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Satna_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Satna.png")}/>
						<span className="satnaText  mapTextLabel text-capitalize">satna</span>
						<span className="satnaNumber  mapCountLabel  text-center">{this.search('satna')}</span>
					</div>
					<div className="umaria classHover"> 
						<img src="/Maps/Madhya_Pradesh/Umaria.png" alt="Umaria"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Umaria_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Umaria.png")}/>
						<span className="umariaText  mapTextLabel text-capitalize">umaria</span>
						<span className="umariaNumber  mapCountLabel  text-center">{this.search('umaria')}</span>
					</div>
					<div className="katni classHover"> 
						<img src="/Maps/Madhya_Pradesh/Katni.png" alt="Katni"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Katni_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Katni.png")}/>
						<span className="katniText mapTextLabel  text-capitalize">katni</span>
						<span className="katniNumber  mapCountLabel  text-center">{this.search('katni')}</span>
					</div>
					<div className="jabalpur classHover"> 
						<img src="/Maps/Madhya_Pradesh/Jabalpur.png" alt="Jabalpur"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Jabalpur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Jabalpur.png")}/>
						<span className="jabalpurText mapTextLabel  text-capitalize">jabalpur</span>
						<span className="jabalpurNumber  mapCountLabel  text-center">{this.search('jabalpur')}</span>
					</div>
					<div className="narsinghpur classHover"> 
						<img src="/Maps/Madhya_Pradesh/Narsinghpur.png" alt="Narsinghpur"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Narsinghpur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Narsinghpur.png")}/>
						<span className="narsinghpurText  mapTextLabel text-capitalize">narsinghpur</span>
						<span className="narsinghpurNumber  mapCountLabel  text-center">{this.search('narsinghpur')}</span>
					</div>
					
					<div className="dewas classHover"> 
						<img src="/Maps/Madhya_Pradesh/Dewas.png" alt="Dewas"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Dewas_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Dewas.png")}/>
						<span className="dewasText  mapTextLabel text-capitalize">dewas</span>
						<span className="dewasNumber  mapCountLabel  text-center">{this.search('dewas')}</span>
					</div>
					<div className="indore classHover"> 
						<img src="/Maps/Madhya_Pradesh/Indore.png" alt="Indore"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Indore_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Indore.png")}/>
						<span className="indoreText  mapTextLabel text-capitalize">indore</span>
						<span className="indoreNumber  mapCountLabel  text-center">{this.search('indore')}</span>
					</div>
					<div className="dhar classHover"> 
						<img src="/Maps/Madhya_Pradesh/Dhar.png" alt="Dhar"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Dhar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Dhar.png")}/>
						<span className="dharText  mapTextLabel text-capitalize">dhar</span>
						<span className="dharNumber  mapCountLabel  text-center">{this.search('dhar')}</span>
					</div>
					<div className="ujjain classHover"> 
						<img src="/Maps/Madhya_Pradesh/Ujjain.png" alt="Ujjain"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Ujjain_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Ujjain.png")}/>
						<span className="ujjainText  mapTextLabel text-capitalize">ujjain</span>
						<span className="ujjainNumber  mapCountLabel  text-center">{this.search('ujjain')}</span>
					</div>
					<div className="shajapur classHover"> 
						<img src="/Maps/Madhya_Pradesh/Shajapur.png" alt="Shajapur"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Shajapur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Shajapur.png")}/>
						<span className="shajapurText  mapTextLabel text-capitalize">shajapur</span>
						<span className="shajapurNumber  mapCountLabel  text-center">{this.search('shajapur')}</span>
					</div>
					<div className="sehore classHover"> 
						<img src="/Maps/Madhya_Pradesh/Sehore.png" alt="Sehore"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Sehore_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Sehore.png"}/>
						<span className="sehoreText mapTextLabel  text-capitalize">sehore</span>
						<span className="sehoreNumber  mapCountLabel  text-center">{this.search('sehore')}</span>
					</div>
					<div className="hoshangabad classHover"> 
						<img src="/Maps/Madhya_Pradesh/Hoshangabad.png" alt="Hoshangabad"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Hoshangabad_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Hoshangabad.png"}/>
						<span className="hoshangabadText mapTextLabel text-capitalize">hoshangabad</span>
						<span className="hoshangabadNumber  mapCountLabel  text-center">{this.search('hoshangabad')}</span>
					</div>
					<div className="agarMalwa classHover"> 
						<img src="/Maps/Madhya_Pradesh/Agar_Malwa.png" alt="Agar_Malwa"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Agar_Malwa_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Agar_Malwa.png"}/>
						<span className="agarMalwaText  mapTextLabel text-capitalize">agarMalwa</span>
						<span className="agarMalwaNumber  mapCountLabel  text-center">{this.search('agarMalwa')}</span>
					</div>
					<div className="rajgarh classHover"> 
						<img src="/Maps/Madhya_Pradesh/Rajgarh.png" alt="Rajgarh"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Rajgarh_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Rajgarh.png"}/>
						<span className="rajgarhText mapTextLabel text-capitalize">rajgarh</span>
						<span className="rajgarhNumber  mapCountLabel  text-center">{this.search('rajgarh')}</span>
					</div>
					<div className="bhopal classHover"> 
						<img src="/Maps/Madhya_Pradesh/Bhopal.png" alt="Bhopal"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Bhopal_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Bhopal.png"}/>
						<span className="bhopalText  mapTextLabel text-capitalize">bhopal</span>
						<span className="bhopalNumber  mapCountLabel  text-center">{this.search('bhopal')}</span>
					</div>
					<div className="raisen classHover"> 
						<img src="/Maps/Madhya_Pradesh/Raisen.png" alt="Raisen"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Raisen_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Raisen.png"}/>
						<span className="raisenText  mapTextLabel text-capitalize">raisen</span>
						<span className="raisenNumber mapCountLabel  text-center">{this.search('raisen')}</span>
					</div>
					<div className="sagar classHover"> 
						<img src="/Maps/Madhya_Pradesh/Sagar.png" alt="Sagar"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Sagar_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Sagar.png"}/>
						<span className="sagarText mapTextLabel  text-capitalize">sagar</span>
						<span className="sagarNumber  mapCountLabel  text-center">{this.search('sagar')}</span>
					</div>
					<div className="damoh classHover"> 
						<img src="/Maps/Madhya_Pradesh/Damoh.png" alt="Damoh"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Damoh_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Damoh.png"}/>
						<span className="damohText mapTextLabel text-capitalize">damoh</span>
						<span className="damohNumber  mapCountLabel  text-center">{this.search('damoh')}</span>
					</div>
					<div className="panna classHover"> 
						<img src="/Maps/Madhya_Pradesh/Panna.png" alt="Panna"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Panna_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Panna.png"}/>
						<span className="pannaText mapTextLabel  text-capitalize">panna</span>
						<span className="pannaNumber  mapCountLabel  text-center">{this.search('panna')}</span>
					</div>
					<div className="chhatarpur classHover"> 
						<img src="/Maps/Madhya_Pradesh/Chhatarpur.png" alt="Chhatarpur"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Chhatarpur_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Chhatarpur.png"}/>
						<span className="chhatarpurText  mapTextLabel text-capitalize">chhatarpur</span>
						<span className="chhatarpurNumber  mapCountLabel  text-center">{this.search('chhatarpur')}</span>
					</div>
					<div className="tikamgarh classHover"> 
						<img src="/Maps/Madhya_Pradesh/Tikamgarh.png" alt="Tikamgarh"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Tikamgarh_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Tikamgarh.png"}/>
						<span className="tikamgarhText  mapTextLabel text-capitalize">tikamgarh</span>
						<span className="tikamgarhNumber  mapCountLabel  text-center">{this.search('tikamgarh')}</span>
					</div>
					<div className="niwari classHover"> 
						<img src="/Maps/Madhya_Pradesh/Niwari.png" alt="Niwari"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Niwari_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Niwari.png"}/>
						<span className="niwariText  mapTextLabel text-capitalize">niwari</span>
						<span className="niwariNumber  mapCountLabel  text-center">{this.search('niwari')}</span>
					</div>
					<div className="vidisha classHover"> 
						<img src="/Maps/Madhya_Pradesh/Vidisha.png" alt="Vidisha"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Vidisha_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Vidisha.png"}/>
						<span className="vidishaText  mapTextLabel text-capitalize">vidisha</span>
						<span className="vidishaNumber  mapCountLabel  text-center">{this.search('vidisha')}</span>
					</div>
					<div className="guna classHover"> 
						<img src="/Maps/Madhya_Pradesh/Guna.png" alt="Guna"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Guna_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Guna.png"}/>
						<span className="gunaText mapTextLabel  text-capitalize">guna</span>
						<span className="gunaNumber  mapCountLabel  text-center">{this.search('guna')}</span>
					</div>
					<div className="ashoknagar classHover"> 
						<img src="/Maps/Madhya_Pradesh/Ashoknagar.png" alt="Ashoknagar"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Ashoknagar_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Ashoknagar.png"}/>
						<span className="ashoknagarText mapTextLabel  text-capitalize">ashoknagar</span>
						<span className="ashoknagarNumber  mapCountLabel  text-center">{this.search('ashoknagar')}</span>
					</div>
					<div className="shivpuri classHover"> 
						<img src="/Maps/Madhya_Pradesh/Shivpuri.png" className="" alt="Shivpuri"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Shivpuri_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Shivpuri.png"}/>
						<span className="shivpuriText mapTextLabel  text-capitalize">shivpuri</span>
						<span className="shivpuriNumber mapCountLabel text-center">{this.search('shivpuri')}</span>
					</div>
					<div className="sheopur classHover"> 
						<img src="/Maps/Madhya_Pradesh/Sheopur.png" className="" alt="Sheopur"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Sheopur_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Sheopur.png"}/>
						<span className="sheopurText  mapTextLabel text-capitalize">sheopur</span>
						<span className="sheopurNumber  mapCountLabel  text-center">{this.search('sheopur')}</span>
					</div>
					<div className="gwalior classHover"> 
						<img src="/Maps/Madhya_Pradesh/Gwalior.png" className="" alt="Gwalior"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Gwalior_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Gwalior.png"}/>
						<span className="gwaliorText mapTextLabel  text-capitalize">gwalior</span>
						<span className="gwaliorNumber  mapCountLabel  text-center">{this.search('gwalior')}</span>
					</div>
					<div className="datia classHover"> 
						<img src="/Maps/Madhya_Pradesh/Datia.png" className="" alt="Datia"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Datia_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Datia.png"}/>
						<span className="datiaText mapTextLabel  text-capitalize">datia</span>
						<span className="datiaNumber  mapCountLabel  text-center">{this.search('datia')}</span>
					</div>
					<div className="bhind classHover"> 
						<img src="/Maps/Madhya_Pradesh/Bhind.png" className="" alt="Bhind"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Bhind_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Bhind.png"}/>
						<span className="bhindText mapTextLabel  text-capitalize">bhind</span>
						<span className="bhindNumber  mapCountLabel  text-center">{this.search('bhind')}</span>
					</div>
					<div className="morena classHover"> 
						<img src="/Maps/Madhya_Pradesh/Morena.png" className="" alt="Morena"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Morena_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Morena.png"}/>
						<span className="morenaText mapTextLabel  text-capitalize">morena</span>
						<span className="morenaNumber  mapCountLabel  text-center">{this.search('morena')}</span>
					</div>
					
				</div>
			</div>
		);
	}
}