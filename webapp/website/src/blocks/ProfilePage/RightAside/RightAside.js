import React,{Component}    from 'react';
import Axios 			 	from 'axios';
import Swal 			 	from 'sweetalert2';
import Moment               from 'moment';
import { withRouter }	 	from 'react-router-dom';
import { connect }        from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../../common/actions/index.js';
import './RightAside.css';

class RightAside extends Component{
	constructor(props){
		super(props);

		this.state={
			candidate_id        : this.props.match.params.candidate_id,
			certificationArry  :[],
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
			 		certificationArry :response.data.certifications,
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
				<div className="container-fluid  rightAsideWrapper col-lg-12">
					<div className=" ">
						<div className="col-lg-12 col-6 videoWrapper">
							<div className="row videoLigo">
								<img src="/images/49.png" alt="logo"/>
							</div>
						</div>
						<div className="certificationHeading">
							License & Certification
						</div>
						{
							this.state.certificationArry.length > 0
									?
									this.state.certificationArry.map((elem,index)=>{
										return(
										<div className="row">
											<div className="col-lg-12 col-sm-6 caertificationNameWrapper" key={index}>
												<div className="col-12">
													<div className="row">
														<div className="col-xl-10 col-lg-9  col-10">
															<div className="row">
																<div className="caertificationName col-12 " >
																	<div className="row">
																		{elem.certName}
																	</div>
																</div>
									
																<div className="caertificationCompanyName col-12">
																	<div className="row">
																		{elem.issuedBy}
																	</div>
																</div>
																<div className="issueDate col-12">
																	<div className="row">
																		{"Issued " + Moment(elem.certifiedOn).format("MMM YYYY")}
																	</div>
																</div>
																<div className="expireDate col-12">
																	<div className="row">
																		{"Expired " + Moment(elem.validTill).format("MMM YYYY")}
																	</div>
																</div>
															</div>
														</div>
															
														<div className="certificationImages col-xl-2 col-lg-2  col-1">
															<div className="row">
																<img className="pull-right" src="/images/53.png" alt="logo"/>
															</div>
														</div>
														{
															index.length>0
															?
															<div className="col-lg-12 ">
																<hr className="middleContentHr row "/>
															</div>
															:
															null
														}
														
													</div>
												</div>
											</div>
										</div>
										);
									})
									:
									null

						}
												
						<div className="caertificationNameWrapper">
							<div className="col-lg-12">
							<div className="row">
								<div className="caertificationName col-12" >
									<div className="row">
										Honor & Award
									</div>
								</div>
	
								<div className="caertificationCompanyName col-12">
									<div className="row">
										Best Employee of the year 2019 in Tata Consultncy Services
									</div>
								</div>
							</div>
							</div>
								
							<div className="HonnerImage col-lg-12">
								<div className="row">
									<div className="col-lg-12 col-6">
										<div className="row">
											<img className=""  src="/images/50.png" alt="logo"/>
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
const mapStateToProps = (state)=>{
    return {
      userDetails : state.userDetails,
    }
}
const mapDispatchToProps = (dispatch) => ({
    mapAction :  bindActionCreators(mapActionCreator, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps) (withRouter(RightAside))

