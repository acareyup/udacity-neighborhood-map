import React, { Component } from 'react';
import { points } from './points';
import './App.css';
import List from './components/List'

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
    this.openInfoWindow = this.openInfoWindow.bind(this);
    this.closeInfoWindow = this.closeInfoWindow.bind(this);
  }

  componentDidMount() {
    window.createGoogleMap = this.createGoogleMap;
    apiLoad(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBRNKyK8i9wZmL3sbNDGFP09CH76b8xxUg&callback=createGoogleMap"
    );
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
      _this.closeInfoWindow();
    })

    this.setState({
      map:map,
      infoWindow : infoWindow
    })

    window.google.maps.event.addDomListener(window, "resize", function() {
      var center = map.getCenter();
      window.google.maps.event.trigger(map, "resize");
      _this.state.map.setCenter(center);
    });

    //create new points array and set markers for each of them
    let _points = this.state.points.forEach(function(point){
      let marker = new window.google.maps.Marker({
        position : new window.google.maps.LatLng(
          point.latitude, point.longitude
        ),
        animation : window.google.maps.Animation.DROP,
        map : map
      })
      marker.addListener("click", function() {
        _this.openInfoWindow(marker);
      });

      point.marker = marker;
      point.display = true;
    })

    window.google.maps.event.addDomListener(window, "resize", function() {
      var center = map.getCenter();
      window.google.maps.event.trigger(map, "resize");
      _this.state.map.setCenter(center);
    });

    //update points
    this.setState({
      points : _points
    })
  }

  openInfoWindow(marker) {
    this.closeInfoWindow();
    this.state.infoWindow.open(this.state.map, marker);
    marker.setAnimation(window.google.maps.Animation.BOUNCE);
    this.setState({
      prevmarker: marker
    });
    this.state.infoWindow.setContent("Loading Data...");
    this.getMarkerInfo(marker);
  }

  closeInfoWindow() {
    if (this.state.prevmarker) {
      this.state.prevmarker.setAnimation(null);
    }
    this.setState({
      prevmarker: ""
    });
    this.state.infoWindow.close();
  }

  getMarkerInfo(marker) {
    var _this = this;

    // Add the api keys for foursquare
    var clientId = "Q5MK2XFDK3FVTDQLOQKSFTKS1CI1XEWZSO2TIPP5DU2PWICK";
    var clientSecret = "MQ3CZLR5KY1F04FUAX5YWXOLYRRJSYFWCHZANZZ23M4WI05L";

    // Build the api endpoint
    var url =
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

        // Get the text in the response
        response.json().then(function(data) {
          console.log(data);

          var location_data = data.response.venues[0];
          var place = `<h3>${location_data.name}</h3>`;
          var street = `<p>${location_data.location.formattedAddress[0]}</p>`;
          var contact = "";
          if (location_data.contact.phone)
            contact = `<p><small>${location_data.contact.phone}</small></p>`;
          var checkinsCount =
            "<b>Number of CheckIn: </b>" +
            location_data.stats.checkinsCount +
            "<br>";
          var readMore =
            '<a href="https://foursquare.com/v/' +
            location_data.id +
            '" target="_blank">Read More on <b>Foursquare Website</b></a>';
          _this.state.infoWindow.setContent(
            place + street + contact + checkinsCount + readMore
          );
        });
      })
      .catch(function(err) {
        _this.state.infowindow.setContent("Sorry data can't be loaded");
      });
  }

  render() {
    return (
      <div>
        <List
          key="100"
          points={this.state.points}
          openInfoWindow={this.openInfoWindow}
          closeInfoWindow={this.closeInfoWindow}
        />
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