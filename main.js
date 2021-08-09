nose_x=0; nose_y=0;
difference=0;
right_wrist_x=0;
left_wrist_x=0;
function setup() {
    canvas = createCanvas(550, 500);
    canvas.position(600, 90)
    video = createCapture(VIDEO)
    video.size(550, 500);
    posenet = ml5.poseNet(video, modelLoaded)
    posenet.on("pose", gotposes)
}

function gotposes(results) {
    if (results.length > 0) {
        nose_x=results[0].pose.nose.x;
        nose_y=results[0].pose.nose.y;
        right_wrist_x=results[0].pose.rightWrist.x;
        left_wrist_x=results[0].pose.leftWrist.x;
        difference=floor(left_wrist_x-right_wrist_x)
        console.log("diff "+difference)
        //console.log(results);
    }
}

function modelLoaded() {
    console.log("poseNet is initalized");
}

function draw() {
    background("black")
    fill("red")
    push();
    //translate(width * 0.2, height * 0.5);
    //rotate(frameCount / 200.0);
    star(nose_x+10, nose_y-100, difference, 70, 3);
    pop();
    //circle(nose_x,nose_y ,difference)
}

function star(x, y, radius1, radius2, npoints) {
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
        let sx = x + cos(a) * radius2;
        let sy = y + sin(a) * radius2;
        vertex(sx, sy);
        sx = x + cos(a + halfAngle) * radius1;
        sy = y + sin(a + halfAngle) * radius1;
        vertex(sx, sy);
    }
    endShape(CLOSE);
}