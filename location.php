<!DOCTYPE HTML>
<html>

<head>
	
	<title>Menu</title>

	<?php include("head.php"); ?>

	<script type="text/javascript" src="js/location.js"></script> 

</head>

<body>

	<div id="wrapper">

		<div id="container" class="clear">

			<?php include("nav.php"); ?>
			
			<?php include("imageGallery.php"); ?>

			<div id="loaderContainer">
				<img class="ajaxloader" src="images/ajax.gif" alt=""/>
			</div>

			<div id="content">

				<div id="mainContent">
					<h1>Location</h1>
					<p>Type in your postcode or location below to view a map and directions to Joy Raj</p>
					<!-- <button id="btnInit" >Find my location</button>  -->
					<input id="theOrigin" type="text" name="theOrigin" placeholder="Type in your location">

					<div id="submitDirections"><p>Submit</p></div>

					<div id="directionsButton" class="switchButton">
						<p>View directions</p>
					</div>

					<div id="map" class="clear">
					</div>

					<div id="mapButton" class="switchButton">
						<p>View map</p>
					</div>

					<div id="directions" class="clear">
					</div>

					<div id="toTopButton" class="switchButton">
						<p>Back to top</p>
					</div>


				</div>
			</div>
			
			<?php include("quickLinks.php"); ?>

		</div> <!-- End Container -->

	</div> <!-- End Wrapper -->

	<script src="js/script.js"></script>


</body>

</html>