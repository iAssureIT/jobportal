import React,{Component}    from 'react';
import Axios        		from 'axios';
import Swal  				from  'sweetalert2';
import JobList    	 		from '../../blocks/jobList/JobList.js';
import LeftSideFilters      from '../../blocks/LeftSideFilters/LeftSideFilters.js';

class CandidateJobList extends Component{
	constructor(props){
		super(props);
		this.state={
			jobList  : []
		}
	}

	componentDidMount(){
		this.getJobsData();
	}

	getJobsData=()=>{
		Axios.get("/api/jobs/list")
		.then(response=>{
			console.log("getJobsData response.data : ", response.data);
			this.setState({
				jobList : response.data
			});
		})
		.catch(error=>{
			//Swal.fire("Error while getting list data", error.message, "error");
		})
	}
	
	render(){
		return(
				<div className="mainPagesWrapper col-lg-12">
					<div className="row">
						<div className="col-lg-3">
							<div className="row">
							<div className="viewWrapper col-lg-4">
			                  <div className='row'>
			                    <ul className="nav nav-pills">
			                      <li className="viewDiv active" ><a data-toggle="pill" href="#mapwise" > Map <br/> View</a></li>
			                      <li className="viewDiv"><a data-toggle="pill" href="#functionwise">Functional <br/> View</a></li>
			                      <li className="viewDiv"><a data-toggle="pill" href="#industrywise">Industrial <br/> View</a></li>
			                    </ul>
			                  </div>  
			                </div>
			                <div className="filterWrapper col-lg-8" style={{left:this.state.leftDrawerDisplay}}>
			                  <div className='row'>
			                    <LeftSideFilters />
			                  </div>
			                </div>
							</div>
						</div>
						<div className="col-lg-9">
							<div className="row">
								<JobList jobList={this.state.jobList}/>
							</div>
						</div>
					</div>
				</div>
			);
	}
}

export default CandidateJobList;