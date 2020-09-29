import React, { Component } from 'react';
import $                    from 'jquery';
import jQuery               from 'jquery';
import axios                from 'axios';
import moment               from 'moment';
import swal                 from 'sweetalert';
import {connect}            from 'react-redux';
import { withRouter }       from 'react-router-dom';
import _                    from 'underscore';
import 'bootstrap/js/tab.js';
import IAssureTable         from './IAssureTable.jsx';

class VehicleDriverMapping extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "tableHeading": {
                vehicleName : "Vehicle",
                driverName  : "Driver",
                status      : "Mapping Status",
                mapDate     : 'Allocated Date',
                // unmapDate   : 'Unallocated Date',
                map         : 'Action',
            },
            "tableObjects": {
                deleteMethod: 'delete',
                apiLink: '/api/vehicledrivermapping/',
                paginationApply: false,
                searchApply: false,
                editUrl: '/vehicle-driver-mapping'
            },
            "startRange": 0,
            "limitRange": 1000000,
            "editId": this.props.match.params ? this.props.match.params.fieldID : ''

        };
    }
    componentDidMount(){
        this.getDrivers();
        this.getVehicles();
        this.getData(this.state.startRange, this.state.limitRange);

        window.scrollTo(0, 0);
        $.validator.addMethod("regxvehicle", function (value, element, arg) {
            return  arg !== value;
        }, "Please select the Vehicle.");
        $.validator.addMethod("regxdriver", function (value, element, arg) {
            return arg !== value;
        }, "Please select the Driver.");

        jQuery.validator.setDefaults({
            debug: true,
            success: "valid"
        });
        $("#VehicleDriverMapping").validate({
            rules: {
                vehicle: {
                    required: true,
                    regxvehicle: "--Select Vehicle--"
                },
                driver: {
                    required: true,
                    regxdriver: "--Select Driver--"
                }
            },
            errorPlacement: function (error, element) {
                if (element.attr("name") == "vehicle") {
                    error.insertAfter("#vehicle");
                }
                if (element.attr("name") == "driver") {
                    error.insertAfter("#driver");
                }
            }
        });
        var editId = this.props.match.params.fieldID;
        if(editId){      
            this.edit(editId);
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps){
            var editId = nextProps.match.params.fieldID;
            if(nextProps.match.params.typeofCenterId){
                this.setState({
                    editId : editId
                },()=>{
                    this.edit(this.state.editId);
                })
            }
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
            // console.log('this.state',this.state);
        });
    }

    getData(startRange, limitRange){
        var data= {
            company_Id  : localStorage.getItem("company_Id"),
            startRange: startRange,
            limitRange: limitRange
        }
        axios.post('/api/vehicledrivermapping/post/list', data)
        .then((response) => {
            console.log('MappingArray', response)
           
            var tableData = response.data.filter((data,i)=>{
              return data.status==="Active";
            });   
            var tableData = tableData.map((a, i)=>{
                return {
                    _id          :a._id,        
                    vehicleName  :a.vehicleName + " <p>" + a.vehicleColor+" "+a.vehicleFuelType + " - " + a.vehicleNumber+"</p>",         
                    driverName   :a.driverName, 
                    status       :a.status,  
                    mapDate      :moment(a.mapDate).format('DD/MM/YYYY,HH:mm'),
                    // unmapDate    :a.unmapDate ? moment(a.unmapDate).format("LLL") : ""
            }
            });
            this.setState({
              tableData : tableData,
            },()=>{
                // console.log('tableData',this.state.tableData);
            });
            
        })
        .catch((error) => {
        console.log("error = ",error);
        })
    }
    getDrivers() {
        const company_Id = localStorage.getItem("company_Id");
        axios.get("/api/personmaster/get/driverListMapping/"+company_Id)
        .then((response) => {
             console.log('driverArray', response)
            var driverArray = response.data.map((a, i)=>{
                return {
                    _id        :a._id,        
                    driverName :a.firstName + " " + (a.middleName?a.middleName:"") + " " + a.lastName,        
                } 
            })  
            this.setState({
                driverArray   : driverArray,
            })
        })
        .catch((error) => {
            console.log("error = ",error);
        })
    }
    getVehicles() {
        const company_Id = localStorage.getItem("company_Id");
        axios.get("/api/vehiclemaster/get/vehicleListMapping/"+company_Id)
        .then((response) => {
            console.log('vehicleArray', response)
            var vehicleArray = response.data.map((a, i)=>{
                return {
                    _id         :a._id,        
                    vehicleName :a.category + " "+ a.brand + " " + a.model +" " + a.vehiclecolor +" "+a.fuelType + " - " + a.vehicleNumber,        
                } 
            })  
            this.setState({
                vehicleArray   : vehicleArray,
            })
        })
        .catch((error) => {
        })
    }
    map(event){
        event.preventDefault();
        if($('#VehicleDriverMapping').valid()) {
  
        var formvalues = {
            vehicleID     : this.state.vehicle,
            driverID      : this.state.driver.split('|')[0],
            driverName    : this.state.driver.split('|')[1],
            company_Id      : localStorage.getItem("company_Id"),
            status        : "Active",
            createdBy     : localStorage.getItem("user_ID"),
        }
        // console.log('formvalues',formvalues);
        axios.post('/api/vehicledrivermapping/post', formvalues)
          .then((response) => {
            console.log("response",response);
            this.getData(this.state.startRange, this.state.limitRange);
            if(response.data.duplicated == true){
                swal({                
                text: "Duplicate Entry",
              });
            }else{
                swal(" ","Data Inserted Sucessfully");
            }
              this.setState({
                vehicle       : "",
                driver        : "",
            },()=>{
                this.props.history.push("/vehicle-driver-mapping");
                this.getVehicles();
                this.getDrivers();
            })
             
          })
          .catch((error) => {

          })
        }
    }
    unMap(event){/*
        event.preventDefault();
        if($('#VehicleDriverMapping').valid()) {
        var formvalues = {
            mappingID     : this.state.editId,
            vehicleID     : this.state.vehicle,
            driverID      : this.state.driver,
            status        : "Inactive",
            createdBy     : localStorage.getItem("user_ID"),
        }
        console.log('formvalues',formvalues);
        axios.patch('/api/vehicledrivermapping/patch/unmapdate', formvalues)
          .then((response) => {
            console.log("response",response);
            swal("Data Inserted Sucessfully");
              this.setState({
                vehicle       : "",
                driver        : "",
            },()=>{
                this.props.history.push("/vehicle-driver-mapping");
            })
          })
          .catch((error) => {

          })
        }
    */}


    edit(id){
        // console.log('id',id);
        axios.get('/api/vehicledrivermapping/get/join/one/'+ id)
        .then((response)=> {
            var editData = response.data[0];   
            // console.log("editData",edittData);   
            this.setState({
                "vehicle"     :editData.vehicleID,
                "driver"      :editData.driverID,
                "status"      :editData.status,
            },()=>{

            });
        }).catch(function (error) {
        });
    }
    render() {
        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOPadding">
                        <section className="content">
                            <div className="pageContent col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
                                    <h4 className="weighttitle col-lg-11 col-md-11 col-xs-11 col-sm-11 NOpadding-right">Vehicle Driver Mapping</h4>
                                </div>
                                <section className="Content">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <form className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12" id="VehicleDriverMapping">
                                                <div className="form-margin col-lg-6 col-md-6 col-sm-12 col-xs-12" >
                                                    <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Vehicle <sup className="astrick">*</sup></label>
                                                    <select id="vehicle" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.vehicle} ref="vehicle" name="vehicle" onChange={this.handleChange.bind(this)}>
                                                        <option>--Select Vehicle--</option>
                                                        {
                                                            this.state.vehicleArray && this.state.vehicleArray.length > 0 ?
                                                                this.state.vehicleArray.map((data, i)=>{
                                                                    return(
                                                                        <option key={i} value={data._id}>{data.vehicleName}</option>
                                                                    );
                                                                })
                                                            :
                                                            null
                                                        }
                                                    </select>   
                                                </div>
                                                <div className="form-margin col-lg-6 col-md-6 col-sm-12 col-xs-12 marbtm30" >
                                                    <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Driver<sup className="astrick">*</sup></label>
                                                    <select id="driver" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.driver} ref="driver" name="driver" onChange={this.handleChange.bind(this)}>
                                                        <option>--Select Driver--</option>
                                                        {
                                                            this.state.driverArray && this.state.driverArray.length > 0 ?
                                                                this.state.driverArray.map((data, i)=>{
                                                                    return(
                                                                        <option key={i} value={data._id+'|'+data.driverName}>{data.driverName} </option>
                                                                    );
                                                                })
                                                            :
                                                            null
                                                        }
                                                    </select>
                                                </div>
                                                <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                    {
                                                        this.state.editId ? 
                                                        <button onClick={this.unMap.bind(this)} className="btn button3 pull-right">Unmap</button>
                                                        :
                                                        <button onClick={this.map.bind(this)} className="btn button3 pull-right">Map</button>
                                                    }
                                                </div>
                                            </form>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOPadding">
                                                <IAssureTable
                                                    tableHeading={this.state.tableHeading}
                                                    twoLevelHeader={this.state.twoLevelHeader}
                                                    dataCount={this.state.dataCount}
                                                    tableData={this.state.tableData}
                                                    tableObjects={this.state.tableObjects}
                                                    getData={this.getData.bind(this)}
                                                    unMap={this.unMap.bind(this)}
                                                    getVehicles={this.getVehicles.bind(this)}
                                                    getDrivers={this.getDrivers.bind(this)}
                                                    />
                                            </div>
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
export default VehicleDriverMapping;

