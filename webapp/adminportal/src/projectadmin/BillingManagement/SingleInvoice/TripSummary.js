import React, { Component } from 'react';
import moment               from 'moment';
import InvoiceView          from './InvoiceView.js';
import TripExpenses         from './TripExpenses.js';
import Tracking             from './Map.js';

import 'bootstrap/js/tab.js';

function TripSummary(props){
  console.log("in trip = ",props.invoiceData.invoiceDetails.routeDetails);
  return (
    <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
     	<section className="Content">
     	 	<div className="row">
     	 		<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
     	 			<div className="invoicePageWrapper NOpadding col-lg-12 col-md-12 col-xs-12 col-sm-12">
     	 				<div className="box-header with-border invoice-title">
          			<h4 className="invoiceTitle">Trip Summary</h4>
          		</div>
          		<div className="box-body col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding">	
        				{
                  props.invoiceData.invoiceDetails
                  ?
                    <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 marginStyle"> 
              				<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                        <table className="tripSummaryTable">
                          <tbody>
                            <tr>
                              <td colSpan="10" className="bookingId">
                                <span className="attributeHeading bookingId">Booking Id : </span>
                                {props.invoiceData.invoiceDetails.bookingId ? props.invoiceData.invoiceDetails.bookingId : ""}
                              </td>
                            </tr>
                            <tr>
                              <td rowSpan="" colSpan="2" className="attributeHeading">Booking Given By </td>
                              {/*<td colSpan="8">
                                <span className="attributeHeading">Company : </span> 
                                {props.invoiceData.invoiceDetails.employeeDetails.companyName ? props.invoiceData.invoiceDetails.employeeDetails.companyName + " " : ""}
                                <span className="ids">(<b> Company ID :</b> {props.invoiceData.invoiceDetails.employeeDetails.companyID ? props.invoiceData.invoiceDetails.employeeDetails.companyID + " " : ""}) </span>
                              </td>
                            </tr>
                            <tr>*/}
                              <td colSpan="4">
                                <span className="attributeHeading">Employee Name : </span>
                                {(props.invoiceData.invoiceDetails.employeeDetails.firstName ? props.invoiceData.invoiceDetails.employeeDetails.firstName + " "  : "") +
                                 (props.invoiceData.invoiceDetails.employeeDetails.middleName ? props.invoiceData.invoiceDetails.employeeDetails.middleName + " " : "") +
                                 (props.invoiceData.invoiceDetails.employeeDetails.lastName ? props.invoiceData.invoiceDetails.employeeDetails.lastName + " " : "")
                                } <span className="ids">(<b> Employee ID :</b> {props.invoiceData.invoiceDetails.employeeDetails.employeeId ? props.invoiceData.invoiceDetails.employeeDetails.employeeId + " " : ""}) </span>
                              </td>
                              <td colSpan="2">
                                <span className="attributeHeading">Department : </span>
                                {props.invoiceData.invoiceDetails.employeeDetails.department ? props.invoiceData.invoiceDetails.employeeDetails.department : ""}
                              </td>
                              <td colSpan="2">
                                <span className="attributeHeading">Designation : </span>
                                {props.invoiceData.invoiceDetails.employeeDetails.designation ? props.invoiceData.invoiceDetails.employeeDetails.designation : ""}
                              </td>
                            </tr>
                            <tr>
                              <td colSpan="2" className="attributeHeading">Car Details </td>
                              <td colSpan="4">
                                {props.invoiceData.invoiceDetails.vehicleDetails.category + " - " +
                                props.invoiceData.invoiceDetails.vehicleDetails.vehiclecolor + " Color - " + 
                                props.invoiceData.invoiceDetails.vehicleDetails.brand + " - " +
                                props.invoiceData.invoiceDetails.vehicleDetails.model + " - " }
                                <span style={{fontWeight : "500"}}>{props.invoiceData.invoiceDetails.vehicleDetails.vehicleNumber} </span>
                                
                              </td>
                            {/*</tr>
                            <tr>
                              <td colSpan="2"><span className="attributeHeading">Driver Details </span></td>*/}
                              <td colSpan="4"><span className="attributeHeading">Driver Details : </span>{(props.invoiceData.invoiceDetails.driver && props.invoiceData.invoiceDetails.driver.firstName ? props.invoiceData.invoiceDetails.driver.firstName + " "  : "") +
                                (props.invoiceData.invoiceDetails.driver && props.invoiceData.invoiceDetails.driver.middleName ? props.invoiceData.invoiceDetails.driver.middleName + " " : "") +
                                (props.invoiceData.invoiceDetails.driver && props.invoiceData.invoiceDetails.driver.lastName ? props.invoiceData.invoiceDetails.driver.lastName + " " : "")
                                } <span className="ids">(<b> Contact Number :</b> {props.invoiceData.invoiceDetails.driver && props.invoiceData.invoiceDetails.driver.contactNo ? props.invoiceData.invoiceDetails.driver.contactNo + " " : ""}) </span>
                              </td>
                            </tr>
                            <tr>
                              <td rowSpan="3" colSpan="2"><span className="attributeHeading">Package Details </span></td>                         
                              <td colSpan="2">
                                <span className="attributeHeading">Package Type : </span>
                                {props.invoiceData.invoiceDetails.appliedPackage[0].packageType ? props.invoiceData.invoiceDetails.appliedPackage[0].packageType : ""}
                              </td>                          
                              <td colSpan="2">
                                <span className="attributeHeading">Package Name : </span>
                                {props.invoiceData.invoiceDetails.appliedPackage[0].packageName ? props.invoiceData.invoiceDetails.appliedPackage[0].packageName : ""}
                              </td>                          
                              <td colSpan="2">
                                <span className="attributeHeading">Car Category : </span>
                                {props.invoiceData.invoiceDetails.appliedPackage[0].carCategory ? props.invoiceData.invoiceDetails.appliedPackage[0].carCategory : ""}
                              </td> 
                              <td colSpan="2">
                                <span className="attributeHeading">City Class : </span>
                                {props.invoiceData.invoiceDetails.appliedPackage[0].cityClass ? props.invoiceData.invoiceDetails.appliedPackage[0].cityClass : ""}
                              </td>
                            </tr>
                            <tr>
                              <td className="attributeHeading">Fixed Charges</td>
                              <td className="attributeHeading">Min Hrs/Day</td>
                              <td className="attributeHeading">Min Kms/Day</td>
                              <td className="attributeHeading">Charges/Hr</td>
                              <td className="attributeHeading">Charges/Km</td>
                              <td className="attributeHeading">Night Halt Charges</td>
                              <td className="attributeHeading">Night Charges</td>
                              <td className="attributeHeading">Early Morning Charges</td>
                            </tr>
                            <tr>                          
                              <td><i className="fa fa-inr faIcon"></i> &nbsp;{props.invoiceData.invoiceDetails.appliedPackage[0].fixCharges ? props.invoiceData.invoiceDetails.appliedPackage[0].fixCharges : ""}</td>                          
                              <td>{props.invoiceData.invoiceDetails.appliedPackage[0].maxHours ? props.invoiceData.invoiceDetails.appliedPackage[0].maxHours + " Hrs" : ""}</td>                          
                              <td>{props.invoiceData.invoiceDetails.appliedPackage[0].maxKm ? props.invoiceData.invoiceDetails.appliedPackage[0].maxKm + " Kms" : ""}</td>                          
                              <td><i className="fa fa-inr faIcon"></i> &nbsp;{props.invoiceData.invoiceDetails.appliedPackage[0].extraHr ? props.invoiceData.invoiceDetails.appliedPackage[0].extraHr : 0}</td>                          
                              <td><i className="fa fa-inr faIcon"></i> &nbsp;{props.invoiceData.invoiceDetails.appliedPackage[0].extraKms ? props.invoiceData.invoiceDetails.appliedPackage[0].extraKms : 0}</td>                          
                              <td><i className="fa fa-inr faIcon"></i> &nbsp;{props.invoiceData.invoiceDetails.appliedPackage[0].nightHalt ? props.invoiceData.invoiceDetails.appliedPackage[0].nightHalt : 0}</td>                          
                              <td><i className="fa fa-inr faIcon"></i> &nbsp;{props.invoiceData.invoiceDetails.appliedPackage[0].nightCharges ? props.invoiceData.invoiceDetails.appliedPackage[0].nightCharges : 0}</td>                          
                              <td><i className="fa fa-inr faIcon"></i> &nbsp;{props.invoiceData.invoiceDetails.appliedPackage[0].morningCharges ? props.invoiceData.invoiceDetails.appliedPackage[0].morningCharges : 0}</td>                          
                            </tr>
                            <tr>
                              <td colSpan="10" className="attributeHeading text-center">Travel Details</td>
                            </tr>
                            <tr>
                              <td colSpan="2"></td>
                              <td colSpan="2" className="attributeHeading text-center">Date and Time</td>
                              <td colSpan="2" className="attributeHeading text-center">Odometer Reading</td>
                              <td colSpan="4" className="attributeHeading text-center">Kms and Hours</td>
                            </tr>
                            {/*props.invoiceData.invoiceDetails.travelDetails
                              ? <span> */}                         
                                <tr>
                                  <td colSpan="2">
                                    <span className="attributeHeading">
                                      {props.invoiceData.invoiceDetails.travelDetails.startFromGarage ? "Garage Start" : "" }
                                    </span>
                                  </td>
                                  <td colSpan="2" className="right-text">
                                    {/*<span className="attributeHeading">Date : </span>*/}{props.invoiceData.invoiceDetails.travelDetails.startFromGarage ? moment(new Date(props.invoiceData.invoiceDetails.travelDetails.startFromGarage.dateTime)).format("DD-MM-YYYY") + ", " : ""}
                                    {/*<span className="attributeHeading">Time : </span>*/}{props.invoiceData.invoiceDetails.travelDetails.startFromGarage ? moment(new Date(props.invoiceData.invoiceDetails.travelDetails.startFromGarage.dateTime)).format("HH:mm") : ""}
                                  </td>
                                  <td colSpan="2" className="right-text">{props.invoiceData.invoiceDetails.travelDetails.startFromGarage.odometerReading}</td>
                                  <td colSpan="2" className="right-text">
                                    <span className="attributeHeading">Total Hr : &nbsp;</span>
                                    {props.invoiceData.invoiceDetails.travelDetails.totalHrs ? 
                                      props.invoiceData.invoiceDetails.travelDetails.totalHrs.split(":")[0] + " Hours " + 
                                      props.invoiceData.invoiceDetails.travelDetails.totalHrs.split(":")[1] + " Minutes"  : null }
                                  </td>
                                  <td colSpan="2" className="right-text">
                                    <span className="attributeHeading">Total Kms : &nbsp;</span>
                                    {props.invoiceData.invoiceDetails.travelDetails.totalKms ? props.invoiceData.invoiceDetails.travelDetails.totalKms : null }
                                    {props.invoiceData.invoiceDetails.travelDetails.totalKms > 1 ? " Kms" : " Km" }
                                  </td>
                                </tr>                          
                                <tr>
                                  <td colSpan="2">
                                    <span className="attributeHeading">
                                      {props.invoiceData.invoiceDetails.travelDetails.startFromGarage ? "Start From Pickup" : ""}
                                    </span>
                                  </td>
                                  <td colSpan="2" className="right-text">
                                    {/*<span className="attributeHeading">Date : </span>*/}{props.invoiceData.invoiceDetails.travelDetails.startFromPickup ? moment(new Date(props.invoiceData.invoiceDetails.travelDetails.startFromPickup.dateTime)).format("DD-MM-YYYY") + ", " : ""}
                                    {/*<span className="attributeHeading">Time : </span>*/}{props.invoiceData.invoiceDetails.travelDetails.startFromPickup ? moment(new Date(props.invoiceData.invoiceDetails.travelDetails.startFromPickup.dateTime)).format("HH:mm") : ""}
                                  </td>
                                  <td colSpan="2" className="right-text">{props.invoiceData.invoiceDetails.travelDetails.startFromPickup.odometerReading}</td>
                                  <td colSpan="2" className="right-text">
                                    <span className="attributeHeading">Allowed Hr : &nbsp;</span>
                                    {props.invoiceData.invoiceDetails.travelDetails.allowedHrs 
                                      ? 
                                        props.invoiceData.invoiceDetails.travelDetails.allowedHrs.split(":")[0] + " Hours " + 
                                        (props.invoiceData.invoiceDetails.travelDetails.allowedHrs.split(":")[1] ? props.invoiceData.invoiceDetails.travelDetails.allowedHrs.split(":")[1] : "00" ) + " Minutes"  
                                      : 
                                        null 
                                    }
                                  </td>
                                  <td colSpan="2" className="right-text">
                                    <span className="attributeHeading">Allowed Kms : &nbsp;</span>
                                    {props.invoiceData.invoiceDetails.travelDetails.allowedKms ? props.invoiceData.invoiceDetails.travelDetails.allowedKms : null }
                                    {props.invoiceData.invoiceDetails.travelDetails.totalKms > 1 ? " Kms" : " Km" }
                                  </td>
                                </tr>                          
                                <tr>
                                  <td colSpan="2">
                                    <span className="attributeHeading">
                                      {props.invoiceData.invoiceDetails.travelDetails.startFromGarage ? "Reached Drop Location" : "" }
                                    </span>
                                  </td>
                                  <td colSpan="2" className="right-text">
                                    {/*<span className="attributeHeading">Date : </span>*/}{props.invoiceData.invoiceDetails.travelDetails.reachedDropLocation ? moment(new Date(props.invoiceData.invoiceDetails.travelDetails.startFromGarage.dateTime)).format("DD-MM-YYYY") + ", " : ""}
                                    {/*<span className="attributeHeading">Time : </span>*/}{props.invoiceData.invoiceDetails.travelDetails.reachedDropLocation ? moment(new Date(props.invoiceData.invoiceDetails.travelDetails.startFromGarage.dateTime)).format("HH:mm") : ""}
                                  </td>
                                  <td colSpan="2" className="right-text">{props.invoiceData.invoiceDetails.travelDetails.reachedDropLocation.odometerReading}</td>
                                  <td colSpan="2" className="right-text">
                                    <span className="attributeHeading">Extra Hrs : &nbsp;</span>
                                    {(props.invoiceData.invoiceDetails.travelDetails.extraHrs && props.invoiceData.invoiceDetails.travelDetails.extraHrs !== "0" )
                                      ? 
                                        props.invoiceData.invoiceDetails.travelDetails.extraHrs.split(":")[0] + " Hours " + 
                                        props.invoiceData.invoiceDetails.travelDetails.extraHrs.split(":")[1] + " Minutes"  
                                      : 
                                        "0 Hours 0 Minutes" 
                                    }
                                  </td>
                                  <td colSpan="2" className="right-text">
                                    <span className="attributeHeading">Extra Kms : &nbsp;</span>
                                    {props.invoiceData.invoiceDetails.travelDetails.extraKms ? props.invoiceData.invoiceDetails.travelDetails.extraKms : 0 }
                                    {props.invoiceData.invoiceDetails.travelDetails.totalKms > 1 ? " Kms" : " Km" }
                                  </td>
                                </tr>                          
                                <tr>
                                  <td colSpan="2">
                                    <span className="attributeHeading">
                                      {props.invoiceData.invoiceDetails.travelDetails.startFromGarage ? "Garage End" : "" }
                                    </span>
                                  </td>
                                  <td colSpan="2" className="right-text">
                                    {/*<span className="attributeHeading">Date : </span>*/}{props.invoiceData.invoiceDetails.travelDetails.startFromGarage ? moment(new Date(props.invoiceData.invoiceDetails.travelDetails.startFromGarage.dateTime)).format("DD-MM-YYYY") + ", " : ""}
                                    {/*<span className="attributeHeading">Time : </span>*/}{props.invoiceData.invoiceDetails.travelDetails.startFromGarage ? moment(new Date(props.invoiceData.invoiceDetails.travelDetails.startFromGarage.dateTime)).format("HH:mm") : ""}
                                  </td>
                                  <td colSpan="2" className="right-text">{props.invoiceData.invoiceDetails.travelDetails.startFromGarage.odometerReading}</td>
                                  <td colSpan="4" className="right-text"></td>
                                </tr>
                              {/*: 
                                                            <tr>
                                                              <td colSpan="10"> No travel data Available </td>
                                                            </tr>
                            }*/}
                          </tbody>
                        </table>
                      </div>                    
            				</div>
                  :
                    null
                }   			          		
       	 			</div>
              <Tracking      routeData    = {props.invoiceData.invoiceDetails.routeDetails} />
         	 		<TripExpenses  tripExpenses = {props.invoiceData.invoiceDetails.tripExpenses} />
              {/*<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding invoiceFooter">
                  <img src="/billingManagement/footer.png" className=""></img>
                </div>*/}
     	 			</div>
     	 		</div>
     	 	</div>
    	</section>
   	</div>
  );
}
export default TripSummary;