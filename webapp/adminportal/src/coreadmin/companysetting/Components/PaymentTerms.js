import React, { Component }     from 'react';
import { render }               from 'react-dom';
import CKEditor                 from "react-ckeditor-component";
import jQuery                   from 'jquery';
import $                        from "jquery";
import swal                     from 'sweetalert';
import axios                    from 'axios';

class PaymentTerms extends Component{
   constructor(props) {
      super(props);
      this.state = {
         paymentTerms   : "",
         messageError   : "",
         deleteID       : "",
         submitVal      : true,
      };  
      this.onChange     = this.onChange.bind(this);   
   }

   componentDidMount(){
      this.getData();
   }

   // componentWillReceiveProps(nextProps){
   //    this.getData()
   // }

   getData(){
      axios.get('/api/paymentterms/get/list')
           .then((response)=>{
            console.log("getData response=>",response.data);
            if(response.data && response.data.length > 0){
               this.setState({
                  paymentTermsandConditions : response.data[0].paymentTerms ? response.data[0].paymentTerms : "",
                  paymentTerms_id           : response.data[0]._id ? response.data[0]._id : ""
               });
            }else{
               this.setState({
                  paymentTermsandConditions : "",
                  paymentTerms_id           : ""
               });
            }
            })
           .catch((error)=>{
               console.log("Error getData() => ",error);
           })
   }

   submit(event){
      event.preventDefault();
      var formValues = {
         paymentTerms   : this.state.paymentTerms,
         createdBy      : localStorage.getItem("user_ID")
      }

      var updateFormValues = {
         paymentTerms_id   : this.state.paymentTerms_id,
         paymentTerms      : this.state.paymentTerms,
         updatedBy         : localStorage.getItem("user_ID")
      }
     
      if(this.state.paymentTerms !== ""){
         if(this.state.submitVal) {
           axios.post('/api/paymentterms/post',formValues)
                .then((response)=>{
                  console.log("response => ",response.data);
                     swal({                
                         text: response.data.message,
                     });
                     this.getData();
                     this.setState({
                        paymentTerms : "",
                        messageError : "",
                        submitVal    : true
                     })
                   
                 })
                 .catch((error)=>{
                     swal({                
                        text: "Not Able to Add Payment Terms!",
                     });
                 })
         }else{
           console.log('updateFormValue: ',updateFormValues)
           axios.patch('/api/paymentterms/patch',updateFormValues)
           .then((response)=>{
             swal({                
                   text: "Payment Terms Updated Successfully!",
                 });
             this.getData();
             this.setState({
               paymentTerms    : "",
               paymentTerms_id : "",
               submitVal       : true,
              
             },()=>{
                  document.getElementById("submitbtn").innerHTML = "Submit";
                })
           })
           .catch((error)=>{             
               swal({                
                   text: "Failed to Update Payment Terms!",
                 });             
           })
         }
      }else{
         this.setState({
              messageError : 'Please Add Payment Terms..!'
          });
      }
}

edit(event){
  event.preventDefault();
  $("html,body").scrollTop(0);
  axios.get('/api/paymentterms/get/one/'+this.state.paymentTerms_id)
  .then((response)=>{
    this.setState({
      paymentTerms      : response.data.paymentTerms,
      submitVal         : false
    },()=>{
      document.getElementById("submitbtn").innerHTML = "Update";
    })
  })
  .catch((error)=>{
    console.log(error)
  })
}

   /*======= onChange() =======*/
   onChange(evt){
        // console.log("name = ",evt.target.name);
        console.log("name = ",evt);
        var newContent = evt.editor.getData();
        this.setState({
          paymentTerms: newContent
        },()=>{
            if(this.state.paymentTerms){
                this.setState({
                    messageError : ''
                });
            }
            // this.getData();
        });
   }

delete(event){
  event.preventDefault();
  console.log("id=> ",event.target.id)
  this.setState({deleteID: event.target.id})
  $('#deleteModal1').show();
}

closeModal(event){
    event.preventDefault();
    $('#deleteModal1').hide(); 
}
confirmDelete(event){
  // event.preventDefault();
  axios.delete('/api/paymentterms/delete/'+this.state.deleteID)
  .then((response)=> {
   console.log("delete respose=>",response.data);
    
   if(response.data.deleted){
      swal({                
          text: "Payment Terms Deleted Successfully!",
        });
      this.getData();  
      this.setState({
         deleteID : ""
      },()=>{
         console.log("in setstate");
      });
      $('#deleteModal1').hide(); 
   }     
  })
  .catch((error)=> {
    swal({                
          text: "Failed to Delete Payment Terms!",
        });
  })
  
}
  
   render(){
      return(
         <div className="">
            <section className="NotificationContent">
               <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 companyDisplayForm">
                     <div className="">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <h4 className="">Payment Terms</h4>
                        </div>
                        <hr className="compySettingHr" />
                        <div className="tablebdy">
                           <form id="Condition">
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                 <div className="col-lg-12 col-md-12 col-sm-12 submitForm">
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                       <br />
                                    </div>
                                    <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                       <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12">Payment Terms <sup className="astrick">*</sup> <span className="errorMsg">{this.state.messageError ? "( " + this.state.messageError + " )" : ""}</span></label>                                                            
                                       <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                          <CKEditor activeClass="p15" id="editor"  className="conditions" content={this.state.paymentTerms} name="paymentTerms" events={{"change": this.onChange}}/>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt">
                                       {/*{
                                                                                 this.state.paymentTerms_id 
                                                                                 ? */}
                                             <button id="submitbtn" className="btn button3 pull-right" onClick={this.submit.bind(this)} >Submit</button>
                                          {/*:
                                             null
                                       }*/}
                                    </div>
                                 </div>
                              </div>
                           </form>                     
                        </div>
                        {
                          this.state.paymentTermsandConditions 
                           ?
                           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                  <div className="col-lg-12 col-md-12 col-sm-12 col-sm-12">
                                      <h4 style={{"fontSize" : "12px", "fontWeight" : "700"}}>Payment Terms</h4>
                                  </div>
                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                      <div className="termDiv col-lg-12 col-md-12 col-sm-12 col-xs-12 boxul1">
                                          <div className="liheader1 col-lg-1 col-md-1 col-sm-1 col-xs-1">
                                              <i className="fa fa-paste" aria-hidden="true"></i>
                                          </div>
                                          <ul className="col-lg-10 col-md-10 col-sm-10 col-xs-10 palfclr addrbox">
                                              <li dangerouslySetInnerHTML={{'__html' : this.state.paymentTermsandConditions}}></li>
                                          </ul>
                                          <div className="liheader1 dropdown col-lg-1 col-md-1 col-sm-1 col-xs-1">
                                              <i className="fa fa-ellipsis-h dropbtn" aria-hidden="true"></i>
                                              <div className="dropdown-content dropdown-contentLocation">
                                                  <ul className="pdcls ulbtm">
                                                      <li>
                                                          {/*<a href={"/condition/"+ this.props.match.params.contractID}><i className="fa fa-pencil penmrleft" aria-hidden="true"></i>&nbsp;&nbsp;Edit</a>*/}
                                                          <span onClick={this.edit.bind(this)}><i className="fa fa-pencil penmrleft" aria-hidden="true"></i>&nbsp;&nbsp;Edit</span>
                                                      </li>
                                                      <li>
                                                          <span onClick={this.delete.bind(this)} id={this.state.paymentTerms_id}><i className="fa fa-trash-o" aria-hidden="true"></i> &nbsp; Delete</span>
                                                      </li>
                                                  </ul>
                                              </div>
                                          </div>
                                          <div className="modal" id="deleteModal1" role="dialog">
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
                                                         <button type="button" className="btn examDelete-btn col-lg-7 col-lg-offset-5 col-md-7 col-md-offset-5 col-sm-8 col-sm-offset-3 col-xs-10 col-xs-offset-1" data-dismiss="modal" onClick={this.confirmDelete.bind(this)} >DELETE</button>
                                                      </div>
                                                   </div>
                                                </div>
                                             </div>
                                          </div> 
                                      </div>
                                  </div>
                              </div>
                           </div>
                          :
                           null
                        }
                     </div>
                  </div>
               </div>
            </section>              
         </div>
      );
   }
}

export default PaymentTerms;