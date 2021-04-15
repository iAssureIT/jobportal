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
        var tempArray = [];
        tempArray.push({"subfunctionalArea" : subfunctionalArea, "id": _id })
        selector.subfunctionalArea_id = tempArray;  

        selector.startLimit            = 0;
        selector.initialLimit          = 25;
        selector.showMoreLimit         = 25;
          
        mapAction.jobCount(selector); 
        mapAction.filterJobList(this.props.selector);
        mapAction.setViewMode("listView");
        /*if(this.props.match.path=="/country/:countryCode/state/:stateCode/city/:district/function/:functionalArea/:functionalArea_id"){
            this.props.history.push("/country/"+this.props.match.params.countryCode+"/state/"+this.props.match.params.stateCode+"/city/"+this.props.match.params.district+"/function/"+this.props.match.params.functionalArea+"/"+this.props.match.params.functionalArea_id +"/subfunction/"+subfunctionalArea+"/"+_id );
        }
        if(this.props.match.path=="/state/:stateCode/functional/:functionalArea/:functionalArea_id"){
            this.props.history.push("/state/"+this.props.match.params.stateCode+"/subfunctional/"+this.props.match.params.functionalArea+"/"+this.props.match.params.functionalArea_id +"/"+subfunctionalArea+"/"+_id );
        }
        if(this.props.match.path=="/state/:stateCode/:district/functional/:functionalArea/:functionalArea_id"){
            this.props.history.push("/state/"+this.props.match.params.stateCode+"/"+this.props.match.params.district+"/subfunctional/"+this.props.match.params.functionalArea+"/"+this.props.match.params.functionalArea_id +"/"+subfunctionalArea+"/"+_id );
        }*/
        this.props.history.push("/country/"+this.props.match.params.countryCode+"/state/"+this.props.match.params.stateCode+"/city/"+this.props.match.params.district+"/industry/"+this.props.match.params.industryName+"/"+this.props.match.params.industry_id+"/function/"+this.props.match.params.functionalArea+"/"+this.props.match.params.functionalArea_id +"/subfunction/"+subfunctionalArea+"/"+_id);
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