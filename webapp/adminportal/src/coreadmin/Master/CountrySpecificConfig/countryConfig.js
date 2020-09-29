import React, { Component }     from 'react';
import $                        from 'jquery';
import jQuery                   from 'jquery';
import axios                    from 'axios';
import swal                     from 'sweetalert';
import IAssureTable             from '../../IAssureTable/IAssureTable.jsx';
import { withRouter }           from 'react-router-dom';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

import './countryConfig.css'

class CountrySpecificConfiguration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            country : "",
            editId  : "",
            countryCode: "",
            currency: "",
            currencySymbol : "",
            taxName : "",
            ConfigurationData : []
        };
    }
    
    componentDidMount() {
        
        this.getData()
        
        $.validator.addMethod("regxonefield", function (value, element, regexpr) {
          return regexpr.test(value);
        }, "Please enter valid field value");
        
        jQuery.validator.setDefaults({
          debug: true,
          success: "valid"
        });
        $("#CountrySpecificConfigurationValid").validate({
        rules: {
            currencySymbol: {
              required: true,
            },
            currency: {
              required: true,
            },
            taxName: {
              required: true,
            },
            country: {
              required: true,
            },
            
        },
      
        });
    }
   
    componentWillReceiveProps(nextProps) {
        
    }
    handleChange(event) {
        event.preventDefault();
        const target = event.target;
        const name = target.name;
        this.setState({
            [name] : event.target.value
        });
    }
    
    submit(event) {
        event.preventDefault();
        var formvalue ={
          country : this.state.country,
          countryCode : this.state.countryCode,
          currency : this.state.currency,
          currencySymbol : this.state.currencySymbol,
          taxName : this.state.taxName,
          createdBy    : localStorage.getItem("user_ID")
        }
        if($("#CountrySpecificConfigurationValid").valid()){
          axios.post('/api/countryspecificConfig/post',formvalue)
          .then((response)=> {
            if(response.data.duplicated == true){
                swal({                
                text: "Duplicate Entry",
              });
            }else{
                swal({                
                    text: "Details added successfully!",
                  });
              
              this.setState({
                country    : "", 
                countryCode    : "", 
                currency : "", 
                currencySymbol : "", 
                taxName : "", 
              })
              this.getData();
             }
          })
          .catch((error)=> {
            swal(error);
          }) 
        }
    }
    update(event) {
      event.preventDefault();
     
      var formvalues ={
        id: this.state.editId,
        country    : this.state.country, 
        countryCode    : this.state.countryCode, 
        currency : this.state.currency,
        currencySymbol : this.state.currencySymbol,
        taxName : this.state.taxName,
        updatedBy : localStorage.getItem("user_ID")
      }
      if($("#CountrySpecificConfigurationValid").valid()){
        axios.patch('/api/countryspecificConfig/patch',formvalues)
        .then((response)=> {
          this.getData();
          swal({                
                text: "Data Updated successfully!",
              });
          $('#country').prop('disabled', false);
            this.setState({
              country    : "", 
              countryCode    : "", 
              currency : "", 
              currencySymbol : "", 
              taxName : "", 
              editId:""
            })
            this.getData();
        })
        .catch((error)=> {
          swal({                
                text: "Failed to Update details!",
              });
        })
      }
              
    }
    
    getData() {
      axios.post('/api/countryspecificConfig/list')
      .then((response)=> {
        this.setState({ConfigurationData:response.data})
      })
      .catch((error)=> {
        swal(error);
      })  
    }
    
    edit(event) {
       event.preventDefault();
        $("html,body").scrollTop(0);
        $('#country').prop('disabled', true);
        var id = $(event.currentTarget).attr('id');
        axios.get('/api/countryspecificConfig/get/one/'+id)
          .then((response) => {
              this.setState({ 
                editId : response.data._id,
                country : response.data.country,
                countryCode : response.data.countryCode,
                currency : response.data.currency,
                currencySymbol : response.data.currencySymbol,
                taxName : response.data.taxName,
              });
          })
          .catch((error) => {swal(error)});
    }

    delete(event){
        var id = event.target.id;
        axios.delete("/api/countryspecificConfig/delete/"+id)
        .then((response)=>{
            this.getData();
            swal("Data deleted successfully.")
        })
        .catch((error)=>{
            console.log('Delete Error: ',error)
        })
    }

    handleChangePlaces = address => {
     
    this.setState({ country : address });
    geocodeByAddress(address)
     .then((results) =>{ 
      if(results[0].address_components && results[0].address_components.length > 0){
        var countryCode = results[0].address_components[0].short_name;
        this.setState({countryCode:countryCode})
      }
      })
     
      .catch(error => console.error('Error', error));
    };

    handleSelect = address => {
      geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
    };

    
    render() {
        return (
            <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 companyDisplayForm">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <h4 className="">Country Specific Configuration</h4>
              </div>
              <hr className="compySettingHr" />
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{"margin-bottom" : "30px"}}>
                    <form className="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="CountrySpecificConfigurationValid" >
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                            <div className="form-margin col-lg-3  col-md-3 col-sm-12 col-xs-12 pdcls">
                                <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Country <i className="astrick">*</i></label>
                                <PlacesAutocomplete
                                    value={this.state.country}
                                    onChange={this.handleChangePlaces}
                                    onSelect={this.handleSelectLocation}
                                    searchOptions={{ types: ['(regions)'] }}

                                  >
                                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                      <div>
                                        <input name="country" required
                                          {...getInputProps({
                                            placeholder: 'Search country ...',
                                            id: 'country',
                                            name:'country',
                                            className: 'location-search-input col-lg-12 form-control',
                                          })}
                                        />
                                        <div className="autocomplete-dropdown-container">
                                          {loading && <div>Loading...</div>}
                                          {suggestions.map(suggestion => {
                                            const className = suggestion.active
                                              ? 'suggestion-item--active'
                                              : 'suggestion-item';
                                            // inline style for demonstration purpose
                                            const style = suggestion.active
                                              ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                              : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                            return (
                                              <div
                                                {...getSuggestionItemProps(suggestion, {
                                                  className,
                                                  style,
                                                })}
                                              >
                                                {/*<span>{suggestion.description}</span>*/}
                                            <span>{(suggestion.description ? suggestion.description.split(",")[0]:"")}</span>

                                              </div>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    )}
                                </PlacesAutocomplete>
                            </div>
                            <div className="form-margin col-lg-3  col-md-3 col-sm-12 col-xs-12 pdcls">
                                <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Currency <i className="astrick">*</i></label>
                                <input type="text" className="form-control"
                                  id="currency" ref="currency" name="currency" placeholder="Currency Name" 
                                  value={this.state.currency} onChange={this.handleChange.bind(this)} 
                                  /> 
                            </div>
                            <div className="form-margin col-lg-3  col-md-3 col-sm-12 col-xs-12 pdcls">
                                <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Currency Symbol<i className="astrick">*</i></label>
                                <input type="text" className="form-control"
                                  id="currencySymbol" ref="currencySymbol" name="currencySymbol" placeholder="Currency Symbol" 
                                  value={this.state.currencySymbol} onChange={this.handleChange.bind(this)} 
                                  />
                            </div>
                            <div className="form-margin col-lg-3  col-md-3 col-sm-12 col-xs-12 pdcls">
                                <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Tax Name <i className="astrick">*</i></label>
                                <input type="text" className="form-control"
                                  id="taxName" ref="taxName" name="taxName" placeholder="Tax Name" 
                                  value={this.state.taxName} onChange={this.handleChange.bind(this)} 
                                  />
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 ">
                            {this.state.editId === "" ?
                                <button className="col-lg-3 col-md-3 col-xs-12 col-sm-12 col-xs-12 btn btn-primary button3 pull-right" 
                                    type="submit" onClick={this.submit.bind(this)} style={{"margin-top" : "5%"}}>Submit</button>
                                :
                                <button className="col-lg-3 col-md-3 col-xs-12 col-sm-12 col-xs-12 btn btn-primary button3 pull-right" 
                                    type="update" onClick={this.update.bind(this)} style={{"margin-top" : "5%"}}>Update</button>
                            }
                            
                          </div>
                         
                    </form> 
                </div>
                <div className="table-responsive topmr40 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <table className="table iAssureITtable-bordered table-striped table-hover">
                    <thead className="tempTableHeader">
                      <tr className="">
                        <th className="umDynamicHeader srpadd textAlignCenter"> Country </th>
                        <th className="umDynamicHeader srpadd textAlignCenter"> Country Code</th>
                        <th className="umDynamicHeader srpadd textAlignCenter"> Currency Name </th>
                        <th className="umDynamicHeader srpadd textAlignCenter"> Currency Symbol </th>
                        <th className="umDynamicHeader srpadd textAlignCenter"> Tax Name </th>
                        <th className="umDynamicHeader srpadd textAlignCenter"> Action </th>
                      </tr>
                    </thead>
                    <tbody>
                    {this.state.ConfigurationData && this.state.ConfigurationData.length > 0 ?
                    this.state.ConfigurationData.map((data,index)=>{
                    return(
                      <tr key={index}>
                        <td>{data.country}</td>
                        <td>{data.countryCode}</td>
                       <td>{data.currency}</td>
                       <td>{data.currencySymbol}</td>
                       <td>{data.taxName}</td>
                        <td className="textAlignCenter">
                          <span>
                              <button title="Edit" id={data._id}  onClick={this.edit.bind(this)}><i className="fa fa-pencil" ></i></button> &nbsp; &nbsp;
                              <button title="Delete"  data-toggle="modal" data-target={`#${data._id}-rm`}  id={data._id} title="Delete"><i className="fa fa-trash-o" aria-hidden="true"></i></button>
                          </span>
                          <div className="modal col-lg-12 col-md-12 col-sm-12 col-xs-12" id={`${data._id}-rm`}  role="dialog">
                                <div className=" modal-dialog adminModal adminModal-dialog">
                                     <div className="modal-content adminModal-content col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                            <div className="modal-header adminModal-header col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <h4 className="CreateTempModal col-lg-11 col-md-11 col-sm-11 col-xs-11" id="exampleModalLabel"></h4>
                                                <div className="adminCloseCircleDiv pull-right  col-lg-1 col-md-1 col-sm-1 col-xs-1 NOpadding-left NOpadding-right">
                                                    <button type="button" className="adminCloseButton" data-dismiss="modal" aria-label="Close">
                                                      <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                            </div>
                                          <div className="modal-body adminModal-body col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                             <h4 className="blackFont textAlignCenter col-lg-12 col-md-12 col-sm-12 col-xs-12 examDeleteFont">Are you sure you want to delete this?</h4>
                                          </div>
                                          
                                          <div className="modal-footer adminModal-footer col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                               <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                    <button type="button" className="btn adminCancel-btn col-lg-4 col-lg-offset-1 col-md-4 col-md-offset-1 col-sm-8 col-sm-offset-1 col-xs-10 col-xs-offset-1" data-dismiss="modal">CANCEL</button>
                                               </div>
                                               <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                    <button onClick={this.delete.bind(this)} id={data._id} type="button" className="btn examDelete-btn col-lg-4 col-lg-offset-7 col-md-4 col-md-offset-7 col-sm-8 col-sm-offset-3 col-xs-10 col-xs-offset-1" data-dismiss="modal">DELETE</button>
                                               </div>
                                          </div>
                                     </div>
                                </div>
                           </div>
                          </td>
                      </tr>
                       )
                        })
                        
                        :
                        <tr><td colSpan="5" className="textAlignCenter">No Data Found</td></tr>
                      }     
                    </tbody>
                  </table>
                </div>
               
            </div>


        
        );
    }
}
export default CountrySpecificConfiguration;

