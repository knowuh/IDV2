/**
 * Created by xingyueli on 3/14/16.
 */

var Key = "hVAGGTZYJn3vPA29Oi1iqBRSquWXXpmG331W20Ql"
var Secret = "a53Hn3Z461vithBUzVhxVNnMRrTYh6rWYu6cw75n"


https://api.500px.com/v1/photos/search?term=Hefei&rpp=100&consumer_key=hVAGGTZYJn3vPA29Oi1iqBRSquWXXpmG331W20Ql

var baseFlickrUrl = "https://api.500px.com/v1/photos/search?format=json&nojsoncallback=1&consumer_key="+ Key //format=json requires a json file

var EndUrl1 = baseFlickrUrl + "&term=Hefei&rpp=100"//&nojsoncallback=1 means return json file
var EndUrl2 = baseFlickrUrl + "&term=Boston&rpp=100"

//console.log(url)
d3.json(baseFlickrUrl,function(err,response){

    var url1 = EndUrl1
    var url2 = EndUrl2
    console.log(url1,url2)

    d3.select('#searchAPIUrl1').node().innerHTML = 'Data source1: URL:'+url1;
    d3.select('#searchAPIUrl2').node().innerHTML = 'Data source2: URL:'+url2;


})
