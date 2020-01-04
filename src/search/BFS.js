class BFS extends Search {
    search(maze) {
        this.steps = [];
        let queue = [];
        let visited = new Set();
        let currNode = new TreeNode(maze[0][0]);
        queue.push(currNode);
        visited.add(maze[0][0]);

        while (queue.length > 0) {
            currNode = queue.shift();
            this.steps.push(currNode);

            let cell = currNode.cell;
            //cell.visited = true;
            if (cell.x === maze.length - 1 && cell.y === maze[0].length - 1) {
                break;
            }

            let neighbors = getValidNeighbors(maze, cell.x, cell.y);
            neighbors.forEach(neighbor => {
                if (!visited.has(neighbor)) {
                    let newNode = new TreeNode(neighbor, currNode);
                    queue.push(newNode);
                    visited.add(neighbor);
                }
            })
        }
    }
}