import React, {Component}     from 'react';
import Axios 				  from 'axios';
import Swal 				  from 'sweetalert2';
import {Redirect}             from 'react-router-dom';
import { withRouter }         from 'react-router-dom';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../common/actions/index';
import './Gujarat.css';
import '../global.css';


class Gujarat extends Component{

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
			<div className="bodyWrapper col-12">
				<div className="stateWrapper">
					<div className="kachchh classHover" onClick={e => this.onDistrictClick("Kachchh","GJ")}> 
						<img src="/Maps/Gujarat/Kachchh.png"  alt="Kachchh" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Kachchh_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Kachchh.png")}/>
						<span className="kachchhText mapTextLabel text-capitalize">Kachchh</span>
						<span className="kachchhNumber mapCountLabel text-center">{this.state.Kachchh ? this.state.Kachchh : 0}</span>
					</div>

					<div className="banasKantha classHover" onClick={e => this.onDistrictClick("Banas_Kantha","GJ")}> 
						<img src="/Maps/Gujarat/Banas_Kantha.png"  alt="Banas_Kantha" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Banas_Kantha_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Banas_Kantha.png")}/>
						<span className="banasKanthaText mapTextLabel text-capitalize">Banas Kantha</span>
						<span className="banasKanthaNumber mapCountLabel text-center">{this.state.Banas_Kantha ? this.state.Banas_Kantha : 0}</span>
					</div>

					<div className="patan classHover" onClick={e => this.onDistrictClick("Patan","GJ")}> 
						<img src="/Maps/Gujarat/Patan.png"  alt="Patan" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Patan_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Patan.png")}/>
						<span className="patanText mapTextLabel text-capitalize">Patan</span>
						<span className="patanNumber mapCountLabel text-center">{this.state.Patan ? this.state.Patan : 0}</span>
					</div>

					<div className="mahesana classHover" onClick={e => this.onDistrictClick("Mahesana","GJ")}> 
						<img src="/Maps/Gujarat/Mahesana.png"  alt="Mahesana" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Mahesana_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Mahesana.png")}/>
						<span className="mahesanaText mapTextLabel text-capitalize">Mahesana</span>
						<span className="mahesanaNumber mapCountLabel text-center">{this.state.Mahesana ? this.state.Mahesana : 0}</span>
					</div>

					<div className="sabarkantha classHover" onClick={e => this.onDistrictClick("Sabarkantha","GJ")}> 
						<img src="/Maps/Gujarat/Sabarkantha.png"  alt="Sabarkantha" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Sabarkantha_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Sabarkantha.png")}/>
						<span className="sabarkanthaText mapTextLabel text-capitalize">Sabarkantha</span>
						<span className="sabarkanthaNumber mapCountLabel text-center">{this.state.Sabarkantha ? this.state.Sabarkantha : 0}</span>
					</div>

					<div className="arvalli classHover" onClick={e => this.onDistrictClick("Arvalli","GJ")}> 
						<img src="/Maps/Gujarat/Arvalli.png"  alt="Arvalli" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Arvalli_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Arvalli.png")}/>
						<span className="arvalliText mapTextLabel text-capitalize">Arvalli</span>
						<span className="arvalliNumber mapCountLabel text-center">{this.state.Arvalli ? this.state.Arvalli : 0}</span>
					</div>

					<div className="gandhinagar classHover" onClick={e => this.onDistrictClick("Gandhinagar","GJ")}> 
						<img src="/Maps/Gujarat/Gandhinagar.png"  alt="Gandhinagar" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Gandhinagar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Gandhinagar.png")}/>
						<span className="gandhinagarText mapTextLabel text-capitalize">Gandhinagar</span>
						<span className="gandhinagarNumber mapCountLabel text-center">{this.state.Gandhinagar ? this.state.Gandhinagar : 0}</span>
					</div>

					<div className="ahmedabad classHover" onClick={e => this.onDistrictClick("Ahmedabad","GJ")}> 
						<img src="/Maps/Gujarat/Ahmedabad.png"  alt="Ahmedabad" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Ahmedabad_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Ahmedabad.png")}/>
						<span className="ahmedabadText mapTextLabel text-capitalize">Ahmedabad</span>
						<span className="ahmedabadNumber mapCountLabel text-center">{this.state.Ahmedabad ? this.state.Ahmedabad : 0}</span>
					</div>

					<div className="surendraNagar classHover" onClick={e => this.onDistrictClick("Surendranagar","GJ")}> 
						<img src="/Maps/Gujarat/Surendra_Nagar.png"  alt="Surendra_Nagar" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Surendra_Nagar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Surendra_Nagar.png")}/>
						<span className="surendraNagarText mapTextLabel text-capitalize">Surendranagar</span>
						<span className="surendraNagarNumber mapCountLabel text-center">{this.state.Surendranagar ? this.state.Surendranagar : 0}</span>
					</div>

					<div className="morbi classHover" onClick={e => this.onDistrictClick("Morbi","GJ")}> 
						<img src="/Maps/Gujarat/Morbi.png"  alt="Morbi" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Morbi_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Morbi.png")}/>
						<span className="morbiText mapTextLabel text-capitalize">Morbi</span>
						<span className="morbiNumber mapCountLabel text-center">{this.state.Morbi ? this.state.Morbi : 0}</span>
					</div>

					<div className="jamnagar classHover" onClick={e => this.onDistrictClick("Jamnagar","GJ")}> 
						<img src="/Maps/Gujarat/Jamnagar.png"  alt="Jamnagar" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Jamnagar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Jamnagar.png")}/>
						<span className="jamnagarText mapTextLabel text-capitalize">Jamnagar</span>
						<span className="jamnagarNumber mapCountLabel text-center">{this.state.Jamnagar ? this.state.Jamnagar : 0}</span>
					</div>

					<div className="devbhumiDwarka classHover" onClick={e => this.onDistrictClick("Devbhumi_Dwarka","GJ")}> 
						<img src="/Maps/Gujarat/Devbhumi_Dwarka.png"  alt="Devbhumi_Dwarka" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Devbhumi_Dwarka_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Devbhumi_Dwarka.png")}/>
						<span className="devbhumiDwarkaText mapTextLabel text-capitalize">Devbhumi Dwarka</span>
						<span className="devbhumiDwarkaNumber mapCountLabel text-center">{this.state.Devbhumi_Dwarka ? this.state.Devbhumi_Dwarka : 0}</span>
					</div>

					<div className="porbandar classHover" onClick={e => this.onDistrictClick("Porbandar","GJ")}> 
						<img src="/Maps/Gujarat/Porbandar.png"  alt="Porbandar" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Porbandar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Porbandar.png")}/>
						<span className="porbandarText mapTextLabel text-capitalize">Porbandar</span>
						<span className="porbandarNumber mapCountLabel text-center">{this.state.Porbandar ? this.state.Porbandar : 0}</span>
					</div>

					<div className="rajkot classHover" onClick={e => this.onDistrictClick("Rajkot","GJ")}> 
						<img src="/Maps/Gujarat/Rajkot.png"  alt="Rajkot" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Rajkot_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Rajkot.png")}/>
						<span className="rajkotText mapTextLabel text-capitalize">Rajkot</span>
						<span className="rajkotNumber mapCountLabel text-center">{this.state.Rajkot ? this.state.Rajkot : 0}</span>
					</div>

					<div className="botad classHover" onClick={e => this.onDistrictClick("Botad","GJ")}> 
						<img src="/Maps/Gujarat/Botad.png"  alt="Botad" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Botad_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Botad.png")}/>
						<span className="botadText mapTextLabel text-capitalize">Botad</span>
						<span className="botadNumber mapCountLabel text-center">{this.state.Botad ? this.state.Botad : 0}</span>
					</div>

					<div className="bhavnagar classHover" onClick={e => this.onDistrictClick("Bhavnagar","GJ")}> 
						<img src="/Maps/Gujarat/Bhavnagar.png"  alt="Bhavnagar" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Bhavnagar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Bhavnagar.png")}/>
						<span className="bhavnagarText mapTextLabel text-capitalize">Bhavnagar</span>
						<span className="bhavnagarNumber mapCountLabel text-center">{this.state.Bhavnagar ? this.state.Bhavnagar : 0}</span>
					</div>

					<div className="amreli classHover" onClick={e => this.onDistrictClick("Amreli","GJ")}> 
						<img src="/Maps/Gujarat/Amreli.png"  alt="Amreli" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Amreli_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Amreli.png")}/>
						<span className="amreliText mapTextLabel text-capitalize">Amreli</span>
						<span className="amreliNumber mapCountLabel text-center">{this.state.Amreli ? this.state.Amreli : 0}</span>
					</div>

					<div className="junagadh classHover" onClick={e => this.onDistrictClick("Junagadh","GJ")}> 
						<img src="/Maps/Gujarat/Junagadh.png"  alt="Junagadh" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Junagadh_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Junagadh.png")}/>
						<span className="junagadhText mapTextLabel text-capitalize">Junagadh</span>
						<span className="junagadhNumber mapCountLabel text-center">{this.state.Junagadh ? this.state.Junagadh : 0}</span>
					</div>

					<div className="girSomnath classHover" onClick={e => this.onDistrictClick("Gir_Somnath","GJ")}> 
						<img src="/Maps/Gujarat/Gir_Somnath.png"  alt="Gir_Somnath" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Gir_Somnath_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Gir_Somnath.png")}/>
						<span className="girSomnathText mapTextLabel text-capitalize">Gir Somnath</span>
						<span className="girSomnathNumber mapCountLabel text-center">{this.state.Gir_Somnath ? this.state.Gir_Somnath : 0}</span>
					</div>

					<div className="mahisagar classHover" onClick={e => this.onDistrictClick("Mahisagar","GJ")}> 
						<img src="/Maps/Gujarat/Mahisagar.png"  alt="Mahisagar" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Mahisagar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Mahisagar.png")}/>
						<span className="mahisagarText mapTextLabel text-capitalize">Mahisagar</span>
						<span className="mahisagarNumber mapCountLabel text-center">{this.state.Mahisagar ? this.state.Mahisagar : 0}</span>
					</div>

					<div className="kheda classHover" onClick={e => this.onDistrictClick("Kheda","GJ")}> 
						<img src="/Maps/Gujarat/Kheda.png"  alt="Kheda" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Kheda_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Kheda.png")}/>
						<span className="khedaText mapTextLabel text-capitalize">Kheda</span>
						<span className="khedaNumber mapCountLabel text-center">{this.state.Kheda ? this.state.Kheda : 0}</span>
					</div>

					<div className="anand classHover" onClick={e => this.onDistrictClick("Anand","GJ")}> 
						<img src="/Maps/Gujarat/Anand.png"  alt="Anand" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Anand_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Anand.png")}/>
						<span className="anandText mapTextLabel text-capitalize">Anand</span>
						<span className="anandNumber mapCountLabel text-center">{this.state.Anand ? this.state.Anand : 0}</span>
					</div>

					<div className="bharuch classHover" onClick={e => this.onDistrictClick("Bharuch","GJ")}> 
						<img src="/Maps/Gujarat/Bharuch.png"  alt="Bharuch" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Bharuch_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Bharuch.png")}/>
						<span className="bharuchText mapTextLabel text-capitalize">Bharuch</span>
						<span className="bharuchNumber mapCountLabel text-center">{this.state.Bharuch ? this.state.Bharuch : 0}</span>
					</div>

					<div className="vadodara classHover" onClick={e => this.onDistrictClick("Vadodara","GJ")}> 
						<img src="/Maps/Gujarat/Vadodara.png"  alt="Vadodara" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Vadodara_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Vadodara.png")}/>
						<span className="vadodaraText mapTextLabel text-capitalize">Vadodara</span>
						<span className="vadodaraNumber mapCountLabel text-center">{this.state.Vadodara ? this.state.Vadodara : 0}</span>
					</div>

					<div className="panchMahals classHover" onClick={e => this.onDistrictClick("Panch_Mahals","GJ")}> 
						<img src="/Maps/Gujarat/Panch_Mahals.png"  alt="Panch_Mahals" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Panch_Mahals_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Panch_Mahals.png")}/>
						<span className="panchMahalsText mapTextLabel text-capitalize">PanchMahals</span>
						<span className="panchMahalsNumber mapCountLabel text-center">{this.state.PanchMahals ? this.state.PanchMahals : 0}</span>
					</div>

					<div className="dahod classHover" onClick={e => this.onDistrictClick("Dahod","GJ")}> 
						<img src="/Maps/Gujarat/Dahod.png"  alt="Dahod" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Dahod_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Dahod.png")}/>
						<span className="dahodText mapTextLabel text-capitalize">Dahod</span>
						<span className="dahodNumber mapCountLabel text-center">{this.state.Dahod ? this.state.Dahod : 0}</span>
					</div>

					<div className="chhotaUdaipur classHover" onClick={e => this.onDistrictClick("Chhota_Udaipur","GJ")}> 
						<img src="/Maps/Gujarat/Chhota_Udaipur.png"  alt="Chhota_Udaipur" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Chhota_Udaipur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Chhota_Udaipur.png")}/>
						<span className="chhotaUdaipurText mapTextLabel text-capitalize">Chhota Udaipur</span>
						<span className="chhotaUdaipurNumber mapCountLabel text-center">{this.state.Chhota_Udaipur ? this.state.Chhota_Udaipur : 0}</span>
					</div>

					<div className="narmada classHover" onClick={e => this.onDistrictClick("Narmada","GJ")}> 
						<img src="/Maps/Gujarat/Narmada.png"  alt="Narmada" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Narmada_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Narmada.png")}/>
						<span className="narmadaText mapTextLabel text-capitalize">Narmada</span>
						<span className="narmadaNumber mapCountLabel text-center">{this.state.Narmada ? this.state.Narmada : 0}</span>
					</div>

					<div className="surat classHover" onClick={e => this.onDistrictClick("Surat","GJ")}> 
						<img src="/Maps/Gujarat/Surat.png"  alt="Surat" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Surat_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Surat.png")}/>
						<span className="suratText mapTextLabel text-capitalize">Surat</span>
						<span className="suratNumber mapCountLabel text-center">{this.state.Surat ? this.state.Surat : 0}</span>
					</div>

					<div className="tapi classHover" onClick={e => this.onDistrictClick("Tapi","GJ")}> 
						<img src="/Maps/Gujarat/Tapi.png"  alt="Tapi" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Tapi_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Tapi.png")}/>
						<span className="tapiText mapTextLabel text-capitalize">Tapi</span>
						<span className="tapiNumber mapCountLabel text-center">{this.state.Tapi ? this.state.Tapi : 0}</span>
					</div>

					<div className="theDangs classHover" onClick={e => this.onDistrictClick("The_Dangs","GJ")}> 
						<img src="/Maps/Gujarat/The_Dangs.png"  alt="The_Dangs" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/The-Dangs_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/The_Dangs.png")}/>
						<span className="theDangsText mapTextLabel text-capitalize">The_Dangs</span>
						<span className="theDangsNumber mapCountLabel text-center">{this.state.The_Dangs ? this.state.The_Dangs : 0}</span>
					</div>

					<div className="navsari classHover" onClick={e => this.onDistrictClick("Navsari","GJ")}> 
						<img src="/Maps/Gujarat/Navsari.png"  alt="Navsari" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Navsari_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Navsari.png")}/>
						<span className="navsariText mapTextLabel text-capitalize">Navsari</span>
						<span className="navsariNumber mapCountLabel text-center">{this.state.Navsari ? this.state.Navsari : 0}</span>
					</div>

					<div className="valsad classHover" onClick={e => this.onDistrictClick("Valsad","GJ")}> 
						<img src="/Maps/Gujarat/Valsad.png"  alt="Valsad" onMouseOver={e => (e.currentTarget.src = "/Maps/Gujarat/Valsad_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Gujarat/Valsad.png")}/>
						<span className="valsadText mapTextLabel text-capitalize">Valsad</span>
						<span className="valsadNumber mapCountLabel text-center">{this.state.Valsad ? this.state.Valsad : 0}</span>
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

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Gujarat));
