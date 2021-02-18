import React, {Component} from 'react';
import { withRouter }       from 'react-router-dom';
import { connect }          from 'react-redux';
import { bindActionCreators } from 'redux'; 
import  * as mapActionCreator from '../../common/actions/index';

import './SubFunctionalAreawiseJobs.css';

class SubFunctionalAreawiseJobs extends Component{

    constructor(props){
        super(props);
        
    }
    onSubFunctionalAreaClick = (subfunctionalArea, _id)=>{
        var {mapAction} = this.props;
        var selector = this.props.selector;
        selector.subfunctionalArea = subfunctionalArea; 

        mapAction.jobCount(selector);
        mapAction.filterJobList(this.props.selector);

        this.props.history.push("/state/"+this.props.match.params.stateCode+"/"+this.props.match.params.district+"/"+this.props.match.params.functionalArea+"/"+subfunctionalArea);
    } 
    render(){
    return(
        <section className="col-lg-12 AllJobsWrapper">
            <div className="row">
                {
                    this.props.subfunctionalJobs
                    ?
                        this.props.subfunctionalJobs.map((elem,index)=>{
                            return(
                                <div className="col-lg-3 FunctionalJobsRow">
                                    <div className="col-lg-12 FunctionalJobsBlock"  onClick={e => this.onSubFunctionalAreaClick(elem.subfunctionalarea[0].subfunctionalArea,elem.subfunctionalarea[0]._id)}>
                                        <div className="FunctionalJobsBlockImg">
                                          <img src="/images/7.png" alt="FunctionJobsImg" className="FunctionalJobsPng"/>
                                        </div>

                                        <div className="FunctionalJobsBlockName">
                                            {elem.subfunctionalarea[0].subfunctionalArea}
                                        </div>

                                        <div className="FunctionalJobsBlockNumber">
                                            {elem.count} 
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    :
                    null
                }
            </div>                        
        </section>    
    );
    }
}
const mapStateToProps = (state)=>{

    return {
        selector             : state.selector,
        subfunctionalJobs    : state.subfunctionalJobs,
    }
}
const mapDispatchToProps = (dispatch) => ({
  mapAction :  bindActionCreators(mapActionCreator, dispatch)
}) 
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SubFunctionalAreawiseJobs));