$( document ).ready(function() {
    $('#topPhone').mask('+7 (999) 999-9999');
    $('#bottomPhone').mask('+7 (999) 999-9999');

    var timeID = setInterval(() => {
        const hoursHtml = $('.time .hours');
        const minutesHtml = $('.time .min');
        const secHtml = $('.time .sec');
        const hours = parseInt($(hoursHtml).html(), 10);
        const min = parseInt($(minutesHtml).html(), 10);
        const sec = parseInt($(secHtml).html(), 10);

        if (hours === 0 && min === 0 && sec === 0) {
            clearInterval(timeID);
        } else {
            if (min === 0 && sec === 0) {
                $(hoursHtml).text(hours > 10 ? `${ hours - 1 }` : `0${ hours - 1 }`);
                $(minutesHtml).text('59');
                $(secHtml).text('59');
            } else {
                if (sec === 0) {
                    $(minutesHtml).text(min > 10 ? `${ min - 1 }` : `0${ min - 1 }`);
                    $(secHtml).text('59');
                } else {
                    $(secHtml).text(sec > 10 ? `${ sec - 1 }` : `0${ sec - 1 }`);
                }
            }
        }
    }, 1000);
});

$(window).scroll(() => {
    const top = $(window).scrollTop();
    const heightX2 = $('.header__scroll').height() * 2;
    const isScroll = $('.header__scroll').hasClass('scroll');
    if (top > heightX2 && !isScroll) {
        $('.header__scroll').addClass('scroll');
    } else if (top < heightX2 && isScroll) {
        $('.header__scroll').removeClass('scroll');
    }
});

/** ======================== User actions ========================== **/
// scroll to form
$('.important__btn, .header__btn').on('click', function(e) {
    e.preventDefault();
    const elTop = $(this).offset().top;
    const headerTop = $('.banner__main').offset().top - 40;
    const footerTop = $('.footer__form').offset().top;
    const topHeader = Math.abs(elTop - headerTop);
    const topFooter = Math.abs(elTop - footerTop);
    $('html, body').animate({scrollTop: topHeader > topFooter ? footerTop : headerTop }, 300);
})

// slider arrows
$('.slider__control').on('click', function(e) {
    e.preventDefault();
    const slider = $(this).parent().parent();
    changeSlide(slider, $(this).hasClass('left'));
});

// swipe
$('.feedback__slider').swipe({
    swipeLeft: leftSwipe,
    swipeRight: rightSwipe,
    threshold: 30
});

// card swipe
function leftSwipe() {
    changeSlide($('.feedback__slider'), true);
}
function rightSwipe() {
    changeSlide($('.feedback__slider'), false);
}

// send form 
$('.banner__form_btn, .footer__form_btn').click(function(e) {
    e.preventDefault();
    var data = {
        "Имя": $(this).parent().children('input[name="name"]').val(),
        "Телефон": $(this).parent().children('input[name="phone"]').val(),
    }
    $.ajax({
        type: 'POST',
        url: 'mail.php',
        data: data
    }).done(() => {
        $(this).parent().children('input[name="name"]').val('');
        $(this).parent().children('input[name="phone"]').val('');
    }).error(e => {
        console.log(e);
    });
});

// click menu item
$('.nav-item:not(.active)').click(function(e) {
    e.preventDefault();
    var className = $(this).data('class');
    var top = $(`section.${ className }`).offset().top - 40;
    $('html, body').animate({scrollTop: top}, 300);
});
/** ======================== END:User actions ========================== **/


/** ======================== Functions ========================== **/
// main change slide
function changeSlide(slider, arrow) {
    var slides = $(slider).children('.slide');
    var firtsSlide = slides[0];
    var lastNum = slides.length;
    var current = $(slider).children('.slide.active');
    var num = $(current).data('num');

    if (arrow) {
        num = num === 1 ? lastNum : num - 1;
    } else {
        num = num === lastNum ? 1 : num + 1;
    }

    var left = $(firtsSlide)[0].offsetWidth * (num - 1);
    $( firtsSlide ).animate({ marginLeft: `${ - left }px`}, 200);
    $(current).removeClass('active');
    $(slides[num - 1]).addClass('active');
}
/** ======================== END:Functions ========================== **/