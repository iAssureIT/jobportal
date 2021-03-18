import React, {Component} 		from 'react';
import CandidateFilters			from '../../blocks/CandidateFilters/CandidateFilters.js';
import CandidatesList			from '../../blocks/Candidatelist/Candidatelist.js';
import { connect }            	from 'react-redux';
import { bindActionCreators } 	from 'redux';
import  * as mapActionCreator 	from '../../Common/actions/index.js';



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
	render(){
		return(
				<div className="ViewBodyWrapper">
                    <div className="col-lg-3" >
                      <div className='row'>
                          <CandidateFilters /> 
                      </div>
                    </div>

                    <div className="col-lg-9">
                      <div className="row">
                        <div id="mapwise">
                          <CandidatesList />
                        </div>
                      </div>  
                    </div>
                     
                </div>
					
			);	
	} 
}

const mapStateToProps = (state)=>{
                                    return {	candidateSelector    : state.candidateSelector }
                                  }

const mapDispatchToProps = (dispatch) => ({
                                            mapAction :  bindActionCreators(mapActionCreator, dispatch)
                                          }) 

export default connect(mapStateToProps, mapDispatchToProps)(CandidatesListPage)
