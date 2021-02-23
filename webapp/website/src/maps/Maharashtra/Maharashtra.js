import React, {Component}     from 'react';
import Axios 				  from 'axios';
import Swal 				  from 'sweetalert2';
import {Redirect}             from 'react-router-dom';
import { withRouter }         from 'react-router-dom';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../common/actions/index';
import './maharashtra.css';
import '../global.css';


class Maharashtra extends Component{
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
	componentWillReceiveProps(){
		
	}
	search(){
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

					<div className="thane classHover" onClick={e => this.onDistrictClick("Thane","MH")}> 
						<img src="/Maps/Maharashtra/Thane.png" alt="Thane" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Thane_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Thane.png")}/>
						<span className="thaneText  mapTextLabel text-capitalize">Thane</span>
						<span className="thaneNumber  mapCountLabel  text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>

					<div className="mumbai classHover" onClick={e => this.onDistrictClick("Mumbai","MH")}> 
						<img src="/Maps/Maharashtra/Mumbai_City.png" alt="Mumbai_City" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Mumbai_City_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Mumbai_City.png")}/>
						<span className="mumbaiText mapTextLabel text-capitalize">Mumbai City</span>
						<span className="mumbaiNumber mapCountLabel text-center">{this.state.Mumbai ? this.state.Mumbai : 0}</span>
					</div>

					<div className="raigad classHover" onClick={e => this.onDistrictClick("Raigad","MH")}> 
						<img src="/Maps/Maharashtra/Raigad.png" alt="Raigad" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Raigad_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Raigad.png")}/>
						<span className="raigadText  mapTextLabel text-capitalize">Raigad</span>
						<span className="raigadNumber mapCountLabel text-center">{this.state.Raigad ? this.state.Raigad : 0}</span>
					</div>

					<div className="ratnagiri classHover" onClick={e => this.onDistrictClick("Ratnagiri","MH")}> 
						<img src="/Maps/Maharashtra/Ratnagiri.png" alt="Ratnagiri" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Ratnagiri_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Ratnagiri.png")}/>
						<span className="ratnagiriText mapTextLabel  text-capitalize">Ratnagiri</span>
						<span className="ratnagiriNumber mapCountLabel text-center">{this.state.Ratnagiri ? this.state.Ratnagiri : 0}</span>
					</div>

					<div className="sindhudurg classHover" onClick={e => this.onDistrictClick("Sindhudurg","MH")}> 
						<img src="/Maps/Maharashtra/Sindhudurg.png" alt="Sindhudurg" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Sindhudurg_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Sindhudurg.png")}/>
						<span className="sindhudurgText  mapTextLabel text-capitalize">Sindhudurg</span>
						<span className="sindhudurgNumber mapCountLabel text-center">{this.state.Sindhudurg ? this.state.Sindhudurg : 0}</span>
					</div>

					<div className="kolhapur classHover" onClick={e => this.onDistrictClick("Kolhapur","MH")}> 
						<img src="/Maps/Maharashtra/Kolhapur.png" alt="Kolhapur" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Kolhapur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Kolhapur.png")}/>
						<span className="kolhapurText  mapTextLabel text-capitalize">Kolhapur</span>
						<span className="kolhapurNumber mapCountLabel text-center">{this.state.Kolhapur ? this.state.Kolhapur : 0}</span>
					</div>

					<div className="sangli classHover" onClick={e => this.onDistrictClick("Sangli","MH")}> 
						<img src="/Maps/Maharashtra/Sangli.png" alt="Sangli" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Sangli_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Sangli.png")}/>
						<span className="sangliText mapTextLabel  text-capitalize">Sangli</span>
						<span className="sangliNumber mapCountLabel text-center">{this.state.Sangli ? this.state.Sangli : 0}</span>
					</div>

					<div className="satara classHover" onClick={e => this.onDistrictClick("Satara","MH")}> 
						<img src="/Maps/Maharashtra/Satara.png" alt="Satara" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Satara_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Satara.png")}/>
						<span className="sataraText mapTextLabel text-capitalize">Satara</span>
						<span className="sataraNumber mapCountLabel text-center">{this.state.Satara ? this.state.Satara : 0}</span>
					</div>

					<div className="palghar classHover" onClick={e => this.onDistrictClick("Palghar","MH")}> 
						<img src="/Maps/Maharashtra/Palghar.png" alt="Palghar" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Palghar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Palghar.png")}/>
						<span className="palgharText  mapTextLabel text-capitalize">Palghar</span>
						<span className="palgharNumber  mapCountLabel  text-center">{this.state.Palghar ? this.state.Palghar : 0}</span>
					</div>

					<div className="ahmadnagar classHover" onClick={e => this.onDistrictClick("Ahmednagar","MH")}> 
						<img src="/Maps/Maharashtra/Ahmadnagar.png" alt="Ahmadnagar" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Ahmadnagar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Ahmadnagar.png")}/>
						<span className="ahmadnagarText  mapTextLabel text-capitalize">Ahmednagar</span>
						<span className="ahmadnagarNumber  mapCountLabel  text-center">{this.state.Ahmednagar ? this.state.Ahmednagar : 0}</span>
					</div>

					<div className="pune classHover" onClick={e => this.onDistrictClick("Pune","MH")}> 
						<img src="/Maps/Maharashtra/Pune.png" alt="Pune" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Pune_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Pune.png")}/>
						<span className="puneText mapTextLabel  text-capitalize">Pune</span>
						<span className="puneNumber  mapCountLabel  text-center">{this.state.Pune ? this.state.Pune : 0}</span>
					</div>

					<div className="aurangabadMah classHover" onClick={e => this.onDistrictClick("Aurangabad","MH")}> 
						<img src="/Maps/Maharashtra/Aurangabad.png" alt="Aurangabad" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Aurangabad_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Aurangabad.png")}/>
						<span className="aurangabadMahText mapTextLabel text-capitalize">Aurangabad</span>
						<span className="aurangabadMahNumber  mapCountLabel  text-center">{this.state.Aurangabad ? this.state.Aurangabad : 0}</span>
					</div>

					<div className="nashik classHover" onClick={e => this.onDistrictClick("Nashik","MH")}> 
						<img src="/Maps/Maharashtra/Nashik.png" alt="Nashik" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Nashik_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Nashik.png")}/>
						<span className="nashikText  mapTextLabel text-capitalize">Nashik</span>
						<span className="nashikNumber  mapCountLabel  text-center">{this.state.Nashik ? this.state.Nashik : 0}</span>
					</div>

					<div className="dhule classHover" onClick={e => this.onDistrictClick("Dhule","MH")}> 
						<img src="/Maps/Maharashtra/Dhule.png" alt="Dhule" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Dhule_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Dhule.png")}/>
						<span className="dhuleText  mapTextLabel text-capitalize">Dhule</span>
						<span className="dhuleNumber  mapCountLabel  text-center">{this.state.Dhule ? this.state.Dhule : 0}</span>
					</div>

					<div className="nandurbar classHover" onClick={e => this.onDistrictClick("Nandurbar","MH")}> 
						<img src="/Maps/Maharashtra/Nandurbar.png" alt="Nandurbar" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Nandurbar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Nandurbar.png")}/>
						<span className="nandurbarText  mapTextLabel text-capitalize">Nandurbar</span>
						<span className="nandurbarNumber  mapCountLabel  text-center">{this.state.Nandurbar ? this.state.Nandurbar : 0}</span>
					</div>

					<div className="jalgaon classHover" onClick={e => this.onDistrictClick("Jalgaon","MH")}> 
						<img src="/Maps/Maharashtra/Jalgaon.png" alt="Jalgaon" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Jalgaon_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Jalgaon.png")}/>
						<span className="jalgaonText  mapTextLabel text-capitalize">Jalgaon</span>
						<span className="jalgaonNumber  mapCountLabel  text-center">{this.state.Jalgaon ? this.state.Jalgaon : 0}</span>
					</div>

					<div className="buldhana classHover" onClick={e => this.onDistrictClick("Buldhana","MH")}> 
						<img src="/Maps/Maharashtra/Buldhana.png" alt="Buldhana" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Buldhana_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Buldhana.png")}/>
						<span className="buldhanaText  mapTextLabel text-capitalize">Buldhana</span>
						<span className="buldhanaNumber  mapCountLabel  text-center">{this.state.Buldhana ? this.state.Buldhana : 0}</span>
					</div>

					<div className="jalna classHover" onClick={e => this.onDistrictClick("Jalna","MH")}> 
						<img src="/Maps/Maharashtra/Jalna.png" alt="Jalna" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Jalna_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Jalna.png")}/>
						<span className="jalnaText  mapTextLabel text-capitalize">jalna</span>
						<span className="jalnaNumber  mapCountLabel  text-center">{this.state.Jalna ? this.state.Jalna : 0}</span>
					</div>

					<div className="beed classHover" onClick={e => this.onDistrictClick("Beed","MH")}> 
						<img src="/Maps/Maharashtra/Beed.png" alt="Beed" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Beed_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Beed.png")}/>
						<span className="beedText  mapTextLabel text-capitalize">beed</span>
						<span className="beedNumber  mapCountLabel  text-center">{this.state.Beed ? this.state.Beed : 0}</span>
					</div>
					
					<div className="usmanabad classHover" onClick={e => this.onDistrictClick("Osmanabad","MH")}> 
						<img src="/Maps/Maharashtra/Usmanabad.png" alt="Osmanabad" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Usmanabad_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Usmanabad.png")}/>
						<span className="usmanabadText  mapTextLabel text-capitalize">Osmanabad</span>
						<span className="usmanabadNumber  mapCountLabel  text-center">{this.state.Osmanabad ? this.state.Osmanabad : 0}</span>
					</div>

					<div className="solapur classHover" onClick={e => this.onDistrictClick("Solapur","MH")}> 
						<img src="/Maps/Maharashtra/Solapur.png" alt="Solapur" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Solapur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Solapur.png")}/>
						<span className="solapurText  mapTextLabel text-capitalize">solapur</span>
						<span className="solapurNumber  mapCountLabel  text-center">{this.state.Solapur ? this.state.Solapur : 0}</span>
					</div>

					<div className="latur classHover" onClick={e => this.onDistrictClick("Latur","MH")}> 
						<img src="/Maps/Maharashtra/Latur.png" alt="Latur" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Latur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Latur.png")}/>
						<span className="laturText mapTextLabel  text-capitalize">Latur</span>
						<span className="laturNumber  mapCountLabel  text-center">{this.state.Latur ? this.state.Latur : 0}</span>
					</div>

					<div className="parbhani classHover" onClick={e => this.onDistrictClick("Parbhani","MH")}> 
						<img src="/Maps/Maharashtra/Parbhani.png" alt="Parbhani" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Parbhani_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Parbhani.png")}/>
						<span className="parbhaniText mapTextLabel  text-capitalize">Parbhani</span>
						<span className="parbhaniNumber  mapCountLabel  text-center">{this.state.Parbhani ? this.state.Parbhani : 0}</span>
					</div>

					

					<div className="washim classHover" onClick={e => this.onDistrictClick("Washim","MH")}> 
						<img src="/Maps/Maharashtra/Washim.png" alt="Washim" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Washim_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Washim.png")}/>
						<span className="washimText  mapTextLabel text-capitalize">Washim</span>
						<span className="washimNumber  mapCountLabel  text-center">{this.state.Washim ? this.state.Washim : 0}</span>
					</div>

					<div className="hingoli classHover" onClick={e => this.onDistrictClick("Hingoli","MH")}> 
						<img src="/Maps/Maharashtra/Hingoli.png" alt="Hingoli" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Hingoli_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Hingoli.png")}/>
						<span className="hingoliText  mapTextLabel text-capitalize">Hingoli</span>
						<span className="hingoliNumber  mapCountLabel  text-center">{this.state.Hingoli ? this.state.Hingoli : 0}</span>
					</div>
					
					<div className="nanded classHover" onClick={e => this.onDistrictClick("Nanded","MH")}> 
						<img src="/Maps/Maharashtra/Nanded.png" alt="Nanded" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Nanded_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Nanded.png")}/>
						<span className="nandedText  mapTextLabel text-capitalize">Nanded</span>
						<span className="nandedNumber  mapCountLabel  text-center">{this.state.Nanded ? this.state.Nanded : 0}</span>
					</div>
 
					<div className="yawatmal classHover" onClick={e => this.onDistrictClick("Yavatmal","MH")}> 
						<img src="/Maps/Maharashtra/Yawatmal.png" alt="Yavatmal" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Yawatmal_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Yawatmal.png")}/>
						<span className="yawatmalText  mapTextLabel text-capitalize">Yavatmal</span>
						<span className="yawatmalNumber  mapCountLabel  text-center">{this.state.Yavatmal ? this.state.Yavatmal : 0}</span>
					</div>

					<div className="amrawati classHover" onClick={e => this.onDistrictClick("Amravati","MH")}> 
						<img src="/Maps/Maharashtra/Amrawati.png" alt="Amrawati" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Amrawati_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Amrawati.png")}/>
						<span className="amrawatiText  mapTextLabel text-capitalize">Amravati</span>
						<span className="amrawatiNumber  mapCountLabel  text-center">{this.state.Amravati ? this.state.Amravati : 0}</span>
					</div>
					
					<div className="wardha classHover" onClick={e => this.onDistrictClick("Wardha","MH")}> 
						<img src="/Maps/Maharashtra/Wardha.png" alt="Wardha" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Wardha_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Wardha.png")}/>
						<span className="wardhaText  mapTextLabel text-capitalize">Wardha</span>
						<span className="wardhaNumber  mapCountLabel  text-center">{this.state.Wardha ? this.state.Wardha : 0}</span>
					</div>
					
					<div className="nagpur classHover" onClick={e => this.onDistrictClick("Nagpur","MH")}> 
						<img src="/Maps/Maharashtra/Nagpur.png" alt="Nagpur" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Nagpur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Nagpur.png")}/>
						<span className="nagpurText  mapTextLabel text-capitalize">Nagpur</span>
						<span className="nagpurNumber mapCountLabel  text-center">{this.state.Nagpur ? this.state.Nagpur : 0}</span>
					</div>

					<div className="chandrpur classHover" onClick={e => this.onDistrictClick("Chandrapur","MH")}> 
						<img src="/Maps/Maharashtra/Chandrpur.png" alt="Chandrpur" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Chandrpur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Chandrpur.png")}/>
						<span className="chandrpurText  mapTextLabel text-capitalize">Chandrapur</span>
						<span className="chandrpurNumber  mapCountLabel  text-center">{this.state.Chandrapur ? this.state.Chandrapur : 0}</span>
					</div>
					
					<div className="bhandara classHover" onClick={e => this.onDistrictClick("Bhandara","MH")}> 
						<img src="/Maps/Maharashtra/Bhandara.png" alt="Bhandara" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Bhandara_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Bhandara.png")}/>
						<span className="bhandaraText  mapTextLabel text-capitalize">Bhandara</span>
						<span className="bhandaraNumber  mapCountLabel  text-center">{this.state.Bhandara ? this.state.Bhandara : 0}</span>
					</div>
					
					<div className="gondia classHover" onClick={e => this.onDistrictClick("Gondia","MH")}> 
						<img src="/Maps/Maharashtra/Gondia.png" alt="Gondia" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Gondia_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Gondia.png")}/>
						<span className="gondiaText  mapTextLabel text-capitalize">Gondia</span>
						<span className="gondiaNumber  mapCountLabel  text-center">{this.state.Gondia ? this.state.Gondia : 0}</span>
					</div>
					
					<div className="gadchiroli classHover" onClick={e => this.onDistrictClick("Gadchiroli","MH")}> 
						<img src="/Maps/Maharashtra/Gadchiroli.png" alt="Gadchiroli" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Gadchiroli_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Gadchiroli.png")}/>
						<span className="gadchiroliText  mapTextLabel text-capitalize">Gadchiroli</span>
						<span className="gadchiroliNumber  mapCountLabel  text-center">{this.state.Gadchiroli ? this.state.Gadchiroli : 0}</span>
					</div>

					<div className="akola classHover" onClick={e => this.onDistrictClick("Akola","MH")}> 
						<img src="/Maps/Maharashtra/Akola.png" alt="Akola" onMouseOver={e => (e.currentTarget.src = "/Maps/Maharashtra/Akola_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Maharashtra/Akola.png")}/>
						<span className="akolaText mapTextLabel  text-capitalize">Akola</span>
						<span className="akolaNumber  mapCountLabel  text-center">{this.state.Akola ? this.state.Akola : 0}</span>
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

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Maharashtra));
