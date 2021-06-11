import React, {Component} from 'react';
import Axios 				  from 'axios';
import Swal 				  from 'sweetalert2';
import {Redirect}             from 'react-router-dom';
import { withRouter }         from 'react-router-dom';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../common/actions/index';
import './Goa.css';
import '../global.css';


class Goa extends Component{
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
				<div className="stateWrapper">
					<div className="pernem classHover" onClick={e => this.onDistrictClick("Pernem","GA")}> 
						<img src="/Maps/Goa/Pernem.png"  alt="Pernem" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Goa/Pernem_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Goa/Pernem.png")}/>
						<span className="pernemText mapTextLabel text-capitalize">Pernem</span>
						<span className="pernemNumber mapCountLabel text-center">{this.state.Pernem ? this.state.Pernem : 0}</span>
					</div>
					<div className="mapusa classHover" onClick={e => this.onDistrictClick("Mapusa","GA")}> 
						<img src="/Maps/Goa/Mapusa.png"  alt="Mapusa" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Goa/Mapusa_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Goa/Mapusa.png")}/>
						<span className="mapusaText mapTextLabel text-capitalize">Mapusa</span>
						<span className="mapusaNumber mapCountLabel text-center">{this.state.Mapusa ? this.state.Mapusa : 0}</span>
					</div>
					<div className="bicholim classHover" onClick={e => this.onDistrictClick("Bicholim","GA")}> 
						<img src="/Maps/Goa/Bicholim.png"  alt="Bicholim"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Goa/Bicholim_.png")}
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Goa/Bicholim.png")}/>
						<span className="bicholimText mapTextLabel text-capitalize">Bicholim</span>
						<span className="bicholimNumber mapCountLabel text-center">{this.state.Bicholim ? this.state.Bicholim : 0}</span>
					</div>
					<div className="satari classHover" onClick={e => this.onDistrictClick("Satari","GA")}> 
						<img src="/Maps/Goa/Satari.png"  alt="Satari"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Goa/Satari_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Goa/Satari.png")}/>
						<span className="satariText mapTextLabel text-capitalize">Satari</span>
						<span className="satariNumber mapCountLabel text-center">{this.state.Satari ? this.state.Satari : 0}</span>
					</div>
					<div className="ponda classHover" onClick={e => this.onDistrictClick("Ponda","GA")}> 
						<img src="/Maps/Goa/Ponda.png"  alt="Ponda"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Goa/Ponda_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Goa/Ponda.png")}/>
						<span className="pondaText mapTextLabel text-capitalize">Ponda</span>
						<span className="pondaNumber mapCountLabel text-center">{this.state.Ponda ? this.state.Ponda : 0}</span>
					</div>
					<div className="panjim classHover" onClick={e => this.onDistrictClick("Panjim","GA")}> 
						<img src="/Maps/Goa/Panjim.png"  alt="Panjim" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Goa/Panjim_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Goa/Panjim.png")}/>
						<span className="panjimText mapTextLabel text-capitalize">Panjim</span>
						<span className="panjimNumber mapCountLabel text-center">{this.state.Panjim ? this.state.Panjim : 0}</span>
					</div>
					<div className="sanguem classHover" onClick={e => this.onDistrictClick("Sanguem","GA")}> 
						<img src="/Maps/Goa/Sanguem.png"  alt="Sanguem"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Goa/Sanguem_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Goa/Sanguem.png")}/>
						<span className="sanguemText mapTextLabel text-capitalize">Sanguem</span>
						<span className="sanguemNumber mapCountLabel text-center">{this.state.Sanguem ? this.state.Sanguem : 0}</span>
					</div>
					<div className="quepem classHover" onClick={e => this.onDistrictClick("Quepem","GA")}> 
						<img src="/Maps/Goa/Quepem.png"  alt="Quepem"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Goa/Quepem_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Goa/Quepem.png")}/>
						<span className="quepemText mapTextLabel text-capitalize">Quepem</span>
						<span className="quepemNumber mapCountLabel text-center">{this.state.Quepem ? this.state.Quepem : 0}</span>
					</div>
					<div className="canacona classHover" onClick={e => this.onDistrictClick("Canacona","GA")}> 
						<img src="/Maps/Goa/Canacona.png"  alt="Canacona"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Goa/Canacona_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Goa/Canacona.png")}/>
						<span className="canaconaText mapTextLabel text-capitalize">Canacona</span>
						<span className="canaconaNumber mapCountLabel text-center">{this.state.Canacona ? this.state.Canacona : 0}</span>
					</div>
					<div className="salcette classHover" onClick={e => this.onDistrictClick("Salcette","GA")}> 
						<img src="/Maps/Goa/Salcette.png"  alt="Salcette"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Goa/Salcette_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Goa/Salcette.png")}/>
						<span className="salcetteText mapTextLabel text-capitalize">Salcette</span>
						<span className="salcetteNumber mapCountLabel text-center">{this.state.Salcette ? this.state.Salcette : 0}</span>
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

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Goa));
