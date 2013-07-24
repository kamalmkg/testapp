var currentHref = location.href;
var stateChanged = false;
var shouldPushState;

/* Extend String to decode any HTML Entities in title tag */
String.prototype.decodeHTML = function() {
    return $("<div>", {html: "" + this}).html();
};

/* Run the necessary functions when a link is clicked */
$('.ajaxLink').on('click', function(event) {
    /* If push state supported */
    if (history.pushState) {
        event.preventDefault ? event.preventDefault() : event.returnValue = false;
        var href = $(this).attr("href");
        shouldPushState = true;
        console.log('AJAX Link Pressed!')
        loadPage(href, shouldPushState);
    }
});

/* Load new page in */
loadPage = function(href, shouldPushState) {
    /* AJAX in the content */
    $('#content').stop().animate({left: '-100%'}, function() {
        $('#loaderContainer').fadeIn();
        $('#content').load(href + " #content>*", function (html) {
            $('#content').css({left: '100%'});
            afterAjaxLoad(html, href, shouldPushState);
            console.log('content loaded!');
            $('#loaderContainer').fadeOut();
        });
    })
    
};

afterAjaxLoad = function(html, href, shouldPushState) {

    document.title = html.match(/<title>(.*?)<\/title>/)[1].trim().decodeHTML();

    $("#wholeNavContainer").fadeOut();
    if ( $("#ui-datepicker-div").length ) {
        $("#ui-datepicker-div").fadeOut();
    }

    if (shouldPushState == true) {
        pushStateToUrl(href); 
    }

    stateChanged = true;

    if (href == 'index.php') {
        $.getScript("js/gallery.js");
    }
    else if (href == 'booking.php') {
        console.log('booking page selected');
        $.getScript("js/booking.js");
    }
    else if (href == 'location.php') {
        console.log('location page selected');
        $.getScript("js/location.js");
    }

    

    if (href != 'index.php') {
        $('html, body').animate({ scrollTop: jQuery('#content').offset().top - 60}, 300);
    }
    else {
        $('html, body').animate({ scrollTop: jQuery('html, body').offset().top }, 300);
    }    

    $('#content').stop().delay(400).animate({left: 0});
    
    /* Add new page view to Google Analytics */
    /*_gaq.push(['_trackPageview', '/some-page']);*/
};

/* Push new state to URL */
pushStateToUrl = function(url) {
    history.pushState({}, '', url);
    console.log('state pushed!')
};

/* Load page to match URL if state changes i.e. when back/forward buttons are used */
$(window).on("popstate", function(event) {
    var newHref = location.href;
    if (event.originalEvent.state !== null) {
        newHref = location.href;
        shouldPushState = false;
        loadPage(newHref, shouldPushState);
    }
    else {
        if (stateChanged == true) {
            newHref = location.href;
            shouldPushState = false;
            loadPage(newHref, shouldPushState);
        }
    }
});

$(".wholeNavButton").click(function() {
    $('html, body').animate({
        scrollTop: jQuery('html, body').offset().top
    }, 100);
    $("#wholeNavContainer").fadeToggle();
    return false;
});

