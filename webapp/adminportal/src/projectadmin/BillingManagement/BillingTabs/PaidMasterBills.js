import React, { Component }  	from 'react';
import {Route, withRouter} 	  from 'react-router-dom';
import swal                  	from 'sweetalert';
import axios 				 		      from 'axios';
import $ 			       	 	      from 'jquery';
import jQuery 			     		  from 'jquery';
import moment                	from 'moment';
import 'jquery-validation';

import InvoiceTable           from '../InvoiceTable/InvoiceTable.js';

class PaidMasterBills extends Component {
	constructor(props){
		super(props);
		this.state = {
			company              	    : "",
         companyArray         	: [],
         department           	: "",
         departmentArray      	: [],
         fromdate             	: '',
         todate               	: '',
      	idArray       				  : [],
      	tableId       				  : "PaidBills",
	  		RecordsCount  				  : '',
      	paidMasterRecordsTable  : [],
	    	tableObjects  				  : {
					                        paginationApply  : true,
					                        searchApply      : false
                      			     },
	    	tableHeading  				  : {
									        		    companyName      : "DESCRIPTION",
					                        invoiceNumber    : "INVOICE NO.",
					                        amount           : "AMOUNT",
					                        gst              : "GST",
					                        payment          : "PAYMENT",
					                        balance          : "BALANCE",
					                        status           : "STATUS",
					                        action           : "ACTIONS"
			    				              },
        startRange            : 0,
        limitRange            : 10,
		}

	   this.viewPaidMasterInvoice  = this.viewPaidMasterInvoice.bind(this);
	   this.toggleInvoices         = this.toggleInvoices.bind(this);
     this.showData               = this.showData.bind(this);
	}

	/*======== componentDidMount() ========*/
  	componentDidMount(){
  		this.getCompany();
      this.getDepartment();
	   this.getAllPaidMasterInvoices(this.state.startRange, this.state.limitRange);

	   const user_ID = localStorage.getItem("user_ID");
	   this.setState({
	      user_ID      : user_ID,
	   }, ()=>{});

	   window.viewPaidMasterInvoice  = this.viewPaidMasterInvoice;
	   window.toggleInvoices         = this.toggleInvoices;
  	}

  	/*======== componentWillReceiveProps() ========*/
  	componentWillReceiveProps(nextprops){
      this.getAllPaidMasterInvoices(this.state.startRange, this.state.limitRange);
  	}

  	/*======== viewPaidMasterInvoice() ========*/
  	viewPaidMasterInvoice(id){
      console.log("view id = ", id);
      this.props.history.push('/view-receipt/'+id);
  	}

  	/*======= toggleInvoices() =======*/
  	toggleInvoices(id){
      // console.log("toggle id = ",id);
      // var element = document.getElementById("invoices-"+id);

      // console.log("element = ",element);
      // console.log("style = ",element.style.display);
      // if (element.style.display === "none") {
      //     element.style.display = "block";
      // } else {
      //     element.style.display = "none";
      //  }
      // if (id === ("invoiceCount-"+id)) {
      //   $("#invoices-"+id).toggle();
      // }
      console.log("view id = ", id);
      this.props.history.push('/view-receipt/'+id);
  	}

  	/*======== getAllPaidMasterInvoices() ========*/
  	getAllPaidMasterInvoices(startRange, limitRange){
      var limits = {
          startRange : startRange,
          limitRange : limitRange
      }
	   axios.post('/api/invoiceMaster/get/paid/allList',limits)
	        .then((response)=>{
	          	if(response.data && response.data[0].paginatedResults && response.data[0].paginatedResults.length > 0){ 
	            	console.log('Paid Master Invoices => ',response.data)
	            	var tableData = response.data[0].paginatedResults.map((a, i)=>{ 
		              	return{ 
		                  	companyName   	: "<div class=companyNameCol>" + a.companyDetails[0].companyName  + "</div>",
		                  	invoiceNumber 	: "<div class=invoiceNumCol>"+
                                             "<a class='masterInvoiceNum' aria-hidden='true' title='click to view' id='" + a._id + "' onclick=window.viewPaidMasterInvoice('" +a._id +"')>" + a.invoiceNumber + 
                                            "</a></div>",
		                  	amount        	: "<div class=amountCol><i class='fa fa-inr faIcon'></i>"   + (a.payableAmount).toLocaleString()                  + "</div>",
		                  	gst           	: "<div class=gstCol><i class='fa fa-inr faIcon'></i>"      + (a.tax).toLocaleString(undefined, {maximumFractionDigits:2})               + "</div>",
		                  	payment       	: "<div class=paymentCol><i class='fa fa-inr faIcon'></i>"  + (a.payment).toLocaleString()                        + "</div>",
		                  	balance       	: "<div class=balanceCol><i class='fa fa-inr faIcon'></i>"  + (a.balance ? (a.balance).toLocaleString() : 0)      + "</div>",
		                  	status        	: "<div class="+ a.status.toLowerCase() +">"                + a.status                         + "</div>",
		                  	action        	: "<div class='actionButtons paiInvoiceAction'>"+
		                                    	"<a aria-hidden='true' title='click to view' id='" + a._id + "' onclick=window.viewPaidMasterInvoice('" +a._id +"')><i class='fa fa-eye'></i></a>"+
		                                  	  "</div>",
		                  	id            	: a._id
		                }
		                
		            });
		            this.setState({
		                paidMasterRecordsTable : tableData,
                    RecordsCount : response.data[0].totalCount && response.data[0].totalCount.length > 0 ? response.data[0].totalCount[0].count : 0
		            })
	       		}
		     })
		     .catch((err)=>{
		         console.log("Error getAllPaidMasterInvoices = ",err);      
		     })
  	} 

  	/*======== getUnpaidIds() ========*/
  	getPaidIds(ids){
	   console.log('ids => ',ids)
	   this.setState({idArray:ids})
  	}

  	/*======== getCompany() ========*/
   getCompany() {
      axios.get('/api/entitymaster/getAllEntities')
         .then((response) => {
            this.setState({
               companyArray: response.data
            }, () => {
               console.log("Company Array => ", this.state.companyArray);
            })
         }).catch(function (error) {
               console.log("Error getCompany() => ", error);
         });
   }

   /*======== getDepartment() ========*/
   getDepartment() {
      axios.get('/api/departmentmaster/get/list')
         .then((response) => {
            this.setState({
               departmentArray : response.data
            }, () => {
               console.log("Department Array => ", this.state.departmentArray);
            })
         }).catch(function (error) {
               console.log("Error getDepartment() => ", error);
         });
  }

   /*======== handleChange() ========*/
   handleChange(event) {
      event.preventDefault();
      const { name, value } = event.target;

      console.log("name => ", name);
      console.log("value => ", value);
        
      if(name == 'fromdate' && this.state.todate === ''){
         this.setState({
            todate      : value,
            fromdate    : value
         },()=>{
            this.getData(this.state.startRange, this.state.limitRange);
            console.log("todate => ", this.state.todate);
            console.log("fromdate => ", this.state.fromdate);
         });  
      }else if(name == 'fromdate' && this.state.todate){
         var dateCompare =  (moment(value).isBefore(this.state.todate) || moment(value).isSame(this.state.todate));

         if(dateCompare === true){
            this.setState({
               fromdate : value,
            },()=>{this.getData(this.state.startRange, this.state.limitRange)});
         }else{
            swal("Alert",'From-Date shold be less than To-Date');
               this.setState({
                  fromdate : this.state.todate,
            },()=>{this.getData(this.state.startRange, this.state.limitRange)});
         }
      }else if(name == 'todate'){
         var dateCompare =  (moment(value).isAfter(this.state.fromdate) || moment(value).isSame(this.state.fromdate));

         if(dateCompare === true){
            this.setState({
               todate : value,
            },()=>{this.getData(this.state.startRange, this.state.limitRange)});
         }else{
            swal("Alert",'To-Date shold be greter than From-Date');
            this.setState({
               todate : this.state.fromdate,
            },()=>{this.getData(this.state.startRange, this.state.limitRange)});
         }
      }else{
         this.setState({
            [name] : value
         },()=>{this.getData(this.state.startRange, this.state.limitRange)});
      }
   }

   /*======== previousDate() ========*/
   previousDate(event){
      event.preventDefault();
      var id            = event.target.id;
      var targetInputId = id.split("-");

      console.log("previousDate id = ",id);
      if (this.state[targetInputId[0]]) {
         var selectedDate1 = this.state[targetInputId[0]];
         var selectedDate  = selectedDate1.replace(/-/g, '\/');

         var newDate1      = new Date(selectedDate);
         var newDate2      = new Date(newDate1.getTime() - (24*60*60*1000) );
         var newDate3      = new Date(newDate2);

         var dd            = newDate3.getDate();
         var mm            = newDate3.getMonth()+1; //January is 0!
         var yyyy          = newDate3.getFullYear();

         if(dd < 10){
             dd = '0' + dd;
         }
         if(mm < 10){
             mm = '0' + mm;
         }

         var newDate3 = yyyy+'-'+mm+'-'+dd;

         if (targetInputId[0] === "todate"){            
            var dateCompare =  (moment(newDate3).isAfter(this.state.fromdate) || moment(newDate3).isSame(this.state.fromdate));

            if(dateCompare === true){
               this.setState({
                  [targetInputId[0]] : newDate3,
               },()=>{this.getData(this.state.startRange, this.state.limitRange); });
            }else{
               swal("Alert",'To-Date shold be greter than From-Date');
               this.setState({
                  [targetInputId[0]] : this.state.fromdate,
               },()=>{this.getData(this.state.startRange, this.state.limitRange)});
            }
         }else{
            this.setState({
               [targetInputId[0]] : newDate3,
            },()=>{this.getData(this.state.startRange, this.state.limitRange); });
         }
         console.log("previous newDate = ",newDate3);
      }
   }

   /*======== handleSearchChange() ========*/
   nextDate(event){
      event.preventDefault();
      var id            = event.target.id;
      var targetInputId = id.split("-");

      console.log("previousDate id = ",id);        
      if (this.state[targetInputId[0]]) {
         var selectedDate1 = this.state[targetInputId[0]];
         var selectedDate  = selectedDate1.replace(/-/g, '\/');

         var newDate1      = new Date(selectedDate);
         var newDate2      = new Date(newDate1.getTime() + (24*60*60*1000) );
         var newDate3      = new Date(newDate2);

         var dd            = newDate3.getDate();
         var mm            = newDate3.getMonth()+1; //January is 0!
         var yyyy          = newDate3.getFullYear();

         if(dd < 10){
             dd = '0'+dd;
         }
         if(mm < 10){
             mm = '0' + mm;
         }
         
         var newDate3 = yyyy+'-'+mm+'-'+dd;

         if (targetInputId[0] === "fromdate"){            
            var dateCompare =  (moment(newDate3).isBefore(this.state.todate) || moment(newDate3).isSame(this.state.todate));

            if(dateCompare === true){
               this.setState({
                  [targetInputId[0]] : newDate3,
               },()=>{this.getData(this.state.startRange, this.state.limitRange); });
            }else{
               swal("Alert",'From-Date shold be less than To-Date');
               this.setState({
                  [targetInputId[0]] : this.state.todate,
               },()=>{this.getData(this.state.startRange, this.state.limitRange)});
            }
         }else{
            this.setState({
               [targetInputId[0]] : newDate3,
            },()=>{this.getData(this.state.startRange, this.state.limitRange); });
         }
         console.log("next newDate = ",newDate3);
     }
   }

   /*======== getData() ========*/
   getData(startRange, limitRange){
      this.setState({
         paidMasterRecordsTable : []
      })
      if(this.state.fromdate && this.state.todate){
         var startDate = moment(this.state.fromdate).startOf('day'); // set to 12:00 am today
         var endDate   = moment(this.state.todate).endOf('day'); // set to 23:59 pm today
      }else{
         var currYear  = moment().format('YYYY');
         var startDate = new Date("1/1/" + currYear);
         var endDate   = new Date (startDate.getFullYear(), 11, 31);
      }
        
      var formvalues = {
         company     : this.state.company,
         department  : this.state.department,
         startDate   : startDate,
         endDate     : endDate,
         startRange  : startRange,
         limitRange  : limitRange,
         status      : "Paid",
      }
      console.log("formvalues => ",formvalues);
         axios.post('/api/invoiceMaster/get/filteredPaidMasterBills',formvalues)
           .then((response)=>{
               console.log("Paid Bills data= ", response.data);

               if(response.data && response.data[0].paginatedResults && response.data[0].paginatedResults.length > 0){
                  var tableData = response.data[0].paginatedResults.map((a, i)=>{ 
                  return{ 
                     companyName   : "<div class=companyNameCol>" + a.companyDetails[0].companyName  + "</div>",
                     invoiceNumber : "<div class=invoiceNumCol>"+
                                       "<a class='masterInvoiceNum' aria-hidden='true' title='click to view' id='" + a._id + "' onclick=window.viewPaidMasterInvoice('" +a._id +"')>" + a.invoiceNumber + 
                                     "</a></div>",
                     amount        : "<div class=amountCol><i class='fa fa-inr faIcon'></i>"   + (a.payableAmount).toLocaleString()                  + "</div>",
                     gst           : "<div class=gstCol><i class='fa fa-inr faIcon'></i>"      + (a.tax).toLocaleString(undefined, {maximumFractionDigits:2})               + "</div>",
                     payment       : "<div class=paymentCol><i class='fa fa-inr faIcon'></i>"  + (a.payment).toLocaleString()                        + "</div>",
                     balance       : "<div class=balanceCol><i class='fa fa-inr faIcon'></i>"  + (a.balance ? (a.balance).toLocaleString() : 0)      + "</div>",
                     status        : "<div class="+ a.status.toLowerCase() +">"                + a.status                         + "</div>",
                     action        : "<div class='actionButtons unpaiInvoiceAction'>"+
                                       "<a aria-hidden='true' title='Click to Change Status to Paid' id='" + a._id + "' onclick=window.changeStatusToPaid('" +a._id +"')>Paid</a>"+
                                       "<a aria-hidden='true' title='click to view' id='" + a._id + "' onclick=window.viewMasterInvoice('" +a._id +"')><i class='fa fa-eye'></i></a>"+
                                     "</div>",
                     id            : a._id
                  }
                    
               });
               this.setState({
                  paidMasterRecordsTable : tableData,
                  RecordsCount           : response.data[0].totalCount && response.data[0].totalCount.length > 0 ? response.data[0].totalCount[0].count : 0,
               }, ()=>{})
            }else{
               this.setState({
                  paidMasterRecordsTable : []
               })
            }
        })
        .catch((err)=>{
            console.log("Error getData() => ", err);
        })
   }

   /*======== showMoreFilters() ========*/
   showMoreFilters(event){
      event.preventDefault();
      var filterBtn = event.target;
      var element   = document.getElementById("paidBillsMoreFilter");
       
      if (element) {
         $("#paidBillsMoreFilter").toggle();
      }
      if ((element.style.display) === "none") {
         filterBtn.innerHTML   = "<i class='fa fa-sliders' aria-hidden='true'></i> More Filters";
      } else {
         filterBtn.innerHTML   = "<i class='fa fa-sliders' aria-hidden='true'></i> Hide Filters";
      }
   }

   /*======== showMoreFilters() ========*/
   resetFilters(event){
      event.preventDefault();
        
      this.setState({
         company     : "",
         department  : "",
         fromdate    : "",
         todate      : ""
      }, ()=>{
         this.getAllPaidMasterInvoices(this.state.startRange, this.state.limitRange);
      })
   }

    /*======== showData() ========*/
    showData(startRange, limitRange){
        if (this.state.company   || this.state.department  || 
            this.state.fromdate  || this.state.todate) {
            this.getData(startRange, limitRange);
            console.log("filetr");
        }else{
            this.getAllPaidMasterInvoices(startRange, limitRange);
            console.log("normal");
        }
    } 

  	/*======== render() ========*/
	render() {
		return (
	     	<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding tableComponent">
			   <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding mrgTop1">
               <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12  form-group">
                  <label className="labelform ticketPriceName col-lg-12 col-md-12 col-sm-12 col-xs-12">Company</label>
                  <div className="custom-select input-group col-lg-12 col-md-12 col-sm-12 col-xs-12" id="citytype" >                      
                     <span className="input-group-addon custom-select-icon"><img src="/billingManagement/company.png"/></span>
                     <select id="company" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.company} ref="company" name="company" onChange={this.handleChange.bind(this)}>
                        <option disabled value="">--Select--</option>
                        <option value="All">Show All</option>
                           {
                              this.state.companyArray && this.state.companyArray.length > 0 
                              ?
                                 this.state.companyArray.map((data, i)=>{
                                     return(
                                         <option key={i} value={data._id}>{data.companyName} </option>
                                     );
                                 })
                              :
                                 <option disabled value="">No Company Found</option>
                           }
                     </select>
                  </div>
               </div>
               <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                  <label className="labelform ticketPriceName col-lg-12 col-md-12 col-sm-12 col-xs-12">Department</label>
                  <div className="custom-select input-group col-lg-12 col-md-12 col-sm-12 col-xs-12" id="citytype" >                      
                     <span className="input-group-addon custom-select-icon"><img src="/billingManagement/department.png"/></span>
                     <select id="department" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.department} ref="department" name="department" onChange={this.handleChange.bind(this)}>
                        <option disabled value="">--Select--</option>
                        <option value="All">Show All</option>
                           {
                              this.state.departmentArray && this.state.departmentArray.length > 0 
                              ?
                                 this.state.departmentArray.map((data, i)=>{
                                    return(
                                       <option key={i} value={data._id}>{data.department} </option>
                                    );
                                 })
                              :
                                 <option disabled value="">No Department Found</option>
                           }
                     </select>
                  </div>
               </div>
               <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                  <label className="labelform ticketPriceName col-lg-12 col-md-12 col-sm-12 col-xs-12">From Date</label>
                  <div className="custom-date input-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
                     <span className="input-group-addon custom-date-icon-left" id="fromdate-prev" onClick={this.previousDate.bind(this)}><img src="/billingManagement/left-arrow.png" id="fromdate-arrow-left"/></span>
                     <input className="form-control custom-date1" type="date" name="fromdate" id="fromdate" value={this.state.fromdate} onChange={this.handleChange.bind(this)}/>
                     <span className="input-group-addon custom-date-icon-right" id="fromdate-next" onClick={this.nextDate.bind(this)}><img src="/billingManagement/right-arrow.png" id="fromdate-arrow-right"/></span>                            
                  </div>
               </div>                          
               <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                  <label className="labelform ticketPriceName col-lg-12 col-md-12 col-sm-12 col-xs-12">To Date</label>
                  <div className="custom-date input-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
                     <span className="input-group-addon custom-date-icon-left" id="todate-prev" onClick={this.previousDate.bind(this)}><img src="/billingManagement/left-arrow.png" id="todate-arrow-left"/></span>
                     <input className="form-control custom-date1" type="date" name="todate" id="todate" value={this.state.todate} onChange={this.handleChange.bind(this)}/>
                     <span className="input-group-addon custom-date-icon-right" id="todate-next" onClick={this.nextDate.bind(this)}><img src="/billingManagement/right-arrow.png" id="todate-arrow-right"/></span>                            
                  </div>
               </div>                          
            </div>
            <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12"> 
               <div className="filterButton" onClick={this.showMoreFilters.bind(this)}>
                  <i className="fa fa-sliders" aria-hidden="true"></i> More Filters
               </div>
               <div className="resetfilterButton" onClick={this.resetFilters.bind(this)}>
                  <i className="fa fa-refresh" aria-hidden="true"></i> Reset Filters
               </div>               
            </div>
            <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding generateBillMoreFilter" id="paidBillsMoreFilter"> 
               <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 mrgTop1 noMoreFilters">                              
                  No More Filters                         
               </div>
            </div>
			   <InvoiceTable 
	          	tableHeading = {this.state.tableHeading}
	          	dataCount    = {this.state.RecordsCount}
	          	tableData    = {this.state.paidMasterRecordsTable}
	          	tableObjects = {this.state.tableObjects}
	          	getIds       = {this.getPaidIds.bind(this)}
	          	tableId      = {this.state.tableId}
              getData      = {this.showData.bind(this)}
		      />	       	
		   </div>
		);		
	}
}

export default withRouter(PaidMasterBills);