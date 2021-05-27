import React, {Component} from 'react';
import {render}           from 'react-dom';
import $                  from "jquery";
import axios              from 'axios';

import AddressType          from  '../Master/AddressType/AddressType.js';
import Industry             from  '../Master/Industry/Industry.js';
import SubIndustry          from  '../Master/SubIndustry/SubIndustry.js';
import FunctionalArea       from  '../Master/FunctionalArea/FunctionalArea.js';
import SubFunctionalArea    from  '../Master/SubFunctionalArea/SubFunctionalArea.js';
import JobCategory          from  '../Master/JobCategory/JobCategory.js';
import JobType              from  '../Master/JobType/JobType.js';
import JobTime              from  '../Master/JobTime/JobTime.js';
import JobShift             from  '../Master/JobShift/JobShift.js';
import JobSector            from  '../Master/JobSector/JobSector.js';
import JobRole              from  '../Master/JobRole/JobRole.js';

import QualificationLevel   from  '../Master/QualificationLevel/QualificationLevel.js';
import Qualification        from  '../Master/Qualification/Qualification.js';


import University           from "../Master/University/University.js"
import College              from "../Master/College/College.js"
import Language             from "../Master/Language/Language.js"
import Skill             from "../Master/Skill/Skill.js"
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
                            <a className="tabLeft lettersp tablefthr" href="#AddressType" data-toggle="tab"  onClick={this.tab.bind(this)}>Address Type</a>
                            </li>
                            <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                            <a className="tabLeft lettersp tablefthr" href="#Industry" data-toggle="tab"  onClick={this.tab.bind(this)}>Industry</a>
                            </li>
                            {/*<li className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                            <a className="tabLeft lettersp tablefthr" href="#SubIndustry" data-toggle="tab"  onClick={this.tab.bind(this)}>Sub Industry</a>
                            </li>*/}
                            
                            <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                            <a className="tabLeft lettersp tablefthr" href="#FunctionalArea" data-toggle="tab"  onClick={this.tab.bind(this)}>Functional Area</a>
                            </li>
                            <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                            <a className="tabLeft lettersp tablefthr" href="#SubFunctionalArea" data-toggle="tab"  onClick={this.tab.bind(this)}>Sub Functional Area</a>
                            </li>
                            <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                            <a className="tabLeft lettersp tablefthr" href="#JobSector" data-toggle="tab"  onClick={this.tab.bind(this)}>Job Sector</a>
                            </li>
                            {/*<li className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                            <a className="tabLeft lettersp tablefthr" href="#JobCategory" data-toggle="tab"  onClick={this.tab.bind(this)}>Job Category</a>
                            </li>*/}
                            <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                            <a className="tabLeft lettersp tablefthr" href="#JobType" data-toggle="tab"  onClick={this.tab.bind(this)}>Job Type</a>
                            </li>
                            <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                            <a className="tabLeft lettersp tablefthr" href="#JobTime" data-toggle="tab"  onClick={this.tab.bind(this)}>Job Time</a>
                            </li>
                            <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                            <a className="tabLeft lettersp tablefthr" href="#JobShift" data-toggle="tab"  onClick={this.tab.bind(this)}>Job Shift</a>
                            </li>
                            <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                            <a className="tabLeft lettersp tablefthr" href="#JobRole" data-toggle="tab"  onClick={this.tab.bind(this)}>Job Role</a>
                            </li>

                            <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                            <a className="tabLeft lettersp tablefthr" href="#QualificationLevel" data-toggle="tab"  onClick={this.tab.bind(this)}>Qualification Level</a>
                            </li>
                            <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                            <a className="tabLeft lettersp tablefthr" href="#Qualification" data-toggle="tab"  onClick={this.tab.bind(this)}>Qualification</a>
                            </li>
                            <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                            <a className="tabLeft lettersp tablefthr" href="#University" data-toggle="tab"  onClick={this.tab.bind(this)}>University</a>
                            </li>
                            <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                            <a className="tabLeft lettersp tablefthr" href="#College" data-toggle="tab"  onClick={this.tab.bind(this)}>College</a>
                            </li>
                            <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                            <a className="tabLeft lettersp tablefthr" href="#Language" data-toggle="tab"  onClick={this.tab.bind(this)}>Language</a>
                            </li>
                            <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                            <a className="tabLeft lettersp tablefthr" href="#Skill" data-toggle="tab"  onClick={this.tab.bind(this)}>Skill</a>
                            </li>
                          </ul>    
                      </div>
                      <div className="tab-content col-lg-9 col-md-9 col-xs-12 col-sm-12">  
                        <div className="tab-pane active" id="AddressType"><AddressType  editId={this.state.editId} 
                                                                                        history={this.props.history} />  </div>
                        <div className="tab-pane" id="Industry"><Industry  editId={this.state.editId}  history={this.props.history}/>  </div>
                        
                        <div className="tab-pane" id="SubIndustry"><SubIndustry  editId={this.state.editId} oneFieldEditId={this.state.oneFieldEditId} history={this.props.history}/>  </div>
                        
                        <div className="tab-pane" id="FunctionalArea"><FunctionalArea  editId={this.state.editId} oneFieldEditId={this.state.oneFieldEditId} history={this.props.history}/>  </div>
                        <div className="tab-pane" id="SubFunctionalArea"><SubFunctionalArea  editId={this.state.editId} oneFieldEditId={this.state.oneFieldEditId} history={this.props.history}/>  </div>
                        <div className="tab-pane" id="JobSector"><JobSector  editId={this.state.editId} history={this.props.history}/>  </div>
                        
                        <div className="tab-pane" id="JobCategory"><JobCategory  editId={this.state.editId} history={this.props.history}/>  </div>
                        <div className="tab-pane" id="JobType"><JobType  editId={this.state.editId} history={this.props.history}/>  </div>
                        <div className="tab-pane" id="JobTime"><JobTime  editId={this.state.editId} history={this.props.history}/>  </div>
                        <div className="tab-pane" id="JobShift"><JobShift  editId={this.state.editId} history={this.props.history}/>  </div>
                        
                        <div className="tab-pane" id="JobRole"><JobRole  editId={this.state.editId} history={this.props.history}/>  </div>
                        
                        <div className="tab-pane" id="University"><University  editId={this.state.editId} history={this.props.history}/>  </div>
                        <div className="tab-pane" id="College"><College  editId={this.state.editId} history={this.props.history}/>  </div>
                        <div className="tab-pane" id="QualificationLevel"><QualificationLevel  editId={this.state.editId} history={this.props.history}/>  </div>
                        <div className="tab-pane" id="Qualification"><Qualification  editId={this.state.editId} history={this.props.history}/>  </div>
                        
                        <div className="tab-pane" id="Language"><Language  editId={this.state.editId} history={this.props.history}/>  </div>
                        <div className="tab-pane" id="Skill"><Skill  editId={this.state.editId} history={this.props.history}/>  </div>
                        
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