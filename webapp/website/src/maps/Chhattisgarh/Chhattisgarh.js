import React, {Component} from 'react';

import './Chhattisgarh.css';
import '../global.css';


export default class Chhattisgarh extends Component{
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
			<div className="bodyWrapper" >
				<div className="stateWrapper" >
					<div className="bijapur classHover"> 
						<img src="/Maps/Chhattisgarh/Bijapur.png" alt="Bijapur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Bijapur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Bijapur.png")}/>
						<span className="bijapurText mapTextLabel text-capitalize">Bijapur</span>
						<span className="bijapurNumber mapCountLabel text-center">{this.search('bijapur')}</span>
					</div>
					<div className="sukma classHover"> 
						<img src="/Maps/Chhattisgarh/Sukma.png"  alt="Sukma"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Sukma_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Sukma.png")}/>
						<span className="sukmaText mapTextLabel text-capitalize">Sukma</span>
						<span className="sukmaNumber mapCountLabel text-center">{this.search('sukma')}</span>
					</div>
					<div className="dantewada classHover"> 
						<img src="/Maps/Chhattisgarh/Dantewada.png"  alt="Dantewada"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Dantewada_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Dantewada.png")}/>
						<span className="dantewadaText mapTextLabel text-capitalize">Dantewada</span>
						<span className="dantewadaNumber mapCountLabel text-center">{this.search('dantewada')}</span>
					</div>
					<div className="bastar classHover"> 
						<img src="/Maps/Chhattisgarh/Bastar.png"  alt="Bastar"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Bastar_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Bastar.png")}/>
						<span className="bastarText mapTextLabel text-capitalize">Bastar</span>
						<span className="bastarNumber mapCountLabel text-center">{this.search('bastar')}</span>
					</div>
					<div className="narayanpur classHover"> 
						<img src="/Maps/Chhattisgarh/Narayanpur.png"  alt="Narayanpur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Narayanpur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Narayanpur.png")}/>
						<span className="narayanpurText mapTextLabel text-capitalize">Narayanpur</span>
						<span className="narayanpurNumber mapCountLabel text-center">{this.search('narayanpur')}</span>
					</div>
					<div className="kondagaon classHover"> 
						<img src="/Maps/Chhattisgarh/Kondagaon.png"  alt="Kondagaon"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Kondagaon_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Kondagaon.png")}/>
						<span className="kondagaonText mapTextLabel text-capitalize">Kondagaon</span>
						<span className="kondagaonNumber mapCountLabel text-center">{this.search('kondagaon')}</span>
					</div>
					<div className="uttarKanker classHover"> 
						<img src="/Maps/Chhattisgarh/Uttar_Kanker.png"  alt="Uttar_Kanker"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Uttar_Kanker_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Uttar_Kanker.png")}/>
						<span className="uttarKankerText mapTextLabel text-capitalize">Uttar_Kanker</span>
						<span className="uttarKankerNumber mapCountLabel text-center">{this.search('uttarKanker')}</span>
					</div>
					<div className="rajnandgaon classHover"> 
						<img src="/Maps/Chhattisgarh/Rajnandgaon.png"  alt="Rajnandgaon"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Rajnandgaon_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Rajnandgaon.png")}/>
						<span className="rajnandgaonText mapTextLabel text-capitalize">Rajnandgaon</span>
						<span className="rajnandgaonNumber mapCountLabel text-center">{this.search('rajnandgaon')}</span>
					</div>
					<div className="balod classHover"> 
						<img src="/Maps/Chhattisgarh/Balod.png"  alt="Balod"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Balod_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Balod.png")}/>
						<span className="balodText mapTextLabel text-capitalize">Balod</span>
						<span className="balodNumber mapCountLabel text-center">{this.search('balod')}</span>
					</div>
					<div className="dhamtari classHover"> 
						<img src="/Maps/Chhattisgarh/Dhamtari.png" alt="Dhamtari"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Dhamtari_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Dhamtari.png")}/>
						<span className="dhamtariText mapTextLabel text-capitalize">Dhamtari</span>
						<span className="dhamtariNumber mapCountLabel text-center">{this.search('dhamtari')}</span>
					</div>
					<div className="ghariaband classHover"> 
						<img src="/Maps/Chhattisgarh/Ghariaband.png" alt="Ghariaband"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Ghariaband_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Ghariaband.png")}/>
						<span className="ghariabandText mapTextLabel text-capitalize">Ghariaband</span>
						<span className="ghariabandNumber mapCountLabel text-center">{this.search('ghariaband')}</span>
					</div>
					<div className="mahasamund classHover"> 
						<img src="/Maps/Chhattisgarh/Mahasamund.png" alt="Mahasamund"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Mahasamund_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Mahasamund.png")}/>
						<span className="mahasamundText mapTextLabel text-capitalize">Mahasamund</span>
						<span className="mahasamundNumber mapCountLabel text-center">{this.search('mahasamund')}</span>
					</div>
					<div className="raipur classHover"> 
						<img src="/Maps/Chhattisgarh/Raipur.png"  alt="Raipur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Raipur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Raipur.png")}/>
						<span className="raipurText mapTextLabel text-capitalize">Raipur</span>
						<span className="raipurNumber mapCountLabel text-center">{this.search('raipur')}</span>
					</div>
					<div className="durg classHover"> 
						<img src="/Maps/Chhattisgarh/Durg.png"  alt="Durg"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Durg_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Durg.png")}/>
						<span className="durgText mapTextLabel text-capitalize">Durg</span>
						<span className="durgNumber mapCountLabel text-center">{this.search('durg')}</span>
					</div>
					<div className="kawardha classHover"> 
						<img src="/Maps/Chhattisgarh/Kawardha.png"  alt="Kawardha"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Kawardha_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Kawardha.png")}/>
						<span className="kawardhaText mapTextLabel text-capitalize">Kawardha</span>
						<span className="kawardhaNumber mapCountLabel text-center">{this.search('kawardha')}</span>
					</div>
					<div className="bemetara classHover"> 
						<img src="/Maps/Chhattisgarh/Bemetara.png"  alt="Bemetara"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Bemetara_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Bemetara.png")}/>
						<span className="bemetaraText mapTextLabel text-capitalize">Bemetara</span>
						<span className="bemetaraNumber mapCountLabel text-center">{this.search('bemetara')}</span>
					</div>
					<div className="balodaBazar classHover"> 
						<img src="/Maps/Chhattisgarh/Baloda_Bazar.png"  alt="Baloda_Bazar"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Baloda_Bazar_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Baloda_Bazar.png")}/>
						<span className="balodaBazarText mapTextLabel text-capitalize">Baloda_Bazar</span>
						<span className="balodaBazarNumber mapCountLabel text-center">{this.search('balodaBazar')}</span>
					</div>
					<div className="mungeli classHover"> 
						<img src="/Maps/Chhattisgarh/Mungeli.png"  alt="Mungeli"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Mungeli_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Mungeli.png")}/>
						<span className="mungeliText mapTextLabel text-capitalize">Mungeli</span>
						<span className="mungeliNumber mapCountLabel text-center">{this.search('mungeli')}</span>
					</div>
					<div className="janjgirChampa classHover"> 
						<img src="/Maps/Chhattisgarh/Janjgir_Champa.png"  alt="Janjgir_Champa"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Janjgir_Champa_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Janjgir_Champa.png")}/>
						<span className="janjgirChampaText mapTextLabel text-capitalize">Janjgir_Champa</span>
						<span className="janjgirChampaNumber mapCountLabel text-center">{this.search('janjgirChampa')}</span>
					</div>
					<div className="raigarh classHover"> 
						<img src="/Maps/Chhattisgarh/Raigarh.png" alt="Raigarh"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Raigarh_.png")}
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Raigarh.png")}/>
						<span className="raigarhText mapTextLabel text-capitalize">Raigarh</span>
						<span className="raigarhNumber mapCountLabel text-center">{this.search('raigarh')}</span>
					</div>
					<div className="korba classHover"> 
						<img src="/Maps/Chhattisgarh/Korba.png"  alt="Korba"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Korba_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Korba.png")}/>
						<span className="korbaText mapTextLabel text-capitalize">Korba</span>
						<span className="korbaNumber mapCountLabel text-center">{this.search('korba')}</span>
					</div>
					<div className="bilaspur classHover"> 
						<img src="/Maps/Chhattisgarh/Bilaspur.png"  alt="Bilaspur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Bilaspur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Bilaspur.png")}/>
						<span className="bilaspurText mapTextLabel text-capitalize">Bilaspur</span>
						<span className="bilaspurNumber mapCountLabel text-center">{this.search('bilaspur')}</span>
					</div>
					<div className="koriya classHover"> 
						<img src="/Maps/Chhattisgarh/Koriya.png"  alt="Koriya"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Koriya_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Koriya.png")}/>
						<span className="koriyaText mapTextLabel text-capitalize">Koriya</span>
						<span className="koriyaNumber mapCountLabel text-center">{this.search('koriya')}</span>
					</div>
					<div className="surajpur classHover"> 
						<img src="/Maps/Chhattisgarh/Surajpur.png"  alt="Surajpur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Surajpur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Surajpur.png")}/>
						<span className="surajpurText mapTextLabel text-capitalize">Surajpur</span>
						<span className="surajpurNumber mapCountLabel text-center">{this.search('surajpur')}</span>
					</div>
					<div className="balrampur classHover"> 
						<img src="/Maps/Chhattisgarh/Balrampur.png"  alt="Balrampur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Balrampur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Balrampur.png")}/>
						<span className="balrampurText mapTextLabel text-capitalize">Balrampur</span>
						<span className="balrampurNumber mapCountLabel text-center">{this.search('balrampur')}</span>
					</div>
					<div className="surguja classHover"> 
						<img src="/Maps/Chhattisgarh/Surguja.png" alt="Surguja"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Surguja_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Surguja.png")}/>
						<span className="surgujaText mapTextLabel text-capitalize">Surguja</span>
						<span className="surgujaNumber mapCountLabel text-center">{this.search('surguja')}</span>
					</div>
					<div className="jashpur classHover"> 
						<img src="/Maps/Chhattisgarh/Jashpur.png"  alt="Jashpur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Jashpur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Jashpur.png")}/>
						<span className="jashpurText mapTextLabel text-capitalize">Jashpur</span>
						<span className="jashpurNumber mapCountLabel text-center">{this.search('jashpur')}</span>
					</div>
					
				</div>
			</div>
		);
	}
}