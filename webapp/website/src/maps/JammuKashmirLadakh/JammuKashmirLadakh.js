import React, {Component}     from 'react';
import Axios 				  from 'axios';
import Swal 				  from 'sweetalert2';
import {Redirect}             from 'react-router-dom';
import { withRouter }         from 'react-router-dom';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../common/actions/index';
import './JammuKashmirLadakh.css';
import '../global.css';


class JammuKashmirLadakh extends Component{


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
					<div className="jammuAndKashmir classHover" onClick={e => this.onDistrictClick("Jammu And Kashmir","JK")}> 
						<img src="/Maps/Jammu_Kashmir___Ladakh/Jammu_And_Kashmir.png" alt="Jammu_And_Kashmir" onMouseOver={e => (e.currentTarget.src = "/Maps/Jammu_Kashmir___Ladakh/Jammu_And_Kashmir_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Jammu_Kashmir___Ladakh/Jammu_And_Kashmir.png")}/>
						<span className="jammuAndKashmirText mapTextLabel text-capitalize">Jammu And Kashmir</span> 
						<span className="jammuAndKashmirNumber mapCountLabel text-center">{this.state.Jammu_And_Kashmir ? this.state.Jammu_And_Kashmir : 0}</span>
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

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(JammuKashmirLadakh));
