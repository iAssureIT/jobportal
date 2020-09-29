import React, { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';
import _ from 'underscore';
import Details from './VendorAllocationDetails.js';
import 'bootstrap/js/tab.js';
import swal                   from 'sweetalert';
import './vendorAllocation.css'
import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-inputs/styles/material.css";
import "@syncfusion/ej2-react-dropdowns/styles/material.css";
import { CheckBoxSelection, Inject, MultiSelectComponent } 	from '@syncfusion/ej2-react-dropdowns';


class VendorAllocationList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: '',
			city: '',
			lenghtCount: '',
			filterCount:0,
			searchByName: '',
			contractList: [],
			masterVendor: [],
			selector:{},
			"pathname": window.location.pathname.split('/')[1],
		};
		
		this.handleChange = this.handleChange.bind(this);
		this.ShowForm = this.ShowForm.bind(this);
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
		this.getVendor();
	}

	getContracts() {
		axios.get("/api/VendorAllocation/get/count")
			.then((response) => {
				this.setState({
					contractCount   : response.data.count
				})
			})
			.catch((error) => {
			})

		axios.get("/api/VendorAllocation/get/list")
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
		this.dropDownListObject1.value = null;

		axios.get("/api/VendorAllocation/search/"+event.target.value)
			.then((response) => {
				this.setState({
					contractList   : response.data,
					filterCount   : response.data.length,
					showDetails : false
				})
				if(response && response.data.length > 0){
					$('.selected').removeClass('selectedSupplier');
					document.getElementById(response.data[0]._id).classList.add("selectedSupplier")
					this.setState({ id: response.data[0]._id, showDetails : true });
				}
			})
			.catch((error) => {
			})
		
	}
	resetFilter(event) {
		event.preventDefault();
		this.dropDownListObject1.value = null;
		this.setState({
			filterCount:0
		})

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

	        if (currentSelection === 'vendorChange') {
				selector.corporateIds = [];
				selector.vendorIds = event.value;
	        }	        
	        
	        if (currentSelection === 'cityChange') {
				selector.districts = event.value;
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
		axios.post("/api/VendorAllocation/filterVendorAllocation", selector)
			.then((response) => {
				this.setState({
					contractList   : response.data,
					filterCount   : response.data.length,
					showDetails : false 
				});
				if(response && response.data.length > 0){
					$('.selected').removeClass('selectedSupplier');
					document.getElementById(response.data[0]._id).classList.add("selectedSupplier")
					this.setState({ id: response.data[0]._id, showDetails : true });
				}
			})
			.catch((error) => {
			})
	}

	redirectTo(event)
    {
    	this.props.history.push("/vendor_allocation")
    }
	
    
	render() {
		const vendorfields: object = { text: 'companyName', value: 'id' };

		return (
			<div className="">
				<div className="row">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<section className="content">
							<div className="pageContent col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
									<h4 className="weighttitle col-lg-5 col-md-11 col-xs-11 col-sm-11 NOpadding-right">Vendor Mapping List</h4>
									<div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 pull-right">
										<span className="col-lg-6 col-lg-offset-5 sentanceCase addButtonList" onClick={this.redirectTo.bind(this)}><i  className="fa fa-plus-circle"></i>&nbsp;&nbsp;Map City and Vendor 
										</span>
									</div>
								</div>
								<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 nopadding">
									<h5 className="box-title2 col-lg-2 col-md-11 col-sm-11 col-xs-12">Total Records :&nbsp;&nbsp;<b>{this.state.contractCount}</b></h5>
									<h5 className="box-title2 col-lg-2 col-md-11 col-sm-11 col-xs-12">Filtered :&nbsp;&nbsp;<b>{this.state.filterCount}</b></h5>
								</div>

								<div className="contenta col-lg-12 col-md-12 col-sm-12 col-xs-12 pdcls nopadding">
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
										<div className="col-lg-2 col-md-12 col-sm-12 col-xs-12 nopadding">
											<button type="button" className="reset" onClick={this.resetFilter.bind(this)}>RESET FILTER</button>
										</div>
										
										<div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 pull-right" >
											<span className="blocking-span" >
												<input type="text" name="search" className="col-lg-8 col-md-8 col-sm-8 col-xs-12 Searchusers searchEntity inputTextSearch outlinebox pull-right texttrans"
													placeholder="Search by city/vendor..." onInput={this.searchEntity.bind(this)} />
											</span>
										</div>
									</div>

									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<br/>
										
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
										
									</div>

								</div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"><br/></div>
								{this.state.contractList && this.state.contractList.length > 0 ?
									<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 scrollbar" id="style-2">
										<div className="borderlist12">
											{
												this.state.contractList.map((data, index) => {
													if(data.city){
													return (
														<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 borderlist selected" key={index} onClick={this.ShowForm.bind(this)} name={index} data-child={data._id + '-' + index} id={data._id}>
															<div className="col-lg-10 col-md-10 col-sm-12 col-xs-12">
																<div className="col-lg-10 col-md-10 col-sm-12 col-xs-12">
	                                                                <h5 className="detailtitle">{data.city}</h5>
	                                                                <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
	                                                                    <li><i className="fa fa-user-o "></i>Total Vendor(s): {data.vendor.length}</li>
	                                                                </ul>
	                                                            </div>
	                                                            
															</div>
															<div className="col-lg-2 noRightPadding">
																<div className="arrowsDiv col-lg-10 col-lg-offset-2 ">
																	<img src="/images/leftArrow.png"/>
																</div>
															</div>
														</div>
													);
													}
												})
											}
										</div>
									</div>
									:
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-align-center">
										<h5>No Data Found</h5>
									</div>
								}
								{ this.state.showDetails ?
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
export default VendorAllocationList;