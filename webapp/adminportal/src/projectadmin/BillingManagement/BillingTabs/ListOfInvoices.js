import React, { Component }     from 'react';
import $                        from 'jquery';
import jQuery                   from 'jquery';
import swal                     from 'sweetalert';
import axios                    from 'axios';
import moment                   from 'moment';
import _                        from 'underscore';

import GenerateBill             from "./GenerateBill.js";
import AllBills                 from "./AllBills.js";
import UnpaidBills              from "./UnpaidBills.js";
import PaidBills                from "./PaidBills.js";
import UnpaidMasterBills        from "./UnpaidMasterBills.js";
import PaidMasterBills          from "./PaidMasterBills.js";
import CancelledBills           from "./CancelledBills.js";

import "../BillingManagement.css";
import 'bootstrap/js/tab.js';

class ListOfInvoices extends Component {     
   constructor(props) {
      super(props);
      this.state = {
         tabtype       : "GenerateBills",
      };
      this.handleChange = this.handleChange.bind(this);
   }
   
   /*========= componentDidMount() ==========*/
   componentDidMount() {
      axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem("token");
   }

   /*========= changeTab() ==========*/
   changeTab = (data)=>{
      this.setState({
         tabtype : data,
      })
      this.getAllInvoices()
   }

   /*========= handleChange() ==========*/
   handleChange(event) {
      const name = event.target.name;

      this.setState({
         [name]: event.target.value
      });   
   }

   /*========= getAllInvoices() ==========*/
   getAllInvoices(){
      axios.get('/api/billing/get/allList')
      .then((response)=>{
         if(response.data && response.data.length > 0){ 
            var tableData = response.data.map((a, i)=>{             
               return{ 
                  companyName     : a.companyDetails[0].companyName,
                  invoiceNumber   : a.invoiceNumber,
                  amount          : a.totalAmount,
                  gst             : 10 + "%",
                  payment         : a.payment,
                  balance         : a.balance,
                  status          : "<div class="+ a.statusValue.toLowerCase() +">" + a.statusValue + "</div>",
                  id              : a._id
               }
            }) ;
            // console.log("tableData = ",tableData);          
            // var tableData = response.data;
            this.setState({
               invoicesRecordsTable : tableData
            }, ()=>{
               // console.log("invoicesRecordsTable = ",this.state.invoicesRecordsTable)
            })
         }
      })
      .catch((err)=>{
         swal(err)
      })
   }

   /*========= render() ==========*/
   render() {
      return (
         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOPadding">
            <section className="content">   
               <div className="pageContent col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="box-header with-border manageLocationTitle">
                     <h4 className="">Billing Management</h4>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOPadding">
                     <div className="reportWrapper col-lg-12 nopadding">
                        {/*<div className="nav-center col-lg-10 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12">*/}
                        {/*<div className="nav-center col-lg-12 col-md-12 col-sm-12 col-xs-12" id="navigation-wrapper">*/}
                        <div className="nav-center col-lg-12 col-md-12 col-sm-12 col-xs-12" id="bill-navigation-wrapper">
                           {/*<ul className="nav nav-pills nav_pills col-lg-12 col-md-12 col-sm-12 col-xs-12" id="top-navigation">*/}
                           <ul className="nav nav-pills nav_pills" id="bill-navigation">
                              <li className="active billingTab">
                                 <a href="#GenerateBills" data-toggle="tab" className="TabName" onClick={()=>this.changeTab('GenerateBills')} >
                                    Generate Bills
                                 </a>
                              </li>
                              <li className="billingTab">
                                 <a href="#AllBills" data-toggle="tab" className="TabName" onClick={()=>this.changeTab('AllBills')}>
                                    All Bills
                                 </a>
                              </li>
                              <li className="billingTab">
                                 <a href="#UnpaidBills" data-toggle="tab" className="TabName" onClick={()=>this.changeTab('UnpaidBills')}>
                                    Unpaid Bills
                                 </a>
                              </li>
                              <li className="billingTab">
                                 <a href="#PaidBills" data-toggle="tab" className="TabName"  onClick={()=>this.changeTab('PaidBills')} >
                                    Paid Bills
                                 </a>
                              </li>
                              <li className="billingTab">
                                 <a href="#UnpaidMasterBills" data-toggle="tab" className="TabName" onClick={()=>this.changeTab('UnpaidMasterBills')}>
                                    Unpaid Master Bills
                                 </a>
                              </li>
                              <li className="billingTab">
                                 <a href="#PaidMasterBills" data-toggle="tab" className="TabName"  onClick={()=>this.changeTab('PaidMasterBills')} >
                                    Paid Master Bills
                                 </a>
                              </li>
                              <li className="billingTab">
                                 <a href="#CancelledBills" data-toggle="tab" className="TabName" onClick={()=>this.changeTab('CancelledBills')} >
                                    Cancelled Bills
                                 </a>
                              </li>             
                           </ul>
                        </div>
                        <div className="tab-content col-lg-12 col-md-12 col-sm-12 col-xs-12">
                           <div className="tab-pane active" id="GenerateBills">
                              <GenerateBill />
                           </div>
                           <div className="tab-pane" id="AllBills">
                              <AllBills getAllInvoices={this.getAllInvoices.bind(this)} />
                           </div>
                           <div className="tab-pane" id="UnpaidBills">
                              <UnpaidBills />
                           </div>
                           <div className="tab-pane" id="PaidBills">
                              <PaidBills />
                           </div>
                           <div className="tab-pane" id="UnpaidMasterBills">
                              <UnpaidMasterBills />
                           </div>
                           <div className="tab-pane" id="PaidMasterBills">
                              <PaidMasterBills />
                           </div>
                           <div className="tab-pane" id="CancelledBills">
                              <CancelledBills />
                           </div>
                        </div>                        
                     </div>
                  </div>
               </div>
            </section>
         </div>
      );
   }
}
export default ListOfInvoices;

