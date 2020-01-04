const canvas = document.getElementById('maze');
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

let cellSize = 20;

let maze = new Maze(canvas.clientWidth, canvas.clientHeight, cellSize);
maze.generateRandomMaze();
maze.drawMaze(ctx);

let dfs = new DFS();
dfs.search(maze.maze);
dfs.animate(ctx);