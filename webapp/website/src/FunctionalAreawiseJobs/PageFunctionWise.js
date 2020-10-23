
import React, { Component }                       from 'react';
import FunctionalHeader from '.././common/FunctionalHeader/FunctionalHeader.js';
import LeftMenu from '../common/LeftMenu/LeftMenu.js';
import LeftSideFilters from '../common/LeftSideFilters/LeftSideFilters.js';
import FunctionalAreawiseJobs from './blocks/FunctionalAreawiseJobs.js';
import './PageFunctionWise.css'


export default class PageFunctionWise extends Component{
	
	
	render(){
		
		return(
			<div className="col-lg-12">
				<LeftMenu/>
				<LeftSideFilters />
				<FunctionalAreawiseJobs />
				
			</div>
		);
	}
}