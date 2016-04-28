
var margin = {t:50,r:50,b:50,l:50};
var width = document.getElementById('cluster').clientWidth-margin.l-margin.r,
  height = document.getElementById('cluster').clientHeight-margin.t-margin.b;



var plot = d3.select('.cluster')
  .append('svg')
  .attr('width',width+margin.l+margin.r)
  .attr('height',height+margin.t+margin.b)
  .append('g')
  .attr('class','plot')
  .attr('transform', 'translate ('+margin.l+','+margin.r+')');



  var scaleX = d3.scale.linear().domain([0,10]).range([0,width])
  var scaleYhue = d3.scale.linear().domain([80,167]).range([height,0])
  var scaleYsat = d3.scale.linear().domain([20,150]).range([height,0])
  var scaleYbright = d3.scale.linear().domain([80,175]).range([height,0])


var force = d3.layout.force()
    .size([width,height])
    .charge(0)
    .gravity(0);

var axisX = d3.svg.axis()
    .orient('bottom')
    .tickValues([0,2,4,6,8,10])
    .scale(scaleX);

/*----------------labels--------*/

plot.append('text')
  .text('High')
  .attr('class','labels')
  .attr('x',width)
  .attr('y',5)

plot.append('text')
  .text('Low')
  .attr('class','labels')
  .attr('x',width)
  .attr('y',height*.75)

plot.append('rect')
  .attr('x',width*.95)
  .attr('y',0)
  .attr('height',height*.75)
  .attr('width','2px')

// plot.append('text')
//   .text('Distribution of Google image results')
//   .attr('class','labels');

d3.csv ('starryNight/starryNight.csv',parse,dataLoaded);

function parse(d){


      return{
        r: 7,
        bright: +d.brightness_median,
        sat: +d.saturation_median,
        hue: +d.hue_median,
        label: d.filename,
        key: d.key,
      }
}

function dataLoaded(err,data){


console.log(data);

// d3.selectAll('.button').on('click',function(){
//     var id = d3.select(this).attr('id');
//     //console.log("test: " + id);

//             if(id =='hue'){
//             var id = 4
//                 draw(hue);
//         }else if(id =='bright'){
//             var id = 5
//                 draw(bright);
//         }else{
//             var id = 6
//                 draw(sat);
//          }
// })


// var draw = function(input){

var nodes = plot.selectAll ('.node')
	.data(data, function(d){return d.label});

var nodesEnter= nodes.enter()
    .append("image")
    .attr("class", "node")
    .attr("xlink:href", function(d){return 'starryNight/images/'+ d.label})
    .attr('x',function(d){return d.x})
    .attr('y',function(d){return scaleYhue(d.y)})
    .attr('width',50)
    .attr("height", 50)
    //.attr('opacity',.4)
        .on( 'mouseenter', function() {
            // select element in current context
            d3.select( this )
              .transition()
              .attr("height", function(d){ console.log(d.label); return 200})
              .attr("width", 200)
              .style('zindex','10000')



          })
          // set back
          .on( 'mouseleave', function() {
            d3.select( this )
              .transition()
              .attr("height", 40)
              .attr("width", 40);
          });


nodes.exit().remove();

nodes.transition()
  force.nodes(data)
    .on('tick',hueForce)
    .start();

    d3.select('#bright').on('click',function(){
      force.stop()
        .on('tick',brightForce)
        .start()

    });

    d3.select('#hue').on('click',function(){
      force.stop()
        .on('tick',hueForce)
        .start()

    });

    d3.select('#sat').on('click',function(){
      force.stop()
        .on('tick',satForce)
        .start()

    });




function brightForce(e){
    var q = d3.geom.quadtree(data),
        i = 0,
        n = data.length;

    while( ++i<n ){
        q.visit(collide(data[i]));
    }
 nodes
        .each(function(d){
        var focus = {};
           focus.x = width*.4;
           focus.y = d.bright;

            d.x += (focus.x-d.x)*(e.alpha*.1);
            d.y += (focus.y-d.y)*(e.alpha*.1);
        })
       .attr('y',function(d){return scaleYbright(d.y)})
       .attr('x',function(d){return d.x})


}//END onForceTick Function

function satForce(e){
    var q = d3.geom.quadtree(data),
        i = 0,
        n = data.length;

    while( ++i<n ){
        q.visit(collide(data[i]));
    }
 nodes
        .each(function(d){
        var focus = {};
           focus.x = width*.4;
           focus.y = d.sat;

            d.x += (focus.x-d.x)*(e.alpha*.1);
            d.y += (focus.y-d.y)*(e.alpha*.1);
        })
       .attr('y',function(d){return scaleYsat(d.y)})
       .attr('x',function(d){return d.x})


}//END onForceTick Function
function hueForce(e){
    var q = d3.geom.quadtree(data),
        i = 0,
        n = data.length;

    while( ++i<n ){
        q.visit(collide(data[i]));
    }
 nodes
        .each(function(d){
        var focus = {};
           focus.x = width*.4;
           focus.y = d.hue;

            d.x += (focus.x-d.x)*(e.alpha*.1);
            d.y += (focus.y-d.y)*(e.alpha*.1);
        })
       .attr('y',function(d){return scaleYhue(d.y)})
       .attr('x',function(d){return d.x})


}//END onForceTick Function


  // }//end draw


}//dataloaded


function collide(dataPoint){
    var nr = dataPoint.r + 2,
        nx1 = dataPoint.x - nr,
        ny1 = dataPoint.y - nr,
        nx2 = dataPoint.x + nr,
        ny2 = dataPoint.y + nr;

    return function(quadPoint,x1,y1,x2,y2){
        if(quadPoint.point && (quadPoint.point !== dataPoint)){
            var x = dataPoint.x - quadPoint.point.x,
                y = dataPoint.y - quadPoint.point.y,
                l = Math.sqrt(x*x+y*y),
                r = nr + quadPoint.point.r;
            if(l<r){
                l = (l-r)/l*.1;
                dataPoint.x -= x*= l;
                dataPoint.y -= y*= (l*.05);
                quadPoint.point.x += x;
                quadPoint.point.y += (y*.05);
            }
        }
        return x1>nx2 || x2<nx1 || y1>ny2 || y2<ny1;
    }
}






