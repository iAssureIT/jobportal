import React,{Component}     from 'react';

import ApplyJob    	 from '../../blocks/ApplyJob/ApplyJob.js';

class ApplyJobList extends Component{
	constructor(props){
		super(props);

	}

	
	render(){
		return(
				<div className="mainPagesWrapper col-lg-12">
					<div className="row">
						<ApplyJob/>
					</div>
				</div>
			);
	}
}

export default ApplyJobList;