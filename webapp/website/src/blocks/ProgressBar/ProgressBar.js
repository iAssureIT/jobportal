import React,{Component} from 'react';

import './ProgressBar.css';

class ProgressBar extends Component{
	constructor(props){
		super(props);

	}
	render(){
		return(
				<div className="progressBarWrapper col-lg-12">
					<div className="row">
						<div className="col-lg-10 col-lg-offset-1">
							<div className="progressBar col-lg-12">
								<div className="step  ">
									<div className="bullet active">1</div>
									<div className="stepText">Basic Info</div>
								</div>
								<div className="step ">
									<div className="bullet">2</div>
									<div className="stepText">Address</div>
								</div>
								<div className="step ">
									<div className="bullet">3</div>
									<div className="stepText">Contact Details</div>
								</div>
								<div className="step ">
									<div className="bullet">4</div>
									<div className="stepText">Academics</div>
								</div>
								<div className="step ">
									<div className="bullet">5</div>
									<div className="stepText">skills & Certificates</div>
								</div>
								<div className="step ">
									<div className="bullet">6</div>
									<div className="stepText">Work Experience</div>
								</div>
							</div>
						</div>
					
				
					
						<div className=" mainProgessBar">
							<div className="col-lg-8 col-lg-offset-2">
								<div className="progress progressBar2 row">
									<div className="progress-bar progress-bar-striped progressBarInner progress-bar-warning progress-bar-striped active" 
									  role="progressbar" aria-valuenow="0" aria-valuemin="0" 
									  aria-valuemax="100" style={{width:this.props.width+"%"}}>
									    <img src={this.props.img?("/images/"+ this.props.img + ".png"):null} style={{left:this.props.left+"%"}}/>
									</div>

								</div>
								
							</div>
						</div>
					</div>
				</div>

			);
	}
}

export default ProgressBar;