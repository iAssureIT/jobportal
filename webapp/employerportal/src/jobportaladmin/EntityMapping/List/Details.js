import React, { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import _ from 'underscore';
import 'bootstrap/js/tab.js';
class Details extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: '',
            loadMore: false,
            loadless: false,
            "attributeArray": [
                {
                    name: 'Extra Hrs',
                    field: 'extraHours',
                    type: 'number',
                    max: 24
                },
                {
                    name: 'Extra Km',
                    field: 'extraKM',
                    type: 'number',
                    max: 1000
                },
                {
                    name: 'Grace Hrs',
                    field: 'graceHours',
                    type: 'number',
                    max: 24
                },
                {
                    name: 'Grace KM',
                    field: 'graceKM',
                    type: 'number',
                    max: 1000
                },
                {
                    name: 'Driver Allowance',
                    field: 'driverAllowance',
                    type: 'number',
                    max: 10000
                },
                {
                    name: 'Night Charges',
                    field: 'nightCharges',
                    type: 'number',
                    max: 1000
                },
                {
                    name: 'Night Charges (From Time)',
                    field: 'nightChargesFromTime',
                    type: 'time',
                    max: 24
                },
                {
                    name: 'Night Charges (ToTime)',
                    field: 'nightChargesToTime',
                    type: 'time',
                    max: 24
                },
                {
                    name: 'Night Charges Day',
                    field: 'nightChargesDay',
                    type: 'text',
                    // max  : 10000000
                },
                {
                    name: 'Early Morning Charges',
                    field: 'earlyMorningCharges',
                    type: 'number',
                    max: 10000
                },
                {
                    name: 'Early Morning Charges (FromTime)',
                    field: 'earlyMorningChargesFromTime',
                    type: 'time',
                    max: 24
                },
                {
                    name: 'Early Morning Charges (ToTime)',
                    field: 'earlyMorningChargesToTime',
                    type: 'time',
                    max: 24
                }],
        };
        // this.handleChange = this.handleChange.bind(this);
        this.isLoaded = false
    }
    componentWillReceiveProps(nextProps) {
        console.log("nextProps", nextProps.id)
        this.setState({
            id: nextProps.id
        }, () => {
            this.getJoinContract(nextProps.id);
        })
    }
    getJoinContract(id) {
        axios.get("/api/entitymapping/get/joinentities/" + id)
            .then((response) => {
                console.log('data', response.data)
                var contractDetails = response.data[0];
                // var vendorLocation = response.data[0].vendor.locations.filter((a, i)=>a._id === contractDetails.vendorLocationId);
                // contractDetails.vendor.location = vendorLocation[0];

                var corporateLocation = response.data[0].corporate.locations.filter((a, i) => a._id === contractDetails.corporateLocationId);
                contractDetails.corporate.location = corporateLocation[0];

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
            this.getJoinContract(this.props.id);
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
        this.props.history.push("/entity-mapping/" + event.currentTarget.getAttribute('data-id'))
    }
    deleteEntity(event) {
        event.preventDefault();
        console.log(event.currentTarget.getAttribute('data-id'))
        this.setState({ deleteID: event.currentTarget.getAttribute('data-id') })
        $('#deleteEntityModal').show();
    }
    confirmDelete(event) {
        event.preventDefault();
        axios.delete("/api/entitymapping/delete/" + this.state.deleteID)
            .then((response) => {
                console.log(response.data.deleted)
                if (response.data.deleted) {
                    swal({
                        text: "Data is deleted successfully.",
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
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 vendorListTitle">Corporate Details</div>
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
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-10 listprofile ">
                                    <h5 className="detailtitleentity">{this.state.contractDetails.corporate.companyName}</h5>
                                    
                                    <ul className="col-lg-11 col-md-11 col-sm-11 col-xs-11 NOpadding">
                                        <li><i className="fa fa-user-o "></i> {this.state.contractDetails.corporate.groupName}</li>
                                        <li><i className="fa fa-globe"></i> {this.state.contractDetails.corporate.website}</li>
                                        <li><i className="fa fa-envelope "></i> {this.state.contractDetails.corporate.companyEmail}</li>
                                        <li>CIN: {this.state.contractDetails.corporate.CIN}</li>
                                        <li>TAN: {this.state.contractDetails.corporate.TAN}</li>
                                    </ul>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 vendorListTitle">Vendor Details</div>
                                {
                                    this.state.contractDetails.vendor && this.state.contractDetails.vendor.length ?
                                        this.state.contractDetails.vendor.map((data, i) => {
                                            return (
                                                <div key={i} className="col-lg-12 col-md-10 col-sm-10 col-xs-10 listprofile">
                                                    <h5 className="detailtitleentity">{data.companyName}</h5>
                                                    <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                        <li><i className="fa fa-user-o "></i> {data.groupName}</li>
                                                        <li><i className="fa fa-globe"></i> {data.website}</li>
                                                        <li><i className="fa fa-envelope "></i> {data.companyEmail}</li>
                                                        <li>CIN: {data.CIN}</li>
                                                        <li>TAN: {data.TAN}</li>
                                                    </ul>
                                                </div>
                                            );
                                        })
                                        :
                                        null
                                }

                            </div>
                            <br />

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
