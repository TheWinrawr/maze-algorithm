const canvas = document.getElementById('maze');
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

// maze stuff
let cellSize = 20;
let width = canvas.clientWidth / cellSize;
let height = canvas.clientHeight / cellSize;

let maze = new Array(width);
for (let i = 0; i < width; i++) {
    maze[i] = new Array(height).fill(null);
}
for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
        maze[i][j] = new Cell(i, j);
    }
}

// disjoint set stuff
/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

let walls = [];
for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
        walls.push({x: i, y: j, direction: 'right'});
        walls.push({x: i, y: j, direction: 'down'});
    }
}

shuffleArray(walls);


// generate maze
while (walls.length > 0) {
    let wall = walls.pop();
    let cell = maze[wall.x][wall.y];
    let neighbor = null;
    if (wall.direction === 'right' && wall.x + 1 < width) {
        neighbor = maze[wall.x + 1][wall.y];
    }
    else if (wall.direction === 'down' && wall.y + 1 < height) {
        neighbor = maze[wall.x][wall.y + 1];
    }
    
    if (neighbor !== null) {
        if (Cell.union(cell, neighbor)) {
            if (wall.direction === 'right') {
                cell.rightWall = false;
            }
            else {
                cell.downWall = false;
            }
        }
    }
}

ctx.strokeStyle = 'black';
ctx.beginPath();
maze[width - 1][height - 1].rightWall = false;
for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
        let cell = maze[i][j];

        if (cell.rightWall) {
            ctx.moveTo(i * cellSize + cellSize, j * cellSize);
            ctx.lineTo(i * cellSize + cellSize, j * cellSize + cellSize);
        }
        if (cell.downWall) {
            ctx.moveTo(i * cellSize, j * cellSize + cellSize);
            ctx.lineTo(i * cellSize + cellSize, j * cellSize + cellSize);
        }
    }
}
ctx.moveTo(0, 0);
ctx.lineTo(width * cellSize, 0);
ctx.lineTo(width * cellSize, height * cellSize - cellSize);
ctx.moveTo(0, cellSize);
ctx.lineTo(0, height * cellSize);
ctx.lineTo(width * cellSize - cellSize, height * cellSize);
ctx.stroke();

function dfs() {
    
}