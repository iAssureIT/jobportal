import React, { Component }   from 'react';
import {Route, withRouter}    from 'react-router-dom';
import swal                   from 'sweetalert';
import axios                  from 'axios';
import $                      from 'jquery';
import jQuery                 from 'jquery';
import moment                 from 'moment';
import converter              from 'number-to-words';
import { savePDF }            from '@progress/kendo-react-pdf';
import { PDFExport }          from '@progress/kendo-react-pdf';
import jsPDF                  from 'jspdf';
import html2canvas            from 'html2canvas';

import { ToWords }            from 'to-words';
import 'bootstrap/js/tab.js';
const toWords = new ToWords({
  localeCode       : 'en-IN',
  converterOptions : {
    currency            : true,
    ignoreDecimal       : false,
    ignoreZeroCurrency  : false,
  }
});

class MultipleInvoiceReceipt extends Component {
  constructor(props){
	 super(props);
	 this.state = {
		  invoiceData   : [] ,
		  tax           : 0,
		  totalTax      : 0,
		  total         : 0,
		  amount        : 0,
		  totalAmount   : 0,
		  payableAmount : 0,
		  rate          : 0,
		  totalSGST     : 0,
		  totalCGST     : 0,
		  discount      : 0,
		  advance       : 0,
		  roundingOff   : 0   
	 }
  }
  /*======= componentDidMount() =======*/  
  componentDidMount(){
	 const user_ID = localStorage.getItem("user_ID")  
	 this.setState({
		invoiceID : this.props.match.params.invoiceID,
	 }, () => {
		this.getData();
	 });
	 this.getAppCompanyDetails(1);     
	 this.getBankDetails();  
	 this.getPaymentTerms();   
  }
  	/*======= getAppCompanyDetails() =======*/
  	getAppCompanyDetails(companyID){
	 	axios.post('/api/entitymaster/get/getAdminCompany')
			.then((response) => {
				console.log("AppCompany = ", response.data[0]);
				this.setState({            
				  appCompanyDetails : response.data[0]           
			 });  
				console.log("appCompanyDetails = ",this.state.appCompanyDetails); 
			 })
			 .catch((error) => {
				console.log("Error getAppCompanyDetails() = ",error);
			 })
   }
  /*======= getBankDetails() =======*/
  getBankDetails(){
	 axios.get('/api/companysettings/list')
			.then((response) => {
				console.log("BankDetails = ", response.data[0]);
				this.setState({              
				  bankDetails : response.data[0] 
		  });  
		  console.log("bankDetails = ",this.state.bankDetails); 
			})
			.catch((error) => {
				console.log("Error getBankDetails() = ",error);
			})
  }
  /*======= getData() =======*/
  getData(){
	 var id = this.state.invoiceID
	 axios.get('/api/invoiceMaster/singleInvoice/'+id)
	 .then((response)=>{
		console.log('response ==> ',response.data.companyDetails.companyName)
		if(response.data){        
		  this.setState({
			 companyDetails: response.data.companyDetails ? response.data.companyDetails : '',
			 department    : response.data.department ? response.data.department : '',
			 employeeName  : response.data.employeeName ? response.data.employeeName : '',
			 invoiceData   : response.data.invoiceData,
			 startDate     : response.data.startDate,
			 endDate       : response.data.endDate,
			 qty           : response.data.qty,
			 total         : response.data.amount,
			 rate          : response.data.rate,
			 amount        : response.data.amount,
			 totalAmount   : response.data.totalAmount,
			 payableAmount : response.data.payableAmount,
			 tax           : response.data.tax,
			 totalTax      : response.data.tax,
			 totalSGST     : response.data.SGSTtax,
			 totalCGST     : response.data.CGSTtax,
			 roundingOff   : response.data.roundingOff, 
			 createdAt     : response.data.createdAt, 
			 invoiceNumber : response.data.invoiceNo
		  }, ()=>{
			 console.log("invoice data = ", this.state.invoiceData);
			 console.log("companyDetails data = ", this.state.companyDetails.companyName);
		  })
		}      
	 })
	 .catch((err)=>{
		console.log("Error getData() => ", err);
	 })
  }
  /*======= printTable() =======*/
  printTable(event) {
	 // event.preventDefault();
	 var DocumentContainer = document.getElementById('section-to-print');
	 var WindowObject      = window.open('', 'PrintWindow', 'height=600,width=800');
	 
	 WindowObject.document.write(DocumentContainer.innerHTML);
	 WindowObject.document.close();
	 WindowObject.focus();
	 WindowObject.print();
	 WindowObject.close();
  }
  /*======= getBack() =======*/
  goBack(event){
	 event.preventDefault();
	 this.props.history.push("/billing-management")
  }
  /*======= toggleInvoices() =======*/
  toggleInvoices(event){
	 console.log("event = ",event.target.name);
	 var id = event.target.id;
	 if (id === "invoiceCount") {
		$("#invoices").toggle();
	 }
  }
  	getPaymentTerms(){
      	axios.get('/api/paymentterms/get/list')
           .then((response)=>{
            	console.log("getPaymentTerms Response =>",response.data);
	            if(response.data && response.data.length > 0){
	               this.setState({
	                  paymentTerms : response.data[0].paymentTerms ? response.data[0].paymentTerms : "",
	               });
	            }
            })
           .catch((error)=>{
               console.log("Error getData() => ",error);
           })
    }
  downloadMasterInvoice(event){	 
	 const input = document.getElementById('masterInvoice-'+this.state.invoiceNumber);
	 console.log("input => ",input);
	 html2canvas(input)
	 .then((canvas) => {
		const imgData = canvas.toDataURL('image/png');
		console.log("imgData => ",imgData);
		const pdf = new jsPDF({
		  orientation: "landscape"
		});
		pdf.addImage(imgData, 'PNG', 4, 2);
		pdf.save(this.state.invoiceNumber+".pdf");  
	 });
  }
  /*======= render() =======*/
  render() {
	 return (
		<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
		  <section className="Content">
			 <div className="row">
				<div className="pdfDownload col-lg-12 col-md-12 col-sm-12 col-xs-12">
				  <i className="fa fa-envelope-o downloadIcon" title="Email Invoice Docket" aria-hidden="true" ></i>
				  <i className="fa fa-download downloadIcon" title="Download Invoice Docket" aria-hidden="true" onClick={this.downloadMasterInvoice.bind(this)}></i>
				  <i className="fa fa-print downloadIcon" title="Print Invoice Docket" aria-hidden="true" ></i>
				</div>
				<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
				  <div className="invoicePageWrapper NOpadding col-lg-12 col-md-12 col-xs-12 col-sm-12" id={"masterInvoice-"+this.state.invoiceNumber}>
					 <div className="invoiceCorner col-lg-12 col-md-12 col-xs-12 col-sm-12  NOpadding">
						<img src="/billingManagement/corner.png" className=""></img>
					 </div>
					 <div className="invoiceHeader col-lg-12 col-md-12 col-xs-12 col-sm-12  NOpadding">
						<div className="invoiceTitleBack col-lg-7 col-md-7 col-xs-7 col-sm-7  NOpadding">
						  <h3 className="invoiceTitle">TAX INVOICE</h3>
						</div>
					 </div>
					 {
						<div className="invoiceDateAndNum col-lg-12 col-md-12 col-xs-12 col-sm-12">
						  <div className="invoiceDate col-lg-12 col-md-12 col-xs-12 col-sm-12">
							 <span className="dateTitle">Date &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </span>
							 <span className="invoiceDate"> {this.state.createdAt ? (moment(new Date(this.state.createdAt)).format("DD-MM-YYYY")) : "dd/mm/yyyy"}</span>
						  </div>
						  <div className="invoiceNum col-lg-12 col-md-12 col-xs-12 col-sm-12">
							 <span className="numTitle">Invoice Number : </span>
							 <span className="invoiceNum"> {this.state.invoiceNumber ? this.state.invoiceNumber : "-"}</span>
						  </div>
						</div>
					 }
					 <div className="billingParties col-lg-12 col-md-12 col-xs-12 col-sm-12">
					 { this.state.appCompanyDetails
					 ?
						<div className="mainCompany col-lg-6 col-md-6 col-sm-6 col-xs-12">
						  <div className="fromCompany col-lg-offset-2 col-md-offset-2 col-sm-offset-2 col-xs-offset-2 col-lg-10 col-md-10 col-sm-10 col-xs-10">
							 <h4> From </h4>
						  </div>
						  <div className="mainCompany col-lg-2 col-md-2 col-sm-2 col-xs-2 detailBoxImg invoiceImg">
							 {this.state.appCompanyDetails.companyLogo && this.state.appCompanyDetails.companyLogo.length >0 
							 ?
								<img src={this.state.appCompanyDetails.companyLogo} className=""></img>
							 :
								<img src="/images/noImagePreview.png" className=""></img>
							 }
						  </div>
						  <div className="mainCompany col-lg-10 col-md-10 col-sm-10 col-xs-10 paddingRight0">
							 <h5 className="companyName">{this.state.appCompanyDetails.companyName ? this.state.appCompanyDetails.companyName : ""}</h5>
							 <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding companyList">
								<li className="companyListItem col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
								  <div className="iconDiv col-lg-1 col-md-1 col-sm-1 col-xs-1 NOpadding">
									 <i className="fa fa-map-marker faAddress faIcon"></i>
								  </div> 
								  { this.state.appCompanyDetails.locations && this.state.appCompanyDetails.locations.length
								  ?
									 <div className="detailsDiv col-lg-11 col-md-11 col-sm-11 col-xs-11 NOpadding">
										<span className="addressLine1">
										  {this.state.appCompanyDetails.locations[0].addressLine2 ? "#" + this.state.appCompanyDetails.locations[0].addressLine2 + ", " : ""}
										  {this.state.appCompanyDetails.locations[0].addressLine1 ? this.state.appCompanyDetails.locations[0].addressLine1 + "." : ""}
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
												<td>{this.state.appCompanyDetails.locations[0].state ? this.state.appCompanyDetails.locations[0].state : "-"}</td>
												<td>{this.state.appCompanyDetails.locations[0].pincode ? this.state.appCompanyDetails.locations[0].pincode : "-"}</td>
												<td>{this.state.appCompanyDetails.locations[0].stateCode ? this.state.appCompanyDetails.locations[0].stateCode : "-"}</td>
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
										{this.state.appCompanyDetails.contactPersons[0] && this.state.appCompanyDetails.contactPersons[0].firstName ? this.state.appCompanyDetails.contactPersons[0].firstName : ""}
										{this.state.appCompanyDetails.contactPersons[0] && this.state.appCompanyDetails.contactPersons[0].lastName ? " " + this.state.appCompanyDetails.contactPersons[0].lastName : ""}
									 </span> 
									 {this.state.appCompanyDetails.contactPersons[0] && this.state.appCompanyDetails.contactPersons[0].designationName ? " ( " + this.state.appCompanyDetails.contactPersons[0].designationName + " )" : ""}
								  </div>
								</li>
								<li className="companyListItem col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
								  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding contactDetails">
									 <i className="fa fa-envelope-o faIcon iconDiv NOpadding"></i> 
									 <span className="detailsDiv NOpadding">{this.state.appCompanyDetails.contactPersons[0] && this.state.appCompanyDetails.contactPersons[0].email ? this.state.appCompanyDetails.contactPersons[0].email : ""}</span> &nbsp;&nbsp;&nbsp;                                              
									 <i className="fa fa-mobile-phone faPhone faIcon iconDiv NOpadding"></i> 
										<span className="detailsDiv NOpadding">{this.state.appCompanyDetails.contactPersons[0] && this.state.appCompanyDetails.contactPersons[0].phone ? this.state.appCompanyDetails.contactPersons[0].phone : ""}</span>
								  </div> 
								</li>
								<li className="companyListItem col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
								  <div className="taxDetails col-lg-12 col-md-12 col-sm-12 col-xs-12">
									 <div className="numberDiv col-lg-4 col-md-4 col-sm-4 col-xs-4">
										  <div className="numberTitle">GSTIN</div>
										  <div className="numberValue">{this.state.appCompanyDetails.locations[0].GSTIN ? this.state.appCompanyDetails.locations[0].GSTIN : "-"}</div>
									 </div>
									 <div className="numberDiv col-lg-4 col-md-4 col-sm-4 col-xs-4">
										  <div className="numberTitle">PAN</div>
										  <div className="numberValue">{this.state.appCompanyDetails.locations[0].PAN ? this.state.appCompanyDetails.locations[0].PAN : "-"}</div>
									 </div>
									 <div className="numberDiv col-lg-4 col-md-4 col-sm-4 col-xs-4 noRightBorder">
										  <div className="numberTitle">CIN</div>
										  <div className="numberValue">{this.state.appCompanyDetails.CIN ? this.state.appCompanyDetails.CIN : "-"}</div>
									 </div>
								  </div>
								</li>                                            
							 </ul>                       
						  </div>
						</div>
						:
						null
					 }
					 {this.state.companyDetails
					 ?
						<div className="entityCompany col-lg-6 col-md-6 col-sm-6 col-xs-12">
						  <div className="toCompany col-lg-offset-2 col-md-offset-2 col-sm-offset-2 col-xs-offset-2 col-lg-10 col-md-10 col-sm-10 col-xs-10">
							 <h4> To </h4>
						  </div>
						  <div className="mainCompany col-lg-2 col-md-2 col-sm-2 col-xs-2 detailBoxImg invoiceImg">
							 {this.state.companyDetails.companyLogo && this.state.companyDetails.companyLogo.length >0 
							 ?
								<img src={this.state.companyDetails.companyLogo} className=""></img>
							 :
								<img src="/images/noImagePreview.png" className=""></img>
							 }
						  </div>
						  <div className="mainCompany col-lg-10 col-md-10 col-sm-10 col-xs-10 paddingRight0">
							 <h5 className="companyName">{this.state.companyDetails.companyName ? this.state.companyDetails.companyName : ""}</h5>
								<ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding companyList">
								  <li className="companyListItem col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
									 <div className="iconDiv col-lg-1 col-md-1 col-sm-1 col-xs-1 NOpadding">
										<i className="fa fa-map-marker faAddress faIcon"></i>
									 </div> 
									 <div className="detailsDiv col-lg-11 col-md-11 col-sm-11 col-xs-11 NOpadding">
										<span className="addressLine1">
										  {this.state.companyDetails.locations[0].addressLine2 ? "#" + this.state.companyDetails.locations[0].addressLine2 + ", " : ""}
										  {this.state.companyDetails.locations[0].addressLine1 ? this.state.companyDetails.locations[0].addressLine1 + "." : ""}
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
												<td>{this.state.companyDetails.locations[0].state ? this.state.companyDetails.locations[0].state : "-"}</td>
												<td>{this.state.companyDetails.locations[0].pincode ? this.state.companyDetails.locations[0].pincode : "-"}</td>
												<td>{this.state.companyDetails.locations[0].stateCode ? this.state.companyDetails.locations[0].stateCode : "-"}</td>
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
										  {this.state.companyDetails.contactPersons[0].firstName ? this.state.companyDetails.contactPersons[0].firstName : ""}
										  {this.state.companyDetails.contactPersons[0].lastName ? " " + this.state.companyDetails.contactPersons[0].lastName : ""}
										</span> 
										{this.state.companyDetails.contactPersons[0].designationName ? " ( " + this.state.companyDetails.contactPersons[0].designationName + " )" : ""}
									 </div>
								  </li>
								  <li className="companyListItem col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
									 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding contactDetails">
										<i className="fa fa-envelope-o faIcon iconDiv NOpadding"></i> 
										<span className="detailsDiv NOpadding">{this.state.companyDetails.contactPersons[0].email ? this.state.companyDetails.contactPersons[0].email : ""}</span> &nbsp;&nbsp;&nbsp;                                             
										<i className="fa fa-mobile-phone faPhone faIcon iconDiv NOpadding"></i> 
										  <span className="detailsDiv NOpadding">{this.state.companyDetails.contactPersons[0].phone ? this.state.companyDetails.contactPersons[0].phone : ""}</span>
									 </div> 
								  </li>
								  <li className="companyListItem col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
									 <div className="taxDetails col-lg-12 col-md-12 col-sm-12 col-xs-12">
									 <div className="numberDiv col-lg-4 col-md-4 col-sm-4 col-xs-4">
										  <div className="numberTitle">GSTIN</div>
										  <div className="numberValue">{this.state.companyDetails.locations[0].GSTIN ? this.state.companyDetails.locations[0].GSTIN : "-"}</div>
									 </div>
									 <div className="numberDiv col-lg-4 col-md-4 col-sm-4 col-xs-4">
										  <div className="numberTitle">PAN</div>
										  <div className="numberValue">{this.state.companyDetails.locations[0].PAN ? this.state.companyDetails.locations[0].PAN : "-"}</div>
									 </div>
									 <div className="numberDiv col-lg-4 col-md-4 col-sm-4 col-xs-4 noRightBorder">
										  <div className="numberTitle">CIN</div>
										  <div className="numberValue">{this.state.companyDetails.locations[0].CIN ? this.state.companyDetails.locations[0].CIN : "-"}</div>
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
									 <td className="qtyHeading">QTY</td>
									 <td className="taxHeading">TAX</td>
									 <td className="subtotal">SUBTOTAL</td>
								  </tr>
								</thead>
								<tbody className="tableBody" id="tableBody">                                                 
								  <tr>
									 <td className="seqNo">1</td>
									 <td className="itemDesc">
										<div className="masterInvoiceDescription"> 									  
										  <ul className="noPadding">
												<li>Master Invoice of &nbsp;<span className='invoiceCount' title='Click to See Single Invoices included in This Master Invoice' name="invoiceCount" id="invoiceCount" onClick={this.toggleInvoices.bind(this)}>
													{this.state.invoiceData && this.state.invoiceData.length > 0 ?  this.state.invoiceData.length  : ""} </span>&nbsp;
													{(this.state.invoiceData && this.state.invoiceData.length > 1 ? " Invoices " : " Invoice ")}
												</li>
												{this.state.startDate && this.state.endDate 
												?
													<li>
														<span className="boldHeading">From</span> {(moment(new Date(this.state.startDate)).format("DD-MM-YYYY")) + " "} 
														<span className="boldHeading">To</span> {(moment(new Date(this.state.endDate)).format("DD-MM-YYYY"))}</li>
												:
													null
												}
												{this.state.employeeName 
												?
													<li><span className="boldHeading">Employee :</span> {this.state.employeeName}</li>
												:
													null
												}
												{this.state.department 
												?
													<li><span className="boldHeading">Department :</span> {this.state.department}</li>
												:
													null
												}												
											 </ul>
										  <div className='invoiceToggle' id='invoices' style={{"display": "none"}}>
										  { this.state.invoiceData && this.state.invoiceData.length > 0 
											 ?
												this.state.invoiceData.map((data,index)=>{
												  return( 
													 <ul className="noPadding" key={index}>
														<li>Invoice : <a  title='View Invoice' target='_blank' href={'/view-invoice/'+data.invoiceId} className="includedInvoice">{data.invoiceNo}</a></li>
														<li><a  title='View Profile' target='_blank' href={'/employee-profile/'+data.employeeId} className="includedInvoice">{data.name}</a> 
														  {" | " + data.address + " | "}
														  {data.date}
														</li>
													 </ul>
												  )
												})
											 : 
												null
										  }
										  </div>
										</div>
									 </td>
									 <td className="itemCost"><i className="fa fa-inr faIcon"></i>{(this.state.amount).toFixed(2)} </td>
									 <td className="masteritemQty">{this.state.qty}</td>
									 <td className="taxAmount"><i className="fa fa-inr faIcon"></i>{(this.state.tax).toFixed(2)}</td>
									 <td className="masterSubtotalPrice">
										<span className="totalPrice"><i className="fa fa-inr faIcon"></i>{(this.state.amount).toFixed(2)}</span><br/>
									 </td>
								  </tr>                                 
								  <tr className="totalClass" style={{"textAlign" : "right", "backgroundColor": "#eee"}}>
									 <td colSpan="4">
										<span className="ItemName"> SubTotal A </span>
									 </td>
									 <td className="taxAmount"><i className="fa fa-inr faIcon"></i>{(this.state.tax).toFixed(2)}</td>
									 <td className="masterSubtotalPrice">
										<span className="totalPrice"><i className="fa fa-inr faIcon"></i>{(this.state.amount).toFixed(2)}</span><br/>
									 </td>
								  </tr> 
								  <tr className="" style={{"textAlign" : "right"}}>
									 <td colSpan="5" className="itemDesc">
										<span className="ItemName"> CGST </span>
									 </td>
									 <td className="masterSubtotalPrice">
										<span className="totalPrice"><i className="fa fa-inr faIcon"></i>{(this.state.totalCGST).toFixed(2)}</span><br/>
									 </td>
								  </tr> 
								  <tr className="" style={{"textAlign" : "right"}}>
									 <td colSpan="5" className="itemDesc">
										<span className="ItemName"> SGST </span>
									 </td>
									 <td className="masterSubtotalPrice">
										<span className="totalPrice"><i className="fa fa-inr faIcon"></i>{(this.state.totalSGST).toFixed(2)}</span><br/>
									 </td>
								  </tr> 
								  <tr className="totalClass" style={{"textAlign" : "right", "backgroundColor": "#eee"}}>
									 <td colSpan="4">
										<span className="ItemName"> SubTotal B </span>
									 </td>
									 <td className="masterSubtotalPrice" colSpan="2">
										<span className="totalPrice"><i className="fa fa-inr faIcon"></i>{(this.state.totalAmount).toFixed(2)}</span><br/>
									 </td>
								  </tr> 
								  <tr className="totalClass" style={{"textAlign" : "right", "backgroundColor": "#eee"}}>
									 <td colSpan="4">
										<span className="ItemName"> Rounding Off </span>
									 </td>
									 <td></td>
									 <td className="masterSubtotalPrice">
										<span className="totalPrice"><i className="fa fa-inr faIcon"></i>{(this.state.roundingOff).toFixed(2)}</span><br/>
									 </td>
								  </tr> 
								  <tr className="totalClass" style={{"textAlign" : "right", "backgroundColor": "#eee"}}>
									 <td colSpan="4">
										<span className="ItemName"> Total Amount </span>
									 </td>
									 <td className="masterSubtotalPrice" colSpan="2">
										<span className="totalPrice"><i className="fa fa-inr faIcon"></i>{(this.state.payableAmount).toFixed(2)}</span><br/>
									 </td>
								  </tr>  
								  <tr className="inWords">
									 <td colSpan="6">
										<span className="inWordsName">In Words : </span>
										{/*<span className=""> Rupees </span>*/}
										<span className=""> {this.state.payableAmount ? toWords.convert(this.state.payableAmount, { currency: true, ignoreDecimal: true }) : ""} </span>
										{/*<span className=""> Only.</span>*/}
									 </td>
								  </tr>
								  <tr className="">
									 <td colSpan="6">
										<span className="inWordsName">SAC &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : </span>
										<span className=""> ____________________________________ </span>
									 </td>
								  </tr>
								</tbody>
							 </table>
						  </div>
						  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 businessMsg">
							 THANKS YOU FOR YOUR BUSINESS                                          
						  </div>
						  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 paymentDetails">
							 <h3>PAYMENT INFO</h3>
							 {this.state.bankDetails
								?
								<div>
								  <div>Account # &nbsp;&nbsp;&nbsp;&nbsp; : &nbsp; {this.state.bankDetails.accNumber}</div>
								  <div>A/C Name  &nbsp;&nbsp;&nbsp;&nbsp; : &nbsp; {this.state.bankDetails.accHolderName}</div>
								  <div>Bank Details &nbsp;: &nbsp; {this.state.bankDetails.bankName + "( " + this.state.bankDetails.branchName + " )"}</div>  
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
								{this.state.paymentTerms 
									?
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 marbtm30 termDiv paymentTerms NOpadding">
			                                <div dangerouslySetInnerHTML={{ '__html': this.state.paymentTerms }}></div>
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
}
export default withRouter(MultipleInvoiceReceipt);
