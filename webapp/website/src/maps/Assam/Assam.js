import React, {Component} from 'react';
import Axios 				from 'axios';
import Swal 				from 'sweetalert2';

import './Assam.css';
import '../global.css';


export default class Assam extends Component{
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
		console.log("Assam...............................");
		return(
			<div className="bodyWrapper">
				<div className="stateWrapper">

					<div className="kokrajhar classHover"> 
						<img src="/Maps/Assam/Kokrajhar.png" alt="Kokrajhar" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Kokrajhar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Kokrajhar.png")}/>
						<span className="kokrajharText mapTextLabel text-capitalije">Kokrajhar</span>
						<span className="kokrajharNumber mapCountLabel text-center">{this.search('kokrajhar')}</span>
					</div>

					<div className="dhuburi classHover"> 
						<img src="/Maps/Assam/Dhuburi.png" alt="Dhuburi" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Dhuburi_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Dhuburi.png")}/>
						<span className="dhuburiText mapTextLabel text-capitalije">Dhuburi</span>
						<span className="dhuburiNumber mapCountLabel text-center">{this.search('dhuburi')}</span>
					</div>

					<div className="chirang classHover"> 
						<img src="/Maps/Assam/Chirang.png" alt="Chirang" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Chirang_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Chirang.png")}/>
						<span className="chirangText mapTextLabel text-capitalije">Chirang</span>
						<span className="chirangNumber mapCountLabel text-center">{this.search('chirang')}</span>
					</div>

					<div className="bongaigaon classHover"> 
						<img src="/Maps/Assam/Bongaigaon.png" alt="Bongaigaon" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Bongaigaon_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Bongaigaon.png")}/>
						<span className="bongaigaonText mapTextLabel text-capitalije">Bongaigaon</span>
						<span className="bongaigaonNumber mapCountLabel text-center">{this.search('bongaigaon')}</span>
					</div>

					<div className="gopalpara classHover"> 
						<img src="/Maps/Assam/Gopalpara.png" alt="Gopalpara" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Gopalpara_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Gopalpara.png")}/>
						<span className="gopalparaText mapTextLabel text-capitalije">Gopalpara</span>
						<span className="gopalparaNumber mapCountLabel text-center">{this.search('gopalpara')}</span>
					</div>

					<div className="baksa classHover"> 
						<img src="/Maps/Assam/Baksa.png" alt="Baksa" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Baksa_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Baksa.png")}/>
						<span className="baksaText mapTextLabel text-capitalije">Baksa</span>
						<span className="baksaNumber mapCountLabel text-center">{this.search('baksa')}</span>
					</div>

					<div className="barpeta classHover"> 
						<img src="/Maps/Assam/Barpeta.png" alt="Barpeta" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Barpeta_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Barpeta.png")}/>
						<span className="barpetaText mapTextLabel text-capitalije">Barpeta</span>
						<span className="barpetaNumber mapCountLabel text-center">{this.search('barpeta')}</span>
					</div>

					<div className="nalbari classHover"> 
						<img src="/Maps/Assam/Nalbari.png" alt="Nalbari" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Nalbari_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Nalbari.png")}/>
						<span className="nalbariText mapTextLabel text-capitalije">Nalbari</span>
						<span className="nalbariNumber mapCountLabel text-center">{this.search('nalbari')}</span>
					</div>

					<div className="kamrup classHover"> 
						<img src="/Maps/Assam/Kamrup.png" alt="Kamrup" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Kamrup_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Kamrup.png")}/>
						<span className="kamrupText mapTextLabel text-capitalije">Kamrup</span>
						<span className="kamrupNumber mapCountLabel text-center">{this.search('kamrup')}</span>
					</div>

					<div className="udalguri classHover"> 
						<img src="/Maps/Assam/Udalguri.png" alt="Udalguri" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Udalguri_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Udalguri.png")}/>
						<span className="udalguriText mapTextLabel text-capitalije">Udalguri</span>
						<span className="udalguriNumber mapCountLabel text-center">{this.search('udalguri')}</span>
					</div>

					<div className="darrang classHover"> 
						<img src="/Maps/Assam/Darrang.png" alt="Darrang" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Darrang_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Darrang.png")}/>
						<span className="darrangText mapTextLabel text-capitalije">Darrang</span>
						<span className="darrangNumber mapCountLabel text-center">{this.search('darrang')}</span>
					</div>

					<div className="kamrup_metro classHover"> 
						<img src="/Maps/Assam/Kamrup_Metro.png" alt="Kamrup_Metro" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Kamrup_Metro_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Kamrup_Metro.png")}/>
						<span className="kamrup_metroText mapTextLabel text-capitalije">Kamrup Metro</span>
						<span className="kamrup_metroNumber mapCountLabel text-center">{this.search('kamrup metro')}</span>
					</div>

					<div className="marigaon classHover"> 
						<img src="/Maps/Assam/Marigaon.png" alt="Marigaon" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Marigaon_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Marigaon.png")}/>
						<span className="marigaonText mapTextLabel text-capitalije">Marigaon</span>
						<span className="marigaonNumber mapCountLabel text-center">{this.search('marigaon')}</span>
					</div>

					<div className="sonitpur classHover"> 
						<img src="/Maps/Assam/Sonitpur.png" alt="Sonitpur" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Sonitpur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Sonitpur.png")}/>
						<span className="sonitpurText mapTextLabel text-capitalije">Sonitpur</span>
						<span className="sonitpurNumber mapCountLabel text-center">{this.search('sonitpur')}</span>
					</div>

					<div className="nagaon classHover"> 
						<img src="/Maps/Assam/Nagaon.png" alt="Nagaon" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Nagaon_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Nagaon.png")}/>
						<span className="nagaonText mapTextLabel text-capitalije">Nagaon</span>
						<span className="nagaonNumber mapCountLabel text-center">{this.search('nagaon')}</span>
					</div>

					<div className="karbi_anglong_west classHover"> 
						<img src="/Maps/Assam/Karbi_Anglong_West.png" alt="Karbi_Anglong_West" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Karbi_Anglong_West_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Karbi_Anglong_West.png")}/>
						<span className="karbi_anglong_westText mapTextLabel text-capitalije">Karbi Anglong</span>
						<span className="karbi_anglong_westNumber mapCountLabel text-center">{this.search('karbi anglong')}</span>
					</div>

					<div className="karbi_anglong_east classHover"> 
						<img src="/Maps/Assam/Karbi_Anglong_East.png" alt="Karbi_Anglong_East" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Karbi_Anglong_East_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Karbi_Anglong_East.png")}/>
						<span className="karbi_anglong_eastText mapTextLabel text-capitalije">Karbi Anglong</span>
						<span className="karbi_anglong_eastNumber mapCountLabel text-center">{this.search('karbi anglong')}</span>
					</div>

					<div className="golaghat classHover"> 
						<img src="/Maps/Assam/Golaghat.png" alt="Golaghat" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Golaghat_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Golaghat.png")}/>
						<span className="golaghatText mapTextLabel text-capitalije">Golaghat</span>
						<span className="golaghatNumber mapCountLabel text-center">{this.search('golaghat')}</span>
					</div>

					<div className="lakhimpur classHover"> 
						<img src="/Maps/Assam/Lakhimpur.png" alt="Lakhimpur" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Lakhimpur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Lakhimpur.png")}/>
						<span className="lakhimpurText mapTextLabel text-capitalije">Lakhimpur</span>
						<span className="lakhimpurNumber mapCountLabel text-center">{this.search('lakhimpur')}</span>
					</div>

					<div className="jorhat classHover"> 
						<img src="/Maps/Assam/Jorhat.png" alt="Jorhat" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Jorhat_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Jorhat.png")}/>
						<span className="jorhatText mapTextLabel text-capitalije">Jorhat</span>
						<span className="jorhatNumber mapCountLabel text-center">{this.search('jorhat')}</span>
					</div>

					<div className="sibsagar classHover"> 
						<img src="/Maps/Assam/Sibsagar.png" alt="Sibsagar" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Sibsagar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Sibsagar.png")}/>
						<span className="sibsagarText mapTextLabel text-capitalije">Sibsagar</span>
						<span className="sibsagarNumber mapCountLabel text-center">{this.search('sibsagar')}</span>
					</div>

					<div className="dibrugarh classHover"> 
						<img src="/Maps/Assam/Dibrugarh.png" alt="Dibrugarh" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Dibrugarh_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Dibrugarh.png")}/>
						<span className="dibrugarhText mapTextLabel text-capitalije">Dibrugarh</span>
						<span className="dibrugarhNumber mapCountLabel text-center">{this.search('dibrugarh')}</span>
					</div>

					<div className="dhemaji classHover"> 
						<img src="/Maps/Assam/Dhemaji.png" alt="Dhemaji" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Dhemaji_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Dhemaji.png")}/>
						<span className="dhemajiText mapTextLabel text-capitalije">Dhemaji</span>
						<span className="dhemajiNumber mapCountLabel text-center">{this.search('dhemaji')}</span>
					</div>

					<div className="tinsukia classHover"> 
						<img src="/Maps/Assam/Tinsukia.png" alt="Tinsukia" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Tinsukia_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Tinsukia.png")}/>
						<span className="tinsukiaText mapTextLabel text-capitalije">Tinsukia</span>
						<span className="tinsukiaNumber mapCountLabel text-center">{this.search('tinsukia')}</span>
					</div>

					<div className="dima_hasao classHover"> 
						<img src="/Maps/Assam/Dima_Hasao.png" alt="Dima_Hasao" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Dima_Hasao_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Dima_Hasao.png")}/>
						<span className="dima_hasaoText mapTextLabel text-capitalije">Dima Hasao</span>
						<span className="dima_hasaoNumber mapCountLabel text-center">{this.search('dima hasao')}</span>
					</div>

					<div className="cachar classHover"> 
						<img src="/Maps/Assam/Cachar.png" alt="Cachar" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Cachar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Cachar.png")}/>
						<span className="cacharText mapTextLabel text-capitalije">Cachar</span>
						<span className="cacharNumber mapCountLabel text-center">{this.search('cachar')}</span>
					</div>

					<div className="hailakandi classHover"> 
						<img src="/Maps/Assam/Hailakandi.png" alt="Hailakandi" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Hailakandi_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Hailakandi.png")}/>
						<span className="hailakandiText mapTextLabel text-capitalije">Hailakandi</span>
						<span className="hailakandiNumber mapCountLabel text-center">{this.search('hailakandi')}</span>
					</div>

					<div className="karimganj classHover"> 
						<img src="/Maps/Assam/Karimganj.png" alt="Karimganj" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Karimganj_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Karimganj.png")}/>
						<span className="karimganjText mapTextLabel text-capitalije">Karimganj</span>
						<span className="karimganjNumber mapCountLabel text-center">{this.search('karimganj')}</span>
					</div>

				</div>
			</div>
		);
	}
}