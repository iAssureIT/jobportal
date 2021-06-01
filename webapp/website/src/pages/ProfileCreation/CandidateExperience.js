import React,{Component} from 'react';

import ProgressBar     	from '../../blocks/ProgressBar/ProgressBar.js';
import TitleLayout       from '../../blocks/TitleLayout/TitleLayout.js';
import Experience     from '../../blocks/Experience/Experience.js';

class CandidateExperience extends Component{
	render(){
		return(
				<div className="mainPagesWrapper col-lg-12">
					<div className="row">
						<ProgressBar width="100" left="98" img="38"  />
					</div>
					<div className="basicInfoWrapper row justify-content-md-center">
						<div className=" col-md-8  BasicInfoBlock">
							<div className="row">
								<TitleLayout title="Work Experience" pageNumber="5"/>
								<Experience/>
							</div>
						</div>
					</div>
				</div>
			);
	}
}

export default CandidateExperience;