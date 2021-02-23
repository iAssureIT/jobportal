import React, {Component}     from 'react';
import Axios 				  from 'axios';
import Swal 				  from 'sweetalert2';
import {Redirect}             from 'react-router-dom';
import { withRouter }         from 'react-router-dom';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../common/actions/index';
import './Bihar.css';
import '../global.css';


class Bihar extends Component{

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
			<div className="bodyWrapper">
				<div className="stateWrapper">
					<div className="bhabua classHover" onClick={e => this.onDistrictClick("Bhabua","BR")}> 
						<img src="/Maps/Bihar/Bhabua.png"  alt="Bhabua" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Bhabua_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Bhabua.png")}/>
						<span className="bhabuaText mapTextLabel text-capitalize">Bhabua</span>
						<span className="bhabuaNumber mapCountLabel text-center">{this.state.Bhabua ? this.state.Bhabua : 0}</span>
					</div>

					<div className="rohtas classHover" onClick={e => this.onDistrictClick("Rohtas","BR")}> 
						<img src="/Maps/Bihar/Rohtas.png"  alt="Rohtas" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Rohtas_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Rohtas.png")}/>
						<span className="rohtasText mapTextLabel text-capitalize">Rohtas</span>
						<span className="rohtasNumber mapCountLabel text-center">{this.state.Rohtas ? this.state.Rohtas : 0}</span>
					</div>

					<div className="buxar classHover" onClick={e => this.onDistrictClick("Buxar","BR")}> 
						<img src="/Maps/Bihar/Buxar.png"  alt="Buxar" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Buxar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Buxar.png")}/>
						<span className="buxarText mapTextLabel text-capitalize">Buxar</span>
						<span className="buxarNumber mapCountLabel text-center">{this.state.Buxar ? this.state.Buxar : 0}</span>
					</div>

					<div  className="bhojpur classHover" onClick={e => this.onDistrictClick("Bhojpur","BR")}> 
						<img src="/Maps/Bihar/Bhojpur.png" alt="Bhojpur" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Bhojpur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Bhojpur.png")}/>
						<span className="bhojpurText mapTextLabel text-capitalize">Bhojpur</span>
						<span className="bhojpurNumber mapCountLabel text-center">{this.state.Bhojpur ? this.state.Bhojpur : 0}</span>
					</div>

					<div className="arwal classHover" onClick={e => this.onDistrictClick("Arwal","BR")}> 
						<img src="/Maps/Bihar/Arwal.png"  alt="Arwal" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Arwal_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Arwal.png")}/>
						<span className="arwalText mapTextLabel text-capitalize">Arwal</span>
						<span className="arwalNumber mapCountLabel text-center">{this.state.Arwal ? this.state.Arwal : 0}</span>
					</div>

					<div className="aurangabad classHover" onClick={e => this.onDistrictClick("Aurangabad","BR")}> 
						<img src="/Maps/Bihar/Aurangabad.png"  alt="Aurangabad" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Aurangabad_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Aurangabad.png")}/>
						<span className="aurangabadText mapTextLabel text-capitalize">Aurangabad</span>
						<span className="aurangabadNumber mapCountLabel text-center">{this.state.Aurangabad ? this.state.Aurangabad : 0}</span>
					</div>

					<div className="gaya classHover" onClick={e => this.onDistrictClick("Gaya","BR")}> 
						<img src="/Maps/Bihar/Gaya.png"  alt="Gaya" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Gaya_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Gaya.png")}/>
						<span className="gayaText mapTextLabel text-capitalize">Gaya</span>
						<span className="gayaNumber mapCountLabel text-center">{this.state.Gaya ? this.state.Gaya : 0}</span>
					</div>

					<div className="jehanabad classHover" onClick={e => this.onDistrictClick("Jehanabad","BR")}> 
						<img src="/Maps/Bihar/Jehanabad.png"  alt="Jehanabad" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Jehanabad_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Jehanabad.png")}/>
						<span className="jehanabadText mapTextLabel text-capitalize">Jehanabad</span>
						<span className="jehanabadNumber mapCountLabel text-center">{this.state.Jehanabad ? this.state.Jehanabad : 0}</span>
					</div>

					<div className="patna classHover" onClick={e => this.onDistrictClick("Patna","BR")}> 
						<img src="/Maps/Bihar/Patna.png"  alt="Patna" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Patna_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Patna.png")}/>
						<span className="patnaText mapTextLabel text-capitalize">Patna</span>
						<span className="patnaNumber mapCountLabel text-center">{this.state.Patna ? this.state.Patna : 0}</span>
					</div>

					<div className="saran classHover" onClick={e => this.onDistrictClick("Saran","BR")}> 
						<img src="/Maps/Bihar/Saran.png"  alt="Saran" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Saran_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Saran.png")}/>
						<span className="saranText mapTextLabel text-capitalize">Saran</span>
						<span className="saranNumber mapCountLabel text-center">{this.state.Saran ? this.state.Saran : 0}</span>
					</div>

					<div className="siwan classHover" onClick={e => this.onDistrictClick("Siwan","BR")}> 
						<img src="/Maps/Bihar/Siwan.png"  alt="Siwan" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Siwan_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Siwan.png")}/>
						<span className="siwanText mapTextLabel text-capitalize">Siwan</span>
						<span className="siwanNumber mapCountLabel text-center">{this.state.Siwan ? this.state.Siwan : 0}</span>
					</div>

					<div className="gopalganj classHover" onClick={e => this.onDistrictClick("Gopalganj","BR")}> 
						<img src="/Maps/Bihar/Gopalganj.png"  alt="Gopalganj" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Gopalganj_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Gopalganj.png")}/>
						<span className="gopalganjText mapTextLabel text-capitalize">Gopalganj</span>
						<span className="gopalganjNumber mapCountLabel text-center">{this.state.Gopalganj ? this.state.Gopalganj : 0}</span>
					</div>

					<div className="bettiah classHover" onClick={e => this.onDistrictClick("Bettiah","BR")}> 
						<img src="/Maps/Bihar/Bettiah.png"  alt="Bettiah" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Bettiah_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Bettiah.png")}/>
						<span className="bettiahText mapTextLabel text-capitalize">Bettiah</span>
						<span className="bettiahNumber mapCountLabel text-center">{this.state.Bettiah ? this.state.Bettiah : 0}</span>
					</div>

					<div className="motihari classHover" onClick={e => this.onDistrictClick("Motihari","BR")}> 
						<img src="/Maps/Bihar/Motihari.png"  alt="Motihari" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Motihari_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Motihari.png")}/>
						<span className="motihariText mapTextLabel text-capitalize">Motihari</span>
						<span className="motihariNumber mapCountLabel text-center">{this.state.Motihari ? this.state.Motihari : 0}</span>
					</div>

					<div className="muzaffrpur classHover" onClick={e => this.onDistrictClick("Muzaffarpur","BR")}> 
						<img src="/Maps/Bihar/Muzaffrpur.png"  alt="Muzaffrpur" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Muzaffrpur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Muzaffrpur.png")}/>
						<span className="muzaffrpurText mapTextLabel text-capitalize">Muzaffarpur</span>
						<span className="muzaffrpurNumber mapCountLabel text-center">{this.state.Muzaffarpur ? this.state.Muzaffarpur : 0}</span>
					</div>

					<div className="vaishali classHover" onClick={e => this.onDistrictClick("Vaishali","BR")}> 
						<img src="/Maps/Bihar/Vaishali.png"  alt="Vaishali" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Vaishali_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Vaishali.png")}/>
						<span className="vaishaliText mapTextLabel text-capitalize">Vaishali</span>
						<span className="vaishaliNumber mapCountLabel text-center">{this.state.Vaishali ? this.state.Vaishali : 0}</span>
					</div>

					<div className="nalanda classHover" onClick={e => this.onDistrictClick("Nalanda","BR")}> 
						<img src="/Maps/Bihar/Nalanda.png"  alt="Nalanda" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Nalanda_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Nalanda.png")}/>
						<span className="nalandaText mapTextLabel text-capitalize">Nalanda</span>
						<span className="nalandaNumber mapCountLabel text-center">{this.state.Nalanda ? this.state.Nalanda : 0}</span>
					</div>

					<div className="nawada classHover" onClick={e => this.onDistrictClick("Nawada","BR")}> 
						<img src="/Maps/Bihar/Nawada.png"  alt="Nawada" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Nawada.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Nawada.png")}/>
						<span className="nawadaText mapTextLabel text-capitalize">Nawada</span>
						<span className="nawadaNumber mapCountLabel text-center">{this.state.Nawada ? this.state.Nawada : 0}</span>
					</div>

					<div className="jamui classHover" onClick={e => this.onDistrictClick("Jamui","BR")}> 
						<img src="/Maps/Bihar/Jamui.png"  alt="Jamui" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Jamui_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Jamui.png")}/>
						<span className="jamuiText mapTextLabel text-capitalize">Jamui</span>
						<span className="jamuiNumber mapCountLabel text-center">{this.state.Jamui ? this.state.Jamui : 0}</span>
					</div>

					<div className="sheikpura classHover" onClick={e => this.onDistrictClick("Sheikpura","BR")}> 
						<img src="/Maps/Bihar/Sheikpura.png"  alt="Sheikpura" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Sheikpura_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Sheikpura.png")}/>
						<span className="sheikpuraText mapTextLabel text-capitalize">Sheikpura</span>
						<span className="sheikpuraNumber mapCountLabel text-center">{this.state.Sheikpura ? this.state.Sheikpura : 0}</span>
					</div>

					<div className="lakhisarai classHover" onClick={e => this.onDistrictClick("Lakhisarai","BR")}> 
						<img src="/Maps/Bihar/Lakhisarai.png"  alt="Lakhisarai" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Lakhisarai_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Lakhisarai.png")}/>
						<span className="lakhisaraiText mapTextLabel text-capitalize">Lakhisarai</span>
						<span className="lakhisaraiNumber mapCountLabel text-center">{this.state.Lakhisarai ? this.state.Lakhisarai : 0}</span>
					</div>

					<div className="begusarai classHover" onClick={e => this.onDistrictClick("Begusarai","BR")}> 
						<img src="/Maps/Bihar/Begusarai.png"  alt="Begusarai" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Begusarai_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Begusarai.png")}/>
						<span className="begusaraiText mapTextLabel text-capitalize">Begusarai</span>
						<span className="begusaraiNumber mapCountLabel text-center">{this.state.Begusarai ? this.state.Begusarai : 0}</span>
					</div>

					<div className="samastipur classHover" onClick={e => this.onDistrictClick("Samastipur","BR")}> 
						<img src="/Maps/Bihar/Samastipur.png"  alt="Samastipur" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Samastipur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Samastipur.png")}/>
						<span className="samastipurText mapTextLabel text-capitalize">Samastipur</span>
						<span className="samastipurNumber mapCountLabel text-center">{this.state.Samastipur ? this.state.Samastipur : 0}</span>
					</div>

					<div className="darbhanga classHover" onClick={e => this.onDistrictClick("Darbhanga","BR")}> 
						<img src="/Maps/Bihar/Darbhanga.png"  alt="Darbhanga" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Darbhanga_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Darbhanga.png")}/>
						<span className="darbhangaText mapTextLabel text-capitalize">Darbhanga</span>
						<span className="darbhangaNumber mapCountLabel text-center">{this.state.Darbhanga ? this.state.Darbhanga : 0}</span>
					</div>

					<div className="sitamarihi classHover" onClick={e => this.onDistrictClick("Sitamarihi","BR")}> 
						<img src="/Maps/Bihar/Sitamarihi.png"  alt="Sitamarihi" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Sitamarihi_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Sitamarihi.png")}/>
						<span className="sitamarihiText mapTextLabel text-capitalize">Sitamarihi</span>
						<span className="sitamarihiNumber mapCountLabel text-center">{this.state.Sitamarihi ? this.state.Sitamarihi : 0}</span>
					</div>

					<div className="sheohar classHover" onClick={e => this.onDistrictClick("Sheohar","BR")}> 
						<img src="/Maps/Bihar/Sheohar.png"  alt="Sheohar" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Sheohar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Sheohar.png")}/>
						<span className="sheoharText mapTextLabel text-capitalize">Sheohar</span>
						<span className="sheoharNumber mapCountLabel text-center">{this.state.Sheohar ? this.state.Sheohar : 0}</span>
					</div>

					<div className="madhubani classHover" onClick={e => this.onDistrictClick("Madhubani","BR")}> 
						<img src="/Maps/Bihar/Madhubani.png"  alt="Madhubani" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Madhubani_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Madhubani.png")}/>
						<span className="madhubaniText mapTextLabel text-capitalize">Madhubani</span>
						<span className="madhubaniNumber mapCountLabel text-center">{this.state.Madhubani ? this.state.Madhubani : 0}</span>
					</div>

					<div className="supaul classHover" onClick={e => this.onDistrictClick("Supaul","BR")}> 
						<img src="/Maps/Bihar/Supaul.png"  alt="Supaul" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Supaul_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Supaul.png")}/>
						<span className="supaulText mapTextLabel text-capitalize">Supaul</span>
						<span className="supaulNumber mapCountLabel text-center">{this.state.Supaul ? this.state.Supaul : 0}</span>
					</div>

					<div className="saharsa classHover" onClick={e => this.onDistrictClick("Saharsa","BR")}> 
						<img src="/Maps/Bihar/Saharsa.png"  alt="Saharsa" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Saharsa_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Saharsa.png")}/>
						<span className="saharsaText mapTextLabel text-capitalize">Saharsa</span>
						<span className="saharsaNumber mapCountLabel text-center">{this.state.Saharsa ? this.state.Saharsa : 0}</span>
					</div>

					<div className="khagaria classHover" onClick={e => this.onDistrictClick("Khagaria","BR")}> 
						<img src="/Maps/Bihar/Khagaria.png"  alt="Khagaria" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Khagaria_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Khagaria.png")}/>
						<span className="khagariaText mapTextLabel text-capitalize">Khagaria</span>
						<span className="khagariaNumber mapCountLabel text-center">{this.state.Khagaria ? this.state.Khagaria : 0}</span>
					</div>

					<div className="munger classHover" onClick={e => this.onDistrictClick("Munger","BR")}> 
						<img src="/Maps/Bihar/Munger.png"  alt="Munger" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Munger_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Munger.png")}/>
						<span className="mungerText mapTextLabel text-capitalize">Munger</span>
						<span className="mungerNumber mapCountLabel text-center">{this.state.Munger ? this.state.Munger : 0}</span>
					</div>

					<div className="banka classHover" onClick={e => this.onDistrictClick("Banka","BR")}> 
						<img src="/Maps/Bihar/Banka.png"  alt="Banka" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Banka_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Banka.png")}/>
						<span className="bankaText mapTextLabel text-capitalize">Banka</span>
						<span className="bankaNumber mapCountLabel text-center">{this.state.Banka ? this.state.Banka : 0}</span>
					</div>

					<div className="bhagalpur classHover" onClick={e => this.onDistrictClick("Bhagalpur","BR")}> 
						<img src="/Maps/Bihar/Bhagalpur.png"  alt="Bhagalpur" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Bhagalpur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Bhagalpur.png")}/>
						<span className="bhagalpurText mapTextLabel text-capitalize">Bhagalpur</span>
						<span className="bhagalpurNumber mapCountLabel text-center">{this.state.Bhagalpur ? this.state.Bhagalpur : 0}</span>
					</div>

					<div className="mahepura classHover" onClick={e => this.onDistrictClick("Mahepura","BR")}> 
						<img src="/Maps/Bihar/Mahepura.png"  alt="Mahepura" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Mahepura_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Mahepura.png")}/>
						<span className="mahepuraText mapTextLabel text-capitalize">Mahepura</span>
						<span className="mahepuraNumber mapCountLabel text-center">{this.state.Mahepura ? this.state.Mahepura : 0}</span>
					</div>

					<div className="araria classHover" onClick={e => this.onDistrictClick("Araria","BR")}> 
						<img src="/Maps/Bihar/Araria.png"  alt="Araria" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Araria_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Araria.png")}/>
						<span className="arariaText mapTextLabel text-capitalize">Araria</span>
						<span className="arariaNumber mapCountLabel text-center">{this.state.Araria ? this.state.Araria : 0}</span>
					</div>

					<div className="purnea classHover" onClick={e => this.onDistrictClick("Purnea","BR")}> 
						<img src="/Maps/Bihar/Purnea.png"  alt="Purnea" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Purnea_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Purnea.png")}/>
						<span className="purneaText mapTextLabel text-capitalize">Purnea</span>
						<span className="purneaNumber mapCountLabel text-center">{this.state.Purnea ? this.state.Purnea : 0}</span>
					</div>

					<div className="katihar classHover" onClick={e => this.onDistrictClick("Katihar","BR")}> 
						<img src="/Maps/Bihar/Katihar.png"  alt="Katihar" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Katihar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Katihar.png")}/>
						<span className="katiharText mapTextLabel text-capitalize">Katihar</span>
						<span className="katiharNumber mapCountLabel text-center">{this.state.Katihar ? this.state.Katihar : 0}</span>
					</div>

					<div className="kishanganj classHover" onClick={e => this.onDistrictClick("Kishanganj","BR")}> 
						<img src="/Maps/Bihar/Kishanganj.png"  alt="Kishanganj" onMouseOver={e => (e.currentTarget.src = "/Maps/Bihar/Kishanganj_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Bihar/Kishanganj.png")}/>
						<span className="kishanganjText mapTextLabel text-capitalize">Kishanganj</span>
						<span className="kishanganjNumber mapCountLabel text-center">{this.state.Kishanganj ? this.state.Kishanganj : 0}</span>
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

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Bihar));