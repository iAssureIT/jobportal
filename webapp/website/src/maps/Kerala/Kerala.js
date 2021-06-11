import React, {Component}     from 'react';
import Axios 				  from 'axios';
import Swal 				  from 'sweetalert2';
import {Redirect}             from 'react-router-dom';
import { withRouter }         from 'react-router-dom';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../common/actions/index';
import './Kerala.css';
import '../global.css';


class Kerala extends Component{
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
					<div className="kasaragod classHover" onClick={e => this.onDistrictClick("Kasaragod","KL")}> 
						<img src="/Maps/Kerala/Kasaragod.png"  alt="Kasaragod"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Kasaragod_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Kasaragod.png")}/>
						<span className="kasaragodText mapTextLabel text-capitalize">Kasaragod</span>
						<span className="kasaragodNumber mapCountLabel text-center">{this.state.Kasaragod ? this.state.Kasaragod : 0}</span>
					</div>
					<div className="kannur classHover" onClick={e => this.onDistrictClick("Kannur","KL")}> 
						<img src="/Maps/Kerala/Kannur.png"  alt="Kannur"
						  onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Kannur_.png")} 
						  onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Kannur.png")}/>
						<span className="kannurText mapTextLabel text-capitalize">Kannur</span>
						<span className="kannurNumber mapCountLabel text-center">{this.state.Kannur ? this.state.Kannur : 0}</span>
					</div>
					<div className="wayand classHover" onClick={e => this.onDistrictClick("Wayand","KL")}> 
						<img src="/Maps/Kerala/Wayand.png"  alt="Wayand"
						  onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Wayand_.png")} 
						  onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Wayand.png")}/>
						<span className="wayandText  mapTextLabel text-capitalize">Wayand</span>
						<span className="wayandNumber  mapCountLabel  text-center">{this.state.Wayand ? this.state.Wayand : 0}</span>
					</div>
					<div className="kozhikode classHover" onClick={e => this.onDistrictClick("Kozhikode","KL")}> 
						<img src="/Maps/Kerala/Kozhikode.png" alt="Kozhikode"
						  onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Kozhikode_.png")} 
						  onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Kozhikode.png")}/>
						<span className="kozhikodeText mapTextLabel text-capitalize">Kozhikode</span>
						<span className="kozhikodeNumber  mapCountLabel  text-center">{this.state.Kozhikode ? this.state.Kozhikode : 0}</span>
					</div>
					<div className="malappuram classHover" onClick={e => this.onDistrictClick("Malappuram","KL")}> 
						<img src="/Maps/Kerala/Malappuram.png"  alt="Malappuram"
						  onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Malappuram_.png")} 
						  onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Malappuram.png")}/>
						<span className="malappuramText  mapTextLabel text-capitalize">Malappuram</span>
						<span className="malappuramNumber  mapCountLabel  text-center">{this.state.Malappuram ? this.state.Malappuram : 0}</span>
					</div>
					<div className="palakkad classHover" onClick={e => this.onDistrictClick("palakkad","KL")}> 
						<img src="/Maps/Kerala/Palakkad.png"  alt="Palakkad"
						  onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Palakkad_.png")}
						  onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Palakkad.png")}/>
						<span className="palakkadText  mapTextLabel text-capitalize">Palakkad</span>
						<span className="palakkadNumber  mapCountLabel  text-center">{this.state.Palakkad ? this.state.Palakkad : 0}</span>
					</div>
					<div className="thrissur classHover" onClick={e => this.onDistrictClick("Thrissur","KL")}> 
						<img src="/Maps/Kerala/Thrissur.png"  alt="Thrissur"
						  onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Thrissur_.png")} 
						  onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Thrissur.png")}/>
						<span className="thrissurText  mapTextLabel text-capitalize">Thrissur</span>
						<span className="thrissurNumber  mapCountLabel  text-center">{this.state.Thrissur ? this.state.Thrissur : 0}</span>
					</div>
					<div className="ernakulam classHover" onClick={e => this.onDistrictClick("Ernakulam","KL")}> 
						<img src="/Maps/Kerala/Ernakulam.png"  alt="Ernakulam"
						  onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Ernakulam_.png")} 
						  onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Ernakulam.png")}/>
						<span className="ernakulamText  mapTextLabel text-capitalize">Ernakulam</span>
						<span className="ernakulamNumber  mapCountLabel  text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="idukki classHover" onClick={e => this.onDistrictClick("Idukki","KL")}> 
						<img src="/Maps/Kerala/Idukki.png"  alt="Idukki"
						  onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Idukki_.png")} 
						  onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Idukki.png")}/>
						<span className="idukkiText mapTextLabel  text-capitalize">Idukki</span>
						<span className="idukkiNumber  mapCountLabel  text-center">{this.state.Idukki ? this.state.Idukki : 0}</span>
					</div>
					<div className="kottayam classHover" onClick={e => this.onDistrictClick("Kottayam","KL")}> 
						<img src="/Maps/Kerala/Kottayam.png"  alt="Kottayam"
						  onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Kottayam_.png")} 
						  onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Kottayam.png")}/>
						<span className="kottayamText mapTextLabel  text-capitalize">Kottayam</span>
						<span className="kottayamNumber  mapCountLabel  text-center">{this.state.Kottayam ? this.state.Kottayam : 0}</span>
					</div>
					<div className="alappuzha classHover" onClick={e => this.onDistrictClick("Alappuzha","KL")}> 
						<img src="/Maps/Kerala/Alappuzha.png"  alt="Alappuzha"
						  onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Alappuzha_.png")} 
						  onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Alappuzha.png")}/>
						<span className="alappuzhaText  mapTextLabel text-capitalize">Alappuzha</span>
						<span className="alappuzhaNumber  mapCountLabel  text-center">{this.state.Alappuzha ? this.state.Alappuzha : 0}</span>
					</div>
					<div className="kollam classHover" onClick={e => this.onDistrictClick("Kollam","KL")}> 
						<img src="/Maps/Kerala/Kollam.png"  alt="Kollam"
						  onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Kollam_.png")} 
						  onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Kollam.png")}/>
						<span className="kollamText  mapTextLabel text-capitalize">Kollam</span>
						<span className="kollamNumber  mapCountLabel  text-center">{this.state.Kollam ? this.state.Kollam : 0}</span>
					</div>
					<div className="thiruvanthapuram classHover" onClick={e => this.onDistrictClick("Thiruvanthapuram","KL")}> 
						<img src="/Maps/Kerala/Thiruvanthapuram.png"  alt="Thiruvanthapuram"
						  onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Thiruvanthapuram_.png")} 
						  onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Thiruvanthapuram.png")}/>
						<span className="thiruvanthapuramText  mapTextLabel text-capitalize">Thiruvanthapuram</span>
						<span className="thiruvanthapuramNumber  mapCountLabel  text-center">{this.state.Thiruvanthapuram ? this.state.Thiruvanthapuram : 0}</span>
					</div>
					<div className="pathanamthitta classHover" onClick={e => this.onDistrictClick("Pathanamthitta","KL")}> 
						<img src="/Maps/Kerala/Pathanamthitta.png"  alt="Pathanamthitta"
						  onMouseOver={e => (e.currentTarget.src = "/Maps/Kerala/Pathanamthitta_.png")} 
						  onMouseOut={e => (e.currentTarget.src = "/Maps/Kerala/Pathanamthitta.png")}/>
						<span className="pathanamthittaText  mapTextLabel text-capitalize">Pathanamthitta</span>
						<span className="pathanamthittaNumber mapCountLabel text-center">{this.state.Pathanamthitta ? this.state.Pathanamthitta : 0}</span>
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

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Kerala));