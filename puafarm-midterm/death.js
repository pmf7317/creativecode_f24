function death(){

    let skull;
    let skull2;
    let timer = 0;


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

            // cross on tombstone 
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

        if (timer * 3 < height - 300){
            image(skull, 700, height - (timer * 3), 500, 500);
            image(skull, 300, height - (timer * 3), 500, 500);
            image(skull, 1100, height - (timer * 3), 500, 500);
            
        } else {
            skull2.resize(500, 500);
            image(skull2, -100, -300, timer * 5, timer * 5);
            
            if (timer > 450){
                background(0);
                //or last scene (show tombstone)
                //next sceen
            }
        }  
    }
} 