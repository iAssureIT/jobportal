import React, { Component } from 'react';
import $ from 'jquery';
import jQuery from 'jquery';
import axios from 'axios';
import swal from 'sweetalert';
import _ from 'underscore';
import 'bootstrap/js/tab.js';
import 'react-phone-input-2/lib/style.css';
import moment from 'moment';
import { stat } from 'fs';
import './vendorAllocation.css';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";


class VendorAllocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "selectedVendor"            : [],
            "mappingArray"             : [],
            gmapsLoaded                : false,
            city                       :"",
            vendorArray                : []
        };

        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    initMap = () => {
      this.setState({
        gmapsLoaded: true,
      })
    }

    // getGoogleAPIKey(){
    //     axios.get("/api/projectSettings/get/GOOGLE",)
    //     .then((response) => {
    //         this.setState({
    //             googleAPIKey : response.data.googleapikey
    //         },()=>{
    //             window.initMap = this.initMap
    //             const gmapScriptEl = document.createElement(`script`)
    //             gmapScriptEl.src = `https://maps.googleapis.com/maps/api/js?key=`+this.state.googleAPIKey+`&libraries=places&callback=initMap`
    //             document.querySelector(`body`).insertAdjacentElement(`beforeend`, gmapScriptEl)
    //         });
    //     })
    //     .catch((error) =>{
    //         swal(error)
    //     })
    // }
    componentDidMount() {
        // this.getGoogleAPIKey();
        this.getContract();
        this.setState({
            mappingID: this.props.match.params.id
        }, () => {
            this.edit();
        })
        window.scrollTo(0, 0);
        $.validator.addMethod("regxcorporate", function (value, element, arg) {
            return arg !== value;
        }, "Please select the corporate");
        $.validator.addMethod("regxcorporateLocation", function (value, element, arg) {
            return arg !== value;
        }, "Please select the corporate location");

        jQuery.validator.setDefaults({
            debug: true,
            success: "valid"
        });
        $("#VendorAllocation").validate({
            rules: {
                city: {
                    required: true,
                },
                vendor: {
                    required: true,
                },
            },
            errorPlacement: function (error, element) {
                if (element.attr("name") === "city") {
                    error.insertAfter("#city");
                }
                if (element.attr("name") === "vendor") {
                    error.insertAfter("#vendor");
                }
            }
        });
    }
    componentWillUnmount() {
        $("script[src='/js/adminLte.js']").remove();
        $("link[href='/css/dashboard.css']").remove();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.match.params.id){
            this.setState({
                mappingID: nextProps.match.params.id
            }, () => {
                this.edit();
            })
        }

        this.handleChange = this.handleChange.bind(this);
    }
    edit() {
        window.scrollTo(0, 0);
        var mappingID = this.props.match.params.id;
        if (mappingID) {
            axios.get('/api/VendorAllocation/get/one/' + mappingID)
            .then((response) => {
                $("#city").prop('disabled', true);
                document.getElementById("submitbtn").innerHTML = "Update";
                this.setState({
                    "mappingID"                  : this.props.match.params.id,
                    "city"                   : response.data.city,
                    "selectedVendor"                      : response.data.vendor,
                },()=>{this.getVendor(this.state.city)})
                for(var i=0; i<response.data.vendor.length; i++){
                    this.setState({
                        [response.data.vendor[i].vendorID] : true,
                        ["assignedPercent-"+response.data.vendor[i].vendorID] :response.data.vendor[i].assignedPercent
                    })
                }
            })
            .catch((error) => {
            })
        }
    }
    
    handlePercentChange(event) {
        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: event.target.value
        },()=>{

        });
    }
    handleChangePlaces = address => {
    this.setState({ city : address, vendorArray:[] });
    };

    handleSelectLocation = address => {
        
    geocodeByAddress(address)
     .then((results) =>{ 

      for (var i = 0; i < results[0].address_components.length; i++) {
          for (var b = 0; b < results[0].address_components[i].types.length; b++) {
              switch (results[0].address_components[i].types[b]) {
                  case 'sublocality_level_1':
                      var area = results[0].address_components[i].long_name;
                      break;
                  case 'sublocality_level_2':
                      var area = results[0].address_components[i].long_name;
                      break;
                  case 'locality':
                      var city = results[0].address_components[i].long_name;
                      break;
                  case 'administrative_area_level_1':
                      var state = results[0].address_components[i].long_name;
                      break;
                  case 'country':
                     var country = results[0].address_components[i].long_name;
                      break;
                  case 'postal_code':
                     var pincode = results[0].address_components[i].long_name;
                      break;
              }
          }
        }
    })
    .catch(error => console.error('Error', error));
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.setState({'fromLatLng': latLng}))
      .catch(error => console.error('Error', error));
      
      this.setState({ city : address ? address.split(",")[0] :"" },()=>{
        console.log('this.state.city:',this.state.city)
        this.getVendor(this.state.city)
      });
    };
    submit(event) {
        event.preventDefault();
        if ($('#VendorAllocation').valid() && this.state.selectedVendor.length > 0) {
            var selectedVendor =  this.state.selectedVendor;
            var allocatedCount = 10
            for(var i=0; i<selectedVendor.length; i++){
                selectedVendor[i].assignedPercent = this.state["assignedPercent-"+selectedVendor[i].vendorID] ? this.state["assignedPercent-"+selectedVendor[i].vendorID] : 0
                var total = ((selectedVendor[i].assignedPercent)/100)*allocatedCount;
                selectedVendor[i].total = Math.round(total)
            }
            var formValues = {
                "mappingID"                  : this.props.match.params.id,
                "city"                 : this.state.city,
                "vendor"                    : selectedVendor,
            }
            var y = 0;
            selectedVendor.forEach((num) => {y = y+Math.round(num.assignedPercent); return y;});
            if(y > 100){
                swal("Total Percent for selected vendor should be 100")
            }else{
                if(this.props.match.params.id) {
                    axios.patch('/api/VendorAllocation/patch', formValues)
                    .then((response) => {
                        this.setState({
                            "city"                 : "",
                            "vendor"                    : "",
                            "selectedVendor"              : [],
                            vendorArray:[]
                        })
                        swal("City and Vendor mapped successfully.");
                        document.getElementById("submitbtn").innerHTML = "Submit";
                        $("#city").prop('disabled', false); 
                        $('input:checkbox:checked').prop('checked', false);
                        if(selectedVendor.length && selectedVendor.length>0){
                                for(var i=0; i<selectedVendor.length; i++){
                                    this.setState({
                                        [selectedVendor[i].vendorID]:false
                                    })
                                }//i
                            }
                         this.getContract();
                        this.props.history.push("/vendor_allocation");
                    })
                    .catch((error) => {
                        console.log('error patch: ',error)
                    })
                }else{
                    axios.post('/api/VendorAllocation/post', formValues)
                    .then((response) => {
                        if(response.data.duplicate === true){
                            swal("Mapping already exist for selected city.");
                        }else{
                            if(selectedVendor.length && selectedVendor.length>0){
                                for(var i=0; i<selectedVendor.length; i++){
                                    this.setState({
                                        [selectedVendor[i].vendorID]:false
                                    })
                                }//i
                            }
                            this.setState({
                                "city"                 : "",
                                "vendor"                    : "",
                                "selectedVendor"              : [],
                                vendorArray:[]
                            })
                            swal("City and Vendor mapped successfully.");
                            $('input:checkbox:checked').prop('checked', false);
                            document.getElementsByClassName("mycheckbox").checked = false;
                             this.getContract();
                            this.props.history.push("/vendor_allocation");
                        }
                    })
                    .catch((error) => {
                        console.log('error post: ',error)
                    })
                }
            }
        } else {
            $(event.target).parent().parent().find('.inputText.error:first').focus();
            this.setState({
                checkBoxError : "Please select atleast one vendor."
            })
        }

    }
    
    handleChange(event) {
        event.preventDefault();
        const target = event.target;
        const name = target.name;
        var value = event.target.value;
        this.setState({
            [name]: event.target.value
        },()=>{
            this.getVendor(this.state.city)
            this.setState({vendorArray:[]})
        });
    }
    
    getVendor(city){
         axios.get('/api/entitymaster/get/getAllCitywiseVendors/'+city)
		.then((response) => {
            if(!this.props.match.params.id){
                var assignedPercent = (100/response.data.length).toFixed(2);
                for(var i=0; i<response.data.length; i++){
                    this.setState({
                        ["assignedPercent-"+response.data[i].id] : Math.round(assignedPercent)
                    })
                }
            }
			this.setState({
				vendorArray: response.data
			})
		})
		.catch((error) => {
			console.log('error getting vendor: ',error)
		})
    }
    getContract(){
        axios.get("/api/VendorAllocation/get/joinentitieslist")
        .then((response)=>{
            this.setState({
                mappingArray : response.data
            })
        })
        .catch((error)=>{
            console.log('error getting data:',error)
        })
    }
    delete(event){
        var mappingID = event.target.id;
        axios.delete("/api/VendorAllocation/delete/"+mappingID)
        .then((response)=>{
            this.getContract();
            this.props.history.push("/vendor_allocation");
            this.setState({
                "city"                 : "",
                "vendor"                    : "",
                "vendorLocation"            : "",
                "selectedVendor"            : [],
                vendorArray:[]
            })
            document.getElementById("submitbtn").innerHTML = "Submit";
            swal("Data deleted successfully.")
        })
        .catch((error)=>{
            console.log('Delete Error: ',error)
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
    selectVendor(event){
        var check = event.target.checked;
        var id = event.target.id;
        var ID = $('#'+id).attr('dataid');
        var value = event.target.value;
        var selectedVendor = this.state.selectedVendor;
        this.setState({
            [event.target.name] : this.state[event.target.name] ? false : true
        },()=>{
            if(check === true){
                selectedVendor.push({
                    vendorID    : id,
                    ID          : ID,
                    // "assignedPercent" : this.state["assignedPercent-"+id] ? this.state["assignedPercent-"+id] : 0
                });
            }else{
                var index = selectedVendor.findIndex(x => x.packageID === id);
                selectedVendor.splice(index, 1);
            }
            this.setState({
                selectedVendor : selectedVendor,
                checkBoxError : this.state.selectedVendor.length > 0 ? "" : "Please select atleast one vendor."
            })
        })
    }
    render() {
        const searchOptions = {
          types: ['(cities)'],
          componentRestrictions: {country: "in"}
        }
        return (
            <div className="">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <section className="content">
                            <div className="pageContent col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
                                    <h4 className="weighttitle col-lg-11 col-md-11 col-xs-11 col-sm-11 NOpadding-right">Map City and Vendor</h4>
                                </div>
                                
                                <section className="Content">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <form id="VendorAllocation">
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                                    <div className="col-lg-12 col-md-12 col-sm-12 submitForm">
                                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                                            <br />
                                                        </div>
                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  NOpadding">
                                                                <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12" >
                                                                        <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">City <sup className="astrick">*</sup></label>
                                                                        {this.props.match.params.id ?
                                                                             <input type="text"  className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.city} ref="city" name="city" id="city" placeholder="Enter City" disabled />
                                                                             :
                                                                        <PlacesAutocomplete
                                                                            value={this.state.city}
                                                                            name="city"
                                                                            ref="city"
                                                                            onChange={this.handleChangePlaces}
                                                                            onSelect={this.handleSelectLocation}
                                                                            searchOptions={searchOptions}

                                                                          >
                                                                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                                                              <div>
                                                                                <input
                                                                                  {...getInputProps({
                                                                                    placeholder: 'Search cities ...',
                                                                                    className: 'location-search-input col-lg-12 form-control',
                                                                                    id:"city"
                                                                                  })}
                                                                                />
                                                                                <div className="autocomplete-dropdown-container">
                                                                                  {loading && <div>Loading...</div>}
                                                                                  {suggestions.map(suggestion => {
                                                                                    const className = suggestion.active
                                                                                      ? 'suggestion-item--active'
                                                                                      : 'suggestion-item';
                                                                                    // inline style for demonstration purpose
                                                                                    const style = suggestion.active
                                                                                      ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                                                      : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                                                    return (
                                                                                      <div
                                                                                        {...getSuggestionItemProps(suggestion, {
                                                                                          className,
                                                                                          style,
                                                                                        })}
                                                                                      >
                                                                                        {/*<span>{suggestion.description}</span>*/}
                                                                                    <span>{(suggestion.description ? suggestion.description.split(",")[0]:"")}</span>

                                                                                      </div>
                                                                                    );
                                                                                  })}
                                                                                </div>
                                                                              </div>
                                                                            )}
                                                                        </PlacesAutocomplete>
                                                                       
                                                                    }
                                                                    </div>
                                                                    
                                                                </div>
                                                                <div className="col-lg-12 col-sm-12 col-md-12 col-xs-12 NOpadding form-margin">
                                                                    <div className="table-responsive">
                                                                        <table className="table iAssureITtable-bordered table-striped table-hover fixedTable tableStyle">
                                                                            <thead className="tempTableHeader fixedHeader">
                                                                                <tr className="tempTableHeader">
                                                                                    <th>Vendor</th>
                                                                                    <th>Cars</th>
                                                                                    <th>Allocation(%)</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                               {
                                                                                this.state.vendorArray && this.state.vendorArray.length > 0 ?
                                                                                    this.state.vendorArray.map((data, i)=>{
                                                                                        
                                                                                        return(
                                                                                            <tr key={i} >
                                                                                                <td>
                                                                                                    <input  type="checkbox" id={data.id} 
                                                                                                            dataid={data.ID}
                                                                                                            className="mycheckbox col-md-1 col-xs-12"
                                                                                                            value={data.id} 
                                                                                                            name={data.id} 
                                                                                                            checked={this.state[data.id] ? true : false}
                                                                                                            onChange={this.selectVendor.bind(this)} />

                                                                                                    <span className="wordBreak">&nbsp;&nbsp;{data.companyName}</span>
                                                                                                    <label className="error">{this.state.checkBoxError}</label>
                                                                                                </td>
                                                                                                <td>{data.carCount}</td>
                                                                                                <td>
                                                                                                    <input  type="number"
                                                                                                            max="100"
                                                                                                            title="Percentage must be less than or equal to 100"
                                                                                                            style={{"width" : "80px", "height": "25px"}}   
                                                                                                            ref={"assignedPercent-"+data.id}
                                                                                                            name={"assignedPercent-"+data.id} 
                                                                                                            value={this.state["assignedPercent-"+data.id]} 
                                                                                                            onKeyDown={(event)=>(event.target.value > 100 ? (((event.which ? event.which : event.keyCode) !== 8) ? (event.preventDefault(), true) : false) : true)}
                                                                                                            onChange={this.handlePercentChange.bind(this)} /> 
                                                                                                    <span>&nbsp;%</span>
                                                                                                </td> 
                                                                                            </tr>
                                                                                        );
                                                                                    })
                                                                                :
                                                                                <tr><td className="centerAlign" colSpan="3">No Data Found</td></tr>
                                                                            } 
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt">
                                                            <button id="submitbtn" className="btn button3 pull-right" onClick={this.submit.bind(this)} >Submit</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
										{this.state.mappingArray && this.state.mappingArray.length > 0 ?
											<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
												<div className="col-lg-12 col-md-12 col-sm-12 col-sm-12 foothd">
													<h4 className="MasterBudgetTitle col-lg-12">Mapping Details</h4>
												</div>
												<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                    <div className="table-responsive">
                                                        <table className="table iAssureITtable-bordered table-striped table-hover fixedTable tableStyle">
                                                            <thead className="tempTableHeader fixedHeader">
                                                                <tr className="tempTableHeader">
                                                                    <th>City</th>
                                                                    <th>Vendors</th>
                                                                    <th>Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
													{this.state.mappingArray && this.state.mappingArray.length > 0 ?
														this.state.mappingArray.map((data, index) => {
                                                            return(
                                                                <tr key={index} >
                                                                    <td>{data.city}</td>
                                                                    <td>
                                                                        {
                                                                            data.vendor && data.vendor.length > 0?
                                                                                data.vendor.map((a, i)=>{
                                                                                    return(
                                                                                        <li>{a.companyName} </li>
                                                                                    );
                                                                                })
                                                                            :
                                                                            null
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        <span className="col-md-1"><a href={"/vendor_allocation/"+data._id} title="Edit"><i className="fa fa-pencil penmrleft" aria-hidden="true"></i></a></span>
                                                                        <span className="col-md-1" data-toggle="modal" data-target={`#${data._id}-rm`}  id={data._id} title="Delete"><i className="fa fa-trash-o" aria-hidden="true"></i></span>
                                                                    </td>
                                                                    <div className="modal col-lg-12 col-md-12 col-sm-12 col-xs-12" id={`${data._id}-rm`}  role="dialog">
                                                                        <div className=" modal-dialog adminModal adminModal-dialog">
                                                                             <div className="modal-content adminModal-content col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                                    <div className="modal-header adminModal-header col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                                        <h4 className="CreateTempModal col-lg-11 col-md-11 col-sm-11 col-xs-11" id="exampleModalLabel"></h4>
                                                                                        <div className="adminCloseCircleDiv pull-right  col-lg-1 col-md-1 col-sm-1 col-xs-1 NOpadding-left NOpadding-right">
                                                                                            <button type="button" className="adminCloseButton" data-dismiss="modal" aria-label="Close">
                                                                                              <span aria-hidden="true">&times;</span>
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                  <div className="modal-body adminModal-body col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                                                                     <h4 className="blackFont textAlignCenter col-lg-12 col-md-12 col-sm-12 col-xs-12 examDeleteFont">Are you sure you want to delete this?</h4>
                                                                                  </div>
                                                                                  
                                                                                  <div className="modal-footer adminModal-footer col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                                       <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                                                            <button type="button" className="btn adminCancel-btn col-lg-4 col-lg-offset-1 col-md-4 col-md-offset-1 col-sm-8 col-sm-offset-1 col-xs-10 col-xs-offset-1" data-dismiss="modal">CANCEL</button>
                                                                                       </div>
                                                                                       <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                                                            <button onClick={this.delete.bind(this)} id={data._id} type="button" className="btn examDelete-btn col-lg-4 col-lg-offset-7 col-md-4 col-md-offset-7 col-sm-8 col-sm-offset-3 col-xs-10 col-xs-offset-1" data-dismiss="modal">DELETE</button>
                                                                                       </div>
                                                                                  </div>
                                                                             </div>
                                                                        </div>
                                                                   </div>
                                                                    </tr>
                                                                                );
                                                                            })
                                                                        :
                                                                        <tr><td className="centerAlign" colSpan="3">No Data Found</td></tr>
                                                                    } 
                                                                    </tbody>
                                                                </table>
															
														
												
										</div>
                                        </div>
                                        </div>
                                        :
                                        null
                                    }
                                    </div>
                                    </div>
                                </section>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}
export default VendorAllocation;