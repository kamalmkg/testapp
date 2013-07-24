<!DOCTYPE HTML>
<html>

<head>
	
	<title>Menu</title>

	<link href='http://fonts.googleapis.com/css?family=Roboto+Condensed' rel='stylesheet' type='text/css'>
	<link href='style.css' rel='stylesheet' type='text/css'>

	<script type="text/javascript" src="../js/jquery-1.9.1.min.js"></script> 

	<script src="http://maps.google.com/maps/api/js?sensor=false"></script>
	<script src="http://www.google.com/uds/api?file=uds.js&amp;v=1.0&amp;key=ABQIAAAAz_HHdUCBd5M7kZafRJaCgBT-MgfT8HHoolOd7xlKDL9tbvzIEhSG6y13sR6dGVOA3WEoJ4KgWwK9pQ" type="text/javascript"></script>

	<script src="locaterMap.js"></script>

	<script type="text/javascript"> 
	var wObj = new Object(); 
	wObj.NAME = "JoyRaj"; 
	wObj.ADDR = "31 Regent Street, Clifton, Bristol, BS8 4HR"; 
	wObj.LONGITUDE = "-2.61893"; 
	wObj.LATITUDE = "51.454528"; 
	addWimpy(wObj); 
	</script>

</head>

<body>

	<div id="gm_wrapper">
<div id="map_canvas"></div>
		<p>You can find us at:</p>
							<p>31 Regent Street, Clifton, Bristol, BS8 4HR.</p>
							<p>Enter your post code on the left to view directions of how to get to us.</p>
							
			<div id="postcode">
				<form class="alignthisright" name="finder" id="finder" method="get" action="index.php">
					<label for="location" class="hidden white"></label> 
					<input type="text" name="location" id="location" value="BS7">
					<input class="getdirections" type="submit" value="Get directions to Joy Raj" onclick="setStart(document.getElementById('location').value); return false;" /><br />
				</form>
			</div>
			<div id="errorPanel"></div>


		<div id="gm_directionsHolder">
			<div id="gm_directions">
				<div id="directionsPanel">
					<div id="descriptions">
						<div id="gm_map">	
			
		</div>
					</div>
				</div>
			</div>
		</div>



	</div>

	<script src="script.js"></script>


</body>

</html>