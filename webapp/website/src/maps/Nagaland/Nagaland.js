import React, {Component}     from 'react';
import Axios 				  from 'axios';
import Swal 				  from 'sweetalert2';
import {Redirect}             from 'react-router-dom';
import { withRouter }         from 'react-router-dom';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../common/actions/index';
import './Nagaland.css';
import '../global.css';

class Nagaland extends Component{
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
					<div className="peren classHover"> 
						<img src="/Maps/Nagaland/Peren.png"  alt="Peren" onMouseOver={e => (e.currentTarget.src = "/Maps/Nagaland/Peren_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Nagaland/Peren.png")}/>
						<span className="perenText mapTextLabel text-capitalize">Peren</span>
						<span className="perenNumber mapCountLabel text-center">{this.state.Peren ? this.state.Peren : 0}</span>
					</div>
					<div className="dimapur classHover"> 
						<img src="/Maps/Nagaland/Dimapur.png"  alt="Dimapur"  onMouseOver={e => (e.currentTarget.src = "/Maps/Nagaland/Dimapur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Nagaland/Dimapur.png")}/>
						<span className="dimapurText mapTextLabel text-capitalize">Dimapur</span>
						<span className="dimapurNumber mapCountLabel text-center">{this.state.Dimapur ? this.state.Dimapur : 0}</span>
					</div>
					<div className="kohima classHover"> 
						<img src="/Maps/Nagaland/Kohima.png"  alt="Kohima"  onMouseOver={e => (e.currentTarget.src = "/Maps/Nagaland/Kohima_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Nagaland/Kohima.png")}/>
						<span className="kohimaText mapTextLabel text-capitalize">Kohima</span>
						<span className="kohimaNumber mapCountLabel text-center">{this.state.Kohima ? this.state.Kohima : 0}</span>
					</div>
					<div className="phek classHover"> 
						<img src="/Maps/Nagaland/Phek.png"  alt="Phek"  onMouseOver={e => (e.currentTarget.src = "/Maps/Nagaland/Phek_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Nagaland/Phek.png")}/>
						<span className="phekText mapTextLabel text-capitalize">Phek</span>
						<span className="phekNumber mapCountLabel text-center">{this.state.Phek ? this.state.Phek : 0}</span>
					</div>
					<div className="kiphireSadar classHover"> 
						<img src="/Maps/Nagaland/Kiphire_Sadar.png"  alt="Kiphire_Sadar"  onMouseOver={e => (e.currentTarget.src = "/Maps/Nagaland/Kiphire_Sadar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Nagaland/Kiphire_Sadar.png")}/>
						<span className="kiphireSadarText mapTextLabel text-capitalize">Kiphire_Sadar</span>
						<span className="kiphireSadarNumber mapCountLabel text-center">{this.state.Kiphire_Sadar ? this.state.Kiphire_Sadar : 0}</span>
					</div>
					<div className="zunhebotoSadar classHover"> 
						<img src="/Maps/Nagaland/Zunheboto_Sadar.png"  alt="Zunheboto_Sadar"  onMouseOver={e => (e.currentTarget.src = "/Maps/Nagaland/Zunheboto_Sadar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Nagaland/Zunheboto_Sadar.png")}/>
						<span className="zunhebotoSadarText mapTextLabel text-capitalize">Zunheboto_Sadar</span>
						<span className="zunhebotoSadarNumber mapCountLabel text-center">{this.state.Zunheboto_Sadar ? this.state.Zunheboto_Sadar : 0}</span>
					</div>
					<div className="wokhaSadar classHover"> 
						<img src="/Maps/Nagaland/Wokha_Sadar.png" alt="Wokha_Sadar"  onMouseOver={e => (e.currentTarget.src = "/Maps/Nagaland/Wokha_Sadar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Nagaland/Wokha_Sadar.png")}/>
						<span className="wokhaSadarText mapTextLabel text-capitalize">Wokha_Sadar</span>
						<span className="wokhaSadarNumber mapCountLabel text-center">{this.state.Wokha_Sadar ? this.state.Wokha_Sadar : 0}</span>
					</div>
					<div className="tuensangSadar classHover"> 
						<img src="/Maps/Nagaland/Tuensang_Sadar.png"  alt="Tuensang_Sadar"  onMouseOver={e => (e.currentTarget.src = "/Maps/Nagaland/Tuensang_Sadar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Nagaland/Tuensang_Sadar.png")}/>
						<span className="tuensangSadarText mapTextLabel text-capitalize">Tuensang_Sadar</span>
						<span className="tuensangSadarNumber mapCountLabel text-center">{this.state.Tuensang_Sadar ? this.state.Tuensang_Sadar : 0}</span>
					</div>
					<div className="mokochung classHover"> 
						<img src="/Maps/Nagaland/Mokochung.png" alt="Mokochung" onMouseOver={e => (e.currentTarget.src = "/Maps/Nagaland/Mokochung_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Nagaland/Mokochung.png")}/>
						<span className="mokochungText mapTextLabel text-capitalize">Mokochung</span>
						<span className="mokochungNumber mapCountLabel text-center">{this.state.Mokochung ? this.state.Mokochung : 0}</span>
					</div>
					<div className="longleng classHover"> 
						<img src="/Maps/Nagaland/Longleng.png" alt="Longleng"  onMouseOver={e => (e.currentTarget.src = "/Maps/Nagaland/Longleng_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Nagaland/Longleng.png")}/>
						<span className="longlengText mapTextLabel text-capitalize">Longleng</span>
						<span className="longlengNumber mapCountLabel text-center">{this.state.Longleng ? this.state.Longleng : 0}</span>
					</div>
					<div className="mon classHover"> 
						<img src="/Maps/Nagaland/Mon.png"  alt="Mon"  onMouseOver={e => (e.currentTarget.src = "/Maps/Nagaland/Mon_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Nagaland/Mon.png")}/>
						<span className="monText mapTextLabel text-capitalize">Mon</span>
						<span className="monNumber mapCountLabel text-center">{this.state.Mon ? this.state.Mon : 0}</span>
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

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Nagaland));