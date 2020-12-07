import React, {Component} from 'react';
import Axios from  'axios';
import Swal  from  'sweetalert2';
import "./JobList.css";
import { connect }        from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../common/actions/index';

class Joblist extends Component{
	constructor(props){
	super(props);
	this.state={
		jobList  		: [],
		isToggle 		: true,
		appliedItems 	: [],
	}
}

componentDidMount(){
	
}



handleclick = (jobid)=>{
	console.log("jobid : ", jobid);
	this.setState({isToggle:!this.state.isToggle})
	if (this.props.loggedIn) {
		var formValues = {
			candidateID : this.props.candidateID,
			jobID  		: jobid,
			createdBy   : this.props.user_ID
		}
		Axios.post("/api/wishlist/post",formValues)
			.then(response =>{
				console.log("wishlist response=", response.data);
				if(response.data.message==="Job is removed from wishlist."){
							
				}
			})
			.catch(error=>{
				console.log(error);
			})	
	}else{
		document.getElementById("loginbtndiv").click();
	}
}

search = (event)=>{
	event.preventDefault();
	const searchTxt = event.currentTarget.value;
	if(searchTxt !== ""){
		Axios.get("/api/jobposting/get/searchlist/" + searchTxt)
			.then(response => {
				this.setState({jobList : response.data.jobList });
			})
			.catch(error=>{
				Swal.fire("Error while getting List data", error.message, 'error');
			});
	}else{
		this.getJobsData();
	}
}

applyJob = (jobid, company_id)=>{
	console.log("jobid :", jobid);
	
	if (this.props.loggedIn) {
	var formValues = { 
						candidateID   		: this.props.candidateID,
						jobID         		: jobid,
					    employerID    		: company_id,
					    status        	  	: "Applied"
	}
	console.log(formValues)
	Swal.fire({
		title 				: 'Are you sure? you want to apply for this job!!!',
		text 				: 'You will be able to add this to applied joblist',
		icon 				: 'success',
		showCancelButton 	: true,
		confirmButtonText 	: 'Yes, Add it!',
		cancelButtonColor 	: 'No, keep it',
		confirmButtonColor  : '#d33',
	
	}).then((result) =>{
		console.log("result", result.value)
		if(result.value){
			Axios.post("/api/applyJob/post", formValues)
				.then(response =>{
					console.log("applied jobs response=", response.data);
					
					if(response.data.message==="You have applied to job."){

						Swal.fire(
									'Applied!',
									'Applied job successfully!',
									'success'
							);
					}
				})
				.catch(error=>{
					Swal.fire(
								"Some problem occured while applying job!",
								error.message,
								'error'
						)
				})
			
				}else if (result.dismiss === Swal.DismissReason.cancel){
					Swal.fire(
						'Cancelled',
						'Not added to applied joblist',
						'error'
					)
				}
			})

	}else{
		document.getElementById("loginbtndiv").click();
	}
}
	
	render(){
		
		return(
			<section className="jobListWrapper">
				<div className="col-lg-12 JobListWrapperMain">
					<div className="row">
						<div className="col-lg-4 col-lg-offset-8">
							<div className="input-group searchMainTab">
								<input type="text" name="search" id="search" className="form-control jobListSearchTab" placeholder="Search by Job Title..." onChange={this.search}/>
								<span className="input-group-addon searchTabAddOn"><i className="fa fa-search"></i> </span> 
							</div> 
						</div> 
						{
							this.props.jobList 
							?
								this.props.jobList.map((elem,index)=>{
									//console.log(elem._id )
									
								var x = this.props.jobWishlist && this.props.jobWishlist.length > 0 ?
								 this.props.jobWishlist.filter((wishlistitem) => wishlistitem.wishlistItems.jobID == elem._id) : [];
				                
				                if (x && x.length > 0) {
				                  var wishClass = '';
				                  var tooltipMsg = 'Remove from wishlist';
				                } else {
				                  var wishClass = '-o';
				                  var tooltipMsg = 'Add to wishlist';
				                }
								return(
									<div className="col-lg-12">
										<div className="jobListContainer">
											<div className="col-lg-12">
												<div className="col-lg-11 jobListLeftContent">
													<div className="row">
														<div className="iconsBar">
															<ul>	
																<li><i className="fa fa-male"></i></li>
																<li><i className="fa fa-sun-o"></i></li>
																<li><i className="fa fa-clock-o"></i></li>
															</ul>
															<div className="infoLog"> 15 Days Ago </div>
														</div>
													</div>
													<div className="jobListDesignation">
														{elem.jobBasicInfo.jobTitle}
													</div>
													<div className="jobListCompanyName">
														<b>iAssure International Technologies Pvt Ltd</b>
													</div>
													<div> 
														<i className="fa fa-calendar jobListExperience"></i> &nbsp; Exp: {elem.eligibility.minEducation} To {elem.eligibility.minExperience}
													</div>
													<div> 
														<i className="fa fa-rupee jobListMonSal"></i> &nbsp; <i className="fa fa-inr"></i> {elem.ctcOffered.minSalary} - <i className="fa fa-inr"></i> {elem.ctcOffered.maxSalary} a month
													</div>
													<div>
														<i className="fa fa-map-marker jobListLocation"></i> &nbsp; {elem.jobBasicInfo.jobLocationCity}
													</div>
													<div> 
														<i className="fa fa-users jobListNumPositions"></i> &nbsp; No of position : 10
													</div>
												</div>
												<div className="col-lg-1 jobListRightContent">
													<div className="row">
														<div className="col-lg-offset-2 col-lg-8">
															<div className="jobProfileVerticleIcons">
																<ul>
																	<li><i className="fa fa-check" onClick={applyJob => this.applyJob(elem._id, elem.company_id)}></i></li>
																	<li ><i title={tooltipMsg} onClick={wishlist => this.handleclick(elem._id)} className={"fa fa-heart" + wishClass }></i></li>
																	<li><i className="fa fa-youtube-play"></i></li>
																</ul>
															</div>
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
			</section>
		);
	}
}

const mapStateToProps = (state)=>{
    return {
    	loggedIn  		: state.loggedIn,		user_ID 		: state.user_ID, 	
    	candidateID 	: state.candidateID,	selector        : state.selector, 	
    	jobList 		: state.jobList,		jobWishlist 	: state.jobWishlist
    }
}
const mapDispachToProps = (dispatch) => ({
  mapAction :  bindActionCreators(mapActionCreator, dispatch)
}) 
export default connect(mapStateToProps, mapDispachToProps) (Joblist);