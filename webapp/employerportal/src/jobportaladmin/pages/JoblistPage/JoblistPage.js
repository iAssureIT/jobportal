import React, {Component} 	  from 'react';
import LeftSideFilters		    from '../../blocks/LeftSideFilters/LeftSideFilters.js';
import Joblist				        from '../../blocks/Joblist/Joblist.js';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../common/actions/index';
import Loader                 from '../../common/Loader/Loader.js';


import "./Joblist.css";

class JoblistPage extends Component{ 
	constructor(props){
		super(props);
		this.state={
	      leftDrawerDisplay    : "-350px",
	      arrowToggle          : false ,
        jobList              : [],
        selector             : {}, 
        startLimit           : 0,
        initialLimit         : 25,
        showMoreLimit        : 25,
	    }
	}
  
  componentDidMount(){
 
      var selector=this.state.selector;
      selector.countryCode    = "IN";  
      selector.company_id     = this.props.company_id;
      selector.startLimit     = this.state.startLimit;
      selector.initialLimit   = this.state.initialLimit;
      selector.showMoreLimit  = this.state.showMoreLimit;
      selector.status         = "active";

      this.setState({ selector: selector })

      var {mapAction} = this.props;
      mapAction.filterJobList(selector); 
      //console.log(selector)
      mapAction.jobCount(selector); 
 
      mapAction.totalApplicantsCountList({entity_id : this.props.company_id});
      mapAction.countryApplicantsCountList({entity_id : this.props.company_id, countryCode : "IN"});
      // mapAction.stateApplicantsCountList({entity_id : this.props.company_id});
      // mapAction.districtApplicantsCountList({entity_id : this.props.company_id});
      mapAction.maleApplicantsCountList({entity_id : this.props.company_id});
      mapAction.femaleApplicantsCountList({entity_id : this.props.company_id});
      mapAction.otherApplicantsCountList({entity_id : this.props.company_id});
      mapAction.exp02ApplicantsCountList({entity_id : this.props.company_id, minExp: 0, maxExp: 2});
      

  }
	
  leftDrawerInfo(event){

    if(this.state.leftDrawerDisplay==="-350px"){
  
      this.setState({
                      leftDrawerDisplay  : "0px",
                      arrowToggle: true
                    })
    }
    else{
      this.setState({
                      leftDrawerDisplay  : "-350px",
                      arrowToggle:false
                    })
    }
  }
	
  render(){
        		return(
                		<div className="ViewBodyWrapper">
                        <div className="col-lg-3" style={{"marginTop": "30px"}}>
                          <div className="col-lg-12">
                            <div className='row'>
                              <LeftSideFilters />
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-9">
                          <div className="row">
                            <div id="mapwise"> 
                              { this.props.showLoader ? <Loader type="joblistLoader"  /> : <Joblist jobList={this.props.jobList}/> }
                              {/*{ <Loader type="jobListLoader"  /> }*/}
                            </div>
                          </div>  
                        </div>
                         
                    </div>
        	       );
	        }
}

const mapStateToProps = (state)=>{
                                    return {
                                              user_id     : state.userDetails.user_id, 
                                              company_id  : state.userDetails.company_id,
                                              selector    : state.selector,             
                                              showLoader  : state.showLoader,
                                              jobList     : state.jobList,
                                            }
                                  }

const mapDispatchToProps = (dispatch) => ({
                                            mapAction :  bindActionCreators(mapActionCreator, dispatch)
                                          }) 

export default connect(mapStateToProps, mapDispatchToProps)(JoblistPage)                             