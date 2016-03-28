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
    // uncomment to continously load data
  //setInterval(getData, intervalms);
};