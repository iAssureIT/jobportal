import React, { Component } from 'react';
import { render }           from 'react-dom';
import $ from 'jquery';
import jQuery from 'jquery';
import axios from 'axios';
import swal from 'sweetalert';
import './ExpenseTypeMaster.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/modal.js';

class ExpenseTypeMaster extends Component{
   constructor(props) {
    super(props);
    this.state = {
      type         : '',
      CGSTRate     : '',
      SGSTRate     : '',
      submitVal    : true,
      expenseData  : []

    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillReceiveProps(nextProps){
    this.expenseType();
  }
  
  componentDidMount() {
    this.expenseType();
    $.validator.addMethod("regxtax", function (value, element, regexpr) {
      return regexpr.test(value);
    }, "Please enter valid tax rate.");

    $("#ExpenseTypeMasterForm").validate({
    rules: {
      type: {
        required: true,
      },
      CGSTRate: {
        required: true,
        regxtax: /^[1-9]\d*(\.\d+)?$/
      },
      SGSTRate: {
        required: true,
        regxtax: /^[1-9]\d*(\.\d+)?$/
      },
    }
    });    
  }
  expenseType(){
    axios.get('/api/expensetypemaster/showAllData')
      .then((response) => {
        this.setState({
          expenseData:response.data
        })
      })
      .catch((error) => {
      })
  }
  submitData(event){
    event.preventDefault();
    var formValues = {
      type             : this.state.type,
      CGSTRate         : this.state.CGSTRate,
      SGSTRate         : this.state.SGSTRate,
    }//close array

    var updateFormValues = {
      Id            : this.state.Id,
      type          : this.state.type,
      CGSTRate      : this.state.CGSTRate,
      SGSTRate      : this.state.SGSTRate,
    }//close array

    if($("#ExpenseTypeMasterForm").valid()){
      console.log('this.state.submitVal',this.state.submitVal);
      if (this.state.submitVal) {
        axios.patch('/api/expensetypemaster/insertExpenseType',formValues)
        .then((response)=> {
          console.log('response',response);
          if(response.data.duplicated == true){
            swal(" ", "Data Already Exist");
          }else{
            this.expenseType();
            swal({
              title: " ",
              text: "Expense Type details added successfully!",
            });
          }   
        })
        .catch(function (error) {
          console.log('error',error);
          swal({
            title: " ",
            text: "Failed to add Expense Type details!",
          });
        })
      }else{
        axios.patch('/api/expensetypemaster/updateExpenseType',updateFormValues)
        .then((response)=>{
          console.log('response',response);
            swal({
              title: " ",
              text: "Expense Type details updated successfully!",
            })
          this.expenseType();
        })
        .catch(function (error) {
          console.log('error',error);
          swal({
            title: " ",
            text: "Failed to update Expense Type details!",
          });
        })
      }
    }
    this.setState({
      type : '',
      CGSTRate:'',
      SGSTRate:'',
      submitVal:true
    })
}

handleChange(event){
  const {name,value} = event.target;
  this.setState({ 
    [name]:value
  });
}

edit(event){
  event.preventDefault();
  this.setState({submitVal : false})
  $("html,body").scrollTop(0);
  var id = event.currentTarget.id;
  axios.get('/api/expensetypemaster/getSingleData/'+id)
  .then((response)=>{
    this.setState({
      Id         : response.data[0]._id,
      type       : response.data[0].type,
      CGSTRate   : response.data[0].CGSTRate,
      SGSTRate   : response.data[0].SGSTRate,
    })
  })
  .catch((error)=>{
    swal(error)
  })
    
}
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
        window.location.reload();
        this.expenseType();
        swal({
          title : " ",
              text : "Record is deleted successfully.",
            });
      } else{
        swal({
          title : " ",
              text : "Failed to delete.",
            });
      }
    })
    .catch((error)=>{
      swal(error)
    })
  }
   closeModal(event){
      event.preventDefault();
      $('#deleteModal').hide(); 
    }
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
                              <input id="type" value={this.state.type} data-text="type" onChange={this.handleChange.bind(this)} type="text" name="type" ref="type" className="form-control areaStaes" />
                          </div>  
                        </div>
                        <div className="form-group formht col-lg-6 col-md-6 col-sm-12 col-xs-12">
                          <div className="form-group">
                              <label className="labelform" >CGST Rating</label><span className="astrick">*</span>
                              <input id="CGSTRate" value={this.state.CGSTRate} data-text="CGSTRate" onChange={this.handleChange.bind(this)} type="number" name="CGSTRate" ref="CGSTRate" className="form-control areaStaes" minLength="1" maxLength="4" />
                          </div>  
                        </div>
                        <div className="form-group formht col-lg-6 col-md-6 col-sm-12 col-xs-12">
                          <div className="form-group">
                              <label className="labelform" >SGST Rating</label><span className="astrick">*</span>
                              <input id="SGSTRate" value={this.state.SGSTRate} data-text="SGSTRate" onChange={this.handleChange.bind(this)} type="number" name="SGSTRate" ref="SGSTRate" className="form-control areaStaes" minLength="1" maxLength="4" />
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
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    { this.state.expenseData && this.state.expenseData.length > 0 ?
                      this.state.expenseData.map( (data,index)=>{
                      return (
                        <div key= {index} className="col-lg-12 col-md-12">
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 boxTx" key={index}>
                            <div className="liheader1 col-lg-1 col-md-1 col-sm-1 col-xs-1">
                              <i className="fa fa-calculator" aria-hidden="true"></i>
                            </div>
                            <ul className="col-lg-10 col-md-10 col-sm-10 col-xs-10 palfclr addrbox">
                              <li>{data.type}</li>
                              <li>{data.CGSTRate} %</li>
                              <li>{data.SGSTRate} %</li>
                            </ul>
                            <div className="liheader1 dropdown col-lg-1 col-md-1 col-sm-1 col-xs-1">
                              <i className="fa fa-ellipsis-h dropbtn" aria-hidden="true"></i>
                              <div className="dropdown_content">
                              
                                <ul className="pdcls ulbtm">
                                  <li>  
                                      <a href="#" onClick={this.edit.bind(this)} id={data._id}><i className="fa fa-pencil penmrleft" aria-hidden="true"></i>&nbsp;&nbsp;Edit</a>
                                    </li>
                                    <li>
                                      <a onClick={this.delete.bind(this)} title="Delete"  data-id={data._id}><i className="fa fa-trash-o" aria-hidden="true"></i>&nbsp;Delete</a>
                                        <div className="modal" id="deleteModal" role="dialog">
                                          <div className=" adminModal adminModal-dialog col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div className="modal-content adminModal-content col-lg-4 col-lg-offset-4 col-md-6 col-md-offset-3 col-sm-10 col-sm-offset-1 col-xs-12 noPadding">
                                              <div className="modal-header adminModal-header col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div className="adminCloseCircleDiv pull-right  col-lg-1 col-lg-offset-11 col-md-1 col-md-offset-11 col-sm-1 col-sm-offset-11 col-xs-12 NOpadding-left NOpadding-right">
                                                  <button type="button" className="adminCloseButton" data-dismiss="modal" onClick={this.closeModal.bind(this)}>&times;</button>
                                                </div>

                                              </div>
                                              <div className="modal-body adminModal-body col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <h4 className="blackLightFont textAlignCenter examDeleteFont col-lg-12 col-md-12 col-sm-12 col-xs-12">Are you sure you want to delete?</h4>
                                              </div>

                                              <div className="modal-footer adminModal-footer col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                  <button type="button" className="btn adminCancel-btn col-lg-7 col-lg-offset-1 col-md-4 col-md-offset-1 col-sm-8 col-sm-offset-1 col-xs-10 col-xs-offset-1" data-dismiss="modal" onClick={this.closeModal.bind(this)}>CANCEL</button>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                  <button onClick={this.delexpence.bind(this)} type="button" className="btn examDelete-btn col-lg-7 col-lg-offset-5 col-md-7 col-md-offset-5 col-sm-8 col-sm-offset-3 col-xs-10 col-xs-offset-1" data-dismiss="modal">DELETE</button>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div> 
                                    </li>
                                  </ul>
                              </div>
                            </div>
                          </div>
                          </div>
                        )
                      })
                      :
                      null
                    }
                  </div>
                </div>
              </div>
            </div>
      );
  }

 }

 export default ExpenseTypeMaster;