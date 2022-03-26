import Spot from "./spot.js";

function make2dArray(rows, cols) {
    let arr = new Array(cols);
    for (var i = 0; i< arr.length; i++) {
        arr[i] = new Array(cols);
    }
    return arr;
};
const fpsDisplay = document.getElementById("label")
const fpsSelector = document.getElementById("range");
const solved = document.getElementById("solved");
const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d');
var fps, fpsInterval, startTime, now, then, elapsed;
var stop = false;
var fpsStop = false
var frameCount = 0;
fps = 5;
fpsSelector.addEventListener("change", ()=>{
    fps = fpsSelector.value;
    console.log(fps);
    if(!stop){
            if(fps == 0) {
            fpsStop = true;
        };
        if(fps > 0) {
            fpsStop = false;
            startAnimating(fps)
        }}
    fpsDisplay.innerText = `Speed ${fps} fps`
})


function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}

canvas.width = 300;
canvas.height = 300

let grid;
let spacing;
let cols, rows;
let spot;
let path = [];

function setup() {
    context.fillStyle='white';
    context.strokeStyle='rgba(255, 255, 255, 0.5)'
    spacing = 45;
    cols = Math.floor(canvas.width / spacing);
    rows = Math.floor(canvas.height / spacing);
    grid = make2dArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = new Spot(i, j, spacing);
        }
    }
    spot = grid[0][0];
    path.push(spot)
    spot.visited = true;
}

export function isValid(i, j) {
    if(i < 0 || i >= cols || j < 0 || j >= rows) return false;
    return !grid[i][j].visited; 
}

function animate() {
        // stop
        if (stop) {
            return;
        }
        if (fpsStop) {
            return;
        }

    // request another frame

    requestAnimationFrame(animate);

    // calc elapsed time since last loop

    now = Date.now();
    elapsed = now - then;

    // if enough time has elapsed, draw the next frame

    if (elapsed > fpsInterval) {


        // Get ready for next frame by setting then=now, but also adjust for your
        // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
        then = now - (elapsed % fpsInterval);

        // Put your drawing code here
        context.clearRect(0, 0, canvas.width, canvas.height);


        context.beginPath();
        spot = spot.nextSpot(grid);
        
        if(!spot){
           let stuck = path.pop();
           stuck.clear();
           spot = path[path.length - 1]
        } else {
            path.push(spot);
            spot.visited = true;
        }

        if(path.length == rows * cols){ 
            solved.style.display = "block"
            stop = true;
        };
        context.strokeStyle = 'white';
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(path[0].x + spacing/2, path[0].y + spacing/2);
        for (var i=1; i<path.length; i++) {
            context.lineTo(path[i].x + spacing/2, path[i].y + spacing/2);
        }
        context.stroke(); 
        context.closePath();
    
       for (const spot of path) {
        context.beginPath();
        context.arc(spot.x + spacing/2 , spot.y + spacing/2 , spacing * 0.25, 0, 2 * Math.PI, false);
        context.stroke();
        context.fill();
        context.lineWidth = 2;
        context.strokeStyle='rgba(255, 255, 255, 1)';
        context.fillStyle='rgba(255, 255, 255, 1)';
        
       }
       context.closePath();

    }
}

setup();
startAnimating(fps);