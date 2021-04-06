import React, {Component}     from 'react';
import Axios 				  from 'axios';
import Swal 				  from 'sweetalert2';
import {Redirect}             from 'react-router-dom';
import { withRouter }         from 'react-router-dom';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../common/actions/index';
import './Uttarakhand.css';
import '../global.css';


class Uttarakhand extends Component{
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
		console.log("Uttarakhand...............................");
		return(
			<div className="bodyWrapper">
				<div className="stateWrapper">

					<div className="uttarkashi classHover" onClick={e => this.onDistrictClick("Uttarkashi","UK")}> 
						<img src="/Maps/Uttarakhand/Uttarkashi.png" alt="Uttarkashi" onMouseOver={e => (e.currentTarget.src = "/Maps/Uttarakhand/Uttarkashi_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Uttarakhand/Uttarkashi.png")}/>
						<span className="uttarkashiText mapTextLabel text-capitalize">Uttarkashi</span>
						<span className="uttarkashiNumber mapCountLabel text-center">{this.state.Uttarkashi ? this.state.Uttarkashi : 0}</span>
					</div>

					<div className="dehradun classHover" onClick={e => this.onDistrictClick("Dehradun","UK")}>
						<img src="/Maps/Uttarakhand/Dehradun.png" alt="Dehradun" onMouseOver={e => (e.currentTarget.src = "/Maps/Uttarakhand/Dehradun_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Uttarakhand/Dehradun.png")}/>
						<span className="dehradunText mapTextLabel text-capitalize">Dehradun</span>
						<span className="dehradunNumber mapCountLabel text-center">{this.state.Dehradun ? this.state.Dehradun : 0}</span>
					</div>

					<div className="haridwar classHover" onClick={e => this.onDistrictClick("Haridwar","UK")}>
						<img src="/Maps/Uttarakhand/Haridwar.png" alt="Haridwar" onMouseOver={e => (e.currentTarget.src = "/Maps/Uttarakhand/Haridwar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Uttarakhand/Haridwar.png")}/>
						<span className="haridwarText mapTextLabel text-capitalize">Haridwar</span>
						<span className="haridwarNumber mapCountLabel text-center">{this.state.Haridwar ? this.state.Haridwar : 0}</span>
					</div>

					<div className="tehri_garhwal classHover" onClick={e => this.onDistrictClick("Tehri Garhwal","UK")}>
						<img src="/Maps/Uttarakhand/Tehri_Garhwal.png" alt="Tehri_Garhwal" onMouseOver={e => (e.currentTarget.src = "/Maps/Uttarakhand/Tehri_Garhwal_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Uttarakhand/Tehri_Garhwal.png")}/>
						<span className="tehri_garhwalText mapTextLabel text-capitalize">Tehri Garhwal</span>
						<span className="tehri_garhwalNumber mapCountLabel text-center">{this.state.Tehri_Garhwal ? this.state.Tehri_Garhwal : 0}</span>
					</div>

					<div className="rudraprayag classHover" onClick={e => this.onDistrictClick("Rudra Prayag","UK")}>
						<img src="/Maps/Uttarakhand/Rudraprayag.png" alt="Rudraprayag" onMouseOver={e => (e.currentTarget.src = "/Maps/Uttarakhand/Rudraprayag_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Uttarakhand/Rudraprayag.png")}/>
						<span className="rudraprayagText mapTextLabel text-capitalize">Rudra Prayag</span>
						<span className="rudraprayagNumber mapCountLabel text-center">{this.state.Rudraprayag ? this.state.Rudraprayag : 0}</span>
					</div>

					<div className="chamoli classHover" onClick={e => this.onDistrictClick("Chamoli","UK")}> 
						<img src="/Maps/Uttarakhand/Chamoli.png" alt="Chamoli" onMouseOver={e => (e.currentTarget.src = "/Maps/Uttarakhand/Chamoli_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Uttarakhand/Chamoli.png")}/>
						<span className="chamoliText mapTextLabel text-capitalize">Chamoli</span>
						<span className="chamoliNumber mapCountLabel text-center">{this.state.Chamoli ? this.state.Chamoli : 0}</span>
					</div>

					<div className="pithoragarh classHover" onClick={e => this.onDistrictClick("Pithoragarh","UK")}>
						<img src="/Maps/Uttarakhand/Pithoragarh.png" alt="Pithoragarh" onMouseOver={e => (e.currentTarget.src = "/Maps/Uttarakhand/Pithoragarh_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Uttarakhand/Pithoragarh.png")}/>
						<span className="pithoragarhText mapTextLabel text-capitalize">Pithoragarh</span>
						<span className="pithoragarhNumber mapCountLabel text-center">{this.state.Pithoragarh ? this.state.Pithoragarh : 0}</span>
					</div>

					<div className="bageshwar classHover" onClick={e => this.onDistrictClick("Bageshwar","UK")}> 
						<img src="/Maps/Uttarakhand/Bageshwar.png" alt="Bageshwar" onMouseOver={e => (e.currentTarget.src = "/Maps/Uttarakhand/Bageshwar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Uttarakhand/Bageshwar.png")}/>
						<span className="bageshwarText mapTextLabel text-capitalize">Bageshwar</span>
						<span className="bageshwarNumber mapCountLabel text-center">{this.state.Bageshwar ? this.state.Bageshwar : 0}</span>
					</div>


					<div className="pauri_garhwal classHover" onClick={e => this.onDistrictClick("Pauri Garhwal","UK")}>
						<img src="/Maps/Uttarakhand/Pauri_Garhwal.png" alt="Pauri_Garhwal" onMouseOver={e => (e.currentTarget.src = "/Maps/Uttarakhand/Pauri_Garhwal_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Uttarakhand/Pauri_Garhwal.png")}/>
						<span className="pauri_garhwalText mapTextLabel text-capitalize">Pauri Garhwal</span>
						<span className="pauri_garhwalNumber mapCountLabel text-center">{this.state.Pauri_Garhwal ? this.state.Pauri_Garhwal : 0}</span>
					</div>

					<div className="almora classHover" onClick={e => this.onDistrictClick("Almora","UK")}>
						<img src="/Maps/Uttarakhand/Almora.png" alt="Almora" onMouseOver={e => (e.currentTarget.src = "/Maps/Uttarakhand/Almora_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Uttarakhand/Almora.png")}/>
						<span className="almoraText mapTextLabel text-capitalize">Almora</span>
						<span className="almoraNumber mapCountLabel text-center">{this.state.Almora ? this.state.Almora : 0}</span>
					</div>

					<div className="nainital classHover" onClick={e => this.onDistrictClick("Nainital","UK")}>
						<img src="/Maps/Uttarakhand/Nainital.png" alt="Nainital" onMouseOver={e => (e.currentTarget.src = "/Maps/Uttarakhand/Nainital_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Uttarakhand/Nainital.png")}/>
						<span className="nainitalText mapTextLabel text-capitalize">Nainital</span>
						<span className="nainitalNumber mapCountLabel text-center">{this.state.Nainital ? this.state.Nainital : 0}</span>
					</div>

					<div className="champawat classHover" onClick={e => this.onDistrictClick("Champawat","UK")}> 
						<img src="/Maps/Uttarakhand/Champawat.png" alt="Champawat" onMouseOver={e => (e.currentTarget.src = "/Maps/Uttarakhand/Champawat_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Uttarakhand/Champawat.png")}/>
						<span className="champawatText mapTextLabel text-capitalize">Champawat</span>
						<span className="champawatNumber mapCountLabel text-center">{this.state.Champawat ? this.state.Champawat : 0}</span>
					</div>

					<div className="udham_singh_nagar classHover" onClick={e => this.onDistrictClick("Udham Singh Nagar","UK")}>
						<img src="/Maps/Uttarakhand/Udham_Singh_Nagar.png" alt="Udham_Singh_Nagar" onMouseOver={e => (e.currentTarget.src = "/Maps/Uttarakhand/Udham_Singh_Nagar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Uttarakhand/Udham_Singh_Nagar.png")}/>
						<span className="udham_singh_nagarText mapTextLabel text-capitalize">Udham Singh Nagar</span>
						<span className="udham_singh_nagarNumber mapCountLabel text-center">{this.state.Udham_Singh_Nagar ? this.state.Udham_Singh_Nagar : 0}</span>
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

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Uttarakhand));
