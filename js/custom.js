(function ($) {
    'use strict';
    window.sr = new scrollReveal({
        reset: false
        , delay: 'always'
        , vFactor: 0.10
        , mobile: true
    });

    function resizeFix() {
        if ($(window).width() > 992) {
            $('#cssmenu').find('ul').show();
        }
    }
    $(window).resize(function () {
        resizeFix();
    });
    $(document).ready(function () {
        resizeFix();
    });
})(jQuery);
$(document).ready(function () {
    resizeFix();
    $('.accordion:first-child').find('.accordion_body').css('display', 'block');
    $('.accordion:first-child').find('.accordion_head .plusminus').text('-');
    $(".accordion_head").click(function () {
        if ($('.accordion_body').is(':visible')) {
            $(".accordion_body").slideUp('slow');
            $(".plusminus").text('+');
        }
        if ($(this).next(".accordion_body").is(':visible')) {
            $(this).next(".accordion_body").slideUp('slow');
            $(this).children(".plusminus").text('+');
        }
        else {
            $(this).next(".accordion_body").slideDown('slow');
            $(this).children(".plusminus").text('-');
        }
    });
    if ($("#slider2").length > 0) {
        $("#slider2").unslider({
            nav: false
            , autoplay: true
            , delay: 7000
        });
        $("#slider5").unslider({
            nav: false
            , autoplay: true
            , delay: 8000
        });
        $("#testimonial").unslider({
            autoplay: true
            , arrows: false
            , delay: 6000
        });
    }
});
//validation Start
if ($("#register").length > 0) {
    $("#register").validate({
        // Specify the validation rules
        ignore: ""
        , rules: {
            name: "required"
            , email: "required"
            , phone: "required"
            , company: "required"
        , }, // Specify the validation error messages
        messages: {
            name: "Please enter your first name"
            , email: "Please enter your email address"
            , phone: "Please enter your phone number"
            , company: "Please enter your company name"
        }
        , submitHandler: function (form) {
            $("#loadingImg").show();
            var formData = $(form).serialize();
            $.ajax({
                type: 'POST'
                , url: $(form).attr('action')
                , data: formData
            }).done(function (response) {
                $("#loadingImg").hide();
                var successMsg = "Thank you, " + "will get back to you shortly...";
                $('.success').show();
                $('.success').html(successMsg);
                $(form).find("input[type=text], input[type=email], textarea").val("");
                setTimeout(function () {
                    $('.success').hide();
                    $('.success').html('');
                }, 9000);
            }).fail(function (data) {
                console.log('fail');
                if (data.responseText !== '') {
                    $('.success').html(data.responseText);
                }
                else {
                    $('.success').html('Oops! An error occured and your message could not be sent.');
                }
            });
            return false;
        }
    });
}
//validation End
//Filter Plugin Start
$(function () {
    if ($("#portfoliolist").length > 0) {
        var filterList = {
            init: function () {
                $('#portfoliolist').mixItUp({
                    selectors: {
                        target: '.portfolio'
                        , filter: '.filter'
                    }
                    , load: {
                        filter: '.win, .wpf, .addin, .ios, .mac'
                    }
                });
            }
        };
        filterList.init();
    }
});
//Filter Plugin End
//Menu Plugin Start
function resizeFix() {
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    var cssmenu = $('.menu');
    if (width > 768) {
        $('.cd-dropdown-trigger').removeClass('mobile');
    }
    else {
        $('.cd-dropdown-trigger').addClass('mobile');
        //        $('.mobile').on('click', function (event) {
        //            event.preventDefault();
        //            $(this).toggleClass('active-mob');
        //            $('.cd-dropdown').addClass('dropdown-is-active');
        //            $('body').addClass('menu-active');
        //        });
        $(".mobile").on("click", function () {
            $("body").toggleClass("menu-active");
            $(this).toggleClass('active-mob');
            $('.cd-dropdown').toggleClass('dropdown-is-active');
        });
        //close meganavigation
        //        $('.active-mob').on('click', function (event) {
        //            event.preventDefault();
        //            $('.cd-dropdown').removeClass('dropdown-is-active');
        //            $('body').removeClass('menu-active');
        //        });
        //        $(document).on('click', '.active-mob', function () {
        //                alert(1);
        //                event.preventDefault();
        //                $('.cd-dropdown').removeClass('dropdown-is-active');
        //                $('body').removeClass('menu-active');
        //            })
        //on mobile - open submenu
        $('.has-children').children('a').on('click', function (event) {
            //prevent default clicking on direct children of .has-children 
            event.preventDefault();
            var selected = $(this);
            selected.next('ul').removeClass('is-hidden').end().parent('.has-children').parent('ul').addClass('move-out');
        });
        //submenu items - go back link
        $('.go-back').on('click', function () {
            var selected = $(this)
                , visibleNav = $(this).parent('ul').parent('.has-children').parent('ul');
            selected.parent('ul').addClass('is-hidden').parent('.has-children').parent('ul').removeClass('move-out');
        });
    }
}
$(window).resize(function () {
    resizeFix();
});
//Menu Plugin End
$('.client-logo').slick({
    dots: true
    , infinite: true
    , speed: 300
    , slidesToShow: 4
    , slidesToScroll: 4
    , autoplay: true
    , responsive: [
        {
            breakpoint: 1024
            , settings: {
                slidesToShow: 3
                , slidesToScroll: 3
                , infinite: true
                , dots: true
            }
    }
        , {
            breakpoint: 600
            , settings: {
                slidesToShow: 2
                , slidesToScroll: 2
            }
    }
        , {
            breakpoint: 480
            , settings: {
                slidesToShow: 1
                , slidesToScroll: 1
            }
    }
  ]
});
//home page canvas bubble animation
window.onload = init();

function init() {
    if ($('canvas').length > 0) {
        canvas = document.getElementById('canvas');
        context = canvas.getContext('2d');
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
        mouse = {
            x: 0
            , y: 0
        };
        colors = [
'#af0'
];
        // canvas.addEventListener('mousemove',MouseMove,false);
        // canvas.addEventListener('mousedown',MouseDown,false);
        // canvas.addEventListener('mouseup',MouseUp,false);
        window.addEventListener('resize', canvasResize, false);
        dotsHolder = [];
        mouseMove = true;
        mouseDown = true;
        for (i = 0; i < 100; i++) {
            dotsHolder.push(new dots());
        }
        /*REQUEST ANIMATION FRAME*/
        (function () {
            var lastTime = 0;
            var vendors = ['ms', 'moz', 'webkit', 'o'];
            for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
                window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
                window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
            }
            if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function () {
                    callback(currTime + timeToCall);
                }, timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
            if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
                clearTimeout(id);
            };
        }());
    }
}

function canvasResize(event) {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    cancelAnimationFrame(animate);
}

function MouseUp(event) {
    if (mouseMove) {
        mouseMove = false;
    }
    if (mouseDown) {
        mouseDown = false;
    }
}

function MouseDown(event) {
    mouseDown = true;
}

function MouseMove(event) {
    mouse.x = event.pageX - canvas.offsetLeft;
    mouse.y = event.pageY - canvas.offsetTop;
    if (mouseMove) {
        context.lineTo(mouseX, mouseY);
        context.stroke();
    }
}

function dots() {
    this.xPos = Math.random() * canvas.width;
    this.yPos = Math.random() * canvas.height;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.radius = Math.random() * 15;
    this.vx = Math.cos(this.radius);
    this.vy = Math.sin(this.radius);
    this.stepSize = Math.random() / 15;
    this.step = 0;
    this.friction = 7;
    this.speedX = this.vx;
    this.speedY = this.vy;
}
dots.draw = function () {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (var c = 0; c < dotsHolder.length; c++) {
        dot = dotsHolder[c];
        context.beginPath();
        distanceX = dot.xPos - mouse.x;
        distanceY = dot.yPos - mouse.y;
        var particleDistance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        var particleMouse = Math.max(Math.min(75 / (particleDistance / dot.radius), 7), 1);
        context.fillStyle = dot.color;
        dot.xPos += dot.vx;
        dot.yPos += dot.vy;
        if (dot.xPos < -50) {
            dot.xPos = canvas.width + 50;
        }
        if (dot.yPos < -50) {
            dot.yPos = canvas.height + 50;
        }
        if (dot.xPos > canvas.width + 50) {
            dot.xPos = -50;
        }
        if (dot.yPos > canvas.height + 50) {
            dot.yPos = -50;
        }
        context.arc(dot.xPos, dot.yPos, (dot.radius / 2.5) * particleMouse, 0, 2 * Math.PI, false);
        context.fill();
        if (mouseDown) {
            var minimumDistance = 164
                , distance = Math.sqrt((dot.xPos - mouse.x) * (dot.xPos - mouse.x) + (dot.yPos - mouse.y) * (dot.yPos - mouse.y))
                , distanceX = dot.xPos - mouse.x
                , distanceY = dot.yPos - mouse.y;
            if (distance < minimumDistance) {
                var forceFactor = minimumDistance / (distance * distance)
                    , xforce = (mouse.x - dot.xPos) % distance / 7
                    , yforce = (mouse.y - dot.yPos) % distance / dot.friction
                    , forceField = forceFactor * 2 / dot.friction;
                dot.vx -= forceField * xforce;
                dot.vy -= forceField * yforce;
            }
            if (dot.vx > dot.speed) {
                dot.vx = dot.speed / dot.friction;
                dot.vy = dot.speed / dot.friction;
            }
            else if (dot.vy > dot.speed) {
                dot.vy = dot.speed / dot.friction;
            }
        }
    }
}

function animate() {
    if ($('canvas').length > 0) {
        requestAnimationFrame(animate);
        dots.draw();
    }
}
animate();