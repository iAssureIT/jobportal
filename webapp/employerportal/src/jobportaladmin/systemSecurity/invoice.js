import React, { Component }  from 'react';
import "./invoice.css";
import Axios from 'axios';
import { FontAwesomeIcon }   from '@fortawesome/react-fontawesome';


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
    return (
          <div className=" col-lg-12">
                <div className="row invoiceWrapper">
                    <div className="">
                        <div className="col-lg-6 invoiceLogoWrapper">
                            <div className=" row">
                                <div className="invoiceLogo col-lg-8">
                                    <img src="/images/1.png" className="invoiceLogoImg" alt="ijobs logo"/>
                                </div>
                                <div className="invoiceLogo2 col-lg-2">
                                </div>
                            </div>
                            <div className="row invoiceLogoText">
                                <div className="col-lg-8 col-lg-offset-1">
                                    <div className="col-lg-12 invoiceTOText">
                                        INVOICE TO
                                    </div>
                                    <div className="col-lg-12 invoiceNameText">
                                        John Doe
                                    </div>
                                    <div className="col-lg-12 invoiceTOText">
                                        H. R. Manager, ABC Company
                                    </div>
                                </div>
                                <div className="col-lg-8 col-lg-offset-1 invoicePersonalInfo">
                                    <div className="col-lg-12">
                                        <div className="row">
                                            <div className="col-lg-3 invoicePersonalInfoTitle">
                                                Mobile No 
                                            </div>
                                            <div className="col-lg-9 invoicePersonalInfoSubTitle">
                                                <span className="commaInvoice"> : </span>  +91 99233 93733
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-3 invoicePersonalInfoTitle">
                                                Email
                                            </div>
                                            <div className="col-lg-9 invoicePersonalInfoSubTitle">
                                                <span className="commaInvoice"> : </span> jhonedoe@abc.com
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-3 invoicePersonalInfoTitle">
                                                Address 
                                            </div>
                                            <div className="col-lg-9 invoicePersonalInfoSubTitle">
                                                <span className="commaInvoice"> : </span> 31/12/2021
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 invoiceLogoWrapper ">
                            <div className="col-lg-8 col-lg-offset-4">
                                <div className="col-lg-12 invoiceBigHeading">
                                    INVOICE 
                                </div>
                                <div className="col-lg-12">
                                    <div className="row">
                                        <div className="col-lg-4 invoicePersonalInfoTitle">
                                            Invoice No 
                                        </div>
                                        <div className="col-lg-8 invoicePersonalInfoSubTitle">
                                            <span className="commaInvoice"> : </span>  034567
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="row">
                                        <div className="col-lg-4 invoicePersonalInfoTitle">
                                            Start Date
                                        </div>
                                        <div className="col-lg-8 invoicePersonalInfoSubTitle">
                                            <span className="commaInvoice"> : </span>   01/01/2021
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="row">
                                        <div className="col-lg-4 invoicePersonalInfoTitle">
                                            End Date
                                        </div>
                                        <div className="col-lg-8 invoicePersonalInfoSubTitle">
                                            <span className="commaInvoice"> : </span>    31/12/2021
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
                                        <th  >SR.NO.</th>
                                        <th >ITEM DESCRIPTION </th>
                                        <th >PRICE</th>
                                        <th >QTY.</th>
                                        <th >TOTAL</th>
                                      </tr>
                                    </thead>
                                    <tbody className="invoiceTableBody ">
                                      <tr >
                                        <td>01</td>
                                        <td>Professional Package 12 Months</td>
                                        <td>₹ 1,200</td>
                                        <td>1</td>
                                        <td>₹ 1,200</td>
                                      </tr>
                                      <tr className="invoiceTableStriped">
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                      </tr>
                                      <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                      </tr>
                                      <tr className="invoiceTableStriped">
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                      </tr>
                                      <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                      </tr>
                                       <tr className="invoiceTableStriped">
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                      </tr>
                                    </tbody>
                                  </table>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="col-lg-6 featuresWrapper">
                            <div className="col-lg-10 col-lg-offset-1">
                                <div className="col-lg-12 featuresTitle">
                                    Features
                                </div>
                                <div className="col-lg-12 featuresPonits">
                                    <span className="selectPackageIcon1">
                                        <FontAwesomeIcon icon="plus-circle" />
                                    </span>
                                        Unlimited Jobs Publish   
                                </div>
                                <div className="col-lg-12 featuresPonits">
                                    <span className="selectPackageIcon1">
                                        <FontAwesomeIcon icon="plus-circle" />
                                    </span>
                                        999 Resumes Download    
                                </div>
                                <div className="col-lg-12 featuresPonits">
                                    <span className="selectPackageIcon1">
                                        <FontAwesomeIcon icon="plus-circle" />
                                    </span>
                                        9999 Max Emails    
                                </div>
                                <div className="col-lg-12 featuresPonits">
                                    <span className="selectPackageIcon1">
                                        <FontAwesomeIcon icon="plus-circle" />
                                    </span>
                                        999 Video Introduction  
                                </div>
                                <div className="col-lg-12 featuresPonits">
                                    <span className="selectPackageIcon1">
                                        <FontAwesomeIcon icon="plus-circle" />
                                    </span>
                                        0 Robot based screening Interview 
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 featuresWrapper">
                            <div className="col-lg-5 col-lg-offset-6">
                                <div className="row featuresBill">
                                    <div className="col-lg-6 invoicePersonalInfoTitle invoicePersonalInfoTitle2">
                                        Subtotal
                                    </div>
                                    <div className="col-lg-6 invoicePersonalInfoSubTitle invoicePersonalInfoSubTitle2">
                                        ₹ 1,200
                                    </div>
                                </div>
                                <div className="row featuresBill">
                                    <div className="col-lg-6 invoicePersonalInfoTitle invoicePersonalInfoTitle2">
                                        GST (18%)
                                    </div>
                                    <div className="col-lg-6 invoicePersonalInfoSubTitle invoicePersonalInfoSubTitle2">
                                        ₹ 108
                                    </div>
                                </div>
                                <div className="row featuresBill">
                                    <div className="col-lg-6 invoicePersonalInfoTitle invoicePersonalInfoTitle2">
                                        Total Tax
                                    </div>
                                    <div className="col-lg-6 invoicePersonalInfoSubTitle invoicePersonalInfoSubTitle2">
                                        ₹ 216
                                    </div>
                                </div>
                                <hr className="col-lg-10 featuresBillHr"/>
                                <div className="row featuresBill">
                                    <div className="col-lg-6 invoicePersonalInfoTitle invoicePersonalInfoTitle2">
                                        Grand Total
                                    </div>
                                    <div className="col-lg-6 invoicePersonalInfoSubTitle invoicePersonalInfoSubTitle2">
                                        ₹ 1416
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="col-lg-6 conditionWrapper">
                            <div className="col-lg-10 col-lg-offset-1">
                                <div className="col-lg-12 invoicePersonalInfoTitle invoiceConditionTitle">
                                   TRMS & CONDITIONS
                                </div>
                                <div className="col-lg-12 featuresPonits conditionPoints">
                                    <span className="selectPackageIcon2">
                                        <FontAwesomeIcon icon="square-full" />
                                    </span>
                                         Lorem ipsum dolor sit amet, consectetuer adipiscing elit
                                </div>
                                <div className="col-lg-12 featuresPonits conditionPoints">
                                    <span className="selectPackageIcon2">
                                        <FontAwesomeIcon icon="square-full" />
                                    </span>
                                         Lorem ipsum dolor sit amet, consectetuer adipiscing elit
                                </div>
                                <div className="col-lg-12 featuresPonits conditionPoints">
                                    <span className="selectPackageIcon2">
                                        <FontAwesomeIcon icon="square-full" />
                                    </span>
                                         Lorem ipsum dolor sit amet, consectetuer adipiscing elit
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 conditionWrapper">
                            <div className="col-lg-12">
                                 <button className="buttonNext  invoiceButtonNext col-lg-3 col-lg-offset-8" >
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
                            <div className="col-lg-10 col-lg-offset-1">
                                <div className="">
                                    <div className="col-lg-4">
                                        <div className="row">
                                            <div className="col-lg-2 invoiceFooterIcon">
                                                <FontAwesomeIcon icon="mobile-alt" />
                                            </div>
                                            <div className="col-lg-10 invoiceFooterLeft">
                                                <div className="invoiceFooterLeftText">
                                                    +91 99233 93733
                                                </div>
                                                <div className="invoiceFooterLeftText">
                                                    +91 99123 45618
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="row">
                                            <div className="col-lg-2 invoiceFooterIcon">
                                                <FontAwesomeIcon icon="envelope" />
                                            </div>
                                            <div className="col-lg-10 invoiceFooterLeft">
                                                <div className="invoiceFooterLeftText">
                                                    info@jobportal.com
                                                </div>
                                                <div className="invoiceFooterLeftText">
                                                    hr@jobportal.com
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="row">
                                            <div className="col-lg-2 invoiceFooterIcon">
                                                <FontAwesomeIcon icon="map-marker-alt" />
                                            </div>
                                            <div className="col-lg-10 invoiceFooterLeft">
                                                <div className="invoiceFooterLeftText">
                                                    # 303, World Trade Center
                                                </div>
                                                <div className="invoiceFooterLeftText">
                                                    Eon Free Zone, MIDC, Pune
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
     );
}

}
export default Invoice;