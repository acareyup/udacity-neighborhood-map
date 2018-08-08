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

  }
  
  render() {
    
  }
}

export default App;
