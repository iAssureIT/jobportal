import React, {Component} from 'react';
import { withRouter }       from 'react-router-dom';
import { connect }          from 'react-redux';
import { bindActionCreators } from 'redux'; 
import  * as mapActionCreator from '../../common/actions/index';

import './IndustrywiseJobs.css';

class IndustrywiseJobs extends Component{

    onIndustryClick = (industry, _id)=>{
        var {mapAction} = this.props;
        var selector = this.props.selector;
        var tempArray = [];
        tempArray.push({"industry" : industry, "id": _id })
        selector.industry_id_id = tempArray; 

        mapAction.jobCount(selector);
        mapAction.filterJobList(this.props.selector);
        if(this.props.match.path=="/"){
            this.props.history.push("/country/IN/state/all/city/all/industry/"+industry+"/"+_id+"/function/all/0/subfunction/all/0");
        }
        else{
            this.props.history.push("/country/"+this.props.match.params.countryCode+"/state/"+this.props.match.params.stateCode+"/city/"+this.props.match.params.district+"/industry/"+industry+"/"+_id+"/function/"+this.props.match.params.functionalArea+"/"+this.props.match.params.functionalArea_id+"/subfunction/all/0");
        }
    } 
    
  
    render(){
    
    //console.log(this.props.industrialJobs)

    return(
                <section className="col-lg-12 AllJobsWrapper">
                    <div className="row"> 
                        {
                            this.props.industrialJobs.length > 0
                            ?
                                this.props.industrialJobs.map((elem,index)=>{
                                    return(
                                        <div className="col-lg-3 AllJobsRow" onClick={e => this.onIndustryClick(elem.industry[0].industry,elem.industry[0]._id)}>
                                            <div className="col-lg-12 AllJobsBlock">
                                                <div className="AllJobsBlockImg">
                                                  <img src="/images/7.png" alt="FunctionJobsImg" className="FunctionalJobsPng"/>
                                                </div>

                                                <div className="AllJobsBlockName">
                                                    {elem.industry[0] ? elem.industry[0].industry : ""}
                                                </div>

                                                <div className="AllJobsBlockNumber">
                                                    {elem.count}
                                                </div>
                                            </div>   
                                        </div>
                                    );
                                })
                            :
                            <h2>No data available</h2>
                        }
                    </div>                  
                </section>
            
        );
  }
}
const mapStateToProps = (state)=>{

    return {
        selector          : state.selector,  
        industrialJobs    : state.industrialJobs,
    }
}
const mapDispatchToProps = (dispatch) => ({
  mapAction :  bindActionCreators(mapActionCreator, dispatch)
}) 
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(IndustrywiseJobs));