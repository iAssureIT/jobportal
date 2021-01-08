import React, {Component} from 'react';

import './Mizoram.css';
import '../global.css';


export default class Mizoram extends Component{
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
				<div className="stateWrapper"  >
					<div className="tuipang classHover"> 
						<img src="/Maps/Mizoram/Tuipang.png"  alt="Tuipang"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Mizoram/Tuipang_.png")}
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Mizoram/Tuipang.png")}/>
						<span className="tuipangText mapTextLabel text-capitalize">Tuipang</span>
						<span className="tuipangNumber mapCountLabel text-center">{this.search('tuipang')}</span>
					</div>
					<div className="lawngtlai classHover"> 
						<img src="/Maps/Mizoram/Lawngtlai.png"  alt="Lawngtlai" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Mizoram/Lawngtlai_.png")}
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Mizoram/Lawngtlai.png")}/>
						<span className="lawngtlaiText mapTextLabel text-capitalize">Lawngtlai</span>
						<span className="lawngtlaiNumber mapCountLabel text-center">{this.search('lawngtlai')}</span>
					</div>
					<div className="lunglei classHover"> 
						<img src="/Maps/Mizoram/Lunglei.png" alt="Lunglei" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Mizoram/Lunglei_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Mizoram/Lunglei.png")}/>
						<span className="lungleiText mapTextLabel text-capitalize">Lunglei</span>
						<span className="lungleiNumber mapCountLabel text-center">{this.search('lunglei')}</span>
					</div>
					<div className="mamit classHover"> 
						<img src="/Maps/Mizoram/Mamit.png" alt="Mamit" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Mizoram/Mamit_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Mizoram/Mamit.png")}/>
						<span className="mamitText mapTextLabel text-capitalize">Mamit</span>
						<span className="mamitNumber mapCountLabel text-center">{this.search('mamit')}</span>
					</div>
					<div className="aizawl classHover"> 
						<img src="/Maps/Mizoram/Aizawl.png"  alt="Aizawl" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Mizoram/Aizawl_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Mizoram/Aizawl.png")}/>
						<span className="aizawlText mapTextLabel text-capitalize">Aizawl</span>
						<span className="aizawlNumber mapCountLabel text-center">{this.search('aizawl')}</span>
					</div>

					<div className="champhai classHover"> 
						<img src="/Maps/Mizoram/Champhai.png" alt="Champhai" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Mizoram/Champhai_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Mizoram/Champhai.png")}/>
						<span className="champhaiText mapTextLabel text-capitalize">Champhai</span>
						<span className="champhaiNumber mapCountLabel text-center">{this.search('champhai')}</span>
					</div>
					<div className="searchhip classHover"> 
						<img src="/Maps/Mizoram/Searchhip.png"  alt="Searchhip" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Mizoram/Searchhip_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Mizoram/Searchhip.png")}/>
						<span className="searchhipText mapTextLabel text-capitalize">Searchhip</span>
						<span className="searchhipNumber mapCountLabel text-center">{this.search('searchhip')}</span>
					</div>
					
					
					<div className="kolasib classHover"> 
						<img src="/Maps/Mizoram/Kolasib.png"  alt="Kolasib" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Mizoram/Kolasib_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Mizoram/Kolasib.png")}/>
						<span className="kolasibText mapTextLabel text-capitalize">Kolasib</span>
						<span className="kolasibNumber mapCountLabel text-center">{this.search('kolasib')}</span>
					</div>
				</div>
			</div>
		);
	}
}