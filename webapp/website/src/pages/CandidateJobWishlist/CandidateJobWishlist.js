import React,{Component}     from 'react';

import CandidateWishlist    	 from '../../blocks/CandidateWishlist/CandidateWishlist.js';

class CandidateJobWishlist extends Component{
	constructor(props){
		super(props);

	}

	
	render(){
		return(
				<div className="mainPagesWrapper col-lg-12">
					<div className="row">
						<CandidateWishlist/>
					</div>
				</div>
			);
	}
}

export default CandidateJobWishlist;