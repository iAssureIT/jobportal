import React, {Component} from 'react';
import {render}           from 'react-dom';
import $                  from "jquery";
import axios              from 'axios';

// import VehicleCategory        from  '../VehicleCategory/VehicleCategory.js';
import VehicleCategory        from  '../Category/Category.js';
import FuleType               from  '../FuleType/FuleTypeP.js';
import PurposeOfTravel        from  '../PurposeOfTravel/PurposeOfTravelP.js';
import Department             from  '../../coreadmin/Master/Department/DepartmentMaster-ProjectMaster.js';
import Designation            from  '../../coreadmin/Master/Designation/DesignationMaster-ProjectMaster.js';
import DocumentRequiredfor    from  '../DocumentRequiredfor/DocumentListMaster.js';
import Model                  from  '../Model/Model.js';
import BrandModel             from  '../BrandModel/BrandModel.js';
import DesignationMapping     from  '../DesignationMapping/DesignationMapping.js';
import ExpenseTypeMaster      from  '../ExpenseTypeMaster/ExpenseType.js';
import ExpenseItemMaster      from  '../ExpenseItemMaster/ExpenseItemMaster.js';
import PackageType            from  '../PackageType/PackageTypeP.js';
import PackageName            from  '../PackageName/PackageName.js';
import CityClassification     from  '../../coreadmin/Master/CityClassification/CityClassification.js';
import NightTimings           from  '../NightTimings/NightTimings.js';
import EarlyMorningTimings    from  '../EarlyMorningTimings/EarlyMorningTimings.js';
import CityType               from  '../../coreadmin/Master/CityType/CityType.js';
import EmployeeVehicalMapping from  '../../coreadmin/Master/EmployeeVehicalMapping/EmployeeVehicalMapping.js';

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
                            <li className="active col-lg-12 col-md-12 col-xs-12 col-sm-12"><a className="tabLeft lettersp tablefthr" href="#CityClassification" data-toggle="tab"  onClick={this.tab.bind(this)}>      City Classification   </a></li>
                            <li className=" col-lg-12 col-md-12 col-xs-12 col-sm-12"><a className="tabLeft lettersp tablefthr" href="#VehicleCategory" data-toggle="tab"  onClick={this.tab.bind(this)}>  Vehicle Category      </a></li>
                            <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12"><a className="tabLeft lettersp tablefthr" href="#FuleType" data-toggle="tab"  onClick={this.tab.bind(this)}>                Fuel Type             </a></li>
                            <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12"><a className="tabLeft lettersp tablefthr" href="#PurposeOfTravel" data-toggle="tab"  onClick={this.tab.bind(this)}>         Purpose of Travel     </a></li>
                            {/*<li className="col-lg-12 col-md-12 col-xs-12 col-sm-12"><a className="tabLeft lettersp tablefthr" href="#Department" data-toggle="tab"  onClick={this.tab.bind(this)}>              Department            </a></li>
                            <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12"><a className="tabLeft lettersp tablefthr" href="#Designation" data-toggle="tab" onClick={this.tab.bind(this)}>             Designation           </a></li>*/}
                            <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12"><a className="tabLeft lettersp tablefthr" href="#PackageType" data-toggle="tab"  onClick={this.tab.bind(this)}>             Package Type          </a></li>
                            <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12"><a className="tabLeft lettersp tablefthr" href="#DocumentList" data-toggle="tab"  onClick={this.tab.bind(this)}>            Document List Master  </a></li>
                            <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12"><a className="tabLeft lettersp tablefthr" href="#VehicleBrand" data-toggle="tab"  onClick={this.tab.bind(this)}>            Vehicle Brand         </a></li>
                            <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12"><a className="tabLeft lettersp tablefthr" href="#VehicleModel" data-toggle="tab"  onClick={this.tab.bind(this)}>            Vehicle Model         </a></li>
                            {/*<li className="col-lg-12 col-md-12 col-xs-12 col-sm-12"><a className="tabLeft lettersp tablefthr" href="#ExpenseType" data-toggle="tab"  onClick={this.tab.bind(this)}>             Expense Types         </a></li>
                            <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12"><a className="tabLeft lettersp tablefthr" href="#ExpenseItem" data-toggle="tab"  onClick={this.tab.bind(this)}>             Expense Items         </a></li>*/}
                            <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12"><a className="tabLeft lettersp tablefthr" href="#PackageName" data-toggle="tab"  onClick={this.tab.bind(this)}>             Package Name          </a></li>
                            <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12"><a className="tabLeft lettersp tablefthr" href="#NightTimings" data-toggle="tab"  onClick={this.tab.bind(this)}>            Night Timings         </a></li>
                            <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12"><a className="tabLeft lettersp tablefthr" href="#EarlyMorningTimings" data-toggle="tab"  onClick={this.tab.bind(this)}>     Early Morning Timings </a></li>
                            <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12"><a className="tabLeft lettersp tablefthr" href="#DesignationMapping" data-toggle="tab">      Employee Vehical Mapping   </a></li>
                          </ul>   
                      </div>
                      <div className="tab-content col-lg-9 col-md-9 col-xs-12 col-sm-12">   
                        <div className="tab-pane active" id="CityClassification"><CityClassification  editId={this.state.editId}
                                                                                                     oneFieldEditId={this.state.oneFieldEditId}
                                                                                                     history={this.props.history}/>  
                                                                                                     </div>
                        <div className="tab-pane " id="VehicleCategory">        <VehicleCategory     editId={this.state.editId}/>  </div>                              
                        <div className="tab-pane" id="FuleType">                <FuleType            editId={this.state.editId}/>  </div>                              
                        <div className="tab-pane" id="PurposeOfTravel">         <PurposeOfTravel     editId={this.state.editId}/>  </div>                                
                       {/* <div className="tab-pane" id="Department">              <Department          editId={this.state.editId}/>  </div>
                        <div className="tab-pane" id="Designation">             <Designation         editId={this.state.editId}/>  </div> */}
                        <div className="tab-pane" id="PackageType">             <PackageType         editId={this.state.editId}/>  </div>        
                        <div className="tab-pane" id="DocumentList">            <DocumentRequiredfor editId={this.state.editId} 
                                                                                                     oneFieldEditId={this.state.oneFieldEditId}
                                                                                                     history={this.props.history}
                                                                                                     />  </div> 
                        <div className="tab-pane" id="VehicleModel">            <Model               editId={this.state.editId} 
                                                                                                     oneFieldEditId={this.state.oneFieldEditId}
                                                                                                     history={this.props.history}
                                                                                                     />  </div>
                       <div className="tab-pane" id="VehicleBrand">            <BrandModel               editId={this.state.editId} 
                                                                                                     oneFieldEditId={this.state.oneFieldEditId}
                                                                                                     history={this.props.history}
                                                                                                     />  </div>
                        {/*<div className="tab-pane" id="ExpenseType">             <ExpenseTypeMaster   editId={this.state.editId}
                                                                                                     history={this.props.history}
                                                                                                      />  </div>
                        <div className="tab-pane" id="ExpenseItem">             <ExpenseItemMaster   editId={this.state.editId}
                                                                                                     history={this.props.history}
                                                                                                     />  </div>*/}
                        <div className="tab-pane" id="PackageName">             <PackageName         editId={this.state.editId}
                                                                                                     history={this.props.history}
                                                                                                     />  </div>
                        <div className="tab-pane" id="NightTimings">            <NightTimings        editId={this.state.editId}
                                                                                                     history={this.props.history}
                                                                                                     />  </div>
                        <div className="tab-pane" id="EarlyMorningTimings">     <EarlyMorningTimings editId={this.state.editId}
                                                                                                     history={this.props.history}
                                                                                                     />  </div>
                        <div className="tab-pane" id="DesignationMapping">      <EmployeeVehicalMapping  editId={this.state.editId}
                                                                                                         history={this.props.history}
                                                                                                      />  </div>
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