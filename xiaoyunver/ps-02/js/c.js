/**
 * Created by June on 16/2/1.
 */
/*jshint laxbreak: true, browser: true*/

var canvas       = document.getElementById("canvas").getContext("2d");
var canvasHeight = 500;
var canvasWidth  = 500;


var lineMargin= 1;
var lineNumbers=1000;
var lineLength=100;
var x= 0, y= 0;

for(var i=0;i<(lineNumbers/2);++i){
    x=Math.random()*500;
    y=Math.random()*500;
    x1=x+lineLength;
    y1=y+lineLength;

    canvas.beginPath();
    canvas.moveTo(x,y);
    canvas.lineTo(x+10,y+10);
    canvas.lineWidth = 5;
    canvas.strokeStyle='#007F66';
    canvas.stroke();



}

for(var i=0;i<(lineNumbers/2);++i){
    x=Math.random()*500;
    y=Math.random()*500;
    x1=Math.random()*500;
    y1=Math.random()*500;

    canvas.beginPath();
    canvas.moveTo(x,y);
    canvas.lineTo(x+100,y+100);
    canvas.lineWidth = 1;
    canvas.strokeStyle='#00BF9A';
    canvas.stroke();



}