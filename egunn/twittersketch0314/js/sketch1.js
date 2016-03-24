//Next steps:
//Attach to live twitterstream data, update nodes accordingly.
//Click on a tweet to view activity over time. (Check to see if possible, without locating retweets //themselves).
//Expand to follow multiple levels of retweeting


//div is in html, when page loads, get window height and width, and adjust div height and width according to that using JS.

//config.js - set margins, selections, etc. (load 1st, sets up everything)
//feature.js - 
//don't need to reload data for each script, will stomp on one another if var names are = .
//global vars add themselves to window dataspace.

//figure out why the plot div height has to be set to a hard (rather than percentage) value //in the CSS
//why can't mouse leave canvas during force minimization?

//set some margins and record width and height of window
var margin = {t:25,r:40,b:25,l:40};

var userWidth = document.getElementById('user').clientWidth - margin.r - margin.l,  
    userHeight = document.getElementById('user').clientHeight - margin.t - margin.b;

var width1 = document.getElementById('plot1').clientWidth - margin.r - margin.l,  
    height1 = document.getElementById('plot1').clientHeight - margin.t - margin.b;

var width2 = document.getElementById('plot2').clientWidth - margin.r - margin.l,  
    height2 = document.getElementById('plot2').clientHeight - margin.t - margin.b;

//for now, not linked to actual data - later, set max according to numbers stored in data object. 
var radiusScale = d3.scale.sqrt().domain([0,20000]).range([10,50]);


//select the HTML plot element by class
var userCanvas = d3.select(".user");

//select the HTML plot element by class
var sidebarCanvas = d3.select(".sidebar");

//select the HTML plot element by class
var canvas1 = d3.select(".plot1");

//select the HTML plot element by id 
var canvas2 = d3.select(".plot2");

//create force layout, give charge and gravity
var force = d3.layout.force()
    .size([width1,height1])
    .charge(-5)
    .gravity(0.05);


// Define the div for the tooltip
var div1 = d3.select(".plot1").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);

// Define the div for the tooltip
var div2 = d3.select(".plot2").append("div")	
    .attr("class", "tooltip")
    .style("width","100px")
    .style("opacity", 0);

userPlot = userCanvas.append('svg')
    .attr('width',userWidth+margin.r+margin.l)
    .attr('height',userHeight + margin.t + margin.b)
    .append('g')
    .attr('class','userCanvas')
    .attr('transform','translate('+margin.l+','+margin.t+')');

//note: currently using userWidth and Height - if divs change ratio, will need to update!
sidebarPlot = sidebarCanvas.append('svg')
    .attr('width',userWidth+margin.r+margin.l)
    .attr('height',userHeight + margin.t + margin.b)
    .append('g')
    .attr('class','sidebarCanvas')
    .attr('transform','translate('+margin.l+','+margin.t+')');

plot1 = canvas1.append('svg')
    .attr('width',width1+margin.r+margin.l)
    .attr('height',height1 + margin.t + margin.b)
    .append('g')
    .attr('class','canvas1')
    .attr('transform','translate('+margin.l+','+margin.t+')');

plot2 = canvas2.append('svg')
    .attr('width',width2+margin.r+margin.l)
    .attr('height',height2 + margin.t + margin.b)
    .append('g')
    .attr('class','canvas2')
    .attr('transform','translate('+margin.l+','+margin.t+')');

//load twitter data, then call draw function.
//d3.json("./twitter_data2.json", function(error, data) {
d3.json("./MichaelPollan_0320_100timeline.json", function(error, data) {
    
    //check that you can access data (this gives follower count for a specific user)
    //console.log(data.statuses[0].user.followers_count); 
    
    //load this link to call data live from Twitter
    //http://ericagunn.com/Twitter/TwitterDataAppAnyUser.php?screen_name=engunneer&count=100
    
    parse(data);
})

/*
//Test code to load JSON data directly from PHP/TwitterAPI. Works, but queries 1x/refresh.
//Replace with static data file for now.
d3.json("http://ericagunn.com/Twitter/TwitterDataApp.php",function(error,webTwitter){
  console.log(webTwitter)  
})
*/

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
    
    console.log(data);
        
    //************************
    //User 
    //************************
    
    userData = userPlot.append('g').attr('class','user-data');
    photoWidth = 100;
    
    userData.append('rect')
        .attr('rx',5).attr('ry',5)
        .attr('x',userWidth/2-photoWidth/2)
        .attr('y',10)
        .attr('width',photoWidth)
        .attr('height',photoWidth)
        .style('fill','lightgray');
    
    userData.append("svg:image")
       .attr('x',userWidth/2-photoWidth/2+5)
       .attr('y',15)
       .attr('width', 90)
       .attr('height', 90)
       .attr("xlink:href",twitterData[0].user.profile_image_url);
    
    
    userData.append('text')
        .style('text-anchor','middle')
        .attr('x',userWidth/2)
        .attr('y',photoWidth/2+photoWidth)
        .style('font-size',14)
        .style('fill','gray')
        .text(data[0].user.name);
    
    userData.append('text')
        .style('text-anchor','middle')
        .attr('x',userWidth/2)
        .attr('y',photoWidth/2+photoWidth+13)
        .style('font-size',10)
        .style('fill','gray')
        .text('@'+data[0].user.screen_name);
    
    
    userData.append('text')
        .style('text-anchor','middle')
        .attr('x',userWidth/2)
        .attr('y',photoWidth/2+photoWidth+36)
        .style('font-size',10)
        .style('fill','gray')
        .text(data[0].user.followers_count +' followers');
    
    //************************
    //Sidebar
    //************************
    
    sidebarData = sidebarPlot.append('g').attr('class','user-data');
    
    sidebarData.append('rect')
        .attr('rx',5).attr('ry',5)
        .attr('x',userWidth/2-65)
        .attr('y',100+10)
        .attr('width',130)
        .attr('height',20)
        .style('fill','lightgray');
    
    sidebarData.append('text')
        .style('text-anchor','middle')
        .attr('x',userWidth/2)
        .attr('y',100+23)
        .style('font-size',8)
        .style('fill','white')
        .text('Separate into Categories');
    
    sidebarData.append('text')
        .style('text-anchor','left')
        .attr('x',-5)
        .attr('y',200)
        .style('font-size',14)
        .style('fill','gray')
        .text("Enter new user to view:");
    
    sidebarData.append('rect')
        .attr('rx',5).attr('ry',5)
        .attr('x',userWidth/2-65)
        .attr('y',200+10)
        .attr('width',130)
        .attr('height',20)
        .style('fill','lightgray');
    
    sidebarData.append('text')
        .style('text-anchor','middle')
        .attr('x',userWidth/2-55)
        .attr('y',200+23)
        .style('font-size',8)
        .style('fill','white')
        .text('|');
        
    sidebarData.append('text')
        .style('text-anchor','left')
        .attr('x',-5)
        .attr('y',260)
        .style('font-size',14)
        .style('fill','gray')
        .text("or:");
    
    sidebarData.append('rect')
        .attr('rx',5).attr('ry',5)
        .attr('x',userWidth/2-65)
        .attr('y',260+10)
        .attr('width',130)
        .attr('height',20)
        .style('fill','lightgray');
    
    sidebarData.append('text')
        .style('text-anchor','middle')
        .attr('x',userWidth/2)
        .attr('y',260+23)
        .style('font-size',8)
        .style('fill','white')
        .text('Compare multiple users');

    
    //************************
    //Plot 1 
    //************************
    
     //legend
     var legend = plot1.append('g').attr('class','legend');
    
     legend.append('circle')
        .attr('cx',-15).attr('cy',0).attr('r',5).style('fill','rgba(153, 255, 150,.6)');
     legend.append('text').attr('class','legendLabel')
        .attr('x',-5).attr('y',3).text("is a retweet");
    
     legend.append('circle')
        .attr('cx',-15).attr('cy',15).attr('r',5).style('fill','rgba(153, 255, 230,.6)');
     legend.append('text').attr('class','legendLabel')
        .attr('x',-5).attr('y',18).text("@reply");
    
     legend.append('circle')
        .attr('cx',-15).attr('cy',30).attr('r',5).style('fill','rgba(153, 185, 230,.6)');
     legend.append('text').attr('class','legendLabel')
        .attr('x',-5).attr('y',33).text("new");
    
     legend.append('circle')
        .attr('cx',-15).attr('cy',45).attr('r',2).style('fill','rgba(153, 155, 230, .9)');
     legend.append('text').attr('class','legendLabel')
        .attr('x',-5).attr('y',48).text("# retweets");            

    var circles = plot1.selectAll('.circ')
        .data(twitterData)
        .enter()
        .append('g')
        .attr('class',"circ-group")
        .attr('transform', function (d) { 
            
                 xPos = Math.random()*width1;
                 if(xPos>width1-radiusScale(d.user.followers_count)){
                      xPos -= radiusScale(d.user.followers_count);
                 } 
                 else if(xPos< -radiusScale(d.user.followers_count)) {
                      xPos += radiusScale(d.user.followers_count);
                 }

                 //write xPos to the bound object for later use
                 d.x=xPos;
                 d.xPos = xPos;
     
                yPos = Math.random()*height1
                if(yPos>height1-radiusScale(d.user.followers_count)){
                        yPos -= radiusScale(d.user.followers_count);
                } 
                else if(yPos< radiusScale(d.user.followers_count)) {
                        yPos += radiusScale(d.user.followers_count);
                }

                //write xPos to the bound object for later use
                d.y=yPos;
                d.yPos = yPos;
            
                return  'translate('+ xPos + ',' + yPos + ')'; 
            });
    
    circleSize = 8;
    
    circles
        .append('circle')
        .attr('class','circ')
        .attr('cx',0)
        .attr('cy',0)
        .attr('r', function(d){
            //turn off scaling of radii for now - working on single user timeline
            //d.r = radiusScale(d.user.followers_count);
            //return radiusScale(d.user.followers_count)})
            d.r = circleSize;
            return circleSize})
        .style('fill', function(d){
            //use substring(0,x) to get first few letters of each tweet.
            //should be RT for retweet
            if (d.text.substring(0,2)== "RT"){
                var color = 'rgba(153, 255, 150,' 
                var alpha = .5;
                d.alpha = alpha;
                d.color = color;
                return color + alpha+')';
            }
            //should be @username for a reply or direct message
            else if (d.text.substring(0,1) == "@"){
                var color = 'rgba(153, 255, 230,'
                var alpha = .5;
                d.alpha = alpha;
                d.color = color;
                return color + alpha+')';
            }
            //should be nothing for fresh tweet
            else {
                var color = 'rgba(153, 185, 230,'
                var alpha = .5;
                d.alpha = alpha;
                d.color = color;
                return color + alpha+')';
            }

        })
        .attr('id',function(d,i){
            return String('circle-' + i)})
        .call(force.drag)
        //tooltip based on http://bl.ocks.org/d3noob/a22c42db65eb00d4e369
        .on("mouseover", mouseHighlightTweet)					
        .on("mouseout", noMouseHighlightTweet)
        .on('click', tweetClick);


    //Collision detection
    //array into force layout, updates start to happen, updated accordingly
    //link nodes var to twitter data array
    force.nodes(twitterData)
        .on('tick',tick)
        .start();
    
    
    var satNodes = [];
    
    //append a group to the circles selection to hold satellites
    //var satGroup = circles.append('g').attr('class','sat-group');
    

    //based on http://jsfiddle.net/nrabinowitz/5CfGG/
    //and http://bl.ocks.org/milroc/4254604
    circles.each(function(d,index){
         
            //select the current circle in the .each loop, append a group to it.
            var satGroup = d3.select(this).append('g').attr('class','sat-group');
        
            //create a blanks to fill
            satellites = [];
            dataTree={};
            
            for (var i = 0; i<d.retweet_count; i++){
                //console.log(d.retweet_count);
                satellite = {parentX:d.x, parentY:d.y, retweets:d.retweet_count, parentR:d.r}
                satellites.push(satellite);
            }
        
            if(satellites.length > 0){ 
            
                var dataTree = {
                     //take the satellites array, and map each entry onto a function that returns
                     //the length of the array, so that each satellite child object knows how many
                     //siblings it has.
                     children: []
            };    
                
            for (var j=0; j<satellites.length;j++){
                //map satellite data to a tree
                dataTree.children.push({size: satellites.length})

            }
                
            //object with the children array inside it. Children array is an array of child objects, 
            //each with a size attribute.
            //console.log(dataTree);
                             
            }
         
            tree = null;
        
            //if there is a dataTree for a circle, make a treemap layout 
            if(dataTree != {}){
                // make a radial tree layout
                tree = d3.layout.tree()
                    //x controls length (360 for radial degrees. y controls radial distance. 
                    //Node size is set when circles are drawn, below.
                    .size([360,circleSize*1.3]) //why won't this work with an anonymous function? returns NaN...
                    .separation(function(a, b) {
                        //set ideal separation between satellites (doesn't do much, but have to have it,
                        //or node x,y position calculation returns NaN)
                        return 5;//radiusScale(a.size) + radiusScale(b.size);
                    });
                
                
                //apply the layout to the data
                satNodes = tree.nodes(dataTree);

            }
            
      
                // create empty selectio to append satellites into
                var satNode = satGroup.selectAll(".node");
        
                var nodes = satNode.data(satNodes.slice(1)) // cut out the root node, we don't need it
                      .enter()
                      .append("g")
                      .attr("class", "node")
                      .attr("transform", function(d,i) {                    
                          //draw the satellite nodes around the center and translate to the 
                          //appropriate radial distance.
                          return "rotate(" + (d.x - 90) + ") translate(" + d.y + ")";
                      });
                      

                nodes.append("circle")
                    .attr("r", 1)
                    .style("fill",'rgba(153, 155, 230, .9)'); 


                
    }) //close .each        
    
    
    
    //************************
    //Plot 2 
    //************************
    
    timeline = plot2.append('g').attr('class','timelines');
    
    var tweetInterval = twitterData[twitterData.length-1].parsedDate - twitterData[0].parsedDate;
    
    for(var i=0; i<4; i++){
        
        timeline.append('line')
            .attr('x1',65)
            .attr('y1',15+i*25)
            .attr('x2',width2-30)
            .attr('y2',15+i*25)
            .style('stroke','gray')
            .style('stroke-width',0.2);
        
        timeline.append('text')
            .style('text-anchor','left')
            .attr('x',5)
            .attr('y',15+i*25+3)
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
    var timeScale1 = d3.scale.linear().domain([0,tweetInterval/4]).range([75,width2-40]);
    var timeScale2 = d3.scale.linear().domain([tweetInterval/4,tweetInterval/2]).range([75,width2-40]);
    var timeScale3 = d3.scale.linear().domain([tweetInterval/2,3*tweetInterval/4]).range([75,width2-40]);
    var timeScale4 = d3.scale.linear().domain([3*tweetInterval/4,tweetInterval]).range([75,width2-40]);
    
    //console.log(timeScale1(1450433707000));
    
    twitterData.forEach(function(d){
        
        var tweetDate = new Date(d.parsedDate);
        var shortDate = tweetDate.toString().substring(0,10);
        var time = tweetDate.toString().substring(16,25);
        d.shortDate = shortDate;
        d.time = time;
        
        caseValue = Math.floor((d.parsedDate - twitterData[0].parsedDate)/(tweetInterval/4));

        //console.log(Math.floor((twitterData[twitterData.length-1].parsedDate - twitterData[0].parsedDate)/(tweetInterval/4)));
        
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
    
    //console.log(twitterData);
    
    tweetCircGroup = plot2.selectAll('circ')
        .append('g')
        .attr('class','circ-group');
    
    tweetCircGroup    
        .data(twitterData)
        .enter()
        .append('circle')
        .attr('cx',function(d){return d.xcoord})
        .attr('cy',function(d){return (15+(d.yaxis-1)*25)})
        .attr('r',5)
        .style('fill',function(d){return d.color + d.alpha +')'})
        .attr('id',function(d,i){return String('circle-' + i)})
        .on("mouseover", mouseHighlightTimeline)				
        .on("mouseout", noMouseHighlightTimeline)
        .on('click',timelineClick);
  
}


function timelineClick(d) {
    console.log("I'm here");
    var xShift = d.x+20;
    var yShift = d.y+20;
    
    div1.transition()		
        .duration(200)		
        .style("opacity", .8);		

    div1.html(d.text +  "<br/>"  + "<b>" + "Retweets: " + d.retweet_count +"</b>")	
        .style("left", xShift + "px")		
        .style("top", yShift + "px");
}

function tweetClick(d) {
    console.log("I'm here");
    
    var xShift = d.xcoord+40;
    var yShift = 25+(d.yaxis-1)*25;
    div2.transition()		
        .duration(200)		
        .style("opacity", .8);		
    	
    div2.html(d.shortDate + "<br/>" + d.time)	
        .style("left", xShift + "px")		
        .style("top", yShift + "px");
}

function mouseHighlightTweet(d){
    
    var xShift = d.x+20;
    var yShift = d.y+20;
    
    div1.transition()		
        .duration(200)		
        .style("opacity", .8);		

    div1.html(d.text +  "<br/>"  + "<b>" + "Retweets: " + d.retweet_count +"</b>")	
        .style("left", xShift + "px")		
        .style("top", yShift + "px");


    var highlightedTweet = d3.select(this);
    
    highlightedTweet.style('fill', function(d){
       return d.color + '1)'})
    
    tweetId = highlightedTweet.attr('id');
    idConcat =  '#' + tweetId ;
    
    var circle = plot2.select(idConcat);
    
    circle.style('fill', function(d){
        return d.color + '1)'})
        .transition(100)
        .attr('r',20)
        .transition(100)
        .attr('r',10);

}

function noMouseHighlightTweet(d){
    div1.transition()		
        .duration(500)		
        .style("opacity", 0);
    
    div2.transition()		
        .duration(500)		
        .style("opacity", 0);	
    
    var highlightedTweet = d3.select(this);
    
    highlightedTweet.style('fill', function(d){return d.color + d.alpha + ')'})
    
    tweetId = highlightedTweet.attr('id');
    idConcat =  '#' + tweetId ;
    
    var circle = plot2.select(idConcat);
    
    circle
        .transition(5000)
        .delay(500)
        .style('fill', function(d){return d.color + d.alpha+ ')'})
        .attr('r',5);
        
    
	
    

}






function mouseHighlightTimeline(d){
    //console.log(d);
    var xShift = d.xcoord+40;
    var yShift = 25+(d.yaxis-1)*25;
    div2.transition()		
        .duration(200)		
        .style("opacity", .8);		
    	
    div2.html(d.shortDate + "<br/>" + d.time)	
        .style("left", xShift + "px")		
        .style("top", yShift + "px");
        	
    
    var highlightedTime = d3.select(this);
    
    highlightedTime.style('fill', function(d){
       return d.color + '1)'})
    
    timelineId = highlightedTime.attr('id');
    idConcat =  '#' + timelineId ;
    
    var circle = d3.select(idConcat);
    
    circle.style('fill', function(d){
        return d.color + '1)'})
        .transition(100)
        .attr('r',15)
        .transition(100)
        .attr('r',circleSize);

}

function noMouseHighlightTimeline(d){
    div2.transition()		
        .duration(500)		
        .style("opacity", 0);	
    
    var highlightedTime = d3.select(this);
    
    highlightedTime.style('fill', function(d){return d.color + d.alpha + ')'})
    
    timelineId = highlightedTime.attr('id');
    idConcat =  '#' + timelineId ;
    
    var circle = d3.select(idConcat);
    
    circle
        .transition(5000)
        .delay(500)
        .style('fill', function(d){return d.color + d.alpha+ ')'});

}

function tick(e){
      //implement custom tick function.

        circleGroups = d3.selectAll('.circ-group');
       
        circles = plot1.selectAll('.circ');
        circles.each(collide(.25));
    
        circleGroups.each(function(d,i){
            d3.select(this).attr('transform', 'translate(' + d.x + ',' + d.y + ')');
        })
            
        
}

//from http://bl.ocks.org/mbostock/1804919
function collide(alpha){
    var quadtree = d3.geom.quadtree(twitterData);
  return function(d) {
    var r = d.r + 15,
        nx1 = d.x - r,
        nx2 = d.x + r,
        ny1 = d.y - r,
        ny2 = d.y + r;
      
    quadtree.visit(function(quad, x1, y1, x2, y2) {
      if (quad.point && (quad.point !== d)) {
        var x = d.x - quad.point.x,
            y = d.y - quad.point.y,
            l = Math.sqrt(x * x + y * y),
            r = d.r + quad.point.r + 15;
        if (l < r) {
          l = (l - r) / l * alpha;
          d.x -= x *= (l*.3);
          d.y -= y *= (l*.3);
          quad.point.x += x;
          quad.point.y += y;
        }
      }
      return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
    });
  };
          
}
