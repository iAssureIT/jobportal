import React, {Component} from 'react';

import './ArunachalPradesh.css';
import '../global.css';


export default class AndhraPradesh extends Component{
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
					<div className="tawang classHover"> 
						<img src="/Maps/Arunachal_Pradesh/Tawang.png"  alt="Tawang" onMouseOver={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Tawang_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Tawang.png")}/>
						<span className="tawangText mapTextLabel text-capitalize">Tawang</span>
						<span className="tawangNumber mapCountLabel text-center">{this.search('tawang')}</span>
					</div>
					<div className="westKameng classHover"> 
						<img src="/Maps/Arunachal_Pradesh/West_Kameng.png"  alt="West_Kameng" onMouseOver={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/West_Kameng_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/West_Kameng.png")}/>
					    <span className="westKamengText mapTextLabel text-capitalize">West_Kameng</span>
						<span className="westKamengNumber mapCountLabel text-center">{this.search('westKameng')}</span>
					</div>
					<div className="eastKameng classHover"> 
						<img src="/Maps/Arunachal_Pradesh/East_Kameng.png"  alt="East_Kameng" onMouseOver={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/East_Kameng_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/East_Kameng.png")}/>
						<span className="eastKamengText mapTextLabel text-capitalize">East_Kameng</span>
						<span className="eastKamengNumber mapCountLabel text-center">{this.search('eastKameng')}</span>
					</div>
					<div className="kurungKumey classHover"> 
						<img src="/Maps/Arunachal_Pradesh/Kurung_Kumey.png"  alt="Kurung_Kumey" onMouseOver={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Kurung_Kumey_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Kurung_Kumey.png")}/>
						<span className="kurungKumeyText mapTextLabel text-capitalize">Kurung_Kumey</span>
						<span className="kurungKumeyNumber mapCountLabel text-center">{this.search('kurungKumey')}</span>
					</div>
					<div className="papumPare classHover"> 
						<img src="/Maps/Arunachal_Pradesh/Papum_Pare.png"  alt="Papum_Pare" onMouseOver={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Papum_Pare_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Papum_Pare.png")}/>
						<span className="papumPareText mapTextLabel text-capitalize">Papum_Pare</span>
						<span className="papumPareNumber mapCountLabel text-center">{this.search('papumPare')}</span>
					</div>
					
					<div className="kraDaadi classHover"> 
						<img src="/Maps/Arunachal_Pradesh/KRA_Daadi.png"  alt="KRA_Daadi" onMouseOver={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/KRA_Daadi_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/KRA_Daadi.png")}/>
						<span className="kraDaadiText mapTextLabel text-capitalize">KRA_Daadi</span>
						<span className="kraDaadiNumber mapCountLabel text-center">{this.search('kraDaadi')}</span>
					</div>

					<div className="upperSubansiri classHover"> 
						<img src="/Maps/Arunachal_Pradesh/Upper_Subansiri.png" alt="Upper_Subansiri" onMouseOver={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Upper_Subansiri_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Upper_Subansiri.png")}/>
						<span className="upperSubansiriText mapTextLabel text-capitalize">Upper_Subansiri</span>
						<span className="upperSubansiriNumber mapCountLabel text-center">{this.search('upperSubansiri')}</span>
					</div>
					<div className="westSiang classHover"> 
						<img src="/Maps/Arunachal_Pradesh/West_Siang.png" alt="West_Siang" onMouseOver={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/West_Siang_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/West_Siang.png")}/>
						<span className="westSiangText mapTextLabel text-capitalize">West_Siang</span>
						<span className="westSiangNumber mapCountLabel text-center">{this.search('westSiang')}</span>
					</div>
					<div className="lowerSubansiri classHover"> 
						<img src="/Maps/Arunachal_Pradesh/Lower_Subansiri.png"  alt="Lower_Subansiri" onMouseOver={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Lower_Subansiri_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Lower_Subansiri.png")}/>
						<span className="lowerSubansiriText mapTextLabel text-capitalize">Lower_Subansiri</span>
						<span className="lowerSubansiriNumber mapCountLabel text-center">{this.search('lowerSubansiri')}</span>
					</div>
					<div className="yingkiong classHover"> 
						<img src="/Maps/Arunachal_Pradesh/Yingkiong.png" alt="Yingkiong" onMouseOver={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Yingkiong_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Yingkiong.png")}/>
						<span className="yingkiongText mapTextLabel text-capitalize">Yingkiong</span>
						<span className="yingkiongNumber mapCountLabel text-center">{this.search('yingkiong')}</span>
					</div>
					<div className="eastSiang classHover"> 
						<img src="/Maps/Arunachal_Pradesh/East_Siang.png"  alt="East_Siang" onMouseOver={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/East_Siang_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/East_Siang.png")}/>
						<span className="eastSiangText mapTextLabel text-capitalize">East_Siang</span>
						<span className="eastSiangNumber mapCountLabel text-center">{this.search('eastSiang')}</span>
					</div>
					<div className="dibangValley classHover"> 
						<img src="/Maps/Arunachal_Pradesh/Dibang_Valley.png"  alt="Dibang_Valley" onMouseOver={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Dibang_Valley_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Dibang_Valley.png")}/>
						<span className="dibangValleyText mapTextLabel text-capitalize">Dibang_Valley</span>
						<span className="dibangValleyNumber mapCountLabel text-center">{this.search('dibangValley')}</span>
					</div>
					
					<div className="lohit classHover"> 
						<img src="/Maps/Arunachal_Pradesh/Lohit.png" alt="Lohit" onMouseOver={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Lohit_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Lohit.png")}/>
						<span className="lohitText mapTextLabel text-capitalize">Lohit</span>
						<span className="lohitNumber mapCountLabel text-center">{this.search('lohit')}</span>
					</div>

					<div className="anjaw classHover"> 
						<img src="/Maps/Arunachal_Pradesh/Anjaw.png"  alt="Anjaw" onMouseOver={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Anjaw_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Anjaw.png")}/>
						<span className="anjawText mapTextLabel text-capitalize">Anjaw</span>
						<span className="anjawNumber mapCountLabel text-center">{this.search('anjaw')}</span>
					</div>
					<div className="lowerDibangValley classHover"> 
						<img src="/Maps/Arunachal_Pradesh/Lower_Dibang_Valley.png" alt="Lower_Dibang_Valley" onMouseOver={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Lower_Dibang_Valley_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Lower_Dibang_Valley.png")}/>
						<span className="lowerDibangValleyText mapTextLabel text-capitalize">Lower_Dibang_Valley</span>
						<span className="lowerDibangValleyNumber mapCountLabel text-center">{this.search('lowerDibangValley')}</span>
					</div>
					<div className="changlang classHover"> 
						<img src="/Maps/Arunachal_Pradesh/Changlang.png"  alt="Changlang" onMouseOver={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Changlang_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Changlang.png")}/>
						<span className="changlangText mapTextLabel text-capitalize">Changlang</span>
						<span className="changlangNumber mapCountLabel text-center">{this.search('changlang')}</span>
					</div>
					<div className="namsai classHover"> 
						<img src="/Maps/Arunachal_Pradesh/Namsai.png"  alt="Namsai" onMouseOver={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Namsai_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Namsai.png")}/>
						<span className="namsaiText mapTextLabel text-capitalize">Namsai</span>
						<span className="namsaiNumber mapCountLabel text-center">{this.search('namsai')}</span>
					</div>
					<div className="khonsa classHover"> 
						<img src="/Maps/Arunachal_Pradesh/Khonsa.png"  alt="Khonsa" onMouseOver={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Khonsa_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Khonsa.png")}/>
						<span className="khonsaText mapTextLabel text-capitalize">Khonsa</span>
						<span className="khonsaNumber mapCountLabel text-center">{this.search('khonsa')}</span>
					</div>
					<div className="langding classHover"> 
						<img src="/Maps/Arunachal_Pradesh/Langding.png" alt="Langding" onMouseOver={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Langding_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Langding.png")}/>
						<span className="langdingText mapTextLabel text-capitalize">Langding</span>
						<span className="langdingNumber mapCountLabel text-center">{this.search('langding')}</span>
					</div>
					
					
				</div>
			</div>
		);
	}
}