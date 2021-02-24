import React, {Component}     from 'react';
import Axios 				  from 'axios';
import Swal 				  from 'sweetalert2';
import {Redirect}             from 'react-router-dom';
import { withRouter }         from 'react-router-dom';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../common/actions/index';
import './UttarPradesh.css';
import '../global.css';


class UttarPradesh extends Component{
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

		this.props.history.push("/country/"+this.props.match.params.countryCode+"/state/"+stateCode+"/city/"+district+"/industry/"+this.props.match.params.industryName+"/"+this.props.match.params.industry_id+"/function/"+this.props.match.params.functionalArea + "/"+this.props.match.params.functionalArea_id+"/subfunction/"+this.props.match.params.subfunctionalArea + "/"+this.props.match.params.subfunctionalArea_id );
	
	}
	render(){
		return(
			<div className="bodyWrapper">
				<div className="stateWrapper">
					<div className="sharanpur classHover" onClick={e => this.onDistrictClick("Sharanpur","UP")}> 
						<img src="/Maps/Uttar_Pradesh/Sharanpur.png"  alt="Sharanpur" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Sharanpur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Sharanpur.png")}/>
						<span className="sharanpurText mapTextLabel text-capitalize">Sharanpur</span>
						<span className="sharanpurNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="bijnor classHover" onClick={e => this.onDistrictClick("Bijnor","UP")}> 
						<img src="/Maps/Uttar_Pradesh/Bijnor.png"  alt="Bijnor"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Bijnor_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Bijnor.png")}/>
						<span className="bijnorText mapTextLabel text-capitalize">Bijnor</span>
						<span className="bijnorNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="muzaffarnagar classHover" onClick={e => this.onDistrictClick("Muzaffarnagar","UP")}> 
						<img src="/Maps/Uttar_Pradesh/Muzaffarnagar.png"  alt="Muzaffarnagar"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Muzaffarnagar_.png")}
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Muzaffarnagar.png")}/>
						<span className="muzaffarnagarText mapTextLabel text-capitalize">Muzaffarnagar</span>
						<span className="muzaffarnagarNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="shamli classHover" onClick={e => this.onDistrictClick("Shamli","UP")}> 
						<img src="/Maps/Uttar_Pradesh/Shamli.png"  alt="Shamli" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Shamli_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Shamli.png")}/>
						<span className="shamliText mapTextLabel text-capitalize">Shamli</span>
						<span className="shamliNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					
					<div className="meerut classHover" onClick={e => this.onDistrictClick("Meerut","UP")}> 
						<img src="/Maps/Uttar_Pradesh/Meerut.png"  alt="Meerut"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Meerut_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Meerut.png")}/>
						<span className="meerutText mapTextLabel text-capitalize">Meerut</span>
						<span className="meerutNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="bagpat classHover" onClick={e => this.onDistrictClick("Bagpat","UP")}> 
						<img src="/Maps/Uttar_Pradesh/Bagpat.png"  alt="Bagpat" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Bagpat_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Bagpat.png")}/>
						<span className="bagpatText mapTextLabel text-capitalize">Bagpat</span>
						<span className="bagpatNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="ghaziabad classHover" onClick={e => this.onDistrictClick("Ghaziabad","UP")}> 
						<img src="/Maps/Uttar_Pradesh/Ghaziabad.png"  alt="Ghaziabad"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Ghaziabad_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Ghaziabad.png")}/>
						<span className="ghaziabadText mapTextLabel text-capitalize">Ghaziabad</span>
						<span className="ghaziabadNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="hapur classHover" onClick={e => this.onDistrictClick("Hapur","UP")}> 
						<img src="/Maps/Uttar_Pradesh/Hapur.png"  alt="Hapur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Hapur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Hapur.png")}/>
						<span className="hapurText mapTextLabel text-capitalize">Hapur</span>
						<span className="hapurNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="amroha classHover" onClick={e => this.onDistrictClick("Amroha","UP")}> 
						<img src="/Maps/Uttar_Pradesh/Amroha.png"  alt="Amroha"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Amroha_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Amroha.png")}/>
						<span className="amrohaText mapTextLabel text-capitalize">Amroha</span>
						<span className="amrohaNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					
					<div className="rampur classHover" onClick={e => this.onDistrictClick("Rampur","UP")}> 
						<img src="/Maps/Uttar_Pradesh/Rampur.png"  alt="Rampur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Rampur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Rampur.png")}/>
						<span className="rampurText mapTextLabel text-capitalize">Rampur</span>
						<span className="rampurNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="moradabad classHover" onClick={e => this.onDistrictClick("Moradabad","UP")}> 
						<img src="/Maps/Uttar_Pradesh/Moradabad.png"  alt="Moradabad"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Moradabad_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Moradabad.png")}/>
						<span className="moradabadText mapTextLabel text-capitalize">Moradabad</span>
						<span className="moradabadNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="bareilly classHover" onClick={e => this.onDistrictClick("Bareilly","UP")}> 
						<img src="/Maps/Uttar_Pradesh/Bareilly.png"  alt="Bareilly"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Bareilly_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Bareilly.png")}/>
						<span className="bareillyText mapTextLabel text-capitalize">Bareilly</span>
						<span className="bareillyNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="pilibhit classHover" onClick={e => this.onDistrictClick("Pilibhit","UP")}> 
						<img src="/Maps/Uttar_Pradesh/Pilibhit.png"  alt="Pilibhit"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Pilibhit_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Pilibhit.png")}/>
						<span className="pilibhitText mapTextLabel text-capitalize">Pilibhit</span>
						<span className="pilibhitNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="sambhal classHover" onClick={e => this.onDistrictClick("Sambhal","UP")}> 
						<img src="/Maps/Uttar_Pradesh/Sambhal.png"  alt="Sambhal"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Sambhal_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Sambhal.png")}/>
						<span className="sambhalText mapTextLabel text-capitalize">Sambhal</span>
						<span className="sambhalNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="budaun classHover" onClick={e => this.onDistrictClick("Budaun","UP")}> 
						<img src="/Maps/Uttar_Pradesh/Budaun.png"  alt="Budaun"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Budaun_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Budaun.png")}/>
						<span className="budaunText mapTextLabel text-capitalize">Budaun</span>
						<span className="budaunNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="bulandshahr classHover" onClick={e => this.onDistrictClick("Bulandshahr","UP")}> 
						<img src="/Maps/Uttar_Pradesh/Bulandshahr.png"  alt="Bulandshahr"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Bulandshahr_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Bulandshahr.png")}/>
						<span className="bulandshahrText mapTextLabel text-capitalize">Bulandshahr</span>
						<span className="bulandshahrNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="gautamVuddhaNagar classHover" onClick={e => this.onDistrictClick("Gautam Vuddha Nagar","UP")}> 
						<img src="/Maps/Uttar_Pradesh/Gautam_Vuddha_Nagar.png"  alt="Gautam_Vuddha_Nagar"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Gautam_Vuddha_Nagar_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Gautam_Vuddha_Nagar.png")}/>
						<span className="gautamVuddhaNagarText mapTextLabel text-capitalize">Gautam_Vuddha_Nagar</span>
						<span className="gautamVuddhaNagarNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="aligarh classHover" onClick={e => this.onDistrictClick("Aligarh","UP")}> 
						<img src="/Maps/Uttar_Pradesh/Aligarh.png"  alt="Aligarh"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Aligarh_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Aligarh.png")}/>
						<span className="aligarhText mapTextLabel text-capitalize">Aligarh</span>
						<span className="aligarhNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="lakhimpurKheri classHover" onClick={e => this.onDistrictClick("Lakhimpur Kheri","UP")}> 
						<img src="/Maps/Uttar_Pradesh/Lakhimpur_Kheri.png"  alt="Lakhimpur_Kheri"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Lakhimpur_Kheri_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Lakhimpur_Kheri.png")}/>
						<span className="lakhimpurKheriText mapTextLabel text-capitalize">Lakhimpur_Kheri</span>
						<span className="lakhimpurKheriNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="shahjahanpur classHover" onClick={e => this.onDistrictClick("Shahjahanpur","UP")}> 
						<img src="/Maps/Uttar_Pradesh/Shahjahanpur.png"  alt="Shahjahanpur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Shahjahanpur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Shahjahanpur.png")}/>
						<span className="shahjahanpurText mapTextLabel text-capitalize">Shahjahanpur</span>
						<span className="shahjahanpurNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="aligarh classHover" onClick={e => this.onDistrictClick("Aligarh","UP")}> 
						<img src="/Maps/Uttar_Pradesh/Aligarh.png"  alt="Aligarh"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Aligarh_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Aligarh.png")}/>
						<span className="aligarhText mapTextLabel text-capitalize">Aligarh</span>
						<span className="aligarhNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="kasganj classHover" onClick={e => this.onDistrictClick("Kasganj","UP")}> 
						<img src="/Maps/Uttar_Pradesh/Kasganj.png"  alt="Kasganj"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Kasganj_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Kasganj.png")}/>
						<span className="kasganjText mapTextLabel text-capitalize">Kasganj</span>
						<span className="kasganjNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="mathura classHover" onClick={e => this.onDistrictClick("Mathura","UP")}> 
						<img src="/Maps/Uttar_Pradesh/Mathura.png"  alt="Mathura"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Mathura_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Mathura.png")}/>
						<span className="mathuraText mapTextLabel text-capitalize">Mathura</span>
						<span className="mathuraNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="hathras classHover" onClick={e => this.onDistrictClick("Hathras","UP")}> 
						<img src="/Maps/Uttar_Pradesh/Hathras.png"  alt="Hathras"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Hathras_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Hathras.png")}/>
						<span className="hathrasText mapTextLabel text-capitalize">Hathras</span>
						<span className="hathrasNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="etah classHover" onClick={e => this.onDistrictClick("Etah","UP")}> 
						<img src="/Maps/Uttar_Pradesh/Etah.png"  alt="Etah"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Etah_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Etah.png")}/>
						<span className="etahText mapTextLabel text-capitalize">Etah</span>
						<span className="etahNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="hardoi classHover" onClick={e => this.onDistrictClick("Hardoi","UP")}> 
						<img src="/Maps/Uttar_Pradesh/Hardoi.png"  alt="Hardoi"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Hardoi_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Hardoi.png")}/>
						<span className="hardoiText mapTextLabel text-capitalize">Hardoi</span>
						<span className="hardoiNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="farrukhabad classHover" onClick={e => this.onDistrictClick("Farrukhabad","UP")}> 
						<img src="/Maps/Uttar_Pradesh/Farrukhabad.png"  alt="Farrukhabad"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Farrukhabad_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Farrukhabad.png")}/>
						<span className="farrukhabadText mapTextLabel text-capitalize">Farrukhabad</span>
						<span className="farrukhabadNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="sitapur classHover" onClick={e => this.onDistrictClick("Sitapur","UP")}> 
						<img src="/Maps/Uttar_Pradesh/Sitapur.png"  alt="Sitapur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Sitapur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Sitapur.png")}/>
						<span className="sitapurText mapTextLabel text-capitalize">Sitapur</span>
						<span className="sitapurNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="bahraich classHover" onClick={e => this.onDistrictClick("Bahraich","UP")}> 
						<img src="/Maps/Uttar_Pradesh/Bahraich.png"  alt="Bahraich"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Bahraich.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Bahraich.png")}/>
						<span className="bahraichText mapTextLabel text-capitalize">Bahraich</span>
						<span className="bahraichNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="shravasti classHover" onClick={e => this.onDistrictClick("Shravasti","UP")}> 
						<img src="/Maps/Uttar_Pradesh/Shravasti.png"  alt="Shravasti"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Shravasti_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Shravasti.png")}/>
						<span className="shravastiText mapTextLabel text-capitalize">Shravasti</span>
						<span className="shravastiNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="balrampur classHover" onClick={e => this.onDistrictClick("Balrampur","UP")}> 
						<img src="/Maps/Uttar_Pradesh/Balrampur.png"  alt="Balrampur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Balrampur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Balrampur.png")}/>
						<span className="balrampurText mapTextLabel text-capitalize">Balrampur</span>
						<span className="balrampurNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="siddhathnagar classHover" onClick={e => this.onDistrictClick("Siddhathnagar","UP")}> 
						<img src="/Maps/Uttar_Pradesh/Siddhathnagar.png"  alt="Siddhathnagar"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Siddhathnagar_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Siddhathnagar.png")}/>
						<span className="siddhathnagarText mapTextLabel text-capitalize">Siddhathnagar</span>
						<span className="siddhathnagarNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="maharajhanj classHover" onClick={e => this.onDistrictClick("Maharajhanj","UP")}> 
						<img src="/Maps/Uttar_Pradesh/Maharajhanj.png"  alt="Maharajhanj"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Maharajhanj_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Maharajhanj.png")}/>
						<span className="maharajhanjText mapTextLabel text-capitalize">Maharajhanj</span>
						<span className="maharajhanjNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="agra classHover" onClick={e => this.onDistrictClick("Agra","UP")}>
						<img src="/Maps/Uttar_Pradesh/Agra.png"  alt="Agra"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Agra_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Agra.png")}/>
						<span className="agraText mapTextLabel text-capitalize">Agra</span>
						<span className="agraNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="firozabad classHover" onClick={e => this.onDistrictClick("Firozabad","UP")}>
						<img src="/Maps/Uttar_Pradesh/Firozabad.png"  alt="Firozabad"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Firozabad_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Firozabad.png")}/>
						<span className="firozabadText mapTextLabel text-capitalize">Firozabad</span>
						<span className="firozabadNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="manipuri classHover" onClick={e => this.onDistrictClick("Manipuri","UP")}>
						<img src="/Maps/Uttar_Pradesh/Manipuri.png"  alt="Manipuri"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Manipuri_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Manipuri.png")}/>
						<span className="manipuriText mapTextLabel text-capitalize">Manipuri</span>
						<span className="manipuriNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="kannauj classHover" onClick={e => this.onDistrictClick("Kannauj","UP")}>
						<img src="/Maps/Uttar_Pradesh/Kannauj.png"  alt="Kannauj"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Kannauj_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Kannauj.png")}/>
						<span className="kannaujText mapTextLabel text-capitalize">Kannauj</span>
						<span className="kannaujNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="etawah classHover" onClick={e => this.onDistrictClick("Etawah","UP")}>
						<img src="/Maps/Uttar_Pradesh/Etawah.png"  alt="Etawah"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Etawah_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Etawah.png")}/>
						<span className="etawahText mapTextLabel text-capitalize">Etawah</span>
						<span className="etawahNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="unnao classHover" onClick={e => this.onDistrictClick("Unnao","UP")}>
						<img src="/Maps/Uttar_Pradesh/Unnao.png"  alt="Unnao"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Unnao_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Unnao.png")}/>
						<span className="unnaoText mapTextLabel text-capitalize">Unnao</span>
						<span className="unnaoNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="auraiya classHover" onClick={e => this.onDistrictClick("Auraiya","UP")}>
						<img src="/Maps/Uttar_Pradesh/Auraiya.png"  alt="Auraiya"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Auraiya_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Auraiya.png")}/>
						<span className="auraiyaText mapTextLabel text-capitalize">Auraiya</span>
						<span className="auraiyaNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					
					<div className="kanpurNagar classHover" onClick={e => this.onDistrictClick("Kanpur Nagar","UP")}>
						<img src="/Maps/Uttar_Pradesh/Kanpur_Nagar.png"  alt="Kanpur_Nagar"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Kanpur_Nagar_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Kanpur_Nagar.png")}/>
						<span className="kanpurNagarText mapTextLabel text-capitalize">Kanpur_Nagar</span>
						<span className="kanpurNagarNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="kanpurDehat classHover" onClick={e => this.onDistrictClick("Kanpur Dehat","UP")}>
						<img src="/Maps/Uttar_Pradesh/Kanpur_Dehat.png"  alt="Kanpur_Dehat"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Kanpur_Dehat_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Kanpur_Dehat.png")}/>
						<span className="kanpurDehatText mapTextLabel text-capitalize">Kanpur_Dehat</span>
						<span className="kanpurDehatNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					
					<div className="barabanki classHover" onClick={e => this.onDistrictClick("Barabanki","UP")}>
						<img src="/Maps/Uttar_Pradesh/Barabanki.png"  alt="Barabanki"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Barabanki_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Barabanki.png")}/>
						<span className="barabankiText mapTextLabel text-capitalize">Barabanki</span>
						<span className="barabankiNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="luchknow classHover" onClick={e => this.onDistrictClick("Luchknow","UP")}>
						<img src="/Maps/Uttar_Pradesh/Luchknow.png"  alt="Luchknow"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Luchknow_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Luchknow.png")}/>
						<span className="luchknowText mapTextLabel text-capitalize">Luchknow</span>
						<span className="luchknowNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="gonda classHover" onClick={e => this.onDistrictClick("Gonda","UP")}>
						<img src="/Maps/Uttar_Pradesh/Gonda.png"  alt="Gonda"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Gonda_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Gonda.png")}/>
						<span className="gondaText mapTextLabel text-capitalize">Gonda</span>
						<span className="gondaNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="basti classHover" onClick={e => this.onDistrictClick("Basti","UP")}>
						<img src="/Maps/Uttar_Pradesh/Basti.png"  alt="Basti"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Basti_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Basti.png")}/>
						<span className="bastiText mapTextLabel text-capitalize">Basti</span>
						<span className="bastiNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					
					<div className="gorakhpur classHover" onClick={e => this.onDistrictClick("Gorakhpur","UP")}>
						<img src="/Maps/Uttar_Pradesh/Gorakhpur.png"  alt="Gorakhpur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Gorakhpur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Gorakhpur.png")}/>
						<span className="gorakhpurText mapTextLabel text-capitalize">Gorakhpur</span>
						<span className="gorakhpurNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="santKabirNagar classHover" onClick={e => this.onDistrictClick("Sant Kabir Nagar","UP")}>
						<img src="/Maps/Uttar_Pradesh/Sant_Kabir_Nagar.png"  alt="Sant_Kabir_Nagar"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Sant_Kabir_Nagar.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Sant_Kabir_Nagar.png")}/>
						<span className="santKabirNagarText mapTextLabel text-capitalize">Sant_Kabir_Nagar</span>
						<span className="santKabirNagarNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="kushinagar classHover" onClick={e => this.onDistrictClick("Kushinagar","UP")}>
						<img src="/Maps/Uttar_Pradesh/Kushinagar.png"  alt="Kushinagar"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Kushinagar_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Kushinagar.png")}/>
						<span className="kushinagarText mapTextLabel text-capitalize">Kushinagar</span>
						<span className="kushinagarNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="deoria classHover" onClick={e => this.onDistrictClick("Deoria","UP")}>
						<img src="/Maps/Uttar_Pradesh/Deoria.png"  alt="Deoria"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Deoria_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Deoria.png")}/>
						<span className="deoriaText mapTextLabel text-capitalize">Deoria</span>
						<span className="deoriaNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="jalaun classHover" onClick={e => this.onDistrictClick("Jalaun","UP")}>
						<img src="/Maps/Uttar_Pradesh/Jalaun.png"  alt="Jalaun"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Jalaun_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Jalaun.png")}/>
						<span className="jalaunText mapTextLabel text-capitalize">Jalaun</span>
						<span className="jalaunNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="hamirpur classHover" onClick={e => this.onDistrictClick("Hamirpur","UP")}>
						<img src="/Maps/Uttar_Pradesh/Hamirpur.png"  alt="Hamirpur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Hamirpur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Hamirpur.png")}/>
						<span className="hamirpurText mapTextLabel text-capitalize">Hamirpur</span>
						<span className="hamirpurNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="fatehpur classHover" onClick={e => this.onDistrictClick("Fatehpur","UP")}>
						<img src="/Maps/Uttar_Pradesh/Fatehpur.png"  alt="Fatehpur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Fatehpur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Fatehpur.png")}/>
						<span className="fatehpurText mapTextLabel text-capitalize">Fatehpur</span>
						<span className="fatehpurNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="raeBareli classHover" onClick={e => this.onDistrictClick("Rae Bareli","UP")}>
						<img src="/Maps/Uttar_Pradesh/Rae_Bareli.png"  alt="Rae_Bareli"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Rae_Bareli_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Rae_Bareli.png")}/>
						<span className="raeBareliText mapTextLabel text-capitalize">Rae_Bareli</span>
						<span className="raeBareliNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="gauriganj classHover" onClick={e => this.onDistrictClick("Gauriganj","UP")}>
						<img src="/Maps/Uttar_Pradesh/Gauriganj.png"  alt="Gauriganj"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Gauriganj_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Gauriganj.png")}/>
						<span className="gauriganjText mapTextLabel text-capitalize">Gauriganj</span>
						<span className="gauriganjNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="faizabad classHover" onClick={e => this.onDistrictClick("Faizabad","UP")}>
						<img src="/Maps/Uttar_Pradesh/Faizabad.png"  alt="Faizabad"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Faizabad_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Faizabad.png")}/>
						<span className="faizabadText mapTextLabel text-capitalize">Faizabad</span>
						<span className="faizabadNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="ambedkarNagar classHover" onClick={e => this.onDistrictClick("Ambedkar Nagar","UP")}>
						<img src="/Maps/Uttar_Pradesh/Ambedkar_Nagar.png"  alt="Ambedkar_Nagar"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Ambedkar_Nagar_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Ambedkar_Nagar.png")}/>
						<span className="ambedkarNagarText mapTextLabel text-capitalize">Ambedkar_Nagar</span>
						<span className="ambedkarNagarNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="sultanpur classHover" onClick={e => this.onDistrictClick("Sultanpur","UP")}>
						<img src="/Maps/Uttar_Pradesh/Sultanpur.png"  alt="Sultanpur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Sultanpur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Sultanpur.png")}/>
						<span className="sultanpurText mapTextLabel text-capitalize">Sultanpur</span>
						<span className="sultanpurNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="mau classHover" onClick={e => this.onDistrictClick("Mau","UP")}>
						<img src="/Maps/Uttar_Pradesh/Mau.png"  alt="Mau"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Mau_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Mau.png")}/>
						<span className="mauText mapTextLabel text-capitalize">Mau</span>
						<span className="mauNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="ballia classHover" onClick={e => this.onDistrictClick("Ballia","UP")}>
						<img src="/Maps/Uttar_Pradesh/Ballia.png"  alt="Ballia"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Ballia_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Ballia.png")}/>
						<span className="balliaText mapTextLabel text-capitalize">Ballia</span>
						<span className="balliaNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="jhansi classHover" onClick={e => this.onDistrictClick("Jhansi","UP")}>
						<img src="/Maps/Uttar_Pradesh/Jhansi.png"  alt="Jhansi"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Jhansi_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Jhansi.png")}/>
						<span className="jhansiText mapTextLabel text-capitalize">Jhansi</span>
						<span className="jhansiNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="hamirpur classHover" onClick={e => this.onDistrictClick("Hamirpur","UP")}>
						<img src="/Maps/Uttar_Pradesh/Hamirpur.png"  alt="Hamirpur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Hamirpur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Hamirpur.png")}/>
						<span className="hamirpurText mapTextLabel text-capitalize">Hamirpur</span>
						<span className="hamirpurNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="mahoba classHover" onClick={e => this.onDistrictClick("Mahoba","UP")}>
						<img src="/Maps/Uttar_Pradesh/Mahoba.png"  alt="Mahoba"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Mahoba.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Mahoba.png")}/>
						<span className="mahobaText mapTextLabel text-capitalize">Mahoba</span>
						<span className="mahobaNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="banda classHover" onClick={e => this.onDistrictClick("Banda","UP")}>
						<img src="/Maps/Uttar_Pradesh/Banda.png"  alt="Banda"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Banda_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Banda.png")}/>
						<span className="bandaText mapTextLabel text-capitalize">Banda</span>
						<span className="bandaNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="chitrakoot classHover" onClick={e => this.onDistrictClick("Chitrakoot","UP")}>
						<img src="/Maps/Uttar_Pradesh/Chitrakoot.png"  alt="Chitrakoot"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Chitrakoot_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Chitrakoot.png")}/>
						<span className="chitrakootText mapTextLabel text-capitalize">Chitrakoot</span>
						<span className="chitrakootNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					
					<div className="pratapgarh classHover" onClick={e => this.onDistrictClick("Pratapgarh","UP")}>
						<img src="/Maps/Uttar_Pradesh/Pratapgarh.png"  alt="Pratapgarh"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Pratapgarh_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Pratapgarh.png")}/>
						<span className="pratapgarhText mapTextLabel text-capitalize">Pratapgarh</span>
						<span className="pratapgarhNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="jaunpur classHover" onClick={e => this.onDistrictClick("Jaunpur","UP")}>
						<img src="/Maps/Uttar_Pradesh/Jaunpur.png"  alt="Jaunpur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Jaunpur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Jaunpur.png")}/>
						<span className="jaunpurText mapTextLabel text-capitalize">Jaunpur</span>
						<span className="jaunpurNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="allahabad classHover" onClick={e => this.onDistrictClick("Allahabad","UP")}>
						<img src="/Maps/Uttar_Pradesh/Allahabad.png"  alt="Allahabad"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Allahabad_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Allahabad.png")}/>
						<span className="allahabadText mapTextLabel text-capitalize">Allahabad</span>
						<span className="allahabadNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="kaushambi classHover" onClick={e => this.onDistrictClick("Kaushambi","UP")}>
						<img src="/Maps/Uttar_Pradesh/Kaushambi.png"  alt="Kaushambi"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Kaushambi_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Kaushambi.png")}/>
						<span className="kaushambiText mapTextLabel text-capitalize">Kaushambi</span>
						<span className="kaushambiNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="varanasi classHover" onClick={e => this.onDistrictClick("Varanasi","UP")}>
						<img src="/Maps/Uttar_Pradesh/Varanasi.png"  alt="Varanasi"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Varanasi_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Varanasi.png")}/>
						<span className="varanasiText mapTextLabel text-capitalize">Varanasi</span>
						<span className="varanasiNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="santRavidasNagar classHover" onClick={e => this.onDistrictClick("Sant Ravidas Nagar","UP")}>
						<img src="/Maps/Uttar_Pradesh/Sant_Ravidas_Nagar.png"  alt="Sant_Ravidas_Nagar"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Sant_Ravidas_Nagar_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Sant_Ravidas_Nagar.png")}/>
						<span className="santRavidasNagarText mapTextLabel text-capitalize">Sant_Ravidas_Nagar</span>
						<span className="santRavidasNagarNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="ghazipur classHover" onClick={e => this.onDistrictClick("Ghazipur","UP")}>
						<img src="/Maps/Uttar_Pradesh/Ghazipur.png"  alt="Ghazipur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Ghazipur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Ghazipur.png")}/>
						<span className="ghazipurText mapTextLabel text-capitalize">Ghazipur</span>
						<span className="ghazipurNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="chandauli classHover" onClick={e => this.onDistrictClick("Chandauli","UP")}>
						<img src="/Maps/Uttar_Pradesh/Chandauli.png"  alt="Chandauli"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Chandauli_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Chandauli.png")}/>
						<span className="chandauliText mapTextLabel text-capitalize">Chandauli</span>
						<span className="chandauliNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="mirzapur classHover" onClick={e => this.onDistrictClick("Mirzapur","UP")}>
						<img src="/Maps/Uttar_Pradesh/Mirzapur.png"  alt="Mirzapur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Mirzapur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Mirzapur.png")}/>
						<span className="mirzapurText mapTextLabel text-capitalize">Mirzapur</span>
						<span className="mirzapurNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="sonbhandra classHover" onClick={e => this.onDistrictClick("Sonbhandra","UP")}>
						<img src="/Maps/Uttar_Pradesh/Sonbhandra.png"  alt="Sonbhandra"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Sonbhandra_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Sonbhandra.png")}/>
						<span className="sonbhandraText mapTextLabel text-capitalize">Sonbhandra</span>
						<span className="sonbhandraNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="lalitpur classHover" onClick={e => this.onDistrictClick("Lalitpur","UP")}>
						<img src="/Maps/Uttar_Pradesh/Lalitpur.png"  alt="Lalitpur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Lalitpur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Uttar_Pradesh/Lalitpur.png")}/>
						<span className="lalitpurText mapTextLabel text-capitalize">Lalitpur</span>
						<span className="lalitpurNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
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

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(UttarPradesh));
