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
var circleR=7;

console.log(document.getElementById('plot').clientHeight);
var plot = d3.select('#plot')
    .append('svg')
    .attr('width',width+margin.l+margin.r)
    .attr('height',height+margin.t+margin.b)
    .append('g')
    .attr('class','plot')
    .attr('transform', 'translate ('+margin.l+','+margin.r+')');


//append container
plot.append('g')
    .append('rect')
    .attr('class','rect')
    .attr('id','rectDrew')
    .attr('x','0')
    .attr('y','280')
    .attr('height','150')
    .attr('width',width/5-10);



plot.append('g')
    .append('rect')
    .attr('class','rect')
    .attr('id','rectBeach')
    .attr('x',width/5*1)
    .attr('y','280')
    .attr('height','150')
    .attr('width',width/5-10);


plot.append('g')
    .append('rect')
    .attr('class','rect')
    .attr('id','rectMFA')
    .attr('x',width/5*2)
    .attr('y','280')
    .attr('height','150')
    .attr('width',width/5-10);



plot.append('g')
    .append('rect')
    .attr('class','rect')
    .attr('id','rectHours')
    .attr('x',width/5*3)
    .attr('y','280')
    .attr('height','150')
    .attr('width',width/5-10);



plot.append('g')
    .append('rect')
    .attr('class','rect')
    .attr('id','rectSleep')
    .attr('x',width/5*4)
    .attr('y','280')
    .attr('height','150')
    .attr('width',width/5-10);


var textX=15;
var symbol=plot.append('g')
    .attr('class','symbol')
    .attr('transform','translate(7,480)');

symbol.append('circle')
    .attr('r','7')
    .attr('class','c12');

symbol.append('text')
    .text('Range 1~2')
    .attr('x',textX)
    .attr('y','7');

symbol.append('circle')
    .attr('r','7')
    .attr('cy','20')
    .attr('class','c34');

symbol.append('text')
    .text('Range 3~4')
    .attr('x',textX)
    .attr('y','27');

symbol.append('circle')
    .attr('r','7')
    .attr('cy','40')
    .attr('class','c56');

symbol.append('text')
    .text('Range 5~6')
    .attr('x',textX)
    .attr('y','47');

symbol.append('circle')
    .attr('r','7')
    .attr('cy','60')
    .attr('class','c78');

symbol.append('text')
    .text('Range 7~8')
    .attr('x',textX)
    .attr('y','67');

symbol.append('circle')
    .attr('r','7')
    .attr('cy','80')
    .attr('class','c910');

symbol.append('text')
    .text('Range 9~10')
    .attr('x',textX)
    .attr('y','87');


//Rect text
var rectWidth=width/5-10;
var rectText=plot.append('g')
    .attr('transform','translate(0,450)')
    .attr('class','rectText');

rectText.append('text')
    .text('Drew')
    .attr('class','rectText')
    .attr('x',rectWidth/2);

rectText.append('text')
    .text('Beach')
    .attr('class','rectText')
    .attr('x',rectWidth*(2-0.5)+10);

rectText.append('text')
    .text('MFA')
    .attr('class','rectText')
    .attr('x',rectWidth*(3-0.5)+20);

rectText.append('text')
    .text('Hours Devoted')
    .attr('class','rectText')
    .attr('x',rectWidth*(4-0.5)+30);

rectText.append('text')
    .text('Sleep')
    .attr('class','rectText')
    .attr('x',rectWidth*(5-0.5)+40);








var drawGraph = function(data){



    var nameClass= plot.selectAll('.name')
        .data(data)
        .enter()
        .append('g')
        .attr('class','name')
        .attr('id',function(d){return d.name;});

    nameClass
        .append('text')
        .attr('x',80)
        .attr('y',function(d,i){return i*20;})
        .text(function(d){return d.name});

//append circle
    nameClass
        .append('circle')
        .attr('r',circleR)
        .attr('cx',function(d){return circleR*0+10;})
        .attr('cy',function(d,i){return i*20-circleR;})
        .attr('class','c12')
        .select('#rectDrew');


    nameClass
        .append('circle')
        .attr('r',circleR)
        .attr('cx',function(d){return circleR*2+10;})
        .attr('cy',function(d,i){return i*20-circleR;})
        .attr('class','c34');

    nameClass
        .append('circle')
        .attr('r',circleR)
        .attr('cx',function(d){return circleR*4+10;})
        .attr('cy',function(d,i){return i*20-circleR;})
        .attr('class','c56');

    nameClass
        .append('circle')
        .attr('r',circleR)
        .attr('cx',function(d){return circleR*6+10;})
        .attr('cy',function(d,i){return i*20-circleR;})
        .attr('class','c78');

    nameClass
        .append('circle')
        .attr('r',circleR)
        .attr('cx',function(d){return circleR*8+10;})
        .attr('cy',function(d,i){return i*20-circleR;})
        .attr('class','c910');




//Interaction
    d3.select('#rectDrew')
        .on('mouseover',function(){


            d3.selectAll('.name')
                .each(function(d){
                    switch(d.whenwasthelasttimeyoudrewapicture)
                    {
                        case '1':
                        case '2':d3.select(this)
                            .select('.c12')
                            .transition()
                            .attr('cx',function(){return Math.random()*(width/5-17-circleR)+7;})
                            .attr('cy',function(){return (Math.random()*(143-circleR)+287)});break;
                        case '3':
                        case '4':d3.select(this)
                            .select('.c34')
                            .transition()
                            .attr('cx',function(){return Math.random()*(width/5-17-circleR)+7;})
                            .attr('cy',function(){return (Math.random()*(143-circleR)+287)});break;
                        case '5':
                        case '6':d3.select(this)
                            .select('.c56')
                            .transition()
                            .attr('cx',function(){return Math.random()*(width/5-17-circleR)+7;})
                            .attr('cy',function(){return (Math.random()*(143-circleR)+287)});break;
                        case '7':
                        case '8':d3.select(this)
                            .select('.c78')
                            .transition()
                            .attr('cx',function(){return Math.random()*(width/5-17-circleR)+7;})
                            .attr('cy',function(){return (Math.random()*(143-circleR)+287)});break;
                        case '9':
                        case '10':d3.select(this)
                            .select('.c910')
                            .transition()
                            .attr('cx',function(){return Math.random()*(width/5-17-circleR)+7;})
                            .attr('cy',function(){return (Math.random()*(143-circleR)+287)});break;
                    }
                    })
        })
        .on('mouseleave',function(){


            d3.selectAll('.name')
                .each(function(d,i){
                    console.log('i de zhi shi '+i);
                    var index= i;
                    switch(d.whenwasthelasttimeyoudrewapicture)
                    {
                        case '1':
                        case '2':d3.select(this)
                            .select('.c12')
                            .transition()
                            .attr('cx',function(d){return circleR*0+10;})
                            .attr('cy',function(d,i){return index*20-circleR;});break;
                        case '3':
                        case '4':d3.select(this)
                            .select('.c34')
                            .transition()
                            .attr('cx',function(d){return circleR*2+10;})
                            .attr('cy',function(d,i){return index*20-circleR;});break;
                        case '5':
                        case '6':d3.select(this)
                            .select('.c56')
                            .transition()
                            .attr('cx',function(d){return circleR*4+10;})
                            .attr('cy',function(d,i){return index*20-circleR;});break;
                        case '7':
                        case '8':d3.select(this)
                            .select('.c78')
                            .transition()
                            .attr('cx',function(d){return circleR*6+10;})
                            .attr('cy',function(d,i){return index*20-circleR;});break;
                        case '9':
                        case '10':d3.select(this)
                            .select('.c910')
                            .transition()
                            .attr('cx',function(d){return circleR*8+10;})
                            .attr('cy',function(d,i){return index*20-circleR;});break;
                    }
                })
        });



    d3.select('#rectBeach')
        .on('mouseover',function(){


            d3.selectAll('.name')
                .each(function(d){
                    switch(d.whenwasthelasttimeyouwenttothebeach)
                    {
                        case '1':
                        case '2':d3.select(this)
                            .select('.c12')
                            .transition()
                            .attr('cx',function(d){return Math.random()*(width/5-10-2*circleR)+(width/5+circleR);})
                            .attr('cy',function(){return (Math.random()*(143-circleR)+287)});break;
                        case '3':
                        case '4':d3.select(this)
                            .select('.c34')
                            .transition()
                            .attr('cx',function(d){return Math.random()*(width/5-10-2*circleR)+(width/5+circleR);})
                            .attr('cy',function(){return (Math.random()*(143-circleR)+287)});break;
                        case '5':
                        case '6':d3.select(this)
                            .select('.c56')
                            .transition()
                            .attr('cx',function(d){return Math.random()*(width/5-10-2*circleR)+(width/5+circleR);})
                            .attr('cy',function(){return (Math.random()*(143-circleR)+287)});break;
                        case '7':
                        case '8':d3.select(this)
                            .select('.c78')
                            .transition()
                            .attr('cx',function(d){return Math.random()*(width/5-10-2*circleR)+(width/5+circleR);})
                            .attr('cy',function(){return (Math.random()*(143-circleR)+287)});break;
                        case '9':
                        case '10':d3.select(this)
                            .select('.c910')
                            .transition()
                            .attr('cx',function(d){return Math.random()*(width/5-10-2*circleR)+(width/5+circleR);})
                            .attr('cy',function(){return (Math.random()*(143-circleR)+287)});break;
                    }
                })
        })
        .on('mouseleave',function(){


            d3.selectAll('.name')
                .each(function(d,i){
                    console.log('i de zhi shi '+i);
                    var index= i;
                    switch(d.whenwasthelasttimeyouwenttothebeach)
                    {
                        case '1':
                        case '2':d3.select(this)
                            .select('.c12')
                            .transition()
                            .attr('cx',function(d){return circleR*0+10;})
                            .attr('cy',function(d,i){return index*20-circleR;});break;
                        case '3':
                        case '4':d3.select(this)
                            .select('.c34')
                            .transition()
                            .attr('cx',function(d){return circleR*2+10;})
                            .attr('cy',function(d,i){return index*20-circleR;});break;
                        case '5':
                        case '6':d3.select(this)
                            .select('.c56')
                            .transition()
                            .attr('cx',function(d){return circleR*4+10;})
                            .attr('cy',function(d,i){return index*20-circleR;});break;
                        case '7':
                        case '8':d3.select(this)
                            .select('.c78')
                            .transition()
                            .attr('cx',function(d){return circleR*6+10;})
                            .attr('cy',function(d,i){return index*20-circleR;});break;
                        case '9':
                        case '10':d3.select(this)
                            .select('.c910')
                            .transition()
                            .attr('cx',function(d){return circleR*8+10;})
                            .attr('cy',function(d,i){return index*20-circleR;});break;
                    }
                })
        });

    d3.select('#rectMFA')
        .on('mouseover',function(){


            d3.selectAll('.name')
                .each(function(d){
                    switch(d.whenwasthelasttimeyouwenttothemfa)
                    {
                        case '1':
                        case '2':d3.select(this)
                            .select('.c12')
                            .transition()
                            .attr('cx',function(d){return Math.random()*(width/5-10-2*circleR)+(width/5*2+circleR);})
                            .attr('cy',function(){return (Math.random()*(143-circleR)+287)});break;
                        case '3':
                        case '4':d3.select(this)
                            .select('.c34')
                            .transition()
                            .attr('cx',function(d){return Math.random()*(width/5-10-2*circleR)+(width/5*2+circleR);})
                            .attr('cy',function(){return (Math.random()*(143-circleR)+287)});break;
                        case '5':
                        case '6':d3.select(this)
                            .select('.c56')
                            .transition()
                            .attr('cx',function(d){return Math.random()*(width/5-10-2*circleR)+(width/5*2+circleR);})
                            .attr('cy',function(){return (Math.random()*(143-circleR)+287)});break;
                        case '7':
                        case '8':d3.select(this)
                            .select('.c78')
                            .transition()
                            .attr('cx',function(d){return Math.random()*(width/5-10-2*circleR)+(width/5*2+circleR);})
                            .attr('cy',function(){return (Math.random()*(143-circleR)+287)});break;
                        case '9':
                        case '10':d3.select(this)
                            .select('.c910')
                            .transition()
                            .attr('cx',function(d){return Math.random()*(width/5-10-2*circleR)+(width/5*2+circleR);})
                            .attr('cy',function(){return (Math.random()*(143-circleR)+287)});break;
                    }
                })
        })
        .on('mouseleave',function(){


            d3.selectAll('.name')
                .each(function(d,i){
                    console.log('i de zhi shi '+i);
                    var index= i;
                    switch(d.whenwasthelasttimeyouwenttothemfa)
                    {
                        case '1':
                        case '2':d3.select(this)
                            .select('.c12')
                            .transition()
                            .attr('cx',function(d){return circleR*0+10;})
                            .attr('cy',function(d,i){return index*20-circleR;});break;
                        case '3':
                        case '4':d3.select(this)
                            .select('.c34')
                            .transition()
                            .attr('cx',function(d){return circleR*2+10;})
                            .attr('cy',function(d,i){return index*20-circleR;});break;
                        case '5':
                        case '6':d3.select(this)
                            .select('.c56')
                            .transition()
                            .attr('cx',function(d){return circleR*4+10;})
                            .attr('cy',function(d,i){return index*20-circleR;});break;
                        case '7':
                        case '8':d3.select(this)
                            .select('.c78')
                            .transition()
                            .attr('cx',function(d){return circleR*6+10;})
                            .attr('cy',function(d,i){return index*20-circleR;});break;
                        case '9':
                        case '10':d3.select(this)
                            .select('.c910')
                            .transition()
                            .attr('cx',function(d){return circleR*8+10;})
                            .attr('cy',function(d,i){return index*20-circleR;});break;
                    }
                })
        });

    d3.select('#rectHours')
        .on('mouseover',function(){


            d3.selectAll('.name')
                .each(function(d){
                    switch(d.howmanyhoursperweekcanyoudevotetothisclass)
                    {
                        case '1':
                        case '2':d3.select(this)
                            .select('.c12')
                            .transition()
                            .attr('cx',function(d){return Math.random()*(width/5-10-2*circleR)+(width/5*3+circleR);})
                            .attr('cy',function(){return (Math.random()*(143-circleR)+287)});break;
                        case '3':
                        case '4':d3.select(this)
                            .select('.c34')
                            .transition()
                            .attr('cx',function(d){return Math.random()*(width/5-10-2*circleR)+(width/5*3+circleR);})
                            .attr('cy',function(){return (Math.random()*(143-circleR)+287)});break;
                        case '5':
                        case '6':d3.select(this)
                            .select('.c56')
                            .transition()
                            .attr('cx',function(d){return Math.random()*(width/5-10-2*circleR)+(width/5*3+circleR);})
                            .attr('cy',function(){return (Math.random()*(143-circleR)+287)});break;
                        case '7':
                        case '8':d3.select(this)
                            .select('.c78')
                            .transition()
                            .attr('cx',function(d){return Math.random()*(width/5-10-2*circleR)+(width/5*3+circleR);})
                            .attr('cy',function(){return (Math.random()*(143-circleR)+287)});break;
                        case '9':
                        case '10':d3.select(this)
                            .select('.c910')
                            .transition()
                            .attr('cx',function(d){return Math.random()*(width/5-10-2*circleR)+(width/5*3+circleR);})
                            .attr('cy',function(){return (Math.random()*(143-circleR)+287)});break;
                    }
                })
        })
        .on('mouseleave',function(){


            d3.selectAll('.name')
                .each(function(d,i){
                    console.log('i de zhi shi '+i);
                    var index= i;
                    switch(d.howmanyhoursperweekcanyoudevotetothisclass)
                    {
                        case '1':
                        case '2':d3.select(this)
                            .select('.c12')
                            .transition()
                            .attr('cx',function(d){return circleR*0+10;})
                            .attr('cy',function(d,i){return index*20-circleR;});break;
                        case '3':
                        case '4':d3.select(this)
                            .select('.c34')
                            .transition()
                            .attr('cx',function(d){return circleR*2+10;})
                            .attr('cy',function(d,i){return index*20-circleR;});break;
                        case '5':
                        case '6':d3.select(this)
                            .select('.c56')
                            .transition()
                            .attr('cx',function(d){return circleR*4+10;})
                            .attr('cy',function(d,i){return index*20-circleR;});break;
                        case '7':
                        case '8':d3.select(this)
                            .select('.c78')
                            .transition()
                            .attr('cx',function(d){return circleR*6+10;})
                            .attr('cy',function(d,i){return index*20-circleR;});break;
                        case '9':
                        case '10':d3.select(this)
                            .select('.c910')
                            .transition()
                            .attr('cx',function(d){return circleR*8+10;})
                            .attr('cy',function(d,i){return index*20-circleR;});break;
                    }
                })
        });

    d3.select('#rectSleep')
        .on('mouseover',function(){


            d3.selectAll('.name')
                .each(function(d){
                    switch(d.howmuchsleepdidyougetlastnight)
                    {
                        case '1':
                        case '2':d3.select(this)
                            .select('.c12')
                            .transition()
                            .attr('cx',function(d){return Math.random()*(width/5-10-2*circleR)+(width/5*4+circleR);})
                            .attr('cy',function(){return (Math.random()*(143-circleR)+287)});break;
                        case '3':
                        case '4':d3.select(this)
                            .select('.c34')
                            .transition()
                            .attr('cx',function(d){return Math.random()*(width/5-10-2*circleR)+(width/5*4+circleR);})
                            .attr('cy',function(){return (Math.random()*(143-circleR)+287)});break;
                        case '5':
                        case '6':d3.select(this)
                            .select('.c56')
                            .transition()
                            .attr('cx',function(d){return Math.random()*(width/5-10-2*circleR)+(width/5*4+circleR);})
                            .attr('cy',function(){return (Math.random()*(143-circleR)+287)});break;
                        case '7':
                        case '8':d3.select(this)
                            .select('.c78')
                            .transition()
                            .attr('cx',function(d){return Math.random()*(width/5-10-2*circleR)+(width/5*4+circleR);})
                            .attr('cy',function(){return (Math.random()*(143-circleR)+287)});break;
                        case '9':
                        case '10':d3.select(this)
                            .select('.c910')
                            .transition()
                            .attr('cx',function(d){return Math.random()*(width/5-10-2*circleR)+(width/5*4+circleR);})
                            .attr('cy',function(){return (Math.random()*(143-circleR)+287)});break;
                    }
                })
        })
        .on('mouseleave',function(){


            d3.selectAll('.name')
                .each(function(d,i){
                    console.log('i de zhi shi '+i);
                    var index= i;
                    switch(d.howmuchsleepdidyougetlastnight)
                    {
                        case '1':
                        case '2':d3.select(this)
                            .select('.c12')
                            .transition()
                            .attr('cx',function(d){return circleR*0+10;})
                            .attr('cy',function(d,i){return index*20-circleR;});break;
                        case '3':
                        case '4':d3.select(this)
                            .select('.c34')
                            .transition()
                            .attr('cx',function(d){return circleR*2+10;})
                            .attr('cy',function(d,i){return index*20-circleR;});break;
                        case '5':
                        case '6':d3.select(this)
                            .select('.c56')
                            .transition()
                            .attr('cx',function(d){return circleR*4+10;})
                            .attr('cy',function(d,i){return index*20-circleR;});break;
                        case '7':
                        case '8':d3.select(this)
                            .select('.c78')
                            .transition()
                            .attr('cx',function(d){return circleR*6+10;})
                            .attr('cy',function(d,i){return index*20-circleR;});break;
                        case '9':
                        case '10':d3.select(this)
                            .select('.c910')
                            .transition()
                            .attr('cx',function(d){return circleR*8+10;})
                            .attr('cy',function(d,i){return index*20-circleR;});break;
                    }
                })
        });


};

$(document).ready(function () {
    continuouslyLoadData("1tL7m0JNa0CZwEyU9WmB3u8j5T829jqtbnu-26ibPp5E", drawGraph);
});


//"whenwasthelasttimeyoudrewapicture", Drew
//    "whenwasthelasttimeyouwenttothebeach", Beach
//    "whenwasthelasttimeyouwenttothemfa" MFA
//"howmanyhoursperweekcanyoudevotetothisclass", Hours Devoted
//    "howmuchsleepdidyougetlastnight", Sleep