
function cockroach(){
  let cockroaches = [];

  let timer = 0;

  //pics
  let doo, doo2, doo3, cr, raid;

  class Cockroach {
    constructor(x, y) {
      this.position = createVector(x, y);
      this.size = random(80, 200); 
      this.speed = random(4, 14); 
      this.velocity = p5.Vector.random2D().mult(this.speed); // initial random movement
    }

    display() {
      // calculate angle with velocity direction
      let angle = this.velocity.heading();

      // move to cockroach position, rotate, draw, reset rotation
      push();
      translate(this.position.x, this.position.y); 
      rotate(angle); 
      imageMode(CENTER); // center image on position
      image(cr, 0, 0, this.size, this.size);
      pop();
    }

    move() {
      // random jitter
      this.velocity.add(p5.Vector.random2D().mult(0.3));
      this.velocity.limit(this.speed);
      this.position.add(this.velocity);

      // wrap around edges of screen
      if (this.position.x > 1800) this.position.x = 0;
      if (this.position.x < 0) this.position.x = 1800;
      if (this.position.y > height) this.position.y = 0;
      if (this.position.y < 0) this.position.y = height;
    }

    runAwayFromMouse() {
      //pushes bugs away from mouse
      let mouse = createVector(mouseX, mouseY);
      let distance = p5.Vector.dist(mouse, this.position); // checking how far from mouse

      if (distance < 300) {
        let fleeDirection = p5.Vector.sub(this.position, mouse).normalize().mult(this.speed * 2);
        this.velocity = fleeDirection;
      }
    }
  }

  this.setup = function() {
    cr = loadImage('cockroach.png');
    doo = loadImage('doodoo.png');
    doo2 = loadImage('doodoo2.png');
    doo3 = loadImage('dudu.png');
    raid = loadImage('raid.png');

    tint(255); //clears tint from last scene

    // generate cockroaches (random positions)
    for (let i = 0; i < 35; i++) {
      let x = random(1800);
      let y = random(height);
      cockroaches.push(new Cockroach(x, y));
    }
  }

  this.draw = function() {
    timer++;
    if (timer < 350) {
      background(0, 100, 0);
    } else if (timer >= 650) { //cockroach smudge glitch for a bit
      console.log("Switching to clock");
      this.sceneManager.showScene(clock); // transition to next scene
    }

    // display dirt background images
    image(doo, 0, 0, 1000, 1000);
    image(doo2, 600, 300);
    image(doo3, 1800 - 700, 0)
    

    // display, move, and react each cockroach
    for (let cockroach of cockroaches) {
      cockroach.runAwayFromMouse(); // run away if mouse is near
      cockroach.move();             // constant movement
      cockroach.display();          // display with rotation
    }

    //raid on mouse
    let x = mouseX - raid.width / 5;
    let y = mouseY - raid.height / 5;

    image(raid, x, y, 300, 300); 
  }
}
