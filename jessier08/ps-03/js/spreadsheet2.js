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
  var mapValues = function(row) {
    var googleIdentifier = "gsx$";
    var result;
    var findGoogleKeys = function(value, key) {
      return _.startsWith(key, "gsx$");
    };

    var renameGoogleKeys  = function(value, key) {
      var result = key.replace(googleIdentifier, '');
      return result.replace(".","");
    };

    var tvalues = function(value, key) {
      return value.$t;
    };
    result = _.pick(row, findGoogleKeys);
    result = _.mapKeys(result,renameGoogleKeys);
    result = _.mapValues(result,tvalues);
    return result;
  }

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
window.continuouslyLoadData = function(spreadsheetID, parentCallback, interval) {
  interval= interval || 5;
  var intervalms = interval * 1000; // convert seconds to miliseconds
  var getData = function() {
    loadSpreadsheet(spreadsheetID, parentCallback);
  };
  getData();
  //setInterval(getData, intervalms);
};