function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function getValidNeighbors(maze, x, y) {
    let neighbors = [];
    if (x - 1 >= 0 && maze[x - 1][y].rightWall === false) {
        neighbors.push(maze[x - 1][y]);
    }
    if (x + 1 < maze.length && maze[x][y].rightWall === false) {
        neighbors.push(maze[x + 1][y]);
    }
    if (y - 1 >= 0 && maze[x][y - 1].downWall === false) {
        neighbors.push(maze[x][y - 1]);
    }
    if (y + 1 < maze[0].length && maze[x][y].downWall === false) {
        neighbors.push(maze[x][y + 1]);
    }
    return neighbors;
}

function manhattanDist(x1, y1, x2, y2) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}