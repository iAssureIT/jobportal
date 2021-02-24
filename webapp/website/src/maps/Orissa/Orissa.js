import React, {Component} from 'react';
import Axios 			  from 'axios';
import Swal 			  from 'sweetalert2';
import {Redirect}         from 'react-router-dom';
import { withRouter }     from 'react-router-dom';
import {connect}              from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../common/actions/index';
import './Orissa.css';
import '../global.css';


class Orissa extends Component{
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
					<div className="malkangir classHover" onClick={e => this.onDistrictClick("Malkangir","OD")}> 
						<img src="/Maps/Orissa/Malkangir.png"  alt="Malkangir" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Malkangir_.png")}
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Malkangir.png")}/>
						<span className="malkangirText mapTextLabel text-capitalize">Malkangir</span>
						<span className="malkangirNumber mapCountLabel text-center">{this.state.Malkangir ? this.state.Malkangir : 0}</span>
					</div>
					<div className="koraput classHover" onClick={e => this.onDistrictClick("Koraput","OD")}> 
						<img src="/Maps/Orissa/Koraput.png"  alt="Koraput"
						  onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Koraput_.png")} 
						  onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Koraput.png")}/>
						<span className="koraputText mapTextLabel text-capitalize">Koraput</span>
						<span className="koraputNumber mapCountLabel text-center">{this.state.Koraput ? this.state.Koraput : 0}</span>
					</div> 
					<div className="nabarangpur classHover" onClick={e => this.onDistrictClick("Nabarangpur","OD")}> 
						<img src="/Maps/Orissa/Nabarangpur.png"  alt="Nabarangpur"
						  onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Nabarangpur_.png")} 
						  onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Nabarangpur.png")}/>
						<span className="nabarangpurText mapTextLabel text-capitalize">Nabarangpur</span>
						<span className="nabarangpurNumber mapCountLabel text-center">{this.state.Nabarangpur ? this.state.Nabarangpur : 0}</span>
					</div>
					<div className="rayagada classHover" onClick={e => this.onDistrictClick("Rayagada","OD")}> 
						<img src="/Maps/Orissa/Rayagada.png"  alt="Rayagada"
						  onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Rayagada_.png")}
						   onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Rayagada.png")}/>
						<span className="rayagadaText mapTextLabel text-capitalize">Rayagada</span>
						<span className="rayagadaNumber mapCountLabel text-center">{this.state.Rayagada ? this.state.Rayagada : 0}</span>
					</div>
					<div className="kalahandi classHover" onClick={e => this.onDistrictClick("Kalahandi","OD")}> 
						<img src="/Maps/Orissa/Kalahandi.png"  alt="Kalahandi"
						  onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Kalahandi_.png")} 
						  onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Kalahandi.png")}/>
						<span className="kalahandiText mapTextLabel text-capitalize">Kalahandi</span>
						<span className="kalahandiNumber mapCountLabel text-center">{this.state.Kalahandi ? this.state.Kalahandi : 0}</span>
					</div>
					<div className="nuapada classHover" onClick={e => this.onDistrictClick("Nuapada","OD")}> 
						<img src="/Maps/Orissa/Nuapada.png"  alt="Nuapada"
						  onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Nuapada_.png")} 
						  onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Nuapada.png")}/>
						<span className="nuapadaText mapTextLabel text-capitalize">Nuapada</span>
						<span className="nuapadaNumber mapCountLabel text-center">{this.state.Nuapada ? this.state.Nuapada : 0}</span>
					</div>
					<div className="balangir classHover" onClick={e => this.onDistrictClick("Balangir","OD")}> 
						<img src="/Maps/Orissa/Balangir.png"  alt="Balangir"
						  onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Balangir_.png")} 
						  onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Balangir.png")}/>
						<span className="balangirText mapTextLabel text-capitalize">Balangir</span>
						<span className="balangirNumber mapCountLabel text-center">{this.state.Balangir ? this.state.Balangir : 0}</span>
					</div>
					<div className="kandhamal classHover" onClick={e => this.onDistrictClick("Kandhamal","OD")}> 
						<img src="/Maps/Orissa/Kandhamal.png"  alt="Kandhamal"
						  onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Kandhamal_.png")} 
						  onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Kandhamal.png")}/>
						<span className="kandhamalText mapTextLabel text-capitalize">Kandhamal</span>
						<span className="kandhamalNumber mapCountLabel text-center">{this.state.Kandhamal ? this.state.Kandhamal : 0}</span>
					</div>
					<div className="ganpati classHover" onClick={e => this.onDistrictClick("Ganpati","OD")}> 
						<img src="/Maps/Orissa/Ganpati.png"  alt="Ganpati"
						  onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Ganpati_.png")} 
						  onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Ganpati.png")}/>
						<span className="ganpatiText mapTextLabel text-capitalize">Ganpati</span>
						<span className="ganpatiNumber mapCountLabel text-center">{this.state.Ganpati ? this.state.Ganpati : 0}</span>
					</div>
					<div className="ganjam classHover" onClick={e => this.onDistrictClick("Ganjam","OD")}> 
						<img src="/Maps/Orissa/Ganjam.png"  alt="Ganjam" 
						  onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Ganjam_.png")}
						  onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Ganjam.png")}/>
						<span className="ganjamText mapTextLabel text-capitalize">Ganjam</span>
						<span className="ganjamNumber mapCountLabel text-center">{this.state.Ganjam ? this.state.Ganjam : 0}</span>
					</div>
					<div className="puri classHover" onClick={e => this.onDistrictClick("Puri","OD")}> 
						<img src="/Maps/Orissa/Puri.png"  alt="Puri"
						  onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Puri_.png")} 
						  onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Puri.png")}/>
						<span className="puriText mapTextLabel text-capitalize">Puri</span>
						<span className="puriNumber mapCountLabel text-center">{this.state.Puri ? this.state.Puri : 0}</span>
					</div>
					<div className="khordha classHover" onClick={e => this.onDistrictClick("Khordha","OD")}> 
						<img src="/Maps/Orissa/Khordha.png"  alt="Khordha"
						  onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Khordha_.png")} 
						  onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Khordha.png")}/>
						<span className="khordhaText mapTextLabel text-capitalize">Khordha</span>
						<span className="khordhaNumber mapCountLabel text-center">{this.state.Khordha ? this.state.Khordha : 0}</span>
					</div>
					<div className="nayagarh classHover" onClick={e => this.onDistrictClick("Nayagarh","OD")}> 
						<img src="/Maps/Orissa/Nayagarh.png"  alt="Nayagarh"
						  onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Nayagarh_.png")} 
						  onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Nayagarh.png")}/>
						<span className="nayagarhText mapTextLabel text-capitalize">Nayagarh</span>
						<span className="nayagarhNumber mapCountLabel text-center">{this.state.Nayagarh ? this.state.Nayagarh : 0}</span>
					</div>
					<div className="boudh classHover" onClick={e => this.onDistrictClick("Boudh","OD")}> 
						<img src="/Maps/Orissa/Boudh.png"  alt="Boudh"
						  onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Boudh_.png")} 
						  onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Boudh.png")}/>
						<span className="boudhText mapTextLabel text-capitalize">Boudh</span>
						<span className="boudhNumber mapCountLabel text-center">{this.state.Boudh ? this.state.Boudh : 0}</span>
					</div>
					<div className="subarnapur classHover" onClick={e => this.onDistrictClick("Subarnapur","OD")}> 
						<img src="/Maps/Orissa/Subarnapur.png"  alt="Subarnapur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Subarnapur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Subarnapur.png")}/>
						<span className="subarnapurText mapTextLabel text-capitalize">Subarnapur</span>
						<span className="subarnapurNumber mapCountLabel text-center">{this.state.Subarnapur ? this.state.Subarnapur : 0}</span>
					</div>
					<div className="bargarh classHover" onClick={e => this.onDistrictClick("Bargarh","OD")}> 
						<img src="/Maps/Orissa/Bargarh.png"  alt="Bargarh"
						  onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Bargarh_.png")} 
						  onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Bargarh.png")}/>
						<span className="bargarhText mapTextLabel text-capitalize">Bargarh</span>
						<span className="bargarhNumber mapCountLabel text-center">{this.state.Bargarh ? this.state.Bargarh : 0}</span>	
					</div>
					<div className="jharsugunda classHover" onClick={e => this.onDistrictClick("Jharsugunda","OD")}> 
						<img src="/Maps/Orissa/Jharsugunda.png"  alt="Jharsugunda"
						  onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Jharsugunda_.png")} 
						  onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Jharsugunda.png")}/>
						<span className="jharsugundaText mapTextLabel text-capitalize">Jharsugunda</span>
						<span className="jharsugundaNumber mapCountLabel text-center">{this.state.Jharsugunda ? this.state.Jharsugunda : 0}</span>
					</div>
					<div className="sambalpur classHover" onClick={e => this.onDistrictClick("Sambalpur","OD")}> 
						<img src="/Maps/Orissa/Sambalpur.png"  alt="Sambalpur"
						  onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Sambalpur_.png")} 
						  onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Sambalpur.png")}/>
						<span className="sambalpurText mapTextLabel text-capitalize">Sambalpur</span>
						<span className="sambalpurNumber mapCountLabel text-center">{this.state.Sambalpur ? this.state.Sambalpur : 0}</span>
					</div>
				
					
					<div className="angul classHover" onClick={e => this.onDistrictClick("Angul","OD")}> 
						<img src="/Maps/Orissa/Angul.png"  alt="Angul"
						  onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Angul_.png")} 
						  onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Angul.png")}/>
						<span className="angulText mapTextLabel text-capitalize">Angul</span>
						<span className="angulNumber mapCountLabel text-center">{this.state.Angul ? this.state.Angul : 0}</span>
					</div>
					<div className="deogarh classHover" onClick={e => this.onDistrictClick("Deogarh","OD")}> 
						<img src="/Maps/Orissa/Deogarh.png"  alt="Deogarh"
						  onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Deogarh_.png")} 
						  onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Deogarh.png")}/>
						<span className="deogarhText mapTextLabel text-capitalize">Deogarh</span>
						<span className="deogarhNumber mapCountLabel text-center">{this.state.Deogarh ? this.state.Deogarh : 0}</span>
					</div>
					<div className="dhenkanal classHover" onClick={e => this.onDistrictClick("Dhenkanal","OD")}> 
						<img src="/Maps/Orissa/Dhenkanal.png"  alt="Dhenkanal"
						  onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Dhenkanal_.png")} 
						  onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Dhenkanal.png")}/>
						<span className="dhenkanalText mapTextLabel text-capitalize">Dhenkanal</span>
						<span className="dhenkanalNumber mapCountLabel text-center">{this.state.Dhenkanal ? this.state.Dhenkanal : 0}</span>
					</div>
					<div className="bhubaneswar classHover" onClick={e => this.onDistrictClick("Bhubaneswar","OD")}> 
						<img src="/Maps/Orissa/Bhubaneswar.png"  alt="Bhubaneswar"
						  onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Bhubaneswar_.png")} 
						  onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Bhubaneswar.png")}/>
						<span className="bhubaneswarText mapTextLabel text-capitalize">Bhubaneswar</span>
						<span className="bhubaneswarNumber mapCountLabel text-center">{this.state.Bhubaneswar ? this.state.Bhubaneswar : 0}</span>
					</div>
					<div className="jagatsinghpur classHover" onClick={e => this.onDistrictClick("Jagatsinghpur","OD")}> 
						<img src="/Maps/Orissa/Jagatsinghpur.png"  alt="Jagatsinghpur" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Jagatsinghpur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Jagatsinghpur.png")}/>
						<span className="jagatsinghpurText mapTextLabel text-capitalize">Jagatsinghpur</span>
						<span className="jagatsinghpurNumber mapCountLabel text-center">{this.state.Jagatsinghpur ? this.state.Jagatsinghpur : 0}</span>
					</div>
					<div className="kendrapara classHover" onClick={e => this.onDistrictClick("Kendrapara","OD")}> 
						<img src="/Maps/Orissa/Kendrapara.png"  alt="Kendrapara"
						  onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Kendrapara_.png")} 
						  onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Kendrapara.png")}/>
						<span className="kendraparaText mapTextLabel text-capitalize">Kendrapara</span>
						<span className="kendraparaNumber mapCountLabel text-center">{this.state.Kendrapara ? this.state.Kendrapara : 0}</span>
					</div>
					<div className="jaipur classHover" onClick={e => this.onDistrictClick("Jaipur","OD")}> 
						<img src="/Maps/Orissa/Jaipur.png"  alt="Jaipur"
						  onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Jaipur_.png")} 
						  onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Jaipur.png")}/>
						<span className="jaipurText mapTextLabel text-capitalize">Jaipur</span>
						<span className="jaipurNumber mapCountLabel text-center">{this.state.Jaipur ? this.state.Jaipur : 0}</span>
					</div>
					<div className="kendujhar classHover" onClick={e => this.onDistrictClick("Kendujhar","OD")}> 
						<img src="/Maps/Orissa/Kendujhar.png"  alt="Kendujhar"
						  onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Kendujhar_.png")} 
						  onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Kendujhar.png")}/>
						<span className="kendujharText mapTextLabel text-capitalize">Kendujhar</span>
						<span className="kendujharNumber mapCountLabel text-center">{this.state.Kendujhar ? this.state.Kendujhar : 0}</span>
					</div>
					<div className="sundararh classHover" onClick={e => this.onDistrictClick("Sundararh","OD")}> 
						<img src="/Maps/Orissa/Sundararh.png"  alt="Sundararh" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Sundararh_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Sundararh.png")}/>
						<span className="sundararhText mapTextLabel text-capitalize">Sundararh</span>
						<span className="sundararhNumber mapCountLabel text-center">{this.state.Sundararh ? this.state.Sundararh : 0}</span>
					</div>
					<div className="mayurbhanj classHover" onClick={e => this.onDistrictClick("Mayurbhanj","OD")}> 
						<img src="/Maps/Orissa/Mayurbhanj.png" alt="Mayurbhanj"
						  onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Mayurbhanj_.png")}
						   onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Mayurbhanj.png")}/>
						<span className="mayurbhanjText mapTextLabel text-capitalize">Mayurbhanj</span>
						<span className="mayurbhanjNumber mapCountLabel text-center">{this.state.Mayurbhanj ? this.state.Mayurbhanj : 0}</span>
					</div>
					<div className="baleswar classHover" onClick={e => this.onDistrictClick("Baleswar","OD")}> 
						<img src="/Maps/Orissa/Baleswar.png"  alt="Baleswar" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Baleswar_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Baleswar.png")}/>
						<span className="baleswarText mapTextLabel text-capitalize">Baleswar</span>
						<span className="baleswarNumber mapCountLabel text-center">{this.state.Baleswar ? this.state.Baleswar : 0}</span>
					</div>
					<div className="bhadrak classHover" onClick={e => this.onDistrictClick("Bhadrak","OD")}> 
						<img src="/Maps/Orissa/Bhadrak.png"  alt="Bhadrak" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Orissa/Bhadrak_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Orissa/Bhadrak.png")}/>
						<span className="bhadrakText mapTextLabel text-capitalize">Bhadrak</span>
						<span className="bhadrakNumber mapCountLabel text-center">{this.state.Bhadrak ? this.state.Bhadrak : 0}</span>
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

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Orissa));
