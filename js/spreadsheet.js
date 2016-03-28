// Use this method to call your parentCallback function with the spreadhseet data
// your `parentCallback` function should look like `var loadData = function(spreadsheetResults) { … }`
window.loadSpreadsheet = function(spreadsheetID, parentCallback) {
  spreadsheetID = spreadsheetID || "1tL7m0JNa0CZwEyU9WmB3u8j5T829jqtbnu-26ibPp5E";
  parentCallback = parentCallback || function(data) {
    console.log(data);
  };

  var baseUrl = "https://spreadsheets.google.com/feeds/list/";
  var callbackUrl = "?alt=json-in-script";
  var version = "/1/public/values";
  var url =  baseUrl + spreadsheetID + version + callbackUrl;

  // Google returns an array[] of ugly row objects
  // Rows values are stored in row.content.$t, as {"columnName1: value1, columnName2: value2}
  // mapValues turns one row value into an object that is easier to work with.
  // The return row just looks like {column1: 'value1', column2: 'value2'}
  // see the [lowdash documentation](https://lodash.com/docs)
  var mapValues = function(value) {
    var stringValues = _.trim(value.content.$t).split(',');
    var arrayValue = _.map(stringValues, function(s) {
      return _.trim(s).split(": ");
    });
    return _.zipObject(arrayValue);
  };

  var processResponse = function(list){
    returnv = _.map(list, mapValues);
    return returnv;
  };

  $.ajax({
    url: url,
    jsonp: "callback",
    dataType: "jsonp",
    success: function(response) {
      var result = processResponse(response.feed.entry);
      parentCallback(result);
    }
  });
};

// Use this function to call your parentCallback function every interval seconds
// your function will receive the spreadsheet data as the first arugument.
window.continuouslyLoadData = function(spreadheetID, parentCallback, interval) {
  interval= interval || 5;
  var intervalms = interval * 1000; // convert seconds to miliseconds
  var getData = function() {
    loadSpreadsheet(spreadheetID, parentCallback);
  };
  getData();
  setInterval(getData, intervalms);
};