import React, {Component} from 'react';

import './Mizoram.css';
import '../global.css';


export default class Mizoram extends Component{

	render(){
		return(
			<div className="bodyWrapper" >
				<div className="stateWrapper"  >
					<div className="kas"> 
						<img src="/Maps/Mizoram/Tuipang.png" className="tuipang" alt="Tuipang" onMouseOver={e => (e.currentTarget.src = "/Maps/Mizoram/Tuipang_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Mizoram/Tuipang.png")}/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Mizoram/Lawngtlai.png" className="lawngtlai" alt="Lawngtlai"  onMouseOver={e => (e.currentTarget.src = "/Maps/Mizoram/Lawngtlai_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Mizoram/Lawngtlai.png")}/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Mizoram/Lunglei.png" className="lunglei" alt="Lunglei"  onMouseOver={e => (e.currentTarget.src = "/Maps/Mizoram/Lunglei_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Mizoram/Lunglei.png")}/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Mizoram/Searchhip.png" className="searchhip" alt="Searchhip"  onMouseOver={e => (e.currentTarget.src = "/Maps/Mizoram/Searchhip_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Mizoram/Searchhip.png")}/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Mizoram/Aizawl.png" className="aizawl" alt="Aizawl"  onMouseOver={e => (e.currentTarget.src = "/Maps/Mizoram/Aizawl_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Mizoram/Aizawl.png")}/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Mizoram/Mamit.png" className="mamit" alt="Mamit"  onMouseOver={e => (e.currentTarget.src = "/Maps/Mizoram/Mamit_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Mizoram/Mamit.png")}/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Mizoram/Champhai.png" className="champhai" alt="Champhai"  onMouseOver={e => (e.currentTarget.src = "/Maps/Mizoram/Champhai_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Mizoram/Champhai.png")}/>
					</div>
					<div className="kan"> 
						<img src="/Maps/Mizoram/Kolasib.png" className="kolasib" alt="Kolasib"  onMouseOver={e => (e.currentTarget.src = "/Maps/Mizoram/Kolasib_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Mizoram/Kolasib.png")}/>
					</div>
				</div>
			</div>
		);
	}
}