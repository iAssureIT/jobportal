import React, {Component} 		from 'react';

import Axios 			  		from 'axios';
import Swal  					from 'sweetalert2';
import Moment 					from "moment";
import { FontAwesomeIcon } 		from '@fortawesome/react-fontawesome';
import { connect }        		from 'react-redux';
import { bindActionCreators } 	from 'redux';
import  * as mapActionCreator 	from '../../common/actions/index';
/*import Pagination from "react-js-pagination";*/
require("bootstrap/less/bootstrap.less");

class JobListView extends Component{
	constructor(props){
	super(props);
	this.state={
		jobList 		: [],
		startLimit 		: this.props.selector.startLimit,
		isActive 		: true,
		job_id          : "" 
	}
}	

componentDidMount(){
	/*var selector=this.props.selector;
	selector.countryCode = "IN"; 

	this.setState({ selector: selector })

	var {mapAction} = this.props;
	mapAction.filterJobList(selector);*/

}

getJobs(event){
	//console.log(event.target)
	var selector 	= this.props.selector;
	selector.status = event.target.getAttribute('data-status');
	selector.startLimit     = 0;
    selector.initialLimit   = 25;
    selector.showMoreLimit  = 25;
	var {mapAction} = this.props;
    mapAction.filterJobList(selector);

	console.log("45 inside getjob function",event.target.getAttribute('data-status'))
}

showMore(){
	var selector 		  	= this.props.selector;

	selector.startLimit   	= this.props.selector.startLimit === 0 
	? this.props.selector.startLimit + this.props.selector.initialLimit  
	: this.props.selector.startLimit + this.props.selector.showMoreLimit

	console.log(selector)
  	
  	var {mapAction} = this.props;
    mapAction.filterJobList(selector);
}

handlePageChange(pageNumber) {
	//console.log(`active page is ${pageNumber}`);
	this.setState({activePage: pageNumber});
	
	var activePage = pageNumber;

	var selector=this.props.selector;
  	
  	selector.startLimit   = (activePage-1) * 5;
  	selector.endLimit     = activePage * 5;
  	selector.activePage   = pageNumber;

  	var {mapAction} = this.props;
    mapAction.filterJobList(selector);
}

deleteJob = (event)=>{
	event.preventDefault();
	const job_id = this.state.job_id;

	if(job_id){
        Axios.delete("/api/jobs/delete/"+job_id)
        .then(response =>{
          if(response.data.message==="Job details deleted Successfully!"){
            var {mapAction} = this.props;
            mapAction.filterJobList(this.props.selector);
            /*this.getJobs();*/
          }
        })
        .catch(error=>{
        })
      }

	}	

/*deleteJob = (event)=>{
	event.preventDefault();
	const job_id = event.currentTarget.id;

	this.setState({job_id:job_id})

	Swal.fire({
		title 				: 'Are you sure? you want to delete this job!!!',
		text 				: 'You will not be able to recover this job',
		icon 				: 'warning',
		showCancelButton 	: true,
		confirmButtonText 	: 'Yes, delete it!',
		cancelButtonText 	: 'No, keep it',
		confirmButtonColor 	: '#f5a721',
	
	}).then((result) =>{
		if(result.value){
			if(job_id){
				Axios.delete("/api/jobs/delete/"+job_id)
				.then(response =>{
					if(response.data.message==="Job details deleted Successfully!"){
						var {mapAction} = this.props;
						mapAction.filterJobList(this.state.selector);
	
						Swal.fire(
									'Deleted!',
									'Job has been deleted successfully!',
									'success'
							);
					}
				})
				.catch(error=>{
					Swal.fire(
								"Some problem occured deleting job!",
								error.message,
								'error'
						)
				})
			}
				
				}else if (result.dismiss === Swal.DismissReason.cancel){
					Swal.fire(
						'Cancelled',
						'Your job is safe :)',
						'error'
					)
				}
			})
		}*/


	
	handleSwitch (){ 
  			this.setState({
  				isActive: !this.state.isActive
  			});
    }
	
	inactiveJob(event){
		event.preventDefault();
		const job_id = event.currentTarget.id;

	Swal.fire({
		title 				: 'Are you sure do you want to inactive this job!!!',
		//text 				: 'You will not be able to recover this job',
		icon 				: 'warning',
		showCancelButton 	: true,
		confirmButtonText 	: 'Inactive!',
		cancelButtonText 	: 'No, keep it',
		confirmButtonColor 	: '#f5a721',
	
	}).then((result) =>{
		if(result.value){
			if(job_id){
				Axios.delete("/api/jobs/inactive/"+job_id)
				.then(response =>{
					if(response.data.message==="Job is inactivated successfully!"){
						var {mapAction} = this.props;
						mapAction.filterJobList(this.state.selector);

						Swal.fire(
									'Deleted!',
									'Job has been inactivated successfully!',
									'success'
							);
					}
				})
				.catch(error=>{
					Swal.fire(
								"Some problem occured deleting job!",
								error.message,
								'error'
						)
				})
			}
				
				}else if (result.dismiss === Swal.DismissReason.cancel){
					Swal.fire(
						'Cancelled',
						'Your job is safe :)',
						'error'
					)
				}
			})
	}	
	
	render(){
		console.log("selector",this.props.selector);
		var {mapAction} = this.props;
		console.log(this.props.jobCount)
		return(
			<section className="jobListWrapper">
				<div className="col-lg-12 EmployeeListWrapperMain">
					{/*<div className="col-lg-4 col-lg-offset-8">
						<div className="input-group searchMainTab">
							<input type="text" name="jobTitle" id="jobTitle" className="form-control jobListSearchTab" placeholder="Search by Job Title..." onChange={this.search}/>
						</div> 
					</div>*/}
					<div className="col-lg-8 col-lg-offset-2 row btnsRow">
						<ul className="nav nav-pills nav-justified">
						  	<li className="active col-lg-4 row" data-status="active" onClick={this.getJobs.bind(this)}  ><a data-toggle="pill" href="#activejobs" data-status="active" >Active Jobs</a></li>
						  	<li className="col-lg-4 row" data-status="inactive" onClick={this.getJobs.bind(this)}><a data-toggle="pill" href="#inactivejobs" data-status="inactive">Inactive Jobs</a></li>
						  	<li className="col-lg-4 row" data-status="draft" onClick={this.getJobs.bind(this)}><a data-toggle="pill" href="#draftjobs" data-status="draft">Drafts Jobs</a></li>
						</ul>
					</div>	

					<div className="tab-content col-lg-12">
						<div id="activejobs" className="tab-pane fade in active">
							{
								this.props.jobList.length>0
								?
									this.props.jobList.map((elem,index1)=>{
										//mapAction.stateApplicantsCountList({entity_id : this.props.company_id, stateCode : elem.location.stateCode});
										//console.log(elem)
										var applicantsCount = this.props.totalApplicantsCountList.filter((appl, ind)=>{
											if (appl._id == elem._id) {
												return appl.candidatesApplied;
											}else{
												return 0
											}
										})

										

										return(
											<div className="col-lg-12" key={index1}>
												<div className="jobListContainer">
													<div className="col-lg-12">
														<div className="col-lg-11 jobListLeftContent">
															<div className="row">
																<div className="leftSideMainBox col-lg-12">
																	<div className="col-lg-6 leftSideBox">
																		<div className="iconsBar">
																			{/*<FontAwesomeIcon className="restRoomIcon" icon={['fas', 'restroom']} />*/}
																			<ul>
																				{
																					elem.jobBasicInfo.gender=="Male Only"?
																					<li><i className="fa fa-male" title="Only male candidates can apply"></i></li>
																					: elem.jobBasicInfo.gender=="Female Only"?
																					<li><i className="fa fa-female" title="Only female candidates can apply"></i></li> 
																					: <li><i className="fa fa-male" title="male & female candidates both can apply"></i><i className="fa fa-female bothIcon" title="male & female candidates both can apply"></i></li>
																				}
																				{	 
																					elem.jobBasicInfo.jobshift_id ? 
																					elem.jobBasicInfo.jobshift_id.jobShift=="Day Shift" ?
																					<li><i className="fa fa-sun-o" title="Day Shift"></i></li>
																					: elem.jobBasicInfo.jobshift_id.jobShift=="Night Shift"?
																					<li><i className="fa fa-moon-o" title="Night Shift"></i></li> 
																					: <li><i className="fa fa-repeat" title="Rotational shift"></i></li> 
																					:
																					<li><i className="fa fa-sun-o" title="Day Shift"></i></li>	
																				}	
																				{	
																					elem.jobBasicInfo.jobtime_id.jobTime=="Full Time"?
																					<li><i className="fa fa-clock-o" title="Full Time"></i></li>
																					: elem.jobBasicInfo.jobtime_id.jobTime=="Part Time" ? <li><i className="fa fa-hourglass-start" title="Part Time"></i></li>
																					: elem.jobBasicInfo.jobtime_id.jobTime=="Hourly Basis"? 
																					<li><i className="fa fa-hourglass-o" title="Hourly Basis"></i></li> 
																					: <li><i className="fa fa-hourglass-o" title="Hourly Basis"></i></li> 
																				}	
																			</ul>
																		</div>	
																		<div className="infoLog"> {Moment(elem.createdAt).startOf('seconds').fromNow()}  </div>
																		<div className="jobListDesignation col-lg-12 row">
																			<a className="link" href={"/job-profile/" +  elem._id}>{elem.jobBasicInfo.jobTitle + " (" +elem.jobID+ ")"} </a>
																		</div>
																		<div className="jobListCompanyTitle col-lg-12 row">
																			{elem.company_id ? elem.company_id.companyName : ""}
																		</div>
																		<div className="jobListExperienceTitle col-lg-12 row"> 
																			<i className="fa fa-calendar jobListExperience"></i> &nbsp; Exp&nbsp;:&nbsp;{elem.eligibility.minExperience} years
																		</div>
																		<div className="jobListCtcSalTitle col-lg-12 row"> 
																			<i className="fa fa-rupee jobListCtcSal"></i> &nbsp; <i className="fa fa-inr"></i> {elem.ctcOffered.minSalary} {elem.ctcOffered.minSalPeriod}&nbsp;&nbsp;-&nbsp;&nbsp;<i className="fa fa-inr"></i> {elem.ctcOffered.maxSalary} {elem.ctcOffered.maxSalPeriod}
																		</div>
																		<div className="joblistLocationInfo col-lg-12 row">
																			<i className="fa fa-map-marker jobListLocation"></i> &nbsp; {elem.location.address + " " + elem.location.district + ", " + elem.location.state + ", " +elem.location.country}
																		</div>
																		<div className="jobListNumPositionsTitle col-lg-12 row"> 
																			<i className="fa fa-users jobListNumPositions"></i> &nbsp; No. of positions : {elem.jobBasicInfo.positions}
																		</div>
																	</div>
																	<div className="col-lg-6 rightSideBox">
																		<div className="joblistNoCount col-lg-12"> 
																			&nbsp; <a href={"/applied-candidate-list/" + elem._id}> Candidates Applied : {	elem.applicantStatistics.total ? elem.applicantStatistics.total  :  0}</a> 
																		</div> 
																		<div className="tierOneRow col-lg-12 "> 
																			<div className="col-lg-4 react1 row">{elem.location.district}<br /><span className="multiCount">{elem.applicantStatistics.district}</span></div>
																			<div className="col-lg-4 react2 row">Rest of {elem.location.state}<br /><span className="multiCount">{elem.applicantStatistics.state ? ( elem.applicantStatistics.state - elem.applicantStatistics.district ) : 0 } </span></div>
																			<div className="col-lg-4 react3 row">Rest of {elem.location.country}<br /><span className="multiCount">{elem.applicantStatistics.country ? ( elem.applicantStatistics.country - elem.applicantStatistics.state ) : 0}</span></div> 
																		</div>
																		<div className="tierOneRow col-lg-12 "> 
																			<div className="col-lg-4 react1 row">Male<br /><span className="multiCount"></span>{elem.applicantStatistics.male  ? elem.applicantStatistics.male : 0}</div>
																			<div className="col-lg-4 react2 row">Female<br /><span className="multiCount">{elem.applicantStatistics.female  ? elem.applicantStatistics.female : 0 }</span></div>
																			<div className="col-lg-4 react3 row">Other<br /><span className="multiCount"> {elem.applicantStatistics.other  ? elem.applicantStatistics.other : 0 }</span></div> 
																		</div>
																		<div className="tierOneRow col-lg-12 "> 
																			<div className="col-lg-4 react1 row">Exp&nbsp;:&nbsp;0 To 2<br /><span className="multiCount">{elem.applicantStatistics.exp0to2  ? elem.applicantStatistics.exp0to2 : 0}</span></div>
																			<div className="col-lg-4 react2 row">Exp&nbsp;:&nbsp;2 To 6<br /><span className="multiCount">{elem.applicantStatistics.exp2to6 ? elem.applicantStatistics.exp2to6 : 0}</span></div>
																			<div className="col-lg-4 react3 row">Exp&nbsp;:&nbsp;6 To 10<br /><span className="multiCount">{elem.applicantStatistics.exp6to10 ? elem.applicantStatistics.exp6to10 : 0}</span></div> 
																		</div> 
																	</div>
																</div>
															</div>			
														</div>
														<div className="col-lg-1 jobListRightContent">
															<div className="row">
																<div className="col-lg-12">
																	<div className="listEditBtn">
																		<a title = "Edit" href={"/post-job/" + elem._id}><i className="fa fa-edit"></i></a>
																	</div>	
																	<div className="listViewBtn">	
																		<a title = "View" href={"/job-profile/" + elem._id}><i className="fa fa-eye"></i></a>
																	</div>
																	<div className="listViewBtn">	
																		<a title = "Inactive" onClick={this.inactiveJob} id = {elem._id}><i className="fa fa-eye-slash"></i></a>	
																	</div>
																	<div className="listDelBtn">	
																		<i title = "Delete" className="fa fa-trash" data-toggle="modal" data-target="#delModal" data-dismiss="modal" onClick={() => {this.setState({job_id:elem._id})}} id = {elem._id}></i>
																	</div>

																	<div className="input-group jobStatusToggleWrapper">
																		<div className = {this.state.isActive ? "genderFeild col-lg-6 genderFeildActive" : "genderFeild col-lg-6" }
																		 id="togglePrimary" name="primaryToggel" 
																		 value="togglePrimary" onClick={this.handleSwitch.bind(this)}>
																			<div className="row">Inactive</div>
																		</div>
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
									<h3 style={{margin:"100px"}}>No Jobs Found</h3>
							}

							<div className="col-lg-12">
								{
									this.props.jobCount ? 
									(this.props.selector.startLimit + this.props.selector.showMoreLimit) >= this.props.jobCount ? null :
									<button className="btn buttonYellow" style={{float:"right", margin:"20px 0"}} onClick={this.showMore.bind(this)}>Show {this.props.selector.showMoreLimit} More</button>
						        
						        	: 
						        	<button className="btn buttonYellow" style={{float:"right", margin:"20px 0"}} onClick={this.showMore.bind(this)}> Show More </button> 
								}
						    </div>
						</div>
						
						<div id="inactivejobs" className="tab-pane fade">
							{
								this.props.jobList.length>0
								?
									this.props.jobList.map((elem,index1)=>{
										//console.log(elem)
										var applicantsCount = this.props.totalApplicantsCountList.filter((appl, ind)=>{
											if (appl._id == elem._id) {
												return appl.candidatesApplied;
											}else{
												return 0
											}
											
										})
										return(
											<div className="col-lg-12" key={index1}>
												<div className="jobListContainer">
													<div className="col-lg-12">
														<div className="col-lg-11 jobListLeftContent">
															<div className="row">
																<div className="leftSideMainBox col-lg-12">
																	<div className="col-lg-6 leftSideBox">
																		<div className="iconsBar">
																			{/*<FontAwesomeIcon className="restRoomIcon" icon={['fas', 'restroom']} />*/}
																			<ul>
																				{
																					elem.jobBasicInfo.gender=="Male Only"?
																					<li><i className="fa fa-male" title="Only male candidates can apply"></i></li>
																					: elem.jobBasicInfo.gender=="Female Only"?
																					<li><i className="fa fa-female" title="Only female candidates can apply"></i></li> 
																					: <li><i className="fa fa-male" title="male & female candidates both can apply"></i><i className="fa fa-female bothIcon" title="male & female candidates both can apply"></i></li>
																				}
																				{	 
																					elem.jobBasicInfo.jobshift_id ? 
																					elem.jobBasicInfo.jobshift_id.jobShift=="Day Shift" ?
																					<li><i className="fa fa-sun-o" title="Day Shift"></i></li>
																					: elem.jobBasicInfo.jobshift_id.jobShift=="Night Shift"?
																					<li><i className="fa fa-moon-o" title="Night Shift"></i></li> 
																					: <li><i className="fa fa-repeat" title="Rotational shift"></i></li> 
																					:
																					<li><i className="fa fa-sun-o" title="Day Shift"></i></li>	
																				}	
																				{	
																					elem.jobBasicInfo.jobtime_id.jobTime=="Full Time"?
																					<li><i className="fa fa-clock-o" title="Full Time"></i></li>
																					: elem.jobBasicInfo.jobtime_id.jobTime=="Part Time" ? <li><i className="fa fa-hourglass-start" title="Part Time"></i></li>
																					: elem.jobBasicInfo.jobtime_id.jobTime=="Hourly Basis"? 
																					<li><i className="fa fa-hourglass-o" title="Hourly Basis"></i></li> 
																					: <li><i className="fa fa-hourglass-o" title="Hourly Basis"></i></li> 
																				}	
																			</ul>
																		</div>	
																		<div className="infoLog"> {Moment(elem.createdAt).startOf('seconds').fromNow()}  </div>
																		<div className="jobListDesignation col-lg-12 row">
																			<a className="link">{elem.jobBasicInfo.jobTitle + " (" +elem.jobID+ ")"} </a>
																		</div>
																		<div className="jobListCompanyTitle col-lg-12 row">
																			{elem.company_id ? elem.company_id.companyName : ""}
																		</div>
																		<div className="jobListExperienceTitle col-lg-12 row"> 
																			<i className="fa fa-calendar jobListExperience"></i> &nbsp; Exp&nbsp;:&nbsp;{elem.eligibility.minExperience} years
																		</div>
																		<div className="jobListCtcSalTitle col-lg-12 row"> 
																			<i className="fa fa-rupee jobListCtcSal"></i> &nbsp; <i className="fa fa-inr"></i> {elem.ctcOffered.minSalary} {elem.ctcOffered.minSalPeriod}&nbsp;&nbsp;-&nbsp;&nbsp;<i className="fa fa-inr"></i> {elem.ctcOffered.maxSalary} {elem.ctcOffered.maxSalPeriod}
																		</div>
																		<div className="joblistLocationInfo col-lg-12 row">
																			<i className="fa fa-map-marker jobListLocation"></i> &nbsp; {elem.location.address + " " + elem.location.district + ", " + elem.location.state + ", " +elem.location.country}
																		</div>
																		<div className="jobListNumPositionsTitle col-lg-12 row"> 
																			<i className="fa fa-users jobListNumPositions"></i> &nbsp; No. of positions : {elem.jobBasicInfo.positions}
																		</div>
																	</div>
																	<div className="col-lg-6 rightSideBox">
																		<div className="joblistNoCount col-lg-12"> 
																			&nbsp; <a href={"/applied-candidate-list/" + elem._id}> Candidates Applied : {applicantsCount.length > 0 ? applicantsCount[0].candidatesApplied :  0}</a> 
																		</div>
																		<div className="tierOneRow col-lg-12 "> 
																			<div className="col-lg-4 react1 row">Pune<br /><span className="multiCount">150</span></div>
																			<div className="col-lg-4 react2 row">Rest of Maharashtra<br /><span className="multiCount">90</span></div>
																			<div className="col-lg-4 react3 row">Rest of India<br /><span className="multiCount">120</span></div> 
																		</div>
																		<div className="tierOneRow col-lg-12 "> 
																			<div className="col-lg-4 react1 row">Male<br /><span className="multiCount">160</span></div>
																			<div className="col-lg-4 react2 row">Female<br /><span className="multiCount">200</span></div>
																			<div className="col-lg-4 react3 row">Other<br /><span className="multiCount">0</span></div> 
																		</div>
																		<div className="tierOneRow col-lg-12 "> 
																			<div className="col-lg-4 react1 row">Exp&nbsp;:&nbsp;0 To 2<br /><span className="multiCount">105</span></div>
																			<div className="col-lg-4 react2 row">Exp&nbsp;:&nbsp;2 To 6<br /><span className="multiCount">95</span></div>
																			<div className="col-lg-4 react3 row">Exp&nbsp;:&nbsp;6 To 7<br /><span className="multiCount">160</span></div> 
																		</div> 
																	</div>
																</div>
															</div>			
														</div>
														<div className="col-lg-1 jobListRightContent">
															<div className="row">
																<div className="col-lg-12">
																	<div className="listEditBtn">
																		<a title = "Edit Profile" href={"/post-job/" + elem._id}><i className="fa fa-edit"></i></a>
																	</div>
																	<div className="listViewBtn">	
																		<a title = "View Profile" href={"/job-profile/" + elem._id}><i className="fa fa-eye"></i></a>
																	</div>
																	<div className="listDelBtn">	
																		<i title = "Delete Profile" className="fa fa-trash" onClick={this.deleteJob} id = {elem._id}></i>
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
									<h3 style={{margin:"100px"}}>No Jobs Found</h3>
							}

							<div className="col-lg-12">
								{
									this.props.jobCount ? 
									(this.props.selector.startLimit + this.props.selector.showMoreLimit) >= this.props.jobCount ? null :
									<button className="btn buttonYellow" style={{float:"right", margin:"20px 0"}} onClick={this.showMore.bind(this)}>Show {this.props.selector.showMoreLimit} More</button>
						        
						        	: 
						        	<button className="btn buttonYellow" style={{float:"right", margin:"20px 0"}} onClick={this.showMore.bind(this)}> Show More </button>
								}
						    </div>
						</div>
						
						<div id="draftjobs" className="tab-pane fade">
							{
								this.props.jobList.length>0
								?
									this.props.jobList.map((elem,index1)=>{
										//console.log(elem)
										var applicantsCount = this.props.totalApplicantsCountList.filter((appl, ind)=>{
											if (appl._id == elem._id) {
												return appl.candidatesApplied;
											}else{
												return 0
											}
											
										})
										return(
											<div className="col-lg-12" key={index1}>
												<div className="jobListContainer">
													<div className="col-lg-12">
														<div className="col-lg-11 jobListLeftContent">
															<div className="row">
																<div className="leftSideMainBox col-lg-12">
																	<div className="col-lg-6 leftSideBox">
																		<div className="iconsBar">
																			{/*<FontAwesomeIcon className="restRoomIcon" icon={['fas', 'restroom']} />*/}
																			<ul>
																				{
																					elem.jobBasicInfo.gender=="Male Only"?
																					<li><i className="fa fa-male" title="Only male candidates can apply"></i></li>
																					: elem.jobBasicInfo.gender=="Female Only"?
																					<li><i className="fa fa-female" title="Only female candidates can apply"></i></li> 
																					: <li><i className="fa fa-male" title="male & female candidates both can apply"></i><i className="fa fa-female bothIcon" title="male & female candidates both can apply"></i></li>
																				}
																				{	 
																					elem.jobBasicInfo.jobshift_id ? 
																					elem.jobBasicInfo.jobshift_id.jobShift=="Day Shift" ?
																					<li><i className="fa fa-sun-o" title="Day Shift"></i></li>
																					: elem.jobBasicInfo.jobshift_id.jobShift=="Night Shift"?
																					<li><i className="fa fa-moon-o" title="Night Shift"></i></li> 
																					: <li><i className="fa fa-repeat" title="Rotational shift"></i></li> 
																					:
																					<li><i className="fa fa-sun-o" title="Day Shift"></i></li>	
																				}	
																				{	
																					elem.jobBasicInfo.jobtime_id.jobTime=="Full Time"?
																					<li><i className="fa fa-clock-o" title="Full Time"></i></li>
																					: elem.jobBasicInfo.jobtime_id.jobTime=="Part Time" ? <li><i className="fa fa-hourglass-start" title="Part Time"></i></li>
																					: elem.jobBasicInfo.jobtime_id.jobTime=="Hourly Basis"? 
																					<li><i className="fa fa-hourglass-o" title="Hourly Basis"></i></li> 
																					: <li><i className="fa fa-hourglass-o" title="Hourly Basis"></i></li> 
																				}	
																			</ul>
																		</div>	
																		<div className="infoLog"> {Moment(elem.createdAt).startOf('seconds').fromNow()}  </div>
																		<div className="jobListDesignation col-lg-12 row">
																			<a className="link">{elem.jobBasicInfo.jobTitle + " (" +elem.jobID+ ")"} </a>
																		</div>
																		<div className="jobListCompanyTitle col-lg-12 row">
																			{elem.company_id ? elem.company_id.companyName : ""}
																		</div>
																		<div className="jobListExperienceTitle col-lg-12 row"> 
																			<i className="fa fa-calendar jobListExperience"></i> &nbsp; Exp&nbsp;:&nbsp;{elem.eligibility.minExperience} years
																		</div>
																		<div className="jobListCtcSalTitle col-lg-12 row"> 
																			<i className="fa fa-rupee jobListCtcSal"></i> &nbsp; <i className="fa fa-inr"></i> {elem.ctcOffered.minSalary} {elem.ctcOffered.minSalPeriod}&nbsp;&nbsp;-&nbsp;&nbsp;<i className="fa fa-inr"></i> {elem.ctcOffered.maxSalary} {elem.ctcOffered.maxSalPeriod}
																		</div>
																		<div className="joblistLocationInfo col-lg-12 row">
																			<i className="fa fa-map-marker jobListLocation"></i> &nbsp; {elem.location.address + " " + elem.location.district + ", " + elem.location.state + ", " +elem.location.country}
																		</div>
																		<div className="jobListNumPositionsTitle col-lg-12 row"> 
																			<i className="fa fa-users jobListNumPositions"></i> &nbsp; No. of positions : {elem.jobBasicInfo.positions}
																		</div>
																	</div>
																	<div className="col-lg-6 rightSideBox">
																		<div className="joblistNoCount col-lg-12"> 
																			&nbsp; <a href={"/applied-candidate-list/" + elem._id}> Candidates Applied : {applicantsCount.length > 0 ? applicantsCount[0].candidatesApplied :  0}</a> 
																		</div>
																		<div className="tierOneRow col-lg-12 "> 
																			<div className="col-lg-4 react1 row">Pune<br /><span className="multiCount">150</span></div>
																			<div className="col-lg-4 react2 row">Rest of Maharashtra<br /><span className="multiCount">90</span></div>
																			<div className="col-lg-4 react3 row">Rest of India<br /><span className="multiCount">120</span></div> 
																		</div>
																		<div className="tierOneRow col-lg-12 "> 
																			<div className="col-lg-4 react1 row">Male<br /><span className="multiCount">160</span></div>
																			<div className="col-lg-4 react2 row">Female<br /><span className="multiCount">200</span></div>
																			<div className="col-lg-4 react3 row">Other<br /><span className="multiCount">0</span></div> 
																		</div>
																		<div className="tierOneRow col-lg-12 "> 
																			<div className="col-lg-4 react1 row">Exp&nbsp;:&nbsp;0 To 2<br /><span className="multiCount">105</span></div>
																			<div className="col-lg-4 react2 row">Exp&nbsp;:&nbsp;2 To 6<br /><span className="multiCount">95</span></div>
																			<div className="col-lg-4 react3 row">Exp&nbsp;:&nbsp;6 To 7<br /><span className="multiCount">160</span></div> 
																		</div> 
																	</div>
																</div>
															</div>			
														</div>
														<div className="col-lg-1 jobListRightContent">
															<div className="row">
																<div className="col-lg-12">
																	<div className="listEditBtn">
																		<a title = "Edit Profile" href={"/post-job/" + elem._id}><i className="fa fa-edit"></i></a>
																	</div>
																	<div className="listViewBtn">	
																		<a title = "View Profile" href={"/job-profile/" + elem._id}><i className="fa fa-eye"></i></a>
																	</div>
																	<div className="listDelBtn">	
																		<i title = "Delete Profile" className="fa fa-trash" onClick={this.deleteJob} id = {elem._id}></i>
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
									<h3 style={{margin:"100px"}}>No Jobs Found</h3>
							}

							<div className="col-lg-12">
								{
									this.props.jobCount ? 
									(this.props.selector.startLimit + this.props.selector.showMoreLimit) >= this.props.jobCount ? null :
									<button className="btn buttonYellow" style={{float:"right", margin:"20px 0"}} onClick={this.showMore.bind(this)}>Show {this.props.selector.showMoreLimit} More</button>
						        
						        	: 
						        	<button className="btn buttonYellow" style={{float:"right", margin:"20px 0"}} onClick={this.showMore.bind(this)}> Show More </button>
								}
						    </div>
						</div>
					</div>
					<div class="modal fade" id="delModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
					    <div class="modal-dialog delModalMain">
					      <div class="modal-content delModalContent">
					        <div class="modal-header delHeader">
					          <button type="button" class="close delCloseBtn" data-dismiss="modal" aria-label="Close">
					            <span aria-hidden="true">&times;</span>
					          </button>
					        </div>
					        <div class="modal-body delModalBody">
					          <div class="delBodyText">
					            Are you sure <br />
					            you want to delete this job?
					          </div>
					          <div className="col-lg-12 delMainBtnDiv">
					              <button type="button" class="btn btn-default delModalBtnOne col-lg-3" data-dismiss="modal">NO</button> 
					              <button type="button" class="btn btn-default delModalBtnTwo col-lg-3" data-dismiss="modal" onClick={this.deleteJob}>YES</button>
					          </div> 
					        </div>
					      </div>
					    </div>
					</div> 

										</div>
									);
								})
							:
								<h3 style={{margin:"100px"}}>No Jobs Found</h3>
						}
					{/*<div className="col-lg-12">
				        <Pagination
				          activePage={this.state.activePage}
				          itemsCountPerPage={5}
				          totalItemsCount={this.props.jobCount[0] ? this.props.jobCount[0].jobCount : 0}
				          pageRangeDisplayed={5}
				          onChange={this.handlePageChange.bind(this)}
				        />
				    </div>	*/}
			
				
			</section>
		);
	}
}

const mapStateToProps = (state)=>{
    return {
        user_ID     : state.user_ID,  	candidate_id   : state.candidate_id,
        selector    : state.selector,   jobList        : state.jobList,
        jobCount  	: state.jobCount,	
        // countryApplicantsCountList  : state.countryApplicantsCountList,
        // stateApplicantsCountList 	: state.stateApplicantsCountList,
        // maleApplicantsCountList 	: state.maleApplicantsCountList,
        // femaleApplicantsCountList 	: state.femaleApplicantsCountList,
        // otherApplicantsCountList 	: state.otherApplicantsCountList,
        // exp02ApplicantsCountList  	: state.exp02ApplicantsCountList,
        // exp26ApplicantsCountList 	: state.exp26ApplicantsCountList,
        // exp610ApplicantsCountList 	: state.exp610ApplicantsCountList,
        totalApplicantsCountList 	: state.totalApplicantsCountList
    }
}
const mapDispatchToProps = (dispatch) => ({
  mapAction :  bindActionCreators(mapActionCreator, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(JobListView)