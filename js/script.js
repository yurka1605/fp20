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

/** ======================== User actions ========================== **/
// slider arrows
$('.slider__control').on('click', function(e) {
    e.preventDefault();
    const slider = $(this).parent().parent();
    changeSlide(slider, $(this).hasClass('left'));
});

// send form 
$('.banner__form button').click(function(e) {
    e.preventDefault();
    var data = {
        "Имя": $(this).parent().children('.form__inputs').children('input[name="name"]').val(),
        "Телефон": $(this).parent().children('.form__inputs').children('input[name="phone"]').val(),
    }
    $.ajax({
        type: 'POST',
        url: 'https://yurka1605.github.io/uropoten/mail.php',
        data: data
    }).done(() => {
        $(this).parent().children('.form__inputs').children('input[name="name"]').val('');
        $(this).parent().children('.form__inputs').children('input[name="phone"]').val('');
    });
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
    
    var left = $(firtsSlide).width() * (num - 1) + ($(window).width() > 992 ? 30 * (num - 1) : 0);

    if ($(window).width() < 992 && $(slider).hasClass('feedback__slider')) {
        left = left / 2;
    }
    $( firtsSlide ).animate({ marginLeft: `${ - left }px`}, 200);
    $(current).removeClass('active');
    $(slides[num - 1]).addClass('active');
}
/** ======================== END:Functions ========================== **/