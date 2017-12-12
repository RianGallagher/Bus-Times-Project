//When setting up the modal div run the following 2 commands
//	google.maps.event.trigger(map, 'resize')
//	map.setCenter(myLocation)

//myLocation
var map;
var infowindow;
var myLocation;

//var lat = 53.376158; //Currently Rail Park
//var lng = -6.585928; //Change to myLocation soon
function initMap(){	//Stops Google running too early
	getLocation();
	console.log("Google Begins");
}
function getLocation(){
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position){
			myLocation = {
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
	document.getElementById("myButton").setAttribute("onClick","initMap2();");
	map = new google.maps.Map(document.getElementById('map'), {
        center: myLocation,
        zoom: 15
    });
	
	google.maps.event.addListener(map, 'bounds_changed', function() {
		resizeMap();		//Resizes maps when the map view is resized
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
	icon:"http://maps.google.com/mapfiles/ms/icons/blue-dot.png"})
	marker.setMap(map);
	google.maps.event.addListener(marker, 'click', function() {
     infowindow.setContent("<p style=color:#000000>My Location</p>");
      infowindow.open(map, this);
    });
	//createButton();
  }
 function createMarker(place) {
    var placeLoc = place.geometry.location;
	/*var markLat=place.geometry.location.lat();
	var markLng=place.geometry.location.lng();
	var placeLoc={
		lat: markLat, lng: markLng
	  };*/
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

function addTransitLayer(){ var transitLayer = new google.maps.TransitLayer();
transitLayer.setMap(map);}

/*function openModal(){
	document.getElementById("modalRoot").setAttribute("style","display:block");
	google.maps.event.trigger(map, 'resize')
	map.setCenter(myLocation)
}
function closeModal(){
	document.getElementById("modalRoot").setAttribute("style","display:none");
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == document.getElementById("modalRoot")) {
        closeModal();
    }
}

function createButton(){
	var form=document.getElementById("myForm");
var myButton=document.createElement("button");
myButton.setAttribute("onclick","openModal();");
myButton.innerHTML="Bus Stops Near Me!";
myForm.appendChild(myButton);
	
}
*/
function resizeMap(){
		google.maps.event.trigger(map, 'resize');
	map.setCenter(myLocation);
}
