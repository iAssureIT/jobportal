import React,{Component} from 'react';

import './ProgressBar.css';

class ProgressBar extends Component{
	render(){
		return(
				<div className="progressBarWrapper col-lg-12">
					<div className="row">
						<div className="progressBar col-lg-8 col-lg-offset-2">
							<ul className="progressBar1">
								<li> 
									<div className="progressBar1Li progressBarActive">1</div>
									<p className="progressBar1LiTitle">Basic Info</p>
								</li>
								<li> 
									<div className="progressBar1Li">2</div>
									<p className="progressBar1LiTitle">Address</p>
								</li>
								<li> 
									<div className="progressBar1Li">3</div>
									<p className="progressBar1LiTitle">Contact Details</p>
								</li>
								<li> 
									<div className="progressBar1Li">4</div>
									<p className="progressBar1LiTitle">Academics</p>
								</li>
								<li> 
									<div className="progressBar1Li">5</div>
									<p className="progressBar1LiTitle">skills & Certificates </p>
								</li>
								<li> 
									<div className="progressBar1Li">6</div>
									<p className="progressBar1LiTitle">Work Experience</p>
								</li>
								
							</ul>
							
						</div>
					
				
					
						<div className="mainProgessBar">
							<div className="col-lg-8 col-lg-offset-2">
								<div className="progress progressBar2">
									<div className="progress-bar progress-bar-striped progressBarInner progress-bar-warning" role="progressbar"
									  aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style={{width:"25%"}}>
									    <img src="/images/37.png"/>
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