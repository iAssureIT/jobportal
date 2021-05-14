import React,{Component} from 'react';
import"./BasicLayout.css";


import TitleLayout      from '../../blocks/TitleLayout/TitleLayout.js';
import Address     	    from '../../blocks/Address/Address.js';
import MenuDiv          from "../../Common/MenuDiv/MenuDiv.js";

class CandidateAddress extends Component{

	render(){
	
		return(
				<div className=" col-lg-12">
					<div className="mainPagesWrapper col-lg-12">
						<div className="col-lg-12">
							<MenuDiv/>
						</div>
						<div className="col-lg-10 col-lg-offset-1 basicInfoWrapper row">
							<div className=" col-lg-12 BasicInfoBlock">
								<TitleLayout title="Address Info" subtitle="Address Details" pageNumber="2"/>
								<Address/>
							</div>
						</div>
					</div>
				</div>
			);
	}
}

export default CandidateAddress;