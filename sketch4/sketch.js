// ____inspirations_____
// https://editor.p5js.org/KevinWorkman/sketches/aDwj3IoHh 
// https://editor.p5js.org/Garcila/sketches/bBXZvpDKS
    // I took loved the way this code altered images, I wanted to understand iterating through pixels. I started off by understanding how the code worked with pixels, how it manipulated them, and integrated shapes. 
    // I used the structure of the code to build my own functions that alter the image in different ways.
    // press wanted button to see how it affects the image, animate controls the movement.

let img;
let myCanvas;

let original;
let squareIt;
let orbIt;
let bendIt;
let glitchIt;
let quadIt;
let lineIt;
let triangleIt;
let zigzagIt;
let rippleIt;

let roll = false;
let selected = "none";


function preload() {
    img = loadImage('https://i.kym-cdn.com/photos/images/newsfeed/002/953/771/ec3.jpg');
    // maybe make buttons for seperate images (Or add interface for user input)
}

function setup() {
    frameRate(15); // speed of animation = limits the redraws per second to 15. makes animations smoother & consistent
    img.resize(700, 700); // resize image to fit canvas nicely
    myCanvas = createCanvas(img.width, img.height); // creates canvas w/ same width & height as resized image to align perfectly

    // buttons (PT 1 = research & breakdown to understand alterization of image)

    //original button: resets image to original form
    original = createButton("Original"); // makes a button w/ wanted text
    original.position(10, img.height + 10); //postion of buttons
    original.mousePressed(originalImage); //checks if mousePressed (selection)

    //square button: function effect to make rect pixelation effect
    squareIt = createButton("Squaratize");
    squareIt.position(100, img.height + 10);
    squareIt.mousePressed(squareItImage);

    //orb button: function effect to make ellipse pixelation effect
    orbIt = createButton("Orbatize");
    orbIt.position(210, img.height + 10);
    orbIt.mousePressed(orbItImage);

    //bend button: function effect to make arc pixelation effect
    bendIt = createButton("Bendatize");
    bendIt.position(305, img.height + 10);
    bendIt.mousePressed(bendItImage);

    // PT 2 = customized functions: using same concepts ---> personal implementation to make different effects onto image

    //glitch button:
    glitchIt = createButton("Glitchatize");
    glitchIt.position(410, img.height + 10);
    glitchIt.mousePressed(glitchItImage);

    //quad button: 
    quadIt = createButton("Quadify");
    quadIt.position(10, img.height + 45);
    quadIt.mousePressed(quadItImage);
    
    //line button:
    lineIt = createButton("Lineify");
    lineIt.position(210, img.height + 45);
    lineIt.mousePressed(lineItImage);
  
    //triangle button:
    triangleIt = createButton("Trianglify");
    triangleIt.position(100, img.height + 45);
    triangleIt.mousePressed(triangleItImage);
  
    //zigzag button:
    zigzagIt = createButton("Zigzagify");
    zigzagIt.position(305, img.height + 45);
    zigzagIt.mousePressed(zigzagItImage);

    //ripple button:
    rippleIt = createButton("Ripplefy");
    rippleIt.position(410, img.height + 45);
    rippleIt.mousePressed(rippleItImage);
    
    //animate button: creates movement within the selected function
    anime = createButton(roll ? "Stop" : "Animate"); //shorthand if-else
    //evaluates the condition of roll: 
    //if roll == "true" the button displays the text "Stop", else the button displays "Animate"
    anime.position(img.width - 80, img.height + 10);
    anime.mousePressed(animate);
 
    //starting position of image
    originalImage();
}

function originalImage() {
    selected = "original";
    background(0);
    //outer loop: iterates through each column of pixels in image, starts from left (0) to right edge of img.width
        //col = current x-coord (horizontal position) in image
    for (let col = 0; col < img.width; col += 1) {
    
        //inner loop: for each column, iterates through every row of pixels, starts from top (0) to bottom edge of img.height
         //row = y-coordinate (current vertical position) in image
        for (let row = 0; row < img.height; row += 1) {
            
            //get() method = retrieves color of pixel at position (col, row) in image
            //c = [red, green, blue, alpha]
            let c = img.get(col, row);
            
            //sets stroke color (outline color) for next shape or point to color retrieved from image
            stroke(color(c));
    
            //draws single point (a tiny dot) at position (col, row) on canvas, uses current stroke color
            //the point() function redraws image pixel by pixel
            point(col, row);
        }
    }
}

function squareItImage() {
    // sets effect type to "cube" for draw function
    selected = "cube";
    
    // clears canvas and sets background to black
    background(0);

    // loop through pixels of the image in increments of 10 pixels (simplified, too chaotic if less)
    for (let col = 0; col < img.width; col += 10) {
        for (let row = 0; row < img.height; row += 10) {
            // gets color of pixel at (col, row)
            let c = img.get(col, row);

            // sets stroke color to the pixels color
            stroke(color(c));
            strokeWeight(2);

            // randomizes alpha of color
            c[3] = random(255);

            // fills rectangle w/ modified color
            fill(c);

            // draws rectangle w/ random position & size around pixel
            rect(
                col + random(-5, 5),   // x-coordinate w/ random offset of -5 to 5 pixels
                row + random(-5, 5),   // y-coordinate w/ random offset of -5 to 5 pixels
                random(-10, 10),       // width randomized between -10 and 10 (can create inverted rectangles)
                random(-10, 10)        // height randomized between -10 and 10
            );
        }
    }
}


function orbItImage() {
    selected = "circle";
    background(0);
    for (let col = 0; col < img.width; col += 10) {
        for (let row = 0; row < img.height; row += 10) {
            let c = img.get(col, row);
            stroke(color(c)); //color() function takes input (c) & converts it to color object so p5.js can use
            strokeWeight(2);
            c[3] = random(255); //playing with alpha [0r, 1g, 2b, 3a] opacity
            fill(c);
            
            //ellipse(x, y, w, h)
            ellipse(col, row, random(1, 9), random(1, 9)); //same concept (switched to ellipses) radomized size between 1 and 9
        }
    }
}

function bendItImage() {
    selected = "bend";
    background(0);
    for (let col = 0; col < img.width; col += 10) {
        for (let row = 0; row < img.height; row += 10) {
            let c = img.get(col, row);
            stroke(color(c));
            strokeWeight(random(0, 2));
            c[3] = random(255);
            fill(c);
            
            // arc(x, y, w, h, start, stop)
            arc(col, row, random(1, 20), random(1, 20), PI + QUARTER_PI, TWO_PI);
            // arc() function draws part of ellipse at position (x, y) on canvas
            // arc defined by:
                // (x, y): center of ellipse
                // w: width ellipse
                // h: height of the ellipse
                // start: starting angle of arc (radians)
                // stop: ending angle of arc (radians)
                
        }
    }
}

function glitchItImage() {
    selected = "glitch"; // set selected effect
    background(0); // clear canvas

    //create copy of original image
    let tempImg = img.get(); // tempImg = duplicate that won't affect original image
  
    for (let y = 0; y < tempImg.height; y++) {
        //glitchy distortion
        //random horizontal shifts for each row
        //pixels offset left or right by random amount between -20 & 20
        let offset = floor(random(-20, 20));

        for (let x = 0; x < tempImg.width; x++) {
            //calculate source & destination coordinates
            //srcX = horizontal position of pixel after applying random offset
            //ensures offset when it exceeds image width. prevents out-of-bounds errors (seamless)
            let srcX = (x + offset + tempImg.width) % tempImg.width; // wrap-around offset
            let srcColor = tempImg.get(srcX, y); // get pixel color
            
            //set pixels color to current pixel (x, y)
            //creates "shifted" look for row
            tempImg.set(x, y, srcColor);
        }
    }

    //apply changes to duplicate & display it
    tempImg.updatePixels();
    image(tempImg, 0, 0);
}

function quadItImage() {
    selected = "quad";
    background(0);

    //iterate every 20px of image (col & row)
    for (let col = 0; col < img.width; col += 20) {
        for (let row = 0; row < img.height; row += 20) {
            //retrieves color of pixel, get() method returns color value
            let color = img.get(col, row); 
            fill(color);
            noStroke(); //clean tile look (kinda like the stain glass at churches)
            
            //quad(x1, y1, x2, y2, x3, y3, x4, y4)  
            quad(
            col + random(-5, 5), row + random(-5, 5),              // 1st point (x1, y1) w/ random offset
            col + 20 + random(-5, 5), row + random(-5, 5),         // 2nd point (x2, y2) w/ random offset
            col + 20 + random(-5, 5), row + 20 + random(-5, 5),    // 3rd point (x3, y3) w/ random offset
            col + random(-5, 5), row + 20 + random(-5, 5)          // 4th point (x4, y4) w/ random offset
            );
        }
    }
}

//same concept and structure (playing with lines)
function lineItImage() {
    selected = "line";
    background(0);
    for (let col = 0; col < img.width; col += 10) {
        for (let row = 0; row < img.height; row += 10) {
            let c = img.get(col, row);
            stroke(c);
            strokeWeight(2);

            //line(x1, y1, x2, y2)
            line(
            col + random(-10, 10), row + random(-10, 10),
            col + random(-10, 10) + 20, row + random(-10, 10) + 20
            );
        }
    }
}

//playing withg triangles (experimenting with iteration cycle numbber (pixel count))
function triangleItImage() {
    selected = "triangle";
    background(0);
    let pixelco = random(10, 20); //creates wonky effect (for animation and every click of trianglefy button)
    for (let col = 0; col < img.width; col += pixelco) {
        for (let row = 0; row < img.height; row += pixelco) {
            //color
            let c1 = img.get(col, row);
            noStroke();
            fill(c1);

            //triangle(x1, y1, x2, y2, x3, y3)
            triangle(
            col + random(-5, 5), row + random(-5, 5),
            col + 20 + random(-5, 5), row + random(-5, 5),
            col + 10 + random(-5, 5), row + 20 + random(-5, 5)
            );
        }
    }
}

function zigzagItImage() {
    selected = "zigzag";
    background(0);
    for (let col = 0; col < img.width; col += 10) {
        for (let row = 0; row < img.height; row += 10) {
            let c = img.get(col, row);
            stroke(color(c));
            strokeWeight(random(0, 4));

            // draw custom shape
            beginShape();

            //loops 10 times: each time creates new vertex for zigzag shape
            for (let i = 0; i < 10; i++) {
                //calculates x-coord for each vertex (x-coord incremented by 4px for each iteration
                    // random value (between -5 and 5) added == slight random jitter in position
                let x = col + i * 4 + random(-5, 5);

                //calculates y-coord for each vertex (alternates between row (for even i) and row + 10 (for odd i) == zigzag pattern
                //random offset (random(-5, 5)) to y-coord == randomness to zigzag
                let y = row + (i % 2 === 0 ? 0 : 10) + random(-5, 5);
                
                //adds new vertex at calculated position
                vertex(x, y);
            }
            endShape();
        }
    }
}

function rippleItImage() {
    selected = "ripple";
    background(0);
    let randomStroke = random(0, 2);
    for (let col = 0; col < img.width; col += 15) {
        for (let row = 0; row < img.height; row += 15) {
            let c = img.get(col, row);
            noFill();
            stroke(c);

            //similar to orbify but uses random strokeWeights (raindrops)
            strokeWeight(randomStroke);
            ellipse(
            col + random(-5, 5),
            row + random(-5, 5),
            random(5, 20) //diameter of ellipse set to random value (between 5 & 20px) == variety to ripple effect
            );
        }
    }
}  
  

function animate() {
    // roll = roll === true ? false : true; (I wrote it the long way cus its easier for me to understand but now I know how to write it shorthand)
    // roll = boolean (true/false value) to control whether animation is running
    // in draw() function: if roll == true, triggers animation by repeatedly calling selected effect
    if (roll === true) {
        roll = false;
    } else {
        roll = true;
    }

    // anime.html(roll ? "Stop" : "Animate"); controls text on button
    if (roll === true) {
        anime.html("Stop");
    } else {
        anime.html("Animate");
    }
    
}

function draw() {
     // check if animation is active
    if (roll) {
        // determine which effect selected
        switch (selected) {
            case "original":
                originalImage();
            break;
            // if "cube" selected
            case "cube":
                // call squareItImage() function
                squareItImage();
            // exit switch statement
            break;  
            
            // if "circle" selected
            case "circle":
                // call orbItImage() function
                orbItImage();
            break;

            // if "bend" is selected
            case "bend":
                // call bendItImage() function
                bendItImage();
            break;

            case "glitch":
                // call glitchItImage() function
                glitchItImage();
            break;

            case "quad":
                // call quadItImage() function
                quadItImage();
            break;

            case "line":
                // call lineItImage() function
                lineItImage();
            break;

            case "triangle":
                //call triangleItImage() function
                triangleItImage();
            break;

            case "zigzag":
                //call zigzagItImage() function
                zigzagItImage();
            break;

            case "ripple":
                //call rippleItImage() function
                rippleItImage();
            break;

            // if no valid option selected
            default:
            // do nothing
            break;
        }
    }
}
  
