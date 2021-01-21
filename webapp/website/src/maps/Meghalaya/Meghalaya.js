import React, {Component}     from 'react';
import Axios 				  from 'axios';
import Swal 				  from 'sweetalert2';
import {Redirect}             from 'react-router-dom';
import { withRouter }         from 'react-router-dom';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../common/actions/index';
import './Meghalaya.css';
import '../global.css';


class Meghalaya extends Component{
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
					
					<div className="westGaroHills classHover"> 
						<img src="/Maps/Meghalaya/West_Garo_Hills.png" alt="West_Garo_Hills"
						  onMouseOver={e => (e.currentTarget.src = "/Maps/Meghalaya/West_Garo_Hills_.png")} 
						  onMouseOut={e => (e.currentTarget.src = "/Maps/Meghalaya/West_Garo_Hills.png")}/>
						<span className="westGaroHillsText mapTextLabel text-capitalize">West_Garo_Hills</span>
						<span className="westGaroHillsNumber mapCountLabel text-center">{this.state.West_Garo_Hills ? this.state.West_Garo_Hills : 0}</span>
					</div>
					<div className="southWestGaroHills classHover"> 
						<img src="/Maps/Meghalaya/South_West_Garo_Hills.png" alt="South_West_Garo_Hills"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Meghalaya/South_West_Garo_Hills_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Meghalaya/South_West_Garo_Hills.png")}/>
						<span className="southWestGaroHillsText mapTextLabel text-capitalize">South_West_Garo_Hills</span>
						<span className="southWestGaroHillsNumber mapCountLabel text-center">{this.state.South_West_Garo_Hills ? this.state.South_West_Garo_Hills : 0}</span>
					</div>
					<div className="southGaroHills classHover"> 
						<img src="/Maps/Meghalaya/South_Garo_Hills.png"  alt="South_Garo_Hills"
						  onMouseOver={e => (e.currentTarget.src = "/Maps/Meghalaya/South_Garo_Hills_.png")} 
						  onMouseOut={e => (e.currentTarget.src = "/Maps/Meghalaya/South_Garo_Hills.png")}/>
						<span className="southGaroHillsText mapTextLabel text-capitalize">South_Garo_Hills</span>
						<span className="southGaroHillsNumber mapCountLabel text-center">{this.state.South_Garo_Hills ? this.state.South_Garo_Hills : 0}</span>
					</div>
					<div className="eastGaroHills classHover"> 
						<img src="/Maps/Meghalaya/East_Garo_Hills.png"  alt="East_Garo_Hills"
						  onMouseOver={e => (e.currentTarget.src = "/Maps/Meghalaya/East_Garo_Hills_.png")} 
						  onMouseOut={e => (e.currentTarget.src = "/Maps/Meghalaya/East_Garo_Hills.png")}/>
						<span className="eastGaroHillsText mapTextLabel text-capitalize">East_Garo_Hills</span>
						<span className="eastGaroHillsNumber mapCountLabel text-center">{this.state.East_Garo_Hills ? this.state.East_Garo_Hills : 0}</span>
					</div>
					<div className="northGaroHills classHover"> 
						<img src="/Maps/Meghalaya/North_Garo_Hills.png" alt="North_Garo_Hills" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Meghalaya/North_Garo_Hills_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Meghalaya/North_Garo_Hills.png")}/>
						<span className="northGaroHillsText mapTextLabel text-capitalize">North_Garo_Hills</span>
						<span className="northGaroHillsNumber mapCountLabel text-center">{this.state.North_Garo_Hills ? this.state.North_Garo_Hills : 0}</span>
					</div>
					<div className="westKhasiHills classHover"> 
						<img src="/Maps/Meghalaya/West_Khasi_Hills.png" alt="West_Khasi_Hills"
						  onMouseOver={e => (e.currentTarget.src = "/Maps/Meghalaya/West_Khasi_Hills_.png")} 
						  onMouseOut={e => (e.currentTarget.src = "/Maps/Meghalaya/West_Khasi_Hills.png")}/>
						<span className="westKhasiHillsText mapTextLabel text-capitalize">West_Khasi_Hills</span>
						<span className="westKhasiHillsNumber mapCountLabel text-center">{this.state.West_Khasi_Hills ? this.state.West_Khasi_Hills : 0}</span>
					</div>
					<div className="southWestKhasiHills classHover"> 
						<img src="/Maps/Meghalaya/South_West_Khasi_Hills.png"  alt="South_West_Khasi_Hills" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Meghalaya/South_West_Khasi_Hills_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Meghalaya/South_West_Khasi_Hills.png")}/>
						<span className="southWestKhasiHillsText mapTextLabel text-capitalize">South_West_Khasi_Hills</span>
						<span className="southWestKhasiHillsNumber mapCountLabel text-center">{this.state.South_West_Khasi_Hills ? this.state.South_West_Khasi_Hills : 0}</span>
					</div>
					<div className="eastKhasiHills classHover"> 
						<img src="/Maps/Meghalaya/East_Khasi_Hills.png" alt="East_Khasi_Hills"
						  onMouseOver={e => (e.currentTarget.src = "/Maps/Meghalaya/East_Khasi_Hills_.png")}
						  onMouseOut={e => (e.currentTarget.src = "/Maps/Meghalaya/East_Khasi_Hills.png")}/>
						<span className="eastKhasiHillsText mapTextLabel text-capitalize">East_Khasi_Hills</span>
						<span className="eastKhasiHillsNumber mapCountLabel text-center">{this.state.East_Khasi_Hills ? this.state.East_Khasi_Hills : 0}</span>
					</div>
					<div className="riBhoi classHover"> 
						<img src="/Maps/Meghalaya/Ri_Bhol.png" alt="Ri_Bhoi" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Meghalaya/Ri_Bhol_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Meghalaya/Ri_Bhol.png")}/>
						<span className="riBhoiText mapTextLabel text-capitalize">Ri_Bhoi</span>
						<span className="riBhoiNumber mapCountLabel text-center">{this.state.Ri_Bhoi ? this.state.Ri_Bhoi : 0}</span>
					</div>
					<div className="westJaintiaHills classHover"> 
						<img src="/Maps/Meghalaya/West_Jaintia_Hills.png"  alt="West_Jaintia_Hills"
						  onMouseOver={e => (e.currentTarget.src = "/Maps/Meghalaya/West_Jaintia_Hills_.png")} 
						  onMouseOut={e => (e.currentTarget.src = "/Maps/Meghalaya/West_Jaintia_Hills.png")}/>
						<span className="westJaintiaHillsText mapTextLabel text-capitalize">West_Jaintia_Hills</span>
						<span className="westJaintiaHillsNumber mapCountLabel text-center">{this.state.West_Jaintia_Hills ? this.state.West_Jaintia_Hills : 0}</span>
					</div>
					<div className="eastJaintiaHills classHover"> 
						<img src="/Maps/Meghalaya/East_Jaintia_Hills.png"  alt="East_Jaintia_Hills"
						  onMouseOver={e => (e.currentTarget.src = "/Maps/Meghalaya/East_Jaintia_Hills_.png")} 
						  onMouseOut={e => (e.currentTarget.src = "/Maps/Meghalaya/East_Jaintia_Hills.png")}/>
						<span className="eastJaintiaHillsText mapTextLabel text-capitalize">East_Jaintia_Hills</span>
						<span className="eastJaintiaHillsNumber mapCountLabel text-center">{this.state.East_Jaintia_Hills ? this.state.East_Jaintia_Hills : 0}</span>
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

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Meghalaya));
