import React, {Component}     from 'react';
import Axios 				  from 'axios';
import Swal 				  from 'sweetalert2';
import {Redirect}             from 'react-router-dom';
import { withRouter }         from 'react-router-dom';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../common/actions/index';
import './Sikkim.css';
import '../global.css';

class Sikkim extends Component{
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
		console.log("Sikkim...............................");
		return(
			<div className="bodyWrapper">
				<div className="stateWrapper">

					<div className="north_sikkim classHover" onClick={e => this.onDistrictClick("North Sikkim","SK")}> 
						<img src="/Maps/Sikkim/North_Sikkim.png" alt="North_Sikkim" onMouseOver={e => (e.currentTarget.src = "/Maps/Sikkim/North_Sikkim_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Sikkim/North_Sikkim.png")}/>
						<span className="north_sikkimText mapTextLabel text-capitalize">North Sikkim</span>
						<span className="north_sikkimNumber mapCountLabel text-center">{this.state.North_Sikkim ? this.state.North_Sikkim : 0}</span>
					</div>

					<div className="west_sikkim classHover" onClick={e => this.onDistrictClick("West Sikkim","SK")}> 
						<img src="/Maps/Sikkim/West_Sikkim.png" alt="West_Sikkim" onMouseOver={e => (e.currentTarget.src = "/Maps/Sikkim/West_Sikkim_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Sikkim/West_Sikkim.png")}/>
						<span className="west_sikkimText mapTextLabel text-capitalize">West Sikkim</span>
						<span className="west_sikkimNumber mapCountLabel text-center">{this.state.West_Sikkim ? this.state.West_Sikkim : 0}</span>
					</div>


					<div className="east_sikkim classHover" onClick={e => this.onDistrictClick("East Sikkim","SK")}> 
						<img src="/Maps/Sikkim/East_Sikkim.png" alt="East_Sikkim" onMouseOver={e => (e.currentTarget.src = "/Maps/Sikkim/East_Sikkim_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Sikkim/East_Sikkim.png")}/>
						<span className="east_sikkimText mapTextLabel text-capitalize">East Sikkim</span>
						<span className="east_sikkimNumber mapCountLabel text-center">{this.state.East_Sikkim ? this.state.East_Sikkim : 0}</span>
					</div>

					<div className="south_sikkim classHover" onClick={e => this.onDistrictClick("South Sikkim","SK")}> 
						<img src="/Maps/Sikkim/South_Sikkim.png" alt="South_Sikkim" onMouseOver={e => (e.currentTarget.src = "/Maps/Sikkim/South_Sikkim_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Sikkim/South_Sikkim.png")}/>
						<span className="south_sikkimText mapTextLabel text-capitalize">South Sikkim</span>
						<span className="south_sikkimNumber mapCountLabel text-center">{this.state.South_Sikkim ? this.state.South_Sikkim : 0}</span>
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

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Sikkim));
