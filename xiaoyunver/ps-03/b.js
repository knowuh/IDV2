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

var margin = {t:50,r:50,b:50,l:50};
var width = document.getElementById('plot').clientWidth-margin.l-margin.r;
var height = document.getElementById('plot').clientHeight-margin.t-margin.b;

console.log(document.getElementById('plot').clientHeight);
var plot = d3.select('#plot')
    .append('svg')
    .attr('width',width+margin.l+margin.r)
    .attr('height',height+margin.t+margin.b)
    .append('g')
    .attr('class','plot')
    .attr('transform', 'translate ('+margin.l+','+margin.r+')');

    plot.append("circle")
        .attr("cx",(width/5)/2)
        .attr("cy","100")
        .attr("r",(width/5)/2)
        .attr('class','stroke-circle');
plot.append("circle")
    .attr("cx",(width/5*2)-(width/5/2))
    .attr("cy","100")
    .attr("r",(width/5)/2)
    .attr('class','stroke-circle');
plot.append("circle")
    .attr("cx",(width/5*3)-(width/5/2))
    .attr("cy","100")
    .attr("r",(width/5)/2)
    .attr('class','stroke-circle');
plot.append("circle")
    .attr("cx",(width/5*4)-(width/5/2))
    .attr("cy","100")
    .attr("r",(width/5)/2)
    .attr('class','stroke-circle');
plot.append("circle")
    .attr("cx",(width)-(width/5/2))
    .attr("cy","100")
    .attr("r",(width/5)/2)
    .attr('class','stroke-circle');

plot.append('text')
    .text('Drew')
    .attr('x',width/5/2)
    .attr('y',width/4-15)
    .attr("text-anchor", "middle");
plot.append('text')
    .text('Beach')
    .attr('x',width/5*2-width/5/2)
    .attr('y',width/4-15)
    .attr("text-anchor", "middle");
plot.append('text')
    .text('MFA')
    .attr('x',width/5*3-width/5/2)
    .attr('y',width/4-15)
    .attr("text-anchor", "middle");
plot.append('text')
    .text('Hours Devoted')
    .attr('x',width/5*4-width/5/2)
    .attr('y',width/4-15)
    .attr("text-anchor", "middle");
plot.append('text')
    .text('Sleep')
    .attr('x',width-width/5/2)
    .attr('y',width/4-15)
    .attr("text-anchor", "middle");

var drawGraph = function(data){
    var radius=data.length;
    var plotEnter=plot.selectAll('.name')
        .data(data)
        .enter();
    plotEnter.append('text')
        .text(function(d){return d.name;})
        .attr('x','10')
        .attr('y',function(d,i){return height/radius*i+(width/4)+10;});

    var dataset=[1,2,3,4,5];
    plot.selectAll('.node')
        .data(dataset)
        .enter()
        .append('circle')
        .attr('cx',function(d,i){return 15*i+25;})
        .attr('cy','500')
        .attr('r','5')
        .style('fill',function(d){
            switch(d){
                case 1:return "black";break;
                case 2:return "red";break;
                case 3:return "yellow";break;
                case 4:return "blue";break;
                case 5:return "purple";break;
            }
        });
}

$(document).ready(function () {
    continuouslyLoadData("1tL7m0JNa0CZwEyU9WmB3u8j5T829jqtbnu-26ibPp5E", drawGraph);
});


//"whenwasthelasttimeyoudrewapicture", Drew
//    "whenwasthelasttimeyouwenttothebeach", Beach
//    "whenwasthelasttimeyouwenttothemfa" MFA
//"howmanyhoursperweekcanyoudevotetothisclass", Hours Devoted
//    "howmuchsleepdidyougetlastnight", Sleep