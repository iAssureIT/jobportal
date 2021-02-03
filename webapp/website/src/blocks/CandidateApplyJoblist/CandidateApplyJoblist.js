import React, { Component } from 'react';

import AppliedJoblist      from '../AppliedJoblist/AppliedJoblist.js';
import LeftSideFilters     from '../LeftSideFilters/LeftSideFilters.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect }        from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../common/actions/index';
import './SubFunctionalpage.css';

class CandidateApplyJoblist extends Component {

  constructor(props){
    super(props);
    this.state={
      
    }
  }
  
  componentDidMount(){
      var {mapAction} = this.props;
      mapAction.getAppliedJoblist(this.props.userDetails.candidate_id);
  }


  render() {
    return ( 
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
              <AppliedJoblist appliedJoblist={this.props.appliedJoblist}/>
            </div>
          </div>  
        </div>
    </div>
    );
  }
}
const mapStateToProps = (state)=>{
    return {
      userDetails       : state.userDetails,      selector      : state.selector,   
      appliedJoblist    : state.appliedJoblist,   jobWishlist   : state.jobWishlist
    }
}
const mapDispatchToProps = (dispatch) => ({
  mapAction :  bindActionCreators(mapActionCreator, dispatch)
}) 
export default connect(mapStateToProps, mapDispatchToProps) (CandidateApplyJoblist);