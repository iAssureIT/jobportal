import React,{Component} from 'react';

import './MiddelContent.css';

class MiddelContent extends Component{
	render(){
		return(
				<div className="container-fluid middelContentWrapper col-lg-12">
					<div className=" ">
						<div >
							<div className="middelContentHeadingWrapper ">
								<div className="col-lg-1">
									<div className="row">
										<i className="fa fa-square midlleContentrotate45 " ></i>
									</div>
								</div>
								<div className="col-lg-11"> 
									<div className="row middleContentHeading">
										Description
									</div>
								</div>
							</div>
							<div className="middelContentText col-lg-12">
								<div className="SubHeadingPadding">
									<p>Experienced Web User Interface Devloper with a demonstrated history of working in the internet industry. Skiled 
									in Html5, SASS, Cascading Style Sheets(CSS), Bootsrap 4, JavaScript, JQuery and reactjs.</p>

									<p className="secondP">Strong enginnering professional with a Bachlor's degree focused in Information Technology from MIT college of engineering</p>
								</div>
							</div>
						</div>

						<div >
							<div className="middelContentHeadingWrapper ">
								<div className="col-lg-1">
									<div className="row">
										<i className="fa fa-square midlleContentrotate45 " ></i>
									</div>
								</div>
								<div className="col-lg-11"> 
									<div className="row middleContentHeading">
										Work Experience
									</div>
								</div>
							</div>
							<div className="middelContentText  col-lg-12">
								<div>
									<div className="SubHeadingPadding">
										<div className="profesion">
											Software Engineer
										</div>
										<div>
											<div className="col-lg-8">
												<div className="row">
													<div className="companyName">
														Tata Consultancy Services . Full-time
													</div>
													<div className="companyExperience">
														Dec 2019 - Present. 9 mos
													</div>
													<div className="companyAddress">
														Pune, Maharashtra, India
													</div>
												</div>
											</div>
											<div className="companyImages col-lg-4">
												<div className="row">
													<img className="pull-right" src="/images/53.png" alt="Company logo"/>
												</div>
											</div>
										</div>
									</div>
									<div>
										<div className="row">
											<hr className="middleContentHr col-lg-10 col-lg-offset-1"/>
										</div>
									</div>
								</div>

								<div>
									<div className="SubHeadingPadding">
										<div className="profesion">
											Software Devloper
										</div>
										<div>
											<div className="col-lg-8">
												<div className="row">
													<div className="companyName">
														Infosys Limited
													</div>
													<div className="companyExperience">
														Dec 2018 - Dec 2019. 1 year 1 mos
													</div>
													<div className="companyAddress">
														Pune, Maharashtra, India
													</div>
												</div>
											</div>
											<div className="companyImages col-lg-4">
												<div className="row">
													<img className="pull-right" src="/images/52.png" alt="Company logo"/>
												</div>
											</div>
										</div>
									</div>
									<div>
										<div className="row">
											<hr className="middleContentHr col-lg-10 col-lg-offset-1"/>
										</div>
									</div>
								</div>

								<div>
									<div className="SubHeadingPadding">
										<div className="profesion">
											Frontend Devloper
										</div>
										<div>
											<div className="col-lg-8">
												<div className="row">
													<div className="companyName">
														Cybage Software
													</div>
													<div className="companyExperience">
														jul 2017 - Dec 2018. 1 year 5 mos
													</div>
													<div className="companyAddress">
														Pune, Maharashtra, India
													</div>
												</div>
											</div>
											<div className="companyImages col-lg-4">
												<div className="row">
													<img className="pull-right" src="/images/53.png" alt="Company logo"/>
												</div>
											</div>
										</div>
									</div>
									<div>
										<div className="row">
											<hr className="middleContentHr col-lg-10 col-lg-offset-1"/>
										</div>
									</div>
								</div>

								<div>
									<div className="SubHeadingPadding">
										<div className="profesion">
											Cognizant
										</div>
										<div>
											<div className="col-lg-8">
												<div className="row">
													<div className="companyName">
														Cybage Software
													</div>
													<div className="companyExperience">
														Sep 2016 - Dec 2017. 10 mos
													</div>
													<div className="companyAddress">
														Pune, Maharashtra, India
													</div>
												</div>
											</div>
											<div className="companyImages col-lg-4">
												<div className="row">
													<img className="pull-right" src="/images/54.png" alt="Company logo"/>
												</div>
											</div>
										</div>
									</div>
								</div>

							</div>

						</div>

						<div >
							<div className="middelContentHeadingWrapper ">
								<div className="col-lg-1">
									<div className="row">
										<i className="fa fa-square midlleContentrotate45 " ></i>
									</div>
								</div>
								<div className="col-lg-11"> 
									<div className="row middleContentHeading">
										Eduction
									</div>
								</div>
							</div>
							<div className="middelContentText  col-lg-12">
								<div>
									<div className="SubHeadingPadding">
										<div className="profesion">
											MIT College Of Engineering,
										</div>
										<div>
											<div className="col-lg-8">
												<div className="row">
													<div className="companyName">
														Engineers Degree,Information Technology,<br/>
														1st Class
													</div>
													<div className="companyExperience">
														2012 - 2016
													</div>
													<div className="companyAddress">
														Pune, Maharashtra, India
													</div>
												</div>
											</div>
											<div className="companyImages col-lg-4">
												<div className="row">
													<img className="pull-right" src="/images/55.png" alt="College logo"/>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

			);
	}
}

export default MiddelContent;