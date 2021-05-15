import React,{Component} from 'react';
import Axios 			 	from 'axios';
import Swal 			 	from 'sweetalert2';
import Moment               from 'moment';
import { withRouter }	 	from 'react-router-dom';
import { connect }        from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../../Common/actions/index.js';
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
		          Swal.fire("","Error while getting candidate details","error")
		              .then(okay => {
		                if (okay) {
		                  window.location.href = "/login";
		                }
		              });
		        }else{
		            Swal.fire("", "Error while getting candidate details", "");
		        }
		 })

	}
		
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
										Executive Summary 
									</div>
								</div>
							</div>
							<div className="middelContentText executiveSummaryWraap col-lg-12">
								<div dangerouslySetInnerHTML = {{ __html : this.state.executiveSummary}} />
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
								{
									this.state.workExperienceArry.length > 0
									?
									this.state.workExperienceArry.map((elem,index)=>{
										return(
										<div key={index}>
											<div className="SubHeadingPadding">
												<div className="profesion">
													{elem.lastDegn}
												</div>
												<div>
													<div className="col-lg-10">
														<div className="row">
															<div className="companyName">
																{elem.company_id.companyName }
															</div>
															<div className="companyExperience">
																{Moment(elem.fromDate).format("YYYY MMM") +" - "+Moment(elem.toDate).format("YYYY MMM") + " . " + "9 mos"}
															</div>
															<div className="companyAddress">
																{elem.district+", "+elem.state+", "+elem.country} 
															</div>
														</div>
													</div>
													<div className="companyImages col-lg-2">
														<div className="row">
														{
															elem.company_id.companyLogo[0] ? 
															<img className="pull-right" src={elem.company_id.companyLogo[0] } alt="Company logo"/>
															: <img className="pull-right" src= "/images/logonotfound.jpg" alt="Company logo"/>
														}
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
										);
									})
									:
									null
								  }
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
										Education
									</div>
								</div>
							</div>
							<div className="middelContentText  col-lg-12">
								{
									this.state.academicsArry.length > 0
									?
									this.state.academicsArry.map((elem,index)=>{
										return(
												<div key={index}>
													<div className="SubHeadingPadding">
														<div className="profesion" key={index}>
															{elem.collegeSchool}
														</div>
														<div>
														<div className="col-lg-10">
															<div className="row">
																<div className="companyName" key={index}>
																	{elem.qualificationlevel_id.qualificationLevel + ", " + elem.qualification_id.qualification + ", "}<br/>
																	{elem.university_id.university}
																</div>
																<div className="companyExperience">
																	{Moment(elem.admisionYear).format("YYYY") +" - "+Moment(elem.passOutYear).format("YYYY")}
																</div>
																<div className="companyAddress">
																   {elem.cityVillage + ", " + elem.state + ", " + elem.country }
																</div>
															</div>
														</div>
															<div className="companyImages col-lg-2">
																<div className="row">
																	<img className="pull-right" src="/images/55.png" alt="College logo"/>
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


