import React, {Component} 	from 'react';
import CandidatesList	from '../../blocks/CandidatesList/CandidatesList.js';


class CandidatesListPage extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
					<div className="container-fluid">
						<div className="row">
							<CandidatesList/>
						</div>
					</div>
			);	
	}
}


export default (CandidatesListPage);
