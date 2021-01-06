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
		Axios.get("/api/map/list")
			.then(response => {
				this.setState({stateWiseJobs : response.data.stateJobsList });
				
			})
			.catch(error=>{
				Swal.fire("Error while getting List data",error.message,'error');
			});
	}
	search(nameKey){
		//console.log(this.props.mapJobs)
	    for (var i=0; i < this.props.mapJobs.length; i++) {
	        if (this.props.mapJobs[i]._id === nameKey) {
	            return this.props.mapJobs[i].count;
	        }
	    }
	}
	onStateClick = (stateName) => {
		var routeName = "/"+stateName;
		var {mapAction} = this.props;

		mapAction.setMapSelectedState(stateName);
		//window.location.href = routeName
		this.props.history.push(routeName);
	}
	render(){
		return(
			<section className="mapWrapper">
				<div className="india">
					
					<div className="jammuKashmir classHover">
						<img src="Maps/India/JammuKashmir.png" className="img-responsive "  onClick={e => this.onStateClick("Jammu And Kashmir")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Jammu_Kashmir_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/JammuKashmir.png")}/>
						<span className="jammuKashmirText  mapTextLabel text-capitalize">Jammu and Kashmir</span>
						<span className="jammuKashmirNumber mapCountLabel text-center">{this.search('Jammu and Kashmir')}</span>
					</div>


					<div className="punjab classHover">
						<img src="Maps/India/Punjab.png" className="img-responsive "  onClick={e => this.onStateClick("Punjab")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Punjab1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Punjab.png")}/>
						<span className="punjabText  mapTextLabel text-capitalize">Punjab</span>
						<span className="punjabNumber mapCountLabel text-center">{this.search('Punjab')}</span>
					</div>

					<div className="himachal classHover">
						<img src="Maps/India/HimachalPradesh.png" className="img-responsive "  onClick={e => this.onStateClick("HimachalPradesh")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/HimachalPradesh1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/HimachalPradesh.png")}/>
						<span className="himachalText mapTextLabel text-capitalize">Himachal Pradesh</span>
						<span className="himachalNumber mapCountLabel text-center">{this.search('Himachal Pradesh')}</span>
					</div>

					<div className="uttarakhand classHover">
						<img src="Maps/India/Uttarakhand.png" className="img-responsive "  onClick={e => this.onStateClick("Uttarakhand")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Uttarakhand1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Uttarakhand.png")}/>
						<span className="uttarakhandText mapTextLabel text-capitalize">Uttarakhand</span>
						<span className="uttarakhandNumber mapCountLabel text-center">{this.search('Uttarakhand')}</span>
					</div>

					<div className="haryana classHover">
						<img src="Maps/India/Haryana.png" className="img-responsive "  onClick={e => this.onStateClick("Haryana")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Haryana1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Haryana.png")}/>
						<span className="haryanaText mapTextLabel text-capitalize">Haryana</span>
						<span className="haryanaNumber mapCountLabel text-center">{this.search('Haryana')}</span>
					</div>

					<div className="rajasthan classHover">
						<img src="Maps/India/Rajasthan.png" className="img-responsive "  onClick={e => this.onStateClick("Rajasthan")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Rajasthan1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Rajasthan.png")}/>
						<span className="rajasthanText mapTextLabel text-capitalize">Rajasthan</span>
						<span className="rajasthanNumber mapCountLabel text-center">{this.search('Rajasthan')}</span>
					</div>

					<div className="gujrat classHover">
						<img src="Maps/India/Gujrat.png" className="img-responsive "  onClick={e => this.onStateClick("Gujarat")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Gujrat1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Gujrat.png")}/>
						<span className="gujratText mapTextLabel text-capitalize">Gujarat</span>
						<span className="gujratNumber mapCountLabel text-center">{this.search('Gujarat')}</span>
					</div>

					<div className="maharashtra classHover">
						<img src="Maps/India/Maharashtra.png" id="imageid" className="img-responsive"  onClick={e => this.onStateClick("Maharashtra")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Maharashtra1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Maharashtra.png")}/>
						<span className="maharashtraText  mapTextLabel  text-capitalize">Maharashtra</span>
						<span className="maharashtraNumber mapCountLabel text-center">{this.search('Maharashtra')}</span>
					</div>
					
					<div className="madhyapradesh classHover">
						<img src="Maps/India/MadhyaPradesh.png" className="img-responsive"  onClick={e => this.onStateClick("MadhyaPradesh")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/MadhyaPradesh1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/MadhyaPradesh.png")}/>
						<span className="madhyapradeshText mapTextLabel text-capitalize">Madhya Pradesh</span>
						<span className="madhyapradeshNumber mapCountLabel text-center">{this.search('Madhya Pradesh')}</span>
					</div>
					
					<div className="goa classHover">
						<img src="Maps/India/Goa.png" className="img-responsive "  onClick={e => this.onStateClick("Goa")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Goa1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Goa.png")}/>
						<span className="goaText  mapTextLabel  text-capitalize">Goa</span>
						<span className="goaNumber mapCountLabel text-center">{this.search('Goa')}</span>
					</div>
					<div className="karnataka classHover">
						<img src="Maps/India/Karnataka.png" className="img-responsive "  onClick={e => this.onStateClick("Karnataka")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Karnataka1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Karnataka.png")}/>
						<span className="karnatakaText mapTextLabel text-capitalize">Karnataka</span>
						<span className="karnatakaNumber mapCountLabel text-center">{this.search('Karnataka')}</span>
					</div>
					<div className="kerala classHover">
						<img src="Maps/India/Kerala.png" className="img-responsive "  onClick={e => this.onStateClick("Kerala")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Kerala1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Kerala.png")}/>
						<span className="keralaText mapTextLabel text-capitalize">Kerala</span>
						<span className="keralaNumber  text-center">{this.search('Kerala')}</span>
					</div>
					<div className="tamilnadu classHover">
						<img src="Maps/India/TamilNadu.png" className="img-responsive "  onClick={e => this.onStateClick("TamilNadu")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/TamilNadu1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/TamilNadu.png")}/>
						<span className="tamilnaduText mapTextLabel text-capitalize">Tamil Nadu</span>
						<span className="tamilnaduNumber mapCountLabel text-center">{this.search('Tamil Nadu')}</span>
					</div>
					<div className="andhrapradesh classHover">
						<img src="Maps/India/AndhraPradesh.png" className="img-responsive "  onClick={e => this.onStateClick("AndhraPradesh")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/AndhraPradesh1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/AndhraPradesh.png")}/>
						<span className="andhrapradeshText mapTextLabel text-capitalize">Andhra Pradesh</span>
						<span className="andhrapradeshNumber mapCountLabel text-center">{this.search('Andhra Pradesh')}</span>
					</div>
					<div className="telangana classHover">
						<img src="Maps/India/Telangana.png" className="img-responsive "  onClick={e => this.onStateClick("Telangana")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Telangana1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Telangana.png")}/>
						<span className="telanganaText mapTextLabel text-capitalize">Telangana</span>
						<span className="telanganaNumber mapCountLabel text-center">{this.search('Telangana')}</span>
					</div>
					<div className="orissa classHover">
						<img src="Maps/India/Orissa.png" className="img-responsive "  onClick={e => this.onStateClick("Odisha")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Orissa1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Orissa.png")}/>
						<span className="orissaText mapTextLabel text-capitalize">Odisha</span>
						<span className="orissaNumber mapCountLabel text-center">{this.search('Odisha')}</span>
					</div>

					<div className="chhattisgarh classHover">
						<img src="Maps/India/Chhattisgarh.png" className="img-responsive "  onClick={e => this.onStateClick("Chhattisgarh")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Chhattisgarh1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Chhattisgarh.png")}/>
						<span className="chhattisgarhText mapTextLabel text-capitalize">Chhattisgarh</span>
						<span className="chhattisgarhNumber mapCountLabel text-center">{this.search('Chhattisgarh')}</span>
					</div>
					
					<div className="uttarpradesh classHover">
						<img src="Maps/India/UttarPradesh.png" className="img-responsive "  onClick={e => this.onStateClick("uttarPradesh")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/UttarPradesh1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/UttarPradesh.png")}/>
						<span className="uttarpradeshText mapTextLabel text-capitalize">Uttar Pradesh</span>
						<span className="uttarpradeshNumber  text-center">{this.search('Uttar Pradesh')}</span>
					</div>
					
					<div className="westbengal classHover">
						<img src="Maps/India/WestBengal.png" className="img-responsive "  onClick={e => this.onStateClick("WestBengal")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/WestBengal1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/WestBengal.png")}/>
						<span className="westbengalText mapTextLabel text-capitalize">West Bengal</span>
						<span className="westbengalNumber mapCountLabel text-center">{this.search('West Bengal')}</span>
					</div>

					<div className="bihar classHover">
						<img src="Maps/India/Bihar.png" className="img-responsive "  onClick={e => this.onStateClick("Bihar")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Bihar1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Bihar.png")}/>
						<span className="biharText mapTextLabel text-capitalize">Bihar</span>
						<span className="biharNumber mapCountLabel text-center">{this.search('Bihar')}</span>
					</div>
					<div className="jharkhand classHover">
						<img src="Maps/India/Jharkhand.png" className="img-responsive "  onClick={e => this.onStateClick("Jharkhand")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Jharkhand1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Jharkhand.png")}/>
						<span className="jharkhandText mapTextLabel text-capitalize">Jharkhand</span>
						<span className="jharkhandNumber  text-center">{this.search('Jharkhand')}</span>
					</div>
					<div className="sikkim classHover">
						<img src="Maps/India/Sikkim.png" className="img-responsive "  onClick={e => this.onStateClick("Sikkim")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Sikkim1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Sikkim.png")}/>
						<span className="sikkimText mapTextLabel text-capitalize">Sikkim</span>
						<span className="sikkimNumber mapCountLabel text-center">{this.search('Sikkim')}</span>
					</div>
					<div className="assam classHover">
						<img src="Maps/India/Assam.png" className="img-responsive "  onClick={e => this.onStateClick("Assam")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Assam1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Assam.png")}/>
						<span className="assamText mapTextLabel text-capitalize">Assam</span>
						<span className="assamNumber mapCountLabel text-center">{this.search('Assam')}</span>
					</div>
					<div className="meghalaya classHover">
						<img src="Maps/India/Meghalaya.png" className="img-responsive "  onClick={e => this.onStateClick("Meghalaya")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Meghalaya1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Meghalaya.png")}/>
						<span className="meghalayaText mapTextLabel text-capitalize">Meghalaya</span>
						<span className="meghalayaNumber mapCountLabel text-center">{this.search('Meghalaya')}</span>
					</div>
					<div className="arunachalpradesh classHover">
						<img src="Maps/India/ArunachalPradesh.png" className="img-responsive "  onClick={e => this.onStateClick("ArunachalPradesh")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/ArunachalPradesh1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/ArunachalPradesh.png")}/>
						<span className="arunachalpradeshText mapTextLabel text-capitalize">Arunachal Pradesh</span>
						<span className="arunachalpradeshNumber mapCountLabel text-center">{this.search('Arunachal Pradesh')}</span>
					</div>
					<div className="nagaland classHover">
						<img src="Maps/India/Nagaland.png" className="img-responsive "  onClick={e => this.onStateClick("Nagaland")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Nagaland1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Nagaland.png")}/>
						<span className="nagalandText mapTextLabel text-capitalize">Nagaland</span>
						<span className="nagalandNumber mapCountLabel text-center">{this.search('Nagaland')}</span>
					</div>
					<div className="manipur classHover">
						<img src="Maps/India/Manipur.png" className="img-responsive "  onClick={e => this.onStateClick("Manipur")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Manipur1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Manipur.png")}/>
						<span className="manipurText mapTextLabel text-capitalize">Manipur</span>
						<span className="manipurNumber mapCountLabel text-center">{this.search('Manipur')}</span>
					</div>
					<div className="mizoram classHover">
						<img src="Maps/India/Mizoram.png" className="img-responsive "  onClick={e => this.onStateClick("Mizoram")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Mizoram1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Mizoram.png")}/>
						<span className="mizoramText mapTextLabel text-capitalize">Mizoram</span>
						<span className="mizoramNumber mapCountLabel text-center">{this.search('Mizoram')}</span>
					</div>
					<div className="tripura classHover">
						<img src="Maps/India/Tripura.png" className="img-responsive "  onClick={e => this.onStateClick("Tripura")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Tripura1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Tripura.png")}/>
						<span className="tripuraText mapTextLabel text-capitalize">Tripura</span>
						<span className="tripuraNumber mapCountLabel text-center">{this.search('Tripura')}</span>
					</div>
				</div>
			</section>
		);
	}
}

const mapStateToProps = (state)=>{
    return {
        selectedState  		: state.selectedState,
        mapJobs           	: state.mapJobs,
    }
}
const mapDispatchToProps = (dispatch) => ({
	mapAction :  bindActionCreators(mapActionCreator, dispatch)
    //return bindActionCreators({ setMapSelectedStateFun : setMapSelectedState }, dispatch);  
}) 
export default connect(mapStateToProps, mapDispatchToProps) (withRouter(India));