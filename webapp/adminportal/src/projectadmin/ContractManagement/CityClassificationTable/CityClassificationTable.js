import React, { Component } from 'react';
import { render }           from 'react-dom';
import axios                from 'axios';
import $                    from 'jquery';
import jQuery               from 'jquery';

import './CityClassificationTable.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/modal.js';

class CityClassificationTable extends Component{
  constructor(props) {
    super(props);
    this.state = {
      cityNameArray : []
    }
  }
  /*======= componentDidMount() =======*/
  componentDidMount(){
    this.getCityNames();
    // console.log("props = ", this.props);
  }
  /*======= getCityNames() =======*/
  getCityNames(){
        axios.get("/api/citynamemaster/get/cities/list")
        .then((response)=>{
          console.log("City Data => ",response.data);
          if (response.data && response.data.length>0) {
            const listOfCityClasses = [];
            const map = new Map();
            for (const item of response.data) {
                if(!map.has(item.cityTypeId)){
                    map.set(item.cityTypeId, true);
                    listOfCityClasses.push({
                        cityTypeId   : item.cityTypeId,
                        cityType     : item.cityType
                    });
                }
            }
            console.log("City Classes => ",listOfCityClasses);
            this.setState({
              cityNameArray     : response.data.sort((a, b) => (a.cityName > b.cityName) ? 1 : -1),
              listOfCityClasses : listOfCityClasses.sort((a, b) => (a.cityType > b.cityType) ? 1 : -1),
            })
          }
        })
        .catch((error)=>{
          console.log("Error getCityNames() = ", error);
        })
    }
  /*======= toggleBillingCodes() =======*/
  toggleCityClassification(event){
    console.log("event = ", event.target);
    $(".tablePanel").slideToggle("slow");
    $(".angleRight").toggleClass("angledown"); 

    if($(".angleRight").hasClass("angledown")){
      $(".titleCityClassification").text("Click to Hide City Classification Table");
    }else{
      $(".titleCityClassification").text("Click to See City Classification Table");
    }
  }
  /*======= render() =======*/
  render(){    
    return(
        <div className="container-fluid">
          <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding">
            <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding cityClassificationTitleDiv" onClick={this.toggleCityClassification.bind(this)}>
                <h4 className="billingCodesTableTitle col-lg-12 col-md-12 col-xs-12 col-sm-12">
                  <span id="titleCityClassification" className="titleCityClassification"> Click to See City Classification Table </span>&nbsp; 
                  <i className="angleRotate angleRight fa fa-angle-right pull-right" id="angleRight" aria-hidden="true"></i>
                </h4>
            </div>
            <div id={"tablePanel"} className="tablePanel col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding">
              <table className="cityClassificationTable">
              <tbody>
                <tr>
                  <th className="cityClass">City Class</th>
                  <th className="cityName">City Names</th>
                </tr>
                 
                    {this.state.listOfCityClasses && this.state.listOfCityClasses.length > 0
                      ?
                      this.state.listOfCityClasses.map((d, i, array) => {
                        return (
                            <tr key={i} className="" style={{"marginBottom" : "5px"}}> 
                                <td>
                                    <h6 className="cityClassTitle"> {d.cityType} </h6>
                                </td>   
                                <td className="">
                                    {this.state.cityNameArray && this.state.cityNameArray.length > 0
                                    ?
                                    <span className="">
                                        {this.state.cityNameArray.map((citydata, index, array) => {
                                            if(d.cityTypeId === citydata.cityTypeId){                                                                          
                                                return (
                                                    <span key={index}>{citydata.cityName ? citydata.cityName + " | " : ""}</span>                                                                                                                                                                                             
                                                    
                                                );
                                            }
                                        })}
                                    </span>
                                   
                                    : 
                                        null
                                    }
                                </td>
                            </tr>
                          )
                    })
:
                  null
                    }
                   
                
                                
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
  }

 }

 export default CityClassificationTable;