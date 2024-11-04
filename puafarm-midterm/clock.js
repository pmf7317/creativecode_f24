function clock(){

    //seperate circles
    let secondsCircle;
    let minutesCircle;
    let hoursCircle;
    let clockDiameter;

    let speedMultiplier = 0.01; // start w/ small speed multiplier
    let speedIncreaseRate = 0.001; // rate speed multiplier increases

    let drips = []; // array for paint drips
    let lastSecond = -1; // track last second to trigger drips

    let timer = 0;

    class Drip {
        constructor(x, y, r) {
          this.x = x;
          this.y = y;
          this.r = r;
          this.startR = r;
          this.maxSpeed = map(r, 5, 10, 3, 6);
        }
      
        update() {
          this.y += map(this.r, this.startR, 0, this.maxSpeed, 0);
          this.x += random(-0.5, 0.5);
          this.r -= 0.05; // gradually decrease radius
        }
      
        display() {
          let fade = map(this.r, this.startR, 0, 255, 0); // fade effect using radius
          fill(255, 0, 0, fade);
          noStroke();
          ellipse(this.x, this.y, this.r * 2);
        }
      
        isFinished() {
          return this.r <= 0; // check if drip finished
        }
    }

    this.setup = function() {
        background(20);
        stroke(255);
        angleMode(DEGREES);

        // set radius for each (dimensions matter)
        let radius = min(width, height) / 2;
        secondsCircle = radius * 0.8;
        minutesCircle = radius * 0.7;
        hoursCircle = radius * 0.6;
        clockDiameter = radius * 1.8;
    }

    this.draw = function() {
        timer++;
        
        if (timer < 1500){
            speedIncreaseRate += 0.000012; //slowed down
        } else {
            this.sceneManager.showScene(death); // transition to next scene
        }

        // move origin to center of canvas
        translate(width / 2, height / 2);

        // clock background
        noStroke();
        fill(240, 20, 0); // pool table green
        ellipse(0, 0, clockDiameter + 25, clockDiameter + 25);
        fill(150, 10, 0);
        ellipse(0, 0, clockDiameter, clockDiameter);

        // // pool balls
        // let poolBallColors = [
        //     color(255, 255, 255), // Ball 1 - white
        //     color(255, 215, 0),   // Ball 2 - yellow
        //     color(0, 0, 255),     // Ball 3 - blue
        //     color(255, 0, 0),     // Ball 4 - red
        //     color(255, 165, 0),   // Ball 5 - orange
        //     color(0, 255, 0),     // Ball 6 - green
        //     color(128, 0, 128),   // Ball 7 - purple
        //     color(0, 0, 0),       // Ball 8 - black
        //     color(255, 0, 255),   // Ball 9 - pink (striped)
        //     color(165, 42, 42),   // Ball 10 - brown (striped)
        //     color(75, 0, 130),    // Ball 11 - indigo (striped)
        //     color(0, 128, 128)    // Ball 12 - teal (striped)
        // ]

        // for (let i = 0; i < 12; i++) {
        //     let angle = map(i, 0, 12, 0, 360);
        //     let x = cos(angle - 90) * hoursRadius;
        //     let y = sin(angle - 90) * hoursRadius;
            
        //     fill(poolBallColors[i]);
        //     ellipse(x, y, 80, 80);
            
        //     // stripes (9-12)
        //     if (i >= 8) {
        //         fill(255);
        //         rectMode(CENTER);
        //         rect(x, y, 80, 30);
        //     }
        //     // small white circle
        //     fill(255);
        //     ellipse(x, y, 35, 35); // Small white circle

        //     // black number
        //     fill(0);
        //     textSize(16);
        //     textAlign(CENTER, CENTER);
        //     text(i + 1, x, y);
        // }

        // gradually increase speed multiplier
        speedMultiplier += speedIncreaseRate;

        // timeholder
        let currentSecond = second();

        // calculation of angle for each hand w/ speed multiplier
        let secondAngle = map(second() * speedMultiplier, 0, 60, 0, 360);
        let minuteAngle = map(minute() * speedMultiplier, 0, 60, 0, 360);
        let hourAngle = map((hour() % 12) * speedMultiplier, 0, 12, 0, 360);

        stroke(255);

        // seconds hand
        push();
        rotate(secondAngle);
        strokeWeight(2);
        line(0, 0, 0, -secondsCircle);
        pop();

        // minute hand
        push();
        strokeWeight(4);
        rotate(minuteAngle);
        line(0, 0, 0, -minutesCircle);
        pop();

        // hour hand
        push();
        strokeWeight(6);
        rotate(hourAngle);
        line(0, 0, 0, -hoursCircle);
        pop();

        // tick markers
        push();
        strokeWeight(2);
        
        for (let ticks = 0; ticks < 60; ticks += 1) {
            point(0, -secondsCircle);
            rotate(6);
        }
        pop();

        // trigger new drip (only when secondshand ticks)
    if (currentSecond !== lastSecond) {
        lastSecond = currentSecond; // update last second
  
        // generate a new drip outside the clock radius
        let angle = random(360); // random angle around clock
        let distance = random(clockDiameter / 2 + 20, width / 2 - 20); // random distance outside clock (try not to land drip on clock face)
  
        let x = cos(angle) * distance;
        let y = sin(angle) * distance;
  
        drips.push(new Drip(x, y, random(5, 15))); // add a new drip
      }
  
      // update & display all drips
      for (let i = drips.length - 1; i >= 0; i--) {
        drips[i].update();
        drips[i].display();
        if (drips[i].isFinished()) {
          drips.splice(i, 1); // remove finished drips
        }
      }
    }
}


