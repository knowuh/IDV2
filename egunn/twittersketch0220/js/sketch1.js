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
    .charge(-30)
    .gravity(3) //in absence of all forces, nodes should be fixed where they are. Can get rid of all forces, and implement own custom gravity
    .on('tick',tick)
    .start();

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
        
       // console.log('here');
        circles = plot.selectAll('.circ');
        
        //use this line if circles are starting out at 0,0 to put them in place. Since only updating
        //from orig random position based on collision force, no need to update here.
//**********************************
//this line is translating by the entire value of the original position. Should translate by delta, //instead - not overwriting 
        //circles.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
        circles.each(collide)
                .attr("cx",function(d) { return d.x})
                .attr("cy",function(d) { return d.y});
        
        labels = plot.selectAll('.labels');
        
        labels.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
        
}

function collide(alpha){
    
            var q = d3.geom.quadtree(twitterData.statuses),
                i = 0,
                n = twitterData.statuses.length;

            while (++i < n) {
                q.visit(function(twitterData.statuses[i])); //calls collide function, which passes back 
                //updated values and boolean to indicate whether
                //updates occurred. q is a quadtree, which has a callback function visit that calls the 
                //collide function on each datapoint.
                //(see https://github.com/mbostock/d3/wiki/Quadtree-Geom)
            }
    
    //from assignment 6, modified to match variable names
    //define a variable with properties based on input data, return a function that stores comparator conditions to check
    //for collisions. That function returns true if modifications are necessary, and overwrites original data.

    //read original data x and y values, store x and y positions twice (presumably so that you can change nx1 and nx2 separately)
    //console.log(dataPoint.user.followers_count);
    var nr = dataPoint.r + 15,
        nx1 = dataPoint.x - nr,
        ny1 = dataPoint.y - nr,
        nx2 = dataPoint.x + nr,
        ny2 = dataPoint.y + nr;

    return function(quadPoint,x1,y1,x2,y2){
        //check whether the point is equal to the data point input. If so, take the difference between x and y values,
        //and the square root of a sum of squares (pythagorean theorem - does this calculate the difference in radius for the two objects?),
        //and a new radius value that's bigger than the radius of the initial data point.
        if(quadPoint.point && (quadPoint.point !== dataPoint)){
            var x = dataPoint.x - quadPoint.point.x,
                y = dataPoint.y - quadPoint.point.y,
                l = Math.sqrt(x*x+y*y),
                r = nr + quadPoint.point.r;//dataPoint.user.followers_count)
            //if the radius is smaller than this sum, make the x values slightly bigger for both (why not y values also?)
            
            //console.log(quadPoint.point.r);
            if(l<r){
                
//****************************
//What's happening with the -= and *= here??
                l = (l-r)/l*.1;
                dataPoint.x -= x *= (l*.1);
                dataPoint.y -= y *= (l*.1);
                quadPoint.point.x += (x*.1);
                quadPoint.point.y += (y*.1);
            }
        }
        //output the results, so that the x and y values of the new array are bigger than the minimum calculated by the collide function.
        return x1>nx2 || x2<nx1 || y1>ny2 || y2<ny1;  // asks if a collision is happening - checks whether x1>nx2 OR x2<nx1 (etc)
        //the result of the expression is a boolean; if any of these things is true, it returns true (checks to see if modified).
}
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

    var circles = plot.selectAll('circ')
        .data(twitterData.statuses)
        .enter();
    
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
        .style('fill','rgba(153, 255, 230,.6)');
    
    circles    
        .append('text')
        .attr('class','labels')
        .attr('x', function(d){return d.xPos})
        .attr('y',function(d){return d.yPos})
        .attr("font-size","10px")
        .attr('fill','rgb(100,100,100)')
        .attr('text-anchor',"middle")
        .text(function(d){
            return "@" + d.user.screen_name + " " + d.user.followers_count;
        });
            
    //Collision detection
    //array into force layout, updates start to happen, updated accordingly
    //link nodes var to twitter data array
    force.nodes(twitterData.statuses)
    

}


//function collide(dataPoint){
    

//    }

    