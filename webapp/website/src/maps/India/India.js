import React, {Component} from 'react';
import Axios 				from 'axios';
import Swal 				from 'sweetalert2';
import {Redirect} from 'react-router-dom';
import { withRouter }                             from 'react-router-dom';
import {connect}            from 'react-redux';
import { bindActionCreators } from 'redux';
import '../global.css';
import './india.css';
import  * as mapActionCreator from '../../common/actions/index';


class India extends Component{
	constructor(props){
		super(props);

		this.state = {
			stateWiseJobs : []
		 }   


	}
	componentDidMount(){
		
	}
	search(nameKey){
		//console.log(this.props.mapJobs)
	    for (var i=0; i < this.props.mapJobs.length; i++) {
	        if (this.props.mapJobs[i]._id === nameKey) {
	            return this.props.mapJobs[i].count;
	        }else{
	        	return 0
	        }
	    }
	}
	onStateClick = (stateName,stateCode) => {
		var routeName = "/"+stateName;
		var {mapAction} = this.props;

		mapAction.setMapSelectedState(stateName);
		//window.location.href = routeName
		//mapAction.setMapView(stateCode);
		var selector = this.props.selector;
		
		console.log(selector)
		selector.countryCode = "IN"; 
		selector.stateCode = stateCode; 

		mapAction.jobCount(selector);
		
	    if (this.props.viewMode=="mapView") {
	      mapAction.filterMapData(this.props.selector);
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
		return(
			<section className="mapWrapper">
				<div className="india">
					 
					<div className="jammuKashmir classHover">
						<img src="Maps/India/Jammu&Kashmir.png"   onClick={e => this.onStateClick("Jammu And Kashmir","JK")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Jammu&Kashmir_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Jammu&Kashmir.png")}/>
						<span className="jammuKashmirText  mapTextLabel text-capitalize">Jammu <br/> and  <br/> Kashmir</span>
						<span className="jammuKashmirNumber mapCountLabel text-center">{this.search('JK')}</span>
					</div>

					<div className="ladakh classHover">
						<img src="Maps/India/Ladakh.png"  alt="Ladakh" onClick={e => this.onStateClick("Ladakh","LA")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Ladakh_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Ladakh.png")}/>
						<span className="ladakhText  mapTextLabel text-capitalize">Ladakh</span>
						<span className="ladakhNumber mapCountLabel text-center">{this.search('LA')}</span>
					</div>



					<div className="punjab classHover">
						<img src="Maps/India/Punjab.png" className="img-responsive "  onClick={e => this.onStateClick("Punjab","PB")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Punjab_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Punjab.png")}/>
						<span className="punjabText  mapTextLabel text-capitalize">Punjab</span>
						<span className="punjabNumber mapCountLabel text-center">{this.search('PB')}</span>
					</div>

					

					<div className="himachal classHover">
						<img src="Maps/India/HimachalPradesh.png" className="img-responsive "  onClick={e => this.onStateClick("Himachal Pradesh","HP")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/HimachalPradesh1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/HimachalPradesh.png")}/>
						<span className="himachalText mapTextLabel text-capitalize">Himachal Pradesh</span>
						<span className="himachalNumber mapCountLabel text-center">{this.search('HP')}</span>
					</div>

					<div className="uttarakhand classHover">
						<img src="Maps/India/Uttarakhand.png" className="img-responsive "  onClick={e => this.onStateClick("Uttarakhand","UK")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Uttarakhand1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Uttarakhand.png")}/>
						<span className="uttarakhandText mapTextLabel text-capitalize">Uttarakhand</span>
						<span className="uttarakhandNumber mapCountLabel text-center">{this.search('UK')}</span>
					</div>

					<div className="rajasthan classHover">
						<img src="Maps/India/Rajasthan.png" className="img-responsive "  onClick={e => this.onStateClick("Rajasthan","RJ")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Rajasthan1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Rajasthan.png")}/>
						<span className="rajasthanText mapTextLabel text-capitalize">Rajasthan</span>
						<span className="rajasthanNumber mapCountLabel text-center">{this.search('RJ')}</span>
					</div>

					<div className="haryana classHover">
						<img src="Maps/India/Haryana.png" className="img-responsive "  onClick={e => this.onStateClick("Haryana","HR")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Haryana1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Haryana.png")}/>
						<span className="haryanaText mapTextLabel text-capitalize">Haryana</span>
						<span className="haryanaNumber mapCountLabel text-center">{this.search('HR')}</span>
					</div>


					<div className="gujrat classHover">
						<img src="Maps/India/Gujrat.png" className="img-responsive "  onClick={e => this.onStateClick("Gujarat","GJ")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Gujrat1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Gujrat.png")}/>
						<span className="gujratText mapTextLabel text-capitalize">Gujarat</span>
						<span className="gujratNumber mapCountLabel text-center">{this.search('GJ')}</span>
					</div>

					<div className="maharashtra classHover">
						<img src="Maps/India/Maharashtra.png" id="imageid" className="img-responsive"  onClick={e => this.onStateClick("Maharashtra","MH")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Maharashtra1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Maharashtra.png")}/>
						<span className="maharashtraText  mapTextLabel  text-capitalize">Maharashtra</span>
						<span className="maharashtraNumber mapCountLabel text-center">{this.search('MH')}</span>
					</div>
					
					<div className="madhyapradesh classHover">
						<img src="Maps/India/MadhyaPradesh.png" className="img-responsive"  onClick={e => this.onStateClick("Madhya Pradesh","MP")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/MadhyaPradesh1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/MadhyaPradesh.png")}/>
						<span className="madhyapradeshText mapTextLabel text-capitalize">Madhya Pradesh</span>
						<span className="madhyapradeshNumber mapCountLabel text-center">{this.search('MP')}</span>
					</div>
					
					<div className="karnataka classHover">
						<img src="Maps/India/Karnataka.png" className="img-responsive "  onClick={e => this.onStateClick("Karnataka","KA")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Karnataka1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Karnataka.png")}/>
						<span className="karnatakaText mapTextLabel text-capitalize">Karnataka</span>
						<span className="karnatakaNumber mapCountLabel text-center">{this.search('KA')}</span>
					</div>
					
					<div className="tamilnadu classHover">
						<img src="Maps/India/TamilNadu.png" className="img-responsive "  onClick={e => this.onStateClick("TamilNadu","TN")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/TamilNadu1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/TamilNadu.png")}/>
						<span className="tamilnaduText mapTextLabel text-capitalize">Tamil Nadu</span>
						<span className="tamilnaduNumber mapCountLabel text-center">{this.search('TN')}</span>
					</div>
					<div className="andhrapradesh classHover">
						<img src="Maps/India/AndhraPradesh.png" className="img-responsive "  onClick={e => this.onStateClick("Andhra Pradesh","AD")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/AndhraPradesh1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/AndhraPradesh.png")}/>
						<span className="andhrapradeshText mapTextLabel text-capitalize">Andhra Pradesh</span>
						<span className="andhrapradeshNumber mapCountLabel text-center">{this.search('AP')}</span>
					</div>
					<div className="telangana classHover">
						<img src="Maps/India/Telangana.png" className="img-responsive "  onClick={e => this.onStateClick("Telangana","TS")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Telangana1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Telangana.png")}/>
						<span className="telanganaText mapTextLabel text-capitalize">Telangana</span>
						<span className="telanganaNumber mapCountLabel text-center">{this.search('TS')}</span>
					</div>
					<div className="orissa classHover">
						<img src="Maps/India/Orissa.png" className="img-responsive "  onClick={e => this.onStateClick("Odisha","OD")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Orissa1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Orissa.png")}/>
						<span className="orissaText mapTextLabel text-capitalize">Odisha</span>
						<span className="orissaNumber mapCountLabel text-center">{this.search('OD')}</span>
					</div>

					<div className="chhattisgarh classHover">
						<img src="Maps/India/Chhattisgarh.png" className="img-responsive "  onClick={e => this.onStateClick("Chhattisgarh","CG")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Chhattisgarh1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Chhattisgarh.png")}/>
						<span className="chhattisgarhText mapTextLabel text-capitalize">Chhattisgarh</span>
						<span className="chhattisgarhNumber mapCountLabel text-center">{this.search('CG')}</span>
					</div>
					
					<div className="uttarpradesh classHover">
						<img src="Maps/India/UttarPradesh.png" className="img-responsive "  onClick={e => this.onStateClick("uttar Pradesh","UP")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/UttarPradesh1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/UttarPradesh.png")}/>
						<span className="uttarpradeshText mapTextLabel text-capitalize">Uttar Pradesh</span>
						<span className="uttarpradeshNumber  text-center">{this.search('UP')}</span>
					</div>
					
					<div className="westbengal classHover">
						<img src="Maps/India/WestBengal.png" className="img-responsive "  onClick={e => this.onStateClick("West Bengal","WB")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/WestBengal1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/WestBengal.png")}/>
						<span className="westbengalText mapTextLabel text-capitalize">West Bengal</span>
						<span className="westbengalNumber mapCountLabel text-center">{this.search('WB')}</span>
					</div>

					<div className="bihar classHover">
						<img src="Maps/India/Bihar.png" className="img-responsive "  onClick={e => this.onStateClick("Bihar","BR")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Bihar1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Bihar.png")}/>
						<span className="biharText mapTextLabel text-capitalize">Bihar</span>
						<span className="biharNumber mapCountLabel text-center">{this.search('BR')}</span>
					</div>
					<div className="jharkhand classHover">
						<img src="Maps/India/Jharkhand.png" className="img-responsive "  onClick={e => this.onStateClick("Jharkhand","JH")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Jharkhand1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Jharkhand.png")}/>
						<span className="jharkhandText mapTextLabel text-capitalize">Jharkhand</span>
						<span className="jharkhandNumber  text-center">{this.search('JH')}</span>
					</div>
					<div className="sikkim classHover">
						<img src="Maps/India/Sikkim.png" className="img-responsive "  onClick={e => this.onStateClick("Sikkim","SK")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Sikkim1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Sikkim.png")}/>
						<span className="sikkimText mapTextLabel text-capitalize">Sikkim</span>
						<span className="sikkimNumber mapCountLabel text-center">{this.search('SK')}</span>
					</div>
					<div className="assam classHover">
						<img src="Maps/India/Assam.png" className="img-responsive "  onClick={e => this.onStateClick("Assam","AS")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Assam1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Assam.png")}/>
						<span className="assamText mapTextLabel text-capitalize">Assam</span>
						<span className="assamNumber mapCountLabel text-center">{this.search('AS')}</span>
					</div>
					<div className="meghalaya classHover">
						<img src="Maps/India/Meghalaya.png" className="img-responsive "  onClick={e => this.onStateClick("Meghalaya","ML")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Meghalaya1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Meghalaya.png")}/>
						<span className="meghalayaText mapTextLabel text-capitalize">Meghalaya</span>
						<span className="meghalayaNumber mapCountLabel text-center">{this.search('ML')}</span>
					</div>
					<div className="arunachalpradesh classHover">
						<img src="Maps/India/ArunachalPradesh.png" className="img-responsive "  onClick={e => this.onStateClick("Arunachal Pradesh","AR")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/ArunachalPradesh1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/ArunachalPradesh.png")}/>
						<span className="arunachalpradeshText mapTextLabel text-capitalize">Arunachal Pradesh</span>
						<span className="arunachalpradeshNumber mapCountLabel text-center">{this.search('AR')}</span>
					</div>
					<div className="nagaland classHover">
						<img src="Maps/India/Nagaland.png" className="img-responsive "  onClick={e => this.onStateClick("Nagaland","NL")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Nagaland1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Nagaland.png")}/>
						<span className="nagalandText mapTextLabel text-capitalize">Nagaland</span>
						<span className="nagalandNumber mapCountLabel text-center">{this.search('NL')}</span>
					</div>
					<div className="manipur classHover">
						<img src="Maps/India/Manipur.png" className="img-responsive "  onClick={e => this.onStateClick("Manipur","MN")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Manipur1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Manipur.png")}/>
						<span className="manipurText mapTextLabel text-capitalize">Manipur</span>
						<span className="manipurNumber mapCountLabel text-center">{this.search('MN')}</span>
					</div>
					<div className="mizoram classHover">
						<img src="Maps/India/Mizoram.png" className="img-responsive "  onClick={e => this.onStateClick("Mizoram","MZ")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Mizoram1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Mizoram.png")}/>
						<span className="mizoramText mapTextLabel text-capitalize">Mizoram</span>
						<span className="mizoramNumber mapCountLabel text-center">{this.search('MZ')}</span>
					</div>
					<div className="tripura classHover">
						<img src="Maps/India/Tripura.png" className="img-responsive "  onClick={e => this.onStateClick("Tripura","TR")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Tripura1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Tripura.png")}/>
						<span className="tripuraText mapTextLabel text-capitalize">Tripura</span>
						<span className="tripuraNumber mapCountLabel text-center">{this.search('TR')}</span>
					</div>

					<div className="kerala classHover">
						<img src="Maps/India/Kerala.png" className="img-responsive "  onClick={e => this.onStateClick("Kerala","KL")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Kerala1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Kerala.png")}/>
						<span className="keralaText mapTextLabel text-capitalize">Kerala</span>
						<span className="keralaNumber  text-center">{this.search('KL')}</span>
					</div>

					<div className="goa classHover">
						<img src="Maps/India/Goa.png" className="img-responsive "  onClick={e => this.onStateClick("Goa","GA")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Goa1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Goa.png")}/>
						<span className="goaText  mapTextLabel  text-capitalize">Goa</span>
						<span className="goaNumber mapCountLabel text-center">{this.search('GA')}</span>
					</div>

					<div className="chandigarh classHover">
						<img src="Maps/India/Chandigarh.png" className="img-responsive "   onMouseOver={e => (e.currentTarget.src = "/Maps/India/Chandigarh_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Chandigarh.png")}/>
						<span className="chandigarhText  mapTextLabel text-capitalize">Chandigarh</span>
						<span className="chandigarhNumber mapCountLabel text-center">{this.search('CH')}</span>
					</div>

					<div className="delhi classHover">
						<img src="Maps/India/Delhi_State.png" className="img-responsive "  onClick={e => this.onStateClick("Delhi","DL")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Delhi_State_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Delhi_State.png")}/>
						<span className="delhiText  mapTextLabel  text-capitalize">Delhi</span>
						<span className="delhiNumber mapCountLabel text-center">{this.search('DL')}</span>
					</div>

					<div className="andaman_nicobar classHover">
						<img src="Maps/India/Andman_Nicobar.png" className="img-responsive "  onMouseOver={e => (e.currentTarget.src = "/Maps/India/Andman_Nicobar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Andman_Nicobar.png")}/>
						<span className="andaman_nicobarText  mapTextLabel  text-capitalize">Andaman and Nicobar</span>
						<span className="andaman_nicobarNumber mapCountLabel text-center">{this.search('andaman and nicobar')}</span>
					</div>

					<div className="lakshadweep classHover">
						<img src="Maps/India/Lakshadweep.png" className="img-responsive "  onMouseOver={e => (e.currentTarget.src = "/Maps/India/Lakshadweep_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Lakshadweep.png")}/>
						<span className="lakshadweepText  mapTextLabel  text-capitalize">Lakshadweep</span>
						<span className="lakshadweepNumber mapCountLabel text-center">{this.search('lakshadweep')}</span>
					</div>

					<div className="dadraNagarHaveli classHover">
						<img src="Maps/India/Dadra_Nagar_Haveli.png" className="img-responsive "  onMouseOver={e => (e.currentTarget.src = "/Maps/India/Dadra_Nagar_Haveli_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Dadra_Nagar_Haveli.png")}/>
						<span className="dadraNagarHaveliText  mapTextLabel  text-capitalize">D.N.H.</span>
						<span className="dadraNagarHaveliNumber mapCountLabel text-center">{this.search('dadra nagar haveli')}</span>
					</div>

					<div className="damanDiu classHover">
						<img src="Maps/India/Daman_Diu.png" className="img-responsive "  onMouseOver={e => (e.currentTarget.src = "/Maps/India/Daman_Diu_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Dadra_Nagar_Haveli.png")}/>
						<span className="damanDiuText  mapTextLabel  text-capitalize">D.D.</span>
						<span className="damanDiuNumber mapCountLabel text-center">{this.search('daman diu')}</span>
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