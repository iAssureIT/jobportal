import React,{Component} from 'react';

import ProgressBar     	from '../../blocks/ProgressBar/ProgressBar.js';
import TitleLayout       from '../../blocks/TitleLayout/TitleLayout.js';
import Academics      	 from '../../blocks/Academics/Academics.js';

class CandidateAcademics extends Component{
	
	render(){
		
		return(
				<div className="mainPagesWrapper col-md-12">
					<div className="row">
						<ProgressBar width="50" left="48" img="37" />
					</div>
					<div className="basicInfoWrapper row justify-content-md-center">
						<div className=" col-md-8  BasicInfoBlock">
							<div className="row">
								<TitleLayout title="Academics" subtitle="Education Qualification" pageNumber="3"/>
								<Academics/>
							</div>
						</div>
					</div>
				</div>
			);
	}
}

export default CandidateAcademics;