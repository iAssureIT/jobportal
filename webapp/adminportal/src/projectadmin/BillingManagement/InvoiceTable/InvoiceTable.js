import React, { Component }       	from 'react';
import {Route, withRouter} 			from 'react-router-dom';
import swal                     	from 'sweetalert';
import axios 						from 'axios';
import $ 							from 'jquery';
import jQuery 						from 'jquery';
import 'jquery-validation';
var sum = 0;

class InvoiceTable extends Component {
	constructor(props){
		super(props);
		this.state = {
		    "dataCount" 				: props && props.dataCount ? props.dataCount : [],
		    "tableData" 				: props && props.tableData ? props.tableData : [],
		    "tableHeading"				: props && props.tableHeading ? props.tableHeading : {},
		    "twoLevelHeader" 			: props && props.twoLevelHeader ? props.twoLevelHeader : {},
		    "tableObjects" 				: props && props.tableObjects ? props.tableObjects : {},		    
		    "reA" 						: /[^a-zA-Z]/g,
		    "reN" 						: /[^0-9]/g,
		    "sort" 	  					: true,
		    "examMasterData2" 			: '',
		    "activeClass" 				: 'activeCircle',
		    "paginationArray" 			: [],
		    "startRange" 				: 0,
		    "limitRange" 				: 10,
		    "activeClass" 				: 'activeCircle', 		    
		    "normalData" 				: true,
		    "callPage" 					: true,
		    "pageCount" 				: 0,
		    "valI" 						: 1	,
		    "checkedArray"              : []
		}
	}
	componentDidMount() {
      $("html,body").scrollTop(0); 
      this.setState({
      	tableHeading	: this.props.tableHeading,
      	tableData 		: this.props.tableData,
      	dataCount 		: this.props.dataCount,
      	tableId 		: this.props.tableId
      }, ()=>{
      	// console.log("tableId = ", this.state.tableId);
      	// console.log("tableHeading = ", this.state.tableHeading);
      	// console.log("tableData = ", this.state.tableData);
      	// console.log("dataCount = ", this.state.dataCount);
      });

      this.paginationFunction();
	}
	componentWillReceiveProps(nextProps) {
		if(this.state.callPage  ===  true){
        	this.paginationFunction();
        }
        this.setState({
            tableData	    : nextProps.tableData,
            dataCount 		: nextProps.dataCount,
        })        
    }

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
   	paginationFunction(){
   		// console.log("in paginationFunction =>",);
		var dataLength = this.state.dataCount;
		const maxRowsPerPage = this.state.limitRange;
		var paginationNum = dataLength/maxRowsPerPage;
		var pageCount = Math.ceil(paginationNum) > 20? 20 : Math.ceil(paginationNum);
		this.setState({
			valI : 1,
			pageCount : pageCount,
			// callPage : false
		})
		this.showPagination(1, pageCount);
		
	}
	showPagination(valI, pageCount){
		// console.log("valI => ",valI);
		// console.log("pageCount => ",pageCount);
		var paginationArray = [];
		for (var i=valI; i<=pageCount;i++){
			var countNum = this.state.limitRange * i;
			var startRange = countNum - this.state.limitRange;
			if(i === 1){
				var activeClass = 'activeCircle';
			}else{
				activeClass = '';
			}
			paginationArray.push(
				<li key={i} className={"queDataCircle page-link "+this.state.tableId+" "+activeClass+" parseIntagination"+i} id={countNum+'|'+startRange+'|'+this.state.tableId} onClick={this.getStartEndNum.bind(this)} title={"Click to jump on "+i+ " page"}>{i}</li>
			);
		}
		if(pageCount>=1){				
			this.setState({
				paginationArray : paginationArray,
			},()=>{
			});
		}
		return paginationArray;
	}
	getStartEndNum(event){	
		event.preventDefault();

		var limitRange = parseInt($(event.target).attr('id').split('|')[0]);
		// var limitRange2     = parseInt(limitRange);
		var startRange = parseInt($(event.target).attr('id').split('|')[1]);
		console.log("limitRange =>",limitRange);
		// console.log("limitRange2 =>",limitRange2);
		console.log("startRange =>",startRange);
		console.log("data =>",this.props.getData(startRange, limitRange));
		this.props.getData(startRange, limitRange);

		this.setState({
			startRange : startRange,
			limitRange : limitRange,
			callPage   : false
		});
		console.log("target => ",event.target);
		var elems = document.getElementsByClassName("queDataCircle "+this.state.tableId);
		// $("queDataCircle "+this.state.tableId).removeClass('activeCircle');
		elems.forEach(function(el) {
		  el.classList.remove("activeCircle");
		})

		console.log("x => ",("queDataCircle "+this.state.tableId));
		console.log("x => ",elems);
		// $('li').removeClass('activeCircle');
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
			console.log("table props => ", this.props);
			console.log("limitRange => ", this.state.limitRange);
			console.log("startRange => ", this.state.startRange);
			$('li').removeClass('activeCircle');
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
		if(searchText && searchText.length != 0) {
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
    	var dataLength = this.state.dataCount;
		const maxRowsPerPage = this.state.limitRange;
		var paginationNum = dataLength/maxRowsPerPage;
		var pageCount = Math.ceil(paginationNum);

		var addInValI = this.state.valI+20;
		var addInPageCount = this.state.pageCount+20 > pageCount ? (pageCount) : this.state.pageCount+20;

		this.setState({
			valI 		: addInValI,
			pageCount 	: addInPageCount
		},()=>{

			this.showPagination(this.state.valI, this.state.pageCount);
		})
    }
    showPreviousPaginationButtons(){
    	var dataLength = this.state.dataCount;
		const maxRowsPerPage = this.state.limitRange;
		var paginationNum = dataLength/maxRowsPerPage;
		var pageCount = Math.ceil(paginationNum);

		var subFromValI = this.state.valI-20 < 1 ? 1 : this.state.valI-20;
		// var subFromPageCount = this.state.pageCount-20 < 20 ? 20 : this.state.pageCount-20 ;
		var subFromPageCount = subFromValI+19 ;

		this.setState({
			valI 		: subFromValI,
			pageCount 	: subFromPageCount
		},()=>{

			this.showPagination(this.state.valI, this.state.pageCount);
		})
    }
    showFirstTweentyButtons(){
		this.setState({
			valI 		: 1,
			pageCount 	: 20
		},()=>{
			this.showPagination(this.state.valI, this.state.pageCount);
		})
    }
    showLastTweentyButtons(){
    	var dataLength = this.state.dataCount;
		const maxRowsPerPage = this.state.limitRange;
		var paginationNum = dataLength/maxRowsPerPage;
		var pageCount = Math.ceil(paginationNum);

		this.setState({
			valI 		: pageCount-19,
			pageCount 	: pageCount
		},()=>{
			
			this.showPagination(this.state.valI, this.state.pageCount);
		})
    }

    Cancel(event){
    	event.preventDefault();
    }

    // GenerateBill(event){
    // 	event.preventDefault();
    // 	console.log("view id = ", event.target.id)
    // 	var id = $(event.target).attr('id');
    // 	this.props.history.push('/view-invoice/'+id)
    // }

    checkUncheckAll() {
       var  selectAllCheckbox=document.getElementById("checkUncheckAll" + this.state.tableId);
       var ArrayVar = [];
	    if(selectAllCheckbox.checked==true){
	     var checkboxes =  document.getElementsByName("rowSelectCheckBox" + this.state.tableId);
	     for(var i=0, n=checkboxes.length;i<n;i++) {
	      	checkboxes[i].checked = true;
	      	// var ArrayVar = this.state.checkedArray
	      	ArrayVar.push(checkboxes[i].value)
	      	this.setState({checkedArray:ArrayVar},()=>{this.props.getIds(this.state.checkedArray)})
	     }
	    }else {
	     var checkboxes =  document.getElementsByName("rowSelectCheckBox" + this.state.tableId);
	     for(var i=0, n=checkboxes.length;i<n;i++) {
	      	checkboxes[i].checked = false;
	      	this.setState({checkedArray:[]},()=>{this.props.getIds(this.state.checkedArray)})
	     }
	    }
	}

	checkUncheck(event){
		// event.preventDefault();
		var value = event.target.value;
		var id = event.target.id;
		console.log("In checkUncheck => ");
		console.log("value => ",value);
		console.log("id => ",id);
		console.log("tableId => ",this.state.tableId);
		console.log("check => ",document.getElementById(id).checked);
		var checkbox = document.getElementById(id).checked ;
		console.log("checkbox => ",checkbox);
		document.getElementById("checkUncheckAll" + this.state.tableId).checked = false

		if(checkbox == true){
			document.getElementById(id).checked = true;
			var checkedArray = this.state.checkedArray
	        checkedArray.push(value)
	        this.setState({checkedArray:checkedArray},()=>{this.props.getIds(this.state.checkedArray)})
		}else{
			document.getElementById(id).checked = false
			var checkedArray = this.state.checkedArray

			checkedArray = checkedArray.filter(function(item) {
			    return item !== value
			})
			this.setState({checkedArray:checkedArray},()=>{this.props.getIds(this.state.checkedArray)})
		}
	}

   
	render() {
		return (
	       	<div id="tableComponent" className="col-lg-12 col-sm-12 col-md-12 col-xs-12">
				{this.state.tableObjects.paginationApply === true ?
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
						<div className="col-lg-2 col-md-2 col-sm-3 col-xs-12 NOpadding">
							<label className="col-lg-12 col-md-12 col-sm-12 col-xs-12  NOpadding">Data Per Page</label>
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
								<select onChange={this.setLimit.bind(this)} value={this.state.limitRange} id="limitRange" ref="limitRange" name="limitRange" className="col-lg-12 col-md-12 col-sm-6 col-xs-12 noPadding form-control invoiceDataLimit">
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
					<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 NOpadding"></div>    
				}	
	       		{   this.state.tableObjects.searchApply === true ?
					<div className="col-lg-2 col-lg-offset-5 col-md-2 col-md-offset-5 col-xs-12 col-sm-12 marginTop17 NOpadding">
						<label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">Search</label>
						<div className="input-group">
							<input type="text" onChange={this.tableSearch.bind(this)} className="NOpadding-right zzero form-control" ref="tableSearch" id="tableSearch" name="tableSearch"/>
							<span className="input-group-addon"><i className="fa fa-search"></i></span>
						</div>
					</div>	
					:
					null
				}	
	            <div className="col-lg-12 col-sm-12 col-md-12 col-xs-12 NOpadding marginTop17">			            	        
	                <div className="table-responsive">
						<table className="invoiceTable">
	                        <thead className="">	                        
	                            <tr>
	                            	<th className="checkSelect">
		                            	{/*<label className="invoiceCheckLabel" name="chk[]" onClick={this.checkAll.bind(this)}>
				                            <input  type="checkbox" id="" 
				                                    value="" 
				                                    name="chk[]"
				                                    // checked="false"
				                                    onClick={this.checkAll.bind(this)}
				                            />
				                            <span className="invoiceCheckmark" id="" name="chk[]" onClick={this.checkAll.bind(this)}></span>
				                        </label>*/}
				                        <label className="invoiceCheckLabel">
				                        	<input type    = "checkbox" className="checkBox" 
				                        		   id      = {"checkUncheckAll" + this.state.tableId}
				                        		   onClick = {this.checkUncheckAll.bind(this)}
				                        	/>
				                        	<span className="invoiceCheckmark"></span>
				                        </label>
				                    </th>
		                            { this.state.tableHeading ?
										Object.entries(this.state.tableHeading).map( 
											([key, value], i)=> {
													if(key === 'action'){
														return(
															<th key={i} className="textAlignCenter invoiceAction"><div>{value}</div></th>
														);	
													}else{
														return(
															<th key={i} className=""><div>{value} <span onClick={this.sort.bind(this)} id={key} className="fa fa-sort tableSort"></span></div></th>
														);	
													}
																							
											}
										) 
										:
										<th className="textAlignCenter"></th>
									}
	                            </tr>
	                        </thead>
	                        <tbody>
	                           { this.state.tableData && this.state.tableData.length > 0 ?
	                           		this.state.tableData.map( 
										(value, i)=> {	
											return(
												<tr key={i}>
													<td className="checkSelect">
														{/*<label className="invoiceCheckLabel" name="invoiceCheckmark">
								                            <input  type="checkbox" id="" 
								                                    value="" 
								                                    name="invoiceCheckmark"
								                                    // checked="false"
								                                    onChange=""
								                            />
								                            <span className="invoiceCheckmark" id="" name="invoiceCheckmark"></span>*/}
								                        {/*</label>*/}
								                        <label className="invoiceCheckLabel">
								                        	<input type    = "checkbox" name={"rowSelectCheckBox" + this.state.tableId} className="checkBox" 
								                        		   id      = {"checkBox-"+this.state.tableId+"-"+i} 
								                        		   value   = {value.id} 
								                        		   onClick = {this.checkUncheck.bind(this)}
								                            />
								                        	<span className="invoiceCheckmark"></span>
								                        </label>
								                    </td>
													{
														Object.entries(value).map( 
															([key, value1], i)=> {
																var regex = new RegExp(/(<([^>]+)>)/ig);
																var value2 = value1 ;
																// var value2 = value1 ? value1.replace(regex,'') : '';
																var aN = value2;
																// var aN = value2.replace(this.state.reA, "");
																if(aN && $.type( aN ) === 'string'){
																	var textAlign = 'textAlignLeft';
																}else{
																	var bN = value1 ? (parseInt(value1, 10) || value1 === "0" ) : '';
																	// var bN = value1 ? (parseInt(value1, 10) || value1 === "0" || value1.includes("%")) : '';
																	// var bN = value1 ? parseInt(value1.replace(this.state.reN, ""), 10) : '';
																	if(bN){
																		var textAlign = 'textAlignRight';
																	}else{
																		var textAlign = 'textAlignLeft';
																	}
																}
																var found = Object.keys(this.state.tableHeading).filter((k)=> {
																  return k === key;
																});
																if(found.length > 0){
																	if(key != 'id'){
																		return(<td key={i}><div dangerouslySetInnerHTML={{ __html:value1}}></div></td>); 						
																	}
																}																
															}
														)
													}
													{/*{
														this.state.tableHeading.action ?
													
														<td className="actionButtons invoiceAction">															
															<a><i className="fa fa-pencil" aria-hidden="true" title="click to edit" id={value.id} data-id={value.id} onClick={this.GenerateBill.bind(this)}></i></a> 
															<a><i className="fa fa-share-square-o" aria-hidden="true" title="click to view" data-id={value.id} onClick={this.Cancel.bind(this)}></i></a> 
															{/*<button type="button" className="" id={value.id} onClick={this.GenerateBill.bind(this)}><i className="fa fa-pencil"></i></button><br/>
																														<button type="button" className="" onClick={this.Cancel.bind(this)}><i className="fa fa-pencil"></i></button>*/}
														{/*</td>
														:
														null
													}*/}
												</tr>
											);										
										}
									) 	
									:
									<tr className="trAdmin"><td colSpan={Object.keys(this.state.tableHeading).length+1} className="noTempData textAlignCenter">No Record Found!</td></tr>               		
								}
	                    </tbody>
	                    </table>
	                    {
	                    	this.state.tableObjects.paginationApply === true ?
		                    	this.state.tableData && this.state.tableData.length > 0 ?
		                    	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 paginationAdminWrap">
			                    	<div className="col-lg-1 col-md-1 col-sm-1 col-xs-1">
				                    	{ 
					                    		this.state.valI ===  1?                  		
					                    		null
						                    	:
				                    			<div className="btn btn-primary" onClick={this.showFirstTweentyButtons.bind(this)} title="Fast Backward"><i className="fa fa-fast-backward"></i></div>
				                    	}
			                    	</div>
			                    	<div className="col-lg-1 col-md-1 col-sm-1 col-xs-1">
				                    	{ 
				                    		this.state.valI ===  1?                  		
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
											this.state.pageCount >= Math.ceil(this.state.dataCount/this.state.limitRange) ?
											null
											:
											<div className="btn btn-primary" onClick={this.showNextPaginationButtons.bind(this)} title="Next"><i className="fa fa-caret-right"></i></div>
										}
									</div>
									<div className="col-lg-1 col-md-1 col-sm-1 col-xs-1">
										{
											this.state.pageCount >= (this.state.dataCount/this.state.limitRange) ?
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

export default withRouter(InvoiceTable);