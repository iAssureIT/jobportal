import React, { Component }     from 'react';
import jQuery                   from 'jquery';
import $                        from 'jquery';
import axios                    from 'axios';
import swal                     from 'sweetalert';
import IAssureTable             from '../IAssureTable/IAssureTable.jsx';
import OneFieldForm             from '../Master/OneFieldForm/OneFieldForm.js';
import PackageMasterForm        from './PackageMasterForm.js';

import './PackageMaster.css'
import 'rc-time-picker/assets/index.css';

class PackageMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleValue       : "One Way",
      toggleClass       : "toggleoff",
      fromTime          : "",
      toTime            : "",
      packageName       : "",
      wayButton         : false,
      fixWay            : "0",
      packageTypeArray  : [],
      cityClassArray    : [],
      carCategoryArray  : [],
      // packages
      "packagefields" : {
        placeholder   : "Add package type & press 'Enter' Key",
        title         : "Package Type",
        attributeName : "packageType",
      },
      "packageTableHeading": {
          packageType      : "Package Type",
          actions          : 'Action',
      },
      "packageTableObjects": {
          deleteMethod    : 'delete',
          apiLink         : '/api/packagetypemaster/',
          paginationApply : false,
          searchApply     : false,
          editUrl         : '/package-master/package-type',
          editUrl1        : '/package-master'
      },
      // City Type
      "cityfields" : {
        placeholder   : "Add City type & press 'Enter' Key",
        title         : "City Type",
        attributeName : "cityType",
      },
      "cityTableHeading": {
          cityType      : "City Class",
          actions       : 'Action',
      },
      "cityTableObjects": {
          deleteMethod    : 'delete',
          apiLink         : '/api/citytypemaster/',
          paginationApply : false,
          searchApply     : false,
          editUrl         : '/package-master/city-type',
          editUrl1        : '/package-master'
      },
      // Car Category
      "categoryfields" : {
        placeholder   : "Add Car Category & press 'Enter' Key",
        title         : "Car Category",
        attributeName : "category",
        hasImage      : true
      },
      "categoryTableHeading": {
          category      : "Car Category",
          iconUrl       : "Icon",
          actions       : 'Action',
      },
      "categoryTableObjects": {
          deleteMethod    : 'delete',
          apiLink         : '/api/categorymaster/',
          paginationApply : false,
          searchApply     : false,
          editUrl         : '/package-master/category',
          editUrl1        : '/package-master'
      },
      // package Master
      tableHeading      : {
        packageEntity   : "Package Entity",
        citytype        : "City Class",      
        carCategory     : "Car Category",       
        packagetype     : "Package Type",
        packageName     : "Package Name",
        fixCharges      : "Fixed Charges (₹)",
        maxHours        : "Min Hours / Day",
        maxKm           : "Min Kms / Day",
        extraHr         : "Extra Charges / Hours",
        extraKms        : "Extra Charges / Kms",
        driverAllowance : "Driver Allowance / Day",
        nightHalt       : "Night Halt / Night",
        nightCharges    : "Night Charges / Night",
        morningCharges  : "Early Morning Charges / Morning",
        actions         : 'Action',
      },
      tableObjects      : {
        deleteMethod    : 'delete',
        apiLink         : '/api/packagemaster/',
        paginationApply : true,
        searchApply     : false,
        editUrl         : '/package-master'
      },
      startRange        : 0,
      limitRange        : 10,
    };
  }
  /*======= componentDidMount() =======*/
  componentDidMount() {
    this.edit(this.props.match.params.packageID);
    this.getData(this.state.startRange, this.state.limitRange);
    this.getPackageType();
    this.getCityType();
    this.getCarCategory();
    if(this.state.packagetype){
      this.getSinglePackageType(this.state.packagetype);
      this.getPackageNames(this.state.packagetype);
    } 

    /*Form Validation*/
    $.validator.addMethod("regxZ1", function (value, element, regexpr) {
      return regexpr !== value;
    }, "Please select Package Type");

    $.validator.addMethod("regxZ2", function (value, element, regexpr) {
      return regexpr !== value;
    }, "Please select City Class");

    $.validator.addMethod("regxZ3", function (value, element, regexpr) {
      return regexpr !== value;
    }, "Please select Car Category");

    $.validator.addMethod("regxZ4", function (value, element, regexpr) {
      return regexpr !== value;
    }, "Please select Package Name");

    jQuery.validator.setDefaults({
      debug   : true,
      success : "valid"
    });
    $("#packageMaster").validate({
      rules: {
        packagetype: {
          required : true,
          regxZ1   : "--Select Type--"
        },
        citytype   : {
          required : true,
          regxZ2   : "--Select Class--"
        },
        carCategory: {
          required : true,
          regxZ3   : "--Select Category--"
        },
        packageName: {
          required : true,
          regxZ4   : "--Select Package Name--"
        },
        fixCharges : {
          required : true,
        },
        maxHours   : {
          required : true,
        },
        maxKm      : {
          required : true,
        },
        extraHr    : {
          required : true,
        },
        extraKms   : {
          required : true,
        },
        driverAllow: {
          required : true,
        },
        nightHalt  : {
          required : true,
        },
        nightCharges: {
          required  : true,
        },
        morningCharges: {
          required    : true,
        },
      },
      errorPlacement: function (error, element) {
        if (element.attr("name") === "packagetype") {
          error.insertAfter("#packagetype");
        }
        if (element.attr("name") === "citytype") {
          error.insertAfter("#citytype");
        }
        if (element.attr("name") === "carCategory") {
          error.insertAfter("#carCategory");
        }
        if (element.attr("name") === "packageName") {
          error.insertAfter("#packageName");
        }
        if (element.attr("name") === "fixCharges") {
          error.insertAfter("#fixCharges");
        }
        if (element.attr("name") === "maxHours") {
          error.insertAfter("#maxHours");
        }
        if (element.attr("name") === "maxKm") {
          error.insertAfter("#maxKm");
        }
        if (element.attr("name") === "extraHr") {
          error.insertAfter("#extraHr");
        }
        if (element.attr("name") === "extraKms") {
          error.insertAfter("#extraKms");
        }
        if (element.attr("name") === "driverAllow") {
          error.insertAfter("#driverAllow");
        }
        if (element.attr("name") === "nightHalt") {
          error.insertAfter("#nightHalt");
        }
        if (element.attr("name") === "nightCharges") {
          error.insertAfter("#nightCharges");
        }
        if (element.attr("name") === "morningCharges") {
          error.insertAfter("#morningCharges");
        }
      }
    });
  }
  /*======= componentWillReceiveProps() =======*/
  componentWillReceiveProps(nextProps){
    this.edit(nextProps.match.params.packageID);
    this.getPackageType();
    this.getCityType();
    this.getCarCategory();
  }
  /*======= handleChange() =======*/
  handleChange(event) {
    event.preventDefault();
    const name = event.target.name;

    this.setState({
      [name]  : event.target.value
    }, ()=>{
      if(this.state.packagetype){
        this.getSinglePackageType(this.state.packagetype);
        this.getPackageNames(this.state.packagetype);
      }
    });    
  }
  /*======= submitPackageMaster() =======*/
  submitPackageMaster(event) {
    event.preventDefault();

    if ($('#packageMaster').valid()) {
      var formValues = {
        packageID     : this.props.match.params.packageID,
        packageTypeId : this.state.packagetype,
        packageNameId : this.state.packageName,
        fixCharges    : this.state.fixCharges,
        maxHours      : this.state.maxHours,
        maxKm         : this.state.maxKm,
        way           : this.state.wayButton ? this.state.toggleValue : this.state.fixWay,
        cityTypeId    : this.state.citytype,
        categoryId    : this.state.carCategory,
        extraHr       : this.state.extraHr,
        extraKms      : this.state.extraKms,
        driverAllow   : this.state.driverAllow,
        nightHalt     : this.state.nightHalt,
        nightCharges  : this.state.nightCharges,
        morningCharges: this.state.morningCharges,
        packageEntity : "CorporatePackage",
      }
      console.log("FormValues = ", formValues);

      if(this.props.match.params.packageID){
        /*=== Update Package ===*/
        axios.patch("/api/packagemaster/patch", formValues)
        .then((response) => {
          if(response.data.duplicate === true){
            swal("Duplicate Record!", "This Package Already Exists.");
          }else{
            document.getElementById("btnCheck").innerHTML = "Submit";
            swal('Done!',"Your Package Details has been updated successfully.");
            this.props.history.push("/package-master");
            this.setState({
              packagetype           : "",
              packageTypeNameLower  : "",
              packageName           : "",
              fixCharges            : "",
              maxHours              : "",
              maxKm                 : "",
              toggleValue           : "One Way",
              toggleClass           : "toggleoff",
              citytype              : "",
              carCategory           : "",
              extraHr               : "",
              extraKms              : "",
              driverAllow           : "",
              nightHalt             : "",
              nightCharges          : "",
              morningCharges        : "",
            })
            this.getData(this.state.startRange, this.state.limitRange);
          }
        })
        .catch((error) => {
          console.log("Error PackageMaster PATCH() = ", error);
        })
      }else{
        /*=== Submit Package ===*/
        axios.post("/api/packagemaster/post", formValues)
        .then((response) => {
          if(response.data.duplicate === true){
            swal("Duplicate Record!", "This Package Already Exists.");
          }else{
            swal('Done!',"Your Package Details has been saved successfully.");
            this.setState({
              packagetype           : "",
              packageTypeNameLower  : "",
              packageName           : "",
              fixCharges            : "",
              maxHours              : "",
              maxKm                 : "",
              toggleValue           : "One Way",
              toggleClass           : "toggleoff",
              citytype              : "",
              carCategory           : "",
              extraHr               : "",
              extraKms              : "",
              driverAllow           : "",
              nightHalt             : "",
              nightCharges          : "",
              morningCharges        : "",
            })
            this.getData(this.state.startRange, this.state.limitRange);
          }
        })
        .catch((error) => {
          console.log("Error PackageMaster POST() = ", error);
        })
      }
      this.getData(this.state.startRange, this.state.limitRange);      
    }
  }
  /*======= edit() =======*/
  edit(packageID) {
    if (packageID) {
      axios.get('/api/packagemaster/get/one/' + packageID)
      .then((response) => {
        console.log("response Edit = ", response.data);
        document.getElementById("btnCheck").innerHTML = "Update";
        this.setState({
          packagetype   : response.data.packageTypeId,
          packageName   : response.data.packageNameId,
          fixCharges    : response.data.fixCharges,
          maxHours      : response.data.minHours,
          maxKm         : response.data.minKm,
          citytype      : response.data.cityTypeId,
          carCategory   : response.data.categoryId,
          toggleValue   : response.data.way === "0" ? "One way" : response.data.way,
          extraHr       : response.data.extraHrCharges,
          extraKms      : response.data.extraKmsCharges,
          driverAllow   : response.data.driverAllow,
          nightHalt     : response.data.nightHalt,
          nightCharges  : response.data.nightCharges,
          morningCharges: response.data.morningCharges,
        }, ()=>{
          this.getSinglePackageType(this.state.packagetype);
          this.getPackageNames(this.state.packagetype);
        })
      })
      .catch((error) => {
        console.log("Error edit() = ", error);
      })
    }else{
      document.getElementById("btnCheck").innerHTML = "Submit";
      this.setState({
        packagetype   : "--Select Type--",
        packageName   : "",
        fixCharges    : "",
        maxHours      : "",
        maxKm         : "",
        citytype      : "",
        carCategory   : "",
        toggleValue   : "One Way",
        extraHr       : "",
        extraKms      : "",
        driverAllow   : "",
        nightHalt     : "",
        nightCharges  : "",
        morningCharges: "",
      })
    }
  }
  /*======= getData() =======*/
  getData(startRange, limitRange) {
    var formValue = {
      startRange: startRange,
      limitRange: limitRange
    }
    axios.post("/api/packagemaster/get/list", formValue)
      .then((response) => {
        var tableData = response.data.map((a, i)=>{
          return {
            _id             : a._id,
            packageEntity   : a.packageEntity === "CorporatePackage" ? "Corporate Package" : "Vendor Package",
            citytype        : a.cityType,
            carCategory     : a.carCategory,
            packagetype     : a.packageType + (a.way === "0" ? "" : " - " + a.way),
            packageName     : a.packageName,
            fixCharges      : a.fixCharges,
            maxHours        : a.minHours,
            maxKm           : a.minKm,
            extraHr         : a.extraHrCharges,
            extraKms        : a.extraKmsCharges,
            driverAllowance : a.driverAllow,
            nightHalt       : a.nightHalt,
            nightCharges    : a.nightCharges,
            morningCharges  : a.morningCharges
          }
        })
        this.setState({
          tableData: tableData
        })
      })
      .catch((error) => {
        console.log("Error getData = ", error);
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
      console.log("Error getPackageType = ", error);
    })
  }
  /*======= getSinglePackageType() =======*/
  getSinglePackageType(packageID){
    axios.get("/api/packagetypemaster/get/one/"+packageID)
    .then((response)=>{
      var packageTypeName      = response.data.packageType;
      var packageTypeNameLower = response.data.packageType.toLowerCase();
      this.setState({
        packageTypeName      : packageTypeName,
        packageTypeNameLower : packageTypeNameLower
      }, ()=>{
        if(this.state.packageTypeNameLower === "outstation"){
          this.setState({
            wayButton : true
          }, ()=>{
            // console.log("wayButton Outstation = ", this.state.wayButton + ", " + this.state.toggleValue);
          })
        }else{
          this.setState({
            wayButton : false
          }, ()=>{
            // console.log("wayButton Local = ", this.state.wayButton + ", " + this.state.toggleValue);
          })
        }
      })
    })
    .catch((error)=>{
      console.log("Error, getSinglePackageType = ", error);
    })
  }
  /*======= getPackageNames() =======*/
  getPackageNames(packageTypeID){
    axios.get("/api/packagenamemaster/get/list/"+packageTypeID)
    .then((response)=>{
      this.setState({
        packageNameArray : response.data
      })
    })
    .catch((error)=>{
      console.log("Error, getPackageNames = ", error);
    })
  }
  /*======= getCityType() =======*/
  getCityType(){
    axios.get("/api/citytypemaster/get/list")
    .then((response)=>{
      this.setState({
        cityClassArray : response.data
      })
    })
    .catch((error)=>{
      console.log("Error, getCityType = ", error);
    })
  }
  /*======= getCarCategory() =======*/
  getCarCategory(){
    axios.get("/api/categorymaster/get/list")
    .then((response)=>{
      this.setState({
        carCategoryArray : response.data
      })
    })
    .catch((error)=>{
      console.log("Error, getCarCategory = ", error);
    })
  }
  /*======= toggleWay() =======*/
  toggleWay(event){
    // event.preventDefault();
    console.log("Event id = ", event.target.id);
    console.log("Event id = ", event.target);
    if(event.target.className == "center-block toggleoff") {
        this.setState({
          toggleClass : "toggleon",          
          toggleValue : "Two Way"
        })
    }else {   
        this.setState({          
          toggleClass : "toggleoff",
          toggleValue : "One Way"
        })
    }
  }
  /*======= render() =======*/
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="formWrapper">
            <section className="content">
              <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 pageContent">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 titleaddcontact NOpadding">
                    <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right ">
                        <h4 className="weighttitle col-lg-11 col-md-11 col-xs-11 col-sm-11 NOpadding-right">Package Master</h4>
                    </div>
                  </div>     
                  <div className="boxMinHeight boxMinHeighttab addMarginTop">
                    <div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12" style={{"padding": "15px 30px"}}>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOPadding" style={{"boxShadow" : "1px 1px 2px 1px #ccc"}}>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding addMarginTopPM">
                          <form id="packageMaster"  >
                            <div className="">
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="form-group valid_box col-lg-3 col-md-3 col-sm-12 col-xs-12" >
                                  <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">City Class <span className="astrick">*</span></label>
                                  <div className="input-group col-lg-12 col-md-12 col-sm-12 col-xs-12" id="citytype" >
                                    <select id="" className="addonDiv form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.citytype} ref="citytype" name="citytype" onChange={this.handleChange.bind(this)}>
                                        <option>--Select Class--</option>
                                        {
                                            this.state.cityClassArray && this.state.cityClassArray.length > 0 
                                            ?
                                              this.state.cityClassArray.map((data, i)=>{
                                                  return(
                                                      <option key={i} value={data._id}>{data.cityType}</option>
                                                  );
                                              })
                                            :
                                              null
                                        }
                                    </select>
                                    <div className="input-group-addon inputIcon plusIconBooking" data-toggle="modal"  data-target="#addOneFieldCity" title="Add City Class" ><i className="fa fa-plus "></i>
                                    </div>
                                    <div className="modal" id="addOneFieldCity" role="dialog">
                                      <div className="adminModal adminModal-dialog marginTopModal col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div className="modal-content adminModal-content col-lg-8 col-lg-offset-2 col-md-6 col-md-offset-3 col-sm-10 col-sm-offset-1 col-xs-12 noPadding">
                                          <div className="modal-header adminModal-header col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div className="adminCloseCircleDiv pull-right  col-lg-1 col-lg-offset-11 col-md-1 col-md-offset-11 col-sm-1 col-sm-offset-11 col-xs-12 NOpadding-left NOpadding-right">
                                                <button type="button" className="adminCloseButton" data-dismiss="modal" >&times;</button>
                                           </div>
                                          </div>
                                        <div className="modal-body adminModal-body OneFieldModal col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                          <OneFieldForm 
                                            fields             = {this.state.cityfields}
                                            tableHeading       = {this.state.cityTableHeading}
                                            tableObjects       = {this.state.cityTableObjects}
                                            editId             = {this.props.match.params.fieldID}
                                            getSecondFieldData = {this.getCityType.bind(this)}
                                            history            = {this.state.history}
                                            masterFieldForm    = {true}
                                           />                                          
                                        </div>
                                        <div className="modal-footer adminModal-footer col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="form-group valid_box col-lg-3 col-md-3 col-sm-12 col-xs-12" >
                                  <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Car Category <span className="astrick">*</span></label>
                                  <div className="input-group col-lg-12 col-md-12 col-sm-12 col-xs-12" id="carCategory" >
                                    <select id="" className="addonDiv col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.carCategory} ref="carCategory" name="carCategory" onChange={this.handleChange.bind(this)}>
                                        <option>--Select Category--</option>
                                        {
                                          this.state.carCategoryArray && this.state.carCategoryArray.length > 0 
                                          ?
                                            this.state.carCategoryArray.map((data, i)=>{
                                                return(
                                                    <option key={i} value={data._id}>{data.category}</option>
                                                );
                                            })
                                          :
                                            null
                                        }
                                    </select>
                                    <div className="input-group-addon inputIcon plusIconBooking" data-toggle="modal"  data-target="#addOneFieldCategory" title="Add Car Category" ><i className="fa fa-plus "></i>
                                    </div>
                                    <div className="modal" id="addOneFieldCategory" role="dialog">
                                      <div className="adminModal adminModal-dialog marginTopModal col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div className="modal-content adminModal-content col-lg-8 col-lg-offset-2 col-md-6 col-md-offset-3 col-sm-10 col-sm-offset-1 col-xs-12 noPadding">
                                          <div className="modal-header adminModal-header col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div className="adminCloseCircleDiv pull-right  col-lg-1 col-lg-offset-11 col-md-1 col-md-offset-11 col-sm-1 col-sm-offset-11 col-xs-12 NOpadding-left NOpadding-right">
                                                <button type="button" className="adminCloseButton" data-dismiss="modal" >&times;</button>
                                           </div>
                                          </div>
                                        <div className="modal-body adminModal-body OneFieldModal col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                          <OneFieldForm 
                                            fields             = {this.state.categoryfields}
                                            tableHeading       = {this.state.categoryTableHeading}
                                            tableObjects       = {this.state.categoryTableObjects}
                                            editId             = {this.props.match.params.fieldID}
                                            getSecondFieldData = {this.getCarCategory.bind(this)}
                                            history            = {this.state.history}
                                            masterFieldForm    = {true}
                                           />                                          
                                        </div>
                                        <div className="modal-footer adminModal-footer col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="form-group valid_box col-lg-3 col-md-3 col-sm-12 col-xs-12" >
                                  <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Package Type <span className="astrick">*</span></label>
                                  <div className="input-group" id="packagetype" >
                                    <select id="" className="addonDiv col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.packagetype} ref="packagetype" name="packagetype" onChange={this.handleChange.bind(this)}>
                                        <option>--Select Type--</option>
                                        {
                                          this.state.packageTypeArray && this.state.packageTypeArray.length > 0 
                                          ?
                                            this.state.packageTypeArray.map((data, i)=>{
                                                return(
                                                    <option key={i} value={data._id}>{data.packageType}</option>
                                                );
                                            })
                                          :
                                          null
                                        }
                                    </select>
                                    <div className="input-group-addon inputIcon plusIconBooking" data-toggle="modal"  data-target="#addOneField" title="Add Package Type">
                                         <i className="fa fa-plus "></i>
                                    </div>
                                    <div className="modal" id="addOneField" role="dialog">
                                      <div className="adminModal adminModal-dialog marginTopModal col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div className="modal-content adminModal-content col-lg-8 col-lg-offset-2 col-md-6 col-md-offset-3 col-sm-10 col-sm-offset-1 col-xs-12 noPadding">
                                          <div className="modal-header adminModal-header col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div className="adminCloseCircleDiv pull-right  col-lg-1 col-lg-offset-11 col-md-1 col-md-offset-11 col-sm-1 col-sm-offset-11 col-xs-12 NOpadding-left NOpadding-right">
                                                <button type="button" className="adminCloseButton" data-dismiss="modal" >&times;</button>
                                           </div>
                                          </div>
                                        <div className="modal-body adminModal-body OneFieldModal col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                          <OneFieldForm 
                                            fields             = {this.state.packagefields}
                                            tableHeading       = {this.state.packageTableHeading}
                                            tableObjects       = {this.state.packageTableObjects}
                                            editId             = {this.props.match.params.fieldID}
                                            getSecondFieldData = {this.getPackageType.bind(this)}
                                            history            = {this.state.history}
                                            masterFieldForm    = {true}
                                           />                                          
                                        </div>
                                        <div className="modal-footer adminModal-footer col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {((this.state.packageTypeNameLower ==="outstation") && this.state.toggleValue !== "0")
                                ?
                                <div className="form-group valid_box col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                  <div className="" id="way">
                                    <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left" >
                                      Way <span className="astrick">*</span>
                                    </label>                                    
                                    <input type="button" name="way" id="toggleWay" 
                                      className = {"center-block " + this.state.toggleClass} 
                                      value     = {this.state.toggleValue} 
                                      onClick   = {this.toggleWay.bind(this)}
                                    />                                      
                                  </div>
                                </div>
                                :
                                  null
                                }
                                <div className="form-group valid_box col-lg-3 col-md-3 col-sm-12 col-xs-12" >
                                  <div className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left" id="packageName">
                                    <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left" >
                                      Package Name <span className="astrick">*</span>
                                    </label>
                                    <div className="input-group col-lg-12 col-md-12 col-sm-12 col-xs-12" id="packageName" >
                                      <select id="" className="addonDiv form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.packageName} ref="packageName" name="packageName" onChange={this.handleChange.bind(this)}>
                                          <option>--Select Package Name--</option>
                                          {
                                            this.state.packageNameArray && this.state.packageNameArray.length > 0 
                                            ?
                                              this.state.packageNameArray.map((data, i)=>{
                                                  return(
                                                      <option key={i} value={data._id}>{data.packageName}</option>
                                                  );
                                              })
                                            :
                                              null
                                          }
                                      </select>
                                    </div>
                                  </div>
                                </div>
                                <div className="form-group valid_box col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                  <div className="input-group" id="maxHours">
                                    <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left" >
                                      Min Hours/Day <span className="astrick">*</span>
                                    </label>
                                    <input type="number" name="maxHours" className="form-control" 
                                      value     = {this.state.maxHours}
                                      onChange  = {this.handleChange.bind(this)}
                                      onKeyDown = {(event)=>(event.target.value > 24 ? (((event.which ? event.which : event.keyCode) !== 8) ? (event.preventDefault(), true) : false) : true)}
                                      min       = "0" />
                                  </div>
                                </div>
                                <div className="form-group valid_box col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                  <div className="input-group" id="maxKm">
                                    <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left" >
                                      Min Kms/Day <span className="astrick">*</span>
                                    </label>
                                    <input type="number" name="maxKm" className="form-control"
                                      onChange  = {this.handleChange.bind(this)}
                                      value     = {this.state.maxKm}
                                      min       = "0"
                                    />
                                  </div>
                                </div>
                                <div className="form-group valid_box col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                  <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left" >
                                    Fixed Charges <span className="astrick">*</span>
                                  </label>
                                  <div className="input-group" id="fixCharges">
                                    <span className="input-group-addon leftInputIcon inputIcon"><i className="fa fa-rupee "></i></span>
                                    <input type="number" name="fixCharges" className="form-control"
                                      onChange  = {this.handleChange.bind(this)}
                                      value     = {this.state.fixCharges}
                                      min       = "0" 
                                      />
                                    <span className="input-group-addon inputIcon">.00</span>
                                  </div>
                                </div>
                                <div className="form-group valid_box col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                  <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left" >
                                    Extra Hour Charges <span className="astrick">*</span>
                                  </label>
                                  <div className="input-group" id="extraHr"> 
                                    <span className="input-group-addon leftInputIcon inputIcon"><i className="fa fa-rupee "></i></span>                                       
                                    <input type="number" name="extraHr" className="form-control"
                                      onChange  = {this.handleChange.bind(this)}
                                      value     = {this.state.extraHr}
                                      min       = "0"
                                      />
                                    <span className="input-group-addon inputIcon">.00 / Hour</span>
                                  </div>
                                </div>
                                <div className="form-group valid_box col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                  <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left" >
                                    Extra Km Charges <span className="astrick">*</span>
                                  </label>
                                  <div className="input-group" id="extraKms">
                                    <span className="input-group-addon leftInputIcon inputIcon"><i className="fa fa-rupee "></i></span>
                                    <input type="number" name="extraKms" className="form-control"
                                      onChange  = {this.handleChange.bind(this)}
                                      value     = {this.state.extraKms}
                                      min       = "0" 
                                    />
                                    <span className="input-group-addon inputIcon">.00 / Km</span>
                                  </div>
                                </div>
                                <div className="form-group valid_box col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                  <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left" >
                                    Driver Allowance <span className="astrick">*</span>
                                  </label>
                                  <div className="input-group" id="driverAllow">
                                    <span className="input-group-addon leftInputIcon inputIcon"><i className="fa fa-rupee "></i></span>
                                    <input type="number" name="driverAllow" className="form-control"
                                      onChange  = {this.handleChange.bind(this)}
                                      value     = {this.state.driverAllow}
                                      min       = "0" 
                                    />
                                    <span className="input-group-addon inputIcon">.00 / Day</span>
                                  </div>
                                </div>
                                <div className="form-group valid_box col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                  <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left" >
                                    Night Halt <span className="astrick">*</span>
                                  </label>
                                  <div className="input-group" id="nightHalt">
                                    <span className="input-group-addon leftInputIcon inputIcon"><i className="fa fa-rupee "></i></span>
                                    <input type="number" name="nightHalt" className="form-control"
                                      onChange  = {this.handleChange.bind(this)}
                                      value     = {this.state.nightHalt}
                                      min       = "0"
                                    />
                                    <span className="input-group-addon inputIcon">.00 / Night</span>
                                  </div>
                                </div>
                                <div className="form-group valid_box col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                  <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left" >
                                    Night Charges <span className="astrick">*</span>
                                  </label>
                                  <div className="input-group" id="nightCharges">
                                    <span className="input-group-addon leftInputIcon inputIcon"><i className="fa fa-rupee "></i></span>
                                    <input type="number" name="nightCharges" className="form-control"
                                      onChange  = {this.handleChange.bind(this)}
                                      value     = {this.state.nightCharges}
                                      min       = "0" 
                                    />
                                    <span className="input-group-addon inputIcon">.00 / Night</span>
                                  </div>
                                </div>
                                <div className="form-group valid_box col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                  <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left" >
                                    Early Morning Charges <span className="astrick">*</span>
                                  </label>
                                  <div className="input-group" id="morningCharges">
                                    <span className="input-group-addon leftInputIcon inputIcon"><i className="fa fa-rupee "></i></span>
                                    <input type="number" name="morningCharges" className="form-control"
                                      onChange  = {this.handleChange.bind(this)}
                                      value     = {this.state.morningCharges}
                                      min       = "0" 
                                    />
                                    <span className="input-group-addon inputIcon">.00 / Morning</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  ">
                              <button className="col-lg-2 col-md-2 col-sm-12 col-xs-12 btn button3 pull-right" id="btnCheck" onClick={this.submitPackageMaster.bind(this)}>
                                Submit
                              </button>
                            </div>
                          </form>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{"marginBottom": "30px"}}>
                          <IAssureTable
                            tableHeading   = {this.state.tableHeading}
                            twoLevelHeader = {this.state.twoLevelHeader}
                            dataCount      = {this.state.dataCount}
                            tableData      = {this.state.tableData}
                            tableObjects   = {this.state.tableObjects}
                            getData        = {this.getData.bind(this)}
                          />
                        </div>
                      </div>                     
                    </div> 
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>           
    );
  }
}

export default PackageMaster;