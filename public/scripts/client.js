/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

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
          <p>${tweetObj.content.text}</p>
          <hr>
        </div>
        <footer>
          <div><b>${tweetObj.created_at}</b></div>
          <div>
            <button class="icon flag"><i class="fas fa-flag"></i></button>
            <button class="icon retweet"><i class="fas fa-retweet"></i></button>
            <button class="icon heart"><i class="fas fa-heart"></i></button>
          </div>
        </footer>
      </article>`);
    return $tweet;
  }

});

