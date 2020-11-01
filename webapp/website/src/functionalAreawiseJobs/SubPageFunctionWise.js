
import React, { Component }                       from 'react';
import LeftMenu from '../common/leftMenu/LeftMenu.js';
import LeftSideFilters from '../common/leftSideFilters/LeftSideFilters.js';
import SubFunctionalAreawiseJobs from './blocks/SubFunctionalAreawiseJobs.js';
import './PageFunctionWise.css'


export default class SubPageFunctionWise extends Component{
	
	
	render(){
		
		return(
			<div className="col-lg-12">
				<div className=" col-lg-12">
						<LeftMenu/>
						<LeftSideFilters />
						<SubFunctionalAreawiseJobs />
				</div>
			</div>

		);
	}
}