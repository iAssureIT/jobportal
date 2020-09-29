import React, { Component } from "react";
import { compose }          from "recompose";
import axios                from 'axios';
import { withScriptjs,
         withGoogleMap,
         GoogleMap,
         Marker,
         InfoWindow,
         Polyline,
         DirectionsRenderer
} from "react-google-maps";

export default class Tracking extends Component {
  constructor(props) {
    super(props)
    this.state = {
      locations       : [],
      selectedMarker  : true,
    }
  }
  
  /*======== render() ========*/
  render() {
    const pathCoordinates = [];
    const routeData = this.props.routeData;
    if(routeData && routeData.length > 0){
      routeData.forEach((element, index, array) => {
          pathCoordinates.push({
            lat : element.latitude,
            lng : element.longitude
          })
      });
    }
    console.log("pathCoordinates = ",pathCoordinates);

    const MapWithAMarker = compose(withGoogleMap)(props => {
      return (
        <GoogleMap defaultZoom={12} defaultCenter={pathCoordinates[0]} >        
          <Polyline
              path     = {pathCoordinates}
              geodesic = {true}
              options  = {{
                            strokeColor   : "#ff2527",
                            strokeOpacity : 0.75,
                            strokeWeight  : 2,
              }}
          />
          <Marker
            name      = {'Start Point'}
            position  = {pathCoordinates[0]} 
            style     = {{"height" : "10px"}}
          />
          <Marker
            name      = {'End Point'}
            position  = {pathCoordinates[pathCoordinates.length - 1]} 
          />
        </GoogleMap>
      )
    })

    return (
      <React.Fragment>
        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
          <section className="Content">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 ">
                <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 box-header with-border invoice-title">
                  <h4 className="invoiceTitle">Trip Route Map</h4>
                </div>
                <div className="col-lg-12 col-md-12 col-xs-12 col-xs-12 text-center routeMap">
                  <MapWithAMarker
                    selectedMarker    = {this.state.selectedMarker}
                    Markers           = {this.state.locations}
                    googleMapURL      = "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    loadingElement    = {<div style={{ "height": "100%" }} />}
                    containerElement  = {<div style={{ "height": "350px" }} />}
                    mapElement        = {<div style={{ "height": "100%" }} />}
                  />
                </div>
              </div> 
            </div>
          </section>
        </div>  
      </React.Fragment>  
    )
  }
}


