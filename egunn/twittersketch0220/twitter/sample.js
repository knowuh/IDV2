
var mapData = function(tweet) {
    var favorites = tweet.favorite_count;
    var user = tweet.user.screen_name;
    var text = tweet.text;
    return {text: text, user: user, favorites: favorites}
}


var displayData = function() {
    var statuses = window.statuses;
    var stats = _.map(statuses, mapData);

    var domTweets = d3.select("#tweetContainer").selectAll(".tweet").data(stats);

    domTweets.enter().append("div")
      .attr("class","tweet");

    domTweets.html(function (d) {
        return "<span class='user'>" + d.user + "</span><span class='text'>" + d.text + "</span>";
    });

    domTweets.exit().remove();
}

$(document).ready(displayData);