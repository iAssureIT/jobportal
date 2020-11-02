import React,{Component} from 'react';

import './Footer.css';

class Footer extends Component{
	render(){
		return(
				<div className="footerWrapper col-lg-12">
					<div className="row">
						<div className=" footerLeftSide col-lg-6">
							<p>Copyright  &copy; 2020, <span className="footerSpan">JobPortal</span> All rights reserved.</p>
						</div>
						<div className="footerRightSide col-lg-6 ">
							<p>Designed & Developed By <span className="footerSpan"> iAssure International Technologies Pvt. Ltd. </span> Version 1.0.0</p>
							
						</div>
					</div>
				</div>

			);
	}
}

export default Footer;