import React, {Component} from 'react';
import "../listCss/JobList.css";

import LeftMenu  		from '../../common/leftMenu/LeftMenu.js';
import LeftSideFilters  from '../../common/leftSideFilters/LeftSideFilters.js';
import JobListView 		from '../../blocks/jobListView/JobListView.js';

class Joblist extends Component{
	constructor(props){
		super(props);

	}
	
	render(){
		return(
				<div className="container-fluid">
	        		<LeftMenu />
	        		<LeftSideFilters />
	        		<JobListView />
	    		</div>
			);
	}
}

export default Joblist;

