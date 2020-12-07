import React,{Component} from 'react';

import ProgressBar     	from '../../blocks/ProgressBar/ProgressBar.js';
import TitleLayout       from '../../blocks/TitleLayout/TitleLayout.js';
import Contact     	     from '../../blocks/Contact/Contact.js';

class CandidateContact extends Component{
	
	render(){
		return(
				<div className="mainPagesWrapper col-lg-12">
					<div className="row">
						<ProgressBar width="40" left="37.5" img="37" location={window.location.pathname}  />
					</div>
					<div className="basicInfoWrapper row">
						<div className=" col-lg-8 col-lg-offset-2 BasicInfoBlock">
							<TitleLayout title="Contact Details" subtitle="Personal Contact Details" pageNumber="3"/>
							<Contact/>
						</div>
						
					</div>
				</div>
			);
	}
}

export default CandidateContact;