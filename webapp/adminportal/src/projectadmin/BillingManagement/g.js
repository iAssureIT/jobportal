import React, { Component }   from 'react';
import {Route, withRouter}    from 'react-router-dom';
import swal                   from 'sweetalert';
import axios                  from 'axios';
import $                      from 'jquery';
import jQuery                 from 'jquery';
import { savePDF }            from '@progress/kendo-react-pdf';
import { PDFExport }          from '@progress/kendo-react-pdf';
import PageTemplate           from './GeneratePDF/PageTemplate.js';

import 'bootstrap/js/tab.js';

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
    
  componentDidMount(){
    const user_ID = localStorage.getItem("user_ID")  
    this.setState({
      invoiceID : this.props.match.params.invoiceID,
    }, () => {
      this.getData();
    })     
  }

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
          qty           : response.data.qty,
          total         : response.data.amount.toFixed(2),
          rate          : response.data.rate.toFixed(2),
          amount        : response.data.amount.toFixed(2),
          totalAmount   : response.data.totalAmount.toFixed(2),
          payableAmount : response.data.payableAmount.toFixed(2),
          tax           : response.data.tax.toFixed(2),
          totalTax      : response.data.tax.toFixed(2),
          totalSGST     : response.data.SGSTtax.toFixed(2),
          totalCGST     : response.data.CGSTtax.toFixed(2),
          roundingOff   : response.data.roundingOff.toFixed(2) 
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

  goBack(event){
    event.preventDefault();
    this.props.history.push("/billing-management")
  }
   toggleInvoices(event){
      console.log("event = ",event.target.name);
      var id = event.target.id;
      if (id === "invoiceCount") {
        $("#invoices").toggle();
      }

   }
  render() {
    return (
      <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
       	<section className="Content">
       	 	<div className="row">
       	 		<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
       	 			<div className="invoicePageWrapper col-lg-12 col-md-12 col-xs-12 col-sm-12">
                <div className="col-lg-2 col-md-4 col-sm-12 col-xs-12">
                  <i class="fa fa-arrow-left downloadIcon" title="Go Back" aria-hidden="true" onClick={this.goBack.bind(this)}></i>
                </div>
                <div className="pull-right col-lg-2 col-md-4 col-sm-12 col-xs-12">
                  <i class="fa fa-envelope-o downloadIcon" title="Email Invoice" aria-hidden="true" ></i>
                  <i class="fa fa-download downloadIcon" title="Download Invoice" aria-hidden="true" onClick={() => { this.pdfExportComponent.save(); }}></i>
                  <i class="fa fa-print downloadIcon" title="Print Invoice" aria-hidden="true" onClick={this.printTable}></i>
                </div>
                <PDFExport 
                    pageTemplate    = {PageTemplate}
                    forcePageBreak  = ".pdf-page-break"
                    scale           = {0.6}
                    paperSize       = "A4"
                    margin          = "0cm"
                    ref             = {(component) => this.pdfExportComponent = component}
                >
              <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 mrgTop5">
              <div className="table-responsive" id="section-to-print">
  							<table className="table invoiceReceiptTable">
      						<thead>
      							<tr className="dashedBorder">
      								<th>SR</th>
                      {/*<th>LINE Items</th>*/}
      								<th>ITEM DESCRIPTION</th>
      								<th>RATE</th>
                      <th>QTY</th>
                      <th>TAX</th>
                      <th>SUBTOTAL</th>
      							</tr>
      						</thead>
      						<tbody>
                    {this.state.invoiceData 
                      ?                    
                        <tr>
                          <td>1</td>
                          {/*<td>
                          { this.state.invoiceData && this.state.invoiceData.length > 0 
                            ?
                              this.state.invoiceData.map((data,index)=>{
                                return(
                                  <ul className="noPadding" key={index}>
                                    <li>Invoice : <a  title='View Invoice' target='_blank' href={'/view-invoice/'+data.invoiceId}>{data.invoiceNo}</a></li>
                                    <li><a  title='View Profile' target='_blank' href={'/employee-profile/'+data.employeeId}>{data.name}</a> 
                                      {" | " + data.address + " | "}
                                      {data.date}
                                    </li>
                                  </ul>
                                )
                              })
                            : 
                              null
                          }
                          </td>*/}
                          <td>
                            <div className="masterInvoiceDescription"> Master Bill of {" "}
                              <span className="invoiceCount" title="Click to See Single Invoices included in This Master Invoice" 
                                name    = "invoiceCount" id="invoiceCount"
                                onClick = {this.toggleInvoices.bind(this)}> 
                                {this.state.invoiceData.length} 
                              </span>  
                              {(this.state.invoiceData.length > 1 ? " Invoices " : " Invoice ") +
                              (this.state.employeeName ? "of " + this.state.employeeName : "") +
                              (this.state.department ? " of " + this.state.department : "") +
                              (this.state.companyDetails ? " of " + this.state.companyDetails.companyName : '')}
                            </div>
                            <div id="invoices">
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
                          </td>
                          <td>{this.state.rate}</td>
                          <td>{this.state.qty}</td>
                          <td className="taxRow">
                            {/*<div>
                              <div className="taxPer">{data.taxPercentage}</div>
                              <div className="taxAmt">*/}
                              {this.state.tax}
                              {/*</div>
                            </div>*/}
                          </td>
                          <td className="TextRight">{this.state.amount}</td>
                        </tr>
                      
                    :
                    <tr></tr>
                  }
                    <tr className="dashedBorder">
                      <td className="TextRight" colSpan="4">SubTotal A</td>
                      <td className="TextRight">{this.state.tax}</td>
                      <td className="TextRight">{this.state.amount}</td>
                    </tr>
                    <tr>
                      <td className="TextRight" colSpan="5">SGST</td>
                      <td className="TextRight">{this.state.totalSGST}</td>
                    </tr>
                    <tr>
                      <td className="TextRight" colSpan="5">CGST</td>
                      <td className="TextRight">{this.state.totalCGST}</td>
                    </tr>
                    <tr>
                      <td colSpan="4"></td>
                      <td className="dashedBorder" colSpan="3"></td>
                    </tr>
                    <tr>
                      <td className="TextRight" colSpan="5">SubTotal B </td>
                      <td className="TextRight">{this.state.totalAmount}</td>
                    </tr>
                    {/*<tr>
                                          <td className="TextRight" colSpan="6">Discount</td>
                                          <td>{this.state.discount}</td>
                                        </tr>*/}
                    <tr>
                      <td className="TextRight" colSpan="5">Round Off</td>
                      <td className="TextRight">{this.state.roundingOff}</td>
                    </tr>
                    <tr>
                      <td colSpan="4"></td>
                      <td className="dashedBorder" colSpan="3"></td>
                    </tr>
                    <tr>
                      <td className="TextRight" colSpan="5">Total Amount</td>
                      <td className="TextRight">{this.state.payableAmount}</td>
                    </tr>
      						</tbody>
      					</table>
      				</div>
              </div>
              </PDFExport>
              </div>
       	 		</div>
       	 	</div>
      	</section>
     	</div>
    );
  }
}
export default withRouter(MultipleInvoiceReceipt);
