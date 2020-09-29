import React, { Component } from 'react';
import moment               from 'moment';
import 'bootstrap/js/tab.js';
import InvoiceView from './InvoiceView.js';

function showExpenseImage(e) {
   var modal       = document.getElementById("myModal-"+e);
   var img         = document.getElementById("image-"+e);
   var modalImg    = document.getElementById("expenseImg-"+e);
   var captionText = document.getElementById("caption-"+e);

   modal.style.display     = "block";
   modalImg.src            = img.src;
   captionText.innerHTML   = img.alt;
}

function closeExpenseImage(e) {
   var modal = document.getElementById("myModal-"+e);
   modal.style.display = "none";
}

function TripExpenses(props){
   return (
      <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
         <section className="Content">
            <div className="row">
               <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                  {/*<div className="invoicePageWrapper NOpadding col-lg-12 col-md-12 col-xs-12 col-sm-12">*/}
                     <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 box-header with-border invoice-title">
                        <h4 className="invoiceTitle">Trip Expenses</h4>
                     </div>

                     {props.tripExpenses && props.tripExpenses.length > 0
                        ?
                           <div className="box-body marginBottom60 col-lg-12 col-md-12 col-xs-12 col-sm-12"> 
                              {props.tripExpenses.map((data, index) => {
                                 return (
                                    <div className="col-lg-3 col-md-3 col-xs-3 col-sm-3 marginBottom20" key={index}>
                                       <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12"> 
                                          <h4 className="tripExpenseHeading">{data.ticketName}</h4>
                                       </div>
                                       <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 ticketProofImgDiv"> 
                                          <img className="ticketProofImg" title="Click to See Image in Modal" 
                                             alt     = {data.ticketName}
                                             src     = {data.ticketProof.length > 0 ? data.ticketProof : "/images/dummyimg.jpg"} 
                                             id      = {"image-"+index} 
                                             onClick = {(e) => showExpenseImage(index)}>
                                          </img>
                                       </div>
                                       <div id={"myModal-"+index} className="expenseModal">
                                          <i className="expenseModalClose fa fa-times" onClick={(e) => closeExpenseImage(index)} aria-hidden="true"></i>
                                          <img className="expense-modal-content" id={"expenseImg-"+index} />
                                          <div id={"caption-"+index} className="modalCaption"></div>
                                       </div>
                                    </div> 
                                 );
                              })}                 
                           </div>
                        :
                           null
                     }

                     {/*<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding invoiceFooter">
                        <img src="/billingManagement/footer.png" className=""></img>
                     </div>
                  </div>*/}
               </div>
            </div>
         </section>
      </div>
   );
}

export default TripExpenses;