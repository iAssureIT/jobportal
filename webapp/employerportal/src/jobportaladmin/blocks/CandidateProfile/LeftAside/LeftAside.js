import React,{Component} from 'react';

import './LeftAside.css';

class LeftAside extends Component{
	render(){
		return(
				<div className="container-fluid col-lg-12 ">
					<div className=" leftAsideWrapper ">
						<div className="">
							<div className="col-lg-8 col-lg-offset-2 candidateProfileImg">
								<div className="candidateImgWrapper row">
									<img src="/images/43.png" alt="Candidate Image" />
									<div className="candidateName mainText">
										Anjali Sharma  
									</div>
									<div className="jobName subText">
										Software Engineer  
									</div>
								</div>
							</div>

							<div className="candidateContactInfo  col-lg-12">
								<div className="row">
									<div className="mainText">
										Contact Info
									</div>
									<div className="subText contactPhone col-lg-12">
										<div className="row">
											<div className="candidatePageIcon1 col-lg-1">
												<div className="row">
												 	<i className="fa fa-mobile  fa-2x"></i>
												 </div>
											</div>

											<div className=" col-lg-10">
												<div className="candidatePageText row">
													+91 99233 93733
												</div>
											</div>
										</div>
									</div>
									<div className="subText contactPhone col-lg-12">
										<div className="row">
											<div className="candidatePageIcon2 col-lg-1">
												<div className="row">
												 	<i className="fa fa-envelope-o "></i>
												 </div>
											</div>

											<div className=" col-lg-10">
												<div className="candidatePageText row">
													ShahrukhKhan@gmail.com
												</div>
											</div>
										</div>
									</div>
									<div className="subText contactPhone col-lg-12">
										<div className="row">
											<div className="candidatePageIcon3 col-lg-1">
												<div className="row">
												 	<i className="fa fa-map-marker  "></i>
												 </div>
											</div>

											<div className=" col-lg-10">
												<div className="candidatePageText row">
													903, Cosmose, Prime Magarpatta Inner Circle, Magarpatta City, Hadpsar, Pune, 411028. 
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="candidateSkillsBlock  col-lg-12">
								<div className="row candidateSkillsTitle">
									<div className="mainText">
										My Skills
									</div>
								</div>
								
								<div className="row candidateSkillsProgess">
									<div className="subHeadingText">
										Primary Skills
									</div>
									<ul className="candidateSkillsUl">
										<li>
											<div>
												<i className="fa fa-square rotate45" ></i>
													Mathamatical aptitude
											</div>
											<div className="progress candidateprogess">
												<div className="progress-bar candidateprogessBar" role="progressbar" aria-valuenow="70"
												  aria-valuemin="0" aria-valuemax="100" style={{width:"80%"}}>
												    
												 </div>	
												 <span className="progressBarStatus ">80%</span>
											</div>
										</li>
										<li>
											<div>
												<i className="fa fa-square rotate45" ></i>
													Problem-solving skills
											</div>

											<div className="progress candidateprogess">
												<div className="progress-bar candidateprogessBar" role="progressbar" aria-valuenow="70"
												  aria-valuemin="0" aria-valuemax="100" style={{width:"70%"}}>
												    
												 </div>	
												 <span className="progressBarStatus ">70%</span>
											</div>

										</li>
										<li>
											<div>
												<i className="fa fa-square rotate45" ></i>
													Programming languages
											</div>
											<div className="progress candidateprogess">
												<div className="progress-bar candidateprogessBar" role="progressbar" aria-valuenow="70"
												  aria-valuemin="0" aria-valuemax="100" style={{width:"85%"}}>
												    
												 </div>	
												 <span className="progressBarStatus ">85%</span>
											</div>
										</li>
										<li>
											<div>
												<i className="fa fa-square rotate45" ></i>
													Software Development
											</div>
											<div className="progress candidateprogess">
												<div className="progress-bar candidateprogessBar" role="progressbar" aria-valuenow="70"
												  aria-valuemin="0" aria-valuemax="100" style={{width:"90%"}}>
												    
												 </div>	
												 <span className="progressBarStatus ">90%</span>
											</div>
										</li>
									</ul>
								</div>
								<div className="row candidateSkillsProgess">
									<div className="subHeadingText candidateSkillsSubTitle">
										Secondary Skills
									</div>
									<ul className="candidateSkillsUl">
										<li>
											<div>
												<i className="fa fa-square rotate45" ></i>
													Communication
											</div>
											<div className="progress candidateprogess">
												<div className="progress-bar candidateprogessBar" role="progressbar" aria-valuenow="70"
												  aria-valuemin="0" aria-valuemax="100" style={{width:"60%"}}>
												    
												 </div>	
												 <span className="progressBarStatus ">60%</span>
											</div>
										</li>
										<li>
											<div>
												<i className="fa fa-square rotate45" ></i>
													Teamwork
											</div>
											<div className="progress candidateprogess">
												<div className="progress-bar candidateprogessBar" role="progressbar" aria-valuenow="70"
												  aria-valuemin="0" aria-valuemax="100" style={{width:"70%"}}>
												    
												 </div>	
												 <span className="progressBarStatus ">70%</span>
											</div>
										</li>
										<li>
											<div>
												<i className="fa fa-square rotate45" ></i>
													Multitasking
											</div>
											<div className="progress candidateprogess">
												<div className="progress-bar candidateprogessBar" role="progressbar" aria-valuenow="70"
												  aria-valuemin="0" aria-valuemax="100" style={{width:"80%"}}>
												    
												 </div>	
												 <span className="progressBarStatus ">80%</span>
											</div>
										</li>
										<li>
											<div>
												<i className="fa fa-square rotate45" ></i>
													Attention to detail
											</div>
											<div className="progress candidateprogess">
												<div className="progress-bar candidateprogessBar" role="progressbar" aria-valuenow="70"
												  aria-valuemin="0" aria-valuemax="100" style={{width:"65%"}}>
												    
												 </div>	
												 <span className="progressBarStatus ">65%</span>
											</div>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>

			);
	}
}

export default LeftAside;
