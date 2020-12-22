import React, {Component} 	from 'react';
import "../listCss/CandidateJoblist.css";
import Candidatelist		from '../../blocks/Candidatelist/Candidatelist.js';


class CandidatelistPage extends Component{

	render(){
		return(
					<div className="container-fluid">
						<div className="row">
							<Candidatelist />
						</div>
					</div>
			);	
	}
}


export default (CandidatelistPage);
