// Put code in your document ready area
jQuery(document).ready(function () {

	/*
	$("#btnInit").click(initiate_geolocation);  

	function initiate_geolocation() {  
        navigator.geolocation.getCurrentPosition(handle_geolocation_query,handle_errors);  
    }  

    function handle_errors(error)  
    {  
        switch(error.code)  
        {  
            case error.PERMISSION_DENIED: alert("Your browser has informed us that you don't want to share your location for this feature. If you want your location to be used for this feature, please check your browser settings.");  
            break;  
            case error.POSITION_UNAVAILABLE:console.log("could not detect current position");  
            break;  
            case error.TIMEOUT: console.log("retrieving position timed out");  
            break;  
            default: console.log("unknown error");  
            break;  
        }  
    }  

    function handle_geolocation_query(position){  
        $("#theOrigin").val(position.coords.latitude + ',' + position.coords.longitude);
        console.log(position.coords.latitude + ',' + position.coords.longitude);
        resetAndPrepMap();
    } 
    */

	var theOrigin;
	var theDestination = 'BS79BW';

	$("#directionsButton").click(function(event) {
		$('html, body').animate({
			scrollTop: $('#mapButton').offset().top - 65
		}, 500);
	});

	$("#mapButton").click(function(event) {
		$('html, body').animate({
			scrollTop: $('#directionsButton').offset().top - 65
		}, 500);
	});

	$("#toTopButton").click(function(event) {
		$('html, body').animate({
			scrollTop: $('#theOrigin').offset().top -65
		}, 500);
	});

	$("#submitDirections").click(function(event) {
		event.preventDefault ? event.preventDefault() : event.returnValue = false;
		if ($('#theOrigin').val() != '') {
			resetAndPrepMap();
		}
		else {
			$('#theOrigin').focus();
		}
	});

	$('#theOrigin').keypress(function(e) {
	    if (e.which == 13) {
			resetAndPrepMap();
		}
	});


	function resetAndPrepMap() {
			$('#map').gmap3({
			    clear: {
			        options:{
			        	origin: theOrigin
			   		}
			    }
			});
			theOrigin = $('#theOrigin').val();
			$("#directions").html('');
			$('.switchButton').fadeIn();
			generateMap();
			$('#theOrigin').blur();
	}

	function generateMap() {
		$("#map").gmap3({ 
		  getroute:{
		    options:{
		        origin: theOrigin,
		        destination: theDestination,
		        travelMode: google.maps.DirectionsTravelMode.DRIVING
		    },
		    callback: function(results){
		      if (!results) return;
		      $(this).gmap3({
		        map:{
		          options:{
		            zoom: 50,  
		            center: [-33.879, 151.235]
		          }
		        },
		        directionsrenderer:{
		          container: $("#directions"),
		          options:{
		            directions:results
		          } 
		        }
		      });
		    }
		  }
		});
		$('html, body').animate({
			scrollTop: $('#directionsButton').offset().top - 65
		}, 500);
	}

	$("#theOrigin").focus(function(){
	    $("#header").css({position:'absolute'})
	});

	$("#theOrigin").blur(function(){
	    $("#header").css({position:'fixed'})
	})

});