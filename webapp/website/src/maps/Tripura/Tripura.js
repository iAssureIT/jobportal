import React, {Component}     from 'react';
import Axios 				  from 'axios';
import Swal 				  from 'sweetalert2';
import {Redirect}             from 'react-router-dom';
import { withRouter }         from 'react-router-dom';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../common/actions/index';
import './Tripura.css';
import '../global.css';

class Tripura extends Component{
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

			<div className="bodyWrapper col-12">
				<div className="stateWrapper ">
					<div className="northTripura classHover" onClick={e => this.onDistrictClick("","TR")}> 
						<img src="/Maps/Tripura/North_Tripura.png"  alt="North_Tripura" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tripura/North_Tripura_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tripura/North_Tripura.png")}/>
						<span className="northTripuraText mapTextLabel text-capitalize">North_Tripura</span>
						<span className="northTripuraNumber mapCountLabel text-center">{this.state.North_Tripura ? this.state.North_Tripura : 0}</span>
					</div>
					<div className="unakoti classHover" onClick={e => this.onDistrictClick("Unakoti","TR")}> 
						<img src="/Maps/Tripura/Unakoti.png"  alt="Unakoti" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tripura/Unakoti_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tripura/Unakoti.png")}/>
						<span className="unakotiText mapTextLabel text-capitalize">Unakoti</span>
						<span className="unakotiNumber mapCountLabel text-center">{this.state.Unakoti ? this.state.Unakoti : 0}</span>
					</div>
					<div className="dhalai classHover" onClick={e => this.onDistrictClick("Dhalai","TR")}> 
						<img src="/Maps/Tripura/Dhalai.png"  alt="Dhalai" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tripura/Dhalai_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tripura/Dhalai.png")}/>
						<span className="dhalaiText mapTextLabel text-capitalize">Dhalai</span>
						<span className="dhalaiNumber mapCountLabel text-center">{this.state.Dhalai ? this.state.Dhalai : 0}</span>
					</div>
					<div className="khowai classHover" onClick={e => this.onDistrictClick("Khowai","TR")}> 
						<img src="/Maps/Tripura/Khowai.png"  alt="Khowai" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tripura/Khowai_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tripura/Khowai.png")}/>
						<span className="khowaiText mapTextLabel text-capitalize">Khowai</span>
						<span className="khowaiNumber mapCountLabel text-center">{this.state.Khowai ? this.state.Khowai : 0}</span>
					</div>
					<div className="westTripura classHover" onClick={e => this.onDistrictClick("West Tripura","TR")}> 
						<img src="/Maps/Tripura/West_Tripura.png"  alt="West_Tripura" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tripura/West_Tripura_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tripura/West_Tripura.png")}/>
						<span className="westTripuraText mapTextLabel text-capitalize">West_Tripura</span>
						<span className="westTripuraNumber mapCountLabel text-center">{this.state.West_Tripura ? this.state.West_Tripura : 0}</span>
					</div>
					<div className="gomati classHover" onClick={e => this.onDistrictClick("Gomati","TR")}> 
						<img src="/Maps/Tripura/Gomati.png"  alt="Gomati" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tripura/Gomati_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tripura/Gomati.png")}/>
						<span className="gomatiText mapTextLabel text-capitalize">Gomati</span>
						<span className="gomatiNumber mapCountLabel text-center">{this.state.Gomati ? this.state.Gomati : 0}</span>
					</div>
					<div className="sepahijala classHover" onClick={e => this.onDistrictClick("Sepahijala","TR")}> 
						<img src="/Maps/Tripura/Sepahijala.png"  alt="Sepahijala" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tripura/Sepahijala_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tripura/Sepahijala.png")}/>
						<span className="sepahijalaText mapTextLabel text-capitalize">Sepahijala</span>
						<span className="sepahijalaNumber mapCountLabel text-center">{this.state.Sepahijala ? this.state.Sepahijala : 0}</span>
					</div>
					<div className="southTripura classHover" onClick={e => this.onDistrictClick("South Tripura","TR")}> 
						<img src="/Maps/Tripura/South_Tripura.png"  alt="South_Tripura" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Tripura/South_Tripura_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Tripura/South_Tripura.png")}/>
						<span className="southTripuraText mapTextLabel text-capitalize">South_Tripura</span>
						<span className="southTripuraNumber mapCountLabel text-center">{this.state.South_Tripura ? this.state.South_Tripura : 0}</span>
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

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Tripura));
