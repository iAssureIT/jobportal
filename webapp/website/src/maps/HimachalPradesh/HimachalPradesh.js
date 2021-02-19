import React, {Component}     from 'react';
import Axios 				  from 'axios';
import Swal 				  from 'sweetalert2';
import {Redirect}             from 'react-router-dom';
import { withRouter }         from 'react-router-dom';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../common/actions/index';
import './HimachalPradesh.css';
import '../global.css';


class HimachalPradesh extends Component{

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
					<div className="kangra classHover" onClick={e => this.onDistrictClick("Kangra","HP")}> 
						<img src="/Maps/Himachal_Pradesh/Kangra.png"  alt="Kangra" onMouseOver={e => (e.currentTarget.src = "/Maps/Himachal_Pradesh/Kangra_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Himachal_Pradesh/Kangra.png")}/>
						<span className="kangraText mapTextLabel text-capitalize">Kangra</span>
						<span className="kangraNumber mapCountLabel text-center">{this.state.Kangra ? this.state.Kangra : 0}</span>

					</div>
					<div className="chamba" onClick={e => this.onDistrictClick("Chamba","HP")}> 
						<img src="/Maps/Himachal_Pradesh/Chamba.png" alt="Chamba" onMouseOver={e => (e.currentTarget.src = "/Maps/Himachal_Pradesh/Chamba_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Himachal_Pradesh/Chamba.png")}/>
						<span className="chambaText mapTextLabel text-capitalize">Chamba</span>
						<span className="chambaNumber mapCountLabel text-center">{this.state.Chamba ? this.state.Chamba : 0}</span>
					</div>
					<div className="keylong classHover" onClick={e => this.onDistrictClick("Keylong","HP")}> 
						<img src="/Maps/Himachal_Pradesh/Keylong.png" alt="Keylong" onMouseOver={e => (e.currentTarget.src = "/Maps/Himachal_Pradesh/Keylong_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Himachal_Pradesh/Keylong.png")}/>
						<span className="keylongText mapTextLabel text-capitalize">Keylong</span>
						<span className="keylongNumber mapCountLabel text-center">{this.state.Keylong ? this.state.Keylong : 0}</span>
					</div>
					<div className="kullu classHover" onClick={e => this.onDistrictClick("Kullu","HP")}> 
						<img src="/Maps/Himachal_Pradesh/Kullu.png" alt="Kullu" onMouseOver={e => (e.currentTarget.src = "/Maps/Himachal_Pradesh/Kullu_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Himachal_Pradesh/Kullu.png")}/>
						<span className="kulluText mapTextLabel text-capitalize">Kullu</span>
						<span className="kulluNumber mapCountLabel text-center">{this.state.Kullu ? this.state.Kullu : 0}</span>
					</div>
					<div className="mandi classHover" onClick={e => this.onDistrictClick("Mandi","HP")}> 
						<img src="/Maps/Himachal_Pradesh/Mandi.png" alt="Mandi" onMouseOver={e => (e.currentTarget.src = "/Maps/Himachal_Pradesh/Mandi_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Himachal_Pradesh/Mandi.png")}/>
						<span className="mandiText mapTextLabel text-capitalize">Mandi</span>
						<span className="mandiNumber mapCountLabel text-center">{this.state.Mandi ? this.state.Mandi : 0}</span>
					</div>
					<div className="Hamirpur classHover" onClick={e => this.onDistrictClick("Hamirpur","HP")}> 
						<img src="/Maps/Himachal_Pradesh/Hamirpur.png" alt="Hamirpur" onMouseOver={e => (e.currentTarget.src = "/Maps/Himachal_Pradesh/Hamirpur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Himachal_Pradesh/Hamirpur.png")}/>
						<span className="HamirpurText mapTextLabel text-capitalize">Hamirpur</span>
						<span className="HamirpurNumber mapCountLabel text-center">{this.state.Hamirpur ? this.state.Hamirpur : 0}</span>
					</div>
					<div className="una classHover" onClick={e => this.onDistrictClick("Una","HP")}> 
						<img src="/Maps/Himachal_Pradesh/UNA.png" alt="UNA" onMouseOver={e => (e.currentTarget.src = "/Maps/Himachal_Pradesh/UNA_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Himachal_Pradesh/UNA.png")}/>
						<span className="unaText mapTextLabel text-capitalize">Una</span>
						<span className="unaNumber mapCountLabel text-center">{this.state.Una ? this.state.Una : 0}</span>
					</div>
					<div className="Bilaspur classHover" onClick={e => this.onDistrictClick("Bilaspur","HP")}> 
						<img src="/Maps/Himachal_Pradesh/Bilaspur.png" alt="Bilaspur" onMouseOver={e => (e.currentTarget.src = "/Maps/Himachal_Pradesh/Bilaspur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Himachal_Pradesh/Bilaspur.png")}/>
						<span className="BilaspurText mapTextLabel text-capitalize">Bilaspur</span>
						<span className="BilaspurNumber mapCountLabel text-center">{this.state.Bilaspur ? this.state.Bilaspur : 0}</span>
					</div>
					<div className="solan classHover" onClick={e => this.onDistrictClick("Solan","HP")}> 
						<img src="/Maps/Himachal_Pradesh/Solan.png" alt="Solan" onMouseOver={e => (e.currentTarget.src = "/Maps/Himachal_Pradesh/Solan_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Himachal_Pradesh/Solan.png")}/>
						<span className="solanText mapTextLabel text-capitalize">Solan</span>
						<span className="solanNumber mapCountLabel text-center">{this.state.Solan ? this.state.Solan : 0}</span>
					</div>
					<div className="shimla classHover" onClick={e => this.onDistrictClick("Shimla","HP")}> 
						<img src="/Maps/Himachal_Pradesh/Shimla.png" alt="Shimla" onMouseOver={e => (e.currentTarget.src = "/Maps/Himachal_Pradesh/Shimla_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Himachal_Pradesh/Shimla.png")}/>
						<span className="shimlaText mapTextLabel text-capitalize">Shimla</span>
						<span className="shimlaNumber mapCountLabel text-center">{this.state.Shimla ? this.state.Shimla : 0}</span>
					</div>
					<div className="kinnaur classHover" onClick={e => this.onDistrictClick("Kinnaur","HP")}> 
						<img src="/Maps/Himachal_Pradesh/Kinnaur.png" alt="Kinnaur" onMouseOver={e => (e.currentTarget.src = "/Maps/Himachal_Pradesh/Kinnaur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Himachal_Pradesh/Kinnaur.png")}/>
						<span className="kinnaurText mapTextLabel text-capitalize">Kinnaur</span>
						<span className="kinnaurNumber mapCountLabel text-center">{this.state.Kinnaur ? this.state.Kinnaur : 0}</span>
					</div>
					<div className="sirmaur classHover" onClick={e => this.onDistrictClick("Sirmaur","HP")}> 
						<img src="/Maps/Himachal_Pradesh/Sirmaur.png"  alt="Sirmaur" onMouseOver={e => (e.currentTarget.src = "/Maps/Himachal_Pradesh/Sirmaur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Himachal_Pradesh/Sirmaur.png")}/>
						<span className="sirmaurText mapTextLabel text-capitalize">Sirmaur</span>
						<span className="sirmaurNumber mapCountLabel text-center">{this.state.Sirmaur ? this.state.Sirmaur : 0}</span>
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

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(HimachalPradesh));
