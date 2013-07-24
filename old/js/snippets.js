/* Hover event */

$("#container").hover(function(){
    $(this).stop(true, false).animate( { backgroundColor: '#666666' });
	}, function() {
    $(this).stop(true, false).animate( { backgroundColor: '#eeeeee' });
});

/* Click event */

$("#container").click(function() {

});

/*Get attribute of clicked element*/

$("#container").click(function() {
	var targetDiv = $(this).attr('id');
	$('div#' + targetDiv + 'PanelContent').fadeIn();
});

/* Modernizr Media Query Test */

if (Modernizr.mq('only screen and (max-width: 480px)')) {

}
	
/* Smooth scroll page to specific element or top of page */
	
$('html, body').animate({
scrollTop: $('html, body').offset().top
}, 500);


/* Iterate through objects with a delay */

$(".smallDrop").each(function(i){
        $(this).delay(200*i).fadeIn(1000);
      	});


/* Custom function (this example has a class hidden with a media query, and the function does something if the class is hidden on page load) */

function displaySmallScreenTitleIfSmallScreen() {

    var isCategoryTitleHidden = $(".categoryTitle").css("display");

    if (isCategoryTitleHidden == 'none') {

        $(".mobileCategoryTitle").each(function() {
            var categoryTitleContents = $(this).siblings('.categoryTitle').text();
            $(this).text(categoryTitleContents);
        });
    }

}


/* Always listen to data entered in input field */

$('.foodtype').each(function() {

    // Save current value of element
    $(this).data('oldVal', $(this));

    // Look for changes in the value
    $(this).on("propertychange keyup input paste", function(event){

        // If value has changed...
        if ($(this).data('oldVal') != $(this).val()) {
            // Updated stored value
            $(this).data('oldVal', $(this).val());
            var amount = $(this).val();
            $(this).parent().siblings('.result').text(amount);
            $(this).parent().siblings('.result').fadeIn();
        }

    });

}); 