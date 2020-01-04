const canvas = document.getElementById('maze');
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

let cellSize = 25;

let maze = new Maze(canvas.clientWidth, canvas.clientHeight, cellSize);
maze.generateRandomMaze();
maze.drawMaze(ctx);

let steps = Search.astar(maze.maze);
ctx.beginPath();
ctx.strokeStyle = 'LightCoral';
let anim = {
    steps: null,
    currNode: null,
    drawSteps: function () {
        let node = steps.shift();
        let parent = node.parent;
        if (parent !== null) {
            ctx.moveTo(node.cell.x * cellSize + cellSize / 2, node.cell.y * cellSize + cellSize / 2);
            ctx.lineTo(parent.cell.x * cellSize + cellSize / 2, parent.cell.y * cellSize + cellSize / 2);
            ctx.stroke();
        }
        if (steps.length > 0) {
            requestAnimationFrame(anim.drawSteps);
        }
        else {
            ctx.beginPath();
            ctx.strokeStyle = 'red';
            ctx.moveTo(node.cell.x * cellSize + cellSize / 2, node.cell.y * cellSize + cellSize / 2);
            while (node.parent !== null) {
                node = node.parent;
                ctx.lineTo(node.cell.x * cellSize + cellSize / 2, node.cell.y * cellSize + cellSize / 2);
            }
            ctx.stroke();
        }
    }
}

anim.steps = steps;
requestAnimationFrame(anim.drawSteps);
/*
ctx.beginPath();
ctx.strokeStyle = 'LightCoral';
steps.forEach(node => {
    let parent = node.parent;
    if (parent !== null) {
        ctx.moveTo(node.cell.x * cellSize + cellSize / 2, node.cell.y * cellSize + cellSize / 2);
        ctx.lineTo(parent.cell.x * cellSize + cellSize / 2, parent.cell.y * cellSize + cellSize / 2);
    }
});
ctx.stroke();

ctx.beginPath();
ctx.strokeStyle = 'red';
let currNode = steps[steps.length - 1];
ctx.moveTo(currNode.cell.x * cellSize + cellSize / 2, currNode.cell.y * cellSize + cellSize / 2);
while (currNode.parent !== null) {
    currNode = currNode.parent;
    ctx.lineTo(currNode.cell.x * cellSize + cellSize / 2, currNode.cell.y * cellSize + cellSize / 2);
}
ctx.stroke();

function drawPath() {

}
*/