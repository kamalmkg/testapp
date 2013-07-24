<!DOCTYPE HTML>
<html>

<head>
	
	<title>Home</title>

	<?php include("head.php"); ?>
	<script src="js/gallery.js"></script>


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
				
				<?php include("quickLinks.php"); ?>

				<div id="mainContent">
					<h1 class="intro">Welcome to Joy Raj, an established Indian restaurant based in Clifton, Bristol, serving a wide range of delicious Indian cuisine for dining in or to take-away.</h1>
					<p>Experience the Joy of being Raj, taste cuisine fit for a king, intense aroma and exquisite taste that will bring joy to your senses and stir your emotions. We have only the finest, freshest ingredients and authentic Indian recipes combined to bring you great flavours and textures.</p>
				</div>

			</div>

			

			<?php include("quickLinks.php"); ?>

		</div> <!-- End Container -->

		

	</div> <!-- End Wrapper -->

	<script src="js/script.js"></script>

</body>

</html>