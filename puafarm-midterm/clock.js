function clock(){

    //seperate circles
    let secondsRadius;
    let minutesRadius;
    let hoursRadius;
    let clockDiameter;

    let speedMultiplier = 0.01; // start w/ small speed multiplier
    let speedIncreaseRate = 0.001; // rate speed multiplier increases

    let timer = 0;

    this.setup = function() {
        stroke(255);
        angleMode(DEGREES);

        // set radius for each (dimensions matter)
        let radius = min(width, height) / 2;
        secondsRadius = radius * 0.8;
        minutesRadius = radius * 0.7;
        hoursRadius = radius * 0.6;
        clockDiameter = radius * 1.8;
    }

    this.draw = function() {
        background(20);
        timer++;
        
        if (timer < 300){
            speedIncreaseRate += 0.0005;
        } else {
            this.sceneManager.showScene(death); // transition to next scene
        }

        // move origin to center of canvas
        translate(width / 2, height / 2);

        // draw clock background
        noStroke();
        fill(0, 100, 0); // Pool table green
        ellipse(0, 0, clockDiameter + 25, clockDiameter + 25);
        fill(0, 80, 0);
        ellipse(0, 0, clockDiameter, clockDiameter);

        // pool balls
        let poolBallColors = [
            color(255, 255, 255), // Ball 1 - white
            color(255, 215, 0),   // Ball 2 - yellow
            color(0, 0, 255),     // Ball 3 - blue
            color(255, 0, 0),     // Ball 4 - red
            color(255, 165, 0),   // Ball 5 - orange
            color(0, 255, 0),     // Ball 6 - green
            color(128, 0, 128),   // Ball 7 - purple
            color(0, 0, 0),       // Ball 8 - black
            color(255, 0, 255),   // Ball 9 - pink (striped)
            color(165, 42, 42),   // Ball 10 - brown (striped)
            color(75, 0, 130),    // Ball 11 - indigo (striped)
            color(0, 128, 128)    // Ball 12 - teal (striped)
        ];

        for (let i = 0; i < 12; i++) {
            let angle = map(i, 0, 12, 0, 360);
            let x = cos(angle - 90) * hoursRadius;
            let y = sin(angle - 90) * hoursRadius;
            
            fill(poolBallColors[i]);
            ellipse(x, y, 80, 80);
            
            // stripes (9-12)
            if (i >= 8) {
                fill(255);
                rectMode(CENTER);
                rect(x, y, 80, 30);
            }
            // small white circle
            fill(255);
            ellipse(x, y, 35, 35); // Small white circle

            // black number
            fill(0);
            textSize(16);
            textAlign(CENTER, CENTER);
            text(i + 1, x, y);
        }

        // gradually increase speed multiplier
        speedMultiplier += speedIncreaseRate;

        // calculation of angle for each hand w/ speed multiplier
        let secondAngle = map(second() * speedMultiplier, 0, 60, 0, 360);
        let minuteAngle = map(minute() * speedMultiplier, 0, 60, 0, 360);
        let hourAngle = map((hour() % 12) * speedMultiplier, 0, 12, 0, 360);

        stroke(255);

        // seconds hand
        push();
        rotate(secondAngle);
        strokeWeight(2);
        line(0, 0, 0, -secondsRadius);
        pop();

        // minute hand
        push();
        strokeWeight(4);
        rotate(minuteAngle);
        line(0, 0, 0, -minutesRadius);
        pop();

        // hour hand
        push();
        strokeWeight(6);
        rotate(hourAngle);
        line(0, 0, 0, -hoursRadius);
        pop();

        // tick markers
        push();
        strokeWeight(2);
        for (let ticks = 0; ticks < 60; ticks += 1) {
            point(0, -secondsRadius);
            rotate(6);
        }
        pop();
    }
}
