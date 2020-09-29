import React, { Component } from "react"
import { compose } from "recompose"
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
  Polyline
} from "react-google-maps";
import axios from 'axios';

const pathCoordinates = [
    { lat: 18.5018, lng: 73.8636 },
    { lat: 18.5122, lng: 73.8860 },
    { lat: 18.5042, lng: 73.9014 },
    { lat: 18.5089, lng: 73.9259 },
];

const symbolOne = {
    path: "M -2,0 0,-2 2,0 0,2 z",
    strokeColor: "#F00",
    fillColor: "#F00",
    fillOpacity: 1
  };

const MapWithAMarker = compose(withGoogleMap)(props => {

  return (
   <GoogleMap
             defaultZoom={18} defaultCenter={props.pathCoordinates[props.pathCoordinates.length-1]}
        >
            {/*for creating path with the updated coordinates*/}
            <Polyline
                path={props.pathCoordinates}
                geodesic={true}
                options={{
                    strokeColor: "#ff2527",
                    strokeOpacity: 0.75,
                    strokeWeight: 2,
                    icons: [
                        {
                            icon:  symbolOne,
                            offset: "0",
                            // repeat: "20px"
                        }
                    ]
                }}
            />
        </GoogleMap>
  )
})


export default class LiveTracking  extends Component {
  constructor(props) {
    super(props)
    this.state = {
      locations: [],
      selectedMarker: false,
      booking_id : props.match.params.booking_id,
      bookingNum:""
    }
  }
  componentDidMount(){
    axios.get('/api/bookingmaster/get/routeCoordinates/'+this.state.booking_id)
    .then(booking=>{
      console.log("booking",booking);
      var routeCoordinates =booking.data[0].routeCoordinates.map(a=>{return{lat:a.latitude,lng:a.longitude}})
      console.log("routeCoordinates",routeCoordinates);
      this.setState({
        booking:booking.data[0],
        bookingNum:booking.data[0].bookingId,
        routeCoordinates
      })
    })
    .catch(err=>{
      console.log("err",err)
    })
  }



  render() {
     const pathCoordinates = [
        { lat: 18.5018, lng: 73.8636 },
        { lat: 36.2169884797185, lng: -112.056727493181 }
    ];
    return (
      <React.Fragment>
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOPadding">
        <section className="content">
        <div className="pageContent col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
             <h4 className="weighttitle col-lg-8 col-md-11 col-xs-11 col-sm-11">Tracking Map for Booking No. {this.state.bookingNum}</h4>
          </div>
          {this.state.booking ?
            <div className="col-lg-12 col-md-12 col-xs-12 col-xs-12 text-center">
              <MapWithAMarker
                selectedMarker={this.state.selectedMarker}
                markers={this.state.locations}
                onClick={this.handleClick}
                pathCoordinates={this.state.routeCoordinates}
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `650px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
             {/*<h1>Coming Soon</h1>*/}
            </div> 
            :
            null
          }
          </div>
         </section>
         </div>  
      </React.Fragment>  
    )
  }
}