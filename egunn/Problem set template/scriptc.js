
//Set up the drawing environment here (based on code from d3 class, by Siqi Zhu). Create a margin to set the space around the window. Look at the size of the canvas element, and set width and the height variables for the drawing. 
var margin = {t:20,r:20,b:20,l:20};
var width = document.getElementById('myCanvas').clientWidth-margin.l-margin.r,
	height = document.getElementById('myCanvas').clientHeight-margin.t-margin.b;

//select the HTML canvas class, and add an svg canvas to it. Store the result in a variable for future access.
var plot = d3.select('.canvas')
    .append('svg')
    //set the width and height of the canvas based on the container margins above
    .attr('width',width+margin.l+margin.r)
    .attr('height',height+margin.t+margin.b)
    //create a group in the canvas to hold items added later
    .append('g')
    //assign the class of the group to be "plot"
    .attr('class','plot')
    //move the group to correspond to the canvas margins
.attr('transform','translate('+margin.l+','+margin.t+')');

//create a constructor function to generate circle objects (could just draw circles directly, but storing them as objects allows updating and animation later). Declare a function called circleConstructor, with input variables x,y,and size, which will be the variables entered when the function is called. 
function circleConstructor(x, y, size) {
    //create variable called circle to hold the object
    var circle = {
        //and define the object attributes. Store the input values for x, y, and size for later use, but call them cx, cy, and r.
        cx:x,
        cy:y,
        r:size,
        //set the fill color
        //fill:'rgb(155,155,155)' //moved to css
    }
    
    //tell the function to hand the newly created circle back to the function that called it.
    return circle;
}

//create a new variable - this time an array to hold the three circle objects that we want to create ([] indicates array). Call the circle constructor three times, and each time give it a different value for x, y, and size. This way, the constructor function will pass back three different circles, to be stored in the array.
var circles = [circleConstructor(50,50,20), circleConstructor(200,650,45),circleConstructor(700,455,5)];

//select everything with class "drawnCircle" in the plot variable stored above (remember, this contains the group stored inside the svg canvas). We haven't made anything with the class drawnCircle yet, so this will return an empty selection.
plot.selectAll('.drawnCircle')
    //bind the data inside the circles array to the selection. This creates a new DOM element for each entry in the array (since there are three circle objects in the array, it will create three empty DOM elements, just waiting for us to put something in them.)
    .data(circles)
    //actually create the DOM elements
    .enter()
    //and draw a circle in each one.
    .append('circle')
    //set the class of the circles to drawnCircle
    .attr('class','drawnCircle')
    //to draw a circle, d3 needs a cx, cy, and an r value. Use an anonymous function (which just means that it's not named, and only used once) to look inside the bound data array and retrieve values. The bound data is now called "d", so we create a function, hand it d, and ask it to give us back the cx value stored inside the object. Since d is the array that contains our circle objects, the first one will return cx = 50, the second cx=200, and the third cx = 400.
    .attr('cx',function(d){return d.cx})
    .attr('cy',function(d){return d.cy})
    .attr('r',function(d){return d.r})
    //set the fill color for the circles by accessing the fill value (could also do this from the css file using the circle class)
    //.style('fill', function(d){return d.fill});

