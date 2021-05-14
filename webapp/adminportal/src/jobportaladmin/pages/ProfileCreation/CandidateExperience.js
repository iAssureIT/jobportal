import React,{Component} from 'react';
import"./BasicLayout.css";
import MenuDiv          from "../../Common/MenuDiv/MenuDiv.js";


import TitleLayout       from '../../blocks/TitleLayout/TitleLayout.js';
import Experience     from '../../blocks/Experience/Experience.js';

class CandidateExperience extends Component{
	render(){
		return(
				<div className=" col-lg-12">
					<div className="mainPagesWrapper col-lg-12">
						<div className="col-lg-12">
							<MenuDiv/>
						</div>
						<div className="col-lg-10 col-lg-offset-1 basicInfoWrapper row">
							<div className=" col-lg-12 BasicInfoBlock">
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