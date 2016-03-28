
var tags = {};
var addTag = function(tag) {
  var t = tag.toLowerCase().trim()
  tags[t] = tags[t] ? tags[t] + 1 : 1;
}

var sortTags = function(tags) {
  var sortedTags = [];
  for (tag in tags) {
    sortedTags.push({tag: tag, value: tags[tag]});
  }

  sortedTags.sort(function(tagA,tagB) {return tagB.value - tagA.value;} )
  return sortedTags;
}

var displayData = function (tweets) {
  for(var i=0; i < tweets.length; i++) {
    var tweet = tweets[i];
    if (tweet.favorite_count === undefined) {
      tweet.favorite_count = 0;
    }
  }
  tweets.sort(function(tweetA,tweetB) {
    return tweetB.favorite_count - tweetA.favorite_count;
  });

  for(var i=0; i < tweets.length; i++) {
    var tweet = tweets[i];
    for(var j=0; j < tweet.hashtags.length; j++) {
      var tag = tweet.hashtags[j];
      addTag(tag);
    }
  }
  tags = sortTags(tags);

  var sizeScale = d3.scale.linear()
    .domain([0, d3.max(tweets, function(tweet) { return tweet.favorite_count})])
    .range([20,200]);

  var domTweets = d3.select("#tweetContainer")
    .selectAll("img.tweet")
    .data(tweets);

  domTweets.enter().append("img")
    .attr("class", "tweet");

  domTweets
    .attr('src', function (tweet) {
      return tweet.image;
    })
    .style('width', function (tweet) {
      return (sizeScale(tweet.favorite_count) + "px");
    });

  domTweets.exit().remove();
  console.log('loaded');
}

d3.json("fashion.json", displayData);