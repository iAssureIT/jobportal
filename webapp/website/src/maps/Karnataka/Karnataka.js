import React, {Component}     from 'react';
import Axios 				  from 'axios';
import Swal 				  from 'sweetalert2';
import {Redirect}             from 'react-router-dom';
import { withRouter }         from 'react-router-dom';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../common/actions/index';
import './Karnataka.css';
import '../global.css';


class Karnataka extends Component{

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

		this.props.history.push("/state/"+stateCode+"/"+district);


	}

	render(){
		return(
			<div className="bodyWrapper">
				<div className="stateWrapper">
					<div className="uttaraKannada  classHover" onClick={e => this.onDistrictClick("Uttara_Kannada","KA")}> 
						<img src="/Maps/Karnataka/Uttara_Kannada.png"  alt="Uttara_Kannada" onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Uttara_Kannada_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Uttara_Kannada.png")}/>
						<span className="uttaraKannadaText mapTextLabel text-capitalize">Uttara Kannada</span>
						<span className="uttaraKannadaNumber mapCountLabel text-center">{this.state.Uttara_Kannada ? this.state.Uttara_Kannada : 0}</span>
					</div>

					<div className="belagavi classHover" onClick={e => this.onDistrictClick("Belagavi","KA")}> 
						<img src="/Maps/Karnataka/Belagavi.png"  alt="Belagavi"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Belagavi_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Belagavi.png")}/>
						<span className="belagaviText mapTextLabel text-capitalize">Belagavi</span>
						<span className="belagaviNumber mapCountLabel text-center">{this.state.Belagavi ? this.state.Belagavi : 0}</span>
					</div>

					<div className="vijayapura classHover" onClick={e => this.onDistrictClick("Vijayapura","KA")}> 
						<img src="/Maps/Karnataka/Vijayapura.png"  alt="Vijayapura"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Vijayapura_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Vijayapura.png")}/>
						<span className="vijayapuraText mapTextLabel text-capitalize">Vijayapura</span>
						<span className="vijayapuraNumber mapCountLabel text-center">{this.state.Vijayapura ? this.state.Vijayapura : 0}</span>
					</div>

					<div className="gulbarga classHover" onClick={e => this.onDistrictClick("Gulbarga","KA")}> 
						<img src="/Maps/Karnataka/Gulbarga.png"  alt="Gulbarga"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Gulbarga_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Gulbarga.png")}/>
						<span className="gulbargaText mapTextLabel text-capitalize">Gulbarga</span>
						<span className="gulbargaNumber mapCountLabel text-center">{this.state.Gulbarga ? this.state.Gulbarga : 0}</span>
					</div>

					<div className="bidar classHover" onClick={e => this.onDistrictClick("Bidar","KA")}> 
						<img src="/Maps/Karnataka/Bidar.png"  alt="Bidar"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Bidar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Bidar.png")}/>
						<span className="bidarText mapTextLabel text-capitalize">Bidar</span>
						<span className="bidarNumber mapCountLabel text-center">{this.state.Bidar ? this.state.Bidar : 0}</span>
					</div>

					<div className="yadgir classHover" onClick={e => this.onDistrictClick("yadgir","KA")}> 
						<img src="/Maps/Karnataka/Yadgir.png"  alt="Yadgir"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Yadgir_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Yadgir.png")}/>
						<span className="yadgirText mapTextLabel text-capitalize">Yadgir</span>
						<span className="yadgirNumber mapCountLabel text-center">{this.state.Yadgir ? this.state.Yadgir : 0}</span>
					</div>

					<div className="bagalkot classHover" onClick={e => this.onDistrictClick("Bagalkot","KA")}> 
						<img src="/Maps/Karnataka/Bagalkot.png"  alt="Bagalkot"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Bagalkot_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Bagalkot.png")}/>
						<span className="bagalkotText mapTextLabel text-capitalize">Bagalkot</span>
						<span className="bagalkotNumber mapCountLabel text-center">{this.state.Bagalkot ? this.state.Bagalkot : 0}</span>
					</div>

					<div className="dharwad classHover" onClick={e => this.onDistrictClick("Dharwad","KA")}> 
						<img src="/Maps/Karnataka/Dharwad.png"  alt="Dharwad"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Dharwad_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Dharwad.png")}/>
						<span className="dharwadText mapTextLabel text-capitalize">Dharwad</span>
						<span className="dharwadNumber mapCountLabel text-center">{this.state.Dharwad ? this.state.Dharwad : 0}</span>
					</div>

					<div className="haveri classHover" onClick={e => this.onDistrictClick("Haveri","KA")}> 
						<img src="/Maps/Karnataka/Haveri.png"  alt="Haveri"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Haveri_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Haveri.png")}/>
						<span className="haveriText mapTextLabel text-capitalize">Haveri</span>
						<span className="haveriNumber mapCountLabel text-center">{this.state.Haveri ? this.state.Haveri : 0}</span>
					</div>

					<div className="gadag classHover" onClick={e => this.onDistrictClick("Gadag","KA")}> 
						<img src="/Maps/Karnataka/Gadag.png"  alt="Gadag"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Gadag_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Gadag.png")}/>
						<span className="gadagText mapTextLabel text-capitalize">Gadag</span>
						<span className="gadagNumber mapCountLabel text-center">{this.state.Gadag ? this.state.Gadag : 0}</span>
					</div>

					<div className="koppal classHover" onClick={e => this.onDistrictClick("Koppal","KA")}> 
						<img src="/Maps/Karnataka/Koppal.png"  alt="Koppal"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Koppal_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Koppal.png")}/>
						<span className="koppalText mapTextLabel text-capitalize">Koppal</span>
						<span className="koppalNumber mapCountLabel text-center">{this.state.Koppal ? this.state.Koppal : 0}</span>
					</div>

					<div  className="raichur classHover" onClick={e => this.onDistrictClick("Raichur","KA")}> 
						<img src="/Maps/Karnataka/Raichur.png" alt="Raichur"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Raichur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Raichur.png")}/>
						<span className="raichurText mapTextLabel text-capitalize">Raichur</span>
						<span className="raichurNumber mapCountLabel text-center">{this.state.Raichur ? this.state.Raichur : 0}</span>
					</div>

					<div className="bellary classHover" onClick={e => this.onDistrictClick("Bellary","KA")}> 
						<img src="/Maps/Karnataka/Bellary.png"  alt="Bellary"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Bellary_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Bellary.png")}/>
						<span className="bellaryText mapTextLabel text-capitalize">Bellary</span>
						<span className="bellaryNumber mapCountLabel text-center">{this.state.Bellary ? this.state.Bellary : 0}</span>
					</div>

					<div className="davangere classHover" onClick={e => this.onDistrictClick("Davangere","KA")}> 
						<img src="/Maps/Karnataka/Davangere.png"  alt="Davangere"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Davangere_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Davangere.png")}/>
						<span className="davangereText mapTextLabel text-capitalize">Davangere</span>
						<span className="davangereNumber mapCountLabel text-center">{this.state.Davangere ? this.state.Davangere : 0}</span>
					</div>

					<div  className="shivamogga classHover" onClick={e => this.onDistrictClick("Shivamogga","KA")}> 
						<img src="/Maps/Karnataka/Shivamogga.png" alt="Shivamogga"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Shivamogga_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Shivamogga.png")}/>
						<span className="shivamoggaText mapTextLabel text-capitalize">Shivamogga</span>
						<span className="shivamoggaNumber mapCountLabel text-center">{this.state.Shivamogga ? this.state.Shivamogga : 0}</span>
					</div>

					<div  className="udupi classHover" onClick={e => this.onDistrictClick("Udupi","KA")}> 
						<img src="/Maps/Karnataka/Udupi.png" alt="Udupi"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Udupi_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Udupi.png")}/>
						<span className="udupiText mapTextLabel text-capitalize">Udupi</span>
						<span className="udupiNumber mapCountLabel text-center">{this.state.Udupi ? this.state.Udupi : 0}</span>
					</div>

					<div className="chikkamagaluru classHover" onClick={e => this.onDistrictClick("Chikkamagaluru","KA")}> 
						<img src="/Maps/Karnataka/Chikkamagaluru.png"  alt="Chikkamagaluru"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Chikkamagaluru_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Chikkamagaluru.png")}/>
						<span className="chikkamagaluruText mapTextLabel text-capitalize">Chikkamagaluru</span>
						<span className="chikkamagaluruNumber mapCountLabel text-center">{this.state.Chikkamagaluru ? this.state.Chikkamagaluru : 0}</span>
					</div>

					<div className="chitradurga classHover" onClick={e => this.onDistrictClick("Chitradurga","KA")}> 
						<img src="/Maps/Karnataka/Chitradurga.png"  alt="Chitradurga"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Chitradurga_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Chitradurga.png")}/>
						<span className="chitradurgaText mapTextLabel text-capitalize">Chitradurga</span>
						<span className="chitradurgaNumber mapCountLabel text-center">{this.state.Chitradurga ? this.state.Chitradurga : 0}</span>
					</div>

					<div className="tumakuru classHover" onClick={e => this.onDistrictClick("Tumakuru","KA")}> 
						<img src="/Maps/Karnataka/Tumakuru.png"  alt="Tumakuru"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Tumakuru_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Tumakuru.png")}/>
						<span className="tumakuruText mapTextLabel text-capitalize">Tumakuru</span>
						<span className="tumakuruNumber mapCountLabel text-center">{this.state.Tumakuru ? this.state.Tumakuru : 0}</span>
					</div>

					<div className="hassan classHover" onClick={e => this.onDistrictClick("Hassan","KA")}> 
						<img src="/Maps/Karnataka/Hassan.png"  alt="Hassan"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Hassan_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Hassan.png")}/>
						<span className="hassanText mapTextLabel text-capitalize">Hassan</span>
						<span className="hassanNumber mapCountLabel text-center">{this.state.Hassan ? this.state.Hassan : 0}</span>
					</div>

					<div className="kodagu classHover" onClick={e => this.onDistrictClick("Kodagu","KA")}> 
						<img src="/Maps/Karnataka/Kodagu.png"  alt="Kodagu"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Kodagu_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Kodagu.png")}/>
						<span className="kodaguText mapTextLabel text-capitalize">Kodagu</span>
						<span className="kodaguNumber mapCountLabel text-center">{this.state.Kodagu ? this.state.Kodagu : 0}</span>
					</div>

					<div className="mysuru classHover" onClick={e => this.onDistrictClick("Mysuru","KA")}> 
						<img src="/Maps/Karnataka/Mysuru.png"  alt="Mysuru"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Mysuru_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Mysuru.png")}/>
						<span className="mysuruText mapTextLabel text-capitalize">Mysuru</span>
						<span className="mysuruNumber mapCountLabel text-center">{this.state.Mysuru ? this.state.Mysuru : 0}</span>
					</div>

					<div className="chamarajanagar classHover" onClick={e => this.onDistrictClick("Chamarajanagar","KA")}> 
						<img src="/Maps/Karnataka/Chamarajanagar.png"  alt="Chamarajanagar"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Chamarajanagar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Chamarajanagar.png")}/>
						<span className="chamarajanagarText mapTextLabel text-capitalize">Chamarajanagar</span>
						<span className="chamarajanagarNumber mapCountLabel text-center">{this.state.Chamarajanagar ? this.state.Chamarajanagar : 0}</span>
					</div>

					<div className="mandya classHover" onClick={e => this.onDistrictClick("Mandya","KA")}> 
						<img src="/Maps/Karnataka/Mandya.png"  alt="Mandya"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Mandya_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Mandya.png")}/>
						<span className="mandyaText mapTextLabel text-capitalize">Mandya</span>
						<span className="mandyaNumber mapCountLabel text-center">{this.state.Mandya ? this.state.Mandya : 0}</span>
					</div>

					<div className="channapatnaRamanagara classHover" onClick={e => this.onDistrictClick("Channapatna_Ramanagara","KA")}> 
						<img src="/Maps/Karnataka/Channapatna_Ramanagara.png"  alt="Channapatna_Ramanagara"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Channapatna_Ramanagara_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Channapatna_Ramanagara.png")}/>
						<span className="channapatnaRamanagaraText mapTextLabel text-capitalize">Ramanagara</span>
						<span className="channapatnaRamanagaraNumber mapCountLabel text-center">{this.state.Ramanagara ? this.state.Ramanagara : 0}</span>
					</div>

					<div className="bengaluru classHover" onClick={e => this.onDistrictClick("Banglore","KA")}> 
						<img src="/Maps/Karnataka/Bengaluru.png"  alt="Bengaluru"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Bengaluru_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Bengaluru.png")}/>
						<span className="bengaluruText mapTextLabel text-capitalize">Bengaluru</span>
						<span className="bengaluruNumber mapCountLabel text-center">{this.state.Banglore ? this.state.Banglore : 0}</span>
					</div>

					<div className="bengaluruRural classHover" onClick={e => this.onDistrictClick("Bengaluru_Rural","KA")}> 
						<img src="/Maps/Karnataka/Bengaluru_Rural.png"  alt="Bengaluru_Rural"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Bengaluru_Rural_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Bengaluru_Rural.png")}/>
						<span className="bengaluruRuralText mapTextLabel text-capitalize">Bengaluru Rural</span>
						<span className="bengaluruRuralNumber mapCountLabel text-center">{this.state.Bengaluru_Rural ? this.state.Bengaluru_Rural : 0}</span>
					</div>

					<div className="chikkaballapur classHover" onClick={e => this.onDistrictClick("Chikkaballapur","KA")}> 
						<img src="/Maps/Karnataka/Chikkaballapur.png"  alt="Chikkaballapur"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Chikkaballapur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Chikkaballapur.png")}/>
						<span className="chikkaballapurText mapTextLabel text-capitalize">Chikkaballapur</span>
						<span className="chikkaballapurNumber mapCountLabel text-center">{this.state.Chikkaballapur ? this.state.Chikkaballapur : 0}</span>
					</div>

					<div className="kolar classHover" onClick={e => this.onDistrictClick("Kolar","KA")}> 
						<img src="/Maps/Karnataka/Kolar.png"  alt="Kolar"  onMouseOver={e => (e.currentTarget.src = "/Maps/Karnataka/Kolar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Karnataka/Kolar.png")}/>
						<span className="kolarText mapTextLabel text-capitalize">Kolar</span>
						<span className="kolarNumber mapCountLabel text-center">{this.state.Kolar ? this.state.Kolar : 0}</span>
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

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Karnataka));