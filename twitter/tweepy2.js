var awsSecret="";
var awsId="";
var db;
var tweetCollection = [];
var now = new Date();
var nowTimeStamp = Math.floor(now.getTime("FRI FEB 05 06:44:20 +0000 2016")/1000);
var sums =[];
var firstTweet;
var lastTweet;
var images = [];

var query = function(term, callback) {
  var lastKey = null;
  var params = {};
  var count = 0;
  var found = 0;

  var recentQueryParams = {
    TableName: 'tweets', /* required */
    ConsistentRead: false,
    IndexName: 'search_term-timestamp-index',
    KeyConditions: {
      search_term: {
        ComparisonOperator: 'EQ',
        AttributeValueList: [{S: term}]
      }
    },
    ScanIndexForward: true,
    Select: "COUNT",
    Limit: 1
  };
  db.query(recentQueryParams, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else {
      lastKey = data.LastEvaluatedKey;
    }
  });

  var doQuery = function() {
    params = {
      TableName: 'tweets', /* required */
      AttributesToGet: [
        'screen_name',
        'image',
        'timestamp',
        'created_at',
        'text'
      ],
      //ConditionalOperator: 'AND',
      ConsistentRead: false,
      IndexName: 'search_term-timestamp-index',
      KeyConditions: {
        search_term: {
          ComparisonOperator: 'EQ',
          AttributeValueList: [{S: term}]
        }
      },
      QueryFilter: {
        //  image: {
        //    ComparisonOperator: 'NOT_NULL'
        //  },
        lang: {
          ComparisonOperator: 'EQ',
          AttributeValueList: [{S: 'en'}]
        }
      },
      ScanIndexForward: false
    };
    if (lastKey) {
      params['ExclusiveStartKey'] = lastKey;
    }
    db.query(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else {
        callback(data.Items);
        lastKey = data.LastEvaluatedKey;
        count = count + data.ScannedCount;
        found = found + data.Count;

        $("#counter").text(count);
        $("#found").text(found);
      }
      setTimeout(doQuery, 2000);
    });
  };
  doQuery();
};

var setup = function() {
  akid   = $("#akid").value;
  secret = $("#secret").value;
  AWS.config.update({accessKeyId: akid, secretAccessKey: secret});

  var db = new AWS.DynamoDB();
  db.listTables(function(err, data) {
    console.log(data.TableNames);
  });

  var table = new AWS.DynamoDB({params: {TableName: 'tweets'}});
  var key = 'UNIQUE_KEY_ID';

  // Write the item to the table
  var itemParams = {Item: {id: {S: key}, data: {S: 'data'}}};
  table.putItem(itemParams, function() {
    // Read the item from the table
    table.getItem({Key: {id: {S: key}}}, function(err, data) {
      console.log(data.Item); // print the item dat
    });
  });
};

var connectDB = function() {
  awsSecret = "xr63mlTX2K2Af2J35upAOytR9+/6Tv05F9BlT1xu";
  awsId = "AKIAJE56NP2ZDNDEL5IA";
  if (awsId && awsSecret) {
    AWS.config.update({accessKeyId: awsId, secretAccessKey: awsSecret})
    AWS.config.region = 'us-east-1';

    db = new AWS.DynamoDB();
    db.listTables(function(err, data) {
      if(err) {console.log(err); };
    });
  }
};


var displayTweet = function(tweet) {
  if (tweet.image) {
    $("#images").html("<img src='" + tweet.image.S + "'>");
  }
  $("#tweets").html("<div class='tweet'>" + tweet.text.S + "</div>");
};

var displayTweetStats = function() {
  var firstDate  = firstTweet.created_at;
  var lastDate   = lastTweet.created_at;

  var elapsedMin = Math.floor(elapsedMin);
  $("#first").html("<div class='tweet_date'>" + firstTweet.created_at +"</div>");
  $("#last").html("<div class='tweet_date'>"  + lastTweet.created_at +"</div>");
};

/**************************************************
 * this is the function that updates the D3 graph *
 * @param data – the google spreadsheet data      *
 **************************************************/
var drawGraph = function (data) {
  var svg        = d3.select("#svg");
  var radius     = 100 / data.length;
  var height     = 400 - radius;
  var width      = 600 - radius;

  // A d3 ordinal scale is for discrete categories or names see: https://github.com/mbostock/d3/wiki/Ordinal-Scales
  var xScale = d3.scale.ordinal()
    .domain(d3.range(data.length))
    .rangeRoundPoints([width,radius]);

  var yScale = d3.scale.linear()
    .domain([0,1500])
    .range([height, radius]);

  var circles = svg.selectAll("circle").data(data);

  circles
    .enter()
    .append("circle")
    .append("title")
    .text(function (d) {
      return "name:" + d
    });

  circles
    .attr('r', radius)
    .attr('fill', function (d, i) {
      return 'hsla(1, 20%, 40%, 1.0)';
    })
    .attr("title", function (d) {
      return d||0;
    })
    .attr("cx", function (d, i) {
      return xScale(i);
    })
    .attr("cy", function (d) {
      var val = d || 0;
      if(typeof val === undefined) {
        debugger;
      }
      return yScale(val);
    });

  circles.exit().remove();
};

var addTweets = function (tweets) {
  var data, tweet, timeDiff;
  debugger
  for (i = 0; i < tweets.length; i++) {
    data = tweets[i];
    tweet = {
      'screen_name': data.screen_name.S,
      'image': data.image,
      'timestamp': parseInt(data.timestamp.N),
      'created_at': data.created_at.S,
      'text': data.text.S
    };
    if (tweet.image.S):
    images[tweet.image.S] || = 0
    tweetCollection.push(tweet);
    timeDiff = Math.floor((nowTimeStamp - tweet.timestamp) / 3600);
    sums[timeDiff] = sums[timeDiff] || 0;
    sums[timeDiff] = sums[timeDiff] + 1;
    lastTweet = lastTweet || tweet;
    firstTweet = firstTweet || tweet;
    if (tweet.timeStamp > lastTweet.timestamp) lastTweet = tweet;
    if (tweet.timestamp < firstTweet.timestamp) firstTweet = tweet;
    displayTweetStats();
  }
  drawGraph(sums);

};

var go = function() {
  connectDB();
  if (db) {
    query('#zika', addTweets);
  };
};

$(document).ready(go);
