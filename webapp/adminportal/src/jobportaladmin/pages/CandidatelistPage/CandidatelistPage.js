import React, {Component} 		from 'react';
import CandidateFilters			from '../../blocks/CandidateFilters/CandidateFilters.js';
import CandidatesList			from '../../blocks/Candidatelist/Candidatelist.js';
import { connect }            	from 'react-redux';
import { bindActionCreators } 	from 'redux';
import  * as mapActionCreator 	from '../../common/actions/index';


class CandidatesListPage extends Component{
	constructor(props){
		super(props);
		this.state={
			selector             : {},
		}
	}
	componentDidMount(){
 
      var selector=this.state.selector;
      selector.countryCode = "IN";
      this.setState({ selector: selector })

      var {mapAction} = this.props;
      mapAction.filterCandidates(selector);

  	}
	render(){
		return(
				<div className="ViewBodyWrapper">
                    <div className="col-lg-3" style={{"marginTop": "30px"}}>
                      <div className="col-lg-12">
                        <div className='row'>
                          <CandidateFilters /> 
                        </div>
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
                                    return {	selector    : state.selector }
                                  }

const mapDispatchToProps = (dispatch) => ({
                                            mapAction :  bindActionCreators(mapActionCreator, dispatch)
                                          }) 

export default connect(mapStateToProps, mapDispatchToProps)(CandidatesListPage)
