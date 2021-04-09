import React,{Component}     	from 'react';
import JobWishlist    	 		from '../../blocks/JobWishlist/JobWishlist.js';
import JobWishlistFilters    	from '../../blocks/JobWishlistFilters/JobWishlistFilters.js';

import { connect }        		from 'react-redux';
import { bindActionCreators } 	from 'redux';
import  * as mapActionCreator 	from '../../common/actions/index';


class CandidateJobWishlist extends Component{
	constructor(props){
		super(props);

	}
	componentDidMount(){
      var {mapAction} = this.props; 
      var appliedJobSelector  = this.props.appliedJobSelector;
      appliedJobSelector.candidate_id = this.props.userDetails.candidate_id;
      mapAction.getAppliedJoblist(appliedJobSelector); 

      var jobWishlistSelector = this.props.jobWishlistSelector;
      jobWishlistSelector.candidate_id = this.props.userDetails.candidate_id;
      mapAction.getJobWishlist(jobWishlistSelector);
  	}
	
	render(){
		return(
				
				<div className="ViewBodyWrapper">
			        <div className="col-lg-3" style={{"marginTop": "30px"}}>
			          <div className="col-lg-12">
			            <div className='row'>
			              <JobWishlistFilters />
			            </div>
			          </div>
			        </div>

			        <div className="col-lg-9">
			          <div className="row">
			            <div id="mapwise">
			              <JobWishlist />
			            </div>
			          </div>  
			        </div>
			      </div>
			);
	}
}
const mapStateToProps = (state)=>{
    return {
      userDetails       : state.userDetails,          selector      : state.selector, 
      appliedJobSelector: state.appliedJobSelector,   jobWishlistSelector : state.jobWishlistSelector,
      appliedJoblist    : state.appliedJoblist,       jobWishlist   : state.jobWishlist
    }
}
const mapDispatchToProps = (dispatch) => ({
  mapAction :  bindActionCreators(mapActionCreator, dispatch)
}) 
export default connect(mapStateToProps, mapDispatchToProps) (CandidateJobWishlist);
