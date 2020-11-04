import React, {Component} from 'react';

import './Kerala.css';
import '../global.css';


export default class Kerala extends Component{

	render(){
		return(
			<div className="bodyWrapper">
				<div className="stateWrapper">
					<div className="kasaragod"> 
						<img src="/Maps/Kerala/Kasaragod.png" className="" alt="Kasaragod" onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Kasaragod_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Kasaragod.png")}/>
						<span className="kasaragodText text-capitalize">kasaragod</span>
						<span className="kasaragodNumber  text-center">{this.search('kasaragod')}</span>
					</div>
					<div className="kannur"> 
						<img src="/Maps/Kerala/Kannur.png" className="" alt="Kannur"  onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Kannur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Kannur.png")}/>
						<span className="kannurText text-capitalize">kannur</span>
						<span className="kannurNumber  text-center">{this.search('kannur')}</span>
					</div>
					<div className="wayand"> 
						<img src="/Maps/Kerala/Wayand.png" className="" alt="Wayand"  onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Wayand_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Wayand.png")}/>
						<span className="wayandText text-capitalize">wayand</span>
						<span className="wayandNumber  text-center">{this.search('wayand')}</span>
					</div>
					<div className="kozhikode"> 
						<img src="/Maps/Kerala/Kozhikode.png" className="" alt="Kozhikode"  onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Kozhikode_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Kozhikode.png")}/>
						<span className="kozhikodeText text-capitalize">kozhikode</span>
						<span className="kozhikodeNumber  text-center">{this.search('kozhikode')}</span>
					</div>
					<div className="malappuram"> 
						<img src="/Maps/Kerala/Malappuram.png" className="" alt="Malappuram"  onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Malappuram_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Malappuram.png")}/>
						<span className="malappuramText text-capitalize">malappuram</span>
						<span className="malappuramNumber  text-center">{this.search('malappuram')}</span>
					</div>
					<div className="palakkad"> 
						<img src="/Maps/Kerala/Palakkad.png" className="" alt="Palakkad"  onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Palakkad_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Palakkad.png")}/>
						<span className="palakkadText text-capitalize">palakkad</span>
						<span className="palakkadNumber  text-center">{this.search('palakkad')}</span>
					</div>
					<div className="thrissur"> 
						<img src="/Maps/Kerala/Thrissur.png" className="" alt="Thrissur"  onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Thrissur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Thrissur.png")}/>
						<span className="thrissurText text-capitalize">thrissur</span>
						<span className="thrissurNumber  text-center">{this.search('thrissur')}</span>
					</div>
					<div className="ernakulam"> 
						<img src="/Maps/Kerala/Ernakulam.png" className="" alt="Ernakulam"  onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Ernakulam_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Ernakulam.png")}/>
						<span className="ernakulamText text-capitalize">ernakulam</span>
						<span className="ernakulamNumber  text-center">{this.search('ernakulam')}</span>
					</div>
					<div className="idukki"> 
						<img src="/Maps/Kerala/Idukki.png" className="" alt="Idukki"  onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Idukki_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Idukki.png")}/>
						<span className="idukkiText text-capitalize">idukki</span>
						<span className="idukkiNumber  text-center">{this.search('idukki')}</span>
					</div>
					<div className="kottayam"> 
						<img src="/Maps/Kerala/Kottayam.png" className="" alt="Kottayam"  onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Kottayam_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Kottayam.png")}/>
						<span className="kottayamText text-capitalize">kottayam</span>
						<span className="kottayamNumber  text-center">{this.search('kottayam')}</span>
					</div>
					<div className="alappuzha"> 
						<img src="/Maps/Kerala/Alappuzha.png" className="" alt="Alappuzha"  onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Alappuzha_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Alappuzha.png")}/>
						<span className="alappuzhaText text-capitalize">alappuzha</span>
						<span className="alappuzhaNumber  text-center">{this.search('alappuzha')}</span>
					</div>
					<div className="kollam"> 
						<img src="/Maps/Kerala/Kollam.png" className="" alt="Kollam"  onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Kollam_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Kollam.png")}/>
						<span className="kollamText text-capitalize">kollam</span>
						<span className="kollamNumber  text-center">{this.search('kollam')}</span>
					</div>
					<div className="thiruvanthapuram"> 
						<img src="/Maps/Kerala/Thiruvanthapuram.png" className="" alt="Thiruvanthapuram"  onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Thiruvanthapuram_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Thiruvanthapuram.png")}/>
						<span className="thiruvanthapuramText text-capitalize">thiruvanthapuram</span>
						<span className="thiruvanthapuramNumber  text-center">{this.search('thiruvanthapuram')}</span>
					</div>
					<div className="pathanamthitta"> 
						<img src="/Maps/Kerala/Pathanamthitta.png" className="" alt="Pathanamthitta"  onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Pathanamthitta_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Pathanamthitta.png")}/>
						<span className="pathanamthittaText text-capitalize">pathanamthitta</span>
						<span className="pathanamthittaNumber  text-center">{this.search('pathanamthitta')}</span>
					</div>
				</div>
			</div>
		);
	}
}