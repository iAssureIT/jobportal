import React, {Component}     from 'react';
import Axios 				  from 'axios';
import Swal 				  from 'sweetalert2';
import {Redirect}             from 'react-router-dom';
import { withRouter }         from 'react-router-dom';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../common/actions/index';
import './Assam.css';
import '../global.css';


class Assam extends Component{
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
		console.log("Assam...............................");
		return(
			<div className="bodyWrapper">
				<div className="stateWrapper">

					<div className="kokrajhar classHover" onClick={e => this.onDistrictClick("Kokrajhar","AS")}> 
						<img src="/Maps/Assam/Kokrajhar.png" alt="Kokrajhar" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Kokrajhar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Kokrajhar.png")}/>
						<span className="kokrajharText mapTextLabel text-capitalije">Kokrajhar</span>
						<span className="kokrajharNumber mapCountLabel text-center">{this.state.Kokrajhar ? this.state.Kokrajhar : 0}</span>
					</div>

					<div className="dhuburi classHover" onClick={e => this.onDistrictClick("Dhuburi","AS")}> 
						<img src="/Maps/Assam/Dhuburi.png" alt="Dhubri" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Dhuburi_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Dhuburi.png")}/>
						<span className="dhuburiText mapTextLabel text-capitalije">Dhubri</span>
						<span className="dhuburiNumber mapCountLabel text-center">{this.state.Dhubri ? this.state.Dhubri : 0}</span>
					</div>

					<div className="chirang classHover" onClick={e => this.onDistrictClick("Chirang","AS")}> 
						<img src="/Maps/Assam/Chirang.png" alt="Chirang" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Chirang_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Chirang.png")}/>
						<span className="chirangText mapTextLabel text-capitalije">Chirang</span>
						<span className="chirangNumber mapCountLabel text-center">{this.state.Chirang ? this.state.Chirang : 0}</span>
					</div>

					<div className="bongaigaon classHover" onClick={e => this.onDistrictClick("Bongaigaon","AS")}> 
						<img src="/Maps/Assam/Bongaigaon.png" alt="Bongaigaon" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Bongaigaon_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Bongaigaon.png")}/>
						<span className="bongaigaonText mapTextLabel text-capitalije">Bongaigaon</span>
						<span className="bongaigaonNumber mapCountLabel text-center">{this.state.Bongaigaon ? this.state.Bongaigaon : 0}</span>
					</div>

					<div className="gopalpara classHover" onClick={e => this.onDistrictClick("Goalpara","AS")}> 
						<img src="/Maps/Assam/Gopalpara.png" alt="Goalpara" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Gopalpara_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Gopalpara.png")}/>
						<span className="gopalparaText mapTextLabel text-capitalije">Goalpara</span>
						<span className="gopalparaNumber mapCountLabel text-center">{this.state.Goalpara ? this.state.Goalpara : 0}</span>
					</div>

					<div className="baksa classHover" onClick={e => this.onDistrictClick("Baksa","AS")}> 
						<img src="/Maps/Assam/Baksa.png" alt="Baksa" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Baksa_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Baksa.png")}/>
						<span className="baksaText mapTextLabel text-capitalije">Baksa</span>
						<span className="baksaNumber mapCountLabel text-center">{this.state.Baksa ? this.state.Baksa : 0}</span>
					</div>

					<div className="barpeta classHover" onClick={e => this.onDistrictClick("Barpeta","AS")}> 
						<img src="/Maps/Assam/Barpeta.png" alt="Barpeta" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Barpeta_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Barpeta.png")}/>
						<span className="barpetaText mapTextLabel text-capitalije">Barpeta</span>
						<span className="barpetaNumber mapCountLabel text-center">{this.state.Barpeta ? this.state.Barpeta : 0}</span>
					</div>

					<div className="nalbari classHover" onClick={e => this.onDistrictClick("Nalbari","AS")}> 
						<img src="/Maps/Assam/Nalbari.png" alt="Nalbari" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Nalbari_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Nalbari.png")}/>
						<span className="nalbariText mapTextLabel text-capitalije">Nalbari</span>
						<span className="nalbariNumber mapCountLabel text-center">{this.state.Nalbari ? this.state.Nalbari : 0}</span>
					</div>

					<div className="kamrup classHover" onClick={e => this.onDistrictClick("Kamrup","AS")}> 
						<img src="/Maps/Assam/Kamrup.png" alt="Kamrup" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Kamrup_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Kamrup.png")}/>
						<span className="kamrupText mapTextLabel text-capitalije">Kamrup</span>
						<span className="kamrupNumber mapCountLabel text-center">{this.state.Kamrup ? this.state.Kamrup : 0}</span>
					</div>

					<div className="udalguri classHover" onClick={e => this.onDistrictClick("Udalguri","AS")}> 
						<img src="/Maps/Assam/Udalguri.png" alt="Udalguri" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Udalguri_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Udalguri.png")}/>
						<span className="udalguriText mapTextLabel text-capitalije">Udalguri</span>
						<span className="udalguriNumber mapCountLabel text-center">{this.state.Udalguri ? this.state.Udalguri : 0}</span>
					</div>

					<div className="darrang classHover" onClick={e => this.onDistrictClick("Darrang","AS")}> 
						<img src="/Maps/Assam/Darrang.png" alt="Darrang" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Darrang_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Darrang.png")}/>
						<span className="darrangText mapTextLabel text-capitalije">Darrang</span>
						<span className="darrangNumber mapCountLabel text-center">{this.state.Darrang ? this.state.Darrang : 0}</span>
					</div>

					<div className="kamrup_metro classHover" onClick={e => this.onDistrictClick("Kamrup_Metropolitan","AS")}> 
						<img src="/Maps/Assam/Kamrup_Metro.png" alt="Kamrup_Metro" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Kamrup_Metro_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Kamrup_Metro.png")}/>
						<span className="kamrup_metroText mapTextLabel text-capitalije">Kamrup Metropolitan</span>
						<span className="kamrup_metroNumber mapCountLabel text-center">{this.state.Kamrup_Metropolitan ? this.state.Kamrup_Metropolitan : 0}</span>
					</div>

					<div className="marigaon classHover" onClick={e => this.onDistrictClick("Morigaon","AS")}> 
						<img src="/Maps/Assam/Marigaon.png" alt="Marigaon" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Marigaon_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Marigaon.png")}/>
						<span className="marigaonText mapTextLabel text-capitalije">Morigaon</span>
						<span className="marigaonNumber mapCountLabel text-center">{this.state.Morigaon ? this.state.Morigaon : 0}</span>
					</div>

					<div className="sonitpur classHover" onClick={e => this.onDistrictClick("Sonitpur","AS")}> 
						<img src="/Maps/Assam/Sonitpur.png" alt="Sonitpur" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Sonitpur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Sonitpur.png")}/>
						<span className="sonitpurText mapTextLabel text-capitalije">Sonitpur</span>
						<span className="sonitpurNumber mapCountLabel text-center">{this.state.Sonitpur ? this.state.Sonitpur : 0}</span>
					</div>

					<div className="biswanath classHover" onClick={e => this.onDistrictClick("Biswanath","AS")}> 
						<img src="/Maps/Assam/Biswanath.png" alt="Biswanath" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Biswanath_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Biswanath.png")}/>
						<span className="biswanathText mapTextLabel text-capitalije">Biswanath</span>
						<span className="biswanathNumber mapCountLabel text-center">{this.state.Biswanath ? this.state.Biswanath : 0}</span>
					</div>

					

					<div className="nagaon classHover" onClick={e => this.onDistrictClick("Nagaon","AS")}> 
						<img src="/Maps/Assam/Nagaon.png" alt="Nagaon" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Nagaon_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Nagaon.png")}/>
						<span className="nagaonText mapTextLabel text-capitalije">Nagaon</span>
						<span className="nagaonNumber mapCountLabel text-center">{this.state.Nagaon ? this.state.Nagaon : 0}</span>
					</div>

					<div className="karbi_anglong_west classHover" onClick={e => this.onDistrictClick("West_Karbi_Anglong","AS")}> 
						<img src="/Maps/Assam/Karbi_Anglong_West.png" alt="Karbi_Anglong_West" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Karbi_Anglong_West_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Karbi_Anglong_West.png")}/>
						<span className="karbi_anglong_westText mapTextLabel text-capitalije">West Karbi Anglong</span>
						<span className="karbi_anglong_westNumber mapCountLabel text-center">{this.state.West_Karbi_Anglong ? this.state.West_Karbi_Anglong : 0}</span>
					</div>

					<div className="karbi_anglong_east classHover" onClick={e => this.onDistrictClick("Karbi_Anglong_East","AS")}> 
						<img src="/Maps/Assam/Karbi_Anglong_East.png" alt="Karbi_Anglong_East" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Karbi_Anglong_East_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Karbi_Anglong_East.png")}/>
						<span className="karbi_anglong_eastText mapTextLabel text-capitalije">Karbi Anglong East</span>
						<span className="karbi_anglong_eastNumber mapCountLabel text-center">{this.state.Karbi_Anglong ? this.state.Karbi_Anglong : 0}</span>
					</div>

					<div className="golaghat classHover" onClick={e => this.onDistrictClick("Golaghat","AS")}> 
						<img src="/Maps/Assam/Golaghat.png" alt="Golaghat" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Golaghat_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Golaghat.png")}/>
						<span className="golaghatText mapTextLabel text-capitalije">Golaghat</span>_
						<span className="golaghatNumber mapCountLabel text-center">{this.state.Golaghat ? this.state.Golaghat : 0}</span>
					</div>

					<div className="lakhimpur classHover" onClick={e => this.onDistrictClick("Lakhimpur","AS")}> 
						<img src="/Maps/Assam/Lakhimpur.png" alt="Lakhimpur" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Lakhimpur_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Lakhimpur.png")}/>
						<span className="lakhimpurText mapTextLabel text-capitalije">Lakhimpur</span>
						<span className="lakhimpurNumber mapCountLabel text-center">{this.state.Lakhimpur ? this.state.Lakhimpur : 0}</span>
					</div>

					<div className="jorhat classHover" onClick={e => this.onDistrictClick("Jorhat","AS")}> 
						<img src="/Maps/Assam/Jorhat.png" alt="Jorhat" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Jorhat_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Jorhat.png")}/>
						<span className="jorhatText mapTextLabel text-capitalije">Jorhat</span>
						<span className="jorhatNumber mapCountLabel text-center">{this.state.Jorhat ? this.state.Jorhat : 0}</span>
					</div>

					<div className="sibsagar classHover" onClick={e => this.onDistrictClick("Sivasagar","AS")}> 
						<img src="/Maps/Assam/Sibsagar.png" alt="Sivasagar" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Sibsagar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Sibsagar.png")}/>
						<span className="sibsagarText mapTextLabel text-capitalije">Sivasagar</span>
						<span className="sibsagarNumber mapCountLabel text-center">{this.state.Sivasagar ? this.state.Sivasagar : 0}</span>
					</div>

					<div className="dibrugarh classHover" onClick={e => this.onDistrictClick("Dibrugarh","AS")}> 
						<img src="/Maps/Assam/Dibrugarh.png" alt="Dibrugarh" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Dibrugarh_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Dibrugarh.png")}/>
						<span className="dibrugarhText mapTextLabel text-capitalije">Dibrugarh</span>
						<span className="dibrugarhNumber mapCountLabel text-center">{this.state.Dibrugarh ? this.state.Dibrugarh : 0}</span>
					</div>

					<div className="dhemaji classHover" onClick={e => this.onDistrictClick("Dhemaji","AS")}> 
						<img src="/Maps/Assam/Dhemaji.png" alt="Dhemaji" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Dhemaji_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Dhemaji.png")}/>
						<span className="dhemajiText mapTextLabel text-capitalije">Dhemaji</span>
						<span className="dhemajiNumber mapCountLabel text-center">{this.state.Dhemaji ? this.state.Dhemaji : 0}</span>
					</div>

					<div className="tinsukia classHover" onClick={e => this.onDistrictClick("Tinsukia","AS")}> 
						<img src="/Maps/Assam/Tinsukia.png" alt="Tinsukia" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Tinsukia_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Tinsukia.png")}/>
						<span className="tinsukiaText mapTextLabel text-capitalije">Tinsukia</span>
						<span className="tinsukiaNumber mapCountLabel text-center">{this.state.Tinsukia ? this.state.Tinsukia : 0}</span>
					</div>

					<div className="dima_hasao classHover" onClick={e => this.onDistrictClick("Dima_Hasao","AS")}> 
						<img src="/Maps/Assam/Dima_Hasao.png" alt="Dima_Hasao" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Dima_Hasao_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Dima_Hasao.png")}/>
						<span className="dima_hasaoText mapTextLabel text-capitalije">Dima Hasao</span>
						<span className="dima_hasaoNumber mapCountLabel text-center">{this.state.Dima_Hasao ? this.state.Dima_Hasao : 0}</span>
					</div>

					<div className="cachar classHover" onClick={e => this.onDistrictClick("Cachar","AS")}> 
						<img src="/Maps/Assam/Cachar.png" alt="Cachar" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Cachar_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Cachar.png")}/>
						<span className="cacharText mapTextLabel text-capitalije">Cachar</span>
						<span className="cacharNumber mapCountLabel text-center">{this.state.Cachar ? this.state.Cachar : 0}</span>
					</div>

					<div className="hailakandi classHover" onClick={e => this.onDistrictClick("Hailakandi","AS")}> 
						<img src="/Maps/Assam/Hailakandi.png" alt="Hailakandi" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Hailakandi_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Hailakandi.png")}/>
						<span className="hailakandiText mapTextLabel text-capitalije">Hailakandi</span>
						<span className="hailakandiNumber mapCountLabel text-center">{this.state.Hailakandi ? this.state.Hailakandi : 0}</span>
					</div>

					<div className="karimganj classHover" onClick={e => this.onDistrictClick("Karimganj","AS")}> 
						<img src="/Maps/Assam/Karimganj.png" alt="Karimganj" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Karimganj_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Karimganj.png")}/>
						<span className="karimganjText mapTextLabel text-capitalije">Karimganj</span>
						<span className="karimganjNumber mapCountLabel text-center">{this.state.Karimganj ? this.state.Karimganj : 0}</span>
					</div>

					<div className="majuli classHover" onClick={e => this.onDistrictClick("Majuli","AS")}> 
						<img src="/Maps/Assam/Majuli.png" alt="Majuli" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Majuli_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Majuli.png")}/>
						<span className="majuliText mapTextLabel text-capitalije">Majuli</span>
						<span className="majuliNumber mapCountLabel text-center">{this.state.Majuli ? this.state.Majuli : 0}</span>
					</div>

					<div className="hojai classHover" onClick={e => this.onDistrictClick("Hojai","AS")}> 
						<img src="/Maps/Assam/Hojai.png" alt="v" onMouseOver={e => (e.currentTarget.src = "/Maps/Assam/Hojai_.png")} onMouseOut={e => (e.currentTarget.src = "/Maps/Assam/Hojai.png")}/>
						<span className="hojaiText mapTextLabel text-capitalije">Hojai</span>
						<span className="hojaiNumber mapCountLabel text-center">{this.state.Hojai ? this.state.Hojai : 0}</span>
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

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Assam));