import React, { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import _ from 'underscore';
import 'bootstrap/js/tab.js';
import './List.css'
class Details extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: '',
            //contractDetails : {},
            loadMore: false,
            loadless: false,
            "attributeArray"            : [
                {
                    name : 'Extra Hrs',
                    field: 'extraHours',
                    type : 'number',
                    max  : 24,
                    val  : 0
                }, 
                {
                    name : 'Extra Km',
                    field: 'extraKM',
                    type : 'number',
                    max  : 1000,
                    val  : 0
                }, 
                {
                    name : 'Grace Hrs',
                    field: 'graceHours',
                    type : 'number',
                    max  : 24,
                    val  : 0
                }, 
                {
                    name : 'Grace KM',
                    field: 'graceKM',
                    type : 'number',
                    max  : 1000,
                    val  : 0
                },
                {
                    name : 'Driver Allowance',
                    field: 'driverAllowance',
                    type : 'number',
                    max  : 10000,
                    val  : 0
                }, 
                {
                    name : 'Night Charges (Local)',
                    field: 'nightChargesLocal',
                    type : 'number',
                    max  : 1000,
                    val  : 0
                }, 
                {
                    name : 'Night Charges (Outstation)',
                    field: 'nightChargesOutstation',
                    type : 'number',
                    max  : 1000,
                    val  : 0
                }, 
                // {
                //     name : 'Night Charges (From Time)',
                //     field: 'nightChargesFromTime',
                //     type : 'time',
                //     max  : 24,
                //     val  : '00:00'
                // }, 
                // {
                //     name : 'Night Charges (To Time)',
                //     field: 'nightChargesToTime',
                //     type : 'time',
                //     max  : 24,
                //     val  : '00:00'
                // }, 
                {
                    name : 'Night Charges Day',
                    field: 'nightChargesDay',
                    type : 'text',
                    val  : 'NA'
                    // max  : 10000000
                }, 
                {
                    name : 'Early Morning Charges',
                    field: 'earlyMorningCharges',
                    type : 'number',
                    max  : 10000,
                    val  : 0
                }, 
                // {
                //     name : 'Early Morning Charges (From Time)',
                //     field: 'earlyMorningChargesFromTime',
                //     type : 'time',
                //     max  : 24,
                //     val  : '00:00'
                // }, 
                // {
                //     name : 'Early Morning Charges (To Time)',
                //     field: 'earlyMorningChargesToTime',
                //     type : 'time',
                //     max  : 24,
                //     val  : '00:00'
                // }
            ],
        };
        // this.handleChange = this.handleChange.bind(this);
        this.isLoaded = false
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            id: nextProps.id
        }, () => {
            this.getJoinContract(nextProps.id);
        })
    }
    getJoinContract(id) {
        axios.get("/api/contract/get/joincontract/" + id)
            .then((response) => {
                var contractDetails = response.data[0];
                var entityLocation = response.data[0].entity.locations.filter((a, i) => contractDetails.entityLocationId.includes(a._id));
                contractDetails.entity.location = entityLocation[0];

                var companyLocation = response.data[0].company.companyLocationsInfo.filter((a, i) => a._id == contractDetails.companyLocationId);
                contractDetails.company.location = companyLocation[0];

                this.setState({
                    contractDetails: contractDetails
                })
            })
            .catch((error) => {
            })
    }
    componentDidMount() {
        this.setState({
            id: this.props.id
        }, () => {
            this.getJoinContract(this.state.id)
        })
    }

    showMore(event) {
        $('.listProduct').addClass('showList');
        $('.listProduct').removeClass('hide');
        this.setState({
            'loadless': true,
        })
    }
    showLess(event) {
        $('.listProduct').addClass('hide');
        $('.listProduct').removeClass('showList');
        this.setState({
            'loadless': false,
        })
    }
    editBasicform(event) {
        this.props.history.push("/contract-management/" + event.currentTarget.getAttribute('data-id'))
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
                    swal({
                        text: "Contract is deleted successfully.",
                    });
                } else {
                    swal({
                        text: "Failed to delete.",
                    });
                }
                this.props.getContracts();
                this.props.hideForm();
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
        return (
            this.state.contractDetails ?
                <div>
                    <div className="row">
                        <div id="supplierprofile" className="col-lg-12 col-md-12 col-sm-12 col-xs-12 boxshade">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 singleClientDetails nopadding" data-child={this.state.contractDetails._id} id={this.state.contractDetails._id}>
                                <div className="col-lg-11 col-md-12 col-sm-10 col-xs-10 listprofile nopadding">
                                    <h5 className="contractdetailht">{this.state.contractDetails.company.companyName}</h5>
                                    <div className="dots dropdown1 col-lg-1 col-md-1 col-sm-1 col-xs-1 pull-right">
                                        <i className="fa fa-ellipsis-h dropbtn1 dropbtn2 buttonDrop3" aria-hidden="true"></i>
                                        <div className="dropdown-content1 dropdown2-content2">
                                            <ul className="pdcls ulbtm">
                                                <li id={this.state.contractDetails._id} className="styleContactActbtn" data-index data-id={this.state.contractDetails._id} onClick={this.editBasicform.bind(this)}>
                                                    <a><i className="fa fa-pencil penmrleft" aria-hidden="true" ></i>&nbsp;&nbsp;<span className="mrflfedit">Edit</span></a>
                                                </li>
                                                <li id className="styleContactActbtn" data-id={this.state.contractDetails._id} onClick={this.deleteEntity.bind(this)}>
                                                    <a><i className="fa fa-trash-o" aria-hidden="true" ></i>&nbsp;Delete</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                        {/* <li><i className="fa fa-user-o "></i> {this.state.contractDetails.company.groupName}</li> */}
                                        <li><i className="fa fa-globe"></i> {this.state.contractDetails.company.companywebsite}</li>
                                        <li><i className="fa fa-envelope "></i> {this.state.contractDetails.company.companyEmail}</li>
                                        <li>GST: {this.state.contractDetails.company.location.GST}</li>
                                        <li>PAN: {this.state.contractDetails.company.location.PAN}</li>
                                    </ul>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                                        <h4>Location Details</h4>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                        <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                            <li> {this.state.contractDetails.company.location.locationType}</li>
                                            {/* <li> {this.state.contractDetails.company.location.addressLine1}</li>
                                            <li> {this.state.contractDetails.company.location.addressLine2}</li> */}
                                            <li> {this.state.contractDetails.company.location.area} {this.state.contractDetails.company.location.city}</li>
                                            <li> {this.state.contractDetails.company.location.district} {this.state.contractDetails.company.location.state} {this.state.contractDetails.company.location.country}</li>
                                        </ul>
                                    </div>

                                </div>

                                <div className="col-lg-11 col-md-12 col-sm-10 col-xs-10 listprofile nopadding">
                                    <h5 className="contractdetailht">{this.state.contractDetails.entity.companyName}</h5>
                                    <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                        <li><i className="fa fa-user-o "></i> {this.state.contractDetails.entity.groupName}</li>
                                        <li className="capitalize"><i className="fa fa-transgender"></i> Contract with :  {this.state.contractDetails.entity.entityType}</li>
                                        <li><i className="fa fa-globe"></i> {this.state.contractDetails.entity.website}</li>
                                        <li><i className="fa fa-envelope "></i> {this.state.contractDetails.entity.companyEmail}</li>
                                        <li>CIN: {this.state.contractDetails.entity.CIN}</li>
                                        <li>TAN: {this.state.contractDetails.entity.TAN}</li>
                                    </ul>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                                        <h4>Location Details</h4>
                                    </div>
                                    {
                                        this.state.contractDetails.entity.location ?
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                    <li> {this.state.contractDetails.entity.location.locationType}</li>
                                                    <li> {this.state.contractDetails.entity.location.addressLine1}</li>
                                                    <li> {this.state.contractDetails.entity.location.addressLine2}</li>
                                                    <li> {this.state.contractDetails.entity.location.area} {this.state.contractDetails.entity.location.city}</li>
                                                    <li> {this.state.contractDetails.entity.location.district} {this.state.contractDetails.entity.location.state} {this.state.contractDetails.entity.location.country}</li>
                                                </ul>
                                            </div>
                                            :
                                            null
                                    }
                                </div>
                            </div>
                            <br />
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-sm-12 NOpadding">
                                    <h4 className="MasterBudgetTitle">Packages</h4>
                                </div>
                                {
                                    this.state.contractDetails.packages && this.state.contractDetails.packages.length > 0 ?
                                        this.state.contractDetails.packages.map((data, index) => {
                                            return (
                                                <div key={index} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 detailBox marbtm30" key={index}>
                                                    <div className=" col-lg-1 col-md-1 col-sm-1 col-xs-1">
                                                        <i className="fa fa-database " aria-hidden="true"></i>
                                                    </div>
                                                    <ul className="col-lg-11 col-md-11 col-sm-11 col-xs-11 palfclr">
                                                        <li><b>Package :</b> {data.packageName}</li>
                                                        <li>Max Hours : {data.MaxHrs}</li>
                                                        <li>Max KM : {data.MaxKm}</li>
                                                        <li>Fix Charges : {data.fixCharges}</li>
                                                    </ul>
                                                    <ul className="col-lg-11 col-md-11 col-sm-11 col-xs-11 col-lg-offset-1 col-md-offset-1 col-sm-offset-1 col-xs-offset-1 palfclr">
                                                        <li>Night Charges (From Time) : {data.nightChargesFromTime}</li>
                                                        <li>Night Charges (To Time) : {data.nightChargesToTime}</li>
                                                        <li>Early Morning Charges (From Time) : {data.earlyMorningChargesFromTime}</li>
                                                        <li>Early Morning Charges (To Time) : {data.earlyMorningChargesToTime}</li>
                                                    </ul>
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-sm-12">
                                                        <table className="table ">
                                                            <thead className="">
                                                                <tr>
                                                                    <th></th>
                                                                    {
                                                                        data.extras && data.extras.length > 0 ?
                                                                            data.extras.map((a, i) => {
                                                                                return (
                                                                                    <th key={i} className="textAlignRight">{a.category}</th>
                                                                                );
                                                                            })
                                                                            :
                                                                            null
                                                                    }
                                                                </tr>
                                                            </thead>
                                                            <tbody className="packageList">
                                                                {this.state.attributeArray && this.state.attributeArray.length > 0 ?
                                                                    this.state.attributeArray.map((updata, index) => {
                                                                        return (
                                                                            <tr key={index}>
                                                                                <td>{updata.name}</td>
                                                                                {
                                                                                    data.extras && data.extras.length > 0 ?
                                                                                        data.extras.map((datas, i) => {
                                                                                            return (
                                                                                                Object.entries(datas).map(([key, value], j) => {
                                                                                                    if (updata.field == key) {
                                                                                                        return (
                                                                                                            <td key={j} className="textAlignRight">{datas[updata.field]}</td>
                                                                                                        );
                                                                                                    }
                                                                                                })
                                                                                            );
                                                                                        })
                                                                                        :
                                                                                        null
                                                                                }
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
                                            );
                                        })
                                        :
                                        <div className="textAlign">Packages will be shown here.</div>
                                }
                            </div>
                            <br />
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 listprofile">
                                <h5 className="contractdetailht">Terms and Conditions</h5>
                                {
                                    this.state.contractDetails.conditions ?
                                        <div dangerouslySetInnerHTML={{__html: this.state.contractDetails.conditions}}></div>
                                    :
                                    null
                                }
                            </div>
                        </div>
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
                : null
        );
    }
}
export default withRouter(Details); 