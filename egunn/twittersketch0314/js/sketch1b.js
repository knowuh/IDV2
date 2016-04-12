//set some margins and record width and height of window
var margin = {t:25,r:10,b:25,l:10};

var userWidth = document.getElementById('user1').clientWidth - margin.r - margin.l,  
    userHeight = document.getElementById('user1').clientHeight - margin.t - margin.b;

var width1 = document.getElementById('plot1').clientWidth - margin.r - margin.l,  
    height1 = document.getElementById('plot1').clientHeight - margin.t - margin.b;

var width2 = document.getElementById('timeline1').clientWidth - margin.r - margin.l,  
    height2 = document.getElementById('timeline1').clientHeight - margin.t - margin.b;


//select the HTML plot element by class
var userCanvas1 = d3.select("#user1");

//select the HTML plot element by class
var timelineCanvas1 = d3.select("#timeline1");

//select the HTML plot element by class
var plotCanvas1 = d3.select("#plot1");


//select the HTML plot element by class
var userCanvas2 = d3.select("#user2");

//select the HTML plot element by class
var timelineCanvas2 = d3.select("#timeline2");

//select the HTML plot element by class
var plotCanvas2 = d3.select("#plot2");


//select the HTML plot element by class
var userCanvas3 = d3.select("#user3");

//select the HTML plot element by class
var timelineCanvas3 = d3.select("#timeline3");

//select the HTML plot element by class
var plotCanvas3 = d3.select("#plot3");


userPlot1 = userCanvas1.append('svg')
    .attr('width',userWidth+margin.r+margin.l)
    .attr('height',userHeight + margin.t + margin.b)
    .append('g')
    .attr('class','userCanvas')
    .attr('transform','translate('+margin.l+','+margin.t+')');

//note: currently using userWidth and Height - if divs change ratio, will need to update!
timelinePlot1 = timelineCanvas1.append('svg')
    .attr('width',width2+margin.r+margin.l)
    .attr('height',height2 + margin.t + margin.b)
    .append('g')
    .attr('class','timelineCanvas')
    .attr('transform','translate('+margin.l+','+margin.t+')');

plot1 = plotCanvas1.append('svg')
    .attr('width',width1+margin.r+margin.l)
    .attr('height',height1 + margin.t + margin.b)
    .append('g')
    .attr('class','canvas1')
    .attr('transform','translate('+margin.l+','+margin.t+')');



userPlot2 = userCanvas2.append('svg')
    .attr('width',userWidth+margin.r+margin.l)
    .attr('height',userHeight + margin.t + margin.b)
    .append('g')
    .attr('class','userCanvas')
    .attr('transform','translate('+margin.l+','+margin.t+')');

//note: currently using userWidth and Height - if divs change ratio, will need to update!
timelinePlot2 = timelineCanvas2.append('svg')
    .attr('width',width2+margin.r+margin.l)
    .attr('height',height2 + margin.t + margin.b)
    .append('g')
    .attr('class','timelineCanvas')
    .attr('transform','translate('+margin.l+','+margin.t+')');

plot2 = plotCanvas2.append('svg')
    .attr('width',width1+margin.r+margin.l)
    .attr('height',height1 + margin.t + margin.b)
    .append('g')
    .attr('class','canvas1')
    .attr('transform','translate('+margin.l+','+margin.t+')');




userPlot3 = userCanvas3.append('svg')
    .attr('width',userWidth+margin.r+margin.l)
    .attr('height',userHeight + margin.t + margin.b)
    .append('g')
    .attr('class','userCanvas')
    .attr('transform','translate('+margin.l+','+margin.t+')');

//note: currently using userWidth and Height - if divs change ratio, will need to update!
timelinePlot3 = timelineCanvas3.append('svg')
    .attr('width',width2+margin.r+margin.l)
    .attr('height',height2 + margin.t + margin.b)
    .append('g')
    .attr('class','timelineCanvas')
    .attr('transform','translate('+margin.l+','+margin.t+')');

plot3 = plotCanvas3.append('svg')
    .attr('width',width1+margin.r+margin.l)
    .attr('height',height1 + margin.t + margin.b)
    .append('g')
    .attr('class','canvas1')
    .attr('transform','translate('+margin.l+','+margin.t+')');


d3.json("./SethGodin_0320_100timeline.json", function(error, data) {
    
    //check that you can access data (this gives follower count for a specific user)
    //console.log(data.statuses[0].user.followers_count); 
    
    //load this link to call data live from Twitter
    //http://ericagunn.com/Twitter/TwitterDataAppAnyUser.php?screen_name=engunneer&count=100
    
    parse(data);
})


function drawUsers(data) {
    
    twitterData=data;
    
    console.log(data);
    
     //************************
    //User 
    //************************
    
    userData1 = userPlot1.append('g').attr('class','user-data');
    photoWidth = 100;
    
    userData1.append('rect')
        .attr('rx',5).attr('ry',5)
        .attr('x',userWidth/2-photoWidth/2)
        .attr('y',0)
        .attr('width',photoWidth)
        .attr('height',photoWidth)
        .style('fill','lightgray');
    
    userData1.append("svg:image")
       .attr('x',userWidth/2-photoWidth/2+5)
       .attr('y',5)
       .attr('width', 90)
       .attr('height', 90)
       .attr("xlink:href","http://pbs.twimg.com/profile_images/2992761845/bc2f1ddf99da4c777b98768be883078e_normal.jpeg");
    
    userData1.append('text')
        .style('text-anchor','middle')
        .attr('x',userWidth/2)
        .attr('y',115)
        .style('font-size',14)
        .style('fill','gray')
        .text('Michael Pollan');
    
    plot1.append("svg:image")
       .attr('x',userWidth/2-photoWidth/2+15)
       .attr('y',-20)
       .attr('width',130)
       .attr('height', 130)
       .attr("xlink:href","../PollanScreenshot.png");
    
    
    
    for(var i=0; i<4; i++){
        
        timelinePlot1.append('line')
            .attr('x1',55)
            .attr('y1',15+i*25)
            .attr('x2',width2-30)
            .attr('y2',15+i*25)
            .style('stroke','gray')
            .style('stroke-width',0.2);
        
        timelinePlot1.append('text')
            .style('text-anchor','left')
            .attr('x',5)
            .attr('y',15+i*25+3)
            .style('font-size',10)  
            .style('fill','gray')
            .text('3/'+ (i +10)+ '/16');
        
        for (var j = 0; j < 10; j++){
            timelinePlot1.append('circle')
                .attr('cx', Math.random()*(width2-125)+60)
                .attr('cy', 15+i*25)
                .attr('r',4)
                .style('fill','rgba(153, 185, 230,.5')
        }
        
    }
    
    
    
    userData2 = userPlot2.append('g').attr('class','user-data');
    photoWidth = 100;
    
    userData2.append('rect')
        .attr('rx',5).attr('ry',5)
        .attr('x',userWidth/2-photoWidth/2)
        .attr('y',0)
        .attr('width',photoWidth)
        .attr('height',photoWidth)
        .style('fill','lightgray');
    
    userData2.append("svg:image")
       .attr('x',userWidth/2-photoWidth/2+5)
       .attr('y',5)
       .attr('width', 90)
       .attr('height', 90)
       .attr("xlink:href","http://pbs.twimg.com/profile_images/458793804904947712/kK2hkAOC_normal.jpeg");
    
    userData2.append('text')
        .style('text-anchor','middle')
        .attr('x',userWidth/2)
        .attr('y',115)
        .style('font-size',14)
        .style('fill','gray')
        .text('Alberto Cairo');
    
        
    plot2.append("svg:image")
       .attr('x',userWidth/2-photoWidth/2+15)
       .attr('y',-20)
       .attr('width',130)
       .attr('height', 130)
       .attr("xlink:href","../CairoScreenshot.png");
    
    
        
     for(var i=0; i<4; i++){
        
        timelinePlot2.append('line')
            .attr('x1',55)
            .attr('y1',15+i*25)
            .attr('x2',width2-30)
            .attr('y2',15+i*25)
            .style('stroke','gray')
            .style('stroke-width',0.2);
        
        timelinePlot2.append('text')
            .style('text-anchor','left')
            .attr('x',5)
            .attr('y',15+i*25+3)
            .style('font-size',10)  
            .style('fill','gray')
            .text('3/'+ (i +10)+ '/16');
        
        for (var j = 0; j < 10; j++){
            timelinePlot2.append('circle')
                .attr('cx', Math.random()*(width2-125)+60)
                .attr('cy', 15+i*25)
                .attr('r',4)
                .style('fill','rgba(153, 185, 230,.5')
        }
     }
    
    
    
    userData3 = userPlot3.append('g').attr('class','user-data');
    photoWidth = 100;
    
    userData3.append('rect')
        .attr('rx',5).attr('ry',5)
        .attr('x',userWidth/2-photoWidth/2)
        .attr('y',0)
        .attr('width',photoWidth)
        .attr('height',photoWidth)
        .style('fill','lightgray');
    
    userData3.append("svg:image")
       .attr('x',userWidth/2-photoWidth/2+5)
       .attr('y',5)
       .attr('width', 90)
       .attr('height', 90)
       .attr("xlink:href","http://pbs.twimg.com/profile_images/67490765/bloghead_normal.jpg");
    
    userData3.append('text')
        .style('text-anchor','middle')
        .attr('x',userWidth/2)
        .attr('y',115)
        .style('font-size',14)
        .style('fill','gray')
        .text('Seth Godin');
    
        
    plot3.append("svg:image")
       .attr('x',userWidth/2-photoWidth/2+15)
       .attr('y',-20)
       .attr('width',130)
       .attr('height', 130)
       .attr("xlink:href","../GodinScreenshot.png");

    
     for(var i=0; i<4; i++){
        
        timelinePlot3.append('line')
            .attr('x1',55)
            .attr('y1',15+i*25)
            .attr('x2',width2-30)
            .attr('y2',15+i*25)
            .style('stroke','gray')
            .style('stroke-width',0.2);
        
        timelinePlot3.append('text')
            .style('text-anchor','left')
            .attr('x',5)
            .attr('y',15+i*25+3)
            .style('font-size',10)  
            .style('fill','gray')
            .text('3/'+ (i +10)+ '/16');
        
        for (var j = 0; j < 10; j++){
            timelinePlot3.append('circle')
                .attr('cx', Math.random()*(width2-125)+60)
                .attr('cy', 15+i*25)
                .attr('r',4)
                .style('fill','rgba(153, 185, 230,.5')
        }
     }
    
    
}

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