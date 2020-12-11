import React,{Component} from 'react';
import"./BasicLayout.css";
import MenuDiv          from "../../Common/MenuDiv/MenuDiv.js";
import TitleLayout       from '../../Blocks/TitleLayout/TitleLayout.js';
import Certification     from '../../Blocks/Certification/Certification.js';

class CandidateCertification extends Component{

	render(){
		return(
				
				<div className=" col-lg-12">
					<div className="mainPagesWrapper col-lg-12">
						<div className="col-lg-12">
							<MenuDiv/>
						</div>
						<div className="col-lg-10 col-lg-offset-1 basicInfoWrapper row">
							<div className=" col-lg-12 BasicInfoBlock">
								<TitleLayout title="Skills & Certification"  pageNumber="5"/>
							<Certification/>
							</div>
						</div>
					</div>
				</div>
			);
	}
}

export default CandidateCertification;