import React,{Component} from 'react';

import ProgressBar     	from '../../blocks/ProgressBar/ProgressBar.js';
import TitleLayout      from '../../blocks/TitleLayout/TitleLayout.js';
import Address     	    from '../../blocks/Address/Address.js';

class CandidateAddress extends Component{

	render(){
	
		return(
				<div className="mainPagesWrapper col-md-12">
					<div className="row">	
						<ProgressBar width="25" left="23" img="37"  />
					</div>
					<div className="basicInfoWrapper row justify-content-md-center">
						<div className=" col-md-8 BasicInfoBlock">
							<div className="row">
								<TitleLayout title="Address Info" subtitle="Address Details" pageNumber="2"/>
								<Address/>
							</div>
						</div>
					</div>
				</div>
			);
	}
}

export default CandidateAddress;