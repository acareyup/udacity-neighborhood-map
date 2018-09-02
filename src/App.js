import React, { Component } from 'react';
import { allpoints } from './points';
import './App.css';
import scriptLoader from 'react-async-script-loader';
import List from './components/List'

class App extends Component {
  //constructor function
  constructor(props) {
    super(props);
    this.state = {
      points: allpoints,
      map: "",
      infoWindow: "",
      prevmarker: ""
    }
    this.createGoogleMap = this.createGoogleMap.bind(this);
    this.openWindow = this.openWindow.bind(this);
    this.closeWindow = this.closeWindow.bind(this);
  }

  componentDidMount() {
    window.createGoogleMap = this.createGoogleMap;
    //authentication failed message
    const scr = document.createElement('script');
    scr.type = 'text/javascript';
    scr.async = true;
    scr.innerHTML = 'function gm_authFailure() { alert("Google Maps authentication failed.")}';
    document.body.appendChild(scr);
  }

  createGoogleMap(){
    let _this = this;
    let mapstyle = document.getElementById("map")
    mapstyle.style.height = window.innerHeight+"px"

    let map = new window.google.maps.Map(mapstyle, {
      center: {lat:41.007138, lng:28.976709},
      zoom:15,
      mapTypeControl:false
    })

    let infoWindow = new window.google.maps.InfoWindow({});
    window.google.maps.event.addListener(infoWindow, "closeclick", function(){
      _this.closeWindow();
    })

    this.setState({
      map:map,
      infoWindow : infoWindow
    })

    window.google.maps.event.addDomListener(window, "resize", function() {
      let center = map.getCenter();
      window.google.maps.event.trigger(map, "resize");
      _this.state.map.setCenter(center);
    });

    window.google.maps.event.addListener(map, "click", function() {
      _this.closeWindow();
    });

    //create new points array and set markers for each of them
    let _points = [] 
    this.state.points.forEach(function(point){
      let marker = new window.google.maps.Marker({
        position : new window.google.maps.LatLng(
          point.latitude, point.longitude
        ),
        animation : window.google.maps.Animation.DROP,
        map : map
      })
      marker.addListener("click", function() {
        _this.openWindow(marker);
      });

      point.marker = marker;
      point.display = true;
      _points.push(point);
    })

    //update points
    this.setState({
      points : _points
    })
  }

  openWindow(marker) {
    this.closeWindow();
    this.state.infoWindow.open(this.state.map, marker);
    marker.setAnimation(window.google.maps.Animation.BOUNCE);
    this.setState({
      prevmarker: marker
    });
    this.state.infoWindow.setContent("Loading Data...");
    this.showInfoMarker(marker);
  }

  closeWindow() {
    if (this.state.prevmarker) {
      this.state.prevmarker.setAnimation(null);
    }
    this.setState({
      prevmarker: ""
    });
    this.state.infoWindow.close();
  }

  //show markers info with foursquare api
  showInfoMarker(marker) {
    let _this = this;

    // Add api keys for foursquare
    let clientId = "";
    let clientSecret = "";

    // Build api
    let url =
      "https://api.foursquare.com/v2/venues/search?client_id=" +
      clientId +
      "&client_secret=" +
      clientSecret +
      "&v=20130815&ll=" +
      marker.getPosition().lat() +
      "," +
      marker.getPosition().lng() +
      "&limit=1";
    fetch(url)
      .then(function(response) {
        if (response.status !== 200) {
          _this.state.infoWindow.setContent("Sorry data can't be loaded");
          return;
        }
        // Get text
        response.json().then(function(data) {
          let _data = data.response.venues[0];
          let content =
            `<div class="infoWindow">
              <h2>${_data.name}</h2>
              <h3>${_data.location.address ? _data.location.address : _data.location.formattedAddress[0]}</h3>
              <h3>${_data.contact.formattedPhone? _data.contact.formattedPhone : "Phone number not available"}</h3>
              <p>${_data.hereNow.summary}</p>
              <p>powered by <a target="_blank" href='https://www.foursquare.com/'><strong><i>Foursquare</i></strong></a></p>
            </div>`;
          _this.state.infoWindow.setContent(
            content
          );
        });
      })
      .catch(function(err) {
        _this.state.infoWindow.setContent("Sorry data can't be loaded");
      });
  }

  render() {
    return (
      <div>
        <List
          points={this.state.points}
          openWindow={this.openWindow}
          closeWindow={this.closeWindow}
        />
        <div id="map" />
      </div>
    );
  }
}
// load Googlemaps api async 
export default scriptLoader(
  [`https://maps.googleapis.com/maps/api/js?key=YOURAPIKEY&callback=createGoogleMap`]
)(App);
