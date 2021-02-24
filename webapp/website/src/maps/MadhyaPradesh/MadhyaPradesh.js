import React, {Component}     from 'react';
import Axios 				  from 'axios';
import Swal 				  from 'sweetalert2';
import {Redirect}             from 'react-router-dom';
import { withRouter }         from 'react-router-dom';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../common/actions/index';
import './MadhyaPradesh.css';
import '../global.css';


class MadhyaPradesh extends Component{
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
			<div className="bodyWrapper">
				<div className="stateWrapper col-lg-12"  >
					<div className="alirajpur classHover" onClick={e => this.onDistrictClick("Alirajpur","MP")} > 
						<img src="/Maps/Madhya_Pradesh/Alirajpur.png" alt="Alirajpur" onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Alirajpur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Alirajpur.png")}/>
						<span className="alirajpurText mapTextLabel text-capitalize">Alirajpur</span>
						<span className="alirajpurNumber mapCountLabel text-center">{this.state.Alirajpur ? this.state.Alirajpur : 0}</span>
					</div>
					<div  className="jhabua classHover" onClick={e => this.onDistrictClick("Jhabua","MP")}> 
						<img src="/Maps/Madhya_Pradesh/Jhabua.png" alt="Jhabua"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Jhabua_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Jhabua.png")}/>
						<span className="jhabuaText  mapTextLabel text-capitalize">Jhabua</span>
						<span className="jhabuaNumber mapCountLabel   text-center">{this.state.Jhabua ? this.state.Jhabua : 0}</span>
					</div>
					<div  className="ratlam classHover" onClick={e => this.onDistrictClick("Ratlam","MP")}> 
						<img src="/Maps/Madhya_Pradesh/Ratlam.png" alt="Ratlam"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Ratlam_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Ratlam.png")}/>
						<span className="ratlamText  mapTextLabel text-capitalize">Ratlam</span>
						<span className="ratlamNumber  mapCountLabel  text-center">{this.state.Ratlam ? this.state.Ratlam : 0}</span>
					</div>
					<div  className="mandsaur classHover" onClick={e => this.onDistrictClick("Mandsaur","MP")}> 
						<img src="/Maps/Madhya_Pradesh/Mandsaur.png" alt="Mandsaur"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Mandsaur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Mandsaur.png")}/>
						<span className="mandsaurText  mapTextLabel text-capitalize">Mandsaur</span>
						<span className="mandsaurNumber  mapCountLabel  text-center">{this.state.Mandsaur ? this.state.Mandsaur : 0}</span>
					</div>
					<div className="neemuch classHover" onClick={e => this.onDistrictClick("Neemuch","MP")}> 
						<img src="/Maps/Madhya_Pradesh/Neemuch.png" alt="Neemuch"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Neemuch_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Neemuch.png")}/>
						<span className="neemuchText  mapTextLabel text-capitalize">Neemuch</span>
						<span className="neemuchNumber mapCountLabel   text-center">{this.state.Neemuch ? this.state.Neemuch : 0}</span>
					</div>
					<div className="barwani classHover" onClick={e => this.onDistrictClick("Barwani","MP")}> 
						<img src="/Maps/Madhya_Pradesh/Barwani.png" alt="Barwani"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Barwani_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Barwani.png")}/>
						<span className="barwaniText  mapTextLabel text-capitalize">Barwani</span>
						<span className="barwaniNumber  mapCountLabel  text-center">{this.state.Barwani ? this.state.Barwani : 0}</span>
					</div>
					<div className="khargone classHover" onClick={e => this.onDistrictClick("Khargone","MP")}> 
						<img src="/Maps/Madhya_Pradesh/Khargone.png" alt="Khargone"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Khargone_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Khargone.png")}/>
						<span className="khargoneText mapTextLabel  text-capitalize">Khargone</span>
						<span className="khargoneNumber  mapCountLabel  text-center">{this.state.Khargone ? this.state.Khargone : 0}</span>
					</div>
					<div className="burhanpur classHover" onClick={e => this.onDistrictClick("Burhanpur","MP")}> 
						<img src="/Maps/Madhya_Pradesh/Burhanpur.png" alt="Burhanpur"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Burhanpur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Burhanpur.png")}/>
						<span className="burhanpurText mapTextLabel  text-capitalize">Burhanpur</span>
						<span className="burhanpurNumber  mapCountLabel  text-center">{this.state.Burhanpur ? this.state.Burhanpur : 0}</span>
					</div>
					<div className="khandwa classHover" onClick={e => this.onDistrictClick("Khandwa","MP")}> 
						<img src="/Maps/Madhya_Pradesh/Khandwa.png" alt="Khandwa"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Khandwa_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Khandwa.png")}/>
						<span className="khandwaText  mapTextLabel text-capitalize">Khandwa</span>
						<span className="khandwaNumber mapCountLabel   text-center">{this.state.Khandwa ? this.state.Khandwa : 0}</span>
					</div>
					<div className="harda classHover" onClick={e => this.onDistrictClick("Harda","MP")}> 
						<img src="/Maps/Madhya_Pradesh/Harda.png" alt="Harda"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Harda_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Harda.png")}/>
						<span className="hardaText  mapTextLabel text-capitalize">Harda</span>
						<span className="hardaNumber  mapCountLabel  text-center">{this.state.Harda ? this.state.Harda : 0}</span>
					</div>
					<div className="betul classHover" onClick={e => this.onDistrictClick("Betul","MP")}> 
						<img src="/Maps/Madhya_Pradesh/Betul.png" alt="Betul"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Betul_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Betul.png")}/>
						<span className="betulText  mapTextLabel text-capitalize">Betul</span>
						<span className="betulNumber  mapCountLabel  text-center">{this.state.Betul ? this.state.Betul : 0}</span>
					</div>
					<div className="chhindwara classHover" onClick={e => this.onDistrictClick("Chhindwara","MP")}> 
						<img src="/Maps/Madhya_Pradesh/Chhindwara.png" alt="Chhindwara"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Chhindwara_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Chhindwara.png")}/>
						<span className="chhindwaraText  mapTextLabel  text-capitalize">Chhindwara</span>
						<span className="chhindwaraNumber mapCountLabel   text-center">{this.state.Chhindwara ? this.state.Chhindwara : 0}</span>
					</div>
					<div className="seoni classHover" onClick={e => this.onDistrictClick("Seoni","MP")}> 
						<img src="/Maps/Madhya_Pradesh/Seoni.png" className="" alt="Seoni"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Seoni_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Seoni.png")}/>
						<span className="seoniText mapTextLabel text-capitalize">Seoni</span>
						<span className="seoniNumber  mapCountLabel  text-center">{this.state.Seoni ? this.state.Seoni : 0}</span>
					</div>
					<div className="balaghat classHover" onClick={e => this.onDistrictClick("Balaghat","MP")}> 
						<img src="/Maps/Madhya_Pradesh/Balaghat.png" alt="Balaghat"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Balaghat_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Balaghat.png")}/>
						<span className="balaghatText mapTextLabel  text-capitalize">Balaghat</span>
						<span className="balaghatNumber mapCountLabel   text-center">{this.state.Balaghat ? this.state.Balaghat : 0}</span>
					</div>
					<div className="mandla classHover" onClick={e => this.onDistrictClick("Mandla","MP")}> 
						<img src="/Maps/Madhya_Pradesh/Mandla.png" alt="Mandla" onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Mandla_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Mandla.png")}/>
						<span className="mandlaText mapTextLabel text-capitalize">Mandla</span>
						<span className="mandlaNumber  mapCountLabel  text-center">{this.state.Mandla ? this.state.Mandla : 0}</span>
					</div>
					<div className="dindori classHover" onClick={e => this.onDistrictClick("Dindori","MP")}> 
						<img src="/Maps/Madhya_Pradesh/Dindori.png" alt="Dindori"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Dindori_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Dindori.png")}/>
						<span className="dindoriText  mapTextLabel text-capitalize">Dindori</span>
						<span className="dindoriNumber  mapCountLabel  text-center">{this.state.Dindori ? this.state.Dindori : 0}</span>
					</div>
					<div className="annupur classHover" onClick={e => this.onDistrictClick("Annupur","MP")}> 
						<img src="/Maps/Madhya_Pradesh/Annupur.png" alt="Annupur"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Annupur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Annupur.png")}/>
						<span className="annupurText  mapTextLabel text-capitalize">Annupur</span>
						<span className="annupurNumber  mapCountLabel  text-center">{this.state.Annupur ? this.state.Annupur : 0}</span>
					</div>
					<div className="shahdol classHover" onClick={e => this.onDistrictClick("Shahdol","MP")}> 
						<img src="/Maps/Madhya_Pradesh/Shahdol.png" alt="Shahdol"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Shahdol_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Shahdol.png")}/>
						<span className="shahdolText  mapTextLabel text-capitalize">Shahdol</span>
						<span className="shahdolNumber  mapCountLabel  text-center">{this.state.Shahdol ? this.state.Shahdol : 0}</span>
					</div>
					<div className="sidhi classHover" onClick={e => this.onDistrictClick("Sidhi","MP")}> 
						<img src="/Maps/Madhya_Pradesh/Sidhi.png" alt="Sidhi"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Sidhi_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Sidhi.png")}/>
						<span className="sidhiText mapTextLabel  text-capitalize">Sidhi</span>
						<span className="sidhiNumber  mapCountLabel  text-center">{this.state.Sidhi ? this.state.Sidhi : 0}</span>
					</div>
					<div className="singrauli classHover" onClick={e => this.onDistrictClick("singrauli","MP")}> 
						<img src="/Maps/Madhya_Pradesh/Singrauli.png" alt="Singrauli"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Singrauli_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Singrauli.png")}/>
						<span className="singrauliText  mapTextLabel text-capitalize">Singrauli</span>
						<span className="singrauliNumber  mapCountLabel  text-center">{this.state.Singrauli ? this.state.Singrauli : 0}</span>
					</div>
					<div className="rewa classHover" onClick={e => this.onDistrictClick("Rewa","MP")}> 
						<img src="/Maps/Madhya_Pradesh/Rewa.png" alt="Rewa"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Rewa_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Rewa.png")}/>
						<span className="rewaText mapTextLabel  text-capitalize">Rewa</span>
						<span className="rewaNumber  mapCountLabel  text-center">{this.state.Rewa ? this.state.Rewa : 0}</span>
					</div>
					<div className="satna classHover" onClick={e => this.onDistrictClick("Satna","MP")}> 
						<img src="/Maps/Madhya_Pradesh/Satna.png" alt="Satna"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Satna_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Satna.png")}/>
						<span className="satnaText  mapTextLabel text-capitalize">Satna</span>
						<span className="satnaNumber  mapCountLabel  text-center">{this.state.Satna ? this.state.Satna : 0}</span>
					</div>
					<div className="umaria classHover" onClick={e => this.onDistrictClick("Umaria","MP")}> 
						<img src="/Maps/Madhya_Pradesh/Umaria.png" alt="Umaria"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Umaria_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Umaria.png")}/>
						<span className="umariaText  mapTextLabel text-capitalize">Umaria</span>
						<span className="umariaNumber  mapCountLabel  text-center">{this.state.Umaria ? this.state.Umaria : 0}</span>
					</div>
					<div className="katni classHover" onClick={e => this.onDistrictClick("Katni","MP")}> 
						<img src="/Maps/Madhya_Pradesh/Katni.png" alt="Katni"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Katni_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Katni.png")}/>
						<span className="katniText mapTextLabel  text-capitalize">Katni</span>
						<span className="katniNumber  mapCountLabel  text-center">{this.state.Katni ? this.state.Katni : 0}</span>
					</div>
					<div className="jabalpur classHover" onClick={e => this.onDistrictClick("Jabalpur","MP")}> 
						<img src="/Maps/Madhya_Pradesh/Jabalpur.png" alt="Jabalpur"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Jabalpur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Jabalpur.png")}/>
						<span className="jabalpurText mapTextLabel  text-capitalize">Jabalpur</span>
						<span className="jabalpurNumber  mapCountLabel  text-center">{this.state.Jabalpur ? this.state.Jabalpur : 0}</span>
					</div>
					<div className="narsinghpur classHover" onClick={e => this.onDistrictClick("Narsinghpur","MP")}> 
						<img src="/Maps/Madhya_Pradesh/Narsinghpur.png" alt="Narsinghpur"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Narsinghpur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Narsinghpur.png")}/>
						<span className="narsinghpurText  mapTextLabel text-capitalize">Narsinghpur</span>
						<span className="narsinghpurNumber  mapCountLabel  text-center">{this.state.Narsinghpur ? this.state.Narsinghpur : 0}</span>
					</div>
					
					<div className="dewas classHover" onClick={e => this.onDistrictClick("Dewas","MP")}> 
						<img src="/Maps/Madhya_Pradesh/Dewas.png" alt="Dewas"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Dewas_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Dewas.png")}/>
						<span className="dewasText  mapTextLabel text-capitalize">Dewas</span>
						<span className="dewasNumber  mapCountLabel  text-center">{this.state.Dewas ? this.state.Dewas : 0}</span>
					</div>
					<div className="indore classHover" onClick={e => this.onDistrictClick("Indore","MP")}> 
						<img src="/Maps/Madhya_Pradesh/Indore.png" alt="Indore"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Indore_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Indore.png")}/>
						<span className="indoreText  mapTextLabel text-capitalize">Indore</span>
						<span className="indoreNumber  mapCountLabel  text-center">{this.state.Indore ? this.state.Indore : 0}</span>
					</div>
					<div className="dhar classHover" onClick={e => this.onDistrictClick("Dhar","MP")}> 
						<img src="/Maps/Madhya_Pradesh/Dhar.png" alt="Dhar"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Dhar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Dhar.png")}/>
						<span className="dharText  mapTextLabel text-capitalize">Dhar</span>
						<span className="dharNumber  mapCountLabel  text-center">{this.state.Dhar ? this.state.Dhar : 0}</span>
					</div>
					<div className="ujjain classHover" onClick={e => this.onDistrictClick("Ujjain","MP")}> 
						<img src="/Maps/Madhya_Pradesh/Ujjain.png" alt="Ujjain"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Ujjain_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Ujjain.png")}/>
						<span className="ujjainText  mapTextLabel text-capitalize">Ujjain</span>
						<span className="ujjainNumber  mapCountLabel  text-center">{this.state.Ujjain ? this.state.Ujjain : 0}</span>
					</div>
					<div className="shajapur classHover" onClick={e => this.onDistrictClick("Shajapur","MP")}> 
						<img src="/Maps/Madhya_Pradesh/Shajapur.png" alt="Shajapur"  onMouseOver={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Shajapur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Madhya_Pradesh/Shajapur.png")}/>
						<span className="shajapurText  mapTextLabel text-capitalize">Shajapur</span>
						<span className="shajapurNumber  mapCountLabel  text-center">{this.state.Shajapur ? this.state.Shajapur : 0}</span>
					</div>
					<div className="sehore classHover" onClick={e => this.onDistrictClick("Sehore","MP")}> 
						<img src="/Maps/Madhya_Pradesh/Sehore.png" alt="Sehore"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Sehore_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Sehore.png"}/>
						<span className="sehoreText mapTextLabel  text-capitalize">Sehore</span>
						<span className="sehoreNumber  mapCountLabel  text-center">{this.state.Sehore ? this.state.Sehore : 0}</span>
					</div>
					<div className="hoshangabad classHover" onClick={e => this.onDistrictClick("Hoshangabad","MP")}> 
						<img src="/Maps/Madhya_Pradesh/Hoshangabad.png" alt="Hoshangabad"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Hoshangabad_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Hoshangabad.png"}/>
						<span className="hoshangabadText mapTextLabel text-capitalize">Hoshangabad</span>
						<span className="hoshangabadNumber  mapCountLabel  text-center">{this.state.Hoshangabad ? this.state.Hoshangabad : 0}</span>
					</div>
					<div className="agarMalwa classHover" onClick={e => this.onDistrictClick("Agar Malwa","MP")}>
						<img src="/Maps/Madhya_Pradesh/Agar_Malwa.png" alt="Agar_Malwa"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Agar_Malwa_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Agar_Malwa.png"}/>
						<span className="agarMalwaText  mapTextLabel text-capitalize">Agar_Malwa</span>
						<span className="agarMalwaNumber  mapCountLabel  text-center">{this.state.Agar_Malwa ? this.state.Agar_Malwa : 0}</span>
					</div>
					<div className="rajgarh classHover" onClick={e => this.onDistrictClick("Rajgarh","MP")}> 
						<img src="/Maps/Madhya_Pradesh/Rajgarh.png" alt="Rajgarh"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Rajgarh_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Rajgarh.png"}/>
						<span className="rajgarhText mapTextLabel text-capitalize">Rajgarh</span>
						<span className="rajgarhNumber  mapCountLabel  text-center">{this.state.Rajgarh ? this.state.Rajgarh : 0}</span>
					</div>
					<div className="bhopal classHover" onClick={e => this.onDistrictClick("Bhopal","MP")}> 
						<img src="/Maps/Madhya_Pradesh/Bhopal.png" alt="Bhopal"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Bhopal_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Bhopal.png"}/>
						<span className="bhopalText  mapTextLabel text-capitalize">Bhopal</span>
						<span className="bhopalNumber  mapCountLabel  text-center">{this.state.Bhopal ? this.state.Bhopal : 0}</span>
					</div>
					<div className="raisen classHover" onClick={e => this.onDistrictClick("Raisen","MP")}> 
						<img src="/Maps/Madhya_Pradesh/Raisen.png" alt="Raisen"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Raisen_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Raisen.png"}/>
						<span className="raisenText  mapTextLabel text-capitalize">Raisen</span>
						<span className="raisenNumber mapCountLabel  text-center">{this.state.Raisen ? this.state.Raisen : 0}</span>
					</div>
					<div className="sagar classHover" onClick={e => this.onDistrictClick("Sagar","MP")}> 
						<img src="/Maps/Madhya_Pradesh/Sagar.png" alt="Sagar"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Sagar_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Sagar.png"}/>
						<span className="sagarText mapTextLabel  text-capitalize">Sagar</span>
						<span className="sagarNumber  mapCountLabel  text-center">{this.state.Sagar ? this.state.Sagar : 0}</span>
					</div>
					<div className="damoh classHover" onClick={e => this.onDistrictClick("Damoh","MP")}> 
						<img src="/Maps/Madhya_Pradesh/Damoh.png" alt="Damoh"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Damoh_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Damoh.png"}/>
						<span className="damohText mapTextLabel text-capitalize">Damoh</span>
						<span className="damohNumber  mapCountLabel  text-center">{this.state.Damoh ? this.state.Damoh : 0}</span>
					</div>
					<div className="panna classHover" onClick={e => this.onDistrictClick("Panna","MP")}> 
						<img src="/Maps/Madhya_Pradesh/Panna.png" alt="Panna"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Panna_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Panna.png"}/>
						<span className="pannaText mapTextLabel  text-capitalize">Panna</span>
						<span className="pannaNumber  mapCountLabel  text-center">{this.state.Panna ? this.state.Panna : 0}</span>
					</div>
					<div className="chhatarpur classHover" onClick={e => this.onDistrictClick("Chhatarpur","MP")}> 
						<img src="/Maps/Madhya_Pradesh/Chhatarpur.png" alt="Chhatarpur"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Chhatarpur_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Chhatarpur.png"}/>
						<span className="chhatarpurText  mapTextLabel text-capitalize">Chhatarpur</span>
						<span className="chhatarpurNumber  mapCountLabel  text-center">{this.state.Chhatarpur ? this.state.Chhatarpur : 0}</span>
					</div>
					<div className="tikamgarh classHover" onClick={e => this.onDistrictClick("Tikamgarh","MP")}> 
						<img src="/Maps/Madhya_Pradesh/Tikamgarh.png" alt="Tikamgarh"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Tikamgarh_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Tikamgarh.png"}/>
						<span className="tikamgarhText  mapTextLabel text-capitalize">Tikamgarh</span>
						<span className="tikamgarhNumber  mapCountLabel  text-center">{this.search('Tikamgarh')}{this.state.Tikamgarh ? this.state.Tikamgarh : 0}</span>
					</div>
					<div className="niwari classHover" onClick={e => this.onDistrictClick("Niwari","MP")}> 
						<img src="/Maps/Madhya_Pradesh/Niwari.png" alt="Niwari"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Niwari_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Niwari.png"}/>
						<span className="niwariText  mapTextLabel text-capitalize">Niwari</span>
						<span className="niwariNumber  mapCountLabel  text-center">{this.state.Niwari ? this.state.Niwari : 0}</span>
					</div>
					<div className="vidisha classHover" onClick={e => this.onDistrictClick("Vidisha","MP")}> 
						<img src="/Maps/Madhya_Pradesh/Vidisha.png" alt="Vidisha"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Vidisha_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Vidisha.png"}/>
						<span className="vidishaText  mapTextLabel text-capitalize">Vidisha</span>
						<span className="vidishaNumber  mapCountLabel  text-center">{this.state.Vidisha ? this.state.Vidisha : 0}</span>
					</div>
					<div className="guna classHover" onClick={e => this.onDistrictClick("Guna","MP")}> 
						<img src="/Maps/Madhya_Pradesh/Guna.png" alt="Guna"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Guna_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Guna.png"}/>
						<span className="gunaText mapTextLabel  text-capitalize">guna</span>
						<span className="gunaNumber  mapCountLabel  text-center">{this.state.Guna ? this.state.Guna : 0}</span>
					</div>
					<div className="ashoknagar classHover" onClick={e => this.onDistrictClick("Ashoknagar","MP")}> 
						<img src="/Maps/Madhya_Pradesh/Ashoknagar.png" alt="Ashoknagar"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Ashoknagar_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Ashoknagar.png"}/>
						<span className="ashoknagarText mapTextLabel  text-capitalize">Ashoknagar</span>
						<span className="ashoknagarNumber  mapCountLabel  text-center">{this.state.Ashoknagar ? this.state.Ashoknagar : 0}</span>
					</div>
					<div className="shivpuri classHover" onClick={e => this.onDistrictClick("Shivpuri","MP")}> 
						<img src="/Maps/Madhya_Pradesh/Shivpuri.png" className="" alt="Shivpuri"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Shivpuri_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Shivpuri.png"}/>
						<span className="shivpuriText mapTextLabel  text-capitalize">Shivpuri</span>
						<span className="shivpuriNumber mapCountLabel text-center">{this.state.Shivpuri ? this.state.Shivpuri : 0}</span>
					</div>
					<div className="sheopur classHover" onClick={e => this.onDistrictClick("Sheopur","MP")}> 
						<img src="/Maps/Madhya_Pradesh/Sheopur.png" className="" alt="Sheopur"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Sheopur_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Sheopur.png"}/>
						<span className="sheopurText  mapTextLabel text-capitalize">Sheopur</span>
						<span className="sheopurNumber  mapCountLabel  text-center">{this.state.Sheopur ? this.state.Sheopur : 0}</span>
					</div>
					<div className="gwalior classHover" onClick={e => this.onDistrictClick("Gwalior","MP")}> 
						<img src="/Maps/Madhya_Pradesh/Gwalior.png" className="" alt="Gwalior"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Gwalior_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Gwalior.png"}/>
						<span className="gwaliorText mapTextLabel  text-capitalize">Gwalior</span>
						<span className="gwaliorNumber  mapCountLabel  text-center">{this.state.Gwalior ? this.state.Gwalior : 0}</span>
					</div>
					<div className="datia classHover" onClick={e => this.onDistrictClick("Datia","MP")}> 
						<img src="/Maps/Madhya_Pradesh/Datia.png" className="" alt="Datia"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Datia_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Datia.png"}/>
						<span className="datiaText mapTextLabel  text-capitalize">Datia</span>
						<span className="datiaNumber  mapCountLabel  text-center">{this.state.Datia ? this.state.Datia : 0}</span>
					</div>
					<div className="bhind classHover" onClick={e => this.onDistrictClick("Bhind","MP")}> 
						<img src="/Maps/Madhya_Pradesh/Bhind.png" className="" alt="Bhind"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Bhind_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Bhind.png"}/>
						<span className="bhindText mapTextLabel  text-capitalize">Bhind</span>
						<span className="bhindNumber  mapCountLabel  text-center">{this.state.Bhind ? this.state.Bhind : 0}</span>
					</div>
					<div className="morena classHover" onClick={e => this.onDistrictClick("Morena","MP")}> 
						<img src="/Maps/Madhya_Pradesh/Morena.png" className="" alt="Morena"  onMouseOver={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Morena_.png"} onMouseOut={e => e.currentTarget.src = "/Maps/Madhya_Pradesh/Morena.png"}/>
						<span className="morenaText mapTextLabel  text-capitalize">Morena</span>
						<span className="morenaNumber  mapCountLabel  text-center">{this.state.Morena ? this.state.Morena : 0}</span>
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

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(MadhyaPradesh));
