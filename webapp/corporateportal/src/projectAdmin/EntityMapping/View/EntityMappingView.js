import React, { Component } from 'react';
import $ from 'jquery';
import CKEditor from "react-ckeditor-component";
import jQuery from 'jquery';
import axios from 'axios';
import swal from 'sweetalert';
import _ from 'underscore';
import 'bootstrap/js/tab.js';
import 'react-phone-input-2/lib/style.css';
import moment from 'moment';

class Viewcontract extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "pathname": this.props.match.params.entity,
            "contractDetails" : {}
        };
    }
    componentDidMount() {
        this.getContract();
        this.setState({
            mappingID: this.props.match.params.mappingID
        })
        window.scrollTo(0, 0);
    }
    componentWillUnmount() {
        $("script[src='/js/adminLte.js']").remove();
        $("link[href='/css/dashboard.css']").remove();
    }
    componentWillReceiveProps(nextProps) {
    }
    getContract() {
        axios.get("/api/entitymapping/get/joinentities/" + this.props.match.params.mappingID)
            .then((response) => {
                console.log('response', response.data);
                var contractDetails = response.data[0];
                var corporateLocation = response.data[0].corporate.locations.filter((a, i)=>a._id === contractDetails.corporateLocationId);
                contractDetails.corporate.location = corporateLocation[0];

                console.log('contractDetails', contractDetails);
                this.setState({
                    contractDetails: contractDetails
                })
            })
            .catch((error) => {

            })
    }
    render() {
        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <section className="content">
                            <div className="pageContent col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
                                    <h4 className="weighttitle col-lg-11 col-md-11 col-xs-11 col-sm-11 NOpadding-right">Map Corporate and Vendor</h4>
                                </div>
                                <div className="nav-center OnboardingTabs col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                    <ul className="nav nav-pills vendorpills col-lg-6 col-lg-offset-3 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                        <li className="col-lg-6 col-md-6 col-sm-12 col-xs-12 transactionTab pdcls pdclsOne btn1 NOpadding-left disabled">
                                            <a href={"/entity-mapping"} className="basic-info-pillss pills backcolor">
                                                <i className="fa fa-file" aria-hidden="true"></i> &nbsp;
                                                Contract
                                            </a>
                                            <div className="trianglethree forActive" id="triangle-right"></div>
                                        </li>
                                        
                                        <li className="active col-lg-6 col-md-6 col-sm-12 col-xs-12 transactionTab noRightPadding pdcls btn4 disabled">
                                            <div className="trianglesix" id="triangle-right2"></div>
                                            <a href={this.props.match.params.mappingID ? "/viewmapping/"+this.props.match.params.mappingID : "/viewmapping"} className="basic-info-pillss backcolor">
                                                <i className="fa fa-eye iconMarginLeft" aria-hidden="true"></i> &nbsp;
                                                View
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <section className="Content">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                <div className="companyinfo col-lg-12 col-md-12 col-sm-12 col-xs-12">CORPORATE INFORMATION</div>
                                                    {
                                                        this.state.contractDetails.corporate ?
                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 detailBox marbtm30">
                                                                <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 detailBoxImg" style={{ "backgroundImage": `url(` + this.state.contractDetails.corporate.companyLogo + `)` }}></div>
                                                                <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12">
                                                                    <h5 className="detailtitle">{this.state.contractDetails.corporate.companyName}</h5>
                                                                    <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                        <li><i className="fa fa-user-o "></i> {this.state.contractDetails.corporate.groupName}</li>
                                                                        <li><i className="fa fa-globe"></i> {this.state.contractDetails.corporate.website}</li>
                                                                        <li><i className="fa fa-envelope "></i> {this.state.contractDetails.corporate.companyEmail}</li>
                                                                        <li>CIN: {this.state.contractDetails.corporate.CIN}</li>
                                                                        <li>TAN: {this.state.contractDetails.corporate.TAN}</li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            :
                                                            null
                                                    }
                                                    {
                                                        this.state.contractDetails.corporate && this.state.contractDetails.corporate.location ?
                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 detailBox">
                                                                <div className="col-lg-1 col-md-1 col-sm-12 col-xs-12 mapIconMargin">
                                                                    <i className="fa fa-map-marker addressIcon"></i>
                                                                </div>
                                                                <div className="col-lg-6 col-md-1 col-sm-12 col-xs-12">
                                                                    <h4>Location Details</h4>
                                                                </div>
                                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                    <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                        <li> {this.state.contractDetails.corporate.location.locationType}</li>
                                                                        <li> {this.state.contractDetails.corporate.location.addressLine1}</li>
                                                                        <li> {this.state.contractDetails.corporate.location.addressLine2}</li>
                                                                        <li> {this.state.contractDetails.corporate.location.area} {this.state.contractDetails.corporate.location.city}</li>
                                                                        <li> {this.state.contractDetails.corporate.location.district} {this.state.contractDetails.corporate.location.state} {this.state.contractDetails.corporate.location.country}</li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            :
                                                            null
                                                    }
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                <div className="companyinfo col-lg-12 col-md-12 col-sm-12 col-xs-12">VENDOR INFORMATION</div>
                                                    {
                                                        this.state.contractDetails.vendor && this.state.contractDetails.vendor.length >0 ?
                                                            this.state.contractDetails.vendor.map((data, i)=>{
                                                                return(
                                                                    <div key={i} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 detailBox marbtm30">
                                                                        <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 detailBoxImg" style={{ "backgroundImage": `url(` + this.state.contractDetails.vendor.companyLogo + `)` }}></div>
                                                                        <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12">
                                                                            <h5 className="detailtitle">{data.companyName}</h5>
                                                                            <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                                <li><i className="fa fa-user-o "></i> {data.groupName}</li>
                                                                                <li><i className="fa fa-globe"></i> {data.website}</li>
                                                                                <li><i className="fa fa-envelope "></i> {data.companyEmail}</li>
                                                                                <li>CIN: {data.CIN}</li>
                                                                                <li>TAN: {data.TAN}</li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })
                                                            :
                                                            null
                                                    }
                                                </div>
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
export default Viewcontract;