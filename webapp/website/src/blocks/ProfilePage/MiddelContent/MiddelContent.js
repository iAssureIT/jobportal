import React,{Component} from 'react';
import Axios 			 	from 'axios';
import Swal 			 	from 'sweetalert2';
import Moment               from 'moment';
import { withRouter }	 	from 'react-router-dom';
import { connect }        from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../../common/actions/index.js';
import './MiddelContent.css';

class MiddelContent extends Component{
	constructor(props){
		super(props);

		this.state={
			candidate_id        : this.props.match.params.candidate_id,
			workExperienceArry : [],
			academicsArry      : [],
			certificationArry  : [],
			DegreeArray        : [],
			basicInfoArry      : [],
			executiveSummary   : "",
		}
	}
	componentDidMount(){
	var {mapAction} = this.props;
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const token = userDetails.token;
    Axios.defaults.headers.common['Authorization'] = 'Bearer '+ token;

	Axios.get("/api/candidatemaster/get/one/"+this.state.candidate_id)
	.then(response=>{
		 	this.setState({
		 		workExperienceArry:response.data.workExperience,
		 		basicInfoArry     :response.data.basicInfo,
		 		academicsArry     :response.data.academics,
		 		certificationArry :response.data.certifications,	
				DegreeArray       :response.data.academics,	
				executiveSummary  :response.data.basicInfo.executiveSummary?response.data.basicInfo.executiveSummary:"",
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
		                var userDetails = {
		                    loggedIn    : false,
		                    username  :"",  
		                    firstName   : "", 
		                    lastName    : "", 
		                    email     : "",
		                    phone     : "", 
		                    user_id     : "",
		                    roles     : [],
		                    token     : "", 
		                    gender    : "", 
		                    profilePicture : "",
		                    candidate_id: "",
		                    profileCompletion : 0
		                    }
		                    mapAction.setUserDetails(userDetails);
		                    document.getElementById("loginbtndiv").click();
		                    }
		                  });
		    }else{
		    	Swal.fire('', " Error!", '');
		    }
		 })

	}
		
	render(){
		return( 
				<div className="middelContentWrapper col-lg-12">
					<div className="row ">
						<div className="col-12">
						<div className="col-12">
							<div className="middelContentHeadingWrapper ">
								<div className="col-md-1 d-none d-lg-block">
									<div className="row">
										<i className="fa fa-square midlleContentrotate45 " ></i>
									</div>
								</div>
								<div className="col-md-11 col-12"> 
									<div className="row middleContentHeading">
										Executive Summary 
									</div>
								</div>
							</div>
							<div className="middelContentText executiveSummaryWraap col-lg-12">
								<div className="col-12" dangerouslySetInnerHTML = {{ __html : this.state.executiveSummary}} />
							</div>
						</div>
						</div>

						<div className="col-12">
						<div className="col-12">
							<div className="middelContentHeadingWrapper ">
								<div className="col-md-1 d-none d-lg-block">
									<div className="row">
										<i className="fa fa-square midlleContentrotate45 " ></i>
									</div>
								</div>
								<div className="col-md-11 col-12"> 
									<div className="row middleContentHeading">
										Work Experience
									</div>
								</div>
							</div>
							<div className="middelContentText  col-lg-12 col-sm-6">
								{
									this.state.workExperienceArry.length > 0
									?
									this.state.workExperienceArry.map((elem,index)=>{
										return(
										<div key={index}>
											<div className=" SubHeadingPadding">
												<div className="col-12 profesion">
														{elem.lastDegn}
													
												</div>
												<div className="col-12">
													<div className="row">
														<div className="col-lg-10 col-10">
															<div className="row">
																<div className="col-12 companyName">
																	{elem.company_id.companyName }
																</div>
																<div className="col-12 companyExperience">
																	{Moment(elem.fromDate).format("YYYY MMM") +" - "+Moment(elem.toDate).format("YYYY MMM") + " . " + "9 mos"}
																</div>
																<div className="col-12 companyAddress">
																	{elem.district+", "+elem.state+", "+elem.country} 
																</div>
															</div>
														</div>
														<div className="companyImages col-lg-2 col-1">
															<div className="row pull-right">
															{
																elem.company_id.companyLogo[0] ? 
																<img className="companyLogoIcon" src={elem.company_id.companyLogo[0] } alt="Company logo"/>
																: <img className="companyLogoIcon" src= "/images/logonotfound.jpg" alt="Company logo"/>
															}
															</div>
														</div>
													</div>
												</div>
											</div>
											<div>{
												index.length>0
												?
												<div className="row">
													<hr className="middleContentHr col-lg-10 offset-lg-1"/>
												</div>
												:
												null
											}
												
											</div>
										</div>
										);
									})
									:
									null
								  }
						   </div>
						</div>
						</div>

						<div className="col-12">
						<div className="col-12">
							<div className="row middelContentHeadingWrapper ">
								<div className="col-12">
									<div className="col-md-1 d-none d-lg-block">
										<div className="row">
											<i className="fa fa-square midlleContentrotate45 " ></i>
										</div>
									</div>
									<div className="col-md-11 col-12"> 
										<div className="row middleContentHeading">
											Education
										</div>
									</div>
								</div>
							</div>
							<div className="middelContentText  col-lg-12">
								{
									this.state.academicsArry.length > 0
									?
									this.state.academicsArry.map((elem,index)=>{
										return(
												<div className key={index}>
													<div className=" SubHeadingPadding">
														<div className="col-12 profesion" key={index}>
															{elem.collegeSchool}
														</div>
														<div className="col-12">
															<div className="row">
																<div className="col-lg-10 col-10">
																	<div className="row">
																		<div className="col-12 companyName" key={index}>
																			{elem.qualificationlevel_id.qualificationLevel + ", " + elem.qualification_id.qualification + ", "}<br/>
																			{elem.university_id.university}
																		</div>
																		<div className="col-12 companyExperience">
																			{Moment(elem.admisionYear).format("YYYY") +" - "+Moment(elem.passOutYear).format("YYYY")}
																		</div>
																		<div className="col-12 companyAddress">
																		   {elem.cityVillage + ", " + elem.state + ", " + elem.country }
																		</div>
																	</div>
																</div>
																<div className="companyImages col-lg-2 col-1">
																	<div className="row pull-right">
																		<img className="companyLogoIcon" src="/images/collegeLogo.jpg" alt="College logo"/>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											);
										})
										:
										null
									}
							</div>
						</div>
						</div>
					</div>
				</div>

			);
	}
}
const mapStateToProps = (state)=>{
    return {
      userDetails : state.userDetails
    }
}
const mapDispatchToProps = (dispatch) => ({
    mapAction :  bindActionCreators(mapActionCreator, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps) (withRouter(MiddelContent))


