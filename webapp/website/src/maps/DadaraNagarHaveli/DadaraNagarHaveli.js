import React, {Component}     from 'react';
import Axios 				  from 'axios';
import Swal 				  from 'sweetalert2';
import {Redirect}             from 'react-router-dom';
import { withRouter }         from 'react-router-dom';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../common/actions/index';
import './DadaraNagarHaveli.css';
import '../global.css';


class DadaraNagarHaveli extends Component{
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
					<div className="DadaraNagarHaveli classHover" onClick={e => this.onDistrictClick("DadaraNagarHaveli","DD")}> 
						<img src="/Maps/DadaraNagarHaveli/DadaraNagarHaveli.png" alt="DadaraNagarHaveli" onMouseOver={e => (e.currentTarget.src = "/Maps/DadaraNagarHaveli/DadaraNagarHaveli_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/DadaraNagarHaveli/DadaraNagarHaveli.png")}/>
						<span className="DadaraNagarHaveliText mapTextLabel text-capitalize">DadaraNagarHaveli</span> 
						<span className="DadaraNagarHaveliNumber mapCountLabel text-center">{this.state.DadaraNagarHaveli ? this.state.DadaraNagarHaveli : 0}</span>
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

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(DadaraNagarHaveli));