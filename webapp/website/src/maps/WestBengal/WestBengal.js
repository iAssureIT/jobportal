import React, {Component}     from 'react';
import Axios 				  from 'axios';
import Swal 				  from 'sweetalert2';
import {Redirect}             from 'react-router-dom';
import { withRouter }         from 'react-router-dom';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../common/actions/index';
import './WestBengal.css';
import '../global.css';


class WestBengal extends Component{
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
					<div className="darjeeling classHover" onClick={e => this.onDistrictClick("Darjeeling","WB")}> 
						<img src="/Maps/West_Bengal/Darjeeling.png"  alt="Darjeeling" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/West_Bengal/Darjeeling_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/West_Bengal/Darjeeling.png")}/>
						<span className="darjeelingText mapTextLabel text-capitalize">Darjeeling</span>
						<span className="darjeelingNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="kalimpong classHover" onClick={e => this.onDistrictClick("Kalimpong","WB")}> 
						<img src="/Maps/West_Bengal/Kalimpong.png"  alt="Kalimpong" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/West_Bengal/Kalimpong_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/West_Bengal/Kalimpong.png")}/>
						<span className="kalimpongText mapTextLabel text-capitalize">Kalimpong</span>
						<span className="kalimpongNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="jalpaiguri classHover" onClick={e => this.onDistrictClick("Jalpaiguri","WB")}> 
						<img src="/Maps/West_Bengal/Jalpaiguri.png"  alt="Jalpaiguri" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/West_Bengal/Jalpaiguri_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/West_Bengal/Jalpaiguri.png")}/>
						<span className="jalpaiguriText mapTextLabel text-capitalize">Jalpaiguri</span>
						<span className="jalpaiguriNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="alipurduar classHover" onClick={e => this.onDistrictClick("Alipurduar","WB")}> 
						<img src="/Maps/West_Bengal/Alipurduar.png"  alt="Alipurduar" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/West_Bengal/Alipurduar_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/West_Bengal/Alipurduar.png")}/>
						<span className="alipurduarText mapTextLabel text-capitalize">Alipurduar</span>
						<span className="alipurduarNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="coochBihar classHover" onClick={e => this.onDistrictClick("Cooch Bihar","WB")}> 
						<img src="/Maps/West_Bengal/Cooch_Bihar.png"  alt="Cooch_Bihar" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/West_Bengal/Cooch_Bihar_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/West_Bengal/Cooch_Bihar.png")}/>
						<span className="coochBiharText mapTextLabel text-capitalize">Cooch_Bihar</span>
						<span className="coochBiharNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="uttarDinajpur classHover" onClick={e => this.onDistrictClick("Uttar Dinajpur","WB")}> 
						<img src="/Maps/West_Bengal/Uttar_Dinajpur.png"  alt="Uttar_Dinajpur" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/West_Bengal/Uttar_Dinajpur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/West_Bengal/Uttar_Dinajpur.png")}/>
						<span className="uttarDinajpurText mapTextLabel text-capitalize">Uttar_Dinajpur</span>
						<span className="uttarDinajpurNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="dakshinDinajpur classHover" onClick={e => this.onDistrictClick("Dakshin Dinajpur","WB")}> 
						<img src="/Maps/West_Bengal/Dakshin_Dinajpur.png"  alt="Dakshin_Dinajpur" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/West_Bengal/Dakshin_Dinajpur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/West_Bengal/Dakshin_Dinajpur.png")}/>
						<span className="dakshinDinajpurText mapTextLabel text-capitalize">Dakshin_Dinajpur</span>
						<span className="dakshinDinajpurNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="malda classHover" onClick={e => this.onDistrictClick("Malda","WB")}> 
						<img src="/Maps/West_Bengal/Malda.png"  alt="Malda" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/West_Bengal/Malda_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/West_Bengal/Malda.png")}/>
						<span className="maldaText mapTextLabel text-capitalize">Malda</span>
						<span className="maldaNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="murshidabad classHover" onClick={e => this.onDistrictClick("Murshidabad","WB")}> 
						<img src="/Maps/West_Bengal/Murshidabad.png"  alt="Murshidabad" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/West_Bengal/Murshidabad_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/West_Bengal/Murshidabad.png")}/>
						<span className="murshidabadText mapTextLabel text-capitalize">Murshidabad</span>
						<span className="murshidabadNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="birbhum classHover" onClick={e => this.onDistrictClick("Birbhum","WB")}> 
						<img src="/Maps/West_Bengal/Birbhum.png"  alt="Birbhum" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/West_Bengal/Birbhum_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/West_Bengal/Birbhum.png")}/>
						<span className="birbhumText mapTextLabel text-capitalize">Birbhum</span>
						<span className="birbhumNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="purbaBardhaman classHover" onClick={e => this.onDistrictClick("Purba Bardhaman","WB")}> 
						<img src="/Maps/West_Bengal/Purba_Bardhaman.png"  alt="Purba_Bardhaman" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/West_Bengal/Purba_Bardhaman_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/West_Bengal/Purba_Bardhaman.png")}/>
						<span className="purbaBardhamanText mapTextLabel text-capitalize">Purba_Bardhaman</span>
						<span className="purbaBardhamanNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="nadia classHover" onClick={e => this.onDistrictClick("Nadia","WB")}> 
						<img src="/Maps/West_Bengal/Nadia.png"  alt="Nadia" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/West_Bengal/Nadia_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/West_Bengal/Nadia.png")}/>
						<span className="nadiaText mapTextLabel text-capitalize">Nadia</span>
						<span className="nadiaNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="pashchimBardhaman classHover" onClick={e => this.onDistrictClick("Pashchim Bardhaman","WB")}> 
						<img src="/Maps/West_Bengal/Pashchim_Bardhaman.png"  alt="Pashchim_Bardhaman" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/West_Bengal/Pashchim_Bardhaman_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/West_Bengal/Pashchim_Bardhaman.png")}/>
						<span className="pashchimBardhamanText mapTextLabel text-capitalize">Pashchim_Bardhaman</span>
						<span className="pashchimBardhamanNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="bankura classHover" onClick={e => this.onDistrictClick("Bankura","WB")}> 
						<img src="/Maps/West_Bengal/Bankura.png"  alt="Bankura" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/West_Bengal/Bankura_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/West_Bengal/Bankura.png")}/>
						<span className="bankuraText mapTextLabel text-capitalize">Bankura</span>
						<span className="bankuraNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="parulia classHover" onClick={e => this.onDistrictClick("Parulia","WB")}> 
						<img src="/Maps/West_Bengal/Parulia.png"  alt="Parulia" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/West_Bengal/Parulia_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/West_Bengal/Parulia.png")}/>
						<span className="paruliaText mapTextLabel text-capitalize">Parulia</span>
						<span className="paruliaNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="jhargram classHover" onClick={e => this.onDistrictClick("Jhargram","WB")}> 
						<img src="/Maps/West_Bengal/Jhargram.png"  alt="Jhargram" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/West_Bengal/Jhargram_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/West_Bengal/Jhargram.png")}/>
						<span className="jhargramText mapTextLabel text-capitalize">Jhargram</span>
						<span className="jhargramNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="pashchimMedinipur classHover" onClick={e => this.onDistrictClick("Pashchim Medinipur","WB")}> 
						<img src="/Maps/West_Bengal/Pashchim_Medinipur.png"  alt="Pashchim_Medinipur" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/West_Bengal/Pashchim_Medinipur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/West_Bengal/Pashchim_Medinipur.png")}/>
						<span className="pashchimMedinipurText mapTextLabel text-capitalize">Pashchim_Medinipur</span>
						<span className="pashchimMedinipurNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="purbaMedinipur classHover" onClick={e => this.onDistrictClick("Purba Medinipur","WB")}> 
						<img src="/Maps/West_Bengal/Purba_Medinipur.png"  alt="Purba_Medinipur" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/West_Bengal/Purba_Medinipur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/West_Bengal/Purba_Medinipur.png")}/>
						<span className="purbaMedinipurText mapTextLabel text-capitalize">Purba_Medinipur</span>
						<span className="purbaMedinipurNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="hooghly classHover" onClick={e => this.onDistrictClick("Hooghly","WB")}> 
						<img src="/Maps/West_Bengal/Hooghly.png"  alt="Hooghly" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/West_Bengal/Hooghly_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/West_Bengal/Hooghly.png")}/>
						<span className="hooghlyText mapTextLabel text-capitalize">Hooghly</span>
						<span className="hooghlyNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="howrah classHover" onClick={e => this.onDistrictClick("Howrah","WB")}> 
						<img src="/Maps/West_Bengal/Howrah.png"  alt="Howrah" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/West_Bengal/Howrah_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/West_Bengal/Howrah.png")}/>
						<span className="howrahText mapTextLabel text-capitalize">Howrah</span>
						<span className="howrahNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="north24Paraganas classHover" onClick={e => this.onDistrictClick("North 24 Paraganas","WB")}> 
						<img src="/Maps/West_Bengal/North_24_Paraganas.png"  alt="North_24_Paraganas" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/West_Bengal/North_24_Paraganas_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/West_Bengal/North_24_Paraganas.png")}/>
						<span className="north24ParaganasText mapTextLabel text-capitalize">North_24_Paraganas</span>
						<span className="north24ParaganasNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="south24Paraganas classHover" onClick={e => this.onDistrictClick("South 24 Paraganas","WB")}> 
						<img src="/Maps/West_Bengal/South_24_Paraganas.png"  alt="South_24_Paraganas" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/West_Bengal/South_24_Paraganas_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/West_Bengal/South_24_Paraganas.png")}/>
						<span className="south24ParaganasText mapTextLabel text-capitalize">South_24_Paraganas</span>
						<span className="south24ParaganasNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="kolkata classHover" onClick={e => this.onDistrictClick("Kolkata","WB")}> 
						<img src="/Maps/West_Bengal/Kolkata.png"  alt="Kolkata" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/West_Bengal/Kolkata_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/West_Bengal/Kolkata.png")}/>
						<span className="kolkataText mapTextLabel text-capitalize">Kolkata</span>
						<span className="kolkataNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
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

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(WestBengal));