import React, {Component} from 'react';

import './Bihar.css';
import '../global.css';


export default class Bihar extends Component{

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
					<div className="bhabua classHover"> 
						<img src="/Maps/Bihar/Bhabua.png"  alt="Bhabua" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Bhabua_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Bhabua.png")}/>
						<span className="bhabuaText mapTextLabel text-capitalize">Bhabua</span>
						<span className="bhabuaNumber mapCountLabel text-center">{this.search('bhabua')}</span>
					</div>

					<div className="rohtas classHover"> 
						<img src="/Maps/Bihar/Rohtas.png"  alt="Rohtas" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Rohtas_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Rohtas.png")}/>
						<span className="rohtasText mapTextLabel text-capitalize">Rohtas</span>
						<span className="rohtasNumber mapCountLabel text-center">{this.search('rohtas')}</span>
					</div>

					<div className="buxar classHover"> 
						<img src="/Maps/Bihar/Buxar.png"  alt="Buxar" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Buxar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Buxar.png")}/>
						<span className="buxarText mapTextLabel text-capitalize">Buxar</span>
						<span className="buxarNumber mapCountLabel text-center">{this.search('buxar')}</span>
					</div>

					<div  className="bhojpur classHover"> 
						<img src="/Maps/Bihar/Bhojpur.png" alt="Bhojpur" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Bhojpur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Bhojpur.png")}/>
						<span className="bhojpurText mapTextLabel text-capitalize">Bhojpur</span>
						<span className="bhojpurNumber mapCountLabel text-center">{this.search('bhojpur')}</span>
					</div>

					<div className="arwal classHover"> 
						<img src="/Maps/Bihar/Arwal.png"  alt="Arwal" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Arwal_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Arwal.png")}/>
						<span className="arwalText mapTextLabel text-capitalize">Arwal</span>
						<span className="arwalNumber mapCountLabel text-center">{this.search('arwal')}</span>
					</div>

					<div className="aurangabad classHover"> 
						<img src="/Maps/Bihar/Aurangabad.png"  alt="Aurangabad" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Aurangabad_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Aurangabad.png")}/>
						<span className="aurangabadText mapTextLabel text-capitalize">Aurangabad</span>
						<span className="aurangabadNumber mapCountLabel text-center">{this.search('aurangabad')}</span>
					</div>

					<div className="gaya classHover"> 
						<img src="/Maps/Bihar/Gaya.png"  alt="Gaya" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Gaya_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Gaya.png")}/>
						<span className="gayaText mapTextLabel text-capitalize">Gaya</span>
						<span className="gayaNumber mapCountLabel text-center">{this.search('gaya')}</span>
					</div>

					<div className="jehanabad classHover"> 
						<img src="/Maps/Bihar/Jehanabad.png"  alt="Jehanabad" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Jehanabad_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Jehanabad.png")}/>
						<span className="jehanabadText mapTextLabel text-capitalize">Jehanabad</span>
						<span className="jehanabadNumber mapCountLabel text-center">{this.search('jehanabad')}</span>
					</div>

					<div className="patna classHover"> 
						<img src="/Maps/Bihar/Patna.png"  alt="Patna" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Patna_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Patna.png")}/>
						<span className="patnaText mapTextLabel text-capitalize">Patna</span>
						<span className="patnaNumber mapCountLabel text-center">{this.search('patna')}</span>
					</div>

					<div className="saran classHover"> 
						<img src="/Maps/Bihar/Saran.png"  alt="Saran" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Saran_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Saran.png")}/>
						<span className="saranText mapTextLabel text-capitalize">Saran</span>
						<span className="saranNumber mapCountLabel text-center">{this.search('saran')}</span>
					</div>

					<div className="siwan classHover"> 
						<img src="/Maps/Bihar/Siwan.png"  alt="Siwan" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Siwan_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Siwan.png")}/>
						<span className="siwanText mapTextLabel text-capitalize">Siwan</span>
						<span className="siwanNumber mapCountLabel text-center">{this.search('siwan')}</span>
					</div>

					<div className="gopalganj classHover"> 
						<img src="/Maps/Bihar/Gopalganj.png"  alt="Gopalganj" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Gopalganj_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Gopalganj.png")}/>
						<span className="gopalganjText mapTextLabel text-capitalize">Gopalganj</span>
						<span className="gopalganjNumber mapCountLabel text-center">{this.search('gopalganj')}</span>
					</div>

					<div className="bettiah classHover"> 
						<img src="/Maps/Bihar/Bettiah.png"  alt="Bettiah" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Bettiah_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Bettiah.png")}/>
						<span className="bettiahText mapTextLabel text-capitalize">Bettiah</span>
						<span className="bettiahNumber mapCountLabel text-center">{this.search('bettiah')}</span>
					</div>

					<div className="motihari classHover"> 
						<img src="/Maps/Bihar/Motihari.png"  alt="Motihari" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Motihari_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Motihari.png")}/>
						<span className="motihariText mapTextLabel text-capitalize">Motihari</span>
						<span className="motihariNumber mapCountLabel text-center">{this.search('motihari')}</span>
					</div>

					<div className="muzaffrpur classHover"> 
						<img src="/Maps/Bihar/Muzaffrpur.png"  alt="Muzaffrpur" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Muzaffrpur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Muzaffrpur.png")}/>
						<span className="muzaffrpurText mapTextLabel text-capitalize">Muzaffarpur</span>
						<span className="muzaffrpurNumber mapCountLabel text-center">{this.search('muzaffarpur')}</span>
					</div>

					<div className="vaishali classHover"> 
						<img src="/Maps/Bihar/Vaishali.png"  alt="Vaishali" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Vaishali_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Vaishali.png")}/>
						<span className="vaishaliText mapTextLabel text-capitalize">Vaishali</span>
						<span className="vaishaliNumber mapCountLabel text-center">{this.search('vaishali')}</span>
					</div>

					<div className="nalanda classHover"> 
						<img src="/Maps/Bihar/Nalanda.png"  alt="Nalanda" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Nalanda_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Nalanda.png")}/>
						<span className="nalandaText mapTextLabel text-capitalize">Nalanda</span>
						<span className="nalandaNumber mapCountLabel text-center">{this.search('nalanda')}</span>
					</div>

					<div className="nawada classHover"> 
						<img src="/Maps/Bihar/Nawada.png"  alt="Nawada" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Nawada.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Nawada.png")}/>
						<span className="nawadaText mapTextLabel text-capitalize">Nawada</span>
						<span className="nawadaNumber mapCountLabel text-center">{this.search('nawada')}</span>
					</div>

					<div className="jamui classHover"> 
						<img src="/Maps/Bihar/Jamui.png"  alt="Jamui" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Jamui_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Jamui.png")}/>
						<span className="jamuiText mapTextLabel text-capitalize">Jamui</span>
						<span className="jamuiNumber mapCountLabel text-center">{this.search('jamui')}</span>
					</div>

					<div className="sheikpura classHover"> 
						<img src="/Maps/Bihar/Sheikpura.png"  alt="Sheikpura" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Sheikpura_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Sheikpura.png")}/>
						<span className="sheikpuraText mapTextLabel text-capitalize">Sheikpura</span>
						<span className="sheikpuraNumber mapCountLabel text-center">{this.search('sheikpura')}</span>
					</div>

					<div className="lakhisarai classHover"> 
						<img src="/Maps/Bihar/Lakhisarai.png"  alt="Lakhisarai" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Lakhisarai_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Lakhisarai.png")}/>
						<span className="lakhisaraiText mapTextLabel text-capitalize">Lakhisarai</span>
						<span className="lakhisaraiNumber mapCountLabel text-center">{this.search('lakhisarai')}</span>
					</div>

					<div className="begusarai classHover"> 
						<img src="/Maps/Bihar/Begusarai.png"  alt="Begusarai" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Begusarai_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Begusarai.png")}/>
						<span className="begusaraiText mapTextLabel text-capitalize">Begusarai</span>
						<span className="begusaraiNumber mapCountLabel text-center">{this.search('begusarai')}</span>
					</div>

					<div className="samastipur classHover"> 
						<img src="/Maps/Bihar/Samastipur.png"  alt="Samastipur" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Samastipur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Samastipur.png")}/>
						<span className="samastipurText mapTextLabel text-capitalize">Samastipur</span>
						<span className="samastipurNumber mapCountLabel text-center">{this.search('samastipur')}</span>
					</div>

					<div className="darbhanga classHover"> 
						<img src="/Maps/Bihar/Darbhanga.png"  alt="Darbhanga" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Darbhanga_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Darbhanga.png")}/>
						<span className="darbhangaText mapTextLabel text-capitalize">Darbhanga</span>
						<span className="darbhangaNumber mapCountLabel text-center">{this.search('darbhanga')}</span>
					</div>

					<div className="sitamarihi classHover"> 
						<img src="/Maps/Bihar/Sitamarihi.png"  alt="Sitamarihi" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Sitamarihi_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Sitamarihi.png")}/>
						<span className="sitamarihiText mapTextLabel text-capitalize">Sitamarihi</span>
						<span className="sitamarihiNumber mapCountLabel text-center">{this.search('sitamarihi')}</span>
					</div>

					<div className="sheohar classHover"> 
						<img src="/Maps/Bihar/Sheohar.png"  alt="Sheohar" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Sheohar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Sheohar.png")}/>
						<span className="sheoharText mapTextLabel text-capitalize">Sheohar</span>
						<span className="sheoharNumber mapCountLabel text-center">{this.search('sheohar')}</span>
					</div>

					<div className="madhubani classHover"> 
						<img src="/Maps/Bihar/Madhubani.png"  alt="Madhubani" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Madhubani_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Madhubani.png")}/>
						<span className="madhubaniText mapTextLabel text-capitalize">Madhubani</span>
						<span className="madhubaniNumber mapCountLabel text-center">{this.search('madhubani')}</span>
					</div>

					<div className="supaul classHover"> 
						<img src="/Maps/Bihar/Supaul.png"  alt="Supaul" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Supaul_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Supaul.png")}/>
						<span className="supaulText mapTextLabel text-capitalize">Supaul</span>
						<span className="supaulNumber mapCountLabel text-center">{this.search('supaul')}</span>
					</div>

					<div className="saharsa classHover"> 
						<img src="/Maps/Bihar/Saharsa.png"  alt="Saharsa" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Saharsa_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Saharsa.png")}/>
						<span className="saharsaText mapTextLabel text-capitalize">Saharsa</span>
						<span className="saharsaNumber mapCountLabel text-center">{this.search('saharsa')}</span>
					</div>

					<div className="khagaria classHover"> 
						<img src="/Maps/Bihar/Khagaria.png"  alt="Khagaria" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Khagaria_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Khagaria.png")}/>
						<span className="khagariaText mapTextLabel text-capitalize">Khagaria</span>
						<span className="khagariaNumber mapCountLabel text-center">{this.search('khagaria')}</span>
					</div>

					<div className="munger classHover"> 
						<img src="/Maps/Bihar/Munger.png"  alt="Munger" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Munger_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Munger.png")}/>
						<span className="mungerText mapTextLabel text-capitalize">Munger</span>
						<span className="mungerNumber mapCountLabel text-center">{this.search('munger')}</span>
					</div>

					<div className="banka classHover"> 
						<img src="/Maps/Bihar/Banka.png"  alt="Banka" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Banka_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Banka.png")}/>
						<span className="bankaText mapTextLabel text-capitalize">Banka</span>
						<span className="bankaNumber mapCountLabel text-center">{this.search('banka')}</span>
					</div>

					<div className="bhagalpur classHover"> 
						<img src="/Maps/Bihar/Bhagalpur.png"  alt="Bhagalpur" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Bhagalpur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Bhagalpur.png")}/>
						<span className="bhagalpurText mapTextLabel text-capitalize">Bhagalpur</span>
						<span className="bhagalpurNumber mapCountLabel text-center">{this.search('bhagalpur')}</span>
					</div>

					<div className="mahepura classHover"> 
						<img src="/Maps/Bihar/Mahepura.png"  alt="Mahepura" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Mahepura_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Mahepura.png")}/>
						<span className="mahepuraText mapTextLabel text-capitalize">Mahepura</span>
						<span className="mahepuraNumber mapCountLabel text-center">{this.search('mahepura')}</span>
					</div>

					<div className="araria classHover"> 
						<img src="/Maps/Bihar/Araria.png"  alt="Araria" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Araria_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Araria.png")}/>
						<span className="arariaText mapTextLabel text-capitalize">Araria</span>
						<span className="arariaNumber mapCountLabel text-center">{this.search('araria')}</span>
					</div>

					<div className="purnea classHover"> 
						<img src="/Maps/Bihar/Purnea.png"  alt="Purnea" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Purnea_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Purnea.png")}/>
						<span className="purneaText mapTextLabel text-capitalize">Purnea</span>
						<span className="purneaNumber mapCountLabel text-center">{this.search('purnea')}</span>
					</div>

					<div className="katihar classHover"> 
						<img src="/Maps/Bihar/Katihar.png"  alt="Katihar" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Katihar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Katihar.png")}/>
						<span className="katiharText mapTextLabel text-capitalize">Katihar</span>
						<span className="katiharNumber mapCountLabel text-center">{this.search('katihar')}</span>
					</div>

					<div className="kishanganj classHover"> 
						<img src="/Maps/Bihar/Kishanganj.png"  alt="Kishanganj" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Kishanganj_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Kishanganj.png")}/>
						<span className="kishanganjText mapTextLabel text-capitalize">Kishanganj</span>
						<span className="kishanganjNumber mapCountLabel text-center">{this.search('kishanganj')}</span>
					</div>

				
				</div>
			</div>
		);
	}
}