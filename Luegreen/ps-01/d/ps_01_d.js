var y = 160
var d = 880


function setup() {
    createCanvas (windowWidth, windowHeight);
}

function draw() {
    background(204);
    ellipse(475, y/6, d, d); //Right
    fill(102, 130);
    ellipse(575, y/2, d, d); //left
    fill(204);

    ellipse(75, 450, d/18, d/18); //Middle
    fill(53);


}