
import React, {Component} from 'react';
import {render}           from 'react-dom';
import $                  from "jquery";
import axios              from 'axios';

import ExpenseTypeMaster        from  '../ExpenseTypeMaster/ExpenseType.js';
import ExpenseItemMaster        from  '../ExpenseItemMaster/ExpenseItemMaster.js';
import AutomatedSequenceMaster  from  '../AutomatedSequenceMaster/AutomatedSequenceMaster.js';

import '../../coreadmin/companysetting/css/CompanySetting.css';

 class BillingMasters extends Component{
    constructor(props) {
		super(props)

		this.state = {
      editId : "",
		}	
	}
  /*======= componentDidMount() =======*/
  componentDidMount() {
    if(this.props.match){
      if(this.props.match.params.editId && this.props.match.params.editId !== 'undefined'){
        this.setState({
          editId : this.props.match.params.editId
        },()=>{
          console.log("project componentDidMount editId = ",this.state.editId);
        });
      }
    }
  }
  /*======= componentDidUpdate() =======*/
  componentDidUpdate(prevProps) {
    if(this.props.match.params.editId !== this.state.editId){
      this.setState({
        editId : this.props.match.params.editId
      },()=>{
        console.log("global componentDidUpdate editId = ",this.state.editId);
      });
    }
  }
  /*======= tab() =======*/
  tab(event){
     $("html,body").scrollTop(0);
    this.props.history.push('/billing-masters')
  }
  /*======= render() =======*/
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
                        <h4 className="weighttitle col-lg-11 col-md-11 col-xs-11 col-sm-11 NOpadding-right">Billing Masters</h4>
                    </div>
                  </div>     
                  <div className="boxMinHeight boxMinHeighttab addMarginTop">
                      <div className="col-lg-3 col-md-3 col-xs-12 col-sm-12 noPadding"> 
                          <ul className="nav nav-tabs tabs-left sideways">                                      
                            <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12 active"><a className="tabLeft lettersp tablefthr" href="#ExpenseType" data-toggle="tab"  onClick={this.tab.bind(this)}> Expense Types              </a></li>
                            <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12"><a className="tabLeft lettersp tablefthr" href="#ExpenseItem" data-toggle="tab"         onClick={this.tab.bind(this)}> Expense Items              </a></li>             
                            <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12"><a className="tabLeft lettersp tablefthr" href="#AutomatedSequence" data-toggle="tab"   onClick={this.tab.bind(this)}> Automated Billing Sequence </a></li>             
                          </ul>   
                      </div>
                      <div className="tab-content col-lg-9 col-md-9 col-xs-12 col-sm-12">
                        <div className="tab-pane active" id="ExpenseType"> <ExpenseTypeMaster       editId={this.state.editId} history={this.props.history} /></div>
                        <div className="tab-pane" id="ExpenseItem">        <ExpenseItemMaster       editId={this.state.editId} history={this.props.history} /></div>
                        <div className="tab-pane" id="AutomatedSequence">  <AutomatedSequenceMaster editId={this.state.editId} history={this.props.history} /></div>
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
export default BillingMasters;