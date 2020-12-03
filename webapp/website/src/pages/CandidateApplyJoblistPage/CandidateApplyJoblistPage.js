import React,{Component}      from 'react';
import CandidateApplyJoblist  from '../../blocks/CandidateApplyJoblist/CandidateApplyJoblist.js';

class CandidateApplyJoblistPage extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
				<div className="mainPagesWrapper col-lg-12">
					<div className="row">
						<CandidateApplyJoblist/>
					</div>
				</div>
			);
	}
}

export default CandidateApplyJoblistPage;