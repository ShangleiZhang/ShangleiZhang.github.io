/**
 * Created by ShangleiZhang on 9/19/16.
 */
$(document).ready(function() {
    setBindings();
});

function setBindings() {
    $("nav a").click(function(e){
        e.preventDefault();
        var sectionID = e.currentTarget.id + "Section";
        // alert("button id" + e.sectionID);
        $("html body").animate({
            scrollTop:$("#" + sectionID).offset().top
        }, 1000)
    })
}

function adjustNav(){

}

// $(document).ready(function(){
//     // console.log(($(window).height()/2));

    var winMiddle =($(window).height()/2);

    var navBar = $("nav");
    var logo= $(".logo");
    var homeSection = $(".homeSection");

    $(window).scroll(function(e){
        var windowPosition = $(window).scrollTop();

// no matter the screen size, when scroll to the middle of the page, the nav will be adjusted
        if (windowPosition >= winMiddle) {

            // change nav css
            navBar.css({'min-height': '50px', '-webkit-transition': '0.5s'});
            logo.css({ 'line-height': '50px', 'font-size': '2em', 'min-height': '50px', '-webkit-transition': '0.5s', 'padding':'13px'});
            // navBar.css('-webkit-trasition', '0.5s');
            // console.log("I will adjust nav");

        }else{
            navBar.css({'min-height': '100px', '-webkit-transition': '0.5s'});
            logo.css({'line-height': '100px', 'font-size': '3em', 'min-height': '100px', '-webkit-transition': '0.5s'});
            // console.log("not adjusting");

        }

        // console.log($(window).scrollTop());

    });

    adjustNav();


    /* Every time the window is scrolled ... */
    $(window).scroll( function() {

        /* Check the location of each desired element */
        $(".placeSection object").each(function (i) {

            var bottom_of_object = $(this).offset().top + $(this).outerHeight()/2;
            var bottom_of_window = $(window).scrollTop() + $(window).height();

            /* If the object is completely visible in the window, fade it it */
            if (bottom_of_window > bottom_of_object) {

                $(this).animate({'opacity': '1'}, 2500);

            };

        });

    });



$(window).scroll( function() {

    /* Check the location of each desired element */
    $(".workSection").each(function (i) {

        var bottom_of_object = $(this).offset().top + $(this).outerHeight()/2;
        var bottom_of_window = $(window).scrollTop() + $(window).height();

        /* If the object is completely visible in the window, fade it it */

        if (bottom_of_window > bottom_of_object) {
            $(function () {
                setTimeout(function () {
                    $(".fly-in-text").removeClass("hidden");
                }, 500);
            });
        };


    });

});



$(window).scroll( function() {

    /* Check the location of each desired element */
    $(".travelSection p").each(function (i) {

        var bottom_of_object = $(this).offset().top + $(this).outerHeight();
        var bottom_of_window = $(window).scrollTop() + $(window).height();

        /* If the object is completely visible in the window, fade it it */

        if (bottom_of_window > bottom_of_object) {
            $(this).animate({'opacity': '1'}, 2500);
        }


    });

});



$(window).scroll(function(){

    var navLinks= $(".navRight");
    var winStart =($(window).height()/10);
    var windowPosition = $(window).scrollTop();

    if(window.innerWidth < 800 && windowPosition >= winStart) {

        navLinks.css({'visibility': 'hidden', '-webkit-transition': '0.5s'});
    }else{
        navLinks.css({'visibility': 'visible', '-webkit-transition': '0.5s'});
    }
});


