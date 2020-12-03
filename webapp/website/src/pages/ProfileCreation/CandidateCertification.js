import React,{Component} from 'react';

import ProgressBar     	from '../../blocks/ProgressBar/ProgressBar.js';
import TitleLayout       from '../../blocks/TitleLayout/TitleLayout.js';
import Certification     from '../../blocks/Certification/Certification.js';

class CandidateCertification extends Component{

	render(){
		return(
				<div className="mainPagesWrapper col-lg-12">
					<div className="row">
						<ProgressBar width="80" left="77.5" img="37" location={window.location.href} />
					</div>
					<div className="basicInfoWrapper row">
						<div className=" col-lg-8 col-lg-offset-2 BasicInfoBlock">
							<TitleLayout title="Skills & Certification"  pageNumber="5"/>
							<Certification/>
						</div>
					</div>
				</div>
			);
	}
}

export default CandidateCertification;