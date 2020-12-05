import React, {Component} 	from 'react';
import "../listCss/Joblist.css";
import LeftSideFilters		from '../../blocks/LeftSideFilters/LeftSideFilters.js';
import Joblist				from '../../blocks/Joblist/Joblist.js';
import { connect }        from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../common/actions/index';

class JoblistPage extends Component{
	constructor(props){
		super(props);
		this.state={
	      leftDrawerDisplay    : "-350px",
	      arrowToggle          : false ,
        jobList              : [],
        selector             : {}, 
	    }
	}
  componentDidMount(){

    var selector=this.state.selector;
      selector.countryCode = "IN"; 

      this.setState({ selector: selector })

      var {mapAction} = this.props;
      mapAction.filterJobList(selector);

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
  		<div className="ViewBodyWrapper container-fluid">
          <div className="col-lg-3" style={{"margin-top": "32px"}}>
            <div className='row'>
                <div className="col-lg-8">
                  <div className='row'>
                    <LeftSideFilters />
                  </div>
                </div>
            </div>
          </div>

          <div className="col-lg-9">
            <div className="row">
              <div id="mapwise">
                <Joblist jobList={this.props.jobList}/>
              </div>
            </div>  
          </div>
           
      </div>
	);
	}
}
const mapStateToProps = (state)=>{
    return {
        user_ID     : state.user_ID,  candidateID   : state.candidateID,
        selector        : state.selector,   jobList     : state.jobList,
    }
}
const mapDispachToProps = (dispatch) => ({
  mapAction :  bindActionCreators(mapActionCreator, dispatch)
}) 
export default connect(mapStateToProps, mapDispachToProps)(JoblistPage)


