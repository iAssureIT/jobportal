import React, {Component}     from 'react';
import Axios 				  from 'axios';
import Swal 				  from 'sweetalert2';
import {Redirect}             from 'react-router-dom';
import { withRouter }         from 'react-router-dom';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../common/actions/index';
import './Ladakh.css';
import '../global.css';


class Ladakh extends Component{
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

		this.props.history.push("/state/"+stateCode+"/"+district);


	}
	render(){
		return(
			<div className="bodyWrapper">
				<div className="stateWrapper">
					<div className="Ladakh classHover" onClick={e => this.onDistrictClick("Ladakh","LA")}> 
						<img src="/Maps/Jammu_Kashmir___Ladakh/Ladakh.png" alt="Ladakh" onMouseOver={e => (e.currentTarget.src = "/Maps/Jammu_Kashmir___Ladakh/Ladakh_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Jammu_Kashmir___Ladakh/Ladakh.png")}/>
						<span className="LadakhText mapTextLabel text-capitalize">Ladakh</span> 
						<span className="LadakhNumber mapCountLabel text-center">{this.state.Ladakh ? this.state.Ladakh : 0}</span>
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

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Ladakh));