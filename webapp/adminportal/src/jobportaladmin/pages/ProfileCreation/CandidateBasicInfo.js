import React,{Component} from 'react';
import"./BasicLayout.css";


import TitleLayout       from '../../blocks/TitleLayout/TitleLayout.js';
import BasicInfoForm     from '../../blocks/BasicInfoForm/BasicInfoForm.js';
import MenuDiv from "../../Common/MenuDiv/MenuDiv.js";

class CandidateBasicInfo extends Component{
	render(){
		return(		
				<div className=" col-lg-12">
					<div className="mainPagesWrapper col-lg-12">
						<div className="col-lg-12">
							<MenuDiv/>
						</div>
						<div className="col-lg-10 col-lg-offset-1 basicInfoWrapper row">
							<div className=" col-lg-12 BasicInfoBlock">
								<TitleLayout title="Basic Info" subtitle="Personal Info" pageNumber="1"/>
								<BasicInfoForm/>
							</div>
						</div>
					</div>
				</div>
			);
	}
}

export default CandidateBasicInfo;