//figure out why the plot div height has to be set to a hard (rather than percentage) value //in the CSS

//set some margins and record width and height of window
var margin = {t:25,r:40,b:25,l:40};

//empty variables for force layout
//var nodes,links;

var width = document.getElementById('plot1').clientWidth - margin.r - margin.l,  
    height = document.getElementById('plot1').clientHeight - margin.t - margin.b;

/*
//set up scales for plotting the data
var xScale = d3.scale.ordinal()
    .domain(d3.range(data.length))
    .rangeRoundPoints([margin.l, width]);

var yScale = d3.scale.linear()
    .domain([10,1])
    .range([0,100]);

var colorScale = d3.scale.linear()
    .domain([0, data.length])
    .range([0, 360]);
 */

//for now, not linked to actual data - later, set max according to numbers stored in data object. 
var radiusScale = d3.scale.sqrt().domain([0,20000]).range([10,50]);

//select the HTML plot element by id 
var canvas = d3.select(".plot");

//create force layout, give charge and gravity
var force = d3.layout.force()
    .size([width,height])
    .charge(-5)
    .gravity(0.01) //in absence of all forces, nodes should be fixed where they are. Can get rid of all forces, and implement own custom gravity


plot = canvas.append('svg')
    .attr('width',width+margin.r+margin.l)
    .attr('height',height + margin.t + margin.b)
    .append('g')
    .attr('class','canvas')
    .attr('transform','translate('+margin.l+','+margin.t+')');

//load twitter data, then call draw function.
d3.json("./twitter/sample_data.json", function(error, data) {
    
    //check that you can access data (this gives follower count for a specific user)
    //console.log(data.statuses[0].user.followers_count); // this is your data
    
    drawUsers(data);
})

function tick(e){
      //implement custom tick function.
        
        //console.log('here');
        circles = plot.selectAll('.circ');
        
        //use this line if circles are starting out at 0,0 to put them in place. Since only updating
        //from orig random position based on collision force, no need to update here.
//**********************************
//this line is translating by the entire value of the original position. Should translate by delta, //instead - not overwriting 
        //circles.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
       
        circles.each(collide(.5));
        
        circles.attr("cx",function(d) { return d.x})
                .attr("cy",function(d) { return d.y});
            
 
        
}

function end(e) {
        //labels = plot.selectAll('.labels');
        //console.log("here");
    
        circles = plot.selectAll('.circ-group');
    
        labels = circles    
            .append('text')
            .attr('class','labels')
            .attr('x', function(d){return d.x})
            .attr('y',function(d){return 100})
            .attr("font-size","10px")
            .attr('fill','rgb(100,100,100)')
            .attr('text-anchor',"middle")
            .text(function(d){
                return "@" + d.user.screen_name + " " + d.user.followers_count;
        }); 

        
        labels.attr("x", function(d) { return d.x})
               .attr("y", function(d) { return d.y});
}

//from http://bl.ocks.org/mbostock/1804919
function collide(alpha){
    var quadtree = d3.geom.quadtree(twitterData.statuses);
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

function drawUsers(data) {
    
    twitterData=data;

    console.log(twitterData);

/*
    for(i=0;i<twitterData.statuses.length;i++){ 
        var x=Math.random()*350;
        var y=Math.random()*350;
        var r=radiusScale(twitterData.statuses[0].user.followers_count);

        var newObj = {x:x, y:y, r:r}
        data.push(newObj)
    };*/


    //console.log(data);

    var circles = plot.selectAll('.circ')
        .data(twitterData.statuses)
        .enter()
        .append('g')
        .attr('class',"circ-group");
    
    circles
        .append('circle')
        .attr('class','circ')
        .attr('cx',function(d){
            xPos = Math.random()*width
            if(xPos>width-radiusScale(d.user.followers_count)){
                    xPos -= radiusScale(d.user.followers_count);
            } 
            else if(xPos< -radiusScale(d.user.followers_count)) {
                    xPos += radiusScale(d.user.followers_count);
            }
            
            //write xPos to the bound object for later use
            d.x=xPos;
            d.xPos = xPos;
            return xPos;
        })
        .attr('cy',function(d){
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
            return yPos;
        })
        .attr('r',function(d){
            d.r = radiusScale(d.user.followers_count);
            return radiusScale(d.user.followers_count)})
        .style('fill', function(d){
            if (d.retweet_count==0){var color = 'rgba(153, 225, 230,.6)'}
            else { 
                console.log(d.retweet_count);
                var color = 'rgba(153, 255, 230,.6)'}
            return color;
        });
        //.call(force.drag);
    

    
    //Collision detection
    //array into force layout, updates start to happen, updated accordingly
    //link nodes var to twitter data array
    force.nodes(twitterData.statuses)
        .on('tick',tick)
        .on('end',end)  
        .start();

  
    
}


    