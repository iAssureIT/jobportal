import React, {Component} 		from 'react';
import CandidateFilters			from '../../blocks/CandidateFilters/CandidateFilters.js';
import CandidatesList			from '../../blocks/Candidatelist/Candidatelist.js';
import { connect }            	from 'react-redux';
import { bindActionCreators } 	from 'redux';
import  * as mapActionCreator 	from '../../Common/actions/index.js';
import Loader                 from '../../Common/Loader/Loader.js';



class CandidatesListPage extends Component{
	constructor(props){
		super(props);
		this.state={
			candidateSelector             : {},
		}
	}
	componentDidMount(){ 
 
      var candidateSelector=this.state.candidateSelector;
      candidateSelector.countryCode = "IN";
      this.setState({ candidateSelector: candidateSelector })

      var {mapAction} = this.props;
      mapAction.filterCandidates(candidateSelector);

  	}
    redirectTo(event){
      this.props.history.push("/candidate/basic-info")
    }
	render(){
		return(
				<div className="ViewBodyWrapper">
          <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
            <h4 className="weighttitle col-lg-5 col-md-11 col-xs-11 col-sm-11">Candidate List</h4>
            <div className="col-lg-5 col-md-12 col-sm-12 col-xs-12 pull-right">
              <span className="col-lg-6 col-lg-offset-6 sentanceCase addButtonList" onClick={this.redirectTo.bind(this)}><i  className="fa fa-plus-circle"></i>&nbsp;&nbsp;{"Add Candidate"} 
              </span>
            </div>
          </div> 
          <div className="col-lg-3" >
            <div className='row'>
                <CandidateFilters /> 
            </div>
          </div>

          <div className="col-lg-9">
            <div className="row">
              <div id="mapwise">
                { this.props.showLoader ? <Loader type="candidatelistLoader"  /> : <CandidatesList /> }
              </div>
            </div>  
          </div>
                     
        </div>
					
			);	
	} 
}

const mapStateToProps = (state)=>{
                                    return {	
                                              candidateSelector    : state.candidateSelector,
                                              showLoader           : state.showLoader 
                                            }
                                  }

const mapDispatchToProps = (dispatch) => ({
                                            mapAction :  bindActionCreators(mapActionCreator, dispatch)
                                          }) 

export default connect(mapStateToProps, mapDispatchToProps)(CandidatesListPage)
