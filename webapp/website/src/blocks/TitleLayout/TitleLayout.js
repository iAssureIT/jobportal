import React,{Component} from 'react';

import './TitleLayout.css';

class TitleLayout extends Component{
	constructor(props){
		super(props);

	}
	
	render(){
		return(
				<div className="col-lg-12">
					<div className="row">
						<div className="BasicInfoTitle col-lg-12">
							{this.props.title}
							<span className="BasicInfoStep pull-right">Step {this.props.pageNumber}/6</span>
						</div>

						<div className="BasicInfoSubTitle">
							{this.props.subtitle}
						</div>
					</div>
				</div>
			);
	}
}

export default TitleLayout;