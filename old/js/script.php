<script>

// Put code in your document ready area

	jQuery(function() {
		jQuery('html, body').animate({
			scrollTop: jQuery('html, body').offset().top + 1
		}, 50);
	});

	jQuery(function() {
		jQuery(".rslides").responsiveSlides({
	        speed: 1000,
	        maxwidth: 700,
	        timeout: 2000,     
			pager: false,      
			nav: false
	  	});
	});

	jQuery(function() {
		if (jQuery(window).width() > 700) { 
			var r=confirm("This page was built for mobile devices, would you like to visit the desktop website?");
			if (r==true) {
			  newUrl = 'http://www.joyrajbristol.com'
			  document.location.href = newUrl;
			  }
		}
	});

	jQuery(".foodMenuButton").click(function() {
		myScroll.scrollTo(0, 0, 400);
		jQuery("#wholeNavContainer").fadeOut();
		jQuery("#foodMenuContainer").fadeToggle();
		return false;
	});

	jQuery(".wholeNavButton").click(function() {
		myScroll.scrollTo(0, 0, 400);
		jQuery("#foodMenuContainer").fadeOut();
		jQuery("#wholeNavContainer").fadeToggle();
		return false;
	});

	var timeout;
	function open_appstore() {
	    window.location='https://www.facebook.com/mobile//';
	}

	function try_to_open_app() {
	    timeout = setTimeout('open_appstore()', 300);
	}


	jQuery(".shareLink").click(function() {
		prompt('Copy the URL below and paste on Twitter, Facebook, WhatsApp, or wherever you want to share our Joy Raj app!','http://www.joyrajonline.com');
		return false;
	});

	jQuery(window).load(function () {
    var thisPage = '<?php echo $thisPage; ?>';
    if (thisPage != '') {
		myScroll.scrollTo(0, -322, 800);
    }
	});



</script>