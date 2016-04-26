//set some margins and record width and height of window
var margin = {t:25,r:40,b:25,l:40};

var width = document.getElementById('plot').clientWidth - margin.r - margin.l,  
    height = document.getElementById('plot').clientHeight - margin.t - margin.b;

//select the HTML plot element by class
var canvas = d3.select(".plot");

// Define the div for the tooltip
var div = d3.select(".plot").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);

plot = canvas.append('svg')
    .attr('width',width+margin.r+margin.l)
    .attr('height',height + margin.t + margin.b)
    .append('g')
    .attr('class','canvas')
    .attr('transform','translate('+margin.l+','+margin.t+')');

//load twitter data, then call draw function.
//d3.json("./twitter_data2.json", function(error, data) {
d3.json("./RoxanneGay_0320_100timeline.json", function(error, data) {
    
    //check that you can access data (this gives follower count for a specific user)
    //console.log(data.statuses[0].user.followers_count); 
    
    parse(data);
})

function parse(data){
    
    var parsedTweets = [];
    
    //converts Twitter date to Unix Epoch time (ms since Jan 1, 1970)
    //date is originally formatted in UTC time.
    data.forEach(function(d){
        var dateParse = Date.parse(d.created_at); 
        d.parsedDate = dateParse;
        parsedTweets.push(d);
        
    })
    

    var sortedTweets = parsedTweets.sort(function(tweetA,tweetB){
        //sorts in date order
        return tweetA.parsedDate - tweetB.parsedDate;
    })

    drawUsers(sortedTweets);
    
}


function drawUsers(data) {
    
    twitterData=data;
    
    timeline = plot.append('g').attr('class','timelines');
    
    var tweetInterval = twitterData[twitterData.length-1].parsedDate - twitterData[0].parsedDate;
    
    for(var i=0; i<4; i++){
        
        timeline.append('line')
            .attr('x1',50)
            .attr('y1',100+i*25)
            .attr('x2',width-50)
            .attr('y2',100+i*25)
            .style('stroke','gray')
            .style('stroke-width',0.2);
        
        timeline.append('text')
            .style('text-anchor','left')
            .attr('x',-15)
            .attr('y',100+i*25+3)
            .style('font-size',10)  
            .style('fill','gray')
            .text(function(d){
                var d = new Date(i*tweetInterval/4+twitterData[0].parsedDate);
                d = d.toString().substring(0,10);
                return d;
            });
    
    }
    
    //set up time length scale (domain = input, range = output)
    //(May want to switch to built in time.scale later?)
    var timeScale1 = d3.scale.linear().domain([0,tweetInterval/4]).range([60,width-60]);
    var timeScale2 = d3.scale.linear().domain([tweetInterval/4,tweetInterval/2]).range([60,width-60]);
    var timeScale3 = d3.scale.linear().domain([tweetInterval/2,3*tweetInterval/4]).range([60,width-60]);
    var timeScale4 = d3.scale.linear().domain([3*tweetInterval/4,tweetInterval]).range([60,width-60]);
    
    //console.log(timeScale1(1450433707000));
    
    twitterData.forEach(function(d){ 
                
        caseValue = Math.floor((d.parsedDate - twitterData[0].parsedDate)/(tweetInterval/4));

        console.log(Math.floor((twitterData[twitterData.length-1].parsedDate - twitterData[0].parsedDate)/(tweetInterval/4)));
        
        switch(caseValue){
            case 0: 
                //console.log(timeScale1(d.parsedDate-twitterData[0].parsedDate));
                d.xcoord = timeScale1(d.parsedDate-twitterData[0].parsedDate);
                d.yaxis = 1;
            break;

            case 1: 
                d.xcoord = timeScale2(d.parsedDate-twitterData[0].parsedDate);
                d.yaxis = 2;
            break;

            case 2: 
                d.xcoord = timeScale3(d.parsedDate-twitterData[0].parsedDate);
                d.yaxis = 3;
            break;

            case 3: 
                //console.log(timeScale4(twitterData[twitterData.length-1].parsedDate - twitterData[0].parsedDate));
                d.xcoord = timeScale4(d.parsedDate-twitterData[0].parsedDate);
                d.yaxis = 4;
            break;
                
            case 4: 
                //console.log(timeScale4(twitterData[twitterData.length-1].parsedDate - twitterData[0].parsedDate));
                d.xcoord = timeScale4(d.parsedDate-twitterData[0].parsedDate);
                d.yaxis = 4;
            break;
        }
            
    });
    
    console.log(twitterData);
    
    tweetCircGroup = plot.selectAll('circ')
        .append('g')
        .attr('class','circ-group');
    
    tweetCircGroup    
        .data(twitterData)
        .enter()
        .append('circle')
        .attr('cx',function(d){return d.xcoord})
        .attr('cy',function(d){return (75+(d.yaxis*25))})
        .attr('r',5)
        .style('fill','rgba(153, 185, 230,.6)');
    


    
}