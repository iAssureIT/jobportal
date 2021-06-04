import React, { Component } from 'react';
import $ from 'jquery';
import jQuery from 'jquery';
import axios from 'axios';
import swal from 'sweetalert';
import 'bootstrap/js/tab.js';
import S3FileUpload from 'react-s3';
import { withRouter } from 'react-router-dom';
import IAssureTable           from "../../../../IAssureTable/IAssureTable.jsx";



class StatutoryDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			'state': "",
			'stateCode':"",
			'GSTIN': "",
			'statutoryarray': [],
			'GSTDocument': [],
			'PAN': "",
			'PANDocument': [],
			'openForm': false,
			openFormIcon : false,
			'pathname': this.props.entity,
			'entityID': this.props.match.params ? this.props.match.params.entityID : '',
			'statutoryID': this.props.match.params ? this.props.match.params.statutoryID : '',
            RecordsTable:[],
			tableHeading:{
	            state:"State",
	            GSTIN:"Tax Number",
	            PAN:"PAN",
	            actions:"Action"
	          },
	          tableObjects : {
	          paginationApply : false,
	          searchApply     : false,
	          editUrl         : '/' + this.props.entity + "/statutory-details/" + this.props.match.params.entityID,
	          deleteMethod    : 'delete',
        	  apiLink         : '/api/entitymaster/deleteStatutory/' + this.props.match.params.entityID,
	          downloadApply   : true
	        },
	        startRange        : 0,
            limitRange        : 100000,
		
            "editId": this.props.match.params ? this.props.match.params.fieldID : '',
            "IdToDelete" : "",

           
		};
		this.handleChange = this.handleChange.bind(this);
	 	this.handleChangeState = this.handleChangeState.bind(this);
		this.camelCase = this.camelCase.bind(this)
	}

	
	componentDidMount() {
		this.getData();
		this.getCountryConfigData();
		
		window.scrollTo(0, 0);
		this.handleChange = this.handleChange.bind(this);
		this.setState({
			'entityID': this.props.match.params ? this.props.match.params.entityID : '',
			'statutoryID': this.props.match.params ? this.props.match.params.statutoryID : '',
		},()=>{this.edit()})
	}

	componentWillReceiveProps(nextProps) {
		
		this.edit();
		this.getData();
		this.setState({
			'entityID': nextProps.match.params ? nextProps.match.params.entityID : '',
			'statutoryID':nextProps.match.params ? nextProps.match.params.statutoryID : '',
		})
	}

	getCountryConfigData(){
		axios.get("/api/entitymaster/getEntity/"+this.props.match.params.entityID)
	      .then((response) => {
	      	if(response.data){
		        this.setState({
		          countryCode     : response.data.countryCode
		        },()=>{
		          this.getStates(this.state.countryCode)
		        })
		        axios.get('/api/countryspecificConfig/getTaxName/'+response.data.countryCode)
			    .then((res)=>{
			      this.setState({taxName:res.data.taxName})
			    })
			    .catch((error) => {
			      })
		     }
	       })
	      .catch((error) => {
	      })
	}

	getData(){
		this.setState({
			'entityID': this.props.match.params ? this.props.match.params.entityID : '',
			'statutoryID': this.props.match.params ? this.props.match.params.statutoryID : '',
		})
		
		axios.get('/api/entitymaster/getAllStatutoryDetails/'+this.props.match.params.entityID)
		.then((response)=>{
			var data = response.data.reverse()
			var tableData = data.map((a, i)=>{
				var gstimage = a.GSTDocument.map((image,i)=>{return '<a href='+image+' target="_blank" title="Click to View"><img src='+image+' class="img-responsive imgtabLD logoStyle" /></a>'})
				var panimage = a.PANDocument.map((image,i)=>{return '<a href='+image+' target="_blank" title="Click to View"><img src='+image+' class="img-responsive imgtabLD logoStyle" /></a>'})
	        return{
	        	_id:a._id,
	            state:a.state,
	            GSTIN:a.GSTIN ? (a.GSTIN +"</br>"+(a.GSTDocument && a.GSTDocument.length > 0 ? gstimage:'')) : 'NIL',
	            PAN:a.PAN ? (a.PAN +"</br>"+(a.PANDocument && a.PANDocument.length > 0 ? panimage:'')): 'NIL',
	            action:""
	        }
	      })
          this.setState({RecordsTable:tableData})
			
		})
		.catch((error)=>{console.log('error: ',error)})

	}

	openForm() {		
		this.setState({
			openForm: this.state.openForm === false ? true : false,
			openFormIcon : this.state.openFormIcon === false ? true : false
		}, () => {
			if (this.state.openForm === true) {
				this.validations();
			}
		})

	}
	validations() {
		$.validator.addMethod("regxstate", function (value, element, arg) {
			return arg !== value;
		}, "Please select the state");
		$.validator.addMethod("regxGSTIN", function (value, element, regexpr) {
			return regexpr.test(value);
		}, "Please enter valid number.");
		$.validator.addMethod("regxPAN", function (value, element, regexpr) {
			return regexpr.test(value);
		}, "Please enter valid PAN.");
		jQuery.validator.addMethod("notEqual", function(value, element, param) {
	      return this.optional(element) || value != param;
	    }, "Please specify a different (non-default) value");
		

		jQuery.validator.setDefaults({
			debug: true,
			success: "valid"
		});
		$("#locationsDetail").validate({
			rules: {
				states: {
					required: true,
					regxstate: "-- Select --"
				},
				GSTIN: {
					required:true,
					regxGSTIN: /^[0-9]{2}[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[A-Za-z1-9]{1}[z|Z]{1}[A-Za-z0-9]{1}$|^$/,
				},
				PAN: {
					required:true,
					regxPAN: /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$|^$/,
				},
			},
			errorPlacement: function (error, element) {
				if (element.attr("name") === "states") {
					error.insertAfter("#states");
				}
				if (element.attr("name") === "GSTIN") {
					error.insertAfter("#GSTIN");
				}
				if (element.attr("name") === "PAN") {
					error.insertAfter("#PAN");
				}
			}
		})
	}
	handleChange(event) {
		const target = event.target;
		const name = target.name;
		this.setState({
			[name]: event.target.value
		});
	}
	
	getStates(country) {
		axios.get("/api/states/get/list/"+country)
			.then((response) => {
				this.setState({
					stateArray: response.data
				})
				$('#Statedata').val(this.state.states);
			})
			.catch((error) => {
			})
	}
	handleChangeState(event) {
		const target = event.target;
	    var designation = document.getElementById("states");
    	var stateCode = designation.options[designation.selectedIndex].getAttribute("statecode");
		this.setState({
			[event.target.name]: event.target.value,
			stateCode : stateCode
		});

	}
	camelCase(str) {
		return str
			.toLowerCase()
			.split(' ')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	}
	locationdetailBack(event) {
		event.preventDefault();
		var entityID = this.props.match.params.entityID;

		if (this.state.GSTIN || this.state.PAN || this.state.states || this.state.stateCode || this.state.GSTDocument.length > 0  || this.state.PANDocument.length > 0) {
			swal({
				// title: 'abc',
				text: "It seems that you are trying to enter statutory details. Click 'Cancel' to continue entering. Click 'Ok' to go to next page. But you may lose values if already entered in the form",
				buttons: {
					cancel: {
						text: "Cancel",
						value: false,
						visible: true,
						className: "CancelButtonSwal"
					},
					confirm: {
						text: "OK",
						value: true,
						visible: true,
						className: "OkButtonSwal",
						closeModal: true
					}
				},
			})
				.then((value) => {
					if (value) {
						if (entityID) {
							this.props.history.push("/" +this.state.pathname + "/basic-details/" + entityID);
						} else {
							this.props.history.push("/" + this.state.pathname + "/basic-details");
						}
					} else {
						this.props.history.push("/" +this.state.pathname + "/statutory-details/" + entityID);
					}
				})
			$(".OkButtonSwal").parents('.swal-button-container').addClass('postionSwalRight');
			$(".CancelButtonSwal").parents('.swal-button-container').addClass('postionSwalLeft');

		} else {
			if (entityID && entityID != undefined) {
				this.props.history.push("/" +this.state.pathname+ "/basic-details/" + entityID);
			} else {
				this.props.history.push("/" +this.state.pathname+ "/basic-details");
			}
		}
	}
	statutoryDetailAdd(event) {
		event.preventDefault();
		var entityID = this.props.match.params.entityID;
		if ($('#locationsDetail').valid()) {
			var formValues = {
				'entityID': entityID,
				'statutoryDetails': {
					'stateCode': this.state.stateCode,
					'state': this.state.states,
					'GSTDocument': this.state.GSTDocument,
					'GSTIN': this.state.GSTIN ? this.state.GSTIN.toUpperCase(): this.state.GSTIN,
					'PAN': this.state.PAN ? this.state.PAN.toUpperCase():this.state.PAN,
					'PANDocument': this.state.PANDocument,
				}
			}
			axios.patch('/api/entitymaster/addStatutoryDetails', formValues)
				.then((response) => {
					$('.inputText').val('');
					this.setState({
						'openForm': false,
						'gotImageGSTIN': false,
						'gotImagePAN': false,
						'stateCode': "",
						'states': '',
						'GSTIN': "",
						'GSTDocument': [],
						'PAN': "",
						'PANDocument': [],
					});
					this.statutoryDetails();
					this.getData();
					$(".swal-text").css("font-family", "sans-serif");
					if(response.data.duplicated === true){
						swal('Statutory details already exist')
					}else{
						swal('Statutory details added successfully.');
					}
					// this.setState({			
					// 	openFormIcon : this.state.openFormIcon === false ? true : false
					// });
					$("#locationsDetail").validate().resetForm();
				})
				.catch((error) => {
					console.log('error adding location: ',error)
				})
		}else{
			$(event.target).parent().parent().parent().find('.errorinputText.error:first').focus();
		}
	}
	locationdetailBtn(event) {
		event.preventDefault();
		var entityID = this.props.match.params.entityID;
		if (this.state.stateCode || this.state.GSTIN || this.state.GSTDocument.length > 0 || this.state.PAN || this.state.PANDocument.length > 0) {
			swal({
				// title: 'abc',
				text: "It seems that you are trying to enter a statutory details. Click 'Cancel' to continue entering. Click 'Ok' to go to next page. But you may lose values if already entered in the form",
				buttons: {
					cancel: {
						text: "Cancel",
						value: false,
						visible: true,
						className: "CancelButtonSwal"
					},
					confirm: {
						text: "OK",
						value: true,
						visible: true,
						className: "OkButtonSwal",
						closeModal: true
					}
				},
			})
				.then((value) => {
					if (value) {
						if(entityID === undefined){
						this.props.history.push("/" + this.state.pathname + "/location-details" );
						}else{
						this.props.history.push("/" + this.state.pathname + "/location-details/" + entityID);
						}
					} else {
						if(entityID === undefined){
						this.props.history.push("/" + this.state.pathname + "/statutory-details" );
						}else{
						this.props.history.push("/" + this.state.pathname + "/statutory-details/" + entityID);
						}
					}
				})
			$(".OkButtonSwal").parents('.swal-button-container').addClass('postionSwalRight');
			$(".CancelButtonSwal").parents('.swal-button-container').addClass('postionSwalLeft');

		} else {
			if(entityID === undefined){
			this.props.history.push("/" + this.state.pathname + "/location-details" );
			}else{
			this.props.history.push("/" + this.state.pathname + "/location-details/" + entityID);
			}
		}
	}

	edit() {
		console.log('this.props.match.params: ',this.props.match.params)
		console.log('this.props.match.params.statutoryID: ',this.props.match.params.statutoryID)
		var entityID = this.state.entityID;
		var statutoryID = this.state.statutoryID;
		if (statutoryID) {
			axios.get('/api/entitymaster/getAllStatutoryDetails/' + entityID)
				.then((response) => {
					var editData = response.data.filter((a) => a._id === statutoryID);
					$('#states').prop('disabled', true);
					this.setState({
						'openForm': true,
						'locationType': editData[0].locationType,
						'addressLine1': editData[0].addressLine1,
						'addressLine2': editData[0].addressLine2,
						'country': editData[0].country,
						'countryCode': editData[0].countryCode,
						'states': editData[0].state,
						'stateCode': editData[0].stateCode,
						'district': editData[0].district,
						'branchCode': editData[0].branchCode,
						'latLng': {lat:editData[0].latitude, lng:editData[0].longitude},
						'city': editData[0].city,
						'area': editData[0].area,
						'pincode': editData[0].pincode,
						'GSTIN': editData[0].GSTIN,
						'GSTDocument': editData[0].GSTDocument,
						'PAN': editData[0].PAN,
						'PANDocument': editData[0].PANDocument,
					}, () => {
						if (this.state.openForm === true) {
							this.validations();
						}
					})
				})
				.catch((error) => {
				})
		}
	}

	// updateStateDoc(){
		
	// }

	statutoryDetails() {
		axios.get('/api/entitymaster/getEntity/' + this.props.match.params.entityID)
			.then((response) => {
				this.setState({
					statutoryarray: response.data.statutoryDetails.reverse()
				})
			})
			.catch((error) => {
			})
		return [];
	}

	deleteEntity(event){
		event.preventDefault();
		this.setState({IdToDelete: event.currentTarget.getAttribute('data-id')})
		$('#deleteEntityModal').show();
    }
    confirmDelete(event){
    	event.preventDefault();
    	var entityID = this.props.match.params.entityID;
    	var statutoryID = this.state.IdToDelete;
    	axios.delete('/api/entitymaster/deleteStatutory/' + entityID + "/" + statutoryID)
            .then((response)=>{
           		if (response.data) {
					this.setState({
						'openForm': false,
						'statutoryID': "",
						'stateCode': "",
						'states': '',
						'GSTIN': "",
						'GSTDocument': [],
						'PAN': "",
						'PANDocument': [],
					});
					this.props.history.push('/' + this.state.pathname + '/statutory-details/' + entityID);
					this.statutoryDetails();
					this.getData();
           			swal({
	                    text : "Statutory deleted successfully.",
	                    // text : (this.state.entityType === "appCompany" ? "Organizational Settings" :this.state.entityType) +" is deleted successfully.",
					  });
					  $(".swal-text").css("text-transform", "capitalize");
           		}	else{
           			swal({
	                    text : "Sorry,Failed to delete.",
	                  });
           		}
           		$('#deleteEntityModal').hide();
	              this.props.getEntities();
	              this.props.hideForm();
                 

            })
            .catch((error)=>{
            })
    }
    closeModal(event){
    	event.preventDefault();
    	$('#deleteEntityModal').hide(); 
    }
    Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  	}
	locationDelete(event) {
		event.preventDefault();
		var entityID = this.state.entityID;
		var statutoryID = event.target.id;
		axios.delete('/api/entitymaster/deleteStatutory/' + entityID + "/" + statutoryID)
			.then((response) => {
				this.setState({
					'openForm': false,
					'statutoryID': "",
					'stateCode': "",
					'states': '',
					'GSTIN': "",
					'GSTDocument': [],
					'PAN': "",
					'PANDocument': [],
				});
				this.props.history.push('/' +this.state.pathname + '/statutory-details/' + entityID);
				this.statutoryDetails();
				this.getData();
				$(".swal-text").css("font-family", "sans-serif");
				swal('Statutory deleted successfully.');
			})
			.catch((error) => {
			})
	}
	updateStatutoryDetails(event) {
		event.preventDefault();

		var entityID = this.props.match.params.entityID;
		var statutoryID = this.props.match.params.statutoryID;
		if ($('#locationsDetail').valid()) {
			var formValues = {
				'entityID': entityID,
				'statutoryID': statutoryID,
				'statutoryDetails': {
					'stateCode': this.state.stateCode,
					'state': this.state.states,
					'GSTDocument': this.state.GSTDocument,
					'PANDocument': this.state.PANDocument,
					'GSTIN': this.state.GSTIN ? this.state.GSTIN.toUpperCase(): this.state.GSTIN,
					'PAN': this.state.PAN ? this.state.PAN.toUpperCase():this.state.PAN,
					
				}
			}
			axios.patch('/api/entitymaster/updateSingleStatutory', formValues)
				.then((response) => {
					this.setState({
						'openForm': false,
						'gotImageGSTIN': false,
						'gotImagePAN': false,
						'statutoryID': "",
						'stateCode': "",
						'states': '',
						'GSTIN': "",
						'GSTDocument': [],
						'PAN': "",
						'PANDocument': [],
					});
					this.props.history.push('/' +this.state.pathname+ '/statutory-details/' + entityID);
					this.statutoryDetails();
					this.getData();
					$('#states').prop('disabled', false);
					$(".swal-text").css("font-family", "sans-serif");
					if(response.data.duplicated === true){
						swal('Statutory details already exist')
					}else{
						swal('Statutory details updated successfully.');
					}
					// swal('Location details updated successfully');					
					$("#locationsDetail").validate().resetForm();
					// this.setState({			
					// 	openFormIcon : this.state.openFormIcon === false ? true : false
					// });
				})
				.catch((error) => {

				})
		}else{
			$(event.target).parent().parent().parent().find('.errorinputText.error:first').focus();
		}
	}
	admin(event) {
		event.preventDefault();
		this.props.history.push('/adminDashboard');
	}
	GSTINBrowse(event) {
		event.preventDefault();
		var GSTDocument = [];
		if (event.currentTarget.files && event.currentTarget.files[0]) {
			for (var i = 0; i < event.currentTarget.files.length; i++) {
				var file = event.currentTarget.files[i];

				if (file) {
					var fileName = file.name;
					var fileSize = file.size;
					var ext = fileName.split('.').pop();
					if (ext === "jpg" || ext === "png" || ext === "jpeg" || ext === "pdf" || ext === "JPG" || ext === "PNG" || ext === "JPEG" || ext === "PDF") {
						if(fileSize > 1048576){
							swal("Allowed file size is 1MB");
							this.setState({
								'gotImageGSTIN' : false
							})
							break;
						}else{
							if (file) {
								var objTitle = { fileInfo: file }
								GSTDocument.push(objTitle);
								if (event.currentTarget.files) {
									this.setState({
										'gotImageGSTIN' : true
									})
									main().then(formValues => {
										var GSTDocument = this.state.GSTDocument;
										for (var k = 0; k < formValues.length; k++) {
											GSTDocument.push(formValues[k].GSTDocument)
										}

										this.setState({
											GSTDocument: GSTDocument
										})
									});

									async function main() {
										var formValues = [];
										for (var j = 0; j < GSTDocument.length; j++) {
											var config = await getConfig();
											var s3url = await s3upload(GSTDocument[j].fileInfo, config, this);
											const formValue = {
												"GSTDocument": s3url,
												"status": "New"
											};
											formValues.push(formValue);
										}
										return Promise.resolve(formValues);
									}


									function s3upload(image, configuration) {

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
	
							} else {
								swal("File not uploaded");
							}//file
						}
					} else {
						swal("Allowed file formats are (jpg, png, jpeg, pdf)");
					}//file types
				}//file
			}//for 

			
		}
	}
	PANBrowse(event) {
		event.preventDefault();
		var PANDocument = [];
		if (event.currentTarget.files && event.currentTarget.files[0]) {
			for (var i = 0; i < event.currentTarget.files.length; i++) {
				var file = event.currentTarget.files[i];

				if (file) {
					var fileName = file.name;
					var fileSize = file.size;
					var ext = fileName.split('.').pop();
					if (ext === "jpg" || ext === "png" || ext === "jpeg" || ext === "pdf" || ext === "JPG" || ext === "PNG" || ext === "JPEG" || ext === "PDF") {
						if(fileSize > 1048576){
							swal("Allowed file size is 1MB");
							this.setState({
								'gotImagePAN' : false
							})
							break;
						}else{
							if (file) {
								var objTitle = { fileInfo: file }
								PANDocument.push(objTitle);
								if (event.currentTarget.files) {
									this.setState({
										'gotImagePAN' : true
									})
									main().then(formValues => {
										var PANDocument = this.state.PANDocument;
										for (var k = 0; k < formValues.length; k++) {
											PANDocument.push(formValues[k].PANDocument)
										}

										this.setState({
											PANDocument: PANDocument
										})
									});

									async function main() {
										var formValues = [];
										for (var j = 0; j < PANDocument.length; j++) {
											var config = await getConfig();
											var s3url = await s3upload(PANDocument[j].fileInfo, config, this);
											const formValue = {
												"PANDocument": s3url,
												"status": "New"
											};
											formValues.push(formValue);
										}
										return Promise.resolve(formValues);
									}


									function s3upload(image, configuration) {

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

							} else {
								swal("File not uploaded");
							}//file
						}
					} else {
						swal("Allowed file formats are (jpg, png, jpeg, pdf)");
					}//file types
				}//file
			}//for 

			
		}
	}
	deleteGSTIN(event) {
		event.preventDefault();
		var GSTDocument = this.state.GSTDocument;
		const index = GSTDocument.indexOf(event.target.id);
		if (index > -1) {
			GSTDocument.splice(index, 1);
		}
		this.setState({
			GSTDocument: GSTDocument,
			gotImageGSTIN: false
		})
	}
	deletePAN(event) {
		event.preventDefault();
		var PANDocument = this.state.PANDocument;
		const index = PANDocument.indexOf(event.target.id);
		if (index > -1) {
			PANDocument.splice(index, 1);
		}
		this.setState({
			PANDocument: PANDocument,
			gotImagePAN: false
		})
	}
	keyPressNumber = (e) => {
		if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 189]) !== -1 ||
			// Allow: Ctrl+A, Command+A
			(e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
			(e.keyCode === 86 && (e.ctrlKey === true || e.metaKey === true)) ||
			(e.keyCode === 67 && (e.ctrlKey === true || e.metaKey === true)) ||
			// Allow: home, end, left, right, down, up
			(e.keyCode >= 35 && e.keyCode <= 40) || e.keyCode === 189 || e.keyCode === 32) {
			// let it happen, don't do anything
			return;
		}
		// Ensure that it is a number and stop the keypress
		if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 58)) && (e.keyCode < 96 || e.keyCode > 105 || e.keyCode === 190 || e.keyCode === 46)) {
			e.preventDefault();
		}
	}

    hideModal(event){
    	event.preventDefault();
    	//$("html,body").scrollTop(0);
    	var token = $(event.target).attr('token');
    	var idVar = '#exampleModal'+token
    	$(idVar).hide()
    	$(".modal-backdrop").remove();
    }
     showView(value,event){
		$('.viewBtn').removeClass('btnactive');
        $(event.target).addClass('btnactive');
    	this.setState({
    		view : value
    	})
    }

	render() {

		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				<div className="row">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOPadding">
						<section className="content OrgSettingFormWrapper">
							
							<div className="pageContent col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
									 {this.state.pathname !="appCompany" ?
					                  <h4 className="weighttitle col-lg-11 col-md-11 col-xs-11 col-sm-11 NOpadding-right">{this.state.pathname ? this.state.pathname : "Entity"} Master</h4>
					                  :
					                  <h4 className="weighttitle col-lg-11 col-md-11 col-xs-11 col-sm-11 NOpadding-right">Organizational Settings</h4>
					  
					                }
									<div title="Go to Admin" className="col-lg-1 col-md-1 col-xs-1 col-sm-1 NOpadding-right">
										{this.props.vendorData ? <div onClick={this.admin.bind(this)} className="redirectToAdmin col-lg-5 col-lg-offset-7 col-md-10 col-xs-10 col-sm-10 fa fa-arrow-right"></div> : null}
									</div>
								</div>

								<div className="nav-center OnboardingTabs col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<ul className="nav nav-pills vendorpills col-lg-12 col-md-12 col-sm-12 col-xs-12">
										<li className="col-lg-3 col-md-3 col-sm-12 col-xs-12 transactionTab pdcls pdclsOne  NOpadding-left btn1 disabled">
											<a href={this.props.match.params.entityID ? "/"+this.props.entity+"/basic-details/"+this.props.match.params.entityID : "/"+this.props.entity+"/basic-details"} className="basic-info-pillss pills backcolor">
												<i className="fa fa-info-circle" aria-hidden="true"></i> &nbsp;
												Basic Info
											</a>
											<div className="triangleone" id="triangle-right"></div>
										</li>
										<li className="active col-lg-3 col-md-3 col-sm-12 col-xs-12 transactionTab pdcls  pdclsOne btn2 ">
											<div className="triangletwo" id="triangle-right1"></div>
											<a href={this.props.match.params.entityID ? "/"+this.props.entity+"/statutory-details/"+this.props.match.params.entityID : "/"+this.props.entity+"/statutory-details" } className="basic-info-pillss backcolor">
												<i className="fa fa-info-circle iconMarginLeft" aria-hidden="true"></i> &nbsp;
												Statutory Info
											</a>
											<div className="trianglethree trianglePositionFix triangleones forActive triangleShapeTwo" id="triangle-right"></div>
										</li>
										<li className="col-lg-3 col-md-3 col-sm-12 col-xs-12 transactionTab noRightPadding pdcls btn4 disabled">
											<div className="trianglesix" id="triangle-right2"></div>
											<a href={this.props.match.params.entityID ? "/"+this.props.entity+"/location-details/"+this.props.match.params.entityID : "/"+this.props.entity+"/location-details"} className="basic-info-pillss backcolor">
												<i className="fa fa-phone phoneIcon" aria-hidden="true"></i> &nbsp;
												Locations
											</a>
											<div className="trianglethree forActive tri" id="triangle-right"></div>
										</li>
										<li className="col-lg-3 col-md-3 col-sm-12 col-xs-12 transactionTab noRightPadding pdcls btn4 disabled">
											<div className="trianglesix" id="triangle-right2"></div>
											<a href={this.props.match.params.entityID ? "/"+this.props.entity+"/contact-details/"+this.props.match.params.entityID : "/"+this.props.entity+"/contact-details"} className="basic-info-pillss backcolor">
												<i className="fa fa-phone phoneIcon" aria-hidden="true"></i> &nbsp;
												Contact
											</a>
										</li>
									</ul>
								</div>
								<section className="Content">
									<div className="row">
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
											<form id="locationsDetail" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
												<div className="col-lg-12 col-md-12 col-sm-12 col-sm-12">
													<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
														<div className="col-lg-6 col-md-6 col-sm-6 col-sm-6 locationTabs">
															<h4><i className="fa fa-info-circle" aria-hidden="true"></i> Statutory Details</h4>
														</div>
														<div className="col-lg-6 col-md-6 col-sm-6 col-sm-6 locationTabs">
															<div className="button4  pull-right" onClick={this.openForm.bind(this)}>
															{
																this.state.openForm === true ?
																<i className="fa fa-minus-circle" aria-hidden="true"></i>
																:
																<i className="fa fa-plus-circle" aria-hidden="true"></i>
															}   &nbsp;Add Statutory																
															
														</div>
														</div>
														<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 formHrTag"></div>
													</div>
													{
														this.state.openForm === true ?
															<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" >
																<div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
																	<div className="col-lg-3 col-md-3 col-sm-12 col-xs-12  " >
																		<label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">State <i className="astrick">*</i> {this.props.typeOption == 'Local' ? <i className="astrick">*</i> : null}
																		</label>
																		<select id="states" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12"
																			ref="states" value={this.state.states} name="states" onChange={this.handleChangeState} >
																			<option selected={true}>-- Select --</option>
																			{
																				this.state.stateArray && this.state.stateArray.length > 0 ?
																					this.state.stateArray.map((stateData, index) => {
																						return (
																							<option key={index} statecode={stateData.stateCode}>{this.camelCase(stateData.stateName)}</option>
																						);
																					}
																					) : ''
																			}
																		</select>
																	</div>
																	<div className="col-lg-3 col-md-3 col-sm-12 col-xs-12  " >
																		<label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">{this.state.taxName}GSTIN<i className="asterisk">*</i>
																			<a data-tip data-for='basicInfo4Tooltip' className="pull-right"> <i title="Eg. 29ABCDE1234F1Z5" className="fa fa-question-circle"></i> </a>
																		</label>
																		<input type="text" id="GSTIN" placeholder="29ABCDE1234F1Z5" className="form-control uppercase col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.GSTIN} ref="GSTIN" name="GSTIN" onChange={this.handleChange} />
																	</div>
																	<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 NOpadding">
																		<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
																			<label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">{this.state.taxName} Document (jpg, jpeg, png, pdf) (Max size 1MB)</label>
																		</div>
																		<div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 NOpadding">
																			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="hide">
																				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 brdlogos locationDocsImg" id="LogoImageUpOne">
																					<div><i className="fa fa-upload"></i> <br /></div>
																					<input multiple onChange={this.GSTINBrowse.bind(this)} id="LogoImageUp" type="file" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" title="" name="GSTDocument" />
																				</div>
																			</div>
																		</div>
																		{
																			this.state.GSTDocument && this.state.GSTDocument.length > 0 ?
																				this.state.GSTDocument.map((doc, i) => {
																					if(('extension',doc.substring(doc.lastIndexOf("."))) === '.pdf'){
																						return (
																							<div key={i} className=" col-lg-2 col-md-2 col-sm-12 col-xs-12">
																								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding marginsBottom" id="hide">
																									<label className="labelform deletelogo col-lg-12 col-md-12 col-sm-12 col-xs-12" title="Delete Document" id={doc} onClick={this.deleteGSTIN.bind(this)}>x</label>
																									<div title={(doc.substring(doc.lastIndexOf("/"))).replace('/', "")} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 brdlogos locationDocsImg" id="LogoImageUpOne">
																										<img src={'/images/pdf.png'} className="img-responsive logoStyle" />
																									</div>
																								</div>
																							</div>
																						);
																					}else{
																						return (
																							<div key={i} className=" col-lg-2 col-md-2 col-sm-12 col-xs-12">
																								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding marginsBottom" id="hide">
																									<label className="labelform deletelogo col-lg-12 col-md-12 col-sm-12 col-xs-12" title="Delete Document" id={doc} onClick={this.deleteGSTIN.bind(this)}>x</label>
																									<div title={(doc.substring(doc.lastIndexOf("/"))).replace('/', "")} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 brdlogos locationDocsImg" id="LogoImageUpOne">
																										<img src={doc} className="img-responsive logoStyle" />
																									</div>
																								</div>
																							</div>
																						);
																					}
																				})
																				:
																				( this.state.gotImageGSTIN ?
											                                          <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 nopadding CustomImageUploadLDProfile">
											                                            <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 NOpadding marginsBottom" id="hide">
											                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 brdlogos locationDocsImg" id="LogoImageUpOne">
											                                                      <img src="/images/loading.gif" className="img-responsive logoStyle"/>
											                                                </div>
											                                            </div>
											                                          </div>
											                                :
											                                null)
																		}
																	</div>
																	</div>
																	<div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
																		<div className="form-margin col-lg-4 col-md-4 col-sm-12 col-xs-12  " >
																			<label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">PAN<i className="astrick">*</i>
																				<a data-tip data-for='basicInfo4Tooltip' className="pull-right"> <i title="Eg. ABCDE1234E" className="fa fa-question-circle"></i> </a>
																			</label>
																			<input type="text" id="PAN" placeholder="ABCDE1234E" className="form-control uppercase col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.PAN} ref="PAN" name="PAN" onChange={this.handleChange} />
																		</div>


																		<div className="form-margin col-lg-6 col-md-6 col-sm-12 col-xs-12 NOpadding">
																			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
																				<label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">PAN Document (jpg, jpeg, png, pdf) (Max size 1MB)</label>
																			</div>
																			<div className="col-lg-2 col-md-2 col-sm-12 col-xs-12">
																				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding" id="hide">
																					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 brdlogos locationDocsImg" id="LogoImageUpOne">
																						<div><i className="fa fa-upload"></i> <br /></div>
																						<input multiple onChange={this.PANBrowse.bind(this)} id="LogoImageUp" type="file" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" title="" name="PANDocument" />
																					</div>
																				</div>
																			</div>
																			{
																				this.state.PANDocument && this.state.PANDocument.length > 0 ?
																					this.state.PANDocument.map((doc, i) => {
																						if(('extension',doc.substring(doc.lastIndexOf("."))) === '.pdf'){
																							return (
																								<div key={i} className=" col-lg-2 col-md-2 col-sm-12 col-xs-12">
																									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding marginsBottom" id="hide">
																										<label className="labelform deletelogo col-lg-12 col-md-12 col-sm-12 col-xs-12" title="Delete Document" id={doc} onClick={this.deletePAN.bind(this)}>x</label>
																										<div title={(doc.substring(doc.lastIndexOf("/"))).replace('/', "")} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 brdlogos locationDocsImg" id="LogoImageUpOne">
																											<img src={'/images/pdf.png'} className="img-responsive logoStyle" />
																										</div>
																									</div>
																								</div>
																							);
																						}else{
																							return (
																								<div key={i} className=" col-lg-2 col-md-2 col-sm-12 col-xs-12">
																									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding marginsBottom" id="hide">
																										<label className="labelform deletelogo col-lg-12 col-md-12 col-sm-12 col-xs-12" title="Delete Document" id={doc} onClick={this.deletePAN.bind(this)}>x</label>
																										<div title={(doc.substring(doc.lastIndexOf("/"))).replace('/', "")} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 brdlogos locationDocsImg" id="LogoImageUpOne">
																											<img src={doc} className="img-responsive logoStyle" />
																										</div>
																									</div>
																								</div>
																							);
																						}
																					})
																					:
																					( this.state.gotImagePAN ?
												                                          <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 nopadding CustomImageUploadLDProfile">
												                                            <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 NOpadding marginsBottom" id="hide">
												                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 brdlogos locationDocsImg" id="LogoImageUpOne">
												                                                      <img src="/images/loading.gif" className="img-responsive logoStyle"/>
												                                                </div>
												                                            </div>
												                                          </div>
												                                :
												                                null)
																			}
																		</div>
																</div>
																<div className="col-lg-7 col-md-7 col-sm-7 col-xs-7  NOpadding pull-right">
																	{this.props.match.params.entityID ?
																		
																			this.state.statutoryID ?
																				<button className="button3  pull-right" onClick={this.updateStatutoryDetails.bind(this)}>&nbsp;Update</button>
																				:
																				<button className="button3 pull-right" onClick={this.statutoryDetailAdd.bind(this)}>&nbsp;Submit</button>
																		
																		:
																		null
																	}
																</div>

															</div>
															:
															null
													}
													<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  ">
														<button className="button2" onClick={this.locationdetailBack.bind(this)}><i className="fa fa-angle-double-left" aria-hidden="true"></i>&nbsp;Basic Info</button>
														<button className="button1 pull-right" onClick={this.locationdetailBtn.bind(this)}>Next&nbsp;<i className="fa fa-angle-double-right" aria-hidden="true"></i></button>
													</div>
												</div>
											</form>
										</div>
										
										<div  className="col-lg-12 col-md-12 col-sm-12 col-xs-12 padding30">
											<IAssureTable 
						                      tableHeading={this.state.tableHeading}
						                      dataCount={this.state.entityCount}
						                      tableData={this.state.RecordsTable}
						                      tableObjects={this.state.tableObjects}
						                      getData={this.getData.bind(this)}
						                      id={1}
						                      tableName="Statutory"
						                    />
					                    </div>
										
									</div>
								</section>

							</div>
						</section>
					</div>
				</div>

				{/*Confirm Delete modal*/}
				<div className="modal" id="deleteEntityModal" role="dialog">
		          <div className="adminModal adminModal-dialog col-lg-12 col-md-12 col-sm-12 col-xs-12">
		            <div className="modal-content adminModal-content col-lg-4 col-lg-offset-4 col-md-6 col-md-offset-3 col-sm-10 col-sm-offset-1 col-xs-12 noPadding">
		              <div className="modal-header adminModal-header col-lg-12 col-md-12 col-sm-12 col-xs-12">
		                <div className="adminCloseCircleDiv pull-right  col-lg-1 col-lg-offset-11 col-md-1 col-md-offset-11 col-sm-1 col-sm-offset-11 col-xs-12 NOpadding-left NOpadding-right">
		                	<button type="button" className="adminCloseButton" data-dismiss="modal" onClick={this.closeModal.bind(this)}>&times;</button>
		                </div>
		              </div>
		            <div className="modal-body adminModal-body col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      	<h4 className="blackLightFont textAlignCenter examDeleteFont col-lg-12 col-md-12 col-sm-12 col-xs-12">Are you sure, do you want to delete?</h4>
                    </div>
		            <div className="modal-footer adminModal-footer col-lg-12 col-md-12 col-sm-12 col-xs-12">
		                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        	<button type="button" className="btn adminCancel-btn col-lg-7 col-lg-offset-1 col-md-4 col-md-offset-1 col-sm-8 col-sm-offset-1 col-xs-10 col-xs-offset-1" data-dismiss="modal" onClick={this.closeModal.bind(this)}>CANCEL</button>
                        </div>
		                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
		                  <button type="button" className="btn examDelete-btn col-lg-7 col-lg-offset-5 col-md-7 col-md-offset-5 col-sm-8 col-sm-offset-3 col-xs-10 col-xs-offset-1" data-dismiss="modal" onClick={this.confirmDelete.bind(this)} >DELETE</button>
		                </div>
		            </div>
		            </div>
		          </div>
		        </div>
			</div>
		);
	}
}
export default withRouter(StatutoryDetails);
