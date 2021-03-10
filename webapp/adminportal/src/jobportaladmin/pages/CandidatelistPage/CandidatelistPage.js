import React, {Component} 	from 'react';
import Candidatelist		from '../../blocks/Candidatelist/Candidatelist.js';


class CandidatelistPage extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
					<div className="container-fluid">
						<div className="row candidatePage">
							<Candidatelist job_id={this.props.match.params.job_id } />
						</div>
					</div>
			);	
	}
}


export default (CandidatelistPage);
