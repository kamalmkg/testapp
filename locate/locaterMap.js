//Google Maps API v3
//http://code.google.com/apis/maps/documentation/v3/reference.html
//Calculate distance with Lat/Lng
//http://www.movable-type.co.uk/scripts/latlong.html
//Basic s info
//http://www.svennerberg.com/2009/07/google-maps-api-3-s/
//Minifyer Online
//http://www.minifyjavascript.com/
var isIE = false;
var POSTCODE = "postcode";
var ADDRESS = "address";

var wimpys = new Array();
var wMarkers;
var populateMap = false;

var letters = new Array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
var errTxt = '<div class="error"><p class="reason">[REASON]</p><p class="description">[DESCRIPTION]</p></div>';

var directionsRenderer;
var localSearch = new GlocalSearch();
var geocoder = new google.maps.Geocoder();
var infowindow = null;
var map = null;
var myOptions = null;
var latlng = null;

var mapFormatted = false;
var isDirecting = false;
var firstLoad = true;
var mapInitialised = false;
var infoOpen = false;

var minZoom = 6;
var maxZoom = 16;
var lastZoom = null;

var zoomLvl = 12;
var lat = 51.47732;
var lng = -2.669678;



$(function(){
	
	initialize();
	
	$("#location").click(function () { 
		if ($(this).attr("value") == "") {
    		$(this).val(''); 
		}
    });
	$("#location").blur(function () { 
		if ($(this).attr("value") == "") {
    		$(this).val(''); 
		}
    });
	
	$("#location").focus(function () { 
		if ($(this).attr("value") == "") {
    		$(this).val(''); 
		}
    });
		
});


/***** GOOGLE MAP MANIPULATION *****/

function addWimpy(arr) {

	arr.LONGITUDE = parseFloat(arr.LONGITUDE);
	arr.LATITUDE = parseFloat(arr.LATITUDE);
	var address = arr.ADDR;
	address = address.replace(',',',<br />');
	arr.contentString = '<div id="content" style="height: 130px;"><h4 class="poolName">'+arr.NAME+',</h4>'+
						'<p class="address">'+address+'</p>';

	//arr.contentString += '<p><a href="javascript:getDirections('+arr.LATITUDE+','+arr.LONGITUDE+');">Directions to this pool</a></p>';
						 arr.contentString += '</div>';
	
	wimpys[wimpys.length] = arr;

}

function makeLatLng(a,b) {

	latlng = new google.maps.LatLng(a,b);
	
	return true;
}


//See if search term is a postcode or not
function checkAddr(loc) {
	//Check whether address is a postcode or physical address
	 postcode = /[A-Za-z]{1,2}\d[A-Za-z\d]?[\s]?\d[ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}/;
	 if (loc.match(postcode)) {
		return POSTCODE;
	 } else {
		return ADDRESS; 
	 }
}

//Center map on Postcode searched for
function showPostcode(postcode,zoom) {
	$('#errorHolder').hide();
  	localSearch.setSearchCompleteCallback(null,
    function() {
      	if (localSearch.results[0]) {    
			var resultLat = localSearch.results[0].lat;
			var resultLng = localSearch.results[0].lng;
			makeLatLng(resultLat,resultLng);
			if (!mapInitialised) {
				setMapOptions(latlng);
			}
			if (mapInitialised) {
				setCenter(latlng,zoom);
			} 
			
			var nearest = findNearest();
			
			getDirections(nearest.LATITUDE,nearest.LONGITUDE);
			
      	} else {
			var errDesc = "We've tried out best, but we can't find you anywhere on Earth. Sorry.<br /><br />You can still try a different search, make sure you input a properly formatted postcode or address (e.g. 'W6 9HQ' or 'Queen Caroline Street, London')";
			var errTitle = "We can't find you!";
			var thisErrTxt = errTxt.replace("[REASON]",errTitle);
			thisErrTxt = thisErrTxt.replace("[DESCRIPTION]",errDesc);
			$('#errorHolder').append(thisErrTxt);
			$('#errorHolder').fadeIn(400);
      	}
		if (firstLoad) {
			firstLoad = false;	
		}
    });  
    
  	localSearch.execute(postcode);
  
}

function findNearest() {
	var p = [];
	var i;
	for (i in wimpys) {
		p[p.length] = wimpys[i];	
	}
	
	p.sort(function(a,b){
			a = findDistance(a.LATITUDE,a.LONGITUDE);
			b = findDistance(b.LATITUDE,b.LONGITUDE);
			return a - b;
	});
	return p[0];	
}

//Center map on address searched for
function showAddress(address,zoom) {
   	if (geocoder) {
		$('#errorHolder').hide();
      geocoder.geocode( { 'address': address}, function(results, status) {
		//status = google.maps.GeocoderStatus.ERROR;
        if (status == google.maps.GeocoderStatus.OK) {
			makeLatLng(results[0].geometry.location.lat(),results[0].geometry.location.lng())
			if (!mapInitialised) {
				setMapOptions(latlng);
			}
			if (mapInitialised) {
				setCenter(latlng,zoom);
			} 
			
			var nearest = findNearest();
			
			getDirections(nearest.LATITUDE,nearest.LONGITUDE);
			
        } else {
        	var errDesc = "Your search seems to have gone astray. Thanks for noticing, please try again later!";
			var errTitle = "There's been a problem";
			//There was a problem contacting the Google servers.
			if (status == google.maps.GeocoderStatus.ERROR) {
				errDesc = "We're having a problem getting hold of your map, please try and <a href=\"javascript:setStart("+zoomLvl+",'"+address+"')\">search again</a>.";
			}
			//The GeocoderRequest provided was invalid.
			if (status == google.maps.GeocoderStatus.INVALID_REQUEST) {
				
			}
			//The webpage has gone over the requests limit in too short a period of time.
			if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
				
			}
			//The webpage is not allowed to use the geocoder.
			if (status == google.maps.GeocoderStatus.REQUEST_DENIED) {
				
			}	
			//A geocoding request could not be processed due to a server error. The request may succeed if you try again.
			if (status == google.maps.GeocoderStatus.UNKNOWN_ERROR) {
				errDesc = "We're having a problem getting hold of your map, please try and <a href=\"javascript:setStart("+zoomLvl+",'"+address+"')\">search again</a>.";
			}	
			//No route could be found between the origin and destination.
			if (status == google.maps.GeocoderStatus.ZERO_RESULTS) {
				errTitle = "We can't find you!";
				errDesc = "We've tried out best, but we can't find you anywhere on Earth. Sorry.<br /><br />You can still try a different search, make sure you input a properly formatted postcode or address (e.g. 'W6 9HQ' or 'Queen Caroline Street, London')";
			}
			//alert('Error: ' + status);
			var thisErrTxt = errTxt.replace("[REASON]",errTitle);
			thisErrTxt = thisErrTxt.replace("[DESCRIPTION]",errDesc);
			
			$('#errorHolder').append(thisErrTxt);
			$('#errorHolder').fadeIn(400);
       }
	   if (firstLoad) {
			firstLoad = false;	
		}
     });
  }
}

//Find distance between defined current center location (not necessarily where center is after dragging) and pool location (in Km)
function findDistance(pLat,pLng) {
	var cLat = latlng.lat();
	var cLng = latlng.lng();
	
	var R = 6371; // km
    var dLat = toRad((pLat-cLat));
    var dLng = toRad((pLng-cLng));
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(toRad(pLat)) * Math.cos(toRad(cLat)) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
	return d;
	//document.getElementById("directionsPanel").innerHTML += d+"<br />";
}


function addWimpyMarkers(arr) {
	if (mapInitialised) {
		var i = 0;
		var x = 0;
		var Shadow = "s/shadow.png";
		var alternate = true;
		
		x = arr.length;
		wMarkers = new Array();
		
		for (i in arr) {
			var Icon = "s/blue_Marker.png";
			var point = new google.maps.LatLng(arr[i].LATITUDE,arr[i].LONGITUDE);
			var zDex = parseInt(i)+1;
			wMarkers[i] = new google.maps.Marker({
				position: point, 
				map: map,
				//icon: Icon,
				//shadow: Shadow,
				zIndex: zDex,
				title: arr[i].NAME
			}); 
			
			
			google.maps.event.addListener(wMarkers[i], 'click', function() {
				infoOpen = true;
				var index = this.getZIndex()-1;
				infowindow.setContent(arr[index].contentString);
				infowindow.open(map);
				infowindow.setPosition(this.getPosition());
			});		
			
			x--;
			//findDistance(arr[i].LATITUDE,arr[i].LONGITUDE);
		}

	
		
	
	}
}

//Center the map on a specific latitude/longitude
function setCenter(p,z) {
	
		map.setCenter(p);
		map.setZoom(z);
		zoomLvl = z;

}

function setStart(l) {
	
	if (!firstLoad) {
		removeDirections();
	}
	if (l != "" && l.match(/[a-zA-Z0-9]/)) {
		
		removeErrors();
		if (!firstLoad) {
			infoOpen = false;	
			infowindow.close();	
		}
		
		if (firstLoad) {
			firstLoad = false;
		}
		
		startLoc = l;	

		if (checkAddr(startLoc) == POSTCODE) {
			showPostcode(startLoc,zoomLvl);
		} else {
			showAddress(startLoc,zoomLvl);
		}
	} else {
		
		zoomLvl = 5;
		$('#errorHolder').hide();
		removeErrors();
		var thisErrTxt = errTxt.replace("[REASON]","There's been a problem...");
		thisErrTxt = thisErrTxt.replace("[DESCRIPTION]","Please enter a valid postcode or address (e.g. 'W6 9HQ' or 'Queen Caroline Street, London')");

		map.setCenter(latlng);
		map.setZoom(zoomLvl);

		$('#errorHolder').append(thisErrTxt);
		$('#errorHolder').fadeIn(400);	
	}
}

//Define the map's basic options
function setMapOptions(ll) {
	myOptions = {
		zoom: zoomLvl,
		center: ll,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};	
}


function getDirections(toLat, toLng) {
	removeDirections();
	$('#descriptions').empty();
	removeErrors();
	isDirecting = true;
	directionsRenderer.setMap(map);    
	directionsRenderer.setPanel(document.getElementById('directionsPanel'));
	var toLatLng = new google.maps.LatLng(toLat, toLng);
	infoOpen = false;	
	infowindow.close();
	map.panTo(latlng);
	var directionsService = new google.maps.DirectionsService();
	var request = {
		origin: latlng, 
		destination: toLatLng,
		travelMode: google.maps.DirectionsTravelMode.DRIVING,
		unitSystem: google.maps.DirectionsUnitSystem.IMPERIAL,
	};
	$('#errorHolder').hide();
	directionsService.route(request, function(response, status) {
		//status = google.maps.DirectionsStatus.UNKNOWN_ERROR;
		if (status == google.maps.DirectionsStatus.OK) {
			directionsRenderer.setDirections(response);
			$('#postcode').append('<p id="removeDirLink"><a href="javascript:removeDirections();">Close Directions</a></p>');
		} else {
			var errDesc = "Your search seems to have gone astray. Thanks for noticing, please try again later!";
			var errTitle = "There's been a problem";
			//The DirectionsRequest provided was invalid.
			if (status == google.maps.DirectionsStatus.INVALID_REQUEST) {
				
			}
			//Too many DirectionsWaypoints were provided in the DirectionsRequest. The total allowed waypoints is 23, plus the origin, and destination.
			if (status == google.maps.DirectionsStatus.MAX_WAYPOINTS_EXCEEDED) {
				errTitle = "It's getting over-complicated";
				errDesc = "There are too many waypoints requested for this route, please try a different route search.";
				
			}
			//At least one of the origin, destination, or waypoints could not be geocoded.
			if (status == google.maps.DirectionsStatus.NOT_FOUND) {
				
			}
			//The webpage has gone over the requests limit in too short a period of time.
			if (status == google.maps.DirectionsStatus.OVER_QUERY_LIMIT) {
				
			}
			//The webpage is not allowed to use the directions service.
			if (status == google.maps.DirectionsStatus.REQUEST_DENIED) {
				
			}	
			//A directions request could not be processed due to a server error. The request may succeed if you try again.
			if (status == google.maps.DirectionsStatus.UNKNOWN_ERROR) {
				errDesc = "We're not quite sure what happened, please try and <a href=\"javascript:getDirections("+toLat+","+toLng+");\">find your directions again</a>.";
			}	
			//No route could be found between the origin and destination.
			if (status == google.maps.DirectionsStatus.ZERO_RESULTS) {
				errTitle = "We're a bit stuck!";
				errDesc = "We've tried out best, but we can't find a route between your search location and the pool you selected. Sorry.";
			}
			//alert('Error: ' + status);
			var thisErrTxt = errTxt.replace("[REASON]",errTitle);
			thisErrTxt = thisErrTxt.replace("[DESCRIPTION]",errDesc);
			
			$('#errorHolder').append(thisErrTxt);
			$('#errorHolder').fadeIn(400);
		}
	});	
}

function removeErrors() {
	$('#errorHolder').empty();	
}

function removeDirections() {
	$('p#removeDirLink').remove();
	directionsRenderer.setMap(null);
	directionsRenderer.setPanel(null);
	map.setZoom(zoomLvl);
	map.panTo(latlng);
	isDirecting = false;
}

//Call google to generate google map  
function initialize() {
	document.getElementById('location').value = '';
	//initialise map options
	makeLatLng(lat,lng);
	setMapOptions(latlng);
	//set up map
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);	
	mapInitialised = true;
		
	//Ready the array for use by sorting North to South
	wimpys.sort(function(a,b){return a.LATITUDE - b.LATITUDE});
	

	//Make info window
	var contentString = 'Loading...';

	infowindow = new google.maps.InfoWindow({
		content: contentString,
		maxWidth: 350
	});
	
	google.maps.event.addListener(infowindow, 'closeclick', function() {
		infoOpen = false;	
		map.panTo(latlng);
	});
			addWimpyMarkers(wimpys);
	directionsRenderer = new google.maps.DirectionsRenderer();
	
	var mapdiv = document.getElementById("map_canvas");
	mapdiv.style.width = '280px';
    mapdiv.style.height = '300px';
}

function GKeyboardPatch(map) {
//<span class="hidden">for Google Maps</span>
  var button, button_style = 
  'width:100%;height:100%;padding:2px;margin:2px; \
  background:transparent ; border-width:0px;border-style:solid; \
  cursor: pointer;overflow:hidden ;text-indent:-100em; \
  position:absolute ;top:-2px;left:-2px;';
 
  

  var divs = $('#map_canvas').find('div');
  
  $.each(divs, function() {
    if ($(this).attr("title") != 'undefined' && $(this).attr("title") != '') {
		
		var theTitle = $(this).attr("title");
		if (theTitle == "Zoom in" || theTitle == "Zoom out" || theTitle == "Show street map" || theTitle == "Show satellite imagery" || theTitle == "Show imagery with street names" || theTitle == "Show street map with terrain" ) {

			if (theTitle == "Show street map with terrain") {
				$(this).parent().remove();	
			}
			
			if (theTitle == "Show street map" || theTitle == "Show satellite imagery" || theTitle == "Show imagery with street names") {
				var insideLink = $(this).find('div');
				$.each(insideLink, function() {
					var width = $(this).css('width');
					var height = $(this).css('height');
					var insideTxt = $(this).html();
					var fontWeight = "normal";
					var theCursor = $(this).css('cursor');
					if ($(this).css('font-weight') == "bold") {
						fontWeight = "bold";	
					}
					
					$(this).html('<button class="mapTypeSel mapElement" style="font-weight: '+fontWeight+'; cursor: '+theCursor+'; width:'+width+';">'+insideTxt+'</button>');
				});
				var typeButtons = $('button.mapTypeSel');
				$('button.mapTypeSel').click(function(event) {
					$.each(typeButtons,function() {
						$(this).css('font-weight','normal');
						$(this).css('cursor', '');
					});
					$(this).css('font-weight','bold');
					$(this).css('cursor','pointer');
				});
			}
			if (theTitle == "Zoom in" || theTitle == "Zoom out") {
				var width = $(this).css('width');
				var height = $(this).css('height');
				$(this).html('<button class="mapElement" title="'+theTitle+'" style="height: '+height+'; width:'+width+'; cursor: pointer;"></button>');
			}
		}
    }
  });
}

function accessifyMarkers() {
	if (!mapFormatted) {
		GKeyboardPatch(map);
		mapFormatted = true;
	}
	var divs = $('#map_canvas').children(":first").find('div');
	
		$.each(divs, function() {	
			
			//if ($(this).css('background-image').match(/blue_Marker/)) {
			if ($(this).attr("title") != 'undefined' && $(this).attr("title") != 'Your location' && $(this).attr("title") != '' && (!isIE && $(this).html().indexOf('button') < 0)) {
			//if($(this).html().match(/blue/)) {
				//if ($(this).attr("title") == "undefined") {
				var width = $(this).css('width');
				var height = $(this).css('height');
				//$(this).css('background-image','none');
				//$(this).css('opacity','1');
				var innerTxt= '';
				if ($(this).attr("title") == "Show satellite imagery") { innerTxt = "Satellite" };
				if ($(this).attr("title") == "Show imagery with street names") { innerTxt = "Hybrid" };
				if ($(this).attr("title") == "Show street map") { innerTxt = "Street Map" };
				$(this).html('<button class="mapElement" style="height: '+height+'; width:70px; cursor: pointer;">'+innerTxt+'</button>');
				//}
			}
	
	
	});
}

/*SUPPLEMENTARY FUNCTIONS*/

//From Degrees to Radians
function toRad(a) {  // convert degrees to radians
  return (a * Math.PI / 180);
}

/*Number.toDeg = function() {  // convert radians to degrees (signed)
  return this * 180 / Math.PI;
}

Number.toBrng = function() {  // convert radians to degrees (as bearing: 0...360)
  return (this.toDeg()+360) % 360;
}*/