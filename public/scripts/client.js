$(document).ready(function() {

  $(`.display-error`).hide();
  

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Generates HTML markup to display tweet
  const createTweetElement = function(tweetObj) {
    const $tweet = $(
      `<article class="tweet">
        <header>
          <div class="profile">
            <img src="${tweetObj.user.avatars}" alt="${tweetObj.user.name}-profile-pic" class="profile-pic">
            <h4>${tweetObj.user.name}</h4>
          </div>
          
          <div class="handle">
            <h5>${tweetObj.user.handle}</h5>
          </div>
        </header>
        <div>
          <p>${escape(tweetObj.content.text)}</p>
          <hr>
        </div>
        <footer>
          <div><b>${timeago.format(tweetObj.created_at)}</b></div>
          <div>
            <button class="icon flag"><i class="fas fa-flag"></i></button>
            <button class="icon retweet"><i class="fas fa-retweet"></i></button>
            <button class="icon heart"><i class="fas fa-heart"></i></button>
          </div>
        </footer>
      </article>`);
  return $tweet;
};

  // Calls createTweetElement for each tweet
  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      const $tweetContainer = $("#tweet-container");
      $tweetContainer.prepend($tweet);

    }
  };

  // Adds tweet to the DOM
  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: (tweets) => {
        $(`#tweet-container`).empty()
        renderTweets(tweets)
      },
      error: (err) => console.log(`Error: ${err}`)
    });
  };

  loadTweets();

  $('.new-tweet textarea').on('input', function() {
    const tweetLength = $(this).val().length;
    
    if (tweetLength <= 140) {
      $(`.display-error`).slideUp('slow');
    }
  });
  
  // Prevent sumbit default behaviour
  // Serialize the form data and send it to the server 
  $("form").on("submit", function(event) {
    event.preventDefault();

    const $formData = $(this).serialize();
    const tweetText = $(this).children('textarea').val();
    
    if (!tweetText) {
      $('.errorMsg').text('Tweets must be at least one character long');
      setTimeout(() => {
        $(`.display-error`).slideDown();
      }, 400);
    } 
   
    if (tweetText.length > 140) {
        $('.errorMsg').text('Tweet capacity reached. Shorten it a bit. Thanksss');
        return $(`.display-error`).slideDown('slow');
    }

    // On submit: hide error, load tweet, clear text area, reset counter
    $.ajax({
      url: '/tweets/',
      method: 'POST',
      data: $formData,
      success: () => {
        $(`.display-error`).slideUp();
        loadTweets();
        $(this).children('textarea').val('');
        $('.counter').text(140);
      },
      error: (err) => console.log(`Error: ${err}`)
    });
  });

  // Then toggle (add/remove) the .dark-theme class to the body
  $('.btn-toggle').on('click', function() {
    document.body.classList.toggle('dark-theme');
    $("i", this).toggleClass("far fa-moon fas fa-moon");
  });

  // Toggle icon for .dark-theme and .light-theme
  $('.dark-mode button').click(function() {
    $("i", this).toggleClass("'far fa-moon' 'fas fa-moon'");
  });

  // Focus on textarea when anywhere on the #write-new div is clicked
  $('#write-new').on('click', function() {
    $('#tweet-text').focus();
  });


  // Checks if the window is at the top. Displays button if not
  $(window).scroll(function() {

  // Show button after 200px
  var showAfter = 200;
  if ($(this).scrollTop() > showAfter) {
    $('.back-to-top').fadeIn();
  } else {
    $('.back-to-top').fadeOut();
  }
 });

  // Click event to scroll to top
  $('.back-to-top').on('click', function() {
    $('html, body').animate({scrollTop : 0}, 800);
    return false;
  });
});
