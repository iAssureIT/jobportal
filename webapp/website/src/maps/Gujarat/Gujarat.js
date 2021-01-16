import React, {Component} from 'react';

import './Gujarat.css';
import '../global.css';


export default class Gujarat extends Component{

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
					<div className="kachchh classHover"> 
						<img src="/Maps/Gujarat/Kachchh.png"  alt="Kachchh" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Kachchh_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Kachchh.png")}/>
						<span className="kachchhText mapTextLabel text-capitalize">Kachchh</span>
						<span className="kachchhNumber mapCountLabel text-center">{this.search('kachchh')}</span>
					</div>

					<div className="banasKantha classHover"> 
						<img src="/Maps/Gujarat/Banas_Kantha.png"  alt="Banas_Kantha" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Banas_Kantha_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Banas_Kantha.png")}/>
						<span className="banasKanthaText mapTextLabel text-capitalize">Banas Kantha</span>
						<span className="banasKanthaNumber mapCountLabel text-center">{this.search('banas kantha')}</span>
					</div>

					<div className="patan classHover"> 
						<img src="/Maps/Gujarat/Patan.png"  alt="Patan" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Patan_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Patan.png")}/>
						<span className="patanText mapTextLabel text-capitalize">Patan</span>
						<span className="patanNumber mapCountLabel text-center">{this.search('patan')}</span>
					</div>

					<div className="mahesana classHover"> 
						<img src="/Maps/Gujarat/Mahesana.png"  alt="Mahesana" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Mahesana_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Mahesana.png")}/>
						<span className="mahesanaText mapTextLabel text-capitalize">Mahesana</span>
						<span className="mahesanaNumber mapCountLabel text-center">{this.search('mahesana')}</span>
					</div>

					<div className="sabarkantha classHover"> 
						<img src="/Maps/Gujarat/Sabarkantha.png"  alt="Sabarkantha" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Sabarkantha_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Sabarkantha.png")}/>
						<span className="sabarkanthaText mapTextLabel text-capitalize">Sabarkantha</span>
						<span className="sabarkanthaNumber mapCountLabel text-center">{this.search('sabarkantha')}</span>
					</div>

					<div className="arvalli classHover"> 
						<img src="/Maps/Gujarat/Arvalli.png"  alt="Arvalli" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Arvalli_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Arvalli.png")}/>
						<span className="arvalliText mapTextLabel text-capitalize">Arvalli</span>
						<span className="arvalliNumber mapCountLabel text-center">{this.search('arvalli')}</span>
					</div>

					<div className="gandhinagar classHover"> 
						<img src="/Maps/Gujarat/Gandhinagar.png"  alt="Gandhinagar" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Gandhinagar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Gandhinagar.png")}/>
						<span className="gandhinagarText mapTextLabel text-capitalize">Gandhinagar</span>
						<span className="gandhinagarNumber mapCountLabel text-center">{this.search('gandhinagar')}</span>
					</div>

					<div className="ahmedabad classHover"> 
						<img src="/Maps/Gujarat/Ahmedabad.png"  alt="Ahmedabad" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Ahmedabad_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Ahmedabad.png")}/>
						<span className="fazilkaText mapTextLabel text-capitalize">Ahmedabad</span>
						<span className="fazilkaNumber mapCountLabel text-center">{this.search('ahmedabad')}</span>
					</div>

					<div className="surendraNagar classHover"> 
						<img src="/Maps/Gujarat/Surendra_Nagar.png"  alt="Surendra_Nagar" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Surendra_Nagar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Surendra_Nagar.png")}/>
						<span className="ahmedabadText mapTextLabel text-capitalize">Surendranagar</span>
						<span className="ahmedabadNumber mapCountLabel text-center">{this.search('surendraNagar')}</span>
					</div>

					<div className="morbi classHover"> 
						<img src="/Maps/Gujarat/Morbi.png"  alt="Morbi" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Morbi_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Morbi.png")}/>
						<span className="morbiText mapTextLabel text-capitalize">Morbi</span>
						<span className="morbiNumber mapCountLabel text-center">{this.search('morbi')}</span>
					</div>

					<div className="jamnagar classHover"> 
						<img src="/Maps/Gujarat/Jamnagar.png"  alt="Jamnagar" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Jamnagar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Jamnagar.png")}/>
						<span className="jamnagarText mapTextLabel text-capitalize">Jamnagar</span>
						<span className="jamnagarNumber mapCountLabel text-center">{this.search('jamnagar')}</span>
					</div>

					<div className="devbhumiDwarka classHover"> 
						<img src="/Maps/Gujarat/Devbhumi_Dwarka.png"  alt="Devbhumi_Dwarka" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Devbhumi_Dwarka_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Devbhumi_Dwarka.png")}/>
						<span className="devbhumiDwarkaText mapTextLabel text-capitalize">Devbhumi Dwarka</span>
						<span className="devbhumiDwarkaNumber mapCountLabel text-center">{this.search('devbhumi dwarka')}</span>
					</div>

					<div className="porbandar classHover"> 
						<img src="/Maps/Gujarat/Porbandar.png"  alt="Porbandar" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Porbandar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Porbandar.png")}/>
						<span className="porbandarText mapTextLabel text-capitalize">Porbandar</span>
						<span className="porbandarNumber mapCountLabel text-center">{this.search('porbandar')}</span>
					</div>

					<div className="rajkot classHover"> 
						<img src="/Maps/Gujarat/Rajkot.png"  alt="Rajkot" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Rajkot_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Rajkot.png")}/>
						<span className="rajkotText mapTextLabel text-capitalize">Rajkot</span>
						<span className="rajkotNumber mapCountLabel text-center">{this.search('rajkot')}</span>
					</div>

					<div className="botad classHover"> 
						<img src="/Maps/Gujarat/Botad.png"  alt="Botad" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Botad_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Botad.png")}/>
						<span className="botadText mapTextLabel text-capitalize">Botad</span>
						<span className="botadNumber mapCountLabel text-center">{this.search('botad')}</span>
					</div>

					<div className="bhavnagar classHover"> 
						<img src="/Maps/Gujarat/Bhavnagar.png"  alt="Bhavnagar" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Bhavnagar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Bhavnagar.png")}/>
						<span className="bhavnagarText mapTextLabel text-capitalize">Bhavnagar</span>
						<span className="bhavnagarNumber mapCountLabel text-center">{this.search('bhavnagar')}</span>
					</div>

					<div className="amreli classHover"> 
						<img src="/Maps/Gujarat/Amreli.png"  alt="Amreli" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Amreli_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Amreli.png")}/>
						<span className="amreliText mapTextLabel text-capitalize">Amreli</span>
						<span className="amreliNumber mapCountLabel text-center">{this.search('amreli')}</span>
					</div>

					<div className="junagadh classHover"> 
						<img src="/Maps/Gujarat/Junagadh.png"  alt="Junagadh" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Junagadh_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Junagadh.png")}/>
						<span className="junagadhText mapTextLabel text-capitalize">Junagadh</span>
						<span className="junagadhNumber mapCountLabel text-center">{this.search('junagadh')}</span>
					</div>

					<div className="girSomnath classHover"> 
						<img src="/Maps/Gujarat/Gir_Somnath.png"  alt="Gir_Somnath" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Gir_Somnath_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Gir_Somnath.png")}/>
						<span className="girSomnathText mapTextLabel text-capitalize">Gir Somnath</span>
						<span className="girSomnathNumber mapCountLabel text-center">{this.search('gir somnath')}</span>
					</div>

					<div className="mahisagar classHover"> 
						<img src="/Maps/Gujarat/Mahisagar.png"  alt="Mahisagar" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Mahisagar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Mahisagar.png")}/>
						<span className="mahisagarText mapTextLabel text-capitalize">Mahisagar</span>
						<span className="mahisagarNumber mapCountLabel text-center">{this.search('mahisagar')}</span>
					</div>

					<div className="kheda classHover"> 
						<img src="/Maps/Gujarat/Kheda.png"  alt="Kheda" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Kheda_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Kheda.png")}/>
						<span className="khedaText mapTextLabel text-capitalize">Kheda</span>
						<span className="khedaNumber mapCountLabel text-center">{this.search('kheda')}</span>
					</div>

					<div className="anand classHover"> 
						<img src="/Maps/Gujarat/Anand.png"  alt="Anand" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Anand_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Anand.png")}/>
						<span className="anandText mapTextLabel text-capitalize">Anand</span>
						<span className="anandNumber mapCountLabel text-center">{this.search('anand')}</span>
					</div>

					<div className="bharuch classHover"> 
						<img src="/Maps/Gujarat/Bharuch.png"  alt="Bharuch" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Bharuch_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Bharuch.png")}/>
						<span className="bharuchText mapTextLabel text-capitalize">Bharuch</span>
						<span className="bharuchNumber mapCountLabel text-center">{this.search('bharuch')}</span>
					</div>

					<div className="vadodara classHover"> 
						<img src="/Maps/Gujarat/Vadodara.png"  alt="Vadodara" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Vadodara_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Vadodara.png")}/>
						<span className="vadodaraText mapTextLabel text-capitalize">Vadodara</span>
						<span className="vadodaraNumber mapCountLabel text-center">{this.search('vadodara')}</span>
					</div>

					<div className="panchMahals classHover"> 
						<img src="/Maps/Gujarat/Panch_Mahals.png"  alt="Panch_Mahals" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Panch_Mahals_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Panch_Mahals.png")}/>
						<span className="panchMahalsText mapTextLabel text-capitalize">PanchMahals</span>
						<span className="panchMahalsNumber mapCountLabel text-center">{this.search('panchMahals')}</span>
					</div>

					<div className="dahod classHover"> 
						<img src="/Maps/Gujarat/Dahod.png"  alt="Dahod" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Dahod_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Dahod.png")}/>
						<span className="dahodText mapTextLabel text-capitalize">Dahod</span>
						<span className="dahodNumber mapCountLabel text-center">{this.search('dahod')}</span>
					</div>

					<div className="chhotaUdaipur classHover"> 
						<img src="/Maps/Gujarat/Chhota_Udaipur.png"  alt="Chhota_Udaipur" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Chhota_Udaipur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Chhota_Udaipur.png")}/>
						<span className="chhotaUdaipurText mapTextLabel text-capitalize">ChhotaUdaipur</span>
						<span className="chhotaUdaipurNumber mapCountLabel text-center">{this.search('chhotaUdaipur')}</span>
					</div>

					<div className="narmada classHover"> 
						<img src="/Maps/Gujarat/Narmada.png"  alt="Narmada" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Narmada_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Narmada.png")}/>
						<span className="narmadaText mapTextLabel text-capitalize">Narmada</span>
						<span className="narmadaNumber mapCountLabel text-center">{this.search('narmada')}</span>
					</div>

					<div className="surat classHover"> 
						<img src="/Maps/Gujarat/Surat.png"  alt="Surat" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Surat_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Surat.png")}/>
						<span className="suratText mapTextLabel text-capitalize">Surat</span>
						<span className="suratNumber mapCountLabel text-center">{this.search('surat')}</span>
					</div>

					<div className="tapi"> 
						<img src="/Maps/Gujarat/Tapi.png"  alt="Tapi" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Tapi_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Tapi.png")}/>
						<span className="fazilkaText mapTextLabel text-capitalize">Fazilka</span>
						<span className="fazilkaNumber mapCountLabel text-center">{this.search('fazilka')}</span>
					</div>

					<div className="theDangs classHover"> 
						<img src="/Maps/Gujarat/The_Dangs.png"  alt="The_Dangs" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/The-Dangs_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/The_Dangs.png")}/>
						<span className="tapiText mapTextLabel text-capitalize">Tapi</span>
						<span className="tapiNumber mapCountLabel text-center">{this.search('tapi')}</span>
					</div>

					<div className="navsari classHover"> 
						<img src="/Maps/Gujarat/Navsari.png"  alt="Navsari" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Navsari_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Navsari.png")}/>
						<span className="navsariText mapTextLabel text-capitalize">Navsari</span>
						<span className="navsariNumber mapCountLabel text-center">{this.search('navsari')}</span>
					</div>

					<div className="valsad classHover"> 
						<img src="/Maps/Gujarat/Valsad.png"  alt="Valsad" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Valsad_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Valsad.png")}/>
						<span className="valsadText mapTextLabel text-capitalize">Valsad</span>
						<span className="valsadNumber mapCountLabel text-center">{this.search('valsad')}</span>
					</div>


				</div>
			</div>
		);
	}
}