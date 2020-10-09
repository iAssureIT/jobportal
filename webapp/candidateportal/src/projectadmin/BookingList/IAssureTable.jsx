import React, { Component }       	from 'react';
import {Route, withRouter} 			from 'react-router-dom';
import swal                     	from 'sweetalert';
import axios 						from 'axios';
import $ 							from 'jquery';
import moment                       from 'moment';
import jQuery 						from 'jquery';
import ReactHTMLTableToExcel        from 'react-html-table-to-excel';
import Collapsible from 'react-collapsible';
import Geocode from "react-geocode";
import { Link }             from 'react-router-dom';
import { connect }          from 'react-redux';
import './IAssureTable.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/modal.js';
import ModalImage from "react-modal-image";
import S3FileUpload from 'react-s3';

var sum = 0;
class IAssureTable extends Component {
	constructor(props){
		super(props);
		this.state = {
			"dataCount" 				: props && props.dataCount ? props.dataCount : [],
		    "tableData" 				: props && props.tableData ? props.tableData : [],
		    "tableName" 				: props && props.tableName ? props.tableName : [],
		    "tableHeading"				: props && props.tableHeading ? props.tableHeading : {},
		    "twoLevelHeader" 			: props && props.twoLevelHeader ? props.twoLevelHeader : {},
		    "tableObjects" 				: props && props.tableObjects ? props.tableObjects : {},		    
		    "deleteMethod" 				: props && props.deleteMethod ? props.deleteMethod : {},		    
		    "id" 			      	    : props && props.id ? props.id : {},		    
		    "reA" 						: /[^a-zA-Z]/g,
		    "reN" 						: /[^0-9]/g,
		    "sort" 	  					: true,
		    "showExpense" 	  		    : false,
		    "examMasterData2" 			: '',
		    "activeClass" 				: 'activeCircle',
		    "expenseData" 			: [],
		    "ticketProof" 			: [],
		    "ticketName"            : "",
		    "ticketPrice"            : 0,
		    "paginationArray" 			: [],
		    "startRange" 				: 0,
		    "limitRange" 				: 10000,
		    "activeClass" 				: 'activeCircle', 		    
		    "normalData" 				: true,
		    "printhideArray"			: [],
		    "AllocateCartableHeading": {
                vehicleImage              : "Photo",
                vehicleData               : "Vehicle Details",
                driverName                : "Driver",
                insuranceDate             : "Insurance Validity",
                PUCValidUpto              : "PUC Validity",
                permitValidUpto           : "Permit Validity",
                availabilityStatus        : "Availability in Duration",
                assignAction              : 'Action',
            },

            "AllocateCartableObjects": {
                deleteMethod    : 'delete',
                apiLink         : '/api/vehicledrivermapping/',
                paginationApply : false,
                searchApply     : false,
            },
            "startRange": 0,
			"limitRange": 1000000,
			"formatAddress":"",
			"address":"",
			"googleAPIKey":""
		}
		{/*this.delete = this.delete.bind(this);*/}
		this.printTable = this.printTable.bind(this);
		if(props.tableHeading){
			var tableHeading = Object.keys(props.tableHeading);
			var index = 0;
			if (props.twoLevelHeader) {
			if (props.twoLevelHeader.firstHeaderData && props.twoLevelHeader.firstHeaderData.length > 0) {
					for(let j=0; j< props.twoLevelHeader.firstHeaderData.length; j++){
						var mergCol = props.twoLevelHeader.firstHeaderData[j].mergedColoums;
						if(j===1){
							mergCol--;
						}

						for(let k=0; k<mergCol; k++){
							if(props.twoLevelHeader.firstHeaderData[j].hide){
								var phElem = {col:tableHeading[index], printhide:"printhide"};
							}else{
								var phElem = {col:tableHeading[index], printhide:""};
							}

							this.state.printhideArray.push(phElem);
							index++;
						}
					}

					if(index === tableHeading.length){
					}

			}
			}
		}
	}
	componentDidMount() {
	    // this.getDrivers();
	    axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem("token");
	    $("html,body").scrollTop(0); 
	      this.setState({
	      	tableHeading	: this.props.tableHeading,
	      	tableData 		: this.props.tableData,
	      	tableName 		: this.props.tableName,
	      	dataCount 		: this.props.dataCount,
	      	id 				: this.props.id,
		  });
		  this.getGoogleAPIKey();
	}

	getGoogleAPIKey(){
		axios.get("/api/projectSettings/get/GOOGLE",)
	    .then((response) => {
	    	this.setState({
				googleAPIKey : response.data.googleapikey
			});
	    })
	    .catch((error) =>{
	    	swal(error)
	    })
	}


	componentWillReceiveProps(nextProps) {
        this.setState({
            id	            : nextProps.id,
            tableData	    : nextProps.tableData,
            tableName	    : nextProps.tableName,
            dataCount 		: nextProps.dataCount,
        },()=>{
        	this.paginationFunction();
        })
    }
	componentWillUnmount(){
    	$("script[src='/js/adminSide.js']").remove();
    	$("link[href='/css/dashboard.css']").remove();
	}
	/*edit(event){
		event.preventDefault();
		$("html,body").scrollTop(0);
		var tableObjects =  this.props.tableObjects;
		var id = event.target.id;
		this.props.history.push(tableObjects.editUrl+"/"+id);
	}
    delete(e){
	  	e.preventDefault();
	  	var tableObjects =  this.props.tableObjects;
		let id = e.target.id;
	  	var deleteMethod =  this.props.deleteMethod;
		axios({

	        method: deleteMethod ? deleteMethod : 'delete',
	        url: tableObjects.apiLink+'/delete/'+id
	    }).then((response)=> {
			$('#myModal').css({"display": "block"})
	    	this.props.getData(this.state.startRange, this.state.limitRange, this.state.center_ID);
	        swal({
	        	text :"Record deleted sucessfully",
	        });
	        	$('.modal').remove();
				$('.modal-backdrop').remove();
				$('body').removeClass( "modal-open" );
	        this.props.history.push(tableObjects.editUrl);
	        if(tableObjects.apiLink==='/api/units/'){
		    	$('body').addClass( "modal-open" );
		    }
	    }).catch(function (error) {
	    });
    } */
    sortNumber(key, tableData){
    	var nameA = '';
    	var nameB = '';
    	var reA = /[^a-zA-Z]/g;
		var reN = /[^0-9]/g;
		var aN = 0;
		var bN = 0;
		var sortedData = tableData.sort((a, b)=> {
    		Object.entries(a).map( 
				([key1, value1], i)=> {
					if(key === key1){
						nameA = value1.replace(reA, "");				
					}
				}
			);
			Object.entries(b).map( 
				([key2, value2], i)=> {
					if(key === key2){
						nameB = value2.replace(reA, "");
					}
				}
			);
			if(this.state.sort === true){
				this.setState({
					sort 	  : false
				})
				if (nameA === nameB) {
					Object.entries(a).map( 
						([key1, value1], i)=> {
							if(key === key1){
								aN = parseInt(value1.replace(reN, ""), 10);				
							}
						}
					);
					
					Object.entries(b).map( 
						([key1, value1], i)=> {
							if(key === key1){
								bN = parseInt(value1.replace(reN, ""), 10);					
							}
						}
					);

					if (aN < bN) {
						return -1;
					}
					if (aN > bN) {
						return 1;
					}
					return 0;

				} else {

					if (nameA < nameB) {
						return -1;
					}
					if (nameA > nameB) {
						return 1;
					}
					return 0;
				}
			}else if(this.state.sort === false){
				this.setState({
					sort 	  : true
				})
				if (nameA === nameB) {
					Object.entries(a).map( 
						([key1, value1], i)=> {
							if(key === key1){
								aN = parseInt(value1.replace(reN, ""), 10);			
							}
						}
					);
					
					Object.entries(b).map( 
						([key1, value1], i)=> {
							if(key === key1){
								bN = parseInt(value1.replace(reN, ""), 10);					
							}
						}
					);

					if (aN > bN) {
						return -1;
					}
					if (aN < bN) {
						return 1;
					}
					return 0;

				} else {

					if (nameA > nameB) {
						return -1;
					}
					if (nameA < nameB) {
						return 1;
					}
					return 0;
				}
			}				
		});
		this.setState({
			tableData : sortedData,
		});
    }
    sortString(key, tableData){
    	var nameA = '';
    	var nameB = '';
    	var sortedData = tableData.sort((a, b)=> {
		Object.entries(a).map( 
			([key1, value1], i)=> {
				if(key === key1){
					if(jQuery.type( value1 ) === 'string'){
						nameA = value1.toUpperCase();
					}else{
						nameA = value1;
					}						
				}
			}
		);
		Object.entries(b).map( 
			([key2, value2], i)=> {
				if(key === key2){
					if(jQuery.type( value2 ) === 'string'){
						nameB = value2.toUpperCase();
					}else{
						nameB = value2;
					}	
				}
			}
		);
			if(this.state.sort === true){	
				this.setState({
					sort 	  : false
				})		
				if (nameA < nameB) {
					return -1;
				}
				if (nameA > nameB) {
					return 1;
				}
				return 0;
			}else if(this.state.sort === false){
				this.setState({
					sort 	  : true
				})	
				if (nameA > nameB) {
					return -1;
				}
				if (nameA < nameB) {
					return 1;
				}
				return 0;
			}
		});
		this.setState({
			tableData : sortedData,
		});
    }
    sort(event){
    	event.preventDefault();
    	var key = event.target.getAttribute('id');
    	var tableData = this.state.tableData;
		if(key === 'number'){
			this.sortNumber(key, tableData);
		}else{
			this.sortString(key, tableData);
		}
    }
   	paginationFunction(event){
		var dataLen = this.state.dataCount > 20 || this.state.dataCount === 20 ? 20 : this.state.dataCount;
		var dataLength = this.state.dataCount;
		this.setState({
			dataLength : dataLen,
		},()=>{
			$('li').removeClass('activeCircle');
			$(".queDataCircle:first").addClass('activeCircle');
			const maxRowsPerPage = this.state.limitRange;
			var paginationNum = dataLength/maxRowsPerPage;
			var pageCount = Math.ceil(paginationNum) > 20 ? 20 : Math.ceil(paginationNum);

			var paginationArray = [];
			for (var i=1; i<=pageCount;i++){
				var countNum = maxRowsPerPage * i;
				var startRange = countNum - maxRowsPerPage;
				if(i === 1){
					var activeClass = 'activeCircle';
				}else{
					activeClass = '';
				}
				paginationArray.push(
					<li key={i} className={"queDataCircle page-link "+activeClass+" parseIntagination"+i} id={countNum+'|'+startRange} onClick={this.getStartEndNum.bind(this)} title={"Click to jump on "+i+ " page"}>{i}</li>
				);
			}
			if(pageCount>=1){				
				this.setState({
					paginationArray : paginationArray,
				},()=>{
				});
			}
			return paginationArray;
		});
	}
	getStartEndNum(event){	
		var limitRange = $(event.target).attr('id').split('|')[0];
		var limitRange2     = parseInt(limitRange);
		var startRange = parseInt($(event.target).attr('id').split('|')[1]);
		this.props.getData(startRange, limitRange);
		this.setState({
			startRange:startRange,
		});
		$('li').removeClass('activeCircle');
		$(event.target).addClass('activeCircle');
		var counter = $(event.target).text();
	}
	setLimit(event){
		event.preventDefault();
		var limitRange = parseInt(this.refs.limitRange.value);
		var startRange = 0;
		this.setState({
			"limitRange":limitRange,
			"startRange":0

		},()=>{
			this.paginationFunction();
			if(this.state.normalData === true){
				this.props.getData(startRange, this.state.limitRange);
			}	
			if(this.state.searchData === true){
				this.tableSearch();
			}
		});	
	}
	tableSearch(){
    	var searchText = this.refs.tableSearch.value;
		if(searchText && searchText.length !== 0) {
			this.setState({
				"normalData"  : false,
				"searchData"  : true,
			},()=>{
				this.props.getSearchText(searchText, this.state.startRange, this.state.limitRange);
			});	    	
	    }else{
			this.props.getData(this.state.startRange, this.state.limitRange);
	    }    	 
    }
    showNextPaginationButtons(){
    	var beforeDataLength = this.state.dataLength > 0 ? this.state.dataLength : 20;
		if(beforeDataLength !== this.state.dataCount){
			this.setState({
				dataLength : (beforeDataLength+ 20) > this.state.dataCount ? this.state.dataCount : (beforeDataLength+ 20),
			},()=>{
				$('li').removeClass('activeCircle');
				$(".queDataCircle:first").addClass('activeCircle');
				const maxRowsPerPage = this.state.limitRange;
				var dataLength = this.state.dataLength;
				var paginationNum = parseInt(dataLength)/maxRowsPerPage;
				var pageCount = Math.ceil(paginationNum);

				var paginationArray = [];

				for (var i=beforeDataLength+1; i<=pageCount;i++){
					var countNum = maxRowsPerPage * i;
					var startRange = countNum - maxRowsPerPage;
					if(i === beforeDataLength+1){
						var activeClass = 'activeCircle';
					}else{
						activeClass = '';
					}
					paginationArray.push(
						<li key={i} className={"queDataCircle page-link "+activeClass+" parseIntagination"+i} id={countNum+'|'+startRange} onClick={this.getStartEndNum.bind(this)} title={"Click to jump on "+i+ " page"}>{i}</li>
					);
				}
				if(pageCount>=1){				
					this.setState({
						paginationArray : paginationArray,
					});
				}
				return paginationArray;
			});
		}		
    }
    showPreviousPaginationButtons(){
    	var beforeDataLength = this.state.dataLength;
		
		this.setState({
			dataLength : beforeDataLength > 20 ? beforeDataLength- this.state.paginationArray.length : 0,
		},()=>{
			$('li').removeClass('activeCircle');
			$(".queDataCircle:first").addClass('activeCircle');
			const maxRowsPerPage = this.state.limitRange;
			var dataLength = this.state.dataLength;
			var paginationNum = parseInt(dataLength)/maxRowsPerPage;
			if(dataLength !== 0 && paginationNum!== 0){
				var pageCount = Math.ceil(paginationNum);
				var paginationArray = [];
				var forLoop = (beforeDataLength-this.state.paginationArray.length) < 0 ?  1: beforeDataLength-this.state.paginationArray.length;
				for (var i=forLoop-19; i<=pageCount;i++){
					var countNum = maxRowsPerPage * i;
					var startRange = countNum - maxRowsPerPage;
					if(i === beforeDataLength-39 || i === 1){
						var activeClass = 'activeCircle';
					}else{
						activeClass = '';
					}
					paginationArray.push(
						<li key={i} className={"queDataCircle page-link "+activeClass+" parseIntagination"+i} id={countNum+'|'+startRange} onClick={this.getStartEndNum.bind(this)} title={"Click to jump on "+i+ " page"}>{i}</li>
					);
				}
				if(pageCount>=1){				
					this.setState({
						paginationArray : paginationArray,
					});
				}
				return paginationArray;
			}			
		});
    }
    showFirstTweentyButtons(){
    	var beforeDataLength = this.state.dataCount;
		
		this.setState({
			dataLength : 20,
		},()=>{
			$('li').removeClass('activeCircle');
			$(".queDataCircle:first").addClass('activeCircle');
			const maxRowsPerPage = this.state.limitRange;
			var dataLength = this.state.dataLength;
			var paginationNum = parseInt(dataLength)/maxRowsPerPage;
			if(dataLength !== 0 && paginationNum!== 0){
				var pageCount = Math.ceil(paginationNum);
				var paginationArray = [];

				for (var i=1; i<=pageCount;i++){
					var countNum = maxRowsPerPage * i;
					var startRange = countNum - maxRowsPerPage;
					if(i === 1){
						var activeClass = 'activeCircle';
					}else{
						activeClass = '';
					}
					paginationArray.push(
						<li key={i} className={"queDataCircle page-link "+activeClass+" parseIntagination"+i} id={countNum+'|'+startRange} onClick={this.getStartEndNum.bind(this)} title={"Click to jump on "+i+ " page"}>{i}</li>
					);
				}
				if(pageCount>=1){				
					this.setState({
						paginationArray : paginationArray,
					});
				}
				return paginationArray;
			}			
		});
    }
    showLastTweentyButtons(){
    	var beforeDataLength = this.state.dataLength;
		
		this.setState({
			dataLength : this.state.dataCount,
		},()=>{
			$('li').removeClass('activeCircle');
			$(".queDataCircle:first").addClass('activeCircle');
			const maxRowsPerPage = this.state.limitRange;
			var dataLength = this.state.dataLength;
			var paginationNum = parseInt(dataLength)/maxRowsPerPage;
			if(dataLength !== 0 && paginationNum!== 0){
				var pageCount = Math.ceil(paginationNum);
				var paginationArray = [];

				for (var i=(this.state.dataCount - 20)+1; i<=pageCount;i++){
					var countNum = maxRowsPerPage * i;
					var startRange = countNum - maxRowsPerPage;
					if(i === 1 || i === (this.state.dataCount - 20)+1){
						var activeClass = 'activeCircle';
					}else{
						activeClass = '';
					}
					paginationArray.push(
						<li key={i} className={"queDataCircle page-link "+activeClass+" parseIntagination"+i} id={countNum+'|'+startRange} onClick={this.getStartEndNum.bind(this)} title={"Click to jump on "+i+ " page"}>{i}</li>
					);
				}
				if(pageCount>=1){				
					this.setState({
						paginationArray : paginationArray,
					});
				}
				return paginationArray;
			}			
		});
    }
    printTable(event){
    	// event.preventDefault();
       
        var DocumentContainer = document.getElementById('section-to-print');

	    var WindowObject = window.open('', 'PrintWindow', 'height=400,width=600');
	    WindowObject.document.write(DocumentContainer.innerHTML);
	    WindowObject.document.close();
	    WindowObject.focus();
	    WindowObject.print();
	    WindowObject.close();
    }
    acceptVendor(event){
    	const target = event.target;
    	var id = $(event.currentTarget).attr('id');
 
        var formvalues={
	      bookingID: id,
	      status  : {
	                    value             : "Vendor Accepted",
	                    statusBy          : localStorage.getItem("user_ID"),
	                    statusAt          : new Date(),
	                },
	    }
	    
	    axios.patch("/api/bookingmaster/patch/status",formvalues)
	    .then((response) => {
	    	console.log('response',response);
			this.props.getData(this.state.startRange, this.state.limitRange);
			swal(" ", "Trip accepted");
	        this.props.history.push('/bookingList');
	    })
	    .catch((error) =>{
	    	swal(error)
	    })
    }

    readyToBill(event){
    	const target = event.target;
    	var id = $(event.currentTarget).attr('id');
 
        var formvalues={
	      bookingID: id,
	      status  : {
	                    value             : "Ready To Bill",
	                    statusBy          : localStorage.getItem("user_ID"),
	                    statusAt          : new Date(),
	                },
	    }
	    
	    axios.patch("/api/bookingmaster/patch/status",formvalues)
	    .then((response) => {
	    	console.log('response',response);
			this.props.getData(this.state.startRange, this.state.limitRange);
			swal(" ", "It will go for billing now.");
	        this.props.history.push('/bookingList');
	    })
	    .catch((error) =>{
	    	swal(error)
	    })
    }
    rejectVendor(event){
    	const target = event.target;
    	var id = $(event.currentTarget).attr('id');
 
        var formvalues={
	      bookingID: id,
	      status  : {
	                    value             : "Vendor Rejected",
	                    statusBy          : localStorage.getItem("user_ID"),
	                    statusAt          : new Date(),
	                },
	    }
	    
	    axios.patch("/api/bookingmaster/patch/status",formvalues)
	    .then((response) => {
			this.props.getData(this.state.startRange, this.state.limitRange);
			swal(" ", "Trip rejected");
	        this.props.history.push('/bookingList');
	    })
	    .catch((error) =>{
	    	swal(error)
	    })
    }
    cancelVendor(event){
    	const target = event.target;
    	var id = $(event.currentTarget).attr('id');
 
        var formvalues={
	      bookingID: id,
	      status  : {
	                    value             : "Cancelled By Vendor",
	                    statusBy          : localStorage.getItem("user_ID"),
	                    statusAt          : new Date(),
	                },
	    }
	    
	    axios.patch("/api/bookingmaster/patch/status",formvalues)
	    .then((response) => {
			this.props.getData(this.state.startRange, this.state.limitRange);
			swal(" ", "Trip cancelled");
	        this.props.history.push('/bookingList');
	    })
	    .catch((error) =>{
	    	swal(error)
	    })
    }
   


    handleChange(event){
        event.preventDefault();
        const target = event.target;
        const name = target.name;
        var value = event.target.value;
        var bookingID = event.target.id;
        var availabilitystatus             = $(event.currentTarget).attr('data-availabilitystatus');
        this.setState({
            [name]: event.target.value
        },()=>{
            console.log('this.state',this.state.vehicle, this.state.driver);
	        if(this.state.driver){
	        	if(availabilitystatus==="Available"){
		            var formValues = {
		                bookingID : bookingID,
		                vehicleID : this.state.vehicle,
		                status    :{
		                    value       : "Trip Allocated To Driver",
		                    statusBy    : localStorage.getItem("user_ID"),
		                    statusAt    : new Date(),
		                    allocatedToDriver : this.state.driver,
		                },
		                updatedBy : localStorage.getItem("user_ID"),
		            }
		                console.log('responseformValues==========',formValues);
		            axios.patch("/api/bookingmaster/patch/status", formValues)
		            .then((response) => {
		                console.log('response==========',response);
						this.props.getData(this.state.startRange, this.state.limitRange);
			            swal(" ", "Trip Allocated To Driver");
			             var modal = document.getElementById("AllocateDriver-"+bookingID);
			             // var modal = document.getElementById("AllocateCar-"+bookingID);
		                modal.style.display = "none";
		                $('.modal-backdrop').remove();
		                
		            })
		            .catch((error) =>{
		                swal(error)
		            })

			        // var mappingvalues = {
			        //     vehicleID     : this.state.vehicle,
			        //     driverID      : this.state.driver,
			        //     company_Id      : localStorage.getItem("company_Id"),
			        //     status        : "active",
			        //     createdBy     : localStorage.getItem("user_ID")
			        // }
			        // // console.log('formvalues',formvalues);
			        // axios.post('/api/vehicledrivermapping/post', mappingvalues)
			        //   .then((response) => {
			        //     console.log("response",response);
			        //     this.getData(this.state.startRange, this.state.limitRange);
			        //       this.setState({
			        //         vehicle       : "",
			        //         driver        : "",
			        //     },()=>{
			        //     })
			             
			        //   })
			        //   .catch((error) => {

			        //   })
			    }else{
	        		swal(" ", "Driver is not available");
			    }
	        }
        });
    }
    getDrivers(event) {
    	const target           = event.target;
        var bookingID          = $(event.currentTarget).attr('id');
        var vehicleID          = $(event.currentTarget).attr('data-vehicleid');
        var fromDate           = $(event.currentTarget).attr('data-pickupdate');
        var toDate             = $(event.currentTarget).attr('data-returndate');
        var city               = $(event.currentTarget).attr('data-city');
        const company_Id       = localStorage.getItem("company_Id");
         var formValues={
			company_Id      : company_Id,
		    fromDate        : fromDate,
		    toDate          : toDate,
		    city            : city,
		}	
        console.log('driverArrayformValues', formValues, vehicleID)
        if(vehicleID){
	        axios.post("/api/personmaster/post/list/driverforallocation", formValues)
	        .then((response) => {
	            console.log('driverArray', response)
	            var driverArray = response.data.map((a, i)=>{
	                return {
	                    _id        :a._id,        
	                    driverName :a.firstName + " " + (a.middleName ? a.middleName : "") + " " + a.lastName,
	                    availabilityStatus : a.availabilityStatus,        
	                    drivingLicense : this.driverDates('License','Driving Licence','Licence Number','Driving Licence Number',a.Documentarray),        
	                } 
	            })  
	            this.setState({
	                driverArray   : driverArray,
	            })
	        })
	        .catch((error) => {
	            console.log("error = ",error);
	        })
        }else{
	    	var modal = document.getElementById("AllocateDriver-"+bookingID);
            modal.style.display = "none";
            $('.modal-backdrop').remove();
	        swal(" ", "Please Allocate Vehicle firstly.");
        }
    }

    driverDates(name1,name2,name3,name4,data){
    	var doc= data.find(a=>a.documentName.toLowerCase() === name1.toLowerCase() || a.documentName.toLowerCase() === name2.toLowerCase() || a.documentName.toLowerCase() === name3.toLowerCase() || a.documentName.toLowerCase() === name4.toLowerCase());
    	console.log("doc",doc);
    	return  doc && doc.documentValidTo ? moment(doc.documentValidTo).format("DD-MMM-YYYY") : "NA"
    }
   
    vehicleData(event){
    	const target           = event.target;
        var bookingID          = $(event.currentTarget).attr('id');
        var fromDate           = $(event.currentTarget).attr('data-pickupdate');
        var toDate             = $(event.currentTarget).attr('data-returndate');
        var city               = $(event.currentTarget).attr('data-city');
        var vehicleCategory    = $(event.currentTarget).attr('data-category');
        var status             = $(event.currentTarget).attr('data-status');
        var type               = $(event.currentTarget).attr('type');
        console.log("type",type);
    	// data-category={value.vehicleCategory} data-pickupdate={value.pickupDate} data-returndate={value.returnDate}
		var formValues=	{
			"company_Id"      : localStorage.getItem("company_Id"),
		    "vehicleCategory" : vehicleCategory,
		    "city"            : city,
		    "fromDate"        : fromDate,
		    "toDate"          : toDate,
		    "type"            : type,
		}
        console.log('vehicleforallocationformValues', formValues)
	    if(status !== 'Vendor Rejected' && status !== 'Allocated To Vendor'){
	        axios.post("/api/vehiclemaster/post/list/vehicleforallocation", formValues)
	        .then((response) => {
	            console.log('vehicleforallocation', response)
				this.props.getData(this.state.startRange, this.state.limitRange);
	            var AllocateCartableData = response.data.map((a, i)=>{
	                return {
	                    _id                       :a._id,    
			            vehicleImage              : a.vehicleImage,
			            vehicleData               : "("+a.category+" "+a.vehiclecolor+") <p>"+a.brand+" "+a.model+"</p><p>"+a.vehicleNumber+"</p>",
			            driverName                : a.driverName ? a.driverName : "NA",
			            insuranceDate             : this.vehicleDates("Insurance",a.vehicleDocument),
			            PUCValidUpto              : this.vehicleDates("PUC",a.vehicleDocument),
			            permitValidUpto           : this.vehicleDates("Permit",a.vehicleDocument),
	        			availabilityStatus        : a.availabilityStatus,    
	        			driverID                  : a.driverID,    
	        			category                  : a.category,    
	        			brand                     : a.brand,    
	        			model                     : a.model,    
	        			vehiclecolor              : a.vehiclecolor,    
	        			vehicleNumber             : a.vehicleNumber,    
	                } 
	            })  
	            console.log("AllocateCartableData",AllocateCartableData);
	            this.setState({
	                AllocateCartableData   : AllocateCartableData,
	            })
	        })
	        .catch((error) => {
	        	console.log("error",error);
	        })

	    }else{
	    	swal(" ", "Please Accept the Booking.")
	    	var modal = document.getElementById("AllocateCar-"+bookingID);
            modal.style.display = "none";
            $('.modal-backdrop').remove();
	    }
    }
    getvehicledriverDetails(vehicleID, driverID, status ){
		this.props.getData(this.state.startRange, this.state.limitRange);
    }


    vehicleDates(name,data){
    	var doc= data.find(a=>a.documentName === name);
    	console.log("doc",doc);
    	return doc ? moment(doc.vehicleDocDate).format("DD-MMM-YYYY") : "NA";
    }

    assignVehicle(event){
    	const target = event.target;
    	var vehicleID = $(event.currentTarget).attr('id');
    	var driverID = $(event.currentTarget).attr('data-driverid');
    	var bookingID = $(event.currentTarget).attr('data-bookingid');
        var availabilityStatus = $(event.currentTarget).attr('data-availabilitystatus');

		if(availabilityStatus==="Available"){
	        if(vehicleID && bookingID){
	            if(driverID!==""){
	            	var formValues = {
		                bookingID : bookingID,
		                vehicleID : vehicleID,
		                status    :{
		                    value       : "Trip Allocated To Driver",
		                    statusBy    : localStorage.getItem("user_ID"),
		                    statusAt    : new Date(),
		                    allocatedToDriver : driverID,
		                },
		                updatedBy : localStorage.getItem("user_ID"),
		            }
		            axios.patch("/api/bookingmaster/patch/status", formValues)
		            .then((response) => {
	                	this.props.getData(this.state.startRange, this.state.limitRange);
			            swal(" ", "Trip Allocated To Driver");
		                var modal = document.getElementById("AllocateCar-"+bookingID);
		                modal.style.display = "none";
		                $('.modal-backdrop').remove();
	        			this.props.history.push('/bookingList'); 
	                	this.setState({
			                vehicleID       : vehicleID,
			            },()=>{
			            })       			

		            })
		            .catch((error) =>{
		                swal(error)
		            })
	            }else{
					var formValues = {
		                bookingID : bookingID,
		                vehicleID : vehicleID,
		                updatedBy : localStorage.getItem("user_ID"),
		            }
		            axios.patch("/api/bookingmaster/patch/change_vehicle", formValues)
		            .then((response) => {
		                var modal = document.getElementById("AllocateCar-"+bookingID);
		                modal.style.display = "none";
		                $('.modal-backdrop').remove();
	                	this.props.getData(this.state.startRange, this.state.limitRange);
	                	this.setState({
			                vehicleID       : vehicleID,
			            },()=>{
			            })
		            })
		            .catch((error) =>{
		                swal(error)
		            })
	            }
	        }
	    }else{
	        swal(" ", "Vehicle is not available");
	    }
    
    }
  	assignDriver(event){
        event.preventDefault();
    	const target = event.target;
    	var driverID = $(event.currentTarget).attr('id');
    	var vehicleID = $(event.currentTarget).attr('data-vehicleid');
    	var bookingID = $(event.currentTarget).attr('data-bookingid');
        var availabilityStatus = $(event.currentTarget).attr('data-availabilitystatus');
        if(driverID){
        	if(availabilityStatus==="Available"){
	            var formValues = {
	                bookingID : bookingID,
	                vehicleID : vehicleID,
	                status    :{
	                    value       : "Trip Allocated To Driver",
	                    statusBy    : localStorage.getItem("user_ID"),
	                    statusAt    : new Date(),
	                    allocatedToDriver : driverID,
	                },
	                updatedBy : localStorage.getItem("user_ID"),
	            }
	            axios.patch("/api/bookingmaster/patch/status", formValues)
	            .then((response) => {
					this.props.getData(this.state.startRange, this.state.limitRange);
		            swal(" ", "Trip Allocated To Driver");
		             var modal = document.getElementById("AllocateDriver-"+bookingID);
		             // var modal = document.getElementById("AllocateCar-"+bookingID);
	                modal.style.display = "none";
	                $('.modal-backdrop').remove();
	                
	            })
	            .catch((error) =>{
	                console.log(error)
	            })
		    }else{
        		swal(" ", "Driver is not available");
		    }
        }
	}
	changeDriver(event){
        event.preventDefault();
    	const target = event.target;
    	var driverID = $(event.currentTarget).attr('id');
    	var vehicleID = $(event.currentTarget).attr('data-vehicleid');
    	var bookingID = $(event.currentTarget).attr('data-bookingid');
        var availabilityStatus = $(event.currentTarget).attr('data-availabilitystatus');
        if(driverID){
        	if(availabilityStatus==="Available"){
	            var formValues = {
	                bookingID : bookingID,
	                vehicleID : vehicleID,
	                status    :{
	                    value       : "Trip Allocated To Driver",
	                    statusBy    : localStorage.getItem("user_ID"),
	                    statusAt    : new Date(),
	                    allocatedToDriver : driverID,
	                },
	                updatedBy : localStorage.getItem("user_ID"),
	            }
	            axios.patch("/api/bookingmaster/patch/change_driver", formValues)
	            .then((response) => {
					this.props.getData(this.state.startRange, this.state.limitRange);
		            swal(" ", "Trip Allocated To Driver");
		             var modal = document.getElementById("AllocateDriver-"+bookingID);
		             // var modal = document.getElementById("AllocateCar-"+bookingID);
	                modal.style.display = "none";
	                $('.modal-backdrop').remove();
	                
	            })
	            .catch((error) =>{
	                console.log(error)
	            })
		    }else{
        		swal(" ", "Driver is not available");
		    }
        }
	}
	
	bookingHistory(event){
    	const target = event.target;
    	var bookingID = $(event.currentTarget).attr('id');
	    axios.get("/api/bookingmaster/get/one/bookingforvendor/"+bookingID)
	    .then((response) => {
			var status=response.data.status;
			var expenses = response.data.tripExpenses;
			var routeCoordinates = response.data.routeCoordinates;
			this.setState({
				status,
				expenses,
				routeCoordinates
			},()=>{
				if(this.state.status && this.state.status.length > 0){
			    	var startInfo = this.state.status.filter((elem)=>{return elem.value==="Started From Garage"});
			    	if(startInfo && startInfo.length > 0){
			    		var startOdo = startInfo[0].odometerReading
			    	}else{
			    		var startOdo = '-'
			    	}
			    	var pickupInfo = this.state.status.filter((elem)=>{return elem.value==="Reached Pickup Location"});
			    	if(pickupInfo && pickupInfo.length > 0){
			    		var pickupOdo = pickupInfo[0].odometerReading
			    	}else{
			    		var pickupOdo = '-'
			    	}
			    	var dropInfo = this.state.status.filter((elem)=>{return elem.value==="Reached Drop Location"});
			    	if(dropInfo && dropInfo.length > 0){
			    		var dropOdo = dropInfo[0].odometerReading
			    	}else{
			    		var dropOdo = '-'
			    	}
			    	var reachInfo = this.state.status.filter((elem)=>{return elem.value==="Reached Garage"});
			    	if(reachInfo && reachInfo.length > 0){
			    		var reachOdo = reachInfo[0].odometerReading
			    	}else{
			    		var reachOdo = '-'
			    	}
			    	this.setState({
			    		startInfo:startOdo,
			    		pickupInfo:pickupOdo,
			    		dropInfo:dropOdo,
			    		reachInfo:reachOdo
			    	})
			    }

			    var getTotalKms =  (index,routeCoordinates) => {
				        if (routeCoordinates.length > 0) {
				            var totalDistance = 0;            
				            var totalTime = 0;            
				            for (var i = 0; i < index+1; i++) {
				            	if(routeCoordinates[i].createdAt){
				            		var currentDuration = moment(routeCoordinates[i].createdAt).format('HH:mm:ss')
							        currentDuration = currentDuration.split(":");
							        var hrs = parseInt(currentDuration[0],10);
							        var min = parseInt(currentDuration[1],10);
							        var sec = parseInt(currentDuration[2],10);
							        var currDurationSec = sec + (60*min) + (60*60*hrs); 
							        totalTime +=currDurationSec;
				                }
				            	if(routeCoordinates[i].distanceTravelled){
				                	totalDistance += parseFloat(routeCoordinates[i].distanceTravelled);
				                }
				            }
				            var minutes = Math.floor(totalTime / 60);
				        	return({totalDistance:totalDistance,totalTime:minutes});
				        }

				};

				
			    if(this.state.routeCoordinates && this.state.routeCoordinates.length > 0){
						
			    	var pickupCordinateInfo = this.state.routeCoordinates.filter((elem)=>{return elem.status==="Reached Pickup Location"});
			    	if(pickupCordinateInfo && pickupCordinateInfo.length > 0){
			    		var pickupCordinateIndex = this.state.routeCoordinates.findIndex((elem)=>elem.status==="Reached Pickup Location")
				    	var pickupdistTime =  getTotalKms(pickupCordinateIndex,this.state.routeCoordinates)
			    		var topickupDist = pickupdistTime.totalDistance
			    		var topickupTime = pickupdistTime.totalTime
			    	}else{
			    		var topickupDist = '-'
			    		var topickupTime = "-"
			    	}

			    	var dropCordinateInfo = this.state.routeCoordinates.filter((elem)=>{return elem.status==="Reached Drop Location"});
			    	if(dropCordinateInfo && dropCordinateInfo.length > 0){
			    		var dropCordinateIndex = this.state.routeCoordinates.findIndex((elem)=>elem.status==="Reached Drop Location")
				    	var dropdistTime =  getTotalKms(dropCordinateIndex,this.state.routeCoordinates)
			    		var dropDist = dropdistTime.totalDistance
			    		var dropTime = dropdistTime.totalTime
			    	}else{
			    		var dropDist = '-'
			    		var dropTime = "-"
			    	}

			    	var garageCordinateInfo = this.state.routeCoordinates.filter((elem)=>{return elem.status==="Reached Garage"});
			    	if(garageCordinateInfo && garageCordinateInfo.length > 0){
			    		var garageCordinateIndex = this.state.routeCoordinates.findIndex((elem)=>elem.status==="Reached Garage")
				    	var garagedistTime =  getTotalKms(garageCordinateIndex,this.state.routeCoordinates)
			    		var garageDist = garagedistTime.totalDistance
			    		var garageTime = garagedistTime.totalTime
			    	}else{
			    		var garageDist = '-'
			    		var garageTime = "-"
			    	}


			    	this.setState({
			    		topickupDist:topickupDist,
			    		topickupTime:topickupTime,
			    		dropTime:dropTime,
			    		dropDist:dropDist,
			    		garageDist:garageDist,
			    		garageTime:garageTime
			    	})
			    }
			})
	    })
	    .catch((error) =>{
	    	console.log("error",error);
	    	swal(error)
	    })
	    //get expense type details
		axios.get('/api/expensetypemaster/showAllData')
	    .then((res)=>{
	      this.setState({'expenseData':res.data})
	    })
	    .catch((err)=>{swal(err)})


	}
	
	getAddress(latitude,longitude,index){
		Geocode.setApiKey(this.state.googleAPIKey);
		Geocode.setLanguage("en");
		Geocode.setRegion("es");
		Geocode.enableDebug();
		Geocode.fromLatLng(latitude, longitude).then(
		response => {
			this.setState({
				["address"+index] : response.results[0].formatted_address
			},()=>{
				console.log("address=>",this.state["address"+index])
			})
		},
		error => {
			console.error(error);
		});
	}

	inform(event){
		var booking_id = event.currentTarget.id;
		axios.get('/api/entitymaster/get/one/'+localStorage.getItem("company_Id"))
		.then(company=>{
			company = company.data[0]
			axios.get('/api/bookingmaster/get/one/bookingforvendor/'+booking_id)
			.then(booking=>{
				
				var sendData = {
		          "event": "Event14",
		          "toUser_id": localStorage.getItem('user_ID'), // To user _id //vendor emo
		          "toUserRole":"vendoradmin",
		          "company_id": localStorage.getItem("company_Id"), // company _id (ref: entitymaster)
		          "intendedUser_id":booking.data.driverDetails._id, // manager _id
		          "intendedUserRole":'driver',
		          "otherAdminRole":'vendoradmin', // in our case corporateadmin or vendoradmin
		          "variables": {
		            "VendorName"         	: company.companyName,
		            "VendorLocation"  		: company.locations[0].city,
		            "VendorEmailID" 		: company.companyEmail,
		            "VendorContact" 		: company.companyPhone,
		            "CorporateName"	 		: booking.data.companyName,
		            "EmployeeName"	 		: booking.data.firstName+" "+(booking.data.middleName ? booking.data.middleName : "")+" "+booking.data.lastName,
		            "EmployeeID" 			: booking.data.employeeID,
		            "EmployeeEmailID" 		: booking.data.employeeEmail,
		            "EmployeeContactNumber" : booking.data.contactNo,
		            "TripPick-upLocation" 	: booking.data.from.address,
		            "TripDropLocation" 		: booking.data.to.address,
		            "TripFromDate&Time" 	: moment(booking.data.pickupDate).format('DD-MMM-YY') +' '+ booking.data.pickupTime,
		            "TripToDate&Time" 		: moment(booking.data.returnDate).format('DD-MMM-YY') +' '+ booking.data.returnTime,
		            "VehicleCategory" 		: booking.data.vehicleCategory,
		            "VehicleBrand" 			: booking.data.vehicleBrand,
		            "VehicleModel" 			: booking.data.vehicleModel,
		            "VehicleNumber" 		: booking.data.vehicleNumber,
		            "VehicleColor" 			: booking.data.vehicleColor,
		            "DriverName" 			: booking.data.driverDetails.firstName+" "+booking.data.driverDetails.middleName+" "+booking.data.driverDetails.lastName,
		            "DriverContactNumber" 	: booking.data.driverDetails.contactNo,
		            "DriverLicenseNumber" 	: "",
		            }
		          }
		          axios.post('/api/masternotifications/post/sendNotification', sendData)
		          .then((res) => {
		          		console.log('sendDataToUser in result==>>>', res.data)
		          })
		          .catch((error) => { console.log('notification error: ',error)})
			})
			.catch(err=>{
				console.log("error=>",err);
			})		
			
		})
		.catch(err=>{
			console.log("error=>",err);
		})
 		
      	
    }

    imgBrowse(event) {
    event.preventDefault();
    var ticketProof = [];
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      for (var i = 0; i < event.currentTarget.files.length; i++) {
        var file = event.currentTarget.files[i];
        if (file) {
          var fileName = file.name;
          var fileSize = file.size;
          var ext = fileName.split('.').pop();
          if (ext === "jpg" || ext === "png" || ext === "jpeg" || ext === "JPG" || ext === "PNG" || ext === "JPEG") {
            if(fileSize > 1048576){
							swal("Allowed file size is 1MB");
						}else{
              if (file) {
                var objTitle = { fileInfo: file }
                ticketProof.push(objTitle);
              } else {
                swal("Images not uploaded");
              }//file
            }
          } else {
            swal("Allowed images formats are (jpg,png,jpeg)");
            this.setState({
              gotImageticketProof:false
            })
          }//file types
        }//file
      }//for 

      if (event.currentTarget.files) {
        this.setState({
          gotImageticketProof:true
        })
        main().then(formValues => {
          var ticketProof = this.state.ticketProof;
          for (var k = 0; k < formValues.length; k++) {
            ticketProof.push(formValues[k].ticketProof)
          }

          this.setState({
            ticketProof   : ticketProof,
            imageUploaded : false
          })
        });

        async function main() {
          var formValues = [];
          for (var j = 0; j < ticketProof.length; j++) {
            var config = await getConfig();

            console.log('config=>',config)

            var s3url = await s3upload(ticketProof[j].fileInfo, config, this);
            const formValue = {
              "ticketProof": s3url,
              "status": "New"
            };
            formValues.push(formValue);
          }
          return Promise.resolve(formValues);
        }


        function s3upload(image, configuration) {
          console.log('image: ',image,configuration)
          return new Promise(function (resolve, reject) {
            S3FileUpload
              .uploadFile(image, configuration)
              .then((Data) => {
                resolve(Data.location);
              })
              .catch((error) => {
              })
          })
        }
        function getConfig() {
          return new Promise(function (resolve, reject) {
            axios
              .post('/api/projectsettings/getS3Details/S3')
              .then((response) => {
                const config = {
                  bucketName: response.data.bucket,
                  dirName: process.env.REACT_APP_ENVIRONMENT,
                  region: response.data.region,
                  accessKeyId: response.data.key,
                  secretAccessKey: response.data.secret,
                }
                resolve(config);
              })
              .catch(function (error) {
              })

          })
        }
      }
    }
  }

  deleteLogo(event) {
    event.preventDefault();
    var ticketProof = this.state.ticketProof;
    const index = ticketProof.indexOf(event.target.id);
    if (index > -1) {
      ticketProof.splice(index, 1);
    }
    this.setState({
      ticketProof: ticketProof,
      gotImageticketProof : false
    })
  }

    addExpense(event){
    	event.preventDefault();
    	var id = $(event.currentTarget).attr('id');
    	this.setState({showExpense:true,bookingID:id})

    }
    SubmitExpense(event){
    	event.preventDefault()
    	var formvalues ={
    		bookingID:this.state.bookingID,
    		updatedBy:localStorage.getItem("user_ID"),
    		tripExpenses:{
	    		ticketName:this.state.ticketName,
	    		ticketPrice:this.state.ticketPrice,
	    		ticketProof:this.state.ticketProof ? this.state.ticketProof[0] : ""
	    	}
    	}
    	console.log('formvalues=>',formvalues)
    	axios.patch('/api/bookingmaster/updatetripexpenses',formvalues)
    	.then((data)=>{
    		swal('Expense Data Added!')
    		axios.get("/api/bookingmaster/get/one/bookingforvendor/"+this.state.bookingID)
		    .then((response) => {
				var expenses = response.data.tripExpenses;
				this.setState({
					expenses
				},()=>{
					this.setState({
		    			showExpense:false,
		    			bookingID:"",
		    			ticketName:"",
		    			ticketPrice:0,
		    			ticketProof:""
		    		})	
				})
		    })
		    .catch((error) =>{
		    	console.log("error",error);
		    })
    		
    	})
    	.catch((error)=>{
    		swal(error)
    	})
    }
	render() {
		
        return (
	       	<div id="tableComponent" className="col-lg-12 col-sm-12 col-md-12 col-xs-12">	
	       	{
	       		this.state.tableObjects.searchApply === true ? 
		       		<div className="col-lg-4 col-md-4  col-xs-12 col-sm-12 marginTop8 NOpadding pull-left">
          
		        		<label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding labelform">Search</label>
		        		<div className="input-group inputBox-main">
					        <input type="text" onChange={this.tableSearch.bind(this)} className="NOpadding-right form-control inputBox" ref="tableSearch" id="tableSearch" name="tableSearch"/>
					    	<span className="input_status input-group-addon "><i className="fa fa-search"></i></span>
					    </div>
		        	</div>	
	        	:
	        	null
	       	}
			<React.Fragment>
				<div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 pull-left noPadding" >
	                <span className="blocking-span" >
	                  <input type="text" name="search" className="col-lg-8 col-md-8 col-sm-8 col-xs-12 form-control"
	                    placeholder="Search by booking id & name..." onInput={this.props.tableSearch.bind(this)} />
	                </span>
	            </div>
		       	{ this.state.tableObjects.downloadApply === true ?
	            	this.state.tableData  && this.state.tableName && this.state.tableData.length != 0 ?
				       		 
		                    <div className="col-lg-1 col-md-1 col-xs-12 col-sm-12 NOpadding  pull-right ">
		                        <button type="button" className="btn pull-left tableprintincon" title="Print Table" onClick={this.printTable}><i className="fa fa-print" aria-hidden="true"></i></button>
		                           <ReactHTMLTableToExcel
		                                id="table-to-xls"                           
		                                className="download-table-xls-button fa fa-download tableicons pull-right"
		                                table={this.state.id}
		                                sheet="tablexls"
		                                filename={this.state.tableName}
		                                buttonText=""/>
		                    </div>
		                : null
	                
	                : null
	            }
            </React.Fragment>
	       	{
	       		this.state.tableObjects.paginationApply === true ?
		       		<div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 NOpadding pull-right">
			       		<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
							<label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 marginTop8 NOpadding formLable">Data Per Page</label>
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding  input-group inputBox-main">
								<select onChange={this.setLimit.bind(this)} value={this.state.limitRange} id="limitRange" ref="limitRange" name="limitRange" className="col-lg-12 col-md-12 col-sm-6 col-xs-12 inputBox noPadding  form-control">
									<option value="Not Selected" disabled>Select Limit</option>
									<option value={10}>10</option>
									<option value={25}>25</option>
									<option value={50}>50</option>
									<option value={100}>100</option>
									<option value={500}>500</option>
								</select>
							</div>
						</div>						
					</div>
				:
				null        
	       	}
	       
					
           
	            <div className="col-lg-12 col-sm-12 col-md-12 col-xs-12 NOpadding marginTop8">			            	        
	                <div className="table-responsive"  id="section-to-print">
						<table className="table iAssureITtable-bordered table-striped table-hover fixedTable" id={this.state.id}>
	                        <thead className="tempTableHeader fixedHeader">	     
		                        <tr className="tempTableHeader">
		                            { this.state.twoLevelHeader.apply === true ?
		                            	this.state.twoLevelHeader.firstHeaderData.map((data, index)=>{
		                            		return(
												<th key={index} colSpan={data.mergedColoums} className="umDynamicHeader srpadd textAlignCenter">{data.heading}</th>			
		                            		);		                            		
		                            	})	
		                            	:
		                            	null									
									}
	                            </tr>
	                            <tr className="">
	                            <th className="umDynamicHeader srpadd text-center">Sr.No.</th>
		                            { this.state.tableHeading ?
										Object.entries(this.state.tableHeading).map( 
											([key, value], i)=> {
													if(key === 'actions'){
														return(
															<th key={i} className="umDynamicHeader srpadd text-center">{value}</th>
														);	
													}else{
														return(
															<th key={i} className="umDynamicHeader srpadd textAlignLeft">{value} <span onClick={this.sort.bind(this)} id={key} className="fa fa-sort tableSort"></span></th>
														);	
													}
																							
											}
										) 
										:
										<th className="umDynamicHeader srpadd textAlignLeft"></th>
									}
	                            </tr>
	                        </thead>
	                        <tbody className="scrollContent">
	                           { this.state.tableData && this.state.tableData.length > 0 ?
	                           		this.state.tableData.map( 
										(value, i)=> {
											return(
												<tr key={i} className="">
													<td className="textAlignCenter">{this.state.startRange+1+i}</td>
													{
														Object.entries(value).map( 
															([key, value1], i)=> {
																// console.log('key, value1',key, value1);
																if($.type(value1) === 'string'){
																	var regex = new RegExp(/(<([^>]+)>)/ig);
																	var value2 = value1 ? value1.replace(regex,'') : '';
																	var aN = value2.replace(this.state.reA, "");
																	if(aN && $.type( aN ) === 'string'){
																		var textAlign = 'textAlignLeft noWrapText'
																	}else{
																		var bN = value1 ? parseInt(value1.replace(this.state.reN, ""), 10) : '';
																		if(bN){
																			var textAlign = 'textAlignRight';
																		}else{
																			var textAlign = 'textAlignLeft noWrapText';
																		}
																	}
																}else{
																	var textAlign = 'textAlignRight';
																}	
																var found = Object.keys(this.state.tableHeading).filter((k)=> {
																  return k === key;
																});
																if(found.length > 0){
																	if(key !== 'id'){
																		if(key==="car"){
																			if(value1!==" "){
																				return(
																					<td className={textAlign} key={i}>
																						<div className={textAlign} dangerouslySetInnerHTML={{ __html:value1}}></div>
																							{value.pickupDate ? 
																								<div>
																									{
																										value.statusValue === "Vendor Accepted" || value.statusValue === "Vendor Accepted" || value.statusValue === "Trip Allocated To Driver" || value.statusValue === "Driver Accepted" || value.statusValue === "Driver Rejected"?
																										<button type="button" className="btn blueBtn vendorBtn" data-toggle="modal" id={value._id} data-category={value.vehicleCategory} data-city={value.pickUpCity} data-pickupdate={value.pickupDate} data-returndate={value.returnDate} data-status={value.statusValue} data-target={"#AllocateCar-"+value._id} type={"Category"} onClick={this.vehicleData.bind(this)}><b>Change</b></button>
															                                        	:
															                                        	null
																                                     }
																									<div className="modal" id={"AllocateCar-"+value._id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
																                                        <div className="modal-dialog modal-lg " role="document">
																                                            <div className="modal-content UMmodalContent ummodallftmg ummodalmfdrt  ">
																                                                <div className="modal-header adminModal-header col-lg-12 col-md-12 col-sm-12 col-xs-12">
																                                                    <h4 className="CreateTempModal col-lg-11 col-md-11 col-sm-11 col-xs-11 textAlignLeft" id="exampleModalLabel"><b>Change Car</b></h4>
																                                                    <div className="adminCloseCircleDiv pull-right  col-lg-1 col-md-1 col-sm-1 col-xs-1 NOpadding-left NOpadding-right">
																                                                        <button type="button" className="adminCloseButton" data-dismiss="modal" aria-label="Close">
																                                                            <span aria-hidden="true">&times;</span>
																                                                        </button>
																                                                    </div>     
																                                                </div>
																                                                <div className="modal-body adminModal-body col-lg-12 col-md-12 col-sm-12 col-xs-12">
																                                                    {/* <AllocateCar 
																	                                                    tableHeading={this.state.AllocateCartableHeading}
																	                                                    tableData={this.state.AllocateCartableData}
																	                                                    tableObjects={this.state.AllocateCartableObjects}
																	                                                    getData={this.allocateCargetData.bind(this)}
																	                                                    // bookinggetData={this.props.getData(this.state.startRange, this.state.limitRange)}
																	                                                    bookingID={value._id}
																	                                                    getvehicledriverDetails={this.allocateCargetData.bind(this)}
																                                                   	/>*/}

																													{this.state.AllocateCartableData != "-" ?
																													<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 noPadding">
																														<ul className="nav nav-tabs col-lg-4 col-md-4 col-xs-12 col-sm-12" style={{'marginBottom':'20px'}}>
																										                  <li className="active" id="Category" ><a data-toggle="tab" type="Category" id={value._id} data-category={value.vehicleCategory} data-city={value.pickUpCity} data-pickupdate={value.pickupDate} data-returndate={value.returnDate} data-status={value.statusValue}  data-target={"#AllocateCar-"+value._id}  onClick={this.vehicleData.bind(this)} href="#home">Requested Category</a></li>
																										                  <li id="Others"><a data-toggle="tab" type="Others" id={value._id} data-category={value.vehicleCategory} data-pickupdate={value.pickupDate} data-city={value.pickUpCity} data-returndate={value.returnDate} data-status={value.statusValue}  data-target={"#AllocateCar-"+value._id} onClick={this.vehicleData.bind(this)} href="#menu1">Other Categories</a></li>
																										                </ul>
																														<div className="table-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding">
																															<table className="table iAssureITtable-bordered table-striped table-hover">
																																<thead className="tempTableHeader">
																																	<tr className="">
																																		<th className="umDynamicHeader srpadd textAlignCenter"> Sr No. </th>
																																		<th className="umDynamicHeader srpadd textAlignCenter"> Photo </th>
																																		<th className="umDynamicHeader srpadd textAlignCenter"> Vehicle Details </th>
																																		<th className="umDynamicHeader srpadd textAlignCenter"> Driver </th>
																																		<th className="umDynamicHeader srpadd textAlignCenter"> Insurance Validity </th>
																																		<th className="umDynamicHeader srpadd textAlignCenter"> PUC Validity </th>
																																		<th className="umDynamicHeader srpadd textAlignCenter"> Permit Validity </th>
																																		<th className="umDynamicHeader srpadd textAlignCenter"> Availability in Duration </th>
																																		<th className="umDynamicHeader srpadd textAlignCenter"> Action </th>
																																	</tr>
																																</thead>
																																<tbody>
																																	{this.state.AllocateCartableData
																																		?
																																		this.state.AllocateCartableData.map((data, index) => {
																																			return (
																																				<tr key={index}>
																																					<td className="textAlignLeft">{index+1}</td>
																																					<td className="textAlignLeft">
																																						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding marginsBottom imageBox" id="hide">
																									                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 brdlogos2" id="licenseProof">
																									                                                            <img src={data.vehicleImage.length > 0 ? data.vehicleImage[0] : "/images/noImagePreview.png"} className="img-responsive logoStyle2" />
																									                                                        </div>
																									                                                    </div>
																																					</td>
																																					<td className="textAlignLeft">
																																						<div>{"("+data.category+ " "+data.vehiclecolor+")"}<p>{data.brand+" "+data.model}</p><p>{data.vehicleNumber}</p></div>
																																					</td>
																																					<td className="textAlignLeft">{data.driverName}</td>
																																					<td className="textAlignLeft">{data.insuranceDate}</td>
																																					<td className="textAlignLeft">{data.PUCValidUpto}</td>
																																					<td className="textAlignLeft">{data.permitValidUpto}</td>
																																					<td className="textAlignLeft">{data.availabilityStatus}</td>
																																					<td className="textAlignLeft">
																																						<span>
																																							<button className="btn blueBtn vendorBtn" title="Assign this Vehicle" id={data._id} data-bookingid={value._id} data-driverid={data.driverID ? data.driverID : ""}   data-availabilitystatus={data.availabilityStatus} onClick={this.assignVehicle.bind(this)}>Change</button> 
																																						</span>
																																					</td>
																																				</tr>
																																			);
																																		})
																																		:
																																		null
																																	}
																																</tbody>
																															</table>
																														</div>
																														</div>
																														:
																														<div className="centernote col-lg-12"> No data available </div>
																													}
																                                                </div>
																                                            </div>
																                                        </div>
																                                    </div>
																                                </div>
																                            :null
																                        	}
																					</td>
																				); 						
																			}else if (value1===" " && value.statusValue === "Vendor Accepted"){
																				return(
																					<td className={textAlign} key={i}>
																						<button type="button" className="btn blueBtn vendorBtn" data-toggle="modal" id={value._id} data-category={value.vehicleCategory} data-city={value.pickUpCity} data-pickupdate={value.pickupDate} data-returndate={value.returnDate} data-status={value.statusValue}  data-target={"#AllocateCar-"+value._id} type={"Category"} onClick={this.vehicleData.bind(this)}><b>Allocate</b></button>
													                                    <div className="modal" id={"AllocateCar-"+value._id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
													                                        <div className="modal-dialog modal-lg " role="document">
													                                            <div className="modal-content UMmodalContent ummodallftmg ummodalmfdrt  ">
													                                                <div className="modal-header adminModal-header col-lg-12 col-md-12 col-sm-12 col-xs-12">
													                                                    <h4 className="CreateTempModal col-lg-11 col-md-11 col-sm-11 col-xs-11 textAlignLeft" id="exampleModalLabel"><b>Allocate Car</b></h4>
													                                                    <div className="adminCloseCircleDiv pull-right  col-lg-1 col-md-1 col-sm-1 col-xs-1 NOpadding-left NOpadding-right">
													                                                        <button type="button" className="adminCloseButton" data-dismiss="modal" aria-label="Close">
													                                                            <span aria-hidden="true">&times;</span>
													                                                        </button>
													                                                    </div>     
													                                                </div>
													                                                <div className="modal-body adminModal-body col-lg-12 col-md-12 col-sm-12 col-xs-12">
													                                                  	
																										{this.state.AllocateCartableData != "-" ?
																											<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding">
																												<ul className="nav nav-tabs col-lg-4 col-md-4 col-xs-12 col-sm-12" style={{'marginBottom':'20px'}}>
																								                  <li className="active" id="Category" ><a data-toggle="tab" type="Category" id={value._id} data-category={value.vehicleCategory} data-city={value.pickUpCity} data-pickupdate={value.pickupDate} data-returndate={value.returnDate} data-status={value.statusValue}  data-target={"#AllocateCar-"+value._id}  onClick={this.vehicleData.bind(this)} href="#home">Requested Category</a></li>
																								                  <li id="Others"><a data-toggle="tab" type="Others" id={value._id} data-category={value.vehicleCategory} data-city={value.pickUpCity} data-pickupdate={value.pickupDate} data-returndate={value.returnDate} data-status={value.statusValue}  data-target={"#AllocateCar-"+value._id} onClick={this.vehicleData.bind(this)} href="#menu1">Other Categories</a></li>
																								                </ul>
																												<div className="table-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding">
																													<table className="table iAssureITtable-bordered table-striped table-hover">
																														<thead className="tempTableHeader">
																															<tr className="">
																																<th className="umDynamicHeader srpadd textAlignCenter"> Sr No. </th>
																																<th className="umDynamicHeader srpadd textAlignCenter"> Photo </th>
																																<th className="umDynamicHeader srpadd textAlignCenter"> Vehicle Details </th>
																																<th className="umDynamicHeader srpadd textAlignCenter"> Driver </th>
																																<th className="umDynamicHeader srpadd textAlignCenter"> Insurance Validity </th>
																																<th className="umDynamicHeader srpadd textAlignCenter"> PUC Validity </th>
																																<th className="umDynamicHeader srpadd textAlignCenter"> Permit Validity </th>
																																<th className="umDynamicHeader srpadd textAlignCenter"> Availability in Duration </th>
																																<th className="umDynamicHeader srpadd textAlignCenter"> Action </th>
																															</tr>
																														</thead>
																														<tbody>
																															{this.state.AllocateCartableData && this.state.AllocateCartableData.length > 0 
																																?
																																this.state.AllocateCartableData.map((data, index) => {
																																	return (
																																		<tr key={index}>
																																			<td className="textAlignLeft">{index+1}</td>
																																			<td className="textAlignLeft">
																																				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding marginsBottom imageBox" id="hide">
																							                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 brdlogos2" id="licenseProof">
																							                                                            <img src={data.vehicleImage.length > 0 ? data.vehicleImage[0] : "/images/noImagePreview.png"} className="img-responsive logoStyle2" />
																							                                                        </div>
																							                                                    </div>
																																			</td>
																																			<td className="textAlignLeft">
																																				<div>{"("+data.category+ " "+data.vehiclecolor+")"}<p>{data.brand+" "+data.model}</p><p>{data.vehicleNumber}</p></div>
																																			</td>
																																			<td className="textAlignLeft">{data.driverName}</td>
																																			<td className="textAlignLeft">{data.insuranceDate}</td>
																																			<td className="textAlignLeft">{data.PUCValidUpto}</td>
																																			<td className="textAlignLeft">{data.permitValidUpto}</td>
																																			<td className="textAlignLeft">{data.availabilityStatus}</td>
																																			<td className="textAlignLeft">
																																				{data.availabilityStatus === 'Booked' ?
																																				<span>
																																					NA
																																				</span>
																																				:
																																				<span>
																																					<button className="btn blueBtn vendorBtn" title="Assign this Vehicle" id={data._id} data-bookingid={value._id} data-driverid={data.driverID ? data.driverID : ""}   data-availabilitystatus={data.availabilityStatus} onClick={this.assignVehicle.bind(this)}>Assign</button> 
																																				</span>
																																				}
																																			</td>
																																		</tr>
																																	);
																																})
																																:
																																<tr><td colSpan="9" style={{'textAlign':'center'}}>Requested Car Category is {value.vehicleCategory}. But No {value.vehicleCategory} car is available for {value.pickUpCity} location</td></tr>
																															}
																														</tbody>
																													</table>
																												</div>
																											</div>	
																											:
																											<div className="centernote col-lg-12"> No data available </div>
																										}
																					
													                                                </div>
													                                            </div>
													                                        </div>
													                                    </div>
												                                    </td>
																				)
																			}else{
																				return(
																					<td className={textAlign} key={i}> -
												                                    </td>
												                                )
												                            }
																		}else if(key==="driver"){
																			if(value1!==" "){
																				return(
																					<td className={textAlign} key={i}>
																						<div className={textAlign} dangerouslySetInnerHTML={{ __html:value1}}></div>
																							{value.pickupDate ? 
																								<div>
																									{value.statusValue === "Vendor Accepted" || value.statusValue === "Vendor Accepted" || value.statusValue === "Trip Allocated To Driver" || value.statusValue === "Driver Accepted" || value.statusValue === "Driver Rejected"?
																										<button type="button" className="btn blueBtn vendorBtn" data-toggle="modal" id={value._id} data-target={"#AllocateDriver-"+value._id} data-pickupdate={value.pickupDate} data-returndate={value.returnDate} data-vehicleid={value.vehicle_id} data-city={value.pickUpCity} onClick={this.getDrivers.bind(this)}><b>Change</b></button>
																										:
																										null
																									}
																                                    <div className="modal" id={"AllocateDriver-"+value._id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
																                                        <div className="modal-dialog modal-lg " role="document">
																                                            <div className="modal-content UMmodalContent ummodallftmg ummodalmfdrt  ">
																                                                <div className="modal-header adminModal-header col-lg-12 col-md-12 col-sm-12 col-xs-12">
																                                                    <h4 className="CreateTempModal col-lg-11 col-md-11 col-sm-11 col-xs-11 textAlignLeft" id="exampleModalLabel"><b>Change Driver</b></h4>
																                                                    <div className="adminCloseCircleDiv pull-right  col-lg-1 col-md-1 col-sm-1 col-xs-1 NOpadding-left NOpadding-right">
																                                                        <button type="button" className="adminCloseButton" data-dismiss="modal" aria-label="Close">
																                                                            <span aria-hidden="true">&times;</span>
																                                                        </button>
																                                                    </div>     
																                                                </div>
																                                                <div className="modal-body adminModal-body col-lg-12 col-md-12 col-sm-12 col-xs-12">
																													{this.state.driverArray != "-" ?
																														<div className="table-responsive topmr40 col-lg-12 col-md-12 col-sm-12 col-xs-12">
																															<table className="table iAssureITtable-bordered table-striped table-hover">
																																<thead className="tempTableHeader">
																																	<tr className="">
																																		<th className="umDynamicHeader srpadd textAlignCenter"> Sr No. </th>
																																		<th className="umDynamicHeader srpadd textAlignCenter"> Driver </th>
																																		<th className="umDynamicHeader srpadd textAlignCenter"> Licence Date</th>
																																		<th className="umDynamicHeader srpadd textAlignCenter"> Status </th>
																																		<th className="umDynamicHeader srpadd textAlignCenter"> Action </th>
																																	</tr>
																																</thead>
																																<tbody>
																																	{this.state.driverArray && this.state.driverArray.length > 0
																																		?
																																		this.state.driverArray.map((data, index) => {
																																			return (
																																				<tr key={index}>
																																					<td className="textAlignLeft">{index+1}</td>
																																					<td className="textAlignLeft">{data.driverName}</td>
																																					<td className="textAlignLeft">{data.drivingLicense}</td>																																				<td className="textAlignLeft">{data.availabilityStatus}</td>
																																					<td className="textAlignLeft">
																																						<span>
																																						{
																																							data.availabilityStatus === "Available"?
																																							<button className="btn blueBtn vendorBtn" title="Assign this Driver" id={data._id} data-bookingid={value._id} data-vehicleid={value.vehicle_id ? value.vehicle_id : ""}   data-availabilitystatus={data.availabilityStatus} onClick={this.changeDriver.bind(this)}>Change</button> 
																																							:
																																							"-"
																																						}
																																						</span>
																																					</td>
																																				</tr>
																																			);
																																		})
																																		:
																																		<tr><td colSpan="5" style={{'textAlign':'center'}}>No driver available for {value.pickUpCity} location</td></tr>
																																	}
																																</tbody>
																															</table>
																														</div>
																														:
																														<div className="centernote col-lg-12"> No data available </div>
																													}
																                                                </div>
																                                            </div>
																                                        </div>
																                                    </div>
															                                    </div>
																							: null
																							}
																					</td>
																				); 						
																			}else if(value1===" " && value.statusValue === "Vendor Accepted"){
																				return(
																					<td className={textAlign} key={i}>
																						<button type="button" className="btn blueBtn vendorBtn" data-toggle="modal" id={value._id} data-target={"#AllocateDriver-"+value._id} data-pickupdate={value.pickupDate} data-returndate={value.returnDate} data-vehicleid={value.vehicle_id} data-city={value.pickUpCity} onClick={this.getDrivers.bind(this)}><b>Allocate</b></button>
													                                    <div className="modal" id={"AllocateDriver-"+value._id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
													                                        <div className="modal-dialog modal-lg " role="document">
													                                            <div className="modal-content UMmodalContent ummodallftmg ummodalmfdrt  ">
													                                                <div className="modal-header adminModal-header col-lg-12 col-md-12 col-sm-12 col-xs-12">
													                                                    <h4 className="CreateTempModal col-lg-11 col-md-11 col-sm-11 col-xs-11 textAlignLeft" id="exampleModalLabel"><b>Allocate Driver</b></h4>
													                                                    <div className="adminCloseCircleDiv pull-right  col-lg-1 col-md-1 col-sm-1 col-xs-1 NOpadding-left NOpadding-right">
													                                                        <button type="button" className="adminCloseButton" data-dismiss="modal" aria-label="Close">
													                                                            <span aria-hidden="true">&times;</span>
													                                                        </button>
													                                                    </div>     
													                                                </div>
													                                                <div className="modal-body adminModal-body col-lg-12 col-md-12 col-sm-12 col-xs-12">
																										{this.state.driverArray != "-" ?
																											<div className="table-responsive topmr40 col-lg-12 col-md-12 col-sm-12 col-xs-12">
																												<table className="table iAssureITtable-bordered table-striped table-hover">
																													<thead className="tempTableHeader">
																														<tr className="">
																															<th className="umDynamicHeader srpadd textAlignCenter"> Sr No. </th>
																															<th className="umDynamicHeader srpadd textAlignCenter"> Driver </th>
																															<th className="umDynamicHeader srpadd textAlignCenter"> Licence Date</th>
																															<th className="umDynamicHeader srpadd textAlignCenter"> Status </th>
																															<th className="umDynamicHeader srpadd textAlignCenter"> Action </th>
																														</tr>
																													</thead>
																													<tbody>
																														{this.state.driverArray && this.state.driverArray.length > 0
																															?
																															this.state.driverArray.map((data, index) => {
																																return (
																																	<tr key={index}>
																																		<td className="textAlignLeft">{index+1}</td>
																																		<td className="textAlignLeft">{data.driverName}</td>
																																		<td className="textAlignLeft">{data.drivingLicense}</td>
																																		<td className="textAlignLeft">{data.availabilityStatus}</td>
																																		<td className="textAlignLeft">
																																			<span>
																																				<button className="btn blueBtn vendorBtn" title="Assign this Driver" id={data._id} data-bookingid={value._id} data-vehicleid={value.vehicle_id ? value.vehicle_id : ""}   data-availabilitystatus={data.availabilityStatus} onClick={this.assignDriver.bind(this)}>Assign</button> 
																																			</span>
																																		</td>
																																	</tr>
																																);
																															})
																															:
																															<tr><td colSpan="5" style={{'textAlign':'center'}}>No driver available for {value.pickUpCity} location</td></tr>
																														}
																													</tbody>
																												</table>
																											</div>
																											:
																											<div className="centernote col-lg-12"> No data available </div>
																										}
													                                                </div>
													                                            </div>
													                                        </div>
													                                    </div>
												                                    </td>
																				)
																			}else{
																				return(
																					<td className={textAlign} key={i}> -
												                                    </td>
												                                )
												                            }
																		}else{
																			return(<td className={textAlign} key={i}><div className={textAlign} dangerouslySetInnerHTML={{ __html:value1}}></div></td>); 						
																		}
																	}																	
																}

															}
														)
													}
													{this.state.tableHeading && this.state.tableHeading.actions ? 
														<td className="textAlignCenter">
															<span>
																<i className="fa fa-pencil" title="Edit" id={value._id.split("-").join("/")} onClick={this.edit.bind(this)}></i>&nbsp; &nbsp; 
																{this.props.editId && this.props.editId === value._id? null :<i className={"fa fa-trash redFont "+value._id} id={value._id+'-Delete'} data-toggle="modal" title="Delete" data-target={"#showDeleteModal-"+value._id}></i>}
															</span>
															<div className="modal" id={"showDeleteModal-"+(value._id)} role="dialog">
		                                                        <div className=" adminModal adminModal-dialog col-lg-12 col-md-12 col-sm-12 col-xs-12">
		                                                          <div className="modal-content adminModal-content col-lg-4 col-lg-offset-4 col-md-6 col-md-offset-3 col-sm-10 col-sm-offset-1 col-xs-12 noPadding">
		                                                            <div className="modal-header adminModal-header col-lg-12 col-md-12 col-sm-12 col-xs-12">
		                                                            <div className="adminCloseCircleDiv pull-right  col-lg-1 col-lg-offset-11 col-md-1 col-md-offset-11 col-sm-1 col-sm-offset-11 col-xs-12 NOpadding-left NOpadding-right">
		                                                              <button type="button" className="adminCloseButton" data-dismiss="modal" data-target={"#showDeleteModal-"+(value._id)}>&times;</button>
		                                                            </div>
		                                                           
		                                                            </div>
		                                                            <div className="modal-body adminModal-body col-lg-12 col-md-12 col-sm-12 col-xs-12">
		                                                              <h4 className="blackLightFont textAlignCenter examDeleteFont col-lg-12 col-md-12 col-sm-12 col-xs-12">Are you sure you want to delete?</h4>
		                                                            </div>
		                                                            
		                                                            <div className="modal-footer adminModal-footer col-lg-12 col-md-12 col-sm-12 col-xs-12">
		                                                              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
		                                                                <button type="button" className="btn adminCancel-btn col-lg-7 col-lg-offset-1 col-md-4 col-md-offset-1 col-sm-8 col-sm-offset-1 col-xs-10 col-xs-offset-1" data-dismiss="modal">CANCEL</button>
		                                                              </div>
		                                                              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
		                                                                <button onClick={this.delete.bind(this)} id={(value._id).replace(/-/g, "/")} type="button" className="btn examDelete-btn col-lg-7 col-lg-offset-5 col-md-7 col-md-offset-5 col-sm-8 col-sm-offset-3 col-xs-10 col-xs-offset-1" data-dismiss="modal">DELETE</button>
		                                                              </div>
		                                                            </div>
		                                                          </div>
		                                                        </div>
		                                                    </div>
														</td>
														:
														null
													}
													{this.state.tableHeading && this.state.tableHeading.bookingAction ? 
															<td className="">
															{
																value.statusValue ==="Allocated To Vendor" && value.allocatedToVendor === localStorage.getItem("company_Id")?
																<span>
																<div className="dropdown ht30">
																	<div className="">
																		<i className="fa fa-ellipsis-h fz15" aria-hidden="true"></i>
															    		<div className="dropdown-content ulAllign ulWidth">
																			<ul className="pdcls ulbtm">
																				<li className="" title="Accept" id={value._id.split("-").join("/")} onClick={this.acceptVendor.bind(this)}>
																					<a className=""><i className="fa fa-check "aria-hidden="true"></i>&nbsp;&nbsp;Accept</a>
																				</li>
																				<li className=" " title="Reject" id={value._id.split("-").join("/")} onClick={this.rejectVendor.bind(this)}>
																					<a className=""><i className="fa fa-close" aria-hidden="true"></i>&nbsp;&nbsp;Reject</a>
																				</li>
																				<li className="" title="History" data-toggle="modal" id={value._id} data-target={"#bookingHistory-"+value._id} onClick={this.bookingHistory.bind(this)}>
																					<a className=""><i className="fa fa-history" aria-hidden="true"></i>&nbsp;&nbsp;History</a>
																				</li>
																			</ul>
																		</div>
																	</div>
																</div>
																	{/*<button className="btn actionBtn btn-success" title="Accept" id={value._id.split("-").join("/")} onClick={this.acceptVendor.bind(this)}>Accept</button> 
																	<button className="btn actionBtn btn-danger" title="Reject" id={value._id.split("-").join("/")} onClick={this.rejectVendor.bind(this)}>Reject</button> 
                													<button type="button" className="btn blueBtn actionBtn" title="History" data-toggle="modal" id={value._id} data-target={"#bookingHistory-"+value._id} onClick={this.bookingHistory.bind(this)}><b>History</b></button>*/}
																</span>
																:
																value.statusValue === "Vendor Accepted"  || value.statusValue === "Driver Rejected" || value.statusValue === 'Trip Allocated To Driver'?
																<span>
																<div className="dropdown ht30">
																	<div className="">
																		<i className="fa fa-ellipsis-h fz15" aria-hidden="true"></i>
															    		<div className="dropdown-content ulAllign ulWidth">
																			<ul className="pdcls ulbtm">
																				<li className=" " title="Cancel" id={value._id.split("-").join("/")} onClick={this.cancelVendor.bind(this)}>
																					<a className=""><i className="fa fa-ban "aria-hidden="true"></i>&nbsp;&nbsp;Cancel</a>
																				</li>
																				<li className=" " title="History" data-toggle="modal" id={value._id} data-target={"#bookingHistory-"+value._id} onClick={this.bookingHistory.bind(this)}>
																					<a className=""><i className="fa fa-history" aria-hidden="true"></i>&nbsp;&nbsp;History</a>
																				</li>
																			</ul>
																		</div>
																	</div>
																</div>
																	{/*<button className="btn actionBtn btn-danger" title="Cancel" id={value._id.split("-").join("/")} onClick={this.cancelVendor.bind(this)}>Cancel</button> 
                													<button type="button" className="btn blueBtn actionBtn" title="History" data-toggle="modal" id={value._id} data-target={"#bookingHistory-"+value._id} onClick={this.bookingHistory.bind(this)}><b>History</b></button>*/}
																</span>
																:
																value.statusValue === "Driver Accepted" ?
																<span>
																	<div className="dropdown ht30">
																		<div className="">
																			<i className="fa fa-ellipsis-h fz15" aria-hidden="true"></i>
																    		<div className="dropdown-content ulAllign ulWidth">
																				<ul className="pdcls ulbtm">
																					<li className=" " title="Inform" id={value._id} onClick={this.inform.bind(this)}>
																						<a className=""><i className="fa fa-info "aria-hidden="true"></i>&nbsp;&nbsp;Inform Car Details</a>
																					</li>
																					<li className=" " title="Cancel" id={value._id.split("-").join("/")} onClick={this.cancelVendor.bind(this)}>
																						<a className=""><i className="fa fa-ban "aria-hidden="true"></i>&nbsp;&nbsp;Cancel</a>
																					</li>
																					<li className=" " title="History" data-toggle="modal" id={value._id} data-target={"#bookingHistory-"+value._id} onClick={this.bookingHistory.bind(this)}>
																						<a className=""><i className="fa fa-history" aria-hidden="true"></i>&nbsp;&nbsp;History</a>
																					</li>
																				</ul>
																			</div>
																		</div>
																	</div>
																	{/*<button className="btn blueBtn actionBtn" title="Inform" id={value._id} onClick={this.inform.bind(this)}>Inform Car Details</button> 
																	<button className="btn actionBtn btn-danger" title="Cancel" id={value._id.split("-").join("/")} onClick={this.cancelVendor.bind(this)}>Cancel</button> 
                													<button type="button" className="btn blueBtn actionBtn" title="History" data-toggle="modal" id={value._id} data-target={"#bookingHistory-"+value._id} onClick={this.bookingHistory.bind(this)}><b>History</b></button>*/}
																</span>
																:
																value.statusValue === "Vendor Rejected" || value.statusValue === "Cancelled By Vendor"?
																<span>
                													<button type="button" className="btn blueBtn actionBtn" title="History" data-toggle="modal" id={value._id} data-target={"#bookingHistory-"+value._id} onClick={this.bookingHistory.bind(this)}><b>History</b></button>
																</span>
																:
																value.statusValue === "Trip Completed" ?
																<span>
																    <div className="dropdown ht30">
																		<div className="">
																			<i className="fa fa-ellipsis-h fz15" aria-hidden="true"></i>
																    		<div className="dropdown-content ulAllign ulWidth">
																				<ul className="pdcls ulbtm">
																					<li className=" " title="Ready To Bill" id={value._id.split("-").join("/")} onClick={this.readyToBill.bind(this)}>
																						<a className=""><i className="fa fa-money "aria-hidden="true"></i>&nbsp;&nbsp;Ready To Bill</a>
																					</li>
																					{value.status && value.status.filter(function(e) { return e.value === 'Ready To Bill'; }).length > 0 ?
				                													null
				                													:
																					<li className=" " title="Expenses Details" data-toggle="modal" id={value._id} data-target={"#expensesDetails-"+value._id} onClick={this.bookingHistory.bind(this)}>
																						<a className=""><i className="fa fa-ban "aria-hidden="true"></i>&nbsp;&nbsp;Expenses</a>
																					</li>
																					}
																					<li className=" " title="History" data-toggle="modal" id={value._id} data-target={"#bookingHistory-"+value._id} onClick={this.bookingHistory.bind(this)}>
																						<a className=""><i className="fa fa-history" aria-hidden="true"></i>&nbsp;&nbsp;History</a>
																					</li>
																					<li className=" " title="Tracking">
																						<a target='_blank' href={"tracking/"+value._id} className=""><i className="fa fa-map" aria-hidden="true"></i>&nbsp;&nbsp;Tracking</a>
																					</li>
																				</ul>
																			</div>
																		</div>
																	</div>
																	{/*<button type="button" className="btn btn-success actionBtn" style={{width:'100px'}} title="Ready To Bill" id={value._id.split("-").join("/")} onClick={this.readyToBill.bind(this)}>Ready To Bill</button> 
                													<button type="button" className="btn blueBtn actionBtn" title="History" data-toggle="modal" id={value._id} data-target={"#bookingHistory-"+value._id} onClick={this.bookingHistory.bind(this)}><b>History</b></button>
                													{value.status && value.status.filter(function(e) { return e.value === 'Ready To Bill'; }).length > 0 ?
                													null
                													:
                													<button type="button" className="btn blueBtn actionBtn" title="Expenses Details" data-toggle="modal" id={value._id} data-target={"#expensesDetails-"+value._id} onClick={this.bookingHistory.bind(this)}><b>Expenses</b></button>
																    }
																    <a target='_blank' href={"tracking/"+value._id}><button type="button" className="btn blueBtn actionBtn" title="Tracking" ><b>Tracking</b></button></a>*/}
																</span>
																:
																<span>
																	<div className="dropdown ht30">
																		<div className="">
																			<i className="fa fa-ellipsis-h fz15" aria-hidden="true"></i>
																    		<div className="dropdown-content ulAllign ulWidth">
																				<ul className="pdcls ulbtm">
																					{value.status && value.status.filter(function(e) { return e.value === 'Ready To Bill'; }).length > 0 ?
				                													null
				                													:
																					<li className=" " title="Expenses Details" data-toggle="modal" id={value._id} data-target={"#expensesDetails-"+value._id} onClick={this.bookingHistory.bind(this)}>
																						<a className=""><i className="fa fa-ban "aria-hidden="true"></i>&nbsp;&nbsp;Expenses</a>
																					</li>
																					}
																					<li className=" " title="History" data-toggle="modal" id={value._id} data-target={"#bookingHistory-"+value._id} onClick={this.bookingHistory.bind(this)}>
																						<a className=""><i className="fa fa-history" aria-hidden="true"></i>&nbsp;&nbsp;History</a>
																					</li>
																					<li className=" " title="Tracking">
																						<a target='_blank' href={"tracking/"+value._id} className=""><i className="fa fa-map" aria-hidden="true"></i>&nbsp;&nbsp;Tracking</a>
																					</li>
																				</ul>
																			</div>
																		</div>
																	</div>
                													{/*<button type="button" className="btn blueBtn actionBtn" title="History" data-toggle="modal" id={value._id} data-target={"#bookingHistory-"+value._id} onClick={this.bookingHistory.bind(this)}><b>History</b></button>
                													{value.status && value.status.filter(function(e) { return e.value === 'Ready To Bill'; }).length > 0 ?
                													null
                													:
                													<button type="button" className="btn blueBtn vendorBtn" title="Expenses Details" data-toggle="modal" id={value._id} data-target={"#expensesDetails-"+value._id} onClick={this.bookingHistory.bind(this)}><b>Expenses</b></button>
                													}
                													<a target='_blank' href={"tracking/"+value._id}><button type="button" className="btn blueBtn vendorBtn" title="Tracking" ><b>Tracking</b></button></a>*/}
																</span>
																}		
																<div className="modal" id={"bookingHistory-"+(value._id)} role="dialog">
			                                                        <div className=" adminModal adminModal-dialog col-lg-12 col-md-12 col-sm-12 col-xs-12">
			                                                          	<div className="modal-content adminModal-content col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-10 col-sm-offset-1 col-xs-12 noPadding">
				                                                            <div className="modal-header adminModal-header col-lg-12 col-md-12 col-sm-12 col-xs-12">
																				<h4 className="CreateTempModal col-lg-11 col-md-11 col-sm-11 col-xs-11 textAlignLeft" id="exampleModalLabel"><b>Booking History</b></h4>
																				<div className="adminCloseCircleDiv pull-right  col-lg-1 col-md-1 col-sm-1 col-xs-1 NOpadding-left NOpadding-right">
																					<button type="button" className="adminCloseButton" data-dismiss="modal" aria-label="Close">
																						<span aria-hidden="true">&times;</span>
																					</button>
																				</div>                                                        
				                                                            </div>
				                                                            <div className="modal-body adminModal-body col-lg-12 col-md-12 col-sm-12 col-xs-12">
																				    <div>
																				    	{this.state.status && this.state.status.length > 0 && this.state.startInfo != '-' ?
																				    	<div className="table-responsive topmr40 col-lg-12 col-md-12 col-sm-12 col-xs-12">
																							<table className="table iAssureITtable-bordered table-striped table-hover">
																								<thead className="tempTableHeader">
																								<tr className="summaryCol"><th className="textAlignCenter" colSpan="4">Summary</th></tr>
																									<tr className="">
																										<th className="umDynamicHeader srpadd textAlignCenter"> Status</th>
																										<th className="umDynamicHeader srpadd textAlignCenter"> Total Time(mins) </th>
																										<th className="umDynamicHeader srpadd textAlignCenter"> Odometer Reading </th>
																										<th className="umDynamicHeader srpadd textAlignCenter"> Total Distance(KM) </th>
																									</tr>
																								</thead>
																								<tbody>
																									<tr>
																										<td>Started From Garage</td>
																										<td>0</td>
																										<td>{this.state.startInfo}</td>
																										<td>0</td>
																									</tr>
																									<tr>
																										<td>Reached Pickup Location</td>
																										<td>{this.state.topickupTime}</td>
																										<td>{this.state.pickupInfo}</td>
																										<td>{this.state.topickupDist}</td>
																									</tr>
																									<tr>
																										<td>Reached Drop Location</td>
																										<td>{this.state.dropTime}</td>
																										<td>{this.state.dropInfo}</td>
																										<td>{this.state.dropDist}</td>
																									</tr>
																									<tr>
																										<td>Reached Garage</td>
																										<td>{this.state.garageTime}</td>
																										<td>{this.state.reachInfo}</td>
																										<td>{this.state.garageDist}</td>
																									</tr>
																								</tbody>
																							</table>
																						</div>
																						:
																						<div className="centernote col-lg-12"> No data available </div>
																						}
																						{/*<div className="table-responsive topmr40 col-lg-12 col-md-12 col-sm-12 col-xs-12">
																							<table className="table iAssureITtable-bordered table-striped table-hover">
																								<thead className="tempTableHeader">
																									<tr className="">
																										<th className="umDynamicHeader srpadd textAlignCenter"> Sr No.</th>
																										<th className="umDynamicHeader srpadd textAlignCenter"> Status</th>
																										<th className="umDynamicHeader srpadd textAlignCenter"> Date & Time </th>
																										<th className="umDynamicHeader srpadd textAlignCenter"> Odometer Reading </th>
																										<th className="umDynamicHeader srpadd textAlignCenter"> Odometer Proof </th>
																									</tr>
																								</thead>
																								<tbody>
																									{this.state.status
																										?
																										this.state.status.map((log, index) => {
																											return (
																												
																												<tr key={index} >
																													<td className="textAlignLeft col-lg-1">{index+1}</td>
																													<td className="textAlignLeft col-lg-3">
																													{(log.value === "Started From Garage" || log.value === "Reached Pickup Location" || 
																													log.value === "Start OTP Verified" || log.value === "Start From Pickup" ||	
																													log.value === "Intermediate Stop" || log.value === "Reached Destination" ||
																													log.value === "Reached Drop Location" || log.value === "End OTP Verified" || log.value === "Reached Garage" ) && log.latitude && log.longitude ?
																														<Collapsible trigger={<a>{log.value}</a>} triggerStyle={{"cursor":"pointer"}} onOpening={()=>this.getAddress(log.latitude, log.longitude,index)}>
																															<p>{ this.state["address"+index]}</p>																														
																														</Collapsible> 
																														:
																														log.value	
																													}	
																													</td>
																													<td className="textAlignLeft col-lg-2">{log.odometerReading ? log.odometerReading + " KM" : "-"}</td>
																													<td className="textAlignLeft col-lg-4">{moment(log.statusAt).format("LLLL")}</td>
																													<td className="col-lg-2 textAlignLeft">
																													{
																														log.proof? 
																														<ModalImage
																														  small={log.proof}
																														  large={log.proof}
																														  alt={log.value}
																														  className="img-responsive proofImage"
																														/>
																														:
																														"-"
																													}
																													</td>
																												</tr>
																											);
																										})
																										:null
																									}
																								</tbody>
																							</table>
																						</div>*/}
																					</div>
																					
			                                                            	</div>	
			                                                          	</div>
			                                                        </div>
			                                                    </div>
			                                                    <div className="modal" id={"expensesDetails-"+(value._id)} role="dialog">
			                                                        <div className=" adminModal adminModal-dialog col-lg-12 col-md-12 col-sm-12 col-xs-12">
			                                                          	<div className="modal-content adminModal-content col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-10 col-sm-offset-1 col-xs-12 noPadding">
				                                                            <div className="modal-header adminModal-header col-lg-12 col-md-12 col-sm-12 col-xs-12">
																				<h4 className="CreateTempModal col-lg-11 col-md-11 col-sm-11 col-xs-11 textAlignLeft" id="exampleModalLabel"><b>Trip Expenses</b></h4>
																				<div className="adminCloseCircleDiv pull-right  col-lg-1 col-md-1 col-sm-1 col-xs-1 NOpadding-left NOpadding-right">
																					<button type="button" className="adminCloseButton" data-dismiss="modal" aria-label="Close">
																						<span aria-hidden="true">&times;</span>
																					</button>
																				</div>                                                        
				                                                            </div>
				                                                            <div className="modal-body adminModal-body col-lg-12 col-md-12 col-sm-12 col-xs-12">
				                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				                                                            	<div className="pull-right" title="Add Expenses" id={value._id} onClick={this.addExpense.bind(this)}><i className="fa fa-plus-circle addExpenseBtn"></i>
                                                								</div>
				                                                            </div>
				                                                            {this.state.showExpense ?
				                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding">
				                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				                                                            	<div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
				                                                            	<label className="labelform textleft col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Ticket Name<i className="astrick">*</i></label>
				                                                            	<select onChange={this.handleChange.bind(this)} id="ticketName" name="ticketName" value={this.state.ticketName} className="col-lg-12 col-md-12 col-sm-12 col-xs-12  noPadding  form-control">
																					<option disabled value="">Select Type</option>
																					{this.state.expenseData && this.state.expenseData.length > 0 ?
																						this.state.expenseData.map((data,index)=>{
																							return(
																								<option key={index}>{data.type}</option>
																								)
																						})
																						:
																						null
																					}
																					
																				</select>
																				</div>
																				<div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
																					<label className="labelform textleft col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Ticket Price<i className="astrick">*</i></label>
																					<input autoComplete="off" className="input form-control tdtextboxstyle" name="ticketPrice" type="number" min="0"  id="ticketPrice" value={this.state.ticketPrice} onChange={this.handleChange.bind(this)} required />
																				</div>
																				<div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
																				<label className="labelform textleft col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Ticket Proof<i className="astrick">*</i></label>
																					<div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
																						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding " id="hide">
																						 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgSty uploadImageClient" id="LogoImageUpOne" title="Upload Image">
														                                      <div><i className="fa fa-camera"></i></div>
														                                      <input multiple onChange={this.imgBrowse.bind(this)} id="ticketProof" type="file" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" title="" name="ticketProof" />
														                                  </div>
														                                </div>
														                            </div>
														                            <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8">
													                                {
													                                  this.state.ticketProof && this.state.ticketProof.length > 0 ?
													                                    this.state.ticketProof.map((logo, i) => {
													                                      return (
													                                        <div key={i} className="col-lg-3 col-md-3 col-sm-12 col-xs-12 NOpadding-right">
													                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding marginsBottom" id="hide">
													                                            <label className="labelform deletelogo col-lg-12 col-md-12 col-sm-12 col-xs-12" title="Delete Logo"  id={logo} onClick={this.deleteLogo.bind(this)}>x</label>
													                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 CustomImageUploadBIImg" id="LogoImageUpOne">
													                                                  <img src={logo} alt="ticketProof" className="img-responsive logoStyle" />
													                                            </div>
													                                          </div>
													                                        </div>
													                                      );
													                                    })
													                                    :
													                                    null
													                                                                         
													                                }
													                                </div>
																				</div>
				                                                            </div>
				                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt">
													                          <button className="btn button3 pull-right" onClick={this.SubmitExpense.bind(this)} >Add</button>
													                        </div>
				                                                            </div>
				                                                            :
				                                                            null
				                                                        	}
																				{
																				    this.state.status ?
																						<div className="table-responsive topmr40 col-lg-12 col-md-12 col-sm-12 col-xs-12">
																							<table className="table iAssureITtable-bordered table-striped table-hover">
																								<thead className="tempTableHeader">
																									<tr className="">
																										<th className="umDynamicHeader srpadd textAlignLeft"> Sr No.</th>
																										<th className="umDynamicHeader srpadd textAlignLeft"> Ticket Name</th>
																										<th className="umDynamicHeader srpadd textAlignLeft"> Ticket Price </th>
																										<th className="umDynamicHeader srpadd textAlignLeft"> Ticket Proof </th>
																									</tr>
																								</thead>
																								<tbody>
																									{this.state.expenses && this.state.expenses.length > 0 ?
																										this.state.expenses.map((log, index) => {
																											return (
																												
																												<tr key={index} >
																													<td className="textAlignLeft col-lg-1">{index+1}</td>
																													<td className="textAlignLeft col-lg-6">{log.ticketName}</td>
																													<td className="textAlignLeft col-lg-3">{log.ticketPrice ? log.ticketPrice + " ₹" : "NA"}</td>
																													<td className="textAlignCenter col-lg-2">
																													{
																														log.ticketProof? 
																														<ModalImage
																														  small={log.ticketProof}
																														  large={log.ticketProof}
																														  alt={log.ticketName}
																														  className="img-responsive proofImage"
																														/>
																														:
																														"-"
																													}
																													</td>
																												</tr>
																											);
																										})
																										:
																										<td colSpan={4} className="centernote col-lg-12"> No Expenses Added </td>
																									}
																								</tbody>
																							</table>
																						</div>
																					:
																					<div className="centernote col-lg-12"> No data available </div>
																				}
			                                                            	</div>	
			                                                          	</div>
			                                                        </div>
			                                                    </div>
															</td>																					
														:
														null
													}
												</tr>
											);										
										}
									) 	
									:
									<tr className="trAdmin"><td colSpan={this.state.tableHeading ? Object.keys(this.state.tableHeading).length+1 : 1} className="noTempData textAlignCenter">No Record Found!</td></tr>               		
								}
	                    </tbody>
	                    </table>
	                    {
	                    	this.state.tableObjects.paginationApply === true ?
		                    	this.state.tableData && this.state.tableData.length > 0 ?
		                    	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 paginationAdminWrap">
			                    	<div className="col-lg-1 col-md-1 col-sm-1 col-xs-1">
				                    	{ 
					                    		this.state.limitRange >=  this.state.dataLength?		                    		
						                    	null
						                    	:
				                    			<div className="btn btn-primary" onClick={this.showFirstTweentyButtons.bind(this)} title="Fast Backward"><i className="fa fa-fast-backward"></i></div>
				                    	}
			                    	</div>
			                    	<div className="col-lg-1 col-md-1 col-sm-1 col-xs-1">
				                    	{ 
				                    		this.state.limitRange >=  this.state.dataLength?                  		
					                    	null
					                    	:
					                    	<div className="btn btn-primary" onClick={this.showPreviousPaginationButtons.bind(this)} title="Previous"><i className="fa fa-caret-left"></i></div>
					                    }
				                    </div>
									<ol className="questionNumDiv paginationAdminOES col-lg-8 col-md-8 col-sm-8 col-xs-8 mainExamMinDeviceNoPad">										 
										{this.state.paginationArray}
									</ol>
									<div className="col-lg-1 col-md-1 col-sm-1 col-xs-1">
										{
											this.state.paginationArray.length < 20 ?
											null
											:
											<div className="btn btn-primary" onClick={this.showNextPaginationButtons.bind(this)} title="Next"><i className="fa fa-caret-right"></i></div>
										}
									</div>
									<div className="col-lg-1 col-md-1 col-sm-1 col-xs-1">
										{
											this.state.paginationArray.length < 20 ?
											null
											:
											<div className="btn btn-primary" onClick={this.showLastTweentyButtons.bind(this)} title="Fast Forward"><i className="fa fa-fast-forward"></i></div>
										}
									</div>							
								</div>
								:
								null
							:
							null
	                    }
	                    
	                </div>                        
	            </div>
	            
            </div>
	    );
		
	} 

}



const mapStateToProps = (state)=>{
  return {
    bookingList        : state.bookingList,
  }
};
const mapDispatchToProps = (dispatch)=>{
  return {
     bookingList  : (bookingList)=>dispatch({type: "BOOKING_LIST", bookingList: bookingList}),
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(IAssureTable));
