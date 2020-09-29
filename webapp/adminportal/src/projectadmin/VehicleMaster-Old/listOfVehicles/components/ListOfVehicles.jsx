import * as React                                           from 'react';
import * as ReactDOM                                        from 'react-dom';
import $ 													from 'jquery';
import axios 												from 'axios';
import _ 													from 'underscore';
import moment                                               from 'moment';
import VehicleDetails 										from './VehicleDetails.jsx';
import swal                   								from 'sweetalert';
import { CheckBoxSelection, Inject, MultiSelectComponent } 	from '@syncfusion/ej2-react-dropdowns';

import 'bootstrap/js/tab.js';
import '../css/ListOfVehicles.css';
import '../css/ListOfEntityFilter.css';
import '../css/ListOfAllEntity.css';
import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-inputs/styles/material.css";
import "@syncfusion/ej2-react-dropdowns/styles/material.css";


export default class ListOfVehicles extends React.Component <{}, {}>{
	
	constructor(props) {
		super(props);

		this.state = {
			initial: 'All',
			lenghtCount: '',
			vehicleList: [],
			masterVendor: [],
			selector:{},
			"Dummyimg1":"/images/Dummyimg1.jpg",
			"pathname": window.location.pathname.split('/')[1],
			selectAll : true
		};
		
		this.handleChange = this.handleChange.bind(this);
		this.ShowForm     = this.ShowForm.bind(this);
		this.camelCase    = this.camelCase.bind(this);
		

	}

	handleChange(event) {
		const target = event.target;
		const name = target.name;

		this.setState({
			[name]: event.target.value
		});
	}

	componentDidMount() {
		var Dummyimg=this.state.Dummyimg1;
		// console.log("Dummyimg",Dummyimg);
		this.getVehicles();
		this.getCategories();
		this.getBrands();
		this.getEntity();
		this.getModels();
		this.getFuelTypes();

	}
	
	camelCase(str) {
		return str
			.toLowerCase()
			.split(' ')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	}
	getVehicles() {
		axios.get("/api/vehiclemaster/get/count")
			.then((response) => {
				this.setState({
					// vehicleCount   : response.data.count
				})
			})
			.catch((error) => {
			})
		axios.get("/api/vehiclemaster/get/list")
			.then((response) => {
		        var tableData=response.data.filter((data,i)=>{
	                return data.status!=='deleted-Active' && data.status!=='deleted-Inactive'
				});
				// console.log('tableData',tableData);
				this.setState({
					vehicleList    : tableData,
					vehicleCount   : tableData.length
				})
				$('.selected').removeClass('selectedSupplier');
				document.getElementById(response.data[0]._id).classList.add("selectedSupplier")
				this.setState({ id: response.data[0]._id, showDetails : true });
			})
			.catch((error) => {
			})
	}
	getCategories() {
    axios.get('/api/categorymaster/get/list')
        .then((response) => {

            var categoriesArray = [];
            response.data.map((data, ind) => {
                categoriesArray.push({ id: data._id, category: data.category })
            });

            this.setState({ categoriesArray: categoriesArray })

        })
        .catch((error) => {
            console.log('error', error);
        })
    }
	getBrands() {
        axios.get('/api/brandmaster/get/list')
            .then((response) => {

                var brandsArray = [];
                response.data.map((data, ind) => {
                    brandsArray.push({ id: data._id, brand: data.brand })
                });
                this.setState({ brandsArray: brandsArray })

            })
            .catch((error) => {
                console.log('error', error);
            })
    }
    
    getModels(brandId){
       axios.get('/api/modelmaster/get/list')
        .then((response) => {
            var modelsArray = [];
            var filtered = response.data.filter(model=>
            	model.brandId == brandId
            )
            filtered.map((data, ind) => {
                modelsArray.push({ id: data._id, model: data.model })
            });
            this.setState({
                modelsArray: modelsArray
            },()=>{
            })
        })
        .catch((error) => {
            
        })
    }
    getFuelTypes() {
    axios.get('/api/fueltypemaster/get/list')
        .then((response) => {

            var fuelTypesArray = [];
            response.data.map((data, ind) => {
                fuelTypesArray.push({ id: data._id, fuelType: data.fuelType })
            });
            this.setState({ fuelTypesArray: fuelTypesArray })
        })
        .catch((error) => {
            console.log('error', error);
        })
    }
	ShowForm(event) {
		event.preventDefault();
		var data = $(event.currentTarget).attr('id');
		this.setState({ id: data , showDetails : true });

		$('.selected').removeClass('selectedSupplier');
		$(event.currentTarget).addClass('selectedSupplier');
	}

	hideForm(){
		this.setState({ showDetails : true });
	}
	
	searchVehicle(event) {
		

		this.dropDownListObject.value = null;
		this.dropDownBrandListObject.value = null;
		this.dropDownModelListObject.value = null;
		this.dropDownFuelTypeListObject.value = null;
		this.dropDownWorkLocationListObject.value = null;
		
		this.setState({
			'selector' : {},
			'initial': 'All',
			 showDetails : true 
		})

		axios.get("/api/vehiclemaster/search/"+event.target.value+"/All")
			.then((response) => {
				this.setState({
					vehicleList   : response.data
				})

				$('.selected').removeClass('selectedSupplier');
				document.getElementById(response.data[0]._id).classList.add("selectedSupplier")
				this.setState({ id: response.data[0]._id, showDetails : true });
			})
			.catch((error) => {
			})
		// this.setState({ 'searchByName': event.target.value });
		// var pattern = new RegExp('^' + event.target.value, 'i');
		// var searchedData = this.state.masterVendor.filter((vendor) => {

		// 	return pattern.test(vendor.companyName);
		// });

		// this.setState({ vehicleList: searchedData });
	}
	resetFilter(event) {
		event.preventDefault();
		this.dropDownListObject.value = null;
		this.dropDownBrandListObject.value = null;
		this.dropDownModelListObject.value = null;
		this.dropDownFuelTypeListObject.value = null;
		this.dropDownWorkLocationListObject.value = null;

		$('.searchVehicle').val('');
		
		this.setState({
			'selector' : {},				
			'initial': 'All',
			showDetails : true
		})
		this.getVehicles()
		
	}
	handleChangeFilter(event){
		if (event.value) {
	        var currentSelection = event.element.getAttribute("id");
	        var selector = this.state.selector;

	        // if (event.itemData.category) {
	        // 	var categoryIds = []
	        //     selector.categoryIds = event.value;
	        // }
	        if (currentSelection === 'categoryChange') {
	            selector.categoryIds = event.value;
	        }
	        if (currentSelection === 'brandChange') {
	            selector.brandIds = event.value;
             	this.getModels(selector.brandIds)
	        }
	        if (currentSelection === 'modelChange') {
	            selector.modelIds = event.value;
	        }
	        if (currentSelection === 'fueltypeChange') {
	            selector.fueltypeIds = event.value;
	        }
	        if (currentSelection === 'workLocationChange') {
	            selector.workLocationId = event.value;
	        }
	        // selector.startRange = this.state.startRange
	        // selector.limitRange = this.state.limitRange

	        this.setState({ selector: selector, showDetails : true },()=>{
	        	this.getFilteredProducts(this.state.selector)
	        })
		}
    }
	getFilteredProducts(selector){
		
		axios.post("/api/vehiclemaster/post/list/filterVehicles", selector)
			.then((response) => {
				this.setState({
					vehicleList   : response.data
				})
				$('.selected').removeClass('selectedSupplier');
				document.getElementById(response.data[0]._id).classList.add("selectedSupplier")
				this.setState({ id: response.data[0]._id, showDetails : true });
			})
			.catch((error) => {
			})
	}
	editBasicform(event){
    	this.props.history.push('/vehicle-master/'+event.currentTarget.getAttribute('data-id'))
    }
    redirectTo(event)
    {
    	this.props.history.push("/vehicle-master")
    }

	deletedVehicle() {
		axios.get("/api/vehiclemaster/get/list")
			.then((response) => {
		        var deletedVehiclesData=response.data.filter((data,i)=>{
	                return data.status==='deleted-Active'|| data.status==='deleted-Inactive'
				});
				console.log('deletedVehiclesData',deletedVehiclesData);
				this.setState({
					deletedVehiclesData    : deletedVehiclesData,
				})
			})
			.catch((error) => {
			})
	}
	getEntity() {
        axios.get('/api/entitymaster/get_worklocation/'+"vendor")
            .then((response) => {
            	 var locationArray = [];
                this.setState({
                    locations: response.data,
                }, () => {
                    console.log("locations", this.state.locations)
                    		locationArray=this.state.locations.locations.map((a, i)=>{	
                    		var location = a.locationType.match(/\b(\w)/g).join('');
					          return {
					            id             		: a._id,
					            workLocation 		: location+" - "+a.area+" "+a.city+" ,"+a.stateCode+" - "+a.countryCode,
					          } 
					        })
                    	
                		this.setState({
                			workLocationArray : locationArray
                		})

                })
            })
            .catch((error) => {
            })
    }

    
    deleteVehicle(event){
		event.preventDefault();
		this.setState({id: event.currentTarget.getAttribute('data-id')})
		$('#deleteModal').show();
    }
    restoreVehicle(event){
    	event.preventDefault();
		var vehicleID = event.currentTarget.getAttribute('data-id')
    	// console.log('Restore',"vehicleID",vehicleID);
      	var details={
			vehicleID   : vehicleID,
            updatedBy   : localStorage.getItem("user_ID")
		}
      	axios.patch("/api/vehiclemaster/patch/restore_vehicle", details)
            .then((response)=>{
			    console.log('response',response);
              	this.getVehicles();
              	this.deletedVehicle(); 
            	
           		if (response.data) {
           			swal({
           				title : " ",
	                    text : "Record is restored successfully.",
	                 });
           		}	else{
           			swal({
           				title : " ",
	                    text : "Failed to restore.",
	                  });
           		}
            })
            .catch((error)=>{
            })
    }
    confirmDelete(event){
    	event.preventDefault();
    	// var id = event.target.id
    	// console.log("id",this.state.id)
      	axios.delete("/api/vehiclemaster/delete/"+this.state.id)
            .then((response)=>{
            	console.log('response',response);
              	$('#deleteModal').hide();  
              	this.deletedVehicle(); 
           		if (response.data) {
           			swal({
	                    title : " ",
	                    text :  "Record is deleted successfully."
	                  });
           		}	else{
           			swal({
	                    title : " ",
	                    text  : "Failed to delete.",
	                  });
           		}

              	this.getVehicles();
              	this.hideForm();

            })
            .catch((error)=>{
            })
    }
    closeModal(event){
    	event.preventDefault();
    	$('#deleteModal').hide(); 
    }
	render() {
		
		const categoriesfields: object = { text: 'category', value: 'id' };
		const brandsfields: object = { text: 'brand', value: 'id' };
		const modelsfields: object = { text: 'model', value: 'id' };
		const fueltypesfields: object = { text: 'fuelType', value: 'id' };
		const worklocationfields: object = { text: 'workLocation', value: 'id' };
		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				<div className="row">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOPadding">
						<section className="content">
							<div className="pageContent col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-left">
									<h4 className="weighttitle col-lg-5 col-md-11 col-xs-11 col-sm-11">Vehicle List</h4>
									<div className="col-lg-5 col-md-12 col-sm-12 col-xs-12 pull-right">
										<span className="col-lg-5 col-lg-offset-1 sentanceCase addButtonList" onClick={this.redirectTo.bind(this)}>
											<i  className="fa fa-plus-circle"></i>&nbsp;&nbsp;Add Vehicle 
										</span>
										<span className="col-lg-5  col-lg-offset-1 sentanceCase addButtonList deletelist" data-toggle="modal" data-target="#DeletedVehicleModal"  onClick={this.deletedVehicle.bind(this)}>
											<i  className="fa fa-minus-circle"></i>&nbsp;&nbsp;Deleted Vehicles 
										</span>
										<div className="modal" id="deleteModal" role="dialog">
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
		                                <div className="modal modalIndex" id="DeletedVehicleModal" tabIndex="-1" role="dialog" aria-hidden="true">
		                                    <div className="modal-dialog modal-lg " role="document">
		                                        <div className="modal-content UMmodalContent ummodallftmg ummodalmfdrt  ">
		                                            <div className="modal-header adminModal-header col-lg-12 col-md-12 col-sm-12 col-xs-12">
		                                                <h4 className="CreateTempModal col-lg-11 col-md-11 col-sm-11 col-xs-11 textAlignLeft" id="exampleModalLabel"><b>Deleted Vehicles</b></h4>
		                                                <div className="adminCloseCircleDiv pull-right  col-lg-1 col-md-1 col-sm-1 col-xs-1 NOpadding-left NOpadding-right">
		                                                    <button type="button" className="adminCloseButton" data-dismiss="modal" aria-label="Close">
		                                                        <span aria-hidden="true">&times;</span>
		                                                    </button>
		                                                </div>     
		                                            </div>
		                                            <div className="modal-body adminModal-body col-lg-12 col-md-12 col-sm-12 col-xs-12">
		                                              	
														{this.state.deletedVehiclesData != "-" ?
															<div className="table-responsive topmr40 col-lg-12 col-md-12 col-sm-12 col-xs-12">
																<table className="table iAssureITtable-bordered table-striped table-hover">
																	<thead className="tempTableHeader">
																		<tr className="">
																			<th className="umDynamicHeader srpadd textAlignCenter"> Sr No. </th>
																			<th className="umDynamicHeader srpadd textAlignCenter"> Vehicle Details </th>
																			<th className="umDynamicHeader srpadd textAlignCenter"> Status </th>
																			{/*<th className="umDynamicHeader srpadd textAlignCenter"> Insurance Date </th>
																			<th className="umDynamicHeader srpadd textAlignCenter"> Permit Validity </th>
																			<th className="umDynamicHeader srpadd textAlignCenter"> Authorization </th>
																			<th className="umDynamicHeader srpadd textAlignCenter"> PUC </th>
																			<th className="umDynamicHeader srpadd textAlignCenter"> Fitness </th>*/}
																			<th className="umDynamicHeader srpadd textAlignCenter"> Deleted On </th>
																			<th className="umDynamicHeader srpadd textAlignCenter"> Action </th>
																		</tr>
																	</thead>
																	<tbody>
																		{this.state.deletedVehiclesData && this.state.deletedVehiclesData.length > 0
																			?
																			this.state.deletedVehiclesData.map((data, index) => {
																				var statusLength = data.statusLog.length
																				return (
																					<tr key={index}>
																						<td className="textAlignCenter">{index+1}</td>
																						<td className="textAlignLeft">
																							<div>
																								{data.category + " "+ data.brand + " " + data.model}
																								<p>{data.vehiclecolor +" "+data.fuelType + " - " + data.vehicleNumber}</p>
																							</div>
																						</td>
																						<td className="textAlignCenter">{data.status}</td>
																						{/*<td className="textAlignCenter">{moment(data.insuranceDate).format("DD/MM/YYYY")}</td>
																						<td className="textAlignCenter">{moment(data.permitValidUpto).format("DD/MM/YYYY")}</td>
																						<td className="textAlignCenter">{moment(data.authorizationUpto).format("DD/MM/YYYY")}</td>
																						<td className="textAlignCenter">{moment(data.PUCValidUpto).format("DD/MM/YYYY")}</td>
																						<td className="textAlignCenter">{moment(data.FitnessValidUpto).format("DD/MM/YYYY")}</td>*/}
																						<td className="textAlignCenter">{moment(data.statusLog[statusLength-1].updatedAt).format("DD/MM/YYYY")}</td>
																						<td className="textAlignCenter">
																							<span>
																								<button className="btn deleteBtn" title="Delete"  data-id={data._id}  onClick={this.deleteVehicle.bind(this)}>Delete Permanently</button> 
																								<br/>
																								<button className="btn restoreBtn" title="Restore" data-id={data._id}  onClick={this.restoreVehicle.bind(this)}>Restore Vehicle</button> 
																							</span>
																						</td>
																					</tr>
																				);
																			})
																			:
																			<tr className="trAdmin"><td colSpan={5} className="noTempData textAlignCenter">No Record Found!</td></tr>
																		}
																	</tbody>
																</table>
															</div>
															:
															null
														}
									
		                                            </div>
		                                        </div>
		                                    </div>
		                                </div>
									</div>
								</div>
								<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 nopadding">
									<h5 className="box-titleVL col-lg-2 col-md-11 col-sm-11 col-xs-12"><i className="fa fa-filter"></i>&nbsp;&nbsp;<b> Select Filter</b></h5>
									<h5 className="box-title2 col-lg-2 col-md-11 col-sm-11 col-xs-12 nopadding">Total Records :&nbsp;&nbsp;<b>{this.state.vehicleCount}</b></h5>
									<h5 className="box-title2 col-lg-2 col-md-11 col-sm-11 col-xs-12 nopadding">Filtered :&nbsp;&nbsp;<b>{this.state.vehicleList.length}</b></h5>
										<div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 pull-right inLOE" >
											<span className="blocking-span" >
												<input type="text" name="search" className="col-lg-8 col-md-8 col-sm-8 col-xs-12 Searchusers searchEntity inputTextSearch outlinebox pull-right texttrans"
													placeholder="Search..." onInput={this.searchVehicle.bind(this)} />
											</span>
										</div>
								</div>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 borderBottomSO">
	                            </div>
								<div className="contenta col-lg-12 col-md-12 col-sm-12 col-xs-12 pdcls nopadding">
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
										<div className="col-lg-3 col-md-12 col-sm-12 col-xs-12">
											<button type="button" className="reset" onClick={this.resetFilter.bind(this)}>RESET FILTER</button>
										</div>										
									
									</div>

									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding marginTop20">

										<div className="col-lg-2 col-md-12 col-xs-12 col-sm-12">
											<label className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-left">Category</label>
											<MultiSelectComponent id="categoryChange" ref={(scope) => { this.dropDownListObject = scope; }} 
												dataSource={this.state.categoriesArray}
                                                change={this.handleChangeFilter.bind(this)} mode='mode' 
                                                fields={categoriesfields} placeholder="Select Category" mode="CheckBox" 
                                                selectAllText="Select All" unSelectAllText="Unselect All" 
                                                showSelectAll={true}>
                                                <Inject services={[CheckBoxSelection]} />
                                            </MultiSelectComponent>
										</div>
										<div className="col-lg-2 col-md-12 col-xs-12 col-sm-12">
											<label className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-left">Brand</label>
											<MultiSelectComponent id="brandChange" ref={(scope) => { this.dropDownBrandListObject = scope; }}  dataSource={this.state.brandsArray}
                                                change={this.handleChangeFilter.bind(this)}
                                                fields={brandsfields} placeholder="Select Brand" mode="CheckBox" selectAllText="Select All" unSelectAllText="Unselect All" showSelectAll={true}>
                                                <Inject services={[CheckBoxSelection]} />
                                            </MultiSelectComponent>
										</div>
										<div className="col-lg-2 col-md-12 col-xs-12 col-sm-12">
											<label className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-left">Model</label>
											<MultiSelectComponent id="modelChange" ref={(scope) => { this.dropDownModelListObject = scope; }} dataSource={this.state.modelsArray}
                                                change={this.handleChangeFilter.bind(this)}
                                                fields={modelsfields} placeholder="Select Model" mode="CheckBox" selectAllText="Select All" unSelectAllText="Unselect All" showSelectAll={true}>
                                                <Inject services={[CheckBoxSelection]} />
                                            </MultiSelectComponent>
										</div>
										<div className="col-lg-2 col-md-12 col-xs-12 col-sm-12">
											<label className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-left">Fuel Type</label>
											<MultiSelectComponent id="fueltypeChange" ref={(scope) => { this.dropDownFuelTypeListObject = scope; }} dataSource={this.state.fuelTypesArray}
                                                change={this.handleChangeFilter.bind(this)}
                                                fields={fueltypesfields} placeholder="Select Fuel Type" mode="CheckBox" selectAllText="Select All" unSelectAllText="Unselect All" showSelectAll={true}>
                                                <Inject services={[CheckBoxSelection]} />
                                            </MultiSelectComponent>
										</div>
										<div className="col-lg-2 col-md-12 col-xs-12 col-sm-12">
											<label className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-left">Work Location</label>
											<MultiSelectComponent id="workLocationChange" ref={(scope) => { this.dropDownWorkLocationListObject = scope; }} dataSource={this.state.workLocationArray}
                                                change={this.handleChangeFilter.bind(this)}
                                                fields={worklocationfields} placeholder="Select Work Location" mode="CheckBox" selectAllText="Select All" unSelectAllText="Unselect All" showSelectAll={true}>
                                                <Inject services={[CheckBoxSelection]} />
                                            </MultiSelectComponent>
										</div>
									</div>

									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
									<br/></div>
								</div>
								{this.state.vehicleList && this.state.vehicleList.length > 0 ?
									<div className="col-lg-6 col-md-12 col-sm-6 col-xs-6" id="style-2">
										<div className="borderlist12">
											{

												this.state.vehicleList.map((data, index) => {
													return (
														<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  borderlist selected" key={index} onClick={this.ShowForm.bind(this)} name={index} data-child={data._id + '-' + index} id={data._id}>
															<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 supplierLogoDiv">
															  {this.state.vehicleList.length>0 ?
																<img src={data.vehicleImage[0] ? data.vehicleImage[0] : "/images/noImagePreview.png"} className="employeeLogoImage"></img>
																 :
																 <img src="/images/Dummyimg1.jpg" className="supplierLogoImage11"></img> 
																}
															</div>
															<div className="col-lg-8 col-md-8 col-sm-10 col-xs-10 listprofile1">
																<div className="col-lg-12 col-md-12 col-sm-9 col-xs-9">
																	<h5 className="vehicleProfile">{data.brand+ " "+ data.model}</h5>
																</div>
																<div className="col-lg-12 col-md-12 col-sm-9 col-xs-9">
																	<label>{data.companyID ? data.companyName + " (Company ID: "+data.companyID +" )": " - "}</label><br/>
																	<label>{data.category +" "+data.vehiclecolor}</label> <br/>
																</div>
																<div className="col-lg-12 col-md-12 col-sm-9 col-xs-9">
																	<label>{data.vehicleNumber}</label> <br/>
																</div>
																{/*<h5 className="titleprofile">{data.vehicleNumber}</h5>
															
																<div className="col-lg-12 col-md-12 col-sm-9 col-xs-9">
																	<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
																		<label>Brand</label> <br/>
																		{data.brand}
																	</div>
																	<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
																		<label>Model</label> <br/>
																		{data.model}
																	</div>
																	
																</div>*/}
															</div>
															<div className="col-lg-2 noRightPadding">
																<div className="addedDiv1 col-lg-10 col-lg-offset-2 ">
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
									{/*console.log('this.state.showDetails ',this.state.showDetails, this.state.id )*/}
										<h5>No Data Found</h5>
									</div>
								}
								{ this.state.showDetails && this.state.vehicleList.length > 0 ?
									<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 pdcls suppliersOneProfile commonSup nopadding" id={this.state.id}>
										<div id={this.state.id} className="col-lg-12 col-md-12 col-sm-12 col-xs-12" >
											<VehicleDetails 
											name={this.state.index} 
											id={this.state.id} 
											getVehicles={this.getVehicles.bind(this)}
											searchVehicle={this.searchVehicle.bind(this)}
											getFilteredProducts={this.getFilteredProducts.bind(this)}
											hideForm={this.hideForm.bind(this)}
											ShowForm={this.ShowForm.bind(this)}/>
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

};