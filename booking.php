<!DOCTYPE HTML>
<html>

<head>
	
	<title>Menu</title>

	<?php include("head.php"); ?>


	<script src="js/booking.js" type="text/javascript"></script>

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

					<h1>Booking</h1>

					<p class="emphasis">Fill in our easy to use booking form to reserve your table at Joy Raj.</p>
					<p class="emphasis">For same day bookings, please call 0117 973 8101.</p>

					<div id="formContainer" class="clear">
						<form id="myform" action="mail.php" method="POST">

							<div class="title">Name: </div><div class="theinputfield"><input id="name" type="text" name="name"></div>
							<div class="title">Email: </div><div class="theinputfield"><input id="email" type="text" name="email"></div>
							<div class="title">Telephone: </div><div class="theinputfield"><input id="phone" type="text" name="phone"></div>

							<div class="title">Date: </div>
							<div class="theinputfield"><input type="text" name="date" class="datepicker" id="dateinput" readonly></div>

							<div class="title">Time: </div>
								<div class="theinputfield">
							    <select name="time" id="time" size="1">
								<option value="5.30pm">5.30pm</option>
							    <option value="5.45pm">5.45pm</option>
								<option value="6.00pm">6.00pm</option>
								<option value="6.15pm">6.15pm</option>
								<option value="6.30pm">6.30pm</option>
							    <option value="6.45pm">6.45pm</option>
							    <option value="7.00pm">7.00pm</option>
								<option value="7.15pm">7.15pm</option>
								<option value="7.30pm">7.30pm</option>
							    <option value="7.45pm">7.45pm</option>
							    <option value="8.00pm">8.00pm</option>
								<option value="8.15pm">8.15pm</option>
								<option value="8.30pm">8.30pm</option>
							    <option value="8.45pm">8.45pm</option>
							    <option value="9.00pm">9.00pm</option>
								<option value="9.15pm">9.15pm</option>
								<option value="9.30pm">9.30pm</option>
							    <option value="9.45pm">9.45pm</option>
							    <option value="10.00pm">10.00pm</option>
								<option value="10.15pm">10.15pm</option>
								<option value="10.30pm">10.30pm</option>
							    <option value="10.45pm">10.45pm</option>
							    </select>
							</div>

							<div class="title">No. of people: </div>
								<div class="theinputfield">
							    <select name="people" id="people"  size="1">
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
							    <option value="5">5</option>
							    <option value="6">6</option>
							    <option value="7">7</option>
							    <option value="8">8</option>
							    <option value="9">9</option>
							    <option value="10">10</option>
							    <option value="11">11</option>
							    <option value="12">12</option>
							    <option value="13 or more">12 or more</option>
							</select>
							</div>

							<!--
							<div class="title">Additional Information</div>
							<div class="theinputfield">
							<textarea id="additional" name="message" rows="3" cols="25"></textarea>
							</div>
							-->

							<input class="submitBtn" type="submit" value="Submit booking request">

							<!--<input type="reset" value="Clear">-->

						</form>
					</div>

					<p class="emphasis">We will call the number provided to confirm the reservation.</p>

				</div>

			</div>

			<?php include("quickLinks.php"); ?>

		</div> <!-- End Container -->

	</div> <!-- End Wrapper -->

	<script src="js/script.js"></script>

</body>

</html>