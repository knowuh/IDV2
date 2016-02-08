
var margin = {t:50,r:50,b:50,l:50};
var width = document.getElementById('plot').clientWidth-margin.l-margin.r,
  height = document.getElementById('plot').clientHeight-margin.t-margin.b;


var plot = d3.select('.canvas')
  .append('svg')
  .attr('width',width+margin.l+margin.r)
  .attr('height',height+margin.t+margin.b)
  .append('g')
  .attr('class','plot')
  .attr('transform', 'translate ('+margin.l+','+margin.r+')');

console.log(width,height);

var columnVariables = [
  "criticalcommunication",
  "criticalcommunication_2",
  "graphicdesign",
  "graphicdesign_2",
  "howlongdidittakeyoutogethere",
  "howmanyhoursperweekcanyoudevotetothisclass",
  "howmuchsleepdidyougetlastnight",
  "howtallareyou",
  "javascriptwebdevelopment",
  "javascriptwebdevelopment_2",
  "whenwasthelasttimeyoudrewapicture",
  "whenwasthelasttimeyouwenttothebeach",
  "whenwasthelasttimeyouwenttothemfa"
];

/**************************************************
 * this is the function that updates the D3 graph *
 * @param data – the google spreadsheet data      *
 **************************************************/
  var scaleX = d3.scale.linear().domain([0,10]).range([0,width])
  var scaleY = d3.scale.linear().domain([0,10]).range([height,0])
  var scaleC = d3.scale.linear().domain([0,12]).range(['rgb(178,12,0)','white'])

var force = d3.layout.force()
    .size([width,height])
    .charge(-200)
    .gravity(0);

var axisX = d3.svg.axis()
    .orient('bottom')
    .tickValues([0,2,4,6,8,10])
    .scale(scaleX);

plot.append('rect')
    .attr('x',width/2)
    .attr('y',0)
    .attr('height',height)
    .attr('width',5)
    .attr('fill','gray')

  plot.append('text')
  .text('rated less than 6')
  .attr('class','axis')
  .attr('transform','translate('+(width/3)+',0)')

plot.append('text')
  .text('rated 6 or higher')
  .attr('class','axis')
  .attr('transform','translate('+((width/2)+60)+',0)')

function placeNodes(){
    nodes
        .transition()
        .attr('cx',function(d){return scaleX(d.x)})
        .attr('cy',function(d){return d.y})
}



var drawGraph = function (data) {



d3.selectAll('.btn-div2').on('click',function(){
    var id = d3.select(this).attr('id');
    console.log("test: " + id);

            if(id =='one'){
            var id = 4
                draw(id,data);
        }else if(id =='2'){
            var id = 5
                draw(id,data);
        }else if(id =='3'){
            var id = 6
                draw(id,data);
         }else if(id =='4'){
            var id = 7
                draw(id,data);
        }else {
            var id = 10
                draw(id,data);
        }
})
var draw = function(id,data){


var nodes = plot.selectAll ('.split')
	.data(data, function(d){return d.name});

nodes.enter()
	.append('text').attr('class','split')
  .attr('x',function(d){return scaleX(d[columnVariables[id]])})
  .attr('y',height/2)//.attr('class','new')
  .text(function(d){return d.name})
  .attr('fill','gray')
  //.attr('opacity','.6')


nodes.exit().remove();

nodes.transition()
  force.nodes(data)
    .on('tick',onForceTick)
    .start();


function onForceTick(e){
    var q = d3.geom.quadtree(data),
        i = 0,
        n = data.length;

    while( ++i<n ){
        q.visit(collide(data[i]));
    }

    nodes
        .each(function(d){

        var focus ={};

        if(d[columnVariables[id]] < 6){focus.x=width/5}
        else{focus.x=((width/4)*3)}

        focus.y=height/2

            d.x += (focus.x-d.x)*(e.alpha*.04);
            d.y += (focus.y-d.y)*(e.alpha*.08);

        })
        .attr('x',function(d){return d.x})
        .attr('y',function(d){return d.y})


}//END onForceTick Function


  }//end draw
};//end drawGraph

// This jQuery function tells the browser to run the function
// `continuouslyLoadData` when the webpage is done loading.
// `continuouslyLoadData` is defined in spreadheet.js.
//  It will call our `drawGraph` function with new data every 5 seconds.
// See spreadsheet.js for the definition of `continuouslyLoadData`.
$(document).ready(function () {
  continuouslyLoadData("1tL7m0JNa0CZwEyU9WmB3u8j5T829jqtbnu-26ibPp5E", drawGraph);
  });



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
                l = (l-r)/l*.5;
                dataPoint.x -= x*= (l*.05);
                dataPoint.y -= y*= l;
                quadPoint.point.x += (x*.15);
                quadPoint.point.y += (y*20);
            }
        }
        return x1>nx2 || x2<nx1 || y1>ny2 || y2<ny1;
    }
}