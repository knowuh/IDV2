//figure out why the plot div height has to be set to a hard (rather than percentage) value //in the CSS
//why can't mouse leave canvas during force minimization?

//set some margins and record width and height of window
var margin = {t:25,r:40,b:25,l:40};

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
d3.json("./twitter/sample_data.json", function(error, data) {
    
    //check that you can access data (this gives follower count for a specific user)
    //console.log(data.statuses[0].user.followers_count); // this is your data
    
    drawUsers(data);
})


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
        
//*************fix this later!!
            d.retweets = d.retweet_count;
            //console.log(d.retweets);
        
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
                var color = 'rgba(153, 255, 230,.6)'}
            return color;
        })
        //.call(attachTooltip)
        .call(force.drag)
        //tooltip based on http://bl.ocks.org/d3noob/a22c42db65eb00d4e369
        .on("mouseover", function(d) {		
            div.transition()		
                .duration(200)		
                .style("opacity", .9);		
            div	.html("@" + d.user.screen_name +  "<br/>"  +  d.user.followers_count)	
                .style("left", d.x  + "px")		
                .style("top", d.y+ "px");
                //.attr('transform','translate(30,300)');	
            })					
        .on("mouseout", function(d) {		
            div.transition()		
                .duration(500)		
                .style("opacity", 0);	
        })
//*******************
//want this to happen when the user drags, not clicks...
//or, even better, keep satellites and translate with circle group.
        .on("click", function(d){
            satellites = d3.selectAll('.satellites');
            satellites.remove();
        });
    
    
    /*
    //based on http://jsfiddle.net/nrabinowitz/5CfGG/
    //and http://bl.ocks.org/milroc/4254604
    circles.each(function(d,i){
                
            //create a satellites array with one entry for each retweet
            satellites = [];
            
            for (var i = 0; i<d.retweet_count; i++){
                satellite = {parentX:d.x, parentY:d.y, retweets:d.retweet_count, parentR:d.r}
                satellites.push(satellite);
            }
            //console.log(satellites.length);
            
            if(satellites.length>0){ 
                //map satellite data to a tree
                var dataTree = {
                    children: satellites.map(function(d) { return { size: satellites.length }; })
                };

                // make a radial tree layout
                var tree = d3.layout.tree()
                    //value of 5 has some effect on radius (1 is still pretty large, doesn't look linear...)
                    .size([360, 1])//function(d){
                        //console.log(d.r);
                        //return [360, 20]})
                    .separation(function(a, b) {
                        return radiusScale(a.size) + radiusScale(b.size);
                });

                // apply the layout to the data
                var satNodes = tree.nodes(dataTree);
                console.log(satNodes.slice(1));

                // create dom elements for the node
                var satNode = plot.selectAll(".satNode")
                      .data(satNodes.slice(1)) // cut out the root node, we don't need it
                      .enter().append("g")
                      .attr("class", "node")
                      .attr("transform", function(d) {
//*****************check what's going on here...recursive???                          
                          //console.log(d);          
                          return "rotate(" + (d.x - 90) + ") translate(" + d.y + ")";
                      })

                satNode.append("circle")
                    .attr("r", function(d) { return radiusScale(2); });

                //set angle per step for satellites arranged around center circle
                var toAngle = d3.scale.linear().domain([0, d.retweets]).range([0, 360]);

                d3.select(this).selectAll('satellites')
                    .data(satellites)
                    .enter()
                    .append('rect')
                    .attr('x',function(d,i){
                         return d.parentX+(d.parentR*Math.sin(toAngle(i)));})
                    .attr('y',function(d,i){
                         return d.parentY+(d.parentR*Math.cos(toAngle(i)));})
                    .attr('width',2)
                    .attr('height',5);
            }
        })
   */
    //works with circ-group, and can pass group to drawSatellites function, but groups don't have
    //twitter data stored in them - only have xPos, yPos, and width. Instead, need to use circles, 
    //but that returns an error saying "cannot read property "call" of undefined".
    //centralCircGrp = plot.selectAll('circ-group');
    
    //centralCircGrp.each(drawSatellites(this));
        
    //Collision detection
    //array into force layout, updates start to happen, updated accordingly
    //link nodes var to twitter data array
    force.nodes(twitterData.statuses)
        .on('tick',tick)
        .on('end',end)  
        .start();
  
}


function tick(e){
      //implement custom tick function.

        circles = plot.selectAll('.circ');
       
        circles.each(collide(.5));
        
        circles.attr("cx",function(d) { return d.x})
                .attr("cy",function(d) { return d.y});
        
}

//******************
//This doesn't update once the force layout minimization has stopped - need to figure out 
//how to update nicely!!

function end(e) {

        circles = plot.selectAll('.circ-group');

    /*
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
    */
       //based on http://jsfiddle.net/nrabinowitz/5CfGG/
    //and http://bl.ocks.org/milroc/4254604
    circles.each(function(d,i){
                
            //create a satellites array with one entry for each retweet
            satellites = [];
            
            for (var i = 0; i<d.retweet_count; i++){
                satellite = {parentX:d.x, parentY:d.y, retweets:d.retweet_count, parentR:d.r}
                satellites.push(satellite);
            }
            //console.log(satellites.length);
            
            if(satellites.length>0){ 
                /*
                //map satellite data to a tree
                var dataTree = {
                    children: satellites.map(function(d) { return { size: satellites.length }; })
                };

                // make a radial tree layout
                var tree = d3.layout.tree()
                    //value of 5 has some effect on radius (1 is still pretty large, doesn't look linear...)
                    .size([360, 1])//function(d){
                        //console.log(d.r);
                        //return [360, 20]})
                    .separation(function(a, b) {
                        return radiusScale(a.size) + radiusScale(b.size);
                });

                // apply the layout to the data
                var satNodes = tree.nodes(dataTree);
                console.log(satNodes.slice(1));

                // create dom elements for the node
                var satNode = plot.selectAll(".satNode")
                      .data(satNodes.slice(1)) // cut out the root node, we don't need it
                      .enter().append("g")
                      .attr("class", "node")
                      .attr("transform", function(d) {
//*****************check what's going on here...recursive???                          
                          //console.log(d);          
                          return "rotate(" + (d.x - 90) + ") translate(" + d.y + ")";
                      })

                satNode.append("circle")
                    .attr("r", function(d) { return radiusScale(2); }); */

                //set angle per step for satellites arranged around center circle
                var toAngle = d3.scale.linear().domain([0, d.retweets]).range([0, 360]);

                d3.select(this).selectAll('satellites')
                    .data(satellites)
                    .enter()
                    .append('circle')
                    .attr('class','satellites')
                    .attr('cx',function(d,i){
                         return d.parentX+((d.parentR+3)*Math.sin(toAngle(i)));})
                    .attr('cy',function(d,i){
                         return d.parentY+((d.parentR+3)*Math.cos(toAngle(i)));})
                    .attr('r',2)
                    .style('fill','rgba(153, 155, 230,.9)');
            }
    })
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

/*
function attachTooltip(selection){
    
        //returns plot div, with svg, groups, all circles and circle groups in it. 
        console.log(canvas.node());
    
        selection
        .on('mouseenter',function(d){
            var tooltip = d3.select('.custom-tooltip');
            tooltip
                .transition()
                .style('opacity',1);
                //tried making separate classes to set tooltip box color to match lines; something broke.
                /*.attr('class', function(){
                    if(d.key=='Coffee, green'){
                        return 'coffee-tooltip'
                    }
                    else if (d.key=='Tea'){
                        return 'tea-tooltip'
                    }
                });
                


        })
        .on('mousemove',function(d){
            var xy = d3.mouse(canvas.node());
            //console.log(xy);

            var tooltip = d3.select('.custom-tooltip');

            tooltip
                .style('left',xy[0]+50+'px')
                .style('top',(xy[1]+50)+'px')
                .html(d.value);

        })
        .on('mouseleave',function(){
            var tooltip = d3.select('.custom-tooltip')
                .transition()
                .style('opacity',0);
        })
}
   */ 