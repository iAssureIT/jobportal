import React, { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';
import _ from 'underscore';
import 'bootstrap/js/tab.js';
import 'react-phone-input-2/lib/style.css';
import './Viewcontract.css';
class Viewcontract extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "pathname": this.props.match.params.entity,
            "selectedCorporate": {},
            "selectedCorporateLocation": {},
            "selectedVendor": {},
            "selectedVendorLocation": {},
            "contractDetails": [],
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
                }],
        };

    }
    componentDidMount() {
        this.getContract();
        this.setState({
            contractID: this.props.match.params.contractID
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
        axios.get("/api/contract/get/joincontract/" + this.props.match.params.contractID)
            .then((response) => {
                console.log('joincontract', response.data)
                var contractDetails = response.data[0];
                console.log('contractDetails', contractDetails.entity.locations);
                var entityLocation = response.data[0].entity.locations.filter((a, i) => response.data[0].entityLocationId.includes(a._id));
                console.log('entityLocation', entityLocation);
                contractDetails.entity.location = entityLocation;

                var companyLocation = response.data[0].company.companyLocationsInfo.filter((a, i) => a._id == contractDetails.companyLocationId);
                contractDetails.company.location = companyLocation[0];


                this.setState({
                    contractDetails: contractDetails
                })
            })
            .catch((error) => {

            })
    }
    download(event) {
        event.preventDefault();
        $('#headerid').hide();


        $('#sidebar').toggleClass('active')
        $('#headerid').toggleClass('headereffect');
        $('#dashbordid').toggleClass('dashboardeffect')
        var sideBar = $("#sidebar").hasClass("active")
        localStorage.setItem('sideBar', sideBar);
        $('#sidebar').hide();
        $('#widgets').hide();
        $('#printButton').hide();
        // document.getElementById("viewcontract").scale(2, 2);
        
        window.print();

        $('#headerid').show();
        $('#sidebar').toggleClass('active')
        $('#headerid').toggleClass('headereffect');
        $('#dashbordid').toggleClass('dashboardeffect')
        var sideBar = $("#sidebar").hasClass("active")
        localStorage.setItem('sideBar', sideBar);
        $('#sidebar').show();
        $('#widgets').show();
        $('#printButton').show();
    }
    openNav() {
        document.getElementById("mySidenav").style.width = "250px";
    }

    closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }
    back(event) {
		event.preventDefault();
		var contractID = this.props.match.params.contractID;
		this.props.history.push("/condition/" + contractID);
    }
    render() {
        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <section className="content">
                            <div className="pageContent col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="box-header with-border col-lg-12 col-md-12 col-xs-10 col-sm-10 NOpadding-right">
                                    <h4 className="weighttitle col-lg-11 col-md-11 col-xs-11 col-sm-11 NOpadding-right">Contract Management</h4>
                                    <i id="printButton" onClick={this.download.bind(this)} className="fa fa-download pull-right downloadicon"></i>
                                </div>
                                <div id="widgets" className="nav-center OnboardingTabs col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                    <ul className="nav nav-pills vendorpills col-lg-8 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                        <li className="col-lg-3 col-md-2 col-sm-12 col-xs-12 transactionTab pdcls pdclsOne btn1 NOpadding-left disabled">
                                            <a href={"/contract-management/" + this.props.match.params.contractID} className="basic-info-pillss pills backcolor">
                                                <i className="fa fa-file" aria-hidden="true"></i> &nbsp;
                                                Contract
</a>
                                            <div className="trianglethree forActive" id="triangle-right"></div>
                                        </li>
                                        <li className="col-lg-3 col-md-2 col-sm-12 col-xs-12 transactionTab pdcls pdclsOne btn1 disabled">
                                            <div className="triangletwo" id="triangle-right1"></div>
                                            <a href={"/package-details/" + this.props.match.params.contractID} className="basic-info-pillss backcolor">
                                                <i className="fa fa-archive iconMarginLeft" aria-hidden="true"></i> &nbsp;
                                                Packages
</a>
                                            <div className="triangleone " id="triangle-right"></div>
                                        </li>

                                        <li className=" col-lg-3 col-md-2 col-sm-12 col-xs-12 transactionTab pdcls pdclsOne btn1 disabled">
                                            <div className="triangletwo" id="triangle-right1"></div>
                                            <a href={"/condition/" + this.props.match.params.contractID} className="basic-info-pillss pills backcolor">
                                                <i className="fa fa-paste iconMarginLeft" aria-hidden="true"></i>&nbsp;
                                                Conditions
</a>
                                            <div className="triangleone" id="triangle-right"></div>
                                        </li>
                                        <li className="active col-lg-3 col-md-2 col-sm-12 col-xs-12 transactionTab noRightPadding pdcls btn4 disabled">
                                            <div className="trianglesix" id="triangle-right2"></div>
                                            <a href={"/viewcontract/" + this.props.match.params.contractID} className="basic-info-pillss backcolor">
                                                <i className="fa fa-eye iconMarginLeft" aria-hidden="true"></i> &nbsp;
                                                View
</a>
                                        </li>
                                    </ul>
                                </div>
                                <section className="Content">
                                    <div className="row">
                                        <div id="viewcontract" className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                    {
                                                        this.state.contractDetails.company ?
                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 detailBox marbtm30">
                                                                <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 detailBoxImg" style={{ "backgroundImage": `url(` + (this.state.contractDetails.company.companyLogo ? this.state.contractDetails.company.companyLogo : "/images/logonotfound.jpg") + `)` }}></div>
                                                                <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12">
                                                                    <h5 className="detailtitle">{this.state.contractDetails.company.companyName}</h5>
                                                                    <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                        <li><i className="fa fa-globe"></i> {this.state.contractDetails.company.companywebsite}</li>
                                                                        <li><i className="fa fa-envelope "></i> {this.state.contractDetails.company.companyEmail}</li>
                                                                        {/* <li>CIN: {this.state.contractDetails.company.CIN}</li>
                                                                        <li>TAN: {this.state.contractDetails.company.TAN}</li> */}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            :
                                                            null
                                                    }
                                                    {
                                                        this.state.contractDetails.company && this.state.contractDetails.company.location ?
                                                            
                                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 detailBox marbtm30">
                                                                    <div className="col-lg-1 col-md-1 col-sm-12 col-xs-12 mapIconMargin">
                                                                        <i className="fa fa-map-marker addressIcon"></i>
                                                                    </div>
                                                                    <div className="col-lg-6 col-md-1 col-sm-12 col-xs-12">
                                                                        <h4>Location Details</h4>
                                                                    </div>
                                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                        <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                            <li> {this.state.contractDetails.company.location.locationType}</li>
                                                                            <li> {this.state.contractDetails.company.location.addressLine1}</li>
                                                                            <li> {this.state.contractDetails.company.location.addressLine2}</li>
                                                                            <li> {this.state.contractDetails.company.location.area} {this.state.contractDetails.company.location.city}</li>
                                                                            <li> {this.state.contractDetails.company.location.district} {this.state.contractDetails.company.location.state} {this.state.selectedCorporateLocation.country}</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            :
                                                            null
                                                    }
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                    {
                                                        this.state.contractDetails.entity ?
                                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 detailBox marbtm30">
                                                                    <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 detailBoxImg" style={{ "backgroundImage": `url(` + (this.state.contractDetails.entity.companyLogo ? this.state.contractDetails.entity.companyLogo : "/images/logonotfound.jpg") + `)` }}></div>
                                                                    <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12">
                                                                        <h5 className="detailtitle">{this.state.contractDetails.entity.companyName}</h5>
                                                                        <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                            <li><i className="fa fa-user-o "></i> {this.state.contractDetails.entity.groupName}</li>
                                                                            <li><i className="fa fa-globe"></i> {this.state.contractDetails.entity.website}</li>
                                                                            <li><i className="fa fa-envelope "></i> {this.state.contractDetails.entity.companyEmail}</li>
                                                                            <li>CIN: {this.state.contractDetails.entity.CIN}</li>
                                                                            <li>TAN: {this.state.contractDetails.entity.TAN}</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            :
                                                            null
                                                    }
                                                    {
                                                        this.state.contractDetails.entity && this.state.contractDetails.entity.location ?
                                                            this.state.contractDetails.entity.location.map((data, i) => {
                                                                return (
                                                                        <div key={data._id} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 detailBox marbtm30">
                                                                            <div className="col-lg-1 col-md-1 col-sm-12 col-xs-12 mapIconMargin">
                                                                                <i className="fa fa-map-marker addressIcon"></i>
                                                                            </div>
                                                                            <div className="col-lg-6 col-md-1 col-sm-12 col-xs-12">
                                                                                <h4>Location Details</h4>
                                                                            </div>
                                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                                <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                                    <li> {data.locationType}</li>
                                                                                    <li> {data.addressLine1}</li>
                                                                                    <li> {data.addressLine2}</li>
                                                                                    <li> {data.area} {data.city}</li>
                                                                                    <li> {data.district} {data.state} {data.country}</li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                );
                                                            })
                                                            :
                                                            null
                                                    }
                                                </div>
                                                {
                                                    this.state.contractDetails.packages && this.state.contractDetails.packages.length > 0 ?
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-sm-12 NOpadding">
                                                            <h4 className="MasterBudgetTitle">Packages</h4>
                                                        </div>
                                                        
                                                            {this.state.contractDetails.packages.map((data, index) => {
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
                                                            })}
                                                            
                                                    </div>
                                                    :
                                                    <div className="textAlign">Contract will be shown here.</div>
                                                }
                                                    
                                                {
                                                    this.state.contractDetails.conditions ?
                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-sm-12 NOpadding">
                                                                <h4 className="MasterBudgetTitle">Terms & Condition</h4>
                                                            </div>
                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 detailBox marbtm30">
                                                                <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1">
                                                                    <i className="fa fa-file" aria-hidden="true"></i>
                                                                </div>
                                                                <ul className="col-lg-11 col-md-11 col-sm-11 col-xs-11 palfclr">
                                                                    <li dangerouslySetInnerHTML={{ '__html': this.state.contractDetails.conditions }}></li>
                                                                </ul>

                                                            </div>
                                                        </div>
                                                        :
                                                        null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <button className="button2 btn" onClick={this.back.bind(this)}><i className="fa fa-angle-double-left" aria-hidden="true"></i>&nbsp;Conditions</button>
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