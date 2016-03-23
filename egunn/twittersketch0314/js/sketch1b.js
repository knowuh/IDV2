//Next steps:
//Attach to live twitterstream data, update nodes accordingly.
//Click on a tweet to view activity over time. (Check to see if possible, without locating retweets //themselves).
//Expand to follow multiple levels of retweeting


//figure out why the plot div height has to be set to a hard (rather than percentage) value //in the CSS
//why can't mouse leave canvas during force minimization?

//set some margins and record width and height of window
//var margin = {t:25,r:40,b:25,l:40};

var width2 = document.getElementById('plot2').clientWidth - margin.r - margin.l,  
    height2 = document.getElementById('plot2').clientHeight - margin.t - margin.b;

//for now, not linked to actual data - later, set max according to numbers stored in data object. 
var radiusScale2 = d3.scale.sqrt().domain([0,20000]).range([10,50]);


//select the HTML plot element by id 
var canvas2 = d3.select(".plot2");

// Define the div for the tooltip
var div = d3.select(".plot2").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);

plot2 = canvas2.append('svg')
    .attr('width',width2+margin.r+margin.l)
    .attr('height',height2 + margin.t + margin.b)
    .append('g')
    .attr('class','canvas2')
    .attr('transform','translate('+margin.l+','+margin.t+')');

/*
//Test code to load JSON data directly from PHP/TwitterAPI. Works, but queries 1x/refresh.
//Replace with static data file for now.
d3.json("http://ericagunn.com/Twitter/TwitterDataApp.php",function(error,webTwitter){
  console.log(webTwitter)  
})
*/

function drawUsers(data) {
    
    twitterData=data;
    
    console.log(data);
    
}