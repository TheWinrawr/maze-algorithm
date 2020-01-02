class Maze {
    constructor(canvasWidth, canvasHeight, minCellSize) {
        this.width = canvasWidth / minCellSize;
        this.height = canvasHeight / minCellSize;
        this.cellSize = minCellSize;
        
        this.maze = new Array(this.width);
        for (let i = 0; i < this.width; i++) {
            this.maze[i] = new Array(this.height);
        }
    }

    generateMaze() {
        this.generateCells();
        let walls = this.generateWalls();
        shuffleArray(walls);

        while (walls.length > 0) {
            let wall = walls.pop();
            this.breakWall(wall);
        }
    }

    
    breakWall(wall) {
        let cell = this.maze[wall.x][wall.y];
        let neighbor = null;
        if (wall.direction === 'right' && wall.x + 1 < this.width) {
            neighbor = this.maze[wall.x + 1][wall.y];
        }
        else if (wall.direction === 'down' && wall.y + 1 < this.height) {
            neighbor = this.maze[wall.x][wall.y + 1];
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
    
    generateWalls() {
        let walls = [];
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                walls.push({ x: i, y: j, direction: 'right' });
                walls.push({ x: i, y: j, direction: 'down' });
            }
        }
        return walls;
    }
    
    generateCells() {
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                this.maze[i][j] = new Cell(i, j);
            }
        }
    }

    drawMaze(ctx) {
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        this.maze[this.width - 1][this.height - 1].rightWall = false;
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                let cell = this.maze[i][j];

                if (cell.rightWall) {
                    ctx.moveTo(i * this.cellSize + this.cellSize, j * this.cellSize);
                    ctx.lineTo(i * this.cellSize + this.cellSize, j * this.cellSize + this.cellSize);
                }
                if (cell.downWall) {
                    ctx.moveTo(i * this.cellSize, j * this.cellSize + this.cellSize);
                    ctx.lineTo(i * this.cellSize + this.cellSize, j * this.cellSize + this.cellSize);
                }
            }
        }
        
        ctx.moveTo(0, 0);
        ctx.lineTo(ctx.canvas.width, 0);
        ctx.lineTo(ctx.canvas.width, ctx.canvas.height - this.cellSize);
        ctx.moveTo(0, this.cellSize);
        ctx.lineTo(0, ctx.canvas.height);
        ctx.lineTo(ctx.canvas.width - this.cellSize, ctx.canvas.height);
        
        ctx.stroke();
    }
}