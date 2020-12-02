import React,{Component} from 'react';

import ProgressBar     	from '../../blocks/ProgressBar/ProgressBar.js';
import TitleLayout       from '../../blocks/TitleLayout/TitleLayout.js';
import BasicInfoForm     from '../../blocks/BasicInfoForm/BasicInfoForm.js';

class CandidateBasicInfo extends Component{
	constructor(props){
		super(props);

	}

	
	render(){
		return(		
				<div className="mainPagesWrapper col-lg-12">
					<div className="row">
						<ProgressBar width="0" left="0" active="active"/>
					</div>
					<div className="basicInfoWrapper row">
						<div className=" col-lg-8 col-lg-offset-2 BasicInfoBlock">
							<TitleLayout title="Basic Info" subtitle="Personal Info" pageNumber="1"/>
							<BasicInfoForm/>
						</div>
					</div>
				</div>
			);
	}
}

export default CandidateBasicInfo;