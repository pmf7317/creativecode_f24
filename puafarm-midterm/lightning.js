function lightning(){

  let width = 1800;
  let height = 1200;

  //lightning
  var xCoord1 = 0;
  var yCoord1 = 0;
  var xCoord2 = 0;
  var yCoord2 = 0;

  //clouds
  let clouds = [];

  //raindrops
  let rains = [];

  let timer = 0;

  // i tried to make them seperate .js files but my sceenManagerLibrary didn't like it (too complicated)?
  class Cloud{
    constructor(x, y){
      //positional
      this.x = x;
      this.y = y;
      
      //size
      this.sizex = random(150, 200);
      this.sizey = random(30, 50);
    }
    
    //shows diff clouds
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
      this.velocity = createVector(0, random(10, 20));
      this.length = random(15, 30); 
      this.gerth = random(255);
    }
    //raindrops vary in shape, size, velocity
    display(){
      stroke(255, this.gerth);
      line(this.position.x, this.position.y, this.position.x, this.position.y - this.length);
      // print(rains.length)
    }

    //try to help with lag and storage
    update(){
      this.position.add(this.velocity)
      if (rains.length > 750){
        rains = [];
      }
      if (this.y > height + 30){
        rains.shift();
      }
    }
  }

  this.setup = function() {
    background(0);

    // lightning set-up
    xCoord2 = 0;
    yCoord2 = height / 2;

    // generate clouds & add cloud objects to array (storage)
    for (let i = 0; i < 50; i++) {
      let x = random(0, width);
      let y = random(0, height / 3); // upper quarter of screen
      let cloud = new Cloud(x, y);
      clouds.push(cloud);
    }
  }

  this.draw =function() {
    timer++;

    // generate lightning
    for (var i = 0; i < 20; i++) {
      xCoord1 = xCoord2;
      yCoord1 = yCoord2;
      xCoord2 = xCoord1 + int(random(-20, 20));
      yCoord2 = yCoord1 + int(random(-10, 20));
      strokeWeight(random(1, 4));
      line(xCoord1, yCoord1, xCoord2, yCoord2);

      //checks
      if ((xCoord2 > width) | (xCoord2 < 0) | (yCoord2 > height) | (yCoord2 < 0)) {
        clear();
        this.drawBackground();
        xCoord2 = int(random(0, width));
        yCoord2 = 0;
        stroke(255, 255, random(0, 255));
      }
    }
    // generate raindrops
    for (let i = 0; i < 1; i++){
      rains.push(new Rain(random(width), 0));
    }

    //transition to next scene
    if (timer > 700) {
      console.log("Switching to dvd scene");
      this.sceneManager.showScene(dvd);
    }
  }

  //refreshes background
  this.drawBackground = function() {
    background(0);

    //mountains
    fill(6, 64, 30);
    noStroke();
    triangle(0, height, 900, height, 450, 400);
    triangle(800, height, width, height, 1350, 200);
    noFill();

    // iterate through clouds array to display all clouds
    for (let cloud of clouds) {
      cloud.display();
    }

    // iterate through rains array to display all raindrops
    for (let rain of rains) {
      rain.display();
      rain.update();
    }
  }
}   