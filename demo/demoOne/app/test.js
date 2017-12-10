/**
 * Created by ShangleiZhang on 12/10/16.
 */
$(document).ready(function () {
    setBindings();
    backToTop();
});

function adjustNav() {

}

var winMiddle = ($(window).height() / 2);

// var navBar = $("nav");

$(window).scroll(function (e) {
    var windowPosition = $(window).scrollTop();

// no matter the screen size, when scroll to the middle of the page, the nav will be adjusted
    if (windowPosition >= winMiddle) {

        // change nav css
        $('nav').removeClass('nav-down').addClass('nav-up');

    } else {

        $('nav').removeClass('nav-up').addClass('nav-down');
    }

});

adjustNav();

function backToTop() {

    $(".BackToTop").on('click', function (e) {
        e.preventDefault();
        $("html,body").animate({scrollTop: 0}, 800);

    });

}


var currentUser;
var mlabBaseURL = 'https://api.mlab.com/api/1/';
var apiKey = 't9yAgVEw_sJ7PF5VGvriUIhl4beUWwNo';
var dbURL = 'databases/speaker_db/collections/speakers';


function setBindings() {

    $("#signup").click(function () {
        $(".signupModal").css("visibility", "visible");
    });

    $(".bg1").click(function () {
        $(".signupModal").css("visibility", "hidden");
    });

    $(".logInLink").click(function () {
        $(".signupModal").css("visibility", "hidden");
        $(".loginModal").css("visibility", "visible");
    });


    $("#login").click(function () {
        $(".loginModal").css("visibility", "visible");
    });

    $(".bg2").click(function () {
        $(".loginModal").css("visibility", "hidden");
    });
    $(".bg3").click(function () {
        $(".topic").css("visibility", "hidden");
    });


    $(".signUpLink").click(function () {
        $(".loginModal").css("visibility", "hidden");
        $(".signupModal").css("visibility", "visible");
    });

    $("#loginForm").submit(function (e) {

        e.preventDefault();
        var un = $("#username").val();
        var pw = $("#password").val();

        var queryURL = mlabBaseURL + dbURL + '?q={"email": "' + un + '", "password": "' + pw + '"}&fo=true&apiKey=' + apiKey;


        $.ajax({
            url: queryURL,
            success: function (data) {
                // console.log(data);
                if (data === null) {
                    console.log("nothing");
                    swal('Sorry, we don\'t recognize this email.');
                    closePopUps();
                } else {

                    console.log('logged in ', data);
                    closePopUps();

                    swal(
                        'Good job!',
                        'You clicked the button!',
                        'success'
                    );
                    currentUser = data;
                    $(".afterLogIn").css("visibility", "visible");
                    $(".addTopic").css("visibility", "visible");
                    addTopic();
                    $(".welcomeUser").css("display", "block");
                    $("#name").html('Welcome' + ' ' + 'back,' + ' ' + currentUser.name + '!');
                    $(".links").css("display", "none");
                }


            },
            fail: function (error) {
                alert("error", error);
            }
        })

    });

    $("#signUpForm").submit(function (e) {
        e.preventDefault();

        var fullName = $("#su-fullName").val();
        var un = $("#su-userName").val();
        var pass = $("#su-password").val();
        var bio = $("#su-bio").val();

        console.log('data ', un);

        var js = {
            "name": fullName,
            "speakerImage": "",
            "email": un,
            "password": pass,
            "bio": bio,
            "topics": []


        }

        //this is the get user url
        var queryURL = mlabBaseURL + dbURL + '?q={"email":"' + un + '","password":"' + pass + '"}&fo=true&apiKey=' + apiKey;

        $.ajax({
            url: queryURL,
            success: function (data) {
                console.log('data ', data);

                if (data == null) {
                    //this is where you would make another ajax call and add the user.
                    console.log('null ', data);
                    $.ajax({
                        url: mlabBaseURL + dbURL + '?apiKey=' + apiKey,
                        data: JSON.stringify(js),
                        success: function (data) {
                            console.log('added', data);
                            currentUser = data;
                            closePopUps();
                        },
                        type: "POST",
                        contentType: "application/json"
                    });

                    swal(
                        'Good job!',
                        'You clicked the button!',
                        'success'
                    );
                } else {
                    //here is if they are already in the db and then just log them in
                    console.log('Signed Up', data);
                    closePopUps();
                }

            },
            error: function (error) {
                console.log(error);

            }
        });


    })

}

function addTopic() {
    $(".addTopic").add(".addMoreTopic").click(function () {
        swal.setDefaults({
            input: 'text',
            confirmButtonText: 'Next &rarr;',
            showCancelButton: true,
            animation: false,
            progressSteps: ['1', '2']
        })

        var steps = [
            {
                title: 'Topic Submission',
                text: 'Add your speaker topic.'
            },
            {
                title: 'Topic Description',
                text: 'Add your topic description.'
            }

        ]

        swal.queue(steps).then(function (result) {
            swal.resetDefaults()
            swal({
                title: 'All done!',
                html: 'Topic Title: <pre>' +
                result[0] +
                '</pre>' +
                'Topic Description: <pre>' +
                result[1] +
                '</pre>',
                confirmButtonText: 'Lovely!',
                showCancelButton: true
            })

            var topicInfo = {
                topicName: result[0],
                topicDescription: result[1]
            };

            updateTopic(result[0], result[1]);
        }, function () {

            swal.resetDefaults();

        })
    })

}

function updateTopic(topicName, topicDescription) {

    currentUser.topics.push(
        {
            topicName: topicName,
            topicDescription: topicDescription
        }
    );
    $('.topic').css("visibility", "visible");
    $('.topicList ul').html('');

    console.log(currentUser.topics);

    $.each(currentUser.topics, function (index, topic) {
        $('.topicList ul').append('<li><p>Topic Name: ' + topic.topicName + '</p></li>' + '<li><p>Topic Description: ' + topic.topicDescription + '</p></li>');
    });

    $.ajax({
        url: mlabBaseURL + dbURL + '/' + currentUser._id.$oid + '?apiKey=' + apiKey,
        data: JSON.stringify({"$set": {topics: currentUser.topics}}),
        type: "PUT",
        contentType: "application/json"
    });

}

function closePopUps() {
    $(".form-wrapper").css('display', 'none');
}