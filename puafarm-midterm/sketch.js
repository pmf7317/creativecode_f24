let mgr;

function setup() {
	createCanvas(innerWidth, innerHeight);
  mgr = new SceneManager();
  mgr.wire();
  mgr.showScene(lightning);
}

function draw() {
  mgr.draw();
 }
