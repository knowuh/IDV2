var canvas = document.getElementById("canvas").getContext("2d");
//find the canvas element and drawing object
var canvasHeight = 500;
var canvasWidth = 500;

//orange
canvas.beginPath();
canvas.fillStyle = "hsla(30, 100%, 50%, 0.2)";
canvas.fillRect(250, 0, 250, 250);

//lime green
canvas.beginPath();
canvas.fillStyle = "hsla(80, 84%, 58%, 0.8)";
canvas.fillRect(250, 285, 80, 80);

//hot pink
canvas.beginPath();
canvas.fillStyle = "hsla(300, 100%, 50%, 0.4)";
canvas.fillRect(25, 100, 100, 100);

//yellow
canvas.beginPath();
canvas.fillStyle = "hsla(60, 100%, 50%, 0.4)";
canvas.fillRect(75, 125, 100, 100);

//dark green
canvas.beginPath();
canvas.fillStyle = "hsla(120, 100%, 25%, 0.4)";
canvas.fillRect(200, 100, 80, 80);

//turquoise
canvas.beginPath();
canvas.fillStyle = "hsla(180, 100%, 50%, 0.4)";
canvas.fillRect(10, 210, 225, 225);

//purple
canvas.beginPath();
canvas.fillStyle = "hsla(288, 100%, 30%, 0.4)";
canvas.fillRect(270, 26, 90, 90);

//teal
canvas.beginPath();
canvas.fillStyle = "hsla(180, 100%, 25%, 0.4)";
canvas.fillRect(150, 150, 150, 150);

//light pink
canvas.beginPath();
canvas.fillStyle = "hsla(0, 60%, 70%, 0.4)";
canvas.fillRect(310, 310, 150, 150);

//light light blue
canvas.beginPath();
canvas.fillStyle = "hsla(186, 60%, 50%, 0.3)";
canvas.fillRect(350, 200, 130, 130);

/* what I want to tell the computer to do is: 
   1) draw 10 squares of random sizes between 25-100 pixels
   2) the 10 squares should randomly overlap
   3) the 10 squares should each have a random color
   4) they should all be the same transparency
   
    ....I could not figure out the functions that I needed to do the things I wanted to do here. So I resorted to drawing 10 individual squares and assigned them each a color and position:

   1) draw square with this color, at this position, this size
   2) draw square with this color, at this position, this size
   3) draw square with this color, at this position, this size, et. al.
   
   I know there's an easier and more interesting way to do this....
*/ 
