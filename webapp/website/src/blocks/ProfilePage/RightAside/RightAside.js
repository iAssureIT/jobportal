import React,{Component}    from 'react';
import Axios 			 	from 'axios';
import Swal 			 	from 'sweetalert2';
import Moment               from 'moment';
import { withRouter }	 	from 'react-router-dom';
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

		Axios.get("/api/candidatemaster/get/one/"+this.state.candidate_id)
		.then(response=>{
			 
			 	this.setState({
			 		certificationArry :response.data[0].skillCertification,
			 	})
			 })
			 .catch(error=>{
			 	Swal.fire("Submit Error!",error.message,'error');
			 })
		}
	render(){
		return(
				<div className="container-fluid  rightAsideWrapper col-lg-12">
					<div className=" ">
						<div className="videoWrapper">
							<div className="videoLigo">
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
											<div className="caertificationNameWrapper" key={index}>
												<div className="col-lg-10">
													<div className="row">
														<div className="caertificationName" >
															{elem.certName}
														</div>
							
														<div className="caertificationCompanyName ">
															{elem.issuedBy}
														</div>
														<div className="issueDate">
															{"Issued " + Moment(elem.certifiedOn).format("MMM YYYY")}
														</div>
														<div className="expireDate">
															No Expiration Date
														</div>
													</div>
												</div>
													
												<div className="certificationImages col-lg-2">
													<div className="row">
														<img className="pull-right" src="/images/53.png" alt="logo"/>
													</div>
												</div>
												
												<div className="col-lg-12 ">
													<hr className="middleContentHr row "/>
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
									<img className=""  src="/images/50.png" alt="logo"/>
								</div>
							</div>
							
						</div>
					</div>
					
				</div>

			);
	}
}

export default withRouter(RightAside);