import React,{Component} from 'react';
import"./BasicLayout.css";
import MenuDiv          from "../../Common/MenuDiv/MenuDiv.js";

import TitleLayout       from '../../blocks/TitleLayout/TitleLayout.js';
import Contact     	     from '../../blocks/Contact/Contact.js';

class CandidateContact extends Component{
	
	render(){
		return(
				<div className=" col-lg-12">
					<div className="mainPagesWrapper col-lg-12">
						<div className="col-lg-12">
							<MenuDiv/>
						</div>
						<div className="col-lg-10 col-lg-offset-1 basicInfoWrapper row">
							<div className=" col-lg-12 BasicInfoBlock">
								<TitleLayout title="Contact Details" subtitle="Personal Contact Details" pageNumber="3"/>
								<Contact/>
							</div>
						</div>
					</div>
				</div>
			);
	}
}

export default CandidateContact;