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
					<div className="alirajpur" > 
						<img src="/Maps/Madhya_Pradesh/Alirajpur.png" alt="Alirajpur" onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Alirajpur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Alirajpur.png")}/>
						<span className="alirajpurText text-capitalize">alirajpur</span>
						<span className="alirajpurNumber  text-center">{this.search('alirajpur')}</span>
					</div>
					<div  className="jhabua"> 
						<img src="/Maps/Madhya_Pradesh/Jhabua.png" alt="Jhabua"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Jhabua_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Jhabua.png")}/>
						<span className="jhabuaText text-capitalize">jhabua</span>
						<span className="jhabuaNumber  text-center">{this.search('jhabua')}</span>
					</div>
					<div  className="ratlam"> 
						<img src="/Maps/Madhya_Pradesh/Ratlam.png" alt="Ratlam"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Ratlam_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Ratlam.png")}/>
						<span className="ratlamText text-capitalize">ratlam</span>
						<span className="ratlamNumber  text-center">{this.search('ratlam')}</span>
					</div>
					<div  className="mandsaur"> 
						<img src="/Maps/Madhya_Pradesh/Mandsaur.png" alt="Mandsaur"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Mandsaur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Mandsaur.png")}/>
						<span className="mandsaurText text-capitalize">mandsaur</span>
						<span className="mandsaurNumber  text-center">{this.search('mandsaur')}</span>
					</div>
					<div className="neemuch"> 
						<img src="/Maps/Madhya_Pradesh/Neemuch.png" alt="Neemuch"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Neemuch_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Neemuch.png")}/>
						<span className="neemuchText text-capitalize">neemuch</span>
						<span className="neemuchNumber  text-center">{this.search('neemuch')}</span>
					</div>
					<div className="barwani"> 
						<img src="/Maps/Madhya_Pradesh/Barwani.png" alt="Barwani"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Barwani_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Barwani.png")}/>
						<span className="barwaniText text-capitalize">barwani</span>
						<span className="barwaniNumber  text-center">{this.search('barwani')}</span>
					</div>
					<div className="khargone"> 
						<img src="/Maps/Madhya_Pradesh/Khargone.png" alt="Khargone"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Khargone_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Khargone.png")}/>
						<span className="khargoneText text-capitalize">khargone</span>
						<span className="khargoneNumber  text-center">{this.search('khargone')}</span>
					</div>
					<div className="burhanpur"> 
						<img src="/Maps/Madhya_Pradesh/Burhanpur.png" alt="Burhanpur"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Burhanpur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Burhanpur.png")}/>
						<span className="burhanpurText text-capitalize">burhanpur</span>
						<span className="burhanpurNumber  text-center">{this.search('burhanpur')}</span>
					</div>
					<div className="khandwa"> 
						<img src="/Maps/Madhya_Pradesh/Khandwa.png" alt="Khandwa"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Khandwa_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Khandwa.png")}/>
						<span className="khandwaText text-capitalize">khandwa</span>
						<span className="khandwaNumber  text-center">{this.search('khandwa')}</span>
					</div>
					<div className="harda"> 
						<img src="/Maps/Madhya_Pradesh/Harda.png" alt="Harda"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Harda_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Harda.png")}/>
						<span className="hardaText text-capitalize">harda</span>
						<span className="hardaNumber  text-center">{this.search('harda')}</span>
					</div>
					<div className="betul"> 
						<img src="/Maps/Madhya_Pradesh/Betul.png" alt="Betul"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Betul_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Betul.png")}/>
						<span className="betulText text-capitalize">betul</span>
						<span className="betulNumber  text-center">{this.search('betul')}</span>
					</div>
					<div className="chhindwara"> 
						<img src="/Maps/Madhya_Pradesh/Chhindwara.png" alt="Chhindwara"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Chhindwara_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Chhindwara.png")}/>
						<span className="chhindwaraText text-capitalize">chhindwara</span>
						<span className="chhindwaraNumber  text-center">{this.search('chhindwara')}</span>
					</div>
					<div className="seoni"> 
						<img src="/Maps/Madhya_Pradesh/Seoni.png" className="" alt="Seoni"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Seoni_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Seoni.png")}/>
						<span className="seoniText text-capitalize">seoni</span>
						<span className="seoniNumber  text-center">{this.search('seoni')}</span>
					</div>
					<div className="balaghat"> 
						<img src="/Maps/Madhya_Pradesh/Balaghat.png" alt="Balaghat"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Balaghat_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Balaghat.png")}/>
						<span className="balaghatText text-capitalize">balaghat</span>
						<span className="balaghatNumber  text-center">{this.search('balaghat')}</span>
					</div>
					<div className="mandla"> 
						<img src="/Maps/Madhya_Pradesh/Mandla.png" alt="Mandla" onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Mandla_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Mandla.png")}/>
						<span className="mandlaText text-capitalize">mandla</span>
						<span className="mandlaNumber  text-center">{this.search('mandla')}</span>
					</div>
					<div className="dindori"> 
						<img src="/Maps/Madhya_Pradesh/Dindori.png" alt="Dindori"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Dindori_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Dindori.png")}/>
						<span className="dindoriText text-capitalize">dindori</span>
						<span className="dindoriNumber  text-center">{this.search('dindori')}</span>
					</div>
					<div className="annupur"> 
						<img src="/Maps/Madhya_Pradesh/Annupur.png" alt="Annupur"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Annupur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Annupur.png")}/>
						<span className="annupurText text-capitalize">annupur</span>
						<span className="annupurNumber  text-center">{this.search('annupur')}</span>
					</div>
					<div className="shahdol"> 
						<img src="/Maps/Madhya_Pradesh/Shahdol.png" alt="Shahdol"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Shahdol_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Shahdol.png")}/>
						<span className="shahdolText text-capitalize">shahdol</span>
						<span className="shahdolNumber  text-center">{this.search('shahdol')}</span>
					</div>
					<div className="sidhi"> 
						<img src="/Maps/Madhya_Pradesh/Sidhi.png" alt="Sidhi"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Sidhi_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Sidhi.png")}/>
						<span className="sidhiText text-capitalize">sidhi</span>
						<span className="sidhiNumber  text-center">{this.search('sidhi')}</span>
					</div>
					<div className="singrauli"> 
						<img src="/Maps/Madhya_Pradesh/Singrauli.png" alt="Singrauli"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Singrauli_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Singrauli.png")}/>
						<span className="singrauliText text-capitalize">singrauli</span>
						<span className="singrauliNumber  text-center">{this.search('singrauli')}</span>
					</div>
					<div className="rewa"> 
						<img src="/Maps/Madhya_Pradesh/Rewa.png" alt="Rewa"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Rewa_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Rewa.png")}/>
						<span className="rewaText text-capitalize">rewa</span>
						<span className="rewaNumber  text-center">{this.search('rewa')}</span>
					</div>
					<div className="satna"> 
						<img src="/Maps/Madhya_Pradesh/Satna.png" alt="Satna"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Satna_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Satna.png")}/>
						<span className="satnaText text-capitalize">satna</span>
						<span className="satnaNumber  text-center">{this.search('satna')}</span>
					</div>
					<div className="umaria"> 
						<img src="/Maps/Madhya_Pradesh/Umaria.png" alt="Umaria"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Umaria_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Umaria.png")}/>
						<span className="umariaText text-capitalize">umaria</span>
						<span className="umariaNumber  text-center">{this.search('umaria')}</span>
					</div>
					<div className="katni"> 
						<img src="/Maps/Madhya_Pradesh/Katni.png" alt="Katni"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Katni_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Katni.png")}/>
						<span className="katniText text-capitalize">katni</span>
						<span className="katniNumber  text-center">{this.search('katni')}</span>
					</div>
					<div className="jabalpur"> 
						<img src="/Maps/Madhya_Pradesh/Jabalpur.png" alt="Jabalpur"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Jabalpur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Jabalpur.png")}/>
						<span className="jabalpurText text-capitalize">jabalpur</span>
						<span className="jabalpurNumber  text-center">{this.search('jabalpur')}</span>
					</div>
					<div className="narsinghpur"> 
						<img src="/Maps/Madhya_Pradesh/Narsinghpur.png" alt="Narsinghpur"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Narsinghpur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Narsinghpur.png")}/>
						<span className="narsinghpurText text-capitalize">narsinghpur</span>
						<span className="narsinghpurNumber  text-center">{this.search('narsinghpur')}</span>
					</div>
					<div className="hoshangabad"> 
						<img src="/Maps/Madhya_Pradesh/Hoshangabad.png" alt="Hoshangabad"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Hoshangabad_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Hoshangabad.png")}/>
						<span className="hoshangabadText text-capitalize">hoshangabad</span>
						<span className="hoshangabadNumber  text-center">{this.search('hoshangabad')}</span>
					</div>
					<div className="dewas"> 
						<img src="/Maps/Madhya_Pradesh/Dewas.png" alt="Dewas"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Dewas_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Dewas.png")}/>
						<span className="dewasText text-capitalize">dewas</span>
						<span className="dewasNumber  text-center">{this.search('dewas')}</span>
					</div>
					<div className="indore"> 
						<img src="/Maps/Madhya_Pradesh/Indore.png" alt="Indore"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Indore_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Indore.png")}/>
						<span className="indoreText text-capitalize">indore</span>
						<span className="indoreNumber  text-center">{this.search('indore')}</span>
					</div>
					<div className="dhar"> 
						<img src="/Maps/Madhya_Pradesh/Dhar.png" alt="Dhar"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Dhar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Dhar.png")}/>
						<span className="dharText text-capitalize">dhar</span>
						<span className="dharNumber  text-center">{this.search('dhar')}</span>
					</div>
					<div className="ujjain"> 
						<img src="/Maps/Madhya_Pradesh/Ujjain.png" alt="Ujjain"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Ujjain_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Ujjain.png")}/>
						<span className="ujjainText text-capitalize">ujjain</span>
						<span className="ujjainNumber  text-center">{this.search('ujjain')}</span>
					</div>
					<div className="shajapur"> 
						<img src="/Maps/Madhya_Pradesh/Shajapur.png" alt="Shajapur"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Shajapur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Shajapur.png")}/>
						<span className="shajapurText text-capitalize">shajapur</span>
						<span className="shajapurNumber  text-center">{this.search('shajapur')}</span>
					</div>
					<div className="sehore"> 
						<img src="/Maps/Madhya_Pradesh/Sehore.png" alt="Sehore"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Sehore_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Sehore.png"}/>
						<span className="sehoreText text-capitalize">sehore</span>
						<span className="sehoreNumber  text-center">{this.search('sehore')}</span>
					</div>
					<div className="hoshangabad"> 
						<img src="/Maps/Madhya_Pradesh/Hoshangabad.png" alt="Hoshangabad"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Hoshangabad_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Hoshangabad.png"}/>
						<span className="hoshangabadText text-capitalize">hoshangabad</span>
						<span className="hoshangabadNumber  text-center">{this.search('hoshangabad')}</span>
					</div>
					<div className="agarMalwa"> 
						<img src="/Maps/Madhya_Pradesh/Agar_Malwa.png" alt="Agar_Malwa"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Agar_Malwa_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Agar_Malwa.png"}/>
						<span className="agarMalwaText text-capitalize">agarMalwa</span>
						<span className="agarMalwaNumber  text-center">{this.search('agarMalwa')}</span>
					</div>
					<div className="rajgarh"> 
						<img src="/Maps/Madhya_Pradesh/Rajgarh.png" alt="Rajgarh"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Rajgarh_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Rajgarh.png"}/>
						<span className="rajgarhText text-capitalize">rajgarh</span>
						<span className="rajgarhNumber  text-center">{this.search('rajgarh')}</span>
					</div>
					<div className="bhopal"> 
						<img src="/Maps/Madhya_Pradesh/Bhopal.png" alt="Bhopal"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Bhopal_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Bhopal.png"}/>
						<span className="bhopalText text-capitalize">bhopal</span>
						<span className="bhopalNumber  text-center">{this.search('bhopal')}</span>
					</div>
					<div className="raisen"> 
						<img src="/Maps/Madhya_Pradesh/Raisen.png" alt="Raisen"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Raisen_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Raisen.png"}/>
						<span className="raisenText text-capitalize">raisen</span>
						<span className="raisenNumber  text-center">{this.search('raisen')}</span>
					</div>
					<div className="sagar"> 
						<img src="/Maps/Madhya_Pradesh/Sagar.png" alt="Sagar"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Sagar_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Sagar.png"}/>
						<span className="sagarText text-capitalize">sagar</span>
						<span className="sagarNumber  text-center">{this.search('sagar')}</span>
					</div>
					<div className="damoh"> 
						<img src="/Maps/Madhya_Pradesh/Damoh.png" alt="Damoh"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Damoh_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Damoh.png"}/>
						<span className="damohText text-capitalize">damoh</span>
						<span className="damohNumber  text-center">{this.search('damoh')}</span>
					</div>
					<div className="panna"> 
						<img src="/Maps/Madhya_Pradesh/Panna.png" alt="Panna"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Panna_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Panna.png"}/>
						<span className="pannaText text-capitalize">panna</span>
						<span className="pannaNumber  text-center">{this.search('panna')}</span>
					</div>
					<div className="chhatarpur"> 
						<img src="/Maps/Madhya_Pradesh/Chhatarpur.png" alt="Chhatarpur"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Chhatarpur_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Chhatarpur.png"}/>
						<span className="chhatarpurText text-capitalize">chhatarpur</span>
						<span className="chhatarpurNumber  text-center">{this.search('chhatarpur')}</span>
					</div>
					<div className="tikamgarh"> 
						<img src="/Maps/Madhya_Pradesh/Tikamgarh.png" alt="Tikamgarh"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Tikamgarh_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Tikamgarh.png"}/>
						<span className="tikamgarhText text-capitalize">tikamgarh</span>
						<span className="tikamgarhNumber  text-center">{this.search('tikamgarh')}</span>
					</div>
					<div className="niwari"> 
						<img src="/Maps/Madhya_Pradesh/Niwari.png" alt="Niwari"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Niwari_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Niwari.png"}/>
						<span className="niwariText text-capitalize">niwari</span>
						<span className="niwariNumber  text-center">{this.search('niwari')}</span>
					</div>
					<div className="vidisha"> 
						<img src="/Maps/Madhya_Pradesh/Vidisha.png" alt="Vidisha"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Vidisha_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Vidisha.png"}/>
						<span className="vidishaText text-capitalize">vidisha</span>
						<span className="vidishaNumber  text-center">{this.search('vidisha')}</span>
					</div>
					<div className="guna"> 
						<img src="/Maps/Madhya_Pradesh/Guna.png" alt="Guna"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Guna_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Guna.png"}/>
						<span className="gunaText text-capitalize">guna</span>
						<span className="gunaNumber  text-center">{this.search('guna')}</span>
					</div>
					<div className="ashoknagar"> 
						<img src="/Maps/Madhya_Pradesh/Ashoknagar.png" alt="Ashoknagar"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Ashoknagar_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Ashoknagar.png"}/>
						<span className="ashoknagarText text-capitalize">ashoknagar</span>
						<span className="ashoknagarNumber  text-center">{this.search('ashoknagar')}</span>
					</div>
					<div className="shivpuri"> 
						<img src="/Maps/Madhya_Pradesh/Shivpuri.png" className="" alt="Shivpuri"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Shivpuri_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Shivpuri.png"}/>
						<span className="shivpuriText text-capitalize">shivpuri</span>
						<span className="shivpuriNumber  text-center">{this.search('shivpuri')}</span>
					</div>
					<div className="sheopur"> 
						<img src="/Maps/Madhya_Pradesh/Sheopur.png" className="" alt="Sheopur"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Sheopur_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Sheopur.png"}/>
						<span className="sheopurText text-capitalize">sheopur</span>
						<span className="sheopurNumber  text-center">{this.search('sheopur')}</span>
					</div>
					<div className="gwalior"> 
						<img src="/Maps/Madhya_Pradesh/Gwalior.png" className="" alt="Gwalior"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Gwalior_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Gwalior.png"}/>
						<span className="gwaliorText text-capitalize">gwalior</span>
						<span className="gwaliorNumber  text-center">{this.search('gwalior')}</span>
					</div>
					<div className="datia"> 
						<img src="/Maps/Madhya_Pradesh/Datia.png" className="" alt="Datia"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Datia_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Datia.png"}/>
						<span className="datiaText text-capitalize">datia</span>
						<span className="datiaNumber  text-center">{this.search('datia')}</span>
					</div>
					<div className="bhind"> 
						<img src="/Maps/Madhya_Pradesh/Bhind.png" className="" alt="Bhind"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Bhind_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Bhind.png"}/>
						<span className="bhindText text-capitalize">bhind</span>
						<span className="bhindNumber  text-center">{this.search('bhind')}</span>
					</div>
					<div className="morena"> 
						<img src="/Maps/Madhya_Pradesh/Morena.png" className="" alt="Morena"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Morena_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Morena.png"}/>
						<span className="morenaText text-capitalize">morena</span>
						<span className="morenaNumber  text-center">{this.search('morena')}</span>
					</div>
					
				</div>
			</div>
		);
	}
}