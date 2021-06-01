import React,{Component} from 'react';
import { withRouter }	 	        from 'react-router-dom';
import {connect}            from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../common/actions/index';
import './ProgressBar.css';

class ProgressBar extends Component{
	constructor(props){
		super(props);
		this.state = { 
			location 		: this.props.location,
			candidate_id  	: this.props.userDetails.candidate_id,
		}
	}

	render(){
		return(
				<div className="progressBarWrapper col-12 ">
					<div className="row">
						<div className="col-md-10 offset-md-1 col-12 progressbarOuterWrapper">
							<div className="row">

							<div className="progressBar col-12">
									<div className="step">
										<a href="/basic-info">

											<div className={this.state.location.pathname===("/basic-info")
																||this.state.location.pathname===("/address/"+this.state.candidate_id)
																||this.state.location.pathname===("/contact/"+this.state.candidate_id)
																||this.state.location.pathname===("/academics/"+this.state.candidate_id)
																||this.state.location.pathname===("/certification/"+this.state.candidate_id)
																||this.state.location.pathname===("/experience/"+this.state.candidate_id)
																||this.state.location.pathname===("/address/"+this.state.candidate_id+"/edit/"+this.props.match.params.addressID)
																||this.state.location.pathname===("/academics/"+this.state.candidate_id+"/edit/"+this.props.match.params.academicsID)
																||this.state.location.pathname===("/certification/"+this.state.candidate_id+"/edit/"+this.props.match.params.certificationID)
																||this.state.location.pathname===("/experience/"+this.state.candidate_id+"/edit/"+this.props.match.params.workExperienceID)
																
															?
																"bullet active "
															:
																"bullet " }>
												   1
											</div>
										</a>
									

										<div className="stepText">Basic Info</div>
									</div>
									<div className="step">
										<a href={"/address/"+ this.state.candidate_id}>

											<div className={this.state.location.pathname===("/address/"+this.state.candidate_id)
																||this.state.location.pathname===("/contact/"+this.state.candidate_id)
																||this.state.location.pathname===("/academics/"+this.state.candidate_id)
																||this.state.location.pathname===("/certification/"+this.state.candidate_id)
																||this.state.location.pathname===("/experience/"+this.state.candidate_id)
																||this.state.location.pathname===("/address/"+this.state.candidate_id+"/edit/"+this.props.match.params.addressID)
																||this.state.location.pathname===("/academics/"+this.state.candidate_id+"/edit/"+this.props.match.params.academicsID)
																||this.state.location.pathname===("/certification/"+this.state.candidate_id+"/edit/"+this.props.match.params.certificationID)
																||this.state.location.pathname===("/experience/"+this.state.candidate_id+"/edit/"+this.props.match.params.workExperienceID)
																
															?
																"bullet active "
															:
																"bullet " }>
													2
											</div>
										</a>
										
										<div className="stepText">Address</div>
									</div>
									{/*<div className="step">
										<a href={"/contact/"+ this.state.candidate_id}>
											<div className={this.state.location.pathname===("/contact/"+this.state.candidate_id)
																||this.state.location.pathname===("/academics/"+this.state.candidate_id)
																||this.state.location.pathname===("/certification/"+this.state.candidate_id)
																||this.state.location.pathname===("/experience/"+this.state.candidate_id)
																
															?
																"bullet active "
															:
																"bullet " }>
													3
											</div>
										</a>
										<div className="stepText">Contact Details</div>
										
									</div>*/}
									<div className="step">
										<a href={"/academics/"+ this.state.candidate_id}>

											<div className={this.state.location.pathname===("/academics/"+this.state.candidate_id)
																||this.state.location.pathname===("/certification/"+this.state.candidate_id)
																||this.state.location.pathname===("/experience/"+this.state.candidate_id)
																||this.state.location.pathname===("/academics/"+this.state.candidate_id+"/edit/"+this.props.match.params.academicsID)
																||this.state.location.pathname===("/certification/"+this.state.candidate_id+"/edit/"+this.props.match.params.certificationID)
																||this.state.location.pathname===("/experience/"+this.state.candidate_id+"/edit/"+this.props.match.params.workExperienceID)
															
															?
																"bullet active "
															:
																"bullet " }>
													3
											</div>
										</a>
										<div className="stepText">Academics</div>
										
									</div>
									<div className="step">
										<a href={"/certification/"+ this.state.candidate_id}>
											<div className={this.state.location.pathname===("/certification/"+this.state.candidate_id)
																||this.state.location.pathname===("/experience/"+this.state.candidate_id)
																||this.state.location.pathname===("/certification/"+this.state.candidate_id+"/edit/"+this.props.match.params.certificationID)
																||this.state.location.pathname===("/experience/"+this.state.candidate_id+"/edit/"+this.props.match.params.workExperienceID)
																
															?
																"bullet active "
															:
																"bullet " }>
													4
											</div>
										</a>
										<div className="stepText">skills & Certificates</div>
										
									</div>
									<div className="step">
										<a href={"/experience/"+ this.state.candidate_id}>
											<div className={this.state.location.pathname===("/experience/"+this.state.candidate_id)
																||this.state.location.pathname===("/experience/"+this.state.candidate_id+"/edit/"+this.props.match.params.workExperienceID)
															?
																"bullet active "
															:
																"bullet " }>
													5
											</div>
										</a>
										<div className="stepText">Work Experience</div>
										
									</div>
							</div>
						    </div>
						</div>
					</div>
				
						<div className="row">
							<div className=" mainProgessBar col-12">
								<div className="row">
									<div className="col-md-8 offset-md-2 col-12">
										<div className="progress progressBar2 row">
											<div className="progress-bar progress-bar-striped progressBarInner progress-bar-warning progress-bar-striped active" 
											  role="progressbar" aria-valuenow="0" aria-valuemin="0" 
											  aria-valuemax="100" style={{width:this.props.width+"%"}}>
											    <img src={this.props.img?("/images/"+ this.props.img + ".png"):null} alt={this.props.img?"progress":null} style={{left:this.props.left+"%"}}/>
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
        userDetails  : state.userDetails,
    }

}
const mapDispatchToProps = (dispatch) => ({
  mapAction :  bindActionCreators(mapActionCreator, dispatch)
}) 
export default connect(mapStateToProps,mapDispatchToProps) (withRouter(ProgressBar));