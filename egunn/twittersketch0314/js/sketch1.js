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

var width = document.getElementById('plot1').clientWidth - margin.r - margin.l,  
    height = document.getElementById('plot1').clientHeight - margin.t - margin.b;

//for now, not linked to actual data - later, set max according to numbers stored in data object. 
var radiusScale = d3.scale.sqrt().domain([0,20000]).range([10,50]);


//select the HTML plot element by class
var canvas1 = d3.select(".plot1");

//create force layout, give charge and gravity
var force = d3.layout.force()
    .size([width,height])
    .charge(-5)
    .gravity(0.05);

// Define the div for the tooltip
var div = d3.select(".plot1").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);

plot1 = canvas1.append('svg')
    .attr('width',width+margin.r+margin.l)
    .attr('height',height + margin.t + margin.b)
    .append('g')
    .attr('class','canvas1')
    .attr('transform','translate('+margin.l+','+margin.t+')');


//load twitter data, then call draw function.
//d3.json("./twitter_data2.json", function(error, data) {
d3.json("./SethGodin_0320_100timeline.json", function(error, data) {
    
    //check that you can access data (this gives follower count for a specific user)
    //console.log(data.statuses[0].user.followers_count); 
    
    drawUsers(data);
})

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
    
    plot1.append('circle').attr('cx',10).attr('cx',10).attr('r',10);
    
     //legend
     var legend = plot1.append('g').attr('class','legend');
    
     legend.append('circle')
        .attr('cx',0).attr('cy',0).attr('r',5).style('fill','rgba(153, 255, 150,.6)');
     legend.append('text').attr('class','legendLabel')
        .attr('x',10).attr('y',3).text("is a retweet");
    
     legend.append('circle')
        .attr('cx',0).attr('cy',15).attr('r',5).style('fill','rgba(153, 255, 230,.6)');
     legend.append('text').attr('class','legendLabel')
        .attr('x',10).attr('y',18).text("@reply");
    
     legend.append('circle')
        .attr('cx',0).attr('cy',30).attr('r',5).style('fill','rgba(153, 185, 230,.6)');
     legend.append('text').attr('class','legendLabel')
        .attr('x',10).attr('y',33).text("new");
    
     legend.append('circle')
        .attr('cx',0).attr('cy',45).attr('r',2).style('fill','rgba(153, 155, 230, .9)');
     legend.append('text').attr('class','legendLabel')
        .attr('x',10).attr('y',48).text("# retweets");            

    var circles = plot1.selectAll('.circ')
        .data(twitterData)
        .enter()
        .append('g')
        .attr('class',"circ-group")
        .attr('transform', function (d) { 
            
                 xPos = Math.random()*width;
                 if(xPos>width-radiusScale(d.user.followers_count)){
                      xPos -= radiusScale(d.user.followers_count);
                 } 
                 else if(xPos< -radiusScale(d.user.followers_count)) {
                      xPos += radiusScale(d.user.followers_count);
                 }

                 //write xPos to the bound object for later use
                 d.x=xPos;
                 d.xPos = xPos;
     
                yPos = Math.random()*height
                if(yPos>height-radiusScale(d.user.followers_count)){
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
    
    circles
        .append('circle')
        .attr('class','circ')
        .attr('cx',0)
        .attr('cy',0)
        .attr('r', function(d){
            //turn off scaling of radii for now - working on single user timeline
            //d.r = radiusScale(d.user.followers_count);
            //return radiusScale(d.user.followers_count)})
            d.r = 10;
            return 10})
        .style('fill', function(d){
            //use substring(0,x) to get first few letters of each tweet.
            //should be RT for retweet
            if (d.text.substring(0,2)== "RT"){
                var color = 'rgba(153, 255, 150,.6)'
                return color;
            }
            //should be @username for a reply or direct message
            else if (d.text.substring(0,1) == "@"){
                var color = 'rgba(153, 255, 230,.6)'
                return color;
            }
            //should be nothing for fresh tweet
            else {
                var color = 'rgba(153, 185, 230,.6)'
                return color;
            }

        })
        .call(force.drag)
        //tooltip based on http://bl.ocks.org/d3noob/a22c42db65eb00d4e369
        .on("mouseover", function(d) {		
            var xShift = d.x+20;
            var yShift = d.y+20;
            div.transition()		
                .duration(200)		
                .style("opacity", .7);		
            //div	.html("@" + d.user.screen_name +  "<br/>"  +  d.user.followers_count)	
            div	.html(d.text +  "<br/>"  + "<b>" + "Retweets: " + d.retweet_count +"</b>")	
                .style("left", xShift + "px")		
                .style("top", yShift + "px");
                //.attr('transform','translate(30,300)');	
            })					
        .on("mouseout", function(d) {		
            div.transition()		
                .duration(500)		
                .style("opacity", 0);	
        });

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
                    .size([360,13]) //why won't this work with an anonymous function? returns NaN...
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
  
}


function tick(e){
      //implement custom tick function.

        circleGroups = d3.selectAll('.circ-group');
       
        circles = plot1.selectAll('.circ');
        circles.each(collide(.5));
    
        circleGroups.each(function(d,i){
            d3.select(this).attr('transform', 'translate(' + d.x + ',' + d.y + ')');
        })
            
        
}

//from http://bl.ocks.org/mbostock/1804919
function collide(alpha){
    var quadtree = d3.geom.quadtree(twitterData);
  return function(d) {
    var r = d.r + 20,
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
