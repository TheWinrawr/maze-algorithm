class Maze {
    constructor(canvasWidth, canvasHeight, minCellSize) {
        this.width = canvasWidth / minCellSize;
        this.height = canvasHeight / minCellSize;
        this.cellSize = minCellSize;
        
        this.maze = new Array(this.width);
        for (let i = 0; i < this.width; i++) {
            this.maze[i] = new Array(this.height);
        }

        this.entrance = this.maze[0][0];
        this.exit = this.maze[this.width - 1][this.height - 1];
    }

    /**
     * Generates a new maze.
     */
    generateMaze() {
        this.generateCells();
        let walls = this.generateWalls();

        while (walls.length > 0) {
            let wall = walls.pop();
            this.breakWall(wall);
        }
    }
    
    generateRandomMaze() {
        this.generateMaze();
        let walls = [];
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                let cell = this.maze[i][j];
                if (cell.rightWall) {
                    walls.push({x: i, y: j, direction: 'right'});
                }
                if (cell.downWall) {
                    walls.push({x: i, y: j, direction: 'down'});
                }
            }
        }

        walls.forEach(wall => {
            if (Math.random() < 1) {
                if (wall.direction === 'right') {
                    this.maze[wall.x][wall.y].rightWall = false;
                }
                else {
                    this.maze[wall.x][wall.y].downWall = false;
                }
            }
        })
    }

    /**
     * Attempt to union two cells by breaking a wall. Does nothing if the cells are part of the same disjoint set.
     * @param {object} wall 
     */
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
    
    /**
     * Generate an array of right and down walls in a random order.
     */
    generateWalls() {
        let walls = [];
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                walls.push({ x: i, y: j, direction: 'right' });
                walls.push({ x: i, y: j, direction: 'down' });
            }
        }
        shuffleArray(walls);
        return walls;
    }
    
    /**
     * Populate the maze array with cell objects.
     */
    generateCells() {
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                this.maze[i][j] = new Cell(i, j);
            }
        }
    }

    /**
     * Draw the maze.
     * @param {Canvas context} ctx 
     */
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
        
        // Draw maze borders. Top left (entrance) and bottom right (exit) cells are left open
        ctx.moveTo(0, 0);
        ctx.lineTo(ctx.canvas.width, 0);
        ctx.lineTo(ctx.canvas.width, ctx.canvas.height - this.cellSize);
        ctx.moveTo(0, this.cellSize);
        ctx.lineTo(0, ctx.canvas.height);
        ctx.lineTo(ctx.canvas.width - this.cellSize, ctx.canvas.height);
        
        ctx.stroke();
    }
}