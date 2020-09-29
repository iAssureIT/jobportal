import React, { Component } from 'react';
import moment               from 'moment';
import converter 						from 'number-to-words';
import { ToWords }          from 'to-words';

import InvoiceView          from './InvoiceView.js';
import 'bootstrap/js/tab.js';

const toWords = new ToWords({
  localeCode       : 'en-IN',
  converterOptions : {
    currency            : true,
    ignoreDecimal       : false,
    ignoreZeroCurrency  : false,
  }
});

function SingleInvoice(props){
  return (
    <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
     	<section className="Content">
     	 	<div className="row">
     	 		<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
     	 			<div className="invoicePageWrapper NOpadding col-lg-12 col-md-12 col-xs-12 col-sm-12">
     	 				<div className="invoiceCorner col-lg-12 col-md-12 col-xs-12 col-sm-12  NOpadding">
          			<img src="/billingManagement/corner.png" className=""></img>
          		</div>
          		<div className="invoiceHeader col-lg-12 col-md-12 col-xs-12 col-sm-12  NOpadding">
          			<div className="invoiceTitleBack col-lg-7 col-md-7 col-xs-7 col-sm-7  NOpadding">
          				<h3 className="invoiceTitle">TAX INVOICE</h3>
          			</div>
          		</div>
          		{props.invoiceData.invoiceDetails
          		?
	          		<div className="invoiceDateAndNum col-lg-12 col-md-12 col-xs-12 col-sm-12">
	          			<div className="invoiceDate col-lg-12 col-md-12 col-xs-12 col-sm-12">
	          				<span className="dateTitle">Date &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </span>
	          				<span className="invoiceDate"> {props.invoiceData.invoiceDetails.createdAt ? (moment(new Date(props.invoiceData.invoiceDetails.createdAt)).format("DD-MM-YYYY")) : "dd/mm/yyyy"}</span>
	          			</div>
	          			<div className="invoiceNum col-lg-12 col-md-12 col-xs-12 col-sm-12">
	          				<span className="numTitle">Invoice Number : </span>
	          				<span className="invoiceNum"> {props.invoiceData.invoiceDetails.invoiceNumber ? props.invoiceData.invoiceDetails.invoiceNumber : "-"}</span>
	          			</div>
	          		</div>
	          	:
	          		null
	          	}
          		<div className="billingParties col-lg-12 col-md-12 col-xs-12 col-sm-12">
          		{ props.invoiceData.appCompanyDetails
          		?
          			<div className="mainCompany col-lg-6 col-md-6 col-sm-6 col-xs-12">
          				<div className="fromCompany col-lg-offset-2 col-md-offset-2 col-sm-offset-2 col-xs-offset-2 col-lg-10 col-md-10 col-sm-10 col-xs-10">
          					<h4> From </h4>
          				</div>
          				<div className="mainCompany col-lg-2 col-md-2 col-sm-2 col-xs-2 detailBoxImg invoiceImg">
          					{props.invoiceData.appCompanyDetails.companyLogo && props.invoiceData.appCompanyDetails.companyLogo.length >0 
          					?
          						<img src={props.invoiceData.appCompanyDetails.companyLogo} className=""></img>
          					:
          						<img src="/images/noImagePreview.png" className=""></img>
          					}
          				</div>
          				<div className="mainCompany col-lg-10 col-md-10 col-sm-10 col-xs-10 paddingRight0">
        						<h5 className="companyName">{props.invoiceData.appCompanyDetails.companyName ? props.invoiceData.appCompanyDetails.companyName : ""}</h5>
                    <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding companyList">
                      <li className="companyListItem col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                      	<div className="iconDiv col-lg-1 col-md-1 col-sm-1 col-xs-1 NOpadding">
                      		<i className="fa fa-map-marker faAddress faIcon"></i>
                      	</div> 
                      	{ props.invoiceData.appCompanyDetails.locations && props.invoiceData.appCompanyDetails.locations.length
                      	?
                        	<div className="detailsDiv col-lg-11 col-md-11 col-sm-11 col-xs-11 NOpadding">
                           	<span className="addressLine1">
                           		{props.invoiceData.appCompanyDetails.locations[0].addressLine2 ? "#" + props.invoiceData.appCompanyDetails.locations[0].addressLine2 + ", " : ""}
                           		{props.invoiceData.appCompanyDetails.locations[0].addressLine1 ? props.invoiceData.appCompanyDetails.locations[0].addressLine1 + "." : ""}
                           	</span><br/>
		          							{/*<span className="addressLine2">1 kharadi, Dhole Patil Farms Road, Opposite EON Free Zone, MIDC, Knowledge Park, Pune.</span>*/}
		          							<table className="addressLine3">
				          						<thead>
				          							<tr>
				          								<th>State</th>
				          								<th>Pincode</th>
				          								<th>State Code</th>
				          							</tr>
				          						</thead>
				          						<tbody>
				          							<tr>
				          								<td>{props.invoiceData.appCompanyDetails.locations[0].state ? props.invoiceData.appCompanyDetails.locations[0].state : "-"}</td>
				          								<td>{props.invoiceData.appCompanyDetails.locations[0].pincode ? props.invoiceData.appCompanyDetails.locations[0].pincode : "-"}</td>
				          								<td>{props.invoiceData.appCompanyDetails.locations[0].stateCode ? props.invoiceData.appCompanyDetails.locations[0].stateCode : "-"}</td>
				          							</tr>
				          						</tbody>
				          					</table>
				          				</div>
				          			:
				          			 	null
			          				}
                      </li>
                      <li className="companyListItem col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                      	<div className="iconDiv col-lg-1 col-md-1 col-sm-1 col-xs-1 NOpadding">
                      		<i className="fa fa-user-o faIcon"></i> 
                      	</div>
                      	<div className="detailsDiv col-lg-11 col-md-11 col-sm-11 col-xs-11 NOpadding">
                      		C/o : <span className="contactPerson">
                      			{props.invoiceData.appCompanyDetails.contactPersons[0] && props.invoiceData.appCompanyDetails.contactPersons[0].firstName ? props.invoiceData.appCompanyDetails.contactPersons[0].firstName : ""}
                      			{props.invoiceData.appCompanyDetails.contactPersons[0] && props.invoiceData.appCompanyDetails.contactPersons[0].lastName ? " " + props.invoiceData.appCompanyDetails.contactPersons[0].lastName : ""}
                      		</span> 
                      		{props.invoiceData.appCompanyDetails.contactPersons[0] && props.invoiceData.appCompanyDetails.contactPersons[0].designationName ? " ( " + props.invoiceData.appCompanyDetails.contactPersons[0].designationName + " )" : ""}
                      	</div>
                      </li>
                      <li className="companyListItem col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                      	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding contactDetails">
                      		<i className="fa fa-envelope-o faIcon iconDiv NOpadding"></i> 
                      		<span className="detailsDiv NOpadding">{props.invoiceData.appCompanyDetails.contactPersons[0] && props.invoiceData.appCompanyDetails.contactPersons[0].email ? props.invoiceData.appCompanyDetails.contactPersons[0].email : ""}</span> &nbsp;&nbsp;&nbsp;                                            	
                      		<i className="fa fa-mobile-phone faPhone faIcon iconDiv NOpadding"></i> 
                      	   	<span className="detailsDiv NOpadding">{props.invoiceData.appCompanyDetails.contactPersons[0] && props.invoiceData.appCompanyDetails.contactPersons[0].phone ? props.invoiceData.appCompanyDetails.contactPersons[0].phone : ""}</span>
                      	</div> 
                      </li>
                      <li className="companyListItem col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                      	<div className="taxDetails col-lg-12 col-md-12 col-sm-12 col-xs-12">
		          						<div className="numberDiv col-lg-4 col-md-4 col-sm-4 col-xs-4">
			          							<div className="numberTitle">GSTIN</div>
			          							<div className="numberValue">{props.invoiceData.appCompanyDetails.locations[0].GSTIN ? props.invoiceData.appCompanyDetails.locations[0].GSTIN : "-"}</div>
		          						</div>
		          						<div className="numberDiv col-lg-4 col-md-4 col-sm-4 col-xs-4">
			          							<div className="numberTitle">PAN</div>
			          							<div className="numberValue">{props.invoiceData.appCompanyDetails.locations[0].PAN ? props.invoiceData.appCompanyDetails.locations[0].PAN : "-"}</div>
		          						</div>
		          						<div className="numberDiv col-lg-4 col-md-4 col-sm-4 col-xs-4 noRightBorder">
			          							<div className="numberTitle">CIN</div>
			          							<div className="numberValue">{props.invoiceData.appCompanyDetails.CIN ? props.invoiceData.appCompanyDetails.CIN : "-"}</div>
		          						</div>
		          					</div>
                      </li>                                            
                  	</ul>			          				
          				</div>
          			</div>
          		:
          			null
          		}
          		{props.invoiceData.invoiceDetails
          		?
          			<div className="entityCompany col-lg-6 col-md-6 col-sm-6 col-xs-12">
          				<div className="toCompany col-lg-offset-2 col-md-offset-2 col-sm-offset-2 col-xs-offset-2 col-lg-10 col-md-10 col-sm-10 col-xs-10">
          					<h4> To </h4>
          				</div>
          				<div className="mainCompany col-lg-2 col-md-2 col-sm-2 col-xs-2 detailBoxImg invoiceImg">
          					{props.invoiceData.invoiceDetails.companyDetails[0].companyLogo && props.invoiceData.invoiceDetails.companyDetails[0].companyLogo.length >0 
          					?
          						<img src={props.invoiceData.invoiceDetails.companyDetails[0].companyLogo} className=""></img>
          					:
          						<img src="/images/noImagePreview.png" className=""></img>
          					}
          				</div>
          				<div className="mainCompany col-lg-10 col-md-10 col-sm-10 col-xs-10 paddingRight0">
        						<h5 className="companyName">{props.invoiceData.invoiceDetails.companyDetails[0].companyName ? props.invoiceData.invoiceDetails.companyDetails[0].companyName : ""}</h5>
                      <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding companyList">
                        <li className="companyListItem col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                        	<div className="iconDiv col-lg-1 col-md-1 col-sm-1 col-xs-1 NOpadding">
                        		<i className="fa fa-map-marker faAddress faIcon"></i>
                        	</div> 
                        	<div className="detailsDiv col-lg-11 col-md-11 col-sm-11 col-xs-11 NOpadding">
                           	<span className="addressLine1">
                           		{props.invoiceData.invoiceDetails.companyDetails[0].locations[0].addressLine2 ? "#" + props.invoiceData.invoiceDetails.companyDetails[0].locations[0].addressLine2 + ", " : ""}
                             	{props.invoiceData.invoiceDetails.companyDetails[0].locations[0].addressLine1 ? props.invoiceData.invoiceDetails.companyDetails[0].locations[0].addressLine1 + "." : ""}
                           	</span><br/>
                            <table className="addressLine3">
				          						<thead>
				          							<tr>
				          								<th>State</th>
				          								<th>Pincode</th>
				          								<th>State Code</th>
				          							</tr>
				          						</thead>
				          						<tbody>
				          							<tr>
				          								<td>{props.invoiceData.invoiceDetails.companyDetails[0].locations[0].state ? props.invoiceData.invoiceDetails.companyDetails[0].locations[0].state : "-"}</td>
				          								<td>{props.invoiceData.invoiceDetails.companyDetails[0].locations[0].pincode ? props.invoiceData.invoiceDetails.companyDetails[0].locations[0].pincode : "-"}</td>
				          								<td>{props.invoiceData.invoiceDetails.companyDetails[0].locations[0].stateCode ? props.invoiceData.invoiceDetails.companyDetails[0].locations[0].stateCode : "-"}</td>
				          							</tr>
				          						</tbody>
				          					</table>
				          				</div>
                        </li>
                        <li className="companyListItem col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                        	<div className="iconDiv col-lg-1 col-md-1 col-sm-1 col-xs-1 NOpadding">
                        		<i className="fa fa-user-o faIcon"></i> 
                        	</div>
                        	<div className="detailsDiv col-lg-11 col-md-11 col-sm-11 col-xs-11 NOpadding">
                        		C/o : <span className="contactPerson">
                        			{props.invoiceData.invoiceDetails.companyDetails[0].contactPersons[0].firstName ? props.invoiceData.invoiceDetails.companyDetails[0].contactPersons[0].firstName : ""}
                        			{props.invoiceData.invoiceDetails.companyDetails[0].contactPersons[0].lastName ? " " + props.invoiceData.invoiceDetails.companyDetails[0].contactPersons[0].lastName : ""}
                        		</span> 
                        		{props.invoiceData.invoiceDetails.companyDetails[0].contactPersons[0].designationName ? " ( " + props.invoiceData.invoiceDetails.companyDetails[0].contactPersons[0].designationName + " )" : ""}
                        	</div>
                        </li>
                        <li className="companyListItem col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                        	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding contactDetails">
                        		<i className="fa fa-envelope-o faIcon iconDiv NOpadding"></i> 
                        		<span className="detailsDiv NOpadding">{props.invoiceData.invoiceDetails.companyDetails[0].contactPersons[0].email ? props.invoiceData.invoiceDetails.companyDetails[0].contactPersons[0].email : ""}</span> &nbsp;&nbsp;&nbsp;                                            	
                        		<i className="fa fa-mobile-phone faPhone faIcon iconDiv NOpadding"></i> 
                        	   	<span className="detailsDiv NOpadding">{props.invoiceData.invoiceDetails.companyDetails[0].contactPersons[0].phone ? props.invoiceData.invoiceDetails.companyDetails[0].contactPersons[0].phone : ""}</span>
                        	</div> 
                        </li>
                        <li className="companyListItem col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                        	<div className="taxDetails col-lg-12 col-md-12 col-sm-12 col-xs-12">
		          						<div className="numberDiv col-lg-4 col-md-4 col-sm-4 col-xs-4">
			          							<div className="numberTitle">GSTIN</div>
			          							<div className="numberValue">{props.invoiceData.invoiceDetails.companyDetails[0].locations[0].GSTIN ? props.invoiceData.invoiceDetails.companyDetails[0].locations[0].GSTIN : "-"}</div>
		          						</div>
		          						<div className="numberDiv col-lg-4 col-md-4 col-sm-4 col-xs-4">
			          							<div className="numberTitle">PAN</div>
			          							<div className="numberValue">{props.invoiceData.invoiceDetails.companyDetails[0].locations[0].PAN ? props.invoiceData.invoiceDetails.companyDetails[0].locations[0].PAN : "-"}</div>
		          						</div>
		          						<div className="numberDiv col-lg-4 col-md-4 col-sm-4 col-xs-4 noRightBorder">
			          							<div className="numberTitle">CIN</div>
			          							<div className="numberValue">{props.invoiceData.invoiceDetails.companyDetails[0].locations[0].CIN ? props.invoiceData.invoiceDetails.companyDetails[0].locations[0].CIN : "-"}</div>
		          						</div>
		          					</div>
                      </li>                                            
                  	</ul>			          				
          				</div>
          			</div>
          		:
          			null
          		}
          		</div>
          		<div className="box-body marginBottom60 col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding">	
        				<div className="col-lg-12 marginStyle">
        					<div className="table-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12">
          					<table className="table invoice-table">
          						<thead>
		                    <tr style={{"background":"#eee", "border" : "1px solid black"}}>
            							<td>SR.</td>
            							<td>ITEM DESCRIPTION</td>
            							<td className="subtotal">UNIT COST</td>
            							<td className="subtotal">QTY</td>
            							<td className="taxHeading" colSpan="2">TAX</td>
            							<td className="subtotal">SUBTOTAL</td>
	                      </tr>
          						</thead>
          						{props.invoiceData.invoiceDetails.lineItems && props.invoiceData.invoiceDetails.lineItems.length > 0
          						?
          						<tbody className="tableBody" id="tableBody">
          							{props.invoiceData.invoiceDetails.lineItems.map((data, index) => {
          							return (
          								(data.billingCode === 1 || data.billingCode === 11 || data.billingCode === 12 || data.billingCode === 13 || data.billingCode === 14)
		          							?
			          							<tr key={index} className="totalClass" style={{"textAlign" : "right", "backgroundColor": "#eee"}}>
				          							<td colSpan="5">
				          							 	<span className="ItemName"> {data.lineItem} </span>
				          							</td>
				          							<td className="taxAmount"><i className="fa fa-inr faIcon"></i> {data.taxAmount.toFixed(2)}</td>
				          							<td className="subtotalPrice">
				          								<span className="totalPrice"><i className="fa fa-inr faIcon"></i> {data.amount.toFixed(2)}</span><br/>
				          							</td>
			          							</tr>
		          							:
                              (data.billingCode === 901)
                            ?
                              <tr key={index} className="totalClass" style={{"textAlign" : "right", "backgroundColor": "#eee"}}>
                                <td colSpan="5">
                                  <span className="ItemName"> {data.lineItem} </span>
                                </td>
                                <td></td>
                                <td className="subtotalPrice">
                                  <span className="totalPrice"><i className="fa fa-inr faIcon"></i> {data.amount.toFixed(2)}</span><br/>
                                  {/*<span className="taxPrice">TAX : <i className="fa fa-inr faIcon"></i> {data.taxAmount}</span>*/}
                                </td>
                              </tr>
                            :
                              (data.billingCode === 301)
                                ?
                                  <tr key={index} className="" style={{"textAlign" : "right"}}>
                                    <td colSpan="5" className="itemDesc">
                                      <span className="ItemName"> {data.lineItem} </span>
                                    </td>
                                    <td className="taxAmount"><i className="fa fa-inr faIcon"></i> {data.taxAmount.toFixed(2)}</td>
                                    <td className="subtotalPrice">
                                      <span className="totalPrice"><i className="fa fa-inr faIcon"></i> {data.amount.toFixed(2)}</span><br/>
                                    </td>
                                  </tr>
                            :
                              ((data.billingCode === 401 || data.billingCode === 402))
                                ?
                                  <tr key={index} className="" style={{"textAlign" : "right"}}>
                                    <td colSpan="5" className="itemDesc">
                                      <span className="ItemName"> {data.lineItem} </span>
                                    </td>
                                    <td className="taxAmount"><i className="fa fa-inr faIcon"></i> {data.taxAmount.toFixed(2)}</td>
                                    <td className="subtotalPrice">
                                      <span className="totalPrice"><i className="fa fa-inr faIcon"></i> {data.amount.toFixed(2)}</span><br/>
                                    </td>
                                  </tr>
                                :
		          								(data.billingCode === 403)
			          								?
			          									<tr key={index} className="" style={{"textAlign" : "right"}}>
						          							<td colSpan="5" className="itemDesc">
						          							 	<span className="ItemName"> {data.lineItem} </span>
						          							</td>
						          							<td className="taxAmount"><i className="fa fa-inr faIcon"></i> {data.taxAmount.toFixed(2)}</td>
						          							<td className="subtotalPrice">
						          								<span className="totalPrice"><i className="fa fa-inr faIcon"></i> {data.amount.toFixed(2)}</span><br/>
						          							</td>
					          							</tr>
			          								:
				          								<tr key={index}>
						          							<td className="seqNo">{data.sequenceNumber}</td>
						          							<td className="itemDesc">
  						          							 	<span className="ItemName"> {data.lineItem} </span><br/>
  						          							 	<span className="hsnNumber"> HSN : 1234567890 </span>
						          							</td>
						          							<td className="itemCost"><i className="fa fa-inr faIcon"></i> {data.rate.toFixed(2)} </td>
						          							<td className="itemQty">{data.qty + " " + data.unit}</td>
						          							<td className="taxPercentage">{data.taxPercentage + "%"}</td>
						          							<td className="taxAmount"><i className="fa fa-inr faIcon"></i> {data.taxAmount.toFixed(2)}</td>
						          							<td className="subtotalPrice">
						          								<span className="totalPrice"><i className="fa fa-inr faIcon"></i> {data.amount.toFixed(2)}</span><br/>
                                    </td>
					          							</tr>		          						
          							  );
          						})}
          							<tr className="inWords">
	          							<td colSpan="7">
	          							 	<span className="inWordsName">In Words : </span>
	          							 	{/*<span className=""> Rupees </span>*/}
	          							 	<span className=""> {props.invoiceData.invoiceDetails.totalAmount ? toWords.convert(props.invoiceData.invoiceDetails.totalAmount, { currency: true, ignoreDecimal: true }) : ""} </span>
	          							 	{/*<span className=""> Only.</span>*/}
	          							</td>
          							</tr>
          							<tr className="">
	          							<td colSpan="7">
	          							 	<span className="inWordsName">SAC &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : </span>
	          							 	<span className=""> ____________________________________ </span>
	          							</td>
          							</tr>
          						</tbody>
          						:
          							null
          						}
          					</table>
          				</div>
          				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 businessMsg">
                    THANKS YOU FOR YOUR BUSINESS                                        	
                  </div>
          				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 paymentDetails">
                    <h3>PAYMENT INFO</h3>
                    {props.invoiceData.bankDetails
                      ?
                      <div>
                        <div>Account # &nbsp;&nbsp;&nbsp;&nbsp; : &nbsp; {props.invoiceData.bankDetails.accNumber}</div>
    										<div>A/C Name  &nbsp;&nbsp;&nbsp;&nbsp; : &nbsp; {props.invoiceData.bankDetails.accHolderName}</div>
    										<div>Bank Details &nbsp;: &nbsp; {props.invoiceData.bankDetails.bankName + "( " + props.invoiceData.bankDetails.branchName + " )" }</div> 
                      </div>
                      :
                        null
                    }                                      	
                  </div>
          				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                    <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12 termsandconditions">
                    	<h3> PAYMENT TERMS </h3>
                      {/*<ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">                                                                       
                        <li className=""><i className="fa fa-square termicon NOpadding"></i> Lorem ipsum dolor sit amet, consectetuer adipiscing elit</li>
                        <li className=""><i className="fa fa-square termicon NOpadding"></i> Lorem ipsum dolor sit amet, consectetuer adipiscing elit</li>
                        <li className=""><i className="fa fa-square termicon NOpadding"></i> Lorem ipsum dolor sit amet, consectetuer adipiscing elit</li>
                      </ul>*/}
                      { props.invoiceData.paymentTerms 
                        ?
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 marbtm30 termDiv paymentTerms NOpadding">
                            <div dangerouslySetInnerHTML={{ '__html': props.invoiceData.paymentTerms }}></div>
                          </div>
                        :
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 marbtm30 noPaymentTerms NOpadding">
                            <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">                                                                       
                              <li className=""><i className="fa fa-square termicon NOpadding"></i> No Payment Terms Available</li>
                            </ul>
                          </div>
                      }
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 signDetails">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 codesignation">
                        Authority Sign
                    	</div>
                    	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 codesignation">
                        MD & CEO
                    	</div>
                    	<div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 col-xs-12 bordersign"></div>
                    	<div className="authSign col-lg-12 col-md-12 col-sm-12 col-xs-12 marbtm30">
                        	AUTHORISED SIGN
                    	</div>
                    </div>
                	</div>
        				</div>			          		
       	 			</div>
         	 		<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding invoiceFooter">
         	 			<img src="/billingManagement/footer.png" className=""></img>
         	 		</div>
     	 			</div>
     	 		</div>
     	 	</div>
    	</section>
   	</div>
  );
}
export default SingleInvoice;