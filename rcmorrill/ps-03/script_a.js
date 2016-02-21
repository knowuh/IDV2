
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
  var scaleC = d3.scale.linear().domain([4,10]).range(['rgb(178,12,0)','white'])


var axisX = d3.svg.axis()
    .orient('bottom')
    .tickValues([0,2,4,6,8,10])
    .scale(scaleX);

plot.append('text')
  .text('Larger circles = can devote more hours to class')
  .attr('class','first_label')
  .attr('opacity','0')
  .attr('transform','translate('+(width/2)+','+(height/3)+')')

plot.append('text')
  .text('Darker circles = more sleep deprived')
  .attr('class','second_label')
  .attr('opacity','0')
  .attr('transform','translate('+(width/2)+','+((height/3)*2)+')')

  plot.append('text')
  .text('Larger circles = can devote more hours to class')
  .attr('class','axis first_label1')
  .attr('opacity','0')
  .attr('transform','translate('+(width/2)+',0)')

plot.append('text')
  .text('Darker circles = more sleep deprived')
  .attr('class','axis second_label2')
  .attr('opacity','0')
  .attr('transform','translate('+(width/2)+',20)')


var axisY = d3.svg.axis()
    .orient('left')
    .tickValues([2,4,6,8,10])
    .scale(scaleY);

plot.append('g').attr('class','axis axis-y')
    .transition().delay(100).call(axisY)
    .attr('opacity','0');

plot.append('g').attr('class','axis axis-x')
    .attr('transform','translate(0,'+(height-20)+')')
    .transition().delay(100).call(axisX)
    .attr('opacity','0');

plot.append('text')
  .text('last time at the m.f.a.').attr('class','axis')
  .attr('transform','translate(0,'+(height+40)+')')
  .attr('opacity','0');

plot.append('text')
  .text('beach').attr('class','axis')
  //.attr('transform','translate(0,'+(height-50)+')')
  .attr('opacity','0');


var drawGraph = function (data) {


plot.select('.first_label').transition().delay(0).attr('opacity','1')//plot.select('.first_label').transition().delay(100).attr('opacity','1')

plot.select('.second_label').transition().delay(700).attr('opacity','1')



var graph = plot.selectAll ('.circle')
  .data(data, function(d){return d.name})
  

graph.enter()
  .append('circle').attr('class','circle')
  .attr('cx',function(d,i){return scaleX((i*.6)+1)})
  .attr('cy',height/2)
  .attr('r',4)
  .attr('fill',function(d){return scaleC(6)})
  .transition().attr('r',function(d){return d.howmanyhoursperweekcanyoudevotetothisclass*4})
  .transition().delay(500).duration(500).attr('fill',function(d){return scaleC(d.howmuchsleepdidyougetlastnight)})

  
graph.exit().remove();

d3.select('#graph').on('click',function(){graph.transition()
  .attr('cx', function(d){return scaleX(d.whenwasthelasttimeyouwenttothemfa)})
  .attr('cy', function(d){return scaleY(d.whenwasthelasttimeyouwenttothebeach)});


plot.select('.first_label').classed('none',true)

plot.select('.second_label').classed('none',true)

plot.selectAll('.axis').attr('opacity','1')



  
})
  
};

// This jQuery function tells the browser to run the function
// `continuouslyLoadData` when the webpage is done loading.
// `continuouslyLoadData` is defined in spreadheet.js.
//  It will call our `drawGraph` function with new data every 5 seconds.
// See spreadsheet.js for the definition of `continuouslyLoadData`.
$(document).ready(function () {
  continuouslyLoadData("1tL7m0JNa0CZwEyU9WmB3u8j5T829jqtbnu-26ibPp5E", drawGraph);
  });