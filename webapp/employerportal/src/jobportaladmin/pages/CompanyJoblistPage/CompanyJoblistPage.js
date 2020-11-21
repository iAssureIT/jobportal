import React from 'react';
import "../listCss/JoblistPage.css";

import LeftMenu  		from '../../blocks/LeftDrawers/LeftMenu/LeftMenu.js';
import LeftSideFilters  from '../../blocks/LeftDrawers/LeftSideFilters/LeftSideFilters.js';
import CompanyJoblist 	from '../../blocks/Joblist/CompanyJoblist.js';

function CompanyJoblistPage(){
		return(
				<div className="container-fluid">
	        		<LeftMenu />
	        		<LeftSideFilters />
	        		<CompanyJoblist />
	    		</div>
			);
}

export default CompanyJoblistPage;

