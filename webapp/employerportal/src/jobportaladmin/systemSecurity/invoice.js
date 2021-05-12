import React, { Component }  from 'react';
import "./invoice.css";
import Axios from 'axios';
import { FontAwesomeIcon }   from '@fortawesome/react-fontawesome';
import Moment                from 'moment';

class Invoice extends Component {
constructor() {
    super();
    this.state = {
        
        packagemasterArray  :[],
    }	
}	
componentDidMount(){
   Axios.get("/api/packagemaster/get/list")
        .then(response=>{
          console.log(response.data);
          this.setState({packagemasterArray : response.data});
        })
        .catch(error=>{
          console.log(error)
        })
}

render() {
    console.log(this.props.invoiceDetails)
    return (
        this.props.invoiceDetails ? 
          <div className="row">
                <div className=" col-lg-12 invoiceWrapper">
                    <div className="row">
                        <div className="col-lg-6 invoiceLogoWrapper">
                            <div className=" row">
                                <div className="invoiceLogo col-lg-10">
                                    <img src="/images/1.png" className="invoiceLogoImg" alt="ijobs logo"/>
                                </div>
                                <div className="invoiceLogo2 col-lg-2">
                                </div>
                            </div>
                            <div className="row invoiceLogoText">
                                <div className="col-lg-8 col-lg-offset-1">
                                    <div className=" invoiceTOText">
                                        INVOICE TO
                                    </div>
                                    <div className=" invoiceNameText">
                                        {this.props.invoiceDetails.createdBy ? this.props.invoiceDetails.createdBy.profile.fullName : ""}
                                    </div>
                                    <div className=" invoiceTOText">
                                    { this.props.invoiceDetails.company_id ? this.props.invoiceDetails.company_id.companyName : "" }
                                    </div>
                                </div>
                                <div className="col-lg-10 col-lg-offset-1 invoicePersonalInfo">
                                    <div className="">
                                        <div className="row">
                                            <div className="col-lg-4 invoicePersonalInfoTitle">
                                                Mobile No 
                                            </div>
                                            <div className="col-lg-8 invoicePersonalInfoSubTitle">
                                                <span className="commaInvoice"> : </span>  {this.props.invoiceDetails.createdBy ? this.props.invoiceDetails.createdBy.profile.mobile : ""}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-4 invoicePersonalInfoTitle">
                                                Email
                                            </div>
                                            <div className="col-lg-8 invoicePersonalInfoSubTitle">
                                                <span className="commaInvoice"> : </span> {this.props.invoiceDetails.createdBy ? this.props.invoiceDetails.createdBy.profile.email : ""}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-4 invoicePersonalInfoTitle">
                                                Address 
                                            </div>
                                            <div className="col-lg-8 invoicePersonalInfoSubTitle">
                                                <span className="commaInvoice"> : </span> 
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 invoiceLogoWrapper ">
                            <div className="col-lg-10 col-lg-offset-2">
                                <div className="col-lg-12 invoiceBigHeading">
                                    INVOICE 
                                </div>
                                <div className="col-lg-12">
                                    <div className="row">
                                        <div className="col-lg-5 invoicePersonalInfoTitle">
                                            Invoice No 
                                        </div>
                                        <div className="col-lg-7 invoicePersonalInfoSubTitle">
                                            <span className="commaInvoice"> : </span>  {this.props.invoiceDetails.invoiceNumber ? this.props.invoiceDetails.invoiceNumber : ""}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="row">
                                        <div className="col-lg-5 invoicePersonalInfoTitle">
                                            Start Date
                                        </div>
                                        <div className="col-lg-7 invoicePersonalInfoSubTitle">
                                            <span className="commaInvoice"> : </span> {Moment(this.props.invoiceDetails.startDate).format("DD-MM-YYYY")}  
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="row">
                                        <div className="col-lg-5 invoicePersonalInfoTitle">
                                            End Date
                                        </div>
                                        <div className="col-lg-7 invoicePersonalInfoSubTitle">
                                            <span className="commaInvoice"> : </span>    {Moment(this.props.invoiceDetails.endDate).format("DD-MM-YYYY")} 
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12 invoicePaymentHeading">
                                    Payment Method
                                </div>
                                <div className="col-lg-12">
                                    <div className="row">
                                        <div className="col-lg-12 invoicePersonalInfoTitle">
                                            Online Payment
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-10 col-lg-offset-1">
                            <div className="row">
                                <table className="table invoiceTable">
                                    <thead className="invoiceTableHead">
                                      <tr className="invoiceTableHeadRow">
                                        <th >ITEM DESCRIPTION </th>
                                        <th >PRICE</th>
                                        <th >TOTAL</th>
                                      </tr>
                                    </thead>
                                    <tbody className="invoiceTableBody invoiceTableStriped">
                                      <tr >
                                        <td>{this.props.invoiceDetails.package_id ? 
                                            this.props.invoiceDetails.package_id.packageName+" Package "+ this.props.invoiceDetails.package_id.validity + " Months " : "" } </td>
                                        <td>₹ {this.props.invoiceDetails.package_id ? this.props.invoiceDetails.package_id.price : ""}</td>
                                        <td>₹ {this.props.invoiceDetails.package_id ? this.props.invoiceDetails.package_id.price : ""}</td>
                                      </tr>
                                    </tbody>
                                  </table>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="col-lg-6 featuresWrapper">
                            <div className="col-lg-10 col-lg-offset-1">
                                <div className=" featuresTitle">
                                    Features
                                </div>
                                <div className=" featuresPonits">
                                    <span className="selectPackageIcon1">
                                        <FontAwesomeIcon icon="plus-circle" />
                                    </span>
                                        Unlimited Jobs Publish   
                                </div>
                                <div className=" featuresPonits">
                                    <span className="selectPackageIcon1">
                                        <FontAwesomeIcon icon="plus-circle" />
                                    </span>
                                        {this.props.invoiceDetails.package_id ? this.props.invoiceDetails.package_id.resumeDownloads : 999 } Resumes Download    
                                </div>
                                <div className=" featuresPonits">
                                    <span className="selectPackageIcon1">
                                        <FontAwesomeIcon icon="plus-circle" />
                                    </span>
                                        {this.props.invoiceDetails.package_id ? this.props.invoiceDetails.package_id.maxEmails : 999 } Max Emails    
                                </div>
                                <div className=" featuresPonits">
                                    <span className="selectPackageIcon1">
                                        <FontAwesomeIcon icon="plus-circle" />
                                    </span>
                                        {this.props.invoiceDetails.package_id ? this.props.invoiceDetails.package_id.videoIntroduction : 999 }  Video Introduction  
                                </div>
                                <div className=" featuresPonits">
                                    <span className="selectPackageIcon1">
                                        <FontAwesomeIcon icon="plus-circle" />
                                    </span>
                                        {this.props.invoiceDetails.package_id ? this.props.invoiceDetails.package_id.robotInterviews : 999 }  Robot based screening Interview 
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 featuresWrapper">
                            <div className="col-lg-8 col-lg-offset-3">
                                <div className="row featuresBill">
                                    <div className="col-lg-6 invoicePersonalInfoTitle invoicePersonalInfoTitle2">
                                        <div className="row">  Subtotal </div>
                                    </div>
                                    <div className="col-lg-6 invoicePersonalInfoSubTitle invoicePersonalInfoSubTitle2">
                                        ₹ {this.props.invoiceDetails.package_id ? this.props.invoiceDetails.package_id.price : 0}
                                    </div>
                                </div>
                                <div className="row featuresBill">
                                    <div className="col-lg-6 invoicePersonalInfoTitle invoicePersonalInfoTitle2">
                                       <div className="row">  GST (18%) </div>
                                    </div>
                                    <div className="col-lg-6 invoicePersonalInfoSubTitle invoicePersonalInfoSubTitle2">
                                        ₹ {this.props.invoiceDetails.package_id && this.state.orderDetails ? parseInt(((this.state.orderDetails.amountPaid)/100)*18) : 0}
                                    </div>
                                </div>
                                
                                <hr className="row featuresBillHr"/>
                                <div className="row featuresBill">

                                    <div className="col-lg-6 invoicePersonalInfoTitle invoicePersonalInfoTitle2">
                                        <div className="row"> Grand Total</div>
                                    </div>
                                    <div className="col-lg-6 invoicePersonalInfoSubTitle invoicePersonalInfoSubTitle2">
                                        ₹ 1416
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        {/*<div className="col-lg-6 conditionWrapper">
                            <div className="col-lg-10 col-lg-offset-1">
                                <div className=" invoicePersonalInfoTitle invoiceConditionTitle">
                                   TRMS & CONDITIONS
                                </div>
                                <div className=" featuresPonits conditionPoints">
                                    <span className="selectPackageIcon2">
                                        <FontAwesomeIcon icon="square-full" />
                                    </span>
                                         Lorem ipsum dolor sit amet, consectetuer adipiscing elit
                                </div>
                                <div className=" featuresPonits conditionPoints">
                                    <span className="selectPackageIcon2">
                                        <FontAwesomeIcon icon="square-full" />
                                    </span>
                                         Lorem ipsum dolor sit amet, consectetuer adipiscing elit
                                </div>
                                <div className=" featuresPonits conditionPoints">
                                    <span className="selectPackageIcon2">
                                        <FontAwesomeIcon icon="square-full" />
                                    </span>
                                         Lorem ipsum dolor sit amet, consectetuer adipiscing elit
                                </div>
                            </div>
                        </div>*/}
                        <div className="col-lg-offset-6 col-lg-6 conditionWrapper">
                            <div className="col-lg-12">
                                 <button className="buttonNext  invoiceButtonNext col-lg-6 col-lg-offset-5" >
                                     Make Payment
                                     <span className="invoiceButtonNextIcon">
                                        <FontAwesomeIcon icon="angle-double-right" />
                                    </span>
                                </button>
                            </div>
                        
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-8 invoiceFooterWrapper">
                            <div className="row">
                                <div className="col-lg-12">
                                <div className="row">
                                    <div className="col-lg-3">
                                        <div className="row">
                                            <div className="col-lg-1 invoiceFooterIcon">
                                                <FontAwesomeIcon icon="mobile-alt" />
                                            </div>
                                            <div className="col-lg-8 invoiceFooterLeft">
                                                <div className="row invoiceFooterLeftText">
                                                    +91 99233 93733
                                                </div>
                                                <div className="row invoiceFooterLeftText">
                                                    +91 99123 45618
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="row">
                                            <div className="col-lg-2 invoiceFooterIcon">
                                                <FontAwesomeIcon icon="envelope" />
                                            </div>
                                            <div className="col-lg-8 invoiceFooterLeft">
                                                <div className="row invoiceFooterLeftText">
                                                    info@jobportal.com
                                                </div>
                                                <div className="row invoiceFooterLeftText">
                                                    hr@jobportal.com
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="">
                                            <div className="col-lg-2 invoiceFooterIcon">
                                                <FontAwesomeIcon icon="map-marker-alt" />
                                            </div>
                                            <div className="col-lg-9 invoiceFooterLeft">
                                                <div className="row invoiceFooterLeftText">
                                                    # 303, World Trade Center
                                                </div>
                                                <div className="row invoiceFooterLeftText">
                                                    Eon Free Zone, MIDC, Pune
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 invoiceFooterWrapper2">
                        </div>
                    </div>
                </div>
          </div>
          : null
     );
}

}
export default Invoice;