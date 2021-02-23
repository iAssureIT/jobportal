import React, {Component}     from 'react';
import Axios 				  from 'axios';
import Swal 				  from 'sweetalert2';
import {Redirect}             from 'react-router-dom';
import { withRouter }         from 'react-router-dom';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../common/actions/index';
import './Chhattisgarh.css';
import '../global.css';


class Chhattisgarh extends Component{
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

		this.props.history.push("/country/"+this.props.match.params.countryCode+"/state/"+stateCode+"/city/"+district+"/function/"+this.props.match.params.functionalArea + "/"+this.props.match.params.functionalArea_id+"/subfunction/"+this.props.match.params.subfunctionalArea + "/"+this.props.match.params.subfunctionalArea_id );


	}
	render(){
		return(
			<div className="bodyWrapper" >
				<div className="stateWrapper" >
					<div className="bijapur classHover" onClick={e => this.onDistrictClick("Bijapur","CG")}> 
						<img src="/Maps/Chhattisgarh/Bijapur.png" alt="Bijapur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Bijapur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Bijapur.png")}/>
						<span className="bijapurText mapTextLabel text-capitalize">Bijapur</span>
						<span className="bijapurNumber mapCountLabel text-center">{this.state.Bijapur ? this.state.Bijapur : 0}</span>
					</div>
					<div className="sukma classHover" onClick={e => this.onDistrictClick("Sukma","CG")}> 
						<img src="/Maps/Chhattisgarh/Sukma.png"  alt="Sukma"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Sukma_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Sukma.png")}/>
						<span className="sukmaText mapTextLabel text-capitalize">Sukma</span>
						<span className="sukmaNumber mapCountLabel text-center">{this.state.Sukma ? this.state.Sukma : 0}</span>
					</div>
					<div className="dantewada classHover" onClick={e => this.onDistrictClick("Dantewada","CG")}> 
						<img src="/Maps/Chhattisgarh/Dantewada.png"  alt="Dantewada"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Dantewada_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Dantewada.png")}/>
						<span className="dantewadaText mapTextLabel text-capitalize">Dantewada</span>
						<span className="dantewadaNumber mapCountLabel text-center">{this.state.Dantewada ? this.state.Dantewada : 0}</span>
					</div>
					<div className="bastar classHover" onClick={e => this.onDistrictClick("Bastar","CG")}> 
						<img src="/Maps/Chhattisgarh/Bastar.png"  alt="Bastar"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Bastar_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Bastar.png")}/>
						<span className="bastarText mapTextLabel text-capitalize">Bastar</span>
						<span className="bastarNumber mapCountLabel text-center">{this.state.Bastar ? this.state.Bastar : 0}</span>
					</div>
					<div className="narayanpur classHover" onClick={e => this.onDistrictClick("Narayanpur","CG")}> 
						<img src="/Maps/Chhattisgarh/Narayanpur.png"  alt="Narayanpur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Narayanpur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Narayanpur.png")}/>
						<span className="narayanpurText mapTextLabel text-capitalize">Narayanpur</span>
						<span className="narayanpurNumber mapCountLabel text-center">{this.state.Narayanpur ? this.state.Narayanpur : 0}</span>
					</div>
					<div className="kondagaon classHover" onClick={e => this.onDistrictClick("Kondagaon","CG")}> 
						<img src="/Maps/Chhattisgarh/Kondagaon.png"  alt="Kondagaon"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Kondagaon_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Kondagaon.png")}/>
						<span className="kondagaonText mapTextLabel text-capitalize">Kondagaon</span>
						<span className="kondagaonNumber mapCountLabel text-center">{this.state.Kondagaon ? this.state.Kondagaon : 0}</span>
					</div>
					<div className="uttarKanker classHover" onClick={e => this.onDistrictClick("Uttar_Kanker","CG")}> 
						<img src="/Maps/Chhattisgarh/Uttar_Kanker.png"  alt="Uttar_Kanker"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Uttar_Kanker_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Uttar_Kanker.png")}/>
						<span className="uttarKankerText mapTextLabel text-capitalize">Uttar_Kanker</span>
						<span className="uttarKankerNumber mapCountLabel text-center">{this.state.Uttar_Kanker ? this.state.Uttar_Kanker : 0}</span>
					</div>
					<div className="rajnandgaon classHover" onClick={e => this.onDistrictClick("Rajnandgaon","CG")}> 
						<img src="/Maps/Chhattisgarh/Rajnandgaon.png"  alt="Rajnandgaon"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Rajnandgaon_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Rajnandgaon.png")}/>
						<span className="rajnandgaonText mapTextLabel text-capitalize">Rajnandgaon</span>
						<span className="rajnandgaonNumber mapCountLabel text-center">{this.state.Rajnandgaon ? this.state.Rajnandgaon : 0}</span>
					</div>
					<div className="balod classHover" onClick={e => this.onDistrictClick("Balod","CG")}> 
						<img src="/Maps/Chhattisgarh/Balod.png"  alt="Balod"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Balod_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Balod.png")}/>
						<span className="balodText mapTextLabel text-capitalize">Balod</span>
						<span className="balodNumber mapCountLabel text-center">{this.state.Balod ? this.state.Balod : 0}</span>
					</div>
					<div className="dhamtari classHover" onClick={e => this.onDistrictClick("Dhamtari","CG")}> 
						<img src="/Maps/Chhattisgarh/Dhamtari.png" alt="Dhamtari"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Dhamtari_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Dhamtari.png")}/>
						<span className="dhamtariText mapTextLabel text-capitalize">Dhamtari</span>
						<span className="dhamtariNumber mapCountLabel text-center">{this.state.Dhamtari ? this.state.Dhamtari : 0}</span>
					</div>
					<div className="ghariaband classHover" onClick={e => this.onDistrictClick("Ghariaband","CG")}> 
						<img src="/Maps/Chhattisgarh/Ghariaband.png" alt="Ghariaband"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Ghariaband_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Ghariaband.png")}/>
						<span className="ghariabandText mapTextLabel text-capitalize">Ghariaband</span>
						<span className="ghariabandNumber mapCountLabel text-center">{this.state.Ghariaband ? this.state.Ghariaband : 0}</span>
					</div>
					<div className="mahasamund classHover" onClick={e => this.onDistrictClick("Mahasamund","CG")}> 
						<img src="/Maps/Chhattisgarh/Mahasamund.png" alt="Mahasamund"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Mahasamund_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Mahasamund.png")}/>
						<span className="mahasamundText mapTextLabel text-capitalize">Mahasamund</span>
						<span className="mahasamundNumber mapCountLabel text-center">{this.state.Mahasamund ? this.state.Mahasamund : 0}</span>
					</div>
					<div className="raipur classHover" onClick={e => this.onDistrictClick("Raipur","CG")}> 
						<img src="/Maps/Chhattisgarh/Raipur.png"  alt="Raipur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Raipur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Raipur.png")}/>
						<span className="raipurText mapTextLabel text-capitalize">Raipur</span>
						<span className="raipurNumber mapCountLabel text-center">{this.state.Raipur ? this.state.Raipur : 0}</span>
					</div>
					<div className="durg classHover" onClick={e => this.onDistrictClick("Durg","CG")}> 
						<img src="/Maps/Chhattisgarh/Durg.png"  alt="Durg"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Durg_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Durg.png")}/>
						<span className="durgText mapTextLabel text-capitalize">Durg</span>
						<span className="durgNumber mapCountLabel text-center">{this.state.Durg ? this.state.Durg : 0}</span>
					</div>
					<div className="kawardha classHover" onClick={e => this.onDistrictClick("Kawardha","CG")}> 
						<img src="/Maps/Chhattisgarh/Kawardha.png"  alt="Kawardha"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Kawardha_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Kawardha.png")}/>
						<span className="kawardhaText mapTextLabel text-capitalize">Kawardha</span>
						<span className="kawardhaNumber mapCountLabel text-center">{this.state.Kawardha ? this.state.Kawardha : 0}</span>
					</div>
					<div className="bemetara classHover" onClick={e => this.onDistrictClick("Bemetara","CG")}> 
						<img src="/Maps/Chhattisgarh/Bemetara.png"  alt="Bemetara"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Bemetara_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Bemetara.png")}/>
						<span className="bemetaraText mapTextLabel text-capitalize">Bemetara</span>
						<span className="bemetaraNumber mapCountLabel text-center">{this.state.Bemetara ? this.state.Bemetara : 0}</span>
					</div>
					<div className="balodaBazar classHover" onClick={e => this.onDistrictClick("Baloda_Bazar","CG")}> 
						<img src="/Maps/Chhattisgarh/Baloda_Bazar.png"  alt="Baloda_Bazar"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Baloda_Bazar_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Baloda_Bazar.png")}/>
						<span className="balodaBazarText mapTextLabel text-capitalize">Baloda_Bazar</span>
						<span className="balodaBazarNumber mapCountLabel text-center">{this.state.Baloda_Bazar ? this.state.Baloda_Bazar : 0}</span>
					</div>
					<div className="mungeli classHover" onClick={e => this.onDistrictClick("Mungeli","CG")}> 
						<img src="/Maps/Chhattisgarh/Mungeli.png"  alt="Mungeli"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Mungeli_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Mungeli.png")}/>
						<span className="mungeliText mapTextLabel text-capitalize">Mungeli</span>
						<span className="mungeliNumber mapCountLabel text-center">{this.state.Mungeli ? this.state.Mungeli : 0}</span>
					</div>
					<div className="janjgirChampa classHover" onClick={e => this.onDistrictClick("Janjgir_Champa","CG")}> 
						<img src="/Maps/Chhattisgarh/Janjgir_Champa.png"  alt="Janjgir_Champa"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Janjgir_Champa_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Janjgir_Champa.png")}/>
						<span className="janjgirChampaText mapTextLabel text-capitalize">Janjgir_Champa</span>
						<span className="janjgirChampaNumber mapCountLabel text-center">{this.state.Janjgir_Champa ? this.state.Janjgir_Champa : 0}</span>
					</div>
					<div className="raigarh classHover" onClick={e => this.onDistrictClick("Raigarh","CG")}> 
						<img src="/Maps/Chhattisgarh/Raigarh.png" alt="Raigarh"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Raigarh_.png")}
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Raigarh.png")}/>
						<span className="raigarhText mapTextLabel text-capitalize">Raigarh</span>
						<span className="raigarhNumber mapCountLabel text-center">{this.state.Raigarh ? this.state.Raigarh : 0}</span>
					</div>
					<div className="korba classHover" onClick={e => this.onDistrictClick("Korba","CG")}> 
						<img src="/Maps/Chhattisgarh/Korba.png"  alt="Korba"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Korba_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Korba.png")}/>
						<span className="korbaText mapTextLabel text-capitalize">Korba</span>
						<span className="korbaNumber mapCountLabel text-center">{this.state.Korba ? this.state.Korba : 0}</span>
					</div>
					<div className="bilaspur classHover" onClick={e => this.onDistrictClick("Bilaspur","CG")}> 
						<img src="/Maps/Chhattisgarh/Bilaspur.png"  alt="Bilaspur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Bilaspur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Bilaspur.png")}/>
						<span className="bilaspurText mapTextLabel text-capitalize">Bilaspur</span>
						<span className="bilaspurNumber mapCountLabel text-center">{this.state.Bilaspur ? this.state.Bilaspur : 0}</span>
					</div>
					<div className="koriya classHover" onClick={e => this.onDistrictClick("Koriya","CG")}> 
						<img src="/Maps/Chhattisgarh/Koriya.png"  alt="Koriya"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Koriya_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Koriya.png")}/>
						<span className="koriyaText mapTextLabel text-capitalize">Koriya</span>
						<span className="koriyaNumber mapCountLabel text-center">{this.state.Koriya ? this.state.Koriya : 0}</span>
					</div>
					<div className="Balrampur classHover" onClick={e => this.onDistrictClick("Balrampur","CG")}> 
						<img src="/Maps/Chhattisgarh/Balrampur.png"  alt="Balrampur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Balrampur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Balrampur.png")}/>
						<span className="BalrampurText mapTextLabel text-capitalize">Balrampur</span>
						<span className="BalrampurNumber mapCountLabel text-center">{this.state.Balrampur ? this.state.Balrampur : 0}</span>
					</div>
					<div className="surajpur classHover" onClick={e => this.onDistrictClick("Surajpur","CG")}> 
						<img src="/Maps/Chhattisgarh/Surajpur.png"  alt="Surajpur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Surajpur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Surajpur.png")}/>
						<span className="surajpurText mapTextLabel text-capitalize">Surajpur</span>
						<span className="surajpurNumber mapCountLabel text-center">{this.state.Surajpur ? this.state.Surajpur : 0}</span>
					</div>
					
					<div className="surguja classHover" onClick={e => this.onDistrictClick("Surguja","CG")}> 
						<img src="/Maps/Chhattisgarh/Surguja.png" alt="Surguja"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Surguja_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Surguja.png")}/>
						<span className="surgujaText mapTextLabel text-capitalize">Surguja</span>
						<span className="surgujaNumber mapCountLabel text-center">{this.state.Surguja ? this.state.Surguja : 0}</span>
					</div>
					<div className="jashpur classHover" onClick={e => this.onDistrictClick("Jashpur","CG")}> 
						<img src="/Maps/Chhattisgarh/Jashpur.png"  alt="Jashpur"
						 onMouseOver={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Jashpur_.png")} 
						 onMouseOut={e => (e.currentTarget.src = "/Maps/Chhattisgarh/Jashpur.png")}/>
						<span className="jashpurText mapTextLabel text-capitalize">Jashpur</span>
						<span className="jashpurNumber mapCountLabel text-center">{this.state.Jashpur ? this.state.Jashpur : 0}</span>
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

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Chhattisgarh));
