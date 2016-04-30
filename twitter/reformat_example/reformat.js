
// Make a collection of tweets by cuntry code, including only X,Y
function reformat(data) {
  var trimmed = _.map(data, function(tweet) {
    return { 'country': tweet.country,
     'screen_name': tweet.screen_name,
     'tweet': tweet.text  }

  });
  var new_data = _.groupBy(trimmed, 'country');
  debugger
};

d3.json("zika-new.json", function(json) {
  reformat(json)
});
