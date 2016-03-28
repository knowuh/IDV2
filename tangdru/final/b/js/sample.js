
var mapData = function(tweet) {
    var favorites = tweet.favorite_count;
    var user = tweet.user.screen_name;
    var text = tweet.text;
    var language = tweet.lang;
    console.log(language);// this is the data. 
    
    return {text: text, user: user, favorites: favorites, language: language};
    
}

var zikaData = function(tweet){
    var time = tweet.created_at; 
    var hashtag = tweet.hashtags; 
    var language = tweet.lang;
    var id = tweet.user.id;
    var location = tweet.location;
    return {text: text, user: user, favorites: favorites};
}


var displayData = function() {
    var statuses = window.statuses;  //window is where you put all your globarl variables. 
    var stats = _.map(statuses, mapData); //statuses is where the data is connected 

    var domTweets = d3.select("#tweetContainer").selectAll(".tweet").data(stats);

    domTweets.enter().append("div")
      .attr("class","tweet");

    domTweets.html(function (d) {
        return "<span class='user'>" + d.user + "</span><span class='text'>" + d.text + "</span>";
    });

    domTweets.exit().remove();
}

$(document).ready(displayData);  //when all data is ready, call displayData function