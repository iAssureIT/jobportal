import React, {Component}   from 'react';
import Axios                from 'axios';
import Swal                 from 'sweetalert2';
import { withRouter }       from 'react-router-dom';
import { connect }          from 'react-redux';
import { bindActionCreators } from 'redux'; 
import  * as mapActionCreator from '../../common/actions/index';
import '../SubFunctionalAreawiseJobs/SubFunctionalAreawiseJobs.css';

class FunctionalAreawiseJobs extends Component{

    onFunctionalAreaClick = (functionalArea, _id)=>{
        var {mapAction} = this.props;
        var selector = this.props.selector;
        var tempArray = [];
        tempArray.push({"functionalArea" : functionalArea, "id": _id })
        selector.functionalArea_id = tempArray; 

        mapAction.jobCount(selector);
        mapAction.filterSubfunctionalData(this.props.selector);
        
        if(this.props.match.path=="/"){
            this.props.history.push("/country/IN/state/all/city/all/industry/all/0/function/"+functionalArea+"/"+_id+"/subfunction/all/0");
        }
        else{
            this.props.history.push("/country/"+this.props.match.params.countryCode+"/state/"+this.props.match.params.stateCode+"/city/"+this.props.match.params.district+"/industry/"+this.props.match.params.industryName+"/"+this.props.match.params.industry_id+"/function/"+functionalArea+"/"+_id+"/subfunction/all/0");
        }
    }    
    render(){
        
    return(
            
                <section className="col-lg-12 AllJobsWrapper">
                    <div className="row">
                        {
                            this.props.functionalJobs.length > 0
                            ?
                                this.props.functionalJobs.map((elem,index)=>{
                                    return(
                                        <div className="col-lg-3 FunctionalJobsRow">
                                            <div className="col-lg-12 FunctionalJobsBlock" onClick={e => this.onFunctionalAreaClick(elem.functionalarea[0].functionalArea,elem.functionalarea[0]._id)}>
                                                <div className="FunctionalJobsBlockImg">
                                                  <img src={elem.functionalarea[0] ? elem.functionalarea[0].iconUrl ? elem.functionalarea[0].iconUrl : "/images/7.png" : "/images/7.png"} alt="FunctionJobsImg" className="FunctionalJobsPng"/>
                                                </div> 

                                                <div className="FunctionalJobsBlockName">
                                                    {elem.functionalarea[0] ? elem.functionalarea[0].functionalArea : ""}
                                                </div>

                                                <div className="FunctionalJobsBlockNumber">
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
        functionalJobs    : state.functionalJobs,
    }
}
const mapDispatchToProps = (dispatch) => ({
  mapAction :  bindActionCreators(mapActionCreator, dispatch)
}) 
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FunctionalAreawiseJobs));