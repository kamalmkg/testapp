<?php $thisPage="Home"; ?>
<!DOCTYPE HTML>
<html>

<head>
	
	<?php include("include/head.php"); ?>

</head>

<body>

	<?php include("include/headerNav.php"); ?>

	<div id="wrapper">

			<div id="container" class="clear">

				<?php include("include/subMenuNav.php"); ?>

				<?php include("include/imageGallery.php"); ?>

				<div id="quickLinksContainer">
	            	<ul id="quickLinks">
	                    <li class="foodMenuButton"><a href="#">View our<br />menu</a></li>
	                    <li><a href="#">Book a<br />table</a></li>
	                    <li><a href="#">Find our<br />location</a></li>
					</ul>
	            </div>

				<div id="mainContent">
					<h1>Welcome to Joy Raj, an established Indian restaurant based in Clifton, Bristol, serving a wide range of delicious Indian cuisine for dining in or to take-away.</h1>
					<p>Experience the Joy of being Raj, taste cuisine fit for a king, intense aroma and exquisite taste that will bring joy to your senses and stir your emotions. We have only the finest, freshest ingredients and authentic Indian recipes combined to bring you great flavours and textures.</p>
				</div>

				<?php include("include/footer.php"); ?>

			</div> <!-- End Container -->
	</div> <!-- End Wrapper -->

	
	<?php include("js/script.php"); ?>


</body>

</html>