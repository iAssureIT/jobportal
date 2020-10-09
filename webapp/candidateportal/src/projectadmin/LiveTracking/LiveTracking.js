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


const MapWithAMarker = compose(withGoogleMap)(props => {
  console.log("props",props.pathCoordinates);
 const icon = {
    url:
      'https://images.vexels.com/media/users/3/154573/isolated/preview/bd08e000a449288c914d851cb9dae110-hatchback-car-top-view-silhouette-by-vexels.png',
      scaledSize: new window.google.maps.Size(40, 40),
      anchor: { x: 20, y: 20 }
  };


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
                }}
            />
            <Marker
              icon={icon}
              position={props.pathCoordinates[props.pathCoordinates.length - 1]}
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
      bookingNum:"",
      path:props.path,
      velocity : 400,
      progress: [],
      initialDate : new Date(),
      routeCoordinates:[],
      bookingNum: "",
    }
  }
  componentDidMount(){
    this.getData();
    var that = this;
      setInterval(function(){
        that.getData();
      }, 3000);
  }

  // getData(){
  //   axios.get('/api/bookingmaster/get/routeCoordinates/'+this.state.booking_id)
  //   .then(booking=>{
  //     console.log("booking",booking);
  //     var routeCoordinates =booking.data[0].routeCoordinates.map(a=>{return{lat:a.latitude,lng:a.longitude}})
  //     console.log("routeCoordinates",routeCoordinates);
  //     this.setState({
  //       booking:booking.data[0],
  //       bookingNum:booking.data[0].bookingId,
  //       routeCoordinates
  //     })
  //   })
  //   .catch(err=>{
  //     console.log("err",err)
  //   })
  // }
 getDistance(){
    // seconds between when the component loaded and now
    const differentInTime = (new Date() - this.state.initialDate) / 1000 // pass to seconds
    return differentInTime * this.state.velocity // d = v*t -- thanks Newton!
  }

  getData(){
    axios.get('/api/bookingmaster/get/routeCoordinates/'+this.state.booking_id)
    .then(booking=>{
        this.setState({bookingNum:booking.data[0].bookingId})
       const distance = this.getDistance()
        if (! distance) {
          return
        }
        var path = [];
        for (var i = 0; i < booking.data[0].routeCoordinates.length; i++) {
          path.push({lat:booking.data[0].routeCoordinates[i].latitude,lng:booking.data[0].routeCoordinates[i].longitude,distance:booking.data[0].routeCoordinates[i].distanceTravelled ? booking.data[0].routeCoordinates[i].distanceTravelled : 0})
        }
        console.log("path",path);

        let progress = path.filter(coordinates => coordinates.distance < distance)

        const nextLine = path.find(coordinates => coordinates.distance > distance)
        console.log("progress",progress);
        console.log("nextLine",nextLine);
        let point1, point2

        if (nextLine) {
          point1 = progress[progress.length - 1]
          point2 = nextLine
        } else {
          // it's the end, so use the latest 2
          point1 = progress[progress.length - 2]
          point2 = progress[progress.length - 1]
        }
        
        console.log("point1",point1);
        console.log("point2",point2);
        const point1LatLng = new window.google.maps.LatLng(point1.lat, point1.lng)
        const point2LatLng = new window.google.maps.LatLng(point2.lat, point2.lng)
        console.log("point1LatLng",point1LatLng);
        console.log("point2LatLng",point2LatLng);
        console.log("window.google.maps.geometry",window.google.maps.geometry);
        const angle = window.google.maps.geometry.spherical.computeHeading(point1LatLng, point2LatLng)
        const actualAngle = angle - 90
        console.log("actualAngle",actualAngle)

        const markerUrl = 'https://images.vexels.com/media/users/3/154573/isolated/preview/bd08e000a449288c914d851cb9dae110-hatchback-car-top-view-silhouette-by-vexels.png'
        const marker = document.querySelector(`[src="${markerUrl}"]`)
        console.log("marker",marker);
        
        if (marker) { // when it hasn't loaded, it's null
          marker.style.transform = `rotate(${actualAngle}deg)`
        }
        this.setState({routeCoordinates:progress})
    })
    .catch(err=>{
      console.log("err",err);
    })
  }


  render() {
    console.log("routeCoordinates",this.state.routeCoordinates);
    return (
      <React.Fragment>
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOPadding">
        <section className="content">
        <div className="pageContent col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
             <h4 className="weighttitle col-lg-8 col-md-11 col-xs-11 col-sm-11">Tracking Map for Booking No. {this.state.bookingNum}</h4>
          </div>
          {this.state.routeCoordinates && this.state.routeCoordinates.length > 0 ?
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