import React, { Component } from 'react';
import $ 					from 'jquery';
import axios 				from 'axios';
import _ 					from 'underscore';
import Details 				from './Details.js';
import swal                 from 'sweetalert';
import moment 				from 'moment';

import { CheckBoxSelection, Inject, MultiSelectComponent } 	from '@syncfusion/ej2-react-dropdowns';
import 'bootstrap/js/tab.js';
import './List.css'
import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-inputs/styles/material.css";
import "@syncfusion/ej2-react-dropdowns/styles/material.css";


class List extends Component {
	constructor(props) {
		super(props);

		this.state = {
			firstname			: '',
			supplierListOne		: '',
			supplierarrayS		: '',
			id 					: '',
			country 			: '-',
			states 				: '-',
			city 				: '-',
			category 			: '-',
			initial 			: 'All',
			lenghtCount 		: '',
			searchByName 		: '',
			contractList 		: [],
			masterVendor 		: [],
			selector 			: {},
			stateCode 			: "Select State",
			district  			: "Select District",
			pathname 			: window.location.pathname.split('/')[1],
		};
		
		this.handleChange = this.handleChange.bind(this);
		this.ShowForm = this.ShowForm.bind(this);
		this.camelCase = this.camelCase.bind(this);
	}

	handleChange(event) {
		const target = event.target;
		const name = target.name;

		this.setState({
			[name]: event.target.value
		});
	}

	componentDidMount() {
		this.getContracts();
		this.getStates('IN');
		this.getCorporate();
		this.getVendor();
	}

	getStates(StateCode) {
		axios.get("http://locations2.iassureit.com/api/states/get/list/" + StateCode)
			.then((response) => {
				
				var statesList = [];
	            response.data.map((data, ind) => {
	                statesList.push({ stateCode: data.stateCode, stateName: data.stateName })
	            });

	            this.setState({ statesList: statesList })
			})
			.catch((error) => {
			})
	}
	
	getDistrict(countryCode, stateCode ) {
		var formValues = { countryCode : countryCode, stateCodes : stateCode };

		axios.post("http://locations2.iassureit.com/api/districts/get/list", formValues)
			.then((response) => {
				var distictsList = [];
	            response.data.map((data, ind) => {
	                distictsList.push({ id: data._id, districtName: data.districtName })
	            });

	            this.setState({ distictsList: distictsList })
			})
			.catch((error) => {
			})
	}
	
	camelCase(str) {
		return str
			.toLowerCase()
			.split(' ')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	}

	getContracts() {
		axios.get("/api/contract/get/count")
			.then((response) => {
				this.setState({ 
					contractCount   : response.data
				})
			})
			.catch((error) => {
			})

		axios.get("/api/contract/get/list")
			.then((response) => {
				this.setState({
					contractList   : response.data
				}, ()=>{
					console.log("Contract List = ", this.state.contractList);
				})
				
				this.setState({ id: response.data[0]._id, showDetails : true });
			})
			.catch((error) => {
			})
	}

	getCorporate(){
		axios.get("/api/entitymaster/get/corporate")
			.then((response) => {
	            var corporateList = [];
	            response.data.map((data, ind) => {
	                corporateList.push({ id: data._id, companyName: data.companyName })
	            });

	            this.setState({ corporateList: corporateList })
			})
			.catch((error) => {
			})	
	}
	
	getVendor(){
		axios.get("/api/entitymaster/get/vendor")
			.then((response) => {
	            var vendorList = [];
	            response.data.map((data, ind) => {
	                vendorList.push({ id: data._id, companyName: data.companyName })
	            });

	            this.setState({ vendorList: vendorList })
			})
			.catch((error) => {
			})	
	}

	ShowForm(event) {
		var data = $(event.currentTarget).attr('id');
		this.setState({ 
			id: data, showDetails : true 
		}, ()=>{
			console.log("id and showDetails = ", this.state.id + ", "+ this.state.showDetails)
		});

		$('.selected').removeClass('selectedSupplier');
		$(event.currentTarget).addClass('selectedSupplier');

	}

	hideForm(){
		this.setState({ showDetails : false });
	}

	searchEntity(event) {
		this.dropDownListObject.value = null;
		this.dropDownListObject1.value = null;
		this.dropDownListObject2.value = null;
		this.dropDownListObject3.value = null;

		axios.get("/api/contract/search/"+event.target.value)
			.then((response) => {
				this.setState({
					contractList   	: response.data,
					showDetails 	: false
				})
			})
			.catch((error) => {
				console.log("Error searchEntity() = ",error);
			})
		
	}

	resetFilter(event) {
		event.preventDefault();
		this.dropDownListObject.value = null;
		this.dropDownListObject1.value = null;
		this.dropDownListObject2.value = null;
		this.dropDownListObject3.value = null;

		$('.searchEntity').val('');
		this.getContracts();
	}

	handleChangeFilter(event){
		if (event.value) {
	        var currentSelection = event.element.getAttribute("id");
	        var selector = this.state.selector;
	        // if (event.itemData.category) {
	        // 	var categoryIds = []
	        //     selector.categoryIds = event.value;
	        // }

	        if (currentSelection === 'corporateChange') {
				selector.vendorIds = [];
				selector.corporateIds = event.value;
				this.dropDownListObject1.value = null;
				this.dropDownListObject2.value = null;
				this.dropDownListObject3.value = null;
	        }else if (currentSelection === 'vendorChange') {
				selector.corporateIds = [];
				selector.vendorIds = event.value;
				this.dropDownListObject.value = null;
				this.dropDownListObject2.value = null;
				this.dropDownListObject3.value = null;
	        }	        
	        if (currentSelection === 'statesChange') {
	        	this.getDistrict( 'IN', event.value );
	        	delete selector.districts;
				selector.stateCodes = event.value;
				this.dropDownListObject.value = null;
				this.dropDownListObject1.value = null;
				this.dropDownListObject3.value = null;
	        }
	        if (currentSelection === 'districtsChange') {
				selector.districts = event.value;
				this.dropDownListObject.value = null;
				this.dropDownListObject1.value = null;
				
			}
	        // selector.startRange = this.state.startRange
	        // selector.limitRange = this.state.limitRange

	        this.setState({ selector: selector, showDetails : false },()=>{
	        	this.getFilteredProducts(this.state.selector)
	        })
		}
    }
	
	getFilteredProducts(selector){
		axios.post("/api/contract/filterContract", selector)
			.then((response) => {
				console.log("response getFilteredProducts = ",response.data);
				this.setState({
					contractList   : response.data,
					showDetails : false
				})
			})
			.catch((error) => {
			})
	}

    editBasicform(event) {
        this.props.history.push("/contract-management/" + event.currentTarget.getAttribute('data-id'))
    }

    viewBasicform(event) {
        this.props.history.push("/contract-view/" + event.currentTarget.getAttribute('data-id'))
    }

    deleteEntity(event) {
        event.preventDefault();
        this.setState({ deleteID: event.currentTarget.getAttribute('data-id') })
        $('#deleteEntityModal').show();
    }

    confirmDelete(event) {
        event.preventDefault();
        axios.delete("/api/contract/delete/" + this.state.deleteID)
            .then((response) => {
                if (response.data.deleted) {
                	$('#deleteEntityModal').hide();
                    swal({
                        text: "Contract is deleted successfully.",
                    });
                } else {
                    swal({
                        text: "Failed to delete.",
                    });
                }
                this.getContracts();
                $('#deleteEntityModal').hide();
            })
            .catch((error) => {
            })
    }

    closeModal(event) {
        event.preventDefault();
        $('#deleteEntityModal').hide();
    }	
    
	render() {
		const corporatefields: object = { text: 'companyName', value: 'id' };
		const vendorfields: object = { text: 'companyName', value: 'id' };
		const statesfields: object = { text: 'stateName', value: 'stateCode' };
		const districtsfields: object = { text: 'districtName', value: 'districtName' };
		
		return (
			<div className="">
				<div className="row">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<section className="content">
							<div className="pageContent col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
									<h4 className="weighttitle col-lg-11 col-md-11 col-xs-11 col-sm-11 NOpadding-right">Contract List</h4>
								</div>
								<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 nopadding">
									<h5 className="box-title2 col-lg-2 col-md-11 col-sm-11 col-xs-12">Total Records :&nbsp;&nbsp;<b>{this.state.contractCount}</b></h5>
									<h5 className="box-title2 col-lg-2 col-md-11 col-sm-11 col-xs-12">Filtered :&nbsp;&nbsp;<b>{this.state.contractList.length}</b></h5>
								</div>

								<div className="contenta col-lg-12 col-md-12 col-sm-12 col-xs-12 pdcls nopadding">
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
										<div className="col-lg-2 col-md-12 col-sm-12 col-xs-12 nopadding">
											<button type="button" className="reset" onClick={this.resetFilter.bind(this)}>RESET FILTER</button>
										</div>
										
										<div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 pull-right" >
											<span className="blocking-span" >
												<input type="text" name="search" className="col-lg-8 col-md-8 col-sm-8 col-xs-12 Searchusers searchEntity inputTextSearch outlinebox pull-right texttrans"
													placeholder="Search..." onInput={this.searchEntity.bind(this)} />
											</span>
										</div>
									</div>

									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
									<br/>
										<div className="col-lg-3 col-md-12 col-xs-12 col-sm-12">
											<label className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-left">Corporate</label>
											<MultiSelectComponent id="corporateChange" ref={(scope) => { this.dropDownListObject = scope; }} 
												dataSource={this.state.corporateList}
                                                change={this.handleChangeFilter.bind(this)} mode='mode' 
                                                fields={corporatefields} placeholder="Select Corporate" mode="CheckBox" 
                                                selectAllText="Select All" unSelectAllText="Unselect All" 
                                                showSelectAll={true}>
                                                <Inject services={[CheckBoxSelection]} />
                                            </MultiSelectComponent>
										</div>
										<div className="col-lg-3 col-md-12 col-xs-12 col-sm-12">
											<label className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-left">Vendor</label>
											<MultiSelectComponent id="vendorChange" ref={(scope) => { this.dropDownListObject1 = scope; }} 
												dataSource={this.state.vendorList}
                                                change={this.handleChangeFilter.bind(this)} mode='mode' 
                                                fields={vendorfields} placeholder="Select Vendor" mode="CheckBox" 
                                                selectAllText="Select All" unSelectAllText="Unselect All" 
                                                showSelectAll={true}>
                                                <Inject services={[CheckBoxSelection]} />
                                            </MultiSelectComponent>
										</div>
										<div className="col-lg-3 col-md-12 col-xs-12 col-sm-12">
											<label className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-left">States</label>
											<MultiSelectComponent id="statesChange" ref={(scope) => { this.dropDownListObject2 = scope; }} 
												dataSource={this.state.statesList}
                                                change={this.handleChangeFilter.bind(this)} mode='mode' 
                                                fields={statesfields} placeholder="Select States" mode="CheckBox" 
                                                selectAllText="Select All" unSelectAllText="Unselect All" 
                                                showSelectAll={true}>
                                                <Inject services={[CheckBoxSelection]} />
                                            </MultiSelectComponent>
											
										</div>
										<div className="col-lg-3 col-md-12 col-xs-12 col-sm-12">
											<label className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-left">Districts</label>
											<MultiSelectComponent id="districtsChange" ref={(scope) => { this.dropDownListObject3 = scope; }} 
												dataSource={this.state.distictsList}
                                                change={this.handleChangeFilter.bind(this)} mode='mode' 
                                                fields={districtsfields} placeholder="Select Districts" mode="CheckBox" 
                                                selectAllText="Select All" unSelectAllText="Unselect All" 
                                                showSelectAll={true}>
                                                <Inject services={[CheckBoxSelection]} />
                                            </MultiSelectComponent>
											
										</div>
									</div>

								</div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"><br/></div>
								{
									this.state.contractList && this.state.contractList.length > 0 ?
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="style-2">
										<div className="">
											{
												this.state.contractList.map((data, index) => {
													return (
														<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 cardDiv" key={index} name={index} data-child={data._id + '-' + index} id={data._id}>
															<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
																<div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 cardColumn">
																	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding cardHeading">
																		Contract No
																	</div>                                                           
																	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding cardData">{index + 1}</div>																	                                                        
																</div>
																<div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 cardColumn"> 
																	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding cardHeading">
																		Entity Type
																	</div>                                                           
																	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding cardData">{data.entityType}</div>                                                          
																</div>
																<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 cardColumn">   
																	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding cardHeading">
																		Signing Entity
																	</div>                                                           
																	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding cardData">
																		{data.entity.companyName}<br/><span className="address">
																		<span style={{"fontWeight" : "bold"}}>{"(" + (((data.entity.locations[0].locationType).match(/\b(\w)/g)).join('')) +" - "}</span>
                                                                        {data.entity.locations[0].area ? data.entity.locations[0].area + ", " : ""} 
                                                                        {data.entity.locations[0].city ? data.entity.locations[0].city + ", " : ""}
                                                                        {data.entity.locations[0].state ? data.entity.locations[0].state + ", " : ""} 
                                                                        {data.entity.locations[0].country ? data.entity.locations[0].country : ""}.)</span>
																	</div>                                                        
																</div>
																<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 cardColumn">
																	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding cardHeading">
																		Contract Start Date
																	</div>                                                           
																	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding cardData">{moment(data.contractDate).format("Do MMMM YYYY")}</div>                                                           
																</div>
																<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 cardColumn"> 
																	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding cardHeading">
																		Contract End Date
																	</div>                                                           
																	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding cardData">{moment(data.effectiveUpto).format("Do MMMM YYYY")}</div>                                                          
																</div>
																<div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 cardColumn"> 
																	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding cardHeading">
																		Duration
																	</div>                                                           
																	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding cardData">{data.contractDuration + " Months"}</div>                                                          
																</div>
																<div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 cardColumn">  
																	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding cardHeading">
																		Status
																	</div>                                                           
																	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding cardData">{data.status}</div>                                                         
																</div>
																<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 nopadding">  
																	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding cardHeading">
																		Action
																	</div>                                                           
																	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding cardActions">
																		<a><i className="fa fa-pencil edit" aria-hidden="true" title="click to edit" id={data._id} data-id={data._id} onClick={this.editBasicform.bind(this)}></i></a> 
																		<a><i className="fa fa-eye view" aria-hidden="true" title="click to view" data-id={data._id} onClick={this.viewBasicform.bind(this)}></i></a> 
																		<a><i  className="fa fa-trash-o delete" aria-hidden="true" title="click to delete" data-id={data._id} onClick={this.deleteEntity.bind(this)}></i></a>
																	</div>                                                         
																</div>
	                                                            
															</div>
														</div>
													);
												})
											}
										</div>
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
									:
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-align-center">
										<h5>No Data Found</h5>
									</div>
								}
							</div>
						</section>
					</div>
				</div> 
			</div>
		);
	}
}
export default List;