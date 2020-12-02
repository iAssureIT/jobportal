import React, {Component} from 'react';

import Axios from  'axios';
import Swal  from  'sweetalert2';

import "./JobWishlist.css";

export default class jobWishlist extends Component{
	constructor(props){
	super(props);
	this.state={
		jobList:[],
		isToggle:true,
		jobIdArray:[]
	}
}
componetDidMount(){
	
}
handleclick = (jobid)=>{
	console.log("jobid=", jobid);
	if(!this.state.jobIdArray.includes(jobid)){
		this.state.jobIdArray.push(jobid);
	}
	
	console.log("jobIdArray=", this.state.jobIdArray);
	this.setState({isToggle:!this.state.isToggle})
	const candidateID = "5f8ea1e3e4b7b4407d2cfe1";

	Swal.fire({
		title 				: 'Are you sure? you want to add this to wishlist!!!',
		text 				: 'You will be able to add this to wishlist',
		icon 				: 'success',
		showCancelButton 	: true,
		confirmButtonText 	: 'Yes, Add it!',
		cancelButtonColor 	: 'No, keep it',
		confirmButtonColor 	: '#d33',
	
	}).then((result) =>{
		console.log("result", result.value)
		if(result.value){
			console.log("candidateID=", candidateID);
			if(candidateID !== ""){
				if(this.state.jobIdArray.includes(jobid)){
					Axios.post("/api/wishlist/post")
					.then(response =>{
						console.log("wishlist response=", response.data);
						for (var i = 0; i < this.state.jobIdArray.length; i++){
							if (this.state.jobIdArray[i] === this.state.jobid) { 
								this.state.jobIdArray.splice(i, 1);
								break;
							}
						}
						if(response.data.message==="Job is removed from wishlist."){

							Swal.fire(
										'Removed!',
										'Job removed from wishlist successfully!',
										'success'
								);
						}
					})
					.catch(error=>{
						Swal.fire(
									"Some problem occured while adding wishlist!",
									error.message,
									'error'
							)
					})
				}else{
					Axios.post("http://qaapi-jobportal.iassureit.in/api/wishlist/post")
					.then(response =>{
						console.log("wishlist response=", response.data);
						if(response.data.message==="Job is added to wishlist."){

							Swal.fire(
										'Added!',
										'Job added into wishlist successfully!',
										'success'
								);
						}
					})
					.catch(error=>{
						Swal.fire(
									"Some problem occured while adding wishlist!",
									error.message,
									'error'
							)
					})
				}
			}
				
				}else if (result.dismiss === Swal.DismissReason.cancel){
					for (var i = 0; i < this.state.jobIdArray.length; i++){
						if (this.state.jobIdArray[i] === this.state.jobid) { 
							this.state.jobIdArray.splice(i, 1);
							break;
						}
					}
					Swal.fire(
						'Cancelled',
						'Not added in wishlist',
						'error'
					)
				}
			})
}
	
	render(){
		return(
			<section className="jobListWrapper">
				<div className="col-lg-9 JobListWrapperMain pull-right">
					<div className="row">
						<div className="col-lg-4 col-lg-offset-8">
							<div className="input-group searchMainTab">
								<input type="text" name="jobTitle" id="jobTitle" className="form-control jobListSearchTab" placeholder="Search by Job Title..." onChange={this.search}/>
								<span className="input-group-addon searchTabAddOn"><i className="fa fa-search"></i> </span> 
							</div> 
						</div> 
						{
							this.state.jobList.length > 0
							?
								this.state.jobList.map((elem,index)=>{
									return(
										<div className="col-lg-6">
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
															<div className="col-lg-12">
																<div className="jobProfileVerticleIcons">
																	<ul>
																		<li><i className="fa fa-check"></i></li>
																		<li><i onClick={e => this.handleclick(elem._id)}  className={this.state.jobIdArray.includes(elem._id) ? 'fa fa-heart':'fa fa-heart-o'}></i></li>
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