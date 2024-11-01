function dvd() {
    //dvd
    let x, y;
    let xspeed = 4;
    let yspeed = 4;
    let dvd;
    let r, g, b;
    const dvdWidth = 200;
    const dvdHeight = 180;
    let dvdVisible = true; // ability to despawn dvd logo later
    
    //tv
    const canvasWidth = 1800;
    const canvasHeight = 1200;
    const tvWidth = 1000;
    const tvHeight = 700;
    // center tv 
    const tvX = (canvasWidth - tvWidth) / 2;
    const tvY = (canvasHeight - tvHeight) / 2;

    //array to hold cracks
    let cracks = [];

    let timer = 0;


    class Crack {
        constructor() {
            // Define the crack's start and end points within the inner TV frame
            this.startX = random(tvX + 10, tvX + tvWidth - 10);
            this.startY = random(tvY + 30, tvY + tvHeight - 30);
            this.endX = this.startX + random(-100, 100); // Random length in both directions
            this.endY = this.startY + random(-100, 100);

            // Ensure end points stay within the inner TV frame
            this.endX = constrain(this.endX, tvX + 10, tvX + tvWidth - 10);
            this.endY = constrain(this.endY, tvY + 30, tvY + tvHeight - 30);
        }

        // Method to display the crack line
        display() {
            stroke(255); // White cracks
            strokeWeight(2);
            line(this.startX, this.startY, this.endX, this.endY);
        }
    }

    this.setup = function () {
        createCanvas(canvasWidth, canvasHeight);
        dvd = loadImage("dvd.png"); // would put in preload function but screen manager doesn't like that

        // random starting position
        x = random(tvX + 50, tvX + tvWidth - 50 - dvdWidth);
        y = random(tvY + 50, tvY + tvHeight - 50 - dvdHeight);
        this.pickColor();

    
    }

    // random color
    this.pickColor = function () {
        r = random(255);
        g = random(255);
        b = random(255);
    }

    this.draw = function () {
        timer++;
        background(0);

        // tv frame (outer)
        fill(145);
        rect(tvX - 50, tvY - 50, tvWidth + 100, tvHeight + 100);
        
        // inner screen
        fill(70);
        rect(tvX, tvY + 20, tvWidth, tvHeight - 60);
        
        // antennas
        stroke(145);
        strokeWeight(5);
        line(tvX + tvWidth / 2, tvY - 50, tvX + tvWidth / 2 - 50, tvY - 200);
        line(tvX + tvWidth / 2, tvY - 50, tvX + tvWidth / 2 + 50, tvY - 200);
        
        // tv buttons
        noStroke();
        fill(100);
        rect(tvX + tvWidth + 30, tvY + 100, 20, 20);
        rect(tvX + tvWidth + 30, tvY + 140, 20, 20);
        rect(tvX + tvWidth + 30, tvY + 180, 20, 20);

        if (dvdVisible) {
            noStroke();
            tint(r, g, b); //tints dvd logo (color change)
            image(dvd, x, y, dvdWidth, dvdHeight);

            // update dvd position
            x += xspeed;
            y += yspeed;

            // check boundaries (stay within inner screen)
            if (x <= tvX || x + dvdWidth >= tvX + tvWidth) {
                xspeed = -xspeed * 1.3; // reverse & increase speed
                x = constrain(x, tvX, tvX + tvWidth - dvdWidth);
                this.pickColor();
            }
            if (y <= tvY || y + dvdHeight >= tvY + tvHeight) {
                yspeed = -yspeed * 1.3;
                y = constrain(y, tvY, tvY + tvHeight - dvdHeight);
                this.pickColor();
            }
        }

        // hide dvd logo
        if (timer > 800) {
            dvdVisible = false;
            //turn off tv
            fill(0);
            rect(tvX, tvY + 20, tvWidth, tvHeight - 60);
            fill(200, 0, 0); //red off button
            rect(tvX + tvWidth + 30, tvY + 180, 20, 20);
        }

        if (timer > 825) {
            fill(70);
            rect(tvX, tvY + 20, tvWidth, tvHeight - 60);
        }

        if (timer > 835) {
            fill(0);
            rect(tvX, tvY + 20, tvWidth, tvHeight - 60);
        }
        if (timer > 845) {
            fill(70);
            rect(tvX, tvY + 20, tvWidth, tvHeight - 60);
        }
        if (timer > 855) {
            fill(0);
            rect(tvX, tvY + 20, tvWidth, tvHeight - 60);
        }
        if (timer > 865) {
            fill(70);
            rect(tvX, tvY + 20, tvWidth, tvHeight - 60);
        }
        if (timer > 870) {
            fill(0);
            rect(tvX, tvY + 20, tvWidth, tvHeight - 60);
            cracks = [];
            stroke(255);
            strokeWeight(2);
            for (let i = 0; i < 20; i++) { // number of cracks
                cracks.push(new Crack());
            }
            for (let crack of cracks) {
                crack.display();
            }  
            }
        // transition to next scene
        if (timer > 1200) {
            console.log("Switching to cockroach scene");
            this.sceneManager.showScene(cockroach);
        }
    }
}


