import React, { Component } from 'react';
import { render }           from 'react-dom';
import $                    from 'jquery';
import jQuery               from 'jquery';
import axios                from 'axios';
import swal                 from 'sweetalert';
import IAssureTable         from  '../../coreadmin/IAssureTable/IAssureTable.jsx';

import './ExpenseTypeMaster.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/modal.js';

class ExpenseTypeMaster extends Component{
   constructor(props) {
    super(props);
    this.state = {
      id            : '',
      type          : '',
      GSTRate       : '',
      CGSTRate      : '',
      SGSTRate      : '',
      IGSTRate      : '',
      submitVal     : true,
      startRange    : 0,
      limitRange    : 10,
      expenseData   : [],
      tableHeading  : {
                        type          : "Expense Type",
                        GSTRate       : "GST Rate",
                        CGSTRate      : "CGST Rate",
                        SGSTRate      : "SGST Rate",
                        IGSTRate      : "IGST Rate",
                        actions       : "Action"
                      },
      tableObjects      : {
        deleteMethod    : 'delete',
        apiLink         : '/api/expensetypemaster/',
        paginationApply : false,
        searchApply     : false,
        editUrl         : '/billing-masters'
      },
    };
    this.handleChange = this.handleChange.bind(this);
  }
  /*======= componentWillReceiveProps() =======*/
  componentWillReceiveProps(nextProps){
    if (nextProps.editId !== this.props.editId) {
      this.setState({
          id : nextProps.editId
      },()=>{
          if(this.state.id){
            axios.get("/api/expensetypemaster/getSingleData/"+this.state.id)
                .then((response)=>{
                  this.setState({
                    id           : response.data[0]._id,
                    type         : response.data[0].type,
                    GSTRate      : response.data[0].GSTRate,
                    CGSTRate     : response.data[0].CGSTRate,
                    SGSTRate     : response.data[0].SGSTRate,
                    IGSTRate     : response.data[0].IGSTRate,
                    submitVal    : false,
                  },()=>{});
                })
                .catch((error)=>{
                  console.log("Error Get Single Expense Type Data = ",error);
                })
          }
      })
    }
  }
  /*======= componentDidMount() =======*/
  componentDidMount(props) {
    this.getExpenseTypeTable(this.state.startRange,this.state.limitRange);
    
    $.validator.addMethod("regxtax", function (value, element, regexpr) {
      return regexpr.test(value);
    }, "Please enter valid tax rate.");

    jQuery.validator.setDefaults({
      debug: true,
      success: "valid"
    });

    $("#ExpenseTypeMasterForm").validate({
      rules : {
        type : {
          required: true,
        },
        GSTRate : {
          required  : true,
          regxtax   : /^[0-9]\d*(\.\d+)?$/
        },
        CGSTRate : {
          required  : true,
          regxtax   : /^[0-9]\d*(\.\d+)?$/
        },
        SGSTRate : {
          required  : true,
          regxtax   : /^[0-9]\d*(\.\d+)?$/
        },
        IGSTRate : {
          required  : true,
          regxtax   : /^[0-9]\d*(\.\d+)?$/
        },
      },
      errorPlacement: function (error, element) {
        if (element.attr("name") === "type") {
            error.insertAfter("#type");
        }
        if (element.attr("name") === "GSTRate") {
            error.insertAfter("#GSTRate");
        }
        if (element.attr("name") === "CGSTRate") {
            error.insertAfter("#CGSTRate");
        }
        if (element.attr("name") === "SGSTRate") {
            error.insertAfter("#SGSTRate");
        }
        if (element.attr("name") === "IGSTRate") {
            error.insertAfter("#IGSTRate");
        }
      } 
    }); 
  }
  /*======= getExpenseTypeTable() =======*/
  getExpenseTypeTable(startRange,limitRange){
    var data = {
            startRange: startRange,
            limitRange: limitRange
    }
    axios.post(this.state.tableObjects.apiLink+'get/list', data)
         .then((response) => {
            if (response.data) {
              var tableData = response.data.map((a, i)=>{
                return {
                  _id          : a._id,
                  type         : a.type ? a.type : " - ",
                  GSTRate      : a.GSTRate ? a.GSTRate + "%" : " 0% " ,
                  CGSTRate     : a.CGSTRate ? a.CGSTRate + "%" : " 0% " ,
                  SGSTRate     : a.SGSTRate ? a.SGSTRate + "%" : " 0% " ,
                  IGSTRate     : a.IGSTRate ? a.IGSTRate + "%" : " 0% " ,
                }
              })
              this.setState({
                expenseTableData : tableData
              })              
            }
         })
         .catch((error) => {   
            console.log("Error getExpenseTypeTable() = ",error);       
         });
  }
  /*======= submitData() =======*/
  submitData(event){
    event.preventDefault();
    
    var formValues = {
      type            : this.state.type,
      GSTRate         : this.state.GSTRate,
      CGSTRate        : this.state.CGSTRate,
      SGSTRate        : this.state.SGSTRate,
      IGSTRate        : this.state.IGSTRate,
    }

    var updateFormValues = {
      id           : this.state.id,
      type         : this.state.type,
      GSTRate      : this.state.GSTRate,
      CGSTRate     : this.state.CGSTRate,
      SGSTRate     : this.state.SGSTRate,
      IGSTRate     : this.state.IGSTRate,
    }

    console.log('formValues = ',formValues);
    if($("#ExpenseTypeMasterForm").valid()){
      if (this.state.submitVal) {
        axios.patch('/api/expensetypemaster/insertExpenseType',formValues)
             .then((response)=> {          
              if(response.data.duplicated == true){
                swal("", "Expense Type Already Exist");
              }else{
                this.getExpenseTypeTable(this.state.startRange,this.state.limitRange);
                swal({
                  title   : "",
                  text    : "Expense Type Details Added Successfully!",
                });
                this.setState({
                  type       : '',
                  GSTRate    : '',
                  CGSTRate   : '',
                  SGSTRate   : '',
                  IGSTRate   : '',
                  submitVal  : true
                })
              }   
             })
             .catch(function (error) {
              swal({
                title: " ",
                text : "Failed to Add Expense Type Details!",
              });
             })
      }else{
        axios.patch('/api/expensetypemaster/updateExpenseType',updateFormValues)
             .then((response)=>{
              console.log("response.data.updated == ", response.data.updated);
              if(response.data.updated){
                this.props.history.push("/billing-masters");
                swal({
                  title : " ",
                  text  : "Expense Type details updated successfully!",
                });      
                this.setState({
                    id         : '',
                    type       : '',
                    GSTRate    : '',
                    CGSTRate   : '',
                    SGSTRate   : '',
                    IGSTRate   : '',
                    submitVal  : true,
                  },()=>{ 
                    this.getExpenseTypeTable(this.state.startRange,this.state.limitRange);  
                  }); 
              }
              this.setState({
                  id           : "",
                  type         : "",
                  GSTRate      : "",
                  CGSTRate     : "",
                  SGSTRate     : "",
                  IGSTRate     : "",
                  submitVal    : true,
                })               
             })
             .catch(function (error) {
              swal({
                title : " ",
                text  : "Failed to Update Expense Type details!",
              });
             })
      }  
    }
  }
  /*======= handleChange() =======*/
  handleChange(event){
    const {name,value} = event.target;
    this.setState({ 
      [name]:value
    });
  }
  /*======= delete() =======*/
  delete(event){
    event.preventDefault();
    console.log(event.currentTarget.getAttribute('data-id'))
    this.setState({id: event.currentTarget.getAttribute('data-id')})
    $('#deleteModal').show();
    }
    delexpence(event){
      event.preventDefault();
        console.log('id',this.state.id);
      axios.delete('/api/expensetypemaster/delete/'+this.state.id)
      .then((response)=>{
        if (response.data) {
          $('#deleteModal').hide();   
          // window.location.reload();
          this.expenseType();
          swal({
                title : " ",
                text  : "Record is deleted successfully.",
              });
        } else{
          swal({
                title : " ",
                text  : "Failed to delete.",
              });
        }
      })
      .catch((error)=>{
        swal(error)
      })
  }
  /*======= closeModal() =======*/
  closeModal(event){
    event.preventDefault();
    $('#deleteModal').hide(); 
  }
  /*======= render() =======*/
  render(){
    return(
        <div className="container-fluid">
          <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 companyDisplayForm">
            <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
              <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
                  <h4 className="weighttitle col-lg-11 col-md-11 col-xs-11 col-sm-11 NOpadding-right">Expense Type Master</h4>
              </div>
              <form id="ExpenseTypeMasterForm"  >
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pdcls">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm compinfotp">
                    <div className="form-group formht col-lg-6 col-md-6 col-sm-12 col-xs-12">
                      <div className="form-group">
                          <label className="labelform" >Expense Type</label><span className="astrick">*</span>
                          <input id="type" data-text="type" type="text" name="type" ref="type" className="form-control areaStaes" 
                            onChange = {this.handleChange.bind(this)}
                            value    = {this.state.type}  
                          />
                      </div>  
                    </div>
                    <div className="form-group formht col-lg-6 col-md-6 col-sm-12 col-xs-12">
                      <div className="form-group">
                          <label className="labelform" >GST Rate</label><span className="astrick">*</span>
                          <div className="input-group" id="GSTRate">
                            <input data-text="GSTRate" type="number" name="GSTRate" ref="GSTRate" className="form-control areaStaes" minLength="1" maxLength="4" min="0"
                              onChange  = {this.handleChange.bind(this)}
                              value     = {this.state.GSTRate}  
                              onKeyDown = {(event)=>(event.target.value > 100 ? (((event.which ? event.which : event.keyCode) !== 8) ? (event.preventDefault(), true) : false) : true)}
                            />
                            <span className="input-group-addon inputIcon">%</span>
                          </div>
                      </div>
                    </div>
                    <div className="form-group formht col-lg-4 col-md-4 col-sm-12 col-xs-12">
                      <div className="form-group">
                          <label className="labelform" >CGST Rate</label><span className="astrick">*</span>
                          <div className="input-group" id="CGSTRate">
                            <input type="number" name="CGSTRate" ref="CGSTRate" className="form-control areaStaes" minLength="1" maxLength="4" min="0"
                              value     = {this.state.CGSTRate} data-text="CGSTRate" 
                              onChange  = {this.handleChange.bind(this)} 
                              onKeyDown = {(event)=>(event.target.value > 100 ? (((event.which ? event.which : event.keyCode) !== 8) ? (event.preventDefault(), true) : false) : true)}
                            />
                            <span className="input-group-addon inputIcon">%</span>
                          </div>
                      </div>  
                    </div>
                    <div className="form-group formht col-lg-4 col-md-4 col-sm-12 col-xs-12">
                      <div className="form-group">
                          <label className="labelform" >SGST Rate</label><span className="astrick">*</span>
                          <div className="input-group" id="SGSTRate">
                            <input data-text="SGSTRate" type="number" name="SGSTRate" ref="SGSTRate" className="form-control areaStaes" minLength="1" maxLength="4" min="0"
                              onChange  = {this.handleChange.bind(this)}
                              value     = {this.state.SGSTRate} 
                              onKeyDown = {(event)=>(event.target.value > 100 ? (((event.which ? event.which : event.keyCode) !== 8) ? (event.preventDefault(), true) : false) : true)}
                            />
                            <span className="input-group-addon inputIcon">%</span>
                          </div>
                      </div>  
                    </div>
                    <div className="form-group formht col-lg-4 col-md-4 col-sm-12 col-xs-12">
                      <div className="form-group">
                          <label className="labelform" >IGST Rate</label><span className="astrick">*</span>
                          <div className="input-group" id="IGSTRate">
                            <input data-text="IGSTRate" type="number" name="IGSTRate" ref="IGSTRate" className="form-control areaStaes" minLength="1" maxLength="4" min="0"
                              onChange  = {this.handleChange.bind(this)}
                              value     = {this.state.IGSTRate} 
                              onKeyDown = {(event)=>(event.target.value > 100 ? (((event.which ? event.which : event.keyCode) !== 8) ? (event.preventDefault(), true) : false) : true)}  
                            />
                            <span className="input-group-addon inputIcon">%</span>
                          </div>
                      </div>  
                    </div>
                  </div> 
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  ">
                  <button className="col-lg-2 col-md-2 col-sm-12 col-xs-12 btn button3 pull-right" id="btnCheck" 
                    onClick={this.submitData.bind(this)} >
                    { this.state.submitVal ? "Submit" : "Update" }  
                  </button>
                </div>
              </form>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{"marginBottom": "30px"}}>
                <IAssureTable
                  tableHeading = {this.state.tableHeading}
                  tableData    = {this.state.expenseTableData}
                  tableObjects = {this.state.tableObjects}
                  getData      = {this.getExpenseTypeTable.bind(this)}
                />
              </div>
            </div>
          </div>
        </div>
      );
  }
 }

 export default ExpenseTypeMaster;