import React, {Component} from 'react';

import './Kerala.css';
import '../global.css';


export default class Kerala extends Component{
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
					<div className="kasaragod classHover"> 
						<img src="/Maps/Kerala/Kasaragod.png"  alt="Kasaragod" onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Kasaragod_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Kasaragod.png")}/>
						<span className="kasaragodText mapTextLabel text-capitalize">kasaragod</span>
						<span className="kasaragodNumber mapCountLabel text-center">{this.search('kasaragod')}</span>
					</div>
					<div className="kannur classHover"> 
						<img src="/Maps/Kerala/Kannur.png"  alt="Kannur"  onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Kannur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Kannur.png")}/>
						<span className="kannurText mapTextLabel text-capitalize">Kannur</span>
						<span className="kannurNumber mapCountLabel text-center">{this.search('kannur')}</span>
					</div>
					<div className="wayand classHover"> 
						<img src="/Maps/Kerala/Wayand.png"  alt="Wayand"  onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Wayand_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Wayand.png")}/>
						<span className="wayandText  mapTextLabel text-capitalize">wayand</span>
						<span className="wayandNumber  mapCountLabel  text-center">{this.search('wayand')}</span>
					</div>
					<div className="kozhikode classHover"> 
						<img src="/Maps/Kerala/Kozhikode.png" alt="Kozhikode"  onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Kozhikode_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Kozhikode.png")}/>
						<span className="kozhikodeText mapTextLabel text-capitalize">kozhikode</span>
						<span className="kozhikodeNumber  mapCountLabel  text-center">{this.search('kozhikode')}</span>
					</div>
					<div className="malappuram classHover"> 
						<img src="/Maps/Kerala/Malappuram.png"  alt="Malappuram"  onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Malappuram_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Malappuram.png")}/>
						<span className="malappuramText  mapTextLabel text-capitalize">malappuram</span>
						<span className="malappuramNumber  mapCountLabel  text-center">{this.search('malappuram')}</span>
					</div>
					<div className="palakkad classHover"> 
						<img src="/Maps/Kerala/Palakkad.png"  alt="Palakkad"  onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Palakkad_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Palakkad.png")}/>
						<span className="palakkadText  mapTextLabel text-capitalize">palakkad</span>
						<span className="palakkadNumber  mapCountLabel  text-center">{this.search('palakkad')}</span>
					</div>
					<div className="thrissur classHover"> 
						<img src="/Maps/Kerala/Thrissur.png"  alt="Thrissur"  onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Thrissur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Thrissur.png")}/>
						<span className="thrissurText  mapTextLabel text-capitalize">thrissur</span>
						<span className="thrissurNumber  mapCountLabel  text-center">{this.search('thrissur')}</span>
					</div>
					<div className="ernakulam classHover"> 
						<img src="/Maps/Kerala/Ernakulam.png"  alt="Ernakulam"  onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Ernakulam_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Ernakulam.png")}/>
						<span className="ernakulamText  mapTextLabel text-capitalize">ernakulam</span>
						<span className="ernakulamNumber  mapCountLabel  text-center">{this.search('ernakulam')}</span>
					</div>
					<div className="idukki classHover"> 
						<img src="/Maps/Kerala/Idukki.png"  alt="Idukki"  onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Idukki_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Idukki.png")}/>
						<span className="idukkiText mapTextLabel  text-capitalize">idukki</span>
						<span className="idukkiNumber  mapCountLabel  text-center">{this.search('idukki')}</span>
					</div>
					<div className="kottayam classHover"> 
						<img src="/Maps/Kerala/Kottayam.png"  alt="Kottayam"  onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Kottayam_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Kottayam.png")}/>
						<span className="kottayamText mapTextLabel  text-capitalize">kottayam</span>
						<span className="kottayamNumber  mapCountLabel  text-center">{this.search('kottayam')}</span>
					</div>
					<div className="alappuzha classHover"> 
						<img src="/Maps/Kerala/Alappuzha.png"  alt="Alappuzha"  onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Alappuzha_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Alappuzha.png")}/>
						<span className="alappuzhaText  mapTextLabel text-capitalize">alappuzha</span>
						<span className="alappuzhaNumber  mapCountLabel  text-center">{this.search('alappuzha')}</span>
					</div>
					<div className="kollam classHover"> 
						<img src="/Maps/Kerala/Kollam.png"  alt="Kollam"  onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Kollam_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Kollam.png")}/>
						<span className="kollamText  mapTextLabel text-capitalize">kollam</span>
						<span className="kollamNumber  mapCountLabel  text-center">{this.search('kollam')}</span>
					</div>
					<div className="thiruvanthapuram classHover"> 
						<img src="/Maps/Kerala/Thiruvanthapuram.png"  alt="Thiruvanthapuram"  onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Thiruvanthapuram_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Thiruvanthapuram.png")}/>
						<span className="thiruvanthapuramText  mapTextLabel text-capitalize">thiruvanthapuram</span>
						<span className="thiruvanthapuramNumber  mapCountLabel  text-center">{this.search('thiruvanthapuram')}</span>
					</div>
					<div className="pathanamthitta classHover"> 
						<img src="/Maps/Kerala/Pathanamthitta.png"  alt="Pathanamthitta"  onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Pathanamthitta_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Pathanamthitta.png")}/>
						<span className="pathanamthittaText  mapTextLabel text-capitalize">pathanamthitta</span>
						<span className="pathanamthittaNumber mapCountLabel text-center">{this.search('pathanamthitta')}</span>
					</div>
				</div>
			</div>
		);
	}
}