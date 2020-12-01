import React,{Component}     from 'react';

import JobListCandidate    	 from '../../blocks/jobList/JobList.js';
import LeftSideFilters       from '../../blocks/LeftSideFilters/LeftSideFilters.js';

class JobListCandidatePage extends Component{
	constructor(props){
		super(props);

	}

	
	render(){
		return(
				<div className="mainPagesWrapper col-lg-12">
					<div className="row">
						<div className="col-lg-3">
							<div className="row">
								<LeftSideFilters/>
							</div>
						</div>
						<div className="col-lg-9">
							<div className="row">
								<JobListCandidate/>
							</div>
						</div>
					</div>
				</div>
			);
	}
}

export default JobListCandidatePage;