import React, {Component}     from 'react';
import Axios 				  from 'axios';
import Swal 				  from 'sweetalert2';
import {Redirect}             from 'react-router-dom';
import { withRouter }         from 'react-router-dom';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../common/actions/index';
import './Telangana.css';
import '../global.css';

class Telangana extends Component{
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
	onStateClick = (stateName) => {
		
	}
	render(){
		return(
			<div className="bodyWrapper">
				<div className="stateWrapper">
					<div className="adilabad classHover"> 
						<img src="/Maps/Telangana/Adilabad.png"  alt="Adilabad" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Adilabad_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Adilabad.png")}/>
						<span className="adilabadText mapTextLabel text-capitalize">Adilabad</span>
						<span className="adilabadNumber mapCountLabel text-center">{this.state.Adilabad ? this.state.Adilabad : 0}</span>
					</div>
					<div className="komaramBheem classHover"> 
						<img src="/Maps/Telangana/Komaram_Bheem.png"  alt="Komaram_Bheem" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Komaram_Bheem_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Komaram_Bheem.png")}/>
						<span className="komaramBheemText mapTextLabel text-capitalize">Komaram_Bheem</span>
						<span className="komaramBheemNumber mapCountLabel text-center">{this.state.Komaram_Bheem ? this.state.Komaram_Bheem : 0}</span>
					</div>
					
					<div className="nirmal classHover"> 
						<img src="/Maps/Telangana/Nirmal.png"  alt="Nirmal"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Nirmal_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Nirmal.png")}/>
						<span className="nirmalText mapTextLabel text-capitalize">Nirmal</span>
						<span className="nirmalNumber mapCountLabel text-center">{this.state.Nirmal ? this.state.Nirmal : 0}</span>
					</div>
					<div className="mancherial classHover"> 
						<img src="/Maps/Telangana/Mancherial.png"  alt="Mancherial"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Mancherial_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Mancherial.png")}/>
						<span className="mancherialText mapTextLabel text-capitalize">Mancherial</span>
						<span className="mancherialNumber mapCountLabel text-center">{this.state.Mancherial ? this.state.Mancherial : 0}</span>
					</div>
					<div className="nizamabad classHover"> 
						<img src="/Maps/Telangana/Nizamabad.png"  alt="Nizamabad" 
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Nizamabad_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Nizamabad.png")}/>
						<span className="nizamabadText mapTextLabel text-capitalize">Nizamabad</span>
						<span className="nizamabadNumber mapCountLabel text-center">{this.state.Nizamabad ? this.state.Nizamabad : 0}</span>
					</div>
					<div className="jagtial classHover"> 
						<img src="/Maps/Telangana/Jagtial.png"  alt="Jagtial"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Jagtial_.png")}
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Jagtial.png")}/>
						<span className="jagtialText mapTextLabel text-capitalize">Jagtial</span>
						<span className="jagtialNumber mapCountLabel text-center">{this.state.Jagtial ? this.state.Jagtial : 0}</span>
					</div>
					<div className="peddapalle classHover"> 
						<img src="/Maps/Telangana/Peddapalle.png"  alt="Peddapalle"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Peddapalle_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Peddapalle.png")}/>
						<span className="peddapalleText mapTextLabel text-capitalize">Peddapalle</span>
						<span className="peddapalleNumber mapCountLabel text-center">{this.state.Peddapalle ? this.state.Peddapalle : 0}</span>
					</div>
					<div className="jayaShankar classHover"> 
						<img src="/Maps/Telangana/Jaya_Shankar.png"  alt="Jaya_Shankar"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Jaya_Shankar_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Jaya_Shankar.png")}/>
						<span className="jayaShankarText mapTextLabel text-capitalize">Jaya_Shankar</span>
						<span className="jayaShankarNumber mapCountLabel text-center">{this.state.Jaya_Shankar ? this.state.Jaya_Shankar : 0}</span>
					</div>
					<div className="kamareddy classHover"> 
						<img src="/Maps/Telangana/Kamareddy.png"  alt="Kamareddy"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Kamareddy_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Kamareddy.png")}/>
						<span className="kamareddyText mapTextLabel text-capitalize">Kamareddy</span>
						<span className="kamareddyNumber mapCountLabel text-center">{this.state.Kamareddy ? this.state.Kamareddy : 0}</span>
					</div>
					<div className="sircilla classHover"> 
						<img src="/Maps/Telangana/Sircilla.png"  alt="Sircilla"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Sircilla_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Sircilla.png")}/>
						<span className="sircillaText mapTextLabel text-capitalize">Sircilla</span>
						<span className="sircillaNumber mapCountLabel text-center">{this.state.Sircilla ? this.state.Sircilla : 0}</span>
					</div>
					<div className="karimnagar classHover"> 
						<img src="/Maps/Telangana/Karimnagar.png"  alt="Karimnagar"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Karimnagar_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Karimnagar.png")}/>
						<span className="karimnagarText mapTextLabel text-capitalize">Karimnagar</span>
						<span className="karimnagarNumber mapCountLabel text-center">{this.state.Karimnagar ? this.state.Karimnagar : 0}</span>
					</div>
					<div className="sangareddy classHover"> 
						<img src="/Maps/Telangana/Sangareddy.png"  alt="Sangareddy"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Sangareddy_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Sangareddy.png")}/>
						<span className="sangareddyText mapTextLabel text-capitalize">Sangareddy</span>
						<span className="sangareddyNumber mapCountLabel text-center">{this.state.Sangareddy ? this.state.Sangareddy : 0}</span>
					</div>

					<div className="medak classHover"> 
						<img src="/Maps/Telangana/Medak.png"  alt="Medak"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Medak_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Medak.png")}/>
						<span className="medakText mapTextLabel text-capitalize">Medak</span>
						<span className="medakNumber mapCountLabel text-center">{this.state.Medak ? this.state.Medak : 0}</span>
					</div>

					<div className="siddipet classHover"> 
						<img src="/Maps/Telangana/Siddipet.png"  alt="Siddipet"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Siddipet_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Siddipet.png")}/>
						<span className="siddipetText mapTextLabel text-capitalize">Siddipet</span>
						<span className="siddipetNumber mapCountLabel text-center">{this.state.Siddipet ? this.state.Siddipet : 0}</span>
					</div>
					
					<div className="mahabubabad classHover"> 
						<img src="/Maps/Telangana/Mahabubabad.png"  alt="Mahabubabad"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Mahabubabad_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Mahabubabad.png")}/>
						<span className="mahabubabadText mapTextLabel text-capitalize">Mahabubabad</span>
						<span className="mahabubabadNumber mapCountLabel text-center">{this.state.Mahabubabad ? this.state.Mahabubabad : 0}</span>
					</div>

					<div className="warangalRural classHover"> 
						<img src="/Maps/Telangana/Warangal_Rural.png"  alt="Warangal_Rural"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Warangal_Rural_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Warangal_Rural.png")}/>
						<span className="warangalRuralText mapTextLabel text-capitalize">Warangal_Rural</span>
						<span className="warangalRuralNumber mapCountLabel text-center">{this.state.Warangal_Rural ? this.state.Warangal_Rural : 0}</span>
					</div>

					<div className="warangalUrban classHover"> 
						<img src="/Maps/Telangana/Warangal_Urban.png"  alt="Warangal_Urban"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Warangal_Urban_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Warangal_Urban.png")}/>
						<span className="warangalUrbanText mapTextLabel text-capitalize">Warangal_Urban</span>
						<span className="warangalUrbanNumber mapCountLabel text-center">{this.state.Warangal_Urban ? this.state.Warangal_Urban : 0}</span>
					</div>
					<div className="jangaon classHover"> 
						<img src="/Maps/Telangana/Jangaon.png"  alt="Jangaon"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Jangaon_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Jangaon.png")}/>
						<span className="jangaonText mapTextLabel text-capitalize">Jangaon</span>
						<span className="jangaonNumber mapCountLabel text-center">{this.state.Jangaon ? this.state.Jangaon : 0}</span>
					</div>
					
					<div className="kothagudem classHover"> 
						<img src="/Maps/Telangana/Kothagudem.png"  alt="Kothagudem"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Kothagudem_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Kothagudem.png")}/>
						<span className="kothagudemText mapTextLabel text-capitalize">Kothagudem</span>
						<span className="kothagudemNumber mapCountLabel text-center">{this.state.Kothagudem ? this.state.v : 0}</span>
					</div>
					<div className="vikarabad classHover"> 
						<img src="/Maps/Telangana/Vikarabad.png"  alt="Vikarabad"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Vikarabad_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Vikarabad.png")}/>
						<span className="vikarabadText mapTextLabel text-capitalize">Vikarabad</span>
						<span className="vikarabadNumber mapCountLabel text-center">{this.state.Vikarabad ? this.state.Vikarabad : 0}</span>
					</div>
					<div className="rangareddy classHover"> 
						<img src="/Maps/Telangana/Rangareddy.png"  alt="Rangareddy"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Rangareddy_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Rangareddy.png")}/>
						<span className="rangareddyText mapTextLabel text-capitalize">Rangareddy</span>
						<span className="rangareddyNumber mapCountLabel text-center">{this.state.Rangareddy ? this.state.Rangareddy : 0}</span>
					</div>
					<div className="medchal classHover"> 
						<img src="/Maps/Telangana/Medchal.png"  alt="Medchal"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Medchal_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Medchal.png")}/>
						<span className="medchalText mapTextLabel text-capitalize">Medchal</span>
						<span className="medchalNumber mapCountLabel text-center">{this.state.Medchal ? this.state.Medchal : 0}</span>
					</div>
					<div className="bhavnagiri classHover"> 
						<img src="/Maps/Telangana/Bhavnagiri.png"  alt="Bhavnagiri"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Bhavnagiri_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Bhavnagiri.png")}/>
						<span className="bhavnagiriText mapTextLabel text-capitalize">Bhavnagiri</span>
						<span className="bhavnagiriNumber mapCountLabel text-center">{this.state.Bhavnagiri ? this.state.Bhavnagiri : 0}</span>
					</div>
					<div className="suryape classHover"> 
						<img src="/Maps/Telangana/Suryape.png"  alt="Suryape"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Suryape_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Suryape.png")}/>
						<span className="suryapeText mapTextLabel text-capitalize">Suryape</span>
						<span className="suryapeNumber mapCountLabel text-center">{this.state.Suryape ? this.state.Suryape : 0}</span>
					</div>
					<div className="khammam classHover"> 
						<img src="/Maps/Telangana/Khammam.png"  alt="Khammam"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Khammam_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Khammam.png")}/>
						<span className="khammamText mapTextLabel text-capitalize">Khammam</span>
						<span className="khammamNumber mapCountLabel text-center">{this.state.Khammam ? this.state.Khammam : 0}</span>
					</div>
					<div className="nalgonda classHover"> 
						<img src="/Maps/Telangana/Nalgonda.png"  alt="Nalgonda"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Nalgonda_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Nalgonda.png")}/>
						<span className="nalgondaText mapTextLabel text-capitalize">Nalgonda</span>
						<span className="nalgondaNumber mapCountLabel text-center">{this.state.Nalgonda ? this.state.Nalgonda : 0}</span>
					</div>
					<div className="nagarkurnool classHover"> 
						<img src="/Maps/Telangana/Nagarkurnool.png"  alt="Nagarkurnool"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Nagarkurnool_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Nagarkurnool.png")}/>
						<span className="nagarkurnoolText mapTextLabel text-capitalize">Nagarkurnool</span>
						<span className="nagarkurnoolNumber mapCountLabel text-center">{this.state.Nagarkurnool ? this.state.Nagarkurnool : 0}</span>
					</div>
					<div className="mahabubnagar classHover"> 
						<img src="/Maps/Telangana/Mahabubnagar.png"  alt="Mahabubnagar"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Mahabubnagar_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Mahabubnagar.png")}/>
						<span className="mahabubnagarText mapTextLabel text-capitalize">Mahabubnagar</span>
						<span className="mahabubnagarNumber mapCountLabel text-center">{this.state.Mahabubnagar ? this.state.Mahabubnagar : 0}</span>
					</div>
					<div className="wanaparthy classHover"> 
						<img src="/Maps/Telangana/Wanaparthy.png"  alt="Wanaparthy"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Wanaparthy_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Wanaparthy.png")}/>
						<span className="wanaparthyText mapTextLabel text-capitalize">Wanaparthy</span>
						<span className="wanaparthyNumber mapCountLabel text-center">{this.state.Wanaparthy ? this.state.Wanaparthy : 0}</span>
					</div>
					<div className="jogulambaGadwal classHover"> 
						<img src="/Maps/Telangana/Jogulamba_Gadwal.png"  alt="Jogulamba_Gadwal"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Telangana/Jogulamba_Gadwal_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Telangana/Jogulamba_Gadwal.png")}/>
						<span className="jogulambaGadwalText mapTextLabel text-capitalize">Jogulamba_Gadwal</span>
						<span className="jogulambaGadwalNumber mapCountLabel text-center">{this.state.Jogulamba_Gadwal ? this.state.Jogulamba_Gadwal : 0}</span>
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

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Telangana));
