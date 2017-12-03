import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import styles from './Container.css';

function updateButton(){
	document.getElementById("myButton").setAttribute("onClick","initMap2();");
}

export class MapContainer extends Component{	
	render(){
		return (
			<div className={styles.mapContainer} >
				<button id="myButton" onClick={updateButton} className={styles.button}><a>Refresh (Click Twice)</a></button>
				<div id="map" className={styles.map}></div>
			</div>
		);	
	}
}
export default MapContainer;
