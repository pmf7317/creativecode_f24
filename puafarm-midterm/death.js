function death(){

    let skull;
    let skull2;
    let timer = 0;

    // mountain positions (transition scene)
    let mountain1Y = height; // starting y off-screen (bottom)
    let mountain1TargetY = 400; // final y position for mountain1

    let mountain2Y = height; // starting y off-screen (bottom)
    let mountain2TargetY = 200; // final y position for mountain2

    this.setup = function() {
        background(50); 

        //graveyard
        let spacing = 150; // space between tombstones

        // set position & size for each tombstone
        for (let i = 0; i * spacing < width; i++) {
            let x = i * spacing + 10; // shift for padding
            let sizex = random(80, 125);   // tombstone width
            let sizey = random(120, 250); // tombstone height
            let y = height - sizey; // position tombstone to touch the bottom of the seen

            // draw tombstone
            fill(170);
            rect(x, y, sizex, sizey);
            noStroke();

            // cross on tombstone (the last scene messed it all up) 
            let crossWidth = sizex / 7;
            let crossHeight = sizey / 3;
            let crossX = x + sizex / 2 - crossWidth / 2; // position of cross
            let crossY = y + sizey / 4;
            fill(80);
            rect(crossX, crossY, crossWidth, crossHeight);
            rect(crossX - crossHeight / 2, crossY + crossHeight / 2 - crossWidth / 2, crossHeight, crossWidth);
        }
        skull = loadImage("skull.png");
        skull2 = loadImage("skull2.png");
    }

    this.draw = function() {
        timer++; // increment timer each frame
        
        if (timer > 0 && timer < 400){
            tint(200, 30, 40);
            skull2.resize(500, 500);
            image(skull2, -100, -300, timer * 5, timer * 5);


        } else if (timer < 1100 && timer){
            tint(255);

            //going down
            image(skull, -120, (timer * 2.5) - (height * 1.2), 500, 500);
            image(skull, 300, (timer * 2.5) - (height * 1.2), 500, 500);
            image(skull, 700, (timer * 2.5) - (height * 1.2), 500, 500);
            image(skull, 1100, (timer * 2.5) - (height * 1.2), 500, 500);
            image(skull, 1500, (timer * 2.5) - (height * 1.2), 500, 500);

            //going up
            image(skull, 100, (height * 1.8) - (timer * 2.5), 500, 500);
            image(skull, 500, (height * 1.8) - (timer * 2.5), 500, 500);
            image(skull, 900, (height * 1.8) - (timer * 2.5), 500, 500);
            image(skull, 1300, (height * 1.8) - (timer * 2.5), 500, 500);
        }else if (timer < 1200){ // transition to next scene

            // animate mountains moving up
            let progress = (timer - 1000) / 200; // time segment
            mountain1Y = lerp(height, mountain1TargetY, progress); // lerp makes smooth movement
            mountain2Y = lerp(height, mountain2TargetY, progress);

            background(0);
            fill(6, 64, 30);
            noStroke();
            triangle(0, height, 900, height, 450, mountain1Y);
            triangle(800, height, width, height, 1350, mountain2Y);
        }

        
        if (timer > 1250){
            console.log("Switching to last lightning scene");
            this.sceneManager.showScene(lightningend); // transition to next scene
        
        } 
    } 
}
