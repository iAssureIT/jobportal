import React, {Component} from 'react';
import Axios 			  from 'axios';
import Swal 			  from 'sweetalert2';
import {Redirect}         from 'react-router-dom';
import { withRouter }     from 'react-router-dom';
import {connect}              from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../common/actions/index';
import '../global.css';
import './india.css';


class India extends Component{
	constructor(props){
		super(props);

		this.state = {
		}   
	}
	componentDidMount(){

	}
	componentWillReceiveProps(nextProps){
		var stateWiseCount = {};
		console.log(nextProps.mapJobs)
		/*if (nextProps.mapJobs.length == 0) {
			for (var i=0; i < this.state.length; i++) {
				stateWiseCount[this.state[i]] = 0
		    }
	    	
	    	
	    }*/
	    for (var i=0; i < nextProps.mapJobs.length; i++) {
	    	
	       stateWiseCount[nextProps.mapJobs[i]._id] =  nextProps.mapJobs[i].count;
	    }

	    this.setState(stateWiseCount)
	}
	search(nameKey){
		console.log(this.props.mapJobs)
		var stateWiseCount = {};
	    for (var i=0; i < this.props.mapJobs.length; i++) {
	    	//console.log(nameKey)
	        if (this.props.mapJobs[i]._id === nameKey) {
				stateWiseCount[nameKey] =  this.props.mapJobs[i].count;
	            return this.props.mapJobs[i].count;
	        }else{
	        	stateWiseCount[nameKey] = 0;
	        	return 0
	        }
	        
	    }
	    
	}
	onStateClick = (stateName,stateCode) => { 
		
		var {mapAction} = this.props;

		mapAction.setMapSelectedState(stateName);
		
		var selector = this.props.selector;
		
		//console.log(selector)
		selector.countryCode = "IN"; 
		selector.stateCode = stateCode; 

		mapAction.jobCount(selector);
		
	    if (this.props.viewMode=="mapView") {
	     mapAction.filterMapData(selector); 
	    }
	    if (this.props.viewMode=="functionalView") {
	      mapAction.filterFunctionalData(this.props.selector);
	    }
	    if (this.props.viewMode=="subfunctionalView") {
	      mapAction.filterSubfunctionalData(this.props.selector);
	    }
	    if (this.props.viewMode=="industrialView") {
	      mapAction.filterIndustrialData(this.props.selector);
	    }
		this.props.history.push("state/"+stateCode);
	}
	render(){
		console.log(this.state)
		return(
			<section className="mapWrapper">
				<div className="india">
					 
					<div className="jammuKashmir classHover">
						<img src="/Maps/India/Jammu&Kashmir.png"   onClick={e => this.onStateClick("Jammu And Kashmir","JK")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Jammu&Kashmir_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Jammu&Kashmir.png")}/>
						<span className="jammuKashmirText  mapTextLabel text-capitalize">Jammu <br/> and  <br/> Kashmir</span>
						<span className="jammuKashmirNumber mapCountLabel text-center">{this.state.JK ? this.state.JK : 0}</span>
					</div>

					<div className="ladakh classHover">
						<img src="/Maps/India/Ladakh.png"  alt="Ladakh" onClick={e => this.onStateClick("Ladakh","LA")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Ladakh_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Ladakh.png")}/>
						<span className="ladakhText  mapTextLabel text-capitalize">Ladakh</span>
						<span className="ladakhNumber mapCountLabel text-center">{this.state.LA ? this.state.LA : 0 }</span>
					</div>



					<div className="punjab classHover">
						<img src="/Maps/India/Punjab.png" className="img-responsive "  onClick={e => this.onStateClick("Punjab","PB")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Punjab_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Punjab.png")}/>
						<span className="punjabText  mapTextLabel text-capitalize">Punjab</span>
						<span className="punjabNumber mapCountLabel text-center">{this.state.PB ? this.state.PB : 0}</span>
					</div>

					

					<div className="himachal classHover">
						<img src="/Maps/India/HimachalPradesh.png" className="img-responsive "  onClick={e => this.onStateClick("Himachal Pradesh","HP")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/HimachalPradesh1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/HimachalPradesh.png")}/>
						<span className="himachalText mapTextLabel text-capitalize">Himachal Pradesh</span>
						<span className="himachalNumber mapCountLabel text-center">{this.state.HP ? this.state.HP : 0}</span>
					</div>

					<div className="uttarakhand classHover">
						<img src="/Maps/India/Uttarakhand.png" className="img-responsive "  onClick={e => this.onStateClick("Uttarakhand","UK")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Uttarakhand1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Uttarakhand.png")}/>
						<span className="uttarakhandText mapTextLabel text-capitalize">Uttarakhand</span>
						<span className="uttarakhandNumber mapCountLabel text-center">{this.state.UK ? this.state.UK : 0}</span>
					</div>

					<div className="rajasthan classHover">
						<img src="/Maps/India/Rajasthan.png" className="img-responsive "  onClick={e => this.onStateClick("Rajasthan","RJ")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Rajasthan1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Rajasthan.png")}/>
						<span className="rajasthanText mapTextLabel text-capitalize">Rajasthan</span>
						<span className="rajasthanNumber mapCountLabel text-center">{this.state.RJ ? this.state.RJ : 0}</span>
					</div>

					<div className="haryana classHover">
						<img src="/Maps/India/Haryana.png" className="img-responsive "  onClick={e => this.onStateClick("Haryana","HR")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Haryana1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Haryana.png")}/>
						<span className="haryanaText mapTextLabel text-capitalize">Haryana</span>
						<span className="haryanaNumber mapCountLabel text-center">{this.state.HR ? this.state.HR : 0}</span>
					</div>


					<div className="gujrat classHover">
						<img src="/Maps/India/Gujrat.png" className="img-responsive "  onClick={e => this.onStateClick("Gujarat","GJ")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Gujrat1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Gujrat.png")}/>
						<span className="gujratText mapTextLabel text-capitalize">Gujarat</span>
						<span className="gujratNumber mapCountLabel text-center">{this.state.GJ ? this.state.GJ : 0}</span>
					</div>

					<div className="maharashtra classHover">
						<img src="/Maps/India/Maharashtra.png" id="imageid" className="img-responsive"  onClick={e => this.onStateClick("Maharashtra","MH")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Maharashtra1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Maharashtra.png")}/>
						<span className="maharashtraText  mapTextLabel  text-capitalize">Maharashtra</span>
						<span className="maharashtraNumber mapCountLabel text-center">{this.state.MH ? this.state.MH : 0}</span>
					</div>
					
					<div className="madhyapradesh classHover">
						<img src="/Maps/India/MadhyaPradesh.png" className="img-responsive"  onClick={e => this.onStateClick("Madhya Pradesh","MP")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/MadhyaPradesh1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/MadhyaPradesh.png")}/>
						<span className="madhyapradeshText mapTextLabel text-capitalize">Madhya Pradesh</span>
						<span className="madhyapradeshNumber mapCountLabel text-center">{this.state.MP ? this.state.MP : 0}</span>
					</div>
					
					<div className="karnataka classHover">
						<img src="/Maps/India/Karnataka.png" className="img-responsive "  onClick={e => this.onStateClick("Karnataka","KA")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Karnataka1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Karnataka.png")}/>
						<span className="karnatakaText mapTextLabel text-capitalize">Karnataka</span>
						<span className="karnatakaNumber mapCountLabel text-center">{this.state.KA ? this.state.KA : 0}</span>
					</div>
					
					<div className="tamilnadu classHover">
						<img src="/Maps/India/TamilNadu.png" className="img-responsive "  onClick={e => this.onStateClick("TamilNadu","TN")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/TamilNadu1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/TamilNadu.png")}/>
						<span className="tamilnaduText mapTextLabel text-capitalize">Tamil Nadu</span>
						<span className="tamilnaduNumber mapCountLabel text-center">{this.state.TN ? this.state.TN : 0}</span>
					</div>
					<div className="andhrapradesh classHover">
						<img src="/Maps/India/AndhraPradesh.png" className="img-responsive "  onClick={e => this.onStateClick("Andhra Pradesh","AD")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/AndhraPradesh1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/AndhraPradesh.png")}/>
						<span className="andhrapradeshText mapTextLabel text-capitalize">Andhra Pradesh</span>
						<span className="andhrapradeshNumber mapCountLabel text-center">{this.state.AD ? this.state.AD : 0}</span>
					</div>
					<div className="telangana classHover">
						<img src="/Maps/India/Telangana.png" className="img-responsive "  onClick={e => this.onStateClick("Telangana","TS")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Telangana1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Telangana.png")}/>
						<span className="telanganaText mapTextLabel text-capitalize">Telangana</span>
						<span className="telanganaNumber mapCountLabel text-center">{this.state.TS ? this.state.TS : 0}</span>
					</div>
					<div className="orissa classHover">
						<img src="/Maps/India/Orissa.png" className="img-responsive "  onClick={e => this.onStateClick("Odisha","OD")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Orissa1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Orissa.png")}/>
						<span className="orissaText mapTextLabel text-capitalize">Odisha</span>
						<span className="orissaNumber mapCountLabel text-center">{this.state.OD ? this.state.OD : 0}</span>
					</div>

					<div className="chhattisgarh classHover">
						<img src="/Maps/India/Chhattisgarh.png" className="img-responsive "  onClick={e => this.onStateClick("Chhattisgarh","CG")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Chhattisgarh1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Chhattisgarh.png")}/>
						<span className="chhattisgarhText mapTextLabel text-capitalize">Chhattisgarh</span>
						<span className="chhattisgarhNumber mapCountLabel text-center">{this.state.CG ? this.state.CG : 0}</span>
					</div>
					
					<div className="uttarpradesh classHover">
						<img src="/Maps/India/UttarPradesh.png" className="img-responsive "  onClick={e => this.onStateClick("uttar Pradesh","UP")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/UttarPradesh1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/UttarPradesh.png")}/>
						<span className="uttarpradeshText mapTextLabel text-capitalize">Uttar Pradesh</span>
						<span className="uttarpradeshNumber mapCountLabel  text-center">{this.state.UP ? this.state.UP : 0}</span>
					</div>
					
					<div className="westbengal classHover">
						<img src="/Maps/India/WestBengal.png" className="img-responsive "  onClick={e => this.onStateClick("West Bengal","WB")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/WestBengal1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/WestBengal.png")}/>
						<span className="westbengalText mapTextLabel text-capitalize">West Bengal</span>
						<span className="westbengalNumber mapCountLabel text-center">{this.state.WB ? this.state.WB : 0}</span>
					</div>

					<div className="bihar classHover">
						<img src="/Maps/India/Bihar.png" className="img-responsive "  onClick={e => this.onStateClick("Bihar","BR")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Bihar1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Bihar.png")}/>
						<span className="biharText mapTextLabel text-capitalize">Bihar</span>
						<span className="biharNumber mapCountLabel text-center">{this.state.BR ? this.state.BR : 0}</span>
					</div>
					<div className="jharkhand classHover">
						<img src="/Maps/India/Jharkhand.png" className="img-responsive "  onClick={e => this.onStateClick("Jharkhand","JH")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Jharkhand1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Jharkhand.png")}/>
						<span className="jharkhandText mapTextLabel text-capitalize">Jharkhand</span>
						<span className="jharkhandNumber mapCountLabel text-center">{this.state.JH ? this.state.JH : 0}</span>
					</div>
					<div className="sikkim classHover">
						<img src="/Maps/India/Sikkim.png" className="img-responsive "  onClick={e => this.onStateClick("Sikkim","SK")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Sikkim1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Sikkim.png")}/>
						<span className="sikkimText mapTextLabel text-capitalize">Sikkim</span>
						<span className="sikkimNumber mapCountLabel text-center">{this.state.SK ? this.state.SK : 0}</span>
					</div>
					<div className="assam classHover">
						<img src="/Maps/India/Assam.png" className="img-responsive "  onClick={e => this.onStateClick("Assam","AS")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Assam1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Assam.png")}/>
						<span className="assamText mapTextLabel text-capitalize">Assam</span>
						<span className="assamNumber mapCountLabel text-center">{this.state.AS ? this.state.AS : 0}</span>
					</div>
					<div className="meghalaya classHover">
						<img src="/Maps/India/Meghalaya.png" className="img-responsive "  onClick={e => this.onStateClick("Meghalaya","ML")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Meghalaya1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Meghalaya.png")}/>
						<span className="meghalayaText mapTextLabel text-capitalize">Meghalaya</span>
						<span className="meghalayaNumber mapCountLabel text-center">{this.state.ML ? this.state.ML : 0}</span>
					</div>
					<div className="arunachalpradesh classHover">
						<img src="/Maps/India/ArunachalPradesh.png" className="img-responsive "  onClick={e => this.onStateClick("Arunachal Pradesh","AR")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/ArunachalPradesh1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/ArunachalPradesh.png")}/>
						<span className="arunachalpradeshText mapTextLabel text-capitalize">Arunachal Pradesh</span>
						<span className="arunachalpradeshNumber mapCountLabel text-center">{this.state.AR ? this.state.AR : 0}</span>
					</div>
					<div className="nagaland classHover">
						<img src="/Maps/India/Nagaland.png" className="img-responsive "  onClick={e => this.onStateClick("Nagaland","NL")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Nagaland1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Nagaland.png")}/>
						<span className="nagalandText mapTextLabel text-capitalize">Nagaland</span>
						<span className="nagalandNumber mapCountLabel text-center">{this.state.NL ? this.state.NL : 0}</span>
					</div>
					<div className="manipur classHover">
						<img src="/Maps/India/Manipur.png" className="img-responsive "  onClick={e => this.onStateClick("Manipur","MN")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Manipur1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Manipur.png")}/>
						<span className="manipurText mapTextLabel text-capitalize">Manipur</span>
						<span className="manipurNumber mapCountLabel text-center">{this.state.MN ? this.state.MN : 0}</span>
					</div>
					<div className="mizoram classHover">
						<img src="/Maps/India/Mizoram.png" className="img-responsive "  onClick={e => this.onStateClick("Mizoram","MZ")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Mizoram1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Mizoram.png")}/>
						<span className="mizoramText mapTextLabel text-capitalize">Mizoram</span>
						<span className="mizoramNumber mapCountLabel text-center">{this.state.MZ ? this.state.MZ : 0}</span>
					</div>
					<div className="tripura classHover">
						<img src="/Maps/India/Tripura.png" className="img-responsive "  onClick={e => this.onStateClick("Tripura","TR")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Tripura1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Tripura.png")}/>
						<span className="tripuraText mapTextLabel text-capitalize">Tripura</span>
						<span className="tripuraNumber mapCountLabel text-center">{this.state.TR ? this.state.TR : 0}</span>
					</div>

					<div className="kerala classHover">
						<img src="/Maps/India/Kerala.png" className="img-responsive "  onClick={e => this.onStateClick("Kerala","KL")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Kerala1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Kerala.png")}/>
						<span className="keralaText mapTextLabel text-capitalize">Kerala</span>
						<span className="keralaNumber mapCountLabel text-center">{this.state.KL ? this.state.KL : 0}</span>
					</div>

					<div className="goa classHover">
						<img src="/Maps/India/Goa.png" className="img-responsive "  onClick={e => this.onStateClick("Goa","GA")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Goa1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Goa.png")}/>
						<span className="goaText  mapTextLabel  text-capitalize">Goa</span>
						<span className="goaNumber mapCountLabel text-center">{this.state.GA ? this.state.GA : 0}</span>
					</div>

					<div className="chandigarh classHover">
						<img src="/Maps/India/Chandigarh.png" className="img-responsive "   onMouseOver={e => (e.currentTarget.src = "/Maps/India/Chandigarh_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Chandigarh.png")}/>
						<span className="chandigarhText  mapTextLabel text-capitalize">Chandigarh</span>
						<span className="chandigarhNumber mapCountLabel text-center">{this.state.CH ? this.state.CH : 0}</span>
					</div>

					<div className="delhi classHover">
						<img src="/Maps/India/Delhi_State.png" className="img-responsive "  onClick={e => this.onStateClick("Delhi","DL")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Delhi_State_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Delhi_State.png")}/>
						<span className="delhiText  mapTextLabel  text-capitalize">Delhi</span>
						<span className="delhiNumber mapCountLabel text-center">{this.state.DL ? this.state.DL : 0}</span>
					</div>

					<div className="andaman_nicobar classHover">
						<img src="/Maps/India/Andman_Nicobar.png" className="img-responsive "  onMouseOver={e => (e.currentTarget.src = "/Maps/India/Andman_Nicobar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Andman_Nicobar.png")}/>
						<span className="andaman_nicobarText  mapTextLabel  text-capitalize">Andaman and Nicobar</span>
						<span className="andaman_nicobarNumber mapCountLabel text-center">{this.state.AN ? this.state.AN : 0}</span>
					</div>

					<div className="lakshadweep classHover">
						<img src="/Maps/India/Lakshadweep.png" className="img-responsive "  onMouseOver={e => (e.currentTarget.src = "/Maps/India/Lakshadweep_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Lakshadweep.png")}/>
						<span className="lakshadweepText  mapTextLabel  text-capitalize">Lakshadweep</span>
						<span className="lakshadweepNumber mapCountLabel text-center">{this.state.LD ? this.state.LD : 0}</span>
					</div>

					<div className="dadraNagarHaveli classHover">
						<img src="/Maps/India/Dadra_Nagar_Haveli.png" className="img-responsive "  onMouseOver={e => (e.currentTarget.src = "/Maps/India/Dadra_Nagar_Haveli_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Dadra_Nagar_Haveli.png")}/>
						<span className="dadraNagarHaveliText  mapTextLabel  text-capitalize">D.N.H.</span>
						<span className="dadraNagarHaveliNumber mapCountLabel text-center">{this.state.DH ? this.state.DH : 0}</span>
					</div>

					<div className="damanDiu classHover">
						<img src="/Maps/India/Daman_Diu.png" className="img-responsive "  onMouseOver={e => (e.currentTarget.src = "/Maps/India/Daman_Diu_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Dadra_Nagar_Haveli.png")}/>
						<span className="damanDiuText  mapTextLabel  text-capitalize">D.D.</span>
						<span className="damanDiuNumber mapCountLabel text-center">{this.state.DD ? this.state.DD : 0}</span>
					</div>


				</div>
			</section>
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
    //return bindActionCreators({ setMapSelectedStateFun : setMapSelectedState }, dispatch);  
}) 
export default connect(mapStateToProps, mapDispatchToProps) (withRouter(India));