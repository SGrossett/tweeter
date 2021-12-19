/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  $(`.display-error`).hide();
  

  // Function used to prevent Cross-Site Scripting
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Takes in an object with user & tweet information
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

  // Loops through tweets
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
      success: (tweets) => renderTweets(tweets),
      error: (err) => console.log(`Error: ${err}`)
    });
  };

  loadTweets();

  // Event listener for submit and prevent its default behaviour
  // Serializer the form data and send it to the server as a query string
  $("form").on("submit", function(event) {
    event.preventDefault();

    const $formData = $(this).serialize();
    const tweetText = $(this).children('textarea').val();
    
    if (!tweetText) {
      $('.errorMsg').text('Tweets must be at least one character long');
      //$(`.display-error`).slideDown();
      setTimeout(() => {
        $(`.display-error`).slideDown();
      }, 400);
    } 
   
    if (tweetText.length > 140) {
        $('.errorMsg').text('Tweet capacity reached. Shorten it a bit. Thanksss');
        return $(`.display-error`).slideDown('slow');
    }

    $.ajax({
      url: '/tweets/',
      method: 'POST',
      data: $formData,
      success: () => {
        $(`.display-error`).slideUp();
        loadTweets();
        $(this).children('textarea').val('');
      },
      error: (err) => console.log(`Error: ${err}`)
    });
  });

  // // Listen for a click on the button
  // Then toggle (add/remove) the .dark-theme class to the body
  $('.btn-toggle').on('click', function() {
    document.body.classList.toggle('dark-theme');
    $("i", this).toggleClass("far fa-moon fas fa-moon");
  });

  // Toggle icon for .dark-theme and .light-theme
  $('.dark-mode button').click(function() {
    $("i", this).toggleClass("'far fa-moon' 'fas fa-moon'");
  });

});
