import React,{Component} from 'react';

import ProgressBar     	from '../../blocks/ProgressBar/ProgressBar.js';
import TitleLayout       from '../../blocks/TitleLayout/TitleLayout.js';
import BasicInfoForm     from '../../blocks/BasicInfoForm/BasicInfoForm.js';

class CandidateBasicInfo extends Component{
	render(){
		return(		
				<div className="mainPagesWrapper col-12">
					<div className="row">
						<ProgressBar width="0" left="0" active="active" />				
					</div>
					<div className="basicInfoWrapper row justify-content-md-center">
						<div className=" col-md-8 col-12 BasicInfoBlock">
							<div className="row">
								<TitleLayout title="Basic Info" subtitle="Personal Info" pageNumber="1"/>
								<BasicInfoForm/>
							</div>
						</div>
					</div>
				</div>
			);
	}
}

export default CandidateBasicInfo;