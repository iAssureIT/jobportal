import React,{Component} from 'react';
import LeftAside    	 from './LeftAside/LeftAside.js';
import MiddelContent    	 from './MiddelContent/MiddelContent.js';
import RightAside    	 from './RightAside/RightAside.js';

import './CandidateProfile.css';

class CandidateProfile extends Component{
	render(){
		return(
				<div className="container-fluid candidateProfileWrapper ">
					<div className="  col-lg-12">
						<div className=" candidateProfile">
							<div className="row">
								<div className="  col-lg-12">
									<div className="col-lg-3">
										
											<LeftAside/>
										
									</div>
									<div className="col-lg-6">
										<div className="row">
											<MiddelContent/>
										</div>
									</div>
									<div className="col-lg-3">
										
											<RightAside/>
										
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

			);
	}
}

export default CandidateProfile;