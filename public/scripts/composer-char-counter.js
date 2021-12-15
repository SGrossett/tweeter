$(document).ready(function() {
  $('.new-tweet textarea').on('input', function() {
    const tweetLength = $(this).val().length;
    const maxLength = 140;
    let length = maxLength - tweetLength;

    $('.counter').text(length);
    length < 0 ? $('.counter').css('color', '#f00') : $('.counter').css('color', '#545149');
  });
});

