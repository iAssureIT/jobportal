import React, {Component} from 'react';
import Axios 				from 'axios';
import Swal 				from 'sweetalert2';
import {Redirect} from 'react-router-dom';

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
	search(nameKey){
		const stateArray = this.state.stateWiseJobs;
	    for (var i=0; i < stateArray.length; i++) {
	        if (stateArray[i].stateName === nameKey) {
	            return stateArray[i].numberOfJobs;
	        }
	    }
	}
	onStateClick = param => e => {
		var routeName = "/"+stateName;
		alert("this.props.history.push("+routeName);
		/*this.props.history.push(routeName);*/
	}
	render(){
		return(
			<section className="mapWrapper">
				<div className="india">
					<div className="ks st">
						<img src="Maps/India/Kashmir.png" className="img-responsive kashmir" onClick={this.onStateClick('kashmir')} onMouseOver={e => (e.currentTarget.src = "/Maps/India/Kashmir1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Kashmir.png")}/>
						<span className="kashmir  kashmirText text-capitalize">kashmir</span>
						<span className="kashmir kashmirNumber  text-center">{this.search('kashmir')}</span>
					</div>

					<div className="ld">
						<img src="Maps/India/Ladakh.png" className="img-responsive ladakh" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Ladakh1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Ladakh.png")}/>
						<span className="ladakh  text-capitalize">ladakh</span>
						<span className="ladakh  text-center">{this.search('ladakh')}</span>
					</div>

					<div className="pb">
						<img src="Maps/India/Punjab.png" className="img-responsive punjab" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Punjab1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Punjab.png")}/>
						<span className="punjab  text-capitalize">punjab</span>
						<span className="punjab  text-center">{this.search('punjab')}</span>
					</div>

					<div className="hp">
						<img src="Maps/India/HimachalPradesh.png" className="img-responsive himachal" onMouseOver={e => (e.currentTarget.src = "/Maps/India/HimachalPradesh1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/HimachalPradesh.png")}/>
						<span className="himachal  text-capitalize">himachal</span>
						<span className="himachal  text-center">{this.search('himachal')}</span>
					</div>

					<div className="uk">
						<img src="Maps/India/Uttarakhand.png" className="img-responsive uttarakhand" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Uttarakhand1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Uttarakhand.png")}/>
						<span className="uttarakhand  text-capitalize">uttarakhand</span>
						<span className="uttarakhand  text-center">{this.search('uttarakhand')}</span>
					</div>

					<div className="hr">
						<img src="Maps/India/Haryana.png" className="img-responsive haryana" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Haryana1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Haryana.png")}/>
						<span className="haryana  text-capitalize">haryana</span>
						<span className="haryana  text-center">{this.search('haryana')}</span>
					</div>

					<div className="rj">
						<img src="Maps/India/Rajasthan.png" className="img-responsive rajasthan" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Rajasthan1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Rajasthan.png")}/>
						<span className="rajasthan  text-capitalize">rajasthan</span>
						<span className="rajasthan  text-center">{this.search('rajasthan')}</span>
					</div>

					<div className="gj">
						<img src="Maps/India/Gujrat.png" className="img-responsive gujrat" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Gujrat1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Gujrat.png")}/>
						<span className="gujrat  text-capitalize">gujrat</span>
						<span className="gujrat  text-center">{this.search('gujrat')}</span>
					</div>

					<div className="maharashtra">
						<img src="Maps/India/Maharashtra.png" id="imageid" className="img-responsive" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Maharashtra1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Maharashtra.png")}/>
						<span className="maharashtraText  text-capitalize">maharashtra</span>
						<span className="maharashtraNumber  text-center">{this.search('maharashtra')}</span>
					</div>
					
					<div className="mp">
						<img src="Maps/India/MadhyaPradesh.png" className="img-responsive madhyapradesh" onMouseOver={e => (e.currentTarget.src = "/Maps/India/MadhyaPradesh1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/MadhyaPradesh.png")}/>
						<span className="madhyapradesh  text-capitalize">madhya pradesh</span>
						<span className="madhyapradesh  text-center">{this.search('madhyapradesh')}</span>
					</div>
					
					<div className="go">
						<img src="Maps/India/Goa.png" className="img-responsive goa" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Goa1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Goa.png")}/>
						<span className="goa  text-capitalize">goa</span>
						<span className="goa  text-center">{this.search('goa')}</span>
					</div>
					<div className="ka">
						<img src="Maps/India/Karnataka.png" className="img-responsive karnataka" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Karnataka1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Karnataka.png")}/>
						<span className="karnataka  text-capitalize">karnataka</span>
						<span className="karnataka  text-center">{this.search('karnataka')}</span>
					</div>
					<div className="ke">
						<img src="Maps/India/Kerala.png" className="img-responsive kerala" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Kerala1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Kerala.png")}/>
						<span className="kerala  text-capitalize">kerala</span>
						<span className="kerala  text-center">{this.search('kerala')}</span>
					</div>
					<div className="tn">
						<img src="Maps/India/TamilNadu.png" className="img-responsive tamilnadu" onMouseOver={e => (e.currentTarget.src = "/Maps/India/TamilNadu1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/TamilNadu.png")}/>
						<span className="tamilnadu  text-capitalize">tamilnadu</span>
						<span className="tamilnadu  text-center">{this.search('tamilnadu')}</span>
					</div>
					<div className="ap">
						<img src="Maps/India/AndhraPradesh.png" className="img-responsive andhrapradesh" onMouseOver={e => (e.currentTarget.src = "/Maps/India/AndhraPradesh1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/AndhraPradesh.png")}/>
						<span className="andhrapradesh  text-capitalize">andhra pradesh</span>
						<span className="andhrapradesh  text-center">{this.search('andhrapradesh')}</span>
					</div>
					<div className="tl">
						<img src="Maps/India/Telangana.png" className="img-responsive telangana" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Telangana1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Telangana.png")}/>
						<span className="telangana  text-capitalize">telangana</span>
						<span className="telangana  text-center">{this.search('telangana')}</span>
					</div>
					<div className="or">
						<img src="Maps/India/Orissa.png" className="img-responsive orissa" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Orissa1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Orissa.png")}/>
						<span className="orissa  text-capitalize">orissa</span>
						<span className="orissa  text-center">{this.search('orissa')}</span>
					</div>

					<div className="ch">
						<img src="Maps/India/Chhattisgarh.png" className="img-responsive chhattisgarh" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Chhattisgarh1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Chhattisgarh.png")}/>
						<span className="chhattisgarh  text-capitalize">chhattisgarh</span>
						<span className="chhattisgarh  text-center">{this.search('chhattisgarh')}</span>
					</div>
					
					<div className="up">
						<img src="Maps/India/UttarPradesh.png" className="img-responsive uttarpradesh" onMouseOver={e => (e.currentTarget.src = "/Maps/India/UttarPradesh1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/UttarPradesh.png")}/>
						<span className="uttarpradesh  text-capitalize">uttar pradesh</span>
						<span className="uttarpradesh  text-center">{this.search('uttarpradesh')}</span>
					</div>
					
					<div className="wb">
						<img src="Maps/India/WestBengal.png" className="img-responsive westbengal" onMouseOver={e => (e.currentTarget.src = "/Maps/India/WestBengal1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/WestBengal.png")}/>
						<span className="westbengal  text-capitalize">west bengal</span>
						<span className="westbengal  text-center">{this.search('westbengal')}</span>
					</div>

					<div className="bi">
						<img src="Maps/India/Bihar.png" className="img-responsive bihar" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Bihar1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Bihar.png")}/>
						<span className="bihar  text-capitalize">bihar</span>
						<span className="bihar  text-center">{this.search('bihar')}</span>
					</div>
					<div className="wb">
						<img src="Maps/India/Jharkhand.png" className="img-responsive jharkhand" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Jharkhand1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Jharkhand.png")}/>
						<span className="jharkhand  text-capitalize">jharkhand</span>
						<span className="jharkhand  text-center">{this.search('jharkhand')}</span>
					</div>
					<div className="sk">
						<img src="Maps/India/Sikkim.png" className="img-responsive sikkim" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Sikkim1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Sikkim.png")}/>
						<span className="sikkim  text-capitalize">sikkim</span>
						<span className="sikkim  text-center">{this.search('sikkim')}</span>
					</div>
					<div className="as">
						<img src="Maps/India/Assam.png" className="img-responsive assam" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Assam1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Assam.png")}/>
						<span className="assam  text-capitalize">assam</span>
						<span className="assam  text-center">{this.search('assam')}</span>
					</div>
					<div className="mg">
						<img src="Maps/India/Meghalaya.png" className="img-responsive meghalaya" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Meghalaya1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Meghalaya.png")}/>
						<span className="meghalaya  text-capitalize">meghalaya</span>
						<span className="meghalaya  text-center">{this.search('meghalaya')}</span>
					</div>
					<div className="ar">
						<img src="Maps/India/ArunachalPradesh.png" className="img-responsive arunachalpradesh" onMouseOver={e => (e.currentTarget.src = "/Maps/India/ArunachalPradesh1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/ArunachalPradesh.png")}/>
						<span className="arunachalpradesh  text-capitalize">arunachal pradesh</span>
						<span className="arunachalpradesh  text-center">{this.search('arunachalpradesh')}</span>
					</div>
					<div className="ng">
						<img src="Maps/India/Nagaland.png" className="img-responsive nagaland" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Nagaland1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Nagaland.png")}/>
						<span className="nagaland  text-capitalize">nagaland</span>
						<span className="nagaland  text-center">{this.search('nagaland')}</span>
					</div>
					<div className="mn">
						<img src="Maps/India/Manipur.png" className="img-responsive manipur" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Manipur1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Manipur.png")}/>
						<span className="manipur  text-capitalize">manipur</span>
						<span className="manipur  text-center">{this.search('manipur')}</span>
					</div>
					<div className="mz">
						<img src="Maps/India/Mizoram.png" className="img-responsive mizoram" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Mizoram1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Mizoram.png")}/>
						<span className="mizoram  text-capitalize">mizoram</span>
						<span className="mizoram  text-center">{this.search('mizoram')}</span>
					</div>
					<div className="tr">
						<img src="Maps/India/Tripura.png" className="img-responsive tripura" onMouseOver={e => (e.currentTarget.src = "/Maps/India/Tripura1.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/India/Tripura.png")}/>
						<span className="tripura text-capitalize">tripura</span>
						<span className="tripura text-center">{this.search('tripura')}</span>
					</div>
				</div>
			</section>
		);
	}
}