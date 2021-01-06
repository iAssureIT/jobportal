import React, {Component} from 'react';

import './Telangana.css';
import '../global.css';


export default class Telangana extends Component{
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
					<div className="adilabad classHover"> 
						<img src="/Maps/Telangana/Adilabad.png"  alt="Adilabad" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Adilabad_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Adilabad.png")}/>
						<span className="adilabadText mapTextLabel text-capitalize">Adilabad</span>
						<span className="adilabadNumber mapCountLabel text-center">{this.search('adilabad')}</span>
					</div>
					<div className="komaramBheem classHover"> 
						<img src="/Maps/Telangana/Komaram_Bheem.png"  alt="Komaram_Bheem" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Komaram_Bheem_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Komaram_Bheem.png")}/>
						<span className="komaramBheemText mapTextLabel text-capitalize">Komaram_Bheem</span>
						<span className="komaramBheemNumber mapCountLabel text-center">{this.search('komaramBheem')}</span>
					</div>
					
					<div className="nirmal classHover"> 
						<img src="/Maps/Telangana/Nirmal.png"  alt="Nirmal"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Nirmal_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Nirmal.png")}/>
						<span className="nirmalText mapTextLabel text-capitalize">Nirmal</span>
						<span className="nirmalNumber mapCountLabel text-center">{this.search('nirmal')}</span>
					</div>
					<div className="mancherial classHover"> 
						<img src="/Maps/Telangana/Mancherial.png"  alt="Mancherial"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Mancherial_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Mancherial.png")}/>
						<span className="mancherialText mapTextLabel text-capitalize">Mancherial</span>
						<span className="mancherialNumber mapCountLabel text-center">{this.search('mancherial')}</span>
					</div>
					<div className="nizamabad classHover"> 
						<img src="/Maps/Telangana/Nizamabad.png"  alt="Nizamabad" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Nizamabad_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Nizamabad.png")}/>
						<span className="nizamabadText mapTextLabel text-capitalize">Nizamabad</span>
						<span className="nizamabadNumber mapCountLabel text-center">{this.search('nizamabad')}</span>
					</div>
					<div className="jagtial classHover"> 
						<img src="/Maps/Telangana/Jagtial.png"  alt="Jagtial"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Jagtial_.png")}
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Jagtial.png")}/>
						<span className="jagtialText mapTextLabel text-capitalize">Jagtial</span>
						<span className="jagtialNumber mapCountLabel text-center">{this.search('jagtial')}</span>
					</div>
					<div className="peddapalle classHover"> 
						<img src="/Maps/Telangana/Peddapalle.png"  alt="Peddapalle"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Peddapalle_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Peddapalle.png")}/>
						<span className="peddapalleText mapTextLabel text-capitalize">Peddapalle</span>
						<span className="peddapalleNumber mapCountLabel text-center">{this.search('peddapalle')}</span>
					</div>
					<div className="jayaShankar classHover"> 
						<img src="/Maps/Telangana/Jaya_Shankar.png"  alt="Jaya_Shankar"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Jaya_Shankar_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Jaya_Shankar.png")}/>
						<span className="jayaShankarText mapTextLabel text-capitalize">Jaya_Shankar</span>
						<span className="jayaShankarNumber mapCountLabel text-center">{this.search('jayaShankar')}</span>
					</div>
					<div className="kamareddy classHover"> 
						<img src="/Maps/Telangana/Kamareddy.png"  alt="Kamareddy"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Kamareddy_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Kamareddy.png")}/>
						<span className="kamareddyText mapTextLabel text-capitalize">Kamareddy</span>
						<span className="kamareddyNumber mapCountLabel text-center">{this.search('kamareddy')}</span>
					</div>
					<div className="sircilla classHover"> 
						<img src="/Maps/Telangana/Sircilla.png"  alt="Sircilla"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Sircilla_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Sircilla.png")}/>
						<span className="sircillaText mapTextLabel text-capitalize">Sircilla</span>
						<span className="sircillaNumber mapCountLabel text-center">{this.search('sircilla')}</span>
					</div>
					<div className="karimnagar classHover"> 
						<img src="/Maps/Telangana/Karimnagar.png"  alt="Karimnagar"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Karimnagar_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Karimnagar.png")}/>
						<span className="karimnagarText mapTextLabel text-capitalize">Karimnagar</span>
						<span className="karimnagarNumber mapCountLabel text-center">{this.search('karimnagar')}</span>
					</div>
					<div className="sangareddy classHover"> 
						<img src="/Maps/Telangana/Sangareddy.png"  alt="Sangareddy"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Sangareddy_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Sangareddy.png")}/>
						<span className="sangareddyText mapTextLabel text-capitalize">Sangareddy</span>
						<span className="sangareddyNumber mapCountLabel text-center">{this.search('sangareddy')}</span>
					</div>
					<div className="medak classHover"> 
						<img src="/Maps/Telangana/Medak.png"  alt="Medak"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Medak_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Medak.png")}/>
						<span className="medakText mapTextLabel text-capitalize">Medak</span>
						<span className="medakNumber mapCountLabel text-center">{this.search('medak')}</span>
					</div>
					<div className="siddipet classHover"> 
						<img src="/Maps/Telangana/Siddipet.png"  alt="Siddipet"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Siddipet_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Siddipet.png")}/>
						<span className="siddipetText mapTextLabel text-capitalize">Siddipet</span>
						<span className="siddipetNumber mapCountLabel text-center">{this.search('siddipet')}</span>
					</div>
					
					
					
					<div className="mahabubabad classHover"> 
						<img src="/Maps/Telangana/Mahabubabad.png"  alt="Mahabubabad"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Mahabubabad_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Mahabubabad.png")}/>
						<span className="mahabubabadText mapTextLabel text-capitalize">Mahabubabad</span>
						<span className="mahabubabadNumber mapCountLabel text-center">{this.search('mahabubabad')}</span>
					</div>
					<div className="warangalRural classHover"> 
						<img src="/Maps/Telangana/Warangal_Rural.png"  alt="Warangal_Rural"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Warangal_Rural_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Warangal_Rural.png")}/>
						<span className="warangalRuralText mapTextLabel text-capitalize">Warangal_Rural</span>
						<span className="warangalRuralNumber mapCountLabel text-center">{this.search('warangalRural')}</span>
					</div>
					<div className="warangalUrban classHover"> 
						<img src="/Maps/Telangana/Warangal_Urban.png"  alt="Warangal_Urban"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Warangal_Urban_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Warangal_Urban.png")}/>
						<span className="warangalUrbanText mapTextLabel text-capitalize">Warangal_Urban</span>
						<span className="warangalUrbanNumber mapCountLabel text-center">{this.search('warangalUrban')}</span>
					</div>
					<div className="jangaon classHover"> 
						<img src="/Maps/Telangana/Jangaon.png"  alt="Jangaon"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Jangaon_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Jangaon.png")}/>
						<span className="jangaonText mapTextLabel text-capitalize">Jangaon</span>
						<span className="jangaonNumber mapCountLabel text-center">{this.search('jangaon')}</span>
					</div>
					
					<div className="kothagudem classHover"> 
						<img src="/Maps/Telangana/Kothagudem.png"  alt="Kothagudem"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Kothagudem_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Kothagudem.png")}/>
						<span className="kothagudemText mapTextLabel text-capitalize">Kothagudem</span>
						<span className="kothagudemNumber mapCountLabel text-center">{this.search('kothagudem')}</span>
					</div>
					<div className="vikarabad classHover"> 
						<img src="/Maps/Telangana/Vikarabad.png"  alt="Vikarabad"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Vikarabad_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Vikarabad.png")}/>
						<span className="vikarabadText mapTextLabel text-capitalize">Vikarabad</span>
						<span className="vikarabadNumber mapCountLabel text-center">{this.search('vikarabad')}</span>
					</div>
					<div className="rangareddy classHover"> 
						<img src="/Maps/Telangana/Rangareddy.png"  alt="Rangareddy"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Rangareddy_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Rangareddy.png")}/>
						<span className="rangareddyText mapTextLabel text-capitalize">Rangareddy</span>
						<span className="rangareddyNumber mapCountLabel text-center">{this.search('rangareddy')}</span>
					</div>
					<div className="medchal classHover"> 
						<img src="/Maps/Telangana/Medchal.png"  alt="Medchal"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Medchal_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Medchal.png")}/>
						<span className="medchalText mapTextLabel text-capitalize">Medchal</span>
						<span className="medchalNumber mapCountLabel text-center">{this.search('medchal')}</span>
					</div>
					<div className="bhavnagiri classHover"> 
						<img src="/Maps/Telangana/Bhavnagiri.png"  alt="Bhavnagiri"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Bhavnagiri_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Bhavnagiri.png")}/>
						<span className="bhavnagiriText mapTextLabel text-capitalize">Bhavnagiri</span>
						<span className="bhavnagiriNumber mapCountLabel text-center">{this.search('bhavnagiri')}</span>
					</div>
					<div className="suryape classHover"> 
						<img src="/Maps/Telangana/Suryape.png"  alt="Suryape"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Suryape_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Suryape.png")}/>
						<span className="suryapeText mapTextLabel text-capitalize">Suryape</span>
						<span className="suryapeNumber mapCountLabel text-center">{this.search('suryape')}</span>
					</div>
					<div className="khammam classHover"> 
						<img src="/Maps/Telangana/Khammam.png"  alt="Khammam"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Khammam_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Khammam.png")}/>
						<span className="khammamText mapTextLabel text-capitalize">Khammam</span>
						<span className="khammamNumber mapCountLabel text-center">{this.search('khammam')}</span>
					</div>
					<div className="nalgonda classHover"> 
						<img src="/Maps/Telangana/Nalgonda.png"  alt="Nalgonda"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Nalgonda_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Nalgonda.png")}/>
						<span className="nalgondaText mapTextLabel text-capitalize">Nalgonda</span>
						<span className="nalgondaNumber mapCountLabel text-center">{this.search('nalgonda')}</span>
					</div>
					<div className="nagarkurnool classHover"> 
						<img src="/Maps/Telangana/Nagarkurnool.png"  alt="Nagarkurnool"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Nagarkurnool_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Nagarkurnool.png")}/>
						<span className="nagarkurnoolText mapTextLabel text-capitalize">Nagarkurnool</span>
						<span className="nagarkurnoolNumber mapCountLabel text-center">{this.search('nagarkurnool')}</span>
					</div>
					<div className="mahabubnagar classHover"> 
						<img src="/Maps/Telangana/Mahabubnagar.png"  alt="Mahabubnagar"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Mahabubnagar_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Mahabubnagar.png")}/>
						<span className="mahabubnagarText mapTextLabel text-capitalize">Mahabubnagar</span>
						<span className="mahabubnagarNumber mapCountLabel text-center">{this.search('mahabubnagar')}</span>
					</div>
					<div className="wanaparthy classHover"> 
						<img src="/Maps/Telangana/Wanaparthy.png"  alt="Wanaparthy"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Wanaparthy_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Wanaparthy.png")}/>
						<span className="wanaparthyText mapTextLabel text-capitalize">Wanaparthy</span>
						<span className="wanaparthyNumber mapCountLabel text-center">{this.search('wanaparthy')}</span>
					</div>
					<div className="jogulambaGadwal classHover"> 
						<img src="/Maps/Telangana/Jogulamba_Gadwal.png"  alt="Jogulamba_Gadwal"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Jogulamba_Gadwal_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Jogulamba_Gadwal.png")}/>
						<span className="jogulambaGadwalText mapTextLabel text-capitalize">Jogulamba_Gadwal</span>
						<span className="jogulambaGadwalNumber mapCountLabel text-center">{this.search('jogulambaGadwal')}</span>
					</div>
					
					
				</div>
			</div>
		);
	}
}