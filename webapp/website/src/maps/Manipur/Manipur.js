import React, {Component}     from 'react';
import Axios 				  from 'axios';
import Swal 				  from 'sweetalert2';
import {Redirect}             from 'react-router-dom';
import { withRouter }         from 'react-router-dom';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../common/actions/index';
import './Manipur.css';
import '../global.css';


class Manipur extends Component{
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
					<div className="pherzawl classHover" onClick={e => this.onDistrictClick("Pherzawl","MN")}> 
						<img src="/Maps/Manipur/Pherzawl.png"  alt="Pherzawl"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Manipur/Pherzawl_.png")}
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Manipur/Pherzawl.png")}/>
						<span className="pherzawlText mapTextLabel text-capitalize">Pherzawl</span>
						<span className="pherzawlNumber mapCountLabel text-center">{this.state.Pherzawl ? this.state.Pherzawl : 0}</span>
					</div>
					<div className="churachandpur classHover" onClick={e => this.onDistrictClick("Churachandpur","MN")}> 
						<img src="/Maps/Manipur/Churachandpur.png" alt="Churachandpur" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Manipur/Churachandpur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Manipur/Churachandpur.png")}/>
						<span className="churachandpurText mapTextLabel text-capitalize">Churachandpur</span>
						<span className="churachandpurNumber mapCountLabel text-center">{this.state.Churachandpur ? this.state.Churachandpur : 0}</span>
					</div>
					<div className="chandel classHover" onClick={e => this.onDistrictClick("Chandel","MN")}> 
						<img src="/Maps/Manipur/Chandel.png"  alt="Chandel" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Manipur/Chandel_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Manipur/Chandel.png")}/>
						<span className="chandelText mapTextLabel text-capitalize">Chandel</span>
						<span className="chandelNumber mapCountLabel text-center">{this.state.Chandel ? this.state.Chandel : 0}</span>
					</div>
					<div className="tengnoupal classHover" onClick={e => this.onDistrictClick("Tengnoupal","MN")}> 
						<img src="/Maps/Manipur/Tengnoupal.png" alt="Tengnoupal" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Manipur/Tengnoupal_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Manipur/Tengnoupal.png")}/>
						<span className="tengnoupalText mapTextLabel text-capitalize">Tengnoupal</span>
						<span className="tengnoupalNumber mapCountLabel text-center">{this.state.Tengnoupal ? this.state.Tengnoupal : 0}</span>
					</div>
					<div className="kakching classHover" onClick={e => this.onDistrictClick("Kakching","MN")}> 
						<img src="/Maps/Manipur/Kakching.png" alt="Kakching" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Manipur/Kakching_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Manipur/Kakching.png")}/>
						<span className="kakchingText mapTextLabel text-capitalize">Kakching</span>
						<span className="kakchingNumber mapCountLabel text-center">{this.state.Kakching ? this.state.Kakching : 0}</span>
					</div>
					<div className="bishnupur classHover" onClick={e => this.onDistrictClick("Bishnupur","MN")}> 
						<img src="/Maps/Manipur/Bishnupur.png" alt="Bishnupur" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Manipur/Bishnupur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Manipur/Bishnupur.png")}/>
						<span className="bishnupurText mapTextLabel text-capitalize">Bishnupur</span>
						<span className="bishnupurNumber mapCountLabel text-center">{this.state.Bishnupur ? this.state.Bishnupur : 0}</span>
					</div>
					<div className="noney classHover" onClick={e => this.onDistrictClick("Noney","MN")}> 
						<img src="/Maps/Manipur/Noney.png" alt="Noney" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Manipur/Noney_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Manipur/Noney.png")}/>
						<span className="noneyText mapTextLabel text-capitalize">Noney</span>
						<span className="noneyNumber mapCountLabel text-center">{this.state.Noney ? this.state.Noney : 0}</span>
					</div>
					<div className="tamenglong classHover" onClick={e => this.onDistrictClick("Tamenglong","MN")}> 
						<img src="/Maps/Manipur/Tamenglong.png" alt="Tamenglong" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Manipur/Tamenglong_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Manipur/Tamenglong.png")}/>
						<span className="tamenglongText mapTextLabel text-capitalize">Tamenglong</span>
						<span className="tamenglongNumber mapCountLabel text-center">{this.state.Tamenglong ? this.state.Tamenglong : 0}</span>
					</div>
					<div className="senapati classHover" onClick={e => this.onDistrictClick("Senapati","MN")}> 
						<img src="/Maps/Manipur/Senapati.png" alt="Senapati" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Manipur/Senapati_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Manipur/Senapati.png")}/>
						<span className="senapatiText mapTextLabel text-capitalize">Senapati</span>
						<span className="senapatiNumber mapCountLabel text-center">{this.state.Senapati ? this.state.Senapati : 0}</span>
					</div>
					<div className="ukhrul classHover" onClick={e => this.onDistrictClick("Ukhrul","MN")}> 
						<img src="/Maps/Manipur/Ukhrul.png" alt="Ukhrul" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Manipur/Ukhrul_.png")}
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Manipur/Ukhrul.png")}/>
						<span className="ukhrulText mapTextLabel text-capitalize">Ukhrul</span>
						<span className="ukhrulNumber mapCountLabel text-center">{this.state.Ukhrul ? this.state.Ukhrul : 0}</span>
					</div>
					<div className="kangpokpi classHover" onClick={e => this.onDistrictClick("Kangpokpi","MN")}> 
						<img src="/Maps/Manipur/Kangpokpi.png" alt="Kangpokpi" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Manipur/Kangpokpi_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Manipur/Kangpokpi.png")}/>
						<span className="kangpokpiText mapTextLabel text-capitalize">Kangpokpi</span>
						<span className="kangpokpiNumber mapCountLabel text-center">{this.state.Kangpokpi ? this.state.Kangpokpi : 0}</span>
					</div>
					<div className="porompat classHover" onClick={e => this.onDistrictClick("Porompat","MN")}> 
						<img src="/Maps/Manipur/Porompat.png"  alt="Porompat" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Manipur/Porompat_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Manipur/Porompat.png")}/>
						<span className="porompatText mapTextLabel text-capitalize">Porompat</span>
						<span className="porompatNumber mapCountLabel text-center">{this.state.Porompat ? this.state.Porompat : 0}</span>
					</div>
					<div className="imphalWest classHover" onClick={e => this.onDistrictClick("Imphal West","MN")}> 
						<img src="/Maps/Manipur/Imphal_West.png"  alt="Imphal_West" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Manipur/Imphal_West_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Manipur/Imphal_West.png")}/>
						<span className="imphalWestText mapTextLabel text-capitalize">Imphal_West</span>
						<span className="imphalWestNumber mapCountLabel text-center">{this.state.Imphal_West ? this.state.Imphal_West : 0}</span>
					</div>
					<div className="thoubal classHover" onClick={e => this.onDistrictClick("Thoubal","MN")}> 
						<img src="/Maps/Manipur/Thoubal.png"  alt="Thoubal" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Manipur/Thoubal_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Manipur/Thoubal.png")}/>
						<span className="thoubalText mapTextLabel text-capitalize">Thoubal</span>
						<span className="thoubalNumber mapCountLabel text-center">{this.state.Thoubal ? this.state.Thoubal : 0}</span>
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

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Manipur));
