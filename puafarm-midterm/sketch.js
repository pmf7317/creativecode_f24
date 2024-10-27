let mgr;

function setup() {
	createCanvas(1800, 1200);
  mgr = new SceneManager();
  mgr.wire();
  mgr.showScene(lightning);
}

function draw() {
  mgr.draw();
 }
