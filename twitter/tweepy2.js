var awsSecret="";
var awsId="";
var db;
var tweetCollection = [];
var now = new Date();
var nowTimeStamp = Math.floor(now.getTime("FRI FEB 05 06:44:20 +0000 2016")/1000);;
var firstTweet;
var lastTweet;
var images = [];
var sums = [];

var query = function(term, complete, update) {
  var count = 0;
  var found = 0;
  var results = [];
  var fetchAttributes = [
    'screen_name',
    'image',
    'timestamp',
    'created_at',
    'text'
  ];
  var queryFilter = {
    //  image: {
    //    ComparisonOperator: 'NOT_NULL'
    //  },
    lang: {
      ComparisonOperator: 'EQ',
      AttributeValueList: [{S: 'en'}]
    }
  };

  var queryParams = {
    TableName: 'tweets', /* required */
    AttributesToGet: fetchAttributes,
    //ConditionalOperator: 'AND',
    ConsistentRead: false,
    IndexName: 'search_term-timestamp-index',
    KeyConditions: {
      search_term: {
        ComparisonOperator: 'EQ',
        AttributeValueList: [{S: term}]
      }
    },
    QueryFilter: queryFilter,
    ScanIndexForward: false
  };

  var delayTime = 20;
  var results = [];

  var doQuery = function() {
    var lastKey = null;
    //debugger;
    try {
      db.query(queryParams, function (err, data) {
        if (err) {
          debugger;
          console.log(err);
        }
        else {
          lastKey = data.LastEvaluatedKey;
          queryParams.ExclusiveStartKey = lastKey;
          count = count + data.ScannedCount;
          found = found + data.Count;
          results = results.concat(data.Items);
          $("#counter").text(count);
          $("#found").text(found);
          if (lastKey) {
            setTimeout(doQuery, delayTime);
          }
        }
      });
    }
    catch (e) {
      console.log("errorrrrrrr! " + e);
    }
  };
  doQuery();
};


var connectDB = function() {
  awsSecret = "xr63mlTX2K2Af2J35upAOytR9+/6Tv05F9BlT1xu";
  awsId = "AKIAJE56NP2ZDNDEL5IA";
  if (awsId && awsSecret) {
    AWS.config.update({accessKeyId: awsId, secretAccessKey: awsSecret})
    AWS.config.region = 'us-east-1';
    db = new AWS.DynamoDB();
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



var go = function() {
  connectDB();
  if (db) {
    query('#zika', function(){} );
  }
};

$(document).ready(go);
