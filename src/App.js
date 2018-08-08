import React, { Component } from 'react';
import { points } from './points';
import './App.css';

class App extends Component {
  //constructor function
  constructor(props) {
    super(props);
    this.state = {
      points: points,
      map: "",
      infoWindow: "",
      prevmarker: ""
    }
  }

  createGoogleMap(){
    let _this = this;
    let mapstyle = document.getElementById("map")
    mapstyle.style.height = window.innerHeight+"px"

    let map = new window.google.maps.Map(mapstyle, {
      center: {lat:41.007138, lng:28.976709},
      zoom:12,
      mapTypeControl:false
    })

    let infoWindow = new window.google.maps.InfoWindow({});
    window.google.maps.event.addListener(infoWindow, "closeclick", function(){
      _this.closeInfo();
    })

    this.setState({
      map:map,
      infoWindow : infoWindow
    })

    let _points = this.state.points.map(function(point){
      let marker = new window.google.maps.Marker({
        position : new window.google.maps.LatLng(
          point.latitude, point.longitude
        ),
        animation : window.google.maps.Animation.DROP,
        map : map
      })

      point.marker = marker;
      point.display = true;
    })

    this.setState({
      points : _points
    })
  }
  
  render() {
    return (
      <div>
        <div id="map" />
      </div>
    );
  }
}

export default App;
