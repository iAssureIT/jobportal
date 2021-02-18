import React, {Component}     from 'react';
import Axios 				  from 'axios';
import Swal 				  from 'sweetalert2';
import {Redirect}             from 'react-router-dom';
import { withRouter }         from 'react-router-dom';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../common/actions/index';

import './ArunachalPradesh.css';
import '../global.css';


class ArunachalPradesh extends Component{
    constructor(props){
		super(props);
		this.state = {
		}  		 
	}
	componentDidMount(){
		var stateWiseCount = {};
		
	    for (var i=0; i < this.props.mapJobs.length; i++) {
	    	
	       stateWiseCount[this.props.mapJobs[i]._id] =  this.props.mapJobs[i].count;
	    }

	    this.setState(stateWiseCount)
	}
	search(nameKey){
		return 10;
	}
	onDistrictClick = (district,stateCode) => {
		
		var {mapAction} = this.props;
		mapAction.setViewMode("functionalView");

		var selector = this.props.selector;
		
		selector.countryCode = "IN"; 
		selector.stateCode = stateCode; 
		selector.district = district; 

		mapAction.jobCount(selector);
		mapAction.filterFunctionalData(this.props.selector);

		this.props.history.push("/state/"+stateCode+"/"+district);


	}
	render(){
		return(
			<div className="bodyWrapper">
				<div className="stateWrapper">
					<div className="tawang classHover" onClick={e => this.onDistrictClick("Tawang","AR")}> 
						<img src="/Maps/Arunachal_Pradesh/Tawang.png"  alt="Tawang" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Tawang_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Tawang.png")}/>
						<span className="tawangText mapTextLabel text-capitalize">Tawang</span>
						<span className="tawangNumber mapCountLabel text-center">{this.state.Kamrup_Metropolitan ? this.state.Kamrup_Metropolitan : 0}</span>
					</div>
					<div className="westKameng classHover" onClick={e => this.onDistrictClick("West_Kameng","AR")}> 
						<img src="/Maps/Arunachal_Pradesh/West_Kameng.png"  alt="West_Kameng"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/West_Kameng_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/West_Kameng.png")}/>
					    <span className="westKamengText mapTextLabel text-capitalize">West_Kameng</span>
						<span className="westKamengNumber mapCountLabel text-center">{this.state.West_Kameng ? this.state.West_Kameng : 0}</span>
					</div>
					<div className="eastKameng classHover" onClick={e => this.onDistrictClick("East_Kameng","AR")}> 
						<img src="/Maps/Arunachal_Pradesh/East_Kameng.png"  alt="East_Kameng"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/East_Kameng_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/East_Kameng.png")}/>
						<span className="eastKamengText mapTextLabel text-capitalize">East_Kameng</span>
						<span className="eastKamengNumber mapCountLabel text-center">{this.state.East_Kameng ? this.state.East_Kameng : 0}</span>
					</div>
					<div className="kurungKumey classHover" onClick={e => this.onDistrictClick("Kurung_Kumey","AR")}> 
						<img src="/Maps/Arunachal_Pradesh/Kurung_Kumey.png"  alt="Kurung_Kumey"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Kurung_Kumey_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Kurung_Kumey.png")}/>
						<span className="kurungKumeyText mapTextLabel text-capitalize">Kurung_Kumey</span>
						<span className="kurungKumeyNumber mapCountLabel text-center">{this.state.Kurung_Kumey ? this.state.Kurung_Kumey : 0}</span>
					</div>
					<div className="papumPare classHover" onClick={e => this.onDistrictClick("Papum_Pare","AR")}> 
						<img src="/Maps/Arunachal_Pradesh/Papum_Pare.png"  alt="Papum_Pare"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Papum_Pare_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Papum_Pare.png")}/>
						<span className="papumPareText mapTextLabel text-capitalize">Papum_Pare</span>
						<span className="papumPareNumber mapCountLabel text-center">{this.state.Papum_Pare ? this.state.Papum_Pare : 0}</span>
					</div>
					
					<div className="kraDaadi classHover" onClick={e => this.onDistrictClick("KRA_Daadi","AR")}> 
						<img src="/Maps/Arunachal_Pradesh/KRA_Daadi.png"  alt="KRA_Daadi"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/KRA_Daadi_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/KRA_Daadi.png")}/>
						<span className="kraDaadiText mapTextLabel text-capitalize">KRA_Daadi</span>
						<span className="kraDaadiNumber mapCountLabel text-center">{this.state.KRA_Daadi ? this.state.KRA_Daadi : 0}</span>
					</div>

					<div className="upperSubansiri classHover" onClick={e => this.onDistrictClick("Upper_Subansiri","AR")}> 
						<img src="/Maps/Arunachal_Pradesh/Upper_Subansiri.png" alt="Upper_Subansiri"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Upper_Subansiri_.png")}
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Upper_Subansiri.png")}/>
						<span className="upperSubansiriText mapTextLabel text-capitalize">Upper_Subansiri</span>
						<span className="upperSubansiriNumber mapCountLabel text-center">{this.state.Upper_Subansiri ? this.state.Upper_Subansiri : 0}</span>
					</div>
					<div className="westSiang classHover" onClick={e => this.onDistrictClick("West_Siang","AR")}> 
						<img src="/Maps/Arunachal_Pradesh/West_Siang.png" alt="West_Siang"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/West_Siang_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/West_Siang.png")}/>
						<span className="westSiangText mapTextLabel text-capitalize">West_Siang</span>
						<span className="westSiangNumber mapCountLabel text-center">{this.state.West_Siang ? this.state.West_Siang : 0}</span>
					</div>
					<div className="lowerSubansiri classHover" onClick={e => this.onDistrictClick("Lower_Subansiri","AR")}> 
						<img src="/Maps/Arunachal_Pradesh/Lower_Subansiri.png"  alt="Lower_Subansiri"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Lower_Subansiri_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Lower_Subansiri.png")}/>
						<span className="lowerSubansiriText mapTextLabel text-capitalize">Lower_Subansiri</span>
						<span className="lowerSubansiriNumber mapCountLabel text-center">{this.state.Lower_Subansiri ? this.state.Lower_Subansiri : 0}</span>
					</div>
					<div className="yingkiong classHover" onClick={e => this.onDistrictClick("Yingkiong","AR")}> 
						<img src="/Maps/Arunachal_Pradesh/Yingkiong.png" alt="Yingkiong"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Yingkiong_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Yingkiong.png")}/>
						<span className="yingkiongText mapTextLabel text-capitalize">Yingkiong</span>
						<span className="yingkiongNumber mapCountLabel text-center">{this.state.Yingkiong ? this.state.Yingkiong : 0}</span>
					</div>
					<div className="eastSiang classHover" onClick={e => this.onDistrictClick("East_Siang","AR")}> 
						<img src="/Maps/Arunachal_Pradesh/East_Siang.png"  alt="East_Siang"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/East_Siang_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/East_Siang.png")}/>
						<span className="eastSiangText mapTextLabel text-capitalize">East_Siang</span>
						<span className="eastSiangNumber mapCountLabel text-center">{this.state.East_Siang ? this.state.East_Siang : 0}</span>
					</div>
					<div className="dibangValley classHover" onClick={e => this.onDistrictClick("Dibang_Valley","AR")}> 
						<img src="/Maps/Arunachal_Pradesh/Dibang_Valley.png"  alt="Dibang_Valley"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Dibang_Valley_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Dibang_Valley.png")}/>
						<span className="dibangValleyText mapTextLabel text-capitalize">Dibang_Valley</span>
						<span className="dibangValleyNumber mapCountLabel text-center">{this.state.Dibang_Valley ? this.state.Dibang_Valley : 0}</span>
					</div>
					
					<div className="lohit classHover" onClick={e => this.onDistrictClick("Lohit","AR")}> 
						<img src="/Maps/Arunachal_Pradesh/Lohit.png" alt="Lohit"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Lohit_.png")}
						  onMouseOut={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Lohit.png")}/>
						<span className="lohitText mapTextLabel text-capitalize">Lohit</span>
						<span className="lohitNumber mapCountLabel text-center">{this.state.Lohit ? this.state.Lohit : 0}</span>
					</div>

					<div className="anjaw classHover" onClick={e => this.onDistrictClick("Anjaw","AR")}> 
						<img src="/Maps/Arunachal_Pradesh/Anjaw.png"  alt="Anjaw"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Anjaw_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Anjaw.png")}/>
						<span className="anjawText mapTextLabel text-capitalize">Anjaw</span>
						<span className="anjawNumber mapCountLabel text-center">{this.state.Anjaw ? this.state.Anjaw : 0}</span>
					</div>
					<div className="lowerDibangValley classHover" onClick={e => this.onDistrictClick("Lower_Dibang_Valley","AR")}> 
						<img src="/Maps/Arunachal_Pradesh/Lower_Dibang_Valley.png" alt="Lower_Dibang_Valley"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Lower_Dibang_Valley_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Lower_Dibang_Valley.png")}/>
						<span className="lowerDibangValleyText mapTextLabel text-capitalize">Lower_Dibang_Valley</span>
						<span className="lowerDibangValleyNumber mapCountLabel text-center">{this.state.Lower_Dibang_Valley ? this.state.Lower_Dibang_Valley : 0}</span>
					</div>
					<div className="changlang classHover" onClick={e => this.onDistrictClick("changlangNumberlang","AR")}> 
						<img src="/Maps/Arunachal_Pradesh/Changlang.png"  alt="Changlang"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Changlang_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Changlang.png")}/>
						<span className="changlangText mapTextLabel text-capitalize">Changlang</span>
						<span className="changlangNumber mapCountLabel text-center">{this.state.Changlang ? this.state.Changlang : 0}</span>
					</div>
					<div className="namsai classHover" onClick={e => this.onDistrictClick("Namsai","AR")}> 
						<img src="/Maps/Arunachal_Pradesh/Namsai.png"  alt="Namsai"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Namsai_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Namsai.png")}/>
						<span className="namsaiText mapTextLabel text-capitalize">Namsai</span>
						<span className="namsaiNumber mapCountLabel text-center">{this.state.Namsai ? this.state.Namsai : 0}</span>
					</div>
					<div className="khonsa classHover" onClick={e => this.onDistrictClick("Khonsa","AR")}> 
						<img src="/Maps/Arunachal_Pradesh/Khonsa.png"  alt="Khonsa"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Khonsa_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Khonsa.png")}/>
						<span className="khonsaText mapTextLabel text-capitalize">Khonsa</span>
						<span className="khonsaNumber mapCountLabel text-center">{this.state.Khonsa ? this.state.Khonsa : 0}</span>
					</div>
					<div className="langding classHover" onClick={e => this.onDistrictClick("Langding","AR")}> 
						<img src="/Maps/Arunachal_Pradesh/Langding.png" alt="Langding"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Langding_.png")}
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Arunachal_Pradesh/Langding.png")}/>
						<span className="langdingText mapTextLabel text-capitalize">Langding</span>
						<span className="langdingNumber mapCountLabel text-center">{this.state.Langding ? this.state.Langding : 0}</span>
					</div>
					
					
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state)=>{
    return { 
        selectedState  		: state.selectedState,  viewMode : state.viewMode,
        mapJobs           	: state.mapJobs, 		selector : state.selector
    }
}
const mapDispatchToProps = (dispatch) => ({
	mapAction :  bindActionCreators(mapActionCreator, dispatch)
}) 

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(ArunachalPradesh));
