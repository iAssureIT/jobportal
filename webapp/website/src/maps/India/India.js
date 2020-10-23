import React, {Component} from 'react';
import Axios 				from 'axios';
import Swal 				from 'sweetalert2';

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
			<section class="mapWrapper">
				<div class="india">
					<div class="ks">
						<img src="Maps/India/Kashmir.png" class="kashmir" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Kashmir1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Kashmir.png")}/>
					</div>

					<div class="ld">
						<img src="Maps/India/Ladakh.png" class="ladakh" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Ladakh1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Ladakh.png")}/>
					</div>

					<div class="pb">
						<img src="Maps/India/Punjab.png" class="punjab" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Punjab1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Punjab.png")}/>
					</div>

					<div class="hp">
						<img src="Maps/India/HimachalPradesh.png" class="himachal" onMouseOver={e => (e.currentTarget.src = "/Maps/India/HimachalPradesh1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/HimachalPradesh.png")}/>
					</div>

					<div class="uk">
						<img src="Maps/India/Uttarakhand.png" class="uttarakhand" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Uttarakhand1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Uttarakhand.png")}/>
					</div>

					<div class="hr">
						<img src="Maps/India/Haryana.png" class="haryana" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Haryana1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Haryana.png")}/>
					</div>

					<div class="rj">
						<img src="Maps/India/Rajasthan.png" class="rajasthan" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Rajasthan1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Rajasthan.png")}/>
					</div>

					<div class="gj">
						<img src="Maps/India/Gujrat.png" class="gujrat" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Gujrat1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Gujrat.png")}/>
					</div>

					<div class="mh">
						<img src="Maps/India/Maharashtra.png" class="maharashtra" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Maharashtra1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Maharashtra.png")}/>
					</div>
					
					<div class="mp">
						<img src="Maps/India/MadhyaPradesh.png" class="madhyapradesh" onMouseOver={e => (e.currentTarget.src = "/Maps/India/MadhyaPradesh1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/MadhyaPradesh.png")}/>
					</div>
					
					<div class="go">
						<img src="Maps/India/Goa.png" class="goa" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Goa1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Goa.png")}/>
					</div>
					<div class="ka">
						<img src="Maps/India/Karnataka.png" class="karnataka" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Karnataka1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Karnataka.png")}/>
					</div>
					<div class="ke">
						<img src="Maps/India/Kerala.png" class="kerala" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Kerala1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Kerala.png")}/>
					</div>
					<div class="tn">
						<img src="Maps/India/TamilNadu.png" class="tamilnadu" onMouseOver={e => (e.currentTarget.src = "/Maps/India/TamilNadu1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/TamilNadu.png")}/>
					</div>
					<div class="ap">
						<img src="Maps/India/AndhraPradesh.png" class="andhrapradesh" onMouseOver={e => (e.currentTarget.src = "/Maps/India/AndhraPradesh1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/AndhraPradesh.png")}/>
					</div>
					<div class="tl">
						<img src="Maps/India/Telangana.png" class="telangana" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Telangana1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Telangana.png")}/>
					</div>
					<div class="or">
						<img src="Maps/India/Orissa.png" class="orissa" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Orissa1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Orissa.png")}/>
					</div>

					<div class="ch">
						<img src="Maps/India/Chhattisgarh.png" class="chhattisgarh" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Chhattisgarh1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Chhattisgarh.png")}/>
					</div>
					
					<div class="up">
						<img src="Maps/India/UttarPradesh.png" class="uttarpradesh" onMouseOver={e => (e.currentTarget.src = "/Maps/India/UttarPradesh1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/UttarPradesh.png")}/>
					</div>
					
					<div class="wb">
						<img src="Maps/India/WestBengal.png" class="westbengal" onMouseOver={e => (e.currentTarget.src = "/Maps/India/WestBengal1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/WestBengal.png")}/>
					</div>

					<div class="bi">
						<img src="Maps/India/Bihar.png" class="bihar" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Bihar1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Bihar.png")}/>
					</div>
					<div class="wb">
						<img src="Maps/India/Jharkhand.png" class="jharkhand" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Jharkhand1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Jharkhand.png")}/>
					</div>
					<div class="sk">
						<img src="Maps/India/Sikkim.png" class="sikkim" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Sikkim1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Sikkim.png")}/>
					</div>
					<div class="as">
						<img src="Maps/India/Assam.png" class="assam" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Assam1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Assam.png")}/>
					</div>
					<div class="mg">
						<img src="Maps/India/Meghalaya.png" class="meghalaya" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Meghalaya1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Meghalaya.png")}/>
					</div>
					<div class="ar">
						<img src="Maps/India/ArunachalPradesh.png" class="arunachalpradesh" onMouseOver={e => (e.currentTarget.src = "/Maps/India/ArunachalPradesh1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/ArunachalPradesh.png")}/>
					</div>
					<div class="ng">
						<img src="Maps/India/Nagaland.png" class="nagaland" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Nagaland1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Nagaland.png")}/>
					</div>
					<div class="mn">
						<img src="Maps/India/Manipur.png" class="manipur" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Manipur1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Manipur.png")}/>
					</div>
					<div class="mz">
						<img src="Maps/India/Mizoram.png" class="mizoram" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Mizoram1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Mizoram.png")}/>
					</div>
					<div class="tr">
						<img src="Maps/India/Tripura.png" class="tripura" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Tripura1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Tripura.png")}/>
					</div>
				</div>
			</section>
		);
	}
}