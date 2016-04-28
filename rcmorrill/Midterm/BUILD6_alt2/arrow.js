
var canvas = document.getElementById('arrow').getContext("2d");
var canvasHeight = 150;
var canvasWidth  = 300;



    canvas.beginPath();
    canvas.moveTo(Math.floor(Math.random()*20)+40,Math.floor(Math.random()*40)+25);
    canvas.lineTo(Math.floor(Math.random()*120)+300,Math.floor(Math.random()*40)+25);
    canvas.stroke();

