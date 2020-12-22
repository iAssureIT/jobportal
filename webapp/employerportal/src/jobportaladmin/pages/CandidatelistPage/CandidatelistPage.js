import React, {Component} 	from 'react';
import "./CandidateJoblist.css";
import Candidatelist		from '../../blocks/Candidatelist/Candidatelist.js';


class CandidatelistPage extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
					<div className="container-fluid">
						<div className="row">
							<Candidatelist jobID={this.props.match.params.jobID } />
						</div>
					</div>
			);	
	}
}


export default (CandidatelistPage);
