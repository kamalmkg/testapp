<!DOCTYPE HTML>
<html>

<head>
	
	<title>Menu</title>

	<?php include("head.php"); ?>


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
					<h1>Menu</h1>
					<a href="" class="button">Starters</a>
					<a href="" class="button">Main Courses</a>
					<a href="" class="button">Side Dishes</a>
					<a href="" class="button">Sundries</a>
				</div>
			</div>

			<?php include("quickLinks.php"); ?>

		</div> <!-- End Container -->

	</div> <!-- End Wrapper -->

	<script src="js/script.js"></script>

</body>

</html>