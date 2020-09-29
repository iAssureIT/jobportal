import React, { Component } from 'react';
import moment               from 'moment';
import 'bootstrap/js/tab.js';

import InvoiceView      from './InvoiceView.js';
import BookingProfile   from '../../BookingMaster/BookingProfile.js';

function DutySlip(props){
  return (
    <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 pdf-page-break">
     	<section className="Content">
     	 	<div className="row">
     	 		<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
     	 			<div className="invoicePageWrapper NOpadding col-lg-12 col-md-12 col-xs-12 col-sm-12">
     	 				<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 box-header with-border invoice-title">
                <h4 className="invoiceTitle">Duty Slip</h4>
              </div>
          		<div className="box-body marginBottom60 col-lg-12 col-md-12 col-xs-12 col-sm-12">	
        				<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 marginStyle">
                  <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 dutySlipWrapper">
        					  <BookingProfile id={props.invoiceData.invoiceDetails.booking_Id}  entity="AllBookings" />
                  </div>                    
        				</div>			          		
       	 			</div>
         	 		{/*<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding invoiceFooter">
         	 			<img src="/billingManagement/footer.png" className=""></img>
         	 		</div>*/}
     	 			</div>
     	 		</div>
     	 	</div>
    	</section>
   	</div>
  );
}
export default DutySlip;