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
	onStateClick = (stateName) => {
		
	}

	render(){
		return(
			<div className="bodyWrapper">
				<div className="stateWrapper">
					<div className="jammuAndKashmir classHover"> 
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
