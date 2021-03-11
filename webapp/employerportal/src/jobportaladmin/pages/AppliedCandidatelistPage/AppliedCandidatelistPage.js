import React, {Component} 	from 'react';
import AppliedCandidatelist	from '../../blocks/AppliedCandidatelist/AppliedCandidatelist.js';


class AppliedCandidatelistPage extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
					<div className="container-fluid">
						<div className="row">
							<AppliedCandidatelist job_id={this.props.match.params.job_id } />
						</div>
					</div>
			);	
	}
}


export default (AppliedCandidatelistPage);
