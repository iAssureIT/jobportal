import React, {Component}     from 'react';
import Axios 				  from 'axios';
import Swal 				  from 'sweetalert2';
import {Redirect}             from 'react-router-dom';
import { withRouter }         from 'react-router-dom';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../common/actions/index';

import './Mizoram.css';
import '../global.css';


class Mizoram extends Component{
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
			<div className="bodyWrapper col-12" >
				<div className="stateWrapper"  >
					<div className="tuipang classHover" onClick={e => this.onDistrictClick("Tuipang","MZ")}> 
						<img src="/Maps/Mizoram/Tuipang.png"  alt="Tuipang"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Mizoram/Tuipang_.png")}
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Mizoram/Tuipang.png")}/>
						<span className="tuipangText mapTextLabel text-capitalize">Tuipang</span>
						<span className="tuipangNumber mapCountLabel text-center">{this.state.Tuipang ? this.state.Tuipang : 0}</span>
					</div>
					<div className="lawngtlai classHover" onClick={e => this.onDistrictClick("Lawngtlai","MZ")}> 
						<img src="/Maps/Mizoram/Lawngtlai.png"  alt="Lawngtlai" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Mizoram/Lawngtlai_.png")}
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Mizoram/Lawngtlai.png")}/>
						<span className="lawngtlaiText mapTextLabel text-capitalize">Lawngtlai</span>
						<span className="lawngtlaiNumber mapCountLabel text-center">{this.state.Lawngtlai ? this.state.Lawngtlai : 0}</span>
					</div>
					<div className="lunglei classHover" onClick={e => this.onDistrictClick("Lunglei","MZ")}> 
						<img src="/Maps/Mizoram/Lunglei.png" alt="Lunglei" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Mizoram/Lunglei_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Mizoram/Lunglei.png")}/>
						<span className="lungleiText mapTextLabel text-capitalize">Lunglei</span>
						<span className="lungleiNumber mapCountLabel text-center">{this.state.Lunglei ? this.state.Lunglei : 0}</span>
					</div>
					<div className="mamit classHover" onClick={e => this.onDistrictClick("Mamit","MZ")}> 
						<img src="/Maps/Mizoram/Mamit.png" alt="Mamit" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Mizoram/Mamit_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Mizoram/Mamit.png")}/>
						<span className="mamitText mapTextLabel text-capitalize">Mamit</span>
						<span className="mamitNumber mapCountLabel text-center">{this.state.Mamit ? this.state.Mamit : 0}</span>
					</div>
					<div className="aizawl classHover" onClick={e => this.onDistrictClick("Aizawl","MZ")}> 
						<img src="/Maps/Mizoram/Aizawl.png"  alt="Aizawl" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Mizoram/Aizawl_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Mizoram/Aizawl.png")}/>
						<span className="aizawlText mapTextLabel text-capitalize">Aizawl</span>
						<span className="aizawlNumber mapCountLabel text-center">{this.state.Aizawl ? this.state.Aizawl : 0}</span>
					</div>

					<div className="champhai classHover" onClick={e => this.onDistrictClick("Champhai","MZ")}> 
						<img src="/Maps/Mizoram/Champhai.png" alt="Champhai" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Mizoram/Champhai_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Mizoram/Champhai.png")}/>
						<span className="champhaiText mapTextLabel text-capitalize">Champhai</span>
						<span className="champhaiNumber mapCountLabel text-center">{this.state.Champhai ? this.state.Champhai : 0}</span>
					</div>
					<div className="searchhip classHover" onClick={e => this.onDistrictClick("Searchhip","MZ")}> 
						<img src="/Maps/Mizoram/Searchhip.png"  alt="Searchhip" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Mizoram/Searchhip_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Mizoram/Searchhip.png")}/>
						<span className="searchhipText mapTextLabel text-capitalize">Searchhip</span>
						<span className="searchhipNumber mapCountLabel text-center">{this.state.Searchhip ? this.state.Searchhip : 0}</span>
					</div>
					
					
					<div className="kolasib classHover" onClick={e => this.onDistrictClick("Kolasib","MZ")}> 
						<img src="/Maps/Mizoram/Kolasib.png"  alt="Kolasib" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Mizoram/Kolasib_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Mizoram/Kolasib.png")}/>
						<span className="kolasibText mapTextLabel text-capitalize">Kolasib</span>
						<span className="kolasibNumber mapCountLabel text-center">{this.state.Kolasib ? this.state.Kolasib : 0}</span>
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

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Mizoram));
