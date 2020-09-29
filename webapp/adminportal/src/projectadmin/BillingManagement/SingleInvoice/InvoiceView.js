import React, { Component }   from 'react';
import {Route, withRouter} 	  from 'react-router-dom';
import swal                   from 'sweetalert';
import axios 				  from 'axios';
import $ 					  from 'jquery';
import jQuery 				  from 'jquery';
import moment                 from 'moment';

import SingleInvoice 		  from './SingleInvoice.js';
import TripSummary   		  from './TripSummary.js';
import DutySlip   		  	  from './DutySlip.js';
import TripExpenses   		  from './TripExpenses.js';
import Tracking   	    	  from './Map.js';
import BookingProfile   	  from '../../BookingMaster/BookingProfile.js';

import { savePDF, PDFExport } from '@progress/kendo-react-pdf';

class InvoiceView extends Component {
	constructor(props){
		super(props);
		this.state = {
			invoiceData  : {
					invoiceDetails 		: '',
					appCompanyDetails   : '',
					bankDetails    		: '',
					paymentTerms 		: '',
			},
		}
	}
	/*======= componentDidMount() =======*/
	componentDidMount(){
		this.getAppCompanyDetails(1);
		this.getBankDetails();
		this.getPaymentTerms();
		var invoiceID = this.props.match.params.invoiceID;		
		this.setState({
			invoiceID : invoiceID
		}, ()=>{
			console.log("invoiceID = ",this.state.invoiceID);
			this.getInvoiceDetails(this.state.invoiceID);
		})
		console.log("invoiceData = ",this.state.invoiceData);
	}
	/*======= getInvoiceDetails() =======*/
	getInvoiceDetails(invoiceID){
		axios.get("/api/billing/get/invoice/" + invoiceID)
         .then((response) => {
            console.log("invoiceDetails = ",response.data);
            this.setState(prevState => ({
			    invoiceData: {                   
			        ...prevState.invoiceData,    
			        invoiceDetails : response.data 
			    } 
				}));	
				console.log("invoiceData = ",this.state.invoiceData); 
         })
         .catch((error) => {
            console.log("Error getInvoiceDetails() = ",error);
         })
	}
	/*======= getAppCompanyDetails() =======*/
	getAppCompanyDetails(companyID){
		axios.post('/api/entitymaster/get/getAdminCompany')
         .then((response) => {
            console.log("AppCompany = ", response.data[0])
            this.setState(prevState => ({
			    invoiceData: {                   
			        ...prevState.invoiceData,    
			        appCompanyDetails : response.data[0] 
			    } 
				}));	
				console.log("invoiceData = ",this.state.invoiceData); 
         })
         .catch((error) => {
            console.log("Error getAppCompanyDetails() = ",error);
         })
	}
	/*======= getBankDetails() =======*/
	getBankDetails(){
		axios.get('/api/companysettings/list')
         .then((response) => {
            console.log("BankDetails = ", response.data[0])
            if(response.data && response.data.length > 0){
	            this.setState(prevState => ({
				    invoiceData: {                   
				        ...prevState.invoiceData,    
				        bankDetails : response.data[0] 
				    } 
				}));
			}	
			console.log("invoiceData = ",this.state.invoiceData); 
         })
         .catch((error) => {
            console.log("Error getBankDetails() = ",error);
         })
	}
	/*======= getPaymentTerms() =======*/
	getPaymentTerms(){
      	axios.get('/api/paymentterms/get/list')
           .then((response)=>{
            	console.log("PaymentTerms = ", response.data[0]);
            	if(response.data && response.data.length > 0){
	            	this.setState(prevState => ({
					    invoiceData : {                   
					        ...prevState.invoiceData,    
					        paymentTerms : response.data[0].paymentTerms
					    } 
					}));
				}	
				console.log("invoiceData = ",this.state.invoiceData); 
         })
         .catch((error) => {
            console.log("Error getPaymentTerms() = ",error);
         })
    }
  /*======= render() =======*/
	render() {		
		return (
			<div>
				<div className="pdfDownload col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<i class="fa fa-envelope-o downloadIcon" title="Email Invoice Docket" aria-hidden="true" ></i>
					<i class="fa fa-download downloadIcon" title="Download Invoice Docket" aria-hidden="true" onClick={() => { this.pdfExportComponent.save(); }}></i>
					<i class="fa fa-print downloadIcon" title="Print Invoice Docket" aria-hidden="true" ></i>
	            </div>
	            <PDFExport 
	                forcePageBreak	= ".pdf-page-break"
	                scale			= {0.6}
	                paperSize		= "A4"
	                bottom 			= "0.5cm"
	                margin      	= "0.1cm"
	                ref 			= {(component) => this.pdfExportComponent = component}
	            >
			      <SingleInvoice invoiceData = {this.state.invoiceData} />
			      <TripSummary   invoiceData = {this.state.invoiceData} />
			      {/*<TripExpenses  invoiceData = {this.state.invoiceData} />*/}
			      <DutySlip      invoiceData = {this.state.invoiceData} />  
			      {/*<Tracking 	 invoiceData = {this.state.invoiceData.invoiceDetails} />*/}
		        </PDFExport>
      		</div>    
    	);		
	}
}

export default withRouter(InvoiceView);

