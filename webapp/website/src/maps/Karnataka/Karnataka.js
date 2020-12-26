import React, {Component} from 'react';

import './Karnataka.css';
import '../global.css';


export default class Karnataka extends Component{

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
			<div className="bodyWrapper" style={{height:"1350px"}}>
				<div className="stateWrapper" style={{height:"1300px"}}>
					<div className="uttaraKannada  classHover"> 
						<img src="/Maps/Karnataka/Uttara_Kannada.png"  alt="Uttara_Kannada" onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Uttara_Kannada_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Uttara_Kannada.png")}/>
						<span className="uttaraKannadaText mapTextLabel text-capitalize">Uttara Kannada</span>
						<span className="uttaraKannadaNumber mapCountLabel text-center">{this.search('uttara kannada')}</span>
					</div>

					<div className="belagavi classHover"> 
						<img src="/Maps/Karnataka/Belagavi.png"  alt="Belagavi"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Belagavi_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Belagavi.png")}/>
						<span className="belagaviText mapTextLabel text-capitalize">Belagavi</span>
						<span className="belagaviNumber mapCountLabel text-center">{this.search('belagavi')}</span>
					</div>

					<div className="vijayapura classHover"> 
						<img src="/Maps/Karnataka/Vijayapura.png"  alt="Vijayapura"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Vijayapura_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Vijayapura.png")}/>
						<span className="vijayapuraText mapTextLabel text-capitalize">Vijayapura</span>
						<span className="vijayapuraNumber mapCountLabel text-center">{this.search('vijayapura')}</span>
					</div>

					<div className="gulbarga classHover"> 
						<img src="/Maps/Karnataka/Gulbarga.png"  alt="Gulbarga"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Gulbarga_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Gulbarga.png")}/>
						<span className="gulbargaText mapTextLabel text-capitalize">Gulbarga</span>
						<span className="gulbargaNumber mapCountLabel text-center">{this.search('gulbarga')}</span>
					</div>

					<div className="bidar classHover"> 
						<img src="/Maps/Karnataka/Bidar.png"  alt="Bidar"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Bidar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Bidar.png")}/>
						<span className="bidarText mapTextLabel text-capitalize">Bidar</span>
						<span className="bidarNumber mapCountLabel text-center">{this.search('bidar')}</span>
					</div>

					<div className="yadgir classHover"> 
						<img src="/Maps/Karnataka/Yadgir.png"  alt="Yadgir"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Yadgir_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Yadgir.png")}/>
						<span className="yadgirText mapTextLabel text-capitalize">Yadgir</span>
						<span className="yadgirNumber mapCountLabel text-center">{this.search('yadgir')}</span>
					</div>

					<div className="bagalkot classHover"> 
						<img src="/Maps/Karnataka/Bagalkot.png"  alt="Bagalkot"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Bagalkot_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Bagalkot.png")}/>
						<span className="bagalkotText mapTextLabel text-capitalize">Bagalkot</span>
						<span className="bagalkotNumber mapCountLabel text-center">{this.search('bagalkot')}</span>
					</div>

					<div className="dharwad classHover"> 
						<img src="/Maps/Karnataka/Dharwad.png"  alt="Dharwad"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Dharwad_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Dharwad.png")}/>
						<span className="dharwadText mapTextLabel text-capitalize">Dharwad</span>
						<span className="dharwadNumber mapCountLabel text-center">{this.search('dharwad')}</span>
					</div>

					<div className="haveri classHover"> 
						<img src="/Maps/Karnataka/Haveri.png"  alt="Haveri"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Haveri_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Haveri.png")}/>
						<span className="haveriText mapTextLabel text-capitalize">Haveri</span>
						<span className="haveriNumber mapCountLabel text-center">{this.search('haveri')}</span>
					</div>

					<div className="gadag classHover"> 
						<img src="/Maps/Karnataka/Gadag.png"  alt="Gadag"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Gadag_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Gadag.png")}/>
						<span className="gadagText mapTextLabel text-capitalize">Gadag</span>
						<span className="gadagNumber mapCountLabel text-center">{this.search('gadag')}</span>
					</div>

					<div className="koppal classHover"> 
						<img src="/Maps/Karnataka/Koppal.png"  alt="Koppal"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Koppal_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Koppal.png")}/>
						<span className="koppalText mapTextLabel text-capitalize">Koppal</span>
						<span className="koppalNumber mapCountLabel text-center">{this.search('koppal')}</span>
					</div>

					<div  className="raichur classHover"> 
						<img src="/Maps/Karnataka/Raichur.png" alt="Raichur"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Raichur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Raichur.png")}/>
						<span className="raichurText mapTextLabel text-capitalize">Raichur</span>
						<span className="raichurNumber mapCountLabel text-center">{this.search('raichur')}</span>
					</div>

					<div className="bellary classHover"> 
						<img src="/Maps/Karnataka/Bellary.png"  alt="Bellary"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Bellary_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Bellary.png")}/>
						<span className="bellaryText mapTextLabel text-capitalize">Bellary</span>
						<span className="bellaryNumber mapCountLabel text-center">{this.search('bellary')}</span>
					</div>

					<div className="davangere classHover"> 
						<img src="/Maps/Karnataka/Davangere.png"  alt="Davangere"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Davangere_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Davangere.png")}/>
						<span className="davangereText mapTextLabel text-capitalize">Davangere</span>
						<span className="davangereNumber mapCountLabel text-center">{this.search('davangere')}</span>
					</div>

					<div  className="shivamogga classHover"> 
						<img src="/Maps/Karnataka/Shivamogga.png" alt="Shivamogga"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Shivamogga_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Shivamogga.png")}/>
						<span className="shivamoggaText mapTextLabel text-capitalize">Shivamogga</span>
						<span className="shivamoggaNumber mapCountLabel text-center">{this.search('shivamogga')}</span>
					</div>

					<div  className="udupi classHover"> 
						<img src="/Maps/Karnataka/Udupi.png" alt="Udupi"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Udupi_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Udupi.png")}/>
						<span className="udupiText mapTextLabel text-capitalize">Udupi</span>
						<span className="udupiNumber mapCountLabel text-center">{this.search('udupi')}</span>
					</div>

					<div className="chikkamagaluru classHover"> 
						<img src="/Maps/Karnataka/Chikkamagaluru.png"  alt="Chikkamagaluru"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Chikkamagaluru_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Chikkamagaluru.png")}/>
						<span className="chikkamagaluruText mapTextLabel text-capitalize">Chikkamagaluru</span>
						<span className="chikkamagaluruNumber mapCountLabel text-center">{this.search('chikkamagaluru')}</span>
					</div>

					<div className="chitradurga classHover"> 
						<img src="/Maps/Karnataka/Chitradurga.png"  alt="Chitradurga"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Chitradurga_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Chitradurga.png")}/>
						<span className="chitradurgaText mapTextLabel text-capitalize">Chitradurga</span>
						<span className="chitradurgaNumber mapCountLabel text-center">{this.search('chitradurga')}</span>
					</div>

					<div className="tumakuru classHover"> 
						<img src="/Maps/Karnataka/Tumakuru.png"  alt="Tumakuru"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Tumakuru_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Tumakuru.png")}/>
						<span className="tumakuruText mapTextLabel text-capitalize">Tumakuru</span>
						<span className="tumakuruNumber mapCountLabel text-center">{this.search('tumakuru')}</span>
					</div>

					<div className="hassan classHover"> 
						<img src="/Maps/Karnataka/Hassan.png"  alt="Hassan"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Hassan_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Hassan.png")}/>
						<span className="hassanText mapTextLabel text-capitalize">Hassan</span>
						<span className="hassanNumber mapCountLabel text-center">{this.search('hassan')}</span>
					</div>

					<div className="kodagu classHover"> 
						<img src="/Maps/Karnataka/Kodagu.png"  alt="Kodagu"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Kodagu_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Kodagu.png")}/>
						<span className="kodaguText mapTextLabel text-capitalize">Kodagu</span>
						<span className="kodaguNumber mapCountLabel text-center">{this.search('kodagu')}</span>
					</div>

					<div className="mysuru classHover"> 
						<img src="/Maps/Karnataka/Mysuru.png"  alt="Mysuru"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Mysuru_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Mysuru.png")}/>
						<span className="mysuruText mapTextLabel text-capitalize">Mysuru</span>
						<span className="mysuruNumber mapCountLabel text-center">{this.search('mysuru')}</span>
					</div>

					<div className="chamarajanagar classHover"> 
						<img src="/Maps/Karnataka/Chamarajanagar.png"  alt="Chamarajanagar"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Chamarajanagar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Chamarajanagar.png")}/>
						<span className="chamarajanagarText mapTextLabel text-capitalize">Chamarajanagar</span>
						<span className="chamarajanagarNumber mapCountLabel text-center">{this.search('chamarajanagar')}</span>
					</div>

					<div className="mandya classHover"> 
						<img src="/Maps/Karnataka/Mandya.png"  alt="Mandya"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Mandya_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Mandya.png")}/>
						<span className="mandyaText mapTextLabel text-capitalize">Mandya</span>
						<span className="mandyaNumber mapCountLabel text-center">{this.search('mandya')}</span>
					</div>

					<div className="channapatnaRamanagara classHover"> 
						<img src="/Maps/Karnataka/Channapatna_Ramanagara.png"  alt="Channapatna_Ramanagara"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Channapatna_Ramanagara_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Channapatna_Ramanagara.png")}/>
						<span className="channapatnaRamanagaraText mapTextLabel text-capitalize">Ramanagara</span>
						<span className="channapatnaRamanagaraNumber mapCountLabel text-center">{this.search('ramanagara')}</span>
					</div>

					<div className="bengaluru classHover"> 
						<img src="/Maps/Karnataka/Bengaluru.png"  alt="Bengaluru"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Bengaluru_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Bengaluru.png")}/>
						<span className="bengaluruText mapTextLabel text-capitalize">Bengaluru</span>
						<span className="bengaluruNumber mapCountLabel text-center">{this.search('bengaluru')}</span>
					</div>

					<div className="bengaluruRural classHover"> 
						<img src="/Maps/Karnataka/Bengaluru_Rural.png"  alt="Bengaluru_Rural"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Bengaluru_Rural_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Bengaluru_Rural.png")}/>
						<span className="bengaluruRuralText mapTextLabel text-capitalize">Bengaluru Rural</span>
						<span className="bengaluruRuralNumber mapCountLabel text-center">{this.search('bengaluru rural')}</span>
					</div>

					<div className="chikkaballapur classHover"> 
						<img src="/Maps/Karnataka/Chikkaballapur.png"  alt="Chikkaballapur"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Chikkaballapur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Chikkaballapur.png")}/>
						<span className="chikkaballapurText mapTextLabel text-capitalize">Chikkaballapur</span>
						<span className="chikkaballapurNumber mapCountLabel text-center">{this.search('chikkaballapur')}</span>
					</div>

					<div className="kolar classHover"> 
						<img src="/Maps/Karnataka/Kolar.png"  alt="Kolar"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Kolar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Kolar.png")}/>
						<span className="kolarText mapTextLabel text-capitalize">Kolar</span>
						<span className="kolarNumber mapCountLabel text-center">{this.search('kolar')}</span>
					</div>

					

				</div>
			</div>
		);
	}
}