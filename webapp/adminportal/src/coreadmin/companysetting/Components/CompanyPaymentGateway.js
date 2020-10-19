import React, { Component } from 'react';
import { render } from 'react-dom';
import $ from "jquery";
import axios from 'axios';
import swal from 'sweetalert';
import IAssureTable from '../../IAssureTable/IAssureTable.jsx';

class CompanyPaymentGateway extends Component {
  constructor(props) {
    super(props);
    this.state = {
      namepayg    : "",
      environment : "",
      status      : "",
      secretkey   : "",
      partnerid   : "",    
      paymentgatewayid   : "",    

      tableHeading      : {
        namepayg        : "Name Payment gateway",
        environment     : "Environment",
        status          : "Status",
        secretkey       : "Secret Key",
        partnerid       : "Partner Id",
        actions         : 'Action',
      },

      
      startRange        : 0,
      limitRange        : 10000,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount(){
    this.getData(this.state.startRange, this.state.limitRange);
    window.scrollTo(0, 0);
    $.validator.addMethod("regxtax", function (value, element, regexpr) {
      return regexpr.test(value);
    }, "Please enter valid tax rate.");

    $("#CompanyPaymentGatewayForm").validate({
    rules: {
      environment: {
        required: true,
      },
      status: {
        required: true,
      },
      secretkey: {
        required: true,
      },
      partnerid: {
        required: true,
      },
      namepayg: {
        required: true,
      },
      
    },
      errorPlacement: function(error, element) {
        if (element.attr("name") === "environment"){
          error.insertAfter("#environment");
        }
        if (element.attr("name") === "status"){
          error.insertAfter("#status");
        }
        if (element.attr("name") === "secretkey"){
          error.insertAfter("#secretkey");
        }
        if (element.attr("name") === "namepayg"){
          error.insertAfter("#namepayg");
        }
        if (element.attr("name") === "partnerid"){
          error.insertAfter(".partnerid");
        }
      }
    }); 
    
  } 
  

  handleChange(event){
    const {name,value} = event.target;
    this.setState({ 
      [name]:value
    });
  }  
  getData(startRange, limitRange){
    var data = {
      limitRange : limitRange,
      startRange : startRange,
    }
    axios.post('/api/paymentgateway/post/alllist',data)
            .then((response) => {
                this.setState({ 
                  paymentgatewayInfo: response.data, 
                });
            })
            .catch((error) => {});
  }
  submitPaymentInfo(event){
      event.preventDefault();
        var paymentgateway ={
          // companyId   : this.state.companyId,
          namepayg    : this.state.namepayg,
          environment : this.state.environment,
          status      : this.state.status,
          secretkey   : this.state.secretkey,
          partnerid   : this.state.partnerid,
          createdBy   : this.state.createdBy,
        }
       console.log('paymentgateway=>',paymentgateway)
      if($("#CompanyPaymentGatewayForm").valid()){
          axios.post('/api/paymentgateway/post',paymentgateway)
          .then((response)=> {
            this.getData(this.state.startRange, this.state.limitRange);
            swal({                
                  text: "Payment Gateway details added successfully!",
                });
            
            this.setState({
              namepayg    : " ",
              environment : " ",
              status      : " ",
              secretkey   : " ",
              partnerid   : " ",
            })
            this.getData(this.state.startRange, this.state.limitRange);
          })
          .catch((error)=> {
            swal({                
                  text: "Failed to add payment gateway details!",
                });
          })
        
  
      }  
  }
  updatepaymentgateway(event){
    event.preventDefault();
      var paymentgateway ={
        namepayg    : this.state.namepayg,
        environment : this.state.environment,
        status      : this.state.status,
        secretkey   : this.state.secretkey,
        partnerid   : this.state.partnerid,
        createdBy   : this.state.createdBy,
      }
     
    if($("#CompanyPaymentGatewayForm").valid()){
      var paymentgatewayid = this.state.paymentgatewayid;
        axios.patch('/api/paymentgateway/patch/'+paymentgatewayid,paymentgateway)
        .then((response)=> {
          this.getData(this.state.startRange, this.state.limitRange);
          swal({                
                text: "Payment Gateway details Updated successfully!",
              });
          
          this.setState({
            namepayg    : " ",
            environment : " ",
            status      : " ",
            secretkey      : " ",
            partnerid   : " ",
            paymentgatewayid : "",
          })
        })
        .catch((error)=> {
          swal({                
                text: "Failed to Updated payment gateway details!",
              });
        })
      

    }
  }

  edit(event) {
    event.preventDefault()
    $("html,body").scrollTop(0);
    $("#CompanyPaymentGatewayForm").validate().resetForm();
		
    var id = event.currentTarget.getAttribute('data-id');
    axios.get('/api/paymentgateway/get/one/'+id)
    .then((response)=> {
      this.setState({ 
          paymentgatewayid : response.data._id,
          namepayg    : response.data.namepayg,
          environment : response.data.environment,
          status      : response.data.status,
          secretkey   : response.data.secretkey,
          partnerid   : response.data.partnerid,
          createdBy   : response.data.createdBy,
      });
    })
    .catch((error)=> {
    })
		// this.props.history.push('/global-masters/paymentgateway/'+ id);
  }
  
  deleteDriver(event){
    event.preventDefault();
    this.setState({deleteID: event.currentTarget.getAttribute('data-id')})
    $('#deleteModal').show();
  }
  closeModal(event){
    event.preventDefault();
    $('#myModal').hide(); 
  }
  confirmDelete(event){
    event.preventDefault();
    axios.delete('/api/paymentgateway/delete/'+event.currentTarget.getAttribute('data-id'))
    .then((response)=> {
      swal({                
            text: "Payment Gateway details Deleted successfully!",
          });
      $('#myModal').hide();
      $(".modal-backdrop").remove(); 
      this.getData(this.state.startRange, this.state.limitRange);
    })
    .catch((error)=> {
      swal({                
            text: "Failed to Delete payment gateway details!",
          });
    })    
  }
  render() {
    return (
      <div className="">
        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 companyDisplayForm">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <h4 className="">Payment Gateway</h4>
          </div>
          <hr className="compySettingHr" />
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <form id="CompanyPaymentGatewayForm"  >
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pdcls">
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 nopadding">
                 <div className="form-group formht pdcls">
                    <div className="form-group margin15">
                         <label className="labelform" >Name Payment Gateway</label><span className="astrick">*</span>
                         <input type="text" 
                         style={{ textTransform: 'capitalize' }}
                         className="form-control"
                         id="namepayg" name="namepayg" title="Name Payment Gateway" onChange={this.handleChange.bind(this)}
                         value={this.state.namepayg} required />
                    </div>
                 </div> 
               </div>
               <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 nopadding">
                 <div className="form-group formht pdcls">
                    <div className="form-group margin15">
                       <label className="labelform" >Environment</label><span className="astrick">*</span>
                       <input type="text" className="form-control CLcompanyAddress inputValid " required
                      id="environment" name="environment" onChange={this.handleChange.bind(this)}
                      value={this.state.environment} title="Environment" />
                    </div>
                 </div> 
               </div>
               <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 nopadding">
                 <div className="form-group formht pdcls">
                    <div className="form-group margin15">
                       <label className="labelform" >Status</label><span className="astrick">*</span>
                       <input type="text" style={{ textTransform: 'capitalize' }}
                        className="form-control CLcompanyAddress inputValid " required
                        id="status" name="status" title="Status" onChange={this.handleChange.bind(this)}
                        value={this.state.status} />
                    </div>
                 </div> 
               </div>
               <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 nopadding">
                 <div className="form-group formht pdcls">
                    <div className="form-group margin15">
                       <label className="labelform" >Secret Key</label><span className="astrick">*</span>
                       <input type="text" className="form-control CLcompanyAddress inputValid " required
                        id="secretkey" name="secretkey" onChange={this.handleChange.bind(this)}
                        value={this.state.secretkey} title="Secret Key" />
                    </div>
                 </div> 
               </div>
               <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 nopadding">
                 <div className="form-group formht pdcls">
                    <div className="form-group margin15">
                       <label className="labelform" >Partner Id</label><span className="astrick">*</span>
                       <input type="text" className="form-control CLcompanyAddress inputValid " required
                        id="partnerid" name="partnerid" onChange={this.handleChange.bind(this)}
                        value={this.state.partnerid} title="Partner Id" />
                    </div>
                 </div> 
               </div>
                <div className=" col-lg-12 col-md-12 col-xs-12 col-sm-12 ">
                  {
                    this.state.paymentgatewayid === "" ?
                    <button className="col-lg-3 col-md-2 col-xs-12 col-sm-12 col-xs-12 pull-right btn button3 topMargin outlinebox" type="submit" onClick={this.submitPaymentInfo.bind(this)} >Submit</button>
                    :
                    <button className="col-lg-3 col-md-2 col-xs-12 col-sm-12 col-xs-12 pull-right btn button3 topMargin outlinebox" type="updatepaymentgateway" onClick={this.updatepaymentgateway.bind(this)} >Update</button>
                  }
                  
                </div>
            </div>
             
            </form>
           
        <div className="table-responsive topmr40 col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <table className="table iAssureITtable-bordered table-striped table-hover">
                <thead className="tempTableHeader">
                  <tr className="">
                    <th className="umDynamicHeader srpadd textAlignCenter"> Sr No. </th>
                    <th className="umDynamicHeader srpadd textAlignCenter"> Name Payment gateway </th>
                    <th className="umDynamicHeader srpadd textAlignCenter"> Environment</th>
                    <th className="umDynamicHeader srpadd textAlignCenter"> Status </th>
                    <th className="umDynamicHeader srpadd textAlignCenter"> Secret Key </th>
                    <th className="umDynamicHeader srpadd textAlignCenter"> Partner Id </th>
                    <th className="umDynamicHeader srpadd textAlignCenter"> Action </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.paymentgatewayInfo ?
                    this.state.paymentgatewayInfo.map((data, index) => {
                      return (
                        <tr key={index}>
                          <td className="textAlignCenter">{index + 1}</td>
                          <td className="textAlignCenter">{data.namepayg}</td>
                          <td className="textAlignCenter">{data.environment}</td>
                          <td className="textAlignCenter">{data.status}</td>
                          <td className="textAlignCenter">{data.secretkey}</td>
                          <td className="textAlignCenter">{data.partnerid}</td>
                          <td className="textAlignCenter">
                            <span>
                              <button title="Edit"   data-id={data._id}  onClick={this.edit.bind(this)}><i className="fa fa-pencil" ></i></button> &nbsp; &nbsp;
                              <button title="Delete" data-toggle="modal" data-target="#myModal"> <i className="fa fa-trash redFont" ></i></button> 
                              <div id="myModal" className="modal fade" role="dialog">
                                  <div className="adminModal adminModal-dialog col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                      <div className="modal-content adminModal-content col-lg-4 col-lg-offset-4 col-md-6 col-md-offset-3 col-sm-10 col-sm-offset-1 col-xs-12 noPadding">
                                        <div className="modal-header adminModal-header col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div className="adminCloseCircleDiv pull-right  col-lg-1 col-lg-offset-11 col-md-1 col-md-offset-11 col-sm-1 col-sm-offset-11 col-xs-12 NOpadding-left NOpadding-right">
                                              <button type="button" className="adminCloseButton" data-dismiss="modal" onClick={this.closeModal.bind(this)}>&times;</button>
                                            </div>
                                          </div>
                                          <div className="modal-body adminModal-body col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <h4 className="blackLightFont textAlignCenter examDeleteFont col-lg-12 col-md-12 col-sm-12 col-xs-12">Are you sure, do you want to delete?</h4>
                                        </div>
                                          <div className="modal-footer adminModal-footer col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                      <button type="button" className="btn adminCancel-btn col-lg-7 col-lg-offset-1 col-md-4 col-md-offset-1 col-sm-8 col-sm-offset-1 col-xs-10 col-xs-offset-1" data-dismiss="modal" onClick={this.closeModal.bind(this)}>CANCEL</button>
                                                    </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                <button type="button" className="btn examDelete-btn col-lg-7 col-lg-offset-5 col-md-7 col-md-offset-5 col-sm-8 col-sm-offset-3 col-xs-10 col-xs-offset-1" data-dismiss="modal" data-id={data._id} onClick={this.confirmDelete.bind(this)} >DELETE</button>
                                            </div>
                                        </div>
                                      </div>
                                  </div>
                              </div>  
                            </span>
                          </td>
                        </tr>
                      );
                    })
                    :
                    null
                  }
                </tbody>
              </table>
            </div>
            
            
          </div>
        </div>
      </div>

    );
  }

}

export default CompanyPaymentGateway;








//  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
//             <form id="CompanyPaymentGatewayForm"  >
//               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pdcls">
//                 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm compinfotp">
//                   <div className="form-group formht col-lg-6 col-md-6 col-sm-12 col-xs-12">
//                     <div className="form-group">
//                         <input id="companyName"  type="checkbox" className="companyNamechkbx" name="companyNamechkbx" value="cashOnDelivery" onChange={this.handleChange.bind(this)}/>
//                         <label className="labelform" >Cash on Delivery</label><span className="astrick"></span>
//                     </div>  
//                   </div>

//                   <div className="form-group formht col-lg-6 col-md-6 col-sm-12 col-xs-12">
//                     <div className="form-group">
//                       <input id="companyName"  type="checkbox" className="companyNamechkbx" name="companyNamechkbx"  value="paytm" onChange={this.handleChange.bind(this)}/>
//                       <label className="labelform" >Paytm</label><span className="astrick"></span>
//                     </div>  
//                   </div>
//                 </div>
//                 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm">
//                   <div className="form-group formht col-lg-6 col-md-6 col-sm-12 col-xs-12">
//                     <div className="form-group">
//                       <input id="companyName"  type="checkbox" className="companyNamechkbx" name="companyName" value="UPI" onChange={this.handleChange.bind(this)}/>
//                       <label className="labelform" >UPI</label><span className="astrick"></span>
//                     </div> 
//                   </div>
//                   <div className="form-group formht col-lg-6 col-md-6 col-sm-12 col-xs-12">
//                     <div className="form-group">
//                       <input id="companyName"  type="checkbox" className="companyNamechkbx" name="companyName" value="bankTransfer"  onChange={this.handleChange.bind(this)}/>
//                       <label className="labelform" >Bank Transfer</label><span className="astrick"></span>
//                     </div> 
//                   </div>

//                 </div>
//               </div>
//               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  ">
//                 { this.state.arrayValues && this.state.arrayValues.length>0 ? 
//                   <button className="col-lg-2 col-md-2 col-sm-12 col-xs-12 btn button3 pull-right" id="btnCheck" onClick={this.submitPaymentInfo.bind(this)}>
//                     { this.state.submitVal ? "Submit" : "Update" }  
//                   </button>
//                   : 
//                   <button className="col-lg-2 col-md-2 col-sm-12 col-xs-12 btn button3 pull-right"  id="disabledbtnCheck" disabled onClick={this.submitPaymentInfo.bind(this)}>
//                     { this.state.submitVal ? "Submit" : "Update" }  
//                   </button>
//                 }
//               </div>
//             </form>
//           </div>