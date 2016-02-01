var canvas = document.getElementById("drawingCanvas")
var heading = document.getElementById("heading")
var footer = document.getElementById("footer")

canvas.height = window.innerHeight-heading.clientHeight-footer.clientHeight-footer.style.bottom-70
canvas.width = window.innerWidth
