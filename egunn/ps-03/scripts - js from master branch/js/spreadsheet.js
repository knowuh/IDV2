//Library to access and load data from GoogleSpreadsheets //and send callback to the calling function.

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
    //loDash library - utilities for messing with data
    //get values from Google, trim out whitespace
    //split string into an array at the commas
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

    //Use jquery to ask ajax to make a web request 
    //hand it URL we want to query (Google Spreadsheets), 
    //take back response and process using trimming function
  $.ajax({
    url: url,
    jsonp: "callback",
    dataType: "jsonp",
    success: function(response) {
      var result = processResponse(response.feed.entry);
        //call this function with the data that we get back from Google
      parentCallback(result);
    }
  });
};
