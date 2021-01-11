import React, { Component }   from 'react';
import jQuery 				  from 'jquery';
import { connect }        	  from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../Common/actions/index';

import Joblist 	  	  		  from '../../blocks/Joblist/Joblist.js';
import List 		  		  from '../../blocks/List/List.jsx';

class JoblistPage extends Component{
	
	constructor(props)	{
							super(props);
							this.state={
											jobList  		: [],
											selector 		: {}
										}
						}

	componentDidMount(){
							var selector=this.state.selector;
							selector.countryCode = "IN";
							selector.company_id = this.props.company_id 
							this.setState({ selector: selector })

							var {mapAction} = this.props;
							mapAction.filterJobList(selector);

							mapAction.applicantsCountList({employerID : this.props.company_id});
						}

	render(){
				return(
						<div>
				        	<List />
				            <Joblist jobList={this.props.jobList} />
				        </div>	
					);
			}
	}

	const mapStateToProps = (state)	=>	{
										    return {
												    	/*user_ID 		: state.user_ID, selector        : state.selector, 	
												    	jobList 		: state.jobList*/

												    	 user_id     : state.userDetails.user_id,  company_id   : state.userDetails.company_id,
                                              			selector    : state.selector, 
										    		}
										}
	
	const mapDispatchToProps = (dispatch) 	=> 	({
													mapAction :  bindActionCreators(mapActionCreator, dispatch)
												})

export default connect(mapStateToProps, mapDispatchToProps) (JoblistPage);