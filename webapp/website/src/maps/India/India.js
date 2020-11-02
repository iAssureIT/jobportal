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
				console.log("getStateWiseJobs response.data = ",response.data);
				this.setState({stateWiseJobs : response.data.stateJobsList });
				console.log("stateWiseJobs",this.state.stateWiseJobs);
			})
			.catch(error=>{
				Swal.fire("Error while getting List data",error.message,'error');
			});
	}
	search(nameKey){
		const stateArray = this.state.stateWiseJobs;
	    for (var i=0; i < stateArray.length; i++) {
	        if (stateArray[i].stateName === nameKey) {
	            return stateArray[i].numberOfJobs;
	        }
	    }
	}
	onStateClick = (stateName) => {
		var routeName = "/"+stateName;
		var {mapAction} = this.props;

		mapAction.setMapSelectedState(stateName);
		window.location.href = routeName
		//this.props.history.push(routeName);
	}
	render(){
		return(
			<section className="mapWrapper">
				<div className="india">
					<div className="kashmir">
						<img src="Maps/India/Kashmir.png" className="img-responsive" onClick={e => this.onStateClick("Jammu And Kashmir")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Kashmir1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Kashmir.png")}/>
						<span className="kashmirText text-capitalize">Jammu And Kashmir</span>
						<span className="kashmirNumber  text-center">{this.search('Jammu And Kashmir')}</span>
					</div>

					<div className="ladakh">
						<img src="Maps/India/Ladakh.png" className="img-responsive "  onClick={e => this.onStateClick("kashmir")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Ladakh1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Ladakh.png")}/>
						<span className="ladakhText  text-capitalize">ladakh</span>
						<span className="ladakhNumber  text-center">{this.search('ladakh')}</span>
					</div>

					<div className="punjab">
						<img src="Maps/India/Punjab.png" className="img-responsive "  onClick={e => this.onStateClick("punjab")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Punjab1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Punjab.png")}/>
						<span className="punjabText  text-capitalize">punjab</span>
						<span className="punjabNumber  text-center">{this.search('punjab')}</span>
					</div>

					<div className="himachal">
						<img src="Maps/India/HimachalPradesh.png" className="img-responsive "  onClick={e => this.onStateClick("Himachal Pradesh")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/HimachalPradesh1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/HimachalPradesh.png")}/>
						<span className="himachalText  text-capitalize">Himachal Pradesh</span>
						<span className="himachalNumber  text-center">{this.search('Himachal Pradesh')}</span>
					</div>

					<div className="uttarakhand">
						<img src="Maps/India/Uttarakhand.png" className="img-responsive "  onClick={e => this.onStateClick("uttarakhand")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Uttarakhand1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Uttarakhand.png")}/>
						<span className="uttarakhandText  text-capitalize">uttarakhand</span>
						<span className="uttarakhandNumber  text-center">{this.search('uttarakhand')}</span>
					</div>

					<div className="haryana">
						<img src="Maps/India/Haryana.png" className="img-responsive "  onClick={e => this.onStateClick("Haryana")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Haryana1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Haryana.png")}/>
						<span className="haryanaText  text-capitalize">Haryana</span>
						<span className="haryanaNumber  text-center">{this.search('Haryana')}</span>
					</div>

					<div className="rajasthan">
						<img src="Maps/India/Rajasthan.png" className="img-responsive "  onClick={e => this.onStateClick("Rajasthan")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Rajasthan1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Rajasthan.png")}/>
						<span className="rajasthanText  text-capitalize">Rajasthan</span>
						<span className="rajasthanNumber  text-center">{this.search('Rajasthan')}</span>
					</div>

					<div className="gujrat">
						<img src="Maps/India/Gujrat.png" className="img-responsive "  onClick={e => this.onStateClick("Gujarat")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Gujrat1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Gujrat.png")}/>
						<span className="gujratText  text-capitalize">Gujarat</span>
						<span className="gujratNumber  text-center">{this.search('Gujarat')}</span>
					</div>

					<div className="maharashtra">
						<img src="Maps/India/Maharashtra.png" id="imageid" className="img-responsive"  onClick={e => this.onStateClick("Maharashtra")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Maharashtra1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Maharashtra.png")}/>
						<span className="maharashtraText    text-capitalize">Maharashtra</span>
						<span className="maharashtraNumber  text-center">{this.search('Maharashtra')}</span>
					</div>
					
					<div className="madhyapradesh">
						<img src="Maps/India/MadhyaPradesh.png" className="img-responsive"  onClick={e => this.onStateClick("Madhya Pradesh")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/MadhyaPradesh1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/MadhyaPradesh.png")}/>
						<span className="madhyapradeshText  text-capitalize">Madhya Pradesh</span>
						<span className="madhyapradeshNumber  text-center">{this.search('Madhya Pradesh')}</span>
					</div>
					
					<div className="goa">
						<img src="Maps/India/Goa.png" className="img-responsive "  onClick={e => this.onStateClick("Goa")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Goa1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Goa.png")}/>
						<span className="goaText    text-capitalize">Goa</span>
						<span className="goaNumber  text-center">{this.search('Goa')}</span>
					</div>
					<div className="karnataka">
						<img src="Maps/India/Karnataka.png" className="img-responsive "  onClick={e => this.onStateClick("Karnataka")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Karnataka1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Karnataka.png")}/>
						<span className="karnatakaText  text-capitalize">Karnataka</span>
						<span className="karnatakaNumber  text-center">{this.search('Karnataka')}</span>
					</div>
					<div className="kerala">
						<img src="Maps/India/Kerala.png" className="img-responsive "  onClick={e => this.onStateClick("Kerala")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Kerala1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Kerala.png")}/>
						<span className="keralaText  text-capitalize">Kerala</span>
						<span className="keralaNumber  text-center">{this.search('Kerala')}</span>
					</div>
					<div className="tamilnadu">
						<img src="Maps/India/TamilNadu.png" className="img-responsive "  onClick={e => this.onStateClick("tamilnadu")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/TamilNadu1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/TamilNadu.png")}/>
						<span className="tamilnaduText  text-capitalize">tamilnadu</span>
						<span className="tamilnaduNumber  text-center">{this.search('tamilnadu')}</span>
					</div>
					<div className="andhrapradesh">
						<img src="Maps/India/AndhraPradesh.png" className="img-responsive "  onClick={e => this.onStateClick("Andhra Pradesh")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/AndhraPradesh1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/AndhraPradesh.png")}/>
						<span className="andhrapradeshText  text-capitalize">Andhra Pradesh</span>
						<span className="andhrapradeshNumber  text-center">{this.search('Andhra Pradesh')}</span>
					</div>
					<div className="telangana">
						<img src="Maps/India/Telangana.png" className="img-responsive "  onClick={e => this.onStateClick("telangana")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Telangana1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Telangana.png")}/>
						<span className="telanganaText  text-capitalize">telangana</span>
						<span className="telanganaNumber  text-center">{this.search('telangana')}</span>
					</div>
					<div className="orissa">
						<img src="Maps/India/Orissa.png" className="img-responsive "  onClick={e => this.onStateClick("orissa")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Orissa1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Orissa.png")}/>
						<span className="orissaText  text-capitalize">orissa</span>
						<span className="orissaNumber  text-center">{this.search('orissa')}</span>
					</div>

					<div className="chhattisgarh">
						<img src="Maps/India/Chhattisgarh.png" className="img-responsive "  onClick={e => this.onStateClick("Chhattisgarh")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Chhattisgarh1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Chhattisgarh.png")}/>
						<span className="chhattisgarhText  text-capitalize">Chhattisgarh</span>
						<span className="chhattisgarhNumber  text-center">{this.search('Chhattisgarh')}</span>
					</div>
					
					<div className="uttarpradesh">
						<img src="Maps/India/UttarPradesh.png" className="img-responsive "  onClick={e => this.onStateClick("uttarPradesh")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/UttarPradesh1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/UttarPradesh.png")}/>
						<span className="uttarpradeshText  text-capitalize">uttar pradesh</span>
						<span className="uttarpradeshNumber  text-center">{this.search('uttarpradesh')}</span>
					</div>
					
					<div className="westbengal">
						<img src="Maps/India/WestBengal.png" className="img-responsive "  onClick={e => this.onStateClick("westBengal")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/WestBengal1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/WestBengal.png")}/>
						<span className="westbengalText  text-capitalize">west bengal</span>
						<span className="westbengalNumber  text-center">{this.search('westbengal')}</span>
					</div>

					<div className="bihar">
						<img src="Maps/India/Bihar.png" className="img-responsive "  onClick={e => this.onStateClick("Bihar")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Bihar1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Bihar.png")}/>
						<span className="biharText  text-capitalize">Bihar</span>
						<span className="biharNumber  text-center">{this.search('Bihar')}</span>
					</div>
					<div className="jharkhand">
						<img src="Maps/India/Jharkhand.png" className="img-responsive "  onClick={e => this.onStateClick("Jharkhand")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Jharkhand1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Jharkhand.png")}/>
						<span className="jharkhandText  text-capitalize">Jharkhand</span>
						<span className="jharkhandNumber  text-center">{this.search('Jharkhand')}</span>
					</div>
					<div className="sikkim">
						<img src="Maps/India/Sikkim.png" className="img-responsive "  onClick={e => this.onStateClick("sikkim")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Sikkim1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Sikkim.png")}/>
						<span className="sikkimText  text-capitalize">sikkim</span>
						<span className="sikkimNumber  text-center">{this.search('sikkim')}</span>
					</div>
					<div className="assam">
						<img src="Maps/India/Assam.png" className="img-responsive "  onClick={e => this.onStateClick("Assam")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Assam1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Assam.png")}/>
						<span className="assamText  text-capitalize">Assam</span>
						<span className="assamNumber  text-center">{this.search('Assam')}</span>
					</div>
					<div className="meghalaya">
						<img src="Maps/India/Meghalaya.png" className="img-responsive "  onClick={e => this.onStateClick("Meghalaya")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Meghalaya1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Meghalaya.png")}/>
						<span className="meghalayaText  text-capitalize">Meghalaya</span>
						<span className="meghalayaNumber  text-center">{this.search('Meghalaya')}</span>
					</div>
					<div className="arunachalpradesh">
						<img src="Maps/India/ArunachalPradesh.png" className="img-responsive "  onClick={e => this.onStateClick("Arunachal Pradesh")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/ArunachalPradesh1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/ArunachalPradesh.png")}/>
						<span className="arunachalpradeshText  text-capitalize">Arunachal Pradesh</span>
						<span className="arunachalpradeshNumber  text-center">{this.search('Arunachal Pradesh')}</span>
					</div>
					<div className="nagaland">
						<img src="Maps/India/Nagaland.png" className="img-responsive "  onClick={e => this.onStateClick("Nagaland")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Nagaland1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Nagaland.png")}/>
						<span className="nagalandText  text-capitalize">Nagaland</span>
						<span className="nagalandNumber  text-center">{this.search('Nagaland')}</span>
					</div>
					<div className="manipur">
						<img src="Maps/India/Manipur.png" className="img-responsive "  onClick={e => this.onStateClick("Manipur")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Manipur1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Manipur.png")}/>
						<span className="manipurText  text-capitalize">Manipur</span>
						<span className="manipurNumber  text-center">{this.search('Manipur')}</span>
					</div>
					<div className="mizoram">
						<img src="Maps/India/Mizoram.png" className="img-responsive "  onClick={e => this.onStateClick("Mizoram")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Mizoram1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Mizoram.png")}/>
						<span className="mizoramText  text-capitalize">Mizoram</span>
						<span className="mizoramNumber  text-center">{this.search('Mizoram')}</span>
					</div>
					<div className="tripura">
						<img src="Maps/India/Tripura.png" className="img-responsive "  onClick={e => this.onStateClick("tripura")} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Tripura1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Tripura.png")}/>
						<span className="tripuraText  text-capitalize">tripura</span>
						<span className="tripuraNumber  text-center">{this.search('tripura')}</span>
					</div>
				</div>
			</section>
		);
	}
}

const mapStateToProps = (state)=>{
    return {
        selectedState  : state.selectedState
    }
}
const mapDispachToProps = (dispatch) => ({
	mapAction :  bindActionCreators(mapActionCreator, dispatch)
    //return bindActionCreators({ setMapSelectedStateFun : setMapSelectedState }, dispatch);  
}) 
export default connect(mapStateToProps, mapDispachToProps) (withRouter(India));