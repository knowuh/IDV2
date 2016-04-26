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


//create force layout, give charge and gravity
var force = d3.layout.force()
    .size([width,height])
    .charge(-5)
    .gravity(0.01);

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
    circleSize = 8;
    
    var circles = plot.selectAll('.circ')
        .data(twitterData)
        .enter()
        .append('g')
        .attr('class',"circ-group")
        .attr('transform', function (d) { 
            
                 xPos = Math.random()*width;
                 if(xPos>width-circleSize){
                      xPos -= circleSize;
                 } 
                 else if(xPos< - circleSize) {
                      xPos += circleSize;
                 }

                 //write xPos to the bound object for later use
                 d.x=xPos;
                 d.xPos = xPos;
     
                yPos = Math.random()*height
                if(yPos>height-circleSize){
                        yPos -= circleSize;
                } 
                else if(yPos< circleSize) {
                        yPos += circleSize;
                }

                //write xPos to the bound object for later use
                d.y=yPos;
                d.yPos = yPos;
            
                return  'translate('+ xPos + ',' + yPos + ')'; 
            });
    

    
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
        .call(force.drag);

    //Collision detection
    //array into force layout, updates start to happen, updated accordingly
    //link nodes var to twitter data array
    force.nodes(twitterData)
        .on('tick',tick)
        .start();    
       
   
    
}


function tick(e){
      //implement custom tick function.
    

        circleGroups = d3.selectAll('.circ-group');
       
        circles = plot.selectAll('.circ');
        //circles.each(collide(.25));
    
        circles.each(multiGravity(.01));//gravity(.01);
            //.attr('cx',function(d){return d.x})
            //.attr('cy',function(d){return d.y});
    
        circles.each(collide(.25));
    
        circleGroups.each(function(d,i){
            d3.select(this).attr('transform', 'translate(' + d.x + ',' + d.y + ')');
        })
            
        
        function gravity(k){  

            //custom gravity: data points gravitate towards a straight line
            return function(d){
                d.y += (height/2 - d.y)*k;
                d.x += (d.xPos*.5 + width/4 - d.x)*k;//(d.xPos - d.x)*k;
            }
        }
            
        function multiGravity(k){
            //custom gravity: data points gravitate towards a straight line
            return function(d){
                var focus = {};
                
                
                if (d.text.substring(0,2)== "RT"){
                    focus.x = width/2;
                }
                //should be @username for a reply or direct message
                else if (d.text.substring(0,1) == "@"){
                    focus.x = width/3 - 100;
                }
                //should be nothing for fresh tweet
                else {
                    focus.x = (2*width)/3+100;
                }

                //focus.x = (d.xPos < width/2)?(width/3-100):(width*2/3+100);
                focus.y = height/2;

                d.y += (focus.y - d.y)*k;
                d.x += (focus.x - d.x)*k;
            }
        }
            
    
        
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
            r = d.r + quad.point.r + 20;
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