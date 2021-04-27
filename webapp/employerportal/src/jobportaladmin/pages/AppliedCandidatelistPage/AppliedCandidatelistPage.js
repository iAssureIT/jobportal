import React, {Component} 		from 'react';
import Axios 			 	  	from 'axios';
import { withRouter }	 	    from 'react-router-dom';
import Swal 			 	  	from 'sweetalert2';
import AppliedCandidatelist		from '../../blocks/AppliedCandidatelist/AppliedCandidatelist.js';
import { connect }            	from 'react-redux';
import { bindActionCreators } 	from 'redux';
import  * as mapActionCreator 	from '../../common/actions/index';
import Loader                   from '../../common/Loader/Loader.js';

class AppliedCandidatelistPage extends Component{
	constructor(props){ 
		super(props);
		this.state={
			appliedCandidateSelector   : 	{},
		}
	}
	componentWillReceiveProps(newProps) {    
      console.log('Component WILL RECIEVE PROPS!',newProps)
   }
	componentDidMount(){
		console.log("props",this.props)
		var {mapAction}  = this.props;

		var appliedCandidateSelector = this.state.appliedCandidateSelector;

		if (this.props.match.path== "/applied-candidate-list/:job_id") {
			appliedCandidateSelector.job_id = this.props.match.params.job_id
			mapAction.filterCandidatesApplied(appliedCandidateSelector)
		}
		else if (this.props.match.path== "/applied-candidate-list/:job_id/state/:stateCode") {
			appliedCandidateSelector.job_id = this.props.match.params.job_id
			appliedCandidateSelector.stateCode = this.props.match.params.stateCode
			mapAction.filterCandidatesApplied(appliedCandidateSelector)
		}
		else if (this.props.match.path== "/applied-candidate-list/:job_id/district/:district") {
			appliedCandidateSelector.job_id = this.props.match.params.job_id
			appliedCandidateSelector.district = this.props.match.params.district
			mapAction.filterCandidatesApplied(appliedCandidateSelector)
		}	
		else if (this.props.match.path== "/applied-candidate-list/:job_id/gender/:gender") {
			appliedCandidateSelector.job_id = this.props.match.params.job_id
			appliedCandidateSelector.gender = this.props.match.params.gender
			mapAction.filterCandidatesApplied(appliedCandidateSelector)
		}
		else if (this.props.match.path== "/applied-candidate-list/:job_id/experience/:experience") {
			appliedCandidateSelector.job_id = this.props.match.params.job_id
			appliedCandidateSelector.experience = this.props.match.params.experience
			mapAction.filterCandidatesApplied(appliedCandidateSelector)
		}
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AppliedCandidatelistPage))
