import React, {Component} from 'react';

import './Orissa.css';
import '../global.css';


export default class Orissa extends Component{
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
					<div className="malkangir classHover"> 
						<img src="/Maps/Orissa/Malkangir.png"  alt="Malkangir" onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Malkangir_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Malkangir.png")}/>
						<span className="malkangirText mapTextLabel text-capitalize">Malkangir</span>
						<span className="malkangirNumber mapCountLabel text-center">{this.search('malkangir')}</span>
					</div>
					<div className="koraput classHover"> 
						<img src="/Maps/Orissa/Koraput.png"  alt="Koraput"  onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Koraput_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Koraput.png")}/>
						<span className="koraputText mapTextLabel text-capitalize">Koraput</span>
						<span className="koraputNumber mapCountLabel text-center">{this.search('koraput')}</span>
					</div> 
					<div className="nabarangpur classHover"> 
						<img src="/Maps/Orissa/Nabarangpur.png"  alt="Nabarangpur"  onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Nabarangpur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Nabarangpur.png")}/>
						<span className="nabarangpurText mapTextLabel text-capitalize">Nabarangpur</span>
						<span className="nabarangpurNumber mapCountLabel text-center">{this.search('nabarangpur')}</span>
					</div>
					<div className="rayagada classHover"> 
						<img src="/Maps/Orissa/Rayagada.png"  alt="Rayagada"  onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Rayagada_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Rayagada.png")}/>
						<span className="rayagadaText mapTextLabel text-capitalize">Rayagada</span>
						<span className="rayagadaNumber mapCountLabel text-center">{this.search('rayagada')}</span>
					</div>
					<div className="kalahandi classHover"> 
						<img src="/Maps/Orissa/Kalahandi.png"  alt="Kalahandi"  onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Kalahandi_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Kalahandi.png")}/>
						<span className="kalahandiText mapTextLabel text-capitalize">Kalahandi</span>
						<span className="kalahandiNumber mapCountLabel text-center">{this.search('kalahandi')}</span>
					</div>
					<div className="nuapada classHover"> 
						<img src="/Maps/Orissa/Nuapada.png"  alt="Nuapada"  onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Nuapada_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Nuapada.png")}/>
						<span className="nuapadaText mapTextLabel text-capitalize">Nuapada</span>
						<span className="nuapadaNumber mapCountLabel text-center">{this.search('nuapada')}</span>
					</div>
					<div className="balangir classHover"> 
						<img src="/Maps/Orissa/Balangir.png"  alt="Balangir"  onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Balangir_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Balangir.png")}/>
						<span className="balangirText mapTextLabel text-capitalize">Balangir</span>
						<span className="balangirNumber mapCountLabel text-center">{this.search('balangir')}</span>
					</div>
					<div className="kandhamal classHover"> 
						<img src="/Maps/Orissa/Kandhamal.png"  alt="Kandhamal"  onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Kandhamal_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Kandhamal.png")}/>
						<span className="kandhamalText mapTextLabel text-capitalize">Kandhamal</span>
						<span className="kandhamalNumber mapCountLabel text-center">{this.search('kandhamal')}</span>
					</div>
					<div className="ganpati classHover"> 
						<img src="/Maps/Orissa/Ganpati.png"  alt="Ganpati"  onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Ganpati_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Ganpati.png")}/>
						<span className="ganpatiText mapTextLabel text-capitalize">Ganpati</span>
						<span className="ganpatiNumber mapCountLabel text-center">{this.search('ganpati')}</span>
					</div>
					<div className="ganjam classHover"> 
						<img src="/Maps/Orissa/Ganjam.png"  alt="Ganjam"  onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Ganjam_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Ganjam.png")}/>
						<span className="ganjamText mapTextLabel text-capitalize">Ganjam</span>
						<span className="ganjamNumber mapCountLabel text-center">{this.search('ganjam')}</span>
					</div>
					<div className="puri classHover"> 
						<img src="/Maps/Orissa/Puri.png"  alt="Puri"  onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Puri_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Puri.png")}/>
						<span className="puriText mapTextLabel text-capitalize">Puri</span>
						<span className="puriNumber mapCountLabel text-center">{this.search('puri')}</span>
					</div>
					<div className="khordha classHover"> 
						<img src="/Maps/Orissa/Khordha.png"  alt="Khordha"  onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Khordha_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Khordha.png")}/>
						<span className="khordhaText mapTextLabel text-capitalize">Khordha</span>
						<span className="khordhaNumber mapCountLabel text-center">{this.search('khordha')}</span>
					</div>
					<div className="nayagarh classHover"> 
						<img src="/Maps/Orissa/Nayagarh.png"  alt="Nayagarh"  onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Nayagarh_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Nayagarh.png")}/>
						<span className="nayagarhText mapTextLabel text-capitalize">Nayagarh</span>
						<span className="nayagarhNumber mapCountLabel text-center">{this.search('nayagarh')}</span>
					</div>
					<div className="boudh classHover"> 
						<img src="/Maps/Orissa/Boudh.png"  alt="Boudh"  onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Boudh_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Boudh.png")}/>
						<span className="boudhText mapTextLabel text-capitalize">Boudh</span>
						<span className="boudhNumber mapCountLabel text-center">{this.search('boudh')}</span>
					</div>
					<div className="subarnapur classHover"> 
						<img src="/Maps/Orissa/Subarnapur.png"  alt="Subarnapur" onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Subarnapur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Subarnapur.png")}/>
						<span className="subarnapurText mapTextLabel text-capitalize">Subarnapur</span>
						<span className="subarnapurNumber mapCountLabel text-center">{this.search('subarnapur')}</span>
					</div>
					<div className="bargarh classHover"> 
						<img src="/Maps/Orissa/Bargarh.png"  alt="Bargarh"  onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Bargarh_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Bargarh.png")}/>
						<span className="bargarhText mapTextLabel text-capitalize">Bargarh</span>
						<span className="bargarhNumber mapCountLabel text-center">{this.search('bargarh')}</span>	
					</div>
					<div className="jharsugunda classHover"> 
						<img src="/Maps/Orissa/Jharsugunda.png"  alt="Jharsugunda"  onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Jharsugunda_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Jharsugunda.png")}/>
						<span className="jharsugundaText mapTextLabel text-capitalize">Jharsugunda</span>
						<span className="jharsugundaNumber mapCountLabel text-center">{this.search('jharsugunda')}</span>
					</div>
					<div className="sambalpur classHover"> 
						<img src="/Maps/Orissa/Sambalpur.png"  alt="Sambalpur"  onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Sambalpur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Sambalpur.png")}/>
						<span className="sambalpurText mapTextLabel text-capitalize">Sambalpur</span>
						<span className="sambalpurNumber mapCountLabel text-center">{this.search('sambalpur')}</span>
					</div>
				
					
					<div className="angul classHover"> 
						<img src="/Maps/Orissa/Angul.png"  alt="Angul"  onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Angul_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Angul.png")}/>
						<span className="angulText mapTextLabel text-capitalize">Angul</span>
						<span className="angulNumber mapCountLabel text-center">{this.search('angul')}</span>
					</div>
					<div className="deogarh classHover"> 
						<img src="/Maps/Orissa/Deogarh.png"  alt="Deogarh"  onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Deogarh_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Deogarh.png")}/>
						<span className="deogarhText mapTextLabel text-capitalize">Deogarh</span>
						<span className="deogarhNumber mapCountLabel text-center">{this.search('deogarh')}</span>
					</div>
					<div className="dhenkanal classHover"> 
						<img src="/Maps/Orissa/Dhenkanal.png"  alt="Dhenkanal"  onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Dhenkanal_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Dhenkanal.png")}/>
						<span className="dhenkanalText mapTextLabel text-capitalize">Dhenkanal</span>
						<span className="dhenkanalNumber mapCountLabel text-center">{this.search('dhenkanal')}</span>
					</div>
					<div className="bhubaneswar classHover"> 
						<img src="/Maps/Orissa/Bhubaneswar.png"  alt="Bhubaneswar"  onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Bhubaneswar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Bhubaneswar.png")}/>
						<span className="bhubaneswarText mapTextLabel text-capitalize">Bhubaneswar</span>
						<span className="bhubaneswarNumber mapCountLabel text-center">{this.search('bhubaneswar')}</span>
					</div>
					<div className="jagatsinghpur classHover"> 
						<img src="/Maps/Orissa/Jagatsinghpur.png"  alt="Jagatsinghpur"  onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Jagatsinghpur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Jagatsinghpur.png")}/>
						<span className="jagatsinghpurText mapTextLabel text-capitalize">Jagatsinghpur</span>
						<span className="jagatsinghpurNumber mapCountLabel text-center">{this.search('jagatsinghpur')}</span>
					</div>
					<div className="kendrapara classHover"> 
						<img src="/Maps/Orissa/Kendrapara.png"  alt="Kendrapara"  onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Kendrapara_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Kendrapara.png")}/>
						<span className="kendraparaText mapTextLabel text-capitalize">Kendrapara</span>
						<span className="kendraparaNumber mapCountLabel text-center">{this.search('kendrapara')}</span>
					</div>
					<div className="jaipur classHover"> 
						<img src="/Maps/Orissa/Jaipur.png"  alt="Jaipur"  onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Jaipur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Jaipur.png")}/>
						<span className="jaipurText mapTextLabel text-capitalize">Jaipur</span>
						<span className="jaipurNumber mapCountLabel text-center">{this.search('jaipur')}</span>
					</div>
					<div className="kendujhar classHover"> 
						<img src="/Maps/Orissa/Kendujhar.png"  alt="Kendujhar"  onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Kendujhar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Kendujhar.png")}/>
						<span className="kendujharText mapTextLabel text-capitalize">Kendujhar</span>
						<span className="kendujharNumber mapCountLabel text-center">{this.search('kendujhar')}</span>
					</div>
					<div className="sundararh classHover"> 
						<img src="/Maps/Orissa/Sundararh.png"  alt="Sundararh"  onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Sundararh_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Sundararh.png")}/>
						<span className="sundararhText mapTextLabel text-capitalize">Sundararh</span>
						<span className="sundararhNumber mapCountLabel text-center">{this.search('sundararh')}</span>
					</div>
					<div className="mayurbhanj classHover"> 
						<img src="/Maps/Orissa/Mayurbhanj.png" alt="Mayurbhanj"  onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Mayurbhanj_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Mayurbhanj.png")}/>
						<span className="mayurbhanjText mapTextLabel text-capitalize">Mayurbhanj</span>
						<span className="mayurbhanjNumber mapCountLabel text-center">{this.search('mayurbhanj')}</span>
					</div>
					<div className="baleswar classHover"> 
						<img src="/Maps/Orissa/Baleswar.png"  alt="Baleswar"  onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Baleswar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Baleswar.png")}/>
						<span className="baleswarText mapTextLabel text-capitalize">Baleswar</span>
						<span className="baleswarNumber mapCountLabel text-center">{this.search('baleswar')}</span>
					</div>
					<div className="bhadrak classHover"> 
						<img src="/Maps/Orissa/Bhadrak.png"  alt="Bhadrak"  onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Bhadrak_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Bhadrak.png")}/>
						<span className="bhadrakText mapTextLabel text-capitalize">Bhadrak</span>
						<span className="bhadrakNumber mapCountLabel text-center">{this.search('bhadrak')}</span>
					</div>
				</div>
			</div>
		);
	}
}