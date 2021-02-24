import React, {Component}     from 'react';
import Axios 				  from 'axios';
import Swal 				  from 'sweetalert2';
import {Redirect}             from 'react-router-dom';
import { withRouter }         from 'react-router-dom';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../common/actions/index';

import './Rajasthan.css';
import '../global.css';

class Rajasthan extends Component{
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

	onDistrictClick  = (district,stateCode) => {
		
		var {mapAction} = this.props;
		mapAction.setViewMode("functionalView");

		var selector = this.props.selector;
		
		selector.countryCode = "IN"; 
		selector.stateCode = stateCode; 
		selector.district = district; 

		mapAction.jobCount(selector);
		mapAction.filterFunctionalData(this.props.selector);

		this.props.history.push("/country/"+this.props.match.params.countryCode+"/state/"+stateCode+"/city/"+district+"/industry/"+this.props.match.params.industryName+"/"+this.props.match.params.industry_id+"/function/"+this.props.match.params.functionalArea + "/"+this.props.match.params.functionalArea_id+"/subfunction/"+this.props.match.params.subfunctionalArea + "/"+this.props.match.params.subfunctionalArea_id );
	
	}
	render(){
		console.log("Rajasthan...............................");
		return(
			<div className="bodyWrapper">
				<div className="stateWrapper">

					<div className="jaisalmer classHover" onClick={e => this.onDistrictClick("Jaisalmer","RJ")}> 
						<img src="/Maps/Rajasthan/Jaisalmer.png" alt="Jaisalmer" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Jaisalmer_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Jaisalmer.png")}/>
						<span className="jaisalmerText mapTextLabel text-capitalize">Jaisalmer</span>
						<span className="jaisalmerNumber mapCountLabel text-center">{this.state.Jaisalmer ? this.state.Jaisalmer : 0}</span>
					</div>

					<div className="jodhpur classHover" onClick={e => this.onDistrictClick("Jodhpur","RJ")}> 
						<img src="/Maps/Rajasthan/Jodhpur.png" alt="Jodhpur" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Jodhpur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Jodhpur.png")}/>
						<span className="jodhpurText mapTextLabel text-capitalize">Jodhpur</span>
						<span className="jodhpurNumber mapCountLabel text-center">{this.state.Jodhpur ? this.state.Jodhpur : 0}</span>
					</div>

					<div className="nagaur classHover" onClick={e => this.onDistrictClick("Nagaur","RJ")}> 
						<img src="/Maps/Rajasthan/Nagaur.png" alt="Nagaur" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Nagaur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Nagaur.png")}/>
						<span className="nagaurText mapTextLabel text-capitalize">Nagaur</span>
						<span className="nagaurNumber mapCountLabel text-center">{this.state.Nagaur ? this.state.Nagaur : 0}</span>
					</div>

					<div className="Jaipur classHover" onClick={e => this.onDistrictClick("Jaipur","RJ")}> 
						<img src="/Maps/Rajasthan/Jaipur.png" alt="Jaipur" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Jaipur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Jaipur.png")}/>
						<span className="JaipurText mapTextLabel text-capitalize">Jaipur</span>
						<span className="JaipurNumber mapCountLabel text-center">{this.state.Jaipur ? this.state.Jaipur : 0}</span>
					</div>

					<div className="dausa classHover" onClick={e => this.onDistrictClick("Dausa","RJ")}> 
						<img src="/Maps/Rajasthan/Dausa.png" alt="Dausa" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Dausa_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Dausa.png")}/>
						<span className="dausaText mapTextLabel text-capitalize">Dausa</span>
						<span className="dausaNumber mapCountLabel text-center">{this.state.Dausa ? this.state.Dausa : 0}</span>
					</div>

					<div className="karauli classHover" onClick={e => this.onDistrictClick("Karauli","RJ")}> 
						<img src="/Maps/Rajasthan/Karauli.png" alt="Karauli" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Karauli_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Karauli.png")}/>
						<span className="karauliText mapTextLabel text-capitalize">Karauli</span>
						<span className="karauliNumber mapCountLabel text-center">{this.state.Karauli ? this.state.Karauli : 0}</span>
					</div>

					<div className="dholpur classHover" onClick={e => this.onDistrictClick("Dholpur","RJ")}> 
						<img src="/Maps/Rajasthan/Dholpur.png" alt="Dholpur" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Dholpur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Dholpur.png")}/>
						<span className="dholpurText mapTextLabel text-capitalize">Dholpur</span>
						<span className="dholpurNumber mapCountLabel text-center">{this.state.Dholpur ? this.state.Dholpur : 0}</span>
					</div>

					<div className="bikaner classHover" onClick={e => this.onDistrictClick("Bikaner","RJ")}> 
						<img src="/Maps/Rajasthan/Bikaner.png" alt="Bikaner" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Bikaner_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Bikaner.png")}/>
						<span className="bikanerText mapTextLabel text-capitalize">Bikaner</span>
						<span className="bikanerNumber mapCountLabel text-center">{this.state.Bikaner ? this.state.Bikaner : 0}</span>
					</div>

					<div className="sri_ganganagar classHover" onClick={e => this.onDistrictClick("Ganganagar","RJ")}> 
						<img src="/Maps/Rajasthan/Sri_Ganganagar.png" alt="Sri_Ganganagar" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Sri_Ganganagar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Sri_Ganganagar.png")}/>
						<span className="sri_ganganagarText mapTextLabel text-capitalize">Sri Ganganagar</span>
						<span className="bikanerNumber mapCountLabel text-center">{this.state.Sri_Ganganagar ? this.state.Sri_Ganganagar : 0}</span>
					</div>

					<div className="hanumangarh classHover" onClick={e => this.onDistrictClick("Hanumangarh","RJ")}> 
						<img src="/Maps/Rajasthan/Hanumangarh.png" alt="Hanumangarh" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Hanumangarh_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Hanumangarh.png")}/>
						<span className="hanumangarhText mapTextLabel text-capitalize">Hanumangarh</span>
						<span className="hanumangarhNumber mapCountLabel text-center">{this.state.Hanumangarh ? this.state.Hanumangarh : 0}</span>
					</div>

					<div className="churu classHover" onClick={e => this.onDistrictClick("Churu","RJ")}> 
						<img src="/Maps/Rajasthan/Churu.png" alt="Churu" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Churu_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Churu.png")}/>
						<span className="churuText mapTextLabel text-capitalize">Churu</span>
						<span className="churuNumber mapCountLabel text-center">{this.state.Churu ? this.state.Churu : 0}</span>
					</div>

					<div className="jhunjhunun classHover" onClick={e => this.onDistrictClick("Jhunjhunun","RJ")}> 
						<img src="/Maps/Rajasthan/Jhunjhunun.png" alt="Jhunjhunun" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Jhunjhunun_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Jhunjhunun.png")}/>
						<span className="jhunjhununText mapTextLabel text-capitalize">Jhunjhunun</span>
						<span className="jhunjhununNumber mapCountLabel text-center">{this.state.Jhunjhunun ? this.state.Jhunjhunun : 0}</span>
					</div>

					<div className="sikar classHover" onClick={e => this.onDistrictClick("Sikar","RJ")}> 
						<img src="/Maps/Rajasthan/Sikar.png" alt="Sikar" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Sikar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Sikar.png")}/>
						<span className="sikarText mapTextLabel text-capitalize">Sikar</span>
						<span className="sikarNumber mapCountLabel text-center">{this.state.Sikar ? this.state.Sikar : 0}</span>
					</div>

					<div className="alwar classHover" onClick={e => this.onDistrictClick("Alwar","RJ")}> 
						<img src="/Maps/Rajasthan/Alwar.png" alt="Alwar" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Alwar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Alwar.png")}/>
						<span className="alwarText mapTextLabel text-capitalize">Alwar</span>
						<span className="alwarNumber mapCountLabel text-center">{this.state.Alwar ? this.state.Alwar : 0}</span>
					</div>

					<div className="bharatpur classHover" onClick={e => this.onDistrictClick("Bharatpur","RJ")}> 
						<img src="/Maps/Rajasthan/Bharatpur.png" alt="Bharatpur" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Bharatpur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Bharatpur.png")}/>
						<span className="bharatpurText mapTextLabel text-capitalize">Bharatpur</span>
						<span className="bharatpurNumber mapCountLabel text-center">{this.state.Bharatpur ? this.state.Bharatpur : 0}</span>
					</div>

					<div className="barmer classHover" onClick={e => this.onDistrictClick("Barmer","RJ")}> 
						<img src="/Maps/Rajasthan/Barmer.png" alt="Barmer" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Barmer_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Barmer.png")}/>
						<span className="barmerText mapTextLabel text-capitalize">Barmer</span>
						<span className="barmerNumber mapCountLabel text-center">{this.state.Barmer ? this.state.Barmer : 0}</span>
					</div>

					<div className="jalore classHover" onClick={e => this.onDistrictClick("Jalore","RJ")}> 
						<img src="/Maps/Rajasthan/Jalore.png" alt="Jalore" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Jalore_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Jalore.png")}/>
						<span className="jaloreText mapTextLabel text-capitalize">Jalore</span>
						<span className="jaloreNumber mapCountLabel text-center">{this.state.Jalore ? this.state.Jalore : 0}</span>
					</div>

					<div className="pali classHover" onClick={e => this.onDistrictClick("Pali","RJ")}> 
						<img src="/Maps/Rajasthan/Pali.png" alt="Pali" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Pali_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Pali.png")}/>
						<span className="paliText mapTextLabel text-capitalize">Pali</span>
						<span className="paliNumber mapCountLabel text-center">{this.state.Pali ? this.state.Pali : 0}</span>
					</div>

					<div className="ajmer classHover" onClick={e => this.onDistrictClick("Ajmer","RJ")}> 
						<img src="/Maps/Rajasthan/Ajmer.png" alt="Ajmer" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Ajmer_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Ajmer.png")}/>
						<span className="ajmerText mapTextLabel text-capitalize">Ajmer</span>
						<span className="ajmerNumber mapCountLabel text-center">{this.state.Ajmer ? this.state.Ajmer : 0}</span>
					</div>

					<div className="tonk classHover" onClick={e => this.onDistrictClick("Tonk","RJ")}> 
						<img src="/Maps/Rajasthan/Tonk.png" alt="Tonk" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Tonk_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Tonk.png")}/>
						<span className="tonkText mapTextLabel text-capitalize">Tonk</span>
						<span className="tonkNumber mapCountLabel text-center">{this.state.Tonk ? this.state.Tonk : 0}</span>
					</div>

					<div className="sawai_madhopur classHover" onClick={e => this.onDistrictClick("Madhopur","RJ")}> 
						<img src="/Maps/Rajasthan/Sawai_Madhopur.png" alt="Sawai_Madhopur" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Sawai_Madhopur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Sawai_Madhopur.png")}/>
						<span className="sawai_madhopurText mapTextLabel text-capitalize">Sawai Madhopur</span>
						<span className="sawai_madhopurNumber mapCountLabel text-center">{this.state.Sawai_Madhopur ? this.state.Sawai_Madhopur : 0}</span>
					</div>

					<div className="sirohi classHover" onClick={e => this.onDistrictClick("Sirohi","RJ")}> 
						<img src="/Maps/Rajasthan/Sirohi.png" alt="Sirohi" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Sirohi_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Sirohi.png")}/>
						<span className="sirohiText mapTextLabel text-capitalize">Sirohi</span>
						<span className="sirohiNumber mapCountLabel text-center">{this.state.Sirohi ? this.state.Sirohi : 0}</span>
					</div>

					<div className="rajsamand classHover" onClick={e => this.onDistrictClick("Rajsamand","RJ")}> 
						<img src="/Maps/Rajasthan/Rajsamand.png" alt="Rajsamand" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Rajsamand_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Rajsamand.png")}/>
						<span className="rajsamandText mapTextLabel text-capitalize">Rajsamand</span>
						<span className="rajsamandNumber mapCountLabel text-center">{this.state.Rajsamand ? this.state.Rajsamand : 0}</span>
					</div>

					<div className="bhilwara classHover" onClick={e => this.onDistrictClick("Bhilwara","RJ")}> 
						<img src="/Maps/Rajasthan/Bhilwara.png" alt="Bhilwara" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Bhilwara_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Bhilwara.png")}/>
						<span className="bhilwaraText mapTextLabel text-capitalize">Bhilwara</span>
						<span className="bhilwaraNumber mapCountLabel text-center">{this.state.Bhilwara ? this.state.Bhilwara : 0}</span>
					</div>

					<div className="bundi classHover" onClick={e => this.onDistrictClick("Bundi","RJ")}> 
						<img src="/Maps/Rajasthan/Bundi.png" alt="Bundi" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Bundi_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Bundi.png")}/>
						<span className="bundiText mapTextLabel text-capitalize">Bundi</span>
						<span className="bundiNumber mapCountLabel text-center">{this.state.Bundi ? this.state.Bundi : 0}</span>
					</div>

					<div className="kota classHover" onClick={e => this.onDistrictClick("Kota","RJ")}> 
						<img src="/Maps/Rajasthan/Kota.png" alt="Kota" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Kota_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Kota.png")}/>
						<span className="kotaText mapTextLabel text-capitalize">Kota</span>
						<span className="kotaNumber mapCountLabel text-center">{this.state.Kota ? this.state.Kota : 0}</span>
					</div>

					<div className="baran classHover" onClick={e => this.onDistrictClick("Baran","RJ")}> 
						<img src="/Maps/Rajasthan/Baran.png" alt="Baran" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Baran_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Baran.png")}/>
						<span className="baranText mapTextLabel text-capitalize">Baran</span>
						<span className="baranNumber mapCountLabel text-center">{this.state.Baran ? this.state.Baran : 0}</span>
					</div>

					<div className="jhalawar classHover" onClick={e => this.onDistrictClick("Jhalwar","RJ")}> 
						<img src="/Maps/Rajasthan/Jhalwar.png" alt="Jhalawar" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Jhalwar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Jhalwar.png")}/>
						<span className="jhalawarText mapTextLabel text-capitalize">Jhalawar</span>
						<span className="jhalawarNumber mapCountLabel text-center">{this.state.Jhalawar ? this.state.Jhalawar : 0}</span>
					</div>

					<div className="udaipur classHover" onClick={e => this.onDistrictClick("Udaipur","RJ")}> 
						<img src="/Maps/Rajasthan/Udaipur.png" alt="Udaipur" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Udaipur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Udaipur.png")}/>
						<span className="udaipurText mapTextLabel text-capitalize">Udaipur</span>
						<span className="udaipurNumber mapCountLabel text-center">{this.state.Udaipur ? this.state.Udaipur : 0}</span>
					</div>

					<div className="chittorgarh classHover" onClick={e => this.onDistrictClick("Chittorgarh","RJ")}> 
						<img src="/Maps/Rajasthan/Chittorgarh.png" alt="Chittorgarh" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Chittorgarh_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Chittorgarh.png")}/>
						<span className="chittorgarhText mapTextLabel text-capitalize">Chittorgarh</span>
						<span className="chittorgarhNumber mapCountLabel text-center">{this.state.Chittorgarh ? this.state.Chittorgarh : 0}</span>
					</div>

					<div className="dungarpur classHover" onClick={e => this.onDistrictClick("Dungarpur","RJ")}> 
						<img src="/Maps/Rajasthan/Dungarpur.png" alt="Dungarpur" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Dungarpur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Dungarpur.png")}/>
						<span className="dungarpurText mapTextLabel text-capitalize">Dungarpur</span>
						<span className="dungarpurNumber mapCountLabel text-center">{this.state.Dungarpur ? this.state.Dungarpur : 0}</span>
					</div>

					

					<div className="Pratapgarh classHover" onClick={e => this.onDistrictClick("Pratapgarh","RJ")}> 
						<img src="/Maps/Rajasthan/Pratapgarh.png" alt="Pratapgarh" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Pratapgarh_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Pratapgarh.png")}/>
						<span className="PratapgarhText mapTextLabel text-capitalize">Pratapgarh</span>
						<span className="PratapgarhNumber mapCountLabel text-center">{this.state.Pratapgarh ? this.state.Pratapgarh : 0}</span>
					</div>

					<div className="banswara classHover" onClick={e => this.onDistrictClick("Banswara","RJ")}> 
						<img src="/Maps/Rajasthan/Banswara.png" alt="Banswara" onMouseOver={e => (e.currentTarget.src = "/Maps/Rajasthan/Banswara_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Rajasthan/Banswara.png")}/>
						<span className="banswaraText mapTextLabel text-capitalize">Banswara</span>
						<span className="banswaraNumber mapCountLabel text-center">{this.state.Banswara ? this.state.Banswara : 0}</span>
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

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Rajasthan));
