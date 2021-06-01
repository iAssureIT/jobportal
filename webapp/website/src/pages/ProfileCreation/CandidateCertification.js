import React,{Component} from 'react';

import ProgressBar     	from '../../blocks/ProgressBar/ProgressBar.js';
import TitleLayout       from '../../blocks/TitleLayout/TitleLayout.js';
import Certification     from '../../blocks/Certification/Certification.js';

class CandidateCertification extends Component{

	render(){
		return(
				<div className="mainPagesWrapper col-lg-12">
					<div className="row">
						<ProgressBar width="75" left="73" img="37" />
					</div>
					<div className="basicInfoWrapper row justify-content-md-center">
						<div className=" col-md-8  BasicInfoBlock">
							<div className="row">
								<TitleLayout title="Skills & Certification"  pageNumber="4"/>
								<Certification/>
							</div>
						</div>
					</div>
				</div>
			);
	}
}

export default CandidateCertification;