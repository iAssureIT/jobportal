import React,{Component} from 'react';
import './RightAside.css';


class RightAside extends Component{
	render(){
		return(
				<div className="container-fluid  rightAsideWrapper col-lg-12">
					<div className=" ">
						<div className="videoWrapper">
							<div className="videoLigo">
								<img src="/Images/49.png"/>
							</div>
						</div>
						<div className="certificationHeading">
							License & Certification
						</div>
						<div className="caertificationNameWrapper">
							<div className="col-lg-8">
							<div className="row">
								<div className="caertificationName" >
									MTA: Database Fundamenatls Certifird 2016
								</div>
	
								<div className="caertificationCompanyName ">
									Microsoft
								</div>
								<div className="issueDate">
									Issued Nov 2017.
								</div>
								<div className="expireDate">
									No Expiration Date
								</div>
							</div>
							</div>
								
							<div className="certificationImages col-lg-4">
								<div className="row">
									<img className="pull-right" src="/Images/53.png" alt="logo"/>
								</div>
							</div>
							
							<div className="col-lg-12 ">
								<hr className="middleContentHr row "/>
							</div>
						</div>
						<div className="caertificationNameWrapper">
							<div className="col-lg-8">
							<div className="row">
								<div className="caertificationName" >
									Learning React.Js
								</div>
	
								<div className="caertificationCompanyName ">
									Linkedin
								</div>
								<div className="issueDate">
									Issued Jul 2020.
								</div>
								<div className="expireDate">
									No Expiration Date
								</div>
							</div>
							</div>
								
							<div className="certificationImages col-lg-4">
								<div className="row">
									<img className="pull-right" src="/Images/linkedIn.png" alt="logo"/>
								</div>
							</div>
							
							<div className="col-lg-12 ">
								<hr className="middleContentHr row "/>
							</div>
						</div>
						<div className="caertificationNameWrapper">
							<div className="col-lg-8">
							<div className="row">
								<div className="caertificationName" >
									HTML Essential
								</div>
	
								<div className="caertificationCompanyName ">
									Linkedin
								</div>
								<div className="issueDate">
									Issued Jul 2020.
								</div>
								<div className="expireDate">
									No Expiration Date
								</div>
							</div>
							</div>
								
							<div className="certificationImages col-lg-4">
								<div className="row">
									<img className="pull-right" src="/Images/linkedIn.png" alt="logo"/>
								</div>
							</div>
							
							<div className="col-lg-12 ">
								<hr className="middleContentHr row "/>
							</div>
						</div>
						<div className="caertificationNameWrapper">
							<div className="col-lg-12">
							<div className="row">
								<div className="caertificationName" >
									Honor & Award
								</div>
	
								<div className="caertificationCompanyName ">
									Best Employee of the year 2019 in Tata Consultncy Services
								</div>
							</div>
							</div>
								
							<div className="HonnerImage col-lg-12">
								<div className="row">
									<img className=""  src="/Images/50.png" alt="logo"/>
								</div>
							</div>
							
						</div>
					</div>
					
				</div>

			);
	}
}

export default RightAside;