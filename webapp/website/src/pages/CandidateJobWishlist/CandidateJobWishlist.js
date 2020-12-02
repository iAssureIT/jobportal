import React,{Component}     from 'react';

import JobWishlist    	 from '../../blocks/jobWishlist/JobWishlist.js';

class CandidateJobWishlist extends Component{
	constructor(props){
		super(props);

	}

	
	render(){
		return(
				<div className="mainPagesWrapper col-lg-12">
					<div className="row">
						<JobWishlist/>
					</div>
				</div>
			);
	}
}

export default CandidateJobWishlist;