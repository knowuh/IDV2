window.loadSpreadsheet = function(spreadsheetID, parentCallback) {
  spreadsheetID = spreadsheetID || "1tL7m0JNa0CZwEyU9WmB3u8j5T829jqtbnu-26ibPp5E";
  parentCallback = parentCallback || function(data) {
    console.log(data);
  };

  var baseUrl = "https://spreadsheets.google.com/feeds/list/";
  var callbackUrl = "?alt=json-in-script";
  var version = "/1/public/values";
  var url =  baseUrl + spreadsheetID + version + callbackUrl;

  var returnV = [];
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
