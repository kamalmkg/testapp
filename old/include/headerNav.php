<div id="header">
	<ul id="mainNav">
		<li class="smallScreen"><a href="tel:077727159898"><span class="icon-phone"></span></a>
		</li>
		<li class="largeScreen" onClick='alert("Call us on 077727159898")'><a href="#"><span class="icon-phone"></span></a>
		</li>
		<li <?php if ($thisPage=="Menu") 
echo " id=\"currentpage\""; ?>><a class="foodMenuButton" href="#"><span class="icon-food"></span></a></li>
		<li <?php if ($thisPage=="Booking") 
echo " id=\"currentpage\""; ?>><a href="booking.php"><span class="icon-book"></span></a></li>
		<li<?php if ($thisPage=="Location") 
echo " id=\"currentpage\""; ?>><a href="location.php"><span class="icon-location-arrow"></span></a></li>
		<li><a class="wholeNavButton" href="#"><span class="icon-chevron-down"></span></a></li>
	</ul>
</div>