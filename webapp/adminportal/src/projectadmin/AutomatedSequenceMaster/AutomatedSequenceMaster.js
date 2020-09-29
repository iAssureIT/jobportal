import React, { Component }                 from 'react';
import { render }                           from 'react-dom';
import $                                    from 'jquery';
import jQuery                               from 'jquery';
import axios                                from 'axios';
import swal                                 from 'sweetalert';
import arrayMove                            from 'array-move';
import { SortableItem, swapArrayPositions } from 'react-sort-list';
import IAssureTable                         from  '../../coreadmin/IAssureTable/IAssureTable.jsx';
import BillingCodesTable                    from  '../BillingCodesTable/BillingCodesTable.js';

import './AutomatedSequenceMaster.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/modal.js';

class AutomatedSequenceMaster extends Component{
   constructor(props) {
    super(props);
    this.state = {      
      billTitle         : "",
      sequenceArray     : [],
      submitVal         : true, 
      startRange        : 0,
      limitRange        : 10,
      expenseData       : [],
      tableHeading      : {
                            billTitle   : "Bill Title",
                            sequence    : "Expense Item Sequence",
                            actions     : "Action"
                          },
      tableObjects      : {
        deleteMethod    : 'delete',
        apiLink         : '/api/automatedbillingsequence/',
        paginationApply : false,
        searchApply     : false,
        editUrl         : '/billing-masters'
      },     
    };  
    this.swap = this.swap.bind(this);  
  }
  /*======= componentDidMount() =======*/
  componentDidMount(){
    this.getAutomatedSequenceTable(this.state.startRange,this.state.limitRange);
    this.getExpenseItemList();

    jQuery.validator.setDefaults({
      debug  : true,
      success: "valid"
    });

    $("#AutomatedBillingSequenceForm").validate({
      rules : {
        billTitle  : {
          required : true,
        },
      },
      errorPlacement: function (error, element) {
        if (element.attr("name") === "billTitle") {
            error.insertAfter("#billTitle");
        }
      } 
    });
  }
  /*======= componentWillReceiveProps() =======*/
  componentWillReceiveProps(nextProps){
    // this.getExpenseItemList();
    if(nextProps.editId !== this.props.editId)
    {
      this.setState({
        id : nextProps.editId
      }, ()=>{
        this.edit();
      })                        
    }
  }
  /*======= getExpenseItemTable() =======*/
  getAutomatedSequenceTable(startRange,limitRange){
    var data = {
      startRange: startRange,
      limitRange: limitRange
    }
    axios.post(this.state.tableObjects.apiLink+'get/list', data)
         .then((response) => {
            if (response.data) {
              console.log("sequence response = ",response.data);
              var tableData = response.data.map((a, i)=>{
                return {
                  _id          : a._id,
                  billTitle    : a.billTitle ? a.billTitle : " - ",
                  sequence     : "<div class=sequenceCol>" + 
                                  (a.sequence && a.sequence.length > 0) 
                                  ? 
                                    a.sequence.map((aa, ii)=>{                                             
                                      return (
                                        aa.expenseItem
                                      );                                       
                                    }, ()=>{}) 
                                  : 
                                    " - " 
                                  + "</div>",
                }
              })
              this.setState({
                automatedSequenceTableData : tableData
              }, ()=>{
                    console.log("sequenceTableData = ",this.state.automatedSequenceTableData);
              })              
            }
         })
         .catch((error) => {          
         });
  }
  /*======= swap() =======*/
  swap(dragIndex, dropIndex) {
    let swappedSequenceArray = arrayMove(this.state.sequenceArray, dragIndex, dropIndex);
    this.setState({
        sequenceArray: swappedSequenceArray
    }, ()=>{
      console.log("Sorted List = ",this.state.sequenceArray);
    })
  }
  /*======= submitData() =======*/
  submitData(event){
    event.preventDefault();
    var sequenceArray = this.state.sequenceArray;
    var sequence = [];
    if(sequenceArray && sequenceArray.length > 0){
      for(var i=0; i<sequenceArray.length; i++){ 
          sequence.push({
              sequenceNum   : i+1,
              expenseTypeId : sequenceArray[i].expenseTypeId,
              expenseItemId : sequenceArray[i].expenseItemId,
              expenseItem   : sequenceArray[i].expenseItem,
              billingCode   : sequenceArray[i].billingCode,
          })            
      }
      var formValues = {
          billTitle       : this.state.billTitle,
          sequence        : sequence,
      }

      var updateFormValues = {
          id              : this.state.id,
          billTitle       : this.state.billTitle,
          sequence        : sequence,
      }
      
      console.log('formValues = ',formValues);
      if($("#AutomatedBillingSequenceForm").valid()){
        if (this.state.submitVal) {
          axios.post('/api/automatedbillingsequence/post',formValues)
          .then((response)=> {          
            if(response.data.duplicated == true){
              swal(" ", "Automated Billing Expense Item Sequence Already Exist");
            }else{
              this.getAutomatedSequenceTable(this.state.startRange,this.state.limitRange);
              this.getExpenseItemList();
              swal({
                title   : " ",
                text    : "Automated Billing Expense Item Sequence Added Successfully!",
              });
              this.setState({              
                billTitle       : "",
                sequenceArray   : this.state.sequenceArray,
                submitVal       : true
              })
            }   
          })
          .catch(function (error) {
            swal({
              title : " ",
              text  : "Failed to Add Automated Billing Expense Item Sequence!",
            });
          })
        }else{
          axios.patch('/api/automatedbillingsequence/patch',updateFormValues)
          .then((response)=>{
            console.log("response.data.updated == ", response.data.updated);
            if(response.data.updated){
              this.getExpenseItemList();
              swal({
                title : " ",
                text  : "Automated Billing Expense Item Sequence Updated Successfully!",
              });
              this.setState({
                  id              : "",
                  billTitle       : "",
                  sequence        : this.state.sequenceArray,
                  submitVal       : true,
                },()=>{
                  this.getAutomatedSequenceTable(this.state.startRange,this.state.limitRange);            
                  this.props.history.push(this.state.tableObjects.editUrl);
                              
                }); 
            }  
            this.setState({
                id              : "",
                billTitle       : "",
                sequence        : this.state.sequenceArray,
                submitVal       : true,
              })                  
          })
          .catch(function (error) {
            swal({
              title : " ",
              text  : "Failed to Update Automated Billing Expense Item Sequence!",
            });
          })
        }
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
      axios.get("/api/automatedbillingsequence/get/one/"+this.state.id)
         .then((response)=>{
            console.log("response = ",response.data.sequence);
            var sequence = [];
            if(response.data.sequence && response.data.sequence.length > 0){
              for(var i=0; i<response.data.sequence.length; i++){ 
                sequence.push({
                  sequenceNum   : response.data.sequence[i].sequenceNum,
                  id            : response.data.sequence[i].expenseItemId,
                  expenseTypeId : response.data.sequence[i].expenseTypeId,
                  expenseItemId : response.data.sequence[i].expenseItemId,
                  expenseItem   : response.data.sequence[i].expenseItem,
                  billingCode   : response.data.sequence[i].billingCode,
                })            
              }
              this.setState({
                id              : response.data._id,
                billTitle       : response.data.billTitle,
                sequenceArray   : sequence,
                submitVal       : false,
              },()=>{
                
              });
            }
         })
         .catch((error)=>{
            console.log("Error edit() => ",error);
         })
    }
  }
  /*======= getExpenseItemList() =======*/
  getExpenseItemList(){
    axios.get("/api/expenseitemmaster/get/list")
         .then((response)=>{
            console.log("response = ",response.data);
            var expenseItemList = [];
            if(response.data.length > 0){
              for (var i = 0; i < response.data.length; i++){ 
                // var expenseItemList = this.state.sequenceArray;
                expenseItemList.push({
                  sequenceNum   : i+1,
                  id            : response.data[i]._id,
                  expenseTypeId : response.data[i].expenseTypeId,
                  expenseItemId : response.data[i]._id,
                  expenseItem   : response.data[i].expenseItem,
                  billingCode   : response.data[i].billingCode,
                })
                this.setState({
                  sequenceArray : expenseItemList,
                }, ()=>{
                  // console.log("sequenceArray push list = ",this.state.sequenceArray);
                })
              }
            }
         })
         .catch((error)=>{
            console.log("Error getExpenseItemList() => ",error);
         })
  }
  /*======= deleteExpenseItem() =======*/
  deleteExpenseItem(event) {
    event.preventDefault();
    var arrElementId = event.currentTarget.getAttribute('data-id');
    var removeIndex = this.state.sequenceArray.map(item => item.id).indexOf(arrElementId);
    if (removeIndex !== -1) {
      this.state.sequenceArray.splice(removeIndex, 1);
    }
    var arr = this.state.sequenceArray;
    this.setState({
      sequenceArray : arr
    })
  }
  /*======= render() =======*/
  render(){  
    return(
      <div className="container-fluid">
        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 companyDisplayForm">
          <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
            <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
                <h4 className="weighttitle col-lg-11 col-md-11 col-xs-11 col-sm-11 NOpadding-right">Automated Billing Sequence</h4>
            </div>              
            <div className="box-header col-lg-12 col-md-12 col-xs-12 col-sm-12">
                <BillingCodesTable />
            </div>              
            <form id="AutomatedBillingSequenceForm"  >
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pdcls">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm compinfotp">
                  <div className="form-group formht col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 col-xs-12">
                    <div className="form-group">
                      <label className="labelform" >Bill Title</label><span className="astrick">*</span>                           
                      <input id="billTitle" data-text="billTitle" type="text" name="billTitle" ref="billTitle" className="form-control areaStaes" 
                        value    = {this.state.billTitle}
                        onChange = {this.handleChange.bind(this)} 
                      />                             
                    </div> 
                  </div>
                  <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="form-group">
                        <label className="labelform" >Reorder Billing Item Sequence</label><span className="astrick">*</span>                              
                         <ul className="expenseItemSequenceList">
                          <li className="col-lg-12 col-md-12 col-sm-12 col-xs-12 expenseItemSequence headingList">
                            <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 move-icon"></div>
                            <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 sequenceNum">Sr.No </div>
                            <div className="col-lg-7 col-md-7 col-sm-7 col-xs-7 expenseItem">Expense Item </div>
                            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 billingCode">Billing Code </div>
                            <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 deleteSequence">Action </div>
                          </li>
                          {this.state.sequenceArray.map(function (data, index) {
                              return (
                                <SortableItem items={this.state.sequenceArray} id={data.id} key={data.expenseItemId} swap={this.swap}>
                                  <li className="col-lg-12 col-md-12 col-sm-12 col-xs-12 expenseItemSequence">
                                    <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 move-icon">
                                      <i className="fa fa-arrows" aria-hidden="true"></i> 
                                    </div>
                                    <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 sequenceNum">{index+1} </div>
                                    <div className="col-lg-7 col-md-7 col-sm-7 col-xs-7 expenseItem">{data.expenseItem} </div>
                                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 billingCode">{data.billingCode} </div>
                                    <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 deleteSequence">
                                      <i className="fa fa-times" aria-hidden="true" data-id={data.id} onClick={this.deleteExpenseItem.bind(this)} title="Delete"></i> 
                                    </div>
                                  </li>
                                </SortableItem>
                              )
                          }.bind(this))}
                        </ul>            
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
                tableData    = {this.state.automatedSequenceTableData}
                tableObjects = {this.state.tableObjects}
                getData      = {this.getAutomatedSequenceTable.bind(this)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

 }

 export default AutomatedSequenceMaster;