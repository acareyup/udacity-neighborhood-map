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
    this.createGoogleMap = this.createGoogleMap.bind(this);
  }

  componentDidMount() {
    window.createGoogleMap = this.createGoogleMap;
    apiLoad(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAKxdlyIb4kbt4Vp_80MswcdJzDfiVIDtc&callback=createGoogleMap"
    );
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
    //create new points array and set markers for each of them
    let _points = this.state.points.forEach(function(point){
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
    //update points
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

//load async Google Maps API
function apiLoad(src) {
  var ref = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = src;
  script.async = true;
  script.onerror = function() {
    document.write("Can't be load Google Maps");
  };
  ref.parentNode.insertBefore(script, ref);
}