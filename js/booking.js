$(document).ready(function() {

		
	$("#formContainer input").click(function() {
	    thisInputField = this;
	    setTimeout(function() {
	        $('html, body').animate({
	        scrollTop: $(thisInputField).offset().top
	        }, 500);
	    }, 500);

	}); 

	$("#myform input").focus(function(){
	    $("#header").css({position:'absolute'})
	});

	$("#myform input").blur(function(){
	    $("#header").css({position:'fixed'})
	})

	var frmvalidator = new Validator("myform");
	frmvalidator.addValidation("name","req","Please enter your name");

	frmvalidator.addValidation("email","req","Please enter your email");
	frmvalidator.addValidation("email","email","Please enter a valid email");

	frmvalidator.addValidation("phone","req","Please enter your telephone number");
	frmvalidator.addValidation("phone","num","Please enter only numerical characters");

	frmvalidator.addValidation("people","req","Please enter how many people are in your booking");

	frmvalidator.addValidation("dateinput","req","Please enter a date");


		$( "input.datepicker" ).datepicker({
		showOn: "both",
		buttonImage: "images/calendar.gif",
		buttonImageOnly: true
		});

		$("input.datepicker").datepicker( "option", "dateFormat", 'DD, d MM, yy' );

		$("input.datepicker").click(function() {

			setTimeout(function() {
				$('html, body').animate({
				scrollTop: $('.ui-datepicker-title').offset().top - 100
				}, 500);
			}, 500);

		});	

});