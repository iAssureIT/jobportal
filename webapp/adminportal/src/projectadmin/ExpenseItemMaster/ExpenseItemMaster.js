import React, { Component } from 'react';
import { render }           from 'react-dom';
import $                    from 'jquery';
import jQuery               from 'jquery';
import axios                from 'axios';
import swal                 from 'sweetalert';
import IAssureTable         from  '../../coreadmin/IAssureTable/IAssureTable.jsx';
import BillingCodesTable    from  '../BillingCodesTable/BillingCodesTable.js';

import './ExpenseItemMaster.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/modal.js';

class ExpenseItemMaster extends Component{
   constructor(props) {
    super(props);
    this.state = {
      id                : '',
      expenseType       : '',
      expenseItem       : '',
      billingCode       : '',
      ExpenseTypeArray  : [],
      submitVal         : true,
      startRange        : 0,
      limitRange        : 100,
      expenseData       : [],
      tableHeading      : {
                            expenseItem   : "Expense Item",
                            expenseType   : "Expense Type",
                            HSN           : "HSN Number",
                            billingCode   : "Billing Code",
                            actions       : "Action"
                          },
      tableObjects      : {
        deleteMethod    : 'delete',
        apiLink         : '/api/expenseitemmaster/',
        paginationApply : false,
        searchApply     : false,
        editUrl         : '/billing-masters'
      },
    };
    this.handleChange = this.handleChange.bind(this);
  }
  /*======= componentDidMount() =======*/
  componentDidMount() {
    this.getExpenseItemTable(this.state.startRange,this.state.limitRange);
    this.getExpenseType();

    $.validator.addMethod("regxZ1", function (value, element, regexpr) {
      return regexpr !== value;
    }, "Please select Expense Type");

    jQuery.validator.setDefaults({
      debug: true,
      success: "valid"
    });

    $("#ExpenseItemMasterForm").validate({
      rules : {
        expenseType: {
          required: true,
          regxZ1   : "--Select Type--"
        },
        expenseItem : {
          required: true,
        },
        HSN : {
          required  : true,
        },
        billingCode : {
          required  : true,
        },
      },
      errorPlacement: function (error, element) {
        if (element.attr("name") === "expenseType") {
            error.insertAfter("#expenseType");
        }
        if (element.attr("name") === "expenseItem") {
            error.insertAfter("#expenseItem");
        }
        if (element.attr("name") === "HSN") {
            error.insertAfter("#HSN");
        }
        if (element.attr("name") === "billingCode") {
            error.insertAfter("#billingCode");
        }
      } 
    }); 
  }
  /*======= componentWillReceiveProps() =======*/
  componentWillReceiveProps(nextProps){
    this.getExpenseType();
    console.log("componentWillReceiveProps = ", this.props);
    if(nextProps.editId !== this.props.editId)
    {
      this.setState({
        id : nextProps.editId
      }, ()=>{
        this.edit();
      })                        
    }
  }
  /*======= getExpenseType() =======*/
  getExpenseType(){
    axios.get("/api/expensetypemaster/showAllData")
    .then((response)=>{
      // console.log("Expense Type = ",response.data);
      this.setState({
        ExpenseTypeArray : response.data
      })
    })
    .catch((error)=>{
      console.log("Error, getExpenseType = ", error);
    })
  }
  /*======= getExpenseItemTable() =======*/
  getExpenseItemTable(startRange,limitRange){
    var data = {
      startRange : startRange,
      limitRange : limitRange
    }
    axios.post(this.state.tableObjects.apiLink+'get/list', data)
         .then((response) => {
            if (response.data) {
            console.log("expenseItem 1= ",response.data);

              var tableData = response.data.map((a, i)=>{
                return {
                  _id          : a._id,
                  expenseType  : a.expenseType ? a.expenseType : " - ",
                  expenseItem  : a.expenseItem ? a.expenseItem : " - " ,
                  HSN          : a.HSN ? a.HSN : " - " ,
                  billingCode  : a.billingCode ? a.billingCode : " - " ,
                }
              })
              this.setState({
                expenseItemTableData : tableData
              }, ()=>{
                    // console.log("expenseItemTableData = ",this.state.expenseItemTableData);
              })              
            }
         })
         .catch((error) => { 
            console.log("Error getExpenseItemTable() => ",error);         
         });
  }
  /*======= submitData() =======*/
  submitData(event){
    event.preventDefault();
    var formValues = {
        expenseTypeId   : this.state.expenseType,
        expenseItem     : this.state.expenseItem,
        HSN             : this.state.HSN,
        billingCode     : this.state.billingCode,
    }

    var updateFormValues = {
        id              : this.state.id,
        expenseTypeId   : this.state.expenseType,
        expenseItem     : this.state.expenseItem,
        HSN             : this.state.HSN,
        billingCode     : this.state.billingCode,
    }

    console.log('formValues = ',formValues);
    if($("#ExpenseItemMasterForm").valid()){
      if (this.state.submitVal) {
        axios.post('/api/expenseitemmaster/post',formValues)
        .then((response)=> {          
          if(response.data.duplicated == true){
            swal(" ", "Expense Item Already Exist");
          }else{
            this.getExpenseItemTable(this.state.startRange,this.state.limitRange);
            swal({
              title   : " ",
              text    : "Expense Item details added successfully!",
            });
            this.setState({              
              expenseType     : "",
              expenseItem     : "",
              HSN             : "",
              billingCode     : "",
              submitVal       : true
            })
          }   
        })
        .catch(function (error) {
          swal({
            title : " ",
            text  : "Failed to Add Expense Item details!",
          });
        })
      }else{
        axios.patch('/api/expenseitemmaster/patch',updateFormValues)
        .then((response)=>{
          // console.log("response.data.updated == ", response.data.updated);
          if(response.data.updated){
            swal({
              title : " ",
              text  : "Expense Item Details Updated Successfully!",
            });
            this.setState({
                id              : "",
                expenseType     : "",
                expenseItem     : "",
                HSN             : "",
                billingCode     : "",
                submitVal       : true,
              },()=>{ 
                this.getExpenseItemTable(this.state.startRange,this.state.limitRange);            
                this.props.history.push(this.state.tableObjects.editUrl);                            
              }); 
          }else{
            swal({
              title : " ",
              text  : "Expense Item Details are Already Up to Date!",
            });
            this.setState({
                id              : "",
                expenseType     : "",
                expenseItem     : "",
                HSN             : "",
                billingCode     : "",
                submitVal       : true,
              },()=>{ 
                this.getExpenseItemTable(this.state.startRange,this.state.limitRange);            
                this.props.history.push(this.state.tableObjects.editUrl);                            
              });
          } 
          this.setState({
              id              : "",
              expenseType     : "",
              expenseItem     : "",
              HSN             : "",
              billingCode     : "",
              submitVal       : true,
            })                  
        })
        .catch(function (error) {
          swal({
            title : " ",
            text  : "Failed to Update Expense Item Details!",
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
 /*======= edit() =======*/
  edit(){
    if (this.state.id && this.state.id !== 'undefined') {
      axios.get("/api/expenseitemmaster/get/one/"+this.state.id)
         .then((response)=>{
            console.log("response = ",response);
            this.setState({
              id              : response.data._id,
              expenseType     : response.data.expenseTypeId,
              expenseItem     : response.data.expenseItem,
              HSN             : response.data.HSN,
              billingCode     : response.data.billingCode,
              submitVal       : false,
            },()=>{
              // console.log("state = ", this.state);                
            });
         })
         .catch((error)=>{
            console.log("Error edit() = ", error);   
         })
    }
  }
 /*======= edit() =======*/
  edit(){
    if (this.state.id && this.state.id !== 'undefined') {
      axios.get("/api/expenseitemmaster/get/one/"+this.state.id)
         .then((response)=>{
            console.log("response = ",response);
            this.setState({
              id              : response.data._id,
              expenseType     : response.data.expenseTypeId,
              expenseItem     : response.data.expenseItem,
              HSN             : response.data.HSN,
              billingCode     : response.data.billingCode,
              submitVal       : false,
            },()=>{
              // console.log("state = ", this.state);                
            });
         })
         .catch((error)=>{
            console.log("Error edit() = ", error);   
         })
    }
  }
  /*======= delete() =======*/
  delete(event){
    event.preventDefault();
    console.log(event.currentTarget.getAttribute('data-id'))
    this.setState({id: event.currentTarget.getAttribute('data-id')})
    $('#deleteModal').show();
  }
  /*======= delexpence() =======*/
  delexpence(event){
    event.preventDefault();
    // console.log('id',this.state.id);
    axios.delete('/api/expenseitemmaster/delete/'+this.state.id)
    .then((response)=>{
      if (response.data) {
        $('#deleteModal').hide();   
        // window.location.reload();
        swal({
          title : " ",
          text  : "Record is deleted successfully.",
        });
      }else{
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
                <h4 className="weighttitle col-lg-11 col-md-11 col-xs-11 col-sm-11 NOpadding-right">Expense Item Master</h4>
            </div>              
            <div className="box-header col-lg-12 col-md-12 col-xs-12 col-sm-12">
                <BillingCodesTable />
            </div>              
            <form id="ExpenseItemMasterForm"  >
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pdcls">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm compinfotp">
                  <div className="form-group formht col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <div className="form-group">
                        <label className="labelform" >Expense Type</label><span className="astrick">*</span>
                        <select id="expenseType" className="addonDiv form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.expenseType} ref="expenseType" name="expenseType" onChange={this.handleChange.bind(this)}>
                          <option>--Select Type--</option>
                          {
                              this.state.ExpenseTypeArray && this.state.ExpenseTypeArray.length > 0 ?
                                  this.state.ExpenseTypeArray.map((data, i)=>{
                                      return(
                                          <option key={i} value={data._id}>{data.type}</option>
                                      );
                                  })
                              :
                              null
                          }
                      </select>
                    </div>  
                  </div>
                  <div className="form-group formht col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                        <label className="labelform" >Expense Item</label><span className="astrick">*</span>                           
                        <input id="expenseItem" data-text="expenseItem" type="text" name="expenseItem" ref="expenseItem" className="form-control areaStaes" 
                          value    = {this.state.expenseItem}
                          onChange = {this.handleChange.bind(this)} 
                        />                             
                    </div>  
                  </div>
                  <div className="form-group formht col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                        <label className="labelform" >HSN Number</label><span className="astrick">*</span>                              
                        <input type="number" name="HSN" ref="HSN" id="HSN" className="form-control areaStaes" 
                              value     = {this.state.HSN} data-text="HSN" maxLength="8" min="0"
                              onKeyDown = {(event)=>(event.target.value > 10000000 ? (((event.which ? event.which : event.keyCode) !== 8) ? (event.preventDefault(), true) : false) : true)}
                              onChange  = {this.handleChange.bind(this)}
                         />                              
                    </div>  
                  </div>
                  <div className="form-group formht col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                        <label className="labelform" >Billing Code</label><span className="astrick">*</span>                              
                        <input type="number" name="billingCode" id="billingCode" ref="billingCode" className="form-control areaStaes" data-text="billingCode" maxLength="8" min="0"
                              value     = {this.state.billingCode} 
                              onKeyDown = {(event)=>(event.target.value > 10000 ? (((event.which ? event.which : event.keyCode) !== 8) ? (event.preventDefault(), true) : false) : true)}
                              onChange  = {this.handleChange.bind(this)}
                         />                              
                    </div>  
                  </div>
                </div>                    
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  ">
                <button className="col-lg-2 col-md-2 col-sm-12 col-xs-12 btn button3 pull-right" id="btnCheck" onClick={this.submitData.bind(this)} >
                  { this.state.submitVal ? "Submit" : "Update" }  
                </button>
              </div>
            </form>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{"marginBottom": "30px"}}>
              <IAssureTable
                tableHeading = {this.state.tableHeading}
                tableData    = {this.state.expenseItemTableData}
                tableObjects = {this.state.tableObjects}
                getData      = {this.getExpenseItemTable.bind(this)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

 }

 export default ExpenseItemMaster;