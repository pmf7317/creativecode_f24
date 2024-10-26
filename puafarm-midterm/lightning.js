//lightning
var xCoord1 = 0;
var yCoord1 = 0;
var xCoord2 = 0;
var yCoord2 = 0;

//clouds
let clouds = [];

//raindrops
let rains = [];

// I tried to make them seperate .js files but my sceenManagerLibrary didn't like it?
class Cloud{
  constructor(x, y){
    //positional
    this.x = x;
    this.y = y;
    
    //size
    this.sizex = random(150, 200);
    this.sizey = random(30, 50);
  }
  
  display(){
    fill(50);
    noStroke();
    ellipse(this.x, this.y, this.sizex, this.sizey);
    ellipse(this.x + 50, this.y + 30, this.sizex, this.sizey);
    ellipse(this.x - 50, this.y + 30, this.sizex, this.sizey);
  }
}

class Rain{
  constructor(x, y){
    this.position = createVector(x, y);
    this.velocity = createVector(0, random(7, 10));
    this.length = random(15, 30); 
    this.gerth = random(255);
  }

  display(){
    stroke(255, this.gerth);
    line(this.position.x, this.position.y, this.position.x, (this.position.y - this.length));
  }

  update(){
    this.position.add(this.velocity)
    if (this.y > height + 50){
      rains.shift();
    }
  }
}

function setup() {
  createCanvas(innerWidth, innerHeight); 
  
  // Lightning set-up
  xCoord2 = 0;
  yCoord2 = height / 2;

  // Generate Clouds (set amount (i < __ is how many clouds I want)) 
  // Add cloud objects to array (storage)
  for (let i = 0; i < 50; i++) {
    let x = random(0, width);
    let y = random(0, height / 3); // Upper quarter of screen
    let cloud = new Cloud(x, y);
    clouds.push(cloud);
  }
}


function draw() {
  for (var i = 0; i < 20; i++) {
    xCoord1 = xCoord2;
    yCoord1 = yCoord2;
    xCoord2 = xCoord1 + int(random(-20, 20));
    yCoord2 = yCoord1 + int(random(-10, 20));
    strokeWeight(random(1, 4));
    // strokeJoin(MITER);
    line(xCoord1, yCoord1, xCoord2, yCoord2);

    if ((xCoord2 > width) | (xCoord2 < 0) | (yCoord2 > height) | (yCoord2 < 0)) {
      clear();
      drawBackground();
      xCoord2 = int(random(0, width));
      yCoord2 = 0;
      stroke(255, 255, random(0, 255));
    }
  }
  // Generate Raindrops
  for (let i = 0; i < 0.1; i++){
    rains.push(new Rain(random(width), 0))
  }
}

function drawBackground() {
  background(0);
  
  // Iterate through clouds array to display all clouds
  for (let cloud of clouds) {
    cloud.display();
  }

  // Iterate through rains array to display all raindrops
  // Check lag?
  for (let rain of rains) {
    rain.display();
    rain.update();
  }
}
  