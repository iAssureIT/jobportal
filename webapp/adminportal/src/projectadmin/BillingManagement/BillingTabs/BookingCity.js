
import React, { Component }            from 'react';
import $                               from 'jquery';
import axios                           from 'axios';
import {withRouter}                    from 'react-router-dom';
import PlacesAutocomplete, 
       {geocodeByAddress, getLatLng}   from "react-places-autocomplete";

class BookingCity extends Component {
  
   constructor(props) {
      super(props);    
      this.state = {
         city:'',
         address:''
      };
      this.handleChange = this.handleChange.bind(this);
   }

   componentDidMount(){
      this.setState({
         label       : this.props.label,
         statename   : this.props.statename,
         reset       : this.props.reset,
      })
   }

   componentWillReceiveProps(nextProps){
      this.setState({
         statename   : nextProps.statename,
         label       : nextProps.label,
         reset       : nextProps.reset,
      },()=>{
         if(this.state.reset == true){
            this.setState({
               address  : "",
               city     : " "
            })
         }
      })    
   }
  
    
   handleChange(event){
      event.preventDefault();
      const target = event.target;
      const name   = target.name;

      this.setState({
         [name] : event.target.value
      },()=>{});
   }

   handleChangePlaces = address => {
      this.setState({ address : address});
      console.log("address = ",address);
   };

   handleSelect = address => {
      geocodeByAddress(address)
      .then((results) =>{ 
         for (var i = 0; i < results[0].address_components.length; i++) {
            for (var b = 0; b < results[0].address_components[i].types.length; b++) {
               switch (results[0].address_components[i].types[b]) {
                  case 'sublocality_level_1':
                     var area = results[0].address_components[i].long_name;
                     break;
                  case 'sublocality_level_2':
                     area = results[0].address_components[i].long_name;
                     break;
                  case 'locality':
                     var city = results[0].address_components[i].long_name;
                     break;
                  case 'administrative_area_level_1':
                     var state = results[0].address_components[i].long_name;
                     var stateCode = results[0].address_components[i].short_name;
                     break;
                  case 'administrative_area_level_2':
                     var district = results[0].address_components[i].long_name;
                     break;
                  case 'country':
                     var country = results[0].address_components[i].long_name;
                     var countryCode = results[0].address_components[i].short_name;
                     break; 
                  case 'postal_code':
                     var pincode = results[0].address_components[i].long_name;
                     break;
                  default :
                     break;
               }
            }
         }

         var statename = this.state.statename;
         this.props.onSelectedItemsChange(statename,city);

         var data = {
            [statename] : city,
         }
         this.props.getCity(data);
       
      })     
      .catch(error => console.error('Error', error));    
      this.setState({ address : address});
   };

   render() {
      const searchOptions = {
         types                   : ['(cities)'],
         componentRestrictions   : {country: "in"}
      }
      return (  
         <div>
            <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">{this.state.label}</label>
            <PlacesAutocomplete
               value         = {this.state.address}
               onChange      = {this.handleChangePlaces}
               onSelect      = {this.handleSelect}
               searchOptions = {searchOptions}
            >
               {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                  /*<div className="custom-search input-group col-lg-12 col-md-12 col-sm-12 col-xs-12" id="originatingCity" >                      
                      <span className="input-group-addon custom-select-icon"><img src="/billingManagement/city.png"/></span>
                      <input type="text" name="originatingCity" value={this.state.originatingCity} className="form-control" placeholder="Search City.."/>
                  </div>*/
                  <div className="custom-search input-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
                     <span className="input-group-addon custom-select-icon"><img src="/billingManagement/city.png"/></span>
                     <input
                        {...getInputProps({
                           placeholder : 'Search City ...',
                           className   : 'location-search-input form-control errorinputText',
                           id          : "address",
                           name        : "address"
                        })}
                     />
                     <div className={this.state.address ? "autocomplete-dropdown-container SearchListContainer" : ""} style={{"zIndex" : 4}}>
                        {loading && <div>Loading...</div>}
                        {suggestions.map(suggestion => {
                           const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                              // inline style for demonstration purpose
                           const style = suggestion.active ? { backgroundColor: '#fafafa', cursor: 'pointer' } : { backgroundColor: '#ffffff', cursor: 'pointer' };
                           
                           return (
                              <div {...getSuggestionItemProps(suggestion, {className, style,})} >
                                 <span>{suggestion.description}</span>
                              </div>
                           );
                        })}                      
                     </div>
                  </div>
               )}
            </PlacesAutocomplete>
         </div>     
      );
   } 
}
export default withRouter(BookingCity); 
