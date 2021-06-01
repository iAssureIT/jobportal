import React,{Component} from 'react';

import './TitleLayout.css';

class TitleLayout extends Component{

	render(){
		return(
				<div className="col-md-12">
					<div className="col-md-12">
						<div className="row">
							<div className="BasicInfoTitle col-md-12">
								{this.props.title}
								<span className="BasicInfoStep pull-right">Step {this.props.pageNumber}/5</span>
							</div>

							<div className="BasicInfoSubTitle col-md-12 text-center">
								{this.props.subtitle}
							</div>
						</div>
					</div>
				</div>
			);
	}
}

export default TitleLayout;