class DFS extends Search {
    search(maze) {
        this.steps = [];
        let stack = [];
        let visited = new Set();
        let currNode = new TreeNode(maze[0][0]);
        stack.push(currNode);
        visited.add(maze[0][0]);

        while (stack.length > 0) {
            currNode = stack.pop();
            this.steps.push(currNode);
            
            let cell = currNode.cell;
            //cell.visited = true;
            if (cell === maze[maze.length - 1][maze[0].length - 1]) {
                break;
            }
            let neighbors = getValidNeighbors(maze, cell.x, cell.y);
            neighbors.forEach(neighbor => {
                if (!visited.has(neighbor)) {
                    let newNode = new TreeNode(neighbor, currNode)
                    stack.push(newNode);
                    visited.add(neighbor);
                }
            })
        }
    }
}