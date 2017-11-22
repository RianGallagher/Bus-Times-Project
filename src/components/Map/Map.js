//import React, { Component } from 'react';
//import ReactDOM from 'react-dom' ;

//import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
// { connect } from 'react-redux';

/* class Map extends Component{ 
	//https://www.npmjs.com/package/google-maps <- Not going to work
	//https://github.com/googlemaps/google-maps-services-js <- For server stuff, not for this purpose
	//https://github.com/tomchentw/react-google-maps <- Using this guide
	//https://github.com/fullstackreact/google-maps-react/blob/master/README.md	<- Backup Guide Lazy Loading
	//https://tomchentw.github.io/react-google-maps/#introduction  
	//<script src="%PUBLIC_URL%/GMaps/scripts.js"></script>
	//<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAayHuExZVJfG-xzEOAFt7uij-ony5dLK8&libraries=places&callback=initMap" async defer></script>

	//API AIzaSyAayHuExZVJfG-xzEOAFt7uij-ony5dLK8
	componentDidUpdate(prevProps, prevState) {		//Handles updates to the component
		if (prevProps.google !== this.props.google) {
			this.loadMap();
		}
	}
	
	componentDidMount() {	//Handles loading the map when the component (page) loads
		this.loadMap();
	}
	
	loadMap() {
		if (this.props && this.props.google) {	// google is available
			console.log("Google");
			const {google} = this.props;
			const maps = google.maps;
			const mapRef = this.refs.map;		//finds div where map will be placed (ref = map)
			const node = ReactDOM.findDOMNode(mapRef);	// the actual div object
			
			let zoom = 14;
			let lat = 37.774929;
			let lng = -122.419416;
			const center = new maps.LatLng(lat, lng);
			const mapConfig = Object.assign({}, {
				center: center,
				zoom: zoom
			})
			this.map = new maps.Map(node, mapConfig);
		}
		
		
		// ...
		console.log("Loaded");
	}
	
	render(){
		return(
			<div>
				<div  ref ="map" id="map"></div>
					Loading Map....
			</div>
		);
	}

}
export default GoogleApiComponent({
  apiKey: "AIzaSyAayHuExZVJfG-xzEOAFt7uij-ony5dLK8"
})(Container)
export default Map;

/*export class MapContainer extends Component {
render() {
    return (
      <Map google={this.props.google} zoom={14}>

        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />

        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
          
            </div>
        </InfoWindow>
      </Map>
    );
  }
}*/

/*import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
render() {
    return (
      <Map google={this.props.google} zoom={14}>

        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />

        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAayHuExZVJfG-xzEOAFt7uij-ony5dLK8"
})(MapContainer)*/

//ReactDOM.render(<App />, document.getElementById('app'));
/*
var map;
var infowindow;
var myLocation;

function initMap(){	//Stops Google running too early
	getLocation();
	console.log("Google Begins");
}

function getLocation(){
	if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position){
			myLocation ={
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			console.log("New location");
			initMap2();
		},locationError)
	}
	else{
		myLocation={
			lat: 53.376158, lng: -6.585928	//3 RAIL PARK
		};
		console.log("No location");
		initMap2();
	}
}

function initMap2(){
	map = new google.maps.Map(document.getElementById('map'), {
		center: myLocation,
        zoom: 15
	});

	infowindow = new google.maps.InfoWindow();
	var service = new google.maps.places.PlacesService(map);
	var request = {
		location: myLocation,
        radius: '500',
        query: 'bus_station',
		type: 'bus_station'
	}; service.nearbySearch(request, callback);
	console.log("Map Created");
}

function callback(results, status) {
	if (status === google.maps.places.PlacesServiceStatus.OK) {
		for (var i = 0; i < results.length; i++) {
			createMarker(results[i]);
		}
	}
	console.log("Search Results are back");
	var marker = new google.maps.Marker({ //Create marker at users location
		position:myLocation,
		map:map,
		title:"My Location",
		icon:"http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
	})
	marker.setMap(map);
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent("<p style=color:#000000>My Location</p>");
		infowindow.open(map, this);
    });
	createButton();
}

function createMarker(place) {
	var placeLoc = place.geometry.location;
	var marker = new google.maps.Marker({
		map: map,
		position: place.geometry.location
	});

	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent("<p style=color:#000000>"+place.name+"</p>");
		infowindow.open(map, this);
	});
	console.log("Marker created");
}

function locationError(error) {
		switch(error.code) {
			case error.PERMISSION_DENIED:
				console.log("User denied the request for Geolocation.");
				alert("Please allow location");
				break;
			case error.POSITION_UNAVAILABLE:
				console.log("Location information is unavailable.");
				alert("Your location is unavailable");
				break;
			case error.TIMEOUT:
				console.log("The request to get user location timed out.");
				alert("The request is timed out");
				break;
			case error.UNKNOWN_ERROR:
				console.log("An unknown error occurred.");
				alert("An unknown error has occurred)");
				break;
		}
		
		myLocation={
			lat: 53.376158, lng: -6.585928	//3 RAIL PARK
		};
		initMap2();
}

function addTransitLayer(){
	var transitLayer = new google.maps.TransitLayer();
	transitLayer.setMap(map);
}

export class Container extends React.Component {
  render() {
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    return (
      <div>Map will go here</div>
    )
  }
}//////////////*/