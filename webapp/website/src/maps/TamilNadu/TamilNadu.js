import React, {Component} from 'react';

import './TamilNadu.css';
import '../global.css';


export default class TamilNadu extends Component{
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
					<div className="tiruvallur classHover"> 
						<img src="/Maps/Tamil_Nadu/Tiruvallur.png"  alt="Tiruvallur" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Tiruvallur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Tiruvallur.png")}/>
						<span className="tiruvallurText mapTextLabel text-capitalize">Tiruvallur</span>
						<span className="tiruvallurNumber mapCountLabel text-center">{this.search('tiruvallur')}</span>
					</div>
					<div className="chennai classHover"> 
						<img src="/Maps/Tamil_Nadu/Chennai.png"  alt="Chennai" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Chennai_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Chennai.png")}/>
						<span className="chennaiText mapTextLabel text-capitalize">Chennai</span>
						<span className="chennaiNumber mapCountLabel text-center">{this.search('chennai')}</span>
					</div>
					
					<div className="ranipet classHover"> 
						<img src="/Maps/Tamil_Nadu/Ranipet.png"  alt="Ranipet"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Ranipet_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Ranipet.png")}/>
						<span className="ranipetText mapTextLabel text-capitalize">Ranipet</span>
						<span className="ranipetNumber mapCountLabel text-center">{this.search('ranipet')}</span>
					</div>
					<div className="vellore classHover"> 
						<img src="/Maps/Tamil_Nadu/Vellore.png"  alt="Vellore"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Vellore_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Vellore.png")}/>
						<span className="velloreText mapTextLabel text-capitalize">Vellore</span>
						<span className="velloreNumber mapCountLabel text-center">{this.search('vellore')}</span>
					</div>
					<div className="chengalpattu classHover"> 
						<img src="/Maps/Tamil_Nadu/Chengalpattu.png"  alt="Chengalpattu" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Chengalpattu_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Chengalpattu.png")}/>
						<span className="chengalpattuText mapTextLabel text-capitalize">Chengalpattu</span>
						<span className="chengalpattuNumber mapCountLabel text-center">{this.search('chengalpattu')}</span>
					</div>
					<div className="kanchipuram classHover"> 
						<img src="/Maps/Tamil_Nadu/Kanchipuram.png"  alt="Kanchipuram"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Kanchipuram_.png")}
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Kanchipuram.png")}/>
						<span className="kanchipuramText mapTextLabel text-capitalize">Kanchipuram</span>
						<span className="kanchipuramNumber mapCountLabel text-center">{this.search('kanchipuram')}</span>
					</div>
					<div className="tiruvannamalai classHover"> 
						<img src="/Maps/Tamil_Nadu/Tiruvannamalai.png"  alt="Tiruvannamalai"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Tiruvannamalai_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Tiruvannamalai.png")}/>
						<span className="tiruvannamalaiText mapTextLabel text-capitalize">Tiruvannamalai</span>
						<span className="tiruvannamalaiNumber mapCountLabel text-center">{this.search('tiruvannamalai')}</span>
					</div>
					<div className="tirupattur classHover"> 
						<img src="/Maps/Tamil_Nadu/Tirupattur.png"  alt="Tirupattur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Tirupattur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Tirupattur.png")}/>
						<span className="tirupatturText mapTextLabel text-capitalize">Tirupattur</span>
						<span className="tirupatturNumber mapCountLabel text-center">{this.search('tirupattur')}</span>
					</div>
					<div className="krishnagiri classHover"> 
						<img src="/Maps/Tamil_Nadu/Krishnagiri.png"  alt="Krishnagiri"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Krishnagiri_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Krishnagiri.png")}/>
						<span className="krishnagiriText mapTextLabel text-capitalize">Krishnagiri</span>
						<span className="krishnagiriNumber mapCountLabel text-center">{this.search('krishnagiri')}</span>
					</div>
					<div className="viluppuram classHover"> 
						<img src="/Maps/Tamil_Nadu/Viluppuram.png"  alt="Viluppuram"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Viluppuram_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Viluppuram.png")}/>
						<span className="viluppuramText mapTextLabel text-capitalize">Viluppuram</span>
						<span className="viluppuramNumber mapCountLabel text-center">{this.search('viluppuram')}</span>
					</div>
					<div className="puducherry classHover"> 
						<img src="/Maps/Tamil_Nadu/Puducherry.png"  alt="Puducherry"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Puducherry_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Puducherry.png")}/>
						<span className="puducherryText mapTextLabel text-capitalize">Puducherry</span>
						<span className="puducherryNumber mapCountLabel text-center">{this.search('puducherry')}</span>
					</div>
					<div className="kallakurichi classHover"> 
						<img src="/Maps/Tamil_Nadu/Kallakurichi.png"  alt="Kallakurichi"Kallakurichi
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Kallakurichi_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Kallakurichi.png")}/>
						<span className="kallakurichiText mapTextLabel text-capitalize">Kallakurichi</span>
						<span className="kallakurichiNumber mapCountLabel text-center">{this.search('kallakurichi')}</span>
					</div>
					<div className="dharmapuri classHover"> 
						<img src="/Maps/Tamil_Nadu/Dharmapuri.png"  alt="Dharmapuri"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Dharmapuri_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Dharmapuri.png")}/>
						<span className="dharmapuriText mapTextLabel text-capitalize">Dharmapuri</span>
						<span className="dharmapuriNumber mapCountLabel text-center">{this.search('dharmapuri')}</span>
					</div>
					<div className="cuddalore classHover"> 
						<img src="/Maps/Tamil_Nadu/Cuddalore.png"  alt="Cuddalore"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Cuddalore_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Cuddalore.png")}/>
						<span className="cuddaloreText mapTextLabel text-capitalize">Cuddalore</span>
						<span className="cuddaloreNumber mapCountLabel text-center">{this.search('cuddalore')}</span>
					</div>
					
					<div className="salem classHover"> 
						<img src="/Maps/Tamil_Nadu/Salem.png"  alt="Salem"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Salem_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Salem.png")}/>
						<span className="salemText mapTextLabel text-capitalize">Salem</span>
						<span className="salemNumber mapCountLabel text-center">{this.search('salem')}</span>
					</div>
					<div className="erode classHover"> 
						<img src="/Maps/Tamil_Nadu/Erode.png"  alt="Erode"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Erode_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Erode.png")}/>
						<span className="erodeText mapTextLabel text-capitalize">Erode</span>
						<span className="erodeNumber mapCountLabel text-center">{this.search('erode')}</span>
					</div>
					<div className="nilgiris classHover"> 
						<img src="/Maps/Tamil_Nadu/Nilgiris.png"  alt="Nilgiris"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Nilgiris_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Nilgiris.png")}/>
						<span className="nilgirisText mapTextLabel text-capitalize">Nilgiris</span>
						<span className="nilgirisNumber mapCountLabel text-center">{this.search('nilgiris')}</span>
					</div>
					<div className="mayiladuthurai classHover"> 
						<img src="/Maps/Tamil_Nadu/Mayiladuthurai.png"  alt="Mayiladuthurai"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Mayiladuthurai_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Mayiladuthurai.png")}/>
						<span className="mayiladuthuraiText mapTextLabel text-capitalize">Mayiladuthurai</span>
						<span className="mayiladuthuraiNumber mapCountLabel text-center">{this.search('mayiladuthurai')}</span>
					</div>
					<div className="karaikal classHover"> 
						<img src="/Maps/Tamil_Nadu/Karaikal.png"  alt="Karaikal"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Karaikal_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Karaikal.png")}/>
						<span className="karaikalText mapTextLabel text-capitalize">Karaikal</span>
						<span className="karaikalNumber mapCountLabel text-center">{this.search('karaikal')}</span>
					</div>
					<div className="nagapattinam classHover"> 
						<img src="/Maps/Tamil_Nadu/Nagapattinam.png"  alt="Nagapattinam"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Nagapattinam_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Nagapattinam.png")}/>
						<span className="nagapattinamText mapTextLabel text-capitalize">Nagapattinam</span>
						<span className="nagapattinamNumber mapCountLabel text-center">{this.search('nagapattinam')}</span>
					</div>
					<div className="tiruvarur classHover"> 
						<img src="/Maps/Tamil_Nadu/Tiruvarur.png"  alt="Tiruvarur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Tiruvarur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Tiruvarur.png")}/>
						<span className="tiruvarurText mapTextLabel text-capitalize">Tiruvarur</span>
						<span className="tiruvarurNumber mapCountLabel text-center">{this.search('tiruvarur')}</span>
					</div>
					<div className="airyalur classHover"> 
						<img src="/Maps/Tamil_Nadu/Airyalur.png"  alt="Airyalur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Airyalur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Airyalur.png")}/>
						<span className="airyalurText mapTextLabel text-capitalize">Airyalur</span>
						<span className="airyalurNumber mapCountLabel text-center">{this.search('airyalur')}</span>
					</div>
					<div className="thanjavur classHover"> 
						<img src="/Maps/Tamil_Nadu/Thanjavur.png"  alt="Thanjavur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Thanjavur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Thanjavur.png")}/>
						<span className="thanjavurText mapTextLabel text-capitalize">Thanjavur</span>
						<span className="thanjavurNumber mapCountLabel text-center">{this.search('thanjavur')}</span>
					</div>
					<div className="perambalur classHover"> 
						<img src="/Maps/Tamil_Nadu/Perambalur.png"  alt="Perambalur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Perambalur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Perambalur.png")}/>
						<span className="perambalurText mapTextLabel text-capitalize">Perambalur</span>
						<span className="perambalurNumber mapCountLabel text-center">{this.search('perambalur')}</span>
					</div>
					<div className="tirchirappalli classHover"> 
						<img src="/Maps/Tamil_Nadu/Tirchirappalli.png"  alt="Tirchirappalli"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Tirchirappalli_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Tirchirappalli.png")}/>
						<span className="tirchirappalliText mapTextLabel text-capitalize">Tirchirappalli</span>
						<span className="tirchirappalliNumber mapCountLabel text-center">{this.search('tirchirappalli')}</span>
					</div>
					<div className="namakkal classHover"> 
						<img src="/Maps/Tamil_Nadu/Namakkal.png"  alt="Namakkal"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Namakkal_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Namakkal.png")}/>
						<span className="namakkalText mapTextLabel text-capitalize">Namakkal</span>
						<span className="namakkalNumber mapCountLabel text-center">{this.search('namakkal')}</span>
					</div>
					<div className="karur classHover"> 
						<img src="/Maps/Tamil_Nadu/Karur.png"  alt="Karur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Karur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Karur.png")}/>
						<span className="karurText mapTextLabel text-capitalize">Karur</span>
						<span className="karurNumber mapCountLabel text-center">{this.search('karur')}</span>
					</div>
					<div className="tiruppur classHover"> 
						<img src="/Maps/Tamil_Nadu/Tiruppur.png"  alt="Tiruppur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Tiruppur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Tiruppur.png")}/>
						<span className="tiruppurText mapTextLabel text-capitalize">Tiruppur</span>
						<span className="tiruppurNumber mapCountLabel text-center">{this.search('tiruppur')}</span>
					</div>
					<div className="coimbatore classHover"> 
						<img src="/Maps/Tamil_Nadu/Coimbatore.png"  alt="Coimbatore"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Coimbatore_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Coimbatore.png")}/>
						<span className="coimbatoreText mapTextLabel text-capitalize">Coimbatore</span>
						<span className="coimbatoreNumber mapCountLabel text-center">{this.search('coimbatore')}</span>
					</div>
					<div className="pudukkottai classHover"> 
						<img src="/Maps/Tamil_Nadu/Pudukkottai.png"  alt="Pudukkottai"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Pudukkottai_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Pudukkottai.png")}/>
						<span className="pudukkottaiText mapTextLabel text-capitalize">Pudukkottai</span>
						<span className="pudukkottaiNumber mapCountLabel text-center">{this.search('pudukkottai')}</span>
					</div>
					<div className="dindigul classHover"> 
						<img src="/Maps/Tamil_Nadu/Dindigul.png"  alt="Dindigul"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Dindigul_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Dindigul.png")}/>
						<span className="dindigulText mapTextLabel text-capitalize">Dindigul</span>
						<span className="dindigulNumber mapCountLabel text-center">{this.search('dindigul')}</span>
					</div>
					<div className="sivagangai classHover">
						<img src="/Maps/Tamil_Nadu/Sivagangai.png"  alt="Sivagangai"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Sivagangai_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Sivagangai.png")}/>
						<span className="sivagangaiText mapTextLabel text-capitalize">Sivagangai</span>
						<span className="sivagangaiNumber mapCountLabel text-center">{this.search('sivagangai')}</span>
					</div>
					<div className="madurai classHover"> 
						<img src="/Maps/Tamil_Nadu/Madurai.png"  alt="Madurai"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Madurai_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Madurai.png")}/>
						<span className="maduraiText mapTextLabel text-capitalize">Madurai</span>
						<span className="maduraiNumber mapCountLabel text-center">{this.search('madurai')}</span>
					</div>
					<div className="theni classHover"> 
						<img src="/Maps/Tamil_Nadu/Theni.png"  alt="Theni"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Theni_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Theni.png")}/>
						<span className="theniText mapTextLabel text-capitalize">Theni</span>
						<span className="theniNumber mapCountLabel text-center">{this.search('theni')}</span>
					</div>
					<div className="ramanathapuram classHover"> 
						<img src="/Maps/Tamil_Nadu/Ramanathapuram.png"  alt="Ramanathapuram"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Ramanathapuram_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Ramanathapuram.png")}/>
						<span className="ramanathapuramText mapTextLabel text-capitalize">Ramanathapuram</span>
						<span className="ramanathapuramNumber mapCountLabel text-center">{this.search('ramanathapuram')}</span>
					</div>
					<div className="virudhunagar classHover">
						<img src="/Maps/Tamil_Nadu/Virudhunagar.png"  alt="Virudhunagar"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Virudhunagar_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Virudhunagar.png")}/>
						<span className="virudhunagarText mapTextLabel text-capitalize">Virudhunagar</span>
						<span className="virudhunagarNumber mapCountLabel text-center">{this.search('virudhunagar')}</span>
					</div>
					<div className="thoothukudi classHover"> 
						<img src="/Maps/Tamil_Nadu/Thoothukudi.png"  alt="Thoothukudi"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Thoothukudi_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Thoothukudi.png")}/>
						<span className="thoothukudiText mapTextLabel text-capitalize">Thoothukudi</span>
						<span className="thoothukudiNumber mapCountLabel text-center">{this.search('thoothukudi')}</span>
					</div>
					<div className="tenkasi classHover"> 
						<img src="/Maps/Tamil_Nadu/Tenkasi.png"  alt="Tenkasi"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Tenkasi_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Tenkasi.png")}/>
						<span className="tenkasiText mapTextLabel text-capitalize">Tenkasi</span>
						<span className="tenkasiNumber mapCountLabel text-center">{this.search('tenkasi')}</span>
					</div>
					<div className="tirunelveli classHover"> 
						<img src="/Maps/Tamil_Nadu/Tirunelveli.png"  alt="Tirunelveli"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Tirunelveli_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Tirunelveli.png")}/>
						<span className="tirunelveliText mapTextLabel text-capitalize">Tirunelveli</span>
						<span className="tirunelveliNumber mapCountLabel text-center">{this.search('tirunelveli')}</span>
					</div>
					<div className="kanniyakumari classHover"> 
						<img src="/Maps/Tamil_Nadu/Kanniyakumari.png"  alt="Kanniyakumari"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Kanniyakumari_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tamil_Nadu/Kanniyakumari.png")}/>
						<span className="kanniyakumariText mapTextLabel text-capitalize">Kanniyakumari</span>
						<span className="kanniyakumariNumber mapCountLabel text-center">{this.search('kanniyakumari')}</span>
					</div>
				</div>
			</div>
		);
	}
}