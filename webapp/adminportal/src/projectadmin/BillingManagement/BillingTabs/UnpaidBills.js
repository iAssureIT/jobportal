import React, { Component }  from 'react';
import {Route, withRouter}   from 'react-router-dom';
import swal                  from 'sweetalert';
import axios 				 from 'axios';
import $ 					 from 'jquery';
import jQuery 				 from 'jquery';
import moment                from 'moment';
import 'jquery-validation';

import InvoiceTable from '../InvoiceTable/InvoiceTable.js';

class UnpaidBills extends Component {
	constructor(props){
      super(props);
      this.state = {
            company                 : "",
            companyArray            : [],
            department              : "",
            departmentArray         : [],
            idArray                 : [],
            tableId                 : "AllUnpaidBills",
            fromdate                : '',
            showBtn                 : false,
            todate                  : '',
            RecordsCount            : '',
            invoicesRecordsTable    : [],
            tableObjects            : {
                                        paginationApply : true,
                                        searchApply     : false
                                    },
            tableHeading            : {
                                          companyName    : "COMPANY NAME",
                                          invoiceNumber  : "INVOICE NO.",
                                          amount         : "AMOUNT",
                                          gst            : "GST",
                                          payment        : "PAYMENT",
                                          balance        : "BALANCE",
                                          status         : "STATUS",
                                          action         : "ACTIONS"
                                      },
            startRange              : 0,
            limitRange              : 10,
      }
        this.viewSingleUnpaidInvoice = this.viewSingleUnpaidInvoice.bind(this);
        this.showData                = this.showData.bind(this);
   }

    /*======== componentDidMount() ========*/
    componentDidMount(){
        const user_ID = localStorage.getItem("user_ID");
        window.viewSingleUnpaidInvoice = this.viewSingleUnpaidInvoice;
        this.getAllUnpaidInvoices(this.state.startRange, this.state.limitRange);
        this.getCompany();
        this.getDepartment();
        this.setState({
            user_ID      : user_ID,
        }, ()=>{})      
    }

    /*======== componentWillReceiveProps() ========*/
    componentWillReceiveProps(nextprops){
        // nextprops.getAllUnpaidInvoices()
        this.getAllUnpaidInvoices(this.state.startRange, this.state.limitRange);
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
              departmentArray: response.data
            }, () => {
                console.log("Department Array => ", this.state.departmentArray);
            })
          }).catch(function (error) {
                console.log("Error getDepartment() => ", error);
          });
    }

    /*======== viewSingleUnpaidInvoice() ========*/
    viewSingleUnpaidInvoice(id){
        console.log("view id = ", id);
        this.props.history.push('/view-invoice/'+id)
    }

    /*======== getAllUnpaidInvoices() ========*/
    getAllUnpaidInvoices(startRange, limitRange){
        var limits = {
            startRange : startRange,
            limitRange : limitRange
        }
        axios.post('/api/billing/get/allUnpaidList',limits)
        .then((response)=>{
            if(response.data && response.data[0].paginatedResults && response.data[0].paginatedResults.length > 0){ 
                var tableData = response.data[0].paginatedResults.map((a, i)=>{ 
                    var gst = 0;
                    for(var j = 0, len = a.lineItems.length; j < len; j++) {
                        if(a.lineItems[j].billingCode === 401 || a.lineItems[j].billingCode === 402){
                            gst += a.lineItems[j].taxAmount;  // Iterate over your first array and then grab the second element add the values up
                        }
                    }
                    return{ 
                        companyName     : "<div class=companyNameCol>" + a.companyDetails[0].companyName              + "</div>",
                        invoiceNumber   : "<div class=invoiceNumCol>"+
                                             "<a class='masterInvoiceNum' aria-hidden='true' title='click to view' id='" + a._id + "' onclick=window.viewSingleUnpaidInvoice('" +a._id +"')>" + a.invoiceNumber + 
                                           "</a></div>",
                        amount          : "<div class=amountCol><i class='fa fa-inr faIcon'></i>"  + (a.totalAmount.toLocaleString())    + "</div>",
                        gst             : "<div class=gstCol><i class='fa fa-inr faIcon'></i>"     + gst.toLocaleString(undefined, {maximumFractionDigits:2}) + "</div>",
                        payment         : "<div class=paymentCol><i class='fa fa-inr faIcon'></i>" + (a.payment).toLocaleString()        + "</div>",
                        balance         : "<div class=balanceCol><i class='fa fa-inr faIcon'></i>" + (a.balance.toLocaleString())        + "</div>",
                        status          : "<div class="+ a.statusValue.toLowerCase() +">"          + a.statusValue    + "</div>",
                        action          : "<div class='actionButtons invoiceAction'>"+
                                                "<a aria-hidden='true' title='click to edit' id='" + a._id + "'><i class='fa fa-pencil'></i></a>"+
                                                "<a aria-hidden='true' title='click to view' id='" + a._id + "' onclick=window.viewSingleUnpaidInvoice('" +a._id +"')><i class='fa fa-eye'></i></a>"+
                                           "</div>",
                        id              : a._id
                    }
                    {/*action          : "<div class='actionButtons invoiceAction'><a><i class='fa fa-pencil' aria-hidden='true' title='click to edit' id='" + a._id + "'onclick=window.("' +a._id +'")></i></a></div>",*/}                     
                });
                this.setState({
                    invoicesRecordsTable : tableData,
                    RecordsCount         : response.data[0].totalCount && response.data[0].totalCount.length > 0 ? response.data[0].totalCount[0].count : 0
                }, ()=>{  
                    if (this.state.invoicesRecordsTable && this.state.invoicesRecordsTable.length === 0) {
                        this.setState({showBtn : false});
                    }            
                    // console.log("invoicesRecordsTable = ",this.state.invoicesRecordsTable)
                })
            }
        })
        .catch((err)=>{
            console.log("Error getAllUnpaidInvoices() => ", err);
        })
    }

    /*======== handleChange() ========*/
    handleChange(event) {
        event.preventDefault();
        const { name, value } = event.target;
        let formerrors        = this.state.formerrors;
        
        if(name == 'fromdate' && this.state.todate === ''){
            this.setState({
                todate      : value,
                fromdate    : value
            },()=>{this.getData(this.state.startRange, this.state.limitRange)});  
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
                formerrors,
                [name] : value
            },()=>{this.getData(this.state.startRange, this.state.limitRange)});
        }
    }

    /*======== previousDate() ========*/
    previousDate(event){
        event.preventDefault();
        var id            = event.target.id;
        var targetInputId = id.split("-");

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
        }
    }

    /*======== handleSearchChange() ========*/
    nextDate(event){
        event.preventDefault();
        var id            = event.target.id;
        var targetInputId = id.split("-");

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
        }
    }

    /*======== handleSearchChange() ========*/
    handleSearchChange(event) {
        const target = event.target;
        const name = target.name;
        console.log("handleSearchChange value = ",event.target.value);

        this.setState({
            search: event.target.value
        },()=>{
            this.searchData()
        });   
    }

    /*======== searchData() ========*/
    searchData(){
        this.setState({showSearchData:true});
        console.log("search => ",this.state.search);
        var formValues ={
            str : this.state.search,
        }

        axios.post('/api/billing/get/getEmployeewiseInvoice',formValues)
             .then((response) => {
                console.log("response emplyee search = ",response.data);

                if(response.data && response.data.length > 0){ 
                var tableData = response.data.map((a, i)=>{  
                    var gst        = 0;                    
                    this.setState({
                        employeeId : a.employeeId ? a.employeeId : ""
                    })
                    for(var j = 0, len = a.lineItems.length; j < len; j++) {
                        if(a.lineItems[j].billingCode === 401 || a.lineItems[j].billingCode === 402){
                            gst += a.lineItems[j].taxAmount;  // Iterate over your first array and then grab the second element add the values up
                        }
                    }
                    return{ 
                        companyName     : "<div class=companyNameCol>" + a.companyDetails[0].companyName + "</div>",
                        invoiceNumber   : "<div class=invoiceNumCol>"+
                                             "<a class='masterInvoiceNum' aria-hidden='true' title='click to view' id='" + a._id + "' onclick=window.viewSingleUnpaidInvoice('" +a._id +"')>" + a.invoiceNumber + 
                                           "</a></div>",
                        amount          : "<div class=amountCol>"      + (a.totalAmount.toLocaleString())                   + "</div>",
                        gst             : "<div class=gstCol>"         + gst.toLocaleString(undefined, {maximumFractionDigits:2})                + "</div>",
                        payment         : "<div class=paymentCol>"     + (a.payment).toLocaleString()                       + "</div>",
                        balance         : "<div class=balanceCol>"     + (a.balance).toLocaleString()                       + "</div>",
                        status          : "<div class="+ a.statusValue.toLowerCase() +">" + a.statusValue + "</div>",
                        action          : "<div class='actionButtons invoiceAction'>"+
                                                "<a aria-hidden='true' title='click to edit' id='" + a._id + "'><i class='fa fa-pencil'></i></a>"+
                                                "<a aria-hidden='true' title='click to view' id='" + a._id + "' onclick=window.viewSingleUnpaidInvoice('" +a._id +"')><i class='fa fa-eye'></i></a>"+
                                           "</div>",
                        id              : a._id
                    }
                    
                });
                this.setState({
                    invoicesRecordsTable : tableData
                }, ()=>{
                    if (this.state.company || this.state.department || this.state.startDate || this.state.endDate) {
                        this.getData(this.state.startRange, this.state.limitRange);
                    }
                })
            }else{
                this.setState({
                    invoicesRecordsTable : []
                })
            }        
         })
         .catch((error) =>{
            console.log("ERROR : ", error); 
         })
    }

    /*======== getData() ========*/
    getData(startRange, limitRange){
        this.setState({
            invoicesRecordsTable : []
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
            employee    : this.state.search,
            startDate   : startDate,
            endDate     : endDate,
            startRange  : startRange,
            limitRange  : limitRange,
            status      : "Unpaid",
        }

        axios.post('/api/billing/get/getCompanywiseInvoice',formvalues)
        .then((response)=>{
            console.log("company wise invoice data = ", response.data);
            if(response.data && response.data[0].paginatedResults && response.data[0].paginatedResults.length > 0){

                var tableData = response.data[0].paginatedResults.map((a, i)=>{  
                    var gst = 0;
                    for(var j = 0, len = a.lineItems.length; j < len; j++) {
                        if(a.lineItems[j].billingCode === 401 || a.lineItems[j].billingCode === 402){
                            gst += a.lineItems[j].taxAmount;  // Iterate over your first array and then grab the second element add the values up
                        }
                    }
                    return{ 
                        companyName     : "<div class=companyNameCol>" + a.companyDetails[0].companyName + "</div>",
                        invoiceNumber   : "<div class=invoiceNumCol>"+
                                             "<a class='masterInvoiceNum' aria-hidden='true' title='click to view' id='" + a._id + "' onclick=window.viewSingleUnpaidInvoice('" +a._id +"')>" + a.invoiceNumber + 
                                           "</a></div>",
                        amount          : "<div class=amountCol><i class='fa fa-inr faIcon'></i>"      + (a.totalAmount).toLocaleString()                   + "</div>",
                        gst             : "<div class=gstCol><i class='fa fa-inr faIcon'></i>"         + gst.toLocaleString(undefined, {maximumFractionDigits:2})                + "</div>",
                        payment         : "<div class=paymentCol><i class='fa fa-inr faIcon'></i>"     + (a.payment).toLocaleString()                       + "</div>",
                        balance         : "<div class=balanceCol><i class='fa fa-inr faIcon'></i>"     + (a.balance).toLocaleString()                       + "</div>",
                        status          : "<div class="+ a.statusValue.toLowerCase() +">" + a.statusValue + "</div>",
                        action          : "<div class='actionButtons invoiceAction'>"+
                                                "<a aria-hidden='true' title='click to edit' id='" + a._id + "'><i class='fa fa-pencil'></i></a>"+
                                                "<a aria-hidden='true' title='click to view' id='" + a._id + "' onclick=window.viewSingleUnpaidInvoice('" +a._id +"')><i class='fa fa-eye'></i></a>"+
                                           "</div>",
                        id              : a._id
                    }
                    
                });
                this.setState({
                    invoicesRecordsTable : tableData,
                    RecordsCount         : response.data[0].totalCount && response.data[0].totalCount.length > 0 ? response.data[0].totalCount[0].count : 0,
                    showBtn              : (this.state.company === "" || this.state.company==="All") ? false : true
                }, ()=>{})
            }else{
                this.setState({
                    invoicesRecordsTable : [],
                    showBtn              : false
                })
            }
        })
        .catch((err)=>{
            console.log("Error getData() => ", err);
        })
    }

    /*======== getIds() ========*/
    getIds(ids){
        console.log('ids => ',ids)
        this.setState({idArray:ids})
    }

    /*======== createInvoice() ========*/
    createInvoice(event){
        // event.preventDefault();
        if(this.state.idArray && this.state.idArray.length > 0){
            if(this.state.fromdate && this.state.todate){
                var startDate = moment(this.state.fromdate).startOf('day'); // set to 12:00 am today
                var endDate   = moment(this.state.todate).endOf('day'); // set to 23:59 pm today
            }else{
                var currYear  = moment().format('YYYY');
                var startDate = new Date("1/1/" + currYear);
                var endDate   = new Date (startDate.getFullYear(), 11, 31);
            }
            
            var formValues = {
                company_id     : this.state.company,
                department_id  : this.state.department ? this.state.department : "",
                employee_id    : this.state.search ? this.state.employeeId : "",
                invoices       : this.state.idArray,
                startDate      : startDate,
                endDate        : endDate,
                createdBy      : localStorage.getItem("user_ID")
            }
            console.log("formValues = ",formValues);
            axios.post('/api/invoiceMaster/post',formValues)
            .then((response)=>{
                this.props.history.push("/view-receipt/"+response.data.data._id);
            })
            .catch((error)=>{console.log(error)})
        }else{
            swal("No Data Selected")
        }
    }

    /*======== showMoreFilters() ========*/
    showMoreFilters(event){
        event.preventDefault();
        var filterBtn = event.target;
        var element   = document.getElementById("allUnpaidBillsMoreFilter");
        
        if (element) {
            $("#allUnpaidBillsMoreFilter").toggle();
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
            search      : "",
            fromdate    : "",
            todate      : ""
        }, ()=>{
            this.getAllUnpaidInvoices(this.state.startRange, this.state.limitRange);
        })
    }

    /*======== showData() ========*/
    showData(startRange, limitRange){
        if (this.state.company || this.state.search ||
            this.state.department) {
            this.getData(startRange, limitRange);
            console.log("filetr");
        }else{
            this.getAllUnpaidInvoices(startRange, limitRange);
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
                                this.state.companyArray && this.state.companyArray.length > 0 ?
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
                            {
                                this.state.departmentArray && this.state.departmentArray.length > 0 ?
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
            <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding generateBillMoreFilter" id="allUnpaidBillsMoreFilter"> 
                <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding mrgTop1">                              
                    <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                        <label className="labelform ticketPriceName col-lg-12 col-md-12 col-sm-12 col-xs-12">Employee Name or Id</label>
                        <div className="custom-search input-group col-lg-12 col-md-12 col-sm-12 col-xs-12" id="citytype" >                      
                            <span className="input-group-addon custom-select-icon"><img src="/billingManagement/user.png"/></span>
                            <input type="text" name="search" value={this.state.search} onInput={this.handleSearchChange.bind(this)} className="form-control" placeholder="Search Employee By Name or Employee Id.."/>
                        </div>
                    </div>                          
                </div>
            </div>
            {this.state.showBtn ? 
             <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding">
                 <div className="col-lg-3 col-md-2 col-xs-12 col-sm-12 mrgTop1">
                    <button className="btn btn-primary" onClick={this.createInvoice.bind(this)}>Create Master Invoice</button>
                 </div>
             </div>
             :
             null
            }
             <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding">
             <InvoiceTable 
                  tableHeading  = {this.state.tableHeading}
                  dataCount     = {this.state.RecordsCount}
                  tableData     = {this.state.invoicesRecordsTable}
                  tableObjects  = {this.state.tableObjects}
                  getIds        = {this.getIds.bind(this)}
                  tableId       = {this.state.tableId}
                  getData       = {this.showData.bind(this)}
                />            
           </div>
         </div>

       );      
   } 
}

export default withRouter(UnpaidBills);