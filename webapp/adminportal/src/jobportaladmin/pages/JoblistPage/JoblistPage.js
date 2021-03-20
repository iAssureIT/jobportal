import React, { Component }   from 'react';
import jQuery 				  from 'jquery';
import { connect }        	  from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../Common/actions/index';

import Joblist 	  	  		  from '../../blocks/Joblist/Joblist.js';
import List 		  		  from '../../blocks/List/List.jsx';
import Loader                 from '../../Common/Loader/Loader.js';

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
		//selector.company_id = this.props.company_id 
		this.setState({ selector: selector })

		var {mapAction} = this.props;
		mapAction.filterJobList(selector);

		mapAction.applicantsCountList();
	}
						
	redirectTo(event){
    	this.props.history.push("/post-job")
    }					
	render(){
				return( 
						<div>
				        	{/*<List />*/}
				        	<div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
									<h4 className="weighttitle col-lg-5 col-md-11 col-xs-11 col-sm-11">Job List</h4>
									<div className="col-lg-5 col-md-12 col-sm-12 col-xs-12 pull-right">
										<span className="col-lg-6 col-lg-offset-6 sentanceCase addButtonList" onClick={this.redirectTo.bind(this)}><i  className="fa fa-plus-circle"></i>&nbsp;&nbsp;{"Add Job"} 
										</span>
									</div>
								</div>
				            { this.props.showLoader ? <Loader type = "JoblistLoader" />	: <Joblist jobList={this.props.jobList} /> }
				        </div>	
					);
			}
	}

	const mapStateToProps = (state)	=>	{
										    return {
												    	

												    	user_id     : state.userDetails.user_id, 
                                              			selector    : state.selector,
                                              			showLoader 	: state.showLoader 
										    		}
										}
	
	const mapDispatchToProps = (dispatch) 	=> 	({
													mapAction :  bindActionCreators(mapActionCreator, dispatch)
												})

export default connect(mapStateToProps, mapDispatchToProps) (JoblistPage);