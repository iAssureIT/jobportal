import React, {Component} from 'react';
import "../listCss/Joblist.css";

import EmployeeJoblist		from '../../blocks/EmployeeJoblist/EmployeeJoblist.js';

class EmployeeJoblistPage extends Component{
	constructor(props){
		super(props);

	}
	
	render(){
		return(
				<div className="container-fluid">
					<div className="row">
	        			<EmployeeJoblist />
	        		</div>	
	    		</div>
			);
	}
}

export default EmployeeJoblistPage;

