import React, { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';
import _ from 'underscore';
import Details from './Details.js';
import 'bootstrap/js/tab.js';
import swal                   from 'sweetalert';
import './List.css'
import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-inputs/styles/material.css";
import "@syncfusion/ej2-react-dropdowns/styles/material.css";
import { CheckBoxSelection, Inject, MultiSelectComponent } 	from '@syncfusion/ej2-react-dropdowns';


class List extends Component {
	constructor(props) {
		super(props);

		this.state = {
			firstname: '',
			supplierListOne: '',
			supplierarrayS: '',
			id: '',
			country: '-',
			states: '-',
			city: '-',
			category: '-',
			initial: 'All',
			lenghtCount: '',
			searchByName: '',
			contractList: [],
			masterVendor: [],
			selector:{},
			stateCode : "Select State",
			district  : "Select District",
			"pathname": window.location.pathname.split('/')[1],
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
				})

				$('.selected').removeClass('selectedSupplier');
				document.getElementById(response.data[0]._id).classList.add("selectedSupplier")
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
		this.setState({ id: data, showDetails : true });

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

	        if (currentSelection == 'corporateChange') {
				selector.vendorIds = [];
				selector.corporateIds = event.value;
				this.dropDownListObject1.value = null;
				this.dropDownListObject2.value = null;
				this.dropDownListObject3.value = null;
	        }else if (currentSelection == 'vendorChange') {
				selector.corporateIds = [];
				selector.vendorIds = event.value;
				this.dropDownListObject.value = null;
				this.dropDownListObject2.value = null;
				this.dropDownListObject3.value = null;
	        }	        
	        if (currentSelection == 'statesChange') {
	        	this.getDistrict( 'IN', event.value );
	        	delete selector.districts;
				selector.stateCodes = event.value;
				this.dropDownListObject.value = null;
				this.dropDownListObject1.value = null;
				this.dropDownListObject3.value = null;
	        }
	        if (currentSelection == 'districtsChange') {
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
				this.setState({
					contractList   : response.data,
					showDetails : false
				})
			})
			.catch((error) => {
			})
	}
	
    
	render() {
		const corporatefields: object = { text: 'companyName', value: 'id' };
		const vendorfields: object = { text: 'companyName', value: 'id' };
		const statesfields: object = { text: 'stateName', value: 'stateCode' };
		const districtsfields: object = { text: 'districtName', value: 'districtName' };
		
		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
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

									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
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
									<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 scrollbar" id="style-2">
										<div className="borderlist12">
											{
												this.state.contractList.map((data, index) => {
													return (
														<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 borderlist selected" key={index} onClick={this.ShowForm.bind(this)} name={index} data-child={data._id + '-' + index} id={data._id}>
															<div className="col-lg-10 col-md-10 col-sm-12 col-xs-12 nopadding">
																{
																	data.company ? 
																	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
																		<h5 className="detailtitle1">{data.company.companyName}</h5>
																		<ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
																			<li><i className="fa fa-globe"></i> {data.company.companywebsite}</li>
																			<li><i className="fa fa-envelope "></i> {data.company.companyEmail}</li>
																		</ul>
																	</div>
																	:
																	null
																}
																{
																	data.entity ? 
																	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
																		<h5 className="detailtitle1">{data.entity.companyName}</h5>
																		<ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
																		<li className="capitalize"><i className="fa fa-transgender"></i> Contract with :  {data.entity.entityType}</li>
																			<li><i className="fa fa-globe"></i> {data.entity.website}</li>
																			<li><i className="fa fa-envelope "></i> {data.entity.companyEmail}</li>
																		</ul>
																	</div>
																	:
																	null
																}
	                                                            
															</div>
															<div className="col-lg-2 noRightPadding">
																<div className="arrowDiv col-lg-10 col-lg-offset-2 ">
																	<img src="/images/leftArrow.png"/>
																</div>
															</div>
														</div>
													);
												})
											}
										</div>
									</div>
									:
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-align-center">
										<h5>No Data Found</h5>
									</div>
								}
								{ 
									this.state.showDetails ?
									<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 pdcls suppliersOneProfile commonSup" id={this.state.id}>
										<div id={this.state.id} className="col-lg-12 col-md-12 col-sm-12 col-xs-12" >
											<Details name={this.state.index} id={this.state.id} 
											getContracts={this.getContracts.bind(this)}
											hideForm={this.hideForm.bind(this)}/>
										</div>
									</div>
									:
									null
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