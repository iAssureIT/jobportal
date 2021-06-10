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
				<div className="stateWrapper col-12">
					<div className="kurnool classHover" onClick={e => this.onDistrictClick("Kurnool","AD")}> 
						<img src="/Maps/Andhra_Pradesh/Kurnool.png"  alt="Kurnool"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Andhra_Pradesh/Kurnool_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Andhra_Pradesh/Kurnool.png")}/>
						<span className="kurnoolText mapTextLabel text-capitalize">Kurnool</span>
						<span className="kurnoolNumber mapCountLabel text-center">{this.state.Kurnool ? this.state.Kurnool : 0}</span>
					</div>
					<div className="anantapur classHover" onClick={e => this.onDistrictClick("Anantapur","AD")}> 
						<img src="/Maps/Andhra_Pradesh/Anantapur.png" alt="Anantapur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Andhra_Pradesh/Anantapur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Andhra_Pradesh/Anantapur.png")}/>
						<span className="anantapurText mapTextLabel text-capitalize">Anantapuram</span>
						<span className="anantapurNumber mapCountLabel text-center">{this.state.Anantapuram ? this.state.Anantapuram : 0}</span>
					</div>
					<div className="ysr classHover" onClick={e => this.onDistrictClick("YSR_District","AD")}> 
						<img src="/Maps/Andhra_Pradesh/Y.S.R.png" alt="Y.S.R"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Andhra_Pradesh/Y.S.R._.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Andhra_Pradesh/Y.S.R.png")}/>
						<span className="ysrText mapTextLabel text-capitalize">Y.S.R.</span>
						<span className="ysrNumber mapCountLabel text-center">{this.state.YSR_District ? this.state.YSR_District : 0}</span>
					</div>
					<div className="chittoor classHover" onClick={e => this.onDistrictClick("Chittoor","AD")}> 
						<img src="/Maps/Andhra_Pradesh/Chittoor.png" alt="Chittoor"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Andhra_Pradesh/Chittoor_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Andhra_Pradesh/Chittoor.png")}/>
						<span className="chittoorText mapTextLabel text-capitalize">Chittoor</span>
						<span className="chittoorNumber mapCountLabel text-center">{this.state.Chittoor ? this.state.Chittoor : 0}</span>
					</div>
					<div className="nellore classHover" onClick={e => this.onDistrictClick("Nellore","AD")}> 
						<img src="/Maps/Andhra_Pradesh/Nellore.png" alt="Nellore"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Andhra_Pradesh/Nellore_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Andhra_Pradesh/Nellore.png")}/>
						<span className="nelloreText mapTextLabel text-capitalize">Nellore</span>
						<span className="nelloreNumber mapCountLabel text-center">{this.state.Sri_Potti_Sriramulu_Nellore_District ? this.state.Sri_Potti_Sriramulu_Nellore_District : 0}</span>
					</div>
					<div className="prakasam classHover" onClick={e => this.onDistrictClick("Prakasam","AD")}> 
						<img src="/Maps/Andhra_Pradesh/Prakasam.png" alt="Prakasam"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Andhra_Pradesh/Prakasam_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Andhra_Pradesh/Prakasam.png")}/>
						<span className="prakasamText mapTextLabel text-capitalize">Prakasam</span>
						<span className="prakasamNumber mapCountLabel text-center">{this.state.Prakasam ? this.state.Prakasam : 0}</span>
					</div>
					<div className="guntur classHover" onClick={e => this.onDistrictClick("Guntur","AD")}> 
						<img src="/Maps/Andhra_Pradesh/Guntur.png" alt="Guntur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Andhra_Pradesh/Guntur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Andhra_Pradesh/Guntur.png")}/>
						<span className="gunturText mapTextLabel text-capitalize">Guntur</span>
						<span className="gunturNumber mapCountLabel text-center">{this.state.Guntur ? this.state.Guntur : 0}</span>
					</div>
					<div className="krishna classHover" onClick={e => this.onDistrictClick("Krishna","AD")}> 
						<img src="/Maps/Andhra_Pradesh/Krishna.png" alt="Krishna" 
						onMouseOver={e => (e.currentTarget.src = "/Maps/Andhra_Pradesh/Krishna_.png")} 
						onMouseOut={e => (e.currentTarget.src = "/Maps/Andhra_Pradesh/Krishna.png")}/>
						<span className="krishnaText mapTextLabel text-capitalize">Krishna</span>
						<span className="krishnaNumber mapCountLabel text-center">{this.state.Krishna ? this.state.Krishna : 0}</span>
					</div>
					<div className="westGodawari classHover" onClick={e => this.onDistrictClick("West_Godavari","AD")}> 
						<img src="/Maps/Andhra_Pradesh/West_Godawari.png" alt="West_Godawari"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Andhra_Pradesh/West_Godawari_.png")}
						  onMouseOut={e => (e.currentTarget.src = "/Maps/Andhra_Pradesh/West_Godawari.png")}/>
						<span className="westGodawariText mapTextLabel text-capitalize">West Godavari</span>
						<span className="westGodawariNumber mapCountLabel text-center">{this.state.West_Godavari ? this.state.West_Godavari : 0}</span>
					</div>
					<div className="eastGodawari classHover" onClick={e => this.onDistrictClick("East_Godavari","AD")}> 
						<img src="/Maps/Andhra_Pradesh/East_Godawari.png" alt="East_Godawari"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Andhra_Pradesh/East_Godawari_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Andhra_Pradesh/East_Godawari.png")}/>
						<span className="eastGodawariText mapTextLabel text-capitalize">East Godavari</span>
						<span className="eastGodawariNumber mapCountLabel text-center">{this.state.East_Godavari ? this.state.East_Godavari : 0}</span>
					</div>
					<div className="vishakhapatnam classHover" onClick={e => this.onDistrictClick("Vishakhapatnam","AD")}> 
						<img src="/Maps/Andhra_Pradesh/Vishakhapatnam.png" alt="Vishakhapatnam"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Andhra_Pradesh/Vishakhapatnam_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Andhra_Pradesh/Vishakhapatnam.png")}/>
						<span className="vishakhapatnamText mapTextLabel text-capitalize">Vishakhapatnam</span>
						<span className="vishakhapatnamNumber mapCountLabel text-center">{this.state.Vishakhapatnam ? this.state.Vishakhapatnam : 0}</span>
					</div>
					<div className="vizianagaram classHover" onClick={e => this.onDistrictClick("Vizianagaram","AD")}> 
						<img src="/Maps/Andhra_Pradesh/Vizianagaram.png" alt="Vizianagaram"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Andhra_Pradesh/Vizianagaram_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Andhra_Pradesh/Vizianagaram.png")}/>
						<span className="vizianagaramText mapTextLabel text-capitalize">Vizianagaram</span>
						<span className="vizianagaramNumber mapCountLabel text-center">{this.state.Vizianagaram ? this.state.Vizianagaram : 0}</span>
					</div>
					<div className="srikakulam classHover" onClick={e => this.onDistrictClick("Srikakulam","AD")}> 
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
