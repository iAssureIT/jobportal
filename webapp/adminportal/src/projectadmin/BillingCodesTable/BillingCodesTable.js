import React, { Component } from 'react';
import { render }           from 'react-dom';
import $                    from 'jquery';
import jQuery               from 'jquery';

import './BillingCodesTable.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/modal.js';

class BillingCodesTable extends Component{
  constructor(props) {
    super(props);
  }
  /*======= componentDidMount() =======*/
  componentDidMount(){
    // console.log("props = ", this.props);
  }
  /*======= toggleBillingCodes() =======*/
  toggleBillingCodes(event){
    console.log("event = ", event.target);
    $(".tablePanel").slideToggle("slow");
    $(".angleRight").toggleClass("angledown"); 

    if($(".angleRight").hasClass("angledown")){
      $(".titleBillingCode").text("Click to Hide Pre-defined Billing Codes");
    }else{
      $(".titleBillingCode").text("Click to See Pre-defined Billing Codes");
    }
  }
  /*======= render() =======*/
  render(){    
    return(
        <div className="container-fluid">
          <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding">
            <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding billingCodesTitleDiv" onClick={this.toggleBillingCodes.bind(this)}>
                <h4 className="billingCodesTableTitle col-lg-12 col-md-12 col-xs-12 col-sm-12">
                  <span id="titleBillingCode" className="titleBillingCode"> Click to See Pre-defined Billing Codes </span>&nbsp; 
                  <i className="angleRotate angleRight fa fa-angle-right pull-right" id="angleRight" aria-hidden="true"></i>
                </h4>
            </div>
            <div id={"tablePanel"} className="tablePanel col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding">
              <table className="billingCodesTable">
                <tbody>
                  <tr>
                    <th colSpan="4">Total & Subtotal - 1 to 100</th>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Total Amount</td>
                    <td>-</td><td>001</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>SubTotal A</td>
                    <td>-</td>
                    <td>011</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>SubTotal B</td>
                    <td>-</td>
                    <td>012</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>SubTotal C</td>
                    <td>-</td>
                    <td>013</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>SubTotal D</td>
                    <td>-</td>
                    <td>014</td>
                  </tr>                    
                  <tr>
                    <th colSpan="4">Primary Rates - 101 to 200 </th>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Basic Rates</td>
                    <td>-</td>
                    <td>101</td>
                  </tr>
                  <tr>
                    <th colSpan="4">Travel Type Items - 201 to 300 </th>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Fuel Surcharge</td>
                    <td>-</td>
                    <td>201</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Extra Km</td>
                    <td>-</td>
                    <td>202</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Extra Hr</td>
                    <td>-</td>
                    <td>203</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Driver Allowance</td>
                    <td>-</td>
                    <td>204</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>Night Halt Allowance</td>
                    <td>-</td>
                    <td>205</td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>Early Morning Charges</td>
                    <td>-</td>
                    <td>206</td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td>Night Charges</td>
                    <td>-</td>
                    <td>207</td>
                  </tr>
                  <tr>
                    <th colSpan="4">Reimbursement Items - 301 to 400</th>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Toll & Parking</td>
                    <td>-</td>
                    <td>301</td>
                  </tr>
                  <tr>
                    <th colSpan="4">Tax Items - 401 to 500</th>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>CGST</td>
                    <td>-</td>
                    <td>401</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>SGST</td>
                    <td>-</td>
                    <td>402</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>IGST</td>
                    <td>-</td>
                    <td>403</td>
                  </tr>
                  <tr>
                    <th colSpan="4">Negative Items - 901 to 1000</th>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Rounding Off</td>
                    <td>-</td>
                    <td>901</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
  }

 }

 export default BillingCodesTable;