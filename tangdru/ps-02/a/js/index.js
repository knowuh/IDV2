var ctx = document.getElementById("canvas").getContext("2d");



var input1 = 40,
    input2 = 10,
    
    random1 = Math.random(),

    point1 = 1.5,
    point2 = 2.5,
    point3 = 3,
    point4 = 2;





ctx.beginPath();  
ctx.translate(200, 5);
ctx.moveTo(point1*input1, input1);
ctx.lineTo(point2*input1, input1);
ctx.lineTo(point3*input1, point4*input1);    
ctx.lineTo(point4*input1, point3*input1);   
ctx.lineTo(input1, point4*input1);   
ctx.lineTo(point1*input1, input1);    
ctx.closePath();
ctx.fillStyle = "rgba(200, 10, 200, 1)";

ctx.save();

ctx.translate(20,40);
ctx.rotate(.3);
ctx.scale(1.2, 1.2);
ctx.beginPath();              
ctx.moveTo(point1*input1, input1);
ctx.lineTo(point2*input1, input1);
ctx.lineTo(point3*input1, point4*input1);    
ctx.lineTo(point4*input1, point3*input1);   
ctx.lineTo(input1, point4*input1);   
ctx.lineTo(point1*input1, input1);    
ctx.closePath();
ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
ctx.fill();


ctx.translate(50,50);
ctx.rotate(-.3);
ctx.scale(.5, .4);
ctx.beginPath();              
ctx.moveTo(point1*input1, input1);
ctx.lineTo(point2*input1, input1);
ctx.lineTo(point3*input1, point4*input1);    
ctx.lineTo(point4*input1, point3*input1);   
ctx.lineTo(input1, point4*input1);   
ctx.lineTo(point1*input1, input1);    
ctx.closePath();
ctx.fillStyle = "rgba(106, 175, 90, 1)";
ctx.fill();


ctx.translate(100,100);
ctx.rotate(-.1);
ctx.scale(.8, .8);
ctx.beginPath();              
ctx.moveTo(point1*input1, input1);
ctx.lineTo(point2*input1, input1);
ctx.lineTo(point3*input1, point4*input1);    
ctx.lineTo(point4*input1, point3*input1);   
ctx.lineTo(input1, point4*input1);   
ctx.lineTo(point1*input1, input1);    
ctx.closePath();
ctx.fillStyle = "rgba(100, 100, 100, .5)";
ctx.fill();


ctx.translate(50,50);
ctx.rotate(.3);
ctx.scale(1.2, 1.3);
ctx.beginPath();              
ctx.moveTo(point1*input1, input1);
ctx.lineTo(point2*input1, input1);
ctx.lineTo(point3*input1, point4*input1);    
ctx.lineTo(point4*input1, point3*input1);   
ctx.lineTo(input1, point4*input1);   
ctx.lineTo(point1*input1, input1);    
ctx.closePath();
ctx.fillStyle = "rgba(200, 10, 200, .70)";
ctx.fill();


ctx.translate(100,80);
ctx.rotate(-.1);
ctx.scale(1.2, .8);
ctx.beginPath();              
ctx.moveTo(point1*input1, input1);
ctx.lineTo(point2*input1, input1);
ctx.lineTo(point3*input1, point4*input1);    
ctx.lineTo(point4*input1, point3*input1);   
ctx.lineTo(input1, point4*input1);   
ctx.lineTo(point1*input1, input1);    
ctx.closePath();
ctx.fillStyle = "rgba(100, 100, 100, .5)";
ctx.fill();


ctx.translate(2,10);
ctx.rotate(.5);
ctx.scale(1.3, 1.2);
ctx.beginPath();              
ctx.moveTo(point1*input1, input1);
ctx.lineTo(point2*input1, input1);
ctx.lineTo(point3*input1, point4*input1);    
ctx.lineTo(point4*input1, point3*input1);   
ctx.lineTo(input1, point4*input1);   
ctx.lineTo(point1*input1, input1);    
ctx.closePath();
ctx.fillStyle = "rgba(0, 100, 200, 0.5)";
ctx.fill();


ctx.translate(100,40);
ctx.rotate(-.8);
ctx.scale(1.4, 1.8);
ctx.beginPath();              
ctx.moveTo(point1*input1, input1);
ctx.lineTo(point2*input1, input1);
ctx.lineTo(point3*input1, point4*input1);    
ctx.lineTo(point4*input1, point3*input1);   
ctx.lineTo(input1, point4*input1);   
ctx.lineTo(point1*input1, input1);    
ctx.closePath();
ctx.fillStyle = "rgba(000, 250, 250, 0.5)";
ctx.fill();

ctx.translate(20,40);
ctx.rotate(.1);
ctx.scale(1.4, 1.8);
ctx.beginPath();              
ctx.moveTo(point1*input1, input1);
ctx.lineTo(point2*input1, input1);
ctx.lineTo(point3*input1, point4*input1);    
ctx.lineTo(point4*input1, point3*input1);   
ctx.lineTo(input1, point4*input1);   
ctx.lineTo(point1*input1, input1);    
ctx.closePath();
ctx.fillStyle = "rgba(000, 250, 0, 0.5)";
ctx.fill();


ctx.translate(100,50);
ctx.rotate(1.4);
ctx.scale(1.2, 1.4);
ctx.beginPath();              
ctx.moveTo(point1*input1, input1);
ctx.lineTo(point2*input1, input1);
ctx.lineTo(point3*input1, point4*input1);    
ctx.lineTo(point4*input1, point3*input1);   
ctx.lineTo(input1, point4*input1);   
ctx.lineTo(point1*input1, input1);    
ctx.closePath();
ctx.fillStyle = "rgba(200, 10, 200, .5)";
ctx.fill();


ctx.translate(20,10);
ctx.rotate(-.1);
ctx.scale(1.5, 3);
ctx.beginPath();              
ctx.moveTo(point1*input1, input1);
ctx.lineTo(point2*input1, input1);
ctx.lineTo(point3*input1, point4*input1);    
ctx.lineTo(point4*input1, point3*input1);   
ctx.lineTo(input1, point4*input1);   
ctx.lineTo(point1*input1, input1);    
ctx.closePath();
ctx.fillStyle = "rgba(100, 100, 100, .5)";
ctx.fill();






//    ctx.fillStyle = "red";
//    ctx.fillRect(40, 80, 80, 80);
//    // Now, let's draw a rotated yellow rectangle on the right
//    // First, let's save our canvas context in order to easily restore
//    // it after our transformations
//    ctx.save();
//    // Next, we'll translate (move the origin) to the center
//    // of where we'll be drawing the rectangle
//    ctx.translate(240, 120);
//    // Any transformations applied from here on out will be
//    // relative to the origin of 240, 120
//    // Note that we're using radians, not degrees to specify rotation
//    ctx.rotate(Math.PI / 4); // 45 degrees
//    // If we desired to scale the rectangle as well, we'd do that here:
//    // ctx.scale(1.5, 1.5); // 1.5x normal size on both the x and y axis
//    // Now we're ready to draw our rectangle
//    // The diffence this time is that our coordinates are relative
//    // to the origin, just like the .rotate call
//    ctx.fillStyle = "yellow";
//    ctx.fillRect(-40, -40, 80, 80);
//    // Finally, we restore our canvas context so that subsquent draws
//    // are not transformed
//    ctx.restore();

