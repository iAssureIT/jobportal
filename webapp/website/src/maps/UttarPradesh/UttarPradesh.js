import React, {Component} from 'react';

import './UttarPradesh.css';
import '../global.css';


export default class UttarPradesh extends Component{
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
					<div className="sharanpur classHover"> 
						<img src="/Maps/Uttar_Pradesh/Sharanpur.png"  alt="Sharanpur" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Sharanpur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Sharanpur.png")}/>
						<span className="sharanpurText mapTextLabel text-capitalize">Sharanpur</span>
						<span className="sharanpurNumber mapCountLabel text-center">{this.search('sharanpur')}</span>
					</div>
					<div className="bijnor classHover"> 
						<img src="/Maps/Uttar_Pradesh/Bijnor.png"  alt="Bijnor"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Bijnor_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Bijnor.png")}/>
						<span className="bijnorText mapTextLabel text-capitalize">Bijnor</span>
						<span className="bijnorNumber mapCountLabel text-center">{this.search('bijnor')}</span>
					</div>
					<div className="muzaffarnagar classHover"> 
						<img src="/Maps/Uttar_Pradesh/Muzaffarnagar.png"  alt="Muzaffarnagar"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Muzaffarnagar_.png")}
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Muzaffarnagar.png")}/>
						<span className="muzaffarnagarText mapTextLabel text-capitalize">Muzaffarnagar</span>
						<span className="muzaffarnagarNumber mapCountLabel text-center">{this.search('muzaffarnagar')}</span>
					</div>
					<div className="shamli classHover"> 
						<img src="/Maps/Uttar_Pradesh/Shamli.png"  alt="Shamli" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Shamli_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Shamli.png")}/>
						<span className="shamliText mapTextLabel text-capitalize">Shamli</span>
						<span className="shamliNumber mapCountLabel text-center">{this.search('shamli')}</span>
					</div>
					
					<div className="meerut classHover"> 
						<img src="/Maps/Uttar_Pradesh/Meerut.png"  alt="Meerut"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Meerut_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Meerut.png")}/>
						<span className="meerutText mapTextLabel text-capitalize">Meerut</span>
						<span className="meerutNumber mapCountLabel text-center">{this.search('meerut')}</span>
					</div>
					<div className="bagpat classHover"> 
						<img src="/Maps/Uttar_Pradesh/Bagpat.png"  alt="Bagpat" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Bagpat_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Bagpat.png")}/>
						<span className="bagpatText mapTextLabel text-capitalize">Bagpat</span>
						<span className="bagpatNumber mapCountLabel text-center">{this.search('bagpat')}</span>
					</div>
					<div className="ghaziabad classHover"> 
						<img src="/Maps/Uttar_Pradesh/Ghaziabad.png"  alt="Ghaziabad"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Ghaziabad_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Ghaziabad.png")}/>
						<span className="ghaziabadText mapTextLabel text-capitalize">Ghaziabad</span>
						<span className="ghaziabadNumber mapCountLabel text-center">{this.search('ghaziabad')}</span>
					</div>
					<div className="hapur classHover"> 
						<img src="/Maps/Uttar_Pradesh/Hapur.png"  alt="Hapur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Hapur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Hapur.png")}/>
						<span className="hapurText mapTextLabel text-capitalize">Hapur</span>
						<span className="hapurNumber mapCountLabel text-center">{this.search('hapur')}</span>
					</div>
					<div className="amroha classHover"> 
						<img src="/Maps/Uttar_Pradesh/Amroha.png"  alt="Amroha"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Amroha_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Amroha.png")}/>
						<span className="amrohaText mapTextLabel text-capitalize">Amroha</span>
						<span className="amrohaNumber mapCountLabel text-center">{this.search('amroha')}</span>
					</div>
					
					<div className="rampur classHover"> 
						<img src="/Maps/Uttar_Pradesh/Rampur.png"  alt="Rampur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Rampur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Rampur.png")}/>
						<span className="rampurText mapTextLabel text-capitalize">Rampur</span>
						<span className="rampurNumber mapCountLabel text-center">{this.search('rampur')}</span>
					</div>
					<div className="moradabad classHover"> 
						<img src="/Maps/Uttar_Pradesh/Moradabad.png"  alt="Moradabad"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Moradabad_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Moradabad.png")}/>
						<span className="moradabadText mapTextLabel text-capitalize">Moradabad</span>
						<span className="moradabadNumber mapCountLabel text-center">{this.search('moradabad')}</span>
					</div>
					<div className="bareilly classHover"> 
						<img src="/Maps/Uttar_Pradesh/Bareilly.png"  alt="Bareilly"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Bareilly_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Bareilly.png")}/>
						<span className="bareillyText mapTextLabel text-capitalize">Bareilly</span>
						<span className="bareillyNumber mapCountLabel text-center">{this.search('bareilly')}</span>
					</div>
					<div className="pilibhit classHover"> 
						<img src="/Maps/Uttar_Pradesh/Pilibhit.png"  alt="Pilibhit"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Pilibhit_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Pilibhit.png")}/>
						<span className="pilibhitText mapTextLabel text-capitalize">Pilibhit</span>
						<span className="pilibhitNumber mapCountLabel text-center">{this.search('pilibhit')}</span>
					</div>
					<div className="sambhal classHover"> 
						<img src="/Maps/Uttar_Pradesh/Sambhal.png"  alt="Sambhal"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Sambhal_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Sambhal.png")}/>
						<span className="sambhalText mapTextLabel text-capitalize">Sambhal</span>
						<span className="sambhalNumber mapCountLabel text-center">{this.search('sambhal')}</span>
					</div>
					<div className="budaun classHover"> 
						<img src="/Maps/Uttar_Pradesh/Budaun.png"  alt="Budaun"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Budaun_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Budaun.png")}/>
						<span className="budaunText mapTextLabel text-capitalize">Budaun</span>
						<span className="budaunNumber mapCountLabel text-center">{this.search('budaun')}</span>
					</div>
					<div className="bulandshahr classHover"> 
						<img src="/Maps/Uttar_Pradesh/Bulandshahr.png"  alt="Bulandshahr"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Bulandshahr_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Bulandshahr.png")}/>
						<span className="bulandshahrText mapTextLabel text-capitalize">Bulandshahr</span>
						<span className="bulandshahrNumber mapCountLabel text-center">{this.search('bulandshahr')}</span>
					</div>
					<div className="gautamVuddhaNagar classHover"> 
						<img src="/Maps/Uttar_Pradesh/Gautam_Vuddha_Nagar.png"  alt="Gautam_Vuddha_Nagar"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Gautam_Vuddha_Nagar_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Gautam_Vuddha_Nagar.png")}/>
						<span className="gautamVuddhaNagarText mapTextLabel text-capitalize">Gautam_Vuddha_Nagar</span>
						<span className="gautamVuddhaNagarNumber mapCountLabel text-center">{this.search('gautamVuddhaNagar')}</span>
					</div>
					<div className="aligarh classHover"> 
						<img src="/Maps/Uttar_Pradesh/Aligarh.png"  alt="Aligarh"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Aligarh_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Aligarh.png")}/>
						<span className="aligarhText mapTextLabel text-capitalize">Aligarh</span>
						<span className="aligarhNumber mapCountLabel text-center">{this.search('aligarh')}</span>
					</div>
					<div className="lakhimpurKheri classHover"> 
						<img src="/Maps/Uttar_Pradesh/Lakhimpur_Kheri.png"  alt="Lakhimpur_Kheri"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Lakhimpur_Kheri_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Lakhimpur_Kheri.png")}/>
						<span className="lakhimpurKheriText mapTextLabel text-capitalize">Lakhimpur_Kheri</span>
						<span className="lakhimpurKheriNumber mapCountLabel text-center">{this.search('lakhimpurKheri')}</span>
					</div>
					<div className="shahjahanpur classHover"> 
						<img src="/Maps/Uttar_Pradesh/Shahjahanpur.png"  alt="Shahjahanpur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Shahjahanpur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Shahjahanpur.png")}/>
						<span className="shahjahanpurText mapTextLabel text-capitalize">Shahjahanpur</span>
						<span className="shahjahanpurNumber mapCountLabel text-center">{this.search('shahjahanpur')}</span>
					</div>
					<div className="aligarh classHover"> 
						<img src="/Maps/Uttar_Pradesh/Aligarh.png"  alt="Aligarh"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Aligarh_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Aligarh.png")}/>
						<span className="aligarhText mapTextLabel text-capitalize">Aligarh</span>
						<span className="aligarhNumber mapCountLabel text-center">{this.search('aligarh')}</span>
					</div>
					<div className="kasganj classHover"> 
						<img src="/Maps/Uttar_Pradesh/Kasganj.png"  alt="Kasganj"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Kasganj_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Kasganj.png")}/>
						<span className="kasganjText mapTextLabel text-capitalize">Kasganj</span>
						<span className="kasganjNumber mapCountLabel text-center">{this.search('kasganj')}</span>
					</div>
					<div className="mathura classHover"> 
						<img src="/Maps/Uttar_Pradesh/Mathura.png"  alt="Mathura"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Mathura_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Mathura.png")}/>
						<span className="mathuraText mapTextLabel text-capitalize">Mathura</span>
						<span className="mathuraNumber mapCountLabel text-center">{this.search('mathura')}</span>
					</div>
					<div className="hathras classHover"> 
						<img src="/Maps/Uttar_Pradesh/Hathras.png"  alt="Hathras"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Hathras_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Hathras.png")}/>
						<span className="hathrasText mapTextLabel text-capitalize">Hathras</span>
						<span className="hathrasNumber mapCountLabel text-center">{this.search('hathras')}</span>
					</div>
					<div className="etah classHover"> 
						<img src="/Maps/Uttar_Pradesh/Etah.png"  alt="Etah"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Etah_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Etah.png")}/>
						<span className="etahText mapTextLabel text-capitalize">Etah</span>
						<span className="etahNumber mapCountLabel text-center">{this.search('etah')}</span>
					</div>
					<div className="hardoi classHover"> 
						<img src="/Maps/Uttar_Pradesh/Hardoi.png"  alt="Hardoi"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Hardoi_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Hardoi.png")}/>
						<span className="hardoiText mapTextLabel text-capitalize">Hardoi</span>
						<span className="hardoiNumber mapCountLabel text-center">{this.search('hardoi')}</span>
					</div>
					<div className="farrukhabad classHover"> 
						<img src="/Maps/Uttar_Pradesh/Farrukhabad.png"  alt="Farrukhabad"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Farrukhabad_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Farrukhabad.png")}/>
						<span className="farrukhabadText mapTextLabel text-capitalize">Farrukhabad</span>
						<span className="farrukhabadNumber mapCountLabel text-center">{this.search('farrukhabad')}</span>
					</div>
					<div className="sitapur classHover"> 
						<img src="/Maps/Uttar_Pradesh/Sitapur.png"  alt="Sitapur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Sitapur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Sitapur.png")}/>
						<span className="sitapurText mapTextLabel text-capitalize">Sitapur</span>
						<span className="sitapurNumber mapCountLabel text-center">{this.search('sitapur')}</span>
					</div>
					<div className="bahraich classHover"> 
						<img src="/Maps/Uttar_Pradesh/Bahraich.png"  alt="Bahraich"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Bahraich.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Bahraich.png")}/>
						<span className="bahraichText mapTextLabel text-capitalize">Bahraich</span>
						<span className="bahraichNumber mapCountLabel text-center">{this.search('bahraich')}</span>
					</div>
					<div className="shravasti classHover"> 
						<img src="/Maps/Uttar_Pradesh/Shravasti.png"  alt="Shravasti"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Shravasti_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Shravasti.png")}/>
						<span className="shravastiText mapTextLabel text-capitalize">Shravasti</span>
						<span className="shravastiNumber mapCountLabel text-center">{this.search('shravasti')}</span>
					</div>
					<div className="balrampur classHover"> 
						<img src="/Maps/Uttar_Pradesh/Balrampur.png"  alt="Balrampur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Balrampur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Balrampur.png")}/>
						<span className="balrampurText mapTextLabel text-capitalize">Balrampur</span>
						<span className="balrampurNumber mapCountLabel text-center">{this.search('balrampur')}</span>
					</div>
					<div className="siddhathnagar classHover"> 
						<img src="/Maps/Uttar_Pradesh/Siddhathnagar.png"  alt="Siddhathnagar"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Siddhathnagar_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Siddhathnagar.png")}/>
						<span className="siddhathnagarText mapTextLabel text-capitalize">Siddhathnagar</span>
						<span className="siddhathnagarNumber mapCountLabel text-center">{this.search('siddhathnagar')}</span>
					</div>
					<div className="maharajhanj classHover"> 
						<img src="/Maps/Uttar_Pradesh/Maharajhanj.png"  alt="Maharajhanj"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Maharajhanj_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Maharajhanj.png")}/>
						<span className="maharajhanjText mapTextLabel text-capitalize">Maharajhanj</span>
						<span className="maharajhanjNumber mapCountLabel text-center">{this.search('maharajhanj')}</span>
					</div>
					<div className="agra classHover">
						<img src="/Maps/Uttar_Pradesh/Agra.png"  alt="Agra"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Agra_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Agra.png")}/>
						<span className="agraText mapTextLabel text-capitalize">Agra</span>
						<span className="agraNumber mapCountLabel text-center">{this.search('agra')}</span>
					</div>
					<div className="firozabad classHover">
						<img src="/Maps/Uttar_Pradesh/Firozabad.png"  alt="Firozabad"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Firozabad_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Firozabad.png")}/>
						<span className="firozabadText mapTextLabel text-capitalize">Firozabad</span>
						<span className="firozabadNumber mapCountLabel text-center">{this.search('firozabad')}</span>
					</div>
					<div className="manipuri classHover">
						<img src="/Maps/Uttar_Pradesh/Manipuri.png"  alt="Manipuri"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Manipuri_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Manipuri.png")}/>
						<span className="manipuriText mapTextLabel text-capitalize">Manipuri</span>
						<span className="manipuriNumber mapCountLabel text-center">{this.search('manipuri')}</span>
					</div>
					<div className="kannauj classHover">
						<img src="/Maps/Uttar_Pradesh/Kannauj.png"  alt="Kannauj"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Kannauj_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Kannauj.png")}/>
						<span className="kannaujText mapTextLabel text-capitalize">Kannauj</span>
						<span className="kannaujNumber mapCountLabel text-center">{this.search('kannauj')}</span>
					</div>
					<div className="etawah classHover">
						<img src="/Maps/Uttar_Pradesh/Etawah.png"  alt="Etawah"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Etawah_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Etawah.png")}/>
						<span className="etawahText mapTextLabel text-capitalize">Etawah</span>
						<span className="etawahNumber mapCountLabel text-center">{this.search('etawah')}</span>
					</div>
					<div className="unnao classHover">
						<img src="/Maps/Uttar_Pradesh/Unnao.png"  alt="Unnao"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Unnao_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Unnao.png")}/>
						<span className="unnaoText mapTextLabel text-capitalize">Unnao</span>
						<span className="unnaoNumber mapCountLabel text-center">{this.search('unnao')}</span>
					</div>
					<div className="auraiya classHover">
						<img src="/Maps/Uttar_Pradesh/Auraiya.png"  alt="Auraiya"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Auraiya_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Auraiya.png")}/>
						<span className="auraiyaText mapTextLabel text-capitalize">Auraiya</span>
						<span className="auraiyaNumber mapCountLabel text-center">{this.search('auraiya')}</span>
					</div>
					
					<div className="kanpurNagar classHover">
						<img src="/Maps/Uttar_Pradesh/Kanpur_Nagar.png"  alt="Kanpur_Nagar"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Kanpur_Nagar_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Kanpur_Nagar.png")}/>
						<span className="kanpurNagarText mapTextLabel text-capitalize">Kanpur_Nagar</span>
						<span className="kanpurNagarNumber mapCountLabel text-center">{this.search('kanpurNagar')}</span>
					</div>
					<div className="kanpurDehat classHover">
						<img src="/Maps/Uttar_Pradesh/Kanpur_Dehat.png"  alt="Kanpur_Dehat"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Kanpur_Dehat_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Kanpur_Dehat.png")}/>
						<span className="kanpurDehatText mapTextLabel text-capitalize">Kanpur_Dehat</span>
						<span className="kanpurDehatNumber mapCountLabel text-center">{this.search('kanpurDehat')}</span>
					</div>
					
					<div className="barabanki classHover">
						<img src="/Maps/Uttar_Pradesh/Barabanki.png"  alt="Barabanki"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Barabanki_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Barabanki.png")}/>
						<span className="barabankiText mapTextLabel text-capitalize">Barabanki</span>
						<span className="barabankiNumber mapCountLabel text-center">{this.search('barabanki')}</span>
					</div>
					<div className="luchknow classHover">
						<img src="/Maps/Uttar_Pradesh/Luchknow.png"  alt="Luchknow"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Luchknow_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Luchknow.png")}/>
						<span className="luchknowText mapTextLabel text-capitalize">Luchknow</span>
						<span className="luchknowNumber mapCountLabel text-center">{this.search('luchknow')}</span>
					</div>
					<div className="gonda classHover">
						<img src="/Maps/Uttar_Pradesh/Gonda.png"  alt="Gonda"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Gonda_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Gonda.png")}/>
						<span className="gondaText mapTextLabel text-capitalize">Gonda</span>
						<span className="gondaNumber mapCountLabel text-center">{this.search('gonda')}</span>
					</div>
					<div className="basti classHover">
						<img src="/Maps/Uttar_Pradesh/Basti.png"  alt="Basti"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Basti_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Basti.png")}/>
						<span className="bastiText mapTextLabel text-capitalize">Basti</span>
						<span className="bastiNumber mapCountLabel text-center">{this.search('basti')}</span>
					</div>
					
					<div className="gorakhpur classHover">
						<img src="/Maps/Uttar_Pradesh/Gorakhpur.png"  alt="Gorakhpur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Gorakhpur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Gorakhpur.png")}/>
						<span className="gorakhpurText mapTextLabel text-capitalize">Gorakhpur</span>
						<span className="gorakhpurNumber mapCountLabel text-center">{this.search('gorakhpur')}</span>
					</div>
					<div className="santKabirNagar classHover">
						<img src="/Maps/Uttar_Pradesh/Sant_Kabir_Nagar.png"  alt="Sant_Kabir_Nagar"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Sant_Kabir_Nagar.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Sant_Kabir_Nagar.png")}/>
						<span className="santKabirNagarText mapTextLabel text-capitalize">Sant_Kabir_Nagar</span>
						<span className="santKabirNagarNumber mapCountLabel text-center">{this.search('santKabirNagar')}</span>
					</div>
					<div className="kushinagar classHover">
						<img src="/Maps/Uttar_Pradesh/Kushinagar.png"  alt="Kushinagar"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Kushinagar_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Kushinagar.png")}/>
						<span className="kushinagarText mapTextLabel text-capitalize">Kushinagar</span>
						<span className="kushinagarNumber mapCountLabel text-center">{this.search('kushinagar')}</span>
					</div>
					<div className="deoria classHover">
						<img src="/Maps/Uttar_Pradesh/Deoria.png"  alt="Deoria"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Deoria_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Deoria.png")}/>
						<span className="deoriaText mapTextLabel text-capitalize">Deoria</span>
						<span className="deoriaNumber mapCountLabel text-center">{this.search('deoria')}</span>
					</div>
					<div className="jalaun classHover">
						<img src="/Maps/Uttar_Pradesh/Jalaun.png"  alt="Jalaun"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Jalaun_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Jalaun.png")}/>
						<span className="jalaunText mapTextLabel text-capitalize">Jalaun</span>
						<span className="jalaunNumber mapCountLabel text-center">{this.search('jalaun')}</span>
					</div>
					<div className="hamirpur classHover">
						<img src="/Maps/Uttar_Pradesh/Hamirpur.png"  alt="Hamirpur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Hamirpur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Hamirpur.png")}/>
						<span className="hamirpurText mapTextLabel text-capitalize">Hamirpur</span>
						<span className="hamirpurNumber mapCountLabel text-center">{this.search('hamirpur')}</span>
					</div>
					<div className="fatehpur classHover">
						<img src="/Maps/Uttar_Pradesh/Fatehpur.png"  alt="Fatehpur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Fatehpur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Fatehpur.png")}/>
						<span className="fatehpurText mapTextLabel text-capitalize">Fatehpur</span>
						<span className="fatehpurNumber mapCountLabel text-center">{this.search('fatehpur')}</span>
					</div>
					<div className="raeBareli classHover">
						<img src="/Maps/Uttar_Pradesh/Rae_Bareli.png"  alt="Rae_Bareli"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Rae_Bareli_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Rae_Bareli.png")}/>
						<span className="raeBareliText mapTextLabel text-capitalize">Rae_Bareli</span>
						<span className="raeBareliNumber mapCountLabel text-center">{this.search('raeBareli')}</span>
					</div>
					<div className="gauriganj classHover">
						<img src="/Maps/Uttar_Pradesh/Gauriganj.png"  alt="Gauriganj"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Gauriganj_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Gauriganj.png")}/>
						<span className="gauriganjText mapTextLabel text-capitalize">Gauriganj</span>
						<span className="gauriganjNumber mapCountLabel text-center">{this.search('gauriganj')}</span>
					</div>
					<div className="faizabad classHover">
						<img src="/Maps/Uttar_Pradesh/Faizabad.png"  alt="Faizabad"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Faizabad_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Faizabad.png")}/>
						<span className="faizabadText mapTextLabel text-capitalize">Faizabad</span>
						<span className="faizabadNumber mapCountLabel text-center">{this.search('faizabad')}</span>
					</div>
					<div className="ambedkarNagar classHover">
						<img src="/Maps/Uttar_Pradesh/Ambedkar_Nagar.png"  alt="Ambedkar_Nagar"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Ambedkar_Nagar_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Ambedkar_Nagar.png")}/>
						<span className="ambedkarNagarText mapTextLabel text-capitalize">Ambedkar_Nagar</span>
						<span className="ambedkarNagarNumber mapCountLabel text-center">{this.search('ambedkarNagar')}</span>
					</div>
					<div className="sultanpur classHover">
						<img src="/Maps/Uttar_Pradesh/Sultanpur.png"  alt="Sultanpur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Sultanpur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Sultanpur.png")}/>
						<span className="sultanpurText mapTextLabel text-capitalize">Sultanpur</span>
						<span className="sultanpurNumber mapCountLabel text-center">{this.search('sultanpur')}</span>
					</div>
					<div className="azamgarh classHover">
						<img src="/Maps/Uttar_Pradesh/Azamgarh.png"  alt="Azamgarh"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Azamgarh_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Azamgarh.png")}/>
						<span className="azamgarhText mapTextLabel text-capitalize">Azamgarh</span>
						<span className="azamgarhNumber mapCountLabel text-center">{this.search('azamgarh')}</span>
					</div>
					<div className="mau classHover">
						<img src="/Maps/Uttar_Pradesh/Mau.png"  alt="Mau"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Mau_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Mau.png")}/>
						<span className="mauText mapTextLabel text-capitalize">Mau</span>
						<span className="mauNumber mapCountLabel text-center">{this.search('mau')}</span>
					</div>
					<div className="ballia classHover">
						<img src="/Maps/Uttar_Pradesh/Ballia.png"  alt="Ballia"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Ballia_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Ballia.png")}/>
						<span className="balliaText mapTextLabel text-capitalize">Ballia</span>
						<span className="balliaNumber mapCountLabel text-center">{this.search('ballia')}</span>
					</div>
					<div className="jhansi classHover">
						<img src="/Maps/Uttar_Pradesh/Jhansi.png"  alt="Jhansi"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Jhansi_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Jhansi.png")}/>
						<span className="jhansiText mapTextLabel text-capitalize">Jhansi</span>
						<span className="jhansiNumber mapCountLabel text-center">{this.search('jhansi')}</span>
					</div>
					<div className="hamirpur classHover">
						<img src="/Maps/Uttar_Pradesh/Hamirpur.png"  alt="Hamirpur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Hamirpur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Hamirpur.png")}/>
						<span className="hamirpurText mapTextLabel text-capitalize">Hamirpur</span>
						<span className="hamirpurNumber mapCountLabel text-center">{this.search('hamirpur')}</span>
					</div>
					<div className="mahoba classHover">
						<img src="/Maps/Uttar_Pradesh/Mahoba.png"  alt="Mahoba"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Mahoba.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Mahoba.png")}/>
						<span className="mahobaText mapTextLabel text-capitalize">Mahoba</span>
						<span className="mahobaNumber mapCountLabel text-center">{this.search('mahoba')}</span>
					</div>
					<div className="banda classHover">
						<img src="/Maps/Uttar_Pradesh/Banda.png"  alt="Banda"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Banda_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Banda.png")}/>
						<span className="bandaText mapTextLabel text-capitalize">Banda</span>
						<span className="bandaNumber mapCountLabel text-center">{this.search('banda')}</span>
					</div>
					<div className="chitrakoot classHover">
						<img src="/Maps/Uttar_Pradesh/Chitrakoot.png"  alt="Chitrakoot"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Chitrakoot_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Chitrakoot.png")}/>
						<span className="chitrakootText mapTextLabel text-capitalize">Chitrakoot</span>
						<span className="chitrakootNumber mapCountLabel text-center">{this.search('chitrakoot')}</span>
					</div>
					
					<div className="pratapgarh classHover">
						<img src="/Maps/Uttar_Pradesh/Pratapgarh.png"  alt="Pratapgarh"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Pratapgarh_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Pratapgarh.png")}/>
						<span className="pratapgarhText mapTextLabel text-capitalize">Pratapgarh</span>
						<span className="pratapgarhNumber mapCountLabel text-center">{this.search('Pratapgarh')}</span>
					</div>
					<div className="jaunpur classHover">
						<img src="/Maps/Uttar_Pradesh/Jaunpur.png"  alt="Jaunpur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Jaunpur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Jaunpur.png")}/>
						<span className="jaunpurText mapTextLabel text-capitalize">Jaunpur</span>
						<span className="jaunpurNumber mapCountLabel text-center">{this.search('jaunpur')}</span>
					</div>
					<div className="allahabad classHover">
						<img src="/Maps/Uttar_Pradesh/Allahabad.png"  alt="Allahabad"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Allahabad_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Allahabad.png")}/>
						<span className="allahabadText mapTextLabel text-capitalize">Allahabad</span>
						<span className="allahabadNumber mapCountLabel text-center">{this.search('allahabad')}</span>
					</div>
					<div className="kaushambi classHover">
						<img src="/Maps/Uttar_Pradesh/Kaushambi.png"  alt="Kaushambi"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Kaushambi_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Kaushambi.png")}/>
						<span className="kaushambiText mapTextLabel text-capitalize">Kaushambi</span>
						<span className="kaushambiNumber mapCountLabel text-center">{this.search('kaushambi')}</span>
					</div>
					<div className="varanasi classHover">
						<img src="/Maps/Uttar_Pradesh/Varanasi.png"  alt="Varanasi"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Varanasi_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Varanasi.png")}/>
						<span className="varanasiText mapTextLabel text-capitalize">Varanasi</span>
						<span className="varanasiNumber mapCountLabel text-center">{this.search('varanasi')}</span>
					</div>
					<div className="santRavidasNagar classHover">
						<img src="/Maps/Uttar_Pradesh/Sant_Ravidas_Nagar.png"  alt="Sant_Ravidas_Nagar"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Sant_Ravidas_Nagar_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Sant_Ravidas_Nagar.png")}/>
						<span className="santRavidasNagarText mapTextLabel text-capitalize">Sant_Ravidas_Nagar</span>
						<span className="santRavidasNagarNumber mapCountLabel text-center">{this.search('santRavidasNagar')}</span>
					</div>
					<div className="ghazipur classHover">
						<img src="/Maps/Uttar_Pradesh/Ghazipur.png"  alt="Ghazipur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Ghazipur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Ghazipur.png")}/>
						<span className="ghazipurText mapTextLabel text-capitalize">Ghazipur</span>
						<span className="ghazipurNumber mapCountLabel text-center">{this.search('ghazipur')}</span>
					</div>
					<div className="chandauli classHover">
						<img src="/Maps/Uttar_Pradesh/Chandauli.png"  alt="Chandauli"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Chandauli_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Chandauli.png")}/>
						<span className="chandauliText mapTextLabel text-capitalize">Chandauli</span>
						<span className="chandauliNumber mapCountLabel text-center">{this.search('chandauli')}</span>
					</div>
					<div className="mirzapur classHover">
						<img src="/Maps/Uttar_Pradesh/Mirzapur.png"  alt="Mirzapur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Mirzapur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Mirzapur.png")}/>
						<span className="mirzapurText mapTextLabel text-capitalize">Mirzapur</span>
						<span className="mirzapurNumber mapCountLabel text-center">{this.search('mirzapur')}</span>
					</div>
					<div className="sonbhandra classHover">
						<img src="/Maps/Uttar_Pradesh/Sonbhandra.png"  alt="Sonbhandra"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Sonbhandra_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Sonbhandra.png")}/>
						<span className="sonbhandraText mapTextLabel text-capitalize">Sonbhandra</span>
						<span className="sonbhandraNumber mapCountLabel text-center">{this.search('sonbhandra')}</span>
					</div>
					<div className="lalitpur classHover">
						<img src="/Maps/Uttar_Pradesh/Lalitpur.png"  alt="Lalitpur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Lalitpur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Lalitpur.png")}/>
						<span className="lalitpurText mapTextLabel text-capitalize">Lalitpur</span>
						<span className="lalitpurNumber mapCountLabel text-center">{this.search('lalitpur')}</span>
					</div>
				</div>
			</div>
		);
	}
}