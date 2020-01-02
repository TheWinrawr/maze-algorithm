const canvas = document.getElementById('maze');
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

let maze = new Maze(canvas.clientWidth, canvas.clientHeight, 20);
maze.generateMaze();
maze.drawMaze(ctx);