import React, {Component}     from 'react';
import Axios 				  from 'axios';
import Swal 				  from 'sweetalert2';
import {Redirect}             from 'react-router-dom';
import { withRouter }         from 'react-router-dom';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../common/actions/index';
import './Delhi.css';
import '../global.css';


class Delhi extends Component{
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
					<div className="dwarka classHover" onClick={e => this.onDistrictClick("Dwarka","DL")}> 
						<img src="/Maps/Delhi/Dwarka.png"  alt="Dwarka" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Delhi/Dwarka_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Delhi/Dwarka.png")}/>
						<span className="dwarkaText mapTextLabel text-capitalize">Dwarka</span>
						<span className="dwarkaNumber mapCountLabel text-center">{this.state.Dwarka ? this.state.Dwarka : 0}</span>
					</div>
					<div className="newDelhi classHover" onClick={e => this.onDistrictClick("New_Delhi","DL")}> 
						<img src="/Maps/Delhi/NEW_Delhi.png" alt="NEW_Delhi" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Delhi/NEW_Delhi_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Delhi/NEW_Delhi.png")}/>
						<span className="newDelhiText mapTextLabel text-capitalize">New Delhi</span>
						<span className="newDelhiNumber mapCountLabel text-center">{this.state.New_Delhi ? this.state.New_Delhi : 0}</span>
					</div>
					<div className="saket classHover" onClick={e => this.onDistrictClick("Saket","DL")}> 
						<img src="/Maps/Delhi/Saket.png" alt="Saket"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Delhi/Saket_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Delhi/Saket.png")}/>
						<span className="saketText mapTextLabel text-capitalize">Saket</span>
						<span className="saketNumber mapCountLabel text-center">{this.state.Saket ? this.state.Saket : 0}</span>
					</div>
					<div className="defenceColony classHover" onClick={e => this.onDistrictClick("Defence_Colony","DL")}> 
						<img src="/Maps/Delhi/Defence_Colony.png" alt="Defence_Colony"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Delhi/Defence_Colony_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Delhi/Defence_Colony.png")}/>
						<span className="defenceColonyText mapTextLabel text-capitalize">Defence_Colony</span>
						<span className="defenceColonyNumber mapCountLabel text-center">{this.state.Defence_Colony ? this.state.Defence_Colony : 0}</span>
					</div>
					<div className="preetVihar classHover" onClick={e => this.onDistrictClick("Preet_Vihar","DL")}> 
						<img src="/Maps/Delhi/Preet_Vihar.png" alt="Preet_Vihar" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Delhi/Preet_Vihar_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Delhi/Preet_Vihar.png")}/>
						<span className="preetViharText mapTextLabel text-capitalize">Preet Vihar</span>
						<span className="preetViharNumber mapCountLabel text-center">{this.state.Preet_Vihar ? this.state.Preet_Vihar : 0}</span>
					</div>
					<div className="shahdara classHover" onClick={e => this.onDistrictClick("Shahdara","DL")}> 
						<img src="/Maps/Delhi/Shahdara.png" alt="Shahdara"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Delhi/Shahdara_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Delhi/Shahdara.png")}/>
						<span className="shahdaraText mapTextLabel text-capitalize">Shahdara</span>
						<span className="shahdaraNumber mapCountLabel text-center">{this.state.Shahdara ? this.state.Shahdara : 0}</span>
					</div>
					<div className="centralDaryaganj classHover" onClick={e => this.onDistrictClick("Central_Daryaganj","DL")}> 
						<img src="/Maps/Delhi/Central_Daryaganj.png" alt="Central_Daryaganj"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Delhi/Central_Daryaganj_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Delhi/Central_Daryaganj.png")}/>
						<span className="centralDaryaganjText mapTextLabel text-capitalize">Central_Daryaganj</span>
						<span className="centralDaryaganjNumber mapCountLabel text-center">{this.state.Central_Daryaganj ? this.state.Central_Daryaganj : 0}</span>
					</div>
					<div className="rajouriGarden classHover" onClick={e => this.onDistrictClick("Rajouri_Garden","DL")}> 
						<img src="/Maps/Delhi/Rajouri_Garden.png" alt="Rajouri_Garden"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Delhi/Rajouri_Garden_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Delhi/Rajouri_Garden.png")}/>
						<span className="rajouriGardenText mapTextLabel text-capitalize">Rajouri_Garden</span>
						<span className="rajouriGardenNumber mapCountLabel text-center">{this.state.Rajouri_Garden ? this.state.Rajouri_Garden : 0}</span>
					</div>
					<div className="kanjhwala classHover" onClick={e => this.onDistrictClick("Kanjhwala","DL")}> 
						<img src="/Maps/Delhi/Kanjhwala.png" alt="Kanjhwala"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Delhi/Kanjhwala_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Delhi/Kanjhwala.png")}/>
						<span className="kanjhwalaText mapTextLabel text-capitalize">Kanjhwala</span>
						<span className="kanjhwalaNumber mapCountLabel text-center">{this.state.Kanjhwala ? this.state.Kanjhwala : 0}</span>
					</div>
					<div className="northNarela classHover" onClick={e => this.onDistrictClick("North_Narela","DL")}> 
						<img src="/Maps/Delhi/North_Narela.png" alt="North_Narela"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Delhi/North_Narela_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Delhi/North_Narela.png")}/>
						<span className="northNarelaText mapTextLabel text-capitalize">North_Narela</span>
						<span className="northNarelaNumber mapCountLabel text-center">{this.state.Thane ? this.state.Thane : 0}</span>
					</div>
					<div className="northEastSeelampur classHover" onClick={e => this.onDistrictClick("North_East_Seelampur","DL")}> 
						<img src="/Maps/Delhi/North_East_Seelampur.png"  alt="North_East_Seelampur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Delhi/North_East_Seelampur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Delhi/North_East_Seelampur.png")}/>
						<span className="northEastSeelampurText mapTextLabel text-capitalize">North_East_Seelampur</span>
						<span className="northEastSeelampurNumber mapCountLabel text-center">{this.state.North_East_Seelampur ? this.state.North_East_Seelampur : 0}</span>
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

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Delhi));
