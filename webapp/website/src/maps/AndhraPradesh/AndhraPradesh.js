import React, {Component} from 'react';
import Axios 				  from 'axios';
import Swal 				  from 'sweetalert2';
import {Redirect}             from 'react-router-dom';
import { withRouter }         from 'react-router-dom';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../common/actions/index';
import './andhraPradesh.css';
import '../global.css';


class AndhraPradesh extends Component{
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
					<div className="kurnool classHover"> 
						<img src="/Maps/Andhra_Pradesh/Kurnool.png"  alt="Kurnool"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Andhra_Pradesh/Kurnool_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Andhra_Pradesh/Kurnool.png")}/>
						<span className="kurnoolText mapTextLabel text-capitalize">Kurnool</span>
						<span className="kurnoolNumber mapCountLabel text-center">{this.state.Kurnool ? this.state.Kurnool : 0}</span>
					</div>
					<div className="anantapur classHover"> 
						<img src="/Maps/Andhra_Pradesh/Anantapur.png" alt="Anantapur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Andhra_Pradesh/Anantapur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Andhra_Pradesh/Anantapur.png")}/>
						<span className="anantapurText mapTextLabel text-capitalize">Anantapur</span>
						<span className="anantapurNumber mapCountLabel text-center">{this.state.Anantapur ? this.state.Anantapur : 0}</span>
					</div>
					<div className="ysr classHover"> 
						<img src="/Maps/Andhra_Pradesh/Y.S.R.png" alt="Y.S.R"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Andhra_Pradesh/Y.S.R._.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Andhra_Pradesh/Y.S.R.png")}/>
						<span className="ysrText mapTextLabel text-capitalize">Y.S.R.</span>
						<span className="ysrNumber mapCountLabel text-center">{this.state.YSR ? this.state.YSR : 0}</span>
					</div>
					<div className="chittoor classHover"> 
						<img src="/Maps/Andhra_Pradesh/Chittoor.png" alt="Chittoor"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Andhra_Pradesh/Chittoor_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Andhra_Pradesh/Chittoor.png")}/>
						<span className="chittoorText mapTextLabel text-capitalize">Chittoor</span>
						<span className="chittoorNumber mapCountLabel text-center">{this.state.Chittoor ? this.state.Chittoor : 0}</span>
					</div>
					<div className="nellore classHover"> 
						<img src="/Maps/Andhra_Pradesh/Nellore.png" alt="Nellore"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Andhra_Pradesh/Nellore_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Andhra_Pradesh/Nellore.png")}/>
						<span className="nelloreText mapTextLabel text-capitalize">Nellore</span>
						<span className="nelloreNumber mapCountLabel text-center">{this.state.Nellore ? this.state.Nellore : 0}</span>
					</div>
					<div className="prakasam classHover"> 
						<img src="/Maps/Andhra_Pradesh/Prakasam.png" alt="Prakasam"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Andhra_Pradesh/Prakasam_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Andhra_Pradesh/Prakasam.png")}/>
						<span className="prakasamText mapTextLabel text-capitalize">Prakasam</span>
						<span className="prakasamNumber mapCountLabel text-center">{this.state.Prakasam ? this.state.Prakasam : 0}</span>
					</div>
					<div className="guntur classHover"> 
						<img src="/Maps/Andhra_Pradesh/Guntur.png" alt="Guntur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Andhra_Pradesh/Guntur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Andhra_Pradesh/Guntur.png")}/>
						<span className="gunturText mapTextLabel text-capitalize">Guntur</span>
						<span className="gunturNumber mapCountLabel text-center">{this.state.Guntur ? this.state.Guntur : 0}</span>
					</div>
					<div className="krishna classHover"> 
						<img src="/Maps/Andhra_Pradesh/Krishna.png" alt="Krishna" 
						onMouseOver={e => (e.currentTarget.src = "/Maps/Andhra_Pradesh/Krishna_.png")} 
						onMouseOut={e => (e.currentTarget.src = "/Maps/Andhra_Pradesh/Krishna.png")}/>
						<span className="krishnaText mapTextLabel text-capitalize">Krishna</span>
						<span className="krishnaNumber mapCountLabel text-center">{this.state.Krishna ? this.state.Krishna : 0}</span>
					</div>
					<div className="westGodawari classHover"> 
						<img src="/Maps/Andhra_Pradesh/West_Godawari.png" alt="West_Godawari"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Andhra_Pradesh/West_Godawari_.png")}
						  onMouseOut={e => (e.currentTarget.src = "/Maps/Andhra_Pradesh/West_Godawari.png")}/>
						<span className="westGodawariText mapTextLabel text-capitalize">West_Godawari</span>
						<span className="westGodawariNumber mapCountLabel text-center">{this.state.West_Godawari ? this.state.West_Godawari : 0}</span>
					</div>
					<div className="eastGodawari classHover"> 
						<img src="/Maps/Andhra_Pradesh/East_Godawari.png" alt="East_Godawari"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Andhra_Pradesh/East_Godawari_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Andhra_Pradesh/East_Godawari.png")}/>
						<span className="eastGodawariText mapTextLabel text-capitalize">East_Godawari</span>
						<span className="eastGodawariNumber mapCountLabel text-center">{this.state.East_Godawari ? this.state.East_Godawari : 0}</span>
					</div>
					<div className="vishakhapatnam classHover"> 
						<img src="/Maps/Andhra_Pradesh/Vishakhapatnam.png" alt="Vishakhapatnam"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Andhra_Pradesh/Vishakhapatnam_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Andhra_Pradesh/Vishakhapatnam.png")}/>
						<span className="vishakhapatnamText mapTextLabel text-capitalize">Vishakhapatnam</span>
						<span className="vishakhapatnamNumber mapCountLabel text-center">{this.state.Vishakhapatnam ? this.state.Vishakhapatnam : 0}</span>
					</div>
					<div className="vizianagaram classHover"> 
						<img src="/Maps/Andhra_Pradesh/Vizianagaram.png" alt="Vizianagaram"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Andhra_Pradesh/Vizianagaram_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Andhra_Pradesh/Vizianagaram.png")}/>
						<span className="vizianagaramText mapTextLabel text-capitalize">Vizianagaram</span>
						<span className="vizianagaramNumber mapCountLabel text-center">{this.state.Vizianagaram ? this.state.Vizianagaram : 0}</span>
					</div>
					<div className="srikakulam classHover"> 
						<img src="/Maps/Andhra_Pradesh/Srikakulam.png" alt="Srikakulam"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Andhra_Pradesh/Srikakulam_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Andhra_Pradesh/Srikakulam.png")}/>
						<span className="srikakulamText mapTextLabel text-capitalize">Srikakulam</span>
						<span className="srikakulamNumber mapCountLabel text-center">{this.state.Srikakulam ? this.state.Srikakulam : 0}</span>
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

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(AndhraPradesh));
