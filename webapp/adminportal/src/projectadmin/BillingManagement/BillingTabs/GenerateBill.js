import React, { Component }   from 'react';
import {withRouter}  		  from 'react-router-dom';
import axios 				  from 'axios';
import $ 					  from 'jquery';
import jQuery 				  from 'jquery';
import swal                   from 'sweetalert';
import moment                 from 'moment';

import InvoiceTable           from '../InvoiceTable/InvoiceTable.js';
import BookingCity            from './BookingCity.js';

class GenerateBill extends Component {
	constructor(props){
		super(props);
		this.state = {
			"company" 			: "",
			"companyArray" 		: [],
			"vendor" 			: "",
			"vendorArray" 		: [],
			"department" 		: "",
			"departmentArray"   : [],
			"category" 			: "",
			"categoryArray"   	: [],
			"packageType" 		: "",
			"packageTypeArray" 	: [],
            "reset"             : true,
            "selector"          : {},
            "destinationCity"   : "",
            "originatingCity"   : "",
			"idArray" 			: [],
			"tableId" 			: 'GenerateBill',
			"fromdate"          : "",
            "todate"            : '',
			"RecordsCount"      : 0,
            "RecordsTable"      : [],
		    "tableObjects" 		: {
		    						paginationApply  : true, 
		    					   	searchApply      : false
		    					},
		    "tableHeading"      : {
                                    bookingID       : "BOOKING ID",
                                    companyName     : "COMPANY NAME",
			    					employeeName 	: "EMPLOYEE NAME",
	            					tripType 		: "TRIP TYPE",
	            					pickupDate		: "PICKUP DATE",
	            					returnDate		: "RETURN DATE",
	            					/*estimatedCost 	: "ESTIMATED COST",*/
	            					action 		    : "ACTIONS"
		    					},
            startRange          : 0,
            limitRange          : 10,
            generateBtn         : false,
            
		}
		this.GenerateBill = this.GenerateBill.bind(this);
        this.showData     = this.showData.bind(this);
	}

	/*======== componentDidMount()() ========*/
	componentDidMount(){
		const user_ID = localStorage.getItem("user_ID");
		window.GenerateBill = this.GenerateBill; 
        this.getReadyToBillBookings(this.state.startRange, this.state.limitRange);
        this.showData(this.state.startRange, this.state.limitRange);
        this.getCompany();
        this.getVendor();
        this.getDepartment();
        this.getCarCategory();
        this.getPackageType();
        this.setState({
            user_ID      : user_ID,
        }, ()=>{});
	}

	/*======== getReadyToBillBookings()() ========*/
	getReadyToBillBookings(startRange, limitRange){
        var limits = {
            startRange : startRange,
            limitRange : limitRange
        }
		axios.post('/api/bookingmaster/get/getAllBookingListForGenerateBill',limits)
		.then((response)=>{
			console.log('data: ',response.data)
			if(response.data && response.data[0].paginatedResults && response.data[0].paginatedResults.length > 0){
				var tableData = response.data[0].paginatedResults.map((a, i)=>{                     
                    return{ 
                        bookingID       : "<div class=bookingNumCol>"   + a.bookingId                                           + "</div>",
                        companyName     : "<div class=companyNameCol>"  + a.company[0].companyName + "</div>",
                        employeeName    : "<div class=employeeNameCol>" + a.employeeName + "</br><span class='empId'> <b>Employee ID :</b> " + a.empId + "</span>" + "</div>",
                        tripType   		: "<div class=tripTypeCol>"  	+ a.tripType            								+ "</div>",
                        pickupDate      : "<div class=tripDateCol>"  	+ (moment(new Date(a.pickupDate)).format("DD-MM-YYYY")) + "</div>",
                        returnDate      : "<div class=tripDateCol>"     + (moment(new Date(a.pickupDate)).format("DD-MM-YYYY")) + "</div>",
                        /*estimatedCost   : "<div class=estimatedCostCol><i class='fa fa-inr faIcon'></i>" 	+ (a.estimatedCost).toLocaleString()  	+ "</div>",*/
                        action          : "<div class='actionButtons invoiceAction'>"+
                                                "<button type='button' class='btn btn-primary generateButton' id='" + a._id + "' onclick=window.GenerateBill(this)>Generate Bill</button>"+
                                           "</div>",
                        id              : a._id
                    }
                });
				this.setState({
					RecordsTable : tableData,
                    RecordsCount : response.data[0].totalCount && response.data[0].totalCount.length > 0 ? response.data[0].totalCount[0].count : 0
				}, ()=>{
                    console.log("RecordsTable = ",this.state.RecordsTable);
					console.log("RecordsCount = ",this.state.RecordsCount);
				})
			}else{
				this.setState({RecordsTable:[]})
			}
		})
		.catch((err)=>{
			console.log("getReadyToBillBookings() Error = ",err)
		})
	}

	/*======== GenerateBill() ========*/
	GenerateBill(event){	
        var bookingArr = [];        
        if (this.state.generateBtn) {
            bookingArr = this.state.idArray;
        } else {
            console.log("in Generate Bill => ",event);
            console.log("in Generate Bill => ",event.id);
            bookingArr.push(event.id);
        }
        console.log("bookingArr => ",bookingArr);

        var formValues ={
         bookingID : bookingArr,
         createdBy : this.state.user_ID
        }
        console.log("generate bill Formvalues => ",formValues);

		if(bookingArr && bookingArr.length>0){
			axios.post('/api/billing/post',formValues)
			.then((response)=>{
				console.log('response data: ',response.data)
				if(response.data){	
					swal("Bill Generated Successfully...");
                    // this.props.history.push("/view-invoice/"+response.data.data._id);
                    this.setState({
                        idArray     : [],
                        generateBtn : false,
                    })
				}
				this.getReadyToBillBookings(this.state.startRange, this.state.limitRange);	
			})
			.catch((err)=>{
				swal("Failed to Generete Bill")
			})
		}
	}

	/*======== getIds() ========*/
    getGenerateBillIds(ids){
        console.log('generate bill ids => ',ids)
        this.setState({
            idArray:ids
        }, ()=>{
            if (this.state.idArray && this.state.idArray.length > 0) {
                this.setState({generateBtn : true});
            }else{
                this.setState({generateBtn : false});
            }
        })
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

    /*======== getCompany() ========*/
    getCompany() {
        axios.get('/api/entitymaster/get/'+"corporate")
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

    /*======== getVendor() ========*/
    getVendor() {
        axios.get('/api/entitymaster/get/'+"vendor")
          .then((response) => {
            this.setState({
                vendorArray: response.data
            }, () => {
                console.log("Vendor Array => ", this.state.vendorArray);
            })
          }).catch(function (error) {
                console.log("Error getCompany() => ", error);
          });
    }  

    /*======= getCarCategory() =======*/
	getCarCategory(){
		axios.get("/api/categorymaster/get/list")
		.then((response)=>{
		  	this.setState({
		    	categoryArray : response.data
		  	})
		})
		.catch((error)=>{
		  	console.log("Error, getCarCategory() => ", error);
		})
	}  

  	/*======= getPackageType() =======*/
	getPackageType(){
		axios.get("/api/packagetypemaster/get/list")
		.then((response)=>{
		  	this.setState({
		    	packageTypeArray : response.data
		  	})
		})
		.catch((error)=>{
		  	console.log("Error getPackageType => ", error);
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

    /*======== getCity() ========*/
    getCity(data){
        console.log("city data => ",data);
        this.setState(data)
    }

    /*======== onSelectedItemsChange() ========*/
    onSelectedItemsChange(filterType, selecteditems){
        var selector = this.state.selector;
        this.setState({
            reset:false
        });
        console.log("filterType => ",filterType);
        console.log("selecteditems => ",selecteditems);

        if(filterType === 'originatingCity'){
            selector.originatingCity  = selecteditems; 
        }
        if(filterType === 'destinationCity'){
            selector.destinationCity  = selecteditems; 
        }
      
      this.setState({ 
        selector : selector,
        },()=>{
            this.getData(this.state.startRange, this.state.limitRange);
            console.log("selector => ",selector);
        })
    }

    /*======== getData() ========*/
    getData(startRange,limitRange){
        this.setState({
            RecordsTable : []
        });

        if(this.state.fromdate && this.state.todate){
            var startDate = moment(this.state.fromdate).startOf('day'); // set to 12:00 am today
            var endDate   = moment(this.state.todate).endOf('day'); // set to 23:59 pm today
        }else{
            var currYear  = moment().format('YYYY');
            var startDate = new Date("1/1/" + currYear);
            var endDate   = new Date (startDate.getFullYear(), 11, 31);
        }
        
        var formvalues = {
            company         : this.state.company,
            vendor          : this.state.vendor,
            department      : this.state.department,
            packageType     : this.state.packageType,
            category        : this.state.category,
            // employee    : this.state.search,
            originatingCity : this.state.selector.originatingCity ? this.state.selector.originatingCity : "",
            destinationCity : this.state.selector.destinationCity ? this.state.selector.destinationCity : "",
            startDate       : startDate,
            endDate         : endDate,
            startRange      : startRange,
            limitRange      : limitRange
        }
        console.log("formvalues => ",formvalues);
        axios.post('/api/bookingmaster/get/filteredBookingList',formvalues)
        .then((response)=>{
            console.log("Filtered Booking data = ", response.data);
            if(response.data && response.data[0].paginatedResults && response.data[0].paginatedResults.length > 0){ 
                var tableData = response.data[0].paginatedResults.map((a, i)=>{ 
                    return{ 
                        bookingID       : "<div class=bookingNumCol>"   + a.bookingId                                                     + "</div>",
                        companyName     : "<div class=companyNameCol>" 	+ a.company[0].companyName + "</div>",
                        employeeName    : "<div class=employeeNameCol>" + a.employeeName + "</br><span class='empId'> (<b>Employee ID :</b> " + a.empId + ")</span>" + "</div>",
                        tripType   		: "<div class=tripTypeCol>"  	+ a.tripType            								+ "</div>",
                        pickupDate      : "<div class=tripDateCol>"  	+ (moment(new Date(a.pickupDate)).format("DD-MM-YYYY")) + "</div>",
                        returnDate      : "<div class=tripDateCol>"     + (moment(new Date(a.pickupDate)).format("DD-MM-YYYY")) + "</div>",
                        /*estimatedCost   : "<div class=estimatedCostCol><i class='fa fa-inr faIcon'></i>" 	+ (a.estimatedCost).toLocaleString()  	+ "</div>",*/
                        action          : "<div class='actionButtons invoiceAction'>"+
                                                "<button type='button' class='btn btn-primary generateButton' id='" + a._id + "' onclick=window.GenerateBill(this)>Generate Bill</button>"+
                                           "</div>",
                        id              : a._id
                    }
                    
                });
                this.setState({
                    RecordsTable : tableData,
                    RecordsCount : response.data[0].totalCount && response.data[0].totalCount.length > 0 ? response.data[0].totalCount[0].count : 0,
                }, ()=>{})
            }else{
                this.setState({
                    RecordsTable : []
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
        var element   = document.getElementById("generateBillMoreFilter");
        
        if (element) {
            $("#generateBillMoreFilter").toggle();
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
            company         : "",
            vendor          : "",
            department      : "",
            packageType     : "",
            category        : "",
            originatingCity : "",
            destinationCity : "",
            fromdate        : "",
            todate          : "",
            reset           : true
        }, ()=>{
            this.getReadyToBillBookings(this.state.startRange, this.state.limitRange);
        })
    }

    /*======== showData() ========*/
    showData(startRange, limitRange){
        if (this.state.company         || this.state.packageType     ||
            this.state.department      || this.state.vendor          || 
            this.state.category        || this.state.originatingCity || 
            this.state.destinationCity || this.state.fromdate        || 
            this.state.todate) {
            this.getData(startRange, limitRange);
            console.log("filetr");
        }else{
            this.getReadyToBillBookings(startRange, limitRange);
            console.log("normal");
        }
    }     

    /*======== render() ========*/
	render() {
		return (
			<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding tableComponent">
	         	<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding mrgTop1">
	                <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12 form-group">
	                    <label className="labelform ticketPriceName col-lg-12 col-md-12 col-sm-12 col-xs-12">Company</label>
	                    <div className="custom-select input-group col-lg-12 col-md-12 col-sm-12 col-xs-12" id="citytype" >	                    
	                    	<span className="input-group-addon custom-select-icon"><img src="/billingManagement/company.png"/></span>
		                    <select id="company" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" ref="company" name="company"
		                    	value    = {this.state.company}
		                    	onChange = {this.handleChange.bind(this)}
		                    >
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
	                    <label className="labelform ticketPriceName col-lg-12 col-md-12 col-sm-12 col-xs-12">Vendor</label>
		                <div className="custom-select input-group col-lg-12 col-md-12 col-sm-12 col-xs-12">	                    
		                    <span className="input-group-addon custom-select-icon"><img src="/billingManagement/vendor.png"/></span>
		                    <select id="vendor" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" ref="vendor" name="vendor"
		                    	 value    = {this.state.vendor}
		                    	 onChange = {this.handleChange.bind(this)}
		                    >
		                        <option disabled value="">--Select--</option>
		                        <option value="All">Show All</option>
		                        {
		                            this.state.vendorArray && this.state.vendorArray.length > 0 ?
		                                this.state.vendorArray.map((data, i)=>{
		                                    return(
		                                        <option key={i} value={data._id}>{data.companyName} </option>
		                                    );
		                                })
		                            :
		                            <option disabled value="">No Vendor Found</option>
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
	            <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding generateBillMoreFilter" id="generateBillMoreFilter"> 
	             	<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding mrgTop1">
		                {/*<div className="col-lg-3 col-md-3 col-sm-4 col-xs-12 form-group">
		                    <label className="labelform ticketPriceName col-lg-12 col-md-12 col-sm-12 col-xs-12">Originating City</label>
		                    <div className="custom-search input-group col-lg-12 col-md-12 col-sm-12 col-xs-12" id="originatingCity" >                      
	                            <span className="input-group-addon custom-select-icon"><img src="/billingManagement/city.png"/></span>
	                            <input type="text" name="originatingCity" value={this.state.originatingCity} className="form-control" placeholder="Search City.."/>
	                        </div>
		                </div>
		                <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12">
		                    <label className="labelform ticketPriceName col-lg-12 col-md-12 col-sm-12 col-xs-12">Destination City</label>
		                    <div className="custom-search input-group col-lg-12 col-md-12 col-sm-12 col-xs-12" id="destinationCity" >                      
	                            <span className="input-group-addon custom-select-icon"><img src="/billingManagement/city.png"/></span>
	                            <input type="text" name="destinationCity" value={this.state.destinationCity} className="form-control" placeholder="Search City.."/>
	                        </div>	                    
		                </div> */}  
                        <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                            <BookingCity label="Originating City" statename="originatingCity" reset={this.state.reset} onSelectedItemsChange={this.onSelectedItemsChange.bind(this)} getCity={this.getCity.bind(this)} />
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                            <BookingCity label="Destination City" statename="destinationCity" reset={this.state.reset} onSelectedItemsChange={this.onSelectedItemsChange.bind(this)} getCity={this.getCity.bind(this)} />
                        </div>
		                <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12">
		                    <label className="labelform ticketPriceName col-lg-12 col-md-12 col-sm-12 col-xs-12">Trip Type</label>
		                    <div className="custom-select input-group col-lg-12 col-md-12 col-sm-12 col-xs-12">	                    
			                    <span className="input-group-addon custom-select-icon"><img src="/billingManagement/roadtrip.png"/></span>
			                    <select id="packageType" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" ref="packageType" name="packageType"
			                    	value 	 = {this.state.packageType}
			                    	onChange = {this.handleChange.bind(this)}
			                    >
			                        <option disabled value="">--Select--</option>
			                        <option value="All">Show All</option>
			                        {
			                            this.state.packageTypeArray && this.state.packageTypeArray.length > 0 ?
			                                this.state.packageTypeArray.map((data, i)=>{
			                                    return(
			                                        <option key={i} value={data._id}>{data.packageType} </option>
			                                    );
			                                })
			                            :
			                            <option disabled value="">No Trip Type Found</option>
			                        }
			                    </select>
			                </div>		                    
		                </div>    
		                <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12">
		                    <label className="labelform ticketPriceName col-lg-12 col-md-12 col-sm-12 col-xs-12">Vehicle Category</label>
		                    <div className="custom-select input-group col-lg-12 col-md-12 col-sm-12 col-xs-12">	                    
			                    <span className="input-group-addon custom-select-icon"><img src="/billingManagement/car.png"/></span>
			                    <select id="category" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" ref="category" name="category"
			                    	value    = {this.state.category}
			                    	onChange = {this.handleChange.bind(this)}
			                    >
			                        <option disabled value="">--Select--</option>
			                        <option value="All">Show All</option>
			                        {
			                            this.state.categoryArray && this.state.categoryArray.length > 0 ?
			                                this.state.categoryArray.map((data, i)=>{
			                                    return(
			                                        <option key={i} value={data._id}>{data.category} </option>
			                                    );
			                                })
			                            :
			                            <option disabled value="">No Vehicle Category Found</option>
			                        }
			                    </select>
			                </div>		                    
		                </div>
		            </div>
		            <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding mrgTop1">
		                <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12">
		                    <label className="labelform ticketPriceName col-lg-12 col-md-12 col-sm-12 col-xs-12">Department</label>
		                    <div className="custom-select input-group col-lg-12 col-md-12 col-sm-12 col-xs-12">	                    
			                    <span className="input-group-addon custom-select-icon"><img src="/billingManagement/department.png"/></span>
			                    <select id="department" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" ref="department" name="department"
			                    	value    = {this.state.department}
			                    	onChange = {this.handleChange.bind(this)}
			                    >
			                        <option disabled value="">--Select--</option>
			                        <option value="All">Show All</option>
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
		            </div>
	            </div>
                {this.state.generateBtn 
                ? 
                    <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding">
                        <div className="col-lg-3 col-md-2 col-xs-12 col-sm-12 mrgTop1">
                            <button className="btn btn-primary" onClick={this.GenerateBill.bind(this)}>Generate Multiple Invoices</button>
                        </div>
                    </div>
                :
                    null
                }
	         	<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding">
	    		    <InvoiceTable 
	                  tableHeading  = {this.state.tableHeading}
	                  dataCount     = {this.state.RecordsCount}
	                  tableData     = {this.state.RecordsTable}
	                  tableObjects  = {this.state.tableObjects}
	                  getIds        = {this.getGenerateBillIds.bind(this)}
	                  tableId       = {this.state.tableId}
                      getData       = {this.showData.bind(this)}
	                />	       	
	    	    </div>
		    </div>
	    );		
	}
}

export default withRouter(GenerateBill);