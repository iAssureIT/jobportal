
import React, { Component }                       from 'react';
import LeftMenu from '../common/leftMenu/LeftMenu.js';
import LeftSideFilters from '../common/leftSideFilters/LeftSideFilters.js';
import FunctionalAreawiseJobs from './blocks/FunctionalAreawiseJobs.js';
import './PageFunctionWise.css'


export default class PageFunctionWise extends Component{
	
	
	render(){
		
		return(
			<div className="container-fluid">
				<LeftMenu/>
				<LeftSideFilters />
				<FunctionalAreawiseJobs />
				
			</div>
		);
	}
}