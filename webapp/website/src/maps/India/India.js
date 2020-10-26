import React, {Component} from 'react';
import Axios 				from 'axios';
import Swal 				from 'sweetalert2';
import LeftMenu from '../../common/LeftMenu/LeftMenu.js';
import LeftSideFilters from '../../common/LeftSideFilters/LeftSideFilters.js';
import '../global.css';
import './india.css';


export default class India extends Component{
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
	render(){
		return(
			<section className="mapWrapper">

				<div className="india">
					<div className="ks">
						<img src="Maps/India/Kashmir.png" className="kashmir" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Kashmir1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Kashmir.png")}/>
						<span className="kashmir kashmirText">Kashmir</span>
						<span className="kashmir kashmirNumber">10</span>
					</div>

					<div className="ld">
						<img src="Maps/India/Ladakh.png" className="ladakh" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Ladakh1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Ladakh.png")}/>
					</div>

					<div className="pb">
						<img src="Maps/India/Punjab.png" className="punjab" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Punjab1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Punjab.png")}/>
					</div>

					<div className="hp">
						<img src="Maps/India/HimachalPradesh.png" className="himachal" onMouseOver={e => (e.currentTarget.src = "/Maps/India/HimachalPradesh1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/HimachalPradesh.png")}/>
					</div>

					<div className="uk">
						<img src="Maps/India/Uttarakhand.png" className="uttarakhand" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Uttarakhand1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Uttarakhand.png")}/>
					</div>

					<div className="hr">
						<img src="Maps/India/Haryana.png" className="haryana" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Haryana1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Haryana.png")}/>
					</div>

					<div className="rj">
						<img src="Maps/India/Rajasthan.png" className="rajasthan" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Rajasthan1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Rajasthan.png")}/>
					</div>

					<div className="gj">
						<img src="Maps/India/Gujrat.png" className="gujrat" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Gujrat1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Gujrat.png")}/>
					</div>

					<div className="mh">
						<img src="Maps/India/Maharashtra.png" className="maharashtra" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Maharashtra1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Maharashtra.png")}/>
					</div>
					
					<div className="mp">
						<img src="Maps/India/MadhyaPradesh.png" className="madhyapradesh" onMouseOver={e => (e.currentTarget.src = "/Maps/India/MadhyaPradesh1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/MadhyaPradesh.png")}/>
					</div>
					
					<div className="go">
						<img src="Maps/India/Goa.png" className="goa" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Goa1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Goa.png")}/>
					</div>
					<div className="ka">
						<img src="Maps/India/Karnataka.png" className="karnataka" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Karnataka1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Karnataka.png")}/>
					</div>
					<div className="ke">
						<img src="Maps/India/Kerala.png" className="kerala" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Kerala1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Kerala.png")}/>
					</div>
					<div className="tn">
						<img src="Maps/India/TamilNadu.png" className="tamilnadu" onMouseOver={e => (e.currentTarget.src = "/Maps/India/TamilNadu1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/TamilNadu.png")}/>
					</div>
					<div className="ap">
						<img src="Maps/India/AndhraPradesh.png" className="andhrapradesh" onMouseOver={e => (e.currentTarget.src = "/Maps/India/AndhraPradesh1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/AndhraPradesh.png")}/>
					</div>
					<div className="tl">
						<img src="Maps/India/Telangana.png" className="telangana" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Telangana1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Telangana.png")}/>
					</div>
					<div className="or">
						<img src="Maps/India/Orissa.png" className="orissa" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Orissa1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Orissa.png")}/>
					</div>

					<div className="ch">
						<img src="Maps/India/Chhattisgarh.png" className="chhattisgarh" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Chhattisgarh1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Chhattisgarh.png")}/>
					</div>
					
					<div className="up">
						<img src="Maps/India/UttarPradesh.png" className="uttarpradesh" onMouseOver={e => (e.currentTarget.src = "/Maps/India/UttarPradesh1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/UttarPradesh.png")}/>
					</div>
					
					<div className="wb">
						<img src="Maps/India/WestBengal.png" className="westbengal" onMouseOver={e => (e.currentTarget.src = "/Maps/India/WestBengal1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/WestBengal.png")}/>
					</div>

					<div className="bi">
						<img src="Maps/India/Bihar.png" className="bihar" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Bihar1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Bihar.png")}/>
					</div>
					<div className="wb">
						<img src="Maps/India/Jharkhand.png" className="jharkhand" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Jharkhand1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Jharkhand.png")}/>
					</div>
					<div className="sk">
						<img src="Maps/India/Sikkim.png" className="sikkim" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Sikkim1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Sikkim.png")}/>
					</div>
					<div className="as">
						<img src="Maps/India/Assam.png" className="assam" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Assam1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Assam.png")}/>
					</div>
					<div className="mg">
						<img src="Maps/India/Meghalaya.png" className="meghalaya" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Meghalaya1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Meghalaya.png")}/>
					</div>
					<div className="ar">
						<img src="Maps/India/ArunachalPradesh.png" className="arunachalpradesh" onMouseOver={e => (e.currentTarget.src = "/Maps/India/ArunachalPradesh1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/ArunachalPradesh.png")}/>
					</div>
					<div className="ng">
						<img src="Maps/India/Nagaland.png" className="nagaland" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Nagaland1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Nagaland.png")}/>
					</div>
					<div className="mn">
						<img src="Maps/India/Manipur.png" className="manipur" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Manipur1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Manipur.png")}/>
					</div>
					<div className="mz">
						<img src="Maps/India/Mizoram.png" className="mizoram" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Mizoram1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Mizoram.png")}/>
					</div>
					<div className="tr">
						<img src="Maps/India/Tripura.png" className="tripura" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Tripura1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Tripura.png")}/>
					</div>
				</div>
			</section>
		);
	}
}