import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classes from './Container.css';
//import {initMap2} from './scripts.js';
	function updateButton(){
		document.getElementById("myButton").setAttribute("onClick","initMap2();");
	}
export class MapContainer extends Component{
	
	/*function updateButton(){
		document.getElementById("myButton").setAttribute("onClick","initMap2();");
	}*/
	render(){
		return (
		<div>
		<button id="myButton" onClick={updateButton}> Refresh (Click Twice)</button>
		<div id="map" style={{height:1000,width:1000}}></div>
		//updateButton();
		</div>
		);
		
	}

}
export default MapContainer;

/*let GoogleApiWrapper;
let Map;
export class Container extends React.Component {
  render() {
	  const style = {
      width: '100vw',
      height: '100vh'
    }
    if (!this.props.loaded) {
      return (<div>Loading...</div>)
    }
    return (
      <div style={style}>
	  <Map google={this.props.google} />
	  </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAayHuExZVJfG-xzEOAFt7uij-ony5dLK8"
})(Container)*/

/*import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
render() {
	const style = {
	width: '100%',
	height: '100%'
}
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
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAayHuExZVJfG-xzEOAFt7uij-ony5dLK8"
})(MapContainer)*/