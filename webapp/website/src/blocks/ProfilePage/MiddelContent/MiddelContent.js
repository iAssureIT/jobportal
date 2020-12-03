import React,{Component} from 'react';
import Axios 			 	from 'axios';
import Swal 			 	from 'sweetalert2';
import Moment               from 'moment';
import { withRouter }	 	from 'react-router-dom';
import './MiddelContent.css';

class MiddelContent extends Component{
	constructor(props){
		super(props);

		this.state={
			candidateID        : this.props.match.params.candidateID,
			workExperienceArry : [],
			academicsArry      : [],
			certificationArry  : [],
			DegreeArray        : [],
			classArray         : [],
			inputUniversity    : [],
			inputCollege       : [],
		}
	}
		componentDidMount(){
		Axios.get("/api/universitymaster/get/list")
		.then(response => {
			this.setState({inputUniversity : response.data});
		})
		.catch(error=>{
			Swal.fire("Error while getting List data",error.message,'error');
		})	
		Axios.get("/api/collagemaster/get/list")
			.then(response => {
				this.setState({inputCollege : response.data});
			})
			.catch(error=>{
				Swal.fire("Error while getting List data",error.message,'error');
			})	

		Axios.get("/api/candidatemaster/get/one/"+this.state.candidateID)
		.then(response=>{

			 	this.setState({

			 		workExperienceArry:response.data[0].workExperience,
			 		academicsArry     :response.data[0].academics,
			 		certificationArry :response.data[0].skillCertification,	
					DegreeArray       :response.data[0].qualification,
					classArray        :response.data[0].qualificationlevel		
			 	})
			 })
			 .catch(error=>{
			 	Swal.fire("Submit Error!",error.message,'error');
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
							<div className="middelContentText col-lg-12">
								{
									this.state.certificationArry.length > 0
									?
									this.state.certificationArry.map((elem,index)=>{
										return(
												<div className="SubHeadingPadding" key={index}>
													<p>{elem.skilldesc}</p>
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
																{elem.companyName }
															</div>
															<div className="companyExperience">
																{Moment(elem.fromDate).format("YYYY MMM") +" - "+Moment(elem.toDate).format("YYYY MMM") + " . " + "9 mos"}
															</div>
															<div className="companyAddress">
																{elem.city+", "+elem.state+", "+elem.country} 
															</div>
														</div>
													</div>
													<div className="companyImages col-lg-2">
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
														<div>
															{
																this.state.inputCollege.map((elem1,index)=>{
																	return(
																		<div className="profesion" key={index}>
																			{elem1.collage}
																			
																		</div>
																	);
																})
															}
														</div>
														<div>
															<div className="col-lg-10">
																<div className="row">
																	<div>
																		{
																			this.state.DegreeArray.map((elem1,index)=>{
																				return(
																					<div className="companyName" key={index}>
																						{elem1.qualification + ", " + elem.specialization + ", "}<br/>
																						{elem.grade}
																						
																					</div>
																				);
																			})
																		}
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

export default withRouter(MiddelContent);