// get canvas related references
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var BB = canvas.getBoundingClientRect();
var offsetX = BB.left;
var offsetY = BB.top;
var WIDTH = canvas.width;
var HEIGHT = canvas.height;
// drag related variables
var dragok = false;
var startX;
var startY;
// an array of objects that define different rectangles
var rects = [];

var team1Color = "red";
var team2Color = "blue";
var size = 50;

// white team 
rects.push({
    x: 75 - 15 + 210,
    y: 50 - 15 + 500,
    width: size,
    height: size,
    fill: team1Color,
    isDragging: false,
    file: 'src/mals/mal1.jpeg'
});
rects.push({
    x: 75 - 25 + 210,
    y: 50 - 25 + 500,
    width: size,
    height: size,
    fill: team1Color,
    isDragging: false,
    file: 'src/mals/mal2.jpeg'
});
rects.push({
    x: 75 - 35 + 210,
    y: 50 - 35 + 500,
    width: size,
    height: size,
    fill: team1Color,
    isDragging: false,
    file: 'src/mals/mal4.jpeg'
});
rects.push({
    x: 75 - 45 + 210,
    y: 50 - 45 + 500,
    width: size,
    height: size,
    fill: team1Color,
    isDragging: false,
    file: 'src/mals/mal5.jpeg'
});

// black team
rects.push({
    x: 75 - 15 + 380,
    y: 50 - 15 + 0 + 500,
    width: size,
    height: size,
    fill: team2Color,
    isDragging: false,
    file: 'src/mals/mal7.jpeg'
});
rects.push({
    x: 75 - 25 + 380,
    y: 50 - 25 + 0 + 500,
    width: size,
    height: size,
    fill: team2Color,
    isDragging: false,
    file: 'src/mals/mal8.jpeg'
});
rects.push({
    x: 75 - 35 + 380,
    y: 50 - 35 + 0 + 500,
    width: size,
    height: size,
    fill: team2Color,
    isDragging: false,
    file: 'src/mals/mal10.jpeg'
});
rects.push({
    x: 75 - 45 + 380,
    y: 50 - 45 + 0 + 500,
    width: size,
    height: size,
    fill: team2Color,
    isDragging: false,
    file: 'src/mals/mal11.jpeg'
});


// listen for mouse events
canvas.onmousedown = myDown;
canvas.onmouseup = myUp;
canvas.onmousemove = myMove;
// call to draw the scene
draw();
// draw a single rect
function rect(x, y, w, h) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.closePath();
    ctx.fill();
}
// clear the canvas
function clear() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function loadimg(i, r) {
    var imageObj = new Image();
    imageObj.src = r.file;
    imageObj.onload = function() {
        ctx.drawImage(imageObj, r.x, r.y, r.width, r.height);
    };
}

// redraw the scene
function draw() {
    clear();
    // redraw each rect in the rects[] array    
    for (var i = 0; i < rects.length; i++) {
        var r = rects[i];
        loadimg(i, r);
        ctx.fillStyle = r.fill;
        rect(r.x, r.y, r.width, r.height);

    }


}
// handle mousedown events
function myDown(e) {
    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();
    // get the current mouse position
    var mx = parseInt(e.clientX - offsetX);
    var my = parseInt(e.clientY - offsetY);
    // test each rect to see if mouse is inside
    dragok = false;
    for (var i = 0; i < rects.length; i++) {
        var r = rects[i];
        if (mx > r.x && mx < r.x + r.width && my > r.y && my < r.y + r.height) {
            // if yes, set that rects isDragging=true
            dragok = true;
            r.isDragging = true;
        }
    }
    // save the current mouse position
    startX = mx;
    startY = my;
}
// handle mouseup events
function myUp(e) {
    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();
    // clear all the dragging flags
    dragok = false;
    for (var i = 0; i < rects.length; i++) {
        rects[i].isDragging = false;
    }
}
// handle mouse moves
function myMove(e) {
    // if we're dragging anything...
    if (dragok) {
        // tell the browser we're handling this mouse event
        e.preventDefault();
        e.stopPropagation();
        // get the current mouse position
        var mx = parseInt(e.clientX - offsetX);
        var my = parseInt(e.clientY - offsetY);
        // calculate the distance the mouse has moved
        // since the last mousemove
        var dx = mx - startX;
        var dy = my - startY;
        // move each rect that isDragging
        // by the distance the mouse has moved
        // since the last mousemove
        for (var i = 0; i < rects.length; i++) {
            var r = rects[i];
            if (r.isDragging) {
                r.x += dx;
                r.y += dy;
            }
        }
        // redraw the scene with the new rect positions
        draw();
        // reset the starting mouse position for the next mousemove
        startX = mx;
        startY = my;
    }
}
