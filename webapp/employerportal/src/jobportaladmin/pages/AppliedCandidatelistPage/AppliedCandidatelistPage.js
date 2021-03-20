import React, {Component} 	from 'react';
import AppliedCandidatelist	from '../../blocks/AppliedCandidatelist/AppliedCandidatelist.js';
import { connect }            	from 'react-redux';
import { bindActionCreators } 	from 'redux';
import  * as mapActionCreator 	from '../../common/actions/index';
import Loader                   from '../../common/Loader/Loader.js';

class AppliedCandidatelistPage extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
					<div className="container-fluid">
						<div className="row">
							 { this.props.showLoader ? <Loader type = "candidateJoblistLoader" /> : <AppliedCandidatelist job_id={this.props.match.params.job_id } /> }
							
						</div>
					</div>
			);	
	}
}
const mapStateToProps = (state)=>{
                                    return {	selector    : state.selector, showLoader : state.showLoader }
                                  }

const mapDispatchToProps = (dispatch) => ({
                                            mapAction :  bindActionCreators(mapActionCreator, dispatch)
                                          }) 

export default connect(mapStateToProps, mapDispatchToProps)(AppliedCandidatelistPage)
