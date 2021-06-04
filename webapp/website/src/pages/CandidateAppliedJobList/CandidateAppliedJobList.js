import React,{Component}      from 'react';
import CandidateApplyJoblist  from '../../blocks/CandidateApplyJoblist/CandidateApplyJoblist.js';

class CandidateAppliedJoblistPage extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
				<div className="mainPagesWrapper col-lg-12">
					<div className="">
						<CandidateApplyJoblist/>
					</div>
				</div>
			);
	}
}

export default CandidateAppliedJoblistPage;