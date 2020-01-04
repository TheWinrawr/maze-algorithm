class Search {

    /**
     * Generates a path from start to exit with depth first search
     * @param {2d array} maze 
     */
    static dfs(maze) {
        let steps = [];
        let stack = [];
        let visited = new Set();
        let currNode = new TreeNode(maze[0][0]);
        stack.push(currNode);
        visited.add(maze[0][0]);

        while (stack.length > 0) {
            currNode = stack.pop();
            steps.push(currNode);
            
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

        return steps;
    }

    static bfs(maze) {
        let steps = [];
        let queue = [];
        let visited = new Set();
        let currNode = new TreeNode(maze[0][0]);
        queue.push(currNode);
        visited.add(maze[0][0]);

        while (queue.length > 0) {
            currNode = queue.shift();
            steps.push(currNode);

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

        return steps;
    }

    static greedy(maze) {
        let steps = [];
        let openList = [];
        let visited = new Set();
        let currNode = new TreeNode(maze[0][0]);
        currNode.h = manhattanDist(0, 0, maze.length, maze[0].length);
        openList.push(currNode);
        visited.add(maze[0][0]);

        while (openList.length > 0) {
            
            let minIndex = 0;
            for (let i = 0; i < openList.length; i++) {
                minIndex = (openList[i].h < openList[minIndex].h) ? i : minIndex;
            }
            currNode = openList.splice(minIndex, 1)[0];
            steps.push(currNode);

            let cell = currNode.cell;
            //cell.visited = true;
            if (cell.x === maze.length - 1 && cell.y === maze[0].length - 1) {
                break;
            }

            let neighbors = getValidNeighbors(maze, cell.x, cell.y);
            neighbors.forEach(neighbor => {
                if (!visited.has(neighbor)) {
                    let newNode = new TreeNode(neighbor, currNode);
                    newNode.h = manhattanDist(neighbor.x, neighbor.y, maze.length, maze[0].length);
                    openList.push(newNode);
                    visited.add(neighbor);
                }
            })
        }

        return steps;
    }

    static astar(maze) {
        let steps = [];
        let openList = [];
        let visited = new Set();
        let currNode = new TreeNode(maze[0][0]);
        currNode.g = 0;
        currNode.h = manhattanDist(0, 0, maze.length, maze[0].length);
        currNode.f = currNode.g + currNode.h;
        openList.push(currNode);
        visited.add(maze[0][0]);

        while (openList.length > 0) {
            
            let minIndex = 0;
            for (let i = 0; i < openList.length; i++) {
                minIndex = (openList[i].f < openList[minIndex].f) ? i : minIndex;
            }
            currNode = openList.splice(minIndex, 1)[0];
            steps.push(currNode);

            let cell = currNode.cell;
            //cell.visited = true;
            if (cell.x === maze.length - 1 && cell.y === maze[0].length - 1) {
                break;
            }

            let neighbors = getValidNeighbors(maze, cell.x, cell.y);
            neighbors.forEach(neighbor => {
                if (!visited.has(neighbor)) {
                    let newNode = new TreeNode(neighbor, currNode);
                    newNode.g = currNode.g + 1;
                    newNode.h = manhattanDist(neighbor.x, neighbor.y, maze.length, maze[0].length);
                    newNode.f = newNode.g + newNode.h;
                    openList.push(newNode);
                    visited.add(neighbor);
                }
            })
        }

        return steps;
    }
}