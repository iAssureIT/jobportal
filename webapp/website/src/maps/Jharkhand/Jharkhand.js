import React, {Component}     from 'react';
import Axios 				  from 'axios';
import Swal 				  from 'sweetalert2';
import {Redirect}             from 'react-router-dom';
import { withRouter }         from 'react-router-dom';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../common/actions/index';
import './Jharkhand.css';
import '../global.css';


class Jharkhand extends Component{
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

		this.props.history.push("/country/"+this.props.match.params.countryCode+"/state/"+stateCode+"/city/"+district+"/function/"+this.props.match.params.functionalArea + "/"+this.props.match.params.functionalArea_id+"/subfunction/"+this.props.match.params.subfunctionalArea + "/"+this.props.match.params.subfunctionalArea_id );

	}
	render(){
		return(
			<div className="bodyWrapper">
				<div className="stateWrapper">
					<div className="garhwa classHover" onClick={e => this.onDistrictClick("Garhwa","JH")}> 
						<img src="/Maps/Jharkhand/Garhwa.png"  alt="Garhwa"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Jharkhand/Garhwa_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Jharkhand/Garhwa.png")}/>
						<span className="garhwaText mapTextLabel text-capitalize">Garhwa</span>
						<span className="garhwaNumber mapCountLabel text-center">{this.state.Garhwa ? this.state.Garhwa : 0}</span>
					</div>
					<div className="palamu classHover" onClick={e => this.onDistrictClick("Palamu","JH")}> 
						<img src="/Maps/Jharkhand/Palamu.png" alt="Palamu"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Jharkhand/Palamu_.png")}
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Jharkhand/Palamu.png")}/>
						<span className="palamuText mapTextLabel text-capitalize">Palamu</span>
						<span className="palamuNumber mapCountLabel text-center">{this.state.Palamu ? this.state.Palamu : 0}</span>
					</div>
					<div className="chatra classHover" onClick={e => this.onDistrictClick("Chatra","JH")}> 
						<img src="/Maps/Jharkhand/Chatra.png" alt="Chatra"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Jharkhand/Chatra_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Jharkhand/Chatra.png")}/>
						<span className="chatraText mapTextLabel text-capitalize">Chatra</span>
						<span className="chatraNumber mapCountLabel text-center">{this.state.Chatra ? this.state.Chatra : 0}</span>
					</div>
					<div className="hazaribag classHover" onClick={e => this.onDistrictClick("Hazaribag","JH")}> 
						<img src="/Maps/Jharkhand/Hazaribag.png"  alt="Hazaribag"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Jharkhand/Hazaribag_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Jharkhand/Hazaribag.png")}/>
						<span className="hazaribagText mapTextLabel text-capitalize">Hazaribag</span>
						<span className="hazaribagNumber mapCountLabel text-center">{this.state.Hazaribag ? this.state.Hazaribag : 0}</span>
					</div>
					<div className="koderma classHover" onClick={e => this.onDistrictClick("Koderma","JH")}> 
						<img src="/Maps/Jharkhand/Koderma.png" alt="Koderma"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Jharkhand/Koderma_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Jharkhand/Koderma.png")}/>
						<span className="kodermaText mapTextLabel text-capitalize">Koderma</span>
						<span className="kodermaNumber mapCountLabel text-center">{this.state.Koderma ? this.state.Koderma : 0}</span>
					</div>
					<div className="giridin classHover" onClick={e => this.onDistrictClick("Giridin","JH")}> 
						<img src="/Maps/Jharkhand/Giridin.png"  alt="Giridin"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Jharkhand/Giridin_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Jharkhand/Giridin.png")}/>
						<span className="giridinText mapTextLabel text-capitalize">Giridin</span>
						<span className="giridinNumber mapCountLabel text-center">{this.state.Giridin ? this.state.Giridin : 0}</span>
					</div>
					<div className="deoghar classHover" onClick={e => this.onDistrictClick("Deoghar","JH")}> 
						<img src="/Maps/Jharkhand/Deoghar.png"  alt="Deoghar"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Jharkhand/Deoghar_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Jharkhand/Deoghar.png")}/>
						<span className="deogharText mapTextLabel text-capitalize">Deoghar</span>
						<span className="deogharNumber mapCountLabel text-center">{this.state.Deoghar ? this.state.Deoghar : 0}</span>
					</div>
					<div className="dumka classHover" onClick={e => this.onDistrictClick("Dumka","JH")}> 
						<img src="/Maps/Jharkhand/Dumka.png"  alt="Dumka"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Jharkhand/Dumka_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Jharkhand/Dumka.png")}/>
						<span className="dumkaText mapTextLabel text-capitalize">Dumka</span>
						<span className="dumkaNumber mapCountLabel text-center">{this.state.Dumka ? this.state.Thane : 0}</span>
					</div>
					<div className="godda classHover" onClick={e => this.onDistrictClick("Godda","JH")}> 
						<img src="/Maps/Jharkhand/Godda.png"  alt="Godda"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Jharkhand/Godda_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Jharkhand/Godda.png")}/>
						<span className="goddaText mapTextLabel text-capitalize">Godda</span>
						<span className="goddaNumber mapCountLabel text-center">{this.state.Godda ? this.state.Godda : 0}</span>
					</div>
					<div className="pakur classHover" onClick={e => this.onDistrictClick("Pakur","JH")}> 
						<img src="/Maps/Jharkhand/Pakur.png"  alt="Pakur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Jharkhand/Pakur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Jharkhand/Pakur.png")}/>
						<span className="pakurText mapTextLabel text-capitalize">Pakur</span>
						<span className="pakurNumber mapCountLabel text-center">{this.state.Pakur ? this.state.Pakur : 0}</span>
					</div>
					<div className="sahibganj classHover" onClick={e => this.onDistrictClick("Sahibganj","JH")}> 
						<img src="/Maps/Jharkhand/Sahibganj.png"  alt="Sahibganj"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Jharkhand/Sahibganj_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Jharkhand/Sahibganj.png")}/>
						<span className="sahibganjText mapTextLabel text-capitalize">Sahibganj</span>
						<span className="sahibganjNumber mapCountLabel text-center">{this.state.Sahibganj ? this.state.Sahibganj : 0}</span>
					</div>
					<div className="jamtara classHover" onClick={e => this.onDistrictClick("Jamtara","JH")}> 
						<img src="/Maps/Jharkhand/Jamtara.png"  alt="Jamtara"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Jharkhand/Jamtara_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Jharkhand/Jamtara.png")}/>
						<span className="jamtaraText mapTextLabel text-capitalize">Jamtara</span>
						<span className="jamtaraNumber mapCountLabel text-center">{this.state.Jamtara ? this.state.Jamtara : 0}</span>
					</div>
					<div className="dhanbad classHover" onClick={e => this.onDistrictClick("Dhanbad","JH")}> 
						<img src="/Maps/Jharkhand/Dhanbad.png"  alt="Dhanbad"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Jharkhand/Dhanbad_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Jharkhand/Dhanbad.png")}/>
						<span className="dhanbadText mapTextLabel text-capitalize">Dhanbad</span>
						<span className="dhanbadNumber mapCountLabel text-center">{this.state.Dhanbad ? this.state.Dhanbad : 0}</span>
					</div>
					<div className="bokaro classHover" onClick={e => this.onDistrictClick("Bokaro","JH")}> 
						<img src="/Maps/Jharkhand/Bokaro.png"  alt="Bokaro"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Jharkhand/Bokaro_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Jharkhand/Bokaro.png")}/>
						<span className="bokaroText mapTextLabel text-capitalize">Bokaro</span>
						<span className="bokaroNumber mapCountLabel text-center">{this.state.Bokaro ? this.state.TBokaro : 0}</span>
					</div>
					<div className="ramgarh classHover" onClick={e => this.onDistrictClick("Ramgarh","JH")}> 
						<img src="/Maps/Jharkhand/Ramgarh.png"  alt="Ramgarh"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Jharkhand/Ramgarh_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Jharkhand/Ramgarh.png")}/>
						<span className="ramgarhText mapTextLabel text-capitalize">Ramgarh</span>
						<span className="ramgarhNumber mapCountLabel text-center">{this.state.Ramgarh ? this.state.Ramgarh : 0}</span>
					</div>
					<div className="ranchi classHover" onClick={e => this.onDistrictClick("Ranchi","JH")}> 
						<img src="/Maps/Jharkhand/Ranchi.png"  alt="Ranchi"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Jharkhand/Ranchi_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Jharkhand/Ranchi.png")}/>
						<span className="ranchiText mapTextLabel text-capitalize">Ranchi</span>
						<span className="ranchiNumber mapCountLabel text-center">{this.state.Ranchi ? this.state.Ranchi : 0}</span>
					</div>
					
					<div className="eastSinghbhum classHover" onClick={e => this.onDistrictClick("East Singhbhum","JH")}> 
						<img src="/Maps/Jharkhand/East_Singhbhum.png"  alt="East_Singhbhum"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Jharkhand/East_Singhbhum_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Jharkhand/East_Singhbhum.png")}/>
						<span className="eastSinghbhumText mapTextLabel text-capitalize">East_Singhbhum</span>
						<span className="eastSinghbhumNumber mapCountLabel text-center">{this.state.East_Singhbhum ? this.state.East_Singhbhum : 0}</span>
					</div>
					<div className="saraikelaKharsawan classHover" onClick={e => this.onDistrictClick("Saraikela_Kharsawan","JH")}> 
						<img src="/Maps/Jharkhand/Saraikela_Kharsawan.png"  alt="Saraikela_Kharsawan"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Jharkhand/Saraikela_Kharsawan_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Jharkhand/Saraikela_Kharsawan.png")}/>
						<span className="saraikelaKharsawanText mapTextLabel text-capitalize">Saraikela_Kharsawan</span>
						<span className="saraikelaKharsawanNumber mapCountLabel text-center">{this.state.Saraikela_Kharsawan ? this.state.Saraikela_Kharsawan : 0}</span>
					</div>
					<div className="westSinghbhum classHover" onClick={e => this.onDistrictClick("West_Singhbhum","JH")}> 
						<img src="/Maps/Jharkhand/West_Singhbhum.png" alt="West_Singhbhum"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Jharkhand/West_Singhbhum_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Jharkhand/West_Singhbhum.png")}/>
						<span className="westSinghbhumText mapTextLabel text-capitalize">West_Singhbhum</span>
						<span className="westSinghbhumNumber mapCountLabel text-center">{this.state.West_Singhbhum ? this.state.West_Singhbhum : 0}</span>
					</div>
					<div className="simdega classHover" onClick={e => this.onDistrictClick("Simdega","JH")}> 
						<img src="/Maps/Jharkhand/Simdega.png"  alt="Simdega"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Jharkhand/Simdega_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Jharkhand/Simdega.png")}/>
						<span className="simdegaText mapTextLabel text-capitalize">Simdega</span>
						<span className="simdegaNumber mapCountLabel text-center">{this.state.Simdega ? this.state.Simdega : 0}</span>
					</div>
					<div className="khunti classHover" onClick={e => this.onDistrictClick("Khunti","JH")}> 
						<img src="/Maps/Jharkhand/Khunti.png"  alt="Khunti"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Jharkhand/Khunti_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Jharkhand/Khunti.png")}/>
						<span className="khuntiText mapTextLabel text-capitalize">Khunti</span>
						<span className="khuntiNumber mapCountLabel text-center">{this.state.Khunti ? this.state.Khunti : 0}</span>
					</div>
					<div className="gumla classHover" onClick={e => this.onDistrictClick("Gumla","JH")}> 
						<img src="/Maps/Jharkhand/Gumla.png"  alt="Gumla"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Jharkhand/Gumla_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Jharkhand/Gumla.png")}/>
						<span className="gumlaText mapTextLabel text-capitalize">Gumla</span>
						<span className="gumlaNumber mapCountLabel text-center">{this.state.Gumla ? this.state.Gumla : 0}</span>
					</div>
					<div className="lohardaga classHover" onClick={e => this.onDistrictClick("Lohardaga","JH")}> 
						<img src="/Maps/Jharkhand/Lohardaga.png" alt="Lohardaga"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Jharkhand/Lohardaga_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Jharkhand/Lohardaga.png")}/>
						<span className="lohardagaText mapTextLabel text-capitalize">Lohardaga</span>
						<span className="lohardagaNumber mapCountLabel text-center">{this.state.Lohardaga ? this.state.Lohardaga : 0}</span>
					</div>
					<div className="latehar classHover" onClick={e => this.onDistrictClick("Latehar","JH")}> 
						<img src="/Maps/Jharkhand/Latehar.png"  alt="Latehar"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Jharkhand/Latehar_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Jharkhand/Latehar.png")}/>
						<span className="lateharText mapTextLabel text-capitalize">Latehar</span>
						<span className="lateharNumber mapCountLabel text-center">{this.state.Latehar ? this.state.Latehar : 0}</span>
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

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Jharkhand));