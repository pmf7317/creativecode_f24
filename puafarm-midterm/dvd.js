function dvd(){

    let x;
    let y;
    let xspeed;
    let yspeed;
    let dvd;
    let r, g, b;
    let timer = 0;

    //the scenemanager doesn't like the preload function (so this has to do)
    this.setup = function() {
    createCanvas(1800, 1200);
    dvd = loadImage("dvd.png");

    x = random(width);
    y = random(height);
    xspeed = 4;
    yspeed = 4;
    this.pickcolor();
    }

    //randomizes color
    this.pickcolor = function() {
    r = random(255);
    g = random(255);
    b = random(255);
    }

    this.draw = function() {
    timer++;
    background(0);
    
    //tv
    fill(145);
    rect(0, 0, 1600, 1000);
    fill(70);
    rect(0, 0, 1500, 800);
    fill(0);
    ellipse(1000, 900, 50, 90);
    ellipse(900, 900, 50, 90);
    ellipse(800, 900, 50, 90);
        
    //color for dvd logo
    noStroke();
    fill(255);
    tint(r, g, b);
    image(dvd, x, y, 200, 180);

    x += xspeed;
    y += yspeed;

    //checks bounds & increases dvd logo speed
    if (x + dvd.width >= width || x <= 0) {
        xspeed = -xspeed * 1.3; // increase speed
        x = constrain(x, 0, width - dvd.width); // keep within bounds
        // print("x: ", x);
        this.pickcolor();
    }

    if (y + dvd.height >= height || y <= 0) {
        yspeed = -yspeed * 1.3; // increase speed by
        y = constrain(y, 0, height - dvd.height); // keep within bounds
        // print("y:", y);
        this.pickcolor();
    }

    //transition to next scene
    if (timer > 800){
        console.log("Switching to cockroach scene");
        this.sceneManager.showScene(cockroach);
    }
    }

}