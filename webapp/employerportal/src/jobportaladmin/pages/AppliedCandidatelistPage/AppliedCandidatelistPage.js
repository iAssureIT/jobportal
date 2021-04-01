import React, {Component} 	from 'react';
import Axios 			 	  from 'axios';
import Swal 			 	  from 'sweetalert2';
import AppliedCandidatelist	from '../../blocks/AppliedCandidatelist/AppliedCandidatelist.js';
import { connect }            	from 'react-redux';
import { bindActionCreators } 	from 'redux';
import  * as mapActionCreator 	from '../../common/actions/index';
import Loader                   from '../../common/Loader/Loader.js';

class AppliedCandidatelistPage extends Component{
	constructor(props){ 
		super(props);
		this.state={
			appliedCandidateSelector   : 	{ "job_id" :  this.props.match.params.job_id },
		}
	}

	componentDidMount(){
		
		var {mapAction}  = this.props;
		mapAction.filterCandidatesApplied(this.state.appliedCandidateSelector)	
		
		// get single job information by job_id
		Axios.get("/api/jobs/get/one/"+this.props.match.params.job_id)
		.then(response=>{
			this.setState({jobInfo : response.data})
		})
		.catch(err=>{

		})
	}
	render(){

		return(
					<div className="container-fluid">
						<div className="row">
							 { this.props.showLoader ? <Loader type = "candidatelistLoader" /> : <AppliedCandidatelist jobInfo={this.state.jobInfo } /> }
						</div> 
					</div>
			);	 
	}
}

const mapStateToProps = (state)=>{
                                    return { selector    : state.selector, showLoader : state.showLoader }
                                  }

const mapDispatchToProps = (dispatch) => ({
                                            mapAction :  bindActionCreators(mapActionCreator, dispatch)
                                          }) 

export default connect(mapStateToProps, mapDispatchToProps)(AppliedCandidatelistPage)
