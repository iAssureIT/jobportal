import React,{Component}    from 'react';
import Axios        		from 'axios';
import Swal  				from  'sweetalert2';
import JobList    	 		from '../../blocks/jobList/JobList.js';
import LeftSideFilters      from '../../blocks/LeftSideFilters/LeftSideFilters.js';
import { connect }        from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../common/actions/index';

class CandidateJobList extends Component{
	constructor(props){
		super(props);
		this.state={
			jobList  		: [],
			selector 		: {},
		}
	}

	componentDidMount(){

		var selector=this.state.selector;
	    selector.countryCode = "IN"; 

	    this.setState({ selector: selector })

	    var {mapAction} = this.props;
	    mapAction.filterJobList(selector);

	    mapAction.getJobWishlist(this.props.candidateID);
	}

	render(){
		return(
			<div className="ViewBodyWrapper container-fluid">
        
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
								<JobList jobList={this.props.jobList} jobWishlist={this.props.jobWishlist}/>
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
    	user_ID 		: state.user_ID, 	candidateID 	: state.candidateID,
        selector        : state.selector, 	jobList 		: state.jobList,
        jobWishlist 	: state.jobWishlist
    }
}
const mapDispatchToProps = (dispatch) => ({
  mapAction :  bindActionCreators(mapActionCreator, dispatch)
}) 

export default connect(mapStateToProps, mapDispatchToProps) (CandidateJobList);