import React,{Component} from 'react';

import ProgressBar     	from '../../blocks/ProgressBar/ProgressBar.js';
import TitleLayout       from '../../blocks/TitleLayout/TitleLayout.js';
import Experience     from '../../blocks/Experience/Experience.js';

class CandidateExperience extends Component{
	render(){
		return(
				<div className="mainPagesWrapper col-lg-12">
					<div className="row">
						<ProgressBar width="100" left="97.5" img="38" location={window.location.href} />
					</div>
					<div className="basicInfoWrapper row">
						<div className=" col-lg-8 col-lg-offset-2 BasicInfoBlock">
							<TitleLayout title="Work Experience" pageNumber="6"/>
							<Experience/>
						</div>
					</div>
				</div>
			);
	}
}

export default CandidateExperience;