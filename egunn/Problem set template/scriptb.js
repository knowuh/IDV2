//Declare an empty array to hold circles later
var circleArray = [];

//declare variables to be stored in the Circle objects, and variables for passing values into the objects. (No types in Javascript; use var instead of int/color)
var xPos, yPos, xRad, yRad, col;
var xIn, yIn, xRIn,yRIn,colIn;
    
//create the function that will actually add values to the circles. Because circles are a subset of the ellipse drawing function, define an x and a y radius value; when the two values are the same, you get a circle.
function Circle(xIn,yIn,xRIn,yRIn,colIn){
    //set the parameters of the object
    this.xPos = xIn;
    this.yPos = yIn;
    this.xRad = xRIn;
    this.yRad = yRIn;
    this.Col = colIn;
    
    //define a display function for the circle objects
    this.display = function() {
        //set the fill color using the parameter stored in the object
        fill(this.Col);    
        //draw an ellipse using the parameters stored in the object.
ellipse(this.xPos,this.yPos,this.xRad,this.yRad);
    }
}

//Create three circle objects using a for loop.
for (var i=0;i<3;i++){
    //create a new circle object and store it in the temp variable
    var temp = new Circle(100+i*50,470,25+i*10,25+i*10,105);
    //add that object to the end of the circleArray
    circleArray.push(temp);
}
    
//set up the canvas - this section runs only once
function setup() {
    createCanvas(1024,768);
    stroke('none');
    fill(155);
}

//the draw function runs many times per second (30?) - anything in here executes continuously
function draw() {
    //set the canvas to white
    background(255);
    //go through the circleArray one element at a time and draw a circle for each object, using the display function saved above
    for (var i=0; i<circleArray.length;i++){
        circleArray[i].display();
    };
}