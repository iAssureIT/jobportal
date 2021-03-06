import React,{Component} from 'react';
import Axios 			 	from 'axios';
import Swal 			 	from 'sweetalert2';
import Moment               from 'moment';
import { withRouter }	 	from 'react-router-dom';
import './LeftAside.css';

class LeftAside extends Component{
	constructor(props){
		super(props); 

		this.state={
			firstName          : "",
			middleName         : "",
			lastName           : "",
			lastDesignation    : "",
			candidate_id       : this.props.match.params.candidate_id,
			mobile             : "",
			alternate          : "",
			email              : "",	
			houseNumber        : "",
			address            : "",
			area               : "",
			gender             : "",
			city               : "",
			district           : "",
			state	           : "",
			country	           : "",
			profilePicture	           : "",
			primarySkills  	   : [],
			secondarySkills    : [],
			pincode	           : 0,	
				
		}
	}
	componentDidMount(){
		const userDetails = JSON.parse(localStorage.getItem("userDetails"));
      	const token = userDetails.token;
      	Axios.defaults.headers.common['Authorization'] = 'Bearer '+ token;

		Axios.get("/api/candidatemaster/get/one/"+this.state.candidate_id)
		.then(response=>{
			 console.log("this.state.gender",response.data.basicInfo.gender);
			 const primarySkills = [];
			 const secondarySkills = [];
			 	response.data.skills.map((skill, index)=>{
			 		if (skill.skillType == "primary") { primarySkills.push(skill) }
			 		if (skill.skillType == "secondary") { secondarySkills.push(skill) }
			 	})

			 	this.setState({
			 		primarySkills     : primarySkills,
			 		secondarySkills   : secondarySkills,
			 		firstName         : response.data.basicInfo.firstName?response.data.basicInfo.firstName:"",
					middleName        : response.data.basicInfo.middleName?response.data.basicInfo.middleName:"",
					profilePicture    : response.data.basicInfo.profilePicture?response.data.basicInfo.profilePicture:"",
					lastName          : response.data.basicInfo.lastName?response.data.basicInfo.lastName:"",
					gender            : response.data.basicInfo.gender?response.data.basicInfo.gender:"",
					mobile            : response.data.contact.mobile?response.data.contact.mobile:"",
					alternate         : response.data.contact.altMobile?response.data.contact.altMobile:"",
					email             : response.data.contact.emailId?response.data.contact.emailId:"",
					houseNumber       : response.data.address[0] ? response.data.address[0].houseNumber:"",
					address           : response.data.address[0] ? response.data.address[0].address:"",
					area              : response.data.address[0] ? response.data.address[0].area:"",
					city              : response.data.address[0] ? response.data.address[0].cityVillage:"",
					district          : response.data.address[0] ? response.data.address[0].district:"",
					state             : response.data.address[0] ? response.data.address[0].state:"",
					country           : response.data.address[0] ? response.data.address[0].country:"",
					pincode           : response.data.address[0] ? response.data.address[0].pincode:"",
					
					lastDesignation   : response.data.workExperience[0] ? response.data.workExperience[0].lastDegn:"",
				})
			})
			.catch(error=>{
				if(error.message === "Request failed with status code 401"){
		          var userDetails =  localStorage.removeItem("userDetails");
		          localStorage.clear();
		          Swal.fire({title  : ' ',
		                    html    : "Your session is expired! You need to login again. "+"<br>"+" Click OK to go to Login Page",
		                    text    :  "" })
		              .then(okay => {
		                if (okay) {
		                  window.location.href = "/login";
		                }
		              });
		        }else{
		            Swal.fire("", "Error while getting candidate data", "");
		        }
			})

		}
	render(){

		return(
				<div className="container-fluid col-lg-12 ">
					<div className=" leftAsideWrapper ">
						<div className="">
							<div className="col-lg-8 col-lg-offset-2 candidateProfileImg">
								<div className="candidateImgWrapper row">
								{
									this.state.profilePicture
									?
									<img src={ this.state.profilePicture} alt="Candidate" />
									:
									this.state.gender =="female"
									?
									<img src="/images/f.png" alt="Candidate" />
									:
									this.state.gender  =="male"
									?
									<img src="/images/m.png" alt="Candidate" />
									:
									<img src="/images/u.png" alt="Candidate" />

								}
									
									<div className="candidateName mainText">
										{this.state.firstName+" "+this.state.lastName }
									</div>
									<div className="jobName subText">
										{this.state.lastDesignation}  
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
													{this.state.mobile}
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
													{this.state.email}
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
													{ this.state.houseNumber+", "+ this.state.address +", "}<br/>
													{ this.state.area + ", "+ this.state.city+ ", "+ this.state.district +", "}<br/>
													{ this.state.state+", "+this.state.country+", "+this.state.pincode +"."}
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
								{ this.state.primarySkills.length > 0 ?
								<div className="row candidateSkillsProgess">
									<div className="subHeadingText">
										Primary Skills
									</div>

									<ul className="candidateSkillsUl">
										{
											this.state.primarySkills.map((elem,index)=>{

												return(
												<li key={index}>
													<div>
														<i className="fa fa-square rotate45" ></i>
															{elem.skill_id.skill}
													</div>
													<div className="progress candidateprogess">
														<div className="progress-bar candidateprogessBar"
														 role="progressbar" aria-valuenow="70"
														  aria-valuemin="0" aria-valuemax="100" 
														  style={{width:(elem.rating*20)+"%"}}>
														    
														 </div>	
														 <span className="progressBarStatus ">{elem.rating*20+"%"}</span>
													</div>
												</li>
												);
												})
											}
										
									</ul>
								</div>
								: null }
								{ this.state.secondarySkills.length>0 ?
									<div className="row candidateSkillsProgess">
										<div className="subHeadingText candidateSkillsSubTitle">
											Secondary Skills
										</div>
										<ul className="candidateSkillsUl">
											{
											this.state.secondarySkills.map((elem,index)=>{
												return(
												<li key={index}>
													<div>
														<i className="fa fa-square rotate45" ></i>
															{elem.skillID}
													</div>
													<div className="progress candidateprogess">
														<div className="progress-bar candidateprogessBar" 
														 role="progressbar" aria-valuenow="70"
														 aria-valuemin="0" aria-valuemax="100" 
														 style={{width:(elem.rating*20)+"%"}}
														 >
														  
														 </div>	
														 <span className="progressBarStatus ">{elem.rating*20+"%"}</span>
													</div>
												</li>
												);
												})
											}
										</ul>
									</div>
									
									: null 
								}
							</div>
						</div>
					</div>
				</div>

			);
	}
}

export default withRouter(LeftAside)
