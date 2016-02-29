var m = {t:10,r:10,b:10,l:10},
    w = d3.select('.smallplot').node().clientWidth,
    h = d3.select('.smallplot').node().clientHeight;

var m = {t:10,r:10,b:10,l:10},
    wMain = d3.select('.mainplot').node().clientWidth,
    hMain = d3.select('.mainplot').node().clientHeight;

var scaleX = d3.scale.linear().domain([0,10]).range([0,w]),
    scaleY = d3.scale.linear().domain([0,10]).range([h,0]);

var scaleXmain = d3.scale.linear().domain([0,10]).range([0,wMain]),
    scaleYmain = d3.scale.linear().domain([0,10]).range([hMain-m.t-m.b,0]);

//mainplot value arrays
var avg = [7.17,7.5,6.29,6.93,3.43,5.36],
    title = ["Communication","Graphic Design","Software"];

//var tip = d3.tip()
//                .attr('class','d3-tip')
//                .offset([0,0])
//                .html(function(d){return d.name;});

var graphSetup = function (data) {
    
        var draw = function (data){
            console.log(data);
            
            var legend = d3.select('.legend')
                .append('svg').attr('width',200).attr('height',50)
                .attr('opacity',.3);
            
            legend.append('circle')
                .attr('cx',15)
                .attr('cy',40)
                .attr('r',4);
            
            legend.append('text')
                .attr('transform','translate(22,43)')
                .attr('class','number')
                .text('current skill level');
            
            legend.append('circle')
                .attr('cx',113)
                .attr('cy',40)
                .attr('r',4)
                .attr('stroke-width',1)
                .attr('stroke','black')
                .attr('fill','white');
            
            legend.append('text')
                .attr('transform','translate(120,43)')
                .attr('class','number')
                .text('expected skill level');
            
            //main plot 1 - communication
            var mainplot = d3.select('.container').selectAll('.mainplot')
                .append('svg')
                .attr('width',wMain)
                .attr('height',hMain)
                .append('g')
                .attr('transform','translate(0,'+ m.t+')');
            
            mainplot.append('text')
                .attr('transform','translate(0,30)')
                .attr('class','title')
                .text('communication')
                .style('fill','#b57ed9');
            
            mainplot.append('text')
                .attr('transform','translate(0,65)')
                .attr('class','number')
                .text('1')
                .attr('opacity',.3);
            
            mainplot.append('text')
                .attr('transform','translate('+wMain/1.02+',65)')
                .attr('class','number')
                .text('10')
                .attr('opacity',.3);
            
            mainplot.append('line')
                .attr('y1',hMain/2)
                .attr('x1', scaleXmain(0))
                .attr('y2',hMain/2)
                .attr('x2', scaleXmain(10))
                .attr('stroke-width',1)
                .attr('stroke','black')
                .attr('opacity',.3);
            
            mainplot.append('line')
                .attr('y1',hMain/2)
                .attr('x1', scaleXmain(7.14))
                .attr('y2',hMain/2)
                .attr('x2', scaleXmain(7.5))
                .attr('stroke-width',2)
                .attr('stroke','#b57ed9');
                
            mainplot.append('circle')
                .attr('cy', hMain/2 )
                .attr('cx', scaleXmain(7.5))
                .attr('r',8)
                .attr('fill','white')
                .attr('stroke-width',2)
                .attr('stroke','#b57ed9');
                
            mainplot.append('circle')
                .attr('cy', hMain/2)
                .attr('cx', scaleXmain(7.14))
                .attr('r',8)
                .style('fill','#b57ed9');
            
            
            //small multiple 1 - communication
            
            var smallplot = d3.select('.container').selectAll('.smallplot')
                .data(data);
            
            smallplot.enter()
                .append('div').attr('class','smallplot');
                //.call(tip);

            smallplot.each(function(d){
                var svg = d3.select(this)
                    .append('svg')
                    .attr('class','graph')
                    .attr('width', w)
                    .attr('height', h);

                var group = svg.append('g')
                    .attr('transform','translate(0,'+ m.t+')');
                
                group.append('line')
                    .attr('x1',w/2)
                    .attr('y1', scaleY(0))
                    .attr('x2',w/2)
                    .attr('y2', scaleY(10))
                    .attr('stroke-width',.5)
                    .attr('stroke','black')
                    .attr('opacity',.3);
                
                group.append('line')
                    .attr('x1',w/2)
                    .attr('y1', scaleY(d.criticalcommunication))
                    .attr('x2',w/2)
                    .attr('y2', scaleY(d.criticalcommunication_2))
                    .attr('stroke-width',1)
                    .attr('stroke','#b57ed9');
                
                group.append('circle')
                    .attr('cx', w/2 )
                    .attr('cy', scaleY(d.criticalcommunication_2))
                    .attr('r',4)
                    .attr('fill','white')
                    .attr('stroke-width',1)
                    .attr('stroke','#b57ed9');
                    //.on('mouseover','tip.show')
                    //.on('mouseout','tip.hide');
                
                 group.append('circle')
                    .attr('cx', w/2)
                    .attr('cy', scaleY(d.criticalcommunication))
                    .attr('r',4)
                    .style('fill','#b57ed9')
                    .on('mouseover','tip.show')
                    .on('mouseout','tip.hide');
            })
            
            //main plot 2 - graphic design
            var mainplot2 = d3.select('.container2').selectAll('.mainplot2')
                .append('svg')
                .attr('width',wMain)
                .attr('height',hMain)
                .append('g')
                .attr('transform','translate(0,'+ m.t+')');
            
            mainplot2.append('text')
                .attr('transform','translate(0,30)')
                .attr('class','title2')
                .text('graphic design')
                .style('fill','#6c9ef8');
            
//            mainplot2.append('text')
//                .attr('transform','translate(0,65)')
//                .attr('class','number')
//                .text('1')
//                .attr('opacity',.3);
//            
//            mainplot2.append('text')
//                .attr('transform','translate('+wMain/1.02+',65)')
//                .attr('class','number')
//                .text('10')
//                .attr('opacity',.3);
            
            mainplot2.append('line')
                .attr('y1',hMain/2)
                .attr('x1', scaleXmain(0))
                .attr('y2',hMain/2)
                .attr('x2', scaleXmain(10))
                .attr('stroke-width',1)
                .attr('stroke','black')
                .attr('opacity',.3);
            
            mainplot2.append('line')
                .attr('y1',hMain/2)
                .attr('x1', scaleXmain(6.29))
                .attr('y2',hMain/2)
                .attr('x2', scaleXmain(6.9))
                .attr('stroke-width',2)
                .attr('stroke','#6c9ef8');
                
            mainplot2.append('circle')
                .attr('cy', hMain/2 )
                .attr('cx', scaleXmain(6.9))
                .attr('r',8)
                .attr('fill','white')
                .attr('stroke-width',2)
                .attr('stroke','#6c9ef8');
                
            mainplot2.append('circle')
                .attr('cy', hMain/2)
                .attr('cx', scaleXmain(6.29))
                .attr('r',8)
                .attr('fill','#6c9ef8');
            
            //small multiple 2 - graphic design
            var smallplot2 = d3.select('.container2').selectAll('.smallplot2')
                .data(data);

            smallplot2.enter()
                .append('div').attr('class','smallplot2');

            smallplot2.each(function(d){
                var svg = d3.select(this)
                    .append('svg')
                    .attr('class','graph')
                    .attr('width', w)
                    .attr('height', h);

                var group2 = svg.append('g')
                    .attr('transform','translate(0,'+ m.t+')');
                
                group2.append('line')
                    .attr('x1',w/2)
                    .attr('y1', scaleY(0))
                    .attr('x2',w/2)
                    .attr('y2', scaleY(10))
                    .attr('stroke-width',.5)
                    .attr('stroke','black')
                    .attr('opacity',.3);
                
                group2.append('line')
                    .attr('x1',w/2)
                    .attr('y1', scaleY(d.graphicdesign))
                    .attr('x2',w/2)
                    .attr('y2', scaleY(d.graphicdesign_2))
                    .attr('stroke-width',1)
                    .attr('stroke','#6c9ef8');
                
                group2.append('circle')
                    .attr('cx', w/2 )
                    .attr('cy', scaleY(d.graphicdesign_2))
                    .attr('r',4)
                    .attr('fill','white')
                    .attr('stroke-width',1)
                    .attr('stroke','#6c9ef8');
                
                 group2.append('circle')
                    .attr('cx', w/2)
                    .attr('cy', scaleY(d.graphicdesign))
                    .attr('r',4)
                    .style('fill','#6c9ef8');
            })
            
            //main plot 3 - software
            var mainplot3 = d3.select('.container3').selectAll('.mainplot3')
                .append('svg')
                .attr('width',wMain)
                .attr('height',hMain)
                .append('g')
                .attr('transform','translate(0,'+ m.t+')');
            
            mainplot3.append('text')
                .attr('transform','translate(0,30)')
                .attr('class','title3')
                .text('software')
                .style('fill','#85a300');
            
            mainplot3.append('line')
                .attr('y1',hMain/2)
                .attr('x1', scaleXmain(0))
                .attr('y2',hMain/2)
                .attr('x2', scaleXmain(10))
                .attr('stroke-width',1)
                .attr('stroke','black')
                .attr('opacity',.3);
            
            mainplot3.append('line')
                .attr('y1',hMain/2)
                .attr('x1', scaleXmain(3.43))
                .attr('y2',hMain/2)
                .attr('x2', scaleXmain(5.36))
                .attr('stroke-width',2)
                .attr('stroke','#85a300');
                
            mainplot3.append('circle')
                .attr('cy', hMain/2 )
                .attr('cx', scaleXmain(5.36))
                .attr('r',8)
                .attr('fill','white')
                .attr('stroke-width',2)
                .attr('stroke','#85a300');
                
            mainplot3.append('circle')
                .attr('cy', hMain/2)
                .attr('cx', scaleXmain(3.43))
                .attr('r',8)
                .style('fill','#85a300');
            
            //small multiple 2 - graphic design
            var smallplot3 = d3.select('.container3').selectAll('.smallplot3')
                .data(data);

            smallplot3.enter()
                .append('div').attr('class','smallplot3');

            smallplot3.each(function(d){
                var svg = d3.select(this)
                    .append('svg')
                    .attr('class','graph')
                    .attr('width', w)
                    .attr('height', h);

                var group3 = svg.append('g')
                    .attr('transform','translate(0,'+ m.t+')');
                
                group3.append('line')
                    .attr('x1',w/2)
                    .attr('y1', scaleY(0))
                    .attr('x2',w/2)
                    .attr('y2', scaleY(10))
                    .attr('stroke-width',.5)
                    .attr('stroke','black')
                    .attr('opacity',.3);
                
                group3.append('line')
                    .attr('x1',w/2)
                    .attr('y1', scaleY(d.graphicdesign))
                    .attr('x2',w/2)
                    .attr('y2', scaleY(d.graphicdesign_2))
                    .attr('stroke-width',1)
                    .attr('stroke','#85a300');
                
                group3.append('circle')
                    .attr('cx', w/2 )
                    .attr('cy', scaleY(d.graphicdesign_2))
                    .attr('r',4)
                    .attr('fill','white')
                    .attr('stroke-width',1)
                    .attr('stroke','#85a300');
                
                 group3.append('circle')
                    .attr('cx', w/2)
                    .attr('cy', scaleY(d.graphicdesign))
                    .attr('r',4)
                    .style('fill','#85a300');
            })
        }
        
        var drawmain ;
    
    
    var setData = function (sheet) {
        spreadsheetData = sheet;
        draw(spreadsheetData);
    };

    $(document).ready( function () {
        continuouslyLoadData("1tL7m0JNa0CZwEyU9WmB3u8j5T829jqtbnu-26ibPp5E",                    setData);
    });
};

graphSetup();
    
    


