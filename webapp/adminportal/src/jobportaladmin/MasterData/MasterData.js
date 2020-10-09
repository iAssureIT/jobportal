import React, {Component} from 'react';
import {render}           from 'react-dom';
import $                  from "jquery";
import axios              from 'axios';

import Industry        from  '../Master/Industry/Industry.js';
import FunctionalArea        from  '../Master/FunctionalArea/FunctionalArea.js';
import JobCategory        from  '../Master/JobCategory/JobCategory.js';


import '../../coreadmin/companysetting/css/CompanySetting.css';

 class MasterData extends Component{
    constructor(props) {
		super(props)

		this.state = {
			companyinformation				: "Company Information",
      // profileCreated            : false,
      editType                  : "",
      editId                    : "",
      oneFieldEditId            : ""
		}
	
	}
  componentDidMount() {
    if(this.props.match){
      if(this.props.match.params.editId && this.props.match.params.editId !== 'undefined'){
        this.setState({editId : this.props.match.params.editId},
                      ()=>{
                        console.log("project componentDidMount editId = ",this.state.editId);
                      });
      }

      if(this.props.match.params.oneFieldEditId && typeof this.props.match.params.oneFieldEditId !== 'undefined'){
        this.setState({oneFieldEditId : this.props.match.params.oneFieldEditId},
                      ()=>{
                        console.log("project componentDidMount oneFieldEditId = ",this.state.oneFieldEditId);
                      });

      }
    }
  }
 
  componentDidUpdate(prevProps) {
    if(this.props.match.params.editId !== this.state.editId){
      this.setState({editId : this.props.match.params.editId},
                    ()=>{
                      //console.log("global componentDidUpdate editId = ",this.state.editId);
                    });
    }
    if(this.props.match.params.oneFieldEditId !== this.state.oneFieldEditId){
      this.setState({oneFieldEditId : this.props.match.params.oneFieldEditId},
                    ()=>{
                      // console.log("project componentDidUpdate oneFieldEditId = ",this.state.oneFieldEditId);
                    });
    }
  }

  tab(event){
     $("html,body").scrollTop(0);
    this.props.history.push('/project-master-data')
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="formWrapper">
            <section className="content">
              <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 pageContent ">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 titleaddcontact NOpadding">
                    <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right ">
                        <h4 className="weighttitle col-lg-11 col-md-11 col-xs-11 col-sm-11 NOpadding-right">Master Data</h4>
                    </div>
                  </div>     
                  <div className="boxMinHeight boxMinHeighttab addMarginTop">
                      <div className="col-lg-3 col-md-3 col-xs-12 col-sm-12 noPadding"> 
                          <ul className="nav nav-tabs tabs-left sideways">
                            <li className="active col-lg-12 col-md-12 col-xs-12 col-sm-12">
                            <a className="tabLeft lettersp tablefthr" href="#Industry" data-toggle="tab"  onClick={this.tab.bind(this)}>Industry</a>
                            </li>
                            <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                            <a className="tabLeft lettersp tablefthr" href="#FunctionalArea" data-toggle="tab"  onClick={this.tab.bind(this)}>Functional Area</a>
                            </li>
                            <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                            <a className="tabLeft lettersp tablefthr" href="#JobCategory" data-toggle="tab"  onClick={this.tab.bind(this)}>Job Category</a>
                            </li>
                          </ul>   
                      </div>
                      <div className="tab-content col-lg-9 col-md-9 col-xs-12 col-sm-12">   
                        <div className="tab-pane active" id="Industry"><Industry  editId={this.state.editId} history={this.props.history}/>  </div>
                        <div className="tab-pane" id="FunctionalArea"><FunctionalArea  editId={this.state.editId} history={this.props.history}/>  </div>
                        <div className="tab-pane" id="JobCategory"><JobCategory  editId={this.state.editId} history={this.props.history}/>  </div>
                        
                      </div> 
                    </div>
                  </div>
                </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}
export default MasterData;