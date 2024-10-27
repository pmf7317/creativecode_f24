function cockroach(){

  let rows = 0;
  let cols = 0;
  let w = 100;
  let h = w;
  let cockroaches = [];

  //pics
  let doo, doo2, doo3, cr, raid;

  class Cockroach {
    constructor(x, y) {
      this.position = createVector(x, y);
      this.size = random(80, 200); // Bigger size
      this.speed = random(3, 9); 
      this.velocity = p5.Vector.random2D().mult(this.speed); // Initial random movement
    }

    display() {
      // calculate angle with velocity direction
      let angle = this.velocity.heading();

      // move to cockroach position, rotate, draw, reset rotation
      push();
      translate(this.position.x, this.position.y);
      rotate(angle);
      imageMode(CENTER); // Center the image on the position
      image(cr, 0, 0, this.size, this.size);
      pop();
    }

    move() {
      // random jitter
      this.velocity.add(p5.Vector.random2D().mult(0.1));
      this.velocity.limit(this.speed);
      this.position.add(this.velocity);

      // wrap around edges of screen
      if (this.position.x > 1800) this.position.x = 0;
      if (this.position.x < 0) this.position.x = 1800;
      if (this.position.y > height) this.position.y = 0;
      if (this.position.y < 0) this.position.y = height;
    }

    runAwayFromMouse() {
      let mouse = createVector(mouseX, mouseY);
      let distance = p5.Vector.dist(mouse, this.position);

      if (distance < 250) {
        let fleeDirection = p5.Vector.sub(this.position, mouse).normalize().mult(this.speed * 2);
        this.velocity = fleeDirection;
      }
    }
  }

  this.setup = function() {
    cr = loadImage('cockroach.png'); // Replace with the correct path
    doo = loadImage('doodoo.png');
    doo2 = loadImage('doodoo2.png');
    doo3 = loadImage('dudu.png');
    raid = loadImage('raid.png');

    // generate cockroaches (random positions)
    for (let i = 0; i < 30; i++) {
      let x = random(1800);
      let y = random(height);
      cockroaches.push(new Cockroach(x, y));
    }
    console.log(cr); // Will output 'undefined' if the image isn't loaded properly
    console.log(width); // Check if width and height are accessible
  
  }

  this.draw = function() {
    if (frameCount < 600){
      background(0, 100, 0);
    } else if (frameCount > 600 && frameCount < 1400) {
      //no background redraw
    } else {
      //go to next scene
      this.sceneManager.showScene(death);
    }

    // Display bathroom background images
    image(doo, -200, -300, 1000, 1000);
    image(doo2, 600, 300);
    image(doo3, 1800 - 700, -100)
    

    // Display, move, and react each cockroach
    for (let cockroach of cockroaches) {
      cockroach.runAwayFromMouse(); // Run away if mouse is near
      cockroach.move();             // Constant movement
      cockroach.display();          // Display with rotation
    }
    let x = mouseX - raid.width / 5;
    let y = mouseY - raid.height / 5;

    image(raid, x, y, 300, 300); 
  }
}